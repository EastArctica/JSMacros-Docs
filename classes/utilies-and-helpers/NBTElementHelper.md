# NBTElementHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper`

**Extends:** `BaseHelper<T>`

**Since:** JsMacros 1.5.1

The `NBTElementHelper` class is a fundamental utility class for handling NBT (Named Binary Tag) data in JSMacros. It provides a unified interface for working with all types of NBT elements, including numbers, strings, lists, and compound tags. This class serves as the base for specialized helpers: `NBTNumberHelper`, `NBTListHelper`, and `NBTCompoundHelper`.

NBT data is used throughout Minecraft to store and serialize various types of data, including item properties, entity data, block entity data, and world information. This helper class makes it easy to access, manipulate, and convert NBT data within your scripts.

## Overview

The `NBTElementHelper` class provides:

- Type checking and conversion methods for different NBT element types
- String representation and parsing capabilities
- NBT path resolution for complex data navigation
- Specialized helper classes for different NBT types
- Static factory methods for wrapping NBT elements

## Table of Contents
- [Static Methods](#static-methods)
- [Constructors](#constructors)
- [Fields](#fields)
- [Type Checking Methods](#type-checking-methods)
- [Conversion Methods](#conversion-methods)
- [Path Resolution](#path-resolution)
- [Inner Classes](#inner-classes)

## Static Methods

## Constructors

**Note:** NBTElementHelper instances are typically created through static factory methods rather than direct construction.

### `new NBTElementHelper(base)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| base | T extends NbtElement | The underlying NBT element |

**Example:**
```js
// Usually created through factory methods
// Not typically instantiated directly by users
```

## Fields

NBTElementHelper doesn't expose any public fields. All data access is done through methods.

## Type Checking Methods

## Conversion Methods

## Path Resolution

## Inner Classes

## Usage Examples

### Basic NBT Inspection
```js
// Get NBT from the player's held item
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (!nbt) {
    Chat.log("Item has no NBT data");
    return;
}

// Basic type checking
if (nbt.isCompound()) {
    Chat.log("Item has compound NBT data");
    const compound = nbt.asCompoundHelper();

    const keyCount = compound.getKeys().size();
    Chat.log(`NBT compound has ${keyCount} keys`);

    // List all keys and their types
    for (const key of compound.getKeys()) {
        const type = compound.getType(key);
        const value = compound.get(key);
        Chat.log(`${key} (type ${type}): ${value ? value.asString() : 'null'}`);
    }
}
```

### Working with Different NBT Types
```js
function inspectNBTElement(element, path = "") {
    if (!element) {
        Chat.log(`${path}: null`);
        return;
    }

    const type = element.getType();

    if (element.isNumber()) {
        const num = element.asNumberHelper();
        Chat.log(`${path}: Number = ${num.asDouble()} (byte: ${num.asByte()}, int: ${num.asInt()}, long: ${num.asLong()})`);
    } else if (element.isString()) {
        Chat.log(`${path}: String = "${element.asString()}"`);
    } else if (element.isList()) {
        const list = element.asListHelper();
        Chat.log(`${path}: List (length: ${list.length()}, type: ${list.getHeldType()})`);

        for (let i = 0; i < list.length(); i++) {
            inspectNBTElement(list.get(i), `${path}[${i}]`);
        }
    } else if (element.isCompound()) {
        const compound = element.asCompoundHelper();
        Chat.log(`${path}: Compound (keys: ${Array.from(compound.getKeys()).join(', ')})`);

        for (const key of compound.getKeys()) {
            inspectNBTElement(compound.get(key), `${path}.${key}`);
        }
    } else {
        Chat.log(`${path}: Unknown type ${type} = "${element.asString()}"`);
    }
}

// Example usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();
inspectNBTElement(nbt, "item");
```

### NBT Path Navigation
```js
// Advanced NBT path examples
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    try {
        // Navigate nested structures
        const displayName = nbt.resolve("display.Name");
        if (displayName && displayName.size() > 0) {
            Chat.log(`Item name: ${displayName.get(0).asString()}`);
        }

        // Get all lore lines
        const allLore = nbt.resolve("display.Lore[]");
        if (allLore) {
            Chat.log(`Lore lines: ${allLore.size()}`);
            allLore.forEach((lore, index) => {
                Chat.log(`  ${index + 1}: ${lore.asString()}`);
            });
        }

        // Find specific enchantment
        const sharpness = nbt.resolve("Enchantments[{id:'minecraft:sharpness'}]");
        if (sharpness && sharpness.size() > 0) {
            const enchant = sharpness.get(0).asCompoundHelper();
            const level = enchant.get("lvl").asNumberHelper().asInt();
            Chat.log(`Sharpness level: ${level}`);
        }

        // Get first enchantment level
        const firstEnchantLevel = nbt.resolve("Enchantments[0].lvl");
        if (firstEnchantLevel && firstEnchantLevel.size() > 0) {
            const level = firstEnchantLevel.get(0).asNumberHelper().asInt();
            Chat.log(`First enchantment level: ${level}`);
        }

    } catch (e) {
        Chat.log(`NBT path error: ${e.message}`);
    }
}
```

### Entity Data Analysis
```js
// Analyze entity NBT data
const player = Player.getPlayer();
const entities = World.getEntities(10); // Entities within 10 blocks

for (const entity of entities) {
    Chat.log(`\n=== Entity: ${entity.getName()} ===`);

    // Get entity data (this depends on the specific JSMacros version)
    try {
        // This would need to be adapted based on available methods
        // Many entities expose NBT through different means
        const entityNBT = entity.getNBT(); // Hypothetical method

        if (entityNBT) {
            if (entityNBT.isCompound()) {
                const compound = entityNBT.asCompoundHelper();

                // Common entity properties
                if (compound.has("Health")) {
                    const health = compound.get("Health").asNumberHelper().asFloat();
                    Chat.log(`Health: ${health}`);
                }

                if (compound.has("Pos")) {
                    const pos = compound.get("Pos");
                    if (pos.isList()) {
                        const posList = pos.asListHelper();
                        const x = posList.get(0).asNumberHelper().asDouble();
                        const y = posList.get(1).asNumberHelper().asDouble();
                        const z = posList.get(2).asNumberHelper().asDouble();
                        Chat.log(`Position: ${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)}`);
                    }
                }

                // Show all keys for debugging
                Chat.log(`All keys: ${Array.from(compound.getKeys()).sort().join(', ')}`);
            }
        }
    } catch (e) {
        Chat.log(`Could not read entity NBT: ${e.message}`);
    }
}
```

### Block Entity Data
```js
// Analyze block entity data (chests, furnaces, etc.)
const player = Player.getPlayer();
const lookingAt = player.rayTraceBlock(5);

if (lookingAt && lookingAt.block) {
    const block = lookingAt.block;
    const blockPos = block.getBlockPos();

    Chat.log(`\n=== Block at ${blockPos.getX()}, ${blockPos.getY()}, ${blockPos.getZ()} ===`);
    Chat.log(`Block type: ${block.getId()}`);

    // Some blocks have tile entity data
    try {
        // This would depend on available methods for getting block NBT
        const tileEntity = block.getTileEntity(); // Hypothetical method

        if (tileEntity && tileEntity.getNBT) {
            const nbt = tileEntity.getNBT();

            if (nbt && nbt.isCompound()) {
                const compound = nbt.asCompoundHelper();

                if (compound.has("Items")) {
                    const items = compound.get("Items");
                    if (items.isList()) {
                        const itemList = items.asListHelper();
                        Chat.log(`Block contains ${itemList.length()} items:`);

                        for (let i = 0; i < itemList.length(); i++) {
                            const itemNBT = itemList.get(i);
                            if (itemNBT.isCompound()) {
                                const itemCompound = itemNBT.asCompoundHelper();
                                const id = itemCompound.get("id").asString();
                                const count = itemCompound.get("Count").asNumberHelper().asByte();
                                const slot = itemCompound.get("Slot").asNumberHelper().asByte();
                                Chat.log(`  Slot ${slot}: ${count}x ${id}`);
                            }
                        }
                    }
                }

                // Show all keys for debugging
                Chat.log(`All tile entity keys: ${Array.from(compound.getKeys()).sort().join(', ')}`);
            }
        }
    } catch (e) {
        Chat.log(`Could not read block entity NBT: ${e.message}`);
    }
}
```

## Important Notes

1. **Type Safety:** Always check the type before casting to specialized helpers using `isNumber()`, `isString()`, `isList()`, and `isCompound()`.

2. **Null Handling:** Methods can return `null` for missing keys or invalid operations. Always check for null returns.

3. **Performance:** NBT operations can be expensive, especially for large nested structures. Cache results when possible.

4. **Path Caching:** NBT path resolution uses an internal cache for performance, but complex paths still have overhead.

5. **Version Compatibility:** NBT structure can change between Minecraft versions. Scripts may need updates when Minecraft updates.

6. **Memory Usage:** Large NBT structures can consume significant memory. Be mindful when processing many items or entities.

7. **Thread Safety:** NBT operations should be performed on the main Minecraft thread unless specifically documented as thread-safe.

8. **Data Immutability:** Some NBT operations may return copies rather than references to the underlying data.

## Related Classes

- `BaseHelper<T>` - Base class for all JSMacros helper classes
- `NbtElement` - Raw Minecraft NBT element interface
- `NbtCompound` - Raw Minecraft compound NBT class
- `AbstractNbtList<?>` - Raw Minecraft list NBT class
- `AbstractNbtNumber` - Raw Minecraft numeric NBT class
- `ItemStackHelper` - Item helper that provides NBT access
- `EntityHelper` - Entity helper that may provide NBT access

## Version History

- **1.5.1:** Initial release with basic NBT element handling
- **1.6.0:** Added `getKeys()` method to `NBTCompoundHelper`
- **1.8.3:** Added UUID detection and conversion methods to `NBTListHelper`
- **1.9.0:** Added NBT path resolution with `resolve()` method
- **1.9.1:** Added static `wrap()` method for convenient element wrapping





