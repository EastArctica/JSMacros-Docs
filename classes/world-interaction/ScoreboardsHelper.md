# ScoreboardsHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`
**Since:** 1.2.9
**Author:** Wagyourtail

## Overview

The `ScoreboardsHelper` class provides a comprehensive interface for interacting with Minecraft's scoreboard system in JsMacros scripts. This class serves as the main entry point for accessing scoreboard objectives, teams, player team information, and display slots. It's particularly useful for scripts that need to monitor scoreboards, track team information, or work with competitive multiplayer features.

This class extends `BaseHelper<Scoreboard>` and wraps Minecraft's internal `Scoreboard` functionality, making it accessible to GraalJS scripts. It acts as a gateway to both scoreboard objectives and team management functionality.

## How to Access

You typically obtain a `ScoreboardsHelper` instance through the world helper or client context:

```javascript
// Access the scoreboard helper through the world context
const scoreboards = world.getScoreboards();

// Or access it directly through client context in some cases
const scoreboards = client.getScoreboards();
```

## Available Methods

### getObjectiveForTeamColorIndex()

**Signature:** `ScoreboardObjectiveHelper getObjectiveForTeamColorIndex(int index)`

**Description:** Returns the scoreboard objective displayed in the slot corresponding to the specified team color index. This is primarily used for team-colored sidebars in competitive modes.

**Parameters:**
- `index` (int): The team color index (0-based). Must be >= 0.

**Returns:** `ScoreboardObjectiveHelper` - The objective for the specified team color index, or `null` if no objective exists.

**Since:** 1.2.9

**Example:**
```javascript
const scoreboards = world.getScoreboards();
const teamObjective = scoreboards.getObjectiveForTeamColorIndex(0); // Dark gray team
if (teamObjective) {
    console.log("Team objective found:", teamObjective.getName());
}
```

### getObjectiveSlot()

**Signature:** `ScoreboardObjectiveHelper getObjectiveSlot(int slot)`

**Description:** Returns the scoreboard objective displayed in the specified display slot. Different slots show scoreboards in different locations (tab list, sidebar, below name).

**Parameters:**
- `slot` (int): The display slot number. Valid values:
  - `0`: Tab list
  - `1`: Sidebar (main display)
  - `2`: Below name
  - `3-18`: Team-colored sidebars (corresponding to team colors + 3)
  - Maximum slot number is 18

**Returns:** `ScoreboardObjectiveHelper` - The objective for the specified slot, or `null` if no objective exists.

**Since:** 1.2.9

**Example:**
```javascript
const scoreboards = world.getScoreboards();

// Get sidebar objective
const sidebar = scoreboards.getObjectiveSlot(1);
if (sidebar) {
    console.log("Sidebar objective:", sidebar.getDisplayName().getString());
}

// Get tab list objective
const tabList = scoreboards.getObjectiveSlot(0);
if (tabList) {
    console.log("Tab list objective:", tabList.getName());
}

// Get below name objective
const belowName = scoreboards.getObjectiveSlot(2);
if (belowName) {
    console.log("Below name objective:", belowName.getName());
}
```

### getPlayerTeamColorIndex()

**Signature (Overload 1):** `int getPlayerTeamColorIndex(PlayerEntityHelper<PlayerEntity> entity)`

**Description:** Returns the team color index for the specified player entity.

**Parameters:**
- `entity` (PlayerEntityHelper): The player entity to get the team color index for.

**Returns:** `int` - The team color index (0-15), or -1 if the player is not in a team.

**Since:** 1.2.9

**Signature (Overload 2):** `int getPlayerTeamColorIndex()`

**Description:** Returns the team color index for the client player.

**Returns:** `int` - The team color index (0-15), or -1 if the client player is not in a team.

**Since:** 1.6.5

**Example:**
```javascript
const scoreboards = world.getScoreboards();
const player = world.getPlayer();

// Get team color index for a specific player
const teamIndex = scoreboards.getPlayerTeamColorIndex(player);
if (teamIndex !== -1) {
    console.log(`Player is in team with color index: ${teamIndex}`);
    const teamObjective = scoreboards.getObjectiveForTeamColorIndex(teamIndex);
    if (teamObjective) {
        console.log("Team objective:", teamObjective.getName());
    }
}

// Get team color index for client player
const myTeamIndex = scoreboards.getPlayerTeamColorIndex();
console.log("My team color index:", myTeamIndex);
```

### getTeamColorFormatting()

**Signature (Overload 1):** `FormattingHelper getTeamColorFormatting()`

**Description:** Returns the formatting code for the client player's team color.

**Returns:** `FormattingHelper` - The team color formatting, or `null` if the client player is not in a team.

**Since:** 1.8.4

**Signature (Overload 2):** `FormattingHelper getTeamColorFormatting(PlayerEntityHelper<PlayerEntity> player)`

**Description:** Returns the formatting code for the specified player's team color.

**Parameters:**
- `player` (PlayerEntityHelper): The player to get the team color formatting for.

**Returns:** `FormattingHelper` - The team color formatting, or `null` if the player is not in a team.

**Since:** 1.8.4

**Example:**
```javascript
const scoreboards = world.getScoreboards();

// Get client player's team formatting
const myFormatting = scoreboards.getTeamColorFormatting();
if (myFormatting) {
    console.log("My team color code:", myFormatting.toString());
    console.log("Team color name:", myFormatting.getName());
}

// Get another player's team formatting
const player = world.getClosestPlayer();
if (player) {
    const playerFormatting = scoreboards.getTeamColorFormatting(player);
    if (playerFormatting) {
        console.log(`${player.getName()}'s team color:`, playerFormatting.getName());
    }
}
```

### getTeamColor()

**Signature (Overload 1):** `int getTeamColor()`

**Description:** Returns the color value of the client player's team.

**Returns:** `int` - The RGB color value of the team, or -1 if the client player is not in a team.

**Since:** 1.8.4

**Signature (Overload 2):** `int getTeamColor(PlayerEntityHelper<PlayerEntity> player)`

**Description:** Returns the color value of the specified player's team.

**Parameters:**
- `player` (PlayerEntityHelper): The player to get the team color for.

**Returns:** `int` - The RGB color value of the team, or -1 if the player is not in a team.

**Since:** 1.8.4

**Example:**
```javascript
const scoreboards = world.getScoreboards();

// Get client player's team color as RGB value
const myColor = scoreboards.getTeamColor();
if (myColor !== -1) {
    console.log("My team RGB color:", myColor);
}

// Check all nearby players' team colors
const players = world.getPlayers();
players.forEach(player => {
    const teamColor = scoreboards.getTeamColor(player);
    if (teamColor !== -1) {
        console.log(`${player.getName()} is on team with color: ${teamColor}`);
    }
});
```

### getTeamColorName()

**Signature (Overload 1):** `String getTeamColorName()`

**Description:** Returns the name of the client player's team color.

**Returns:** `String` - The team color name (e.g., "red", "blue", "gold"), or `null` if the client player is not in a team.

**Since:** 1.8.4

**Signature (Overload 2):** `String getTeamColorName(PlayerEntityHelper<PlayerEntity> player)`

**Description:** Returns the name of the specified player's team color.

**Parameters:**
- `player` (PlayerEntityHelper): The player to get the team color name for.

**Returns:** `String` - The team color name, or `null` if the player is not in a team.

**Since:** 1.8.4

**Example:**
```javascript
const scoreboards = world.getScoreboards();

// Get client player's team color name
const myColorName = scoreboards.getTeamColorName();
if (myColorName) {
    console.log("I'm on the", myColorName, "team");
}

// Get team color names for all nearby players
const players = world.getPlayers();
players.forEach(player => {
    const colorName = scoreboards.getTeamColorName(player);
    if (colorName) {
        console.log(`${player.getName()} is on the ${colorName} team`);
    } else {
        console.log(`${player.getName()} is not on a team`);
    }
});
```

### getTeams()

**Signature:** `List<TeamHelper> getTeams()`

**Description:** Returns a list of all teams currently registered in the scoreboard system.

**Returns:** `List<TeamHelper>` - A list of all teams as TeamHelper objects.

**Since:** 1.3.0

**Example:**
```javascript
const scoreboards = world.getScoreboards();
const teams = scoreboards.getTeams();

console.log(`Total teams: ${teams.length}`);
teams.forEach(team => {
    console.log(`Team: ${team.getName()}`);
    console.log(`Display: ${team.getDisplayName().getString()}`);
    console.log(`Players: ${team.getPlayerList().join(", ")}`);
});
```

### getPlayerTeam()

**Signature (Overload 1):** `TeamHelper getPlayerTeam()`

**Description:** Returns the team for the client player.

**Returns:** `TeamHelper` - The client player's team as a TeamHelper object.

**Since:** 1.6.5

**Signature (Overload 2):** `TeamHelper getPlayerTeam(PlayerEntityHelper<PlayerEntity> p)`

**Description:** Returns the team for the specified player.

**Parameters:**
- `p` (PlayerEntityHelper): The player to get the team for.

**Returns:** `TeamHelper` - The player's team as a TeamHelper object.

**Since:** 1.3.0

**Example:**
```javascript
const scoreboards = world.getScoreboards();

// Get client player's team
const myTeam = scoreboards.getPlayerTeam();
console.log("My team:", myTeam.getName());
console.log("My team members:", myTeam.getPlayerList().join(", "));

// Get a specific player's team
const player = world.getClosestPlayer();
if (player) {
    const playerTeam = scoreboards.getPlayerTeam(player);
    console.log(`${player.getName()}'s team:`, playerTeam.getName());

    // Check if we're on the same team
    if (playerTeam.getName() === myTeam.getName()) {
        console.log("We're on the same team!");
    }
}
```

### getCurrentScoreboard()

**Signature:** `ScoreboardObjectiveHelper getCurrentScoreboard()`

**Description:** Returns the scoreboard objective that is currently displayed on the sidebar. This method intelligently selects between team-colored objectives and the main sidebar objective based on the client player's team.

**Returns:** `ScoreboardObjectiveHelper` - The currently displayed sidebar objective, or `null` if no sidebar is active.

**Since:** 1.2.9

**Example:**
```javascript
const scoreboards = world.getScoreboards();
const currentScoreboard = scoreboards.getCurrentScoreboard();

if (currentScoreboard) {
    console.log("Current sidebar:", currentScoreboard.getDisplayName().getString());

    // Get all scores from the current sidebar
    const scores = currentScoreboard.getPlayerScores();
    console.log("Scores on display:");
    for (const [player, score] of scores) {
        console.log(`  ${player}: ${score}`);
    }
} else {
    console.log("No sidebar currently active");
}
```

### toString()

**Signature:** `String toString()`

**Description:** Returns a string representation of the ScoreboardsHelper, including information about the current scoreboard.

**Returns:** `String` - A formatted string representation of the scoreboard state.

**Example:**
```javascript
const scoreboards = world.getScoreboards();
console.log(scoreboards.toString());
// Output: ScoreboardsHelper:{"current": ScoreboardObjectiveHelper:{"name": "kills", "displayName": "§6Kills"}}
```

## Usage Examples

### Team Management and Analysis

```javascript
// Analyze team composition and colors
function analyzeTeams() {
    const scoreboards = world.getScoreboards();
    const teams = scoreboards.getTeams();

    console.log("=== Team Analysis ===");
    teams.forEach(team => {
        const teamName = team.getName();
        const displayName = team.getDisplayName().getString();
        const players = team.getPlayerList();

        console.log(`\nTeam: ${teamName} (${displayName})`);
        console.log(`Members: ${players.length}`);

        // Analyze each team member
        players.forEach(playerName => {
            const player = world.getPlayer(playerName);
            if (player) {
                const colorIndex = scoreboards.getPlayerTeamColorIndex(player);
                const colorName = scoreboards.getTeamColorName(player);
                console.log(`  ${playerName}: Color ${colorName} (${colorIndex})`);
            }
        });
    });
}
```

### Scoreboard Monitoring with Team Context

```javascript
// Monitor scoreboards with team information
function monitorScoreboardsWithTeams() {
    const scoreboards = world.getScoreboards();
    const currentScoreboard = scoreboards.getCurrentScoreboard();

    if (!currentScoreboard) {
        console.log("No active scoreboard");
        return;
    }

    console.log(`=== ${currentScoreboard.getDisplayName().getString()} ===`);

    // Get all scores
    const scores = currentScoreboard.getPlayerScores();

    // Group scores by team
    const teams = {};
    const players = world.getPlayers();

    // Pre-calculate team information
    players.forEach(player => {
        const team = scoreboards.getPlayerTeam(player);
        const playerName = player.getName();

        if (!teams[team.getName()]) {
            teams[team.getName()] = {
                members: [],
                colorName: scoreboards.getTeamColorName(player),
                totalScore: 0
            };
        }

        teams[team.getName()].members.push(playerName);

        if (scores.has(playerName)) {
            teams[team.getName()].totalScore += scores.get(playerName);
        }
    });

    // Display team-based information
    for (const [teamName, teamData] of Object.entries(teams)) {
        console.log(`\n${teamData.colorName} ${teamName} Team:`);
        console.log(`  Total Score: ${teamData.totalScore}`);
        console.log(`  Members: ${teamData.members.join(", ")}`);

        // Show individual scores for this team
        teamData.members.forEach(member => {
            if (scores.has(member)) {
                console.log(`    ${member}: ${scores.get(member)}`);
            }
        });
    }
}
```

### Team-colored Scoreboard Detection

```javascript
// Detect and display team-colored scoreboards
function detectTeamScoreboards() {
    const scoreboards = world.getScoreboards();
    const myTeamIndex = scoreboards.getPlayerTeamColorIndex();

    console.log("=== Team-colored Scoreboards ===");

    // Check all team color slots
    for (let i = 0; i < 16; i++) {
        const teamObjective = scoreboards.getObjectiveForTeamColorIndex(i);
        if (teamObjective) {
            const colorName = scoreboards.getTeamColorName();
            const isMyTeam = (i === myTeamIndex);

            console.log(`Team ${i} (${colorName}): ${teamObjective.getName()} ${isMyTeam ? "(MY TEAM)" : ""}`);

            if (isMyTeam) {
                const scores = teamObjective.getPlayerScores();
                console.log("  Team Scores:");
                for (const [player, score] of scores) {
                    console.log(`    ${player}: ${score}`);
                }
            }
        }
    }
}
```

### Player Team Change Detection

```javascript
// Detect when players change teams
let previousTeamStates = new Map();

function detectTeamChanges() {
    const scoreboards = world.getScoreboards();
    const players = world.getPlayers();
    const currentStates = new Map();
    const changes = [];

    players.forEach(player => {
        const playerName = player.getName();
        const team = scoreboards.getPlayerTeam(player);
        const teamName = team.getName();
        const colorName = scoreboards.getTeamColorName(player);

        currentStates.set(playerName, { team: teamName, color: colorName });

        const previous = previousTeamStates.get(playerName);
        if (!previous) {
            changes.push(`${playerName} joined ${colorName} ${teamName} team`);
        } else if (previous.team !== teamName) {
            changes.push(`${playerName} switched from ${previous.color} ${previous.team} to ${colorName} ${teamName}`);
        }
    });

    // Check for players who left
    for (const [playerName, previous] of previousTeamStates) {
        if (!currentStates.has(playerName)) {
            changes.push(`${playerName} left the server (${previous.color} ${previous.team})`);
        }
    }

    // Report changes
    if (changes.length > 0) {
        console.log("=== Team Changes ===");
        changes.forEach(change => console.log(change));
    }

    // Update for next check
    previousTeamStates = currentStates;
}
```

### Competitive Game Analysis

```javascript
// Comprehensive competitive game analysis
function analyzeCompetitiveGame() {
    const scoreboards = world.getScoreboards();
    const currentScoreboard = scoreboards.getCurrentScoreboard();
    const myTeam = scoreboards.getPlayerTeam();
    const myTeamIndex = scoreboards.getPlayerTeamColorIndex();

    if (!currentScoreboard) {
        console.log("No active competitive scoreboard");
        return;
    }

    console.log(`=== Competitive Game Analysis ===`);
    console.log(`Objective: ${currentScoreboard.getDisplayName().getString()}`);
    console.log(`My Team: ${scoreboards.getTeamColorName()} ${myTeam.getName()}`);

    // Get all scores
    const scores = currentScoreboard.getPlayerScores();

    // Analyze team performance
    const teamStats = {};
    const allPlayers = world.getPlayers();

    allPlayers.forEach(player => {
        const team = scoreboards.getPlayerTeam(player);
        const teamName = team.getName();
        const playerName = player.getName();

        if (!teamStats[teamName]) {
            teamStats[teamName] = {
                players: [],
                totalScore: 0,
                isMyTeam: teamName === myTeam.getName(),
                colorName: scoreboards.getTeamColorName(player)
            };
        }

        teamStats[teamName].players.push(playerName);

        if (scores.has(playerName)) {
            teamStats[teamName].totalScore += scores.get(playerName);
        }
    });

    // Sort teams by score
    const sortedTeams = Object.entries(teamStats)
        .sort((a, b) => b[1].totalScore - a[1].totalScore);

    console.log("\n=== Team Rankings ===");
    sortedTeams.forEach(([teamName, stats], index) => {
        const position = index + 1;
        const marker = stats.isMyTeam ? " <-- MY TEAM" : "";
        console.log(`${position}. ${stats.colorName} ${teamName}: ${stats.totalScore} points${marker}`);

        // Show top performers in each team
        const teamMembers = stats.players
            .filter(name => scores.has(name))
            .map(name => ({ name, score: scores.get(name) }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        if (teamMembers.length > 0) {
            console.log(`   Top players: ${teamMembers.map(p => `${p.name} (${p.score})`).join(", ")}`);
        }
    });

    // Individual performance for my team
    const myTeamStats = teamStats[myTeam.getName()];
    if (myTeamStats) {
        console.log("\n=== My Team Performance ===");
        const myTeamPlayers = myTeamStats.players
            .filter(name => scores.has(name))
            .map(name => ({ name, score: scores.get(name) }))
            .sort((a, b) => b.score - a.score);

        myTeamPlayers.forEach((player, index) => {
            const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
            console.log(`${index + 1}. ${player.name}: ${player.score} ${medal}`);
        });
    }
}
```

## Important Notes

1. **Display Slots**: The scoreboard system uses specific slot numbers (0-18) for different display locations. Team-colored sidebars use slots 3-18, corresponding to team colors plus an offset.

2. **Team Color Index**: Team color indexes range from 0-15 and correspond to Minecraft's standard color formatting codes.

3. **Null Returns**: Many methods return `null` when no team or objective exists, so always check for null values before accessing properties.

4. **Team-colored Scoreboards**: In competitive modes, different teams may see different scoreboards based on their team color. Use `getCurrentScoreboard()` to get the appropriate one for the client player.

5. **Performance**: Methods that access player information should be used judiciously in performance-critical scripts, as they may involve lookups across the scoreboard system.

6. **Context**: Ensure you're accessing these methods from appropriate contexts (usually client-side scripts or events where the world and scoreboards are available).

7. **Team Helper**: The `TeamHelper` objects returned by team-related methods provide additional functionality for team management and player lists.

## Related Classes

- `ScoreboardObjectiveHelper` - Used for accessing individual scoreboard objectives and their scores
- `TeamHelper` - Used for team information and member lists
- `FormattingHelper` - Used for text formatting and color codes
- `PlayerEntityHelper` - Used for player entity interactions
- `BaseHelper` - Parent class providing base functionality
- World interaction helpers for accessing the scoreboard system

## Version History

- **1.2.9**: Initial release with basic scoreboard slot and team color functionality
- **1.3.0**: Added team management methods (`getTeams()`, `getPlayerTeam()`)
- **1.6.5**: Added client player convenience methods for team operations
- **1.8.4**: Added comprehensive team color and formatting methods
- **Ongoing**: Continued improvements to team and scoreboard integration