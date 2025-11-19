# AllMatchFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.GroupFilter.AllMatchFilter`

**Extends:** `GroupFilter<T>`

**Implements:** `IFilter<T>`

**Since:** JsMacros 1.6.5

The `AllMatchFilter` class is a concrete implementation of `GroupFilter` that returns `true` only when **all** child filters return `true` for the given object. This filter is essentially a more flexible version of the `AndFilter` that can work with any number of child filters rather than being limited to just two.

AllMatchFilter is perfect for situations where you need to ensure that an object meets multiple criteria simultaneously. Unlike `AndFilter` which short-circuits (stops evaluating as soon as one filter returns false), AllMatchFilter evaluates all child filters to determine the final result.

## Overview

The AllMatchFilter class provides:

- **Multi-condition AND logic**: Requires all filters to return true for a match
- **Flexible filter count**: Can handle any number of child filters
- **Fluent interface**: Methods return the AllMatchFilter instance for method chaining
- **Complete evaluation**: Evaluates all filters even if early ones return false (useful for side effects or debugging)

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)
- [Related Classes](#related-classes)

## Constructors

### `new AllMatchFilter()`

Creates a new AllMatchFilter with no child filters. Use the `add()` method to add filters to the group.

**Example:**
```js
const allMatchFilter = new GroupFilter.AllMatchFilter();
```

## Methods

AllMatchFilter inherits all methods from `GroupFilter`:

### `add(filter)`

Adds a child filter to the group.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to add |

**Returns:** `AllMatchFilter` - Returns this instance for method chaining

### `remove(filter)`

Removes a child filter from the group.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to remove |

**Returns:** `AllMatchFilter` - Returns this instance for method chaining

### `getFilters()`

Returns an immutable list of all child filters.

**Returns:** `ImmutableList<IFilter<T>>` - Copy of the internal filter list

### `test(object)`

Tests whether the given object matches ALL child filters.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| object | T | The object to test |

**Returns:** `boolean` - `true` only if all child filters return `true`

### `and(other)`

Combines this filter with another using AND logic.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| other | IFilter<T> | The filter to combine with |

**Returns:** `AndFilter<T>` - New filter representing both conditions

### `or(other)`

Combines this filter with another using OR logic.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| other | IFilter<T> | The filter to combine with |

**Returns:** `OrFilter<T>` - New filter representing either condition

### `not()`

Creates a negated version of this filter.

**Returns:** `NotFilter<T>` - New filter that returns the opposite result

## Usage Examples

### Basic Multi-Condition Filtering

Find blocks that satisfy ALL conditions:

```js
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

### Entity Filtering with Multiple Properties

Find entities that match multiple criteria:

```js
// Create filters for player-like entities
const playerTypeFilter = World.getEntityFilter("getType").contains("player");
const healthThresholdFilter = World.getEntityFilter("getHealth").is(">", 10);
const creativeModeFilter = World.getEntityFilter("getGameMode").equals("creative");

// Combine with AllMatchFilter
const healthyCreativePlayers = new GroupFilter.AllMatchFilter();
healthyCreativePlayers
    .add(playerTypeFilter)
    .add(healthThresholdFilter)
    .add(creativeModeFilter);

// Scan area
const scanner = World.getWorldScanner(healthyCreativePlayers);
const players = scanner.scanAroundPlayer(20);

Chat.log(`Found ${players.length} healthy creative players`);
```

### Item Quality Control

Filter for high-quality items with multiple desirable properties:

```js
// Create quality filters
const enchantmentFilter = World.getItemFilter("getEnchantments").is(">", 0);
const durabilityFilter = World.getItemFilter("getDurability").is(">", 80);
const rarityFilter = World.getStringBlockFilter().contains("diamond", "netherite");

// Combine for perfect items
const highQualityItems = new GroupFilter.AllMatchFilter();
highQualityItems
    .add(enchantmentFilter)
    .add(durabilityFilter)
    .add(rarityFilter);

// Use with inventory scanning
const playerInv = Player.getPlayer().getInventory();
const qualityItems = playerInv.getItems(highQualityItems);

Chat.log(`Found ${qualityItems.length} high-quality items`);
```

### Complex Block State Filtering

Find blocks with specific state combinations:

```js
// Create state filters
const waterLoggedFilter = World.getStateFilter("waterlogged").equals(true);
const axisFilter = World.getStateFilter("axis").equals("y");
const poweredFilter = World.getStateFilter("powered").equals(false);

// Find specific configuration
const specificBlockConfig = new GroupFilter.AllMatchFilter();
specificBlockConfig
    .add(waterLoggedFilter)
    .add(axisFilter)
    .add(poweredFilter);

// Search for blocks with this exact configuration
const scanner = World.getWorldScanner(specificBlockConfig);
const matchingBlocks = scanner.scanAroundPlayer(5);
```

## Advanced Patterns

### Dynamic Filter Addition

Add filters based on runtime conditions:

```js
// Create base filter
const versatileFilter = new GroupFilter.AllMatchFilter();

// Always add basic condition
versatileFilter.add(World.getStringBlockFilter().contains("ore"));

// Add conditions based on player level
const player = Player.getPlayer();
if (player && player.experienceLevel > 15) {
    versatileFilter.add(World.getBlockFilter("getY").is("<", 20));
}

if (player && player.experienceLevel > 30) {
    versatileFilter.add(World.getStateFilter("exposed").equals(true));
}

// Use the dynamic filter
const scanner = World.getWorldScanner(versatileFilter);
const results = scanner.scanAroundPlayer(10);
```

### Filter Combination

Use AllMatchFilter within larger filter structures:

```js
// Create sub-filters
const metalOres = new GroupFilter.AllMatchFilter();
metalOres
    .add(World.getStringBlockFilter().contains("ore"))
    .add(World.getStringBlockFilter().contains("iron", "gold", "copper"));

const valuableBlocks = new GroupFilter.AllMatchFilter();
valuableBlocks
    .add(World.getStringBlockFilter().contains("diamond", "emerald", "ancient_debris"))
    .add(World.getBlockFilter("getY").is("<", 15));

// Combine with other logic
const miningTargets = metalOres.or(valuableBlocks);

const scanner = World.getWorldScanner(miningTargets);
const targets = scanner.scanAroundPlayer(5);
```

### Debugging and Analysis

Since AllMatchFilter evaluates all filters, it's useful for debugging:

```js
// Create filters that also log their results
const debugFilter1 = World.getStringBlockFilter().contains("diamond_ore");
const debugFilter2 = World.getBlockFilter("getY").is("<", 16);

// Wrap filters to add logging (if supported)
const loggingFilter1 = (object) => {
    const result = debugFilter1.test(object);
    if (result) Chat.log("Filter 1 matched: diamond ore");
    return result;
};

const loggingFilter2 = (object) => {
    const result = debugFilter2.test(object);
    if (result) Chat.log("Filter 2 matched: deep level");
    return result;
};

// AllMatchFilter will evaluate both, letting us see all matches
const debugGroup = new GroupFilter.AllMatchFilter();
debugGroup.add(loggingFilter1).add(loggingFilter2);
```

## Performance Considerations

### Complete Evaluation

Unlike `AndFilter`, AllMatchFilter evaluates ALL child filters even if early ones return false:

```js
// This will call both expensive functions even if filter1 returns false
const allMatch = new GroupFilter.AllMatchFilter();
allMatch
    .add(cheapFilter)      // Returns false
    .add(expensiveFilter); // Still gets called

// vs AndFilter which would short-circuit
const andFilter = cheapFilter.and(expensiveFilter); // expensiveFilter never called if cheapFilter returns false
```

### Filter Order Optimization

While evaluation order doesn't affect the result, you can optimize for debugging or side effects:

```js
// Good for debugging - put most informative filters first
const debugOrder = new GroupFilter.AllMatchFilter();
debugOrder
    .add(rarityFilter)     // Most informative
    .add(locationFilter)   // Secondary info
    .add(qualityFilter);   // Additional detail

// Good for performance if you plan to convert to AndFilter later
const performanceOrder = new GroupFilter.AllMatchFilter();
performanceOrder
    .add(cheapFilter)      // Quick rejection
    .add(mediumFilter)     // Moderate cost
    .add(expensiveFilter); // Only if necessary
```

### Memory Usage

Each filter in the group consumes memory. For very large numbers of simple conditions, consider using specialized filters:

```js
// Less efficient for many simple conditions
const manyFilters = new GroupFilter.AllMatchFilter();
for (let i = 0; i < 100; i++) {
    manyFilters.add(createSomeFilter(i));
}

// More efficient - single filter with multiple conditions
const efficientFilter = World.getStringBlockFilter()
    .contains("diamond", "emerald", "iron", "gold", "copper");
```

## Important Notes

### Evaluation Behavior

- **Complete evaluation**: All filters are evaluated regardless of individual results
- **Order independence**: Filter order doesn't affect the final result
- **No short-circuiting**: Unlike `AndFilter`, evaluation continues after failures

### Use Cases vs AndFilter

**Use AllMatchFilter when:**
- You need more than two conditions
- You want complete evaluation for debugging
- You need dynamic filter addition/removal
- You're building complex filter structures

**Use AndFilter when:**
- You have exactly two conditions
- Performance is critical (short-circuiting needed)
- The filter structure is static and simple

### Integration with WorldScanner

AllMatchFilter integrates seamlessly with the WorldScanner system:

```js
// Direct usage
const scanner = World.getWorldScanner(allMatchFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withFilter(allMatchFilter)
    .build();
```

## Related Classes

- **GroupFilter** - Abstract parent class
- **AnyMatchFilter** - Sibling class requiring any filter to match
- **NoneMatchFilter** - Sibling class requiring no filters to match
- **CountMatchFilter** - Sibling class with count-based matching
- **AndFilter** - Binary AND filter with short-circuiting
- **WorldScanner** - Main class for world scanning operations
- **IFilter** - Base interface for all filters

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system
- **Package:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter`