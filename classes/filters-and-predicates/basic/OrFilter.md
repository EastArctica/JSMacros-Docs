# OrFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.logical.OrFilter`

**Extends:** `BasicFilter<T>`

**Implements:** `IAdvancedFilter<T>`

**Since:** JSMacros 1.6.5

The `OrFilter` class is a logical filter that combines two filters using boolean OR logic. It's part of the WorldScanner filtering system and allows you to create sophisticated filtering conditions where either of the component filters can return `true` for the OrFilter to return `true`.

This class is particularly useful when you need to filter blocks or entities based on multiple criteria where any one of the criteria being satisfied is sufficient. For example, finding blocks that are either of a certain type OR have specific properties.

## Overview

The OrFilter implements short-circuit evaluation for performance optimization:

- **Short-circuit OR**: If the first filter returns `true`, the second filter is not evaluated
- **Generic type support**: Can work with any type `T` that the component filters can handle
- **Fluent interface**: Inherits `and()`, `or()`, `xor()`, and `not()` methods from BasicFilter for chaining

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Important Notes](#important-notes)
- [Related Classes](#related-classes)

## Constructors

### `new OrFilter(filterOne, filterTwo)`

Creates a new OrFilter that combines two filters with OR logic.

```javascript
// Create filters for different ore types
const diamondFilter = World.getStringBlockFilter().contains("diamond_ore");
const emeraldFilter = World.getStringBlockFilter().contains("emerald_ore");

// Combine with OR logic
const valuableOreFilter = new OrFilter(diamondFilter, emeraldFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filterOne` | `IFilter<T>` | The first filter to evaluate |
| `filterTwo` | `IFilter<T>` | The second filter to evaluate |

**Returns**
A new OrFilter instance that returns `true` when either filter returns `true`

**Since:** `1.6.5`

## Methods

### `apply(obj)`

Applies the OR filter logic to an object. Returns `true` if either filter returns `true` for the given object.

```javascript
const testBlock = World.getBlock(100, 10, 200);
const passesFilter = valuableOreFilter.apply(testBlock);

if (passesFilter) {
    Chat.log("Block is either diamond ore OR emerald ore!");
}
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `obj` | `T` | The object to test against both filters |

**Returns**
* `Boolean`: `true` if either filter returns `true`, `false` otherwise

**Note:** This method implements short-circuit evaluation - if `filterOne.apply(obj)` returns `true`, `filterTwo.apply(obj)` is never called.

### `getFilterOne()`

Returns the first filter component.

```javascript
const firstFilter = valuableOreFilter.getFilterOne();
Chat.log(`First filter: ${firstFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The first filter that was passed to the constructor

### `getFilterTwo()`

Returns the second filter component.

```javascript
const secondFilter = valuableOreFilter.getFilterTwo();
Chat.log(`Second filter: ${secondFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The second filter that was passed to the constructor

### Inherited Methods from BasicFilter

The OrFilter inherits several useful methods from BasicFilter for chaining filters:

- `and(filter)` - Combines this filter with another using AND logic
- `or(filter)` - Combines this filter with another using OR logic
- `xor(filter)` - Combines this filter with another using XOR logic
- `not()` - Returns a filter that inverts this filter's result

## Usage Examples

### Basic Block Filtering

Find any valuable ore (diamond OR emerald):

```javascript
// Create individual filters
const diamondOreFilter = World.getStringBlockFilter().contains("diamond_ore");
const emeraldOreFilter = World.getStringBlockFilter().contains("emerald_ore");

// Combine with OR logic
const valuableOreFilter = new OrFilter(diamondOreFilter, emeraldOreFilter);

// Use with WorldScanner
const scanner = World.getWorldScanner(valuableOreFilter);
const results = scanner.scanAroundPlayer(5);

Chat.log(`Found ${results.length} valuable ore blocks`);
```

### Multiple Storage Types

Find any storage containers (chests, barrels, OR shulker boxes):

```javascript
// Filter for chests
const chestFilter = World.getStringBlockFilter().contains("chest");

// Filter for barrels
const barrelFilter = World.getStringBlockFilter().contains("barrel");

// Combine with OR logic
const storageFilter = new OrFilter(chestFilter, barrelFilter);

// You can chain additional OR operations
const allStorageFilter = storageFilter.or(
    World.getStringBlockFilter().contains("shulker_box")
);

// Create scanner and search
const scanner = World.getWorldScanner(allStorageFilter);
const results = scanner.scanAroundPlayer(2);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    Chat.log(`Found storage block: ${block.getBlockState().getBlock().getName()} at ${pos.toString()}`);
});
```

### Location-Based OR Logic

Find blocks that are either at high altitude OR deep underground:

```javascript
// Filter for high altitude blocks (above Y=100)
const highAltitudeFilter = World.getBlockFilter("getY").is(">", 100);

// Filter for deep underground blocks (below Y=15)
const deepUndergroundFilter = World.getBlockFilter("getY").is("<", 15);

// Combine with OR logic
const extremeLocationFilter = new OrFilter(highAltitudeFilter, deepUndergroundFilter);

// Use in scanning
const scanner = World.getWorldScanner(extremeLocationFilter);
const results = scanner.scanAroundPlayer(10);

Chat.log(`Found ${results.length} blocks at extreme locations`);
```

### Complex Property Filtering

Find blocks that are either light sources OR require special tools:

```javascript
// Filter for light-emitting blocks
const lightSourceFilter = World.getBlockFilter("getLuminance").is(">", 0);

// Filter for blocks requiring special tools
const toolRequiredFilter = World.getStateFilter("isToolRequired").is(true);

// Combine with OR logic
const specialBlockFilter = new OrFilter(lightSourceFilter, toolRequiredFilter);

// Scan around player
const playerPos = Player.getPlayer().getPos();
const scanner = World.getWorldScanner(specialBlockFilter);
const specialBlocks = scanner.scanSphereArea(playerPos, 15);

specialBlocks.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const name = block.getBlockState().getBlock().getName();
    Chat.log(`Special block: ${name} at ${pos.toString()}`);
});
```

### Chaining with Other Logical Operations

Combine OrFilter with other logical filters for complex conditions:

```javascript
// Base filters
const coalFilter = World.getStringBlockFilter().contains("coal_ore");
const ironFilter = World.getStringBlockFilter().contains("iron_ore");
const goldFilter = World.getStringBlockFilter().contains("gold_ore");
const deepFilter = World.getBlockFilter("getY").is("<", 32);

// Create OR filter for common ores
const commonOresFilter = new OrFilter(coalFilter, ironFilter);

// Add gold with another OR
const allCommonOresFilter = commonOresFilter.or(goldFilter);

// Combine with deep level requirement using AND
const deepCommonOresFilter = allCommonOresFilter.and(deepFilter);

// Create NOT filter to exclude certain areas
const notInNetherFilter = World.getStringBlockFilter().contains("netherrack").not();
const finalFilter = deepCommonOresFilter.and(notInNetherFilter);

const scanner = World.getWorldScanner(finalFilter);
const results = scanner.scanAroundPlayer(3);

Chat.log(`Found ${results.length} common ore blocks at deep levels (excluding Nether)`);
```

### Multi-Dimensional Filtering

Find blocks that match multiple alternative criteria:

```javascript
// Create multiple OR conditions for building materials
const woodFilter = World.getStringBlockFilter().contains("planks", "log");
const stoneFilter = World.getStringBlockFilter().contains("stone", "cobblestone");
const metalFilter = World.getStringBlockFilter().contains("iron_block", "gold_block");

// Combine with OR logic
const buildingMaterialFilter = new OrFilter(woodFilter, stoneFilter);
const allMaterialsFilter = buildingMaterialFilter.or(metalFilter);

// Add durability requirement
const durableFilter = World.getBlockFilter("getHardness").is(">", 2);
const finalMaterialFilter = allMaterialsFilter.and(durableFilter);

const scanner = World.getWorldScanner(finalMaterialFilter);
const materials = scanner.scanAroundPlayer(2);

Chat.log(`Found ${materials.length} durable building materials`);
```

### Custom Function Filters

Combine OrFilter with custom filter functions:

```javascript
// Custom filter for red blocks
const redBlockFilter = {
    apply: (block) => {
        const name = block.getBlockState().getBlock().getName().toLowerCase();
        return name.includes("red") || name.includes("crimson");
    }
};

// Custom filter for blue blocks
const blueBlockFilter = {
    apply: (block) => {
        const name = block.getBlockState().getBlock().getName().toLowerCase();
        return name.includes("blue") || name.includes("lapis") || name.includes("ice");
    }
};

// Combine with OrFilter
const coloredBlockFilter = new OrFilter(redBlockFilter, blueBlockFilter);

// Apply to blocks around player
const playerPos = Player.getPlayer().getPos();
const scanner = World.getWorldScanner(coloredBlockFilter);
const coloredBlocks = scanner.scanSphereArea(playerPos, 8);

Chat.log(`Found ${coloredBlocks.length} red or blue blocks`);
```

### Performance Optimization Example

Use OrFilter for efficient filtering by putting the most likely matching filter first:

```javascript
// Common filter (many matches) - put first for better performance
const stoneFilter = World.getStringBlockFilter().contains("stone");

// Rare filter (few matches) - put second
const diamondFilter = World.getStringBlockFilter().contains("diamond_ore");

// OR filter will short-circuit on stone check first
const commonOrRareFilter = new OrFilter(stoneFilter, diamondFilter);

// This is more efficient than if diamondFilter was first,
// since most blocks aren't diamond ore
const scanner = World.getWorldScanner(commonOrRareFilter);
const results = scanner.scanAroundPlayer(5);
```

### Biome-Specific OR Logic

Find blocks that are specific to different biomes:

```javascript
// Desert-specific blocks
const desertFilter = World.getStringBlockFilter().contains("sand", "cactus", "dead_bush");

// Ocean-specific blocks
const oceanFilter = World.getStringBlockFilter().contains("coral", "seagrass", "kelp");

// Combine with OR logic
const biomeSpecificFilter = new OrFilter(desertFilter, oceanFilter);

// You can add more biome filters
const forestFilter = World.getStringBlockFilter().contains("oak_log", "birch_log", "leaves");
const allBiomeFilter = biomeSpecificFilter.or(forestFilter);

const scanner = World.getWorldScanner(allBiomeFilter);
const biomeBlocks = scanner.scanAroundPlayer(3);

Chat.log(`Found ${biomeBlocks.length} biome-specific blocks`);
```

## Important Notes

### Performance Considerations

1. **Short-circuit evaluation**: The second filter is only evaluated if the first returns `false`
2. **Filter order matters**: Put more likely-to-match filters first for better performance
3. **Lazy evaluation**: Filters are only evaluated when `apply()` is called

### Error Handling

1. **Null filters**: The constructor expects non-null filter parameters
2. **Type compatibility**: Both filters should be compatible with the same object type
3. **Exception propagation**: Exceptions from component filters are propagated through `apply()`

### Best Practices

1. **Likely to unlikely**: Order filters from most likely to match to least likely
2. **Simple to complex**: Put computationally cheaper filters first
3. **Reusability**: Create commonly used filter combinations as reusable OrFilter instances
4. **Testing**: Test individual filters before combining them

### Common Use Cases

- **Multiple type filtering**: Find blocks that match any of several types
- **Alternative conditions**: Filter based on either of several possible conditions
- **Location flexibility**: Combine different location-based criteria
- **Property flexibility**: Filter based on either of several possible properties

### Integration with WorldScanner

OrFilter integrates seamlessly with the WorldScanner system:

```javascript
// Direct usage
const scanner = World.getWorldScanner(orFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withStringBlockFilter().contains("chest")
    .orStringBlockFilter().contains("barrel")
    .build();
```

## Related Classes

- **AndFilter**: Logical AND combination of two filters
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