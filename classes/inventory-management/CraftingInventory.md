# CraftingInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.CraftingInventory`

**Extends:** `RecipeInventory<CraftingScreen>`

**Since:** `1.8.4`

The `CraftingInventory` class provides specialized access to Minecraft's crafting table interface, allowing scripts to interact with crafting operations, manage the 3×3 crafting grid, and work with recipes. This class extends the `RecipeInventory` class and adds crafting table-specific functionality for accessing input slots, managing recipes, and controlling the recipe book.

Crafting tables in Minecraft have the following main components:
- **3×3 Crafting Grid (Slots 1-9):** Input slots for crafting materials
- **Output Slot (Slot 0):** The resulting crafted item
- **Recipe Book:** Toggleable interface for browsing and selecting recipes

## Accessing CraftingInventory

You typically get `CraftingInventory` instances when the player has a crafting table screen open:

```javascript
// Check if current screen is a crafting table
const inv = Inventory.create();
if (inv && inv.getType() === "Crafting Table") {
    const crafting = inv; // Already typed as CraftingInventory
    Chat.log("Crafting table inventory detected!");
}
```

## Table of Contents

- [Methods](#methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

---

## Methods

### Crafting Grid Access
- [instance.getInput(x, y)](#instancegetinputx-y)
- [instance.getInput()](#instancegetinput-1)

---

## Method Details

### Crafting Grid Access

## Inherited Methods

From the `RecipeInventory` class, `CraftingInventory` inherits recipe management functionality:

### Recipe Management
- `getOutput()` - Get the crafted output item
- `getInputSize()` - Get total input slot count (always 9 for crafting tables)
- `getCraftingWidth()` - Get crafting grid width (always 3)
- `getCraftingHeight()` - Get crafting grid height (always 3)
- `getCraftingSlotCount()` - Get number of crafting slots
- `getCategory()` - Get recipe category ("CRAFTING")
- `getCraftableRecipes()` - Get list of currently craftable recipes
- `getRecipes(craftable)` - Get all or craftable recipes
- `isRecipeBookOpened()` - Check if recipe book is open
- `toggleRecipeBook()` - Toggle recipe book visibility
- `setRecipeBook(open)` - Set recipe book open/closed state

From the base `Inventory` class, `CraftingInventory` inherits all standard inventory management methods:

### Slot Management
- `getSlot(slot)` - Get item at specific slot index
- `getTotalSlots()` - Get total number of slots
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
- `getType()` - Get inventory type name

---

## Usage Examples

### Basic Crafting Grid Analysis

```javascript
function analyzeCraftingGrid() {
    const inv = Inventory.create();

    // Check if we have a crafting table open
    if (!inv || !inv.is("Crafting Table")) {
        Chat.log("Please open a crafting table first");
        return false;
    }

    Chat.log("=== Crafting Table Analysis ===");

    // Get grid dimensions
    Chat.log(`Crafting grid size: ${inv.getCraftingWidth()}x${inv.getCraftingHeight()}`);
    Chat.log(`Total crafting slots: ${inv.getCraftingSlotCount()}`);

    // Analyze current grid contents
    const grid = inv.getInput();
    let occupiedSlots = 0;
    let totalItems = 0;
    const itemDistribution = {};

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            const item = grid[x][y];
            if (!item.isEmpty()) {
                occupiedSlots++;
                totalItems += item.getCount();
                const itemId = item.getItemId();
                itemDistribution[itemId] = (itemDistribution[itemId] || 0) + item.getCount();
            }
        }
    }

    Chat.log(`Occupied slots: ${occupiedSlots}/9`);
    Chat.log(`Total items: ${totalItems}`);

    // Show item distribution
    if (Object.keys(itemDistribution).length > 0) {
        Chat.log("Item distribution:");
        for (const [itemId, count] of Object.entries(itemDistribution)) {
            Chat.log(`  - ${itemId}: ${count}`);
        }
    }

    // Check output
    const output = inv.getOutput();
    if (!output.isEmpty()) {
        Chat.log(`Output: ${output.getName().getString()} x${output.getCount()}`);
    } else {
        Chat.log("No valid output - no recipe matched");
    }

    return true;
}

// Example usage
analyzeCraftingGrid();
```

### Recipe Detection Assistant

```javascript
function detectCurrentRecipe() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Crafting Table")) {
        Chat.log("Please open a crafting table first");
        return;
    }

    const output = inv.getOutput();
    const grid = inv.getInput();

    Chat.log("=== Recipe Detection ===");

    if (!output.isEmpty()) {
        Chat.log(`&aRecipe detected!`);
        Chat.log(`Result: ${output.getName().getString()} x${output.getCount()}`);

        // Analyze recipe shape
        const recipePattern = [];
        for (let y = 0; y < 3; y++) {
            let row = "";
            for (let x = 0; x < 3; x++) {
                const item = grid[x][y];
                if (!item.isEmpty()) {
                    // Use first letter of item name for pattern
                    const name = item.getName().getString();
                    row += name.charAt(0).toUpperCase();
                } else {
                    row += "_";
                }
            }
            recipePattern.push(row);
        }

        Chat.log("Recipe pattern:");
        recipePattern.forEach(row => Chat.log(`  ${row}`));

        // Count unique materials
        const materials = new Set();
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const item = grid[x][y];
                if (!item.isEmpty()) {
                    materials.add(item.getItemId());
                }
            }
        }

        Chat.log(`Unique materials: ${materials.size}`);

        // List materials with counts
        const materialCounts = {};
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const item = grid[x][y];
                if (!item.isEmpty()) {
                    const id = item.getItemId();
                    materialCounts[id] = (materialCounts[id] || 0) + item.getCount();
                }
            }
        }

        Chat.log("Materials needed:");
        for (const [id, count] of Object.entries(materialCounts)) {
            Chat.log(`  - ${id}: ${count}`);
        }

    } else {
        Chat.log("&cNo recipe detected with current materials");

        // Suggest what might be missing
        const occupiedSlots = [];
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (!grid[x][y].isEmpty()) {
                    occupiedSlots.push([x, y]);
                }
            }
        }

        if (occupiedSlots.length === 0) {
            Chat.log("Hint: Try placing some materials in the crafting grid");
        } else if (occupiedSlots.length < 2) {
            Chat.log("Hint: Most recipes require at least 2 materials");
        } else {
            Chat.log("Hint: Try rearranging materials or adding different ones");
        }
    }
}

// Example usage
detectCurrentRecipe();
```

### Auto-Crafting Assistant

```javascript
function autoCraft(targetItemId, quantity = 1) {
    const inv = Inventory.create();

    if (!inv || !inv.is("Crafting Table")) {
        Chat.log("Please open a crafting table first");
        return false;
    }

    Chat.log(`=== Auto-Crafting ${targetItemId} ===`);

    // Get available recipes
    try {
        const recipes = inv.getCraftableRecipes();
        if (!recipes || recipes.length === 0) {
            Chat.log("No craftable recipes available");
            return false;
        }

        // Find matching recipe
        let targetRecipe = null;
        for (const recipe of recipes) {
            const output = recipe.getOutput();
            if (output.getItemId() === targetItemId) {
                targetRecipe = recipe;
                break;
            }
        }

        if (!targetRecipe) {
            Chat.log(`Recipe for ${targetItemId} not found or not craftable`);
            return false;
        }

        const output = targetRecipe.getOutput();
        const craftablePerBatch = output.getCount();
        const batchesNeeded = Math.ceil(quantity / craftablePerBatch);

        Chat.log(`Recipe found: ${output.getName().getString()} x${craftablePerBatch}`);
        Chat.log(`Batches needed: ${batchesNeeded}`);

        // Check if we have enough materials for one batch
        const materials = targetRecipe.getIngredients();
        let canCraft = true;

        Chat.log("Materials required per batch:");
        for (const material of materials) {
            const materialId = material.getItemId();
            const requiredCount = material.getCount();
            const availableCount = inv.getItemCount().get(materialId) || 0;

            Chat.log(`  - ${materialId}: ${requiredCount} (have: ${availableCount})`);

            if (availableCount < requiredCount) {
                canCraft = false;
            }
        }

        if (!canCraft) {
            Chat.log("&cInsufficient materials for crafting");
            return false;
        }

        // Auto-craft one batch
        Chat.log("Starting auto-craft...");

        // Clear crafting grid first
        for (let i = 1; i <= 9; i++) {
            const slot = inv.getSlot(i);
            if (!slot.isEmpty()) {
                inv.click(i); // Pick up item
                const freeSlot = inv.findFreeInventorySlot();
                if (freeSlot !== -1) {
                    inv.click(freeSlot); // Place in inventory
                } else {
                    inv.click(i); // Put back if no space
                }
            }
        }

        // Place materials (this would need more complex logic for proper recipe setup)
        // For now, just indicate that materials are available
        Chat.log("&aMaterials available! Please place them in the correct pattern.");

        return true;

    } catch (e) {
        Chat.log(`Error getting recipes: ${e.message}`);
        return false;
    }
}

// Example usage
autoCraft("minecraft:oak_planks", 64);
```

### Crafting Calculator

```javascript
function calculateCraftingNeeds(itemId, quantity) {
    Chat.log(`=== Crafting Calculator: ${itemId} x${quantity} ===`);

    // This would typically use a recipe database, but for now we'll show the concept
    const commonRecipes = {
        "minecraft:oak_planks": { input: "minecraft:oak_log", ratio: 4 },
        "minecraft:stick": { input: "minecraft:oak_planks", ratio: 2 },
        "minecraft:crafting_table": { input: "minecraft:oak_planks", ratio: 4 },
        "minecraft:torch": { inputs: ["minecraft:coal", "minecraft:stick"], counts: [1, 1] },
        "minecraft:chest": { input: "minecraft:oak_planks", ratio: 8 }
    };

    const recipe = commonRecipes[itemId];
    if (!recipe) {
        Chat.log(`Recipe for ${itemId} not found in database`);
        return;
    }

    if (recipe.inputs) {
        // Multi-ingredient recipe
        const batchesNeeded = Math.ceil(quantity);
        Chat.log("Materials needed:");
        for (let i = 0; i < recipe.inputs.length; i++) {
            const totalNeeded = recipe.counts[i] * batchesNeeded;
            Chat.log(`  - ${recipe.inputs[i]}: ${totalNeeded}`);
        }
    } else {
        // Single ingredient recipe
        const itemsPerBatch = recipe.ratio;
        const batchesNeeded = Math.ceil(quantity / itemsPerBatch);
        const totalNeeded = batchesNeeded;

        Chat.log(`Each batch produces: ${itemsPerBlock} ${itemId}`);
        Chat.log(`Batches needed: ${batchesNeeded}`);
        Chat.log(`Total ${recipe.input} needed: ${totalNeeded}`);

        // Check inventory
        const inv = Inventory.create();
        if (inv) {
            const available = inv.getItemCount().get(recipe.input) || 0;
            Chat.log(`${recipe.input} available: ${available}`);

            if (available >= totalNeeded) {
                Chat.log("&aSufficient materials available!");
            } else {
                Chat.log(`&cNeed ${totalNeeded - available} more ${recipe.input}`);
            }
        }
    }
}

// Example usage
calculateCraftingNeeds("minecraft:oak_planks", 64);
```

### Recipe Book Manager

```javascript
function manageRecipeBook() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Crafting Table")) {
        Chat.log("Please open a crafting table first");
        return;
    }

    Chat.log("=== Recipe Book Manager ===");

    // Check recipe book state
    const isOpen = inv.isRecipeBookOpened();
    Chat.log(`Recipe book is currently ${isOpen ? "open" : "closed"}`);

    // Toggle recipe book
    if (isOpen) {
        inv.setRecipeBook(false);
        Chat.log("Closing recipe book...");
    } else {
        inv.setRecipeBook(true);
        Chat.log("Opening recipe book...");
    }

    // Get available recipes
    try {
        const craftableRecipes = inv.getCraftableRecipes();
        if (craftableRecipes) {
            Chat.log(`Found ${craftableRecipes.length} craftable recipes:`);

            // Show first 10 recipes
            const displayCount = Math.min(10, craftableRecipes.length);
            for (let i = 0; i < displayCount; i++) {
                const recipe = craftableRecipes[i];
                const output = recipe.getOutput();
                Chat.log(`  ${i + 1}. ${output.getName().getString()} x${output.getCount()}`);
            }

            if (craftableRecipes.length > displayCount) {
                Chat.log(`  ... and ${craftableRecipes.length - displayCount} more`);
            }
        }
    } catch (e) {
        Chat.log(`Error getting recipes: ${e.message}`);
    }

    // Get all recipes (including non-craftable)
    try {
        const allRecipes = inv.getRecipes(false);
        if (allRecipes) {
            Chat.log(`Total recipes available: ${allRecipes.length}`);
        }
    } catch (e) {
        Chat.log(`Error getting all recipes: ${e.message}`);
    }
}

// Example usage
manageRecipeBook();
```

### Crafting Grid Monitor

```javascript
function monitorCraftingGrid() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Crafting Table")) {
        Chat.log("Please open a crafting table first");
        return;
    }

    let lastOutput = null;
    let lastGridHash = null;

    function updateDisplay() {
        const output = inv.getOutput();
        const grid = inv.getInput();

        // Calculate grid hash for change detection
        let gridHash = "";
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const item = grid[x][y];
                gridHash += `${item.getItemId()}:${item.getCount()};`;
            }
        }

        let status = "&fCrafting: ";

        // Check if output changed
        if (lastOutput && (!output.isEmpty() !== !lastOutput.isEmpty() ||
            (!output.isEmpty() && !output.equals(lastOutput)))) {
            if (!output.isEmpty()) {
                status += "&aNew recipe: " + output.getName().getString();
                Chat.log(`&aNew recipe available: ${output.getName().getString()} x${output.getCount()}`);
            }
        } else if (gridHash !== lastGridHash) {
            // Grid changed but no new output
            if (!output.isEmpty()) {
                status += "&eRecipe updated: " + output.getName().getString();
            } else {
                status += "&7Arranging materials...";
            }
        } else if (!output.isEmpty()) {
            status += "&aReady: " + output.getName().getString();
        } else {
            status += "&7Empty";
        }

        Chat.actionbar(status);

        lastOutput = output.isEmpty() ? null : output.copy();
        lastGridHash = gridHash;
    }

    // Monitor every 10 ticks while crafting table is open
    let tickCount = 0;
    const monitor = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentInv = Inventory.create();
        if (!currentInv || !currentInv.is("Crafting Table")) {
            JsMacros.off(monitor);
            Chat.actionbar("&7Crafting table closed");
            return;
        }

        if (tickCount % 10 === 0) { // Update every 10 ticks (0.5 seconds)
            updateDisplay();
        }
        tickCount++;
    }));

    Chat.log("Started crafting grid monitor");
}

// Example usage - call when crafting table is opened
monitorCraftingGrid();
```

### Material Efficiency Analyzer

```javascript
function analyzeMaterialEfficiency() {
    const inv = Inventory.create();

    if (!inv || !inv.is("Crafting Table")) {
        Chat.log("Please open a crafting table first");
        return;
    }

    const output = inv.getOutput();
    const grid = inv.getInput();

    Chat.log("=== Material Efficiency Analysis ===");

    if (output.isEmpty()) {
        Chat.log("No recipe to analyze");
        return;
    }

    // Count total input materials
    let totalInputValue = 0;
    const materialCounts = {};

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            const item = grid[x][y];
            if (!item.isEmpty()) {
                const id = item.getItemId();
                const count = item.getCount();
                materialCounts[id] = (materialCounts[id] || 0) + count;

                // Simple value assignment (could be enhanced with actual item values)
                totalInputValue += count;
            }
        }
    }

    const totalOutputValue = output.getCount();

    Chat.log(`Input materials: ${Object.keys(materialCounts).length} types`);
    Chat.log(`Total input items: ${totalInputValue}`);
    Chat.log(`Total output items: ${totalOutputValue}`);

    if (totalInputValue > 0) {
        const efficiency = (totalOutputValue / totalInputValue) * 100;
        Chat.log(`Material efficiency: ${efficiency.toFixed(1)}%`);

        if (efficiency > 100) {
            Chat.log("&aThis recipe multiplies materials (shapeless recipe)");
        } else if (efficiency === 100) {
            Chat.log("&eThis recipe preserves all materials");
        } else {
            Chat.log("&cThis recipe loses some materials (normal for most recipes)");
        }
    }

    // Show material breakdown
    Chat.log("Material breakdown:");
    for (const [id, count] of Object.entries(materialCounts)) {
        const percentage = (count / totalInputValue) * 100;
        Chat.log(`  - ${id}: ${count} (${percentage.toFixed(1)}%)`);
    }
}

// Example usage
analyzeMaterialEfficiency();
```

---

## Version Information

- Available since JSMacros 1.8.4
- Extends `RecipeInventory<CraftingScreen>`
- Built on Minecraft's CraftingScreen and CraftingScreenHandler

## Related Classes

- `Inventory` - Base class providing general inventory functionality
- `RecipeInventory` - Parent class providing recipe management
- `ItemStackHelper` - Represents items in crafting slots
- `RecipeHelper` - Represents craftable recipes
- `PlayerInventory` - Player's main inventory interface

## Notes and Limitations

- The crafting table interface must be open to use `CraftingInventory` methods
- Crafting recipes follow Minecraft's standard 3×3 grid patterns
- Some recipes may require specific arrangements of materials
- Recipe book functionality requires server support for recipe system
- Grid coordinates are 0-indexed: (0,0) is top-left, (2,2) is bottom-right
- The output slot is separate from the 3×3 crafting grid
- Recipe detection and auto-crafting require access to the recipe system
- Material efficiency calculations are estimates and may not reflect all gameplay mechanics