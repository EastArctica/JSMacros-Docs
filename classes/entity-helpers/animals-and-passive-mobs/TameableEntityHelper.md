# TameableEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.TameableEntityHelper`

**Extends:** `AnimalEntityHelper<TameableEntity>`

The `TameableEntityHelper` class provides specialized access to tameable entities in Minecraft, offering methods to monitor and interact with taming-related behaviors such as ownership, taming status, and sitting behavior. This class extends `AnimalEntityHelper` and inherits all functionality for animals including breeding, food preferences, and basic animal behaviors.

This helper is particularly useful for creating scripts that manage tameable animals like wolves, cats, parrots, and horses, monitor their taming progress, track ownership, or coordinate the behavior of tamed companion animals.

## Constructors

TameableEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`, `EntityDeath`)
- World entity queries using type filtering for tameable entities
- Casting from generic EntityHelper instances using type-specific methods
- As base class instances for specific tameable animal helpers (WolfEntityHelper, CatEntityHelper)

## Methods

### Taming and Ownership

- [tameable.isTamed()](#tameableistamed)
- [tameable.isSitting()](#tameableissitting)
- [tameable.getOwner()](#tameablegetowner)
- [tameable.isOwner()](#tameableisowner)

### Inherited Methods

The TameableEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Taming and Ownership

## Usage Examples

### Complete Pet Management System
```js
// Comprehensive tameable pet management and monitoring system
class PetManagementSystem {
    constructor() {
        this.pets = new Map();           // All tracked pets
        this.myPets = new Set();         // Player's pet UUIDs
        this.statistics = {
            totalTracked: 0,
            myPets: 0,
            othersPets: 0,
            wildPets: 0,
            sittingPets: 0,
            standingPets: 0
        };
        this.lastReport = 0;
    }

    analyzeTameableEntity(entity) {
        try {
            const tameable = entity.asTameable();
            if (!tameable) return null;

            const uuid = entity.getUUID();
            const name = entity.getName().getString();
            const type = entity.getType();
            const isTamed = tameable.isTamed();
            const isSitting = tameable.isSitting();
            const ownerUuid = tameable.getOwner();
            const player = Player.getPlayer();
            const playerUuid = player ? player.getUUID() : null;
            const isMine = ownerUuid === playerUuid;
            const distance = player ? player.distanceTo(entity) : 0;

            return {
                entity: entity,
                tameable: tameable,
                uuid: uuid,
                name: name,
                type: type,
                isTamed: isTamed,
                isSitting: isSitting,
                ownerUuid: ownerUuid,
                isMine: isMine,
                distance: distance,
                lastSeen: Client.getTime(),
                position: entity.getPos(),
                health: entity.asLiving ? entity.asLiving().getHealth() : null
            };
        } catch (e) {
            return null;
        }
    }

    addOrUpdatePet(petData) {
        if (!petData) return;

        const existing = this.pets.get(petData.uuid);

        if (existing) {
            // Update existing pet data
            existing.lastSeen = petData.lastSeen;
            existing.position = petData.position;
            existing.distance = petData.distance;
            existing.health = petData.health;
            existing.isSitting = petData.isSitting;

            // Check for status changes
            if (existing.isSitting !== petData.isSitting) {
                const action = petData.isSitting ? "sat down" : "stood up";
                Chat.log(`&6${petData.name} ${action}!`);
            }
        } else {
            // New pet discovered
            this.pets.set(petData.uuid, petData);

            let message = "";
            if (petData.isMine) {
                message = `&aFound your pet: ${petData.name}`;
                this.myPets.add(petData.uuid);
            } else if (petData.isTamed) {
                message = `&7Found someone's pet: ${petData.name}`;
            } else {
                message = `&eFound wild ${petData.type.replace('minecraft:', '')}: ${petData.name}`;
            }

            Chat.log(message);
        }

        // Update statistics
        this.updateStatistics();
    }

    updateStatistics() {
        this.statistics.totalTracked = this.pets.size;
        this.statistics.myPets = this.myPets.size;

        let othersCount = 0;
        let wildCount = 0;
        let sittingCount = 0;
        let standingCount = 0;

        for (const petData of this.pets.values()) {
            if (petData.isTamed) {
                if (petData.isMine) {
                    // Already counted in myPets
                } else {
                    othersCount++;
                }
            } else {
                wildCount++;
            }

            if (petData.isSitting) {
                sittingCount++;
            } else {
                standingCount++;
            }
        }

        this.statistics.othersPets = othersCount;
        this.statistics.wildPets = wildCount;
        this.statistics.sittingPets = sittingCount;
        this.statistics.standingPets = standingCount;
    }

    update() {
        const entities = World.getEntities(50); // 50 block radius
        const currentPetUuids = new Set();

        entities.forEach(entity => {
            // Check for tameable entities
            if (entity.is("minecraft:wolf", "minecraft:cat", "minecraft:parrot")) {
                const petData = this.analyzeTameableEntity(entity);
                if (petData) {
                    currentPetUuids.add(petData.uuid);
                    this.addOrUpdatePet(petData);

                    // Visual highlighting based on ownership
                    if (petData.distance <= 20) {
                        if (petData.isMine) {
                            entity.setGlowing(true);
                            entity.setGlowingColor(petData.isSitting ? 0xFFFF00 : 0x00FF00);
                        } else if (petData.isTamed) {
                            entity.setGlowing(true);
                            entity.setGlowingColor(0x808080);
                        } else {
                            entity.setGlowing(true);
                            entity.setGlowingColor(0xFFA500);
                        }
                    }
                }
            }
        });

        // Remove pets that are no longer in range
        for (const [uuid, petData] of this.pets) {
            if (!currentPetUuids.has(uuid)) {
                this.pets.delete(uuid);
                this.myPets.delete(uuid);
            }
        }

        this.updateStatistics();

        // Show status update every 30 seconds
        const currentTime = Client.getTime();
        if (currentTime - this.lastReport > 20 * 30) {
            this.showStatusUpdate();
            this.lastReport = currentTime;
        }
    }

    showStatusUpdate() {
        if (this.statistics.totalTracked === 0) {
            return;
        }

        Chat.log(`&7=== Pet Status (${this.statistics.totalTracked} tracked) ===`);

        if (this.statistics.myPets > 0) {
            Chat.log(`&aYour pets: ${this.statistics.myPets} (${this.statistics.sittingPets} sitting, ${this.statistics.standingPets} following)`);
        }

        if (this.statistics.othersPets > 0) {
            Chat.log(`&7Others' pets: ${this.statistics.othersPets}`);
        }

        if (this.statistics.wildPets > 0) {
            Chat.log(`&eWild animals: ${this.statistics.wildPets}`);
        }
    }

    findMyPets() {
        if (this.statistics.myPets === 0) {
            Chat.log("&eYou don't have any pets in the current range");
            return;
        }

        Chat.log(`&a=== Your Pets (${this.statistics.myPets}) ===`);

        let count = 1;
        for (const petData of this.pets.values()) {
            if (petData.isMine) {
                const status = petData.isSitting ? "&6🪑 Sitting" : "&a🚶 Following";
                const health = petData.health ? ` (HP: ${petData.health.toFixed(1)})` : "";

                Chat.log(`${count}. ${petData.name} ${status}${health} - ${petData.distance.toFixed(1)}m away`);

                // Make them glow more brightly for easier finding
                petData.entity.setGlowing(true);
                petData.entity.setGlowingColor(0x00FFFF);

                count++;
            }
        }

        Chat.log("&aYour pets have been highlighted with bright cyan for easy spotting!");
    }

    generateDetailedReport() {
        if (this.statistics.totalTracked === 0) {
            Chat.log("No pets currently tracked in range.");
            return;
        }

        Chat.log("=== Detailed Pet Report ===");
        Chat.log(`Total pets tracked: ${this.statistics.totalTracked}`);

        // Group by ownership
        const myPetList = [];
        const othersPetList = [];
        const wildPetList = [];

        for (const petData of this.pets.values()) {
            if (petData.isMine) {
                myPetList.push(petData);
            } else if (petData.isTamed) {
                othersPetList.push(petData);
            } else {
                wildPetList.push(petData);
            }
        }

        // My pets
        if (myPetList.length > 0) {
            Chat.log(`\n&a=== Your Pets (${myPetList.length}) ===`);
            myPetList.forEach(pet => {
                const status = pet.isSitting ? "Sitting" : "Following";
                const health = pet.health ? ` (HP: ${pet.health.toFixed(1)}/${pet.entity.asLiving().getMaxHealth().toFixed(1)})` : "";
                Chat.log(`  ${pet.name} - ${status}${health} - ${pet.distance.toFixed(1)}m`);
                Chat.log(`    Location: [${pet.position.x.toFixed(0)}, ${pet.position.y.toFixed(0)}, ${pet.position.z.toFixed(0)}]`);
            });
        }

        // Others' pets
        if (othersPetList.length > 0) {
            Chat.log(`\n&7=== Others' Pets (${othersPetList.length}) ===`);
            othersPetList.forEach(pet => {
                const status = pet.isSitting ? "Sitting" : "Following";
                Chat.log(`  ${pet.name} - ${status} - ${pet.distance.toFixed(1)}m`);
            });
        }

        // Wild animals
        if (wildPetList.length > 0) {
            Chat.log(`\n&e=== Wild Animals (${wildPetList.length}) ===`);
            const typeCounts = new Map();
            wildPetList.forEach(pet => {
                const type = pet.type.replace('minecraft:', '');
                typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
            });

            for (const [type, count] of typeCounts) {
                Chat.log(`  ${type}: ${count}`);
            }
        }
    }

    commandPets(command) {
        if (this.statistics.myPets === 0) {
            Chat.log("&eYou don't have any pets to command");
            return;
        }

        const commands = command.toLowerCase().split(' ');
        const mainCommand = commands[0];

        Chat.log(`&6=== Pet Command: ${mainCommand} ===`);

        let affectedCount = 0;

        for (const petData of this.pets.values()) {
            if (petData.isMine) {
                let shouldHighlight = false;
                let color = 0x00FF00; // Default green

                switch (mainCommand) {
                    case "sit":
                        if (!petData.isSitting) {
                            Chat.log(`  ${petData.name}: Sitting down`);
                            color = 0xFFFF00; // Yellow for sitting
                            shouldHighlight = true;
                            affectedCount++;
                        }
                        break;

                    case "stand":
                    case "follow":
                        if (petData.isSitting) {
                            Chat.log(`  ${petData.name}: Standing up to follow`);
                            color = 0x00FF00; // Green for following
                            shouldHighlight = true;
                            affectedCount++;
                        }
                        break;

                    case "status":
                        const status = petData.isSitting ? "Sitting" : "Following";
                        const health = petData.health ? ` (HP: ${petData.health.toFixed(1)})` : "";
                        Chat.log(`  ${petData.name}: ${status}${health} - ${petData.distance.toFixed(1)}m`);
                        color = petData.isSitting ? 0xFFFF00 : 0x00FF00;
                        shouldHighlight = true;
                        affectedCount++;
                        break;

                    case "call":
                        if (petData.distance > 10) {
                            Chat.log(`  ${petData.name}: Called from ${petData.distance.toFixed(1)}m`);
                            color = 0x00FFFF; // Cyan for called
                            shouldHighlight = true;
                            affectedCount++;
                        } else {
                            Chat.log(`  ${petData.name}: Already nearby (${petData.distance.toFixed(1)}m)`);
                        }
                        break;

                    default:
                        Chat.log(`  ${petData.name}: Unknown command "${mainCommand}"`);
                }

                if (shouldHighlight) {
                    petData.entity.setGlowing(true);
                    petData.entity.setGlowingColor(color);
                }
            }
        }

        if (affectedCount === 0 && mainCommand !== "status") {
            Chat.log("&7No pets needed to be commanded");
        } else {
            Chat.actionbar(`&aCommand affected ${affectedCount} pet${affectedCount !== 1 ? 's' : ''}`);
        }
    }
}

// Initialize the pet management system
const petManager = new PetManagementSystem();

// Update every 10 ticks (0.5 seconds) for real-time tracking
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 10 === 0) {
        petManager.update();
    }
}));

// Manual commands
// petManager.findMyPets();                    // Find and highlight your pets
// petManager.generateDetailedReport();       // Generate comprehensive report
// petManager.commandPets("sit");             // Make all your pets sit
// petManager.commandPets("follow");          // Make all your pets follow
// petManager.commandPets("status");          // Show status of all your pets
// petManager.commandPets("call");            // Call pets from far away

Chat.log("&aPet Management System activated! Your pets will be tracked and highlighted based on ownership.");
Chat.log("&7Commands: findMyPets(), generateDetailedReport(), commandPets('sit/follow/status/call')");
```

### Pet Breeding Compatibility Checker
```js
// Advanced breeding compatibility checker for tameable pets
class PetBreedingChecker {
    constructor() {
        this.tamedPets = [];
        this.breedingPairs = [];
        this.lastScan = 0;
        this.foodPreferences = {
            "minecraft:wolf": ["minecraft:bone", "minecraft:porkchop", "minecraft:beef", "minecraft:chicken", "minecraft:rabbit"],
            "minecraft:cat": ["minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish"],
            "minecraft:parrot": ["minecraft:wheat_seeds", "minecraft:melon_seeds", "minecraft:pumpkin_seeds", "minecraft:beetroot_seeds"]
        };
    }

    scanForBreedingPairs() {
        const entities = World.getEntities(40);
        this.tamedPets = [];
        this.breedingPairs = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:wolf", "minecraft:cat", "minecraft:parrot")) {
                try {
                    const tameable = entity.asTameable();
                    const animal = entity.asAnimal();

                    if (tameable && animal && tameable.isTamed() && !tameable.isSitting()) {
                        const player = Player.getPlayer();
                        const isMine = player && tameable.isOwner(player);

                        this.tamedPets.push({
                            entity: entity,
                            tameable: tameable,
                            animal: animal,
                            name: entity.getName().getString(),
                            type: entity.getType(),
                            uuid: entity.getUUID(),
                            isMine: isMine,
                            distance: player ? player.distanceTo(entity) : 0,
                            canBreed: true,
                            position: entity.getPos()
                        });
                    }
                } catch (e) {
                    // Skip if entities can't be cast properly
                }
            }
        });

        // Find breeding pairs
        for (let i = 0; i < this.tamedPets.length; i++) {
            for (let j = i + 1; j < this.tamedPets.length; j++) {
                const pet1 = this.tamedPets[i];
                const pet2 = this.tamedPets[j];

                // Check if they can breed (same type, not related, etc.)
                if (pet1.type === pet2.type && pet1.animal.canBreedWith(pet2.animal)) {
                    const distance = pet1.position.distanceTo(pet2.position);
                    const bothMine = pet1.isMine && pet2.isMine;

                    this.breedingPairs.push({
                        pet1: pet1,
                        pet2: pet2,
                        distance: distance,
                        bothMine: bothMine,
                        breedingFood: this.foodPreferences[pet1.type] || []
                    });
                }
            }
        }

        this.lastScan = Client.getTime();
    }

    checkBreedingFood() {
        const player = Player.getPlayer();
        if (!player) return { hasFood: false, foodType: null };

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        let breedingFood = [];

        // Collect all breeding foods from pet types
        for (const pet of this.tamedPets) {
            const foods = this.foodPreferences[pet.type] || [];
            breedingFood.push(...foods);
        }

        // Remove duplicates
        breedingFood = [...new Set(breedingFood)];

        // Check if player has any breeding food
        if (mainHand && breedingFood.includes(mainHand.getId())) {
            return { hasFood: true, foodType: mainHand.getId(), hand: "main" };
        }

        if (offHand && breedingFood.includes(offHand.getId())) {
            return { hasFood: true, foodType: offHand.getId(), hand: "off" };
        }

        return { hasFood: false, foodType: null, breedingFood: breedingFood };
    }

    generateBreedingReport() {
        Chat.log("=== Pet Breeding Analysis ===");
        Chat.log(`Scanned ${this.tamedPets.length} tamed pets available for breeding`);
        Chat.log(`Found ${this.breedingPairs.length} potential breeding pairs`);

        const foodStatus = this.checkBreedingFood();
        const player = Player.getPlayer();

        if (this.breedingPairs.length === 0) {
            Chat.log("\n&eNo breeding pairs currently available");

            if (this.tamedPets.length < 2) {
                Chat.log("Reason: Not enough tamed pets");
            } else {
                Chat.log("Possible reasons:");
                Chat.log("- Pets are too far apart (>8 blocks)");
                Chat.log("- Pets are related (can't breed family)");
                Chat.log("- Pet breeding cooldown not finished");
                Chat.log("- One or both pets are sitting");
            }

            if (!foodStatus.hasFood) {
                Chat.log(`\n&7You'll need breeding food for the pet types you have`);
                if (foodStatus.breedingFood.length > 0) {
                    Chat.log("Required foods: " + foodStatus.breedingFood.join(", "));
                }
            }
            return;
        }

        // Show breeding pairs
        Chat.log(`\n&a=== Breeding Pairs (${this.breedingPairs.length}) ===`);

        let myPairs = 0;
        let othersPairs = 0;

        this.breedingPairs.forEach((pair, index) => {
            const icon = pair.bothMine ? "💚" : "💙";
            const ownership = pair.bothMine ? " (Both yours!)" : "";
            const distanceColor = pair.distance <= 8 ? "&a" : "&e";

            Chat.log(`${index + 1}. ${icon} ${pair.pet1.name} + ${pair.pet2.name}${ownership}`);
            Chat.log(`   Distance: ${distanceColor}${pair.distance.toFixed(1)} blocks${pair.distance <= 8 ? " ✓" : " (too far)"}`);

            if (pair.bothMine) {
                myPairs++;
            } else {
                othersPairs++;
            }
        });

        // Food status
        Chat.log(`\n&6=== Breeding Food Status ===`);
        if (foodStatus.hasFood) {
            const foodName = foodStatus.foodType.replace('minecraft:', '').replace('_', ' ');
            const capitalizedFood = foodName.charAt(0).toUpperCase() + foodName.slice(1);
            Chat.log(`&a✓ Holding breeding food: ${capitalizedFood} (${foodStatus.hand} hand)`);

            if (myPairs > 0) {
                Chat.log(`&aReady to breed ${myPairs} of your pet pairs!`);
            }
        } else {
            Chat.log(`&e✗ Not holding breeding food`);
            if (foodStatus.breedingFood.length > 0) {
                Chat.log(`&7Needed foods: ${foodStatus.breedingFood.join(", ")}`);
            }
        }

        // Ownership summary
        Chat.log(`\n&7=== Ownership Summary ===`);
        Chat.log(`Your breeding pairs: ${myPairs}`);
        Chat.log(`Others' breeding pairs: ${othersPairs}`);

        if (myPairs > 0) {
            Chat.log(`&aYou have ${myPairs} breeding pair${myPairs > 1 ? 's' : ''} available!`);
        }

        // Highlight ready pairs
        this.highlightBreedingPairs();
    }

    highlightBreedingPairs() {
        const foodStatus = this.checkBreedingFood();

        this.breedingPairs.forEach(pair => {
            let shouldHighlight = false;
            let color = 0x808080; // Default gray

            if (pair.bothMine && foodStatus.hasFood && pair.distance <= 8) {
                // Perfect conditions - green
                color = 0x00FF00;
                shouldHighlight = true;
            } else if (pair.bothMine && pair.distance <= 8) {
                // Your pets, close enough, but no food - yellow
                color = 0xFFFF00;
                shouldHighlight = true;
            } else if (pair.bothMine) {
                // Your pets but too far - orange
                color = 0xFF8800;
                shouldHighlight = true;
            } else if (pair.distance <= 8) {
                // Others' pets, close enough - light blue
                color = 0x00CCFF;
                shouldHighlight = true;
            }

            if (shouldHighlight) {
                pair.pet1.entity.setGlowing(true);
                pair.pet1.entity.setGlowingColor(color);
                pair.pet2.entity.setGlowing(true);
                pair.pet2.entity.setGlowingColor(color);
            }
        });
    }

    findNearestBreedingPair() {
        if (this.breedingPairs.length === 0) {
            Chat.log("&eNo breeding pairs available");
            return null;
        }

        // Find closest pair that belongs to the player
        let nearestPair = null;
        let minDistance = Infinity;

        this.breedingPairs.forEach(pair => {
            if (pair.bothMine) {
                const avgDistance = (pair.pet1.distance + pair.pet2.distance) / 2;
                if (avgDistance < minDistance) {
                    minDistance = avgDistance;
                    nearestPair = pair;
                }
            }
        });

        if (nearestPair) {
            Chat.log(`&aNearest your breeding pair: ${nearestPair.pet1.name} + ${nearestPair.pet2.name}`);
            Chat.log(`&7Average distance: ${minDistance.toFixed(1)} blocks`);

            // Highlight with special color
            nearestPair.pet1.entity.setGlowing(true);
            nearestPair.pet1.entity.setGlowingColor(0xFF00FF); // Magenta
            nearestPair.pet2.entity.setGlowing(true);
            nearestPair.pet2.entity.setGlowingColor(0xFF00FF);

            return nearestPair;
        } else {
            Chat.log("&eYou don't have any breeding pairs");
            return null;
        }
    }

    update() {
        // Scan every 3 seconds (60 ticks)
        if (Client.getTime() - this.lastScan > 60) {
            this.scanForBreedingPairs();
        }

        // Update highlights
        this.highlightBreedingPairs();
    }
}

// Initialize breeding checker
const breedingChecker = new PetBreedingChecker();

// Update every second (20 ticks)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    breedingChecker.update();
}));

// Manual commands
// breedingChecker.generateBreedingReport();  // Show breeding analysis
// breedingChecker.findNearestBreedingPair(); // Find and highlight nearest pair

Chat.log("&aPet Breeding Checker activated! It will highlight pets based on breeding readiness.");
```

## Notes and Limitations

- TameableEntityHelper instances become invalid when the entity is removed from the world. Always check `isAlive()` before accessing entity data.
- `isTamed()` returns the permanent taming status of the entity. This is different from temporary states and persists across game sessions.
- `isSitting()` indicates whether the entity has been commanded to sit. Tamed animals in sitting position will not follow their owners or move around.
- `getOwner()` returns the UUID of the entity's owner. For wild animals, this returns null. The UUID can be compared with player UUIDs to determine ownership.
- `isOwner()` is a convenient method to check ownership against a specific entity, typically the player. This is safer than manual UUID comparison.
- The inheritance hierarchy provides access to all animal entity methods including breeding functionality (`AnimalEntityHelper`) and general entity properties (`EntityHelper`).
- Tameable entities include wolves, cats, parrots, and horses. Each may have additional specialized methods through their specific helper classes.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important tameable entities for better visibility and organization.
- Ownership is tracked by Minecraft and persists even when the owner is offline or in different dimensions.
- Sitting animals won't follow their owners but can still teleport if they move too far away (this is Minecraft behavior, not script behavior).

## Related Classes

- `AnimalEntityHelper` - Base class for animal-specific functionality including breeding and food preferences
- `WolfEntityHelper` - Specialized wolf helper extending TameableEntityHelper with wolf-specific behaviors
- `CatEntityHelper` - Specialized cat helper extending TameableEntityHelper with cat-specific behaviors
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `PlayerEntityHelper` - Player entity functionality for ownership comparisons

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft TameableEntity implementation
- Inherits comprehensive functionality from the tameable animal hierarchy
- Designed specifically for managing and interacting with tamed companion animals