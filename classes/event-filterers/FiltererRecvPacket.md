# FiltererRecvPacket

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.event.filterer.FiltererRecvPacket`
**Implements:** `EventFilterer`
**Since:** 1.9.1

The `FiltererRecvPacket` class is an event filterer designed specifically for filtering `RecvPacket` events based on packet type. This filterer allows you to create event listeners that only trigger for specific types of incoming packets from the server, providing fine-grained control over network-level event handling.

## Overview

`FiltererRecvPacket` works by examining the `type` field of `EventRecvPacket` instances and only allowing events that match the specified packet type to pass through. This is particularly useful when you want to monitor or intercept specific network packets without being overwhelmed by the high frequency of all incoming packets.

## Table of Contents

- [Constructors](#constructors)
- [Fields](#fields)
- [Methods](#methods)

## Constructors

### new FiltererRecvPacket()

Creates a new `FiltererRecvPacket` instance with no type filter (will match all packet types).

```js
// Create a filterer that matches all incoming packets
const allPacketsFilter = new FiltererRecvPacket();
```

## Fields

## Methods

## Usage Examples

### Basic Packet Filtering

```js
// Create a filterer for chat packets only
const chatFilter = new FiltererRecvPacket();
chatFilter.setType("Chat");

// Register event listener with the filter
JsMacros.on("RecvPacket", chatFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`&6Chat packet received: ${event.type}`);

    // Access the packet buffer for more detailed inspection
    const buffer = event.getPacketBuffer();
    // ... process packet data
}));
```

### Multiple Packet Type Filters

```js
// Create separate filters for different packet types
const chatFilter = new FiltererRecvPacket().setType("Chat");
const titleFilter = new FiltererRecvPacket().setType("Title");
const bossbarFilter = new FiltererRecvPacket().setType("BossBar");

// Register different handlers for each type
JsMacros.on("RecvPacket", chatFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("&7Chat packet intercepted");
}));

JsMacros.on("RecvPacket", titleFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("&dTitle packet intercepted");
}));

JsMacros.on("RecvPacket", bossbarFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("&cBossbar packet intercepted");
}));
```

### Dynamic Filter Modification

```js
// Create a configurable packet filterer
const dynamicFilter = new FiltererRecvPacket();
let currentFilterType = null;

// Function to update the filter
function setPacketFilter(packetType) {
    currentFilterType = packetType;
    dynamicFilter.setType(packetType);
    Chat.log(`&aFilter updated to: ${packetType || "ALL"}`);
}

// Register the event listener once
JsMacros.on("RecvPacket", dynamicFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`&bFiltered packet: ${event.type}`);
}));

// Example commands to change filter
Chat.registerCommand("filter", (args) => {
    if (args.length === 0) {
        setPacketFilter(null); // Show all packets
    } else {
        setPacketFilter(args[0]); // Filter specific packet type
    }
}));
```

### Packet Monitoring with Toggle

```js
// Create a toggle-able packet monitor
class PacketMonitor {
    constructor() {
        this.filterer = new FiltererRecvPacket();
        this.isActive = false;
        this.monitoredTypes = [];
    }

    addPacketType(type) {
        if (!this.monitoredTypes.includes(type)) {
            this.monitoredTypes.push(type);
        }
    }

    removePacketType(type) {
        const index = this.monitoredTypes.indexOf(type);
        if (index > -1) {
            this.monitoredTypes.splice(index, 1);
        }
    }

    start() {
        if (this.isActive) return;

        this.isActive = true;
        if (this.monitoredTypes.length === 0) {
            // Monitor all packets
            this.filterer.setType(null);
            Chat.log("&aMonitoring ALL incoming packets");
        } else {
            // Monitor specific types
            this.filterer.setType(this.monitoredTypes[0]);
            Chat.log(`&aMonitoring packets: ${this.monitoredTypes.join(", ")}`);
        }

        // Register event listener
        this.eventListener = JsMacros.on("RecvPacket", this.filterer,
            JavaWrapper.methodToJavaAsync((event) => {
                this.handlePacket(event);
            })
        );
    }

    stop() {
        if (!this.isActive) return;

        this.isActive = false;
        if (this.eventListener) {
            this.eventListener.unregister();
        }
        Chat.log("&cPacket monitoring stopped");
    }

    handlePacket(event) {
        // Simple packet logging
        const timestamp = new Date().toLocaleTimeString();
        Chat.log(`&7[${timestamp}] &bPacket: ${event.type}`);
    }
}

// Usage example
const monitor = new PacketMonitor();
monitor.addPacketType("Chat");
monitor.addPacketType("Title");
monitor.addPacketType("GameEvent");

// Start monitoring
monitor.start();

// Later, you can stop it
// monitor.stop();
```

## Common Packet Types

Here are some common packet type names you might want to filter for:

- `"Chat"` - Chat messages from server
- `"Title"` - Screen title/subtitle packets
- `"BossBar"` - Boss bar update packets
- `"PlayerList"` - Player list updates
- `"GameEvent"` - Various game events (rain, thunder, etc.)
- `"EntitySpawn"` - Entity spawn packets
- `"BlockUpdate"` - Block change notifications
- `"Inventory"` - Inventory updates
- `"HealthUpdate"` - Player health updates
- `"Experience"` - Experience/level updates

## Important Notes

1. **Performance**: Packet events fire very frequently. Always use specific filters when possible to avoid performance impact.

2. **Packet Names**: Packet type names are case-sensitive and correspond to the internal Minecraft packet identifiers.

3. **Null Filter**: When `type` is set to `null`, the filterer will match all `RecvPacket` events, which can generate a very high volume of events.

4. **Event Cancellation**: This filterer only controls which events trigger your listeners. It doesn't affect packet cancellation - use the event's `cancel()` method for that.

5. **Network Impact**: Be cautious when logging or processing packets extensively, as this can impact game performance and generate large amounts of log data.

## Related Classes

- **EventRecvPacket**: The event class that this filterer is designed to work with
- **EventFilterer**: The interface that this class implements
- **FiltererSendPacket**: Companion filterer for outgoing packets
- **PacketByteBufferHelper**: Helper class for accessing packet data