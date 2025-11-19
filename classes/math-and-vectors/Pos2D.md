# Pos2D

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.math`
**Since:** JsMacros 1.2.6

## Overview

The `Pos2D` class represents a 2D position or point in mathematical space with double-precision X and Y coordinates. This class provides essential mathematical operations for 2D positioning, including addition, subtraction, multiplication, division, and scaling. It's commonly used for screen coordinates, UI positioning, 2D geometry calculations, and vector operations in JSMacros scripts.

The class is designed to be immutable - all mathematical operations return new `Pos2D` instances rather than modifying the original object.

## Static Field

## Constructors

### `new Pos2D(x, y)`
Creates a new Pos2D instance with the specified coordinates.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| x | `double` | The X coordinate |
| y | `double` | The Y coordinate |

**Example:**
```js
const position = new Pos2D(100.5, 200.3);
const center = new Pos2D(0, 0);
```

## Properties

### `x` (public field)
The X coordinate of the position. Directly accessible as a public field.

### `y` (public field)
The Y coordinate of the position. Directly accessible as a public field.

**Example:**
```js
const pos = new Pos2D(10, 20);
console.log(`X: ${pos.x}, Y: ${pos.y}`); // "X: 10, Y: 20"
```

## Methods

### Coordinate Accessors

#### `getX()`
Returns the X coordinate of the position.

**Returns:** `double` - The X coordinate

#### `getY()`
Returns the Y coordinate of the position.

**Returns:** `double` - The Y coordinate

**Example:**
```js
const pos = new Pos2D(150.75, 300.25);
const x = pos.getX(); // 150.75
const y = pos.getY(); // 300.25
```

### Mathematical Operations

#### `add(pos)`
Adds another Pos2D to this position and returns a new Pos2D.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| pos | `Pos2D` | The position to add |

**Returns:** `Pos2D` - A new position with the sum of coordinates

#### `add(x, y)`
Adds the specified coordinate values to this position.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| x | `double` | The X value to add |
| y | `double` | The Y value to add |

**Returns:** `Pos2D` - A new position with the sum of coordinates

**Since:** 1.6.3

**Example:**
```js
const pos1 = new Pos2D(10, 20);
const pos2 = new Pos2D(5, 15);

// Add another position
const sum1 = pos1.add(pos2); // Pos2D(15, 35)

// Add coordinate values
const sum2 = pos1.add(5, 15); // Pos2D(15, 35)
```

#### `sub(pos)`
Subtracts another Pos2D from this position and returns a new Pos2D.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| pos | `Pos2D` | The position to subtract |

**Returns:** `Pos2D` - A new position with the difference of coordinates

#### `sub(x, y)`
Subtracts the specified coordinate values from this position.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| x | `double` | The X value to subtract |
| y | `double` | The Y value to subtract |

**Returns:** `Pos2D` - A new position with the difference of coordinates

**Since:** 1.8.4

**Example:**
```js
const pos1 = new Pos2D(20, 30);
const pos2 = new Pos2D(5, 10);

// Subtract another position
const diff1 = pos1.sub(pos2); // Pos2D(15, 20)

// Subtract coordinate values
const diff2 = pos1.sub(5, 10); // Pos2D(15, 20)
```

#### `multiply(pos)`
Multiplies this position by another Pos2D (component-wise multiplication).

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| pos | `Pos2D` | The position to multiply by |

**Returns:** `Pos2D` - A new position with the product of coordinates

#### `multiply(x, y)`
Multiplies this position by the specified coordinate values.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| x | `double` | The X value to multiply by |
| y | `double` | The Y value to multiply by |

**Returns:** `Pos2D` - A new position with the product of coordinates

**Since:** 1.6.3

**Example:**
```js
const pos = new Pos2D(3, 4);
const factor = new Pos2D(2, 3);

// Multiply by another position
const product1 = pos.multiply(factor); // Pos2D(6, 12)

// Multiply by coordinate values
const product2 = pos.multiply(2, 3); // Pos2D(6, 12)
```

#### `divide(pos)`
Divides this position by another Pos2D (component-wise division).

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| pos | `Pos2D` | The position to divide by |

**Returns:** `Pos2D` - A new position with the quotient of coordinates

#### `divide(x, y)`
Divides this position by the specified coordinate values.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| x | `double` | The X value to divide by |
| y | `double` | The Y value to divide by |

**Returns:** `Pos2D` - A new position with the quotient of coordinates

**Since:** 1.8.4

**Example:**
```js
const pos = new Pos2D(12, 18);
const divisor = new Pos2D(2, 3);

// Divide by another position
const quotient1 = pos.divide(divisor); // Pos2D(6, 6)

// Divide by coordinate values
const quotient2 = pos.divide(2, 3); // Pos2D(6, 6)
```

#### `scale(factor)`
Multiplies both coordinates by the same scaling factor.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| factor | `double` | The scaling factor |

**Returns:** `Pos2D` - A new scaled position

**Since:** 1.6.3

**Example:**
```js
const pos = new Pos2D(10, 20);
const scaled = pos.scale(2.5); // Pos2D(25, 50)
```

### Conversion Methods

#### `to3D()`
Converts this 2D position to a 3D position by setting Z to 0.

**Returns:** `Pos3D` - A new Pos3D with the same X and Y coordinates, Z = 0

**Example:**
```js
const pos2D = new Pos2D(100, 200);
const pos3D = pos2D.to3D(); // Pos3D(100, 200, 0)
```

#### `toVector()`
Creates a Vec2D from the origin (0, 0) to this position.

**Returns:** `Vec2D` - A vector from origin to this position

**Example:**
```js
const pos = new Pos2D(10, 20);
const vector = pos.toVector(); // Vec2D from (0, 0) to (10, 20)
```

#### `toVector(startPos)`
Creates a Vec2D from a starting position to this position.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| startPos | `Pos2D` | The starting position |

**Returns:** `Vec2D` - A vector from startPos to this position

**Since:** 1.6.4

**Example:**
```js
const start = new Pos2D(5, 10);
const end = new Pos2D(15, 25);
const vector = end.toVector(start); // Vec2D from (5, 10) to (15, 25)
```

#### `toVector(startX, startY)`
Creates a Vec2D from starting coordinates to this position.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| startX | `double` | The starting X coordinate |
| startY | `double` | The starting Y coordinate |

**Returns:** `Vec2D` - A vector from (startX, startY) to this position

**Since:** 1.6.4

**Example:**
```js
const pos = new Pos2D(15, 25);
const vector = pos.toVector(5, 10); // Vec2D from (5, 10) to (15, 25)
```

#### `toReverseVector()`
Creates a Vec2D from this position to the origin (0, 0).

**Returns:** `Vec2D` - A vector from this position to origin

**Since:** 1.6.4

**Example:**
```js
const pos = new Pos2D(10, 20);
const vector = pos.toReverseVector(); // Vec2D from (10, 20) to (0, 0)
```

#### `toReverseVector(endPos)`
Creates a Vec2D from this position to an ending position.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| endPos | `Pos2D` | The ending position |

**Returns:** `Vec2D` - A vector from this position to endPos

**Since:** 1.6.4

**Example:**
```js
const start = new Pos2D(5, 10);
const end = new Pos2D(15, 25);
const vector = start.toReverseVector(end); // Vec2D from (5, 10) to (15, 25)
```

#### `toReverseVector(endX, endY)`
Creates a Vec2D from this position to ending coordinates.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| endX | `double` | The ending X coordinate |
| endY | `double` | The ending Y coordinate |

**Returns:** `Vec2D` - A vector from this position to (endX, endY)

**Since:** 1.6.4

**Example:**
```js
const pos = new Pos2D(5, 10);
const vector = pos.toReverseVector(15, 25); // Vec2D from (5, 10) to (15, 25)
```

### Object Methods

#### `equals(obj)`
Compares this Pos2D with another object for equality.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| obj | `Object` | Object to compare with |

**Returns:** `boolean` - True if equal (same X and Y coordinates), false otherwise

**Example:**
```js
const pos1 = new Pos2D(10, 20);
const pos2 = new Pos2D(10, 20);
const pos3 = new Pos2D(15, 20);

console.log(pos1.equals(pos2)); // true
console.log(pos1.equals(pos3)); // false
```

#### `hashCode()`
Returns the hash code for this position.

**Returns:** `int` - Hash code value

#### `toString()`
Returns a string representation of this position.

**Returns:** `String` - String in format: "x.xxxxxx, y.yyyyyy"

**Example:**
```js
const pos = new Pos2D(10.5, 20.3);
console.log(pos.toString()); // "10.500000, 20.300000"
```

#### `compareTo(other)`
Compares this Pos2D with another position lexicographically (first by X, then by Y).

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| other | `Pos2D` | The position to compare with |

**Returns:** `int` - -1 if this position is less, 0 if equal, 1 if greater

**Example:**
```js
const pos1 = new Pos2D(10, 20);
const pos2 = new Pos2D(15, 25);
const pos3 = new Pos2D(10, 30);

console.log(pos1.compareTo(pos2)); // -1 (10 < 15)
console.log(pos2.compareTo(pos1)); // 1 (15 > 10)
console.log(pos1.compareTo(pos3)); // -1 (same X, but 20 < 30)
```

## Usage Examples

### Basic Position Operations

```javascript
// Create positions
const playerPos = new Pos2D(100.5, 200.3);
const targetPos = new Pos2D(150.75, 250.8);

// Access coordinates
console.log(`Player at: (${playerPos.getX()}, ${playerPos.getY()})`);

// Calculate offset
const offset = targetPos.sub(playerPos);
console.log(`Offset: ${offset.x}, ${offset.y}`);

// Move player by offset
const newPos = playerPos.add(offset);
console.log(`New position: ${newPos.toString()}`);
```

### Screen and UI Coordinates

```javascript
// Get screen dimensions (example)
const screenWidth = 1920;
const screenHeight = 1080;

// Define UI elements
const buttonPos = new Pos2D(100, 50);
const windowSize = new Pos2D(400, 300);

// Center window on screen
const centeredPos = new Pos2D(
    (screenWidth - windowSize.x) / 2,
    (screenHeight - windowSize.y) / 2
);

// Scale UI for different resolutions
const scaleFactor = screenWidth / 1920; // Base resolution
const scaledButtonPos = buttonPos.scale(scaleFactor);
```

### Mathematical Transformations

```javascript
const original = new Pos2D(10, 20);

// Translation
const translated = original.add(5, -10); // Pos2D(15, 10)

// Scaling
const scaledUp = original.scale(2); // Pos2D(20, 40)
const scaledDown = original.scale(0.5); // Pos2D(5, 10)

// Component-wise operations
const stretched = original.multiply(2, 1.5); // Pos2D(20, 30)
const compressed = original.divide(2, 4); // Pos2D(5, 5)

// Complex transformation
const transformed = original
    .scale(1.5) // Scale up
    .add(10, 5) // Translate
    .multiply(2, 0.5); // Stretch in X, compress in Y
```

### Vector Operations

```javascript
const startPoint = new Pos2D(10, 10);
const endPoint = new Pos2D(30, 40);

// Create vectors
const forwardVector = startPoint.toVector(endPoint);
const reverseVector = startPoint.toReverseVector(endPoint);

console.log(`Forward vector: ${forwardVector.getDeltaX()}, ${forwardVector.getDeltaY()}`);
console.log(`Reverse vector: ${reverseVector.getDeltaX()}, ${reverseVector.getDeltaY()}`);

// Create vector from origin
const fromOrigin = endPoint.toVector();
console.log(`From origin: ${fromOrigin.x1}, ${fromOrigin.y1} to ${fromOrigin.x2}, ${fromOrigin.y2}`);
```

### 2D Collision Detection

```javascript
// Rectangle collision using Pos2D
function checkCollision(pos1, size1, pos2, size2) {
    return pos1.x < pos2.x + size2.x &&
           pos1.x + size1.x > pos2.x &&
           pos1.y < pos2.y + size2.y &&
           pos1.y + size1.y > pos2.y;
}

const playerPos = new Pos2D(100, 100);
const playerSize = new Pos2D(32, 32);

const obstaclePos = new Pos2D(120, 110);
const obstacleSize = new Pos2D(40, 40);

if (checkCollision(playerPos, playerSize, obstaclePos, obstacleSize)) {
    console.log("Collision detected!");

    // Calculate separation vector
    const center1 = playerPos.add(playerSize.divide(2, 2));
    const center2 = obstaclePos.add(obstacleSize.divide(2, 2));
    const separation = center2.sub(center1);

    console.log(`Separation needed: ${separation.x}, ${separation.y}`);
}
```

### Animation and Interpolation

```javascript
// Linear interpolation between two positions
function lerp(start, end, t) {
    return start.add(end.sub(start).scale(t));
}

const startPos = new Pos2D(0, 0);
const endPos = new Pos2D(100, 200);

// Animate over 60 frames
for (let frame = 0; frame <= 60; frame++) {
    const t = frame / 60; // 0 to 1
    const currentPos = lerp(startPos, endPos, t);

    console.log(`Frame ${frame}: Position ${currentPos.toString()}`);
}
```

## Important Notes

1. **Immutability**: All mathematical operations return new `Pos2D` instances rather than modifying the original object.

2. **Double Precision**: The class uses `double` precision for coordinates, allowing for fractional values useful for sub-pixel positioning and precise mathematical calculations.

3. **Public Fields**: X and Y coordinates are accessible directly as public fields for convenience, but getter methods are also available.

4. **Component-wise Operations**: Mathematical operations like `multiply()` and `divide()` work component-wise (X with X, Y with Y), not as vector operations.

5. **Vector Creation**: The `toVector()` methods create `Vec2D` objects which represent directed line segments between two points, useful for direction and magnitude calculations.

6. **Comparison**: The `compareTo()` method provides lexicographic ordering (X first, then Y), useful for sorting positions.

## Related Classes

- `Pos3D`: 3D position class that extends Pos2D
- `Vec2D`: 2D vector class for direction and magnitude calculations
- `BlockPosHelper`: Helper for block positions with integer coordinates

## Version History

- **1.2.6**: Initial release with basic position operations and vector creation
- **1.6.3**: Added coordinate-specific add/multiply methods and scale operation
- **1.6.4**: Enhanced vector creation methods with custom start/end positions
- **1.8.4**: Added subtract and divide methods for complete mathematical operations