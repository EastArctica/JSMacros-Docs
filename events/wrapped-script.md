# WrappedScript Event

This event is fired when a wrapped script is executed. Backed by class `EventWrappedScript`.

## Signature
```js
JsMacros.on("WrappedScript", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Behavior

* Fires when a wrapped script is executed
- Not cancellable
- Used for internal script management
- Advanced event for script lifecycle monitoring

## Example

```js
JsMacros.on("WrappedScript", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`&dScript executed: ${e.getScriptName()}`);
}));
```

## Methods
- [event.toString()](#eventtostring)

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`