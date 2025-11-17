# PlayerLeave Event

This event is fired when a player leaves the server. Backed by class `EventPlayerLeave`.

## Signature
```js
JsMacros.on("PlayerLeave", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type                    | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| UUID   | string                  | The UUID of the leaving player           |
| player | PlayerListEntryHelper   | Helper object for the leaving player     |

## Behavior

* Fires when any player leaves the server (including yourself on disconnect)
- The `UUID` field contains the player's unique identifier
- The `player` field provides access to player information
- Not cancellable
- Useful for farewell messages, cleanup, and tracking

## Minimal example

```js
JsMacros.on("PlayerLeave", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`${e.player.getName()} left the server!`);
});
```

## Async example

```js
JsMacros.on("PlayerLeave", JavaWrapper.methodToJavaAsync((e) => {
  const player = e.player;
  const playerName = player.getName();
  const playerUUID = e.UUID;
  const currentTime = new Date().toLocaleString();

  Chat.log(`&cPlayer Left: &f${playerName}`);
  Chat.log(`&7UUID: &f${playerUUID.substring(0, 8)}...`);
  Chat.log(`&7Time: &f${currentTime}`);

  // Check if it's the local player
  const localPlayerName = Player.getPlayer().getName();
  if (playerName === localPlayerName) {
    Chat.log(`&6You have left the server, ${playerName}!`);
    Chat.actionbar(`&cYou have disconnected from the server`);

    // Clean up session data
    if (global.sessionStartTime) {
      const sessionDuration = Date.now() - global.sessionStartTime;
      const sessionMinutes = Math.floor(sessionDuration / 60000);
      Chat.log(`&7Session duration: &f${sessionMinutes} &7minutes`);
      delete global.sessionStartTime;
    }
  } else {
    // Handle other players leaving
    Chat.log(`&6${playerName} &fhas left the server!`);
    Chat.actionbar(`&c${playerName} &7left the server`);

    // Check if this was a friend
    if (isFriend(playerName)) {
      Chat.log(`&bYour friend ${playerName} has gone offline!`);
      Chat.actionbar(`&b👋 ${playerName} has left`);
    }

    // Check if this was staff
    if (isStaff(playerName)) {
      Chat.log(`&eStaff member ${playerName} has gone offline!`);
      Chat.actionbar(`&e🛡️ ${playerName} (Staff) has left`);
    }

    // Log farewell for known players
    if (shouldLogLeave(playerName)) {
      Chat.log(`&8[Leave Log] ${playerName} (${playerUUID.substring(0, 8)}...) left at ${currentTime}`);
    }
  }

  // Calculate play time if we tracked their join time
  const playTime = calculatePlayTime(playerName, playerUUID);
  if (playTime > 0) {
    const hours = Math.floor(playTime / 3600000);
    const minutes = Math.floor((playTime % 3600000) / 60000);

    if (hours > 0) {
      Chat.log(`&7Play time: &f${hours}h ${minutes}m`);
    } else {
      Chat.log(`&7Play time: &f${minutes} &7minutes`);
    }
  }

  // Clean up player-specific data
  cleanupPlayerData(playerName, playerUUID);

  // Update online player count
  updateOnlinePlayerCount();

  // Check if server is getting empty
  const playerCount = World.getPlayerCount();
  if (playerCount <= 2) {
    Chat.log(`&6Server is now quiet with only ${playerCount} players online`);
  }

  // Log for statistics
  updateLeaveStats(playerName, currentTime);
}));

function isFriend(playerName) {
  // Check against friends list
  const friends = ["Friend1", "Friend2", "Friend3"]; // Replace with actual friends list
  return friends.includes(playerName);
}

function isStaff(playerName) {
  // Check against staff list
  const staff = ["Admin", "Moderator", "Helper"]; // Replace with actual staff list
  return staff.some(staffMember => playerName.toLowerCase().includes(staffMember.toLowerCase()));
}

function calculatePlayTime(playerName, uuid) {
  // This would calculate the time the player was online
  // Implementation would depend on how you track join times
  // For example, if you stored join times in a map:
  const joinTime = global.playerJoinTimes && global.playerJoinTimes[uuid];
  if (joinTime) {
    const playTime = Date.now() - joinTime;
    delete global.playerJoinTimes[uuid]; // Clean up
    return playTime;
  }
  return 0;
}

function cleanupPlayerData(playerName, uuid) {
  // Clean up any tracked data for this player
  // This could include:
  // - Temporary markers
  // - Chat histories
  // - Interaction logs
  // - Custom tracking data

  if (global.playerData && global.playerData[uuid]) {
    delete global.playerData[uuid];
  }

  if (global.playerInteractions && global.playerInteractions[playerName]) {
    delete global.playerInteractions[playerName];
  }
}

function updateOnlinePlayerCount() {
  // Update and display current online player count
  const playerCount = World.getPlayerCount();
  Chat.log(`&7Players online: &f${playerCount}`);

  // Could also update a HUD element or external display
}

function shouldLogLeave(playerName) {
  // Define criteria for when to log leaves
  return isStaff(playerName) || isFriend(playerName);
}

function updateLeaveStats(playerName, currentTime) {
  // Update persistent statistics
  // Could track things like:
  // - Total leaves per day
  // - Peak online times
  // - Average session durations
  // - Player retention

  if (!global.leaveStats) {
    global.leaveStats = {};
  }

  const today = new Date().toDateString();
  if (!global.leaveStats[today]) {
    global.leaveStats[today] = 0;
  }

  global.leaveStats[today]++;
}

// Example companion function to track when players join
JsMacros.on("PlayerJoin", JavaWrapper.methodToJavaAsync((e) => {
  // Store join time for play time calculation
  if (!global.playerJoinTimes) {
    global.playerJoinTimes = {};
  }
  global.playerJoinTimes[e.UUID] = Date.now();
}));
```

## Fields
- [event.UUID](#eventuuid)
- [event.player](#eventplayer)

## Methods
- [event.toString()](#eventtostring)

### event.UUID
The unique identifier for the leaving player.

**Type:** `string`

**Notes**
This is the player's UUID in string format. This is more reliable than name for tracking players across name changes and for cleanup operations.

### event.player
A helper object for the leaving player.

**Type:** `PlayerListEntryHelper`

**Notes**
This provides access to player information like name, game mode, ping, display name, and other server-side player data at the time they left.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`