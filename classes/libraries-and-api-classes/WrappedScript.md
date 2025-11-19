# WrappedScript

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.WrappedScript<T, U, V>`

**Extends:** `MethodWrapper<T, U, V, BaseScriptContext<?>>`

**Since:** `1.7.0`

A wrapper class that allows scripts to be executed as functional interfaces (Consumer, Function, Predicate, etc.). This class enables JavaScript code to be treated as a first-class function that can be passed to Java APIs expecting functional interfaces, with proper thread management and execution context handling.

WrappedScript objects are typically created using the `JsMacros.wrapScriptRun()` and `JsMacros.wrapScriptRunAsync()` methods, which wrap existing script files or inline script code into executable function objects that can be used with event listeners, collections operations, or any Java API that accepts functional interfaces.

## Table of Contents
- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)

---

## Fields

## Methods

## Usage Examples

### Creating Wrapped Scripts

```js
// From a file (synchronous)
const fileScript = JsMacros.wrapScriptRun("myscript.js");

// From a file (asynchronous)
const asyncFileScript = JsMacros.wrapScriptRunAsync("myscript.js");

// From inline script (synchronous)
const inlineScript = JsMacros.wrapScriptRun("javascript", `
    Chat.log("Inline script executed!");
    event.setReturnString("Script completed");
`);

// From inline script (asynchronous)
const asyncInlineScript = JsMacros.wrapScriptRunAsync("javascript", `
    Chat.log("Async script executed!");
`);
```

### Using with Event Listeners

```js
// Create a wrapped script for event handling
const damageHandler = JsMacros.wrapScriptRun("javascript", `
    const damageEvent = event.arg1;
    const health = damageEvent.health;
    const change = damageEvent.change;

    Chat.log(`Damage: ${change}, Health: ${health}`);

    // Set a return value for processing
    event.setReturnBoolean(health < 5); // true if critical health
`);

// Register with event listener
JsMacros.on("Damage", JavaWrapper.methodToJavaAsync((e) => {
    const isCritical = damageHandler.test(e);
    if (isCritical) {
        Chat.actionbar("&cCRITICAL HEALTH WARNING!");
    }
}));
```

### Data Processing Pipeline

```js
// Create processing stages
const validator = JsMacros.wrapScriptRun("javascript", `
    const data = event.arg1;
    const isValid = data && data.length > 0;
    event.setReturnBoolean(isValid);
`);

const transformer = JsMacros.wrapScriptRun("javascript", `
    const data = event.arg1;
    const transformed = data.trim().toUpperCase();
    event.setReturnString(transformed);
`);

const filter = JsMacros.wrapScriptRun("javascript", `
    const data = event.arg1;
    const shouldKeep = data.startsWith("A");
    event.setReturnBoolean(shouldKeep);
`);

// Process data through pipeline
const rawData = ["  apple  ", "banana", "  avocado  ", "cherry"];
const processedData = [];

for (const item of rawData) {
    // Validate
    if (!validator.test(item)) continue;

    // Transform
    const transformed = transformer.apply(item);

    // Filter
    if (!filter.test(transformed)) continue;

    processedData.push(transformed);
}

Chat.log(`Processed data: ${JSON.stringify(processedData)}`);
// Outputs: ["APPLE", "AVOCADO"]
```

### Collection Operations

```js
// Create a custom predicate for filtering entities
const isHostile = JsMacros.wrapScriptRun("javascript", `
    const entity = event.arg1;
    const type = entity.getType();

    // Common hostile mob types
    const hostileTypes = ["zombie", "skeleton", "spider", "creeper"];
    const isHostileMob = hostileTypes.includes(type);

    event.setReturnBoolean(isHostileMob);
`);

// Create a function to extract entity health
const getHealth = JsMacros.wrapScriptRun("javascript", `
    const entity = event.arg1;
    const health = entity.getHealth();
    event.setReturnDouble(health);
`);

// Use in entity processing
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const entities = World.getEntities();
    const hostileEntities = entities.filter(entity =>
        entity && isHostile.test(entity)
    );

    if (hostileEntities.length > 0) {
        Chat.log(`Found ${hostileEntities.length} hostile entities nearby`);

        // Process each hostile entity
        hostileEntities.forEach(entity => {
            const health = getHealth.apply(entity);
            Chat.log(`- ${entity.getType()}: ${health.toFixed(1)} HP`);
        });
    }
}));
```

### Async vs Synchronous Behavior

```js
// Synchronous execution (waits for completion)
const syncScript = JsMacros.wrapScriptRun("javascript", `
    Chat.log("Starting sync task...");
    // Simulate work
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    event.setReturnInt(sum);
`);

Chat.log("Before sync execution");
const result = syncScript.apply(null);
Chat.log(`Sync result: ${result}`);
Chat.log("After sync execution"); // This runs after script completes

// Asynchronous execution (doesn't wait)
const asyncScript = JsMacros.wrapScriptRunAsync("javascript", `
    Chat.log("Starting async task...");
    // Simulate work
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    // Note: Async scripts typically use event.setReturn* for return values
    event.setReturnInt(sum);
    Chat.log("Async task completed!");
`);

Chat.log("Before async execution");
asyncScript.accept(null); // Starts async execution
Chat.log("After async execution"); // This runs immediately without waiting
```

### Error Handling and Best Practices

```js
// Script with error handling
const safeScript = JsMacros.wrapScriptRun("javascript", `
    try {
        const input = event.arg1;

        // Validate input
        if (input === null || input === undefined) {
            Chat.log("&cError: Input is null or undefined");
            event.setReturnString("error");
            return;
        }

        // Process input safely
        const result = String(input).trim();
        if (result.length === 0) {
            Chat.log("&cWarning: Empty input after trimming");
            event.setReturnString("empty");
            return;
        }

        // Successful processing
        event.setReturnString(result);
        Chat.log(`&aSuccessfully processed: ${result}`);

    } catch (error) {
        Chat.log(`&cScript error: ${error.message}`);
        event.setReturnString("error");
    }
`);

// Safe usage
function processSafely(data) {
    try {
        const result = safeScript.apply(data);

        if (result === "error") {
            Chat.log("&cProcessing failed due to script error");
        } else if (result === "empty") {
            Chat.log("&eInput was empty after processing");
        } else {
            Chat.log(`&aProcessing result: ${result}`);
            return result;
        }
    } catch (error) {
        Chat.log(`&cFailed to execute wrapped script: ${error.message}`);
    }

    return null;
}

// Test with various inputs
processSafely("  hello world  ");  // Success
processSafely("   ");              // Empty warning
processSafely(null);               // Error
processSafely(undefined);          // Error
```

### Performance Considerations

```js
// Good: Reuse wrapped scripts
const processor = JsMacros.wrapScriptRun("javascript", `
    const data = event.arg1;
    event.setReturnString(data.toUpperCase());
`);

// Bad: Creating new wrapped scripts repeatedly (slow)
function badProcess(data) {
    const tempProcessor = JsMacros.wrapScriptRun("javascript", `
        const data = event.arg1;
        event.setReturnString(data.toUpperCase());
    `);
    return tempProcessor.apply(data);
}

// Good: Batch processing
function processBatch(items) {
    const results = [];
    for (const item of items) {
        const result = processor.apply(item);
        results.push(result);
    }
    return results;
}

// Use async for long-running operations
const longTask = JsMacros.wrapScriptRunAsync("javascript", `
    const data = event.arg1;

    // Simulate complex processing
    Chat.log(`Processing: ${data}`);
    // Long operation here...
    event.setReturnString(\`Processed: \${data}\`);
    Chat.log(`Completed: ${data}`);
`);

// Process multiple items concurrently
const items = ["item1", "item2", "item3"];
for (const item of items) {
    longTask.accept(item);
}
Chat.log("All async tasks started");
```

## Integration Notes

### Event Access in Wrapped Scripts

Wrapped scripts receive access to special event data through the `event` object:

- `event.arg1` - First parameter passed to the method
- `event.arg2` - Second parameter passed to the method (for BiConsumer, BiFunction, etc.)
- `event.setReturn*()` methods - Set return values for Function, Supplier, etc.

### Thread Management

- **Synchronous wrapped scripts** (`wrapScriptRun`) block execution until completion
- **Asynchronous wrapped scripts** (`wrapScriptRunAsync`) run without blocking
- JsMacros automatically manages thread safety and script context
- Use async scripts for long operations to avoid game stutter

### Memory and Performance

- Wrapped scripts maintain references to their execution context
- Reuse wrapped script objects when possible for better performance
- Consider the frequency of execution when choosing sync vs async
- Async scripts are generally preferred for event handlers

---

**See Also:**
- [JsMacros.wrapScriptRun()](../apis/jsmacros.md#wrapperun) - Create synchronous wrapped scripts
- [JsMacros.wrapScriptRunAsync()](../apis/jsmacros.md#wrapperunasync) - Create asynchronous wrapped scripts
- [EventWrappedScript](events/wrappedscript.md) - Event passed to wrapped scripts
- [JavaWrapper](../classes/javawrapper.md) - Java-to-JavaScript method wrapping utilities