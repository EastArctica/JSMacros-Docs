# BlockUpdate Event

This event is fired when a block in the world is updated. Backed by class `EventBlockUpdate`.

## Signature
```js
JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field      | Type          | Description                              |
| ---------- | ------------- | ---------------------------------------- |
| block      | BlockDataHelper | The block data helper for the updated block |
| updateType | string        | The type of update that occurred         |

## Behavior

* Fires when a block in the world changes state or its block entity updates
* The `updateType` field indicates whether it's a block state change or entity update
* Can be filtered using `FiltererBlockUpdate` to target specific blocks or update types
* Not cancellable

## Minimal example

```js
JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((e) => {
  const blockName = e.block.getBlockState().getBlock().getTranslationKey();
  Chat.log(`Block updated: ${blockName} at ${e.block.getPos().toString()}, type: ${e.updateType}`);
}));
```

## Async example

```js
JsMacros.on("BlockUpdate", JavaWrapper.methodToJavaAsync((e) => {
  const pos = e.block.getPos();
  const block = e.block.getBlockState().getBlock().getTranslationKey();
  const updateType = e.updateType;

  Chat.log(`&eBlock Update: &f${block}`);
  Chat.log(`&7Position: &f${pos.x}, ${pos.y}, ${pos.z}`);
  Chat.log(`&7Type: &f${updateType}`);

  if (updateType === "STATE") {
    Chat.actionbar("&aBlock state changed!");
  } else if (updateType === "ENTITY") {
    Chat.actionbar("&bBlock entity updated!");
  }
}));
```

## Fields
- [event.block](#eventblock)
- [event.updateType](#eventupdatetype)

## Methods
- [event.toString()](#eventtostring)

### event.block
A helper object containing information about the updated block.

**Type:** `BlockDataHelper`

**Notes**
This includes the block state, block entity (if present), and position information. You can access the block's properties, position, and other data through this helper.

### event.updateType
The type of update that occurred for the block.

**Type:** `string`

**Notes**
Possible values:
- `'STATE'` - The block state changed (block type or properties)
- `'ENTITY'` - The block entity data changed (like chest contents, sign text, etc.)

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`