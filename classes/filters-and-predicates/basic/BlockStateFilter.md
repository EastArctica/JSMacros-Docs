# BlockStateFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.BlockStateFilter`

**Extends:** `ClassWrapperFilter<BlockStateHelper>`

**Implements:** `IFilter<BlockStateHelper>`

## Overview

The `BlockStateFilter` class is a specialized filter implementation in JSMacros' World Scanner system. It provides a way to filter block states based on their properties and methods by wrapping any public no-parameter method from the `BlockStateHelper` class and applying comparison operations to the returned values.

This class is typically not instantiated directly by users, but rather created through the `WorldScannerBuilder` when using state filtering methods like `withStateFilter()`. The filter leverages Java reflection to dynamically invoke methods on `BlockStateHelper` objects and compare their results using various criteria.

## Class Purpose

The BlockStateFilter enables developers to:
- Filter block states based on their properties (like opacity, luminance, air status)
- Apply numerical, string, or boolean comparisons to block state method results
- Create complex world scanning logic for finding specific types of blocks
- Combine multiple filters using logical operators (AND, OR, XOR, NOT)

## Constructor

### `new BlockStateFilter(methodName, methodArgs, filterArgs)`

Creates a new BlockStateFilter that will invoke the specified method on BlockStateHelper objects and apply filter criteria to the result.

```js
// This is typically used internally by WorldScannerBuilder
// Users generally create filters through the builder pattern
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `methodName` | String | The name of the method to invoke on BlockStateHelper (e.g., "isAir", "getLuminance", "isOpaque") |
| `methodArgs` | Object[] | Arguments to pass to the method when invoked (empty array for no-parameter methods) |
| `filterArgs` | Object[] | Arguments for the filter comparison operation (depends on return type) |

## Usage Through WorldScannerBuilder

The BlockStateFilter is most commonly used through the WorldScannerBuilder's state filtering methods:

### Basic Boolean Filtering

```js
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all non-air blocks
const scanner = new WorldScannerBuilder()
    .withStateFilter("isAir")
    .is(false)
    .build();

// Find all opaque blocks
const opaqueScanner = new WorldScannerBuilder()
    .withStateFilter("isOpaque")
    .is(true)
    .build();

// Find all blocks that emit light
const lightScanner = new WorldScannerBuilder()
    .withStateFilter("getLuminance")
    .is(">", 0)
    .build();
```

### Numerical Filtering

```js
// Find blocks with specific opacity levels
const opacityScanner = new WorldScannerBuilder()
    .withStateFilter("getOpacity")
    .is(">=", 5)
    .build();

// Find blocks with specific hardness
const hardnessScanner = new WorldScannerBuilder()
    .withStateFilter("getHardness")
    .is("<", 2.0)
    .build();
```

### String Filtering

```js
// Filter by piston behavior
const pistonScanner = new WorldScannerBuilder()
    .withStateFilter("getPistonBehaviour")
    .is("EQUALS", "NORMAL")
    .build();

// Filter by block state method that returns strings
const stringScanner = new WorldScannerBuilder()
    .withStateFilter("toString")
    .is("CONTAINS", "stone")
    .build();
```

### Method Arguments

```js
// Filter using method with arguments (e.g., isOf method)
const typeScanner = new WorldScannerBuilder()
    .withStateFilter("isOf")
    .is(["minecraft:water"], [true])  // methodArgs, filterArgs
    .build();
```

### Combined Filters

```js
// Complex filter combining multiple conditions
const complexScanner = new WorldScannerBuilder()
    .withStateFilter("isAir")
    .is(false)
    .andStateFilter("isOpaque")
    .is(false)
    .andStateFilter("getLuminance")
    .is(">", 0)
    .build();
```

## Available BlockStateHelper Methods

The BlockStateFilter can use any public no-parameter method from BlockStateHelper:

### Boolean Methods
- `isAir()` - Returns true if the block state is air
- `isOpaque()` - Returns true if the block state is opaque
- `emitsRedstonePower()` - Returns true if the state emits redstone power
- `exceedsCube()` - Returns true if the shape exceeds a cube
- `isToolRequired()` - Returns true if a tool is required to mine
- `hasBlockEntity()` - Returns true if the state has a block entity
- `hasRandomTicks()` - Returns true if the state can be random ticked
- `hasComparatorOutput()` - Returns true if the state has comparator output

### Number Methods
- `getHardness()` - Returns the block hardness
- `getLuminance()` - Returns the light level emitted
- `getOpacity()` - Returns the opacity level (if available)

### String Methods
- `getId()` - Returns the block ID (since 1.8.4)
- `getPistonBehaviour()` - Returns piston behavior as string
- `toString()` - Returns string representation

## Filter Operation Types

Based on the return type of the invoked method, different filter operations are available:

### For Boolean Returns
```js
.withStateFilter("isAir").is(true)     // Must be air
.withStateFilter("isAir").is(false)    // Must not be air
```

### For Number Returns
```js
.withStateFilter("getLuminance").is(">", 0)        // Greater than
.withStateFilter("getLuminance").is(">=", 5)       // Greater than or equal
.withStateFilter("getHardness").is("<", 2.0)       // Less than
.withStateFilter("getHardness").is("<=", 1.5)      // Less than or equal
.withStateFilter("getOpacity").is("==", 15)        // Equal to
.withStateFilter("getOpacity").is("!=", 0)         // Not equal to
```

### For String Returns
```js
.withStateFilter("getId").is("EQUALS", "minecraft:stone")
.withStateFilter("getId").is("CONTAINS", "ore")
.withStateFilter("getId").is("STARTS_WITH", "minecraft:diamond_")
.withStateFilter("getId").is("ENDS_WITH", "_planks")
.withStateFilter("toString").is("MATCHES", ".*water.*")
```

## Advanced Examples

### Safe Block Detection
```js
// Find all blocks that are safe to walk on (not air, not dangerous)
const safeBlockScanner = new WorldScannerBuilder()
    .withStateFilter("isAir")
    .is(false)
    .andStateFilter("getHardness")
    .is(">", 0)
    .build();
```

### Redstone Component Finder
```js
// Find all blocks that can interact with redstone
const redstoneScanner = new WorldScannerBuilder()
    .withStateFilter("emitsRedstonePower")
    .is(true)
    .orStateFilter("hasComparatorOutput")
    .is(true)
    .build();
```

### Light Source Analysis
```js
// Categorize light sources by brightness
const dimLightScanner = new WorldScannerBuilder()
    .withStateFilter("getLuminance")
    .is(">", 0)
    .andStateFilter("getLuminance")
    .is("<", 8)
    .build();

const brightLightScanner = new WorldScannerBuilder()
    .withStateFilter("getLuminance")
    .is(">=", 8)
    .build();
```

### Translucent Block Detector
```js
// Find all non-opaque, non-air blocks (glass, water, etc.)
const translucentScanner = new WorldScannerBuilder()
    .withStateFilter("isAir")
    .is(false)
    .andStateFilter("isOpaque")
    .is(false)
    .build();
```

## Performance Considerations

1. **Method Overhead**: Using reflection-based method invocation has some overhead compared to direct property access
2. **No-Parameter Methods**: The filter is optimized for methods without parameters
3. **Return Type Handling**: Automatic type detection and filter creation based on method return types
4. **Caching**: Method lookup is cached internally for better performance

## Error Handling

Common errors and their causes:

```js
// Method doesn't exist or is not public
try {
    new WorldScannerBuilder().withStateFilter("nonExistentMethod");
} catch (e) {
    Chat.log("Method not found: " + e.getMessage());
}

// Method requires parameters
try {
    new WorldScannerBuilder().withStateFilter("isOf").is(true);
} catch (e) {
    Chat.log("Method requires arguments: " + e.getMessage());
}

// Unsupported return type
try {
    new WorldScannerBuilder().withStateFilter("getBlock").is("something");
} catch (e) {
    Chat.log("Unsupported return type: " + e.getMessage());
}
```

## Integration with WorldScanner

Once created through the builder, the BlockStateFilter becomes part of a WorldScanner that can be used to scan chunks:

```js
const scanner = new WorldScannerBuilder()
    .withStateFilter("getLuminance")
    .is(">", 0)
    .build();

// Scan for light sources around the player
const lightSources = scanner.scanChunksAroundPlayer(3);
Chat.log("Found " + lightSources.length + " light sources");

// Scan specific chunk range
const chunkResults = scanner.scanChunkRange(0, 0, 2);
for (const pos of chunkResults) {
    Chat.log("Light source at: " + pos.x + ", " + pos.y + ", " + pos.z);
}
```

## Related Classes

- `WorldScannerBuilder` - Creates BlockStateFilter instances through fluent API
- `BlockStateHelper` - Provides methods that can be wrapped by this filter
- `ClassWrapperFilter<T>` - Parent class implementing the wrapper pattern
- `IFilter<T>` - Interface defining the filter contract
- `WorldScanner` - Uses the filter for world scanning operations

## Version Information

- Available since JSMacros 1.6.5
- Part of the world scanning and filtering system
- Designed for parallel processing of world data
- Uses Java reflection for dynamic method invocation