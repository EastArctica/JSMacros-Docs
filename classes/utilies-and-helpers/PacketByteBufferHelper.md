# PacketByteBufferHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.PacketByteBufferHelper`

**Extends:** `BaseHelper<PacketByteBuf>`

**Since:** JsMacros 1.8.4

The `PacketByteBufferHelper` class is a utility wrapper around Minecraft's `PacketByteBuf` that provides methods for reading and writing various data types to and from packet buffers. This class is essential for working with network packets, custom payload data, and binary data operations in JSMacros. It supports packet creation, manipulation, sending, and receiving with a comprehensive set of serialization methods.

## Overview

Packet buffers are the fundamental data structure used in Minecraft's networking system for transmitting information between the client and server. The `PacketByteBufferHelper` provides a JavaScript-friendly interface to:

- Create and manipulate packet buffers
- Read and write primitive data types (bytes, ints, strings, etc.)
- Serialize complex Minecraft objects (positions, items, entities)
- Work with collections and maps
- Convert buffers to actual packet objects
- Send custom packets to the server
- Receive and process incoming packets

## Constructors

### new PacketByteBufferHelper()
```js
const buffer = new PacketByteBufferHelper();
```

Creates a new empty packet buffer with no underlying packet object.

**Example:**
```js
// Create a new empty buffer for custom data
const buffer = new PacketByteBufferHelper();
buffer.writeString("Hello, Server!");
buffer.writeInt(42);
```

### new PacketByteBufferHelper(PacketByteBuf base)
```js
const buffer = new PacketByteBufferHelper(existingBuffer);
```

Creates a helper wrapper around an existing `PacketByteBuf` object.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| base | PacketByteBuf | The existing packet buffer to wrap |

### new PacketByteBufferHelper(Packet<?> packet)
```js
const buffer = new PacketByteBufferHelper(packet);
```

Creates a packet buffer from an existing Minecraft packet, automatically serializing the packet data into the buffer.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| packet | Packet<?> | The packet to serialize into the buffer |

**Example:**
```js
// Create a buffer from an existing packet
const packet = event.getPacket();
const buffer = new PacketByteBufferHelper(packet);
// Now you can read the packet's data
const packetType = buffer.readString();
```

## Fields

### base (protected)
The underlying `PacketByteBuf` object that this helper wraps.

**Type:** `PacketByteBuf`

**Note:** This field is protected and typically accessed through the helper methods rather than directly.

### packet (readonly)
The original packet object if this buffer was created from a packet, otherwise `null`.

**Type:** `Packet<?> | null`

**Example:**
```js
if (buffer.packet !== null) {
    Chat.log(`Buffer created from packet: ${buffer.packet.getClass().getSimpleName()}`);
}
```

## Static Fields

### BUFFER_TO_PACKET (static)
A mapping of packet classes to functions that can create packets from buffer data.

**Type:** `Map<Class<? extends Packet<?>>, Function<PacketByteBuf, ? extends Packet<?>>>`

### PACKET_IDS (static)
A mapping of packet classes to their network IDs.

**Type:** `Object2IntMap<Class<? extends Packet<?>>>`

### PACKET_NAMES (static)
A mapping of packet class names to their corresponding classes for easy lookup.

**Type:** `Map<String, Class<? extends Packet<?>>>`

## Methods

### Packet Conversion Methods

### Packet Information Methods

### Packet Network Methods

### Buffer Management Methods

### Primitive Data Type Methods

### Minecraft Object Methods

### Collection Methods

### Array Methods

### Optional and Nullable Methods

### Specialized Data Methods

## Usage Examples

### Basic Buffer Operations
```js
// Create a new buffer
const buffer = new PacketByteBufferHelper();

// Write some basic data
buffer.writeString("Player Data");
buffer.writeInt(42);
buffer.writeDouble(3.14159);
buffer.writeBoolean(true);

// Reset to start and read back
buffer.reset();
const text = buffer.readString();
const number = buffer.readInt();
const pi = buffer.readDouble();
const flag = buffer.readBoolean();

Chat.log(`Read: ${text}, ${number}, ${pi}, ${flag}`);
```

### Working with Collections
```js
const buffer = new PacketByteBufferHelper();

// Write a list of strings
const names = ["Alice", "Bob", "Charlie"];
buffer.writeCollection(names, (buf, name) => buf.writeString(name));

// Write a map
const playerStats = { "kills": 10, "deaths": 3, "score": 1500 };
buffer.writeMap(playerStats,
    (buf, key) => buf.writeString(key),
    (buf, value) => buf.writeInt(value)
);

// Reset and read back
buffer.reset();
const readNames = buffer.readList((buf) => buf.readString());
const readStats = buffer.readMap(
    (buf) => buf.readString(),
    (buf) => buf.readInt()
);

Chat.log(`Names: ${readNames.join(", ")}`);
Chat.log(`Stats: ${JSON.stringify(readStats)}`);
```

### Working with Minecraft Objects
```js
const buffer = new PacketByteBufferHelper();

// Write position data
buffer.writeBlockPos(100, 64, 200);
buffer.writeUuid("550e8400-e29b-41d4-a716-446655440000");
buffer.writeIdentifier("minecraft:stone");

// Write optional data
buffer.writeOptional("optional data", (buf, data) => buf.writeString(data));
buffer.writeNullable(null, (buf, data) => buf.writeString(data));

// Read back
buffer.reset();
const pos = buffer.readBlockPos();
const uuid = buffer.readUuid();
const id = buffer.readIdentifier();
const optional = buffer.readOptional((buf) => buf.readString());
const nullable = buffer.readNullable((buf) => buf.readString());

Chat.log(`Position: ${pos.x}, ${pos.y}, ${pos.z}`);
Chat.log(`UUID: ${uuid}`);
Chat.log(`Identifier: ${id}`);
Chat.log(`Optional present: ${optional.isPresent()}`);
Chat.log(`Nullable is null: ${nullable === null}`);
```

### Creating Custom Packets
```js
// Create a custom packet buffer
const buffer = new PacketByteBufferHelper();

// Write custom payload data
buffer.writeString("custom_plugin_message");
buffer.writeInt(12345);
buffer.writeString("Hello from client!");

// Send as custom payload packet
buffer.sendPacket("CustomPayloadC2SPacket");
```

### Analyzing Incoming Packets
```js
JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((event) => {
    const packet = event.getPacket();
    const buffer = new PacketByteBufferHelper(packet);

    // Get packet information
    const packetName = packet.getClass().getSimpleName();
    const packetId = buffer.getPacketId(packet.getClass());
    const isClientbound = buffer.isClientbound(packet.getClass());

    Chat.log(`Packet: ${packetName} (ID: ${packetId}, Clientbound: ${isClientbound})`);

    // Try to read some basic data (this is packet-specific)
    try {
        buffer.reset();
        // This depends on the specific packet type
        // const firstString = buffer.readString(100);
        // Chat.log(`First string: ${firstString}`);
    } catch (e) {
        // Chat.log(`Could not read packet data: ${e}`);
    }
}));
```

## Important Notes

### Buffer Position Management
- The buffer has separate read and write positions
- Use `reset()` to return to the original state
- Use `setReaderIndex()` and `setWriterIndex()` for manual position control
- Always reset or reposition before switching between reading and writing

### Packet Creation Limitations
- Not all packet types can be created from buffers
- Some packets require specific initialization or validation
- Use `getPacketNames()` to see available packet types
- Packet names are subject to change between Minecraft versions

### Error Handling
- Reading beyond buffer bounds throws exceptions
- Type mismatches can cause deserialization errors
- Always validate data when possible
- Use try-catch blocks when dealing with unknown packet formats

### Performance Considerations
- Buffer operations are generally fast but not free
- Large buffers can consume significant memory
- Consider buffer size when working with packet data
- Reset buffers rather than creating new ones when possible

## Version History

- **1.8.4:** Initial implementation with comprehensive buffer operations
- **1.9.1:** Added improved hit result handling and deprecations
- **Current:** Stable implementation with full Minecraft networking support

The `PacketByteBufferHelper` is an essential tool for advanced JSMacros scripts that need to work with network packets, custom communication protocols, or binary data serialization. It provides a powerful and flexible interface for all packet buffer operations in JSMacros.