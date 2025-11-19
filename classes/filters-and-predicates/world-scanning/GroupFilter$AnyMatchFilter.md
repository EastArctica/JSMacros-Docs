# AnyMatchFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.GroupFilter.AnyMatchFilter`

**Extends:** `GroupFilter<T>`

**Implements:** `IFilter<T>`

**Since:** JsMacros 1.6.5

The `AnyMatchFilter` class is a concrete implementation of `GroupFilter` that returns `true` when **at least one** child filter returns `true` for the given object. This filter is essentially a more flexible version of the `OrFilter` that can work with any number of child filters rather than being limited to just two.

AnyMatchFilter is perfect for situations where you need to find objects that match any of several possible criteria. This is commonly used for finding items, blocks, or entities that belong to the same category but may have different identifying characteristics.

## Overview

The AnyMatchFilter class provides:

- **Multi-condition OR logic**: Requires at least one filter to return true for a match
- **Flexible filter count**: Can handle any number of child filters
- **Fluent interface**: Methods return the AnyMatchFilter instance for method chaining
- **Efficient evaluation**: Can short-circuit once a match is found (implementation dependent)

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)
- [Related Classes](#related-classes)

## Constructors

### `new AnyMatchFilter()`

Creates a new AnyMatchFilter with no child filters. Use the `add()` method to add filters to the group.

**Example:**
```js
const anyMatchFilter = new GroupFilter.AnyMatchFilter();
```

## Methods

AnyMatchFilter inherits all methods from `GroupFilter`:

### `add(filter)`

Adds a child filter to the group.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to add |

**Returns:** `AnyMatchFilter` - Returns this instance for method chaining

### `remove(filter)`

Removes a child filter from the group.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to remove |

**Returns:** `AnyMatchFilter` - Returns this instance for method chaining

### `getFilters()`

Returns an immutable list of all child filters.

**Returns:** `ImmutableList<IFilter<T>>` - Copy of the internal filter list

### `test(object)`

Tests whether the given object matches ANY child filters.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| object | T | The object to test |

**Returns:** `boolean` - `true` if at least one child filter returns `true`

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

### Basic Category Filtering

Find blocks that match ANY condition within a category:

```js
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

### Entity Type Grouping

Find entities that belong to any of several types:

```js
// Create filters for different hostile mob types
const zombieFilter = World.getEntityFilter("getType").contains("zombie");
const skeletonFilter = World.getEntityFilter("getType").contains("skeleton");
const creeperFilter = World.getEntityFilter("getType").contains("creeper");
const spiderFilter = World.getEntityFilter("getType").contains("spider");

// Group all hostile mobs
const hostileMobsFilter = new GroupFilter.AnyMatchFilter();
hostileMobsFilter
    .add(zombieFilter)
    .add(skeletonFilter)
    .add(creeperFilter)
    .add(spiderFilter);

// Find nearby hostile mobs
const scanner = World.getWorldScanner(hostileMobsFilter);
const threats = scanner.scanAroundPlayer(16);

Chat.log(`Found ${threats.length} hostile mobs nearby`);
```

### Material Property Matching

Find items with any of several desirable properties:

```js
// Create filters for different tool materials
const ironToolsFilter = World.getStringBlockFilter().contains("iron_pickaxe", "iron_axe", "iron_shovel");
const diamondToolsFilter = World.getStringBlockFilter().contains("diamond_pickaxe", "diamond_axe", "diamond_shovel");
const netheriteToolsFilter = World.getStringBlockFilter().contains("netherite_pickaxe", "netherite_axe", "netherite_shovel");

// Combine for any good tools
const qualityToolsFilter = new GroupFilter.AnyMatchFilter();
qualityToolsFilter
    .add(ironToolsFilter)
    .add(diamondToolsFilter)
    .add(netheriteToolsFilter);

// Find quality tools in inventory
const playerInv = Player.getPlayer().getInventory();
const goodTools = playerInv.getItems(qualityToolsFilter);

Chat.log(`Found ${goodTools.length} quality tools`);
```

### Block State Variations

Find blocks with any of several acceptable states:

```js
// Create filters for different wood orientations
const xAxisFilter = World.getStateFilter("axis").equals("x");
const yAxisFilter = World.getStateFilter("axis").equals("y");
const zAxisFilter = World.getStateFilter("axis").equals("z");

// Any log orientation is acceptable
const anyLogFilter = new GroupFilter.AnyMatchFilter();
anyLogFilter
    .add(xAxisFilter)
    .add(yAxisFilter)
    .add(zAxisFilter);

// Combine with wood type filter
const woodTypeFilter = World.getStringBlockFilter().contains("oak_log", "birch_log", "spruce_log");
const anyWoodLog = woodTypeFilter.and(anyLogFilter);

// Find all logs
const scanner = World.getWorldScanner(anyWoodLog);
const logs = scanner.scanAroundPlayer(5);
```

## Advanced Patterns

### Dynamic Category Management

Add or remove filters based on game conditions:

```js
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

if (player && player.experienceLevel > 30) {
    oreFilter.add(World.getStringBlockFilter().contains("ancient_debris"));
    oreFilter.add(World.getStringBlockFilter().contains("netherite_ore"));
}

// Remove common ores if player is advanced
if (player && player.experienceLevel > 30) {
    oreFilter.remove(World.getStringBlockFilter().contains("coal_ore"));
}

const scanner = World.getWorldScanner(oreFilter);
const suitableOres = scanner.scanAroundPlayer(5);
```

### Hierarchical Filtering

Create nested AnyMatchFilter structures for complex categorization:

```js
// Create sub-categories
const preciousGems = new GroupFilter.AnyMatchFilter();
preciousGems
    .add(World.getStringBlockFilter().contains("diamond_ore"))
    .add(World.getStringBlockFilter().contains("emerald_ore"));

const valuableMetals = new GroupFilter.AnyMatchFilter();
valuableMetals
    .add(World.getStringBlockFilter().contains("iron_ore"))
    .add(World.getStringBlockFilter().contains("gold_ore"))
    .add(World.getStringBlockFilter().contains("copper_ore"));

const rareMaterials = new GroupFilter.AnyMatchFilter();
rareMaterials
    .add(World.getStringBlockFilter().contains("ancient_debris"))
    .add(World.getStringBlockFilter().contains("netherite_ore"));

// Combine into main valuable materials filter
const allValuableMaterials = new GroupFilter.AnyMatchFilter();
allValuableMaterials
    .add(preciousGems)
    .add(valuableMetals)
    .add(rareMaterials);

// Use the hierarchical filter
const scanner = World.getWorldScanner(allValuableMaterials);
const materials = scanner.scanAroundPlayer(10);
```

### Conditional Filter Groups

Create filters that change based on context:

```js
// Create filters for different biomes
const desertFilter = new GroupFilter.AnyMatchFilter();
desertFilter
    .add(World.getStringBlockFilter().contains("sand"))
    .add(World.getStringBlockFilter().contains("cactus"))
    .add(World.getStringBlockFilter().contains("dead_bush"));

const forestFilter = new GroupFilter.AnyMatchFilter();
forestFilter
    .add(World.getStringBlockFilter().contains("oak_log"))
    .add(World.getStringBlockFilter().contains("birch_log"))
    .add(World.getStringBlockFilter().contains("grass"));

const netherFilter = new GroupFilter.AnyMatchFilter();
netherFilter
    .add(World.getStringBlockFilter().contains("netherrack"))
    .add(World.getStringBlockFilter().contains("nether_brick"))
    .add(World.getStringBlockFilter().contains("lava"));

// Choose filter based on player's current biome
let biomeFilter;
const player = Player.getPlayer();
if (player) {
    const biome = player.getBiome(); // Hypothetical method
    if (biome.contains("desert")) {
        biomeFilter = desertFilter;
    } else if (biome.contains("forest")) {
        biomeFilter = forestFilter;
    } else if (biome.contains("nether")) {
        biomeFilter = netherFilter;
    }
}

// Use the context-aware filter
if (biomeFilter) {
    const scanner = World.getWorldScanner(biomeFilter);
    const biomeBlocks = scanner.scanAroundPlayer(3);
}
```

### Filter Optimization

Optimize by grouping similar filters:

```js
// Less efficient - many individual string checks
const inefficientFilter = new GroupFilter.AnyMatchFilter();
inefficientFilter
    .add(World.getStringBlockFilter().contains("oak_planks"))
    .add(World.getStringBlockFilter().contains("birch_planks"))
    .add(World.getStringBlockFilter().contains("spruce_planks"))
    .add(World.getStringBlockFilter().contains("jungle_planks"))
    .add(World.getStringBlockFilter().contains("acacia_planks"))
    .add(World.getStringBlockFilter().contains("dark_oak_planks"));

// More efficient - single string filter with multiple values
const efficientFilter = World.getStringBlockFilter()
    .contains("oak_planks", "birch_planks", "spruce_planks",
              "jungle_planks", "acacia_planks", "dark_oak_planks");

// But use AnyMatchFilter for different types of conditions
const mixedTypeFilter = new GroupFilter.AnyMatchFilter();
mixedTypeFilter
    .add(efficientFilter)                    // String matching
    .add(World.getBlockFilter("getY").is(">", 50))  // Numeric condition
    .add(World.getStateFilter("waterlogged").equals(true));  // State condition
```

## Performance Considerations

### Filter Order

While the order doesn't affect the result, placing more likely matches first can improve performance if the implementation short-circuits:

```js
// More efficient - common matches first
const optimizedFilter = new GroupFilter.AnyMatchFilter();
optimizedFilter
    .add(commonDiamondFilter)    // Most likely to match
    .add(emeraldFilter)          // Less common
    .add(ancientDebrisFilter);   // Rarest

// Less efficient - rare matches first
const unoptimizedFilter = new GroupFilter.AnyMatchFilter();
unoptimizedFilter
    .add(ancientDebrisFilter)    // Least likely to match
    .add(emeraldFilter)          // Less common
    .add(commonDiamondFilter);   // Most likely
```

### Filter Consolidation

For simple string matching, consider consolidating into a single filter:

```js
// Less efficient - multiple filters
const multipleFilters = new GroupFilter.AnyMatchFilter();
multipleFilters
    .add(World.getStringBlockFilter().contains("diamond"))
    .add(World.getStringBlockFilter().contains("emerald"))
    .add(World.getStringBlockFilter().contains("gold"));

// More efficient - single filter
const consolidatedFilter = World.getStringBlockFilter()
    .contains("diamond", "emerald", "gold");
```

### Memory Usage

AnyMatchFilter maintains references to all child filters. Consider memory usage with large filter collections:

```js
// This creates many filter objects
const manyFilters = new GroupFilter.AnyMatchFilter();
for (let i = 0; i < 1000; i++) {
    manyFilters.add(createSomeFilter(i));
}

// Better approach for large numbers of similar conditions
const efficientApproach = World.getStringBlockFilter()
    .apply(complexMatchingFunction); // Single filter with internal logic
```

## Important Notes

### Use Cases vs OrFilter

**Use AnyMatchFilter when:**
- You need more than two conditions
- You need dynamic filter addition/removal
- You're building complex filter structures
- You have heterogeneous condition types

**Use OrFilter when:**
- You have exactly two conditions
- The filter structure is static
- Performance is critical and you want guaranteed short-circuiting

### Evaluation Behavior

- **At least one match**: Returns true if any filter matches
- **No matches**: Returns false if all filters return false
- **Empty filter group**: Returns false (no filters can match)

### Integration with WorldScanner

AnyMatchFilter integrates seamlessly with the WorldScanner system:

```js
// Direct usage
const scanner = World.getWorldScanner(anyMatchFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withFilter(anyMatchFilter)
    .build();

// Combining with other filters
const complexFilter = anyMatchFilter.and(otherFilter);
```

## Related Classes

- **GroupFilter** - Abstract parent class
- **AllMatchFilter** - Sibling class requiring all filters to match
- **NoneMatchFilter** - Sibling class requiring no filters to match
- **CountMatchFilter** - Sibling class with count-based matching
- **OrFilter** - Binary OR filter with guaranteed short-circuiting
- **WorldScanner** - Main class for world scanning operations
- **IFilter** - Base interface for all filters

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system
- **Package:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter`