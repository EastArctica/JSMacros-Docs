# BaseEventRegistry

**Package:** `xyz.wagyourtail.jsmacros.core.event`
**Since:** 1.2.7
**Abstract Class:** Yes (cannot be instantiated directly)

## Overview

`BaseEventRegistry` is the core event management system in JSMacros that handles all event registration, listener management, and event metadata. This class serves as the foundation for JSMacros' event-driven architecture, managing how events are registered, which listeners respond to them, and how script triggers are processed.

**Note:** This class is not directly accessible from JSMacros scripts. Instead, you interact with its functionality through the global `JsMacros` object methods like `JsMacros.on()`, `JsMacros.off()`, `JsMacros.listeners()`, etc.

## Purpose and Role

The BaseEventRegistry is responsible for:

- **Event Registration**: Maintaining a registry of all available events
- **Listener Management**: Adding and removing event listeners
- **Script Trigger Management**: Handling script-based event triggers from the configuration
- **Event Metadata**: Tracking which events are cancellable, joinable, or filterable
- **Legacy Support**: Managing event name mappings for backward compatibility

## Core Properties

### Public Fields

```javascript
// Map of event names to their listeners
listeners: Map<String, Set<IEventListener>>

// Mapping of old event names to current event names (for backward compatibility)
oldEvents: Map<String, String>

// Set of all registered event names
events: Set<String>

// Set of events that can be cancelled
cancellableEvents: Set<String>

// Set of events that can be joined (waited for)
joinableEvents: Set<String>

// Map of filterable events to their filter implementations
filterableEvents: Map<String, Class<? extends EventFilterer>>
```

## Key Methods (Abstract Implementation)

### Listener Management

#### `addListener(event, listener)`
Adds an event listener for a specific event.

**Parameters:**
- `event` (String): The event name to listen for
- `listener` (IEventListener): The listener instance to add

**Usage (via JsMacros API):**
```javascript
// This is how you typically add listeners in scripts
JsMacros.on("ServiceTick", (event) => {
    console.log("Service tick occurred");
});
```

#### `removeListener(event, listener)`
Removes a specific event listener.

**Parameters:**
- `event` (String): The event name
- `listener` (IEventListener): The listener to remove

**Returns:** `boolean` - `true` if listener was removed, `false` if not found

**Usage (via JsMacros API):**
```javascript
// Store listener reference for removal
const listener = JsMacros.on("ServiceTick", handler);
// Later remove it
JsMacros.off("ServiceTick", listener);
```

#### `getListeners()`
Returns all listeners for all events.

**Returns:** `Map<String, Set<IEventListener>>`

#### `getListeners(event)`
Returns all listeners for a specific event.

**Parameters:**
- `event` (String): The event name

**Returns:** `Set<IEventListener>` - Immutable set of listeners

**Usage (via JsMacros API):**
```javascript
// Get all listeners for an event
const listeners = JsMacros.listeners("ServiceTick");
console.log(`Found ${listeners.length} listeners`);
```

### Script Trigger Management

#### `addScriptTrigger(rawmacro)`
*Abstract method - implemented by concrete registry classes*

Adds a script trigger from configuration to the event system.

**Parameters:**
- `rawmacro` (ScriptTrigger): The script trigger configuration

#### `removeScriptTrigger(rawmacro)`
*Abstract method - implemented by concrete registry classes*

Removes a script trigger from the event system.

**Parameters:**
- `rawmacro` (ScriptTrigger): The script trigger to remove

**Returns:** `boolean` - `true` if trigger was removed

#### `getScriptTriggers()`
*Abstract method - implemented by concrete registry classes*

Gets all currently registered script triggers.

**Returns:** `List<ScriptTrigger>`

### Event Registration

#### `addEvent(eventName)`
Registers a new event with the system.

**Parameters:**
- `eventName` (String): Name of the event to register

**Note:** This method is marked as `@ApiStatus.Internal` and should not be called directly from scripts.

#### `addEvent(eventName, joinable)`
Registers an event with joinable flag.

**Parameters:**
- `eventName` (String): Name of the event
- `joinable` (boolean): Whether the event can be joined

#### `addEvent(eventName, joinable, cancellable)`
Registers an event with both joinable and cancellable flags.

**Parameters:**
- `eventName` (String): Name of the event
- `joinable` (boolean): Whether the event can be joined
- `cancellable` (boolean): Whether the event can be cancelled

#### `addEvent(clazz)`
Registers an event using reflection and `@Event` annotation.

**Parameters:**
- `clazz` (Class<? extends BaseEvent>): The event class to register

This method automatically extracts event metadata from the `@Event` annotation:
- Event name from `value()`
- Legacy name mapping from `oldName()`
- Cancellable flag from `cancellable()`
- Joinable flag from `joinable()`
- Filterer from `filterer()`

### Utility Methods

#### `clearMacros()`
Removes all script-based listeners while keeping system listeners intact.

**Usage (via JsMacros API):**
```javascript
// Remove all script listeners
JsMacros.disableScriptListeners();

// Or for a specific event
JsMacros.disableScriptListeners("ServiceTick");
```

## Event Metadata and Classification

Events in the BaseEventRegistry system are classified by their properties:

### Cancellable Events
Events that can be prevented from proceeding. When an event is cancelled, the original game action doesn't occur.

**Example:**
```javascript
JsMacros.on("AttackKey", (event) => {
    if (shouldPreventAttack) {
        event.cancel(); // Prevents the attack from happening
    }
});
```

### Joinable Events
Events that scripts can "join" to modify their behavior or wait for completion.

### Filterable Events
Events that support filtering to reduce performance impact when dealing with frequently triggered events.

## Usage Patterns in Scripts

While you don't directly access BaseEventRegistry, understanding its design helps you use the JSMacros event system effectively:

### Basic Event Listening
```javascript
// Listen for an event
const listener = JsMacros.on("PlayerJoin", (event) => {
    console.log(`Player ${event.entityName} joined the game`);
});

// Remove the listener later
listener.off(); // or JsMacros.off("PlayerJoin", listener)
```

### Event Information
```javascript
// Get information about available events
const allListeners = JsMacros.listeners("ServiceTick");
console.log(`ServiceTick has ${allListeners.length} listeners`);

// Disable all listeners for an event (including system ones)
JsMacros.disableAllListeners("ServiceTick");

// Disable only script listeners
JsMacros.disableScriptListeners("ServiceTick");
```

### Event Filtering (Advanced)
For high-frequency events, use filtering to improve performance:

```javascript
// Create a filtered listener (if the event supports filtering)
JsMacros.on("ServiceTick", (event) => {
    // This listener will only be called if the filter criteria are met
    processImportantTick(event);
}, {
    // Filter criteria (event-specific)
    minInterval: 20 // Only trigger every 20 ticks
});
```

## Implementation Details

### Thread Safety
BaseEventRegistry methods are synchronized to ensure thread-safe operation in the multi-threaded JSMacros environment.

### Listener Types
The registry manages different types of listeners:
- **Script Listeners**: Created from user scripts via JsMacros API
- **System Listeners**: Internal JSMacros listeners
- **Config Listeners**: Created from script trigger configurations

### Event Resolution
When registering script triggers, the system:
1. Checks for legacy event names and maps them to current names
2. Handles "Joined" event prefixes appropriately
3. Routes triggers to appropriate listener implementations

## Related Classes

- **[BaseEvent](BaseEvent.md)**: The base class for all events
- **[IEventListener](IEventListener.md)**: Interface for event listeners
- **[@Event](Event.md)**: Annotation for event metadata
- **[EventFilterer](EventFilterer.md)**: Base class for event filtering
- **[ScriptTrigger](../config/ScriptTrigger.md)**: Configuration-based event triggers

## Best Practices

1. **Use JsMacros API**: Always use the global `JsMacros` object methods rather than trying to access the registry directly
2. **Clean Up Listeners**: Remove listeners when they're no longer needed to prevent memory leaks
3. **Filter High-Frequency Events**: Use event filtering for events like "ServiceTick" to improve performance
4. **Understand Event Types**: Know whether events are cancellable or joinable before trying to use those features
5. **Legacy Event Names**: Be aware that some event names have changed, but old names are still supported for backward compatibility

## Version History

- **1.2.7**: Base class created
- **1.8.4**: Added listener self-unregistration via `off()` method in IEventListener
- **Various versions**: Continued refinement of event metadata and filtering capabilities