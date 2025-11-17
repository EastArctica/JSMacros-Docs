# EventContainer

Manages the execution context and lifecycle of event-driven scripts. EventContainer provides control over script execution, thread management, and synchronization for event handling. This class is primarily used internally by JsMacros but some aspects are accessible to advanced script writers.

**Class:** `EventContainer<T extends BaseScriptContext<?>>`
**Package:** `xyz.wagyourtail.jsmacros.core.language`
**Since:** 1.4.0

## Overview

EventContainer is a critical component in the JsMacros event system that manages the context in which event-driven scripts execute. Each event that triggers a script execution gets its own EventContainer instance, which provides:

- Thread synchronization and locking mechanisms
- Script execution lifecycle management
- Event coordination and timing control
- Context preservation across script execution
- Resource management for event-driven scripts

## Container State Management

### EventContainer.isLocked()

Check if the event container is currently locked.

```js
// Event listeners typically don't directly access EventContainer
// But when using advanced features, you might need to check state

JsMacros.on("Key", JavaWrapper.methodToJava((event, container) => {
    if (container) {
        Chat.log(`Container locked: ${container.isLocked()}`);

        if (container.isLocked()) {
            Chat.log("Event processing is currently synchronized");
        } else {
            Chat.log("Event processing is not synchronized");
        }
    }
}));
```

**Return Type:** `boolean`
**Returns:** `true` if the container is locked, `false` otherwise

**Usage Notes:** Primarily used internally for thread synchronization

### EventContainer.getCtx()

Get the script context associated with this event container.

```js
JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event, container) => {
    if (container) {
        const context = container.getCtx();
        if (context) {
            Chat.log(`Script context: ${context}`);

            // Access context properties (advanced usage)
            Chat.log(`Context type: ${context.getClass().getSimpleName()}`);
        }
    }
}));
```

**Return Type:** `T` - The script context (BaseScriptContext implementation)
**Returns:** The script context managing this event's execution

## Thread and Lock Management

### EventContainer.getLockThread()

Get the thread that currently holds the lock on this container.

```js
// Advanced usage: Monitor thread information
JsMacros.on("Tick", JavaWrapper.methodToJava((event, container) => {
    if (container) {
        const lockThread = container.getLockThread();
        const currentThread = Java.type("java.lang.Thread").currentThread();

        if (lockThread) {
            Chat.log(`Lock held by: ${lockThread.getName()}`);
            Chat.log(`Current thread: ${currentThread.getName()}`);

            if (lockThread === currentThread) {
                Chat.log("Current thread holds the lock");
            }
        } else {
            Chat.log("No thread currently holds the lock");
        }
    }
}));
```

**Return Type:** `Thread`
**Returns:** The thread that currently holds the lock, or `null` if not locked

### EventContainer.setLockThread()

Set the thread that should hold the lock for this container.

```js
// This is typically handled internally by JsMacros
// Direct usage is rare and requires careful understanding

function advancedThreadManagement(event, container) {
    if (container && !container.getLockThread()) {
        const currentThread = Java.type("java.lang.Thread").currentThread();

        // Set lock thread (advanced usage only)
        container.setLockThread(currentThread);
        Chat.log(`Set lock thread to: ${currentThread.getName()}`);
    }
}
```

**Parameters:**
- `lockThread` (`Thread`): The thread to set as lock holder

**Usage Notes:** Should not be called manually in most cases

## Event Synchronization

### EventContainer.awaitLock()

Wait for the container to be unlocked before continuing execution.

```js
// Advanced usage: Synchronous event processing
function synchronizedEventProcessing(event, container) {
    if (!container) return;

    // Create callback for when lock is released
    const callback = JavaWrapper.methodToJava(() => {
        Chat.log("Container lock released, continuing processing");
        // Continue processing after lock is released
    });

    try {
        // Wait for lock to be released
        container.awaitLock(callback);
        Chat.log("Waiting for container lock to be released...");
    } catch (error) {
        Chat.log(`Error waiting for lock: ${error.message}`);
    }
}

// Usage in event handler
JsMacros.on("Key", JavaWrapper.methodToJava((event, container) => {
    // Only wait for specific keys
    if (event.key === "key.keyboard.f1") {
        synchronizedEventProcessing(event, container);
    }
}));
```

**Parameters:**
- `then` (`MethodWrapper`): Callback to execute when lock is released

**Throws:** `InterruptedException` if waiting is interrupted
**Throws:** `AssertionError` if not using MethodWrapper from scripts

**Usage Notes:** Use MethodWrapper for callbacks in scripts to ensure safety

### EventContainer.releaseLock()

Manually release the lock on this container.

```js
// Advanced usage: Manual lock management
function manualLockManagement(event, container) {
    if (!container) return;

    try {
        Chat.log("Processing event with manual lock management...");

        // Do some processing...

        // Manually release lock when done
        container.releaseLock();
        Chat.log("Manually released container lock");

    } catch (error) {
        Chat.log(`Error in manual lock management: ${error.message}`);
    }
}

// Usage with care
JsMacros.on("CustomEvent", JavaWrapper.methodToJava((event, container) => {
    manualLockManagement(event, container);
}));
```

**Usage Notes:** Can cause issues if used incorrectly; use with caution

## Advanced Usage Patterns

### Event Coordination

```js
// Coordinate multiple events using container state
const eventCounter = { count: 0 };

function coordinateEvents(event, container) {
    if (!container) return;

    eventCounter.count++;

    // Log container state
    Chat.log(`Event #${eventCounter.count}`);
    Chat.log(`Container locked: ${container.isLocked()}`);
    Chat.log(`Lock thread: ${container.getLockThread()?.getName() || 'none'}`);

    // Synchronize every 10th event
    if (eventCounter.count % 10 === 0) {
        const callback = JavaWrapper.methodToJava(() => {
            Chat.log(`Completed synchronization for event #${eventCounter.count}`);
        });

        try {
            container.awaitLock(callback);
        } catch (error) {
            Chat.log(`Synchronization error: ${error.message}`);
        }
    }
}

JsMacros.on("Key", JavaWrapper.methodToJava(coordinateEvents));
```

### Resource Management

```js
// Manage resources tied to event execution
function resourceManagement(event, container) {
    if (!container) return;

    // Create context-specific resources
    const resourceId = `resource_${container.hashCode()}`;

    // Store resource reference in context
    const context = container.getCtx();
    if (context) {
        context.jsmacros_customResource = resourceId;
        Chat.log(`Created resource: ${resourceId}`);
    }

    // Cleanup when container is released
    const originalRelease = container.releaseLock.bind(container);
    container.releaseLock = function() {
        Chat.log(`Cleaning up resource: ${resourceId}`);

        // Call original release
        originalRelease();
    };
}
```

### Event Monitoring

```js
// Monitor event container behavior
const containerStats = {
    total: 0,
    locked: 0,
    unlocked: 0,
    errors: 0
};

function monitorContainers(event, container) {
    containerStats.total++;

    if (!container) {
        containerStats.errors++;
        Chat.log("No container available");
        return;
    }

    try {
        const isLocked = container.isLocked();
        const lockThread = container.getLockThread();

        if (isLocked) {
            containerStats.locked++;
            Chat.log(`Container #${containerStats.total} is locked by: ${lockThread?.getName() || 'unknown'}`);
        } else {
            containerStats.unlocked++;
            Chat.log(`Container #${containerStats.total} is unlocked`);
        }

        // Log periodic stats
        if (containerStats.total % 50 === 0) {
            Chat.log(`Container Stats - Total: ${containerStats.total}, Locked: ${containerStats.locked}, Unlocked: ${containerStats.unlocked}, Errors: ${containerStats.errors}`);
        }

    } catch (error) {
        containerStats.errors++;
        Chat.log(`Container monitoring error: ${error.message}`);
    }
}

JsMacros.on("*", JavaWrapper.methodToJava(monitorContainers));
```

## Debugging and Troubleshooting

### Container Debug Information

```js
// Get detailed container information
function debugContainer(event, container) {
    if (!container) {
        Chat.log("No container available for debugging");
        return;
    }

    try {
        const context = container.getCtx();
        const lockThread = container.getLockThread();
        const currentThread = Java.type("java.lang.Thread").currentThread();

        Chat.log("=== Container Debug Info ===");
        Chat.log(`Container: ${container}`);
        Chat.log(`Is Locked: ${container.isLocked()}`);
        Chat.log(`Lock Thread: ${lockThread?.getName() || 'none'}`);
        Chat.log(`Current Thread: ${currentThread.getName()}`);
        Chat.log(`Same Thread: ${lockThread === currentThread}`);

        if (context) {
            Chat.log(`Context: ${context.getClass().getSimpleName()}`);
            Chat.log(`Context Hash: ${context.hashCode()}`);
        }

    } catch (error) {
        Chat.log(`Container debug error: ${error.message}`);
    }
}

// Apply debugging to specific events
JsMacros.on("Key", JavaWrapper.methodToJava((event, container) => {
    if (event.key === "key.keyboard.f3") {
        debugContainer(event, container);
    }
}));
```

## Best Practices

1. **Minimal Direct Usage**: Most scripts don't need to directly interact with EventContainer
2. **Thread Safety**: Be extremely careful with thread-related operations
3. **Error Handling**: Always wrap container operations in try-catch blocks
4. **MethodWrapper**: Use MethodWrapper for callbacks to ensure safety
5. **Resource Cleanup**: Clean up resources created during event processing
6. **Performance**: Avoid expensive operations in container monitoring

## Related Classes

- **[BaseScriptContext](language/base-script-context.md)** - Script execution context
- **[BaseEvent](base-event.md)** - Base event class
- **[EventRegistry](event-registry.md)** - Event system management
- **[EventListener](event-listener.md)** - Event listener management

## Error Handling

```js
function safeContainerOperation(event, container) {
    if (!container) {
        Chat.log("No container available");
        return;
    }

    try {
        // Safe container operations
        const isLocked = container.isLocked();
        const context = container.getCtx();

        Chat.log(`Container state: locked=${isLocked}, context=${context ? 'available' : 'none'}`);

        // Only proceed if safe
        if (context && !isLocked) {
            // Perform container operations
            const callback = JavaWrapper.methodToJava(() => {
                Chat.log("Container operation completed successfully");
            });

            container.awaitLock(callback);
        }

    } catch (error) {
        Chat.log(`Container operation error: ${error.message}`);

        // Log error details
        if (error.stack) {
            Chat.log(`Stack trace: ${error.stack}`);
        }
    }
}

// Apply safe operations
JsMacros.on("RecvMessage", JavaWrapper.methodToJava(safeContainerOperation));
```

## Implementation Notes

- EventContainer is primarily used internally by JsMacros
- Direct script usage is rare and typically for advanced debugging
- Container lifecycle is managed automatically by the event system
- Thread synchronization ensures safe event processing
- Container state affects script execution behavior
- Context preservation ensures consistent script environment

## Performance Considerations

- Container operations have minimal performance impact
- Excessive container monitoring can affect performance
- Lock waiting operations should be used sparingly
- Thread synchronization overhead is generally acceptable
- Resource cleanup helps prevent memory leaks