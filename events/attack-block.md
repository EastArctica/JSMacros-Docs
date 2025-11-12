# EventAttackBlock

This event is fired when the player left-clicks a block, initiating the breaking process.

## Example
```javascript
// Log when a player starts breaking a block
const listener = JsMacros.on('AttackBlock', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'AttackBlock');

    const block = event.block;
    const side = event.side;

    // Correlates to net.minecraft.util.math.Direction
    const sideNames = ["DOWN", "UP", "NORTH", "SOUTH", "WEST", "EAST"];
    const sideName = sideNames[side] || "Unknown";

    Chat.log(`Started attacking ${block.getId()} on its ${sideName} face.`);
}));
```

## Fields
- [event.block](#eventblock)
- [event.side](#eventside)

## Methods
- [event.toString()](#eventtostring)

### event.block
A helper for the block that is being attacked.

**Type:** `BlockDataHelper`

### event.side
An integer representing the side of the block that was hit.

**Type:** `int`

**Notes**
The integer values correspond to the following sides:
- `0`: Down (y-negative)
- `1`: Up (y-positive)
- `2`: North (z-negative)
- `3`: South (z-positive)
- `4`: West (x-negative)
- `5`: East (x-positive)

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`