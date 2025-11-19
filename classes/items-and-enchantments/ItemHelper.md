# ItemHelper

**Overview:**
`ItemHelper` is a comprehensive helper class that provides access to Minecraft item properties and behaviors. It represents an item type (not a specific item stack) and allows you to query various attributes like enchantability, durability, food properties, and tool capabilities.

**Category:** Items and Enchantments

## How to Access

You typically obtain an `ItemHelper` instance from:
- An `ItemStackHelper` using `.getItem()`
- Registry lookups using item IDs
- Various inventory and crafting contexts

```javascript
// Get ItemHelper from an ItemStack
const item = itemStack.getItem();

// Check item type
if (item.isFood()) {
    // Handle food items
}
```

## Methods

### Creative Menu Information

#### getCreativeTab()
- **Returns:** `List<TextHelper>` - List of creative tab names this item appears in
- **Description:** Gets all creative inventory tabs/groups where this item can be found
- **Example:**
```javascript
const tabs = item.getCreativeTab();
Java.from(tabs).forEach(tab => {
    log("Found in creative tab: " + tab.getString());
});
```

#### getGroupIcon()
- **Returns:** `List<ItemStackHelper>` | `null` - Item stacks used as icons for the creative tabs
- **Description:** Gets the display item stacks for the creative tabs this item belongs to
- **Example:**
```javascript
const icons = item.getGroupIcon();
if (icons) {
    log("Tab icon item: " + icons[0].getItem().getName());
}
```

### Item Properties

#### getName()
- **Returns:** `String` - Localized item name
- **Description:** Gets the display name of the item translated to the current language
- **Example:**
```javascript
const itemName = item.getName();
log("Item name: " + itemName); // e.g., "Diamond Sword"
```

#### getId()
- **Returns:** `String` - Item identifier (e.g., "minecraft:diamond_sword")
- **Description:** Gets the unique resource location identifier for this item
- **Example:**
```javascript
const itemId = item.getId();
log("Item ID: " + itemId); // e.g., "minecraft:diamond_sword"
```

#### getMaxCount()
- **Returns:** `int` - Maximum stack size
- **Description:** Gets the maximum number of items that can be stacked together
- **Example:**
```javascript
const maxStack = item.getMaxCount();
log("Can stack up to: " + maxStack + " items"); // Usually 64 or 16
```

#### getMaxDurability()
- **Returns:** `int` - Maximum durability/damage value
- **Description:** Gets how much damage the item can take before breaking. Returns 0 for non-damageable items.
- **Example:**
```javascript
const maxDurability = item.getMaxDurability();
if (maxDurability > 0) {
    log("Max durability: " + maxDurability);
}
```

#### isDamageable()
- **Returns:** `boolean` - Whether the item can take damage
- **Description:** Checks if this item has durability and can be damaged
- **Example:**
```javascript
if (item.isDamageable()) {
    log("This item can be damaged");
}
```

#### isFireproof()
- **Returns:** `boolean` - Whether the item is immune to fire/lava damage
- **Description:** Checks if the item will survive in fire or lava
- **Example:**
```javascript
if (item.isFireproof()) {
    log("Item is fireproof (like netherite)");
}
```

#### canBeNested()
- **Returns:** `boolean` - Whether the item can be stored in bundles/shulker boxes
- **Description:** Checks if this item can be nested inside other containers
- **Example:**
```javascript
if (item.canBeNested()) {
    log("Can be stored in bundles");
}
```

### Tool and Equipment Properties

#### isTool()
- **Returns:** `boolean` - Whether the item is considered a tool
- **Description:** Checks if this item is a tool (pickaxe, axe, shovel, hoe, etc.)
- **Example:**
```javascript
if (item.isTool()) {
    log("This is a tool");
}
```

#### isWearable()
- **Returns:** `boolean` - Whether the item can be worn as armor
- **Description:** Checks if this item is armor that can be equipped
- **Example:**
```javascript
if (item.isWearable()) {
    log("This is armor");
}
```

#### getEnchantability()
- **Returns:** `int` - Enchantability value
- **Description:** Gets the enchantability factor. Higher values mean better enchantments are more likely.
- **Example:**
```javascript
const enchantability = item.getEnchantability();
if (enchantability > 0) {
    log("Enchantability: " + enchantability);
}
```

#### getMiningSpeedMultiplier(state)
- **Parameters:**
  - `state` (BlockStateHelper): Block state to check mining speed against
- **Returns:** `float` - Mining speed multiplier
- **Description:** Gets how fast this item can mine the specified block type
- **Example:**
```javascript
const blockState = blockHelper.getDefaultState();
const speed = item.getMiningSpeedMultiplier(blockState);
log("Mining speed: " + speed + "x");
```

#### isSuitableFor(block)
- **Overloads:**
  - `isSuitableFor(BlockHelper block)`
  - `isSuitableFor(BlockStateHelper block)`
- **Returns:** `boolean` - Whether the item can effectively mine the block
- **Description:** Checks if this item is suitable for mining the given block (will cause drops)
- **Example:**
```javascript
// Using BlockHelper
if (item.isSuitableFor(blockHelper)) {
    log("Can mine this block effectively");
}

// Using BlockStateHelper
if (item.isSuitableFor(blockStateHelper)) {
    log("Can mine this block state effectively");
}
```

#### canBeRepairedWith(stack)
- **Parameters:**
  - `stack` (ItemStackHelper): Material to test for repairing
- **Returns:** `boolean` - Whether the material can repair this item
- **Description:** Checks if the given item stack can be used as repair material
- **Example:**
```javascript
const ironIngot = World.findItem("minecraft:iron_ingot");
if (item.canBeRepairedWith(ironIngot)) {
    log("Can repair with iron ingot");
}
```

### Food Properties

#### isFood()
- **Returns:** `boolean` - Whether the item is edible
- **Description:** Checks if this item can be eaten by the player
- **Example:**
```javascript
if (item.isFood()) {
    log("This item is food");
}
```

#### getFood()
- **Returns:** `FoodComponentHelper` | `null` - Food properties or null if not food
- **Description:** Gets detailed food component information if this item is edible
- **Example:**
```javascript
const food = item.getFood();
if (food) {
    log("Hunger restored: " + food.getHunger());
    log("Saturation: " + food.getSaturation());
    log("Can always eat: " + food.isAlwaysEdible());
}
```

### Block Items

#### isBlockItem()
- **Returns:** `boolean` - Whether the item represents a block
- **Description:** Checks if this item is a block that can be placed
- **Example:**
```javascript
if (item.isBlockItem()) {
    log("This is a placeable block");
}
```

#### getBlock()
- **Returns:** `BlockHelper` | `null` - Block helper or null if not a block item
- **Description:** Gets the block representation of this item
- **Example:**
```javascript
const block = item.getBlock();
if (block) {
    log("Block ID: " + block.getId());
}
```

### Crafting and Recipes

#### hasRecipeRemainder()
- **Returns:** `boolean` - Whether the item leaves a remainder when crafted
- **Description:** Checks if crafting with this item leaves a different item behind (like buckets)
- **Example:**
```javascript
if (item.hasRecipeRemainder()) {
    log("Item has recipe remainder");
}
```

#### getRecipeRemainder()
- **Returns:** `ItemHelper` | `null` - The remainder item or null
- **Description:** Gets the item that remains after using this item in crafting
- **Example:**
```javascript
const remainder = item.getRecipeRemainder();
if (remainder) {
    log("Recipe remainder: " + remainder.getName());
}
```

### Item Stack Creation

#### getDefaultStack()
- **Returns:** `ItemStackHelper` - Default item stack with count 1
- **Description:** Creates a new item stack of this type with default properties
- **Example:**
```javascript
const newStack = item.getDefaultStack();
log("Created stack with: " + newStack.getCount() + " items");
```

#### getStackWithNbt(nbt)
- **Parameters:**
  - `nbt` (String): NBT data string to apply to the stack
- **Returns:** `ItemStackHelper` - Item stack with the specified NBT data
- **Throws:** `CommandSyntaxException` if the NBT data is invalid
- **Description:** Creates an item stack with custom NBT data
- **Example:**
```javascript
try {
    const enchantedStack = item.getStackWithNbt("{Enchantments:[{id:\"minecraft:sharpness\",lvl:5}]}");
    log("Created enchanted item stack");
} catch (e) {
    log("Invalid NBT: " + e);
}
```

## Usage Examples

### Comprehensive Item Analysis
```javascript
function analyzeItem(itemStack) {
    const item = itemStack.getItem();

    log("=== Item Analysis ===");
    log("Name: " + item.getName());
    log("ID: " + item.getId());
    log("Max Stack: " + item.getMaxCount());

    // Properties
    if (item.isDamageable()) {
        log("Max Durability: " + item.getMaxDurability());
    }

    if (item.isFireproof()) {
        log("Fire resistant: Yes");
    }

    // Item types
    if (item.isTool()) {
        log("Type: Tool");
        log("Enchantability: " + item.getEnchantability());
    }

    if (item.isWearable()) {
        log("Type: Armor");
    }

    if (item.isFood()) {
        log("Type: Food");
        const food = item.getFood();
        log("  Hunger: " + food.getHunger());
        log("  Saturation: " + food.getSaturation());
    }

    if (item.isBlockItem()) {
        log("Type: Block Item");
        log("Block: " + item.getBlock().getId());
    }

    if (item.hasRecipeRemainder()) {
        log("Recipe Remainder: " + item.getRecipeRemainder().getName());
    }
}
```

### Tool Effectiveness Checker
```javascript
function checkToolEffectiveness(toolItem, targetBlock) {
    const item = toolItem.getItem();

    if (!item.isTool()) {
        log("Not a tool!");
        return;
    }

    log("Checking tool: " + item.getName());

    // Check if suitable for block
    if (item.isSuitableFor(targetBlock)) {
        log("✓ Can mine this block efficiently");

        // Get mining speed
        const speed = item.getMiningSpeedMultiplier(targetBlock.getDefaultState());
        log("Mining speed: " + speed.toFixed(2) + "x");
    } else {
        log("✗ Not suitable for this block");
    }

    // Check repair materials
    log("Can be repaired with:");
    // Test common repair materials
    const repairMaterials = [
        "minecraft:iron_ingot",
        "minecraft:gold_ingot",
        "minecraft:diamond",
        "minecraft:netherite_ingot"
    ];

    repairMaterials.forEach(materialId => {
        const materialStack = World.findItem(materialId);
        if (materialStack && item.canBeRepairedWith(materialStack)) {
            log("  - " + materialStack.getItem().getName());
        }
    });
}
```

### Food Item Analysis
```javascript
function analyzeFoodItem(itemStack) {
    const item = itemStack.getItem();

    if (!item.isFood()) {
        log("This item is not food!");
        return;
    }

    const food = item.getFood();

    log("=== Food Analysis ===");
    log("Item: " + item.getName());
    log("Hunger restored: " + food.getHunger());
    log("Saturation: " + food.getSaturation());
    log("Can always eat: " + food.isAlwaysEdible());
    log("Fast food: " + food.isFastFood());

    // Check for effects
    const effects = food.getStatusEffects();
    if (effects.size() > 0) {
        log("Status effects:");
        Java.from(effects.entrySet()).forEach(entry => {
            const effect = entry.getKey();
            const chance = entry.getValue();
            log("  - " + effect.getName() + " (" + (chance * 100) + "% chance)");
        });
    }
}
```

## Important Notes

### Item vs ItemStack
- `ItemHelper` represents an **item type** (like all diamond swords)
- `ItemStackHelper` represents a **specific item stack** (with count, damage, enchantments, etc.)
- Use `itemStack.getItem()` to get the `ItemHelper` from an `ItemStackHelper`

### NBT Data Format
When using `getStackWithNbt()`, the NBT string should follow Minecraft's item argument format:
```javascript
// Basic format: item_id[nbt_data]
// Examples:
"{Enchantments:[{id:\"minecraft:sharpness\",lvl:3}]}"
"{Damage:5,display:{Name:'{\"text\":\"Custom Sword\"}'}}"
```

### Creative Tab Information
Creative tabs returned by `getCreativeTab()` are localized text strings that may vary by language setting.

### Block Items
Some items represent both an item and a block (like doors, chests, etc.). Use `isBlockItem()` to check if an item can be placed as a block.

## Related Classes

- [`ItemStackHelper`](./ItemStackHelper.md) - For specific item stack instances
- [`FoodComponentHelper`](./FoodComponentHelper.md) - For detailed food properties
- [`BlockHelper`](./BlockHelper.md) - For block properties (when `isBlockItem()` is true)
- [`BlockStateHelper`](./BlockStateHelper.md) - For block state properties