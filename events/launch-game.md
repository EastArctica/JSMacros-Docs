# LaunchGame Event

This event is fired when the game is launched. Backed by class `EventLaunchGame`.

## Signature
```js
JsMacros.on("LaunchGame", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Behavior

* Fires when Minecraft starts up
- Occurs during the initial loading process
- Not cancellable
- Useful for initialization and setup

## Example

```js
JsMacros.on("LaunchGame", JavaWrapper.methodToJavaAsync((e) => {
  const currentTime = new Date().toLocaleString();

  Chat.log(`&6Minecraft started at ${currentTime}`);
  Chat.log(`&aJsMacros is ready!`);
  Chat.actionbar(`&aWelcome to Minecraft! JsMacros loaded.`);

  // Initialize global variables
  global.launchTime = Date.now();
  global.sessionStartTime = Date.now();

  Chat.log(`&7Initialization complete!`);
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