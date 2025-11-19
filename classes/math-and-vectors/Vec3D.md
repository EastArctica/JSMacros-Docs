# Vec3D

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.math`
**Since:** JsMacros 1.2.6
**Extends:** `Vec2D`

## Overview

The `Vec3D` class represents a 3D vector with a start point and an end point. It provides comprehensive functionality for 3D vector mathematics, including basic vector operations, coordinate access, magnitude calculations, directional operations, and rotation calculations. This class extends `Vec2D` to add Z-axis support for full 3D spatial operations.

A `Vec3D` is defined by two 3D points: a start point `(x1, y1, z1)` and an end point `(x2, y2, z2)`. The vector represents the displacement from the start to the end point.

## Constructors

### `new Vec3D(x1, y1, z1, x2, y2, z2)`
Creates a new Vec3D with the specified start and end coordinates.

**Parameters:**
- `x1` (double): X coordinate of the start point
- `y1` (double): Y coordinate of the start point
- `z1` (double): Z coordinate of the start point
- `x2` (double): X coordinate of the end point
- `y2` (double): Y coordinate of the end point
- `z2` (double): Z coordinate of the end point

### `new Vec3D(start, end)`
Creates a new Vec3D from two Pos3D points.

**Parameters:**
- `start` (Pos3D): The start position
- `end` (Pos3D): The end position

## Properties

### `x1`, `y1`, `z1` (read-only)
Coordinates of the start point. Access via getter methods.

### `x2`, `y2`, `z2` (read-only)
Coordinates of the end point. Access via getter methods.

## Methods

### Coordinate Accessors

#### `getX1()`
Returns the X coordinate of the start point.

**Returns:** `double` - The X coordinate of the start point

#### `getY1()`
Returns the Y coordinate of the start point.

**Returns:** `double` - The Y coordinate of the start point

#### `getZ1()`
Returns the Z coordinate of the start point.

**Returns:** `double` - The Z coordinate of the start point

#### `getX2()`
Returns the X coordinate of the end point.

**Returns:** `double` - The X coordinate of the end point

#### `getY2()`
Returns the Y coordinate of the end point.

**Returns:** `double` - The Y coordinate of the end point

#### `getZ2()`
Returns the Z coordinate of the end point.

**Returns:** `double` - The Z coordinate of the end point

#### `getDeltaX()`
Returns the X component of the vector (x2 - x1).

**Returns:** `double` - The X component of the vector

#### `getDeltaY()`
Returns the Y component of the vector (y2 - y1).

**Returns:** `double` - The Y component of the vector

#### `getDeltaZ()`
Returns the Z component of the vector (z2 - z1).

**Returns:** `double` - The Z component of the vector

### Position Accessors

#### `getStart()`
Returns the start point as a Pos3D object.

**Returns:** `Pos3D` - The start position

#### `getEnd()`
Returns the end point as a Pos3D object.

**Returns:** `Pos3D` - The end position

### Magnitude and Length

#### `getMagnitude()`
Returns the magnitude (length) of the vector using Euclidean distance.

**Returns:** `double` - The length of the vector

#### `getMagnitudeSq()`
Returns the squared magnitude of the vector. More efficient than `getMagnitude()` when only relative comparisons are needed.

**Returns:** `double` - The squared length of the vector

### Vector Operations

#### `add(vec)`
Adds another Vec3D to this vector component-wise.

**Parameters:**
- `vec` (Vec3D): The vector to add

**Returns:** `Vec3D` - A new vector representing the sum

#### `add(x1, y1, z1, x2, y2, z2)`
Adds the specified coordinates to both start and end points of this vector.

**Parameters:**
- `x1` (double): X coordinate to add to start point
- `y1` (double): Y coordinate to add to start point
- `z1` (double): Z coordinate to add to start point
- `x2` (double): X coordinate to add to end point
- `y2` (double): Y coordinate to add to end point
- `z2` (double): Z coordinate to add to end point

**Returns:** `Vec3D` - A new vector with added coordinates

#### `addStart(pos)`
Adds a position to only the start point of this vector.

**Parameters:**
- `pos` (Pos3D): Position to add to the start point

**Returns:** `Vec3D` - A new vector with modified start point

#### `addStart(x, y, z)`
Adds coordinates to only the start point of this vector.

**Parameters:**
- `x` (double): X coordinate to add to start point
- `y` (double): Y coordinate to add to start point
- `z` (double): Z coordinate to add to start point

**Returns:** `Vec3D` - A new vector with modified start point

#### `addEnd(pos)`
Adds a position to only the end point of this vector.

**Parameters:**
- `pos` (Pos3D): Position to add to the end point

**Returns:** `Vec3D` - A new vector with modified end point

#### `addEnd(x, y, z)`
Adds coordinates to only the end point of this vector.

**Parameters:**
- `x` (double): X coordinate to add to end point
- `y` (double): Y coordinate to add to end point
- `z` (double): Z coordinate to add to end point

**Returns:** `Vec3D` - A new vector with modified end point

#### `multiply(vec)`
Multiplies this vector by another Vec3D component-wise.

**Parameters:**
- `vec` (Vec3D): The vector to multiply by

**Returns:** `Vec3D` - A new vector representing the product

#### `multiply(x1, y1, z1, x2, y2, z2)`
Multiplies the start and end points of this vector by the specified coordinates.

**Parameters:**
- `x1` (double): X factor to multiply start point by
- `y1` (double): Y factor to multiply start point by
- `z1` (double): Z factor to multiply start point by
- `x2` (double): X factor to multiply end point by
- `y2` (double): Y factor to multiply end point by
- `z2` (double): Z factor to multiply end point by

**Returns:** `Vec3D` - A new vector with multiplied coordinates

#### `scale(scale)`
Scales both the start and end points of this vector by the specified factor.

**Parameters:**
- `scale` (double): The scaling factor

**Returns:** `Vec3D` - A new scaled vector

#### `normalize()`
Returns a normalized version of this vector with magnitude 1.0, maintaining the same direction.

**Returns:** `Vec3D` - A normalized vector with magnitude 1.0

### Rotation and Direction

#### `getPitch()`
Calculates the pitch (vertical angle) of this vector in degrees. Pitch represents the angle up or down from the horizontal plane.

**Returns:** `float` - The pitch in degrees (-90 to 90, where 0 is horizontal, positive is upward)

#### `getYaw()`
Calculates the yaw (horizontal angle) of this vector in degrees. Yaw represents the compass direction.

**Returns:** `float` - The yaw in degrees (0 to 360, where 0 is south, 90 is west, 180 is north, 270 is east)

### Vector Mathematics

#### `dotProduct(vec)`
Calculates the dot product of this vector with another Vec3D.

**Parameters:**
- `vec` (Vec3D): The vector to calculate the dot product with

**Returns:** `double` - The dot product value

#### `crossProduct(vec)`
Calculates the cross product of this vector with another Vec3D, resulting in a vector perpendicular to both.

**Parameters:**
- `vec` (Vec3D): The vector to calculate the cross product with

**Returns:** `Vec3D` - A new vector perpendicular to both input vectors

#### `reverse()`
Returns a new Vec3D with the start and end points swapped, effectively reversing the vector direction.

**Returns:** `Vec3D` - A new vector with reversed direction

### Conversion Methods

#### `toMojangFloatVector()`
Converts this vector to a JOML Vector3f object representing the vector's direction and magnitude.

**Returns:** `Vector3f` - A JOML Vector3f representation of this vector

### Object Methods

#### `toString()`
Returns a string representation of this vector.

**Returns:** `String` - String in format: `"x1, y1, z1 -> x2, y2, z2"`

#### `equals(obj)`
Compares this Vec3D with another object for equality.

**Parameters:**
- `obj` (Object): Object to compare with

**Returns:** `boolean` - True if equal, false otherwise

#### `hashCode()`
Returns the hash code for this vector.

**Returns:** `int` - Hash code value

#### `compareTo(other)`
Compares this Vec3D with another Vec3D for ordering.

**Parameters:**
- `other` (Vec3D): The vector to compare with

**Returns:** `int` - Negative if this vector is less, zero if equal, positive if greater

## Usage Examples

### Creating Vectors

```javascript
// Create a vector from coordinates
const vector = new Vec3D(0, 64, 0, 10, 70, 10);

// Create a vector from positions
const start = new Pos3D(player.getX(), player.getY(), player.getZ());
const end = new Pos3D(target.getX(), target.getY(), target.getZ());
const directionVector = new Vec3D(start, end);
```

### Basic Vector Operations

```javascript
// Vector components
const dx = vector.getDeltaX();
const dy = vector.getDeltaY();
const dz = vector.getDeltaZ();

// Vector magnitude
const length = vector.getMagnitude();
const lengthSquared = vector.getMagnitudeSq();

// Access start and end positions
const startPos = vector.getStart();
const endPos = vector.getEnd();
```

### Vector Mathematics

```javascript
// Scaling
const doubled = vector.scale(2.0);
const halved = vector.scale(0.5);

// Addition
const offset = new Vec3D(5, 0, 3, 5, 0, 3);
const shifted = vector.add(offset);

// Multiplication
const stretched = vector.multiply(new Vec3D(1, 2, 1, 1, 2, 1));

// Normalization
const unitVector = vector.normalize();
```

### Direction and Rotation

```javascript
// Get rotation angles for player look direction
const yaw = vector.getYaw();
const pitch = vector.getPitch();

Chat.log(`Direction: Yaw=${yaw.toFixed(1)}°, Pitch=${pitch.toFixed(1)}°`);

// Apply rotation to player
if (player) {
    player.setYaw(yaw);
    player.setPitch(pitch);
}
```

### Advanced Vector Operations

```javascript
// Dot product (useful for angle calculations)
const vec1 = new Vec3D(0, 0, 0, 1, 0, 0);  // East direction
const vec2 = new Vec3D(0, 0, 0, 0, 1, 0);  // Up direction
const dotProduct = vec1.dotProduct(vec2);   // Should be 0 (perpendicular)

// Cross product (perpendicular vector)
const east = new Vec3D(0, 0, 0, 1, 0, 0);
const north = new Vec3D(0, 0, 0, 0, 0, -1);
const up = east.crossProduct(north);        // Points upward
```

### Practical Examples

#### Entity Tracking and Prediction

```javascript
// Calculate trajectory for projectile
const shooter = Player.getPlayer();
const target = World.findNearestEntity(50);

if (shooter && target) {
    const shooterPos = new Pos3D(shooter.getX(), shooter.getY() + 1.6, shooter.getZ());
    const targetPos = new Pos3D(target.getX(), target.getY(), target.getZ());

    // Create direction vector
    const direction = new Vec3D(shooterPos, targetPos).normalize();

    // Calculate future position (prediction)
    const distance = shooterPos.distanceTo(targetPos);
    const timeToTarget = distance / 20; // Assuming projectile speed of 20 m/s
    const velocity = target.getVelocity();
    const futurePos = targetPos.add(velocity.x * timeToTarget, velocity.y * timeToTarget, velocity.z * timeToTarget);

    // Aim at predicted position
    const aimVector = new Vec3D(shooterPos, futurePos).normalize();
    const yaw = aimVector.getYaw();
    const pitch = aimVector.getPitch();

    Chat.log(`Aim at target: Yaw=${yaw.toFixed(1)}°, Pitch=${pitch.toFixed(1)}°`);
}
```

#### Distance and Range Calculations

```javascript
// Check if entities are within range
const playerPos = new Pos3D(Player.getPlayer().getPos());
const maxRange = 30;

const nearbyEntities = World.getNearbyEntities(maxRange);
for (const entity of nearbyEntities) {
    const entityPos = new Pos3D(entity.getPos());
    const distance = playerPos.distanceTo(entityPos);

    if (distance <= maxRange) {
        const directionVector = new Vec3D(playerPos, entityPos);
        const yaw = directionVector.getYaw();

        Chat.log(`${entity.getName()} is ${distance.toFixed(1)} blocks away at yaw ${yaw.toFixed(1)}°`);
    }
}
```

#### Area of Effect Calculations

```javascript
// Calculate explosion effects
const explosionCenter = new Pos3D(100, 64, 200);
const explosionRadius = 15;

// Create vectors in different directions for blast calculation
const directions = [
    new Vec3D(0, 0, 0, 1, 0, 0),   // East
    new Vec3D(0, 0, 0, -1, 0, 0),  // West
    new Vec3D(0, 0, 0, 0, 0, 1),   // South
    new Vec3D(0, 0, 0, 0, 0, -1),  // North
    new Vec3D(0, 0, 0, 0, 1, 0),   // Up
    new Vec3D(0, 0, 0, 0, -1, 0),  // Down
];

for (const dir of directions) {
    const edgePoint = dir.scale(explosionRadius).getEnd();
    const worldPos = explosionCenter.add(edgePoint);

    Chat.log(`Explosion reaches: [${worldPos.x.toFixed(0)}, ${worldPos.y.toFixed(0)}, ${worldPos.z.toFixed(0)}]`);
}
```

## Important Notes

1. **Immutability**: All methods that modify vector properties return a new `Vec3D` instance rather than modifying the original object.

2. **Coordinate System**:
   - X: East (+) / West (-)
   - Y: Up (+) / Down (-)
   - Z: South (+) / North (-)

3. **Angle Calculations**:
   - Yaw: 0° = South, 90° = West, 180° = North, 270° = East
   - Pitch: 0° = Horizontal, +90° = Straight up, -90° = Straight down

4. **Performance**: Use `getMagnitudeSq()` instead of `getMagnitude()` when comparing distances to avoid expensive square root calculations.

5. **Vector Representation**: This class represents a directed line segment, not a position. For position operations, use `Pos3D` instead.

6. **Precision**: All calculations use double-precision floating-point arithmetic for maximum accuracy.

7. **Normalization**: The `normalize()` method assumes the vector has a non-zero magnitude. Behavior is undefined for zero-length vectors.

## Related Classes

- `Pos3D`: For 3D position operations
- `Vec2D`: Parent class for 2D vector operations
- `Vector3f`: JOML vector class for Minecraft integration

## Version History

- **1.2.6**: Initial release with basic vector operations
- **1.6.3**: Added component-wise multiplication, scaling, and direct coordinate operations
- **1.6.4**: Added start/end point specific addition methods
- **1.6.5**: Added magnitude squared calculation, normalization, and JOML vector conversion
- **1.8.4**: Enhanced with improved mathematical operations and Minecraft integration