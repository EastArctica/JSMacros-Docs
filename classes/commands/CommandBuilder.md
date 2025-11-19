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
    .executes(JavaWrapper.methodToJava((ctx) => {
        // Command execution logic here
        return true;
    }))
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
    .literalArg("rain")
    .executes(JavaWrapper.methodToJava((ctx) => {
        // Command execution logic here
        return true;
    }))
    .register(); // Command: /weather set rain
```

#### `or()`
**Returns:** `CommandBuilder`

Creates an alternative branch in the command structure. This allows multiple command patterns to execute the same command.

```javascript
const command = Chat.createCommandBuilder("fly")
    .literalArg("enable")
    .executes(JavaWrapper.methodToJava((ctx) => {
        // Enable flying
        return true;
    }))
    .or() // Alternative branch
    .literalArg("disable")
    .executes(JavaWrapper.methodToJava((ctx) => {
        // Disable flying
        return true;
    }))
    .register();
```

#### `otherwise()`
**Returns:** `CommandBuilder`

Alias for `or()` to work around JavaScript language restrictions where "or" might be a reserved word in some contexts.

```javascript
const command = Chat.createCommandBuilder("tp")
    .literalArg("here")
    .executes(JavaWrapper.methodToJava((ctx) => {
        // Teleport to current position
        return true;
    }))
    .otherwise() // Alternative branch
    .blockPosArg("position")
    .executes(JavaWrapper.methodToJava((ctx) => {
        // Teleport to specified position
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava(() => {
        // Execute for /test sub <number>
        return true;
    }))
    .or(1) // Branch back to first argument level
    .literalArg("other")
    .executes(JavaWrapper.methodToJava(() => {
        // Execute for /test other
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const enabled = ctx.getArg("enabled");
        Chat.log(`Debug mode: ${enabled}`);
        return true;
    }))
    .register();
```

#### `intArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds an integer argument without range restrictions.

```javascript
const command = Chat.createCommandBuilder("sethealth")
    .intArg("amount")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const health = ctx.getArg("amount");
        // Set player health
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const item = ctx.getArg("item");
        const count = ctx.getArg("count");
        // Give item with specified count
        return true;
    }))
    .register();
```

#### `longArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a long integer argument without range restrictions.

```javascript
const command = Chat.createCommandBuilder("setseed")
    .longArg("seed")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const seed = ctx.getArg("seed");
        // Set world seed
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const speed = ctx.getArg("speed");
        // Set movement speed
        return true;
    }))
    .register();
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
const command = Chat.createCommandBuilder("damage123")
    .floatRangeArg("amount")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const range = ctx.getArg("amount");
        Chat.log(range);
        Chat.log(`Damage range: ${range.comp_1805().orElse(-1)} to ${range.comp_1806().orElse(-1)}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const name = ctx.getArg("name");
        // Set player nickname
        return true;
    }))
    .register();
```

#### `quotedStringArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a string argument that can contain spaces if enclosed in quotes.

```javascript
const command = Chat.createCommandBuilder("saycolored")
    .quotedStringArg("message")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const message = ctx.getArg("message");
        Chat.log("&a" + message); // Green colored message
        return true;
    }))
    .register();
```

#### `greedyStringArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a greedy string argument that consumes all remaining input including spaces. This is typically used as the last argument in a command.

```javascript
const command = Chat.createCommandBuilder("broadcast")
    .greedyStringArg("message")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const message = ctx.getArg("message");
        Chat.say("[Broadcast] " + message);
        return true;
    }))
    .register();
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
    .regexArgType("coordinates", "(\\-?\\d+)\\s*,\\s*(\\-?\\d+)", "i")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const matches = ctx.getArg("coordinates"); // Array of matches
        const x = parseInt(matches[1]);
        const z = parseInt(matches[2]);
        Chat.log(`Coordinates: X=${x}, Z=${z}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const item = ctx.getArg("item");
        const count = ctx.getArg("count");
        Chat.log(`Spawning ${count}x ${item.getItemId()}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArg("position");
        const block = ctx.getArg("block");
        Chat.log(`Setting ${block.getId()} at ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArg("position");
        Chat.log(`Teleporting to: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const dimension = ctx.getArg("target");
        Chat.log(`Target dimension: ${dimension}`);
        return true;
    }))
    .register();
```

#### `identifierArg(name)`
**Parameters:**
- `name` (`String`): The argument name

**Returns:** `CommandBuilder`

Adds a general identifier argument that accepts Minecraft-style resource identifiers (namespace:path).

```javascript
const command = Chat.createCommandBuilder("getrecipe")
    .identifierArg("recipe")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const recipeId = ctx.getArg("recipe");
        Chat.log(`Looking up recipe: ${recipeId}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const item = ctx.getArg("item");
        const nbt = ctx.getArg("data");
        Chat.log(`Giving ${item.getItemId()} with NBT: ${nbt}`);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const color = ctx.getArg("color");
        Chat.log(`Color set to: 0x${color.getColorValue().toString(16).padStart(6, '0')}`);
        return true;
    }))
    .register();
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
const command = Chat.createCommandBuilder("waypoint")
    .blockPosArg("position")
    .suggestPositions(["0 64 0", "100 80 100", "~ ~ ~"])
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArg("position");
        Chat.log(`Waypoint at: ${pos}`);
        return true;
    }))
    .register();
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
    .identifierArg("entity")
    .suggestIdentifier(["minecraft:zombie", "minecraft:skeleton", "minecraft:creeper"])
    .executes(JavaWrapper.methodToJava((ctx) => {
        const entity = ctx.getArg("entity");
        Chat.log(`Summoning: ${entity}`);
        return true;
    }))
    .register();
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
    .blockPosArg("position")
    .suggestPositions(["0 64 0", "100 80 100", "~ ~ ~"])
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArg("position");
        Chat.log(`Waypoint at: ${pos}`);
        return true;
    }))
    .register();
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
const BlockPosHelper = Packages.xyz.wagyourtail.jsmacros.client.api.helper.world.BlockPosHelper;
const pos1 = new BlockPosHelper(100, 64, 100);
const pos2 = new BlockPosHelper(-50, 80, -50);

const command = Chat.createCommandBuilder("tp1")
    .blockPosArg("position")
    .suggestBlockPositions([pos1, pos2])
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArg("position");
        Chat.log(`Teleporting to: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    }))
    .register();
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
// TODO: This crashed me and I'm not sure why - needs further testing
const command = Chat.createCommandBuilder("tp")
    .wordArg("player")
    .suggest(JavaWrapper.methodToJava((ctx) => {
        // Get all currently loaded/visible players in the world
        const loadedPlayers = World.getLoadedPlayers();
        
        return loadedPlayers
            ?.toArray()
            .map(player => player.getPlayerName());
    }))
    .executes(JavaWrapper.methodToJava((ctx) => {
        let playerName = ctx.getArg("player");
        Chat.log("Teleporting to: " + playerName);
        return true;
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const message = ctx.getArg("message");
        Chat.log(`Hello ${message}`);
        // TODO: Is this true?
        return true; // Return true for success, false for failure
    }))
    .register();
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.log("Command executed!");
        return true;
    }))
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
    .executes(JavaWrapper.methodToJava((ctx) => {
        const name = ctx.getArg("name");
        Chat.say(`Hello, ${name}!`);
        return true;
    }))
    .or()
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.say("Hello, stranger!");
        return true;
    }))
    .register();

// Usage:
// /greet Steve -> Hello, Steve!
// /greet -> Hello, stranger!
```

### Example 2: Item Management Command

```javascript
const command = Chat.createCommandBuilder("item2")
    .literalArg("give")
    .itemArg("item")
    .intArg("count", 1, 64)
    .executes(JavaWrapper.methodToJava((ctx) => {
        const item = ctx.getArg("item");
        const count = ctx.getArg("count");
        const inventory = Player.openInventory();

        // Find empty slot or add to existing stack
        const freeSlot = inventory.findFreeInventorySlot();
        if (freeSlot !== -1) {
            Chat.log(`Giving ${count}x ${item.getName()} to player`);
            return true;
        }

        for (let slotId = 0; slotId < inventory.getTotalSlots(); slotId++) {
            const slot = inventory.getSlot(slotId);
            // TODO: Check max stack size
            if (slot.getItemId() === item.getItemId() && slot.getCount() + count <= 64) {
                Chat.log(`Giving ${count}x ${item.getName()} to player`);
                return true;
            }
        }

        Chat.log("No space in inventory!");
        return false;
    }))
    .or(1)
    .literalArg("clear")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const inventory = Player.openInventory();
        for (const slotId of inventory.getSlots()) {
            const slot = inventory.getSlot(slotId);
            if (!slot.isEmpty()) {
                // Clear slot logic here
            }
        }
        Chat.log("Inventory cleared!");
        return true;
    }))
    .register();

// Usage:
// /item give minecraft:diamond 64
// /item clear
```

### Example 3: Advanced Teleport Command

```javascript
const BlockPosHelper = Packages.xyz.wagyourtail.jsmacros.client.api.helper.world.BlockPosHelper;

const command = Chat.createCommandBuilder("tpadvance1d")
    .blockPosArg("position")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const pos = ctx.getArg("position");
        Chat.log(`Teleporting to ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        // Actual teleport logic would go here
        return true;
    }))
    .or(1) // Branch back to first argument
    .literalArg("here")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const pos = player.getPos();
        Chat.log(`Current position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
        return true;
    }))
    .or(1) // Branch back to first argument
    .literalArg("save")
    .wordArg("name")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const player = Player.getPlayer();
        if (!player) return false;

        const name = ctx.getArg("name");
        const pos = player.getPos();

        // Save position logic here
        Chat.log(`Saved position "${name}" at ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
        return true;
    }))
    .or(1) // Branch back to first argument
    // TODO: This isn't suggesting correctly
    .blockPosArg("position")
    .suggestBlockPositions([
        new BlockPosHelper(0, 64, 0),
        new BlockPosHelper(100, 80, 100)
    ])
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArg("position");

        // Teleport logic would go here
        Chat.log(`Teleporting to ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        return true;
    }))
    .register();

// Usage:
// /tpadvanced 100 64 200
// /tpadvanced here
// /tpadvanced save home
```

### Example 4: Command with Custom Suggestions

```javascript
const command = Chat.createCommandBuilder("server")
    .literalArg("list")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.log("Available servers:");
        Chat.log("- hypixel.net");
        Chat.log("- creative.example.com");
        Chat.log("- pvp.example.com");
        return true;
    }))
    // TODO: This example is broken because the .info will apply to
    // `/server join hypixel.net` but the or will make it allow `/server join info`
    // This means that last executes has no arg server
    .or(1)
    .literalArg("join")
    .greedyStringArg("server")
    .suggest(JavaWrapper.methodToJava((ctx, builder) => {
        // Dynamic server list suggestion
        const servers = ["hypixel.net", "creative.example.com", "pvp.example.com"];
        builder.suggestMatching(servers);
    }))
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.log("Joining server...");
        Client.connect(ctx.getArg("server"));
        return true;
    }))
    .or()
    .literalArg("info")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const serverInfo = Client.ping(ctx.getArg("server"));
        Chat.log(`Server Info for ${ctx.getArg("server")}:`);
        Chat.log(`- MOTD: ${serverInfo.getLabel()}`);
        Chat.log(`- Players: ${serverInfo.getPlayerCountLabel()}`);
        Chat.log(`- Latency: ${serverInfo.getPing()}ms`);
        return true;
    }))
    .register();

// Usage:
// /server list
// /server join survival.example.com
// /server info survival.example.com
```

### Example 5: Complex Command with Regex

```javascript
const command = Chat.createCommandBuilder("calc")
    .regexArgType("expression", "(\\-?\\d+)\\s*([+\\-*/])\\s*(\\-?\\d+)", "")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const matches = ctx.getArg("expression");
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
    }))
    .register();

// Usage:
// /calc 5 + 3 -> 8
// /calc 10 * 4 -> 40
// /calc 15 / 3 -> 5
```

### Example 6: Time and Date Commands

```javascript
const command = Chat.createCommandBuilder("time123")
    .literalArg("set")
    .timeArg("time")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const time = ctx.getArg("time");
        Chat.log(`Setting time to: ${time}`);
        return true;
    }))
    .or(1)
    .literalArg("query")
    .greedyStringArg("query")
    .suggestMatching(["daytime", "gametime", "day"])
    .executes(JavaWrapper.methodToJava((ctx) => {
        const query = ctx.getArg("query");
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
    }))
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