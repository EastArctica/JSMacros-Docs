# EventDeath

This event is fired when the player dies. It captures the state of the player, including their position and inventory, at the moment of death. Backed by class `EventDeath`.

## Signature
```js
JsMacros.on("Death", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field     | Type                 | Description                                     |
| --------- | -------------------- | ----------------------------------------------- |
| deathPos  | BlockPosHelper       | The block position where the player died        |
| inventory | List<ItemStackHelper> | The player's full inventory at time of death    |

## Behavior

* Fires when the player dies
* Captures the exact position of death
* Includes complete inventory snapshot at time of death
* Provides respawn capability
* Not cancellable

## Minimal example

```js
JsMacros.on("Death", JavaWrapper.methodToJavaAsync((e) => {
  const pos = e.deathPos;
  Chat.log(`Died at X: ${pos.getX()}, Y: ${pos.getY()}, Z: ${pos.getZ()}`);
  e.respawn();
});
```

## Async example

```js
JsMacros.on("Death", JavaWrapper.methodToJavaAsync((e) => {
  const pos = e.deathPos;
  Chat.log(`&cYou died at X: ${pos.getX()}, Y: ${pos.getY()}, Z: ${pos.getZ()}`);

  // Find valuable items in the inventory
  const valuables = e.inventory
    .filter(item => item.getId().includes('diamond') || item.getId().includes('netherite'))
    .map(item => `${item.getCount()}x ${item.getName().getString()}`)
    .join(', ');

  if (valuables) {
    Chat.log(`&6Valuables on death: ${valuables}`);
  }

  // Respawn after a short delay (e.g., 20 ticks = 1 second)
  JsMacros.syncContext().wait(20);
  e.respawn();
  Chat.log("&aAutomatically respawned.");
}));
```

## Fields
- [event.deathPos](#eventdeathpos)
- [event.inventory](#eventinventory)

## Methods
- [event.respawn()](#eventrespawn)
- [event.toString()](#eventtostring)

### event.deathPos
A helper object representing the block position where the player died.

**Type:** `BlockPosHelper`

### event.inventory
A list of `ItemStackHelper` objects representing the player's full inventory at the time of death.

**Type:** `List<ItemStackHelper>`

### event.respawn()
Requests the player to respawn.

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
It is recommended to call this method with a slight delay (e.g., one tick) after the death event has fired to ensure the game state is ready for a respawn request.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`