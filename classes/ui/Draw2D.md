# Draw2D

The core class for creating 2D overlays and graphics on the screen. Draw2D provides comprehensive drawing capabilities including text, shapes, images, and item rendering. This is the primary way to create custom HUDs, overlays, and visual effects.

## Fields
- [Draw2D.elements](#draw2delements)
- [Draw2D.widthSupplier](#draw2dwidsupplier)
- [Draw2D.heightSupplier](#draw2dheightsupplier)
- [Draw2D.zIndex](#draw2dzindex)
- [Draw2D.visible](#draw2dvisible)
- [Draw2D.onInit](#draw2doninit)
- [Draw2D.catchInit](#draw2dcatchinit)

## Methods
- [Draw2D.getWidth](#draw2dgetwidth)
- [Draw2D.getHeight](#draw2dgetheight)
- [Draw2D.getTexts](#draw2dgettexts)
- [Draw2D.getRects](#draw2dgetrects)
- [Draw2D.getLines](#draw2dgetlines)
- [Draw2D.getItems](#draw2dgetitems)
- [Draw2D.getImages](#draw2dgetimages)
- [Draw2D.getDraw2Ds](#draw2dgetdraw2ds)
- [Draw2D.getElements](#draw2dgetelements)
- [Draw2D.removeElement](#draw2dremoveelement)
- [Draw2D.reAddElement](#draw2dreaddelement)
- [Draw2D.setVisible](#draw2dsetvisible)
- [Draw2D.isVisible](#draw2disvisible)
- [Draw2D.addDraw2D](#draw2dadddraw2d)
- [Draw2D.removeDraw2D](#draw2dremovedraw2d)
- [Draw2D.addText](#draw2daddtext)
- [Draw2D.removeText](#draw2dremovetext)
- [Draw2D.addImage](#draw2daddimage)
- [Draw2D.removeImage](#draw2dremoveimage)
- [Draw2D.addRect](#draw2daddrect)
- [Draw2D.removeRect](#draw2dremoverect)
- [Draw2D.addLine](#draw2daddline)
- [Draw2D.removeLine](#draw2dremoveline)
- [Draw2D.addItem](#draw2dadditem)
- [Draw2D.removeItem](#draw2dremoveitem)
- [Draw2D.init](#draw2dinit)
- [Draw2D.setOnInit](#draw2dsetoninit)
- [Draw2D.setOnFailInit](#draw2dsetonfailinit)
- [Draw2D.register](#draw2dregister)
- [Draw2D.unregister](#draw2dunregister)

## Fields

### Draw2D.elements
The collection of all render elements in this Draw2D overlay. Do not modify this directly.

**Type**
* `java.util.Set<RenderElement>`

### Draw2D.widthSupplier
A function that provides the width for this overlay. By default, uses the window width.

**Type**
* `IntSupplier`

### Draw2D.heightSupplier
A function that provides the height for this overlay. By default, uses the window height.

**Type**
* `IntSupplier`

### Draw2D.zIndex
The z-index (render order) of this overlay. Higher values render on top of lower values.

**Type**
* `int`

### Draw2D.visible
Controls whether this overlay is rendered.

**Type**
* `boolean`

### Draw2D.onInit
**Deprecated:** Use `setOnInit()` instead. Callback function called when the overlay is initialized.

**Type**
* `MethodWrapper<Draw2D, Object, Object, ?>`

### Draw2D.catchInit
**Deprecated:** Use `setOnFailInit()` instead. Callback function called when initialization fails.

**Type**
* `MethodWrapper<string, Object, Object, ?>`

## Methods

### Draw2D.getWidth
```js
const overlay = Hud.createDraw2D();
const width = overlay.getWidth();
Chat.log(`Overlay width: ${width}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The current width of the overlay.

### Draw2D.getHeight
```js
const overlay = Hud.createDraw2D();
const height = overlay.getHeight();
Chat.log(`Overlay height: ${height}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The current height of the overlay.

### Draw2D.getTexts
```js
const overlay = Hud.createDraw2D();
overlay.addText("Hello", 10, 10, 0xFFFFFF, true);
overlay.addText("World", 10, 30, 0xFF0000, true);

const texts = overlay.getTexts();
Chat.log(`Number of text elements: ${texts.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Text>`: A list of all text elements in the overlay.

### Draw2D.getRects
```js
const overlay = Hud.createDraw2D();
overlay.addRect(0, 0, 100, 100, 0xFF0000);
overlay.addRect(50, 50, 150, 150, 0x00FF00);

const rects = overlay.getRects();
Chat.log(`Number of rectangles: ${rects.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Rect>`: A list of all rectangle elements in the overlay.

### Draw2D.getLines
```js
const overlay = Hud.createDraw2D();
overlay.addLine(0, 0, 100, 100, 0xFFFFFF);
overlay.addLine(50, 0, 50, 100, 0xFF0000);

const lines = overlay.getLines();
Chat.log(`Number of lines: ${lines.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Line>`: A list of all line elements in the overlay.

### Draw2D.getItems
```js
const overlay = Hud.createDraw2D();
overlay.addItem(10, 10, "minecraft:diamond");
overlay.addItem(30, 10, "minecraft:gold_ingot");

const items = overlay.getItems();
Chat.log(`Number of item elements: ${items.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Item>`: A list of all item elements in the overlay.

### Draw2D.getImages
```js
const overlay = Hud.createDraw2D();
overlay.addImage(10, 10, 16, 16, "minecraft:textures/item/diamond.png", 0, 0, 16, 16, 16, 16);

const images = overlay.getImages();
Chat.log(`Number of images: ${images.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Image>`: A list of all image elements in the overlay.

### Draw2D.getDraw2Ds
```js
const overlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();
overlay.addDraw2D(childOverlay, 10, 10, 100, 100);

const childDraw2Ds = overlay.getDraw2Ds();
Chat.log(`Number of child overlays: ${childDraw2Ds.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Draw2DElement>`: A list of all nested Draw2D elements.

### Draw2D.getElements
```js
const overlay = Hud.createDraw2D();
overlay.addText("Hello", 10, 10, 0xFFFFFF, true);
overlay.addRect(0, 0, 50, 50, 0xFF0000);

const elements = overlay.getElements();
Chat.log(`Total elements: ${elements.size()}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<RenderElement>`: A list of all render elements in the overlay.

### Draw2D.removeElement
```js
const overlay = Hud.createDraw2D();
const text = overlay.addText("Temporary", 10, 10, 0xFFFFFF, true);

// Remove the text element
overlay.removeElement(text);
```

**Params**
1. `element: RenderElement`: The element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.reAddElement
```js
const overlay = Hud.createDraw2D();
let text = overlay.addText("Hello", 10, 10, 0xFFFFFF, true);

overlay.removeElement(text);
// Later, add it back
text = overlay.reAddElement(text);
```

**Params**
1. `element: RenderElement`: The element to add back to the overlay.

**Returns**
* `RenderElement`: The element that was added (or null if failed).

### Draw2D.setVisible
```js
const overlay = Hud.createDraw2D();
overlay.addText("Visible", 10, 10, 0xFFFFFF, true);
overlay.register();

// Hide the overlay
overlay.setVisible(false);

// Show the overlay again
overlay.setVisible(true);
```

**Params**
1. `visible: boolean`: Whether to render this overlay.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.isVisible
```js
const overlay = Hud.createDraw2D();
if (overlay.isVisible()) {
    Chat.log("Overlay is visible");
} else {
    Chat.log("Overlay is hidden");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the overlay is visible, `false` if hidden.

### Draw2D.addDraw2D
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();
childOverlay.addText("Child content", 10, 10, 0xFFFFFF, true);

// Add child overlay to parent
parentOverlay.addDraw2D(childOverlay, 50, 50, 200, 200);
```

**Params**
1. `draw2D: Draw2D`: The Draw2D overlay to add.
2. `x: int`: X position to place the child overlay.
3. `y: int`: Y position to place the child overlay.
4. `width: int`: Width of the child overlay area.
5. `height: int`: Height of the child overlay area.

**Returns**
* `Draw2DElement`: The element representing the nested overlay.

### Draw2D.removeDraw2D
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();
const childElement = parentOverlay.addDraw2D(childOverlay, 50, 50, 200, 200);

// Remove the child overlay
parentOverlay.removeDraw2D(childElement);
```

**Params**
1. `draw2D: Draw2DElement`: The Draw2D element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.addText
```js
const overlay = Hud.createDraw2D();

// Simple text
overlay.addText("Hello World", 10, 10, 0xFFFFFF, true);

// Text with z-index
overlay.addText("On Top", 10, 30, 0xFF0000, 10, true);

// Scaled and rotated text
overlay.addText("Rotated", 10, 50, 0x00FF00, false, 2.0, Math.PI / 4); // 2x scale, 45 degree rotation

// Using TextHelper
overlay.addText(TextHelper.gold("Golden Text"), 10, 70, 0xFFFFFF, true);
```

**Params**
1. `text: string | TextHelper`: The text content.
2. `x: int`: X position.
3. `y: int`: Y position.
4. `color: int`: Text color (RGB).
5. `zIndex: int = 0`: Render order.
6. `shadow: boolean = true`: Whether to draw text shadow.
7. `scale: double = 1.0`: Text scale factor.
8. `rotation: double = 0.0`: Rotation in radians.

**Returns**
* `Text`: The created text element.

#### Overloads
- `addText(text, x, y, color, shadow)`
- `addText(text, x, y, color, zIndex, shadow)`
- `addText(text, x, y, color, shadow, scale, rotation)`
- `addText(text, x, y, color, zIndex, shadow, scale, rotation)`

### Draw2D.removeText
```js
const overlay = Hud.createDraw2D();
const text = overlay.addText("To remove", 10, 10, 0xFFFFFF, true);
overlay.removeText(text);
```

**Params**
1. `text: Text`: The text element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.addImage
```js
const overlay = Hud.createDraw2D();

// Basic image
overlay.addImage(10, 10, 16, 16, "minecraft:textures/item/diamond.png", 0, 0, 16, 16, 16, 16);

// Image with z-index and rotation
overlay.addImage(50, 10, 32, 32, 1, "minecraft:textures/item/gold_ingot.png", 0, 0, 16, 16, 16, 16, Math.PI / 4);

// Image with color tint
overlay.addImage(90, 10, 16, 16, 2, 0xFF0000, "minecraft:textures/item/emerald.png", 0, 0, 16, 16, 16, 16, 0);

// Using custom texture
const customTexture = Hud.createTexture("my_texture.png", "my_tex");
overlay.addImage(10, 50, 64, 64, "my_texture", 0, 0, 64, 64, 64, 64);
```

**Params**
1. `x: int`: X position.
2. `y: int`: Y position.
3. `width: int`: Image width.
4. `height: int`: Image height.
5. `zIndex: int = 0`: Render order.
6. `color: int = 0xFFFFFFFF`: Color tint.
7. `id: string`: Texture identifier.
8. `imageX: int`: Texture X offset.
9. `imageY: int`: Texture Y offset.
10. `regionWidth: int`: Width of texture region.
11. `regionHeight: int`: Height of texture region.
12. `textureWidth: int`: Total texture width.
13. `textureHeight: int`: Total texture height.
14. `rotation: double = 0.0`: Rotation in radians.

**Returns**
* `Image`: The created image element.

#### Overloads
- `addImage(x, y, width, height, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight)`
- `addImage(x, y, width, height, zIndex, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight)`
- `addImage(x, y, width, height, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight, rotation)`
- `addImage(x, y, width, height, zIndex, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight, rotation)`
- `addImage(x, y, width, height, zIndex, color, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight, rotation)`
- `addImage(x, y, width, height, zIndex, alpha, color, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight, rotation)`

### Draw2D.removeImage
```js
const overlay = Hud.createDraw2D();
const image = overlay.addImage(10, 10, 16, 16, "minecraft:textures/item/diamond.png", 0, 0, 16, 16, 16, 16);
overlay.removeImage(image);
```

**Params**
1. `image: Image`: The image element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.addRect
```js
const overlay = Hud.createDraw2D();

// Simple rectangle
overlay.addRect(10, 10, 100, 50, 0xFF0000); // Red rectangle

// Rectangle with alpha
overlay.addRect(120, 10, 100, 50, 0x00FF00, 128); // Semi-transparent green

// Rectangle with rotation
overlay.addRect(230, 10, 100, 50, 0x0000FF, 255, Math.PI / 8, 1); // Blue rectangle, rotated 22.5 degrees, z-index 1

// Filled rectangle (same color for all edges)
overlay.addRect(10, 70, 200, 100, 0x808080); // Gray filled rectangle
```

**Params**
1. `x1: int`: Left coordinate.
2. `y1: int`: Top coordinate.
3. `x2: int`: Right coordinate.
4. `y2: int`: Bottom coordinate.
5. `color: int`: Rectangle color.
6. `alpha: int = 255`: Transparency (0-255).
7. `rotation: double = 0.0`: Rotation in radians.
8. `zIndex: int = 0`: Render order.

**Returns**
* `Rect`: The created rectangle element.

#### Overloads
- `addRect(x1, y1, x2, y2, color)`
- `addRect(x1, y1, x2, y2, color, alpha)`
- `addRect(x1, y1, x2, y2, color, alpha, rotation)`
- `addRect(x1, y1, x2, y2, color, alpha, rotation, zIndex)`

### Draw2D.removeRect
```js
const overlay = Hud.createDraw2D();
const rect = overlay.addRect(10, 10, 100, 100, 0xFF0000);
overlay.removeRect(rect);
```

**Params**
1. `rect: Rect`: The rectangle element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.addLine
```js
const overlay = Hud.createDraw2D();

// Simple line
overlay.addLine(10, 10, 100, 100, 0xFFFFFF); // White diagonal line

// Line with z-index and width
overlay.addLine(10, 20, 100, 110, 0xFF0000, 1, 2.0); // Red line, z-index 1, 2 pixel width

// Line with rotation
overlay.addLine(10, 30, 100, 120, 0x00FF00, 2, 3.0, Math.PI / 6); // Green line, z-index 2, 3 pixel width, 30 degree rotation
```

**Params**
1. `x1: int`: Start X coordinate.
2. `y1: int`: Start Y coordinate.
3. `x2: int`: End X coordinate.
4. `y2: int`: End Y coordinate.
5. `color: int`: Line color.
6. `zIndex: int = 0`: Render order.
7. `width: double = 1.0`: Line thickness.
8. `rotation: double = 0.0`: Rotation in radians.

**Returns**
* `Line`: The created line element.

#### Overloads
- `addLine(x1, y1, x2, y2, color)`
- `addLine(x1, y1, x2, y2, color, zIndex)`
- `addLine(x1, y1, x2, y2, color, width)`
- `addLine(x1, y1, x2, y2, color, zIndex, width)`
- `addLine(x1, y1, x2, y2, color, width, rotation)`
- `addLine(x1, y1, x2, y2, color, zIndex, width, rotation)`

### Draw2D.removeLine
```js
const overlay = Hud.createDraw2D();
const line = overlay.addLine(10, 10, 100, 100, 0xFFFFFF);
overlay.removeLine(line);
```

**Params**
1. `line: Line`: The line element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.addItem
```js
const overlay = Hud.createDraw2D();

// Item by ID
overlay.addItem(10, 10, "minecraft:diamond");

// Item with z-index and overlay flag
overlay.addItem(30, 10, 2, "minecraft:gold_ingot", false);

// Item with scale and rotation
overlay.addItem(50, 10, 3, "minecraft:emerald", true, 2.0, Math.PI / 4);

// Item from ItemStack
const itemStack = Player.getPlayer().getMainHandStack();
if (itemStack) {
    overlay.addItem(10, 50, itemStack, true, 1.5, 0);
}
```

**Params**
1. `x: int`: X position.
2. `y: int`: Y position.
3. `zIndex: int`: Render order.
4. `id: string | ItemStackHelper`: Item ID or ItemStack.
5. `overlay: boolean = true`: Whether to draw overlay (durability, etc.).
6. `scale: double = 1.0`: Item scale factor.
7. `rotation: double = 0.0`: Rotation in radians.

**Returns**
* `Item`: The created item element.

#### Overloads
- `addItem(x, y, id)`
- `addItem(x, y, zIndex, id)`
- `addItem(x, y, id, overlay)`
- `addItem(x, y, zIndex, id, overlay)`
- `addItem(x, y, id, overlay, scale, rotation)`
- `addItem(x, y, zIndex, id, overlay, scale, rotation)`
- `addItem(x, y, itemStack)`
- `addItem(x, y, zIndex, itemStack)`
- `addItem(x, y, itemStack, overlay)`
- `addItem(x, y, zIndex, itemStack, overlay)`
- `addItem(x, y, itemStack, overlay, scale, rotation)`
- `addItem(x, y, zIndex, itemStack, overlay, scale, rotation)`

### Draw2D.removeItem
```js
const overlay = Hud.createDraw2D();
const item = overlay.addItem(10, 10, "minecraft:diamond");
overlay.removeItem(item);
```

**Params**
1. `item: Item`: The item element to remove.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.init
```js
const overlay = Hud.createDraw2D();

// This is called automatically when register() is called
// or when the window is resized
overlay.init();
```

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
- Clears all existing elements
- Calls the onInit callback if set
- Initializes all child Draw2D elements
- Called automatically by `register()`

### Draw2D.setOnInit
```js
const overlay = Hud.createDraw2D();

overlay.setOnInit(JavaWrapper.methodToJava((draw2d) => {
    // This is called when the overlay is initialized
    draw2d.addText("HUD Initialized", 10, 10, 0x00FF00, true);
    draw2d.addRect(5, 5, 200, 30, 0x404040, 128);
}));
```

**Params**
1. `onInit: MethodWrapper<Draw2D, Object, Object, ?>`: Function called during initialization.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.setOnFailInit
```js
const overlay = Hud.createDraw2D();

overlay.setOnFailInit(JavaWrapper.methodToJava((errorMsg) => {
    Chat.log(`Overlay initialization failed: ${errorMsg}`);
}));
```

**Params**
1. `catchInit: MethodWrapper<string, Object, Object, ?>`: Function called if initialization fails.

**Returns**
* `Draw2D`: Self for chaining.

### Draw2D.register
```js
const overlay = Hud.createDraw2D();
overlay.addText("Hello HUD!", 10, 10, 0xFFFFFF, true);

// Register the overlay to make it visible
overlay.register();

// Later, to remove it:
// overlay.unregister();
```

**Params**
* `(none)`

**Returns**
* `Draw2D`: Self for chaining.

**Notes**
- Initializes the overlay if needed
- Adds the overlay to the render list
- Makes the overlay visible on screen

### Draw2D.unregister
```js
const overlay = Hud.createDraw2D();
overlay.register();

// Remove the overlay from rendering
overlay.unregister();
```

**Params**
* `(none)`

**Returns**
* `Draw2D`: Self for chaining.

**Notes**
- Removes the overlay from the render list
- Overlay is no longer visible but can be re-registered

## Examples

### Basic HUD
```js
function createBasicHUD() {
    const hud = Hud.createDraw2D();

    hud.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Add background
        draw2d.addRect(5, 5, 200, 80, 0x000000, 180); // Semi-transparent black background

        // Add player info
        draw2d.addText("Player HUD", 10, 10, 0xFFFFFF, true);
        draw2d.addText(`Health: ${Player.getHealth()}/${Player.getMaxHealth()}`, 10, 25, 0xFF0000, true);
        draw2d.addText(`Hunger: ${Player.getHunger()}/20`, 10, 40, 0xFFFF00, true);
        draw2d.addText(`Level: ${Player.getLevel()}`, 10, 55, 0x00FF00, true);
    }));

    hud.register();
    return hud;
}

const basicHUD = createBasicHUD();
```

### Real-time Status Display
```js
function createStatusHUD() {
    const hud = Hud.createDraw2D();

    function updateHUD() {
        // Clear previous elements
        hud.getElements().forEach(element => hud.removeElement(element));

        // Background
        hud.addRect(5, 5, 250, 120, 0x000000, 200);

        // Player status
        const player = Player.getPlayer();
        if (player) {
            hud.addText("Status Monitor", 10, 10, 0xFFFFFF, true);
            hud.addText(`Health: ${player.getHealth()}/${player.getMaxHealth()}`, 10, 25, 0xFF0000, true);
            hud.addText(`Hunger: ${player.getHunger()}/20`, 10, 40, 0xFFFF00, true);
            hud.addText(`XP Level: ${player.getLevel()}`, 10, 55, 0x00FF00, true);
            hud.addText(`Position: ${Math.floor(player.getX())}, ${Math.floor(player.getY())}, ${Math.floor(player.getZ())}`, 10, 70, 0x00FFFF, true);
            hud.addText(`Dimension: ${player.getDimension().getId()}`, 10, 85, 0xFF00FF, true);

            // Current held item
            const heldItem = player.getMainHandStack();
            if (heldItem) {
                hud.addText(`Holding: ${heldItem.getName().getString()}`, 10, 100, 0xFFFFFF, true);
            }
        }

        // FPS and time
        hud.addText(`FPS: ${Client.getFPS()}`, 130, 25, 0xFFFFFF, true);
        hud.addText(`Time: ${World.getTime() % 24000}`, 130, 40, 0xFFFFFF, true);
    }

    // Update every second
    setInterval(() => updateHUD(), 1000);

    // Initial update
    updateHUD();

    hud.register();
    return hud;
}

const statusHUD = createStatusHUD();
```

### Inventory Viewer
```js
function createInventoryHUD() {
    const hud = Hud.createDraw2D();

    function drawInventory() {
        // Clear previous elements
        hud.getElements().forEach(element => hud.removeElement(element));

        // Background
        hud.addRect(5, 5, 300, 100, 0x000000, 180);

        // Title
        hud.addText("Hotbar Inventory", 10, 10, 0xFFFFFF, true);

        // Get player inventory
        const player = Player.getPlayer();
        if (player && player.getInventory()) {
            const inventory = player.getInventory();

            // Draw hotbar items (slots 0-8)
            for (let i = 0; i < 9; i++) {
                const x = 10 + i * 32;
                const y = 30;

                // Draw slot background
                hud.addRect(x, y, x + 30, y + 30, 0x404040);

                // Draw item if exists
                const item = inventory.getStack(i);
                if (item) {
                    hud.addItem(x + 2, y + 2, item, false);
                }

                // Draw slot number
                hud.addText(String(i + 1), x + 10, y + 35, 0xCCCCCC, true);
            }
        }
    }

    // Update when inventory changes
    setInterval(() => drawInventory(), 1000);
    drawInventory();

    hud.register();
    return hud;
}

const inventoryHUD = createInventoryHUD();
```

### Mini-Map
```js
function createMiniMap() {
    const hud = Hud.createDraw2D();
    const mapSize = 150;
    const centerX = Hud.getWindowWidth() - mapSize - 10;
    const centerY = 10;

    hud.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Map background
        draw2d.addRect(centerX, centerY, centerX + mapSize, centerY + mapSize, 0x000000, 200);
        draw2d.addRect(centerX, centerY, centerX + mapSize, centerY + mapSize, 0xFFFFFF); // Border

        // Center cross
        const mapCenterX = centerX + mapSize / 2;
        const mapCenterY = centerY + mapSize / 2;
        draw2d.addLine(mapCenterX - 5, mapCenterY, mapCenterX + 5, mapCenterY, 0xFF0000, 10, 2.0);
        draw2d.addLine(mapCenterX, mapCenterY - 5, mapCenterX, mapCenterY + 5, 0xFF0000, 10, 2.0);

        // Map label
        draw2d.addText("Mini-Map", centerX + 5, centerY + mapSize + 5, 0xFFFFFF, true);
    }));

    // Update player position on map
    setInterval(() => {
        const player = Player.getPlayer();
        if (player) {
            // Simple scaling (you'd want better scaling in practice)
            const scale = 0.1;
            const playerX = centerX + mapSize / 2 + player.getX() * scale;
            const playerZ = centerY + mapSize / 2 + player.getZ() * scale;

            // Add player dot (this would need more complex logic for proper mini-map)
            hud.addRect(playerX - 2, playerZ - 2, playerX + 2, playerZ + 2, 0x00FF00, 11, 0);
        }
    }, 100);

    hud.register();
    return hud;
}

const miniMap = createMiniMap();
```

**Notes**
- Draw2D is the foundation for creating custom HUDs and overlays
- Elements are rendered in order of their z-index values
- Use `register()` to make the overlay visible, `unregister()` to hide it
- The `setOnInit` callback is perfect for setting up initial elements
- Elements can be dynamically added and removed for animated effects
- Coordinates are screen coordinates (0, 0 is top-left)
- Colors use RGB format, use alpha for transparency
- Use Time.time() or Client.getTick() for real-time updates
- Nested Draw2D elements can be used for complex layouts
- Remember to unregister overlays when they're no longer needed to prevent memory leaks