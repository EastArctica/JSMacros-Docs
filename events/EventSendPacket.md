# SendPacket Event

This event is fired when a packet is about to be sent to the server. Backed by class `EventSendPacket`.

## Signature
```js
JsMacros.on("SendPacket", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| packet | Packet  | The packet object to be sent             |

## Behavior

* Fires when any packet is about to be sent to the server
- The `packet` field contains the packet data
- This event is cancellable - preventing the packet from being sent
- Advanced event for network-level monitoring
- Use with caution as this fires very frequently

## Example

```js
JsMacros.on("SendPacket", JavaWrapper.methodToJavaAsync((e) => {
  const packetId = e.packet.getId();

  // Only monitor certain packet types
  if (shouldMonitorPacket(packetId)) {
    Chat.log(`&dPacket sending: ${packetId}`);

    // Example: Block certain packets
    if (packetId === 'SWING_HAND' && shouldBlockSwing()) {
      e.cancel();
      Chat.log(`&cBlocked swing packet`);
    }
  }
}));

function shouldMonitorPacket(packetId) {
  const monitorThesePackets = [
    'CHAT',
    'USE_ENTITY',
    'PLAYER_MOVE',
    'BLOCK_BREAK'
  ];

  return monitorThesePackets.includes(packetId);
}

function shouldBlockSwing() {
  // Define conditions when to block swing packets
  return false; // Always allow for now
}
```

## Fields
- [event.packet](#eventpacket)

## Methods
- [event.toString()](#eventtostring)

### event.packet
The packet object to be sent to the server.

**Type:** `Packet`

**Notes**
This contains the raw packet data and methods to access packet information. Packet structure varies by packet type.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`