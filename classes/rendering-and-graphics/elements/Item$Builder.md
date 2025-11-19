# Item$Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Item$Builder`

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components`

**Extends:** `RenderElementBuilder<Item>`

**Since:** 1.8.4

## Overview

The `Item$Builder` class is a nested builder within `Item` that provides a fluent API for creating and configuring `Item` instances. This builder implements the builder pattern, allowing you to construct item render elements with all their properties set through a chainable, readable API.

The builder is the recommended way to create `Item` instances for 2D rendering, as it provides type safety, method chaining, and validation during the construction process. It's typically accessed through the `Draw2D` context's `item()` method.

## Constructor

```java
Builder()
```

The builder constructor creates an empty builder that will construct an `Item` instance. In most cases, you won't call this constructor directly - instead, you'll obtain a builder through the `Draw2D.item()` method.

## Builder Methods

### Position Control Methods

#### `pos(int x, int y)`
**Parameters:**
- `x` (`int`) - The x-coordinate on screen
- `y` (`int`) - The y-coordinate on screen

**Returns:** `Item$Builder` - This builder for method chaining

Sets both x and y positions simultaneously.

```javascript
const builder = draw2D.item()
    .pos(100, 50); // Position at (100, 50)
```

#### `x(int x)`
**Parameters:**
- `x` (`int`) - The x-coordinate on screen

**Returns:** `Item$Builder` - This builder for method chaining

Sets the x-coordinate of the item.

```javascript
const builder = draw2D.item()
    .x(150); // Position at x=150
```

#### `y(int y)`
**Parameters:**
- `y` (`int`) - The y-coordinate on screen

**Returns:** `Item$Builder` - This builder for method chaining

Sets the y-coordinate of the item.

```javascript
const builder = draw2D.item()
    .y(75); // Position at y=75
```

### Item Configuration Methods

#### `item(String itemId)`
**Parameters:**
- `itemId` (`String`) - The Minecraft item ID

**Returns:** `Item$Builder` - This builder for method chaining

Sets the item using a Minecraft item ID string.

```javascript
const builder = draw2D.item()
    .item("minecraft:diamond_sword");
```

#### `item(ItemStackHelper itemStack)`
**Parameters:**
- `itemStack` (`ItemStackHelper`) - The item stack to display

**Returns:** `Item$Builder` - This builder for method chaining

Sets the item using an ItemStackHelper instance.

```javascript
const itemStack = new ItemStackHelper("minecraft:apple", 16);
const builder = draw2D.item()
    .item(itemStack);
```

#### `id(String itemId)`
**Parameters:**
- `itemId` (`String`) - The Minecraft item ID

**Returns:** `Item$Builder` - This builder for method chaining

Alternative method for setting the item ID.

```javascript
const builder = draw2D.item()
    .id("minecraft:emerald");
```

### Transform Methods

#### `scale(double scale)`
**Parameters:**
- `scale` (`double`) - Scale factor (1.0 = normal size)

**Returns:** `Item$Builder` - This builder for method chaining

Sets the scale factor for the item. Scale affects the visual size of the rendered item.

```javascript
const builder = draw2D.item()
    .scale(1.5); // 150% normal size
```

#### `rotation(float rotation)`
**Parameters:**
- `rotation` (`float`) - Rotation angle in degrees (clockwise)

**Returns:** `Item$Builder` - This builder for method chaining

Sets the rotation angle for the item in degrees. Positive values rotate clockwise.

```javascript
const builder = draw2D.item()
    .rotation(45); // Rotate 45 degrees clockwise
```

#### `rotateCenter(boolean rotateCenter)`
**Parameters:**
- `rotateCenter` (`boolean`) - Whether to rotate around the center point

**Returns:** `Item$Builder` - This builder for method chaining

Sets whether rotation should occur around the item's center point or origin (top-left corner).

```javascript
const builder = draw2D.item()
    .rotateCenter(true); // Rotate around center
```

### Overlay Control Methods

#### `overlayVisible(boolean overlayVisible)`
**Parameters:**
- `overlayVisible` (`boolean`) - Whether to show the overlay

**Returns:** `Item$Builder` - This builder for method chaining

Sets whether the item overlay (count, durability, custom text) should be visible.

```javascript
const builder = draw2D.item()
    .overlayVisible(true); // Show overlay
```

#### `overlayText(String overlayText)`
**Parameters:**
- `overlayText` (`String`) - Custom overlay text (null for default)

**Returns:** `Item$Builder` - This builder for method chaining

Sets custom overlay text to display on the item. Set to null or empty string to use default behavior.

```javascript
const builder = draw2D.item()
    .overlayText("✨"); // Custom overlay text
```

#### `showOverlay(boolean showOverlay)`
**Parameters:**
- `showOverlay` (`boolean`) - Whether to show the overlay

**Returns:** `Item$Builder` - This builder for method chaining

Alternative method for setting overlay visibility.

```javascript
const builder = draw2D.item()
    .showOverlay(true);
```

### Z-Index Control

#### `zIndex(int zIndex)`
**Parameters:**
- `zIndex` (`int`) - The z-index for rendering order

**Returns:** `Item$Builder` - This builder for method chaining

Sets the z-index for render ordering. Higher values appear on top of lower values.

```javascript
const builder = draw2D.item()
    .zIndex(10); // Render above elements with lower z-index
```

### Build Methods

#### `build()`
**Returns:** `Item` - The created `Item` instance

Creates the `Item` with the configured properties but does not add it to the parent container.

```javascript
const item = draw2D.item()
    .pos(100, 50)
    .item("minecraft:diamond")
    .scale(1.0)
    .build(); // Item is created but not added
```

#### `buildAndAdd()`
**Returns:** `Item` - The created and added `Item` instance

Creates the `Item` with the configured properties and automatically adds it to the parent `Draw2D` context.

```javascript
const item = draw2D.item()
    .pos(100, 50)
    .item("minecraft:diamond")
    .scale(1.0)
    .buildAndAdd(); // Item is created and added
```

## Usage Examples

### Example 1: Basic Item Creation

```javascript
const draw2D = Hud.createDraw2D();

// Create a simple diamond item
const diamond = draw2D.item()
    .pos(50, 30)
    .item("minecraft:diamond")
    .scale(1.0)
    .overlayVisible(true)
    .buildAndAdd();
```

### Example 2: Complex Item Configuration

```javascript
const draw2D = Hud.createDraw2D();

// Create a complex item with all properties
const sword = draw2D.item()
    .pos(200, 100)                    // Position
    .item("minecraft:diamond_sword")      // Item ID
    .scale(1.5)                       // 150% size
    .rotation(45)                     // 45 degree rotation
    .rotateCenter(true)               // Rotate around center
    .overlayVisible(true)             // Show durability/count
    .zIndex(5)                        // High z-index
    .buildAndAdd();
```

### Example 3: ItemStack-based Item

```javascript
const draw2D = Hud.createDraw2D();

// Create an item stack first
const appleStack = new ItemStackHelper("minecraft:apple", 16);

// Create item using the item stack
const apple = draw2D.item()
    .pos(150, 80)
    .item(appleStack)
    .scale(1.2)
    .overlayVisible(true)
    .buildAndAdd();
```

### Example 4: Animated Item Display

```javascript
const draw2D = Hud.createDraw2D();
let animationTime = 0;

function createAnimatedItem() {
    const centerX = Hud.getScreenWidth() / 2;
    const centerY = Hud.getScreenHeight() / 2;

    // Calculate animation values
    const scale = 1.0 + Math.sin(animationTime * 0.05) * 0.3;
    const rotation = animationTime * 2;

    // Create animated item
    const animatedItem = draw2D.item()
        .pos(centerX - 8, centerY - 8)  // Center the 16x16 item
        .item("minecraft:emerald")
        .scale(scale)
        .rotation(rotation)
        .rotateCenter(true)
        .overlayVisible(true)
        .overlayText("✨")
        .zIndex(100)
        .build();

    return animatedItem;
}

events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    draw2D.clear();
    animationTime++;

    const item = createAnimatedItem();
    draw2D.addItem(item);
}));
```

### Example 5: Item Grid Layout

```javascript
const draw2D = Hud.createDraw2D();

function createItemGrid(items, startX, startY, spacing, scale) {
    items.forEach((itemId, index) => {
        const row = Math.floor(index / 5);
        const col = index % 5;

        const x = startX + col * spacing;
        const y = startY + row * spacing;

        const gridItem = draw2D.item()
            .pos(x, y)
            .item(itemId)
            .scale(scale)
            .overlayVisible(true)
            .build();

        draw2D.addItem(gridItem);
    });
}

// Display a grid of valuable items
const valuableItems = [
    "minecraft:diamond",
    "minecraft:emerald",
    "minecraft:gold_ingot",
    "minecraft:iron_ingot",
    "minecraft:coal",
    "minecraft:redstone"
];

createItemGrid(valuableItems, 50, 50, 25, 1.0);
```

### Example 6: Custom Overlay Text Items

```javascript
const draw2D = Hud.createDraw2D();

function createCustomOverlayItems() {
    // Item with custom label
    const customItem1 = draw2D.item()
        .pos(50, 50)
        .item("minecraft:experience_bottle")
        .scale(1.0)
        .overlayVisible(true)
        .overlayText("LEVEL UP")
        .build();

    // Item with special character
    const customItem2 = draw2D.item()
        .pos(100, 50)
        .item("minecraft:totem_of_undying")
        .scale(1.2)
        .overlayVisible(true)
        .overlayText("🛡️")
        .build();

    // Item with number
    const customItem3 = draw2D.item()
        .pos(150, 50)
        .item("minecraft:clock")
        .scale(1.0)
        .overlayVisible(true)
        .overlayText("12:00")
        .build();

    draw2D.addItem(customItem1);
    draw2D.addItem(customItem2);
    draw2D.addItem(customItem3);
}

createCustomOverlayItems();
```

### Example 7: Dynamic Item Display

```javascript
const draw2D = Hud.createDraw2D();

function updateInventoryDisplay() {
    draw2D.clear();

    const player = Player.getPlayer();
    if (!player) return;

    const inventory = player.getInventory();
    if (!inventory) return;

    const hotbarItems = [];
    const hotbarSize = 9;

    // Get hotbar items
    for (let i = 0; i < hotbarSize; i++) {
        const itemStack = inventory.getStack(i);
        if (itemStack && !itemStack.isEmpty()) {
            hotbarItems.push({
                index: i,
                stack: itemStack,
                selected: i === inventory.selectedSlot
            });
        }
    }

    // Create hotbar display
    const startX = Hud.getScreenWidth() / 2 - (hotbarSize * 20) / 2;
    const y = Hud.getScreenHeight() - 50;

    hotbarItems.forEach((hotbarItem) => {
        const x = startX + hotbarItem.index * 20;

        // Background for selected item
        if (hotbarItem.selected) {
            const bg = draw2D.rect()
                .pos(x - 2, y - 2)
                .size(24, 24)
                .color(0x80000000)
                .fill(true)
                .build();
            draw2D.addRect(bg);
        }

        // Item
        const overlayText = hotbarItem.stack.getCount() > 1 ?
            hotbarItem.stack.getCount().toString() : null;

        const item = draw2D.item()
            .pos(x, y)
            .item(hotbarItem.stack)
            .scale(1.0)
            .overlayVisible(true)
            .overlayText(overlayText)
            .zIndex(hotbarItem.selected ? 10 : 5)
            .build();

        draw2D.addItem(item);
    });
}

// Update every tick
events.on("Tick", JavaWrapper.methodToJavaAsync(updateInventoryDisplay));
```

### Example 8: Conditional Item Creation

```javascript
const draw2D = Hud.createDraw2D();

function createConditionalItem(config) {
    const builder = draw2D.item();

    // Position validation
    if (config.x !== undefined && config.x >= 0) {
        builder.x(config.x);
    } else {
        builder.x(10); // Default position
    }

    if (config.y !== undefined && config.y >= 0) {
        builder.y(config.y);
    } else {
        builder.y(10); // Default position
    }

    // Item configuration
    if (config.itemId) {
        builder.item(config.itemId);
    } else if (config.itemStack) {
        builder.item(config.itemStack);
    } else {
        builder.item("minecraft:stone"); // Default item
    }

    // Transform configuration with defaults
    if (config.scale && config.scale > 0) {
        builder.scale(config.scale);
    } else {
        builder.scale(1.0);
    }

    if (typeof config.rotation === 'number') {
        builder.rotation(config.rotation);
    } else {
        builder.rotation(0);
    }

    // Overlay configuration
    const showOverlay = config.overlayVisible !== false; // Default to true
    builder.overlayVisible(showOverlay);

    if (config.overlayText !== undefined) {
        builder.overlayText(config.overlayText);
    }

    // Z-index configuration
    if (typeof config.zIndex === 'number') {
        builder.zIndex(config.zIndex);
    } else {
        builder.zIndex(0);
    }

    return builder.buildAndAdd();
}

// Test with different configurations
const configs = [
    { itemId: "minecraft:diamond", scale: 1.5, rotation: 45 },
    { itemId: "minecraft:emerald", scale: 0.8, overlayText: "💎" },
    { itemStack: new ItemStackHelper("minecraft:apple", 16), overlayVisible: false }
];

configs.forEach(config => createConditionalItem(config));
```

### Example 9: Item Size Variations

```javascript
const draw2D = Hud.createDraw2D();

function createSizeComparison() {
    const baseY = 50;
    const baseX = 50;
    const spacing = 60;
    const sizes = [0.5, 1.0, 1.5, 2.0];
    const labels = ["50%", "100%", "150%", "200%"];

    sizes.forEach((scale, index) => {
        const x = baseX + index * spacing;
        const y = baseY;

        // Create size label
        const label = draw2D.text()
            .pos(x, y - 15)
            .text(labels[index])
            .color(0xFFFFFF)
            .zIndex(1)
            .build();

        // Create item with scale
        const item = draw2D.item()
            .pos(x, y)
            .item("minecraft:diamond")
            .scale(scale)
            .overlayVisible(true)
            .zIndex(0)
            .build();

        draw2D.addText(label);
        draw2D.addItem(item);
    });
}

createSizeComparison();
```

## Important Notes

### Builder Pattern Benefits

1. **Type Safety:** Builder methods provide compile-time type checking for all parameters
2. **Method Chaining:** All configuration methods return the builder for fluent API usage
3. **Validation:** Parameters are validated during the build process
4. **Readability:** Method names clearly indicate what property is being set
5. **Flexibility:** Supports multiple ways to set the same property (e.g., `item()` vs `id()`)

### Item Display Properties

1. **Position:** Items are positioned using screen coordinates relative to the parent Draw2D context
2. **Scale:** Scale affects the visual size, with 1.0 being the normal 16x16 pixel size
3. **Rotation:** Rotation occurs clockwise in degrees, can be around center or origin
4. **Overlay:** Can show item count, durability, or custom text

### Item ID Format

1. **Standard Format:** `"namespace:item_name"`
2. **Common Namespace:** `minecraft` can be omitted for vanilla items
3. **Mod Items:** Use the mod's namespace (e.g., `"modname:custom_item"`)
4. **Examples:** `"diamond"`, `"minecraft:wooden_sword"`, `"thermal:energy_cell"`

### Build Method Selection

1. **`build()`:** Use when you want to create the item but add it manually later
2. **`buildAndAdd()`:** Use when you want to create and add the item in one operation (most common)

## Best Practices

1. **Method Chaining:** Use method chaining for readable and concise configuration
2. **Scale Management:** Use appropriate scale values based on display requirements
3. **Overlay Usage:** Enable overlays for items with counts or when showing custom information
4. **Z-Index Planning:** Use z-index values to control layering order
5. **Performance:** Limit the number of items with high scale values to maintain performance
6. **Error Handling:** Validate item IDs and parameters before building

## Related Classes

- [`Item`](Item.md) - Parent class that this builder creates
- [`Draw2D`](Draw2D.md) - 2D drawing context for adding items
- [`ItemStackHelper`](items-and-enchantments/ItemStackHelper.md) - Helper class for item stacks
- [`RenderElement`](RenderElement.md) - Interface that Item implements for rendering
- [`RenderElementBuilder`](RenderElementBuilder.md) - Base builder class
- [`IDraw2D`](IDraw2D.md) - Interface for 2D drawing contexts

## Version History

- **1.8.4:** Initial introduction with comprehensive item configuration support
- **Current:** Enhanced with validation and improved method chaining