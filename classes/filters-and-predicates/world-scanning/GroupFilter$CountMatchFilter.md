# CountMatchFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.GroupFilter.CountMatchFilter`

**Extends:** `GroupFilter<T>`

**Implements:** `IFilter<T>`

**Since:** JsMacros 1.6.5

The `CountMatchFilter` class is a concrete implementation of `GroupFilter` that returns `true` when the number of child filters that match the given object satisfies a numeric comparison condition. This filter provides sophisticated counting logic that goes beyond simple AND/OR operations, allowing you to match based on how many filters pass.

CountMatchFilter is extremely versatile and can be used to find objects that match at least a certain number of criteria, exactly a specific number of criteria, or even objects that are "similar" to a target by matching a threshold of characteristics.

## Overview

The CountMatchFilter class provides:

- **Count-based matching**: Matches based on how many child filters return true
- **Numeric comparison**: Supports all comparison operators (>, <, >=, <=, ==, !=)
- **Flexible threshold**: Can match based on any count condition
- **Similarity detection**: Excellent for finding objects that are "close enough" to a target
- **Fluent interface**: Methods return the CountMatchFilter instance for method chaining

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Comparison Operators](#comparison-operators)
- [Usage Examples](#usage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)
- [Related Classes](#related-classes)

## Constructors

### `new CountMatchFilter(operator, targetCount)`

Creates a new CountMatchFilter with the specified comparison operator and target count.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| operator | String | The comparison operator ("=", "==", "!=", ">", ">=", "<", "<=") |
| targetCount | Number | The target number of matching filters |

**Example:**
```js
// Match if at least 3 filters pass
const atLeastThree = new GroupFilter.CountMatchFilter(">=", 3);

// Match if exactly 2 filters pass
const exactlyTwo = new GroupFilter.CountMatchFilter("==", 2);

// Match if no more than 1 filter passes
const atMostOne = new GroupFilter.CountMatchFilter("<=", 1);
```

## Methods

CountMatchFilter inherits all methods from `GroupFilter`:

### `add(filter)`

Adds a child filter to the group.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to add |

**Returns:** `CountMatchFilter` - Returns this instance for method chaining

### `remove(filter)`

Removes a child filter from the group.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | IFilter<T> | The filter to remove |

**Returns:** `CountMatchFilter` - Returns this instance for method chaining

### `getFilters()`

Returns an immutable list of all child filters.

**Returns:** `ImmutableList<IFilter<T>>` - Copy of the internal filter list

### `test(object)`

Tests whether the number of matching child filters satisfies the comparison condition.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| object | T | The object to test |

**Returns:** `boolean` - `true` if the count of matching filters satisfies the condition

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

## Comparison Operators

CountMatchFilter supports the following comparison operators:

| Operator | Description | Example |
| -------- | ----------- | ------- |
| `"="`, `"=="` | Equals | `new CountMatchFilter("==", 2)` - Exactly 2 matches |
| `"!="` | Not equals | `new CountMatchFilter("!=", 0)` - At least 1 match |
| `">"` | Greater than | `new CountMatchFilter(">", 3)` - More than 3 matches |
| `">="` | Greater than or equal | `new CountMatchFilter(">=", 1)` - At least 1 match |
| `"<"` | Less than | `new CountMatchFilter("<", 5)` - Fewer than 5 matches |
| `"<="` | Less than or equal | `new CountMatchFilter("<=", 3)` - At most 3 matches |

## Usage Examples

### "At Least" Matching

Find blocks that match at least a certain number of criteria:

```js
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

Chat.log(`Found ${variedAreas.length} areas with wood variety`);
```

### "Exactly" Matching

Find objects that match exactly a specific number of conditions:

```js
// Create filters for different armor materials
const ironArmorFilter = World.getStringBlockFilter().contains("iron");
const goldArmorFilter = World.getStringBlockFilter().contains("golden");
const diamondArmorFilter = World.getStringBlockFilter().contains("diamond");
const netheriteArmorFilter = World.getStringBlockFilter().contains("netherite");

// Find items that are exactly one type of armor material
const singleMaterialArmor = new GroupFilter.CountMatchFilter("==", 1);
singleMaterialArmor
    .add(ironArmorFilter)
    .add(goldArmorFilter)
    .add(diamondArmorFilter)
    .add(netheriteArmor);

// Filter inventory for pure armor sets
const playerInv = Player.getPlayer().getInventory();
const pureArmor = playerInv.getItems(singleMaterialArmor);

Chat.log(`Found ${pureArmor.length} single-material armor pieces`);
```

### "No More Than" Matching

Find objects that don't match too many conditions:

```js
// Create filters for different dangerous properties
const lavaNearby = World.getStringBlockFilter().contains("lava");
const monsterNearby = World.getEntityFilter("isHostile").equals(true);
const lowHealth = World.getEntityFilter("getHealth").is("<", 5);
const badWeather = World.getWorldFilter("isRaining").equals(true);

// Find situations with at most 1 danger factor
const lowDangerFilter = new GroupFilter.CountMatchFilter("<=", 1);
lowDangerFilter
    .add(lavaNearby)
    .add(monsterNearby)
    .add(lowHealth)
    .add(badWeather);

// Use to find safe locations
const scanner = World.getWorldScanner(lowDangerFilter);
const safeAreas = scanner.scanAroundPlayer(10);
```

### Similarity Detection

Find objects that are similar to a target based on matching characteristics:

```js
// Create filters for characteristics of a "perfect mining spot"
const hasOres = World.getStringBlockFilter().contains("ore");
const isDeep = World.getBlockFilter("getY").is("<", 16);
const hasSpace = World.getStateFilter("air").equals(true);
const nearLava = World.getStringBlockFilter().contains("lava");
const hasCaves = World.getStringBlockFilter().contains("cave", "tunnel");

// Find areas that match at least 3 of these criteria
const goodMiningFilter = new GroupFilter.CountMatchFilter(">=", 3);
goodMiningFilter
    .add(hasOres)
    .add(isDeep)
    .add(hasSpace)
    .add(nearLava)
    .add(hasCaves);

// Search for good mining locations
const scanner = World.getWorldScanner(goodMiningFilter);
const goodSpots = scanner.scanAroundPlayer(20);

Chat.log(`Found ${goodSpots.length} potential mining spots`);
```

## Advanced Patterns

### Multi-Level Thresholds

Create filters for different quality levels:

```js
// Create filters for different valuable properties
const isRare = World.getStringBlockFilter().contains("diamond", "emerald", "netherite");
const isEnchanted = World.getItemFilter("getEnchantments").is(">", 0);
const isDurable = World.getItemFilter("getDurability").is(">", 80);
const isSpecial = World.getStringBlockFilter().contains("unique", "special", "legendary");

// Create quality tiers
const lowQuality = new GroupFilter.CountMatchFilter(">=", 1);     // At least 1 good property
const mediumQuality = new GroupFilter.CountMatchFilter(">=", 2);  // At least 2 good properties
const highQuality = new GroupFilter.CountMatchFilter(">=", 3);    // At least 3 good properties
const epicQuality = new GroupFilter.CountMatchFilter("==", 4);     // All 4 properties

// Add all filters to each quality level
const qualityFilters = [lowQuality, mediumQuality, highQuality, epicQuality];
const propertyFilters = [isRare, isEnchanted, isDurable, isSpecial];

qualityFilters.forEach(qualityFilter => {
    propertyFilters.forEach(propFilter => qualityFilter.add(propFilter));
});

// Use to categorize inventory
const playerInv = Player.getPlayer().getInventory();
const lowItems = playerInv.getItems(lowQuality);
const mediumItems = playerInv.getItems(mediumQuality);
const highItems = playerInv.getItems(highQuality);
const epicItems = playerInv.getItems(epicQuality);

Chat.log(`Quality breakdown: ${lowItems.length} basic, ${mediumItems.length} medium, ${highItems.length} high, ${epicItems.length} epic`);
```

### Dynamic Threshold Adjustment

Adjust thresholds based on context:

```js
// Create base filter for resource richness
const resourceFilters = [
    World.getStringBlockFilter().contains("coal_ore"),
    World.getStringBlockFilter().contains("iron_ore"),
    World.getStringBlockFilter().contains("gold_ore"),
    World.getStringBlockFilter().contains("diamond_ore"),
    World.getStringBlockFilter().contains("emerald_ore")
];

// Create filter with adjustable threshold
const resourceFilter = new GroupFilter.CountMatchFilter(">=", 1);
resourceFilters.forEach(filter => resourceFilter.add(filter));

// Adjust threshold based on player level
const player = Player.getPlayer();
let threshold = 1;
if (player && player.experienceLevel > 10) threshold = 2;
if (player && player.experienceLevel > 25) threshold = 3;

// Update the filter threshold (hypothetical method)
resourceFilter.setThreshold(">=", threshold);

// Search with appropriate threshold
const scanner = World.getWorldScanner(resourceFilter);
const resources = scanner.scanAroundPlayer(15);

Chat.log(`Found ${resources.length} resource areas (threshold: ${threshold})`);
```

### Weighted Voting System

Use CountMatchFilter as a voting system:

```js
// Create "votes" for different desirable qualities
const beautyVotes = [
    World.getStringBlockFilter().contains("flower", "grass", "water"),
    World.getStateFilter("foliage").equals("dense"),
    World.getStringBlockFilter().contains("decorative", "beautiful")
];

const utilityVotes = [
    World.getStringBlockFilter().contains("chest", "crafting_table", "furnace"),
    World.getStringBlockFilter().contains("storage", "workspace"),
    World.getBlockFilter("getLightLevel").is(">", 10)
];

const safetyVotes = [
    World.getStateFilter("wall").equals(true),
    World.getStringBlockFilter().contains("door", "gate"),
    World.getEntityFilter("isHostile").not()
];

// Create voting filters
const beautyFilter = new GroupFilter.CountMatchFilter(">=", 2);
const utilityFilter = new GroupFilter.CountMatchFilter(">=", 2);
const safetyFilter = new GroupFilter.CountMatchFilter(">=", 2);

beautyVotes.forEach(vote => beautyFilter.add(vote));
utilityVotes.forEach(vote => utilityFilter.add(vote));
safetyVotes.forEach(vote => safetyFilter.add(vote));

// Combine for perfect locations
const perfectLocation = beautyFilter.and(utilityFilter).and(safetyFilter);

const scanner = World.getWorldScanner(perfectLocation);
const perfectSpots = scanner.scanAroundPlayer(20);

Chat.log(`Found ${perfectSpots.length} perfect building locations`);
```

### Statistical Analysis

Use CountMatchFilter for pattern recognition:

```js
// Create filters for different patterns in a sequence
const pattern1 = World.getStringBlockFilter().contains("pattern1");
const pattern2 = World.getStringBlockFilter().contains("pattern2");
const pattern3 = World.getStringBlockFilter().contains("pattern3");
const pattern4 = World.getStringBlockFilter().contains("pattern4");
const pattern5 = World.getStringBlockFilter().contains("pattern5");

// Create statistical filters
const majorityPattern = new GroupFilter.CountMatchFilter(">=", 3);    // Majority of patterns
const supermajorityPattern = new GroupFilter.CountMatchFilter(">=", 4); // Supermajority
const consensusPattern = new GroupFilter.CountMatchFilter("==", 5);     // All patterns

// Add pattern filters
const patternFilters = [pattern1, pattern2, pattern3, pattern4, pattern5];
[majorityPattern, supermajorityPattern, consensusPattern].forEach(countFilter => {
    patternFilters.forEach(pattern => countFilter.add(pattern));
});

// Analyze areas for pattern consistency
const scanner = World.getWorldScanner();
const areas = scanner.scanCubeArea(center, 10);

const majorityAreas = areas.filter(majorityPattern);
const supermajorityAreas = areas.filter(supermajorityPattern);
const consensusAreas = areas.filter(consensusPattern);

Chat.log(`Pattern analysis: ${majorityAreas.length} with majority, ${supermajorityAreas.length} with supermajority, ${consensusAreas.length} with consensus`);
```

### Error Tolerance

Create filters that allow for some mismatches:

```js
// Create filters for perfect structure
const hasWalls = World.getStringBlockFilter().contains("wall", "fence");
const hasRoof = World.getStringBlockFilter().contains("roof", "stairs");
const hasDoor = World.getStringBlockFilter().contains("door", "gate");
const hasWindows = World.getStringBlockFilter().contains("glass", "window");
const hasFloor = World.getStringBlockFilter().contains("floor", "plank");

// Create tolerant filter - allows up to 2 missing components
const completeStructureFilter = new GroupFilter.CountMatchFilter(">=", 3);
[hasWalls, hasRoof, hasDoor, hasWindows, hasFloor].forEach(component => {
    completeStructureFilter.add(component);
});

// This will match structures that are mostly complete
const scanner = World.getWorldScanner(completeStructureFilter);
const mostlyCompleteStructures = scanner.scanAroundPlayer(15);

Chat.log(`Found ${mostlyCompleteStructures.length} mostly complete structures`);
```

## Performance Considerations

### Filter Count

CountMatchFilter must evaluate all child filters to count matches, so consider the number of filters:

```js
// Good - reasonable number of filters
const reasonableCount = new GroupFilter.CountMatchFilter(">=", 2);
reasonableCount
    .add(filter1)
    .add(filter2)
    .add(filter3)
    .add(filter4);

// Potentially expensive - many filters
const expensiveCount = new GroupFilter.CountMatchFilter(">=", 10);
for (let i = 0; i < 50; i++) {
    expensiveCount.add(createSomeFilter(i)); // 50 filters to evaluate!
}
```

### Filter Complexity

The complexity of individual filters affects overall performance:

```js
// More expensive - complex filters
const expensiveCount = new GroupFilter.CountMatchFilter(">=", 2);
expensiveCount
    .add(complexNBTFilter)        // Expensive
    .add(expensiveCalculationFilter) // Very expensive
    .add(networkRequestFilter);   // Most expensive

// Less expensive - simpler filters first
const optimizedCount = new GroupFilter.CountMatchFilter(">=", 2);
optimizedCount
    .add(simpleStringFilter)      // Cheap
    .add(basicStateFilter)        // Moderate
    .add(complexNBTFilter);       // Expensive
```

### Threshold Optimization

Choose appropriate thresholds for your use case:

```js
// Efficient - low threshold, early exit possible
const lowThreshold = new GroupFilter.CountMatchFilter(">=", 1);

// Less efficient - high threshold requires evaluating more filters
const highThreshold = new GroupFilter.CountMatchFilter(">=", 8);
```

## Important Notes

### Evaluation Completeness

Unlike AllMatchFilter or AnyMatchFilter, CountMatchFilter must evaluate ALL child filters to determine the count, regardless of the threshold.

### Empty Filter Groups

If no child filters are added, CountMatchFilter will always return false since the count will be 0 and cannot satisfy positive comparison conditions.

### Threshold Range

The effective range of counts is from 0 to the number of child filters. Ensure your target count is within this range for meaningful results.

### Integration with WorldScanner

CountMatchFilter integrates seamlessly with the WorldScanner system:

```js
// Direct usage
const scanner = World.getWorldScanner(countMatchFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withFilter(countMatchFilter)
    .build();

// Combining with other filters
const complexFilter = countMatchFilter.and(otherFilter);
```

## Related Classes

- **GroupFilter** - Abstract parent class
- **AllMatchFilter** - Sibling class requiring all filters to match
- **AnyMatchFilter** - Sibling class requiring any filter to match
- **NoneMatchFilter** - Sibling class requiring no filters to match
- **NumberCompareFilter** - Used internally for numeric comparison logic
- **WorldScanner** - Main class for world scanning operations
- **IFilter** - Base interface for all filters

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system
- **Package:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter`