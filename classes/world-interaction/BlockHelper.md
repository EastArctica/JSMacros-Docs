# BlockHelper

## Overview

The `BlockHelper` class is a World Interaction helper in JSMacros that provides access to Minecraft block properties and behaviors. It wraps Minecraft's native `Block` class and exposes various methods for retrieving block information such as hardness, resistance, states, and other properties that are useful for scripting.

This class is typically accessed when working with blocks in the world, either through block events or by querying specific block positions.

## Accessing BlockHelper

You typically get `BlockHelper` instances from:
- Block-related events
- World block queries
- Interactions with block states and positions

```javascript
// Example: Getting a BlockHelper from a block at a specific position
const block = World.getBlock(player.getX(), player.getY(), player.getZ());
const blockHelper = block.getBlock();

// Example: From block events
events.on("BlockBreak", (event) => {
    const block = event.getBlock();
    // block is already a BlockHelper in this case
});
```

## Properties and Methods

### Core Properties

#### `getRaw()`
Returns the underlying Minecraft Block object.

```javascript
const rawBlock = blockHelper.getRaw();
```

#### `getId()`
Returns the block identifier as a string.

```javascript
const blockId = blockHelper.getId();
// Example: "minecraft:stone"
```

#### `getName()`
Returns the display name of the block as a `TextHelper`.

```javascript
const blockName = blockHelper.getName();
Chat.log("Block name: " + blockName.getString());
```

### Block State Methods

#### `getDefaultState()`
Returns the default state of the block as a `BlockStateHelper`.

```javascript
const defaultState = blockHelper.getDefaultState();
```

#### `getStates()`
Returns all possible block states of the block as a list of `BlockStateHelper` objects.

```javascript
const allStates = blockHelper.getStates();
Chat.log("Total states: " + allStates.length);
```

#### `getDefaultItemStack()`
Returns the default item stack representation of the block as an `ItemStackHelper`.

```javascript
const defaultItem = blockHelper.getDefaultItemStack();
```

### Physical Properties

#### `getHardness()`
Returns the hardness value of the block (how long it takes to mine).

```javascript
const hardness = blockHelper.getHardness();
Chat.log("Block hardness: " + hardness);
```

#### `getBlastResistance()`
Returns the blast resistance value of the block.

```javascript
const resistance = blockHelper.getBlastResistance();
Chat.log("Blast resistance: " + resistance);
```

#### `getSlipperiness()`
Returns the slipperiness factor of the block.

```javascript
const slipperiness = blockHelper.getSlipperiness();
Chat.log("Slipperiness: " + slipperiness);
```

#### `getJumpVelocityMultiplier()`
Returns the jump velocity multiplier when jumping on this block.

```javascript
const jumpMultiplier = blockHelper.getJumpVelocityMultiplier();
Chat.log("Jump multiplier: " + jumpMultiplier);
```

#### `getVelocityMultiplier()`
Returns the velocity multiplier for entities walking on this block.

```javascript
const velocityMultiplier = blockHelper.getVelocityMultiplier();
Chat.log("Velocity multiplier: " + velocityMultiplier);
```

### Block Behavior Methods

#### `hasDynamicBounds()`
Returns `true` if the block has dynamic bounds (bounds that change based on state).

```javascript
const hasDynamicBounds = blockHelper.hasDynamicBounds();
if (hasDynamicBounds) {
    Chat.log("This block has dynamic bounds");
}
```

#### `canMobSpawnInside()`
Returns `true` if mobs can spawn inside this block.

```javascript
const canMobsSpawn = blockHelper.canMobSpawnInside();
if (canMobsSpawn) {
    Chat.log("Mobs can spawn inside this block");
}
```

### Block Tags

#### `getTags()`
Returns all tags associated with the block as a list of strings.

```javascript
const tags = blockHelper.getTags();
Chat.log("Block tags:");
for (const tag of tags) {
    Chat.log("- " + tag);
}
```

## Usage Examples

### Basic Block Information
```javascript
// Get information about the block at player's feet
const playerPos = player.getPos();
const block = World.getBlock(playerPos.x, playerPos.y - 1, playerPos.z);
const blockHelper = block.getBlock();

Chat.log("Block ID: " + blockHelper.getId());
Chat.log("Block Name: " + blockHelper.getName().getString());
Chat.log("Hardness: " + blockHelper.getHardness());
Chat.log("Blast Resistance: " + blockHelper.getBlastResistance());
```

### Checking Block Properties
```javascript
function analyzeBlock(blockHelper) {
    Chat.log("=== Block Analysis ===");
    Chat.log("ID: " + blockHelper.getId());
    Chat.log("Hardness: " + blockHelper.getHardness());
    Chat.log("Slipperiness: " + blockHelper.getSlipperiness());
    Chat.log("Can mobs spawn inside: " + blockHelper.canMobSpawnInside());
    Chat.log("Has dynamic bounds: " + blockHelper.hasDynamicBounds());

    const tags = blockHelper.getTags();
    if (tags.length > 0) {
        Chat.log("Tags: " + tags.join(", "));
    }
}

// Analyze the block the player is looking at
const lookingAt = player.rayTraceBlock(10);
if (lookingAt) {
    const block = World.getBlock(lookingAt.x, lookingAt.y, lookingAt.z);
    analyzeBlock(block.getBlock());
}
```

### Working with Block States
```javascript
// Get all possible states for a block
function listBlockStates(blockId) {
    const registry = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.RegistryHelper");
    const block = registry.getBlock(blockId);

    if (block) {
        const states = block.getStates();
        Chat.log("Block " + blockId + " has " + states.length + " states:");

        for (let i = 0; i < states.length; i++) {
            const state = states[i];
            Chat.log("State " + i + ": " + state.toString());
        }
    }
}

listBlockStates("minecraft:oak_log");
```

### Block Categories and Filtering
```javascript
function isBlockInCategory(blockHelper, categoryTag) {
    const tags = blockHelper.getTags();
    return tags.includes(categoryTag);
}

// Check if a block is a log
function isLog(blockHelper) {
    return isBlockInCategory(blockHelper, "minecraft:logs");
}

// Check if a block is ore
function isOre(blockHelper) {
    const tags = blockHelper.getTags();
    return tags.some(tag => tag.includes("ores"));
}

// Example usage in a mining script
events.on("BlockBreak", (event) => {
    const block = event.getBlock();
    const blockHelper = block.getBlock();

    if (isOre(blockHelper)) {
        Chat.log("Mining ore: " + blockHelper.getId());
    } else if (isLog(blockHelper)) {
        Chat.log("Chopping wood: " + blockHelper.getId());
    }
});
```

## Inherited Methods

From `BaseHelper<Block>`:

- `equals(obj)` - Compares this BlockHelper to another object
- `hashCode()` - Returns the hash code of the underlying block
- `toString()` - Returns a string representation of the BlockHelper

## Notes and Limitations

- BlockHelper instances are read-only - they represent block types, not specific block positions
- For position-specific block data (like inventory contents or custom data), use `BlockStateHelper`
- Some methods may return different values based on the Minecraft version
- Block properties are typically static values defined by the block type, not by individual block instances

## Related Classes

- `BlockStateHelper` - Represents a specific state of a block
- `WorldHelper` - Provides world-level block access methods
- `ItemStackHelper` - Represents item stacks, often used with block items
- `TextHelper` - Used for block names and descriptions

## Version Information

- Available since JSMacros 1.6.5
- Updated in 1.8.4 with additional methods