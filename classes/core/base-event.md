# BaseEvent

The foundational base class for all JsMacros events. This class provides core event functionality that all specific event types inherit from, including event cancellation capabilities, event metadata access, and triggering mechanisms.

**Class:** `BaseEvent`
**Package:** `xyz.wagyourtail.jsmacros.core.event`
**Since:** 1.0.0

## Overview

BaseEvent is the abstract base class for all events in the JsMacros event system. Every event that scripts can listen to (such as Key events, RecvMessage events, AttackBlock events, etc.) extends BaseEvent and inherits its core functionality.

Key features provided by BaseEvent:
- Event cancellation for cancellable events
- Event identification and metadata
- Event triggering and profile integration
- Joinable event support for chained event handling

## Event Properties

### Event Cancellation

Events can be cancelled to prevent their normal processing.

```js
// Example: Canceling a message event
JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    // Check if this is a BaseEvent (all events are)
    if (event instanceof BaseEvent) {
        Chat.log(`Event name: ${event.getEventName()}`);
        Chat.log(`Can cancel: ${event.cancellable()}`);
        Chat.log(`Is joinable: ${event.joinable()}`);

        // Cancel messages containing "spam"
        if (event.message.getString().toLowerCase().includes("spam")) {
            event.cancel();
            Chat.log("Blocked spam message");
        }
    }
}));

// Example: Canceling key press
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    // Cancel W key to prevent forward movement
    if (event.key === "key.keyboard.w") {
        event.cancel();
        Chat.log("Blocked forward movement");
    }
}));
```

### Event Identification

Get information about the event type and capabilities.

```js
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    // Get event name
    const eventName = event.getEventName();
    Chat.log(`Event: ${eventName}`); // Will output "Key"

    // Check if event can be cancelled
    if (event.cancellable()) {
        Chat.log("This event can be cancelled");
    } else {
        Chat.log("This event cannot be cancelled");
    }

    // Check if event is joinable
    if (event.joinable()) {
        Chat.log("This event supports joining");
    }

    // Check cancellation status
    if (event.isCanceled()) {
        Chat.log("This event has been cancelled");
    }
}));
```

## Core Methods

### BaseEvent.cancel()

Cancel the event to prevent its normal processing.

```js
JsMacros.on("AttackEntity", JavaWrapper.methodToJava((event) => {
    // Prevent attacking peaceful entities
    if (event.entity && event.entity.getType().includes("villager")) {
        event.cancel();
        Chat.log("Prevented attack on villager");
    }
}));

JsMacros.on("DropSlot", JavaWrapper.methodToJava((event) => {
    // Prevent dropping valuable items
    const item = event.item;
    if (item && item.getName().toLowerCase().includes("diamond")) {
        event.cancel();
        Chat.log("Prevented dropping diamond item");
    }
}));
```

**Throws:** `UnsupportedOperationException` if the event is not cancellable

**Usage Notes:** Always check `cancellable()` before calling `cancel()`

### BaseEvent.cancellable()

Check if the event can be cancelled.

```js
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (event.cancellable()) {
        Chat.log("Key press can be cancelled");

        // Example: Cancel specific key
        if (event.key === "key.keyboard.r") {
            event.cancel();
            Chat.log("Cancelled R key");
        }
    } else {
        Chat.log("This key event cannot be cancelled");
    }
}));

JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    Chat.log(`Message event cancellable: ${event.cancellable()}`);
}));
```

**Return Type:** `boolean`
**Returns:** `true` if the event can be cancelled, `false` otherwise

### BaseEvent.joinable()

Check if the event supports joining (multiple listeners).

```js
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (event.joinable()) {
        Chat.log("Multiple listeners can process this event");
        // Event will continue to other listeners even after processing
    }
}));
```

**Return Type:** `boolean`
**Returns:** `true` if the event supports joining, `false` otherwise

### BaseEvent.isCanceled()

Check if the event has been cancelled.

```js
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    // Process event if not already cancelled
    if (!event.isCanceled()) {
        Chat.log(`Processing key: ${event.key}`);

        // Some condition that might cancel
        if (shouldCancelKey(event.key)) {
            event.cancel();
            Chat.log(`Cancelled key: ${event.key}`);
        }
    } else {
        Chat.log(`Key ${event.key} was already cancelled by another listener`);
    }
}));
```

**Return Type:** `boolean`
**Returns:** `true` if the event has been cancelled, `false` otherwise

### BaseEvent.getEventName()

Get the name/identifier of this event type.

```js
JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    const eventName = event.getEventName();
    Chat.log(`Event type: ${eventName}`);

    // Log all event types as they occur
    if (!loggedEvents.includes(eventName)) {
        loggedEvents.push(eventName);
        Chat.log(`New event type discovered: ${eventName}`);
    }
}));

// Global event type logger
const loggedEvents = [];
JsMacros.on("*", JavaWrapper.methodToJava((event) => {
    const eventName = event.getEventName();
    if (eventName && !loggedEvents.includes(eventName)) {
        loggedEvents.push(eventName);
        Chat.log(`Event discovered: ${eventName} (cancellable: ${event.cancellable()})`);
    }
}));
```

**Return Type:** `String`
**Returns:** The event name identifier

### BaseEvent.trigger()

Manually trigger the event through the event system.

```js
// Create custom event (advanced usage)
class CustomAlertEvent extends BaseEvent {
    constructor(message) {
        super();
        this.message = message;
    }

    getMessage() {
        return this.message;
    }
}

// Trigger custom event
function triggerAlert(message) {
    const event = new CustomAlertEvent(message);
    event.trigger();
    Chat.log(`Triggered alert: ${message}`);
}

// Listen for custom events
JsMacros.on("CustomAlert", JavaWrapper.methodToJava((event) => {
    if (event instanceof CustomAlertEvent) {
        Chat.title("ALERT", event.getMessage(), 10, 60, 10);
    }
}));

// Usage
triggerAlert("Low health warning!");
```

**Usage Notes:** Primarily used internally or for custom event implementations

## Event Types and Behavior

### Cancellable Events

Events that can be cancelled to prevent their normal behavior:

```js
// Movement cancellation
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    // Cancel movement keys in specific conditions
    if (Player.getPlayer().getHealth() < 5) {
        if (['w', 'a', 's', 'd'].includes(event.key)) {
            event.cancel();
            Chat.log("Movement blocked - low health!");
        }
    }
}));

// Chat cancellation
JsMacros.on("SendMessage", JavaWrapper.methodToJava((event) => {
    // Prevent sending messages with forbidden words
    if (event.message.includes("forbidden")) {
        event.cancel();
        Chat.log("Message blocked - contains forbidden content");
    }
}));

// Interaction cancellation
JsMacros.on("AttackBlock", JavaWrapper.methodToJava((event) => {
    // Prevent breaking certain blocks
    if (event.block.getId().includes("chest")) {
        event.cancel();
        Chat.log("Cannot break chests!");
    }
}));
```

### Non-Cancellable Events

Events that cannot be cancelled (informational only):

```js
// Informational events
JsMacros.on("HealthChange", JavaWrapper.methodToJava((event) => {
    Chat.log(`Health changed from ${event.oldHealth} to ${event.newHealth}`);
    Chat.log(`Can cancel: ${event.cancellable()}`); // Will be false
}));

JsMacros.on("EXPChange", JavaWrapper.methodToJava((event) => {
    Chat.log(`Experience changed: +${event.gainedExperience}`);
    // Cannot cancel EXP changes
}));

JsMacros.on("SoundPlayed", JavaWrapper.methodToJava((event) => {
    Chat.log(`Sound played: ${event.sound.getId()}`);
    // Cannot cancel sounds from playing
}));
```

## Advanced Event Handling

### Event Filtering

Use BaseEvent properties to filter events:

```js
// Create event filter helper
function createEventFilter(eventNames, cancellableOnly) {
    return JavaWrapper.methodToJava((event) => {
        const eventName = event.getEventName();

        // Check event name filter
        if (eventNames && !eventNames.includes(eventName)) {
            return;
        }

        // Check cancellable filter
        if (cancellableOnly && !event.cancellable()) {
            return;
        }

        // Log matching event
        Chat.log(`Filtered event: ${eventName} (cancellable: ${event.cancellable()})`);
    });
}

// Apply filter
JsMacros.on("*", createEventFilter(["Key", "RecvMessage", "AttackBlock"], true));
```

### Event Chaining

Handle events with multiple listeners:

```js
// First listener - basic processing
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    Chat.log(`First handler: ${event.key}`);

    // Don't cancel, let other handlers process
}));

// Second listener - additional processing
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (!event.isCanceled()) {
        Chat.log(`Second handler: ${event.key}`);

        // Cancel under specific conditions
        if (event.key === "key.keyboard.escape") {
            event.cancel();
            Chat.log("ESC key cancelled by second handler");
        }
    }
}));

// Third listener - final processing
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (!event.isCanceled()) {
        Chat.log(`Third handler: ${event.key}`);
    } else {
        Chat.log(`Third handler: ${event.key} was cancelled`);
    }
}));
```

### Event State Tracking

Track event states and cancellations:

```js
// Event state tracker
const eventStats = {
    total: 0,
    cancelled: 0,
    byType: {}
};

// Track all events
JsMacros.on("*", JavaWrapper.methodToJava((event) => {
    const eventName = event.getEventName();

    // Update stats
    eventStats.total++;

    if (event.isCanceled()) {
        eventStats.cancelled++;
    }

    // Track by type
    if (!eventStats.byType[eventName]) {
        eventStats.byType[eventName] = { total: 0, cancelled: 0 };
    }
    eventStats.byType[eventName].total++;

    if (event.isCanceled()) {
        eventStats.byType[eventName].cancelled++;
    }

    // Log periodic stats
    if (eventStats.total % 100 === 0) {
        Chat.log(`Event Stats - Total: ${eventStats.total}, Cancelled: ${eventStats.cancelled}`);
    }
}));

// Display event statistics
function showEventStats() {
    Chat.log("=== Event Statistics ===");
    for (const [eventName, stats] of Object.entries(eventStats.byType)) {
        const cancelRate = Math.round((stats.cancelled / stats.total) * 100);
        Chat.log(`${eventName}: ${stats.total} total, ${stats.cancelled} cancelled (${cancelRate}%)`);
    }
}
```

## Best Practices

1. **Check Cancellability**: Always check `cancellable()` before calling `cancel()`
2. **Handle Cancellation**: Check `isCanceled()` before processing events
3. **Event Naming**: Use `getEventName()` for reliable event identification
4. **Multiple Listeners**: Consider event order when using multiple listeners
5. **Performance**: Avoid expensive operations in frequently triggered events

## Related Classes

- **[Event](../apis/js-macros.md)** - Event registration and management
- **[EventContainer](event-container.md)** - Event execution context
- **[EventRegistry](event-registry.md)** - Event system registry
- **[EventListener](event-listener.md)** - Event listener management

## Event Hierarchy

```
BaseEvent
├── Key Events (EventKey, etc.)
├── Message Events (EventRecvMessage, EventSendMessage)
├── Player Events (EventHealthChange, EventEXPChange)
├── World Events (EventBlockUpdate, EventPlayerJoin)
├── Inventory Events (EventClickSlot, EventSlotUpdate)
└── Custom Events (User-defined extensions)
```

## Error Handling

```js
function safeEventHandling(event) {
    try {
        // Validate event
        if (!event || typeof event.getEventName !== 'function') {
            Chat.log("Invalid event object");
            return;
        }

        // Check cancellability before cancelling
        if (shouldCancelEvent(event) && event.cancellable()) {
            event.cancel();
            Chat.log(`Cancelled event: ${event.getEventName()}`);
        }

    } catch (error) {
        Chat.log(`Event handling error: ${error.message}`);
    }
}

function shouldCancelEvent(event) {
    // Define cancellation logic
    const eventName = event.getEventName();

    // Example conditions
    switch(eventName) {
        case "Key":
            return event.key === "key.keyboard.f3";
        case "RecvMessage":
            return event.message.getString().toLowerCase().includes("spam");
        default:
            return false;
    }
}

// Apply safe handling
JsMacros.on("*", JavaWrapper.methodToJava(safeEventHandling));
```