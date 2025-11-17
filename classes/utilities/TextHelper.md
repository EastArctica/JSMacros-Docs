# TextHelper

Represents Minecraft text with formatting, styling, and component structure. Essential for processing chat messages, creating formatted text, and handling complex text components with colors, styles, and hover/click events.

## Constructor

TextHelper objects are typically obtained from events or created using Chat methods rather than created directly:

```javascript
// From chat events
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let textHelper = event.message; // Already a TextHelper
}));

// Create new text
let textHelper = Chat.createTextHelperFromString("Hello, World!");
let textHelper = Chat.createTextHelperFromJSON('{"text":"Click me!","color":"green"}');
```

## Methods

### Content Access

#### getString()
Returns the plain text content without any formatting.

```javascript
let plainText = textHelper.getString();
```

#### getStringStripFormatting()
Returns the text content with Minecraft formatting codes removed.

```javascript
let cleanText = textHelper.getStringStripFormatting();
```

#### getJson()
Returns the JSON representation of the text component.

```javascript
let jsonText = textHelper.getJson();
```

#### withoutFormatting()
Returns a new TextHelper with all formatting removed.

```javascript
let plainHelper = textHelper.withoutFormatting();
```

### Text Manipulation (Deprecated)

#### replaceFromString(content)
**Deprecated** - Use `Chat.createTextHelperFromString()` instead.

```javascript
textHelper.replaceFromString("New content");
```

#### replaceFromJson(json)
**Deprecated** - Use `Chat.createTextHelperFromJSON()` instead.

```javascript
textHelper.replaceFromJson('{"text":"Formatted text","color":"red"}');
```

### Text Traversal

#### visit(visitor)
Visits each text segment with its style. Useful for processing complex text components.

```javascript
textHelper.visit(JavaWrapper.methodToJava((styleHelper, text) => {
    console.log(`Text: "${text}", Style: ${styleHelper}`);
}));
```

## Static Methods

#### wrap(text)
Wraps a Minecraft Text object in a TextHelper.

```javascript
let textHelper = TextHelper.wrap(minecraftTextObject);
```

## Examples

### Basic Text Processing

```javascript
// Process incoming chat messages
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let textHelper = event.message;

    // Get different representations of the text
    let plainText = textHelper.getString();
    let cleanText = textHelper.getStringStripFormatting();
    let jsonText = textHelper.getJson();

    console.log("Original JSON:", jsonText);
    console.log("Plain text:", plainText);
    console.log("Clean text:", cleanText);

    // Check for specific content
    if (cleanText.includes("diamond")) {
        Chat.log("Diamonds mentioned!");
    }

    // Check for player mentions
    let playerName = Player.getPlayer().getName();
    if (cleanText.includes(playerName)) {
        Chat.log("You were mentioned in chat!");
    }
}));
```

### Advanced Text Analysis

```javascript
// Analyze chat message structure
function analyzeMessage(textHelper) {
    let result = {
        plainText: textHelper.getString(),
        cleanText: textHelper.getStringStripFormatting(),
        segments: []
    };

    // Visit each text segment
    textHelper.visit(JavaWrapper.methodToJava((styleHelper, segmentText) => {
        result.segments.push({
            text: segmentText,
            color: styleHelper.getColor(),
            bold: styleHelper.isBold(),
            italic: styleHelper.isItalic(),
            underlined: styleHelper.isUnderlined(),
            strikethrough: styleHelper.isStrikethrough(),
            obfuscated: styleHelper.isObfuscated()
        });
    }));

    return result;
}

// Usage
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let analysis = analyzeMessage(event.message);
    console.log("Message analysis:", JSON.stringify(analysis, null, 2));

    // Count formatting elements
    let boldCount = analysis.segments.filter(s => s.bold).length;
    let coloredSegments = analysis.segments.filter(s => s.color !== "white").length;

    if (coloredSegments > 0 || boldCount > 0) {
        Chat.log(`Fancy message: ${coloredSegments} colored parts, ${boldCount} bold parts`);
    }
}));
```

### Chat Log System

```javascript
// Advanced chat logging with formatting preservation
let chatLog = [];
let maxLogSize = 1000;

function logMessage(textHelper, type = "received") {
    let timestamp = new Date().toISOString();
    let message = {
        timestamp: timestamp,
        type: type, // "received", "sent", "system"
        plainText: textHelper.getString(),
        cleanText: textHelper.getStringStripFormatting(),
        jsonText: textHelper.getJson()
    };

    chatLog.push(message);

    // Limit log size
    if (chatLog.length > maxLogSize) {
        chatLog.shift();
    }
}

function searchChat(query) {
    return chatLog.filter(msg =>
        msg.cleanText.toLowerCase().includes(query.toLowerCase())
    );
}

function exportChatLog(filename) {
    try {
        let logData = JSON.stringify(chatLog, null, 2);
        let file = Fs.open(`logs/${filename}.json`, "w");
        file.write(logData);
        Chat.log(`Chat log exported to ${filename}.json`);
    } catch (error) {
        Chat.log("Error exporting chat log: " + error.message);
    }
}

// Log all messages
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    logMessage(event.message, "received");
}));

jsmacros.on("SendMessage", JavaWrapper.methodToJava((event) => {
    let textHelper = Chat.createTextHelperFromString(event.message);
    logMessage(textHelper, "sent");
}));
```

### Anti-Spam and Filtering

```javascript
// Message filtering and spam detection
let messageHistory = [];
let spamThreshold = 3; // Same message 3 times = spam
let spamTimeWindow = 10000; // 10 seconds

function isSpamMessage(textHelper) {
    let cleanText = textHelper.getStringStripFormatting();
    let now = Date.now();

    // Remove old messages
    messageHistory = messageHistory.filter(msg => now - msg.timestamp < spamTimeWindow);

    // Check for duplicates
    let sameMessages = messageHistory.filter(msg => msg.text === cleanText);

    messageHistory.push({
        text: cleanText,
        timestamp: now
    });

    return sameMessages.length >= spamThreshold;
}

function filterMessage(textHelper) {
    let cleanText = textHelper.getStringStripFormatting();

    // Block specific words
    let blockedWords = ["spam", "advertisement", "forbidden"];
    let containsBlocked = blockedWords.some(word =>
        cleanText.toLowerCase().includes(word)
    );

    if (containsBlocked) {
        Chat.log("Blocked message with forbidden content");
        return false;
    }

    // Check for spam
    if (isSpamMessage(textHelper)) {
        Chat.log("Blocked spam message");
        return false;
    }

    return true;
}

// Filter incoming messages
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    if (!filterMessage(event.message)) {
        event.cancel = true; // Block the message
    }
}));
```

### Automatic Response System

```javascript
// Auto-responder for specific keywords
let autoResponses = {
    "help": "Type !commands for available commands",
    "diamond": "Diamonds are most common at Y levels 5-12",
    "server": "This is a friendly survival server!",
    "welcome": "Welcome to the server! Type !rules to see the rules"
};

function shouldAutoRespond(textHelper) {
    let cleanText = textHelper.getStringStripFormatting().toLowerCase();

    for (let keyword in autoResponses) {
        if (cleanText.includes(keyword)) {
            return keyword;
        }
    }
    return null;
}

jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let keyword = shouldAutoRespond(event.message);

    if (keyword) {
        // Don't respond to our own messages
        let player = Player.getPlayer();
        let cleanText = event.message.getStringStripFormatting();

        if (!cleanText.includes(player.getName())) {
            setTimeout(() => {
                Chat.say(autoResponses[keyword]);
            }, 1000 + Math.random() * 2000); // Random delay
        }
    }
}));
```

### Chat Statistics

```javascript
// Chat activity monitoring
let chatStats = {
    totalMessages: 0,
    messagesByHour: {},
    topWords: {},
    mentions: 0
};

function updateStats(textHelper) {
    let cleanText = textHelper.getStringStripFormatting();
    let hour = new Date().getHours();
    let words = cleanText.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    chatStats.totalMessages++;
    chatStats.messagesByHour[hour] = (chatStats.messagesByHour[hour] || 0) + 1;

    // Count words
    words.forEach(word => {
        chatStats.topWords[word] = (chatStats.topWords[word] || 0) + 1;
    });

    // Check for mentions
    let playerName = Player.getPlayer().getName().toLowerCase();
    if (cleanText.toLowerCase().includes(playerName)) {
        chatStats.mentions++;
    }
}

function getTopWords(count = 10) {
    return Object.entries(chatStats.topWords)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([word, frequency]) => ({ word, frequency }));
}

function displayStats() {
    let topWords = getTopWords(5);
    let mostActiveHour = Object.entries(chatStats.messagesByHour)
        .sort((a, b) => b[1] - a[1])[0];

    Chat.log(`
=== Chat Statistics ===
Total Messages: ${chatStats.totalMessages}
Mentions: ${chatStats.mentions}
Top Words: ${topWords.map(w => w.word).join(", ")}
Most Active Hour: ${mostActiveHour ? mostActiveHour[0] + ":00" : "N/A"}
=====================
    `);
}

// Update stats for all messages
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    updateStats(event.message);
}));

// Display stats every hour
setInterval(displayStats, 3600000);
```

### Message Formatting Utilities

```javascript
// Create formatted text components
function createFancyMessage(mainText, color = "white") {
    return Chat.createTextHelperFromJSON(`{
        "text": "${mainText}",
        "color": "${color}",
        "bold": true,
        "clickEvent": {
            "action": "suggest_command",
            "value": "${mainText}"
        },
        "hoverEvent": {
            "action": "show_text",
            "value": "Click to copy: ${mainText}"
        }
    }`);
}

function createProgressBar(current, maximum, length = 20, color = "green") {
    let filled = Math.floor((current / maximum) * length);
    let empty = length - filled;
    let bar = "§a" + "█".repeat(filled) + "§7" + "█".repeat(empty);

    return Chat.createTextHelperFromJSON(`{
        "text": "[${bar}] ${current}/${maximum}",
        "color": "white"
    }`);
}

function createStatusMessage(status, details = "") {
    let colors = {
        "online": "green",
        "offline": "red",
        "away": "yellow",
        "busy": "red"
    };

    let color = colors[status] || "white";

    return Chat.createTextHelperFromJSON(`{
        "text": "[${status.toUpperCase()}]",
        "color": "${color}",
        "bold": true
    }${details ? `,{"text": " ${details}","color":"white"}` : ""}`);
}

// Usage examples
Chat.say(createFancyMessage("Click me!", "blue"));
Chat.say(createProgressBar(75, 100));
Chat.say(createStatusMessage("online", "Ready to help!"));
```

### Text Processing for Mini-Games

```javascript
// Mini-game text processing
let miniGameState = {
    active: false,
    currentWord: "",
    attempts: 0,
    maxAttempts: 5
};

function startWordScramble() {
    let words = ["minecraft", "diamond", "creeper", "redstone", "enchanted"];
    miniGameState.currentWord = words[Math.floor(Math.random() * words.length)];
    miniGameState.attempts = 0;
    miniGameState.active = true;

    let scrambled = miniGameState.currentWord.split('').sort(() => Math.random() - 0.5).join('');

    Chat.say(Chat.createTextHelperFromJSON(`{
        "text": "Word Scramble! Unscramble: ${scrambled}",
        "color": "gold",
        "bold": true
    }`));
}

function checkGuess(textHelper) {
    if (!miniGameState.active) return;

    let guess = textHelper.getStringStripFormatting().toLowerCase().trim();

    if (guess === miniGameState.currentWord) {
        Chat.say(Chat.createTextHelperFromJSON(`{
            "text": "Correct! The word was ${miniGameState.currentWord}",
            "color": "green",
            "bold": true
        }`));
        miniGameState.active = false;
        setTimeout(startWordScramble, 5000);
    } else {
        miniGameState.attempts++;
        let remaining = miniGameState.maxAttempts - miniGameState.attempts;

        if (remaining <= 0) {
            Chat.say(Chat.createTextHelperFromJSON(`{
                "text": "Game Over! The word was ${miniGameState.currentWord}",
                "color": "red",
                "bold": true
            }`));
            miniGameState.active = false;
            setTimeout(startWordScramble, 3000);
        } else {
            Chat.say(`Wrong! ${remaining} attempts remaining.`);
        }
    }
}

// Start the game
startWordScramble();

// Check guesses
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    checkGuess(event.message);
}));
```

## Integration with Other Classes

TextHelper integrates seamlessly with:
- **Chat**: For creating and sending formatted messages
- **Event System**: For processing chat and message events
- **TextBuilder**: For creating complex text components
- **StyleHelper**: For accessing text styling information

## Performance Notes

- Use `getStringStripFormatting()` for text comparisons when formatting doesn't matter
- Cache processed text when using it multiple times
- For large chat logs, consider implementing pagination or rotation

## Security Considerations

- Be careful when processing chat messages from untrusted sources
- Validate text content before using it in commands
- Consider rate limiting automatic responses

## See Also

- [Chat](../core/Chat.md) - Chat operations and message handling
- [TextBuilder](../core/TextBuilder.md) - Building complex text components
- [StyleHelper](../helpers/StyleHelper.md) - Text styling information
- [FormattingHelper](FormattingHelper.md) - Chat formatting utilities