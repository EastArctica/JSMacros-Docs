# Item

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Item`

**Implements:** `RenderElement`, `Alignable<Item>`

**Since:** JsMacros 1.0.5

The `Item` class is a 2D rendering component in JSMacros that represents a Minecraft item that can be drawn on screen. It supports customizable positioning, scaling, rotation, overlay text, and item count display. Item objects are typically created through `Draw2D` methods or by using the constructor directly for custom HUD elements, item displays, and inventory overlays.

## Overview

The `Item` class provides a flexible way to draw Minecraft items on screen with various properties:
- Customizable position and z-index for layering
- Scaling support for different item sizes
- Rotation capabilities with center-based rotation option
- Optional overlay display showing item count, durability, or custom text
- Integration with the Draw2D rendering system
- Support for both ItemStackHelper and item IDs

## Constructors

### `new Item(x, y, zIndex, id, overlay, scale, rotation)`
Creates a new Item with the specified item ID and rendering properties.

**Parameters:**
| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| x         | int     | X coordinate on screen                    |
| y         | int     | Y coordinate on screen                    |
| zIndex    | int     | Z-index for rendering order              |
| id        | string  | Item ID (e.g., "minecraft:diamond_sword") |
| overlay   | boolean | Whether to show overlay (count/durability)|
| scale     | double  | Scale factor (1.0 = normal size)         |
| rotation  | float   | Rotation in degrees (clockwise)          |

**Example:**
```javascript
// Create a diamond sword at position (100, 50)
const sword = new Item(100, 50, 0, "minecraft:diamond_sword", true, 1.0, 0);
```

### `new Item(x, y, zIndex, itemStack, overlay, scale, rotation)`
Creates a new Item using an ItemStackHelper.

**Parameters:**
| Parameter | Type            | Description                              |
| --------- | --------------- | ---------------------------------------- |
| x         | int             | X coordinate on screen                    |
| y         | int             | Y coordinate on screen                    |
| zIndex    | int             | Z-index for rendering order              |
| itemStack | ItemStackHelper | The item stack to display                |
| overlay   | boolean         | Whether to show overlay (count/durability)|
| scale     | double          | Scale factor (1.0 = normal size)         |
| rotation  | float           | Rotation in degrees (clockwise)          |

**Example:**
```javascript
const itemStack = new ItemStackHelper("minecraft:apple", 16);
const apple = new Item(50, 100, 0, itemStack, true, 1.5, 45);
```

### `new Item(x, y, zIndex, itemStack, overlay, scale, rotation, ovText)`
Creates a new Item with custom overlay text.

**Parameters:**
| Parameter | Type            | Description                              |
| --------- | --------------- | ---------------------------------------- |
| x         | int             | X coordinate on screen                    |
| y         | int             | Y coordinate on screen                    |
| zIndex    | int             | Z-index for rendering order              |
| itemStack | ItemStackHelper | The item stack to display                |
| overlay   | boolean         | Whether to show overlay (count/durability)|
| scale     | double          | Scale factor (1.0 = normal size)         |
| rotation  | float           | Rotation in degrees (clockwise)          |
| ovText    | string          | Custom overlay text (null for default)   |

**Example:**
```javascript
const itemStack = new ItemStackHelper("minecraft:emerald");
const emerald = new Item(200, 150, 0, itemStack, true, 1.0, 0, "Custom");
```

## Fields

## Methods

## Builder Pattern

The Item class provides a Builder for more fluent configuration (since 1.8.4):

### Builder Methods

## Usage Examples

### Basic Item Display
```javascript
const draw2D = Hud.createDraw2D();

// Create a simple diamond item
const diamond = new Item(100, 50, 0, "minecraft:diamond", true, 1.0, 0);
draw2D.addItem(diamond);
```

### Using Builder Pattern
```javascript
const draw2D = Hud.createDraw2D();

// Create item using builder
const sword = draw2D.item()
    .pos(200, 100)                    // Set position
    .item("minecraft:diamond_sword")  // Set item
    .scale(1.5)                       // Make 150% size
    .rotation(45)                     // Rotate 45 degrees
    .overlayVisible(true)             // Show durability/count
    .zIndex(10)                       // High z-index
    .build();                         // Create the item
```

### Custom Item HUD
```javascript
const draw2D = Hud.createDraw2D();

function displayItemInfo(itemId, x, y, customText) {
    // Create background
    const bg = draw2D.rect()
        .pos(x - 2, y - 2)
        .size(20, 20)
        .color(0x80000000)
        .fill(true)
        .build();

    // Create item
    const item = draw2D.item()
        .pos(x, y)
        .item(itemId)
        .scale(1.0)
        .overlayText(customText)
        .overlayVisible(true)
        .build();

    draw2D.addRect(bg);
    draw2D.addItem(item);
}

// Display current hotbar item
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    draw2D.clear();

    const player = Player.getPlayer();
    if (player && player.getInventory()) {
        const hotbarSlot = player.getInventory().selectedSlot;
        const itemStack = player.getInventory().getStack(hotbarSlot);

        if (itemStack && !itemStack.isEmpty()) {
            const itemId = itemStack.getItemId();
            const count = itemStack.getCount();
            displayItemInfo(itemId, 10, 10, count > 1 ? count.toString() : "");
        }
    }
}));
```

### Animated Item Display
```javascript
const draw2D = Hud.createDraw2D();
let animationTime = 0;

function createAnimatedItem() {
    const centerX = Hud.getScreenWidth() / 2;
    const centerY = Hud.getScreenHeight() / 2;

    // Calculate animation values
    const scale = 1.0 + Math.sin(animationTime * 0.05) * 0.3;
    const rotation = animationTime * 2;

    // Create rotating, scaling item
    const item = draw2D.item()
        .pos(centerX - 8, centerY - 8)  // Center the 16x16 item
        .item("minecraft:emerald")
        .scale(scale)
        .rotation(rotation)
        .overlayVisible(true)
        .overlayText("✨")
        .zIndex(100)
        .build();

    draw2D.addItem(item);
}

events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    draw2D.clear();
    animationTime++;
    createAnimatedItem();
}));
```

### Item Grid Display
```javascript
const draw2D = Hud.createDraw2D();

function createItemGrid(items, startX, startY, spacing) {
    items.forEach((itemId, index) => {
        const row = Math.floor(index / 5);
        const col = index % 5;

        const x = startX + col * spacing;
        const y = startY + row * spacing;

        const item = draw2D.item()
            .pos(x, y)
            .item(itemId)
            .scale(1.0)
            .overlayVisible(true)
            .build();

        draw2D.addItem(item);
    });
}

// Display a grid of valuable items
const valuableItems = [
    "minecraft:diamond",
    "minecraft:emerald",
    "minecraft:gold_ingot",
    "minecraft:iron_ingot",
    "minecraft:coal",
    "minecraft:redstone",
    "minecraft:lapis_lazuli",
    "minecraft:quartz",
    "minecraft:amethyst_shard",
    "minecraft:gold_nugget"
];

createItemGrid(valuableItems, 50, 50, 25);
```

### Item Display with Durability
```javascript
const draw2D = Hud.createDraw2D();

function createDurabilityDisplay() {
    const player = Player.getPlayer();
    if (!player) return;

    const inventory = player.getInventory();
    if (!inventory) return;

    let yOffset = 10;

    // Display items with durability
    for (let i = 0; i < inventory.getSize(); i++) {
        const itemStack = inventory.getStack(i);
        if (itemStack && !itemStack.isEmpty() && itemStack.isDamageable()) {
            const maxDamage = itemStack.getMaxDamage();
            const currentDamage = itemStack.getDamage();
            const durabilityPercent = (maxDamage - currentDamage) / maxDamage;

            // Only show damaged items
            if (durabilityPercent < 1.0) {
                const x = 10;
                const y = yOffset;

                // Create item
                const item = draw2D.item()
                    .pos(x, y)
                    .item(itemStack)
                    .scale(0.8)
                    .overlayVisible(true)
                    .zIndex(10)
                    .build();

                // Create durability bar background
                const bgBar = draw2D.rect()
                    .pos(x + 20, y + 12)
                    .size(40, 2)
                    .color(0xFF000000)
                    .fill(true)
                    .zIndex(5)
                    .build();

                // Create durability bar (color based on remaining durability)
                const barColor = durabilityPercent > 0.5 ? 0xFF00FF00 :
                               durabilityPercent > 0.25 ? xFFFFFF00 : 0xFFFF0000;

                const fgBar = draw2D.rect()
                    .pos(x + 20, y + 12)
                    .size(Math.floor(40 * durabilityPercent), 2)
                    .color(barColor)
                    .fill(true)
                    .zIndex(6)
                    .build();

                // Create text showing durability percentage
                const text = draw2D.text()
                    .pos(x + 65, y + 10)
                    .text(`${Math.floor(durabilityPercent * 100)}%`)
                    .color(0xFFFFFFFF)
                    .zIndex(15)
                    .build();

                draw2D.addItem(item);
                draw2D.addRect(bgBar);
                draw2D.addRect(fgBar);
                draw2D.addText(text);

                yOffset += 25;
            }
        }
    }
}

events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    draw2D.clear();
    createDurabilityDisplay();
}));
```

## Item ID Format

Item IDs should be formatted as Minecraft resource identifiers:

- **Format:** `"namespace:item_name"`
- **Common namespaces:** `minecraft` (can be omitted), various mod namespaces
- **Examples:**
  - `"minecraft:diamond"` or `"diamond"`
  - `"minecraft:wooden_sword"`
  - `"modname:custom_item"`

## Scale and Size

- **Default size:** 16x16 pixels (base Minecraft item size)
- **Scale multiplier:** Applied to the default size
- **Common scales:**
  - 0.5 = Half size (8x8)
  - 1.0 = Normal size (16x16)
  - 1.5 = 150% size (24x24)
  - 2.0 = Double size (32x32)

## Overlay Behavior

When `overlay` is true, the following is displayed:
- **Item count** for stacks with more than 1 item
- **Durability bar** for damageable items
- **Custom overlay text** if set via `setOverlayText()`

## Rotation

- **Angle measured in degrees** (0-360)
- **Clockwise rotation** (positive values rotate clockwise)
- **Center rotation option:** When `rotateCenter` is true, rotation happens around the item's center point rather than the top-left corner
- **Rotation wrapping:** Angles are automatically wrapped to the 0-360 range

## Z-Index

- **Higher values render on top** of items with lower z-index
- **Negative values** are supported and render behind positive values
- **Default value:** 0
- **Common usage:** Background items (negative), foreground items (positive)

## Important Notes

1. **Thread Safety:** Item objects should be created and modified on the main render thread. Use event listeners or scheduled tasks for updates.

2. **Performance:** Creating many Item objects with high scale values can impact performance. Use reasonable scales and limit the number of items rendered simultaneously.

3. **Memory Management:** Item objects are managed by their parent Draw2D context. Clear the context when done to prevent memory leaks.

4. **Item Validation:** Invalid item IDs will result in empty/missing item displays. Always verify item IDs are correct.

5. **Scale Limits:** Scale cannot be set to 0 as it would make the item invisible. Very small or very large scales may cause rendering issues.

6. **Overlay Text:** Custom overlay text takes priority over default item count display. Set to null or empty string to use default behavior.

7. **Rendering Context:** Items must be added to a Draw2D context to be rendered. They are not automatically visible.

8. **Item Updates:** To change an item's properties after creation, use the setter methods. The changes will be reflected on the next render frame.

## Related Classes

- `ItemStackHelper` - Helper class for working with item stacks
- `Draw2D` - 2D drawing context for adding items to the HUD
- `RenderElement` - Interface that Item implements for rendering
- `Alignable` - Interface for alignment functionality
- `Item.Builder` - Builder class for fluent item creation
- `IDraw2D` - Interface for 2D drawing contexts

## Version History

- **1.0.5:** Initial release with basic item rendering
- **1.2.0:** Added overlay and overlay text support
- **1.2.6:** Added scale and rotation functionality
- **1.8.4:** Added Builder pattern, comprehensive getter/setter methods, and improved positioning
- **Current:** Enhanced with comprehensive method set and improved rendering capabilities

