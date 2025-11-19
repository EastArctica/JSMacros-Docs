# EnchantmentHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.inventory`
**Since:** 1.8.4
**Author:** Etheradon

## Overview

The `EnchantmentHelper` class provides a comprehensive interface for working with Minecraft enchantments in JSMacros scripts. It allows you to access enchantment properties, check compatibility, generate formatted names, and interact with the enchantment system. This class is essential for any script that needs to work with enchanted items, enchantment tables, or custom enchantment logic.

## Creating EnchantmentHelper Instances

You can create EnchantmentHelper instances in several ways:

### From Enchantment ID
```js
// Using full namespace
const sharpness = new EnchantmentHelper("minecraft:sharpness");

// Using short form (minecraft: namespace is optional)
const protection = new EnchantmentHelper("protection");
const efficiency = new EnchantmentHelper("efficiency");
```

### From Existing Enchantments
EnchantmentHelper instances are typically obtained from ItemStackHelper when working with enchanted items:

```js
// Get enchantments from an item
const item = player.getMainHand();
const enchantments = item.getEnchantments();

for (const enchant of enchantments) {
    console.log(`${enchant.getName()} level ${enchant.getLevel()}`);
    console.log(`ID: ${enchant.getId()}`);
}
```

## Properties

### Level Information

#### `getLevel()`
**Returns:** `int` - The current level of this enchantment instance

Gets the level value stored in this EnchantmentHelper instance. Note that this may be 0 if the helper was created without specifying a level.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness", 3);
console.log(`Level: ${sharpness.getLevel()}`); // Output: Level: 3
```

#### `getMinLevel()`
**Returns:** `int` - The minimum possible level for this enchantment in vanilla Minecraft

Gets the lowest level that this enchantment can have in normal gameplay.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
console.log(`Min level: ${sharpness.getMinLevel()}`); // Output: Min level: 1
```

#### `getMaxLevel()`
**Returns:** `int` - The maximum possible level for this enchantment in vanilla Minecraft

Gets the highest level that this enchantment can have in normal gameplay.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
console.log(`Max level: ${sharpness.getMaxLevel()}`); // Output: Max level: 5
```

### Basic Information

#### `getName()`
**Returns:** `String` - The translated name of this enchantment

Gets the localized name of the enchantment in the current language.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
console.log(`Name: ${sharpness.getName()}`); // Output: Name: Sharpness
```

#### `getId()`
**Returns:** `String` - The enchantment ID in format `namespace:name`

Gets the unique identifier for this enchantment.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
console.log(`ID: ${sharpness.getId()}`); // Output: ID: minecraft:sharpness
```

#### `getWeight()`
**Returns:** `int` - The relative probability weight for this enchantment

Gets the weight value that determines how likely this enchantment is to be selected in enchanting tables and loot tables. Higher values mean more common.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const curse = new EnchantmentHelper("minecraft:vanishing_curse");

console.log(`Sharpness weight: ${sharpness.getWeight()}`);
console.log(`Curse weight: ${curse.getWeight()}`);
```

### Enchantment Type Properties

#### `isCursed()`
**Returns:** `boolean` - Whether this enchantment is a curse

Curses are special enchantments that cannot be removed from items and typically cannot be obtained through enchanting tables.

```js
const curse = new EnchantmentHelper("minecraft:vanishing_curse");
const sharpness = new EnchantmentHelper("minecraft:sharpness");

console.log(`Is curse: ${curse.isCursed()}`); // Output: Is curse: true
console.log(`Is curse: ${sharpness.isCursed()}`); // Output: Is curse: false
```

#### `isTreasure()`
**Returns:** `boolean` - Whether this enchantment is a treasure enchantment

Treasure enchantments cannot be obtained through enchanting tables but can be found in loot chests, fishing, or villager trading.

```js
const mending = new EnchantmentHelper("minecraft:mending");
const sharpness = new EnchantmentHelper("minecraft:sharpness");

console.log(`Is treasure: ${mending.isTreasure()}`); // Output: Is treasure: true
console.log(`Is treasure: ${sharpness.isTreasure()}`); // Output: Is treasure: false
```

## Name Formatting Methods

### `getLevelName(level)`
**Parameters:**
- `level` (int): The level to generate a name for

**Returns:** `String` - The translated name with level indicator

Gets the formatted name for a specific level of this enchantment.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
console.log(sharpness.getLevelName(1)); // Output: Sharpness I
console.log(sharpness.getLevelName(3)); // Output: Sharpness III
console.log(sharpness.getLevelName(5)); // Output: Sharpness V
```

### `getRomanLevelName()`
**Returns:** `TextHelper` - The formatted name with Roman numeral for current level

Gets the enchantment name with the level displayed as a Roman numeral. Uses the instance's current level.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness", 3);
console.log(sharpness.getRomanLevelName().getString()); // Output: Sharpness III
```

### `getRomanLevelName(level)`
**Parameters:**
- `level` (int): The level to generate a name for

**Returns:** `TextHelper` - The formatted name with Roman numeral for specified level

Gets the enchantment name with the level displayed as a Roman numeral. Automatically uses Arabic numerals for levels outside the range 1-3999.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
console.log(sharpness.getRomanLevelName(3).getString()); // Output: Sharpness III
console.log(sharpness.getRomanLevelName(5000).getString()); // Output: Sharpness 5000
```

## Compatibility and Conflict Methods

### `isCompatible(enchantment)`
**Parameters:**
- `enchantment` (String|EnchantmentHelper): The enchantment to check compatibility with

**Returns:** `boolean` - Whether the enchantments are compatible

Checks if this enchantment can be combined with the specified enchantment.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const smite = new EnchantmentHelper("minecraft:smite");
const knockback = new EnchantmentHelper("minecraft:knockback");

console.log(sharpness.isCompatible(smite)); // Output: false (conflict)
console.log(sharpness.isCompatible(knockback)); // Output: true (compatible)

// Using string ID
console.log(sharpness.isCompatible("minecraft:protection")); // Output: true (compatible)
```

### `conflictsWith(enchantment)`
**Parameters:**
- `enchantment` (String|EnchantmentHelper): The enchantment to check for conflicts

**Returns:** `boolean` - Whether the enchantments conflict

The opposite of `isCompatible()`. Returns true if the enchantments cannot be combined.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const smite = new EnchantmentHelper("minecraft:smite");

console.log(sharpness.conflictsWith(smite)); // Output: true (conflict)
console.log(sharpness.conflictsWith("minecraft:protection")); // Output: false (compatible)
```

### `getCompatibleEnchantments()`
**Returns:** `List<EnchantmentHelper>` - List of compatible enchantments

Gets a list of all enchantments that can be combined with this one. Only considers enchantments that can be applied to the same item types.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const compatible = sharpness.getCompatibleEnchantments();

console.log("Compatible enchantments:");
for (const enchant of compatible) {
    console.log(`- ${enchant.getName()}`);
}
```

### `getCompatibleEnchantments(ignoreType)`
**Parameters:**
- `ignoreType` (boolean): Whether to ignore item type restrictions

**Returns:** `List<EnchantmentHelper>` - List of compatible enchantments

Gets compatible enchantments, optionally ignoring item type restrictions.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const allCompatible = sharpness.getCompatibleEnchantments(true); // Ignore type restrictions
const typeCompatible = sharpness.getCompatibleEnchantments(false); // Respect type restrictions
```

### `getConflictingEnchantments()`
**Returns:** `List<EnchantmentHelper>` - List of conflicting enchantments

Gets a list of all enchantments that conflict with this one. Only considers enchantments that apply to the same item types.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const conflicting = sharpness.getConflictingEnchantments();

console.log("Conflicting enchantments:");
for (const enchant of conflicting) {
    console.log(`- ${enchant.getName()}`);
}
```

### `getConflictingEnchantments(ignoreType)`
**Parameters:**
- `ignoreType` (boolean): Whether to ignore item type restrictions

**Returns:** `List<EnchantmentHelper>` - List of conflicting enchantments

Gets conflicting enchantments, optionally ignoring item type restrictions.

## Item Application Methods

### `canBeApplied(item)`
**Parameters:**
- `item` (ItemHelper|ItemStackHelper): The item to check

**Returns:** `boolean` - Whether this enchantment can be applied to the item

Checks if this enchantment is valid for the specified item type and doesn't conflict with existing enchantments.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const sword = player.getMainHand();

if (sharpness.canBeApplied(sword)) {
    console.log("Sharpness can be applied to this item");
} else {
    console.log("Sharpness cannot be applied to this item");
}
```

### `getAcceptableItems()`
**Returns:** `List<ItemHelper>` - List of items this enchantment can be applied to

Gets a list of all item types that this enchantment can be applied to.

```js
const sharpness = new EnchantmentHelper("minecraft:sharpness");
const acceptableItems = sharpness.getAcceptableItems();

console.log("Items that can have Sharpness:");
for (const item of acceptableItems) {
    console.log(`- ${item.getId()}`);
}
```

## Usage Examples

### Example 1: Basic Enchantment Information
```js
function analyzeEnchantment(enchantId) {
    try {
        const enchant = new EnchantmentHelper(enchantId);

        console.log(`=== ${enchant.getName()} ===`);
        console.log(`ID: ${enchant.getId()}`);
        console.log(`Min Level: ${enchant.getMinLevel()}`);
        console.log(`Max Level: ${enchant.getMaxLevel()}`);
        console.log(`Weight: ${enchant.getWeight()}`);
        console.log(`Is Curse: ${enchant.isCursed()}`);
        console.log(`Is Treasure: ${enchant.isTreasure()}`);

        // Show level names
        for (let level = enchant.getMinLevel(); level <= enchant.getMaxLevel(); level++) {
            console.log(`Level ${level}: ${enchant.getLevelName(level)}`);
        }

    } catch (e) {
        console.log(`Enchantment "${enchantId}" not found!`);
    }
}

// Test some enchantments
analyzeEnchantment("minecraft:sharpness");
analyzeEnchantment("minecraft:mending");
analyzeEnchantment("minecraft:vanishing_curse");
```

### Example 2: Check Item Enchantment Compatibility
```js
function checkItemEnchantments() {
    const item = player.getMainHand();

    if (!item) {
        console.log("No item in hand");
        return;
    }

    console.log(`Checking enchantments for: ${item.getName()}`);

    // Get existing enchantments
    const existingEnchants = item.getEnchantments();
    console.log(`Current enchantments: ${existingEnchants.length}`);

    for (const existing of existingEnchants) {
        console.log(`- ${existing.getName()} ${existing.getLevelName(existing.getLevel())}`);
    }

    // Check what enchantments can be added
    const testEnchants = ["minecraft:sharpness", "minecraft:protection", "minecraft:efficiency"];

    for (const enchantId of testEnchants) {
        const enchant = new EnchantmentHelper(enchantId);

        if (enchant.canBeApplied(item)) {
            console.log(`✓ Can apply: ${enchant.getName()}`);
        } else {
            console.log(`✗ Cannot apply: ${enchant.getName()}`);

            // Check for conflicts
            for (const existing of existingEnchants) {
                if (enchant.conflictsWith(existing)) {
                    console.log(`  - Conflicts with: ${existing.getName()}`);
                }
            }
        }
    }
}

checkItemEnchantments();
```

### Example 3: Enchantment Compatibility Matrix
```js
function generateCompatibilityMatrix(enchantId) {
    const enchant = new EnchantmentHelper(enchantId);

    console.log(`\n=== Compatibility Matrix for ${enchant.getName()} ===`);

    const testEnchants = [
        "minecraft:sharpness", "minecraft:smite", "minecraft:bane_of_arthropods",
        "minecraft:knockback", "minecraft:fire_aspect", "minecraft:looting",
        "minecraft:sweeping", "minecraft:protection", "minecraft:blast_protection",
        "minecraft:projectile_protection", "minecraft:feather_falling",
        "minecraft:depth_strider", "minecraft:respiration", "minecraft:aqua_affinity"
    ];

    console.log("\nCompatible:");
    const compatible = enchant.getCompatibleEnchantments();
    for (const compat of compatible) {
        console.log(`✓ ${compat.getName()}`);
    }

    console.log("\nConflicting:");
    const conflicting = enchant.getConflictingEnchantments();
    for (const conflict of conflicting) {
        console.log(`✗ ${conflict.getName()}`);
    }
}

generateCompatibilityMatrix("minecraft:sharpness");
```

### Example 4: Find Best Enchantments for Item Type
```js
function findBestEnchantments(itemType) {
    const commonEnchants = [
        "minecraft:sharpness", "minecraft:smite", "minecraft:bane_of_arthropods",
        "minecraft:protection", "minecraft:blast_protection", "minecraft:fire_protection",
        "minecraft:projectile_protection", "minecraft:feather_falling", "minecraft:depth_strider",
        "minecraft:efficiency", "minecraft:unbreaking", "minecraft:mending",
        "minecraft:fortune", "minecraft:silk_touch", "minecraft:luck_of_the_sea"
    ];

    console.log(`\n=== Best enchantments for ${itemType} ===`);

    const validEnchants = [];

    for (const enchantId of commonEnchants) {
        try {
            const enchant = new EnchantmentHelper(enchantId);
            const acceptableItems = enchant.getAcceptableItems();

            // Check if this item type is acceptable
            const isCompatible = acceptableItems.some(item => item.getId() === itemType);

            if (isCompatible) {
                validEnchants.push({
                    id: enchantId,
                    name: enchant.getName(),
                    weight: enchant.getWeight(),
                    maxLevel: enchant.getMaxLevel(),
                    isTreasure: enchant.isTreasure(),
                    isCurse: enchant.isCursed()
                });
            }
        } catch (e) {
            // Enchantment doesn't exist, skip
        }
    }

    // Sort by weight (higher = more common) and then by name
    validEnchants.sort((a, b) => {
        if (a.isCurse !== b.isCurse) return a.isCurse ? 1 : -1; // Curses last
        if (a.isTreasure !== b.isTreasure) return a.isTreasure ? 1 : -1; // Treasures last
        return b.weight - a.weight; // Higher weight first
    });

    console.log("Common enchantments (by weight):");
    for (const enchant of validEnchants.filter(e => !e.isTreasure && !e.isCurse)) {
        console.log(`- ${enchant.name} (max: ${enchant.maxLevel}, weight: ${enchant.weight})`);
    }

    if (validEnchants.some(e => e.isTreasure)) {
        console.log("\nTreasure enchantments:");
        for (const enchant of validEnchants.filter(e => e.isTreasure && !e.isCurse)) {
            console.log(`- ${enchant.name} (max: ${enchant.maxLevel})`);
        }
    }

    if (validEnchants.some(e => e.isCurse)) {
        console.log("\nCurse enchantments:");
        for (const enchant of validEnchants.filter(e => e.isCurse)) {
            console.log(`- ${enchant.name}`);
        }
    }
}

// Test for different item types
findBestEnchantments("minecraft:diamond_sword");
findBestEnchantments("minecraft:diamond_pickaxe");
findBestEnchantments("minecraft:diamond_boots");
```

### Example 5: Enchantment Name Formatter
```js
function formatEnchantments() {
    const item = player.getMainHand();

    if (!item) {
        console.log("No item in hand");
        return;
    }

    const enchantments = item.getEnchantments();

    if (enchantments.length === 0) {
        console.log("Item has no enchantments");
        return;
    }

    console.log(`Enchantments on ${item.getName()}:`);

    for (const enchant of enchantments) {
        const level = enchant.getLevel();
        const fancyName = enchant.getRomanLevelName().getString();
        const plainName = enchant.getName();

        console.log(`- ${fancyName}`);
        console.log(`  ID: ${enchant.getId()}`);
        console.log(`  Plain: ${plainName} ${level}`);
        console.log(`  Max Level: ${enchant.getMaxLevel()}`);
        console.log(`  Weight: ${enchant.getWeight()}`);
        console.log(`  Is Curse: ${enchant.isCursed()}`);
        console.log(`  Is Treasure: ${enchant.isTreasure()}`);
        console.log("");
    }
}

formatEnchantments();
```

## Important Notes

1. **Namespace Handling:** When using enchantment IDs, the `minecraft:` namespace is optional. Both `"sharpness"` and `"minecraft:sharpness"` will work.

2. **Level Storage:** The `getLevel()` method returns the level stored in the EnchantmentHelper instance, not necessarily the enchantment's current level on an item. When getting enchantments from items, the level will match the item's enchantment level.

3. **Roman Numeral Limits:** Roman numeral formatting only works for levels 1-3999. Levels outside this range will be displayed as Arabic numerals.

4. **Compatibility Rules:** Enchantment compatibility depends on both the enchantment rules and item type restrictions. Some enchantments may be compatible in theory but not applicable to the same item types.

5. **Error Handling:** Creating an EnchantmentHelper with an invalid enchantment ID will throw an exception. Always wrap creation in try-catch blocks when working with user input.

6. **Registry Access:** The class requires access to Minecraft's enchantment registry, which is only available when the game is running and connected to a world/server.

## Related Classes

- [`ItemHelper`](ItemHelper.md) - For working with item types
- [`ItemStackHelper`](ItemStackHelper.md) - For working with specific item instances and their enchantments
- [`TextHelper`](TextHelper.md) - For working with formatted text returned by some methods
- [`RegistryHelper`](RegistryHelper.md) - For working with Minecraft registries

## Best Practices

1. **Always validate enchantment IDs** when working with user input
2. **Use try-catch blocks** when creating EnchantmentHelper instances from strings
3. **Check both compatibility and item applicability** before assuming an enchantment can be added
4. **Cache enchantment objects** when working with the same enchantment multiple times
5. **Consider treasure and curse status** when building enchantment recommendation systems
6. **Use the weight system** to prioritize more common enchantments in random selection algorithms