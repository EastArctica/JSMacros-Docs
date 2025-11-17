# ChunkLoad Event

This event is fired when a chunk is loaded into the world. Backed by class `EventChunkLoad`.

## Signature
```js
JsMacros.on("ChunkLoad", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| x      | int     | The X coordinate of the loaded chunk     |
| z      | int     | The Z coordinate of the loaded chunk     |
| isFull | boolean | Whether this is a full chunk load        |

## Behavior

* Fires when a chunk is loaded by the client
* Chunk coordinates are in chunk units (not block coordinates)
* The `isFull` field indicates if this is a complete chunk load
* Not cancellable

## Minimal example

```js
JsMacros.on("ChunkLoad", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Chunk loaded at (${e.x}, ${e.z}), full: ${e.isFull}`);
});
```

## Async example

```js
JsMacros.on("ChunkLoad", JavaWrapper.methodToJavaAsync((e) => {
  const chunkX = e.x;
  const chunkZ = e.z;
  const isFull = e.isFull;

  // Convert chunk coordinates to block coordinates
  const blockX = chunkX * 16;
  const blockZ = chunkZ * 16;

  const loadType = isFull ? "Full" : "Partial";
  Chat.actionbar(`&eChunk ${loadType}&7: &f[${chunkX}, ${chunkZ}]`);

  if (isFull) {
    Chat.log(`&aFull chunk loaded at block coordinates: ${blockX}, ${blockZ}`);
  }

  // You could use this for tracking world exploration or optimizing operations
  const world = World.getWorld();
  const loadedChunks = world.getLoadedChunks();
  Chat.log(`&7Total loaded chunks: &f${loadedChunks.length}`);
}));
```

## Fields
- [event.x](#eventx)
- [event.z](#eventz)
- [event.isFull](#eventisfull)

## Methods
- [event.toString()](#eventtostring)

### event.x
The X coordinate of the loaded chunk.

**Type:** `int`

**Notes**
This is in chunk coordinates, not block coordinates. To convert to block coordinates, multiply by 16.

### event.z
The Z coordinate of the loaded chunk.

**Type:** `int`

**Notes**
This is in chunk coordinates, not block coordinates. To convert to block coordinates, multiply by 16.

### event.isFull
Indicates whether this is a full chunk load.

**Type:** `boolean`

**Notes**
- `true` - The entire chunk was loaded
- `false` - This was a partial or incremental chunk load

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`