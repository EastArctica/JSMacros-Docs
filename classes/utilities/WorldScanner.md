# WorldScanner

A powerful class for scanning the Minecraft world for specific blocks or patterns. Uses optimized chunk-based scanning with caching for high performance. Essential for resource detection, area analysis, and automated mining/farming operations.

## Constructor

```javascript
new WorldScanner(world, blockFilter, stateFilter)
```

**Parameters:**
- `world` (World): The Minecraft world to scan
- `blockFilter` (function): Optional filter function for BlockHelper objects
- `stateFilter` (function): Optional filter function for BlockStateHelper objects

**Example:**
```javascript
let scanner = new WorldScanner(
    World.getWorld(),
    (block) => block.getName().includes("ore"), // Filter for ore blocks
    (state) => state.getName().includes("diamond") // Filter for diamond ore specifically
);
```

## Methods

### Area Scanning

#### scanAroundPlayer(chunkRange)
Scans chunks around the player's current position.

```javascript
let results = scanner.scanAroundPlayer(2); // 3x3 chunk area
```

#### scanChunkRange(centerX, centerZ, chunkrange)
Scans chunks around a specific center point.

```javascript
let results = scanner.scanChunkRange(0, 0, 3); // 7x7 chunk area
```

#### scanCubeArea(pos, range)
Scans a cubic area around a position.

```javascript
let results = scanner.scanCubeArea(playerPos, 50); // 100x100x100 block area
```

#### scanCubeArea(x, y, z, range)
Scans a cubic area around coordinates.

```javascript
let results = scanner.scanCubeArea(100, 64, 100, 50);
```

#### scanCubeArea(pos1, pos2)
Scans a rectangular area between two positions (exclusive end).

```javascript
let results = scanner.scanCubeArea(startPos, endPos);
```

#### scanCubeAreaInclusive(pos1, pos2)
Scans a rectangular area between two positions (inclusive end).

```javascript
let results = scanner.scanCubeAreaInclusive(startPos, endPos);
```

#### scanSphereArea(pos, radius)
Scans a spherical area around a position.

```javascript
let results = scanner.scanSphereArea(playerPos, 32); // 32 block radius
```

### Player Reach Scanning

#### scanReachable()
Scans blocks within player's interaction range.

```javascript
let reachableBlocks = scanner.scanReachable();
```

#### scanReachable(strict)
Scans within reach with optional strict collision checking.

```javascript
let reachableBlocks = scanner.scanReachable(true);
```

#### scanReachable(pos, reach, strict)
Scans within reach from a specific position.

```javascript
let reachableBlocks = scanner.scanReachable(playerPos, 4.5, true);
```

#### scanClosestReachable()
Returns the closest reachable block.

```javascript
let closestBlock = scanner.scanClosestReachable();
```

### Data Analysis

#### getBlocksInChunk(chunkX, chunkZ, ignoreState)
Counts blocks in a specific chunk.

```javascript
let blockCounts = scanner.getBlocksInChunk(0, 0, true);
```

#### getBlocksInChunks(centerX, centerZ, chunkRange, ignoreState)
Counts blocks in multiple chunks.

```javascript
let blockCounts = scanner.getBlocksInChunks(0, 0, 2, true);
```

#### getCachedAmount()
Returns the number of cached block states.

```javascript
let cacheSize = scanner.getCachedAmount();
```

### Utility Methods

#### getChunkRange(centerX, centerZ, chunkrange)
Gets chunk positions in a range around center.

```javascript
let chunkPositions = scanner.getChunkRange(0, 0, 2);
```

## Examples

### Basic Ore Detection

```javascript
// Create scanner for diamond ore detection
let diamondScanner = new WorldScanner(
    World.getWorld(),
    (block) => block.getName().includes("diamond_ore"),
    null // No state filter needed
);

function scanForDiamonds() {
    let player = Player.getPlayer();
    let results = diamondScanner.scanAroundPlayer(4); // 9x9 chunks

    Chat.log(`Found ${results.length} diamond ore blocks nearby`);

    if (results.length > 0) {
        // Sort by distance
        results.sort((a, b) => {
            let distA = player.getPos().toVector(a).getMagnitude();
            let distB = player.getPos().toVector(b).getMagnitude();
            return distA - distB;
        });

        // Show closest diamond
        let closest = results[0];
        Chat.log(`Closest diamond at: ${closest.x}, ${closest.y}, ${closest.z}`);

        // Create visual indicator
        let draw3d = Draw3D.create();
        let highlight = new Box(
            closest.x, closest.y, closest.z,
            closest.x + 1, closest.y + 1, closest.z + 1,
            0x00FFFF, 0x00FFFF, true, false
        );
        highlight.setFillAlpha(100);
        draw3d.addBox(highlight);
    }

    return results;
}

// Run scan every 30 seconds
setInterval(scanForDiamonds, 30000);
```

### Comprehensive Resource Scanner

```javascript
// Multi-resource scanner with different filters
let resourceScanners = {
    diamond: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("diamond_ore"), null),
    iron: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("iron_ore"), null),
    coal: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("coal_ore"), null),
    gold: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("gold_ore"), null),
    redstone: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("redstone_ore"), null),
    emerald: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("emerald_ore"), null)
};

function scanAreaForResources(chunkRange = 3) {
    let results = {};
    let totalResources = 0;

    for (let [resource, scanner] of Object.entries(resourceScanners)) {
        let found = scanner.scanAroundPlayer(chunkRange);
        results[resource] = found;
        totalResources += found.length;

        if (found.length > 0) {
            Chat.log(`Found ${found.length} ${resource} ore blocks`);
        }
    }

    // Create summary
    Chat.log(`
=== Resource Scan Results ===
${Object.entries(results).map(([resource, blocks]) =>
    `${resource}: ${blocks.length} blocks`
).join('\n')}
Total: ${totalResources} resources
============================
    `);

    return results;
}

function highlightClosestResource(resources) {
    let player = Player.getPlayer();
    let playerPos = player.getPos();
    let closest = null;
    let minDistance = Infinity;
    let closestType = null;

    for (let [type, blocks] of Object.entries(resources)) {
        blocks.forEach(block => {
            let distance = playerPos.toVector(block).getMagnitude();
            if (distance < minDistance) {
                minDistance = distance;
                closest = block;
                closestType = type;
            }
        });
    }

    if (closest) {
        Chat.log(`Closest resource: ${closestType} at ${Math.floor(minDistance)} blocks`);

        // Highlight with resource-specific color
        let colors = {
            diamond: 0x00FFFF,
            iron: 0xC0C0C0,
            coal: 0x404040,
            gold: 0xFFD700,
            redstone: 0xFF0000,
            emerald: 0x50FF50
        };

        let draw3d = Draw3D.create();
        let highlight = new Box(
            closest.x, closest.y, closest.z,
            closest.x + 1, closest.y + 1, closest.z + 1,
            colors[closestType] || 0xFFFFFF,
            colors[closestType] || 0xFFFFFF,
            true, false
        );
        highlight.setFillAlpha(80);
        draw3d.addBox(highlight);

        return closest;
    }

    return null;
}

// Usage with chat command
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let message = event.message.getStringStripFormatting();

    if (message === "!scan") {
        let resources = scanAreaForResources();
        highlightClosestResource(resources);
    }
}));
```

### Cave and Structure Detection

```javascript
// Scanner for detecting caves and voids
let caveScanner = new WorldScanner(
    World.getWorld(),
    (block) => block.isAir(),
    null
);

function detectCaves(centerPos, radius, sampleRate = 4) {
    let airBlocks = caveScanner.scanSphereArea(centerPos, radius);
    let caveClusters = [];
    let processed = new Set();

    airBlocks.forEach(block => {
        let key = `${block.x},${block.y},${block.z}`;
        if (processed.has(key)) return;

        // Find connected air blocks (cave system)
        let cluster = [];
        let toCheck = [block];

        while (toCheck.length > 0) {
            let current = toCheck.pop();
            let currentKey = `${current.x},${current.y},${current.z}`;

            if (processed.has(currentKey)) continue;
            processed.add(currentKey);
            cluster.push(current);

            // Check adjacent blocks
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dz = -1; dz <= 1; dz++) {
                        if (dx === 0 && dy === 0 && dz === 0) continue;

                        let checkBlock = {
                            x: current.x + dx,
                            y: current.y + dy,
                            z: current.z + dz
                        };

                        let distance = centerPos.toVector(new Pos3D(
                            checkBlock.x, checkBlock.y, checkBlock.z
                        )).getMagnitude();

                        if (distance <= radius) {
                            let isAir = World.getBlockAt(
                                checkBlock.x, checkBlock.y, checkBlock.z
                            ).isAir();

                            if (isAir) {
                                toCheck.push(checkBlock);
                            }
                        }
                    }
                }
            }
        }

        if (cluster.length > 50) { // Significant cave system
            caveClusters.push(cluster);
        }
    });

    return caveClusters;
}

function analyzeCaves() {
    let player = Player.getPlayer();
    let playerPos = player.getPos();
    let caves = detectCaves(playerPos, 64);

    Chat.log(`Found ${caves.length} significant cave systems:`);

    caves.forEach((cave, index) => {
        let avgY = cave.reduce((sum, block) => sum + block.y, 0) / cave.length;
        let bounds = {
            minX: Math.min(...cave.map(b => b.x)),
            maxX: Math.max(...cave.map(b => b.x)),
            minY: Math.min(...cave.map(b => b.y)),
            maxY: Math.max(...cave.map(b => b.y)),
            minZ: Math.min(...cave.map(b => b.z)),
            maxZ: Math.max(...cave.map(b => b.z))
        };

        Chat.log(`Cave ${index + 1}: ${cave.length} blocks, Y range: ${bounds.minY}-${bounds.maxY}`);

        // Highlight large caves
        if (cave.length > 500) {
            let center = new Pos3D(
                (bounds.minX + bounds.maxX) / 2,
                (bounds.minY + bounds.maxY) / 2,
                (bounds.minZ + bounds.maxZ) / 2
            );

            let draw3d = Draw3D.create();
            let box = new Box(
                bounds.minX, bounds.minY, bounds.minZ,
                bounds.maxX + 1, bounds.maxY + 1, bounds.maxZ + 1,
                0xFF6600, 0xFF6600, true, false
            );
            box.setFillAlpha(30);
            draw3d.addBox(box);
        }
    });
}

// Run cave analysis
analyzeCaves();
```

### Farm and Crop Monitoring

```javascript
// Scanner for agricultural monitoring
let cropScanners = {
    wheat: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("wheat") && !block.getName().includes("seeds"),
        (state) => state.getAge() === 7 // Fully grown
    ),
    carrot: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("carrots"),
        (state) => state.getAge() === 7
    ),
    potato: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("potatoes"),
        (state) => state.getAge() === 7
    ),
    melon: new WorldScanner(World.getWorld(),
        (block) => block.getName().includes("melon") || block.getName().includes("pumpkin"),
        null
    )
};

function monitorFarm(areaStart, areaEnd) {
    let results = {};
    let totalReady = 0;

    for (let [crop, scanner] of Object.entries(cropScanners)) {
        let ready = scanner.scanCubeArea(areaStart, areaEnd);
        results[crop] = ready.length;
        totalReady += ready.length;

        if (ready.length > 0) {
            Chat.log(`${ready.length} ready ${crop}(s) found`);

            // Highlight ready crops
            let draw3d = Draw3D.create();
            ready.forEach(block => {
                let highlight = new Box(
                    block.x, block.y, block.z,
                    block.x + 1, block.y + 1, block.z + 1,
                    0x00FF00, 0x00FF00, true, false
                );
                highlight.setFillAlpha(120);
                draw3d.addBox(highlight);
            });
        }
    }

    Chat.log(`Farm Status: ${totalReady} crops ready for harvest`);

    return results;
}

// Auto-harvest ready crops
function harvestReadyCrops(areaStart, areaEnd) {
    let player = Player.getPlayer();
    let results = monitorFarm(areaStart, areaEnd);

    for (let [crop, count] of Object.entries(results)) {
        if (count > 0) {
            Chat.log(`Harvesting ${count} ${crop}(s)`);
            // Add harvesting logic here
        }
    }
}
```

### Performance-Optimized Large Scanning

```javascript
// Efficient large-scale scanning with caching
class EfficientWorldScanner {
    constructor(filter) {
        this.scanner = new WorldScanner(World.getWorld(), filter, null);
        this.cache = new Map();
        this.cacheTimeout = 30000; // 30 seconds
    }

    scanChunkArea(chunkX, chunkZ, range) {
        let cacheKey = `${chunkX}_${chunkZ}_${range}`;
        let cached = this.cache.get(cacheKey);

        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.results;
        }

        let results = this.scanner.scanChunkRange(chunkX, chunkZ, range);

        this.cache.set(cacheKey, {
            results: results,
            timestamp: Date.now()
        });

        return results;
    }

    scanLargeArea(centerX, centerZ, chunkRange, chunkStep = 2) {
        let allResults = [];
        let totalChunks = 0;

        for (let x = centerX - chunkRange; x <= centerX + chunkRange; x += chunkStep) {
            for (let z = centerZ - chunkRange; z <= centerZ + chunkRange; z += chunkStep) {
                let chunkResults = this.scanChunkArea(x, z, chunkStep - 1);
                allResults.push(...chunkResults);
                totalChunks++;

                // Yield to prevent lag
                if (totalChunks % 10 === 0) {
                    Chat.log(`Scanned ${totalChunks} chunks, found ${allResults.length} results...`);
                }
            }
        }

        return allResults;
    }

    clearCache() {
        this.cache.clear();
        Chat.log("Scanner cache cleared");
    }
}

// Usage
let oreScanner = new EfficientWorldScanner((block) => block.getName().includes("ore"));

function largeScaleOreSearch() {
    let player = Player.getPlayer();
    let playerChunk = {
        x: Math.floor(player.x / 16),
        z: Math.floor(player.z / 16)
    };

    Chat.log("Starting large-scale ore search...");
    let startTime = Date.now();

    let ores = oreScanner.scanLargeArea(playerChunk.x, playerChunk.z, 8, 2);

    let endTime = Date.now();
    let duration = (endTime - startTime) / 1000;

    Chat.log(`Search completed in ${duration} seconds`);
    Chat.log(`Found ${ores.length} ore blocks in ${oreScanner.cache.size} cached chunks`);

    // Clear cache periodically
    setTimeout(() => oreScanner.clearCache(), 60000);
}
```

### Real-Time Resource Tracking

```javascript
// Continuous resource monitoring with notifications
let lastScanResults = {};

function continuousResourceMonitoring() {
    let player = Player.getPlayer();
    let currentResults = {};

    for (let [resource, scanner] of Object.entries(resourceScanners)) {
        let found = scanner.scanReachable(false); // Don't be strict about obstacles
        currentResults[resource] = found;

        // Compare with last scan to find new resources
        let lastFound = lastScanResults[resource] || [];
        let newResources = found.filter(block =>
            !lastFound.some(last =>
                last.x === block.x && last.y === block.y && last.z === block.z
            )
        );

        if (newResources.length > 0) {
            Chat.log(Chat.createTextHelperFromJSON(`{
                "text": "New ${resource} discovered! (${newResources.length} blocks)",
                "color": "yellow",
                "bold": true
            }`));

            // Highlight new resources briefly
            let draw3d = Draw3D.create();
            newResources.forEach(block => {
                let highlight = new Box(
                    block.x, block.y, block.z,
                    block.x + 1, block.y + 1, block.z + 1,
                    0xFFFF00, 0xFFFF00, true, false
                );
                highlight.setFillAlpha(150);
                draw3d.addBox(highlight);
            });

            // Remove highlight after 5 seconds
            setTimeout(() => {
                newResources.forEach(block => {
                    draw3d.clear();
                });
            }, 5000);
        }
    }

    lastScanResults = currentResults;
}

// Monitor every 2 seconds
setInterval(continuousResourceMonitoring, 2000);
```

## Integration with Other Classes

WorldScanner integrates seamlessly with:
- **Pos3D/Vec3D**: For positioning and distance calculations
- **Draw3D**: For visualizing scan results with boxes
- **World**: For block access and world information
- **Chat**: For reporting scan results

## Performance Guidelines

### ✅ Best Practices
- **Reuse Scanners**: Create scanner instances once and reuse them
- **Appropriate Ranges**: Use chunk-based scanning for large areas
- **Caching**: The scanner automatically caches block states for performance
- **Yield Control**: For very large scans, consider breaking them into chunks

### ⚠️ Performance Considerations
- **Memory Usage**: Large scans can consume significant memory
- **Server Load**: Be considerate when scanning large areas on multiplayer servers
- **Cache Management**: Periodically clear scanner cache if memory becomes an issue
- **Scan Frequency**: Avoid scanning the same area too frequently

### 🔧 Optimization Tips
- **Chunk-Based Scanning**: More efficient than block-by-block for large areas
- **Specific Filters**: More specific filters are faster than general ones
- **Reach Scanning**: Use `scanReachable()` for player-centric operations
- **Area Limits**: Set reasonable scan area limits to prevent excessive resource usage

## See Also

- [Pos3D](Pos3D.md) - 3D position class
- [World](../core/World.md) - World operations and block access
- [Draw3D](Draw3D.md) - 3D drawing operations
- [Box](Box.md) - 3D bounding box class