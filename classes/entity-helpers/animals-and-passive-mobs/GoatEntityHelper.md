# GoatEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.GoatEntityHelper`

**Extends:** `AnimalEntityHelper<GoatEntity>`

The `GoatEntityHelper` class provides specialized access to goat entities in Minecraft, offering methods to monitor goat-specific behaviors such as screaming states and horn status. This class extends `AnimalEntityHelper` and inherits all functionality for animals including breeding mechanics, food preferences, and animal compatibility checking.

This helper is particularly useful for creating scripts that manage goat farming, monitor goat behavior patterns, track horn status for collection purposes, or coordinate with multiple goats in mountain environments.

## Constructors

GoatEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering for goats
- Automatic casting from generic EntityHelper instances when the entity type is a goat

## Methods

### Goat-Specific State

- [goat.isScreaming()](#goatisScreaming)
- [goat.hasLeftHorn()](#goathasLeftHorn)
- [goat.hasRightHorn()](#goathasRightHorn)
- [goat.hasHorns()](#goathasHorns)

### Inherited Methods

The GoatEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Goat-Specific State

### goat.isScreaming()
```js
const entities = World.getEntities();
entities.forEach(entity => {
    if (entity.is("minecraft:goat")) {
        const goat = entity; // Automatically cast to GoatEntityHelper
        if (goat.isScreaming()) {
            Chat.log(`Screaming goat detected at ${goat.getPos()}`);
            goat.setGlowing(true);
            goat.setGlowingColor(0xFF0000); // Red for screaming goats
        }
    }
});
```

**Returns**
* `boolean`: `true` if the goat is currently screaming, `false` otherwise.

**Notes**
Screaming goats are a rare variant that make different sounds and have unique behaviors. They are visually distinguished by their different facial expressions and sounds.

### goat.hasLeftHorn()
```js
const goat = entity; // Assuming entity is a goat
if (!goat.hasLeftHorn()) {
    Chat.log("This goat is missing its left horn!");
    // Could trigger horn collection logic
}
```

**Returns**
* `boolean`: `true` if the goat still has its left horn, `false` otherwise.

### goat.hasRightHorn()
```js
const goat = entity; // Assuming entity is a goat
if (!goat.hasRightHorn()) {
    Chat.log("This goat is missing its right horn!");
}
```

**Returns**
* `boolean`: `true` if the goat still has its right horn, `false` otherwise.

### goat.hasHorns()
```js
const goat = entity; // Assuming entity is a goat
if (!goat.hasHorns()) {
    Chat.log("This goat has lost both horns!");
    goat.setGlowingColor(0x808080); // Gray for hornless goats
}
```

**Returns**
* `boolean`: `true` if the goat has at least one horn, `false` otherwise.

**Notes**
This is a convenience method that checks if the goat has either horn remaining. Goats can lose horns when they ram into solid blocks.

## Usage Examples

### Complete Goat Farm Management System
```js
// Comprehensive goat farm management and monitoring system
class GoatFarmManager {
    constructor() {
        this.managedGoats = new Map();
        this.goatStats = {
            totalGoats: 0,
            screamingGoats: 0,
            normalGoats: 0,
            hornStatus: {
                bothHorns: 0,
                oneHorn: 0,
                noHorns: 0
            }
        };
        this.scanRadius = 32;
        this.lastScan = 0;
        this.scanInterval = 20 * 3; // Every 3 seconds
        this.rammingLocations = new Set();
    }

    registerGoat(goat) {
        const uuid = goat.getUUID();
        const name = goat.getName().getString();
        const pos = goat.getPos();
        const isScreaming = goat.isScreaming();
        const hasLeftHorn = goat.hasLeftHorn();
        const hasRightHorn = goat.hasRightHorn();

        const goatData = {
            goat: goat,
            name: name,
            isScreaming: isScreaming,
            hasLeftHorn: hasLeftHorn,
            hasRightHorn: hasRightHorn,
            hornCount: (hasLeftHorn ? 1 : 0) + (hasRightHorn ? 1 : 0),
            lastPosition: pos,
            firstSeen: Client.getTime(),
            lastUpdate: Client.getTime(),
            ramEvents: []
        };

        this.managedGoats.set(uuid, goatData);
        this.updateStatistics(goatData);

        const goatType = isScreaming ? "Screaming" : "Normal";
        const hornStatus = this.getHornStatusDescription(goatData);
        Chat.log(`&aRegistered ${goatType} Goat: ${name} (${hornStatus})`);

        // Highlight new registration
        goat.setGlowing(true);
        goat.setGlowingColor(isScreaming ? 0xFF00FF : 0x00FF00);

        return goatData;
    }

    getHornStatusDescription(goatData) {
        if (goatData.hasLeftHorn && goatData.hasRightHorn) return "Both horns";
        if (goatData.hasLeftHorn || goatData.hasRightHorn) return "One horn";
        return "No horns";
    }

    updateStatistics(goatData) {
        this.goatStats.totalGoats = this.managedGoats.size;

        // Reset counts
        this.goatStats.screamingGoats = 0;
        this.goatStats.normalGoats = 0;
        this.goatStats.hornStatus = { bothHorns: 0, oneHorn: 0, noHorns: 0 };

        for (const [uuid, data] of this.managedGoats) {
            if (data.isScreaming) {
                this.goatStats.screamingGoats++;
            } else {
                this.goatStats.normalGoats++;
            }

            if (data.hasLeftHorn && data.hasRightHorn) {
                this.goatStats.hornStatus.bothHorns++;
            } else if (data.hasLeftHorn || data.hasRightHorn) {
                this.goatStats.hornStatus.oneHorn++;
            } else {
                this.goatStats.hornStatus.noHorns++;
            }
        }
    }

    updateGoat(goat) {
        const uuid = goat.getUUID();
        const pos = goat.getPos();
        const isScreaming = goat.isScreaming();
        const hasLeftHorn = goat.hasLeftHorn();
        const hasRightHorn = goat.hasRightHorn();

        let goatData = this.managedGoats.get(uuid);
        if (!goatData) {
            goatData = this.registerGoat(goat);
        }

        const previousState = {
            isScreaming: goatData.isScreaming,
            hasLeftHorn: goatData.hasLeftHorn,
            hasRightHorn: goatData.hasRightHorn,
            hornCount: goatData.hornCount
        };

        // Check for state changes
        this.detectStateChanges(goatData, previousState, {
            isScreaming, hasLeftHorn, hasRightHorn,
            hornCount: (hasLeftHorn ? 1 : 0) + (hasRightHorn ? 1 : 0)
        });

        // Update stored data
        goatData.lastPosition = pos;
        goatData.isScreaming = isScreaming;
        goatData.hasLeftHorn = hasLeftHorn;
        goatData.hasRightHorn = hasRightHorn;
        goatData.hornCount = (hasLeftHorn ? 1 : 0) + (hasRightHorn ? 1 : 0);
        goatData.lastUpdate = Client.getTime();

        this.updateStatistics(goatData);
    }

    detectStateChanges(goatData, previousState, currentState) {
        const { goat, name } = goatData;
        let changes = [];

        // Horn loss detection
        if (previousState.hornCount > currentState.hornCount) {
            const hornsLost = previousState.hornCount - currentState.hornCount;
            changes.push(`&cLost ${hornsLost} horn${hornsLost > 1 ? 's' : ''}!`);
            Chat.log(`&c${name} lost ${hornsLost} horn${hornsLost > 1 ? 's' : ''}!`);

            // Record ramming location
            const pos = goat.getPos();
            this.rammingLocations.add(`${Math.floor(pos.x)},${Math.floor(pos.y)},${Math.floor(pos.z)}`);
        }

        // Report changes
        if (changes.length > 0) {
            const changesText = changes.join(", ");
            Chat.log(`&6${name}: ${changesText}`);
        }
    }

    highlightGoatsByType() {
        const player = Player.getPlayer();
        if (!player) return;

        for (const [uuid, goatData] of this.managedGoats) {
            const distance = player.distanceTo(goatData.goat);

            if (distance <= this.scanRadius) {
                if (goatData.isScreaming) {
                    // Purple for screaming goats
                    goatData.goat.setGlowing(true);
                    goatData.goat.setGlowingColor(0xFF00FF);
                } else {
                    // Green for normal goats
                    goatData.goat.setGlowing(true);
                    goatData.goat.setGlowingColor(0x00FF00);
                }

                // Special highlighting for horn status
                if (goatData.hornCount === 0) {
                    // Gray outline for hornless goats
                    goatData.goat.setGlowingColor(0x808080);
                } else if (goatData.hornCount === 1) {
                    // Yellow for one-horned goats
                    goatData.goat.setGlowingColor(0xFFFF00);
                }
            } else {
                goatData.goat.resetGlowing();
            }
        }
    }

    findRareScreamingGoats() {
        const screamingGoats = [];

        for (const [uuid, goatData] of this.managedGoats) {
            if (goatData.isScreaming) {
                screamingGoats.push(goatData);
            }
        }

        if (screamingGoats.length === 0) {
            Chat.log("&7No screaming goats found in the managed area.");
            return;
        }

        Chat.log(`&6=== Screaming Goats Found ===`);
        Chat.log(`Found ${screamingGoats.length} screaming goat${screamingGoats.length > 1 ? 's' : ''}:`);

        screamingGoats.forEach((goatData, index) => {
            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(goatData.goat) : 0;

            Chat.log(`\n&e${index + 1}. ${goatData.name}:`);
            Chat.log(`  - Location: [${goatData.lastPosition.x.toFixed(0)}, ${goatData.lastPosition.y.toFixed(0)}, ${goatData.lastPosition.z.toFixed(0)}]`);
            Chat.log(`  - Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  - Horn Status: ${this.getHornStatusDescription(goatData)}`);
            Chat.log(`  - First Seen: ${new Date(goatData.firstSeen).toLocaleTimeString()}`);

            // Highlight screaming goats with rainbow effect
            goatData.goat.setGlowing(true);
            goatData.goat.setGlowingColor(0xFF00FF);
        });

        Chat.log(`\n&6Tip: Screaming goats are rare variants (about 2% spawn rate)!`);
    }

    generateHornCollectionReport() {
        Chat.log("=== Goat Horn Collection Report ===");
        Chat.log(`Total goats managed: ${this.goatStats.totalGoats}`);
        Chat.log(`Screaming goats: ${this.goatStats.screamingGoats}`);
        Chat.log(`Normal goats: ${this.goatStats.normalGoats}`);

        Chat.log("\n&6Horn Status Distribution:");
        Chat.log(`  - Both horns: ${this.goatStats.hornStatus.bothHorns} goats`);
        Chat.log(`  - One horn: ${this.goatStats.hornStatus.oneHorn} goats`);
        Chat.log(`  - No horns: ${this.goatStats.hornStatus.noHorns} goats`);

        const totalHorns = this.goatStats.hornStatus.bothHorns * 2 + this.goatStats.hornStatus.oneHorn;
        const maxPossibleHorns = this.goatStats.totalGoats * 2;
        const hornRetentionRate = maxPossibleHorns > 0 ? (totalHorns / maxPossibleHorns * 100).toFixed(1) : 0;

        Chat.log(`\n&eHorn Statistics:`);
        Chat.log(`  - Total horns remaining: ${totalHorns} / ${maxPossibleHorns}`);
        Chat.log(`  - Horn retention rate: ${hornRetentionRate}%`);

        if (this.rammingLocations.size > 0) {
            Chat.log(`\n&6Recent Ramming Locations (${this.rammingLocations.size}):`);
            Array.from(this.rammingLocations).slice(0, 5).forEach(location => {
                Chat.log(`  - ${location}`);
            });
        }

        // Identify valuable goats (screaming with both horns)
        let valuableGoats = 0;
        for (const [uuid, goatData] of this.managedGoats) {
            if (goatData.isScreaming && goatData.hornCount === 2) {
                valuableGoats++;
            }
        }

        if (valuableGoats > 0) {
            Chat.log(`\n&a&lHIGH VALUE GOATS: ${valuableGoats} screaming goats with both horns!`);
        }
    }

    monitorGoatBehavior() {
        const entities = World.getEntities(this.scanRadius);
        const currentGoatUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:goat")) {
                const goat = entity; // Automatically cast to GoatEntityHelper
                const uuid = goat.getUUID();
                currentGoatUUIDs.add(uuid);

                this.updateGoat(goat);
            }
        });

        // Remove goats that are no longer in range
        for (const [uuid, goatData] of this.managedGoats) {
            if (!currentGoatUUIDs.has(uuid)) {
                Chat.log(`&7${goatData.name} left tracking range`);
                this.managedGoats.delete(uuid);
                this.updateStatistics(goatData);
            }
        }

        this.highlightGoatsByType();
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        this.monitorGoatBehavior();
    }
}

// Initialize and run the goat farm manager
const goatFarmManager = new GoatFarmManager();

// Update system every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 60 === 0) { // Every 3 seconds (60 ticks)
        goatFarmManager.update();
    }
}));

// Generate comprehensive report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        goatFarmManager.generateHornCollectionReport();
    }
}));

// Scan for rare screaming goats every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        goatFarmManager.findRareScreamingGoats();
    }
}));

Chat.log("&aGoat Farm Manager activated! Monitoring goats, horn status, and rare variants.");
```

### Goat Horn Harvesting Assistant
```js
// Goat horn harvesting and collection system
class GoatHornHarvester {
    constructor() {
        this.harvestTargets = new Map();
        this.hornTypes = [
            "Ponder", "Sing", "Seek", "Feel", "Admire", "Call", "Yearn", "Dream"
        ];
        this.harvestMode = false;
        this.harvestRadius = 16;
    }

    scanForHornlessGoats() {
        const entities = World.getEntities(this.harvestRadius);
        const hornlessGoats = [];
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:goat")) {
                const goat = entity;
                if (!goat.hasHorns()) {
                    hornlessGoats.push({
                        goat: goat,
                        name: goat.getName().getString(),
                        pos: goat.getPos(),
                        distance: player.distanceTo(goat),
                        isScreaming: goat.isScreaming()
                    });
                }
            }
        });

        if (hornlessGoats.length === 0) {
            Chat.log("&7No hornless goats found in the area.");
            return;
        }

        Chat.log(`&e=== Hornless Goats Found ===`);
        Chat.log(`Found ${hornlessGoats.length} goat${hornlessGoats.length > 1 ? 's' : ''} without horns:`);

        hornlessGoats.forEach((goatData, index) => {
            const goatType = goatData.isScreaming ? "Screaming" : "Normal";
            Chat.log(`\n${index + 1}. ${goatType} ${goatData.name}:`);
            Chat.log(`  - Location: [${goatData.pos.x.toFixed(0)}, ${goatData.pos.y.toFixed(0)}, ${goatData.pos.z.toFixed(0)}]`);
            Chat.log(`  - Distance: ${goatData.distance.toFixed(1)}m`);

            // Mark for harvesting
            goatData.goat.setGlowing(true);
            goatData.goat.setGlowingColor(0xFFA500); // Orange for harvest targets
        });

        Chat.log(`\n&6These goats have already lost their horns and won't drop more.`);
        Chat.log(`&7Look for goats with horns to harvest from.`);
    }

    findHarvestableGoats() {
        const entities = World.getEntities(this.harvestRadius);
        const harvestableGoats = [];
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:goat")) {
                const goat = entity;
                if (goat.hasHorns()) {
                    harvestableGoats.push({
                        goat: goat,
                        name: goat.getName().getString(),
                        pos: goat.getPos(),
                        distance: player.distanceTo(goat),
                        isScreaming: goat.isScreaming(),
                        hornCount: (goat.hasLeftHorn() ? 1 : 0) + (goat.hasRightHorn() ? 1 : 0)
                    });
                }
            }
        });

        if (harvestableGoats.length === 0) {
            Chat.log("&7No goats with horns found in the area.");
            return;
        }

        Chat.log(`&a=== Harvestable Goats Found ===`);
        Chat.log(`Found ${harvestableGoats.length} goat${harvestableGoats.length > 1 ? 's' : ''} with horns:`);

        // Prioritize screaming goats (rare horn drops)
        harvestableGoats.sort((a, b) => {
            if (a.isScreaming !== b.isScreaming) {
                return b.isScreaming - a.isScreaming; // Screaming goats first
            }
            return b.hornCount - a.hornCount; // More horns first
        });

        harvestableGoats.forEach((goatData, index) => {
            const hornStatus = goatData.hornCount === 2 ? "Both horns" : "One horn";
            const goatType = goatData.isScreaming ? "Screaming" : "Normal";
            const rarity = goatData.isScreaming ? "&6✨ RARE" : "&fCommon";

            Chat.log(`\n${index + 1}. ${rarity} ${goatType} Goat ${goatData.name}:`);
            Chat.log(`  - Horn Status: ${hornStatus}`);
            Chat.log(`  - Location: [${goatData.pos.x.toFixed(0)}, ${goatData.pos.y.toFixed(0)}, ${goatData.pos.z.toFixed(0)}]`);
            Chat.log(`  - Distance: ${goatData.distance.toFixed(1)}m`);

            if (goatData.isScreaming) {
                Chat.log(`  - &6Can drop rare horn variants!`);
            }

            // Highlight based on priority
            if (goatData.isScreaming) {
                goatData.goat.setGlowing(true);
                goatData.goat.setGlowingColor(0xFF00FF); // Purple for screaming goats
            } else {
                goatData.goat.setGlowing(true);
                goatData.goat.setGlowingColor(0x00FF00); // Green for normal goats
            }
        });

        Chat.log(`\n&aHarvesting Tips:`);
        Chat.log(`- Make goats ram into solid blocks to make them drop horns`);
        Chat.log(`- Screaming goats can drop rare horn variants`);
        Chat.log(`- Each goat can drop a maximum of 2 horns (1 per horn)`);
        Chat.log(`- Build a horn harvesting trap for efficient collection`);
    }

    setupHornHarvestingTrap() {
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getBlockPos();

        Chat.log("&6=== Horn Harvesting Trap Guide ===");
        Chat.log("Building a simple horn harvesting trap:");
        Chat.log(`1. Find a location near ${playerPos.x}, ${playerPos.y}, ${playerPos.z}`);
        Chat.log("2. Build a 3x3 platform with solid blocks");
        Chat.log("3. Place walls to guide goats toward the center");
        Chat.log("4. Put a solid block in the center for goats to ram");
        Chat.log("5. Lure goats with wheat or lead them into position");
        Chat.log("6. Anger the goats (hit them) to make them ram");
        Chat.log("7. Collect dropped horns from the ground");

        Chat.log("\n&eMaterials needed:");
        Chat.log("- 9+ solid blocks (stone, wood, etc.)");
        Chat.log("- Walls to guide goats (optional)");
        Chat.log("- Wheat or leads to lure goats");

        Chat.log("\n&aTrap Diagram (top view):");
        Chat.log("WWW W = Wall");
        Chat.log("WSW S = Solid block (ramming target)");
        Chat.log("WWW G = Goat position");
        Chat.log(" G ");
    }

    monitorHornDrops() {
        events.on("EntityDropItem", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.entity;
            if (entity && entity.is("minecraft:goat")) {
                const goat = entity;
                const droppedItem = event.item;

                if (droppedItem && droppedItem.getItemId() === "minecraft:goat_horn") {
                    const hornVariant = droppedItem.getName().getString();
                    const goatName = goat.getName().getString();
                    const goatType = goat.isScreaming() ? "Screaming" : "Normal";

                    Chat.log(`&aHorn dropped! ${hornVariant} from ${goatType} ${goatName}`);

                    // Check horn count after drop
                    setTimeout(() => {
                        if (!goat.hasHorns()) {
                            Chat.log(`&7${goatName} has lost all horns`);
                            goat.setGlowingColor(0x808080); // Gray for hornless
                        }
                    }, 100);
                }
            }
        }));
    }

    toggleHarvestMode() {
        this.harvestMode = !this.harvestMode;

        if (this.harvestMode) {
            Chat.log("&aHorn harvesting mode activated!");
            this.findHarvestableGoats();
            this.monitorHornDrops();
        } else {
            Chat.log("&7Horn harvesting mode deactivated.");
            // Clear all highlights
            const entities = World.getEntities(this.harvestRadius);
            entities.forEach(entity => {
                if (entity.is("minecraft:goat")) {
                    entity.resetGlowing();
                }
            });
        }
    }

    update() {
        if (!this.harvestMode) return;

        // Update highlights for goats in range
        const entities = World.getEntities(this.harvestRadius);
        entities.forEach(entity => {
            if (entity.is("minecraft:goat")) {
                const goat = entity;
                const distance = Player.getPlayer().distanceTo(goat);

                if (distance <= this.harvestRadius) {
                    if (goat.hasHorns()) {
                        if (goat.isScreaming()) {
                            goat.setGlowingColor(0xFF00FF); // Purple for screaming
                        } else {
                            goat.setGlowingColor(0x00FF00); // Green for normal
                        }
                    } else {
                        goat.setGlowingColor(0x808080); // Gray for hornless
                    }
                    goat.setGlowing(true);
                } else {
                    goat.resetGlowing();
                }
            }
        });
    }
}

// Initialize horn harvester
const hornHarvester = new GoatHornHarvester();

// Command to toggle harvesting mode
hornHarvester.toggleHarvestMode();

// Update every second for real-time highlighting
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) {
        hornHarvester.update();
    }
}));

Chat.log("&aGoat Horn Harvester ready! Use hornHarvester.findHarvestableGoats() to scan.");
```

## Notes and Limitations

- GoatEntityHelper instances become invalid when the goat entity is removed from the world (dies, despawns, or unloaded). Always check `isAlive()` before accessing goat data.
- `isScreaming()` identifies the rare screaming goat variant, which has different sounds and behaviors but identical drops to normal goats.
- `hasLeftHorn()` and `hasRightHorn()` can be used to track horn loss from ramming behaviors or to identify goats that can still drop horns.
- `hasHorns()` is a convenience method that returns true if the goat has at least one horn remaining.
- Goats lose horns when they ram into solid blocks at high speed, which is the primary method for obtaining goat horns.
- Horn drops are randomized and screaming goats have a chance to drop rare horn variants with different sounds.
- The inheritance hierarchy provides access to comprehensive animal functionality including breeding mechanics and food preferences.
- Goat breeding follows standard animal mechanics - goats can be bred with wheat and will produce baby goats.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important goats for better visibility.
- Goats naturally spawn in mountain biomes and can be found in both normal and screaming variants.
- Goats will sometimes ram players, mobs, or armor stands when provoked, making them potentially dangerous in close quarters.

## Related Classes

- `AnimalEntityHelper` - Base class for animal entities with breeding and food functionality
- `MobEntityHelper` - Mob entity functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` and `ItemStackHelper` - For checking breeding items like wheat
- `BlockDataHelper` - For identifying solid blocks that goats can ram into

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft GoatEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for goat farm management and horn collection systems

---

**See Also:**
- [EntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\EntityHelper.md) - Base entity functionality
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal entity base class
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\LivingEntityHelper.md) - Living entity functionality
- [World.getEntities()](F:\java\JsMacros\JsMacros-Docs\apis\world.md#worldgetentities) - Method to find goat entities