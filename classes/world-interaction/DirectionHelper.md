# DirectionHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`
**Since:** 1.8.4
**Extends:** `BaseHelper<Direction>`

The DirectionHelper class provides a wrapper around Minecraft's Direction enum, offering various methods to work with cardinal directions and orientations in the game world. This class is commonly used when working with player movement, block interactions, and spatial calculations.

## Overview

DirectionHelper represents one of the six possible directions in Minecraft: North, South, East, West, Up, and Down. It provides utilities for direction manipulation, rotation, and conversion between different coordinate systems.

## How to Obtain DirectionHelper

DirectionHelper instances are typically obtained through various methods in JSMacros:

```javascript
// From player entity
const facing = player.getFacingDirection(); // Returns DirectionHelper

// From block state properties
const blockState = world.getBlock(x, y, z).getBlockState();
const horizontalFacing = blockState.getHorizontalFacing(); // Returns DirectionHelper

// From hit result (when looking at blocks)
const hitResult = player.getHitResult();
const side = hitResult.getSide(); // Returns DirectionHelper
```

## Available Directions

The six cardinal directions in Minecraft:
- **NORTH** (-Z direction)
- **SOUTH** (+Z direction)
- **EAST** (+X direction)
- **WEST** (-X direction)
- **UP** (+Y direction)
- **DOWN** (-Y direction)

## Methods

### getName()
**Returns:** `String` - The name of this direction

Gets the textual name of the direction (e.g., "north", "south", "east", "west", "up", "down").

```javascript
const direction = player.getFacingDirection();
const name = direction.getName(); // "north", "south", etc.
```

### getAxis()
**Returns:** `String` - The name of the axis this direction is aligned to

Returns "x", "y", or "z" depending on which axis the direction operates on.

```javascript
const direction = player.getFacingDirection();
const axis = direction.getAxis(); // "x", "y", or "z"
```

### isVertical()
**Returns:** `boolean` - True if this direction is vertical, false otherwise

Checks if the direction is pointing up or down.

```javascript
const direction = player.getFacingDirection();
if (direction.isVertical()) {
    // Direction is UP or DOWN
}
```

### isHorizontal()
**Returns:** `boolean` - True if this direction is horizontal, false otherwise

Checks if the direction is pointing north, south, east, or west.

```javascript
const direction = player.getFacingDirection();
if (direction.isHorizontal()) {
    // Direction is NORTH, SOUTH, EAST, or WEST
}
```

### isTowardsPositive()
**Returns:** `boolean` - True if this direction is pointing in a positive direction, false otherwise

Positive directions are: EAST (+X), UP (+Y), SOUTH (+Z).

```javascript
const direction = player.getFacingDirection();
if (direction.isTowardsPositive()) {
    // Direction is EAST, UP, or SOUTH
}
```

### getYaw()
**Returns:** `float` - The yaw angle of this direction in degrees

Returns the horizontal rotation angle corresponding to this direction:
- SOUTH: 0°
- WEST: 90°
- NORTH: 180°
- EAST: 270°
- UP/DOWN: 0°

```javascript
const direction = player.getFacingDirection();
const yaw = direction.getYaw(); // 0, 90, 180, or 270
```

### getPitch()
**Returns:** `float` - The pitch angle of this direction in degrees

Returns the vertical rotation angle:
- Horizontal directions: 0°
- UP: -90°
- DOWN: 90°

```javascript
const direction = player.getFacingDirection();
const pitch = direction.getPitch(); // 0, 90, or -90
```

### getOpposite()
**Returns:** `DirectionHelper` - The opposite direction

Returns a new DirectionHelper instance pointing in the opposite direction:
- NORTH ↔ SOUTH
- EAST ↔ WEST
- UP ↔ DOWN

```javascript
const direction = player.getFacingDirection();
const opposite = direction.getOpposite();

// Examples:
// NORTH becomes SOUTH
// EAST becomes WEST
// UP becomes DOWN
```

### getLeft()
**Returns:** `DirectionHelper` - The direction to the left

Returns a new DirectionHelper instance pointing 90° counter-clockwise from the current direction (when viewed from above).

```javascript
const direction = player.getFacingDirection();
const left = direction.getLeft();

// Examples:
// NORTH → WEST
// WEST → SOUTH
// SOUTH → EAST
// EAST → NORTH
```

### getRight()
**Returns:** `DirectionHelper` - The direction to the right

Returns a new DirectionHelper instance pointing 90° clockwise from the current direction (when viewed from above).

```javascript
const direction = player.getFacingDirection();
const right = direction.getRight();

// Examples:
// NORTH → EAST
// EAST → SOUTH
// SOUTH → WEST
// WEST → NORTH
```

### getVector()
**Returns:** `Pos3D` - The direction as a 3D vector

Returns a Pos3D object representing the direction as a unit vector with values of -1, 0, or 1 for each axis.

```javascript
const direction = player.getFacingDirection();
const vector = direction.getVector();

// Examples:
// NORTH: Pos3D(0, 0, -1)
// SOUTH: Pos3D(0, 0, 1)
// EAST: Pos3D(1, 0, 0)
// WEST: Pos3D(-1, 0, 0)
// UP: Pos3D(0, 1, 0)
// DOWN: Pos3D(0, -1, 0)
```

### pointsTo(yaw)
**Parameters:**
- `yaw` (number) - The yaw angle in degrees to check

**Returns:** `boolean` - True if the yaw is facing this direction more than any other one

Determines if a given yaw angle is closest to this direction.

```javascript
const direction = player.getFacingDirection();
const isFacingNorth = direction.pointsTo(180); // Check if yaw 180° points to this direction
const isFacingEast = direction.pointsTo(270); // Check if yaw 270° points to this direction
```

### toString()
**Returns:** `String` - String representation of the direction

Returns a formatted string containing the direction's name, yaw, and pitch.

```javascript
const direction = player.getFacingDirection();
const info = direction.toString(); // e.g., 'DirectionHelper:{"name": "north", "yaw": 180.000000, "pitch": 0.000000}'
```

## Inherited Methods from BaseHelper

### getRaw()
**Returns:** `Direction` - The underlying Minecraft Direction object

Provides access to the raw Minecraft Direction object if needed for advanced use cases.

```javascript
const direction = player.getFacingDirection();
const rawDirection = direction.getRaw(); // Access to the raw Direction enum
```

### equals(obj)
**Returns:** `boolean` - True if the objects are equal

Compares this DirectionHelper with another object for equality.

## Usage Examples

### Basic Direction Information
```javascript
// Get the player's current facing direction
const facing = player.getFacingDirection();

// Display direction information
chat.log(`Facing: ${facing.getName()}`);
chat.log(`Axis: ${facing.getAxis()}`);
chat.log(`Yaw: ${facing.getYaw()}°`);
chat.log(`Pitch: ${facing.getPitch()}°`);
chat.log(`Is Horizontal: ${facing.isHorizontal()}`);
chat.log(`Is Vertical: ${facing.isVertical()}`);
```

### Navigation and Movement
```javascript
const facing = player.getFacingDirection();

// Get relative directions
const left = facing.getLeft();
const right = facing.getRight();
const opposite = facing.getOpposite();

// Use vectors for movement calculations
const vector = facing.getVector();
const nextBlockX = player.getX() + vector.getX();
const nextBlockY = player.getY() + vector.getY();
const nextBlockZ = player.getZ() + vector.getZ();

// Check the block in front of the player
const frontBlock = world.getBlock(nextBlockX, nextBlockY, nextBlockZ);
```

### Block Placement Automation
```javascript
function placeBlock(directionName) {
    // Convert string to DirectionHelper (you would need to implement this)
    const facing = getDirectionByName(directionName);

    // Get the position to place the block
    const vector = facing.getVector();
    const placeX = player.getX() + vector.getX();
    const placeY = player.getY() + vector.getY();
    const placeZ = player.getZ() + vector.getZ();

    // Place the block
    player.interactBlock(placeX, placeY, placeZ);
}
```

### Rotation and Camera Control
```javascript
// Rotate player to face a specific direction
function faceDirection(targetDirectionName) {
    const directions = {
        "north": 180,
        "south": 0,
        "east": 270,
        "west": 90
    };

    const targetYaw = directions[targetDirectionName.toLowerCase()];
    if (targetYaw !== undefined) {
        player.setYaw(targetYaw);
        chat.log(`Now facing ${targetDirectionName}`);
    }
}
```

### Direction-based Filtering
```javascript
// Filter entities based on direction
const nearbyEntities = world.getEntities();
const entitiesInFront = [];

for (const entity of nearbyEntities) {
    const direction = player.getFacingDirection();
    const toEntity = entity.subtract(player);

    // Check if entity is in front of player
    const dotProduct = direction.getVector().dot(toEntity.normalize());
    if (dotProduct > 0.5) { // Within ~60 degree cone
        entitiesInFront.push(entity);
    }
}
```

## Common Patterns

### Direction Comparisons
```javascript
const facing = player.getFacingDirection();

// Check if facing a specific direction
if (facing.getName() === "north") {
    chat.log("You're facing north!");
}

// Check if direction is positive
if (facing.isTowardsPositive()) {
    chat.log("Facing in a positive coordinate direction");
}
```

### Direction Chains
```javascript
const facing = player.getFacingDirection();

// Complex direction calculations
const leftThenRight = facing.getLeft().getRight(); // Back to original
const oppositeLeft = facing.getOpposite().getLeft(); // 90° clockwise from opposite
```

## Important Notes

1. **Direction Values**: All yaw angles are in degrees and follow Minecraft's coordinate system where 0° points south.

2. **Horizontal vs Vertical**: Be aware that `getLeft()` and `getRight()` work differently for vertical directions (UP/DOWN) - they will still rotate around the Y-axis.

3. **Vector Coordinates**: The `getVector()` method returns integer values (-1, 0, 1) representing the direction vector, making it useful for block coordinate calculations.

4. **Yaw Wrapping**: Yaw values wrap around at 360°, so 270° is equivalent to -90°.

5. **Performance**: DirectionHelper objects are lightweight and can be created frequently without performance concerns.

## Related Classes

- **Pos3D**: Used for 3D position and vector calculations
- **EntityHelper**: Provides `getFacingDirection()` method
- **UniversalBlockStateHelper**: Provides direction properties for blocks
- **HitResultHelper**: Provides `getSide()` method for block face interactions