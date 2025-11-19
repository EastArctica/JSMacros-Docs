# NameUtil

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.util.NameUtil`

**Since:** 1.8.4

**Author:** Etheradon

## Overview

The `NameUtil` class is a specialized utility class in JSMacros that provides intelligent parsing and extraction of player names and roles from Minecraft chat messages. This class is particularly useful for scripts that need to analyze chat messages, identify player names, and extract role or rank information from various chat formats.

NameUtil uses sophisticated pattern matching to handle different chat message formats, including:
- Standard chat messages with colons (`PlayerName: message`)
- Messages with angle brackets (`<PlayerName> message`)
- Whisper/direct messages (`PlayerName whispers to you`)
- Guild or team messages (`Guild > PlayerName: message`)
- Messages with role prefixes or suffixes

The class is designed to work with a wide variety of server chat formats and can handle edge cases commonly found in multiplayer environments with different chat plugins and formatting styles.

**Key Features:**
- Extracts player names from complex chat message formats
- Identifies and separates role information from player names
- Handles whisper messages specially
- Supports multiple chat formatting patterns
- Robust against common edge cases and formatting variations
- Optimized for performance with message length limits

## How to Use

NameUtil is a static utility class, meaning you don't instantiate it. You call its methods directly on the class itself:

```javascript
// Import the class (optional but recommended)
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Use the static method directly
const result = NameUtil.guessNameAndRoles(chatMessage);
```

## Methods

### `guessNameAndRoles(text)`

Extracts player names and role information from a chat message using intelligent pattern matching.

**Signature:** `List<String> guessNameAndRoles(String text)`

**Description:**
This method analyzes a chat message and attempts to extract the player name and any associated roles. It uses a sophisticated algorithm that handles various chat formats:

1. **Whisper Detection**: First checks for whisper messages (`"PlayerName whispers to you"`)
2. **Pattern Matching**: Analyzes the message for common chat patterns:
   - Messages with angle brackets: `<PlayerName> message`
   - Messages with colons: `PlayerName: message`
   - Messages with arrows: `Guild > PlayerName: message`
   - Messages with role brackets: `[Admin] PlayerName: message`
3. **Role Extraction**: Separates role information from the actual player name
4. **Validation**: Ensures extracted names follow valid Minecraft username patterns (letters, numbers, underscores)

**Parameters:**
1. `text` (String): The chat message text to analyze for name extraction

**Returns:** `java.util.List<String>` - A list containing:
- Index 0: The player name (if found)
- Index 1+: Role information (if found)
- Empty list: If no valid name could be identified

**Throws:** None

**Since:** 1.8.4

**Example:**
```javascript
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Example chat messages and their parsing results
const testMessages = [
    "PlayerName: Hello everyone!",
    "<Admin> PlayerName: This is an announcement",
    "GuildName > PlayerName: Guild chat message",
    "PlayerName whispers to you: secret message",
    "[Mod] PlayerName -> Staff chat: important info",
    "PlayerName >> response to someone",
    "Just a random message without player names"
];

testMessages.forEach(message => {
    const result = NameUtil.guessNameAndRoles(message);
    if (result.size() > 0) {
        const name = result.get(0);
        const roles = result.size() > 1 ? result.subList(1, result.size()).join(", ") : "none";
        Chat.log(`Message: "${message}"`);
        Chat.log(`  Name: ${name}, Roles: ${roles}`);
    } else {
        Chat.log(`Message: "${message}" -> No name found`);
    }
});
```

## Usage Examples

### Chat Message Processor

```javascript
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Process incoming chat messages to extract player information
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();
    const result = NameUtil.guessNameAndRoles(message);

    if (result.size() > 0) {
        const playerName = result.get(0);
        const roles = result.size() > 1 ? result.subList(1, result.size()) : [];

        Chat.log(`&6Detected player: &a${playerName}`);

        if (roles.length > 0) {
            Chat.log(`&6Roles: &e${roles.join(", ")}`);
        }

        // Do something with the extracted information
        handlePlayerMessage(playerName, roles, message);
    }
}));

function handlePlayerMessage(playerName, roles, fullMessage) {
    // Store player statistics
    if (!global.playerStats) {
        global.playerStats = {};
    }

    if (!global.playerStats[playerName]) {
        global.playerStats[playerName] = {
            messageCount: 0,
            roles: roles,
            firstSeen: Date.now(),
            lastSeen: Date.now()
        };
    }

    global.playerStats[playerName].messageCount++;
    global.playerStats[playerName].lastSeen = Date.now();
    global.playerStats[playerName].roles = roles;
}
```

### Player Activity Monitor

```javascript
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Monitor chat activity and track player statistics
function createActivityMonitor() {
    const playerActivity = new Map();

    return function(message) {
        const result = NameUtil.guessNameAndRoles(message);

        if (result.size() > 0) {
            const playerName = result.get(0);
            const roles = result.size() > 1 ? result.subList(1, result.size()) : [];

            if (!playerActivity.has(playerName)) {
                playerActivity.set(playerName, {
                    messageCount: 0,
                    roles: new Set(roles),
                    firstMessage: message,
                    lastMessage: message,
                    firstTimestamp: Date.now(),
                    lastTimestamp: Date.now()
                });
            }

            const player = playerActivity.get(playerName);
            player.messageCount++;
            player.lastMessage = message;
            player.lastTimestamp = Date.now();

            // Update roles
            roles.forEach(role => player.roles.add(role));

            return player;
        }

        return null;
    };
}

// Create the monitor function
const activityMonitor = createActivityMonitor();

// Use it in an event handler
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();
    const playerInfo = activityMonitor(message);

    if (playerInfo) {
        // Log every 10 messages for a player
        if (playerInfo.messageCount % 10 === 0) {
            Chat.log(`&b${playerInfo.messageCount} messages detected from ${event.rawMessage.sender}`);
        }
    }
}));

// Function to display activity statistics
function displayActivityStats() {
    if (typeof global.playerActivity === 'undefined') {
        Chat.log("&cNo activity data available yet");
        return;
    }

    Chat.log("&6=== Chat Activity Statistics ===");

    const sortedPlayers = Array.from(global.playerActivity.entries())
        .sort((a, b) => b[1].messageCount - a[1].messageCount)
        .slice(0, 10); // Top 10

    sortedPlayers.forEach(([playerName, stats], index) => {
        const position = index + 1;
        const roleList = Array.from(stats.roles).join(", ") || "none";
        const timeAgo = Math.floor((Date.now() - stats.lastTimestamp) / 1000 / 60);

        Chat.log(`${position}. &a${playerName} &8- &f${stats.messageCount} messages, Roles: ${roleList}, Last seen: ${timeAgo}m ago`);
    });
}
```

### Whisper Message Handler

```javascript
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Specialized handler for whisper messages
function handleWhisperMessages() {
    const whisperHistory = [];

    return function(message) {
        const result = NameUtil.guessNameAndRoles(message);

        if (result.size() > 0) {
            const playerName = result.get(0);

            // Check if this is likely a whisper message
            if (message.toLowerCase().includes("whispers") ||
                message.toLowerCase().includes("tells you") ||
                message.toLowerCase().includes("messages")) {

                const whisperEntry = {
                    player: playerName,
                    message: message,
                    timestamp: Date.now()
                };

                whisperHistory.push(whisperEntry);

                // Keep only last 50 whispers
                if (whisperHistory.length > 50) {
                    whisperHistory.shift();
                }

                Chat.log(`&dWhisper from &a${playerName}&d: ${message}`);

                // Auto-reply functionality (example)
                if (message.toLowerCase().includes("help")) {
                    Chat.say(`Hello ${playerName}! I can help you. What do you need?`);
                }

                return true; // This was a whisper
            }
        }

        return false; // Not a whisper
    };
}

const whisperHandler = handleWhisperMessages();

// Register the whisper handler
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();
    whisperHandler(message);
}));

// Function to display whisper history
function showWhisperHistory() {
    if (typeof global.whisperHistory === 'undefined' || global.whisperHistory.length === 0) {
        Chat.log("&cNo whisper history available");
        return;
    }

    Chat.log("&d=== Recent Whisper History ===");

    global.whisperHistory.slice(-10).forEach((whisper, index) => {
        const timeAgo = Math.floor((Date.now() - whisper.timestamp) / 1000 / 60);
        Chat.log(`&d${index + 1}. &a${whisper.player}&d (${timeAgo}m ago): &f${whisper.message}`);
    });
}
```

### Role-based Command System

```javascript
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Create a role-based command system
function createRoleCommandSystem() {
    const rolePermissions = {
        "Admin": ["kick", "ban", "tp", "give"],
        "Mod": ["kick", "tp", "mute"],
        "VIP": ["fly", "home", "warp"],
        "Member": ["help", "spawn", "rules"]
    };

    return function(message) {
        const result = NameUtil.guessNameAndRoles(message);

        if (result.size() > 1) { // Only process messages with roles
            const playerName = result.get(0);
            const roles = result.size() > 1 ? result.subList(1, result.size()) : [];

            // Check if message contains a command
            if (message.startsWith("!") || message.startsWith("/")) {
                const command = message.split(" ")[0].substring(1).toLowerCase();

                // Check permissions based on roles
                for (const role of roles) {
                    if (rolePermissions[role] && rolePermissions[role].includes(command)) {
                        Chat.log(`&a${playerName} (&6${role}&a) used command: &e${command}`);

                        // Execute the command or handle it
                        handleRoleCommand(playerName, role, command, message);
                        return true;
                    }
                }

                Chat.log(`&c${playerName} attempted unauthorized command: ${command}`);
            }
        }

        return false;
    };
}

function handleRoleCommand(playerName, role, command, fullMessage) {
    // Handle different role-based commands
    switch (command) {
        case "help":
            Chat.say(`${playerName}, here are your available commands as ${role}:`);
            // List available commands for this role
            break;

        case "tp":
            // Handle teleport command
            const target = fullMessage.split(" ")[1];
            if (target) {
                Chat.log(`&6Teleporting ${playerName} to ${target}`);
                // Execute teleport logic
            }
            break;

        // Add more command handlers as needed
    }
}

const roleCommandSystem = createRoleCommandSystem();

// Register the command system
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();
    roleCommandSystem(message);
}));
```

### Chat Format Analyzer

```javascript
const NameUtil = Java.type("xyz.wagyourtail.jsmacros.client.util.NameUtil");

// Analyze different chat formats on the server
function analyzeChatFormats() {
    const formatStats = new Map();

    return function(message) {
        const result = NameUtil.guessNameAndRoles(message);

        if (result.size() > 0) {
            const playerName = result.get(0);
            const roles = result.size() > 1 ? result.subList(1, result.size()) : [];

            // Determine the format type
            let formatType = "unknown";

            if (message.toLowerCase().includes("whispers")) {
                formatType = "whisper";
            } else if (message.includes(">") && message.includes("<")) {
                formatType = "bracket_angle";
            } else if (message.includes(">") && !message.includes("<")) {
                formatType = "arrow_guild";
            } else if (message.includes("[") && message.includes("]")) {
                formatType = "bracket_square";
            } else if (message.includes(":")) {
                formatType = "colon";
            } else if (message.includes("->")) {
                formatType = "arrow_direct";
            } else if (message.includes(">>")) {
                formatType = "arrow_double";
            }

            // Update statistics
            if (!formatStats.has(formatType)) {
                formatStats.set(formatType, {
                    count: 0,
                    examples: [],
                    players: new Set(),
                    roles: new Set()
                });
            }

            const stats = formatStats.get(formatType);
            stats.count++;
            stats.players.add(playerName);
            roles.forEach(role => stats.roles.add(role));

            // Keep example messages
            if (stats.examples.length < 3) {
                stats.examples.push(message);
            }

            return formatType;
        }

        return null;
    };
}

const chatAnalyzer = analyzeChatFormats();

// Collect format data over time
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();
    chatAnalyzer(message);
}));

// Function to display format analysis
function displayChatFormats() {
    if (typeof global.formatStats === 'undefined') {
        Chat.log("&cNo chat format data available yet");
        return;
    }

    Chat.log("&6=== Chat Format Analysis ===");

    for (const [format, stats] of global.formatStats) {
        Chat.log(`\n&e${format.toUpperCase()} Format: &f${stats.count} messages`);
        Chat.log(`  &7Players: ${stats.players.size}, Roles detected: ${stats.roles.size}`);

        if (stats.roles.size > 0) {
            Chat.log(`  &7Roles: ${Array.from(stats.roles).join(", ")}`);
        }

        Chat.log(`  &7Examples:`);
        stats.examples.forEach((example, index) => {
            Chat.log(`    ${index + 1}. ${example}`);
        });
    }
}
```

## Implementation Details

### Pattern Recognition Algorithm

The `guessNameAndRoles` method uses a multi-stage approach:

1. **Whisper Detection**: Checks for patterns like `"PlayerName whispers to you"`
2. **Iterative Character Analysis**: Processes the message character by character
3. **Pattern Matching**: Looks for specific delimiters (`<`, `>`, `:`, `]`, `->`, `>>`)
4. **Name Validation**: Ensures extracted names match the pattern `[A-Za-z0-9_]+`
5. **Role Separation**: Distinguishes between player names and role identifiers

### Supported Chat Formats

- `PlayerName: message` - Standard chat
- `<PlayerName> message` - Bracketed names
- `[Role] PlayerName: message` - Role prefixes
- `Guild > PlayerName: message` - Guild/team chat
- `PlayerName whispers to you: message` - Whisper messages
- `PlayerName -> message` - Direct messages
- `PlayerName >> message` - Reply messages

### Edge Cases Handled

- Messages with multiple potential name candidates
- Nested brackets and complex formatting
- Empty or malformed messages
- Messages with unusual spacing
- Chat messages without clear player identification

## Performance Considerations

- **Message Length Limit**: Only analyzes the first 60 characters of each message for performance
- **Regex Caching**: Uses pre-compiled regex patterns for efficiency
- **Early Termination**: Stops processing once a valid name is found
- **Memory Efficiency**: Uses StringBuilder for string operations

## Limitations

- **No Guaranteed Accuracy**: Results depend on chat message format consistency
- **False Positives**: May incorrectly identify names in messages without player references
- **Format Dependency**: Works best with predictable chat formats
- **Character Set**: Only validates names with alphanumeric characters and underscores
- **No Context**: Doesn't consider previous messages or server context

## Best Practices

1. **Validate Results**: Always check if the returned list is empty before using results
2. **Handle Edge Cases**: Be prepared for false positives or missed names
3. **Server-Specific**: Different servers may require custom parsing logic
4. **Performance**: Avoid calling this method in tight loops without necessity
5. **Context Awareness**: Use additional context (like chat events) for better accuracy

## Version Information

- **Available Since**: JSMacros 1.8.4
- **Author**: Etheradon
- **Package**: `xyz.wagyourtail.jsmacros.client.util`
- **Final Class**: Cannot be extended
- **Static Methods**: All methods are static, no instantiation required

## Related Classes

- `Chat` - For receiving and sending chat messages
- `RecvMessageEvent` - For handling incoming chat events
- `String` - Java string operations for additional text processing
- `Pattern` and `Matcher` - Java regex classes for advanced pattern matching
- `List<String>` - Return type for name and role extraction results

## Troubleshooting

### Common Issues

**Q: Why does the method return an empty list for some messages?**
A: The method may not recognize the chat format or the message doesn't contain a valid player name. Try different message formats or check the server's chat formatting.

**Q: Why are roles not being detected correctly?**
A: Role detection depends on specific formatting patterns like `[Role]` or `Guild >`. If your server uses different formats, you may need additional processing.

**Q: The method is slow, how can I improve performance?**
A: The method is already optimized, but you can cache results or call it less frequently. Consider only processing messages that are likely to contain player names.

**Q: Can this work with non-English chat messages?**
A: The pattern matching is language-agnostic for name extraction, but whisper detection only works with English "whispers" text.

**Q: How do I handle different server chat formats?**
A: Use the method as a base and add server-specific post-processing based on your server's particular chat formatting.