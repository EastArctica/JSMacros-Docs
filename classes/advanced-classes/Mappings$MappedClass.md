# Mappings$MappedClass

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.classes.Mappings$MappedClass`

**Type:** Generic Class `<T>`

**Extends:** `WrappedClassInstance<T>`

**Since:** JSMacros 1.6.0

The `MappedClass` class is a powerful reflection wrapper that extends `WrappedClassInstance` with mapping-aware capabilities. It provides dynamic access to Java class instances and their members while automatically translating between human-readable names and obfuscated Minecraft internals using mapping data.

This class serves as a bridge between JSMacros scripts and Minecraft's internal APIs, enabling version-compatible scripting by automatically handling the translation between named method/field identifiers and their obfuscated counterparts.

## Overview

The `MappedClass` wrapper combines the reflection capabilities of `WrappedClassInstance` with mapping translation from the `Mappings` system. This enables:

- Automatic translation between named and obfuscated member names
- Version-compatible method invocation and field access
- Fallback to direct reflection when mappings are unavailable
- Seamless integration with existing reflection-based code
- Support for both instance and static member access

## Construction

MappedClass instances are typically created through the `Mappings` class rather than instantiated directly:

```js
// Load mappings
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

// Create MappedClass for an existing instance
const player = Player.getPlayer();
const mappedPlayer = mappings.remapClass(player.getRaw());

// Create MappedClass for a class (for static access)
const playerClass = mappings.getClass("net.minecraft.entity.player.PlayerEntity");
```

## Key Features

### Automatic Name Translation

MappedClass automatically translates method and field names between different formats:

- **Named Format:** Human-readable names (e.g., `getHealth`, `inventory`)
- **Intermediary Format:** Obfuscated names (e.g., `method_2289`, `field_7107`)
- **MCP Format:** Minecraft Coder Pack format (when available)

### Fallback Behavior

When mappings are unavailable or a specific mapping is not found, MappedClass automatically falls back to direct reflection:

```js
// This will work with or without mappings
// With mappings: translates to obfuscated name
// Without mappings: uses direct reflection
const health = mappedPlayer.getField("health");
```

### Type Safety and Conversion

MappedClass provides automatic type conversion and validation similar to WrappedClassInstance:

```js
// Automatic type casting for compatible types
const level = mappedPlayer.getFieldAsClass(Integer.class, "experienceLevel");

// Method signature support for overloaded methods
const sub1 = mappedPlayer.invokeMethod("substring(II)Ljava/lang/String;", 3, 8);
const sub2 = mappedPlayer.invokeMethod("substring", 3); // By name
```

## Usage Examples

### Basic Field Access

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const player = Player.getPlayer();
const mappedPlayer = mappings.remapClass(player.getRaw());

try {
    // Access fields using named versions (automatically translated)
    const health = mappedPlayer.getField("health");
    const hunger = mappedPlayer.getField("foodLevel");
    const experience = mappedPlayer.getField("experienceLevel");

    Chat.log(`Player Stats - Health: ${health}, Hunger: ${hunger}, Level: ${experience}`);

    // Modify fields
    mappedPlayer.setFieldValue("experienceLevel", experience + 1);
    Chat.log("Leveled up!");

} catch (error) {
    Chat.log(`Error accessing player fields: ${error.message}`);
}
```

### Method Invocation with Mappings

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const player = Player.getPlayer();
const mappedPlayer = mappings.remapClass(player.getRaw());

function interactWithWorld() {
    try {
        // Use named methods (automatically translated to obfuscated names)
        const world = mappedPlayer.invokeMethod("getWorld");
        const pos = mappedPlayer.invokeMethod("getBlockPos");
        const block = world.invokeMethod("getBlockState", pos);

        Chat.log(`Standing on: ${block.toString()}`);

        // Access inventory through named fields
        const inventory = mappedPlayer.getField("inventory");
        const selectedSlot = inventory.invokeMethod("getSelectedSlot");
        const stack = inventory.invokeMethod("getStack", selectedSlot);

        if (stack) {
            const itemName = stack.invokeMethod("getName");
            Chat.log(`Holding: ${itemName.getString()}`);
        }

    } catch (error) {
        Chat.log(`Error in world interaction: ${error.message}`);
    }
}
```

### Static Method Access

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

// Get MappedClass for a class to access static members
const itemClass = mappings.getClass("net.minecraft.item.Items");

try {
    // Access static fields using named versions
    const diamondItem = itemClass.getField("DIAMOND");
    const swordItem = itemClass.getField("DIAMOND_SWORD");

    Chat.log(`Diamond item: ${diamondItem}`);
    Chat.log(`Diamond sword: ${swordItem}`);

    // Create items through static methods (if available)
    // This would use translated method names
    // const newItem = itemClass.invokeMethod("createItem", someParameters);

} catch (error) {
    Chat.log(`Error accessing static Item methods: ${error.message}`);
}
```

### Advanced Reflection with Method Signatures

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const player = Player.getPlayer();
const mappedPlayer = mappings.remapClass(player.getRaw());

function advancedPlayerAnalysis() {
    try {
        // Use exact method signatures for overloaded methods
        const abilities = mappedPlayer.invokeMethod("getAbilities");

        // Access nested objects and their fields
        const allowFlight = abilities.getField("allowFlying");
        const flying = abilities.getField("flying");
        const walkSpeed = abilities.getField("walkSpeed");

        Chat.log(`Player Abilities:`);
        Chat.log(`  Can Fly: ${allowFlight}`);
        Chat.log(`  Is Flying: ${flying}`);
        Chat.log(`  Walk Speed: ${walkSpeed}`);

        // Modify abilities
        abilities.setFieldValue("allowFlying", true);
        Chat.log("Flight enabled!");

        // Use complex method signatures
        const lookDirection = mappedPlayer.invokeMethod("getRotationVector");
        const pitch = lookDirection.getField("x");
        const yaw = lookDirection.getField("y");

        Chat.log(`Looking direction - Pitch: ${pitch}, Yaw: ${yaw}`);

    } catch (error) {
        Chat.log(`Error in advanced analysis: ${error.message}`);
    }
}
```

### Version-Independent Scripting

```js
function createVersionIndependentHealthMonitor() {
    // Try to load mappings for different versions
    let mappings;
    const versions = [
        "mappings/minecraft-1.20.1.tiny",
        "mappings/minecraft-1.19.4.tiny",
        "mappings/minecraft-1.18.2.tiny"
    ];

    for (const version of versions) {
        try {
            mappings = Reflection.loadMappingHelper(version);
            Chat.log(`Loaded mappings for ${version}`);
            break;
        } catch (e) {
            // Continue to next version
        }
    }

    if (!mappings) {
        Chat.log("No mappings found, using direct reflection");
        mappings = Reflection.loadCurrentMappingHelper();
    }

    const player = Player.getPlayer();
    const mappedPlayer = mappings.remapClass(player.getRaw());

    // This code works regardless of which mappings are loaded
    function checkHealth() {
        try {
            const health = mappedPlayer.getField("health");
            const maxHealth = mappedPlayer.getField("maxHealth");
            const healthPercentage = (health / maxHealth) * 100;

            if (healthPercentage < 25) {
                Chat.actionbar("&cLow health warning!");
            } else if (healthPercentage < 50) {
                Chat.actionbar("&eMedium health");
            }

            return {
                current: health,
                maximum: maxHealth,
                percentage: Math.round(healthPercentage)
            };

        } catch (error) {
            Chat.log(`Health check failed: ${error.message}`);
            return null;
        }
    }

    // Monitor health every 2 seconds
    setInterval(checkHealth, 2000);

    return { checkHealth, mappedPlayer };
}

const healthMonitor = createVersionIndependentHealthMonitor();
```

### Error Handling and Fallbacks

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

function safeMappedAccess(object, memberName, isMethod = false, ...args) {
    try {
        const wrapped = mappings.remapClass(object);

        if (isMethod) {
            return wrapped.invokeMethod(memberName, ...args);
        } else {
            return wrapped.getField(memberName);
        }

    } catch (mappedError) {
        // Fallback to direct reflection without mappings
        try {
            const directWrapped = reflection.wrapInstace(object);

            if (isMethod) {
                return directWrapped.invokeMethod(memberName, ...args);
            } else {
                return directWrapped.getFieldValue(memberName);
            }

        } catch (directError) {
            Chat.log(`Failed to access ${memberName}:`);
            Chat.log(`  Mapped access: ${mappedError.message}`);
            Chat.log(`  Direct access: ${directError.message}`);
            return null;
        }
    }
}

// Usage example
const player = Player.getPlayer();
const health = safeMappedAccess(player.getRaw(), "health");
const world = safeMappedAccess(player.getRaw(), "getWorld", true);
```

## Comparison with WrappedClassInstance

| Feature | WrappedClassInstance | MappedClass |
|---------|-------------------|-------------|
| Basic Reflection | ✅ | ✅ |
| Method Signatures | ✅ | ✅ |
| Field Access | ✅ | ✅ |
| Name Translation | ❌ | ✅ |
| Version Compatibility | Limited | ✅ |
| Fallback Behavior | N/A | ✅ |
| Performance | Faster | Slightly Slower (due to mapping lookup) |

## Best Practices

1. **Use MappedClass when:**
   - Working with Minecraft internals
   - Creating version-compatible scripts
   - Accessing obfuscated Minecraft APIs
   - Building scripts that should work across Minecraft versions

2. **Use WrappedClassInstance when:**
   - Working with non-Minecraft Java classes
   - Maximum performance is critical
   - No mappings are needed or available

3. **Error Handling:**
   - Always wrap mapped operations in try-catch blocks
   - Be prepared for mapping failures
   - Consider fallback to direct reflection

4. **Performance Considerations:**
   - Cache MappedClass instances when possible
   - Mapping lookups have small overhead
   - Consider using method signatures for frequently called methods

## Related Classes

- [`Mappings`](Mappings.md) - Parent class that creates MappedClass instances
- [`WrappedClassInstance`](WrappedClassInstance.md) - Base class without mapping support
- [`Mappings$ClassData`](Mappings$ClassData.md) - Contains the mapping data used by MappedClass
- [`FReflection`](FReflection.md) - Main reflection library

## Version Information

- **Available Since:** JSMacros 1.6.0
- **Dependencies:** Requires mappings to be loaded for full functionality
- **Thread Safety:** Thread-safe for read operations
- **Performance:** Slightly slower than direct reflection due to mapping lookups

The MappedClass provides a powerful foundation for creating robust, version-compatible JSMacros scripts that can work with Minecraft's internal APIs across different game versions.