# PlayerListEntryHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`
**Since:** 1.0.2
**Extends:** `BaseHelper<PlayerListEntry>`

The `PlayerListEntryHelper` class provides access to player list entries from the server's player list (tab list). This class exposes information about players visible in the multiplayer tab list, including their profile data, connection status, game mode, and cosmetic information.

## Class Overview

PlayerListEntryHelper acts as a wrapper around Minecraft's `PlayerListEntry` class, making player list information accessible to JsMacros scripts. It's commonly used in events related to player joining/leaving, and for accessing tab list data.

You typically get instances of this class from:
- Events that provide player list information
- Methods that return player list data
- Manual iteration through the server's player list

## Available Methods

### Player Information

#### `getUUID()`
- **Since:** 1.1.9
- **Returns:** `String | null` - The player's UUID as a string, or `null` if unknown

Returns the unique identifier (UUID) of the player. This is a reliable way to identify players even if they change their username.

```javascript
// Example: Get player's UUID
const playerUUID = playerEntry.getUUID();
if (playerUUID) {
    console.log(`Player UUID: ${playerUUID}`);
}
```

#### `getName()`
- **Since:** 1.0.2
- **Returns:** `String | null` - The player's username, or `null` if unknown

Returns the display name of the player from their game profile.

```javascript
// Example: Get player name
const playerName = playerEntry.getName();
if (playerName) {
    console.log(`Player name: ${playerName}`);
}
```

### Connection Status

#### `getPing()`
- **Since:** 1.6.5
- **Returns:** `int` - The player's latency in milliseconds

Returns the player's network latency (ping) in milliseconds. Lower values indicate better connection quality.

```javascript
// Example: Check player's connection quality
const ping = playerEntry.getPing();
if (ping < 50) {
    console.log("Excellent connection");
} else if (ping < 150) {
    console.log("Good connection");
} else {
    console.log("Poor connection");
}
```

#### `getGamemode()`
- **Since:** 1.6.5
- **Returns:** `String | null` - The game mode name ("survival", "creative", "adventure", "spectator"), or `null` if unknown

Returns the current game mode of the player.

```javascript
// Example: Check player's game mode
const gamemode = playerEntry.getGamemode();
if (gamemode === "creative") {
    console.log("Player is in creative mode");
}
```

### Display Information

#### `getDisplayText()`
- **Since:** 1.1.9
- **Returns:** `TextHelper` - The custom display name or formatted name shown in the tab list

Returns the formatted display text as shown in the player list. This includes any custom formatting, prefixes, or suffixes applied by the server.

```javascript
// Example: Get formatted display text
const displayText = playerEntry.getDisplayText();
console.log(`Display text: ${displayText.getString()}`);
```

### Security Information

#### `getPublicKey()`
- **Since:** 1.8.2
- **Returns:** `byte[]` - The player's public key data as a byte array

Returns the public key data associated with the player's session. This is primarily used for secure chat features.

```javascript
// Example: Get public key data (advanced usage)
const publicKey = playerEntry.getPublicKey();
console.log(`Public key length: ${publicKey.length} bytes`);
```

### Cosmetic Information

#### `hasCape()`
- **Since:** 1.8.4
- **Returns:** `boolean` - `true` if the player has a cape enabled, `false` otherwise

Checks whether the player has an active cape cosmetic.

```javascript
// Example: Check if player has cape
if (playerEntry.hasCape()) {
    console.log("Player has a cape");
}
```

#### `hasSlimModel()`
- **Since:** 1.8.4
- **Returns:** `boolean` - `true` if the player uses a slim (Alex) skin model, `false` for default (Steve) model

Determines whether the player uses the slim skin model (Alex) or the default model (Steve).

```javascript
// Example: Check player's skin model
if (playerEntry.hasSlimModel()) {
    console.log("Player uses Alex skin model");
} else {
    console.log("Player uses Steve skin model");
}
```

#### `getSkinTexture()`
- **Since:** 1.8.4
- **Returns:** `String` - The identifier of the player's skin texture

Returns the texture identifier for the player's skin.

```javascript
// Example: Get skin texture identifier
const skinTexture = playerEntry.getSkinTexture();
console.log(`Skin texture: ${skinTexture}`);
```

#### `getSkinUrl()`
- **Since:** 1.9.0
- **Returns:** `String | null` - The URL of the player's skin texture, or `null` if unknown

Returns the direct URL to the player's skin texture file.

```javascript
// Example: Get skin URL
const skinUrl = playerEntry.getSkinUrl();
if (skinUrl) {
    console.log(`Skin URL: ${skinUrl}`);
}
```

#### `getCapeTexture()`
- **Since:** 1.8.4
- **Returns:** `String | null` - The identifier of the player's cape texture, or `null` if no cape

Returns the texture identifier for the player's cape, if they have one.

```javascript
// Example: Get cape texture
const capeTexture = playerEntry.getCapeTexture();
if (capeTexture) {
    console.log(`Cape texture: ${capeTexture}`);
}
```

#### `getElytraTexture()`
- **Since:** 1.8.4
- **Returns:** `String | null` - The identifier of the player's elytra texture, or `null` if unknown

Returns the texture identifier for the player's elytra, if applicable.

```javascript
// Example: Get elytra texture
const elytraTexture = playerEntry.getElytraTexture();
if (elytraTexture) {
    console.log(`Elytra texture: ${elytraTexture}`);
}
```

### Team Information

#### `getTeam()`
- **Since:** 1.8.4
- **Returns:** `TeamHelper | null` - The team the player belongs to, or `null` if not in a team

Returns a `TeamHelper` object containing information about the player's scoreboard team.

```javascript
// Example: Get player's team information
const team = playerEntry.getTeam();
if (team) {
    console.log(`Team name: ${team.getName()}`);
    console.log(`Team display: ${team.getDisplayName().getString()}`);
} else {
    console.log("Player is not in a team");
}
```

### Utility Methods

#### `toString()`
- **Returns:** `String` - A string representation of the player list entry

Returns a formatted string containing basic player information (UUID and name).

```javascript
// Example: Get string representation
console.log(playerEntry.toString());
// Output: PlayerListEntryHelper:{"uuid": "12345678-1234-1234-1234-123456789abc", "name": "PlayerName"}
```

## Usage Examples

### Basic Player Information
```javascript
// Get basic information about all players in the tab list
const playerList = World.getPlayers(); // Assuming this returns PlayerListEntryHelper array

playerList.forEach(playerEntry => {
    const name = playerEntry.getName();
    const uuid = playerEntry.getUUID();
    const ping = playerEntry.getPing();
    const gamemode = playerEntry.getGamemode();

    console.log(`${name} (${uuid}) - Ping: ${ping}ms, Mode: ${gamemode}`);
});
```

### Monitoring Player Connection Quality
```javascript
// Monitor players with high ping
function checkPlayerConnections() {
    const players = World.getPlayers();
    const highPingThreshold = 200;

    players.forEach(playerEntry => {
        const ping = playerEntry.getPing();
        const name = playerEntry.getName();

        if (ping > highPingThreshold) {
            console.log(`⚠️ ${name} has high ping: ${ping}ms`);
        }
    });
}
```

### Skin and Cosmetic Analysis
```javascript
// Analyze player cosmetics
function analyzePlayerCosmetics(playerEntry) {
    const name = playerEntry.getName();
    console.log(`Analyzing cosmetics for ${name}:`);

    // Skin model
    console.log(`- Skin model: ${playerEntry.hasSlimModel() ? "Alex (slim)" : "Steve (default)"}`);

    // Cape
    console.log(`- Has cape: ${playerEntry.hasCape()}`);
    if (playerEntry.hasCape()) {
        console.log(`- Cape texture: ${playerEntry.getCapeTexture()}`);
    }

    // Skin info
    console.log(`- Skin texture: ${playerEntry.getSkinTexture()}`);
    const skinUrl = playerEntry.getSkinUrl();
    if (skinUrl) {
        console.log(`- Skin URL: ${skinUrl}`);
    }
}
```

### Team-Based Operations
```javascript
// Group players by their teams
function groupPlayersByTeam() {
    const players = World.getPlayers();
    const teams = {};

    players.forEach(playerEntry => {
        const team = playerEntry.getTeam();
        const teamName = team ? team.getName() : "No Team";

        if (!teams[teamName]) {
            teams[teamName] = [];
        }

        teams[teamName].push(playerEntry.getName());
    });

    // Display team groups
    Object.entries(teams).forEach(([teamName, playerNames]) => {
        console.log(`${teamName}: ${playerNames.join(", ")}`);
    });
}
```

## Important Notes

### Null Values
Several methods can return `null` when the requested information is not available:
- `getUUID()` - returns `null` if the player's profile is unknown
- `getName()` - returns `null` if the player's profile is unknown
- `getGamemode()` - returns `null` if the game mode is unknown
- `getSkinUrl()` - returns `null` if the skin URL is unknown
- `getCapeTexture()` - returns `null` if the player has no cape
- `getElytraTexture()` - returns `null` if the elytra texture is unknown
- `getTeam()` - returns `null` if the player is not in a team

Always check for null values when using these methods.

### Security Information
The `getPublicKey()` method returns cryptographic data that should only be used for security-related operations and not for general scripting purposes.

### Performance Considerations
- Methods that access player list data are generally lightweight
- Avoid repeatedly calling these methods in tight loops
- Cache frequently accessed values when possible

### Version Compatibility
- Some methods were added in later versions (check the "Since" annotations)
- Ensure your target JSMacros version supports the methods you're using

## Related Classes

- **`TeamHelper`** - Provides access to team information when `getTeam()` returns a team
- **`TextHelper`** - Used for formatted text returned by `getDisplayText()`
- **`BaseHelper`** - Parent class providing common helper functionality

## Common Use Cases

1. **Player Monitoring** - Track player connections, ping, and game modes
2. **Server Statistics** - Collect data about online players
3. **Team Management** - Work with scoreboard teams and their members
4. **Cosmetic Detection** - Identify player skins, capes, and models
5. **Event Handling** - Process player join/leave events with detailed information
6. **Security Features** - Access player identity information for verification