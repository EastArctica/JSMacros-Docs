# ClassWrapperFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.ClassWrapperFilter<T>`

**Extends:** [`BasicFilter<T>`](BasicFilter.md)

**Implements:** `IAdvancedFilter<T>`

**Since:** JsMacros 1.6.5

The `ClassWrapperFilter` is an abstract base class that provides a powerful reflection-based filtering mechanism for the WorldScanner system. It acts as a generic wrapper that can invoke methods on objects and filter the results using appropriate comparison filters. This class enables dynamic filtering based on object method calls, making it extremely versatile for creating custom filtering criteria.

While `ClassWrapperFilter` itself is abstract and cannot be instantiated directly, it serves as the foundation for concrete filter implementations like `BlockFilter` and `BlockStateFilter`. The class uses Java reflection to dynamically invoke methods on objects and applies appropriate filters to the returned values.

## Overview

The ClassWrapperFilter provides:

- **Reflection-based method invocation**: Calls methods on objects dynamically at runtime
- **Automatic filter selection**: Chooses appropriate comparison filters based on return type
- **Type safety**: Maintains generic type safety throughout the filtering process
- **Multi-type support**: Handles boolean, string, character, and numeric return types
- **Error handling**: Gracefully handles reflection exceptions during method invocation

## Table of Contents

- [Supported Return Types](#supported-return-types)
- [Protected Fields](#protected-fields)
- [Constructors](#constructors)
- [Static Methods](#static-methods)
- [Instance Methods](#instance-methods)
- [Implementation Examples](#implementation-examples)
- [Usage with WorldScanner](#usage-with-worldscanner)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)
- [Related Classes](#related-classes)

## Supported Return Types

ClassWrapperFilter automatically creates appropriate comparison filters based on the method return type:

### Boolean Types
- `boolean` and `Boolean` → Creates `BooleanCompareFilter`
- **Usage**: Filter for `true` or `false` values

### String Type
- `String` → Creates `StringCompareFilter`
- **Usage**: Filter with comparison method and target string

### Character Types
- `char` and `Character` → Creates `CharCompareFilter`
- **Usage**: Filter for specific character values

### Numeric Types
- `int`, `Integer`, `float`, `Float`, `double`, `Double`, `short`, `Short`, `long`, `Long`, `byte`, `Byte`
- **Usage**: Filter with comparison operator and target value

## Protected Fields

## Constructors

### `protected ClassWrapperFilter(methodName, methods, methodArgs, filterArgs)`

Creates a new ClassWrapperFilter with the specified method and filter parameters. This constructor is protected and intended for use by concrete subclasses.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `methodName` | `String` | The name of the method to invoke on objects |
| `methods` | `Map<String, Method>` | Map of available methods for lookup |
| `methodArgs` | `Object[]` | Arguments to pass when invoking the method |
| `filterArgs` | `Object[]` | Arguments for creating the comparison filter |

**Since:** `1.6.5`

**Note:** This constructor is protected and should only be used by concrete implementations.

## Static Methods

## Instance Methods

## Implementation Examples

### Example 1: BlockFilter Implementation

```javascript
// This is how BlockFilter extends ClassWrapperFilter
public class BlockFilter extends ClassWrapperFilter<BlockHelper> {
    private static final Map<String, Method> METHOD_LOOKUP =
        getPublicNoParameterMethods(BlockHelper.class);

    public BlockFilter(String methodName, Object[] methodArgs, Object[] filterArgs) {
        super(methodName, METHOD_LOOKUP, methodArgs, filterArgs);
    }
}
```

### Example 2: Custom Entity Filter

```javascript
// Create a custom filter for entity properties
class EntityHealthFilter extends ClassWrapperFilter<EntityHelper> {
    private static final Map<String, Method> METHODS =
        getPublicNoParameterMethods(EntityHelper.class);

    public EntityHealthFilter(Object[] filterArgs) {
        super("getHealth", METHODS, new Object[0], filterArgs);
    }
}

// Usage: Find entities with specific health values
const healthFilter = new EntityHealthFilter([">", 10.0]);
const healthyEntities = scanner.scanEntities(healthFilter);
```

## Usage with WorldScanner

### Example 1: Basic Method Filtering

```javascript
// Create a filter based on BlockHelper methods
const scanner = World.getWorldScanner();

// Filter blocks by hardness value
const hardBlocksFilter = scanner
    .withBlockFilter("getHardness")
    .is(">", 5.0)
    .build();

const hardBlocks = hardBlocksFilter.scanAroundPlayer(3);
Chat.log(`Found ${hardBlocks.length} hard blocks`);
```

### Example 2: String-based Method Filtering

```javascript
// Filter blocks by name properties
const woodFilter = scanner
    .withBlockFilter("getName")
    .contains("oak")
    .build();

const oakBlocks = woodFilter.scanAroundPlayer(2);
```

### Example 3: Boolean Method Filtering

```javascript
// Filter blocks by boolean properties
const solidFilter = scanner
    .withBlockFilter("isAir")
    .is(false)
    .build();

const solidBlocks = solidFilter.scanAroundPlayer(1);
```

### Example 4: Combining Method Filters

```javascript
// Create complex filters combining multiple method calls
const valuableBlocks = scanner
    .withBlockFilter("getName").contains("diamond")
    .andBlockFilter("getHardness").is(">", 3.0)
    .build();

const valuable = valuableBlocks.scanCubeArea(player.getPos(), 20);
```

### Example 5: Custom Reflection-based Filtering

```javascript
// Create a filter using reflection directly
const methodMap = ClassWrapperFilter.getPublicNoParameterMethods(BlockHelper.class);

// Filter blocks by their light level
const lightFilter = new CustomBlockFilter(
    "getLuminance",
    methodMap,
    [],
    [">", 7]
);

const brightBlocks = lightFilter.scanAroundPlayer(2);
```

## Error Handling

ClassWrapperFilter provides robust error handling for reflection operations:

### Method Invocation Errors
- **IllegalAccessException**: Caught and logged, filter returns `false`
- **InvocationTargetException**: Caught and logged, filter returns `false`
- **NullPointerException**: Caught and logged, filter returns `false`

### Type Support Limitations
```javascript
// This will throw an exception
try {
    const objectFilter = ClassWrapperFilter.getFilter(
        SomeClass.class,
        "getObjectMethod",
        someObject
    );
} catch (e) {
    Chat.log("Error: " + e.getMessage());
    // "Methods that return objects besides String are currently not supported"
}
```

### Missing Methods
```javascript
// This will fail if the method doesn't exist
const methods = ClassWrapperFilter.getPublicNoParameterMethods(BlockHelper.class);
if (!methods.containsKey("nonExistentMethod")) {
    Chat.log("Method not found!");
}
```

## Performance Considerations

### Reflection Overhead
- **Method lookup**: Performed once during construction, minimal runtime impact
- **Method invocation**: Has some overhead compared to direct method calls
- **Exception handling**: Try-catch blocks add minimal overhead

### Optimization Tips
```javascript
// GOOD: Reuse filter instances
const blockFilter = new BlockFilter("getHardness", [], [">", 5.0]);

// Use the same filter multiple times
const results1 = blockFilter.scanArea(area1);
const results2 = blockFilter.scanArea(area2);

// AVOID: Creating new filters repeatedly
for (let i = 0; i < 100; i++) {
    const filter = new BlockFilter("getHardness", [], [">", 5.0]); // Inefficient
    const results = filter.scanArea(area);
}
```

### Method Selection
```javascript
// GOOD: Use simple, fast methods
const simpleFilter = new BlockFilter("isAir", [], [false]);

// AVOID: Complex methods with side effects
const complexFilter = new BlockFilter("getDroppedItemStacks", [], [/* complex comparison */]);
```

## Important Notes

### Abstract Nature
- ClassWrapperFilter is abstract and cannot be instantiated directly
- Use concrete implementations like `BlockFilter` or create custom subclasses
- The class is designed to be extended, not used directly

### Method Requirements
- Methods must be public and have no parameters (or match the provided methodArgs)
- Methods must return supported types (boolean, String, char, numeric types)
- Object return types (other than String) are not supported

### Thread Safety
- Filter instances are thread-safe after construction
- Method invocation is thread-safe as long as the underlying methods are thread-safe
- The `getPublicNoParameterMethods()` method is thread-safe

### Type Safety
- Generic type `T` ensures type safety for filtered objects
- Filter types are automatically selected based on method return types
- Type mismatches will cause runtime exceptions

## Related Classes

- **BasicFilter** - Abstract base class providing logical filter operations
- **BlockFilter** - Concrete implementation for BlockHelper objects
- **BlockStateFilter** - Concrete implementation for BlockStateHelper objects
- **BooleanCompareFilter** - Filter for boolean comparisons
- **StringCompareFilter** - Filter for string comparisons
- **NumberCompareFilter** - Filter for numeric comparisons
- **CharCompareFilter** - Filter for character comparisons
- **IFilter** - Base interface for all filter classes
- **IAdvancedFilter** - Interface extending IFilter with logical operations
- **WorldScanner** - Main class for world scanning operations
- **WorldScannerBuilder** - Builder class for creating complex scanners

## Version History

- **1.6.5**: Initial release with basic ClassWrapperFilter functionality
- **Current**: Enhanced with comprehensive method support and error handling

## Implementation Best Practices

### Creating Custom Filters
```javascript
// Example: Custom filter for ItemHelper objects
class ItemFilter extends ClassWrapperFilter<ItemHelper> {
    private static final Map<String, Method> METHODS =
        getPublicNoParameterMethods(ItemHelper.class);

    public ItemFilter(String methodName, Object[] methodArgs, Object[] filterArgs) {
        super(methodName, METHODS, methodArgs, filterArgs);
    }
}

// Usage
const itemFilter = new ItemFilter("getCount", [">", 1]);
```

### Method Discovery
```javascript
// Discover available methods on a class
const methods = ClassWrapperFilter.getPublicNoParameterMethods(BlockHelper.class);
Chat.log("Available methods: " + Object.keys(methods).join(", "));
```

### Filter Composition
```javascript
// Combine ClassWrapperFilter with other filters
const baseFilter = new BlockFilter("getName", [], ["contains", "ore"]);
const deepFilter = scanner.withStateFilter("getY").is("<", 16).build();

// Combine with logical operations
const finalFilter = baseFilter.and(deepFilter);
```