# DolphinEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.DolphinEntityHelper`

**Extends:** `MobEntityHelper<DolphinEntity>`

The `DolphinEntityHelper` class provides specialized access to dolphin entities in Minecraft, offering methods to monitor and interact with dolphin-specific behaviors such as fish carrying, treasure hunting, and moisture levels. This class extends `MobEntityHelper` and inherits all functionality for mob entities including AI states, pathfinding, and combat behaviors.

Dolphins are aquatic passive mobs that spawn in ocean biomes and are known for their playful behavior, ability to lead players to treasure, and unique moisture mechanic that requires them to remain in water to survive.

## Constructors

DolphinEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type-specific methods

## Methods

### Dolphin-Specific State

- [dolphin.hasFish()](#dolphinhasfish)
- [dolphin.getTreasurePos()](#dolphingetreasurepos)
- [dolphin.getMoistness()](#dolphingetmoistness)

### Inherited Methods

The DolphinEntityHelper inherits all methods from:
- **MobEntityHelper:** AI states, pathfinding, attack targets, leashing
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Dolphin-Specific State

### dolphin.hasFish()

```js
const hasFish = dolphin.hasFish();
```

Returns whether the dolphin is currently carrying a fish in its mouth. Dolphins can pick up fish items and will hold them until they eat them or drop them.

**Returns**
- `boolean: true` if the dolphin has a fish in its mouth, `false` otherwise

---

### dolphin.getTreasurePos()

```js
const treasurePos = dolphin.getTreasurePos();
```

Returns the position of the treasure that the dolphin is currently leading players toward. When dolphins are fed, they will swim to nearby underwater ruins or shipwrecks and remember the location, potentially leading players to treasure.

**Returns**
- `BlockPosHelper: The position of the treasure location. Returns [0, 0, 0] by default if no treasure is set`

---

### dolphin.getMoistness()

```js
const moistness = dolphin.getMoistness();
```

Returns the current moisture level of the dolphin. Dolphins must maintain moisture by staying in water - their moisture decreases over time when on land and they will take damage if it reaches zero. The maximum moisture is typically 2400 (2 minutes of air time).

**Returns**
- `int: The current moisture level of the dolphin (0-2400)`

---

## Usage Examples

### Dolphin Behavior Monitor
```js
// Comprehensive dolphin monitoring and behavior analysis system
class DolphinMonitor {
    constructor() {
        this.trackedDolphins = new Map();
        this.alertLevels = {
            lowMoisture: 600,    // 30 seconds - get back in water!
            criticalMoisture: 300, // 15 seconds - critical damage imminent
            treasureNear: 50      // 50 blocks - treasure is nearby
        };
    }

    updateDolphin(dolphinEntity) {
        const dolphin = dolphinEntity.asDolphin();
        const uuid = dolphin.getUUID();
        const pos = dolphin.getPos();

        const dolphinData = {
            dolphin: dolphin,
            hasFish: dolphin.hasFish(),
            treasurePos: dolphin.getTreasurePos(),
            moistness: dolphin.getMoistness(),
            position: pos,
            lastUpdate: Client.getTime()
        };

        // Check if this is a new dolphin
        if (!this.trackedDolphins.has(uuid)) {
            Chat.log(`&aDiscovered dolphin at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            dolphin.setGlowing(true);
            dolphin.setGlowingColor(0x00FFFF); // Cyan for water creatures
        }

        // Analyze dolphin state
        this.analyzeDolphinState(dolphinData);

        // Update tracking data
        this.trackedDolphins.set(uuid, dolphinData);
    }

    analyzeDolphinState(dolphinData) {
        const { dolphin, hasFish, treasurePos, moistness, position } = dolphinData;
        const player = Player.getPlayer();
        if (!player) return;

        // Moisture warnings
        if (moistness <= this.alertLevels.criticalMoistness) {
            Chat.actionbar(`&c⚠ Dolphin needs water! ${moistness} moisture remaining`);
            dolphin.setGlowingColor(0xFF0000); // Red for critical
        } else if (moistness <= this.alertLevels.lowMoisture) {
            Chat.actionbar(`&e⚠ Dolphin getting dry: ${moistness} moisture`);
            dolphin.setGlowingColor(0xFFAA00); // Orange for warning
        } else {
            dolphin.setGlowingColor(0x00FFFF); // Cyan for healthy
        }

        // Fish status
        if (hasFish) {
            Chat.log(`&bDolphin is carrying a fish!`);
        }

        // Treasure detection
        if (treasurePos && (treasurePos.x !== 0 || treasurePos.y !== 0 || treasurePos.z !== 0)) {
            const treasureDistance = Math.sqrt(
                Math.pow(position.x - treasurePos.x, 2) +
                Math.pow(position.y - treasurePos.y, 2) +
                Math.pow(position.z - treasurePos.z, 2)
            );

            if (treasureDistance <= this.alertLevels.treasureNear) {
                Chat.log(`&6✨ Dolphin knows about treasure at [${treasurePos.x}, ${treasurePos.y}, ${treasurePos.z}] (${treasureDistance.toFixed(1)}m away)`);

                // Highlight treasure area
                const treasureBox = new Box(
                    treasurePos.x - 2, treasurePos.y - 2, treasurePos.z - 2,
                    treasurePos.x + 2, treasurePos.y + 2, treasurePos.z + 2,
                    0xFFD700, 0x80FFD700, true, false
                );
                Hud.createDraw3D().addBox(treasureBox);
            }
        }
    }

    scanForDolphins() {
        const entities = World.getEntities(100); // 100 block radius
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:dolphin")) {
                this.updateDolphin(entity);
            }
        });

        // Remove dolphins that are no longer in range
        this.cleanupOutOfRangeDolphins(entities);
    }

    cleanupOutOfRangeDolphins(currentEntities) {
        const currentDolphinUUIDs = new Set();

        currentEntities.forEach(entity => {
            if (entity.is("minecraft:dolphin")) {
                currentDolphinUUIDs.add(entity.getUUID());
            }
        });

        for (const [uuid, dolphinData] of this.trackedDolphins) {
            if (!currentDolphinUUIDs.has(uuid)) {
                Chat.log(`&7Dolphin left tracking range`);
                this.trackedDolphins.delete(uuid);
            }
        }
    }

    generateReport() {
        Chat.log("=== Dolphin Activity Report ===");
        Chat.log(`Currently tracking: ${this.trackedDolphins.size} dolphins`);

        let lowMoistureCount = 0;
        let fishCarriers = 0;
        let treasureHunters = 0;

        for (const [uuid, dolphinData] of {
            const { hasFish, treasurePos, moistness, position } = dolphinData;

            if (moistness <= this.alertLevels.lowMoisture) lowMoistureCount++;
            if (hasFish) fishCarriers++;
            if (treasurePos && treasurePos.x !== 0) treasureHunters++;

            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(position) : 0;

            Chat.log(`\nDolphin at [${position.x.toFixed(0)}, ${position.y.toFixed(0)}, ${position.z.toFixed(0)}]:`);
            Chat.log(`  - Moisture: ${moistness}/2400 (${((moistness/2400)*100).toFixed(1)}%)`);
            Chat.log(`  - Carrying fish: ${hasFish ? "Yes" : "No"}`);
            Chat.log(`  - Knows treasure: ${treasurePos && treasurePos.x !== 0 ? `Yes [${treasurePos.x}, ${treasurePos.y}, ${treasurePos.z}]` : "No"}`);
            Chat.log(`  - Distance: ${distance.toFixed(1)}m`);
        }

        Chat.log(`\n&6Summary:`);
        Chat.log(`  - Low moisture: ${lowMoistureCount}`);
        Chat.log(`  - Fish carriers: ${fishCarriers}`);
        Chat.log(`  - Treasure hunters: ${treasureHunters}`);
    }
}

// Initialize dolphin monitor
const dolphinMonitor = new DolphinMonitor();

// Update every 2 seconds for performance
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 40 === 0) {
        dolphinMonitor.scanForDolphins();
    }
}));

// Generate report every 5 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 5) === 0) {
        dolphinMonitor.generateReport();
    }
}));

Chat.log("&aDolphin Monitor activated! Tracking aquatic behavior and treasure locations.");
```

### Dolphin Treasure Hunter Assistant
```js
// Assist with finding underwater treasure using dolphin behavior
class DolphinTreasureHunter {
    constructor() {
        this.treasureLocations = new Map();
        this.visitedLocations = new Set();
        this.huntRadius = 100;
        this.feedItems = ["minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:pufferfish"];
    }

    feedAndTrackDolphin(dolphinEntity) {
        const dolphin = dolphinEntity.asDolphin();
        const player = Player.getPlayer();

        if (!player) return;

        // Check if player has fish to feed
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        let hasFish = false;
        let fishItem = null;

        if (mainHand && this.feedItems.includes(mainHand.getId())) {
            hasFish = true;
            fishItem = mainHand;
        } else if (offHand && this.feedItems.includes(offHand.getId())) {
            hasFish = true;
            fishItem = offHand;
        }

        if (!hasFish) {
            Chat.log("&eYou need fish to feed dolphins for treasure hunting!");
            Chat.log("&eRequired: cod, salmon, tropical fish, or pufferfish");
            return;
        }

        // Feed the dolphin (this would normally be done through interaction)
        const distance = player.distanceTo(dolphinEntity);
        if (distance <= 5) {
            Chat.log(`&aFeeding dolphin with ${fishItem.getName().getString()}...`);

            // Monitor for treasure location change
            this.monitorDolphinForTreasure(dolphin);
        } else {
            Chat.log(`&eDolphin is too far away (${distance.toFixed(1)}m). Get closer than 5m.`);
        }
    }

    monitorDolphinForTreasure(dolphin) {
        const uuid = dolphin.getUUID();
        const initialTreasurePos = dolphin.getTreasurePos();

        Chat.log("&bMonitoring dolphin for treasure discovery...");

        // Set up monitoring for the next 30 seconds
        const monitor = events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            const currentDolphin = World.getEntityByUUID(uuid);
            if (!currentDolphin || !currentDolphin.is("minecraft:dolphin")) {
                monitor.unregister();
                return;
            }

            const dolphinHelper = currentDolphin.asDolphin();
            const currentTreasurePos = dolphinHelper.getTreasurePos();

            // Check if treasure position changed
            if (currentTreasurePos &&
                (currentTreasurePos.x !== initialTreasurePos.x ||
                 currentTreasurePos.z !== initialTreasurePos.z)) {

                this.recordTreasureLocation(currentTreasurePos, dolphinHelper);
                monitor.unregister();
            }

            // Timeout after 30 seconds
            if (Client.getTime() % (20 * 30) === 0) {
                Chat.log("&7Dolphin didn't find treasure within 30 seconds");
                monitor.unregister();
            }
        }));
    }

    recordTreasureLocation(treasurePos, dolphin) {
        const posKey = `${treasurePos.x},${treasurePos.y},${treasurePos.z}`;

        if (this.visitedLocations.has(posKey)) {
            Chat.log("&7Dolphin found a treasure location you already know about.");
            return;
        }

        this.treasureLocations.set(posKey, {
            position: treasurePos,
            discoveredBy: dolphin.getUUID(),
            discoveredAt: Client.getTime()
        });
        this.visitedLocations.add(posKey);

        Chat.log(`&6✨ Dolphin found treasure at [${treasurePos.x}, ${treasurePos.y}, ${treasurePos.z}]!`);
        Chat.log("&aMarking location on your map...");

        // Create visual marker
        const marker = new Box(
            treasurePos.x - 1, treasurePos.y - 1, treasurePos.z - 1,
            treasurePos.x + 1, treasurePos.y + 1, treasurePos.z + 1,
            0xFFD700, 0x80FFD700, true, false
        );
        Hud.createDraw3D().addBox(marker);

        // Draw path to treasure
        this.drawPathToTreasure(treasurePos);
    }

    drawPathToTreasure(treasurePos) {
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getPos();
        const steps = 20;
        const pathPoints = [];

        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = playerPos.x + (treasurePos.x - playerPos.x) * t;
            const y = playerPos.y + (treasurePos.y - playerPos.y) * t;
            const z = playerPos.z + (treasurePos.z - playerPos.z) * t;
            pathPoints.push(new Pos3D(x, y, z));
        }

        // Draw path line
        const pathLine = new Line3D(
            pathPoints,
            0x00FFFF, 0xFF000000, true, false
        );
        Hud.createDraw3D().addLine(pathLine);

        Chat.log("&aPath to treasure highlighted for 30 seconds");

        // Remove path after 30 seconds
        setTimeout(() => {
            Hud.createDraw3D().removeLine(pathLine);
        }, 30000);
    }

    scanForOpportunities() {
        const entities = World.getEntities(this.huntRadius);
        const dolphins = [];
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:dolphin")) {
                const dolphin = entity.asDolphin();
                const distance = player.distanceTo(entity);

                dolphins.push({
                    entity: entity,
                    dolphin: dolphin,
                    distance: distance,
                    hasFish: dolphin.hasFish(),
                    moistness: dolphin.getMoistness(),
                    knowsTreasure: this.knowsTreasure(dolphin)
                });
            }
        });

        if (dolphins.length === 0) {
            Chat.log("&eNo dolphins found within " + this.huntRadius + " blocks.");
            return;
        }

        Chat.log(`&a=== Dolphin Treasure Hunting Opportunities ===`);
        Chat.log(`Found ${dolphins.length} dolphins nearby:`);

        dolphins.forEach(dolphinData => {
            const { entity, dolphin, distance, hasFish, moistness, knowsTreasure } = dolphinData;

            Chat.log(`\n&bDolphin ${distance.toFixed(1)}m away:`);
            Chat.log(`  - Health: ${entity.asLiving().getHealth().toFixed(1)}/20`);
            Chat.log(`  - Moisture: ${moistness}/2400 (${((moistness/2400)*100).toFixed(1)}%)`);
            Chat.log(`  - Carrying fish: ${hasFish ? "Yes" : "No"}`);
            Chat.log(`  - Knows treasure: ${knowsTreasure ? "Yes" : "No"}`);

            if (moistness < 1200) {
                Chat.log(`  &c⚠ Low moisture - may need to return to water soon`);
            }

            if (knowsTreasure) {
                const treasurePos = dolphin.getTreasurePos();
                Chat.log(`  &6✨ Treasure location: [${treasurePos.x}, ${treasurePos.y}, ${treasurePos.z}]`);
            }
        });

        // Check if player has fish
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        const hasFish = (mainHand && this.feedItems.includes(mainHand.getId())) ||
                        (offHand && this.feedItems.includes(offHand.getId()));

        if (hasFish) {
            Chat.log(`\n&a✓ You have fish for feeding dolphins!`);
        } else {
            Chat.log(`\n&eTip: Hold fish to feed dolphins for treasure hunting`);
        }
    }

    knowsTreasure(dolphin) {
        const pos = dolphin.getTreasurePos();
        return pos && (pos.x !== 0 || pos.y !== 0 || pos.z !== 0);
    }

    generateTreasureReport() {
        Chat.log("=== Treasure Discovery Report ===");
        Chat.log(`Total treasure locations found: ${this.treasureLocations.size}`);

        if (this.treasureLocations.size === 0) {
            Chat.log("No treasure locations discovered yet. Feed dolphins to find treasure!");
            return;
        }

        const player = Player.getPlayer();
        if (!player) return;

        for (const [posKey, treasureData] of this.treasureLocations) {
            const { position, discoveredAt } = treasureData;
            const distance = player.distanceTo(position);
            const age = Client.getTime() - discoveredAt;
            const ageMinutes = Math.floor(age / (20 * 60));

            Chat.log(`\n&6Treasure at [${position.x}, ${position.y}, ${position.z}]:`);
            Chat.log(`  - Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  - Discovered: ${ageMinutes} minute${ageMinutes !== 1 ? 's' : ''} ago`);
            Chat.log(`  - Status: ${distance <= 10 ? "&aVery close!" : distance <= 50 ? "&eNearby" : "&7Far away"}`);
        }
    }
}

// Initialize treasure hunter
const treasureHunter = new DolphinTreasureHunter();

// Command aliases
JsMacros.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "F1") {
        treasureHunter.scanForOpportunities();
    } else if (event.key === "F2") {
        treasureHunter.generateTreasureReport();
    }
}));

Chat.log("&aDolphin Treasure Hunter initialized!");
Chat.log("&ePress F1 to scan for hunting opportunities");
Chat.log("&ePress F2 to view discovered treasure locations");
```

### Dolphin Health and Moisture Manager
```js
// Monitor and manage dolphin health and moisture levels
class DolphinCareManager {
    constructor() {
        this.underConstruction = new Set();
        this.safeZones = [];
        this.moistnessThresholds = {
            critical: 300,    // 15 seconds
            warning: 600,     // 30 seconds
            safe: 1200        // 1 minute
        };
    }

    createSafeZone(centerPos, radius = 20) {
        const safeZone = {
            center: centerPos,
            radius: radius,
            created: Client.getTime()
        };

        this.safeZones.push(safeZone);

        // Create visual marker for safe zone
        const zoneBox = new Box(
            centerPos.x - radius, centerPos.y - radius, centerPos.z - radius,
            centerPos.x + radius, centerPos.y + radius, centerPos.z + radius,
            0x0000FF, 0x400000FF, true, false
        );
        Hud.createDraw3D().addBox(zoneBox);

        Chat.log(`&aCreated dolphin safe zone at [${centerPos.x}, ${centerPos.y}, ${centerPos.z}] (${radius}m radius)`);
    }

    checkDolphinSafety(dolphinEntity) {
        const dolphin = dolphinEntity.asDolphin();
        const pos = dolphin.getPos();
        const moistness = dolphin.getMoistness();
        const isAlive = dolphin.asLiving().isAlive();

        if (!isAlive) return;

        // Check moisture levels
        if (moistness <= this.moistnessThresholds.critical) {
            this.handleCriticalMoisture(dolphin, pos, moistness);
        } else if (moistness <= this.moistnessThresholds.warning) {
            this.handleLowMoisture(dolphin, pos, moistness);
        }

        // Check if dolphin is in water
        const block = World.getBlock(pos.x, pos.y, pos.z);
        const isInWater = block && block.is("minecraft:water");

        if (!isInWater && moistness < this.moistnessThresholds.safe) {
            this.guideDolphinToWater(dolphin, pos);
        }
    }

    handleCriticalMoisture(dolphin, pos, moistness) {
        const uuid = dolphin.getUUID();

        if (this.underConstruction.has(uuid)) return;

        Chat.log(`&c⚠ CRITICAL: Dolphin at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}] has only ${moistness} moisture!`);
        Chat.log("&cImmediate water access required!");

        // Flash red warning
        dolphin.setGlowing(true);
        dolphin.setGlowingColor(0xFF0000);

        // Guide to nearest water
        this.guideDolphinToWater(dolphin, pos);
        this.underConstruction.add(uuid);
    }

    handleLowMoisture(dolphin, pos, moistness) {
        Chat.actionbar(`&eDolphin moisture low: ${moistness}/2400`);
        dolphin.setGlowing(true);
        dolphin.setGlowingColor(0xFFAA00);
    }

    guideDolphinToWater(dolphin, pos) {
        // Find nearest water source
        const searchRadius = 30;
        let nearestWater = null;
        let nearestDistance = searchRadius;

        for (let x = pos.x - searchRadius; x <= pos.x + searchRadius; x += 2) {
            for (let z = pos.z - searchRadius; z <= pos.z + searchRadius; z += 2) {
                for (let y = Math.max(0, pos.y - 10); y <= pos.y + 10; y++) {
                    const block = World.getBlock(x, y, z);
                    if (block && block.is("minecraft:water")) {
                        const waterPos = new Pos3D(x, y, z);
                        const distance = Math.sqrt(
                            Math.pow(pos.x - x, 2) +
                            Math.pow(pos.y - y, 2) +
                            Math.pow(pos.z - z, 2)
                        );

                        if (distance < nearestDistance) {
                            nearestDistance = distance;
                            nearestWater = waterPos;
                        }
                    }
                }
            }
        }

        if (nearestWater) {
            Chat.log(`&bGuiding dolphin to water at [${nearestWater.x}, ${nearestWater.y}, ${nearestWater.z}] (${nearestDistance.toFixed(1)}m away)`);

            // Draw path to water
            const pathLine = new Line3D(
                [pos, nearestWater],
                0x00FFFF, 0xFF000000, true, false
            );
            Hud.createDraw3D().addLine(pathLine);

            // Remove path after 10 seconds
            setTimeout(() => {
                Hud.createDraw3D().removeLine(pathLine);
            }, 10000);
        } else {
            Chat.log(`&cNo water found within ${searchRadius}m blocks! Dolphin may not survive.`);
        }
    }

    scanForDolphinsInNeed() {
        const entities = World.getEntities(100);
        const dolphinsInNeed = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:dolphin")) {
                const dolphin = entity.asDolphin();
                const moistness = dolphin.getMoistness();

                if (moistness <= this.moistnessThresholds.warning) {
                    dolphinsInNeed.push({
                        entity: entity,
                        dolphin: dolphin,
                        moistness: moistness,
                        pos: entity.getPos()
                    });
                }
            }
        });

        if (dolphinsInNeed.length === 0) {
            Chat.log("&aAll dolphins in the area have healthy moisture levels!");
            return;
        }

        Chat.log(`&e=== Dolphin Moisture Alert ===`);
        Chat.log(`Found ${dolphinsInNeed.length} dolphin${dolphinsInNeed.length > 1 ? 's' : ''} in need of water:`);

        dolphinsInNeed.forEach(({ dolphin, moistness, pos }) => {
            const status = moistness <= this.moistnessThresholds.critical ? "&cCRITICAL" : "&eWARNING";
            Chat.log(`${status}: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}] - ${moistness}/2400 moisture`);
        });
    }

    createWaterSource(pos) {
        const player = Player.getPlayer();
        if (!player) return;

        // This would typically be done by placing water blocks or using commands
        Chat.log(`&eCreating emergency water source at [${pos.x}, ${pos.y}, ${pos.z}]`);

        // Mark water source location
        const waterMarker = new Box(
            pos.x - 1, pos.y, pos.z - 1,
            pos.x + 1, pos.y + 1, pos.z + 1,
            0x0000FF, 0x800000FF, true, false
        );
        Hud.createDraw3D().addBox(waterMarker);
    }

    update() {
        const entities = World.getEntities(100);

        entities.forEach(entity => {
            if (entity.is("minecraft:dolphin")) {
                this.checkDolphinSafety(entity);
            }
        });

        // Clean up construction flags
        this.underConstruction.clear();
    }
}

// Initialize dolphin care manager
const dolphinCare = new DolphinCareManager();

// Monitor every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 40 === 0) {
        dolphinCare.update();
    }
}));

// Check for dolphins in need every 10 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 200 === 0) {
        dolphinCare.scanForDolphinsInNeed();
    }
}));

Chat.log("&aDolphin Care Manager activated! Monitoring moisture and health.");
```

## Notes and Limitations

- DolphinEntityHelper instances become invalid when the dolphin entity is removed from the world (dies, despawns, or unloaded). Always check `isAlive()` before accessing dolphin data.
- `hasFish()` returns true when dolphins have picked up fish items from the environment or been fed by players.
- `getTreasurePos()` returns [0, 0, 0] by default when no treasure location has been discovered. Check for non-zero coordinates to determine if the dolphin knows about treasure.
- `getMoistness()` ranges from 0 to 2400 (representing 0 to 2 minutes of air time). Dolphins take damage when on land with 0 moisture.
- Dolphins will actively seek out water when their moisture gets low, making them relatively self-sufficient but still requiring monitoring.
- Treasure hunting behavior is triggered by feeding dolphins fish items - they will then search for nearby underwater ruins or shipwrecks.
- Dolphins can breed when fed cod or salmon, and will follow players holding these items.
- Dolphins are playful and may interact with boats and items floating in the water.
- The inheritance hierarchy provides access to all mob entity methods including AI states, pathfinding, and combat behaviors.
- Dolphins spawn in ocean biomes, particularly in lukewarm, deep lukewarm, and deep ocean variants.

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and behavior states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `BlockPosHelper` - Position information for treasure locations

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft DolphinEntity implementation
- Designed specifically for aquatic creature management and treasure hunting assistance