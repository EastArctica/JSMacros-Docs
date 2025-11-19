# SmithingInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.SmithingInventory`

**Extends:** `Inventory<SmithingScreen>`

**Since:** `1.8.4`

The `SmithingInventory` class provides specialized access to Minecraft's smithing table interface, allowing scripts to interact with smithing operations such as upgrading diamond gear to netherite gear. This class extends the base `Inventory` class and adds smithing-specific functionality for managing the input slots and output slot.

Smithing tables in Minecraft have three main slots:
- **Left Input (Slot 0):** The template item (e.g., Netherite Upgrade Smithing Template)
- **Right Input (Slot 1):** The base item to be upgraded (e.g., Diamond Sword) and the mineral (e.g., Netherite Ingot)
- **Output (Slot 2):** The resulting upgraded item after applying the smithing operation

## Accessing SmithingInventory

You typically get `SmithingInventory` instances when the player has a smithing table screen open:

```javascript
// Check if current screen is a smithing table
const inv = Inventory.create();
if (inv && inv.getType() === "Smithing") {
    const smithing = inv; // Already typed as SmithingInventory
    Chat.log("Smithing table inventory detected!");
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Slot Access
- [instance.getLeftInput()](#instancegetleftinput)
- [instance.getRightInput()](#instancegetrightinput)
- [instance.getOutput()](#instancegetoutput)

---

## Method Details

### Slot Access

## Inherited Methods

From the base `Inventory` class, `SmithingInventory` inherits all standard inventory management methods:

### Slot Management
- `getSlot(slot)` - Get item at specific slot index
- `getTotalSlots()` - Get total number of slots
- `getSlotPos(slot)` - Get x/y position of a slot
- `getSlotUnderMouse()` - Get slot index under mouse cursor

### Item Operations
- `click(slot)` - Click a slot
- `click(slot, mouseButton)` - Click with specific mouse button
- `quick(slot)` - Shift-click to move items
- `dropSlot(slot)` - Drop items from slot
- `swapHotbar(slot, hotbarSlot)` - Swap with hotbar slot

### Search and Query
- `contains(item)` - Check if inventory contains item
- `findItem(item)` - Find all slots with specific item
- `getItems()` - Get all non-empty items
- `getItemCount()` - Get item counts by type

### Utility
- `getHeld()` - Get item currently held by mouse
- `close()` - Close the inventory
- `getMap()` - Get slot mapping for different sections
- `getType()` - Get inventory type name

---

## Usage Examples

### Basic Smithing Operation

```javascript
function upgradeToNetherite() {
    const inv = Inventory.create();

    // Check if we have a smithing table open
    if (!inv || !inv.is("Smithing")) {
        Chat.log("Please open a smithing table first");
        return false;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();
    const output = inv.getOutput();

    // Check if all required items are present
    if (leftItem.isEmpty()) {
        Chat.log("Please place a smithing template in the left slot");
        return false;
    }

    if (rightItem.isEmpty()) {
        Chat.log("Please place items to upgrade in the right slot");
        return false;
    }

    if (output.isEmpty()) {
        Chat.log("Invalid smithing combination");
        return false;
    }

    // Show upgrade information
    Chat.log("=== Smithing Upgrade ===");
    Chat.log(`Template: ${leftItem.getName().getString()}`);
    Chat.log(`Input: ${rightItem.getName().getString()}`);
    Chat.log(`Output: ${output.getName().getString()}`);

    // Apply the upgrade
    inv.quick(2); // Shift-click output to inventory
    Chat.log(`Successfully upgraded to ${output.getName().getString()}!`);

    return true;
}

// Example usage
upgradeToNetherite();
```

### Auto-Smithing Function

```javascript
function autoSmithingUpgrade() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Smithing")) {
        Chat.log("Please open a smithing table first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();
    const output = inv.getOutput();

    // Auto-detect and execute upgrade
    if (!leftItem.isEmpty() && !rightItem.isEmpty() && !output.isEmpty()) {
        const isNetheriteUpgrade = output.getItemId().includes("netherite");
        const isDiamondBase = rightItem.getItemId().includes("diamond");

        if (isNetheriteUpgrade && isDiamondBase) {
            Chat.log("✨ Auto-applying Netherite upgrade...");

            // Show what's being upgraded
            const itemName = rightItem.getName().getString();
            const resultName = output.getName().getString();

            Chat.log(`Upgrading: ${itemName} → ${resultName}`);

            // Apply upgrade
            inv.quick(2);
            Chat.log("Netherite upgrade complete!");
        } else {
            Chat.log("Non-netherite upgrade detected - please confirm manually");
        }
    } else {
        Chat.log("Incomplete smithing setup");

        if (leftItem.isEmpty()) {
            Chat.log("- Missing smithing template (left slot)");
        }
        if (rightItem.isEmpty()) {
            Chat.log("- Missing items to upgrade (right slot)");
        }
        if (output.isEmpty()) {
            Chat.log("- Invalid upgrade combination");
        }
    }
}

// Example usage
autoSmithingUpgrade();
```

### Smithing Inventory Monitor

```javascript
function monitorSmithingTable() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Smithing")) {
        return;
    }

    function updateDisplay() {
        const leftItem = inv.getLeftInput();
        const rightItem = inv.getRightInput();
        const output = inv.getOutput();

        let status = "&fSmithing Status: ";

        if (leftItem.isEmpty()) {
            status += "&7Waiting for template";
        } else if (rightItem.isEmpty()) {
            status += "&7Template ready, waiting for items";
        } else if (output.isEmpty()) {
            status += "&cInvalid combination";
        } else {
            status += "&aUpgrade ready!";

            // Show what upgrade is available
            const baseItem = rightItem.getName().getString();
            const resultItem = output.getName().getString();

            if (resultItem.includes("netherite")) {
                status += " &8- &6Netherite Upgrade: &f" + baseItem + " → " + resultItem;
            } else {
                status += " &8- &7" + baseItem + " → " + resultItem;
            }
        }

        Chat.actionbar(status);
    }

    // Update display every 5 ticks while smithing table is open
    let tickCount = 0;
    const monitor = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Smithing")) {
            JsMacros.off(monitor);
            Chat.actionbar("&7Smithing table closed");
            return;
        }

        if (tickCount % 5 === 0) { // Update every 5 ticks (0.25 seconds)
            updateDisplay();
        }
        tickCount++;
    }));
}

// Example usage - call when smithing table is opened
monitorSmithingTable();
```

### Smithing Template Manager

```javascript
function organizeSmithingTemplates() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Smithing")) {
        Chat.log("Please open a smithing table first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();

    // Auto-suggest templates based on input items
    if (!rightItem.isEmpty() && leftItem.isEmpty()) {
        const baseItem = rightItem.getItemId();
        let suggestedTemplate = null;

        // Suggest appropriate template based on item type
        if (baseItem.includes("diamond")) {
            suggestedTemplate = "minecraft:netherite_upgrade_smithing_template";
        } else if (baseItem.includes("iron")) {
            suggestedTemplate = "minecraft:netherite_upgrade_smithing_template";
        } else if (baseItem.includes("golden")) {
            suggestedTemplate = "minecraft:netherite_upgrade_smithing_template";
        }

        if (suggestedTemplate) {
            // Try to find the template in player inventory
            const playerInv = Player.getPlayer().getInventory();
            const templateSlots = playerInv.findItem(suggestedTemplate);

            if (templateSlots.length > 0) {
                Chat.log(`&6Found ${suggestedTemplate.replace("minecraft:", "")} in inventory`);
                Chat.log("&7Click to place it in the template slot");

                // You could automate this by clicking the template slot
                // inv.click(0); // Click left input slot
            } else {
                Chat.log(`&cNo ${suggestedTemplate.replace("minecraft:", "")} found in inventory`);
            }
        }
    }

    // Show current smithing setup
    Chat.log("=== Smithing Table Status ===");

    if (!leftItem.isEmpty()) {
        Chat.log(`Template: ${leftItem.getName().getString()}`);
    }

    if (!rightItem.isEmpty()) {
        Chat.log(`Items: ${rightItem.getName().getString()}`);
    }

    const output = inv.getOutput();
    if (!output.isEmpty()) {
        Chat.log(`Result: ${output.getName().getString()}`);

        // Check if this is a valuable upgrade
        if (output.getItemId().includes("netherite")) {
            Chat.log("&6✨ Valuable Netherite upgrade available!");
        }
    } else {
        Chat.log("No upgrade possible with current setup");
    }
}

// Example usage
organizeSmithingTemplates();
```

### Smart Smithing Assistant

```javascript
function smartSmithingAssistant() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Smithing")) {
        Chat.log("Please open a smithing table first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();
    const output = inv.getOutput();

    Chat.log("=== Smart Smithing Assistant ===");

    // Analyze current setup
    const hasTemplate = !leftItem.isEmpty();
    const hasItems = !rightItem.isEmpty();
    const hasOutput = !output.isEmpty();

    // Check for common issues and provide solutions
    if (!hasTemplate) {
        Chat.log("&cIssue: No smithing template in left slot");

        // Check player inventory for templates
        const playerInv = Player.getPlayer().getInventory();
        const netheriteTemplate = playerInv.findItem("minecraft:netherite_upgrade_smithing_template");

        if (netheriteTemplate.length > 0) {
            Chat.log("&aSolution: Found netherite upgrade template in inventory");
            Chat.log("&7Click left slot to place it");
        } else {
            Chat.log("&cSolution: You need a netherite upgrade template");
            Chat.log("&7Obtain one from a bastion remnant or craft with nether quartz");
        }
    }

    if (!hasItems && hasTemplate) {
        Chat.log("&cIssue: No items to upgrade in right slot");
        Chat.log("&7Place diamond gear and netherite ingots to upgrade");
    }

    if (hasTemplate && hasItems && !hasOutput) {
        Chat.log("&cIssue: Invalid combination");
        Chat.log("&7Check if you have the correct template and materials");

        // Show what you have
        Chat.log(`Template: ${leftItem.getName().getString()}`);
        Chat.log(`Materials: ${rightItem.getName().getString()}`);
    }

    if (hasOutput) {
        Chat.log("&aSuccess: Upgrade ready!");

        const upgradeType = leftItem.getName().getString();
        const result = output.getName().getString();

        Chat.log(`Upgrade: ${upgradeType}`);
        Chat.log(`Result: ${result}`);

        // Highlight valuable upgrades
        if (result.includes("netherite")) {
            Chat.log("&6⭐ Premium Netherite upgrade available!");
            Chat.log("&7This upgrade significantly improves your equipment");
        }

        // Auto-apply if it's a basic, safe upgrade
        if (result.includes("netherite") && !result.includes("trident")) {
            Chat.log("&2Auto-applying upgrade...");
            inv.quick(2);
            Chat.log(`&aSuccessfully crafted ${result}!`);
        } else {
            Chat.log("&7Click output slot to apply upgrade");
        }
    }

    // Provide helpful tips
    Chat.log("\n&8Smithing Tips:");
    Chat.log("&8• Netherite upgrades require: Template + Diamond Item + Netherite Ingot");
    Chat.log("&8• Netherite gear doesn't burn in fire/lava");
    Chat.log("&8• Netherite gear has higher durability and knockback resistance");
    Chat.log("&8• Smithing templates can be copied using more templates");
}

// Example usage
smartSmithingAssistant();
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends `Inventory<SmithingScreen>`
- Built on Minecraft's SmithingScreen and SmithingScreenHandler

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `ItemStackHelper` - Represents items in smithing slots
- `PlayerInventory` - Player's main inventory interface
- `ContainerInventory` - Generic container inventory functionality

## Notes and Limitations

- Smithing tables are used for upgrading diamond gear to netherite gear
- Requires a smithing template (left slot), base item + materials (right slot)
- Smithing templates are required for netherite upgrades (introduced in Minecraft 1.20)
- Netherite gear provides superior durability and fire resistance
- The smithing interface must be open to use `SmithingInventory` methods
- All operations require the correct combination of template, base item, and materials
- Upgrades are only applied when items are taken from the output slot
- Smithing templates can be duplicated using the crafting table