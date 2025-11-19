# CatEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.CatEntityHelper`

**Extends:** `TameableEntityHelper<CatEntity>`

The `CatEntityHelper` class provides specialized access to cat entities in Minecraft, offering methods to monitor and interact with cat-specific behaviors such as sleeping states, collar colors, and breed variants. This class extends `TameableEntityHelper` and inherits all functionality for tameable animals including taming status, sitting behavior, and ownership tracking.

This helper is particularly useful for creating scripts that manage cat companions, monitor cat behavior patterns, track different cat variants for breeding purposes, or coordinate with multiple cats in the world.

## Constructors

CatEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type-specific methods

## Methods

### Cat-Specific State

- [cat.isSleeping()](#catisSleeping)
- [cat.getCollarColor()](#catgetCollarColor)
- [cat.getVariant()](#catgetVariant)

### Inherited Methods

The CatEntityHelper inherits all methods from:
- **TameableEntityHelper:** `isTamed()`, `isSitting()`, `getOwner()`, `isOwner()`
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Cat-Specific State

## Usage Examples

### Complete Cat Management System
```js
// Comprehensive cat companion management and monitoring system
class CatCompanionManager {
    constructor() {
        this.managedCats = new Map();
        this.catStats = {
            totalTamed: 0,
            sleepingCats: 0,
            awakeCats: 0,
            variants: new Set()
        };
        this.alertLevels = {
            nearby: 8,    // 8 blocks - cat is nearby
            close: 4,     // 4 blocks - cat is very close
            touching: 2   // 2 blocks - cat is within touching distance
        };
    }

    registerCat(cat) {
        const uuid = cat.getUUID();
        const name = cat.getName().getString();
        const pos = cat.getPos();
        const variant = cat.getVariant();
        const collarColor = cat.getCollarColor();
        const isTamed = cat.isTamed();

        if (!isTamed) return null;

        const catData = {
            cat: cat,
            name: name,
            variant: variant,
            collarColor: collarColor.getName(),
            colorRgb: collarColor.getColorValue(),
            lastPosition: pos,
            lastState: this.getCatState(cat),
            firstSeen: Client.getTime(),
            lastUpdate: Client.getTime()
        };

        this.managedCats.set(uuid, catData);
        this.catStats.totalTamed++;
        this.catStats.variants.add(variant);

        const variantName = this.getVariantDisplayName(variant);
        Chat.log(`&aRegistered tamed cat: ${name} (${variantName}, ${collarColor.getName()} collar)`);

        // Highlight new registration
        cat.setGlowing(true);
        cat.setGlowingColor(catData.colorRgb);

        return catData;
    }

    getVariantDisplayName(variantId) {
        const variantNames = {
            "minecraft:tabby": "Tabby",
            "minecraft:black": "Black",
            "minecraft:red": "Red",
            "minecraft:siamese": "Siamese",
            "minecraft:british_shorthair": "British Shorthair",
            "minecraft:calico": "Calico",
            "minecraft:persian": "Persian",
            "minecraft:ragdoll": "Ragdoll",
            "minecraft:white": "White",
            "minecraft:jellie": "Jellie",
            "minecraft:all_black": "All Black"
        };
        return variantNames[variantId] || variantId.replace("minecraft:", "").replace(/_/g, " ");
    }

    getCatState(cat) {
        return {
            isTamed: cat.isTamed(),
            isSleeping: cat.isSleeping(),
            isSitting: cat.isSitting(),
            variant: cat.getVariant(),
            collarColor: cat.getCollarColor().getName(),
            health: cat.asLiving ? cat.asLiving().getHealth() : 0,
            owner: cat.getOwner()
        };
    }

    updateCat(cat) {
        const uuid = cat.getUUID();
        const currentState = this.getCatState(cat);
        const pos = cat.getPos();

        let catData = this.managedCats.get(uuid);
        if (!catData) {
            catData = this.registerCat(cat);
        }

        const previousState = catData.lastState;
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(cat);

        // Check for state changes
        this.detectStateChanges(catData, previousState, currentState);

        // Update statistics
        this.updateStatistics(currentState);

        // Handle distance-based interactions
        this.handleDistanceInteractions(cat, distance, currentState);

        // Update stored data
        catData.lastPosition = pos;
        catData.lastState = currentState;
        catData.lastUpdate = Client.getTime();
    }

    detectStateChanges(catData, previousState, currentState) {
        const { cat, name } = catData;
        let changes = [];

        // Sleep status changes
        if (previousState.isSleeping !== currentState.isSleeping) {
            if (currentState.isSleeping) {
                changes.push("&7Cat fell asleep");
                Chat.log(`&7${name} is now sleeping...`);
                cat.setGlowingColor(0xAAAAFF); // Soft blue for sleeping
            } else {
                changes.push("&aCat woke up");
                Chat.log(`&a${name} woke up!`);
                cat.setGlowingColor(catData.colorRgb); // Back to collar color
            }
        }

        // Sitting status changes
        if (previousState.isSitting !== currentState.isSitting) {
            if (currentState.isSitting) {
                changes.push("&7Cat is now sitting");
            } else {
                changes.push("&fCat is now standing");
            }
        }

        // Report changes
        if (changes.length > 0) {
            const changesText = changes.join(", ");
            Chat.log(`&6${name}: ${changesText}`);
        }
    }

    updateStatistics(currentState) {
        if (currentState.isSleeping) {
            this.catStats.sleepingCats = 1;
            this.catStats.awakeCats = 0;
        } else {
            this.catStats.sleepingCats = 0;
            this.catStats.awakeCats = 1;
        }
    }

    handleDistanceInteractions(cat, distance, currentState) {
        const name = cat.getName().getString();

        if (distance <= this.alertLevels.touching) {
            // Cat is within touching distance
            if (currentState.isSleeping) {
                Chat.actionbar("&7Shh... " + name + " is sleeping nearby");
            } else {
                Chat.actionbar("&a" + name + " is right here! (" + distance.toFixed(1) + "m)");
            }
            cat.setGlowing(true);
        } else if (distance <= this.alertLevels.close) {
            // Cat is very close
            if (!currentState.isSleeping) {
                Chat.actionbar("&7" + name + " is close (" + distance.toFixed(1) + "m)");
            }
            cat.setGlowing(true);
        } else if (distance <= this.alertLevels.nearby) {
            // Cat is nearby
            cat.setGlowing(true);
        } else if (distance > this.alertLevels.nearby * 2) {
            // Cat is far, turn off glowing
            cat.resetGlowing();
        }
    }

    generateReport() {
        Chat.log("=== Cat Companion Report ===");
        Chat.log(`Total managed cats: ${this.managedCats.size}`);
        Chat.log(`Unique variants collected: ${this.catStats.variants.size}`);
        Chat.log(`Currently sleeping: ${this.catStats.sleepingCats}`);
        Chat.log(`Currently awake: ${this.catStats.awakeCats}`);

        // Variant collection status
        if (this.catStats.variants.size > 0) {
            Chat.log("\n&aCollected variants:");
            for (const variant of this.catStats.variants) {
                const variantName = this.getVariantDisplayName(variant);
                Chat.log(`  - ${variantName}`);
            }
        }

        // Detailed status for each cat
        for (const [uuid, catData] of this.managedCats) {
            const { name, lastState, lastPosition } = catData;
            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(lastPosition) : 0;

            Chat.log(`\n${name}:`);
            Chat.log(`  - Variant: ${this.getVariantDisplayName(lastState.variant)}`);
            Chat.log(`  - Collar: ${lastState.collarColor}`);
            Chat.log(`  - Status: ${lastState.isSleeping ? "Sleeping" : "Awake"}, ${lastState.isSitting ? "Sitting" : "Standing"}`);
            Chat.log(`  - Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  - Health: ${lastState.health.toFixed(1)}`);
        }
    }

    update() {
        const entities = World.getEntities();
        const currentCatUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:cat")) {
                const cat = entity.asCat();
                const uuid = cat.getUUID();
                currentCatUUIDs.add(uuid);

                this.updateCat(cat);
            }
        });

        // Remove cats that are no longer in range
        for (const [uuid, catData] of this.managedCats) {
            if (!currentCatUUIDs.has(uuid)) {
                Chat.log(`&7${catData.name} left tracking range`);
                this.managedCats.delete(uuid);
            }
        }
    }
}

// Initialize and run the cat manager
const catManager = new CatCompanionManager();

// Update every tick for real-time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    catManager.update();
}));

// Generate comprehensive report every 3 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 3) === 0) {
        catManager.generateReport();
    }
}));

Chat.log("&aCat Companion Manager activated! Monitoring your feline friends.");
```

### Cat Breeding Assistant
```js
// Cat breeding and variant collection assistance system
class CatBreedingAssistant {
    constructor() {
        this.breedingItems = ["minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:pufferfish"];
        this.breedingPairs = [];
        this.rareVariants = ["minecraft:siamese", "minecraft:persian", "minecraft:ragdoll", "minecraft:jellie"];
    }

    scanForBreedingOpportunities() {
        const entities = World.getEntities(20);
        const tamedCats = [];
        const player = Player.getPlayer();

        if (!player) return;

        // Collect all tamed cats
        entities.forEach(entity => {
            if (entity.is("minecraft:cat")) {
                const cat = entity.asCat();
                if (cat.isTamed() && !cat.isSitting()) {
                    tamedCats.push({
                        cat: cat,
                        variant: cat.getVariant(),
                        name: cat.getName().getString(),
                        pos: entity.getPos(),
                        distance: player.distanceTo(entity)
                    });
                }
            }
        });

        if (tamedCats.length < 2) {
            if (tamedCats.length === 1) {
                Chat.log("&eYou have 1 tamed cat available for breeding.");
            } else {
                Chat.log("&eNo tamed cats nearby for breeding.");
            }
            return;
        }

        Chat.log(`&a=== Cat Breeding Analysis ===`);
        Chat.log(`Found ${tamedCats.length} tamed cats available for breeding.`);

        // Check all possible pairs
        this.breedingPairs = [];
        for (let i = 0; i < tamedCats.length; i++) {
            for (let j = i + 1; j < tamedCats.length; j++) {
                const cat1 = tamedCats[i];
                const cat2 = tamedCats[j];

                if (cat1.cat.canBreedWith(cat2.cat)) {
                    this.breedingPairs.push({ cat1, cat2 });

                    const variant1Name = this.getVariantDisplayName(cat1.variant);
                    const variant2Name = this.getVariantDisplayName(cat2.variant);

                    Chat.log(`&aBreeding pair: ${cat1.name} (${variant1Name}) + ${cat2.name} (${variant2Name})`);

                    // Check for rare variant combinations
                    const hasRare = this.rareVariants.includes(cat1.variant) || this.rareVariants.includes(cat2.variant);
                    if (hasRare) {
                        Chat.log(`  &6✨ Rare variant potential detected!`);
                    }
                }
            }
        }

        if (this.breedingPairs.length === 0) {
            Chat.log("&eNo breeding pairs currently available. Make sure:");
            Chat.log("- Both cats are tamed and not sitting");
            Chat.log("- Cats have different owners or same owner");
            Chat.log("- You have fish for breeding");
        }

        // Check if player has breeding food
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        let hasFish = false;

        if (mainHand && this.breedingItems.includes(mainHand.getId())) hasFish = true;
        if (offHand && this.breedingItems.includes(offHand.getId())) hasFish = true;

        if (hasFish && this.breedingPairs.length > 0) {
            Chat.log("&a✓ You have fish ready for breeding!");
        } else if (this.breedingPairs.length > 0) {
            Chat.log("&eTip: Hold fish (cod, salmon, tropical fish, or pufferfish) to breed cats");
        }
    }

    getVariantDisplayName(variantId) {
        const variantNames = {
            "minecraft:tabby": "Tabby",
            "minecraft:black": "Black",
            "minecraft:red": "Red",
            "minecraft:siamese": "Siamese",
            "minecraft:british_shorthair": "British Shorthair",
            "minecraft:calico": "Calico",
            "minecraft:persian": "Persian",
            "minecraft:ragdoll": "Ragdoll",
            "minecraft:white": "White",
            "minecraft:jellie": "Jellie",
            "minecraft:all_black": "All Black"
        };
        return variantNames[variantId] || variantId.replace("minecraft:", "").replace(/_/g, " ");
    }

    highlightBreedingPairs() {
        if (this.breedingPairs.length === 0) {
            Chat.log("&7No breeding pairs to highlight.");
            return;
        }

        Chat.log(`&6Highlighting ${this.breedingPairs.length} breeding pair${this.breedingPairs.length > 1 ? 's' : ''}:`);

        this.breedingPairs.forEach((pair, index) => {
            const { cat1, cat2 } = pair;

            // Highlight with different colors for each pair
            const colors = [0xFF00FF, 0x00FFFF, 0xFFFF00, 0xFF00AA, 0x00FFAA];
            const color = colors[index % colors.length];

            cat1.cat.setGlowing(true);
            cat1.cat.setGlowingColor(color);
            cat2.cat.setGlowing(true);
            cat2.cat.setGlowingColor(color);

            Chat.log(`  Pair ${index + 1}: ${cat1.name} + ${cat2.name}`);
        });
    }

    findCatsForVariantCollection() {
        const entities = World.getEntities(50);
        const wildCats = [];
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:cat")) {
                const cat = entity.asCat();
                if (!cat.isTamed()) {
                    wildCats.push({
                        cat: cat,
                        variant: cat.getVariant(),
                        name: cat.getName().getString(),
                        pos: entity.getPos(),
                        distance: player.distanceTo(entity)
                    });
                }
            }
        });

        if (wildCats.length === 0) {
            Chat.log("&7No wild cats found in the area.");
            return;
        }

        Chat.log(`&e=== Wild Cats for Taming ===`);
        Chat.log(`Found ${wildCats.length} wild cats:`);

        // Group by variant
        const variantGroups = new Map();
        wildCats.forEach(catData => {
            if (!variantGroups.has(catData.variant)) {
                variantGroups.set(catData.variant, []);
            }
            variantGroups.get(catData.variant).push(catData);
        });

        for (const [variant, cats] of variantGroups) {
            const variantName = this.getVariantDisplayName(variant);
            const isRare = this.rareVariants.includes(variant);
            Chat.log(`\n${isRare ? "&6✨ " : "&7"}${variantName} (${cats.length} found):`);

            cats.forEach(catData => {
                Chat.log(`  - ${catData.distance.toFixed(1)}m away [${catData.pos.x.toFixed(0)}, ${catData.pos.y.toFixed(0)}, ${catData.pos.z.toFixed(0)}]`);
            });
        }

        // Check taming readiness
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        const hasTamingFood = mainHand && ["minecraft:cod", "minecraft:salmon"].includes(mainHand.getId()) ||
                               offHand && ["minecraft:cod", "minecraft:salmon"].includes(offHand.getId());

        if (hasTamingFood) {
            Chat.log("&a✓ You have fish ready for taming!");
        } else {
            Chat.log("&eTip: Hold cod or salmon to tame wild cats");
        }
    }

    update() {
        const entities = World.getEntities(15); // Close range for breeding
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:cat")) {
                const cat = entity.asCat();
                const distance = player.distanceTo(entity);

                if (distance <= 8 && cat.isTamed() && !cat.isSitting()) {
                    // Check for nearby breeding partners
                    entities.forEach(otherEntity => {
                        if (otherEntity.is("minecraft:cat") && entity !== otherEntity) {
                            const otherCat = otherEntity.asCat();
                            const otherDistance = cat.distanceTo(otherEntity);

                            if (otherDistance <= 3 && otherCat.isTamed() && !otherCat.isSitting()) {
                                if (cat.canBreedWith(otherCat)) {
                                    Chat.actionbar("&aBreeding opportunity! Hold fish and right-click both cats.");

                                    // Highlight both cats
                                    entity.setGlowing(true);
                                    entity.setGlowingColor(0xFF00FF);
                                    otherEntity.setGlowing(true);
                                    otherEntity.setGlowingColor(0xFF00FF);
                                }
                            }
                        }
                    });
                }
            }
        });
    }
}

// Initialize breeding assistant
const catBreedingAssistant = new CatBreedingAssistant();

// Scan for breeding opportunities every 10 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 10) === 0) {
        catBreedingAssistant.scanForBreedingOpportunities();
    }
}));

// Update every 5 ticks for real-time detection
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        catBreedingAssistant.update();
    }
}));

Chat.log("&aCat Breeding Assistant activated! Scanning for breeding and taming opportunities.");
```

## Notes and Limitations

- CatEntityHelper instances become invalid when the cat entity is removed from the world (dies, despawns, or unloaded). Always check `isAlive()` before accessing cat data.
- `isSleeping()` returns true when cats are sleeping on beds, chests, or other furniture. They will wake up when disturbed or when night ends.
- `getCollarColor()` returns a `DyeColorHelper` with color information. Collar colors are only visible on tamed cats.
- `getVariant()` returns one of 11 possible cat variants, which affects appearance and breeding patterns.
- The inheritance hierarchy provides access to all tameable entity methods including ownership tracking and sitting behavior.
- Tamed cats will follow their owners, hunt for mobs, and can be instructed to sit or stand.
- Cats have unique behaviors like hissing at phantoms and bringing gifts to players who sleep.
- Cat variants can be collected for breeding purposes - kittens inherit variants from their parents.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important cats for better visibility.
- Cats will teleport to their owners if they get too far away, making them reliable companions.

## Related Classes

- `TameableEntityHelper` - Base class for tameable animals with ownership and behavior control
- `AnimalEntityHelper` - Animal-specific functionality including breeding and food preferences
- `MobEntityHelper` - Mob entity functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `DyeColorHelper` - Color information and RGB values for collar colors

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft CatEntity implementation
- Inherits comprehensive functionality from the tameable animal hierarchy
- Designed specifically for cat companion management and behavior monitoring