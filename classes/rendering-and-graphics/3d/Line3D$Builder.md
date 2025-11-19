# Line3D.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Line3D$Builder`

**Implements:** Builder pattern for `Line3D`

**Since:** JsMacros 1.8.4

The `Line3D.Builder` class provides a fluent interface for creating `Line3D` instances with method chaining. It's the recommended way to create 3D lines with complex configurations or when you need to set multiple properties in a readable manner.

## Overview

The `Line3D.Builder` class allows you to construct `Line3D` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw3D.addLine()` method and provides two final operations:
- `build()` - Creates the Line3D instance
- `buildAndAdd()` - Creates the Line3D instance and automatically adds it to the Draw3D context

## Creating a Builder

```javascript
// Obtain a builder from Draw3D context
const draw3D = Hud.createDraw3D();
const builder = draw3D.addLine();
```

## Builder Methods

### Position Methods

#### `pos(x1, y1, z1, x2, y2, z2)`
Sets the start and end positions of the line in 3D space in a single call.

**Parameters:**
- `x1` (double): X coordinate of the line start point
- `y1` (double): Y coordinate of the line start point
- `z1` (double): Z coordinate of the line start point
- `x2` (double): X coordinate of the line end point
- `y2` (double): Y coordinate of the line end point
- `z2` (double): Z coordinate of the line end point

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const line = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0xFF0000)
    .build();
```

#### `pos1(x, y, z)`
Sets the start position of the line in 3D space.

**Parameters:**
- `x` (double): X coordinate of the line start point
- `y` (double): Y coordinate of the line start point
- `z` (double): Z coordinate of the line start point

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const line = draw3D.addLine()
    .pos1(0, 64, 0)
    .pos2(20, 75, 20)
    .color(0x00FF00)
    .build();
```

#### `pos2(x, y, z)`
Sets the end position of the line in 3D space.

**Parameters:**
- `x` (double): X coordinate of the line end point
- `y` (double): Y coordinate of the line end point
- `z` (double): Z coordinate of the line end point

**Returns:** `Line3D.Builder` - Self for chaining

#### `x1(x)`
Sets only the X coordinate of the line start point.

**Parameters:**
- `x` (double): X coordinate of the line start point

**Returns:** `Line3D.Builder` - Self for chaining

#### `y1(y)`
Sets only the Y coordinate of the line start point.

**Parameters:**
- `y` (double): Y coordinate of the line start point

**Returns:** `Line3D.Builder` - Self for chaining

#### `z1(z)`
Sets only the Z coordinate of the line start point.

**Parameters:**
- `z` (double): Z coordinate of the line start point

**Returns:** `Line3D.Builder` - Self for chaining

#### `x2(x)`
Sets only the X coordinate of the line end point.

**Parameters:**
- `x` (double): X coordinate of the line end point

**Returns:** `Line3D.Builder` - Self for chaining

#### `y2(y)`
Sets only the Y coordinate of the line end point.

**Parameters:**
- `y` (double): Y coordinate of the line end point

**Returns:** `Line3D.Builder` - Self for chaining

#### `z2(z)`
Sets only the Z coordinate of the line end point.

**Parameters:**
- `z` (double): Z coordinate of the line end point

**Returns:** `Line3D.Builder` - Self for chaining

### Color Methods

#### `color(color)`
Sets the line color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const redLine = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets the line color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlue = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets the line color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const greenLine = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
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

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const purpleLine = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(128, 0, 128, 200)
    .build();
```

#### `alpha(alpha)`
Sets only the alpha transparency value while preserving RGB color.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const fadedLine = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0xFF0000)
    .alpha(100)
    .build();
```

### Rendering Methods

#### `cull(cullEnabled)`
Sets whether the line should respect depth testing and be hidden behind blocks.

**Parameters:**
- `cullEnabled` (boolean): true to enable face culling (respect depth), false to show through blocks

**Returns:** `Line3D.Builder` - Self for chaining

**Example:**
```javascript
const visibleLine = draw3D.addLine()
    .pos(0, 64, 0, 20, 80, 20)
    .color(0x00FF00)
    .cull(false)  // Show through blocks
    .build();
```

### Building Methods

#### `build()`
Creates the configured `Line3D` instance without adding it to the Draw3D context.

**Returns:** `Line3D` - The constructed Line3D instance

**Example:**
```javascript
const line = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0xFF0000)
    .build();

// Add to context manually later
draw3D.addLine(line);
```

#### `buildAndAdd()`
Creates the configured `Line3D` instance and automatically adds it to the Draw3D context.

**Returns:** `Line3D` - The constructed and added Line3D instance

**Example:**
```javascript
const line = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0x00FF00)
    .buildAndAdd(); // Automatically added to Draw3D context
```

## Usage Examples

### Basic 3D Line
```javascript
const draw3D = Hud.createDraw3D();

// Create a simple red line from origin to point (10, 70, 10)
const basicLine = draw3D.addLine()
    .pos(0, 64, 0, 10, 70, 10)
    .color(0xFF0000)
    .buildAndAdd();
```

### Line to Player Target
```javascript
// Create a line from player to the block they're looking at
function createPlayerTargetLine() {
    const player = Player.getPlayer();
    if (!player) return;

    const lookingAt = player.rayTraceBlock(50);
    if (lookingAt && lookingAt.block) {
        const blockPos = lookingAt.block.getBlockPos();
        const playerPos = player.getPos();
        const eyeHeight = player.getEyeHeight();

        const targetLine = draw3D.addLine()
            .pos1(playerPos.x, playerPos.y + eyeHeight, playerPos.z)
            .pos2(blockPos.getX() + 0.5, blockPos.getY() + 0.5, blockPos.getZ() + 0.5)
            .color(0xFF00FF00)  // Green with full alpha
            .cull(false)        // Show through blocks
            .buildAndAdd();

        Chat.log("Created targeting line to: " + blockPos.toString());
    }
}

createPlayerTargetLine();
```

### Trajectory Visualization
```javascript
// Create lines to visualize projectile trajectory
function createTrajectory(startX, startY, startZ, velX, velY, velZ, steps) {
    const draw3D = Hud.createDraw3D();

    for (let i = 0; i < steps; i++) {
        const t = i * 0.1;
        const x = startX + velX * t;
        const y = startY + velY * t - 9.8 * t * t / 2; // Gravity effect
        const z = startZ + velZ * t;

        if (i > 0) {
            const prevT = (i - 1) * 0.1;
            const prevX = startX + velX * prevT;
            const prevY = startY + velY * prevT - 9.8 * prevT * prevT / 2;
            const prevZ = startZ + velZ * prevT;

            // Create line segment with fading alpha
            const alpha = Math.max(50, 255 - i * 8);
            draw3D.addLine()
                .pos(prevX, prevY, prevZ, x, y, z)
                .color(255, 255, 0, alpha)  // Yellow with fading alpha
                .cull(false)
                .buildAndAdd();
        }
    }
}

// Create trajectory from player's looking direction
const player = Player.getPlayer();
const pos = player.getPos();
const look = player.getLookingVec();
createTrajectory(
    pos.x, pos.y + player.getEyeHeight(), pos.z,
    look.x * 20, look.y * 20, look.z * 20, 25
);
```

### 3D Coordinate System
```javascript
// Create 3D coordinate axes at origin
function createCoordinateSystem(size = 10) {
    const draw3D = Hud.createDraw3D();

    // X axis - Red
    draw3D.addLine()
        .pos(0, 0, 0, size, 0, 0)
        .color(255, 0, 0, 255)
        .buildAndAdd();

    // Y axis - Green
    draw3D.addLine()
        .pos(0, 0, 0, 0, size, 0)
        .color(0, 255, 0, 255)
        .buildAndAdd();

    // Z axis - Blue
    draw3D.addLine()
        .pos(0, 0, 0, 0, 0, size)
        .color(0, 0, 255, 255)
        .buildAndAdd();

    // Add arrow heads for each axis
    const arrowSize = size * 0.1;

    // X axis arrow
    draw3D.addLine()
        .pos(size, 0, 0, size - arrowSize, arrowSize, 0)
        .color(255, 0, 0, 255)
        .buildAndAdd();

    draw3D.addLine()
        .pos(size, 0, 0, size - arrowSize, -arrowSize, 0)
        .color(255, 0, 0, 255)
        .buildAndAdd();
}

createCoordinateSystem(15);
```

### Entity Connection Lines
```javascript
// Connect player to nearby entities with colored lines
function connectToNearbyEntities() {
    const draw3D = Hud.createDraw3D();
    const player = Player.getPlayer();
    const playerPos = player.getPos();

    // Get nearby entities
    const entities = World.getEntitiesOfTypes("Entity", playerPos.x, playerPos.y, playerPos.z, 32);
    const eyeHeight = player.getEyeHeight();

    entities.forEach(entity => {
        if (entity.equals(player)) return;

        const entityPos = entity.getPos();
        let color;

        // Color based on entity type
        if (entity.isMonster()) {
            color = [255, 0, 0, 200]; // Red for hostile
        } else if (entity.isAnimal()) {
            color = [0, 255, 0, 200]; // Green for passive
        } else if (entity.getType() === "minecraft:item") {
            color = [255, 165, 0, 200]; // Orange for items
        } else {
            color = [0, 0, 255, 200]; // Blue for neutral
        }

        draw3D.addLine()
            .pos1(playerPos.x, playerPos.y + eyeHeight, playerPos.z)
            .pos2(entityPos.x, entityPos.y + entity.getEyeHeight(), entityPos.z)
            .color(...color)
            .cull(false)
            .buildAndAdd();
    });

    Chat.log(`Created connection lines to ${entities.length} entities`);
}

// Update entity connections every second
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks
        // Clear existing lines (assuming we have a reference to draw3D)
        connectToNearbyEntities();
    }
}));
```

### 3D Grid System
```javascript
// Create a 3D grid of lines
function create3DGrid(centerX, y, centerZ, size, spacing, color) {
    const draw3D = Hud.createDraw3D();

    // Lines along X axis
    for (let z = -size; z <= size; z += spacing) {
        draw3D.addLine()
            .pos(centerX - size, y, centerZ + z, centerX + size, y, centerZ + z)
            .color(color)
            .cull(false)
            .buildAndAdd();
    }

    // Lines along Z axis
    for (let x = -size; x <= size; x += spacing) {
        draw3D.addLine()
            .pos(centerX + x, y, centerZ - size, centerX + x, y, centerZ + size)
            .color(color)
            .cull(false)
            .buildAndAdd();
    }
}

// Create a 20x20 grid at player's position
const player = Player.getPlayer();
const playerPos = player.getBlockPos();
create3DGrid(playerPos.getX(), playerPos.getY(), playerPos.getZ(), 20, 5, [128, 128, 128, 100]);
```

### Animated Pulsing Line
```javascript
// Create an animated line that pulses in position and color
let animatedLine;
let animationTime = 0;

function createAnimatedLine() {
    const draw3D = Hud.createDraw3D();
    animatedLine = draw3D.addLine()
        .pos(0, 65, 0, 10, 70, 10)
        .color(255, 0, 0, 255)
        .cull(false)
        .build();
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
        const colorValue = Math.floor((Math.sin(animationTime * 2) + 1) * 127.5);
        animatedLine.setColor(0xFF0000, colorValue); // Red with varying alpha

        // Add to rendering system
        Hud.createDraw3D().addLine(animatedLine);
    }
}

// Initialize and animate
createAnimatedLine();
events.on("Tick", JavaWrapper.methodToJavaAsync(animateLine));
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `Line3D` instance
3. **Color Overwrites:** Setting both general and specific colors - the last call takes precedence
4. **Coordinate System:** Uses world coordinates where Y represents height
5. **Depth Culling:** When culling is enabled (true), lines respect depth testing and are hidden behind blocks
6. **Line Width:** Lines are rendered with a fixed width of 2.5 pixels for optimal visibility
7. **Performance:** Creating many 3D lines can impact performance
8. **Auto Alpha:** When using `color(color)` with RGB format, full alpha (0xFF) is automatically added

## Related Classes

- `Line3D` - The main 3D line class that this builder creates
- `Draw3D` - The 3D drawing context that provides the builder
- `RenderElement3D` - Interface that Line3D implements
- `RenderElementBuilder` - Abstract base class for all builders
- `Vec3D` - 3D vector class for positions
- `Pos3D` - 3D position helper class

## Version History

- **1.8.4:** Initial release with builder pattern support
- **Current:** Enhanced with comprehensive method set and improved color handling