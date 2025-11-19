# BaseEvent

The `BaseEvent` class is the foundational class for all events in JSMacros. Every event that can be listened to or triggered in JSMacros extends this class, providing common functionality for event handling, cancellation, and metadata access.

## Overview

BaseEvent serves as the parent class for all JSMacros events, including game events like `EventTick`, `EventSound`, `EventPlayerJoin`, and many others. It provides essential methods for event management that are available across all event types.

## Static Properties

### `profile`
- **Type**: `BaseProfile`
- **Access**: Read-only
- **Description**: The current profile instance that manages event triggering and script execution

## Instance Methods

### `cancellable()`
- **Returns**: `boolean`
- **Description**: Determines if the current event can be cancelled
- **Usage**: Checks if the event has the `@Event(cancellable = true)` annotation

```javascript
// Example: Check if an event is cancellable
if (event.cancellable()) {
    console.log("This event can be cancelled");
} else {
    console.log("This event cannot be cancelled");
}
```

### `joinable()`
- **Returns**: `boolean`
- **Description**: Determines if the current event is joinable (can be combined with other events)
- **Usage**: An event is joinable if it's either cancellable or marked with `@Event(joinable = true)`

```javascript
// Example: Check if an event is joinable
if (event.joinable()) {
    console.log("This event can be joined with other events");
}
```

### `cancel()`
- **Returns**: `void`
- **Description**: Attempts to cancel the current event
- **Throws**: `UnsupportedOperationException` if the event is not cancellable
- **Usage**: Call this method to prevent the event from proceeding further

```javascript
// Example: Cancel a cancellable event
if (event.cancellable()) {
    event.cancel();
    console.log("Event cancelled successfully");
} else {
    console.log("Cannot cancel this event");
}
```

### `isCanceled()`
- **Returns**: `boolean`
- **Description**: Checks if the current event has been cancelled
- **Usage**: Useful for checking if another event handler has already cancelled the event

```javascript
// Example: Check if event is already cancelled
if (event.isCanceled()) {
    console.log("Event was already cancelled");
    return; // Exit early
}
```

### `getEventName()`
- **Returns**: `String`
- **Description**: Returns the name of the event as defined in the `@Event` annotation
- **Usage**: Useful for logging or dynamically handling different event types

```javascript
// Example: Get and use the event name
const eventName = event.getEventName();
console.log(`Handling event: ${eventName}`);

// Example: Dynamic event handling
switch (event.getEventName()) {
    case "Sound":
        handleSoundEvent(event);
        break;
    case "Tick":
        handleTickEvent(event);
        break;
    default:
        console.log(`Unknown event: ${eventName}`);
}
```

### `trigger()`
- **Returns**: `void`
- **Description**: Manually triggers the event through the current profile
- **Usage**: Used to fire custom events or re-trigger existing events

```javascript
// Example: Manually trigger an event
event.trigger();
console.log("Event triggered manually");
```

## Event Annotations

BaseEvent works in conjunction with the `@Event` annotation, which provides metadata about the event:

```java
@Event(
    value = "EventName",           // The event name
    oldName = "OLD_NAME",         // Deprecated name (optional)
    cancellable = true,           // Whether the event can be cancelled (default: false)
    joinable = false,             // Whether the event can be joined (default: false)
    filterer = SomeFilterer.class // Event filter class (optional)
)
```

## Usage Patterns

### Basic Event Handling

```javascript
// Example event handler function
function onEvent(event) {
    // All events have access to BaseEvent methods
    console.log(`Event received: ${event.getEventName()}`);

    // Check if we can cancel it
    if (event.cancellable()) {
        // Do some condition checking
        if (shouldCancelEvent(event)) {
            event.cancel();
            console.log("Event cancelled");
        }
    }
}
```

### Event Metadata Access

```javascript
function logEventInfo(event) {
    console.log("=== Event Information ===");
    console.log(`Name: ${event.getEventName()}`);
    console.log(`Cancellable: ${event.cancellable()}`);
    console.log(`Joinable: ${event.joinable()}`);
    console.log(`Currently Cancelled: ${event.isCanceled()}`);
}
```

### Conditional Event Handling

```javascript
function handleEventConditionally(event) {
    // Only process if not already cancelled
    if (!event.isCanceled()) {
        // Your event handling logic here

        // Example: Cancel under certain conditions
        if (someCondition()) {
            if (event.cancellable()) {
                event.cancel();
                console.log(`${event.getEventName()} cancelled due to condition`);
            }
        }
    }
}
```

## Important Notes

1. **Event Cancellation**: Only events marked with `cancellable = true` in their `@Event` annotation can be cancelled. Attempting to cancel a non-cancellable event will throw an `UnsupportedOperationException`.

2. **Event Names**: Event names are determined by the `value` parameter in the `@Event` annotation, not the class name.

3. **Profile Access**: The static `profile` property provides access to the current JSMacros profile for advanced event management.

4. **Inheritance**: All JSMacros events extend BaseEvent, so these methods are available on every event object you receive in your event listeners.

## Related Classes

- **Event**: The annotation that provides metadata for BaseEvent subclasses
- **EventFilterer**: Interface for creating event filters
- **BaseProfile**: The profile class that manages event triggering
- **EventSound**: Example cancellable event implementation
- **EventTick**: Example non-cancellable event implementation