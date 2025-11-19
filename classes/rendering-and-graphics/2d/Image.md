# Image

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Image`

**Implements:** `RenderElement`, `Alignable<Image>`

**Since:** JsMacros 1.2.3

## Overview

The `Image` class is a powerful rendering component for displaying images in JSMacros 2D rendering contexts. It provides comprehensive control over image positioning, sizing, coloring, rotation, and texture region selection. This class is commonly used for creating custom HUDs, overlays, GUI elements, and visual effects in Minecraft scripts.

Image instances can display portions of textures, apply color tints and transparency, support rotation transformations, and can be easily positioned relative to other elements using the built-in alignment system.

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
  - [Position and Size](#position-and-size)
  - [Image and Texture](#image-and-texture)
  - [Color and Transparency](#color-and-transparency)
  - [Rotation](#rotation)
  - [Alignment](#alignment)
  - [Hierarchy](#hierarchy)
  - [Utility](#utility)
- [Builder Class](#builder-class)
- [Usage Examples](#usage-examples)

## Constructors

### `new Image(x, y, width, height, zIndex, color, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight, rotation)`

Creates a new Image with the specified properties.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | int | X position of the image |
| `y` | int | Y position of the image |
| `width` | int | Width to render the image |
| `height` | int | Height to render the image |
| `zIndex` | int | Z-order depth for rendering |
| `color` | int | RGB color tint (0xRRGGBB) |
| `id` | String | Texture identifier (e.g., "minecraft:texture/gui/icons.png") |
| `imageX` | int | X coordinate in texture to start from |
| `imageY` | int | Y coordinate in texture to start from |
| `regionWidth` | int | Width of the region in texture to use |
| `regionHeight` | int | Height of the region in texture to use |
| `textureWidth` | int | Total width of the texture |
| `textureHeight` | int | Total height of the texture |
| `rotation` | float | Rotation angle in degrees (clockwise) |

### `new Image(x, y, width, height, zIndex, alpha, color, id, imageX, imageY, regionWidth, regionHeight, textureWidth, textureHeight, rotation)`

Creates a new Image with separate alpha and color values.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | int | X position of the image |
| `y` | int | Y position of the image |
| `width` | int | Width to render the image |
| `height` | int | Height to render the image |
| `zIndex` | int | Z-order depth for rendering |
| `alpha` | int | Alpha transparency (0-255) |
| `color` | int | RGB color tint (0xRRGGBB) |
| `id` | String | Texture identifier |
| `imageX` | int | X coordinate in texture to start from |
| `imageY` | int | Y coordinate in texture to start from |
| `regionWidth` | int | Width of the region in texture to use |
| `regionHeight` | int | Height of the region in texture to use |
| `textureWidth` | int | Total width of the texture |
| `textureHeight` | int | Total height of the texture |
| `rotation` | float | Rotation angle in degrees (clockwise) |

---

## Methods

### Position and Size

### Image and Texture

### Color and Transparency

### Rotation

### Alignment

### Hierarchy

### Utility

## Builder Class

The `Image.Builder` class provides a fluent interface for creating Image instances. It's the recommended way to create images with many properties.

### Creating a Builder

```js
const draw2d = Hud.createDraw2D();
const builder = draw2d.image("minecraft:texture/gui/icons.png");
```

### Builder Methods

## Usage Examples

### Basic Image Display

```js
// Create a draw2D context
const draw2d = Hud.createDraw2D();

// Display a simple heart icon from Minecraft's GUI texture
const heartImage = new Image(
    10, 10,           // x, y position
    9, 9,            // width, height
    0,               // z-index
    0xFF0000,        // red color tint
    "minecraft:texture/gui/icons.png", // texture
    52, 0,           // imageX, imageY in texture
    9, 9,            // regionWidth, regionHeight
    256, 256,        // textureWidth, textureHeight
    0                // rotation
);

draw2d.addChild(heartImage);
```

### Using the Builder Pattern

```js
const draw2d = Hud.createDraw2D();

// Create a custom colored, rotated icon
const icon = draw2d.image("minecraft:texture/gui/icons.png")
    .pos(50, 50)
    .size(16, 16)
    .regions(16, 16, 16, 16) // Use coordinates 16,16 with size 16x16
    .color(0x00FF00) // Green tint
    .alpha(200) // Slightly transparent
    .rotation(45) // 45 degree rotation
    .zIndex(10)
    .build();

draw2d.addChild(icon);
```

### Creating a Custom HUD Element

```js
// Create a simple health bar background and foreground
function createHealthBar() {
    const draw2d = Hud.createDraw2D();

    // Background bar (dark gray)
    const background = draw2d.image("minecraft:texture/gui/icons.png")
        .pos(10, 10)
        .size(81, 9)
        .regions(16, 0, 81, 9) // Empty heart background
        .color(0x404040)
        .alpha(128)
        .build();

    // Foreground bar (red)
    const foreground = draw2d.image("minecraft:texture/gui/icons.png")
        .pos(10, 10)
        .size(81, 9)
        .regions(52, 0, 81, 9) // Full heart foreground
        .color(0xFF0000)
        .alpha(255)
        .build();

    draw2d.addChild(background);
    draw2d.addChild(foreground);

    return { background, foreground };
}

// Create health bar
const healthBar = createHealthBar();
Hud.registerDraw2D(healthBar.background);
```

### Animated Image Effects

```js
// Create a rotating, pulsing icon
function createAnimatedIcon() {
    const draw2d = Hud.createDraw2D();
    let rotation = 0;
    let scale = 1.0;
    let growing = true;

    const icon = draw2d.image("minecraft:texture/item/diamond_sword.png")
        .pos(100, 100)
        .size(32, 32)
        .color(0xFFFFFF)
        .build();

    // Animation update function
    function updateAnimation() {
        rotation += 2;
        if (rotation >= 360) rotation = 0;

        if (growing) {
            scale += 0.01;
            if (scale >= 1.2) growing = false;
        } else {
            scale -= 0.01;
            if (scale <= 0.8) growing = true;
        }

        // Update icon properties
        icon.setRotation(rotation);
        const baseSize = 32;
        const newSize = Math.floor(baseSize * scale);
        icon.setSize(newSize, newSize);
        icon.setPos(100 - (newSize - baseSize) / 2, 100 - (newSize - baseSize) / 2);
    }

    // Register animation
    events.on("Tick", JavaWrapper.methodToJavaAsync(updateAnimation));

    return icon;
}

const animatedIcon = createAnimatedIcon();
Hud.registerDraw2D(animatedIcon);
```

### Creating a Custom Crosshair

```js
function createCustomCrosshair() {
    const draw2d = Hud.createDraw2D();

    // Use a simple texture for the crosshair
    const crosshair = draw2d.image("minecraft:texture/gui/icons.png")
        .align("center", "center") // Center on screen
        .size(16, 16)
        .regions(0, 0, 16, 16) // Assume crosshair is at 0,0
        .color(0xFFFFFF)
        .alpha(200)
        .zIndex(1000) // Render on top
        .build();

    return crosshair;
}

const crosshair = createCustomCrosshair();
Hud.registerDraw2D(crosshair);
```

### Working with Custom Images

```js
// Create a custom image first
const customImage = File.createTempImage("my_texture.png", imageBytes);

// Then use it in an Image component
const draw2d = Hud.createDraw2D();

const customImg = draw2d.image("jsmacros_temp:my_texture.png")
    .fromCustomImage(customImage) // Auto-set dimensions and regions
    .pos(20, 20)
    .color(0xFFFFFF)
    .build();

draw2d.addChild(customImg);
```

### Multiple Icons Layout

```js
function createIconBar() {
    const draw2d = Hud.createDraw2D();
    const icons = [];

    const iconTexture = "minecraft:texture/gui/icons.png";
    let xOffset = 10;

    // Create a row of different colored status icons
    const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF];
    const regions = [
        [52, 0, 9, 9],   // Heart
        [16, 0, 9, 9],   // Empty heart
        [34, 0, 9, 9],   // Half heart
        [61, 0, 8, 8],   // Food
        [25, 0, 9, 9]    // Attack indicator
    ];

    colors.forEach((color, index) => {
        const icon = draw2d.image(iconTexture)
            .pos(xOffset, 10)
            .size(16, 16)
            .regions(...regions[index])
            .color(color)
            .build();

        icons.push(icon);
        xOffset += 20; // Space icons 20 pixels apart
    });

    icons.forEach(icon => draw2d.addChild(icon));
    return draw2d;
}

const iconBar = createIconBar();
Hud.registerDraw2D(iconBar);
```

## Important Notes

1. **Texture Coordinates**: When specifying `imageX`, `imageY`, `regionWidth`, and `regionHeight`, ensure they are within the bounds of the specified texture.

2. **Color Format**: Colors should be provided in hexadecimal format (0xRRGGBB). The alpha channel can be set separately or included in the color (0xAARRGGBB).

3. **Performance**: Creating and modifying many Image objects can impact performance. Consider reusing objects when possible and minimizing updates per frame.

4. **Texture Loading**: Texture identifiers must be valid Minecraft resource locations or registered custom textures.

5. **Z-Index**: Higher z-index values render on top of lower values. Use this to control layering of multiple images.

6. **Coordinate System**: The coordinate system starts from the top-left corner (0,0) with Y increasing downward.

7. **Alignment**: The alignment system provides powerful positioning relative to parent containers or other elements.

8. **Rotation**: Rotation is clockwise and can be combined with scaling and translation effects.

9. **Parent Context**: Images need a parent draw context to be rendered. Use `Hud.registerDraw2D()` or add to existing draw contexts.

10. **Custom Images**: Use `CustomImage` class to load external textures and use them with Image components.

## Related Classes

- `Draw2D` - 2D rendering context
- `CustomImage` - Custom texture loading
- `RenderElement` - Base interface for renderable elements
- `Alignable` - Interface for element alignment
- `Hud` - HUD management and registration

## Version History

- **1.2.3**: Initial release with basic image rendering
- **1.2.6**: Added rotation support
- **1.6.5**: Added color and alpha control
- **1.8.4**: Major update with Builder pattern, alignment system, and enhanced positioning methods

