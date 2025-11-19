# RecipeHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.inventory`
**Category:** Items and Enchantments
**Since:** JsMacros 1.3.1

The `RecipeHelper` class provides a powerful interface for interacting with Minecraft crafting recipes in JSMacros scripts. It allows you to examine recipe details, check craftability, get ingredients and outputs, and even automate the crafting process.

## Overview

RecipeHelper wraps around Minecraft's internal `RecipeEntry` system and exposes recipe information in a script-friendly format. This class is essential for any scripts that need to work with crafting, recipe management, or automated crafting systems.

## Obtaining RecipeHelper Instances

RecipeHelper instances are typically obtained through RecipeInventory or can be created from RecipeEntry objects:

```javascript
// From RecipeInventory
const recipeInventory = RecipeInventory.getOpen();
const craftableRecipes = recipeInventory.getCraftableRecipes();
const allRecipes = recipeInventory.getRecipes(false);

// Each recipe in these lists is a RecipeHelper instance
for (const recipe of craftableRecipes) {
    console.log("Recipe ID:", recipe.getId());
    console.log("Can craft:", recipe.canCraft());
}
```

## Methods

### getId()

**Since:** 1.3.1
**Returns:** `String` - The unique identifier for this recipe

Gets the recipe's unique identifier in the format `namespace:path`.

```javascript
const recipeId = recipe.getId();
console.log("Recipe ID:", recipeId); // e.g., "minecraft:stick"
```

### getIngredients()

**Since:** 1.8.3
**Returns:** `List<List<ItemStackHelper>>` - A list of ingredient slots, each containing possible items

Returns the ingredients required for this recipe. Each ingredient slot contains a list of possible items that can be used for that slot (accounting for tags and alternative items).

```javascript
const ingredients = recipe.getIngredients();
for (let i = 0; i < ingredients.length; i++) {
    const slot = ingredients[i];
    console.log(`Slot ${i} accepts:`, slot.map(item => item.getName()));
}
```

### getOutput()

**Since:** 1.3.1
**Returns:** `ItemStackHelper` - The result item stack of this recipe

Gets the output item that will be produced when crafting this recipe.

```javascript
const output = recipe.getOutput();
console.log("Produces:", output.getName());
console.log("Quantity:", output.getCount());
```

### craft(craftAll)

**Since:** 1.3.1
**Parameters:**
- `craftAll` (boolean): If `true`, crafts as many items as possible. If `false`, crafts one set.

**Returns:** `RecipeHelper` - Returns this instance for method chaining

Executes the crafting recipe. This method requires that the appropriate crafting screen is still open.

```javascript
// Craft one set
recipe.craft(false);

// Craft as many as possible
recipe.craft(true);

// Chain multiple operations
recipe.craft(false).craft(true);
```

**Note:** This will throw an error if the crafting screen is no longer open or if the player doesn't have the required materials.

### getGroup()

**Since:** 1.8.4
**Returns:** `String` - The recipe group identifier

Gets the group this recipe belongs to. Groups are used to organize similar recipes in the recipe book.

```javascript
const group = recipe.getGroup();
if (group) {
    console.log("Recipe group:", group);
}
```

### hasRecipeRemainders()

**Since:** 1.8.4
**Returns:** `boolean` - `true` if any ingredient has a recipe remainder

Checks if any ingredient in this recipe has a remainder item (like buckets retaining their empty form after crafting).

```javascript
if (recipe.hasRecipeRemainders()) {
    console.log("This recipe has remainder items");
}
```

**Note:** This only checks the default recipe, not actual items used in crafting.

### getRecipeRemainders()

**Since:** 1.8.4
**Returns:** `List<List<ItemStackHelper>>` - List of remainder items for ingredients that have them

Returns all possible remainder items for ingredients that have recipe remainders.

```javascript
const remainders = recipe.getRecipeRemainders();
for (const remainderList of remainders) {
    console.log("Possible remainders:", remainderList.map(item => item.getName()));
}
```

### getType()

**Since:** 1.8.4
**Returns:** `String` - The type identifier for this recipe

Gets the type of recipe (e.g., "minecraft:crafting_shaped", "minecraft:smelting").

```javascript
const recipeType = recipe.getType();
console.log("Recipe type:", recipeType);
switch (recipeType) {
    case "minecraft:crafting_shaped":
        console.log("Shaped crafting recipe");
        break;
    case "minecraft:crafting_shapeless":
        console.log("Shapeless crafting recipe");
        break;
    case "minecraft:smelting":
        console.log("Smelting recipe");
        break;
}
```

### canCraft()

**Since:** 1.8.4
**Returns:** `boolean` - `true` if the recipe can be crafted with current inventory

Checks if the player has sufficient materials to craft at least one set of this recipe.

```javascript
if (recipe.canCraft()) {
    console.log("You can craft this recipe!");
    recipe.craft(false);
} else {
    console.log("Insufficient materials");
}
```

### canCraft(amount)

**Since:** 1.8.4
**Parameters:**
- `amount` (int): The number of recipe sets to check for

**Returns:** `boolean` - `true` if the specified amount can be crafted

Checks if the player has sufficient materials to craft the specified number of recipe sets.

```javascript
const desiredAmount = 10;
if (recipe.canCraft(desiredAmount)) {
    console.log(`You can craft ${desiredAmount} of this recipe`);
} else {
    console.log(`Insufficient materials for ${desiredAmount} sets`);
}
```

### getCraftableAmount()

**Since:** 1.8.4
**Returns:** `int` - Maximum number of recipe sets that can be crafted

Calculates how many complete sets of the recipe can be crafted with the player's current inventory.

```javascript
const maxCraftable = recipe.getCraftableAmount();
console.log(`You can craft ${maxCraftable} sets of this recipe`);

if (maxCraftable > 0) {
    recipe.craft(true); // Craft as many as possible
}
```

### toString()

**Returns:** `String` - String representation of the recipe

Returns a formatted string representation of the recipe containing its ID.

```javascript
console.log(recipe.toString()); // RecipeHelper:{"id": "minecraft:stick"}
```

## Usage Examples

### Basic Recipe Information
```javascript
// Get recipe information
const recipe = craftableRecipes[0];
console.log("Recipe:", recipe.getId());
console.log("Type:", recipe.getType());
console.log("Output:", recipe.getOutput().getName() + " x" + recipe.getOutput().getCount());
console.log("Can craft:", recipe.canCraft());
console.log("Maximum crafts:", recipe.getCraftableAmount());
```

### Detailed Ingredient Analysis
```javascript
function analyzeRecipe(recipe) {
    console.log(`=== Recipe Analysis: ${recipe.getId()} ===`);

    // Basic info
    console.log("Type:", recipe.getType());
    console.log("Group:", recipe.getGroup() || "No group");

    // Output
    const output = recipe.getOutput();
    console.log("Output:", `${output.getName()} x${output.getCount()}`);

    // Ingredients
    const ingredients = recipe.getIngredients();
    console.log("Ingredients:");
    ingredients.forEach((slot, index) => {
        const options = slot.map(item => item.getName()).join(", ");
        console.log(`  Slot ${index}: ${options}`);
    });

    // Craftability
    const canCraft = recipe.canCraft();
    const maxCrafts = recipe.getCraftableAmount();
    console.log("Craftable:", canCraft ? "Yes" : "No");
    if (canCraft) {
        console.log("Maximum crafts:", maxCrafts);
    }

    // Remainders
    if (recipe.hasRecipeRemainders()) {
        console.log("Has remainder items");
    }
}

// Analyze all craftable recipes
const craftableRecipes = recipeInventory.getCraftableRecipes();
craftableRecipes.forEach(analyzeRecipe);
```

### Automated Crafting System
```javascript
function craftRecipeByName(recipeName, amount = 1) {
    const recipes = recipeInventory.getCraftableRecipes();

    for (const recipe of recipes) {
        if (recipe.getId().includes(recipeName)) {
            console.log("Found recipe:", recipe.getId());

            if (recipe.canCraft(amount)) {
                console.log(`Crafting ${amount} sets...`);

                // Craft specified amount
                for (let i = 0; i < amount; i++) {
                    recipe.craft(false);
                    // Small delay to prevent issues
                    Time.sleep(100);
                }

                console.log("Crafting complete!");
                return true;
            } else {
                console.log(`Cannot craft ${amount} sets. Max available: ${recipe.getCraftableAmount()}`);
                return false;
            }
        }
    }

    console.log("Recipe not found:", recipeName);
    return false;
}

// Example usage
craftRecipeByName("minecraft:oak_planks", 4);
```

### Recipe Filtering and Search
```javascript
// Find all recipes that produce wooden items
function findWoodenRecipes() {
    const allRecipes = recipeInventory.getRecipes(false);
    const woodRecipes = [];

    for (const recipe of allRecipes) {
        const output = recipe.getOutput();
        const itemName = output.getName().toLowerCase();

        if (itemName.includes("oak") || itemName.includes("birch") ||
            itemName.includes("spruce") || itemName.includes("jungle")) {
            woodRecipes.push({
                recipe: recipe,
                output: output.getName(),
                canCraft: recipe.canCraft(),
                maxCrafts: recipe.getCraftableAmount()
            });
        }
    }

    return woodRecipes;
}

// Display wooden recipes
const woodRecipes = findWoodenRecipes();
woodRecipes.forEach(({recipe, output, canCraft, maxCrafts}) => {
    console.log(`${recipe.getId()}: ${output} - ${canCraft ? `Craftable (${maxCrafts})` : "Not craftable"}`);
});
```

## Important Notes

1. **Screen Context**: The `craft()` method requires the appropriate crafting screen to be open. It will fail if called after the screen is closed.

2. **Inventory Sync**: Craftability checks are based on the current player inventory at the time of the call.

3. **Recipe Remainders**: The `hasRecipeRemainders()` and `getRecipeRemainders()` methods only check the default recipe definition, not actual items used in crafting.

4. **Tags and Alternatives**: The `getIngredients()` method properly handles item tags and provides all possible items for each ingredient slot.

5. **Thread Safety**: Recipe operations should typically be performed on the main thread. Use appropriate synchronization when needed.

6. **Recipe Book Integration**: RecipeHelper instances obtained from `RecipeInventory.getCraftableRecipes()` are guaranteed to be craftable by the player.

## Related Classes

- `RecipeInventory` - For obtaining RecipeHelper instances
- `ItemStackHelper` - Used for ingredient and output items
- `CraftingInventory` - For direct crafting table interaction

## Error Handling

Always include proper error handling when working with recipes, especially when crafting:

```javascript
try {
    if (recipe.canCraft()) {
        recipe.craft(false);
        console.log("Crafting successful");
    }
} catch (error) {
    console.error("Crafting failed:", error.message);
    // Handle the error (e.g., screen closed, insufficient materials)
}
```