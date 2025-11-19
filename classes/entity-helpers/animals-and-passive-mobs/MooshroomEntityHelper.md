# MooshroomEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.MooshroomEntityHelper`

**Extends:** `AnimalEntityHelper<MooshroomEntity>`

The `MooshroomEntityHelper` class provides specialized access to Mooshroom entities in Minecraft, offering methods for shearing mechanics, variant identification, and mooshroom-specific behaviors. This class extends `AnimalEntityHelper`, inheriting comprehensive functionality for animal breeding, feeding behaviors, and mob management while adding mooshroom-specific features like variant checking and shearing capabilities.

This helper is essential for scripts that manage mooshroom farms, automate mushroom collection, handle mooshroom breeding, or any functionality that requires interaction with Minecraft's unique mooshroom entities that combine cow behaviors with mushroom-related mechanics.

## Constructors

MooshroomEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`, `SheepShear`)
- World entity queries using type filtering for mooshrooms
- Casting from generic EntityHelper instances using `entity.asAnimal()` when the entity type is confirmed as a mooshroom
- Filtering entities with `entity.is("minecraft:mooshroom")`

## Methods

### Mooshroom-Specific Methods

- [mooshroom.isShearable()](#mooshroomisshearable)
- [mooshroom.isRed()](#mooshroomisred)
- [mooshroom.isBrown()](#mooshroomisbrown)

### Inherited Methods

The MooshroomEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()` for breeding mechanics
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()` for mob behaviors
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Mooshroom-Specific Methods

## Usage Examples

### Basic Mooshroom Management System
```js
// Comprehensive mooshroom farm management and monitoring
class MooshroomFarmManager {
    constructor() {
        this.mooshrooms = new Map();
        this.scanRadius = 32;
        this.lastScan = 0;
        this.scanInterval = 20 * 3; // Every 3 seconds
        this.stashedShears = false;
        this.farmBounds = null;
    }

    scanMooshrooms() {
        const entities = World.getEntities(this.scanRadius);
        const mooshrooms = [];
        const player = Player.getPlayer();

        if (!player) return mooshrooms;

        entities.forEach(entity => {
            if (entity.is("minecraft:mooshroom")) {
                const uuid = entity.getUUID();
                const distance = player.distanceTo(entity);
                const mooshroom = entity.asAnimal();

                const mooshroomData = {
                    uuid: uuid,
                    entity: entity,
                    mooshroom: mooshroom,
                    distance: distance,
                    position: entity.getPos(),
                    variant: mooshroom.isRed() ? "red" : mooshroom.isBrown() ? "brown" : "unknown",
                    shearable: mooshroom.isShearable(),
                    health: null,
                    name: entity.getName().getString()
                };

                // Try to get health if it's a living entity
                try {
                    const living = entity.asLiving();
                    if (living) {
                        mooshroomData.health = living.getHealth();
                        mooshroomData.maxHealth = living.getMaxHealth();
                    }
                } catch (e) {
                    // Entity might not be accessible as living entity
                }

                mooshrooms.push(mooshroomData);
                this.mooshrooms.set(uuid, mooshroomData);
            }
        });

        // Clean up mooshrooms that are no longer in range
        const currentUUIDs = new Set(mooshrooms.map(m => m.uuid));
        for (const [uuid, mooshroomData] of this.mooshrooms) {
            if (!currentUUIDs.has(uuid) && (Client.getTime() - mooshroomData.lastSeen > 60000)) {
                this.mooshrooms.delete(uuid);
            }
        }

        return mooshrooms;
    }

    analyzeMooshroomPopulation() {
        const mooshrooms = Array.from(this.mooshrooms.values());

        const analysis = {
            total: mooshrooms.length,
            red: 0,
            brown: 0,
            shearable: 0,
            averageHealth: 0,
            healthyMooshrooms: 0
        };

        let totalHealth = 0;
        let healthCount = 0;

        mooshrooms.forEach(mooshroom => {
            // Count variants
            if (mooshroom.variant === "red") analysis.red++;
            else if (mooshroom.variant === "brown") analysis.brown++;

            // Count shearable mooshrooms
            if (mooshroom.shearable) analysis.shearable++;

            // Health analysis
            if (mooshroom.health !== null) {
                totalHealth += mooshroom.health;
                healthCount++;
                if (mooshroom.health >= mooshroom.maxHealth * 0.8) {
                    analysis.healthyMooshrooms++;
                }
            }
        });

        analysis.averageHealth = healthCount > 0 ? totalHealth / healthCount : 0;

        return analysis;
    }

    highlightShearableMooshrooms() {
        const player = Player.getPlayer();
        if (!player) return;

        const mainHand = player.getMainHand();
        const hasShears = mainHand && mainHand.getId() === "minecraft:shears";

        // Clear previous highlights
        for (const [uuid, mooshroomData] of this.mooshrooms) {
            mooshroomData.entity.resetGlowing();
        }

        let highlightedCount = 0;
        for (const [uuid, mooshroomData] of this.mooshrooms) {
            if (mooshroomData.shearable && hasShears) {
                mooshroomData.entity.setGlowing(true);
                mooshroomData.entity.setGlowingColor(0xFFD700); // Gold for shearable
                highlightedCount++;
            } else if (mooshroomData.shearable && !hasShears) {
                mooshroomData.entity.setGlowing(true);
                mooshroomData.entity.setGlowingColor(0xFF6B6B); // Red for need shears
                highlightedCount++;
            }
        }

        if (highlightedCount > 0) {
            const message = hasShears
                ? `&a${highlightedCount} mooshroom${highlightedCount > 1 ? 's' : ''} ready for shearing!`
                : `&c${highlightedCount} mooshroom${highlightedCount > 1 ? 's' : ''} can be sheared (need shears)`;
            Chat.actionbar(message);
        }
    }

    findVariantBreedingPairs(variant = null) {
        const mooshrooms = Array.from(this.mooshrooms.values());

        // Filter by variant if specified
        const filteredMooshrooms = variant
            ? mooshrooms.filter(m => m.variant === variant)
            : mooshrooms;

        const compatiblePairs = [];
        for (let i = 0; i < filteredMooshrooms.length; i++) {
            for (let j = i + 1; j < filteredMooshrooms.length; j++) {
                if (filteredMooshrooms[i].mooshroom.canBreedWith(filteredMooshrooms[j].mooshroom)) {
                    const distance = filteredMooshrooms[i].position.distanceTo(filteredMooshrooms[j].position);
                    compatiblePairs.push({
                        mooshroom1: filteredMooshrooms[i],
                        mooshroom2: filteredMooshrooms[j],
                        distance: distance,
                        variant: filteredMooshrooms[i].variant
                    });
                }
            }
        }

        return compatiblePairs.sort((a, b) => a.distance - b.distance);
    }

    generateMooshroomReport() {
        const analysis = this.analyzeMooshroomPopulation();
        const breedingPairs = this.findVariantBreedingPairs();

        Chat.log("=== Mooshroom Farm Report ===");

        // Population overview
        Chat.log(`&6Total Mooshrooms: &f${analysis.total}`);
        if (analysis.total > 0) {
            Chat.log(`  &cRed Mooshrooms: &f${analysis.red}`);
            Chat.log(`  &6Brown Mooshrooms: &f${analysis.brown}`);
            Chat.log(`  &aShearable: &f${analysis.shearable}`);

            if (analysis.averageHealth > 0) {
                Chat.log(`  &eAverage Health: &f${analysis.averageHealth.toFixed(1)}/20`);
                Chat.log(`  &2Healthy Mooshrooms: &f${analysis.healthyMooshrooms}`);
            }
        }

        // Breeding opportunities
        if (breedingPairs.length > 0) {
            Chat.log("\n&eBreeding Opportunities:");

            // Group by variant
            const pairsByVariant = new Map();
            breedingPairs.forEach(pair => {
                if (!pairsByVariant.has(pair.variant)) {
                    pairsByVariant.set(pair.variant, []);
                }
                pairsByVariant.get(pair.variant).push(pair);
            });

            for (const [variant, pairs] of pairsByVariant) {
                const variantName = variant.charAt(0).toUpperCase() + variant.slice(1);
                Chat.log(`  ${variantName}: ${pairs.length} compatible pair${pairs.length > 1 ? 's' : ''}`);

                // Show closest pairs
                pairs.slice(0, 2).forEach((pair, index) => {
                    Chat.log(`    Pair ${index + 1}: ${pair.distance.toFixed(1)}m apart`);
                });
            }
        } else if (analysis.total >= 2) {
            Chat.log("\n&7No compatible breeding pairs found (wrong timing or species)");
        }

        // Shearing recommendations
        if (analysis.shearable > 0) {
            Chat.log(`\n&eShearing Opportunities: &a${analysis.shearable} mooshroom${analysis.shearable > 1 ? 's' : ''} ready!`);

            // Check if player has shears
            const player = Player.getPlayer();
            if (player) {
                const mainHand = player.getMainHand();
                const hasShears = mainHand && mainHand.getId() === "minecraft:shears";

                if (!hasShears) {
                    // Check inventory for shears
                    const inventory = Player.getInventory();
                    let hasShearsInInv = false;

                    if (inventory) {
                        for (let i = 0; i < inventory.getSize(); i++) {
                            const item = inventory.getStack(i);
                            if (item && item.getId() === "minecraft:shears") {
                                hasShearsInInv = true;
                                break;
                            }
                        }
                    }

                    if (!hasShearsInInv) {
                        Chat.log("  &cNo shears found! You need shears to harvest mushrooms.");
                    } else {
                        Chat.log("  &eHold shears in main hand to highlight shearable mooshrooms");
                    }
                }
            }
        }

        // Variant balance recommendations
        if (analysis.total > 4) {
            const redRatio = analysis.red / analysis.total;
            const brownRatio = analysis.brown / analysis.total;

            Chat.log("\n&eVariant Balance:");
            if (Math.abs(redRatio - brownRatio) > 0.3) {
                Chat.log("  &6Consider breeding for better variant balance");
                if (redRatio > brownRatio) {
                    Chat.log("    More brown mooshrooms recommended");
                } else {
                    Chat.log("    More red mooshrooms recommended");
                }
            } else {
                Chat.log("  &aGood variant balance maintained!");
            }
        }
    }

    setupFarmBounds() {
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getPos();
        this.farmBounds = {
            minX: playerPos.x - 16,
            maxX: playerPos.x + 16,
            minZ: playerPos.z - 16,
            maxZ: playerPos.z + 16,
            minY: Math.max(0, playerPos.y - 5),
            maxY: Math.min(255, playerPos.y + 5)
        };

        Chat.log("&aMooshroom farm bounds set around current location");
        Chat.log(`&7Area: ${(this.farmBounds.maxX - this.farmBounds.minX) * (this.farmBounds.maxZ - this.farmBounds.minZ)} blocks`);
    }

    isWithinFarmBounds(position) {
        if (!this.farmBounds) return true;

        return position.x >= this.farmBounds.minX && position.x <= this.farmBounds.maxX &&
               position.y >= this.farmBounds.minY && position.y <= this.farmBounds.maxY &&
               position.z >= this.farmBounds.minZ && position.z <= this.farmBounds.maxZ;
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        this.scanMooshrooms();
        this.highlightShearableMooshrooms();
    }
}

// Initialize mooshroom farm manager
const mooshroomManager = new MooshroomFarmManager();

// Set up event listeners
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    mooshroomManager.update();
}));

// Command integration - generate report
events.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    if (event.getMessage().getString().toLowerCase().includes("!mooshrooms")) {
        mooshroomManager.generateMooshroomReport();
    }
}));

// Entity interaction monitoring
events.on("EntityInteract", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:mooshroom")) {
        const mooshroom = entity.asAnimal();
        const variant = mooshroom.isRed() ? "Red" : mooshroom.isBrown() ? "Brown" : "Unknown";
        Chat.log(`&eInteracted with ${variant} Mooshroom (Shearable: ${mooshroom.isShearable()})`);
    }
}));

// Shearing event monitoring
events.on("SheepShear", JavaWrapper.methodToJavaAsync((event) => {
    // Note: This event may trigger for mooshroom shearing depending on Minecraft version
    const entity = event.getEntity();
    if (entity.is("minecraft:mooshroom")) {
        Chat.log("&aMooshroom sheared! Check for dropped mushrooms.");
        // The mooshroom will transform into a regular cow after shearing
    }
}));

Chat.log("&aMooshroom Farm Manager activated!");
Chat.log("&7Monitoring mooshrooms, variants, and shearing opportunities...");
Chat.log("&7Use '!mooshrooms' in chat to generate a farm report");
```

### Advanced Mooshroom Processing System
```js
// Sophisticated mooshroom processing and automation
class MooshroomProcessor {
    constructor() {
        this.processingQueue = [];
        this.isProcessing = false;
        this.processorDelay = 20; // 1 second between actions
        this.requiredItems = new Map();
        this.productivity = {
            mushrooms: 0,
            cowsConverted: 0,
            breedingSuccess: 0
        };
        this.initializeRequirements();
    }

    initializeRequirements() {
        this.requiredItems.set("minecraft:shears", "Shearing mooshrooms");
        this.requiredItems.set("minecraft:wheat", "Breeding mooshrooms");
        this.requiredItems.set("minecraft:bowl", "Collecting mushroom stew (if needed)");
    }

    scanForProcessing() {
        const entities = World.getEntities(16);
        const player = Player.getPlayer();
        if (!player) return [];

        const candidates = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:mooshroom")) {
                const distance = player.distanceTo(entity);
                if (distance <= 8) { // Within interaction range
                    const mooshroom = entity.asAnimal();

                    candidates.push({
                        entity: entity,
                        mooshroom: mooshroom,
                        distance: distance,
                        priority: this.calculateProcessingPriority(mooshroom, distance),
                        action: this.determineBestAction(mooshroom)
                    });
                }
            }
        });

        return candidates.sort((a, b) => b.priority - a.priority);
    }

    calculateProcessingPriority(mooshroom, distance) {
        let priority = 100;

        // Distance penalty (closer is better)
        priority -= distance * 5;

        // Shearable mooshrooms get high priority
        if (mooshroom.isShearable()) {
            priority += 50;
        }

        // Variant-specific priorities (red mooshrooms are slightly more valuable)
        if (mooshroom.isRed()) {
            priority += 10;
        }

        return Math.max(0, priority);
    }

    determineBestAction(mooshroom) {
        const player = Player.getPlayer();
        if (!player) return null;

        const mainHand = player.getMainHand();

        // Shearing takes priority if mooshroom is shearable and player has shears
        if (mooshroom.isShearable() && mainHand && mainHand.getId() === "minecraft:shears") {
            return "shear";
        }

        // Breeding if player has food and mooshroom can eat it
        if (mainHand && mooshroom.isFood(mainHand)) {
            return "feed";
        }

        return null;
    }

    async processMooshrooms() {
        if (this.isProcessing) return;

        this.isProcessing = true;
        const candidates = this.scanForProcessing();

        for (const candidate of candidates) {
            if (!candidate.action) continue;

            try {
                await this.executeAction(candidate);
                await this.sleep(this.processorDelay);
            } catch (error) {
                Chat.log(`&cError processing mooshroom: ${error.message}`);
            }
        }

        this.isProcessing = false;
    }

    async executeAction(candidate) {
        const { entity, mooshroom, action } = candidate;
        const player = Player.getPlayer();
        if (!player) return;

        switch (action) {
            case "shear":
                await this.shearMooshroom(entity, mooshroom);
                break;
            case "feed":
                await this.feedMooshroom(entity, mooshroom);
                break;
        }
    }

    async shearMooshroom(entity, mooshroom) {
        const player = Player.getPlayer();
        if (!player) return;

        // Look at the mooshroom
        player.lookAt(entity.getPos());
        await this.sleep(5);

        // Interact (shear)
        player.interact(entity);

        const variant = mooshroom.isRed() ? "Red" : "Brown";
        Chat.log(`&aSheared ${variant} Mooshroom - Check for mushrooms!`);

        this.productivity.mushrooms += 5; // Approximate drop
        this.productivity.cowsConverted++;
    }

    async feedMooshroom(entity, mooshroom) {
        const player = Player.getPlayer();
        if (!player) return;

        // Look at the mooshroom
        player.lookAt(entity.getPos());
        await this.sleep(5);

        // Interact (feed)
        player.interact(entity);

        const variant = mooshroom.isRed() ? "Red" : "Brown";
        Chat.log(`&eFed ${variant} Mooshroom`);
    }

    analyzeInventory() {
        const player = Player.getPlayer();
        if (!player) return;

        const inventory = Player.getInventory();
        if (!inventory) return;

        const itemCounts = new Map();

        // Check all inventory slots
        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && item.getId()) {
                const itemId = item.getId();
                if (this.requiredItems.has(itemId)) {
                    itemCounts.set(itemId, (itemCounts.get(itemId) || 0) + item.getCount());
                }
            }
        }

        return itemCounts;
    }

    checkInventoryStatus() {
        const itemCounts = this.analyzeInventory();
        const missingItems = [];

        for (const [itemId, purpose] of this.requiredItems) {
            const count = itemCounts.get(itemId) || 0;
            if (count === 0) {
                missingItems.push(`${itemId.replace("minecraft:", "")} (${purpose})`);
            }
        }

        if (missingItems.length > 0) {
            Chat.log(`&cMissing required items: ${missingItems.join(", ")}`);
            return false;
        }

        return true;
    }

    generateProcessingReport() {
        Chat.log("=== Mooshroom Processing Report ===");

        // Productivity summary
        Chat.log(`&6Productivity Summary:`);
        Chat.log(`  Mushrooms harvested: &f${this.productivity.mushrooms}`);
        Chat.log(`  Mooshrooms converted: &f${this.productivity.cowsConverted}`);
        Chat.log(`  Breeding attempts: &f${this.productivity.breedingSuccess}`);

        // Inventory status
        const itemCounts = this.analyzeInventory();
        Chat.log("\n&6Inventory Status:");

        if (itemCounts.size > 0) {
            for (const [itemId, count] of itemCounts) {
                const itemName = itemId.replace("minecraft:", "").replace("_", " ");
                const purpose = this.requiredItems.get(itemId) || "Unknown purpose";
                Chat.log(`  ${itemName}: ${count} (${purpose})`);
            }
        } else {
            Chat.log("  &cNo processing items found!");
        }

        // Processing queue status
        Chat.log(`\n&6Processing Status:`);
        Chat.log(`  Currently processing: &f${this.isProcessing ? "Yes" : "No"}`);
        Chat.log(`  Queue size: &f${this.processingQueue.length}`);

        // Recommendations
        Chat.log("\n&eRecommendations:");

        if (this.productivity.cowsConverted > 10) {
            Chat.log("  Consider starting a new mooshroom breeding program");
        }

        if (!this.checkInventoryStatus()) {
            Chat.log("  Gather required processing items before continuing");
        }

        const shears = itemCounts.get("minecraft:shears") || 0;
        if (shears === 0) {
            Chat.log("  Craft shears to enable mooshroom processing");
        } else if (shears > 1) {
            Chat.log("  Consider sharing extra shears with other players");
        }
    }

    sleep(ms) {
        return new Promise(resolve => {
            const start = Client.getTime();
            const checkTime = () => {
                if (Client.getTime() - start >= ms / 50) { // Convert to ticks
                    resolve();
                } else {
                    setTimeout(checkTime, 50);
                }
            };
            checkTime();
        });
    }

    startAutoProcessing() {
        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            if (Client.getTime() % (20 * 2) === 0) { // Every 2 seconds
                this.processMooshrooms();
            }
        }));

        Chat.log("&aAuto-processing started - Will process nearby mooshrooms every 2 seconds");
    }
}

// Initialize the processor
const processor = new MooshroomProcessor();

// Start auto-processing
processor.startAutoProcessing();

// Report generation every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        processor.generateProcessingReport();
    }
}));

Chat.log("&aMooshroom Processor activated!");
Chat.log("&7Will automatically process nearby mooshrooms for shearing and feeding");
```

### Mooshroom Variant Breeding System
```js
// Specialized breeding system for managing mooshroom variants
class MooshroomVariantBreeder {
    constructor() {
        this.breedingPairs = new Map();
        this.targetRatios = { red: 0.5, brown: 0.5 };
        this.currentPopulation = { red: 0, brown: 0, total: 0 };
        this.breedingHistory = [];
        this.maxHistorySize = 100;
    }

    scanPopulation() {
        const entities = World.getEntities(32);
        this.currentPopulation = { red: 0, brown: 0, total: 0 };

        entities.forEach(entity => {
            if (entity.is("minecraft:mooshroom")) {
                const mooshroom = entity.asAnimal();

                if (mooshroom.isRed()) {
                    this.currentPopulation.red++;
                } else if (mooshroom.isBrown()) {
                    this.currentPopulation.brown++;
                }

                this.currentPopulation.total++;
            }
        });

        return this.currentPopulation;
    }

    calculateVariantRatios() {
        if (this.currentPopulation.total === 0) {
            return { red: 0, brown: 0 };
        }

        return {
            red: this.currentPopulation.red / this.currentPopulation.total,
            brown: this.currentPopulation.brown / this.currentPopulation.total
        };
    }

    determineBreedingStrategy() {
        const currentRatios = this.calculateVariantRatios();
        const strategy = {
            priorityVariant: null,
            reasoning: "",
            targetPairs: []
        };

        // Calculate deficits
        const redDeficit = this.targetRatios.red - currentRatios.red;
        const brownDeficit = this.targetRatios.brown - currentRatios.brown;

        if (Math.abs(redDeficit) < 0.1 && Math.abs(brownDeficit) < 0.1) {
            strategy.reasoning = "Variant balance is optimal - maintain current population";
            strategy.priorityVariant = "balanced";
        } else if (redDeficit > brownDeficit) {
            strategy.priorityVariant = "red";
            strategy.reasoning = `Need more red mooshrooms (${(redDeficit * 100).toFixed(1)}% deficit)`;
        } else {
            strategy.priorityVariant = "brown";
            strategy.reasoning = `Need more brown mooshrooms (${(brownDeficit * 100).toFixed(1)}% deficit)`;
        }

        return strategy;
    }

    findOptimalBreedingPairs(targetVariant = null) {
        const entities = World.getEntities(32);
        const mooshrooms = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:mooshroom")) {
                const mooshroom = entity.asAnimal();
                const variant = mooshroom.isRed() ? "red" : "brown";

                mooshrooms.push({
                    entity: entity,
                    mooshroom: mooshroom,
                    variant: variant,
                    position: entity.getPos(),
                    uuid: entity.getUUID()
                });
            }
        });

        const optimalPairs = [];

        // Filter by target variant if specified
        const candidates = targetVariant
            ? mooshrooms.filter(m => m.variant === targetVariant)
            : mooshrooms;

        for (let i = 0; i < candidates.length; i++) {
            for (let j = i + 1; j < candidates.length; j++) {
                const pair = {
                    mooshroom1: candidates[i],
                    mooshroom2: candidates[j],
                    distance: candidates[i].position.distanceTo(candidates[j].position),
                    compatibility: candidates[i].mooshroom.canBreedWith(candidates[j].mooshroom)
                };

                if (pair.compatibility) {
                    optimalPairs.push(pair);
                }
            }
        }

        return optimalPairs.sort((a, b) => a.distance - b.distance);
    }

    recordBreedingAttempt(parent1Variant, parent2Variant, success) {
        const record = {
            timestamp: Client.getTime(),
            parents: {
                variant1: parent1Variant,
                variant2: parent2Variant
            },
            success: success,
            offspringVariant: null // Would need to be determined later
        };

        this.breedingHistory.push(record);

        // Limit history size
        if (this.breedingHistory.length > this.maxHistorySize) {
            this.breedingHistory.shift();
        }
    }

    analyzeBreedingHistory() {
        if (this.breedingHistory.length === 0) {
            return {
                successRate: 0,
                totalAttempts: 0,
                variantDistribution: {},
                trends: "No breeding history available"
            };
        }

        const successfulBreedings = this.breedingHistory.filter(r => r.success);
        const successRate = (successfulBreedings.length / this.breedingHistory.length) * 100;

        // Analyze variant combinations
        const variantCombinations = new Map();
        successfulBreedings.forEach(record => {
            const combination = `${record.parents.variant1}+${record.parents.variant2}`;
            variantCombinations.set(combination, (variantCombinations.get(combination) || 0) + 1);
        });

        // Analyze trends
        let trends = "";
        if (this.breedingHistory.length >= 10) {
            const recentSuccess = this.breedingHistory.slice(-5).filter(r => r.success).length;
            const olderSuccess = this.breedingHistory.slice(-10, -5).filter(r => r.success).length;

            if (recentSuccess > olderSuccess) {
                trends = "Breeding success rate is improving";
            } else if (recentSuccess < olderSuccess) {
                trends = "Breeding success rate is declining - check conditions";
            } else {
                trends = "Breeding success rate is stable";
            }
        }

        return {
            successRate: successRate,
            totalAttempts: this.breedingHistory.length,
            variantDistribution: Object.fromEntries(variantCombinations),
            trends: trends
        };
    }

    generateBreedingReport() {
        const population = this.scanPopulation();
        const strategy = this.determineBreedingStrategy();
        const pairs = this.findOptimalBreedingPairs(strategy.priorityVariant === "balanced" ? null : strategy.priorityVariant);
        const history = this.analyzeBreedingHistory();

        Chat.log("=== Mooshroom Variant Breeding Report ===");

        // Population overview
        Chat.log(`&6Population Overview:`);
        Chat.log(`  Total Mooshrooms: &f${population.total}`);
        Chat.log(`  Red Mooshrooms: &c${population.red}&7 (${((population.red / population.total) * 100).toFixed(1)}%)`);
        Chat.log(`  Brown Mooshrooms: &6${population.brown}&7 (${((population.brown / population.total) * 100).toFixed(1)}%)`);

        // Current ratios vs targets
        const currentRatios = this.calculateVariantRatios();
        Chat.log(`\n&6Variant Ratios (Current vs Target):`);
        Chat.log(`  Red: &c${(currentRatios.red * 100).toFixed(1)}%&7 vs &a${(this.targetRatios.red * 100).toFixed(1)}%`);
        Chat.log(`  Brown: &6${(currentRatios.brown * 100).toFixed(1)}%&7 vs &a${(this.targetRatios.brown * 100).toFixed(1)}%`);

        // Breeding strategy
        Chat.log(`\n&eCurrent Breeding Strategy:`);
        Chat.log(`  Priority: &f${strategy.priorityVariant === "balanced" ? "Maintain balance" : strategy.priorityVariant + " mooshrooms"}`);
        Chat.log(`  Reasoning: &7${strategy.reasoning}`);

        // Available breeding pairs
        Chat.log(`\n&eAvailable Breeding Pairs:`);
        if (pairs.length > 0) {
            Chat.log(`  Total compatible pairs: &f${pairs.length}`);

            // Show top 3 closest pairs
            pairs.slice(0, 3).forEach((pair, index) => {
                const variant1 = pair.mooshroom1.variant.charAt(0).toUpperCase() + pair.mooshroom1.variant.slice(1);
                const variant2 = pair.mooshroom2.variant.charAt(0).toUpperCase() + pair.mooshroom2.variant.slice(1);
                Chat.log(`  ${index + 1}. ${variant1} + ${variant2}: ${pair.distance.toFixed(1)}m apart`);
            });
        } else {
            Chat.log("  &cNo compatible breeding pairs found");
        }

        // Breeding history analysis
        Chat.log(`\n&6Breeding Performance:`);
        if (history.totalAttempts > 0) {
            Chat.log(`  Success Rate: &f${history.successRate.toFixed(1)}%&7 (${history.totalAttempts} attempts)`);
            Chat.log(`  Trends: &7${history.trends}`);

            if (Object.keys(history.variantDistribution).length > 0) {
                Chat.log("  Successful Combinations:");
                for (const [combination, count] of Object.entries(history.variantDistribution)) {
                    Chat.log(`    ${combination}: ${count}`);
                }
            }
        } else {
            Chat.log("  &7No breeding history available yet");
        }

        // Recommendations
        Chat.log("\n&eBreeding Recommendations:");

        if (population.total < 4) {
            Chat.log("  • &cPopulation too low for effective breeding - find more mooshrooms");
        } else if (pairs.length === 0) {
            Chat.log("  • &7Wait for breeding cooldown or use more breeding food");
        } else {
            Chat.log(`  • &a${pairs.length} breeding pair${pairs.length > 1 ? 's' : ''} available`);

            if (strategy.priorityVariant !== "balanced") {
                Chat.log(`  • &7Focus on breeding ${strategy.priorityVariant} mooshrooms`);
            }
        }

        // Check for breeding food
        const player = Player.getPlayer();
        if (player) {
            const mainHand = player.getMainHand();
            if (mainHand) {
                const foodCount = this.countBreedingFood();
                if (foodCount === 0) {
                    Chat.log("  • &cNo breeding food found - mooshrooms eat wheat");
                } else {
                    Chat.log(`  • &a${foodCount} breeding food items available`);
                }
            }
        }
    }

    countBreedingFood() {
        const inventory = Player.getInventory();
        if (!inventory) return 0;

        let foodCount = 0;
        const breedingFoods = ["minecraft:wheat"];

        for (let i = 0; i < inventory.getSize(); i++) {
            const item = inventory.getStack(i);
            if (item && breedingFoods.includes(item.getId())) {
                foodCount += item.getCount();
            }
        }

        return foodCount;
    }

    setTargetVariantRatio(redRatio, brownRatio) {
        if (redRatio + brownRatio !== 1) {
            Chat.log("&cError: Ratios must sum to 1.0");
            return false;
        }

        this.targetRatios.red = redRatio;
        this.targetRatios.brown = brownRatio;

        Chat.log(`&aTarget ratios updated - Red: ${(redRatio * 100).toFixed(0)}%, Brown: ${(brownRatio * 100).toFixed(0)}%`);
        return true;
    }
}

// Initialize the variant breeder
const variantBreeder = new MooshroomVariantBreeder();

// Generate breeding report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 120) === 0) {
        variantBreeder.generateBreedingReport();
    }
}));

Chat.log("&aMooshroom Variant Breeder activated!");
Chat.log("&7Monitoring mooshroom population and variant ratios...");

// Example usage:
// variantBreeder.setTargetVariantRatio(0.6, 0.4); // 60% red, 40% brown
// variantBreeder.generateBreedingReport();
```

## Notes and Limitations

- MooshroomEntityHelper instances become invalid when the mooshroom entity is removed from the world. Always check `isAlive()` before accessing mooshroom data.
- `isShearable()` returns true only when the mooshroom is ready to be sheared and will drop 5 mushrooms of the corresponding variant color.
- When a mooshroom is sheared, it transforms into a regular cow entity. The original MooshroomEntityHelper instance will become invalid after shearing.
- `isRed()` and `isBrown()` methods identify the mooshroom variant, which affects the color of mushrooms dropped when sheared.
- Mooshroom breeding follows the same mechanics as regular cows (wheat as breeding food), but offspring inherit the mooshroom trait.
- Variant breeding produces a 50/50 chance of either red or brown mooshrooms when breeding different variants together.
- Mooshrooms only spawn naturally in mushroom fields biomes, making breeding essential for farm sustainability.
- Shearing mooshrooms provides a renewable source of mushrooms, but remember you lose the mooshroom in the process.
- Mooshrooms behave identically to cows for all other purposes (milk, leather drops, movement patterns).
- Distance calculations and compatibility checks are important for efficient breeding automation systems.
- Mooshroom shearing requires shears in hand and proper positioning within interaction range.
- The inheritance hierarchy provides access to comprehensive animal functionality including breeding mechanics and mob behaviors.

## Related Classes

- `AnimalEntityHelper` - Base class for animal entities with breeding and feeding functionality
- `MobEntityHelper` - Mob entity base class with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` - Item information for identifying breeding food and tools
- `ItemStackHelper` - ItemStack information for inventory-based food checking

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft MooshroomEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for mooshroom farming, variant management, and mushroom harvesting systems

---

**See Also:**
- [EntityHelper.asAnimal()](#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal entity base class
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\LivingEntityHelper.md) - Living entity functionality
- [MobEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\entity-helpers\MobEntityHelper.md) - Mob entity functionality