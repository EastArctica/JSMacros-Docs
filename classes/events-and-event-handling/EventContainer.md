# EventContainer

## Overview

The `EventContainer` class is a synchronization mechanism used by JSMacros to manage event execution and thread locking for script contexts. It provides a way to coordinate between different threads and ensure proper event handling order, particularly when scripts need to wait for certain conditions or events to complete.

This class is primarily used internally by JSMacros for managing the execution flow of events and scripts, but it may be accessible in certain advanced scripting scenarios.

## Class Information

- **Package:** `xyz.wagyourtail.jsmacros.core.language`
- **Since:** JSMacros 1.4.0
- **Generic Type:** `T extends BaseScriptContext<?>` - The type of script context this container manages

## Constructor

```javascript
new EventContainer(context)
```

**Parameters:**
- `context` (BaseScriptContext): The script context that this container will manage

## Properties

### ctx (Read-only)
The script context associated with this container.

**Type:** `BaseScriptContext<T>`

### lockThread (Read-only)
The thread that currently holds the lock on this container.

**Type:** `Thread` or `null` if no thread is locked

### locked (Read-only)
Whether this container is currently locked.

**Type:** `boolean`

## Methods

### isLocked()

Checks if the container is currently locked.

**Returns:**
- `boolean` - `true` if the container is locked, `false` otherwise

```javascript
if (eventContainer.isLocked()) {
    console.log("Container is locked, waiting...");
}
```

### getCtx()

Returns the script context associated with this container.

**Returns:**
- `BaseScriptContext` - The context object

```javascript
const context = eventContainer.getCtx();
console.log("Context file:", context.getFile());
```

### getLockThread()

Returns the thread that currently holds the lock.

**Returns:**
- `Thread` - The lock thread, or `null` if not locked

```javascript
const lockThread = eventContainer.getLockThread();
if (lockThread) {
    console.log("Locked by thread:", lockThread.getName());
}
```

### awaitLock(callback)

Waits for the container to be unlocked, then executes the provided callback. This method is primarily used internally and requires careful handling to avoid deadlocks.

**Parameters:**
- `callback` (MethodWrapper or Runnable): The function to execute when the lock is released

**Throws:**
- `InterruptedException` - If the thread is interrupted while waiting
- `AssertionError` - If called from a script without using MethodWrapper

**Important Note:** This method should only be used with `MethodWrapper` instances when called from scripts to prevent deadlocks and ensure thread safety.

```javascript
// Example using MethodWrapper (recommended for scripts)
eventContainer.awaitLock(new MethodWrapper(() => {
    console.log("Lock released, executing callback");
}));

// Direct usage (not recommended for scripts)
eventContainer.awaitLock(() => {
    console.log("This may cause issues in scripts");
});
```

### releaseLock()

Releases the lock on the container, allowing waiting threads to proceed. This method executes all pending callbacks and notifies all waiting threads.

**Returns:** `void`

```javascript
// Release the lock manually (use with caution)
eventContainer.releaseLock();
console.log("Lock released");
```

### toString()

Returns a string representation of the container's current state.

**Returns:**
- `string` - JSON-like string showing locked status and lock thread name

```javascript
console.log(eventContainer.toString());
// Output: ContextContainer:{"locked": true, "lockThread": "Thread-1"}
```

## Usage Examples

### Basic Event Container Usage

```javascript
// Event containers are typically created and managed by JSMacros internally
// but here's how you might interact with one if you have access

// Check if container is locked
if (eventContainer.isLocked()) {
    console.log("Event container is currently locked");

    // Get information about the lock
    const lockThread = eventContainer.getLockThread();
    if (lockThread) {
        console.log(`Locked by: ${lockThread.getName()}`);
    }
}

// Get the associated context
const context = eventContainer.getCtx();
console.log(`Triggering event: ${context.getTriggeringEvent().eventName}`);
```

### Waiting for Lock Release (Advanced Usage)

```javascript
// This is an advanced pattern that should be used carefully
// to avoid deadlocks in your scripts

function waitForEventUnlock(callback) {
    try {
        // Create a MethodWrapper for safe callback execution
        const wrapper = new MethodWrapper(callback);

        // Wait for the lock to be released
        eventContainer.awaitLock(wrapper);

    } catch (error) {
        if (error instanceof InterruptedException) {
            console.log("Wait was interrupted");
        } else {
            console.error("Error waiting for lock:", error);
        }
    }
}

// Usage example
waitForEventUnlock(() => {
    console.log("Event container is now unlocked!");
    // Continue with your logic here
});
```

### Manual Lock Release (Use with Caution)

```javascript
// WARNING: Manually releasing locks can cause unexpected behavior
// This should only be done if you understand the implications

function safeEventProcessing() {
    try {
        // Perform some event processing
        console.log("Processing event...");

        // If you need to release the lock early
        if (someCondition) {
            console.log("Releasing lock early");
            eventContainer.releaseLock();
        }

    } catch (error) {
        console.error("Error during event processing:", error);
        // Ensure lock is released even on error
        eventContainer.releaseLock();
    }
}
```

## Important Considerations

### Thread Safety

- EventContainer is designed to be thread-safe with synchronized methods
- Always use `MethodWrapper` when providing callbacks from scripts to prevent deadlocks
- Manual lock management should be done with extreme care

### Deadlock Prevention

- The `awaitLock()` method includes safety checks to prevent improper usage in scripts
- Never call `awaitLock()` from multiple threads on the same container without proper coordination
- Be cautious when manually calling `releaseLock()` as it may affect other waiting threads

### Script Context Integration

- EventContainer is tightly integrated with BaseScriptContext
- The container automatically registers itself with the context's event system
- When the context is closed, all associated containers are automatically released

## Common Use Cases

## Related Classes

- `BaseScriptContext` - The parent class for script contexts that use EventContainer
- `MethodWrapper` - Wrapper class for safely passing functions between contexts
- `BaseEvent` - The base class for events that may trigger container creation
- `Core` - Main JSMacros class that manages contexts and containers

## Version History

- **1.4.0**: Initial implementation of EventContainer
- **1.6.0**: Enhanced thread management and context integration features