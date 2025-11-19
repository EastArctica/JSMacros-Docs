# NumberCompareFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.compare.NumberCompareFilter`
**Implements:** [`IFilter<Number>`](../api/IFilter.md)
**Since:** 1.6.5

A powerful filter class used to compare numeric values during world scanning operations. This filter supports various comparison operations (greater than, less than, equal to, etc.) and can handle all Java numeric types including integers, longs, floats, doubles, bytes, and shorts. It's commonly used in conjunction with the WorldScanner to filter blocks or entities based on numeric properties like coordinates, hardness, light levels, and other measured values.

The filter automatically detects the numeric type of the comparison value and uses the appropriate comparison method for optimal performance and accuracy. For floating-point comparisons, it uses fuzzy equality to handle precision issues.

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Supported Operations](#supported-operations)
- [Numeric Types](#numeric-types)
- [Usage Examples](#usage-examples)
- [Precision and Floating-Point Handling](#precision-and-floating-point-handling)
- [Performance Notes](#performance-notes)

## Constructors

### new NumberCompareFilter(operation, compareTo)

Creates a new NumberCompareFilter with the specified comparison operation and target value.

```js
const filter = new NumberCompareFilter(">", 10);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `operation` | `String` | The comparison operation to perform (">", ">=", "<", "<=", "==", "!=") |
| `compareTo` | `Object` | The numeric value to compare input values against |

**Example:**
```js
// Create a filter that matches numbers greater than 10
const greaterThan10 = new NumberCompareFilter(">", 10);

// Create a filter that matches numbers less than or equal to 5
const lessOrEqual5 = new NumberCompareFilter("<=", 5);

// Create a filter that matches numbers equal to 3.14
const equalsPi = new NumberCompareFilter("==", 3.14);

// Create a filter that matches numbers not equal to 0
const notZero = new NumberCompareFilter("!=", 0);
```

## Methods

## Supported Operations

The NumberCompareFilter supports the following comparison operations:

| Operation | Description | Example |
|-----------|-------------|---------|
| `">"` | Greater than | `new NumberCompareFilter(">", 10)` |
| `">="` | Greater than or equal to | `new NumberCompareFilter(">=", 0)` |
| `"<"` | Less than | `new NumberCompareFilter("<", 100)` |
| `"<="` | Less than or equal to | `new NumberCompareFilter("<=", 50)` |
| `"=="` | Equal to | `new NumberCompareFilter("==", 42)` |
| `"!="` | Not equal to | `new NumberCompareFilter("!=", 0)` |

---

## Numeric Types

The filter automatically handles all Java numeric types:

- **Integer** (`int`/`Integer`) - 32-bit signed integers
- **Long** (`long`/`Long`) - 64-bit signed integers
- **Short** (`short`/`Short`) - 16-bit signed integers
- **Byte** (`byte`/`Byte`) - 8-bit signed integers
- **Float** (`float`/`Float`) - 32-bit floating-point numbers
- **Double** (`double`/`Double`) - 64-bit floating-point numbers

The type is automatically detected based on the `compareTo` value provided in the constructor.

---

## Usage Examples

### Example 1: Filtering Blocks by Height

```js
// Find blocks below Y level 15 (deep underground)
const deepFilter = new NumberCompareFilter("<", 15);

// Use with WorldScanner to find blocks at specific depths
const scanner = World.getWorldScanner()
    .withStateFilter("y").is("<", 15)  // Internally uses NumberCompareFilter
    .build();

const deepBlocks = scanner.scanAroundPlayer(5);
console.log(`Found ${deepBlocks.length} blocks below Y=15`);
```

### Example 2: Filtering by Block Hardness

```js
// Create filters for different hardness levels
const softFilter = new NumberCompareFilter("<", 2);      // Very soft blocks
const mediumFilter = new NumberCompareFilter(">=", 2);   // Medium hardness
const hardFilter = new NumberCompareFilter(">", 10);     // Very hard blocks

// Test block hardness
const block = World.getBlock(Player.getPlayer().getBlockPos());
const hardness = block.getHardness();

console.log("Is soft:", softFilter.apply(hardness));
console.log("Is medium:", mediumFilter.apply(hardness));
console.log("Is hard:", hardFilter.apply(hardness));
```

### Example 3: Entity Property Filtering

```js
// Filter entities by health or distance
const entities = World.getEntities();
const healthyFilter = new NumberCompareFilter(">", 15);    // More than 15 health
const closeFilter = new NumberCompareFilter("<", 10);      // Less than 10 blocks away

const healthyEntities = entities.filter(entity => {
    if (entity.getHealth) {
        return healthyFilter.apply(entity.getHealth());
    }
    return false;
});

const playerPos = Player.getPlayer().getPos();
const closeEntities = entities.filter(entity => {
    const distance = entity.getPos().distanceTo(playerPos);
    return closeFilter.apply(distance);
});

console.log(`Found ${healthyEntities.length} healthy entities`);
console.log(`Found ${closeEntities.length} nearby entities`);
```

### Example 4: Light Level Filtering

```js
// Create filters for light levels
const brightFilter = new NumberCompareFilter(">", 10);     // Bright areas
const darkFilter = new NumberCompareFilter("<", 5);        // Dark areas
const safeFilter = new NumberCompareFilter(">=", 8);       // Safe from hostile spawns

// Scan area for blocks with specific light levels
const blocks = World.getLoadedBlocks();
const brightBlocks = blocks.filter(block => {
    return brightFilter.apply(block.getLuminance());
});

const darkBlocks = blocks.filter(block => {
    return darkFilter.apply(block.getLightLevel());
});

console.log(`Found ${brightBlocks.length} bright blocks`);
console.log(`Found ${darkBlocks.length} dark blocks`);
```

### Example 5: Complex Numeric Filtering

```js
// Combine multiple numeric filters for complex conditions
const heightFilter = new NumberCompareFilter(">", 60);     // Above sea level
const hardnessFilter = new NumberCompareFilter("<", 5);    // Easy to mine
const lightFilter = new NumberCompareFilter(">=", 8);      // Well lit

const idealMiningArea = blocks.filter(block => {
    const pos = block.getPos();
    return heightFilter.apply(pos.getY()) &&
           hardnessFilter.apply(block.getHardness()) &&
           lightFilter.apply(block.getLightLevel());
});

console.log(`Found ${idealMiningArea.length} ideal mining locations`);
```

### Example 6: Range Filtering with Multiple Filters

```js
// Create filters for range checking (0 <= value <= 100)
const minFilter = new NumberCompareFilter(">=", 0);
const maxFilter = new NumberCompareFilter("<=", 100);

// Check if values are within range
const values = [-5, 0, 25, 50, 100, 150];
const inRange = values.filter(value =>
    minFilter.apply(value) && maxFilter.apply(value)
);

console.log("Values in range [0, 100]:", inRange); // [0, 25, 50, 100]
```

---

## Precision and Floating-Point Handling

### Fuzzy Equality for Floating-Point Numbers

When using `==` or `!=` operations with floating-point numbers (float or double), the filter uses **fuzzy equality** with an epsilon of 0.000001 to handle precision issues inherent in floating-point arithmetic.

```js
const floatFilter = new NumberCompareFilter("==", 0.1 + 0.2);

// This works correctly due to fuzzy equality
console.log(floatFilter.apply(0.3));  // Output: true

// Direct comparison might fail due to floating-point precision
console.log(0.1 + 0.2 === 0.3);       // Output: false
```

### Type-Specific Comparisons

The filter performs type-specific comparisons to ensure accuracy:

- **Integer types** (byte, short, int, long): Use exact integer comparison
- **Floating-point types** (float, double): Use fuzzy equality for `==` and `!=` operations
- **Mixed types**: Both numbers are converted to the comparison value's type before comparison

---

## Performance Notes

### Optimization

- **Type Detection**: The numeric type is detected once during construction
- **Specialized Methods**: Each numeric type has a dedicated comparison method
- **No Autoboxing**: Uses primitive values where possible for better performance
- **Short-Circuit Logic**: Operations stop as soon as the result is determined

### Memory Usage

- **Lightweight**: Only stores the operation, comparison value, and type information
- **Immutable**: Filter instances cannot be modified after creation
- **Reusable**: Can be safely reused across multiple filtering operations

### Best Practices

```js
// GOOD: Create filter once, reuse multiple times
const greaterThan5 = new NumberCompareFilter(">", 5);
const results = numbers.filter(greaterThan5.apply.bind(greaterThan5));

// AVOID: Creating new filters in loops (performance impact)
const results2 = [];
for (const num of numbers) {
    const filter = new NumberCompareFilter(">", 5);  // Inefficient!
    if (filter.apply(num)) {
        results2.push(num);
    }
}
```

---

## Error Handling

### Invalid Operations

```js
try {
    const invalidFilter = new NumberCompareFilter("invalid_op", 10);
} catch (e) {
    console.log("Error: Invalid operation - must be one of >, >=, <, <=, ==, !=");
}
```

### Type Mismatches

The filter handles type mismatches by converting input numbers to the comparison value's type:

```js
const intFilter = new NumberCompareFilter(">", 10);  // Integer comparison

console.log(intFilter.apply(15));     // true (int > int)
console.log(intFilter.apply(15.5));   // true (15.5 converted to 15, 15 > 10)
console.log(intFilter.apply(9.9));    // false (9.9 converted to 9, 9 <= 10)
```

---

## See Also

- [WorldScanner](WorldScanner.md) - For using filters in world scanning operations
- [WorldScannerBuilder](WorldScannerBuilder.md) - For building scanners with numeric filters
- [IFilter](../api/IFilter.md) - Base interface for all filter classes
- [BasicFilter](BasicFilter.md) - Base class providing logical operations for filters
- [BooleanCompareFilter](BooleanCompareFilter.md) - For comparing boolean values
- [StringCompareFilter](StringCompareFilter.md) - For comparing string values
- [BlockHelper](../../world-interaction/BlockHelper.md) - For block properties and methods
- [EntityHelper](../../entity-helpers/EntityHelper.md) - For entity properties and methods

## Version Information

- Available since JSMacros 1.6.5
- Part of the world scanning and filtering system
- Supports all Java numeric types with type-specific optimizations
- Uses fuzzy equality for floating-point comparisons to handle precision issues