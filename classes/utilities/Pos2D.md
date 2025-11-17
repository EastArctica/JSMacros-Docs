# Pos2D

Represents a 2D position/point in 2D space. Essential for 2D coordinate operations, screen positioning, and 2D mathematical calculations. Provides comprehensive arithmetic operations and vector conversion methods.

## Constructor

```javascript
new Pos2D(x, y)
```

**Parameters:**
- `x` (number): X coordinate
- `y` (number): Y coordinate

## Constants

### ZERO
Static constant representing position (0, 0).

```javascript
let origin = Pos2D.ZERO;
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| x | number | X coordinate |
| y | number | Y coordinate |

## Methods

### Coordinate Accessors

#### getX()
Returns the X coordinate.

```javascript
let x = position.getX();
```

#### getY()
Returns the Y coordinate.

```javascript
let y = position.getY();
```

### Arithmetic Operations

#### add(position)
Adds another Pos2D and returns a new Pos2D.

```javascript
let newPosition = position.add(otherPosition);
```

#### add(x, y)
Adds coordinate values and returns a new Pos2D.

```javascript
let newPosition = position.add(10, 5);
```

#### sub(position)
Subtracts another Pos2D and returns a new Pos2D.

```javascript
let newPosition = position.sub(otherPosition);
```

#### sub(x, y)
Subtracts coordinate values and returns a new Pos2D.

```javascript
let newPosition = position.sub(10, 5);
```

#### multiply(position)
Multiplies coordinates with another Pos2D and returns a new Pos2D.

```javascript
let newPosition = position.multiply(otherPosition);
```

#### multiply(x, y)
Multiplies coordinates with values and returns a new Pos2D.

```javascript
let newPosition = position.multiply(2, 3);
```

#### divide(position)
Divides coordinates by another Pos2D and returns a new Pos2D.

```javascript
let newPosition = position.divide(otherPosition);
```

#### divide(x, y)
Divides coordinates by values and returns a new Pos2D.

```javascript
let newPosition = position.divide(2, 3);
```

#### scale(factor)
Multiplies both coordinates by a factor and returns a new Pos2D.

```javascript
let scaledPosition = position.scale(2.5);
```

### Vector Operations

#### toVector()
Creates a Vec2D from origin (0, 0) to this position.

```javascript
let vector = position.toVector();
```

#### toVector(startPos)
Creates a Vec2D from start position to this position.

```javascript
let vector = position.toVector(startPosition);
```

#### toVector(startX, startY)
Creates a Vec2D from start coordinates to this position.

```javascript
let vector = position.toVector(10, 20);
```

#### toReverseVector()
Creates a Vec2D from this position to origin (0, 0).

```javascript
let vector = position.toReverseVector();
```

#### toReverseVector(endPos)
Creates a Vec2D from this position to end position.

```javascript
let vector = position.toReverseVector(endPosition);
```

#### toReverseVector(endX, endY)
Creates a Vec2D from this position to end coordinates.

```javascript
let vector = position.toReverseVector(100, 200);
```

### Conversions

#### to3D()
Converts the 2D position to a 3D position with Z coordinate of 0.

```javascript
let pos3D = position.to3D();
```

## Examples

### Basic Position Operations

```javascript
// Create positions
let pos1 = new Pos2D(10, 20);
let pos2 = new Pos2D(30, 40);

// Access coordinates
console.log(`Position: (${pos1.getX()}, ${pos1.getY()})`);

// Perform arithmetic operations
let sum = pos1.add(pos2);        // (40, 60)
let difference = pos2.sub(pos1); // (20, 20)
let scaled = pos1.scale(2);      // (20, 40)

console.log(`Sum: (${sum.getX()}, ${sum.getY()})`);
console.log(`Difference: (${difference.getX()}, ${difference.getY()})`);
console.log(`Scaled: (${scaled.getX()}, ${scaled.getY()})`);
```

### Screen Coordinates and UI

```javascript
// Calculate center of screen
let screenWidth = Hud.getScreenWidth();
let screenHeight = Hud.getScreenHeight();
let center = new Pos2D(screenWidth / 2, screenHeight / 2);

// Position UI elements relative to center
let buttonPos = center.add(-50, -20); // 50px left, 20px up from center
let labelPos = center.add(50, -20);   // 50px right, 20px up from center

// Draw elements
Hud.drawText("Button", buttonPos.x, buttonPos.y);
Hud.drawText("Label", labelPos.x, labelPos.y);
```

### Grid-Based Calculations

```javascript
// Create grid positions for inventory management
let gridSize = 9; // 3x3 crafting grid
let cellSize = 18; // pixels per cell
let startOffset = 30; // offset from screen edge

let gridPositions = [];
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
        let x = startOffset + col * cellSize;
        let y = startOffset + row * cellSize;
        gridPositions.push(new Pos2D(x, y));
    }
}

// Use positions for clicking or drawing
gridPositions.forEach((pos, index) => {
    Hud.drawRectangle(pos.x, pos.y, pos.x + 16, pos.y + 16, 0xFFFFFFFF);
    Hud.drawText(`${index}`, pos.x + 4, pos.y + 4);
});
```

### Vector Creation and Movement

```javascript
// Create movement vectors
let currentPos = new Pos2D(100, 100);
let targetPos = new Pos2D(200, 150);

// Create directional vector
let movementVector = currentPos.toVector(targetPos);
console.log(`Movement direction: ${movementVector}`);

// Normalize and scale movement
let normalized = movementVector.normalize();
let stepSize = 5;
let stepVector = normalized.scale(stepSize);

// Move step by step
let current = currentPos;
let steps = 0;
while (current.toVector(targetPos).getMagnitude() > stepSize) {
    current = current.add(stepVector.getX(), stepVector.getY());
    steps++;
    console.log(`Step ${steps}: Position (${current.getX()}, ${current.getY()})`);
}
```

### Distance Calculations

```javascript
// Calculate distance between positions
let posA = new Pos2D(0, 0);
let posB = new Pos2D(3, 4);
let distance = posA.toVector(posB).getMagnitude();
console.log(`Distance: ${distance}`); // 5.0 (3-4-5 triangle)

// Find closest point to target
let target = new Pos2D(10, 10);
let candidates = [
    new Pos2D(5, 5),
    new Pos2D(15, 8),
    new Pos2D(12, 12),
    new Pos2D(8, 15)
];

let closest = candidates.reduce((nearest, current) => {
    let distToCurrent = target.toVector(current).getMagnitude();
    let distToNearest = target.toVector(nearest).getMagnitude();
    return distToCurrent < distToNearest ? current : nearest;
});

console.log(`Closest point: (${closest.getX()}, ${closest.getY()})`);
```

### Pattern Generation

```javascript
// Generate positions in a circle
let center = new Pos2D(100, 100);
let radius = 50;
let numPoints = 8;

let circlePositions = [];
for (let i = 0; i < numPoints; i++) {
    let angle = (i * 2 * Math.PI) / numPoints;
    let x = center.x + radius * Math.cos(angle);
    let y = center.y + radius * Math.sin(angle);
    circlePositions.push(new Pos2D(x, y));
}

// Draw circle
circlePositions.forEach(pos => {
    Hud.drawCircle(pos.x, pos.y, 3, 0xFF0000FF);
});
```

### Path Finding (2D)

```javascript
// Simple 2D pathfinding with waypoints
let waypoints = [
    new Pos2D(0, 0),
    new Pos2D(100, 0),
    new Pos2D(100, 100),
    new Pos2D(0, 100),
    new Pos2D(0, 0)
];

// Calculate total path length
let totalLength = 0;
for (let i = 0; i < waypoints.length - 1; i++) {
    let segment = waypoints[i].toVector(waypoints[i + 1]);
    totalLength += segment.getMagnitude();
    console.log(`Segment ${i + 1}: Length = ${segment.getMagnitude()}`);
}

console.log(`Total path length: ${totalLength}`);

// Interpolate positions along path
let numSteps = 20;
let pathPositions = [];
let currentLength = 0;
let targetLength = 0;

for (let step = 1; step <= numSteps; step++) {
    targetLength = (totalLength * step) / numSteps;

    for (let i = 0; i < waypoints.length - 1; i++) {
        let segment = waypoints[i].toVector(waypoints[i + 1]);
        let segmentLength = segment.getMagnitude();

        if (currentLength + segmentLength >= targetLength) {
            let t = (targetLength - currentLength) / segmentLength;
            let pos = waypoints[i].add(
                segment.getDeltaX() * t,
                segment.getDeltaY() * t
            );
            pathPositions.push(pos);
            break;
        }
        currentLength += segmentLength;
    }
}

// Draw interpolated path
pathPositions.forEach((pos, index) => {
    Hud.drawCircle(pos.x, pos.y, 2, 0x00FF00FF);
});
```

### Spatial Queries

```javascript
// Check if position is within bounds
let position = new Pos2D(150, 120);
let boundsStart = new Pos2D(100, 100);
let boundsEnd = new Pos2D(200, 200);

let inBounds = position.x >= boundsStart.x &&
               position.y >= boundsStart.y &&
               position.x <= boundsEnd.x &&
               position.y <= boundsEnd.y;

console.log(`Position in bounds: ${inBounds}`);

// Find positions within radius
let center = new Pos2D(100, 100);
let radius = 30;
let testPositions = [
    new Pos2D(90, 90),
    new Pos2D(120, 80),
    new Pos2D(140, 140),
    new Pos2D(50, 50)
];

let nearbyPositions = testPositions.filter(pos => {
    let distance = center.toVector(pos).getMagnitude();
    return distance <= radius;
});

console.log(`Positions within ${radius} pixels:`, nearbyPositions);
```

## Integration with Other Classes

Pos2D integrates seamlessly with:
- **Vec2D**: For creating direction vectors and performing vector operations
- **Pos3D**: For 2D to 3D conversion
- **Draw2D**: For positioning 2D rendering elements
- **Screen/Display**: For coordinate system transformations

## Performance Notes

- Use `Pos2D.ZERO` instead of `new Pos2D(0, 0)` for origin references
- Vector operations create new instances - consider reuse when possible
- For performance-critical code, cache frequently accessed coordinates

## See Also

- [Vec2D](Vec2D.md) - 2D vector class
- [Pos3D](Pos3D.md) - 3D position class
- [Draw2D](Draw2D.md) - 2D drawing operations