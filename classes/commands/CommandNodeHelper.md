# CommandNodeHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.CommandNodeHelper`

**Extends:** `BaseHelper<CommandNode<?>>`

The `CommandNodeHelper` class is a wrapper around Minecraft's Brigadier command system that represents a command node in the command tree. This class is primarily used internally for command registration and management operations, allowing users to temporarily unregister commands and re-register them later.

Command nodes are the fundamental building blocks of Minecraft's command system, representing individual commands, arguments, and literals in the command tree structure.

## Accessing CommandNodeHelper

CommandNodeHelper instances are typically obtained through command management operations:

- Unregistering commands using `Chat.getCommandManager().unregisterCommand(name)`
- The deprecated `Chat.unregisterCommand(name)` method

```js
// Get a command node by unregistering it
const commandNode = Chat.getCommandManager().unregisterCommand("example");
if (commandNode) {
    Chat.log(`Successfully unregistered command: ${commandNode.getName()}`);
}
```

## Fields

### `fabric`
The fabric-specific command node instance.

**Type:** `CommandNode`

**Note:** This field is primarily used internally for mod loader-specific operations. Most scripters will not need to access this directly.

## Methods

### Inherited from BaseHelper

#### `getRaw()`
Returns the underlying Brigadier `CommandNode` object.

```js
const rawNode = commandNode.getRaw();
Chat.log(`Raw command node: ${rawNode.getClass().getName()}`);
```

**Returns:** `CommandNode<?>` - The underlying Brigadier command node

**Example:**
```js
// Access the raw command node for advanced operations
const commandNode = Chat.getCommandManager().unregisterCommand("help");
if (commandNode) {
    const rawNode = commandNode.getRaw();
    // Use raw Brigadier API methods
    const name = rawNode.getName();
    const usage = rawNode.getUsageText();
    Chat.log(`Command: ${name}, Usage: ${usage}`);
}
```

#### `equals(obj)`
Compares this CommandNodeHelper to another object for equality.

```js
const node1 = Chat.getCommandManager().unregisterCommand("test");
const node2 = Chat.getCommandManager().unregisterCommand("test");
if (node1 && node2 && node1.equals(node2)) {
    Chat.log("Both command nodes represent the same command");
}
```

**Parameters:**

| Parameter | Type    | Description                        |
| --------- | ------- | ---------------------------------- |
| obj       | Object  | Object to compare with             |

**Returns:** `boolean` - `true` if the objects are equal

#### `hashCode()`
Returns the hash code of the underlying command node.

```js
const commandNode = Chat.getCommandManager().unregisterCommand("example");
if (commandNode) {
    const hashCode = commandNode.hashCode();
    Chat.log(`Command node hash code: ${hashCode}`);
}
```

**Returns:** `int` - Hash code of the command node

## Usage Examples

### Temporary Command Disabling

```js
// Function to temporarily disable a command
function disableCommandTemporarily(commandName, durationMs) {
    const commandManager = Chat.getCommandManager();

    try {
        // Unregister the command
        const commandNode = commandManager.unregisterCommand(commandName);

        if (commandNode) {
            Chat.log(`&aCommand '/${commandName}' has been disabled temporarily`);

            // Schedule re-enabling the command
            JsMacros.schedule(durationMs, JavaWrapper.methodToJava(() => {
                try {
                    commandManager.reRegisterCommand(commandNode);
                    Chat.log(`&aCommand '/${commandName}' has been re-enabled`);
                } catch (e) {
                    Chat.log(`&cError re-enabling command: ${e.message}`);
                }
            }));

            return commandNode;
        } else {
            Chat.log(`&cCommand '/${commandName}' not found or could not be disabled`);
            return null;
        }
    } catch (e) {
        Chat.log(`&cError disabling command: ${e.message}`);
        return null;
    }
}

// Disable /gamemode command for 30 seconds
const gamemodeNode = disableCommandTemporarily("gamemode", 30000);
```

### Command Analysis

```js
// Analyze a command node structure
function analyzeCommand(commandName) {
    const commandManager = Chat.getCommandManager();

    try {
        const commandNode = commandManager.unregisterCommand(commandName);

        if (commandNode) {
            const rawNode = commandNode.getRaw();

            Chat.log(`=== Command Analysis: /${commandName} ===`);
            Chat.log(`Name: ${rawNode.getName()}`);
            Chat.log(`Usage: ${rawNode.getUsageText()}`);
            Chat.log(`Can use: ${rawNode.canUse(mc.player.getCommandSource())}`);

            // Check if command has children (subcommands)
            const children = rawNode.getChildren();
            Chat.log(`Subcommands: ${children.size()}`);

            for (const child of children) {
                Chat.log(`  - ${child.getName()}: ${child.getUsageText()}`);
            }

            // Re-register the command immediately
            commandManager.reRegisterCommand(commandNode);

        } else {
            Chat.log(`Command '/${commandName}' not found`);
        }
    } catch (e) {
        Chat.log(`Error analyzing command: ${e.message}`);
    }
}

// Analyze the /help command
analyzeCommand("help");
```

### Command Backup and Restore

```js
// Backup system for commands
class CommandBackup {
    constructor() {
        this.backedUpCommands = new Map();
    }

    backupCommand(commandName) {
        if (this.backedUpCommands.has(commandName)) {
            Chat.log(`&eCommand '/${commandName}' is already backed up`);
            return false;
        }

        try {
            const commandNode = Chat.getCommandManager().unregisterCommand(commandName);

            if (commandNode) {
                this.backedUpCommands.set(commandName, commandNode);
                Chat.log(`&aBacked up command: /${commandName}`);
                return true;
            } else {
                Chat.log(`&cCommand '/${commandName}' not found`);
                return false;
            }
        } catch (e) {
            Chat.log(`&cError backing up command: ${e.message}`);
            return false;
        }
    }

    restoreCommand(commandName) {
        const commandNode = this.backedUpCommands.get(commandName);

        if (!commandNode) {
            Chat.log(`&cNo backup found for command '/${commandName}'`);
            return false;
        }

        try {
            Chat.getCommandManager().reRegisterCommand(commandNode);
            this.backedUpCommands.delete(commandName);
            Chat.log(`&aRestored command: /${commandName}`);
            return true;
        } catch (e) {
            Chat.log(`&cError restoring command: ${e.message}`);
            return false;
        }
    }

    listBackups() {
        if (this.backedUpCommands.size === 0) {
            Chat.log("No command backups available");
            return;
        }

        Chat.log("=== Command Backups ===");
        for (const [commandName] of this.backedUpCommands) {
            Chat.log(`- /${commandName}`);
        }
    }

    restoreAll() {
        const commands = Array.from(this.backedUpCommands.keys());
        let restored = 0;

        for (const commandName of commands) {
            if (this.restoreCommand(commandName)) {
                restored++;
            }
        }

        Chat.log(`&aRestored ${restored}/${commands.length} commands`);
    }
}

// Usage example
const backup = new CommandBackup();

// Backup some commands
backup.backupCommand("tp");
backup.backupCommand("give");
backup.backupCommand("time");

// List backups
backup.listBackups();

// Restore specific command
backup.restoreCommand("tp");

// Restore all remaining commands
backup.restoreAll();
```

### Command Filtering System

```js
// Filter commands based on criteria
function filterCommands(criteria) {
    const commandManager = Chat.getCommandManager();
    const availableCommands = commandManager.getValidCommands();
    const matchedCommands = [];

    Chat.log(`Scanning ${availableCommands.length} commands...`);

    for (const commandName of availableCommands) {
        try {
            const commandNode = commandManager.unregisterCommand(commandName);

            if (commandNode) {
                const rawNode = commandNode.getRaw();
                let matches = true;

                // Apply filtering criteria
                if (criteria.nameContains && !commandName.includes(criteria.nameContains)) {
                    matches = false;
                }

                if (criteria.canUse !== undefined) {
                    const canUse = rawNode.canUse(mc.player.getCommandSource());
                    if (criteria.canUse !== canUse) {
                        matches = false;
                    }
                }

                if (criteria.hasChildren !== undefined) {
                    const hasChildren = rawNode.getChildren().size() > 0;
                    if (criteria.hasChildren !== hasChildren) {
                        matches = false;
                    }
                }

                if (matches) {
                    matchedCommands.push({
                        name: commandName,
                        node: commandNode,
                        usage: rawNode.getUsageText(),
                        children: rawNode.getChildren().size()
                    });
                }

                // Always re-register the command
                commandManager.reRegisterCommand(commandNode);
            }
        } catch (e) {
            Chat.log(`&cError processing command '/${commandName}': ${e.message}`);
        }
    }

    return matchedCommands;
}

// Find all commands the player can use that have subcommands
const usableCommands = filterCommands({
    canUse: true,
    hasChildren: true
});

Chat.log(`Found ${usableCommands.length} usable commands with subcommands:`);
usableCommands.forEach(cmd => {
    Chat.log(`- /${cmd.name}: ${cmd.usage} (${cmd.children} subcommands)`);
});
```

## Integration with Command Manager

CommandNodeHelper is designed to work with JSMacros' command management system:

```js
const commandManager = Chat.getCommandManager();

// Get available commands
const commands = commandManager.getValidCommands();
Chat.log(`Available commands: ${commands.join(", ")}`);

// Unregister a command temporarily
const commandNode = commandManager.unregisterCommand("example");
if (commandNode) {
    // Command is now unregistered

    // Re-register it later
    commandManager.reRegisterCommand(commandNode);
}
```

## Notes and Limitations

- **Temporary Operations:** CommandNodeHelper is primarily used for temporary command removal and restoration. Permanent command modifications require different approaches.
- **Mod Compatibility:** The `fabric` field exists for mod loader-specific compatibility. Most users will not need to access this directly.
- **Permission Checks:** When re-registering commands, the original permission requirements and command structure are preserved.
- **Thread Safety:** Command registration/unregistration should be done on the main thread. Use `JsMacros.schedule()` for delayed operations.
- **Error Handling:** Always wrap command operations in try-catch blocks, as they can throw `IllegalAccessException` or other exceptions.

## Related Classes

- `CommandManager` - Main class for command registration and management
- `CommandBuilder` - Used to create new commands
- `FChat` - Legacy command methods (deprecated)
- `BaseHelper` - Base class providing common helper functionality

## Version Information

- Available since JSMacros 1.6.5
- CommandManager integration improved in 1.7.0
- Legacy Chat methods deprecated in favor of CommandManager