# ItemStackHelper

The `ItemStackHelper` class is a fundamental helper class in JSMacros that represents item stacks in Minecraft. It provides access to all item properties including enchantments, NBT data, durability, and various metadata fields. This class is essential for any script that needs to work with items, whether in inventory management, item filtering, or custom item processing.

## Overview

`ItemStackHelper` wraps Minecraft's internal `ItemStack` class and exposes its functionality to JSMacros scripts in a user-friendly way. It can represent any item stack - from simple dirt blocks to complex enchanted diamond swords with custom NBT data.

## Creating ItemStackHelper Instances

### From Item ID and Count
```javascript
// Create a stack of 64 diamonds
const diamondStack = new ItemStackHelper("minecraft:diamond", 64);

// Create a single enchanted golden apple (namespace can be omitted)
const gapple = new ItemStackHelper("golden_apple", 1);
```

### From Existing ItemStack
In most cases, you'll receive `ItemStackHelper` objects from JSMacros events and APIs:
```javascript
// From inventory slot
const mainHand = Player.getMainHand();
// From hotbar slot
const hotbarSlot = Player.getHotbar()[0];
```

## Item Properties and Identification

### Basic Properties
- **`getItemId()`** - Returns the item's registry ID (e.g., "minecraft:diamond_sword")
- **`getName()`** - Returns the display name as TextHelper
- **`getDefaultName()`** - Returns the default item name as TextHelper
- **`getCount()`** - Returns the number of items in the stack
- **`getMaxCount()`** - Returns the maximum stack size
- **`isEmpty()`** - Returns true if the stack is empty

### Item Classification
- **`getTags()`** - Returns list of item tags (e.g., ["minecraft:logs", "minecraft:planks"])
- **`isFood()`** - Returns true if the item is edible
- **`isTool()`** - Returns true if the item is a tool
- **`isWearable()`** - Returns true if the item can be worn as armor
- **`getCreativeTab()`** - Returns the creative tabs this item appears in

```javascript
const item = Player.getMainHand();
if (item.isTool()) {
    Chat.log("Holding a tool!");
}

if (item.isFood()) {
    Chat.log(`This is food: ${item.getName()}`);
}

// Get all tags
const tags = item.getTags();
Chat.log(`Item tags: ${tags.join(", ")}`);
```

## Durability and Damage

### Durability Methods
- **`getMaxDurability()`** - Returns maximum durability (returns 0 for non-damageable items)
- **`getDurability()`** - Returns current remaining durability
- **`getDamage()`** - Returns damage taken
- **`getMaxDamage()`** - Returns maximum damage (same as getMaxDurability())
- **`isDamageable()`** - Returns true if item can be damaged
- **`isUnbreakable()`** - Returns true if item has unbreakable flag

```javascript
const sword = Player.getMainHand();
if (sword.isDamageable()) {
    const currentDurability = sword.getDurability();
    const maxDurability = sword.getMaxDurability();
    const durabilityPercent = (currentDurability / maxDurability) * 100;

    Chat.log(`Sword durability: ${Math.round(durabilityPercent)}%`);

    if (durabilityPercent < 10) {
        Chat.log("Warning: Sword almost broken!");
    }
}
```

## Enchantments

### Enchantment Information
- **`getEnchantments()`** - Returns list of all enchantments as EnchantmentHelper objects
- **`getEnchantment(id)`** - Returns specific enchantment by ID or null if not present
- **`hasEnchantment(id)`** - Returns true if item has specific enchantment
- **`hasEnchantment(enchantmentHelper)`** - Returns true if item has specific enchantment
- **`isEnchanted()`** - Returns true if item has any enchantments
- **`isEnchantable()`** - Returns true if item can be enchanted
- **`getPossibleEnchantments()`** - Returns all enchantments that can be applied to this item
- **`getPossibleEnchantmentsFromTable()`** - Returns enchantments available from enchanting table
- **`canBeApplied(enchantment)`** - Returns true if enchantment can be applied to this item

```javascript
const pickaxe = Player.getMainHand();

// Check if pickaxe is enchanted
if (pickaxe.isEnchanted()) {
    const enchantments = pickaxe.getEnchantments();

    for (const enchantment of enchantments) {
        Chat.log(`Enchantment: ${enchantment.getName()} Level: ${enchantment.getLevel()}`);
    }
}

// Check for specific enchantments
if (pickaxe.hasEnchantment("minecraft:efficiency")) {
    const efficiency = pickaxe.getEnchantment("minecraft:efficiency");
    Chat.log(`Efficiency level: ${efficiency.getLevel()}`);
}

// Get possible enchantments for this item
const possible = pickaxe.getPossibleEnchantments();
Chat.log(`Possible enchantments: ${possible.map(e => e.getName()).join(", ")}`);
```

## NBT Data

### NBT Access
- **`getNBT()`** - Returns NBT data as NBTElementHelper or null if no NBT
- **`isNBTEqual(itemStackHelper)`** - Compare NBT data with another stack
- **`isNBTEqual(itemStack)`** - Compare NBT data with vanilla ItemStack

```javascript
const item = Player.getMainHand();
const nbt = item.getNBT();

if (nbt) {
    Chat.log(`Item has NBT data: ${nbt.toString()}`);

    // Access specific NBT values
    if (nbt.has("display")) {
        const display = nbt.get("display");
        Chat.log(`Display NBT: ${display}`);
    }
}

// Compare NBT with another item
const offhand = Player.getOffHand();
if (item.isNBTEqual(offhand)) {
    Chat.log("Main hand and off hand items have identical NBT");
}
```

## Item Comparison

### Equality Methods
- **`equals(itemStackHelper)`** - Full equality (item, components, NBT)
- **`equals(itemStack)`** - Full equality with vanilla ItemStack
- **`isItemEqual(itemStackHelper)`** - Item equality including damage
- **`isItemEqual(itemStack)`** - Item equality including damage with vanilla ItemStack
- **`isItemEqualIgnoreDamage(itemStackHelper)`** - Item equality ignoring damage
- **`isItemEqualIgnoreDamage(itemStack)`** - Item equality ignoring damage with vanilla ItemStack

```javascript
const mainHand = Player.getMainHand();
const offhand = Player.getOffHand();

// Check if items are exactly the same (including damage and NBT)
if (mainHand.equals(offhand)) {
    Chat.log("Items are identical");
}

// Check if items are the same type and damage
if (mainHand.isItemEqual(offhand)) {
    Chat.log("Items are the same type and damage");
}

// Check if items are the same type, ignoring damage
if (mainHand.isItemEqualIgnoreDamage(offhand)) {
    Chat.log("Items are the same type");
}
```

## Combat and Tools

### Combat Properties
- **`getAttackDamage()`** - Returns attack damage value
- **`isSuitableFor(blockHelper)`** - Returns true if tool can mine block
- **`isSuitableFor(blockStateHelper)`** - Returns true if tool can mine block state

```javascript
const tool = Player.getMainHand();

// Get attack damage
const damage = tool.getAttackDamage();
Chat.log(`Attack damage: ${damage}`);

// Check if tool is suitable for mining block at cursor
const block = Player.getTargetedBlock();
if (block && tool.isSuitableFor(block)) {
    Chat.log("This tool is suitable for mining the targeted block");
}
```

## Lore and Display

### Lore Methods
- **`getLore()`** - Returns list of lore lines as TextHelper objects

```javascript
const item = Player.getMainHand();
const lore = item.getLore();

if (lore.length > 0) {
    Chat.log("Item lore:");
    for (let i = 0; i < lore.length; i++) {
        Chat.log(`${i + 1}: ${lore[i]}`);
    }
}
```

## Special Item Properties

### Adventure Mode Restrictions
- **`hasDestroyRestrictions()`** - Returns true if item has can_destroy restrictions
- **`hasPlaceRestrictions()`** - Returns true if item has can_place_on restrictions
- **`getDestroyRestrictions()`** - Returns list of block predicates for destroy restrictions
- **`getPlaceRestrictions()`** - Returns list of block predicates for place restrictions

### Tooltip Visibility
- **`areEnchantmentsHidden()`** - Returns true if enchantments are hidden in tooltip
- **`areModifiersHidden()`** - Returns true if attribute modifiers are hidden
- **`isUnbreakableHidden()`** - Returns true if unbreakable flag is hidden
- **`isCanDestroyHidden()`** - Returns true if can_destroy flag is hidden
- **`isCanPlaceHidden()`** - Returns true if can_place_on flag is hidden
- **`isDyeHidden()`** - Returns true if armor dye color is hidden

### Other Properties
- **`getRepairCost()`** - Returns repair cost in experience levels
- **`isOnCooldown()`** - Returns true if item is on cooldown
- **`getCooldownProgress()`** - Returns cooldown progress (0.0 to 1.0)

```javascript
const item = Player.getMainHand();

// Check adventure mode restrictions
if (item.hasDestroyRestrictions()) {
    const restrictions = item.getDestroyRestrictions();
    Chat.log(`Can destroy ${restrictions.length} types of blocks`);
}

// Check tooltip visibility
if (item.areEnchantmentsHidden()) {
    Chat.log("Enchantments are hidden in tooltip");
}

// Check cooldown
if (item.isOnCooldown()) {
    const progress = item.getCooldownProgress();
    Chat.log(`Cooldown: ${Math.round(progress * 100)}%`);
}
```

## Utility Methods

### Item Operations
- **`copy()`** - Creates a copy of this item stack
- **`getCreative()`** - Returns CreativeItemStackHelper for modification
- **`getItem()`** - Returns ItemHelper representing the base item
- **`toString()`** - Returns string representation

```javascript
const item = Player.getMainHand();

// Create a copy
const itemCopy = item.copy();

// Get creative helper for modification
const creative = item.getCreative();
// Note: This provides access to creative-mode modification methods

// Get base item
const baseItem = item.getItem();
Chat.log(`Base item ID: ${baseItem.getItemId()}`);

// String representation
Chat.log(item.toString());
```

## Usage Examples

### Example 1: Item Sorting and Filtering
```javascript
function sortInventory() {
    const inventory = Player.getInventory();
    const items = inventory.getItems();

    // Filter diamonds
    const diamonds = items.filter(item =>
        item.getItemId() === "minecraft:diamond" && !item.isEmpty()
    );

    Chat.log(`Found ${diamonds.length} diamond stacks`);

    // Count total diamonds
    const totalDiamonds = diamonds.reduce((sum, item) => sum + item.getCount(), 0);
    Chat.log(`Total diamonds: ${totalDiamonds}`);

    // Find enchanted items
    const enchantedItems = items.filter(item => item.isEnchanted());
    Chat.log(`Enchanted items: ${enchantedItems.length}`);
}
```

### Example 2: Tool Durability Monitor
```javascript
function checkToolDurability() {
    const mainHand = Player.getMainHand();

    if (!mainHand.isDamageable()) {
        return; // Not a tool or weapon
    }

    const maxDurability = mainHand.getMaxDurability();
    const currentDurability = mainHand.getDurability();
    const durabilityPercent = (currentDurability / maxDurability) * 100;

    const itemName = mainHand.getName().getString();

    if (durabilityPercent < 10) {
        Chat.log(`§cCRITICAL: ${itemName} is almost broken! (${Math.round(durabilityPercent)}%)`);
    } else if (durabilityPercent < 25) {
        Chat.log(`§eWarning: ${itemName} durability is low (${Math.round(durabilityPercent)}%)`);
    }

    // Check for important enchantments
    if (mainHand.hasEnchantment("minecraft:unbreaking")) {
        const unbreaking = mainHand.getEnchantment("minecraft:unbreaking");
        Chat.log(`Unbreaking level: ${unbreaking.getLevel()}`);
    }
}
```

### Example 3: Item Analysis
```javascript
function analyzeItem(item) {
    if (item.isEmpty()) {
        Chat.log("Empty item");
        return;
    }

    Chat.log(`=== Item Analysis ===`);
    Chat.log(`ID: ${item.getItemId()}`);
    Chat.log(`Name: ${item.getName().getString()}`);
    Chat.log(`Count: ${item.getCount()}/${item.getMaxCount()}`);

    // Durability
    if (item.isDamageable()) {
        Chat.log(`Durability: ${item.getDurability()}/${item.getMaxDurability()}`);
    }

    // Enchantments
    if (item.isEnchanted()) {
        Chat.log("Enchantments:");
        for (const enchant of item.getEnchantments()) {
            Chat.log(`  - ${enchant.getName()} ${enchantment.getLevel()}`);
        }
    }

    // Tags
    const tags = item.getTags();
    if (tags.length > 0) {
        Chat.log(`Tags: ${tags.join(", ")}`);
    }

    // Special properties
    if (item.isUnbreakable()) Chat.log("Unbreakable: Yes");
    if (item.isFood()) Chat.log("Is Food: Yes");
    if (item.isTool()) Chat.log("Is Tool: Yes");
    if (item.isWearable()) Chat.log("Is Wearable: Yes");
}
```

### Example 4: Enchantment Finder
```javascript
function findBestEnchantments(itemType) {
    // Create a dummy item stack
    const item = new ItemStackHelper(itemType, 1);

    const possibleEnchants = item.getPossibleEnchantmentsFromTable();
    Chat.log(`Possible enchantments for ${itemType}:`);

    for (const enchantment of possibleEnchants) {
        const maxLevel = enchantment.getMaxLevel();
        const rarity = enchantment.getRarity();
        const isTreasure = enchantment.isTreasure();

        Chat.log(`- ${enchantment.getName()} (Max: ${maxLevel}, Rarity: ${rarity}${isTreasure ? ", Treasure" : ""})`);
    }
}

// Find enchantments for diamond pickaxe
findBestEnchantments("minecraft:diamond_pickaxe");
```

## Important Notes

1. **Immutability**: `ItemStackHelper` objects are immutable wrappers around Minecraft's ItemStack. Use `copy()` to create independent copies.

2. **Creative Modifications**: For modifying item properties, use `getCreative()` to obtain a `CreativeItemStackHelper` instance.

3. **Text Handling**: Name and lore methods return `TextHelper` objects, not strings. Use `.getString()` to get the string representation.

4. **Namespace Handling**: Item and enchantment IDs can be specified with or without namespace (e.g., both "minecraft:diamond" and "diamond" work).

5. **Performance**: Some methods like `getPossibleEnchantments()` may be computationally expensive. Cache results when possible.

6. **Thread Safety**: Always access item helpers from the main Minecraft thread unless using JSMacros' thread-safe APIs.

7. **Null Checks**: Methods like `getEnchantment()` can return null. Always check for null before using the result.

8. **NBT Data**: Not all items have NBT data. `getNBT()` returns null for items without custom NBT.

## Related Classes

- **`CreativeItemStackHelper`** - Provides methods for modifying item properties
- **`EnchantmentHelper`** - Represents enchantments with their properties
- **`ItemHelper`** - Represents base items without stack-specific data
- **`TextHelper`** - Handles text formatting and styling
- **`NBTElementHelper`** - Provides access to NBT data structures

This class is one of the most frequently used in JSMacros scripts due to its central role in item management and inventory operations.