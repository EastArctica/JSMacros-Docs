# Websocket$Disconnected

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.Websocket$Disconnected`

**Package:** `xyz.wagyourtail.jsmacros.core.library.impl.classes`

**Since:** `1.1.9`

## Overview

The `Disconnected` class is a nested class within `Websocket` that provides detailed information about WebSocket disconnection events. This class is passed to the `onDisconnect` callback when a WebSocket connection is terminated, allowing scripts to analyze the disconnection cause and implement appropriate reconnection or cleanup logic.

The class contains information about whether the disconnection was initiated by the server or client, and provides access to the WebSocket close frame that contains the close code and reason.

## Class Structure

```java
public static class Disconnected {
    public final boolean isServer;
    public final WebSocketFrame serverFrame;
    public final WebSocketFrame clientFrame;
}
```

## Fields

### `isServer`
**Type:** `boolean`

Indicates whether the disconnection was initiated by the server (`true`) or client (`false`). This is useful for determining whether to attempt reconnection or to handle the disconnection differently based on the initiator.

**Values:**
- `true`: Server initiated the disconnection
- `false`: Client initiated the disconnection

**Example:**
```javascript
ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    if (disconnected.isServer) {
        Chat.log("Server closed the connection");
        // Consider implementing reconnection logic
    } else {
        Chat.log("Client closed the connection");
        // No need to reconnect if we closed it intentionally
    }
});
```

### `serverFrame`
**Type:** `WebSocketFrame` or `null`

The WebSocket close frame sent by the server, if available. This contains the close code and reason provided by the server. If the disconnection was not initiated by the server or if no frame was received, this will be `null`.

**Access:** `public final`

**Example:**
```javascript
ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    if (disconnected.serverFrame) {
        const closeCode = disconnected.serverFrame.getCloseCode();
        const reason = disconnected.serverFrame.getCloseReason();
        Chat.log(`Server disconnected with code ${closeCode}: ${reason}`);
    }
});
```

### `clientFrame`
**Type:** `WebSocketFrame` or `null`

The WebSocket close frame sent by the client, if available. This contains the close code and reason that the client sent when initiating the disconnection.

**Access:** `public final`

**Example:**
```javascript
ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    if (disconnected.clientFrame) {
        const closeCode = disconnected.clientFrame.getCloseCode();
        Chat.log(`Client initiated close with code: ${closeCode}`);
    }
});
```

## WebSocketFrame Methods

When accessing `serverFrame` or `clientFrame`, you can use these common methods:

### `getCloseCode()`
**Returns:** `int` - The WebSocket close code

Standard WebSocket close codes include:
- 1000: Normal Closure (clean disconnection)
- 1001: Going Away (server going down)
- 1002: Protocol Error
- 1003: Unsupported Data
- 1004: Reserved
- 1005: No Status Rcvd (no status code provided)
- 1006: Abnormal Closure (connection lost)
- 1007: Invalid frame payload data
- 1008: Policy Violation
- 1009: Message Too Big
- 1010: Mandatory Extension
- 1011: Internal Server Error
- 1015: TLS handshake

### `getCloseReason()`
**Returns:** `String` - Human-readable reason for disconnection

## Usage Examples

### Example 1: Basic Disconnection Handling
```javascript
const ws = new Websocket("wss://echo.websocket.events");

ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
    Chat.log("=== WebSocket Disconnected ===");
    Chat.log(`Initiator: ${disconnected.isServer ? "Server" : "Client"}`);

    if (disconnected.isServer) {
        if (disconnected.serverFrame) {
            const code = disconnected.serverFrame.getCloseCode();
            const reason = disconnected.serverFrame.getCloseReason();
            Chat.log(`Server close code: ${code}`);
            Chat.log(`Server reason: ${reason}`);

            // Handle different close codes
            switch (code) {
                case 1000:
                    Chat.log("✅ Normal disconnection");
                    break;
                case 1001:
                    Chat.log("🔄 Server going down - may reconnect later");
                    break;
                case 1006:
                    Chat.log("❌ Abnormal disconnection - network issue");
                    break;
                case 1008:
                    Chat.log("🚫 Policy violation - should not reconnect");
                    break;
                default:
                    Chat.log(`⚠️ Unusual close code: ${code}`);
            }
        } else {
            Chat.log("🔌 Connection lost without server close frame");
        }
    } else {
        Chat.log("👋 Client-initiated disconnection");
    }
});

ws.connect();
```

### Example 2: Smart Reconnection Logic
```javascript
function createResilientWebSocket(url, maxReconnectAttempts = 5) {
    const ws = new Websocket(url);
    let reconnectAttempts = 0;
    let reconnectDelay = 1000; // Start with 1 second

    const attemptReconnect = () => {
        if (reconnectAttempts >= maxReconnectAttempts) {
            Chat.log(`❌ Max reconnection attempts (${maxReconnectAttempts}) reached`);
            return;
        }

        reconnectAttempts++;
        Chat.log(`🔄 Reconnection attempt ${reconnectAttempts}/${maxReconnectAttempts} in ${reconnectDelay}ms...`);

        setTimeout(() => {
            try {
                ws.connect();
                reconnectAttempts = 0; // Reset on successful connection
                reconnectDelay = 1000; // Reset delay
                Chat.log("✅ Reconnection successful");
            } catch (e) {
                Chat.log(`❌ Reconnection failed: ${e.message}`);
                reconnectDelay = Math.min(reconnectDelay * 2, 30000); // Exponential backoff, max 30s
                attemptReconnect();
            }
        }, reconnectDelay);
    };

    ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
        Chat.log(`✅ Connected to WebSocket: ${url}`);
        reconnectAttempts = 0;
        reconnectDelay = 1000;
    });

    ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
        Chat.log(`🔌 WebSocket disconnected`);

        if (disconnected.isServer && disconnected.serverFrame) {
            const code = disconnected.serverFrame.getCloseCode();
            const reason = disconnected.serverFrame.getCloseReason();

            Chat.log(`Server close code: ${code}, reason: ${reason}`);

            // Decide whether to reconnect based on close code
            switch (code) {
                case 1000: // Normal closure
                    Chat.log("👋 Clean disconnection - no reconnection needed");
                    break;

                case 1001: // Going away
                    Chat.log("🔄 Server shutting down - will reconnect");
                    attemptReconnect();
                    break;

                case 1006: // Abnormal closure
                    Chat.log("⚡ Connection lost - will reconnect");
                    attemptReconnect();
                    break;

                case 1008: // Policy violation
                    Chat.log("🚫 Policy violation - should not reconnect");
                    break;

                case 1011: // Internal server error
                    Chat.log("💥 Server error - will retry reconnection");
                    attemptReconnect();
                    break;

                default:
                    Chat.log(`❓ Unknown close code ${code} - attempting reconnection`);
                    attemptReconnect();
            }
        } else {
            // Client disconnection or no server frame
            if (disconnected.isServer) {
                Chat.log("⚡ Connection lost without close frame - reconnecting");
                attemptReconnect();
            } else {
                Chat.log("👋 Client disconnection - no reconnection");
            }
        }
    });

    ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
        Chat.log(`❌ WebSocket error: ${exception.getMessage()}`);
    });

    return ws;
}

// Usage
const resilientWs = createResilientWebSocket("wss://echo.websocket.events");
resilientWs.connect();
```

### Example 3: Disconnection Analytics
```javascript
function createWebSocketWithAnalytics(url) {
    const ws = new Websocket(url);
    const analytics = {
        connectionTime: null,
        disconnectionTime: null,
        disconnectReasons: {},
        totalDisconnects: 0,
        reconnectionAttempts: 0
    };

    ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
        analytics.connectionTime = Date.now();
        Chat.log(`📊 Connected at ${new Date(analytics.connectionTime).toLocaleTimeString()}`);

        // Show current analytics
        Chat.log(`📈 Total disconnects: ${analytics.totalDisconnects}`);
        Chat.log(`📈 Reconnection attempts: ${analytics.reconnectionAttempts}`);
    });

    ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
        analytics.disconnectionTime = Date.now();
        analytics.totalDisconnects++;

        const duration = analytics.connectionTime ?
            analytics.disconnectionTime - analytics.connectionTime : 0;

        Chat.log("=== Disconnection Analytics ===");
        Chat.log(`🕐 Disconnected at ${new Date(analytics.disconnectionTime).toLocaleTimeString()}`);
        Chat.log(`⏱️ Connection duration: ${Math.round(duration / 1000)}s`);
        Chat.log(`🔄 Initiator: ${disconnected.isServer ? "Server" : "Client"}`);

        let reasonKey = "unknown";

        if (disconnected.isServer && disconnected.serverFrame) {
            const code = disconnected.serverFrame.getCloseCode();
            const reason = disconnected.serverFrame.getCloseReason();
            reasonKey = `server_${code}`;

            Chat.log(`📋 Server close code: ${code}`);
            Chat.log(`📋 Server reason: ${reason}`);

            // Update reason statistics
            analytics.disconnectReasons[reasonKey] =
                (analytics.disconnectReasons[reasonKey] || 0) + 1;
        } else if (!disconnected.isServer) {
            reasonKey = "client_initiated";
            analytics.disconnectReasons[reasonKey] =
                (analytics.disconnectReasons[reasonKey] || 0) + 1;
        } else {
            analytics.disconnectReasons[reasonKey] =
                (analytics.disconnectReasons[reasonKey] || 0) + 1;
        }

        // Display disconnect reason statistics
        Chat.log("📊 Disconnect Reason Statistics:");
        for (const [reason, count] of Object.entries(analytics.disconnectReasons)) {
            Chat.log(`  ${reason}: ${count}`);
        }
    });

    ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
        Chat.log(`❌ Error: ${exception.getMessage()}`);
    });

    return ws;
}

// Usage
const analyticsWs = createWebSocketWithAnalytics("wss://echo.websocket.events");
analyticsWs.connect();
```

### Example 4: WebSocket Pool Management
```javascript
class WebSocketPool {
    constructor(url, poolSize = 3) {
        this.url = url;
        this.poolSize = poolSize;
        this.connections = [];
        this.availableConnections = [];
        this.connectionStats = {};

        this.initializePool();
    }

    initializePool() {
        Chat.log(`🏊 Initializing WebSocket pool with ${this.poolSize} connections`);

        for (let i = 0; i < this.poolSize; i++) {
            this.createConnection(i);
        }
    }

    createConnection(id) {
        const ws = new Websocket(this.url);

        ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
            Chat.log(`✅ Pool connection ${id} established`);
            this.availableConnections.push(id);
            this.connectionStats[id] = {
                connected: Date.now(),
                disconnects: 0,
                lastDisconnect: null
            };
        });

        ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
            Chat.log(`🔌 Pool connection ${id} disconnected`);

            // Update statistics
            if (this.connectionStats[id]) {
                this.connectionStats[id].disconnects++;
                this.connectionStats[id].lastDisconnect = Date.now();
            }

            // Remove from available connections
            const index = this.availableConnections.indexOf(id);
            if (index > -1) {
                this.availableConnections.splice(index, 1);
            }

            // Analyze disconnection and decide on reconnection
            this.handleDisconnection(id, disconnected);
        });

        ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
            Chat.log(`❌ Pool connection ${id} error: ${exception.getMessage()}`);
        });

        this.connections[id] = ws;

        try {
            ws.connect();
        } catch (e) {
            Chat.log(`❌ Failed to connect pool ${id}: ${e.message}`);
            setTimeout(() => this.createConnection(id), 5000);
        }
    }

    handleDisconnection(id, disconnected) {
        if (disconnected.isServer && disconnected.serverFrame) {
            const code = disconnected.serverFrame.getCloseCode();

            switch (code) {
                case 1000: // Normal closure
                case 1008: // Policy violation
                    Chat.log(`⛔ Connection ${id} disconnected permanently (code ${code})`);
                    // Don't reconnect immediately
                    setTimeout(() => this.createConnection(id), 30000);
                    break;

                case 1001: // Going away
                case 1006: // Abnormal closure
                case 1011: // Internal server error
                    Chat.log(`🔄 Connection ${id} will reconnect (code ${code})`);
                    setTimeout(() => this.createConnection(id), 5000);
                    break;

                default:
                    Chat.log(`❓ Connection ${id} reconnecting (code ${code})`);
                    setTimeout(() => this.createConnection(id), 10000);
            }
        } else {
            // Client disconnection or no server frame
            Chat.log(`🔄 Connection ${id} reconnecting (no server close frame)`);
            setTimeout(() => this.createConnection(id), 3000);
        }
    }

    getPoolStats() {
        Chat.log("=== WebSocket Pool Statistics ===");
        Chat.log(`📊 Pool size: ${this.poolSize}`);
        Chat.log(`📊 Available connections: ${this.availableConnections.length}`);

        for (const [id, stats] of Object.entries(this.connectionStats)) {
            const uptime = stats.connected ?
                Math.round((Date.now() - stats.connected) / 1000) : 0;
            const timeSinceLastDisconnect = stats.lastDisconnect ?
                Math.round((Date.now() - stats.lastDisconnect) / 1000) : 0;

            Chat.log(`🔗 Connection ${id}:`);
            Chat.log(`  Uptime: ${uptime}s`);
            Chat.log(`  Disconnects: ${stats.disconnects}`);
            Chat.log(`  Last disconnect: ${timeSinceLastDisconnect}s ago`);
        }
    }
}

// Usage
const pool = new WebSocketPool("wss://echo.websocket.events", 3);

// Show pool stats every 30 seconds
setInterval(() => pool.getPoolStats(), 30000);
```

### Example 5: Advanced Error Analysis and Recovery
```javascript
function createAdvancedWebSocket(url) {
    const ws = new Websocket(url);
    const errorLog = [];
    const maxLogEntries = 50;

    const logError = (type, details) => {
        const entry = {
            timestamp: Date.now(),
            type: type,
            details: details
        };

        errorLog.push(entry);

        // Keep only recent entries
        if (errorLog.length > maxLogEntries) {
            errorLog.shift();
        }

        Chat.log(`🔍 ${type}: ${details}`);
    };

    ws.onConnect = JavaWrapper.methodToJava((websocket, headers) => {
        logError("CONNECTION", `Connected to ${url}`);
        // Clear old errors on successful connection
        errorLog.length = 0;
    });

    ws.onDisconnect = JavaWrapper.methodToJava((websocket, disconnected) => {
        const details = {
            initiator: disconnected.isServer ? "server" : "client",
            hasServerFrame: !!disconnected.serverFrame,
            hasClientFrame: !!disconnected.clientFrame
        };

        if (disconnected.isServer && disconnected.serverFrame) {
            details.closeCode = disconnected.serverFrame.getCloseCode();
            details.closeReason = disconnected.serverFrame.getCloseReason();
        }

        logError("DISCONNECTION", JSON.stringify(details));

        // Implement intelligent recovery based on pattern analysis
        implementIntelligentRecovery(disconnected);
    });

    ws.onError = JavaWrapper.methodToJava((websocket, exception) => {
        const details = {
            exception: exception.getMessage(),
            exceptionType: exception.getClass().getSimpleName()
        };
        logError("ERROR", JSON.stringify(details));
    });

    function implementIntelligentRecovery(disconnected) {
        // Analyze recent error patterns
        const recentErrors = errorLog.slice(-5);
        const disconnectPatterns = recentErrors.filter(e => e.type === "DISCONNECTION");
        const errorPatterns = recentErrors.filter(e => e.type === "ERROR");

        // Check for connection cycling (frequent disconnects)
        if (disconnectPatterns.length >= 3) {
            const timeSpan = disconnectPatterns[disconnectPatterns.length - 1].timestamp -
                           disconnectPatterns[0].timestamp;

            if (timeSpan < 60000) { // Less than 1 minute
                logError("RECOVERY", "Connection cycling detected - implementing backoff");

                // Implement exponential backoff
                const backoffTime = Math.min(30000, 1000 * Math.pow(2, disconnectPatterns.length));
                setTimeout(() => {
                    logError("RECOVERY", `Attempting reconnection after ${backoffTime}ms backoff`);
                    try {
                        ws.connect();
                    } catch (e) {
                        logError("RECOVERY", `Reconnection failed: ${e.message}`);
                    }
                }, backoffTime);
                return;
            }
        }

        // Check for policy violations
        if (disconnected.isServer && disconnected.serverFrame) {
            const code = disconnected.serverFrame.getCloseCode();
            if (code === 1008) {
                logError("RECOVERY", "Policy violation - extended backoff");
                setTimeout(() => {
                    try {
                        ws.connect();
                    } catch (e) {
                        logError("RECOVERY", `Policy violation reconnection failed: ${e.message}`);
                    }
                }, 60000); // 1 minute backoff
                return;
            }
        }

        // Default reconnection
        logError("RECOVERY", "Standard reconnection attempt");
        setTimeout(() => {
            try {
                ws.connect();
            } catch (e) {
                logError("RECOVERY", `Standard reconnection failed: ${e.message}`);
            }
        }, 5000);
    }

    // Add method to get error diagnostics
    ws.getDiagnostics = () => {
        return {
            totalErrors: errorLog.length,
            recentErrors: errorLog.slice(-10),
            errorTypes: [...new Set(errorLog.map(e => e.type))],
            averageErrorFrequency: errorLog.length > 1 ?
                (errorLog[errorLog.length - 1].timestamp - errorLog[0].timestamp) / (errorLog.length - 1) : 0
        };
    };

    return ws;
}

// Usage
const advancedWs = createAdvancedWebSocket("wss://echo.websocket.events");
advancedWs.connect();

// Show diagnostics periodically
setInterval(() => {
    const diagnostics = advancedWs.getDiagnostics();
    Chat.log(`🔍 WebSocket Diagnostics: ${JSON.stringify(diagnostics)}`);
}, 60000);
```

## Common WebSocket Close Codes

Here are the most important WebSocket close codes and their meanings:

### Normal Closure (1000)
- Indicates a clean disconnection
- Should not trigger reconnection unless required by application logic

### Going Away (1001)
- Server is going down or browser navigating away
- Safe to reconnect after a delay

### Protocol Error (1002)
- Protocol error occurred
- May indicate server incompatibility

### Unsupported Data (1003)
- Received unsupported data type
- Check data format being sent

### Abnormal Closure (1006)
- Connection lost without close frame
- Usually indicates network issues
- Safe to reconnect immediately

### Policy Violation (1008)
- Received data violates policy
- Should NOT reconnect automatically
- May require fixing the data being sent

### Message Too Big (1009)
- Message too large to process
- Consider message size limits

### Internal Server Error (1011)
- Server encountered unexpected condition
- Safe to reconnect after delay

## Important Notes

### Frame Availability

1. **Server Frame:** Only available when `isServer` is `true`
2. **Client Frame:** Only available when client initiated disconnection
3. **Null Handling:** Always check for `null` before accessing frame properties

### Reconnection Logic

1. **Close Codes:** Different codes require different reconnection strategies
2. **Backoff:** Implement exponential backoff for failed reconnections
3. **Policy Violations:** Avoid automatic reconnection on policy violations

### Error Handling

1. **Network Issues:** Code 1006 indicates network problems
2. **Server Errors:** Codes 1000-1011 indicate server-side issues
3. **Client Issues:** Client-initiated disconnections shouldn't trigger reconnection

## Best Practices

1. **Close Code Analysis:** Always analyze close codes before deciding on reconnection
2. **Reconnection Limits:** Implement maximum reconnection attempts
3. **Backoff Strategy:** Use exponential backoff for failed reconnections
4. **Policy Violations:** Handle policy violations (code 1008) specially
5. **Logging:** Maintain logs for debugging connection issues
6. **User Feedback:** Provide clear feedback about connection status

## Related Classes

- [`Websocket`](Websocket.md) - Parent WebSocket class
- `WebSocketFrame` - WebSocket close frame information
- `WebSocket` - Underlying WebSocket connection class

## Version History

- **1.1.9:** Initial introduction with basic disconnection handling
- **Current:** Enhanced frame access and improved error reporting