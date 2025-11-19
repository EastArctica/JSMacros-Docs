# QuitGame Event

This event is fired when the game is being quit. Backed by class `EventQuitGame`.

## Signature
```js
JsMacros.on("QuitGame", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Behavior

* Fires when the player quits the game completely
- Occurs when closing Minecraft from the main menu or quit button
- Not cancellable
- Useful for cleanup operations and saving data before shutdown

## Example

```js
JsMacros.on("QuitGame", JavaWrapper.methodToJavaAsync((e) => {
  const currentTime = new Date().toLocaleString();

  Chat.log(`&cGame is shutting down...`);
  Chat.log(`&7Shutdown time: &f${currentTime}`);

  // Save any important data
  if (global.sessionStartTime) {
    const sessionDuration = Date.now() - global.sessionStartTime;
    const sessionHours = Math.floor(sessionDuration / 3600000);
    const sessionMinutes = Math.floor((sessionDuration % 3600000) / 60000);

    Chat.log(`&7Total play session: &f${sessionHours}h ${sessionMinutes}m`);
  }

  // Clean up global variables
  if (global.currentProfile) {
    Chat.log(`&7Cleaning up profile: &f${global.currentProfile}`);
  }

  // Save any custom data
  // saveCustomData();

  Chat.log(`&eGoodbye! Thanks for using JsMacros!`);
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