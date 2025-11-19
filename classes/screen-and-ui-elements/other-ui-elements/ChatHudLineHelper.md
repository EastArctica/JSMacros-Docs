# ChatHudLineHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.ChatHudLineHelper`

**Extends:** `BaseHelper<ChatHudLine>`

**Since:** JsMacros 1.6.0

The `ChatHudLineHelper` class provides a wrapper for individual chat HUD lines, allowing script writers to interact with and manipulate chat messages that have been displayed in the client's chat interface. This class is primarily used with the `ChatHistoryManager` to access, read, and manage the chat history.

## Overview

The `ChatHudLineHelper` class represents a single line in the chat HUD, providing access to:
- The text content of the chat line
- The tick when the message was created
- Methods to delete specific messages
- Access to the underlying Minecraft ChatHudLine object through the BaseHelper interface

ChatHudLineHelper objects are typically obtained through the `ChatHistoryManager` methods like `getRecvLine()`, `getRecvLines()`, or from chat-related events.

## Table of Contents

- [Constructors](#constructors)
- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Common Patterns](#common-patterns)
- [Related Classes](#related-classes)

## Constructors

ChatHudLineHelper objects are typically not instantiated directly by script writers. Instead, they are obtained through the `ChatHistoryManager`:

```javascript
// Get ChatHudLineHelper from ChatHistoryManager
const chatHistory = Chat.getHistory();
const chatLine = chatHistory.getRecvLine(0); // Gets the most recent message
const allLines = chatHistory.getRecvLines(); // Gets all messages
```

## Fields

ChatHudLineHelper inherits fields from its parent class `BaseHelper<ChatHudLine>`:

## Methods

## Usage Examples

### Basic Chat Line Inspection
```javascript
// Get the most recent chat message
const chatHistory = Chat.getHistory();
const recentLine = chatHistory.getRecvLine(0);

if (recentLine) {
    const text = recentLine.getText();
    const content = text.getString();
    const creationTick = recentLine.getCreationTick();
    const age = World.getTime() - creationTick;

    Chat.log(`Recent message: "${content}"`);
    Chat.log(`Message age: ${age} ticks (${Math.floor(age/20)} seconds)`);

    // Get formatted version
    const jsonText = text.getJson();
    Chat.log(`JSON format: ${jsonText}`);
}
```

### Chat Message Filtering and Cleanup
```javascript
function cleanUpChat() {
    const chatHistory = Chat.getHistory();
    const messageCount = chatHistory.getRecvCount();
    let deletedCount = 0;

    // Iterate through all chat messages
    for (let i = 0; i < messageCount; i++) {
        try {
            const chatLine = chatHistory.getRecvLine(i);
            if (chatLine) {
                const content = chatLine.getText().getString();

                // Delete messages containing specific patterns
                if (content.includes("[ADVERT]") ||
                    content.includes("Join our server!") ||
                    content.toLowerCase().includes("spam")) {

                    Chat.log(`Deleting spam message: ${content}`);
                    chatLine.deleteById();
                    deletedCount++;
                }
            }
        } catch (e) {
            Chat.log(`Error processing message ${i}: ${e}`);
        }
    }

    Chat.log(`Cleanup complete. Deleted ${deletedCount} spam messages.`);
}

// Run cleanup every 5 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (World.getTime() % 6000 === 0) { // Every 5 minutes (6000 ticks)
        cleanUpChat();
    }
}));
```

### Chat Statistics and Analysis
```javascript
function analyzeChatMessages() {
    const chatHistory = Chat.getHistory();
    const messages = chatHistory.getRecvLines();

    let totalMessages = 0;
    let oldestMessage = Infinity;
    let newestMessage = -Infinity;
    const wordFrequency = {};

    messages.forEach(chatLine => {
        if (chatLine) {
            totalMessages++;
            const tick = chatLine.getCreationTick();
            const content = chatLine.getText().getString().toLowerCase();

            // Track age statistics
            if (tick < oldestMessage) oldestMessage = tick;
            if (tick > newestMessage) newestMessage = tick;

            // Count word frequency
            const words = content.split(/\s+/);
            words.forEach(word => {
                if (word.length > 3) { // Only count words longer than 3 characters
                    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
                }
            });
        }
    });

    const timeSpan = newestMessage - oldestMessage;
    const messagesPerMinute = totalMessages / (timeSpan / 1200); // 1200 ticks = 1 minute

    Chat.log(`Chat Analysis Results:`);
    Chat.log(`- Total messages: ${totalMessages}`);
    Chat.log(`- Time span: ${Math.floor(timeSpan/1200)} minutes`);
    Chat.log(`- Messages per minute: ${messagesPerMinute.toFixed(2)}`);

    // Find most common words
    const sortedWords = Object.entries(wordFrequency)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    Chat.log(`- Top 5 most common words:`);
    sortedWords.forEach(([word, count]) => {
        Chat.log(`  ${word}: ${count} times`);
    });
}

// Analyze chat every 10 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (World.getTime() % 12000 === 0) { // Every 10 minutes
        analyzeChatMessages();
    }
}));
```

### Message Age-Based Filtering
```javascript
function filterOldMessages(maxAgeMinutes) {
    const chatHistory = Chat.getHistory();
    const maxAgeTicks = maxAgeMinutes * 1200; // Convert minutes to ticks
    const currentTick = World.getTime();
    const messages = chatHistory.getRecvLines();
    let oldMessages = [];

    messages.forEach(chatLine => {
        if (chatLine) {
            const age = currentTick - chatLine.getCreationTick();
            if (age > maxAgeTicks) {
                const content = chatLine.getText().getString();
                oldMessages.push({
                    content: content,
                    age: Math.floor(age / 1200),
                    chatLine: chatLine
                });
            }
        }
    });

    Chat.log(`Found ${oldMessages.length} messages older than ${maxAgeMinutes} minutes:`);
    oldMessages.forEach(msg => {
        Chat.log(`- ${msg.content} (${msg.age} minutes old)`);
    });

    return oldMessages;
}

// Example: Find messages older than 30 minutes
const oldMessages = filterOldMessages(30);
```

### Real-time Chat Monitor
```javascript
// Monitor for specific keywords in real-time
const keywords = ["diamond", "emerald", "netherite", "rare"];
const keywordMessages = [];

events.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString().toLowerCase();
    const foundKeywords = keywords.filter(keyword => message.includes(keyword));

    if (foundKeywords.length > 0) {
        Chat.log(`🎯 Found keyword(s) ${foundKeywords.join(", ")}: ${event.message.getString()}`);

        // Store for later analysis
        keywordMessages.push({
            message: event.message.getString(),
            keywords: foundKeywords,
            tick: World.getTime(),
            timestamp: new Date().toISOString()
        });

        // Keep only last 50 messages
        if (keywordMessages.length > 50) {
            keywordMessages.shift();
        }
    }
}));

// Command to show recent keyword messages
Chat.createCommandBuilder("findkeywords")
    .executes(JavaWrapper.methodToJava((ctx) => {
        Chat.log(`=== Recent Messages with Keywords ===`);
        keywordMessages.forEach((msg, index) => {
            Chat.log(`${index + 1}. [${msg.keywords.join(", ")}] ${msg.message}`);
        });
        return 1;
    }))
    .register();
```

### Chat Backup System
```javascript
function backupChatMessages() {
    const chatHistory = Chat.getHistory();
    const messages = chatHistory.getRecvLines();
    const backup = [];

    messages.forEach(chatLine => {
        if (chatLine) {
            backup.push({
                content: chatLine.getText().getString(),
                json: chatLine.getText().getJson(),
                creationTick: chatLine.getCreationTick(),
                timestamp: new Date().toISOString()
            });
        }
    });

    // Save backup to file
    const fileName = `chat_backup_${Date.now()}.json`;
    const file = File.open(`${fileName}.json`, "w");
    file.write(JSON.stringify(backup, null, 2));
    file.close();

    Chat.log(`Chat backup saved to ${fileName}`);
    Chat.log(`Backed up ${backup.length} messages`);
}

// Create backup command
Chat.createCommandBuilder("backupchat")
    .executes(JavaWrapper.methodToJava((ctx) => {
        backupChatMessages();
        return 1;
    }))
    .register();
```

## Common Patterns

### Message Processing Pipeline
```javascript
class ChatProcessor {
    constructor() {
        this.filters = [];
        this.actions = [];
    }

    addFilter(filterFn) {
        this.filters.push(filterFn);
        return this;
    }

    addAction(actionFn) {
        this.actions.push(actionFn);
        return this;
    }

    processMessage(chatLine) {
        const content = chatLine.getText().getString();

        // Apply all filters
        for (const filter of this.filters) {
            if (!filter(content, chatLine)) {
                return; // Skip processing if any filter fails
            }
        }

        // Apply all actions
        for (const action of this.actions) {
            action(content, chatLine);
        }
    }
}

// Usage example
const processor = new ChatProcessor()
    .addFilter((content) => content.length > 5) // Only long messages
    .addFilter((content) => !content.startsWith("[")) // No system messages
    .addAction((content, chatLine) => {
        Chat.log(`Processing: ${content}`);
    })
    .addAction((content, chatLine) => {
        // Save to external file or database
    });

// Apply to existing messages
const chatHistory = Chat.getHistory();
const messages = chatHistory.getRecvLines();
messages.forEach(processor.processMessage.bind(processor));
```

### Temporary Message Storage
```javascript
class TemporaryChatStorage {
    constructor(maxAge = 60000) { // Default 1 minute
        this.messages = [];
        this.maxAge = maxAge;
    }

    addMessage(chatLine) {
        const message = {
            content: chatLine.getText().getString(),
            creationTick: chatLine.getCreationTick(),
            addedAt: Date.now(),
            chatLine: chatLine
        };

        this.messages.push(message);
        this.cleanup();
    }

    cleanup() {
        const now = Date.now();
        this.messages = this.messages.filter(msg =>
            now - msg.addedAt < this.maxAge
        );
    }

    getRecentMessages(limit = 10) {
        this.cleanup();
        return this.messages.slice(-limit);
    }

    search(keyword) {
        this.cleanup();
        return this.messages.filter(msg =>
            msg.content.toLowerCase().includes(keyword.toLowerCase())
        );
    }
}

const storage = new TemporaryChatStorage(120000); // 2 minutes storage

// Store new messages
events.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const chatHistory = Chat.getHistory();
    const recentLine = chatHistory.getRecvLine(0);
    if (recentLine) {
        storage.addMessage(recentLine);
    }
}));
```

## Important Notes

1. **Thread Safety:** ChatHudLineHelper methods may need to be executed on the main thread. Use proper synchronization when accessing chat history from different threads.

2. **Index Changes:** When messages are deleted, the indices of remaining messages may change. Be careful when iterating through messages while deleting them.

3. **Performance:** Processing large numbers of chat messages can impact performance. Consider limiting the scope of your operations or implementing batching.

4. **Memory Usage:** Storing many ChatHudLineHelper objects can consume significant memory. Clean up references when they're no longer needed.

5. **Message Persistence:** ChatHudLineHelper objects reference live chat messages. If the underlying messages are removed from chat, these helpers may become invalid.

## Related Classes

- `ChatHistoryManager` - Provides access to chat history and creates ChatHudLineHelper objects
- `TextHelper` - Used for accessing and manipulating text content of chat lines
- `BaseHelper<ChatHudLine>` - Parent class providing common helper functionality
- `ChatHudLine` - The underlying Minecraft class that ChatHudLineHelper wraps

## Version History

- **1.6.0:** Initial release with basic chat line access functionality
- **1.8.4:** Enhanced ChatHistoryManager integration with additional methods
- **Current:** Stable implementation with comprehensive chat line manipulation capabilities