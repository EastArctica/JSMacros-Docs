# WorldScannerBuilder

## Overview

The `WorldScannerBuilder` class is a powerful World Interaction builder in JSMacros that provides a fluent API for creating custom world scanners. It allows you to build complex filters to find specific blocks and block states in the Minecraft world efficiently using native Java functions.

This builder is particularly useful for JavaScript and other languages that don't support multithreading natively, as it enables parallel processing of world scans that would otherwise run sequentially. The builder supports both string-based filters (for simple matching) and method-based filters (for complex logic).

## Creating a WorldScannerBuilder

You can create a new WorldScannerBuilder instance directly:

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");
const builder = new WorldScannerBuilder();
```

## Builder Pattern Overview

The WorldScannerBuilder uses a fluent builder pattern with two main filter categories:

1. **Block Filters** - Filter based on block properties and methods
2. **Block State Filters** - Filter based on block state properties and methods

Each filter starts with a "with" command (like `withBlockFilter()` or `withStateFilter()`) and can be combined using "and", "or", "xor" commands. The "not" command negates the entire filter.

## Filter Building Methods

### Block Filter Methods

#### `withBlockFilter(method)`
Starts a new block filter using a method from `BlockHelper`.

```javascript
// Filter blocks by their ID method
builder.withBlockFilter("getId");
```

#### `andBlockFilter(method)`
Adds a new block filter with AND logic.

```javascript
builder.withBlockFilter("getId").equals("minecraft:stone")
       .andBlockFilter("getHardness").is(">=", 1.5);
```

#### `orBlockFilter(method)`
Adds a new block filter with OR logic.

```javascript
builder.withBlockFilter("getId").equals("minecraft:stone")
       .orBlockFilter("getId").equals("minecraft:cobblestone");
```

#### `notBlockFilter()`
Negates the current block filter.

```javascript
builder.withBlockFilter("getId").contains("ore")
       .notBlockFilter();
```

#### `withStringBlockFilter()`
Starts a new string-based block filter for simple text matching.

```javascript
builder.withStringBlockFilter().contains("chest");
```

#### `andStringBlockFilter()`
Adds a new string block filter with AND logic.

```javascript
builder.withStringBlockFilter().contains("oak")
       .andStringBlockFilter().contains("log");
```

#### `orStringBlockFilter()`
Adds a new string block filter with OR logic.

```javascript
builder.withStringBlockFilter().contains("chest")
       .orStringBlockFilter().contains("barrel");
```

### Block State Filter Methods

#### `withStateFilter(method)`
Starts a new block state filter using a method from `BlockStateHelper`.

```javascript
// Filter by block state opacity
builder.withStateFilter("getOpacity");
```

#### `andStateFilter(method)`
Adds a new block state filter with AND logic.

```javascript
builder.withStateFilter("getOpacity").is(">", 0)
       .andStateFilter("isAir").is(false);
```

#### `orStateFilter(method)`
Adds a new block state filter with OR logic.

```javascript
builder.withStateFilter("isOpaque").is(true)
       .orStateFilter("getLuminance").is(">", 0);
```

#### `notStateFilter()`
Negates the current block state filter.

```javascript
builder.withStateFilter("isAir").is(true)
       .notStateFilter();
```

#### `withStringStateFilter()`
Starts a new string-based block state filter.

```javascript
builder.withStringStateFilter().contains("water");
```

#### `andStringStateFilter()`
Adds a new string block state filter with AND logic.

```javascript
builder.withStringStateFilter().contains("facing")
       .andStringStateFilter().contains("north");
```

#### `orStringStateFilter()`
Adds a new string block state filter with OR logic.

```javascript
builder.withStringStateFilter().contains("east")
       .orStringStateFilter().contains("west");
```

## Filter Condition Methods

### String Matching Methods (for String Filters)

### General Condition Methods

#### `is(methodArgs, filterArgs)`
Advanced version with separate method arguments and filter arguments.

```javascript
// Method with arguments
builder.withBlockFilter("isIn", "minecraft:logs").is(true);

// Multiple arguments to the filter condition
builder.withBlockFilter("getId").is(["method_args"], ["EQUALS", "minecraft:stone"]);
```

## Finalization Methods

#### `build()`
Creates a `WorldScanner` instance with the configured filters.

```javascript
const scanner = builder.build();
const results = scanner.scanChunksAroundPlayer(2);
```

## Usage Examples

### Simple Block Finding

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all chests in a 5x5 chunk area around the player
const scanner = new WorldScannerBuilder()
    .withStringBlockFilter()
    .equals("minecraft:chest", "minecraft:trapped_chest", "minecraft:ender_chest")
    .build();

const results = scanner.scanChunksAroundPlayer(5);
Chat.log("Found " + results.length + " chests");
```

### Complex Mining Scanner

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all valuable ores
const scanner = new WorldScannerBuilder()
    .withStringBlockFilter()
    .equals("minecraft:diamond_ore", "minecraft:emerald_ore", "minecraft:gold_ore")
    .orStringBlockFilter()
    .equals("minecraft:iron_ore", "minecraft:coal_ore", "minecraft:copper_ore")
    .orStringBlockFilter()
    .equals("minecraft:redstone_ore", "minecraft:lapis_ore")
    .andBlockFilter("getHardness")  // Only ores that are reasonably hard
    .is(">=", 1.5)
    .build();

const results = scanner.scanChunksAroundPlayer(3);
for (const pos of results) {
    Chat.log("Found ore at: " + pos.x + ", " + pos.y + ", " + pos.z);
}
```

### Tree Detection Scanner

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all types of wood (logs and planks)
const scanner = new WorldScannerBuilder()
    .withStringBlockFilter()
    .contains("_log")  // All log types
    .orStringBlockFilter()
    .contains("_planks")  // All plank types
    .andBlockFilter("getHardness")  // Valid wood blocks have some hardness
    .is(">", 0)
    .build();

const results = scanner.scanChunkRange(player.getChunkX(), player.getChunkZ(), 2);
Chat.log("Found " + results.length + " wood blocks");
```

### State-Based Filtering

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all solid, non-air blocks with specific properties
const scanner = new WorldScannerBuilder()
    .withStateFilter("isAir")
    .is(false)
    .andStateFilter("isOpaque")
    .is(true)
    .andStateFilter("getOpacity")
    .is(">", 0)
    .build();

const results = scanner.scanChunksAroundPlayer(1);
Chat.log("Found " + results.length + " solid opaque blocks");
```

### Water Detection

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all water sources and flowing water
const scanner = new WorldScannerBuilder()
    .withStringStateFilter()
    .contains("water")
    .andStateFilter("isOf", "minecraft:water")
    .is(true)
    .build();

const results = scanner.scanChunksAroundPlayer(2);
Chat.log("Found " + results.length + " water blocks");
```

### Light Level Analysis

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all blocks that emit light (torches, lava, glowstone, etc.)
const scanner = new WorldScannerBuilder()
    .withStateFilter("getLuminance")
    .is(">", 0)
    .build();

const results = scanner.scanChunksAroundPlayer(3);
Chat.log("Found " + results.length + " light-emitting blocks");

// Find all transparent blocks (like glass)
const transparentScanner = new WorldScannerBuilder()
    .withStateFilter("isOpaque")
    .is(false)
    .andStateFilter("isAir")
    .is(false)
    .build();

const transparentBlocks = transparentScanner.scanChunksAroundPlayer(1);
Chat.log("Found " + transparentBlocks.length + " transparent blocks");
```

### Agricultural Scanner

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all crops and farmland
const scanner = new WorldScannerBuilder()
    .withStringBlockFilter()
    .contains("wheat", "carrots", "potatoes", "beetroots")
    .orStringBlockFilter()
    .equals("minecraft:farmland")
    .orStringBlockFilter()
    .contains("pumpkin", "melon")
    .build();

const results = scanner.scanChunksAroundPlayer(2);
Chat.log("Found " + results.length + " agricultural blocks");
```

## Advanced Examples

### Multiple Complex Conditions

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Complex scanner for finding building materials
const scanner = new WorldScannerBuilder()
    // Find all stone-like blocks
    .withStringBlockFilter()
    .contains("stone", "cobblestone", "andesite", "diorite", "granite")
    .orStringBlockFilter()
    // Or all wood blocks
    .contains("log", "planks")
    .orStringBlockFilter()
    // Or all brick blocks
    .contains("brick", "concrete")
    .andBlockFilter("getHardness")  // Must be reasonably durable
    .is(">=", 1.0)
    .andStateFilter("isAir")  // Must not be air
    .is(false)
    .build();

const results = scanner.scanChunksAroundPlayer(4);
```

### Negated Filters

```javascript
const WorldScannerBuilder = Java.type("xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.WorldScannerBuilder");

// Find all blocks except dangerous ones
const scanner = new WorldScannerBuilder()
    .withStateFilter("isAir")  // Not air
    .is(false)
    .andStateFilter("getLuminance")  // Not light sources
    .is("==", 0)
    .andStringBlockFilter()  // Not lava or fire
    .contains("lava", "fire")
    .notBlockFilter()
    .build();

const results = scanner.scanChunksAroundPlayer(2);
```

## Method Return Types for Filtering

When using `withBlockFilter(method)` or `withStateFilter(method)`, you can use any method from `BlockHelper` or `BlockStateHelper` respectively:

### Common BlockHelper Methods
- `getId()` - Returns String (block ID)
- `getHardness()` - Returns Number
- `getBlastResistance()` - Returns Number
- `getSlipperiness()` - Returns Number
- `canMobSpawnInside()` - Returns Boolean
- `hasDynamicBounds()` - Returns Boolean
- `getTags()` - Returns Array

### Common BlockStateHelper Methods
- `isAir()` - Returns Boolean
- `isOpaque()` - Returns Boolean
- `getOpacity()` - Returns Number
- `getLuminance()` - Returns Number
- `isOf(blockId)` - Returns Boolean (with method arguments)
- `getMaterial()` - Returns String-like object

## Performance Considerations

1. **Reuse Scanners**: Build scanners once and reuse them for multiple scans
2. **Appropriate Range**: Use reasonable chunk ranges to avoid performance issues
3. **Simple Filters**: String-based filters are generally faster than method-based filters
4. **Combine Filters**: Use logical operators to combine conditions rather than multiple scans

## Error Handling

The builder will throw `IllegalStateException` in certain cases:

```javascript
try {
    // This will fail - trying to use is() without a filter
    new WorldScannerBuilder().is("something");
} catch (e) {
    Chat.log("Error: " + e.getMessage());
}

try {
    // This will fail - incomplete filter chain
    new WorldScannerBuilder().withBlockFilter("getHardness").build();
} catch (e) {
    Chat.log("Error: " + e.getMessage());
}
```

## Related Classes

- `WorldScanner` - The scanner class created by this builder
- `BlockHelper` - Provides block methods for filtering
- `BlockStateHelper` - Provides block state methods for filtering
- `MethodWrapper` - Used for advanced custom filtering in FWorld.getWorldScanner()

## Version Information

- Available since JSMacros 1.6.5
- Designed for parallel world scanning
- Supports both simple and complex filtering logic