# CreativeInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.CreativeInventory`

**Extends:** `Inventory<CreativeInventoryScreen>`

**Since:** `1.8.4`

The `CreativeInventory` class provides specialized access to Minecraft's creative mode inventory interface, allowing scripts to interact with creative inventory tabs, search functionality, hotbar management, and item spawning capabilities. This class extends the base `Inventory` class and adds creative mode-specific functionality for browsing item categories, searching items, managing saved hotbars, and directly manipulating inventory contents in creative mode.

Creative mode inventory in Minecraft has the following main components:
- **Creative Item Tabs:** Categorized item groups (Building Blocks, Decorations, Redstone, etc.)
- **Search Tab:** Text-based item search functionality
- **Inventory Tab:** Player's survival-style inventory
- **Hotbar Tab:** Saved creative hotbar configurations
- **Item List:** Scrollable list of all items in selected category
- **Cursor Stack:** Creative mode's ability to hold item stacks on the mouse cursor

## Accessing CreativeInventory

You typically get `CreativeInventory` instances when the player has the creative inventory screen open:

```javascript
// Check if current screen is creative inventory
const inv = Inventory.create();
if (inv && inv.getType() === "Creative") {
    const creative = inv; // Already typed as CreativeInventory
    Chat.log("Creative inventory detected!");
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Scroll and Navigation
- [instance.scroll(amount)](#instancescrollamount)
- [instance.scrollTo(position)](#instancescrolltoposition)
- [instance.selectTab(tabName)](#instanceselecttabtabname)
- [instance.selectSearch()](#instanceselectsearch)
- [instance.selectInventory()](#instanceselectinventory)
- [instance.selectHotbar()](#instanceselecthotbar)
- [instance.getTabNames()](#instancegettabnames)
- [instance.getTabTexts()](#instancegettabtexts)

### Search Functionality
- [instance.search(searchString)](#instancesearchsearchstring)
- [instance.getShownItems()](#instancegetshownitems)

### Item Management
- [instance.setStack(slot, stack)](#instancesetstackslot-stack)
- [instance.setCursorStack(stack)](#instancesetcursorstackstack)
- [instance.destroyHeldItem()](#instancedestroyhelditem)
- [instance.destroyAllItems()](#instancedestroyallitems)

### Hotbar Management
- [instance.saveHotbar(index)](#instancesavehotbarindex)
- [instance.restoreHotbar(index](#instancerestorehotbarindex)
- [instance.getSavedHotbar(index)](#instancegetsavedhotbarindex)
- [instance.isInHotbar(slot)](#instanceisinhotbarslot)

### Equipment Access
- [instance.getOffhand()](#instancegetoffhand)
- [instance.getHelmet()](#instancegethelmet)
- [instance.getChestplate()](#instancegetchestplate)
- [instance.getLeggings()](#instancegetleggings)
- [instance.getBoots()](#instancegetboots)

---

## Method Details

### Scroll and Navigation

### Search Functionality

### Item Management

### Hotbar Management

### Equipment Access

## Inherited Methods

From the base `Inventory` class, `CreativeInventory` inherits all standard inventory management methods:

### Slot Management
- `getSlot(slot)` - Get item at specific slot index
- `getTotalSlots()` - Get total number of slots
- `getSlotUnderMouse()` - Get slot index under mouse cursor
- `getHeld()` - Get item currently held by mouse

### Item Operations
- `click(slot)` - Click a slot
- `click(slot, mouseButton)` - Click with specific mouse button
- `quick(slot)` - Shift-click to move items
- `dropSlot(slot)` - Drop items from slot
- `swapHotbar(slot, hotbarSlot)` - Swap with hotbar slot
- `swap(slot1, slot2)` - Swap two slots

### Search and Query
- `contains(item)` - Check if inventory contains item
- `findItem(item)` - Find all slots with specific item
- `getItems()` - Get all non-empty items
- `getItemCount()` - Get item counts by type
- `getItems(mapIdentifiers)` - Get items from specific mapped areas

### Utility
- `close()` - Close the inventory
- `getType()` - Get inventory type name
- `getMap()` - Get slot mapping information
- `getLocation(slot)` - Get location description for slot
- `getSlotPos(slot)` - Get screen position of slot

---

## Usage Examples

### Creative Tab Navigator

```javascript
function navigateCreativeTabs() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Creative")) {
        Chat.log("Please open creative inventory first");
        return;
    }

    Chat.log("=== Creative Tab Navigator ===");

    const tabNames = inv.getTabNames();

    // Display all available tabs
    Chat.log(`Available tabs (${tabNames.size()}):`);
    for (let i = 0; i < tabNames.size(); i++) {
        Chat.log(`  ${i + 1}. ${tabNames.get(i)}`);
    }

    // Cycle through tabs and show item counts
    Chat.log("\nAnalyzing each tab...");

    for (let i = 0; i < Math.min(tabNames.size(), 5); i++) { // Limit to first 5 tabs
        const tabName = tabNames.get(i);

        try {
            inv.selectTab(tabName);

            // Wait a moment for tab to load
            setTimeout(() => {
                const items = inv.getShownItems();
                Chat.log(`${tabName}: ${items.size()} items`);

                // Show some sample items
                if (items.size() > 0) {
                    const sampleCount = Math.min(3, items.size());
                    let sampleText = "  Samples: ";
                    for (let j = 0; j < sampleCount; j++) {
                        const item = items.get(j);
                        sampleText += item.getName().getString();
                        if (j < sampleCount - 1) sampleText += ", ";
                    }
                    Chat.log(sampleText);
                }
            }, 100);

        } catch (e) {
            Chat.log(`Could not select tab "${tabName}": ${e.message}`);
        }
    }
}

// Example usage
navigateCreativeTabs();
```

### Creative Search Assistant

```javascript
function creativeSearchAssistant() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Creative")) {
        Chat.log("Creative inventory not open");
        return;
    }

    // Common search terms to demonstrate
    const searchTerms = [
        "diamond",
        "netherite",
        "sword",
        "pickaxe",
        "redstone",
        "torch",
        "oak",
        "stone",
        "enchanted",
        "potion"
    ];

    Chat.log("=== Creative Search Assistant ===");

    function performSearch(term) {
        return new Promise((resolve) => {
            inv.selectSearch().search(term);

            // Wait for search to complete
            setTimeout(() => {
                const results = inv.getShownItems();
                resolve({
                    term: term,
                    count: results.size(),
                    items: results
                });
            }, 200);
        });
    }

    // Perform searches sequentially
    async function runSearches() {
        for (const term of searchTerms) {
            Chat.log(`Searching for "${term}"...`);

            const result = await performSearch(term);
            Chat.log(`  Found ${result.count} items`);

            // Show top 3 results
            if (result.count > 0) {
                const displayCount = Math.min(3, result.count);
                for (let i = 0; i < displayCount; i++) {
                    const item = result.items.get(i);
                    const name = item.getName().getString();
                    const id = item.getItemId();
                    Chat.log(`    ${i + 1}. ${name} (${id})`);
                }

                if (result.count > displayCount) {
                    Chat.log(`    ... and ${result.count - displayCount} more`);
                }
            }

            // Small delay between searches
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        Chat.log("Search completed!");
    }

    runSearches().catch(e => Chat.log(`Search error: ${e.message}`));
}

// Example usage
creativeSearchAssistant();
```

### Hotbar Manager

```javascript
function creativeHotbarManager() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Creative")) {
        Chat.log("Creative inventory not open");
        return;
    }

    Chat.log("=== Creative Hotbar Manager ===");

    // Display all saved hotbars
    for (let i = 0; i < 9; i++) {
        const savedItems = inv.getSavedHotbar(i);
        const nonEmptyItems = savedItems.filter(item => !item.isEmpty());

        if (nonEmptyItems.length > 0) {
            Chat.log(`\nHotbar Slot ${i} (${nonEmptyItems.length}/9 items):`);

            for (let j = 0; j < savedItems.size(); j++) {
                const item = savedItems.get(j);
                if (!item.isEmpty()) {
                    const name = item.getName().getString();
                    const count = item.getCount();
                    const enchantments = item.getEnchantments ? item.getEnchantments().size() : 0;

                    let info = `  [${j}] ${name} x${count}`;
                    if (enchantments > 0) {
                        info += ` (${enchantments} enchantments)`;
                    }
                    Chat.log(info);
                }
            }
        } else {
            Chat.log(`Hotbar Slot ${i}: Empty`);
        }
    }

    // Example: Save current hotbar to first empty slot
    const currentHotbarItems = [];
    for (let i = 36; i < 45; i++) { // Hotbar slots in main inventory
        const item = inv.getSlot(i);
        if (!item.isEmpty()) {
            currentHotbarItems.push(item);
        }
    }

    if (currentHotbarItems.length > 0) {
        Chat.log(`\nCurrent hotbar has ${currentHotbarItems.length} items`);

        // Find first empty hotbar save slot
        let emptySlot = -1;
        for (let i = 0; i < 9; i++) {
            const savedItems = inv.getSavedHotbar(i);
            const hasItems = savedItems.some(item => !item.isEmpty());
            if (!hasItems) {
                emptySlot = i;
                break;
            }
        }

        if (emptySlot !== -1) {
            Chat.log(`Found empty hotbar slot at index ${emptySlot}`);
            Chat.log("Use inv.saveHotbar(" + emptySlot + ") to save current configuration");
        } else {
            Chat.log("All hotbar save slots are used. Consider overwriting an existing slot.");
        }
    } else {
        Chat.log("\nCurrent hotbar is empty");
    }

    // Example: Function to restore a specific hotbar
    Chat.log("\nTo restore a hotbar, use:");
    Chat.log("inv.restoreHotbar(slotIndex) // where slotIndex is 0-8");
}

// Example usage
creativeHotbarManager();
```

### Inventory Organization Assistant

```javascript
function organizeCreativeInventory() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Creative")) {
        Chat.log("Creative inventory not open");
        return;
    }

    Chat.log("=== Creative Inventory Organizer ===");

    // Switch to inventory tab to see player's inventory
    inv.selectInventory();

    // Analyze current inventory contents
    const itemCounts = {};
    let totalItems = 0;
    let emptySlots = 0;

    // Check main inventory (slots 9-35)
    Chat.log("\nMain Inventory Analysis:");
    for (let i = 9; i < 36; i++) {
        const item = inv.getSlot(i);
        if (item.isEmpty()) {
            emptySlots++;
        } else {
            const id = item.getItemId();
            itemCounts[id] = (itemCounts[id] || 0) + item.getCount();
            totalItems++;
        }
    }

    Chat.log(`Total item stacks: ${totalItems}`);
    Chat.log(`Empty slots: ${emptySlots}/27`);

    // Show item distribution
    if (Object.keys(itemCounts).length > 0) {
        Chat.log("\nItem distribution:");
        const sortedItems = Object.entries(itemCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Top 10 items

        for (const [itemId, count] of sortedItems) {
            Chat.log(`  ${itemId}: ${count} items`);
        }
    }

    // Check armor slots
    Chat.log("\nEquipment Status:");
    const armorPieces = [
        { name: "Helmet", slot: 39 },
        { name: "Chestplate", slot: 38 },
        { name: "Leggings", slot: 37 },
        { name: "Boots", slot: 36 },
        { name: "Offhand", slot: 40 }
    ];

    for (const armor of armorPieces) {
        const item = inv.getSlot(armor.slot);
        if (!item.isEmpty()) {
            const name = item.getName().getString();
            const damage = item.getMaxDamage() > 0 ?
                `${item.getDamage()}/${item.getMaxDamage()}` : "No durability";
            Chat.log(`  ${armor.name}: ${name} (${damage})`);
        } else {
            Chat.log(`  ${armor.name}: Empty`);
        }
    }

    // Check hotbar
    Chat.log("\nHotbar Status:");
    let hotbarItemCount = 0;
    for (let i = 0; i < 9; i++) {
        const item = inv.getSlot(i);
        if (!item.isEmpty()) {
            hotbarItemCount++;
            const name = item.getName().getString();
            const count = item.getCount();
            Chat.log(`  Slot ${i}: ${name} x${count}`);
        }
    }
    Chat.log(`Hotbar usage: ${hotbarItemCount}/9 slots`);

    // Provide organization tips
    Chat.log("\nOrganization Tips:");
    if (emptySlots < 5) {
        Chat.log("  ⚠️  Low inventory space! Consider organizing or using chests.");
    }

    if (hotbarItemCount < 3) {
        Chat.log("  💡 Hotbar is mostly empty. Consider adding frequently used items.");
    }

    const hasArmor = armorPieces.some(armor => !inv.getSlot(armor.slot).isEmpty());
    if (!hasArmor) {
        Chat.log("  🛡️  No armor equipped. Consider getting some protection.");
    }

    // Suggest item categories to organize
    const categories = {};
    for (const [itemId] of Object.entries(itemCounts)) {
        const category = itemId.split(':')[0] || 'unknown';
        categories[category] = (categories[category] || 0) + 1;
    }

    if (Object.keys(categories).length > 5) {
        Chat.log("  📦 Many different item types detected. Consider grouping similar items together.");
    }
}

// Example usage
organizeCreativeInventory();
```

### Creative Item Spawner

```javascript
function creativeItemSpawner() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Creative")) {
        Chat.log("Creative inventory not open");
        return;
    }

    Chat.log("=== Creative Item Spawner ===");

    // Common useful items to spawn
    const usefulItems = [
        { id: "minecraft:diamond_sword", name: "Diamond Sword" },
        { id: "minecraft:diamond_pickaxe", name: "Diamond Pickaxe" },
        { id: "minecraft:diamond_shovel", name: "Diamond Shovel" },
        { id: "minecraft:diamond_axe", name: "Diamond Axe" },
        { id: "minecraft:diamond_hoe", name: "Diamond Hoe" },
        { id: "minecraft:diamond", count: 64, name: "Diamond x64" },
        { id: "minecraft:iron_ingot", count: 64, name: "Iron Ingot x64" },
        { id: "minecraft:gold_ingot", count: 64, name: "Gold Ingot x64" },
        { id: "minecraft:oak_planks", count: 64, name: "Oak Planks x64" },
        { id: "minecraft:cobblestone", count: 64, name: "Cobblestone x64" },
        { id: "minecraft:torch", count: 64, name: "Torch x64" },
        { id: "minecraft:cooked_beef", count: 64, name: "Cooked Beef x64" },
        { id: "minecraft:ender_pearl", count: 16, name: "Ender Pearls x16" },
        { id: "minecraft:ender_eye", count: 12, name: "Ender Eyes x12" },
        { id: "minecraft:obsidian", count: 64, name: "Obsidian x64" }
    ];

    // Find empty slots for spawning items
    const emptySlots = [];
    for (let i = 9; i < 36; i++) { // Main inventory slots
        if (inv.getSlot(i).isEmpty()) {
            emptySlots.push(i);
        }
    }

    Chat.log(`Found ${emptySlots.length} empty inventory slots`);

    if (emptySlots.length === 0) {
        Chat.log("No empty slots available. Clear some inventory space first.");
        return;
    }

    // Spawn items in empty slots
    let itemsSpawned = 0;
    const maxItemsToSpawn = Math.min(usefulItems.length, emptySlots.length);

    for (let i = 0; i < maxItemsToSpawn; i++) {
        const itemData = usefulItems[i];
        const slot = emptySlots[i];

        try {
            // Create the item stack
            const count = itemData.count || 1;
            const itemStack = RegistryHelper.getItemStack(itemData.id, count.toString());

            // Place it in the slot
            inv.setStack(slot, itemStack);

            Chat.log(`✓ Spawned ${itemData.name} in slot ${slot}`);
            itemsSpawned++;

        } catch (e) {
            Chat.log(`✗ Failed to spawn ${itemData.name}: ${e.message}`);
        }
    }

    Chat.log(`\nSpawned ${itemsSpawned}/${maxItemsToSpawn} items successfully`);

    // If there are still empty slots, offer to spawn more
    if (emptySlots.length > usefulItems.length) {
        Chat.log(`Still have ${emptySlots.length - usefulItems.length} empty slots available`);
        Chat.log("You can spawn more items manually using:");
        Chat.log("const item = RegistryHelper.getItemStack('minecraft:item_id', 'count');");
        Chat.log("inv.setStack(slot_number, item);");
    }

    // Quick equipment setup
    Chat.log("\n=== Quick Equipment Setup ===");

    // Check if armor slots are empty and equip basic diamond armor
    const armorSlots = [
        { slot: 39, id: "minecraft:diamond_helmet", name: "Diamond Helmet" },
        { slot: 38, id: "minecraft:diamond_chestplate", name: "Diamond Chestplate" },
        { slot: 37, id: "minecraft:diamond_leggings", name: "Diamond Leggings" },
        { slot: 36, id: "minecraft:diamond_boots", name: "Diamond Boots" }
    ];

    let armorEquipped = 0;
    for (const armor of armorSlots) {
        if (inv.getSlot(armor.slot).isEmpty()) {
            try {
                const armorStack = RegistryHelper.getItemStack(armor.id, "1");
                inv.setStack(armor.slot, armorStack);
                Chat.log(`✓ Equipped ${armor.name}`);
                armorEquipped++;
            } catch (e) {
                Chat.log(`✗ Failed to equip ${armor.name}: ${e.message}`);
            }
        }
    }

    if (armorEquipped > 0) {
        Chat.log(`Equipped ${armorEquipped} pieces of diamond armor`);
    } else {
        Chat.log("Armor slots already occupied");
    }

    Chat.log("\nItem spawning completed! 🎉");
}

// Example usage
creativeItemSpawner();
```

### Creative Mode Builder Assistant

```javascript
function creativeBuilderAssistant() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Creative")) {
        Chat.log("Creative inventory not open");
        return;
    }

    Chat.log("=== Creative Builder Assistant ===");

    // Building material kits
    const buildingKits = {
        "Starter House": [
            { id: "minecraft:oak_planks", count: 512, name: "Oak Planks" },
            { id: "minecraft:cobblestone", count: 256, name: "Cobblestone" },
            { id: "minecraft:glass", count: 128, name: "Glass" },
            { id: "minecraft:oak_door", count: 8, name: "Oak Doors" },
            { id: "minecraft:torch", count: 32, name: "Torches" },
            { id: "minecraft:crafting_table", count: 4, name: "Crafting Tables" },
            { id: "minecraft:chest", count: 8, name: "Chests" }
        ],
        "Redstone Lab": [
            { id: "minecraft:redstone", count: 256, name: "Redstone Dust" },
            { id: "minecraft:redstone_torch", count: 64, name: "Redstone Torches" },
            { id: "minecraft:repeater", count: 32, name: "Repeaters" },
            { id: "minecraft:comparator", count: 16, name: "Comparators" },
            { id: "minecraft:piston", count: 32, name: "Pistons" },
            { id: "minecraft:sticky_piston", count: 16, name: "Sticky Pistons" },
            { id: "minecraft:observer", count: 16, name: "Observers" },
            { id: "minecraft:stone_button", count: 32, name: "Stone Buttons" },
            { id: "minecraft:lever", count: 16, name: "Levers" }
        ],
        "Farm Setup": [
            { id: "minecraft:oak_sapling", count: 32, name: "Oak Saplings" },
            { id: "minecraft:wheat_seeds", count: 64, name: "Wheat Seeds" },
            { id: "minecraft:bone_meal", count: 64, name: "Bone Meal" },
            { id: "minecraft:water_bucket", count: 4, name: "Water Buckets" },
            { id: "minecraft:iron_hoe", count: 2, name: "Iron Hoes" },
            { id: "minecraft:fence", count: 64, name: "Oak Fences" },
            { id: "minecraft:fence_gate", count: 16, name: "Fence Gates" }
        ],
        "Mining Kit": [
            { id: "minecraft:diamond_pickaxe", count: 1, name: "Diamond Pickaxe" },
            { id: "minecraft:diamond_shovel", count: 1, name: "Diamond Shovel" },
            { id: "minecraft:diamond_axe", count: 1, name: "Diamond Axe" },
            { id: "minecraft:torch", count: 128, name: "Torches" },
            { id: "minecraft:cooked_beef", count: 64, name: "Cooked Beef" },
            { id: "minecraft:bread", count: 32, name: "Bread" },
            { id: "minecraft:water_bucket", count: 2, name: "Water Buckets" },
            { id: "minecraft:ladder", count: 64, name: "Ladders" }
        ]
    };

    // Display available kits
    Chat.log("Available building kits:");
    const kitNames = Object.keys(buildingKits);
    for (let i = 0; i < kitNames.length; i++) {
        const kit = kitNames[i];
        const items = buildingKits[kit];
        const totalStacks = items.length;
        Chat.log(`  ${i + 1}. ${kit} (${totalStacks} different items)`);
    }

    // Function to spawn a specific kit
    function spawnKit(kitName) {
        const kit = buildingKits[kitName];
        if (!kit) {
            Chat.log(`Kit "${kitName}" not found`);
            return false;
        }

        Chat.log(`\nSpawning ${kitName} kit...`);

        // Find empty slots
        const emptySlots = [];
        for (let i = 9; i < 36; i++) {
            if (inv.getSlot(i).isEmpty()) {
                emptySlots.push(i);
            }
        }

        if (emptySlots.length < kit.length) {
            Chat.log(`Not enough empty slots. Need ${kit.length}, have ${emptySlots.length}`);
            return false;
        }

        // Spawn kit items
        let itemsSpawned = 0;
        for (let i = 0; i < kit.length; i++) {
            const itemData = kit[i];
            const slot = emptySlots[i];

            try {
                const itemStack = RegistryHelper.getItemStack(itemData.id, itemData.count.toString());
                inv.setStack(slot, itemStack);
                Chat.log(`  ✓ ${itemData.name} x${itemData.count}`);
                itemsSpawned++;
            } catch (e) {
                Chat.log(`  ✗ Failed to spawn ${itemData.name}: ${e.message}`);
            }
        }

        Chat.log(`\nSuccessfully spawned ${itemsSpawned}/${kit.length} items from ${kitName} kit`);
        return true;
    }

    // Auto-spawn recommended kits based on common needs
    Chat.log("\n=== Recommended Quick Setup ===");

    // Check what's already in inventory
    const hasTools = ["sword", "pickaxe", "axe", "shovel"].some(tool =>
        inv.getItems().some(item => item.getItemId().includes(tool))
    );

    const hasBuildingMaterials = inv.getItems().some(item =>
        ["planks", "cobblestone", "wood"].includes(item.getItemId().split('_').pop())
    );

    if (!hasTools) {
        Chat.log("No tools detected - spawning Mining Kit...");
        spawnKit("Mining Kit");
    } else {
        Chat.log("Tools already available in inventory");
    }

    if (!hasBuildingMaterials) {
        setTimeout(() => {
            Chat.log("No building materials detected - spawning Starter House kit...");
            spawnKit("Starter House");
        }, 1000);
    } else {
        Chat.log("Building materials already available in inventory");
    }

    // Provide instructions for manual kit spawning
    Chat.log("\n=== Manual Kit Spawning ===");
    Chat.log("To spawn other kits, use:");
    Chat.log("spawnKit('Redstone Lab');");
    Chat.log("spawnKit('Farm Setup');");

    // Make spawnKit function available globally for easy use
    global.spawnKit = spawnKit;

    Chat.log("\nBuilder assistant ready! 🏗️");
    Chat.log("Use spawnKit('kit_name') to spawn specific building kits.");
}

// Example usage
creativeBuilderAssistant();
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends `Inventory<CreativeInventoryScreen>`
- Built on Minecraft's CreativeInventoryScreen and CreativeScreenHandler
- Only available in creative mode

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `CreativeInventoryScreen` - Minecraft's creative inventory screen class
- `ItemStackHelper` - Represents items in creative slots
- `RegistryHelper` - Used to create item stacks for spawning
- `PlayerInventory` - Player's main inventory interface

## Notes and Limitations

- The creative inventory interface must be open to use `CreativeInventory` methods
- Some functionality (like search) only works when appropriate tabs are selected
- Hotbar management is creative mode-specific and doesn't affect survival gameplay
- Item spawning using `setStack()` only works in creative mode
- Tab names are case-sensitive and must match exactly what appears in the UI
- Scroll functionality only works when the current tab has more items than can fit on screen
- The `destroyAllItems()` method is permanent and cannot be undone
- Creative hotbar saves are stored locally and persist between sessions
- Equipment access methods (getHelmet, getChestplate, etc.) work with standard armor slot indices
- Some methods may have different behavior in multiplayer versus singleplayer worlds