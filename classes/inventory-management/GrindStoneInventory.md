# GrindStoneInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.GrindStoneInventory`

**Extends:** `Inventory<GrindstoneScreen>`

**Since:** `1.8.4`

The `GrindStoneInventory` class provides specialized access to Minecraft's grindstone interface, allowing scripts to interact with grindstone operations such as disenchanting items and repairing equipment. This class extends the base `Inventory` class and adds grindstone-specific functionality for managing input slots, output results, and experience calculation.

Grindstones in Minecraft have three main slots:
- **Top Input (Slot 0):** The upper item to be disenchanted or repaired
- **Bottom Input (Slot 1):** The lower item to be disenchanted or repaired
- **Output (Slot 2):** The resulting item after removing enchantments

## Accessing GrindStoneInventory

You typically get `GrindStoneInventory` instances when the player has a grindstone screen open:

```javascript
// Check if current screen is a grindstone
const inv = Inventory.create();
if (inv && inv.getType() === "Grindstone") {
    const grindstone = inv; // Already typed as GrindStoneInventory
    Chat.log("Grindstone inventory detected!");
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Slot Access
- [instance.getTopInput()](#instancegettopinput)
- [instance.getBottomInput()](#instancegetbottominput)
- [instance.getOutput()](#instancegetoutput)

### Experience Calculation
- [instance.simulateXp()](#instancesimulatexp)

---

## Method Details

### Slot Access

### Experience Calculation

## Inherited Methods

From the base `Inventory` class, `GrindStoneInventory` inherits all standard inventory management methods:

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

### Basic Disenchanting Function

```javascript
function disenchantItem() {
    const inv = Inventory.create();

    // Check if we have a grindstone open
    if (!inv || !inv.is("Grindstone")) {
        Chat.log("Please open a grindstone first");
        return false;
    }

    const topItem = inv.getTopInput();
    const bottomItem = inv.getBottomInput();

    // Check if there's an item to disenchant
    if (topItem.isEmpty() && bottomItem.isEmpty()) {
        Chat.log("Please place an item in the grindstone");
        return false;
    }

    // Make sure only one slot is occupied
    if (!topItem.isEmpty() && !bottomItem.isEmpty()) {
        Chat.log("Please remove one item - grindstone can only process one at a time");
        return false;
    }

    const item = topItem.isEmpty() ? bottomItem : topItem;

    if (!item.isEnchanted() && (!item.isDamageable() || item.getDurability() === item.getMaxDurability())) {
        Chat.log("This item doesn't need processing (no enchantments or damage)");
        return false;
    }

    // Calculate expected XP
    const xpReward = inv.simulateXp();
    Chat.log(`Expected XP: ${xpReward} - ${xpReward * 2} orbs`);

    // Check if output is ready
    const output = inv.getOutput();
    if (!output.isEmpty()) {
        Chat.log(`Disenchanting: ${item.getName().getString()}`);
        Chat.log(`Result: ${output.getName().getString()}`);

        // Take the result
        inv.quick(2);
        Chat.log("Disenchanting complete!");
        return true;
    } else {
        Chat.log("Waiting for disenchanting process...");
        return false;
    }
}

// Example usage
disenchantItem();
```

### Batch Disenchanting Automation

```javascript
function batchDisenchant(maxItems = 10) {
    const inv = Inventory.create();

    if (!inv || !inv.is("Grindstone")) {
        Chat.log("Please open a grindstone first");
        return;
    }

    let processed = 0;
    let totalXP = 0;

    Chat.log(`Starting batch disenchanting (max ${maxItems} items)...`);

    function processNextItem() {
        if (processed >= maxItems) {
            Chat.log(`Batch complete! Processed ${processed} items for ~${totalXP} XP`);
            return;
        }

        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Grindstone")) {
            Chat.log("Grindstone closed - stopping batch process");
            return;
        }

        const topItem = currentInv.getTopInput();
        const bottomItem = currentInv.getBottomInput();
        const output = currentInv.getOutput();

        // Check if we need to load next item
        if (topItem.isEmpty() && bottomItem.isEmpty()) {
            // Find next enchanted item in inventory
            const enchantedItems = [];
            const allItems = currentInv.getItems("main", "hotbar");

            for (const item of allItems) {
                if (item.isEnchanted()) {
                    enchantedItems.push(item);
                }
            }

            if (enchantedItems.length === 0) {
                Chat.log("No more enchanted items found");
                Chat.log(`Batch complete! Processed ${processed} items for ~${totalXP} XP`);
                return;
            }

            // Move first enchanted item to grindstone
            const targetItem = enchantedItems[0];
            const itemSlots = currentInv.findItem(targetItem.getItemId());

            if (itemSlots.length > 0) {
                currentInv.swapHotbar(itemSlots[0], 0);
                currentInv.click(0); // Place in top slot
                Chat.log(`Loaded: ${targetItem.getName().getString()}`);

                // Wait for processing
                setTimeout(processNextItem, 500);
                return;
            }
        }

        // Check if output is ready
        if (!output.isEmpty()) {
            const xpReward = currentInv.simulateXp();
            totalXP += Math.floor(xpReward * 1.5); // Average estimate

            // Take the result
            currentInv.quick(2);
            processed++;

            Chat.log(`Processed ${processed}/${maxItems}: ${output.getName().getString()} (~${Math.floor(xpReward * 1.5)} XP)`);

            // Clear the slot and continue
            setTimeout(processNextItem, 500);
        } else {
            // Still processing, wait longer
            setTimeout(processNextItem, 1000);
        }
    }

    processNextItem();
}

// Example usage
// batchDisenchant(5); // Disenchant up to 5 items
```

### Grindstone XP Calculator

```javascript
function calculateGrindstoneValue() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Grindstone")) {
        Chat.log("Please open a grindstone first");
        return;
    }

    const topItem = inv.getTopInput();
    const bottomItem = inv.getBottomInput();

    Chat.log("=== Grindstone Value Analysis ===");

    let totalMinXP = 0;
    let totalMaxXP = 0;
    let itemCount = 0;

    function analyzeItem(item, slotName) {
        if (item.isEmpty()) return;

        itemCount++;
        Chat.log(`\n${slotName}: ${item.getName().getString()}`);

        if (item.isEnchanted()) {
            const enchantments = item.getEnchantments();
            let itemXP = 0;
            let valuableEnchants = [];

            for (const ench of enchantments) {
                if (!ench.getName().toLowerCase().includes("curse")) {
                    const enchValue = ench.getLevel() * 2; // Rough estimate
                    itemXP += enchValue;
                    valuableEnchants.push(`${ench.getName()} ${ench.getLevel()}`);
                }
            }

            Chat.log(`  Enchantments: ${valuableEnchants.join(", ")}`);
            Chat.log(`  Estimated XP value: ${itemXP}`);

            totalMinXP += Math.ceil(itemXP / 2);
            totalMaxXP += itemXP;
        } else {
            Chat.log("  No enchantments");
        }

        if (item.isDamageable()) {
            const durabilityPercent = (item.getDurability() / item.getMaxDurability()) * 100;
            Chat.log(`  Durability: ${durabilityPercent.toFixed(1)}%`);

            if (durabilityPercent < 100) {
                Chat.log("  Can be repaired at grindstone");
            }
        }
    }

    analyzeItem(topItem, "Top Item");
    analyzeItem(bottomItem, "Bottom Item");

    const actualXP = inv.simulateXp();

    Chat.log("\n=== Summary ===");
    Chat.log(`Items to process: ${itemCount}`);
    Chat.log(`Estimated XP range: ${totalMinXP} - ${totalMaxXP}`);
    Chat.log(`Actual calculation: ${actualXP} - ${actualXP * 2}`);

    if (actualXP > 0) {
        Chat.log("\nEnchantment breakdown (high value):");

        if (!topItem.isEmpty() && topItem.isEnchanted()) {
            for (const ench of topItem.getEnchantments()) {
                if (!ench.getName().toLowerCase().includes("curse")) {
                    Chat.log(`  ${ench.getName()} ${ench.getLevel()}: ~${ench.getLevel() * 2} XP`);
                }
            }
        }

        if (!bottomItem.isEmpty() && bottomItem.isEnchanted()) {
            for (const ench of bottomItem.getEnchantments()) {
                if (!ench.getName().toLowerCase().includes("curse")) {
                    Chat.log(`  ${ench.getName()} ${ench.getLevel()}: ~${ench.getLevel() * 2} XP`);
                }
            }
        }
    }

    Chat.log("===============================");
}

// Example usage
calculateGrindstoneValue();
```

### Smart Grindstone Manager

```javascript
function smartGrindstoneManager() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Grindstone")) {
        Chat.log("Please open a grindstone first");
        return;
    }

    const topItem = inv.getTopInput();
    const bottomItem = inv.getBottomInput();
    const output = inv.getOutput();

    // Auto-process logic
    if (!topItem.isEmpty() || !bottomItem.isEmpty()) {
        if (!output.isEmpty()) {
            const xpReward = inv.simulateXp();

            // Auto-take if XP is decent
            if (xpReward >= 3) {
                inv.quick(2);
                Chat.log(`&aAuto-collected: ${output.getName().getString()} (~${Math.floor(xpReward * 1.5)} XP)`);
            } else {
                Chat.log(`&6Low XP item (${xpReward}-${xpReward * 2}) - manual collection suggested`);
            }
        } else {
            // Provide feedback on what's being processed
            const item = topItem.isEmpty() ? bottomItem : topItem;
            if (item.isEnchanted()) {
                const enchCount = item.getEnchantments().filter(e => !e.getName().toLowerCase().includes("curse")).length;
                Chat.log(`&7Processing: ${item.getName().getString()} (${enchCount} enchantments)`);
            } else if (item.isDamageable() && item.getDurability() < item.getMaxDurability()) {
                Chat.log(`&7Repairing: ${item.getName().getString()}`);
            }
        }
    } else {
        // Suggest items from inventory
        const enchantedItems = [];
        const damagedItems = [];

        const allItems = inv.getItems("main", "hotbar");
        for (const item of allItems) {
            if (item.isEnchanted()) {
                const valuableEnchants = item.getEnchantments().filter(e => !e.getName().toLowerCase().includes("curse"));
                if (valuableEnchants.length > 0) {
                    enchantedItems.push(item);
                }
            } else if (item.isDamageable() && item.getDurability() < item.getMaxDurability() * 0.5) {
                damagedItems.push(item);
            }
        }

        if (enchantedItems.length > 0) {
            Chat.log(`&eFound ${enchantedItems.length} enchanted items to disenchant`);
            Chat.log(`  Top suggestion: ${enchantedItems[0].getName().getString()}`);
        }

        if (damagedItems.length > 0) {
            Chat.log(`&eFound ${damagedItems.length} damaged items to repair`);
            Chat.log(`  Top suggestion: ${damagedItems[0].getName().getString()}`);
        }

        if (enchantedItems.length === 0 && damagedItems.length === 0) {
            Chat.log("&7No items need grindstone processing");
        }
    }
}

// Monitor grindstone automatically
function monitorGrindstone() {
    let tickCount = 0;

    const monitor = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Grindstone")) {
            JsMacros.off(monitor);
            Chat.actionbar("&7Grindstone closed");
            return;
        }

        // Update every 10 ticks (0.5 seconds)
        if (tickCount % 10 === 0) {
            smartGrindstoneManager();
        }
        tickCount++;
    }));

    Chat.log("Grindstone monitor started");
}

// Example usage
monitorGrindstone();
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends `Inventory<GrindstoneScreen>`
- Built on Minecraft's GrindstoneScreen and GrindstoneScreenHandler

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `ItemStackHelper` - Represents items in grindstone slots
- `PlayerInventory` - Player's main inventory interface
- `ContainerInventory` - Generic container inventory functionality

## Notes and Limitations

- Grindstone operations remove all enchantments except curses
- Curses are not removed and do not contribute to XP calculation
- Repair functionality restores item durability based on materials used
- Experience calculation excludes cursed enchantments
- The grindstone interface must be open to use `GrindStoneInventory` methods
- Only one item can be processed at a time (either top or bottom slot, not both)
- XP rewards vary between the calculated minimum and double that amount
- Some operations may not work on all server types due to anti-cheat plugins
- Slot numbering is fixed: 0 = top input, 1 = bottom input, 2 = output
- Always check if `inventory` and `inventory.getType() === "Grindstone"` before operations