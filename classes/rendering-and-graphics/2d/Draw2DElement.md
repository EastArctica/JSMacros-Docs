# Draw2DElement

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Draw2DElement`

**Implements:** `RenderElement`, `Alignable<Draw2DElement>`

**Since:** `1.8.4`

The `Draw2DElement` class is a rendering component that wraps a `Draw2D` instance and provides it with positioning, scaling, rotation, and z-indexing capabilities. This class allows you to treat a `Draw2D` object as a transformable element within a parent container, enabling complex layouts and animations.

Draw2DElement acts as a bridge between the powerful 2D drawing capabilities of `Draw2D` and the flexible positioning system of render components, making it possible to create sophisticated HUDs, overlays, and interactive visual interfaces.

**Key Features:**
- **Position Control:** Precise x/y positioning with parent-relative coordinates
- **Scaling:** Dynamic scaling with size constraints
- **Rotation:** Clockwise rotation with optional center-point rotation
- **Z-Indexing:** Layer ordering control for overlapping elements
- **Parent Integration:** Seamless integration with IDraw2D parent containers
- **Alignment Support:** Built-in alignment utilities for easy positioning

## Table of Contents

- [Constructors](#constructors)
- [Fields](#fields)
- [Methods](#methods)
- [Builder Class](#builder-class)
- [Usage Examples](#usage-examples)

## Fields

### Public Fields

#### `draw2D`
**Type:** `Draw2D`

The internal Draw2D instance that this element wraps. This contains the actual drawing content that will be rendered with the element's transformations applied.

#### `parent`
**Type:** `IDraw2D<?> | null`

The parent container that this element belongs to. Can be `null` if the element has not been added to a parent yet.

#### `x`
**Type:** `int`

The x-coordinate of this element relative to its parent container.

#### `y`
**Type:** `int`

The y-coordinate of this element relative to its parent container.

#### `width`
**Type:** `IntSupplier`

A supplier function that returns the width of this element. This allows for dynamic sizing based on parent dimensions or other factors.

#### `height`
**Type:** `IntSupplier`

A supplier function that returns the height of this element. This allows for dynamic sizing based on parent dimensions or other factors.

#### `scale`
**Type:** `float`

The scale factor applied to this element. A value of 1.0 means no scaling, 2.0 means double size, 0.5 means half size.

#### `rotation`
**Type:** `float`

The clockwise rotation angle in degrees applied to this element.

#### `rotateCenter`
**Type:** `boolean`

Whether the element should rotate around its center point. If `false`, rotation occurs around the origin (top-left corner).

#### `zIndex`
**Type:** `int`

The z-index determining rendering order. Higher values are rendered on top of lower values.

## Methods

### Draw2D Access

#### `getDraw2D()`
**Returns:** `Draw2D`

Returns the internal Draw2D instance that this element is wrapping.

```js
const element = // ... obtain Draw2DElement
const internalDraw2D = element.getDraw2D();

// You can now add elements to the internal Draw2D
internalDraw2D.addText("Hello World!", 10, 10, 0xFFFFFF, true);
```

### Position Control

#### `setX(int x)`
**Parameters:**
- `x` (`int`): The new x-coordinate

**Returns:** `Draw2DElement` - This element for method chaining

Sets the x-position of this element relative to its parent.

```js
const element = // ... obtain Draw2DElement
element.setX(100); // Move to x=100
```

#### `getX()`
**Returns:** `int` - The current x-coordinate

Gets the current x-position of this element.

```js
const element = // ... obtain Draw2DElement
const x = element.getX();
Chat.log(`Element X position: ${x}`);
```

#### `setY(int y)`
**Parameters:**
- `y` (`int`): The new y-coordinate

**Returns:** `Draw2DElement` - This element for method chaining

Sets the y-position of this element relative to its parent.

```js
const element = // ... obtain Draw2DElement
element.setY(200); // Move to y=200
```

#### `getY()`
**Returns:** `int` - The current y-coordinate

Gets the current y-position of this element.

```js
const element = // ... obtain Draw2DElement
const y = element.getY();
Chat.log(`Element Y position: ${y}`);
```

#### `setPos(int x, int y)`
**Parameters:**
- `x` (`int`): The new x-coordinate
- `y` (`int`): The new y-coordinate

**Returns:** `Draw2DElement` - This element for method chaining

Sets both x and y positions simultaneously.

```js
const element = // ... obtain Draw2DElement
element.setPos(50, 75); // Move to (50, 75)
```

### Size Control

#### `setWidth(int width)`
**Parameters:**
- `width` (`int`): The new width (must be non-negative)

**Returns:** `Draw2DElement` - This element for method chaining

**Throws:** `IllegalArgumentException` if width is negative

Sets the width of this element and creates a fixed-size supplier.

```js
const element = // ... obtain Draw2DElement
element.setWidth(200); // Set width to 200 pixels
```

#### `getWidth()`
**Returns:** `int` - The current width

Gets the current width of this element by evaluating the width supplier.

```js
const element = // ... obtain Draw2DElement
const width = element.getWidth();
Chat.log(`Element width: ${width}px`);
```

#### `setHeight(int height)`
**Parameters:**
- `height` (`int`): The new height (must be non-negative)

**Returns:** `Draw2DElement` - This element for method chaining

**Throws:** `IllegalArgumentException` if height is negative

Sets the height of this element and creates a fixed-size supplier.

```js
const element = // ... obtain Draw2DElement
element.setHeight(150); // Set height to 150 pixels
```

#### `getHeight()`
**Returns:** `int` - The current height

Gets the current height of this element by evaluating the height supplier.

```js
const element = // ... obtain Draw2DElement
const height = element.getHeight();
Chat.log(`Element height: ${height}px`);
```

#### `setSize(int width, int height)`
**Parameters:**
- `width` (`int`): The new width
- `height` (`int`): The new height

**Returns:** `Draw2DElement` - This element for method chaining

Convenience method to set both width and height simultaneously.

```js
const element = // ... obtain Draw2DElement
element.setSize(300, 200); // Set size to 300x200 pixels
```

### Transform Control

#### `setScale(double scale)`
**Parameters:**
- `scale` (`double`): The new scale factor (must be greater than 0)

**Returns:** `Draw2DElement` - This element for method chaining

**Throws:** `IllegalArgumentException` if scale is not positive

Sets the scale factor for this element. Scale affects both size and visual appearance.

```js
const element = // ... obtain Draw2DElement
element.setScale(1.5); // Make element 50% larger
element.setScale(0.5); // Make element 50% smaller
```

#### `getScale()`
**Returns:** `float` - The current scale factor

Gets the current scale factor of this element.

```js
const element = // ... obtain Draw2DElement
const scale = element.getScale();
Chat.log(`Element scale: ${scale}x`);
```

#### `setRotation(double rotation)`
**Parameters:**
- `rotation` (`double`): The rotation angle in degrees (clockwise)

**Returns:** `Draw2DElement` - This element for method chaining

Sets the rotation angle for this element in degrees. Positive values rotate clockwise.

```js
const element = // ... obtain Draw2DElement
element.setRotation(45); // Rotate 45 degrees clockwise
element.setRotation(-90); // Rotate 90 degrees counter-clockwise
```

#### `getRotation()`
**Returns:** `float` - The current rotation angle in degrees

Gets the current rotation angle of this element.

```js
const element = // ... obtain Draw2DElement
const rotation = element.getRotation();
Chat.log(`Element rotation: ${rotation}°`);
```

#### `setRotateCenter(boolean rotateCenter)`
**Parameters:**
- `rotateCenter` (`boolean`): Whether to rotate around the center

**Returns:** `Draw2DElement` - This element for method chaining

Sets whether rotation should occur around the element's center point or its origin.

```js
const element = // ... obtain Draw2DElement
element.setRotateCenter(true);  // Rotate around center
element.setRotateCenter(false); // Rotate around top-left corner
```

#### `isRotatingCenter()`
**Returns:** `boolean` - `true` if rotating around center, `false` otherwise

Gets whether this element is configured to rotate around its center point.

```js
const element = // ... obtain Draw2DElement
const centerRotation = element.isRotatingCenter();
Chat.log(`Center rotation: ${centerRotation}`);
```

### Z-Index Control

#### `setZIndex(int zIndex)`
**Parameters:**
- `zIndex` (`int`): The new z-index value

**Returns:** `Draw2DElement` - This element for method chaining

Sets the z-index for render ordering. Higher values appear on top.

```js
const element = // ... obtain Draw2DElement
element.setZIndex(10); // Render above elements with lower z-index
```

#### `getZIndex()`
**Returns:** `int` - The current z-index

Gets the current z-index of this element.

```js
const element = // ... obtain Draw2DElement
const zIndex = element.getZIndex();
Chat.log(`Element z-index: ${zIndex}`);
```

### Parent Management

#### `setParent(IDraw2D<?> parent)`
**Parameters:**
- `parent` (`IDraw2D<?>`): The parent container

**Returns:** `Draw2DElement` - This element for method chaining

Sets the parent container for this element. This is typically called automatically when adding elements to a container.

```js
const element = // ... obtain Draw2DElement
const parentHud = Hud.createDraw2D();
element.setParent(parentHud);
```

### Inherited Methods from Alignable

The Draw2DElement class implements `Alignable<Draw2DElement>`, which provides methods for positioning elements relative to their parent or other elements:

#### Horizontal Alignment
- `alignHorizontally(String alignment, int offset)` - Align to parent with offset
- `alignHorizontally(String alignment)` - Align to parent
- `alignHorizontally(Alignable<?> other, String alignment, int offset)` - Align to another element
- `alignHorizontally(Alignable<?> other, String alignment)` - Align to another element

#### Vertical Alignment
- `alignVertically(String alignment, int offset)` - Align to parent with offset
- `alignVertically(String alignment)` - Align to parent
- `alignVertically(Alignable<?> other, String alignment, int offset)` - Align to another element
- `alignVertically(Alignable<?> other, String alignment)` - Align to another element

#### Combined Alignment
- `align(String horizontal, String vertical)` - Align both horizontally and vertically
- `align(String horizontal, int horizontalOffset, String vertical, int verticalOffset)` - Align with offsets
- `align(Alignable<?> other, String horizontal, String vertical)` - Align to another element
- `align(Alignable<?> other, String horizontal, int horizontalOffset, String vertical, int verticalOffset)` - Align to another element with offsets

#### Movement
- `moveTo(int x, int y)` - Move to absolute position
- `moveToX(int x)` - Move to absolute x position
- `moveToY(int y)` - Move to absolute y position

#### Size Information
- `getScaledWidth()` - Get width including scale factor
- `getScaledHeight()` - Get height including scale factor
- `getParentWidth()` - Get parent container width
- `getParentHeight()` - Get parent container height
- `getScaledLeft()` - Get left position after transformations
- `getScaledTop()` - Get top position after transformations
- `getScaledRight()` - Get right position after transformations
- `getScaledBottom()` - Get bottom position after transformations

## Builder Class

The `Draw2DElement.Builder` class provides a fluent API for creating Draw2DElement instances. This is the recommended way to create new elements.

### Builder Methods

The builder provides methods with the same names as the main class methods, but returning the builder for chaining:

- `x(int x)` / `getX()`
- `y(int y)` / `getY()`
- `pos(int x, int y)`
- `width(int width)` / `getWidth()`
- `height(int height)` / `getHeight()`
- `size(int width, int height)`
- `scale(double scale)` / `getScale()`
- `rotation(double rotation)` / `getRotation()`
- `rotateCenter(boolean rotateCenter)` / `isRotatingCenter()`
- `zIndex(int zIndex)` / `getZIndex()`

### Builder Creation and Usage

#### Constructor
```java
Builder(IDraw2D<?> parent, Draw2D draw2D)
```

The builder is typically created through a parent container's `draw2DBuilder()` method.

#### Build Methods
- `build()` - Creates the element without adding it to the parent
- `buildAndAdd()` - Creates the element and adds it to the parent

## Usage Examples

### Example 1: Basic Draw2DElement Creation

```js
// Create a main HUD container
const hud = Hud.createDraw2D();
hud.register();

// Create a child Draw2D for the element content
const childDraw2D = Hud.createDraw2D();

// Add some content to the child Draw2D
childDraw2D.addRect(0, 0, 100, 50, 0xFF0000, true); // Red background
childDraw2D.addText("Hello!", 10, 10, 0xFFFFFF, true); // White text

// Create a Draw2DElement to wrap the child Draw2D
const element = new Draw2DElement(
    childDraw2D, // The Draw2D to wrap
    50,          // x position
    50,          // y position
    () => 100,   // width supplier
    () => 50,    // height supplier
    0,           // z-index
    1.0,         // scale
    0            // rotation
);

// Add the element to the main HUD
hud.reAddElement(element);
```

### Example 2: Using the Builder Pattern (Recommended)

```js
// Create main HUD
const hud = Hud.createDraw2D();
hud.register();

// Create element using builder
const element = hud.draw2DBuilder(Hud.createDraw2D())
    .x(100)
    .y(100)
    .width(200)
    .height(150)
    .scale(1.5)
    .rotation(15)
    .rotateCenter(true)
    .zIndex(5)
    .buildAndAdd();

// Add content to the element's internal Draw2D
const internalDraw2D = element.getDraw2D();
internalDraw2D.addRect(0, 0, 200, 150, 0x4488FF, true);
internalDraw2D.addText("Rotated Box", 10, 10, 0xFFFFFF, true);
```

### Example 3: Creating an Animated Element

```js
// Create HUD and element
const hud = Hud.createDraw2D();
hud.register();

const element = hud.draw2DBuilder(Hud.createDraw2D())
    .x(50)
    .y(50)
    .width(100)
    .height(100)
    .buildAndAdd();

// Add content
const content = element.getDraw2D();
content.addCircle(50, 50, 50, 0xFF6600, true);

// Animation variables
let angle = 0;
let scale = 1.0;
let growing = true;

// Animate the element
events.on("RenderTick", () => {
    // Rotate continuously
    angle += 2;
    element.setRotation(angle);

    // Pulsate scale
    if (growing) {
        scale += 0.01;
        if (scale >= 1.5) growing = false;
    } else {
        scale -= 0.01;
        if (scale <= 0.5) growing = true;
    }
    element.setScale(scale);
});
```

### Example 4: Using Alignment for Layout

```js
const hud = Hud.createDraw2D();
hud.register();

// Create multiple elements
const header = hud.draw2DBuilder(Hud.createDraw2D())
    .width(300)
    .height(50)
    .buildAndAdd();

const content = hud.draw2DBuilder(Hud.createDraw2D())
    .width(300)
    .height(200)
    .buildAndAdd();

const footer = hud.draw2DBuilder(Hud.createDraw2D())
    .width(300)
    .height(30)
    .buildAndAdd();

// Use alignment to position elements
header.align("center", "top").moveTo(0, 20);
content.align("center", "top").alignVertically(header, "topOnBottom", 10);
footer.align("center", "top").alignVertically(content, "topOnBottom", 10);

// Add content to each element
header.getDraw2D().addText("Header", 10, 10, 0xFFFFFF, true);
content.getDraw2D().addRect(0, 0, 300, 200, 0x333333, true);
footer.getDraw2D().addText("Footer", 10, 10, 0xFFFFFF, true);
```

### Example 5: Complex HUD with Multiple Elements

```js
const hud = Hud.createDraw2D();
hud.register();

// Health bar background
const healthBg = hud.draw2DBuilder(Hud.createDraw2D())
    .x(10)
    .y(10)
    .width(200)
    .height(20)
    .zIndex(0)
    .buildAndAdd();
healthBg.getDraw2D().addRect(0, 0, 200, 20, 0x333333, true);

// Health bar fill (will be updated dynamically)
const healthFill = hud.draw2DBuilder(Hud.createDraw2D())
    .x(10)
    .y(10)
    .width(200)
    .height(20)
    .zIndex(1)
    .buildAndAdd();

// Player info panel
const infoPanel = hud.draw2DBuilder(Hud.createDraw2D())
    .alignHorizontally("right", 10)
    .alignVertically("top", 10)
    .width(150)
    .height(100)
    .scale(0.8)
    .rotation(0)
    .buildAndAdd();

// Add content to info panel
const infoContent = infoPanel.getDraw2D();
infoContent.addRect(0, 0, 150, 100, 0x222222, true);
infoContent.addRect(0, 0, 150, 100, 0x666666, false);
infoContent.addText("Player Info", 5, 5, 0xFFFFFF, true);

// Update health bar dynamically
events.on("RenderTick", () => {
    const player = Player.getPlayer();
    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    // Update health fill width
    healthFill.setWidth(200 * healthPercent);

    // Color based on health level
    let color = 0x00FF00; // Green
    if (healthPercent < 0.3) color = 0xFF0000; // Red
    else if (healthPercent < 0.6) color = 0xFFAA00; // Yellow

    healthFill.getDraw2D().clear();
    healthFill.getDraw2D().addRect(0, 0, 200 * healthPercent, 20, color, true);
});
```

### Example 6: Interactive Element

```js
const hud = Hud.createDraw2D();
hud.register();

// Create clickable button element
const button = hud.draw2DBuilder(Hud.createDraw2D())
    .align("center", "center")
    .width(100)
    .height(40)
    .scale(1.0)
    .buildAndAdd();

// Style the button
const buttonContent = button.getDraw2D();
buttonContent.addRect(0, 0, 100, 40, 0x444444, true);
buttonContent.addRect(0, 0, 100, 40, 0x888888, false);
buttonContent.addText("Click Me!", 25, 12, 0xFFFFFF, true);

// Handle mouse interactions
let isHovered = false;

events.on("MouseMoved", (event) => {
    const mouseX = event.mouseX;
    const mouseY = event.mouseY;
    const buttonLeft = button.getScaledLeft();
    const buttonTop = button.getScaledTop();
    const buttonRight = button.getScaledRight();
    const buttonBottom = button.getScaledBottom();

    const wasHovered = isHovered;
    isHovered = mouseX >= buttonLeft && mouseX <= buttonRight &&
                mouseY >= buttonTop && mouseY <= buttonBottom;

    // Update button appearance on hover
    if (isHovered && !wasHovered) {
        button.setScale(1.1); // Enlarge on hover
        buttonContent.clear();
        buttonContent.addRect(0, 0, 100, 40, 0x555555, true);
        buttonContent.addRect(0, 0, 100, 40, 0xAAAAAA, false);
        buttonContent.addText("Click Me!", 25, 12, 0xFFFFFF, true);
    } else if (!isHovered && wasHovered) {
        button.setScale(1.0); // Return to normal size
        buttonContent.clear();
        buttonContent.addRect(0, 0, 100, 40, 0x444444, true);
        buttonContent.addRect(0, 0, 100, 40, 0x888888, false);
        buttonContent.addText("Click Me!", 25, 12, 0xFFFFFF, true);
    }
});

events.on("MouseClicked", (event) => {
    if (isHovered && event.button === 0) { // Left click
        Chat.log("Button clicked!");
        // Add click animation
        button.setRotation(5);
        setTimeout(() => button.setRotation(0), 100);
    }
});
```

### Example 7: Creating a Menu System

```js
const hud = Hud.createDraw2D();
hud.register();

// Menu container
const menu = hud.draw2DBuilder(Hud.createDraw2D())
    .align("center", "center")
    .width(250)
    .height(300)
    .scale(1.2)
    .buildAndAdd();

// Menu background
const menuContent = menu.getDraw2D();
menuContent.addRect(0, 0, 250, 300, 0x1a1a1a, true);
menuContent.addRect(0, 0, 250, 300, 0x444444, false);
menuContent.addText("Game Menu", 75, 10, 0xFFFFFF, true);

// Create menu items
const menuItems = [];
const itemHeight = 40;
const startY = 50;

for (let i = 0; i < 5; i++) {
    const item = menu.draw2DBuilder(Hud.createDraw2D())
        .x(10)
        .y(startY + i * (itemHeight + 5))
        .width(230)
        .height(itemHeight)
        .buildAndAdd();

    const itemContent = item.getDraw2D();
    itemContent.addRect(0, 0, 230, itemHeight, 0x333333, true);
    itemContent.addRect(0, 0, 230, itemHeight, 0x666666, false);
    itemContent.addText(`Menu Item ${i + 1}`, 10, 12, 0xFFFFFF, true);

    menuItems.push(item);
}

// Handle menu selection
let selectedIndex = -1;

events.on("MouseMoved", (event) => {
    const mouseY = event.mouseY;

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        const itemTop = item.getScaledTop() + menu.getScaledTop();
        const itemBottom = item.getScaledBottom() + menu.getScaledTop();

        const isHovered = mouseY >= itemTop && mouseY <= itemBottom;

        const itemContent = item.getDraw2D();
        itemContent.clear();

        if (isHovered) {
            itemContent.addRect(0, 0, 230, itemHeight, 0x555555, true);
            itemContent.addRect(0, 0, 230, itemHeight, 0x888888, false);
            selectedIndex = i;
        } else {
            itemContent.addRect(0, 0, 230, itemHeight, 0x333333, true);
            itemContent.addRect(0, 0, 230, itemHeight, 0x666666, false);
        }

        itemContent.addText(`Menu Item ${i + 1}`, 10, 12, 0xFFFFFF, true);
    }
});
```

## Notes and Limitations

1. **Performance Considerations:** Avoid creating too many Draw2DElements with complex content, as each element maintains its own Draw2D instance with separate rendering overhead.

2. **Transform Order:** Transformations are applied in the order: translate → scale → rotate. This affects the final appearance of the element.

3. **Parent Constraints:** Elements are constrained by their parent container's dimensions. Position and size calculations should account for parent boundaries.

4. **Dynamic Sizing:** The width and height suppliers are evaluated each frame, allowing for dynamic resizing based on parent or other factors.

5. **Z-Index Scope:** Z-index values are only meaningful within the same parent container. Elements in different parents are rendered independently.

6. **Rotation Center:** When `rotateCenter` is true, rotation occurs around the element's center. When false, rotation occurs around the origin (top-left corner).

7. **Scale Impact:** Scale affects both the visual size and the hit-box boundaries for mouse interactions.

## Related Classes

- `Draw2D` - The core 2D drawing class wrapped by this element
- `IDraw2D<T>` - Interface for parent containers
- `RenderElement` - Base interface for all render elements
- `Alignable<T>` - Interface providing alignment functionality
- `RenderElementBuilder<T>` - Base class for element builders

## Version Information

- Available since JSMacros 1.8.4
- Updated to include comprehensive transform controls in 1.8.4
- Alignment functionality inherited from Alignable interface since 1.8.4

