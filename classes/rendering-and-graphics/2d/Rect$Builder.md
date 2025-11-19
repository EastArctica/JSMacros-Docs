# Rect.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Rect$Builder`

**Implements:** Builder pattern for `Rect`

**Since:** JsMacros 1.8.4

The `Rect.Builder` class provides a fluent interface for creating `Rect` instances with method chaining. It's the recommended way to create rectangles with complex configurations or when you need to set multiple properties in a readable manner.

## Overview

The `Rect.Builder` class allows you to construct `Rect` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw2D.rect()` method and provides two final operations:
- `build()` - Creates the Rect instance
- `buildAndAdd()` - Creates the Rect instance and automatically adds it to the Draw2D context

## Creating a Builder

```javascript
// Obtain a builder from Draw2D context
const draw2D = Hud.createDraw2D();
const builder = draw2D.rect();
```

## Builder Methods

### Position Methods

#### `pos(x1, y1, x2, y2)`
Sets the rectangle position using two opposite corners in a single call.

**Parameters:**
- `x1` (int): X coordinate of the first corner
- `y1` (int): Y coordinate of the first corner
- `x2` (int): X coordinate of the second corner
- `y2` (int): Y coordinate of the second corner

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const rect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0xFF0000)
    .build();
```

#### `pos1(x, y)`
Sets the position of the first corner.

**Parameters:**
- `x` (int): X coordinate of the first corner
- `y` (int): Y coordinate of the first corner

**Returns:** `Rect.Builder` - Self for chaining

#### `pos2(x, y)`
Sets the position of the second corner.

**Parameters:**
- `x` (int): X coordinate of the second corner
- `y` (int): Y coordinate of the second corner

**Returns:** `Rect.Builder` - Self for chaining

#### `x1(x)`
Sets only the X coordinate of the first corner.

**Parameters:**
- `x` (int): X coordinate of the first corner

**Returns:** `Rect.Builder` - Self for chaining

#### `y1(y)`
Sets only the Y coordinate of the first corner.

**Parameters:**
- `y` (int): Y coordinate of the first corner

**Returns:** `Rect.Builder` - Self for chaining

#### `x2(x)`
Sets only the X coordinate of the second corner.

**Parameters:**
- `x` (int): X coordinate of the second corner

**Returns:** `Rect.Builder` - Self for chaining

#### `y2(y)`
Sets only the Y coordinate of the second corner.

**Parameters:**
- `y` (int): Y coordinate of the second corner

**Returns:** `Rect.Builder` - Self for chaining

### Size Methods

#### `size(width, height)`
Sets both width and height of the rectangle.

**Parameters:**
- `width` (int): Width of the rectangle in pixels
- `height` (int): Height of the rectangle in pixels

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const rect = draw2D.rect()
    .pos(10, 10)
    .size(100, 50)
    .color(0x00FF00)
    .build();
```

#### `width(width)`
Sets only the width of the rectangle.

**Parameters:**
- `width` (int): Width of the rectangle in pixels

**Returns:** `Rect.Builder` - Self for chaining

#### `height(height)`
Sets only the height of the rectangle.

**Parameters:**
- `height` (int): Height of the rectangle in pixels

**Returns:** `Rect.Builder` - Self for chaining

### Color Methods

#### `color(color)`
Sets the rectangle color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const redRect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets the rectangle color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlue = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets the rectangle color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const greenRect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0, 255, 0)
    .build();
```

#### `color(r, g, b, a)`
Sets the rectangle color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const purpleRect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(128, 0, 128, 200)
    .build();
```

#### `alpha(alpha)`
Sets only the alpha transparency value while preserving RGB color.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const fadedRect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0xFF0000)
    .alpha(100)
    .build();
```

### Transform Methods

#### `rotation(degrees)`
Sets the rotation angle of the rectangle (clockwise).

**Parameters:**
- `degrees` (double): Rotation angle in degrees

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const rotatedRect = draw2D.rect()
    .pos(50, 50, 150, 100)
    .rotation(45)
    .color(0xFF00FF)
    .build();
```

#### `rotateCenter(centerEnabled)`
Sets whether the rectangle should rotate around its center point.

**Parameters:**
- `centerEnabled` (boolean): true to rotate around center, false to rotate around origin

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const centeredRotation = draw2D.rect()
    .pos(50, 50, 150, 100)
    .rotation(45)
    .rotateCenter(true)
    .color(0x00FFFF)
    .build();
```

### Layering Methods

#### `zIndex(index)`
Sets the z-index for rendering order. Higher values render on top.

**Parameters:**
- `index` (int): Z-index value

**Returns:** `Rect.Builder` - Self for chaining

**Example:**
```javascript
const topRect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0xFFFF00)
    .zIndex(100)
    .build();
```

### Building Methods

#### `build()`
Creates the configured `Rect` instance without adding it to the Draw2D context.

**Returns:** `Rect` - The constructed Rect instance

**Example:**
```javascript
const rect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0xFF0000)
    .build();

// Add to context manually later
draw2D.addChild(rect);
```

#### `buildAndAdd()`
Creates the configured `Rect` instance and automatically adds it to the Draw2D context.

**Returns:** `Rect` - The constructed and added Rect instance

**Example:**
```javascript
const rect = draw2D.rect()
    .pos(10, 10, 110, 60)
    .color(0x00FF00)
    .buildAndAdd(); // Automatically added to Draw2D context
```

## Usage Examples

### Basic Rectangle Creation
```javascript
const draw2D = Hud.createDraw2D();

// Create a simple green rectangle
const greenRect = draw2D.rect()
    .pos(10, 10, 60, 60)
    .color(0x00FF00)
    .buildAndAdd();
```

### Semi-Transparent Background
```javascript
// Create a semi-transparent black background for text
const background = draw2D.rect()
    .pos(5, 5, 200, 30)
    .color(0x000000, 128)  // Black with 50% transparency
    .buildAndAdd();
```

### Rotated Rectangle
```javascript
// Create a rotated red rectangle
const rotatedRect = draw2D.rect()
    .pos(50, 50, 100, 100)
    .color(0xFF0000)
    .rotation(45)
    .rotateCenter(true)
    .buildAndAdd();
```

### Dynamic Health Bar
```javascript
// Create a dynamic health bar that updates with player health
let healthBarBackground;
let healthBarForeground;

function createHealthBar() {
    const draw2D = Hud.createDraw2D();

    // Background (always red)
    healthBarBackground = draw2D.rect()
        .pos(10, 60, 110, 65)
        .color(0x800000)  // Dark red
        .build();

    // Foreground (changes with health)
    healthBarForeground = draw2D.rect()
        .pos(10, 60, 110, 65)
        .color(0x00FF00)  // Green
        .build();

    draw2D.addChild(healthBarBackground);
    draw2D.addChild(healthBarForeground);
}

function updateHealthBar() {
    const player = Player.getPlayer();
    if (player && healthBarForeground) {
        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const healthPercent = health / maxHealth;

        // Update width based on health
        const endX = 10 + Math.floor(100 * healthPercent);
        healthBarForeground.setPos2(endX, 65);

        // Change color based on health level
        let color;
        if (healthPercent > 0.6) {
            color = 0x00FF00; // Green
        } else if (healthPercent > 0.3) {
            color = 0xFFFF00; // Yellow
        } else {
            color = 0xFF0000; // Red
        }
        healthBarForeground.setColor(color);
    }
}

// Initialize and update
createHealthBar();
events.on("Tick", JavaWrapper.methodToJavaAsync(updateHealthBar));
```

### Layered Rectangle Effect
```javascript
// Create a layered effect with multiple rectangles
function createLayeredRect() {
    const draw2D = Hud.createDraw2D();

    // Outer border - white
    const outerBorder = draw2D.rect()
        .pos(10, 10, 210, 110)
        .color(0xFFFFFF)
        .zIndex(3)
        .build();

    // Middle layer - gray
    const middleLayer = draw2D.rect()
        .pos(12, 12, 208, 108)
        .color(0x808080)
        .zIndex(2)
        .build();

    // Inner fill - black
    const innerFill = draw2D.rect()
        .pos(14, 14, 206, 106)
        .color(0x000000)
        .zIndex(1)
        .build();

    // Add all layers
    draw2D.addChild(innerFill);
    draw2D.addChild(middleLayer);
    draw2D.addChild(outerBorder);
}

createLayeredRect();
```

### Animated Pulsing Rectangle
```javascript
// Create an animated pulsing rectangle
let pulseRect;
let pulseTime = 0;

function createPulsingRect() {
    const draw2D = Hud.createDraw2D();

    pulseRect = draw2D.rect()
        .pos(100, 100, 120, 120)
        .color(0xFF00FF, 200)
        .build();
}

function animatePulse() {
    if (!pulseRect) return;

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

    // Re-add to make visible
    Hud.createDraw2D().addChild(pulseRect);
}

// Initialize and animate
createPulsingRect();
events.on("Tick", JavaWrapper.methodToJavaAsync(animatePulse));
```

### Color Palette Display
```javascript
// Display a palette of different colored rectangles
function createColorPalette() {
    const draw2D = Hud.createDraw2D();
    const colors = [
        0xFF0000, // Red
        0x00FF00, // Green
        0x0000FF, // Blue
        0xFFFF00, // Yellow
        0xFF00FF, // Magenta
        0x00FFFF, // Cyan
        0xFFFFFF, // White
        0x000000  // Black
    ];

    colors.forEach((color, index) => {
        const rect = draw2D.rect()
            .pos(10 + index * 35, 10, 40 + index * 35, 40)
            .color(color)
            .buildAndAdd();
    });
}

createColorPalette();
```

### Button States
```javascript
// Create rectangles representing different button states
function createButtonStates() {
    const draw2D = Hud.createDraw2D();

    // Normal state
    const normalButton = draw2D.rect()
        .pos(10, 50, 110, 80)
        .color(0xCCCCCC)
        .build();

    // Hover state
    const hoverButton = draw2D.rect()
        .pos(120, 50, 220, 80)
        .color(0xAAAAAA)
        .build();

    // Pressed state
    const pressedButton = draw2D.rect()
        .pos(230, 50, 330, 80)
        .color(0x888888)
        .build();

    // Add labels (assuming text functionality)
    // textHelper.create("Normal", 15, 62);
    // textHelper.create("Hover", 125, 62);
    // textHelper.create("Pressed", 235, 62);

    draw2D.addChild(normalButton);
    draw2D.addChild(hoverButton);
    draw2D.addChild(pressedButton);
}

createButtonStates();
```

### Multiple Rectangles in Grid
```javascript
// Create a grid of colored rectangles
function createRectangleGrid(rows, cols, size, spacing) {
    const draw2D = Hud.createDraw2D();
    const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = 10 + col * (size + spacing);
            const y = 10 + row * (size + spacing);
            const colorIndex = (row * cols + col) % colors.length;

            const rect = draw2D.rect()
                .pos(x, y, x + size, y + size)
                .color(colors[colorIndex])
                .alpha(200)
                .buildAndAdd();
        }
    }
}

createRectangleGrid(5, 8, 20, 5);
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `Rect` instance
3. **Color Overwrites:** Setting both general and specific colors - the last call takes precedence
4. **Rotation:** Rotation is clockwise and can be combined with center rotation
5. **Alpha Values:** Alpha is independent of RGB components and controls transparency
6. **Z-Index:** Higher z-index values render on top of lower values
7. **Coordinate System:** Screen coordinates where (0,0) is top-left corner
8. **Size Preservation:** Methods like `setWidth()` and `setHeight()` preserve the position of the corner with the smaller coordinate value

## Related Classes

- `Rect` - The main rectangle class that this builder creates
- `Draw2D` - The 2D drawing context that provides the builder
- `RenderElement` - Interface that Rect implements
- `RenderElementBuilder` - Abstract base class for all builders

## Version History

- **1.8.4:** Initial release with builder pattern support
- **Current:** Enhanced with comprehensive method set and improved color handling