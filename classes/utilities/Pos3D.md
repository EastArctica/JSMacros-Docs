# Pos3D

Represents a 3D position/point in 3D space. Extends Pos2D with Z-coordinate support. Essential for world coordinates, entity positions, and 3D spatial calculations. Provides seamless integration with Minecraft's coordinate system.

## Constructor

```javascript
new Pos3D(x, y, z)
```

**Parameters:**
- `x` (number): X coordinate (East-West, + is East)
- `y` (number): Y coordinate (Up-Down, + is Up)
- `z` (number): Z coordinate (North-South, + is South)

**Alternative Constructor from Vec3d:**
```javascript
new Pos3D(vec3d)
```

**Parameters:**
- `vec3d` (Vec3d): Minecraft Vec3d object

## Constants

### ZERO
Static constant representing position (0, 0, 0).

```javascript
let origin = Pos3D.ZERO;
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| x | number | X coordinate (East-West) |
| y | number | Y coordinate (Up-Down) |
| z | number | Z coordinate (North-South) |

## Methods

### Coordinate Accessors

#### getZ()
Returns the Z coordinate.

```javascript
let z = position.getZ();
```

### Arithmetic Operations

#### add(position)
Adds another Pos3D and returns a new Pos3D.

```javascript
let newPosition = position.add(otherPosition);
```

#### add(x, y, z)
Adds coordinate values and returns a new Pos3D.

```javascript
let newPosition = position.add(10, 5, 3);
```

#### sub(position)
Subtracts another Pos3D and returns a new Pos3D.

```javascript
let newPosition = position.sub(otherPosition);
```

#### sub(x, y, z)
Subtracts coordinate values and returns a new Pos3D.

```javascript
let newPosition = position.sub(10, 5, 3);
```

#### multiply(position)
Multiplies coordinates with another Pos3D and returns a new Pos3D.

```javascript
let newPosition = position.multiply(otherPosition);
```

#### multiply(x, y, z)
Multiplies coordinates with values and returns a new Pos3D.

```javascript
let newPosition = position.multiply(2, 3, 4);
```

#### divide(position)
Divides coordinates by another Pos3D and returns a new Pos3D.

```javascript
let newPosition = position.divide(otherPosition);
```

#### divide(x, y, z)
Divides coordinates by values and returns a new Pos3D.

```javascript
let newPosition = position.divide(2, 3, 4);
```

#### scale(factor)
Multiplies all coordinates by a factor and returns a new Pos3D.

```javascript
let scaledPosition = position.scale(2.5);
```

### Vector Operations

#### toVector()
Creates a Vec3D from origin (0, 0, 0) to this position.

```javascript
let vector = position.toVector();
```

#### toVector(startPos)
Creates a Vec3D from start position to this position.

```javascript
let vector = position.toVector(startPosition);
```

#### toVector(startX, startY, startZ)
Creates a Vec3D from start coordinates to this position.

```javascript
let vector = position.toVector(10, 20, 30);
```

#### toReverseVector()
Creates a Vec3D from this position to origin (0, 0, 0).

```javascript
let vector = position.toReverseVector();
```

#### toReverseVector(endPos)
Creates a Vec3D from this position to end position.

```javascript
let vector = position.toReverseVector(endPosition);
```

#### toReverseVector(endX, endY, endZ)
Creates a Vec3D from this position to end coordinates.

```javascript
let vector = position.toReverseVector(100, 200, 300);
```

### Conversions

#### to3D()
Returns this position (inherited from Pos2D).

```javascript
let pos3D = position.to3D();
```

#### toBlockPos()
Converts to a BlockPosHelper for block operations.

```javascript
let blockPos = position.toBlockPos();
```

#### toRawBlockPos()
Converts to a Minecraft BlockPos object.

```javascript
let rawBlockPos = position.toRawBlockPos();
```

#### toMojangDoubleVector()
Converts to a Minecraft Vec3d object for use with native methods.

```javascript
let mojangVector = position.toMojangDoubleVector();
```

## Examples

### Basic 3D Position Operations

```javascript
// Create positions
let pos1 = new Pos3D(100, 64, 200);
let pos2 = new Pos3D(150, 70, 250);

// Access coordinates
console.log(`Position: (${pos1.getX()}, ${pos1.getY()}, ${pos1.getZ()})`);

// Perform arithmetic operations
let sum = pos1.add(pos2);        // (250, 134, 450)
let difference = pos2.sub(pos1); // (50, 6, 50)
let scaled = pos1.scale(2);      // (200, 128, 400)

console.log(`Sum: (${sum.getX()}, ${sum.getY()}, ${sum.getZ()})`);
console.log(`Difference: (${difference.getX()}, ${difference.getY()}, ${difference.getZ()})`);
```

### Player Position and Movement

```javascript
// Get player's current position
let player = Player.getPlayer();
let playerPos = player.getPos();
let eyePos = player.getEyePos();

// Calculate movement vectors
let movement = playerPos.toVector(eyePos);
console.log(`Player height: ${movement.getDeltaY()}`);

// Find position 5 blocks in front of player
let lookDirection = player.getLookVector();
let frontPos = playerPos.add(
    lookDirection.x * 5,
    lookDirection.y * 5,
    lookDirection.z * 5
);

// Check if front position is safe
let blockAtFront = World.getBlockAt(frontPos.toBlockPos());
if (blockAtFront.isAir()) {
    console.log("Safe to move forward");
}
```

### World Coordinate Calculations

```javascript
// Calculate distance between two points in the world
let spawnPoint = new Pos3D(0, 64, 0);
let currentPos = Player.getPlayer().getPos();
let distance = spawnPoint.toVector(currentPos).getMagnitude();

console.log(`Distance from spawn: ${Math.floor(distance)} blocks`);

// Find structures within radius
let center = Player.getPlayer().getPos();
let radius = 100;
let structures = [];

// Scan for villages in area
for (let x = center.x - radius; x <= center.x + radius; x += 32) {
    for (let z = center.z - radius; z <= center.z + radius; z += 32) {
        let checkPos = new Pos3D(x, 64, z);
        let villagePos = World.getNearestVillage(checkPos.toBlockPos(), 50);
        if (villagePos) {
            let villageDistance = center.toVector(new Pos3D(villagePos)).getMagnitude();
            if (villageDistance <= radius) {
                structures.push({
                    type: "Village",
                    pos: villagePos,
                    distance: villageDistance
                });
            }
        }
    }
}

console.log(`Found ${structures.length} structures within ${radius} blocks`);
```

### 3D Path Planning

```javascript
// Plan path through waypoints
let waypoints = [
    new Pos3D(100, 64, 100),
    new Pos3D(150, 70, 150),
    new Pos3D(200, 75, 200),
    new Pos3D(250, 64, 250)
];

// Calculate total path length and steepness
let totalLength = 0;
let totalHeightChange = 0;
let maxSteepness = 0;

for (let i = 0; i < waypoints.length - 1; i++) {
    let segment = waypoints[i].toVector(waypoints[i + 1]);
    let length = segment.getMagnitude();
    let heightChange = Math.abs(segment.getDeltaY());
    let steepness = heightChange / length;

    totalLength += length;
    totalHeightChange += heightChange;
    maxSteepness = Math.max(maxSteepness, steepness);

    console.log(`Segment ${i + 1}: Length=${Math.floor(length)}, Height Change=${heightChange}, Steepness=${(steepness * 100).toFixed(1)}%`);
}

console.log(`Total path: ${Math.floor(totalLength)} blocks, ${totalHeightChange} blocks elevation`);
console.log(`Maximum steepness: ${(maxSteepness * 100).toFixed(1)}%`);
```

### Area and Volume Calculations

```javascript
// Define a rectangular prism (building area)
let corner1 = new Pos3D(100, 60, 100);
let corner2 = new Pos3D(200, 80, 300);

// Calculate area properties
let dimensions = new Pos3D(
    Math.abs(corner2.x - corner1.x),
    Math.abs(corner2.y - corner1.y),
    Math.abs(corner2.z - corner1.z)
);

let volume = dimensions.x * dimensions.y * dimensions.z;
let floorArea = dimensions.x * dimensions.z;
let wallArea = 2 * (dimensions.x * dimensions.y + dimensions.z * dimensions.y);

console.log(`Building dimensions: ${dimensions.x}x${dimensions.y}x${dimensions.z}`);
console.log(`Volume: ${volume} cubic meters`);
console.log(`Floor area: ${floorArea} square meters`);
console.log(`Wall area: ${wallArea} square meters`);

// Generate positions within the area
let positionsInside = [];
for (let x = corner1.x; x <= corner2.x; x += 5) {
    for (let y = corner1.y; y <= corner2.y; y += 5) {
        for (let z = corner1.z; z <= corner2.z; z += 5) {
            positionsInside.push(new Pos3D(x, y, z));
        }
    }
}

console.log(`Generated ${positionsInside.length} sample positions`);
```

### Spatial Relationships

```javascript
// Find entities within specific 3D boundaries
let player = Player.getPlayer();
let center = player.getPos();
let searchRadius = 32;
let searchHeight = 10;

let entitiesNearby = [];
World.getEntities().forEach(entity => {
    if (entity === player) return;

    let entityPos = entity.getPos();
    let distance = center.toVector(entityPos).getMagnitude();
    let heightDiff = Math.abs(entityPos.y - center.y);

    if (distance <= searchRadius && heightDiff <= searchHeight) {
        entitiesNearby.push({
            entity: entity,
            distance: distance,
            height: heightDiff
        });
    }
});

// Sort by distance
entitiesNearby.sort((a, b) => a.distance - b.distance);
console.log(`Found ${entitiesNearby.length} entities nearby`);

// Highlight closest entity
if (entitiesNearby.length > 0) {
    let closest = entitiesNearby[0];
    console.log(`Closest entity: ${closest.entity.getName()} at ${Math.floor(closest.distance)} blocks`);
}
```

### Coordinate System Conversions

```javascript
// Convert between different coordinate systems
let worldPos = new Pos3D(1000, 64, 2000);
let chunkX = Math.floor(worldPos.x / 16);
let chunkZ = Math.floor(worldPos.z / 16);
let localX = worldPos.x % 16;
let localZ = worldPos.z % 16;

console.log(`World position: (${worldPos.x}, ${worldPos.y}, ${worldPos.z})`);
console.log(`Chunk coordinates: (${chunkX}, ${chunkZ})`);
console.log(`Local coordinates: (${localX}, ${worldPos.y}, ${localZ})`);

// Convert from chunk coordinates back to world
let reconstructedWorld = new Pos3D(
    chunkX * 16 + localX,
    worldPos.y,
    chunkZ * 16 + localZ
);

console.log(`Reconstructed: (${reconstructedWorld.x}, ${reconstructedWorld.y}, ${reconstructedWorld.z})`);

// Convert to nether coordinates
let netherPos = new Pos3D(
    worldPos.x / 8,
    worldPos.y,
    worldPos.z / 8
);

console.log(`Nether equivalent: (${netherPos.x}, ${netherPos.y}, ${netherPos.z})`);
```

### Advanced 3D Geometry

```javascript
// Calculate if position is inside a sphere
let sphereCenter = new Pos3D(100, 64, 100);
let sphereRadius = 20;
let testPositions = [
    new Pos3D(90, 64, 90),
    new Pos3D(120, 70, 110),
    new Pos3D(100, 64, 130),
    new Pos3D(50, 50, 50)
];

testPositions.forEach((pos, index) => {
    let distance = sphereCenter.toVector(pos).getMagnitude();
    let isInside = distance <= sphereRadius;
    console.log(`Position ${index + 1}: Distance ${Math.floor(distance)}, Inside: ${isInside}`);
});

// Find intersection of line and plane
let lineStart = new Pos3D(0, 0, 0);
let lineEnd = new Pos3D(10, 10, 10);
let planePoint = new Pos3D(5, 0, 5);
let planeNormal = new Vec3D(0, 1, 0, 0, 1, 0).normalize(); // Horizontal plane

let lineVector = lineStart.toVector(lineEnd);
let toPlanePoint = lineStart.toVector(planePoint);

let dot = lineVector.dotProduct(planeNormal);
let dot2 = toPlanePoint.dotProduct(planeNormal);

if (Math.abs(dot) > 0.001) { // Line is not parallel to plane
    let t = dot2 / dot;
    if (t >= 0 && t <= 1) { // Intersection is within line segment
        let intersection = lineStart.add(
            lineVector.getDeltaX() * t,
            lineVector.getDeltaY() * t,
            lineVector.getDeltaZ() * t
        );
        console.log(`Line-plane intersection: (${intersection.x}, ${intersection.y}, ${intersection.z})`);
    }
}
```

### Integration with World Events

```javascript
// Track player movement over time
let movementHistory = [];
let maxHistory = 100;

// Track position changes
jsmacros.on("PlayerTick", JavaWrapper.methodToJava((event) => {
    let player = Player.getPlayer();
    let currentPos = player.getPos();
    movementHistory.push({
        position: currentPos,
        time: Date.now(),
        motion: player.getVelocity()
    });

    // Keep history size manageable
    if (movementHistory.length > maxHistory) {
        movementHistory.shift();
    }
}));

// Analyze movement patterns
function analyzeMovement() {
    if (movementHistory.length < 2) return;

    let recent = movementHistory.slice(-10);
    let totalDistance = 0;
    let maxSpeed = 0;

    for (let i = 1; i < recent.length; i++) {
        let distance = recent[i-1].position.toVector(recent[i].position).getMagnitude();
        let timeDiff = (recent[i].time - recent[i-1].time) / 1000; // seconds
        let speed = distance / timeDiff;

        totalDistance += distance;
        maxSpeed = Math.max(maxSpeed, speed);
    }

    console.log(`Recent movement: ${Math.floor(totalDistance)} blocks total, max speed: ${maxSpeed.toFixed(2)} bps`);
}
```

## Integration with Other Classes

Pos3D integrates seamlessly with:
- **Vec3D**: For 3D vector operations and calculations
- **Pos2D**: For 2D projections and simplification
- **BlockPosHelper**: For block-level operations
- **WorldScanner**: For spatial queries and area calculations
- **Draw3D**: For 3D visualization and markers

## Performance Notes

- Use `Pos3D.ZERO` instead of `new Pos3D(0, 0, 0)` for origin references
- Vector operations create new instances - consider reuse in performance-critical code
- For large-scale world scanning, use WorldScanner instead of manual position checks
- Cache frequently accessed positions to reduce object creation

## Coordinate System Notes

- **X**: East (+) / West (-)
- **Y**: Up (+) / Down (-)
- **Z**: South (+) / North (-)
- One block = 1 unit in all directions
- Chunk boundaries are at multiples of 16

## See Also

- [Vec3D](Vec3D.md) - 3D vector class
- [Pos2D](Pos2D.md) - 2D position class
- [WorldScanner](WorldScanner.md) - World scanning utilities
- [Draw3D](Draw3D.md) - 3D drawing operations