# CommandNodeAccessor

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.access.CommandNodeAccessor`

**Extends:** `Object`

The `CommandNodeAccessor` class is an advanced utility class that provides low-level access to Minecraft's Brigadier command system internals through reflection. This class is primarily used by JSMacros internals for command registration and management, allowing programmatic removal of command nodes from existing command trees.

**Warning:** This is an advanced utility class that uses reflection to access private Minecraft internals. Usage requires deep understanding of Brigadier command system structure and may break with Minecraft updates. Most users should use higher-level command APIs instead.

## Constructors

CommandNodeAccessor is a static utility class and cannot be instantiated. All methods are accessed statically via the class name.

## Methods

- [CommandNodeAccessor.remove](#commandnodeaccessorremove)

---

## Implementation Details

### Static Field Initialization
The class uses a static initializer block to set up reflection access to private fields in Minecraft's CommandNode class:

```java
static Field children;
static Field literals;
static Field arguments;

static {
    try {
        children = CommandNode.class.getDeclaredField("children");
        children.setAccessible(true);
        literals = CommandNode.class.getDeclaredField("literals");
        literals.setAccessible(true);
        arguments = CommandNode.class.getDeclaredField("arguments");
        arguments.setAccessible(true);
    } catch (SecurityException ex) {
        throw new RuntimeException("I knew I should've just used unsafe...", ex);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### Command Node Type Handling
The remove method intelligently handles different command node types:
- **LiteralCommandNode**: Command nodes with fixed literal names (e.g., "help", "list")
- **ArgumentCommandNode**: Command nodes that accept parameters (e.g., `<player>`, `<amount>`)

## Advanced Usage Examples

### Command Modification System
```js
// Advanced example: Modify existing vanilla commands
function modifyVanillaCommands() {
    const commandManager = Chat.getCommandManager();
    const dispatcher = commandManager.getDispatcher();

    try {
        // Get the root of the command tree
        const root = dispatcher.getRoot();

        // List all current child nodes for debugging
        const children = root.getChildren();
        Chat.log("Current top-level commands:");
        children.forEach(node => {
            Chat.log(`  - ${node.getName()}`);
        });

        // Example: Remove a specific command node
        // WARNING: This is just for demonstration - removing core commands may cause issues
        const testNode = CommandNodeAccessor.remove(root, "testcommand");
        if (testNode) {
            Chat.log("Removed testcommand successfully");
        }

    } catch (e) {
        Chat.log(`Error modifying commands: ${e.message}`);
    }
}

// Run the modification
modifyVanillaCommands();
```

### Command Tree Analysis
```js
// Analyze command tree structure
function analyzeCommandTree() {
    const commandManager = Chat.getCommandManager();
    const root = commandManager.getDispatcher().getRoot();

    function analyzeNode(node, depth = 0) {
        const indent = "  ".repeat(depth);
        Chat.log(`${indent}- ${node.getName()} (${node.getClass().getSimpleName()})`);

        try {
            const children = node.getChildren();
            if (children && children.size() > 0) {
                children.forEach(child => {
                    analyzeNode(child, depth + 1);
                });
            }
        } catch (e) {
            Chat.log(`${indent}  Error accessing children: ${e.message}`);
        }
    }

    Chat.log("=== Command Tree Analysis ===");
    analyzeNode(root);
}

analyzeCommandTree();
```

### Conditional Command Removal
```js
// Remove commands based on certain conditions
function manageCommandsConditionally() {
    const commandManager = Chat.getCommandManager();
    const root = commandManager.getDispatcher().getRoot();

    // List of commands to potentially remove in certain situations
    const commandsToCheck = [
        "debug", "gamemode", "tp", "give", "clear"
    ];

    commandsToCheck.forEach(cmdName => {
        const node = CommandNodeAccessor.remove(root, cmdName);
        if (node) {
            Chat.log(`Removed command: ${cmdName}`);
            // Store the node if you want to restore it later
            // restoration would require additional reflection-based methods
        }
    });
}

// Only run in specific conditions
const player = Player.getPlayer();
if (player && player.isOp()) {
    Chat.log("Player is OP - managing command access...");
    // manageCommandsConditionally();
}
```

## Security and Stability Considerations

### Potential Risks
1. **Reflection Access**: Uses reflection to access private Minecraft internals
2. **Version Compatibility**: May break with Minecraft updates due to internal changes
3. **Command System Integrity**: Removing core commands can cause unexpected behavior
4. **Permission Issues**: May fail in environments with restricted reflection access

### Best Practices
1. **Backup Command State**: Store removed nodes for potential restoration
2. **Error Handling**: Always wrap operations in try-catch blocks
3. **Conditional Usage**: Only use when absolutely necessary
4. **Testing**: Test thoroughly in development environments
5. **Documentation**: Document any command modifications for debugging

### Error Handling Example
```js
function safeCommandRemoval(root, commandName) {
    try {
        const removedNode = CommandNodeAccessor.remove(root, commandName);
        if (removedNode) {
            Chat.log(`Successfully removed command: ${commandName}`);
            return removedNode;
        } else {
            Chat.log(`Command not found: ${commandName}`);
            return null;
        }
    } catch (SecurityException e) {
        Chat.log(`Security error removing command ${commandName}: ${e.message}`);
    } catch (IllegalAccessException e) {
        Chat.log(`Access error removing command ${commandName}: ${e.message}`);
    } catch (Exception e) {
        Chat.log(`Unexpected error removing command ${commandName}: ${e.message}`);
    }
    return null;
}
```

## Alternatives and Higher-Level APIs

For most use cases, consider using these higher-level alternatives:

1. **CommandBuilder**: For creating new commands
   ```js
   const command = Chat.createCommandBuilder("mycommand")
       .executes((ctx) => {
           Chat.log("Command executed!");
           return 1;
       })
       .register();
   ```

2. **CommandManager**: For managing command registration
   ```js
   const manager = Chat.getCommandManager();
   // Use built-in command management methods
   ```

3. **Event-based Command Handling**: Intercept command execution events
   ```js
   events.on("CommandExecution", JavaWrapper.methodToJavaAsync((event) => {
       // Handle command execution
   }));
   ```

## Related Classes

- `CommandNode` - Base class for command nodes in Brigadier
- `LiteralCommandNode` - Command node for literal commands
- `ArgumentCommandNode` - Command node for argument-based commands
- `CommandManager` - Higher-level command management
- `CommandBuilder` - Command creation and registration
- `Chat` - Chat and command API access point

## Version Information

- Available since JSMacros 1.0.0
- Internal utility class - API stability not guaranteed
- Relies on Minecraft's internal Brigadier command system structure
- May require updates for major Minecraft version changes

## Troubleshooting

### Common Issues

1. **SecurityException**: Reflection access blocked by security manager
   - **Solution**: Run in environment with appropriate permissions
   - **Alternative**: Use higher-level command APIs

2. **IllegalAccessException**: Cannot access private fields
   - **Solution**: Ensure field.setAccessible(true) succeeded
   - **Cause**: Often due to module system restrictions in newer Java versions

3. **Command Not Found**: Command name doesn't exist in tree
   - **Solution**: Verify command name matches exactly
   - **Debug**: List all child nodes to see available commands

4. **NullPointerException**: Parent node is null
   - **Solution**: Ensure you have a valid CommandNode instance
   - **Check**: Verify command manager and dispatcher are available

### Debug Information
```js
// Debug function to inspect command node structure
function debugCommandStructure(node, name) {
    Chat.log(`=== Debug: ${name} ===`);
    Chat.log(`Node class: ${node.getClass().getName()}`);
    Chat.log(`Node name: ${node.getName()}`);

    try {
        const children = node.getChildren();
        Chat.log(`Children count: ${children ? children.size() : 0}`);

        if (children) {
            children.forEach(child => {
                Chat.log(`  Child: ${child.getName()} (${child.getClass().getSimpleName()})`);
            });
        }
    } catch (e) {
        Chat.log(`Error accessing children: ${e.message}`);
    }
}
```

---

**Important Notice:** This class is intended for advanced users and internal JSMacros functionality. Most script developers should prefer the higher-level command APIs available through the `Chat` and `CommandManager` classes.

