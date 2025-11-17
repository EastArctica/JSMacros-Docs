# Box

Represents a 3D bounding box or rectangular prism for rendering and spatial operations. Essential for highlighting blocks, creating visual boundaries, and performing 3D geometric calculations. Supports both outline and filled rendering with customizable colors and transparency.

## Constructor

```javascript
new Box(x1, y1, z1, x2, y2, z2, color, fillColor, fill, cull)
```

**Parameters:**
- `x1, y1, z1` (number): Coordinates of the first corner
- `x2, y2, z2` (number): Coordinates of the second corner
- `color` (number): Outline color (0xRRGGBB format)
- `fillColor` (number): Fill color (0xRRGGBB format)
- `fill` (boolean): Whether to fill the box
- `cull` (boolean): Whether to enable face culling

**Alternative Constructor with Alpha:**
```javascript
new Box(x1, y1, z1, x2, y2, z2, color, alpha, fillColor, fillAlpha, fill, cull)
```

**Additional Parameters:**
- `alpha` (number): Alpha transparency for outline (0-255)
- `fillAlpha` (number): Alpha transparency for fill (0-255)

## Properties

| Property | Type | Description |
|----------|------|-------------|
| pos | Vec3D | Vector representing the box dimensions and position |
| color | number | Outline color (including alpha) |
| fillColor | number | Fill color (including alpha) |
| fill | boolean | Whether the box should be filled |
| cull | boolean | Whether face culling is enabled |

## Methods

### Position Management

#### setPos(x1, y1, z1, x2, y2, z2)
Sets the box dimensions and position.

```javascript
box.setPos(0, 60, 0, 10, 70, 10);
```

#### setPosToBlock(blockPos)
Sets the box to highlight a specific block.

```javascript
box.setPosToBlock(World.getBlockAt(100, 64, 100).getPos());
```

#### setPosToBlock(x, y, z)
Sets the box to highlight a block at the given coordinates.

```javascript
box.setPosToBlock(100, 64, 100);
```

#### setPosToPoint(position, radius)
Sets the box to be a sphere-like volume around a point.

```javascript
box.setPosToPoint(new Pos3D(50, 64, 50), 2.5);
```

#### setPosToPoint(x, y, z, radius)
Sets the box to be a sphere-like volume around the given point.

```javascript
box.setPosToPoint(50, 64, 50, 2.5);
```

### Color Management

#### setColor(color)
Sets the outline color.

```javascript
box.setColor(0xFF0000); // Red outline
```

#### setColor(color, alpha)
Sets the outline color with transparency.

```javascript
box.setColor(0xFF0000, 128); // Semi-transparent red outline
```

#### setFillColor(color)
Sets the fill color.

```javascript
box.setFillColor(0x0000FF); // Blue fill
```

#### setFillColor(color, alpha)
Sets the fill color with transparency.

```javascript
box.setFillColor(0x0000FF, 64); // Semi-transparent blue fill
```

#### setAlpha(alpha)
Sets the outline transparency.

```javascript
box.setAlpha(200); // Mostly opaque
```

#### setFillAlpha(alpha)
Sets the fill transparency.

```javascript
box.setFillAlpha(100); // Semi-transparent fill
```

### Fill Control

#### setFill(enabled)
Enables or disables box filling.

```javascript
box.setFill(true); // Enable fill
box.setFill(false); // Disable fill
```

## Builder Pattern

The Box class provides a fluent builder interface for easy construction:

```javascript
let box = Draw3D.createBoxBuilder()
    .pos(100, 64, 100, 101, 65, 101)
    .color(255, 0, 0)     // Red outline
    .fillColor(0, 255, 0) // Green fill
    .fill(true)
    .alpha(200)
    .fillAlpha(100)
    .buildAndAdd();
```

### Builder Methods

#### Position Methods
- `pos(x1, y1, z1, x2, y2, z2)` - Set both corners
- `pos1(pos3D)` / `pos1(blockPos)` / `pos1(x, y, z)` - Set first corner
- `pos2(pos3D)` / `pos2(blockPos)` / `pos2(x, y, z)` - Set second corner
- `forBlock(x, y, z)` / `forBlock(blockPos)` - Highlight a block

#### Color Methods
- `color(color)` - Set outline color
- `color(color, alpha)` - Set outline color with alpha
- `color(r, g, b)` - Set outline color from RGB
- `color(r, g, b, a)` - Set outline color from RGBA

#### Fill Methods
- `fillColor(color)` - Set fill color
- `fillColor(color, alpha)` - Set fill color with alpha
- `fillColor(r, g, b)` - Set fill color from RGB
- `fillColor(r, g, b, a)` - Set fill color from RGBA
- `alpha(alpha)` - Set outline alpha
- `fillAlpha(alpha)` - Set fill alpha
- `fill(enabled)` - Enable/disable filling

#### Rendering Methods
- `cull(enabled)` - Enable/disable face culling

#### Build Methods
- `build()` - Create the box
- `buildAndAdd()` - Create and add to Draw3D

## Examples

### Basic Block Highlighting

```javascript
// Create a Draw3D instance
let draw3d = Draw3D.create();

// Highlight the block player is looking at
let player = Player.getPlayer();
let lookPos = player.getTargetedBlock();
if (lookPos) {
    let highlightBox = new Box(
        lookPos.x, lookPos.y, lookPos.z,
        lookPos.x + 1, lookPos.y + 1, lookPos.z + 1,
        0xFF0000, // Red outline
        0x000000, // No fill
        false,    // Don't fill
        true      // Enable culling
    );
    draw3d.addBox(highlightBox);
}
```

### Area Visualization

```javascript
// Create a box around a protected area
let draw3d = Draw3D.create();
let areaCenter = Player.getPlayer().getPos();
let areaSize = 32;

// Create boundary box
let boundaryBox = new Box(
    areaCenter.x - areaSize, areaCenter.y - 10, areaCenter.z - areaSize,
    areaCenter.x + areaSize, areaCenter.y + 20, areaCenter.z + areaSize,
    0xFFFFFF, // White outline
    0x00FF00, // Green fill
    true,     // Enable fill
    false     // Disable culling (see through)
);

// Make it semi-transparent
boundaryBox.setAlpha(255);      // Solid outline
boundaryBox.setFillAlpha(50);   // Very transparent fill

draw3d.addBox(boundaryBox);
```

### Using Builder Pattern

```javascript
// Create multiple boxes using builder pattern
let draw3d = Draw3D.create();

// Highlight nearby ores
World.getLoadedChunks().forEach(chunk => {
    for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 256; y++) {
            for (let z = 0; z < 16; z++) {
                let worldX = chunk.getPos().x * 16 + x;
                let worldY = y;
                let worldZ = chunk.getPos().z * 16 + z;

                let block = World.getBlockAt(worldX, worldY, worldZ);
                if (block.getName().includes("ore")) {
                    Draw3D.createBoxBuilder()
                        .forBlock(worldX, worldY, worldZ)
                        .color(255, 255, 0)    // Yellow outline
                        .fillColor(255, 165, 0) // Orange fill
                        .fill(true)
                        .fillAlpha(80)
                        .buildAndAdd();
                }
            }
        }
    }
});
```

### Dynamic Box Animation

```javascript
// Animated pulsing box around player
let draw3d = Draw3D.create();
let pulseBox = null;

jsmacros.on("RenderTick", JavaWrapper.methodToJava((event) => {
    if (pulseBox) {
        draw3d.removeBox(pulseBox);
    }

    let player = Player.getPlayer();
    let time = Date.now() / 1000;
    let pulse = Math.sin(time * 2) * 0.5 + 0.5; // Oscillate between 0 and 1

    pulseBox = new Box(
        player.x - 3, player.y - 1, player.z - 3,
        player.x + 4, player.y + 3, player.z + 4,
        // Red outline with pulsing alpha
        (Math.floor(pulse * 255) << 24) | 0xFF0000,
        // Blue fill with pulsing alpha
        (Math.floor(pulse * 128) << 24) | 0x0000FF,
        true, true
    );

    draw3d.addBox(pulseBox);
}));
```

### Building Visualization

```javascript
// Visualize a building blueprint
let draw3d = Draw3D.create();

// Building dimensions
let buildingLength = 20;
let buildingWidth = 15;
let buildingHeight = 8;
let foundationY = 64;

// Foundation
let foundation = new Box(
    0, foundationY, 0,
    buildingLength, foundationY + 1, buildingWidth,
    0x8B4513, // Brown outline
    0x654321, // Dark brown fill
    true, true
);
draw3d.addBox(foundation);

// Walls
let wallColor = 0xFFFFFF;
let wallAlpha = 100;

// Front wall
let frontWall = new Box(
    0, foundationY + 1, 0,
    buildingLength, foundationY + buildingHeight, 1,
    wallColor, wallColor, true, true
);
frontWall.setFillAlpha(wallAlpha);
draw3d.addBox(frontWall);

// Back wall
let backWall = new Box(
    0, foundationY + 1, buildingWidth - 1,
    buildingLength, foundationY + buildingHeight, buildingWidth,
    wallColor, wallColor, true, true
);
backWall.setFillAlpha(wallAlpha);
draw3d.addBox(backWall);

// Left wall
let leftWall = new Box(
    0, foundationY + 1, 0,
    1, foundationY + buildingHeight, buildingWidth,
    wallColor, wallColor, true, true
);
leftWall.setFillAlpha(wallAlpha);
draw3d.addBox(leftWall);

// Right wall
let rightWall = new Box(
    buildingLength - 1, foundationY + 1, 0,
    buildingLength, foundationY + buildingHeight, buildingWidth,
    wallColor, wallColor, true, true
);
rightWall.setFillAlpha(wallAlpha);
draw3d.addBox(rightWall);

// Roof
let roof = new Box(
    0, foundationY + buildingHeight, 0,
    buildingLength, foundationY + buildingHeight + 1, buildingWidth,
    0xFF0000, // Red outline
    0x8B0000, // Dark red fill
    true, true
);
draw3d.addBox(roof);
```

### Spatial Analysis Visualization

```javascript
// Visualize mining area and bedrock levels
let draw3d = Draw3D.create();
let player = Player.getPlayer();
let playerPos = player.getPos();

// Show safe mining levels (Y levels 11-15 are usually best for diamonds)
let safeMiningStart = 11;
let safeMiningEnd = 15;

for (let y = safeMiningStart; y <= safeMiningEnd; y++) {
    let box = new Box(
        playerPos.x - 50, y, playerPos.z - 50,
        playerPos.x + 50, y + 1, playerPos.z + 50,
        0x00FF00, // Green outline
        0x00FF00, // Green fill
        true, true
    );
    box.setFillAlpha(20); // Very transparent
    draw3d.addBox(box);
}

// Show bedrock level (Y=0-4)
let bedrockBox = new Box(
    playerPos.x - 50, 0, playerPos.z - 50,
    playerPos.x + 50, 4, playerPos.z + 50,
    0x808080, // Gray outline
    0x404040, // Dark gray fill
    true, true
);
bedrockBox.setFillAlpha(60);
draw3d.addBox(bedrockBox);
```

### Interactive Box Selection

```javascript
// Click to create and modify boxes
let draw3d = Draw3D.create();
let boxes = [];

jsmacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (event.action === 1 && event.key === "key.mouse.left") { // Left click
        let player = Player.getPlayer();
        let lookPos = player.getTargetedBlock();

        if (lookPos) {
            // Create box at clicked position
            let newBox = Draw3D.createBoxBuilder()
                .forBlock(lookPos.x, lookPos.y, lookPos.z)
                .color(Math.random() * 0xFFFFFF) // Random color
                .fillColor(Math.random() * 0xFFFFFF)
                .fill(true)
                .fillAlpha(128)
                .buildAndAdd();

            boxes.push(newBox);
            console.log(`Created box at (${lookPos.x}, ${lookPos.y}, ${lookPos.z}). Total: ${boxes.length}`);
        }
    }
}));

// Remove all boxes with a key press
jsmacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (event.action === 1 && event.key === "key.keyboard.r") {
        boxes.forEach(box => draw3d.removeBox(box));
        boxes = [];
        console.log("Removed all boxes");
    }
}));
```

### Performance Considerations

```javascript
// Efficient box updates for moving objects
let draw3d = Draw3D.create();
let entityBox = null;

// Update box position instead of recreating
jsmacros.on("PlayerTick", JavaWrapper.methodToJava((event) => {
    let player = Player.getPlayer();

    // Update existing box instead of creating new one
    if (!entityBox) {
        // Create on first run
        entityBox = new Box(
            0, 0, 0, 1, 1, 1,
            0xFF0000, 0x000000, false, true
        );
        draw3d.addBox(entityBox);
    }

    // Just update position - much more efficient
    entityBox.setPosToBlock(
        Math.floor(player.x),
        Math.floor(player.y),
        Math.floor(player.z)
    );
}));
```

## Integration with Other Classes

Box integrates seamlessly with:
- **Draw3D**: For 3D rendering and management
- **Pos3D**: For positioning and spatial calculations
- **WorldScanner**: For visualizing scan results
- **BlockPosHelper**: For block-based positioning

## Performance Notes

- Update existing boxes instead of recreating them when possible
- Use lower alpha values for semi-transparent effects
- Limit the number of active boxes to maintain performance
- Remove boxes that are no longer needed

## Color Format

Colors are specified in hexadecimal format:
- `0xRRGGBB` for RGB values
- Alpha is handled separately or included as `0xAARRGGBB`
- Common colors: Red (0xFF0000), Green (0x00FF00), Blue (0x0000FF), White (0xFFFFFF), Black (0x000000)

## See Also

- [Draw3D](Draw3D.md) - 3D drawing operations
- [Pos3D](Pos3D.md) - 3D position class
- [Vec3D](Vec3D.md) - 3D vector class
- [WorldScanner](WorldScanner.md) - World scanning utilities