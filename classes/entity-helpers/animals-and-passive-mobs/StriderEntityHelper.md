# StriderEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.StriderEntityHelper`

**Extends:** `AnimalEntityHelper<StriderEntity>`

The `StriderEntityHelper` class provides specialized access to strider entities in Minecraft, offering methods to monitor and interact with strider-specific behaviors such as saddling status, cold sensitivity, and climate adaptation. This class extends `AnimalEntityHelper` and inherits all functionality for passive animals including breeding mechanics, food preferences, and general animal behaviors.

Striders are unique Nether mobs that can be saddled and ridden, making them essential for navigating the lava seas of the Nether. This helper is particularly useful for creating scripts that manage strider transportation, monitor strider health and comfort, coordinate strider breeding, or track strider populations in Nether environments.

## Constructors

StriderEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering for striders
- Casting from generic EntityHelper instances using `entity.asStrider()`

## Methods

### Strider-Specific States

- [strider.isSaddled()](#striderissaddled)
- [strider.isShivering()](#striderisshivering)

### Inherited Methods

The StriderEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Strider-Specific States

## Usage Examples

### Nether Transportation System
```js
// Comprehensive strider management and navigation system for the Nether
class StriderTransportManager {
    constructor() {
        this.managedStriders = new Map();
        this.transportStriders = new Map();
        this.pathfinder = new NetherPathfinder();
        this.alertDistance = 20;
        this.saddleRange = 8;

        this.initializeStriderTypes();
    }

    initializeStriderTypes() {
        this.striderTypes = {
            regular: {
                foodItems: ["warped_fungus", "warped_fungus_on_a_stick"],
                breedingItems: ["warped_fungus"],
                preferredTemp: "warm"
            },
            saddled: {
                foodItems: ["warped_fungus", "warped_fungus_on_a_stick"],
                breedingItems: ["warped_fungus"],
                preferredTemp: "warm",
                isTransport: true
            }
        };
    }

    scanStriders() {
        const entities = World.getEntities(this.alertDistance);
        const player = Player.getPlayer();

        if (!player) return;

        const currentStriderUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:strider")) {
                const strider = entity.asStrider();
                const uuid = strider.getUUID();
                currentStriderUUIDs.add(uuid);

                this.manageStrider(strider, player);
            }
        });

        // Clean up striders that are no longer in range
        for (const [uuid, striderData] of this.managedStriders) {
            if (!currentStriderUUIDs.has(uuid) && (Client.getTime() - striderData.lastSeen > 30000)) {
                this.managedStriders.delete(uuid);
                this.transportStriders.delete(uuid);
            }
        }
    }

    manageStrider(strider, player) {
        const uuid = strider.getUUID();
        const pos = strider.getPos();
        const distance = player.distanceTo(strider);

        let striderData = this.managedStriders.get(uuid);
        if (!striderData) {
            striderData = {
                strider: strider,
                firstSeen: Client.getTime(),
                lastSeen: Client.getTime(),
                positions: [pos],
                isSaddled: strider.isSaddled(),
                isShivering: strider.isShivering(),
                type: strider.isSaddled() ? "saddled" : "regular"
            };
            this.managedStriders.set(uuid, striderData);

            if (striderData.type === "saddled") {
                this.transportStriders.set(uuid, striderData);
            }
        } else {
            striderData.lastSeen = Client.getTime();
            striderData.positions.push(pos);

            // Keep only recent positions
            if (striderData.positions.length > 20) {
                striderData.positions.shift();
            }
        }

        this.updateStriderStatus(strider, striderData);
        this.handleStriderInteractions(strider, striderData, player, distance);
    }

    updateStriderStatus(strider, striderData) {
        const wasSaddled = striderData.isSaddled;
        const wasShivering = striderData.isShivering;

        striderData.isSaddled = strider.isSaddled();
        striderData.isShivering = strider.isShivering();

        // Check for status changes
        if (wasSaddled !== striderData.isSaddled) {
            if (striderData.isSaddled) {
                striderData.type = "saddled";
                this.transportStriders.set(strider.strider.getUUID(), striderData);
                Chat.log(`&aStrider has been saddled! Ready for transport.`);
            } else {
                striderData.type = "regular";
                this.transportStriders.delete(strider.strider.getUUID());
                Chat.log(`&eStrider is now unsaddled.`);
            }
        }

        if (wasShivering !== striderData.isShivering) {
            if (striderData.isShivering) {
                Chat.log(`&cStrider is shivering! Move to warmer areas.`);
                strider.setGlowing(true);
                strider.setGlowingColor(0x0000FF); // Blue for cold
            } else {
                Chat.log(`&aStrider is comfortable in the current temperature.`);
                strider.resetGlowing();
            }
        }
    }

    handleStriderInteractions(strider, striderData, player, distance) {
        // Highlight cold striders
        if (striderData.isShivering && distance <= this.alertDistance) {
            strider.setGlowing(true);
            strider.setGlowingColor(0x0000FF);
        } else if (striderData.isShivering) {
            strider.resetGlowing();
        }

        // Highlight saddled striders for transport
        if (striderData.isSaddled && distance <= this.saddleRange) {
            strider.setGlowing(true);
            strider.setGlowingColor(0x00FF00); // Green for transport ready
        }

        // Show actionbar alerts for nearby striders
        if (distance <= 10) {
            if (striderData.isShivering) {
                Chat.actionbar(`&cCold strider nearby! Warped fungus available?`);
            } else if (striderData.isSaddled) {
                Chat.actionbar(`&aSaddled strider ready for transport!`);
            } else if (striderData.type === "regular") {
                Chat.actionbar(`&eStrider available for saddling with warped fungus.`);
            }
        }
    }

    findNearestStrider(filter = null) {
        const player = Player.getPlayer();
        if (!player) return null;

        let nearestStrider = null;
        let nearestDistance = Infinity;
        let nearestData = null;

        for (const [uuid, striderData] of this.managedStriders) {
            if (filter && !filter(striderData)) continue;

            const distance = player.distanceTo(striderData.strider);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestStrider = striderData.strider;
                nearestData = striderData;
            }
        }

        return { strider: nearestStrider, distance: nearestDistance, data: nearestData };
    }

    findSaddledStriders() {
        const player = Player.getPlayer();
        if (!player) return [];

        const saddledStriders = [];

        for (const [uuid, striderData] of this.transportStriders) {
            const distance = player.distanceTo(striderData.strider);
            saddledStriders.push({
                strider: striderData.strider,
                distance: distance,
                data: striderData,
                pos: striderData.strider.getPos()
            });
        }

        return saddledStriders.sort((a, b) => a.distance - b.distance);
    }

    provideStriderFood() {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        const warpedFungus = ["minecraft:warped_fungus", "minecraft:warped_fungus_on_a_stick"];

        let hasFood = false;
        if (mainHand && warpedFungus.includes(mainHand.getId())) hasFood = true;
        if (offHand && warpedFungus.includes(offHand.getId())) hasFood = true;

        if (!hasFood) {
            Chat.actionbar("&eHold warped fungus to feed striders!");
            return;
        }

        let fedCount = 0;
        let shiveringCount = 0;

        for (const [uuid, striderData] of this.managedStriders) {
            const distance = player.distanceTo(striderData.strider);

            if (distance <= 5) { // Close enough to feed
                if (striderData.isShivering) {
                    striderData.strider.setGlowing(true);
                    striderData.strider.setGlowingColor(0xFFFF00); // Yellow for feeding
                    fedCount++;
                    shiveringCount++;
                } else if (!striderData.isSaddled) {
                    striderData.strider.setGlowing(true);
                    striderData.strider.setGlowingColor(0x00FF00); // Green for ready to saddle
                    fedCount++;
                }
            }
        }

        if (fedCount > 0) {
            const message = shiveringCount > 0
                ? `&aFed ${fedCount} strider${fedCount > 1 ? 's' : ''} (${shiveringCount} cold ones)`
                : `&aFed ${fedCount} strider${fedCount > 1 ? 's' : ''} for saddling`;
            Chat.actionbar(message);
        }
    }

    generateStriderReport() {
        Chat.log("=== Strider Management Report ===");

        const totalStriders = this.managedStriders.size;
        const saddledCount = this.transportStriders.size;
        const shiveringCount = Array.from(this.managedStriders.values()).filter(s => s.isShivering).length;

        Chat.log(`&6Total striders: ${totalStriders}`);
        Chat.log(`&aSaddled striders: ${saddledCount}`);
        Chat.log(`&cShivering striders: ${shiveringCount}`);

        if (saddledCount > 0) {
            Chat.log("\n&aAvailable for transport:");
            const saddledStriders = this.findSaddledStriders();
            saddledStriders.slice(0, 5).forEach((s, index) => {
                const name = s.strider.getName().getString();
                Chat.log(`  ${index + 1}. ${name}: ${s.distance.toFixed(1)}m away`);
            });
        }

        if (shiveringCount > 0) {
            Chat.log(`\n&cCold striders need attention:`);
            for (const [uuid, striderData] of this.managedStriders) {
                if (striderData.isShivering) {
                    const name = striderData.strider.getName().getString();
                    const pos = striderData.strider.getPos();
                    Chat.log(`  - ${name} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
                }
            }
        }

        // Food inventory check
        this.checkFoodAvailability();
    }

    checkFoodAvailability() {
        const player = Player.getPlayer();
        if (!player) return;

        const inventory = Player.getInventory();
        if (!inventory) return;

        let warpedFungusCount = 0;
        let sticksCount = 0;

        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && item.getId()) {
                const itemId = item.getId();
                if (itemId === "minecraft:warped_fungus") {
                    warpedFungusCount += item.getCount();
                } else if (itemId === "minecraft:stick") {
                    sticksCount += item.getCount();
                }
            }
        }

        Chat.log(`\n&6Food Inventory:`);
        Chat.log(`  Warped fungus: ${warpedFungusCount}`);
        Chat.log(`  Sticks: ${sticksCount}`);

        if (warpedFungusCount === 0) {
            Chat.log(`  &cNo warped fungus available! Need for feeding and breeding.`);
        }
    }

    update() {
        this.scanStriders();
        this.provideStriderFood();
    }
}

// Initialize and run the strider transport manager
const striderManager = new StriderTransportManager();

// Update every 5 ticks for real-time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        striderManager.update();
    }
}));

// Generate comprehensive report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        striderManager.generateStriderReport();
    }
}));

Chat.log("&aStrider Transport Manager activated!");
Chat.log("&7Monitoring striders for transportation, feeding, and climate adaptation...");
Chat.log("&eUse striderManager.generateStriderReport() for status updates.");
```

### Strider Breeding Program
```js
// Strider breeding and population management system
class StriderBreedingProgram {
    constructor() {
        this.breedingStriders = new Map();
        this.availableStriders = new Map();
        this.breedingPairs = [];
        this.foodInventory = new Map();
        this.programStatus = {
            totalStriders: 0,
            breedingPairs: 0,
            shiveringStriders: 0,
            saddledStriders: 0
        };

        this.breedingFood = ["minecraft:warped_fungus", "minecraft:warped_fungus_on_a_stick"];
        this.scanRadius = 50;
        this.lastScan = 0;
        this.scanInterval = 20 * 3; // Every 3 seconds
    }

    scanForStriders() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();

        if (!player) return;

        this.availableStriders.clear();

        entities.forEach(entity => {
            if (entity.is("minecraft:strider")) {
                const strider = entity.asStrider();
                const uuid = strider.getUUID();
                const distance = player.distanceTo(entity);

                const striderData = {
                    strider: strider,
                    uuid: uuid,
                    distance: distance,
                    position: entity.getPos(),
                    isSaddled: strider.isSaddled(),
                    isShivering: strider.isShivering(),
                    lastSeen: Client.getTime()
                };

                this.availableStriders.set(uuid, striderData);
            }
        });

        this.updateProgramStatus();
    }

    updateProgramStatus() {
        this.programStatus.totalStriders = this.availableStriders.size;
        this.programStatus.shiveringStriders = Array.from(this.availableStriders.values()).filter(s => s.isShivering).length;
        this.programStatus.saddledStriders = Array.from(this.availableStriders.values()).filter(s => s.isSaddled).length;

        // Find breeding pairs
        this.findBreedingPairs();
    }

    findBreedingPairs() {
        this.breedingPairs = [];

        const adultStriders = Array.from(this.availableStriders.values()).filter(s => !s.isSaddled && !s.isShivering);

        for (let i = 0; i < adultStriders.length; i++) {
            for (let j = i + 1; j < adultStriders.length; j++) {
                const strider1 = adultStriders[i];
                const strider2 = adultStriders[j];

                // Check distance compatibility
                const distance = strider1.position.distanceTo(strider2.position);
                if (distance <= 10) { // Close enough for breeding
                    this.breedingPairs.push({
                        strider1: strider1,
                        strider2: strider2,
                        distance: distance
                    });
                }
            }
        }

        this.programStatus.breedingPairs = this.breedingPairs.length;
    }

    highlightBreedingOpportunities() {
        // Clear previous highlights
        for (const [uuid, striderData] of this.availableStriders) {
            striderData.strider.resetGlowing();
        }

        // Highlight breeding pairs
        this.breedingPairs.forEach((pair, index) => {
            pair.strider1.strider.setGlowing(true);
            pair.strider1.strider.setGlowingColor(0xFF69B4); // Pink for breeding
            pair.strider2.strider.setGlowing(true);
            pair.strider2.strider.setGlowingColor(0xFF69B4);

            const name1 = pair.strider1.strider.getName().getString();
            const name2 = pair.strider2.strider.getName().getString();
            Chat.log(`&aBreeding pair ${index + 1}: ${name1} + ${name2} (${pair.distance.toFixed(1)}m)`);
        });

        // Highlight shivering striders (need feeding first)
        this.availableStriders.forEach(striderData => {
            if (striderData.isShivering) {
                striderData.strider.setGlowing(true);
                striderData.strider.setGlowingColor(0x0000FF); // Blue for cold
            }
        });

        // Highlight saddled striders (transport ready)
        this.availableStriders.forEach(striderData => {
            if (striderData.isSaddled) {
                striderData.strider.setGlowing(true);
                striderData.strider.setGlowingColor(0x00FF00); // Green for transport
            }
        });
    }

    checkFoodInventory() {
        const player = Player.getPlayer();
        if (!player) return;

        const inventory = Player.getInventory();
        if (!inventory) return;

        this.foodInventory.clear();

        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && item.getId()) {
                const itemId = item.getId();
                if (this.breedingFood.includes(itemId)) {
                    this.foodInventory.set(itemId, (this.foodInventory.get(itemId) || 0) + item.getCount());
                }
            }
        }
    }

    provideBreedingGuidance() {
        const player = Player.getPlayer();
        if (!player) return;

        let messages = [];

        // Check for shivering striders
        if (this.programStatus.shiveringStriders > 0) {
            messages.push(`&c${this.programStatus.shiveringStrider} strider${this.programStatus.shiveringStriders > 1 ? 's' : ''} need feeding first!`);
        }

        // Check breeding opportunities
        if (this.programStatus.breedingPairs > 0) {
            messages.push(`&a${this.programStatus.breedingPairs} breeding pair${this.programStatus.breedingPairs > 1 ? 's' : ''} available!`);

            // Show closest breeding opportunity
            const closestPair = this.breedingPairs.sort((a, b) => a.distance - b.distance)[0];
            if (closestPair) {
                const name1 = closestPair.strider1.strider.getName().getString();
                const name2 = closestPair.strider2.strider.getName().getString();
                messages.push(`&eClosest pair: ${name1} + ${name2} (${closestPair.distance.toFixed(1)}m)`);
            }
        } else if (this.programStatus.totalStriders >= 2) {
            messages.push("&eNo compatible breeding pairs found. Try moving striders closer together.");
        }

        // Food inventory status
        if (this.foodInventory.size === 0) {
            messages.push("&cNo warped fungus available for breeding!");
        } else {
            const totalFood = Array.from(this.foodInventory.values()).reduce((sum, count) => sum + count, 0);
            messages.push(`&aFood available: ${totalFood} warped fungus item${totalFood > 1 ? 's' : ''}`);
        }

        // Display messages
        if (messages.length > 0) {
            messages.forEach(msg => Chat.actionbar(msg));
        }
    }

    generateBreedingReport() {
        Chat.log("=== Strider Breeding Program Report ===");

        // Population status
        Chat.log(`&6Population Status:`);
        Chat.log(`  Total striders: ${this.programStatus.totalStriders}`);
        Chat.log(`  Breeding pairs available: ${this.programStatus.breedingPairs}`);
        Chat.log(`  Shivering striders: ${this.programStatus.shiveringStriders}`);
        Chat.log(`  Saddled striders: ${this.programStatus.saddledStriders}`);

        // Food inventory
        Chat.log(`\n&6Food Inventory:`);
        if (this.foodInventory.size > 0) {
            for (const [itemId, count] of this.foodInventory) {
                const itemName = itemId.replace("minecraft:", "").replace("_", " ");
                Chat.log(`  ${itemName}: ${count}`);
            }
        } else {
            Chat.log("  &cNo breeding food available!");
        }

        // Detailed strider analysis
        if (this.availableStriders.size > 0) {
            Chat.log(`\n&6Detailed Analysis:`);

            const byType = {
                breeding: [],
                shivering: [],
                saddled: [],
                other: []
            };

            this.availableStriders.forEach(striderData => {
                if (striderData.isSaddled) {
                    byType.saddled.push(striderData);
                } else if (striderData.isShivering) {
                    byType.shivering.push(striderData);
                } else if (!striderData.isShivering && striderData.distance <= 10) {
                    byType.breeding.push(striderData);
                } else {
                    byType.other.push(striderData);
                }
            });

            Object.entries(byType).forEach(([type, striders]) => {
                if (striders.length > 0) {
                    const typeName = type.charAt(0).toUpperCase() + type.slice(1);
                    Chat.log(`  ${typeName} (${striders.length}):`);
                    striders.slice(0, 3).forEach(s => {
                        const name = s.strider.getName().getString();
                        Chat.log(`    - ${name}: ${s.distance.toFixed(1)}m`);
                    });
                }
            });
        }

        // Breeding recommendations
        Chat.log(`\n&6Recommendations:`);
        if (this.programStatus.shiveringStriders > 0) {
            Chat.log("  &cPriority 1: Feed shivering striders with warped fungus");
        }
        if (this.programStatus.breedingPairs > 0 && this.foodInventory.size > 0) {
            Chat.log("  &aPriority 2: Breed available pairs to grow population");
        }
        if (this.programStatus.saddledStriders > 0) {
            Chat.log("  &aTransport: Use saddled striders for Nether exploration");
        }
        if (this.foodInventory.size === 0) {
            Chat.log("  &cObtain warped fungus for breeding program");
        }
    }

    update() {
        const currentTime = Client.getTime();
        if (currentTime - this.lastScan < this.scanInterval) return;

        this.lastScan = currentTime;
        this.scanForStriders();
        this.checkFoodInventory();
        this.highlightBreedingOpportunities();
        this.provideBreedingGuidance();
    }
}

// Initialize the breeding program
const breedingProgram = new StriderBreedingProgram();

// Update every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    breedingProgram.update();
}));

// Generate detailed report every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        breedingProgram.generateBreedingReport();
    }
}));

// Manual report trigger
Chat.command("striderreport", () => {
    breedingProgram.generateBreedingReport();
});

Chat.log("&aStrider Breeding Program activated!");
Chat.log("&7Monitoring strider population, breeding opportunities, and food requirements...");
```

## Notes and Limitations

- StriderEntityHelper instances become invalid when the strider entity is removed from the world (despawns, dies, or is unloaded). Always check `isAlive()` before accessing strider data.
- `isSaddled()` returns true when the strider has a saddle equipped, making it ready for riding in the Nether.
- `isShivering()` (aliased as `isCold()`) returns true when the strider is in cold environments, indicating discomfort that can be fixed by moving to warmer areas or feeding warped fungus.
- Striders require warped fungus for both feeding and breeding, making this a crucial resource for strider management.
- The inheritance hierarchy provides access to comprehensive animal functionality including breeding mechanics, food preferences, and general mob behaviors.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight striders for different purposes (cold, breeding, transport).
- Striders are unique to the Nether dimension and have specific temperature requirements that affect their behavior and breeding capabilities.

## Related Classes

- `AnimalEntityHelper` - Base class for animal entities with breeding and food functionality
- `MobEntityHelper` - Mob entity functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` and `ItemStackHelper` - Item information for checking warped fungus availability
- `NetherPathfinder` - For navigation in Nether environments (if implementing complex transportation)

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft StriderEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for Nether transportation and strider population management

---

**See Also:**
- [EntityHelper.asStrider()](#entityastrider) - Method to cast entities to StriderEntityHelper
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal base class for breeding and food functionality
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\LivingEntityHelper.md) - Living entity functionality including health monitoring
- [ItemHelper](F:\java\JsMacros\JsMacros-Docs\classes\ItemHelper.md) - Item properties for checking warped fungus availability