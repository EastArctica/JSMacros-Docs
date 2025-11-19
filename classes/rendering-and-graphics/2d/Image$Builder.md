# Image.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Image$Builder`

**Implements:** Builder pattern for `Image`

**Since:** JsMacros 1.8.4

The `Image.Builder` class provides a fluent interface for creating `Image` instances with method chaining. It's the recommended way to create images with complex configurations or when you need to set multiple properties in a readable manner.

## Overview

The `Image.Builder` class allows you to construct `Image` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw2D.image(textureId)` method and provides two final operations:
- `build()` - Creates the Image instance
- `buildAndAdd()` - Creates the Image instance and automatically adds it to the Draw2D context

## Creating a Builder

```javascript
// Obtain a builder from Draw2D context with texture ID
const draw2D = Hud.createDraw2D();
const builder = draw2D.image("minecraft:texture/gui/icons.png");
```

## Builder Methods

### Texture Methods

#### `texture(textureId)`
Sets the texture identifier for the image.

**Parameters:**
- `textureId` (String): The texture identifier (e.g., "minecraft:texture/gui/icons.png")

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const builder = draw2D.image()
    .texture("minecraft:texture/gui/icons.png")
    .build();
```

#### `fromCustomImage(customImage)`
Sets texture, position, and size from a CustomImage object.

**Parameters:**
- `customImage` (CustomImage): The CustomImage object containing texture and dimension info

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const customImage = File.createTempImage("my_texture.png", imageBytes);
const image = draw2D.image()
    .fromCustomImage(customImage)
    .pos(20, 20)
    .build();
```

### Position Methods

#### `pos(x, y)`
Sets the position of the image on the screen.

**Parameters:**
- `x` (int): X coordinate on screen
- `y` (int): Y coordinate on screen

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const image = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(50, 100)
    .build();
```

#### `x(x)`
Sets only the X coordinate of the image.

**Parameters:**
- `x` (int): X coordinate on screen

**Returns:** `Image.Builder` - Self for chaining

#### `y(y)`
Sets only the Y coordinate of the image.

**Parameters:**
- `y` (int): Y coordinate on screen

**Returns:** `Image.Builder` - Self for chaining

### Size Methods

#### `size(width, height)`
Sets the render size of the image.

**Parameters:**
- `width` (int): Width to render the image
- `height` (int): Height to render the image

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const image = draw2D.image("minecraft:texture/gui/icons.png")
    .size(32, 32)
    .build();
```

#### `width(width)`
Sets only the width of the image.

**Parameters:**
- `width` (int): Width to render the image

**Returns:** `Image.Builder` - Self for chaining

#### `height(height)`
Sets only the height of the image.

**Parameters:**
- `height` (int): Height to render the image

**Returns:** `Image.Builder` - Self for chaining

### Texture Region Methods

#### `regions(x, y, width, height)`
Sets the texture region coordinates and dimensions.

**Parameters:**
- `x` (int): X coordinate in texture to start from
- `y` (int): Y coordinate in texture to start from
- `width` (int): Width of the region in texture to use
- `height` (int): Height of the region in texture to use

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
// Use a 16x16 region starting at coordinates (52, 0) in the texture
const heartIcon = draw2D.image("minecraft:texture/gui/icons.png")
    .regions(52, 0, 16, 16)
    .size(16, 16)
    .build();
```

#### `regionX(x)`
Sets only the X coordinate in texture to start from.

**Parameters:**
- `x` (int): X coordinate in texture

**Returns:** `Image.Builder` - Self for chaining

#### `regionY(y)`
Sets only the Y coordinate in texture to start from.

**Parameters:**
- `y` (int): Y coordinate in texture

**Returns:** `Image.Builder` - Self for chaining

#### `regionWidth(width)`
Sets only the width of the region in texture to use.

**Parameters:**
- `width` (int): Width of the region

**Returns:** `Image.Builder` - Self for chaining

#### `regionHeight(height)`
Sets only the height of the region in texture to use.

**Parameters:**
- `height` (int): Height of the region

**Returns:** `Image.Builder` - Self for chaining

#### `textureSize(width, height)`
Sets the total size of the texture.

**Parameters:**
- `width` (int): Total width of the texture
- `height` (int): Total height of the texture

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const image = draw2D.image("my_texture.png")
    .regions(0, 0, 64, 64)
    .textureSize(256, 256)
    .build();
```

#### `textureWidth(width)`
Sets only the total width of the texture.

**Parameters:**
- `width` (int): Total width of the texture

**Returns:** `Image.Builder` - Self for chaining

#### `textureHeight(height)`
Sets only the total height of the texture.

**Parameters:**
- `height` (int): Total height of the texture

**Returns:** `Image.Builder` - Self for chaining

### Color Methods

#### `color(color)`
Sets the image color tint using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const redTintedImage = draw2D.image("minecraft:texture/gui/icons.png")
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets the image color tint using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlue = draw2D.image("minecraft:texture/gui/icons.png")
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets the image color tint using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const greenTint = draw2D.image("minecraft:texture/gui/icons.png")
    .color(0, 255, 0)
    .build();
```

#### `color(r, g, b, a)`
Sets the image color tint using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const purpleTint = draw2D.image("minecraft:texture/gui/icons.png")
    .color(128, 0, 128, 200)
    .build();
```

#### `alpha(alpha)`
Sets only the alpha transparency value.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const transparentImage = draw2D.image("minecraft:texture/gui/icons.png")
    .alpha(100)
    .build();
```

### Transform Methods

#### `rotation(degrees)`
Sets the rotation angle of the image (clockwise).

**Parameters:**
- `degrees` (float): Rotation angle in degrees

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const rotatedIcon = draw2D.image("minecraft:texture/gui/icons.png")
    .rotation(45)
    .build();
```

### Layering Methods

#### `zIndex(index)`
Sets the z-index for rendering order. Higher values render on top.

**Parameters:**
- `index` (int): Z-index value

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const topLayerImage = draw2D.image("minecraft:texture/gui/icons.png")
    .zIndex(100)
    .build();
```

### Alignment Methods

#### `align(horizontal, vertical)`
Sets the alignment relative to parent container.

**Parameters:**
- `horizontal` (String): Horizontal alignment ("left", "center", "right")
- `vertical` (String): Vertical alignment ("top", "center", "bottom")

**Returns:** `Image.Builder` - Self for chaining

**Example:**
```javascript
const centeredImage = draw2D.image("minecraft:texture/gui/icons.png")
    .align("center", "center")
    .build();
```

#### `alignX(horizontal)`
Sets only the horizontal alignment.

**Parameters:**
- `horizontal` (String): Horizontal alignment ("left", "center", "right")

**Returns:** `Image.Builder` - Self for chaining

#### `alignY(vertical)`
Sets only the vertical alignment.

**Parameters:**
- `vertical` (String): Vertical alignment ("top", "center", "bottom")

**Returns:** `Image.Builder` - Self for chaining

### Building Methods

#### `build()`
Creates the configured `Image` instance without adding it to the Draw2D context.

**Returns:** `Image` - The constructed Image instance

**Example:**
```javascript
const image = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(10, 10)
    .size(32, 32)
    .color(0xFF0000)
    .build();

// Add to context manually later
draw2D.addChild(image);
```

#### `buildAndAdd()`
Creates the configured `Image` instance and automatically adds it to the Draw2D context.

**Returns:** `Image` - The constructed and added Image instance

**Example:**
```javascript
const image = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(10, 10)
    .size(32, 32)
    .color(0x00FF00)
    .buildAndAdd(); // Automatically added to Draw2D context
```

## Usage Examples

### Basic Icon Display
```javascript
const draw2D = Hud.createDraw2D();

// Display a heart icon
const heartIcon = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(10, 10)
    .size(16, 16)
    .regions(52, 0, 9, 9)  // Heart icon coordinates
    .color(0xFF0000)
    .buildAndAdd();
```

### Health Bar Creation
```javascript
// Create a health bar background and foreground
const background = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(10, 10)
    .size(81, 9)
    .regions(16, 0, 81, 9)  // Empty heart background
    .color(0x404040)
    .alpha(128)
    .build();

const foreground = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(10, 10)
    .size(81, 9)
    .regions(52, 0, 81, 9)  // Full heart foreground
    .color(0xFF0000)
    .alpha(255)
    .build();

draw2D.addChild(background);
draw2D.addChild(foreground);
```

### Rotated, Colored Icon
```javascript
// Create a custom colored, rotated icon
const icon = draw2D.image("minecraft:texture/gui/icons.png")
    .pos(50, 50)
    .size(16, 16)
    .regions(16, 16, 16, 16)
    .color(0x00FF00, 200)  // Green with transparency
    .rotation(45)          // 45 degree rotation
    .zIndex(10)
    .buildAndAdd();
```

### Centered Custom Crosshair
```javascript
// Create a custom crosshair
const crosshair = draw2D.image("minecraft:texture/gui/icons.png")
    .align("center", "center")
    .size(16, 16)
    .regions(0, 0, 16, 16)  // Assuming crosshair is at 0,0
    .color(0xFFFFFF)
    .alpha(200)
    .zIndex(1000)
    .build();
```

### Icon Bar Creation
```javascript
// Create a row of status icons
function createIconBar() {
    const draw2D = Hud.createDraw2D();
    const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF];
    const regions = [
        [52, 0, 9, 9],   // Heart
        [16, 0, 9, 9],   // Empty heart
        [34, 0, 9, 9],   // Half heart
        [61, 0, 8, 8],   // Food
        [25, 0, 9, 9]    // Attack indicator
    ];

    colors.forEach((color, index) => {
        const icon = draw2D.image("minecraft:texture/gui/icons.png")
            .pos(10 + index * 20, 10)
            .size(16, 16)
            .regions(...regions[index])
            .color(color)
            .buildAndAdd();
    });
}

createIconBar();
```

### Working with Custom Images
```javascript
// Use a custom loaded image
const customImage = File.createTempImage("my_texture.png", imageBytes);

const customImg = draw2D.image()
    .fromCustomImage(customImage)  // Auto-sets texture, regions, and size
    .pos(20, 20)
    .color(0xFFFFFF)
    .rotation(15)
    .buildAndAdd();
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `Image` instance
3. **Texture Regions:** Ensure region coordinates are within texture bounds
4. **Color Overwrites:** Setting both general and specific colors - the last call takes precedence
5. **Alpha Values:** Alpha is independent of RGB components and controls transparency
6. **Rotation:** Rotation is clockwise and applied around the image center
7. **Z-Index:** Higher z-index values render on top of lower values
8. **Alignment:** Alignment affects positioning relative to the parent container

## Related Classes

- `Image` - The main image class that this builder creates
- `Draw2D` - The 2D drawing context that provides the builder
- `CustomImage` - For loading custom textures
- `RenderElement` - Interface that Image implements
- `RenderElementBuilder` - Abstract base class for all builders

## Version History

- **1.8.4:** Initial release with builder pattern support
- **Current:** Enhanced with comprehensive method set and improved alignment system