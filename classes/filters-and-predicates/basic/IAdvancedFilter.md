# IAdvancedFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.api.IAdvancedFilter<T>`

**Extends:** `IFilter<T>`

**Extends:** `Function<T, Boolean>`

**Since:** 1.6.5

The `IAdvancedFilter` interface is a crucial component of JSMacros' WorldScanner system that extends the basic `IFilter` interface to provide powerful logical operations for combining filters. This interface enables the creation of complex filtering conditions by allowing filters to be combined using boolean logic operations such as AND, OR, XOR, and NOT.

While `IFilter` provides the basic `apply(T t)` method for testing individual objects, `IAdvancedFilter` adds methods for logical composition, making it possible to build sophisticated filtering chains for world scanning operations. This interface is primarily used with the `WorldScanner` system to search for blocks and entities based on multiple criteria.

## Table of Contents

- [Methods](#methods)
- [Logical Operations](#logical-operations)
- [Usage with WorldScanner](#usage-with-worldscanner)
- [Filter Composition Examples](#filter-composition-examples)
- [Interface Implementation](#interface-implementation)
- [Performance Considerations](#performance-considerations)

## Methods

## Logical Operations

IAdvancedFilter provides four fundamental logical operations that allow you to build complex filtering conditions:

### AND Operations (`and()`)
- **Purpose**: Requires ALL conditions to be true
- **Use Case**: When you need multiple criteria simultaneously
- **Example**: Finding diamond ore that's also below Y=15
- **Short-circuiting**: Evaluation stops at the first false condition

### OR Operations (`or()`)
- **Purpose**: Requires AT LEAST ONE condition to be true
- **Use Case**: When you want to match multiple types or conditions
- **Example**: Finding chests, barrels, OR shulker boxes
- **Short-circuiting**: Evaluation stops at the first true condition

### XOR Operations (`xor()`)
- **Purpose**: Requires EXACTLY ONE condition to be true
- **Use Case**: When you want mutually exclusive conditions
- **Example**: Finding blocks that are either rare OR valuable, but not both
- **No short-circuiting**: Both conditions must be evaluated to ensure exclusivity

### NOT Operations (`not()`)
- **Purpose**: Inverts the filter logic
- **Use Case**: When you want to exclude certain blocks or conditions
- **Example**: Finding all blocks that are NOT air
- **Simple inversion**: Returns the opposite of the original filter result

---

## Usage with WorldScanner

IAdvancedFilter is the primary interface used for combining filters in WorldScanner operations. Here's how it works in practice:

### Creating Complex Filters

```js
// Get a WorldScannerBuilder and create base filters
const scannerBuilder = World.getWorldScanner();

// Create a filter for valuable storage blocks that are easy to access
const storageFilter = scannerBuilder
    .withStringBlockFilter()
    .contains("chest", "barrel", "shulker_box");  // Base filter

const accessibleFilter = scannerBuilder
    .withStateFilter("isToolRequired")
    .is(false);  // No tool required

// Combine using IAdvancedFilter methods
const valuableStorage = storageFilter.and(accessibleFilter);

// Use the combined filter
const positions = valuableStorage.scanAroundPlayer(3);
console.log(`Found ${positions.length} accessible storage blocks`);
```

### Building Complex Logic Chains

```js
// Create multiple base filters
const oreFilter = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond_ore", "emerald_ore", "ancient_debris");

const deepFilter = World.getWorldScanner()
    .withStateFilter("y")
    .is("<", 15);

const rareFilter = World.getWorldScanner()
    .withBlockFilter("getHardness")
    .is(">", 20);

// Build complex logic: (diamond OR emerald OR ancient_debris) AND (deep OR rare)
const complexFilter = oreFilter.and(deepFilter.or(rareFilter));

// Alternative with different logic: (rare AND deep) OR (accessible)
const alternative = rareFilter.and(deepFilter).or(accessibleFilter);
```

---

## Filter Composition Examples

### Example 1: Multi-Criteria Block Search

```js
// Find building materials that are both common and easy to mine
const commonMaterials = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("stone", "cobblestone", "wood", "dirt");

const easyToMine = World.getWorldScanner()
    .withBlockFilter("getHardness")
    .is("<=", 2);

const notFluid = World.getWorldScanner()
    .withStateFilter("isFluid")
    .is(false);

// Combine all conditions
const buildingMaterials = commonMaterials
    .and(easyToMine)
    .and(notFluid);

const positions = buildingMaterials.scanAroundPlayer(2);
console.log(`Found ${positions.length} suitable building materials`);
```

### Example 2: Exclusion Filtering with NOT

```js
// Find all ore blocks EXCEPT common ones
const allOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("_ore");

const commonOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("coal_ore", "iron_ore", "copper_ore");

const rareOres = allOres.and(commonOres.not());

// Also exclude deepslate variants
const deepslateOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("deepslate");

const finalRareOres = rareOres.and(deepslateOres.not());
```

### Example 3: Complex Logic with XOR

```js
// Find blocks that are either light sources OR opaque, but not both
const lightSources = World.getWorldScanner()
    .withBlockFilter("getLuminance")
    .is(">", 0);

const opaqueBlocks = World.getWorldScanner()
    .withBlockFilter("getOpacity")
    .is(">", 0);

const exclusive = lightSources.xor(opaqueBlocks);

// Use the XOR filter
const exclusiveBlocks = exclusive.scanAroundPlayer(5);
```

### Example 4: Nested Logic Chains

```js
// Complex condition: ((diamond OR emerald) AND deep) OR ((gold OR iron) AND surface)
const valuableOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond_ore", "emerald_ore");

const commonOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("gold_ore", "iron_ore");

const deep = World.getWorldScanner()
    .withStateFilter("y")
    .is("<", 15);

const surface = World.getWorldScanner()
    .withStateFilter("y")
    .is(">=", 15);

// Build the complex logic
const complexFilter = valuableOres.and(deep).or(commonOres.and(surface));

// Add an additional condition: not in water
const notWaterlogged = World.getWorldScanner()
    .withStateFilter("isWaterlogged")
    .is(false);

const finalFilter = complexFilter.and(notWaterlogged);
```

---

## Interface Implementation

### Implementing IAdvancedFilter

While most users will use existing implementations, you can create custom IAdvancedFilter implementations:

```js
// Custom filter implementation (conceptual - actual implementation requires Java)
// This is shown for understanding the interface structure

const customFilter = {
    // From IFilter<T>
    apply: function(item) {
        // Your custom filtering logic here
        return someCondition(item);
    },

    // From IAdvancedFilter<T>
    and: function(otherFilter) {
        return {
            apply: (item) => this.apply(item) && otherFilter.apply(item),
            and: (f) => this.and(f), // Return new IAdvancedFilter
            or: (f) => this.or(f),   // Return new IAdvancedFilter
            xor: (f) => this.xor(f), // Return new IAdvancedFilter
            not: () => this.not()    // Return new IAdvancedFilter
        };
    },

    or: function(otherFilter) {
        // Implementation for OR logic
    },

    xor: function(otherFilter) {
        // Implementation for XOR logic
    },

    not: function() {
        // Implementation for NOT logic
    }
};
```

### Type Safety

The interface is generic (`IAdvancedFilter<T>`) where `T` represents the type of object being filtered:

- `IAdvancedFilter<BlockHelper>` for block filtering
- `IAdvancedFilter<EntityHelper>` for entity filtering
- `IAdvancedFilter<ItemStackHelper>` for item filtering

Type safety is maintained throughout filter composition operations.

---

## Performance Considerations

### Evaluation Order
- **AND operations**: Evaluate left-to-right with short-circuiting (stop on first false)
- **OR operations**: Evaluate left-to-right with short-circuiting (stop on first true)
- **XOR operations**: Must evaluate both conditions to ensure exclusivity
- **NOT operations**: Simply invert the result of a single filter evaluation

### Optimization Tips
1. **Order conditions by selectivity**: Place most restrictive conditions first in AND chains
2. **Avoid unnecessary nesting**: Complex nested logic can be hard to optimize
3. **Consider filter reuse**: Create base filters once and reuse them in multiple combinations
4. **Profile complex filters**: Test performance with large scan areas

### Memory Usage
- Each logical operation creates a new filter object
- Filter composition itself has minimal overhead
- Memory usage increases with filter complexity but remains manageable
- Actual performance impact occurs during scanning, not filter creation

---

## Integration with JSMacros Ecosystem

### WorldScanner Integration
IAdvancedFilter is the backbone of WorldScanner's filtering system:

```js
// WorldScannerBuilder methods return IAdvancedFilter instances
const filter = World.getWorldScanner()
    .withStringBlockFilter()     // Returns IAdvancedFilter<BlockHelper>
    .contains("diamond")
    .andStateFilter("y")         // Chaining returns IAdvancedFilter<BlockHelper>
    .is("<", 15);
```

### Event Filtering
While primarily used for world scanning, IAdvancedFilter concepts can be applied to event filtering:

```js
// Conceptual example for event filtering
const entityFilter = someEventFilter.and(otherCondition).not();
```

### Script Reusability
IAdvancedFilter enables the creation of reusable filter components:

```js
// Define reusable filter components
const rareMaterials = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond", "emerald", "ancient_debris");

const deepLocations = World.getWorldScanner()
    .withStateFilter("y")
    .is("<", 15);

// Reuse in multiple scripts
const miningTarget = rareMaterials.and(deepLocations);
const explorationTarget = rareMaterials.or(deepLocations);
```

---

## See Also

- [BasicFilter](BasicFilter.md) - Abstract base class implementing IAdvancedFilter
- [IFilter](IFilter.md) - Base interface for all filters
- [WorldScanner](../../world-interaction/WorldScanner.md) - Main class for world scanning operations
- [WorldScannerBuilder](../../world-interaction/WorldScannerBuilder.md) - Fluent interface for creating scanners
- [BooleanCompareFilter](BooleanCompareFilter.md) - Example filter implementation
- [NumberCompareFilter](NumberCompareFilter.md) - For numeric comparisons
- [StringCompareFilter](StringCompareFilter.md) - For string comparisons

## Version Information

- Available since JSMacros 1.6.5
- Core interface of the world scanning and filtering system
- Used extensively throughout the WorldScanner API
- Provides foundation for all logical filter operations in JSMacros