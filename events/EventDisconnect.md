# EventDisconnect

This event is fired when the player disconnects from a server. Backed by class `EventDisconnect`.

## Signature
```js
JsMacros.on("Disconnect", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| reason | string  | The reason for disconnection             |

## Behavior

* Fires when the player disconnects from any server
* The `reason` field contains the disconnect message
* This event fires before returning to the main menu
* Can be used for cleanup or logging server sessions
* Not cancellable

## Minimal example

```js
JsMacros.on("Disconnect", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Disconnected: ${e.reason}`);
});
```

## Async example

```js
JsMacros.on("Disconnect", JavaWrapper.methodToJavaAsync((e) => {
  const reason = e.reason;

  Chat.log(`&cDisconnected from server!`);
  Chat.log(`&7Reason: &f${reason}`);

  // You might want to save session data or statistics
  const currentTime = new Date().toLocaleString();
  Chat.log(`&7Disconnected at: &f${currentTime}`);

  // Example: Save server statistics
  if (reason.includes("kicked")) {
    Chat.log(`&6You were kicked from the server!`);
    // saveKickReason(reason);
  } else if (reason.includes("timeout")) {
    Chat.log(`&6Connection timed out!`);
    // saveTimeoutReason();
  } else if (reason.includes("closed")) {
    Chat.log(`&6Server was closed!`);
  } else {
    Chat.log(`&6Disconnected: ${reason}`);
  }

  // Clean up any session-specific data
  // clearSessionData();

  // Example: Log session duration if you tracked join time
  const sessionEnd = Date.now();
  // if (sessionStartTime) {
  //   const duration = sessionEnd - sessionStartTime;
  //   Chat.log(`&7Session duration: &f${Math.floor(duration / 60000)} minutes`);
  // }
}));

// You might want to track when you joined to calculate session duration
JsMacros.on("JoinServer", JavaWrapper.methodToJava((e) => {
  global.sessionStartTime = Date.now();
  Chat.log(`&aSession started at: &f${new Date().toLocaleString()}`);
}));
```

## Fields
- [event.reason](#eventreason)

## Methods
- [event.toString()](#eventtostring)

### event.reason
The reason for the disconnection.

**Type:** `string`

**Notes**
This contains the disconnect message provided by the server or client. Common reasons include:
- Connection timeout messages
- Kick messages from server administrators
- Server shutdown notifications
- Generic "Disconnected" messages

The exact content depends on why the disconnection occurred.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`