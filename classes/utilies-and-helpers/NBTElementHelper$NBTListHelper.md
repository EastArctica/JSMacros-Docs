# NBTElementHelper$NBTListHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper$NBTListHelper`

**Extends:** `NBTElementHelper<AbstractNbtList<?>>`

**Since:** JsMacros 1.5.1

The `NBTListHelper` class is a specialized helper for handling NBT list tags in JSMacros. It provides array-like access to NBT list data structures, supporting multiple list types including generic lists, byte arrays, integer arrays, and long arrays. Lists are commonly used for storing collections of similar data, such as enchantment lists, item inventories, position coordinates, and UUID data.

NBT list tags are extensively used throughout Minecraft for storing ordered collections of data, including item enchantments, entity positions, block inventories, custom patterns, and various other game mechanics. This helper class makes it easy to work with these ordered collections in your scripts.

## Overview

The `NBTListHelper` class provides:

- Index-based access to list elements with type information
- UUID detection and conversion for int arrays
- List length and element type querying
- Support for multiple NBT list types (lists, byte arrays, int arrays, long arrays)
- Integration with other NBT helper classes for nested data access

## Accessing NBTListHelper

NBTListHelper instances are typically obtained by:

1. Converting from an existing NBTElementHelper using `asListHelper()`
2. Accessing list data from compound NBT structures
3. Working with array-type NBT data from various game objects

```js
// Get NBT from an item and access list data
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            Chat.log(`Item has ${enchantList.length()} enchantments`);
        }
    }
}
```

## Constructors

**Note:** NBTListHelper instances are typically created through factory methods rather than direct construction.

### Static Factory Methods

NBTListHelper instances are created through the main `NBTElementHelper.resolve()` method based on the NBT element type.

**Example:**
```js
// Usually created through existing helpers
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            // Work with list data
        }
    }
}
```

## Fields

NBTListHelper doesn't expose any public fields. All data access is done through methods.

## Methods

### `isPossiblyUUID()`

Checks if this list could represent a UUID based on its type and size.

**Returns:** `boolean` - True if this is an int array with exactly 4 elements (UUID format)

**Since:** `1.8.3`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("UUID")) {
        const uuid = compound.get("UUID");
        if (uuid && uuid.isList()) {
            const uuidList = uuid.asListHelper();
            if (uuidList.isPossiblyUUID()) {
                Chat.log("Found UUID data");
            }
        }
    }
}
```

### `asUUID()`

Converts this list to a UUID if it matches the UUID format.

**Returns:** `UUID` - The UUID object, or null if this list doesn't represent a valid UUID

**Since:** `1.8.3`

**Example:**
```js
function extractUUID(compound, key) {
    if (!compound.has(key)) {
        return null;
    }

    const uuidData = compound.get(key);
    if (!uuidData || !uuidData.isList()) {
        return null;
    }

    const uuidList = uuidData.asListHelper();
    if (uuidList.isPossiblyUUID()) {
        return uuidList.asUUID();
    }

    return null;
}

// Usage with entity data
const player = Player.getPlayer();
const entities = World.getEntities(10);

for (const entity of entities) {
    // This would depend on how entity NBT is accessible in your JSMacros version
    // const entityNBT = entity.getNBT(); // Hypothetical method
    //
    // if (entityNBT && entityNBT.isCompound()) {
    //     const compound = entityNBT.asCompoundHelper();
    //     const uuid = extractUUID(compound, "UUID");
    //
    //     if (uuid) {
    //         Chat.log(`${entity.getName()}: UUID = ${uuid.toString()}`);
    //     }
    // }
}
```

### `length()`

Returns the number of elements in this list.

**Returns:** `int` - The number of elements in the list

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    // Check enchantments count
    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            Chat.log(`Item has ${enchantList.length()} enchantments`);
        }
    }

    // Check lore lines count
    if (compound.has("display")) {
        const display = compound.get("display");
        if (display && display.isCompound()) {
            const displayCompound = display.asCompoundHelper();
            if (displayCompound.has("Lore")) {
                const lore = displayCompound.get("Lore");
                if (lore && lore.isList()) {
                    const loreList = lore.asListHelper();
                    Chat.log(`Item has ${loreList.length()} lore lines`);
                }
            }
        }
    }
}
```

### `get(index)`

Retrieves the element at the specified index as an NBTElementHelper.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| index | int | The zero-based index of the element to retrieve |

**Returns:** `NBTElementHelper<?>` - The element at the specified index, or null if index is invalid

**Since:** `1.5.1`

**Example:**
```js
function analyzeEnchantments(enchantList) {
    for (let i = 0; i < enchantList.length(); i++) {
        const enchantNBT = enchantList.get(i);
        if (!enchantNBT || !enchantNBT.isCompound()) continue;

        const enchant = enchantNBT.asCompoundHelper();

        // Get enchantment ID
        let id = "unknown";
        if (enchant.has("id")) {
            const idElement = enchant.get("id");
            if (idElement) {
                id = idElement.asString();
            }
        }

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
    const compound = nbt.asCompoundHelper();

    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            Chat.log(`Item enchantments:`);
            analyzeEnchantments(enchantList);
        }
    }
}
```

### `getHeldType()`

Returns the NBT type ID of elements in this list.

**Returns:** `int` - The NBT type ID of elements stored in this list

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    for (const key of compound.getKeys()) {
        const element = compound.get(key);
        if (!element || !element.isList()) continue;

        const list = element.asListHelper();
        const elementType = list.getHeldType();
        const elementCount = list.length();
        const typeName = getTypeName(elementType);

        Chat.log(`${key}: List of ${elementCount} ${typeName}(s)`);
    }
}

function getTypeName(typeId) {
    const types = ['END', 'BYTE', 'SHORT', 'INT', 'LONG', 'FLOAT', 'DOUBLE',
                   'BYTE_ARRAY', 'STRING', 'LIST', 'COMPOUND', 'INT_ARRAY', 'LONG_ARRAY'];
    return types[typeId] || 'UNKNOWN';
}
```

## NBT List Types

NBTListHelper can represent several types of NBT lists:

| NBT Type ID | Name | Description | Common Uses |
| ----------- | ---- | ----------- | ----------- |
| 7 | BYTE_ARRAY | Array of 8-bit integers | Block entity data, custom data storage |
| 9 | LIST | Generic list of NBT elements | Enchantments, items, effects, properties |
| 11 | INT_ARRAY | Array of 32-bit integers | UUID data, coordinates, color data |
| 12 | LONG_ARRAY | Array of 64-bit integers | Large integer data storage |

## Usage Examples

### Comprehensive List Analysis
```js
function analyzeList(list, key, indent = 0) {
    const spaces = "  ".repeat(indent);
    const length = list.length();
    const elementType = list.getHeldType();
    const typeName = getTypeName(elementType);

    Chat.log(`${spaces}${key}: List (length: ${length}, element type: ${typeName})`);

    if (length === 0) {
        Chat.log(`${spaces}  (empty list)`);
        return;
    }

    // Special handling for UUID detection
    if (list.isPossiblyUUID()) {
        const uuid = list.asUUID();
        if (uuid) {
            Chat.log(`${spaces}  UUID: ${uuid.toString()}`);
            return;
        }
    }

    // Show first few elements to avoid spam
    const showCount = Math.min(length, 5);
    for (let i = 0; i < showCount; i++) {
        const element = list.get(i);
        if (!element) {
            Chat.log(`${spaces}  [${i}]: null`);
            continue;
        }

        if (element.isNumber()) {
            const num = element.asNumberHelper();
            Chat.log(`${spaces}  [${i}]: ${num.asDouble()} (number)`);
        } else if (element.isString()) {
            const str = element.asString();
            Chat.log(`${spaces}  [${i}]: "${str}" (string)`);
        } else if (element.isCompound()) {
            Chat.log(`${spaces}  [${i}]: Compound (keys: ${Array.from(element.asCompoundHelper().getKeys()).size})`);
        } else if (element.isList()) {
            const sublist = element.asListHelper();
            Chat.log(`${spaces}  [${i}]: List (length: ${sublist.length()})`);
        } else {
            Chat.log(`${spaces}  [${i}]: Type ${element.getType()} = "${element.asString()}"`);
        }
    }

    if (length > showCount) {
        Chat.log(`${spaces}  ... and ${length - showCount} more elements`);
    }
}

function getTypeName(typeId) {
    const types = ['END', 'BYTE', 'SHORT', 'INT', 'LONG', 'FLOAT', 'DOUBLE',
                   'BYTE_ARRAY', 'STRING', 'LIST', 'COMPOUND', 'INT_ARRAY', 'LONG_ARRAY'];
    return types[typeId] || 'UNKNOWN';
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();
    Chat.log("=== NBT List Analysis ===");

    for (const key of compound.getKeys()) {
        const element = compound.get(key);
        if (!element || !element.isList()) continue;

        analyzeList(element.asListHelper(), key);
    }
}
```

### Enchantment Processing
```js
function processEnchantments(enchantList) {
    const enchantments = [];

    for (let i = 0; i < enchantList.length(); i++) {
        const enchantNBT = enchantList.get(i);
        if (!enchantNBT || !enchantNBT.isCompound()) continue;

        const enchant = enchantNBT.asCompoundHelper();
        let enchantData = { id: "unknown", level: 0 };

        // Extract enchantment ID
        if (enchant.has("id")) {
            const idElement = enchant.get("id");
            if (idElement) {
                enchantData.id = idElement.asString();
            }
        }

        // Extract enchantment level
        if (enchant.has("lvl")) {
            const lvlElement = enchant.get("lvl");
            if (lvlElement && lvlElement.isNumber()) {
                enchantData.level = lvlElement.asNumberHelper().asInt();
            }
        }

        enchantments.push(enchantData);
    }

    return enchantments;
}

function findEnchantment(enchantments, enchantId) {
    return enchantments.find(e => e.id === enchantId || e.id.endsWith(`:${enchantId}`));
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("Enchantments")) {
        const enchantmentsData = compound.get("Enchantments");
        if (enchantmentsData && enchantmentsData.isList()) {
            const enchantments = processEnchantments(enchantmentsData.asListHelper());

            Chat.log(`Found ${enchantments.length} enchantments:`);
            enchantments.forEach(e => Chat.log(`  ${e.id}: ${e.level}`));

            // Check for specific enchantments
            const efficiency = findEnchantment(enchantments, "efficiency");
            const unbreaking = findEnchantment(enchantments, "unbreaking");

            if (efficiency) Chat.log(`Efficiency: ${efficiency.level}`);
            if (unbreaking) Chat.log(`Unbreaking: ${unbreaking.level}`);
        }
    }
}
```

### Lore Processing
```js
function processLore(loreList) {
    const loreLines = [];

    for (let i = 0; i < loreList.length(); i++) {
        const loreElement = loreList.get(i);
        if (!loreElement) continue;

        // Get the raw string representation
        let rawText = loreElement.asString();

        // Try to parse JSON text format (Minecraft uses JSON for text components)
        try {
            const textComponent = JSON.parse(rawText);
            const cleanText = extractTextFromComponent(textComponent);
            loreLines.push(cleanText);
        } catch (e) {
            // If parsing fails, use raw text
            loreLines.push(rawText);
        }
    }

    return loreLines;
}

function extractTextFromComponent(component) {
    if (typeof component === 'string') {
        return component;
    }

    if (component.text) {
        return component.text;
    }

    if (component.extra && Array.isArray(component.extra)) {
        return component.extra.map(extractTextFromComponent).join('');
    }

    return '';
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("display")) {
        const display = compound.get("display");
        if (display && display.isCompound()) {
            const displayCompound = display.asCompoundHelper();

            if (displayCompound.has("Lore")) {
                const loreData = displayCompound.get("Lore");
                if (loreData && loreData.isList()) {
                    const loreLines = processLore(loreData.asListHelper());

                    Chat.log("Item Lore:");
                    loreLines.forEach((line, index) => {
                        Chat.log(`  ${index + 1}: ${line}`);
                    });
                }
            }
        }
    }
}
```

### Position and Coordinate Processing
```js
function processPosition(positionList) {
    if (positionList.length() !== 3) {
        Chat.log("Position list must have exactly 3 elements (x, y, z)");
        return null;
    }

    const xElement = positionList.get(0);
    const yElement = positionList.get(1);
    const zElement = positionList.get(2);

    if (!xElement || !yElement || !zElement ||
        !xElement.isNumber() || !yElement.isNumber() || !zElement.isNumber()) {
        Chat.log("All position elements must be numbers");
        return null;
    }

    return {
        x: xElement.asNumberHelper().asDouble(),
        y: yElement.asNumberHelper().asDouble(),
        z: zElement.asNumberHelper().asDouble()
    };
}

function distanceBetween(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Usage - this would be used when you have access to entity NBT with position data
function analyzeEntityPositions(entities) {
    const positions = [];

    for (const entity of entities) {
        // This depends on how entity NBT is accessible
        // const entityNBT = entity.getNBT(); // Hypothetical

        // if (entityNBT && entityNBT.isCompound()) {
        //     const compound = entityNBT.asCompoundHelper();
        //
        //     if (compound.has("Pos")) {
        //         const posData = compound.get("Pos");
        //         if (posData && posData.isList()) {
        //             const position = processPosition(posData.asListHelper());
        //             if (position) {
        //                 positions.push({
        //                     entity: entity.getName(),
        //                     pos: position
        //                 });
        //             }
        //         }
        //     }
        // }
    }

    // Calculate distances between all entities
    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const distance = distanceBetween(positions[i].pos, positions[j].pos);
            Chat.log(`${positions[i].entity} to ${positions[j].entity}: ${distance.toFixed(2)} blocks`);
        }
    }
}
```

### Array Data Processing
```js
function processByteArray(byteArray) {
    const bytes = [];
    for (let i = 0; i < byteArray.length(); i++) {
        const byteElement = byteArray.get(i);
        if (byteElement && byteElement.isNumber()) {
            bytes.push(byteElement.asNumberHelper().asByte());
        }
    }
    return bytes;
}

function processIntArray(intArray) {
    const ints = [];
    for (let i = 0; i < intArray.length(); i++) {
        const intElement = intArray.get(i);
        if (intElement && intElement.isNumber()) {
            ints.push(intElement.asNumberHelper().asInt());
        }
    }
    return ints;
}

function processLongArray(longArray) {
    const longs = [];
    for (let i = 0; i < longArray.length(); i++) {
        const longElement = longArray.get(i);
        if (longElement && longElement.isNumber()) {
            longs.push(longElement.asNumberHelper().asLong());
        }
    }
    return longs;
}

function analyzeArrays(compound) {
    for (const key of compound.getKeys()) {
        const element = compound.get(key);
        if (!element || !element.isList()) continue;

        const list = element.asListHelper();
        const elementType = list.getHeldType();

        switch (elementType) {
            case 7: // BYTE_ARRAY
                const bytes = processByteArray(list);
                Chat.log(`${key}: Byte array with ${bytes.length} bytes`);
                Chat.log(`  First 8 bytes: ${bytes.slice(0, 8).join(', ')}`);
                break;

            case 11: // INT_ARRAY
                if (list.isPossiblyUUID()) {
                    const uuid = list.asUUID();
                    Chat.log(`${key}: UUID = ${uuid.toString()}`);
                } else {
                    const ints = processIntArray(list);
                    Chat.log(`${key}: Int array with ${ints.length} integers`);
                    Chat.log(`  First 4 ints: ${ints.slice(0, 4).join(', ')}`);
                }
                break;

            case 12: // LONG_ARRAY
                const longs = processLongArray(list);
                Chat.log(`${key}: Long array with ${longs.length} long integers`);
                Chat.log(`  First 2 longs: ${longs.slice(0, 2).join(', ')}`);
                break;

            default:
                Chat.log(`${key}: Generic list (type: ${elementType})`);
        }
    }
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    Chat.log("=== Array Data Analysis ===");
    analyzeArrays(nbt.asCompoundHelper());
}
```

### Custom Data Validation
```js
function validateCustomList(list, expectedType, expectedLength = null) {
    if (list.getHeldType() !== expectedType) {
        return { valid: false, error: `Expected type ${expectedType}, got ${list.getHeldType()}` };
    }

    if (expectedLength !== null && list.length() !== expectedLength) {
        return { valid: false, error: `Expected length ${expectedLength}, got ${list.length()}` };
    }

    // Validate all elements
    for (let i = 0; i < list.length(); i++) {
        const element = list.get(i);
        if (!element) {
            return { valid: false, error: `Element at index ${i} is null` };
        }

        if (expectedType === 1 && !element.isNumber()) { // BYTE
            return { valid: false, error: `Element at index ${i} is not a number` };
        }

        if (expectedType === 8 && !element.isString()) { // STRING
            return { valid: false, error: `Element at index ${i} is not a string` };
        }
    }

    return { valid: true };
}

function validateItemNBT(compound) {
    const validations = [];

    // Validate enchantments list
    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            const validation = validateCustomList(enchantList, 10); // COMPOUND type

            if (!validation.valid) {
                validations.push(`Enchantments: ${validation.error}`);
            } else {
                // Further validate each enchantment compound
                for (let i = 0; i < enchantList.length(); i++) {
                    const enchantNBT = enchantList.get(i);
                    if (enchantNBT && enchantNBT.isCompound()) {
                        const enchant = enchantNBT.asCompoundHelper();
                        if (!enchant.has("id") || !enchant.has("lvl")) {
                            validations.push(`Enchantments[${i}]: Missing id or lvl field`);
                        }
                    }
                }
            }
        }
    }

    // Validate lore list
    if (compound.has("display")) {
        const display = compound.get("display");
        if (display && display.isCompound()) {
            const displayCompound = display.asCompoundHelper();

            if (displayCompound.has("Lore")) {
                const lore = displayCompound.get("Lore");
                if (lore && lore.isList()) {
                    const loreList = lore.asListHelper();
                    const validation = validateCustomList(loreList, 8); // STRING type

                    if (!validation.valid) {
                        validations.push(`Lore: ${validation.error}`);
                    }
                }
            }
        }
    }

    return validations;
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const issues = validateItemNBT(nbt.asCompoundHelper());

    if (issues.length === 0) {
        Chat.log("Item NBT validation passed");
    } else {
        Chat.log("Item NBT validation issues:");
        issues.forEach(issue => Chat.log(`  - ${issue}`));
    }
}
```

## Important Notes

1. **Index Bounds:** List indices are zero-based. Always check that indices are within bounds using `length()`.

2. **Type Consistency:** All elements in a generic NBT list must be of the same type. Use `getHeldType()` to check the element type.

3. **UUID Detection:** Use `isPossiblyUUID()` and `asUUID()` for working with UUID data stored as int arrays.

4. **Null Handling:** `get()` can return null for invalid indices. Always check for null returns.

5. **Array Types:** Distinguish between generic lists (type 9) and specialized arrays (types 7, 11, 12).

6. **Performance:** List operations can be expensive for large lists. Cache results when possible.

7. **Thread Safety:** NBT operations should be performed on the main Minecraft thread unless specifically documented as thread-safe.

8. **Memory Usage:** Large lists can consume significant memory. Be mindful when processing many lists.

## Related Classes

- `NBTElementHelper` - Base class for all NBT element helpers
- `NBTCompoundHelper` - Helper for NBT compound elements
- `NBTNumberHelper` - Helper for NBT numeric elements
- `BaseHelper<T>` - Base class for all JSMacros helper classes
- `AbstractNbtList<?>` - Raw Minecraft list NBT class
- `UUID` - Java UUID class for unique identifier handling
- `ItemStackHelper` - Item helper that provides NBT access
- `EntityHelper` - Entity helper that may provide NBT access

## Version History

- **1.5.1:** Initial release with basic list NBT handling
- **1.8.3:** Added UUID detection and conversion methods (`isPossiblyUUID()`, `asUUID()`)
- **Current:** Full feature set with comprehensive list manipulation capabilities

This class is essential for any script that needs to work with ordered NBT data collections, particularly for processing enchantments, inventories, positions, and other array-based game data.