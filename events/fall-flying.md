# FallFlying Event

This event is fired when the player starts or stops gliding with an Elytra. Backed by class `EventFallFlying`.

## Signature
```js
JsMacros.on("FallFlying", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field | Type    | Description                         |
| ----- | ------- | ----------------------------------- |
| state | boolean | The new fall flying state           |

## Behavior

* Fires when the player starts or stops gliding with an Elytra
* State is true when gliding starts, false when gliding stops
* Not cancellable

## Minimal example

```js
JsMacros.on("FallFlying", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(e.state ? "Started gliding" : "Stopped gliding");
});
```

## Async example

```js
JsMacros.on("FallFlying", JavaWrapper.methodToJavaAsync((e) => {
  if (e.state) {
    Chat.actionbar("&bElytra deployed! You are now gliding.");
  } else {
    Chat.actionbar("&7No longer gliding.");
  }
}));
```

## Fields
- [event.state](#eventstate)

## Methods
- [event.toString()](#eventtostring)

### event.state
A boolean indicating the new fall flying state.

**Type:** `boolean`

**Notes**
- `true`: The player has started gliding with an Elytra.
- `false`: The player has stopped gliding.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`