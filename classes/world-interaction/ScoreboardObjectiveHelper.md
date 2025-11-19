# ScoreboardObjectiveHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen`
**Since:** 1.2.9
**Author:** Wagyourtail

## Overview

The `ScoreboardObjectiveHelper` class provides a comprehensive interface for interacting with Minecraft scoreboard objectives in JsMacros scripts. This class allows you to access player scores, display names, objective information, and various scoreboard-related data. It's particularly useful for creating scripts that need to monitor, display, or react to scoreboard changes.

This class extends `BaseHelper<ScoreboardObjective>` and wraps Minecraft's internal `ScoreboardObjective` functionality, making it accessible to GraalJS scripts.

## How to Access

You typically obtain a `ScoreboardObjectiveHelper` instance through various world or client helper methods, such as:

```javascript
// Example ways to access a ScoreboardObjectiveHelper
const objective = world.getScoreboardObjective("objective_name");
// or through other world interaction helpers
```

## Available Methods

### getPlayerScores()

**Signature:** `Map<String, Integer> getPlayerScores()`

**Description:** Returns a map of player/entity names to their scores for this objective.

**Returns:** `Map<String, Integer>` - A map where keys are player/entity names and values are their scores.

**Example:**
```javascript
const scores = objective.getPlayerScores();
for (const [player, score] of scores) {
    console.log(`${player}: ${score}`);
}
```

### scoreToDisplayName()

**Signature:** `Map<Integer, TextHelper> scoreToDisplayName()`

**Description:** Returns a map of scores to their corresponding display names. The display names are formatted according to team decorations and colors.

**Since:** 1.8.0

**Returns:** `Map<Integer, TextHelper>` - A map where keys are scores and values are formatted display names.

**Example:**
```javascript
const scoreDisplayNames = objective.scoreToDisplayName();
for (const [score, displayName] of scoreDisplayNames) {
    console.log(`Score ${score}: ${displayName.getString()}`);
}
```

### getTexts()

**Signature:** `List<TextHelper> getTexts()`

**Description:** Returns a list of formatted text entries that would be displayed on the scoreboard for this objective. The entries are sorted by score (descending) and then by player name, limited to the first 15 visible entries.

**Since:** 2.0.0

**Returns:** `List<TextHelper>` - A list of formatted text entries as they would appear on the scoreboard.

**Example:**
```javascript
const texts = objective.getTexts();
texts.forEach((text, index) => {
    console.log(`Entry ${index + 1}: ${text.getString()}`);
});
```

### getKnownPlayers()

**Signature:** `List<String> getKnownPlayers()`

**Description:** Returns a list of all known score holders (players and entities) in the scoreboard system.

**Since:** 1.7.0

**Returns:** `List<String>` - A list of player/entity names known to the scoreboard.

**Example:**
```javascript
const knownPlayers = objective.getKnownPlayers();
console.log(`Total known players: ${knownPlayers.length}`);
knownPlayers.forEach(player => {
    console.log(`Known player: ${player}`);
});
```

### getKnownPlayersDisplayNames()

**Signature:** `List<TextHelper> getKnownPlayersDisplayNames()`

**Description:** Returns a list of display names for all known score holders. If a player has a custom display name, it will be used; otherwise, their scoreboard name is used.

**Since:** 1.8.0

**Returns:** `List<TextHelper>` - A list of formatted display names for all known players.

**Example:**
```javascript
const displayNames = objective.getKnownPlayersDisplayNames();
displayNames.forEach((displayName, index) => {
    console.log(`Player ${index + 1}: ${displayName.getString()}`);
});
```

### getName()

**Signature:** `String getName()`

**Description:** Returns the internal name of the scoreboard objective.

**Since:** 1.2.9

**Returns:** `String` - The objective's name.

**Example:**
```javascript
const objectiveName = objective.getName();
console.log(`Objective name: ${objectiveName}`);
```

### getDisplayName()

**Signature:** `TextHelper getDisplayName()`

**Description:** Returns the display name of the scoreboard objective as a formatted text helper.

**Since:** 1.2.9

**Returns:** `TextHelper` - The objective's display name with formatting.

**Example:**
```javascript
const displayName = objective.getDisplayName();
console.log(`Display name: ${displayName.getString()}`);
```

### toString()

**Signature:** `String toString()`

**Description:** Returns a string representation of the ScoreboardObjectiveHelper, including both the name and display name.

**Returns:** `String` - A formatted string representation of the objective.

**Example:**
```javascript
const stringRep = objective.toString();
console.log(stringRep);
// Output: ScoreboardObjectiveHelper:{"name": "kills", "displayName": "§6Kills"}
```

## Usage Examples

### Basic Scoreboard Monitoring

```javascript
// Monitor player scores for a specific objective
function monitorScores() {
    const objective = world.getScoreboardObjective("kills");
    if (!objective) {
        console.log("Objective 'kills' not found");
        return;
    }

    const scores = objective.getPlayerScores();
    console.log("=== Current Scores ===");

    // Sort players by score (highest first)
    const sortedScores = Array.from(scores.entries())
        .sort((a, b) => b[1] - a[1]);

    sortedScores.forEach(([player, score]) => {
        console.log(`${player}: ${score} kills`);
    });
}
```

### Scoreboard Display Simulation

```javascript
// Simulate what would be displayed on the sidebar
function simulateSidebarDisplay(objectiveName) {
    const objective = world.getScoreboardObjective(objectiveName);
    if (!objective) return;

    const texts = objective.getTexts();
    const displayName = objective.getDisplayName();

    console.log(`=== ${displayName.getString()} ===`);
    texts.forEach((text, index) => {
        console.log(text.getString());
    });
}
```

### Score Change Detection

```javascript
// Detect score changes for monitoring
let previousScores = new Map();

function detectScoreChanges(objectiveName) {
    const objective = world.getScoreboardObjective(objectiveName);
    if (!objective) return;

    const currentScores = objective.getPlayerScores();
    const changes = [];

    // Check for new players or score changes
    for (const [player, score] of currentScores) {
        const previousScore = previousScores.get(player);
        if (previousScore === undefined) {
            changes.push(`${player} joined with ${score} points`);
        } else if (previousScore !== score) {
            const diff = score - previousScore;
            changes.push(`${player} ${diff > 0 ? 'gained' : 'lost'} ${Math.abs(diff)} points (${previousScore} → ${score})`);
        }
    }

    // Check for players who left
    for (const [player, score] of previousScores) {
        if (!currentScores.has(player)) {
            changes.push(`${player} left (had ${score} points)`);
        }
    }

    // Report changes
    if (changes.length > 0) {
        console.log(`=== Changes in ${objectiveName} ===`);
        changes.forEach(change => console.log(change));
    }

    // Update for next check
    previousScores = new Map(currentScores);
}
```

### Team and Formatting Information

```javascript
// Get formatted display information
function getFormattedInfo(objectiveName) {
    const objective = world.getScoreboardObjective(objectiveName);
    if (!objective) return;

    console.log(`Objective Info:`);
    console.log(`  Name: ${objective.getName()}`);
    console.log(`  Display: ${objective.getDisplayName().getString()}`);

    // Show score to display name mapping
    const scoreDisplays = objective.scoreToDisplayName();
    console.log(`\nScore Display Names:`);
    for (const [score, displayName] of scoreDisplays) {
        console.log(`  ${score}: ${displayName.getString()}`);
    }

    // Show all known players with their display names
    const players = objective.getKnownPlayers();
    const playerDisplays = objective.getKnownPlayersDisplayNames();

    console.log(`\nAll Known Players:`);
    players.forEach((player, index) => {
        const displayName = playerDisplays[index];
        console.log(`  ${player}: ${displayName.getString()}`);
    });
}
```

## Important Notes

1. **Score Limitation**: The `getTexts()` method limits results to 15 entries, which matches Minecraft's sidebar display limit.

2. **Team Formatting**: Display names returned by `scoreToDisplayName()` and `getKnownPlayersDisplayNames()` include team decorations like colors and formatting.

3. **Hidden Entries**: The `getTexts()` method filters out hidden entries, while `getPlayerScores()` includes all entries regardless of visibility.

4. **Score Ordering**: Scoreboard entries are typically sorted by score (descending) and then by player name (case-insensitive) for display purposes.

5. **Thread Safety**: As with all JsMacros helpers, ensure you're accessing these methods from appropriate contexts (usually from client-side scripts or events).

## Related Classes

- `TextHelper` - Used for formatted text operations
- `BaseHelper` - Parent class providing base functionality
- Various world interaction helpers for accessing scoreboard objectives

## Version History

- **1.2.9**: Initial release with basic functionality
- **1.7.0**: Added `getKnownPlayers()` method
- **1.8.0**: Added `scoreToDisplayName()` and `getKnownPlayersDisplayNames()` methods
- **2.0.0**: Added `getTexts()` method for sidebar simulation