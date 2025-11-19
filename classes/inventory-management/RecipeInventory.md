# RecipeInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.RecipeInventory`

**Extends:** `Inventory<T extends HandledScreen<? extends AbstractRecipeScreenHandler<?, ?>>>`

**Since:** JsMacros 1.8.4

The `RecipeInventory` class is an abstract base class for inventory management screens that support crafting, such as crafting tables, furnaces, and the player inventory crafting grid. It provides access to crafting-related functionality including recipe book management, recipe discovery, and crafting grid interaction. This class extends the base `Inventory` class with specialized methods for recipe-based crafting interfaces.

## Overview

The `RecipeInventory` class provides comprehensive access to crafting inventory features:

- Access to crafting grid dimensions and slot contents
- Recipe book integration and management
- Recipe discovery and filtering capabilities
- Input/output slot interaction
- Support for both craftable and all available recipes
- Integration with crafting tables, furnaces, and player inventory

## Inheritance

This class is abstract and serves as a base for specific recipe inventory implementations:
- `CraftingInventory` - For crafting table screens
- `FurnaceInventory` - For furnace and smelter screens
- `PlayerInventory` - For player inventory crafting grid

## Methods

## Usage Examples

### Basic Crafting Grid Analysis
```javascript
// Analyze the current crafting grid
const crafting = Client.getCurrentScreen();
if (crafting instanceof RecipeInventory) {
    const width = crafting.getCraftingWidth();
    const height = crafting.getCraftingHeight();

    Chat.log(`Crafting grid: ${width}x${height}`);

    // Check all slots
    const grid = crafting.getInput();
    for (let x = 0; x < width; x++) {
        let rowText = "";
        for (let z = 0; z < height; z++) {
            const item = grid[x][z];
            rowText += item && !item.isEmpty() ? "[X]" : "[ ]";
        }
        Chat.log(rowText);
    }

    // Check output
    const output = crafting.getOutput();
    if (output && !output.isEmpty()) {
        Chat.log(`Output: ${output.getCount()}x ${output.getName()}`);
    }
}
```

### Recipe Discovery System
```javascript
// Find all craftable recipes and display materials needed
const crafting = Client.getCurrentScreen();
if (crafting instanceof RecipeInventory) {
    try {
        const craftable = crafting.getRecipes(true);
        if (!craftable) {
            Chat.log("Recipe book not available");
            return;
        }

        Chat.log(`=== Craftable Recipes (${craftable.size()}) ===`);

        craftable.forEach(recipe => {
            Chat.log(`\nRecipe: ${recipe.getId()}`);
            const ingredients = recipe.getIngredients();

            ingredients.forEach((ingredientOptions, index) => {
                const firstOption = ingredientOptions[0];
                if (firstOption && !firstOption.isEmpty()) {
                    Chat.log(`  Slot ${index}: ${firstOption.getName()}`);
                }
            });
        });
    } catch (e) {
        Chat.log(`Error analyzing recipes: ${e.message}`);
    }
}
```

### Automated Recipe Book Management
```javascript
// Smart recipe book controller
const crafting = Client.getCurrentScreen();
if (crafting instanceof RecipeInventory) {
    // Auto-open recipe book when no output is available
    const output = crafting.getOutput();
    if (!output || output.isEmpty()) {
        Chat.log("No crafting output - opening recipe book...");
        crafting.setRecipeBook(true);

        // Show craftable recipes
        try {
            const craftable = crafting.getRecipes(true);
            if (craftable && craftable.length > 0) {
                Chat.log(`Found ${craftable.length} recipes you can make:`);
                craftable.slice(0, 5).forEach(recipe => {
                    Chat.log(`  • ${recipe.getId().split(":")[1]}`);
                });
                if (craftable.length > 5) {
                    Chat.log(`  ... and ${craftable.length - 5} more`);
                }
            }
        } catch (e) {
            Chat.log(`Could not load recipes: ${e.message}`);
        }
    } else {
        // Close recipe book when crafting is active
        crafting.setRecipeBook(false);
    }
}
```

### Crafting Assistant
```javascript
// Advanced crafting helper with material checking
const crafting = Client.getCurrentScreen();
if (crafting instanceof RecipeInventory) {
    Chat.log("=== Crafting Assistant ===");

    // Analyze current grid setup
    const grid = crafting.getInput();
    const materials = new Map();

    // Count materials in crafting grid
    for (let x = 0; x < grid.length; x++) {
        for (let z = 0; z < grid[x].length; z++) {
            const item = grid[x][z];
            if (item && !item.isEmpty()) {
                const name = item.getName();
                materials.set(name, (materials.get(name) || 0) + item.getCount());
            }
        }
    }

    Chat.log("Materials in crafting grid:");
    materials.forEach((count, name) => {
        Chat.log(`  ${count}x ${name}`);
    });

    // Check output
    const output = crafting.getOutput();
    if (output && !output.isEmpty()) {
        Chat.log(`\nOutput: ${output.getCount()}x ${output.getName()}`);
    } else {
        Chat.log("\nNo valid output - check recipe arrangement");

        // Suggest possible recipes
        try {
            const craftable = crafting.getRecipes(true);
            if (craftable && craftable.length > 0) {
                Chat.log("\nSuggested recipes:");
                craftable.slice(0, 3).forEach(recipe => {
                    Chat.log(`  • ${recipe.getId().split(":")[1]}`);
                });
            }
        } catch (e) {
            Chat.log("Could not load recipe suggestions");
        }
    }
}
```

### Multi-Type Inventory Detection
```javascript
// Handle different types of recipe inventories
const screen = Client.getCurrentScreen();

if (screen instanceof CraftingInventory) {
    Chat.log("=== Crafting Table ===");
    const crafting = screen;

    // Show all possible crafting recipes
    try {
        const allRecipes = crafting.getRecipes(false);
        if (allRecipes) {
            Chat.log(`Total crafting recipes: ${allRecipes.size()}`);

            const craftable = crafting.getRecipes(true);
            Chat.log(`Currently craftable: ${craftable ? craftable.size() : 0}`);
        }
    } catch (e) {
        Chat.log(`Error loading crafting recipes: ${e.message}`);
    }

} else if (screen instanceof FurnaceInventory) {
    Chat.log("=== Furnace/Smelter ===");
    const furnace = screen;

    const category = furnace.getCategory();
    Chat.log(`Recipe category: ${category}`);

    // Check furnace-specific info
    const input = furnace.getInput(0, 0);
    const output = furnace.getOutput();

    if (input && !input.isEmpty()) {
        Chat.log(`Smelting: ${input.getCount()}x ${input.getName()}`);
    }

    if (output && !output.isEmpty()) {
        Chat.log(`Result: ${output.getCount()}x ${output.getName()}`);
    }

} else if (screen instanceof PlayerInventory) {
    Chat.log("=== Player Inventory Crafting ===");
    const playerInv = screen;

    // Show 2x2 crafting grid info
    const gridSize = playerInv.getInputSize();
    Chat.log(`Personal crafting grid: ${gridSize} slots`);

    // Check for simple crafts
    const output = playerInv.getOutput();
    if (output && !output.isEmpty()) {
        Chat.log(`Can craft: ${output.getCount()}x ${output.getName()}`);
    }
}
```

## Important Notes

### Recipe Book Integration
- Recipe book functionality requires the screen to support recipe book widgets
- Not all recipe inventories may have recipe book support
- Recipe discovery may require the recipe book to be initialized and refreshed

### Thread Safety
- Recipe discovery methods may require thread synchronization
- These methods can throw `InterruptedException` if interrupted
- Recipe list refreshing happens on the main thread when needed

### Inventory Types
- This is an abstract class - you'll work with concrete implementations
- Different inventory types have different crafting grid sizes and capabilities
- Some methods may behave differently based on the specific inventory type

### Performance Considerations
- Recipe discovery can be computationally intensive
- Consider caching recipe lists when using them frequently
- Large recipe collections may take time to process

## Related Classes

- `Inventory` - Base inventory class with general inventory methods
- `CraftingInventory` - Concrete implementation for crafting tables
- `FurnaceInventory` - Concrete implementation for furnaces and smelters
- `PlayerInventory` - Concrete implementation for player inventory crafting
- `RecipeHelper` - Helper class for recipe information and ingredients
- `ItemStackHelper` - Helper class for item stack operations

## Version History

- **1.8.4:** Initial release with basic recipe inventory functionality
- **Current:** Enhanced recipe book integration and comprehensive crafting grid access