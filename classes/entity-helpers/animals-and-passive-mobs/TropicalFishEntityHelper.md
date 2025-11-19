# TropicalFishEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.TropicalFishEntityHelper`

**Extends:** `FishEntityHelper<TropicalFishEntity>`

The `TropicalFishEntityHelper` class provides specialized access to tropical fish entities in Minecraft, offering methods to examine and interact with their unique variant properties, colors, and patterns. This class extends `FishEntityHelper`, inheriting all fish-specific functionality while providing tropical fish-specific methods for variant identification, color analysis, and pattern properties.

This helper is particularly useful for scripts that need to track specific tropical fish variants, implement aquarium management systems, analyze fish populations, or create automated breeding and collection systems based on tropical fish characteristics.

## Constructors

TropicalFishEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`)
- World entity queries using type filtering for tropical fish
- Casting from generic EntityHelper instances using `entity.asAnimal()` and checking for tropical fish type

## Methods

### Tropical Fish Properties

- [tropicalFish.getVariant()](#tropicalfishgetvariant)
- [tropicalFish.getSize()](#tropicalfishgetsize)
- [tropicalFish.getBaseColor()](#tropicalfishgetbasecolor)
- [tropicalFish.getPatternColor()](#tropicalfishgetpatterncolor)
- [tropicalFish.getVarietyId()](#tropicalfishgetvarietyid)

### Inherited Methods

The TropicalFishEntityHelper inherits all methods from:
- **FishEntityHelper:** `isFromBucket()` - Check if fish came from a bucket
- **MobEntityHelper:** Movement states, AI behavior, targeting, and combat functionality
- **LivingEntityHelper:** Health, status effects, equipment, and living entity properties
- **AnimalEntityHelper:** Breeding mechanics, food preferences, and compatibility checking
- **EntityHelper:** Position, movement, world interaction, and type casting

---

## Tropical Fish Properties

### tropicalFish.getVariant()

```js
// Get the variant name of a tropical fish
function identifyFishVariant(fishHelper) {
    const variant = fishHelper.getVariant();
    Chat.log(`Fish variant: ${variant}`);

    // Example variants: "KOB", "SNOB", "DASHER", "BRinely", etc.
    return variant;
}

// Usage in entity spawn event
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:tropical_fish")) {
        const tropicalFish = entity.asAnimal().asFish(); // Cast through hierarchy
        const variant = tropicalFish.getVariant();
        const size = tropicalFish.getSize();

        Chat.log(`Spawned tropical fish: ${variant} (${size})`);
    }
}));
```

**Returns:** `String` - The variant name of the tropical fish (e.g., "KOB", "SNOB", "DASHER")

**Description:** Returns the string representation of the tropical fish's variant. Each tropical fish has a unique combination of body shape, pattern, and color that determines its variant name.

**Notes:** - Tropical fish variants are determined by a combination of shape, pattern, and colors
- There are 22 possible body patterns (shapes) for tropical fish
- Variant names are typically 3-4 character abbreviations (e.g., "KOB" for "Kob")

### tropicalFish.getSize()

```js
// Check the size of a tropical fish
function getFishSize(fishHelper) {
    const size = fishHelper.getSize();
    Chat.log(`Fish size: ${size}`);

    // Example sizes: "SMALL", "NORMAL"
    return size;
}

// Categorize fish by size for breeding programs
const fishCollection = new Map();

events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:tropical_fish")) {
        const fish = entity.asAnimal().asFish();
        const variant = fish.getVariant();
        const size = fish.getSize();

        // Group fish by size
        if (!fishCollection.has(size)) {
            fishCollection.set(size, []);
        }
        fishCollection.get(size).push({
            entity: entity,
            variant: variant,
            uuid: entity.getUUID()
        });

        // Highlight small fish for collection
        if (size === "SMALL") {
            entity.setGlowing(true);
            entity.setGlowingColor(0x00FFFF); // Cyan for small fish
        }
    }
}));
```

**Returns:** `String` - The size of the tropical fish, either "SMALL" or "NORMAL"

**Description:** Returns the size category of the tropical fish. Tropical fish can spawn as either small or normal size, which affects their appearance and may have gameplay implications.

**Notes:** - Small tropical fish have a slightly smaller visual size
- Size is independent of variant and color patterns
- Size may affect bucket capacity or breeding behavior

### tropicalFish.getBaseColor()

```js
// Analyze the color composition of tropical fish
function analyzeFishColors(fishHelper) {
    const baseColor = fishHelper.getBaseColor();
    const patternColor = fishHelper.getPatternColor();

    Chat.log(`Base Color ID: ${baseColor}, Pattern Color ID: ${patternColor}`);

    return { baseColor, patternColor };
}

// Color-based fish sorting system
class FishColorSorter {
    constructor() {
        this.fishByColor = new Map();
        this.scanRadius = 20;
    }

    scanAndSort() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                const fish = entity.asAnimal().asFish();
                const baseColor = fish.getBaseColor();
                const patternColor = fish.getPatternColor();
                const variant = fish.getVariant();

                if (!this.fishByColor.has(baseColor)) {
                    this.fishByColor.set(baseColor, []);
                }

                this.fishByColor.get(baseColor).push({
                    entity: entity,
                    patternColor: patternColor,
                    variant: variant,
                    distance: player.distanceTo(entity)
                });
            }
        });

        this.highlightColorGroups();
    }

    highlightColorGroups() {
        // Clear previous highlights
        for (const [color, fishList] of this.fishByColor) {
            fishList.forEach(fish => {
                fish.entity.resetGlowing();
            });
        }

        // Highlight by base color groups
        for (const [baseColor, fishList] of this.fishByColor) {
            if (fishList.length > 0) {
                // Use different colors for different base color groups
                let glowColor;
                switch (baseColor % 6) {
                    case 0: glowColor = 0xFF0000; break; // Red
                    case 1: glowColor = 0x00FF00; break; // Green
                    case 2: glowColor = 0x0000FF; break; // Blue
                    case 3: glowColor = 0xFFFF00; break; // Yellow
                    case 4: glowColor = 0xFF00FF; break; // Magenta
                    case 5: glowColor = 0x00FFFF; break; // Cyan
                }

                fishList.forEach(fish => {
                    fish.entity.setGlowing(true);
                    fish.entity.setGlowingColor(glowColor);
                });
            }
        }
    }
}

const colorSorter = new FishColorSorter();
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 60 === 0) { // Every 3 seconds
        colorSorter.scanAndSort();
    }
}));
```

**Returns:** `Number` - The ID of the base color component of the tropical fish's pattern

**Description:** Returns the Minecraft color ID for the base color of the tropical fish's pattern. This represents the primary body color of the fish.

**Notes:** - Color IDs correspond to Minecraft's dye color system
- Common colors include: Red (14), Green (13), Blue (11), Yellow (1), etc.
- Base color is part of what makes up the fish's overall appearance
- Multiple fish can have the same base color but different patterns

### tropicalFish.getPatternColor()

```js
// Create a pattern-based fish identification system
class PatternIdentifier {
    identifyFish(fishHelper) {
        const variant = fishHelper.getVariant();
        const baseColor = fishHelper.getBaseColor();
        const patternColor = fishHelper.getPatternColor();
        const size = fishHelper.getSize();

        const fishData = {
            variant: variant,
            baseColor: baseColor,
            patternColor: patternColor,
            size: size,
            colorCombo: `${baseColor}-${patternColor}`
        };

        // Create unique identifier
        const fishId = `${variant}_${size}_${fishData.colorCombo}`;

        return { fishData, fishId };
    }

    getUniqueFishCount(entities) {
        const seenFish = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                const fish = entity.asAnimal().asFish();
                const result = this.identifyFish(fish);

                if (!seenFish.has(result.fishId)) {
                    seenFish.add(result.fishId);
                    Chat.log(`New fish type found: ${result.fishId}`);
                }
            }
        });

        return seenFish.size;
    }
}

const patternId = new PatternIdentifier();

// Scan for unique fish types
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:tropical_fish")) {
        const fish = entity.asAnimal().asFish();
        const result = patternId.identifyFish(fish);

        Chat.log(`Fish: ${result.fishData.variant}, Size: ${result.fishData.size}, Colors: Base(${result.fishData.baseColor})/Pattern(${result.fishData.patternColor})`);
    }
}));
```

**Returns:** `Number` - The ID of the pattern color component of the tropical fish's design

**Description:** Returns the Minecraft color ID for the pattern color of the tropical fish. This represents the secondary color used in the fish's pattern overlay.

**Notes:** - Pattern color creates the distinctive stripes, spots, or patterns on tropical fish
- Combines with base color to create the fish's unique appearance
- Pattern color is typically different from the base color
- The combination of base and pattern colors, along with the variant, determines the fish's overall look

### tropicalFish.getVarietyId()

```js
// Build a comprehensive tropical fish database
class TropicalFishDatabase {
    constructor() {
        this.fishDatabase = new Map();
        this.varietyStats = new Map();
        this.scanCount = 0;
    }

    catalogFish(fishHelper, entity) {
        const variant = fishHelper.getVariant();
        const size = fishHelper.getSize();
        const baseColor = fishHelper.getBaseColor();
        const patternColor = fishHelper.getPatternColor();
        const varietyId = fishHelper.getVarietyId();
        const uuid = entity.getUUID();

        const fishRecord = {
            uuid: uuid,
            variant: variant,
            size: size,
            baseColor: baseColor,
            patternColor: patternColor,
            varietyId: varietyId,
            firstSeen: Client.getTime(),
            lastSeen: Client.getTime()
        };

        // Update database
        this.fishDatabase.set(uuid, fishRecord);

        // Update variety statistics
        if (!this.varietyStats.has(varietyId)) {
            this.varietyStats.set(varietyId, {
                count: 0,
                variants: new Set(),
                sizes: new Set(),
                colorCombos: new Set()
            });
        }

        const stats = this.varietyStats.get(varietyId);
        stats.count++;
        stats.variants.add(variant);
        stats.sizes.add(size);
        stats.colorCombos.add(`${baseColor}-${patternColor}`);

        this.scanCount++;
    }

    generateComprehensiveReport() {
        Chat.log("=== Tropical Fish Database Report ===");
        Chat.log(`Total fish cataloged: ${this.fishDatabase.size}`);
        Chat.log(`Total scans performed: ${this.scanCount}`);
        Chat.log(`Unique variety IDs: ${this.varietyStats.size}`);

        // Variety statistics
        Chat.log("\nVariety Breakdown:");
        const sortedVarieties = Array.from(this.varietyStats.entries())
            .sort((a, b) => b[1].count - a[1].count);

        sortedVarieties.slice(0, 10).forEach(([varietyId, stats]) => {
            Chat.log(`  Variety ${varietyId}: ${stats.count} fish, ${stats.variants.size} variants`);
        });

        // Most common variants
        const variantCounts = new Map();
        for (const [uuid, record] of this.fishDatabase) {
            variantCounts.set(record.variant, (variantCounts.get(record.variant) || 0) + 1);
        }

        Chat.log("\nTop 5 Most Common Variants:");
        const sortedVariants = Array.from(variantCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        sortedVariants.forEach(([variant, count]) => {
            Chat.log(`  ${variant}: ${count} fish`);
        });
    }

    scanForFish() {
        const entities = World.getEntities();
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                try {
                    const fish = entity.asAnimal().asFish();
                    this.catalogFish(fish, entity);
                } catch (e) {
                    // Handle cases where casting fails
                }
            }
        });
    }
}

const fishDB = new TropicalFishDatabase();

// Comprehensive fish scanning every 10 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 10) === 0) {
        fishDB.scanForFish();
        fishDB.generateComprehensiveReport();
    }
}));
```

**Returns:** `Number` - The unique identifier for the tropical fish's variant

**Description:** Returns the unique numeric ID that identifies this specific tropical fish variant. Each combination of body shape, pattern, and colors has a unique variety ID.

**Notes:** - Variety IDs range from 0 to 18278 (total possible tropical fish combinations)
- This ID is the most precise way to identify a specific tropical fish type
- Used internally by Minecraft to generate and identify tropical fish variants
- The same variety ID will always correspond to the same visual appearance

---

## Usage Examples

### Tropical Fish Collection Assistant

```js
// Assistant for collecting tropical fish by variant
class FishCollector {
    constructor() {
        this.targetVariants = [
            "KOB", "SNOB", "DASHER", "BRinely", "CLAYFISH",
            "ORANGE", "BLACK", "WHITE", "YELLOW", "BLUE"
        ];
        this.collection = new Map();
        this.scanRadius = 16;
        this.highlightColor = 0x00FF00; // Green for targets
        this.scanInterval = 20 * 3; // Every 3 seconds
        this.lastScan = 0;
    }

    scanForFish() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();

        if (!player) return;

        let foundTargets = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                const fish = entity.asAnimal().asFish();
                const variant = fish.getVariant();

                // Check if this is a target variant
                if (this.targetVariants.includes(variant)) {
                    foundTargets++;

                    // Add to collection if not already there
                    if (!this.collection.has(variant)) {
                        this.collection.set(variant, {
                            variant: variant,
                            count: 0,
                            uuids: new Set()
                        });
                    }

                    const collectionData = this.collection.get(variant);
                    collectionData.count++;
                    collectionData.uuids.add(entity.getUUID());

                    // Highlight the fish
                    entity.setGlowing(true);
                    entity.setGlowingColor(this.highlightColor);
                } else {
                    // Remove highlight from non-target fish
                    entity.resetGlowing();
                }
            }
        });

        if (foundTargets > 0) {
            Chat.actionbar(`&aFound ${foundTargets} target fish variants`);
        }
    }

    generateCollectionReport() {
        Chat.log("=== Fish Collection Report ===");

        let totalCollected = 0;
        for (const [variant, data] of this.collection) {
            Chat.log(`${variant}: ${data.count} fish collected`);
            totalCollected += data.count;
        }

        Chat.log(`Total fish collected: ${totalCollected}`);

        // Check completion status
        let completed = 0;
        for (const variant of this.targetVariants) {
            if (this.collection.has(variant)) {
                completed++;
            }
        }

        Chat.log(`Collection progress: ${completed}/${this.targetVariants.length} variants`);

        if (completed === this.targetVariants.length) {
            Chat.log("&a&lCOLLECTION COMPLETE!");
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        this.scanForFish();
    }
}

const collector = new FishCollector();
Chat.log("&aFish Collection Assistant activated!");
Chat.log(`&7Targeting variants: ${collector.targetVariants.join(", ")}`);

events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    collector.update();
}));

// Generate report every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        collector.generateCollectionReport();
    }
}));
```

### Aquarium Management System

```js
// Advanced aquarium management system
class AquariumManager {
    constructor() {
        this.aquariums = new Map(); // UUID -> aquarium info
        this.fishPopulations = new Map(); // variant -> count
        this.waterQuality = 100; // 0-100 scale
        this.scanRadius = 32;
        this.updateInterval = 20 * 5; // Every 5 seconds
        this.lastUpdate = 0;
    }

    setupAquarium(location, radius, name) {
        const aquarium = {
            name: name,
            center: location,
            radius: radius,
            fish: [],
            established: Client.getTime(),
            lastUpdated: Client.getTime()
        };

        this.aquariums.set(name, aquarium);
        Chat.log(`Aquarium "${name}" established at [${location.x}, ${location.y}, ${location.z}]`);
    }

    scanAquarium(aquariumName) {
        const aquarium = this.aquariums.get(aquariumName);
        if (!aquarium) return;

        const entities = World.getEntities(aquarium.radius, aquarium.center);
        const player = Player.getPlayer();

        if (!player) return;

        aquarium.fish = [];
        const population = new Map();

        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                const fish = entity.asAnimal().asFish();
                const distance = player.distanceTo(entity);

                if (distance <= aquarium.radius) {
                    const fishData = {
                        entity: entity,
                        variant: fish.getVariant(),
                        size: fish.getSize(),
                        baseColor: fish.getBaseColor(),
                        patternColor: fish.getPatternColor(),
                        varietyId: fish.getVarietyId(),
                        position: entity.getPos(),
                        health: null,
                        fromBucket: fish.isFromBucket()
                    };

                    // Try to get health
                    try {
                        const living = entity.asLiving();
                        if (living) {
                            fishData.health = living.getHealth();
                            fishData.maxHealth = living.getMaxHealth();
                        }
                    } catch (e) {}

                    aquarium.fish.push(fishData);

                    // Update population statistics
                    population.set(fishData.variant, (population.get(fishData.variant) || 0) + 1);
                }
            }
        });

        // Update population map
        this.fishPopulations = population;
        aquarium.lastUpdated = Client.getTime();

        // Update water quality based on population density
        this.updateWaterQuality(aquarium);
    }

    updateWaterQuality(aquarium) {
        const fishCount = aquarium.fish.length;
        const maxCapacity = Math.floor(Math.PI * aquarium.radius * aquarium.radius / 16); // Rough estimate

        const density = fishCount / maxCapacity;
        const qualityLoss = density * 2; // Lose 2% quality per unit density
        this.waterQuality = Math.max(0, this.waterQuality - qualityLoss);

        // Quality affects fish spawning
        if (this.waterQuality < 30) {
            Chat.warn(`Aquarium "${aquarium.name}" water quality is low: ${this.waterQuality.toFixed(1)}%`);
        }
    }

    generateAquariumReport(aquariumName) {
        const aquarium = this.aquariums.get(aquariumName);
        if (!aquarium) return;

        const fishCount = aquarium.fish.length;

        Chat.log(`=== Aquarium Report: ${aquarium.name} ===`);
        Chat.log(`Fish population: ${fishCount}`);
        Chat.log(`Water quality: ${this.waterQuality.toFixed(1)}%`);
        Chat.log(`Last updated: ${new Date(aquarium.lastUpdated * 50).toLocaleTimeString()}`);

        // Population breakdown
        if (this.fishPopulations.size > 0) {
            Chat.log("\nPopulation by variant:");
            const sortedVariants = Array.from(this.fishPopulations.entries())
                .sort((a, b) => b[1] - a[1]);

            sortedVariants.forEach(([variant, count]) => {
                const percentage = (count / fishCount * 100).toFixed(1);
                Chat.log(`  ${variant}: ${count} (${percentage}%)`);
            });
        }

        // Size distribution
        const sizeDistribution = { SMALL: 0, NORMAL: 0 };
        aquarium.fish.forEach(fish => {
            sizeDistribution[fish.size]++;
        });

        Chat.log(`\nSize distribution:`);
        Chat.log(`  Small: ${sizeDistribution.SMALL}`);
        Chat.log(`  Normal: ${sizeDistribution.NORMAL}`);

        // Unique variety count
        const uniqueVarieties = new Set(aquarium.fish.map(f => f.varietyId)).size;
        Chat.log(`Unique varieties: ${uniqueVarieties}`);

        // Health status
        const healthyFish = aquarium.fish.filter(f => f.health && f.health > 0).length;
        Chat.log(`Healthy fish: ${healthyFish}/${fishCount}`);
    }

    highlightTargetFish(targetVariant) {
        this.aquariums.forEach(aquarium => {
            aquarium.fish.forEach(fish => {
                if (fish.variant === targetVariant) {
                    fish.entity.setGlowing(true);
                    fish.entity.setGlowingColor(0xFFD700); // Gold for targets
                } else {
                    fish.entity.resetGlowing();
                }
            });
        });
    }

    update() {
        if (Client.getTime() - this.lastUpdate < this.updateInterval) return;

        this.lastUpdate = Client.getTime();

        // Scan all aquariums
        this.aquariums.forEach((aquarium, name) => {
            this.scanAquarium(name);
        });

        // Gradually improve water quality
        if (this.waterQuality < 100) {
            this.waterQuality = Math.min(100, this.waterQuality + 0.5);
        }
    }
}

// Setup and usage
const aquarium = new AquariumManager();

// Create an aquarium
const player = Player.getPlayer();
if (player) {
    const position = player.getPos();
    aquarium.setupAquarium(position, 8, "Main Aquarium");
}

// Update aquarium every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    aquarium.update();
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        aquarium.generateAquariumReport("Main Aquarium");
    }
}));

// Command to highlight specific fish variants
Chat.registerCommand("fishfind", (args) => {
    if (args.length > 0) {
        const target = args[0].toUpperCase();
        aquarium.highlightTargetFish(target);
        Chat.log(`Highlighting fish with variant: ${target}`);
    } else {
        Chat.log("Usage: /fishfind <variant>");
    }
});
```

### Tropical Fish Breeding Assistant

```js
// Advanced tropical fish breeding assistant
class TropicalFishBreeder {
    constructor() {
        this.breedingPairs = new Map(); // variant -> compatible pairs
        this.breedingTargets = new Set();
        this.scanRadius = 12;
        this.updateInterval = 20 * 2; // Every 2 seconds
        this.lastUpdate = 0;

        // Common breeding targets
        this.breedingTargets.add("KOB");
        this.breedingTargets.add("SNOB");
        this.breedingTargets.add("DASHER");
        this.breedingTargets.add("ORANGE");
    }

    scanForBreedingCandidates() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();

        if (!player) return;

        // Clear previous highlights
        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                entity.resetGlowing();
            }
        });

        const fishByVariant = new Map();

        // Group fish by variant
        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                try {
                    const fish = entity.asAnimal().asFish();
                    const variant = fish.getVariant();

                    if (!fishByVariant.has(variant)) {
                        fishByVariant.set(variant, []);
                    }

                    fishByVariant.get(variant).push({
                        entity: entity,
                        fish: fish,
                        position: entity.getPos(),
                        uuid: entity.getUUID()
                    });
                } catch (e) {}
            }
        });

        // Find breeding pairs for target variants
        this.breedingPairs.clear();

        for (const targetVariant of this.breedingTargets) {
            const candidates = fishByVariant.get(targetVariant) || [];

            if (candidates.length >= 2) {
                const compatiblePairs = [];

                // Find compatible pairs (fish that can potentially breed)
                for (let i = 0; i < candidates.length; i++) {
                    for (let j = i + 1; j < candidates.length; j++) {
                        const fish1 = candidates[i];
                        const fish2 = candidates[j];
                        const distance = fish1.position.distanceTo(fish2.position);

                        // Fish must be reasonably close and of the same variant
                        if (distance <= 4) {
                            compatiblePairs.push({
                                fish1: fish1,
                                fish2: fish2,
                                distance: distance
                            });

                            // Highlight breeding candidates
                            fish1.entity.setGlowing(true);
                            fish1.entity.setGlowingColor(0x00FF00); // Green
                            fish2.entity.setGlowing(true);
                            fish2.entity.setGlowingColor(0x00FF00);
                        }
                    }
                }

                this.breedingPairs.set(targetVariant, compatiblePairs);
            }
        }
    }

    generateBreedingReport() {
        Chat.log("=== Tropical Fish Breeding Report ===");

        let totalPairs = 0;
        let targetVariantsFound = 0;

        for (const [variant, pairs] of this.breedingPairs) {
            if (pairs.length > 0) {
                targetVariantsFound++;
                totalPairs += pairs.length;

                Chat.log(`${variant}: ${pairs.length} compatible pair${pairs.length > 1 ? 's' : ''}`);

                // Show closest pairs for this variant
                const sortedPairs = pairs.sort((a, b) => a.distance - b.distance);
                const closest = sortedPairs[0];
                Chat.log(`  Closest pair: ${closest.distance.toFixed(1)} blocks apart`);

                // Show variety and color information
                const fish1Data = {
                    variant: closest.fish1.fish.getVariant(),
                    size: closest.fish1.fish.getSize(),
                    baseColor: closest.fish1.fish.getBaseColor(),
                    patternColor: closest.fish1.fish.getPatternColor(),
                    varietyId: closest.fish1.fish.getVarietyId()
                };

                const fish2Data = {
                    variant: closest.fish2.fish.getVariant(),
                    size: closest.fish2.fish.getSize(),
                    baseColor: closest.fish2.fish.getBaseColor(),
                    patternColor: closest.fish2.fish.getPatternColor(),
                    varietyId: closest.fish2.fish.getVarietyId()
                };

                Chat.log(`  Fish 1: ${fish1Data.variant} (${fish1Data.size}), Colors: ${fish1Data.baseColor}/${fish1Data.patternColor}`);
                Chat.log(`  Fish 2: ${fish2Data.variant} (${fish2Data.size}), Colors: ${fish2Data.baseColor}/${fish2Data.patternColor}`);
            }
        }

        Chat.log(`\nSummary: ${targetVariantsFound}/${this.breedingTargets.size} target varieties with breeding pairs`);
        Chat.log(`Total breeding opportunities: ${totalPairs}`);

        if (totalPairs > 0) {
            Chat.actionbar(`&aFound ${totalPairs} breeding opportunities!`);
        }
    }

    highlightFishByVariant(variant) {
        const entities = World.getEntities(this.scanRadius);

        entities.forEach(entity => {
            if (entity.is("minecraft:tropical_fish")) {
                try {
                    const fish = entity.asAnimal().asFish();
                    if (fish.getVariant() === variant) {
                        entity.setGlowing(true);
                        entity.setGlowingColor(0xFFFF00); // Yellow for highlighted
                    } else {
                        entity.resetGlowing();
                    }
                } catch (e) {}
            }
        });
    }

    update() {
        if (Client.getTime() - this.lastUpdate < this.updateInterval) return;

        this.lastUpdate = Client.getTime();
        this.scanForBreedingCandidates();
    }
}

const breeder = new TropicalFishBreeder();
Chat.log("&aTropical Fish Breeding Assistant activated!");

// Update breeding scan every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    breeder.update();
}));

// Generate breeding report every 20 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 20) === 0) {
        breeder.generateBreedingReport();
    }
}));

// Command to highlight specific variants for breeding
Chat.registerCommand("highlightfish", (args) => {
    if (args.length > 0) {
        const variant = args[0].toUpperCase();
        breeder.highlightFishByVariant(variant);
        Chat.log(`Highlighting fish with variant: ${variant}`);
    } else {
        Chat.log("Usage: /highlightfish <variant>");
    }
});
```

## Notes and Limitations

- TropicalFishEntityHelper instances become invalid when the fish entity is removed from the water or dies. Always check `isAlive()` before accessing fish data.
- The `asAnimal()` and `asFish()` casting methods can throw `ClassCastException` if the entity is not of the expected type. Use `is("minecraft:tropical_fish")` to check types first.
- Tropical fish must be in water to survive - most methods will return invalid data if the fish is out of water.
- Color IDs correspond to Minecraft's dye color system and may change between Minecraft versions.
- Variant names and variety IDs are determined by Minecraft's internal tropical fish generation algorithm.
- Fish from buckets (`isFromBucket()`) may have different behavior or properties than naturally spawned fish.
- Size and color patterns are fixed when the fish spawns and cannot be changed through the helper.
- Breeding mechanics are complex and depend on multiple factors including species, size, and environmental conditions.
- The inheritance hierarchy provides comprehensive access to fish, mob, living entity, animal, and base entity functionality.

## Related Classes

- `FishEntityHelper` - Base class for all fish entities with bucket detection
- `AnimalEntityHelper` - Base class for animal entities with breeding mechanics
- `MobEntityHelper` - Base class for mob entities with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `Pos3D` - 3D position and vector mathematics for fish tracking
- `ItemHelper` - Item information for bucket-based fish management
- `DyeColorHelper` - Color information and utilities for fish color analysis

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized tropical fish helper class for enhanced entity type support
- All methods delegate to the underlying Minecraft TropicalFishEntity implementation
- Inherits comprehensive functionality from the fish entity hierarchy
- Specifically designed for tropical fish variant identification, color analysis, and breeding automation