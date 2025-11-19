# SheepEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.SheepEntityHelper`

**Extends:** `AnimalEntityHelper<SheepEntity>`

The `SheepEntityHelper` class provides specialized access to sheep entities in Minecraft, offering methods for managing wool coloration, shearing states, and the special "jeb_" rainbow sheep functionality. This class extends `AnimalEntityHelper` and inherits all functionality for animal breeding, food preferences, and general mob behaviors.

This helper is particularly useful for creating scripts that manage sheep farms, automate wool collection, track sheep color variations, or create colorful sheep breeding programs.

## Constructors

SheepEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityShear`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using `entity.asSheep()`

## Methods

### Sheep-Specific States

- [sheep.isSheared()](#sheepissheared)
- [sheep.isShearable()](#sheepisshearable)
- [sheep.getColor()](#sheepgetcolor)
- [sheep.isJeb()](#sheepisjeb)

### Inherited Methods

The SheepEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Sheep-Specific States

## Usage Examples

### Complete Sheep Farm Management System
```js
// Advanced sheep farm automation with color management and shearing
class SheepFarmManager {
    constructor() {
        this.managedSheep = new Map();
        this.farmStats = {
            totalSheep: 0,
            shearedSheep: 0,
            unshearedSheep: 0,
            colorDistribution: new Map(),
            woolProduction: 0,
            breedingOpportunities: 0
        };
        this.shearRadius = 5;
        this.scanRadius = 32;
        this.lastScan = 0;
        this.scanInterval = 20 * 3; // Every 3 seconds
        this.colorPriorities = [
            "minecraft:white",
            "minecraft:black",
            "minecraft:gray",
            "minecraft:light_gray",
            "minecraft:brown",
            "minecraft:pink"
        ];
    }

    registerSheep(sheep) {
        const uuid = sheep.getUUID();
        const name = sheep.getName().getString();
        const pos = sheep.getPos();
        const color = sheep.getColor();
        const isSheared = sheep.isSheared();
        const isJeb = sheep.isJeb();

        const sheepData = {
            sheep: sheep,
            name: name,
            color: color,
            colorName: color.getName(),
            colorRgb: color.getColorValue(),
            isSheared: isSheared,
            isJeb: isJeb,
            lastPosition: pos,
            lastSeen: Client.getTime(),
            needsShearing: !isSheared,
            productionReady: !isSheared && !isJeb
        };

        this.managedSheep.set(uuid, sheepData);
        this.farmStats.totalSheep++;

        if (isSheared) {
            this.farmStats.shearedSheep++;
        } else {
            this.farmStats.unshearedSheep++;
        }

        // Update color distribution
        const colorKey = color.getName();
        this.farmStats.colorDistribution.set(colorKey,
            (this.farmStats.colorDistribution.get(colorKey) || 0) + 1
        );

        const colorDisplayName = this.getColorDisplayName(colorName);
        Chat.log(`&aRegistered sheep: ${name} (${colorDisplayName})`);

        // Highlight new sheep
        sheep.setGlowing(true);
        sheep.setGlowingColor(this.getColorPriority(colorName));

        return sheepData;
    }

    getColorDisplayName(colorName) {
        const displayNames = {
            "white": "White",
            "orange": "Orange",
            "magenta": "Magenta",
            "light_blue": "Light Blue",
            "yellow": "Yellow",
            "lime": "Lime",
            "pink": "Pink",
            "gray": "Gray",
            "light_gray": "Light Gray",
            "cyan": "Cyan",
            "purple": "Purple",
            "blue": "Blue",
            "brown": "Brown",
            "green": "Green",
            "red": "Red",
            "black": "Black"
        };
        return displayNames[colorName] || colorName;
    }

    getColorPriority(colorName) {
        const priority = this.colorPriorities.indexOf(colorName);
        if (priority === -1) return 0x888888; // Gray for unprioritized

        // Different colors for priority levels
        const colors = [0xFFFFFF, 0x000000, 0x808080, 0xC0C0C0, 0x8B4513, 0xFFC0CB];
        return colors[priority] || 0x888888;
    }

    updateSheep(sheep) {
        const uuid = sheep.getUUID();
        const currentState = this.getSheepState(sheep);
        const pos = sheep.getPos();

        let sheepData = this.managedSheep.get(uuid);
        if (!sheepData) {
            sheepData = this.registerSheep(sheep);
        }

        const previousState = sheepData.lastState;
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(sheep);

        // Check for state changes
        this.detectSheepChanges(sheepData, previousState, currentState);

        // Update statistics
        this.updateFarmStats(currentState);

        // Handle distance-based interactions
        this.handleSheepInteractions(sheep, distance, currentState);

        // Update stored data
        sheepData.lastPosition = pos;
        sheepData.lastState = currentState;
        sheepData.lastUpdate = Client.getTime();
    }

    getSheepState(sheep) {
        const color = sheep.getColor();
        return {
            isSheared: sheep.isSheared(),
            isJeb: sheep.isJeb(),
            color: color.getName(),
            colorRgb: color.getColorValue(),
            health: sheep.asLiving ? sheep.asLiving().getHealth() : 0
        };
    }

    detectSheepChanges(sheepData, previousState, currentState) {
        const { sheep, name } = sheepData;
        let changes = [];

        // Shearing status changes
        if (previousState.isSheared !== currentState.isSheared) {
            if (currentState.isSheared) {
                changes.push("&aSheared");
                Chat.log(`&a${name} was sheared!`);
                sheep.setGlowingColor(0xC0C0C0); // Silver for sheared
                this.farmStats.woolProduction++;
            } else {
                changes.push("&7Regrew wool");
                Chat.log(`&7${name} regrew wool!`);
                sheep.setGlowingColor(sheepData.colorRgb);
            }
        }

        // Jeb status changes
        if (previousState.isJeb !== currentState.isJeb) {
            if (currentState.isJeb) {
                changes.push("&6Rainbow mode activated");
                Chat.log(`&6${name} is now a rainbow sheep!`);
                sheep.setGlowingColor(0xFF00FF); // Magenta for jeb
            }
        }

        // Report changes
        if (changes.length > 0) {
            const changesText = changes.join(", ");
            Chat.log(`&6${name}: ${changesText}`);
        }
    }

    updateFarmStats(currentState) {
        if (currentState.isSheared) {
            this.farmStats.shearedSheep = 1;
            this.farmStats.unshearedSheep = 0;
        } else {
            this.farmStats.shearedSheep = 0;
            this.farmStats.unshearedSheep = 1;
        }
    }

    handleSheepInteractions(sheep, distance, currentState) {
        const name = sheep.getName().getString();
        const player = Player.getPlayer();

        if (!player) return;

        const mainHand = player.getMainHand();
        const hasShears = mainHand && mainHand.getId() === "minecraft:shears";

        if (distance <= 3) {
            if (currentState.isSheared && !currentState.isJeb) {
                Chat.actionbar(`&7${name} has no wool to shear`);
            } else if (!currentState.isSheared && hasShears) {
                Chat.actionbar(`&aRight-click ${name} to shear (wool ready)`);
                sheep.setGlowing(true);
            } else if (!currentState.isSheared && !hasShears) {
                Chat.actionbar(`&eHold shears to shear ${name}`);
                sheep.setGlowing(true);
            } else if (currentState.isJeb) {
                Chat.actionbar(`&6${name} is a rainbow sheep (shears may drop original wool)`);
                sheep.setGlowing(true);
            }
        } else if (distance <= 8) {
            if (currentState.isSheared && !currentState.isJeb) {
                sheep.setGlowing(false);
            } else {
                sheep.setGlowing(true);
            }
        } else {
            sheep.resetGlowing();
        }
    }

    findBreedingPairs() {
        const unshearedSheep = Array.from(this.managedSheep.values())
            .filter(sheep => !sheep.lastState.isSheared);

        const breedingPairs = [];
        for (let i = 0; i < unshearedSheep.length; i++) {
            for (let j = i + 1; j < unshearedSheep.length; j++) {
                if (unshearedSheep[i].sheep.canBreedWith(unshearedSheep[j].sheep)) {
                    const distance = unshearedSheep[i].lastPosition.distanceTo(unshearedSheep[j].lastPosition);
                    breedingPairs.push({
                        sheep1: unshearedSheep[i],
                        sheep2: unshearedSheep[j],
                        distance: distance,
                        color1: unshearedSheep[i].colorName,
                        color2: unshearedSheep[j].colorName
                    });
                }
            }
        }

        return breedingPairs.sort((a, b) => a.distance - b.distance);
    }

    generateFarmReport() {
        Chat.log("=== Sheep Farm Report ===");

        // General statistics
        Chat.log(`&6Total sheep: ${this.managedSheep.size}`);
        Chat.log(`&6Sheared: ${this.farmStats.shearedSheep}`);
        Chat.log(`&6Unsheared (ready for production): ${this.farmStats.unshearedSheep}`);
        Chat.log(`&6Total wool production: ${this.farmStats.woolProduction}`);

        // Color distribution
        if (this.farmStats.colorDistribution.size > 0) {
            Chat.log("\n&6Color Distribution:");
            for (const [colorName, count] of this.farmStats.colorDistribution) {
                const displayName = this.getColorDisplayName(colorName);
                Chat.log(`  ${displayName}: ${count}`);
            }
        }

        // Breeding analysis
        const breedingPairs = this.findBreedingPairs();
        if (breedingPairs.length > 0) {
            Chat.log(`\n&eBreeding Opportunities (${breedingPairs.length}):`);
            breedingPairs.slice(0, 3).forEach((pair, index) => {
                const displayName1 = this.getColorDisplayName(pair.color1);
                const displayName2 = this.getColorDisplayName(pair.color2);
                Chat.log(`  ${index + 1}. ${displayName1} + ${displayName2} (${pair.distance.toFixed(1)}m)`);
            });
        }

        // Highlight sheep that need attention
        const needsAttention = [];
        for (const [uuid, sheepData] of this.managedSheep) {
            if (!sheepData.lastState.isSheared && !sheepData.lastState.isJeb) {
                needsAttention.push(sheepData);
            }
        }

        if (needsAttention.length > 0) {
            Chat.log(`\n&eSheep ready for shearing (${needsAttention.length}):`);
            needsAttention.forEach(sheepData => {
                const displayName = this.getColorDisplayName(sheepData.colorName);
                Chat.log(`  - ${sheepData.name} (${displayName})`);
            });
        }
    }

    scanFarm() {
        const entities = World.getEntities(this.scanRadius);
        const currentSheepUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:sheep")) {
                const sheep = entity.asSheep();
                const uuid = sheep.getUUID();
                currentSheepUUIDs.add(uuid);

                this.updateSheep(sheep);
            }
        });

        // Remove sheep that are no longer in range
        for (const [uuid, sheepData] of this.managedSheep) {
            if (!currentSheepUUIDs.has(uuid) &&
                (Client.getTime() - sheepData.lastSeen > 60000)) {
                Chat.log(`&7${sheepData.name} left farm range`);
                this.managedSheep.delete(uuid);
            }
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        this.scanFarm();
    }
}

// Initialize sheep farm manager
const sheepFarm = new SheepFarmManager();

// Update farm every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    sheepFarm.update();
}));

// Generate comprehensive report every 60 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        sheepFarm.generateFarmReport();
    }
}));

Chat.log("&aSheep Farm Manager activated!");
Chat.log("&7Monitoring sheep colors, shearing status, and breeding opportunities...");
```

### Sheep Color Breeding Program
```js
// Advanced sheep color breeding and collection system
class SheepColorBreeder {
    constructor() {
        this.targetColors = ["white", "black", "gray", "light_gray", "brown", "pink"];
        this.breedingPairs = [];
        this.colorChances = new Map();
        this.rareColors = ["magenta", "light_blue", "yellow", "lime", "cyan", "purple", "blue", "green", "red", "orange"];
        this.initializeBreedingData();
    }

    initializeBreedingData() {
        // Initialize color breeding chances (simplified Mendelian genetics)
        this.colorChances.set("white:white", ["white", 1.0]);
        this.colorChances.set("black:black", ["black", 1.0]);
        this.colorChances.set("black:white", ["gray", 1.0]);
        this.colorChances.set("gray:white", ["light_gray", 1.0]);
        this.colorChances.set("brown:white", ["brown", 1.0]);
        this.colorChances.set("pink:white", ["pink", 1.0]);

        // Rare color combinations
        this.colorChances.set("magenta:white", ["pink", 0.5]);
        this.colorChances.set("light_blue:white", ["cyan", 0.5]);
        this.colorChances.set("yellow:white", ["lime", 0.5]);
    }

    scanForBreedingStock() {
        const entities = World.getEntities(25);
        const breedingStock = [];
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:sheep")) {
                const sheep = entity.asSheep();
                const color = sheep.getColor();
                const colorName = color.getName();
                const distance = player.distanceTo(entity);
                const isSheared = sheep.isSheared();
                const isJeb = sheep.isJeb();

                if (!isSheared && !isJeb) {
                    breedingStock.push({
                        sheep: sheep,
                        entity: entity,
                        color: colorName,
                        colorRgb: color.getColorValue(),
                        distance: distance,
                        pos: entity.getPos(),
                        isTargetColor: this.targetColors.includes(colorName),
                        isRareColor: this.rareColors.includes(colorName)
                    });
                }
            }
        });

        return breedingStock.sort((a, b) => a.distance - b.distance);
    }

    analyzeBreedingOpportunities() {
        const stock = this.scanForBreedingStock();
        if (stock.length < 2) {
            if (stock.length === 1) {
                Chat.log("&eYou have 1 sheep available for breeding.");
            } else {
                Chat.log("&eNo sheep available for breeding.");
            }
            return;
        }

        Chat.log(`&a=== Sheep Breeding Analysis ===`);
        Chat.log(`Found ${stock.length} sheep available for breeding.`);

        this.breedingPairs = [];

        // Analyze all possible pairs
        for (let i = 0; i < stock.length; i++) {
            for (let j = i + 1; j < stock.length; j++) {
                const sheep1 = stock[i];
                const sheep2 = stock[j];

                if (sheep1.sheep.canBreedWith(sheep2.sheep)) {
                    const pair = {
                        sheep1: sheep1,
                        sheep2: sheep2,
                        distance: sheep1.distance + sheep2.distance,
                        color1: sheep1.color,
                        color2: sheep2.color,
                        potentialColors: this.getPotentialColors(sheep1.color, sheep2.color),
                        isTargetPair: this.isTargetColorPair(sheep1.color, sheep2.color),
                        isRarePair: this.isRareColorPair(sheep1.color, sheep2.color)
                    };

                    this.breedingPairs.push(pair);

                    // Log breeding pair information
                    const displayName1 = this.getColorDisplayName(sheep1.color);
                    const displayName2 = this.getColorDisplayName(sheep2.color);

                    let logMessage = `&aBreeding pair: ${displayName1} + ${displayName2}`;
                    if (pair.isTargetPair) {
                        logMessage += ` &2✓ Target colors`;
                    }
                    if (pair.isRarePair) {
                        logMessage += ` &6✨ Rare potential`;
                    }

                    Chat.log(logMessage);

                    // Log potential offspring colors
                    if (pair.potentialColors.length > 0) {
                        Chat.log(`  &7Potential offspring: ${pair.potentialColors.join(", ")}`);
                    }
                }
            }
        }

        if (this.breedingPairs.length === 0) {
            Chat.log("&eNo compatible breeding pairs found.");
        }
    }

    getPotentialColors(color1, color2) {
        const key1 = `${color1}:${color2}`;
        const key2 = `${color2}:${color1}`;

        const result1 = this.colorChances.get(key1);
        const result2 = this.colorChances.get(key2);

        if (result1) return [result1[0]];
        if (result2) return [result2[0]];

        return ["unknown"];
    }

    isTargetColorPair(color1, color2) {
        return this.targetColors.includes(color1) && this.targetColors.includes(color2);
    }

    isRareColorPair(color1, color2) {
        return this.rareColors.includes(color1) || this.rareColors.includes(color2);
    }

    getColorDisplayName(colorName) {
        const displayNames = {
            "white": "White",
            "orange": "Orange",
            "magenta": "Magenta",
            "light_blue": "Light Blue",
            "yellow": "Yellow",
            "lime": "Lime",
            "pink": "Pink",
            "gray": "Gray",
            "light_gray": "Light Gray",
            "cyan": "Cyan",
            "purple": "Purple",
            "blue": "Blue",
            "brown": "Brown",
            "green": "Green",
            "red": "Red",
            "black": "Black"
        };
        return displayNames[colorName] || colorName;
    }

    highlightOptimalPairs() {
        const targetPairs = this.breedingPairs.filter(pair => pair.isTargetPair);
        const rarePairs = this.breedingPairs.filter(pair => pair.isRarePair);

        let highlightedCount = 0;

        // Highlight target color pairs
        targetPairs.forEach((pair, index) => {
            pair.sheep1.entity.setGlowing(true);
            pair.sheep1.entity.setGlowingColor(0x00FF00); // Green for target pairs
            pair.sheep2.entity.setGlowing(true);
            pair.sheep2.entity.setGlowingColor(0x00FF00);
            highlightedCount++;
        });

        // Highlight rare color pairs
        rarePairs.forEach((pair, index) => {
            if (!targetPairs.includes(pair)) { // Don't double highlight
                pair.sheep1.entity.setGlowing(true);
                pair.sheep1.entity.setGlowingColor(0xFFD700); // Gold for rare pairs
                pair.sheep2.entity.setGlowing(true);
                pair.sheep2.entity.setGlowingColor(0xFFD700);
                highlightedCount++;
            }
        });

        if (highlightedCount > 0) {
            Chat.log(`&6Highlighted ${highlightedCount} optimal breeding pair${highlightedCount > 1 ? 's' : ''}`);
        }
    }

    collectColorInventory() {
        const entities = World.getEntities(15);
        const colorInventory = new Map();
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:sheep")) {
                const sheep = entity.asSheep();
                const color = sheep.getColor();
                const colorName = color.getName();
                const distance = player.distanceTo(entity);

                if (distance <= 8) {
                    if (!colorInventory.has(colorName)) {
                        colorInventory.set(colorName, []);
                    }
                    colorInventory.get(colorName).push({
                        sheep: sheep,
                        distance: distance,
                        isSheared: sheep.isSheared(),
                        isJeb: sheep.isJeb()
                    });
                }
            }
        });

        return colorInventory;
    }

    generateColorInventoryReport() {
        const inventory = this.collectColorInventory();

        Chat.log("=== Sheep Color Inventory ===");

        let totalSheep = 0;
        let productiveSheep = 0;

        for (const [colorName, sheepList] of inventory) {
            const displayName = this.getColorDisplayName(colorName);
            const productive = sheepList.filter(s => !s.isSheared && !s.isJeb).length;
            const sheared = sheepList.filter(s => s.isSheared).length;

            totalSheep += sheepList.length;
            productiveSheep += productive;

            if (this.targetColors.includes(colorName)) {
                Chat.log(`&2${displayName}: ${productive} ready, ${sheared} sheared (${sheepList.length} total)`);
            } else if (this.rareColors.includes(colorName)) {
                Chat.log(`&6${displayName}: ${productive} ready, ${sheared} sheared (${sheepList.length} total)`);
            } else {
                Chat.log(`&7${displayName}: ${productive} ready, ${sheared} sheared (${sheepList.length} total)`);
            }

            // List individual sheep distances
            if (sheepList.length > 0) {
                sheepList.forEach(sheepData => {
                    const status = sheepData.isSheared ? "sheared" :
                                 sheepData.isJeb ? "jeb" : "ready";
                    const emoji = sheepData.isSheared ? "🐑" :
                                 sheepData.isJeb ? "🌈" : "✨";
                    Chat.log(`  ${emoji} ${sheepData.distance.toFixed(1)}m - ${status}`);
                });
            }
        }

        Chat.log(`\n&6Summary: ${productiveSheep}/${totalSheep} sheep ready for wool production`);

        if (productiveSheep > 0) {
            Chat.log("&a✓ You have sheep ready for shearing!");
        } else {
            Chat.log("&eTip: Find unsheared sheep and hold shears to collect wool");
        }
    }

    update() {
        // Check for rainbow sheep (jeb_) nearby
        const entities = World.getEntities(10);
        let foundJeb = false;

        entities.forEach(entity => {
            if (entity.is("minecraft:sheep")) {
                const sheep = entity.asSheep();
                if (sheep.isJeb()) {
                    foundJeb = true;
                    entity.setGlowing(true);
                    entity.setGlowingColor(0xFF00FF); // Magenta for jeb sheep
                    Chat.actionbar("&6🌈 Rainbow sheep detected!");
                }
            }
        });

        if (!foundJeb) {
            // Clear previous jeb highlights
            entities.forEach(entity => {
                if (entity.is("minecraft:sheep")) {
                    const sheep = entity.asSheep();
                    if (!sheep.isJeb()) {
                        entity.resetGlowing();
                    }
                }
            });
        }
    }
}

// Initialize sheep color breeder
const sheepBreeder = new SheepColorBreeder();

// Analyze breeding opportunities every 15 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 15) === 0) {
        sheepBreeder.analyzeBreedingOpportunities();
        sheepBreeder.highlightOptimalPairs();
    }
}));

// Update nearby sheep detection every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        sheepBreeder.update();
    }
}));

// Generate color inventory report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        sheepBreeder.generateColorInventoryReport();
    }
}));

Chat.log("&aSheep Color Breeder activated!");
Chat.log("&7Analyzing breeding opportunities and color genetics...");
```

## Notes and Limitations

- SheepEntityHelper instances become invalid when the sheep entity is removed from the world. Always check `isAlive()` before accessing sheep data.
- `isSheared()` returns true when the sheep has been sheared and has no wool. Wool regrows over time when sheep eat grass.
- `isShearable()` checks if the sheep can be sheared (must have wool and not be a baby sheep).
- `getColor()` returns a `DyeColorHelper` with RGB values and color information for sheep wool.
- `isJeb()` detects the special "jeb_" named sheep that cycle through all colors when rendered. When sheared, they drop their original colored wool.
- The inheritance hierarchy provides access to all animal methods including breeding mechanics, food preferences, and general mob behaviors.
- Sheep have unique color genetics where offspring inherit colors from parents following Minecraft's breeding system.
- Rainbow sheep (jeb_) are rare and produce special visual effects but can still be sheared for their original wool color.
- Distance calculations and color tracking are essential for efficient sheep farm automation and breeding programs.

## Related Classes

- `AnimalEntityHelper` - Base class for all animal entities with breeding and food functionality
- `TameableEntityHelper` - Tameable animal functionality (sheep are not tameable but this is in the animal hierarchy)
- `MobEntityHelper` - Mob entity functionality with AI and movement states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `DyeColorHelper` - Color information and RGB values for sheep wool colors
- Specific animal helpers like `CowEntityHelper`, `PigEntityHelper`, `ChickenEntityHelper` for other farm animals

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft SheepEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for sheep farm automation, color management, and wool production systems

---

**See Also:**
- [EntityHelper.asSheep()](#entityassheep) - Method to cast entities to SheepEntityHelper
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal entity base class with breeding and food functionality
- [DyeColorHelper](F:\java\JsMacros\JsMacros-Docs\classes\DyeColorHelper.md) - Color information and RGB values for sheep wool