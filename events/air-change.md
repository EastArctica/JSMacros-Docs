# EventAirChange

This event is fired when the player's air supply changes, such as when diving underwater or resurfacing.

## Example
```javascript
// Listen for changes in the player's air level
const listener = JsMacros.on('AirChange', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'AirChange');
    
    const maxAir = 300; // Maximum air ticks
    const airPercentage = (event.air / maxAir) * 100;
    
    Chat.actionbar(`Air: ${airPercentage.toFixed(0)}%`);
    
    if (event.air <= 60) { // About 2 bubbles remaining
        Chat.log("&cWarning: Low on air!");
    }
}));
```

## Fields
- [event.air](#eventair)

## Methods
- [event.toString()](#eventtostring)

### event.air
The new air level of the player.

**Type:** `int`

**Notes**
The air level is measured in ticks. The maximum air supply is 300 ticks (equivalent to 15 seconds or 10 bubbles in the GUI).

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`