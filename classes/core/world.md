# World

Provides access to world data, entities, blocks, and various world-related operations. The World library allows scripts to interact with the Minecraft world, including block detection, entity searching, world scanning, and more.

**Variable Name:** `World`
**Library Name:** `World`
**Package:** `xyz.wagyourtail.jsmacros.client.api.library.impl`
**Since:** 1.0.0

## Overview

The World library is one of the core JsMacros libraries available in all scripts. It provides comprehensive access to world information and manipulation capabilities. You can use it to:

- Get block information at specific coordinates
- Find entities and players
- Scan the world for specific blocks or conditions
- Access world properties like time and weather
- Play sounds and particles
- Get scoreboard information

## Server Performance Stats

The World library provides read-only access to server performance statistics:

```js
// Server TPS (Ticks Per Second) information
Chat.log(`Instant TPS: ${World.serverInstantTPS}`);
Chat.log(`1 Min Average TPS: ${World.server1MAverageTPS}`);
Chat.log(`5 Min Average TPS: ${World.server5MAverageTPS}`);
Chat.log(`15 Min Average TPS: ${World.server15MAverageTPS}`);
```

**Properties:**
- `World.serverInstantTPS` - Current server TPS
- `World.server1MAverageTPS` - 1-minute average TPS
- `World.server5MAverageTPS` - 5-minute average TPS
- `World.server15MAverageTPS` - 15-minute average TPS

## World State

### World.isWorldLoaded()

Check if a world is currently loaded.

```js
if (World.isWorldLoaded()) {
    Chat.log("World is loaded and ready!");
} else {
    Chat.log("No world currently loaded.");
}
```

**Return Type:** `boolean`
**Returns:** `true` if a world is loaded, `false` otherwise
**Usage Notes:** Always check this before performing world operations

## Block Operations

### World.getBlock()

Get block information at specific coordinates.

```js
// Get block at specific coordinates
const block = World.getBlock(100, 64, 200);
if (block) {
    Chat.log(`Block type: ${block.getId()}`);
    Chat.log(`Block state: ${block.getState()}`);
}

// Using Pos3D
const pos = new Pos3D(100, 64, 200);
const block2 = World.getBlock(pos);

// Using BlockPosHelper
const blockPos = new BlockPosHelper(100, 64, 200);
const block3 = World.getBlock(blockPos);
```

**Parameters:**
- `x` (`int` or `Pos3D` or `BlockPosHelper`): X coordinate or position object
- `y` (`int`): Y coordinate (when using separate coordinates)
- `z` (`int`): Z coordinate (when using separate coordinates)

**Return Type:** `BlockDataHelper | null`
**Returns:** Block data helper or `null` if no block or world not loaded

### World.findBlocksMatching()

Find blocks matching specific criteria within a chunk range.

```js
// Find all diamond ore within 8 chunks
const diamondPositions = World.findBlocksMatching("minecraft:diamond_ore", 8);
Chat.log(`Found ${diamondPositions.length} diamond ore blocks`);

// Find multiple block types
const oreTypes = ["minecraft:diamond_ore", "minecraft:iron_ore", "minecraft:gold_ore"];
const orePositions = World.findBlocksMatching(oreTypes, 5);
Chat.log(`Found ${orePositions.length} ore blocks`);

// Around specific chunk coordinates
const centerChunkX = Player.getPlayer().getBlockX() >> 4;
const centerChunkZ = Player.getPlayer().getBlockZ() >> 4;
const nearbyOres = World.findBlocksMatching(centerChunkX, centerChunkZ, "minecraft:coal_ore", 3);
```

**Parameters:**
- `id` (`String` or `String[]`): Block ID(s) to find
- `chunkrange` (`int`): Number of chunks to search around center
- `centerX` (`int`, optional): Center chunk X coordinate
- `centerZ` (`int`, optional): Center chunk Z coordinate

**Return Type:** `List<Pos3D> | null`
**Returns:** List of positions where matching blocks were found

### World.getWorldScanner()

Create a sophisticated world scanner with advanced filtering capabilities.

```js
// Create a scanner to find chests facing south with specific properties
const scanner = World.getWorldScanner()
    .withBlockFilter("getHardness").is("<=", 10)
    .andStringBlockFilter().contains("chest", "barrel")
    .withStringStateFilter().contains("facing=south")
    .andStateFilter("isToolRequired").is(false)
    .build();

// Use the scanner
const results = scanner.scanChunkRange(0, 0, 5);
Chat.log(`Found ${results.length} matching blocks`);

// Advanced filtering with custom functions
const customScanner = World.getWorldScannerBuilder()
    .withBlockFilter("getId").equals("minecraft:chest")
    .andStateFilter("hasInventory").is(true)
    .build();
```

**Return Type:** `WorldScannerBuilder`
**Returns:** Builder for creating custom world scanners
**Usage Notes:** Provides powerful filtering capabilities for complex searches

### World.iterateSphere()

Iterate over all blocks in a sphere around a center position.

```js
// Find all valuable blocks within 16 blocks of player
const playerPos = Player.getPlayer().getBlockPos();
World.iterateSphere(playerPos, 16, (block) => {
    const blockId = block.getId();
    if (blockId.includes("ore") || blockId.includes("diamond")) {
        Chat.log(`Found valuable block at ${block.getPos()}`);
    }
});

// Include air blocks
World.iterateSphere(playerPos, 10, false, (block) => {
    // Process all blocks including air
});
```

**Parameters:**
- `pos` (`BlockPosHelper`): Center position
- `radius` (`int`): Search radius
- `ignoreAir` (`boolean`, optional): Whether to ignore air blocks (default: true)
- `callback` (`MethodWrapper`): Function called for each block

### World.iterateBox()

Iterate over all blocks in a rectangular area.

```js
// Check all blocks in a mining area
const pos1 = new BlockPosHelper(100, 50, 100);
const pos2 = new BlockPosHelper(110, 60, 110);

World.iterateBox(pos1, pos2, (block) => {
    if (block.getId() === "minecraft:stone") {
        // Process stone blocks
    }
});

// Include air blocks
World.iterateBox(pos1, pos2, false, (block) => {
    // Process all blocks including air
});
```

**Parameters:**
- `pos1` (`BlockPosHelper`): First corner position
- `pos2` (`BlockPosHelper`): Second corner position
- `ignoreAir` (`boolean`, optional): Whether to ignore air blocks (default: true)
- `callback` (`MethodWrapper`): Function called for each block

### World.getChunk()

Get chunk information at specific chunk coordinates.

```js
// Get current chunk
const playerChunkX = Player.getPlayer().getBlockX() >> 4;
const playerChunkZ = Player.getPlayer().getBlockZ() >> 4;
const chunk = World.getChunk(playerChunkX, playerChunkZ);

if (chunk) {
    Chat.log(`Chunk position: ${chunk.getPos()}`);
}
```

**Parameters:**
- `x` (`int`): Chunk X coordinate (not world coordinates)
- `z` (`int`): Chunk Z coordinate (not world coordinates)

**Return Type:** `ChunkHelper | null`
**Returns:** Chunk helper or `null` if chunk not loaded
**Usage Notes:** Chunk coordinates are different from world coordinates. Divide world coordinates by 16 (right shift).

## Entity Operations

### World.getEntities()

Get entities in the world with various filtering options.

```js
// Get all entities
const allEntities = World.getEntities();
if (allEntities) {
    Chat.log(`Total entities: ${allEntities.length}`);
}

// Get specific entity types
const mobs = World.getEntities("minecraft:zombie", "minecraft:skeleton", "minecraft:creeper");
Chat.log(`Found ${mobs.length} hostile mobs`);

// Get entities within distance
const nearbyEntities = World.getEntities(32);
Chat.log(`Found ${nearbyEntities.length} entities within 32 blocks`);

// Combine filters
const nearbyMobs = World.getEntities(16, "minecraft:zombie", "minecraft:skeleton");
Chat.log(`Found ${nearbyMobs.length} hostile mobs within 16 blocks`);

// Custom filter
const customEntities = World.getEntities(JavaWrapper.methodToJava((entity) => {
    return entity.isAlive() && entity.isMob() && entity.getHealth() < 10;
}));
```

**Parameters:**
- Various combinations of distance, entity types, and custom filters

**Return Type:** `List<EntityHelper<?>> | null`
**Returns:** List of entity helpers or `null` if world not loaded

### World.getLoadedPlayers()

Get players currently loaded (within render distance).

```js
const loadedPlayers = World.getLoadedPlayers();
if (loadedPlayers) {
    Chat.log(`Players in render distance: ${loadedPlayers.length}`);
    loadedPlayers.forEach(player => {
        Chat.log(`- ${player.getName()}`);
    });
}
```

**Return Type:** `List<PlayerEntityHelper<PlayerEntity>> | null`
**Returns:** List of player entity helpers or `null` if world not loaded

### World.getPlayers()

Get all players from the tab list.

```js
const allPlayers = World.getPlayers();
if (allPlayers) {
    Chat.log(`Total players online: ${allPlayers.length}`);

    // Get specific player
    const playerEntry = World.getPlayerEntry("Notch");
    if (playerEntry) {
        Chat.log(`Notch is online! Game mode: ${playerEntry.getGameMode()}`);
    }
}
```

**Return Type:** `List<PlayerListEntryHelper> | null`
**Returns:** List of player list entries or `null` if not connected to server

### World.getPlayerEntry()

Get specific player information from the tab list.

```js
const playerEntry = World.getPlayerEntry("PlayerName");
if (playerEntry) {
    Chat.log(`Player found: ${playerEntry.getName()}`);
    Chat.log(`Game mode: ${playerEntry.getGameMode()}`);
    Chat.log(`Ping: ${playerEntry.getLatency()}ms`);
} else {
    Chat.log("Player not found or offline");
}
```

**Parameters:**
- `name` (`String`): Player name to search for

**Return Type:** `PlayerListEntryHelper | null`
**Returns:** Player list entry or `null` if not found

## Scoreboard and Game Information

### World.getScoreboards()

Get access to scoreboard information.

```js
const scoreboards = World.getScoreboards();
if (scoreboards) {
    // Get objective scores
    const objective = scoreboards.getObjective("kills");
    if (objective) {
        const scores = objective.getScores();
        scores.forEach(score => {
            Chat.log(`${score.getPlayerName()}: ${score.getScore()}`);
        });
    }

    // Get all objectives
    const objectives = scoreboards.getObjectives();
    Chat.log(`Available objectives: ${objectives.length}`);
}
```

**Return Type:** `ScoreboardsHelper | null`
**Returns:** Scoreboard helper or `null` if world not loaded

## Usage Patterns

### Mining Helper

```js
// Find all ores around the player
function findNearbyOres(radius) {
    const playerPos = Player.getPlayer().getBlockPos();
    const oreTypes = [
        "minecraft:coal_ore",
        "minecraft:iron_ore",
        "minecraft:gold_ore",
        "minecraft:diamond_ore",
        "minecraft:emerald_ore"
    ];

    const orePositions = World.findBlocksMatching(oreTypes, radius);
    Chat.log(`Found ${orePositions.length} ores within ${radius} chunks`);

    // Sort by distance
    orePositions.sort((a, b) => {
        const distA = playerPos.distanceTo(a);
        const distB = playerPos.distanceTo(b);
        return distA - distB;
    });

    return orePositions.slice(0, 10); // Return 10 closest ores
}
```

### Entity Monitor

```js
// Monitor hostile entities around player
function checkHostileEntities() {
    const hostileTypes = [
        "minecraft:zombie",
        "minecraft:skeleton",
        "minecraft:creeper",
        "minecraft:spider"
    ];

    const nearbyHostiles = World.getEntities(16, ...hostileTypes);
    if (nearbyHostiles && nearbyHostiles.length > 0) {
        Chat.log(`Warning: ${nearbyHostiles.length} hostile mobs nearby!`);

        nearbyHostiles.forEach(entity => {
            const distance = entity.distanceTo(Player.getPlayer());
            Chat.log(`- ${entity.getType()} at ${Math.round(distance)} blocks`);
        });
    }
}
```

### Area Scanner

```js
// Scan area for specific blocks
function scanArea(center, radius, targetBlockId) {
    const results = [];

    World.iterateSphere(center, radius, (block) => {
        if (block.getId() === targetBlockId) {
            results.push({
                position: block.getPos(),
                state: block.getState()
            });
        }
    });

    Chat.log(`Found ${results.length} ${targetBlockId} blocks`);
    return results;
}

// Usage
const playerPos = Player.getPlayer().getBlockPos();
const diamondVeins = scanArea(playerPos, 32, "minecraft:diamond_ore");
```

## Best Practices

1. **Always Check World Loaded**: Use `World.isWorldLoaded()` before world operations
2. **Handle Null Returns**: Many methods return `null` when world is not loaded
3. **Performance Considerations**: Large scans can be resource-intensive
4. **Chunk vs World Coordinates**: Understand the difference between chunk and world coordinates
5. **Filter Efficiency**: Use specific filters rather than scanning everything

## Related Classes

- **[BlockDataHelper](helpers/world/block-data-helper.md)** - Block information
- **[EntityHelper](helpers/world/entity-helper.md)** - Entity information
- **[PlayerEntityHelper](helpers/world/entity-helper.md)** - Player-specific entity helper
- **[ChunkHelper](helpers/world/chunk-helper.md)** - Chunk information
- **[ScoreboardsHelper](helpers/world/scoreboards-helper.md)** - Scoreboard data
- **[WorldScanner](classes/worldscanner.md)** - Advanced world scanning

## Error Handling

```js
// Safe world operations
function safeWorldOperation() {
    if (!World.isWorldLoaded()) {
        Chat.log("World not loaded - cannot perform operation");
        return;
    }

    try {
        const entities = World.getEntities();
        if (entities) {
            Chat.log(`Successfully found ${entities.length} entities`);
        }
    } catch (error) {
        Chat.log(`Error during world operation: ${error.message}`);
    }
}
```