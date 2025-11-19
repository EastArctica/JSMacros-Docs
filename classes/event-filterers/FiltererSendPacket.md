# FiltererSendPacket

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.event.filterer.FiltererSendPacket`

**Implements:** `EventFilterer`

**Since:** `1.9.1`

An event filterer that selectively filters `SendPacket` events based on packet type. This class allows you to create event listeners that only trigger for specific types of outgoing packets, reducing unnecessary event processing and improving performance.

Filterers are used with event listeners to control which events trigger your handler functions. The `FiltererSendPacket` specifically works with the `SendPacket` event to filter based on the packet type name.

## Constructors
- [new FiltererSendPacket()](#new-filtersendpacket)

## Fields
- [instance.type](#instancetype)

## Methods
- [instance.setType(type)](#instancesettype)

---

## Constructors

### new FiltererSendPacket()
```js
const filterer = new FiltererSendPacket();
```

Creates a new `FiltererSendPacket` instance with no type filter set. By default, this filterer will match all `SendPacket` events.

**Example:**
```js
// Create a filterer that matches all packet types
const allPacketsFilter = new FiltererSendPacket();
allPacketsFilter.setType(null); // Match all packets

// Use with event listener
JsMacros.on("SendPacket", JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`Packet detected: ${event.type}`);
}), allPacketsFilter);
```

---

## Fields

## Methods

## Usage Context

### Creating Event Listeners with Filters

The `FiltererSendPacket` is typically used as the third parameter to `JsMacros.on()` to create filtered event listeners:

```js
// Basic usage with filter
const filter = new FiltererSendPacket().setType("ChatMessageC2SPacket");

JsMacros.on("SendPacket", JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`Chat packet intercepted: ${event.type}`);
    // Access packet data via event.packet
    // Cancel with event.cancel() if needed
}), filter);
```

### Common Packet Types

While packet names vary by Minecraft version, some common types include:

- `ChatMessageC2SPacket` - Chat messages sent by player
- `PlayerMoveC2SPacket` - Player movement/position updates
- `PlayerInteractBlockC2SPacket` - Block interactions (right-click)
- `PlayerInteractItemC2SPacket` - Item interactions
- `ClientCommandC2SPacket` - Client commands (respawn, etc.)

### Debugging Packet Names

Use a filter with `setType(null)` to discover actual packet names in your Minecraft version:

```js
const debugFilter = new FiltererSendPacket().setType(null);
const packetCounts = {};

JsMacros.on("SendPacket", JavaWrapper.methodToJavaAsync((event) => {
    const packetType = event.type;
    packetCounts[packetType] = (packetCounts[packetType] || 0) + 1;

    // Log summary every 100 packets
    if (Object.values(packetCounts).reduce((a, b) => a + b, 0) % 100 === 0) {
        Chat.log(`&7Packet counts: ${JSON.stringify(packetCounts)}`);
    }
}), debugFilter);
```