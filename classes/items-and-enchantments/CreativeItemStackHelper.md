# CreativeItemStackHelper

**Category:** Items and Enchantments
**Since:** JsMacros 1.8.4

## Overview

The `CreativeItemStackHelper` class is an extension of `ItemStackHelper` that provides methods for modifying items as if they were in creative mode. This class is specifically designed for manipulating item properties that would typically require creative mode access, such as enchantments, custom names, durability, lore, and other NBT-related modifications.

This class is ideal for:
- Creating custom items with specific properties
- Modifying existing items with creative-like powers
- Adding enchantments and custom lore
- Setting item properties not normally editable in survival mode

## Creating a CreativeItemStackHelper

### From an existing ItemStackHelper

```javascript
// Convert existing item to creative mode
let item = Player.getMainHand().getCreative();
```

### Using Registry (returns CreativeItemStackHelper by default)

```javascript
// Create a new item as CreativeItemStackHelper
let sword = Registry.createItemStack("minecraft:diamond_sword");
```

## Method Chaining

Most `CreativeItemStackHelper` methods return the instance itself, allowing for method chaining:

```javascript
let powerfulSword = Registry.createItemStack("minecraft:diamond_sword")
    .setName("§6Legendary Sword")
    .addEnchantment("sharpness", 5)
    .addEnchantment("unbreaking", 3)
    .setUnbreakable(true)
    .addLore("§7A blade of immense power", "§7Forged in ancient times");
```

## Methods

### Durability and Damage

#### setDamage(damage)
Sets the damage value of the item.

**Parameters:**
- `damage` (int) - The amount of damage to apply to the item

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let item = Registry.createItemStack("minecraft:diamond_pickaxe")
    .setDamage(100); // Damages the pickaxe
```

#### setDurability(durability)
Sets the current durability of the item.

**Parameters:**
- `durability` (int) - The current durability value

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let item = Registry.createItemStack("minecraft:diamond_sword")
    .setDurability(1500); // Sets durability to 1500
```

### Item Properties

#### setCount(count)
Sets the number of items in the stack.

**Parameters:**
- `count` (int) - The new stack size

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let items = Registry.createItemStack("minecraft:diamond")
    .setCount(64); // Create a full stack of diamonds
```

#### setName(name)
Sets the custom display name of the item.

**Parameters:**
- `name` (String or TextHelper) - The new display name

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
// Using string
let sword = Registry.createItemStack("minecraft:iron_sword")
    .setName("§bExcalibur");

// Using TextHelper
let textName = TextHelper.fromString("§c§lDragonslayer");
let axe = Registry.createItemStack("minecraft:diamond_axe")
    .setName(textName);
```

### Enchantments

#### addEnchantment(id, level)
Adds an enchantment to the item.

**Parameters:**
- `id` (String) - The enchantment ID (can omit namespace)
- `level` (int) - The enchantment level

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let enchantedPick = Registry.createItemStack("minecraft:diamond_pickaxe")
    .addEnchantment("efficiency", 5)
    .addEnchantment("unbreaking", 3)
    .addEnchantment("fortune", 3);
```

#### addEnchantment(enchantment)
Adds an enchantment using an EnchantmentHelper object.

**Parameters:**
- `enchantment` (EnchantmentHelper) - The enchantment to add

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let sharpnessEnchant = new EnchantmentHelper("minecraft:sharpness");
let sword = Registry.createItemStack("minecraft:diamond_sword")
    .addEnchantment(sharpnessEnchant);
```

#### clearEnchantments()
Removes all enchantments from the item.

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let cleanItem = Player.getMainHand().getCreative()
    .clearEnchantments(); // Remove all enchantments
```

#### removeEnchantment(id)
Removes a specific enchantment from the item.

**Parameters:**
- `id` (String) - The enchantment ID to remove

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let item = Player.getMainHand().getCreative()
    .removeEnchantment("minecraft:sharpness"); // Remove sharpness
```

#### removeEnchantment(enchantment)
Removes a specific enchantment using an EnchantmentHelper object.

**Parameters:**
- `enchantment` (EnchantmentHelper) - The enchantment to remove

**Returns:** `CreativeItemStackHelper` - For method chaining

### Lore (Item Description)

#### clearLore()
Removes all lore from the item.

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let cleanItem = Player.getMainHand().getCreative()
    .clearLore(); // Clear all description lines
```

### Special Properties

#### setUnbreakable(unbreakable)
Makes the item unbreakable or removes the unbreakable flag.

**Parameters:**
- `unbreakable` (boolean) - Whether the item should be unbreakable

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let foreverTool = Registry.createItemStack("minecraft:diamond_pickaxe")
    .setUnbreakable(true); // Make it never break
```

### Tooltip Hiding

These methods control whether certain item properties are displayed in the tooltip:

#### hideEnchantments(hide)
Controls whether enchantments are shown in the tooltip.

**Parameters:**
- `hide` (boolean) - Whether to hide enchantments

**Returns:** `CreativeItemStackHelper` - For method chaining

#### hideModifiers(hide)
Controls whether attribute modifiers are shown in the tooltip.

**Parameters:**
- `hide` (boolean) - Whether to hide modifiers

**Returns:** `CreativeItemStackHelper` - For method chaining

#### hideUnbreakable(hide)
Controls whether the unbreakable flag is shown in the tooltip.

**Parameters:**
- `hide` (boolean) - Whether to hide the unbreakable flag

**Returns:** `CreativeItemStackHelper` - For method chaining

#### hideCanDestroy(hide)
Controls whether the "Can Destroy" information is shown in the tooltip.

**Parameters:**
- `hide` (boolean) - Whether to hide can destroy info

**Returns:** `CreativeItemStackHelper` - For method chaining

#### hideCanPlace(hide)
Controls whether the "Can Place On" information is shown in the tooltip.

**Parameters:**
- `hide` (boolean) - Whether to hide can place on info

**Returns:** `CreativeItemStackHelper` - For method chaining

#### hideDye(hide)
Controls whether the dye color of leather armor is shown in the tooltip.

**Parameters:**
- `hide` (boolean) - Whether to hide dye color

**Returns:** `CreativeItemStackHelper` - For method chaining

**Example:**
```javascript
let mysteriousItem = Registry.createItemStack("minecraft:diamond_sword")
    .addEnchantment("sharpness", 10)
    .setUnbreakable(true)
    .hideEnchantments(true)
    .hideUnbreakable(true);
```

## Inherited Methods

`CreativeItemStackHelper` inherits all methods from `ItemStackHelper`, including:

- `getEnchantments()` - Gets all enchantments on the item
- `getEnchantment(id)` - Gets a specific enchantment
- `hasEnchantment(id)` - Checks if item has specific enchantment
- `getDurability()` - Gets current durability
- `getMaxDurability()` - Gets maximum durability
- `getCount()` - Gets item count
- `getName()` - Gets item name
- `getItemId()` - Gets item ID
- `getLore()` - Gets item lore as read-only list
- `isUnbreakable()` - Checks if item is unbreakable
- And many more...

## Practical Examples

### Creating a Custom Tool

```javascript
function createSuperTool() {
    return Registry.createItemStack("minecraft:netherite_pickaxe")
        .setName("§5§lQuantum Breaker")
        .setUnbreakable(true)
        .addEnchantment("efficiency", 5)
        .addEnchantment("fortune", 5)
        .addEnchantment("silk_touch", 1)
        .setLore(
            "§dA tool of immense power",
            "§7Mines any block instantly",
            "§7§oQuantum enhanced"
        )
        .hideEnchantments(true);
}

let superPick = createSuperTool();
// Give it to the player (if you have a method to do so)
```

### Enchanted Book Creator

```javascript
function createEnchantedBook(enchantId, level, customName) {
    let book = Registry.createItemStack("minecraft:enchanted_book");

    if (customName) {
        book.setName(customName);
    }

    book.addEnchantment(enchantId, level);

    return book;
}

// Usage
let sharpnessBook = createEnchantedBook("sharpness", 5, "§bBook of Sharpness V");
```

### Custom Weapon Set

```javascript
function createWeaponSet() {
    let sword = Registry.createItemStack("minecraft:diamond_sword")
        .setName("§c§lBlade of Fire")
        .addEnchantment("sharpness", 5)
        .addEnchantment("fire_aspect", 2)
        .addEnchantment("unbreaking", 3)
        .setLore("§7Burns your enemies", "§7Forged in volcanic flames");

    let bow = Registry.createItemStack("minecraft:bow")
        .setName("§a§lEagle Eye")
        .addEnchantment("power", 5)
        .addEnchantment("infinity", 1)
        .addEnchantment("flame", 1)
        .setLore("§7Never runs out of arrows", "§7Guided by eagle's precision");

    return { sword: sword, bow: bow };
}

let weapons = createWeaponSet();
```

## Notes and Limitations

1. **Creative Mode Access**: Some modifications may only work properly in creative mode or with appropriate permissions.

2. **Enchantment Compatibility**: Not all enchantments can be applied to all items. Use `canBeApplied()` to check compatibility if needed.

3. **Enchantment Levels**: Exceeding normal enchantment levels (like Sharpness 10) may work visually but could have unexpected behavior.

4. **Performance**: Creating many CreativeItemStackHelper instances with complex modifications can impact performance.

5. **Persistence**: Items modified this way will retain their properties when saved in the world.

6. **Server Compatibility**: Some modifications may not work on servers with anti-cheat plugins or strict item validation.

## Related Classes

- `ItemStackHelper` - Base class with read-only item methods
- `EnchantmentHelper` - Represents enchantments
- `Registry` - For creating new items
- `TextHelper` - For creating formatted text
- `TextBuilder` - For building complex text components