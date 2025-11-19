# ResourcePackLoaded Event

This event is fired when a resource pack is loaded. Backed by class `EventResourcePackLoaded`.

## Signature
```js
JsMacros.on("ResourcePackLoaded", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Behavior

* Fires when any resource pack is loaded
- Occurs during server connection or resource pack changes
- Not cancellable
- Useful for resource pack monitoring and compatibility checks

## Example

```js
JsMacros.on("ResourcePackLoaded", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`&aResource pack loaded!`);
  Chat.actionbar(`&eResource pack applied`);

  const currentTime = new Date().toLocaleString();
  Chat.log(`&7Loaded at: ${currentTime}`);
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