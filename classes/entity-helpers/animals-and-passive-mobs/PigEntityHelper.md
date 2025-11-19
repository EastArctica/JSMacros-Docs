# PigEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.PigEntityHelper`

**Extends:** `AnimalEntityHelper<PigEntity>`

The `PigEntityHelper` class provides specialized functionality for interacting with pig entities in Minecraft. This helper offers access to pig-specific properties including saddling status for riding capabilities, along with all the inherited functionality from animal entities for breeding and feeding mechanics. It extends `AnimalEntityHelper` and inherits comprehensive methods for managing animal behaviors, breeding compatibility, and food preferences.

Pigs are passive mobs that can be ridden by players when equipped with a saddle. They are bred using carrots, potatoes, and beetroots, making them valuable for food production and transportation in early game scenarios. Unlike horses, pigs require a carrot on a stick to steer while being ridden.

This class is typically obtained through entity events, world queries, or by casting from `EntityHelper` using the `asAnimal()` method when dealing with pig entities.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

PigEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityInteract`, `EntitySpawn`, `EntityDeath`)
- World entity queries and filtering for pig entities using `entity.is("minecraft:pig")`
- Type casting from `EntityHelper` using `asAnimal()` when working with pig entities
- Methods that return pig entities from other helpers or events

---

## Methods

### Pig-Specific Methods

- [pig.isSaddled()](#pigissaddled)

### Inherited Methods

The PigEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()` for breeding and feeding mechanics
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()` for mob behaviors
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Pig-Specific Methods

## Usage Examples

### Pig Riding System Manager
```js
// Comprehensive pig management and riding system
class PigRidingManager {
    constructor() {
        this.trackedPigs = new Map();
        this.saddledPigs = new Set();
        this.rideablePigs = new Set();
        this.playerInventory = new Map();
        this.scanRadius = 16;
        this.lastUpdate = 0;
        this.updateInterval = 20 * 2; // Every 2 seconds
    }

    scanForPigs() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();
        if (!player) return;

        const currentPigUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:pig")) {
                const pig = entity.asAnimal();
                const uuid = pig.getUUID();
                const pos = pig.getPos();
                const isSaddled = pig.isSaddled();
                const distance = player.distanceTo(entity);

                currentPigUUIDs.add(uuid);

                // Update pig tracking
                if (!this.trackedPigs.has(uuid)) {
                    this.trackedPigs.set(uuid, {
                        entity: entity,
                        pig: pig,
                        position: pos,
                        isSaddled: isSaddled,
                        firstSeen: Client.getTime(),
                        lastUpdate: Client.getTime(),
                        distance: distance
                    });

                    Chat.log(`&eNew pig detected: ${isSaddled ? "&6Saddled" : "&aUnsaddled"} at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
                } else {
                    const pigData = this.trackedPigs.get(uuid);
                    pigData.position = pos;
                    pigData.distance = distance;
                    pigData.isSaddled = isSaddled;
                    pigData.lastUpdate = Client.getTime();
                }

                // Track saddled status
                if (isSaddled) {
                    this.saddledPigs.add(uuid);
                    this.rideablePigs.add(uuid);
                } else {
                    this.saddledPigs.delete(uuid);
                    this.rideablePigs.delete(uuid);
                }
            }
        });

        // Clean up pigs that are no longer in range
        for (const [uuid, pigData] of this.trackedPigs) {
            if (!currentPigUUIDs.has(uuid) && (Client.getTime() - pigData.lastUpdate > 60000)) {
                Chat.log(`&7Pig left tracking range or died`);
                this.trackedPigs.delete(uuid);
                this.saddledPigs.delete(uuid);
                this.rideablePigs.delete(uuid);
            }
        }
    }

    findNearestSaddledPig() {
        const player = Player.getPlayer();
        if (!player) return null;

        let nearestPig = null;
        let nearestDistance = Infinity;

        for (const [uuid, pigData] of this.trackedPigs) {
            if (pigData.isSaddled && pigData.distance < nearestDistance) {
                nearestDistance = pigData.distance;
                nearestPig = pigData;
            }
        }

        return nearestPig ? { ...nearestPig, distance: nearestDistance } : null;
    }

    findNearestUnsaddledPig() {
        const player = Player.getPlayer();
        if (!player) return null;

        let nearestPig = null;
        let nearestDistance = Infinity;

        for (const [uuid, pigData] of this.trackedPigs) {
            if (!pigData.isSaddled && pigData.distance < nearestDistance) {
                nearestDistance = pigData.distance;
                nearestPig = pigData;
            }
        }

        return nearestPig ? { ...nearestPig, distance: nearestDistance } : null;
    }

    highlightSaddledPigs() {
        let highlightedCount = 0;

        for (const [uuid, pigData] of this.trackedPigs) {
            if (pigData.isSaddled) {
                pigData.entity.setGlowing(true);
                pigData.entity.setGlowingColor(0xFFD700); // Gold for saddled pigs
                highlightedCount++;
            } else {
                pigData.entity.resetGlowing();
            }
        }

        Chat.log(`&aHighlighted ${highlightedCount} saddled pig${highlightedCount !== 1 ? 's' : ''} in gold.`);
    }

    highlightUnsaddledPigs() {
        let highlightedCount = 0;

        for (const [uuid, pigData] of this.trackedPigs) {
            if (!pigData.isSaddled) {
                pigData.entity.setGlowing(true);
                pigData.entity.setGlowingColor(0xFF69B4); // Pink for unsaddled pigs
                highlightedCount++;
            } else {
                pigData.entity.resetGlowing();
            }
        }

        Chat.log(`&aHighlighted ${highlightedCount} unsaddled pig${highlightedCount !== 1 ? 's' : ''} in pink.`);
    }

    clearHighlights() {
        for (const [uuid, pigData] of this.trackedPigs) {
            pigData.entity.resetGlowing();
        }
        Chat.log("&7Cleared all pig highlights.");
    }

    generatePigReport() {
        Chat.log("&6=== Pig Management Report ===");
        Chat.log(`Total pigs tracked: ${this.trackedPigs.size}`);
        Chat.log(`Saddled pigs: ${this.saddledPigs.size}`);
        Chat.log(`Unsaddled pigs: ${this.trackedPigs.size - this.saddledPigs.size}`);

        if (this.trackedPigs.size > 0) {
            Chat.log("\n&ePig Locations:");
            const sortedPigs = Array.from(this.trackedPigs.values()).sort((a, b) => a.distance - b.distance);
            sortedPigs.slice(0, 5).forEach(pigData => {
                const status = pigData.isSaddled ? "&6[Saddled]" : "&a[Unsaddled]";
                Chat.log(`  ${status} ${pigData.distance.toFixed(1)}m away [${pigData.position.x.toFixed(0)}, ${pigData.position.y.toFixed(0)}, ${pigData.position.z.toFixed(0)}]`);
            });
        }

        // Check for carrot on a stick availability
        const player = Player.getPlayer();
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        let hasCarrotStick = false;

        if (mainHand && mainHand.getId() === "minecraft:carrot_on_a_stick") {
            hasCarrotStick = true;
            Chat.log("\n&aYou have a carrot on a stick in your main hand!");
        } else if (offHand && offHand.getId() === "minecraft:carrot_on_a_stick") {
            hasCarrotStick = true;
            Chat.log("\n&aYou have a carrot on a stick in your off hand!");
        }

        if (!hasCarrotStick && this.saddledPigs.size > 0) {
            Chat.log("\n&cWarning: You have saddled pigs but no carrot on a stick to steer them!");
        }

        // Saddle availability check
        const inventory = Player.getInventory();
        let saddleCount = 0;
        if (inventory) {
            for (let i = 0; i < inventory.getSize(); i++) {
                const item = inventory.getStack(i);
                if (item && item.getId() === "minecraft:saddle") {
                    saddleCount += item.getCount();
                }
            }
        }

        if (saddleCount > 0 && this.saddledPigs.size < this.trackedPigs.size) {
            Chat.log(`\n&eYou have ${saddleCount} saddle${saddleCount !== 1 ? 's' : ''} available for saddling pigs!`);
        }
    }

    checkSaddleOpportunities() {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        if (!mainHand || mainHand.getId() !== "minecraft:saddle") {
            Chat.log("&cYou need to hold a saddle in your main hand to saddle pigs.");
            return;
        }

        let unsaddledPigsInRange = 0;
        const maxSaddleDistance = 5;

        for (const [uuid, pigData] of this.trackedPigs) {
            if (!pigData.isSaddled && pigData.distance <= maxSaddleDistance) {
                unsaddledPigsInRange++;
                pigData.entity.setGlowing(true);
                pigData.entity.setGlowingColor(0x00FF00); // Green for saddleable pigs
            } else {
                pigData.entity.resetGlowing();
            }
        }

        if (unsaddledPigsInRange > 0) {
            Chat.log(`&a${unsaddledPigsInRange} pig${unsaddledPigsInRange !== 1 ? 's' : ''} can be saddled (within ${maxSaddleDistance} blocks)!`);
        } else {
            Chat.log("&7No unsaddled pigs within saddling range (5 blocks).");
        }
    }

    update() {
        if (Client.getTime() - this.lastUpdate < this.updateInterval) return;

        this.lastUpdate = Client.getTime();
        this.scanForPigs();
    }
}

// Initialize pig riding manager
const pigManager = new PigRidingManager();

// Update pig tracking every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    pigManager.update();
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        pigManager.generatePigReport();
    }
}));

Chat.log("&aPig Riding Manager activated! Tracking saddled and unsaddled pigs nearby.");
```

### Pig Breeding and Feeding System
```js
// Advanced pig breeding and feeding automation
class PigBreedingSystem {
    constructor() {
        this.trackedPigs = new Map();
        this.breedingPairs = new Map();
        this.foodInventory = new Map();
        this.saddleCount = 0;
        this.scanRadius = 20;
        this.breedingRadius = 5;
        this.lastUpdate = 0;
        this.updateInterval = 20 * 3; // Every 3 seconds
    }

    scanPigs() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();
        if (!player) return;

        const currentPigUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:pig")) {
                const pig = entity.asAnimal();
                const uuid = pig.getUUID();
                const pos = pig.getPos();
                const isSaddled = pig.isSaddled();
                const living = entity.asLiving();

                currentPigUUIDs.add(uuid);

                const pigData = {
                    entity: entity,
                    pig: pig,
                    uuid: uuid,
                    position: pos,
                    isSaddled: isSaddled,
                    isAlive: living ? living.isAlive() : true,
                    health: living ? living.getHealth() : 10,
                    maxHealth: living ? living.getMaxHealth() : 10,
                    lastUpdate: Client.getTime()
                };

                this.trackedPigs.set(uuid, pigData);
            }
        });

        // Clean up pigs that are no longer in range
        for (const [uuid, pigData] of this.trackedPigs) {
            if (!currentPigUUIDs.has(uuid)) {
                this.trackedPigs.delete(uuid);
                this.breedingPairs.delete(uuid);
            }
        }
    }

    checkFoodAvailability() {
        const inventory = Player.getInventory();
        if (!inventory) return;

        this.foodInventory.clear();
        const pigFoods = ["minecraft:carrot", "minecraft:potato", "minecraft:beetroot"];

        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && pigFoods.includes(item.getId())) {
                this.foodInventory.set(item.getId(), (this.foodInventory.get(item.getId()) || 0) + item.getCount());
            }
        }

        // Check for saddles
        this.saddleCount = 0;
        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && item.getId() === "minecraft:saddle") {
                this.saddleCount += item.getCount();
            }
        }
    }

    findBreedingPairs() {
        this.breedingPairs.clear();
        const pigs = Array.from(this.trackedPigs.values()).filter(pigData =>
            pigData.isAlive && !pigData.isSaddled
        );

        for (let i = 0; i < pigs.length; i++) {
            for (let j = i + 1; j < pigs.length; j++) {
                const pig1 = pigs[i];
                const pig2 = pigs[j];

                if (pig1.pig.canBreedWith(pig2.pig)) {
                    const distance = pig1.position.distanceTo(pig2.position);

                    if (distance <= this.breedingRadius) {
                        this.breedingPairs.set(pig1.uuid, {
                            partner: pig2.uuid,
                            distance: distance,
                            center: pig1.position.add(pig2.position).div(2)
                        });
                    }
                }
            }
        }
    }

    highlightFeedablePigs() {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        let feedableCount = 0;

        // Clear previous highlights
        for (const [uuid, pigData] of this.trackedPigs) {
            pigData.entity.resetGlowing();
        }

        // Check main hand
        if (mainHand && this.isPigFood(mainHand.getId())) {
            for (const [uuid, pigData] of this.trackedPigs) {
                if (pigData.pig.isFood(mainHand)) {
                    pigData.entity.setGlowing(true);
                    pigData.entity.setGlowingColor(0x00FF00); // Green for feedable
                    feedableCount++;
                }
            }
        }

        // Check off hand if main hand is not food
        if (feedableCount === 0 && offHand && this.isPigFood(offHand.getId())) {
            for (const [uuid, pigData] of this.trackedPigs) {
                if (pigData.pig.isFood(offHand)) {
                    pigData.entity.setGlowing(true);
                    pigData.entity.setGlowingColor(0x00FF00); // Green for feedable
                    feedableCount++;
                }
            }
        }

        if (feedableCount > 0) {
            const itemName = mainHand ? mainHand.getName() : offHand.getName();
            Chat.actionbar(`&a${feedableCount} pig${feedableCount !== 1 ? 's' : ''} will eat ${itemName}`);
        }
    }

    highlightSaddleablePigs() {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        if (!mainHand || mainHand.getId() !== "minecraft:saddle") return;

        let saddleableCount = 0;
        const maxDistance = 5;

        for (const [uuid, pigData] of this.trackedPigs) {
            const distance = player.distanceTo(pigData.entity);
            if (!pigData.isSaddled && distance <= maxDistance) {
                pigData.entity.setGlowing(true);
                pigData.entity.setGlowingColor(0xFFD700); // Gold for saddleable
                saddleableCount++;
            }
        }

        if (saddleableCount > 0) {
            Chat.actionbar(`&e${saddleableCount} pig${saddleableCount !== 1 ? 's' : ''} can be saddled!`);
        }
    }

    isPigFood(itemId) {
        return ["minecraft:carrot", "minecraft:potato", "minecraft:beetroot"].includes(itemId);
    }

    generateBreedingReport() {
        Chat.log("&6=== Pig Breeding Report ===");
        Chat.log(`Total pigs tracked: ${this.trackedPigs.size}`);
        Chat.log(`Saddled pigs: ${Array.from(this.trackedPigs.values()).filter(p => p.isSaddled).length}`);
        Chat.log(`Available for breeding: ${this.trackedPigs.size - Array.from(this.trackedPigs.values()).filter(p => p.isSaddled).length}`);

        // Food inventory
        Chat.log("\n&eFood Inventory:");
        if (this.foodInventory.size > 0) {
            for (const [itemId, count] of this.foodInventory) {
                const itemName = itemId.replace("minecraft:", "").replace("_", " ");
                Chat.log(`  ${itemName}: ${count}`);
            }
        } else {
            Chat.log("  &cNo pig food available!");
        }

        // Saddles
        Chat.log(`Saddles: ${this.saddleCount}`);

        // Breeding pairs
        if (this.breedingPairs.size > 0) {
            Chat.log(`\n&aBreeding pairs found: ${this.breedingPairs.size}`);
            for (const [pig1Uuid, pairData] of this.breedingPairs) {
                const pig1Data = this.trackedPigs.get(pig1Uuid);
                const pig2Data = this.trackedPigs.get(pairData.partner);
                Chat.log(`  Pair: ${pairData.distance.toFixed(1)}m apart, Center: [${pairData.center.x.toFixed(1)}, ${pairData.center.y.toFixed(1)}, ${pairData.center.z.toFixed(1)}]`);
            }
        } else {
            Chat.log("\n&7No compatible breeding pairs nearby");
        }

        // Health check
        let unhealthyPigs = 0;
        for (const [uuid, pigData] of this.trackedPigs) {
            if (pigData.health < pigData.maxHealth * 0.5) {
                unhealthyPigs++;
            }
        }

        if (unhealthyPigs > 0) {
            Chat.log(`\n&cWarning: ${unhealthyPigs} pigs have low health!`);
        }
    }

    findOptimalBreedingLocation() {
        if (this.breedingPairs.size === 0) {
            Chat.log("&7No breeding pairs found to optimize placement.");
            return;
        }

        // Find the center of all breeding pairs
        let totalX = 0, totalY = 0, totalZ = 0;
        let pairCount = 0;

        for (const [pig1Uuid, pairData] of this.breedingPairs) {
            totalX += pairData.center.x;
            totalY += pairData.center.y;
            totalZ += pairData.center.z;
            pairCount++;
        }

        const centerX = totalX / pairCount;
        const centerY = totalY / pairCount;
        const centerZ = totalZ / pairCount;

        Chat.log(`\n&eOptimal breeding location: [${centerX.toFixed(1)}, ${centerY.toFixed(1)}, ${centerZ.toFixed(1)}]`);
        Chat.log("Stand here with breeding food to efficiently breed multiple pairs!");

        // Highlight the optimal location
        const player = Player.getPlayer();
        const playerPos = player.getPos();
        const distance = Math.sqrt(Math.pow(centerX - playerPos.x, 2) + Math.pow(centerZ - playerPos.z, 2));

        Chat.log(`Distance to optimal location: ${distance.toFixed(1)} blocks`);
    }

    update() {
        if (Client.getTime() - this.lastUpdate < this.updateInterval) return;

        this.lastUpdate = Client.getTime();
        this.scanPigs();
        this.checkFoodAvailability();
        this.findBreedingPairs();
        this.highlightFeedablePigs();
        this.highlightSaddleablePigs();
    }
}

// Initialize pig breeding system
const pigBreedingSystem = new PigBreedingSystem();

// Update system every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    pigBreedingSystem.update();
}));

// Generate report every 60 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        pigBreedingSystem.generateBreedingReport();
    }
}));

Chat.log("&aPig Breeding System activated! Monitoring pigs for breeding opportunities.");
```

### Pig Transportation Assistant
```js
// Pig transportation and logistics helper
class PigTransportHelper {
    constructor() {
        this.availablePigs = new Map();
        this.rideablePigs = new Map();
        this.transportRoutes = [];
        this.currentRoute = null;
        this.scanRadius = 32;
        this.lastUpdate = 0;
    }

    scanTransportPigs() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();
        if (!player) return;

        this.availablePigs.clear();
        this.rideablePigs.clear();

        entities.forEach(entity => {
            if (entity.is("minecraft:pig")) {
                const pig = entity.asAnimal();
                const uuid = pig.getUUID();
                const pos = pig.getPos();
                const isSaddled = pig.isSaddled();
                const distance = player.distanceTo(entity);

                const pigData = {
                    entity: entity,
                    pig: pig,
                    position: pos,
                    isSaddled: isSaddled,
                    distance: distance,
                    health: entity.asLiving ? entity.asLiving().getHealth() : 10
                };

                this.availablePigs.set(uuid, pigData);

                if (isSaddled) {
                    this.rideablePigs.set(uuid, pigData);
                }
            }
        });
    }

    findNearestRideablePig() {
        if (this.rideablePigs.size === 0) return null;

        let nearestPig = null;
        let nearestDistance = Infinity;

        for (const [uuid, pigData] of this.rideablePigs) {
            if (pigData.distance < nearestDistance) {
                nearestDistance = pigData.distance;
                nearestPig = pigData;
            }
        }

        return nearestPig;
    }

    assessPigQuality(pigData) {
        const healthScore = pigData.health >= 15 ? "Excellent" : pigData.health >= 10 ? "Good" : "Fair";
        const distanceScore = pigData.distance <= 5 ? "Very Close" : pigData.distance <= 15 ? "Close" : "Far";

        return {
            healthScore,
            distanceScore,
            overallScore: this.calculateOverallScore(pigData)
        };
    }

    calculateOverallScore(pigData) {
        let score = 100;

        // Distance penalty
        score -= Math.min(pigData.distance * 2, 50);

        // Health bonus
        score += Math.min(pigData.health * 2, 20);

        return Math.max(0, Math.min(100, score));
    }

    generateTransportReport() {
        Chat.log("&6=== Pig Transportation Report ===");
        Chat.log(`Available pigs: ${this.availablePigs.size}`);
        Chat.log(`Rideable (saddled) pigs: ${this.rideablePigs.size}`);
        Chat.log(`Pigs needing saddles: ${this.availablePigs.size - this.rideablePigs.size}`);

        if (this.rideablePigs.size > 0) {
            Chat.log("\n&aRideable Pigs (sorted by quality):");
            const sortedPigs = Array.from(this.rideablePigs.values())
                .sort((a, b) => this.assessPigQuality(b).overallScore - this.assessPigQuality(a).overallScore);

            sortedPigs.slice(0, 5).forEach((pigData, index) => {
                const quality = this.assessPigQuality(pigData);
                Chat.log(`${index + 1}. Health: ${quality.healthScore}, Distance: ${quality.distanceScore}, Score: ${quality.overallScore}/100`);
                Chat.log(`   Location: [${pigData.position.x.toFixed(0)}, ${pigData.position.y.toFixed(0)}, ${pigData.position.z.toFixed(0)}], ${pigData.distance.toFixed(1)}m away`);
            });
        }

        // Check for carrot on a stick
        const player = Player.getPlayer();
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        let hasCarrotStick = false;

        if (mainHand && mainHand.getId() === "minecraft:carrot_on_a_stick") hasCarrotStick = true;
        if (offHand && offHand.getId() === "minecraft:carrot_on_a_stick") hasCarrotStick = true;

        if (!hasCarrotStick && this.rideablePigs.size > 0) {
            Chat.log("\n&cWarning: You need a carrot on a stick to steer saddled pigs!");
        }

        // Saddle availability
        const inventory = Player.getInventory();
        let saddleCount = 0;
        if (inventory) {
            for (let i = 0; i < inventory.getSize(); i++) {
                const item = inventory.getStack(i);
                if (item && item.getId() === "minecraft:saddle") {
                    saddleCount += item.getCount();
                }
            }
        }

        const unsaddledCount = this.availablePigs.size - this.rideablePigs.size;
        if (saddleCount > 0 && unsaddledCount > 0) {
            Chat.log(`\n&eYou can saddle ${Math.min(saddleCount, unsaddledCount)} additional pigs!`);
        }
    }

    highlightBestTransportPigs() {
        // Clear all highlights first
        for (const [uuid, pigData] of this.availablePigs) {
            pigData.entity.resetGlowing();
        }

        if (this.rideablePigs.size === 0) {
            Chat.log("&cNo rideable pigs available to highlight.");
            return;
        }

        // Sort by overall quality score
        const sortedPigs = Array.from(this.rideablePigs.values())
            .sort((a, b) => this.assessPigQuality(b).overallScore - this.assessPigQuality(a).overallScore);

        // Highlight top 3 pigs
        const colors = [0x00FF00, 0xFFD700, 0xFF8C00]; // Gold, Silver, Bronze
        const labels = ["Best", "Good", "Fair"];

        sortedPigs.slice(0, 3).forEach((pigData, index) => {
            pigData.entity.setGlowing(true);
            pigData.entity.setGlowingColor(colors[index]);
            const quality = this.assessPigQuality(pigData);
            Chat.log(`${labels[index]} transport pig: ${quality.healthScore} health, ${quality.distanceScore} distance (${pigData.distance.toFixed(1)}m)`);
        });

        Chat.log("&aHighlighted best transport pigs (green=best, gold=good, orange=fair)");
    }

    findOptimalSaddlingCandidates() {
        const player = Player.getPlayer();
        if (!player) return;

        const inventory = Player.getInventory();
        if (!inventory) return;

        let saddleCount = 0;
        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && item.getId() === "minecraft:saddle") {
                saddleCount += item.getCount();
            }
        }

        if (saddleCount === 0) {
            Chat.log("&cNo saddles available.");
            return;
        }

        const unsaddledPigs = Array.from(this.availablePigs.values()).filter(pig => !pig.isSaddled);
        if (unsaddledPigs.length === 0) {
            Chat.log("&aAll available pigs are already saddled!");
            return;
        }

        // Sort unsaddled pigs by distance and health
        const candidates = unsaddledPigs
            .sort((a, b) => {
                const scoreA = this.calculateOverallScore(a);
                const scoreB = this.calculateOverallScore(b);
                return scoreB - scoreA;
            })
            .slice(0, Math.min(saddleCount, 5));

        Chat.log(`\n&eTop ${candidates.length} saddling candidates:`);
        candidates.forEach((pigData, index) => {
            const quality = this.assessPigQuality(pigData);
            Chat.log(`${index + 1}. Health: ${quality.healthScore}, Distance: ${quality.distanceScore}, Score: ${quality.overallScore}/100`);
            Chat.log(`   Location: [${pigData.position.x.toFixed(0)}, ${pigData.position.y.toFixed(0)}, ${pigData.position.z.toFixed(0)}]`);

            // Highlight candidate
            pigData.entity.setGlowing(true);
            pigData.entity.setGlowingColor(0x00FFFF); // Cyan for saddling candidates
        });

        Chat.log("&aHighlighted best saddling candidates in cyan.");
    }

    createTransportRoute(name, waypoints) {
        this.transportRoutes.push({
            name: name,
            waypoints: waypoints,
            created: Client.getTime()
        });
        Chat.log(`&aTransport route "${name}" created with ${waypoints.length} waypoints.`);
    }

    update() {
        if (Client.getTime() - this.lastUpdate < 20) return; // Update every second

        this.lastUpdate = Client.getTime();
        this.scanTransportPigs();
    }
}

// Initialize pig transport helper
const pigTransport = new PigTransportHelper();

// Update pig tracking every second
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    pigTransport.update();
}));

Chat.log("&aPig Transport Helper ready! Use pigTransport.generateTransportReport() for status.");
```

---

## Method Details

### `pig.isSaddled()`

Returns true if this pig has a saddle equipped, making it rideable by players.

**Returns:**
- `boolean`: true if the pig is saddled, false otherwise

**Example:**
```js
// Check if a pig is saddled and ready for riding
const pig = entity.asAnimal();
if (pig.isSaddled()) {
    Chat.log("This pig is saddled and ready to ride!");
    // Highlight rideable pigs
    pig.setGlowing(true);
    pig.setGlowingColor(0xFFD700); // Gold for saddled pigs
} else {
    Chat.log("This pig needs a saddle before it can be ridden.");
    // Check if player has a saddle to equip
    const mainHand = Player.getPlayer().getMainHand();
    if (mainHand && mainHand.getId() === "minecraft:saddle") {
        Chat.log("Hold right-click on the pig to saddle it!");
    }
}
```

**Notes:**
- Saddled pigs can be ridden by players but require a carrot on a stick to steer
- Pigs can only be saddled by players using a saddle item
- Saddles are consumed when placed on a pig
- Saddled pigs are valuable for transportation in early-game scenarios
- Unlike horses, pigs do not have different speed stats or jump abilities
- Saddled pigs can be used as a fallback when horses are not available

---

## Inherited Methods

From `AnimalEntityHelper`:

### `pig.isFood(item)`
Check if an item can be used to feed and breed this pig.

**Parameters:**
1. `item`: `ItemHelper` or `ItemStackHelper` - The item to check

**Returns:**
- `boolean`: true if the item is pig food, false otherwise

**Pig Food Items:**
- Carrots (`minecraft:carrot`)
- Potatoes (`minecraft:potato`)
- Beetroots (`minecraft:beetroot`)

### `pig.canBreedWith(other)`
Check if this pig can breed with another pig.

**Parameters:**
1. `other`: `AnimalEntityHelper` - The other pig to check compatibility with

**Returns:**
- `boolean`: true if the pigs can breed, false otherwise

**Breeding Requirements:**
- Both pigs must be within breeding range
- Both pigs must not be saddled (saddled pigs cannot breed)
- Both pigs must be in "love mode" (fed breeding food)
- Pigs must be of the same species (pig with pig)

From `MobEntityHelper`:

### `pig.isAttacking()`
Returns true if the pig is currently attacking something (rare for pigs).

### `pig.isAiDisabled()`
Returns true if the pig's AI is disabled.

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Current and maximum health
- `getStatusEffects()` - Active status effects
- `isBaby()` - Check if the pig is a piglet

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getUUID()` - Unique identifier

---

## Notes and Limitations

- PigEntityHelper instances become invalid when the pig entity is removed from the world. Always check `isAlive()` before accessing pig data.
- Saddled pigs cannot be used for breeding - remove the saddle first if you want to breed them.
- Pigs require a carrot on a stick to be steered while riding; without it, they will wander randomly.
- Pigs can only swim in water but cannot breathe underwater and will take damage.
- Pig breeding requires specific food items: carrots, potatoes, or beetroots.
- Unlike horses, pigs have uniform movement speed and cannot be equipped with armor.
- Pig AI is relatively simple compared to other mobs, making them predictable and easy to manage.
- Pigs will follow players holding breeding food items within a certain range.
- When riding a pig, the pig will take fall damage, so be careful when jumping from heights.
- Pigs can be transported in boats and minecarts like other passive mobs.
- The inheritance hierarchy provides access to comprehensive mob functionality including AI states, health monitoring, and basic entity operations.
- Visual effects like `setGlowing()` and `setGlowingColor()` are very useful for tracking and managing pig populations.

## Related Classes

- `AnimalEntityHelper` - Base class for passive animal behaviors and breeding mechanics
- `MobEntityHelper` - Base class for all mobs with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` - Item information and properties for food checking
- `ItemStackHelper` - ItemStack information for inventory-based food checking
- `HorseEntityHelper` - Alternative rideable mount with more advanced features
- `DonkeyEntityHelper`, `MuleEntityHelper` - Other rideable animals with cargo capacity

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft PigEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for pig management, riding systems, and farming automation
- Minimal specific functionality as pigs have simple behaviors in vanilla Minecraft
- Focused on the unique riding mechanic that distinguishes pigs from other farm animals

---

**See Also:**
- [EntityHelper.asAnimal()](#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\LivingEntityHelper.md) - Living entity base class
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal entity base class with breeding functionality