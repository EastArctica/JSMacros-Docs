# CommandManager

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.CommandManager`

**Extends:** `Object`

**Implements:** `None`

Manages client-side commands in JsMacros, providing functionality to create, register, unregister, and manage custom commands. This class serves as the central point for command registration and handling, supporting both Fabric and Forge mod loaders.

The CommandManager is accessible via the Chat API and allows script developers to create sophisticated custom commands with argument parsing, auto-completion, and execution handling.

## Table of Contents
- [Accessing CommandManager](#accessing-commandmanager)
- [Methods](#methods)
  - [getValidCommands](#getvalidcommands)
  - [createCommandBuilder](#createcommandbuilder)
  - [unregisterCommand](#unregistercommand)
  - [reRegisterCommand](#reregistercommand)
  - [getArgumentAutocompleteOptions](#getargumentautocompleteoptions)

## Accessing CommandManager

You can get the CommandManager instance through the Chat library:

```js
const cmdManager = Chat.getCommandManager();
```

## Methods

### getValidCommands
```js
const commands = cmdManager.getValidCommands();
Chat.log(`Available commands: ${commands.join(', ')}`);
```

Returns a list of all currently registered client-side commands.

**Params**
* `(none)`

**Returns**
* `List<String>`: A list of command names that are currently available

**Since:** `1.7.0`

**Notes:** Only returns commands that are registered on the client side. Server-side commands are not included unless they have client-side counterparts.

### createCommandBuilder
```js
// Create a simple command
const builder = cmdManager.createCommandBuilder("hello");

// Create a command with arguments
const giveCommand = cmdManager.createCommandBuilder("ugive")
    .itemArg("item")
    .intArg("count", 1, 64)
    .executes(JavaWrapper.methodToJava((ctx) => {
        const item = ctx.getArgument("item");
        const count = ctx.getArgument("count");
        Chat.log(`Giving ${count}x ${item} to player`);
        return true;
    }))
    .register();

// Create a command with literals
const adminCmd = cmdManager.createCommandBuilder("admin")
    .literalArg("reload")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.log("Reloading admin configuration...");
        // Reload logic here
        return true;
    }))
    .or()
    .literalArg("status")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.log("Admin status: Online");
        return true;
    }))
    .register();
```

Creates a new CommandBuilder for defining a custom command with arguments and execution logic.

**Params**
1. `name: string`: The name of the command to create

**Returns**
* `CommandBuilder`: A new CommandBuilder instance for configuring the command

**Since:** `1.7.0`

**Notes:** The CommandBuilder must be registered using `.register()` before it can be used. The builder supports method chaining for fluent configuration.

### unregisterCommand
```js
// Unregister a command and store it for later re-registration
const removedCommand = cmdManager.unregisterCommand("hello");
if (removedCommand) {
    Chat.log("Successfully unregistered 'hello' command");
} else {
    Chat.log("Command 'hello' was not found");
}

// Temporarily disable a command
const disabledCmd = cmdManager.unregisterCommand("admin");
// Later restore it
if (disabledCmd) {
    cmdManager.reRegisterCommand(disabledCmd);
}
```

Removes a command from the command registry, allowing it to be re-registered later if needed.

**Params**
1. `command: string`: The name of the command to unregister

**Returns**
* `CommandNodeHelper | null`: The removed command node, or null if the command was not found

**Throws**
* `IllegalAccessException`: If there's an error accessing the command registry

**Since:** `1.7.0`

**Notes:** This method works on both client-side and network-side command dispatchers. The returned CommandNodeHelper can be used with `reRegisterCommand()` to restore the command.

### reRegisterCommand
```js
// Store a command before unregistering it
const originalCommand = cmdManager.unregisterCommand("weather");

// Modify the command or perform other operations...

// Re-register the original command
if (originalCommand) {
    cmdManager.reRegisterCommand(originalCommand);
    Chat.log("Weather command restored");
}
```

Re-registers a previously unregistered command node back into the command system.

**Params**
1. `node: CommandNodeHelper`: The command node to re-register (obtained from `unregisterCommand()`)

**Returns**
* `void`

**Since:** `1.7.0`

**Notes:** This method is described as "hacky" in the source code, so use it with caution. It attempts to restore the command to both client-side and network-side dispatchers if available.

### getArgumentAutocompleteOptions
```js
// Get autocomplete suggestions for a partial command
cmdManager.getArgumentAutocompleteOptions("/gamemode ", JavaWrapper.methodToJava((suggestions) => {
    Chat.log("Available gamemode arguments:");
    for (const suggestion of suggestions) {
        Chat.log(`  - ${suggestion}`);
    }
}));

// Dynamic autocomplete for custom scenarios
function suggestNextArgs(partialCommand) {
    cmdManager.getArgumentAutocompleteOptions(partialCommand, JavaWrapper.methodToJava((suggestions) => {
        if (suggestions.length > 0) {
            Chat.log(`Suggestions for "${partialCommand}":`);
            suggestions.forEach(s => Chat.log(`  ${s}`));
        } else {
            Chat.log(`No suggestions available for "${partialCommand}"`);
        }
    }));
}

suggestNextArgs("/give @p ");
suggestNextArgs("/time set ");
```

Asynchronously retrieves argument autocomplete suggestions for a given partial command input.

**Params**
1. `commandPart: string`: The partial command to get suggestions for
2. `callback: MethodWrapper<List<String>, Object, Object, ?>`: A callback function that receives the list of suggestions

**Returns**
* `void` (results are delivered asynchronously via callback)

**Since:** `1.8.2`

**Notes:** The callback receives a list of strings containing the suggested completions. This method is asynchronous and will complete when the command dispatcher processes the request.

## Usage Examples

### Basic Command Creation
```js
// Get the command manager
const cmdManager = Chat.getCommandManager();

// Create a simple greeting command
cmdManager.createCommandBuilder("hello")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.say("Hello, world!");
        return true; // Return true for successful execution
    }))
    .register();
```

### Command with Arguments
```js
// Create a command with different argument types
const teleportCommand = cmdManager.createCommandBuilder("customtp")
    .blockPosArg("position")  // x y z coordinates
    .greedyStringArg("message") // Optional message
    .executes(JavaWrapper.methodToJava((ctx) => {
        const pos = ctx.getArgument("position");
        const message = ctx.getArgument("message") || "Teleported!";

        Chat.say(`/tp @s ${pos}`);
        Chat.actionbar(message);
        return true;
    }))
    .register();
```

### Command with Branches
```js
// Create a multi-purpose admin command
const adminCommand = cmdManager.createCommandBuilder("myadmin")
    // Branch 1: clear inventory
    .literalArg("clear")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.say("/clear");
        Chat.actionbar("Inventory cleared!");
        return true;
    }))
    .or() // Switch to alternative branch
    // Branch 2: give starting items
    .literalArg("kit")
    .literalArg("starter")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.say("/give @p minecraft:diamond_sword");
        Chat.say("/give @p minecraft:bread 32");
        Chat.actionbar("Starter kit given!");
        return true;
    }))
    .or() // Switch to alternative branch
    // Branch 3: heal
    .literalArg("heal")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.say("/effect give @p instant_health");
        Chat.actionbar("Healed!");
        return true;
    }))
    .register();
```

### Command with Suggestions
```js
// Create a command with custom suggestions
const biomeCommand = cmdManager.createCommandBuilder("gotobiome")
    .suggestIdentifier(
        "minecraft:plains",
        "minecraft:desert",
        "minecraft:forest",
        "minecraft:jungle",
        "minecraft:tundra",
        "minecraft:ocean"
    )
    .executes(JavaWrapper.methodToJava((ctx) => {
        const biome = ctx.getInput().split(" ")[1];
        Chat.actionbar(`Locating ${biome} biome...`);
        // Add biome finding logic here
        return true;
    }))
    .register();
```

### Command Management
```js
// Function to temporarily disable all custom commands
function disableCustomCommands(commandNames) {
    const disabledCommands = [];

    for (const name of commandNames) {
        try {
            const cmd = cmdManager.unregisterCommand(name);
            if (cmd) {
                disabledCommands.push({ name, node: cmd });
                Chat.log(`Disabled command: ${name}`);
            }
        } catch (e) {
            Chat.log(`Failed to disable command ${name}: ${e.message}`);
        }
    }

    return disabledCommands; // Return for later restoration
}

// Function to restore disabled commands
function restoreCustomCommands(disabledCommands) {
    for (const { name, node } of disabledCommands) {
        try {
            cmdManager.reRegisterCommand(node);
            Chat.log(`Restored command: ${name}`);
        } catch (e) {
            Chat.log(`Failed to restore command ${name}: ${e.message}`);
        }
    }
}

// Usage
const customCommands = ["hello", "admin", "gotobiome"];
const disabled = disableCustomCommands(customCommands);

// Later, restore them
restoreCustomCommands(disabled);
```

### Command Inspection
```js
// List all available commands
function listCommands() {
    const commands = cmdManager.getValidCommands();
    Chat.log(`=== Available Commands (${commands.length}) ===`);

    commands.sort().forEach(cmd => {
        Chat.log(`  - /${cmd}`);
    });
}

// Get command suggestions dynamically
function exploreCommand(baseCommand) {
    cmdManager.getArgumentAutocompleteOptions(baseCommand, JavaWrapper.methodToJava((suggestions) => {
        if (suggestions.length > 0) {
            Chat.log(`Suggestions for "${baseCommand}":`);
            suggestions.forEach(suggestion => {
                Chat.log(`  ${baseCommand}${suggestion}`);
            });
        } else {
            Chat.log(`No suggestions found for "${baseCommand}"`);
        }
    }));
}

// Test the functions
listCommands();
exploreCommand("/g");
exploreCommand("/time ");
exploreCommand("/weather ");
```

## Error Handling

```js
// Safe command creation with error handling
function createCommandSafely(name, setupFunction) {
    try {
        const builder = cmdManager.createCommandBuilder(name);
        setupFunction(builder);
        builder.register();
        Chat.log(`Successfully created command: ${name}`);
        return true;
    } catch (e) {
        Chat.log(`Failed to create command ${name}: ${e.message}`);
        return false;
    }
}

// Safe command removal
function removeCommandSafely(name) {
    try {
        const removed = cmdManager.unregisterCommand(name);
        if (removed) {
            Chat.log(`Successfully removed command: ${name}`);
            return removed;
        } else {
            Chat.log(`Command not found: ${name}`);
            return null;
        }
    } catch (e) {
        Chat.log(`Error removing command ${name}: ${e.message}`);
        return null;
    }
}

// Usage examples
createCommandSafely("safehello", (builder) => {
    builder.executes(JavaWrapper.methodToJava(() => {
        Chat.log("Hello from safe command!");
        return true;
    }));
});

const removed = removeCommandSafely("safehello");
```

## Platform-Specific Behavior

The CommandManager has different implementations for Fabric and Forge, but the API remains consistent:

- **Fabric:** Uses `ClientCommandManager.getActiveDispatcher()` for client-side commands
- **Forge:** Uses `ClientCommandHandler.getDispatcher()` for client-side commands
- **Both platforms:** Support server-side command dispatcher integration when connected to a server

## Important Notes

1. **Command Names:** Command names should be lowercase and avoid conflicts with existing vanilla commands
2. **Registration:** Commands must be registered using `.register()` before they can be used
3. **Execution:** Command callbacks must return `true` for successful execution
4. **Threading:** Command execution runs on the main thread but is wrapped in event container for safety
5. **Performance:** Commands are registered both client-side and network-side when possible
6. **Persistence:** Commands registered through scripts are typically lost when the game restarts unless re-registered

## Version Information

- **Available since:** JsMacros 1.7.0
- **Enhanced in:** 1.8.2 with `getArgumentAutocompleteOptions()` method
- **Platform support:** Fabric and Forge

## Related Classes

- `CommandBuilder` - Used to create and configure custom commands
- `CommandNodeHelper` - Represents command nodes for unregistration/re-registration
- `CommandContextHelper` - Provides access to command execution context
- `FChat` - Provides access to CommandManager via `getCommandManager()`