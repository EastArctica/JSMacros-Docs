# EventFilterer

The `EventFilterer` is a fundamental interface in JSMacros that provides sophisticated event filtering capabilities. It allows you to control which events trigger your event listeners based on specific criteria, reducing unnecessary script execution and improving performance.

## Overview

Event filters are essential when working with frequently triggered events like packet events or block updates. Instead of processing every single event, you can specify conditions that must be met before your script logic executes.

## Creating Event Filters

### Basic Filter Creation

```javascript
// Create a filterer for a specific event type
const packetFilterer = JsMacros.createEventFilterer("SendPacket");
const blockFilterer = JsMacros.createEventFilterer("BlockUpdate");
```

### Available Filter Types

Different event types have specialized filterers:

| Event Type | Filterer Class | Purpose |
|------------|----------------|---------|
| `SendPacket` | `FiltererSendPacket` | Filter outgoing network packets |
| `RecvPacket` | `FiltererRecvPacket` | Filter incoming network packets |
| `BlockUpdate` | `FiltererBlockUpdate` | Filter block change events |

## Core Interface Methods

### `canFilter(event)`

Returns whether this filterer can handle the specified event type.

**Parameters:**
- `event` (String): The event name to check

**Returns:**
- `boolean`: `true` if the filterer can handle this event type

### `test(event)`

Tests whether an event passes the filter criteria.

**Parameters:**
- `event` (BaseEvent): The event to test

**Returns:**
- `boolean`: `true` if the event should be processed, `false` if it should be filtered out

## Specialized Filterers

### FiltererSendPacket

Filters outgoing packet events based on packet type.

```javascript
// Create filter for chat messages
const chatFilter = JsMacros.createEventFilterer("SendPacket");
chatFilter.setType("ChatMessage");

JsMacros.on("SendPacket", chatFilter, (event) => {
    console.log("Sending chat message:", event.message);
});
```

**Properties:**
- `type` (String|null): The packet type to filter, or `null` for all packets

**Methods:**
- `setType(type)`: Set the packet type to filter
  - `type` (String|null): Packet name or `null` for all packets
  - Returns: `FiltererSendPacket` for method chaining

### FiltererRecvPacket

Filters incoming packet events based on packet type.

```javascript
// Filter for health update packets
const healthFilter = JsMacros.createEventFilterer("RecvPacket");
healthFilter.setType("HealthUpdate");

JsMacros.on("RecvPacket", healthFilter, (event) => {
    console.log("Health updated:", event.health);
});
```

**Properties:**
- `type` (String|null): The packet type to filter, or `null` for all packets

**Methods:**
- `setType(type)`: Set the packet type to filter
  - `type` (String|null): Packet name or `null` for all packets
  - Returns: `FiltererRecvPacket` for method chaining

### FiltererBlockUpdate

Filters block update events based on position, block type, update type, and block states.

```javascript
// Filter for diamond ore updates in specific area
const diamondFilter = JsMacros.createEventFilterer("BlockUpdate");
diamondFilter.setBlockId("minecraft:diamond_ore");
diamondFilter.setArea(100, 0, 100, 200, 50, 200);

JsMacros.on("BlockUpdate", diamondFilter, (event) => {
    console.log("Diamond ore found at:", event.block.getBlockPos());
});
```

**Properties:**
- `pos` (BlockPosHelper|null): Single position to filter, or start position for area
- `pos2` (BlockPosHelper|null): End position for area filtering (must be ≥ pos)
- `blockId` (String|null): Block ID to filter for
- `updateType` (String|null): Type of block update
- `blockState` (Map<String,String>|null): Block state properties to match

**Methods:**
- `setPos(x, y, z)` / `setPos(pos)`: Set a single position to filter
  - `x, y, z` (int): Coordinates
  - `pos` (BlockPosHelper): Position object
  - Returns: `FiltererBlockUpdate` for chaining

- `setArea(x1, y1, z1, x2, y2, z2)` / `setArea(pos1, pos2)`: Set a cubic area to filter
  - `pos1`, `pos2` (BlockPosHelper): Corner positions of the area
  - Returns: `FiltererBlockUpdate` for chaining

- `setBlockId(id)`: Set the block ID to filter
  - `id` (String): Block ID (e.g., "minecraft:diamond_ore")
  - Returns: `FiltererBlockUpdate` for chaining

- `setUpdateType(type)`: Set the update type to filter
  - `type` (String): Update type name
  - Returns: `FiltererBlockUpdate` for chaining

- `setBlockStates(states)`: Set multiple block state properties
  - `states` (Map<String,String>): Map of property names to values
  - Returns: `FiltererBlockUpdate` for chaining

- `setBlockState(property, value)`: Set a single block state property
  - `property` (String): Property name
  - `value` (String|null): Property value, or `null` to ensure property is absent
  - Returns: `FiltererBlockUpdate` for chaining

## Advanced Filter Operations

### Composed Filters (AND/OR Logic)

Combine multiple filters using AND/OR logic:

```javascript
// Create base filters
const chatFilter = JsMacros.createEventFilterer("SendPacket").setType("ChatMessage");
const commandFilter = JsMacros.createEventFilterer("SendPacket").setType("CommandBlock");

// Create composed filter with AND logic
const composedFilter = JsMacros.createComposedEventFilterer(chatFilter);
composedFilter.and(commandFilter); // This won't work - a packet can't be both chat and command

// Create composed filter with OR logic
const messageFilter = JsMacros.createComposedEventFilterer(chatFilter);
messageFilter.or(commandFilter); // Triggers for chat OR command packets
```

### Inverted Filters

Invert a filter to match when the original filter returns `false`:

```javascript
// Filter for packets that are NOT chat messages
const allPackets = JsMacros.createEventFilterer("SendPacket");
const chatPackets = JsMacros.createEventFilterer("SendPacket").setType("ChatMessage");
const nonChatFilter = JsMacros.invertEventFilterer(chatPackets);

JsMacros.on("SendPacket", nonChatFilter, (event) => {
    console.log("Non-chat packet:", event.type);
});
```

### Modulus Filters

Process only every nth event to reduce lag with high-frequency events:

```javascript
// Process only every 10th packet
const modFilter = JsMacros.createModulusEventFilterer(10);

JsMacros.on("SendPacket", modFilter, (event) => {
    console.log("Processing 1 in 10 packets:", event.type);
});
```

**Properties:**
- `quotient` (int): The divisor (process every nth event)
- `count` (int): Internal counter (read-only)

**Methods:**
- `setQuotient(quotient)`: Change the divisor
  - `quotient` (int): New divisor value (will be converted to positive)
  - Returns: `FiltererModulus` for chaining

## Usage Examples

### Example 1: Filter Specific Chat Commands

```javascript
// Filter for command packets containing "help"
const filterer = JsMacros.createEventFilterer("SendPacket");
filterer.setType("ChatMessage");

JsMacros.on("SendPacket", filterer, (event) => {
    if (event.message && event.message.includes("/help")) {
        console.log("Help command detected:", event.message);
    }
});
```

### Example 2: Monitor Specific Block Changes

```javascript
// Monitor any redstone-related block changes in a loaded area
const redstoneFilter = JsMacros.createEventFilterer("BlockUpdate");
redstoneFilter.setBlockId("minecraft:redstone_wire");
redstoneFilter.setArea(0, 0, 0, 100, 255, 100);
redstoneFilter.setBlockState("power", "15"); // Only maximum power

JsMacros.on("BlockUpdate", redstoneFilter, (event) => {
    console.log("Redstone activated at:", event.block.getBlockPos());
});
```

### Example 3: Complex Multi-Condition Filtering

```javascript
// Monitor both diamond and emerald ore updates
const diamondFilter = JsMacros.createEventFilterer("BlockUpdate").setBlockId("minecraft:diamond_ore");
const emeraldFilter = JsMacros.createEventFilterer("BlockUpdate").setBlockId("minecraft:emerald_ore");

const oreFilter = JsMacros.createComposedEventFilterer(diamondFilter);
oreFilter.or(emeraldFilter);

// Only check every 5th event to reduce processing
const modulatedFilter = JsMacros.createModulusEventFilterer(5);
const composedFilter = JsMacros.createComposedEventFilterer(oreFilter);
composedFilter.and(modulatedFilter);

JsMacros.on("BlockUpdate", composedFilter, (event) => {
    console.log("Valuable ore found:", event.block.getId());
});
```

### Example 4: Excluding Certain Events

```javascript
// Listen to all packets except keepalive packets
const keepaliveFilter = JsMacros.createEventFilterer("RecvPacket").setType("KeepAlive");
const allPacketsFilter = JsMacros.createEventFilterer("RecvPacket");
const nonKeepaliveFilter = JsMacros.invertEventFilterer(keepaliveFilter);

JsMacros.on("RecvPacket", nonKeepaliveFilter, (event) => {
    console.log("Interesting packet received:", event.type);
});
```

## Best Practices

1. **Use Specific Filters**: Always set specific criteria rather than filtering in your script logic
2. **Combine Filters Appropriately**: Use AND for restrictive filtering, OR for inclusive filtering
3. **Consider Performance**: Use modulus filters for very high-frequency events
4. **Chain Methods**: Take advantage of method chaining for cleaner code
5. **Null Values**: Remember that `null` in filter properties often means "don't filter on this criteria"

## Error Handling

- If you try to create a filterer for an event that doesn't support filtering, it will throw an `IllegalArgumentException`
- Composed filters will detect and prevent cyclic references
- All filterer methods validate input parameters and throw appropriate exceptions

## Compatibility

EventFilterers are available since JSMacros version 1.9.1. The specific filterer classes available depend on the event types supported by your Minecraft version and JSMacros configuration.

