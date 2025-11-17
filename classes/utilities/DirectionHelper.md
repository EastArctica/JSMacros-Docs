# DirectionHelper

Represents a cardinal or intercardinal direction in the Minecraft world. Essential for navigation, movement calculations, block placement, and understanding spatial relationships. Provides methods to manipulate and query directional properties.

## Constructor

DirectionHelper objects are typically obtained from other classes or methods rather than created directly:

```javascript
// From player facing direction
let player = Player.getPlayer();
let facing = player.getHorizontalFacing(); // Returns DirectionHelper

// From block faces
let block = World.getBlockAt(x, y, z);
let facing = block.getFacing(); // Returns DirectionHelper
```

## Methods

### Direction Properties

#### getName()
Returns the name of this direction.

```javascript
let directionName = direction.getName();
// Returns: "north", "south", "east", "west", "up", "down"
```

#### getAxis()
Returns the name of the axis this direction is aligned to.

```javascript
let axis = direction.getAxis();
// Returns: "x", "y", or "z"
```

#### isVertical()
Returns true if this direction is vertical (up or down).

```javascript
let isVertical = direction.isVertical();
```

#### isHorizontal()
Returns true if this direction is horizontal (north, south, east, west).

```javascript
let isHorizontal = direction.isHorizontal();
```

#### isTowardsPositive()
Returns true if this direction points towards positive coordinates.

```javascript
let isPositive = direction.isTowardsPositive();
// East, South, and Up return true
// West, North, and Down return false
```

### Angle Information

#### getYaw()
Returns the yaw angle of this direction (horizontal rotation).

```javascript
let yaw = direction.getYaw();
// South: 0°, West: 90°, North: 180°, East: 270°
```

#### getPitch()
Returns the pitch angle of this direction (vertical rotation).

```javascript
let pitch = direction.getPitch();
// Horizontal: 0°, Up: -90°, Down: 90°
```

### Directional Relationships

#### getOpposite()
Returns the opposite direction.

```javascript
let opposite = direction.getOpposite();
// North → South, East → West, Up → Down
```

#### getLeft()
Returns the direction to the left when facing this direction.

```javascript
let left = direction.getLeft();
// North → West, West → South, South → East, East → North
```

#### getRight()
Returns the direction to the right when facing this direction.

```javascript
let right = direction.getRight();
// North → East, East → South, South → West, West → North
```

### Vector Operations

#### getVector()
Returns this direction as a coordinate vector (Pos3D).

```javascript
let vector = direction.getVector();
// North: (0, 0, -1), South: (0, 0, 1), East: (1, 0, 0), etc.
```

### Angle Testing

#### pointsTo(yaw)
Returns true if the given yaw angle is facing this direction more than any other.

```javascript
let isFacingNorth = DirectionHelper.NORTH.pointsTo(player.getYaw());
```

## Static Direction References

You can access directions through the DirectionHelper class:

```javascript
let north = DirectionHelper.NORTH;
let south = DirectionHelper.SOUTH;
let east = DirectionHelper.EAST;
let west = DirectionHelper.WEST;
let up = DirectionHelper.UP;
let down = DirectionHelper.DOWN;
```

## Examples

### Basic Direction Information

```javascript
// Get player's current facing direction
let player = Player.getPlayer();
let facing = player.getHorizontalFacing();

console.log(`Player is facing: ${facing.getName()}`);
console.log(`Direction axis: ${facing.getAxis()}`);
console.log(`Is horizontal: ${facing.isHorizontal()}`);
console.log(`Yaw angle: ${facing.getYaw()}°`);
console.log(`Vector: (${facing.getVector().x}, ${facing.getVector().y}, ${facing.getVector().z})`);
```

### Navigation and Movement

```javascript
// Calculate relative positions
let player = Player.getPlayer();
let playerPos = player.getPos();
let facing = player.getHorizontalFacing();

// Get position 5 blocks in front of player
let forwardVector = facing.getVector();
let frontPos = playerPos.add(
    forwardVector.x * 5,
    0,
    forwardVector.z * 5
);

console.log(`5 blocks ahead: (${Math.floor(frontPos.x)}, ${Math.floor(frontPos.y)}, ${Math.floor(frontPos.z)})`);

// Get position to the left of player
let leftDirection = facing.getLeft();
let leftVector = leftDirection.getVector();
let leftPos = playerPos.add(
    leftVector.x * 3,
    0,
    leftVector.z * 3
);

console.log(`3 blocks to the left: (${Math.floor(leftPos.x)}, ${Math.floor(leftPos.y)}, ${Math.floor(leftPos.z)})`);
```

### Building and Construction

```javascript
// Create walls around a point
function createWalls(centerPos, size) {
    let directions = [
        DirectionHelper.NORTH,
        DirectionHelper.SOUTH,
        DirectionHelper.EAST,
        DirectionHelper.WEST
    ];

    directions.forEach(direction => {
        let vector = direction.getVector();

        // Create wall line
        for (let i = -size; i <= size; i++) {
            let wallPos;
            if (direction.getAxis() === "x") {
                wallPos = centerPos.add(vector.x * size, 0, i);
            } else {
                wallPos = centerPos.add(i, 0, vector.z * size);
            }

            console.log(`Wall at: ${wallPos.x}, ${wallPos.y}, ${wallPos.z}`);
        }
    });
}

// Example usage
let playerPos = Player.getPlayer().getPos();
createWalls(playerPos, 5);
```

### Block Placement Helper

```javascript
// Smart block placement based on facing
function placeBlocksLine(count, spacing) {
    let player = Player.getPlayer();
    let facing = player.getHorizontalFacing();
    let currentPos = player.getPos().add(0, 1, 0); // Eye level

    let vector = facing.getVector();

    for (let i = 1; i <= count; i++) {
        let placePos = currentPos.add(
            vector.x * (i * spacing),
            0,
            vector.z * (i * spacing)
        );

        let block = World.getBlockAt(placePos.toBlockPos());
        if (block.isAir()) {
            Chat.log(`Can place block at: ${placePos.x}, ${placePos.y}, ${placePos.z}`);
        }
    }
}

// Place 10 blocks, 2 blocks apart
placeBlocksLine(10, 2);
```

### Direction-Based Path Finding

```javascript
// Simple pathfinding using directions
function findPathToTarget(startPos, targetPos) {
    let path = [];
    let current = startPos;

    while (current.toVector(targetPos).getMagnitude() > 1) {
        let dx = targetPos.x - current.x;
        let dz = targetPos.z - current.z;

        let direction;
        if (Math.abs(dx) > Math.abs(dz)) {
            direction = dx > 0 ? DirectionHelper.EAST : DirectionHelper.WEST;
        } else {
            direction = dz > 0 ? DirectionHelper.SOUTH : DirectionHelper.NORTH;
        }

        let vector = direction.getVector();
        current = current.add(vector.x, 0, vector.z);
        path.push({pos: current, direction: direction.getName()});

        // Prevent infinite loops
        if (path.length > 1000) break;
    }

    return path;
}

// Example usage
let playerPos = Player.getPlayer().getPos();
let targetPos = new Pos3D(100, 64, 100);
let path = findPathToTarget(playerPos, targetPos);
console.log(`Path found with ${path.length} steps`);
```

### Area Defense and Security

```javascript
// Monitor all directions for threats
let monitoredDirections = [
    DirectionHelper.NORTH,
    DirectionHelper.SOUTH,
    DirectionHelper.EAST,
    DirectionHelper.WEST
];

function checkDirections(range) {
    let player = Player.getPlayer();
    let playerPos = player.getPos();

    monitoredDirections.forEach(direction => {
        let vector = direction.getVector();
        let checkPos = playerPos.add(
            vector.x * range,
            player.getEyeHeight(),
            vector.z * range
        );

        // Check for entities in this direction
        let entities = World.getEntitiesInRange(checkPos, 5);
        let hostileEntities = entities.filter(entity => entity.isHostile());

        if (hostileEntities.length > 0) {
            Chat.log(`Warning: ${hostileEntities.length} hostile entities to the ${direction.getName()}`);
        }
    });
}

// Check every second
setInterval(() => {
    checkDirections(16);
}, 1000);
```

### Compass and Navigation Tools

```javascript
// Enhanced compass that shows relative directions
function showCompass() {
    let player = Player.getPlayer();
    let facing = player.getHorizontalFacing();

    let compass = {
        current: facing.getName(),
        left: facing.getLeft().getName(),
        right: facing.getRight().getName(),
        opposite: facing.getOpposite().getName(),
        yaw: Math.floor(player.getYaw()),
        pitch: Math.floor(player.getPitch())
    };

    Chat.log(`
=== COMPASS ===
Facing: ${compass.current} (${compass.yaw}°)
Left:   ${compass.left}
Right:  ${compass.right}
Back:   ${compass.opposite}
Pitch:  ${compass.pitch}°
===============
    `);
}

// Direction finder to spawn
function showDirectionToSpawn() {
    let player = Player.getPlayer();
    let playerPos = player.getPos();
    let spawnPoint = World.getSpawnPoint();

    let directionVector = playerPos.toVector(spawnPoint);
    let yaw = Math.floor(directionVector.getYaw());

    // Find closest cardinal direction
    let normalizedYaw = ((yaw % 360) + 360) % 360;
    let direction;

    if (normalizedYaw >= 315 || normalizedYaw < 45) direction = DirectionHelper.SOUTH;
    else if (normalizedYaw >= 45 && normalizedYaw < 135) direction = DirectionHelper.WEST;
    else if (normalizedYaw >= 135 && normalizedYaw < 225) direction = DirectionHelper.NORTH;
    else direction = DirectionHelper.EAST;

    let distance = Math.floor(directionVector.getMagnitude());

    Chat.log(`Spawn is ${distance} blocks to the ${direction.getName()}`);
}
```

### Automated Building Patterns

```javascript
// Create circular patterns using direction rotation
function createCircle(centerPos, radius, height) {
    let currentDirection = DirectionHelper.NORTH;
    let angleStep = 15; // degrees per step

    for (let angle = 0; angle < 360; angle += angleStep) {
        let radians = angle * Math.PI / 180;
        let x = centerPos.x + radius * Math.cos(radians);
        let z = centerPos.z + radius * Math.sin(radians);

        for (let y = 0; y < height; y++) {
            let blockPos = new Pos3D(
                Math.floor(x),
                centerPos.y + y,
                Math.floor(z)
            );

            console.log(`Block at: ${blockPos.x}, ${blockPos.y}, ${blockPos.z}`);
        }
    }
}

// Create spiral patterns
function createSpiral(centerPos, maxRadius, height) {
    let currentDirection = DirectionHelper.EAST;
    let currentRadius = 1;
    let directionChange = 0;

    while (currentRadius <= maxRadius) {
        for (let step = 0; step < currentRadius * 2; step++) {
            let vector = currentDirection.getVector();
            let blockPos = centerPos.add(
                vector.x * step,
                directionChange % 2 === 0 ? 0 : 1,
                vector.z * step
            );

            console.log(`Spiral block at: ${blockPos.x}, ${blockPos.y}, ${blockPos.z}`);
        }

        currentDirection = currentDirection.getRight();
        directionChange++;

        if (directionChange % 2 === 0) {
            currentRadius++;
        }

        if (currentRadius > maxRadius) break;
    }
}
```

### Redstone and Mechanical Systems

```javascript
// Create directional redstone circuits
function createRedstoneLine(startPos, direction, length) {
    let vector = direction.getVector();

    for (let i = 0; i < length; i++) {
        let redstonePos = startPos.add(
            vector.x * i,
            0,
            vector.z * i
        );

        // Place redstone dust or repeater every 15 blocks
        if (i % 15 === 0 && i > 0) {
            console.log(`Place repeater at: ${redstonePos.x}, ${redstonePos.y}, ${redstonePos.z}`);
        } else {
            console.log(`Place redstone at: ${redstonePos.x}, ${redstonePos.y}, ${redstonePos.z}`);
        }
    }
}

// Create all-directional redstone clock
function createRedstoneClock(centerPos) {
    let directions = [
        DirectionHelper.NORTH,
        DirectionHelper.EAST,
        DirectionHelper.SOUTH,
        DirectionHelper.WEST
    ];

    directions.forEach((direction, index) => {
        let vector = direction.getVector();
        let clockPos = centerPos.add(
            vector.x * 3,
            0,
            vector.z * 3
        );

        console.log(`Clock ${index + 1} at: ${clockPos.x}, ${clockPos.y}, ${clockPos.z} (${direction.getName()})`);
    });
}
```

## Integration with Other Classes

DirectionHelper integrates seamlessly with:
- **Player**: For facing direction and movement
- **World**: For block placement and interaction
- **Pos3D/Vec3D**: For spatial calculations and vector operations
- **BlockHelper**: For block facing and properties

## Direction Reference

| Direction | Yaw (°) | Vector | Opposite | Left | Right |
|-----------|---------|--------|----------|------|-------|
| North | 180 | (0, 0, -1) | South | West | East |
| East | 270 | (1, 0, 0) | West | North | South |
| South | 0 | (0, 0, 1) | North | East | West |
| West | 90 | (-1, 0, 0) | East | South | North |
| Up | N/A | (0, 1, 0) | Down | N/A | N/A |
| Down | N/A | (0, -1, 0) | Up | N/A | N/A |

## Performance Notes

- DirectionHelper objects are lightweight and can be cached
- Vector operations (`getVector()`) are fast and can be called frequently
- Use static direction references (DirectionHelper.NORTH) for better performance

## See Also

- [Pos3D](Pos3D.md) - 3D position class
- [Vec3D](Vec3D.md) - 3D vector class
- [Player](../core/Player.md) - Player operations and properties
- [World](../core/World.md) - World operations and block access