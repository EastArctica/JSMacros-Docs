# FiltererBlockUpdate

The `FiltererBlockUpdate` class is an event filterer specifically designed for filtering `BlockUpdate` events in JSMacros. It allows you to create sophisticated filtering conditions based on block position, type, state, and update type, enabling precise control over when your block update event handlers should execute.

## Overview

FiltererBlockUpdate implements the `EventFilterer` interface and provides a fluent API for building complex filters for block-related events. This filterer is automatically associated with the `BlockUpdate` event through the `@Event` annotation on `EventBlockUpdate`.

## Class Declaration

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.event.filterer.FiltererBlockUpdate`
**Implements:** `EventFilterer`
**Since:** 1.9.1

## Public Fields

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `pos` | `BlockPosHelper` | Yes | Single block position to filter for. If `pos2` is also set, defines the start corner of a cuboid area. |
| `pos2` | `BlockPosHelper` | Yes | End corner of a cuboid area. When set with `pos`, filters for blocks within the defined area. Must be larger or equal to `pos`. |
| `blockId` | `String` (BlockId) | Yes | The block ID to filter for (e.g., "minecraft:stone"). Uses namespace format. |
| `blockState` | `Map<String, String>` | Yes | Block state properties to filter for (e.g., `{"facing": "north"}`). Map of property names to values. |
| `updateType` | `String` (BlockUpdateType) | Yes | The type of block update to filter for. Can be "STATE" or "ENTITY". |

## Methods

### Position Filtering Methods

#### `setPos(x, y, z)`
Sets a single block position to filter for.

**Parameters:**
- `x: int` - X coordinate
- `y: int` - Y coordinate
- `z: int` - Z coordinate

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
// Filter for updates at a specific block position
const filter = new FiltererBlockUpdate()
    .setPos(100, 64, 200);
```

#### `setPos(pos)`
Sets a single block position to filter for using a BlockPosHelper.

**Parameters:**
- `pos: BlockPosHelper | null` - Block position object, or null to clear position filter

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
// Using BlockPosHelper
const position = new BlockPosHelper(50, 70, -30);
const filter = new FiltererBlockUpdate()
    .setPos(position);

// Clear position filter
const clearedFilter = new FiltererBlockUpdate()
    .setPos(null);
```

#### `setArea(x1, y1, z1, x2, y2, z2)`
Sets a cuboid area to filter for using coordinates.

**Parameters:**
- `x1: int` - X coordinate of first corner
- `y1: int` - Y coordinate of first corner
- `z1: int` - Z coordinate of first corner
- `x2: int` - X coordinate of second corner
- `y2: int` - Y coordinate of second corner
- `z2: int` - Z coordinate of second corner

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

**Note:** The method automatically normalizes coordinates, so corner order doesn't matter.

```js
// Filter for updates within a 10x10x10 area
const filter = new FiltererBlockUpdate()
    .setArea(95, 60, 195, 105, 70, 205);
```

#### `setArea(pos1, pos2)`
Sets a cuboid area to filter for using BlockPosHelper objects.

**Parameters:**
- `pos1: BlockPosHelper` - First corner position
- `pos2: BlockPosHelper` - Second corner position

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
const corner1 = new BlockPosHelper(0, 0, 0);
const corner2 = new BlockPosHelper(16, 256, 16);
const filter = new FiltererBlockUpdate()
    .setArea(corner1, corner2);
```

### Block Type and State Methods

#### `setBlockId(id)`
Sets the block ID to filter for.

**Parameters:**
- `id: String | null` - Block ID in namespace format (e.g., "minecraft:stone"), or null to clear

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
// Filter for stone block updates
const filter = new FiltererBlockUpdate()
    .setBlockId("minecraft:stone");

// Alternative: omit namespace
const filter2 = new FiltererBlockUpdate()
    .setBlockId("stone");
```

#### `setUpdateType(type)`
Sets the block update type to filter for.

**Parameters:**
- `type: String | null` - Update type: "STATE" for block state changes, "ENTITY" for block entity changes, or null to clear

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
// Filter only for state changes
const stateFilter = new FiltererBlockUpdate()
    .setUpdateType("STATE");

// Filter only for block entity changes
const entityFilter = new FiltererBlockUpdate()
    .setUpdateType("ENTITY");
```

#### `setBlockStates(states)`
Sets multiple block state properties to filter for.

**Parameters:**
- `states: Map<String, String> | null` - Map of property names to values, or null to clear

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
// Filter for specific chest properties
const chestStates = new Map([
    ["facing", "north"],
    ["type", "single"]
]);
const filter = new FiltererBlockUpdate()
    .setBlockId("minecraft:chest")
    .setBlockStates(chestStates);
```

#### `setBlockState(property, value)`
Sets a single block state property to filter for.

**Parameters:**
- `property: String` - The property name (e.g., "facing", "waterlogged")
- `value: String | null` - The property value, or null to ensure the block doesn't have this property

**Returns:** `FiltererBlockUpdate` - Returns itself for method chaining

```js
// Filter for doors facing north
const filter = new FiltererBlockUpdate()
    .setBlockId("minecraft:oak_door")
    .setBlockState("facing", "north");

// Filter for non-waterlogged blocks
const dryFilter = new FiltererBlockUpdate()
    .setBlockState("waterlogged", null);
```

## Usage Examples

### Basic Position Filtering

```js
// Monitor block changes at a specific location
const positionFilter = new FiltererBlockUpdate()
    .setPos(100, 64, 200);

JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
    // This handler will only fire for block updates at position (100, 64, 200)
    Chat.log(`Block changed at ${event.block.getBlockPos().getX()}, ${event.block.getBlockPos().getY()}, ${event.block.getBlockPos().getZ()}`);
}), positionFilter);
```

### Area Monitoring

```js
// Monitor a large farming area
const farmFilter = new FiltererBlockUpdate()
    .setArea(-50, 60, -50, 50, 80, 50);  // 101x21x101 area

JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
    const block = event.block;
    const pos = block.getBlockPos();

    // Only process crop-related blocks
    if (block.getId().includes("wheat") ||
        block.getId().includes("carrot") ||
        block.getId().includes("potato")) {
        Chat.log(`Crop change: ${block.getId()} at [${pos.getX()}, ${pos.getY()}, ${pos.getZ()}]`);
    }
}), farmFilter);
```

### Complex Block State Filtering

```js
// Monitor redstone components for automation
const redstoneFilter = new FiltererBlockUpdate()
    .setUpdateType("STATE")  // Only state changes
    .setBlockStates({
        "powered": "true"    // Only powered states
    });

JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
    const block = event.block;
    const states = block.getBlockState();

    Chat.log(`Redstone activation: ${block.getId()}`);
    Chat.log(`Full state: ${JSON.stringify(Array.from(states.entries()))}`);

    // Check for specific redstone components
    if (block.getId().includes("lever") ||
        block.getId().includes("button") ||
        block.getId().includes("pressure_plate")) {
        Chat.log(`Input device activated!`);
    }
}), redstoneFilter);
```

### Door and Window Monitoring

```js
// Monitor doors and windows for security system
const doorFilter = new FiltererBlockUpdate()
    .setBlockStates({
        "open": "true"  // Only open doors/windows
    });

JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
    const block = event.block;
    const pos = block.getBlockPos();

    // Check if it's a door, gate, or trapdoor
    const blockId = block.getId();
    const isDoor = blockId.includes("door") ||
                   blockId.includes("gate") ||
                   blockId.includes("trapdoor");

    if (isDoor) {
        Chat.log(`Security Alert: ${blockId} opened at [${pos.getX()}, ${pos.getY()}, ${pos.getZ()}]`);

        // Flash the action bar as warning
        Chat.actionbar("&c&l! &fSecurity Alert &c&l!");
    }
}), doorFilter);
```

### Chest Inventory Monitoring

```js
// Monitor chests for item changes
const chestFilter = new FiltererBlockUpdate()
    .setBlockId("minecraft:chest")
    .setUpdateType("ENTITY");  // Block entity changes indicate inventory changes

JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
    const block = event.block;
    const pos = block.getBlockPos();

    Chat.log(`Chest inventory changed at [${pos.getX()}, ${pos.getY()}, ${pos.getZ()}]`);

    // You could add more complex logic here, like:
    // - Logging the changes
    // - Checking for specific items
    // - Triggering alerts for valuable items

}), chestFilter);
```

### Multi-Criteria Filtering

```js
// Complex filter for diamond ore mining in a specific area
const diamondFilter = new FiltererBlockUpdate()
    .setArea(1000, 5, 1000, 1100, 60, 1100)  // Mining area
    .setBlockId("minecraft:diamond_ore");      // Only diamond ore

JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
    const block = event.block;
    const pos = block.getBlockPos();

    Chat.log("&bDiamond found! &7at [&f${pos.getX()}, ${pos.getY()}, ${pos.getZ()}&7]");

    // Play a sound or notification
    Chat.actionbar("&6&lDIAMOND DETECTED!");

    // You could add waypoint functionality here

}), diamondFilter);
```

## Filter Logic Behavior

The filterer applies all criteria using AND logic - an event must match **all** specified conditions to pass through:

1. **Update Type**: If `updateType` is set, the event's update type must match exactly
2. **Block ID**: If `blockId` is set, the event's block ID must match exactly
3. **Position/Area**: If `pos` is set:
   - If only `pos` is set, the event's position must match exactly
   - If both `pos` and `pos2` are set, the event's position must be within the cuboid area
4. **Block States**: If `blockState` is set, all specified properties must match the event's block state

## Important Notes

- **Namespace Handling**: Block IDs are automatically normalized to include the "minecraft:" namespace if not provided
- **Area Normalization**: When using `setArea()`, corner positions are automatically normalized so you don't need to worry about which corner is smaller/larger
- **Null Values**: Setting any field to `null` removes that filter condition
- **Method Chaining**: All setter methods return `this`, allowing for fluent builder-style usage
- **Event Compatibility**: This filterer only works with `BlockUpdate` events (it will automatically reject other event types)
- **Performance**: Filtering is done in Java before the event is passed to JavaScript, making it very efficient even for high-frequency block changes

## Related Classes

- **EventBlockUpdate**: The event class this filterer is designed for
- **BlockPosHelper**: Helper class for representing block positions
- **BlockDataHelper**: Helper class for block data and state information
- **EventFilterer**: The interface this class implements
- **RegistryHelper**: Used for parsing block ID namespaces

## Common Block State Properties

Here are some commonly used block state properties you might want to filter for:

### Doors & Gates
- `facing`: "north", "south", "east", "west"
- `open`: "true", "false"
- `hinge`: "left", "right"
- `half`: "upper", "lower"

### Chests & Shulker Boxes
- `facing`: "north", "south", "east", "west"
- `type`: "single", "left", "right"

### Stairs & Slabs
- `facing`: "north", "south", "east", "west"
- `half`: "top", "bottom" (stairs)
- `shape`: "straight", "inner_left", "inner_right", "outer_left", "outer_right" (stairs)
- `type`: "top", "bottom", "double" (slabs)

### Redstone Components
- `powered`: "true", "false"
- `face`: "floor", "wall", "ceiling" (buttons, levers)
- `facing`: "north", "south", "east", "west" (repeaters, comparators)

### Liquids
- `waterlogged`: "true", "false"
- `level`: "0"-"15" (water levels)

### Crops & Plants
- `age`: "0"-"7" (most crops)
- `moisture`: "0"-"7" (farmland)