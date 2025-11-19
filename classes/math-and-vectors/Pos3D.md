# Pos3D

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.math`
**Since:** JsMacros 1.2.6
**Extends:** `Pos2D`

## Overview

The `Pos3D` class represents a three-dimensional position with double precision coordinates (x, y, z). It provides comprehensive mathematical operations for position manipulation, vector calculations, and coordinate conversions. This class is essential for working with precise 3D positions in Minecraft, particularly for entity positions, ray casting, and spatial calculations.

## Constructors

### `new Pos3D(x, y, z)`
Creates a new Pos3D with the specified coordinates.

**Parameters:**
- `x` (double): The X coordinate
- `y` (double): The Y coordinate
- `z` (double): The Z coordinate

**Example:**
```js
const position = new Pos3D(100.5, 64.0, -200.25);
```

### `new Pos3D(vec3d)`
Creates a new Pos3D from a Minecraft Vec3d object.

**Parameters:**
- `vec3d` (Vec3d): The Minecraft Vec3d to convert

**Example:**
```js
// From entity position
const entityPos = new Pos3D(player.getPos());
```

## Constants

## Properties

### `x` (public double)
The X coordinate of the position.

### `y` (public double)
The Y coordinate of the position.

### `z` (public double)
The Z coordinate of the position.

## Methods

### Coordinate Accessors

#### `getX()`
Returns the X coordinate of the position.

**Returns:** `double` - The X coordinate

#### `getY()`
Returns the Y coordinate of the position.

**Returns:** `double` - The Y coordinate

#### `getZ()`
Returns the Z coordinate of the position.

**Returns:** `double` - The Z coordinate

### Mathematical Operations

#### `add(pos)`
Adds another Pos3D to this position and returns a new Pos3D.

**Parameters:**
- `pos` (Pos3D): The position to add

**Returns:** `Pos3D` - New position with coordinates (x + pos.x, y + pos.y, z + pos.z)

**Example:**
```js
const pos1 = new Pos3D(10, 20, 30);
const pos2 = new Pos3D(5, 15, 25);
const result = pos1.add(pos2); // (15, 35, 55)
```

#### `add(x, y, z)`
Adds the specified coordinate values to this position and returns a new Pos3D.

**Parameters:**
- `x` (double): X coordinate to add
- `y` (double): Y coordinate to add
- `z` (double): Z coordinate to add

**Returns:** `Pos3D` - New position with added coordinates

**Since:** 1.6.3

**Example:**
```js
const pos = new Pos3D(10, 20, 30);
const result = pos.add(5, -10, 15); // (15, 10, 45)
```

#### `sub(pos)`
Subtracts another Pos3D from this position and returns a new Pos3D.

**Parameters:**
- `pos` (Pos3D): The position to subtract

**Returns:** `Pos3D` - New position with coordinates (x - pos.x, y - pos.y, z - pos.z)

**Since:** 1.8.4

**Example:**
```js
const pos1 = new Pos3D(20, 30, 40);
const pos2 = new Pos3D(5, 10, 15);
const result = pos1.sub(pos2); // (15, 20, 25)
```

#### `sub(x, y, z)`
Subtracts the specified coordinate values from this position and returns a new Pos3D.

**Parameters:**
- `x` (double): X coordinate to subtract
- `y` (double): Y coordinate to subtract
- `z` (double): Z coordinate to subtract

**Returns:** `Pos3D` - New position with subtracted coordinates

**Since:** 1.8.4

#### `multiply(pos)`
Multiplies this position by another Pos3D (component-wise) and returns a new Pos3D.

**Parameters:**
- `pos` (Pos3D): The position to multiply by

**Returns:** `Pos3D` - New position with coordinates (x * pos.x, y * pos.y, z * pos.z)

**Example:**
```js
const pos1 = new Pos3D(2, 3, 4);
const pos2 = new Pos3D(5, 6, 7);
const result = pos1.multiply(pos2); // (10, 18, 28)
```

#### `multiply(x, y, z)`
Multiplies this position by the specified coordinate values and returns a new Pos3D.

**Parameters:**
- `x` (double): X coordinate multiplier
- `y` (double): Y coordinate multiplier
- `z` (double): Z coordinate multiplier

**Returns:** `Pos3D` - New position with multiplied coordinates

**Since:** 1.6.3

#### `divide(pos)`
Divides this position by another Pos3D (component-wise) and returns a new Pos3D.

**Parameters:**
- `pos` (Pos3D): The position to divide by

**Returns:** `Pos3D` - New position with coordinates (x / pos.x, y / pos.y, z / pos.z)

**Since:** 1.8.4

#### `divide(x, y, z)`
Divides this position by the specified coordinate values and returns a new Pos3D.

**Parameters:**
- `x` (double): X coordinate divisor
- `y` (double): Y coordinate divisor
- `z` (double): Z coordinate divisor

**Returns:** `Pos3D` - New position with divided coordinates

**Since:** 1.8.4

#### `scale(scale)`
Multiplies all coordinates by the specified scale factor and returns a new Pos3D.

**Parameters:**
- `scale` (double): The scale factor

**Returns:** `Pos3D` - New scaled position

**Since:** 1.6.3

**Example:**
```js
const pos = new Pos3D(10, 20, 30);
const scaled = pos.scale(2.5); // (25, 50, 75)
```

### Vector Operations

#### `toVector()`
Creates a Vec3D vector from the origin (0, 0, 0) to this position.

**Returns:** `Vec3D` - Vector from origin to this position

**Example:**
```js
const pos = new Pos3D(10, 20, 30);
const vector = pos.toVector(); // Vector from (0,0,0) to (10,20,30)
```

#### `toVector(startPos)`
Creates a Vec3D vector from the specified start position to this position.

**Parameters:**
- `startPos` (Pos2D): The start position (z will be assumed 0)

**Returns:** `Vec3D` - Vector from start position to this position

**Since:** 1.6.4

#### `toVector(startPos)`
Creates a Vec3D vector from the specified start position to this position.

**Parameters:**
- `startPos` (Pos3D): The start position

**Returns:** `Vec3D` - Vector from start position to this position

**Since:** 1.6.4

**Example:**
```js
const start = new Pos3D(5, 10, 15);
const end = new Pos3D(15, 25, 35);
const vector = end.toVector(start); // Vector from start to end
```

#### `toVector(startX, startY, startZ)`
Creates a Vec3D vector from the specified start coordinates to this position.

**Parameters:**
- `startX` (double): Start X coordinate
- `startY` (double): Start Y coordinate
- `startZ` (double): Start Z coordinate

**Returns:** `Vec3D` - Vector from start coordinates to this position

**Since:** 1.6.4

#### `toReverseVector()`
Creates a Vec3D vector from this position to the origin (0, 0, 0).

**Returns:** `Vec3D` - Vector from this position to origin

**Since:** 1.6.4

#### `toReverseVector(endPos)`
Creates a Vec3D vector from this position to the specified end position.

**Parameters:**
- `endPos` (Pos2D): The end position (z will be assumed 0)

**Returns:** `Vec3D` - Vector from this position to end position

#### `toReverseVector(endPos)`
Creates a Vec3D vector from this position to the specified end position.

**Parameters:**
- `endPos` (Pos3D): The end position

**Returns:** `Vec3D` - Vector from this position to end position

**Since:** 1.6.4

#### `toReverseVector(endX, endY, endZ)`
Creates a Vec3D vector from this position to the specified end coordinates.

**Parameters:**
- `endX` (double): End X coordinate
- `endY` (double): End Y coordinate
- `endZ` (double): End Z coordinate

**Returns:** `Vec3D` - Vector from this position to end coordinates

**Since:** 1.6.4

### Conversion Methods

#### `toBlockPos()`
Converts this double-precision position to a BlockPosHelper with floored coordinates.

**Returns:** `BlockPosHelper` - Block position with floored integer coordinates

**Since:** 1.8.0

**Example:**
```js
const pos = new Pos3D(10.7, 64.2, -200.8);
const blockPos = pos.toBlockPos(); // BlockPosHelper(10, 64, -201)
```

#### `toRawBlockPos()`
Converts this double-precision position to a raw Minecraft BlockPos with floored coordinates.

**Returns:** `BlockPos` - Raw Minecraft BlockPos with floored integer coordinates

**Since:** 1.8.0

#### `toMojangDoubleVector()`
Converts this position to a Minecraft Vec3d object.

**Returns:** `Vec3d` - Minecraft's double precision vector

**Since:** 1.8.4

**Example:**
```js
const pos = new Pos3D(100.5, 64.0, -200.25);
const mcVec = pos.toMojangDoubleVector();
```

### Inherited Methods

The Pos3D class also inherits the following methods from Pos2D:

#### `to3D()`
Converts this Pos2D to a Pos3D with z coordinate set to 0.

**Returns:** `Pos3D` - This position as a 3D coordinate

### Object Methods

#### `toString()`
Returns a string representation of this position.

**Returns:** `String` - String in format: `"x, y, z"`

**Example:**
```js
const pos = new Pos3D(10.5, 20.25, -30.75);
console.log(pos.toString()); // "10.500000, 20.250000, -30.750000"
```

#### `equals(obj)`
Compares this Pos3D with another object for equality.

**Parameters:**
- `obj` (Object): Object to compare with

**Returns:** `boolean` - True if positions are equal, false otherwise

**Example:**
```js
const pos1 = new Pos3D(10, 20, 30);
const pos2 = new Pos3D(10, 20, 30);
const pos3 = new Pos3D(10, 20, 31);

console.log(pos1.equals(pos2)); // true
console.log(pos1.equals(pos3)); // false
```

#### `hashCode()`
Returns the hash code for this position.

**Returns:** `int` - Hash code value

#### `compareTo(other)`
Compares this Pos3D with another Pos3D for ordering.

**Parameters:**
- `other` (Pos3D): Position to compare with

**Returns:** `int` - Negative if this position is less, positive if greater, zero if equal

## Usage Examples

### Basic Position Operations

```js
// Create positions
const playerPos = new Pos3D(100.5, 64.0, -200.25);
const targetPos = new Pos3D(150.75, 70.5, -150.0);

// Access coordinates
console.log(`Player at: ${playerPos.getX()}, ${playerPos.getY()}, ${playerPos.getZ()}`);

// Basic arithmetic
const offset = targetPos.sub(playerPos);
console.log(`Offset: ${offset.x}, ${offset.y}, ${offset.z}`);

// Scale movement
const movement = offset.scale(0.5);
const newPos = playerPos.add(movement);
```

### Entity Position Tracking

```js
// Get player position
const playerPos = new Pos3D(player.getPos());

// Calculate distance to a block position
const blockPos = new BlockPosHelper(200, 64, -100);
const blockPos3D = new Pos3D(blockPos.getX(), blockPos.getY(), blockPos.getZ());
const distance = playerPos.sub(blockPos3D);
const distanceMagnitude = Math.sqrt(distance.x * distance.x + distance.y * distance.y + distance.z * distance.z);

console.log(`Distance to block: ${distanceMagnitude} blocks`);
```

### Vector Operations

```js
// Create position vectors
const start = new Pos3D(0, 0, 0);
const end = new Pos3D(10, 20, 30);

// Create vector
const vector = end.toVector(start);
console.log(`Vector: (${vector.x2 - vector.x1}, ${vector.y2 - vector.y1}, ${vector.z2 - vector.z1})`);

// Direction vector
const direction = end.sub(start).scale(1 / distanceMagnitude);
console.log(`Direction: ${direction.x}, ${direction.y}, ${direction.z}`);
```

### Spatial Calculations

```js
// Calculate midpoint between two positions
const pos1 = new Pos3D(100, 64, 200);
const pos2 = new Pos3D(200, 80, 300);

const midpoint = pos1.add(pos2.sub(pos1).scale(0.5));
console.log(`Midpoint: ${midpoint.x}, ${midpoint.y}, ${midpoint.z}`);

// Check if position is within radius
const center = new Pos3D(150, 72, 250);
const checkPos = new Pos3D(160, 75, 260);
const distance = checkPos.sub(center);
const distanceSquared = distance.x * distance.x + distance.y * distance.y + distance.z * distance.z;
const radiusSquared = 25 * 25; // 25 block radius

if (distanceSquared <= radiusSquared) {
    console.log("Position is within radius!");
}
```

### Coordinate Conversions

```js
// Convert from entity position to block position
const entityPos = new Pos3D(player.getPos());
const blockPos = entityPos.toBlockPos();

console.log(`Entity at: ${entityPos.x}, ${entityPos.y}, ${entityPos.z}`);
console.log(`Block at: ${blockPos.getX()}, ${blockPos.getY()}, ${blockPos.getZ()}`);

// Convert to Minecraft's Vec3d for API calls
const mcVec = entityPos.toMojangDoubleVector();
// Use mcVec with Minecraft APIs that require Vec3d
```

### Advanced Mathematical Operations

```js
// Calculate angle between positions
function calculateAngle(from, to) {
    const delta = to.sub(from);
    const yaw = Math.atan2(delta.z, delta.x) * 180 / Math.PI;
    const pitch = Math.atan2(-delta.y, Math.sqrt(delta.x * delta.x + delta.z * delta.z)) * 180 / Math.PI;
    return { yaw, pitch };
}

const playerPos = new Pos3D(player.getPos());
const targetPos = new Pos3D(200, 65, 100);
const angle = calculateAngle(playerPos, targetPos);

console.log(`Yaw: ${angle.yaw}, Pitch: ${angle.pitch}`);

// Interpolate between positions
function lerp(start, end, t) {
    return start.add(end.sub(start).scale(t));
}

const interpolated = lerp(playerPos, targetPos, 0.5); // 50% between
```

## Important Notes

1. **Immutability**: All mathematical operations return new Pos3D instances rather than modifying the original object.

2. **Precision**: Pos3D uses double precision for all coordinates, making it suitable for precise calculations and entity positions.

3. **Coordinate System**:
   - X: East (+) / West (-)
   - Y: Up (+) / Down (-)
   - Z: South (+) / North (-)

4. **Performance**: Pos3D operations are lightweight and suitable for frequent calculations in loops.

5. **Block Conversion**: When converting to block positions using `toBlockPos()`, coordinates are floored (rounded down).

6. **Vector Operations**: The vector creation methods provide convenient ways to work with directional calculations.

7. **Inheritance**: Pos3D extends Pos2D, inheriting all 2D position functionality while adding Z-coordinate support.

8. **Thread Safety**: Pos3D instances are immutable and thus thread-safe.

## Related Classes

- `Pos2D`: Parent class providing 2D position functionality
- `Vec3D`: For working with 3D vectors and directions
- `BlockPosHelper`: For working with integer block positions
- `BaseHelper`: Base class for JSMacros helper functionality

## Version History

- **1.2.6**: Initial release with basic position operations
- **1.6.3**: Added scale method and enhanced coordinate operations
- **1.6.4**: Added comprehensive vector creation methods
- **1.8.0**: Added block position conversion methods
- **1.8.4**: Added subtraction, division operations and Minecraft Vec3d conversion