# PaintingEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.decoration.PaintingEntityHelper`

**Extends:** `EntityHelper<PaintingEntity>`

**Since:** 1.8.4

The `PaintingEntityHelper` class provides specialized access to Minecraft painting entities, allowing you to inspect various properties of paintings in the world. Paintings are decorative entities that display artwork on walls and come in various sizes and designs. This helper extends the base `EntityHelper` class and adds specific functionality for querying painting dimensions and identifying the artwork being displayed.

Paintings in Minecraft come in 26 different art variants as of recent versions, each with unique dimensions and themes. They can be found naturally generated in structures like villages, strongholds, mansions, and ocean monuments, or placed by players. This helper allows you to programmatically identify and analyze paintings in your scripts for various purposes like gallery management, art collection tracking, or architectural analysis.

This class extends `EntityHelper` and inherits all methods for position tracking, entity identification, and world interaction, while adding painting-specific functionality for artwork analysis.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Painting Art Variants](#painting-art-variants)
- [Notes and Limitations](#notes-and-limitations)
- [Related Classes](#related-classes)

---

## Constructors

PaintingEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity type is `minecraft:painting`
- World entity queries using `World.getEntities("minecraft:painting")` or other search methods
- Type casting from generic `EntityHelper` instances using `entity.as("minecraft:painting")`
- The static casting methods when you know an entity is a painting

---

## Methods

### `getWidth()`

Returns the width of this painting in blocks.

```js
// Get the width of a painting
const painting = entity.as("minecraft:painting");
if (painting) {
    const width = painting.getWidth();
    Chat.log(`Painting width: ${width} blocks`);
}
```

**Returns:** `int` - The width of the painting in blocks (typically 1, 2, or 4 blocks).

### `getHeight()`

Returns the height of this painting in blocks.

```js
// Get the height of a painting
const painting = entity.as("minecraft:painting");
if (painting) {
    const height = painting.getHeight();
    Chat.log(`Painting height: ${height} blocks`);
}
```

**Returns:** `int` - The height of the painting in blocks (typically 1, 2, 3, or 4 blocks).

### `getIdentifier()`

Returns the identifier of this painting's art variant. The identifier corresponds to the specific artwork design and may be null in some cases.

```js
// Get the art identifier of a painting
const painting = entity.as("minecraft:painting");
if (painting) {
    const artId = painting.getIdentifier();
    if (artId) {
        Chat.log(`Painting art: ${artId}`);
    } else {
        Chat.log("Painting art identifier not available");
    }
}
```

**Returns:** `String` - The painting art identifier (e.g., "minecraft:kebab", "minecraft:aztec", "minecraft:alban") or `null` if not available.

---

## Usage Examples

### Comprehensive Painting Gallery Scanner
```js
// Scan and categorize all paintings in the area
function scanPaintingGallery(radius = 64) {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const entities = World.getEntities();

    const gallery = {
        all: [],
        bySize: { small: [], medium: [], large: [], xl: [] },
        byArt: new Map(),
        statistics: {
            total: 0,
            uniqueArt: new Set(),
            totalArea: 0,
            averageSize: 0
        }
    };

    entities.forEach(entity => {
        if (entity.is("minecraft:painting")) {
            const painting = entity.as("minecraft:painting");
            const pos = entity.getPos();
            const distance = player.distanceTo(entity);

            // Only scan within specified radius
            if (distance > radius) return;

            const width = painting.getWidth();
            const height = painting.getHeight();
            const artId = painting.getIdentifier();
            const area = width * height;

            const paintingInfo = {
                entity: entity,
                position: pos,
                distance: distance,
                width: width,
                height: height,
                area: area,
                artId: artId,
                aspectRatio: width / height
            };

            gallery.all.push(paintingInfo);
            gallery.statistics.total++;
            gallery.statistics.totalArea += area;

            // Categorize by size
            if (area <= 2) {
                gallery.bySize.small.push(paintingInfo);
            } else if (area <= 6) {
                gallery.bySize.medium.push(paintingInfo);
            } else if (area <= 12) {
                gallery.bySize.large.push(paintingInfo);
            } else {
                gallery.bySize.xl.push(paintingInfo);
            }

            // Categorize by art
            if (artId) {
                if (!gallery.byArt.has(artId)) {
                    gallery.byArt.set(artId, []);
                }
                gallery.byArt.get(artId).push(paintingInfo);
                gallery.statistics.uniqueArt.add(artId);
            }
        }
    });

    // Calculate statistics
    if (gallery.statistics.total > 0) {
        gallery.statistics.averageSize = gallery.statistics.totalArea / gallery.statistics.total;
    }

    return gallery;
}

// Display gallery report
function displayGalleryReport(gallery) {
    Chat.log("🎨=== Painting Gallery Report ===");
    Chat.log(`Total paintings: ${gallery.statistics.total}`);
    Chat.log(`Unique art variants: ${gallery.statistics.uniqueArt.size}`);
    Chat.log(`Total wall coverage: ${gallery.statistics.totalArea} blocks²`);
    Chat.log(`Average painting size: ${gallery.statistics.averageSize.toFixed(1)} blocks²`);

    // Size distribution
    Chat.log("\n=== Size Distribution ===");
    Chat.log(`Small (≤2 blocks²): ${gallery.bySize.small.length}`);
    Chat.log(`Medium (3-6 blocks²): ${gallery.bySize.medium.length}`);
    Chat.log(`Large (7-12 blocks²): ${gallery.bySize.large.length}`);
    Chat.log(`Extra Large (>12 blocks²): ${gallery.bySize.xl.length}`);

    // Art variety
    if (gallery.byArt.size > 0) {
        Chat.log("\n=== Art Varieties Found ===");
        const sortedArt = Array.from(gallery.byArt.entries())
            .sort((a, b) => b[1].length - a[1].length)
            .slice(0, 10); // Top 10 most common

        sortedArt.forEach(([artId, paintings]) => {
            const artName = artId.replace("minecraft:", "");
            Chat.log(`${artName}: ${paintings.length} paintings`);
        });
    }

    // Highlight largest paintings
    const largestPaintings = gallery.all
        .sort((a, b) => b.area - a.area)
        .slice(0, 3);

    if (largestPaintings.length > 0) {
        Chat.log("\n=== Largest Paintings ===");
        largestPaintings.forEach((painting, index) => {
            Chat.log(`${index + 1}. ${painting.width}×${painting.height} (${painting.area} blocks²) - ${painting.artId || "Unknown"}`);
            Chat.log(`   Location: [${painting.position.x.toFixed(0)}, ${painting.position.y.toFixed(0)}, ${painting.position.z.toFixed(0)}]`);
        });
    }

    return gallery;
}

// Run the gallery scan
const gallery = scanPaintingGallery(32);
displayGalleryReport(gallery);
```

### Painting Art Collection Tracker
```js
// Track painting art collection progress
class PaintingCollectionTracker {
    constructor() {
        this.knownArtVariants = new Set();
        this.collectedArt = new Set();
        this.paintingLocations = new Map();
        this.rarePaintings = new Set([
            "minecraft:the_void", "minecraft:pool", "minecraft:courbet",
            "minecraft:sea", "minecraft:sunset", "minecraft:creebet"
        ]);
    }

    initializeKnownVariants() {
        // Initialize with all known painting variants
        const knownVariants = [
            "minecraft:kebab", "minecraft:aztec", "minecraft:alban", "minecraft:aztec2",
            "minecraft:bomb", "minecraft:plant", "minecraft:wasteland", "minecraft:pool",
            "minecraft:courbet", "minecraft:sea", "minecraft:sunset", "minecraft:creebet",
            "minecraft:wanderer", "minecraft:graham", "minecraft:match", "minecraft:bust",
            "minecraft:stage", "minecraft:void", "minecraft:skull_and_roses", "minecraft:wither",
            "minecraft:fighters", "minecraft:pointer", "minecraft:pigscene", "minecraft:burning_skull",
            "minecraft:skeleton", "minecraft:donkey_kong", "minecraft:the_void"
        ];

        knownVariants.forEach(variant => this.knownArtVariants.add(variant));
        Chat.log(`Initialized with ${this.knownArtVariants.size} known painting variants`);
    }

    scanForPaintings(radius = 128) {
        const entities = World.getEntities();
        let newDiscoveries = 0;
        let rareDiscoveries = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:painting")) {
                const painting = entity.as("minecraft:painting");
                const artId = painting.getIdentifier();

                if (artId && !this.collectedArt.has(artId)) {
                    this.collectedArt.add(artId);
                    this.paintingLocations.set(artId, {
                        position: entity.getPos(),
                        dimensions: `${painting.getWidth()}×${painting.getHeight()}`,
                        discovered: Client.getTime()
                    });

                    newDiscoveries++;
                    const artName = artId.replace("minecraft:", "").replace(/_/g, " ");

                    if (this.rarePaintings.has(artId)) {
                        rareDiscoveries++;
                        Chat.log(`&6✨ RARE DISCOVERY: "${artName}" painting found!`);
                    } else {
                        Chat.log(`&eNew painting discovered: "${artName}"`);
                    }
                }
            }
        });

        if (newDiscoveries > 0) {
            Chat.log(`Found ${newDiscoveries} new paintings (${rareDiscoveries} rare)`);
        }

        return { newDiscoveries, rareDiscoveries };
    }

    getCollectionProgress() {
        const totalKnown = this.knownArtVariants.size;
        const collected = this.collectedArt.size;
        const percentage = totalKnown > 0 ? (collected / totalKnown * 100) : 0;

        return {
            collected: collected,
            total: totalKnown,
            percentage: percentage,
            remaining: totalKnown - collected,
            isComplete: collected === totalKnown
        };
    }

    displayCollectionStatus() {
        const progress = this.getCollectionProgress();

        Chat.log("🎨=== Painting Collection Status ===");
        Chat.log(`Progress: ${progress.collected}/${progress.total} (${progress.percentage.toFixed(1)}%)`);

        // Progress bar
        const barLength = 20;
        const filledLength = Math.round((progress.percentage / 100) * barLength);
        const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);
        Chat.log(`[${bar}] ${progress.percentage.toFixed(1)}%`);

        if (progress.isComplete) {
            Chat.log("&a🎉 COMPLETE! You've found all painting variants!");
        } else {
            Chat.log(`&7${progress.remaining} variants remaining to discover`);
        }

        // Show rare paintings found
        const rareFound = Array.from(this.collectedArt).filter(art => this.rarePaintings.has(art));
        if (rareFound.length > 0) {
            Chat.log(`\n&6Rare paintings found: ${rareFound.length}/${this.rarePaintings.size}`);
            rareFound.forEach(art => {
                const artName = art.replace("minecraft:", "").replace(/_/g, " ");
                Chat.log(`  • ${artName}`);
            });
        }

        // Show missing paintings
        if (!progress.isComplete) {
            const missing = Array.from(this.knownArtVariants).filter(art => !this.collectedArt.has(art));
            Chat.log(`\n&7Still missing: ${missing.length} paintings`);
            if (missing.length <= 10) {
                missing.forEach(art => {
                    const artName = art.replace("minecraft:", "").replace(/_/g, " ");
                    Chat.log(`  • ${artName}`);
                });
            }
        }
    }

    locateSpecificPainting(artId) {
        return this.paintingLocations.get(artId);
    }
}

// Initialize and use the collection tracker
const collectionTracker = new PaintingCollectionTracker();
collectionTracker.initializeKnownVariants();

// Periodic scanning
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    // Scan every 10 seconds (200 ticks)
    if (Client.getTime() % 200 === 0) {
        collectionTracker.scanForPaintings(64);
    }
}));

// Display collection status on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.p" && e.action === 1) { // P key
        collectionTracker.displayCollectionStatus();
    }
}));
```

### Painting Placement Analyzer
```js
// Analyze painting placement patterns and suggest improvements
class PaintingPlacementAnalyzer {
    constructor() {
        this.paintings = new Map();
        this.walls = new Map();
        this.rooms = [];
    }

    analyzeArea(centerPos, radius) {
        const entities = World.getEntities();
        const paintingsInArea = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:painting")) {
                const distance = centerPos.distanceTo(entity);
                if (distance <= radius) {
                    const painting = entity.as("minecraft:painting");
                    const pos = entity.getPos();
                    const facing = entity.getFacingDirection();

                    paintingsInArea.push({
                        entity: entity,
                        position: pos,
                        facing: facing,
                        width: painting.getWidth(),
                        height: painting.getHeight(),
                        artId: painting.getIdentifier(),
                        area: painting.getWidth() * painting.getHeight()
                    });
                }
            }
        });

        this.analyzePlacementPatterns(paintingsInArea);
        this.generatePlacementReport(paintingsInArea);
        return paintingsInArea;
    }

    analyzePlacementPatterns(paintings) {
        // Group paintings by wall orientation
        const byFacing = {
            north: paintings.filter(p => p.facing === "north"),
            south: paintings.filter(p => p.facing === "south"),
            east: paintings.filter(p => p.facing === "east"),
            west: paintings.filter(p => p.facing === "west")
        };

        // Analyze wall coverage
        Object.entries(byFacing).forEach(([direction, wallPaintings]) => {
            if (wallPaintings.length > 0) {
                const totalArea = wallPaintings.reduce((sum, p) => sum + p.area, 0);
                const avgSize = totalArea / wallPaintings.length;

                Chat.log(`\n🖼️ ${direction.charAt(0).toUpperCase() + direction.slice(1)} Wall:`);
                Chat.log(`  Paintings: ${wallPaintings.length}`);
                Chat.log(`  Total coverage: ${totalArea} blocks²`);
                Chat.log(`  Average size: ${avgSize.toFixed(1)} blocks²`);

                // Check for spacing patterns
                wallPaintings.sort((a, b) => {
                    if (direction === "north" || direction === "south") {
                        return a.position.x - b.position.x;
                    } else {
                        return a.position.z - b.position.z;
                    }
                });

                // Calculate spacing
                let totalSpacing = 0;
                let spacingCount = 0;

                for (let i = 1; i < wallPaintings.length; i++) {
                    const prev = wallPaintings[i - 1];
                    const curr = wallPaintings[i];
                    const spacing = direction === "north" || direction === "south"
                        ? Math.abs(curr.position.x - prev.position.x)
                        : Math.abs(curr.position.z - prev.position.z);

                    totalSpacing += spacing;
                    spacingCount++;
                }

                if (spacingCount > 0) {
                    const avgSpacing = totalSpacing / spacingCount;
                    Chat.log(`  Average spacing: ${avgSpacing.toFixed(1)} blocks`);

                    if (avgSpacing < 2) {
                        Chat.log(`  ⚠️ Paintings may be too close together`);
                    } else if (avgSpacing > 8) {
                        Chat.log(`  ℹ️ Consider adding more paintings to fill wall space`);
                    } else {
                        Chat.log(`  ✅ Good spacing between paintings`);
                    }
                }
            }
        });

        // Size variety analysis
        const sizes = paintings.map(p => p.area);
        const sizeVariance = this.calculateVariance(sizes);
        Chat.log(`\n📏 Size Variety Analysis:`);
        Chat.log(`  Size variance: ${sizeVariance.toFixed(1)}`);

        if (sizeVariance < 1) {
            Chat.log(`  ℹ️ Consider using more variety in painting sizes`);
        } else if (sizeVariance > 10) {
            Chat.log(`  ✅ Excellent size variety detected`);
        } else {
            Chat.log(`  ✅ Good size balance`);
        }

        // Art variety
        const uniqueArt = new Set(paintings.map(p => p.artId).filter(Boolean));
        Chat.log(`\n🎨 Art Variety:`);
        Chat.log(`  Unique art pieces: ${uniqueArt.size}/${paintings.length}`);

        if (uniqueArt.size === paintings.length) {
            Chat.log(`  ✅ All paintings are unique - great variety!`);
        } else if (uniqueArt.size / paintings.length < 0.5) {
            Chat.log(`  ⚠️ Consider using more variety in art pieces`);
        } else {
            Chat.log(`  ✅ Good art variety balance`);
        }
    }

    calculateVariance(values) {
        if (values.length === 0) return 0;

        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;

        return variance;
    }

    generatePlacementReport(paintings) {
        Chat.log("\n🏛️=== Placement Report ===");
        Chat.log(`Total paintings analyzed: ${paintings.length}`);

        if (paintings.length === 0) {
            Chat.log("No paintings found in this area");
            return;
        }

        // Find best positioned paintings
        const paintingsWithScores = paintings.map(painting => {
            let score = 0;

            // Score based on size (larger paintings get higher scores)
            score += painting.area * 2;

            // Score based on uniqueness (rare art gets bonus)
            const artCount = paintings.filter(p => p.artId === painting.artId).length;
            if (artCount === 1) score += 10;

            // Score based on central location
            const centerDistance = Math.sqrt(
                Math.pow(painting.position.x, 2) +
                Math.pow(painting.position.z, 2)
            );
            score += Math.max(0, 20 - centerDistance);

            return { ...painting, score: score };
        });

        const topPaintings = paintingsWithScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        Chat.log("\n🏆 Top Rated Paintings:");
        topPaintings.forEach((painting, index) => {
            const artName = painting.artId ? painting.artId.replace("minecraft:", "").replace(/_/g, " ") : "Unknown";
            Chat.log(`${index + 1}. "${artName}" (${painting.width}×${painting.height}) - Score: ${painting.score.toFixed(0)}`);
            Chat.log(`   Location: [${painting.position.x.toFixed(0)}, ${painting.position.y.toFixed(0)}, ${painting.position.z.toFixed(0)}]`);
            Chat.log(`   Facing: ${painting.facing}`);
        });

        // Suggestions for improvement
        this.generateImprovementSuggestions(paintings);
    }

    generateImprovementSuggestions(paintings) {
        Chat.log("\n💡 Improvement Suggestions:");

        // Check for empty walls
        const directions = ["north", "south", "east", "west"];
        const usedDirections = new Set(paintings.map(p => p.facing));
        const emptyDirections = directions.filter(d => !usedDirections.has(d));

        if (emptyDirections.length > 0) {
            Chat.log(`• Consider adding paintings to ${emptyDirections.join(", ")} walls`);
        }

        // Check for size imbalances
        const sizes = paintings.map(p => p.area);
        const avgSize = sizes.reduce((sum, s) => sum + s, 0) / sizes.length;
        const smallPaintings = paintings.filter(p => p.area < avgSize * 0.5);
        const largePaintings = paintings.filter(p => p.area > avgSize * 1.5);

        if (smallPaintings.length > paintings.length * 0.7) {
            Chat.log(`• Consider adding some larger paintings for visual balance`);
        } else if (largePaintings.length > paintings.length * 0.5) {
            Chat.log(`• Consider adding some smaller paintings to complement the large ones`);
        }

        // Check for art repetition
        const artCounts = {};
        paintings.forEach(p => {
            if (p.artId) {
                artCounts[p.artId] = (artCounts[p.artId] || 0) + 1;
            }
        });

        const repeatedArt = Object.entries(artCounts).filter(([art, count]) => count > 1);
        if (repeatedArt.length > 0) {
            Chat.log(`• Consider varying art pieces - found ${repeatedArt.length} repeated artworks`);
        }
    }
}

// Use the placement analyzer
const placementAnalyzer = new PaintingPlacementAnalyzer();

function analyzeCurrentArea() {
    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    const radius = 32;

    Chat.log(`🔍 Analyzing painting placement within ${radius} blocks...`);
    placementAnalyzer.analyzeArea(pos, radius);
}

// Analyze area on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.a" && e.action === 1) { // A key
        analyzeCurrentArea();
    }
}));
```

### Painting Change Detection System
```js
// Monitor changes in paintings (additions, removals, modifications)
class PaintingChangeDetector {
    constructor() {
        this.knownPaintings = new Map();
        this.changeLog = [];
        this.lastScan = 0;
        this.scanInterval = 100; // Scan every 5 seconds (100 ticks)
    }

    scanForChanges() {
        const currentTime = Client.getTime();
        if (currentTime - this.lastScan < this.scanInterval) return;

        const entities = World.getEntities();
        const currentPaintings = new Map();

        entities.forEach(entity => {
            if (entity.is("minecraft:painting")) {
                const painting = entity.as("minecraft:painting");
                const uuid = entity.getUUID();

                const paintingData = {
                    uuid: uuid,
                    position: entity.getPos(),
                    width: painting.getWidth(),
                    height: painting.getHeight(),
                    artId: painting.getIdentifier(),
                    lastSeen: currentTime,
                    entity: entity
                };

                currentPaintings.set(uuid, paintingData);
            }
        });

        this.detectChanges(this.knownPaintings, currentPaintings);
        this.knownPaintings = currentPaintings;
        this.lastScan = currentTime;
    }

    detectChanges(previousPaintings, currentPaintings) {
        // Check for new paintings
        for (const [uuid, painting] of currentPaintings) {
            if (!previousPaintings.has(uuid)) {
                this.logChange("ADDED", painting);
            }
        }

        // Check for removed paintings
        for (const [uuid, painting] of previousPaintings) {
            if (!currentPaintings.has(uuid)) {
                this.logChange("REMOVED", painting);
            }
        }

        // Check for modified paintings
        for (const [uuid, current] of currentPaintings) {
            const previous = previousPaintings.get(uuid);
            if (previous) {
                const changes = this.comparePaintings(previous, current);
                if (changes.length > 0) {
                    this.logChange("MODIFIED", current, changes);
                }
            }
        }
    }

    comparePaintings(previous, current) {
        const changes = [];

        // Check position change
        const posDiff = Math.sqrt(
            Math.pow(current.position.x - previous.position.x, 2) +
            Math.pow(current.position.y - previous.position.y, 2) +
            Math.pow(current.position.z - previous.position.z, 2)
        );

        if (posDiff > 0.1) {
            changes.push(`moved ${posDiff.toFixed(1)} blocks`);
        }

        // Check size changes
        if (previous.width !== current.width || previous.height !== current.height) {
            changes.push(`size changed from ${previous.width}×${previous.height} to ${current.width}×${current.height}`);
        }

        // Check art changes
        if (previous.artId !== current.artId) {
            const prevArt = previous.artId ? previous.artId.replace("minecraft:", "") : "Unknown";
            const currArt = current.artId ? current.artId.replace("minecraft:", "") : "Unknown";
            changes.push(`art changed from "${prevArt}" to "${currArt}"`);
        }

        return changes;
    }

    logChange(type, painting, details = []) {
        const change = {
            type: type,
            timestamp: Client.getTime(),
            painting: painting,
            details: details
        };

        this.changeLog.push(change);
        this.displayChange(change);

        // Keep log size manageable
        if (this.changeLog.length > 100) {
            this.changeLog.shift();
        }
    }

    displayChange(change) {
        const time = new Date(change.timestamp).toLocaleTimeString();
        const artName = change.painting.artId
            ? change.painting.artId.replace("minecraft:", "").replace(/_/g, " ")
            : "Unknown";

        let message = `&e[${time}] Painting ${change.type}:`;

        switch (change.type) {
            case "ADDED":
                message += ` "${artName}" (${change.painting.width}×${change.painting.height})`;
                message += ` at [${change.painting.position.x.toFixed(0)}, ${change.painting.position.y.toFixed(0)}, ${change.painting.position.z.toFixed(0)}]`;
                Chat.log(message);
                break;

            case "REMOVED":
                message += ` "${artName}" was removed`;
                Chat.log(message);
                break;

            case "MODIFIED":
                message += ` "${artName}" - ${change.details.join(", ")}`;
                Chat.log(message);
                break;
        }
    }

    getChangeHistory(limit = 20) {
        return this.changeLog.slice(-limit);
    }

    displayChangeHistory() {
        const history = this.getChangeHistory();

        Chat.log("📜=== Painting Change History ===");

        if (history.length === 0) {
            Chat.log("No changes recorded yet");
            return;
        }

        history.forEach(change => {
            this.displayChange(change);
        });

        // Statistics
        const stats = {
            added: history.filter(c => c.type === "ADDED").length,
            removed: history.filter(c => c.type === "REMOVED").length,
            modified: history.filter(c => c.type === "MODIFIED").length
        };

        Chat.log(`\n📊 Statistics (last ${history.length} changes):`);
        Chat.log(`  Added: ${stats.added}`);
        Chat.log(`  Removed: ${stats.removed}`);
        Chat.log(`  Modified: ${stats.modified}`);
    }

    clearHistory() {
        this.changeLog = [];
        Chat.log("Painting change history cleared");
    }
}

// Initialize and use the change detector
const changeDetector = new PaintingChangeDetector();

// Continuous monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    changeDetector.scanForChanges();
}));

// Display change history on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.h" && e.action === 1) { // H key
        changeDetector.displayChangeHistory();
    }
}));

// Clear history on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.c" && e.action === 1 && e.mods === 2) { // Ctrl+C
        changeDetector.clearHistory();
    }
}));
```

---

## Painting Art Variants

PaintingEntityHelper provides access to all standard Minecraft painting art variants. Here are the most common ones you may encounter:

### Small Paintings (1×1 blocks)
- `minecraft:kebab` - A piece of meat on a skewer
- `minecraft:aztec` - Aztec-style pattern
- `minecraft:alban` - Abstract geometric pattern
- `minecraft:aztec2` - Another Aztec-style variant
- `minecraft:bomb` - Explosive pattern
- `minecraft:plant` - Plant illustration
- `minecraft:wasteland` - Desert landscape

### Medium Paintings (1×2 or 2×1 blocks)
- `minecraft:pool` - Swimming pool scene
- `minecraft:courbet` - Portrait-style painting
- `minecraft:sea` - Ocean landscape
- `minecraft:sunset` - Sunset scene
- `minecraft:creebet` - Creeper face parody
- `minecraft:wanderer` - Wanderer above the Sea of Fog parody
- `minecraft:graham` - Portrait
- `minecraft:match` - Two figures fighting
- `minecraft:bust` - Classical bust portrait
- `minecraft:stage` - Theater stage scene
- `minecraft:void` - Dark void scene
- `minecraft:skull_and_roses` - Skull with roses
- `minecraft:wither` - Wither boss depiction

### Large Paintings (2×2 or 1×3 blocks)
- `minecraft:fighters` - Two fighting figures
- `minecraft:pointer` - Arrow pointer
- `minecraft:pigscene` - Pig scene parody
- `minecraft:burning_skull` - Flaming skull
- `minecraft:skeleton` - Skeleton figure
- `minecraft:donkey_kong` - Donkey Kong parody

### Extra Large Paintings (4×3 or 4×4 blocks)
- `minecraft:the_void` - Mysterious void depiction

Note: The exact availability of art variants may depend on the Minecraft version and any mods or resource packs installed.

---

## Inherited Methods

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification (`getType()` returns "minecraft:painting")
- `getUUID()` - Unique identifier for this specific painting entity
- `isAlive()` - Check if painting still exists in world
- `distanceTo(other)` - Calculate distance to other entities or positions
- `getFacingDirection()` - Get the direction the painting is facing (north, south, east, west)
- `remove()` - Remove the painting from the world (if permitted)
- `setGlowing(boolean)` - Make the painting glow with outline effect
- `resetGlowing()` - Remove glowing effect

---

## Notes and Limitations

- **Read-Only Access**: PaintingEntityHelper provides read-only access to painting properties. Most painting modifications (like changing art) require server-side commands or creative mode placement.
- **Art Availability**: The `getIdentifier()` method may return `null` in some cases, particularly with corrupted painting data or unusual circumstances.
- **Dimensional Constraints**: Paintings can only be placed on solid walls and are constrained by available wall space.
- **Server Limitations**: Some entity methods like `setGlowing()` may not work on multiplayer servers with restrictive plugins.
- **Version Differences**: Available art variants and their dimensions may vary between Minecraft versions.
- **Performance Considerations**: When scanning large areas for paintings, consider limiting the search radius to avoid performance issues.
- **Entity Lifecycle**: Paintings can be destroyed by various game mechanics (water, explosions, projectiles, etc.), so always check if entities are still valid before accessing their properties.
- **Facing Direction**: Paintings are always attached to walls and will have one of four facing directions (north, south, east, west).

---

## Related Classes

- `EntityHelper` - Parent class providing basic entity functionality
- `ItemFrameEntityHelper` - Similar decoration entity for displaying items
- `ArmorStandEntityHelper` - Another decoration entity for custom displays
- `WorldHelper` - Provides world-level entity access methods
- `Pos3D` - Used for entity positions and distance calculations
- `TextHelper` - Used for entity names and identification

---

## Version Information

- Available since JsMacros 1.8.4
- Inherits all EntityHelper methods with their respective version availability
- `getWidth()` method available since 1.8.4
- `getHeight()` method available since 1.8.4
- `getIdentifier()` method available since 1.8.4
- Compatible with all Minecraft versions that have painting entities