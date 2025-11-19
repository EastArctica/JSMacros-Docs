# BasicFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.BasicFilter<T>`

**Extends:** `Object`

**Implements:** `IAdvancedFilter<T>`

The `BasicFilter` class is an abstract base class that provides the foundation for all filters used in JSMacros' WorldScanner system. This class implements logical operations that allow filters to be combined and manipulated using boolean logic, making it a powerful tool for creating complex search criteria when scanning the Minecraft world.

While `BasicFilter` itself is abstract and cannot be instantiated directly, it provides the core functionality that all concrete filter classes inherit. These filters are primarily used with the `WorldScanner` class to search for blocks and entities based on specific conditions.

## Table of Contents

- [Methods](#methods)
- [Logical Operations](#logical-operations)
- [Usage with WorldScanner](#usage-with-worldscanner)
- [Filter Composition Examples](#filter-composition-examples)
- [Implementation Notes](#implementation-notes)

## Methods

## Logical Operations

BasicFilter provides four fundamental logical operations that allow you to build complex filtering conditions:

### AND Operations (`and()`)
- **Purpose**: Requires ALL conditions to be true
- **Use Case**: When you need multiple criteria simultaneously
- **Example**: Finding diamond ore that's also below Y=15

### OR Operations (`or()`)
- **Purpose**: Requires AT LEAST ONE condition to be true
- **Use Case**: When you want to match multiple types or conditions
- **Example**: Finding chests, barrels, OR shulker boxes

### XOR Operations (`xor()`)
- **Purpose**: Requires EXACTLY ONE condition to be true
- **Use Case**: When you want mutually exclusive conditions
- **Example**: Finding blocks that are either rare OR valuable, but not both

### NOT Operations (`not()`)
- **Purpose**: Inverts the filter logic
- **Use Case**: When you want to exclude certain blocks or conditions
- **Example**: Finding all blocks that are NOT air

---

## Usage with WorldScanner

While `BasicFilter` is abstract, its concrete implementations are used extensively with `WorldScanner`. Here's how the logical operations work in practice:

### Creating Complex Filters

```js
// Get a WorldScannerBuilder
const scannerBuilder = World.getWorldScanner();

// Create a complex filter for valuable storage blocks
const valuableStorageFilter = scannerBuilder
    .withStringBlockFilter()
    .contains("chest", "barrel", "shulker_box")  // OR logic for storage types
    .andStateFilter("isToolRequired")            // AND logic with state
    .is(false)                                  // No tool required to break
    .build();

// Use the filter
const positions = valuableStorageFilter.scanAroundPlayer(3);
```

### Combining Multiple Filter Types

```js
// Create multiple conditions
const oreFilter = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond_ore", "emerald_ore", "ancient_debris");

const deepFilter = World.getWorldScanner()
    .withStateFilter("y")
    .is("<", 15);

const accessibleFilter = World.getWorldScanner()
    .withStateFilter("isToolRequired")
    .is(false);

// Combine them with logical operations
const rareDeepAccessible = oreFilter
    .and(deepFilter)
    .and(accessibleFilter);

// Alternative: Find rare ores OR accessible blocks
const alternative = oreFilter.or(accessibleFilter);
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

const buildingMaterials = commonMaterials.and(easyToMine);
const positions = buildingMaterials.scanAroundPlayer(2);
```

### Example 2: Exclusion Filtering

```js
// Find all ore blocks EXCEPT common ones
const allOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("_ore");

const commonOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("coal_ore", "iron_ore", "copper_ore");

const rareOres = allOres.and(commonOres.not());
```

### Example 3: Complex Logic Chains

```js
// Create filter for: (diamond OR ancient_debris) AND (deep OR protected)
const valuableOres = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond_ore", "ancient_debris");

const deep = World.getWorldScanner()
    .withStateFilter("y")
    .is("<", 15);

const protected = World.getWorldScanner()
    .withStateFilter("isToolRequired")
    .is(true);

const target = valuableOres.and(deep.or(protected));
```

### Example 4: Mutually Exclusive Conditions

```js
// Find blocks that are either light sources OR opaque, but not both
const lightSources = World.getWorldScanner()
    .withBlockFilter("getLuminance")
    .is(">", 0);

const opaqueBlocks = World.getWorldScanner()
    .withBlockFilter("getOpacity")
    .is(">", 0);

const exclusive = lightSources.xor(opaqueBlocks);
```

---

## Implementation Notes

### Abstract Nature
- `BasicFilter` is abstract and cannot be instantiated directly
- Concrete implementations are created through `WorldScannerBuilder` or specific filter classes
- Common concrete implementations include `BlockFilter`, `BlockStateFilter`, and `ClassWrapperFilter`

### Type Safety
- All filters are generic (`BasicFilter<T>`) with type `T` representing the type of object being filtered
- Type safety is maintained throughout filter composition
- Mixing filters of different types will result in compile-time or runtime errors

### Performance Considerations
- Filter composition creates new filter objects but doesn't execute the filtering logic
- Actual filtering happens during `WorldScanner` operations
- Complex filter chains may have slight performance overhead during evaluation
- Consider filter order for optimization - place most restrictive conditions first when possible

### Method Chaining
- Logical operations return `IAdvancedFilter<T>` for continued chaining
- You can chain multiple operations together:
  ```js
  const complexFilter = baseFilter
      .and(condition1)
      .or(condition2)
      .not()
      .and(finalCondition);
  ```

### Evaluation Order
- AND operations are evaluated left-to-right and short-circuit (stop on first false)
- OR operations are evaluated left-to-right and short-circuit (stop on first true)
- NOT operations simply invert the result of the enclosed filter

---

## Concrete Filter Classes

While `BasicFilter` provides the logical operations, concrete filter classes implement the actual filtering logic. Common concrete filters include:

- `BlockFilter` - Filters based on block properties and methods
- `BlockStateFilter` - Filters based on block state properties
- `ClassWrapperFilter` - Generic wrapper for filtering objects by method calls
- `StringCompareFilter` - Filters based on string comparisons
- `NumberCompareFilter` - Filters based on numeric comparisons
- `BooleanCompareFilter` - Filters based on boolean values

---

## See Also

- [WorldScanner](WorldScanner.md) - Main class for world scanning operations
- [WorldScannerBuilder](WorldScannerBuilder.md) - Fluent interface for creating scanners
- [IAdvancedFilter](IAdvancedFilter.md) - Interface that BasicFilter implements
- [IFilter](IFilter.md) - Base interface for all filters
- [BlockHelper](BlockHelper.md) - For block-level operations
- [BlockStateHelper](BlockStateHelper.md) - For block state operations

## Version Information

- Available since JSMacros 1.6.5
- Part of the world scanning and filtering system
- Used extensively with `WorldScanner` for efficient block searching