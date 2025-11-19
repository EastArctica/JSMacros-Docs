# BlockDataHelper

## Overview

The `BlockDataHelper` class is a comprehensive helper class in JSMacros that provides access to block data and properties at specific positions in the Minecraft world. It combines information about a block's state, position, and entity data (if the block has a tile entity) into a single, convenient interface.

This class is primarily used in world interaction contexts where you need to access detailed information about blocks in the world, such as in event handlers or when scanning the world for specific block types.

## How to Access

`BlockDataHelper` instances are typically obtained through:

- **Block Events**: Many block-related events provide `BlockDataHelper` objects
- **World Methods**: When querying blocks at specific coordinates
- **Raycasting**: When targeting blocks with line of sight

```javascript
// Example: From a block interaction event
event.on("BlockInteract", (e) => {
    const blockData = e.block;
    console.log(`Block at ${blockData.getX()}, ${blockData.getY()}, ${blockData.getZ()} is ${blockData.getId()}`);
});

// Example: Getting block data at specific position
const pos = World.getblockPos(Player.getPlayer().getX(), Player.getPlayer().getY(), Player.getPlayer().getZ());
const blockData = World.getBlock(pos.getX(), pos.getY(), pos.getZ());
```

## Properties and Methods

### Position Information

#### `getX()`
- **Returns**: `number` - The X coordinate of the block
- **Since**: 1.1.7

#### `getY()`
- **Returns**: `number` - The Y coordinate of the block
- **Since**: 1.1.7

#### `getZ()`
- **Returns**: `number` - The Z coordinate of the block
- **Since**: 1.1.7

#### `getBlockPos()`
- **Returns**: `BlockPosHelper` - A position helper for the block's location
- **Since**: 1.2.7

### Block Identification

#### `getId()`
- **Returns**: `string` - The block ID (e.g., "minecraft:stone", "minecraft:oak_log")
- **Note**: This returns the registered block ID in the format "namespace:block_name"

#### `getName()`
- **Returns**: `TextHelper` - The translated name of the block
- **Note**: Before version 1.6.5, this returned a plain string. Now it returns a TextHelper object.

### Block State Information

#### `getBlockState()`
- **Returns**: `Map<string, string>` - Block state properties as key-value pairs
- **Since**: 1.1.7
- **Example**: For a door, this might return `{"facing": "north", "open": "false", "half": "lower"}`

#### `getBlockStateHelper()`
- **Returns**: `BlockStateHelper` - A helper object providing detailed block state information
- **Since**: 1.6.5
- **Note**: This provides access to more advanced block state properties like hardness, luminance, etc.

### Block Information

#### `getBlock()`
- **Returns**: `BlockHelper` - A helper object for the block type
- **Since**: 1.6.5

#### `getBlockHelper()` ⚠️ **Deprecated**
- **Returns**: `BlockHelper` - A helper object for the block type
- **Since**: 1.6.5
- **Deprecated**: Use `getBlock()` instead
- **Note**: This method still works but is kept for backward compatibility

### NBT Data

#### `getNBT()`
- **Returns**: `NBTElementHelper.NBTCompoundHelper | null` - The NBT data of the block's tile entity
- **Since**: 1.5.1
- **Note**:
  - Returns `null` if the block has no tile entity
  - Before version 1.6.5, this returned a `Map<string, string>`
  - Only blocks with tile entities (chests, furnaces, signs, etc.) will have NBT data

### Raw Data Access

#### `getRawBlock()`
- **Returns**: `Block` - The raw Minecraft Block object (advanced use only)

#### `getRawBlockState()`
- **Returns**: `BlockState` - The raw Minecraft BlockState object (advanced use only)

#### `getRawBlockEntity()`
- **Returns**: `BlockEntity | null` - The raw Minecraft BlockEntity object (advanced use only)

## Usage Examples

### Basic Block Information

```javascript
// Get basic information about a block
function analyzeBlock(blockData) {
    if (!blockData) {
        console.log("No block data available");
        return;
    }

    console.log(`Block Information:`);
    console.log(`  Position: ${blockData.getX()}, ${blockData.getY()}, ${blockData.getZ()}`);
    console.log(`  Type: ${blockData.getId()}`);
    console.log(`  Name: ${blockData.getName().getString()}`);
    console.log(`  Block State: ${JSON.stringify(blockData.getBlockState())}`);
}
```

### Checking for Specific Block Types

```javascript
// Check if a block is a chest
function isChest(blockData) {
    if (!blockData) return false;

    const blockId = blockData.getId();
    return blockId.includes("chest") || blockId.includes("shulker_box");
}

// Check if a block is a furnace
function isFurnace(blockData) {
    if (!blockData) return false;

    const blockId = blockData.getId();
    return blockId.includes("furnace") || blockId.includes("smoker") || blockId.includes("blast_furnace");
}
```

### Working with Block States

```javascript
// Get specific block state properties
function analyzeBlockState(blockData) {
    if (!blockData) return;

    const state = blockData.getBlockState();

    // Check for directional blocks
    if (state.facing) {
        console.log(`Block faces: ${state.facing}`);
    }

    // Check for waterlogged blocks
    if (state.waterlogged === "true") {
        console.log("Block is waterlogged");
    }

    // Check for doors and gates
    if (state.open !== undefined) {
        console.log(`Block is ${state.open === "true" ? "open" : "closed"}`);
    }
}
```

### Working with NBT Data

```javascript
// Analyze container blocks
function analyzeContainer(blockData) {
    if (!blockData) return;

    const nbt = blockData.getNBT();
    if (!nbt) {
        console.log("Block has no NBT data");
        return;
    }

    const blockId = blockData.getId();

    if (blockId.includes("chest") || blockId.includes("shulker_box")) {
        const items = nbt.get("Items")?.asList() || [];
        console.log(`Container has ${items.length} items`);

        // List items in the container
        items.forEach((itemNBT, index) => {
            const itemName = itemNBT.get("id")?.asString() || "unknown";
            const count = itemNBT.get("Count")?.asByte() || 0;
            console.log(`  Slot ${index}: ${count}x ${itemName}`);
        });
    }

    if (blockId.includes("sign")) {
        const text1 = nbt.get("Text1")?.asString() || "";
        const text2 = nbt.get("Text2")?.asString() || "";
        const text3 = nbt.get("Text3")?.asString() || "";
        const text4 = nbt.get("Text4")?.asString() || "";

        console.log("Sign text:");
        console.log(`  Line 1: ${text1}`);
        console.log(`  Line 2: ${text2}`);
        console.log(`  Line 3: ${text3}`);
        console.log(`  Line 4: ${text4}`);
    }
}
```

### Advanced Block Analysis

```javascript
// Complete block analysis
function fullBlockAnalysis(blockData) {
    if (!blockData) return;

    console.log("=== Complete Block Analysis ===");

    // Basic info
    console.log(`Position: [${blockData.getX()}, ${blockData.getY()}, ${blockData.getZ()}]`);
    console.log(`Block ID: ${blockData.getId()}`);
    console.log(`Display Name: ${blockData.getName().getString()}`);

    // Block state
    const state = blockData.getBlockState();
    if (Object.keys(state).length > 0) {
        console.log("Block State Properties:");
        Object.entries(state).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
    }

    // Block helper info
    const blockHelper = blockData.getBlock();
    const blockStateHelper = blockData.getBlockStateHelper();

    console.log(`Block hardness: ${blockStateHelper.getHardness()}`);
    console.log(`Block luminance: ${blockStateHelper.getLuminance()}`);
    console.log(`Is solid: ${blockStateHelper.isSolid()}`);
    console.log(`Is air: ${blockStateHelper.isAir()}`);
    console.log(`Is liquid: ${blockStateHelper.isLiquid()}`);
    console.log(`Tool required: ${blockStateHelper.isToolRequired()}`);

    // NBT data
    const nbt = blockData.getNBT();
    if (nbt) {
        console.log("Has NBT data (tile entity present)");
    }

    console.log("=== End Analysis ===\n");
}
```

### Event Handler Example

```javascript
// Example: Handle block break events
event.on("BlockBreak", (e) => {
    const blockData = e.block;

    // Log broken block info
    console.log(`Block broken at ${blockData.getX()}, ${blockData.getY()}, ${blockData.getZ()}`);
    console.log(`Broken block: ${blockData.getId()}`);

    // Check if it was a valuable block
    const valuableBlocks = ["diamond_ore", "emerald_ore", "ancient_debris"];
    const isValuable = valuableBlocks.some(valuable =>
        blockData.getId().includes(valuable)
    );

    if (isValuable) {
        console.log(`⚠️ Valuable block detected: ${blockData.getId()}`);
        // Additional handling for valuable blocks
    }
});

// Example: Handle block place events
event.on("BlockPlace", (e) => {
    const blockData = e.block;

    console.log(`Block placed at ${blockData.getX()}, ${blockData.getY()}, ${blockData.getZ()}`);
    console.log(`Placed block: ${blockData.getId()}`);

    // Check if container was placed
    if (blockData.getNBT()) {
        console.log("Container block placed - has NBT data");
    }
});
```

## Important Notes

### Version Compatibility

- **1.1.7**: Added position methods (`getX()`, `getY()`, `getZ()`) and `getBlockState()`
- **1.2.7**: Added `getBlockPos()` method
- **1.5.1**: Added `getNBT()` method (returned Map<string, string>)
- **1.6.5**: Major changes:
  - `getName()` now returns `TextHelper` instead of string
  - `getNBT()` now returns `NBTElementHelper.NBTCompoundHelper`
  - Added `getBlockStateHelper()`, `getBlock()`
  - Deprecated `getBlockHelper()`

### NBT Data Considerations

- Only blocks with tile entities will have NBT data
- Common blocks with NBT data: chests, furnaces, signs, hoppers, dispensers, etc.
- NBT data can be null for simple blocks like stone, dirt, wood planks
- Be careful when accessing NBT data - always check for null

### Performance Considerations

- Creating BlockDataHelper instances is generally lightweight
- Accessing NBT data can be slightly more expensive than other properties
- When scanning large areas, consider caching block data if needed multiple times

### Common Use Cases

1. **Block Detection**: Checking what type of block exists at a position
2. **Redstone Automation**: Reading block states of redstone components
3. **Inventory Management**: Accessing container contents via NBT data
4. **Building Tools**: Analyzing blocks for construction assistance
5. **Mining Assistants**: Identifying valuable ores or specific rock types
6. **Farm Automation**: Checking crop growth states and farmland moisture

## Related Classes

- **`BlockStateHelper`**: Provides detailed block state information and properties
- **`BlockHelper`**: Represents block type information
- **`BlockPosHelper`**: Represents block position coordinates
- **`NBTElementHelper`**: Handles NBT data operations
- **`TextHelper`**: Handles text and translation components