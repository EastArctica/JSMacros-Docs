# RecvPacket Event

This event is fired when a packet is received from the server. Backed by class `EventRecvPacket`.

## Signature
```js
JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| packet | Packet  | The received packet object               |

## Behavior

* Fires when any packet is received from the server
- The `packet` field contains the packet data
- This event is cancellable - preventing packet processing
- Advanced event for network-level monitoring
- Use with caution as this fires very frequently

## Example

```js
JsMacros.on("RecvPacket", JavaWrapper.methodToJavaAsync((e) => {
  const packetId = e.packet.getId();

  // Only log certain packet types to avoid spam
  if (shouldLogPacket(packetId)) {
    Chat.log(`&bPacket received: ${packetId}`);
  }
}));

function shouldLogPacket(packetId) {
  const logThesePackets = [
    'CHAT',
    'TITLE',
    'BOSSBAR',
    'PLAYER_LIST',
    'GAME_EVENT'
  ];

  return logThesePackets.includes(packetId);
}
```

## Fields
- [event.packet](#eventpacket)

## Methods
- [event.toString()](#eventtostring)

### event.packet
The packet object received from the server.

**Type:** `Packet`

**Notes**
This contains the raw packet data and methods to access packet information. Packet structure varies by packet type.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`