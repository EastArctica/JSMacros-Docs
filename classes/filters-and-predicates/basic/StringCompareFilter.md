# StringCompareFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.compare.StringCompareFilter`

**Implements:** [`IFilter<String>`](../api/IFilter.md)

**Since:** 1.6.5

A versatile filter class used to compare string values during world scanning operations. This filter provides multiple string comparison methods including equality checks, substring searching, prefix/suffix matching, and regular expression pattern matching. It is commonly used with the WorldScanner to filter blocks or entities based on string properties such as names, IDs, or other textual attributes.

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Filter Operations](#filter-operations)
- [Usage Examples](#usage-examples)
- [Performance Considerations](#performance-considerations)
- [Common Use Cases](#common-use-cases)
- [See Also](#see-also)

## Constructors

### new StringCompareFilter(operation, compareTo)

Creates a new StringCompareFilter with the specified comparison operation and target string.

```js
const filter = new StringCompareFilter("CONTAINS", "diamond");
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `operation` | `String` | The comparison operation to perform. Must be one of: `"CONTAINS"`, `"EQUALS"`, `"STARTS_WITH"`, `"ENDS_WITH"`, or `"MATCHES"` |
| `compareTo` | `String` | The string to compare input values against |

**Example:**
```js
// Create various filters for different string comparison operations
const containsFilter = new StringCompareFilter("CONTAINS", "ore");
const equalsFilter = new StringCompareFilter("EQUALS", "minecraft:diamond_ore");
const startsWithFilter = new StringCompareFilter("STARTS_WITH", "minecraft:");
const endsWithFilter = new StringCompareFilter("ENDS_WITH", "_ore");
const regexFilter = new StringCompareFilter("MATCHES", "minecraft:.*_ore");
```

## Methods

## Filter Operations

StringCompareFilter supports five different comparison operations:

### CONTAINS Operation
- **Purpose**: Checks if the input string contains the target substring
- **Method**: Uses Java's `String.contains()` method
- **Case Sensitivity**: Case-sensitive
- **Use Case**: Finding items with specific keywords in their names

```js
const containsFilter = new StringCompareFilter("CONTAINS", "chest");
containsFilter.apply("minecraft:chest");        // true
containsFilter.apply("minecraft:trapped_chest"); // true
containsFilter.apply("minecraft:ender_chest");   // true
containsFilter.apply("minecraft:chest_minecart"); // true
```

### EQUALS Operation
- **Purpose**: Checks if the input string exactly matches the target string
- **Method**: Uses Java's `String.equals()` method
- **Case Sensitivity**: Case-sensitive
- **Use Case**: Finding items with exact name matches

```js
const equalsFilter = new StringCompareFilter("EQUALS", "minecraft:diamond_ore");
equalsFilter.apply("minecraft:diamond_ore");     // true
equalsFilter.apply("minecraft:iron_ore");        // false
equalsFilter.apply("diamond_ore");               // false
```

### STARTS_WITH Operation
- **Purpose**: Checks if the input string starts with the target prefix
- **Method**: Uses Java's `String.startsWith()` method
- **Case Sensitivity**: Case-sensitive
- **Use Case**: Finding items from specific namespaces or with specific prefixes

```js
const startsWithFilter = new StringCompareFilter("STARTS_WITH", "minecraft:");
startsWithFilter.apply("minecraft:stone");       // true
startsWithFilter.apply("minecraft:diamond_ore"); // true
startsWithFilter.apply("botania:flower");        // false
```

### ENDS_WITH Operation
- **Purpose**: Checks if the input string ends with the target suffix
- **Method**: Uses Java's `String.endsWith()` method
- **Case Sensitivity**: Case-sensitive
- **Use Case**: Finding items with specific suffixes like "_ore", "_log", etc.

```js
const endsWithFilter = new StringCompareFilter("ENDS_WITH", "_ore");
endsWithFilter.apply("minecraft:diamond_ore");   // true
endsWithFilter.apply("minecraft:iron_ore");      // true
endsWithFilter.apply("minecraft:stone");         // false
endsWithFilter.apply("minecraft:oak_log");       // false
```

### MATCHES Operation
- **Purpose**: Checks if the input string matches the given regular expression pattern
- **Method**: Uses Java's `String.matches()` method
- **Case Sensitivity**: Case-sensitive (depends on regex pattern)
- **Use Case**: Complex pattern matching with regular expressions

```js
const regexFilter = new StringCompareFilter("MATCHES", "minecraft:.*_ore");
regexFilter.apply("minecraft:diamond_ore");      // true
regexFilter.apply("minecraft:iron_ore");         // true
regexFilter.apply("minecraft:gold_ore");         // true
regexFilter.apply("minecraft:stone");            // false
regexFilter.apply("botania:diamond_ore");        // false

// More complex regex examples
const vowelFilter = new StringCompareFilter("MATCHES", "^[aeiou].*");
vowelFilter.apply("apple");                      // true
vowelFilter.apply("orange");                     // true
vowelFilter.apply("banana");                     // false

const digitFilter = new StringCompareFilter("MATCHES", ".*\\d.*");
digitFilter.apply("item1");                      // true
digitFilter.apply("block2");                     // true
digitFilter.apply("tool");                       // false
```

---

## Usage Examples

### Example 1: WorldScanner with String Filtering

```js
// Create a WorldScanner that finds all ore blocks
const oreScanner = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("_ore")
    .build();

// Scan around the player for ores
const orePositions = oreScanner.scanAroundPlayer(5);
console.log(`Found ${orePositions.length} ore blocks nearby`);

// Create a scanner for specific valuable ores
const valuableOreScanner = World.getWorldScanner()
    .withStringBlockFilter()
    .equals("minecraft:diamond_ore")
    .orContains("minecraft:emerald_ore")
    .orContains("minecraft:ancient_debris")
    .build();

const valuableOres = valuableOreScanner.scanAroundPlayer(10);
console.log(`Found ${valuableOres.length} valuable ores`);
```

### Example 2: Custom String Filtering Logic

```js
// Create multiple string filters for different purposes
const woodFilter = new StringCompareFilter("ENDS_WITH", "_log");
const stoneFilter = new StringCompareFilter("ENDS_WITH", "stone");
const oreFilter = new StringCompareFilter("ENDS_WITH", "_ore");

// Custom filtering function
function filterBlocksByType(blocks, type) {
    let filter;

    switch (type.toLowerCase()) {
        case "wood":
            filter = woodFilter;
            break;
        case "stone":
            filter = stoneFilter;
            break;
        case "ore":
            filter = oreFilter;
            break;
        default:
            return [];
    }

    return blocks.filter(block => {
        const blockId = block.getBlockId();
        return filter.apply(blockId);
    });
}

// Usage
const allBlocks = World.getLoadedBlocks();
const woodBlocks = filterBlocksByType(allBlocks, "wood");
const stoneBlocks = filterBlocksByType(allBlocks, "stone");
const oreBlocks = filterBlocksByType(allBlocks, "ore");

console.log(`Found ${woodBlocks.length} wood blocks`);
console.log(`Found ${stoneBlocks.length} stone blocks`);
console.log(`Found ${oreBlocks.length} ore blocks`);
```

### Example 3: Entity Name Filtering

```js
// Create filters for finding specific types of entities
const hostileFilter = new StringCompareFilter("CONTAINS", "zombie");
const passiveFilter = new StringCompareFilter("CONTAINS", "cow");
const itemFilter = new StringCompareFilter("STARTS_WITH", "minecraft:item");

// Filter entities by name
function filterEntitiesByName(entities, nameFilter) {
    return entities.filter(entity => {
        const entityType = entity.getType();
        return nameFilter.apply(entityType);
    });
}

// Find all hostile entities
const allEntities = World.getEntities();
const hostileEntities = filterEntitiesByName(allEntities, hostileFilter);
const passiveEntities = filterEntitiesByName(allEntities, passiveFilter);
const itemEntities = filterEntitiesByName(allEntities, itemFilter);

console.log(`Found ${hostileEntities.length} hostile entities`);
console.log(`Found ${passiveEntities.length} passive entities`);
console.log(`Found ${itemEntities.length} item entities`);
```

### Example 4: Complex Regex Pattern Matching

```js
// Create filters for complex pattern matching
const moddedBlocksFilter = new StringCompareFilter("MATCHES", "^[a-z0-9_]+:[a-z0-9_]+$");
const numericSuffixFilter = new StringCompareFilter("MATCHES", ".*\\d+$");
const vowelStartFilter = new StringCompareFilter("MATCHES", "^[aeiouAEIOU].*");

// Filter blocks by complex criteria
function analyzeBlockPatterns(blocks) {
    const results = {
        moddedBlocks: [],
        numericSuffix: [],
        vowelStart: []
    };

    blocks.forEach(block => {
        const blockId = block.getBlockId();

        if (moddedBlocksFilter.apply(blockId)) {
            results.moddedBlocks.push(block);
        }

        if (numericSuffixFilter.apply(blockId)) {
            results.numericSuffix.push(block);
        }

        if (vowelStartFilter.apply(blockId)) {
            results.vowelStart.push(block);
        }
    });

    return results;
}

const loadedBlocks = World.getLoadedBlocks();
const analysis = analyzeBlockPatterns(loadedBlocks);

console.log(`Found ${analysis.moddedBlocks.length} modded blocks`);
console.log(`Found ${analysis.numericSuffix.length} blocks with numeric suffixes`);
console.log(`Found ${analysis.vowelStart.length} blocks starting with vowels`);
```

### Example 5: Inventory Item Filtering

```js
// Create filters for inventory management
const toolFilter = new StringCompareFilter("ENDS_WITH", "_pickaxe");
const weaponFilter = new StringCompareFilter("ENDS_WITH", "_sword");
const armorFilter = new StringCompareFilter("ENDS_WITH", "_helmet");

// Filter inventory items by type
function filterInventoryByType(filter) {
    const inventory = Player.getPlayer().getInventory();
    const filteredItems = [];

    for (let i = 0; i < inventory.getSize(); i++) {
        const item = inventory.getSlot(i);
        if (item && item.getItemId()) {
            if (filter.apply(item.getItemId())) {
                filteredItems.push({
                    item: item,
                    slot: i,
                    count: item.getCount()
                });
            }
        }
    }

    return filteredItems;
}

// Find different types of items
const tools = filterInventoryByType(toolFilter);
const weapons = filterInventoryByType(weaponFilter);
const helmets = filterInventoryByType(armorFilter);

console.log(`Found ${tools.length} tools in inventory`);
console.log(`Found ${weapons.length} weapons in inventory`);
console.log(`Found ${helmets.length} helmets in inventory`);
```

### Example 6: Combining Multiple Filters

```js
// Create multiple filters for complex searches
const oreFilter = new StringCompareFilter("ENDS_WITH", "_ore");
const deepOreFilter = new StringCompareFilter("MATCHES", "minecraft:(diamond|emerald|ancient_debris)");
const commonFilter = new StringCompareFilter("MATCHES", "minecraft:(coal|iron|copper|gold)_ore");

// Complex filtering logic
function findOresByRarity(blocks) {
    const rareOres = [];
    const commonOres = [];
    const otherOres = [];

    blocks.forEach(block => {
        const blockId = block.getBlockId();

        if (oreFilter.apply(blockId)) {
            if (deepOreFilter.apply(blockId)) {
                rareOres.push(block);
            } else if (commonFilter.apply(blockId)) {
                commonOres.push(block);
            } else {
                otherOres.push(block);
            }
        }
    });

    return { rareOres, commonOres, otherOres };
}

const nearbyBlocks = World.getLoadedBlocks();
const oreAnalysis = findOresByRarity(nearbyBlocks);

console.log(`Rare ores: ${oreAnalysis.rareOres.length}`);
console.log(`Common ores: ${oreAnalysis.commonOres.length}`);
console.log(`Other ores: ${oreAnalysis.otherOres.length}`);
```

---

## Performance Considerations

### Operation Performance
- **EQUALS**: Fastest - Simple string equality check
- **STARTS_WITH**: Fast - Checks prefix only
- **ENDS_WITH**: Fast - Checks suffix only
- **CONTAINS**: Moderate - Searches entire string
- **MATCHES**: Slowest - Full regex pattern matching

### Optimization Tips
1. **Use Specific Operations**: Choose the most specific operation for your needs
   - Use `EQUALS` instead of `MATCHES` for exact matches
   - Use `STARTS_WITH`/`ENDS_WITH` instead of `MATCHES` for prefix/suffix checks

2. **Filter Order**: Place more restrictive filters first when chaining multiple filters

3. **Regex Complexity**: Keep regular expressions simple when possible
   ```js
   // Good - simple pattern
   const simpleFilter = new StringCompareFilter("MATCHES", "minecraft:.*_ore");

   // Avoid - complex backtracking patterns
   const complexFilter = new StringCompareFilter("MATCHES", ".*(.*(.*)).*");
   ```

4. **Case Sensitivity**: All operations are case-sensitive by default
   ```js
   // For case-insensitive matching, use regex
   const caseInsensitiveFilter = new StringCompareFilter("MATCHES", "(?i).*diamond.*");
   ```

---

## Common Use Cases

### Block Identification
```js
// Find all storage blocks
const storageFilter = new StringCompareFilter("CONTAINS", "chest");
const barrelFilter = new StringCompareFilter("CONTAINS", "barrel");
const shulkerFilter = new StringCompareFilter("CONTAINS", "shulker_box");
```

### Resource Management
```js
// Find valuable resources
const diamondFilter = new StringCompareFilter("CONTAINS", "diamond");
const emeraldFilter = new StringCompareFilter("CONTAINS", "emerald");
const netheriteFilter = new StringCompareFilter("CONTAINS", "netherite");
```

### Entity Classification
```js
// Classify entities by type
const mobFilter = new StringCompareFilter("MATCHES", "minecraft:.*");
const itemFilter = new StringCompareFilter("STARTS_WITH", "minecraft:item");
const projectileFilter = new StringCompareFilter("ENDS_WITH", "_arrow");
```

### Inventory Organization
```js
// Sort items by category
const toolFilter = new StringCompareFilter("MATCHES", ".*_pickaxe|.*_axe|.*_shovel");
const foodFilter = new StringCompareFilter("MATCHES", ".*bread|.*apple|.*meat");
const redstoneFilter = new StringCompareFilter("CONTAINS", "redstone|repeater|comparator");
```

---

## Notes

- **Thread Safety**: StringCompareFilter instances are immutable and thread-safe
- **Null Handling**: The filter will throw an exception if given a null input string
- **Case Sensitivity**: All string operations are case-sensitive by default
- **Performance**: Consider using simpler operations when possible for better performance
- **Regex Syntax**: Uses Java regular expression syntax for MATCHES operations
- **WorldScanner Integration**: This class is commonly used with WorldScanner for efficient block searching

---

## See Also

- [WorldScanner](../../world/WorldScanner.md) - For using filters in world scanning operations
- [WorldScannerBuilder](../../world/WorldScannerBuilder.md) - For building scanners with string filters
- [IFilter](../api/IFilter.md) - Base interface for all filter classes
- [ICompare](../api/ICompare.md) - Interface for comparison operations
- [BasicFilter](BasicFilter.md) - Base class providing logical operations for filters
- [NumberCompareFilter](NumberCompareFilter.md) - For comparing numeric values
- [BooleanCompareFilter](BooleanCompareFilter.md) - For comparing boolean values

## Version Information

- Available since JSMacros 1.6.5
- Part of the world scanning and filtering system
- Used extensively with `WorldScanner` for efficient string-based block searching

