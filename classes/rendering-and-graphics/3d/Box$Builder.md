# Box.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Box$Builder`

**Implements:** Builder pattern for `Box`

**Since:** JsMacros 1.8.4

The `Box.Builder` class provides a fluent interface for creating `Box` instances with method chaining. It's the recommended way to create boxes with complex configurations or when you need to set multiple properties in a readable manner.

## Overview

The `Box.Builder` class allows you to construct `Box` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw3D.box()` method and provides two final operations:
- `build()` - Creates the Box instance
- `buildAndAdd()` - Creates the Box instance and automatically adds it to the Draw3D context

## Creating a Builder

```javascript
// Obtain a builder from Draw3D context
const draw3D = Hud.createDraw3D();
const builder = draw3D.box();
```

## Builder Methods

### Position Methods

#### `pos(x1, y1, z1, x2, y2, z2)`
Sets the box position using two opposite corners in 3D space.

**Parameters:**
- `x1` (double): X coordinate of first corner
- `y1` (double): Y coordinate of first corner
- `z1` (double): Z coordinate of first corner
- `x2` (double): X coordinate of second corner
- `y2` (double): Y coordinate of second corner
- `z2` (double): Z coordinate of second corner

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const box = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .build();
```

#### `forBlock(x, y, z)`
Sets the box position to highlight a specific block at the given coordinates.

**Parameters:**
- `x` (int): Block X coordinate
- `y` (int): Block Y coordinate
- `z` (int): Block Z coordinate

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const blockHighlight = draw3D.box()
    .forBlock(100, 65, -50)
    .color(0xFFFF00)
    .build();
```

#### `fromPoint(x, y, z)`
Sets the starting position of the box to a specific point.

**Parameters:**
- `x` (double): X coordinate of start point
- `y` (double): Y coordinate of start point
- `z` (double): Z coordinate of start point

**Returns:** `Box.Builder` - Self for chaining

#### `toPoint(x, y, z)`
Sets the ending position of the box to a specific point.

**Parameters:**
- `x` (double): X coordinate of end point
- `y` (double): Y coordinate of end point
- `z` (double): Z coordinate of end point

**Returns:** `Box.Builder` - Self for chaining

### Color Methods

#### `color(color)`
Sets both outline and fill color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const redBox = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets both outline and fill color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlueBox = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets both outline and fill color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const greenBox = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .color(0, 255, 0)
    .build();
```

#### `color(r, g, b, a)`
Sets both outline and fill color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const purpleBox = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .color(128, 0, 128, 200)
    .build();
```

#### `outlineColor(color)`
Sets only the outline color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value for outline (0xRRGGBB)

**Returns:** `Box.Builder` - Self for chaining

#### `outlineColor(color, alpha)`
Sets only the outline color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value for outline (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Box.Builder` - Self for chaining

#### `outlineColor(r, g, b)`
Sets only the outline color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Box.Builder` - Self for chaining

#### `outlineColor(r, g, b, a)`
Sets only the outline color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `Box.Builder` - Self for chaining

#### `fillColor(color)`
Sets only the fill color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value for fill (0xRRGGBB)

**Returns:** `Box.Builder` - Self for chaining

#### `fillColor(color, alpha)`
Sets only the fill color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value for fill (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Box.Builder` - Self for chaining

#### `fillColor(r, g, b)`
Sets only the fill color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Box.Builder` - Self for chaining

#### `fillColor(r, g, b, a)`
Sets only the fill color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `Box.Builder` - Self for chaining

### Appearance Methods

#### `fill(fillEnabled)`
Sets whether the box should be filled or just outlined.

**Parameters:**
- `fillEnabled` (boolean): true to fill the box, false for outline only

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const outlineBox = draw3D.box()
    .forBlock(0, 64, 0)
    .color(0xFF0000)
    .fill(false)
    .build();
```

#### `cull(cullEnabled)`
Sets whether back faces should be culled (not rendered).

**Parameters:**
- `cullEnabled` (boolean): true to cull back faces, false to render all faces

**Returns:** `Box.Builder` - Self for chaining

**Example:**
```javascript
const seeThroughBox = draw3D.box()
    .pos(-5, 64, -5, 5, 74, 5)
    .color(0x00FF00, 100)
    .fill(true)
    .cull(false)
    .build();
```

### Building Methods

#### `build()`
Creates the configured `Box` instance without adding it to the Draw3D context.

**Returns:** `Box` - The constructed Box instance

**Example:**
```javascript
const box = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .color(0xFF0000)
    .fill(true)
    .build();

// Add to context manually later
draw3D.addBox(box);
```

#### `buildAndAdd()`
Creates the configured `Box` instance and automatically adds it to the Draw3D context.

**Returns:** `Box` - The constructed and added Box instance

**Example:**
```javascript
const box = draw3D.box()
    .pos(0, 64, 0, 10, 74, 10)
    .color(0x00FF00)
    .fill(true)
    .buildAndAdd(); // Automatically added to Draw3D context
```

## Usage Examples

### Basic Box Creation
```javascript
const draw3D = Hud.createDraw3D();

// Simple green filled box
const box = draw3D.box()
    .pos(10, 65, 10, 20, 75, 20)
    .color(0x00FF00)
    .fill(true)
    .buildAndAdd();
```

### Block Highlighting
```javascript
// Highlight the block the player is looking at
const lookingAt = Player.getPlayer().rayTraceBlock(10);
if (lookingAt && lookingAt.block) {
    const blockPos = lookingAt.block.getBlockPos();

    const highlight = draw3D.box()
        .forBlock(blockPos.getX(), blockPos.getY(), blockPos.getZ())
        .outlineColor(0xFFFF00) // Yellow outline
        .fillColor(0xFFFF00, 50) // Semi-transparent yellow fill
        .cull(false)
        .buildAndAdd();
}
```

### Complex Configuration
```javascript
// Create a complex box with different outline and fill colors
const fancyBox = draw3D.box()
    .fromPoint(0, 64, 0)
    .toPoint(15, 80, 15)
    .outlineColor(255, 255, 255, 255) // White outline
    .fillColor(255, 0, 255, 128)      // Semi-transparent magenta fill
    .fill(true)
    .cull(false)
    .buildAndAdd();
```

### Batch Creation
```javascript
// Create multiple boxes efficiently
const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF];

colors.forEach((color, index) => {
    const box = draw3D.box()
        .pos(index * 12, 64, 0, (index + 1) * 12 - 2, 74, 10)
        .color(color, 200)
        .fill(true)
        .buildAndAdd();
});
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `Box` instance
3. **Color Overwrites:** Setting both general and specific colors (e.g., both `color()` and `outlineColor()`) - the last call takes precedence
4. **Position Validation:** The builder doesn't validate coordinates - ensure your positions make sense
5. **Context Binding:** The builder is bound to the Draw3D context it was created from
6. **Performance:** `buildAndAdd()` is slightly more efficient than `build()` followed by manual addition

## Related Classes

- `Box` - The main box class that this builder creates
- `Draw3D` - The 3D drawing context that provides the builder
- `RenderElement3D` - Interface that Box implements
- `RenderElementBuilder` - Abstract base class for all builders

## Version History

- **1.8.4:** Initial release with builder pattern support
- **Current:** Enhanced with comprehensive method set and improved color handling