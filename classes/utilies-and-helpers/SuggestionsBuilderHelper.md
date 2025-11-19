# SuggestionsBuilderHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.SuggestionsBuilderHelper`

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers`

**Extends:** `BaseHelper<SuggestionsBuilder>`

**Since:** `1.6.5`

The `SuggestionsBuilderHelper` class is a utility helper class that wraps Minecraft's Brigadier `SuggestionsBuilder` to provide convenient methods for creating tab completion suggestions in custom JSMacros commands. This class is primarily used within command suggestion callbacks to build dynamic autocomplete suggestions for players typing commands in the chat.

## Overview

The `SuggestionsBuilderHelper` provides a fluent interface for adding various types of suggestions to command arguments. It supports simple string suggestions, numeric suggestions, suggestions with tooltips, position-based suggestions, identifier suggestions, and more. The class is designed to be used within custom command suggestion callbacks created with `CommandBuilder.suggest()`.

**Key Features:**
- Method chaining support for fluent API usage
- Multiple suggestion types (strings, numbers, positions, identifiers)
- Tooltip support for suggestions
- Collection and array support for batch suggestions
- Minecraft-specific position and identifier validation
- Integration with JSMacros helper classes like `BlockPosHelper` and `TextHelper`

## Accessing SuggestionsBuilderHelper

You don't typically create `SuggestionsBuilderHelper` instances directly. Instead, they are provided as parameters to suggestion callbacks in `CommandBuilder`:

```javascript
const command = Chat.createCommandBuilder("mycommand")
    .suggest((context, builder) => {
        // builder is a SuggestionsBuilderHelper instance
        builder.suggest("option1");
        builder.suggest("option2");
        builder.suggestWithTooltip("help", TextHelper.of("Shows help information"));
        return builder.buildFuture();
    })
    .executes((context) => {
        // Command execution logic
        return true;
    })
    .register();
```

## Methods

### Input Access Methods

#### `getInput()`
**Returns:** `String`

Returns the complete current input string being processed for suggestions.

```javascript
const command = Chat.createCommandBuilder("test")
    .suggest((context, builder) => {
        const fullInput = builder.getInput();
        Chat.log(`Full input: ${fullInput}`);
        // Suggest based on full input analysis
        return builder.buildFuture();
    })
    .register();
```

#### `getStart()`
**Returns:** `int`

Returns the starting index in the input string where suggestions should apply.

```javascript
const command = Chat.createCommandBuilder("test")
    .suggest((context, builder) => {
        const startIndex = builder.getStart();
        Chat.log(`Suggestions start at index: ${startIndex}`);
        return builder.buildFuture();
    })
    .register();
```

#### `getRemaining()`
**Returns:** `String`

Returns the remaining portion of the input string after the start index that should be matched against suggestions.

```javascript
const command = Chat.createCommandBuilder("test")
    .suggest((context, builder) => {
        const remaining = builder.getRemaining();
        Chat.log(`Remaining text to match: ${remaining}`);

        // Only suggest items that match the remaining text
        if (remaining.startsWith("d")) {
            builder.suggest("diamond");
            builder.suggest("dirt");
        }
        return builder.buildFuture();
    })
    .register();
```

#### `getRemainingLowerCase()`
**Returns:** `String`

Returns the remaining portion of the input string converted to lowercase for case-insensitive matching.

```javascript
const command = Chat.createCommandBuilder("test")
    .suggest((context, builder) => {
        const remaining = builder.getRemainingLowerCase();

        // Case-insensitive matching
        ["Diamond", "Dirt", "Stone"].forEach(item => {
            if (item.toLowerCase().startsWith(remaining)) {
                builder.suggest(item);
            }
        });
        return builder.buildFuture();
    })
    .register();
```

### Basic Suggestion Methods

#### `suggest(suggestion)`
**Parameters:**
- `suggestion` (`String`): The suggestion string to add

**Returns:** `SuggestionsBuilderHelper`

Adds a simple string suggestion to the suggestion list.

```javascript
const command = Chat.createCommandBuilder("weather")
    .suggest((context, builder) => {
        builder.suggest("clear");
        builder.suggest("rain");
        builder.suggest("thunder");
        return builder.buildFuture();
    })
    .register();
```

#### `suggest(value)`
**Parameters:**
- `value` (`int`): The integer value to suggest as a string

**Returns:** `SuggestionsBuilderHelper`

Adds an integer value as a string suggestion.

```javascript
const command = Chat.createCommandBuilder("difficulty")
    .suggest((context, builder) => {
        // Suggest standard difficulty values
        builder.suggest(0); // peaceful
        builder.suggest(1); // easy
        builder.suggest(2); // normal
        builder.suggest(3); // hard
        return builder.buildFuture();
    })
    .register();
```

#### `suggestWithTooltip(suggestion, tooltip)`
**Parameters:**
- `suggestion` (`String`): The suggestion string to add
- `tooltip` (`TextHelper`): The tooltip text to display when hovering over the suggestion

**Returns:** `SuggestionsBuilderHelper`

Adds a suggestion with an associated tooltip that appears when the player hovers over the suggestion.

```javascript
const command = Chat.createCommandBuilder("gamemode")
    .suggest((context, builder) => {
        builder.suggestWithTooltip("survival", TextHelper.of("Survival mode - gather resources, craft, build"));
        builder.suggestWithTooltip("creative", TextHelper.of("Creative mode - unlimited resources, flight"));
        builder.suggestWithTooltip("adventure", TextHelper.of("Adventure mode - explore but can't break blocks"));
        builder.suggestWithTooltip("spectator", TextHelper.of("Spectator mode - fly through blocks, observe"));
        return builder.buildFuture();
    })
    .register();
```

#### `suggestWithTooltip(value, tooltip)`
**Parameters:**
- `value` (`int`): The integer value to suggest as a string
- `tooltip` (`TextHelper`): The tooltip text to display when hovering over the suggestion

**Returns:** `SuggestionsBuilderHelper`

Adds an integer suggestion with an associated tooltip.

```javascript
const command = Chat.createCommandBuilder("time")
    .suggest((context, builder) => {
        builder.suggestWithTooltip(0, TextHelper.of("Dawn - 6:00 AM"));
        builder.suggestWithTooltip(6000, TextHelper.of("Noon - 12:00 PM"));
        builder.suggestWithTooltip(12000, TextHelper.of("Dusk - 6:00 PM"));
        builder.suggestWithTooltip(18000, TextHelper.of("Midnight - 12:00 AM"));
        return builder.buildFuture();
    })
    .register();
```

### Matching Suggestion Methods

#### `suggestMatching(suggestions)`
**Parameters:**
- `suggestions` (`String[]`): Array of suggestion strings to match against

**Returns:** `SuggestionsBuilderHelper`

Adds multiple suggestions that will be matched against the remaining input using fuzzy matching.

```javascript
const command = Chat.createCommandBuilder("tp")
    .suggest((context, builder) => {
        const commonLocations = ["spawn", "home", "base", "nether", "end"];
        builder.suggestMatching(commonLocations);
        return builder.buildFuture();
    })
    .register();
```

#### `suggestMatching(suggestions)`
**Parameters:**
- `suggestions` (`Collection<String>`): Collection of suggestion strings to match against

**Returns:** `SuggestionsBuilderHelper`

Overload that accepts a Collection instead of an array.

```javascript
const command = Chat.createCommandBuilder("effect")
    .suggest((context, builder) => {
        // Get all available effects as a collection
        const effects = new JavaUtil.ArrayList([
            "speed", "slowness", "haste", "mining_fatigue",
            "strength", "weakness", "regeneration", "poison"
        ]);
        builder.suggestMatching(effects);
        return builder.buildFuture();
    })
    .register();
```

### Identifier Suggestion Methods

#### `suggestIdentifier(identifiers)`
**Parameters:**
- `identifiers` (`String[]`): Array of identifier strings to suggest

**Returns:** `SuggestionsBuilderHelper`

Adds suggestions for resource identifiers (namespace:path format). Validates that the identifiers follow Minecraft's identifier format.

```javascript
const command = Chat.createCommandBuilder("summon")
    .suggest((context, builder) => {
        const commonMobs = [
            "minecraft:zombie",
            "minecraft:skeleton",
            "minecraft:creeper",
            "minecraft:spider",
            "minecraft:enderman"
        ];
        builder.suggestIdentifier(commonMobs);
        return builder.buildFuture();
    })
    .register();
```

#### `suggestIdentifier(identifiers)`
**Parameters:**
- `identifiers` (`Collection<String>`): Collection of identifier strings to suggest

**Returns:** `SuggestionsBuilderHelper`

Overload that accepts a Collection instead of an array.

```javascript
const command = Chat.createCommandBuilder("give")
    .suggest((context, builder) => {
        // Suggest common items as identifiers
        const items = new JavaUtil.ArrayList([
            "minecraft:diamond_sword",
            "minecraft:diamond_pickaxe",
            "minecraft:iron_ingot",
            "minecraft:golden_apple"
        ]);
        builder.suggestIdentifier(items);
        return builder.buildFuture();
    })
    .register();
```

### Position Suggestion Methods

#### `suggestPositions(positions)`
**Parameters:**
- `positions` (`String[]`): Array of position strings in "x y z" format

**Returns:** `SuggestionsBuilderHelper`

Adds position suggestions using string coordinates. Supports relative coordinates with ~ and ^.

```javascript
const command = Chat.createCommandBuilder("waypoint")
    .suggest((context, builder) => {
        const waypoints = [
            "0 64 0",           // World spawn
            "~ ~ ~",           // Current position
            "100 80 -50",      // Specific coordinates
            "~10 ~5 ~-20"      // Relative position
        ];
        builder.suggestPositions(waypoints);
        return builder.buildFuture();
    })
    .register();
```

#### `suggestPositions(positions)`
**Parameters:**
- `positions` (`Collection<String>`): Collection of position strings in "x y z" format

**Returns:** `SuggestionsBuilderHelper`

Overload that accepts a Collection instead of an array.

#### `suggestBlockPositions(positions)`
**Parameters:**
- `positions` (`BlockPosHelper[]`): Array of BlockPosHelper objects to suggest

**Returns:** `SuggestionsBuilderHelper`

Adds position suggestions using BlockPosHelper objects.

```javascript
const command = Chat.createCommandBuilder("tppreset")
    .suggest((context, builder) => {
        // Create preset locations
        const spawn = new BlockPosHelper(0, 64, 0);
        const home = new BlockPosHelper(100, 70, 100);
        const netherPortal = new BlockPosHelper(-50, 64, -50);

        builder.suggestBlockPositions([spawn, home, netherPortal]);
        return builder.buildFuture();
    })
    .register();
```

#### `suggestBlockPositions(positions)`
**Parameters:**
- `positions` (`Collection<BlockPosHelper>`): Collection of BlockPosHelper objects to suggest

**Returns:** `SuggestionsBuilderHelper`

Overload that accepts a Collection instead of an array.

```javascript
const command = Chat.createCommandBuilder("important")
    .suggest((context, builder) => {
        // Get important positions from a data structure
        const importantPlaces = new JavaUtil.ArrayList();

        // Add some important locations
        importantPlaces.add(new BlockPosHelper(player.getX(), player.getY(), player.getZ()));
        importantPlaces.add(new BlockPosHelper(0, 64, 0)); // spawn

        builder.suggestBlockPositions(importantPlaces);
        return builder.buildFuture();
    })
    .register();
```

### Future Building Method

#### `buildFuture()`
**Returns:** `CompletableFuture<Suggestions>`

Builds and returns the suggestions future that should be returned from suggestion callbacks. This method is typically the last call in a suggestion callback.

```javascript
const command = Chat.createCommandBuilder("mycommand")
    .suggest((context, builder) => {
        // Add all your suggestions
        builder.suggest("option1");
        builder.suggest("option2");

        // Build and return the suggestions future
        return builder.buildFuture();
    })
    .executes((context) => {
        return true;
    })
    .register();
```

### Inherited Methods

#### `getRaw()`
**Returns:** `SuggestionsBuilder`

Returns the underlying Minecraft SuggestionsBuilder object (inherited from BaseHelper).

```javascript
const command = Chat.createCommandBuilder("advanced")
    .suggest((context, builder) => {
        // Access the raw SuggestionsBuilder for advanced operations
        const rawBuilder = builder.getRaw();

        // Use raw Brigadier API if needed
        // (usually not necessary, but available for edge cases)

        return builder.buildFuture();
    })
    .register();
```

## Usage Examples

### Example 1: Simple String Suggestions

```javascript
const command = Chat.createCommandBuilder("weather")
    .suggest((context, builder) => {
        const currentInput = builder.getRemaining();

        // Basic weather suggestions
        if (currentInput.length() === 0) {
            builder.suggest("clear");
            builder.suggest("rain");
            builder.suggest("thunder");
        } else {
            // Filter suggestions based on input
            ["clear", "rain", "thunder"].forEach(weather => {
                if (weather.startsWith(currentInput)) {
                    builder.suggest(weather);
                }
            });
        }

        return builder.buildFuture();
    })
    .executes((context) => {
        const weather = context.getString("weather");
        Chat.say(`/weather ${weather}`);
        return true;
    })
    .register();
```

### Example 2: Suggestions with Tooltips

```javascript
const command = Chat.createCommandBuilder("difficulty")
    .suggest((context, builder) => {
        builder.suggestWithTooltip("peaceful", TextHelper.of("No hostile mobs, health regenerates"));
        builder.suggestWithTooltip("easy", TextHelper.of("Less damage, fewer hostile mobs"));
        builder.suggestWithTooltip("normal", TextHelper.of("Standard difficulty"));
        builder.suggestWithTooltip("hard", TextHelper.of("More damage, more hostile mobs"));

        return builder.buildFuture();
    })
    .executes((context) => {
        const difficulty = context.getString("difficulty");
        Chat.say(`/difficulty ${difficulty}`);
        return true;
    })
    .register();
```

### Example 3: Dynamic Item Suggestions

```javascript
const command = Chat.createCommandBuilder("giveitem")
    .suggest((context, builder) => {
        // Get items from player's inventory for suggestions
        const player = Player.getPlayer();
        if (player) {
            const inventory = player.getInventory();
            const uniqueItems = new JavaUtil.HashSet();

            // Collect unique item IDs from inventory
            for (let i = 0; i < inventory.getSlots(); i++) {
                const slot = inventory.getSlot(i);
                if (!slot.isEmpty()) {
                    const item = slot.getItem();
                    uniqueItems.add(item.getId());
                }
            }

            // Suggest items from inventory
            builder.suggestMatching(Array.from(uniqueItems));
        }

        // Also suggest common items
        const commonItems = [
            "minecraft:diamond",
            "minecraft:iron_ingot",
            "minecraft:gold_ingot",
            "minecraft:emerald"
        ];
        builder.suggestIdentifier(commonItems);

        return builder.buildFuture();
    })
    .wordArg("item")
    .intArg("count", 1, 64)
    .executes((context) => {
        const item = context.getString("item");
        const count = context.getInt("count");
        Chat.say(`/give @p ${item} ${count}`);
        return true;
    })
    .register();
```

### Example 4: Position Suggestions with Waypoints

```javascript
// Store waypoints globally
const waypoints = [
    new BlockPosHelper(100, 64, 200),
    new BlockPosHelper(-50, 80, -100),
    new BlockPosHelper(0, 100, 0),
    new BlockPosHelper(300, 70, 400)
];

const waypointNames = ["home", "base", "spawn", "market"];

const command = Chat.createCommandBuilder("tpwaypoint")
    .suggest((context, builder) => {
        // Suggest waypoint names
        builder.suggestMatching(waypointNames);

        // Also suggest actual positions
        builder.suggestBlockPositions(waypoints);

        // Suggest current position
        const player = Player.getPlayer();
        if (player) {
            const currentPos = new BlockPosHelper(
                Math.floor(player.getX()),
                Math.floor(player.getY()),
                Math.floor(player.getZ())
            );
            builder.suggestWithTooltip("~ ~ ~", TextHelper.of("Current position"));
        }

        return builder.buildFuture();
    })
    .executes((context) => {
        const destination = context.getString("destination");

        // Check if it's a waypoint name
        const waypointIndex = waypointNames.indexOf(destination);
        if (waypointIndex !== -1) {
            const pos = waypoints[waypointIndex];
            Chat.say(`/tp @p ${pos.getX()} ${pos.getY()} ${pos.getZ()}`);
        } else {
            // Treat as coordinates
            Chat.say(`/tp @p ${destination}`);
        }

        return true;
    })
    .register();
```

### Example 5: Player Name Suggestions

```javascript
const command = Chat.createCommandBuilder("msg")
    .suggest((context, builder) => {
        // Get online players
        const playerList = Server.getPlayerList();

        // Suggest online player names
        playerList.forEach((entry) => {
            const playerName = entry.getName();
            builder.suggest(playerName);
        });

        return builder.buildFuture();
    })
    .wordArg("player")
    .greedyStringArg("message")
    .executes((context) => {
        const player = context.getString("player");
        const message = context.getString("message");
        Chat.say(`/msg ${player} ${message}`);
        return true;
    })
    .register();
```

### Example 6: Complex Multi-Level Suggestions

```javascript
const command = Chat.createCommandBuilder("admin")
    .suggest((context, builder) => {
        // Top-level suggestions
        builder.suggestMatching(["ban", "kick", "tp", "give", "weather"]);
        return builder.buildFuture();
    })
    .executes((context) => {
        Chat.say("Available subcommands: ban, kick, tp, give, weather");
        return true;
    })
    .literalArg("ban")
    .suggest((context, builder) => {
        // Player name suggestions for ban command
        const playerList = Server.getPlayerList();
        playerList.forEach((entry) => {
            builder.suggest(entry.getName());
        });
        return builder.buildFuture();
    })
    .wordArg("player")
    .quotedStringArg("reason")
    .executes((context) => {
        const player = context.getString("player");
        const reason = context.getString("reason");
        Chat.say(`/ban ${player} ${reason}`);
        return true;
    })
    .or(1) // Back to admin level
    .literalArg("weather")
    .suggest((context, builder) => {
        // Weather suggestions with tooltips
        builder.suggestWithTooltip("clear", TextHelper.of("Clear weather"));
        builder.suggestWithTooltip("rain", TextHelper.of("Rain weather"));
        builder.suggestWithTooltip("thunder", TextHelper.of("Thunderstorm"));
        return builder.buildFuture();
    })
    .executes((context) => {
        const weather = context.getString("weather");
        Chat.say(`/weather ${weather}`);
        return true;
    })
    .register();
```

### Example 7: Context-Aware Suggestions

```javascript
const command = Chat.createCommandBuilder("smart")
    .suggest((context, builder) => {
        const player = Player.getPlayer();
        const remaining = builder.getRemaining().toLowerCase();

        // Context-aware suggestions based on player state
        if (player && player.getHealth() < 10) {
            builder.suggestWithTooltip("heal", TextHelper.of("Heal yourself (low health)"));
        }

        if (player && player.getDimension().getId() === "minecraft:the_nether") {
            builder.suggestWithTooltip("escape", TextHelper.of("Quick escape from Nether"));
        }

        // Time-based suggestions
        const worldTime = World.getTime() % 24000;
        if (worldTime > 12000) { // Night time
            builder.suggestWithTooltip("day", TextHelper.of("Set time to day"));
        }

        // Filter by current input
        const allSuggestions = ["help", "heal", "escape", "day", "coords", "home"];
        allSuggestions.forEach(suggestion => {
            if (suggestion.toLowerCase().startsWith(remaining)) {
                builder.suggest(suggestion);
            }
        });

        return builder.buildFuture();
    })
    .executes((context) => {
        const action = context.getString("action");

        switch (action) {
            case "help":
                Chat.say("Available commands: heal, escape, day, coords, home");
                break;
            case "coords":
                const player = Player.getPlayer();
                if (player) {
                    const pos = player.getPos();
                    Chat.say(`Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
                }
                break;
            // Add more actions as needed
            default:
                Chat.say(`Unknown action: ${action}`);
        }

        return true;
    })
    .register();
```

## Best Practices

## Important Notes

1. **Method Chaining**: Most suggestion methods return `SuggestionsBuilderHelper` for fluent method chaining, but you must call `buildFuture()` to complete the suggestion process.

2. **Performance**: Suggestion callbacks are called frequently as the player types. Keep suggestions lightweight and avoid expensive operations.

3. **Thread Safety**: Suggestions are built on the main thread. Avoid blocking operations that could freeze the game.

4. **Context Awareness**: Use the provided context to make suggestions relevant to the current game state, player location, inventory, etc.

5. **Return Value**: Always return the result of `buildFuture()` from suggestion callbacks.

6. **Input Matching**: Use `getRemaining()` and `getRemainingLowerCase()` to filter suggestions based on what the player has typed.

7. **Tooltip Usage**: Tooltips provide helpful context but should be concise to avoid cluttering the UI.

8. **Collection Support**: Use array versions for fixed suggestion sets and collection versions for dynamic suggestion lists.

## Related Classes

- `CommandBuilder` - Uses SuggestionsBuilderHelper for custom command suggestions
- `CommandContextHelper` - Provides context for suggestion callbacks
- `TextHelper` - Used for tooltip text in suggestions
- `BlockPosHelper` - Used for position-based suggestions
- `BaseHelper` - Base class providing common helper functionality

## Version Information

- Available since JSMacros 1.6.5
- Enhanced suggestion matching in 1.8.4
- Improved tooltip support in 1.9.0
- Performance optimizations in recent versions