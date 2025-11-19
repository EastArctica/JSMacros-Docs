# PlayerInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.PlayerInventory`

**Extends:** `RecipeInventory<InventoryScreen>`

**Since:** `1.8.4`

The `PlayerInventory` class provides comprehensive functionality for interacting with the player's survival inventory screen in Minecraft. This includes accessing the main inventory, hotbar, armor slots, offhand, crafting grid, and recipe book functionality. It extends the `RecipeInventory` class and inherits all standard inventory operations while adding player-specific inventory management features.

This class is automatically created when you open your inventory screen (typically with 'E' key) and can be accessed through `Player.getInventory()` or `Inventory.create()` when the survival inventory is open.

## Inventory Layout

The `PlayerInventory` class manages the following inventory sections:

- **Hotbar**: Slots 0-8 (9 slots) - Bottom row for quick access
- **Main Inventory**: Slots 9-35 (27 slots) - Main storage area
- **Armor**: Slots 5-8 (4 slots) - Helmet, chestplate, leggings, boots
- **Offhand**: Slot 45 - Shield or other offhand item
- **Crafting Grid**: Slots 1-4 (2x2) - Personal crafting area
- **Crafting Output**: Slot 0 - Result of crafting
- **Crafting Book**: Recipe book interface

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)

---

## Constructors

- [PlayerInventory()](#playerinventory)

---

## Methods

### Player-Specific Operations
- [instance.getHelmet()](#instancegethelmet)
- [instance.getChestplate()](#instancegetCuestplate)
- [instance.getLeggings()](#instancegetleggings)
- [instance.getBoots()](#instancegetboots)
- [instance.getOffhand()](#instancegetoffhand)
- [instance.isInHotbar()](#instanceisinhotbar)

### Crafting Operations
- [instance.getInput(x, y)](#instancegetinputx-y)
- [instance.getOutput()](#instancegetoutput)
- [instance.getInput()](#instancegetinput-1)
- [instance.getCraftingWidth()](#instancegetcraftingwidth)
- [instance.getCraftingHeight()](#instancegetcraftingheight)
- [instance.getCraftingSlotCount()](#instancegetcraftingslotcount)
- [instance.getInputSize()](#instancegetinputsize)
- [instance.getCategory()](#instancegetcategory)
- [instance.getCraftableRecipes()](#instancegetcraftablerecipes)
- [instance.getRecipes(craftable)](##instancegetrecipescraftable)
- [instance.isRecipeBookOpened()](#instanceisrecipebookopened)
- [instance.toggleRecipeBook()](#instancetogglerecipebook)
- [instance.setRecipeBook(open)](#instancesetrecipebookopen)

### Inherited from RecipeInventory and Inventory
- [Core Operations](#core-operations-inherited)
- [Slot Management](#slot-management-inherited)
- [Item Search and Filtering](#item-search-and-filtering-inherited)
- [Click Actions](#click-actions-inherited)
- [Hotbar Management](#hotbar-management-inherited)
- [Mouse Interaction](#mouse-interaction-inherited)

---

## Constructors

### PlayerInventory()
```js
// PlayerInventory instances are typically created automatically by JSMacros
const inventory = Player.getInventory(); // Returns PlayerInventory when inventory is open
const inventory = Inventory.create();    // Returns appropriate type for current screen
```

Creates a new `PlayerInventory` instance for the player inventory screen.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| inventory | `InventoryScreen` | The player inventory screen handler |

**Notes:**
- This constructor is primarily used internally by JSMacros
- Scripts typically obtain instances through `Player.getInventory()` or `Inventory.create()`
- Only available when the survival inventory screen is open (not creative mode)

---

## Player-Specific Operations

## Crafting Operations

## Core Operations (Inherited)

### Inventory Type Detection
```js
const inventory = Player.getInventory();
if (inventory && inventory.is("Survival Inventory")) {
    Chat.log("Player inventory is open");

    // Alternative check
    const type = inventory.getType();
    Chat.log(`Inventory type: ${type}`);
}
```

### Container and Slot Information
```js
const inventory = Player.getInventory();
if (inventory) {
    const totalSlots = inventory.getTotalSlots();
    Chat.log(`Total slots: ${totalSlots}`);

    // Get slot mappings
    const slotMap = inventory.getMap();
    Chat.log("Slot sections:");
    for (const [section, slots] of Object.entries(slotMap)) {
        Chat.log(`- ${section}: ${slots.length} slots (${slots.join(", ")})`);
    }

    // Get container title
    const title = inventory.getContainerTitle();
    Chat.log(`Inventory title: ${title}`);
}
```

---

## Slot Management (Inherited)

### Accessing Specific Slots
```js
const inventory = Player.getInventory();
if (inventory) {
    // Access hotbar slots (0-8 or 36-44)
    for (let i = 0; i < 9; i++) {
        const hotbarSlot = inventory.getSlot(i);
        if (!hotbarSlot.isEmpty()) {
            Chat.log(`Hotbar ${i}: ${hotbarSlot.getName().getString()}`);
        }
    }

    // Access main inventory slots (9-35)
    const mainSlots = inventory.getSlots("main");
    Chat.log(`Main inventory has ${mainSlots.length} slots`);

    // Access armor slots
    const armorSlots = inventory.getSlots("helmet", "chestplate", "leggings", "boots");
    for (const slot of armorSlots) {
        const item = inventory.getSlot(slot);
        const location = inventory.getLocation(slot);
        if (!item.isEmpty()) {
            Chat.log(`${location}: ${item.getName().getString()}`);
        }
    }
}
```

### Finding Free Slots
```js
const inventory = Player.getInventory();
if (inventory) {
    // Find free slots in different sections
    const freeHotbar = inventory.findFreeHotbarSlot();
    const freeInventory = inventory.findFreeInventorySlot();
    const freeMain = inventory.findFreeSlot("main");

    Chat.log(`Free hotbar slot: ${freeHotbar}`);
    Chat.log(`Free inventory slot: ${freeInventory}`);
    Chat.log(`Free main inventory slot: ${freeMain}`);

    if (freeHotbar !== -1) {
        Chat.log(`Space available in hotbar at position ${freeHotbar}`);
    }
}
```

### Slot Location Information
```js
const inventory = Player.getInventory();
const slotUnderMouse = inventory.getSlotUnderMouse();
if (slotUnderMouse >= 0) {
    const location = inventory.getLocation(slotUnderMouse);
    const item = inventory.getSlot(slotUnderMouse);

    Chat.log(`Slot ${slotUnderMouse} (${location}): ${item.getName().getString()}`);

    // Check if it's a hotbar slot
    if (inventory.isInHotbar(slotUnderMouse)) {
        const hotbarPos = slotUnderMouse >= 36 ? slotUnderMouse - 36 : slotUnderMouse;
        Chat.log(`This is hotbar slot ${hotbarPos + 1}`);
    }
}
```

---

## Item Search and Filtering (Inherited)

### Checking Item Contents
```js
const inventory = Player.getInventory();
if (inventory) {
    // Check for specific items
    const hasDiamonds = inventory.contains("minecraft:diamond");
    const hasIron = inventory.contains("minecraft:iron_ingot");

    Chat.log(`Has diamonds: ${hasDiamonds}`);
    Chat.log(`Has iron: ${hasIron}`);

    // Check using ItemStackHelper
    const mainHandItem = Player.getPlayer().getMainHand();
    if (!mainHandItem.isEmpty()) {
        const hasSameItem = inventory.contains(mainHandItem);
        Chat.log(`Inventory has ${mainHandItem.getName().getString()}: ${hasSameItem}`);
    }
}
```

### Finding Items
```js
const inventory = Player.getInventory();
if (inventory) {
    // Find all diamond locations
    const diamondSlots = inventory.findItem("minecraft:diamond");
    if (diamondSlots.length > 0) {
        Chat.log(`Found diamonds in slots: ${diamondSlots.join(", ")}`);

        // Get total diamond count
        let totalDiamonds = 0;
        for (const slot of diamondSlots) {
            totalDiamonds += inventory.getSlot(slot).getCount();
        }
        Chat.log(`Total diamonds: ${totalDiamonds}`);
    }

    // Get item counts for all items
    const itemCounts = inventory.getItemCount();
    Chat.log("Item summary:");
    for (const [itemId, count] of Object.entries(itemCounts)) {
        if (count > 0) {
            Chat.log(`- ${itemId}: ${count}`);
        }
    }
}
```

### Getting Items by Section
```js
const inventory = Player.getInventory();
if (inventory) {
    // Get armor items
    const armorItems = inventory.getItems("helmet", "chestplate", "leggings", "boots");
    Chat.log("Currently wearing:");
    for (const item of armorItems) {
        Chat.log(`- ${item.getName().getString()}`);
    }

    // Get hotbar items
    const hotbarItems = inventory.getItems("hotbar");
    Chat.log(`Hotbar has ${hotbarItems.length} item types`);

    // Get main inventory items
    const mainItems = inventory.getItems("main");
    Chat.log(`Main inventory has ${mainItems.length} item types`);
}
```

---

## Click Actions (Inherited)

### Basic Inventory Operations
```js
const inventory = Player.getInventory();
if (inventory) {
    // Click specific slots
    inventory.click(36); // Click first hotbar slot
    inventory.click(9, 1); // Right-click main inventory slot

    // Quick move (shift-click) operations
    inventory.quick(10); // Shift-click to move between inventory sections

    // Drop items
    inventory.dropSlot(36); // Drop one item from hotbar
    inventory.dropSlot(9, true); // Drop entire stack

    // Swap with hotbar
    inventory.swapHotbar(9, 0); // Swap slot 9 with hotbar slot 1
    inventory.swapHotbar(45, 40); // Swap offhand
}
```

### Complex Operations
```js
const inventory = Player.getInventory();
if (inventory) {
    // Split a stack between two empty slots
    try {
        inventory.split(10, 11); // Split from slot 10 to 11
    } catch (e) {
        Chat.log(`Split failed: ${e.message}`);
    }

    // Grab all matching items
    inventory.grabAll(9); // Pick up all items matching slot 9

    // Drag-click to distribute items
    const slots = [36, 37, 38, 39];
    inventory.dragClick(slots, 0); // Left-click drag
}
```

### Organizing Inventory
```js
function organizeInventory() {
    const inventory = Player.getInventory();
    if (!inventory) return;

    Chat.log("Organizing inventory...");

    // Move items to appropriate sections
    const allSlots = inventory.getSlots("main", "hotbar");

    for (const slot of allSlots) {
        const item = inventory.getSlot(slot);
        if (item.isEmpty()) continue;

        const itemId = item.getItemId();

        // Move tools to hotbar
        if (isTool(itemId)) {
            const freeHotbar = inventory.findFreeHotbarSlot();
            if (freeHotbar !== -1 && !inventory.isInHotbar(slot)) {
                inventory.swapHotbar(slot, freeHotbar);
                Chat.log(`Moved ${item.getName().getString()} to hotbar`);
            }
        }

        // Small delay to prevent overwhelming
        JsMacros.waitForEvent("Tick");
    }

    Chat.log("Organization complete!");
}

function isTool(itemId) {
    return itemId.includes("sword") ||
           itemId.includes("pickaxe") ||
           itemId.includes("axe") ||
           itemId.includes("shovel") ||
           itemId.includes("hoe");
}
```

---

## Hotbar Management (Inherited)

### Hotbar Slot Operations
```js
const inventory = Player.getInventory();
if (inventory) {
    // Get currently selected hotbar slot
    const currentSlot = inventory.getSelectedHotbarSlotIndex();
    Chat.log(`Selected hotbar slot: ${currentSlot + 1}`);

    // Change selected hotbar slot
    inventory.setSelectedHotbarSlotIndex(2); // Select slot 3
    Chat.log("Switched to hotbar slot 3");

    // Quick select based on item type
    selectBestTool();
}

function selectBestTool() {
    const inventory = Player.getInventory();
    if (!inventory) return;

    const player = Player.getPlayer();
    const lookingAt = player.rayTraceBlock(5);

    if (!lookingAt || !lookingAt.block) return;

    const blockId = lookingAt.block.getBlockState().getBlock().getTranslationKey();

    let toolType = null;
    if (blockId.includes("stone") || blockId.includes("ore")) {
        toolType = "pickaxe";
    } else if (blockId.includes("wood") || blockId.includes("log")) {
        toolType = "axe";
    } else if (blockId.includes("dirt") || blockId.includes("grass") || blockId.includes("sand")) {
        toolType = "shovel";
    }

    if (toolType) {
        const hotbarSlots = inventory.getSlots("hotbar");
        for (let i = 0; i < hotbarSlots.length; i++) {
            const item = inventory.getSlot(hotbarSlots[i]);
            if (!item.isEmpty() && item.getItemId().includes(toolType)) {
                inventory.setSelectedHotbarSlotIndex(i);
                Chat.log(`Selected ${item.getName().getString()}`);
                break;
            }
        }
    }
}
```

---

## Mouse Interaction (Inherited)

### Mouse-Based Operations
```js
const inventory = Player.getInventory();
if (inventory) {
    // Get slot under mouse
    const slotUnderMouse = inventory.getSlotUnderMouse();
    if (slotUnderMouse >= 0) {
        const item = inventory.getSlot(slotUnderMouse);
        if (!item.isEmpty()) {
            Chat.log(`Mouse over: ${item.getName().getString()} x${item.getCount()}`);
        }

        // Get location information
        const location = inventory.getLocation(slotUnderMouse);
        Chat.log(`Slot location: ${location}`);

        // Check if it's equipment
        if (["helmet", "chestplate", "leggings", "boots", "offhand"].includes(location)) {
            Chat.log("This is an equipment slot");
        }
    }

    // Get held item (on cursor)
    const heldItem = inventory.getHeld();
    if (!heldItem.isEmpty()) {
        Chat.log(`Holding: ${heldItem.getName().getString()} x${heldItem.getCount()}`);
    }
}
```

---

## Usage Examples

### Equipment Status Monitor
```javascript
function checkEquipment() {
    const inventory = Player.getInventory();
    if (!inventory) return;

    Chat.log("=== Equipment Status ===");

    // Check armor
    const helmet = inventory.getHelmet();
    const chestplate = inventory.getChestplate();
    const leggings = inventory.getLeggings();
    const boots = inventory.getBoots();

    let totalArmor = 0;

    if (!helmet.isEmpty()) {
        const durability = helmet.getMaxDamage() - helmet.getDamage();
        const maxDurability = helmet.getMaxDamage();
        const durabilityPercent = maxDurability > 0 ? (durability / maxDurability * 100).toFixed(1) : 100;

        Chat.log(`Helmet: ${helmet.getName().getString()} (${durabilityPercent}% durability)`);
        totalArmor += getArmorValue(helmet);
    } else {
        Chat.log("Helmet: None");
    }

    if (!chestplate.isEmpty()) {
        const durability = chestplate.getMaxDamage() - chestplate.getDamage();
        const maxDurability = chestplate.getMaxDamage();
        const durabilityPercent = maxDurability > 0 ? (durability / maxDurability * 100).toFixed(1) : 100;

        Chat.log(`Chestplate: ${chestplate.getName().getString()} (${durabilityPercent}% durability)`);
        totalArmor += getArmorValue(chestplate);
    } else {
        Chat.log("Chestplate: None");
    }

    if (!leggings.isEmpty()) {
        const durability = leggings.getMaxDamage() - leggings.getDamage();
        const maxDurability = leggings.getMaxDamage();
        const durabilityPercent = maxDurability > 0 ? (durability / maxDurability * 100).toFixed(1) : 100;

        Chat.log(`Leggings: ${leggings.getName().getString()} (${durabilityPercent}% durability)`);
        totalArmor += getArmorValue(leggings);
    } else {
        Chat.log("Leggings: None");
    }

    if (!boots.isEmpty()) {
        const durability = boots.getMaxDamage() - boots.getDamage();
        const maxDurability = boots.getMaxDamage();
        const durabilityPercent = maxDurability > 0 ? (durability / maxDurability * 100).toFixed(1) : 100;

        Chat.log(`Boots: ${boots.getName().getString()} (${durabilityPercent}% durability)`);
        totalArmor += getArmorValue(boots);
    } else {
        Chat.log("Boots: None");
    }

    // Check offhand
    const offhand = inventory.getOffhand();
    if (!offhand.isEmpty()) {
        Chat.log(`Offhand: ${offhand.getName().getString()} x${offhand.getCount()}`);
    } else {
        Chat.log("Offhand: Empty");
    }

    Chat.log(`Total Armor Value: ${totalArmor}`);

    // Check for low durability items
    const lowDurabilityItems = [];
    const allEquipment = [helmet, chestplate, leggings, boots];

    for (const item of allEquipment) {
        if (!item.isEmpty()) {
            const durability = item.getMaxDamage() - item.getDamage();
            const maxDurability = item.getMaxDamage();
            if (maxDurability > 0 && (durability / maxDurability) < 0.2) {
                lowDurabilityItems.push(item.getName().getString());
            }
        }
    }

    if (lowDurabilityItems.length > 0) {
        Chat.actionbar("&cWarning: Low durability on " + lowDurabilityItems.join(", "));
    }
}

function getArmorValue(item) {
    // This is a simplified armor value calculation
    const itemId = item.getItemId();
    if (itemId.includes("diamond")) return 8;
    if (itemId.includes("iron")) return 6;
    if (itemId.includes("chain")) return 5;
    if (itemId.includes("golden")) return 5;
    if (itemId.includes("leather")) return 3;
    if (itemId.includes("netherite")) return 8;
    return 0;
}

// Run every 5 seconds
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    // Check every 100 ticks (5 seconds at 20 TPS)
    if (event.tick % 100 === 0) {
        checkEquipment();
    }
}));
```

### Crafting Assistant
```javascript
function showCraftingPossibilities() {
    const inventory = Player.getInventory();
    if (!inventory) {
        Chat.log("No inventory open!");
        return;
    }

    Chat.log("=== Crafting Assistant ===");

    // Check current crafting grid
    const craftingGrid = inventory.getInput();
    const output = inventory.getOutput();

    Chat.log("Current Crafting Grid:");
    let hasItems = false;

    for (let x = 0; x < craftingGrid.length; x++) {
        for (let y = 0; y < craftingGrid[x].length; y++) {
            const item = craftingGrid[x][y];
            if (!item.isEmpty()) {
                Chat.log(`  [${x},${y}]: ${item.getItemId()} x${item.getCount()}`);
                hasItems = true;
            }
        }
    }

    if (!hasItems) {
        Chat.log("  (empty)");
    }

    if (!output.isEmpty()) {
        Chat.log(`Can craft: ${output.getName().getString()} x${output.getCount()}`);
    } else {
        Chat.log("No valid recipe");
    }

    // Show craftable recipes
    try {
        const craftableRecipes = inventory.getCraftableRecipes();
        if (craftableRecipes.length > 0) {
            Chat.log(`\nYou can craft ${craftableRecipes.length} items:`);

            for (let i = 0; i < Math.min(craftableRecipes.length, 10); i++) {
                const recipe = craftableRecipes[i];
                const recipeOutput = recipe.getOutput();
                Chat.log(`- ${recipeOutput.getName().getString()} x${recipeOutput.getCount()}`);
            }

            if (craftableRecipes.length > 10) {
                Chat.log(`... and ${craftableRecipes.length - 10} more`);
            }
        } else {
            Chat.log("No craftable recipes with current materials");
        }
    } catch (e) {
        Chat.log(`Error getting recipes: ${e.message}`);
    }
}

// Quick craft function
function quickCraft(itemId) {
    const inventory = Player.getInventory();
    if (!inventory) return false;

    try {
        const recipes = inventory.getCraftableRecipes();
        for (const recipe of recipes) {
            const output = recipe.getOutput();
            if (output.getItemId() === itemId) {
                // This is a simplified crafting approach
                // In practice, you'd need to properly arrange the crafting grid
                Chat.log(`Found recipe for ${output.getName().getString()}`);
                return true;
            }
        }
    } catch (e) {
        Chat.log(`Error crafting: ${e.message}`);
    }

    return false;
}

// Example usage
JsMacros.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.e" && event.action === 1) {
        // Wait for inventory to open
        JsMacros.waitForEvent("ScreenOpen");
        JsMacros.waitForEvent("Tick");
        showCraftingPossibilities();
    }
}));
```

### Inventory Organizer
```javascript
function organizePlayerInventory() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Survival Inventory") {
        Chat.log("Please open your inventory first!");
        return;
    }

    Chat.log("Organizing inventory...");

    // Define item categories
    const categories = {
        tools: ["sword", "pickaxe", "axe", "shovel", "hoe"],
        weapons: ["bow", "crossbow", "trident", "spear"],
        armor: ["helmet", "chestplate", "leggings", "boots"],
        food: ["bread", "apple", "carrot", "potato", "beef", "pork", "chicken", "fish"],
        blocks: ["planks", "stone", "dirt", "cobblestone", "wood", "log"],
        materials: ["ingot", "nugget", "gem", "crystal", "dust"],
        redstone: ["redstone", "repeater", "comparator", "piston", "observer", "torch"],
        misc: []
    };

    // Get all items and categorize them
    const items = [];
    const allSlots = inventory.getSlots("main", "hotbar");

    for (const slot of allSlots) {
        const item = inventory.getSlot(slot);
        if (!item.isEmpty()) {
            const itemId = item.getItemId();
            let category = "misc";

            for (const [cat, keywords] of Object.entries(categories)) {
                if (cat === "misc") continue;

                for (const keyword of keywords) {
                    if (itemId.includes(keyword)) {
                        category = cat;
                        break;
                    }
                }
                if (category !== "misc") break;
            }

            items.push({ slot, item, category, count: item.getCount() });
        }
    }

    Chat.log(`Found ${items.length} item stacks to organize`);

    // Report current organization
    const categoryCount = {};
    for (const item of items) {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    }

    Chat.log("Current inventory composition:");
    for (const [category, count] of Object.entries(categoryCount)) {
        Chat.log(`- ${category}: ${count} stacks`);
    }

    // Find best tools and move to hotbar
    organizeHotbar(inventory, items);

    // Suggest organization
    suggestOrganization(items);
}

function organizeHotbar(inventory, items) {
    Chat.log("Organizing hotbar...");

    const toolPriority = {
        "diamond": 3,
        "iron": 2,
        "stone": 1,
        "wood": 0
    };

    const bestTools = {};

    // Find best tools
    for (const item of items) {
        const itemId = item.item.getItemId();

        let toolType = null;
        let priority = 0;

        if (itemId.includes("pickaxe")) {
            toolType = "pickaxe";
        } else if (itemId.includes("axe")) {
            toolType = "axe";
        } else if (itemId.includes("shovel")) {
            toolType = "shovel";
        } else if (itemId.includes("sword")) {
            toolType = "sword";
        }

        if (toolType) {
            for (const [material, prio] of Object.entries(toolPriority)) {
                if (itemId.includes(material)) {
                    priority = prio;
                    break;
                }
            }

            if (!bestTools[toolType] || bestTools[toolType].priority < priority) {
                bestTools[toolType] = { ...item, priority };
            }
        }
    }

    // Move best tools to hotbar
    const hotbarSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Hotbar slots
    const toolOrder = ["pickaxe", "axe", "shovel", "sword"];

    let slotIndex = 0;
    for (const toolType of toolOrder) {
        if (bestTools[toolType] && slotIndex < hotbarSlots.length) {
            const targetSlot = hotbarSlots[slotIndex];
            if (bestTools[toolType].slot !== targetSlot) {
                // Swap to hotbar
                inventory.swapHotbar(bestTools[toolType].slot, slotIndex);
                Chat.log(`Moved ${bestTools[toolType].item.getName().getString()} to hotbar slot ${slotIndex + 1}`);
            }
            slotIndex++;
        }
    }
}

function suggestOrganization(items) {
    Chat.log("\nSuggested organization:");

    // Group by category
    const grouped = {};
    for (const item of items) {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
    }

    for (const [category, categoryItems] of Object.entries(grouped)) {
        if (categoryItems.length > 0) {
            Chat.log(`\n${category.toUpperCase()}:`);

            // Sort by count (descending)
            categoryItems.sort((a, b) => b.count - a.count);

            for (const item of categoryItems.slice(0, 5)) {
                Chat.log(`- ${item.item.getName().getString()} x${item.count} (slot ${item.slot})`);
            }

            if (categoryItems.length > 5) {
                Chat.log(`... and ${categoryItems.length - 5} more`);
            }
        }
    }
}

// Auto-organize when inventory opens
JsMacros.on("ScreenOpen", JavaWrapper.methodToJavaAsync((event) => {
    if (event.screenName === "Survival Inventory") {
        // Wait for inventory to fully load
        JsMacros.waitForEvent("Tick");
        organizePlayerInventory();
    }
}));
```

### Auto-Equip Best Armor
```javascript
function autoEquipBestArmor() {
    const inventory = Player.getInventory();
    if (!inventory) return;

    const armorSlots = [
        { slot: "helmet", type: "helmet", current: inventory.getHelmet() },
        { slot: "chestplate", type: "chestplate", current: inventory.getChestplate() },
        { slot: "leggings", type: "leggings", current: inventory.getLeggings() },
        { slot: "boots", type: "boots", current: inventory.getBoots() }
    ];

    const armorPriority = {
        "netherite": 5,
        "diamond": 4,
        "iron": 3,
        "chain": 2,
        "golden": 1,
        "leather": 0
    };

    let madeChanges = false;

    for (const armorPiece of armorSlots) {
        const current = armorPiece.current;
        let currentPriority = -1;

        if (!current.isEmpty()) {
            const currentId = current.getItemId();
            for (const [material, priority] of Object.entries(armorPriority)) {
                if (currentId.includes(material)) {
                    currentPriority = priority;
                    break;
                }
            }
        }

        // Find best armor piece of this type in inventory
        const allSlots = inventory.getSlots("main", "hotbar");
        let bestPiece = null;
        let bestPriority = currentPriority;
        let bestSlot = -1;

        for (const slot of allSlots) {
            const item = inventory.getSlot(slot);
            if (item.isEmpty()) continue;

            const itemId = item.getItemId();

            // Check if this is the right armor type
            if (!itemId.includes(armorPiece.type)) continue;

            // Check priority
            let priority = -1;
            for (const [material, prio] of Object.entries(armorPriority)) {
                if (itemId.includes(material)) {
                    priority = prio;
                    break;
                }
            }

            if (priority > bestPriority) {
                bestPriority = priority;
                bestPiece = item;
                bestSlot = slot;
            }
        }

        // Equip if better piece found
        if (bestPiece && bestSlot !== -1) {
            // Swap the armor piece
            const armorSlotNum = inventory.getSlots(armorPiece.slot)[0];
            inventory.swapHotbar(bestSlot, armorSlotNum);

            Chat.log(`Equipped better ${armorPiece.type}: ${bestPiece.getName().getString()}`);
            madeChanges = true;

            // Small delay to prevent issues
            JsMacros.waitForEvent("Tick");
        }
    }

    if (madeChanges) {
        Chat.actionbar("&aAuto-equipped better armor!");
    }
}

// Auto-equip when picking up new armor
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    // Check for armor pickup messages (this may vary by server)
    const message = event.message.getString().toLowerCase();
    if (message.includes("pick") || message.includes("obtained")) {
        // Wait a bit for inventory to update
        setTimeout(() => {
            autoEquipBestArmor();
        }, 500);
    }
}));
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends RecipeInventory which extends the base Inventory class
- Supports all standard player inventory operations
- Compatible with Minecraft's standard inventory system

## Related Classes

- `RecipeInventory<T>` - Parent class providing crafting functionality
- `Inventory<T>` - Base class providing core inventory operations
- `CreativeInventory` - Creative mode inventory management
- `ContainerInventory` - Container inventory management
- `ItemStackHelper` - Item stack operations and information
- `RecipeHelper` - Recipe information and crafting operations
- `InventoryScreen` - Minecraft's inventory screen handler

## Notes and Limitations

- PlayerInventory instances are only valid while the survival inventory screen is open
- Creative mode inventory uses `CreativeInventory` class instead
- Slot numbering follows Minecraft's internal inventory system
- Some operations may not work on all server types due to anti-cheat plugins
- Always check if `inventory` returns a valid value before operations
- The crafting grid is 2x2 for player inventory (vs 3x3 for crafting tables)
- Recipe book functionality requires the inventory screen to be open
- Hotbar slot numbering can vary (0-8 or 36-44) depending on context
- Armor slots are fixed: helmet=5, chestplate=6, leggings=7, boots=8, offhand=45