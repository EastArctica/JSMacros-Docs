# ShulkerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.ShulkerEntityHelper`

**Extends:** `MobEntityHelper<ShulkerEntity>`

The `ShulkerEntityHelper` class provides specialized access to shulker entities in Minecraft, offering methods to monitor and interact with shulker-specific behaviors such as their closed/open state, attachment position, and color. This class extends `MobEntityHelper` and inherits all functionality for living entities including health monitoring, status effects, and AI states.

This helper is particularly useful for creating scripts that detect shulker positions, monitor their attack state, track shulker boxes in end cities, or analyze shulker behavior patterns during exploration or combat.

## Constructors

ShulkerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using `asShulker()` method

## Methods

### Shulker State and Appearance

- [shulker.isClosed()](#shulkerisclosed)
- [shulker.getAttachedSide()](#shulkergetattachedside)
- [shulker.getColor()](#shulkergetcolor)

### Inherited Methods

The ShulkerEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Shulker State and Appearance

## Usage Examples

### Shulker Detection and Warning System
```js
// Advanced shulker detection and tactical warning system
class ShulkerWarningSystem {
    constructor() {
        this.trackedShulkers = new Map();
        this.warningLevels = {
            safe: { distance: 32, color: 0x00FF00, message: "Safe distance" },
            caution: { distance: 24, color: 0xFFFF00, message: "Caution advised" },
            danger: { distance: 16, color: 0xFF8800, message: "Danger zone" },
            critical: { distance: 8, color: 0xFF0000, message: "Critical danger!" }
        };
        this.lastWarning = 0;
    }

    analyzeShulker(shulker) {
        const uuid = shulker.getUUID();
        const pos = shulker.getPos();
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(shulker);
        const isClosed = shulker.isClosed();
        const attachedSide = shulker.getAttachedSide();
        const color = shulker.getColor();

        // Calculate threat level based on multiple factors
        let threatLevel = "low";
        let threatScore = 0;

        // Distance threat (closer = more dangerous)
        if (distance <= 8) threatScore += 50;
        else if (distance <= 16) threatScore += 30;
        else if (distance <= 24) threatScore += 15;

        // Attack state threat
        if (isClosed) {
            threatScore += 40;
            threatLevel = "high";
        }

        // Position threat (ceiling shulkers are more dangerous)
        if (attachedSide.getName() === "up") {
            threatScore += 20;
        }

        // Combined threat assessment
        if (threatScore >= 70) threatLevel = "critical";
        else if (threatScore >= 50) threatLevel = "high";
        else if (threatScore >= 30) threatLevel = "medium";
        else if (threatScore >= 15) threatLevel = "elevated";

        // Update tracking data
        this.trackedShulkers.set(uuid, {
            shulker: shulker,
            position: pos,
            distance: distance,
            isClosed: isClosed,
            attachedSide: attachedSide,
            color: color,
            threatLevel: threatLevel,
            threatScore: threatScore,
            lastUpdate: Client.getTime()
        });

        return { threatLevel, distance, isClosed, attachedSide, color };
    }

    generateTacticalAdvice(shulkerData) {
        const { threatLevel, distance, isClosed, attachedSide, color } = shulkerData;
        const side = attachedSide.getName();
        let advice = [];

        if (threatLevel === "critical") {
            advice.push("&&lIMMEDIATE DANGER!");
            if (isClosed) advice.push("Shulker is attacking - take cover!");
            advice.push("Distance: " + distance.toFixed(1) + "m");
        } else if (threatLevel === "high") {
            advice.push("&&lHIGH THREAT LEVEL");
            if (isClosed) advice.push("Preparing to shoot - dodge projectiles");
            if (side === "up") advice.push("Ceiling shulker - watch for falling bullets");
        } else if (threatLevel === "medium") {
            advice.push("&&lMODERATE THREAT");
            if (!isClosed) advice.push("Good opportunity to attack");
        }

        // Position-specific advice
        if (side === "up") {
            advice.push("Ceiling attachment - attack from below");
        } else if (side === "down") {
            advice.push("Floor attachment - vulnerable from above");
        } else if (attachedSide.isHorizontal()) {
            advice.push(`Wall attachment (${side} face)`);
            advice.push("Consider flanking approach");
        }

        // Color-based identification
        if (color) {
            advice.push(`Color: ${color.getName()}`);
        }

        return advice;
    }

    update() {
        const entities = World.getEntities();
        const currentShulkerUUIDs = new Set();
        const currentTime = Client.getTime();

        entities.forEach(entity => {
            if (entity.is("minecraft:shulker")) {
                const shulker = entity.asShulker();
                const uuid = shulker.getUUID();
                currentShulkerUUIDs.add(uuid);

                const shulkerData = this.analyzeShulker(shulker);
                const advice = this.generateTacticalAdvice(shulkerData);

                // Apply visual warnings based on threat level
                if (shulkerData.threatLevel !== "low") {
                    const warningColor = this.getWarningColor(shulkerData.threatLevel);
                    shulker.setGlowing(true);
                    shulker.setGlowingColor(warningColor);

                    // Show actionbar warnings for dangerous shulkers
                    if (shulkerData.threatLevel === "critical" || shulkerData.threatLevel === "high") {
                        if (currentTime - this.lastWarning > 20) { // Throttle warnings
                            const warning = advice[0]; // Show most important advice
                            Chat.actionbar(`&c${warning} &7[${shulkerData.distance.toFixed(1)}m]`);
                            this.lastWarning = currentTime;
                        }
                    }
                } else {
                    // Remove glow from safe shulkers
                    shulker.resetGlowing();
                }
            }
        });

        // Clean up removed shulker data
        for (const [uuid, data] of this.trackedShulkers) {
            if (!currentShulkerUUIDs.has(uuid)) {
                Chat.log(`&7Shulker removed from tracking: ${data.threatLevel} threat level`);
                this.trackedShulkers.delete(uuid);
            }
        }
    }

    getWarningColor(threatLevel) {
        switch (threatLevel) {
            case "critical": return 0xFF0000; // Red
            case "high": return 0xFF4444; // Light red
            case "medium": return 0xFF8800; // Orange
            case "elevated": return 0xFFFF00; // Yellow
            default: return 0x00FF00; // Green
        }
    }
}

// Initialize and run the warning system
const shulkerWarning = new ShulkerWarningSystem();

// Update every tick for real-time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    shulkerWarning.update();
}));

Chat.log("&aShulker Warning System activated - Monitoring for dangerous shulkers");
```

### Shulker Behavior Analysis
```js
// Analyze shulker behavior patterns and attack statistics
class ShulkerBehaviorAnalyzer {
    constructor() {
        this.stats = {
            totalEncountered: 0,
            attackCycles: 0,
            averageAttackInterval: 0,
            colorDistribution: {},
            positionAnalysis: {
                ceiling: 0,
                floor: 0,
                walls: 0
            },
            attackData: []
        };
        this.trackedShulkers = new Map();
    }

    analyzeShulkerBehavior(shulker) {
        const uuid = shulker.getUUID();
        const currentTime = Client.getTime();
        const pos = shulker.getPos();
        const isClosed = shulker.isClosed();
        const attachedSide = shulker.getAttachedSide();
        const color = shulker.getColor();

        // Initialize tracking data if new shulker
        if (!this.trackedShulkers.has(uuid)) {
            this.stats.totalEncountered++;
            this.trackedShulkers.set(uuid, {
                firstSeen: currentTime,
                lastState: isClosed,
                stateChanges: [],
                attackCount: 0,
                color: color ? color.getName() : "purple (default)"
            });

            // Update position statistics
            if (attachedSide.getName() === "up") {
                this.stats.positionAnalysis.ceiling++;
            } else if (attachedSide.getName() === "down") {
                this.stats.positionAnalysis.floor++;
            } else {
                this.stats.positionAnalysis.walls++;
            }

            // Update color distribution
            const colorName = color ? color.getName() : "purple (default)";
            this.stats.colorDistribution[colorName] = (this.stats.colorDistribution[colorName] || 0) + 1;
        }

        const shulkerData = this.trackedShulkers.get(uuid);

        // Track state changes (open/closed)
        if (shulkerData.lastState !== isClosed) {
            shulkerData.stateChanges.push({
                time: currentTime,
                fromState: shulkerData.lastState,
                toState: isClosed
            });

            // Count attack cycles (closing indicates attack preparation)
            if (isClosed && !shulkerData.lastState) {
                shulkerData.attackCount++;
                this.stats.attackCycles++;

                // Calculate attack interval
                if (shulkerData.lastAttackTime) {
                    const interval = currentTime - shulkerData.lastAttackTime;
                    this.stats.attackData.push(interval);
                    this.updateAverageAttackInterval();
                }
                shulkerData.lastAttackTime = currentTime;
            }

            shulkerData.lastState = isClosed;
        }

        return shulkerData;
    }

    updateAverageAttackInterval() {
        if (this.stats.attackData.length > 0) {
            const sum = this.stats.attackData.reduce((a, b) => a + b, 0);
            this.stats.averageAttackInterval = sum / this.stats.attackData.length;
        }
    }

    generateBehaviorReport() {
        Chat.log("=== Shulker Behavior Analysis Report ===");
        Chat.log(`Total shulkers encountered: ${this.stats.totalEncountered}`);
        Chat.log(`Attack cycles observed: ${this.stats.attackCycles}`);

        if (this.stats.averageAttackInterval > 0) {
            Chat.log(`Average attack interval: ${(this.stats.averageAttackInterval/20).toFixed(1)} seconds`);
        }

        Chat.log("");
        Chat.log("=== Position Analysis ===");
        Chat.log(`Ceiling shulkers: ${this.stats.positionAnalysis.ceiling}`);
        Chat.log(`Floor shulkers: ${this.stats.positionAnalysis.floor}`);
        Chat.log(`Wall shulkers: ${this.stats.positionAnalysis.walls}`);

        Chat.log("");
        Chat.log("=== Color Distribution ===");
        for (const [color, count] of Object.entries(this.stats.colorDistribution)) {
            const percentage = ((count / this.stats.totalEncountered) * 100).toFixed(1);
            Chat.log(`${color}: ${count} (${percentage}%)`);
        }

        Chat.log("");
        Chat.log(`Currently tracked shulkers: ${this.trackedShulkers.size}`);
    }

    getMostDangerousPosition() {
        const { ceiling, floor, walls } = this.stats.positionAnalysis;
        const total = ceiling + floor + walls;

        if (total === 0) return "none";

        const ceilingPercent = (ceiling / total) * 100;
        const floorPercent = (floor / total) * 100;
        const wallPercent = (walls / total) * 100;

        if (ceilingPercent >= wallPercent && ceilingPercent >= floorPercent) {
            return "ceiling";
        } else if (wallPercent >= ceilingPercent && wallPercent >= floorPercent) {
            return "walls";
        } else {
            return "floor";
        }
    }

    update() {
        const entities = World.getEntities();
        const currentUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:shulker")) {
                const shulker = entity.asShulker();
                const uuid = shulker.getUUID();
                currentUUIDs.add(uuid);

                this.analyzeShulkerBehavior(shulker);
            }
        });

        // Remove despawned shulkers
        for (const [uuid, data] of this.trackedShulkers) {
            if (!currentUUIDs.has(uuid)) {
                const lifetime = (Client.getTime() - data.firstSeen) / 20;
                Chat.log(`&7Shulker despawned - Lifetime: ${lifetime.toFixed(1)}s, Attacks: ${data.attackCount}`);
                this.trackedShulkers.delete(uuid);
            }
        }
    }
}

// Initialize analyzer
const behaviorAnalyzer = new ShulkerBehaviorAnalyzer();

// Update analysis every 10 ticks (twice per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 10 === 0) {
        behaviorAnalyzer.update();
    }
}));

// Generate report every 3 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 3) === 0) {
        behaviorAnalyzer.generateBehaviorReport();

        const mostDangerous = behaviorAnalyzer.getMostDangerousPosition();
        Chat.log(`&6Most common dangerous position: ${mostDangerous} shulkers`);
    }
}));

Chat.log("&aShulker Behavior Analyzer activated");
```

## Notes and Limitations

- ShulkerEntityHelper instances become invalid when the shulker entity is removed from the world (killed, despawned, or unloaded). Always check `isAlive()` before accessing shulker data.
- The `isClosed()` method provides real-time information about shulker attack state, but may have slight delays due to network synchronization.
- `getAttachedSide()` returns the face the shulker is attached to, which is important for tactical positioning and understanding attack angles.
- `getColor()` returns null for the default purple shulker color, and DyeColorHelper for colored shulkers (typically found in end cities or custom spawned).
- Shulkers can only attach to solid blocks and will detach if the block they're attached to is destroyed.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight dangerous shulkers or organize them by color.
- The inheritance hierarchy provides access to all living entity and mob methods, including health monitoring, status effects, and AI state detection.

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and attack states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `DirectionHelper` - Direction and facing information for positional analysis
- `DyeColorHelper` - Color information and properties for shulker identification
- `StatusEffectHelper` - Status effect management and detection

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized mob helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft ShulkerEntity implementation
- Inherits comprehensive functionality from the mob and living entity helper hierarchy