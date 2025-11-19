# StringCompareFilter$FilterMethod

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.compare.StringCompareFilter.FilterMethod`

**Type:** `Enum`

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.compare`

**Since:** JsMacros 1.6.5

The `StringCompareFilter$FilterMethod` enum defines the available string comparison methods that can be used with `StringCompareFilter` for performing various types of string matching operations. Each enum value represents a specific comparison strategy that determines how input strings are compared against target strings during filtering operations in the WorldScanner system.

## Overview

The `FilterMethod` enum provides a type-safe way to specify the comparison operation when creating `StringCompareFilter` instances. Instead of using raw strings that could be prone to typos, this enum ensures that only valid comparison methods are used. Each method corresponds to a specific Java string operation, providing predictable and well-defined behavior for string matching tasks.

The enum values are designed to cover the most common string comparison scenarios encountered in Minecraft modding and world scanning operations:

- **CONTAINS**: Substring searching for partial matches
- **EQUALS**: Exact string matching
- **STARTS_WITH**: Prefix matching for namespace or pattern filtering
- **ENDS_WITH**: Suffix matching for type or category filtering
- **MATCHES**: Regular expression pattern matching for complex criteria

## Enum Constants

### `CONTAINS`

**Purpose**: Checks if the input string contains the target substring.

**Underlying Method**: `String.contains()`

**Case Sensitivity**: Case-sensitive

**Performance**: Fast - O(n*m) where n is input length, m is pattern length

**Use Cases**:
- Finding blocks or items with specific keywords in their names
- Searching for entities with particular text in their type names
- Filtering for objects containing certain identifiers

**Example**:
```js
// Using the enum value (recommended)
const containsFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.CONTAINS, "diamond");

// Equivalent string usage
const containsFilterString = new StringCompareFilter("CONTAINS", "diamond");

// Test cases
containsFilter.apply("minecraft:diamond_ore");     // true
containsFilter.apply("minecraft:diamond_block");   // true
containsFilter.apply("minecraft:diamond_sword");   // true
containsFilter.apply("minecraft:emerald_ore");     // false
```

### `EQUALS`

**Purpose**: Checks if the input string exactly matches the target string.

**Underlying Method**: `String.equals()`

**Case Sensitivity**: Case-sensitive

**Performance**: Fastest - Direct string comparison

**Use Cases**:
- Finding specific block types with exact identifiers
- Matching exact item names
- Filtering for precise entity types

**Example**:
```js
// Using the enum value
const equalsFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.EQUALS, "minecraft:diamond_ore");

// Test cases
equalsFilter.apply("minecraft:diamond_ore");        // true
equalsFilter.apply("minecraft:diamond_block");      // false
equalsFilter.apply("diamond_ore");                  // false
equalsFilter.apply("MINECRAFT:DIAMOND_ORE");        // false (case-sensitive)
```

### `STARTS_WITH`

**Purpose**: Checks if the input string starts with the target prefix.

**Underlying Method**: `String.startsWith()`

**Case Sensitivity**: Case-sensitive

**Performance**: Fast - O(m) where m is prefix length

**Use Cases**:
- Filtering items from specific namespaces (e.g., "minecraft:")
- Finding objects with specific prefixes
- Namespace-based mod filtering

**Example**:
```js
// Using the enum value
const startsWithFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.STARTS_WITH, "minecraft:");

// Test cases
startsWithFilter.apply("minecraft:stone");          // true
startsWithFilter.apply("minecraft:diamond_ore");     // true
startsWithFilter.apply("botania:flower");            // false
startsWithFilter.apply("thermal:machine");           // false
```

### `ENDS_WITH`

**Purpose**: Checks if the input string ends with the target suffix.

**Underlying Method**: `String.endsWith()`

**Case Sensitivity**: Case-sensitive

**Performance**: Fast - O(m) where m is suffix length

**Use Cases**:
- Finding blocks of specific types (e.g., "_ore", "_log")
- Filtering items by category suffixes
- Type-based classification

**Example**:
```js
// Using the enum value
const endsWithFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.ENDS_WITH, "_ore");

// Test cases
endsWithFilter.apply("minecraft:diamond_ore");      // true
endsWithFilter.apply("minecraft:iron_ore");         // true
endsWithFilter.apply("minecraft:deepslate_iron_ore"); // true
endsWithFilter.apply("minecraft:oak_log");           // false
endsWithFilter.apply("minecraft:stone");             // false
```

### `MATCHES`

**Purpose**: Checks if the input string matches the given regular expression pattern.

**Underlying Method**: `String.matches()`

**Case Sensitivity**: Depends on regex pattern (can use flags for case-insensitivity)

**Performance**: Slowest - Full regex pattern matching

**Use Cases**:
- Complex pattern matching with wildcards
- Multi-condition filtering in a single pattern
- Advanced text matching with quantifiers and character classes

**Example**:
```js
// Using the enum value
const matchesFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, "minecraft:.*_ore");

// Test cases
matchesFilter.apply("minecraft:diamond_ore");       // true
matchesFilter.apply("minecraft:iron_ore");          // true
matchesFilter.apply("minecraft:gold_ore");          // true
matchesFilter.apply("minecraft:stone");             // false
matchesFilter.apply("botania:diamond_ore");         // false

// Complex regex examples
const vowelFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, "^[aeiou].*");
vowelFilter.apply("apple");                         // true
vowelFilter.apply("orange");                        // true
vowelFilter.apply("banana");                        // false

const digitFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, ".*\\d.*");
digitFilter.apply("item1");                         // true
digitFilter.apply("block2");                        // true
digitFilter.apply("tool");                          // false
```

## Usage Patterns

### Direct Enum Usage
```js
// Create filters using enum constants (recommended approach)
const oreFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.ENDS_WITH, "_ore");
const toolFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.CONTAINS, "pickaxe");
const vanillaFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.STARTS_WITH, "minecraft:");

// Use with WorldScanner
const scanner = World.getWorldScanner()
    .withFilter(oreFilter)
    .build();

const results = scanner.scanAroundPlayer(10);
```

### Enum Comparison and Validation
```js
// Validate operation strings against enum values
function createFilterFromString(operation, compareTo) {
    const validOperations = Object.values(StringCompareFilter.FilterMethod);

    if (validOperations.includes(operation)) {
        return new StringCompareFilter(operation, compareTo);
    } else {
        throw new Error(`Invalid operation: ${operation}. Valid operations: ${validOperations.join(', ')}`);
    }
}

// Convert string to enum if needed
function stringToFilterMethod(operationString) {
    const upperOperation = operationString.toUpperCase();

    switch (upperOperation) {
        case "CONTAINS":
            return StringCompareFilter.FilterMethod.CONTAINS;
        case "EQUALS":
            return StringCompareFilter.FilterMethod.EQUALS;
        case "STARTS_WITH":
            return StringCompareFilter.FilterMethod.STARTS_WITH;
        case "ENDS_WITH":
            return StringCompareFilter.FilterMethod.ENDS_WITH;
        case "MATCHES":
            return StringCompareFilter.FilterMethod.MATCHES;
        default:
            throw new Error(`Unknown filter method: ${operationString}`);
    }
}
```

### Dynamic Filter Creation
```js
// Create filters dynamically based on configuration
function createFiltersFromConfig(filterConfigs) {
    const filters = [];

    filterConfigs.forEach(config => {
        const method = stringToFilterMethod(config.operation);
        const filter = new StringCompareFilter(method, compareTo);
        filters.push(filter);
    });

    return filters;
}

// Example configuration
const filterConfigs = [
    { operation: "ENDS_WITH", compareTo: "_ore" },
    { operation: "STARTS_WITH", compareTo: "minecraft:" },
    { operation: "CONTAINS", compareTo: "chest" }
];

const dynamicFilters = createFiltersFromConfig(filterConfigs);
```

## Performance Characteristics

### Execution Speed (Fastest to Slowest)
1. **EQUALS** - Direct string equality comparison
2. **STARTS_WITH** - Prefix comparison, stops at first mismatch
3. **ENDS_WITH** - Suffix comparison, can be optimized
4. **CONTAINS** - Substring search, must scan entire string
5. **MATCHES** - Full regex pattern matching, most expensive

### Memory Usage
- **CONTAINS, STARTS_WITH, ENDS_WITH, EQUALS**: Minimal memory overhead
- **MATCHES**: Higher memory usage due to regex compilation and pattern matching

### Optimization Recommendations
```js
// Use the most specific method for your needs
const exactFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.EQUALS, "minecraft:diamond_ore");
// Instead of: new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, "^minecraft:diamond_ore$");

const prefixFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.STARTS_WITH, "minecraft:");
// Instead of: new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, "^minecraft:.*");

const suffixFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.ENDS_WITH, "_ore");
// Instead of: new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, ".*_ore$");
```

## Integration with Other Classes

### StringifyFilter Integration
```js
// FilterMethod is referenced by StringifyFilter for validation
const stringifyFilter = new StringifyFilter("CONTAINS"); // Uses StringCompareFilter.FilterMethod.CONTAINS internally

// You can also pass enum values directly to StringifyFilter if supported
// const stringifyFilter = new StringifyFilter(StringCompareFilter.FilterMethod.CONTAINS);
```

### WorldScanner Integration
```js
// Enum values are commonly used with WorldScanner builders
const scanner = World.getWorldScanner()
    .withStringBlockFilter()
    .contains("diamond")      // Internally uses FilterMethod.CONTAINS
    .endsWith("_ore")         // Internally uses FilterMethod.ENDS_WITH
    .build();

// Manual filter creation with enum
const manualFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.CONTAINS, "diamond");
const manualScanner = World.getWorldScanner()
    .withFilter(manualFilter)
    .build();
```

## Error Handling

### Invalid Method Values
```js
// The StringCompareFilter constructor will validate the method
try {
    const invalidFilter = new StringCompareFilter("INVALID_METHOD", "test");
} catch (e) {
    console.log("Expected error for invalid method:", e.message);
}

// Using enum values prevents this type of error
const validFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.CONTAINS, "test"); // Always valid
```

### Null Handling
```js
// Enum constants are never null, providing type safety
const method = StringCompareFilter.FilterMethod.CONTAINS; // Guaranteed to be valid

// String values could be null or invalid
const stringMethod = "CONTAINS"; // Could be null, misspelled, etc.
```

## Advanced Usage Examples

### Method Selection Based on Use Case
```js
function selectOptimalFilterMethod(pattern) {
    // Determine the best filter method based on the pattern
    if (pattern.startsWith('^') && pattern.endsWith('$')) {
        // Exact match pattern
        return StringCompareFilter.FilterMethod.EQUALS;
    } else if (pattern.startsWith('^')) {
        // Prefix pattern
        return StringCompareFilter.FilterMethod.STARTS_WITH;
    } else if (pattern.endsWith('$')) {
        // Suffix pattern
        return StringCompareFilter.FilterMethod.ENDS_WITH;
    } else if (pattern.includes('*') || pattern.includes('?') || pattern.includes('+')) {
        // Complex pattern with regex metacharacters
        return StringCompareFilter.FilterMethod.MATCHES;
    } else {
        // Simple substring
        return StringCompareFilter.FilterMethod.CONTAINS;
    }
}

// Usage
const method = selectOptimalFilterMethod("diamond");
const filter = new StringCompareFilter(method, "diamond");
```

### Enum-Based Configuration
```js
// Configuration using enum values for type safety
const FilterConfig = {
    ORE_DETECTION: {
        method: StringCompareFilter.FilterMethod.ENDS_WITH,
        patterns: ["_ore", "_deepslate_ore"]
    },
    NAMESPACE_FILTERING: {
        method: StringCompareFilter.FilterMethod.STARTS_WITH,
        patterns: ["minecraft:", "thermal:", "mekanism:"]
    },
    KEYWORD_SEARCH: {
        method: StringCompareFilter.FilterMethod.CONTAINS,
        patterns: ["diamond", "emerald", "netherite"]
    },
    PATTERN_MATCHING: {
        method: StringCompareFilter.FilterMethod.MATCHES,
        patterns: [".*_ore$", ".*diamond.*", "^[a-z]+:.*"]
    }
};

// Create filters from enum-based configuration
function createFilterFromConfig(config) {
    const filters = config.patterns.map(pattern =>
        new StringCompareFilter(config.method, pattern)
    );

    return filters.length === 1 ? filters[0] : filters[0].or(...filters.slice(1));
}

// Usage
const oreFilters = createFilterFromConfig(FilterConfig.ORE_DETECTION);
const namespaceFilters = createFilterFromConfig(FilterConfig.NAMESPACE_FILTERING);
```

## Best Practices

### 1. Use Enum Constants Over Strings
```js
// Good - Type-safe
const filter = new StringCompareFilter(StringCompareFilter.FilterMethod.CONTAINS, "diamond");

// Avoid - Prone to typos
const filter = new StringCompareFilter("CONTAINS", "diamond"); // Misspelled!
```

### 2. Choose the Most Specific Method
```js
// Good - Fast and specific
const exactFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.EQUALS, "minecraft:diamond_ore");

// Avoid - Slower and overkill for exact matches
const regexFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, "^minecraft:diamond_ore$");
```

### 3. Consider Performance for Large-Scale Filtering
```js
// For filtering thousands of blocks, prefer faster methods
const fastFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.ENDS_WITH, "_ore");

// Reserve regex for complex patterns that can't be expressed otherwise
const complexFilter = new StringCompareFilter(StringCompareFilter.FilterMethod.MATCHES, ".*(?:diamond|emerald|netherite).*");
```

### 4. Validate Input When Working with Strings
```js
function createValidatedFilter(methodString, compareTo) {
    try {
        const method = stringToFilterMethod(methodString);
        return new StringCompareFilter(method, compareTo);
    } catch (e) {
        console.error(`Invalid filter method: ${methodString}`, e);
        // Return a default filter or handle the error appropriately
        return new StringCompareFilter(StringCompareFilter.FilterMethod.CONTAINS, compareTo);
    }
}
```

## Related Classes

- [`StringCompareFilter`](StringCompareFilter.md) - Main filter class that uses this enum
- [`StringifyFilter`](StringifyFilter.md) - Another filter class that references these methods
- [`WorldScanner`](../../world-interaction/WorldScanner.md) - Uses string filters for world scanning
- [`WorldScannerBuilder`](../../world-interaction/WorldScannerBuilder.md) - Builder for creating scanners with filters

## Version History

- **1.6.5**: Initial introduction with five core comparison methods
- **Current**: Stable enum with consistent behavior across JSMacros versions
- Used extensively throughout the WorldScanner filtering system
- Maintains backward compatibility with string-based method specification

The `StringCompareFilter$FilterMethod` enum provides type-safe, performant, and well-documented string comparison methods that are essential for creating efficient and reliable world scanning filters in JSMacros.