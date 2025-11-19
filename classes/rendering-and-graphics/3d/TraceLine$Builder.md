# TraceLine.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.TraceLine$Builder`

**Implements:** Builder pattern for `TraceLine`

**Since:** JsMacros 1.9.0

The `TraceLine.Builder` class provides a fluent interface for creating `TraceLine` instances with method chaining. It's the recommended way to create trace lines that draw from screen positions to world positions with complex configurations.

## Overview

The `TraceLine.Builder` class allows you to construct `TraceLine` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw3D.traceLine()` method and provides two final operations:
- `build()` - Creates the TraceLine instance
- `buildAndAdd()` - Creates the TraceLine instance and automatically adds it to the Draw3D context

## Creating a Builder

```javascript
// Obtain a builder from Draw3D context
const draw3D = Hud.createDraw3D();
const builder = draw3D.traceLine();
```

## Builder Methods

### Position Methods

#### `pos(x, y, z)`
Sets the world position where the trace line should end.

**Parameters:**
- `x` (double): X coordinate of the target world position
- `y` (double): Y coordinate of the target world position
- `z` (double): Z coordinate of the target world position

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const traceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0xFF0000)
    .build();
```

#### `pos(position)`
Sets the world position using a Pos3D object.

**Parameters:**
- `position` (Pos3D): The target world position as a Pos3D object

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const targetPos = new Pos3D(50, 70, -100);
const traceLine = draw3D.traceLine()
    .pos(targetPos)
    .color(0x00FF00)
    .build();
```

#### `pos(blockPos)`
Sets the world position using a BlockPosHelper object.

**Parameters:**
- `blockPos` (BlockPosHelper): The target block position

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const blockPos = BlockPosHelper.create(100, 65, -50);
const traceLine = draw3D.traceLine()
    .pos(blockPos)
    .color(0x0000FF)
    .build();
```

#### `x(x)`
Sets only the X coordinate of the target world position.

**Parameters:**
- `x` (double): X coordinate of the target world position

**Returns:** `TraceLine.Builder` - Self for chaining

#### `y(y)`
Sets only the Y coordinate of the target world position.

**Parameters:**
- `y` (double): Y coordinate of the target world position

**Returns:** `TraceLine.Builder` - Self for chaining

#### `z(z)`
Sets only the Z coordinate of the target world position.

**Parameters:**
- `z` (double): Z coordinate of the target world position

**Returns:** `TraceLine.Builder` - Self for chaining

### Color Methods

#### `color(color)`
Sets the trace line color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const redTraceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets the trace line color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlue = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets the trace line color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const greenTraceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0, 255, 0)
    .build();
```

#### `color(r, g, b, a)`
Sets the trace line color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const purpleTraceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(128, 0, 128, 200)
    .build();
```

#### `alpha(alpha)`
Sets only the alpha transparency value while preserving RGB color.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `TraceLine.Builder` - Self for chaining

**Example:**
```javascript
const fadedTraceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0xFF0000)
    .alpha(100)
    .build();
```

### Building Methods

#### `build()`
Creates the configured `TraceLine` instance without adding it to the Draw3D context.

**Returns:** `TraceLine` - The constructed TraceLine instance

**Example:**
```javascript
const traceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0xFF0000)
    .build();

// Add to context manually later
draw3D.addTraceLine(traceLine);
```

#### `buildAndAdd()`
Creates the configured `TraceLine` instance and automatically adds it to the Draw3D context.

**Returns:** `TraceLine` - The constructed and added TraceLine instance

**Example:**
```javascript
const traceLine = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0x00FF00)
    .buildAndAdd(); // Automatically added to Draw3D context
```

## Usage Examples

### Basic Trace Line Creation
```javascript
const draw3D = Hud.createDraw3D();

// Create a simple red trace line to world position
const basicTrace = draw3D.traceLine()
    .pos(100, 64, 200)
    .color(0xFF0000)
    .buildAndAdd();
```

### Block Targeting Trace Line
```javascript
// Create trace line to the block the player is looking at
function createBlockTrace() {
    const player = Player.getPlayer();
    if (!player) return;

    const lookingAt = player.rayTraceBlock(50);
    if (lookingAt && lookingAt.block) {
        const blockPos = lookingAt.block.getBlockPos();

        const traceLine = draw3D.traceLine()
            .pos(blockPos.getX() + 0.5, blockPos.getY() + 0.5, blockPos.getZ() + 0.5)
            .color(0xFFFFFF00, 255)  // Yellow with full opacity
            .buildAndAdd();

        Chat.log("Created trace line to: " + blockPos.toString());
    }
}

createBlockTrace();
```

### Multiple Target Trace Lines
```javascript
// Create multiple trace lines to different positions
function createMultipleTraces() {
    const draw3D = Hud.createDraw3D();
    const targets = [
        { x: 100, y: 64, z: 100, color: [255, 0, 0, 200] },  // Red
        { x: -100, y: 64, z: 100, color: [0, 255, 0, 200] }, // Green
        { x: 0, y: 80, z: -150, color: [0, 0, 255, 200] },  // Blue
    ];

    targets.forEach(target => {
        draw3D.traceLine()
            .pos(target.x, target.y, target.z)
            .color(...target.color)
            .buildAndAdd();
    });

    Chat.log(`Created ${targets.length} trace lines`);
}

createMultipleTraces();
```

### Distance-Based Color Coding
```javascript
// Create trace line that changes color based on distance
function createDistanceTrace(targetX, targetY, targetZ) {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();

    // Calculate distance
    const dx = targetX - playerPos.x;
    const dy = targetY - playerPos.y;
    const dz = targetZ - playerPos.z;
    const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);

    // Color based on distance
    let color;
    if (distance < 50) {
        color = [0, 255, 0, 200]; // Green - close
    } else if (distance < 200) {
        color = [255, 255, 0, 200]; // Yellow - medium
    } else {
        color = [255, 0, 0, 200]; // Red - far
    }

    const traceLine = draw3D.traceLine()
        .pos(targetX, targetY, targetZ)
        .color(...color)
        .buildAndAdd();

    // Show distance in action bar
    Chat.actionbar(`&7Distance to target: ${Math.floor(distance)} blocks`);

    return traceLine;
}

// Create distance trace to a fixed position
createDistanceTrace(1000, 64, -500);
```

### Coordinate Tracking System
```javascript
// Create a trace line to track a specific set of coordinates
const TARGET_X = 1000;
const TARGET_Y = 64;
const TARGET_Z = -500;

function showCoordinateTrace() {
    const draw3D = Hud.createDraw3D();

    // Create trace line to target
    const traceLine = draw3D.traceLine()
        .pos(TARGET_X, TARGET_Y, TARGET_Z)
        .color(255, 165, 0, 160)  // Orange with transparency
        .buildAndAdd();

    return traceLine;
}

// Update every tick to show dynamic tracking
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    showCoordinateTrace();
}));
```

### Animated Pulsing Trace Line
```javascript
// Create an animated pulsing trace line
let pulseTraceLine;
let pulseTime = 0;

function createPulsingTrace() {
    const draw3D = Hud.createDraw3D();

    pulseTraceLine = draw3D.traceLine()
        .pos(0, 100, 0)
        .color(0x00FFFF, 255)  // Cyan
        .build();
}

function animatePulse() {
    if (!pulseTraceLine) return;

    pulseTime += 0.1;

    // Pulse the alpha
    const alpha = Math.floor(128 + Math.sin(pulseTime) * 127);
    pulseTraceLine.setAlpha(alpha);

    // Pulse the position height
    const height = 100 + Math.sin(pulseTime) * 20;
    pulseTraceLine.setPos(0, height, 0);

    // Add to rendering system
    Hud.createDraw3D().addTraceLine(pulseTraceLine);
}

// Initialize and animate
createPulsingTrace();
events.on("Tick", JavaWrapper.methodToJavaAsync(animatePulse));
```

### Location Marking System
```javascript
// Create a system to mark important locations with trace lines
class LocationMarker {
    constructor(x, y, z, name, color = [255, 255, 0, 200]) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name;
        this.color = color;
        this.traceLine = null;
    }

    createTrace() {
        const draw3D = Hud.createDraw3D();

        this.traceLine = draw3D.traceLine()
            .pos(this.x, this.y, this.z)
            .color(...this.color)
            .build();

        return this.traceLine;
    }

    showTrace() {
        if (this.traceLine) {
            Hud.createDraw3D().addTraceLine(this.traceLine);
            Chat.actionbar(`&6Tracking: &f${this.name}`);
        }
    }
}

// Create location markers
const importantLocations = [
    new LocationMarker(1000, 64, 1000, "Base", [0, 255, 0, 200]),
    new LocationMarker(-500, 80, -800, "Mining Area", [255, 165, 0, 200]),
    new LocationMarker(0, 120, 0, "Trading Post", [0, 255, 255, 200]),
];

// Initialize all trace lines
importantLocations.forEach(location => location.createTrace());

// Switch between locations
let currentLocationIndex = 0;

function switchLocation() {
    currentLocationIndex = (currentLocationIndex + 1) % importantLocations.length;
    importantLocations[currentLocationIndex].showTrace();
}

// Switch locations with key press
events.on("KeyPress", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.n") {
        switchLocation();
    }
}));

// Show first location
importantLocations[0].showTrace();
```

### Dynamic Target Selection
```javascript
// Create trace lines to dynamic targets like entities or blocks
function createEntityTrace(entity) {
    const draw3D = Hud.createDraw3D();
    const entityPos = entity.getPos();

    // Color based on entity type
    let color;
    if (entity.isMonster()) {
        color = [255, 0, 0, 200]; // Red for hostile
    } else if (entity.isAnimal()) {
        color = [0, 255, 0, 200]; // Green for passive
    } else if (entity.getType() === "minecraft:item") {
        color = [255, 165, 0, 200]; // Orange for items
    } else {
        color = [0, 0, 255, 200]; // Blue for neutral
    }

    const traceLine = draw3D.traceLine()
        .pos(entityPos.x, entityPos.y + entity.getEyeHeight(), entityPos.z)
        .color(...color)
        .buildAndAdd();

    return traceLine;
}

// Track the nearest entity
function trackNearestEntity() {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const entities = World.getEntities();
    let nearestEntity = null;
    let minDistance = Infinity;

    entities.forEach(entity => {
        if (entity.equals(player)) return;

        const distance = playerPos.distanceTo(entity.getPos());
        if (distance < minDistance) {
            minDistance = distance;
            nearestEntity = entity;
        }
    });

    if (nearestEntity && minDistance < 50) {
        const traceLine = createEntityTrace(nearestEntity);
        Chat.log(`Tracking ${nearestEntity.getName().getString()} at ${Math.floor(minDistance)}m`);
    }
}

// Update tracking every second
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks
        trackNearestEntity();
    }
}));
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `TraceLine` instance
3. **Color Overwrites:** Setting both general and specific colors - the last call takes precedence
4. **Coordinate System:** Uses world coordinates where Y represents height
5. **Screen Position:** Trace lines start from screen center (crosshair position) by default
6. **Auto Alpha:** When using `color(color)` with RGB format, full alpha (0xFF) is automatically added
7. **Performance:** Creating many trace lines can impact performance
8. **Line Width:** Trace lines are rendered with a fixed width of 2.5 pixels for visibility
9. **Depth Testing:** Trace line rendering temporarily disables depth testing to ensure visibility

## Related Classes

- `TraceLine` - The main trace line class that this builder creates
- `Draw3D` - The 3D drawing context that provides the builder
- `RenderElement3D` - Interface that TraceLine implements
- `RenderElementBuilder` - Abstract base class for all builders
- `Pos3D` - 3D position class used for target positions
- `BlockPosHelper` - Block position helper class

## Version History

- **1.9.0:** Initial release with trace line builder pattern support
- **Current:** Enhanced with comprehensive method set and improved position handling