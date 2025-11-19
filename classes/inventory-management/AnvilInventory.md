# AnvilInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.AnvilInventory`

**Extends:** `Inventory<AnvilScreen>`

**Since:** `1.8.4`

The `AnvilInventory` class provides specialized access to Minecraft's anvil interface, allowing scripts to interact with anvil operations such as renaming items, repairing items, and combining enchantments. This class extends the base `Inventory` class and adds anvil-specific functionality for managing the rename field, level costs, and input/output slots.

Anvils in Minecraft have three main slots:
- **Left Input (Slot 0):** The item to be renamed, repaired, or enchanted
- **Right Input (Slot 1):** The sacrifice material for repairing or enchanting
- **Output (Slot 2):** The resulting item after applying the anvil operation

## Accessing AnvilInventory

You typically get `AnvilInventory` instances when the player has an anvil screen open:

```javascript
// Check if current screen is an anvil
const inv = Inventory.create();
if (inv && inv.getType() === "Anvil") {
    const anvil = inv; // Already typed as AnvilInventory
    Chat.log("Anvil inventory detected!");
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Name Management
- [instance.getName()](#instancegetname)
- [instance.setName()](#instancesetname)

### Cost and Repair Information
- [instance.getLevelCost()](#instancegetlevelcost)
- [instance.getItemRepairCost()](#instancegetitemrepaircost)
- [instance.getMaximumLevelCost()](#instancegetmaximumlevelcost)

### Slot Access
- [instance.getLeftInput()](#instancegetleftinput)
- [instance.getRightInput()](#instancegetrightinput)
- [instance.getOutput()](#instancegetoutput)

---

## Method Details

### Name Management

### Cost and Repair Information

### Slot Access

## Inherited Methods

From the base `Inventory` class, `AnvilInventory` inherits all standard inventory management methods:

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

### Basic Anvil Operations

```javascript
function renameItem(itemName) {
    const inv = Inventory.create();

    // Check if we have an anvil open
    if (!inv || !inv.is("Anvil")) {
        Chat.log("Please open an anvil first");
        return false;
    }

    const leftItem = inv.getLeftInput();
    if (leftItem.isEmpty()) {
        Chat.log("Please place an item in the left slot");
        return false;
    }

    // Set the new name
    inv.setName(itemName);
    Chat.log(`Set name to: "${itemName}"`);

    // Check if operation is possible and affordable
    const cost = inv.getLevelCost();
    if (cost === 0) {
        Chat.log("Operation not possible");
        return false;
    }

    if (cost > Player.getPlayer().experienceLevel) {
        Chat.log(`Not enough levels! Need ${cost}, have ${Player.getPlayer().experienceLevel}`);
        return false;
    }

    // Take the output to apply the rename
    const output = inv.getOutput();
    if (!output.isEmpty()) {
        inv.quick(2); // Shift-click output to inventory
        Chat.log(`Successfully renamed to "${output.getName().getString()}"`);
        return true;
    }

    return false;
}

// Example usage
renameItem("Legendary Blade");
```

### Auto-Repair Function

```javascript
function autoRepair() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Anvil")) {
        Chat.log("Please open an anvil first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();

    if (leftItem.isEmpty()) {
        Chat.log("Please place a damaged item in the left slot");
        return;
    }

    if (!leftItem.isDamageable()) {
        Chat.log("Item cannot be repaired");
        return;
    }

    if (rightItem.isEmpty()) {
        Chat.log("Please place repair material in the right slot");
        return;
    }

    // Check if this is a valid repair
    const output = inv.getOutput();
    if (output.isEmpty()) {
        Chat.log("Invalid repair combination");
        return;
    }

    const cost = inv.getLevelCost();
    const playerLevel = Player.getPlayer().experienceLevel;

    if (cost > playerLevel) {
        Chat.log(`Not enough levels! Need ${cost}, have ${playerLevel}`);
        return;
    }

    // Show repair information
    const durabilityBefore = leftItem.getDurability();
    const durabilityAfter = output.getDurability();
    const repairAmount = durabilityAfter - durabilityBefore;

    Chat.log(`Repairing ${leftItem.getName().getString()}`);
    Chat.log(`Durability: ${durabilityBefore}/${leftItem.getMaxDurability()} → ${durabilityAfter}/${leftItem.getMaxDurability()}`);
    Chat.log(`Restored: ${repairAmount} durability`);
    Chat.log(`Cost: ${cost} levels`);

    // Perform the repair
    inv.quick(2);
    Chat.log("Repair completed!");
}

// Example usage
autoRepair();
```

### Enchantment Combination

```javascript
function combineEnchantments() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Anvil")) {
        Chat.log("Please open an anvil first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();

    if (leftItem.isEmpty() || rightItem.isEmpty()) {
        Chat.log("Please place two enchanted items in the anvil");
        return;
    }

    if (!leftItem.isEnchanted() && !rightItem.isEnchanted()) {
        Chat.log("Neither item is enchanted");
        return;
    }

    const output = inv.getOutput();
    if (output.isEmpty()) {
        Chat.log("These items cannot be combined");
        return;
    }

    const cost = inv.getLevelCost();

    // Show enchantment information
    Chat.log("=== Enchantment Combination ===");

    if (leftItem.isEnchanted()) {
        Chat.log(`Left item: ${leftItem.getEnchantments().length} enchantments`);
        for (const ench of leftItem.getEnchantments()) {
            Chat.log(`  - ${ench.getName()} ${ench.getLevel()}`);
        }
    }

    if (rightItem.isEnchanted()) {
        Chat.log(`Right item: ${rightItem.getEnchantments().length} enchantments`);
        for (const ench of rightItem.getEnchantments()) {
            Chat.log(`  - ${ench.getName()} ${ench.getLevel()}`);
        }
    }

    if (output.isEnchanted()) {
        Chat.log(`Output: ${output.getEnchantments().length} enchantments`);
        for (const ench of output.getEnchantments()) {
            Chat.log(`  - ${ench.getName()} ${ench.getLevel()}`);
        }
    }

    Chat.log(`Total cost: ${cost} levels`);

    // Check affordability
    if (cost <= Player.getPlayer().experienceLevel) {
        Chat.log("Affordable! Click output to combine.");
    } else {
        Chat.log(`Too expensive! Need ${cost} levels.`);
    }
}

// Example usage
combineEnchantments();
```

### Anvil Cost Calculator

```javascript
function calculateAnvilCosts() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Anvil")) {
        Chat.log("Please open an anvil first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();
    const output = inv.getOutput();

    Chat.log("=== Anvil Cost Analysis ===");

    if (leftItem.isEmpty()) {
        Chat.log("Left slot: Empty");
        return;
    }

    Chat.log(`Item: ${leftItem.getName().getString()}`);
    Chat.log(`Base repair cost: ${inv.getItemRepairCost()}`);

    if (!output.isEmpty()) {
        const levelCost = inv.getLevelCost();
        const maxCost = inv.getMaximumLevelCost();

        Chat.log(`Current operation cost: ${levelCost} levels`);
        Chat.log(`Maximum possible cost: ${maxCost} levels`);
        Chat.log(`Cost efficiency: ${((levelCost / maxCost) * 100).toFixed(1)}%`);

        // Determine operation type
        const currentName = inv.getName();
        const isRename = currentName && currentName !== leftItem.getName().getString();
        const isRepair = leftItem.isDamageable() && output.getDurability() > leftItem.getDurability();
        const isEnchantCombine = rightItem.isEnchanted() && output.isEnchanted();

        if (isRename && !isRepair && !isEnchantCombine) {
            Chat.log("Operation type: Rename only");
        } else if (!isRename && isRepair && !isEnchantCombine) {
            Chat.log("Operation type: Repair only");
        } else if (!isRename && !isRepair && isEnchantCombine) {
            Chat.log("Operation type: Enchantment combination");
        } else {
            Chat.log("Operation type: Combined operation");
        }

        // Cost breakdown estimation
        let estimatedBase = 0;
        if (isRename) estimatedBase += 1;
        if (isRepair) estimatedBase += Math.ceil((output.getDurability() - leftItem.getDurability()) / 25);
        if (isEnchantCombine) {
            for (const ench of rightItem.getEnchantments()) {
                estimatedBase += ench.getLevel() * 2;
            }
        }

        estimatedBase += inv.getItemRepairCost();

        Chat.log(`Estimated base cost: ${estimatedBase} levels`);
        Chat.log(`Additional penalties: ${Math.max(0, levelCost - estimatedBase)} levels`);
    } else {
        Chat.log("No valid operation possible");
    }
}

// Example usage
calculateAnvilCosts();
```

### Anvil Inventory Monitor

```javascript
function monitorAnvil() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Anvil")) {
        return;
    }

    function updateDisplay() {
        const leftItem = inv.getLeftInput();
        const rightItem = inv.getRightInput();
        const output = inv.getOutput();
        const currentName = inv.getName();

        let status = "&fAnvil Status: ";

        if (leftItem.isEmpty()) {
            status += "&7Empty (waiting for item)";
        } else if (output.isEmpty()) {
            status += "&cInvalid operation";
        } else {
            const cost = inv.getLevelCost();
            const playerLevel = Player.getPlayer().experienceLevel;

            if (cost > playerLevel) {
                status += "&cToo expensive (&4" + cost + "&c levels, need &4" + (cost - playerLevel) + "&c more)";
            } else {
                status += "&aReady (cost: &e" + cost + "&a levels)";
            }

            if (currentName && currentName !== leftItem.getName().getString()) {
                status += " &8- &7Renamed to: &f\"" + currentName + "\"";
            }
        }

        Chat.actionbar(status);
    }

    // Update display every 5 ticks while anvil is open
    let tickCount = 0;
    const monitor = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Anvil")) {
            JsMacros.off(monitor);
            Chat.actionbar("&7Anvil closed");
            return;
        }

        if (tickCount % 5 === 0) { // Update every 5 ticks (0.25 seconds)
            updateDisplay();
        }
        tickCount++;
    }));
}

// Example usage - call when anvil is opened
monitorAnvil();
```

### Smart Item Manager

```javascript
function smartAnvilManager() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Anvil")) {
        Chat.log("Please open an anvil first");
        return;
    }

    const leftItem = inv.getLeftInput();
    const rightItem = inv.getRightInput();

    // Smart operation detection and execution
    if (!leftItem.isEmpty() && rightItem.isEmpty()) {
        // Single item - suggest renaming if it has no custom name
        if (!leftItem.getNBT() || !leftItem.getNBT().has("display")) {
            const suggestedName = suggestItemName(leftItem);
            if (suggestedName) {
                inv.setName(suggestedName);
                Chat.log(`Suggested name: "${suggestedName}"`);
            }
        }
    } else if (!leftItem.isEmpty() && !rightItem.isEmpty()) {
        // Two items - determine operation type
        const output = inv.getOutput();
        if (!output.isEmpty()) {
            const cost = inv.getLevelCost();
            const playerLevel = Player.getPlayer().experienceLevel;

            if (cost <= playerLevel) {
                // Auto-execute if affordable and reasonable cost
                if (cost <= 5) {
                    inv.quick(2);
                    Chat.log(`&aAuto-completed operation (cost: ${cost} levels)`);
                } else {
                    Chat.log(`&6Operation ready (cost: ${cost} levels) - confirm to execute`);
                }
            } else {
                Chat.log(`&cOperation too expensive: ${cost} levels (have: ${playerLevel})`);
            }
        }
    }
}

function suggestItemName(item) {
    const itemId = item.getItemId();
    const enchantments = item.getEnchantments();

    // Generate names based on item type and enchantments
    if (item.getItemId().includes("sword")) {
        if (item.hasEnchantment("sharpness")) {
            const sharpness = item.getEnchantment("sharpness").getLevel();
            return `${sharpness >= 4 ? "⚔" : "🗡"} Sharp Blade ${sharpness >= 4 ? "IV+" : ""}`;
        }
        return "⚔ Warrior's Blade";
    }

    if (item.getItemId().includes("pickaxe")) {
        if (item.hasEnchantment("efficiency")) {
            const efficiency = item.getEnchantment("efficiency").getLevel();
            return `⛏ Swift Pick ${efficiency >= 4 ? "IV+" : ""}`;
        }
        return "⛏ Miner's Tool";
    }

    if (enchantments.length > 0) {
        const topEnch = enchantments[0];
        return `✨ Enchanted ${item.getName().getString()}`;
    }

    return null; // No suggestion
}

// Example usage
smartAnvilManager();
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends `Inventory<AnvilScreen>`
- Built on Minecraft's AnvilScreen and AnvilScreenHandler

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `ItemStackHelper` - Represents items in anvil slots
- `PlayerInventory` - Player's main inventory interface
- `ContainerInventory` - Generic container inventory functionality

## Notes and Limitations

- Anvil operations are limited by Minecraft's maximum level cost of 40
- Renaming items always costs at least 1 level
- Repair costs increase with each repair on the same item
- Enchantment combination costs depend on enchantment levels
- Some operations may not be possible due to Minecraft's anvil restrictions
- The anvil interface must be open to use `AnvilInventory` methods
- All operations require the player to have sufficient experience levels
- Changes are only applied when items are taken from the output slot