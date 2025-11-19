# TeamHelper

## Overview

The `TeamHelper` class provides access to Minecraft scoreboard team information within JsMacros scripts. This class allows you to interact with teams, including retrieving team properties, member lists, colors, and visibility settings. Teams are typically used in multiplayer environments to group players and apply specific rules and formatting.

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`
**Since:** JsMacros 1.3.0
**Extends:** `BaseHelper<Team>`

## Accessing TeamHelper

You typically access TeamHelper instances through:

```javascript
// From the world's scoreboard
let team = World.getScoreboard().getTeam("team_name");
// or through team listings
let teams = World.getScoreboard().getTeams();
```

## Properties and Methods

### Basic Team Information

#### `getName()`
- **Returns:** `String` - The internal name of the team
- **Description:** Returns the raw team name used internally by Minecraft
- **Since:** 1.3.0

```javascript
let teamName = team.getName();
```

#### `getDisplayName()`
- **Returns:** `TextHelper` - The formatted display name of the team
- **Description:** Returns the team's display name with formatting codes preserved
- **Since:** 1.3.0

```javascript
let displayName = team.getDisplayName();
console.log("Team display: " + displayName.getString());
```

### Team Members

#### `getPlayerList()`
- **Returns:** `List<String>` - List of player names in this team
- **Description:** Returns an array list containing all players currently assigned to this team
- **Since:** 1.3.0

```javascript
let players = team.getPlayerList();
for (let player of players) {
    console.log("Team member: " + player);
}
```

### Team Colors

#### `getColorFormat()`
- **Returns:** `FormattingHelper` - The formatting helper for this team's color
- **Description:** Returns a FormattingHelper object containing the team's color formatting information
- **Since:** 1.8.4

```javascript
let colorFormat = team.getColorFormat();
console.log("Color code: " + colorFormat.getCode());
```

#### `getColorIndex()`
- **Returns:** `int` - The color index of this team
- **Description:** Returns the numeric color index used by Minecraft's formatting system
- **Since:** 1.8.4

```javascript
let colorIndex = team.getColorIndex();
```

#### `getColorValue()`
- **Returns:** `int` - The RGB color value for this team, or -1 if no color
- **Description:** Returns the actual RGB color value, or -1 if the team has no specific color
- **Since:** 1.8.4

```javascript
let colorValue = team.getColorValue();
if (colorValue !== -1) {
    console.log("Team RGB color: " + colorValue.toString(16));
}
```

#### `getColorName()`
- **Returns:** `String` - The name of this team's color
- **Description:** Returns the color name (e.g., "red", "blue", "gold")
- **Return Type:** `FormattingColorName`
- **Since:** 1.8.4

```javascript
let colorName = team.getColorName();
console.log("Team color: " + colorName);
```

#### `getColor()` ⚠️ **Deprecated**
- **Returns:** `int` - The color index of this team
- **Description:** Deprecated method that returns the same value as `getColorIndex()`
- **Deprecated Since:** 1.8.4 - Use `getColorIndex()` instead

### Scoreboard Access

#### `getScoreboard()`
- **Returns:** `ScoreboardsHelper` - The scoreboard that includes this team
- **Description:** Returns the ScoreboardsHelper object for the scoreboard containing this team
- **Since:** 1.8.4

```javascript
let scoreboard = team.getScoreboard();
let allTeams = scoreboard.getTeams();
```

### Team Formatting

#### `getPrefix()`
- **Returns:** `TextHelper` - The team's prefix text
- **Description:** Returns the prefix that appears before team member names
- **Since:** 1.3.0

```javascript
let prefix = team.getPrefix();
console.log("Team prefix: " + prefix.getString());
```

#### `getSuffix()`
- **Returns:** `TextHelper` - The team's suffix text
- **Description:** Returns the suffix that appears after team member names
- **Since:** 1.3.0

```javascript
let suffix = team.getSuffix();
console.log("Team suffix: " + suffix.getString());
```

### Team Rules and Visibility

#### `getCollisionRule()`
- **Returns:** `String` - The collision rule for team members
- **Description:** Returns how team members can collide with each other
- **Return Type:** `TeamCollisionRule`
- **Possible Values:** `"always"`, `"never"`, `"pushOtherTeams"`, `"pushOwnTeam"`
- **Since:** 1.3.0

```javascript
let collisionRule = team.getCollisionRule();
if (collisionRule === "never") {
    console.log("Team members don't collide");
}
```

#### `isFriendlyFire()`
- **Returns:** `boolean` - Whether friendly fire is allowed
- **Description:** Returns true if team members can damage each other
- **Since:** 1.3.0

```javascript
if (team.isFriendlyFire()) {
    console.log("Friendly fire is enabled for this team");
}
```

#### `showFriendlyInvisibles()`
- **Returns:** `boolean` - Whether invisible teammates are visible
- **Description:** Returns true if team members can see invisible teammates
- **Since:** 1.3.0

```javascript
if (team.showFriendlyInvisibles()) {
    console.log("Invisible teammates are visible");
}
```

#### `nametagVisibility()`
- **Returns:** `String` - The nametag visibility rule
- **Description:** Returns how team member nametags are displayed
- **Return Type:** `TeamVisibilityRule`
- **Possible Values:** `"always"`, `"never"`, `"hideForOtherTeams"`, `"hideForOwnTeam"`
- **Since:** 1.3.0

```javascript
let nametagVisibility = team.nametagVisibility();
if (nametagVisibility === "hideForOtherTeams") {
    console.log("Nametags hidden from other teams");
}
```

#### `deathMessageVisibility()`
- **Returns:** `String` - The death message visibility rule
- **Description:** Returns how death messages for team members are displayed
- **Return Type:** `TeamVisibilityRule`
- **Possible Values:** `"always"`, `"never"`, `"hideForOtherTeams"`, `"hideForOwnTeam"`
- **Since:** 1.3.0

```javascript
let deathVisibility = team.deathMessageVisibility();
if (deathVisibility === "always") {
    console.log("Death messages always shown");
}
```

### Utility Methods

#### `toString()`
- **Returns:** `String` - String representation of the team
- **Description:** Returns a formatted string containing basic team information
- **Override:** Yes

```javascript
let teamString = team.toString();
// Output example: TeamHelper:{"name": "§6Red Team"}
```

## Usage Examples

### Basic Team Information
```javascript
// Get a specific team
let scoreboard = World.getScoreboard();
let team = scoreboard.getTeam("red");

if (team) {
    console.log("Team Name: " + team.getName());
    console.log("Display Name: " + team.getDisplayName().getString());
    console.log("Color: " + team.getColorName());
    console.log("Members: " + team.getPlayerList().length);
} else {
    console.log("Team not found");
}
```

### Team Analysis
```javascript
function analyzeTeam(teamName) {
    let team = World.getScoreboard().getTeam(teamName);
    if (!team) return "Team not found";

    let info = {
        name: team.getDisplayName().getString(),
        color: team.getColorName(),
        members: team.getPlayerList(),
        friendlyFire: team.isFriendlyFire(),
        prefix: team.getPrefix().getString(),
        suffix: team.getSuffix().getString()
    };

    return info;
}

let teamInfo = analyzeTeam("red");
console.log(JSON.stringify(teamInfo, null, 2));
```

### Team Member Management
```javascript
function listTeamMembers(teamName) {
    let team = World.getScoreboard().getTeam(teamName);
    if (!team) return null;

    let members = team.getPlayerList();
    let prefix = team.getPrefix().getString();
    let suffix = team.getSuffix().getString();

    console.log(`Team: ${team.getDisplayName().getString()}`);
    console.log(`Members (${members.length}):`);

    for (let member of members) {
        let displayName = prefix + member + suffix;
        console.log(`  - ${displayName}`);
    }

    return members;
}
```

### Team Color Information
```javascript
function getTeamColorInfo(teamName) {
    let team = World.getScoreboard().getTeam(teamName);
    if (!team) return null;

    return {
        colorName: team.getColorName(),
        colorIndex: team.getColorIndex(),
        colorValue: team.getColorValue(),
        formatCode: team.getColorFormat().getCode()
    };
}
```

### Team Rules Check
```javascript
function checkTeamRules(teamName) {
    let team = World.getScoreboard().getTeam(teamName);
    if (!team) return null;

    return {
        friendlyFire: team.isFriendlyFire(),
        collisionRule: team.getCollisionRule(),
        nametagVisibility: team.nametagVisibility(),
        deathMessageVisibility: team.deathMessageVisibility(),
        showFriendlyInvisibles: team.showFriendlyInvisibles()
    };
}
```

## Important Notes

1. **Team Existence:** Always check if a team exists before accessing its properties, as the team might not be present in the current scoreboard.

2. **Null Returns:** Some methods like `getColorValue()` can return -1 to indicate no color is set.

3. **TextHelper Objects:** Methods returning `TextHelper` objects contain rich text formatting. Use `.getString()` to get the plain text representation.

4. **Team Rules:** Team rules (collision, visibility, etc.) are server-side configurations and may vary between different servers or game modes.

5. **Performance:** When working with multiple teams, cache the results to avoid repeated scoreboard lookups.

6. **Multi-threading:** Team operations are thread-safe but should be performed on the main thread when possible for consistency.

## Related Classes

- `ScoreboardsHelper` - Access to the scoreboard containing teams
- `TextHelper` - For handling formatted text from team names
- `FormattingHelper` - For color and formatting information
- `BaseHelper<Team>` - Base class providing core functionality

## Version History

- **1.3.0:** Initial release with basic team functionality
- **1.8.4:** Added comprehensive color methods and scoreboard access
- **Deprecated:** `getColor()` method in favor of `getColorIndex()`