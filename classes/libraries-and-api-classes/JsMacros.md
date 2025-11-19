# JsMacros

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.FJsMacros`

**Implements:** `PerExecLibrary`

Functions that interact directly with JsMacros or Events. This is the main entry point library that provides access to JsMacros core functionality including script execution, event management, and configuration access.

The JsMacros library is available to scripts via the global `JsMacros` variable and provides essential functions for running scripts, managing events, and accessing core JsMacros services.

## Table of Contents
- [Core Management](#core-management)
  - [getProfile](#getprofile)
  - [getConfig](#getconfig)
  - [getServiceManager](#getservicemanager)
  - [getOpenContexts](#getopencontexts)
- [Script Execution](#script-execution)
  - [runScript](#runscript)
  - [wrapScriptRun](#wrapscriptrun)
  - [wrapScriptRunAsync](#wrapscriptrunasync)
- [Event Management](#event-management)
  - [on](#on)
  - [once](#once)
  - [off](#off)
  - [disableAllListeners](#disablealllisteners)
  - [disableScriptListeners](#disablescriptlisteners)
  - [waitForEvent](#waitforevent)
  - [listeners](#listeners)
- [Event Filtering](#event-filtering)
  - [createEventFilterer](#createeventfilterer)
  - [createComposedEventFilterer](#createcomposedeventfilterer)
  - [createModulusEventFilterer](#createmoduluseventfilterer)
  - [invertEventFilterer](#inverteventfilterer)
- [Custom Events](#custom-events)
  - [createCustomEvent](#createcustomevent)
  - [assertEvent](#assertevent)
- [Deprecated Methods](#deprecated-methods)
  - [open](#open)
  - [openUrl](#openurl)

---

## Core Management

### getProfile
```js
const profile = JsMacros.getProfile();
Chat.log(`Current profile: ${profile.getName()}`);
```

Returns the JsMacros profile class that manages user settings and script configurations.

**Returns:** `BaseProfile` - The current JsMacros profile

### getConfig
```js
const config = JsMacros.getConfig();
const options = config.getOptions();
Chat.log(`Auto-reload services: ${options.serviceAutoReload}`);
```

Returns the JsMacros configuration management class that handles all configuration settings.

**Returns:** `ConfigManager` - The configuration manager

### getServiceManager
```js
const serviceManager = JsMacros.getServiceManager();
const services = serviceManager.getServices();
for (const service of services) {
    Chat.log(`Service running: ${service.getFile().getName()}`);
}
```

Returns the service manager for managing background scripts (services) that run continuously.

**Returns:** `ServiceManager` - The service manager

**Since:** `1.6.3`

**Notes:** Services are background scripts designed to run full-time and are mainly noticed by their side effects.

### getOpenContexts
```js
const contexts = JsMacros.getOpenContexts();
Chat.log(`Currently open script contexts: ${contexts.length}`);
for (const ctx of contexts) {
    Chat.log(`Context: ${ctx.getScriptName()}`);
}
```

Returns a list of non-garbage-collected ScriptContext instances that are currently running.

**Returns:** `List<BaseScriptContext>` - List of open script contexts

**Since:** `1.4.0`

---

## Script Execution

### runScript
```js
// Run a script file
JsMacros.runScript("examples/hello.js");

// Run with a custom event
const customEvent = JsMacros.createCustomEvent("MyEvent");
JsMacros.runScript("examples/custom_handler.js", customEvent);

// Run with callback
JsMacros.runScript("examples/async_task.js", JavaWrapper.methodToJava((error) => {
    if (error) {
        Chat.log(`Script error: ${error.message}`);
    } else {
        Chat.log("Script completed successfully!");
    }
}));

// Run a string as script
JsMacros.runScript("javascript", "Chat.log('Hello from dynamic script!');");
```

Runs a script file or string with optional parameters and callback.

**Overloads:**
- `JsMacros.runScript(file: string)`
- `JsMacros.runScript(file: string, fakeEvent: BaseEvent)`
- `JsMacros.runScript(file: string, fakeEvent: BaseEvent, callback: MethodWrapper)`
- `JsMacros.runScript(language: string, script: string)`
- `JsMacros.runScript(language: string, script: string, callback: MethodWrapper)`
- `JsMacros.runScript(language: string, script: string, file: string, callback: MethodWrapper)`
- `JsMacros.runScript(language: string, script: string, file: string, event: BaseEvent, callback: MethodWrapper)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | `string` | Path to the script file relative to the macro folder |
| language | `string` | Script language (e.g., "javascript", "python") |
| script | `string` | Script code to execute |
| fakeEvent | `BaseEvent` | Optional event to pass to the script |
| file | `string` | Optional file name for error reporting |
| event | `BaseEvent` | Optional event context |
| callback | `MethodWrapper` | Optional callback for completion/error handling |

**Returns:** `EventContainer` - The event container the script is running on

**Notes:**
- File paths are relative to the macro folder
- Use `createCustomEvent()` to create events for script communication
- Callbacks receive errors as the first parameter

### wrapScriptRun
```js
// Wrap a script as a method
const wrappedScript = JsMacros.wrapScriptRun("utils/calculator.js");

// Call the wrapped script with an event
const event = JsMacros.createCustomEvent("Calculate");
wrappedScript.accept(event);

// Wrap a string script with file reference
const dynamicScript = JsMacros.wrapScriptRun("javascript", "return args[0] * args[1];", "multiply.js");
```

Wraps a script execution as a MethodWrapper that can be called multiple times.

**Overloads:**
- `JsMacros.wrapScriptRun(file: string)`
- `JsMacros.wrapScriptRun(language: string, script: string)`
- `JsMacros.wrapScriptRun(language: string, script: string, file: string)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | `string` | Path to script file |
| language | `string` | Script language |
| script | `string` | Script code to wrap |
| file | `string` | Optional file name for error reporting |

**Returns:** `MethodWrapper` - Wrapped script that can be called multiple times

**Since:** `1.7.0`

### wrapScriptRunAsync
```js
// Create an async wrapper for frequently called script
const asyncWrapper = JsMacros.wrapScriptRunAsync("utils/performance_monitor.js");

// Use in event listener without blocking
const event = JsMacros.createCustomEvent("PerformanceCheck");
asyncWrapper.accept(event);
```

Wraps a script execution as an asynchronous MethodWrapper for non-blocking execution.

**Overloads:**
- `JsMacros.wrapScriptRunAsync(file: string)`
- `JsMacros.wrapScriptRunAsync(language: string, script: string)`
- `JsMacros.wrapScriptRunAsync(language: string, script: string, file: string)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | `string` | Path to script file |
| language | `string` | Script language |
| script | `string` | Script code to wrap |
| file | `string` | Optional file name for error reporting |

**Returns:** `MethodWrapper` - Async wrapped script that runs in background

**Since:** `1.7.0`

---

## Event Management

### on
```js
// Basic event listener
JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    Chat.log(`Received message: ${event.message}`);
}));

// Event listener with join flag
JsMacros.on("Key", true, JavaWrapper.methodToJava((event) => {
    Chat.log(`Key pressed: ${event.key}`);
}));

// Event listener with filterer
const movementFilter = JsMacros.createEventFilterer("SendPacket").setType("PlayerMoveC2SPacket");
JsMacros.on("SendPacket", movementFilter, JavaWrapper.methodToJava((event) => {
    Chat.log("Movement packet detected");
}));

// Full parameters
const filter = JsMacros.createEventFilterer("SendPacket").setType("ChatMessageC2SPacket");
JsMacros.on("SendPacket", filter, true, JavaWrapper.methodToJava((event) => {
    Chat.log(`Chat packet: ${event.type}`);
}));
```

Creates a persistent event listener that can be more efficient than running script files when used properly.

**Overloads:**
- `JsMacros.on(event: string, callback: MethodWrapper)`
- `JsMacros.on(event: string, joined: boolean, callback: MethodWrapper)`
- `JsMacros.on(event: string, filterer: EventFilterer, callback: MethodWrapper)`
- `JsMacros.on(event: string, filterer: EventFilterer, joined: boolean, callback: MethodWrapper)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Event name to listen for |
| joined | `boolean` | Whether the event should be joined (wait for completion) |
| filterer | `EventFilterer` | Optional filter to limit events |
| callback | `MethodWrapper` | Function to call when event triggers |

**Returns:** `IEventListener` - The created event listener

**Since:** `1.2.7`

**Notes:**
- Use `createEventFilterer()` for performance optimization with frequent events
- Joined events wait for script completion before continuing
- Use the listener's `off()` method to remove the listener

### once
```js
// Single-use event listener
JsMacros.once("ServiceStop", JavaWrapper.methodToJava((event) => {
    Chat.log(`Service stopped: ${event.serviceName}`);
}));

// Single-use with join
JsMacros.once("GameLoad", true, JavaWrapper.methodToJava((event) => {
    Chat.log("Game fully loaded!");
    // Do initialization tasks
}));
```

Creates a single-run event listener that automatically removes itself after triggering once.

**Overloads:**
- `JsMacros.once(event: string, callback: MethodWrapper)`
- `JsMacros.once(event: string, joined: boolean, callback: MethodWrapper)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Event name to listen for |
| joined | `boolean` | Whether the event should be joined (wait for completion) |
| callback | `MethodWrapper` | Function to call when event triggers |

**Returns:** `IEventListener` - The created event listener

**Since:** `1.2.7`

### off
```js
// Remove specific listener
const listener = JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    Chat.log("Key pressed!");
}));
JsMacros.off(listener);

// Remove from specific event
JsMacros.off("Key", listener);
```

Removes an event listener from all events or a specific event.

**Overloads:**
- `JsMacros.off(listener: IEventListener)`
- `JsMacros.off(event: string, listener: IEventListener)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| listener | `IEventListener` | The listener to remove |
| event | `string` | Specific event to remove from (optional) |

**Returns:** `boolean` - True if listener was successfully removed

**Since:** `1.2.3`

### disableAllListeners
```js
// Disable all listeners for specific event
JsMacros.disableAllListeners("RecvMessage");

// Disable ALL listeners globally
JsMacros.disableAllListeners();
```

Disables all listeners for a specific event or globally, including JsMacros' own internal listeners.

**Overloads:**
- `JsMacros.disableAllListeners(event: string)`
- `JsMacros.disableAllListeners()`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Specific event to remove all listeners from (optional) |

**Since:** `1.8.4`

**Notes:** This is a powerful function that will disable all event listeners, including internal JsMacros listeners. Use with caution.

### disableScriptListeners
```js
// Disable only script listeners for specific event
JsMacros.disableScriptListeners("Key");

// Disable all script listeners globally
JsMacros.disableScriptListeners();
```

Disables only user-created event listeners (from `on()`, `once()`, `waitForEvent()`), preserving internal JsMacros listeners.

**Overloads:**
- `JsMacros.disableScriptListeners(event: string)`
- `JsMacros.disableScriptListeners()`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Specific event to remove script listeners from (optional) |

**Since:** `1.8.4`

### waitForEvent
```js
// Basic wait for event
const result = JsMacros.waitForEvent("RecvMessage");
Chat.log(`Waited for message: ${result.event.message}`);

// Wait with filter
const chatEvent = JsMacros.waitForEvent("RecvMessage", JavaWrapper.methodToJava((event) => {
    return event.message.includes("important");
}));
Chat.log(`Important message: ${chatEvent.event.message}`);

// Wait with join flag
const joinedResult = JsMacros.waitForEvent("GameLoad", true);
// Can use joinedResult.context.releaseLock() to exit early if needed

// Wait with runBefore callback
const timedResult = JsMacros.waitForEvent("Tick",
    JavaWrapper.methodToJava((event) => false), // filter to wait until condition met
    JavaWrapper.methodToJava(() => {
        Chat.log("Starting to wait for specific tick...");
    })
);
```

Waits for a specific event to occur, optionally filtering events and providing early exit functionality.

**Overloads:**
- `JsMacros.waitForEvent(event: string)`
- `JsMacros.waitForEvent(event: string, join: boolean)`
- `JsMacros.waitForEvent(event: string, filter: MethodWrapper)`
- `JsMacros.waitForEvent(event: string, join: boolean, filter: MethodWrapper)`
- `JsMacros.waitForEvent(event: string, filter: MethodWrapper, runBeforeWaiting: MethodWrapper)`
- `JsMacros.waitForEvent(event: string, join: boolean, filter: MethodWrapper, runBeforeWaiting: MethodWrapper)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Event name to wait for |
| join | `boolean` | Whether to join the event (default: false) |
| filter | `MethodWrapper` | Optional filter function, returns true when condition met |
| runBeforeWaiting | `MethodWrapper` | Optional function to run before waiting for thread safety |

**Returns:** `EventAndContext<E>` - Object containing the event and context

**Since:** `1.5.0`

**Throws:** `InterruptedException` - If the waiting thread is interrupted

**Notes:**
- Use `context.releaseLock()` to exit early from joined events
- Filter function should return true when the desired condition is met
- Use `runBeforeWaiting` for thread safety when deferring tasks

### listeners
```js
// Get all script listeners for an event
const keyListeners = JsMacros.listeners("Key");
Chat.log(`Key listeners: ${keyListeners.length}`);
for (const listener of keyListeners) {
    Chat.log(`Listener: ${listener.toString()}`);
}
```

Returns a list of script-added listeners for a specific event.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Event name to get listeners for |

**Returns:** `List<IEventListener>` - List of script-created listeners

**Since:** `1.2.3`

---

## Event Filtering

### createEventFilterer
```js
// Create filterer for packet events
const packetFilter = JsMacros.createEventFilterer("SendPacket");
packetFilter.setType("PlayerMoveC2SPacket");

// Create filterer for different event types
const keyFilter = JsMacros.createEventFilterer("Key");
keyFilter.setKeys("key.keyboard.k"); // Only K key

// Use with event listener
JsMacros.on("SendPacket", packetFilter, JavaWrapper.methodToJava((event) => {
    Chat.log("Movement packet detected!");
}));
```

Creates an event filterer to reduce lag when listening to frequently triggered events.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `string` | Event name to create filterer for |

**Returns:** `EventFilterer` - Event-specific filterer instance

**Since:** `1.9.1`

**Notes:**
- Filterers improve performance by filtering events before they reach script handlers
- Each event type has its own filterer class with specific filtering options
- Throws error if event doesn't support filtering

### createComposedEventFilterer
```js
const movementFilter = JsMacros.createEventFilterer("SendPacket").setType("PlayerMoveC2SPacket");
const chatFilter = JsMacros.createEventFilterer("SendPacket").setType("ChatMessageC2SPacket");

// Create OR filter (movement OR chat)
const orFilter = JsMacros.createComposedEventFilterer(movementFilter)
    .or(chatFilter);

// Create AND filter (movement AND specific condition)
const andFilter = JsMacros.createComposedEventFilterer(movementFilter)
    .and(JavaWrapper.methodToJava((event) => {
        return event.someCondition === true;
    }));

JsMacros.on("SendPacket", orFilter, JavaWrapper.methodToJava((event) => {
    Chat.log("Movement or chat packet detected");
}));
```

Creates a composed event filterer that combines multiple filterers with AND/OR logic.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| initial | `EventFilterer` | Initial filterer to compose with |

**Returns:** `FiltererComposed` - Composed filterer for combining conditions

**Since:** `1.9.1`

### createModulusEventFilterer
```js
// Only process every 10th tick event
const tenthTickFilter = JsMacros.createModulusEventFilterer(10);
JsMacros.on("Tick", tenthTickFilter, JavaWrapper.methodToJava((event) => {
    Chat.log(`10th tick: ${event.tick}`);
}));

// Process every 100th packet
const packetFilter = JsMacros.createModulusEventFilterer(100);
JsMacros.on("SendPacket", packetFilter, JavaWrapper.methodToJava((event) => {
    Chat.log(`100th packet: ${event.type}`);
}));
```

Creates a modulus event filterer that only lets every nth event pass through.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| quotient | `int` | Process every nth event (e.g., 10 = every 10th event) |

**Returns:** `FiltererModulus` - Modulus filterer for rate limiting events

**Since:** `1.9.1`

### invertEventFilterer
```js
const movementFilter = JsMacros.createEventFilterer("SendPacket").setType("PlayerMoveC2SPacket");

// Create filter for everything EXCEPT movement packets
const nonMovementFilter = JsMacros.invertEventFilterer(movementFilter);

JsMacros.on("SendPacket", nonMovementFilter, JavaWrapper.methodToJava((event) => {
    Chat.log(`Non-movement packet: ${event.type}`);
}));
```

Inverts a base filterer's result, making it match the opposite conditions.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| base | `EventFilterer` | Filterer to invert |

**Returns:** `EventFilterer` - Inverted filterer

**Since:** `1.9.1`

**Notes:** Checks if the base is already inverted to avoid double-inverting.

---

## Custom Events

### createCustomEvent
```js
// Create a custom event
const myEvent = JsMacros.createCustomEvent("MyScriptEvent");

// Set custom data
myEvent.data = { message: "Hello from custom event!", value: 42 };

// Register to make it visible in GUI
myEvent.registerEvent();

// Trigger the event
myEvent.trigger();

// Listen for the custom event
JsMacros.on("MyScriptEvent", JavaWrapper.methodToJava((event) => {
    Chat.log(`Custom event received: ${event.data.message}`);
    Chat.log(`Custom value: ${event.data.value}`);
}));
```

Creates a custom event object that can trigger custom events with optional GUI registration.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| eventName | `string` | Name of the custom event (should not conflict with existing events) |

**Returns:** `EventCustom` - Custom event instance

**Since:** `1.2.8`

**Notes:**
- Use `registerEvent()` to make the event visible in the GUI
- Custom events can have any data attached to them
- Perfect for inter-script communication

### assertEvent
```js
// Type-safe event handling
JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    // Assert this is a RecvMessage event for type safety
    JsMacros.assertEvent(event, "RecvMessage");

    // Now TypeScript/intellisense knows the specific event type
    Chat.log(`Message from ${event.username}: ${event.message}`);
}));

// Will throw if event type is wrong
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    // This will throw an AssertionError because "Key" ≠ "RecvMessage"
    JsMacros.assertEvent(event, "RecvMessage");
}));
```

Asserts that an event is of the correct type for type safety and converts the event type in TypeScript.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| event | `BaseEvent` | The event to assert |
| type | `string` | Expected event type name |

**Throws:** `AssertionError` - If event is null, wrong type, or improperly annotated

**Since:** `1.9.0`

**Notes:**
- Mainly useful for TypeScript users to get proper type inference
- Helps catch event type mismatches during development
- Event type names correspond to the values in `Event` annotations

---

## Deprecated Methods

### open
```js
// Deprecated - use Utils library instead
JsMacros.open("config/settings.txt");
```

Opens a file with the default system program. Paths are relative to the script's folder.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| path | `string` | File path relative to script folder |

**Throws:** `IOException` - If file cannot be opened

**Deprecated:** Use the `Utils` library instead

**Since:** `1.1.8`

### openUrl
```js
// Deprecated - use Utils library instead
JsMacros.openUrl("https://github.com/wagyourtail/JsMacros");
```

Opens a URL with the default system web browser.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | `string` | URL to open |

**Throws:** `IOException` - If URL cannot be opened

**Deprecated:** Use the `Utils` library instead

**Since:** `1.6.0`

---

## Usage Examples

### Basic Script Management
```js
// Get current profile and config
const profile = JsMacros.getProfile();
const config = JsMacros.getConfig();

// Run utility scripts
JsMacros.runScript("utils/init.js");

// Check running contexts
const contexts = JsMacros.getOpenContexts();
Chat.log(`Active scripts: ${contexts.length}`);
```

### Event System Usage
```js
// Listen for chat messages with filter
const chatFilter = JsMacros.createEventFilterer("RecvMessage").setUsername("Notch");
JsMacros.on("RecvMessage", chatFilter, JavaWrapper.methodToJava((event) => {
    Chat.log(`Notch said: ${event.message}`);
}));

// Wait for specific condition
const specialMessage = JsMacros.waitForEvent("RecvMessage",
    JavaWrapper.methodToJava((event) => {
        return event.message.includes("admin");
    })
);
Chat.log(`Admin message: ${specialMessage.event.message}`);

// One-time cleanup listener
JsMacros.once("GameUnload", JavaWrapper.methodToJava((event) => {
    // Clean up resources
    disableAllListeners();
    Chat.log("All listeners cleaned up");
}));
```

### Inter-Script Communication
```js
// Script A - Create and trigger custom event
const updateEvent = JsMacros.createCustomEvent("DataUpdate");
updateEvent.data = { temperature: 25.5, humidity: 60 };
updateEvent.trigger();

// Script B - Listen for custom event
JsMacros.on("DataUpdate", JavaWrapper.methodToJava((event) => {
    const data = event.data;
    Chat.log(`Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%`);

    // Update HUD or other systems
    // ...
}));
```

### Performance Optimization
```js
// Filter frequent events for performance
const movementFilter = JsMacros.createModulusEventFilterer(20); // Every 20th movement packet
JsMacros.on("SendPacket", movementFilter, JavaWrapper.methodToJava((event) => {
    if (event.type === "PlayerMoveC2SPacket") {
        // Process movement data less frequently
        updatePositionData(event);
    }
}));

// Compose complex filters
const importantPackets = JsMacros.createComposedEventFilterer(
    JsMacros.createEventFilterer("SendPacket").setType("ChatMessageC2SPacket")
).or(
    JsMacros.createEventFilterer("SendPacket").setType("PlayerInteractBlockC2SPacket")
);

JsMacros.on("SendPacket", importantPackets, JavaWrapper.methodToJava((event) => {
    Chat.log(`Important packet: ${event.type}`);
}));
```

### Advanced Event Waiting
```js
// Wait for multiple conditions
function waitForPlayerInRange(range) {
    return JsMacros.waitForEvent("Tick",
        JavaWrapper.methodToJava((event) => {
            const player = Player.getPlayer();
            const target = World.getPlayer("TargetPlayer");
            if (player && target) {
                const dist = player.getPos().distanceTo(target.getPos());
                return dist <= range;
            }
            return false;
        }),
        JavaWrapper.methodToJava(() => {
            Chat.log(`Waiting for player within ${range} blocks...`);
        })
    );
}

const encounter = waitForPlayerInRange(50);
Chat.log(`Player encountered at tick: ${encounter.event.tick}`);
```

This JsMacros library serves as the central hub for script execution, event management, and core JsMacros functionality. Mastering these functions will allow you to create sophisticated automation scripts with proper event handling, performance optimization, and inter-script communication.