# BaseHelper

The foundational base class for all JsMacros helper classes. This class provides the core functionality that all specific helper classes (like EntityHelper, ItemStackHelper, etc.) inherit from. It wraps raw Minecraft objects and provides consistent behavior across all helper implementations.

**Class:** `BaseHelper<T>`
**Package:** `xyz.wagyourtail.jsmacros.core.helpers`
**Since:** 1.0.0

## Overview

BaseHelper is an abstract class that serves as the foundation for all JsMacros helper classes. It provides a standardized way to wrap raw Minecraft objects with additional functionality while maintaining access to the underlying object.

All specific helper classes (EntityHelper, ItemStackHelper, BlockHelper, etc.) extend BaseHelper, inheriting its core functionality and adding their own specialized methods.

## Methods

### BaseHelper.getBase()

Returns the raw underlying Minecraft object that this helper wraps.

```js
// Example: Get raw Minecraft entity from EntityHelper
const entity = event.entity;
const rawEntity = entity.getRaw(); // Returns the raw Minecraft Entity object

// You can use the raw object for advanced Minecraft-specific operations
const entityName = rawEntity.getName().getString();
```

**Return Type:** `T` - The raw Minecraft object type
**Returns:** The underlying raw Minecraft object
**Usage Notes:** Use this when you need access to raw Minecraft functionality not exposed through helper methods

### BaseHelper.equals(obj)

Compares this helper with another object for equality. Two helpers are considered equal if their underlying raw objects are equal.

```js
// Compare two entity helpers
const entity1 = event.entity;
const entity2 = World.getEntity(uuid);

if (entity1.equals(entity2)) {
    Chat.log("These are the same entity!");
}

// You can also compare with raw objects
const rawEntity = entity1.getRaw();
if (entity1.equals(rawEntity)) {
    Chat.log("Helper equals its raw object");
}
```

**Parameters:**
- `obj` (`Object`): The object to compare with

**Return Type:** `boolean`
**Returns:** `true` if the objects are equal, `false` otherwise

### BaseHelper.hashCode()

Returns the hash code of the underlying raw object.

```js
// Use hash code for collections or maps
const entity = event.entity;
const entityMap = new Map();
entityMap.set(entity.hashCode(), entity);
```

**Return Type:** `int`
**Returns:** Hash code based on the underlying raw object

## Usage Patterns

### Creating Custom Helpers

BaseHelper can be extended to create custom helper classes:

```js
// Example concept for creating a custom helper (JavaScript equivalent)
class MyCustomHelper extends BaseHelper {
    constructor(rawObject) {
        super(rawObject);
    }

    // Add custom methods
    getCustomProperty() {
        return this.getRaw().someProperty;
    }

    // Override methods if needed
    toString() {
        return `MyCustomHelper{${this.getRaw()}}`;
    }
}
```

### Type Safety and Casting

BaseHelper provides type safety through generic typing:

```js
// EntityHelper<Entity> extends BaseHelper<Entity>
// ItemStackHelper<ItemStack> extends BaseHelper<ItemStack>
// BlockHelper<Block> extends BaseHelper<Block>

// Each helper maintains its specific type
const entityHelper = event.entity; // BaseHelper<Entity>
const itemHelper = Player.getInventory().getStack(0); // BaseHelper<ItemStack>
```

### Raw Object Access

When helper methods don't provide the functionality you need, access the raw object:

```js
const entity = event.entity;
const rawEntity = entity.getRaw();

// Access raw Minecraft methods not exposed in helpers
const vehicle = rawEntity.getVehicle();
const passengers = rawEntity.getPassengersDeep();
```

## Best Practices

1. **Prefer Helper Methods**: Use helper methods when available as they provide better abstraction and cross-version compatibility
2. **Raw Object Access**: Only access raw objects when helper methods don't provide needed functionality
3. **Type Safety**: Be aware of the specific type T when working with raw objects
4. **Equality Checks**: Use helper `equals()` method rather than direct raw object comparison

## Inheritance Hierarchy

```
BaseHelper<T>
├── EntityHelper<Entity>
│   ├── LivingEntityHelper<LivingEntity>
│   │   ├── PlayerEntityHelper<PlayerEntity>
│   │   └── MobEntityHelper<MobEntity>
│   └── ItemEntityHelper<ItemEntity>
├── ItemStackHelper<ItemStack>
├── BlockHelper<Block>
├── BlockPosHelper<BlockPos>
└── (all other helper classes)
```

## Related Classes

- **[EntityHelper](helpers/entity-helper.md)** - Base class for all entity helpers
- **[ItemStackHelper](helpers/item-stack-helper.md)** - Item stack helper class
- **[BlockHelper](helpers/block-helper.md)** - Block helper class
- **[PlayerEntityHelper](helpers/player-entity-helper.md)** - Player-specific entity helper

## Implementation Notes

- BaseHelper is abstract and cannot be instantiated directly
- All concrete helper classes must extend BaseHelper
- The generic type T represents the raw Minecraft object being wrapped
- Helper classes should expose raw object functionality through their own methods rather than requiring raw access