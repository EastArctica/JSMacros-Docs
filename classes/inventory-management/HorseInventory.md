# HorseInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.HorseInventory`

**Extends:** `Inventory<HorseScreen>`

**Since:** `1.8.4`

The `HorseInventory` class provides functionality for interacting with horse inventory screens in Minecraft. This includes managing saddles, armor, and chest inventories for horses, donkeys, mules, and similar equine mobs. It extends the base `Inventory` class and adds horse-specific functionality while inheriting all standard inventory operations.

This class is automatically created when you open a horse inventory screen and can be accessed through `Player.getInventory()` or `Inventory.create()` when a horse inventory is open.

## Supported Horse Types

The `HorseInventory` class handles various horse and donkey-type entities, including:
- **Horses** - Can wear saddles and horse armor
- **Donkeys** - Can wear saddles and have chest inventory
- **Mules** - Can wear saddles and have chest inventory
- **Llamas** - Can have chest inventory (special carpet decoration)
- **Other AbstractHorseEntity subclasses**

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)

---

## Constructors

- [HorseInventory()](#horseinventory)

---

## Methods

### Horse Equipment Management
- [instance.canBeSaddled()](#instancecanbesaddled)
- [instance.isSaddled()](#instanceissaddled)
- [instance.getSaddle()](#instancegetsaddle)
- [instance.hasArmorSlot()](#instancehasarmorslot)
- [instance.getArmor()](#instancegetarmor)

### Chest Inventory Management
- [instance.hasChest()](#instancehaschest)
- [instance.getInventorySize()](#instancegetinventorysize)
- [instance.getHorseInventory()](#instancegethorseinventory)

### Horse Information
- [instance.getHorse()](#instancegethorse)

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

### HorseInventory()
```js
// HorseInventory instances are typically created automatically by JSMacros
const inventory = Player.getInventory(); // Returns HorseInventory when a horse inventory is open
const inventory = Inventory.create();    // Returns appropriate type for current screen
```

Creates a new `HorseInventory` instance for the specified horse inventory screen.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| inventory | `HorseScreen` | The horse inventory screen handler |

**Notes:**
- This constructor is primarily used internally by JSMacros
- Scripts typically obtain instances through `Player.getInventory()` or `Inventory.create()`
- The instance is only valid while the horse inventory screen is open

---

## Horse Equipment Management

## Chest Inventory Management

## Horse Information

## Core Operations (Inherited)

### Horse Inventory Detection
```js
// Check if current inventory is a horse inventory
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Horse") {
    Chat.log("Currently viewing a horse inventory");
    Chat.log(`Horse type: ${inventory.getHorse().getType()}`);

    if (inventory.hasChest()) {
        Chat.log("Horse has chest inventory");
    }
    if (inventory.hasArmorSlot()) {
        Chat.log("Horse can wear armor");
    }
}
```

### Horse Slot Access
```js
// Get horse-specific slots
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Horse") {
    const slotMap = inventory.getMap();

    // Check what slots are available
    if (slotMap.saddle) {
        Chat.log(`Saddle slot: ${slotMap.saddle[0]}`);
        const saddle = inventory.getSlot(slotMap.saddle[0]);
        Chat.log(`Saddle item: ${saddle.getItemId()}`);
    }

    if (slotMap.armor) {
        Chat.log(`Armor slot: ${slotMap.armor[0]}`);
        const armor = inventory.getSlot(slotMap.armor[0]);
        Chat.log(`Armor item: ${armor.getItemId()}`);
    }

    if (slotMap.container) {
        Chat.log(`Chest slots: ${slotMap.container.join(", ")}`);
        const chestItems = inventory.getItems("container");
        Chat.log(`Chest contains ${chestItems.length} item types`);
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

if (inventory && inventory.getType() === "Horse") {
    // Find free slots in different sections
    const chestFree = inventory.findFreeSlot("container");
    if (chestFree !== -1) {
        Chat.log(`Free chest slot: ${chestFree}`);
    }

    const playerFree = inventory.findFreeInventorySlot();
    if (playerFree !== -1) {
        Chat.log(`Free player inventory slot: ${playerFree}`);
    }
}
```

---

## Item Search and Filtering (Inherited)

### Searching Horse Inventory
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Horse") {
    // Check if horse chest contains specific items
    const hasDiamonds = inventory.contains("minecraft:diamond");
    Chat.log(`Horse chest contains diamonds: ${hasDiamonds}`);

    // Find all saddle slots (should only be one)
    const saddleSlots = inventory.findItem("minecraft:saddle");
    if (saddleSlots.length > 0) {
        Chat.log(`Saddle found in slot: ${saddleSlots[0]}`);
    }

    // Get item counts from horse chest
    if (inventory.hasChest()) {
        const chestItems = inventory.getItems("container");
        const itemCounts = {};

        for (const item of chestItems) {
            const itemId = item.getItemId();
            itemCounts[itemId] = (itemCounts[itemId] || 0) + item.getCount();
        }

        Chat.log("Horse chest contents:");
        for (const [itemId, count] of Object.entries(itemCounts)) {
            Chat.log(`- ${itemId}: ${count}`);
        }
    }
}
```

---

## Click Actions (Inherited)

### Horse Equipment Management
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Horse") {
    // Equip saddle
    const playerItem = Player.getPlayer().getMainHand();
    if (playerItem.getItemId() === "minecraft:saddle" && inventory.canBeSaddled()) {
        inventory.click(0); // Click saddle slot
        Chat.log("Saddle equipped!");
    }

    // Equip armor (for horses)
    if (inventory.hasArmorSlot() && playerItem.getItemId().includes("horse_armor")) {
        inventory.click(1); // Click armor slot
        Chat.log("Armor equipped!");
    }

    // Quick move items to horse chest
    if (inventory.hasChest()) {
        const chestSlots = inventory.getSlots("container");
        if (chestSlots.length > 0) {
            // Quick move from player inventory to first chest slot
            inventory.quick(36); // Assuming slot 36 is in player inventory
            Chat.log("Item moved to horse chest");
        }
    }
}
```

### Managing Horse Chest
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Horse" && inventory.hasChest()) {
    // Get all chest slots
    const chestSlots = inventory.getSlots("container");
    Chat.log(`Chest has ${chestSlots.length} slots`);

    // Find empty slots in chest
    const emptySlots = chestSlots.filter(slot => inventory.getSlot(slot).isEmpty());
    Chat.log(`Empty chest slots: ${emptySlots.length}`);

    // Move items from player to chest
    if (emptySlots.length > 0) {
        const playerSlots = inventory.getSlots("main", "hotbar");
        for (const slot of playerSlots) {
            const item = inventory.getSlot(slot);
            if (!item.isEmpty() && emptySlots.length > 0) {
                inventory.quick(slot); // Quick move to chest
                Chat.log(`Moved ${item.getName().getString()} to horse chest`);
                JsMacros.waitForEvent("Tick"); // Small delay
                break; // Move only one item for example
            }
        }
    }
}
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

### Horse Inventory Type and Mapping
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType() === "Horse") {
    // Get inventory type
    const inventoryType = inventory.getType();
    Chat.log(`Inventory type: ${inventoryType}`);

    // Get slot mappings
    const slotMap = inventory.getMap();
    Chat.log("Available slot sections:");

    for (const [section, slots] of Object.entries(slotMap)) {
        Chat.log(`${section}: ${slots.length} slots (${slots.join(", ")})`);
    }

    // Get slot positions on screen
    if (slotMap.saddle) {
        const saddlePos = inventory.getSlotPos(slotMap.saddle[0]);
        Chat.log(`Saddle position: x=${saddlePos.x}, y=${saddlePos.y}`);
    }
}
```

---

## Mouse Interaction (Inherited)

```js
const inventory = Player.getInventory();

// Get slot under mouse cursor
const slotUnderMouse = inventory.getSlotUnderMouse();
if (slotUnderMouse >= 0) {
    const item = inventory.getSlot(slotUnderMouse);
    const location = inventory.getLocation(slotUnderMouse);

    if (!item.isEmpty()) {
        Chat.log(`Mouse over ${location}: ${item.getName().getString()} x${item.getCount()}`);
    }

    if (location === "saddle") {
        Chat.log("Mouse is over saddle slot");
    } else if (location === "armor") {
        Chat.log("Mouse is over armor slot");
    } else if (location === "container") {
        Chat.log("Mouse is over horse chest slot");
    }
}

// Get held item (on cursor)
const heldItem = inventory.getHeld();
if (!heldItem.isEmpty()) {
    Chat.log(`Holding: ${heldItem.getName().getString()} x${heldItem.getCount()}`);
}
```

---

## Usage Examples

### Complete Horse Inventory Manager
```javascript
function manageHorseInventory() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Horse") {
        Chat.log("No horse inventory open!");
        return;
    }

    const horse = inventory.getHorse();
    Chat.log("=== Horse Inventory Manager ===");
    Chat.log(`Horse Type: ${horse.getType()}`);
    Chat.log(`Is Tamed: ${horse.isTame()}`);
    Chat.log(`Is Saddled: ${inventory.isSaddled()}`);

    // Check equipment
    if (inventory.canBeSaddled()) {
        const saddle = inventory.getSaddle();
        if (!saddle.isEmpty()) {
            Chat.log(`Saddle: ${saddle.getName().getString()}`);
        } else {
            Chat.log("No saddle equipped");
        }
    }

    if (inventory.hasArmorSlot()) {
        const armor = inventory.getArmor();
        if (!armor.isEmpty()) {
            Chat.log(`Armor: ${armor.getName().getString()}`);
        } else {
            Chat.log("No armor equipped");
        }
    }

    // Check chest
    if (inventory.hasChest()) {
        const size = inventory.getInventorySize();
        Chat.log(`Chest Size: ${size} slots`);

        const chestItems = inventory.getHorseInventory();
        const totalItems = chestItems.reduce((sum, item) => sum + item.getCount(), 0);
        Chat.log(`Total items in chest: ${totalItems}`);

        if (chestItems.length > 0) {
            Chat.log("Chest contents:");
            for (const item of chestItems) {
                Chat.log(`- ${item.getItemId()} x${item.getCount()}`);
            }
        }
    }

    // Horse stats
    Chat.log(`Jump Strength: ${horse.getJumpStrengthStat().toFixed(3)}`);
    Chat.log(`Speed: ${horse.getHorseSpeed().toFixed(2)} blocks/sec`);
    Chat.log(`Max Health: ${horse.getMaxHealth()}`);
}

// Run when horse inventory opens
JsMacros.on("ScreenOpen", JavaWrapper.methodToJavaAsync((event) => {
    if (event.screenName === "Horse") {
        JsMacros.waitForEvent("Tick"); // Wait for screen to load
        manageHorseInventory();
    }
}));
```

### Horse Equipment Auto-Equipper
```javascript
function equipHorse() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Horse") {
        Chat.log("No horse inventory open!");
        return;
    }

    const horse = inventory.getHorse();

    // Check if horse is tamed
    if (!horse.isTame()) {
        Chat.log("Horse must be tamed first!");
        return;
    }

    // Auto-equip saddle if available
    if (!inventory.isSaddled() && inventory.canBeSaddled()) {
        // Look for saddle in player inventory
        const saddleSlots = inventory.findItem("minecraft:saddle");
        const playerSaddleSlots = saddleSlots.filter(slot => {
            const location = inventory.getLocation(slot);
            return location === "main" || location === "hotbar";
        });

        if (playerSaddleSlots.length > 0) {
            const saddleSlot = playerSaddleSlots[0];
            Chat.log("Equipping saddle...");
            inventory.click(saddleSlot); // Pick up saddle
            inventory.click(0); // Place in saddle slot
            Chat.log("Saddle equipped!");
        } else {
            Chat.log("No saddle found in inventory");
        }
    }

    // Auto-equip best armor for horses
    if (inventory.hasArmorSlot()) {
        const currentArmor = inventory.getArmor();
        const armorPriority = {
            "minecraft:diamond_horse_armor": 4,
            "minecraft:golden_horse_armor": 3,
            "minecraft:iron_horse_armor": 2,
            "minecraft:leather_horse_armor": 1
        };

        let bestArmorSlot = -1;
        let bestPriority = currentArmor.isEmpty() ? 0 :
            (armorPriority[currentArmor.getItemId()] || 0);

        // Find best armor in player inventory
        for (const [armorType, priority] of Object.entries(armorPriority)) {
            if (priority > bestPriority) {
                const armorSlots = inventory.findItem(armorType);
                const playerArmorSlots = armorSlots.filter(slot => {
                    const location = inventory.getLocation(slot);
                    return location === "main" || location === "hotbar";
                });

                if (playerArmorSlots.length > 0) {
                    bestArmorSlot = playerArmorSlots[0];
                    bestPriority = priority;
                }
            }
        }

        if (bestArmorSlot !== -1) {
            const newArmor = inventory.getSlot(bestArmorSlot);
            Chat.log(`Equipping ${newArmor.getName().getString()}...`);
            inventory.click(bestArmorSlot); // Pick up armor
            inventory.click(1); // Place in armor slot
            Chat.log("Armor equipped!");
        } else if (!currentArmor.isEmpty()) {
            Chat.log(`Already has best armor: ${currentArmor.getName().getString()}`);
        } else {
            Chat.log("No horse armor found in inventory");
        }
    }

    Chat.log("Horse equipment check complete!");
}

// Usage: Call this function when needed
// equipHorse();
```

### Horse Chest Organizer
```javascript
function organizeHorseChest() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Horse") {
        Chat.log("No horse inventory open!");
        return;
    }

    if (!inventory.hasChest()) {
        Chat.log("Horse doesn't have a chest!");
        return;
    }

    Chat.log("Organizing horse chest...");

    // Get all chest items
    const chestItems = inventory.getHorseInventory();
    const itemGroups = {};

    // Group items by type
    for (const item of chestItems) {
        const itemId = item.getItemId();
        if (!itemGroups[itemId]) {
            itemGroups[itemId] = [];
        }

        const slots = inventory.findItem(itemId);
        for (const slot of slots) {
            const location = inventory.getLocation(slot);
            if (location === "container") {
                const slotItem = inventory.getSlot(slot);
                if (slotItem.getItemId() === itemId) {
                    itemGroups[itemId].push({slot, item: slotItem});
                }
            }
        }
    }

    Chat.log(`Found ${Object.keys(itemGroups).length} different item types`);

    // Report organization
    for (const [itemId, stacks] of Object.entries(itemGroups)) {
        const total = stacks.reduce((sum, stack) => sum + stack.item.getCount(), 0);
        Chat.log(`${itemId}: ${total} items in ${stacks.length} stacks`);
    }

    // Calculate chest utilization
    const chestSlots = inventory.getSlots("container");
    const usedSlots = chestSlots.filter(slot => !inventory.getSlot(slot).isEmpty()).length;
    const utilization = (usedSlots / chestSlots.length * 100).toFixed(1);

    Chat.log(`Chest utilization: ${usedSlots}/${chestSlots.length} slots (${utilization}%)`);

    // Suggest improvements
    if (Object.keys(itemGroups).length > chestSlots.length / 2) {
        Chat.log("Consider consolidating similar items to free up space");
    }

    if (usedSlots === chestSlots.length) {
        Chat.log("Chest is full! Consider removing some items.");
    }
}

// Usage example: Run when horse chest opens
JsMacros.on("ScreenOpen", JavaWrapper.methodToJavaAsync((event) => {
    if (event.screenName === "Horse") {
        JsMacros.waitForEvent("Tick");
        setTimeout(organizeHorseChest, 500); // Small delay for UI to settle
    }
}));
```

### Horse Transport Calculator
```javascript
function calculateHorseCapacity() {
    const inventory = Player.getInventory();
    if (!inventory || inventory.getType() !== "Horse") {
        Chat.log("No horse inventory open!");
        return;
    }

    const horse = inventory.getHorse();
    Chat.log("=== Horse Transport Analysis ===");

    let totalCapacity = 0;
    let usedCapacity = 0;

    // Player inventory capacity (36 slots)
    const playerSlots = inventory.getSlots("main", "hotbar");
    totalCapacity += playerSlots.length;

    // Count player items
    for (const slot of playerSlots) {
        const item = inventory.getSlot(slot);
        if (!item.isEmpty()) {
            usedCapacity++;
        }
    }

    Chat.log(`Player inventory: ${usedCapacity}/${playerSlots.length} slots`);

    // Horse chest capacity
    if (inventory.hasChest()) {
        const chestSlots = inventory.getSlots("container");
        totalCapacity += chestSlots.length;

        let chestUsed = 0;
        for (const slot of chestSlots) {
            const item = inventory.getSlot(slot);
            if (!item.isEmpty()) {
                chestUsed++;
                usedCapacity++;
            }
        }

        Chat.log(`Horse chest: ${chestUsed}/${chestSlots.length} slots`);
    }

    // Equipment slots
    const equipmentSlots = [];
    if (inventory.canBeSaddled()) equipmentSlots.push("saddle");
    if (inventory.hasArmorSlot()) equipmentSlots.push("armor");

    Chat.log(`Equipment slots: ${equipmentSlots.length} (${equipmentSlots.join(", ")})`);

    // Calculate transport efficiency
    const efficiency = (usedCapacity / totalCapacity * 100).toFixed(1);
    const freeSlots = totalCapacity - usedCapacity;

    Chat.log(`\nTotal Transport Capacity:`);
    Chat.log(`- Used: ${usedCapacity}/${totalCapacity} slots (${efficiency}%)`);
    Chat.log(`- Free: ${freeSlots} slots available`);

    // Horse speed bonus
    const speed = horse.getHorseSpeed();
    const walkSpeed = 4.317; // Player walking speed in blocks/sec
    const speedBonus = (speed / walkSpeed).toFixed(1);

    Chat.log(`\nSpeed Analysis:`);
    Chat.log(`- Horse speed: ${speed.toFixed(2)} blocks/sec`);
    Chat.log(`- Speed bonus: ${speedBonus}x walking speed`);

    // Calculate effective transport rate
    const effectiveRate = (usedCapacity * speed).toFixed(0);
    Chat.log(`- Effective transport: ~${effectiveRate} item-blocks/second`);

    return {
        totalSlots: totalCapacity,
        usedSlots: usedCapacity,
        freeSlots: freeSlots,
        efficiency: parseFloat(efficiency),
        speed: speed,
        speedBonus: parseFloat(speedBonus),
        effectiveRate: parseFloat(effectiveRate)
    };
}

// Usage example
const analysis = calculateHorseCapacity();
Chat.log(`Horse is ${analysis.efficiency}% loaded with ${analysis.speedBonus}x speed bonus`);
```

---

## Version Information

- Available since JSMacros 1.8.4
- Inherits all functionality from the base `Inventory` class
- Supports all horse and donkey-type entities in Minecraft

## Related Classes

- `Inventory<HorseScreen>` - Base class providing core inventory functionality
- `AbstractHorseEntityHelper<T>` - Horse entity information and statistics
- `ItemStackHelper` - Item stack operations and information
- `HandledScreen<T>` - Base screen handler functionality

## Notes and Limitations

- HorseInventory instances are only valid while the horse inventory screen is open
- Some operations may not work on all server types due to anti-cheat plugins
- Slot numbering follows a specific pattern:
  - Slot 0: Saddle (if applicable)
  - Slot 1: Armor (if applicable)
  - Slots 2+: Horse chest inventory (if chest equipped)
  - Player inventory slots follow standard inventory patterns
- Horse capabilities vary by type (horses can wear armor, donkeys can have chests, etc.)
- Always check if the horse has specific slots (saddle, armor, chest) before accessing them
- The chest inventory size varies by horse type and strength
- Horse stats (speed, jump strength) are available through the `getHorse()` method