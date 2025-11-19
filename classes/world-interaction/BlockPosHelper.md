# BlockPosHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`
**Since:** JsMacros 1.2.6
**Extends:** `BaseHelper<BlockPos>`

## Overview

The `BlockPosHelper` class is a helper class for working with block positions in Minecraft. It provides a convenient way to manipulate block coordinates, calculate distances, and perform spatial operations within the game world. This class wraps Minecraft's internal `BlockPos` class and exposes additional functionality useful for scripting.

## Constructors

### `new BlockPosHelper(blockPos)`
Creates a new BlockPosHelper from an existing Minecraft BlockPos object.

**Parameters:**
- `blockPos` (BlockPos): The original Minecraft BlockPos to wrap

### `new BlockPosHelper(x, y, z)`
Creates a new BlockPosHelper with the specified coordinates.

**Parameters:**
- `x` (int): The X coordinate
- `y` (int): The Y coordinate
- `z` (int): The Z coordinate

## Properties

### `raw` (read-only)
The underlying Minecraft BlockPos object. Access via `getRaw()` method inherited from BaseHelper.

## Methods

### Coordinate Accessors

#### `getX()`
Returns the X coordinate of the block position.

**Returns:** `int` - The X coordinate

#### `getY()`
Returns the Y coordinate of the block position.

**Returns:** `int` - The Y coordinate

#### `getZ()`
Returns the Z coordinate of the block position.

**Returns:** `int` - The Z coordinate

### Directional Movement

#### `up()`
Returns a new BlockPosHelper representing the block directly above (Y + 1).

**Returns:** `BlockPosHelper` - Block position one level above

#### `up(distance)`
Returns a new BlockPosHelper representing the block n levels above.

**Parameters:**
- `distance` (int): Number of blocks to move upward

**Returns:** `BlockPosHelper` - Block position n levels above

#### `down()`
Returns a new BlockPosHelper representing the block directly below (Y - 1).

**Returns:** `BlockPosHelper` - Block position one level below

#### `down(distance)`
Returns a new BlockPosHelper representing the block n levels below.

**Parameters:**
- `distance` (int): Number of blocks to move downward

**Returns:** `BlockPosHelper` - Block position n levels below

#### `north()`
Returns a new BlockPosHelper representing the block to the north (Z - 1).

**Returns:** `BlockPosHelper` - Block position to the north

#### `north(distance)`
Returns a new BlockPosHelper representing the block n blocks to the north.

**Parameters:**
- `distance` (int): Number of blocks to move north

**Returns:** `BlockPosHelper` - Block position n blocks north

#### `south()`
Returns a new BlockPosHelper representing the block to the south (Z + 1).

**Returns:** `BlockPosHelper` - Block position to the south

#### `south(distance)`
Returns a new BlockPosHelper representing the block n blocks to the south.

**Parameters:**
- `distance` (int): Number of blocks to move south

**Returns:** `BlockPosHelper` - Block position n blocks south

#### `east()`
Returns a new BlockPosHelper representing the block to the east (X + 1).

**Returns:** `BlockPosHelper` - Block position to the east

#### `east(distance)`
Returns a new BlockPosHelper representing the block n blocks to the east.

**Parameters:**
- `distance` (int): Number of blocks to move east

**Returns:** `BlockPosHelper` - Block position n blocks east

#### `west()`
Returns a new BlockPosHelper representing the block to the west (X - 1).

**Returns:** `BlockPosHelper` - Block position to the west

#### `west(distance)`
Returns a new BlockPosHelper representing the block n blocks to the west.

**Parameters:**
- `distance` (int): Number of blocks to move west

**Returns:** `BlockPosHelper` - Block position n blocks west

### General Offset Operations

#### `offset(direction)`
Returns a new BlockPosHelper offset by one block in the specified direction.

**Parameters:**
- `direction` (String): Direction name ("down", "up", "north", "south", "west", "east")

**Returns:** `BlockPosHelper` - Offset block position

#### `offset(direction, distance)`
Returns a new BlockPosHelper offset by n blocks in the specified direction.

**Parameters:**
- `direction` (String): Direction name ("down", "up", "north", "south", "west", "east")
- `distance` (int): Number of blocks to offset

**Returns:** `BlockPosHelper` - Offset block position

#### `offset(x, y, z)`
Returns a new BlockPosHelper offset by the specified coordinate values.

**Parameters:**
- `x` (int): X offset
- `y` (int): Y offset
- `z` (int): Z offset

**Returns:** `BlockPosHelper` - Offset block position

### Coordinate Conversion

#### `toNetherCoords()`
Converts the current block position to corresponding Nether coordinates (X/8, Y, Z/8).

**Returns:** `BlockPosHelper` - Nether equivalent coordinates

#### `toOverworldCoords()`
Converts the current block position to corresponding Overworld coordinates (X*8, Y, Z*8).

**Returns:** `BlockPosHelper` - Overworld equivalent coordinates

#### `toPos3D()`
Converts the block position to a Pos3D object with double precision.

**Returns:** `Pos3D` - Pos3D representation of this position

### Distance Calculations

#### `distanceTo(entity)`
Calculates the distance from this block position to an entity.

**Parameters:**
- `entity` (EntityHelper): The entity to calculate distance to

**Returns:** `double` - Distance to the entity

#### `distanceTo(blockPos)`
Calculates the distance from this block position to another block position.

**Parameters:**
- `blockPos` (BlockPosHelper): The block position to calculate distance to

**Returns:** `double` - Distance to the block position

#### `distanceTo(pos3D)`
Calculates the distance from this block position to a Pos3D position.

**Parameters:**
- `pos3D` (Pos3D): The Pos3D position to calculate distance to

**Returns:** `double` - Distance to the Pos3D position

#### `distanceTo(x, y, z)`
Calculates the distance from this block position to the specified coordinates.

**Parameters:**
- `x` (double): X coordinate
- `y` (double): Y coordinate
- `z` (double): Z coordinate

**Returns:** `double` - Distance to the coordinates

### Object Methods

#### `equals(obj)`
Compares this BlockPosHelper with another object for equality.

**Parameters:**
- `obj` (Object): Object to compare with

**Returns:** `boolean` - True if equal, false otherwise

#### `hashCode()`
Returns the hash code for this block position.

**Returns:** `int` - Hash code value

#### `toString()`
Returns a string representation of this block position.

**Returns:** `String` - String in format: `BlockPosHelper:{"x": X, "y": Y, "z": Z}`

#### `getRaw()`
Returns the underlying Minecraft BlockPos object (inherited from BaseHelper).

**Returns:** `BlockPos` - The raw Minecraft BlockPos object

## Usage Examples

### Creating Block Positions

```javascript
// Create a block position from coordinates
const pos1 = new BlockPosHelper(100, 64, -200);
const pos2 = new BlockPosHelper(player.getX(), player.getY(), player.getZ());

// Access coordinates
console.log(`Position: ${pos1.getX()}, ${pos1.getY()}, ${pos1.getZ()}`);
```

### Moving Between Blocks

```javascript
const startPos = new BlockPosHelper(0, 64, 0);

// Movement in cardinal directions
const north = startPos.north(); // (0, 64, -1)
const south = startPos.south(5); // (0, 64, 5)
const east = startPos.east(); // (1, 64, 0)
const west = startPos.west(3); // (-3, 64, 0)

// Vertical movement
const above = startPos.up(); // (0, 65, 0)
const below = startPos.down(2); // (0, 62, 0)

// General offset
const offset = startPos.offset(5, 2, -3); // (5, 66, -3)
```

### Distance Calculations

```javascript
const pos1 = new BlockPosHelper(0, 64, 0);
const pos2 = new BlockPosHelper(10, 70, 10);

// Distance between block positions
const distance = pos1.distanceTo(pos2);
console.log(`Distance: ${distance} blocks`);

// Distance to player
const playerPos = player.getBlockPos();
const distToPlayer = pos1.distanceTo(playerPos);
```

### Nether/Overworld Conversion

```javascript
// Overworld position
const overworldPos = new BlockPosHelper(800, 64, 1600);

// Convert to Nether coordinates
const netherPos = overworldPos.toNetherCoords(); // (100, 64, 200)
console.log(`Nether: ${netherPos.getX()}, ${netherPos.getY()}, ${netherPos.getZ()}`);

// Convert back to Overworld
const backToOverworld = netherPos.toOverworldCoords(); // (800, 64, 1600)
```

### Working with Players and Entities

```javascript
// Get player's current block position
const playerBlockPos = player.getBlockPos();

// Find blocks around the player
const blockBelow = playerBlockPos.down();
const blockAbove = playerBlockPos.up();
const blockInFront = playerBlockPos.offset(player.getHorizontalFacing());

// Check distance to nearby entity
const nearbyEntities = world.getNearbyEntities(10);
for (const entity of nearbyEntities) {
    const distance = playerBlockPos.distanceTo(entity);
    if (distance < 5) {
        console.log(`${entity.getName()} is ${distance} blocks away`);
    }
}
```

### Searching for Block Patterns

```javascript
// Search in a 5x5x5 cube around a position
const centerPos = new BlockPosHelper(x, y, z);
const radius = 2;

for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
        for (let dz = -radius; dz <= radius; dz++) {
            const checkPos = centerPos.offset(dx, dy, dz);
            const block = world.getBlock(checkPos);

            if (block.getId() === "minecraft:diamond_ore") {
                console.log(`Found diamond ore at ${checkPos.toString()}`);
            }
        }
    }
}
```

## Important Notes

1. **Immutability**: All methods that modify position return a new `BlockPosHelper` instance rather than modifying the original object.

2. **Coordinate System**:
   - X: East (+) / West (-)
   - Y: Up (+) / Down (-)
   - Z: South (+) / North (-)

3. **Nether Conversion**: The conversion methods assume the standard 1:8 ratio between Overworld and Nether dimensions.

4. **Distance Calculation**: Distance calculations use Euclidean distance (straight-line distance in 3D space).

5. **Integer Coordinates**: Block positions use integer coordinates, unlike entity positions which use double precision.

6. **Direction Names**: When using `offset(direction)`, direction names must be lowercase: "down", "up", "north", "south", "west", "east".

7. **Compatibility**: This class is designed to work seamlessly with other JSMacros helper classes like `EntityHelper` and `Pos3D`.

## Related Classes

- `EntityHelper`: For working with entity positions
- `Pos3D`: For double-precision 3D positions
- `BaseHelper`: Base class providing common helper functionality

## Version History

- **1.2.6**: Initial release with basic coordinate access and directional methods
- **1.6.5**: Added enhanced directional methods with distance parameters and offset operations
- **1.8.4**: Added coordinate conversion methods, distance calculations, and Pos3D integration