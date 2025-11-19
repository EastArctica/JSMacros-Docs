# UniversalBlockStateHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.UniversalBlockStateHelper`

**Extends:** `BlockStateHelper`

**Since:** JsMacros 1.8.4

The `UniversalBlockStateHelper` class extends `BlockStateHelper` and provides comprehensive access to all block state properties in Minecraft. It serves as a universal interface for accessing the specific state properties of any block in the world, making it easier to work with block states without needing to know the exact property names or types.

This class is particularly useful for:
- Checking block orientations and directions
- Reading redstone states and power levels
- Accessing block-specific properties like age, level, or custom states
- Working with complex blocks like doors, stairs, rails, and redstone components

## Accessing the Class

You typically obtain a `UniversalBlockStateHelper` instance from a `BlockStateHelper` using the `getUniversal()` method:

```javascript
// Get block state at player position
let blockState = World.getBlockState(Player.getPlayer().getBlockPos());

// Convert to universal helper for full property access
let universalState = blockState.getUniversal();

// Now you can access all block properties
let facing = universalState.getFacing();
let isPowered = universalState.isPowered();
```

## Inherited Methods

The `UniversalBlockStateHelper` inherits all methods from `BlockStateHelper`, including:

- `getBlock()` - Gets the block helper
- `getId()` - Gets the block ID
- `getFluidState()` - Gets the fluid state
- `getHardness()` - Gets block hardness
- `getLuminance()` - Gets block light level
- `isAir()`, `isSolid()`, `isLiquid()` - Basic block properties
- And many more...

## Methods

### Direction and Orientation Properties

#### `getAttachment()`
Returns the attachment state of certain blocks like tripwire hooks.

**Returns:** `String` - Attachment state (e.g., "floor", "wall", "ceiling")

**Available on:** Tripwire hooks, walls

**Since:** 1.8.4

```javascript
let attachment = universalState.getAttachment();
if (attachment === "wall") {
    // Block is attached to a wall
}
```

#### `getHorizontalFacing()`
Gets the horizontal facing direction of the block.

**Returns:** `DirectionHelper` - Direction object with name and axis info

**Available on:** Blocks with horizontal orientation

**Since:** 1.8.4

```javascript
let facing = universalState.getHorizontalFacing();
let directionName = facing.getName(); // "north", "south", "east", "west"
let axis = facing.getAxis(); // "x" or "z"
```

#### `getFacing()`
Gets the primary facing direction of the block.

**Returns:** `DirectionHelper` - Direction object

**Available on:** Furnaces, chests, hoppers, dispensers, pistons, etc.

**Since:** 1.8.4

```javascript
let facing = universalState.getFacing();
if (facing.getName() === "north") {
    // Block faces north
}
```

#### `getHopperFacing()`
Gets the specific facing direction for hoppers.

**Returns:** `DirectionHelper` - Direction object

**Available on:** Hoppers

**Since:** 1.8.4

#### `getOrientation()`
Gets the orientation of the block.

**Returns:** `String` - Orientation value

**Available on:** Blocks with multiple orientations

**Since:** 1.8.4

#### `getAxis()`
Gets the axis orientation of the block.

**Returns:** `String` - Axis name ("x", "y", or "z")

**Available on:** Logs, pillars, chains, etc.

**Since:** 1.8.4

```javascript
let axis = universalState.getAxis();
if (axis === "y") {
    // Block is vertical
}
```

### Connection Properties

#### `getEastWireConnection()`, `getNorthWireConnection()`, `getSouthWireConnection()`, `getWestWireConnection()`
Get redstone wire connection states for each direction.

**Returns:** `String` - Connection state ("none", "side", "up")

**Available on:** Redstone wires

**Since:** 1.8.4

```javascript
let eastConnection = universalState.getEastWireConnection();
let northConnection = universalState.getNorthWireConnection();

if (eastConnection === "side" && northConnection === "side") {
    // Wire connects to sides on east and north
}
```

#### `getEastWallShape()`, `getNorthWallShape()`, `getSouthWallShape()`, `getWestWallShape()`
Get wall shape properties for each direction.

**Returns:** `String` - Wall shape ("none", "low", "tall")

**Available on:** Walls, fences

**Since:** 1.8.4

### Binary State Properties

These methods return boolean values for various block states:

#### Direction Properties
- `isUp()` - Block connects upward
- `isDown()` - Block connects downward
- `isNorth()` - Block connects to north
- `isSouth()` - Block connects to south
- `isEast()` - Block connects to east
- `isWest()` - Block connects to west

**Since:** 1.8.4

#### Power and Redstone Properties
- `isPowered()` - Block is powered by redstone
- `isLit()` - Block is lit (torches, furnaces, campfires, etc.)
- `isSignalFire()` - Campfire is a signal fire
- `isInverted()` - Block is in inverted state (daylight sensors)
- `getPower()` - Redstone power level (0-15)

**Since:** 1.8.4

```javascript
if (universalState.isPowered()) {
    let powerLevel = universalState.getPower();
    Chat.log(`Block is powered with level: ${powerLevel}`);
}
```

#### Block-Specific Properties
- `isWaterlogged()` - Block contains water
- `isAttached()` - Block is attached (tripwire hooks)
- `isOpen()` - Block is open (doors, gates, trapdoors)
- `isExtended()` - Block is extended (pistons)
- `isOccupied()` - Block is occupied (beds)
- `isPersistent()` - Block is persistent (leaves)
- `isSnowy()` - Block is snowy (dirt blocks)
- `hasEye()` - Block has an eye (end portal frames)
- `hasBook()` - Block has a book (lecterns)
- `hasRecord()` - Block has a record (jukeboxes)
- `hasBerries()` - Block has berries (cave vines)

**Since:** 1.8.4

### Brewing Stand Properties
- `hasBottle0()`, `hasBottle1()`, `hasBottle2()` - Check for bottles in slots

**Since:** 1.8.4

### Piston Properties
- `isShort()` - Piston head is short
- `getPistonType()` - Returns piston type ("normal" or "sticky")

**Since:** 1.8.4

### Crop and Growth Properties

#### `getAge()`
Gets the growth age of crops and similar blocks.

**Returns:** `Number` - Age value (varies by crop type)

**Available on:** Wheat, carrots, potatoes, beetroots, melons, pumpkins, etc.

**Since:** 1.8.4

```javascript
let age = universalState.getAge();
if (age >= 7) {
    // Wheat is fully grown
}
```

#### `getMaxAge()`
Gets the maximum possible age for crops.

**Returns:** `Number` - Maximum age value

**Since:** 1.8.4

#### `getStage()`
Gets the growth stage of certain plants.

**Returns:** `Number` - Growth stage

**Available on:** Bamboo, saplings

**Since:** 1.8.4

#### `getLevel()`
Gets the level property for fluids and similar blocks.

**Returns:** `Number` - Level value

**Available on:** Water, lava, cauldrons

**Since:** 1.8.4

#### `getMaxLevel()`
Gets the maximum level for fluids.

**Returns:** `Number` - Maximum level value

**Since:** 1.8.4

#### `getMinLevel()`
Gets the minimum level for fluids.

**Returns:** `Number` - Minimum level value

**Since:** 1.8.4

#### `getDistance()`
Gets the distance from logs (for leaves) or other distance-based properties.

**Returns:** `Number` - Distance value

**Since:** 1.8.4

#### `getMaxDistance()`
Gets the maximum distance value.

**Returns:** `Number` - Maximum distance

**Since:** 1.8.4

#### `getMinDistance()`
Gets the minimum distance value.

**Returns:** `Number` - Minimum distance

**Since:** 1.8.4

### Food and Item Properties

#### `getBites()`
Gets the number of bites taken from a cake.

**Returns:** `Number` - Number of bites (0-6)

**Available on:** Cake blocks

**Since:** 1.8.4

```javascript
let bites = universalState.getBites();
if (bites >= 6) {
    Chat.log("Cake is completely eaten!");
}
```

#### `getHoneyLevel()`
Gets the honey level of beehives and bee nests.

**Returns:** `Number` - Honey level (0-5)

**Available on:** Beehives, bee nests

**Since:** 1.8.4

#### `getPickles()`
Gets the number of sea pickles in a block.

**Returns:** `Number` - Number of pickles (1-4)

**Available on:** Sea pickles

**Since:** 1.8.4

#### `getCandles()`
Gets the number of candles.

**Returns:** `Number` - Number of candles (1-4)

**Available on:** Candles

**Since:** 1.8.4

#### `getFlowerAmount()`
Gets the number of flowers on a block.

**Returns:** `Number` - Flower amount

**Since:** 1.9.0

### Structure and Shape Properties

#### `getBlockHalf()`
Gets the half of a double-height block.

**Returns:** `String` - "upper" or "lower"

**Available on:** Doors, slabs (when used as double blocks)

**Since:** 1.8.4

#### `getDoubleBlockHalf()`
Gets the half of a double-height block specifically.

**Returns:** `String` - "upper" or "lower"

**Available on:** Beds, doors

**Since:** 1.8.4

#### `getSlabType()`
Gets the type of slab.

**Returns:** `String` - "top", "bottom", or "double"

**Available on:** Slabs

**Since:** 1.8.4

#### `getStairShape()`
Gets the shape of stairs.

**Returns:** `String` - Stair shape type

**Available on:** Stairs

**Since:** 1.8.4

#### `getRailShape()`
Gets the shape of rails.

**Returns:** `String` - Rail configuration

**Available on:** Rails

**Since:** 1.8.4

```javascript
let railShape = universalState.getRailShape();
if (railShape === "north_south") {
    // Rail runs north to south
}
```

#### `getChestType()`
Gets the type of chest.

**Returns:** `String` - "single", "left", or "right"

**Available on:** Chests, trapped chests, ender chests

**Since:** 1.8.4

```javascript
let chestType = universalState.getChestType();
if (chestType !== "single") {
    // This is part of a double chest
}
```

### Door Properties

#### `getDoorHinge()`
Gets the hinge side of a door.

**Returns:** `String` - "left" or "right"

**Available on:** Doors

**Since:** 1.8.4

### Farming Properties

#### `getMoisture()`
Gets the moisture level of farmland.

**Returns:** `Number` - Moisture level (0-7)

**Available on:** Farmland

**Since:** 1.8.4

```javascript
let moisture = universalState.getMoisture();
if (moisture < 4) {
    Chat.log("Farmland is dry and needs water nearby");
}
```

### Timing and Delay Properties

#### `getDelay()`
Gets the delay setting of repeaters.

**Returns:** `Number` - Delay in ticks (1-4)

**Available on:** Redstone repeaters

**Since:** 1.8.4

### Note Block Properties

#### `getNote()`
Gets the note value of note blocks.

**Returns:** `Number` - Note value (0-24)

**Available on:** Note blocks

**Since:** 1.8.4

#### `getInstrument()`
Gets the instrument type of note blocks.

**Returns:** `String` - Instrument name

**Available on:** Note blocks

**Since:** 1.8.4

### Redstone Properties

#### `getComparatorMode()`
Gets the mode of a comparator.

**Returns:** `String` - "compare" or "subtract"

**Available on:** Redstone comparators

**Since:** 1.8.4

#### `isLocked()`
Gets the locked state of repeaters and comparators.

**Returns:** `Boolean` - Whether the component is locked

**Available on:** Redstone repeaters, comparators

**Since:** 1.8.4

### Sculk Sensor Properties

#### `getSculkSensorPhase()`
Gets the current phase of a sculk sensor.

**Returns:** `String` - Sensor phase ("inactive", "active", "cooldown")

**Available on:** Sculk sensors

**Since:** 1.8.4

#### `isShrieking()`
Gets the shrieking state of sculk sensors.

**Returns:** `Boolean` - Whether the sensor is shrieking

**Available on:** Sculk sensors, sculk shriekers

**Since:** 1.8.4

#### `canSummon()`
Gets whether a sculk shrieker can summon.

**Returns:** `Boolean` - Summon capability

**Available on:** Sculk shriekers

**Since:** 1.8.4

### Special Properties

#### `getRotation()`
Gets the rotation value of certain blocks.

**Returns:** `Number` - Rotation value

**Available on:** Signs, skulls, banners

**Since:** 1.8.4

#### `getCharges()`
Gets the charge level of respawn anchors.

**Returns:** `Number` - Number of charges (0-4)

**Available on:** Respawn anchors

**Since:** 1.8.4

#### `getEggs()`
Gets the number of turtle eggs.

**Returns:** `Number` - Number of eggs (1-4)

**Available on:** Turtle eggs

**Since:** 1.8.4

#### `getHatched()`
Gets the hatching progress of turtle eggs.

**Returns:** `Number` - Hatch level (0-2)

**Available on:** Turtle eggs

**Since:** 1.8.4

#### `getLayers()`
Gets the number of snow layers.

**Returns:** `Number` - Number of layers (1-8)

**Available on:** Snow layers

**Since:** 1.8.4

### Slot Properties

- `isSlot0Occupied()`, `isSlot1Occupied()`, `isSlot2Occupied()`, `isSlot3Occupied()`, `isSlot4Occupied()`, `isSlot5Occupied()` - Check slot occupation states

**Since:** 1.8.4

## Usage Examples

### Example 1: Analyzing a Redstone Circuit
```javascript
function analyzeRedstoneBlock(blockPos) {
    let block = World.getBlock(blockPos);
    let state = block.getBlockState().getUniversal();

    Chat.log(`Analyzing block: ${block.getId()}`);

    // Check redstone properties
    if (state.isPowered()) {
        Chat.log(`Powered: Yes (Power: ${state.getPower()})`);
    }

    if (state.isLit()) {
        Chat.log("Block is lit");
    }

    // Check connections if it's a wire
    try {
        let eastConn = state.getEastWireConnection();
        Chat.log(`East connection: ${eastConn}`);
    } catch (e) {
        // Not a redstone wire
    }

    // Check repeater/comparator properties
    try {
        let delay = state.getDelay();
        Chat.log(`Delay: ${delay} ticks`);
    } catch (e) {
        // Not a repeater
    }
}
```

### Example 2: Checking Crop Growth
```javascript
function checkCropStatus(blockPos) {
    let block = World.getBlock(blockPos);
    let state = block.getBlockState().getUniversal();

    try {
        let age = state.getAge();
        let blockName = block.getId();

        Chat.log(`Crop: ${blockName}`);
        Chat.log(`Age: ${age}`);

        // Different crops have different maximum ages
        let maxAge = getMaxAgeForCrop(blockName);
        if (age >= maxAge) {
            Chat.log("Crop is fully grown!");
        } else {
            Chat.log(`Crop needs ${maxAge - age} more growth stages`);
        }
    } catch (e) {
        Chat.log("This block doesn't have age properties");
    }
}

function getMaxAgeForCrop(blockName) {
    const cropMaxAges = {
        "minecraft:wheat": 7,
        "minecraft:carrots": 7,
        "minecraft:potatoes": 7,
        "minecraft:beetroots": 3,
        "minecraft:pumpkin_stem": 7,
        "minecraft:melon_stem": 7
    };
    return cropMaxAges[blockName] || 7;
}
```

### Example 3: Door and Gate States
```javascript
function checkDoorOrGate(blockPos) {
    let block = World.getBlock(blockPos);
    let state = block.getBlockState().getUniversal();

    if (state.isOpen() !== undefined) {
        Chat.log(`Block is open: ${state.isOpen()}`);

        try {
            let hinge = state.getDoorHinge();
            Chat.log(`Door hinge: ${hinge}`);
        } catch (e) {
            // Not a door
        }

        try {
            let chestType = state.getChestType();
            Chat.log(`Chest type: ${chestType}`);
        } catch (e) {
            // Not a chest
        }
    }
}
```

### Example 4: Working with Fluids
```javascript
function analyzeFluid(blockPos) {
    let block = World.getBlock(blockPos);
    let state = block.getBlockState().getUniversal();
    let fluidState = block.getBlockState().getFluidState();

    if (!fluidState.isEmpty()) {
        Chat.log(`Fluid type: ${fluidState.getFluid().getId()}`);

        try {
            let level = state.getLevel();
            let maxLevel = state.getMaxLevel();
            Chat.log(`Fluid level: ${level}/${maxLevel}`);
        } catch (e) {
            Chat.log("Level properties not available");
        }

        if (state.isFalling()) {
            Chat.log("Fluid is falling");
        }
    }
}
```

## Important Notes

### Property Availability
Not all properties are available on all blocks. When accessing a property that doesn't exist for a particular block, the method will throw an exception. Always wrap property access in try-catch blocks:

```javascript
try {
    let age = universalState.getAge();
} catch (e) {
    // This block doesn't have an age property
}
```

### Version Compatibility
Some properties were added in later versions of JsMacros:
- Methods marked with `@since 1.8.4` are available from JsMacros 1.8.4+
- Methods marked with `@since 1.9.0` are available from JsMacros 1.9.0+
- Methods marked with `@since 2.0.0` are available from JsMacros 2.0.0+

### Performance Considerations
The UniversalBlockStateHelper provides convenient access but may have slight performance overhead compared to direct property access. For performance-critical code, consider using the specific property access methods you need.

### Error Handling
Always handle the possibility that properties might not exist:
```javascript
function safeGetProperty(universalState, propertyName) {
    try {
        switch(propertyName) {
            case 'age': return universalState.getAge();
            case 'power': return universalState.getPower();
            case 'facing': return universalState.getFacing().getName();
            case 'waterlogged': return universalState.isWaterlogged();
            default: return null;
        }
    } catch (e) {
        return null;
    }
}
```

## Related Classes

- **BlockStateHelper** - Base class with basic block state methods
- **DirectionHelper** - Represents direction objects
- **BlockPosHelper** - Represents block positions
- **BlockHelper** - Represents block types and properties
- **FluidStateHelper** - Represents fluid states

The UniversalBlockStateHelper provides the most comprehensive interface for working with Minecraft block states in JsMacros, making it an essential tool for any script that needs to analyze or manipulate blocks in the world.