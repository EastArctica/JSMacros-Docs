# WolfEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.WolfEntityHelper`

**Extends:** `TameableEntityHelper<WolfEntity>`

The `WolfEntityHelper` class provides specialized access to wolf entities in Minecraft, offering methods to monitor and interact with wolf-specific behaviors such as taming status, anger levels, collar colors, and various wolf states. This class extends `TameableEntityHelper` and inherits all functionality for tameable animals including taming, sitting behavior, and ownership.

This helper is particularly useful for creating scripts that manage wolf companions, monitor wolf behavior patterns, coordinate wolf attacks, or track the status of tameable wolves in the world.

## Constructors

WolfEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type-specific methods

## Methods

### Wolf-Specific State

- [wolf.isBegging()](#wolfisbegging)
- [wolf.getCollarColor()](#wolfgetcollarcolor)
- [wolf.isAngry()](#wolfisangry)
- [wolf.isWet()](#wolfiswet)

### Inherited Methods

The WolfEntityHelper inherits all methods from:
- **TameableEntityHelper:** `isTamed()`, `isSitting()`, `getOwner()`, `isOwner()`
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Wolf-Specific State

## Usage Examples

### Complete Wolf Management System
```js
// Comprehensive wolf companion management and monitoring system
class WolfCompanionManager {
    constructor() {
        this.managedWolves = new Map();
        this.wolfStats = {
            totalTamed: 0,
            angryWolves: 0,
            wetWolves: 0,
            beggingWolves: 0
        };
        this.alertLevels = {
            danger: 8,     // 8 blocks - danger zone
            warning: 12,   // 12 blocks - warning zone
            safe: 20       // 20 blocks - safe zone
        };
    }

    registerWolf(wolf) {
        const uuid = wolf.getUUID();
        const name = wolf.getName().getString();
        const pos = wolf.getPos();

        const wolfData = {
            wolf: wolf,
            name: name,
            lastPosition: pos,
            lastState: this.getWolfState(wolf),
            firstSeen: Client.getTime(),
            lastUpdate: Client.getTime()
        };

        this.managedWolves.set(uuid, wolfData);

        if (wolf.isTamed()) {
            this.wolfStats.totalTamed++;
            Chat.log(`&aRegistered tamed wolf: ${name}`);

            // Show collar information
            const collarColor = wolf.getCollarColor();
            Chat.log(`&7Collar: ${collarColor.getName()} (#${collarColor.getColorValue().toString(16).padStart(6, '0')})`);
        } else {
            Chat.log(`&eRegistered wild wolf: ${name}`);
        }

        return wolfData;
    }

    getWolfState(wolf) {
        return {
            isTamed: wolf.isTamed(),
            isAngry: wolf.isAngry(),
            isWet: wolf.isWet(),
            isBegging: wolf.isBegging(),
            isSitting: wolf.isSitting(),
            collarColor: wolf.getCollarColor().getName(),
            health: wolf.asLiving ? wolf.asLiving().getHealth() : 0,
            owner: wolf.getOwner()
        };
    }

    updateWolf(wolf) {
        const uuid = wolf.getUUID();
        const currentState = this.getWolfState(wolf);
        const pos = wolf.getPos();

        let wolfData = this.managedWolves.get(uuid);
        if (!wolfData) {
            wolfData = this.registerWolf(wolf);
        }

        const previousState = wolfData.lastState;
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(wolf);

        // Check for state changes
        this.detectStateChanges(wolfData, previousState, currentState);

        // Update statistics
        this.updateStatistics(currentState);

        // Handle distance-based alerts
        this.handleDistanceAlerts(wolf, distance, currentState);

        // Update stored data
        wolfData.lastPosition = pos;
        wolfData.lastState = currentState;
        wolfData.lastUpdate = Client.getTime();
    }

    detectStateChanges(wolfData, previousState, currentState) {
        const { wolf, name } = wolfData;
        let changes = [];

        // Taming status changes
        if (previousState.isTamed !== currentState.isTamed) {
            if (currentState.isTamed) {
                changes.push("&aWolf has been tamed!");
                Chat.log(`&aCongratulations! ${name} is now your loyal companion!`);

                // Celebration effect
                wolf.setGlowing(true);
                wolf.setGlowingColor(0x00FF00);
            } else {
                changes.push("&cWolf is no longer tamed!");
            }
        }

        // Anger status changes
        if (previousState.isAngry !== currentState.isAngry) {
            if (currentState.isAngry) {
                changes.push("&cWolf is now angry!");
                Chat.log(`&cWarning: ${name} is angry and will attack!`);
                wolf.setGlowingColor(0xFF0000);
            } else {
                changes.push("&aWolf is no longer angry");
                wolf.setGlowingColor(currentState.isTamed ? currentState.collarColor === "white" ? 0xFFFFFF : 0x00FF00 : 0x808080);
            }
        }

        // Wet status changes
        if (previousState.isWet !== currentState.isWet) {
            if (currentState.isWet) {
                changes.push("&eWolf is now wet");
            } else {
                changes.push("&aWolf has dried off");
            }
        }

        // Begging status changes
        if (previousState.isBegging !== currentState.isBegging) {
            if (currentState.isBegging) {
                changes.push("&6Wolf is begging for food");
                Chat.actionbar(`&6${name} wants food!`);
            } else {
                changes.push("&7Wolf stopped begging");
            }
        }

        // Sitting status changes
        if (previousState.isSitting !== currentState.isSitting) {
            if (currentState.isSitting) {
                changes.push("&7Wolf is now sitting");
            } else {
                changes.push("&fWolf is now standing");
            }
        }

        // Collar color changes (for tamed wolves)
        if (currentState.isTamed && previousState.collarColor !== currentState.collarColor) {
            changes.push(`&dCollar color changed to ${currentState.collarColor}`);
            Chat.log(`&d${name}'s collar is now ${currentState.collarColor}`);
        }

        // Report changes
        if (changes.length > 0) {
            const changesText = changes.join(", ");
            Chat.log(`&6${name}: ${changesText}`);
        }
    }

    updateStatistics(currentState) {
        this.wolfStats.angryWolves = currentState.isAngry ? 1 : 0;
        this.wolfStats.wetWolves = currentState.isWet ? 1 : 0;
        this.wolfStats.beggingWolves = currentState.isBegging ? 1 : 0;
    }

    handleDistanceAlerts(wolf, distance, currentState) {
        const name = wolf.getName().getString();

        // Handle angry wolf distance alerts
        if (currentState.isAngry) {
            if (distance <= this.alertLevels.danger) {
                Chat.actionbar(`&c&&lDANGER: Angry wolf ${distance.toFixed(1)}m away!`);
                wolf.setGlowing(true);
                wolf.setGlowingColor(0xFF0000);
            } else if (distance <= this.alertLevels.warning) {
                Chat.actionbar(`&eWarning: Angry wolf nearby (${distance.toFixed(1)}m)`);
                wolf.setGlowing(true);
                wolf.setGlowingColor(0xFF8800);
            }
        }
        // Handle begging wolf alerts
        else if (currentState.isBegging && distance <= this.alertLevels.warning) {
            Chat.actionbar(`&6${name} is begging for food (${distance.toFixed(1)}m away)`);
            wolf.setGlowing(true);
            wolf.setGlowingColor(0xFFFF00);
        }
        // Handle tamed wolf proximity
        else if (currentState.isTamed) {
            if (distance <= this.alertLevels.danger) {
                wolf.setGlowing(true);
                wolf.setGlowingColor(currentState.collarColor === "white" ? 0xFFFFFF : 0x00FF00);
            } else if (distance > this.alertLevels.safe) {
                wolf.resetGlowing();
            }
        }
    }

    generateReport() {
        Chat.log("=== Wolf Companion Report ===");
        Chat.log(`Total managed wolves: ${this.managedWolves.size}`);
        Chat.log(`Tamed wolves: ${this.wolfStats.totalTamed}`);

        const angryCount = Array.from(this.managedWolves.values()).filter(w => w.lastState.isAngry).length;
        const wetCount = Array.from(this.managedWolves.values()).filter(w => w.lastState.isWet).length;
        const beggingCount = Array.from(this.managedWolves.values()).filter(w => w.lastState.isBegging).length;

        Chat.log(`Currently angry: ${angryCount}`);
        Chat.log(`Currently wet: ${wetCount}`);
        Chat.log(`Currently begging: ${beggingCount}`);

        // Detailed status for each wolf
        for (const [uuid, wolfData] of this.managedWolves) {
            const { name, lastState, lastPosition } = wolfData;
            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(lastPosition) : 0;

            Chat.log(`\n${name}:`);
            Chat.log(`  - Status: ${lastState.isTamed ? "Tamed" : "Wild"}, ${lastState.isAngry ? "Angry" : "Calm"}, ${lastState.isSitting ? "Sitting" : "Standing"}`);
            Chat.log(`  - Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  - Conditions: ${lastState.isWet ? "Wet" : "Dry"}, ${lastState.isBegging ? "Begging" : "Not begging"}`);

            if (lastState.isTamed) {
                Chat.log(`  - Collar: ${lastState.collarColor}`);
                Chat.log(`  - Health: ${lastState.health.toFixed(1)}`);
            }
        }
    }

    update() {
        const entities = World.getEntities();
        const currentWolfUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:wolf")) {
                const wolf = entity.asWolf();
                const uuid = wolf.getUUID();
                currentWolfUUIDs.add(uuid);

                this.updateWolf(wolf);
            }
        });

        // Remove wolves that are no longer in range
        for (const [uuid, wolfData] of this.managedWolves) {
            if (!currentWolfUUIDs.has(uuid)) {
                Chat.log(`&7${wolfData.name} left tracking range`);
                this.managedWolves.delete(uuid);
            }
        }
    }
}

// Initialize and run the wolf manager
const wolfManager = new WolfCompanionManager();

// Update every tick for real-time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    wolfManager.update();
}));

// Generate comprehensive report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        wolfManager.generateReport();
    }
}));

// Manual report trigger
Chat.log("&aWolf Companion Manager activated! Use wolfManager.generateReport() for status updates.");
```

### Wolf Breeding and Taming Assistant
```js
// Wolf breeding and taming assistance system
class WolfBreedingAssistant {
    constructor() {
        this.tamingItems = ["minecraft:bone"];
        this.breedingItems = ["minecraft:bone", "minecraft:porkchop", "minecraft:beef", "minecraft:chicken", "minecraft:rabbit"];
        this.potentialMates = new Map();
        this.tamingProgress = new Map();
    }

    checkTamingOpportunity(wolf, player) {
        if (wolf.isTamed()) return false;

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        let hasBone = false;
        if (mainHand && this.tamingItems.includes(mainHand.getId())) hasBone = true;
        if (offHand && this.tamingItems.includes(offHand.getId())) hasBone = true;

        if (hasBone && !wolf.isAngry()) {
            Chat.actionbar("&aRight-click with bone to tame this wolf!");

            // Highlight the wolf
            wolf.setGlowing(true);
            wolf.setGlowingColor(0x00FF00);

            return true;
        }

        return false;
    }

    checkBreedingOpportunity(wolf1, wolf2) {
        // Both wolves must be tamed and not sitting
        if (!wolf1.isTamed() || !wolf2.isTamed()) return false;
        if (wolf1.isSitting() || wolf2.isSitting()) return false;

        // Check if they can breed with each other
        if (!wolf1.canBreedWith(wolf2)) return false;

        const player = Player.getPlayer();
        if (!player) return false;

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        let hasBreedingFood = false;
        if (mainHand && this.breedingItems.includes(mainHand.getId())) hasBreedingFood = true;
        if (offHand && this.breedingItems.includes(offHand.getId())) hasBreedingFood = true;

        if (hasBreedingFood) {
            Chat.actionbar("&aPerfect! Two tamed wolves ready for breeding!");
            Chat.log("&aHold breeding food and right-click both wolves to breed them.");

            // Highlight both wolves
            wolf1.setGlowing(true);
            wolf1.setGlowingColor(0xFF00FF); // Pink for breeding
            wolf2.setGlowing(true);
            wolf2.setGlowingColor(0xFF00FF);

            return true;
        }

        return false;
    }

    scanForBreedingPairs() {
        const entities = World.getEntities(30);
        const tamedWolves = [];
        const player = Player.getPlayer();

        if (!player) return;

        // Collect all tamed wolves
        entities.forEach(entity => {
            if (entity.is("minecraft:wolf")) {
                const wolf = entity.asWolf();
                if (wolf.isTamed() && !wolf.isSitting()) {
                    tamedWolves.push({
                        wolf: wolf,
                        pos: entity.getPos(),
                        distance: player.distanceTo(entity)
                    });
                }
            }
        });

        if (tamedWolves.length < 2) {
            if (tamedWolves.length === 1) {
                Chat.log("&eYou have 1 tamed wolf available for breeding.");
            }
            return;
        }

        Chat.log(`&a=== Wolf Breeding Analysis ===`);
        Chat.log(`Found ${tamedWolves.length} tamed wolves available for breeding.`);

        // Check all possible pairs
        let breedingPairs = 0;
        for (let i = 0; i < tamedWolves.length; i++) {
            for (let j = i + 1; j < tamedWolves.length; j++) {
                const wolf1 = tamedWolves[i].wolf;
                const wolf2 = tamedWolves[j].wolf;

                if (this.checkBreedingOpportunity(wolf1, wolf2)) {
                    breedingPairs++;
                    const name1 = wolf1.getName().getString();
                    const name2 = wolf2.getName().getString();
                    Chat.log(`&aBreeding pair: ${name1} + ${name2}`);
                }
            }
        }

        if (breedingPairs === 0) {
            Chat.log("&eNo breeding pairs currently available. Make sure:");
            Chat.log("- Both wolves are tamed and not sitting");
            Chat.log("- You have breeding food (bones or meat)");
            Chat.log("- The wolves are close enough to each other");
        }
    }

    analyzeWolfPack() {
        const entities = World.getEntities(50);
        const wolves = {
            tamed: [],
            wild: [],
            angry: []
        };

        entities.forEach(entity => {
            if (entity.is("minecraft:wolf")) {
                const wolf = entity.asWolf();

                if (wolf.isTamed()) {
                    wolves.tamed.push(wolf);
                } else if (wolf.isAngry()) {
                    wolves.angry.push(wolf);
                } else {
                    wolves.wild.push(wolf);
                }
            }
        });

        Chat.log("=== Wolf Pack Analysis ===");
        Chat.log(`&6Tamed wolves: ${wolves.tamed.length}`);
        Chat.log(`&eWild wolves: ${wolves.wild.length}`);
        Chat.log(`&cAngry wolves: ${wolves.angry.length}`);

        // Analyze tamed wolves
        if (wolves.tamed.length > 0) {
            Chat.log("\n&aTamed Wolves:");
            wolves.tamed.forEach(wolf => {
                const name = wolf.getName().getString();
                const collarColor = wolf.getCollarColor().getName();
                const owner = wolf.getOwner();
                const player = Player.getPlayer();
                const distance = player ? player.distanceTo(wolf) : 0;

                Chat.log(`  ${name}: ${collarColor} collar, ${distance.toFixed(1)}m away`);
                if (owner) {
                    Chat.log(`    Owner: ${owner}`);
                }
            });
        }

        // Warning for angry wolves
        if (wolves.angry.length > 0) {
            Chat.log(`\n&c⚠️ ${wolves.angry.length} angry wolf${wolves.angry.length > 1 ? 's' : ''} detected!`);
            wolves.angry.forEach(wolf => {
                const pos = wolf.getPos();
                const player = Player.getPlayer();
                const distance = player ? player.distanceTo(wolf) : 0;
                Chat.log(`  - ${distance.toFixed(1)}m away at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            });
        }

        // Taming opportunities
        if (wolves.wild.length > 0) {
            Chat.log(`\n&eTaming opportunities: ${wolves.wild.length} wild wolves available`);

            const player = Player.getPlayer();
            if (player) {
                const mainHand = player.getMainHand();
                const hasBone = mainHand && this.tamingItems.includes(mainHand.getId());

                if (hasBone) {
                    Chat.log("&e✓ You have bones ready for taming!");

                    // Find nearest wild wolf
                    let nearestWolf = null;
                    let nearestDistance = Infinity;

                    wolves.wild.forEach(wolf => {
                        const distance = player.distanceTo(wolf);
                        if (distance < nearestDistance && !wolf.isAngry()) {
                            nearestDistance = distance;
                            nearestWolf = wolf;
                        }
                    });

                    if (nearestWolf && nearestDistance <= 20) {
                        Chat.log(`&eNearest tamable wolf: ${nearestDistance.toFixed(1)}m away`);
                        nearestWolf.setGlowing(true);
                        nearestWolf.setGlowingColor(0x00FF00);
                    }
                } else {
                    Chat.log("&7Tip: Hold bones to tame wild wolves");
                }
            }
        }
    }

    update() {
        const entities = World.getEntities(15); // Close range for interactions
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:wolf")) {
                const wolf = entity.asWolf();
                const distance = player.distanceTo(entity);

                if (distance <= 10) { // Only close wolves
                    this.checkTamingOpportunity(wolf, player);
                }
            }
        });
    }
}

// Initialize breeding assistant
const breedingAssistant = new WolfBreedingAssistant();

// Update every 5 ticks (4 times per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        breedingAssistant.update();
    }
}));

// Analyze pack every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        breedingAssistant.analyzeWolfPack();
    }
}));

Chat.log("&aWolf Breeding Assistant activated! Scanning for taming and breeding opportunities.");
```

## Notes and Limitations

- WolfEntityHelper instances become invalid when the wolf entity is removed from the world (dies, despawns, or unloaded). Always check `isAlive()` before accessing wolf data.
- `isBegging()` returns true when the wolf sees a player holding bones or meat, indicating interest in food.
- `getCollarColor()` returns a `DyeColorHelper` with color information. Collar colors are only visible on tamed wolves.
- `isAngry()` detects when a wolf is hostile and will attack players. Wolves become angry when attacked or when protecting their owners.
- `isWet()` indicates whether the wolf is wet from rain or water exposure. Wet wolves have a darker appearance.
- The inheritance hierarchy provides access to all tameable entity methods including ownership tracking and sitting behavior.
- Tamed wolves with different collar colors can be used for visual organization and identification.
- Wolf behavior is influenced by their relationship with players - tamed wolves will defend their owners and attack hostile mobs.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important wolves for better visibility.

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
- All methods delegate to the underlying Minecraft WolfEntity implementation
- Inherits comprehensive functionality from the tameable animal hierarchy
- Designed specifically for wolf companion management and behavior monitoring