# CartographyInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.CartographyInventory`

**Extends:** `Inventory<CartographyTableScreen>`

**Since:** `1.8.4`

The `CartographyInventory` class provides functionality for interacting with cartography table screens in Minecraft. It extends the base `Inventory` class and adds cartography-specific functionality while inheriting all standard inventory operations. This class allows you to automate map cloning, extending, locking, and other cartography operations.

This class is automatically created when you open a cartography table screen and can be accessed through `Player.getInventory()` or `Inventory.create()` when a cartography table is open.

## Cartography Table Overview

The cartography table interface consists of three main slots:
- **Map Item Slot** (Slot 0): Input slot for existing maps to be modified
- **Material Slot** (Slot 1): Input slot for paper (for extending/zooming out) or empty maps (for cloning)
- **Output Slot** (Slot 2): Result slot showing the modified map

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)

---

## Constructors

- [CartographyInventory()](#cartographyinventory)

---

## Methods

### Cartography Operations
- [instance.getMapItem()](#instancegetmapitem)
- [instance.getMaterial()](#instancegetmaterial)
- [instance.getOutput()](#instancegetoutput)

### Inherited from Inventory
- [Core Operations](#core-operations)
- [Slot Management](#slot-management)
- [Item Search and Filtering](#item-search-and-filtering)
- [Click Actions](#click-actions)
- [Hotbar Management](#hotbar-management)
- [Container Information](#container-information)
- [Mouse Interaction](#mouse-interaction)

---

## Constructors

### CartographyInventory()
```js
// CartographyInventory instances are typically created automatically by JSMacros
const inventory = Player.getInventory(); // Returns CartographyInventory when cartography table is open
const inventory = Inventory.create();    // Returns appropriate type for current screen
```

Creates a new `CartographyInventory` instance for the specified cartography table screen.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| inventory | `CartographyTableScreen` | The cartography table screen handler |

**Notes:**
- This constructor is primarily used internally by JSMacros
- Scripts typically obtain instances through `Player.getInventory()` or `Inventory.create()`
- The instance is only valid while the cartography table screen is open

---

## Cartography Operations

## Core Operations (Inherited)

### Cartography Table Detection
```js
// Check if current inventory is a cartography table
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    Chat.log("Currently viewing a cartography table");
    Chat.log(`Table title: ${inventory.getContainerTitle()}`);
}
```

### Cartography Slot Access
```js
// Get all input slots
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    const inputSlots = inventory.getSlots("input");
    Chat.log(`Input slots: ${inputSlots.join(", ")}`);

    // Get output slots
    const outputSlots = inventory.getSlots("output");
    Chat.log(`Output slots: ${outputSlots.join(", ")}`);

    // List all items in cartography table
    const inputItems = inventory.getItems("input");
    const outputItems = inventory.getItems("output");

    Chat.log(`Input items: ${inputItems.length}`);
    Chat.log(`Output items: ${outputItems.length}`);
}
```

### Slot Location Information
```js
// Check which section a slot belongs to
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    // Check specific slots
    for (let i = 0; i < 3; i++) {
        const location = inventory.getLocation(i);
        const item = inventory.getSlot(i);
        Chat.log(`Slot ${i} (${location}): ${item.getItemId() || "empty"}`);
    }
}
```

---

## Slot Management (Inherited)

### Getting Slot Information
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    const totalSlots = inventory.getTotalSlots();
    Chat.log(`Total slots: ${totalSlots}`);

    // Check first 3 slots (cartography table interface)
    for (let i = 0; i < Math.min(3, totalSlots); i++) {
        const item = inventory.getSlot(i);
        if (!item.isEmpty()) {
            const location = inventory.getLocation(i);
            Chat.log(`Slot ${i} (${location}): ${item.getItemId()} x${item.getCount()}`);
        }
    }
}
```

### Finding Free Slots
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    // Find free player inventory slot for output
    const inventoryFree = inventory.findFreeInventorySlot();
    if (inventoryFree !== -1) {
        Chat.log(`Free inventory slot: ${inventoryFree}`);
    }

    // Find free hotbar slot
    const hotbarFree = inventory.findFreeHotbarSlot();
    if (hotbarFree !== -1) {
        Chat.log(`Free hotbar slot: ${hotbarFree}`);
    }
}
```

---

## Item Search and Filtering (Inherited)

### Checking Map and Paper Contents
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    // Check for maps in the entire inventory
    const hasMaps = inventory.contains("minecraft:filled_map");
    const hasEmptyMaps = inventory.contains("minecraft:map");
    const hasPaper = inventory.contains("minecraft:paper");

    Chat.log(`Has filled maps: ${hasMaps}`);
    Chat.log(`Has empty maps: ${hasEmptyMaps}`);
    Chat.log(`Has paper: ${hasPaper}`);

    // Find all map slots
    const mapSlots = inventory.findItem("minecraft:filled_map");
    if (mapSlots.length > 0) {
        Chat.log(`Found maps in slots: ${mapSlots.join(", ")}`);
    }

    // Get item counts
    const itemCounts = inventory.getItemCount();
    if (itemCounts["minecraft:paper"]) {
        Chat.log(`Total paper: ${itemCounts["minecraft:paper"]}`);
    }
}
```

---

## Click Actions (Inherited)

### Basic Cartography Operations
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    const cartographyInv = inventory;

    // Click input slots
    cartographyInv.click(0); // Click map slot
    cartographyInv.click(1); // Click material slot

    // Quick move (shift-click) output to inventory
    cartographyInv.quick(2); // Shift-click output slot

    // Swap with hotbar
    cartographyInv.swapHotbar(0, 0); // Swap map slot with hotbar slot 1
}
```

### Map Processing Workflow
```js
function processMapInCartographyTable() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Cartography Table") {
        Chat.log("No cartography table open!");
        return false;
    }

    const cartographyInv = inventory;

    // Check current state
    const mapItem = cartographyInv.getMapItem();
    const material = cartographyInv.getMaterial();
    const output = cartographyInv.getOutput();

    if (!mapItem.isEmpty() && output.isEmpty() && material.isEmpty()) {
        Chat.log("Map placed but no material - needs paper or empty map");
        return false;
    }

    if (!output.isEmpty()) {
        Chat.log("Taking cartography result...");
        cartographyInv.quick(2); // Take output
        return true;
    }

    return false;
}
```

---

## Mouse Interaction (Inherited)

```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Cartography Table") {
    // Get slot under mouse cursor
    const slotUnderMouse = inventory.getSlotUnderMouse();
    if (slotUnderMouse >= 0 && slotUnderMouse < 3) {
        const item = inventory.getSlot(slotUnderMouse);
        if (!item.isEmpty()) {
            const slotNames = ["Map Input", "Material Input", "Output"];
            Chat.log(`Mouse over ${slotNames[slotUnderMouse]}: ${item.getName().getString()}`);
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

### Automated Map Cloning
```javascript
function cloneMap(mapCount = 1) {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Cartography Table") {
        Chat.log("Please open a cartography table first!");
        return;
    }

    const cartographyInv = inventory;

    Chat.log(`Starting map cloning for ${mapCount} maps...`);

    // Find empty maps in inventory
    const emptyMapSlots = inventory.findItem("minecraft:map");
    if (emptyMapSlots.length < mapCount) {
        Chat.log(`Not enough empty maps! Need ${mapCount}, have ${emptyMapSlots.length}`);
        return;
    }

    // Find filled maps to clone
    const filledMapSlots = inventory.findItem("minecraft:filled_map");
    if (filledMapSlots.length === 0) {
        Chat.log("No filled maps found to clone!");
        return;
    }

    let clonedCount = 0;

    for (let i = 0; i < mapCount && i < emptyMapSlots.length; i++) {
        // Place filled map in slot 0
        cartographyInv.swapHotbar(filledMapSlots[0], 0);
        cartographyInv.click(0);

        // Place empty map in slot 1
        cartographyInv.swapHotbar(emptyMapSlots[i], 1);
        cartographyInv.click(1);

        // Wait for crafting to complete
        JsMacros.waitForEvent("Tick");

        // Take result
        const output = cartographyInv.getOutput();
        if (!output.isEmpty()) {
            cartographyInv.quick(2);
            clonedCount++;
            Chat.log(`Cloned map ${clonedCount}/${mapCount}`);
        }

        // Clear slots
        cartographyInv.click(0); // Pick up remaining items
        cartographyInv.click(1);

        JsMacros.waitForEvent("Tick");
    }

    Chat.log(`Map cloning complete! Created ${clonedCount} map copies.`);
}

// Example usage
// cloneMap(8); // Clone 8 maps
```

### Automated Map Extending (Zooming Out)
```javascript
function extendMap() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Cartography Table") {
        Chat.log("Please open a cartography table first!");
        return;
    }

    const cartographyInv = inventory;

    // Find filled maps to extend
    const filledMapSlots = inventory.findItem("minecraft:filled_map");
    if (filledMapSlots.length === 0) {
        Chat.log("No filled maps found to extend!");
        return;
    }

    // Check for paper
    const itemCounts = inventory.getItemCount();
    const paperCount = itemCounts["minecraft:paper"] || 0;

    if (paperCount < 8) {
        Chat.log(`Not enough paper! Need 8, have ${paperCount}`);
        return;
    }

    Chat.log("Extending map (zooming out)...");

    // Place map in slot 0
    cartographyInv.swapHotbar(filledMapSlots[0], 0);
    cartographyInv.click(0);

    // Paper should automatically be placed, but if not:
    const paperSlots = inventory.findItem("minecraft:paper");
    if (paperSlots.length > 0) {
        cartographyInv.swapHotbar(paperSlots[0], 1);
        cartographyInv.click(1);
    }

    // Wait for crafting
    JsMacros.waitForEvent("Tick");

    // Take result
    const output = cartographyInv.getOutput();
    if (!output.isEmpty()) {
        cartographyInv.quick(2);
        Chat.log("Map extended successfully!");
    } else {
        Chat.log("Failed to extend map - check if map can be extended further");
    }
}
```

### Map Locking
```javascript
function lockMap() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Cartography Table") {
        Chat.log("Please open a cartography table first!");
        return;
    }

    const cartographyInv = inventory;

    // Find filled maps to lock
    const filledMapSlots = inventory.findItem("minecraft:filled_map");
    if (filledMapSlots.length === 0) {
        Chat.log("No filled maps found to lock!");
        return;
    }

    // Check for glass panes (locking material)
    const itemCounts = inventory.getItemCount();
    const glassPaneCount = itemCounts["minecraft:glass_pane"] || 0;

    if (glassPaneCount === 0) {
        Chat.log("No glass panes found! Required for map locking.");
        return;
    }

    Chat.log("Locking map...");

    // Place map in slot 0 (no material needed for locking)
    cartographyInv.swapHotbar(filledMapSlots[0], 0);
    cartographyInv.click(0);

    // Place glass pane in slot 1
    const glassPaneSlots = inventory.findItem("minecraft:glass_pane");
    if (glassPaneSlots.length > 0) {
        cartographyInv.swapHotbar(glassPaneSlots[0], 1);
        cartographyInv.click(1);
    }

    // Wait for crafting
    JsMacros.waitForEvent("Tick");

    // Take result
    const output = cartographyInv.getOutput();
    if (!output.isEmpty()) {
        cartographyInv.quick(2);
        Chat.log("Map locked successfully!");
    } else {
        Chat.log("Failed to lock map - map may already be locked");
    }
}
```

### Cartography Table Status Monitor
```javascript
function monitorCartographyTable() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Cartography Table") {
        return;
    }

    const cartographyInv = inventory;

    Chat.log("=== Cartography Table Status ===");

    // Check input slots
    const mapItem = cartographyInv.getMapItem();
    const material = cartographyInv.getMaterial();
    const output = cartographyInv.getOutput();

    // Map slot status
    if (!mapItem.isEmpty()) {
        Chat.log(`Map Input: ${mapItem.getName().getString()} x${mapItem.getCount()}`);

        // Analyze map properties if available
        const nbt = mapItem.getNBT();
        if (nbt) {
            // You could extract map-specific NBT data here
            Chat.log("  - Map has custom data");
        }
    } else {
        Chat.log("Map Input: Empty");
    }

    // Material slot status
    if (!material.isEmpty()) {
        const materialId = material.getItemId();
        Chat.log(`Material: ${material.getName().getString()} x${material.getCount()}`);

        if (materialId === "minecraft:paper") {
            Chat.log("  - Paper: Can extend or clone map");
        } else if (materialId === "minecraft:map") {
            Chat.log("  - Empty Map: Can clone map");
        } else if (materialId === "minecraft:glass_pane") {
            Chat.log("  - Glass Pane: Can lock map");
        } else {
            Chat.log("  - Unknown material");
        }
    } else {
        Chat.log("Material: Empty");
    }

    // Output slot status
    if (!output.isEmpty()) {
        Chat.log(`Output: ${output.getName().getString()} x${output.getCount()}`);
        Chat.log("  - Ready to take!");
    } else {
        Chat.log("Output: Empty");

        // Determine why no output
        if (!mapItem.isEmpty() && !material.isEmpty()) {
            Chat.log("  - Check if materials are compatible");
        } else if (mapItem.isEmpty()) {
            Chat.log("  - Need a map item");
        } else if (material.isEmpty()) {
            Chat.log("  - Need material (paper, empty map, or glass pane)");
        }
    }

    // Check player inventory resources
    const itemCounts = inventory.getItemCount();
    Chat.log("\nPlayer Resources:");
    Chat.log(`  - Paper: ${itemCounts["minecraft:paper"] || 0}`);
    Chat.log(`  - Empty Maps: ${itemCounts["minecraft:map"] || 0}`);
    Chat.log(`  - Filled Maps: ${itemCounts["minecraft:filled_map"] || 0}`);
    Chat.log(`  - Glass Panes: ${itemCounts["minecraft:glass_pane"] || 0}`);

    Chat.log("===============================");
}
```

### Automated Map Production Line
```javascript
function mapProductionLine(operation, count = 1) {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Cartography Table") {
        Chat.log("Please open a cartography table first!");
        return;
    }

    const cartographyInv = inventory;
    const itemCounts = inventory.getItemCount();

    let processed = 0;
    let requiredMaterial = "";
    let requiredAmount = 0;

    switch (operation.toLowerCase()) {
        case "clone":
            requiredMaterial = "minecraft:map";
            requiredAmount = count;
            break;
        case "extend":
            requiredMaterial = "minecraft:paper";
            requiredAmount = count * 8;
            break;
        case "lock":
            requiredMaterial = "minecraft:glass_pane";
            requiredAmount = count;
            break;
        default:
            Chat.log("Invalid operation! Use: clone, extend, or lock");
            return;
    }

    // Check resources
    const availableMaterial = itemCounts[requiredMaterial] || 0;
    if (availableMaterial < requiredAmount) {
        Chat.log(`Not enough ${requiredMaterial}! Need ${requiredAmount}, have ${availableMaterial}`);
        return;
    }

    const filledMaps = itemCounts["minecraft:filled_map"] || 0;
    if (filledMaps === 0) {
        Chat.log("No filled maps available for processing!");
        return;
    }

    Chat.log(`Starting ${operation} operation for ${count} maps...`);

    // Process maps
    for (let i = 0; i < count; i++) {
        // Find a filled map
        const mapSlots = inventory.findItem("minecraft:filled_map");
        if (mapSlots.length === 0) {
            Chat.log("Ran out of filled maps!");
            break;
        }

        // Place map
        cartographyInv.swapHotbar(mapSlots[0], 0);
        cartographyInv.click(0);

        // Place material if needed
        if (operation !== "lock" || requiredMaterial === "minecraft:glass_pane") {
            const materialSlots = inventory.findItem(requiredMaterial);
            if (materialSlots.length > 0) {
                cartographyInv.swapHotbar(materialSlots[0], 1);
                cartographyInv.click(1);
            }
        }

        // Wait for crafting
        JsMacros.waitForEvent("Tick");

        // Take result
        const output = cartographyInv.getOutput();
        if (!output.isEmpty()) {
            cartographyInv.quick(2);
            processed++;
            Chat.log(`Processed ${processed}/${count} maps`);
        }

        // Clear slots
        cartographyInv.click(0);
        cartographyInv.click(1);

        JsMacros.waitForEvent("Tick");
    }

    Chat.log(`${operation} operation complete! Processed ${processed} maps.`);
}

// Example usage:
// mapProductionLine("clone", 5);  // Clone 5 maps
// mapProductionLine("extend", 2);  // Extend 2 maps
// mapProductionLine("lock", 3);    // Lock 3 maps
```

---

## Version Information

- Available since JSMacros 1.8.4
- Inherits all functionality from the base `Inventory` class
- Supports all cartography table operations introduced in Minecraft

## Related Classes

- `Inventory<T>` - Base class providing core inventory functionality
- `PlayerInventory` - Player inventory management
- `ItemStackHelper` - Item stack operations and information
- `Pos2D` - Screen position utilities

## Notes and Limitations

- CartographyInventory instances are only valid while the cartography table screen is open
- Map operations require specific materials: empty maps for cloning, paper for extending, glass panes for locking
- Some operations may not work on all server types due to anti-cheat plugins
- Slot numbering is fixed: 0 = map input, 1 = material input, 2 = output
- Always check if `inventory` and `inventory.getType() === "Cartography Table"` before operations
- Map operations may take time to complete due to Minecraft's crafting system
- Cartography table operations follow standard Minecraft rules (map zoom levels, locking restrictions, etc.)
- The class provides access to the cartography table's specific interface while inheriting all general inventory functionality