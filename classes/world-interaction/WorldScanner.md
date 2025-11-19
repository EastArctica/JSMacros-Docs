# WorldScanner

The `WorldScanner` class is a powerful tool in JSMacros for efficiently scanning the Minecraft world and finding specific blocks based on customizable filters. This class provides high-performance block searching capabilities with caching optimizations for repeated scans.

## Overview

The WorldScanner is designed to search through Minecraft chunks and identify blocks that match specific criteria. It features:

- **High Performance**: Optimized scanning algorithms with optional parallel processing
- **Caching**: Results are cached to improve performance on repeated scans
- **Flexible Filtering**: Support for both block-level and block state-level filtering
- **Multiple Scan Types**: Support for chunk-based, area-based, spherical, and player-reachable scanning
- **Counting Capabilities**: Can return either positions or counts of matching blocks

## Getting a WorldScanner

There are two main ways to obtain a WorldScanner instance:

### Using WorldScannerBuilder (Recommended)

```javascript
// Get a new WorldScannerBuilder
const scannerBuilder = World.getWorldScanner();

// Build the scanner with your filters
const scanner = scannerBuilder
    .withStringBlockFilter().contains("chest", "barrel")
    .andStateFilter("isToolRequired").is(false)
    .build();
```

### Using Custom Filters

```javascript
// Define custom filter functions
const blockFilter = (block) => block.getHardness() <= 10;
const stateFilter = (state) => state.get("waterlogged") === "false";

// Create scanner with custom filters
const scanner = World.getWorldScanner(blockFilter, stateFilter);
```

## Methods

### Chunk-Based Scanning

#### `scanAroundPlayer(chunkRange)`

Scans chunks around the player's current position.

**Parameters:**
- `chunkRange` (number): Range of chunks to scan around the player (0 = only current chunk, 1 = 3x3 area)

**Returns:**
- `List<Pos3D>`: List of positions of matching blocks

**Example:**
```javascript
// Scan a 3x3 chunk area around the player
const positions = scanner.scanAroundPlayer(1);
console.log(`Found ${positions.length} matching blocks`);
```

#### `scanChunkRange(centerX, centerZ, chunkRange)`

Scans chunks around a specified center point.

**Parameters:**
- `centerX` (number): X coordinate of center chunk
- `centerZ` (number): Z coordinate of center chunk
- `chunkRange` (number): Range of chunks to scan

**Returns:**
- `List<Pos3D>`: List of positions of matching blocks

**Example:**
```javascript
// Scan around chunk coordinates (10, 15)
const positions = scanner.scanChunkRange(10, 15, 2);
```

### Area-Based Scanning

#### `scanCubeArea(pos, range)`

Scans a cubic area around a center position.

**Parameters:**
- `pos` (BlockPosHelper): Center position of the cube
- `range` (number): Range in blocks from center

**Returns:**
- `List<Pos3D>`: List of positions of matching blocks

**Example:**
```javascript
// Scan 10 blocks around position (100, 64, 200)
const centerPos = new BlockPosHelper(100, 64, 200);
const positions = scanner.scanCubeArea(centerPos, 10);
```

#### `scanCubeArea(x1, y1, z1, x2, y2, z2)`

Scans a rectangular area between two coordinates.

**Parameters:**
- `x1, y1, z1` (number): First corner coordinates (inclusive)
- `x2, y2, z2` (number): Second corner coordinates (exclusive)

**Returns:**
- `List<Pos3D>`: List of positions of matching blocks

**Example:**
```javascript
// Scan from (100, 60, 200) to (110, 70, 210)
const positions = scanner.scanCubeArea(100, 60, 200, 110, 70, 210);
```

#### `scanCubeAreaInclusive(x1, y1, z1, x2, y2, z2)`

Scans a rectangular area with both coordinates inclusive.

**Parameters:**
- `x1, y1, z1` (number): First corner coordinates (inclusive)
- `x2, y2, z2` (number): Second corner coordinates (inclusive)

**Returns:**
- `List<Pos3D>`: List of positions of matching blocks

#### `scanSphereArea(pos, radius)`

Scans a spherical area around a center position.

**Parameters:**
- `pos` (Pos3D): Center position of the sphere
- `radius` (number): Radius of the sphere in blocks

**Returns:**
- `List<Pos3D>`: List of positions of matching blocks

**Example:**
```javascript
// Scan a 15-block radius around player position
const playerPos = new Pos3D(Player.getPlayer().getPos());
const positions = scanner.scanSphereArea(playerPos, 15);
```

### Reachable Block Scanning

#### `scanReachable()`

Scans for blocks within player's reach distance.

**Returns:**
- `List<Pos3D>`: List of positions of reachable matching blocks

**Example:**
```javascript
// Find all reachable ore blocks
const reachable = scanner.scanReachable();
```

#### `scanReachable(pos, reach, strict)`

Scans for reachable blocks from a specific position.

**Parameters:**
- `pos` (Pos3D): Position to scan from
- `reach` (number): Maximum reach distance
- `strict` (boolean): Whether to check block outlines (default: true)

**Returns:**
- `List<Pos3D>`: List of positions of reachable matching blocks

#### `scanClosestReachable()`

Finds the closest reachable block.

**Returns:**
- `Pos3D | null`: Position of the closest matching block, or null if none found

**Example:**
```javascript
// Find the closest chest to interact with
const nearestChest = scanner.scanClosestReachable();
if (nearestChest) {
    console.log(`Chest found at ${nearestChest.toString()}`);
}
```

### Block Counting

#### `getBlocksInChunk(chunkX, chunkZ, ignoreState)`

Gets a count of blocks matching the criteria in a specific chunk.

**Parameters:**
- `chunkX` (number): X coordinate of the chunk
- `chunkZ` (number): Z coordinate of the chunk
- `ignoreState` (boolean): Whether to combine different states of the same block

**Returns:**
- `Map<String, Integer>`: Map of block names/IDs to their counts

**Example:**
```javascript
// Count blocks in chunk (5, 10)
const blockCounts = scanner.getBlocksInChunk(5, 10, false);
for (const [blockId, count] of Object.entries(blockCounts)) {
    console.log(`${blockId}: ${count}`);
}
```

#### `getBlocksInChunks(centerX, centerZ, chunkRange, ignoreState)`

Gets block counts across multiple chunks.

**Parameters:**
- `centerX` (number): X coordinate of center chunk
- `centerZ` (number): Z coordinate of center chunk
- `chunkRange` (number): Range of chunks to scan
- `ignoreState` (boolean): Whether to combine different states

**Returns:**
- `Map<String, Integer>`: Map of block names/IDs to their counts

### Utility Methods

#### `getCachedAmount()`

Gets the number of cached block states for performance monitoring.

**Returns:**
- `number`: Number of cached block states

**Example:**
```javascript
console.log(`Cached ${scanner.getCachedAmount()} block states`);
```

## WorldScannerBuilder

The WorldScannerBuilder provides a fluent interface for creating scanners without needing to write custom filter functions.

### Basic Filter Types

#### String Filters

```javascript
// Find blocks by name
const scanner = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("chest", "barrel", "shulker")
    .build();
```

#### Property Filters

```javascript
// Find blocks with specific properties
const scanner = World.getWorldScanner()
    .withBlockFilter("getHardness").is("<=", 3)
    .andStateFilter("isToolRequired").is(false)
    .build();
```

#### Method Filters

```javascript
// Find blocks based on method results
const scanner = World.getWorldScanner()
    .withBlockFilter("getLuminance").is(">", 0)
    .andStateFilter("getOpacity").is("==", 0)
    .build();
```

### Filter Operations

#### Logical Operations

```javascript
const scanner = World.getWorldScanner()
    .withStringBlockFilter().contains("ore")
    .orStringBlockFilter().contains("diamond")
    .andStateFilter("isAir").is(false)
    .build();
```

#### Negation

```javascript
const scanner = World.getWorldScanner()
    .withStringBlockFilter().contains("wood")
    .notStateFilter()  // Negate all state filters
    .build();
```

### Available Methods for WorldScannerBuilder

#### Filter Creation Methods:
- `withStateFilter(method)`, `andStateFilter(method)`, `orStateFilter(method)`
- `withBlockFilter(method)`, `andBlockFilter(method)`, `orBlockFilter(method)`
- `withStringStateFilter()`, `andStringStateFilter()`, `orStringStateFilter()`
- `withStringBlockFilter()`, `andStringBlockFilter()`, `orStringBlockFilter()`

#### Filter Value Methods:
- `is(...args)`, `test(...args)` - Set filter conditions
- `equals(...args)`, `contains(...args)`, `startsWith(...args)`, `endsWith(...args)`, `matches(...args)` - String operations

## Usage Examples

### Example 1: Find All Storage Blocks

```javascript
// Create scanner for storage blocks
const storageScanner = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("chest", "barrel", "shulker_box", "hopper")
    .build();

// Scan around player
const storageBlocks = storageScanner.scanAroundPlayer(2);
console.log(`Found ${storageBlocks.length} storage blocks`);

// Find the closest storage block
const nearestStorage = storageScanner.scanClosestReachable();
if (nearestStorage) {
    console.log(`Nearest storage at: ${nearestStorage.toString()}`);
}
```

### Example 2: Find Valuable Ores

```javascript
// Scanner for valuable ores with specific properties
const oreScanner = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond_ore", "emerald_ore", "ancient_debris")
    .andStateFilter("isToolRequired").is(true)
    .build();

// Scan a large area
const playerChunkX = Player.getPlayer().getChunkX();
const playerChunkZ = Player.getPlayer().getChunkZ();
const orePositions = oreScanner.scanChunkRange(playerChunkX, playerChunkZ, 5);

console.log(`Found valuable ores: ${orePositions.length}`);
orePositions.forEach(pos => console.log(`  ${pos.toString()}`));
```

### Example 3: Count Blocks in Area

```javascript
// Count different types of stone
const stoneScanner = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("stone", "granite", "diorite", "andesite")
    .build();

// Get counts in current chunk
const playerChunkX = Player.getPlayer().getChunkX();
const playerChunkZ = Player.getPlayer().getChunkZ();
const stoneCounts = stoneScanner.getBlocksInChunk(playerChunkX, playerChunkZ, true);

console.log("Stone blocks in current chunk:");
for (const [blockType, count] of Object.entries(stoneCounts)) {
    console.log(`  ${blockType}: ${count}`);
}
```

### Example 4: Find Light Sources

```javascript
// Find blocks that emit light
const lightScanner = World.getWorldScanner()
    .withBlockFilter("getLuminance").is(">", 0)
    .andBlockFilter("isAir").is(false)
    .build();

// Scan a sphere around player
const playerPos = new Pos3D(Player.getPlayer().getPos());
const lightSources = lightScanner.scanSphereArea(playerPos, 32);

console.log(`Found ${lightSources.length} light sources`);
```

## Performance Considerations

1. **Reuse Scanners**: Create scanner instances once and reuse them to benefit from caching
2. **Appropriate Ranges**: Use reasonable scan ranges to avoid performance issues
3. **Filter Order**: More restrictive filters first can improve performance
4. **Parallel Processing**: The scanner automatically uses parallel streams when possible

## Notes and Limitations

- The scanner can only search in chunks that are currently loaded
- Large scan areas may cause performance issues
- Block state filtering requires the exact state properties
- Cache size is typically 200-400 block states
- The scanner respects world boundaries and loaded chunks only

## See Also

- [WorldScannerBuilder](WorldScannerBuilder.md) - For building scanners with fluent interface
- [BlockHelper](BlockHelper.md) - For block-level operations
- [BlockStateHelper](BlockStateHelper.md) - For block state operations
- [Pos3D](Pos3D.md) - For 3D position handling
- [BlockPosHelper](BlockPosHelper.md) - For block position operations