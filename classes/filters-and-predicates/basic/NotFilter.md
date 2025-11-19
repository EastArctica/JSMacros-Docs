# NotFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.logical.NotFilter`

**Extends:** `BasicFilter<T>`

**Implements:** `IAdvancedFilter<T>`

**Since:** JSMacros 1.6.5

The `NotFilter` class is a logical filter that inverts the result of another filter using boolean NOT logic. It's part of the WorldScanner filtering system and allows you to create filtering conditions where the wrapped filter must return `false` for the NotFilter to return `true`.

This class is particularly useful when you need to exclude certain blocks, entities, or conditions from your search results. For example, finding all blocks that are NOT air, or excluding specific types of blocks from a search.

## Overview

The NotFilter provides a simple but powerful way to invert filter logic:

- **Logical inversion**: Returns the opposite of what the wrapped filter would return
- **Generic type support**: Can work with any type `T` that the wrapped filter can handle
- **Fluent interface**: Inherits `and()`, `or()`, `xor()`, and `not()` methods from BasicFilter for chaining
- **Performance**: Efficient single filter evaluation with simple boolean negation

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Important Notes](#important-notes)
- [Related Classes](#related-classes)

## Constructors

### `new NotFilter(filter)`

Creates a new NotFilter that inverts the result of the provided filter.

```javascript
// Create a filter for air blocks
const airFilter = World.getStringBlockFilter().contains("air");

// Create a NOT filter to find everything except air
const notAirFilter = new NotFilter(airFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter` | `IFilter<T>` | The filter whose logic will be inverted |

**Returns**
A new NotFilter instance that returns `true` when the wrapped filter returns `false`, and vice versa

**Since:** `1.6.5`

## Methods

### `apply(obj)`

Applies the NOT filter logic to an object. Returns `true` when the wrapped filter returns `false`, and `false` when the wrapped filter returns `true`.

```javascript
const testBlock = World.getBlock(100, 64, 200); // Some block
const passesFilter = notAirFilter.apply(testBlock);

if (passesFilter) {
    Chat.log("Block is NOT air!");
}
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `obj` | `T` | The object to test against the inverted filter logic |

**Returns**
* `Boolean`: `true` if the wrapped filter returns `false`, `false` if the wrapped filter returns `true`

### `getFilter()`

Returns the wrapped filter component.

```javascript
const wrappedFilter = notAirFilter.getFilter();
Chat.log(`Wrapped filter: ${wrappedFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The filter that was passed to the constructor

### Inherited Methods from BasicFilter

The NotFilter inherits several useful methods from BasicFilter for chaining filters:

- `and(filter)` - Combines this filter with another using AND logic
- `or(filter)` - Combines this filter with another using OR logic
- `xor(filter)` - Combines this filter with another using XOR logic
- `not()` - Returns a filter that inverts this filter's result (double negative)

## Usage Examples

### Basic Exclusion Filtering

Find all blocks that are NOT air:

```javascript
// Create filter for air blocks
const airFilter = World.getStringBlockFilter().contains("air");

// Create NOT filter to exclude air
const solidBlockFilter = new NotFilter(airFilter);

// Use with WorldScanner
const scanner = World.getWorldScanner(solidBlockFilter);
const results = scanner.scanAroundPlayer(3);

Chat.log(`Found ${results.length} non-air blocks`);
```

### Excluding Multiple Block Types

Find valuable ores while excluding common ones:

```javascript
// Filter for all ore types
const allOresFilter = World.getStringBlockFilter().contains("_ore");

// Filter for common ores
const commonOresFilter = World.getStringBlockFilter()
    .contains("coal_ore", "iron_ore", "copper_ore");

// Create NOT filter to exclude common ores
const excludeCommonOres = new NotFilter(commonOresFilter);

// Combine with AND to get only rare ores
const rareOresFilter = allOresFilter.and(excludeCommonOres);

const scanner = World.getWorldScanner(rareOresFilter);
const results = scanner.scanAroundPlayer(5);

Chat.log(`Found ${results.length} rare ore blocks (excluding coal, iron, copper)`);
```

### Excluding Blocks by Property

Find blocks that are NOT easily breakable:

```javascript
// Filter for blocks with low hardness (easy to break)
const easyToBreakFilter = World.getBlockFilter("getHardness").is("<", 2);

// Create NOT filter to find hard blocks
const hardBlockFilter = new NotFilter(easyToBreakFilter);

const scanner = World.getWorldScanner(hardBlockFilter);
const results = scanner.scanAroundPlayer(2);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const hardness = block.getBlockState().getHardness();
    Chat.log(`Hard block: ${block.getBlockState().getBlock().getName()} (hardness: ${hardness})`);
});
```

### Combining with Other Logical Operations

Use NotFilter in complex logical chains:

```javascript
// Base filters
const diamondFilter = World.getStringBlockFilter().contains("diamond_ore");
const deepFilter = World.getBlockFilter("getY").is("<", 16);
const airFilter = World.getStringBlockFilter().contains("air");

// Create NOT filter for air
const notAirFilter = new NotFilter(airFilter);

// Complex condition: (diamond AND deep) AND not air
const diamondDeepNotAir = diamondFilter
    .and(deepFilter)
    .and(notAirFilter);

const scanner = World.getWorldScanner(diamondDeepNotAir);
const results = scanner.scanAroundPlayer(4);

Chat.log(`Found ${results.length} diamond ore blocks at deep levels (excluding air)`);
```

### Excluding Specific Block States

Find wooden blocks that are NOT stripped:

```javascript
// Filter for all wooden blocks
const woodFilter = World.getStringBlockFilter()
    .contains("oak", "birch", "spruce", "jungle", "acacia", "dark_oak");

// Filter for stripped wood (contains "stripped" in name)
const strippedWoodFilter = World.getStringBlockFilter().contains("stripped");

// Create NOT filter to exclude stripped wood
const notStrippedFilter = new NotFilter(strippedWoodFilter);

// Combine to get non-stripped wood only
const naturalWoodFilter = woodFilter.and(notStrippedFilter);

const scanner = World.getWorldScanner(naturalWoodFilter);
const results = scanner.scanAroundPlayer(3);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    Chat.log(`Natural wood: ${block.getBlockState().getBlock().getName()}`);
});
```

### Entity Filtering

Find entities that are NOT players:

```javascript
// Create filter for player entities
const playerFilter = World.getEntityFilter().getType().is("minecraft:player");

// Create NOT filter to exclude players
const notPlayerFilter = new NotFilter(playerFilter);

// Use to find non-player entities
const nearbyEntities = World.getEntities(notPlayerFilter, 10);

Chat.log(`Found ${nearbyEntities.length} non-player entities nearby`);
nearbyEntities.forEach(entity => {
    Chat.log(`Entity: ${entity.getType()} at ${entity.getPos()}`);
});
```

### Double Negation

Using `not()` method on a NotFilter creates a double negative:

```javascript
const airFilter = World.getStringBlockFilter().contains("air");
const notAirFilter = new NotFilter(airFilter);
const doubleNegative = notAirFilter.not();

// doubleNegative is equivalent to original airFilter
const scanner1 = World.getWorldScanner(airFilter);
const scanner2 = World.getWorldScanner(doubleNegative);

// Both will find the same results (air blocks)
```

### Excluding Range Values

Find blocks at Y levels that are NOT in the overworld build limit:

```javascript
// Filter for blocks within build limit (Y < 320)
const buildLimitFilter = World.getBlockFilter("getY").is("<", 320);

// Create NOT filter for blocks above build limit
const aboveBuildLimit = new NotFilter(buildLimitFilter);

// Alternative: direct filter for Y >= 320
const aboveBuildLimitDirect = World.getBlockFilter("getY").is(">=", 319);

// Both approaches work, but NOT filter can be useful when you have an existing filter
const scanner = World.getWorldScanner(aboveBuildLimit);
```

### Performance Optimization with NOT

Use NOT filter to exclude common cases first:

```javascript
// Most blocks are not diamond ore - put this check first
const diamondFilter = World.getStringBlockFilter().contains("diamond_ore");

// Most blocks are not at deep levels - put this second
const deepFilter = World.getBlockFilter("getY").is("<", 16);

// Instead of: find blocks that are (diamond AND deep)
// Use: exclude blocks that are (not diamond OR not deep)
const notDiamondFilter = new NotFilter(diamondFilter);
const notDeepFilter = new NotFilter(deepFilter);

const targetFilter = notDiamondFilter.or(notDeepFilter).not();

// This can sometimes be more efficient depending on the data distribution
const scanner = World.getWorldScanner(targetFilter);
```

## Important Notes

### Performance Considerations

1. **Single evaluation**: NotFilter only evaluates one wrapped filter, making it very efficient
2. **No short-circuiting**: Since there's only one filter, there's no short-circuit behavior to optimize
3. **Simple logic**: The NOT operation is a simple boolean negation with minimal overhead

### Error Handling

1. **Null filter**: The constructor expects a non-null filter parameter
2. **Exception propagation**: Exceptions from the wrapped filter are propagated through `apply()`
3. **Type compatibility**: The wrapped filter should be compatible with the object type being filtered

### Best Practices

1. **Clear naming**: Use clear variable names like `notAirFilter`, `excludeCommonBlocks`, etc.
2. **Specific exclusion**: Be specific about what you're excluding to avoid unintended exclusions
3. **Testing**: Test the original filter before wrapping it with NotFilter
4. **Documentation**: Document why you're excluding certain conditions for future maintainers

### Common Use Cases

- **Exclusion filtering**: Remove unwanted items from search results
- **Inversion logic**: When it's easier to specify what to exclude rather than what to include
- **Clean-up operations**: Find all items that don't meet certain cleanup criteria
- **Complementary sets**: Create the opposite of an existing filter

### Integration with WorldScanner

NotFilter integrates seamlessly with the WorldScanner system:

```javascript
// Direct usage
const scanner = World.getWorldScanner(notAirFilter);

// Through WorldScannerBuilder with method chaining
const scanner = World.getWorldScanner()
    .withStringBlockFilter().contains("diamond_ore")
    .not()  // Built-in NOT method
    .build();
```

### Logical Equivalents

Sometimes there are multiple ways to express the same logic:

```javascript
// Method 1: Using NotFilter
const airFilter = World.getStringBlockFilter().contains("air");
const notAirFilter = new NotFilter(airFilter);

// Method 2: Using built-in not() method
const notAirFilter2 = World.getStringBlockFilter().contains("air").not();

// Both methods create equivalent filters
```

## Related Classes

- **AndFilter**: Logical AND combination of two filters
- **OrFilter**: Logical OR combination of two filters
- **XorFilter**: Logical XOR (exclusive OR) combination of two filters
- **BasicFilter**: Abstract base class providing logical filter operations
- **IFilter**: Base interface for all filters
- **IAdvancedFilter**: Interface extending IFilter with logical operations
- **WorldScanner**: Main class for world scanning operations
- **WorldScannerBuilder**: Builder class for creating complex scanners

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system