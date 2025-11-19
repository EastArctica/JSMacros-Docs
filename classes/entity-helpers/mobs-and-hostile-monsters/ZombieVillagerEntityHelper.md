# ZombieVillagerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.ZombieVillagerEntityHelper`

**Extends:** `ZombieEntityHelper<ZombieVillagerEntity>`

**Since:** JsMacros 1.8.4

The `ZombieVillagerEntityHelper` class is a specialized wrapper for zombie villager entities in JSMacros, providing access to zombie villager-specific properties and behaviors. This class extends `ZombieEntityHelper` and inherits all zombie methods while adding zombie villager-specific functionality for tracking conversion status, villager biome type, original profession, and level.

Zombie villagers are unique hostile mobs that are infected villagers. They can be converted back to regular villagers using weakness and golden apples, and they retain memories of their original villager identity including their biome type, profession, and trade level. This makes them valuable targets for conversion operations and villager trading setups.

## Table of Contents

- [Constructors](#constructors)
- [Zombie Villager-Specific Methods](#zombie-villager-specific-methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

## Constructors

ZombieVillagerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events where the entity is a zombie villager
- World entity queries that return zombie villager entities
- Type casting from EntityHelper or ZombieEntityHelper using zombie villager type checks

```js
// Getting ZombieVillagerEntityHelper from events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:zombie_villager")) {
        const zombieVillager = entity; // Already typed as ZombieVillagerEntityHelper
        const profession = zombieVillager.getProfession();
        Chat.log(`Zombie villager spawned! Profession: ${profession}`);
    }
}));

// Type casting from EntityHelper
const entity = event.getEntity();
if (entity.is("minecraft:zombie_villager")) {
    const zombieVillager = entity; // Will be ZombieVillagerEntityHelper
    const biomeType = zombieVillager.getVillagerBiomeType();
    const isConverting = zombieVillager.isConvertingToVillager();
    Chat.log(`Zombie villager from ${biomeType} biome, Converting: ${isConverting}`);
}
```

---

## Zombie Villager-Specific Methods

## Inherited Methods

From `ZombieEntityHelper`:

### Zombie-Specific
- `zombieVillager.isConvertingToDrowned()` - Check if converting to drowned (in water)

From `MobEntityHelper`:

### Combat and AI
- `zombieVillager.isAttacking()` - Check if the zombie villager is currently attacking
- `zombieVillager.isAiDisabled()` - Check if the zombie villager's AI is disabled

From `LivingEntityHelper`:

### Health and Status
- `zombieVillager.getHealth()` - Current health
- `zombieVillager.getMaxHealth()` - Maximum health
- `zombieVillager.getAbsorptionHealth()` - Absorption hearts
- `zombieVillager.getArmor()` - Current armor value
- `zombieVillager.getStatusEffects()` - List of active status effects
- `zombieVillager.hasStatusEffect(id)` - Check for specific status effect

### Movement and State
- `zombieVillager.isOnGround()` - Check if on ground
- `zombieVillager.canBreatheInWater()` - Check if can breathe underwater
- `zombieVillager.isFallFlying()` - Check if elytra is deployed
- `zombieVillager.isBaby()` - Check if is baby variant

### Combat and Interaction
- `zombieVillager.isHolding(item)` - Check if holding specific item
- `zombieVillager.canSeeEntity(entity)` - Check if has line of sight to entity
- `zombieVillager.getBowPullProgress()` - Get bow pull progress
- `zombieVillager.getItemUseTimeLeft()` - Get item use time remaining

From `EntityHelper`:
- All position, movement, entity information, raytracing, and utility methods
- Distance calculations, type checking, NBT access, etc.

---

## Usage Examples

### Zombie Villager Farm Manager
```js
// Complete zombie villager conversion farm management system
class ZombieVillagerFarm {
    constructor() {
        this.farmBounds = null;
        this.conversionQueue = [];
        this.activeConversions = new Map();
        this.statistics = {
            totalFound: 0,
            successfullyConverted: 0,
            highValueConverted: 0,
            failedConversions: 0,
            biomeCollection: new Set(),
            professionCollection: new Set(),
            averageLevel: 0
        };
    }

    setupFarm(centerX, centerZ, radius) {
        this.farmBounds = {
            centerX: centerX,
            centerZ: centerZ,
            radius: radius,
            minX: centerX - radius,
            maxX: centerX + radius,
            minZ: centerZ - radius,
            maxZ: centerZ + radius
        };

        Chat.log(`&a&l🏭 ZOMBIE VILLAGER FARM SETUP COMPLETE!`);
        Chat.log(`&aCenter: ${centerX}, ${centerZ} | Radius: ${radius}m`);
        Chat.log(`&aBounds: ${this.farmBounds.minX},${this.farmBounds.minZ} to ${this.farmBounds.maxX},${this.farmBounds.maxZ}`);

        this.createFarmVisualization();
    }

    createFarmVisualization() {
        if (!this.farmBounds) return;

        const draw3D = Hud.createDraw3D();
        const y = 64; // Visualize at ground level

        // Create boundary markers
        const boundary = draw3D.box()
            .pos(this.farmBounds.minX, y - 1, this.farmBounds.minZ,
                 this.farmBounds.maxX + 1, y + 3, this.farmBounds.maxZ + 1)
            .color(0xFFD700, 128) // Gold boundary
            .fillColor(0xFFD700, 16)
            .fill(false) // Just outline
            .cull(false)
            .build();

        Chat.log("&6Golden boundary markers created around farm area");
    }

    scanFarmForZombieVillagers() {
        if (!this.farmBounds) {
            Chat.log("&cFarm not set up! Use setupFarm() first.");
            return [];
        }

        const entities = World.getEntities();
        const foundZombieVillagers = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:zombie_villager")) {
                const pos = entity.getPos();

                // Check if entity is within farm bounds
                if (pos.x >= this.farmBounds.minX && pos.x <= this.farmBounds.maxX &&
                    pos.z >= this.farmBounds.minZ && pos.z <= this.farmBounds.maxZ) {

                    const assessment = this.assessZombieVillager(entity);
                    foundZombieVillagers.push(assessment);
                }
            }
        });

        this.statistics.totalFound += foundZombieVillagers.length;
        return foundZombieVillagers;
    }

    assessZombieVillager(zombieVillager) {
        const assessment = {
            entity: zombieVillager,
            profession: zombieVillager.getProfession(),
            level: zombieVillager.getLevel(),
            biomeType: zombieVillager.getVillagerBiomeType(),
            isConverting: zombieVillager.isConvertingToVillager(),
            position: zombieVillager.getPos(),
            health: zombieVillager.getHealth(),
            maxHealth: zombieVillager.getMaxHealth(),
            isBaby: zombieVillager.isBaby(),
            uuid: zombieVillager.getUUID()
        };

        // Calculate conversion value
        assessment.valueScore = this.calculateConversionValue(assessment);
        assessment.priority = this.determinePriority(assessment);
        assessment.conversionPlan = this.createConversionPlan(assessment);

        return assessment;
    }

    calculateConversionValue(assessment) {
        let score = 0;

        // Level value (1-5 points per level)
        score += assessment.level * 20;

        // Profession value
        const professionValues = {
            "librarian": 100, "cleric": 80, "armorer": 60, "tool_smith": 55,
            "weapon_smith": 50, "farmer": 45, "butcher": 40, "cartographer": 35,
            "mason": 30, "leatherworker": 25, "shepherd": 20, "nitwit": 0
        };
        score += professionValues[assessment.profession] || 10;

        // Biome rarity bonus
        const rareBiomes = ["snowy", "jungle", "desert"];
        if (rareBiomes.includes(assessment.biomeType)) {
            score += 25;
        }

        // Health bonus (healthy villagers convert better)
        if (assessment.health >= assessment.maxHealth * 0.8) {
            score += 10;
        }

        return score;
    }

    determinePriority(assessment) {
        if (assessment.isConverting) return "PROTECT";
        if (assessment.valueScore >= 120) return "IMMEDIATE";
        if (assessment.valueScore >= 80) return "HIGH";
        if (assessment.valueScore >= 50) return "MEDIUM";
        return "LOW";
    }

    createConversionPlan(assessment) {
        return {
            weaknessNeeded: 1,
            goldenApplesNeeded: 1,
            protectionTime: "3-5 minutes",
            difficulty: assessment.level >= 4 ? "Hard" : assessment.level >= 2 ? "Medium" : "Easy",
            riskLevel: this.calculateRiskLevel(assessment),
            expectedYield: assessment.valueScore
        };
    }

    calculateRiskLevel(assessment) {
        let risk = 0;

        // Location risk
        const player = Player.getPlayer();
        if (player) {
            const distanceToPlayer = player.distanceTo(assessment.entity);
            if (distanceToPlayer < 20) risk += 3;
            else if (distanceToPlayer < 50) risk += 2;
            else risk += 1;
        }

        // Health risk
        if (assessment.health < assessment.maxHealth * 0.5) risk += 2;

        // Night time risk
        const worldTime = World.getTime() % 24000;
        if (worldTime > 12000 || worldTime < 1000) risk += 2;

        return risk <= 3 ? "Low" : risk <= 6 ? "Medium" : "High";
    }

    runFarmCycle() {
        if (!this.farmBounds) return;

        const zombieVillagers = this.scanFarmForZombieVillagers();

        if (zombieVillagers.length > 0) {
            this.processZombieVillagers(zombieVillagers);
        }

        this.updateStatistics();
        this.displayFarmStatus();
    }

    processZombieVillagers(zombieVillagers) {
        Chat.log(`\n&6Processing ${zombieVillagers.length} zombie villagers in farm...`);

        // Sort by priority
        zombieVillagers.sort((a, b) => b.valueScore - a.valueScore);

        let immediateConversions = 0;
        let activeConversions = 0;
        let protectionTargets = 0;

        zombieVillagers.forEach(zv => {
            switch (zv.priority) {
                case "IMMEDIATE":
                    this.initiateConversion(zv);
                    immediateConversions++;
                    break;
                case "HIGH":
                    if (!this.isBusyWithConversion()) {
                        this.initiateConversion(zv);
                        immediateConversions++;
                    }
                    break;
                case "PROTECT":
                    this.protectConversion(zv);
                    protectionTargets++;
                    break;
                case "MEDIUM":
                case "LOW":
                    this.queueForConversion(zv);
                    break;
            }

            // Update statistics
            this.statistics.biomeCollection.add(zv.biomeType);
            this.statistics.professionCollection.add(zv.profession);
        });

        Chat.log(`&6Immediate conversions: ${immediateConversions} | Active protections: ${protectionTargets}`);
    }

    initiateConversion(assessment) {
        Chat.log(`&a&l⚡ INITIATING CONVERSION: ${assessment.profession} (Level ${assessment.level})`);
        Chat.log(`&aBiome: ${assessment.biomeType} | Value: ${assessment.valueScore} points`);
        Chat.log(`&aConversion Plan: ${JSON.stringify(assessment.conversionPlan)}`);

        // Start conversion monitoring
        this.activeConversions.set(assessment.uuid, {
            assessment: assessment,
            startTime: Client.getTime(),
            expectedCompletion: Client.getTime() + (3 * 60 * 20), // 3 minutes
            protectionActive: true
        });

        // Highlight the target
        assessment.entity.setGlowing(true);
        assessment.entity.setGlowingColor(0x00FF00); // Green for active conversion
    }

    protectConversion(assessment) {
        Chat.log(`&6🛡️ PROTECTING ACTIVE CONVERSION: ${assessment.profession}`);

        if (!this.activeConversions.has(assessment.uuid)) {
            this.activeConversions.set(assessment.uuid, {
                assessment: assessment,
                startTime: Client.getTime(),
                expectedCompletion: Client.getTime() + (3 * 60 * 20),
                protectionActive: true
            });
        }

        // Keep the glowing effect active
        assessment.entity.setGlowing(true);
        assessment.entity.setGlowingColor(0xFFFF00); // Yellow for protection
    }

    queueForConversion(assessment) {
        this.conversionQueue.push(assessment);
        Chat.log(`&e📋 QUEUED: ${assessment.profession} (Level ${assessment.level}) - ${assessment.valueScore} points`);
    }

    isBusyWithConversion() {
        const activeConversions = Array.from(this.activeConversions.values())
            .filter(conv => conv.protectionActive).length;
        return activeConversions >= 3; // Limit to 3 simultaneous conversions
    }

    updateConversions() {
        const currentTime = Client.getTime();
        const toRemove = [];

        for (const [uuid, conversion] of this.activeConversions) {
            const timeRemaining = conversion.expectedCompletion - currentTime;

            // Check conversion status
            if (conversion.assessment.entity.isAlive()) {
                const stillConverting = conversion.assessment.entity.isConvertingToVillager();

                if (stillConverting) {
                    // Still converting - update progress
                    const progress = 1 - (timeRemaining / (3 * 60 * 20));
                    const percentComplete = Math.floor(progress * 100);

                    if (currentTime % 100 === 0) { // Update every 5 seconds
                        Chat.actionbar(`&aConverting ${conversion.assessment.profession}: ${percentComplete}%`);
                    }
                } else if (conversion.protectionActive) {
                    // Conversion completed!
                    this.completeConversion(conversion);
                    toRemove.push(uuid);
                }
            } else {
                // Entity died or despawned
                this.failConversion(conversion);
                toRemove.push(uuid);
            }
        }

        // Clean up completed/failed conversions
        toRemove.forEach(uuid => {
            this.activeConversions.delete(uuid);
        });
    }

    completeConversion(conversion) {
        const assessment = conversion.assessment;
        const conversionTime = Math.floor((Client.getTime() - conversion.startTime) / 20);

        Chat.log(`&a&l✅ CONVERSION SUCCESS! &r&a${assessment.profession} converted in ${conversionTime}s`);
        Chat.log(`&aOriginal Level: ${assessment.level} | Biome: ${assessment.biomeType}`);
        Chat.log(`&aValue Gained: ${assessment.valueScore} points`);

        this.statistics.successfullyConverted++;
        if (assessment.valueScore >= 100) {
            this.statistics.highValueConverted++;
        }

        // Clean up glow effect
        assessment.entity.resetGlowing();
    }

    failConversion(conversion) {
        const assessment = conversion.assessment;
        Chat.log(`&c❌ CONVERSION FAILED: ${assessment.profession} - ${assessment.valueScore} points lost`);
        this.statistics.failedConversions++;
    }

    updateStatistics() {
        const totalConverted = this.statistics.successfullyConverted + this.statistics.failedConversions;
        if (totalConverted > 0) {
            this.statistics.successRate = (this.statistics.successfullyConverted / totalConverted * 100).toFixed(1);
        }
    }

    displayFarmStatus() {
        if (Client.getTime() % 200 !== 0) return; // Display every 10 seconds

        let statusMessage = `&6Farm Status: `;

        if (this.activeConversions.size > 0) {
            statusMessage += `&a${this.activeConversions.size} converting | `;
        }

        if (this.conversionQueue.length > 0) {
            statusMessage += `&e${this.conversionQueue.length} queued | `;
        }

        statusMessage += `&fTotal: ${this.statistics.totalFound} | `;
        statusMessage += `&aConverted: ${this.statistics.successfullyConverted}`;

        if (this.statistics.successRate) {
            statusMessage += ` (${this.statistics.successRate}%)`;
        }

        Chat.actionbar(statusMessage);
    }

    getDetailedReport() {
        Chat.log(`\n&6&l📊 ZOMBIE VILLAGER FARM REPORT`);
        Chat.log(`&6=== Production Statistics ===`);
        Chat.log(`&6Total Found: ${this.statistics.totalFound}`);
        Chat.log(`&6Successfully Converted: ${this.statistics.successfullyConverted}`);
        Chat.log(`&6High Value Converted: ${this.statistics.highValueConverted}`);
        Chat.log(`&6Failed Conversions: ${this.statistics.failedConversions}`);

        if (this.statistics.successRate) {
            Chat.log(`&6Success Rate: ${this.statistics.successRate}%`);
        }

        Chat.log(`\n&6=== Collection Progress ===`);
        Chat.log(`&6Biome Types Collected: ${this.statistics.biomeCollection.size} (${Array.from(this.statistics.biomeCollection).join(", ")})`);
        Chat.log(`&6Professions Collected: ${this.statistics.professionCollection.size} (${Array.from(this.statistics.professionCollection).join(", ")})`);

        Chat.log(`\n&6=== Current Operations ===`);
        Chat.log(`&6Active Conversions: ${this.activeConversions.size}`);
        Chat.log(`&6Queued for Conversion: ${this.conversionQueue.length}`);

        if (this.conversionQueue.length > 0) {
            Chat.log(`&6Top Queued Items:`);
            this.conversionQueue
                .slice(0, 5)
                .forEach((item, index) => {
                    Chat.log(`  ${index + 1}. ${item.profession} (Level ${item.level}) - ${item.valueScore} points`);
                });
        }
    }
}

const farm = new ZombieVillagerFarm();

// Initialize farm (adjust center and radius as needed)
farm.setupFarm(1000, 1000, 50);

// Run farm operations every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 40 === 0) {
        farm.runFarmCycle();
        farm.updateConversions();
    }
}));

// Get detailed report on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.f") {
        farm.getDetailedReport();
    }
}));

Chat.log("&6Zombie Villager Farm System active!");
Chat.log("&6Press 'F' for detailed farm report");
```

---

## Notes and Limitations

- **Conversion Process:** Zombie villagers require Weakness effect followed by a golden apple to start conversion, which takes 3-5 minutes to complete.
- **Value Retention:** Converted villagers retain their original biome type, profession, and trade level from when they were regular villagers.
- **Conversion Interruption:** Converting zombie villagers can be killed by other mobs, so protecting them during conversion is crucial.
- **Biome Variety:** Different villager biome types have unique appearances and can affect spawn locations and availability.
- **Professional Value:** Some professions (librarian, cleric, armorer) are generally more valuable than others due to their trading offerings.
- **Level Importance:** Higher level villagers provide better trades and are more valuable to convert successfully.
- **Server Differences:** Conversion mechanics and villager behavior may vary slightly between single-player and multiplayer environments.
- **Entity Identification:** Zombie villagers can be visually distinguished from regular zombies by their distinct head shape and clothing remnants.

## Related Classes

- `ZombieEntityHelper` - Parent class with zombie-specific functionality and drowned conversion tracking
- `MobEntityHelper` - Grandparent class with mob AI and behavior methods
- `LivingEntityHelper` - Great-grandparent class with health, status effects, and combat methods
- `EntityHelper` - Base class with fundamental entity methods
- `VillagerEntityHelper` - Regular villager helper for converted entities
- `PlayerEntityHelper` - Player entity for managing conversion interactions
- `StatusEffectHelper` - For managing Weakness and other status effects during conversion

## Version Information

- Available since JSMacros 1.8.4
- Extends ZombieEntityHelper with zombie villager-specific tracking
- Full integration with Minecraft's villager conversion mechanics
- Supports all villager biome types, professions, and trade levels
- Compatible with standard weakness + golden apple conversion process