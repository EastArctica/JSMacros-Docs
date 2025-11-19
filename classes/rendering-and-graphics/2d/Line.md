# Line

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Line`
**Implements:** `RenderElement`, `Alignable<Line>`
**Extends:** `Object`

## Overview

The `Line` class is a 2D rendering component in JSMacros that provides functionality to draw lines on the screen. It supports custom colors, widths, rotation, positioning, and z-index layering. Lines are rendered using triangle strips for smooth appearance and can be used as part of custom HUDs, overlays, or visual effects.

This class is part of the JSMacros rendering system available since version 1.8.4 and is designed to work with the 2D drawing context, typically used for creating custom user interface elements or screen overlays.

## Creating a Line

Lines can be created directly using the constructor or through the builder pattern for more convenient configuration.

### Constructor
```javascript
// Direct constructor usage
const line = new Line(x1, y1, x2, y2, color, rotation, width, zIndex);
```

### Builder Pattern (Recommended)
```javascript
// Using the builder pattern (more readable and chainable)
const draw2D = Hud.createDraw2D();
const line = draw2D.line()
    .pos(10, 10, 100, 50)  // Set start and end positions
    .color(0xFF0000)        // Red color
    .width(2.0)             // 2 pixel width
    .zIndex(10)             // Layer depth
    .build();
```

## Properties and Methods

### Position Control Methods

#### `setX1(x1)`
Sets the x position of the start of the line.

```javascript
line.setX1(50);
```

**Params**
1. `x1: int` - The x position of the start of the line

**Returns**
* `Line` - Self for chaining

#### `getX1()`
Returns the x position of the start of the line.

```javascript
const x1 = line.getX1();
```

**Returns**
* `int` - The x position of the start of the line

#### `setY1(y1)`
Sets the y position of the start of the line.

```javascript
line.setY1(50);
```

**Params**
1. `y1: int` - The y position of the start of the line

**Returns**
* `Line` - Self for chaining

#### `getY1()`
Returns the y position of the start of the line.

```javascript
const y1 = line.getY1();
```

**Returns**
* `int` - The y position of the start of the line

#### `setX2(x2)`
Sets the x position of the end of the line.

```javascript
line.setX2(200);
```

**Params**
1. `x2: int` - The x position of the end of the line

**Returns**
* `Line` - Self for chaining

#### `getX2()`
Returns the x position of the end of the line.

```javascript
const x2 = line.getX2();
```

**Returns**
* `int` - The x position of the end of the line

#### `setY2(y2)`
Sets the y position of the end of the line.

```javascript
line.setY2(150);
```

**Params**
1. `y2: int` - The y position of the end of the line

**Returns**
* `Line` - Self for chaining

#### `getY2()`
Returns the y position of the end of the line.

```javascript
const y2 = line.getY2();
```

**Returns**
* `int` - The y position of the end of the line

### Combined Position Methods

#### `setPos1(x1, y1)`
Sets both x and y coordinates of the start position simultaneously.

```javascript
line.setPos1(10, 10);
```

**Params**
1. `x1: int` - The x position of the start of the line
2. `y1: int` - The y position of the start of the line

**Returns**
* `Line` - Self for chaining

#### `setPos2(x2, y2)`
Sets both x and y coordinates of the end position simultaneously.

```javascript
line.setPos2(100, 80);
```

**Params**
1. `x2: int` - The x position of the end of the line
2. `y2: int` - The y position of the end of the line

**Returns**
* `Line` - Self for chaining

#### `setPos(x1, y1, x2, y2)`
Sets both start and end positions of the line in a single call.

```javascript
line.setPos(0, 0, 200, 150);
```

**Params**
1. `x1: int` - The x position of the start of the line
2. `y1: int` - The y position of the start of the line
3. `x2: int` - The x position of the end of the line
4. `y2: int` - The y position of the end of the line

**Returns**
* `Line` - Self for chaining

### Color and Appearance Methods

#### `setColor(color)`
Sets the color of the line. Automatically adds full alpha if not specified.

```javascript
// Set solid red line
line.setColor(0xFF0000);

// Set color with alpha included
line.setColor(0x80FF0000); // Semi-transparent red
```

**Params**
1. `color: int` - The color of the line (RGB or ARGB format)

**Returns**
* `Line` - Self for chaining

#### `setColor(color, alpha)`
Sets the color and alpha separately.

```javascript
line.setColor(0xFF0000, 128); // Red color with 50% transparency
```

**Params**
1. `color: int` - The RGB color of the line
2. `alpha: int` - The alpha component (0-255)

**Returns**
* `Line` - Self for chaining

#### `getColor()`
Returns the current color of the line (including alpha).

```javascript
const color = line.getColor();
```

**Returns**
* `int` - The ARGB color value

#### `setAlpha(alpha)`
Sets only the alpha component while preserving the RGB color.

```javascript
line.setAlpha(128); // 50% transparency
```

**Params**
1. `alpha: int` - The alpha value (0-255, where 0 is fully transparent and 255 is fully opaque)

**Returns**
* `Line` - Self for chaining

#### `getAlpha()`
Returns the alpha component of the current color.

```javascript
const alpha = line.getAlpha();
```

**Returns**
* `int` - The alpha value (0-255)

### Transform Methods

#### `setRotation(rotation)`
Sets the rotation angle of the line (clockwise).

```javascript
line.setRotation(45.0); // Rotate 45 degrees clockwise
```

**Params**
1. `rotation: number` - The rotation angle in degrees (clockwise)

**Returns**
* `Line` - Self for chaining

#### `getRotation()`
Returns the current rotation angle.

```javascript
const rotation = line.getRotation();
```

**Returns**
* `float` - The rotation angle in degrees

#### `setRotateCenter(rotateCenter)`
Sets whether the line should rotate around its center point.

```javascript
line.setRotateCenter(true);  // Rotate around center
line.setRotateCenter(false); // Rotate around origin (0,0)
```

**Params**
1. `rotateCenter: boolean` - Whether to rotate around the line's center

**Returns**
* `Line` - Self for chaining

#### `isRotatingCenter()`
Returns whether the line is configured to rotate around its center.

```javascript
const rotatesCenter = line.isRotatingCenter();
```

**Returns**
* `boolean` - True if rotating around center, false otherwise

#### `setWidth(width)`
Sets the width (thickness) of the line.

```javascript
line.setWidth(3.5); // 3.5 pixel wide line
```

**Params**
1. `width: number` - The width of the line in pixels

**Returns**
* `Line` - Self for chaining

#### `getWidth()`
Returns the current width of the line.

```javascript
const width = line.getWidth();
```

**Returns**
* `float` - The width of the line in pixels

### Depth and Layering Methods

#### `setZIndex(zIndex)`
Sets the z-index for layering order. Higher z-index values appear on top.

```javascript
line.setZIndex(100); // Appear above elements with lower z-index
```

**Params**
1. `zIndex: int` - The z-index value for layering

**Returns**
* `Line` - Self for chaining

#### `getZIndex()`
Returns the current z-index value.

```javascript
const zIndex = line.getZIndex();
```

**Returns**
* `int` - The z-index value

### Parent and Hierarchy Methods

#### `setParent(parent)`
Sets the parent 2D drawing context for this line.

```javascript
const draw2D = Hud.createDraw2D();
line.setParent(draw2D);
```

**Params**
1. `parent: IDraw2D<?>` - The parent 2D drawing context

**Returns**
* `Line` - Self for chaining

### Alignment and Sizing Methods (Inherited)

#### `moveTo(x, y)`
Moves the line to a new position while maintaining its dimensions.

```javascript
line.moveTo(50, 50);
```

**Params**
1. `x: int` - The new x position
2. `y: int` - The new y position

**Returns**
* `Line` - Self for chaining

#### `getScaledWidth()`
Returns the absolute width of the line (difference between x coordinates).

```javascript
const width = line.getScaledWidth();
```

**Returns**
* `int` - The width of the line in pixels

#### `getScaledHeight()`
Returns the absolute height of the line (difference between y coordinates).

```javascript
const height = line.getScaledHeight();
```

**Returns**
* `int` - The height of the line in pixels

#### `getParentWidth()`
Returns the width of the parent container or window.

```javascript
const parentWidth = line.getParentWidth();
```

**Returns**
* `int` - The parent container width

#### `getParentHeight()`
Returns the height of the parent container or window.

```javascript
const parentHeight = line.getParentHeight();
```

**Returns**
* `int` - The parent container height

#### `getScaledLeft()`
Returns the leftmost x coordinate of the line.

```javascript
const left = line.getScaledLeft();
```

**Returns**
* `int` - The minimum x coordinate

#### `getScaledTop()`
Returns the topmost y coordinate of the line.

```javascript
const top = line.getScaledTop();
```

**Returns**
* `int` - The minimum y coordinate

## Usage Examples

### Basic Line Drawing
```javascript
// Create a simple horizontal line
const draw2D = Hud.createDraw2D();
const horizontalLine = draw2D.line()
    .pos(10, 50, 200, 50)     // Horizontal line from (10,50) to (200,50)
    .color(0x00FF00)          // Green color
    .width(2)                 // 2 pixel width
    .zIndex(1)                // Layer 1
    .build();

// Create a vertical line
const verticalLine = draw2D.line()
    .pos(100, 10, 100, 200)   // Vertical line from (100,10) to (100,200)
    .color(0xFF0000)          // Red color
    .width(3)                 // 3 pixel width
    .zIndex(2)                // Layer 2 (on top)
    .build();
```

### Diagonal and Rotated Lines
```javascript
// Create a diagonal line
const diagonalLine = draw2D.line()
    .pos(0, 0, 150, 150)      // Diagonal from top-left to bottom-right
    .color(0x0000FF)          // Blue color
    .width(2.5)               // 2.5 pixel width
    .build();

// Create a rotated horizontal line
const rotatedLine = draw2D.line()
    .pos(200, 100, 350, 100)  // Base horizontal line
    .color(0xFF00FF)          // Magenta color
    .width(2)
    .rotation(45)             // Rotate 45 degrees
    .rotateCenter(true)       // Rotate around center
    .build();
```

### Animated Line
```javascript
// Animate a line changing color over time
let hue = 0;

function updateAnimatedLine() {
    hue = (hue + 2) % 360;
    const color = hslToRgb(hue, 100, 50);

    animatedLine.setColor(color);

    // Also animate the end position
    const time = Date.now() / 1000;
    const x2 = 200 + Math.sin(time) * 50;
    const y2 = 100 + Math.cos(time) * 30;
    animatedLine.setPos2(Math.floor(x2), Math.floor(y2));
}

// Helper function to convert HSL to RGB
function hslToRgb(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

// Update the line every tick
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    updateAnimatedLine();
}));
```

### Health Bar Example
```javascript
// Create a dynamic health bar using multiple lines
function createHealthBar() {
    const draw2D = Hud.createDraw2D();

    // Background line (red)
    const background = draw2D.line()
        .pos(10, 60, 110, 60)
        .color(0x800000)
        .width(8)
        .zIndex(1)
        .build();

    // Foreground line (green)
    const foreground = draw2D.line()
        .pos(10, 60, 110, 60)
        .color(0x00FF00)
        .width(6)
        .zIndex(2)
        .build();

    // Update function
    const updateHealthBar = () => {
        const player = Player.getPlayer();
        if (player) {
            const health = player.getHealth();
            const maxHealth = player.getMaxHealth();
            const healthPercent = health / maxHealth;

            // Update foreground line length based on health
            const endX = 10 + Math.floor(100 * healthPercent);
            foreground.setPos2(endX, 60);

            // Change color based on health level
            let color;
            if (healthPercent > 0.6) {
                color = 0x00FF00; // Green
            } else if (healthPercent > 0.3) {
                color = 0xFFFF00; // Yellow
            } else {
                color = 0xFF0000; // Red
            }
            foreground.setColor(color);
        }
    };

    // Update every tick
    JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(updateHealthBar));

    return { background, foreground };
}

const healthBar = createHealthBar();
```

### Grid Overlay Example
```javascript
// Create a grid overlay
function createGrid(spacing = 20, color = 0x40FFFFFF) {
    const draw2D = Hud.createDraw2D();
    const lines = [];

    const windowWidth = Hud.getScreen().getScaledWidth();
    const windowHeight = Hud.getScreen().getScaledHeight();

    // Vertical lines
    for (let x = 0; x <= windowWidth; x += spacing) {
        const line = draw2D.line()
            .pos(x, 0, x, windowHeight)
            .color(color)
            .width(1)
            .zIndex(0)
            .build();
        lines.push(line);
    }

    // Horizontal lines
    for (let y = 0; y <= windowHeight; y += spacing) {
        const line = draw2D.line()
            .pos(0, y, windowWidth, y)
            .color(color)
            .width(1)
            .zIndex(0)
            .build();
        lines.push(line);
    }

    return lines;
}

const gridLines = createGrid(50, 0x30FFFFFF); // 50-pixel grid with semi-transparent white
```

## Notes and Limitations

- **Coordinate System**: The line uses screen coordinates where (0,0) is the top-left corner
- **Color Format**: Colors are in ARGB format. If you provide RGB format, full alpha (0xFF) will be automatically added
- **Performance**: Lines are rendered using triangle strips for smooth appearance but consider performance impact when using many lines
- **Layering**: Use z-index to control rendering order when multiple elements overlap
- **Rotation**: Rotation is applied in degrees and is clockwise by default
- **Parent Context**: Lines should be added to a 2D drawing context to be rendered

## Version Information

- **Available Since**: JSMacros 1.8.4
- **Package**: `xyz.wagyourtail.jsmacros.client.api.classes.render.components`

## Related Classes

- `RenderElement` - Interface that Line implements for rendering
- `Alignable<Line>` - Interface for alignment capabilities
- `IDraw2D` - Parent drawing context interface
- `DrawContext` - Minecraft drawing context used for rendering
- `Tessellator` - Internal rendering system used for line drawing

## Builder Pattern Details

The `Line.Builder` class provides a fluent API for creating lines with the same methods as the main class, but in builder style:

- All setter methods return the builder for chaining
- Use `build()` to create the final `Line` instance
- Builder methods use camelCase (e.g., `x1()` instead of `setX1()`)
- Builder provides additional color methods like `color(r, g, b)` and `color(r, g, b, a)` for convenience

Example of builder usage:
```javascript
const draw2D = Hud.createDraw2D();
const line = draw2D.line()
    .x1(10).y1(10)
    .x2(100).y2(100)
    .color(255, 0, 0)      // RGB format
    .alpha(200)             // Semi-transparent
    .width(2.5)
    .zIndex(10)
    .rotation(45)
    .rotateCenter(true)
    .build();
```

