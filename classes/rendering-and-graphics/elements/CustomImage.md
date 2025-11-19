# CustomImage

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.CustomImage`

**Since:** JsMacros 1.8.4

The `CustomImage` class provides a powerful way to create and manipulate custom images for use in JSMacros. It allows users to create dynamic images with drawing capabilities, load external images, and use them in HUD elements and other graphical components. The class integrates with Minecraft's texture system and provides both low-level pixel manipulation and high-level drawing operations.

## Overview

The `CustomImage` class offers comprehensive image manipulation capabilities:
- Create new images from scratch or load existing image files
- Draw shapes, text, and other images onto the canvas
- Manipulate individual pixels with ARGB color format
- Save created images to files
- Integration with Minecraft's rendering system for use in HUD elements
- Extensive drawing operations including lines, rectangles, polygons, and text

## Constructors

### `new CustomImage(image)`
Creates a new CustomImage from a BufferedImage.

**Parameters:**
| Parameter | Type          | Description                      |
| --------- | ------------- | -------------------------------- |
| image     | BufferedImage | The BufferedImage to wrap        |

**Example:**
```javascript
const bufferedImage = new java.awt.image.BufferedImage(256, 256, java.awt.image.BufferedImage.TYPE_INT_ARGB);
const customImage = new CustomImage(bufferedImage);
```

### `new CustomImage(image, name)`
Creates a new CustomImage from a BufferedImage with a custom name.

**Parameters:**
| Parameter | Type          | Description                      |
| --------- | ------------- | -------------------------------- |
| image     | BufferedImage | The BufferedImage to wrap        |
| name      | string        | Custom name for the image        |

**Example:**
```javascript
const bufferedImage = new java.awt.image.BufferedImage(128, 128, java.awt.image.BufferedImage.TYPE_INT_ARGB);
const customImage = new CustomImage(bufferedImage, "myCustomImage");
```

## Static Methods

## Instance Methods

## Shape Drawing Methods

### Lines and Rectangles

### Rounded Rectangles

### 3D Rectangles

### Ovals and Arcs

### Polygons

### Text Drawing

## Usage Examples

### Basic Image Creation and Drawing
```javascript
// Create a new 200x100 image
const image = CustomImage.createWidget(200, 100, "example");

// Set drawing color to red
image.setGraphicsColor(0xFF0000);

// Draw a filled rectangle
image.fillRect(10, 10, 180, 80);

// Change color to white and draw border
image.setGraphicsColor(0xFFFFFF);
image.drawRect(10, 10, 180, 80);

// Add text
image.drawString(20, 35, "Hello JSMacros!");

// Update to show changes
image.update();

// Save the image
image.saveImage("output", "my_first_image");
```

### Loading and Manipulating Images
```javascript
// Create an image from a file
const image = CustomImage.createWidget("textures/background.png", "background");

if (image) {
    // Load a logo to overlay
    const logo = image.loadImage("icons/logo.png");

    if (logo) {
        // Draw logo in center
        const centerX = (image.getWidth() - 64) / 2;
        const centerY = (image.getHeight() - 64) / 2;
        image.drawImage(logo, centerX, centerY, 64, 64);

        // Add a semi-transparent overlay
        image.setGraphicsColor(0x000000);
        image.fillRect(0, image.getHeight() - 30, image.getWidth(), 30);

        // Add text on the overlay
        image.setGraphicsColor(0xFFFFFF);
        image.drawString(10, image.getHeight() - 10, "Status: Active");

        // Update and save
        image.update();
        image.saveImage("output", "modified_background");
    }
}
```

### Creating a HUD Element
```javascript
// Create a custom HUD image
function createCustomHUD() {
    const hudImage = CustomImage.createWidget(300, 150, "player_hud");

    // Semi-transparent black background
    hudImage.fillRect(0, 0, 300, 150);

    // Draw border
    hudImage.setGraphicsColor(0x00FF00);
    hudImage.drawRect(0, 0, 299, 149);

    // Add player information
    const player = Player.getPlayer();
    if (player) {
        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const hunger = player.getHunger();

        hudImage.drawString(10, 20, `Health: ${health}/${maxHealth}`);
        hudImage.drawString(10, 40, `Hunger: ${hunger}`);
        hudImage.drawString(10, 60, `Position: ${Math.floor(player.getPos().x)}, ${Math.floor(player.getPos().y)}, ${Math.floor(player.getPos().z)}`);
    }

    hudImage.update();
    return hudImage;
}

// Use in HUD drawing
const customHUD = createCustomHUD();
const draw2D = Hud.createDraw2D();
draw2D.addImage(customHUD.getIdentifier(), 10, 10, 300, 150);
```

### Drawing Complex Shapes
```javascript
const image = CustomImage.createWidget(400, 300, "complex_shapes");

// Draw a colorful gradient background
for (let y = 0; y < image.getHeight(); y++) {
    const color = (y * 255 / image.getHeight()) & 0xFF;
    image.setGraphicsColor(color << 16 | color << 8 | color);
    image.fillRect(0, y, image.getWidth(), 1);
}

// Draw a star shape
image.setGraphicsColor(0xFFFF00);
const starPointsX = [200, 210, 240, 215, 225, 200, 175, 185, 160, 190];
const starPointsY = [50, 80, 85, 105, 140, 120, 140, 105, 85, 80];
image.fillPolygon(starPointsX, starPointsY);

// Draw decorative circles
image.setGraphicsColor(0x0000FF);
image.drawOval(50, 200, 60, 60);
image.fillOval(280, 200, 60, 60);

// Add arc for progress indicator
image.setGraphicsColor(0x00FF00);
image.fillArc(150, 200, 100, 60, 0, 270);

image.drawString(150, 280, "Complex Drawing Example");
image.update();
```

### Pixel-by-Pixel Drawing
```javascript
const image = CustomImage.createWidget(64, 64, "pixel_art");

// Create a simple smiley face using pixel manipulation
const center = 32;

// White background
for (let x = 0; x < 64; x++) {
    for (let y = 0; y < 64; y++) {
        image.setPixel(x, y, 0xFFFFFFFF);
    }
}

// Black circle outline
for (let angle = 0; angle < 360; angle++) {
    const rad = angle * Math.PI / 180;
    const x = Math.floor(center + 25 * Math.cos(rad));
    const y = Math.floor(center + 25 * Math.sin(rad));
    image.setPixel(x, y, 0xFF000000);
}

// Eyes
image.setPixel(22, 25, 0xFF000000);
image.setPixel(42, 25, 0xFF000000);

// Smile
for (let x = 20; x <= 44; x++) {
    const y = Math.floor(35 + 10 * Math.sin((x - 20) * Math.PI / 24));
    image.setPixel(x, y, 0xFF000000);
}

image.update();
image.saveImage("output", "smiley_pixel_art");
```

### Animated Image Updates
```javascript
let animationImage = CustomImage.createWidget(100, 100, "animation");
let frame = 0;

function animate() {
    // Clear image
    animationImage.clearRect(0, 0, 100, 100);

    // Draw animated circle
    const x = 50 + 30 * Math.cos(frame * 0.1);
    const y = 50 + 30 * Math.sin(frame * 0.1);

    // Color changes with frame
    const color = 0xFF0000 | ((frame * 8) & 0x00FF00);
    animationImage.setGraphicsColor(color);
    animationImage.fillOval(Math.floor(x - 10), Math.floor(y - 10), 20, 20);

    // Add frame counter
    animationImage.setGraphicsColor(0xFFFFFF);
    animationImage.drawString(10, 10, `Frame: ${frame}`);

    animationImage.update();
    frame++;
}

// Animate every tick
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(animate));
```

## Color Format Guide

The CustomImage class uses standard Java color formats:

- **RGB Format:** `0xRRGGBB` where:
  - `RR` = Red component (0-255 in hex)
  - `GG` = Green component (0-255 in hex)
  - `BB` = Blue component (0-255 in hex)

- **ARGB Format:** `0xAARRGGBB` where:
  - `AA` = Alpha component (0-255 in hex, 0=transparent, 255=opaque)
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

- **Transparent Colors:**
  - Semi-transparent red: `0x80FF0000`
  - Semi-transparent black: `0x80000000`
  - Fully transparent: `0x00000000`

## Important Notes

1. **Update Required:** Always call `update()` after making changes to see them in-game.

2. **File Paths:** Image paths are relative to the JSMacros config folder.

3. **Memory Management:** Large images consume memory. Clean up unused images when possible.

4. **Threading:** Image operations are thread-safe, but updates may need to be synchronized with the main thread.

5. **Texture Registration:** Each image gets a unique identifier for use in Minecraft's texture system.

6. **Performance:** Batch drawing operations and call `update()` once at the end for better performance.

7. **Image Format:** Images are stored as ARGB BufferedImage internally.

8. **File Saving:** Images are saved as PNG format regardless of input format.

## Related Classes

- `BufferedImage` - Java's image class used internally
- `Graphics2D` - Java's 2D graphics context for drawing operations
- `Rectangle` - Used for clipping bounds and rectangular operations
- `Hud.createDraw2D()` - For displaying CustomImage in HUD
- `Color` - Java's color class for color operations

## Version History

- **1.8.4:** Initial release with comprehensive image manipulation capabilities
- **Current:** Full implementation with all drawing operations and texture integration