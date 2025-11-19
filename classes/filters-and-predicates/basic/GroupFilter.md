# GroupFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.GroupFilter`

**Implements:** `IFilter<T>`

**Since:** JsMacros 1.6.5

The `GroupFilter` class is an abstract filter that provides a way to group multiple filters together and apply logical operations to them as a collection. This class serves as the foundation for specialized group filters that can evaluate multiple child filters using different matching strategies (all match, any match, none match, or count-based matching).

GroupFilter is particularly useful in the WorldScanner system when you need to create complex filtering conditions that involve multiple criteria evaluated together. Unlike simple binary logical filters (like AndFilter or OrFilter), GroupFilter can work with any number of child filters and provides flexible matching strategies.

## Overview

The GroupFilter class provides:

- **Multiple filter management**: Add, remove, and organize any number of child filters
- **Immutable filter collection**: Child filters are protected from external modification
- **Fluent interface**: Methods return the GroupFilter instance for method chaining
- **Specialized implementations**: Four concrete subclasses for different matching strategies
- **Generic type support**: Can work with any type `T` that the child filters can handle

## Table of Contents

- [Specialized Implementations](#specialized-implementations)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Advanced Filtering Patterns](#advanced-filtering-patterns)
- [Performance Considerations](#performance-considerations)
- [Related Classes](#related-classes)

## Specialized Implementations

GroupFilter has four concrete subclasses, each providing a different matching strategy:

### AllMatchFilter
Returns `true` only when **all** child filters return `true` for the given object.

### AnyMatchFilter
Returns `true` when **at least one** child filter returns `true` for the given object.

### NoneMatchFilter
Returns `true` when **none** of the child filters return `true` for the given object.

### CountMatchFilter
Returns `true` when the number of matching child filters satisfies a numeric comparison condition.

## Methods

## Usage Examples

### AllMatchFilter Example

Find blocks that satisfy ALL conditions (must match every filter):

```javascript
// Create individual filters
const diamondOreFilter = World.getStringBlockFilter().contains("diamond_ore");
const deepLevelFilter = World.getBlockFilter("getY").is("<", 16);
const exposedFilter = World.getStateFilter("isAir").is(false);

// Create AllMatchFilter and add conditions
const perfectDiamondFilter = new GroupFilter.AllMatchFilter();
perfectDiamondFilter
    .add(diamondOreFilter)
    .add(deepLevelFilter)
    .add(exposedFilter);

// Use with WorldScanner
const scanner = World.getWorldScanner(perfectDiamondFilter);
const results = scanner.scanAroundPlayer(3);

Chat.log(`Found ${results.length} perfect diamond locations`);
```

### AnyMatchFilter Example

Find blocks that satisfy ANY condition (matches at least one filter):

```javascript
// Create filters for different valuable ores
const diamondFilter = World.getStringBlockFilter().contains("diamond_ore");
const emeraldFilter = World.getStringBlockFilter().contains("emerald_ore");
const ancientDebrisFilter = World.getStringBlockFilter().contains("ancient_debris");

// Create AnyMatchFilter to find any valuable ore
const valuableOreFilter = new GroupFilter.AnyMatchFilter();
valuableOreFilter
    .add(diamondFilter)
    .add(emeraldFilter)
    .add(ancientDebrisFilter);

// Search for any valuable ore
const scanner = World.getWorldScanner(valuableOreFilter);
const valuableOres = scanner.scanCubeArea(Player.getPlayer().getPos(), 50);

Chat.log(`Found ${valuableOres.length} valuable ore blocks`);
```

### NoneMatchFilter Example

Find blocks that satisfy NONE of the conditions (exclude all matching filters):

```javascript
// Create filters for common, unwanted blocks
const airFilter = World.getStringBlockFilter().contains("air");
const dirtFilter = World.getStringBlockFilter().contains("dirt");
const grassFilter = World.getStringBlockFilter().contains("grass");
const stoneFilter = World.getStringBlockFilter().contains("stone");

// Create NoneMatchFilter to exclude common blocks
const uncommonBlockFilter = new GroupFilter.NoneMatchFilter();
uncommonBlockFilter
    .add(airFilter)
    .add(dirtFilter)
    .add(grassFilter)
    .add(stoneFilter);

// Find uncommon blocks around player
const scanner = World.getWorldScanner(uncommonBlockFilter);
const uncommonBlocks = scanner.scanAroundPlayer(2);

Chat.log(`Found ${uncommonBlocks.length} uncommon blocks`);
```

### CountMatchFilter Example

Find blocks based on how many of the filters they match:

```javascript
// Create filters for different wood types
const oakFilter = World.getStringBlockFilter().contains("oak");
const birchFilter = World.getStringBlockFilter().contains("birch");
const spruceFilter = World.getStringBlockFilter().contains("spruce");
const darkOakFilter = World.getStringBlockFilter().contains("dark_oak");

// Create CountMatchFilter - matches if at least 2 wood type filters match
const woodVarietyFilter = new GroupFilter.CountMatchFilter(">=", 2);
woodVarietyFilter
    .add(oakFilter)
    .add(birchFilter)
    .add(spruceFilter)
    .add(darkOakFilter);

// This would be useful for finding areas with wood variety
const scanner = World.getWorldScanner(woodVarietyFilter);
const variedAreas = scanner.scanAroundPlayer(5);
```

## Advanced Filtering Patterns

### Complex Multi-Criteria Filtering

Combine GroupFilter with other logical filters for sophisticated conditions:

```javascript
// Create complex filter: (diamond OR emerald) AND (deep OR exposed) AND NOT (near lava)
const valuableFilter = new GroupFilter.AnyMatchFilter();
valuableFilter
    .add(World.getStringBlockFilter().contains("diamond_ore"))
    .add(World.getStringBlockFilter().contains("emerald_ore"));

const locationFilter = new GroupFilter.AnyMatchFilter();
locationFilter
    .add(World.getBlockFilter("getY").is("<", 15))  // Deep
    .add(World.getStateFilter("isAir").is(true));  // Exposed

const dangerFilter = new GroupFilter.AnyMatchFilter();
dangerFilter
    .add(World.getStringBlockFilter().contains("lava"))
    .add(World.getStringBlockFilter().contains("fire"));

// Combine all conditions
const perfectMiningTarget = valuableFilter
    .and(locationFilter)
    .and(dangerFilter.not());

const scanner = World.getWorldScanner(perfectMiningTarget);
const targets = scanner.scanAroundPlayer(10);
```

### Dynamic Filter Management

Add or remove filters based on conditions:

```javascript
// Create a flexible ore filter
const oreFilter = new GroupFilter.AnyMatchFilter();

// Add basic ores
oreFilter.add(World.getStringBlockFilter().contains("coal_ore"));
oreFilter.add(World.getStringBlockFilter().contains("iron_ore"));

// Check player's level and add appropriate ores
const player = Player.getPlayer();
if (player && player.experienceLevel > 15) {
    oreFilter.add(World.getStringBlockFilter().contains("diamond_ore"));
    oreFilter.add(World.getStringBlockFilter().contains("emerald_ore"));
}

// Remove common ores if player is advanced
if (player && player.experienceLevel > 30) {
    oreFilter.remove(World.getStringBlockFilter().contains("coal_ore"));
}

const scanner = World.getWorldScanner(oreFilter);
const suitableOres = scanner.scanAroundPlayer(5);
```

### Filter Organization and Reuse

Organize filters into logical groups:

```javascript
// Create filter groups for different categories
const storageGroup = new GroupFilter.AnyMatchFilter();
storageGroup
    .add(World.getStringBlockFilter().contains("chest"))
    .add(World.getStringBlockFilter().contains("barrel"))
    .add(World.getStringBlockFilter().contains("shulker_box"));

const oreGroup = new GroupFilter.AnyMatchFilter();
oreGroup
    .add(World.getStringBlockFilter().contains("_ore"));

const toolGroup = new GroupFilter.AnyMatchFilter();
toolGroup
    .add(World.getStringBlockFilter().contains("pickaxe"))
    .add(World.getStringBlockFilter().contains("axe"))
    .add(World.getStringBlockFilter().contains("shovel"));

// Use groups in different combinations
const storageAndOres = storageGroup.and(oreGroup);
const toolsOnly = toolGroup;
const notStorage = storageGroup.not();

// Scan for different patterns
const scanner = World.getWorldScanner();
const storageOreResults = scanner.withFilter(storageAndOres).scanAroundPlayer(3);
const toolResults = scanner.withFilter(toolsOnly).scanAroundPlayer(2);
const nonStorageResults = scanner.withFilter(notStorage).scanAroundPlayer(1);
```

## Performance Considerations

### Filter Order

While GroupFilter evaluates all child filters (unlike AndFilter which short-circuits), you can optimize by organizing filters efficiently:

```javascript
// Less efficient - many expensive checks first
const inefficientFilter = new GroupFilter.AllMatchFilter();
inefficientFilter
    .add(expensiveNBTFilter)     // Expensive check
    .add(complexStateFilter)     // Complex calculation
    .add(simpleNameFilter);      // Simple string check

// More efficient - simple checks first
const efficientFilter = new GroupFilter.AllMatchFilter();
efficientFilter
    .add(simpleNameFilter)       // Quick rejection
    .add(complexStateFilter)     // Medium complexity
    .add(expensiveNBTFilter);    // Only checked if simpler ones pass
```

### Filter Count

Be mindful of the number of filters in a group:

```javascript
// Good - focused group with relevant filters
const focusedGroup = new GroupFilter.AnyMatchFilter();
focusedGroup
    .add(diamondFilter)
    .add(emeraldFilter)
    .add(ancientDebrisFilter);

// Potentially problematic - too many filters
const bloatedGroup = new GroupFilter.AnyMatchFilter();
for (let i = 0; i < 100; i++) {
    bloatedGroup.add(createSomeFilter(i)); // 100 filters!
}
```

### Memory Usage

GroupFilter maintains an internal list of all child filters. Consider this when working with very large filter collections:

```javascript
// Better approach for large numbers of similar filters
const efficientFilter = World.getStringBlockFilter()
    .contains("diamond_ore", "emerald_ore", "ancient_debris", "netherite_ore");

// Instead of
const lessEfficientFilter = new GroupFilter.AnyMatchFilter();
lessEfficientFilter.add(World.getStringBlockFilter().contains("diamond_ore"));
lessEfficientFilter.add(World.getStringBlockFilter().contains("emerald_ore"));
// ... many more individual filters
```

## Important Notes

### Abstract Class

- `GroupFilter` is abstract and cannot be instantiated directly
- Use one of the four concrete subclasses: `AllMatchFilter`, `AnyMatchFilter`, `NoneMatchFilter`, or `CountMatchFilter`

### Type Safety

- All filters in a group should be compatible with the same object type `T`
- Mixing incompatible filter types will result in runtime errors when the filters are applied

### Thread Safety

- The internal filter list is protected with `ImmutableList.copyOf()` when accessed via `getFilters()`
- This prevents external modification of the internal filter collection

### Method Chaining

- All modification methods (`add`, `remove`) return the GroupFilter instance for fluent interface
- This allows for convenient method chaining when building complex filter groups

### Integration with WorldScanner

GroupFilter integrates seamlessly with the WorldScanner system:

```javascript
// Direct usage
const scanner = World.getWorldScanner(groupFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withFilter(groupFilter)
    .build();
```

## Related Classes

- **IFilter** - Base interface that GroupFilter implements
- **AllMatchFilter** - Concrete implementation requiring all filters to match
- **AnyMatchFilter** - Concrete implementation requiring any filter to match
- **NoneMatchFilter** - Concrete implementation requiring no filters to match
- **CountMatchFilter** - Concrete implementation with count-based matching
- **NumberCompareFilter** - Used by CountMatchFilter for numeric comparisons
- **WorldScanner** - Main class for world scanning operations
- **WorldScannerBuilder** - Builder class for creating complex scanners

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system
- **Package:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter`







