# Chat

Provides access to chat communication, message display, command management, and various text-related operations. The Chat library allows scripts to send messages, display formatted text, create titles and toasts, manage chat history, and build complex text components.

**Variable Name:** `Chat`
**Library Name:** `Chat`
**Package:** `xyz.wagyourtail.jsmacros.client.api.library.impl`
**Since:** 1.0.0

## Overview

The Chat library is one of the core JsMacros libraries available in all scripts. It provides comprehensive access to chat functionality and text display. Key features include:

- Sending messages to chat and server
- Displaying formatted text, titles, and toasts
- Text component creation and manipulation
- Chat history management
- Command system access
- Color code conversion
- JSON text parsing and creation

## Basic Message Operations

### Chat.log()

Display a message in the player's chat (client-side only, not sent to server).

```js
// Simple text message
Chat.log("Hello, World!");

// Log different types of data
Chat.log("Player health: " + Player.getPlayer().getHealth());
Chat.log("Current time: " + new Date());

// Log with null safety
Chat.log(null); // Will be ignored gracefully
```

**Parameters:**
- `message` (`Object`): Message to display (any object, converted to string)
- `await` (`boolean`, optional): Whether to wait for message to appear before continuing

**Return Type:** `void`

### Chat.logf()

Display a formatted message using Java's String.format syntax.

```js
// Format with placeholders
Chat.logf("Player %s has %d health", "Notch", 20);

// Format with numbers
const health = 15.5;
const maxHealth = 20;
Chat.logf("Health: %.1f/%.1f (%.1f%%)", health, maxHealth, (health/maxHealth)*100);

// Format with multiple arguments
const player = Player.getPlayer();
Chat.logf("Position: X=%.1f, Y=%.1f, Z=%.1f",
    player.getX(), player.getY(), player.getZ());

// With await
Chat.logf("Loading... %d%%", progress, true);
```

**Parameters:**
- `message` (`String`): Format string with placeholders
- `args` (`Object...`): Arguments to substitute into format string
- `await` (`boolean`, optional): Whether to wait for message to appear

**Return Type:** `void`

### Chat.logColor()

Display a message with color codes automatically converted from ampersand (&) to section symbol (§).

```js
// Color codes using & symbol
Chat.logColor("&aGreen text &r&lbold and &r&6orange!");

// Common color codes
Chat.logColor("&0Black &1Dark Blue &2Dark Green &3Dark Aqua");
Chat.logColor("&4Dark Red &5Dark Purple &6Gold &7Gray");
Chat.logColor("&8Dark Gray &9Blue &aGreen &bAqua");
Chat.logColor("&cRed &dLight Purple &eYellow &fWhite");

// Formatting codes
Chat.logColor("&lBold &oItalic &nUnderline &mStrikethrough &kMagic");
Chat.logColor("&rReset to default");

// Combined colors and formatting
Chat.logColor("&6&lGolden &eText &rwith &a&ncolors");
```

**Parameters:**
- `message` (`String`): Message with & color codes
- `await` (`boolean`, optional): Whether to wait for message to appear

**Return Type:** `void`

**Color Code Reference:**
- `&0` - Black
- `&1` - Dark Blue
- `&2` - Dark Green
- `&3` - Dark Aqua
- `&4` - Dark Red
- `&5` - Dark Purple
- `&6` - Gold
- `&7` - Gray
- `&8` - Dark Gray
- `&9` - Blue
- `&a` - Green
- `&b` - Aqua
- `&c` - Red
- `&d` - Light Purple
- `&e` - Yellow
- `&f` - White
- `&l` - Bold
- `&o` - Italic
- `&n` - Underline
- `&m` - Strikethrough
- `&k` - Magic/Obfuscated
- `&r` - Reset

## Server Communication

### Chat.say()

Send a message to the server (appears in chat to other players).

```js
// Send chat message
Chat.say("Hello everyone!");

// Send commands (messages starting with /)
Chat.say("/help");
Chat.say("/gamemode creative");
Chat.say("/tp 100 64 200");

// Variables in messages
const player = Player.getPlayer();
Chat.say(`I'm at ${Math.round(player.getX())}, ${Math.round(player.getY())}, ${Math.round(player.getZ())}`);

// Null safety
Chat.say(null); // Will be ignored

// With await - wait for message to be sent
Chat.say("Important message", true);
```

**Parameters:**
- `message` (`String | null`): Message to send to server
- `await` (`boolean`, optional): Whether to wait for message to be sent

**Return Type:** `void`

### Chat.sayf()

Send a formatted message to the server.

```js
// Announce player status
const player = Player.getPlayer();
Chat.sayf("Player %s has %d/%d health",
    player.getName(), player.getHealth(), player.getMaxHealth());

// Coordinate sharing
Chat.sayf("My location: X=%d, Y=%d, Z=%d",
    Math.round(player.getX()), Math.round(player.getY()), Math.round(player.getZ()));

// System messages
Chat.sayf("[ALERT] %s", alertMessage);
```

**Parameters:**
- `message` (`String`): Format string with placeholders
- `args` (`Object...`): Arguments to substitute into format string
- `await` (`boolean`, optional): Whether to wait for message to be sent

**Return Type:** `void`

## Chat Screen Control

### Chat.open()

Open the chat input screen with pre-filled text.

```js
// Open empty chat
Chat.open();

// Open chat with preset message
Chat.open("Hello everyone!");

// Open chat with command
Chat.open("/gamemode creative");

// Open and wait for screen to open
Chat.open("/tell Notch ", true);

// Combine with event waiting
Chat.open("/home ");
JsMacros.waitForEvent("RecvMessage").then(event => {
    Chat.log("Command executed successfully");
});
```

**Parameters:**
- `message` (`String | null`): Pre-filled text for chat input (empty string if null)
- `await` (`boolean`, optional): Whether to wait for chat screen to open

**Return Type:** `void`

**Usage Notes:** Cannot be called while already joined to the main thread

## Display Elements

### Chat.title()

Display a title and subtitle on the screen.

```js
// Simple title and subtitle
Chat.title("Welcome!", "Enjoy your stay", 20, 60, 20);

// Only title
Chat.title("Boss Fight!", null, 10, 70, 20);

// Only subtitle
Chat.title(null, "Press any key to continue", 5, 40, 5);

// Clear title
Chat.title(null, null, 0, 0, 0);

// Animated title sequence
function showTitleSequence() {
    Chat.title("3", "", 0, 20, 0);
    setTimeout(() => Chat.title("2", "", 0, 20, 0), 1000);
    setTimeout(() => Chat.title("1", "", 0, 20, 0), 2000);
    setTimeout(() => Chat.title("GO!", "Starting game...", 10, 30, 10), 3000);
    setTimeout(() => Chat.title(null, null, 0, 0, 0), 5000);
}
```

**Parameters:**
- `title` (`Object`): Title text (String, TextHelper, or null)
- `subtitle` (`Object`): Subtitle text (String, TextHelper, or null)
- `fadeIn` (`int`): Fade in time in ticks (20 ticks = 1 second)
- `remain` (`int`): Display time in ticks
- `fadeOut` (`int`): Fade out time in ticks

**Return Type:** `void`

### Chat.actionbar()

Display text in the action bar area.

```js
// Simple action bar message
Chat.actionbar("Health: " + Player.getPlayer().getHealth());

// Progress indicator
Chat.actionbar(`Mining progress: ${current}/${total} (${Math.round(current/total*100)}%)`);

// Status updates
Chat.actionbar("§aAuto-farming enabled");

// With tinted background
Chat.actionbar("§cWarning: Low health!", true);

// Coordinate display
const player = Player.getPlayer();
Chat.actionbar(`X: ${Math.round(player.getX())} Y: ${Math.round(player.getY())} Z: ${Math.round(player.getZ())}`);

// Timed messages
function showTimedActionBar(message, duration) {
    Chat.actionbar(message);
    setTimeout(() => Chat.actionbar(""), duration * 1000);
}

showTimedActionBar("Processing...", 3);
```

**Parameters:**
- `text` (`Object`): Text to display (String, TextHelper, or null)
- `tinted` (`boolean`, optional): Whether to show with background tint

**Return Type:** `void`

### Chat.toast()

Display a toast notification.

```js
// Simple toast
Chat.toast("Achievement", "First Steps");

// System notifications
Chat.toast("Warning", "Inventory almost full");

// Status updates
Chat.toast("Complete", "Task finished successfully");

// Information
Chat.toast("Info", "New update available");

// Using TextHelper objects
const title = Chat.createTextHelperFromString("§6§lImportant");
const description = Chat.createTextHelperFromString("§eRead the rules!");
Chat.toast(title, description);
```

**Parameters:**
- `title` (`Object`): Toast title (String, TextHelper, or null)
- `description` (`Object`): Toast description (String, TextHelper, or null)

**Return Type:** `void`

## Text Creation and Manipulation

### Chat.createTextHelperFromString()

Create a TextHelper from a simple string.

```js
// Basic text helper
const text = Chat.createTextHelperFromString("Hello World!");
Chat.log(text); // Display it

// Use in other contexts that require TextHelper
Player.openInventory().setSlotText(0, text);

// Chain with other TextHelper methods
const styledText = Chat.createTextHelperFromString("Important")
    .setColor("red")
    .setBold(true);
```

**Parameters:**
- `content` (`String`): String content for the text helper

**Return Type:** `TextHelper`
**Returns:** Text helper containing the string

### Chat.createTextHelperFromTranslationKey()

Create a TextHelper from a Minecraft translation key.

```js
// Standard Minecraft translations
const deathMessage = Chat.createTextHelperFromTranslationKey("death.fell.accident.generic");
Chat.log(deathMessage);

// Item names
const diamondPickaxe = Chat.createTextHelperFromTranslationKey("item.minecraft.diamond_pickaxe");
Chat.log(diamondPickaxe);

// Block names
const chestBlock = Chat.createTextHelperFromTranslationKey("block.minecraft.chest");
Chat.log(chestBlock);

// With arguments
const joinMessage = Chat.createTextHelperFromTranslationKey("multiplayer.player.joined", "PlayerName");
Chat.log(joinMessage);
```

**Parameters:**
- `key` (`String`): Translation key
- `content` (`Object...`): Arguments for the translation

**Return Type:** `TextHelper`
**Returns:** Text helper containing the translated text

### Chat.createTextHelperFromJSON()

Create a TextHelper from JSON text component data.

```js
// Simple JSON text
const jsonText = '{"text":"Hello","color":"green","bold":true}';
const textHelper = Chat.createTextHelperFromJSON(jsonText);
if (textHelper) {
    Chat.log(textHelper);
}

// Complex JSON with hover and click events
const complexJson = `{
    "text": "Click me!",
    "color": "blue",
    "underlined": true,
    "clickEvent": {
        "action": "run_command",
        "value": "/say I was clicked!"
    },
    "hoverEvent": {
        "action": "show_text",
        "value": {"text":"Click to run a command","color":"yellow"}
    }
}`;

const interactiveText = Chat.createTextHelperFromJSON(complexJson);
if (interactiveText) {
    Chat.log(interactiveText);
}

// JSON with multiple components
const multiJson = `[
    {"text":"Health: ","color":"white"},
    {"text":"20","color":"green"},
    {"text":"/","color":"white"},
    {"text":"20","color":"red"}
]`;

const healthBar = Chat.createTextHelperFromJSON(multiJson);
if (healthBar) {
    Chat.log(healthBar);
}
```

**Parameters:**
- `json` (`String`): JSON string representing a text component

**Return Type:** `TextHelper | null`
**Returns:** Text helper parsed from JSON, or `null` if parsing fails

### Chat.createTextBuilder()

Create a TextBuilder for building complex text components.

```js
// Create a text builder
const builder = Chat.createTextBuilder();

// Build complex text
const complexText = builder
    .append("Welcome ")
    .append("to", "green")
    .append(" ")
    .append("JsMacros!", "blue", true)
    .build();

Chat.log(complexText);

// Build interactive text
const interactiveText = builder
    .clear()
    .append("[", "gray")
    .append("Help", "yellow")
    .setClickEvent("run_command", "/help")
    .setHoverEvent("show_text", "Click for help")
    .append("]", "gray")
    .build();

Chat.log(interactiveText);

// Build progress bar
function createProgressBar(current, max, length) {
    const filled = Math.round(current / max * length);
    const empty = length - filled;

    return builder
        .clear()
        .append("[", "gray")
        .append("=".repeat(filled), "green")
        .append(" ".repeat(empty), "red")
        .append("]", "gray")
        .append(` ${current}/${max}`, "white")
        .build();
}

const progressBar = createProgressBar(7, 10, 20);
Chat.log(progressBar);
```

**Return Type:** `TextBuilder`
**Returns:** Text builder for creating complex text components

## Command System

### Chat.getCommandManager()

Get access to the command management system.

```js
// Get command manager
const commandManager = Chat.getCommandManager();

if (commandManager) {
    // Get available commands
    const commands = commandManager.getCommands();
    Chat.log(`Available commands: ${commands.length}`);

    // Get specific command
    const helpCommand = commandManager.getCommand("help");
    if (helpCommand) {
        Chat.log(`Help command: ${helpCommand.getName()}`);
        Chat.log(`Description: ${helpCommand.getDescription()}`);
    }

    // Execute command through manager
    commandManager.execute("gamemode creative");
}
```

**Return Type:** `CommandManager | null`
**Returns:** Command manager or `null` if not available

### Chat.getCommand()

Get a specific command by name.

```js
// Get specific command
const tpCommand = Chat.getCommand("tp");
if (tpCommand) {
    Chat.log(`TP command found: ${tpCommand.getName()}`);

    // Get command usage
    const usage = tpCommand.getUsage();
    Chat.log(`Usage: ${usage}`);
}

// Check if command exists
const customCommand = Chat.getCommand("customcommand");
if (customCommand) {
    Chat.log("Custom command is available");
} else {
    Chat.log("Custom command not found");
}
```

**Parameters:**
- `name` (`String`): Command name

**Return Type:** `CommandNodeHelper | null`
**Returns:** Command node helper or `null` if not found

## Chat History Management

### Chat.getChatHistoryManager()

Get access to chat history management.

```js
// Get chat history manager
const historyManager = Chat.getChatHistoryManager();

if (historyManager) {
    // Get recent messages
    const recentMessages = historyManager.getRecentMessages(10);
    Chat.log(`Recent messages: ${recentMessages.length}`);

    // Search chat history
    const diamondMessages = historyManager.search("diamond");
    Chat.log(`Found ${diamondMessages.length} messages about diamond`);

    // Clear history (be careful!)
    // historyManager.clearHistory();
}
```

**Return Type:** `ChatHistoryManager | null`
**Returns:** Chat history manager or `null` if not available

## Utility Functions

### Chat.getLogger()

Get the JsMacros logger for console logging.

```js
// Get main logger
const logger = Chat.getLogger();

// Log different levels
logger.info("This is an info message");
logger.warn("This is a warning");
logger.error("This is an error message");
logger.debug("This is debug information");

// Get named logger
const scriptLogger = Chat.getLogger("MyScript");
scriptLogger.info("Script started successfully");
```

**Parameters:**
- `name` (`String`, optional): Name for the logger (for getting named logger)

**Return Type:** `Logger`
**Returns:** Logger instance for console logging

## Usage Patterns

### Chat Message Processor

```js
// Process incoming chat messages
function processChatMessage(event) {
    const message = event.message.getString();

    // Auto-respond to mentions
    if (message.toLowerCase().includes(Player.getPlayer().getName().toLowerCase())) {
        Chat.say("I'm here! How can I help?");
    }

    // Log important messages
    if (message.includes("[IMPORTANT]")) {
        const timestamp = new Date().toLocaleTimeString();
        Fs.writeFile(`important_${timestamp}.txt`, message);
    }

    // Color code messages
    if (message.startsWith("&")) {
        Chat.logColor(message);
    }
}

// Register for chat messages
JsMacros.on("RecvMessage", JavaWrapper.methodToJava(processChatMessage));
```

### Alert System

```js
// Create an alert system with different notification types
function showAlert(type, message) {
    switch(type) {
        case "title":
            Chat.title("ALERT", message, 10, 60, 10);
            break;
        case "actionbar":
            Chat.actionbar("§c" + message, true);
            break;
        case "toast":
            Chat.toast("Alert", message);
            break;
        case "chat":
            Chat.logColor("&c[ALERT] &f" + message);
            break;
        default:
            Chat.log(`ALERT: ${message}`);
    }
}

// Usage examples
showAlert("title", "Low health warning!");
showAlert("actionbar", "Inventory full");
showAlert("toast", "Task completed");
showAlert("chat", "System message");
```

### Progress Display

```js
// Display progress in multiple ways
function showProgress(current, total, taskName) {
    const percentage = Math.round(current / total * 100);

    // Action bar with progress
    Chat.actionbar(`§e${taskName}: §a${current}§7/§f${total} §8(§${percentage >= 50 ? 'a' : percentage >= 25 ? 'e' : 'c'}${percentage}%§8)`);

    // Update title at milestones
    if (current % Math.floor(total / 4) === 0) {
        Chat.title(`${taskName}`, `${percentage}% Complete`, 5, 20, 5);
    }

    // Final completion message
    if (current === total) {
        Chat.title("§a✓ Complete", `${taskName} finished successfully!`, 10, 40, 10);
        Chat.toast("Task Complete", `${taskName} - 100%`);
    }
}

// Example usage
for (let i = 0; i <= 100; i += 10) {
    showProgress(i, 100, "Mining Ores");
    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 500));
}
```

## Best Practices

1. **Message Formatting**: Use `logColor()` for colored messages instead of manual section symbols
2. **Server Messages**: Use `say()` for server communication, `log()` for client-side only
3. **Performance**: Avoid excessive chat logging to prevent spam
4. **Error Handling**: Check return values for functions that can return null
5. **Threading**: Use `await` parameter when message timing is critical
6. **Text Components**: Prefer TextBuilder for complex text instead of manual JSON

## Related Classes

- **[TextHelper](helpers/text-helper.md)** - Text component helper
- **[TextBuilder](classes/text-builder.md)** - Complex text component builder
- **[CommandManager](helpers/command-manager.md)** - Command system management
- **[ChatHistoryManager](helpers/inventory/chat-history-manager.md)** - Chat history management

## Error Handling

```js
function safeChatOperation() {
    try {
        // Safe text helper creation
        const jsonText = '{"invalid":"json"}';
        const textHelper = Chat.createTextHelperFromJSON(jsonText);
        if (textHelper) {
            Chat.log(textHelper);
        } else {
            Chat.log("Failed to parse JSON text");
        }

        // Safe command access
        const commandManager = Chat.getCommandManager();
        if (commandManager) {
            const command = commandManager.getCommand("nonexistent");
            if (command) {
                Chat.log(`Found command: ${command.getName()}`);
            }
        }

    } catch (error) {
        Chat.log(`Chat operation error: ${error.message}`);
        Chat.getLogger().error("Chat error", error);
    }
}
```