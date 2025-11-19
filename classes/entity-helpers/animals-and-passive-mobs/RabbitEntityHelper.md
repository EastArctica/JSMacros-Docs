# RabbitEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.RabbitEntityHelper`

**Extends:** `AnimalEntityHelper<RabbitEntity>`

The `RabbitEntityHelper` class provides specialized access to rabbit entities in Minecraft, offering methods to monitor and interact with rabbit-specific behaviors such as variant identification and detection of the special "killer bunny" variant. This class extends `AnimalEntityHelper` and inherits all functionality for animals including breeding mechanics, food preferences, and basic mob behaviors.

This helper is particularly useful for creating scripts that manage rabbit populations, analyze rabbit variants for breeding or collection purposes, or coordinate with multiple rabbits in automated farming systems.

## Constructors

RabbitEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering for rabbits
- Casting from generic EntityHelper instances using `entity.asAnimal()` and subsequent type checks

## Methods

### Rabbit-Specific State

- [rabbit.getVariant()](#rabbitgetvariant)
- [rabbit.isKillerBunny()](#rabbitiskillerbunny)

### Inherited Methods

The RabbitEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Rabbit-Specific State

## Usage Examples

### Complete Rabbit Management System
```js
// Comprehensive rabbit monitoring and variant collection system
class RabbitCompanionManager {
    constructor() {
        this.managedRabbits = new Map();
        this.rabbitStats = {
            totalRabbits: 0,
            wildRabbits: 0,
            variantCollection: new Set(),
            killerBunnies: 0
        };
        this.detectionRanges = {
            nearby: 16,     // 16 blocks - standard detection
            close: 8,       // 8 blocks - interaction range
            touching: 3     // 3 blocks - petting distance
        };
    }

    registerRabbit(rabbit) {
        const uuid = rabbit.getUUID();
        const name = rabbit.getName().getString();
        const pos = rabbit.getPos();
        const variant = rabbit.getVariant();
        const isKiller = rabbit.isKillerBunny();

        const rabbitData = {
            rabbit: rabbit,
            name: name,
            variant: variant,
            isKillerBunny: isKiller,
            lastPosition: pos,
            lastUpdate: Client.getTime(),
            firstSeen: Client.getTime(),
            isWild: !this.isTamed(rabbit)
        };

        this.managedRabbits.set(uuid, rabbitData);
        this.rabbitStats.totalRabbits++;
        this.rabbitStats.variantCollection.add(variant);

        if (isKiller) {
            this.rabbitStats.killerBunnies++;
        } else if (this.isWild) {
            this.rabbitStats.wildRabbits++;
        }

        this.displayRabbitRegistration(rabbitData);
        this.highlightRabbit(rabbit, rabbitData);

        return rabbitData;
    }

    isTamed(rabbit) {
        // Rabbits don't have a direct tame property like cats/dogs,
        // but we can check if they're in love mode (ready to breed)
        return rabbit.canBreedWith(rabbit); // Self-check for simplified taming detection
    }

    displayRabbitRegistration(rabbitData) {
        const { name, variant, isKillerBunny } = rabbitData;

        if (isKillerBunny) {
            Chat.log(`&c⚠️ DANGER! Registered killer bunny: ${name}`);
        } else {
            Chat.log(`&aRegistered rabbit: ${name} (${variant})`);
        }
    }

    highlightRabbit(rabbit, rabbitData) {
        if (rabbitData.isKillerBunny) {
            // Warning color for killer bunnies
            rabbit.setGlowing(true);
            rabbit.setGlowingColor(0xFF0000); // Red for danger
        } else {
            // Normal color for regular rabbits
            rabbit.setGlowing(true);
            rabbit.setGlowingColor(0x00FF00); // Green for safe
        }
    }

    getVariantDisplayName(variantId) {
        const variantNames = {
            "minecraft:brown": "Brown",
            "minecraft:white": "White",
            "minecraft:black": "Black",
            "minecraft:gold": "Golden",
            "minecraft:killer": "Killer Bunny"
        };
        return variantNames[variantId] || variantId.replace("minecraft:", "");
    }

    updateRabbit(rabbit) {
        const uuid = rabbit.getUUID();
        const currentState = {
            variant: rabbit.getVariant(),
            isKillerBunny: rabbit.isKillerBunny(),
            position: rabbit.getPos(),
            isAlive: rabbit.isAlive()
        };

        let rabbitData = this.managedRabbits.get(uuid);
        if (!rabbitData) {
            rabbitData = this.registerRabbit(rabbit);
        }

        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(rabbit);

        // Handle distance-based interactions
        this.handleDistanceInteractions(rabbit, distance, currentState, rabbitData);

        // Update stored data
        rabbitData.lastPosition = currentState.position;
        rabbitData.lastUpdate = Client.getTime();
    }

    handleDistanceInteractions(rabbit, distance, currentState, rabbitData) {
        const { name, isKillerBunny } = rabbitData;

        if (distance <= this.detectionRanges.touching) {
            // Very close interaction
            if (isKillerBunny) {
                Chat.actionbar("&c⚠️ DANGER! Killer bunny is too close!");
            } else {
                Chat.actionbar("&a" + name + " is right here! (Petting distance)");
            }
            rabbit.setGlowing(true);
        } else if (distance <= this.detectionRanges.close) {
            // Close range
            if (!isKillerBunny) {
                Chat.actionbar("&7" + name + " is close (" + distance.toFixed(1) + "m)");
            }
            rabbit.setGlowing(true);
        } else if (distance <= this.detectionRanges.nearby) {
            // Nearby detection
            rabbit.setGlowing(true);
        } else if (distance > this.detectionRanges.nearby * 2) {
            // Far away, turn off glowing
            rabbit.resetGlowing();
        }
    }

    generateRabbitReport() {
        Chat.log("=== Rabbit Companion Report ===");
        Chat.log(`Total managed rabbits: ${this.rabbitStats.totalRabbits}`);
        Chat.log(`Wild rabbits: ${this.rabbitStats.wildRabbits}`);
        Chat.log(`Killer bunnies: ${this.rabbitStats.killerBunnies}`);
        Chat.log(`Unique variants collected: ${this.rabbitStats.variantCollection.size}`);

        // Variant collection status
        if (this.rabbitStats.variantCollection.size > 0) {
            Chat.log("\n&aCollected variants:");
            for (const variant of this.rabbitStats.variantCollection) {
                const variantName = this.getVariantDisplayName(variant);
                const count = Array.from(this.managedRabbits.values()).filter(r => r.variant === variant).length;
                Chat.log(`  - ${variantName}: ${count} rabbit${count > 1 ? 's' : ''}`);
            }
        }

        // Safety warnings
        if (this.rabbitStats.killerBunnies > 0) {
            Chat.log("\n&c⚠️ WARNING: " + this.rabbitStats.killerBunnies + " killer bunny" +
                    (this.rabbitStats.killerBunnies > 1 ? "s detected nearby!" : " detected nearby!"));
        }

        // Detailed status for each rabbit
        for (const [uuid, rabbitData] of this.managedRabbits) {
            const { name, lastPosition, variant, isKillerBunny } = rabbitData;
            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(lastPosition) : 0;

            Chat.log(`\n${name}:`);
            Chat.log(`  - Variant: ${this.getVariantDisplayName(variant)}`);
            Chat.log(`  - Type: ${isKillerBunny ? "KILLER BUNNY - DANGER!" : "Normal Rabbit"}`);
            Chat.log(`  - Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  - Status: ${isKillerBunny ? "Hostile" : "Passive"}`);
        }
    }

    scanForBreedingOpportunities() {
        const entities = World.getEntities(20);
        const breedingPairs = [];
        const player = Player.getPlayer();

        if (!player) return;

        // Collect all rabbits
        entities.forEach(entity => {
            if (entity.is("minecraft:rabbit")) {
                const rabbit = entity.asAnimal();
                if (this.isAnimalRabbit(rabbit) && rabbit.isAlive()) {
                    const distance = player.distanceTo(entity);

                    if (distance <= 16) { // Breeding range
                        entities.forEach(otherEntity => {
                            if (otherEntity.is("minecraft:rabbit") && entity !== otherEntity) {
                                const otherRabbit = otherEntity.asAnimal();
                                const otherDistance = rabbit.distanceTo(otherEntity);

                                if (otherDistance <= 5 && rabbit.canBreedWith(otherRabbit)) {
                                    breedingPairs.push({
                                        rabbit1: { entity: entity, rabbit: rabbit },
                                        rabbit2: { entity: otherEntity, rabbit: otherRabbit },
                                        distance: otherDistance
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });

        this.displayBreedingOpportunities(breedingPairs);
    }

    isAnimalRabbit(animal) {
        try {
            return animal.asRabbit() !== null;
        } catch (e) {
            return false;
        }
    }

    displayBreedingOpportunities(breedingPairs) {
        if (breedingPairs.length === 0) {
            Chat.log("&eNo breeding pairs currently available. Make sure:");
            Chat.log("- Rabbits are within 5 blocks of each other");
            Chat.log("- Rabbits have different owners (if tamed)");
            Chat.log("- You have carrots for breeding");
            return;
        }

        Chat.log(`&a=== Rabbit Breeding Opportunities ===`);
        Chat.log(`Found ${breedingPairs.length} potential breeding pair${breedingPairs.length > 1 ? 's' : ''}:`);

        breedingPairs.forEach((pair, index) => {
            const { rabbit1, rabbit2, distance } = pair;
            const variant1 = this.getVariantDisplayName(this.getRabbitVariant(rabbit1.rabbit));
            const variant2 = this.getVariantDisplayName(this.getRabbitVariant(rabbit2.rabbit));

            Chat.log(`&aPair ${index + 1}: ${variant1} + ${variant2} (${distance.toFixed(1)}m apart)`);
        });

        // Check if player has breeding food
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        let hasCarrots = false;

        if (mainHand && mainHand.getId().includes("carrot")) hasCarrots = true;
        if (offHand && offHand.getId().includes("carrot")) hasCarrots = true;

        if (hasCarrots && breedingPairs.length > 0) {
            Chat.log("&a✓ You have carrots ready for breeding!");
        } else if (breedingPairs.length > 0) {
            Chat.log("&eTip: Hold carrots to breed rabbits");
        }
    }

    getRabbitVariant(rabbit) {
        try {
            return rabbit.getVariant();
        } catch (e) {
            return "unknown";
        }
    }

    update() {
        const entities = World.getEntities();
        const currentRabbitUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:rabbit")) {
                try {
                    const rabbit = entity.asAnimal();
                    if (this.isAnimalRabbit(rabbit)) {
                        const rabbitEntity = entity.asRabbit ? entity.asRabbit() : entity;
                        const uuid = rabbitEntity.getUUID();
                        currentRabbitUUIDs.add(uuid);

                        this.updateRabbit(rabbitEntity);
                    }
                } catch (e) {
                    // Skip invalid rabbit entities
                }
            }
        });

        // Remove rabbits that are no longer in range
        for (const [uuid, rabbitData] of this.managedRabbits) {
            if (!currentRabbitUUIDs.has(uuid) && (Client.getTime() - rabbitData.lastUpdate > 30000)) {
                Chat.log(`&7${rabbitData.name} left tracking range`);
                this.managedRabbits.delete(uuid);
            }
        }
    }
}

// Initialize and run the rabbit manager
const rabbitManager = new RabbitCompanionManager();

// Update system every 5 ticks
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        rabbitManager.update();
    }
}));

// Generate comprehensive report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        rabbitManager.generateRabbitReport();
    }
}));

// Scan for breeding opportunities every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        rabbitManager.scanForBreedingOpportunities();
    }
}));

Chat.log("&aRabbit Companion Manager activated! Monitoring your lagomorph friends.");
```

### Rabbit Variant Collection System
```js
// Automated rabbit variant tracking and collection assistant
class RabbitVariantCollector {
    constructor() {
        this.targetVariants = new Set([
            "minecraft:brown", "minecraft:white", "minecraft:black",
            "minecraft:gold", "minecraft:killer"
        ]);
        this.collectedVariants = new Map();
        this.scanRadius = 32;
        this.lastScan = 0;
        this.scanInterval = 20 * 10; // Every 10 seconds
    }

    scanForRabbits() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();

        if (!player) return;

        let newVariants = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:rabbit")) {
                try {
                    const rabbit = entity.asAnimal();
                    if (this.isAnimalRabbit(rabbit)) {
                        const rabbitEntity = entity.asRabbit ? entity.asRabbit() : entity;
                        const variant = rabbitEntity.getVariant();
                        const isKiller = rabbitEntity.isKillerBunny();
                        const distance = player.distanceTo(entity);

                        if (this.targetVariants.has(variant)) {
                            const variantName = this.getVariantDisplayName(variant);
                            const collectionData = {
                                entity: entity,
                                rabbit: rabbitEntity,
                                variant: variant,
                                name: rabbitEntity.getName().getString(),
                                distance: distance,
                                isKiller: isKiller,
                                firstDetected: Client.getTime(),
                                lastSeen: Client.getTime()
                            };

                            if (!this.collectedVariants.has(variant)) {
                                // New variant discovered
                                this.collectedVariants.set(variant, collectionData);
                                newVariants.push(collectionData);
                                Chat.log(`&6✨ NEW VARIANT DISCOVERED: ${variantName}`);
                            } else {
                                // Update existing variant tracking
                                const existingData = this.collectedVariants.get(variant);
                                existingData.lastSeen = Client.getTime();
                                existingData.entity = entity;
                                existingData.distance = distance;
                            }

                            // Highlight for player visibility
                            this.highlightRabbit(entity, variant, isKiller);
                        }
                    }
                } catch (e) {
                    // Skip invalid entities
                }
            }
        });

        // Remove variants that haven't been seen in 5 minutes
        this.cleanupOldVariants();

        if (newVariants.length > 0) {
            this.displayNewVariants(newVariants);
        }
    }

    getVariantDisplayName(variantId) {
        const variantNames = {
            "minecraft:brown": "Brown",
            "minecraft:white": "White",
            "minecraft:black": "Black",
            "minecraft:gold": "Golden",
            "minecraft:killer": "Killer Bunny"
        };
        return variantNames[variantId] || variantId.replace("minecraft:", "");
    }

    highlightRabbit(entity, variant, isKiller) {
        const color = isKiller ? 0xFF0000 : 0x00FFFF; // Red for killer, cyan for others
        entity.setGlowing(true);
        entity.setGlowingColor(color);
    }

    displayNewVariants(newVariants) {
        Chat.log("\n=== New Variant Discoveries ===");
        newVariants.forEach(variantData => {
            const { name, variant, distance, isKiller } = variantData;
            const variantName = this.getVariantDisplayName(variant);

            Chat.log(`&a${name} - ${variantName}`);
            Chat.log(`  Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  Type: ${isKiller ? "Hostile - WARNING!" : "Passive"}`);
        });
    }

    cleanupOldVariants() {
        const cutoffTime = Client.getTime() - 20 * 60 * 5; // 5 minutes ago

        for (const [variant, data] of this.collectedVariants) {
            if (data.lastSeen < cutoffTime) {
                Chat.log(`&7Variant ${this.getVariantDisplayName(variant)} expired from collection`);
                this.collectedVariants.delete(variant);

                // Remove highlighting
                if (data.entity && data.entity.isAlive()) {
                    data.entity.resetGlowing();
                }
            }
        }
    }

    generateCollectionReport() {
        Chat.log("=== Rabbit Variant Collection Status ===");
        Chat.log(`Variants collected: ${this.collectedVariants.size}/${this.targetVariants.size}`);

        if (this.collectedVariants.size === this.targetVariants.size) {
            Chat.log("&a🎉 COLLECTION COMPLETE! You've found all rabbit variants!");
        } else {
            // Show progress
            Chat.log("\n&aCollected variants:");
            for (const [variant, data] of this.collectedVariants) {
                const variantName = this.getVariantDisplayName(variant);
                const player = Player.getPlayer();
                const distance = player && data.entity ? player.distanceTo(data.entity) : 0;

                Chat.log(`  &a✓ ${variantName}${distance > 0 ? ` (${distance.toFixed(1)}m)` : ''}`);
            }

            // Show missing variants
            Chat.log("\n&eMissing variants:");
            for (const variant of this.targetVariants) {
                if (!this.collectedVariants.has(variant)) {
                    const variantName = this.getVariantDisplayName(variant);
                    Chat.log(`  - ${variantName}`);
                }
            }
        }

        // Collection statistics
        const totalDetected = this.collectedVariants.size;
        const killerCount = Array.from(this.collectedVariants.values()).filter(d => d.isKiller).length;
        const passiveCount = totalDetected - killerCount;

        Chat.log(`\n&6Collection Statistics:`);
        Chat.log(`  Total unique variants: ${totalDetected}`);
        Chat.log(`  Passive rabbits: ${passiveCount}`);
        Chat.log(`  Killer bunnies: ${killerCount}`);
    }

    isAnimalRabbit(animal) {
        try {
            return animal.asRabbit() !== null;
        } catch (e) {
            return false;
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        this.scanForRabbits();
    }
}

// Initialize variant collector
const variantCollector = new RabbitVariantCollector();

// Update scanner every 10 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 10) === 0) {
        variantCollector.update();
    }
}));

// Generate collection report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        variantCollector.generateCollectionReport();
    }
}));

Chat.log("&aRabbit Variant Collector activated! Searching for all rabbit variants...");
```

## Notes and Limitations

- RabbitEntityHelper instances become invalid when the rabbit entity is removed from the world. Always check `isAlive()` before accessing rabbit data.
- `getVariant()` returns one of 5 possible rabbit variants: brown, white, black, gold, or killer. The variant affects both appearance and behavior.
- `isKillerBunny()` detects the special killer bunny variant, which is hostile and attacks players on sight. Handle with extreme caution in scripts.
- Rabbits do not have a direct taming system like cats or dogs, but they can be bred with carrots to create offspring with mixed genetics.
- The killer bunny variant is rare and dangerous - it has higher health and will attack players within a certain range.
- All rabbits inherit basic animal behaviors: they breed with carrots, avoid wolves, and can jump over obstacles.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight rabbits based on their variant or importance.
- Rabbit populations can grow quickly in favorable conditions, making them useful for automated farming systems.
- The inheritance hierarchy provides access to comprehensive animal functionality including breeding mechanics and movement patterns.

## Related Classes

- `AnimalEntityHelper` - Base class for animal functionality including breeding and food preferences
- `MobEntityHelper` - Mob entity functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `TameableEntityHelper` - For animals that can be tamed (cats, dogs, etc.)
- `DyeColorHelper` - For color-related operations (not directly used by rabbits but available for other entities)

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft RabbitEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for rabbit population management and variant collection systems

---

**See Also:**
- [EntityHelper.asAnimal()](#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\LivingEntityHelper.md) - Living entity base class with health and combat methods
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal-specific functionality including breeding
- [MobEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\MobEntityHelper.md) - Mob entity base class with AI states