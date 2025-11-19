# BlockStateHelper

## Overview

The `BlockStateHelper` class is a comprehensive helper class in JSMacros that provides access to Minecraft block state information and functionality. It acts as a wrapper around Minecraft's `BlockState` class, exposing various properties and methods that allow script developers to interact with and analyze block states in the game world.

This class is particularly useful for World Interaction scripts where you need to examine blocks, check their properties, determine their behavior, or make decisions based on block characteristics.

**Since:** 1.6.5

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`

**Extends:** `StateHelper<BlockState>`

## How to Access

You typically obtain a `BlockStateHelper` instance through various World Interaction methods, such as:

- `World.getBlockState(pos)` - Gets the block state at a specific position
- `BlockHelper.getDefaultState()` - Gets the default state of a block type
- Various event handlers that provide block state information

## Inherited Methods

### From StateHelper
- **`toMap()`** → `Map<String, String>`: Returns a map of all state properties with their identifiers and values
- **`with(property: String, value: String)`** → `StateHelper<BlockState>`: Creates a new block state with the specified property set to the given value

### From BaseHelper
- **`getRaw()`** → `BlockState`: Returns the underlying Minecraft BlockState object
- **`hashCode()`** → `int`: Returns the hash code of the underlying block state
- **`equals(obj: Object)`** → `boolean`: Compares this block state with another object

## Methods

### Block Information

#### `getBlock()` → `BlockHelper`
Returns the block that this state belongs to.

```javascript
const blockState = World.getBlockState(Player.getPlayerPos());
const block = blockState.getBlock();
JsMacros.chat(block.getId()); // e.g., "minecraft:stone"
```

#### `getId()` → `String`
Returns the block's registry ID.

```javascript
const blockState = World.getBlockState(Player.getPlayerPos());
const blockId = blockState.getId();
// Returns something like "minecraft:oak_log" or "minecraft:diamond_ore"
```

### Physical Properties

#### `getHardness()` → `float`
Returns the hardness of the block, which affects how long it takes to mine.

```javascript
const blockState = World.getBlockState(Player.getPlayerPos());
const hardness = blockState.getHardness();
if (hardness > 50) {
    JsMacros.chat("This is a very hard block!");
}
```

#### `getLuminance()` → `int`
Returns the light level emitted by this block state (0-15).

```javascript
const blockState = World.getBlockState(Player.getPlayerPos());
const lightLevel = blockState.getLuminance();
if (lightLevel > 0) {
    JsMacros.chat(`This block emits light level ${lightLevel}`);
}
```

#### `isOpaque()` → `boolean`
Returns true if the block is opaque (light cannot pass through).

```javascript
if (blockState.isOpaque()) {
    JsMacros.chat("This block blocks light");
}
```

#### `isSolid()` → `boolean`
Returns true if the block is solid (entities cannot pass through).

```javascript
if (blockState.isSolid()) {
    JsMacros.chat("This block is solid");
}
```

#### `blocksMovement()` → `boolean`
Returns true if the state blocks the movement of entities.

```javascript
if (blockState.blocksMovement()) {
    JsMacros.chat("Cannot walk through this block");
}
```

### Special Properties

#### `isAir()` → `boolean`
Returns true if the state represents air.

```javascript
if (blockState.isAir()) {
    JsMacros.chat("This is an air block");
}
```

#### `isLiquid()` → `boolean`
Returns true if the state represents a liquid block.

```javascript
if (blockState.isLiquid()) {
    JsMacros.chat("This is a liquid block");
    const fluidState = blockState.getFluidState();
    JsMacros.chat(`Fluid: ${fluidState.getId()}`);
}
```

#### `isBurnable()` → `boolean`
Returns true if the block can be burned by fire.

```javascript
if (blockState.isBurnable()) {
    JsMacros.chat("This block can catch fire");
}
```

#### `isReplaceable()` → `boolean`
Returns true if the block can be replaced without breaking it first. This applies to blocks like air, grass, and tall grass.

```javascript
if (blockState.isReplaceable()) {
    JsMacros.chat("Can place blocks here without breaking first");
}
```

### Redstone and Mechanical Properties

#### `emitsRedstonePower()` → `boolean`
Returns true if the block state emits redstone power.

```javascript
if (blockState.emitsRedstonePower()) {
    JsMacros.chat("This block emits redstone power");
}
```

#### `hasComparatorOutput()` → `boolean`
Returns true if the block can produce a comparator output.

```javascript
if (blockState.hasComparatorOutput()) {
    JsMacros.chat("This block can be read by comparators");
}
```

#### `getPistonBehaviour()` → `String`
Returns the piston behavior of the block as a string. Possible values:
- "NORMAL" - Can be pushed and pulled by pistons
- "BLOCK" - Blocks piston movement but can be pushed
- "PUSH_ONLY" - Can only be pushed, not pulled
- "DESTROY" - Will be destroyed by pistons
- "IGNORE" - Completely ignored by pistons

```javascript
const pistonBehavior = blockState.getPistonBehaviour();
JsMacros.chat(`Piston behavior: ${pistonBehavior}`);
if (pistonBehavior === "BLOCK") {
    JsMacros.chat("This block will stop pistons");
}
```

### Mining and Tool Requirements

#### `isToolRequired()` → `boolean`
Returns true if a specific tool is required to mine this block efficiently.

```javascript
if (blockState.isToolRequired()) {
    JsMacros.chat("You need the right tool to mine this efficiently");
}
```

#### `getFluidState()` → `FluidStateHelper`
Returns the fluid state of this block state (for blocks containing fluids).

```javascript
const fluidState = blockState.getFluidState();
if (fluidState.isStill()) {
    JsMacros.chat("Still fluid");
} else {
    JsMacros.chat("Flowing fluid");
}
```

### Entity Interaction Properties

#### `hasBlockEntity()` → `boolean`
Returns true if the block has an associated block entity (like chests, furnaces, etc.).

```javascript
if (blockState.hasBlockEntity()) {
    JsMacros.chat("This block has additional data stored (like a chest or furnace)");
}
```

#### `hasRandomTicks()` → `boolean`
Returns true if the block can receive random ticks (used for crops, redstone components, etc.).

```javascript
if (blockState.hasRandomTicks()) {
    JsMacros.chat("This block receives random ticks");
}
```

#### `allowsSpawning(pos: BlockPosHelper, entity: String)` → `boolean`
Returns true if the specified entity type can spawn on this block state at the given position.

```javascript
const currentPos = Player.getPlayerPos();
const abovePos = currentPos.add(0, 1, 0);
const canZombieSpawn = blockState.allowsSpawning(abovePos, "minecraft:zombie");
if (canZombieSpawn) {
    JsMacros.chat("Zombies can spawn here");
}
```

#### `shouldSuffocate(pos: BlockPosHelper)` → `boolean`
Returns true if an entity would suffocate in this block state at the given position.

```javascript
if (blockState.shouldSuffocate(currentPos)) {
    JsMacros.chat("You would suffocate in this block");
}
```

### Advanced Methods

#### `getUniversal()` → `UniversalBlockStateHelper`
Returns a `UniversalBlockStateHelper` that provides access to all possible block properties, including those specific to certain block types.

```javascript
const universalState = blockState.getUniversal();
// Now you can access specific properties like:
if (universalState.getFacing) {
    const facing = universalState.getFacing();
    JsMacros.chat(`Block faces: ${facing}`);
}
```

## Usage Examples

### Example 1: Block Analysis Tool
```javascript
function analyzeBlock() {
    const pos = Player.getPlayerPos();
    const blockState = World.getBlockState(pos);

    JsMacros.chat("=== Block Analysis ===");
    JsMacros.chat(`ID: ${blockState.getId()}`);
    JsMacros.chat(`Hardness: ${blockState.getHardness()}`);
    JsMacros.chat(`Light Level: ${blockState.getLuminance()}`);
    JsMacros.chat(`Is Solid: ${blockState.isSolid()}`);
    JsMacros.chat(`Is Liquid: ${blockState.isLiquid()}`);
    JsMacros.chat(`Is Air: ${blockState.isAir()}`);
    JsMacros.chat(`Tool Required: ${blockState.isToolRequired()}`);
    JsMacros.chat(`Piston Behavior: ${blockState.getPistonBehaviour()}`);

    // Check all properties
    const properties = blockState.toMap();
    for (const [key, value] of Object.entries(properties)) {
        JsMacros.chat(`${key}: ${value}`);
    }
}
```

### Example 2: Mining Assistant
```javascript
function checkMiningRequirements() {
    const lookingAt = Player.getLookingAt();
    if (!lookingAt) return;

    const blockState = World.getBlockState(lookingAt);

    if (blockState.isToolRequired()) {
        const blockId = blockState.getId();
        const hardness = blockState.getHardness();

        JsMacros.chat(`This ${blockId} requires proper tools!`);
        JsMacros.chat(`Hardness: ${hardness}`);

        if (hardness > 20) {
            JsMacros.chat("This is a very hard block, use diamond tools!");
        }
    }

    if (blockState.isLiquid()) {
        JsMacros.chat("This is a liquid block!");
    }
}
```

### Example 3: Building Helper
```javascript
function checkBuildingRequirements() {
    const pos = Player.getPlayerPos();
    const abovePos = pos.add(0, 1, 0);
    const blockState = World.getBlockState(abovePos);

    if (blockState.isReplaceable()) {
        JsMacros.chat("Space above is free for building!");
    } else if (blockState.isAir()) {
        JsMacros.chat("Air block above");
    } else if (!blockState.blocksMovement()) {
        JsMacros.chat("Non-solid block above (like torch or flower)");
    } else {
        JsMacros.chat("Blocked above!");
    }

    // Check light level
    const lightLevel = blockState.getLuminance();
    if (lightLevel > 0) {
        JsMacros.chat(`Light source above (level ${lightLevel})`);
    }
}
```

### Example 4: Redstone Device Checker
```javascript
function checkRedstoneProperties() {
    const lookingAt = Player.getLookingAt();
    if (!lookingAt) return;

    const blockState = World.getBlockState(lookingAt);

    if (blockState.emitsRedstonePower()) {
        JsMacros.chat("This block emits redstone power!");
    }

    if (blockState.hasComparatorOutput()) {
        JsMacros.chat("This block can be read by comparators!");
    }

    if (blockState.hasRandomTicks()) {
        JsMacros.chat("This block receives random ticks");
    }

    // Check piston behavior
    const pistonBehavior = blockState.getPistonBehaviour();
    if (pistonBehavior !== "NORMAL") {
        JsMacros.chat(`Special piston behavior: ${pistonBehavior}`);
    }
}
```

## Important Notes

1. **Position Context**: Some methods like `allowsSpawning()` and `shouldSuffocate()` require a `BlockPosHelper` parameter because their behavior depends on the surrounding world context.

2. **Entity IDs**: When using `allowsSpawning()`, entity IDs should be in the format `minecraft:entity_name` or just `entity_name` (namespace can be omitted).

3. **State Properties**: Use `toMap()` to see all available properties for a specific block state, as different blocks have different properties.

4. **Universal Properties**: For accessing block-specific properties, use `getUniversal()` to get a `UniversalBlockStateHelper` that provides access to all possible properties.

5. **World Access**: All methods that check world-specific properties (like spawning) use the current client world context.

6. **Performance**: These methods are generally lightweight, but avoid calling them repeatedly in tight loops for performance reasons.

## Related Classes

- **BlockHelper**: Represents block types and their general properties
- **BlockPosHelper**: Represents positions in the world
- **FluidStateHelper**: Represents fluid states within blocks
- **UniversalBlockStateHelper**: Provides access to all block-specific properties
- **World**: Main class for world interaction methods