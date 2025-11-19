# PositionCommon

A library of helper functions for creating position and vector objects. Accessible from scripts via the global `PositionCommon` variable.

## Methods
- [PositionCommon.createVec](#positioncommoncreatevec)
- [PositionCommon.createLookingVector](#positioncommoncreatelookingvector)
- [PositionCommon.createPos](#positioncommoncreatepos)
- [PositionCommon.createBlockPos](#positioncommoncreateblockpos)

### PositionCommon.createVec
```js
// Create a 3D vector from point (0, 0, 0) to (10, 20, 30)
const vec3 = PositionCommon.createVec(0, 0, 0, 10, 20, 30);
Chat.log(`3D Vector length: ${vec3.getLength()}`);

// Create a 2D vector from point (5, 5) to (15, 10)
const vec2 = PositionCommon.createVec(5, 5, 15, 10);
Chat.log(`2D Vector length: ${vec2.getLength()}`);
```
Creates a new 2D or 3D vector object representing the direction and magnitude from a starting point to an ending point.

**Params**
- `x1: double`: The starting X coordinate.
- `y1: double`: The starting Y coordinate.
- `z1?: double`: The starting Z coordinate (for 3D vector).
- `x2: double`: The ending X coordinate.
- `y2: double`: The ending Y coordinate.
- `z2?: double`: The ending Z coordinate (for 3D vector).

**Note**
Parameters are ordered as start point coordinates followed by end point coordinates: `(x1, y1, [z1], x2, y2, [z2])`

**Returns**
* `Vec3D` or `Vec2D`: The resulting vector object.

#### Overloads
- `createVec(x1: double, y1: double, z1: double, x2: double, y2: double, z2: double): Vec3D`
- `createVec(x1: double, y1: double, x2: double, y2: double): Vec2D`

### PositionCommon.createLookingVector
```js
// Get the player's look vector
const player = Player.getPlayer();
const playerLookVec = PositionCommon.createLookingVector(player);
Chat.log(`Player is looking towards: ${playerLookVec}`);

// Create a look vector from specific angles (facing east)
const eastLookVec = PositionCommon.createLookingVector(-90, 0);
Chat.log(`East vector: ${eastLookVec}`);
```
Creates a normalized `Vec3D` (a vector with a length of 1) that represents a direction of sight.

**Params**
- `entity: EntityHelper<?>`: The entity whose direction of sight will be used.
- `yaw: double`: The horizontal rotation angle in degrees. Positive values rotate clockwise when looking from above (0° = positive Z direction, 90° = positive X direction, -90° = negative X direction).
- `pitch: double`: The vertical rotation angle in degrees. Positive values look downward, negative values look upward (0° = horizontal, -90° = straight up, 90° = straight down).

**Returns**
* `Vec3D`: The resulting normalized look vector.

#### Overloads
- `createLookingVector(entity: EntityHelper<?>): Vec3D`
- `createLookingVector(yaw: double, pitch: double): Vec3D`

### PositionCommon.createPos
```js
// Create a 3D position object
const pos3d = PositionCommon.createPos(10.5, 64.0, -100.2);
Chat.log(`3D Position: ${pos3d}`);

// Create a 2D position object
const pos2d = PositionCommon.createPos(10.5, -100.2);
Chat.log(`2D Position: ${pos2d}`);
```
Creates a new 2D or 3D position object.

**Params**
- `x: double`: The X coordinate.
- `y: double`: The Y coordinate.
- `z?: double`: The Z coordinate (for 3D position).

**Returns**
* `Pos3D` or `Pos2D`: The resulting position object.

#### Overloads
- `createPos(x: double, y: double, z: double): Pos3D`
- `createPos(x: double, y: double): Pos2D`

### PositionCommon.createBlockPos
```js
const blockPos = PositionCommon.createBlockPos(10, 64, -100);
const blockAtPos = World.getBlock(blockPos);
if (blockAtPos) {
    Chat.log(`Block at ${blockPos} is ${blockAtPos.getId()}`);
}
```
Creates a new `BlockPosHelper` for the given integer coordinates.

**Params**
1. `x: int`: The X block coordinate.
2. `y: int`: The Y block coordinate.
3. `z: int`: The Z block coordinate.

**Returns**
* `BlockPosHelper`: A new block position helper object.