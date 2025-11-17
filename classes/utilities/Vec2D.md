# Vec2D

Represents a 2D vector between two points in 2D space. Useful for mathematical calculations involving direction, distance, and movement in 2D coordinate systems.

## Constructor

```javascript
new Vec2D(x1, y1, x2, y2)
```

**Parameters:**
- `x1` (number): X coordinate of the start point
- `y1` (number): Y coordinate of the start point
- `x2` (number): X coordinate of the end point
- `y2` (number): Y coordinate of the end point

**Alternative Constructor:**
```javascript
new Vec2D(startPos, endPos)
```

**Parameters:**
- `startPos` (Pos2D): Start position
- `endPos` (Pos2D): End position

## Properties

| Property | Type | Description |
|----------|------|-------------|
| x1 | number | X coordinate of the start point |
| y1 | number | Y coordinate of the start point |
| x2 | number | X coordinate of the end point |
| y2 | number | Y coordinate of the end point |

## Methods

### Position Accessors

#### getX1()
Returns the X coordinate of the start point.

```javascript
let x1 = vector.getX1();
```

#### getY1()
Returns the Y coordinate of the start point.

```javascript
let y1 = vector.getY1();
```

#### getX2()
Returns the X coordinate of the end point.

```javascript
let x2 = vector.getX2();
```

#### getY2()
Returns the Y coordinate of the end point.

```javascript
let y2 = vector.getY2();
```

#### getStart()
Returns the start position as a Pos2D object.

```javascript
let startPos = vector.getStart();
```

#### getEnd()
Returns the end position as a Pos2D object.

```javascript
let endPos = vector.getEnd();
```

### Vector Properties

#### getDeltaX()
Returns the difference in X coordinates (x2 - x1).

```javascript
let deltaX = vector.getDeltaX();
```

#### getDeltaY()
Returns the difference in Y coordinates (y2 - y1).

```javascript
let deltaY = vector.getDeltaY();
```

#### getMagnitude()
Returns the length/magnitude of the vector.

```javascript
let length = vector.getMagnitude();
```

#### getMagnitudeSq()
Returns the squared magnitude of the vector (faster than getMagnitude() for comparisons).

```javascript
let lengthSquared = vector.getMagnitudeSq();
```

### Vector Operations

#### add(vector)
Adds another vector to this vector and returns a new Vec2D.

```javascript
let newVector = vector.add(otherVector);
```

#### add(x1, y1, x2, y2)
Adds coordinate values to this vector and returns a new Vec2D.

```javascript
let newVector = vector.add(1, 2, 3, 4);
```

#### multiply(vector)
Multiplies this vector by another vector and returns a new Vec2D.

```javascript
let newVector = vector.multiply(otherVector);
```

#### multiply(x1, y1, x2, y2)
Multiplies this vector by coordinate values and returns a new Vec2D.

```javascript
let newVector = vector.multiply(2, 2, 2, 2);
```

#### scale(factor)
Scales the vector by a factor and returns a new Vec2D.

```javascript
let scaledVector = vector.scale(2.5);
```

#### normalize()
Returns a new Vec2D with the same direction but magnitude of 1.

```javascript
let normalizedVector = vector.normalize();
```

#### reverse()
Returns a new Vec2D with reversed direction.

```javascript
let reversedVector = vector.reverse();
```

#### dotProduct(vector)
Calculates the dot product with another vector.

```javascript
let dotProduct = vector.dotProduct(otherVector);
```

### Conversions

#### to3D()
Converts the 2D vector to a 3D vector with Z coordinates of 0.

```javascript
let vec3D = vector.to3D();
```

## Examples

### Basic Vector Creation and Operations

```javascript
// Create a vector from (0, 0) to (10, 5)
let vector = new Vec2D(0, 0, 10, 5);

// Get vector properties
console.log(`Delta X: ${vector.getDeltaX()}`); // 10
console.log(`Delta Y: ${vector.getDeltaY()}`); // 5
console.log(`Magnitude: ${vector.getMagnitude()}`); // 11.180...

// Scale the vector
let scaled = vector.scale(2); // Now goes from (0,0) to (20,10)
console.log(`Scaled magnitude: ${scaled.getMagnitude()}`); // 22.360...

// Normalize the vector
let normalized = vector.normalize();
console.log(`Normalized magnitude: ${normalized.getMagnitude()}`); // 1.0
```

### Direction and Movement

```javascript
// Calculate direction from player to a point
let playerPos = Player.getPlayer().getPos();
let targetPos = new Pos2D(100, 200);
let directionVector = playerPos.toVector(targetPos);

// Normalize to get direction only
let direction = directionVector.normalize();
console.log(`Direction vector: ${direction}`);

// Calculate distance
let distance = directionVector.getMagnitude();
console.log(`Distance to target: ${distance} blocks`);

// Calculate movement vector for stepping towards target
let stepSize = 1.0;
let stepVector = direction.scale(stepSize);
```

### Vector Math for Collision Detection

```javascript
// Check if two movement vectors are going in similar directions
let playerMovement = new Vec2D(0, 0, 1, 0); // Moving east
let enemyMovement = new Vec2D(0, 0, 0.9, 0.1); // Moving mostly east

let dotProduct = playerMovement.dotProduct(enemyMovement.normalize());
if (dotProduct > 0.7) {
    console.log("Movements are in similar direction");
}
```

### Path Finding

```javascript
// Calculate vector between waypoints
let waypoints = [
    new Pos2D(0, 0),
    new Pos2D(10, 0),
    new Pos2D(10, 10),
    new Pos2D(0, 10)
];

for (let i = 0; i < waypoints.length - 1; i++) {
    let pathVector = new Vec2D(waypoints[i], waypoints[i + 1]);
    console.log(`Path segment ${i + 1}: length=${pathVector.getMagnitude()}`);

    // Add some smoothing by normalizing and rescaling
    let smoothed = pathVector.normalize().scale(pathVector.getMagnitude() * 0.9);
}
```

## Integration with Other Classes

Vec2D integrates seamlessly with:
- **Pos2D**: For position-based vector creation
- **Vec3D**: For 2D to 3D conversion
- **Drawing**: For creating lines and directional indicators
- **Movement**: For calculating player movement and trajectories

## Performance Notes

- Use `getMagnitudeSq()` instead of `getMagnitude()` when only comparing distances
- Cache normalized vectors if used repeatedly
- Vector operations return new instances, use chaining wisely

## See Also

- [Pos2D](Pos2D.md) - 2D position class
- [Vec3D](Vec3D.md) - 3D vector class
- [Line](Line.md) - 2D line drawing component