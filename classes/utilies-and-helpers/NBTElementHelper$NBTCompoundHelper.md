# NBTElementHelper$NBTCompoundHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper$NBTCompoundHelper`

**Extends:** `NBTElementHelper<NbtCompound>`

**Since:** JsMacros 1.5.1

The `NBTCompoundHelper` class is a specialized helper for handling NBT compound tags in JSMacros. It provides a dictionary-like interface for accessing, navigating, and manipulating compound NBT data structures. Compound tags are the most common and flexible NBT type, used to store collections of named values with different types.

NBT compound tags are extensively used throughout Minecraft for storing complex data structures, including item enchantments, entity data, block entity information, player data, and world generation parameters. This helper class makes it easy to work with these structures in your scripts.

## Overview

The `NBTCompoundHelper` class provides:

- Key-based access to NBT values with type information
- Iteration and enumeration of compound keys
- Type checking and conversion for nested values
- Integration with other NBT helper classes
- Safe access methods that handle missing keys gracefully

## Accessing NBTCompoundHelper

NBTCompoundHelper instances are typically obtained by:

1. Converting from an existing NBTElementHelper using `asCompoundHelper()`
2. Accessing compound data from items, entities, or other game objects
3. Using the static `wrapCompound()` method

```js
// Get NBT from an item and convert to compound helper
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();
    Chat.log(`Compound has ${compound.getKeys().size} keys`);
}
```

## Constructors

**Note:** NBTCompoundHelper instances are typically created through factory methods rather than direct construction.

### Static Factory Methods

#### `NBTCompoundHelper.wrapCompound(compound)`

Wraps a raw NbtCompound object in an NBTCompoundHelper.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| compound | NbtCompound | The raw NbtCompound to wrap |

**Returns:** `NBTCompoundHelper` - The wrapped compound helper, or null if input is null

**Since:** `1.9.0`

**Example:**
```js
// Usually created through existing helpers
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();
    // Work with compound data
}
```

## Fields

NBTCompoundHelper doesn't expose any public fields. All data access is done through methods.

## Methods

### `getKeys()`

Returns a set of all keys in this compound tag.

**Returns:** `Set<String>` - All keys contained in this compound

**Since:** `1.6.0`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();
    const keys = compound.getKeys();

    Chat.log(`Compound keys: ${Array.from(keys).join(', ')}`);
    Chat.log(`Total keys: ${keys.size}`);
}
```

### `getType(key)`

Returns the NBT type ID of the value stored at the specified key.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | String | The key to check |

**Returns:** `int` - The NBT type ID (0=END, 1=BYTE, 2=SHORT, 3=INT, 4=LONG, 5=FLOAT, 6=DOUBLE, 7=BYTE_ARRAY, 8=STRING, 9=LIST, 10=COMPOUND, 11=INT_ARRAY, 12=LONG_ARRAY)

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    for (const key of compound.getKeys()) {
        const type = compound.getType(key);
        const typeName = getTypeName(type);
        Chat.log(`${key}: ${typeName}`);
    }
}

function getTypeName(typeId) {
    const types = ['END', 'BYTE', 'SHORT', 'INT', 'LONG', 'FLOAT', 'DOUBLE',
                   'BYTE_ARRAY', 'STRING', 'LIST', 'COMPOUND', 'INT_ARRAY', 'LONG_ARRAY'];
    return types[typeId] || 'UNKNOWN';
}
```

### `has(key)`

Checks if this compound contains a value at the specified key.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | String | The key to check for |

**Returns:** `boolean` - True if the key exists in this compound

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("display")) {
        Chat.log("Item has display properties");

        if (compound.has("display.Name")) {
            Chat.log("Item has custom name");
        }
    }

    if (compound.has("Enchantments")) {
        Chat.log("Item has enchantments");
    }
}
```

### `get(key)`

Retrieves the value at the specified key as an NBTElementHelper.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | String | The key to retrieve |

**Returns:** `NBTElementHelper<?>` - The value at the key, or null if key doesn't exist

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    // Get display compound if it exists
    if (compound.has("display")) {
        const display = compound.get("display");
        if (display && display.isCompound()) {
            const displayCompound = display.asCompoundHelper();

            // Get custom name
            if (displayCompound.has("Name")) {
                const name = displayCompound.get("Name");
                Chat.log(`Custom name: ${name ? name.asString() : 'null'}`);
            }

            // Get lore list
            if (displayCompound.has("Lore")) {
                const lore = displayCompound.get("Lore");
                if (lore && lore.isList()) {
                    const loreList = lore.asListHelper();
                    Chat.log(`Item has ${loreList.length()} lore lines`);
                }
            }
        }
    }

    // Get enchantments list
    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            Chat.log(`Item has ${enchantList.length()} enchantments`);
        }
    }
}
```

### `asString(key)`

Retrieves the string representation of the value at the specified key.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | String | The key to retrieve |

**Returns:** `String` - String representation of the value

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    // Get various string representations
    if (compound.has("CustomModelData")) {
        const modelData = compound.asString("CustomModelData");
        Chat.log(`Custom model data: ${modelData}`);
    }

    if (compound.has("HideFlags")) {
        const hideFlags = compound.asString("HideFlags");
        Chat.log(`Hide flags: ${hideFlags}`);
    }
}
```

## NBT Type Constants

When working with `getType()`, you may encounter these NBT type constants:

| Type ID | Name | Description |
| ------- | ---- | ----------- |
| 0 | END | End tag (used for termination) |
| 1 | BYTE | 8-bit signed integer |
| 2 | SHORT | 16-bit signed integer |
| 3 | INT | 32-bit signed integer |
| 4 | LONG | 64-bit signed integer |
| 5 | FLOAT | 32-bit floating point |
| 6 | DOUBLE | 64-bit floating point |
| 7 | BYTE_ARRAY | Array of bytes |
| 8 | STRING | Text string |
| 9 | LIST | List of NBT elements |
| 10 | COMPOUND | Compound NBT tag (this type) |
| 11 | INT_ARRAY | Array of 32-bit integers |
| 12 | LONG_ARRAY | Array of 64-bit integers |

## Usage Examples

### Basic Compound Navigation
```js
function inspectCompound(compound, indent = 0) {
    const spaces = "  ".repeat(indent);

    for (const key of compound.getKeys()) {
        const type = compound.getType(key);
        const value = compound.get(key);

        if (!value) {
            Chat.log(`${spaces}${key}: null`);
            continue;
        }

        if (value.isNumber()) {
            const num = value.asNumberHelper();
            Chat.log(`${spaces}${key}: Number = ${num.asDouble()} (type ${type})`);
        } else if (value.isString()) {
            Chat.log(`${spaces}${key}: String = "${value.asString()}"`);
        } else if (value.isList()) {
            const list = value.asListHelper();
            Chat.log(`${spaces}${key}: List (length: ${list.length()}, type: ${list.getHeldType()})`);
        } else if (value.isCompound()) {
            Chat.log(`${spaces}${key}: Compound:`);
            inspectCompound(value.asCompoundHelper(), indent + 1);
        } else {
            Chat.log(`${spaces}${key}: Type ${type} = "${value.asString()}"`);
        }
    }
}

// Example usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    Chat.log("=== Item NBT Analysis ===");
    inspectCompound(nbt.asCompoundHelper());
}
```

### Enchantment Analysis
```js
function analyzeEnchantments(compound) {
    if (!compound.has("Enchantments")) {
        Chat.log("No enchantments found");
        return;
    }

    const enchantments = compound.get("Enchantments");
    if (!enchantments || !enchantments.isList()) {
        Chat.log("Enchantments field is not a list");
        return;
    }

    const enchantList = enchantments.asListHelper();
    Chat.log(`Found ${enchantList.length()} enchantments:`);

    for (let i = 0; i < enchantList.length(); i++) {
        const enchantNBT = enchantList.get(i);
        if (!enchantNBT || !enchantNBT.isCompound()) continue;

        const enchant = enchantNBT.asCompoundHelper();

        // Get enchantment ID
        const id = enchant.has("id") ? enchant.asString("id") : "unknown";

        // Get enchantment level
        let level = 0;
        if (enchant.has("lvl")) {
            const lvlElement = enchant.get("lvl");
            if (lvlElement && lvlElement.isNumber()) {
                level = lvlElement.asNumberHelper().asInt();
            }
        }

        Chat.log(`  ${id} level ${level}`);
    }
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    analyzeEnchantments(nbt.asCompoundHelper());
}
```

### Display Properties Analysis
```js
function analyzeDisplayProperties(compound) {
    if (!compound.has("display")) {
        Chat.log("No display properties");
        return;
    }

    const display = compound.get("display");
    if (!display || !display.isCompound()) {
        Chat.log("Display field is not a compound");
        return;
    }

    const displayCompound = display.asCompoundHelper();
    Chat.log("=== Display Properties ===");

    // Custom name
    if (displayCompound.has("Name")) {
        const name = displayCompound.get("Name");
        if (name) {
            Chat.log(`Custom Name: ${name.asString()}`);
        }
    }

    // Lore lines
    if (displayCompound.has("Lore")) {
        const lore = displayCompound.get("Lore");
        if (lore && lore.isList()) {
            const loreList = lore.asListHelper();
            Chat.log("Lore lines:");
            for (let i = 0; i < loreList.length(); i++) {
                const loreLine = loreList.get(i);
                if (loreLine) {
                    Chat.log(`  ${i + 1}: ${loreLine.asString()}`);
                }
            }
        }
    }

    // Color (for leather armor)
    if (displayCompound.has("color")) {
        const color = displayCompound.get("color");
        if (color && color.isNumber()) {
            const colorValue = color.asNumberHelper().asInt();
            Chat.log(`Dye Color: ${colorValue} (0x${colorValue.toString(16).padStart(6, '0')})`);
        }
    }
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    analyzeDisplayProperties(nbt.asCompoundHelper());
}
```

### Block Entity Data Analysis
```js
function analyzeBlockEntity(compound) {
    if (!compound) {
        Chat.log("No block entity data");
        return;
    }

    Chat.log("=== Block Entity Analysis ===");
    Chat.log(`Keys: ${Array.from(compound.getKeys()).join(', ')}`);

    // Common block entity properties
    if (compound.has("x") && compound.has("y") && compound.has("z")) {
        const x = compound.asString("x");
        const y = compound.asString("y");
        const z = compound.asString("z");
        Chat.log(`Position: ${x}, ${y}, ${z}`);
    }

    if (compound.has("id")) {
        const id = compound.asString("id");
        Chat.log(`Block Entity Type: ${id}`);
    }

    // Inventory for containers
    if (compound.has("Items")) {
        const items = compound.get("Items");
        if (items && items.isList()) {
            const itemList = items.asListHelper();
            Chat.log(`Contains ${itemList.length()} items`);

            for (let i = 0; i < itemList.length(); i++) {
                const itemNBT = itemList.get(i);
                if (itemNBT && itemNBT.isCompound()) {
                    const itemCompound = itemNBT.asCompoundHelper();
                    const id = itemCompound.has("id") ? itemCompound.asString("id") : "unknown";
                    const count = itemCompound.has("Count") ? itemCompound.asString("Count") : "0";
                    const slot = itemCompound.has("Slot") ? itemCompound.asString("Slot") : "?";

                    Chat.log(`  Slot ${slot}: ${count}x ${id}`);
                }
            }
        }
    }

    // Custom name
    if (compound.has("CustomName")) {
        const name = compound.asString("CustomName");
        Chat.log(`Custom Name: ${name}`);
    }
}

// This would be used when you have access to block entity NBT data
// (the exact method depends on your JSMacros version and available APIs)
```

### Advanced Compound Comparison
```js
function compareCompounds(compound1, compound2, path = "") {
    if (!compound1 || !compound2) {
        return compound1 === compound2; // Both null or one null
    }

    const keys1 = new Set(compound1.getKeys());
    const keys2 = new Set(compound2.getKeys());

    const allKeys = new Set([...keys1, ...keys2]);
    const differences = [];

    for (const key of allKeys) {
        const currentPath = path ? `${path}.${key}` : key;
        const has1 = keys1.has(key);
        const has2 = keys2.has(key);

        if (has1 && !has2) {
            differences.push(`${currentPath}: exists only in first compound`);
        } else if (!has1 && has2) {
            differences.push(`${currentPath}: exists only in second compound`);
        } else if (has1 && has2) {
            const val1 = compound1.get(key);
            const val2 = compound2.get(key);

            if (!val1 && !val2) {
                // Both null, equal
                continue;
            } else if (!val1 || !val2) {
                differences.push(`${currentPath}: one is null, other is not`);
            } else if (val1.isCompound() && val2.isCompound()) {
                // Recursively compare nested compounds
                const nestedDiffs = compareCompounds(val1.asCompoundHelper(), val2.asCompoundHelper(), currentPath);
                differences.push(...nestedDiffs);
            } else if (val1.asString() !== val2.asString()) {
                differences.push(`${currentPath}: "${val1.asString()}" != "${val2.asString()}"`);
            }
        }
    }

    return differences;
}

// Usage example
function compareItems(item1, item2) {
    const nbt1 = item1.getNBT();
    const nbt2 = item2.getNBT();

    if (!nbt1 || !nbt2) {
        Chat.log("One or both items have no NBT data");
        return;
    }

    if (!nbt1.isCompound() || !nbt2.isCompound()) {
        Chat.log("NBT data is not compound type");
        return;
    }

    const differences = compareCompounds(nbt1.asCompoundHelper(), nbt2.asCompoundHelper());

    if (differences.length === 0) {
        Chat.log("Items have identical NBT data");
    } else {
        Chat.log(`Found ${differences.length} NBT differences:`);
        differences.forEach(diff => Chat.log(`  ${diff}`));
    }
}
```

## Important Notes

1. **Type Safety:** Always check the type of retrieved values using helper methods before converting to specific types.

2. **Null Handling:** Methods can return null for missing keys or invalid operations. Always check for null returns.

3. **Case Sensitivity:** NBT keys are case-sensitive. "Name" and "name" are different keys.

4. **Performance:** Compound operations can be expensive for large nested structures. Cache results when possible.

5. **Thread Safety:** NBT operations should be performed on the main Minecraft thread unless specifically documented as thread-safe.

6. **Data Immutability:** Some NBT operations may return copies rather than references to the underlying data.

7. **Version Compatibility:** NBT structure can change between Minecraft versions. Scripts may need updates when Minecraft updates.

8. **Memory Usage:** Large compound structures can consume significant memory. Be mindful when processing many items or entities.

## Related Classes

- `NBTElementHelper` - Base class for all NBT element helpers
- `NBTListHelper` - Helper for NBT list elements
- `NBTNumberHelper` - Helper for NBT numeric elements
- `BaseHelper<T>` - Base class for all JSMacros helper classes
- `NbtCompound` - Raw Minecraft compound NBT class
- `ItemStackHelper` - Item helper that provides NBT access
- `EntityHelper` - Entity helper that may provide NBT access

## Version History

- **1.5.1:** Initial release with basic compound NBT handling
- **1.6.0:** Added `getKeys()` method for compound enumeration
- **1.9.0:** Added static `wrapCompound()` method for convenient compound wrapping

This class is essential for any script that needs to work with complex NBT data structures, particularly for analyzing items, entities, and block entities in Minecraft.