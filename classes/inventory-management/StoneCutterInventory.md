# StoneCutterInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.StoneCutterInventory`

**Extends:** `Inventory<StonecutterScreen>`

**Since:** `1.8.4`

The `StoneCutterInventory` class provides specialized access to Minecraft's stonecutter interface, allowing scripts to interact with stonecutter operations such as selecting crafting recipes and managing stone-based crafting recipes. This class extends the base `Inventory` class and adds stonecutter-specific functionality for managing available recipes, selecting specific recipes, and accessing recipe outputs.

Stonecutters in Minecraft have two main slots:
- **Input (Slot 0):** The stone-type block to be crafted (e.g., stone, cobblestone, etc.)
- **Output (Slot 1):** The resulting stone block variant based on the selected recipe

The stonecutter interface allows players to craft various stone variants from a single stone input block, making it highly efficient for building projects.

## Accessing StoneCutterInventory

You typically get `StoneCutterInventory` instances when the player has a stonecutter screen open:

```javascript
// Check if current screen is a stonecutter
const inv = Inventory.create();
if (inv && inv.getType() === "Stonecutter") {
    const stonecutter = inv; // Already typed as StoneCutterInventory
    Chat.log("Stonecutter inventory detected!");
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Recipe Selection
- [instance.getSelectedRecipeIndex()](#instancegetselectedrecipeindex)
- [instance.selectRecipe()](#instanceselectrecipe)

### Recipe Information
- [instance.getAvailableRecipeCount()](#instancegetavailablerecipecount)
- [instance.getRecipes()](#instancegetrecipes)

### Output and Status
- [instance.getOutput()](#instancegetoutput)
- [instance.canCraft()](#instancecancraft)

---

## Method Details

### Recipe Selection

### Recipe Information

### Output and Status

## Inherited Methods

From the base `Inventory` class, `StoneCutterInventory` inherits all standard inventory management methods:

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

### Basic Stonecutter Operations

```javascript
function craftStoneVariant(recipeIndex) {
    const inv = Inventory.create();

    // Check if we have a stonecutter open
    if (!inv || !inv.is("Stonecutter")) {
        Chat.log("Please open a stonecutter first");
        return false;
    }

    const input = inv.getSlot(0);
    if (input.isEmpty()) {
        Chat.log("Please place a stone-type block in the input slot");
        return false;
    }

    const recipeCount = inv.getAvailableRecipeCount();
    if (recipeIndex >= recipeCount) {
        Chat.log(`Invalid recipe index. Available: 0-${recipeCount - 1}`);
        return false;
    }

    // Select the desired recipe
    inv.selectRecipe(recipeIndex);
    const output = inv.getOutput();

    Chat.log(`Selected recipe: ${output.getName().getString()}`);

    // Check if we can craft
    if (!inv.canCraft()) {
        Chat.log("Recipe cannot be crafted");
        return false;
    }

    // Craft the item
    inv.quick(1);
    Chat.log(`Successfully crafted ${output.getName().getString()}`);
    return true;
}

// Example usage - craft stone bricks (recipe index 0 for stone)
craftStoneVariant(0);
```

### Stonecutter Recipe Browser

```javascript
function browseStonecutterRecipes() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Stonecutter")) {
        Chat.log("Please open a stonecutter first");
        return;
    }

    const input = inv.getSlot(0);
    if (input.isEmpty()) {
        Chat.log("Please place a stone-type block in the input slot");
        return;
    }

    const recipes = inv.getRecipes();
    const currentSelection = inv.getSelectedRecipeIndex();

    Chat.log("=== Stonecutter Recipe Browser ===");
    Chat.log(`Input: ${input.getName().getString()}`);
    Chat.log(`Available recipes: ${recipes.length}`);
    Chat.log("");

    // Display all recipes with selection indicator
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const isSelected = i === currentSelection;
        const indicator = isSelected ? "▶ " : "  ";

        Chat.log(`${indicator}${i + 1}. ${recipe.getName().getString()}`);

        if (isSelected) {
            const canCraft = inv.canCraft();
            const status = canCraft ? "✓ Ready to craft" : "✗ Cannot craft";
            Chat.log(`   Status: ${status}`);
        }
    }

    // Show crafting tips
    Chat.log("");
    Chat.log("Tips:");
    Chat.log("- Use selectRecipe(index) to choose a recipe");
    Chat.log("- Use quick(1) to craft the selected item");
}
```

### Auto Stonecutter Manager

```javascript
function autoStonecutterManager(targetItem, quantity) {
    const inv = Inventory.create();

    if (!inv || !inv.is("Stonecutter")) {
        Chat.log("Please open a stonecutter first");
        return;
    }

    const input = inv.getSlot(0);
    if (input.isEmpty()) {
        Chat.log("Please place a stone-type block in the input slot");
        return;
    }

    const recipes = inv.getRecipes();

    // Find the target recipe
    let targetRecipeIndex = -1;
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].getItemId().includes(targetItem)) {
            targetRecipeIndex = i;
            break;
        }
    }

    if (targetRecipeIndex === -1) {
        Chat.log(`Recipe for ${targetItem} not found`);
        return;
    }

    const targetRecipe = recipes[targetRecipeIndex];
    Chat.log(`Found recipe for ${targetRecipe.getName().getString()} at index ${targetRecipeIndex}`);

    // Select the target recipe
    inv.selectRecipe(targetRecipeIndex);

    // Craft the specified quantity
    let crafted = 0;
    const craftingInterval = setInterval(() => {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Stonecutter")) {
            clearInterval(craftingInterval);
            Chat.log("Stonecutter closed - stopped crafting");
            return;
        }

        if (currentInv.canCraft()) {
            currentInv.quick(1);
            crafted++;

            if (crafted % 10 === 0) {
                Chat.actionbar(`Crafted ${crafted}/${quantity} ${targetRecipe.getName().getString()}`);
            }

            if (crafted >= quantity) {
                clearInterval(craftingInterval);
                Chat.log(`Completed crafting ${crafted} ${targetRecipe.getName().getString()}`);
            }
        } else {
            clearInterval(craftingInterval);
            Chat.log(`Cannot craft more - stopped at ${crafted} items`);
        }
    }, 200); // Craft every 200ms
}

// Example usage - craft 64 stone bricks
autoStonecutterManager("stone_bricks", 64);
```

### Stonecutter Recipe Calculator

```javascript
function calculateStonecutterYield() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Stonecutter")) {
        Chat.log("Please open a stonecutter first");
        return;
    }

    const input = inv.getSlot(0);
    if (input.isEmpty()) {
        Chat.log("Please place a stone-type block in the input slot");
        return;
    }

    const recipes = inv.getRecipes();
    const inputCount = input.getCount();
    const inputItemId = input.getItemId();

    Chat.log("=== Stonecutter Yield Calculator ===");
    Chat.log(`Input: ${input.getName().getString()} x${inputCount}`);
    Chat.log("");

    // Calculate yields for each recipe
    const yields = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeName = recipe.getName().getString();
        const outputCount = recipe.getCount();

        // Most stonecutter recipes give 1 or 2 output per input
        const totalOutput = inputCount * outputCount;

        yields.push({
            index: i,
            name: recipeName,
            outputPerInput: outputCount,
            totalOutput: totalOutput,
            efficiency: outputCount > 1 ? "High" : "Standard"
        });
    }

    // Sort by efficiency (recipes that give more output first)
    yields.sort((a, b) => b.outputPerInput - a.outputPerInput);

    // Display results
    Chat.log("Recipe Yields:");
    for (const yield of yields) {
        const efficiency = yield.efficiency === "High" ? "⭐" : "  ";
        Chat.log(`${efficiency} ${yield.index + 1}. ${yield.name}: ${yield.totalOutput} total (${yield.outputPerInput} per input)`);
    }

    // Recommend most efficient recipe
    const mostEfficient = yields[0];
    if (mostEfficient.outputPerInput > 1) {
        Chat.log("");
        Chat.log(`Most efficient: ${mostEfficient.name} (${mostEfficient.totalOutput} total)`);
        Chat.log(`Recommend recipe index: ${mostEfficient.index}`);
    }
}
```

### Stonecutter Material Analyzer

```javascript
function analyzeStonecutterMaterial() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Stonecutter")) {
        Chat.log("Please open a stonecutter first");
        return;
    }

    const input = inv.getSlot(0);
    if (input.isEmpty()) {
        Chat.log("Please place a stone-type block in the input slot");
        return;
    }

    const recipes = inv.getRecipes();
    const inputItem = input.getItemId();

    Chat.log("=== Stonecutter Material Analysis ===");
    Chat.log(`Material: ${input.getName().getString()}`);
    Chat.log(`Recipe count: ${recipes.length}`);
    Chat.log("");

    // Categorize recipes by type
    const categories = {
        slabs: [],
        stairs: [],
        walls: [],
        blocks: [],
        other: []
    };

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeId = recipe.getItemId();
        const recipeName = recipe.getName().getString();

        const recipeInfo = {
            index: i,
            name: recipeName,
            id: recipeId,
            count: recipe.getCount()
        };

        if (recipeId.includes("_slab")) {
            categories.slabs.push(recipeInfo);
        } else if (recipeId.includes("_stairs")) {
            categories.stairs.push(recipeInfo);
        } else if (recipeId.includes("_wall")) {
            categories.walls.push(recipeInfo);
        } else if (recipeId.includes("_block") || recipeId.endsWith("stone") || recipeId.endsWith("cobblestone")) {
            categories.blocks.push(recipeInfo);
        } else {
            categories.other.push(recipeInfo);
        }
    }

    // Display categorized results
    function displayCategory(categoryName, recipes) {
        if (recipes.length > 0) {
            Chat.log(`${categoryName} (${recipes.length}):`);
            for (const recipe of recipes) {
                const yieldInfo = recipe.count > 1 ? ` (${recipe.count}x)` : "";
                Chat.log(`  ${recipe.index + 1}. ${recipe.name}${yieldInfo}`);
            }
            Chat.log("");
        }
    }

    displayCategory("🧱 Blocks", categories.blocks);
    displayCategory("🪜 Stairs", categories.stairs);
    displayCategory("🧱 Slabs", categories.slabs);
    displayCategory("🧱 Walls", categories.walls);
    displayCategory("🔧 Other", categories.other);

    // Material insights
    Chat.log("Material Insights:");

    if (categories.slabs.length > 0) {
        Chat.log(`✓ Can craft ${categories.slabs.length} different slab types`);
    }

    if (categories.stairs.length > 0) {
        Chat.log(`✓ Can craft ${categories.stairs.length} different stair types`);
    }

    const doubleSlabEfficiency = categories.slabs.filter(r => r.count > 1).length;
    if (doubleSlabEfficiency > 0) {
        Chat.log(`✓ ${doubleSlabEfficiency} recipes give 2x output (most efficient)`);
    }

    // Building recommendations
    Chat.log("");
    Chat.log("Building Recommendations:");
    if (categories.slabs.length > 2) {
        Chat.log("- Excellent for roofing and flooring (many slab options)");
    }
    if (categories.stairs.length > 1) {
        Chat.log("- Good for multi-level structures");
    }
    if (categories.walls.length > 0) {
        Chat.log("- Suitable for decorative walls and barriers");
    }
}

// Example usage
analyzeStonecutterMaterial();
```

### Stonecutter Inventory Monitor

```javascript
function monitorStonecutter() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Stonecutter")) {
        return;
    }

    function updateDisplay() {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Stonecutter")) {
            return; // Stonecutter was closed
        }

        const input = currentInv.getSlot(0);
        const output = currentInv.getOutput();
        const canCraft = currentInv.canCraft();
        const recipeCount = currentInv.getAvailableRecipeCount();
        const selectedIndex = currentInv.getSelectedRecipeIndex();

        let status = "&fStonecutter: ";

        if (input.isEmpty()) {
            status += "&7Empty (place stone material)";
        } else if (recipeCount === 0) {
            status += "&cInvalid material";
        } else if (!canCraft) {
            status += "&eSelect a recipe";
        } else {
            status += "&aReady to craft ";
            status += "&f" + output.getName().getString();
            status += " &8(" + (selectedIndex + 1) + "/" + recipeCount + ")";
        }

        Chat.actionbar(status);
    }

    // Update display every 5 ticks while stonecutter is open
    let tickCount = 0;
    const monitor = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Stonecutter")) {
            JsMacros.off(monitor);
            Chat.actionbar("&7Stonecutter closed");
            return;
        }

        if (tickCount % 5 === 0) { // Update every 5 ticks (0.25 seconds)
            updateDisplay();
        }
        tickCount++;
    }));
}

// Example usage - call when stonecutter is opened
monitorStonecutter();
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends `Inventory<StonecutterScreen>`
- Built on Minecraft's StonecutterScreen and StonecutterScreenHandler

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `ItemStackHelper` - Represents items in stonecutter slots
- `PlayerInventory` - Player's main inventory interface
- `ContainerInventory` - Generic container inventory functionality

## Notes and Limitations

- Stonecutter recipes depend on the input material type
- Stone blocks can be crafted into various decorative variants
- Some recipes (like slabs) may yield 2 blocks per input for maximum efficiency
- The stonecutter interface must be open to use `StoneCutterInventory` methods
- Recipe availability depends on the specific stone type placed in the input slot
- All stonecutter recipes preserve the material type (e.g., stone → stone bricks, andesite → andesite stairs)
- The stonecutter is more resource-efficient than crafting tables for many decorative blocks
- Each input block can typically produce one or two output blocks depending on the recipe