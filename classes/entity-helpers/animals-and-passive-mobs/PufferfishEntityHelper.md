# PufferfishEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.PufferfishEntityHelper`

**Extends:** `FishEntityHelper<PufferfishEntity>`

The `PufferfishEntityHelper` class provides specialized access to pufferfish entities in Minecraft, offering methods for monitoring and controlling their unique inflation mechanics. This class extends `FishEntityHelper`, inheriting comprehensive fish functionality while providing specific methods for pufferfish behaviors such as size/inflation state management.

Pufferfish are unique among Minecraft mobs due to their inflation mechanic - they can deflate (normal state), partially inflate (defensive state), or fully inflate (maximum defensive state). This helper is essential for scripts that need to monitor pufferfish behavior, track defensive states, or implement underwater automation systems where pufferfish presence and states are relevant.

## Constructors

PufferfishEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDamage`, `EntityInteract`)
- World entity queries using type filtering for pufferfish (`entity.is("minecraft:pufferfish")`)
- Casting from generic EntityHelper instances using `entity.asPufferfish()`
- FishEntityHelper or AnimalEntityHelper type casting

## Methods

### Pufferfish State and Behavior

- [pufferfish.getSize()](#pufferfishgetsize)

### Inherited Methods

The PufferfishEntityHelper inherits all methods from:
- **FishEntityHelper:** `isFromBucket()` - Check if pufferfish was captured from water using a bucket
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`, `canTarget()`, `getTarget()`, `setTarget()`, etc.
- **LivingEntityHelper:** Health, status effects, equipment, movement states, damage calculations
- **EntityHelper:** Position, movement, world interaction, type casting, raytracing, distance calculations

---

## Pufferfish State and Behavior

## Methods

### pufferfish.getSize()

Gets the current inflation/deflation state of the pufferfish.

```js
const puffState = pufferfish.getSize();
Chat.log(`Pufferfish state: ${puffState}`);
```

**Returns:**
- `* number: The puff state where 0 = deflated, 1 = inflated, 2 = fully inflated.`

**Notes:**
- Pufferfish size affects their hitbox, damage output, and defensive capabilities
- State 0: Normal swimming pufferfish (small hitbox, low damage)
- State 1: Inflated pufferfish (medium hitbox, medium damage)
- State 2: Fully inflated pufferfish (large hitbox, high damage, more defensive)

## Usage Examples

### Pufferfish Safety Monitor
```js
// Monitor pufferfish states and warn about dangerous ones
class PufferfishSafetyMonitor {
    constructor() {
        this.dangerThreshold = 32; // Monitor within 32 blocks
        this.lastAlert = 0;
        this.alertCooldown = 6000; // 6 seconds between alerts
    }

    scanPufferfish() {
        const entities = World.getEntities(this.dangerThreshold);
        const player = Player.getPlayer();

        if (!player) return;

        const dangerousPufferfish = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:pufferfish")) {
                const pufferfish = entity.asPufferfish();
                if (pufferfish) {
                    const distance = player.distanceTo(entity);
                    const size = pufferfish.getSize();
                    const pos = entity.getPos();

                    if (size > 0) { // Inflated pufferfish are potentially dangerous
                        dangerousPufferfish.push({
                            entity: entity,
                            size: size,
                            distance: distance,
                            position: pos
                        });
                    }
                }
            }
        });

        return dangerousPufferfish;
    }

    assessThreatLevel(pufferfishData) {
        if (pufferfishData.length === 0) return "safe";

        let maxThreat = 0;
        let minDistance = 100;

        pufferfishData.forEach(data => {
            // Calculate threat based on size and distance
            const threat = data.size * (100 / Math.max(data.distance, 5));
            maxThreat = Math.max(maxThreat, threat);
            minDistance = Math.min(minDistance, data.distance);
        });

        if (minDistance <= 8 && maxThreat > 15) return "critical";
        if (minDistance <= 16 && maxThreat > 10) return "high";
        if (maxThreat > 5) return "medium";
        return "low";
    }

    displayWarnings() {
        const dangerousFish = this.scanPufferfish();
        const threatLevel = this.assessThreatLevel(dangerousFish);

        const currentTime = Date.now();
        if (currentTime - this.lastAlert < this.alertCooldown) return;

        if (threatLevel !== "safe") {
            this.lastAlert = currentTime;

            const messages = {
                "critical": "&cCRITICAL: Fully inflated pufferfish dangerously close!",
                "high": "&4WARNING: Large inflated pufferfish nearby!",
                "medium": "&6ATTENTION: Inflated pufferfish detected",
                "low": "&eINFO: Some inflated pufferfish in area"
            };

            Chat.log(messages[threatLevel]);

            if (threatLevel === "critical" || threatLevel === "high") {
                Chat.actionbar("&4&lBEWARE OF PUFFERFISH!");
            }
        }

        // Visual warnings
        dangerousFish.forEach(data => {
            const color = data.size === 2 ? 0xFF0000 : 0xFFA500; // Red for fully inflated, orange for partially
            const alpha = Math.max(0.3, 1 - (data.distance / this.dangerThreshold));

            data.entity.setGlowing(true);
            data.entity.setGlowingColor(color);
        });

        // Reset glow for pufferfish outside danger range
        entities.forEach(entity => {
            if (entity.is("minecraft:pufferfish")) {
                const distance = player.distanceTo(entity);
                if (distance > this.dangerThreshold) {
                    entity.resetGlowing();
                }
            }
        });
    }

    startMonitoring() {
        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            this.displayWarnings();
        }));
    }
}

// Initialize and start monitoring
const monitor = new PufferfishSafetyMonitor();
monitor.startMonitoring();
Chat.log("&aPufferfish Safety Monitor activated!");
```

### Aquarium State Analyzer
```js
// Analyze pufferfish states in an aquarium environment
class AquariumAnalyzer {
    constructor() {
        this.pufferfishData = new Map();
        this.scanInterval = 20; // Every second
        this.lastScan = 0;
    }

    scanAquarium() {
        const entities = World.getEntities(16); // 16 block range for aquarium
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:pufferfish")) {
                const pufferfish = entity.asPufferfish();
                if (pufferfish) {
                    const uuid = entity.getUUID();
                    const size = pufferfish.getSize();
                    const pos = entity.getPos();
                    const distance = player.distanceTo(entity);

                    this.pufferfishData.set(uuid, {
                        entity: entity,
                        size: size,
                        position: pos,
                        distance: distance,
                        lastSeen: Date.now(),
                        timeInState: this.pufferfishData.has(uuid) ?
                            (Date.now() - this.pufferfishData.get(uuid).lastSeen) : 0
                    });
                }
            }
        });

        // Remove old data
        const now = Date.now();
        for (const [uuid, data] of this.pufferfishData) {
            if (now - data.lastSeen > 10000) { // 10 seconds
                this.pufferfishData.delete(uuid);
                data.entity.resetGlowing();
            }
        }
    }

    analyzeBehaviors() {
        if (this.pufferfishData.size === 0) {
            Chat.log("&7No pufferfish found in aquarium");
            return;
        }

        Chat.log("=== Aquarium Pufferfish Analysis ===");

        // Size distribution
        const sizeCounts = [0, 0, 0]; // Index 0: deflated, 1: inflated, 2: fully inflated
        const sizeTimes = [0, 0, 0]; // Time spent in each state

        for (const data of this.pufferfishData.values()) {
            sizeCounts[data.size]++;
            sizeTimes[data.size] += data.timeInState;
        }

        const stateNames = ["Deflated", "Inflated", "Fully Inflated"];
        for (let i = 0; i < 3; i++) {
            const count = sizeCounts[i];
            const avgTime = count > 0 ? (sizeTimes[i] / count / 1000).toFixed(1) : 0;
            const percentage = ((count / this.pufferfishData.size) * 100).toFixed(1);

            Chat.log(`${stateNames[i]}: ${count} pufferfish (${percentage}%) - Avg time: ${avgTime}s`);
        }

        // Individual pufferfish details
        Chat.log("\n&6Individual Pufferfish:");
        for (const [uuid, data] of this.pufferfishData) {
            const stateName = stateNames[data.size];
            const timeString = (data.timeInState / 1000).toFixed(1);
            Chat.log(`- ${stateName} for ${timeString}s, ${data.distance.toFixed(1)}m away`);
        }

        // Behavioral insights
        this.generateInsights(sizeCounts, sizeTimes);
    }

    generateInsights(sizeCounts, sizeTimes) {
        const totalPufferfish = this.pufferfishData.size;

        Chat.log("\n&eBehavioral Insights:");

        if (sizeCounts[2] > totalPufferfish * 0.5) {
            Chat.log("  &cHigh defensive state activity - potential threats in area");
        } else if (sizeCounts[1] > totalPufferfish * 0.3) {
            Chat.log("  &6Moderate defensive activity - some disturbances detected");
        } else {
            Chat.log("  &aNormal behavior - pufferfish appear calm");
        }

        const avgDeflatedTime = sizeTimes[0] / Math.max(sizeCounts[0], 1) / 1000;
        const avgInflatedTime = sizeTimes[1] / Math.max(sizeCounts[1], 1) / 1000;

        if (avgDeflatedTime > avgInflatedTime * 2) {
            Chat.log("  &aPufferfish spending most time in normal state");
        } else if (avgInflatedTime > avgDeflatedTime) {
            Chat.log("  &4Pufferfish spending significant time in defensive states");
        }

        // Highlight pufferfish by state
        for (const [uuid, data] of this.pufferfishData) {
            data.entity.setGlowing(true);
            const colors = [0x00FF00, 0xFFA500, 0xFF0000]; // Green, Orange, Red
            data.entity.setGlowingColor(colors[data.size]);
        }
    }

    startAnalysis() {
        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            const currentTime = Date.now();

            if (currentTime - this.lastScan >= this.scanInterval * 1000) {
                this.lastScan = currentTime;
                this.scanAquarium();
                this.analyzeBehaviors();
            }
        }));
    }
}

// Initialize aquarium analyzer
const analyzer = new AquariumAnalyzer();
analyzer.startAnalysis();
Chat.log("&aAquarium Pufferfish Analyzer activated!");
```

### Automated Pufferfish Management
```js
// Manage pufferfish states and behavior in controlled environments
class PufferfishManager {
    constructor() {
        this.managedPufferfish = new Map();
        this.targets = new Map(); // UUID to pufferfish mapping
        this.lastUpdate = 0;
        this.updateInterval = 20; // Every second
        this.inflateThreshold = 4; // Inflate when closer than 4 blocks
        this.deflateThreshold = 12; // Deflate when farther than 12 blocks
    }

    initializeManagement() {
        const entities = World.getEntities(32);
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:pufferfish")) {
                const pufferfish = entity.asPufferfish();
                if (pufferfish) {
                    const uuid = entity.getUUID();
                    const distance = player.distanceTo(entity);

                    this.managedPufferfish.set(uuid, {
                        entity: entity,
                        pufferfish: pufferfish,
                        targetSize: 0, // Start with deflated
                        lastManaged: Date.now()
                    });
                }
            }
        });

        Chat.log(`&aManaging ${this.managedPufferfish.size} pufferfish`);
    }

    calculateOptimalSize(pufferfishData, playerDistance) {
        if (playerDistance < this.inflateThreshold) {
            return 2; // Fully inflated when very close
        } else if (playerDistance < this.deflateThreshold) {
            return 1; // Partially inflated when medium distance
        } else {
            return 0; // Deflated when far away
        }
    }

    managePufferfishStates() {
        const player = Player.getPlayer();
        if (!player) return;

        for (const [uuid, data] of this.managedPufferfish) {
            try {
                const currentDistance = player.distanceTo(data.entity);
                const targetSize = this.calculateOptimalSize(data, currentDistance);
                const currentSize = data.pufferfish.getSize();

                // Update target if needed
                if (targetSize !== data.targetSize) {
                    data.targetSize = targetSize;
                }

                // Check if we need to take action
                if (currentSize !== data.targetSize) {
                    // Visual feedback while managing
                    const progressColor = currentSize < data.targetSize ? 0x00FF00 : 0xFF0000;
                    data.entity.setGlowing(true);
                    data.entity.setGlowingColor(progressColor);

                    // Log management actions
                    if (Date.now() - data.lastManaged > 5000) { // Every 5 seconds
                        const action = data.targetSize > currentSize ? "inflating" : "deflating";
                        Chat.log(`Managing pufferfish: ${action} (current: ${currentSize}, target: ${data.targetSize})`);
                        data.lastManaged = Date.now();
                    }
                } else {
                    // Success - green glow for well-managed pufferfish
                    data.entity.setGlowing(true);
                    data.entity.setGlowingColor(0x00FF00);
                }
            } catch (e) {
                // Remove invalid pufferfish
                data.entity.resetGlowing();
                this.managedPufferfish.delete(uuid);
            }
        }

        // Clean up invalid pufferfish
        for (const [uuid, data] of this.managedPufferfish) {
            if (!data.entity.isAlive()) {
                data.entity.resetGlowing();
                this.managedPufferfish.delete(uuid);
            }
        }
    }

    generateManagementReport() {
        if (this.managedPufferfish.size === 0) {
            Chat.log("&7No pufferfish currently being managed");
            return;
        }

        Chat.log("=== Pufferfish Management Report ===");

        const stateCounts = [0, 0, 0];
        const targetCounts = [0, 0, 0];
        const sizeNames = ["Deflated", "Inflated", "Fully Inflated"];

        for (const data of this.managedPufferfish.values()) {
            const currentSize = data.pufferfish.getSize();
            stateCounts[currentSize]++;
            targetCounts[data.targetSize]++;
        }

        Chat.log("&6Current States:");
        for (let i = 0; i < 3; i++) {
            Chat.log(`  ${sizeNames[i]}: ${stateCounts[i]}`);
        }

        Chat.log("&6Target States:");
        for (let i = 0; i < 3; i++) {
            Chat.log(`  ${sizeNames[i]}: ${targetCounts[i]}`);
        }

        const complianceRate = this.calculateComplianceRate(stateCounts, targetCounts);
        Chat.log(`&aManagement Efficiency: ${complianceRate}%`);
    }

    calculateComplianceRate(stateCounts, targetCounts) {
        let compliant = 0;
        let total = 0;

        for (let i = 0; i < 3; i++) {
            compliant += Math.min(stateCounts[i], targetCounts[i]);
            total += targetCounts[i];
        }

        return total > 0 ? Math.round((compliant / total) * 100) : 0;
    }

    startManagement() {
        this.initializeManagement();

        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            const currentTime = Date.now();

            if (currentTime - this.lastUpdate >= this.updateInterval * 1000) {
                this.lastUpdate = currentTime;
                this.managePufferfishStates();
                this.generateManagementReport();
            }
        }));
    }
}

// Initialize pufferfish management system
const manager = new PufferfishManager();
manager.startManagement();
Chat.log("&aAutomated Pufferfish Management System activated!");
```

## Notes and Limitations

- PufferfishEntityHelper instances become invalid when the pufferfish entity is removed from the world. Always check `isAlive()` before accessing pufferfish data.
- The `getSize()` method returns the puff state which affects pufferfish behavior, hitbox size, and defensive capabilities
- Pufferfish inflation state is purely observational - scripts cannot directly force pufferfish to inflate or deflate
- Different inflation states affect pufferfish damage output and hitbox size, making this information valuable for combat and movement planning
- Inheritance hierarchy provides access to comprehensive fish functionality including bucket status, mob behavior, living entity properties, and basic entity operations
- FishEntityHelper's `isFromBucket()` method can help determine if pufferfish were naturally spawned or player-transported

## Related Classes

- `FishEntityHelper` - Base class for fish entities with bucket status checking
- `MobEntityHelper` - Base class for mob entities with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `AnimalEntityHelper` - Animal entity base class with breeding and food functionality
- `TropicalFishEntityHelper` - Other fish entity helper for tropical fish variants

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- Added specifically for pufferfish inflation state monitoring and management
- Inherits comprehensive functionality from the fish and mob entity hierarchy
- Designed specifically for underwater automation and pufferfish behavior analysis

---

**See Also:**
- [EntityHelper.asPufferfish()](#entityaspufferfish) - Method to cast entities to PufferfishEntityHelper
- [FishEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\FishEntityHelper.md) - Fish entity base class with bucket status methods
- [MobEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\MobEntityHelper.md) - Mob entity base class with AI methods
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\LivingEntityHelper.md) - Living entity base class with health methods