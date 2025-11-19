# EventAttackBlock
This event is fired when the player left-clicks (attacks) a block. It triggers on the initial click, not when the block is broken.

## Example
```javascript
// Log the details of a block when it is attacked
const listener = JsMacros.on('AttackBlock', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'AttackBlock');
    
    const sideNames = ['Bottom', 'Top', 'North', 'South', 'West', 'East'];
    const sideName = sideNames[event.side] || 'Unknown';
    
    Chat.log(`Attacked block: ${event.block.getId()} on the ${sideName} face.`);
}));
```

## Fields
- [event.block](#eventblock)
- [event.side](#eventside)

## Methods
- [event.toString()](#eventtostring)

### event.block
A helper object containing information about the block that was attacked.

**Type:** `BlockDataHelper`

### event.side
An integer representing the side of the block that was hit.

**Type:** `int`

**Notes**
The integer corresponds to a specific face of the block:
- `0`: Bottom (y-)
- `1`: Top (y+)
- `2`: North (z-)
- `3`: South (z+)
- `4`: West (x-)
- `5`: East (x+)

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`