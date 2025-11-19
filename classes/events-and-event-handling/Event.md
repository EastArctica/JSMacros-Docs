# Event Annotation

**Full Annotation Name:** `xyz.wagyourtail.jsmacros.core.event.Event`

**Annotation Target:** `ElementType.TYPE`

**Retention:** `RetentionPolicy.RUNTIME`

**Since:** JsMacros 1.0.0

The `@Event` annotation is a fundamental metadata marker in JSMacros that defines how events behave and can be configured. Every event class in JSMacros must be annotated with `@Event` to be recognized by the event system. This annotation provides essential metadata about an event class, including its name, whether it can be cancelled, how it can be filtered, and other behavioral properties.

## Overview

The `@Event` annotation is what enables JSMacros to properly register, trigger, and manage events throughout the system. When you create custom events or work with existing ones, understanding this annotation is crucial for proper event handling and configuration.

## Annotation Elements

### `value`
- **Type:** `String`
- **Required:** Yes
- **Description:** The primary name of the event used in event listeners and triggers

This is the name that scripters use to register event listeners with `JsMacros.on()`.

**Example:**
```java
@Event(value = "Tick")
public class EventTick extends BaseEvent {
    // Event implementation
}
```

```js
// Script usage
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    console.log("Game tick occurred");
}));
```

### `oldName`
- **Type:** `String`
- **Required:** No
- **Default:** `""` (empty string)
- **Description:** Provides backward compatibility with old event names

When migrating from older versions of JSMacros, this allows scripts using old event names to continue working.

**Example:**
```java
@Event(value = "RecvMessage", oldName = "RECV_MESSAGE")
public class EventRecvMessage extends BaseEvent {
    // Event implementation
}
```

```js
// Both of these will work with the event above
JsMacros.on("RecvMessage", handler);      // New name
JsMacros.on("RECV_MESSAGE", legacyHandler); // Old name
```

### `cancellable`
- **Type:** `boolean`
- **Required:** No
- **Default:** `false`
- **Description:** Determines if the event can be cancelled by script handlers

When `true`, the event can be cancelled using the `cancel()` method from BaseEvent.

**Example:**
```java
@Event(value = "SendMessage", cancellable = true)
public class EventSendMessage extends BaseEvent {
    public final String message;

    public EventSendMessage(String message) {
        this.message = message;
    }
}
```

```js
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((event) => {
    if (event.message.includes("forbidden")) {
        event.cancel(); // Only works if cancellable = true
        Chat.log("Message blocked");
    }
}));
```

### `joinable`
- **Type:** `boolean`
- **Required:** No
- **Default:** `false`
- **Description:** Determines if the event can be joined with other events

Joinable events can be combined or chained together in event processing.

**Example:**
```java
@Event(value = "CustomEvent", joinable = true)
public class EventCustom extends BaseEvent {
    // Event implementation
}
```

### `filterer`
- **Type:** `Class<? extends EventFilterer>`
- **Required:** No
- **Default:** `EventFilterer.class`
- **Description:** Specifies a filter class that can be used to filter when the event should trigger

Allows for advanced event filtering based on custom conditions.

**Example:**
```java
@Event(value = "RecvPacket", filterer = FiltererRecvPacket.class)
public class EventRecvPacket extends BaseEvent {
    public final String packetId;
    public final byte[] data;

    public EventRecvPacket(String packetId, byte[] data) {
        this.packetId = packetId;
        this.data = data;
    }
}
```

## Usage Examples

### Basic Event Annotation
```java
@Event(value = "Tick")
public class EventTick extends BaseEvent {
    @Override
    public String toString() {
        return String.format("%s:{}", this.getEventName());
    }
}
```

### Complete Event with All Properties
```java
@Event(
    value = "Key",
    oldName = "KEY",
    cancellable = true,
    joinable = false,
    filterer = FiltererKey.class
)
public class EventKey extends BaseEvent {
    public final String key;
    public final int action;
    public final int mods;

    public EventKey(String key, int action, int mods) {
        this.key = key;
        this.action = action;
        this.mods = mods;
    }

    @Override
    public String toString() {
        return String.format("%s:{\"key\": \"%s\", \"action\": %d, \"mods\": %d}",
            this.getEventName(), key, action, mods);
    }
}
```

### Real-World Event Examples from JsMacros

#### Server Join Event
```java
@Event(value = "JoinServer", oldName = "JOIN_SERVER")
public class EventJoinServer extends BaseEvent {
    public final ClientPlayerEntityHelper<ClientPlayerEntity> player;
    public final String address;

    public EventJoinServer(ClientPlayerEntity player, String address) {
        this.player = new ClientPlayerEntityHelper<>(player);
        this.address = address;
    }

    @Override
    public String toString() {
        return String.format("%s:{\"address\": \"%s\"}", this.getEventName(), address);
    }
}
```

#### Sound Event
```java
@Event(value = "Sound", oldName = "SOUND")
public class EventSound extends BaseEvent {
    public final String sound;
    public final Pos3D pos;

    public EventSound(String sound, Pos3D pos) {
        this.sound = sound;
        this.pos = pos;
    }

    @Override
    public String toString() {
        return String.format("%s:{\"sound\": \"%s\", \"pos\": %s}",
            this.getEventName(), sound, pos);
    }
}
```

#### Cancellable Message Event
```java
@Event(value = "RecvMessage", oldName = "RECV_MESSAGE", cancellable = true)
public class EventRecvMessage extends BaseEvent {
    public final TextHelper message;
    public final int messageId;

    public EventRecvMessage(TextHelper message, int messageId) {
        this.message = message;
        this.messageId = messageId;
    }

    @Override
    public String toString() {
        return String.format("%s:{\"messageId\": %d, \"message\": \"%s\"}",
            this.getEventName(), messageId, message.getString().replace("\"", "\\\""));
    }
}
```

## Event Filtering

### Using Built-in Filters
Many events come with built-in filters that allow you to specify conditions for when the event should trigger:

```js
// Example: Listen for specific packets
JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`Received packet: ${event.packetId}`);
}), {
    // Filter options depend on the event's filterer
    packetId: "minecraft:chat_message"
});
```

### Filter Examples from Source Code

#### Packet Filtering
```java
@Event(value = "RecvPacket", cancellable = true, filterer = FiltererRecvPacket.class)
public class EventRecvPacket extends BaseEvent {
    // Can be filtered by packet ID, packet content, etc.
}
```

#### Block Update Filtering
```java
@Event(value = "BlockUpdate", oldName = "BLOCK_UPDATE", filterer = FiltererBlockUpdate.class)
public class EventBlockUpdate extends BaseEvent {
    // Can be filtered by block position, block type, etc.
}
```

## Event Registration and Listener Setup

### Basic Event Listener
```js
// Listen for a basic event
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("Game tick occurred");
}));
```

### Cancellable Event Handler
```js
// Handle a cancellable event
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();

    // Block messages containing forbidden words
    if (message.includes("forbidden")) {
        event.cancel();
        Chat.log("Blocked forbidden message");
    }
}));
```

### Event with Data Processing
```js
// Process event-specific data
JsMacros.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`Key pressed: ${event.key}`);
    Chat.log(`Action: ${event.action}`); // 1 = press, 0 = release
    Chat.log(`Modifiers: ${event.mods}`);

    // Cancel specific key combinations
    if (event.key === "key.keyboard.f" && event.mods.includes("key.keyboard.left.control")) {
        event.cancel(); // Block Ctrl+F
    }
}));
```

### Multiple Event Handlers
```js
// Register multiple handlers for the same event
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync(logMessageHandler));
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync(filterMessageHandler));
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync(analyticsHandler));

// Each handler will be called in sequence unless the event is cancelled
```

## Best Practices

1. **Always extend BaseEvent:** All event classes annotated with `@Event` should extend `BaseEvent` to inherit essential event functionality.

2. **Use descriptive event names:** Choose clear, descriptive names for the `value` element that follow camelCase or PascalCase conventions.

3. **Provide backward compatibility:** When renaming events, always include the `oldName` to maintain backward compatibility.

4. **Mark cancellable events correctly:** Only set `cancellable = true` if the event can logically be cancelled and the system supports it.

5. **Implement toString() properly:** Always provide a meaningful `toString()` implementation for debugging and logging.

6. **Use appropriate filters:** For events that might fire frequently, provide custom filterers to allow scripters to optimize performance.

## Event System Integration

### BaseEvent Integration
All event classes annotated with `@Event` should extend `BaseEvent`:

```java
@Event(value = "MyCustomEvent")
public class EventMyCustom extends BaseEvent {
    // Custom event data and methods
    public final String customData;

    public EventMyCustom(String data) {
        this.customData = data;
    }

    @Override
    public String toString() {
        return String.format("%s:{\"customData\": \"%s\"}",
            this.getEventName(), customData);
    }
}
```

### Event Registry Integration
The event system automatically discovers classes annotated with `@Event` and registers them for use in the JsMacros event system.

### Profile Integration
Events are triggered through the profile system, which manages event dispatching and script execution based on the metadata provided by the `@Event` annotation.

## Common Event Categories

Based on the source code analysis, here are common categories of events in JSMacros:

### Input Events
- `Key` - Keyboard and mouse input
- `MouseScroll` - Mouse wheel scrolling

### Player Events
- `HealthChange` - Player health updates
- `Death` - Player death
- `JoinServer` - Joining a server
- `AttackEntity` - Attacking entities

### Inventory Events
- `ClickSlot` - Clicking inventory slots
- `ItemPickup` - Picking up items
- `OpenContainer` - Opening containers

### Network Events
- `RecvMessage` - Receiving chat messages
- `SendMessage` - Sending chat messages
- `RecvPacket` - Receiving network packets
- `SendPacket` - Sending network packets

### World Events
- `Sound` - Game sounds
- `Tick` - Game ticks
- `ChunkLoad` - Chunks loading
- `BlockUpdate` - Block changes

## Important Notes

1. **Runtime Retention:** The annotation is retained at runtime so it can be accessed by the JsMacros event system through reflection.

2. **Type Target Only:** This annotation can only be applied to types (classes), not methods or fields.

3. **Required Value:** The `value` element is required and must be unique across all events in the system.

4. **Inheritance Requirement:** Event classes should extend `BaseEvent` to inherit essential event functionality.

5. **Filter Implementation:** Custom filterers must implement the `EventFilterer` interface.

## Related Classes

- **BaseEvent**: The base class that all event classes should extend
- **EventFilterer**: Interface for creating event filters
- **BaseProfile**: Manages event triggering and script execution
- **BaseEventRegistry**: Registers and manages all available events
- **FiltererRecvPacket**: Example filterer for packet events
- **FiltererSendPacket**: Example filterer for packet sending events
- **FiltererBlockUpdate**: Example filterer for block update events

## Version History

- **1.0.0:** Initial release with basic event annotation
- **1.2.7:** Added support for event filtering and joinable events
- **1.6.0:** Enhanced filterer system with compound filters
- **1.8.0:** Improved backward compatibility with oldName support
- **1.9.1:** Added EventFilterer.Compound interface for complex filtering
- **Current:** Enhanced with comprehensive metadata support and improved integration