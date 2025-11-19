# FrogEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.FrogEntityHelper`

**Extends:** `AnimalEntityHelper<FrogEntity>`

The `FrogEntityHelper` class provides specialized access to frog entities in Minecraft, offering methods for identifying frog variants, tracking hunting behavior, and monitoring croaking animations. This class extends `AnimalEntityHelper`, inheriting comprehensive functionality for animal breeding, feeding mechanics, mob behaviors, living entity properties, and basic entity operations.

Frogs are unique passive mobs that can be found in swamp biomes and come in different variants depending on the temperature of their spawning biome. They are also capable of hunting small mobs like slimes and magma cubes.

## Constructors

FrogEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`, `EntityTarget`)
- World entity queries using type filtering for frogs (`"minecraft:frog"`)
- Casting from generic EntityHelper instances using `entity.asAnimal()`

## Methods

### Frog Variant and Behavior

- [frog.getVariant()](#froggetvariant)
- [frog.getTarget()](#froggettarget)
- [frog.isCroaking()](#frogiscroaking)

### Inherited Methods

The FrogEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`, breeding mechanics
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`, mob behaviors
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Frog Variant and Behavior

### frog.getVariant()

Returns the variant type of this frog, which is determined by the biome temperature where the frog was spawned.

```js
const entities = World.getEntities(32);
const frogs = entities.filter(entity => entity.getType() === "minecraft:frog");

frogs.forEach(entity => {
    const frog = entity.asAnimal();
    const variant = frog.getVariant();
    const pos = entity.getPos();

    Chat.log(`Frog at ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)} is variant: ${variant}`);
});
```

**Returns:**
- **String:** The frog variant identifier (e.g., `"minecraft:temperate"`, `"minecraft:cold"`, `"minecraft:warm"`, `"minecraft:swamp"`)

### frog.getTarget()

Returns the entity that this frog is currently targeting for hunting. Frogs will target and attack small mobs like slimes and magma cubes using their tongue attack.

```js
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const entities = World.getEntities(16);
    const frogs = entities.filter(entity => entity.getType() === "minecraft:frog");

    frogs.forEach(entity => {
        const frog = entity.asAnimal();
        const target = frog.getTarget();

        if (target) {
            const frogPos = entity.getPos();
            const targetPos = target.getPos();
            const distance = frogPos.distanceTo(targetPos);

            // Highlight hunting frogs and their targets
            entity.setGlowing(true);
            entity.setGlowingColor(0x00FF00); // Green for frog
            target.setGlowing(true);
            target.setGlowingColor(0xFF0000); // Red for target

            Chat.actionbar(`Frog hunting ${target.getType()} (${distance.toFixed(1)}m away)`);
        } else {
            entity.resetGlowing();
        }
    });
}));
```

**Returns:**
- **EntityHelper<?>:** The target entity, or `null` if the frog has no target

### frog.isCroaking()

Returns whether the frog is currently playing its croaking animation. Frogs croak periodically and this can be used to identify active or vocalizing frogs.

```js
class FrogObserver {
    constructor() {
        this.observedFrogs = new Map();
        this.scanRadius = 24;
        this.lastScan = 0;
    }

    scanFrogs() {
        const entities = World.getEntities(this.scanRadius);
        const frogs = entities.filter(entity => entity.getType() === "minecraft:frog");
        const player = Player.getPlayer();

        if (!player) return;

        frogs.forEach(entity => {
            const uuid = entity.getUUID();
            const frog = entity.asAnimal();
            const pos = entity.getPos();
            const isCroaking = frog.isCroaking();
            const variant = frog.getVariant();
            const target = frog.getTarget();

            const frogData = {
                uuid: uuid,
                entity: entity,
                frog: frog,
                position: pos,
                variant: variant,
                isCroaking: isCroaking,
                target: target,
                lastCroakTime: isCroaking ? Client.getTime() : (this.observedFrogs.get(uuid)?.lastCroakTime || 0),
                croakCount: this.observedFrogs.get(uuid)?.croakCount || 0
            };

            // Track croaking behavior
            if (isCroaking && !this.observedFrogs.get(uuid)?.isCroaking) {
                frogData.lastCroakTime = Client.getTime();
                frogData.croakCount++;

                Chat.log(`&eFrog (${variant}) started croaking at ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}`);

                // Brief highlight when croaking
                entity.setGlowing(true);
                entity.setGlowingColor(0x00FFFF); // Cyan for croaking
                setTimeout(() => {
                    entity.resetGlowing();
                }, 2000);
            }

            this.observedFrogs.set(uuid, frogData);
        });

        // Clean up frogs that are no longer in range
        const currentUUIDs = new Set(frogs.map(f => f.getUUID()));
        for (const [uuid, frogData] of this.observedFrogs) {
            if (!currentUUIDs.has(uuid)) {
                this.observedFrogs.delete(uuid);
            }
        }
    }

    generateFrogReport() {
        if (this.observedFrogs.size === 0) {
            Chat.log("&7No frogs found in range");
            return;
        }

        Chat.log("=== Frog Observation Report ===");

        // Count by variant
        const variantCounts = new Map();
        let croakingCount = 0;
        let huntingCount = 0;

        for (const [uuid, frogData] of this.observedFrogs) {
            const variant = frogData.variant;
            variantCounts.set(variant, (variantCounts.get(variant) || 0) + 1);

            if (frogData.isCroaking) croakingCount++;
            if (frogData.target) huntingCount++;
        }

        Chat.log("&6Frog Variants:");
        for (const [variant, count] of variantCounts) {
            const variantName = variant.replace("minecraft:", "").charAt(0).toUpperCase() +
                               variant.replace("minecraft:", "").slice(1);
            Chat.log(`  ${variantName}: ${count}`);
        }

        Chat.log(`\n&eActivity Status:`);
        Chat.log(`  Croaking: ${croakingCount}/${this.observedFrogs.size}`);
        Chat.log(`  Hunting: ${huntingCount}/${this.observedFrogs.size}`);

        // Show most vocal frogs
        const sortedByCroaks = Array.from(this.observedFrogs.entries())
            .sort((a, b) => b[1].croakCount - a[1].croakCount)
            .slice(0, 3);

        if (sortedByCroaks.length > 0 && sortedByCroaks[0][1].croakCount > 0) {
            Chat.log(`\n&eMost Vocal Frogs:`);
            sortedByCroaks.forEach(([uuid, frogData], index) => {
                const variant = frogData.variant.replace("minecraft:", "");
                Chat.log(`  ${index + 1}. ${variant} frog: ${frogData.croakCount} croaks observed`);
            });
        }
    }

    highlightHuntingFrogs() {
        for (const [uuid, frogData] of this.observedFrogs) {
            if (frogData.target) {
                // Highlight frog-prey interactions
                frogData.entity.setGlowing(true);
                frogData.entity.setGlowingColor(0x00FF00); // Green for hunting frog
                frogData.target.setGlowing(true);
                frogData.target.setGlowingColor(0xFFA500); // Orange for prey

                // Draw line between frog and target
                const frogPos = frogData.position;
                const targetPos = frogData.target.getPos();

                const line = new Line3D(
                    frogPos.x, frogPos.y + 0.5, frogPos.z,
                    targetPos.x, targetPos.y, targetPos.z,
                    0x00FF00, 0xFF0000, 2, false
                );

                // Add to 3D render for one tick
                const render3D = Hud.createDraw3D();
                render3D.addLine(line);
                render3D.register();
            } else {
                frogData.entity.resetGlowing();
            }
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < 20) return; // Scan every second

        this.lastScan = Client.getTime();
        this.scanFrogs();
        this.highlightHuntingFrogs();
    }
}

// Initialize frog observer
const frogObserver = new FrogObserver();

// Regular updates
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    frogObserver.update();
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        frogObserver.generateFrogReport();
    }
}));

Chat.log("&aFrog Observer activated! Monitoring frog variants, behavior, and hunting activity...");
```

**Returns:**
- **boolean:** `true` if the frog is currently croaking, `false` otherwise

## Usage Examples

### Comprehensive Frog Monitoring System
```js
// Advanced frog ecosystem monitoring with variant tracking and behavior analysis
class FrogEcosystemMonitor {
    constructor() {
        this.frogData = new Map();
        this.variantHabitats = new Map();
        this.huntingStatistics = new Map();
        this.monitoringRadius = 48;
        this.lastUpdate = 0;
        this.updateInterval = 20; // Every second
        this.initializeVariantTracking();
    }

    initializeVariantTracking() {
        // Initialize habitat tracking for different frog variants
        this.variantHabitats.set("minecraft:temperate", {
            name: "Temperate Frog",
            preferredBiomes: ["minecraft:forest", "minecraft:plains", "minecraft:birch_forest"],
            color: 0x90EE90, // Light green
            positions: []
        });
        this.variantHabitats.set("minecraft:cold", {
            name: "Cold Frog",
            preferredBiomes: ["minecraft:snowy_plains", "minecraft:ice_spikes", "minecraft:snowy_taiga"],
            color: 0x87CEEB, // Sky blue
            positions: []
        });
        this.variantHabitats.set("minecraft:warm", {
            name: "Warm Frog",
            preferredBiomes: ["minecraft:desert", "minecraft:savanna", "minecraft:jungle"],
            color: 0xFFD700, // Gold
            positions: []
        });
        this.variantHabitats.set("minecraft:swamp", {
            name: "Swamp Frog",
            preferredBiomes: ["minecraft:swamp", "minecraft:mangrove_swamp"],
            color: 0x2E8B57, // Sea green
            positions: []
        });
    }

    scanFrogPopulation() {
        const entities = World.getEntities(this.monitoringRadius);
        const frogs = entities.filter(entity => entity.getType() === "minecraft:frog");
        const player = Player.getPlayer();

        if (!player) return;

        frogs.forEach(entity => {
            const uuid = entity.getUUID();
            const frog = entity.asAnimal();
            const pos = entity.getPos();
            const variant = frog.getVariant();
            const isCroaking = frog.isCroaking();
            const target = frog.getTarget();

            const frogInfo = {
                uuid: uuid,
                entity: entity,
                frog: frog,
                position: pos,
                variant: variant,
                isCroaking: isCroaking,
                target: target,
                lastSeen: Client.getTime(),
                croakEvents: this.frogData.get(uuid)?.croakEvents || [],
                huntingEvents: this.frogData.get(uuid)?.huntingEvents || [],
                totalDistance: this.frogData.get(uuid)?.totalDistance || 0,
                lastPosition: this.frogData.get(uuid)?.position || pos
            };

            // Track croaking events
            if (isCroaking && !this.frogData.get(uuid)?.isCroaking) {
                frogInfo.croakEvents.push({
                    time: Client.getTime(),
                    position: { x: pos.x, y: pos.y, z: pos.z }
                });
            }

            // Track hunting events
            if (target && !this.frogData.get(uuid)?.target) {
                const targetType = target.getType();
                frogInfo.huntingEvents.push({
                    time: Client.getTime(),
                    targetType: targetType,
                    frogPosition: { x: pos.x, y: pos.y, z: pos.z },
                    targetPosition: target.getPos()
                });

                // Update hunting statistics
                this.huntingStatistics.set(targetType, (this.huntingStatistics.get(targetType) || 0) + 1);
            }

            // Calculate movement distance
            const distance = frogInfo.lastPosition.distanceTo(pos);
            frogInfo.totalDistance += distance;

            // Update variant habitat data
            const habitatData = this.variantHabitats.get(variant);
            if (habitatData) {
                habitatData.positions.push({ x: pos.x, y: pos.y, z: pos.z });
                // Keep only recent positions (last 100)
                if (habitatData.positions.length > 100) {
                    habitatData.positions.shift();
                }
            }

            this.frogData.set(uuid, frogInfo);
        });

        // Clean up frogs that are no longer in range
        const currentUUIDs = new Set(frogs.map(f => f.getUUID()));
        for (const [uuid, frogInfo] of this.frogData) {
            if (!currentUUIDs.has(uuid) && (Client.getTime() - frogInfo.lastSeen > 60000)) {
                this.frogData.delete(uuid);
            }
        }
    }

    analyzeFrogBehavior() {
        const behaviorReport = {
            totalFrogs: this.frogData.size,
            activeFrogs: 0,
            huntingFrogs: 0,
            croakingFrogs: 0,
            mostActiveVariant: null,
            mostHuntedPrey: null,
            averageMovementDistance: 0
        };

        const variantActivity = new Map();
        let totalMovement = 0;

        for (const [uuid, frogInfo] of this.frogData) {
            const variant = frogInfo.variant;

            // Count active frogs
            if (frogInfo.isCroaking || frogInfo.target || frogInfo.croakEvents.length > 0) {
                behaviorReport.activeFrogs++;
            }

            if (frogInfo.isCroaking) behaviorReport.croakingFrogs++;
            if (frogInfo.target) behaviorReport.huntingFrogs++;

            // Track variant activity
            variantActivity.set(variant, (variantActivity.get(variant) || 0) + 1);
            totalMovement += frogInfo.totalDistance;
        }

        // Find most active variant
        let maxActivity = 0;
        for (const [variant, activity] of variantActivity) {
            if (activity > maxActivity) {
                maxActivity = activity;
                behaviorReport.mostActiveVariant = variant;
            }
        }

        // Find most hunted prey
        let maxHunts = 0;
        for (const [preyType, huntCount] of this.huntingStatistics) {
            if (huntCount > maxHunts) {
                maxHunts = huntCount;
                behaviorReport.mostHuntedPrey = preyType;
            }
        }

        behaviorReport.averageMovementDistance = this.frogData.size > 0 ? totalMovement / this.frogData.size : 0;

        return behaviorReport;
    }

    visualizeFrogEcosystem() {
        const player = Player.getPlayer();
        if (!player) return;

        // Clear previous visualizations
        for (const [uuid, frogInfo] of this.frogData) {
            frogInfo.entity.resetGlowing();
        }

        // Visualize different frog activities
        for (const [uuid, frogInfo] of this.frogData) {
            const habitatData = this.variantHabitats.get(frogInfo.variant);
            const color = habitatData ? habitatData.color : 0xFFFFFF;

            if (frogInfo.isCroaking) {
                // Croaking frogs - pulsing cyan effect
                frogInfo.entity.setGlowing(true);
                frogInfo.entity.setGlowingColor(0x00FFFF);
            } else if (frogInfo.target) {
                // Hunting frogs - green with prey highlighted
                frogInfo.entity.setGlowing(true);
                frogInfo.entity.setGlowingColor(0x00FF00);
                frogInfo.target.setGlowing(true);
                frogInfo.target.setGlowingColor(0xFF4500);

                // Draw hunting line
                const frogPos = frogInfo.position;
                const targetPos = frogInfo.target.getPos();
                const huntingLine = new Line3D(
                    frogPos.x, frogPos.y + 0.5, frogPos.z,
                    targetPos.x, targetPos.y + 0.5, targetPos.z,
                    0x00FF00, 0xFF4500, 3, false
                );

                const render3D = Hud.createDraw3D();
                render3D.addLine(huntingLine);
                render3D.register();
            } else {
                // Normal frogs - variant color
                frogInfo.entity.setGlowing(true);
                frogInfo.entity.setGlowingColor(color);
            }
        }
    }

    generateEcosystemReport() {
        const behavior = this.analyzeFrogBehavior();

        Chat.log("=== Frog Ecosystem Report ===");
        Chat.log(`&6Total Population: ${behavior.totalFrogs} frogs`);
        Chat.log(`&eActive Frogs: ${behavior.activeFrogs} (${Math.round(behavior.activeFrogs / behavior.totalFrogs * 100)}%)`);

        if (behavior.huntingFrogs > 0) {
            Chat.log(`&cCurrently Hunting: ${behavior.huntingFrogs} frogs`);
        }

        if (behavior.croakingFrogs > 0) {
            Chat.log(`&aCurrently Croaking: ${behavior.croakingFrogs} frogs`);
        }

        // Variant distribution
        Chat.log("\n&6Variant Distribution:");
        const variantCounts = new Map();
        for (const [uuid, frogInfo] of this.frogData) {
            variantCounts.set(frogInfo.variant, (variantCounts.get(frogInfo.variant) || 0) + 1);
        }

        for (const [variant, count] of variantCounts) {
            const habitatData = this.variantHabitats.get(variant);
            const variantName = habitatData ? habitatData.name : variant.replace("minecraft:", "");
            const percentage = Math.round(count / behavior.totalFrogs * 100);
            Chat.log(`  ${variantName}: ${count} (${percentage}%)`);
        }

        // Hunting statistics
        if (this.huntingStatistics.size > 0) {
            Chat.log("\n&cHunting Statistics:");
            for (const [preyType, huntCount] of this.huntingStatistics) {
                const preyName = preyType.replace("minecraft:", "").replace("_", " ");
                Chat.log(`  ${preyName}: ${huntCount} hunt${huntCount > 1 ? 's' : ''} observed`);
            }
        }

        // Activity patterns
        Chat.log("\n&eActivity Patterns:");
        Chat.log(`  Average movement: ${behavior.averageMovementDistance.toFixed(2)} blocks`);

        if (behavior.mostActiveVariant) {
            const habitatData = this.variantHabitats.get(behavior.mostActiveVariant);
            const variantName = habitatData ? habitatData.name : behavior.mostActiveVariant.replace("minecraft:", "");
            Chat.log(`  Most active variant: ${variantName}`);
        }

        if (behavior.mostHuntedPrey) {
            const preyName = behavior.mostHuntedPrey.replace("minecraft:", "").replace("_", " ");
            Chat.log(`  Most hunted prey: ${preyName}`);
        }
    }

    update() {
        if (Client.getTime() - this.lastUpdate < this.updateInterval) return;

        this.lastUpdate = Client.getTime();
        this.scanFrogPopulation();
        this.visualizeFrogEcosystem();
    }
}

// Initialize ecosystem monitor
const ecosystemMonitor = new FrogEcosystemMonitor();

// Regular monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    ecosystemMonitor.update();
}));

// Periodic reports
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) { // Every minute
        ecosystemMonitor.generateEcosystemReport();
    }
}));

Chat.log("&aFrog Ecosystem Monitor activated!");
Chat.log("&eMonitoring frog variants, behavior patterns, and hunting activity...");
Chat.log("&7Different colored glows indicate different frog variants");
```

## Notes and Limitations

- FrogEntityHelper instances become invalid when the frog entity is removed from the world. Always check `isAlive()` before accessing frog data.
- `getVariant()` returns the frog variant based on the biome temperature where it spawned, which cannot be changed during the frog's lifetime.
- `getTarget()` only returns targets for hunting behavior (small mobs like slimes and magma cubes). Frogs don't target players or larger mobs.
- `isCroaking()` returns true only during the croaking animation duration, which is relatively brief (a few seconds).
- Frogs will naturally hunt small mobs within range using their tongue attack, which can be observed through the target tracking.
- Frog variants include: temperate (green), cold (cyan), warm (orange), and swamp (green) variants based on spawning biome.
- The inheritance hierarchy provides access to comprehensive animal functionality including breeding mechanics with slimes and magma cubes.
- Frogs can be bred using slimeballs, which is unique among passive mobs.
- Movement tracking and behavior analysis can reveal interesting patterns in frog activity and habitat preference.

## Related Classes

- `AnimalEntityHelper` - Base class for animal entities with breeding and feeding functionality
- `MobEntityHelper` - Base class for mob entities with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` - Item information and properties (slimeballs for breeding)
- `ItemStackHelper` - ItemStack information for inventory-based breeding item checking

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft FrogEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for frog variant tracking and behavior monitoring systems

---

**See Also:**
- [EntityHelper.asAnimal()](#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal entity base class
- [World.getEntities()](F:\java\JsMacros\JsMacros-Docs\apis\World.md#worldgetentities) - Method for finding entities by type