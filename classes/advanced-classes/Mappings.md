# Mappings

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.classes.Mappings`

**Since:** `1.3.1`

The `Mappings` class is an advanced utility in JSMacros that provides comprehensive support for handling Minecraft obfuscation mappings and reflection operations. It enables scripts to work with both named and obfuscated (intermediary) class, method, and field names, making it possible to create scripts that work across different Minecraft versions and modding environments.

This class is particularly useful for:
- Working with Minecraft internals that are obfuscated
- Creating version-compatible scripts
- Advanced reflection operations with mapping support
- Accessing private/internal Minecraft APIs
- Development of complex modding utilities

**Key Features:**
- Load mappings from Tiny mapping files or Fabric Yarn JARs
- Bidirectional mapping between named and intermediary representations
- Automatic field and method name resolution
- Support for both local files and remote URLs
- Cached mapping loading for performance
- Integration with JSMacros reflection system

## Overview

The `Mappings` system works by maintaining two mapping directions:
- **Forward Mappings:** Intermediary (obfuscated) → Named (deobfuscated)
- **Reverse Mappings:** Named (deobfuscated) → Intermediary (obfuscated)

This allows scripts to use human-readable names while still being able to interact with the actual obfuscated Minecraft code at runtime.

## Accessing Mappings

You typically create `Mappings` instances through the Reflection library:

```javascript
// Load mappings from a local file
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

// Load mappings from a remote URL
const mappings = Reflection.loadMappingHelper("https://maven.fabricmc.net/net/fabricmc/yarn/1.20.1%2Bbuild.10/yarn-1.20.1%2Bbuild.10-v2.jar");

// Get the current loaded mappings helper
const currentMappings = Reflection.loadCurrentMappingHelper();
```

## Constructors

### `new Mappings(mappingsource)`

Creates a new Mappings instance with the specified mapping source.

**Parameters:**
- `mappingsource` (`String`): Path or URL to the mapping file (`.tiny`) or Yarn mappings JAR

**Example:**
```javascript
// Local file path (relative to macro folder)
const localMappings = new Mappings("mappings/minecraft-1.20.1.tiny");

// Remote URL
const remoteMappings = new Mappings("https://example.com/mappings.jar");
```

## Methods

### `getMappings()`

Retrieves the forward mappings (Intermediary → Named).

**Returns:** `Map<String, ClassData>` - Map of intermediary class names to ClassData objects

**Throws:** `IOException` - If the mapping source is malformed or cannot be accessed

**Example:**
```javascript
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const forwardMappings = mappings.getMappings();

// Access a specific class's mappings
const playerClass = forwardMappings.get("net/minecraft/class_1657");
if (playerClass) {
    Chat.log("Found player class mapping: " + playerClass.name);
}
```

### `getReversedMappings()`

Retrieves the reverse mappings (Named → Intermediary).

**Returns:** `Map<String, ClassData>` - Map of named class names to ClassData objects

**Throws:** `IOException` - If the mapping source is malformed or cannot be accessed

**Example:**
```javascript
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const reversedMappings = mappings.getReversedMappings();

// Get the intermediary name for a class
const playerClass = reversedMappings.get("net.minecraft.entity.player.PlayerEntity");
if (playerClass) {
    Chat.log("Player entity intermediary name: " + playerClass.name);
}
```

### `remapClass(instance)`

Creates a MappedClass wrapper for an object instance that uses mappings for reflection operations.

**Parameters:**
- `instance` (`T`): The object instance to wrap with mapping support

**Returns:** [`MappedClass<T>`](Mappings$MappedClass.md) - A wrapped class instance with mapping-aware reflection

**Throws:** `IOException` - If mappings cannot be loaded

**Example:**
```javascript
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const player = Player.getPlayer();

// Create a mapping-aware wrapper for the player
const mappedPlayer = mappings.remapClass(player.getRaw());

// Now you can access fields/methods using named versions
// The wrapper will automatically translate to obfuscated names
```

### `getClass(className)`

Gets a MappedClass for a class name without requiring an instance (for accessing static members).

**Parameters:**
- `className` (`String`): The class name (can be either named or intermediary format)

**Returns:** [`MappedClass<?>`](Mappings$MappedClass.md) - A wrapped class with mapping-aware reflection

**Throws:**
- `IOException` - If mappings cannot be loaded
- `ClassNotFoundException` - If the class cannot be found

**Example:**
```javascript
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

// Get class using named format
const playerClass = mappings.getClass("net.minecraft.entity.player.PlayerEntity");

// Get class using intermediary format
const playerClassIntermediary = mappings.getClass("net/minecraft/class_1657");

// Access static methods/fields through the mapped class
```

---

# Advanced Usage Examples

## Example 1: Version-Independent Script

```javascript
function createVersionIndependentTool() {
    // Load mappings that work across different Minecraft versions
    const mappings = Reflection.loadMappingHelper("mappings/current.tiny");
    const player = Player.getPlayer();
    const mappedPlayer = mappings.remapClass(player.getRaw());

    try {
        // Use named method that should work across versions
        // The mappings will translate to the correct obfuscated method name
        const inventory = mappedPlayer.invokeMethod("getInventory");
        const selectedSlot = inventory.invokeMethod("getSelectedSlot");

        Chat.log("Selected hotbar slot: " + selectedSlot);

        // Access fields using named versions
        const hotbarSize = inventory.getField("hotbarSize");
        Chat.log("Hotbar size: " + hotbarSize);

    } catch (e) {
        Chat.log("Error in version-independent tool: " + e.message);
    }
}
```

## Example 2: Mapping Analysis Utility

```javascript
function analyzeMappingsForClass(className) {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

    try {
        const forwardMappings = mappings.getMappings();
        const reverseMappings = mappings.getReversedMappings();

        Chat.log("=== Analysis for: " + className + " ===");

        // Check forward mappings
        const forwardData = forwardMappings.get(className.replace(".", "/"));
        if (forwardData) {
            Chat.log("Forward mapping found:");
            Chat.log("  Named class: " + forwardData.name);
            Chat.log("  Methods: " + forwardData.methods.size());
            Chat.log("  Fields: " + forwardData.fields.size());
        }

        // Check reverse mappings
        const reverseData = reverseMappings.get(className);
        if (reverseData) {
            Chat.log("Reverse mapping found:");
            Chat.log("  Intermediary class: " + reverseData.name);
            Chat.log("  Methods: " + reverseData.methods.size());
            Chat.log("  Fields: " + reverseData.fields.size());
        }

        // List some methods if available
        if (forwardData) {
            Chat.log("\nMethods:");
            let count = 0;
            for (const [sig, method] of forwardData.methods) {
                if (count < 10) { // Limit output
                    Chat.log("  " + method.name + method.sig.get());
                    count++;
                }
            }
            if (forwardData.methods.size() > 10) {
                Chat.log("  ... and " + (forwardData.methods.size() - 10) + " more");
            }
        }

    } catch (e) {
        Chat.log("Error analyzing mappings: " + e.message);
    }
}

// Example usage:
analyzeMappingsForClass("net.minecraft.entity.player.PlayerEntity");
```

## Example 3: Dynamic API Access

```javascript
function createDynamicAPIAccessor() {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

    try {
        // Access the Minecraft client dynamically
        const minecraftClass = mappings.getClass("net.minecraft.client.MinecraftClient");
        const minecraftInstance = minecraftClass.getField("instance");

        Chat.log("Minecraft client: " + minecraftInstance);

        // Access player through the client
        const player = minecraftInstance.invokeMethod("getPlayer");
        if (player) {
            const mappedPlayer = mappings.remapClass(player);

            // Now we can use named field access
            const age = mappedPlayer.getField("age");
            const uuid = mappedPlayer.invokeMethod("getUuidAsString");

            Chat.log("Player age: " + age);
            Chat.log("Player UUID: " + uuid);
        }

    } catch (e) {
        Chat.log("Error in dynamic API access: " + e.message);
    }
}
```

## Example 4: Mapped Class Comparison

```javascript
function compareWithAndWithoutMappings() {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const player = Player.getPlayer();

    try {
        Chat.log("=== Comparison: With vs Without Mappings ===");

        // Without mappings (direct reflection)
        const rawPlayer = player.getRaw();
        Chat.log("Raw player class: " + rawPlayer.getClass().getName());

        // With mappings
        const mappedPlayer = mappings.remapClass(rawPlayer);

        // Try to access a field - this might fail without mappings
        try {
            // This would likely fail without proper field name
            const directHealth = rawPlayer.getClass().getField("health").get(rawPlayer);
            Chat.log("Direct health access: " + directHealth);
        } catch (e) {
            Chat.log("Direct access failed: " + e.message);
        }

        // With mappings, this should work
        try {
            const mappedHealth = mappedPlayer.getField("health");
            Chat.log("Mapped health access: " + mappedHealth);
        } catch (e) {
            Chat.log("Mapped access failed: " + e.message);
        }

    } catch (e) {
        Chat.log("Error in comparison: " + e.message);
    }
}
```

## Important Notes

1. **Mapping Sources:** Mappings can be loaded from:
   - Local `.tiny` files (Tiny v2 format)
   - Remote URLs (HTTP/HTTPS)
   - Fabric Yarn JAR files (containing `mappings/mappings.tiny`)

2. **Performance:** Mappings are cached after first load, so subsequent calls to `loadMappingHelper()` with the same source will return the cached instance.

3. **Error Handling:** Always wrap mapping operations in try-catch blocks, as they can throw `IOException`, `ClassNotFoundException`, `NoSuchFieldException`, and `NoSuchMethodException`.

4. **Version Compatibility:** Mappings are version-specific. Always ensure you're using mappings that match your Minecraft version.

5. **Security:** Be cautious when loading mappings from remote URLs. Only use trusted sources.

6. **Memory Usage:** Loading large mapping files can consume significant memory. The system caches mappings to improve performance but be mindful of memory constraints.

7. **Fallback Behavior:** The `MappedClass` system includes fallback mechanisms - if mappings are unavailable or a specific mapping is not found, it will attempt direct reflection.

8. **Thread Safety:** Mappings instances are thread-safe for read operations after initial loading.

## Related Classes

- `FReflection` - Main reflection library that provides mapping loading
- [`WrappedClassInstance`](WrappedClassInstance.md) - Base class for MappedClass
- [`Mappings$MappedClass`](Mappings$MappedClass.md) - Mapping-aware class wrapper
- [`Mappings$ClassData`](Mappings$ClassData.md) - Contains mapping data for classes
- `ClassBuilder` - For creating new classes with reflection
- `LibraryBuilder` - For creating libraries with reflection

## Version Information

- Mappings system introduced in JSMacros 1.3.1
- [`MappedClass`](Mappings$MappedClass.md) wrapper introduced in 1.6.0
- Supports Tiny v2 mapping format
- Compatible with Fabric Yarn mappings
- Works with both local and remote mapping sources





