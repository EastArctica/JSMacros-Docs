# NoneMatchFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.GroupFilter.NoneMatchFilter`

**Extends:** `GroupFilter<T>`

**Implements:** `IFilter<T>`

**Since:** JsMacros 1.6.5

The `NoneMatchFilter` class is a concrete implementation of `GroupFilter` that returns `true` when **none** of the child filters return `true` for the given object. This filter is essentially a way to exclude objects that match any of several criteria, making it perfect for filtering out unwanted items, blocks, or entities.

NoneMatchFilter is particularly useful when you want to find everything except certain specific types. This is commonly used to exclude common blocks when searching for rare ones, or to filter out unwanted items from inventory searches.

## Overview

The NoneMatchFilter class provides:

- **Exclusion logic**: Returns true only when no child filters match
- **Flexible exclusion count**: Can exclude based on any number of criteria
- **Fluent interface**: Methods return the NoneMatchFilter instance for method chaining
- **Negation pattern**: Equivalent to the negation of an AnyMatchFilter

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)
- [Related Classes](#related-classes)

## Constructors

### `new NoneMatchFilter()`

Creates a new NoneMatchFilter with no child filters. Use the `add()` method to add filters to the group.

**Example:**
```js
const noneMatchFilter = new GroupFilter.NoneMatchFilter();
```

## Methods

NoneMatchFilter inherits all methods from `GroupFilter`:

### `add(filter)`

Adds a child filter to the exclusion list.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to exclude |

**Returns:** `NoneMatchFilter` - Returns this instance for method chaining

### `remove(filter)`

Removes a child filter from the exclusion list.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to remove from exclusion |

**Returns:** `NoneMatchFilter` - Returns this instance for method chaining

### `getFilters()`

Returns an immutable list of all exclusion filters.

**Returns:** `ImmutableList<IFilter<T>>` - Copy of the internal filter list

### `test(object)`

Tests whether the given object matches NONE of the exclusion filters.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| object | T | The object to test |

**Returns:** `boolean` - `true` only if no child filters return `true`

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

### Excluding Common Blocks

Find blocks that are NOT in a list of common blocks:

```js
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

### Filtering Inventory Items

Find items that don't match unwanted categories:

```js
// Create filters for unwanted item types
const junkFilter = World.getStringBlockFilter().contains("dirt", "cobblestone", "gravel");
const commonToolsFilter = World.getStringBlockFilter().contains("wooden_pickaxe", "wooden_axe", "wooden_shovel");
const foodFilter = World.getStringBlockFilter().contains("bread", "apple", "cooked_beef");

// Create exclusion filter
const valuableItemsFilter = new GroupFilter.NoneMatchFilter();
valuableItemsFilter
    .add(junkFilter)
    .add(commonToolsFilter)
    .add(foodFilter);

// Filter inventory for valuable items
const playerInv = Player.getPlayer().getInventory();
const valuableItems = playerInv.getItems(valuableItemsFilter);

Chat.log(`Found ${valuableItems.length} potentially valuable items`);
```

### Entity Exclusion

Find entities that are not in unwanted categories:

```js
// Create filters for entities to exclude
const itemsFilter = World.getEntityFilter("getType").contains("item");
const animalsFilter = World.getEntityFilter("getType").contains("cow", "pig", "sheep", "chicken");
const ambientFilter = World.getEntityFilter("getType").contains("bat");

// Create exclusion filter
const importantEntitiesFilter = new GroupFilter.NoneMatchFilter();
importantEntitiesFilter
    .add(itemsFilter)
    .add(animalsFilter)
    .add(ambientFilter);

// Find important entities (players, hostile mobs, etc.)
const scanner = World.getWorldScanner(importantEntitiesFilter);
const importantEntities = scanner.scanAroundPlayer(20);

Chat.log(`Found ${importantEntities.length} important entities`);
```

### Excluding Specific Block States

Find blocks that don't have certain undesirable states:

```js
// Create filters for unwanted block states
const waterloggedFilter = World.getStateFilter("waterlogged").equals(true);
const poweredFilter = World.getStateFilter("powered").equals(true);
const occupiedFilter = World.getStateFilter("occupied").equals(true);

// Exclude blocks with these states
const cleanBlocksFilter = new GroupFilter.NoneMatchFilter();
cleanBlocksFilter
    .add(waterloggedFilter)
    .add(poweredFilter)
    .add(occupiedFilter);

// Find blocks in clean states
const scanner = World.getWorldScanner(cleanBlocksFilter);
const cleanBlocks = scanner.scanAroundPlayer(5);
```

## Advanced Patterns

### Complex Exclusion Logic

Combine NoneMatchFilter with other filters for sophisticated filtering:

```js
// Create exclusion filters for different categories
const commonBlocksFilter = new GroupFilter.NoneMatchFilter();
commonBlocksFilter
    .add(World.getStringBlockFilter().contains("dirt", "stone", "grass", "air"));

const dangerousBlocksFilter = new GroupFilter.NoneMatchFilter();
dangerousBlocksFilter
    .add(World.getStringBlockFilter().contains("lava", "fire", "magma_block"));

// Combine with inclusion filters for interesting blocks
const interestingBlockTypes = World.getStringBlockFilter()
    .contains("ore", "diamond", "emerald", "chest", "spawner");

// Final filter: interesting blocks that are also not common and not dangerous
const perfectTargets = interestingBlockTypes
    .and(commonBlocksFilter)
    .and(dangerousBlocksFilter);

const scanner = World.getWorldScanner(perfectTargets);
const targets = scanner.scanAroundPlayer(10);
```

### Dynamic Exclusion Lists

Modify exclusions based on context:

```js
// Create a base exclusion filter
const contextualFilter = new GroupFilter.NoneMatchFilter();

// Always exclude air
contextualFilter.add(World.getStringBlockFilter().contains("air"));

// Add exclusions based on player level
const player = Player.getPlayer();
if (player && player.experienceLevel < 10) {
    // Low-level players should avoid dangerous blocks
    contextualFilter.add(World.getStringBlockFilter().contains("lava"));
    contextualFilter.add(World.getStringBlockFilter().contains("fire"));
}

if (player && player.experienceLevel > 30) {
    // High-level players don't need common ores
    contextualFilter.add(World.getStringBlockFilter().contains("coal_ore"));
    contextualFilter.add(World.getStringBlockFilter().contains("iron_ore"));
}

// Use the context-aware filter
const scanner = World.getWorldScanner(contextualFilter);
const appropriateBlocks = scanner.scanAroundPlayer(5);
```

### Hierarchical Exclusion

Create nested exclusion structures for complex categorization:

```js
// Create sub-exclusion groups
const naturalBlocks = new GroupFilter.AnyMatchFilter();
naturalBlocks
    .add(World.getStringBlockFilter().contains("stone", "dirt", "grass"))
    .add(World.getStringBlockFilter().contains("sand", "gravel", "water"));

const commonItems = new GroupFilter.AnyMatchFilter();
commonItems
    .add(World.getStringBlockFilter().contains("cobblestone", "wood", "planks"))
    .add(World.getStringBlockFilter().contains("stick", "torch", "coal"));

const hazards = new GroupFilter.AnyMatchFilter();
hazards
    .add(World.getStringBlockFilter().contains("lava", "fire", "cactus"))
    .add(World.getStringBlockFilter().contains("magma_block", "sweet_berry_bush"));

// Combine into main exclusion filter
const excludeCommonAndDangerous = new GroupFilter.NoneMatchFilter();
excludeCommonAndDangerous
    .add(naturalBlocks)
    .add(commonItems)
    .add(hazards);

// Use the hierarchical exclusion filter
const scanner = World.getWorldScanner(excludeCommonAndDangerous);
const interestingBlocks = scanner.scanAroundPlayer(8);
```

### Complementary Filtering

Use NoneMatchFilter to complement positive filters:

```js
// Create positive filter for valuable items
const valuableItems = World.getStringBlockFilter()
    .contains("diamond", "emerald", "netherite", "gold", "iron");

// Create exclusion filter for damaged items
const damagedFilter = World.getItemFilter("getDamage").is(">", 0);
const excludeDamaged = new GroupFilter.NoneMatchFilter();
excludeDamaged.add(damagedFilter);

// Combine to find valuable, undamaged items
const pristineValuables = valuableItems.and(excludeDamaged);

// Use in inventory search
const playerInv = Player.getPlayer().getInventory();
const bestItems = playerInv.getItems(pristineValuables);

Chat.log(`Found ${bestItems.length} pristine valuable items`);
```

### Negative Space Analysis

Find what's missing from an area:

```js
// Create filters for things that should be present
const essentialLighting = World.getStringBlockFilter().contains("torch", "lantern", "glowstone");
const storageContainers = World.getStringBlockFilter().contains("chest", "barrel", "shulker_box");

// Create exclusion filters to find what's missing
const hasGoodLighting = new GroupFilter.AnyMatchFilter();
hasGoodLighting.add(essentialLighting);

const hasStorage = new GroupFilter.AnyMatchFilter();
hasStorage.add(storageContainers);

// Find areas that lack these features
const poorLightingFilter = hasGoodLighting.not(); // Equivalent to NoneMatchFilter
const noStorageFilter = hasStorage.not();

// Use these filters to analyze base building
const scanner = World.getWorldScanner();
const allBlocks = scanner.scanCubeArea(center, 30);

const poorLightingAreas = allBlocks.filter(poorLightingFilter);
const noStorageAreas = allBlocks.filter(noStorageFilter);

Chat.log(`Found ${poorLightingAreas.length} areas with poor lighting`);
Chat.log(`Found ${noStorageAreas.length} areas without storage`);
```

## Performance Considerations

### Evaluation Efficiency

NoneMatchFilter needs to check all exclusion filters, so consider optimization:

```js
// Less efficient - many separate string filters
const inefficientExclusion = new GroupFilter.NoneMatchFilter();
inefficientExclusion
    .add(World.getStringBlockFilter().contains("dirt"))
    .add(World.getStringBlockFilter().contains("stone"))
    .add(World.getStringBlockFilter().contains("grass"))
    .add(World.getStringBlockFilter().contains("sand"))
    .add(World.getStringBlockFilter().contains("gravel"));

// More efficient - single filter with multiple values
const efficientExclusion = World.getStringBlockFilter()
    .notContains("dirt", "stone", "grass", "sand", "gravel");

// But use NoneMatchFilter for different types of exclusions
const mixedExclusion = new GroupFilter.NoneMatchFilter();
mixedExclusion
    .add(efficientExclusion)                    // String exclusion
    .add(World.getBlockFilter("getY").is(">", 60))  // Height exclusion
    .add(World.getStateFilter("waterlogged").equals(true));  // State exclusion
```

### Exclusion Scope

Be specific about what you exclude to avoid over-filtering:

```js
// Too broad - excludes too much
const tooBroad = new GroupFilter.NoneMatchFilter();
tooBroad.add(World.getStringBlockFilter().contains("stone"));

// More specific - excludes specific stone variants
const moreSpecific = new GroupFilter.NoneMatchFilter();
moreSpecific.add(World.getStringBlockFilter().contains("stone", "cobblestone", "andesite"));

// Even better - exclude by context
const contextualExclusion = new GroupFilter.NoneMatchFilter();
contextualExclusion.add(World.getStringBlockFilter().contains("stone"));
contextualExclusion.add(World.getBlockFilter("getY").is(">", 50)); // Only exclude stone at high altitudes
```

### Filter Count

Be mindful of the number of exclusion filters:

```js
// Acceptable - focused exclusions
const focusedExclusion = new GroupFilter.NoneMatchFilter();
focusedExclusion
    .add(airFilter)
    .add(dirtFilter)
    .add(grassFilter);

// Potentially problematic - too many exclusions
const excessiveExclusion = new GroupFilter.NoneMatchFilter();
for (let i = 0; i < 200; i++) {
    excessiveExclusion.add(createSomeExclusionFilter(i)); // 200 exclusion filters!
}
```

## Important Notes

### Relationship to NotFilter

NoneMatchFilter is equivalent to `new AnyMatchFilter(...filters).not()`, but provides better organization and readability for exclusion scenarios.

### Empty Exclusion List

If no exclusion filters are added, NoneMatchFilter will match everything (returns true for all objects since no filters can match).

### Logical Equivalence

The following are equivalent:
- `new NoneMatchFilter().add(filterA).add(filterB)`
- `new AnyMatchFilter().add(filterA).add(filterB).not()`
- `filterA.or(filterB).not()`

### Integration with WorldScanner

NoneMatchFilter integrates seamlessly with the WorldScanner system:

```js
// Direct usage
const scanner = World.getWorldScanner(noneMatchFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withFilter(noneMatchFilter)
    .build();

// Combining with other filters
const complexFilter = noneMatchFilter.and(otherFilter);
```

## Related Classes

- **GroupFilter** - Abstract parent class
- **AllMatchFilter** - Sibling class requiring all filters to match
- **AnyMatchFilter** - Sibling class requiring any filter to match
- **CountMatchFilter** - Sibling class with count-based matching
- **NotFilter** - Binary negation filter
- **WorldScanner** - Main class for world scanning operations
- **IFilter** - Base interface for all filters

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system
- **Package:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter`