# XorFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.logical.XorFilter`

**Extends:** `BasicFilter<T>`

**Implements:** `IAdvancedFilter<T>`

**Since:** JSMacros 1.6.5

The `XorFilter` class is a logical filter that combines two filters using boolean XOR (exclusive OR) logic. It's part of the WorldScanner filtering system and allows you to create sophisticated filtering conditions where exactly one of the component filters must return `true` for the XorFilter to return `true`.

This class is particularly useful when you need to filter blocks or entities based on mutually exclusive criteria. For example, finding blocks that are either valuable ores OR dangerous blocks, but not both at the same time.

## Overview

The XorFilter implements exclusive OR logic for precise filtering control:

- **Exclusive OR**: Returns `true` only when exactly one of the filters returns `true`
- **Mutual exclusion**: Perfect for scenarios where you want one condition but not both
- **Generic type support**: Can work with any type `T` that the component filters can handle
- **Fluent interface**: Inherits `and()`, `or()`, `xor()`, and `not()` methods from BasicFilter for chaining

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Important Notes](#important-notes)
- [Related Classes](#related-classes)

## Constructors

### `new XorFilter(filterOne, filterTwo)`

Creates a new XorFilter that combines two filters with XOR logic.

```javascript
// Create filters for different categories
const valuableFilter = World.getStringBlockFilter().contains("diamond_ore", "emerald_ore");
const dangerousFilter = World.getStringBlockFilter().contains("lava", "fire");

// Combine with XOR logic - valuable OR dangerous but not both
const interestingFilter = new XorFilter(valuableFilter, dangerousFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filterOne` | `IFilter<T>` | The first filter to evaluate |
| `filterTwo` | `IFilter<T>` | The second filter to evaluate |

**Returns**
A new XorFilter instance that returns `true` when exactly one filter returns `true`

**Since:** `1.6.5`

## Methods

### `apply(obj)`

Applies the XOR filter logic to an object. Returns `true` only when exactly one of the two filters returns `true` for the given object.

```javascript
const testBlock = World.getBlock(100, 10, 200);
const passesFilter = interestingFilter.apply(testBlock);

if (passesFilter) {
    Chat.log("Block is either valuable OR dangerous, but not both!");
} else {
    Chat.log("Block is either both valuable and dangerous, or neither");
}
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `obj` | `T` | The object to test against both filters |

**Returns**
* `Boolean`: `true` if exactly one filter returns `true`, `false` if both return `true` or both return `false`

**Note:** This method evaluates both filters to determine the XOR result, unlike short-circuit operators.

### `getFilterOne()`

Returns the first filter component.

```javascript
const firstFilter = interestingFilter.getFilterOne();
Chat.log(`First filter: ${firstFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The first filter that was passed to the constructor

### `getFilterTwo()`

Returns the second filter component.

```javascript
const secondFilter = interestingFilter.getFilterTwo();
Chat.log(`Second filter: ${secondFilter.toString()}`);
```

**Returns**
* `IFilter<T>`: The second filter that was passed to the constructor

### Inherited Methods from BasicFilter

The XorFilter inherits several useful methods from BasicFilter for chaining filters:

- `and(filter)` - Combines this filter with another using AND logic
- `or(filter)` - Combines this filter with another using OR logic
- `xor(filter)` - Combines this filter with another using XOR logic
- `not()` - Returns a filter that inverts this filter's result

## Usage Examples

### Basic Exclusive Filtering

Find blocks that are either wood OR stone, but not both (which is impossible for a single block, but shows the concept):

```javascript
// Create individual filters
const woodFilter = World.getStringBlockFilter().contains("wood", "log");
const stoneFilter = World.getStringBlockFilter().contains("stone", "cobblestone");

// Combine with XOR logic
const woodOrStoneFilter = new XorFilter(woodFilter, stoneFilter);

// Use with WorldScanner
const scanner = World.getWorldScanner(woodOrStoneFilter);
const results = scanner.scanAroundPlayer(5);

Chat.log(`Found ${results.length} blocks that are wood XOR stone`);
```

### Biome-Exclusive Blocks

Find blocks that are specific to exactly one biome category:

```javascript
// Desert-specific blocks
const desertFilter = World.getStringBlockFilter().contains("sand", "cactus", "dead_bush");

// Snow-specific blocks
const snowFilter = World.getStringBlockFilter().contains("snow", "ice", "packed_ice");

// XOR for biome-exclusive blocks
const biomeExclusiveFilter = new XorFilter(desertFilter, snowFilter);

const scanner = World.getWorldScanner(biomeExclusiveFilter);
const results = scanner.scanAroundPlayer(10);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const name = block.getBlockState().getBlock().getName();

    // Determine which category it belongs to
    if (desertFilter.apply(block)) {
        Chat.log(`Desert block: ${name} at ${pos.toString()}`);
    } else {
        Chat.log(`Snow block: ${name} at ${pos.toString()}`);
    }
});
```

### Tool Requirement vs Light Source

Find blocks that are either light sources OR require special tools, but not both:

```javascript
// Filter for light-emitting blocks
const lightSourceFilter = World.getBlockFilter("getLuminance").is(">", 0);

// Filter for blocks requiring special tools
const toolRequiredFilter = World.getStateFilter("isToolRequired").is(true);

// XOR for exclusive properties
const exclusivePropertyFilter = new XorFilter(lightSourceFilter, toolRequiredFilter);

const scanner = World.getWorldScanner(exclusivePropertyFilter);
const results = scanner.scanAroundPlayer(8);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const name = block.getBlockState().getBlock().getName();
    const luminance = block.getBlockState().getLuminance();
    const toolRequired = block.getBlockState().isToolRequired();

    let property;
    if (luminance > 0) {
        property = `light source (level ${luminance})`;
    } else {
        property = `requires special tool`;
    }

    Chat.log(`${name}: ${property} at ${pos.toString()}`);
});
```

### Height-Exclusive Resources

Find resources that appear at either high altitudes OR deep underground, but not middle levels:

```javascript
// Filter for high altitude blocks (above Y=200)
const highAltitudeFilter = World.getBlockFilter("getY").is(">", 200);

// Filter for deep underground blocks (below Y=20)
const deepUndergroundFilter = World.getBlockFilter("getY").is("<", 20);

// XOR for exclusive height ranges
const extremeHeightFilter = new XorFilter(highAltitudeFilter, deepUndergroundFilter);

// Combine with ore filter
const oreFilter = World.getStringBlockFilter().contains("_ore");
const extremeOreFilter = oreFilter.and(extremeHeightFilter);

const scanner = World.getWorldScanner(extremeOreFilter);
const results = scanner.scanAroundPlayer(15);

Chat.log(`Found ${results.length} ore blocks at extreme heights`);
results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const height = pos.y;
    const location = height > 200 ? "high altitude" : "deep underground";
    Chat.log(`${block.getBlockState().getBlock().getName()}: ${location} (Y: ${height})`);
});
```

### Redstone vs Water Mechanics

Find blocks that are related to either redstone OR water mechanics, but not both:

```javascript
// Redstone-related blocks
const redstoneFilter = World.getStringBlockFilter().contains(
    "redstone", "repeater", "comparator", "piston", "observer", "lever", "button"
);

// Water-related blocks
const waterFilter = World.getStringBlockFilter().contains(
    "water", "ice", "kelp", "seagrass", "coral", "sponge", "bubble_column"
);

// XOR for exclusive mechanics
const mechanicExclusiveFilter = new XorFilter(redstoneFilter, waterFilter);

const scanner = World.getWorldScanner(mechanicExclusiveFilter);
const results = scanner.scanAroundPlayer(6);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const name = block.getBlockState().getBlock().getName();

    // Categorize the block
    const category = redstoneFilter.apply(block) ? "Redstone" : "Water";
    Chat.log(`${category} block: ${name} at ${pos.toString()}`);
});
```

### Material Type Exclusivity

Find blocks that are either natural materials OR man-made materials, but not both:

```javascript
// Natural materials (wood, stone, dirt, etc.)
const naturalFilter = World.getStringBlockFilter().contains(
    "log", "planks", "stone", "dirt", "grass", "sand", "gravel", "ore"
);

// Man-made materials (bricks, concrete, glazed terracotta, etc.)
const manmadeFilter = World.getStringBlockFilter().contains(
    "brick", "concrete", "glazed", "terracotta", "wool", "glass", "slab", "stair"
);

// XOR for material origin
const materialOriginFilter = new XorFilter(naturalFilter, manmadeFilter);

const scanner = World.getWorldScanner(materialOriginFilter);
const results = scanner.scanAroundPlayer(4);

let naturalCount = 0;
let manmadeCount = 0;

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const name = block.getBlockState().getBlock().getName();

    if (naturalFilter.apply(block)) {
        naturalCount++;
        Chat.log(`Natural: ${name}`);
    } else {
        manmadeCount++;
        Chat.log(`Man-made: ${name}`);
    }
});

Chat.log(`Found ${naturalCount} natural and ${manmadeCount} man-made materials`);
```

### Combat vs Utility Items (Entity Filtering)

Find entities that are either hostile OR utility entities, but not both:

```javascript
// Hostile entities
const hostileFilter = World.getEntityFilter()
    .getType().contains("zombie", "skeleton", "creeper", "spider", "enderman");

// Utility entities (items, armor stands, etc.)
const utilityFilter = World.getEntityFilter()
    .getType().contains("item", "armor_stand", "painting", "item_frame");

// XOR for exclusive entity types
const exclusiveEntityFilter = new XorFilter(hostileFilter, utilityFilter);

// Find entities around player
const player = Player.getPlayer();
if (player) {
    const entities = World.getEntities(exclusiveEntityFilter, 16);

    entities.forEach(entity => {
        const type = entity.getType();
        const category = hostileFilter.apply(entity) ? "Hostile" : "Utility";
        const pos = entity.getPos();
        Chat.log(`${category} entity: ${type} at (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)})`);
    });
}
```

### Time-Based Exclusivity

Find blocks that are active during either day OR night, but not both:

```javascript
// Filter for blocks that glow during day (sunlight-affected)
const dayActiveFilter = {
    apply: (block) => {
        // This is a conceptual example - you'd need to implement actual logic
        // for checking if a block is day-active
        const name = block.getBlockState().getBlock().getName().toLowerCase();
        return name.includes("daylight") || name.includes("solar");
    }
};

// Filter for blocks that glow during night
const nightActiveFilter = {
    apply: (block) => {
        // This is a conceptual example
        const name = block.getBlockState().getBlock().getName().toLowerCase();
        return name.includes("night") || name.includes("glow") || name.includes("torch");
    }
};

// XOR for time-exclusive blocks
const timeExclusiveFilter = new XorFilter(dayActiveFilter, nightActiveFilter);

const scanner = World.getWorldScanner(timeExclusiveFilter);
const results = scanner.scanAroundPlayer(8);

Chat.log(`Found ${results.length} time-exclusive blocks`);
```

### Complex Logic Chains

Combine XorFilter with other logical operations for complex conditions:

```javascript
// Base filters
const diamondFilter = World.getStringBlockFilter().contains("diamond_ore");
const goldFilter = World.getStringBlockFilter().contains("gold_ore");
const ironFilter = World.getStringBlockFilter().contains("iron_ore");
const deepFilter = World.getBlockFilter("getY").is("<", 32);
const dangerousFilter = World.getStringBlockFilter().contains("lava", "magma_block");

// XOR for exclusive valuable ores (diamond OR gold but not areas with both)
const valuableXorFilter = new XorFilter(diamondFilter, goldFilter);

// Combine with iron using OR
const valuableOreFilter = valuableXorFilter.or(ironFilter);

// Combine with deep level using AND
const deepValuableOreFilter = valuableOreFilter.and(deepFilter);

// XOR with dangerous areas - find valuable ores that are either in dangerous areas OR not
const riskFilter = new XorFilter(dangerousFilter, valuableOreFilter);

const scanner = World.getWorldScanner(riskFilter);
const results = scanner.scanAroundPlayer(10);

Chat.log(`Found ${results.length} blocks with exclusive risk/value patterns`);
```

### Performance Considerations with XOR

Use XorFilter when you need mutually exclusive conditions:

```javascript
// Efficient XOR usage for mutually exclusive categories
const buildingFilter = World.getStringBlockFilter().contains("brick", "concrete", "wood");
const naturalFilter = World.getStringBlockFilter().contains("stone", "dirt", "sand");

// XOR ensures we get blocks from exactly one category
const categoryFilter = new XorFilter(buildingFilter, naturalFilter);

// This is more precise than OR, which could match blocks from both categories
// (though unlikely for these specific filters)
const scanner = World.getWorldScanner(categoryFilter);
const results = scanner.scanAroundPlayer(5);

// Categorize results
let buildingCount = 0;
let naturalCount = 0;

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);

    if (buildingFilter.apply(block)) {
        buildingCount++;
    } else {
        naturalCount++;
    }
});

Chat.log(`Building materials: ${buildingCount}, Natural materials: ${naturalCount}`);
```

### Debugging XOR Logic

Sometimes it's helpful to see which filter matched:

```javascript
const redFilter = World.getStringBlockFilter().contains("red", "crimson");
const blueFilter = World.getStringBlockFilter().contains("blue", "lapis", "ice");

const colorXorFilter = new XorFilter(redFilter, blueFilter);

const scanner = World.getWorldScanner(colorXorFilter);
const results = scanner.scanAroundPlayer(6);

results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    const name = block.getBlockState().getBlock().getName();

    // Check which filter matched
    const isRed = redFilter.apply(block);
    const isBlue = blueFilter.apply(block);

    // Since XOR matched, exactly one should be true
    const color = isRed ? "Red" : "Blue";
    Chat.log(`${color} block: ${name} at ${pos.toString()}`);

    // Verify XOR logic (for debugging)
    if (isRed && isBlue) {
        Chat.warn(`Logic error: Both filters matched for ${name}`);
    } else if (!isRed && !isBlue) {
        Chat.warn(`Logic error: Neither filter matched for ${name}`);
    }
});
```

## Important Notes

### Performance Considerations

1. **Both filters evaluated**: Unlike OR with short-circuiting, XOR must evaluate both filters to determine the result
2. **No short-circuiting**: Both `filterOne.apply(obj)` and `filterTwo.apply(obj)` are always called
3. **Computational cost**: Consider the complexity of both filters since both will be evaluated

### Error Handling

1. **Null filters**: The constructor expects non-null filter parameters
2. **Type compatibility**: Both filters should be compatible with the same object type
3. **Exception propagation**: Exceptions from component filters are propagated through `apply()`

### Logical Behavior

1. **Exclusive truth table**: XOR returns `true` only when inputs differ (true/false or false/true)
2. **Mutual exclusion**: Perfect for scenarios where you want exactly one condition to be true
3. **Complementarity**: XOR with the same filter always returns `false`

### Best Practices

1. **Clear conditions**: Use XOR when conditions are naturally mutually exclusive
2. **Testing**: Test individual filters before combining them with XOR
3. **Documentation**: Document why conditions should be mutually exclusive
4. **Verification**: In development, verify that XOR logic matches your expectations

### Common Use Cases

- **Category exclusivity**: Finding items that belong to exactly one category
- **Biome-specific blocks**: Blocks that appear in exactly one biome type
- **Time-based filtering**: Items active during either day or night but not both
- **Risk/reward scenarios**: Finding high-value items that are either safe or dangerous but not both
- **Material origin**: Distinguishing between natural and man-made materials

### Integration with WorldScanner

XorFilter integrates seamlessly with the WorldScanner system:

```javascript
// Direct usage
const scanner = World.getWorldScanner(xorFilter);

// Through WorldScannerBuilder
const scanner = World.getWorldScanner()
    .withStringBlockFilter().contains("diamond_ore")
    .xorStringBlockFilter().contains("gold_ore")
    .build();
```

### Logical Equivalents

Sometimes there are multiple ways to express the same logic:

```javascript
// Method 1: Using XorFilter
const xorFilter = new XorFilter(filterA, filterB);

// Method 2: Using AND/OR/NOT combination
// (A AND NOT B) OR (B AND NOT A)
const equivalentFilter = filterA.and(filterB.not()).or(filterB.and(filterA.not()));

// Both methods create equivalent filters, but XorFilter is more readable
```

## Related Classes

- **AndFilter**: Logical AND combination of two filters
- **OrFilter**: Logical OR combination of two filters
- **NotFilter**: Logical NOT inversion of a filter
- **BasicFilter**: Abstract base class providing logical filter operations
- **IFilter**: Base interface for all filters
- **IAdvancedFilter**: Interface extending IFilter with logical operations
- **WorldScanner**: Main class for world scanning operations
- **WorldScannerBuilder**: Builder class for creating complex scanners

## Version Information

- **Available since:** JSMacros 1.6.5
- **Author:** Etheradon
- **Part of:** WorldScanner filtering system