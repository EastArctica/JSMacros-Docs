# BooleanCompareFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.compare.BooleanCompareFilter`
**Implements:** [`IFilter<Boolean>`](../api/IFilter.md)
**Since:** 1.6.5

A simple filter class used to compare boolean values during world scanning operations. This filter checks whether a given boolean value matches a specified comparison value and is commonly used in conjunction with the WorldScanner to filter blocks or entities based on boolean properties.

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Notes](#notes)

## Constructors

### new BooleanCompareFilter(compareTo)

Creates a new BooleanCompareFilter with the specified boolean value to compare against.

```js
const filter = new BooleanCompareFilter(true);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `compareTo` | `boolean` | The boolean value to compare input values against |

**Example:**
```js
// Create a filter that matches true values
const trueFilter = new BooleanCompareFilter(true);

// Create a filter that matches false values
const falseFilter = new BooleanCompareFilter(false);
```

## Methods

## Usage Examples

### Example 1: Filtering Blocks by Boolean Properties

```js
// Create a scanner that finds blocks with specific boolean properties
const scanner = World.getWorldScanner()
    .withStateFilter("isWaterlogged").is(true)    // Internally uses BooleanCompareFilter(true)
    .andStateFilter("isAir").is(false)            // Internally uses BooleanCompareFilter(false)
    .build();

// Scan for waterlogged blocks
const waterloggedBlocks = scanner.scanAroundPlayer(2);
console.log(`Found ${waterloggedBlocks.length} waterlogged blocks`);
```

### Example 2: Custom Boolean Filtering

```js
// Create a custom boolean filter for checking if blocks are transparent
const transparentFilter = new BooleanCompareFilter(true);

// Use with custom block property checking
const blocks = World.getLoadedBlocks();
const transparentBlocks = blocks.filter(block => {
    const isTransparent = block.getLightOpacity() === 0;
    return transparentFilter.apply(isTransparent);
});

console.log(`Found ${transparentBlocks.length} transparent blocks`);
```

### Example 3: Entity Boolean Property Filtering

```js
// Filter entities based on boolean properties
const entities = World.getEntities();
const filter = new BooleanCompareFilter(true);

// Find entities that are on fire
const burningEntities = entities.filter(entity => {
    return filter.apply(entity.isOnFire());
});

console.log(`Found ${burningEntities.length} entities on fire`);
```

### Example 4: Combining with Other Filters

```js
// Create multiple boolean filters for complex conditions
const solidFilter = new BooleanCompareFilter(false);  // Not air
const toolFilter = new BooleanCompareFilter(true);    // Tool required

// Use in custom scanning logic
const customScan = (blocks) => {
    return blocks.filter(block => {
        return solidFilter.apply(block.isAir()) &&
               toolFilter.apply(block.isToolRequired());
    });
};
```

## Notes

- **Simple Comparison**: The filter performs a direct boolean equality check using `equals()`
- **Type Safety**: The filter expects Boolean input values and will handle null values according to Java's Boolean.equals() semantics
- **WorldScanner Integration**: This class is primarily used internally by WorldScanner when filtering based on boolean block state properties
- **Performance**: Being a simple boolean comparison, this filter has minimal performance overhead
- **Immutable**: Once created, the filter's comparison value cannot be changed

## See Also

- [WorldScanner](WorldScanner.md) - For using filters in world scanning operations
- [WorldScannerBuilder](WorldScannerBuilder.md) - For building scanners with boolean property filters
- [IFilter](../api/IFilter.md) - Base interface for all filter classes
- [NumberCompareFilter](NumberCompareFilter.md) - For comparing numeric values
- [StringCompareFilter](StringCompareFilter.md) - For comparing string values