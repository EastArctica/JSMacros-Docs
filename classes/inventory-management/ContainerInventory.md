# ContainerInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.ContainerInventory`

**Extends:** `Inventory<T>`

**Since:** `1.8.4`

The `ContainerInventory` class provides functionality for interacting with general container screens in Minecraft. This includes chests, shulker boxes, hoppers, and other generic storage containers. It extends the base `Inventory` class and adds container-specific functionality while inheriting all standard inventory operations.

This class is automatically created when you open a container screen and can be accessed through `Player.getInventory()` or `Inventory.create()` when a container is open.

## Supported Container Types

The `ContainerInventory` class handles various container types, including:
- **Chests** (1-9 rows)
- **Shulker Boxes**
- **Hoppers**
- **Generic 3x3 Containers**
- **Barrels**
- **Other generic storage containers**

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)

---

## Constructors

- [ContainerInventory()](#containerinventory)

---

## Methods

### Container Operations
- [instance.findFreeContainerSlot()](#instancefindfreecontainerslot)

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

### ContainerInventory()
```js
// ContainerInventory instances are typically created automatically by JSMacros
const inventory = Player.getInventory(); // Returns ContainerInventory when a container is open
const inventory = Inventory.create();    // Returns appropriate type for current screen
```

Creates a new `ContainerInventory` instance for the specified container screen.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| inventory | `HandledScreen<T>` | The container screen handler |

**Notes:**
- This constructor is primarily used internally by JSMacros
- Scripts typically obtain instances through `Player.getInventory()` or `Inventory.create()`
- The generic type `<T>` represents the specific screen handler type

---

## Container Operations

## Core Operations (Inherited)

### Container Detection
```js
// Check if current inventory is a container
const inventory = Player.getInventory();
if (inventory && inventory.isContainer()) {
    Chat.log("Currently viewing a container");
    Chat.log(`Container title: ${inventory.getContainerTitle()}`);
}
```

### Container Slot Access
```js
// Get all container slots
const inventory = Player.getInventory();
if (inventory && inventory.isContainer()) {
    const containerSlots = inventory.getSlots("container");
    Chat.log(`Container has ${containerSlots.length} slots`);

    // List all items in container
    const containerItems = inventory.getItems("container");
    for (let i = 0; i < containerItems.length; i++) {
        const item = containerItems[i];
        Chat.log(`${item.getItemId()} x${item.getCount()}`);
    }
}
```

### Slot Location Information
```js
// Check which section a slot belongs to
const inventory = Player.getInventory();
const slotUnderMouse = inventory.getSlotUnderMouse();
if (slotUnderMouse >= 0) {
    const location = inventory.getLocation(slotUnderMouse);
    Chat.log(`Slot ${slotUnderMouse} is in: ${location}`);

    if (location === "container") {
        Chat.log("This is a container slot");
    }
}
```

---

## Slot Management (Inherited)

### Getting Slot Information
```js
const inventory = Player.getInventory();
const totalSlots = inventory.getTotalSlots();
Chat.log(`Total slots: ${totalSlots}`);

// Check specific slots
for (let i = 0; i < totalSlots; i++) {
    const item = inventory.getSlot(i);
    if (!item.isEmpty()) {
        const location = inventory.getLocation(i);
        Chat.log(`Slot ${i} (${location}): ${item.getItemId()} x${item.getCount()}`);
    }
}
```

### Finding Free Slots
```js
const inventory = Player.getInventory();

// Find free container slot
const containerFree = inventory.findFreeContainerSlot();
if (containerFree !== -1) {
    Chat.log(`Free container slot: ${containerFree}`);
}

// Find free player inventory slot
const inventoryFree = inventory.findFreeInventorySlot();
if (inventoryFree !== -1) {
    Chat.log(`Free inventory slot: ${inventoryFree}`);
}

// Find free hotbar slot
const hotbarFree = inventory.findFreeHotbarSlot();
if (hotbarFree !== -1) {
    Chat.log(`Free hotbar slot: ${hotbarFree}`);
}
```

---

## Item Search and Filtering (Inherited)

### Checking Item Contents
```js
const inventory = Player.getInventory();

// Check if container contains specific item
const hasDiamonds = inventory.contains("minecraft:diamond");
if (hasDiamonds) {
    Chat.log("Container contains diamonds!");
}

// Check using ItemStackHelper
const mainHandItem = Player.getPlayer().getMainHand();
if (!mainHandItem.isEmpty()) {
    const hasSameItem = inventory.contains(mainHandItem);
    Chat.log(`Container has ${mainHandItem.getName().getString()}: ${hasSameItem}`);
}
```

### Finding Items
```js
const inventory = Player.getInventory();

// Find all diamond slots
const diamondSlots = inventory.findItem("minecraft:diamond");
if (diamondSlots.length > 0) {
    Chat.log(`Found diamonds in slots: ${diamondSlots.join(", ")}`);
}

// Get item counts
const itemCounts = inventory.getItemCount();
for (const [itemId, count] of Object.entries(itemCounts)) {
    Chat.log(`${itemId}: ${count}`);
}

// Get all items in container section
const containerItems = inventory.getItems("container");
Chat.log(`Container has ${containerItems.length} different item types`);
```

---

## Click Actions (Inherited)

### Basic Clicking
```js
const inventory = Player.getInventory();

// Click a specific slot
inventory.click(10); // Left-click slot 10
inventory.click(15, 1); // Right-click slot 15

// Quick move (shift-click) from container
inventory.quick(9); // Shift-click slot 9 to move to player inventory

// Drop items from container
inventory.dropSlot(10); // Drop one item from slot 10
inventory.dropSlot(10, true); // Drop entire stack from slot 10
```

### Slot Swapping
```js
const inventory = Player.getInventory();

// Swap container slot with hotbar
inventory.swapHotbar(10, 0); // Swap slot 10 with hotbar slot 1
inventory.swapHotbar(11, 8); // Swap slot 11 with hotbar slot 9

// Swap with offhand
inventory.swapHotbar(12, 40); // Swap slot 12 with offhand
```

### Drag Clicking
```js
const inventory = Player.getInventory();

// Drag-click multiple slots to distribute items
const slotsToDrag = [9, 10, 11, 12];
inventory.dragClick(slotsToDrag, 0); // Left-click drag
```

---

## Hotbar Management (Inherited)

```js
const inventory = Player.getInventory();

// Get currently selected hotbar slot
const currentSlot = inventory.getSelectedHotbarSlotIndex();
Chat.log(`Selected hotbar slot: ${currentSlot}`);

// Change selected hotbar slot
inventory.setSelectedHotbarSlotIndex(2); // Select slot 3
```

---

## Container Information (Inherited)

### Container Type and Title
```js
const inventory = Player.getInventory();

// Get container type
const containerType = inventory.getType();
Chat.log(`Container type: ${containerType}`);

// Get container title
const title = inventory.getContainerTitle();
Chat.log(`Container title: ${title}`);

// Check if it's a specific type of container
if (inventory.is("Chest", "Shulker Box", "Barrel")) {
    Chat.log("This is a storage container");
}
```

### Slot Mapping
```js
const inventory = Player.getInventory();

// Get slot mappings
const slotMap = inventory.getMap();
for (const [section, slots] of Object.entries(slotMap)) {
    Chat.log(`${section}: ${slots.length} slots`);
}

// Get slot position on screen
const slotPos = inventory.getSlotPos(10);
Chat.log(`Slot 10 position: x=${slotPos.x}, y=${slotPos.y}`);
```

---

## Mouse Interaction (Inherited)

```js
const inventory = Player.getInventory();

// Get slot under mouse cursor
const slotUnderMouse = inventory.getSlotUnderMouse();
if (slotUnderMouse >= 0) {
    const item = inventory.getSlot(slotUnderMouse);
    if (!item.isEmpty()) {
        Chat.log(`Mouse over: ${item.getName().getString()}`);
    }
} else {
    Chat.log("Mouse not over any slot");
}

// Get held item (on cursor)
const heldItem = inventory.getHeld();
if (!heldItem.isEmpty()) {
    Chat.log(`Holding: ${heldItem.getName().getString()} x${heldItem.getCount()}`);
}
```

---

## Usage Examples

### Container Organization Script
```javascript
function organizeContainer() {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.isContainer()) {
        Chat.log("No container open!");
        return;
    }

    Chat.log("Organizing container...");

    // Get all items from container
    const containerItems = inventory.getItems("container");
    const itemStacks = {};

    // Group items by type
    for (const item of containerItems) {
        const itemId = item.getItemId();
        if (!itemStacks[itemId]) {
            itemStacks[itemId] = [];
        }

        const slots = inventory.findItem(itemId);
        for (const slot of slots) {
            const slotItem = inventory.getSlot(slot);
            const location = inventory.getLocation(slot);
            if (location === "container") {
                itemStacks[itemId].push({slot, item: slotItem});
            }
        }
    }

    Chat.log(`Found ${Object.keys(itemStacks).length} different item types`);

    // Report organization
    for (const [itemId, stacks] of Object.entries(itemStacks)) {
        const total = stacks.reduce((sum, stack) => sum + stack.item.getCount(), 0);
        Chat.log(`${itemId}: ${total} items in ${stacks.length} stacks`);
    }
}

// Run when container is opened
JsMacros.on("ScreenOpen", JavaWrapper.methodToJavaAsync((event) => {
    if (event.screenName.includes("Chest") ||
        event.screenName.includes("Shulker") ||
        event.screenName.includes("Barrel")) {
        // Wait a tick for container to fully load
        JsMacros.waitForEvent("Tick");
        organizeContainer();
    }
}));
```

### Quick Deposit Script
```javascript
function quickDepositAll() {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.isContainer()) {
        Chat.log("No container open for deposit!");
        return;
    }

    Chat.log("Depositing items into container...");

    // Find free container slots
    const containerSlots = inventory.getSlots("container");
    const freeSlots = containerSlots.filter(slot => inventory.getSlot(slot).isEmpty());

    if (freeSlots.length === 0) {
        Chat.log("Container is full!");
        return;
    }

    let deposited = 0;

    // Try to deposit from player inventory
    const playerSlots = inventory.getSlots("main", "hotbar");

    for (const slot of playerSlots) {
        const item = inventory.getSlot(slot);
        if (!item.isEmpty() && freeSlots.length > 0) {
            // Quick move to container
            inventory.quick(slot);
            deposited++;

            // Check if slot became free
            if (inventory.getSlot(slot).isEmpty()) {
                // Quick move was successful, find a new free slot
                const newFreeSlots = inventory.getSlots("container").filter(s => inventory.getSlot(s).isEmpty());
                freeSlots.length = 0;
                freeSlots.push(...newFreeSlots);
            }

            // Small delay to prevent overwhelming
            JsMacros.waitForEvent("Tick");
        }
    }

    Chat.log(`Deposited ${deposited} item stacks`);
}

// Usage example: Bind to a key or command
// quickDepositAll();
```

### Container Transfer Script
```javascript
function transferBetweenContainers(fromContainer, toContainer) {
    // This would be used when you have two containers open
    // Implementation depends on your specific use case

    Chat.log("Transferring items between containers...");

    const sourceInventory = Player.getInventory();
    if (!sourceInventory || !sourceInventory.isContainer()) {
        Chat.log("No source container open!");
        return;
    }

    // Get all items from source container
    const items = sourceInventory.getItems("container");
    Chat.log(`Found ${items.length} item stacks to transfer`);

    for (let i = 0; i < Math.min(items.length, 10); i++) {
        const item = items[i];
        const slots = sourceInventory.findItem(item.getItemId());

        for (const slot of slots) {
            const location = sourceInventory.getLocation(slot);
            if (location === "container") {
                // Quick move the item
                sourceInventory.quick(slot);
                Chat.log(`Moved ${item.getName().getString()}`);

                // Small delay
                JsMacros.waitForEvent("Tick");
                break; // Move only one stack per item type
            }
        }
    }

    Chat.log("Transfer complete!");
}
```

### Container Content Scanner
```javascript
function scanContainer() {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.isContainer()) {
        Chat.log("No container open!");
        return;
    }

    const containerType = inventory.getType();
    const containerTitle = inventory.getContainerTitle();

    Chat.log("=== Container Scan ===");
    Chat.log(`Type: ${containerType}`);
    Chat.log(`Title: ${containerTitle}`);

    // Get container mapping
    const slotMap = inventory.getMap();
    const containerSlots = slotMap.container || [];
    Chat.log(`Total container slots: ${containerSlots.length}`);

    // Count items
    const itemCounts = {};
    const emptySlots = [];
    let totalItems = 0;

    for (const slot of containerSlots) {
        const item = inventory.getSlot(slot);
        if (item.isEmpty()) {
            emptySlots.push(slot);
        } else {
            const itemId = item.getItemId();
            itemCounts[itemId] = (itemCounts[itemId] || 0) + item.getCount();
            totalItems += item.getCount();
        }
    }

    Chat.log(`Empty slots: ${emptySlots.length}`);
    Chat.log(`Total items: ${totalItems}`);

    if (Object.keys(itemCounts).length > 0) {
        Chat.log("\nItems in container:");
        for (const [itemId, count] of Object.entries(itemCounts)) {
            Chat.log(`- ${itemId}: ${count}`);
        }
    }

    // Calculate container value (if you have a price database)
    let totalValue = 0;
    for (const [itemId, count] of Object.entries(itemCounts)) {
        // You could add a price lookup system here
        // totalValue += getPrice(itemId) * count;
    }

    return {
        type: containerType,
        title: containerTitle,
        totalSlots: containerSlots.length,
        emptySlots: emptySlots.length,
        itemCounts,
        totalItems
    };
}

// Example usage
const scanResult = scanContainer();
Chat.log(`Scan complete: ${scanResult.totalItems} items in ${scanResult.totalSlots} slots`);
```

---

## Container Type Detection

```javascript
function detectContainerType() {
    const inventory = Player.getInventory();
    if (!inventory) {
        Chat.log("No inventory open");
        return;
    }

    const type = inventory.getType();
    const title = inventory.getContainerTitle();

    Chat.log(`Container Type: ${type}`);
    Chat.log(`Container Title: ${title}`);

    // Check various container types
    if (inventory.isContainer()) {
        Chat.log("This is a generic container");

        // Specific container checks
        if (type.includes("Chest")) {
            const rows = parseInt(type.match(/\d+/)?.[0] || "1");
            Chat.log(`Chest with ${rows} rows (${rows * 9} slots)`);
        } else if (type.includes("Shulker")) {
            Chat.log("Shulker Box (27 slots)");
        } else if (type.includes("Hopper")) {
            Chat.log("Hopper (5 slots)");
        } else if (type.includes("3x3")) {
            Chat.log("3x3 Container (9 slots)");
        }
    }
}

// Run when screen opens
JsMacros.on("ScreenOpen", JavaWrapper.methodToJavaAsync(() => {
    JsMacros.waitForEvent("Tick"); // Wait for screen to load
    detectContainerType();
}));
```

---

## Version Information

- Available since JSMacros 1.8.4
- Inherits all functionality from the base `Inventory` class
- Supports all generic container types introduced in various Minecraft versions

## Related Classes

- `Inventory<T>` - Base class providing core inventory functionality
- `PlayerInventory` - Specialized class for player inventory management
- `CreativeInventory` - Creative mode inventory management
- `ItemStackHelper` - Item stack operations and information
- `Pos2D` - Screen position utilities

## Notes and Limitations

- ContainerInventory instances are only valid while the container screen is open
- Some operations may not work on all server types due to anti-cheat plugins
- Slot numbering depends on the specific container type and may vary
- Container detection is based on screen handler types and may not work for modded containers
- Always check if `inventory` and `inventory.isContainer()` return valid values before operations
- Container mappings ("container" section) vary by container type (chests, hoppers, shulker boxes, etc.)