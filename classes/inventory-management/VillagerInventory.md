# VillagerInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.VillagerInventory`

**Extends:** `Inventory<MerchantScreen>`

**Since:** `1.3.1`

The `VillagerInventory` class provides specialized access to Minecraft's villager trading interface, allowing scripts to interact with villager trades, experience systems, and merchant mechanics. This class extends the base `Inventory` class and adds villager-specific functionality for managing trades, selecting offers, and monitoring villager progression.

Villager trading in Minecraft consists of:
- **Trade Offers:** Available trades that can be selected and executed
- **Experience System:** Villager gains experience from trades and levels up
- **Level Progress:** Visual indicator of villager's current level progress
- **Trade Refreshing:** Ability to refresh trades under certain conditions

## Accessing VillagerInventory

You typically get `VillagerInventory` instances when the player has a villager trading screen open:

```javascript
// Check if current screen is a villager
const inv = Inventory.create();
if (inv && inv.getType() === "Villager") {
    const villagerInv = inv; // Already typed as VillagerInventory
    Chat.log("Villager inventory detected!");

    const trades = villagerInv.getTrades();
    Chat.log(`Available trades: ${trades.length}`);
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Trade Management
- [instance.selectTrade()](#instanceselecttrade)
- [instance.getTrades()](#instancegettrades)

### Experience and Level Information
- [instance.getExperience()](#instancegetexperience)
- [instance.getLevelProgress()](#instancegetlevelprogress)
- [instance.getMerchantRewardedExperience()](#instancegetmerchantrewardedexperience)

### Trade Status
- [instance.canRefreshTrades()](#instancecanrefreshtrades)
- [instance.isLeveled()](#instanceisleveled)

---

## Method Details

### Trade Management

### Experience and Level Information

### Trade Status

## Inherited Methods

From the base `Inventory` class, `VillagerInventory` inherits all standard inventory management methods:

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

### Basic Trade Analysis

```javascript
function analyzeVillagerTrades() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Villager")) {
        Chat.log("Please open a villager trading interface first");
        return;
    }

    const trades = inv.getTrades();
    const exp = inv.getExperience();
    const progress = inv.getLevelProgress();
    const canRefresh = inv.canRefreshTrades();
    const isLeveled = inv.isLeveled();

    Chat.log("=== Villager Information ===");
    Chat.log(`Experience: ${exp}`);
    Chat.log(`Level Progress: ${progress}%`);
    Chat.log(`Can Refresh Trades: ${canRefresh ? "Yes" : "No"}`);
    Chat.log(`Can Level Up: ${isLeveled ? "Yes" : "No"}`);
    Chat.log(`Total Trades: ${trades.length}`);

    Chat.log("\n=== Available Trades ===");

    let availableTrades = 0;
    let lockedTrades = 0;

    trades.forEach((trade, index) => {
        const inputs = trade.getInput();
        const output = trade.getOutput();
        const available = trade.isAvailable();
        const uses = trade.getUses();
        const maxUses = trade.getMaxUses();

        if (available) {
            availableTrades++;
            Chat.log(`${index + 1}. ✓ ${inputs.map(i => `${i.getName().getString()} x${i.getCount()}`).join(" + ")} → ${output.getName().getString()} x${output.getCount()}`);
            Chat.log(`   Uses: ${uses}/${maxUses}`);
        } else {
            lockedTrades++;
            Chat.log(`${index + 1}. ✗ [LOCKED] ${inputs.map(i => `${i.getName().getString()}`).join(" + ")} → ${output.getName().getString()}`);
            Chat.log(`   Uses: ${uses}/${maxUses} (Locked until restock)`);
        }

        // Show price adjustments
        const originalPrice = trade.getOriginalPrice();
        const adjustedPrice = trade.getAdjustedPrice();
        if (originalPrice !== adjustedPrice) {
            const discount = originalPrice - adjustedPrice;
            Chat.log(`   Price adjustment: ${discount > 0 ? "+" : ""}${discount} (${discount > 0 ? "premium" : "discount"})`);
        }
    });

    Chat.log(`\nSummary: ${availableTrades} available, ${lockedTrades} locked trades`);
}

// Example usage
analyzeVillagerTrades();
```

### Auto Trade Execution

```javascript
function autoTrade(targetItemId, maxTrades = 10) {
    const inv = Inventory.create();

    if (!inv || !inv.is("Villager")) {
        Chat.log("Please open a villager trading interface first");
        return false;
    }

    const trades = inv.getTrades();
    let successfulTrades = 0;

    Chat.log(`Looking for trades involving: ${targetItemId}`);

    for (let i = 0; i < trades.length && successfulTrades < maxTrades; i++) {
        const trade = trades[i];

        if (!trade.isAvailable()) {
            continue; // Skip locked trades
        }

        // Check if trade involves the target item (either as input or output)
        const inputs = trade.getInput();
        const output = trade.getOutput();
        const involvesTarget = inputs.some(item => item.getItemId() === targetItemId) ||
                              output.getItemId() === targetItemId;

        if (involvesTarget) {
            // Select the trade
            inv.selectTrade(i);

            // Get inventory slot mappings for villager interface
            const slotMap = inv.getMap();
            const inputSlots = slotMap["input"] || [];
            const outputSlots = slotMap["output"] || [];

            if (inputSlots.length > 0 && outputSlots.length > 0) {
                const outputSlot = outputSlots[0];
                const outputItem = inv.getSlot(outputSlot);

                if (!outputItem.isEmpty()) {
                    // Check if player has required input items
                    const hasRequiredItems = inputs.every(inputItem => {
                        const playerInv = Player.getPlayer().getInventory();
                        return playerInv.contains(inputItem) ||
                               inv.contains(inputItem);
                    });

                    if (hasRequiredItems) {
                        // Execute the trade by clicking the output slot
                        inv.click(outputSlot);
                        successfulTrades++;

                        const inputDesc = inputs.map(item => `${item.getName().getString()} x${item.getCount()}`).join(" + ");
                        Chat.log(`Trade ${successfulTrades}: ${inputDesc} → ${output.getName().getString()} x${output.getCount()}`);

                        // Small delay between trades
                        Client.waitTick();
                    } else {
                        Chat.log(`Skipping trade - missing required items: ${inputs.map(i => i.getName().getString()).join(", ")}`);
                    }
                }
            }
        }
    }

    Chat.log(`Auto-trading completed. Executed ${successfulTrades} trades.`);
    return successfulTrades > 0;
}

// Example usage - auto-trade with emeralds
autoTrade("minecraft:emerald", 5);
```

### Villager Level Progress Monitor

```javascript
function monitorVillagerProgress() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Villager")) {
        Chat.log("Please open a villager trading interface first");
        return;
    }

    let lastExp = inv.getExperience();
    let lastProgress = inv.getLevelProgress();
    let tradeCount = 0;

    Chat.log("Started villager progress monitoring");

    const monitor = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();

        if (!currentInv || !currentInv.is("Villager")) {
            JsMacros.off(monitor);
            Chat.log("Villager trading closed - monitoring stopped");
            return;
        }

        const currentExp = currentInv.getExperience();
        const currentProgress = currentInv.getLevelProgress();
        const isLeveled = currentInv.isLeveled();

        // Check for experience changes
        if (currentExp > lastExp) {
            const expGained = currentExp - lastExp;
            tradeCount++;
            Chat.log(`Trade completed! +${expGained} XP (Total: ${currentExp}, Trades: ${tradeCount})`);
        }

        // Check for level progress changes
        if (currentProgress !== lastProgress) {
            Chat.log(`Level progress updated: ${lastProgress}% → ${currentProgress}%`);
        }

        // Check if villager can level up
        if (isLeveled && currentProgress >= 100) {
            Chat.actionbar("&a&lVILLAGER CAN LEVEL UP! Close and reopen trading.");
            // Play a sound notification if possible
            Player.getPlayer().playSound("entity.villager.yes", 1.0, 1.0);
        }

        // Update status display every 20 ticks (1 second)
        if (tradeCount % 20 === 0) {
            const trades = currentInv.getTrades();
            const availableTrades = trades.filter(t => t.isAvailable()).length;
            const totalTrades = trades.length;

            Chat.actionbar(`&7Villager: &a${currentExp} XP &8| &b${currentProgress}% &8| &f${availableTrades}/${totalTrades} trades &8| &e${tradeCount} completed`);
        }

        lastExp = currentExp;
        lastProgress = currentProgress;
    }));
}

// Example usage
monitorVillagerProgress();
```

### Trade Profitability Calculator

```javascript
function calculateTradeProfitability() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Villager")) {
        Chat.log("Please open a villager trading interface first");
        return;
    }

    const trades = inv.getTrades();
    const playerInv = Player.getPlayer().getInventory();

    Chat.log("=== Trade Profitability Analysis ===");

    trades.forEach((trade, index) => {
        if (!trade.isAvailable()) {
            return; // Skip locked trades
        }

        const inputs = trade.getInput();
        const output = trade.getOutput();

        // Calculate input value (simplified - based on item rarity)
        let inputValue = 0;
        inputs.forEach(input => {
            if (input.getItemId() === "minecraft:emerald") {
                inputValue += input.getCount() * 100; // Emeralds as baseline
            } else {
                inputValue += input.getCount() * 10; // Other items as lower value
            }
        });

        // Calculate output value
        let outputValue = 0;
        if (output.getItemId() === "minecraft:emerald") {
            outputValue += output.getCount() * 100;
        } else {
            outputValue += output.getCount() * 15; // Slightly higher for non-emerald outputs
        }

        const profit = outputValue - inputValue;
        const profitMargin = inputValue > 0 ? (profit / inputValue) * 100 : 0;

        // Display analysis
        const inputDesc = inputs.map(i => `${i.getName().getString()} x${i.getCount()}`).join(" + ");

        Chat.log(`${index + 1}. ${inputDesc} → ${output.getName().getString()} x${output.getCount()}`);
        Chat.log(`   Input Value: ${inputValue} | Output Value: ${outputValue} | Profit: ${profit > 0 ? "+" : ""}${profit} (${profitMargin > 0 ? "+" : ""}${profitMargin.toFixed(1)}%)`);

        // Check if player can afford this trade
        const canAfford = inputs.every(input => playerInv.contains(input) || inv.contains(input));
        Chat.log(`   Can afford: ${canAfford ? "✓ Yes" : "✗ No"}`);

        // Show trade availability info
        const uses = trade.getUses();
        const maxUses = trade.getMaxUses();
        const remainingUses = maxUses - uses;

        if (remainingUses < maxUses * 0.2) {
            Chat.log(`   ⚠ Warning: Only ${remainingUses} uses remaining (${(remainingUses/maxUses*100).toFixed(0)}%)`);
        }

        Chat.log("");
    });
}

// Example usage
calculateTradeProfitability();
```

### Smart Trade Manager

```javascript
function smartTradeManager() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Villager")) {
        Chat.log("Please open a villager trading interface first");
        return;
    }

    const trades = inv.getTrades();
    const playerInv = Player.getPlayer().getInventory();
    const emeraldCount = playerInv.count("minecraft:emerald");

    Chat.log(`=== Smart Trade Manager ===`);
    Chat.log(`Player emeralds: ${emeraldCount}`);

    // Categorize trades
    const buyingTrades = []; // Player gives items, gets emeralds
    const sellingTrades = []; // Player gives emeralds, gets items

    trades.forEach((trade, index) => {
        if (!trade.isAvailable()) return;

        const inputs = trade.getInput();
        const output = trade.getOutput();

        const hasEmeraldInput = inputs.some(item => item.getItemId() === "minecraft:emerald");
        const hasEmeraldOutput = output.getItemId() === "minecraft:emerald";

        if (hasEmeraldOutput && !hasEmeraldInput) {
            buyingTrades.push({ trade, index });
        } else if (hasEmeraldInput && !hasEmeraldOutput) {
            sellingTrades.push({ trade, index });
        }
    });

    Chat.log(`Found ${buyingTrades.length} buying trades and ${sellingTrades.length} selling trades`);

    // Execute selling trades if player has enough emeralds
    if (emeraldCount >= 64) {
        Chat.log("Selling excess emeralds for valuable items...");

        for (const { trade, index } of sellingTrades) {
            const inputs = trade.getInput();
            const emeraldCost = inputs.find(item => item.getItemId() === "minecraft:emerald")?.getCount() || 0;

            if (emeraldCost <= emeraldCount && trade.isAvailable()) {
                inv.selectTrade(index);

                const output = trade.getOutput();
                Chat.log(`Selling: ${emeraldCost} emeralds → ${output.getName().getString()} x${output.getCount()}`);

                // Execute trade
                const slotMap = inv.getMap();
                const outputSlot = slotMap["output"]?.[0];
                if (outputSlot) {
                    inv.click(outputSlot);
                    Client.waitTick();
                }
            }
        }
    }

    // Execute buying trades if player has the required items
    Chat.log("Buying items for emeralds...");

    for (const { trade, index } of buyingTrades) {
        const inputs = trade.getInput();
        const canAfford = inputs.every(input => playerInv.contains(input) || inv.contains(input));

        if (canAfford && trade.isAvailable()) {
            inv.selectTrade(index);

            const output = trade.getOutput();
            const inputDesc = inputs.map(i => `${i.getName().getString()} x${i.getCount()}`).join(" + ");
            Chat.log(`Buying: ${inputDesc} → ${output.getName().getString()} x${output.getCount()}`);

            // Execute trade
            const slotMap = inv.getMap();
            const outputSlot = slotMap["output"]?.[0];
            if (outputSlot) {
                inv.click(outputSlot);
                Client.waitTick();
            }
        }
    }

    // Check for villager level up
    if (inv.isLeveled()) {
        Chat.log("&a&lVillager can level up! Close and reopen trading to unlock new trades.");
    }

    Chat.log("Smart trading completed!");
}

// Example usage
smartTradeManager();
```

### Trade History Logger

```javascript
function logTradeHistory() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Villager")) {
        Chat.log("Please open a villager trading interface first");
        return;
    }

    let tradeHistory = [];
    let lastExp = inv.getExperience();

    Chat.log("Started trade history logging");

    const logger = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();

        if (!currentInv || !currentInv.is("Villager")) {
            JsMacros.off(logger);

            // Print final summary
            Chat.log("=== Trade Session Summary ===");
            Chat.log(`Total trades executed: ${tradeHistory.length}`);

            const itemTotals = {};
            tradeHistory.forEach(trade => {
                const outputKey = `${trade.outputItem} x${trade.outputCount}`;
                itemTotals[outputKey] = (itemTotals[outputKey] || 0) + 1;
            });

            Chat.log("Items received:");
            Object.entries(itemTotals).forEach(([item, count]) => {
                Chat.log(`  ${item}: ${count} times`);
            });

            return;
        }

        const currentExp = currentInv.getExperience();

        // Detect when a trade occurs (experience increases)
        if (currentExp > lastExp) {
            const trades = currentInv.getTrades();
            const expGained = currentExp - lastExp;

            // Try to identify which trade was executed
            let executedTrade = null;
            let maxExpMatch = 0;

            for (const trade of trades) {
                const tradeExp = trade.getExperience();
                if (tradeExp === expGained && trade.isAvailable()) {
                    executedTrade = trade;
                    break;
                } else if (tradeExp > maxExpMatch && tradeExp <= expGained) {
                    executedTrade = trade;
                    maxExpMatch = tradeExp;
                }
            }

            if (executedTrade) {
                const inputs = executedTrade.getInput();
                const output = executedTrade.getOutput();
                const timestamp = new Date().toLocaleTimeString();

                const tradeRecord = {
                    timestamp,
                    inputs: inputs.map(i => `${i.getName().getString()} x${i.getCount()}`),
                    outputItem: output.getName().getString(),
                    outputCount: output.getCount(),
                    expGained,
                    villagerExp: currentExp
                };

                tradeHistory.push(tradeRecord);

                // Log the trade
                const inputDesc = tradeRecord.inputs.join(" + ");
                Chat.log(`[${timestamp}] Trade: ${inputDesc} → ${tradeRecord.outputItem} x${tradeRecord.outputCount} (+${expGained} XP, Villager: ${currentExp})`);
            }

            lastExp = currentExp;
        }
    }));
}

// Example usage
logTradeHistory();
```

---

## Version Information

- Available since JSMacros 1.3.1
- Extends `Inventory<MerchantScreen>`
- Built on Minecraft's MerchantScreen and MerchantScreenHandler

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `TradeOfferHelper` - Represents individual villager trade offers
- `ItemStackHelper` - Represents items in trading slots
- `PlayerInventory` - Player's main inventory for accessing trade materials

## Notes and Limitations

- The villager trading interface must be open to use `VillagerInventory` methods
- Trade availability depends on villager stock and restock mechanics
- Villagers gain experience and level up through successful trades
- Some trades may be locked until the villager restocks (typically after sleeping)
- Price adjustments can occur based on demand, player reputation, and Hero of the Village effects
- Trade refreshing is only available under certain conditions and for specific villager types
- Maximum level cost for villager trades follows Minecraft's standard trading mechanics
- All operations require the player to have sufficient trade materials