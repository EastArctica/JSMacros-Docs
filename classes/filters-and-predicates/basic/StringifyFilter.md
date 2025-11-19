# StringifyFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.impl.StringifyFilter<T>`

**Extends:** `BasicFilter<T>`

**Implements:** `IAdvancedFilter<T>`

**Since:** JsMacros 1.6.5

The `StringifyFilter` class is a versatile filter that converts any object to its string representation and then applies string comparison operations against a set of predefined values. This filter is particularly useful when you need to search for objects based on their string properties, such as item names, block identifiers, or any other textual representation of game objects.

As part of JSMacros' WorldScanner filtering system, `StringifyFilter` inherits powerful logical operations from `BasicFilter`, allowing you to combine it with other filters using AND, OR, XOR, and NOT operations to create complex search criteria.

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Filter Operations](#filter-operations)
- [String Comparison Methods](#string-comparison-methods)
- [Usage Examples](#usage-examples)
- [Advanced Filtering Patterns](#advanced-filtering-patterns)
- [Performance Considerations](#performance-considerations)

## Constructors

### `new StringifyFilter(operation)`
Creates a new `StringifyFilter` with the specified string comparison operation.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| operation | `String` | The string comparison operation to use ("CONTAINS", "EQUALS", "STARTS_WITH", "ENDS_WITH", "MATCHES") |

**Example:**
```js
// Create a filter that checks if string contains certain text
const containsFilter = new StringifyFilter("CONTAINS");

// Create a filter that checks for exact string equality
const equalsFilter = new StringifyFilter("EQUALS");

// Create a filter that checks if string starts with certain text
const startsWithFilter = new StringifyFilter("STARTS_WITH");

// Create a filter that checks if string ends with certain text
const endsWithFilter = new StringifyFilter("ENDS_WITH");

// Create a filter that checks if string matches regex pattern
const matchesFilter = new StringifyFilter("MATCHES");
```

**Notes:**
- The `operation` parameter must be one of the valid `StringCompareFilter.FilterMethod` values
- Case sensitivity depends on the underlying Java string methods (most are case-sensitive)
- "MATCHES" operation expects regular expression patterns in the filter options

---

## Methods

## Filter Operations

`StringifyFilter` inherits all logical operations from `BasicFilter`:

## String Comparison Methods

### CONTAINS
Checks if the object's string representation contains any of the filter options as substrings.

**Example:**
```js
const toolFilter = new StringifyFilter("CONTAINS")
    .addOption("pickaxe", "axe", "shovel", "hoe");

// Matches: "diamond_pickaxe", "iron_axe", "wooden_shovel", etc.
// Does not match: "sword", "bow", "helmet"
```

### EQUALS
Checks if the object's string representation exactly matches any of the filter options.

**Example:**
```js
const exactFilter = new StringifyFilter("EQUALS")
    .addOption("minecraft:diamond", "minecraft:emerald");

// Matches: "minecraft:diamond", "minecraft:emerald" exactly
// Does not match: "minecraft:diamond_ore", "minecraft:emerald_block"
```

### STARTS_WITH
Checks if the object's string representation starts with any of the filter options.

**Example:**
```js
const modFilter = new StringifyFilter("STARTS_WITH")
    .addOption("minecraft:", "thermal:", "mekanism:");

// Matches: "minecraft:stone", "thermal:iron_ore", "mekanism:copper_block"
// Does not match: "custommod:item"
```

### ENDS_WITH
Checks if the object's string representation ends with any of the filter options.

**Example:**
```js
const blockTypeFilter = new StringifyFilter("ENDS_WITH")
    .addOption("_ore", "_log", "_planks");

// Matches: "minecraft:diamond_ore", "minecraft:oak_log", "minecraft:birch_planks"
// Does not match: "minecraft:stone", "minecraft:dirt"
```

### MATCHES
Checks if the object's string representation matches any of the filter options using regular expressions.

**Example:**
```js
const regexFilter = new StringifyFilter("MATCHES")
    .addOption(".*_ore$", ".*diamond.*", ".*emerald.*");

// Matches: "diamond_ore", "deepslate_diamond_ore", "emerald_ore", "diamond_block"
// Uses Java regex patterns
```

---

## Usage Examples

### Example 1: Ore Detection
```js
// Create a filter for finding all types of ore
const oreFilter = new StringifyFilter("ENDS_WITH")
    .addOption("_ore", "_deepslate_ore");

// Use with WorldScanner
const scanner = World.getWorldScanner();
const results = scanner.withFilter(oreFilter).scanAroundPlayer(5);

Chat.log(`Found ${results.length} ore blocks nearby`);
results.forEach(pos => {
    const block = World.getBlock(pos.x, pos.y, pos.z);
    Chat.log(`- ${block.getBlockState().getBlock().getTranslationKey()} at [${pos.x}, ${pos.y}, ${pos.z}]`);
});
```

### Example 2: Tool Identification
```js
// Filter for different types of tools
const toolFilter = new StringifyFilter("CONTAINS")
    .addOption("pickaxe", "axe", "shovel", "hoe", "sword", "bow");

// Filter for specific materials
const diamondFilter = new StringifyFilter("CONTAINS")
    .addOption("diamond");

// Combine to find diamond tools
const diamondTools = toolFilter.and(diamondFilter);

// Check player inventory for diamond tools
const player = Player.getPlayer();
const inventory = player.getInventory();

for (let i = 0; i < inventory.getHotbarSize(); i++) {
    const item = inventory.getStack(i);
    if (item && diamondTools.apply(item)) {
        Chat.log(`Diamond tool in hotbar slot ${i + 1}: ${item.getName()}`);
    }
}
```

### Example 3: Block Category Filtering
```js
// Filter for different types of storage blocks
const storageFilter = new StringifyFilter("CONTAINS")
    .addOption("chest", "barrel", "shulker_box");

// Filter for redstone components
const redstoneFilter = new StringifyFilter("CONTAINS")
    .addOption("repeater", "comparator", "piston", "observer", "redstone");

// Create complex filter for redstone storage systems
const redstoneStorage = storageFilter.and(redstoneFilter);

// Alternative: Storage OR redstone components
const technicalBlocks = storageFilter.or(redstoneFilter);
```

### Example 4: Mod-Specific Filtering
```js
// Filter for items from specific mods
const thermalFilter = new StringifyFilter("STARTS_WITH")
    .addOption("thermal:");

const createFilter = new StringifyFilter("STARTS_WITH")
    .addOption("create:");

const mekanismFilter = new StringifyFilter("STARTS_WITH")
    .addOption("mekanism:");

// Combine multiple tech mods
const techModFilter = thermalFilter.or(createFilter).or(mekanismFilter);

// Exclude vanilla items
const vanillaFilter = new StringifyFilter("STARTS_WITH")
    .addOption("minecraft:");

const modOnlyFilter = techModFilter.and(vanillaFilter.not());
```

### Example 5: Dynamic Filter Management
```js
// Create a configurable filter
const itemFilter = new StringifyFilter("CONTAINS");

// Add items from configuration
const targetItems = ["diamond", "emerald", "netherite", "ancient_debris"];
targetItems.forEach(item => itemFilter.addOption(item));

// Later, remove some items based on conditions
if (someCondition) {
    itemFilter.removeOption("ancient_debris", "netherite");
}

// Add new items dynamically
function addNewTarget(itemName) {
    itemFilter.addOption(itemName);
    Chat.log(`Added "${itemName}" to filter targets`);
}

// Check filter effectiveness
function logFilterOptions() {
    Chat.log("Current filter options:");
    // Note: filterObjects is private, so this would need a getter method
    // This is illustrative of how you might track filter state
}
```

---

## Advanced Filtering Patterns

### Pattern 1: Hierarchical Filtering
```js
// Create hierarchical filters for different categories
const preciousGems = new StringifyFilter("CONTAINS")
    .addOption("diamond", "emerald", "ruby", "sapphire");

const preciousMetals = new StringifyFilter("CONTAINS")
    .addOption("gold", "silver", "platinum");

const rareMaterials = preciousGems.or(preciousMetals);

// Further filter by form (ore, block, ingot)
const oreForm = new StringifyFilter("ENDS_WITH").addOption("_ore");
const blockForm = new StringifyFilter("ENDS_WITH").addOption("_block");
const ingotForm = new StringifyFilter("ENDS_WITH").addOption("_ingot");

// Find rare materials in any form
const rareAnything = rareMaterials.and(oreForm.or(blockForm).or(ingotForm));
```

### Pattern 2: Exclusion Filtering
```js
// Find all building materials except common ones
const allBuilding = new StringifyFilter("CONTAINS")
    .addOption("wood", "stone", "brick", "concrete", "terracotta");

const commonMaterials = new StringifyFilter("CONTAINS")
    .addOption("dirt", "cobblestone", "oak", "stone");

const premiumBuilding = allBuilding.and(commonMaterials.not());
```

### Pattern 3: Pattern-Based Filtering
```js
// Use regex patterns for complex matching
const patternFilter = new StringifyFilter("MATCHES")
    .addOption(".*diamond.*")  // Anything with "diamond" in name
    .addOption(".*_ore$")      // Anything ending with "_ore"
    .addOption("^minecraft:")  // Anything starting with "minecraft:"

// Combine with logical operations for precise control
const minecraftOres = patternFilter.and(
    new StringifyFilter("ENDS_WITH").addOption("_ore").not()
);
```

### Pattern 4: Context-Aware Filtering
```js
// Create filters that adapt to different contexts
function createMiningFilter(depth) {
    const allOres = new StringifyFilter("ENDS_WITH")
        .addOption("_ore", "_deepslate_ore");

    if (depth < 15) {
        // At shallow depths, focus on common ores
        return allOres.and(
            new StringifyFilter("CONTAINS")
                .addOption("coal", "iron", "copper")
        );
    } else {
        // At deep depths, focus on rare ores
        return allOres.and(
            new StringifyFilter("CONTAINS")
                .addOption("diamond", "emerald", "ancient_debris")
        );
    }
}

// Use the context-aware filter
const playerY = Player.getPlayer().getY();
const miningFilter = createMiningFilter(playerY);
```

---

## Performance Considerations

### Parallel Processing
- `StringifyFilter` uses parallel streams for comparing against multiple filter options
- This provides better performance when filtering against large option sets
- The overhead is minimal for small option sets

### String Conversion Overhead
- Every object is converted to string using `toString()` method
- This happens once per filter evaluation
- Consider the complexity of `toString()` implementations when using with custom objects

### Filter Optimization
- Order filter options from most specific to least specific for potential early matches
- Remove redundant or overlapping filter options to improve performance
- Use the most restrictive comparison method for your use case (e.g., `EQUALS` is faster than `CONTAINS`)

### Memory Usage
- Filter options are stored in a `HashSet` for efficient lookup
- Memory usage scales linearly with the number of unique filter options
- Consider removing unused options with `removeOption()` when filters are no longer needed

### Regex Performance
- `MATCHES` operations using regular expressions are more computationally expensive
- Cache compiled regex patterns internally when possible
- Use simpler string operations when regex functionality isn't required

---

## Integration with WorldScanner

### Basic Usage
```js
// Create a stringify filter
const woodFilter = new StringifyFilter("CONTAINS")
    .addOption("oak", "birch", "spruce", "jungle");

// Use with WorldScanner
const scanner = World.getWorldScanner();
const results = scanner.withFilter(woodFilter).scanAroundPlayer(10);

// Process results
results.forEach(pos => {
    Chat.log(`Found wood at [${pos.x}, ${pos.y}, ${pos.z}]`);
});
```

### Complex Scanning
```js
// Multi-stage filtering for precise results
const step1 = new StringifyFilter("CONTAINS").addOption("chest", "barrel");
const step2 = someOtherFilter; // Additional criteria
const step3 = anotherFilter;   // More criteria

const finalFilter = step1.and(step2).and(step3);

// Perform the scan
const valuableStorage = World.getWorldScanner()
    .withFilter(finalFilter)
    .scanAroundPlayer(20);
```

---

## See Also

- [BasicFilter](BasicFilter.md) - Parent class providing logical operations
- [StringCompareFilter](StringCompareFilter.md) - Related class for direct string comparisons
- [WorldScanner](../../world-interaction/WorldScanner.md) - Main class for world scanning
- [WorldScannerBuilder](../../world-interaction/WorldScannerBuilder.md) - Builder for creating scanners
- [IAdvancedFilter](IAdvancedFilter.md) - Interface for advanced filter operations
- [IFilter](IFilter.md) - Base filter interface

## Version Information

- **Available since:** JSMacros 1.6.5
- **Part of:** World scanning and filtering system
- **Author:** Etheradon
- **Generic type:** `<T>` - The type of objects being filtered
- **Thread safety:** Filter is thread-safe for concurrent read operations