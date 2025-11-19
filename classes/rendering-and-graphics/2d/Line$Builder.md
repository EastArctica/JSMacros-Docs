# Line.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Line$Builder`

**Implements:** Builder pattern for `Line`

**Since:** JsMacros 1.8.4

The `Line.Builder` class provides a fluent interface for creating `Line` instances with method chaining. It's the recommended way to create lines with complex configurations or when you need to set multiple properties in a readable manner.

## Overview

The `Line.Builder` class allows you to construct `Line` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw2D.line()` method and provides two final operations:
- `build()` - Creates the Line instance
- `buildAndAdd()` - Creates the Line instance and automatically adds it to the Draw2D context

## Creating a Builder

```javascript
// Obtain a builder from Draw2D context
const draw2D = Hud.createDraw2D();
const builder = draw2D.line();
```

## Builder Methods

### Position Methods

#### `pos(x1, y1, x2, y2)`
Sets the start and end positions of the line in a single call.

**Parameters:**
- `x1` (int): X coordinate of the line start point
- `y1` (int): Y coordinate of the line start point
- `x2` (int): X coordinate of the line end point
- `y2` (int): Y coordinate of the line end point

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const line = draw2D.line()
    .pos(10, 10, 100, 50)
    .build();
```

#### `pos1(x, y)`
Sets the start position of the line.

**Parameters:**
- `x` (int): X coordinate of the line start point
- `y` (int): Y coordinate of the line start point

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const line = draw2D.line()
    .pos1(0, 0)
    .pos2(200, 100)
    .build();
```

#### `pos2(x, y)`
Sets the end position of the line.

**Parameters:**
- `x` (int): X coordinate of the line end point
- `y` (int): Y coordinate of the line end point

**Returns:** `Line.Builder` - Self for chaining

#### `x1(x)`
Sets only the X coordinate of the line start point.

**Parameters:**
- `x` (int): X coordinate of the line start point

**Returns:** `Line.Builder` - Self for chaining

#### `y1(y)`
Sets only the Y coordinate of the line start point.

**Parameters:**
- `y` (int): Y coordinate of the line start point

**Returns:** `Line.Builder` - Self for chaining

#### `x2(x)`
Sets only the X coordinate of the line end point.

**Parameters:**
- `x` (int): X coordinate of the line end point

**Returns:** `Line.Builder` - Self for chaining

#### `y2(y)`
Sets only the Y coordinate of the line end point.

**Parameters:**
- `y` (int): Y coordinate of the line end point

**Returns:** `Line.Builder` - Self for chaining

### Color Methods

#### `color(color)`
Sets the line color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const redLine = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets the line color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlue = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets the line color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const greenLine = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(0, 255, 0)
    .build();
```

#### `color(r, g, b, a)`
Sets the line color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const purpleLine = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(128, 0, 128, 200)
    .build();
```

#### `alpha(alpha)`
Sets only the alpha transparency value while preserving RGB color.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const fadedLine = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(0xFF0000)
    .alpha(100)
    .build();
```

### Transform Methods

#### `rotation(degrees)`
Sets the rotation angle of the line (clockwise).

**Parameters:**
- `degrees` (float): Rotation angle in degrees

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const rotatedLine = draw2D.line()
    .pos(100, 50, 200, 50)  // Horizontal line
    .rotation(45)            // Rotate 45 degrees
    .build();
```

#### `rotateCenter(centerEnabled)`
Sets whether the line should rotate around its center point.

**Parameters:**
- `centerEnabled` (boolean): true to rotate around center, false to rotate around origin

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const centeredRotation = draw2D.line()
    .pos(50, 50, 150, 100)
    .rotation(45)
    .rotateCenter(true)
    .build();
```

### Appearance Methods

#### `width(width)`
Sets the width (thickness) of the line.

**Parameters:**
- `width` (double): Line width in pixels

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const thickLine = draw2D.line()
    .pos(0, 0, 200, 0)
    .width(5.0)
    .color(0x000000)
    .build();
```

### Layering Methods

#### `zIndex(index)`
Sets the z-index for rendering order. Higher values render on top.

**Parameters:**
- `index` (int): Z-index value

**Returns:** `Line.Builder` - Self for chaining

**Example:**
```javascript
const topLine = draw2D.line()
    .pos(0, 0, 100, 100)
    .zIndex(100)
    .build();
```

### Building Methods

#### `build()`
Creates the configured `Line` instance without adding it to the Draw2D context.

**Returns:** `Line` - The constructed Line instance

**Example:**
```javascript
const line = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(0xFF0000)
    .width(2)
    .build();

// Add to context manually later
draw2D.addChild(line);
```

#### `buildAndAdd()`
Creates the configured `Line` instance and automatically adds it to the Draw2D context.

**Returns:** `Line` - The constructed and added Line instance

**Example:**
```javascript
const line = draw2D.line()
    .pos(0, 0, 100, 100)
    .color(0x00FF00)
    .width(3)
    .buildAndAdd(); // Automatically added to Draw2D context
```

## Usage Examples

### Basic Horizontal Line
```javascript
const draw2D = Hud.createDraw2D();

const horizontalLine = draw2D.line()
    .pos(10, 50, 200, 50)     // Horizontal line
    .color(0x00FF00)          // Green color
    .width(2)                 // 2 pixel width
    .buildAndAdd();
```

### Vertical Line with Different Colors
```javascript
const verticalLine = draw2D.line()
    .pos(100, 10, 100, 200)   // Vertical line
    .color(255, 0, 0, 200)    // Red with transparency
    .width(3)                 // 3 pixel width
    .zIndex(2)                // Layer 2
    .buildAndAdd();
```

### Diagonal Line with Rotation
```javascript
// Create a diagonal line, then rotate it
const diagonalLine = draw2D.line()
    .pos(0, 0, 150, 150)      // Diagonal from top-left to bottom-right
    .color(0x0000FF)          // Blue color
    .width(2.5)               // 2.5 pixel width
    .rotation(45)             // Rotate additional 45 degrees
    .rotateCenter(true)       // Rotate around center
    .buildAndAdd();
```

### Animated Color Line
```javascript
let hue = 0;
let animatedLine;

function createAnimatedLine() {
    animatedLine = draw2D.line()
        .pos(50, 100, 250, 100)
        .width(4)
        .color(0xFF0000) // Initial red color
        .build();
}

function updateLineColor() {
    hue = (hue + 2) % 360;
    const color = hslToRgb(hue, 100, 50);
    animatedLine.setColor(color);
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

// Initialize and animate
createAnimatedLine();
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    updateLineColor();
    // Re-add the line to make it visible
    draw2D.addChild(animatedLine);
}));
```

### Grid Creation
```javascript
function createGrid(spacing = 20, color = 0x40FFFFFF) {
    const draw2D = Hud.createDraw2D();
    const windowWidth = Hud.getScreen().getScaledWidth();
    const windowHeight = Hud.getScreen().getScaledHeight();

    // Create vertical lines
    for (let x = 0; x <= windowWidth; x += spacing) {
        draw2D.line()
            .pos(x, 0, x, windowHeight)
            .color(color)
            .width(1)
            .zIndex(0)
            .buildAndAdd();
    }

    // Create horizontal lines
    for (let y = 0; y <= windowHeight; y += spacing) {
        draw2D.line()
            .pos(0, y, windowWidth, y)
            .color(color)
            .width(1)
            .zIndex(0)
            .buildAndAdd();
    }
}

createGrid(50, 0x30FFFFFF); // 50-pixel grid with semi-transparent white
```

### Health Bar Using Lines
```javascript
function createHealthBar() {
    const draw2D = Hud.createDraw2D();

    // Background line (red outline)
    const background = draw2D.line()
        .pos(10, 60, 110, 60)
        .color(0x800000)  // Dark red
        .width(8)
        .zIndex(1)
        .build();

    // Foreground line (green health)
    const foreground = draw2D.line()
        .pos(10, 60, 110, 60)
        .color(0x00FF00)  // Green
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

            // Update foreground line length
            const endX = 10 + Math.floor(100 * healthPercent);
            foreground.setPos2(endX, 60);

            // Change color based on health
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
    events.on("Tick", JavaWrapper.methodToJavaAsync(updateHealthBar));

    return { background, foreground };
}

const healthBar = createHealthBar();
```

### Multiple Line Patterns
```javascript
function createStarPattern(centerX, centerY, size, color) {
    const draw2D = Hud.createDraw2D();
    const points = 5;
    const angleStep = (Math.PI * 2) / (points * 2);

    for (let i = 0; i < points; i++) {
        const angle1 = i * angleStep * 2;
        const angle2 = (i * angleStep * 2) + angleStep;

        // Outer point
        const x1 = centerX + Math.cos(angle1) * size;
        const y1 = centerY + Math.sin(angle1) * size;

        // Inner point
        const x2 = centerX + Math.cos(angle2) * (size * 0.4);
        const y2 = centerY + Math.sin(angle2) * (size * 0.4);

        draw2D.line()
            .pos(Math.floor(x1), Math.floor(y1), Math.floor(x2), Math.floor(y2))
            .color(color)
            .width(2)
            .buildAndAdd();

        // Connect to next outer point
        const nextAngle1 = ((i + 1) * angleStep * 2);
        const x3 = centerX + Math.cos(nextAngle1) * size;
        const y3 = centerY + Math.sin(nextAngle1) * size;

        draw2D.line()
            .pos(Math.floor(x2), Math.floor(y2), Math.floor(x3), Math.floor(y3))
            .color(color)
            .width(2)
            .buildAndAdd();
    }
}

// Create a star in the center of the screen
const screenCenterX = Hud.getScreen().getScaledWidth() / 2;
const screenCenterY = Hud.getScreen().getScaledHeight() / 2;
createStarPattern(screenCenterX, screenCenterY, 50, 0xFFFF00);
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `Line` instance
3. **Color Overwrites:** Setting both general and specific colors - the last call takes precedence
4. **Rotation:** Rotation is applied clockwise and can be combined with center rotation
5. **Line Width:** Width is in pixels and affects line thickness
6. **Z-Index:** Higher z-index values render on top of lower values
7. **Performance:** Creating many lines can impact performance, consider reusing instances
8. **Coordinate System:** Screen coordinates where (0,0) is top-left corner

## Related Classes

- `Line` - The main line class that this builder creates
- `Draw2D` - The 2D drawing context that provides the builder
- `RenderElement` - Interface that Line implements
- `RenderElementBuilder` - Abstract base class for all builders

## Version History

- **1.8.4:** Initial release with builder pattern support
- **Current:** Enhanced with comprehensive method set and improved color handling