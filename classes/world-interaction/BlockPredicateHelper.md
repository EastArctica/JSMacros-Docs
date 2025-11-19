# BlockPredicateHelper

## Overview

The `BlockPredicateHelper` class is a wrapper around Minecraft's `BlockPredicate` that provides JavaScript functionality for testing and evaluating block conditions in JsMacros scripts. This helper allows you to create complex block matching conditions that can check block types, states, and NBT data.

**Since:** 1.9.1

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers`

**Inheritance:** Extends `BaseHelper<BlockPredicate>`

## Class Information

BlockPredicateHelper is primarily used in World Interaction contexts where you need to:
- Test if a block at a specific position matches certain criteria
- Check block types, states, and NBT data conditions
- Create complex block matching logic for automation scripts

This class is typically obtained from:
- Command arguments (minecraft:block_predicate)
- Block predicate builders and utilities
- Events that provide block predicates

## Constructor

BlockPredicateHelper instances are created internally by JsMacros and typically obtained from other APIs rather than constructed directly.

```javascript
// Typically obtained from commands or other APIs
// Not directly instantiated by script writers
```

## Methods

### getBlocks()

**Returns:** `List<BlockHelper> | null`

Gets the list of blocks that this predicate matches against.

- **Returns:** A list of `BlockHelper` objects representing blocks that match this predicate, or `null` if no specific blocks are defined
- **Since:** 1.9.1

```javascript
const blocks = blockPredicate.getBlocks();
if (blocks) {
    for (const block of blocks) {
        console.log("Matches block:", block.getId());
    }
}
```

### getStatePredicate()

**Returns:** `StatePredicateHelper | null`

Gets the state predicate for checking block states (properties like facing, powered state, etc.).

- **Returns:** A `StatePredicateHelper` object for testing block states, or `null` if no state predicate is defined
- **Since:** 1.9.1

```javascript
const statePredicate = blockPredicate.getStatePredicate();
if (statePredicate) {
    // Can test block states
    const matches = statePredicate.test(blockState);
}
```

### getNbtPredicate()

**Returns:** `NbtPredicateHelper | null`

Gets the NBT predicate for checking block entity data.

- **Returns:** An `NbtPredicateHelper` object for testing NBT data, or `null` if no NBT predicate is defined
- **Since:** 1.9.1

```javascript
const nbtPredicate = blockPredicate.getNbtPredicate();
if (nbtPredicate) {
    // Can test NBT data
    const matches = nbtPredicate.test(entity);
}
```

### test(position)

**Parameters:**
- `position` (`BlockPosHelper`) - The block position to test against this predicate

**Returns:** `boolean`

Tests whether the block at the specified position matches this predicate.

- **Returns:** `true` if the block at the given position matches all conditions defined in this predicate, `false` otherwise
- **Since:** 1.9.1

```javascript
const position = new BlockPosHelper(x, y, z);
const matches = blockPredicate.test(position);
if (matches) {
    console.log("Block at position matches the predicate!");
}
```

## Inherited Methods from BaseHelper

### getRaw()

**Returns:** `BlockPredicate`

Returns the underlying Minecraft `BlockPredicate` object.

- **Returns:** The raw `BlockPredicate` object wrapped by this helper

```javascript
const rawPredicate = blockPredicate.getRaw();
```

## Usage Examples

### Basic Block Testing

```javascript
// Test if a block at a specific position matches a predicate
function checkBlockAt(x, y, z, blockPredicate) {
    const position = new BlockPosHelper(x, y, z);
    return blockPredicate.test(position);
}

// Example usage
const matches = checkBlockAt(100, 64, 200, someBlockPredicate);
console.log("Block matches:", matches);
```

### Analyzing Predicate Components

```javascript
function analyzeBlockPredicate(blockPredicate) {
    console.log("=== Block Predicate Analysis ===");

    // Check what blocks are included
    const blocks = blockPredicate.getBlocks();
    if (blocks) {
        console.log("Target blocks:");
        blocks.forEach(block => console.log("- " + block.getId()));
    } else {
        console.log("No specific blocks defined");
    }

    // Check state conditions
    const statePredicate = blockPredicate.getStatePredicate();
    if (statePredicate) {
        console.log("Has state conditions");
    } else {
        console.log("No state conditions");
    }

    // Check NBT conditions
    const nbtPredicate = blockPredicate.getNbtPredicate();
    if (nbtPredicate) {
        console.log("Has NBT conditions");
    } else {
        console.log("No NBT conditions");
    }
}

// Example usage
analyzeBlockPredicate(someBlockPredicate);
```

### Area Scanning with Block Predicate

```javascript
// Scan an area for blocks matching a predicate
function findMatchingBlocks(startX, startY, startZ, radius, blockPredicate) {
    const matches = [];

    for (let x = startX - radius; x <= startX + radius; x++) {
        for (let y = startY - radius; y <= startY + radius; y++) {
            for (let z = startZ - radius; z <= startZ + radius; z++) {
                const pos = new BlockPosHelper(x, y, z);
                if (blockPredicate.test(pos)) {
                    matches.push(pos);
                }
            }
        }
    }

    return matches;
}

// Example: Find all matching blocks in 10-block radius
const foundBlocks = findMatchingBlocks(player.getX(), player.getY(), player.getZ(), 10, someBlockPredicate);
console.log(`Found ${foundBlocks.length} matching blocks`);
```

### Command Integration

Block predicates are commonly used with Minecraft commands:

```javascript
// Example from a command context where blockPredicate is provided
function onBlockPredicateCommand(context) {
    const blockPredicate = context.getArgument("predicate");

    if (blockPredicate) {
        // Test the current block the player is looking at
        const targetBlock = player.getRayTraceResult().getBlockPos();
        const matches = blockPredicate.test(targetBlock);

        if (matches) {
            chat.log("Target block matches the predicate!");
        } else {
            chat.log("Target block does not match the predicate.");
        }
    }
}
```

## Notes

1. **Null Safety:** All getter methods (`getBlocks()`, `getStatePredicate()`, `getNbtPredicate()`) may return `null` if the corresponding condition is not defined in the predicate. Always check for null before using.

2. **World Dependency:** The `test()` method requires a valid world context and may not work correctly in all situations (e.g., before world is loaded).

3. **Performance:** Block predicate testing is relatively fast, but be mindful when testing many positions in loops.

4. **Integration:** Block predicates are commonly used with Minecraft's command system (`minecraft:block_predicate` argument type) and can be accessed through command context helpers.

5. **Component Testing:** The state and NBT predicates returned by this class have their own testing methods for more granular control over block state and NBT data matching.

## Related Classes

- `StatePredicateHelper` - For testing block states and properties
- `NbtPredicateHelper` - For testing block entity NBT data
- `BlockHelper` - Represents block information
- `BlockPosHelper` - Represents block positions in the world
- `BlockStateHelper` - Represents block states and properties