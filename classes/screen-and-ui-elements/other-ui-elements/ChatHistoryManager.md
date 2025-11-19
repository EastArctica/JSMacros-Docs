# ChatHistoryManager

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.ChatHistoryManager`

**Since:** JsMacros 1.6.0

The `ChatHistoryManager` class provides comprehensive control over the Minecraft chat history system in JSMacros. It allows script writers to read, modify, insert, and remove chat messages from both the received message history and sent message history. This class is particularly useful for creating chat filtering systems, message logging, automated chat responses, and custom chat UI modifications.

## Overview

The `ChatHistoryManager` manages two types of chat history:

- **Received Messages:** Messages that appear in the chat HUD (from server, system messages, etc.)
- **Sent Messages:** Messages that the player has typed and sent (accessed via up/down arrows in chat)

The manager provides thread-safe operations for accessing and modifying the chat history, with proper handling of Minecraft's client thread execution requirements.

## Obtaining the ChatHistoryManager

The ChatHistoryManager is obtained through the Chat API:

```javascript
// Get the chat history manager
const chatHistory = Chat.getHistory();
```

## Table of Contents

- [Methods](#methods)
  - [Received Message Methods](#received-message-methods)
  - [Sent Message Methods](#sent-message-methods)
- [Usage Examples](#usage-examples)
- [Common Use Cases](#common-use-cases)
- [Important Notes](#important-notes)

## Methods

### Received Message Methods

These methods manage messages that appear in the chat HUD.

### Sent Message Methods

These methods manage the player's sent message history (accessed with up/down arrows in chat).

## Usage Examples

### Basic Chat History Analysis
```javascript
const chatHistory = Chat.getHistory();

// Get basic statistics
const recvCount = chatHistory.getRecvCount();
const sentCount = chatHistory.getSent().size();

Chat.log(`Chat History Analysis:`);
Chat.log(`- Received messages: ${recvCount}`);
Chat.log(`- Sent messages: ${sentCount}`);

// Analyze recent messages
if (recvCount > 0) {
    const recentMessages = chatHistory.getRecvLines();
    const last10Messages = recentMessages.slice(Math.max(0, recvCount - 10));

    Chat.log("Recent messages:");
    for (let i = 0; i < last10Messages.length; i++) {
        const msg = last10Messages[i];
        const age = Time.getCurrentTick() - msg.getCreationTick();
        Chat.log(`${i + 1}. ${msg.getText().getString()} (${age} ticks ago)`);
    }
}
```

### Chat Spam Filter
```javascript
const chatHistory = Chat.getHistory();

// Function to remove duplicate messages
function removeSpam() {
    try {
        const messages = chatHistory.getRecvLines();
        const seenMessages = new Set();
        const toRemove = [];

        // Identify duplicates (check from newest to oldest)
        for (let i = messages.size() - 1; i >= 0; i--) {
            const msg = messages.get(i);
            const text = msg.getText().getString();

            if (seenMessages.has(text)) {
                toRemove.push(i);
            } else {
                seenMessages.add(text);
            }
        }

        // Remove duplicates
        for (const index of toRemove) {
            chatHistory.removeRecvText(index);
        }

        if (toRemove.length > 0) {
            Chat.log(`Removed ${toRemove.length} duplicate messages`);
            chatHistory.refreshVisible();
        }
    } catch (e) {
        Chat.log(`Error removing spam: ${e}`);
    }
}

// Run spam filter every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Time.getCurrentTick() % 600 === 0) { // Every 30 seconds (600 ticks)
        removeSpam();
    }
}));
```

### Chat Logger
```javascript
const chatHistory = Chat.getHistory();
const loggedMessages = new Set();

function logNewMessages() {
    try {
        const messages = chatHistory.getRecvLines();

        for (let i = 0; i < messages.size(); i++) {
            const msg = messages.get(i);
            const msgId = `${msg.getCreationTick()}-${msg.getText().getString()}`;

            if (!loggedMessages.has(msgId)) {
                const timestamp = new Date();
                const text = msg.getText().getString();

                // Log to console with timestamp
                console.log(`[${timestamp.toISOString()}] ${text}`);

                // Store as logged
                loggedMessages.add(msgId);
            }
        }
    } catch (e) {
        Chat.log(`Error logging messages: ${e}`);
    }
}

// Log new messages every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Time.getCurrentTick() % 100 === 0) { // Every 5 seconds (100 ticks)
        logNewMessages();
    }
}));
```

### Custom Chat Commands
```javascript
const chatHistory = Chat.getHistory();

// Function to clear chat history
function clearChatHistory() {
    try {
        chatHistory.clearRecv(true);
        Chat.log("[System] Chat history cleared by command!");
    } catch (e) {
        Chat.log(`Error clearing chat: ${e}`);
    }
}

// Function to search chat history
function searchChatHistory(keyword) {
    try {
        const messages = chatHistory.getRecvLines();
        const results = [];

        for (let i = 0; i < messages.size(); i++) {
            const msg = messages.get(i);
            const text = msg.getText().getString();

            if (text.toLowerCase().includes(keyword.toLowerCase())) {
                results.push({
                    index: i,
                    text: text,
                    age: Time.getCurrentTick() - msg.getCreationTick()
                });
            }
        }

        Chat.log(`Found ${results.length} messages containing "${keyword}":`);
        results.forEach(result => {
            Chat.log(`${result.index}: ${result.text} (${result.age} ticks ago)`);
        });

        return results;
    } catch (e) {
        Chat.log(`Error searching chat: ${e}`);
        return [];
    }
}

// Example usage: clear chat
// clearChatHistory();

// Example usage: search for messages
// searchChatHistory("diamond");
```

### Auto-Response System
```javascript
const chatHistory = Chat.getHistory();
const lastResponseTime = 0;

// Function to check for questions and respond
function checkForQuestions() {
    try {
        const messages = chatHistory.getRecvLines();

        for (let i = messages.size() - 1; i >= 0; i--) {
            const msg = messages.get(i);
            const text = msg.getText().getString();
            const messageAge = Time.getCurrentTick() - msg.getCreationTick();

            // Only check recent messages (within last 5 seconds)
            if (messageAge > 100) continue;

            // Check for question patterns
            if (text.includes("?") && text.toLowerCase().includes("help")) {
                const currentTime = Time.getCurrentTick();

                // Don't respond too frequently
                if (currentTime - lastResponseTime > 200) {
                    Chat.say("I see you need help! Type /commands for available commands.");
                    return true;
                }
            }
        }
    } catch (e) {
        Chat.log(`Error checking for questions: ${e}`);
    }
    return false;
}

// Check for questions every tick
events.on("Tick", JavaWrapper.methodToJavaAsync(checkForQuestions));
```

### Message Highlighting System
```javascript
const chatHistory = Chat.getHistory();

// Function to highlight messages containing player name
function highlightPlayerMessages() {
    try {
        const player = Player.getPlayer();
        if (!player) return;

        const playerName = player.getName().getString();
        const messages = chatHistory.getRecvLines();

        for (let i = 0; i < messages.size(); i++) {
            const msg = messages.get(i);
            const text = msg.getText().getString();

            // Check if message contains player name
            if (text.toLowerCase().includes(playerName.toLowerCase())) {
                // Create highlighted version
                const highlightedText = Chat.createTextBuilder()
                    .append("[MENTION] ")
                    .withColor(0xFFFF00) // Yellow
                    .append(text)
                    .build();

                // Replace original with highlighted version
                chatHistory.insertRecvText(i, highlightedText);
                chatHistory.removeRecvText(i + 1); // Remove original
            }
        }

        // Refresh if any changes were made
        chatHistory.refreshVisible();
    } catch (e) {
        Chat.log(`Error highlighting messages: ${e}`);
    }
}

// Run highlighter every few seconds
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Time.getCurrentTick() % 200 === 0) { // Every 10 seconds
        highlightPlayerMessages();
    }
}));
```

## Common Use Cases

## Important Notes

1. **Thread Safety:** All operations that modify chat history are automatically thread-safe and properly execute on Minecraft's client thread.

2. **Index Order:** Index 0 always refers to the most recent message in the history.

3. **Performance Considerations:**
   - Large chat histories can impact performance
   - Use the `await` parameter for operations where timing is critical
   - Consider limiting history size with periodic cleanup

4. **Chat Display Updates:** Always call `refreshVisible()` after inserting or removing messages if you want the changes to be immediately visible in the chat UI.

5. **Sent History:** The `getSent()` method returns a direct reference to the list, so modifications affect the actual sent message history used by Minecraft's chat input.

6. **Time Ticks:** Creation ticks use Minecraft's game tick system (20 ticks per second). Convert to real time using: `realTimeMs = ticks * 50`.

7. **Message Persistence:** Changes to chat history are not persistent across game restarts or world changes.

8. **Event Filtering:** The chat history manager works well with chat-related events for real-time monitoring and filtering.

## Related Classes

- `ChatHudLineHelper` - Helper class for individual chat messages
- `TextHelper` - Helper class for text formatting and manipulation
- `Chat` - Main chat API for logging and sending messages
- `MethodWrapper` - Wrapper for JavaScript functions used in filtering operations

## Version History

- **1.6.0:** Initial release with basic received and sent message management
- **1.8.4:** Added `getRecvCount()` and `getRecvLines()` methods for better message access
- **Current:** Enhanced with comprehensive filtering and manipulation capabilities