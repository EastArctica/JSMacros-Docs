# FluidStateHelper

## Overview

The `FluidStateHelper` class provides a comprehensive interface for working with fluid states in Minecraft through JSMacros scripts. This class allows you to inspect and manipulate fluid properties, check fluid behavior, and retrieve various attributes about fluid states in the world.

Fluid states represent different fluids (water, lava, etc.) and their properties at specific block positions. This helper class extends `StateHelper` and provides access to all fluid-specific functionality.

Since version 1.8.4.

## Class Inheritance

- **Extends**: `StateHelper<FluidState>`
- **Package**: `xyz.wagyourtail.jsmacros.client.api.helpers.world`

## How to Access

You typically obtain `FluidStateHelper` instances from:

1. **Block states**: Getting fluid information from blocks that contain fluids
2. **World interactions**: Querying fluid states at specific positions
3. **Block helper methods**: Converting block helpers to their fluid state

```javascript
// Example: Getting fluid state from a block at player position
let playerPos = player.getBlockPos();
let block = World.getBlock(playerPos);
let fluidState = block.getFluidState();

// Example: From a world position
let fluidState = World.getFluidState(x, y, z);
```

## Methods

### getId()

**Returns**: `String`

Returns the unique identifier of the fluid in the format `minecraft:fluid_name`.

**Example**:
```javascript
let fluidId = fluidState.getId();
if (fluidId === "minecraft:water") {
    Chat.log("This is water!");
} else if (fluidId === "minecraft:lava") {
    Chat.log("This is lava!");
}
```

### isStill()

**Returns**: `boolean`

Returns `true` if the fluid is in a still state, `false` if it's flowing.

**Example**:
```javascript
if (fluidState.isStill()) {
    Chat.log("Fluid is still - no current");
} else {
    Chat.log("Fluid is flowing - be careful!");
}
```

### isEmpty()

**Returns**: `boolean`

Returns `true` if this fluid state is empty (represents the default fluid state for non-fluid blocks), `false` otherwise.

**Example**:
```javascript
if (fluidState.isEmpty()) {
    Chat.log("No fluid here");
} else {
    Chat.log("Fluid present!");
}
```

### getHeight()

**Returns**: `float`

Returns the height of this fluid state. This is useful for determining the fluid level in a block.

**Example**:
```javascript
let height = fluidState.getHeight();
Chat.log(`Fluid height: ${height}`);
if (height > 0.8) {
    Chat.log("Nearly full block of fluid");
}
```

### getLevel()

**Returns**: `int`

Returns the fluid level as an integer value. Higher values typically mean more fluid.

**Example**:
```javascript
let level = fluidState.getLevel();
Chat.log(`Fluid level: ${level}`);
if (level >= 8) {
    Chat.log("Full fluid source block");
} else {
    Chat.log(`Flowing fluid with level ${level}`);
}
```

### hasRandomTicks()

**Returns**: `boolean`

Returns `true` if the fluid has random tick logic (currently only used by lava for fire spreading), `false` otherwise.

**Example**:
```javascript
if (fluidState.hasRandomTicks()) {
    Chat.log("This fluid has random tick behavior");
} else {
    Chat.log("No random ticks for this fluid");
}
```

### getVelocity(BlockPosHelper pos)

**Parameters**:
- `pos` (`BlockPosHelper`): The position in the world to calculate velocity for

**Returns**: `Pos3D`

Returns the velocity vector that will be applied to entities at the given position due to fluid flow.

**Example**:
```javascript
let pos = player.getBlockPos();
let velocity = fluidState.getVelocity(pos);
Chat.log(`Fluid velocity: x=${velocity.x}, y=${velocity.y}, z=${velocity.z}`);

// Check if entity will be pushed significantly
let speed = Math.sqrt(velocity.x**2 + velocity.y**2 + velocity.z**2);
if (speed > 0.1) {
    Chat.log("Strong current detected!");
}
```

### getBlockState()

**Returns**: `BlockStateHelper`

Returns the block state associated with this fluid state.

**Example**:
```javascript
let blockState = fluidState.getBlockState();
Chat.log(`Block ID: ${blockState.getId()}`);
let isSolid = blockState.isSolid();
```

### getBlastResistance()

**Returns**: `float`

Returns the blast resistance value of this fluid.

**Example**:
```javascript
let resistance = fluidState.getBlastResistance();
Chat.log(`Blast resistance: ${resistance}`);
if (resistance > 100) {
    Chat.log("This fluid is highly resistant to explosions");
}
```

## Inherited Methods

### from StateHelper

#### toMap()

**Returns**: `Map<String, String>`

Returns a map of all state properties with their identifiers and values.

**Example**:
```javascript
let properties = fluidState.toMap();
for (let [key, value] of properties) {
    Chat.log(`Property ${key}: ${value}`);
}
```

#### with(String property, String value)

**Parameters**:
- `property` (`String`): The name of the property to modify
- `value` (`String`): The new value for the property

**Returns**: `FluidStateHelper`

Creates a new fluid state with the specified property modified. Note that this returns a new instance and doesn't modify the original.

**Example**:
```javascript
try {
    // Note: This depends on available properties for the specific fluid
    let newState = fluidState.with("level", "8");
    Chat.log("Created new fluid state with full level");
} catch (e) {
    Chat.log(`Error modifying property: ${e.message}`);
}
```

### from BaseHelper

#### getRaw()

**Returns**: `FluidState`

Returns the underlying Minecraft FluidState object for advanced usage.

#### equals(Object obj)

**Returns**: `boolean`

Compares this fluid state helper with another object for equality.

#### hashCode()

**Returns**: `int`

Returns the hash code for this fluid state helper.

## toString()

**Returns**: `String`

Returns a string representation of the fluid state in JSON format showing the fluid ID and properties.

**Example**:
```javascript
let representation = fluidState.toString();
Chat.log(`Fluid state: ${representation}`);
// Output might look like: FluidStateHelper:{"id": "minecraft:water", "properties": {"level": "1"}}
```

## Usage Examples

### Basic Fluid Detection

```javascript
function checkFluidAtPlayer() {
    let playerPos = player.getBlockPos();
    let block = World.getBlock(playerPos);
    let fluidState = block.getFluidState();

    if (!fluidState.isEmpty()) {
        Chat.log(`Found fluid: ${fluidState.getId()}`);
        Chat.log(`Is still: ${fluidState.isStill()}`);
        Chat.log(`Level: ${fluidState.getLevel()}`);
        Chat.log(`Height: ${fluidState.getHeight()}`);

        if (fluidState.hasRandomTicks()) {
            Chat.log("This fluid has random ticks");
        }
    } else {
        Chat.log("No fluid at player position");
    }
}

checkFluidAtPlayer();
```

### Fluid Flow Analysis

```javascript
function analyzeFluidFlow() {
    let playerPos = player.getBlockPos();
    let block = World.getBlock(playerPos);
    let fluidState = block.getFluidState();

    if (!fluidState.isEmpty()) {
        let velocity = fluidState.getVelocity(playerPos);
        let speed = Math.sqrt(velocity.x**2 + velocity.y**2 + velocity.z**2);

        Chat.log(`=== Fluid Analysis ===`);
        Chat.log(`Type: ${fluidState.getId()}`);
        Chat.log(`Flow speed: ${speed.toFixed(3)}`);
        Chat.log(`Direction: (${velocity.x.toFixed(3)}, ${velocity.y.toFixed(3)}, ${velocity.z.toFixed(3)})`);
        Chat.log(`Source block: ${fluidState.getLevel() >= 8}`);

        if (speed > 0.05) {
            Chat.log("Warning: Strong current detected!");
        }
    }
}

analyzeFluidFlow();
```

### Fluid Properties Explorer

```javascript
function exploreFluidProperties() {
    let playerPos = player.getBlockPos();

    // Check blocks around player
    for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
            for (let z = -2; z <= 2; z++) {
                let checkPos = playerPos.add(x, y, z);
                let fluidState = World.getFluidState(checkPos.x, checkPos.y, checkPos.z);

                if (!fluidState.isEmpty()) {
                    Chat.log(`=== Fluid at (${x}, ${y}, ${z}) ===`);
                    Chat.log(`ID: ${fluidState.getId()}`);
                    Chat.log(`Level: ${fluidState.getLevel()}`);
                    Chat.log(`Height: ${fluidState.getHeight()}`);
                    Chat.log(`Still: ${fluidState.isStill()}`);

                    let properties = fluidState.toMap();
                    for (let [key, value] of properties) {
                        Chat.log(`  ${key}: ${value}`);
                    }
                }
            }
        }
    }
}

exploreFluidProperties();
```

## Important Notes

1. **Performance**: Creating many `FluidStateHelper` instances can impact performance. Cache results when possible.

2. **Thread Safety**: These methods should only be called from the main client thread, typically within events or scheduled tasks.

3. **Valid Positions**: Always ensure you're querying valid world positions to avoid unexpected behavior.

4. **Fluid Availability**: Not all blocks have fluid states. Always check with `isEmpty()` before working with fluid properties.

5. **Property Modification**: Some fluid properties may not be modifiable through the `with()` method depending on the fluid type and available properties.

6. **World Access**: Methods that require world context (like `getVelocity()`) need a valid world instance and may not work in all contexts.