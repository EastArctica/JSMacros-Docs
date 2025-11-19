# Inventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.Inventory<T extends HandledScreen<?>>`

**Since:** JsMacros 1.0.8

The `Inventory` class is a fundamental component in JSMacros that provides comprehensive interaction with Minecraft inventory systems. It represents any open inventory interface, including player inventory, containers, crafting stations, and special GUIs. The Inventory class enables automated item management, slot manipulation, and inventory operations through a unified API.

## Overview

The `Inventory` class serves as the base class for all inventory interactions in JSMacros and provides:

- Universal inventory slot access and manipulation
- Item searching and filtering capabilities
- Automated clicking, dragging, and moving operations
- Support for all vanilla Minecraft inventory types
- Chain-able methods for complex inventory operations
- Integration with Minecraft's native inventory handling

## Creating Inventory Instances

### Static Factory Methods

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inventory Type Mapping](#inventory-type-mapping)
- [Important Notes](#important-notes)

## Constructors

### `new Inventory(inventory)`
Creates a new Inventory instance from a HandledScreen.

**Parameters:**
| Parameter   | Type              | Description                                    |
| ----------- | ----------------- | ---------------------------------------------- |
| inventory   | HandledScreen<T> | The screen handler to create inventory from     |

**Note:** This constructor is primarily used internally by the factory methods.

## Methods

### Inventory Operations

### Item Information and Searching

### Slot Management

### Hotbar Management

### Inventory Information

### UI Control

## Usage Examples

### Basic Item Management
```javascript
const inventory = Inventory.create();

// Check inventory contents
const allItems = inventory.getItems();
Chat.log(`Inventory contains ${allItems.size()} different items`);

// Find specific items
const woodSlots = inventory.findItem("minecraft:oak_planks");
if (woodSlots.length > 0) {
    Chat.log(`Found wood in ${woodSlots.length} slots`);

    // Move first wood stack to hotbar
    inventory.swapHotbar(woodSlots[0], 0);
}

// Find empty slot for organization
const freeSlot = inventory.findFreeSlot("main");
if (freeSlot !== -1) {
    Chat.log(`Empty slot available at: ${freeSlot}`);
}
```

### Automated Sorting
```javascript
function sortInventory() {
    const inventory = Inventory.create();
    const itemCounts = inventory.getItemCount();

    // Move items to optimal locations
    for (const [itemId, count] of Object.entries(itemCounts)) {
        const slots = inventory.findItem(itemId);

        // Consolidate stacks
        for (let i = 1; i < slots.length; i++) {
            // Try to quick-move to consolidate
            inventory.quick(slots[i]);
            Time.sleep(50); // Small delay for server sync
        }
    }

    Chat.log("Inventory sorting completed");
}

sortInventory();
```

### Container Management
```javascript
function manageChest() {
    const inventory = Inventory.create();

    if (!inventory.is("1 Row Chest", "2 Row Chest", "3 Row Chest",
                     "4 Row Chest", "5 Row Chest", "6 Row Chest",
                     "7 Row Chest", "8 Row Chest", "9 Row Chest")) {
        Chat.log("Not a chest inventory");
        return;
    }

    // Get container slots
    const containerSlots = inventory.getSlots("container");
    const hotbarSlots = inventory.getSlots("hotbar");

    // Move valuable items to hotbar
    const valuableItems = ["minecraft:diamond", "minecraft:emerald", "minecraft:gold_ingot"];

    for (const slot of containerSlots) {
        const item = inventory.getSlot(slot);
        if (valuableItems.includes(item.getItemId())) {
            // Find empty hotbar slot
            const freeHotbar = inventory.findFreeSlot("hotbar");
            if (freeHotbar !== -1) {
                inventory.swapHotbar(slot, freeHotbar - 36); // Convert to hotbar index
                Time.sleep(100);
            }
        }
    }

    Chat.log("Chest organization completed");
}
```

### Furnace Operation
```javascript
function autoSmelt() {
    const inventory = Inventory.create();

    if (!inventory.is("Furnace", "Blast Furnace", "Smoker")) {
        Chat.log("Not a furnace");
        return;
    }

    // Get furnace slots
    const inputSlots = inventory.getSlots("input");
    const fuelSlots = inventory.getSlots("fuel");
    const outputSlots = inventory.getSlots("output");

    // Check if fuel is needed
    const fuelSlot = fuelSlots[0];
    const fuel = inventory.getSlot(fuelSlot);

    if (fuel.isEmpty()) {
        // Add fuel from inventory
        const coalSlots = inventory.findItem("minecraft:coal");
        if (coalSlots.length > 0) {
            inventory.swapHotbar(coalSlots[0], fuelSlot);
            Chat.log("Added fuel to furnace");
        }
    }

    // Check if input is empty
    const inputSlot = inputSlots[0];
    const input = inventory.getSlot(inputSlot);

    if (input.isEmpty()) {
        // Add smeltable items
        const oreSlots = inventory.findItem("minecraft:iron_ore");
        if (oreSlots.length > 0) {
            inventory.swapHotbar(oreSlots[0], inputSlot);
            Chat.log("Added ore to furnace");
        }
    }

    // Collect smelted items
    const outputSlot = outputSlots[0];
    const output = inventory.getSlot(outputSlot);

    if (!output.isEmpty()) {
        inventory.quick(outputSlot);
        Chat.log(`Collected ${output.getCount()} smelted items`);
    }
}

// Run furnace management periodically
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Math.random() < 0.1) { // 10% chance per tick
        autoSmelt();
    }
}));
```

### Crafting Management
```javascript
function manageCrafting() {
    const inventory = Inventory.create();

    if (!inventory.is("Crafting Table")) {
        Chat.log("Not a crafting table");
        return;
    }

    // Get crafting slots
    const inputSlots = inventory.getSlots("input");
    const outputSlot = inventory.getSlots("output")[0];

    // Check if there's a result available
    const result = inventory.getSlot(outputSlot);
    if (!result.isEmpty()) {
        // Collect the crafted item
        inventory.quick(outputSlot);
        Chat.log(`Crafted ${result.getCount()} ${result.getItemId()}`);
    }

    // Add materials for a simple recipe (e.g., sticks)
    const plankSlots = inventory.findItem("minecraft:oak_planks");
    if (plankSlots.length >= 2) {
        // Place planks in 2x2 pattern for sticks
        inventory.swapHotbar(plankSlots[0], inputSlots[0]);
        Time.sleep(50);
        inventory.swapHotbar(plankSlots[1], inputSlots[1]);
        Chat.log("Set up stick crafting recipe");
    }
}
```

### Inventory Backup and Restoration
```javascript
function backupInventory() {
    const inventory = Inventory.create();
    const itemCounts = inventory.getItemCount();
    const hotbarSlot = inventory.getSelectedHotbarSlotIndex();

    // Save inventory state
    const backup = {
        items: itemCounts,
        selectedSlot: hotbarSlot,
        type: inventory.getType()
    };

    // Save to file (simplified example)
    const file = File.open("inventory_backup.json", "w");
    file.write(JSON.stringify(backup, null, 2));
    file.close();

    Chat.log("Inventory backed up successfully");
}

function restoreInventory() {
    // Load backup
    const file = File.open("inventory_backup.json", "r");
    const backup = JSON.parse(file.read());
    file.close();

    Chat.log(`Restoring inventory from ${backup.type} backup`);

    // Implementation would depend on specific requirements
    // This is a conceptual example
    Chat.log("Inventory restoration logic would go here");
}
```

## Inventory Type Mapping

The Inventory class automatically maps to specific subclasses based on the screen type:

### Container Types
- **1 Row Chest** - `ContainerInventory`
- **2 Row Chest** - `ContainerInventory`
- **3 Row Chest** - `ContainerInventory`
- **4 Row Chest** - `ContainerInventory`
- **5 Row Chest** - `ContainerInventory`
- **6 Row Chest** - `ContainerInventory`
- **7 Row Chest** - `ContainerInventory`
- **8 Row Chest** - `ContainerInventory`
- **9 Row Chest** - `ContainerInventory`
- **3x3 Container** - `ContainerInventory`
- **Hopper** - `ContainerInventory`
- **Shulker Box** - `ContainerInventory`

### Special Blocks
- **Furnace** - `FurnaceInventory`
- **Blast Furnace** - `FurnaceInventory`
- **Smoker** - `FurnaceInventory`
- **Brewing Stand** - `BrewingStandInventory`
- **Enchanting Table** - `EnchantInventory`
- **Anvil** - `AnvilInventory`
- **Crafting Table** - `CraftingInventory`
- **Cartography Table** - `CartographyInventory`
- **Grindstone** - `GrindStoneInventory`
- **Smithing Table** - `SmithingInventory`
- **Stonecutter** - `StoneCutterInventory`
- **Loom** - `LoomInventory`
- **Beacon** - `BeaconInventory`

### Entity Inventories
- **Horse** - `HorseInventory`
- **Villager** - `VillagerInventory`

### Player Inventories
- **Survival Inventory** - `PlayerInventory`
- **Creative Inventory** - `CreativeInventory`

## Slot Location Identifiers

Different inventory types have different slot sections:

### Player Inventory Sections
- `hotbar` - Hotbar slots (0-8)
- `main` - Main inventory slots (9-35)
- `offhand` - Offhand slot
- `helmet` - Helmet slot
- `chestplate` - Chestplate slot
- `leggings` - Leggings slot
- `boots` - Boots slot
- `crafting_in` - Crafting input slots
- `craft_out` - Crafting output slot

### Container Sections
- `container` - Container storage slots
- `input` - Input slots (furnace, crafting, etc.)
- `output` - Output slots (furnace, crafting, etc.)
- `fuel` - Fuel slots (furnace, brewing stand)
- `lapis` - Lapis slot (enchanting table)
- `item` - Item slot (enchanting table)
- `pattern` - Pattern slot (loom)
- `dye` - Dye slots (loom)
- `banner` - Banner slot (loom)
- `saddle` - Saddle slot (horse)
- `armor` - Armor slot (horse)
- `slot` - Single slot (beacon)

### Creative Inventory Sections
- `creative` - Creative inventory tabs
- `delete` - Delete slot

## Important Notes

### Server Compatibility
- **Timing Issues:** Some operations may require delays between actions on servers
- **Anti-Cheat:** Be aware that rapid automated inventory actions may trigger anti-cheat systems
- **Validation:** Always check if operations succeed before proceeding with dependent actions

### Best Practices
- **Error Handling:** Always check return values and handle exceptions
- **Delays:** Use appropriate delays between operations on servers
- **Validation:** Verify slots are empty before moving items to them
- **State Checking:** Check inventory state before performing operations

### Common Pitfalls
- **Slot Indexing:** Slot indices are 0-based and vary by inventory type
- **Mouse State:** Be aware of items held by the mouse cursor
- **Inventory Changes:** Inventory contents can change due to external factors
- **Screen State:** Operations may fail if inventory screen is not open

### Performance Considerations
- **Batching:** Group related operations together
- **Caching:** Cache item lookups when possible
- **Throttling:** Avoid excessive rapid-fire operations

### Debugging Tips
- **Log Operations:** Log inventory operations for debugging
- **State Verification:** Verify inventory state before and after operations
- **Slot Mapping:** Use `getMap()` to understand slot layout
- **Error Messages:** Pay attention to error messages for debugging

## Version History

- **1.0.8:** Initial release with basic inventory operations
- **1.1.3:** Added slot mapping and location methods
- **1.2.5:** Added hotbar slot management
- **1.5.0:** Enhanced item searching and filtering
- **1.6.5:** Added hotbar swap operations
- **1.7.0:** Added quickAll method for bulk operations
- **1.8.4:** Added comprehensive item management methods
- **1.9.0:** Added type checking with generics support
- **Current:** Full feature set with comprehensive inventory management capabilities

## Related Classes

- `ItemStackHelper` - Item stack representation and operations
- `HandledScreen` - Base Minecraft screen handler
- `ScreenHandler` - Minecraft's screen handling system
- `Pos2D` - 2D position helper for slot locations
- `PlayerInventory` - Specialized player inventory class
- `ContainerInventory` - Generic container inventory class
- `CreativeInventory` - Creative mode inventory class