# AnimalEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.AnimalEntityHelper`

**Extends:** `MobEntityHelper<AnimalEntity>`

The `AnimalEntityHelper` class provides specialized access to animal entities in Minecraft, offering methods for breeding mechanics, food preferences, and animal compatibility checking. This class serves as the base class for all passive animal helpers and extends `MobEntityHelper`, inheriting comprehensive functionality for mob behaviors, living entity properties, and basic entity operations.

This helper is essential for scripts that manage animal breeding, farm automation, animal feeding systems, or any functionality that requires interaction with Minecraft's animal ecosystem.

## Constructors

AnimalEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityBreed`, `EntityInteract`)
- World entity queries using type filtering for animals
- Casting from generic EntityHelper instances using `entity.asAnimal()`

## Methods

### Animal Behavior and Breeding

- [animal.isFood()](#animalisfood)
- [animal.canBreedWith()](#animalcanbreedwith)

### Inherited Methods

The AnimalEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Animal Behavior and Breeding

## Usage Examples

### Basic Animal Interaction System
```js
// Simple animal monitoring and interaction helper
class AnimalMonitor {
    constructor() {
        this.animalTypes = [
            "minecraft:cow", "minecraft:sheep", "minecraft:pig", "minecraft:chicken",
            "minecraft:rabbit", "minecraft:mooshroom", "minecraft:llama", "minecraft:horse",
            "minecraft:donkey", "minecraft:mule", "minecraft:cat", "minecraft:wolf"
        ];
        this.scanRadius = 16;
        this.lastScan = 0;
        this.scanInterval = 20 * 2; // Every 2 seconds
    }

    scanAnimals() {
        const entities = World.getEntities(this.scanRadius);
        const animals = [];
        const player = Player.getPlayer();

        if (!player) return animals;

        entities.forEach(entity => {
            if (entity.is(...this.animalTypes)) {
                const distance = player.distanceTo(entity);
                const animal = entity.asAnimal();

                animals.push({
                    entity: entity,
                    animal: animal,
                    type: entity.getType(),
                    distance: distance,
                    position: entity.getPos(),
                    name: entity.getName().getString()
                });
            }
        });

        return animals;
    }

    checkFeedingStatus(animals) {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        if (!mainHand && !offHand) return;

        let feedableAnimals = 0;
        animals.forEach(animalData => {
            let canFeed = false;
            if (mainHand && animalData.animal.isFood(mainHand)) canFeed = true;
            if (offHand && animalData.animal.isFood(offHand)) canFeed = true;

            if (canFeed) {
                feedableAnimals++;
                animalData.entity.setGlowing(true);
                animalData.entity.setGlowingColor(0x00FF00);
            } else {
                animalData.entity.resetGlowing();
            }
        });

        if (feedableAnimals > 0) {
            Chat.actionbar(`&a${feedableAnimals} animal${feedableAnimals > 1 ? 's' : ''} can be fed with your item`);
        }
    }

    displayAnimalReport(animals) {
        if (animals.length === 0) {
            Chat.log("&7No animals found in range");
            return;
        }

        Chat.log(`=== Animal Report (${animals.length} found) ===`);

        const animalsByType = new Map();
        animals.forEach(animalData => {
            if (!animalsByType.has(animalData.type)) {
                animalsByType.set(animalData.type, 0);
            }
            animalsByType.set(animalData.type, animalsByType.get(animalData.type) + 1);
        });

        for (const [type, count] of animalsByType) {
            const animalName = type.replace("minecraft:", "").charAt(0).toUpperCase() + type.replace("minecraft:", "").slice(1);
            Chat.log(`${animalName}: ${count}`);
        }

        // Show closest animals
        const sortedAnimals = animals.sort((a, b) => a.distance - b.distance);
        if (sortedAnimals.length > 0) {
            Chat.log(`\n&eClosest animals:`);
            sortedAnimals.slice(0, 5).forEach(animalData => {
                const animalName = animalData.type.replace("minecraft:", "");
                Chat.log(`- ${animalName}: ${animalData.distance.toFixed(1)}m away`);
            });
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        const animals = this.scanAnimals();
        this.checkFeedingStatus(animals);
    }
}

// Initialize and run
const animalMonitor = new AnimalMonitor();
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    animalMonitor.update();
}));

// Command to generate report
Chat.log("&aAnimal Monitor activated! Use animalMonitor.scanAnimals() for manual scan.");
```

### Comprehensive Farm Automation
```js
// Advanced farm automation with breeding and feeding management
class FarmAutomationSystem {
    constructor() {
        this.farmAnimals = new Map();
        this.breedingGoals = new Map();
        this.foodInventory = new Map();
        this.lastUpdate = 0;
        this.updateInterval = 20 * 5; // Every 5 seconds
        this.farmRadius = 32;
        this.initializeBreedingGoals();
    }

    initializeBreedingGoals() {
        // Set target populations for different animal types
        this.breedingGoals.set("minecraft:cow", { min: 4, max: 8, priority: 1 });
        this.breedingGoals.set("minecraft:sheep", { min: 6, max: 12, priority: 2 });
        this.breedingGoals.set("minecraft:pig", { min: 3, max: 6, priority: 1 });
        this.breedingGoals.set("minecraft:chicken", { min: 8, max: 16, priority: 3 });
        this.breedingGoals.set("minecraft:rabbit", { min: 2, max: 4, priority: 1 });
    }

    scanFarm() {
        const entities = World.getEntities(this.farmRadius);
        const animals = [];
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (this.isFarmAnimal(entity)) {
                const uuid = entity.getUUID();
                const type = entity.getType();
                const distance = player.distanceTo(entity);
                const animal = entity.asAnimal();

                const animalData = {
                    uuid: uuid,
                    entity: entity,
                    animal: animal,
                    type: type,
                    distance: distance,
                    position: entity.getPos(),
                    lastSeen: Client.getTime(),
                    health: null
                };

                // Try to get health if it's a living entity
                try {
                    const living = entity.asLiving();
                    if (living) {
                        animalData.health = living.getHealth();
                        animalData.maxHealth = living.getMaxHealth();
                    }
                } catch (e) {
                    // Some entities might not be living entities
                }

                animals.push(animalData);
                this.farmAnimals.set(uuid, animalData);
            }
        });

        // Clean up animals that are no longer in range
        const currentUUIDs = new Set(animals.map(a => a.uuid));
        for (const [uuid, animalData] of this.farmAnimals) {
            if (!currentUUIDs.has(uuid) && (Client.getTime() - animalData.lastSeen > 60000)) {
                this.farmAnimals.delete(uuid);
            }
        }
    }

    isFarmAnimal(entity) {
        return entity.is(
            "minecraft:cow", "minecraft:sheep", "minecraft:pig", "minecraft:chicken",
            "minecraft:rabbit", "minecraft:mooshroom", "minecraft:llama", "minecraft:horse",
            "minecraft:donkey", "minecraft:mule"
        );
    }

    assessBreedingNeeds() {
        const animalCounts = new Map();
        for (const [uuid, animalData] of this.farmAnimals) {
            const type = animalData.type;
            animalCounts.set(type, (animalCounts.get(type) || 0) + 1);
        }

        const breedingNeeds = [];
        for (const [type, count] of animalCounts) {
            const goal = this.breedingGoals.get(type);
            if (goal && count < goal.min) {
                breedingNeeds.push({
                    type: type,
                    current: count,
                    needed: goal.min - count,
                    priority: goal.priority,
                    urgency: (goal.min - count) / goal.min
                });
            }
        }

        // Sort by priority and urgency
        breedingNeeds.sort((a, b) => {
            if (a.priority !== b.priority) return b.priority - a.priority;
            return b.urgency - a.urgency;
        });

        return breedingNeeds;
    }

    findBreedingPairs(animalType) {
        const animals = Array.from(this.farmAnimals.values())
            .filter(animal => animal.type === animalType);

        const compatiblePairs = [];
        for (let i = 0; i < animals.length; i++) {
            for (let j = i + 1; j < animals.length; j++) {
                if (animals[i].animal.canBreedWith(animals[j].animal)) {
                    const distance = animals[i].position.distanceTo(animals[j].position);
                    compatiblePairs.push({
                        animal1: animals[i],
                        animal2: animals[j],
                        distance: distance
                    });
                }
            }
        }

        return compatiblePairs.sort((a, b) => a.distance - b.distance);
    }

    checkFoodAvailability() {
        const player = Player.getPlayer();
        if (!player) return;

        const inventory = Player.getInventory();
        if (!inventory) return;

        const foodItems = new Map();

        // Check main inventory and hotbar
        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && item.getId()) {
                const itemId = item.getId();
                if (this.isBreedingFood(itemId)) {
                    foodItems.set(itemId, (foodItems.get(itemId) || 0) + item.getCount());
                }
            }
        }

        this.foodInventory = foodItems;
    }

    isBreedingFood(itemId) {
        const breedingFoods = [
            "minecraft:wheat", "minecraft:carrot", "minecraft:potato", "minecraft:beetroot",
            "minecraft:wheat_seeds", "minecraft:melon_seeds", "minecraft:pumpkin_seeds",
            "minecraft:beetroot_seeds", "minecraft:dandelion", "minecraft:golden_carrot"
        ];
        return breedingFoods.includes(itemId);
    }

    generateFarmReport() {
        Chat.log("=== Farm Automation Report ===");

        // Animal census
        const animalCounts = new Map();
        for (const [uuid, animalData] of this.farmAnimals) {
            const type = animalData.type;
            animalCounts.set(type, (animalCounts.get(type) || 0) + 1);
        }

        Chat.log("&6Animal Census:");
        for (const [type, count] of animalCounts) {
            const goal = this.breedingGoals.get(type);
            const status = goal ? (count >= goal.max ? "&a(Max)" : count >= goal.min ? "&e(OK)" : "&c(Low)") : "&7(No goal)";
            const animalName = type.replace("minecraft:", "").charAt(0).toUpperCase() + type.replace("minecraft:", "").slice(1);
            Chat.log(`  ${animalName}: ${count} ${status}`);
        }

        // Breeding needs assessment
        const breedingNeeds = this.assessBreedingNeeds();
        if (breedingNeeds.length > 0) {
            Chat.log("\n&eBreeding Priorities:");
            breedingNeeds.slice(0, 3).forEach((need, index) => {
                const animalName = need.type.replace("minecraft:", "").charAt(0).toUpperCase() + need.type.replace("minecraft:", "").slice(1);
                Chat.log(`  ${index + 1}. ${animalName}: Need ${need.needed} more (Priority: ${need.priority})`);
            });
        }

        // Food inventory check
        Chat.log("\n&6Food Inventory:");
        if (this.foodInventory.size > 0) {
            for (const [itemId, count] of this.foodInventory) {
                const itemName = itemId.replace("minecraft:", "").replace("_", " ");
                Chat.log(`  ${itemName}: ${count}`);
            }
        } else {
            Chat.log("  &cNo breeding food available!");
        }

        // Breeding pair opportunities
        Chat.log("\n&eBreeding Opportunities:");
        let totalOpportunities = 0;
        for (const [type, count] of animalCounts) {
            if (count >= 2) {
                const pairs = this.findBreedingPairs(type);
                totalOpportunities += pairs.length;
                if (pairs.length > 0) {
                    const animalName = type.replace("minecraft:", "").charAt(0).toUpperCase() + type.replace("minecraft:", "").slice(1);
                    Chat.log(`  ${animalName}: ${pairs.length} compatible pair${pairs.length > 1 ? 's' : ''}`);
                }
            }
        }

        if (totalOpportunities === 0) {
            Chat.log("  &7No compatible breeding pairs nearby");
        }
    }

    highlightBreedingOpportunities() {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        if (!mainHand) return;

        // Clear previous highlights
        for (const [uuid, animalData] of this.farmAnimals) {
            animalData.entity.resetGlowing();
        }

        let highlightedCount = 0;
        for (const [uuid, animalData] of this.farmAnimals) {
            if (animalData.animal.isFood(mainHand)) {
                animalData.entity.setGlowing(true);
                animalData.entity.setGlowingColor(0x00FF00); // Green for feedable
                highlightedCount++;
            }
        }

        if (highlightedCount > 0) {
            Chat.actionbar(`&a${highlightedCount} animal${highlightedCount > 1 ? 's' : ''} will eat your ${mainHand.getName()}`);
        }
    }

    update() {
        this.scanFarm();
        this.checkFoodAvailability();
        this.highlightBreedingOpportunities();
    }
}

// Initialize farm automation
const farmSystem = new FarmAutomationSystem();

// Update system every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 100 === 0) { // Every 5 seconds (100 ticks)
        farmSystem.update();
    }
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        farmSystem.generateFarmReport();
    }
}));

Chat.log("&aFarm Automation System activated!");
Chat.log("&7Monitoring animals, breeding opportunities, and food inventory...");
```

## Notes and Limitations

- AnimalEntityHelper instances become invalid when the animal entity is removed from the world. Always check `isAlive()` before accessing animal data.
- `isFood()` methods check both `ItemHelper` and `ItemStackHelper` instances for flexibility in different contexts.
- `canBreedWith()` checks Minecraft's internal breeding logic, which includes species compatibility, relationship checking (avoiding inbreeding), and current breeding readiness.
- Animals must be in "love mode" (fed breeding food) to actually breed, even if `canBreedWith()` returns true.
- Different animal species have different breeding food requirements - use the `isFood()` method to determine what specific animals will eat.
- Breeding mechanics follow Minecraft's vanilla behavior, including cooldown periods and population limits in some cases.
- The inheritance hierarchy provides access to comprehensive mob functionality including AI states, health monitoring, and basic entity operations.
- Distance calculations and compatibility checks are important for efficient breeding automation systems.

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` - Item information and properties for food checking
- `ItemStackHelper` - ItemStack information for inventory-based food checking
- Specific animal helpers like `SheepEntityHelper`, `PigEntityHelper`, `WolfEntityHelper` for species-specific functionality

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft AnimalEntity implementation
- Inherits comprehensive functionality from the mob entity hierarchy
- Designed specifically for animal breeding and farm automation systems

---

**See Also:**
- [EntityHelper.asAnimal()](#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\LivingEntityHelper.md) - Living entity base class
- [MobEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\MobEntityHelper.md) - Mob entity base class