# BrewingStandInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.BrewingStandInventory`

**Extends:** `Inventory<BrewingStandScreen>`

**Since:** `1.8.4`

The `BrewingStandInventory` class is a specialized inventory helper that provides access to Minecraft brewing stand screen functionality. It wraps Minecraft's brewing stand GUI and allows scripters to programmatically interact with potion brewing operations, check brewing progress, manage fuel, and preview brewing results. This class is specifically designed for managing brewing operations when a brewing stand interface is open.

This class provides methods for examining brewing recipes, checking valid ingredients, monitoring brewing progress, and managing the three potion slots, ingredient slot, and fuel slot of a brewing stand.

## Overview

The `BrewingStandInventory` represents the interface to a Minecraft brewing stand when its GUI is open. It provides access to brewing-specific operations such as:

- Checking if potions and ingredients can be brewed together
- Monitoring brewing progress and fuel levels
- Accessing individual potion slots, ingredient slot, and fuel slot
- Previewing brewing results before starting the process
- Validating brewing recipes and ingredients

**Key Features:**
- Recipe validation and preview functionality
- Fuel management and monitoring
- Brewing progress tracking
- Individual slot access for potions, ingredients, and fuel
- Integration with standard inventory operations

## Accessing BrewingStandInventory

You typically get `BrewingStandInventory` instances when a brewing stand screen is open:

```javascript
// Check if current screen is a brewing stand
const inv = Inventory.create();
if (inv && inv.getType() === "BrewingStand") {
    // This is a BrewingStandInventory
    const brewingInv = inv; // Already typed as BrewingStandInventory
    Chat.log("Fuel remaining: " + brewingInv.getFuelCount());
}

// Direct creation when brewing stand screen is known to be open
const brewingInventory = Inventory.create(); // Returns BrewingStandInventory if brewing stand screen is open
```

## Brewing Stand Slot Layout

The brewing stand has the following slot structure:

- **Slot 0**: First potion bottle slot (left)
- **Slot 1**: Second potion bottle slot (middle)
- **Slot 2**: Third potion bottle slot (right)
- **Slot 3**: Ingredient slot (top)
- **Slot 4**: Fuel slot (blaze powder, bottom left)

## Methods

### Recipe Validation and Preview

#### `isBrewablePotion(potion)`
**Parameters:**
- `potion` (`ItemStackHelper`): The potion item stack to check

**Returns:** `boolean`

Returns `true` if the given potion can be brewed in a brewing stand (i.e., it's a valid base potion or potion that can be modified), `false` otherwise.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const firstPotion = brewing.getFirstPotion();
    if (!firstPotion.isEmpty()) {
        const isBrewable = brewing.isBrewablePotion(firstPotion);
        if (isBrewable) {
            Chat.log("This potion can be brewed further");
        } else {
            Chat.log("This potion cannot be brewed further");
        }
    }
}
```

#### `isValidIngredient(ingredient)`
**Parameters:**
- `ingredient` (`ItemStackHelper`): The ingredient item stack to check

**Returns:** `boolean`

Returns `true` if the given item is a valid brewing ingredient (e.g., nether wart, glowstone dust, redstone, gunpowder, etc.), `false` otherwise.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const ingredient = brewing.getIngredient();
    if (!ingredient.isEmpty()) {
        const isValid = brewing.isValidIngredient(ingredient);
        if (isValid) {
            Chat.log(`${ingredient.getName()} is a valid brewing ingredient`);
        } else {
            Chat.log(`${ingredient.getName()} cannot be used for brewing`);
        }
    }
}
```

#### `isValidRecipe(potion, ingredient)`
**Parameters:**
- `potion` (`ItemStackHelper`): The potion item stack to check
- `ingredient` (`ItemStackHelper`): The ingredient item stack to check

**Returns:** `boolean`

Returns `true` if the given potion and ingredient combination can be brewed together, `false` otherwise.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const firstPotion = brewing.getFirstPotion();
    const ingredient = brewing.getIngredient();

    if (!firstPotion.isEmpty() && !ingredient.isEmpty()) {
        const canBrew = brewing.isValidRecipe(firstPotion, ingredient);
        if (canBrew) {
            Chat.log(`${firstPotion.getName()} + ${ingredient.getName()} = Valid recipe!`);
        } else {
            Chat.log(`${firstPotion.getName()} + ${ingredient.getName()} = Invalid recipe`);
        }
    }
}
```

#### `previewPotion(potion, ingredient)`
**Parameters:**
- `potion` (`ItemStackHelper`): The base potion to preview
- `ingredient` (`ItemStackHelper`): The ingredient to apply

**Returns:** `ItemStackHelper`

Returns the resulting potion item stack that would be created by brewing the given potion with the ingredient. If no recipe exists, returns the original potion unchanged.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const potion = brewing.getFirstPotion();
    const ingredient = brewing.getIngredient();

    if (!potion.isEmpty() && !ingredient.isEmpty()) {
        const result = brewing.previewPotion(potion, ingredient);
        Chat.log(`Result: ${result.getName()}`);

        // Show NBT data for more detailed preview
        if (result.hasNBT()) {
            Chat.log(`NBT: ${result.getNBT()}`);
        }
    }
}
```

#### `previewPotions()`
**Returns:** `List<ItemStackHelper>`

Returns a list of all resulting potions from the current brewing input (all three potion slots with the current ingredient). Each item in the list corresponds to the result of brewing the potion in that slot.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const results = brewing.previewPotions();

    Chat.log("=== Brewing Preview ===");
    const slotNames = ["Left", "Middle", "Right"];
    results.forEach((result, index) => {
        const inputPotion = brewing.getSlot(index);
        if (!inputPotion.isEmpty()) {
            Chat.log(`${slotNames[index]}: ${inputPotion.getName()} → ${result.getName()}`);
        } else {
            Chat.log(`${slotNames[index]}: Empty slot`);
        }
    });
}
```

#### `canBrewCurrentInput()`
**Returns:** `boolean`

Returns `true` if the brewing stand can brew any of the currently held potions with the current ingredient, `false` otherwise. This checks if there's a valid ingredient, fuel, and at least one valid recipe.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const canBrew = brewing.canBrewCurrentInput();
    if (canBrew) {
        Chat.log("✓ Ready to brew!");

        // Show what will be brewed
        const results = brewing.previewPotions();
        results.forEach((result, index) => {
            const input = brewing.getSlot(index);
            if (!input.isEmpty() && result.getName() !== input.getName()) {
                Chat.log(`  ${input.getName()} → ${result.getName()}`);
            }
        });
    } else {
        Chat.log("✗ Cannot brew with current setup");

        // Diagnose the issue
        const ingredient = brewing.getIngredient();
        if (ingredient.isEmpty()) {
            Chat.log("  - No ingredient in slot");
        } else if (!brewing.isValidIngredient(ingredient)) {
            Chat.log("  - Invalid ingredient: " + ingredient.getName());
        } else if (brewing.getFuelCount() <= 0) {
            Chat.log("  - No fuel remaining");
        } else {
            Chat.log("  - No valid recipes with current potions and ingredient");
        }
    }
}
```

### Fuel Management

#### `getFuelCount()`
**Returns:** `int`

Returns the current amount of fuel remaining in the brewing stand. Each blaze powder provides 20 fuel units. Returns 0 when no fuel is remaining.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const fuel = brewing.getFuelCount();
    const maxFuel = brewing.getMaxFuelUses();

    Chat.log(`Fuel: ${fuel}/${maxFuel} (${Math.round(fuel/maxFuel*100)}%)`);

    if (fuel <= 4) {
        Chat.log("⚠ Low fuel warning!");
    }
}
```

#### `getMaxFuelUses()`
**Returns:** `int`

Returns the maximum fuel capacity of the brewing stand. This is always `20`, representing the maximum fuel units a brewing stand can hold (from blaze powder).

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const maxFuel = brewing.getMaxFuelUses();
    Chat.log(`Maximum fuel capacity: ${maxFuel} units`);

    // Calculate how many more brew operations can be done
    const currentFuel = brewing.getFuelCount();
    Chat.log(`Remaining brew operations: ${Math.floor(currentFuel / 1)}`); // Each brew uses 1 fuel
}
```

### Brewing Progress

#### `getBrewTime()`
**Returns:** `int`

Returns the time that the current potions have been brewing, in ticks. Returns 0 if no brewing is in progress. One brew cycle typically takes 400 ticks (20 seconds).

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const brewTime = brewing.getBrewTime();

    if (brewTime > 0) {
        const seconds = Math.round(brewTime / 20);
        const progress = (brewTime / 400) * 100; // 400 ticks = full cycle
        Chat.log(`Brewing progress: ${Math.round(progress)}% (${seconds}s elapsed)`);

        // Create a progress bar
        const barLength = 20;
        const filled = Math.round((progress / 100) * barLength);
        const bar = "█".repeat(filled) + "░".repeat(barLength - filled);
        Chat.log(`[${bar}]`);
    } else {
        Chat.log("No brewing in progress");
    }
}
```

#### `getRemainingTicks()`
**Returns:** `int`

Returns the remaining time until the current brewing cycle completes, in ticks. Returns the full brew time (typically 400) if no brewing is in progress.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const remaining = brewing.getRemainingTicks();

    if (remaining < 400) { // 400 is the full brew time
        const seconds = Math.round(remaining / 20);
        Chat.log(`Time remaining: ${seconds} seconds`);

        // Calculate completion time
        const now = new Date();
        const completion = new Date(now.getTime() + remaining * 50); // 1 tick = 50ms
        Chat.log(`Brewing completes at: ${completion.toLocaleTimeString()}`);
    } else {
        Chat.log("No active brewing process");
    }
}
```

### Slot Access

#### `getIngredient()`
**Returns:** `ItemStackHelper`

Returns the item stack in the ingredient slot (slot 3, top slot). This is where brewing ingredients like nether wart, glowstone dust, redstone, etc. are placed.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const ingredient = brewing.getIngredient();

    if (!ingredient.isEmpty()) {
        Chat.log(`Ingredient: ${ingredient.getName()} x${ingredient.getCount()}`);

        if (brewing.isValidIngredient(ingredient)) {
            Chat.log("✓ Valid brewing ingredient");
        } else {
            Chat.log("✗ Not a valid brewing ingredient");
        }
    } else {
        Chat.log("No ingredient in brewing stand");
    }
}
```

#### `getFuel()`
**Returns:** `ItemStackHelper`

Returns the item stack in the fuel slot (slot 4, bottom left). This is typically where blaze powder is placed for fuel.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const fuel = brewing.getFuel();

    if (!fuel.isEmpty()) {
        Chat.log(`Fuel item: ${fuel.getName()} x${fuel.getCount()}`);
        Chat.log(`Fuel remaining: ${brewing.getFuelCount()}/${brewing.getMaxFuelUses()}`);
    } else {
        Chat.log("No fuel in brewing stand");
        Chat.log("Add blaze powder to start brewing");
    }
}
```

#### `getFirstPotion()`
**Returns:** `ItemStackHelper`

Returns the item stack in the first potion slot (slot 0, left slot). This is where potion bottles are placed for brewing.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const potion = brewing.getFirstPotion();

    if (!potion.isEmpty()) {
        Chat.log(`First potion: ${potion.getName()}`);

        if (brewing.isBrewablePotion(potion)) {
            Chat.log("This potion can be brewed further");
        } else {
            Chat.log("This potion is fully brewed or invalid");
        }
    } else {
        Chat.log("First potion slot is empty");
    }
}
```

#### `getSecondPotion()`
**Returns:** `ItemStackHelper`

Returns the item stack in the second potion slot (slot 1, middle slot).

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const potion = brewing.getSecondPotion();

    if (!potion.isEmpty()) {
        Chat.log(`Second potion: ${potion.getName()}`);
    } else {
        Chat.log("Second potion slot is empty");
    }
}
```

#### `getThirdPotion()`
**Returns:** `ItemStackHelper`

Returns the item stack in the third potion slot (slot 2, right slot).

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const potion = brewing.getThirdPotion();

    if (!potion.isEmpty()) {
        Chat.log(`Third potion: ${potion.getName()}`);
    } else {
        Chat.log("Third potion slot is empty");
    }
}
```

#### `getPotions()`
**Returns:** `List<ItemStackHelper>`

Returns a list containing all three potion slot item stacks (slots 0, 1, and 2). Empty slots will be represented by empty item stacks.

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    const potions = brewing.getPotions();
    const slotNames = ["Left", "Middle", "Right"];

    Chat.log("=== Potion Slots ===");
    potions.forEach((potion, index) => {
        if (!potion.isEmpty()) {
            Chat.log(`${slotNames[index]}: ${potion.getName()}`);
        } else {
            Chat.log(`${slotNames[index]}: Empty`);
        }
    });

    const filledSlots = potions.filter(p => !p.isEmpty()).length;
    Chat.log(`Filled slots: ${filledSlots}/3`);
}
```

## Inherited Methods from Inventory

Since `BrewingStandInventory` extends `Inventory<BrewingStandScreen>`, it inherits all standard inventory operations:

### Slot Access and Manipulation
- `getSlot(slot)` - Get item in specific slot
- `getTotalSlots()` - Get total number of slots
- `click(slot)` - Click a slot
- `quick(slot)` - Shift-click a slot
- `dropSlot(slot)` - Drop items from slot
- `getHeld()` - Get item held by mouse

### Inventory Mapping
- `getMap()` - Get slot mapping for brewing stand inventory
- `getSlots(...identifiers)` - Get slots in specific sections
- `getLocation(slot)` - Get section name for a slot

**Brewing Stand Inventory Mapping:**
- `"hotbar"` - Player hotbar slots (9 slots)
- `"main"` - Player main inventory (27 slots)
- `"slots"` - Brewing stand specific slots (5 slots: 3 potions, 1 ingredient, 1 fuel)

### Utility Methods
- `getType()` - Returns "BrewingStand"
- `close()` - Close the brewing stand interface
- `getContainerTitle()` - Get brewing stand title
- `contains(item)` - Check if inventory contains specific item

```javascript
const brewing = Inventory.create();
if (brewing && brewing.getType() === "BrewingStand") {
    // Get the brewing stand inventory mapping
    const slotMap = brewing.getMap();
    Chat.log("Available sections: " + Object.keys(slotMap).join(", "));

    // Access brewing stand specific slots
    const brewingSlots = brewing.getSlots("slots");
    Chat.log(`Brewing stand slots: ${brewingSlots.join(", ")}`);

    // Check for blaze powder in inventory for fuel
    if (brewing.contains("minecraft:blaze_powder")) {
        Chat.log("You have blaze powder for fuel");
    }

    // Count available water bottles
    const waterBottles = brewing.getItemCount("minecraft:potion");
    if (waterBottles > 0) {
        Chat.log(`Water bottles available: ${waterBottles}`);
    }
}
```

## Usage Examples

### Example 1: Brewing Recipe Analyzer

```javascript
function analyzeBrewingSetup() {
    const brewing = Inventory.create();

    if (!brewing || brewing.getType() !== "BrewingStand") {
        Chat.log("No brewing stand interface open");
        return;
    }

    Chat.log("=== Brewing Stand Analysis ===");

    // Check fuel
    const fuel = brewing.getFuel();
    const fuelCount = brewing.getFuelCount();
    Chat.log(`Fuel: ${fuelCount}/${brewing.getMaxFuelUses()} (${Math.round(fuelCount/20*100)}%)`);

    if (fuelCount === 0) {
        Chat.log("⚠ No fuel remaining!");
    }

    // Check ingredient
    const ingredient = brewing.getIngredient();
    if (!ingredient.isEmpty()) {
        Chat.log(`Ingredient: ${ingredient.getName()} x${ingredient.getCount()}`);
        const isValid = brewing.isValidIngredient(ingredient);
        Chat.log(`Valid ingredient: ${isValid ? "✓" : "✗"}`);
    } else {
        Chat.log("Ingredient slot is empty");
    }

    // Analyze potions
    const potions = brewing.getPotions();
    let validRecipes = 0;

    Chat.log("\nPotion Analysis:");
    const slotNames = ["Left", "Middle", "Right"];

    potions.forEach((potion, index) => {
        if (!potion.isEmpty()) {
            Chat.log(`${slotNames[index]}: ${potion.getName()}`);

            const brewable = brewing.isBrewablePotion(potion);
            const validRecipe = brewing.isValidRecipe(potion, ingredient);

            Chat.log(`  Brewable: ${brewable ? "✓" : "✗"}`);
            Chat.log(`  Valid with current ingredient: ${validRecipe ? "✓" : "✗"}`);

            if (validRecipe) {
                validRecipes++;
                const result = brewing.previewPotion(potion, ingredient);
                Chat.log(`  Result: ${result.getName()}`);
            }
        } else {
            Chat.log(`${slotNames[index]}: Empty`);
        }
    });

    // Overall status
    const canBrew = brewing.canBrewCurrentInput();
    Chat.log(`\nOverall Status: ${canBrew ? "✓ Ready to brew" : "✗ Cannot brew"}`);

    if (canBrew) {
        const results = brewing.previewPotions();
        Chat.log("Expected results:");
        results.forEach((result, index) => {
            const input = potions[index];
            if (!input.isEmpty() && result.getName() !== input.getName()) {
                Chat.log(`  ${input.getName()} → ${result.getName()}`);
            }
        });
    }

    // Check brewing progress
    const brewTime = brewing.getBrewTime();
    if (brewTime > 0) {
        const progress = (brewTime / 400) * 100;
        Chat.log(`\nBrewing Progress: ${Math.round(progress)}%`);
    }

    Chat.log("=============================");
}

// Run the analyzer
analyzeBrewingSetup();
```

### Example 2: Automatic Brewing Assistant

```javascript
function autoBrewPotions(targetPotionType = "minecraft:strength") {
    const brewing = Inventory.create();

    if (!brewing || brewing.getType() !== "BrewingStand") {
        Chat.log("No brewing stand interface open");
        return false;
    }

    Chat.log(`=== Auto Brewing: ${targetPotionType} ===`);

    // Check fuel first
    const fuelCount = brewing.getFuelCount();
    if (fuelCount === 0) {
        Chat.log("No fuel! Please add blaze powder");
        return false;
    }
    Chat.log(`Fuel available: ${fuelCount} units`);

    // Find suitable ingredient for target potion
    const ingredientRecipes = {
        "minecraft:strength": "minecraft:blaze_powder",
        "minecraft:long_strength": "minecraft:redstone",
        "minecraft:strong_strength": "minecraft:glowstone_dust",
        "minecraft:swiftness": "minecraft:sugar",
        "minecraft:long_swiftness": "minecraft:redstone",
        "minecraft:strong_swiftness": "minecraft:glowstone_dust",
        "minecraft:healing": "minecraft:glistering_melon_slice",
        "minecraft:strong_healing": "minecraft:glowstone_dust",
        "minecraft:poison": "minecraft:spider_eye",
        "minecraft:long_poison": "minecraft:redstone",
        "minecraft:strong_poison": "minecraft:glowstone_dust",
        "minecraft:regeneration": "minecraft:ghast_tear",
        "minecraft:long_regeneration": "minecraft:redstone",
        "minecraft:strong_regeneration": "minecraft:glowstone_dust",
        "minecraft:fire_resistance": "minecraft:magma_cream",
        "minecraft:long_fire_resistance": "minecraft:redstone",
        "minecraft:night_vision": "minecraft:golden_carrot",
        "minecraft:long_night_vision": "minecraft:redstone",
        "minecraft:invisibility": "minecraft:fermented_spider_eye",
        "minecraft:long_invisibility": "minecraft:redstone",
        "minecraft:slowness": "minecraft:fermented_spider_eye",
        "minecraft:long_slowness": "minecraft:redstone",
        "minecraft:strong_slowness": "minecraft:glowstone_dust",
        "minecraft:water_breathing": "minecraft:pufferfish",
        "minecraft:long_water_breathing": "minecraft:redstone",
        "minecraft:leaping": "minecraft:rabbit_foot",
        "minecraft:long_leaping": "minecraft:redstone",
        "minecraft:strong_leaping": "minecraft:glowstone_dust",
        "minecraft:weakness": "minecraft:fermented_spider_eye",
        "minecraft:long_weakness": "minecraft:redstone"
    };

    const targetIngredient = ingredientRecipes[targetPotionType];
    if (!targetIngredient) {
        Chat.log(`Unknown target potion: ${targetPotionType}`);
        return false;
    }

    Chat.log(`Target ingredient: ${targetIngredient}`);

    // Check if we have the ingredient in inventory
    const ingredientSlot = brewing.getSlots("main").find(slot => {
        const item = brewing.getSlot(slot);
        return !item.isEmpty() && item.getItemId() === targetIngredient;
    });

    if (ingredientSlot === undefined) {
        Chat.log(`Required ingredient ${targetIngredient} not found in inventory`);
        return false;
    }

    // Move ingredient to brewing stand if needed
    const currentIngredient = brewing.getIngredient();
    if (currentIngredient.isEmpty() || currentIngredient.getItemId() !== targetIngredient) {
        Chat.log("Moving correct ingredient to brewing stand...");
        brewing.quick(ingredientSlot); // Shift-click to move to appropriate slot
    }

    // Fill water bottles if empty
    const potions = brewing.getPotions();
    let filledSlots = 0;

    for (let i = 0; i < 3; i++) {
        if (potions[i].isEmpty()) {
            // Find water bottle in inventory
            const waterBottleSlot = brewing.getSlots("main").find(slot => {
                const item = brewing.getSlot(slot);
                return !item.isEmpty() && item.getItemId() === "minecraft:potion";
            });

            if (waterBottleSlot !== undefined) {
                // Move water bottle to this potion slot
                brewing.click(waterBottleSlot);
                brewing.click(i);
                brewing.click(waterBottleSlot);
                filledSlots++;
            }
        } else {
            filledSlots++;
        }
    }

    Chat.log(`Potion slots filled: ${filledSlots}/3`);

    // Check if we can brew
    if (brewing.canBrewCurrentInput()) {
        Chat.log("✓ Ready to brew!");

        // Show what will be created
        const results = brewing.previewPotions();
        results.forEach((result, index) => {
            const input = potions[index];
            if (!input.isEmpty() && result.getName() !== input.getName()) {
                Chat.log(`  ${input.getName()} → ${result.getName()}`);
            }
        });

        return true;
    } else {
        Chat.log("✗ Cannot brew with current setup");
        return false;
    }
}

// Usage examples:
autoBrewPotions("minecraft:strength");
autoBrewPotions("minecraft:long_swiftness");
```

### Example 3: Brewing Progress Monitor

```javascript
function monitorBrewingProgress(updateInterval = 1000) {
    const brewing = Inventory.create();

    if (!brewing || brewing.getType() !== "BrewingStand") {
        Chat.log("No brewing stand interface open");
        return;
    }

    let lastBrewTime = 0;
    let monitoring = true;

    function updateProgress() {
        if (!monitoring) return;

        const currentBrewing = Inventory.create();
        if (!currentBrewing || currentBrewing.getType() !== "BrewingStand") {
            Chat.log("Brewing stand closed - monitoring stopped");
            monitoring = false;
            return;
        }

        const brewTime = currentBrewing.getBrewTime();
        const remaining = currentBrewing.getRemainingTicks();
        const fuel = currentBrewing.getFuelCount();

        if (brewTime > 0) {
            // Brewing is in progress
            const progress = (brewTime / 400) * 100;
            const seconds = Math.round(remaining / 20);

            // Only update if something changed
            if (brewTime !== lastBrewTime || fuel <= 2) {
                Chat.log(`🧪 Brewing: ${Math.round(progress)}% (${seconds}s remaining) | Fuel: ${fuel}/20`);

                if (fuel <= 2) {
                    Chat.log("⚠ Low fuel warning!");
                }

                lastBrewTime = brewTime;
            }
        } else {
            // Check if brewing just completed
            if (lastBrewTime > 0) {
                Chat.log("✅ Brewing completed!");

                // Show results
                const potions = currentBrewing.getPotions();
                potions.forEach((potion, index) => {
                    if (!potion.isEmpty()) {
                        const slotNames = ["Left", "Middle", "Right"];
                        Chat.log(`  ${slotNames[index]}: ${potion.getName()}`);
                    }
                });

                lastBrewTime = 0;
            } else {
                // Check if ready to brew
                if (currentBrewing.canBrewCurrentInput()) {
                    Chat.log("🔄 Ready to brew! Add ingredients to start.");
                } else if (lastBrewTime === 0) {
                    // Initial status
                    Chat.log("💤 No brewing in progress");
                }
            }
        }

        // Schedule next update
        if (monitoring) {
            setTimeout(updateProgress, updateInterval);
        }
    }

    Chat.log("🔍 Started brewing progress monitoring...");
    updateProgress();

    // Return a function to stop monitoring
    return function stop() {
        monitoring = false;
        Chat.log("⏹ Brewing monitoring stopped");
    };
}

// Start monitoring
const stopMonitoring = monitorBrewingProgress(2000); // Update every 2 seconds

// To stop monitoring later:
// stopMonitoring();
```

### Example 4: Potion Batch Brewing Manager

```javascript
function batchBrewManager(recipes, restock = true) {
    const brewing = Inventory.create();

    if (!brewing || brewing.getType() !== "BrewingStand") {
        Chat.log("No brewing stand interface open");
        return;
    }

    Chat.log("=== Batch Brewing Manager ===");
    Chat.log(`Recipes to process: ${recipes.length}`);

    let currentRecipeIndex = 0;
    let totalBrewed = 0;

    function processNextRecipe() {
        if (currentRecipeIndex >= recipes.length) {
            Chat.log(`✅ Batch brewing completed! Total: ${totalBrewed} potions`);
            return;
        }

        const recipe = recipes[currentRecipeIndex];
        Chat.log(`\nProcessing recipe ${currentRecipeIndex + 1}/${recipes.length}:`);
        Chat.log(`  Input: ${recipe.input}`);
        Chat.log(`  Ingredient: ${recipe.ingredient}`);
        Chat.log(`  Expected: ${recipe.output}`);

        const currentBrewing = Inventory.create();
        if (!currentBrewing || currentBrewing.getType() !== "BrewingStand") {
            Chat.log("Brewing stand closed - batch brewing stopped");
            return;
        }

        // Check if we have enough fuel
        if (currentBrewing.getFuelCount() < 5 && restock) {
            // Try to add more fuel
            const fuelSlot = currentBrewing.getSlots("main").find(slot => {
                const item = currentBrewing.getSlot(slot);
                return !item.isEmpty() && item.getItemId() === "minecraft:blaze_powder";
            });

            if (fuelSlot !== undefined) {
                currentBrewing.click(fuelSlot);
                currentBrewing.click(4); // Click fuel slot
                currentBrewing.click(fuelSlot);
                Chat.log("🔥 Restocked fuel");
            } else {
                Chat.log("⚠ No more blaze powder for fuel!");
                return;
            }
        }

        // Wait for current brewing to complete if in progress
        const brewTime = currentBrewing.getBrewTime();
        if (brewTime > 0) {
            Chat.log(`⏳ Waiting for current brew to complete... (${Math.round((400-brewTime)/20)}s)`);
            setTimeout(processNextRecipe, 2000);
            return;
        }

        // Setup recipe
        const inputPotion = currentBrewing.getFirstPotion();
        const ingredient = currentBrewing.getIngredient();

        // Check if setup is correct
        if (inputPotion.isEmpty() || inputPotion.getItemId() !== recipe.input) {
            Chat.log(`❌ Wrong input potion. Expected: ${recipe.input}`);
            currentRecipeIndex++;
            setTimeout(processNextRecipe, 1000);
            return;
        }

        if (ingredient.isEmpty() || ingredient.getItemId() !== recipe.ingredient) {
            Chat.log(`❌ Wrong ingredient. Expected: ${recipe.ingredient}`);
            currentRecipeIndex++;
            setTimeout(processNextRecipe, 1000);
            return;
        }

        // Check if recipe is valid
        if (!currentBrewing.isValidRecipe(inputPotion, ingredient)) {
            Chat.log("❌ Invalid recipe combination");
            currentRecipeIndex++;
            setTimeout(processNextRecipe, 1000);
            return;
        }

        // Preview result
        const result = currentBrewing.previewPotion(inputPotion, ingredient);
        if (result.getItemId() !== recipe.output) {
            Chat.log(`❌ Wrong output. Expected: ${recipe.output}, Got: ${result.getItemId()}`);
            currentRecipeIndex++;
            setTimeout(processNextRecipe, 1000);
            return;
        }

        Chat.log("✅ Recipe setup correct, starting brew...");

        // Count how many potions will be brewed
        const potions = currentBrewing.getPotions();
        const validPotions = potions.filter(p =>
            !p.isEmpty() && p.getItemId() === recipe.input
        ).length;

        totalBrewed += validPotions;
        Chat.log(`🧪 Brewing ${validPotions} potions...`);

        currentRecipeIndex++;

        // Wait for brewing to complete
        setTimeout(processNextRecipe, 22000); // 22 seconds for brew cycle
    }

    // Start batch processing
    processNextRecipe();
}

// Example usage - batch brewing strength potions
const strengthRecipes = [
    { input: "minecraft:potion", ingredient: "minecraft:nether_wart", output: "minecraft:awkward_potion" },
    { input: "minecraft:awkward_potion", ingredient: "minecraft:blaze_powder", output: "minecraft:strength" },
    { input: "minecraft:strength", ingredient: "minecraft:glowstone_dust", output: "minecraft:strong_strength" },
    { input: "minecraft:strength", ingredient: "minecraft:redstone", output: "minecraft:long_strength" }
];

// Batch brewing requires manual setup for now, but this shows the recipe structure
// batchBrewManager(strengthRecipes);
```

### Example 5: Brewing Stand Status Dashboard

```javascript
function brewingStandDashboard() {
    const brewing = Inventory.create();

    if (!brewing || brewing.getType() !== "BrewingStand") {
        Chat.log("No brewing stand interface open");
        return;
    }

    Chat.log("==============================");
    Chat.log("     🧪 BREWING STAND DASHBOARD");
    Chat.log("==============================");

    // Fuel status
    const fuelCount = brewing.getFuelCount();
    const maxFuel = brewing.getMaxFuelUses();
    const fuelPercent = Math.round((fuelCount / maxFuel) * 100);

    // Create fuel bar
    const fuelBarLength = 20;
    const fuelFilled = Math.round((fuelPercent / 100) * fuelBarLength);
    const fuelBar = "🔥".repeat(fuelFilled) + "░".repeat(fuelBarLength - fuelFilled);

    Chat.log(`Fuel:     [${fuelBar}] ${fuelPercent}% (${fuelCount}/${maxFuel})`);

    // Brewing progress
    const brewTime = brewing.getBrewTime();
    const remaining = brewing.getRemainingTicks();

    if (brewTime > 0) {
        const progressPercent = Math.round((brewTime / 400) * 100);
        const progressFilled = Math.round((progressPercent / 100) * fuelBarLength);
        const progressBar = "🧪".repeat(progressFilled) + "░".repeat(fuelBarLength - progressFilled);

        Chat.log(`Progress: [${progressBar}] ${progressPercent}%`);
        Chat.log(`Time:     ${Math.round(remaining / 20)}s remaining`);
    } else {
        const emptyBar = "░".repeat(fuelBarLength);
        Chat.log(`Progress: [${emptyBar}] Idle`);
        Chat.log(`Time:     --`);
    }

    Chat.log("");

    // Ingredient slot
    const ingredient = brewing.getIngredient();
    if (!ingredient.isEmpty()) {
        Chat.log(`Ingredient: ${ingredient.getName()} x${ingredient.getCount()}`);
        const valid = brewing.isValidIngredient(ingredient);
        Chat.log(`Status:     ${valid ? "✓ Valid" : "✗ Invalid"}`);
    } else {
        Chat.log("Ingredient: [Empty]");
        Chat.log("Status:     --");
    }

    Chat.log("");

    // Potion slots
    const potions = brewing.getPotions();
    const slotNames = ["┌─ Left", "├─ Middle", "└─ Right"];
    let filledSlots = 0;

    potions.forEach((potion, index) => {
        if (!potion.isEmpty()) {
            filledSlots++;
            const symbol = brewing.isBrewablePotion(potion) ? "🍵" : "🫖";
            Chat.log(`${symbol} ${slotNames[index]}: ${potion.getName()}`);

            // Show recipe status if ingredient exists
            if (!ingredient.isEmpty()) {
                const validRecipe = brewing.isValidRecipe(potion, ingredient);
                Chat.log(`   Recipe: ${validRecipe ? "✓" : "✗"}`);

                if (validRecipe) {
                    const result = brewing.previewPotion(potion, ingredient);
                    if (result.getName() !== potion.getName()) {
                        Chat.log(`   → ${result.getName()}`);
                    }
                }
            }
        } else {
            Chat.log(`  ${slotNames[index]}: [Empty]`);
        }
    });

    Chat.log("");

    // Overall status
    const canBrew = brewing.canBrewCurrentInput();
    Chat.log(`Overall Status: ${canBrew ? "✅ Ready to Brew" : "❌ Cannot Brew"}`);

    if (!canBrew) {
        Chat.log("Issues:");
        if (fuelCount === 0) Chat.log("  • No fuel");
        if (ingredient.isEmpty()) Chat.log("  • No ingredient");
        if (filledSlots === 0) Chat.log("  • No potions");
        if (!ingredient.isEmpty() && !brewing.isValidIngredient(ingredient)) {
            Chat.log("  • Invalid ingredient");
        }
    }

    // Inventory resources
    Chat.log("");
    Chat.log("📦 Inventory Resources:");

    // Check for brewing ingredients
    const brewingIngredients = [
        "minecraft:nether_wart",
        "minecraft:blaze_powder",
        "minecraft:glowstone_dust",
        "minecraft:redstone",
        "minecraft:sugar",
        "minecraft:ghast_tear",
        "minecraft:golden_carrot",
        "minecraft:spider_eye",
        "minecraft:fermented_spider_eye",
        "minecraft:magma_cream",
        "minecraft:pufferfish",
        "minecraft:rabbit_foot",
        "minecraft:glistering_melon_slice"
    ];

    let foundIngredients = 0;
    brewingIngredients.forEach(ingredientId => {
        const count = brewing.getItemCount(ingredientId);
        if (count > 0) {
            const itemName = ingredientId.replace("minecraft:", "").replace("_", " ");
            Chat.log(`  • ${itemName}: ${count}`);
            foundIngredients++;
        }
    });

    if (foundIngredients === 0) {
        Chat.log("  • No brewing ingredients found");
    }

    // Check for blaze powder (fuel)
    const blazePowder = brewing.getItemCount("minecraft:blaze_powder");
    if (blazePowder > 0) {
        Chat.log(`  • Blaze powder (fuel): ${blazePowder}`);
    }

    // Check for water bottles
    const waterBottles = brewing.getItemCount("minecraft:potion");
    if (waterBottles > 0) {
        Chat.log(`  • Water bottles: ${waterBottles}`);
    }

    Chat.log("==============================");
}

// Display the dashboard
brewingStandDashboard();
```

## Important Notes

1. **Brewing Stand Interface Required**: All `BrewingStandInventory` methods require that the brewing stand GUI interface is currently open.

2. **Fuel System**: Brewing requires blaze powder as fuel. Each blaze powder provides 20 fuel units, and each brewing operation consumes 1 unit.

3. **Brewing Time**: A complete brewing cycle takes 400 ticks (20 seconds). Multiple potions in the stand brew simultaneously.

4. **Recipe Validation**: Use `isValidRecipe()` before starting brewing operations to ensure the combination will work.

5. **Potion Types**: The system works with all vanilla potions including regular, splash, and lingering potions.

6. **Slot Indexing**: The brewing stand uses specific slot indices:
   - 0-2: Potion slots (left to right)
   - 3: Ingredient slot (top)
   - 4: Fuel slot (bottom left)

7. **Ingredient Validation**: Not all items are valid brewing ingredients. Always check with `isValidIngredient()` before use.

8. **Preview System**: Use `previewPotion()` and `previewPotions()` to see results before brewing starts.

9. **Inheritance**: All standard inventory operations are available through inheritance from the `Inventory` class.

10. **Batch Operations**: The brewing stand can brew up to 3 potions simultaneously with the same ingredient.

## Related Classes

- `Inventory` - Base class providing standard inventory operations
- `ItemStackHelper` - For working with potions and ingredients
- `PlayerInventory` - For accessing player's inventory to find materials
- `ContainerInventory` - Similar container inventory functionality
- `PotionContentsComponent` - Internal Minecraft potion data structure

## Version Information

- Available since JSMacros 1.8.4
- Compatible with Minecraft 1.20+ brewing system
- Supports all vanilla potion types and brewing ingredients
- Recipe validation follows Minecraft vanilla brewing mechanics