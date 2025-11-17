# JoinServer Event

This event is fired when the player successfully joins a server. Backed by class `EventJoinServer`.

## Signature
```js
JsMacros.on("JoinServer", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type                     | Description                              |
| ------ | ------------------------ | ---------------------------------------- |
| player | ClientPlayerEntityHelper | The player instance                      |
| address | string                   | The server address                       |

## Behavior

* Fires when the player successfully connects to a server
- The `player` field contains player information
- The `address` field contains the server IP/domain
- Not cancellable
- Good for server-specific configurations and greetings

## Minimal example

```js
JsMacros.on("JoinServer", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Joined server: ${e.address}`);
});
```

## Async example

```js
JsMacros.on("JoinServer", JavaWrapper.methodToJavaAsync((e) => {
  const player = e.player;
  const serverAddress = e.address;
  const playerName = player.getName();
  const currentTime = new Date().toLocaleString();

  Chat.log(`&aSuccessfully joined server!`);
  Chat.log(`&7Player: &f${playerName}`);
  Chat.log(`&7Server: &f${serverAddress}`);
  Chat.log(`&7Time: &f${currentTime}`);

  // Server-specific configurations
  if (serverAddress.includes("hypixel")) {
    Chat.log(`&6Welcome to Hypixel!`);
    Chat.actionbar(`&6Welcome to Hypixel, ${playerName}!`);
    // enableHypixelFeatures();
  } else if (serverAddress.includes("2b2t")) {
    Chat.log(`&cWelcome to 2b2t! Be careful out there!`);
    Chat.actionbar(`&4Welcome to 2b2t!`);
    // enable2b2tFeatures();
  } else if (serverAddress.includes("mineplex") || serverAddress.includes("cubecraft")) {
    Chat.log(`&bWelcome to ${serverAddress.split('.')[0]}!`);
    Chat.actionbar(`&bWelcome to the server!`);
  } else if (serverAddress.includes("localhost") || serverAddress.includes("127.0.0.1")) {
    Chat.log(`&2Welcome to your local server!`);
    Chat.actionbar(`&2Local world loaded!`);
    // enableLocalFeatures();
  } else {
    Chat.log(`&aWelcome to the server!`);
    Chat.actionbar(`&aWelcome!`);
  }

  // Log session start
  global.sessionStartTime = Date.now();
  global.sessionServer = serverAddress;
  Chat.log(`&eSession started at: &f${currentTime}`);

  // Check player health and status
  const health = player.getHealth();
  const maxHealth = player.getMaxHealth();
  const food = player.getHunger();

  Chat.log(`&7Status: &fHealth: ${health}/${maxHealth} &7- &fHunger: ${food}/20`);

  if (health < maxHealth) {
    Chat.log(`&cWarning: You joined with damaged health!`);
  }

  if (food < 20) {
    Chat.log(`&eWarning: You joined while hungry!`);
  }

  // Server greeting
  Chat.log(`&6Hello ${playerName}, enjoy your time on ${serverAddress}!`);

  // Enable server-specific settings
  // applyServerSettings(serverAddress);

  // Check for spawn protection
  setTimeout(() => {
    const currentPos = player.getPos();
    Chat.log(`&7Spawn position: &f[${Math.floor(currentPos.x)}, ${Math.floor(currentPos.y)}, ${Math.floor(currentPos.z)}]`);
  }, 2000);
}));
```

## Fields
- [event.player](#eventplayer)
- [event.address](#eventaddress)

## Methods
- [event.toString()](#eventtostring)

### event.player
A helper object for the client player entity.

**Type:** `ClientPlayerEntityHelper`

**Notes**
This provides access to player information like name, health, hunger, position, inventory, etc. You can use this to check the player's status when joining the server.

### event.address
The address of the server the player joined.

**Type:** `string`

**Notes**
This contains the server IP address or domain name. For local servers, this might be "localhost" or "127.0.0.1". This can be used to apply server-specific configurations or greetings.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`