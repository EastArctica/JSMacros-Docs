# BaseScriptContext$SleepRunnable

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.language.BaseScriptContext$SleepRunnable`

**Type:** Runnable Interface Implementation

**Implements:** `Runnable`

**Since:** JSMacros 1.2.8

The `SleepRunnable` class is a specialized runnable implementation used within JSMacros for handling delayed or timed script execution. It encapsulates script execution logic that needs to run after a specified delay, enabling asynchronous operations, timed events, and delayed script continuations within the JSMacros scripting environment.

## Overview

The `SleepRunnable` class serves as a bridge between JSMacros' synchronous script execution model and asynchronous, timed operations. It provides:

- Delayed execution of script code after specified time periods
- Integration with JSMacros' thread management system
- Safe execution context for delayed operations
- Support for both one-time and recurring delayed tasks
- Proper resource management and cleanup for delayed executions

This class is primarily used internally by JSMacros for operations like `Time.sleep()`, `Time.setTimeout()`, and other timing-related functionality.

## Purpose and Use Cases

### Delayed Script Execution

Execute script code after a specified delay:

```js
function delayedMessage() {
    // This message will appear after 5 seconds
    Time.sleep(5000);
    Chat.log("Hello after 5 seconds!");
}
```

### Asynchronous Operations

Perform operations without blocking the main script:

```js
function asynchronousTask() {
    // Schedule a task to run later without blocking
    Time.sleep(1000); // Internal use of SleepRunnable
    Chat.log("This runs asynchronously");
}
```

### Event Timing

Control the timing of script events:

```js
function timedEventSequence() {
    Chat.log("Event started");

    Time.sleep(2000); // Wait 2 seconds
    Chat.log("Mid-point reached");

    Time.sleep(3000); // Wait 3 more seconds
    Chat.log("Event completed");
}
```

## Class Structure

### Runnable Interface Implementation

SleepRunnable implements Java's `Runnable` interface, making it compatible with Java's threading and execution frameworks:

```js
// Conceptual structure (actual implementation is internal)
class SleepRunnable implements Runnable {
    constructor(scriptContext, delay, runnableCode) {
        this.context = scriptContext;
        this.delay = delay;
        this.code = runnableCode;
    }

    run() {
        // Execute the delayed code in proper script context
        this.context.execute(this.code);
    }
}
```

### Execution Context

SleepRunnable maintains proper script execution context:

- **Script State:** Preserves variable state and scope
- **Context Management:** Ensures proper cleanup and resource management
- **Error Handling:** Handles exceptions within the delayed execution
- **Thread Safety:** Manages cross-thread execution safely

## Integration with JSMacros

### Time.sleep() Implementation

The most common use of SleepRunnable is through the `Time.sleep()` function:

```js
// This internally creates and uses SleepRunnable
Time.sleep(1000); // Sleep for 1 second

// Equivalent to (conceptual):
const sleepRunnable = new SleepRunnable(currentContext, 1000, () => {
    // Continue execution after sleep
});
```

### Delayed Task Scheduling

Used for scheduling delayed tasks within the JSMacros system:

```js
function scheduleDelayedTask() {
    // Schedule task to run after delay
    setTimeout(() => {
        Chat.log("Delayed task executed");
    }, 5000); // 5 second delay
}
```

### Event Handling

Used in event systems that need delayed processing:

```js
JsMacros.on("PlayerDeath", JavaWrapper.methodToJava((event) => {
    // Handle death immediately
    Chat.log("Player died");

    // Schedule delayed respawn check
    Time.sleep(2000); // Uses SleepRunnable internally

    if (Player.getPlayer()) {
        Chat.log("Player has respawned");
    }
}));
```

## Technical Implementation

### Thread Management

SleepRunnable integrates with JSMacros' thread management:

```js
// Internal concept (actual implementation details may vary)
function createDelayedExecution(delay, code) {
    const runnable = new SleepRunnable(scriptContext, delay, code);

    // Schedule execution on appropriate thread
    scheduledExecutor.schedule(runnable, delay, TimeUnit.MILLISECONDS);
}
```

### Context Preservation

Maintains script context across delayed execution:

```js
function contextPreservation() {
    const localVar = "This should persist";

    Time.sleep(1000); // SleepRunnable preserves this context

    Chat.log(localVar); // Variable still accessible
}
```

### Resource Management

Proper cleanup of resources:

```js
function resourceManagement() {
    const resource = acquireResource();

    try {
        // Use resource immediately
        processWithResource(resource);

        // Schedule cleanup after delay
        Time.sleep(5000);
        cleanupResource(resource);

    } catch (error) {
        // Ensure cleanup happens even if error occurs
        cleanupResource(resource);
        throw error;
    }
}
```

## Usage Patterns

### Simple Delay

```js
function simpleDelay() {
    Chat.log("Starting...");
    Time.sleep(3000); // 3 second delay using SleepRunnable
    Chat.log("Finished after 3 seconds");
}
```

### Multi-step Processing

```js
function multiStepProcessing() {
    const items = ["Item 1", "Item 2", "Item 3"];

    for (let i = 0; i < items.length; i++) {
        Chat.log(`Processing: ${items[i]}`);

        // Delay between processing each item
        Time.sleep(1000); // SleepRunnable handles the delay
    }

    Chat.log("All items processed");
}
```

### Polling Operations

```js
function waitForCondition() {
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max wait

    while (attempts < maxAttempts) {
        const player = Player.getPlayer();
        if (player && player.getHealth() > 0) {
            Chat.log("Player is alive and ready");
            break;
        }

        // Wait before checking again
        Time.sleep(1000); // SleepRunnable manages the wait
        attempts++;
    }

    if (attempts >= maxAttempts) {
        Chat.log("Timeout waiting for player to be ready");
    }
}
```

### Animation Sequences

```js
function createAnimationSequence() {
    const frames = ["⬜", "⬛", "⬜", "⬛"];

    for (const frame of frames) {
        Chat.actionbar(frame);
        Time.sleep(500); // SleepRunnable controls animation timing
    }

    Chat.actionbar("Animation complete!");
}
```

## Performance Considerations

### Thread Usage

SleepRunnable uses JSMacros' managed thread pool:

```js
function efficientDelayedExecution() {
    // Multiple sleep operations share thread resources
    Time.sleep(1000); // Efficient use of managed threads
    Time.sleep(2000);
    Time.sleep(1500);
}
```

### Memory Management

Proper cleanup of delayed tasks:

```js
function memoryEfficientDelays() {
    // Each sleep operation is properly cleaned up after completion
    Time.sleep(5000); // Resources cleaned up after 5 seconds

    // No memory leaks from completed SleepRunnable instances
}
```

### Blocking vs Non-blocking

Understand the blocking behavior:

```js
function blockingBehavior() {
    Chat.log("Before sleep");
    Time.sleep(2000); // Blocks current script execution
    Chat.log("After sleep"); // This runs after 2 seconds

    // Other scripts and events continue to run normally
    // SleepRunnable only blocks the current script context
}
```

## Error Handling

### Exception Propagation

Handle exceptions in delayed code:

```js
function delayedErrorHandling() {
    try {
        Time.sleep(1000);

        // This error will be thrown after the delay
        throw new Error("Something went wrong after delay");

    } catch (error) {
        Chat.log(`Caught delayed error: ${error.message}`);
    }
}
```

### Timeout Handling

Implement timeout logic with SleepRunnable:

```js
function timeoutExample() {
    const timeout = 5000; // 5 second timeout
    const startTime = Date.now();

    while (true) {
        // Check if operation completed
        if (checkOperationComplete()) {
            Chat.log("Operation completed successfully");
            break;
        }

        // Check timeout
        if (Date.now() - startTime > timeout) {
            Chat.log("Operation timed out");
            break;
        }

        // Wait before checking again
        Time.sleep(500);
    }
}
```

## Best Practices

### Appropriate Usage

Use SleepRunnable for appropriate scenarios:

```js
// Good: User interface delays, animations, polling
Time.sleep(1000); // Allow user to read message

// Good: Rate limiting
Time.sleep(200); // Prevent spamming operations

// Good: Timing-dependent operations
Time.sleep(5000); // Wait for game state to stabilize

// Poor: Using sleep instead of proper event handling
// Time.sleep(10000); // Wait for player to die (use DeathEvent instead)
```

### Minimal Delays

Keep delays as short as necessary:

```js
function efficientTiming() {
    // Use minimal necessary delays
    Time.sleep(100);  // Better than Time.sleep(1000) if 100ms is sufficient
    Time.sleep(500);  // Better than Time.sleep(5000) if 500ms is sufficient
}
```

## Related Classes

- `BaseScriptContext` - Parent class that contains SleepRunnable
- `Time` - JSMacros time utility that uses SleepRunnable
- `Runnable` - Java interface implemented by SleepRunnable
- `ScheduledExecutorService` - Java class that manages delayed execution
- `Thread` - Java thread management (used internally)

## Version Information

- **Available Since:** JSMacros 1.2.8
- **Stable:** Yes - Core sleep functionality has remained consistent
- **Thread Safe:** Yes - Proper synchronization for cross-thread execution
- **Performance:** Optimized for minimal resource usage during delays

The SleepRunnable class provides the foundation for timed operations in JSMacros, enabling sophisticated timing-based scripting while maintaining proper resource management and execution context.