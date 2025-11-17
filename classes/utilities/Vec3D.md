# Vec3D

Represents a 3D vector between two points in 3D space. Extends Vec2D with Z-coordinate support and additional 3D-specific operations. Essential for 3D mathematical calculations, movement trajectories, and spatial reasoning.

## Constructor

```javascript
new Vec3D(x1, y1, z1, x2, y2, z2)
```

**Parameters:**
- `x1` (number): X coordinate of the start point
- `y1` (number): Y coordinate of the start point
- `z1` (number): Z coordinate of the start point
- `x2` (number): X coordinate of the end point
- `y2` (number): Y coordinate of the end point
- `z2` (number): Z coordinate of the end point

**Alternative Constructor:**
```javascript
new Vec3D(startPos, endPos)
```

**Parameters:**
- `startPos` (Pos3D): Start position
- `endPos` (Pos3D): End position

## Properties

| Property | Type | Description |
|----------|------|-------------|
| x1 | number | X coordinate of the start point |
| y1 | number | Y coordinate of the start point |
| z1 | number | Z coordinate of the start point |
| x2 | number | X coordinate of the end point |
| y2 | number | Y coordinate of the end point |
| z2 | number | Z coordinate of the end point |

## Methods

### Position Accessors

#### getZ1()
Returns the Z coordinate of the start point.

```javascript
let z1 = vector.getZ1();
```

#### getZ2()
Returns the Z coordinate of the end point.

```javascript
let z2 = vector.getZ2();
```

#### getDeltaZ()
Returns the difference in Z coordinates (z2 - z1).

```javascript
let deltaZ = vector.getDeltaZ();
```

#### getStart()
Returns the start position as a Pos3D object.

```javascript
let startPos = vector.getStart();
```

#### getEnd()
Returns the end position as a Pos3D object.

```javascript
let endPos = vector.getEnd();
```

### Vector Properties

#### getMagnitude()
Returns the length/magnitude of the 3D vector.

```javascript
let length = vector.getMagnitude();
```

#### getMagnitudeSq()
Returns the squared magnitude of the vector (faster for comparisons).

```javascript
let lengthSquared = vector.getMagnitudeSq();
```

#### getPitch()
Returns the pitch angle of the vector (vertical angle in degrees).

```javascript
let pitch = vector.getPitch(); // -90 to 90 degrees
```

#### getYaw()
Returns the yaw angle of the vector (horizontal angle in degrees).

```javascript
let yaw = vector.getYaw(); // -180 to 180 degrees
```

### Vector Operations

#### add(vector)
Adds another Vec3D to this vector and returns a new Vec3D.

```javascript
let newVector = vector.add(otherVector);
```

#### add(x1, y1, z1, x2, y2, z2)
Adds coordinate values to this vector and returns a new Vec3D.

```javascript
let newVector = vector.add(1, 2, 3, 4, 5, 6);
```

#### addStart(pos)
Adds a Pos3D to the start point only and returns a new Vec3D.

```javascript
let newVector = vector.addStart(new Pos3D(1, 2, 3));
```

#### addEnd(pos)
Adds a Pos3D to the end point only and returns a new Vec3D.

```javascript
let newVector = vector.addEnd(new Pos3D(1, 2, 3));
```

#### multiply(vector)
Multiplies this vector by another Vec3D and returns a new Vec3D.

```javascript
let newVector = vector.multiply(otherVector);
```

#### multiply(x1, y1, z1, x2, y2, z2)
Multiplies this vector by coordinate values and returns a new Vec3D.

```javascript
let newVector = vector.multiply(2, 2, 2, 2, 2, 2);
```

#### scale(factor)
Scales the vector by a factor and returns a new Vec3D.

```javascript
let scaledVector = vector.scale(2.5);
```

#### normalize()
Returns a new Vec3D with the same direction but magnitude of 1.

```javascript
let normalizedVector = vector.normalize();
```

#### reverse()
Returns a new Vec3D with reversed direction.

```javascript
let reversedVector = vector.reverse();
```

#### dotProduct(vector)
Calculates the dot product with another Vec3D.

```javascript
let dotProduct = vector.dotProduct(otherVector);
```

#### crossProduct(vector)
Calculates the cross product with another Vec3D.

```javascript
let crossProduct = vector.crossProduct(otherVector);
```

### Conversions

#### toMojangFloatVector()
Converts to a Minecraft JOML Vector3f for use with native Minecraft methods.

```javascript
let mojangVector = vector.toMojangFloatVector();
```

## Examples

### Basic 3D Vector Operations

```javascript
// Create a vector from player position to a target position
let playerPos = Player.getPlayer().getEyePos();
let targetPos = new Pos3D(100, 64, 200);
let directionVector = new Vec3D(playerPos, targetPos);

// Get vector properties
console.log(`Distance: ${directionVector.getMagnitude()}`);
console.log(`Pitch: ${directionVector.getPitch()}°`);
console.log(`Yaw: ${directionVector.getYaw()}°`);

// Normalize for pure direction
let direction = directionVector.normalize();
```

### Player Aiming and Rotation

```javascript
// Calculate look direction to target a specific block
let player = Player.getPlayer();
let targetBlock = World.getBlockAt(100, 70, 100);
let playerEyePos = player.getEyePos();

let aimVector = new Vec3D(playerEyePos, targetBlock.getPos().toCenterPos());

// Get the angles needed to look at the target
let neededPitch = aimVector.getPitch();
let neededYaw = aimVector.getYaw();

// Rotate player to face target
player.lookAt(neededYaw, neededPitch);
```

### Projectile Trajectory Calculation

```javascript
// Calculate trajectory for projectile
let shooterPos = Player.getPlayer().getEyePos();
let targetPos = new Pos3D(50, 60, 50);
let trajectory = new Vec3D(shooterPos, targetPos);

// Calculate initial velocity (simplified)
let projectileSpeed = 20.0;
let velocity = trajectory.normalize().scale(projectileSpeed);

// Add some arc to the trajectory
let arcHeight = 5.0;
let arcVelocity = new Vec3D(0, arcHeight, 0);
let finalVelocity = velocity.add(arcVelocity);
```

### Distance-Based Targeting

```javascript
// Find closest entity to player
let player = Player.getPlayer();
let playerPos = player.getPos();
let closestEntity = null;
let closestDistance = Infinity;

World.getEntities().forEach(entity => {
    if (entity === player) return;

    let entityPos = entity.getPos();
    let distance = new Vec3D(playerPos, entityPos).getMagnitude();

    if (distance < closestDistance) {
        closestDistance = distance;
        closestEntity = entity;
    }
});

console.log(`Closest entity is ${closestDistance} blocks away`);
```

### 3D Movement Patterns

```javascript
// Create circular movement pattern around a center point
let center = new Pos3D(0, 64, 0);
let radius = 10;
let height = 65;

for (let angle = 0; angle < 360; angle += 30) {
    let radians = angle * Math.PI / 180;
    let x = center.x + radius * Math.cos(radians);
    let z = center.z + radius * Math.sin(radians);
    let point = new Pos3D(x, height, z);

    let moveVector = new Vec3D(center, point);
    console.log(`Angle ${angle}°: Position (${x}, ${height}, ${z})`);
}
```

### Collision Detection

```javascript
// Check if two entities are moving towards each other
let entity1 = World.getEntityByID(1);
let entity2 = World.getEntityByID(2);

let entity1Movement = entity1.getVelocity();
let entity2Movement = entity2.getVelocity();

let relativeMovement = new Vec3D(
    0, 0, 0,
    entity1Movement.x - entity2Movement.x,
    entity1Movement.y - entity2Movement.y,
    entity1Movement.z - entity2Movement.z
);

let collisionVector = new Vec3D(entity1.getPos(), entity2.getPos());
let dotProduct = collisionVector.dotProduct(relativeMovement);

if (dotProduct < 0) {
    console.log("Entities are moving towards each other");
}
```

### 3D Geometry Calculations

```javascript
// Calculate the angle between two vectors
let vector1 = new Vec3D(0, 0, 0, 1, 0, 0); // East
let vector2 = new Vec3D(0, 0, 0, 0, 1, 0); // North

let normalized1 = vector1.normalize();
let normalized2 = vector2.normalize();

let dotProduct = normalized1.dotProduct(normalized2);
let angle = Math.acos(dotProduct) * 180 / Math.PI;
console.log(`Angle between vectors: ${angle}°`); // 90°

// Calculate perpendicular direction using cross product
let east = new Vec3D(0, 0, 0, 1, 0, 0);
let up = new Vec3D(0, 0, 0, 0, 1, 0);
let north = east.crossProduct(up); // Should point north
```

### Advanced Spacial Reasoning

```javascript
// Calculate if player is in front of or behind another entity
let player = Player.getPlayer();
let target = World.getEntityByID(5);

let targetPos = target.getPos();
let playerPos = player.getPos();

let targetLookVector = new Vec3D(targetPos, target.getEyeVector().add(targetPos));
let toPlayerVector = new Vec3D(targetPos, playerPos);

let dotProduct = targetLookVector.dotProduct(toPlayerVector);
if (dotProduct > 0) {
    console.log("Player is in front of target");
} else {
    console.log("Player is behind target");
}

// Calculate the perpendicular distance to a line
let lineStart = new Pos3D(0, 64, 0);
let lineEnd = new Pos3D(100, 64, 0);
let point = new Pos3D(50, 64, 50);

let lineVector = new Vec3D(lineStart, lineEnd);
let toPointVector = new Vec3D(lineStart, point);

let projection = lineVector.normalize().scale(
    lineVector.normalize().dotProduct(toPointVector)
);

let perpendicularDistance = toPointVector.add(projection.reverse()).getMagnitude();
console.log(`Perpendicular distance: ${perpendicularDistance}`);
```

## Integration with Other Classes

Vec3D integrates seamlessly with:
- **Pos3D**: For 3D position-based vector creation
- **Vec2D**: For 2D to 3D conversion and basic vector operations
- **Box**: For 3D bounding box calculations
- **WorldScanner**: For spatial queries and area calculations
- **Draw3D**: For 3D visual elements and indicators

## Performance Notes

- Use `getMagnitudeSq()` for distance comparisons to avoid expensive square root operations
- Cross products are computationally expensive, use sparingly
- Normalize vectors once and reuse if needed multiple times
- Vector operations create new instances, be mindful of memory usage

## See Also

- [Pos3D](Pos3D.md) - 3D position class
- [Vec2D](Vec2D.md) - 2D vector class
- [Box](Box.md) - 3D bounding box class
- [Draw3D](Draw3D.md) - 3D drawing operations