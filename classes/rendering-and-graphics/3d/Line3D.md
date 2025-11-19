# Line3D

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Line3D`

**Implements:** `RenderElement3D<Line3D>`

**Since:** JsMacros 1.0.5

The `Line3D` class is a 3D rendering component in JSMacros that represents a colored line in 3D space that can be rendered in the world. It supports customizable color with alpha transparency, positioning in 3D coordinates, and depth testing options. Line3D objects are typically created through `Draw3D` methods or by using the constructor directly for 3D visual effects, trajectory visualization, connection lines, and spatial highlighting.

## Overview

The `Line3D` class provides a flexible way to draw 3D lines in the world with various properties:
- Customizable start and end positions in 3D space
- Single color support with alpha transparency
- Depth testing/culling options for visibility control
- World-space positioning for 3D visual effects
- Integration with the Draw3D rendering system
- Fixed line width (2.5 pixels) for optimal visibility

## Constructors

### `new Line3D(x1, y1, z1, x2, y2, z2, color, cull)`
Creates a new Line3D with specified coordinates and rendering options using ARGB color format.

**Parameters:**
| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| x1        | double  | X coordinate of line start point         |
| y1        | double  | Y coordinate of line start point         |
| z1        | double  | Z coordinate of line start point         |
| x2        | double  | X coordinate of line end point           |
| y2        | double  | Y coordinate of line end point           |
| z2        | double  | Z coordinate of line end point           |
| color     | int     | ARGB color value for the line            |
| cull      | boolean | Whether to enable face culling           |

**Example:**
```javascript
// Create a red line from origin to (10, 70, 10)
const line = new Line3D(0, 64, 0, 10, 70, 10, 0xFFFF0000, false);
```

### `new Line3D(x1, y1, z1, x2, y2, z2, color, alpha, cull)`
Creates a new Line3D with separate color and alpha values.

**Parameters:**
| Parameter | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| x1        | double  | X coordinate of line start point         |
| y1        | double  | Y coordinate of line start point         |
| z1        | double  | Z coordinate of line start point         |
| x2        | double  | X coordinate of line end point           |
| y2        | double  | Y coordinate of line end point           |
| z2        | double  | Z coordinate of line end point           |
| color     | int     | RGB color value for the line             |
| alpha     | int     | Alpha value for transparency (0-255)     |
| cull      | boolean | Whether to enable face culling           |

**Example:**
```javascript
// Create a semi-transparent green line
const line = new Line3D(5, 65, 5, 15, 75, 15, 0x00FF00, 128, false);
```

## Fields

## Methods

## Usage Examples

### Basic Line Creation
```javascript
// Create a simple red line
const line = new Line3D(0, 64, 0, 10, 74, 10, 0xFFFF0000, false);

// Add to 3D drawing context
const draw3D = Hud.createDraw3D();
draw3D.addLine(line);
```

### Line with Transparency
```javascript
// Create a semi-transparent blue line
const transparentLine = new Line3D(
    5, 65, 5,     // Start coordinates
    15, 75, 15,   // End coordinates
    0x0000FF,     // Blue color (RGB)
    128,          // Alpha (50% transparent)
    false         // No face culling
);

const draw3D = Hud.createDraw3D();
draw3D.addLine(transparentLine);
```

### Player Position to Target Line
```javascript
// Create a line from player to a target block
function createPlayerTargetLine(targetX, targetY, targetZ) {
    const player = Player.getPlayer();
    if (!player) return null;

    const pos = player.getPos();
    const eyeHeight = player.getEyeHeight();

    // Line from player's eyes to target
    const line = new Line3D(
        pos.x, pos.y + eyeHeight, pos.z,  // Player eye position
        targetX, targetY, targetZ,        // Target position
        0xFF00FF00,                       // Green color with full alpha
        false                             // Show through blocks
    );

    return line;
}

// Create line to block at player's crosshair
const lookingAt = Player.getPlayer().rayTraceBlock(20);
if (lookingAt && lookingAt.block) {
    const blockPos = lookingAt.block.getBlockPos();
    const targetLine = createPlayerTargetLine(
        blockPos.getX() + 0.5,
        blockPos.getY() + 0.5,
        blockPos.getZ() + 0.5
    );

    const draw3D = Hud.createDraw3D();
    draw3D.addLine(targetLine);
}
```

### Dynamic Line Animation
```javascript
// Animated line that changes position and color
let animatedLine;
let animationTime = 0;

function createAnimatedLine() {
    animatedLine = new Line3D(0, 64, 0, 10, 70, 10, 0xFFFF0000, false);
}

function animateLine() {
    if (!animatedLine) return;

    const player = Player.getPlayer();
    if (player) {
        animationTime += 0.1;

        // Circular motion around player
        const radius = 5;
        const centerX = player.getPos().x;
        const centerZ = player.getPos().z;

        const x1 = centerX + Math.cos(animationTime) * radius;
        const z1 = centerZ + Math.sin(animationTime) * radius;
        const x2 = centerX + Math.cos(animationTime + Math.PI) * radius;
        const z2 = centerZ + Math.sin(animationTime + Math.PI) * radius;

        // Update position
        animatedLine.setPos(
            x1, player.getPos().y + 2, z1,
            x2, player.getPos().y + 5, z2
        );

        // Animate color
        const color = Math.floor((Math.sin(animationTime * 2) + 1) * 127.5);
        animatedLine.setColor(0xFF0000, color); // Red with varying alpha

        // Add to rendering system
        const draw3D = Hud.createDraw3D();
        draw3D.addLine(animatedLine);
    }
}

// Initialize and animate
createAnimatedLine();
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(animateLine));
```

### Trajectory Visualization
```javascript
// Visualize projectile trajectory with lines
function createTrajectoryLines(startX, startY, startZ, velX, velY, velZ, steps) {
    const draw3D = Hud.createDraw3D();
    const lines = [];

    for (let i = 0; i < steps; i++) {
        const t = i * 0.1;
        const x = startX + velX * t;
        const y = startY + velY * t - 9.8 * t * t / 2; // Gravity
        const z = startZ + velZ * t;

        if (i > 0) {
            const prevT = (i - 1) * 0.1;
            const prevX = startX + velX * prevT;
            const prevY = startY + velY * prevT - 9.8 * prevT * prevT / 2;
            const prevZ = startZ + velZ * prevT;

            // Create line segment
            const alpha = Math.max(50, 255 - i * 10); // Fade out over distance
            const color = (alpha << 24) | 0xFFFF00; // Yellow with fading alpha

            const segment = new Line3D(
                prevX, prevY, prevZ, x, y, z,
                color, false // No face culling
            );

            lines.push(segment);
            draw3D.addLine(segment);
        }
    }

    return lines;
}

// Create trajectory from player's looking direction
const player = Player.getPlayer();
const pos = player.getPos();
const look = player.getLookingVec();
const trajectoryLines = createTrajectoryLines(
    pos.x, pos.y + player.getEyeHeight(), pos.z,
    look.x * 15, look.y * 15, look.z * 15, 30
);
```

### Grid System
```javascript
// Create a 3D grid of lines
function create3DGrid(centerX, y, centerZ, size, spacing, color) {
    const draw3D = Hud.createDraw3D();
    const lines = [];

    // Lines along X axis
    for (let z = -size; z <= size; z += spacing) {
        const line = new Line3D(
            centerX - size, y, centerZ + z,
            centerX + size, y, centerZ + z,
            color, false
        );
        lines.push(line);
        draw3D.addLine(line);
    }

    // Lines along Z axis
    for (let x = -size; x <= size; x += spacing) {
        const line = new Line3D(
            centerX + x, y, centerZ - size,
            centerX + x, y, centerZ + size,
            color, false
        );
        lines.push(line);
        draw3D.addLine(line);
    }

    return lines;
}

// Create a 20x20 grid at player's position
const player = Player.getPlayer();
const playerPos = player.getBlockPos();
const gridLines = create3DGrid(
    playerPos.getX(), playerPos.getY(), playerPos.getZ(),
    20, 5, 0x80FFFFFF // Semi-transparent white
);
```

### Entity Connection Lines
```javascript
// Create lines connecting player to nearby entities
function createEntityConnections() {
    const draw3D = Hud.createDraw3D();
    const player = Player.getPlayer();
    const playerPos = player.getPos();

    // Get nearby entities
    const entities = World.getEntitiesOfType("Entity", playerPos.x, playerPos.y, playerPos.z, 32);
    const lines = [];

    for (const entity of entities) {
        if (entity.equals(player)) continue;

        const entityPos = entity.getPos();

        // Color based on entity type
        let color;
        if (entity.isMonster()) {
            color = 0xFFFF0000; // Red for hostile
        } else if (entity.isAnimal()) {
            color = 0xFF00FF00; // Green for passive
        } else {
            color = 0xFF0000FF; // Blue for neutral
        }

        const line = new Line3D(
            playerPos.x, playerPos.y + player.getEyeHeight(), playerPos.z,
            entityPos.x, entityPos.y + entity.getEyeHeight(), entityPos.z,
            color, false
        );

        lines.push(line);
        draw3D.addLine(line);
    }

    Chat.log(`Created ${lines.length} connection lines`);
    return lines;
}

// Update entity connections every tick
let connectionLines;
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    connectionLines = createEntityConnections();
}));
```

### Coordinate System Visualization
```javascript
// Create 3D coordinate axes
function createCoordinateSystem(size) {
    const draw3D = Hud.createDraw3D();
    const lines = [];

    // X axis - Red
    const xAxis = new Line3D(0, 0, 0, size, 0, 0, 0xFFFF0000, false);
    lines.push(xAxis);
    draw3D.addLine(xAxis);

    // Y axis - Green
    const yAxis = new Line3D(0, 0, 0, 0, size, 0, 0xFF00FF00, false);
    lines.push(yAxis);
    draw3D.addLine(yAxis);

    // Z axis - Blue
    const zAxis = new Line3D(0, 0, 0, 0, 0, size, 0xFF0000FF, false);
    lines.push(zAxis);
    draw3D.addLine(zAxis);

    // Add arrow heads
    const arrowSize = size * 0.1;

    // X axis arrow
    const xArrow1 = new Line3D(size, 0, 0, size - arrowSize, arrowSize, 0, 0xFFFF0000, false);
    const xArrow2 = new Line3D(size, 0, 0, size - arrowSize, -arrowSize, 0, 0xFFFF0000, false);
    lines.push(xArrow1, xArrow2);
    draw3D.addLine(xArrow1);
    draw3D.addLine(xArrow2);

    // Y axis arrow
    const yArrow1 = new Line3D(0, size, 0, arrowSize, size - arrowSize, 0, 0xFF00FF00, false);
    const yArrow2 = new Line3D(0, size, 0, -arrowSize, size - arrowSize, 0, 0xFF00FF00, false);
    lines.push(yArrow1, yArrow2);
    draw3D.addLine(yArrow1);
    draw3D.addLine(yArrow2);

    // Z axis arrow
    const zArrow1 = new Line3D(0, 0, size, 0, arrowSize, size - arrowSize, 0xFF0000FF, false);
    const zArrow2 = new Line3D(0, 0, size, 0, -arrowSize, size - arrowSize, 0xFF0000FF, false);
    lines.push(zArrow1, zArrow2);
    draw3D.addLine(zArrow1);
    draw3D.addLine(zArrow2);

    return lines;
}

// Create coordinate system at origin
const axesLines = createCoordinateSystem(10);
```

### Mining Helper
```javascript
// Create lines to highlight ore deposits
function highlightOreDeposit(centerX, centerY, centerZ, radius, oreType, color) {
    const draw3D = Hud.createDraw3D();
    const lines = [];

    // Find all ore blocks in the area
    const scanner = World.getWorldScanner()
        .withStringBlockFilter().equals(oreType)
        .build();

    const results = scanner.scanAroundRadius(centerX, centerY, centerZ, radius);

    // Connect nearby ore blocks to show veins
    for (let i = 0; i < results.length; i++) {
        for (let j = i + 1; j < results.length; j++) {
            const block1 = results[i];
            const block2 = results[j];

            const distance = Math.sqrt(
                Math.pow(block1.getX() - block2.getX(), 2) +
                Math.pow(block1.getY() - block2.getY(), 2) +
                Math.pow(block1.getZ() - block2.getZ(), 2)
            );

            // Connect blocks within 3 blocks of each other
            if (distance <= 3) {
                const line = new Line3D(
                    block1.getX() + 0.5, block1.getY() + 0.5, block1.getZ() + 0.5,
                    block2.getX() + 0.5, block2.getY() + 0.5, block2.getZ() + 0.5,
                    color, false
                );
                lines.push(line);
                draw3D.addLine(line);
            }
        }
    }

    Chat.log(`Connected ${results.length} ${oreType} blocks with ${lines.length} lines`);
    return lines;
}

// Highlight diamond ore around player
const player = Player.getPlayer();
const playerPos = player.getBlockPos();
highlightOreDeposit(playerPos.getX(), playerPos.getY(), playerPos.getZ(), 16, "minecraft:diamond_ore", 0xFF00FFFF);
```

## Builder Pattern

The Line3D class provides a Builder for more fluent configuration (since 1.8.4):

```javascript
// Using the builder pattern
const draw3D = Hud.createDraw3D();
const builderLine = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)    // Set position
    .color(255, 0, 0, 255)         // Red with full alpha
    .cull(false)                   // Disable face culling
    .buildAndAdd();                // Build and add to Draw3D

// Or build separately
const line = draw3D.addLine()
    .pos1(0, 64, 0)               // Set start point
    .pos2(10, 70, 10)             // Set end point
    .color(0x00FF00)              // Green color
    .alpha(128)                   // 50% transparency
    .build();                     // Build without adding
draw3D.addLine(line);            // Add manually
```

## Color Format Guide

The Line3D class uses standard integer color formats:

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

1. **Coordinate System:** The line uses world coordinates where Y represents height. The line is defined by start and end points in 3D space.

2. **Face Culling:** When culling is enabled (true), the line respects depth testing and will be hidden behind blocks. Set to false to make lines visible through blocks.

3. **Line Width:** Lines are rendered with a fixed width of 2.5 pixels for optimal visibility in the 3D world.

4. **Alpha Blending:** The line supports proper alpha blending for transparency effects.

5. **Performance:** Creating many 3D lines can impact performance. Use reasonable line counts and consider clearing lines when no longer needed.

6. **Rendering Context:** Lines must be added to a `Draw3D` context to be rendered in the world.

7. **Auto Alpha:** When using `setColor(color)` with RGB format, full alpha (0xFF) is automatically added.

8. **Position Updates:** The line position can be dynamically updated using the `setPos()` method for animations and tracking effects.

9. **Memory Management:** Remove lines that are no longer needed to prevent memory leaks:
   ```javascript
   draw3D.clear(); // Clear all lines from a Draw3D instance
   ```

10. **World Coordinates:** All coordinates are in world space, not relative to the player or camera.

## Related Classes

- `RenderElement3D` - Interface that Line3D implements for 3D rendering
- `Draw3D` - 3D drawing context for adding lines to the world
- `Line3D.Builder` - Builder class for fluent line creation
- `Vec3D` - 3D vector class used for line positions
- `Pos3D` - 3D position helper class
- `BlockPosHelper` - Block position helper for positioning lines on blocks

## Version History

- **1.0.5:** Initial release with basic line rendering
- **1.0.6:** Added basic positioning and color methods
- **1.1.8:** Enhanced color methods with separate alpha support
- **1.8.4:** Added Builder pattern for fluent line creation
- **Current:** Enhanced with comprehensive method set and improved rendering

