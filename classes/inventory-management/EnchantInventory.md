# EnchantInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.EnchantInventory`

**Extends:** `Inventory<EnchantmentScreen>`

**Since:** JsMacros 1.3.1

The `EnchantInventory` class represents an enchantment table interface in JSMacros. It provides access to enchantment options, required experience levels, and methods for performing enchantments. This class is specifically designed to interact with Minecraft's enchantment table GUI, allowing scripts to read available enchantments, check requirements, and automate the enchanting process.

## Overview

The `EnchantInventory` class extends the base `Inventory` class with enchantment-specific functionality:
- Access to all three enchantment options available at the enchantment table
- Required experience levels for each enchantment option
- Enchantment details including names, IDs, and levels
- Methods to perform enchantments programmatically
- Access to the item being enchanted and lapis lazuli used
- Integration with standard inventory operations

## Usage

EnchantInventory instances are typically obtained when the player opens an enchantment table:

```javascript
// Check if current inventory is an enchantment table
const inv = Player.openInventory();
if (inv && inv.getType() === "Enchanting Table") {
    const enchantInv = inv;
    // Use enchantment table specific methods
}
```

Or through the Inventory.create() method:

```javascript
// Get current inventory as EnchantInventory
const enchantInv = Player.openInventory();
if (enchantInv.is("Enchanting Table")) {
    // This is already an EnchantInventory instance
    const requiredLevels = enchantInv.getRequiredLevels();
    Chat.log(`Required levels: ${requiredLevels.join(", ")}`);
}
```

## Methods

## Inherited Methods

As an extension of `Inventory`, EnchantInventory also inherits all standard inventory methods:

- `click(slot, mouseButton)` - Click on a slot
- `quick(slot)` - Shift-click to move items
- `getSlot(slot)` - Get item in a specific slot
- `getTotalSlots()` - Get total number of slots
- `getMap()` - Get slot mapping for different sections
- `close()` - Close the inventory
- And many more standard inventory operations

**Example:**
```javascript
const enchantInv = Player.openInventory();
if (enchantInv && enchantInv.is("Enchanting Table")) {
    // Access specific slots
    const itemSlot = enchantInv.getSlot(0); // Item to enchant
    const lapisSlot = enchantInv.getSlot(1); // Lapis slot

    Chat.log(`Item in slot 0: ${itemSlot.getItemId()}`);
    Chat.log(`Lapis in slot 1: ${lapis.getCount()}`);

    // Use inherited inventory methods
    const map = enchantInv.getMap();
    Chat.log(`Available sections: ${Object.keys(map).join(", ")}`);
}
```

## Usage Examples

### Basic Enchantment Information Display
```javascript
function displayEnchantmentInfo() {
    const enchantInv = Player.openInventory();
    if (!enchantInv || !enchantInv.is("Enchanting Table")) {
        Chat.log("Not at an enchantment table");
        return;
    }

    const player = Player.getPlayer();
    const playerLevel = player.experienceLevel;

    Chat.log("=== Enchantment Table Info ===");
    Chat.log(`Player level: ${playerLevel}`);

    const costs = enchantInv.getRequiredLevels();
    const levels = enchantInv.getEnchantmentLevels();
    const names = enchantInv.getEnchantments();
    const ids = enchantInv.getEnchantmentIds();

    for (let i = 0; i < 3; i++) {
        Chat.log(`\n--- Option ${i + 1} ---`);
        Chat.log(`Cost: ${costs[i]} levels`);
        Chat.log(`Level: ${levels[i]}`);
        Chat.log(`Name: ${names[i] ? names[i].getString() : "None"}`);
        Chat.log(`ID: ${ids[i] || "None"}`);
        Chat.log(`Affordable: ${costs[i] <= playerLevel ? "Yes" : "No"}`);
    }

    const item = enchantInv.getItemToEnchant();
    const lapis = enchantInv.getLapis();

    Chat.log(`\nItem to enchant: ${item.isEmpty() ? "None" : item.getName()}`);
    Chat.log(`Lapis available: ${lapis.getCount()}`);
}
```

### Smart Enchantment Automation
```javascript
function smartEnchant() {
    const enchantInv = Player.openInventory();
    if (!enchantInv || !enchantInv.is("Enchanting Table")) {
        Chat.log("Not at an enchantment table");
        return false;
    }

    const player = Player.getPlayer();
    const playerLevel = player.experienceLevel;
    const costs = enchantInv.getRequiredLevels();
    const helpers = enchantInv.getEnchantmentHelpers();
    const item = enchantInv.getItemToEnchant();

    if (item.isEmpty()) {
        Chat.log("No item to enchant");
        return false;
    }

    // Define desirable enchantments by priority
    const priorityEnchants = [
        "minecraft:sharpness",
        "minecraft:protection",
        "minecraft:efficiency",
        "minecraft:fortune",
        "minecraft:unbreaking",
        "minecraft:mending"
    ];

    // Find best affordable enchantment
    let bestSlot = -1;
    let bestScore = -1;

    for (let i = 0; i < 3; i++) {
        if (costs[i] <= playerLevel && costs[i] > 0 && helpers[i]) {
            const enchant = helpers[i].getEnchantment();
            if (enchant) {
                const enchantId = enchant.getId();
                const level = helpers[i].getLevel();

                // Calculate score based on priority and level
                const priorityIndex = priorityEnchants.indexOf(enchantId);
                const score = priorityIndex >= 0 ? (priorityEnchants.length - priorityIndex) * 10 + level : level;

                if (score > bestScore) {
                    bestScore = score;
                    bestSlot = i;
                }
            }
        }
    }

    if (bestSlot >= 0) {
        const enchant = helpers[bestSlot].getEnchantment();
        const level = helpers[bestSlot].getLevel();
        Chat.log(`Performing enchantment: ${enchant.getName()} level ${level} (cost: ${costs[bestSlot]} levels)`);

        const success = enchantInv.doEnchant(bestSlot);
        if (success) {
            Chat.log("Enchantment successful!");
            return true;
        } else {
            Chat.log("Enchantment failed!");
            return false;
        }
    } else {
        Chat.log("No suitable enchantments available");
        return false;
    }
}
```

### Enchantment Calculator
```javascript
function calculateEnchantmentProbability() {
    const enchantInv = Player.openInventory();
    if (!enchantInv || !enchantInv.is("Enchanting Table")) {
        Chat.log("Not at an enchantment table");
        return;
    }

    const item = enchantInv.getItemToEnchant();
    if (item.isEmpty()) {
        Chat.log("No item to analyze");
        return;
    }

    const costs = enchantInv.getRequiredLevels();
    const helpers = enchantInv.getEnchantmentHelpers();

    Chat.log("=== Enchantment Analysis ===");
    Chat.log(`Item: ${item.getName()}`);
    Chat.log(`Enchantability: ${item.getItem().getEnchantability()}`);

    for (let i = 0; i < 3; i++) {
        if (costs[i] > 0 && helpers[i]) {
            const enchant = helpers[i].getEnchantment();
            const level = helpers[i].getLevel();

            if (enchant) {
                Chat.log(`\nSlot ${i + 1}:`);
                Chat.log(`  Enchantment: ${enchant.getName()} ${level}`);
                Chat.log(`  Cost: ${costs[i]} levels`);
                Chat.log(`  Type: ${enchant.getType()}`);
                Chat.log(`  Rarity: ${enchant.getRarity()}`);
                Chat.log(`  Max Level: ${enchant.getMaxLevel()}`);
                Chat.log(`  Min Level: ${enchant.getMinLevel()}`);
                Chat.log(`  Is Treasure: ${enchant.isTreasure()}`);
                Chat.log(`  Is Curse: ${enchant.isCurse()}`);
                Chat.log(`  Compatible Slots: ${enchant.getEquipmentSlots().join(", ")}`);

                // Show compatible items
                const compatibleItems = enchant.getSupportedItems();
                if (compatibleItems.length > 0) {
                    Chat.log(`  Compatible with: ${compatibleItems.slice(0, 5).join(", ")}${compatibleItems.length > 5 ? "..." : ""}`);
                }
            }
        }
    }
}
```

### Batch Enchantment with Multiple Items
```javascript
function batchEnchant(items) {
    if (!items || items.length === 0) {
        Chat.log("No items provided for batch enchanting");
        return;
    }

    let enchantedCount = 0;
    let failedCount = 0;

    for (const itemData of items) {
        // Find item in inventory
        const playerInv = Player.getInventory();
        const slots = playerInv.findItem(itemData.itemId);

        if (slots.length === 0) {
            Chat.log(`Item ${itemData.itemId} not found in inventory`);
            continue;
        }

        // Open enchantment table
        const enchantInv = Player.openInventory();
        if (!enchantInv || !enchantInv.is("Enchanting Table")) {
            Chat.log("Enchantment table not open");
            break;
        }

        // Place item in enchantment slot
        const sourceSlot = slots[0];
        const enchantSlot = 0;
        enchantInv.click(sourceSlot).click(enchantSlot);

        // Wait a moment for enchantments to update
        Time.sleep(500);

        // Try to enchant
        if (smartEnchant()) {
            enchantedCount++;
            Chat.log(`Successfully enchanted ${itemData.itemId}`);
        } else {
            failedCount++;
            Chat.log(`Failed to enchant ${itemData.itemId}`);
        }

        // Take back the item (enchanted or not)
        enchantInv.click(enchantSlot).click(sourceSlot);

        // Small delay between enchantments
        Time.sleep(1000);
    }

    Chat.log(`Batch enchanting complete: ${enchantedCount} successful, ${failedCount} failed`);
}

// Example usage:
// batchEnchant([
//     { itemId: "minecraft:diamond_sword" },
//     { itemId: "minecraft:diamond_pickaxe" },
//     { itemId: "minecraft:diamond_chestplate" }
// ]);
```

### Enchantment Table Monitor
```javascript
let enchantTableOpen = false;

function monitorEnchantmentTable() {
    events.on("OpenScreen", JavaWrapper.methodToJavaAsync((event) => {
        const inv = Player.openInventory();
        if (inv && inv.is("Enchanting Table")) {
            enchantTableOpen = true;
            Chat.log("Enchantment table opened");
            displayEnchantmentInfo();
        } else {
            enchantTableOpen = false;
        }
    }));

    events.on("CloseScreen", JavaWrapper.methodToJavaAsync((event) => {
        if (enchantTableOpen) {
            enchantTableOpen = false;
            Chat.log("Enchantment table closed");
        }
    }));

    // Monitor enchantment table updates
    events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        if (enchantTableOpen) {
            const enchantInv = Player.openInventory();
            if (enchantInv && enchantInv.is("Enchanting Table")) {
                // Could add real-time monitoring here
                // For example, auto-update display when player levels change
            }
        }
    }));
}

monitorEnchantmentTable();
```

## Important Notes

1. **Inventory Access:** EnchantInventory is only available when the player has an enchantment table GUI open.

2. **Slot Indexing:** Enchantment options are indexed 0-2, corresponding to the three enchantment choices displayed in-game.

3. **Experience Levels:** The `getRequiredLevels()` method returns the experience levels required, not experience points.

4. **Enchantment Availability:** Some enchantment slots may show 0 cost or empty enchantments if they're not available.

5. **Bookshelves:** The available enchantments and their levels depend on the number of bookshelves around the enchantment table (max 15).

6. **Item Compatibility:** Not all items can be enchanted at the enchantment table. Only tools, weapons, and armor can be enchanted here.

7. **Lapis Lazuli:** Enchanting requires lapis lazuli in the second slot. The amount needed depends on the enchantment slot used.

8. **Server Compatibility:** Some methods may behave differently on different servers due to anti-cheat or plugin modifications.

9. **Timing:** When performing enchantments programmatically, consider adding small delays between actions to avoid overwhelming the server.

10. **Enchantment Randomness:** Enchantment results are partially random, even with the same item and setup.

## Related Classes

- `Inventory` - Base class providing standard inventory functionality
- `ItemStackHelper` - Helper class for item information and manipulation
- `EnchantmentHelper` - Helper class for enchantment details and properties
- `TextHelper` - Helper class for text formatting and display
- `PlayerInventory` - Player's main inventory for item management

## Version History

- **1.3.1:** Initial release with basic enchantment functionality
- **1.8.4:** Added `getEnchantmentHelpers()`, `getItemToEnchant()`, and `getLapis()` methods
- **Current:** Enhanced with comprehensive enchantment access and automation capabilities