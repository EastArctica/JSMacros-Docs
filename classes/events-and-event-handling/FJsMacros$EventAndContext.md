# FJsMacros$EventAndContext

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros$EventAndContext`

**Package:** `xyz.wagyourtail.jsmacros.core.library.impl`

**Since:** `1.5.0`

## Overview

The `EventAndContext<E>` class is a nested class within FJsMacros that encapsulates both an event and its associated script context. This class is returned by the `JsMacros.waitForEvent()` method and provides access to both the triggered event and the script context that was waiting for it.

This class is primarily used for advanced event waiting scenarios where you need access to the script context for early exit functionality or additional context information about the event wait operation.

## Class Structure

```java
public static class EventAndContext<E> {
    public final E event;
    public final BaseScriptContext context;
}
```

## Fields

### `event`
**Type:** `E` (generic event type)

The actual event object that was triggered. The type `E` corresponds to the specific event type being waited for.

**Access:** `public final`

**Example:**
```javascript
const result = JsMacros.waitForEvent("RecvMessage");
Chat.log("Message content: " + result.event.message);
```

### `context`
**Type:** `BaseScriptContext`

The script context that was waiting for the event. This context provides additional control over the event waiting operation.

**Access:** `public final`

**Example:**
```javascript
const result = JsMacros.waitForEvent("GameLoad", true);
// Use context to exit early if needed
if (someCondition) {
    result.context.releaseLock();
}
```

## Usage Examples

### Basic Event and Context Access
```javascript
// Wait for a chat message and access both event and context
const result = JsMacros.waitForEvent("RecvMessage");

if (result.event) {
    Chat.log("Received message: " + result.event.message);
    Chat.log("From user: " + result.event.username);

    // Access context information
    Chat.log("Script context: " + result.context.getScriptName());
}
```

### Early Exit with Joined Events
```javascript
// Wait for game load with join flag for early exit capability
const loadResult = JsMacros.waitForEvent("GameLoad", true);

// Set up a timeout for early exit
setTimeout(() => {
    Chat.log("Timeout reached, exiting wait...");
    loadResult.context.releaseLock();
}, 30000); // 30 second timeout

// The script will continue when either:
// 1. GameLoad event fires, or
// 2. Timeout calls releaseLock()
```

### Complex Event Waiting with Context Control
```javascript
function waitForPlayerInRange(range, timeout = 10000) {
    const startTime = Date.now();

    // Start waiting with join flag for early exit
    const result = JsMacros.waitForEvent("Tick", true,
        JavaWrapper.methodToJava((event) => {
            // Check if player is in range
            const player = Player.getPlayer();
            const targets = World.getPlayers();

            for (const target of targets) {
                if (target !== player) {
                    const distance = player.getPos().distanceTo(target.getPos());
                    if (distance <= range) {
                        Chat.log(`Player ${target.getName()} detected within ${range} blocks`);
                        return true; // End the wait
                    }
                }
            }

            // Check timeout
            if (Date.now() - startTime > timeout) {
                Chat.log("Timeout reached while waiting for player");
                return true; // End the wait
            }

            return false; // Continue waiting
        })
    );

    // Additional context handling
    if (result && result.event) {
        Chat.log(`Wait completed after ${Date.now() - startTime}ms`);

        // Can perform additional context-based operations
        const contextName = result.context.getScriptName();
        Chat.log(`Operation completed in context: ${contextName}`);

        return result;
    }

    return null;
}

// Usage
const encounter = waitForPlayerInRange(50, 15000);
if (encounter) {
    Chat.log("Player encounter detected!");
}
```

### Multi-Event Waiting with Context Management
```javascript
function waitForMultipleEvents(events, timeout = 30000) {
    const startTime = Date.now();
    let completedEvent = null;

    // Create a custom event for timeout
    const timeoutEvent = JsMacros.createCustomEvent("WaitTimeout");

    // Set up timeout trigger
    setTimeout(() => {
        if (!completedEvent) {
            completedEvent = "timeout";
            timeoutEvent.trigger();
        }
    }, timeout);

    // Wait for first matching event
    for (const eventName of events) {
        const result = JsMacros.waitForEvent(eventName, true,
            JavaWrapper.methodToJava((event) => {
                return completedEvent !== null;
            })
        );

        if (result) {
            completedEvent = eventName;
            Chat.log(`Event '${eventName}' triggered after ${Date.now() - startTime}ms`);

            // Clean up context
            result.context.releaseLock();

            return {
                event: result.event,
                context: result.context,
                eventName: eventName,
                duration: Date.now() - startTime
            };
        }
    }

    return null;
}

// Usage
const events = ["RecvMessage", "PlayerDeath", "ScreenClose"];
const result = waitForMultipleEvents(events, 20000);

if (result) {
    Chat.log(`First event: ${result.eventName}`);
    Chat.log(`Context script: ${result.context.getScriptName()}`);
} else {
    Chat.log("No events triggered within timeout");
}
```

### Context-based Script State Management
```javascript
function createManagedWait(eventName, condition = null) {
    return new Promise((resolve, reject) => {
        let resolved = false;

        try {
            const result = JsMacros.waitForEvent(eventName, true,
                JavaWrapper.methodToJava((event) => {
                    if (resolved) return true;

                    // Apply custom condition if provided
                    if (condition && !condition(event)) {
                        return false;
                    }

                    resolved = true;
                    resolve({
                        event: event,
                        context: result.context,
                        timestamp: Date.now()
                    });
                    return true;
                })
            );

            // Handle early script termination
            const cleanup = JavaWrapper.methodToJava(() => {
                if (!resolved) {
                    resolved = true;
                    result.context?.releaseLock();
                    reject(new Error("Script terminated while waiting"));
                }
            });

            JsMacros.once("ScriptStop", cleanup);

        } catch (e) {
            reject(e);
        }
    });
}

// Usage
const messageWait = createManagedWait("RecvMessage", (event) => {
    return event.message && event.message.includes("important");
});

messageWait.then((result) => {
    Chat.log("Important message received: " + result.event.message);
}).catch((e) => {
    Chat.log("Wait failed: " + e.message);
});
```

## Important Notes

### Context Management

1. **Joined Events**: Only available when using the `join` parameter with `waitForEvent()`
2. **Resource Management**: Always call `releaseLock()` when manually ending joined waits
3. **Script Lifecycle**: Context is tied to the script's lifecycle and may be garbage collected
4. **Thread Safety**: Context operations are thread-safe and can be called from other threads

### Performance Considerations

1. **Memory Usage**: EventAndContext objects hold references to both event and context
2. **Blocking Operations**: Joined events block script execution until completed
3. **Timeout Handling**: Implement proper timeouts to prevent permanent blocking

### Error Handling

1. **InterruptedException**: May be thrown if the waiting thread is interrupted
2. **Null Safety**: Always check for null values when accessing event properties
3. **Context Validation**: Verify context is valid before calling methods on it

## Best Practices

1. **Early Exit**: Use `context.releaseLock()` for clean early exit from joined waits
2. **Timeout Implementation**: Always implement timeouts for joined event waits
3. **Resource Cleanup**: Clean up contexts and event listeners when done
4. **Error Prevention**: Handle potential exceptions and context invalidation
5. **State Tracking**: Use context to track and manage complex waiting operations

## Related Classes

- [`BaseScriptContext`](BaseScriptContext.md) - Main script context class
- [`BaseEvent`](BaseEvent.md) - Base event class
- [`JsMacros`](JsMacros.md) - Main library class with waitForEvent method
- [`IEventListener`](IEventListener.md) - Event listener interface

## Version History

- **1.5.0:** Initial introduction with waitForEvent functionality
- **Current:** Enhanced context management and thread safety improvements