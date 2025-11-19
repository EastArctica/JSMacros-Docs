# Websocket

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket`

**Extends:** None (direct class)

**Since:** `1.1.9`

A WebSocket client class that provides real-time, bidirectional communication with WebSocket servers. This class enables JsMacros scripts to establish persistent connections to WebSocket endpoints for live data streaming, real-time notifications, chat applications, IoT device communication, and other interactive network protocols.

The Websocket class uses the NV WebSocket library under the hood and provides a simple, event-driven API for handling WebSocket connections, message exchanges, and connection lifecycle events. It supports both secure (`wss://`) and non-secure (`ws://`) WebSocket connections and provides comprehensive error handling and connection state management.

## Constructors
- [new Websocket(address)](#new-websocketaddress)
- [new Websocket(url)](#new-websocketurl)

## Fields
- [instance.onConnect](#instanceonconnect)
- [instance.onTextMessage](#instanceontextmessage)
- [instance.onDisconnect](#instanceondisconnect)
- [instance.onError](#instanceonerror)
- [instance.onFrame](#instanceonframe)

## Methods
- [instance.connect()](#instanceconnect)
- [instance.getWs()](#instancegetws)
- [instance.sendText(text)](#instancesendtexttext)
- [instance.close()](#instanceclose)
- [instance.close(closeCode)](#instancecloseclosecode)

---

## Constructors

### new Websocket(address)
```js
const ws = new Websocket("wss://echo.websocket.events");
```

Creates a new `Websocket` instance with the specified server address. This constructor initializes the WebSocket connection but does not automatically connect to the server. You must call the `connect()` method to establish the actual connection.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| address | `string` | The WebSocket server URL (e.g., `"wss://example.com/socket"` or `"ws://localhost:8080"`) |

**Throws:** `IOException` - If there's an error creating the WebSocket socket

**Since:** `1.1.9`

**Example:**
```js
// Create WebSocket instance for a public echo server
const echoWs = new Websocket("wss://echo.websocket.events");

// Set up event handlers before connecting
echoWs.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    Chat.log("&aConnected to echo server!");
});

echoWs.onTextMessage = JavaWrapper.methodToJava((websocket, message) => {
    Chat.log(`&6Echo received: ${message}`);
});

// Connect to the server
echoWs.connect();
```

### new Websocket(url)
```js
const serverUrl = new java.net.URL("wss://echo.websocket.events");
const ws = new Websocket(serverUrl);
```

Creates a new `Websocket` instance using a Java `URL` object. This constructor is useful when you already have a URL object or need to work with URLs programmatically.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | `java.net.URL` | The WebSocket server URL as a Java URL object |

**Throws:**
- `URISyntaxException` - If the URL is malformed
- `IOException` - If there's an error creating the WebSocket socket

**Since:** `1.1.9`

**Example:**
```js
// Build URL programmatically
const baseUrl = "wss://echo.websocket.events";
const wsUrl = new java.net.URL(baseUrl);
const ws = new Websocket(wsUrl);

// Continue with event handler setup...
ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    Chat.log(`Connected to ${baseUrl}`);
});

ws.connect();
```

---

## Fields

## Methods

## Usage Examples

### Basic WebSocket Communication

```js
// Create WebSocket connection to a test server
const ws = new Websocket("wss://echo.websocket.events");

// Set up connection handler
ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    Chat.log("&aConnected to echo server!");

    // Send a test message
    ws.sendText("Hello from JsMacros WebSocket!");

    // Send JSON data
    const testMessage = {
        type: "test",
        source: "JsMacros",
        timestamp: Date.now(),
        data: {
            player: Player.getPlayer().getName(),
            health: Player.getPlayer().getHealth()
        }
    };
    ws.sendText(JSON.stringify(testMessage));
});

// Set up message handler
ws.onTextMessage = JavaWrapper.methodToJava((websocket, message) => {
    Chat.log(`&6Echo received: ${message}`);

    try {
        const data = JSON.parse(message);
        if (data.type === "test") {
            Chat.log(`&bTest message from ${data.source} at ${new Date(data.timestamp).toLocaleTimeString()}`);
        }
    } catch (e) {
        // Handle plain text messages
    }
});

// Set up disconnect handler
ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    Chat.log("&cEcho server disconnected");
    if (disconnected.serverFrame) {
        Chat.log(`Close code: ${disconnected.serverFrame.getCloseCode()}`);
    }
});

// Set up error handler
ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
    Chat.log(`&cWebSocket error: ${exception.getMessage()}`);
});

// Connect to the server
ws.connect();
```

### Real-time Chat Application

```js
// Connect to a chat WebSocket server
const chatWs = new Websocket("wss://your-chat-server.com/ws");

const username = Player.getPlayer().getName();

chatWs.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    Chat.log("&aConnected to chat server!");

    // Join chat room
    const joinMessage = {
        type: "join",
        username: username,
        room: "minecraft"
    };
    websocket.sendText(JSON.stringify(joinMessage));
});

chatWs.onTextMessage = JavaWrapper.methodToJava((websocket, message) => {
    try {
        const chatData = JSON.parse(message);

        switch (chatData.type) {
            case "chat":
                // Display chat message
                Chat.log(`&b[${chatData.username}]: ${chatData.message}`);

                // Highlight if mentioned
                if (chatData.message && chatData.message.includes(username)) {
                    Chat.title("You were mentioned!", chatData.message, 0, 3, 1);
                }
                break;

            case "user_join":
                Chat.log(`&e${chatData.username} joined the chat`);
                break;

            case "user_leave":
                Chat.log(`&e${chatData.username} left the chat`);
                break;

            case "system":
                Chat.log(`&6[System]: ${chatData.message}`);
                break;
        }
    } catch (e) {
        Chat.log(`&7Raw message: ${message}`);
    }
});

chatWs.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    Chat.log("&cDisconnected from chat server");

    // Implement reconnection
    if (disconnected.isServer && shouldReconnectChat(disconnected)) {
        setTimeout(() => {
            Chat.log("&eAttempting to reconnect to chat...");
            chatWs.connect();
        }, 5000);
    }
});

chatWs.onError = JavaWrapper.methodToJava((websocket, exception) => {
    Chat.log(`&cChat error: ${exception.getMessage()}`);
});

function shouldReconnectChat(disconnected) {
    if (disconnected.serverFrame) {
        const code = disconnected.serverFrame.getCloseCode();
        return code !== 1008; // Don't reconnect on policy violations
    }
    return true; // Reconnect on network issues
}

// Send chat messages from Minecraft chat
const chatCommand = Chat.createCommandBuilder("wschat")
    .stringArg("message")
    .executes(JavaWrapper.methodToJava((context) => {
        const message = context.getArg("message");
        const chatMessage = {
            type: "chat",
            username: username,
            message: message,
            timestamp: Date.now()
        };
        chatWs.sendText(JSON.stringify(chatMessage));
    }))
    .register();

Chat.log("&aChat WebSocket loaded! Use /wschat <message> to send messages");

// Connect to chat server
chatWs.connect();
```

### Game Status Monitor

```js
// WebSocket for monitoring game status
const monitorWs = new Websocket("ws://localhost:8080/monitor");

// Set up connection
monitorWs.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    Chat.log("&aConnected to status monitor!");

    // Start periodic status updates
    startStatusUpdates();
});

monitorWs.onTextMessage = JavaWrapper.methodToJava((websocket, message) => {
    try {
        const command = JSON.parse(message);

        if (command.type === "get_status") {
            sendStatusUpdate();
        } else if (command.type === "execute_command") {
            executeGameCommand(command.command);
        } else if (command.type === "start_monitoring") {
            startDetailedMonitoring();
        }
    } catch (e) {
        Chat.log(`&7Invalid command received: ${message}`);
    }
});

monitorWs.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    Chat.log("&cStatus monitor disconnected");
    stopStatusUpdates();
});

monitorWs.onError = JavaWrapper.methodToJava((websocket, exception) => {
    Chat.log(`&cMonitor error: ${exception.getMessage()}`);
});

let updateInterval = null;

function startStatusUpdates() {
    if (updateInterval) {
        clearInterval(updateInterval);
    }

    updateInterval = setInterval(() => {
        if (monitorWs.getWs().isOpen()) {
            sendStatusUpdate();
        }
    }, 5000); // Update every 5 seconds
}

function sendStatusUpdate() {
    const player = Player.getPlayer();
    if (!player) return;

    const status = {
        type: "status_update",
        timestamp: Date.now(),
        player: {
            name: player.getName(),
            health: player.getHealth(),
            hunger: player.getHunger(),
            experience: player.getExperienceLevel(),
            position: {
                x: Math.floor(player.getPos().x),
                y: Math.floor(player.getPos().y),
                z: Math.floor(player.getPos().z)
            }
        },
        world: {
            dimension: World.getDimension(),
            time: World.getTimeOfDay(),
            weather: {
                raining: World.isRaining(),
                thundering: World.isThundering()
            }
        },
        server: {
            tps: World.serverInstantTPS,
            address: World.getCurrentServerAddress()
        }
    };

    monitorWs.sendText(JSON.stringify(status));
}

function executeGameCommand(command) {
    Chat.log(`&eExecuting command: ${command}`);
    // Note: JsMacros doesn't directly support command execution
    // This is a placeholder for where you might implement command handling
}

function stopStatusUpdates() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

// Connect to monitor
monitorWs.connect();

// Clean up on script stop
JsMacros.on("ScriptStop", JavaWrapper.methodToJava(() => {
    stopStatusUpdates();
    if (monitorWs.getWs().isOpen()) {
        monitorWs.close(1000);
    }
}));
```

### IoT Device Communication

```js
// Connect to IoT device WebSocket
const iotWs = new Websocket("ws://192.168.1.100:8080/ws");

iotWs.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    Chat.log("&aConnected to IoT device!");

    // Send initial configuration
    const config = {
        type: "config",
        updateInterval: 1000, // 1 second
        metrics: ["temperature", "humidity", "light", "motion"]
    };
    websocket.sendText(JSON.stringify(config));
});

iotWs.onTextMessage = JavaWrapper.methodToJava((websocket, message) => {
    try {
        const sensorData = JSON.parse(message);

        switch (sensorData.type) {
            case "sensor_reading":
                displaySensorData(sensorData);
                break;

            case "alert":
                handleSensorAlert(sensorData);
                break;

            case "device_status":
                Chat.log(`&6Device status: ${sensorData.status}`);
                break;
        }
    } catch (e) {
        Chat.log(`&7IoT data: ${message}`);
    }
});

function displaySensorData(data) {
    const timestamp = new Date(data.timestamp).toLocaleTimeString();
    let statusMessage = `&7[${timestamp}] `;

    switch (data.sensor) {
        case "temperature":
            statusMessage += `&eTemperature: ${data.value}°C`;
            if (data.value > 30) {
                statusMessage += " &c(HOT!)";
                Chat.actionbar(statusMessage);
            }
            break;

        case "humidity":
            statusMessage += `&bHumidity: ${data.value}%`;
            break;

        case "light":
            statusMessage += `&fLight: ${data.value} lux`;
            break;

        case "motion":
            if (data.value) {
                statusMessage = "&cMotion detected!";
                Chat.actionbar(statusMessage);
            }
            break;
    }

    Chat.log(statusMessage);
}

function handleSensorAlert(alert) {
    Chat.log(`&cIoT Alert: ${alert.message}`);

    // Display as toast notification
    Chat.toast("IoT Alert", alert.message);

    // Flash screen for critical alerts
    if (alert.severity === "critical") {
        Chat.title("⚠ CRITICAL ALERT ⚠", alert.message, 0, 3, 1);
    }
}

// Send commands to IoT device
const iotCommand = Chat.createCommandBuilder("iot")
    .stringArg("action")
    .executes(JavaWrapper.methodToJava((context) => {
        const action = context.getArg("action");
        const command = {
            type: "command",
            action: action,
            source: "JsMacros"
        };
        iotWs.sendText(JSON.stringify(command));
        Chat.log(`&eSent IoT command: ${action}`);
    }))
    .register();

Chat.log("&aIoT WebSocket loaded! Use /iot <action> to send commands");

// Connect to IoT device
iotWs.connect();
```

---

## Error Handling Best Practices

### Comprehensive Error Management

```js
const ws = new Websocket("wss://example.com/socket");

// Centralized error handling
ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
    const errorMsg = exception.getMessage();
    const errorType = exception.getClass().getSimpleName();

    Chat.log(`&cWebSocket Error [${errorType}]: ${errorMsg}`);

    // Log detailed error information
    logErrorDetails(exception);

    // Attempt recovery based on error type
    attemptErrorRecovery(exception);
});

function logErrorDetails(exception) {
    Chat.log("&7--- Error Details ---");

    // Check for common error patterns
    const message = exception.getMessage();
    if (message) {
        if (message.includes("Connection refused")) {
            Chat.log("&7Cause: Server not running or firewall blocking connection");
        } else if (message.includes("timeout")) {
            Chat.log("&7Cause: Connection timeout - server may be overloaded");
        } else if (message.includes("SSL") || message.includes("certificate")) {
            Chat.log("&7Cause: SSL/TLS certificate issue");
        } else if (message.includes("403") || message.includes("401")) {
            Chat.log("&7Cause: Authentication or authorization error");
        }
    }

    Chat.log("&7--- End Details ---");
}

function attemptErrorRecovery(exception) {
    const message = exception.getMessage();

    if (message && message.includes("Connection refused")) {
        // Server down - implement exponential backoff
        scheduleReconnectWithBackoff();
    } else if (message && message.includes("timeout")) {
        // Timeout - try immediate reconnect once
        setTimeout(() => {
            try {
                ws.connect();
            } catch (e) {
                Chat.log("&cImmediate reconnect failed, will try later");
            }
        }, 1000);
    } else if (message && (message.includes("403") || message.includes("401"))) {
        // Authentication error - don't reconnect automatically
        Chat.log("&6Authentication error - check credentials");
    }
}

let reconnectAttempts = 0;
let reconnectDelay = 1000;

function scheduleReconnectWithBackoff() {
    if (reconnectAttempts >= 5) {
        Chat.log("&cMax reconnection attempts reached");
        return;
    }

    setTimeout(() => {
        try {
            Chat.log(`&eReconnecting... (attempt ${reconnectAttempts + 1})`);
            ws.connect();
            reconnectAttempts = 0;
            reconnectDelay = 1000;
        } catch (e) {
            Chat.log(`&cReconnect failed: ${e.message}`);
            reconnectAttempts++;
            reconnectDelay = Math.min(reconnectDelay * 2, 30000);
            scheduleReconnectWithBackoff();
        }
    }, reconnectDelay);
}
```

### Connection State Management

```js
// Track connection state to prevent operations on closed connections
let isConnected = false;
let isConnecting = false;
let lastError = null;

const ws = new Websocket("wss://example.com/socket");

ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
    isConnected = true;
    isConnecting = false;
    lastError = null;
    Chat.log("&aWebSocket connected successfully!");

    // Clear any error state
    clearErrorState();
});

ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    isConnected = false;
    isConnecting = false;
    Chat.log("&cWebSocket disconnected");

    // Log disconnection reason
    logDisconnectionReason(disconnected);
});

ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
    lastError = exception;
    isConnecting = false;
    Chat.log(`&cWebSocket error: ${exception.getMessage()}`);
});

// Safe send function
function safeSendMessage(message) {
    if (!isConnected) {
        Chat.log("&cCannot send message - not connected");
        return false;
    }

    try {
        ws.sendText(message);
        return true;
    } catch (e) {
        Chat.log(`&cFailed to send message: ${e.message}`);
        return false;
    }
}

// Safe connect function
function safeConnect() {
    if (isConnected) {
        Chat.log("&7Already connected");
        return;
    }

    if (isConnecting) {
        Chat.log("&7Connection already in progress");
        return;
    }

    isConnecting = true;
    try {
        ws.connect();
        Chat.log("&7Connecting to WebSocket...");
    } catch (e) {
        isConnecting = false;
        Chat.log(`&cConnection failed: ${e.message}`);
    }
}

// Get connection status
function getConnectionStatus() {
    if (isConnected) return "connected";
    if (isConnecting) return "connecting";
    if (lastError) return "error";
    return "disconnected";
}
```

---

## Important Notes

### Connection Management

- **Set event handlers before connecting**: All callback functions should be assigned before calling `connect()`
- **Handle connection lifecycle**: Implement proper `onConnect`, `onDisconnect`, and `onError` handlers
- **Check connection state**: Verify the WebSocket is open before sending messages
- **Implement reconnection logic**: Network connections can fail unexpectedly
- **Graceful shutdown**: Always close connections properly when done

### Performance Considerations

- **Message rate limiting**: Don't send messages too frequently to avoid overwhelming the server
- **Connection reuse**: Reuse WebSocket connections instead of creating new ones for each message
- **Memory management**: Large messages or high-frequency updates can consume significant memory
- **Timeout handling**: Implement appropriate timeouts for connection establishment
- **Error recovery**: Don't retry connections too aggressively to avoid server overload

### Security Considerations

- **Use WSS for sensitive data**: Always use secure WebSocket connections (`wss://`) for sensitive information
- **Validate incoming data**: Always validate and sanitize messages received from WebSocket servers
- **Authentication**: Implement proper authentication and authorization
- **Error information**: Be careful not to expose sensitive information in error messages
- **Network security**: Ensure WebSocket servers are trusted and properly secured

### WebSocket Protocol Details

- **Close codes**: Use appropriate WebSocket close codes to indicate disconnection reasons
- **Message framing**: Text messages are automatically UTF-8 encoded
- **Binary data**: For binary data, use the raw WebSocket object methods
- **Ping/Pong**: Automatic ping/pong handling is managed by the underlying WebSocket library
- **Fragmentation**: Large messages may be automatically fragmented by the WebSocket implementation

### Debugging Tips

- **Enable frame logging**: Use `onFrame` callback for detailed protocol debugging
- **Log connection headers**: Examine server response headers in `onConnect` handler
- **Monitor close codes**: Pay attention to close codes in `onDisconnect` for troubleshooting
- **Network tools**: Use browser developer tools or external WebSocket clients for testing
- **Server logs**: Correlate client behavior with server-side logs for comprehensive debugging

