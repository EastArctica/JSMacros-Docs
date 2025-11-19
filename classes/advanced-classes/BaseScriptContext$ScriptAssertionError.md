# BaseScriptContext$ScriptAssertionError

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.language.BaseScriptContext$ScriptAssertionError`

**Type:** Exception Class

**Extends:** `Error`

**Since:** JSMacros 1.2.0

The `ScriptAssertionError` class is a specialized exception used within JSMacros for script-level assertions and control flow. Unlike traditional errors that indicate failures, ScriptAssertionError is primarily used for intentional script termination, conditional execution, and flow control mechanisms. It provides a way to stop script execution predictably while distinguishing intentional stops from actual errors.

## Overview

The `ScriptAssertionError` class serves as a controlled exception mechanism for JSMacros scripts, enabling:

- Intentional script termination with specific messages
- Conditional script execution based on runtime conditions
- Flow control for complex script logic
- Distinguishing between errors and intentional script stops
- Integration with JSMacros' error handling and logging systems

This exception is typically not shown to users as an error but is instead handled internally by the JSMacros system as a normal part of script execution flow.

## Purpose and Use Cases

### Script Termination

Use ScriptAssertionError to intentionally stop script execution:

```js
function validatePlayerState() {
    const player = Player.getPlayer();
    if (!player) {
        throw new ScriptAssertionError("Player not available, stopping script");
    }

    if (player.getHealth() <= 0) {
        throw new ScriptAssertionError("Player is dead, script cannot continue");
    }

    // Continue script execution
    Chat.log("Player state is valid, continuing...");
}
```

### Conditional Execution

Control script flow based on runtime conditions:

```js
function conditionalScriptExecution() {
    const world = World.getWorld();
    if (!world) {
        throw new ScriptAssertionError("Not in a world, skipping execution");
    }

    const timeOfDay = world.getTimeOfDay();
    if (timeOfDay < 6000 || timeOfDay > 18000) {
        throw new ScriptAssertionError("Script only runs during daytime");
    }

    // Main script logic here
    Chat.log("Running daytime script logic...");
}
```

### Input Validation

Validate script inputs and parameters:

```js
function processItemInput(itemStack) {
    if (!itemStack) {
        throw new ScriptAssertionError("No item provided");
    }

    if (itemStack.isEmpty()) {
        throw new ScriptAssertionError("Item stack is empty");
    }

    // Process valid item
    Chat.log(`Processing item: ${itemStack.getName().getString()}`);
}
```

## Exception Properties

### Message Content

ScriptAssertionError accepts descriptive messages that explain why the script was stopped:

```js
throw new ScriptAssertionError("Script stopped: Condition not met");
throw new ScriptAssertionError("Required resource unavailable: " + resourceName);
throw new ScriptAssertionError("Invalid configuration detected");
```

### Stack Trace

Like other exceptions, ScriptAssertionError includes stack trace information for debugging:

```js
try {
    someScriptFunction();
} catch (error) {
    if (error instanceof ScriptAssertionError) {
        Chat.log(`Script assertion: ${error.message}`);
        // Stack trace available for debugging
        Chat.log(`Stack: ${error.stack}`);
    } else {
        Chat.log(`Unexpected error: ${error.message}`);
    }
}
```

## Usage Patterns

### Guard Clauses

Use ScriptAssertionError as guard clauses at the beginning of functions:

```js
function safePlayerOperation() {
    // Guard clauses
    const player = Player.getPlayer();
    if (!player) {
        throw new ScriptAssertionError("No player available");
    }

    if (!player.getAbilities().creativeMode) {
        throw new ScriptAssertionError("Creative mode required");
    }

    if (player.getHealth() < 10) {
        throw new ScriptAssertionError("Player health too low");
    }

    // Main operation
    Chat.log("Performing safe player operation...");
}
```

### Feature Toggle

Control whether script features are enabled:

```js
function conditionalFeature(config) {
    if (!config.enableAdvancedFeatures) {
        throw new ScriptAssertionError("Advanced features disabled in config");
    }

    if (!config.hasRequiredPermissions) {
        throw new ScriptAssertionError("Insufficient permissions for advanced features");
    }

    // Execute advanced feature
    Chat.log("Running advanced feature...");
}
```

### Resource Availability

Check for required resources before proceeding:

```js
function resourceIntensiveOperation() {
    const requiredMemory = 1024 * 1024 * 100; // 100MB
    const runtime = Java.type("java.lang.Runtime").getRuntime();
    const freeMemory = runtime.freeMemory();

    if (freeMemory < requiredMemory) {
        throw new ScriptAssertionError(`Insufficient memory. Required: ${requiredMemory}, Available: ${freeMemory}`);
    }

    // Perform resource-intensive operation
    Chat.log("Performing resource-intensive operation...");
}
```

## Integration with JSMacros Systems

### Error Filtering

ScriptAssertionError is typically filtered from error logs by default. In JsMacros profile configurations:

```java
// Common ignored errors include ScriptAssertionError
new Class[] {
    InterruptedException.class,
    BaseScriptContext.ScriptAssertionError.class
}
```

This means that ScriptAssertionError instances won't appear as error messages in chat or logs, treating them as normal script flow.

### Event Handling

In event-driven scripts, use ScriptAssertionError to gracefully exit event handlers:

```js
JsMacros.on("PlayerDeath", JavaWrapper.methodToJava((event) => {
    const player = event.getPlayer();
    if (!player || !player.equals(Player.getPlayer())) {
        throw new ScriptAssertionError("Death event not for local player");
    }

    Chat.log("You died! Death event handled.");
    // Script will exit gracefully after this
}));
```

## Best Practices

### Use Descriptive Messages

Provide clear, actionable messages:

```js
// Good: Descriptive and actionable
throw new ScriptAssertionError("Cannot continue: Player must be in survival mode");

// Poor: Vague message
throw new ScriptAssertionError("Stop script");
```

### Differentiate from Real Errors

Use ScriptAssertionError for intentional stops, regular Error for problems:

```js
function validateAndProcess(data) {
    // Intentional stop - conditions not met for script execution
    if (!data.isEnabled) {
        throw new ScriptAssertionError("Feature disabled, skipping processing");
    }

    // Real error - something went wrong
    if (!data.hasRequiredField) {
        throw new Error("Required field missing from data");
    }

    // Continue processing
    processValidData(data);
}
```

### Handle in Try-Catch Blocks

Catch ScriptAssertionError separately from other exceptions:

```js
try {
    runScriptWithConditions();
} catch (assertionError) {
    if (assertionError instanceof ScriptAssertionError) {
        Chat.log(`Script stopped: ${assertionError.message}`);
        // This is expected, continue with other operations
    }
} catch (otherError) {
    Chat.log(`Unexpected error: ${otherError.message}`);
    // Handle unexpected errors differently
}
```

## Error Handling Examples

### Comprehensive Error Handling

```js
function robustScriptExecution() {
    try {
        // Pre-execution checks
        const player = Player.getPlayer();
        if (!player) {
            throw new ScriptAssertionError("No player available");
        }

        if (player.getHealth() <= 0) {
            throw new ScriptAssertionError("Player is dead");
        }

        // Main script logic
        Chat.log("Executing main script logic...");

        // Some operation that might throw real errors
        const result = performComplexOperation();

    } catch (assertionError) {
        if (assertionError instanceof ScriptAssertionError) {
            Chat.log(`Script intentionally stopped: ${assertionError.message}`);
            // Clean up and exit gracefully
            cleanupResources();
            return;
        }
    } catch (unexpectedError) {
        Chat.log(`Unexpected error occurred: ${unexpectedError.message}`);
        // Handle unexpected errors
        handleErrorRecovery(unexpectedError);
    }
}
```

### Script State Management

```js
class ScriptStateManager {
    constructor() {
        this.isRunning = false;
        this.lastError = null;
    }

    startScript() {
        if (this.isRunning) {
            throw new ScriptAssertionError("Script is already running");
        }

        try {
            this.isRunning = true;
            this.executeScript();
        } catch (assertionError) {
            if (assertionError instanceof ScriptAssertionError) {
                Chat.log(`Script stopped: ${assertionError.message}`);
                this.lastError = assertionError.message;
            } else {
                throw assertionError; // Re-throw unexpected errors
            }
        } finally {
            this.isRunning = false;
        }
    }

    executeScript() {
        // Script implementation here
        if (!this.validateConditions()) {
            throw new ScriptAssertionError("Script conditions not met");
        }

        Chat.log("Script executing successfully...");
    }

    validateConditions() {
        // Return true if conditions are met, false otherwise
        return Player.getPlayer() !== null;
    }
}
```

## Performance Considerations

- **Exception Overhead:** ScriptAssertionError has the same overhead as other exceptions
- **Frequent Use:** Avoid using in hot loops or performance-critical code
- **Alternative to Returns:** Consider using return statements for simple flow control

## Related Classes

- `BaseScriptContext` - Parent class that contains ScriptAssertionError
- `Error` - Base JavaScript error class
- `Exception` - Java exception base class
- `InterruptedException` - Other commonly ignored exception type

## Version Information

- **Available Since:** JSMacros 1.2.0
- **Stable:** Yes - Core functionality has remained consistent
- **Thread Safe:** Yes - Exception instances are thread-safe

The ScriptAssertionError class provides a clean, intentional way to handle script flow control and conditional execution in JSMacros, distinguishing between expected script stops and actual errors that need attention.