# BaseHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.helpers.BaseHelper`

**Type:** Abstract Base Class

**Since:** JsMacros 1.0.0

The `BaseHelper` class is a fundamental abstract base class that serves as the foundation for most helper classes in JSMacros. It provides a standardized wrapper interface around Minecraft's native objects, allowing consistent access to underlying game objects while maintaining proper object equality and behavior within the JavaScript environment.

## Overview

The `BaseHelper` class implements a wrapper pattern that encapsulates Minecraft's internal objects (like entities, blocks, items, text components, etc.) and provides a consistent API for JavaScript scripts. Almost all JSMacros helper classes extend `BaseHelper`, including:

- `EntityHelper` - Wraps Minecraft entities
- `BlockHelper` - Wraps Minecraft blocks
- `ItemHelper` - Wraps Minecraft items
- `TextHelper` - Wraps Minecraft text components
- `BlockPosHelper` - Wraps block positions
- And many more...

The generic type parameter `<T>` represents the type of the wrapped Minecraft object.

## Key Features

- **Object Wrapping**: Provides a consistent interface around Minecraft's native objects
- **Type Safety**: Generic typing ensures proper handling of wrapped objects
- **Standard Methods**: Implements `equals()`, `hashCode()`, and `getRaw()` for all helpers
- **Transparent Access**: Allows access to the underlying raw Minecraft object when needed
- **Consistent Behavior**: Ensures all helper classes behave consistently in comparisons and hashing

## Constructors

### `BaseHelper(T base)`
Protected constructor used by extending classes to initialize the helper with a base Minecraft object.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| base | T | The underlying Minecraft object to wrap |

**Note:** This constructor is protected and only used by subclasses that extend `BaseHelper`.

## Fields

### `base` (protected)
The underlying Minecraft object wrapped by this helper.

**Type:** `T`

**Access:** Protected (only accessible to subclasses)

**Note:** This field contains the raw Minecraft object that this helper wraps. Direct access is typically only needed by subclasses.

## Methods

### `getRaw()`
Returns the raw underlying Minecraft object wrapped by this helper.

**Returns:** `T` - The underlying Minecraft object

**Example:**
```javascript
// Get the raw Minecraft entity from an EntityHelper
const entityHelper = World.getEntities()[0];
const rawEntity = entityHelper.getRaw();
// rawEntity is now the native Minecraft Entity object
```

**Use Cases:**
- Advanced debugging and introspection
- Interfacing with other mods or APIs that expect raw Minecraft objects
- Accessing Minecraft-specific methods not exposed through the helper API

### `equals(obj)`
Compares this helper to another object for equality. Two `BaseHelper` instances are considered equal if they wrap the same underlying Minecraft object.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| obj | Object | The object to compare against |

**Returns:** `boolean` - `true` if the objects are equal, `false` otherwise

**Behavior:**
- If comparing with another `BaseHelper`, compares the underlying wrapped objects
- If comparing with a raw object, compares with this helper's wrapped object
- Maintains proper equality semantics regardless of wrapper type

**Example:**
```javascript
const entity1 = World.getEntities()[0];
const entity2 = World.getEntities()[0];

// These should be equal as they reference the same entity
if (entity1.equals(entity2)) {
    Chat.log("Both helpers reference the same entity");
}

// Also works with raw objects
const rawEntity = entity1.getRaw();
if (entity1.equals(rawEntity)) {
    Chat.log("Helper equals its raw object");
}
```

### `hashCode()`
Returns the hash code of the underlying Minecraft object, ensuring consistent hashing behavior between helper instances and raw objects.

**Returns:** `int` - Hash code value

**Behavior:**
- Delegates to the wrapped object's `hashCode()` method
- Ensures helper instances and raw objects have identical hash codes
- Maintains proper behavior in hash-based collections (Maps, Sets, etc.)

**Example:**
```javascript
const entityHelper = World.getEntities()[0];
const rawEntity = entityHelper.getRaw();

// These hash codes should be identical
const helperHash = entityHelper.hashCode();
const rawHash = rawEntity.hashCode();

Chat.log(`Helper hash: ${helperHash}, Raw hash: ${rawHash}`);
```

## Usage Patterns

### Basic Helper Usage
Most JSMacros scripts will interact with helper classes without directly calling `BaseHelper` methods:

```javascript
// Getting and using helpers (BaseHelper methods are used implicitly)
const player = Player.getPlayer();
const block = World.getBlock(0, 64, 0);
const item = player.getMainHand();

// Equality comparisons use BaseHelper.equals() automatically
if (item.equals(block.asItem())) {
    Chat.log("Holding the same item as the block");
}
```

### Advanced Raw Object Access
Sometimes you need access to the raw Minecraft object for advanced operations:

```javascript
const textHelper = Chat.createTextHelperFromString("Hello World");
const rawText = textHelper.getRaw();

// Now you can use Minecraft-specific Text methods
// (requires knowledge of Minecraft's internal API)
```

### Collection Operations
BaseHelper's proper `equals()` and `hashCode()` implementations enable reliable use in collections:

```javascript
const entitySet = new Set();
const entities = World.getEntities();

// Add helpers to a set (duplicates automatically filtered)
for (const entity of entities) {
    entitySet.add(entity);
}

Chat.log(`Unique entities: ${entitySet.size}`);

// Check for specific entities
const player = Player.getPlayer();
if (entitySet.has(player)) {
    Chat.log("Player found in entity set");
}
```

## Implementation Guidelines

### For Script Writers
- **Standard Usage**: Most scripts don't need to call `BaseHelper` methods directly
- **Equality Testing**: Use `equals()` for comparing helper objects
- **Collections**: Helper objects work reliably in Sets, Maps, and other collections
- **Raw Access**: Only use `getRaw()` when you specifically need raw Minecraft objects

### For Mod Developers
- **Extending BaseHelper**: All new helper classes should extend `BaseHelper<T>`
- **Constructor**: Call `super(baseObject)` in your constructor
- **Type Safety**: Use the generic type parameter to specify wrapped object type
- **Method Delegation**: Helper methods should typically delegate to the wrapped object

## Example Extensions

Here's how `BaseHelper` is typically extended in actual JSMacros classes:

```javascript
// Conceptual example - not actual code
class MyCustomHelper extends BaseHelper<SomeMinecraftObject> {
    constructor(minecraftObject) {
        super(minecraftObject); // Required constructor call
    }

    // Custom methods that delegate to the wrapped object
    getName() {
        return this.base.getName();
    }

    // Custom behavior
    isSpecial() {
        return this.base.someProperty === "special";
    }
}
```

## Performance Considerations

- **Memory Overhead**: Helper wrappers add minimal memory overhead to raw objects
- **Method Calls**: `getRaw()` involves no computation - it's a simple field access
- **Equality**: `equals()` and `hashCode()` delegate to wrapped object implementations
- **Caching**: Helper instances can be safely cached due to proper equality semantics

## Common Pitfalls

### Comparing Helper and Raw Objects
Don't use `==` to compare helpers and raw objects:

```javascript
const helper = someObject.getHelper();
const raw = helper.getRaw();

// WRONG - this will always be false
if (helper == raw) { ... }

// CORRECT - uses BaseHelper.equals()
if (helper.equals(raw)) { ... }
```

### Assuming Helper Identity
Different helper instances wrapping the same object are equal:

```javascript
const helper1 = new SomeHelper(someObject);
const helper2 = new SomeHelper(someObject);

// These are different instances but equal in value
helper1 !== helper2; // true (different objects)
helper1.equals(helper2); // true (same wrapped object)
```

## Related Classes

Almost all JSMacros helper classes extend `BaseHelper`:

### World Helpers
- `EntityHelper<T>` - Base for all entity helpers
- `BlockHelper` - Wraps Minecraft Block objects
- `BlockPosHelper` - Wraps block positions
- `BlockDataHelper` - Wraps block data

### Item Helpers
- `ItemHelper` - Wraps Minecraft Item objects
- `ItemStackHelper` - Wraps item stacks
- `EnchantmentHelper` - Wraps enchantment data

### UI Helpers
- `TextHelper` - Wraps text components
- `ClickableWidgetHelper` - Wraps UI elements

### Other Helpers
- `PlayerAbilitiesHelper` - Wraps player abilities
- `ScoreboardsHelper` - Wraps scoreboard data
- `AdvancementHelper` - Wraps advancement data

## Technical Notes

### Generic Type Safety
The `<T>` generic parameter ensures type safety at compile time and helps IDEs provide proper autocomplete and error checking:

```javascript
// Type-safe wrapper around Entity
BaseHelper<Entity> entityHelper;

// Type-safe wrapper around Block
BaseHelper<Block> blockHelper;
```

### Abstract Nature
`BaseHelper` is abstract and cannot be instantiated directly:

```javascript
// This will cause an error
const helper = new BaseHelper(someObject); // ERROR: Abstract class

// Use concrete helper classes instead
const entityHelper = new EntityHelper(someEntity); // CORRECT
```

### Method Overriding
Subclasses typically override `toString()` to provide meaningful string representations:

```javascript
// Most helper classes implement toString()
const entity = World.getEntities()[0];
Chat.log(entity.toString()); // Human-readable entity information
```

## Version History

- **1.0.0:** Initial implementation as foundation for helper system
- **1.2.0:** Enhanced equality handling for cross-type comparisons
- **1.6.5:** Improved type safety and documentation
- **Current:** Stable foundation for JSMacros helper ecosystem

## Best Practices

1. **Use `equals()` for Comparisons**: Always use the `equals()` method when comparing helper objects
2. **Raw Access Only When Needed**: Use `getRaw()` only when you specifically need raw Minecraft objects
3. **Trust Collection Behavior**: Helper objects work reliably in hash-based collections
4. **Type Awareness**: Understand what type each helper wraps when using `getRaw()`
5. **Memory Management**: Helper objects don't need special cleanup - they're garbage collected normally

The `BaseHelper` class is a cornerstone of the JSMacros architecture, providing a consistent and reliable foundation for the entire helper class ecosystem. While most scripts won't call its methods directly, understanding its role helps in writing more effective and robust JSMacros scripts.