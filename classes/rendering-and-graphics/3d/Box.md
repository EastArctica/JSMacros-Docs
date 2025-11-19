# Box

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Box`

**Implements:** `RenderElement3D<Box>`

**Since:** JsMacros 1.0.5

The `Box` class is a 3D rendering component in JSMacros that represents a colored box/cuboid that can be rendered in the world. It supports customizable outline and fill colors, positioning, alpha transparency, and face culling. Box objects are typically created through `Draw3D` methods or by using the constructor directly for 3D visual effects, world overlays, and spatial highlighting.

## Overview

The `Box` class provides a flexible way to draw 3D boxes in the world with various properties:
- Customizable position defined by two corner points in 3D space
- Separate outline and fill color support with alpha transparency
- Face culling options for performance optimization
- World-space positioning for 3D visual effects
- Integration with the Draw3D rendering system

## Constructors

### `new Box(x1, y1, z1, x2, y2, z2, color, fillColor, fill, cull)`
Creates a new Box with specified coordinates, colors, and rendering options.

**Parameters:**
| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| x1        | double  | X coordinate of first corner             |
| y1        | double  | Y coordinate of first corner             |
| z1        | double  | Z coordinate of first corner             |
| x2        | double  | X coordinate of second corner            |
| y2        | double  | Y coordinate of second corner            |
| z2        | double  | Z coordinate of second corner            |
| color     | int     | ARGB color value for the outline         |
| fillColor | int     | ARGB color value for the fill            |
| fill      | boolean | Whether to fill the box                  |
| cull      | boolean | Whether to cull back faces               |

**Example:**
```javascript
// Create a red outlined box at origin
const box = new Box(0, 64, 0, 10, 74, 10, 0xFFFF0000, 0x80FF0000, true, false);
```

### `new Box(x1, y1, z1, x2, y2, z2, color, alpha, fillColor, fillAlpha, fill, cull)`
Creates a new Box with separate alpha values for outline and fill colors.

**Parameters:**
| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| x1        | double  | X coordinate of first corner             |
| y1        | double  | Y coordinate of first corner             |
| z1        | double  | Z coordinate of first corner             |
| x2        | double  | X coordinate of second corner            |
| y2        | double  | Y coordinate of second corner            |
| z2        | double  | Z coordinate of second corner            |
| color     | int     | RGB color value for the outline          |
| alpha     | int     | Alpha value for the outline (0-255)      |
| fillColor | int     | RGB color value for the fill             |
| fillAlpha | int     | Alpha value for the fill (0-255)         |
| fill      | boolean | Whether to fill the box                  |
| cull      | boolean | Whether to cull back faces               |

**Example:**
```javascript
// Create a semi-transparent blue box
const box = new Box(5, 65, 5, 15, 75, 15, 0x0000FF, 128, 0x0000FF, 64, true, false);
```

## Fields

## Methods

## Usage Examples

### Basic Box Creation
```javascript
// Create a simple red outlined box
const box = new Box(0, 64, 0, 10, 74, 10, 0xFFFF0000, 0x00000000, false, false);

// Add to 3D drawing context
const draw3D = Hud.createDraw3D();
draw3D.addBox(box);
```

### Filled Box with Transparency
```javascript
// Create a semi-transparent filled box
const filledBox = new Box(
    5, 65, 5,     // First corner
    15, 75, 15,   // Second corner
    0xFF0000,     // Red outline (RGB)
    255,          // Outline alpha (opaque)
    0x0000FF,     // Blue fill (RGB)
    128,          // Fill alpha (50% transparent)
    true,         // Enable fill
    false         // No face culling
);

const draw3D = Hud.createDraw3D();
draw3D.addBox(filledBox);
```

### Block Highlighting
```javascript
// Highlight the block the player is looking at
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const player = Player.getPlayer();
    if (!player) return;

    const lookingAt = player.rayTraceBlock(10);
    if (lookingAt && lookingAt.block) {
        // Create highlight box for the targeted block
        const highlightBox = new Box(0, 0, 0, 1, 1, 1,
            0xFFFFFF00, 0xFFFFFF00, true, false);

        // Position it on the targeted block
        const blockPos = lookingAt.block.getBlockPos();
        highlightBox.setPosToBlock(blockPos.getX(), blockPos.getY(), blockPos.getZ());

        // Add to rendering system
        const draw3D = Hud.createDraw3D();
        draw3D.addBox(highlightBox);
    }
}));
```

### Dynamic Box Animation
```javascript
// Animated pulsing box around the player
let pulseBox;
let pulseTime = 0;

function initPulseBox() {
    const player = Player.getPlayer();
    if (player) {
        const pos = player.getPos();
        pulseBox = new Box(
            pos.x - 2, pos.y - 1, pos.z - 2,
            pos.x + 2, pos.y + 2, pos.z + 2,
            0xFF00FF00, 0xFF00FF00, true, false
        );
    }
}

function animatePulse() {
    if (!pulseBox) return;

    const player = Player.getPlayer();
    if (player) {
        pulseTime += 0.1;
        const scale = 1 + Math.sin(pulseTime) * 0.3;
        const alpha = Math.floor(128 + Math.sin(pulseTime) * 64);

        const pos = player.getPos();
        const radius = 2 * scale;

        pulseBox.setPos(
            pos.x - radius, pos.y - 1, pos.z - radius,
            pos.x + radius, pos.y + 2, pos.z + radius
        );

        pulseBox.setColor(0x00FF00, alpha);
        pulseBox.setFillColor(0x00FF00, alpha / 2);

        const draw3D = Hud.createDraw3D();
        draw3D.addBox(pulseBox);
    }
}

// Initialize and animate
initPulseBox();
events.on("Tick", JavaWrapper.methodToJavaAsync(animatePulse));
```

### Multi-Layer Box Effect
```javascript
// Create multiple boxes for a layered effect
function createLayeredBox(x, y, z) {
    const boxes = [];

    // Outer box - red outline
    const outerBox = new Box(x, y, z, x + 10, y + 10, z + 10,
        0xFFFF0000, 0x00000000, false, false);
    boxes.push(outerBox);

    // Middle box - green fill
    const middleBox = new Box(x + 1, y + 1, z + 1, x + 9, y + 9, z + 9,
        0xFF000000, 0x8000FF00, true, false);
    boxes.push(middleBox);

    // Inner box - blue outline
    const innerBox = new Box(x + 2, y + 2, z + 2, x + 8, y + 8, z + 8,
        0xFF0000FF, 0x00000000, false, false);
    boxes.push(innerBox);

    return boxes;
}

const layeredBoxes = createLayeredBox(100, 64, 100);
const draw3D = Hud.createDraw3D();
layeredBoxes.forEach(box => draw3D.addBox(box));
```

### Player-Following Box
```javascript
// Box that follows and highlights the player
let playerBox;

function updatePlayerBox() {
    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    // Create box if it doesn't exist
    if (!playerBox) {
        playerBox = new Box(0, 0, 0, 1, 2, 1,
            0xFF00FF00, 0x4000FF00, true, false);
    }

    // Position around player
    playerBox.setPos(
        pos.x - 0.5, pos.y, pos.z - 0.5,
        pos.x + 0.5, pos.y + 2, pos.z + 0.5
    );

    // Color based on health
    const color = healthPercent > 0.6 ? 0x00FF00 :
                  healthPercent > 0.3 ? 0xFFFF00 : 0xFF0000;
    playerBox.setColor(color, 255);
    playerBox.setFillColor(color, 64);

    const draw3D = Hud.createDraw3D();
    draw3D.addBox(playerBox);
}

events.on("Tick", JavaWrapper.methodToJavaAsync(updatePlayerBox));
```

## Color Format Guide

The Box class uses standard integer color formats:

- **RGB Format:** `0xRRGGBB` where:
  - `RR` = Red component (0-255 in hex)
  - `GG` = Green component (0-255 in hex)
  - `BB` = Blue component (0-255 in hex)

- **ARGB Format:** `0xAARRGGBB` where:
  - `AA` = Alpha component (0-255 in hex)
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
  - 64 = 25% opacity
  - 128 = 50% opacity
  - 192 = 75% opacity
  - 255 = Fully opaque

## Builder Pattern

The Box class provides a Builder for more fluent configuration (since 1.8.4):

```javascript
// Using the builder pattern
const draw3D = Hud.createDraw3D();
const builderBox = draw3D.box()
    .pos(10, 64, 10, 20, 74, 20)    // Set position
    .color(255, 0, 0, 255)          // Red outline with full alpha
    .fillColor(0, 0, 255, 128)      // Blue fill with 50% alpha
    .fill(true)                      // Enable fill
    .cull(false)                     // Disable face culling
    .buildAndAdd();                  // Build and add to Draw3D

// Or build separately
const box = draw3D.box()
    .forBlock(5, 64, 5)             // Highlight a specific block
    .color(0x00FF00)                // Green outline
    .build();
draw3D.addBox(box);
```

## Important Notes

1. **Coordinate System:** The box uses world coordinates where Y represents height. The box is defined by two opposite corners in 3D space.

2. **Face Culling:** When culling is enabled, back faces (faces facing away from the camera) are not rendered for performance. Disable this if you need to see the box from all angles.

3. **Alpha Blending:** The box supports proper alpha blending for transparency effects. Both outline and fill colors can have separate alpha values.

4. **Performance:** Creating many 3D boxes with complex transparency can impact performance. Use culling and reasonable alpha values for better performance.

5. **Rendering Context:** Boxes must be added to a `Draw3D` context to be rendered in the world.

6. **Order Independence:** Unlike 2D elements, 3D boxes are rendered based on world position and depth, not z-index.

7. **Auto Alpha:** When using `setColor(color)` with RGB format, full alpha (0xFF) is automatically added.

8. **Position Updates:** The box position can be dynamically updated using the various position setting methods for animations and tracking effects.

## Related Classes

- `RenderElement3D` - Interface that Box implements for 3D rendering
- `Draw3D` - 3D drawing context for adding boxes to the world
- `Vec3D` - 3D vector class used for box positions
- `Pos3D` - 3D position helper class
- `BlockPosHelper` - Block position helper for positioning boxes on blocks
- `Box.Builder` - Builder class for fluent box creation

## Version History

- **1.0.5:** Initial release with basic box rendering
- **1.0.6:** Added basic positioning and color methods
- **1.1.8:** Enhanced color methods with separate alpha support
- **1.8.4:** Added Builder pattern, block and point positioning methods
- **1.9.0:** Added `setPosToBlock()` and `setPosToPoint()` convenience methods
- **Current:** Enhanced with comprehensive method set and improved rendering

