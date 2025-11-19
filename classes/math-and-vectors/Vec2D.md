# Vec2D

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.math.Vec2D`

**Extends:** `Object`

**Since:** JsMacros 1.2.6

The `Vec2D` class represents a 2D vector defined by two points in 2D space - a start point (x1, y1) and an end point (x2, y2). This class provides comprehensive mathematical operations for vector manipulation, including addition, multiplication, scaling, dot product calculation, magnitude computation, and normalization. It's commonly used for 2D mathematical calculations, physics simulations, direction calculations, and spatial reasoning in scripts.

## Overview

The `Vec2D` class provides essential 2D vector mathematics functionality:

- **Vector Representation:** Defined by start and end points for precise spatial relationships
- **Mathematical Operations:** Addition, multiplication, scaling, and dot product calculations
- **Magnitude Operations:** Calculate vector length and squared magnitude for performance
- **Direction Operations:** Reverse vectors and normalize to unit vectors
- **Conversion Support:** Convert to 3D vectors and string representations
- **Comparison Support:** Full equality, hashing, and comparison capabilities

## Constructors

### `new Vec2D(x1, y1, x2, y2)`
Creates a new Vec2D with specified start and end coordinates.

**Parameters:**
- `x1` (double): X coordinate of the start point
- `y1` (double): Y coordinate of the start point
- `x2` (double): X coordinate of the end point
- `y2` (double): Y coordinate of the end point

**Example:**
```javascript
// Create a vector from (0, 0) to (10, 10)
const vector = new Vec2D(0, 0, 10, 10);
```

### `new Vec2D(start, end)`
Creates a new Vec2D from two Pos2D points.

**Parameters:**
- `start` (Pos2D): Starting position of the vector
- `end` (Pos2D): Ending position of the vector

**Example:**
```javascript
const startPoint = new Pos2D(5, 5);
const endPoint = new Pos2D(15, 20);
const vector = new Vec2D(startPoint, endPoint);
```

## Fields

## Methods

## Usage Examples

### Example 1: Basic Vector Operations
```javascript
// Create vectors for player movement
const playerPos = new Pos2D(100, 200);
const targetPos = new Pos2D(150, 250);
const movementVector = new Vec2D(playerPos, targetPos);

Chat.log(`Movement distance: ${movementVector.getMagnitude()}`);
Chat.log(`Movement delta: (${movementVector.getDeltaX()}, ${movementVector.getDeltaY()})`);
```

### Example 2: Vector Addition and Scaling
```javascript
// Calculate cumulative movement
const movement1 = new Vec2D(0, 0, 5, 3);
const movement2 = new Vec2D(0, 0, 2, 4);
const totalMovement = movement1.add(movement2);

// Scale movement for speed boost
const boostedMovement = totalMovement.scale(1.5);
Chat.log(`Boosted movement: ${boostedMovement.toString()}`);
```

### Example 3: Direction and Distance Calculations
```javascript
// Calculate direction from player to enemy
const playerVector = new Vec2D(50, 50, 60, 55); // Player at (60, 55)
const enemyVector = new Vec2D(100, 100, 110, 105); // Enemy at (110, 105)

const directionVector = new Vec2D(
    playerVector.getX2(), playerVector.getY2(),
    enemyVector.getX2(), enemyVector.getY2()
);

const distance = directionVector.getMagnitude();
const normalizedDirection = directionVector.normalize();

Chat.log(`Distance to enemy: ${distance}`);
Chat.log(`Normalized direction: ${normalizedDirection.toString()}`);
```

### Example 4: Dot Product for Angle Detection
```javascript
// Check if player is facing target
const facingDirection = new Vec2D(0, 0, 1, 0); // Facing right
const toTarget = new Vec2D(0, 0, 0.707, 0.707); // 45-degree angle

const dotProduct = facingDirection.dotProduct(toTarget);

if (dotProduct > 0.5) {
    Chat.log("Target is in front of player");
} else {
    Chat.log("Target is to the side or behind player");
}
```

### Example 5: Vector Collision Detection
```javascript
// Simple distance-based collision detection
const player = new Vec2D(0, 0, 10, 10);
const enemy = new Vec2D(15, 15, 25, 25);

const distance = new Vec2D(
    player.getX2(), player.getY2(),
    enemy.getX2(), enemy.getY2()
).getMagnitude();

if (distance < 20) {
    Chat.log("Enemy is within detection range!");
}
```

### Example 6: Projectile Trajectory
```javascript
// Calculate projectile velocity vector
const startPos = new Pos2D(0, 0);
const targetPos = new Pos2D(100, 50);
const direction = new Vec2D(startPos, targetPos);

// Normalize and scale for desired projectile speed
const velocity = direction.normalize().scale(10);

Chat.log(`Projectile velocity: ${velocity.toString()}`);
Chat.log(`Projectile speed: ${velocity.getMagnitude()}`);
```

### Example 7: Vector Field Visualization
```javascript
// Create a grid of vectors for visualization
for (let x = 0; x < 50; x += 10) {
    for (let y = 0; y < 50; y += 10) {
        // Create vectors pointing away from center
        const center = new Pos2D(25, 25);
        const current = new Pos2D(x, y);
        const vector = new Vec2D(center, current).normalize().scale(5);

        // Create vector from current position
        const fieldVector = new Vec2D(current,
            new Pos2D(x + vector.getDeltaX(), y + vector.getDeltaY()));

        Chat.log(`Field vector at (${x}, ${y}): ${fieldVector.toString()}`);
    }
}
```

### Example 8: Physics Simulation
```javascript
// Simple velocity and acceleration simulation
let position = new Pos2D(0, 0);
let velocity = new Vec2D(0, 0, 2, 1); // Moving right and slightly up
let acceleration = new Vec2D(0, 0, 0.1, -0.05); // Gravity effect

// Simulate 10 time steps
for (let i = 0; i < 10; i++) {
    // Update velocity with acceleration
    velocity = velocity.add(acceleration);

    // Update position with velocity
    position = position.add(new Pos2D(velocity.getDeltaX(), velocity.getDeltaY()));

    Chat.log(`Step ${i}: Position (${position.x.toFixed(2)}, ${position.y.toFixed(2)})`);
}
```

## Mathematical Background

### Vector Components
A 2D vector in this class is represented by:
- **Start Point:** (x₁, y₁)
- **End Point:** (x₂, y₂)
- **Delta Components:** Δx = x₂ - x₁, Δy = y₂ - y₁

### Magnitude Calculation
The magnitude (length) is calculated using the Pythagorean theorem:
```
|v| = √(Δx² + Δy²)
```

### Dot Product
The dot product is calculated as:
```
v₁ · v₂ = Δx₁ × Δx₂ + Δy₁ × Δy₂
```

The dot product has important geometric properties:
- If v₁ · v₂ > 0: vectors point in similar directions (angle < 90°)
- If v₁ · v₂ = 0: vectors are perpendicular (angle = 90°)
- If v₁ · v₂ < 0: vectors point in opposite directions (angle > 90°)

### Normalization
Vector normalization converts any non-zero vector to a unit vector:
```
v_normalized = v / |v|
```

## Performance Considerations

1. **Magnitude Squared:** Use `getMagnitudeSq()` instead of `getMagnitude()` when comparing distances, as it avoids the costly square root operation.

2. **Object Creation:** Most operations return new Vec2D instances. For performance-critical code, consider reusing objects when possible.

3. **Double Precision:** All calculations use double-precision floating-point numbers for accuracy.

## Common Pitfalls

1. **Zero Vectors:** Attempting to normalize a zero-length vector will cause division by zero. Always check magnitude before normalizing.

2. **Floating-Point Precision:** Due to floating-point arithmetic, exact comparisons may not work as expected. Use epsilon comparisons for approximate equality.

3. **Vector vs Point:** Remember that this class represents a directed line segment (vector), not just a point. The direction and magnitude matter for most operations.

## Related Classes

- `Pos2D` - 2D position class, used for vector start/end points
- `Vec3D` - 3D vector class for three-dimensional calculations
- `Pos3D` - 3D position class

## Version History

- **1.2.6:** Initial release with basic vector operations
- **1.6.3:** Added `add(double, double, double, double)`, `multiply(double, double, double, double)`, and `scale(double)` methods
- **1.6.4:** Added vector conversion methods to Pos2D class
- **1.6.5:** Added `getMagnitudeSq()` and `normalize()` methods
- **Current:** Enhanced with comprehensive mathematical operations and comparison support