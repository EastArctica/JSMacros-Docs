# EventEXPChange

This event is fired when the player's experience points or level changes. Backed by class `EventEXPChange`.

## Signature
```js
JsMacros.on("EXPChange", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field        | Type   | Description                                   |
| ------------ | ------ | --------------------------------------------- |
| progress     | float  | Current progress towards next level (0-1)     |
| total        | int    | Total accumulated experience points           |
| level        | int    | Current experience level                      |
| prevProgress | float  | Previous progress towards next level          |
| prevTotal    | int    | Previous total experience points              |
| prevLevel    | int    | Previous experience level                     |

## Behavior

* Fires when experience points or level changes
* Includes both current and previous values for comparison
* Progress is a float between 0.0 (inclusive) and 1.0 (exclusive)
* Not cancellable

## Minimal example

```js
JsMacros.on("EXPChange", JavaWrapper.methodToJavaAsync((e) => {
  if (e.level > e.prevLevel) {
    Chat.log(`Level up! Now level ${e.level}`);
  }
});
```

## Async example

```js
JsMacros.on("EXPChange", JavaWrapper.methodToJavaAsync((e) => {
  // Check if the player leveled up
  if (e.level > e.prevLevel) {
    Chat.log(`&aCongratulations! You've reached level ${e.level}!`);
  }

  // Calculate the change in total experience points
  const expGained = e.total - e.prevTotal;

  if (expGained > 0) {
    Chat.actionbar(`+${expGained} EXP | Level: ${e.level} (${(e.progress * 100).toFixed(1)}%)`);
  } else if (expGained < 0) {
    Chat.actionbar(`-${Math.abs(expGained)} EXP | Level: ${e.level} (${(e.progress * 100).toFixed(1)}%)`);
  }
}));
```

## Fields
- [event.progress](#eventprogress)
- [event.total](#eventtotal)
- [event.level](#eventlevel)
- [event.prevProgress](#eventprevprogress)
- [event.prevTotal](#eventprevtotal)
- [event.prevLevel](#eventprevlevel)

## Methods
- [event.toString()](#eventtostring)

### event.progress
The current progress towards the next level, represented as a fraction.

**Type:** `float`

**Notes**
This is a value between `0.0` (inclusive) and `1.0` (exclusive). Multiply by 100 to get the percentage shown on the EXP bar.

### event.total
The player's total accumulated experience points.

**Type:** `int`

### event.level
The player's current experience level.

**Type:** `int`

### event.prevProgress
The experience progress before the change occurred.

**Type:** `float`

**Notes**
This is a value between `0.0` (inclusive) and `1.0` (exclusive).

### event.prevTotal
The total experience points before the change occurred.

**Type:** `int`

### event.prevLevel
The experience level before the change occurred.

**Type:** `int`

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`