# ChunkUnload Event

This event is fired when a chunk is unloaded from the world. Backed by class `EventChunkUnload`.

## Signature
```js
JsMacros.on("ChunkUnload", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                                |
| ------ | ------- | ------------------------------------------ |
| x      | int     | The X coordinate of the unloaded chunk     |
| z      | int     | The Z coordinate of the unloaded chunk     |

## Behavior

* Fires when a chunk is unloaded by the client
* Occurs when chunks are outside the render distance or server unloads them
* Chunk coordinates are in chunk units (not block coordinates)
* Not cancellable

## Minimal example

```js
JsMacros.on("ChunkUnload", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Chunk unloaded at (${e.x}, ${e.z})`);
});
```

## Async example

```js
JsMacros.on("ChunkUnload", JavaWrapper.methodToJavaAsync((e) => {
  const chunkX = e.x;
  const chunkZ = e.z;

  // Convert chunk coordinates to block coordinates
  const blockX = chunkX * 16;
  const blockZ = chunkZ * 16;

  Chat.actionbar(`&cChunk unloaded&7: &f[${chunkX}, ${chunkZ}]`);
  Chat.log(`&7Chunk unloaded at block coordinates: ${blockX}, ${blockZ}`);

  // You might want to clean up data related to this chunk
  const world = World.getWorld();
  const loadedChunks = world.getLoadedChunks();
  Chat.log(`&7Remaining loaded chunks: &f${loadedChunks.length}`);

  // Example: Clear any stored data for this chunk
  // clearChunkData(chunkX, chunkZ);
}));
```

## Fields
- [event.x](#eventx)
- [event.z](#eventz)

## Methods
- [event.toString()](#eventtostring)

### event.x
The X coordinate of the unloaded chunk.

**Type:** `int`

**Notes**
This is in chunk coordinates, not block coordinates. To convert to block coordinates, multiply by 16.

### event.z
The Z coordinate of the unloaded chunk.

**Type:** `int`

**Notes**
This is in chunk coordinates, not block coordinates. To convert to block coordinates, multiply by 16.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`