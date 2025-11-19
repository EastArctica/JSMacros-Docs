# CommandBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.CommandBuilder`

**Extends:** `Registrable<CommandBuilder>`

**Since:** `1.4.2`

The `CommandBuilder` class is a powerful builder-based API in JSMacros that allows you to create and register custom Minecraft commands with complex argument parsing and execution logic. It wraps Minecraft's Brigadier command system and provides a fluent interface for defining command structure, arguments, suggestions, and execution callbacks.

This class is the primary way to create custom commands that can be executed through Minecraft's chat interface, providing access to argument types like numbers, strings, items, blocks, positions, and more.

## Overview

The `CommandBuilder` uses a builder pattern to construct commands step by step. You define the command structure by adding arguments, setting up suggestions, defining execution logic, and finally registering the command with the game.

**Key Features:**
- Comprehensive argument type support (numbers, strings, items, blocks, positions, NBT, etc.)
- Custom argument suggestions and auto-completion
- Regular expression argument parsing
- Command branching with logical alternatives
- Integration with JSMacros event system
- Thread-safe execution with proper locking

## Accessing CommandBuilder

You create `CommandBuilder` instances through the `Chat` library:

```javascript
// Create a new command builder
const command = Chat.createCommandBuilder("mycommand");

// Build the command structure and register it
command
    .literalArg("give")
    .itemArg("item")
    .intArg("count", 1, 64)
    .executes((context) => {
        // Command execution logic here
        return true;
    })
    .register();
```

## Methods

### Command Structure Methods

#### `literalArg(name)`
**Parameters:**
- `name` (`String`): The literal string argument name

**Returns:** `CommandBuilder`

Adds a literal argument that must match the exact string provided. Literals are used for command keywords and subcommands.

```javascript
const command = Chat.createCommandBuilder("weather")
    .literalArg("set")
    .literalArg("rain"); // Command: /weather set rain
```

#### `or()`
**Returns:** `CommandBuilder`

Creates an alternative branch in the command structure. This allows multiple command patterns to execute the same command.

```javascript
const command = Chat.createCommandBuilder("fly")
    .literalArg("enable")
    .executes(() => {
        // Enable flying
        return true;
    })
    .or() // Alternative branch
    .literalArg("disable")
    .executes(() => {
        // Disable flying
        return true;
    });
```

#### `otherwise()`
**Returns:** `CommandBuilder`

Alias for `or()` to work around JavaScript language restrictions where "or" might be a reserved word in some contexts.

```javascript
const command = Chat.createCommandBuilder("tp")
    .literalArg("here")
    .executes(() => {
        // Teleport to current position
        return true;
    })
    .otherwise() // Alternative branch
    .blockPosArg("position")
    .executes((context) => {
        // Teleport to specified position
        return true;
    });
```

#### `or(argumentLevel)`
**Parameters:**
- `argumentLevel` (`int`): The argument level to branch from

**Returns:** `CommandBuilder`

Creates an alternative branch starting from a specific argument level in the command tree.

```javascript
const command = Chat.createCommandBuilder("test")
    .literalArg("sub")
    .intArg("number")
    .executes(() => {
        // Execute for /test sub <number>
        return true;
    })
    .or(1) // Branch back to first argument level
    .literalArg("other")
    .executes(() => {
        // Execute for /test other
        return true;
    });
```

#### `otherwise(argumentLevel)`
**Parameters:**
- `argumentLevel` (`int`): The argument level to branch from

**Returns:** `CommandBuilder`

Alias for `or(argumentLevel)` to work around JavaScript language restrictions.

### Primitive Argument Methods

#### `booleanArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a boolean argument that accepts true/false values.

```javascript
const command = Chat.createCommandBuilder("debug")
    .booleanArg("enabled")
    .executes((context) => {
        const enabled = context.getBool("enabled");
        Chat.log(`Debug mode: ${enabled}`);
        return true;
    });
```

#### `intArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an integer argument without range restrictions.

```javascript
const command = Chat.createCommandBuilder("sethealth")
    .intArg("amount")
    .executes((context) => {
        const health = context.getInt("amount");
        // Set player health
        return true;
    });
```

#### `intArg(name, min, max)`
**Parameters:**
- `name` (`String`): The argument name
- `min` (`int`): Minimum value (inclusive)
- `max` (`int`): Maximum value (inclusive)

**Returns:** `CommandBuilder`

Adds an integer argument with value range validation.

```javascript
const command = Chat.createCommandBuilder("give")
    .itemArg("item")
    .intArg("count", 1, 64)
    .executes((context) => {
        const item = context.getItem("item");
        const count = context.getInt("count");
        // Give item with specified count
        return true;
    });
```

#### `longArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a long integer argument without range restrictions.

```javascript
const command = Chat.createCommandBuilder("setseed")
    .longArg("seed")
    .executes((context) => {
        const seed = context.getLong("seed");
        // Set world seed
        return true;
    });
```

#### `longArg(name, min, max)`
**Parameters:**
- `name` (`String`): The argument name
- `min` (`long`): Minimum value (inclusive)
- `max` (`long`): Maximum value (inclusive)

**Returns:** `CommandBuilder`

Adds a long integer argument with value range validation.

#### `doubleArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a double-precision floating point argument without range restrictions.

```javascript
const command = Chat.createCommandBuilder("setspeed")
    .doubleArg("speed")
    .executes((context) => {
        const speed = context.getDouble("speed");
        // Set movement speed
        return true;
    });
```

#### `doubleArg(name, min, max)`
**Parameters:**
- `name` (`String`): The argument name
- `min` (`double`): Minimum value (inclusive)
- `max` (`double`): Maximum value (inclusive)

**Returns:** `CommandBuilder`

Adds a double-precision floating point argument with value range validation.

#### `floatRangeArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a float range argument (accepts ranges like "1.0..5.5").

```javascript
const command = Chat.createCommandBuilder("damage")
    .floatRangeArg("amount")
    .executes((context) => {
        const range = context.getFloatRange("amount");
        Chat.log(`Damage range: ${range.getMin()} to ${range.getMax()}`);
        return true;
    });
```

#### `intRangeArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an integer range argument (accepts ranges like "1..5").

### String Argument Methods

#### `wordArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a word argument that accepts a single word without spaces.

```javascript
const command = Chat.createCommandBuilder("nickname")
    .wordArg("name")
    .executes((context) => {
        const name = context.getString("name");
        // Set player nickname
        return true;
    });
```

#### `quotedStringArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a string argument that can contain spaces if enclosed in quotes.

```javascript
const command = Chat.createCommandBuilder("saycolored")
    .quotedStringArg("message")
    .executes((context) => {
        const message = context.getString("message");
        Chat.log("&a" + message); // Green colored message
        return true;
    });
```

#### `greedyStringArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a greedy string argument that consumes all remaining input including spaces. This is typically used as the last argument in a command.

```javascript
const command = Chat.createCommandBuilder("broadcast")
    .greedyStringArg("message")
    .executes((context) => {
        const message = context.getString("message");
        Chat.say("[Broadcast] " + message);
        return true;
    });
```

#### `regexArgType(name, regex, flags)`
**Parameters:**
- `name` (`String`): The argument name
- `regex` (`String`): Regular expression pattern to match
- `flags` (`String`): Regex flags ("i" for case-insensitive, "s" for dotall, "u" for unicode)

**Returns:** `CommandBuilder`

Adds a custom regex argument that validates input against a regular expression pattern. Returns an array of matched groups.

```javascript
const command = Chat.createCommandBuilder("coords")
    .regexArgType("coordinates", r"(\-?\d+)\s*,\s*(\-?\d+)", "i")
    .executes((context) => {
        const matches = context.get("coordinates"); // Array of matches
        const x = parseInt(matches[1]);
        const z = parseInt(matches[2]);
        Chat.log(`Coordinates: X=${x}, Z=${z}`);
        return true;
    });
```

### Minecraft-Specific Argument Methods

#### `itemArg(name)` / `itemStackArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an item argument that accepts Minecraft item identifiers.

```javascript
const command = Chat.createCommandBuilder("spawnitem")
    .itemArg("item")
    .intArg("count", 1, 64)
    .executes((context) => {
        const item = context.getItem("item");
        const count = context.getInt("count");
        Chat.log(`Spawning ${count}x ${item.getId()}`);
        return true;
    });
```

#### `itemPredicateArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an item predicate argument that accepts item filters and selectors.

#### `blockArg(name)` / `blockStateArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a block argument that accepts Minecraft block identifiers.

```javascript
const command = Chat.createCommandBuilder("setblock")
    .blockPosArg("position")
    .blockArg("block")
    .executes((context) => {
        const pos = context.getBlockPos("position");
        const block = context.getBlock("block");
        Chat.log(`Setting ${block.getId()} at ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    });
```

#### `blockPredicateArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a block predicate argument that accepts block filters and selectors.

#### `blockPosArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a block position argument that accepts x, y, z coordinates (supports relative coordinates with ~ and ^).

```javascript
const command = Chat.createCommandBuilder("teleport")
    .blockPosArg("position")
    .executes((context) => {
        const pos = context.getBlockPos("position");
        Chat.log(`Teleporting to: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    });
```

#### `columnPosArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a column position argument that accepts x, z coordinates (ignores y coordinate).

#### `dimensionArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a dimension argument that accepts dimension identifiers (overworld, nether, end).

```javascript
const command = Chat.createCommandBuilder("dimension")
    .dimensionArg("target")
    .executes((context) => {
        const dimension = context.getDimension("target");
        Chat.log(`Target dimension: ${dimension.getId()}`);
        return true;
    });
```

#### `identifierArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a general identifier argument that accepts Minecraft-style resource identifiers (namespace:path).

```javascript
const command = Chat.createCommandBuilder("getrecipe")
    .identifierArg("recipe")
    .executes((context) => {
        const recipeId = context.getIdentifier("recipe");
        Chat.log(`Looking up recipe: ${recipeId}`);
        return true;
    });
```

#### `nbtArg(name)` / `nbtCompoundArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an NBT compound argument that accepts NBT data in JSON format.

```javascript
const command = Chat.createCommandBuilder("givecustom")
    .itemArg("item")
    .nbtArg("data")
    .executes((context) => {
        const item = context.getItem("item");
        const nbt = context.getNbtCompound("data");
        Chat.log(`Giving ${item.getId()} with NBT: ${nbt}`);
        return true;
    });
```

#### `nbtElementArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an NBT element argument that accepts any NBT data type.

#### `colorArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a color argument that accepts color names or hex values.

```javascript
const command = Chat.createCommandBuilder("setcolor")
    .colorArg("color")
    .executes((context) => {
        const color = context.getColor("color");
        Chat.log(`Color set to: ${color}`);
        return true;
    });
```

#### `timeArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a time argument that accepts time values (like "1d", "2h", "30m").

#### `angleArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an angle argument that accepts rotation values.

#### `uuidArgType(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a UUID argument that accepts universally unique identifiers.

#### `textArgType(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a text argument that accepts JSON text components.

#### `particleArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a particle argument that accepts particle effect identifiers.

#### `itemSlotArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an item slot argument that accepts inventory slot identifiers.

### Suggestion Methods

#### `suggestMatching(suggestions)`
**Parameters:**
- `suggestions` (`String[]`): Array of suggestion strings

**Returns:** `CommandBuilder`

Adds tab completion suggestions that must match exactly.

```javascript
const command = Chat.createCommandBuilder("weather")
    .suggestMatching(["clear", "rain", "thunder"])
    .executes((context) => {
        const weather = context.getString("weather");
        Chat.log(`Setting weather to: ${weather}`);
        return true;
    });
```

#### `suggestMatching(suggestions)`
**Parameters:**
- `suggestions` (`Collection<String>`): Collection of suggestion strings

**Returns:** `CommandBuilder`

Overload that accepts a Collection instead of an array.

#### `suggestIdentifier(suggestions)`
**Parameters:**
- `suggestions` (`String[]`): Array of identifier strings

**Returns:** `CommandBuilder`

Adds tab completion suggestions for identifiers (with namespace validation).

```javascript
const command = Chat.createCommandBuilder("summon")
    .suggestIdentifier(["minecraft:zombie", "minecraft:skeleton", "minecraft:creeper"])
    .executes((context) => {
        const entity = context.getString("entity");
        Chat.log(`Summoning: ${entity}`);
        return true;
    });
```

#### `suggestIdentifier(suggestions)`
**Parameters:**
- `suggestions` (`Collection<String>`): Collection of identifier strings

**Returns:** `CommandBuilder`

Overload that accepts a Collection instead of an array.

#### `suggestPositions(positions)`
**Parameters:**
- `suggestions` (`String[]`): Array of position strings ("x y z")

**Returns:** `CommandBuilder`

Adds tab completion suggestions for block positions.

```javascript
const command = Chat.createCommandBuilder("waypoint")
    .suggestPositions(["0 64 0", "100 80 100", "~ ~ ~"])
    .executes((context) => {
        const pos = context.getString("position");
        Chat.log(`Waypoint at: ${pos}`);
        return true;
    });
```

#### `suggestPositions(positions)`
**Parameters:**
- `suggestions` (`Collection<String>`): Collection of position strings

**Returns:** `CommandBuilder`

Overload that accepts a Collection instead of an array.

#### `suggestBlockPositions(positions)`
**Parameters:**
- `positions` (`BlockPosHelper[]`): Array of BlockPosHelper objects

**Returns:** `CommandBuilder`

Adds tab completion suggestions using BlockPosHelper objects.

```javascript
// Get some positions
const pos1 = new BlockPosHelper(100, 64, 100);
const pos2 = new BlockPosHelper(-50, 80, -50);

const command = Chat.createCommandBuilder("tp")
    .suggestBlockPositions([pos1, pos2])
    .executes((context) => {
        const pos = context.getBlockPos("position");
        Chat.log(`Teleporting to: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    });
```

#### `suggestBlockPositions(positions)`
**Parameters:**
- `positions` (`Collection<BlockPosHelper>`): Collection of BlockPosHelper objects

**Returns:** `CommandBuilder`

Overload that accepts a Collection instead of an array.

#### `suggest(callback)`
**Parameters:**
- `callback` (`MethodWrapper<CommandContextHelper, SuggestionsBuilderHelper, Object, ?>`): Custom suggestion function

**Returns:** `CommandBuilder`

Adds custom dynamic suggestions using a callback function.

```javascript
const command = Chat.createCommandBuilder("player")
    .suggest((context, builder) => {
        const playerList = Server.getPlayerList();
        playerList.forEach((entry) => {
            builder.suggest(entry.getName());
        });
        return builder.buildFuture();
    })
    .executes((context) => {
        const playerName = context.getString("player");
        Chat.log(`Selected player: ${playerName}`);
        return true;
    });
```

### Execution and Registration Methods

#### `executes(callback)`
**Parameters:**
- `callback` (`MethodWrapper<CommandContextHelper, Object, Object, ?>`): Execution callback function

**Returns:** `CommandBuilder`

Sets the execution callback for the command. The callback receives a `CommandContextHelper` object containing the parsed arguments.

```javascript
const command = Chat.createCommandBuilder("hello")
    .greedyStringArg("message")
    .executes((context) => {
        const message = context.getString("message") || "World!";
        Chat.log(`Hello ${message}`);
        return true; // Return true for success, false for failure
    });
```

**Important Notes:**
- The callback must return `true` for success or `false` for failure
- For complex operations with waits, use `JsMacros.runScript()` and pass the context as the event
- The `CommandContextHelper` extends `BaseEvent`, so it can be passed directly to JSMacros functions
- Execution is thread-safe with proper locking mechanisms

#### `register()`
**Returns:** `CommandBuilder`

Registers the command with Minecraft's command system, making it available for use.

```javascript
const command = Chat.createCommandBuilder("mycommand")
    .executes((context) => {
        Chat.log("Command executed!");
        return true;
    })
    .register(); // Command is now available as /mycommand
```

#### `unregister()`
**Returns:** `CommandBuilder`

**Throws:** `IllegalAccessException`

Removes the command from Minecraft's command system.

```javascript
// Later, to remove the command
command.unregister();
```

## Usage Examples

### Example 1: Simple Greeting Command

```javascript
const command = Chat.createCommandBuilder("greet")
    .wordArg("name")
    .executes((context) => {
        const name = context.getString("name");
        Chat.say(`Hello, ${name}!`);
        return true;
    })
    .or()
    .executes((context) => {
        Chat.say("Hello, stranger!");
        return true;
    })
    .register();

// Usage:
// /greet Steve -> Hello, Steve!
// /greet -> Hello, stranger!
```

### Example 2: Item Management Command

```javascript
const command = Chat.createCommandBuilder("item")
    .literalArg("give")
    .itemArg("item")
    .intArg("count", 1, 64)
    .executes((context) => {
        const player = Player.getPlayer();
        if (!player) {
            Chat.log("Player not found!");
            return false;
        }

        const item = context.getItem("item");
        const count = context.getInt("count");
        const inventory = player.getInventory();

        // Find empty slot or add to existing stack
        for (let i = 0; i < inventory.getSlots(); i++) {
            const slot = inventory.getSlot(i);
            if (slot.isEmpty()) {
                Chat.log(`Giving ${count}x ${item.getName()} to player`);
                return true;
            }
        }

        Chat.log("No space in inventory!");
        return false;
    })
    .or()
    .literalArg("clear")
    .executes((context) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const inventory = player.getInventory();
        for (let i = 0; i < inventory.getSlots(); i++) {
            const slot = inventory.getSlot(i);
            if (!slot.isEmpty()) {
                // Clear slot logic here
            }
        }
        Chat.log("Inventory cleared!");
        return true;
    })
    .register();

// Usage:
// /item give minecraft:diamond 64
// /item clear
```

### Example 3: Advanced Teleport Command

```javascript
const command = Chat.createCommandBuilder("tpadvanced")
    .blockPosArg("position")
    .executes((context) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const pos = context.getBlockPos("position");
        Chat.log(`Teleporting to ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        // Actual teleport logic would go here
        return true;
    })
    .or(1) // Branch back to first argument
    .literalArg("here")
    .executes((context) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const pos = player.getPos();
        Chat.log(`Current position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
        return true;
    })
    .or(1) // Branch back to first argument
    .literalArg("save")
    .wordArg("name")
    .executes((context) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const name = context.getString("name");
        const pos = player.getPos();

        // Save position logic here
        Chat.log(`Saved position "${name}" at ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
        return true;
    })
    .suggestBlockPositions([
        new BlockPosHelper(0, 64, 0),
        new BlockPosHelper(100, 80, 100)
    ])
    .register();

// Usage:
// /tpadvanced 100 64 200
// /tpadvanced here
// /tpadvanced save home
```

### Example 4: Command with Custom Suggestions

```javascript
const command = Chat.createCommandBuilder("server")
    .suggestMatching(["list", "join", "info"])
    .executes((context) => {
        const action = context.getString("action");

        if (action === "list") {
            Chat.log("Available servers:");
            Chat.log("- survival.example.com");
            Chat.log("- creative.example.com");
            Chat.log("- pvp.example.com");
        } else {
            Chat.log("Usage: /server [list|join|info]");
        }
        return true;
    })
    .or()
    .literalArg("join")
    .suggest((context, builder) => {
        // Dynamic server list suggestion
        const servers = ["survival.example.com", "creative.example.com", "pvp.example.com"];
        servers.forEach(server => builder.suggest(server));
        return builder.buildFuture();
    })
    .executes((context) => {
        // Would need server argument for actual implementation
        Chat.log("Joining server...");
        return true;
    })
    .register();

// Usage:
// /server list
// /server join survival.example.com
```

### Example 5: Complex Command with Regex

```javascript
const command = Chat.createCommandBuilder("calc")
    .regexArgType("expression", r"(\-?\d+)\s*([+\-*/])\s*(\-?\d+)", "")
    .executes((context) => {
        const matches = context.get("expression");
        const num1 = parseInt(matches[1]);
        const operator = matches[2];
        const num2 = parseInt(matches[3]);

        let result;
        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num2 !== 0 ? num1 / num2 : "Error: Division by zero"; break;
            default: result = "Error: Invalid operator";
        }

        Chat.log(`${num1} ${operator} ${num2} = ${result}`);
        return true;
    })
    .register();

// Usage:
// /calc 5 + 3 -> 8
// /calc 10 * 4 -> 40
// /calc 15 / 3 -> 5
```

### Example 6: Time and Date Commands

```javascript
const command = Chat.createCommandBuilder("time")
    .literalArg("set")
    .timeArg("time")
    .executes((context) => {
        const time = context.getTime("time");
        Chat.log(`Setting time to: ${time}`);
        return true;
    })
    .or(1)
    .literalArg("query")
    .suggestMatching(["daytime", "gametime", "day"])
    .executes((context) => {
        const query = context.getString("query");
        const worldTime = World.getTime();

        switch (query) {
            case "daytime":
                const dayTime = worldTime % 24000;
                const hours = Math.floor(dayTime / 1000) + 6; // Minecraft time starts at 6am
                const minutes = Math.floor((dayTime % 1000) * 60 / 1000);
                Chat.log(`Time: ${hours % 24}:${minutes.toString().padStart(2, '0')}`);
                break;
            case "gametime":
                Chat.log(`Game time: ${worldTime} ticks`);
                break;
            case "day":
                Chat.log(`Day: ${Math.floor(worldTime / 24000)}`);
                break;
        }
        return true;
    })
    .register();

// Usage:
// /time set 1d -> Set time to 1 day
// /time query daytime -> Show current time
```

## Command Context Helper

The execution callback receives a `CommandContextHelper` object that provides access to parsed arguments and command information:

### Argument Access Methods

- `getBool(name)` - Get boolean argument value
- `getInt(name)` - Get integer argument value
- `getLong(name)` - Get long argument value
- `getDouble(name)` - Get double argument value
- `getString(name)` - Get string argument value
- `getItem(name)` - Get item argument as ItemHelper
- `getBlock(name)` - Get block argument as BlockHelper
- `getBlockPos(name)` - Get position argument as BlockPosHelper
- `getDimension(name)` - Get dimension argument
- `getIdentifier(name)` - Get identifier argument
- `getNbtCompound(name)` - Get NBT compound argument
- `getColor(name)` - Get color argument
- `getTime(name)` - Get time argument
- `getFloatRange(name)` - Get float range argument
- `get(name)` - Get raw argument value (for custom types like regex)

## Best Practices

## Important Notes

1. **Command Registration**: Commands must be registered to be available in-game. Unregistered commands cannot be executed.

2. **Thread Safety**: Command execution is handled with proper thread locking to prevent race conditions with other JSMacros operations.

3. **Event Integration**: CommandContextHelper extends BaseEvent, allowing it to be passed directly to JSMacros functions like `JsMacros.runScript()`.

4. **Performance**: Complex commands with many arguments and suggestions can impact performance. Use suggestions judiciously.

5. **Error Handling**: Always include proper error handling in command callbacks to prevent crashes and provide user feedback.

6. **Command Conflicts**: Avoid creating commands that conflict with existing Minecraft commands or other mods.

7. **Version Compatibility**: Some argument types may not be available in all Minecraft versions. Test your commands on target versions.

## Related Classes

- `CommandContextHelper` - Provides access to command execution context and parsed arguments
- `SuggestionsBuilderHelper` - Used for building custom suggestions
- `BlockPosHelper` - Represents block positions
- `CommandManager` - Manages command registration and unregistration
- `BaseEvent` - Base class for JSMacros events

## Version Information

- Available since JSMacros 1.4.2
- Enhanced with additional argument types in 1.6.5
- Improved suggestion system in 1.8.4
- Thread safety improvements in 1.9.0+