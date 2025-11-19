# MethodWrapper

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.MethodWrapper<T, U, R, C extends BaseScriptContext<?>>`

**Implements:** `Consumer<T>`, `BiConsumer<T, U>`, `Function<T, R>`, `BiFunction<T, U, R>`, `Predicate<T>`, `BiPredicate<T, U>`, `Runnable`, `Supplier<R>`, `Comparator<T>`

The `MethodWrapper` class is an advanced reflection and method manipulation utility that serves as the bridge between Java code and script functions in JSMacros. It wraps script functions to make them compatible with Java's functional interfaces, enabling seamless integration between Java callbacks and script execution.

This class is fundamental to JSMacros' event system and allows scripts to handle Java events, GUI interactions, and other callbacks. MethodWrapper instances are typically created through the `JavaWrapper` library rather than instantiated directly.

The class handles complex threading and execution context management, ensuring script functions execute safely within their proper context while maintaining compatibility with Java's functional interface requirements.

## Class Declaration

```java
public abstract class MethodWrapper<T, U, R, C extends BaseScriptContext<?>>
    implements Consumer<T>, BiConsumer<T, U>, Function<T, R>, BiFunction<T, U, R>,
               Predicate<T>, BiPredicate<T, U>, Runnable, Supplier<R>, Comparator<T>
```

**Generic Parameters:**

| Parameter | Description |
| --------- | ----------- |
| T | Type of the first parameter |
| U | Type of the second parameter |
| R | Return type of the wrapped function |
| C | Type of the script context |

## Table of Contents

- [Constructors](#constructors)
- [Properties](#properties)
- [Methods](#methods)
- [Functional Interface Implementations](#functional-interface-implementations)
- [Usage Examples](#usage-examples)
- [Thread Safety and Considerations](#thread-safety-and-considerations)
- [Related Classes](#related-classes)

## Constructors

MethodWrapper instances are not typically created directly by scripters. Instead, they are obtained through:

- The `JavaWrapper.methodToJava()` method for synchronous execution
- The `JavaWrapper.methodToJavaAsync()` method for asynchronous execution
- The `JavaWrapper.methodToJavaAsync(priority, function)` method for prioritized execution

**Internal Constructor:**
```js
// This constructor is used internally by language implementations
new MethodWrapper(scriptContext)
```

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| scriptContext | BaseScriptContext | The script context this wrapper belongs to |

## Properties

## Methods

## Functional Interface Implementations

MethodWrapper implements multiple Java functional interfaces, allowing it to be used in various contexts:

### Consumer Interface Methods

### Function Interface Methods

### Predicate Interface Methods

### Other Interface Methods

## Usage Examples

### Basic Event Listener
```js
// Create a simple event listener
const onChat = JavaWrapper.methodToJavaAsync((event, context) => {
    const message = event.getMessage().getString();
    if (message.includes("help")) {
        Chat.log("&ePlayer needs help! Message: " + message);
    }
});

JsMacros.on("RecvMessage", onChat);
```

### Synchronous GUI Callback
```js
// Create a GUI with a synchronous button callback
const screen = Hud.createScreen("Test Screen", true);

const buttonCallback = JavaWrapper.methodToJava(() => {
    Chat.log("Button clicked!");
    screen.close();
});

screen.addButton(10, 10, 100, 20, "Click Me", buttonCallback);
Hud.openScreen(screen);
```

### Function Chaining
```js
// Create a processing pipeline
const processData = JavaWrapper.methodToJava((data) => {
    Chat.log(`Processing: ${data}`);
    return data.toUpperCase();
});

const logResult = JavaWrapper.methodToJava((result) => {
    Chat.log(`Result: ${result}`);
});

const pipeline = processData.andThen(logResult);
pipeline.apply("hello world");
```

### Predicate Usage
```js
// Create filters for entity selection
const isHostile = JavaWrapper.methodToJava((entity) => {
    return entity.is(
        "minecraft:zombie", "minecraft:skeleton", "minecraft:creeper",
        "minecraft:spider", "minecraft:enderman"
    );
});

const isNearby = JavaWrapper.methodToJava((entity) => {
    const player = Player.getPlayer();
    return player && player.distanceTo(entity) <= 20;
});

// Chain predicates for filtering
const isNearbyHostile = isHostile.negate().andThen((result) => {
    return isNearby.test(event.getEntity()) && !result;
});

// Use in entity scanning
const entities = World.getEntities();
entities.forEach(entity => {
    if (isHostile.test(entity) && isNearby.test(entity)) {
        Chat.log(`&cHostile entity nearby: ${entity.getName().getString()}`);
    }
});
```

### Advanced Asynchronous Processing
```js
// Create high-priority event handler
const highPriorityHandler = JavaWrapper.methodToJavaAsync(100, (event) => {
    // This will run before other handlers with lower priority
    Chat.log("&6High priority handler: " + event.toString());
});

const normalPriorityHandler = JavaWrapper.methodToJavaAsync(() => {
    Chat.log("&fNormal priority handler");
});

JsMacros.on("Tick", highPriorityHandler);
JsMacros.on("Tick", normalPriorityHandler);
```

### Data Transformation
```js
// Create data transformation functions
const formatHealth = JavaWrapper.methodToJava((entity) => {
    if (!entity.asLiving) return "N/A";
    const health = entity.asLiving().getHealth();
    const maxHealth = entity.asLiving().getMaxHealth();
    return `${health.toFixed(1)}/${maxHealth.toFixed(1)}`;
});

const addEntityInfo = JavaWrapper.methodToJava((formattedHealth) => {
    return `Health: ${formattedHealth}`;
});

const formatter = formatHealth.andThen(addEntityInfo);

// Use the transformer
const player = Player.getPlayer();
if (player) {
    const healthInfo = formatter.apply(player);
    Chat.log(healthInfo); // Health: 20.0/20.0
}
```

## Thread Safety and Considerations

### Synchronous vs Asynchronous Execution

**Synchronous (`methodToJava`)**:
- Blocks the calling Java thread until the script completes
- Suitable for quick operations like GUI callbacks
- Can cause game lag if the script takes too long

**Asynchronous (`methodToJavaAsync`)**:
- Queues the script for execution without blocking
- Essential for event handlers like `Tick` and `RecvMessage`
- Prevents game freezing during long operations

### Context Management

MethodWrapper instances maintain a reference to their script context, preventing garbage collection while the wrapper exists. This ensures:

- Scripts can be safely called from Java threads
- Proper execution context is maintained
- Thread safety for single-threaded languages

### Language-Specific Behavior

**JavaScript/GraalJS**: Uses a priority queue for thread management to ensure single-threaded execution.

**Jython**: No special threading restrictions.

**Lua**: No special threading restrictions.

## Related Classes

- [`JavaWrapper`](../apis/java-wrapper.md) - Library for creating MethodWrapper instances
- [`BaseScriptContext`](#) - Base class for script execution contexts
- [`Consumer`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Consumer.html) - Java functional interface
- [`Function`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html) - Java functional interface
- [`Predicate`](https://docs.oracle.com/javase/8/docs/api/java/util/function/Predicate.html) - Java functional interface
- [`Runnable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Runnable.html) - Java functional interface

## Version Information

- Available since JSMacros 1.0.0
- Enhanced with functional interface chaining in 1.6.0
- Priority-based async execution added in 1.8.0
- Thread safety improvements in 1.9.0