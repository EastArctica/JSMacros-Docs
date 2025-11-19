# BlockFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter`

**Extends:** `ClassWrapperFilter<BlockHelper>`

**Since:** `1.6.5`

The `BlockFilter` class is a specialized filter in JSMacros used with the WorldScanner system to filter blocks based on their properties and method results. It extends the `ClassWrapperFilter` class and provides a powerful way to create complex block filtering logic using methods from the `BlockHelper` class.

This class is primarily used internally by the `WorldScannerBuilder` when creating block-based filters, but can also be instantiated directly for advanced filtering scenarios.

## Overview

The `BlockFilter` works by:

1. **Method Invocation**: Invokes a specified method from `BlockHelper` on each block being evaluated
2. **Result Filtering**: Applies a comparison filter to the method result
3. **Boolean Evaluation**: Returns `true` if the block matches the filter criteria

**Key Features:**
- Supports all public, no-parameter methods from `BlockHelper`
- Works with different return types: String, Number, Boolean
- Supports logical operations (AND, OR, XOR, NOT) through inheritance
- Integrates seamlessly with the WorldScanner system
- Provides high-performance parallel filtering capabilities

## Constructor

#### `new BlockFilter(methodName, methodArgs, filterArgs)`

Creates a new BlockFilter instance with the specified method and filter criteria.

**Parameters:**
- `methodName` (String): The name of the method from `BlockHelper` to invoke on each block
- `methodArgs` (Object[]): Arguments to pass to the method when invoked (typically empty for no-parameter methods)
- `filterArgs` (Object[]): Arguments for the filter comparison operation

**Returns:**
- `BlockFilter`: A new BlockFilter instance

**Example:**
```javascript
// Create a filter that matches blocks with hardness >= 2.0
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");
const filter = new BlockFilter("getHardness", [], [">=", 2.0]);

// Create a filter that matches blocks whose ID contains "ore"
const oreFilter = new BlockFilter("getId", [], ["CONTAINS", "ore"]);
```

## Available Methods

The BlockFilter can use any public, no-parameter method from the `BlockHelper` class. Here are the most commonly used methods:

### Block Identification Methods

#### `getId()`
**Returns:** String - The unique identifier of the block (e.g., "minecraft:stone")

#### `getName()`
**Returns:** TextHelper - The display name of the block

### Physical Properties

#### `getHardness()`
**Returns:** Number - The hardness value of the block

#### `getBlastResistance()`
**Returns:** Number - The blast resistance value of the block

#### `getSlipperiness()`
**Returns:** Number - The slipperiness factor of the block

#### `getJumpVelocityMultiplier()`
**Returns:** Number - The jump velocity multiplier when jumping on this block

#### `getVelocityMultiplier()`
**Returns:** Number - The velocity multiplier for entities walking on this block

### Block Behavior

#### `hasDynamicBounds()`
**Returns:** Boolean - Whether the block has dynamic bounds

#### `canMobSpawnInside()`
**Returns:** Boolean - Whether mobs can spawn inside this block

### Utility Methods

#### `getTags()`
**Returns:** Array<String> - All tags associated with the block

#### `getDefaultState()`
**Returns:** BlockStateHelper - The default state of the block

#### `getStates()`
**Returns:** Array<BlockStateHelper> - All possible states of the block

#### `getDefaultItemStack()`
**Returns:** ItemStackHelper - The default item stack representation of the block

## Filter Types and Operations

### String Filters
When the method returns a String, you can use these comparison operations:

- **EQUALS**: Exact string match
- **CONTAINS**: Substring match
- **STARTS_WITH**: Prefix match
- **ENDS_WITH**: Suffix match
- **MATCHES**: Regular expression match

### Number Filters
When the method returns a Number, you can use these comparison operations:

- **>**: Greater than
- **>=**: Greater than or equal to
- **<**: Less than
- **<=**: Less than or equal to
- **==**: Equal to
- **!=**: Not equal to

### Boolean Filters
When the method returns a Boolean, you can compare against `true` or `false`.

## Usage Examples

### Example 1: Filtering by Block Hardness

```javascript
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");

// Find blocks that are relatively soft (hardness < 2.0)
const softBlockFilter = new BlockFilter("getHardness", [], ["<", 2.0]);

// Use with a custom scanner
const scanner = World.getWorldScanner(softBlockFilter, null);
const softBlocks = scanner.scanChunksAroundPlayer(2);
Chat.log(`Found ${softBlocks.length} soft blocks`);
```

### Example 2: Filtering by Block ID

```javascript
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");

// Find all ore blocks
const oreFilter = new BlockFilter("getId", [], ["CONTAINS", "ore"]);

// Find specific valuable ores
const valuableOreFilter = new BlockFilter("getId", [], [
    "EQUALS", "minecraft:diamond_ore"
]);

// Find blocks matching multiple IDs (requires multiple filters combined)
const stoneFilter = new BlockFilter("getId", [], ["CONTAINS", "stone"]);
```

### Example 3: Filtering by Block Properties

```javascript
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");

// Find blocks mobs can spawn inside
const spawnableFilter = new BlockFilter("canMobSpawnInside", [], [true]);

// Find blocks with dynamic bounds
const dynamicBoundsFilter = new BlockFilter("hasDynamicBounds", [], [true]);

// Find blocks with specific blast resistance
const resistantFilter = new BlockFilter("getBlastResistance", [], [">=", 6.0]);
```

### Example 4: Combining with Logical Operations

```javascript
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");

// Create individual filters
const stoneFilter = new BlockFilter("getId", [], ["CONTAINS", "stone"]);
const hardFilter = new BlockFilter("getHardness", [], [">=", 1.5]);
const resistantFilter = new BlockFilter("getBlastResistance", [], [">=", 2.0]);

// Combine with logical operations (inherited from BasicFilter)
const combinedFilter = stoneFilter.and(hardFilter).or(resistantFilter);

// Use the combined filter
const scanner = World.getWorldScanner(combinedFilter, null);
const results = scanner.scanChunksAroundPlayer(1);
Chat.log(`Found ${results.length} matching blocks`);
```

### Example 5: Advanced Pattern Matching

```javascript
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");

// Find all building materials (blocks ending with specific patterns)
const buildingMaterialsFilter = new BlockFilter("getId", [], [
    "ENDS_WITH", "_planks"
]);

// Find all wood types
const woodFilter = new BlockFilter("getId", [], ["MATCHES", ".*_log$"]);

// Find all glass types
const glassFilter = new BlockFilter("getId", [], ["MATCHES", ".*glass.*"]);
```

## Integration with WorldScannerBuilder

While you can use BlockFilter directly, it's more commonly used through the `WorldScannerBuilder`:

```javascript
// Equivalent to WorldScannerBuilder usage
const scanner = World.getWorldScanner()
    .withBlockFilter("getHardness").is(">=", 2.0)
    .andBlockFilter("getId").contains("stone")
    .build();

// Direct BlockFilter usage
const BlockFilter = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockFilter");
const hardnessFilter = new BlockFilter("getHardness", [], [">=", 2.0]);
const stoneFilter = new BlockFilter("getId", [], ["CONTAINS", "stone"]);
const combinedFilter = hardnessFilter.and(stoneFilter);
const directScanner = World.getWorldScanner(combinedFilter, null);
```

## Performance Considerations

1. **Method Selection**: Choose the most efficient method for your filtering needs
   - `getId()` is generally faster than complex property checks
   - Avoid methods that return large objects or arrays

2. **Filter Order**: Place more restrictive filters first when combining
   - This reduces the number of blocks processed by subsequent filters

3. **Comparison Types**: Use appropriate comparison operations
   - `==` is faster than `MATCHES` with regular expressions
   - `CONTAINS` is efficient for substring searches

4. **Reuse Filters**: Create filter instances once and reuse them
   - Avoid recreating the same filters in loops

## Error Handling

The BlockFilter may throw exceptions in certain cases:

```javascript
try {
    // This will fail - method doesn't exist
    const badFilter = new BlockFilter("nonExistentMethod", [], [true]);
} catch (e) {
    Chat.log("Method not found: " + e.getMessage());
}

try {
    // This will fail - wrong filter arguments
    const badFilter = new BlockFilter("getHardness", [], ["CONTAINS", "test"]);
} catch (e) {
    Chat.log("Invalid filter arguments: " + e.getMessage());
}
```

## Inherited Methods

From `ClassWrapperFilter<BlockHelper>`:
- `apply(BlockHelper block)` - Applies the filter to a block and returns the result

From `BasicFilter<BlockHelper>`:
- `and(IFilter<BlockHelper> filter)` - Combines with another filter using AND logic
- `or(IFilter<BlockHelper> filter)` - Combines with another filter using OR logic
- `xor(IFilter<BlockHelper> filter)` - Combines with another filter using XOR logic
- `not()` - Negates the current filter

## Method Reference for BlockHelper

Here are some commonly used BlockHelper methods that work well with BlockFilter:

### Return Type: String
- `getId()` - Block identifier
- `toString()` - String representation

### Return Type: Number
- `getHardness()` - Block hardness
- `getBlastResistance()` - Blast resistance
- `getSlipperiness()` - Slipperiness factor
- `getJumpVelocityMultiplier()` - Jump velocity multiplier
- `getVelocityMultiplier()` - Movement velocity multiplier

### Return Type: Boolean
- `hasDynamicBounds()` - Has dynamic bounds
- `canMobSpawnInside()` - Can mobs spawn inside
- `isTool()` - Is a tool
- `isBlockItem()` - Has corresponding item
- `isWearable()` - Can be worn as armor
- `isFood()` - Is edible
- `isDamageable()` - Can take damage
- `isFireproof()` - Is immune to fire

## Related Classes

- `WorldScannerBuilder` - Preferred way to create block filters using fluent API
- `WorldScanner` - Uses BlockFilter for efficient world scanning
- `BlockHelper` - Provides methods that can be used with BlockFilter
- `BlockStateFilter` - Similar filter for block states instead of blocks
- `ClassWrapperFilter` - Parent class providing core filtering functionality
- `BasicFilter` - Provides logical operations (AND, OR, XOR, NOT)

## Best Practices

1. **Use WorldScannerBuilder**: For most use cases, prefer the fluent API of WorldScannerBuilder
2. **Choose Appropriate Methods**: Select methods that return simple, comparable values
3. **Combine Filters Effectively**: Use logical operations to create complex filtering logic
4. **Test Performance**: Monitor performance with large scan areas and optimize filters accordingly
5. **Handle Exceptions**: Wrap filter creation in try-catch blocks for robust error handling

## Version Information

- Available since JSMacros 1.6.5
- Designed for parallel world scanning operations
- Integrates with the WorldScanner filtering system
- Supports all major BlockHelper methods for comprehensive block filtering