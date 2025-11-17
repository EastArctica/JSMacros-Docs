# Utils

The Utils library provides general utility functions for everyday scripting tasks, including clipboard operations, file management, text processing, hashing, encoding, and system integration. These are commonly used functions that script writers frequently need.

## Access

```javascript
let utils = Utils;
// Or use direct method calls: Utils.methodName()
```

## Methods

### System Operations

#### openUrl(url)
Opens the specified URL in the default web browser.

```javascript
Utils.openUrl("https://www.google.com");
```

#### openFile(path)
Opens a file relative to the JsMacros config folder using the default application.

```javascript
Utils.openFile("scripts/my_script.js");
Utils.openFile("config/settings.json");
```

### Clipboard Operations

#### copyToClipboard(text)
Copies text to the system clipboard.

```javascript
Utils.copyToClipboard("Hello, World!");
```

#### getClipboard()
Returns the current text content of the system clipboard.

```javascript
let clipboardText = Utils.getClipboard();
console.log("Clipboard contains:", clipboardText);
```

### Text Processing

#### guessName(text)
Attempts to guess the username from a chat message or text.

```javascript
let message = "<Player123> Hello everyone!";
let guessedName = Utils.guessName(message);
console.log("Sender name:", guessedName); // "Player123"
```

#### guessName(textHelper)
Same as above, but accepts a TextHelper object.

```javascript
let textHelper = event.message; // From a chat event
let guessedName = Utils.guessName(textHelper);
```

#### guessNameAndRoles(text)
Attempts to guess the username and any roles/titles from a chat message.

```javascript
let message = "[Admin] Player123: Hello everyone!";
let namesAndRoles = Utils.guessNameAndRoles(message);
console.log("Detected:", namesAndRoles); // ["[Admin]", "Player123"]
```

#### guessNameAndRoles(textHelper)
Same as above, but accepts a TextHelper object.

```javascript
let namesAndRoles = Utils.guessNameAndRoles(event.message);
```

### Hashing Functions

#### hashString(message)
Hashes a string using SHA-256.

```javascript
let hash = Utils.hashString("Hello, World!");
console.log("SHA-256:", hash);
```

#### hashString(message, algorithm)
Hashes a string using the specified algorithm.

```javascript
let sha1Hash = Utils.hashString("Hello, World!", "sha1");
let md5Hash = Utils.hashString("Hello, World!", "md5");
let sha512Hash = Utils.hashString("Hello, World!", "sha512");
```

**Supported algorithms:**
- `sha1`
- `sha256`
- `sha384`
- `sha512`
- `md2`
- `md5`

#### hashString(message, algorithm, base64)
Hashes a string and optionally encodes the result in Base64.

```javascript
let hashBase64 = Utils.hashString("Hello, World!", "sha256", true);
let hashHex = Utils.hashString("Hello, World!", "sha256", false);
```

### Encoding/Decoding

#### encode(message)
Encodes a string using Base64.

```javascript
let encoded = Utils.encode("Hello, World!");
console.log("Encoded:", encoded); // SGVsbG8sIFdvcmxkIQ==
```

#### decode(message)
Decodes a Base64 encoded string.

```javascript
let decoded = Utils.decode("SGVsbG8sIFdvcmxkIQ==");
console.log("Decoded:", decoded); // Hello, World!
```

### Null Safety

#### requireNonNull(obj)
Throws a NullPointerException if the object is null, otherwise returns the object.

```javascript
let requiredValue = Utils.requireNonNull(someValue);
```

#### requireNonNull(obj, message)
Throws a NullPointerException with a custom message if the object is null.

```javascript
let requiredValue = Utils.requireNonNull(someValue, "Value cannot be null");
```

## Examples

### Chat Message Processing

```javascript
// Process incoming chat messages
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let message = event.message.getStringStripFormatting();

    // Extract sender information
    let senderName = Utils.guessName(message);
    let namesAndRoles = Utils.guessNameAndRoles(message);

    if (senderName) {
        console.log(`Message from ${senderName}: ${message}`);

        // Check for mentions
        let player = Player.getPlayer();
        if (message.includes(player.getName())) {
            console.log("You were mentioned!");

            // Copy the message to clipboard for quick reference
            Utils.copyToClipboard(message);
            Chat.log("Message copied to clipboard!");
        }
    }
}));
```

### File Management and Configuration

```javascript
// Configuration management
function loadConfig() {
    try {
        let configPath = "config/my_script_config.json";
        let file = Fs.open(configPath);
        let content = file.read();
        return JSON.parse(content);
    } catch (e) {
        console.log("Config not found, creating default...");
        return createDefaultConfig();
    }
}

function createDefaultConfig() {
    let defaultConfig = {
        enabled: true,
        message: "Hello from JsMacros!",
        color: 0x00FF00,
        version: "1.0.0"
    };

    saveConfig(defaultConfig);
    return defaultConfig;
}

function saveConfig(config) {
    let configPath = "config/my_script_config.json";
    let file = Fs.open(configPath, "w");
    file.write(JSON.stringify(config, null, 2));
    console.log("Configuration saved!");
}

function openConfigEditor() {
    Utils.openFile("config/my_script_config.json");
}

// Example usage
let config = loadConfig();
console.log("Loaded config:", config);

// Open config file for editing
if (config.version === "1.0.0") {
    openConfigEditor();
}
```

### Password and Security Utilities

```javascript
// Simple password hashing for user authentication
function hashPassword(password) {
    // Use salt for better security
    let salt = "my_unique_salt_value";
    let saltedPassword = password + salt;
    return Utils.hashString(saltedPassword, "sha512");
}

function verifyPassword(password, storedHash) {
    let calculatedHash = hashPassword(password);
    return calculatedHash === storedHash;
}

// Generate unique identifiers
function generateUniqueId(data) {
    let timestamp = Date.now();
    let random = Math.random().toString(36);
    let combined = `${timestamp}-${random}-${data}`;
    return Utils.hashString(combined, "sha256");
}

// Usage
let userPassword = "userSecret123";
let hashedPassword = hashPassword(userPassword);
console.log("Hashed password:", hashedPassword);

let isValid = verifyPassword("userSecret123", hashedPassword);
console.log("Password valid:", isValid);
```

### Data Validation and Error Handling

```javascript
// Safe data processing
function processUserData(userData) {
    try {
        // Ensure required fields exist
        let username = Utils.requireNonNull(userData.username, "Username is required");
        let email = Utils.requireNonNull(userData.email, "Email is required");

        // Validate email format (simple check)
        if (!email.includes("@")) {
            throw new Error("Invalid email format");
        }

        // Generate user ID
        let userId = Utils.hashString(username + email, "sha256");

        // Process user data
        let processedData = {
            id: userId,
            username: username,
            email: email,
            created: Date.now()
        };

        console.log("User data processed successfully:", processedData);
        return processedData;

    } catch (error) {
        console.error("Error processing user data:", error.message);
        return null;
    }
}

// Example usage
let userData = {
    username: "player123",
    email: "player@example.com"
};

let processed = processUserData(userData);
if (processed) {
    console.log("Processing successful!");
}
```

### Clipboard Integration

```javascript
// Enhanced clipboard manager
let clipboardHistory = [];
let maxHistorySize = 10;

function addToClipboardHistory(text) {
    clipboardHistory.unshift({
        text: text,
        timestamp: Date.now()
    });

    // Limit history size
    if (clipboardHistory.length > maxHistorySize) {
        clipboardHistory.pop();
    }

    console.log("Added to clipboard history:", text.substring(0, 50));
}

function getClipboardHistory() {
    return clipboardHistory.slice(); // Return copy
}

function searchClipboard(query) {
    return clipboardHistory.filter(item =>
        item.text.toLowerCase().includes(query.toLowerCase())
    );
}

// Monitor clipboard changes
jsmacros.on("Key", JavaWrapper.methodToJava((event) => {
    // Ctrl+C (copy)
    if (event.action === 1 && event.key === "key.keyboard.c" && event.mods === 2) {
        setTimeout(() => {
            let clipboardContent = Utils.getClipboard();
            if (clipboardContent && clipboardContent.trim()) {
                addToClipboardHistory(clipboardContent);
            }
        }, 100);
    }

    // Ctrl+Shift+V (paste from history)
    if (event.action === 1 && event.key === "key.keyboard.v" && event.mods === 3) {
        let recent = getClipboardHistory();
        if (recent.length > 0) {
            Utils.copyToClipboard(recent[0].text);
            Chat.log(`Restored from history: ${recent[0].text.substring(0, 30)}...`);
        }
    }
}));
```

### Web Integration

```javascript
// Quick web search functionality
function webSearch(query) {
    if (!query || query.trim() === "") {
        Chat.log("Please provide a search query");
        return;
    }

    let encodedQuery = encodeURIComponent(query.trim());
    let searchUrl = `https://www.google.com/search?q=${encodedQuery}`;

    Chat.log(`Searching for: ${query}`);
    Utils.openUrl(searchUrl);
}

// Quick wiki lookup
function wikiLookup(topic) {
    if (!topic || topic.trim() === "") {
        Chat.log("Please provide a topic to look up");
        return;
    }

    let encodedTopic = encodeURIComponent(topic.trim());
    let wikiUrl = `https://minecraft.wiki/w/${encodedTopic}`;

    Chat.log(`Looking up: ${topic}`);
    Utils.openUrl(wikiUrl);
}

// Example usage from chat commands
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let message = event.message.getStringStripFormatting();

    // !search <query>
    if (message.startsWith("!search ")) {
        let query = message.substring(9);
        webSearch(query);
    }

    // !wiki <topic>
    if (message.startsWith("!wiki ")) {
        let topic = message.substring(7);
        wikiLookup(topic);
    }
}));
```

### Data Compression and Storage

```javascript
// Compress chat messages for storage
function compressMessages(messages) {
    let compressed = [];
    for (let message of messages) {
        // Simple compression: encode non-critical parts
        let compressedMessage = {
            t: message.timestamp,
            s: message.sender,
            m: Utils.encode(message.text), // Encode message text
            c: message.channel
        };
        compressed.push(compressedMessage);
    }
    return compressed;
}

function decompressMessages(compressed) {
    let decompressed = [];
    for (let message of compressed) {
        let decompressedMessage = {
            timestamp: message.t,
            sender: message.s,
            text: Utils.decode(message.m), // Decode message text
            channel: message.c
        };
        decompressed.push(decompressedMessage);
    }
    return decompressed;
}

// Store chat log with compression
function saveChatLog(messages, filename) {
    try {
        let compressed = compressMessages(messages);
        let jsonData = JSON.stringify(compressed);
        let file = Fs.open(`logs/${filename}.json`, "w");
        file.write(jsonData);
        console.log(`Chat log saved: ${filename}`);
    } catch (error) {
        console.error("Error saving chat log:", error);
    }
}
```

## Integration with Other Classes

Utils integrates seamlessly with:
- **Fs**: For file operations (use `openFile()` to quickly access files)
- **Chat**: For message processing and formatting
- **Player**: For user-related operations
- **Event System**: For processing chat and user interaction events

## Best Practices

1. **Error Handling**: Always wrap Utils operations in try-catch blocks
2. **Null Safety**: Use `requireNonNull()` for critical inputs
3. **Security**: For passwords, use salted hashing with strong algorithms like SHA-512
4. **Performance**: Cache clipboard content and processed results when possible
5. **User Experience**: Provide feedback when performing system operations like opening files

## Security Notes

- Never store sensitive information in plain text
- Use salted hashing for passwords and authentication
- Be careful when processing user-provided text with `guessName()` functions
- Validate all external inputs before processing

## See Also

- [Fs](../core/Fs.md) - File system operations
- [Chat](../core/Chat.md) - Chat and message handling
- [Player](../core/Player.md) - Player operations and properties