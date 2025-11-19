# AbstractHorseEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.AbstractHorseEntityHelper<T extends AbstractHorseEntity>`

**Extends:** `AnimalEntityHelper<T>`

The `AbstractHorseEntityHelper` class provides specialized access to horse-like entities in Minecraft, including horses, donkeys, mules, and llamas. This class offers comprehensive methods for monitoring and interacting with horse-specific behaviors such as taming status, equipment, statistics, and various states.

This helper is particularly useful for creating scripts that manage horse companions, analyze horse stats for breeding purposes, coordinate mounted combat, or track the status of tameable horse-like entities in the world. The class serves as a base for more specific horse helpers (like `HorseEntityHelper`) while providing all the core functionality for abstract horse entities.

## Constructors

AbstractHorseEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type-specific methods

## Methods

### Ownership and Taming

- [horse.getOwner()](#horsegetowner)
- [horse.isTame()](#horseistame)
- [horse.isAngry()](#horseisangry)

### Equipment and Inventory

- [horse.isSaddled()](#horseissaddled)
- [horse.canWearArmor()](#horsecanweararmor)
- [horse.canBeSaddled()](#horsecanbesaddled)
- [horse.getInventorySize()](#horsegetinventorysize)

### Behavior and State

- [horse.isBred()](#horseisbred)
- [horse.isEating()](#horseiseating)

### Statistics and Attributes

- [horse.getJumpStrengthStat()](#horsegetjumpstrengthstat)
- [horse.getHorseJumpHeight()](#horsegethorsejumpheight)
- [horse.getMaxJumpStrengthStat()](#horsegetmaxjumpstrengthstat)
- [horse.getMinJumpStrengthStat()](#horsegetminjumpstrengthstat)
- [horse.getSpeedStat()](#horsegetspeedstat)
- [horse.getHorseSpeed()](#horsegethorsespeed)
- [horse.getMaxSpeedStat()](#horsegetmaxspeedstat)
- [horse.getMinSpeedStat()](#horsegetminspeedstat)
- [horse.getHealthStat()](#horsegethealthstat)
- [horse.getMaxHealthStat()](#horsegetmaxhealthstat)
- [horse.getMinHealthStat()](#horsegetminhealthstat)

### Inherited Methods

The AbstractHorseEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Ownership and Taming

## Equipment and Inventory

## Behavior and State

## Statistics and Attributes

## Usage Examples

### Complete Horse Analysis System
```js
// Comprehensive horse evaluation and comparison system
class HorseAnalysisSystem {
    constructor() {
        this.analyzedHorses = new Map();
        this.h Rankings = {
            speed: [],
            jump: [],
            health: [],
            overall: []
        };
    }

    analyzeHorse(horse) {
        const uuid = horse.getUUID();
        const name = horse.getName().getString();

        // Skip if not tame
        if (!horse.isTame()) {
            Chat.log(`&e${name} is not tame - cannot analyze`);
            return null;
        }

        // Collect all stats
        const stats = {
            uuid: uuid,
            name: name,
            horse: horse,

            // Basic info
            isSaddled: horse.isSaddled(),
            canWearArmor: horse.canWearArmor(),
            inventorySize: horse.getInventorySize(),
            isBred: horse.isBred(),

            // Performance stats
            jumpHeight: horse.getHorseJumpHeight(),
            jumpStrength: horse.getJumpStrengthStat(),
            speed: horse.getHorseSpeed(),
            speedStat: horse.getSpeedStat(),
            health: horse.getHealthStat(),

            // Percentiles
            jumpPercentile: ((horse.getJumpStrengthStat() - 0.4) / 0.6) * 100,
            speedPercentile: ((horse.getSpeedStat() - 0.1125) / 0.225) * 100,
            healthPercentile: ((horse.getHealthStat() - 15) / 15) * 100
        };

        // Calculate overall score
        stats.overallScore = (stats.jumpPercentile + stats.speedPercentile + stats.healthPercentile) / 3;

        // Determine grades
        stats.grades = this.calculateGrades(stats);

        // Store the analysis
        this.analyzedHorses.set(uuid, stats);

        return stats;
    }

    calculateGrades(stats) {
        return {
            jump: this.getGrade(stats.jumpPercentile),
            speed: this.getGrade(stats.speedPercentile),
            health: this.getGrade(stats.healthPercentile),
            overall: this.getGrade(stats.overallScore)
        };
    }

    getGrade(percentile) {
        if (percentile >= 90) return { letter: "S+", color: "&6", name: "Legendary" };
        if (percentile >= 80) return { letter: "S", color: "&5", name: "Elite" };
        if (percentile >= 70) return { letter: "A+", color: "&a", name: "Exceptional" };
        if (percentile >= 60) return { letter: "A", color: "&b", name: "Excellent" };
        if (percentile >= 50) return { letter: "B+", color: "&e", name: "Good" };
        if (percentile >= 40) return { letter: "B", color: "&f", name: "Average" };
        if (percentile >= 30) return { letter: "C+", color: "&7", name: "Fair" };
        if (percentile >= 20) return { letter: "C", color: "&8", name: "Poor" };
        return { letter: "D", color: "&4", name: "Very Poor" };
    }

    generateReport(horseStats) {
        const { name, grades, jumpHeight, speed, health, isBred, canWearArmor, inventorySize } = horseStats;

        Chat.log(`\n=== ${grades.overall.color}${name} Analysis ${grades.overall.letter} ===`);

        // Overall grade
        Chat.log(`${grades.overall.color}Overall Grade: ${grades.overall.letter} (${grades.overall.name})`);
        Chat.log(`Overall Score: ${horseStats.overallScore.toFixed(1)}%`);

        // Individual stats with grades
        Chat.log(`\nPerformance Stats:`);
        Chat.log(`${grades.jump.color}Jump: ${grades.jump.letter} ${jumpHeight.toFixed(2)} blocks (${horseStats.jumpPercentile.toFixed(0)}%)`);
        Chat.log(`${grades.speed.color}Speed: ${grades.speed.letter} ${speed.toFixed(2)} b/s (${horseStats.speedPercentile.toFixed(0)}%)`);
        Chat.log(`${grades.health.color}Health: ${grades.health.letter} ${health} hearts (${horseStats.healthPercentile.toFixed(0)}%)`);

        // Characteristics
        Chat.log(`\nCharacteristics:`);
        Chat.log(`${isBred ? "&a✓" : "&e✗"} Bred by players`);
        Chat.log(`${canWearArmor ? "&a✓" : "&7✗"} Can wear armor`);
        Chat.log(`&bInventory: ${inventorySize} slots`);

        // Best uses
        Chat.log(`\nRecommended Uses:`);
        const uses = this.getRecommendedUses(horseStats);
        uses.forEach(use => Chat.log(`• ${use}`));

        // Breeding value
        const breedingValue = this.assessBreedingValue(horseStats);
        Chat.log(`\nBreeding Value: ${breedingValue.grade.color}${breedingValue.grade.letter} ${breedingValue.description}`);
    }

    getRecommendedUses(stats) {
        const uses = [];

        // Jump-based uses
        if (stats.jumpPercentile >= 70) {
            uses.push("Mountain exploration and climbing");
            uses.push("Complex terrain navigation");
        } else if (stats.jumpPercentile >= 50) {
            uses.push("Hill traversal");
        }

        // Speed-based uses
        if (stats.speedPercentile >= 70) {
            uses.push("Long-distance travel");
            uses.push("Racing and speed challenges");
        } else if (stats.speedPercentile >= 50) {
            uses.push("General exploration");
        }

        // Health-based uses
        if (stats.healthPercentile >= 70) {
            uses.push("Combat and dangerous areas");
            uses.push("Extended expeditions");
        }

        // Storage capacity
        if (stats.inventorySize > 2) {
            uses.push(`Transport (${stats.inventorySize - 2} storage slots)`);
        }

        if (uses.length === 0) {
            uses.push("Basic transportation");
        }

        return uses;
    }

    assessBreedingValue(stats) {
        const avgScore = stats.overallScore;
        const grade = this.getGrade(avgScore);

        let description = "";
        if (avgScore >= 80) {
            description = "Exceptional breeding stock";
        } else if (avgScore >= 60) {
            description = "Good breeding candidate";
        } else if (avgScore >= 40) {
            description = "Average breeding value";
        } else {
            description = "Consider breeding with better horses";
        }

        return { grade, description };
    }

    compareHorses() {
        const horses = Array.from(this.analyzedHorses.values());

        if (horses.length < 2) {
            Chat.log("Need at least 2 horses to compare");
            return;
        }

        Chat.log("\n=== Horse Comparison ===");

        // Sort by overall score
        horses.sort((a, b) => b.overallScore - a.overallScore);

        horses.forEach((horse, index) => {
            const { name, overallScore, grades } = horse;
            Chat.log(`${index + 1}. ${grades.overall.color}${name} ${grades.overall.letter} (${overallScore.toFixed(1)}%)`);
        });

        // Find the best horse for each category
        const bestJump = horses.reduce((best, horse) =>
            horse.jumpHeight > best.jumpHeight ? horse : best);
        const bestSpeed = horses.reduce((best, horse) =>
            horse.speed > best.speed ? horse : best);
        const bestHealth = horses.reduce((best, horse) =>
            horse.health > best.health ? horse : best);

        Chat.log(`\n&bSpecialists:`);
        Chat.log(`&6🏆 Best Jumper: ${bestJump.name} (${bestJump.jumpHeight.toFixed(2)} blocks)`);
        Chat.log(`&b💨 Fastest: ${bestSpeed.name} (${bestSpeed.speed.toFixed(2)} b/s)`);
        Chat.log(`&c❤️ Toughest: ${bestHealth.name} (${bestHealth.health} hearts)`);

        // Highlight the best horses
        bestJump.horse.setGlowing(true);
        bestJump.horse.setGlowingColor(0x00FF00); // Green for best jumper
        bestSpeed.horse.setGlowing(true);
        bestSpeed.horse.setGlowingColor(0x00FFFF); // Cyan for fastest
        bestHealth.horse.setGlowing(true);
        bestHealth.horse.setGlowingColor(0xFF0000); // Red for toughest
    }

    scanArea() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(60);
        let foundHorses = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:horse", "minecraft:donkey", "minecraft:mule", "minecraft:llama")) {
                const horse = entity.asAbstractHorse();
                const distance = player.distanceTo(entity);

                if (distance <= 50 && horse.isTame()) {
                    foundHorses++;
                    this.analyzeHorse(horse);
                }
            }
        });

        if (foundHorses > 0) {
            Chat.log(`\n&aAnalyzed ${foundHorses} tame horse${foundHorses > 1 ? 's' : ''}`);
            this.compareHorses();
        } else {
            Chat.log("No tame horses found in the area");
        }
    }
}

// Initialize the analysis system
const horseAnalyzer = new HorseAnalysisSystem();

// Command to analyze horses
Chat.log("&aHorse Analysis System ready!");
Chat.log("Use horseAnalyzer.scanArea() to analyze all nearby tame horses");
Chat.log("Use horseAnalyzer.compareHorses() to compare analyzed horses");
```

### Horse Breeding Assistant
```js
// Advanced horse breeding assistant with genetics and pairings
class HorseBreedingAssistant {
    constructor() {
        this.breedingStock = new Map();
        this.pairings = [];
        this.geneticGoals = {
            speed: 80,
            jump: 80,
            health: 80
        };
    }

    registerBreedingHorse(horse) {
        const uuid = horse.getUUID();
        const stats = this.getHorseGenetics(horse);

        this.breedingStock.set(uuid, {
            horse: horse,
            genetics: stats,
            name: horse.getName().getString(),
            breedingPotential: this.calculateBreedingPotential(stats),
            inUse: false
        });

        Chat.log(`&aAdded to breeding stock: ${stats.name}`);
        this.displayHorseGenetics(stats);
    }

    getHorseGenetics(horse) {
        return {
            name: horse.getName().getString(),
            jumpStrength: horse.getJumpStrengthStat(),
            jumpPercentile: ((horse.getJumpStrengthStat() - 0.4) / 0.6) * 100,
            speedStat: horse.getSpeedStat(),
            speedPercentile: ((horse.getSpeedStat() - 0.1125) / 0.225) * 100,
            healthStat: horse.getHealthStat(),
            healthPercentile: ((horse.getHealthStat() - 15) / 15) * 100,
            isBred: horse.isBred(),
            canWearArmor: horse.canWearArmor(),
            inventorySize: horse.getInventorySize()
        };
    }

    displayHorseGenetics(genetics) {
        const { name, jumpPercentile, speedPercentile, healthPercentile, isBred } = genetics;

        Chat.log(`&7=== ${name} Genetics ===`);
        Chat.log(`Jump: ${jumpPercentile.toFixed(0)}%`);
        Chat.log(`Speed: ${speedPercentile.toFixed(0)}%`);
        Chat.log(`Health: ${healthPercentile.toFixed(0)}%`);
        Chat.log(`Origin: ${isBred ? "Bred" : "Natural"}`);

        // Genetic quality
        const avgGenetic = (jumpPercentile + speedPercentile + healthPercentile) / 3;
        let quality = "Average";
        if (avgGenetic >= 80) quality = "Superior";
        else if (avgGenetic >= 60) quality = "Good";
        else if (avgGenetic >= 40) quality = "Fair";

        Chat.log(`Genetic Quality: ${quality} (${avgGenetic.toFixed(0)}%)`);
    }

    calculateBreedingPotential(genetics) {
        // Calculate potential offspring quality
        const speedBonus = genetics.speedPercentile >= this.geneticGoals.speed ? 20 : 0;
        const jumpBonus = genetics.jumpPercentile >= this.geneticGoals.jump ? 20 : 0;
        const healthBonus = genetics.healthPercentile >= this.geneticGoals.health ? 20 : 0;

        const baseScore = (genetics.speedPercentile + genetics.jumpPercentile + genetics.healthPercentile) / 3;
        const bonusScore = baseScore + (speedBonus + jumpBonus + healthBonus) / 3;

        return Math.min(100, bonusScore);
    }

    findOptimalPairings() {
        const horses = Array.from(this.breedingStock.values()).filter(h => !h.inUse);

        if (horses.length < 2) {
            Chat.log("Need at least 2 available horses for pairing");
            return;
        }

        this.pairings = [];

        for (let i = 0; i < horses.length; i++) {
            for (let j = i + 1; j < horses.length; j++) {
                const horse1 = horses[i];
                const horse2 = horses[j];

                // Can they breed? (simplified check)
                if (this.canBreed(horse1.horse, horse2.horse)) {
                    const pairing = {
                        horse1: horse1,
                        horse2: horse2,
                        expectedOffspring: this.predictOffspring(horse1.genetics, horse2.genetics),
                        pairScore: this.calculatePairScore(horse1, horse2)
                    };

                    this.pairings.push(pairing);
                }
            }
        }

        // Sort by best expected offspring
        this.pairings.sort((a, b) => b.pairScore - a.pairScore);

        this.displayPairings();
    }

    canBreed(horse1, horse2) {
        // Basic breeding compatibility check
        return horse1.getType() === horse2.getType() && // Same type
               !horse1.isSitting() && !horse2.isSitting() && // Both standing
               horse1.isTame() && horse2.isTame(); // Both tamed
    }

    predictOffspring(genetics1, genetics2) {
        // Simplified genetics prediction
        // In reality, Minecraft genetics are more complex
        return {
            jumpPercentile: (genetics1.jumpPercentile + genetics2.jumpPercentile) / 2 + (Math.random() - 0.5) * 20,
            speedPercentile: (genetics1.speedPercentile + genetics2.speedPercentile) / 2 + (Math.random() - 0.5) * 20,
            healthPercentile: (genetics1.healthPercentile + genetics2.healthPercentile) / 2 + (Math.random() - 0.5) * 20
        };
    }

    calculatePairScore(horse1, horse2) {
        const offspring = this.predictOffspring(horse1.genetics, horse2.genetics);
        const avgScore = (offspring.jumpPercentile + offspring.speedPercentile + offspring.healthPercentile) / 3;

        // Bonus for bred horses (they tend to pass better genes)
        const bredBonus = (horse1.genetics.isBred ? 5 : 0) + (horse2.genetics.isBred ? 5 : 0);

        return avgScore + bredBonus;
    }

    displayPairings() {
        if (this.pairings.length === 0) {
            Chat.log("No compatible pairings found");
            return;
        }

        Chat.log("\n&a=== Optimal Breeding Pairings ===");

        // Show top 5 pairings
        this.pairings.slice(0, 5).forEach((pairing, index) => {
            const { horse1, horse2, expectedOffspring, pairScore } = pairing;

            Chat.log(`\n${index + 1}. &e${horse1.name} + ${horse2.name}`);
            Chat.log(`   Pair Score: ${pairScore.toFixed(0)}%`);
            Chat.log(`   Expected Offspring:`);
            Chat.log(`   - Jump: ${expectedOffspring.jumpPercentile.toFixed(0)}%`);
            Chat.log(`   - Speed: ${expectedOffspring.speedPercentile.toFixed(0)}%`);
            Chat.log(`   - Health: ${expectedOffspring.healthPercentile.toFixed(0)}%`);

            let quality = "Average";
            const avgOffspring = (expectedOffspring.jumpPercentile + expectedOffspring.speedPercentile + expectedOffspring.healthPercentile) / 3;
            if (avgOffspring >= 80) quality = "Superior";
            else if (avgOffspring >= 60) quality = "Good";
            else if (avgOffspring >= 40) quality = "Fair";

            Chat.log(`   Expected Quality: ${quality}`);

            // Highlight the breeding pair
            horse1.horse.setGlowing(true);
            horse1.horse.setGlowingColor(0xFF00FF); // Magenta for breeding
            horse2.horse.setGlowing(true);
            horse2.horse.setGlowingColor(0xFF00FF);
        });
    }

    scanForBreedingStock() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(50);
        let foundStock = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:horse", "minecraft:donkey", "minecraft:mule")) {
                const horse = entity.asAbstractHorse();
                const distance = player.distanceTo(entity);

                if (distance <= 40 && horse.isTame()) {
                    this.registerBreedingHorse(horse);
                    foundStock++;
                }
            }
        });

        if (foundStock > 0) {
            Chat.log(`\n&aFound ${foundStock} horses for breeding stock`);
            this.findOptimalPairings();
        } else {
            Chat.log("No tame horses found for breeding");
        }
    }

    setGeneticGoals(speed, jump, health) {
        this.geneticGoals = { speed, jump, health };
        Chat.log(`&aBreeding goals set:`);
        Chat.log(`Speed: ${speed}%`);
        Chat.log(`Jump: ${jump}%`);
        Chat.log(`Health: ${health}%`);
    }
}

// Initialize breeding assistant
const breedingAssistant = new HorseBreedingAssistant();

Chat.log("&aHorse Breeding Assistant ready!");
Chat.log("Use breedingAssistant.scanForBreedingStock() to find breeding horses");
Chat.log("Use breedingAssistant.setGeneticGoals(speed, jump, health) to set breeding goals");
```

## Notes and Limitations

- AbstractHorseEntityHelper instances become invalid when the horse entity is removed from the world. Always check `isAlive()` before accessing horse data.
- This helper works with all horse-like entities including horses, donkeys, mules, and llamas.
- The jump height calculation is an approximation but is very close to actual Minecraft behavior.
- Speed and jump stats are measured in different units - `getSpeedStat()` returns the internal attribute value while `getHorseSpeed()` returns actual blocks per second.
- Inventory size varies by horse type: standard horses have 2 slots (saddle + armor), donkeys and mules have 3 slots (saddle + storage), and llamas have varying slots based on strength.
- Breeding values and genetic predictions are simplified estimates - actual Minecraft breeding involves more complex genetic mechanics.
- Health, speed, and jump stats all range from minimum to maximum values, with most horses clustering around the middle ranges.
- `isEating()` only detects grass consumption - it doesn't track when horses are fed items by players.
- Equipment checks like `isSaddled()` and `canWearArmor()` provide useful information for horse management but don't modify the horse's state.

## Related Classes

- `AnimalEntityHelper` - Base class for animal functionality including breeding and food
- `MobEntityHelper` - Mob entity functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `HorseEntityHelper` - Specialized for regular horses with variant information

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft AbstractHorseEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for horse-like companion management and performance analysis