# HeldItemChange Event

This event is fired when the item stack in the player's main hand or off-hand changes. Backed by class `EventHeldItemChange`.

## Signature
```js
JsMacros.on("HeldItemChange", (event) => {
  // ...
});
```

```js
JsMacros.on("HeldItemChange", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field   | Type          | Description                           |
| ------- | ------------- | ------------------------------------- |
| offHand | boolean       | Which hand's item changed             |
| item    | ItemStackHelper | The new item stack in the hand       |
| oldItem | ItemStackHelper | The previous item stack in the hand  |

## Behavior

* Fires when the item in main hand or off-hand changes
* Triggers on swap, consume, drop, hotbar scroll
* `offHand` is false for main hand changes, true for off-hand changes
* Item helpers may be empty when the hand is empty
* Not cancellable

## Minimal example

```js
JsMacros.on("HeldItemChange", (e) => {
  if (!e.offHand && !e.item.isEmpty()) {
    Chat.log(`Now holding: ${e.item.getName().getString()}`);
  }
});
```

## Async example

```js
JsMacros.on("HeldItemChange", JavaWrapper.methodToJavaAsync((e) => {
  // Only track changes in the main hand
  if (!e.offHand) {
    const newItem = e.item;

    if (!newItem.isEmpty()) {
      Chat.actionbar(`Holding: ${newItem.getName().getString()}`);
    } else {
      // Clear the action bar if the hand is now empty
      Chat.actionbar("");
    }
  }
}));
```

## Fields
- [event.offHand](#eventoffhand)
- [event.item](#eventitem)
- [event.oldItem](#eventolditem)

## Methods
- [event.toString()](#eventtostring)

### event.offHand
A boolean indicating which hand's item changed.

**Type:** `boolean`

**Notes**
- `true`: The item in the off-hand changed.
- `false`: The item in the main hand changed.

### event.item
A helper object for the new item stack in the hand.

**Type:** `ItemStackHelper`

**Notes**
This will represent an empty item stack if the hand is now empty.

### event.oldItem
A helper object for the item stack that was previously in the hand.

**Type:** `ItemStackHelper`

**Notes**
This will represent an empty item stack if the hand was previously empty.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`