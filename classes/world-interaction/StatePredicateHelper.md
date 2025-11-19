# StatePredicateHelper

## Overview

The `StatePredicateHelper` class is a wrapper around Minecraft's `StatePredicate` that provides JavaScript functionality for testing block and fluid state conditions in JsMacros scripts. This helper allows you to test whether specific block states or fluid states match defined criteria based on state properties.

**Since:** 1.9.1

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers`

**Inheritance:** Extends `BaseHelper<StatePredicate>`

## Class Information

StatePredicateHelper is primarily used in World Interaction contexts where you need to:
- Test if a block state matches specific property conditions
- Test if a fluid state matches specific property conditions
- Validate state-based conditions for block predicates
- Create complex state matching logic for automation scripts

This class is typically obtained from:
- `BlockPredicateHelper.getStatePredicate()` - Get state predicate from a block predicate
- Command arguments and other APIs that return state predicates
- Events that provide state predicate information

## Constructor

StatePredicateHelper instances are created internally by JsMacros and typically obtained from other APIs rather than constructed directly.

```javascript
// Typically obtained from BlockPredicateHelper or other APIs
// Not directly instantiated by script writers
const statePredicate = blockPredicate.getStatePredicate();
```

## Methods

### test(BlockStateHelper state)

**Parameters:**
- `state` (`BlockStateHelper`) - The block state to test against this predicate

**Returns:** `boolean`

Tests whether the given block state matches this state predicate's conditions.

- **Returns:** `true` if the block state matches all property conditions defined in this predicate, `false` otherwise
- **Since:** 1.9.1

```javascript
const blockState = World.getBlockState(x, y, z);
const matches = statePredicate.test(blockState);
if (matches) {
    console.log("Block state matches the predicate!");
}
```

### test(FluidStateHelper state)

**Parameters:**
- `state` (`FluidStateHelper`) - The fluid state to test against this predicate

**Returns:** `boolean`

Tests whether the given fluid state matches this state predicate's conditions.

- **Returns:** `true` if the fluid state matches all property conditions defined in this predicate, `false` otherwise
- **Since:** 1.9.1

```javascript
const blockState = World.getBlockState(x, y, z);
const fluidState = blockState.getFluidState();
const matches = statePredicate.test(fluidState);
if (matches) {
    console.log("Fluid state matches the predicate!");
}
```

## Inherited Methods from BaseHelper

### getRaw()

**Returns:** `StatePredicate`

Returns the underlying Minecraft `StatePredicate` object.

- **Returns:** The raw `StatePredicate` object wrapped by this helper

```javascript
const rawPredicate = statePredicate.getRaw();
```

## Usage Examples

### Basic Block State Testing

```javascript
// Test if a block state matches a predicate
function testBlockState(x, y, z, statePredicate) {
    if (!statePredicate) {
        console.log("No state predicate provided");
        return false;
    }

    const blockState = World.getBlockState(x, y, z);
    return statePredicate.test(blockState);
}

// Example usage
const matches = testBlockState(100, 64, 200, someStatePredicate);
console.log("Block state matches:", matches);
```

### Fluid State Testing

```javascript
// Test if a fluid state matches a predicate
function testFluidState(x, y, z, statePredicate) {
    if (!statePredicate) {
        console.log("No state predicate provided");
        return false;
    }

    const blockState = World.getBlockState(x, y, z);
    const fluidState = blockState.getFluidState();

    // Don't test empty fluid states
    if (fluidState.isEmpty()) {
        return false;
    }

    return statePredicate.test(fluidState);
}

// Example usage
const fluidMatches = testFluidState(100, 63, 200, someStatePredicate);
console.log("Fluid state matches:", fluidMatches);
```

### State Predicate Analysis

```javascript
// Analyze what states a predicate matches
function analyzeStatePredicate(statePredicate) {
    console.log("=== State Predicate Analysis ===");

    if (!statePredicate) {
        console.log("No state predicate defined");
        return;
    }

    // Test against various common block states
    const testStates = [
        World.createBlockState("minecraft:stone"),
        World.createBlockState("minecraft:oak_log[axis=y]"),
        World.createBlockState("minecraft:water[level=0]"),
        World.createBlockState("minecraft:lava[level=0]"),
        World.createBlockState("minecraft:redstone_wire[powered=true]")
    ];

    for (const testState of testStates) {
        const matches = statePredicate.test(testState);
        console.log(`${testState.getId()}: ${matches ? "✓ MATCH" : "✗ NO MATCH"}`);

        // Show state properties
        const properties = testState.toMap();
        if (Object.keys(properties).length > 0) {
            console.log(`  Properties: ${JSON.stringify(properties)}`);
        }
    }
}

// Example usage
analyzeStatePredicate(someStatePredicate);
```

### Area State Scanning

```javascript
// Scan an area for blocks with matching states
function findMatchingStates(startX, startY, startZ, radius, statePredicate) {
    const matches = [];

    if (!statePredicate) {
        console.log("No state predicate provided");
        return matches;
    }

    for (let x = startX - radius; x <= startX + radius; x++) {
        for (let y = Math.max(0, startY - radius); y <= Math.min(255, startY + radius); y++) {
            for (let z = startZ - radius; z <= startZ + radius; z++) {
                const blockState = World.getBlockState(x, y, z);

                if (statePredicate.test(blockState)) {
                    matches.push({
                        x: x,
                        y: y,
                        z: z,
                        blockId: blockState.getId(),
                        properties: blockState.toMap()
                    });
                }

                // Also test fluid state if present
                const fluidState = blockState.getFluidState();
                if (!fluidState.isEmpty() && statePredicate.test(fluidState)) {
                    matches.push({
                        x: x,
                        y: y,
                        z: z,
                        fluidId: fluidState.getId(),
                        isFluid: true,
                        properties: fluidState.toMap()
                    });
                }
            }
        }
    }

    return matches;
}

// Example: Find all matching states in 5-block radius
const playerPos = Player.getPlayer().getBlockPos();
const foundStates = findMatchingStates(playerPos.getX(), playerPos.getY(), playerPos.getZ(), 5, someStatePredicate);
console.log(`Found ${foundStates.length} matching states:`);
foundStates.forEach(match => {
    if (match.isFluid) {
        console.log(`Fluid ${match.fluidId} at (${match.x}, ${match.y}, ${match.z})`);
    } else {
        console.log(`Block ${match.blockId} at (${match.x}, ${match.y}, ${match.z})`);
    }
});
```

### Block Predicate Integration

```javascript
// Work with StatePredicateHelper from BlockPredicateHelper
function analyzeBlockPredicateStates(blockPredicate) {
    console.log("=== Block Predicate State Analysis ===");

    // Get the state predicate from the block predicate
    const statePredicate = blockPredicate.getStatePredicate();

    if (!statePredicate) {
        console.log("This block predicate has no state conditions");
        return;
    }

    console.log("Block predicate has state conditions. Testing...");

    // Test against player's current position
    const playerPos = Player.getPlayer().getBlockPos();
    const blockState = World.getBlockState(playerPos);

    if (statePredicate.test(blockState)) {
        console.log(`✓ Player's current block (${blockState.getId()}) matches state conditions`);

        // Show the properties
        const properties = blockState.toMap();
        if (Object.keys(properties).length > 0) {
            console.log("Matching properties:", JSON.stringify(properties));
        }
    } else {
        console.log(`✗ Player's current block (${blockState.getId()}) does not match state conditions`);
    }

    // Test looking-at block
    const lookingAt = Player.getLookingAt();
    if (lookingAt) {
        const lookingState = World.getBlockState(lookingAt);
        if (statePredicate.test(lookingState)) {
            console.log(`✓ Looking-at block (${lookingState.getId()}) matches state conditions`);
        } else {
            console.log(`✗ Looking-at block (${lookingState.getId()}) does not match state conditions`);
        }
    }
}

// Example usage
// analyzeBlockPredicateStates(someBlockPredicate);
```

## Notes

1. **Null Safety:** StatePredicateHelper can be `null` when obtained from `BlockPredicateHelper.getStatePredicate()` if no state conditions are defined. Always check for null before using.

2. **Method Overloads:** The class provides two separate `test()` methods - one for `BlockStateHelper` and one for `FluidStateHelper`. Make sure to use the appropriate one for your use case.

3. **State Properties:** State predicates test block state properties (like `facing`, `powered`, `level`, `axis`, etc.) rather than block types. Use `BlockStateHelper.toMap()` to see what properties a block state has.

4. **Performance:** State predicate testing is generally fast, but when testing large areas, consider optimizing by:
   - Only testing relevant coordinates
   - Caching results when appropriate
   - Avoiding redundant tests

5. **Minecraft Integration:** This class wraps Minecraft's native `StatePredicate` functionality, so all state matching rules follow Minecraft's built-in predicate system.

6. **Empty Fluid States:** When testing fluid states, check `fluidState.isEmpty()` first, as testing empty fluid states may not provide meaningful results.

## Related Classes

- `BlockPredicateHelper` - Often contains StatePredicateHelper instances
- `BlockStateHelper` - Represents block states that can be tested
- `FluidStateHelper` - Represents fluid states that can be tested
- `BaseHelper` - Parent class providing common helper functionality
- `StateHelper` - Base class for state-related helpers

## Common Use Cases

1. **Block State Filtering**: Finding blocks with specific properties (facing direction, power state, etc.)
2. **Fluid State Detection**: Checking fluid levels and properties
3. **Automation Scripts**: Creating complex conditions for automated block interactions
4. **Building Tools**: Finding blocks with specific orientations or states
5. **Redstone Integration**: Testing block states for redstone contraptions and circuits
6. **World Generation Filters**: Filtering blocks based on state conditions for world analysis