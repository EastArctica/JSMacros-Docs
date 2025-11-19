# TraceLine

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.TraceLine`

**Implements:** `RenderElement3D<TraceLine>`

**Since:** JsMacros 1.9.0

The `TraceLine` class is a 3D rendering component in JSMacros that represents a line drawn from a screen position to a world position. It creates a visual trace that can be used to highlight or point to specific locations in the 3D world space from the player's perspective. TraceLine objects are typically created through `Draw3D` methods or by using the constructor directly for targeting, highlighting, and visual guidance effects.

## Overview

The `TraceLine` class provides a way to draw lines from 2D screen coordinates to 3D world positions:
- Draws a line from a screen position to a world position
- Customizable line color with alpha transparency support
- World-space positioning for precise targeting
- Integration with the Draw3D rendering system
- Builder pattern for fluent configuration

## Constructors

### `new TraceLine(x, y, z, color)`
Creates a new TraceLine from the screen center (0, 0) to the specified world coordinates with a color.

**Parameters:**
| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| x         | double | X coordinate of the target world position|
| y         | double | Y coordinate of the target world position|
| z         | double | Z coordinate of the target world position|
| color     | int    | ARGB color value for the line           |

**Example:**
```javascript
// Create a red line to world position (100, 64, 200)
const traceLine = new TraceLine(100, 64, 200, 0xFFFF0000);
```

### `new TraceLine(x, y, z, color, alpha)`
Creates a new TraceLine from the screen center (0, 0) to the specified world coordinates with separate color and alpha.

**Parameters:**
| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| x         | double | X coordinate of the target world position       |
| y         | double | Y coordinate of the target world position       |
| z         | double | Z coordinate of the target world position       |
| color     | int    | RGB color value for the line                    |
| alpha     | int    | Alpha value for transparency (0-255)            |

**Example:**
```javascript
// Create a semi-transparent blue line
const traceLine = new TraceLine(50, 70, 150, 0x0000FF, 128);
```

### `new TraceLine(pos, color)`
Creates a new TraceLine from the screen center to the specified world position using a Pos3D object.

**Parameters:**
| Parameter | Type  | Description                           |
| --------- | ----- | ------------------------------------- |
| pos       | Pos3D | The target world position as Pos3D   |
| color     | int   | ARGB color value for the line         |

**Example:**
```javascript
const targetPos = new Pos3D(25, 80, -50);
const traceLine = new TraceLine(targetPos, 0xFF00FF00);
```

### `new TraceLine(pos, color, alpha)`
Creates a new TraceLine from the screen center to the specified world position using a Pos3D object with separate alpha.

**Parameters:**
| Parameter | Type  | Description                                   |
| --------- | ----- | --------------------------------------------- |
| pos       | Pos3D | The target world position as Pos3D           |
| color     | int   | RGB color value for the line                  |
| alpha     | int   | Alpha value for transparency (0-255)          |

**Example:**
```javascript
const targetPos = new Pos3D(10, 65, 30);
const traceLine = new TraceLine(targetPos, 0xFFFF00, 192);
```

## Fields

## Methods

## Builder Pattern

The TraceLine class provides a Builder for more fluent configuration:

## Usage Examples

### Basic TraceLine Creation
```javascript
// Create a simple red trace line to world position
const traceLine = new TraceLine(100, 64, 200, 0xFFFF0000);

// Add to 3D drawing context
const draw3D = Hud.createDraw3D();
draw3D.addTraceLine(traceLine);
```

### TraceLine with Custom Alpha
```javascript
// Create a semi-transparent blue trace line
const traceLine = new TraceLine(
    50,    // X coordinate
    70,    // Y coordinate
    -150,  // Z coordinate
    0x0000FF, // Blue color (RGB)
    128       // 50% transparency
);

const draw3D = Hud.createDraw3D();
draw3D.addTraceLine(traceLine);
```

### Dynamic TraceLine Following Player
```javascript
// Trace line that always points to a fixed location from player's view
let targetTraceLine;

function initTraceLine() {
    targetTraceLine = new TraceLine(
        1000, 64, 1000,  // Target world position
        0xFF00FF00,      // Green color
        192              // 75% alpha
    );
}

function updateTraceLine() {
    if (!targetTraceLine) return;

    // The line automatically updates as the player moves
    // since screen position is recalculated each frame

    const draw3D = Hud.createDraw3D();
    draw3D.addTraceLine(targetTraceLine);
}

// Initialize and update
initTraceLine();
events.on("Tick", JavaWrapper.methodToJavaAsync(updateTraceLine));
```

### Block Highlighting TraceLine
```javascript
// Trace line to the block the player is looking at
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const player = Player.getPlayer();
    if (!player) return;

    const lookingAt = player.rayTraceBlock(50);
    if (lookingAt && lookingAt.block) {
        const blockPos = lookingAt.block.getBlockPos();

        // Create trace line to the targeted block
        const traceLine = new TraceLine(
            blockPos.getX() + 0.5,  // Center of block
            blockPos.getY() + 0.5,
            blockPos.getZ() + 0.5,
            0xFFFFFF00,  // Yellow color
            255          // Full opacity
        );

        const draw3D = Hud.createDraw3D();
        draw3D.addTraceLine(traceLine);
    }
}));
```

### Multiple TraceLines Effect
```javascript
// Create multiple trace lines to different positions
function createMultipleTraces() {
    const targets = [
        { x: 100, y: 64, z: 100, color: 0xFFFF0000 },  // Red
        { x: -100, y: 64, z: 100, color: 0xFF00FF00 }, // Green
        { x: 0, y: 80, z: -150, color: 0xFF0000FF },  // Blue
    ];

    const draw3D = Hud.createDraw3D();

    targets.forEach(target => {
        const traceLine = new TraceLine(
            target.x, target.y, target.z,
            target.color, 128  // Semi-transparent
        );
        draw3D.addTraceLine(traceLine);
    });
}

createMultipleTraces();
```

### Builder Pattern Usage
```javascript
// Using the builder pattern
const draw3D = Hud.createDraw3D();

// Build and add trace line
const traceLine = draw3D.traceLine()
    .pos(200, 70, 300)              // Target position
    .color(255, 165, 0, 192)        // Orange with 75% alpha
    .buildAndAdd();                  // Build and add to Draw3D

// Or build separately
const anotherTraceLine = draw3D.traceLine()
    .pos(BlockPosHelper.create(150, 65, -100))  // Using block position
    .color(0x800080)                   // Purple RGB
    .alpha(128)                        // 50% transparency
    .build();

draw3D.addTraceLine(anotherTraceLine);
```

### Animated TraceLine
```javascript
// Animated pulsing trace line
let pulseTraceLine;
let pulseTime = 0;

function initPulseTraceLine() {
    pulseTraceLine = new TraceLine(
        0, 100, 0,    // Target position above origin
        0xFF00FFFF,   // Cyan color
        255           // Full opacity
    );
}

function animatePulseTraceLine() {
    if (!pulseTraceLine) return;

    pulseTime += 0.1;

    // Pulse the alpha
    const alpha = Math.floor(128 + Math.sin(pulseTime) * 127);
    pulseTraceLine.setAlpha(alpha);

    // Pulse the position height
    const height = 100 + Math.sin(pulseTime) * 20;
    pulseTraceLine.setPos(0, height, 0);

    const draw3D = Hud.createDraw3D();
    draw3D.addTraceLine(pulseTraceLine);
}

// Initialize and animate
initPulseTraceLine();
events.on("Tick", JavaWrapper.methodToJavaAsync(animatePulseTraceLine));
```

### Coordinate Tracking TraceLine
```javascript
// Trace line to show distance and direction to specific coordinates
const TARGET_X = 1000;
const TARGET_Y = 64;
const TARGET_Z = -500;

function showDistanceTrace() {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();

    // Calculate distance
    const dx = TARGET_X - playerPos.x;
    const dy = TARGET_Y - playerPos.y;
    const dz = TARGET_Z - playerPos.z;
    const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

    // Color based on distance
    let color;
    if (distance < 50) {
        color = 0xFF00FF00; // Green - close
    } else if (distance < 200) {
        color = 0xFFFFFF00; // Yellow - medium
    } else {
        color = 0xFFFF0000; // Red - far
    }

    // Create trace line to target
    const traceLine = new TraceLine(
        TARGET_X, TARGET_Y, TARGET_Z,
        color, 160  // Semi-transparent
    );

    const draw3D = Hud.createDraw3D();
    draw3D.addTraceLine(traceLine);

    // Show distance in action bar
    Chat.actionbar(`&7Distance to target: ${Math.floor(distance)} blocks`);
}

events.on("Tick", JavaWrapper.methodToJavaAsync(showDistanceTrace));
```

## Color Format Guide

The TraceLine class uses standard integer color formats:

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

## Important Notes

1. **Screen Position:** The line starts from `screenPos` which defaults to (0, 0), typically representing the screen center. This field can be modified but may not work correctly with all field of view and aspect ratio settings.

2. **World Position:** The line ends at the 3D world position specified by `pos`, creating a visual trace from the player's view to the target location.

3. **Rendering Context:** TraceLines must be added to a `Draw3D` context to be rendered in the world.

4. **Line Width:** TraceLines are rendered with a fixed width of 2.5 pixels for visibility.

5. **Depth Testing:** The trace line rendering temporarily disables depth testing to ensure the line is always visible, then re-enables it.

6. **Auto Alpha:** When using `setColor(color)` with RGB format, full alpha (0xFF) is automatically added if not present.

7. **Performance:** Creating many trace lines can impact performance. Use them judiciously and consider updating existing lines instead of creating new ones when possible.

8. **Coordinate System:** World positions use the standard Minecraft coordinate system where Y represents height.

## Related Classes

- `RenderElement3D` - Interface that TraceLine implements for 3D rendering
- `Draw3D` - 3D drawing context for adding trace lines to the world
- `Pos3D` - 3D position class used for line target positions
- `Pos2D` - 2D position class used for screen start positions
- `BlockPosHelper` - Block position helper for positioning trace lines on blocks
- `TraceLine.Builder` - Builder class for fluent trace line creation

## Version History

- **1.9.0:** Initial release with trace line rendering capabilities
- **Current:** Enhanced with builder pattern and comprehensive method set

