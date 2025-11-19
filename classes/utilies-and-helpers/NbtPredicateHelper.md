# NbtPredicateHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.NbtPredicateHelper`

**Extends:** `BaseHelper<NbtPredicate>`

**Since:** JsMacros 1.9.1

The `NbtPredicateHelper` class is a utility wrapper for Minecraft's `NbtPredicate` that provides a scripting-friendly interface for testing NBT (Named Binary Tag) data against predicate conditions. NBT predicates are powerful filtering tools used to match entities, items, and NBT data based on specific criteria and conditions.

This class is commonly used in world scanning, item filtering, entity targeting, and automation scripts where you need to test if NBT data matches certain patterns or requirements.

## Overview

The `NbtPredicateHelper` class provides:

- NBT data testing for entities, items, and raw NBT elements
- Integration with Minecraft's native NBT predicate system
- Support for complex NBT matching conditions
- Use cases in automation, filtering, and targeting systems

## Table of Contents
- [How to Access](#how-to-access)
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [NBT Predicate Syntax](#nbt-predicate-syntax)
- [Important Notes](#important-notes)
- [Related Classes](#related-classes)

## How to Access

NbtPredicateHelper instances are typically obtained through:

1. **JavaUtils.getHelperFromRaw()** - Wrap raw Minecraft NbtPredicate objects
2. **BlockPredicateHelper.getNbtPredicate()** - Extract NBT predicates from block predicates
3. **Game Events and API Methods** - Various game systems that return NBT predicates
4. **Custom Predicate Creation** - Through Minecraft's predicate system (advanced usage)

## Constructors

### `new NbtPredicateHelper(base)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| base | NbtPredicate | The underlying Minecraft NbtPredicate to wrap |

**Note:** Direct instantiation is not recommended. Use factory methods or obtain from other helpers instead.

**Example:**
```js
// Usually created through factory methods, not directly
// const helper = new NbtPredicateHelper(someRawNbtPredicate); // Not recommended
```

## Methods

### `test(entity)`
Tests whether the given entity's NBT data matches this NBT predicate.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| entity | EntityHelper<?> | The entity to test against the predicate |

**Returns:** `boolean` - `true` if the entity's NBT data matches the predicate, `false` otherwise

**Since:** 1.9.1

**Example:**
```js
// Test if an entity matches NBT criteria
const entities = World.getEntities(10); // Get entities within 10 blocks
const nbtPredicate = // obtain your NbtPredicateHelper

for (const entity of entities) {
    if (nbtPredicate.test(entity)) {
        Chat.log(`Entity ${entity.getName()} matches the NBT predicate!`);

        // Get additional entity information
        const entityType = entity.getType();
        const pos = entity.getPos();
        Chat.log(`  Type: ${entityType}, Position: ${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}`);
    }
}
```

### `test(itemStack)`
Tests whether the given item stack's NBT data matches this NBT predicate.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| itemStack | ItemStackHelper | The item stack to test against the predicate |

**Returns:** `boolean` - `true` if the item stack's NBT data matches the predicate, `false` otherwise

**Since:** 1.9.1

**Example:**
```js
// Filter items in inventory based on NBT criteria
const player = Player.getPlayer();
const inventory = player.getInventory();
const nbtPredicate = // obtain your NbtPredicateHelper

for (let i = 0; i < inventory.getSize(); i++) {
    const item = inventory.getSlot(i);

    if (item && item.getId() !== "minecraft:air" && nbtPredicate.test(item)) {
        Chat.log(`Slot ${i}: ${item.getName()} matches NBT predicate`);

        // Display item details
        const count = item.getCount();
        const nbt = item.getNBT();
        Chat.log(`  Count: ${count}, Has NBT: ${nbt !== null}`);
    }
}
```

### `test(nbtElement)`
Tests whether the given NBT element matches this NBT predicate.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| nbtElement | NBTElementHelper<?> | The NBT element to test against the predicate |

**Returns:** `boolean` - `true` if the NBT element matches the predicate, `false` otherwise

**Since:** 1.9.1

**Example:**
```js
// Test raw NBT data against predicate
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();
const nbtPredicate = // obtain your NbtPredicateHelper

if (nbt && nbt.isCompound()) {
    if (nbtPredicate.test(nbt)) {
        Chat.log("Held item's NBT matches the predicate!");

        // Show matching NBT structure
        const compound = nbt.asCompoundHelper();
        const keys = compound.getKeys();
        Chat.log(`Matching NBT keys: ${Array.from(keys).join(', ')}`);

        for (const key of keys) {
            const value = compound.get(key);
            Chat.log(`  ${key}: ${value ? value.asString() : 'null'}`);
        }
    }
}
```

### `getRaw()` (Inherited from BaseHelper)
Returns the underlying Minecraft NbtPredicate object.

**Returns:** `NbtPredicate` - The raw Minecraft NbtPredicate object

**Note:** This is primarily for advanced use cases where you need access to the underlying Minecraft object.

**Example:**
```js
// Advanced usage - access raw Minecraft object
const rawPredicate = nbtPredicateHelper.getRaw();
// Use with other Minecraft APIs that require NbtPredicate objects
```

## Usage Examples

### Item Filtering System
```js
// Example: Filter items based on custom NBT criteria
function filterInventoryByNBT() {
    // Assume we have an NBT predicate (this would come from configuration or creation)
    const nbtPredicate = // obtain your NbtPredicateHelper

    if (!nbtPredicate) {
        Chat.log("No NBT predicate available");
        return;
    }

    const player = Player.getPlayer();
    const inventory = player.getInventory();
    const matchingItems = [];

    for (let i = 0; i < inventory.getSize(); i++) {
        const item = inventory.getSlot(i);

        if (item && item.getId() !== "minecraft:air") {
            if (nbtPredicate.test(item)) {
                matchingItems.push({
                    slot: i,
                    item: item,
                    name: item.getName(),
                    count: item.getCount()
                });
            }
        }
    }

    Chat.log(`Found ${matchingItems.length} matching items:`);
    for (const match of matchingItems) {
        Chat.log(`  Slot ${match.slot}: ${match.count}x ${match.name}`);
    }

    return matchingItems;
}

// Run the filter
const matches = filterInventoryByNBT();
```

### Entity Targeting System
```js
// Example: Find entities matching specific NBT criteria
function findEntitiesByNBT(radius, nbtPredicate) {
    const entities = World.getEntities(radius);
    const matchingEntities = [];

    for (const entity of entities) {
        // Skip the player
        if (entity.isPlayer()) continue;

        if (nbtPredicate.test(entity)) {
            matchingEntities.push({
                entity: entity,
                name: entity.getName(),
                type: entity.getType(),
                pos: entity.getPos(),
                health: entity.getHealth()
            });
        }
    }

    return matchingEntities;
}

// Usage example
function scanForSpecialEntities() {
    const nbtPredicate = // obtain your NbtPredicateHelper (e.g., from BlockPredicateHelper)

    if (!nbtPredicate) {
        Chat.log("No NBT predicate configured");
        return;
    }

    const matches = findEntitiesByNBT(20, nbtPredicate);

    Chat.log(`Found ${matches.length} entities matching NBT criteria within 20 blocks:`);

    for (const match of matches) {
        const pos = match.pos;
        Chat.log(`  ${match.name} (${match.type}) at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        Chat.log(`    Health: ${match.health?.toFixed(1) || 'Unknown'}`);
    }
}

scanForSpecialEntities();
```

### NBT Data Validation
```js
// Example: Validate NBT data structures
function validateNBTStructure(nbtElement, nbtPredicate, elementName = "Unknown") {
    if (!nbtElement) {
        Chat.log(`${elementName}: No NBT data present`);
        return false;
    }

    if (!nbtPredicate) {
        Chat.log(`${elementName}: No NBT predicate provided`);
        return false;
    }

    const isValid = nbtPredicate.test(nbtElement);

    if (isValid) {
        Chat.log(`✓ ${elementName}: NBT structure is valid`);

        // Display structure information
        if (nbtElement.isCompound()) {
            const compound = nbtElement.asCompoundHelper();
            const keys = compound.getKeys();
            Chat.log(`  Contains ${keys.size()} keys: ${Array.from(keys).join(', ')}`);
        } else if (nbtElement.isList()) {
            const list = nbtElement.asListHelper();
            Chat.log(`  List with ${list.length()} elements (type: ${list.getHeldType()})`);
        } else if (nbtElement.isNumber()) {
            const number = nbtElement.asNumberHelper();
            Chat.log(`  Numeric value: ${number.asDouble()}`);
        } else if (nbtElement.isString()) {
            Chat.log(`  String value: "${nbtElement.asString()}"`);
        }
    } else {
        Chat.log(`✗ ${elementName}: NBT structure does not match predicate`);
    }

    return isValid;
}

// Example usage
function validatePlayerInventory() {
    const player = Player.getPlayer();
    const inventory = player.getInventory();
    const nbtPredicate = // your NbtPredicateHelper instance

    for (let i = 0; i < Math.min(9, inventory.getSize()); i++) { // Check hotbar
        const item = inventory.getSlot(i);

        if (item && item.getId() !== "minecraft:air") {
            const nbt = item.getNBT();
            validateNBTStructure(nbt, nbtPredicate, `Slot ${i}: ${item.getName()}`);
        }
    }
}

validatePlayerInventory();
```

### Block Entity NBT Testing
```js
// Example: Test block entity NBT data
function testBlockEntitiesByNBT(nbtPredicate, radius = 5) {
    const player = Player.getPlayer();
    const playerPos = player.getBlockPos();
    const matchingBlocks = [];

    // Scan blocks in a cube around the player
    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                const checkPos = playerPos.add(x, y, z);
                const block = World.getBlock(checkPos.getX(), checkPos.getY(), checkPos.getZ());

                // Check if block has tile entity data
                try {
                    // This depends on the specific JSMacros version and available methods
                    const tileEntity = block.getTileEntity(); // Hypothetical method

                    if (tileEntity && tileEntity.getNBT) {
                        const nbt = tileEntity.getNBT();

                        if (nbtPredicate.test(nbt)) {
                            matchingBlocks.push({
                                pos: checkPos,
                                block: block,
                                blockId: block.getId(),
                                nbt: nbt
                            });
                        }
                    }
                } catch (e) {
                    // Skip blocks that don't have accessible tile entity data
                }
            }
        }
    }

    return matchingBlocks;
}

// Usage example
function findSpecialBlockEntities() {
    const nbtPredicate = // obtain your NbtPredicateHelper

    if (!nbtPredicate) {
        Chat.log("No NBT predicate provided for block entity testing");
        return;
    }

    const matches = testBlockEntitiesByNBT(nbtPredicate, 10);

    Chat.log(`Found ${matches.length} block entities matching NBT criteria:`);

    for (const match of matches) {
        const pos = match.pos;
        Chat.log(`  ${match.blockId} at [${pos.getX()}, ${pos.getY()}, ${pos.getZ()}]`);

        if (match.nbt && match.nbt.isCompound()) {
            const compound = match.nbt.asCompoundHelper();
            if (compound.has("id")) {
                const id = compound.get("id").asString();
                Chat.log(`    Entity ID: ${id}`);
            }
        }
    }
}
```

### Advanced: Working with BlockPredicateHelper
```js
// Example: Extract and use NBT predicates from BlockPredicateHelper
function analyzeBlockPredicates() {
    // Assume you have a BlockPredicateHelper (e.g., from command parsing or world scanning)
    const blockPredicate = // obtain your BlockPredicateHelper instance

    if (!blockPredicate) {
        Chat.log("No block predicate provided");
        return;
    }

    // Extract NBT predicate from block predicate
    const nbtPredicate = blockPredicate.getNbtPredicate();

    if (!nbtPredicate) {
        Chat.log("Block predicate has no NBT conditions");
        return;
    }

    Chat.log("Analyzing NBT predicate from block predicate...");

    // Test against current block the player is looking at
    const player = Player.getPlayer();
    const lookingAt = player.rayTraceBlock(10);

    if (lookingAt && lookingAt.block) {
        const block = lookingAt.block;
        const blockPos = block.getBlockPos();

        Chat.log(`Testing block at ${blockPos.getX()}, ${blockPos.getY()}, ${blockPos.getZ()}`);
        Chat.log(`Block type: ${block.getId()}`);

        // Try to get block entity NBT (depends on JSMacros version)
        try {
            const tileEntity = block.getTileEntity();
            if (tileEntity && tileEntity.getNBT) {
                const nbt = tileEntity.getNBT();

                if (nbtPredicate.test(nbt)) {
                    Chat.log("✓ Block entity NBT matches the predicate!");

                    // Show NBT details
                    if (nbt.isCompound()) {
                        const compound = nbt.asCompoundHelper();
                        const keys = compound.getKeys();
                        Chat.log(`NBT keys: ${Array.from(keys).sort().join(', ')}`);

                        for (const key of keys) {
                            const value = compound.get(key);
                            if (value) {
                                Chat.log(`  ${key}: ${value.asString()}`);
                            }
                        }
                    }
                } else {
                    Chat.log("✗ Block entity NBT does not match the predicate");
                }
            } else {
                Chat.log("Block has no accessible tile entity data");
            }
        } catch (e) {
            Chat.log(`Could not access block entity NBT: ${e.message}`);
        }
    } else {
        Chat.log("Not looking at any block");
    }
}

// Usage
// analyzeBlockPredicates();
```

## NBT Predicate Syntax

While the `NbtPredicateHelper` abstracts much of the complexity, understanding NBT predicate syntax can be helpful:

### Common NBT Predicate Patterns

1. **Exact Match**: `{key: "value"}` - Match exact NBT value
2. **Range Check**: `{key: {min: 10, max: 100}}` - Match numeric values within range
3. **List Contains**: `{key: [{item: "minecraft:diamond"}]}` - Match list containing specific item
4. **Compound Properties**: `{display: {Name: "Custom Sword"}}` - Match nested compound properties
5. **Multiple Conditions**: `{key1: "value1", key2: {min: 5}}` - Match multiple NBT conditions

### Example NBT Structures

**Item with Custom Name:**
```json
{
    "display": {
        "Name": "{\"text\":\"Diamond Sword\",\"color\":\"aqua\",\"bold\":true}"
    }
}
```

**Enchanted Item:**
```json
{
    "Enchantments": [
        {
            "id": "minecraft:sharpness",
            "lvl": 5
        }
    ]
}
```

**Entity Data:**
```json
{
    "Health": 20.0f,
    "Attributes": [
        {
            "Name": "generic.max_health",
            "Base": 20.0
        }
    ]
}
```

## Important Notes

1. **Null Safety**: NbtPredicateHelper instances obtained from other helpers can be null if no NBT predicate is defined. Always check for null before use.

2. **Performance**: NBT predicate testing is generally efficient, but when testing large numbers of entities or items:
   - Consider limiting search ranges
   - Cache results when appropriate
   - Use more specific filters before NBT testing when possible

3. **NBT Structure Changes**: Minecraft NBT structures can change between game versions. Scripts may need updates after major Minecraft updates.

4. **Thread Safety**: NBT operations should typically be performed on the main Minecraft thread for thread safety.

5. **Data Access**: Some entities and blocks may not expose their full NBT data through the JSMacros API due to Minecraft's security and performance considerations.

6. **Predicate Creation**: Creating custom NBT predicates typically requires access to Minecraft's internal predicate creation systems, which may not be directly exposed through JSMacros. Most use cases involve obtaining predicates from game systems or configuration.

7. **Memory Usage**: Large NBT structures and frequent predicate testing can consume significant memory. Be mindful when processing large datasets.

8. **Data Immutability**: Some NBT operations may return copies rather than references to live data.

## Related Classes

- **BaseHelper<NbtPredicate>** - Parent class providing common helper functionality
- **BlockPredicateHelper** - Often contains NbtPredicateHelper instances
- **EntityHelper<?>** - Entity objects that can be tested against NBT predicates
- **ItemStackHelper** - Item objects that can be tested against NBT predicates
- **NBTElementHelper<?>** - NBT elements that can be tested directly
- **JavaUtils** - Provides factory methods for wrapping raw objects
- **NbtCompound** - Raw Minecraft compound NBT class
- **NbtPredicate** - Raw Minecraft NBT predicate class

## Common Use Cases

1. **Item Filtering**: Filter inventory items based on custom NBT properties (enchants, custom names, etc.)

2. **Entity Targeting**: Find entities with specific NBT data (custom mobs, special entities, etc.)

3. **World Scanning**: Locate blocks or entities with particular NBT characteristics

4. **Automation Systems**: Create complex conditions for automated farming, sorting, or building

5. **Custom Tooling**: Develop tools for analyzing and manipulating NBT data

6. **Game Mechanics**: Implement custom game mechanics that depend on NBT properties

7. **Data Validation**: Validate NBT data structures before processing

8. **Debugging Tools**: Create tools for inspecting and understanding NBT structures in the world

9. **Configuration Systems**: Use NBT predicates defined in configuration files to filter game objects

10. **Integration Systems**: Work with other mods or systems that use NBT data for communication or storage