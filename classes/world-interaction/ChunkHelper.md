# ChunkHelper

The `ChunkHelper` class provides access to Minecraft chunk data and functionality within JsMacros scripts. This class allows you to interact with 16×16 world chunks, including reading block information, accessing entities, and querying various chunk properties.

## Overview

A chunk in Minecraft is a 16×16×384 section of the world that contains blocks, entities, and various metadata. The `ChunkHelper` class provides methods to:

- Get chunk coordinates and dimensions
- Access blocks and their properties within the chunk
- Query heightmaps and biome information
- Find entities and tile entities in the chunk
- Search for specific block types
- Iterate through all blocks in the chunk

## Accessing ChunkHelper

ChunkHelper instances are typically obtained through world-related operations or events. Common ways to access a ChunkHelper include:

```javascript
// Example: Accessing current chunk (this would typically be done through world methods)
let chunk = World.getChunkAt(Player.getPlayer().getBlockPos());
```

## Methods

### Position and Coordinates

#### `getChunkX()`
**Returns:** `number`

Returns the X coordinate of the chunk (not the world coordinate). This is the chunk coordinate, ranging from negative to positive values depending on world location.

```javascript
let chunkX = chunk.getChunkX();
console.log("Chunk X coordinate: " + chunkX);
```

#### `getChunkZ()`
**Returns:** `number`

Returns the Z coordinate of the chunk (not the world coordinate). This is the chunk coordinate, ranging from negative to positive values depending on world location.

```javascript
let chunkZ = chunk.getChunkZ();
console.log("Chunk Z coordinate: " + chunkZ);
```

#### `getStartingBlock()`
**Returns:** `BlockPosHelper`

Returns the starting block position of this chunk (coordinate 0, 0, 0 relative to the chunk, which corresponds to world coordinates chunkX×16, chunkBottomY, chunkZ×16).

```javascript
let startingBlock = chunk.getStartingBlock();
console.log("Chunk starts at: " + startingBlock.toString());
```

#### `getOffsetBlock(xOffset, y, zOffset)`
**Parameters:**
- `xOffset` (number): The X offset within the chunk (0-15)
- `y` (number): The actual world Y coordinate
- `zOffset` (number): The Z offset within the chunk (0-15)

**Returns:** `BlockPosHelper`

Returns a block position relative to the starting block of this chunk by the specified offsets.

```javascript
let block = chunk.getOffsetBlock(8, 64, 8); // Center of chunk at Y=64
console.log("Block at chunk center: " + block.toString());
```

### Chunk Dimensions

#### `getMaxBuildHeight()`
**Returns:** `number`

Returns the maximum build height of this chunk (typically 320 in Minecraft 1.17+).

```javascript
let maxHeight = chunk.getMaxBuildHeight();
console.log("Maximum build height: " + maxHeight);
```

#### `getMinBuildHeight()`
**Returns:** `number`

Returns the minimum build height of this chunk (typically -64 in Minecraft 1.17+).

```javascript
let minHeight = chunk.getMinBuildHeight();
console.log("Minimum build height: " + minHeight);
```

#### `getHeight()`
**Returns:** `number`

Returns the total height of this chunk (max height - min height).

```javascript
let height = chunk.getHeight();
console.log("Chunk height: " + height);
```

### Block and World Information

#### `getBiome(xOffset, y, zOffset)`
**Parameters:**
- `xOffset` (number): The X offset within the chunk (0-15)
- `y` (number): The Y coordinate in world space
- `zOffset` (number): The Z offset within the chunk (0-15)

**Returns:** `string`

Returns the biome identifier at the given position within the chunk.

```javascript
let biome = chunk.getBiome(8, 64, 8);
console.log("Biome at chunk center: " + biome);
// Example output: "minecraft:plains"
```

### Entity and Tile Entity Access

#### `getEntities()`
**Returns:** `List<EntityHelper>`

Returns a list of all entities currently inside this chunk.

```javascript
let entities = chunk.getEntities();
console.log("Found " + entities.size() + " entities in chunk");

entities.forEach(entity => {
    console.log("Entity: " + entity.getType());
});
```

#### `getTileEntities()`
**Returns:** `List<BlockPosHelper>`

Returns a list of all tile entity (block entity) positions inside this chunk. Tile entities include chests, furnaces, signs, etc.

```javascript
let tileEntities = chunk.getTileEntities();
console.log("Found " + tileEntities.size() + " tile entities in chunk");

tileEntities.forEach(pos => {
    console.log("Tile entity at: " + pos.toString());
});
```

### Chunk Properties

#### `getInhabitedTime()`
**Returns:** `number`

Returns the cumulative time (in ticks) that players have spent inside this chunk. This value affects local difficulty - the higher the inhabited time, the more difficult the chunk becomes, resulting in stronger mob spawns.

```javascript
let inhabitedTime = chunk.getInhabitedTime();
console.log("Inhabited time: " + inhabitedTime + " ticks");
```

### Block Search Methods

### Heightmap Methods

#### `getTopYAt(xOffset, zOffset, heightmap)`
**Parameters:**
- `xOffset` (number): The X offset within the chunk (0-15)
- `zOffset` (number): The Z offset within the chunk (0-15)
- `heightmap` (Heightmap): The heightmap type to use

**Returns:** `number`

Returns the maximum Y position of all blocks at the specified position according to the given heightmap.

```javascript
// Note: Heightmap access depends on available heightmap constants
let topY = chunk.getTopYAt(8, 8, Heightmap.Type.WORLD_SURFACE);
console.log("Top Y at chunk center: " + topY);
```

#### `getHeightmaps()`
**Returns:** `Collection<Heightmap>`

Returns a collection of all raw heightmap data for this chunk.

#### `getSurfaceHeightmap()`
**Returns:** `Heightmap`

Returns the raw world surface heightmap for this chunk.

#### `getOceanFloorHeightmap()`
**Returns:** `Heightmap`

Returns the raw ocean floor heightmap for this chunk.

#### `getMotionBlockingHeightmap()`
**Returns:** `Heightmap`

Returns the raw motion blocking heightmap for this chunk (blocks that prevent movement).

#### `getMotionBlockingNoLeavesHeightmap()`
**Returns:** `Heightmap`

Returns the raw motion blocking heightmap for this chunk, excluding leaves.

### Block Iteration

#### `forEach(includeAir, callback)`
**Parameters:**
- `includeAir` (boolean): Whether to include air blocks in the iteration
- `callback` (MethodWrapper<BlockDataHelper, ?, ?, ?>): Function to call for each block

**Returns:** `ChunkHelper` (for method chaining)

Iterates through all blocks in the chunk and calls the callback function for each block (optionally excluding air blocks).

```javascript
// Iterate through all non-air blocks in the chunk
chunk.forEach(false, (blockData) => {
    let blockType = blockData.getId();
    if (blockType.includes("ore")) {
        console.log("Found ore at: " + blockData.getX() + ", " +
                   blockData.getY() + ", " + blockData.getZ());
    }
});

// Iterate through all blocks including air
chunk.forEach(true, (blockData) => {
    // Process all blocks
});
```

## Utility Methods

#### `toString()`
**Returns:** `string`

Returns a string representation of the chunk containing its coordinates.

```javascript
let chunkString = chunk.toString();
console.log(chunkString);
// Example output: "ChunkHelper:{\"x\": 5, \"z\": -3}"
```

## Usage Examples

### Basic Chunk Analysis
```javascript
// Get current chunk
let playerPos = Player.getPlayer().getBlockPos();
let chunk = World.getChunkAt(playerPos);

// Display basic information
console.log("Chunk Info:");
console.log("Position: " + chunk.getChunkX() + ", " + chunk.getChunkZ());
console.log("Height range: " + chunk.getMinBuildHeight() + " to " + chunk.getMaxBuildHeight());
console.log("Biome at center: " + chunk.getBiome(8, 64, 8));
```

### Resource Finding
```javascript
// Check for valuable resources in the current chunk
let hasDiamonds = chunk.containsAny("diamond_ore");
let hasIron = chunk.containsAny("iron_ore");
let hasGold = chunk.containsAny("gold_ore");

if (hasDiamonds || hasIron || hasGold) {
    console.log("Valuable resources found in this chunk!");

    // Search through blocks to find exact locations
    chunk.forEach(false, (blockData) => {
        let blockId = blockData.getId();
        if (blockId.includes("ore")) {
            console.log("Found " + blockId + " at: " +
                       blockData.getX() + ", " + blockData.getY() + ", " + blockData.getZ());
        }
    });
}
```

### Entity Monitoring
```javascript
// Monitor entities in the current chunk
function checkChunkEntities() {
    let playerPos = Player.getPlayer().getBlockPos();
    let chunk = World.getChunkAt(playerPos);

    let entities = chunk.getEntities();
    let hostileCount = 0;
    let passiveCount = 0;

    entities.forEach(entity => {
        let type = entity.getType();
        if (type.includes("zombie") || type.includes("skeleton") || type.includes("creeper")) {
            hostileCount++;
        } else if (type.includes("cow") || type.includes("pig") || type.includes("sheep")) {
            passiveCount++;
        }
    });

    console.log("Chunk entities - Hostile: " + hostileCount + ", Passive: " + passiveCount);
}
```

### Structure Detection
```javascript
// Check if chunk might contain specific structures
function detectStructures(chunk) {
    // Look for structure indicators
    let hasBricks = chunk.containsAny("bricks", "stone_bricks");
    let hasLogs = chunk.containsAny("oak_log", "spruce_log", "birch_log");
    let hasWool = chunk.containsAny("white_wool", "orange_wool", "blue_wool");

    if (hasBricks) {
        console.log("Possible village or stronghold in chunk");
    }

    if (hasLogs && hasWool) {
        console.log("Possible structure with buildings");
    }

    // Check tile entities for chests (dungeons, mineshafts, etc.)
    let tileEntities = chunk.getTileEntities();
    let chestCount = 0;

    tileEntities.forEach(pos => {
        let block = World.getBlock(pos);
        if (block.getId().includes("chest")) {
            chestCount++;
        }
    });

    if (chestCount > 0) {
        console.log("Found " + chestCount + " chests - likely dungeon or structure");
    }
}
```

## Important Notes

1. **Coordinate System**: Chunk coordinates are different from world coordinates. A chunk at (5, 3) covers world blocks from X=80 to X=95 and Z=48 to Z=63.

2. **Performance**: Methods like `forEach()` and the search methods can be computationally expensive for large chunks. Use them judiciously.

3. **Block IDs**: When searching for blocks, you can often omit the "minecraft:" namespace, but including it ensures more precise matching.

4. **World Access**: ChunkHelper instances are typically only available for chunks that are currently loaded by the game.

5. **Thread Safety**: Be careful when using ChunkHelper in event listeners - ensure the chunk is still loaded when accessing it.

6. **Heightmaps**: Different heightmap types serve different purposes - WORLD_SURFACE gives the highest non-air block, while MOTION_BLOCKING gives blocks that prevent movement.

7. **Inhabited Time**: This value affects mob spawning difficulty. High inhabited times can result in more dangerous mobs spawning in the area.

## Related Classes

- `BlockPosHelper`: For working with block positions
- `BlockDataHelper`: For detailed block information (used in forEach callback)
- `EntityHelper`: For working with entities found in chunks
- `World`: For accessing chunks and world data