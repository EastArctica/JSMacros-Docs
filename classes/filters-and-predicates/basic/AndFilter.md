# AndFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.logical.AndFilter`

**Extends:** `BasicFilter<T>`

**Implements:** `IAdvancedFilter<T>`

The `AndFilter` class is a logical filter that combines two filters using boolean AND logic. It's part of the WorldScanner filtering system and allows you to create sophisticated filtering conditions where both component filters must return `true` for the AndFilter to return `true`.

This class is particularly useful when you need to filter blocks or entities based on multiple criteria that must all be satisfied simultaneously. For example, finding blocks that are both of a certain type AND have specific properties.

## Overview

The AndFilter implements short-circuit evaluation for performance optimization:

- **Short-circuit AND**: If the first filter returns `false`, the second filter is not evaluated
- **Generic type support**: Can work with any type `T` that the component filters can handle
- **Fluent interface**: Inherits `and()`, `or()`, `xor()`, and `not()` methods from BasicFilter for chaining

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Important Notes](#important-notes)
- [Related Classes](#related-classes)

## Constructors

### `new AndFilter(filterOne, filterTwo)`

Creates a new AndFilter that combines two filters with AND logic.

```javascript
// Create filters for diamond ore and specific Y level
const oreFilter = World.getStringBlockFilter().contains("diamond_ore");
const yLevelFilter = World.getBlockFilter("getY").is("<", 16);

// Combine with AND logic
const andFilter = new AndFilter(oreFilter, yLevelFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filterOne` | `IFilter<T>` | The first filter to evaluate |
| `filterTwo` | `IFilter<T>` | The second filter to evaluate |

**Returns**
A new AndFilter instance that returns `true` only when both filters return `true`

**Since:** `1.6.5`

## Methods

### `apply(obj)`

Applies the AND filter logic to an object. Returns `true` only if both filters return `true` for the given object.

```javascript
const testBlock = World.getBlock(100, 10, 200); // Block at diamond level
const passesFilter = andFilter.apply(testBlock);

if (passesFilter) {
    Chat.log("Block meets both criteria!");
}
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `obj` | `T` | The object to test against both filters |

**Returns**
* `Boolean`: `true` only if both filters return `true`, `false` otherwise

**Note:** This method implements short-circuit evaluation - if `filterOne.apply(obj)` returns `false`, `filterTwo.apply(obj)` is never called.

### `getFilterOne()`

Returns the first filter component.

```javascript
const firstFilter = andFilter.getFilterOne();
Chat.log(`First filter: ${firstFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The first filter that was passed to the constructor

### `getFilterTwo()`

Returns the second filter component.

```javascript
const secondFilter = andFilter.getFilterTwo();
Chat.log(`Second filter: ${secondFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The second filter that was passed to the constructor

### Inherited Methods from BasicFilter

The AndFilter inherits several useful methods from BasicFilter for chaining filters:

- `and(filter)` - Combines this filter with another using AND logic
- `or(filter)` - Combines this filter with another using OR logic
- `xor(filter)` - Combines this filter with another using XOR logic
- `not()` - Returns a filter that inverts this filter's result

## Usage Examples

### Basic Block Filtering

Find diamond ore that's below Y level 16:

```javascript
// Create individual filters
const diamondOreFilter = World.getStringBlockFilter().contains("diamond_ore");
const deepLevelFilter = World.getBlockFilter("getY").is("<", 16);

// Combine with AND logic
const deepDiamondFilter = new AndFilter(diamondOreFilter, deepLevelFilter);

// Use with WorldScanner
const scanner = World.getWorldScanner(deepDiamondFilter);
const results = scanner.scanAroundPlayer(2);

Chat.log(`Found ${results.length} diamond ore blocks below Y=16`);
```

### Complex Property Filtering

Find blocks that are both storage containers AND have specific properties:

```javascript
// Filter for storage blocks
const storageFilter = World.getStringBlockFilter()
    .contains("chest", "barrel", "shulker_box");

// Filter for blocks that require tools
const toolRequiredFilter = World.getStateFilter("isToolRequired").is(true);

// Combine both conditions
const storageWithToolFilter = new AndFilter(storageFilter, toolRequiredFilter);

// Create scanner and search
const scanner = World.getWorldScanner(storageWithToolFilter);
const results = scanner.scanAroundPlayer(1);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    Chat.log(`Found ${block.getBlockState().getBlock().getName()} at ${pos.toString()}`);
});
```

### Entity and Block Combination

Create a filter that checks both block type and block state:

```javascript
// Filter for wood blocks
const woodFilter = World.getStringBlockFilter().contains("oak_planks", "birch_planks");

// Filter for specific orientation (facing north)
const northFacingFilter = World.getStateFilter("getFacing").is("north");

// Combine filters
const northWoodFilter = new AndFilter(woodFilter, northFacingFilter);

// Use in scanning
const scanner = World.getWorldScanner(northWoodFilter);
const results = scanner.scanCubeArea(Player.getPlayer().getPos(), 20);

Chat.log(`Found ${results.length} wood blocks facing north`);
```

### Chaining with Other Logical Operations

Combine AndFilter with other logical filters for complex conditions:

```javascript
// Base filters
const coalFilter = World.getStringBlockFilter().contains("coal_ore");
const ironFilter = World.getStringBlockFilter().contains("iron_ore");
const goldFilter = World.getStringBlockFilter().contains("gold_ore");
const deepFilter = World.getBlockFilter("getY").is("<", 32);

// Create AND filter for deep coal
const deepCoalFilter = new AndFilter(coalFilter, deepFilter);

// Create AND filter for deep gold
const deepGoldFilter = new AndFilter(goldFilter, deepFilter);

// Create OR filter to combine them (any deep coal OR gold)
const valuableDeepOres = deepCoalFilter.or(deepGoldFilter);

// You can still add more conditions
const finalFilter = valuableDeepOres.and(ironFilter); // Also requires iron ore

const scanner = World.getWorldScanner(finalFilter);
const results = scanner.scanAroundPlayer(3);
```

### Custom Function Filters

Combine AndFilter with custom filter functions:

```javascript
// Custom filter for hardness
const hardnessFilter = {
    apply: (block) => block.getBlockState().getHardness() >= 3
};

// Filter for blast resistance
const blastResistanceFilter = {
    apply: (block) => block.getBlockState().getBlock().getBlastResistance() > 6
};

// Combine with AndFilter
const durableBlockFilter = new AndFilter(hardnessFilter, blastResistanceFilter);

// Apply to blocks around player
const playerPos = Player.getPlayer().getPos();
const scanner = World.getWorldScanner(durableBlockFilter);
const durableBlocks = scanner.scanSphereArea(playerPos, 10);

Chat.log(`Found ${durableBlocks.length} durable blocks nearby`);
```

### Performance Optimization Example

Use AndFilter for efficient filtering by putting the most restrictive filter first:

```javascript
// Very restrictive filter (few matches) - put first
const emeraldFilter = World.getStringBlockFilter().contains("emerald_ore");

// Less restrictive filter (more matches) - put second
const mountainFilter = World.getBlockFilter("getY").is(">", 100);

// AND filter will short-circuit on emerald check first
const mountainEmeraldFilter = new AndFilter(emeraldFilter, mountainFilter);

// This is more efficient than if mountainFilter was first,
// since most blocks aren't emerald ore
const scanner = World.getWorldScanner(mountainEmeraldFilter);
const results = scanner.scanAroundPlayer(5);
```

## Important Notes

### Performance Considerations

1. **Short-circuit evaluation**: The second filter is only evaluated if the first returns `true`
2. **Filter order matters**: Put more restrictive filters first for better performance
3. **Lazy evaluation**: Filters are only evaluated when `apply()` is called

### Error Handling

1. **Null filters**: The constructor expects non-null filter parameters
2. **Type compatibility**: Both filters should be compatible with the same object type
3. **Exception propagation**: Exceptions from component filters are propagated through `apply()`

### Best Practices

1. **Specific to general**: Order filters from most specific to most general
2. **Simple to complex**: Put computationally cheaper filters first
3. **Reusability**: Create commonly used filter combinations as reusable AndFilter instances
4. **Testing**: Test individual filters before combining them

### Common Use Cases

- **Multi-criteria block searching**: Find blocks that match multiple conditions
- **Property-based filtering**: Filter based on both type and state properties
- **Location-based filtering**: Combine location filters with type filters
- **Performance optimization**: Use early rejection with well-ordered filters

### Integration with WorldScanner

AndFilter integrates seamlessly with the WorldScanner system:

```javascript
// Direct usage
const scanner = World.getWorldScanner(andFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withStringBlockFilter().contains("chest")
    .andBlockFilter("getHardness").is(">", 5)
    .build();
```

## Related Classes

- **OrFilter**: Logical OR combination of two filters
- **XorFilter**: Logical XOR (exclusive OR) combination of two filters
- **NotFilter**: Logical NOT inversion of a filter
- **BasicFilter**: Abstract base class providing logical filter operations
- **IFilter**: Base interface for all filters
- **IAdvancedFilter**: Interface extending IFilter with logical operations
- **WorldScanner**: Main class for world scanning operations
- **WorldScannerBuilder**: Builder class for creating complex scanners

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system