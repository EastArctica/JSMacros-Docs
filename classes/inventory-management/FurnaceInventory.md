# FurnaceInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.FurnaceInventory`

**Extends:** `RecipeInventory<AbstractFurnaceScreen<?>>`

**Since:** `1.8.4`

The `FurnaceInventory` class is a specialized inventory helper that provides access to Minecraft furnace screen functionality. It wraps Minecraft's furnace GUI and allows scripters to programmatically interact with smelting operations, check smelting progress, manage fuel, and preview smelting results. This class is specifically designed for managing smelting operations when a furnace interface is open.

This class provides methods for examining smelting recipes, checking valid fuels and smeltable items, monitoring smelting progress, and managing the input, fuel, and output slots of a furnace.

## Overview

The `FurnaceInventory` represents the interface to a Minecraft furnace when its GUI is open. It provides access to furnace-specific operations such as:

- Checking if items and fuels can be smelted together
- Monitoring smelting progress and fuel levels
- Accessing input slot, fuel slot, and output slot
- Validating smelting recipes and fuel items
- Getting comprehensive fuel value information

**Key Features:**
- Fuel validation and comprehensive fuel value lookup
- Smelting progress tracking with time calculations
- Individual slot access for input, fuel, and output
- Recipe validation for smeltable items
- Integration with standard inventory operations
- Support for all furnace types (regular furnace, blast furnace, smoker)

## Accessing FurnaceInventory

You typically get `FurnaceInventory` instances when a furnace screen is open:

```javascript
// Check if current screen is a furnace
const inv = Inventory.create();
if (inv && inv.getType().includes("Furnace")) {
    // This is a FurnaceInventory
    const furnaceInv = inv; // Already typed as FurnaceInventory
    Chat.log("Fuel remaining: " + furnaceInv.getRemainingFuelTime() + " ticks");
}

// Direct creation when furnace screen is known to be open
const furnaceInventory = Inventory.create(); // Returns FurnaceInventory if furnace screen is open
```

## Furnace Slot Layout

The furnace has the following slot structure:

- **Slot 0**: Input slot (top left) - items to be smelted
- **Slot 1**: Fuel slot (bottom left) - fuel items like coal, charcoal, lava buckets
- **Slot 2**: Output slot (right) - smelted items result

## Methods

### Slot Access Methods

#### `getSmeltedItem()`
**Returns:** `ItemStackHelper`

Returns the item stack in the input slot (slot 0, top left). This is where items to be smelted are placed.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const input = furnace.getSmeltedItem();

    if (!input.isEmpty()) {
        Chat.log(`Smelting: ${input.getName()} x${input.getCount()}`);

        if (furnace.isSmeltable(input)) {
            Chat.log("✓ This item can be smelted");
        } else {
            Chat.log("✗ This item cannot be smelted");
        }
    } else {
        Chat.log("No item in input slot");
    }
}
```

#### `getFuel()`
**Returns:** `ItemStackHelper`

Returns the item stack in the fuel slot (slot 1, bottom left). This is where fuel items like coal, charcoal, wood, or lava buckets are placed.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const fuel = furnace.getFuel();

    if (!fuel.isEmpty()) {
        Chat.log(`Fuel: ${fuel.getName()} x${fuel.getCount()}`);

        if (furnace.canUseAsFuel(fuel)) {
            const fuelValues = furnace.getFuelValues();
            const fuelTime = fuelValues.get(fuel.getItemId());
            Chat.log(`Burn time: ${fuelTime} ticks (${Math.round(fuelTime/20)}s)`);
        } else {
            Chat.log("✗ This item cannot be used as fuel");
        }
    } else {
        Chat.log("No fuel in furnace");
    }
}
```

#### `getInput(x, y)`
**Parameters:**
- `x` (`int`): The x position of the input (will always be 0)
- `y` (`int`): The y position of the input (will always be 0)

**Returns:** `ItemStackHelper`

Returns the item stack in the input slot at the specified position. For furnaces, this always returns the input slot regardless of the x, y parameters (which are ignored and should be 0, 0).

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const input = furnace.getInput(0, 0); // Same as getSmeltedItem()

    if (!input.isEmpty()) {
        Chat.log(`Input item: ${input.getName()}`);
    }
}
```

### Recipe and Fuel Validation

#### `canUseAsFuel(stack)`
**Parameters:**
- `stack` (`ItemStackHelper`): The item stack to check

**Returns:** `boolean`

Returns `true` if the given item can be used as fuel in a furnace, `false` otherwise.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    // Test various items for fuel capability
    const testItems = [
        furnace.getSlot(0), // Input slot
        furnace.getSlot(1), // Fuel slot
    ];

    testItems.forEach((item, index) => {
        if (!item.isEmpty()) {
            const isFuel = furnace.canUseAsFuel(item);
            const slotName = index === 0 ? "Input" : "Fuel";
            Chat.log(`${slotName} (${item.getName()}): ${isFuel ? "✓ Fuel" : "✗ Not fuel"}`);
        }
    });

    // Check items in player inventory
    const inventorySlots = furnace.getSlots("main", "hotbar");
    let foundFuels = 0;

    for (const slot of inventorySlots) {
        const item = furnace.getSlot(slot);
        if (!item.isEmpty() && furnace.canUseAsFuel(item)) {
            foundFuels++;
            Chat.log(`Found fuel: ${item.getName()} in slot ${slot}`);
        }
    }

    Chat.log(`Total fuel items in inventory: ${foundFuels}`);
}
```

#### `isSmeltable(stack)`
**Parameters:**
- `stack` (`ItemStackHelper`): The item stack to check

**Returns:** `boolean`

Returns `true` if the given item can be smelted in a furnace, `false` otherwise.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const input = furnace.getSmeltedItem();

    if (!input.isEmpty()) {
        const canSmelt = furnace.isSmeltable(input);
        Chat.log(`${input.getName()}: ${canSmelt ? "✓ Can be smelted" : "✗ Cannot be smelted"}`);

        if (canSmelt) {
            // Estimate output based on common smelting recipes
            const possibleOutputs = {
                "minecraft:iron_ore": "minecraft:iron_ingot",
                "minecraft:gold_ore": "minecraft:gold_ingot",
                "minecraft:cobblestone": "minecraft:stone",
                "minecraft:log": "minecraft:charcoal",
                "minecraft:potato": "minecraft:baked_potato",
                "minecraft:beef": "minecraft:cooked_beef"
            };

            const expectedOutput = possibleOutputs[input.getItemId()];
            if (expectedOutput) {
                Chat.log(`Expected output: ${expectedOutput.replace("minecraft:", "")}`);
            }
        }
    }
}
```

#### `getFuelValues()`
**Returns:** `Map<String, Integer>`

Returns a map containing all valid fuel items and their burn times in ticks. The map keys are item IDs (like "minecraft:coal") and values are burn times in ticks.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const fuelValues = furnace.getFuelValues();

    Chat.log("=== Available Fuel Values ===");

    // Sort fuels by burn time (descending)
    const sortedFuels = Array.from(fuelValues.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20); // Show top 20 fuels

    sortedFuels.forEach(([itemId, burnTime]) => {
        const itemName = itemId.replace("minecraft:", "").replace("_", " ");
        const seconds = Math.round(burnTime / 20);
        Chat.log(`${itemName}: ${burnTime} ticks (${seconds}s)`);
    });

    // Show best fuels for long smelting sessions
    Chat.log("\n=== Best Fuels for Extended Smelting ===");
    const bestFuels = sortedFuels.filter(([_, burnTime]) => burnTime >= 8000); // 400+ seconds

    bestFuels.forEach(([itemId, burnTime]) => {
        const itemName = itemId.replace("minecraft:", "").replace("_", " ");
        const itemsPerSmelt = Math.floor(burnTime / 200); // Average smelt time is 200 ticks
        Chat.log(`${itemName}: ${itemsPerSmelt} items per fuel unit`);
    });
}
```

### Smelting Progress Monitoring

#### `getSmeltingProgress()`
**Returns:** `int`

Returns the current smelting progress in ticks. If this equals `getTotalSmeltingTime()`, the item is finished smelting. Returns 0 if no smelting is in progress.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const progress = furnace.getSmeltingProgress();
    const totalTime = furnace.getTotalSmeltingTime();

    if (progress > 0 && totalTime > 0) {
        const progressPercent = Math.round((progress / totalTime) * 100);
        Chat.log(`Smelting progress: ${progressPercent}%`);
        Chat.log(`Progress: ${progress}/${totalTime} ticks`);

        // Create progress bar
        const barLength = 20;
        const filled = Math.round((progressPercent / 100) * barLength);
        const bar = "█".repeat(filled) + "░".repeat(barLength - filled);
        Chat.log(`[${bar}]`);
    } else {
        Chat.log("No smelting in progress");
    }
}
```

#### `getTotalSmeltingTime()`
**Returns:** `int`

Returns the total smelting time required for the current input item in ticks. Standard furnace smelting takes 200 ticks (10 seconds), but blast furnaces and smokers may be faster.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const totalTime = furnace.getTotalSmeltingTime();
    const progress = furnace.getSmeltingProgress();

    Chat.log(`Total smelting time: ${totalTime} ticks (${Math.round(totalTime/20)} seconds)`);

    // Determine furnace type based on smelting time
    let furnaceType = "Regular Furnace";
    if (totalTime === 100) {
        furnaceType = "Blast Furnace or Smoker";
    } else if (totalTime === 50) {
        furnaceType = "Enhanced (modded)";
    }

    Chat.log(`Furnace type: ${furnaceType}`);

    if (progress > 0) {
        const remaining = totalTime - progress;
        Chat.log(`Time remaining: ${Math.round(remaining/20)} seconds`);
    }
}
```

#### `getRemainingSmeltingTime()`
**Returns:** `int`

Returns the remaining time until the current smelting operation completes, in ticks. If no smelting is in progress, returns the full smelting time.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const remaining = furnace.getRemainingSmeltingTime();
    const totalTime = furnace.getTotalSmeltingTime();

    if (remaining < totalTime) { // Smelting is in progress
        const seconds = Math.round(remaining / 20);
        Chat.log(`Time remaining: ${seconds} seconds`);

        // Calculate completion time
        const now = new Date();
        const completion = new Date(now.getTime() + remaining * 50); // 1 tick = 50ms
        Chat.log(`Smelting completes at: ${completion.toLocaleTimeString()}`);

        // Show countdown for critical items
        const input = furnace.getSmeltedItem();
        if (!input.isEmpty()) {
            Chat.log(`Almost done: ${input.getName()}`);
        }
    } else {
        Chat.log("No active smelting process");
    }
}
```

#### `getRemainingFuelTime()`
**Returns:** `int`

Returns the remaining burn time for the current fuel item in ticks. Returns 0 when no fuel is remaining.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const fuelTime = furnace.getRemainingFuelTime();
    const totalFuelTime = furnace.getTotalFuelTime();

    Chat.log(`Fuel remaining: ${fuelTime} ticks`);

    if (totalFuelTime > 0) {
        const fuelPercent = Math.round((fuelTime / totalFuelTime) * 100);
        Chat.log(`Fuel: ${fuelPercent}%`);

        // Create fuel progress bar
        const barLength = 20;
        const filled = Math.round((fuelPercent / 100) * barLength);
        const bar = "🔥".repeat(filled) + "░".repeat(barLength - filled);
        Chat.log(`[${bar}]`);

        // Estimate remaining smelts
        const smeltTime = furnace.getTotalSmeltingTime();
        if (smeltTime > 0) {
            const remainingSmelts = Math.floor(fuelTime / smeltTime);
            Chat.log(`Can smelt ~${remainingSmelts} more items with current fuel`);
        }
    } else {
        Chat.log("No fuel remaining");

        // Check for more fuel in inventory
        const fuelSlots = furnace.getSlots("main", "hotbar").filter(slot => {
            const item = furnace.getSlot(slot);
            return !item.isEmpty() && furnace.canUseAsFuel(item);
        });

        if (fuelSlots.length > 0) {
            Chat.log(`Found ${fuelSlots.length} potential fuel items in inventory`);
        } else {
            Chat.log("⚠ No fuel available in inventory!");
        }
    }
}
```

#### `getTotalFuelTime()`
**Returns:** `int`

Returns the total burn time of the current fuel item in ticks. This represents how long the current fuel item can burn when first placed in the furnace.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const totalFuelTime = furnace.getTotalFuelTime();
    const currentFuel = furnace.getFuel();

    if (!currentFuel.isEmpty()) {
        Chat.log(`Fuel item: ${currentFuel.getName()}`);
        Chat.log(`Total burn time: ${totalFuelTime} ticks (${Math.round(totalFuelTime/20)} seconds)`);

        // Compare with known fuel values
        const fuelValues = furnace.getFuelValues();
        const expectedTime = fuelValues.get(currentFuel.getItemId());

        if (expectedTime) {
            const efficiency = Math.round((totalFuelTime / expectedTime) * 100);
            Chat.log(`Fuel efficiency: ${efficiency}%`);
        }
    } else {
        Chat.log("No fuel in furnace");
    }
}
```

#### `isBurning()`
**Returns:** `boolean`

Returns `true` if the furnace is currently burning (has fuel and is actively smelting), `false` otherwise.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const isBurning = furnace.isBurning();
    const hasFuel = furnace.getRemainingFuelTime() > 0;
    const hasInput = !furnace.getSmeltedItem().isEmpty();
    const progress = furnace.getSmeltingProgress();

    Chat.log(`Furnace status: ${isBurning ? "🔥 Burning" : "❌ Not burning"}`);
    Chat.log(`Has fuel: ${hasFuel ? "✓" : "✗"}`);
    Chat.log(`Has input: ${hasInput ? "✓" : "✗"}`);
    Chat.log(`Smelting progress: ${progress > 0 ? "✓ In progress" : "✗ Idle"}`);

    // Diagnose why not burning
    if (!isBurning) {
        Chat.log("\nDiagnosis:");
        if (!hasFuel) {
            Chat.log("  • No fuel available");
        }
        if (!hasInput) {
            Chat.log("  • No input to smelt");
        }
        if (hasFuel && hasInput && progress === 0) {
            Chat.log("  • Input item cannot be smelted");
        }
    }
}
```

## Inherited Methods from RecipeInventory

Since `FurnaceInventory` extends `RecipeInventory`, it inherits recipe-related methods:

#### `getOutput()`
**Returns:** `ItemStackHelper`

Returns the item stack in the output slot (slot 2, right side). This contains the smelted items.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    const output = furnace.getOutput();

    if (!output.isEmpty()) {
        Chat.log(`Output: ${output.getName()} x${output.getCount()}`);

        // Check if output is ready to collect
        const progress = furnace.getSmeltingProgress();
        const totalTime = furnace.getTotalSmeltingTime();

        if (progress >= totalTime) {
            Chat.log("✅ Smelting complete! Ready to collect.");
        } else {
            const remaining = totalTime - progress;
            Chat.log(`⏳ Still smelting... ${Math.round(remaining/20)}s remaining`);
        }
    } else {
        Chat.log("No items in output slot");
    }
}
```

#### `getCraftableRecipes()`
**Returns:** `List<RecipeHelper>`

Returns a list of recipes that can be crafted with the current input. For furnaces, this will show smelting recipes for the current input item.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    try {
        const recipes = furnace.getCraftableRecipes();

        if (recipes && recipes.length > 0) {
            Chat.log(`Found ${recipes.length} available smelting recipes:`);

            recipes.forEach((recipe, index) => {
                Chat.log(`${index + 1}. ${recipe.toString()}`);
            });
        } else {
            const input = furnace.getSmeltedItem();
            if (!input.isEmpty()) {
                Chat.log(`No smelting recipes available for: ${input.getName()}`);
            } else {
                Chat.log("No input item to check recipes for");
            }
        }
    } catch (e) {
        Chat.log("Error getting recipes: " + e.message);
    }
}
```

#### `getRecipes(craftable)`
**Parameters:**
- `craftable` (`boolean`): Whether to only return craftable recipes

**Returns:** `List<RecipeHelper>`

Returns a list of recipes available in this furnace. When `craftable` is true, only returns recipes that can be made with current inputs.

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    try {
        // Get all possible recipes
        const allRecipes = furnace.getRecipes(false);
        Chat.log(`Total furnace recipes available: ${allRecipes ? allRecipes.length : 0}`);

        // Get only craftable recipes
        const craftableRecipes = furnace.getRecipes(true);
        Chat.log(`Currently craftable: ${craftableRecipes ? craftableRecipes.length : 0}`);

        if (craftableRecipes && craftableRecipes.length > 0) {
            Chat.log("\nCraftable recipes:");
            craftableRecipes.forEach(recipe => {
                Chat.log(`  ${recipe.toString()}`);
            });
        }
    } catch (e) {
        Chat.log("Error fetching recipes: " + e.message);
    }
}
```

## Inherited Methods from Inventory

Since `FurnaceInventory` extends `Inventory`, it inherits all standard inventory operations:

### Slot Access and Manipulation
- `getSlot(slot)` - Get item in specific slot
- `getTotalSlots()` - Get total number of slots
- `click(slot)` - Click a slot
- `quick(slot)` - Shift-click a slot
- `dropSlot(slot)` - Drop items from slot
- `getHeld()` - Get item held by mouse

### Inventory Mapping
- `getMap()` - Get slot mapping for furnace inventory
- `getSlots(...identifiers)` - Get slots in specific sections
- `getLocation(slot)` - Get section name for a slot

**Furnace Inventory Mapping:**
- `"hotbar"` - Player hotbar slots (9 slots)
- `"main"` - Player main inventory (27 slots)
- `"slots"` - Furnace specific slots (3 slots: input, fuel, output)
- `"input"` - Input slot (slot 0)
- `"fuel"` - Fuel slot (slot 1)
- `"output"` - Output slot (slot 2)

### Utility Methods
- `getType()` - Returns furnace type ("Furnace", "Blast Furnace", "Smoker")
- `close()` - Close the furnace interface
- `getContainerTitle()` - Get furnace title
- `contains(item)` - Check if inventory contains specific item

```javascript
const furnace = Inventory.create();
if (furnace && furnace.getType().includes("Furnace")) {
    // Get the furnace inventory mapping
    const slotMap = furnace.getMap();
    Chat.log("Available sections: " + Object.keys(slotMap).join(", "));

    // Access furnace specific slots
    const furnaceSlots = furnace.getSlots("slots");
    Chat.log(`Furnace slots: ${furnaceSlots.join(", ")}`);

    // Access individual slot types
    const inputSlots = furnace.getSlots("input");
    const fuelSlots = furnace.getSlots("fuel");
    const outputSlots = furnace.getSlots("output");

    Chat.log(`Input slot: ${inputSlots.join(", ")}`);
    Chat.log(`Fuel slot: ${fuelSlots.join(", ")}`);
    Chat.log(`Output slot: ${outputSlots.join(", ")}`);

    // Check for coal in inventory for fuel
    if (furnace.contains("minecraft:coal")) {
        Chat.log("You have coal for fuel");
    }

    // Count available ores
    const ironOre = furnace.getItemCount("minecraft:iron_ore");
    const goldOre = furnace.getItemCount("minecraft:gold_ore");
    const cobblestone = furnace.getItemCount("minecraft:cobblestone");

    if (ironOre > 0) Chat.log(`Iron ore: ${ironOre}`);
    if (goldOre > 0) Chat.log(`Gold ore: ${goldOre}`);
    if (cobblestone > 0) Chat.log(`Cobblestone: ${cobblestone}`);
}
```

## Usage Examples

### Example 1: Furnace Status Monitor

```javascript
function monitorFurnaceStatus() {
    const furnace = Inventory.create();

    if (!furnace || !furnace.getType().includes("Furnace")) {
        Chat.log("No furnace interface open");
        return;
    }

    Chat.log("=== Furnace Status Monitor ===");

    // Basic info
    const furnaceType = furnace.getType();
    Chat.log(`Furnace Type: ${furnaceType}`);

    // Fuel status
    const fuelTime = furnace.getRemainingFuelTime();
    const totalFuelTime = furnace.getTotalFuelTime();
    const fuelItem = furnace.getFuel();

    Chat.log("\n--- Fuel Status ---");
    if (!fuelItem.isEmpty()) {
        Chat.log(`Fuel Item: ${fuelItem.getName()} x${fuelItem.getCount()}`);
        if (totalFuelTime > 0) {
            const fuelPercent = Math.round((fuelTime / totalFuelTime) * 100);
            Chat.log(`Fuel Level: ${fuelPercent}% (${fuelTime}/${totalFuelTime} ticks)`);

            // Fuel bar
            const barLength = 20;
            const filled = Math.round((fuelPercent / 100) * barLength);
            const bar = "🔥".repeat(filled) + "░".repeat(barLength - filled);
            Chat.log(`[${bar}]`);

            // Estimate remaining operations
            const smeltTime = furnace.getTotalSmeltingTime();
            if (smeltTime > 0) {
                const remainingSmelts = Math.floor(fuelTime / smeltTime);
                Chat.log(`Estimated remaining smelts: ${remainingSmelts}`);
            }
        }
    } else {
        Chat.log("Fuel: Empty");
        Chat.log("⚠ Add fuel to start smelting!");
    }

    // Input status
    const inputItem = furnace.getSmeltedItem();
    Chat.log("\n--- Input Status ---");
    if (!inputItem.isEmpty()) {
        Chat.log(`Input: ${inputItem.getName()} x${inputItem.getCount()}`);

        const isSmeltable = furnace.isSmeltable(inputItem);
        Chat.log(`Can smelt: ${isSmeltable ? "✓" : "✗"}`);

        if (isSmeltable) {
            // Progress
            const progress = furnace.getSmeltingProgress();
            const totalTime = furnace.getTotalSmeltingTime();

            if (progress > 0) {
                const progressPercent = Math.round((progress / totalTime) * 100);
                const remaining = totalTime - progress;
                Chat.log(`Progress: ${progressPercent}% (${Math.round(remaining/20)}s remaining)`);

                // Progress bar
                const barLength = 20;
                const filled = Math.round((progressPercent / 100) * barLength);
                const bar = "█".repeat(filled) + "░".repeat(barLength - filled);
                Chat.log(`[${bar}]`);
            } else {
                Chat.log("Status: Waiting for fuel");
            }
        }
    } else {
        Chat.log("Input: Empty");
        Chat.log("Add items to smelt");
    }

    // Output status
    const outputItem = furnace.getOutput();
    Chat.log("\n--- Output Status ---");
    if (!outputItem.isEmpty()) {
        Chat.log(`Output: ${outputItem.getName()} x${outputItem.getCount()}`);

        const progress = furnace.getSmeltingProgress();
        const totalTime = furnace.getTotalSmeltingTime();

        if (progress >= totalTime) {
            Chat.log("✅ Ready to collect!");
        } else {
            Chat.log(`⏳ Still smelting...`);
        }
    } else {
        Chat.log("Output: Empty");
    }

    // Overall status
    const isBurning = furnace.isBurning();
    Chat.log(`\n--- Overall Status ---`);
    Chat.log(`Furnace: ${isBurning ? "🔥 Active" : "❌ Inactive"}`);

    // Resource summary
    Chat.log("\n--- Available Resources ---");

    // Check for fuel items
    const fuelTypes = ["minecraft:coal", "minecraft:charcoal", "minecraft:lava_bucket"];
    let totalFuel = 0;

    fuelTypes.forEach(fuelType => {
        const count = furnace.getItemCount(fuelType);
        if (count > 0) {
            const itemName = fuelType.replace("minecraft:", "").replace("_", " ");
            Chat.log(`${itemName}: ${count}`);
            totalFuel += count;
        }
    });

    if (totalFuel === 0) {
        Chat.log("No fuel items found");
    }

    // Check for smeltable items
    const ores = ["minecraft:iron_ore", "minecraft:gold_ore", "minecraft:copper_ore"];
    let totalOres = 0;

    ores.forEach(ore => {
        const count = furnace.getItemCount(ore);
        if (count > 0) {
            const itemName = ore.replace("minecraft:", "").replace("_", " ");
            Chat.log(`${itemName}: ${count}`);
            totalOres += count;
        }
    });

    if (totalOres === 0) {
        Chat.log("No ores found");
    }

    Chat.log("========================");
}

// Run the monitor
monitorFurnaceStatus();
```

### Example 2: Automated Furnace Management

```javascript
function autoFurnaceManager(targetItem = "minecraft:iron_ore", autoRefuel = true) {
    const furnace = Inventory.create();

    if (!furnace || !furnace.getType().includes("Furnace")) {
        Chat.log("No furnace interface open");
        return false;
    }

    Chat.log(`=== Auto Furnace Manager: ${targetItem} ===`);

    // Check furnace state
    const isBurning = furnace.isBurning();
    const inputItem = furnace.getSmeltedItem();
    const fuelItem = furnace.getFuel();
    const outputItem = furnace.getOutput();

    Chat.log(`Furnace status: ${isBurning ? "🔥 Active" : "❌ Inactive"}`);

    // Check if we need to add fuel
    if (autoRefuel && furnace.getRemainingFuelTime() === 0) {
        Chat.log("🔥 Adding fuel...");

        // Fuel priority: coal > charcoal > wood > lava bucket
        const fuelPriority = [
            "minecraft:coal",
            "minecraft:charcoal",
            "minecraft:lava_bucket",
            "minecraft:oak_planks",
            "minecraft:spruce_planks",
            "minecraft:birch_planks",
            "minecraft:jungle_planks",
            "minecraft:acacia_planks",
            "minecraft:dark_oak_planks"
        ];

        let fuelAdded = false;

        for (const fuelType of fuelPriority) {
            const fuelSlots = furnace.getSlots("main", "hotbar").filter(slot => {
                const item = furnace.getSlot(slot);
                return !item.isEmpty() && item.getItemId() === fuelType;
            });

            if (fuelSlots.length > 0) {
                const fuelSlot = fuelSlots[0];
                Chat.log(`Found ${fuelType.replace("minecraft:", "")} in slot ${fuelSlot}`);

                // Move fuel to furnace
                furnace.click(fuelSlot);
                furnace.click(1); // Click fuel slot
                furnace.click(fuelSlot);

                fuelAdded = true;
                break;
            }
        }

        if (!fuelAdded) {
            Chat.log("⚠ No fuel available in inventory!");
            return false;
        }
    }

    // Check if we need to add input items
    if (inputItem.isEmpty() || inputItem.getItemId() !== targetItem) {
        Chat.log(`📦 Adding ${targetItem} to furnace...`);

        // Find target items in inventory
        const itemSlots = furnace.getSlots("main", "hotbar").filter(slot => {
            const item = furnace.getSlot(slot);
            return !item.isEmpty() && item.getItemId() === targetItem;
        });

        if (itemSlots.length > 0) {
            const itemSlot = itemSlots[0];
            const item = furnace.getSlot(itemSlot);
            Chat.log(`Found ${item.getName()} x${item.getCount()} in slot ${itemSlot}`);

            // Move item to furnace
            furnace.click(itemSlot);
            furnace.click(0); // Click input slot
            furnace.click(itemSlot);

            Chat.log(`✓ Added ${item.getName()} to furnace`);
        } else {
            Chat.log(`⚠ No ${targetItem} found in inventory!`);
            return false;
        }
    }

    // Collect output if ready
    if (!outputItem.isEmpty()) {
        const progress = furnace.getSmeltingProgress();
        const totalTime = furnace.getTotalSmeltingTime();

        if (progress >= totalTime) {
            Chat.log(`✅ Collecting ${outputItem.getName()} x${outputItem.getCount()}`);

            // Collect output
            furnace.quick(2); // Shift-click output slot

            // Check if we can smelt more
            const newInput = furnace.getSmeltedItem();
            if (!newInput.isEmpty()) {
                Chat.log("🔄 Ready for next item");
            }
        }
    }

    // Show current status
    const newFuelTime = furnace.getRemainingFuelTime();
    const newProgress = furnace.getSmeltingProgress();
    const newTotalTime = furnace.getTotalSmeltingTime();

    if (newFuelTime > 0 && newProgress > 0) {
        const remainingFuelSecs = Math.round(newFuelTime / 20);
        const remainingSmeltSecs = Math.round((newTotalTime - newProgress) / 20);

        Chat.log(`⏱ Fuel: ${remainingFuelSecs}s | Smelting: ${remainingSmeltSecs}s remaining`);
    }

    // Check inventory for more resources
    const availableTargets = furnace.getItemCount(targetItem);
    const availableCoal = furnace.getItemCount("minecraft:coal") + furnace.getItemCount("minecraft:charcoal");

    Chat.log(`📊 Resources: ${availableTargets} ${targetItem.replace("minecraft:", "")} | ${availableCoal} fuel items`);

    return true;
}

// Usage examples:
autoFurnaceManager("minecraft:iron_ore", true);
autoFurnaceManager("minecraft:cobblestone", true);
autoFurnaceManager("minecraft:potato", true);
```

### Example 3: Furnace Efficiency Analyzer

```javascript
function analyzeFurnaceEfficiency() {
    const furnace = Inventory.create();

    if (!furnace || !furnace.getType().includes("Furnace")) {
        Chat.log("No furnace interface open");
        return;
    }

    Chat.log("=== Furnace Efficiency Analysis ===");

    // Get fuel values
    const fuelValues = furnace.getFuelValues();
    const currentFuel = furnace.getFuel();
    const inputItem = furnace.getSmeltedItem();

    // Analyze current fuel efficiency
    if (!currentFuel.isEmpty()) {
        const currentFuelTime = fuelValues.get(currentFuel.getItemId());
        const remainingTime = furnace.getRemainingFuelTime();
        const totalTime = furnace.getTotalFuelTime();

        Chat.log("\n--- Current Fuel Analysis ---");
        Chat.log(`Fuel: ${currentFuel.getName()}`);
        Chat.log(`Total burn time: ${currentFuelTime} ticks (${Math.round(currentFuelTime/20)}s)`);

        if (totalTime > 0) {
            const efficiency = Math.round((totalTime / currentFuelTime) * 100);
            Chat.log(`Current efficiency: ${efficiency}%`);
        }

        if (remainingTime > 0) {
            const usedTime = totalTime - remainingTime;
            const usedPercent = Math.round((usedTime / totalTime) * 100);
            Chat.log(`Fuel used: ${usedPercent}%`);
        }
    }

    // Analyze smelting efficiency
    if (!inputItem.isEmpty()) {
        const smeltTime = furnace.getTotalSmeltingTime();
        const progress = furnace.getSmeltingProgress();

        Chat.log("\n--- Smelting Analysis ---");
        Chat.log(`Input: ${inputItem.getName()}`);
        Chat.log(`Smelt time: ${smeltTime} ticks (${Math.round(smeltTime/20)}s)`);

        // Determine furnace type
        let furnaceType = "Regular Furnace";
        if (smeltTime === 100) {
            furnaceType = "Blast Furnace/Smoker (2x speed)";
        } else if (smeltTime === 50) {
            furnaceType = "Industrial Furnace (4x speed)";
        }
        Chat.log(`Furnace type: ${furnaceType}`);

        if (progress > 0) {
            const progressPercent = Math.round((progress / smeltTime) * 100);
            Chat.log(`Progress: ${progressPercent}%`);
        }
    }

    // Fuel efficiency comparison
    Chat.log("\n--- Fuel Efficiency Comparison ---");

    // Get common fuels and their efficiency
    const commonFuels = [
        "minecraft:coal",
        "minecraft:charcoal",
        "minecraft:coal_block",
        "minecraft:lava_bucket",
        "minecraft:oak_planks",
        "minecraft:spruce_planks",
        "minecraft:blaze_rod"
    ];

    const smeltTime = furnace.getTotalSmeltingTime() || 200; // Default to 200 if no smelting

    Chat.log(`Based on ${Math.round(smeltTime/20)}s smelt time:`);

    const fuelEfficiency = [];
    commonFuels.forEach(fuelId => {
        const burnTime = fuelValues.get(fuelId);
        if (burnTime) {
            const itemsPerFuel = Math.floor(burnTime / smeltTime);
            const fuelName = fuelId.replace("minecraft:", "").replace("_", " ");
            fuelEfficiency.push({ name: fuelName, items: itemsPerFuel, time: burnTime });
        }
    });

    // Sort by efficiency (items per fuel)
    fuelEfficiency.sort((a, b) => b.items - a.items);

    fuelEfficiency.forEach((fuel, index) => {
        const rating = index === 0 ? "⭐ BEST" : index < 3 ? "✓ Good" : "○ Average";
        Chat.log(`${rating} ${fuel.name}: ${fuel.items} items per fuel (${Math.round(fuel.time/20)}s burn)`);
    });

    // Inventory analysis
    Chat.log("\n--- Inventory Analysis ---");

    // Count all smeltable items
    const smeltableCategories = {
        "Ores": ["minecraft:iron_ore", "minecraft:gold_ore", "minecraft:copper_ore", "minecraft:ancient_debris"],
        "Food": ["minecraft:potato", "minecraft:beef", "minecraft:porkchop", "minecraft:chicken", "minecraft:mutton", "minecraft:rabbit", "minecraft:cod", "minecraft:salmon"],
        "Wood": ["minecraft:oak_log", "minecraft:spruce_log", "minecraft:birch_log", "minecraft:jungle_log", "minecraft:acacia_log", "minecraft:dark_oak_log"],
        "Other": ["minecraft:cobblestone", "minecraft:sand", "minecraft:clay_ball", "minecraft:netherrack"]
    };

    let totalSmeltable = 0;

    Object.entries(smeltableCategories).forEach(([category, items]) => {
        let categoryCount = 0;
        items.forEach(itemId => {
            categoryCount += furnace.getItemCount(itemId);
        });
        totalSmeltable += categoryCount;

        if (categoryCount > 0) {
            Chat.log(`${category}: ${categoryCount} items`);
        }
    });

    Chat.log(`Total smeltable items: ${totalSmeltable}`);

    // Calculate total fuel available
    let totalFuelTime = 0;
    Object.entries(fuelValues).forEach(([itemId, burnTime]) => {
        const count = furnace.getItemCount(itemId);
        totalFuelTime += count * burnTime;
    });

    const totalSmeltsPossible = Math.floor(totalFuelTime / smeltTime);
    Chat.log(`Potential smelts with available fuel: ${totalSmeltsPossible}`);

    // Efficiency recommendations
    Chat.log("\n--- Efficiency Recommendations ---");

    if (totalSmeltable > totalSmeltsPossible) {
        Chat.log("⚠ You have more items than fuel! Consider:");
        Chat.log("  • Mining more coal or charcoal");
        Chat.log("  • Using lava buckets for maximum efficiency");
        Chat.log("  • Making a blast furnace for ores (2x speed)");
    } else if (totalSmeltsPossible > totalSmeltable * 2) {
        Chat.log("💡 You have excess fuel! Consider:");
        Chat.log("  • Saving fuel for later");
        Chat.log("  • Smelting more items");
        Chat.log("  • Using less efficient but available fuels");
    } else {
        Chat.log("✅ Good fuel-to-item ratio!");
    }

    // Furnace type recommendations
    if (smeltTime === 200) {
        Chat.log("\n💡 Speed suggestions:");
        Chat.log("  • Use blast furnace for ores (2x speed)");
        Chat.log("  • Use smoker for food (2x speed)");
    }

    Chat.log("===============================");
}

// Run the analysis
analyzeFurnaceEfficiency();
```

### Example 4: Progress Monitor with Notifications

```javascript
function createFurnaceProgressMonitor(updateInterval = 2000) {
    const furnace = Inventory.create();

    if (!furnace || !furnace.getType().includes("Furnace")) {
        Chat.log("No furnace interface open");
        return null;
    }

    let lastProgress = 0;
    let lastFuelTime = 0;
    let itemsCompleted = 0;
    let monitoring = true;

    function updateProgress() {
        if (!monitoring) return;

        const currentFurnace = Inventory.create();
        if (!currentFurnace || !currentFurnace.getType().includes("Furnace")) {
            Chat.log("🔥 Furnace closed - monitoring stopped");
            monitoring = false;
            return;
        }

        const progress = currentFurnace.getSmeltingProgress();
        const totalTime = currentFurnace.getTotalSmeltingTime();
        const fuelTime = currentFurnace.getRemainingFuelTime();
        const inputItem = currentFurnace.getSmeltedItem();
        const outputItem = currentFurnace.getOutput();
        const isBurning = currentFurnace.isBurning();

        // Check for completed items
        if (progress > 0 && progress < lastProgress) {
            // Item completed
            itemsCompleted++;
            const itemName = inputItem ? inputItem.getName() : "Unknown";
            Chat.log(`✅ Completed smelting: ${itemName} (Total: ${itemsCompleted})`);

            // Check if output needs collecting
            if (!outputItem.isEmpty()) {
                Chat.log(`📦 Ready to collect: ${outputItem.getName()} x${outputItem.getCount()}`);
            }
        }

        // Fuel warnings
        if (fuelTime < 200 && fuelTime !== lastFuelTime && fuelTime < lastFuelTime) { // Less than 10 seconds
            Chat.log(`⚠ Low fuel warning! Only ${Math.round(fuelTime/20)}s remaining`);
        }

        // Progress updates
        if (progress > 0 && progress !== lastProgress) {
            const progressPercent = Math.round((progress / totalTime) * 100);
            const remaining = totalTime - progress;
            const remainingSecs = Math.round(remaining / 20);

            if (progressPercent % 25 === 0 || remainingSecs <= 5) { // Update at 25%, 50%, 75%, 100% or last 5 seconds
                Chat.log(`🔥 Smelting: ${progressPercent}% - ${remainingSecs}s remaining`);
            }
        }

        // Status changes
        if (isBurning && lastProgress === 0 && progress > 0) {
            const itemName = inputItem ? inputItem.getName() : "Unknown";
            Chat.log(`🔥 Started smelting: ${itemName}`);
        }

        lastProgress = progress;
        lastFuelTime = fuelTime;

        // Schedule next update
        if (monitoring) {
            setTimeout(updateProgress, updateInterval);
        }
    }

    Chat.log("🔍 Started furnace progress monitoring...");
    updateProgress();

    // Return control object
    return {
        stop: function() {
            monitoring = false;
            Chat.log("⏹ Furnace monitoring stopped");
            Chat.log(`📊 Session summary: ${itemsCompleted} items completed`);
        },

        getStatus: function() {
            return {
                monitoring: monitoring,
                itemsCompleted: itemsCompleted,
                lastProgress: lastProgress
            };
        }
    };
}

// Start monitoring
const monitor = createFurnaceProgressMonitor(1500); // Update every 1.5 seconds

// To stop monitoring later:
// monitor.stop();
```

### Example 5: Batch Smelting Manager

```javascript
function batchSmeltingManager(targetItems, autoRestock = true) {
    const furnace = Inventory.create();

    if (!furnace || !furnace.getType().includes("Furnace")) {
        Chat.log("No furnace interface open");
        return;
    }

    Chat.log("=== Batch Smelting Manager ===");
    Chat.log(`Target items: ${targetItems.join(", ")}`);

    let totalProcessed = 0;
    let currentTargetIndex = 0;
    let processing = true;

    function processNextItem() {
        if (!processing || currentTargetIndex >= targetItems.length) {
            Chat.log(`✅ Batch smelting completed! Total processed: ${totalProcessed} items`);
            return;
        }

        const currentFurnace = Inventory.create();
        if (!currentFurnace || !currentFurnace.getType().includes("Furnace")) {
            Chat.log("🔥 Furnace closed - batch processing stopped");
            processing = false;
            return;
        }

        const targetItem = targetItems[currentTargetIndex];
        Chat.log(`\nProcessing ${currentTargetIndex + 1}/${targetItems.length}: ${targetItem}`);

        // Check current furnace state
        const inputItem = currentFurnace.getSmeltedItem();
        const fuelTime = currentFurnace.getRemainingFuelTime();
        const outputItem = currentFurnace.getOutput();
        const progress = currentFurnace.getSmeltingProgress();
        const totalTime = currentFurnace.getTotalSmeltingTime();

        // Collect output if ready
        if (!outputItem.isEmpty() && progress >= totalTime) {
            Chat.log(`📦 Collecting: ${outputItem.getName()} x${outputItem.getCount()}`);
            currentFurnace.quick(2); // Collect output
            totalProcessed += outputItem.getCount();
        }

        // Check if current item matches target
        if (!inputItem.isEmpty() && inputItem.getItemId() === targetItem) {
            // Check if smelting is in progress
            if (progress > 0 && progress < totalTime) {
                const remaining = Math.round((totalTime - progress) / 20);
                Chat.log(`⏳ Waiting for current item: ${remaining}s remaining`);
                setTimeout(processNextItem, 2000);
                return;
            }
        }

        // Add new item if input is empty or wrong
        if (inputItem.isEmpty() || inputItem.getItemId() !== targetItem) {
            // Find target item in inventory
            const itemSlots = currentFurnace.getSlots("main", "hotbar").filter(slot => {
                const item = currentFurnace.getSlot(slot);
                return !item.isEmpty() && item.getItemId() === targetItem;
            });

            if (itemSlots.length === 0) {
                Chat.log(`⚠ No ${targetItem} found in inventory, skipping...`);
                currentTargetIndex++;
                setTimeout(processNextItem, 1000);
                return;
            }

            // Move item to furnace
            const itemSlot = itemSlots[0];
            const item = currentFurnace.getSlot(itemSlot);
            Chat.log(`📦 Adding ${item.getName()} x${item.getCount()} to furnace`);

            currentFurnace.click(itemSlot);
            currentFurnace.click(0); // Input slot
            currentFurnace.click(itemSlot);

            totalProcessed += item.getCount();
        }

        // Check fuel
        if (autoRestock && fuelTime === 0) {
            Chat.log("🔥 Adding fuel...");

            const fuelTypes = ["minecraft:coal", "minecraft:charcoal", "minecraft:lava_bucket"];
            let fuelAdded = false;

            for (const fuelType of fuelTypes) {
                const fuelSlots = currentFurnace.getSlots("main", "hotbar").filter(slot => {
                    const item = currentFurnace.getSlot(slot);
                    return !item.isEmpty() && item.getItemId() === fuelType;
                });

                if (fuelSlots.length > 0) {
                    const fuelSlot = fuelSlots[0];
                    currentFurnace.click(fuelSlot);
                    currentFurnace.click(1); // Fuel slot
                    currentFurnace.click(fuelSlot);

                    const fuelItem = currentFurnace.getSlot(fuelSlot);
                    Chat.log(`✓ Added ${fuelItem.getName()} as fuel`);
                    fuelAdded = true;
                    break;
                }
            }

            if (!fuelAdded) {
                Chat.log("⚠ No fuel available! Waiting...");
                setTimeout(processNextItem, 5000);
                return;
            }
        }

        // Wait for smelting to complete
        setTimeout(() => {
            currentTargetIndex++;
            processNextItem();
        }, Math.round(totalTime * 50) + 1000); // Wait for smelting time + 1 second buffer
    }

    // Start batch processing
    processNextItem();

    // Return control object
    return {
        stop: function() {
            processing = false;
            Chat.log("⏹ Batch smelting stopped");
            Chat.log(`📊 Processed: ${totalProcessed} items`);
        },

        getStatus: function() {
            return {
                processing: processing,
                currentTarget: currentTargetIndex,
                totalTargets: targetItems.length,
                totalProcessed: totalProcessed
            };
        }
    };
}

// Example usage - batch smelt ores and other items
const oreBatch = [
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:copper_ore",
    "minecraft:cobblestone"
];

const foodBatch = [
    "minecraft:potato",
    "minecraft:beef",
    "minecraft:porkchop",
    "minecraft:chicken"
];

// Start batch processing
// const batchManager = batchSmeltingManager(oreBatch, true);

// To stop later:
// batchManager.stop();
```

## Important Notes

1. **Furnace Interface Required**: All `FurnaceInventory` methods require that a furnace GUI interface is currently open (regular furnace, blast furnace, or smoker).

2. **Furnace Types**: This class works with all furnace variants:
   - Regular Furnace: 200 ticks (10 seconds) per item
   - Blast Furnace: 100 ticks (5 seconds) for ores only
   - Smoker: 100 ticks (5 seconds) for food only

3. **Fuel System**: Different fuel items have different burn times. Use `getFuelValues()` to see all available fuels and their burn times.

4. **Smelting Time**: A complete smelting cycle varies by furnace type:
   - Regular furnace: 200 ticks (10 seconds)
   - Blast furnace/smoker: 100 ticks (5 seconds)

5. **Recipe Validation**: Use `isSmeltable()` before attempting to smelt items to ensure they can be processed.

6. **Slot Indexing**: The furnace uses specific slot indices:
   - 0: Input slot (top left)
   - 1: Fuel slot (bottom left)
   - 2: Output slot (right)

7. **Fuel Validation**: Not all items are valid fuels. Always check with `canUseAsFuel()` before use.

8. **Progress Tracking**: Use `getSmeltingProgress()` and `getRemainingSmeltingTime()` to monitor smelting operations.

9. **Inheritance**: All standard inventory operations are available through inheritance from the `Inventory` and `RecipeInventory` classes.

10. **Auto-collection**: Remember to collect finished items from the output slot to make room for more smelting.

## Related Classes

- `Inventory` - Base class providing standard inventory operations
- `RecipeInventory` - Parent class providing recipe-related functionality
- `ItemStackHelper` - For working with smelting inputs, fuels, and outputs
- `PlayerInventory` - For accessing player's inventory to find materials
- `ContainerInventory` - Similar container inventory functionality
- `BrewingStandInventory` - Similar specialized inventory for brewing operations

## Version Information

- Available since JSMacros 1.8.4
- Compatible with Minecraft 1.20+ furnace system
- Supports all vanilla furnace types (furnace, blast furnace, smoker)
- Fuel validation follows Minecraft vanilla furnace mechanics
- Recipe validation follows Minecraft vanilla smelting mechanics