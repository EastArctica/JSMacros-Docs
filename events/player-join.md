# PlayerJoin Event

This event is fired when a player joins the server. Backed by class `EventPlayerJoin`.

## Signature
```js
JsMacros.on("PlayerJoin", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type                    | Description                              |
| ------ | ----------------------- | ---------------------------------------- |
| UUID   | string                  | The UUID of the joining player           |
| player | PlayerListEntryHelper   | Helper object for the joining player     |

## Behavior

* Fires when any player joins the server (including yourself on some servers)
- The `UUID` field contains the player's unique identifier
- The `player` field provides access to player information
- Not cancellable
- Useful for welcome messages, player tracking, and moderation

## Minimal example

```js
JsMacros.on("PlayerJoin", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`${e.player.getName()} joined the server!`);
});
```

## Async example

```js
JsMacros.on("PlayerJoin", JavaWrapper.methodToJavaAsync((e) => {
  const player = e.player;
  const playerName = player.getName();
  const playerUUID = e.UUID;
  const currentTime = new Date().toLocaleString();

  Chat.log(`&aPlayer Joined: &f${playerName}`);
  Chat.log(`&7UUID: &f${playerUUID.substring(0, 8)}...`);
  Chat.log(`&7Time: &f${currentTime}`);

  // Check if it's the local player
  const localPlayerName = Player.getPlayer().getName();
  if (playerName === localPlayerName) {
    Chat.log(`&6Welcome back, ${playerName}!`);
    Chat.actionbar(`&aYou have rejoined the server!`);
  } else {
    // Welcome other players
    Chat.log(`&6Welcome to the server, ${playerName}!`);
    Chat.actionbar(`&a${playerName} &7joined the server!`);

    // Check if this player is on a friends list
    if (isFriend(playerName)) {
      Chat.log(`&bYour friend ${playerName} is online!`);
      Chat.actionbar(`&b👋 ${playerName} is here!`);
    }

    // Check if this player is on an ignore/block list
    if (isIgnored(playerName)) {
      Chat.log(`&cIgnored player ${playerName} joined the server.`);
      // Could mute their join messages or handle differently
    }

    // Check for staff members
    if (isStaff(playerName)) {
      Chat.log(`&eStaff member ${playerName} is online!`);
      Chat.actionbar(`&e🛡️ Staff online: ${playerName}`);
    }
  }

  // Get player stats and information
  const gameMode = player.getGameMode();
  const ping = player.getPing();

  Chat.log(`&7Game Mode: &f${gameMode}`);
  Chat.log(`&7Ping: &f${ping}ms`);

  if (ping > 200) {
    Chat.log(`&6${playerName} &7has high ping (&c${ping}ms&7)`);
  }

  // Check player rank/permissions if available
  const displayName = player.getDisplayName();
  if (displayName && displayName !== playerName) {
    Chat.log(`&7Display Name: &f${displayName}`);
    const rank = extractRank(displayName);
    if (rank) {
      Chat.log(`&7Rank: &f${rank}`);
    }
  }

  // Track player statistics
  updatePlayerStats(playerName, playerUUID, "join");

  // Log for moderation purposes
  if (shouldLogJoin(playerName)) {
    Chat.log(`&8[Join Log] ${playerName} (${playerUUID.substring(0, 8)}...) joined at ${currentTime}`);
  }

  // Check for suspicious players
  if (isSuspiciousPlayer(playerName)) {
    Chat.log(`&c⚠ Suspicious player detected: ${playerName}`);
    Chat.log(`&cUUID: ${playerUUID}`);
    // Additional monitoring could be added here
  }

  // Send welcome message (if enabled)
  if (shouldSendWelcome(playerName)) {
    Chat.log(`&eWelcome ${playerName} to the server! Enjoy your stay! 🎉`);
  }
}));

function isFriend(playerName) {
  // Check against friends list
  const friends = ["Friend1", "Friend2", "Friend3"]; // Replace with actual friends list
  return friends.includes(playerName);
}

function isIgnored(playerName) {
  // Check against ignored players list
  const ignored = ["AnnoyingPlayer1", "Spammer123"]; // Replace with actual ignore list
  return ignored.includes(playerName);
}

function isStaff(playerName) {
  // Check against staff list
  const staff = ["Admin", "Moderator", "Helper"]; // Replace with actual staff list
  return staff.some(staffMember => playerName.toLowerCase().includes(staffMember.toLowerCase()));
}

function extractRank(displayName) {
  // Extract rank from display name like [Admin] PlayerName
  const rankMatch = displayName.match(/^\[([^\]]+)\]/);
  return rankMatch ? rankMatch[1] : null;
}

function updatePlayerStats(playerName, uuid, action) {
  // This would update persistent player tracking
  // Could store join/leave times, play sessions, etc.
  // Example implementation would depend on your storage system
}

function shouldLogJoin(playerName) {
  // Define criteria for when to log joins
  return isStaff(playerName) || isSuspiciousPlayer(playerName);
}

function isSuspiciousPlayer(playerName) {
  // Define suspicious patterns
  const suspiciousPatterns = [
    /\d{3,}/, // Lots of numbers
    /[^a-zA-Z0-9_]/, // Special characters
    /admin/i, // Admin impersonation
    /moderator/i, // Mod impersonation
    /owner/i, // Owner impersonation
  ];

  return suspiciousPatterns.some(pattern => pattern.test(playerName));
}

function shouldSendWelcome(playerName) {
  // Define when to send automatic welcome messages
  return !isIgnored(playerName) && !isSuspiciousPlayer(playerName);
}
```

## Fields
- [event.UUID](#eventuuid)
- [event.player](#eventplayer)

## Methods
- [event.toString()](#eventtostring)

### event.UUID
The unique identifier for the joining player.

**Type:** `string`

**Notes**
This is the player's UUID in string format. This is more reliable than name for tracking players across name changes.

### event.player
A helper object for the joining player.

**Type:** `PlayerListEntryHelper`

**Notes**
This provides access to player information like name, game mode, ping, display name, and other server-side player data.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`