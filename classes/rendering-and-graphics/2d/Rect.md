# Rect

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Rect`

**Extends:** `Object`

**Implements:** `RenderElement`, `Alignable<Rect>`

**Since:** JsMacros 1.0.5

The `Rect` class is a rendering component in JSMacros that represents a colored rectangle that can be drawn on the screen. It supports positioning, sizing, coloring, rotation, and alignment operations. This class is commonly used for creating UI overlays, visual indicators, backgrounds, and custom HUD elements in scripts.

## Overview

The `Rect` class provides a flexible way to draw rectangles with various properties:
- Customizable position and dimensions
- Full color support with alpha transparency
- Rotation capabilities with center-point or origin rotation
- Z-index layering for proper depth ordering
- Parent-child relationships for hierarchical rendering
- Alignment utilities for positioning relative to other elements

## Constructors

### `new Rect(x1, y1, x2, y2, color, rotation, zIndex)`
Creates a new Rect with specified coordinates, color, rotation, and z-index.

**Parameters:**
- `x1` (int): X coordinate of the first corner
- `y1` (int): Y coordinate of the first corner
- `x2` (int): X coordinate of the second corner
- `y2` (int): Y coordinate of the second corner
- `color` (int): Color in RGB format (alpha will be set to 0xFF)
- `rotation` (float): Rotation angle in degrees (clockwise)
- `zIndex` (int): Z-index for rendering order (higher values render on top)

**Example:**
```javascript
// Create a red rectangle at position (10, 10) to (110, 60)
const rect = new Rect(10, 10, 110, 60, 0xFF0000, 0, 0);
```

### `new Rect(x1, y1, x2, y2, color, alpha, rotation, zIndex)`
Creates a new Rect with specified coordinates, color, alpha, rotation, and z-index.

**Parameters:**
- `x1` (int): X coordinate of the first corner
- `y1` (int): Y coordinate of the first corner
- `x2` (int): X coordinate of the second corner
- `y2` (int): Y coordinate of the second corner
- `color` (int): Color in RGB format
- `alpha` (int): Alpha transparency value (0-255)
- `rotation` (float): Rotation angle in degrees (clockwise)
- `zIndex` (int): Z-index for rendering order

**Example:**
```javascript
// Create a semi-transparent blue rectangle
const rect = new Rect(50, 50, 150, 100, 0x0000FF, 128, 1);
```

## Position Methods

### `setX1(x1)`
Sets the X coordinate of the first corner.

**Parameters:**
- `x1` (int): The new X coordinate

**Returns:** `Rect` - Self for chaining

### `getX1()`
Returns the X coordinate of the first corner.

**Returns:** `int`

### `setY1(y1)`
Sets the Y coordinate of the first corner.

**Parameters:**
- `y1` (int): The new Y coordinate

**Returns:** `Rect` - Self for chaining

### `getY1()`
Returns the Y coordinate of the first corner.

**Returns:** `int`

### `setPos1(x1, y1)`
Sets both coordinates of the first corner.

**Parameters:**
- `x1` (int): The new X coordinate
- `y1` (int): The new Y coordinate

**Returns:** `Rect` - Self for chaining

### `setX2(x2)`
Sets the X coordinate of the second corner.

**Parameters:**
- `x2` (int): The new X coordinate

**Returns:** `Rect` - Self for chaining

### `getX2()`
Returns the X coordinate of the second corner.

**Returns:** `int`

### `setY2(y2)`
Sets the Y coordinate of the second corner.

**Parameters:**
- `y2` (int): The new Y coordinate

**Returns:** `Rect` - Self for chaining

### `getY2()`
Returns the Y coordinate of the second corner.

**Returns:** `int`

### `setPos2(x2, y2)`
Sets both coordinates of the second corner.

**Parameters:**
- `x2` (int): The new X coordinate
- `y2` (int): The new Y coordinate

**Returns:** `Rect` - Self for chaining

### `setPos(x1, y1, x2, y2)`
Sets all rectangle coordinates at once.

**Parameters:**
- `x1` (int): X coordinate of the first corner
- `y1` (int): Y coordinate of the first corner
- `x2` (int): X coordinate of the second corner
- `y2` (int): Y coordinate of the second corner

**Returns:** `Rect` - Self for chaining

## Size Methods

### `setWidth(width)`
Sets the width of the rectangle. Preserves the position of the corner with the smaller X coordinate.

**Parameters:**
- `width` (int): The new width in pixels

**Returns:** `Rect` - Self for chaining

### `getWidth()`
Returns the current width of the rectangle.

**Returns:** `int` - Width in pixels (absolute difference between X coordinates)

### `setHeight(height)`
Sets the height of the rectangle. Preserves the position of the corner with the smaller Y coordinate.

**Parameters:**
- `height` (int): The new height in pixels

**Returns:** `Rect` - Self for chaining

### `getHeight()`
Returns the current height of the rectangle.

**Returns:** `int` - Height in pixels (absolute difference between Y coordinates)

### `setSize(width, height)`
Sets both width and height at once.

**Parameters:**
- `width` (int): The new width in pixels
- `height` (int): The new height in pixels

**Returns:** `Rect` - Self for chaining

## Color Methods

### `setColor(color)`
Sets the color with full alpha (0xFF).

**Parameters:**
- `color` (int): Color in RGB format (e.g., 0xFF0000 for red)

**Returns:** `Rect` - Self for chaining

### `setColor(color, alpha)`
Sets both color and alpha values.

**Parameters:**
- `color` (int): Color in RGB format
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Rect` - Self for chaining

### `setAlpha(alpha)`
Sets only the alpha transparency value.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Rect` - Self for chaining

### `getColor()`
Returns the current color value (including alpha).

**Returns:** `int` - Full color value in ARGB format

### `getAlpha()`
Returns only the alpha component of the color.

**Returns:** `int` - Alpha value (0-255)

## Rotation Methods

### `setRotation(rotation)`
Sets the rotation angle of the rectangle.

**Parameters:**
- `rotation` (double): Rotation angle in degrees (clockwise, will be wrapped to 0-360)

**Returns:** `Rect` - Self for chaining

### `getRotation()`
Returns the current rotation angle.

**Returns:** `float` - Rotation angle in degrees

### `setRotateCenter(rotateCenter)`
Sets whether the rectangle should rotate around its center point.

**Parameters:**
- `rotateCenter` (boolean): true to rotate around center, false to rotate around origin

**Returns:** `Rect` - Self for chaining

### `isRotatingCenter()`
Returns whether the rectangle is set to rotate around its center.

**Returns:** `boolean` - true if rotating around center

## Rendering Methods

### `setZIndex(zIndex)`
Sets the z-index for rendering order.

**Parameters:**
- `zIndex` (int): Z-index value (higher values render on top)

**Returns:** `Rect` - Self for chaining

### `getZIndex()`
Returns the current z-index.

**Returns:** `int` - Current z-index value

### `render(drawContext, mouseX, mouseY, delta)`
Renders the rectangle. This method is called automatically when the rectangle is added to a 2D drawing surface.

**Parameters:**
- `drawContext` (DrawContext): Minecraft's draw context
- `mouseX` (int): Current mouse X position
- `mouseY` (int): Current mouse Y position
- `delta` (float): Frame delta time

### `setParent(parent)`
Sets the parent drawing surface for this rectangle.

**Parameters:**
- `parent` (IDraw2D): The parent drawing surface

**Returns:** `Rect` - Self for chaining

## Sizing Methods (Inherited)

These methods are inherited from the rendering interfaces:

### `getScaledWidth()`
Returns the scaled width of the rectangle.

**Returns:** `int`

### `getParentWidth()`
Returns the width of the parent drawing surface.

**Returns:** `int`

### `getScaledHeight()`
Returns the scaled height of the rectangle.

**Returns:** `int`

### `getParentHeight()`
Returns the height of the parent drawing surface.

**Returns:** `int`

### `getScaledLeft()`
Returns the left edge position (minimum X coordinate).

**Returns:** `int`

### `getScaledTop()`
Returns the top edge position (minimum Y coordinate).

**Returns:** `int`

### `moveTo(x, y)`
Moves the rectangle to the specified position while maintaining its size.

**Parameters:**
- `x` (int): New X position
- `y` (int): New Y position

**Returns:** `Rect` - Self for chaining

## Usage Examples

### Example 1: Simple Rectangle
```javascript
// Create and render a simple green rectangle
const greenRect = new Rect(10, 10, 60, 60, 0x00FF00, 0, 0);

// Add to HUD
Hud.addDrawable(greenRect);
```

### Example 2: Semi-Transparent Background
```javascript
// Create a semi-transparent black background for text
const background = new Rect(5, 5, 200, 30, 0x000000, 128, -1);
Hud.addDrawable(background);
```

### Example 3: Rotated Rectangle
```javascript
// Create a rotated red rectangle
const rotatedRect = new Rect(50, 50, 100, 100, 0xFF0000, 0, 45);
rotatedRect.setRotateCenter(true);
Hud.addDrawable(rotatedRect);
```

### Example 4: Dynamic Sizing and Positioning
```javascript
// Create a rectangle that follows the player
let playerRect = new Rect(0, 0, 100, 20, 0x00FFFF, 0, 1);

events.on("Tick", (event) => {
    const player = Player.getPlayer();
    if (player) {
        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const healthPercent = health / maxHealth;

        // Update width based on health
        playerRect.setWidth(Math.floor(100 * healthPercent));

        // Update color based on health level
        if (healthPercent > 0.6) {
            playerRect.setColor(0x00FF00); // Green
        } else if (healthPercent > 0.3) {
            playerRect.setColor(0xFFFF00); // Yellow
        } else {
            playerRect.setColor(0xFF0000); // Red
        }
    }
});

Hud.addDrawable(playerRect);
```

### Example 5: Multiple Layered Rectangles
```javascript
// Create a layered effect with multiple rectangles
const bg = new Rect(10, 10, 210, 110, 0x000000, 200, 0);  // Background
const border = new Rect(10, 10, 210, 110, 0xFFFFFF, 255, 1);  // Border
const inner = new Rect(15, 15, 205, 105, 0x333333, 255, 2);  // Inner

// Make the border a frame by setting inner size
border.setWidth(border.getWidth() - 2);
border.setHeight(border.getHeight() - 2);
border.moveTo(11, 11);

Hud.addDrawable(bg);
Hud.addDrawable(border);
Hud.addDrawable(inner);
```

### Example 6: Animated Rectangle
```javascript
// Create an animated pulsing rectangle
let pulseRect = new Rect(100, 100, 120, 120, 0xFF00FF, 200, 0);
let pulseTime = 0;

events.on("Tick", (event) => {
    pulseTime += 0.1;
    const scale = 1 + Math.sin(pulseTime) * 0.3;

    const centerX = 110;
    const centerY = 110;
    const size = 10 * scale;

    pulseRect.setPos(
        centerX - size,
        centerY - size,
        centerX + size,
        centerY + size
    );

    // Pulse alpha
    const alpha = 128 + Math.floor(Math.sin(pulseTime) * 64);
    pulseRect.setAlpha(alpha);
});

Hud.addDrawable(pulseRect);
```

### Example 7: Rectangle with Text Overlay
```javascript
// Create a rectangle with text overlay
const textBg = new Rect(5, 60, 200, 80, 0x000066, 180, 0);
const text = new TextHelper("Health Bar", 6, 62, 0xFFFFFF);

Hud.addDrawable(textBg);
Hud.addDrawable(text);
```

## Color Format Guide

The Rect class uses standard integer color formats:

- **RGB Format:** `0xRRGGBB` where:
  - `RR` = Red component (0-255 in hex)
  - `GG` = Green component (0-255 in hex)
  - `BB` = Blue component (0-255 in hex)

- **Common Colors:**
  - Black: `0x000000`
  - White: `0xFFFFFF`
  - Red: `0xFF0000`
  - Green: `0x00FF00`
  - Blue: `0x0000FF`
  - Yellow: `0xFFFF00`
  - Cyan: `0x00FFFF`
  - Magenta: `0xFF00FF`

- **Alpha Values:**
  - 0 = Fully transparent
  - 128 = Semi-transparent (50% opacity)
  - 255 = Fully opaque

## Important Notes

1. **Coordinate System:** The rectangle uses a coordinate system where (0,0) is the top-left corner of the screen. X increases to the right, Y increases downward.

2. **Rotation Behavior:** When `rotateCenter` is true, the rectangle rotates around its geometric center. When false, it rotates around the origin point (x1, y1).

3. **Z-Index Ordering:** Rectangles with higher z-index values render on top of those with lower values. This is important for layering effects.

4. **Alpha Blending:** The rectangle supports proper alpha blending for transparency effects. Enable blending in the render system for best results.

5. **Performance Considerations:** Creating many rectangles with complex transformations can impact performance. Use z-index efficiently and avoid unnecessary redraws.

6. **Size Preservation:** Methods like `setWidth()` and `setHeight()` preserve the position of the corner with the smaller coordinate value.

7. **Rotation Wrapping:** Rotation angles are automatically wrapped to the 0-360 degree range using Minecraft's `MathHelper.wrapDegrees()`.

8. **Parent Relationships:** When a parent is set, the rectangle will be contained within that parent's coordinate space and dimensions.

## Builder Pattern

The Rect class also provides a Builder for more fluent configuration:

```javascript
// Using the builder pattern
const builderRect = new Rect.Builder(Hud)
    .pos(10, 10, 100, 50)
    .color(255, 0, 0, 128)
    .rotation(45)
    .rotateCenter(true)
    .zIndex(5)
    .build();

Hud.addDrawable(builderRect);
```

## Related Classes

- `RenderElement` - Base interface for all renderable components
- `Alignable` - Interface providing alignment utilities
- `IDraw2D` - Interface for 2D drawing surfaces (parents)
- `TextHelper` - For adding text to overlay rectangles
- `Hud` - For adding rectangles to the game HUD

## Version History

- **1.0.5:** Initial release with basic rectangle rendering
- **1.1.8:** Added color methods with alpha support and improved positioning
- **1.2.6:** Added rotation functionality
- **1.8.4:** Added Builder pattern, alignment support, and comprehensive method set
- **Current:** Enhanced with proper z-index management and parent-child relationships

