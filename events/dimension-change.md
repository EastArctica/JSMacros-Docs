# DimensionChange Event

This event is fired when the player changes dimensions (e.g., from overworld to nether). Backed by class `EventDimensionChange`.

## Signature
```js
JsMacros.on("DimensionChange", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field      | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| dimension  | string  | The ID of the new dimension              |
| from       | string  | The ID of the previous dimension         |

## Behavior

* Fires when the player travels between different dimensions
* Common dimension transitions include Overworld ↔ Nether, Overworld ↔ End
* The `dimension` field contains the new dimension the player is entering
* The `from` field contains the dimension the player is leaving
* Not cancellable

## Minimal example

```js
JsMacros.on("DimensionChange", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Dimension changed from ${e.from} to ${e.dimension}`);
});
```

## Async example

```js
JsMacros.on("DimensionChange", JavaWrapper.methodToJavaAsync((e) => {
  const fromDim = e.from;
  const toDim = e.dimension;

  Chat.log(`&6Dimension Travel: &7${fromDim} &f→ &a${toDim}`);

  // Different responses for different dimension transitions
  if (fromDim === "minecraft:overworld" && toDim === "minecraft:the_nether") {
    Chat.actionbar("&cEntering the Nether! Be careful!");
    Chat.log("&eWarning: Nether is a dangerous place!");
  } else if (fromDim === "minecraft:the_nether" && toDim === "minecraft:overworld") {
    Chat.actionbar("&aBack to the Overworld!");
    Chat.log("&eWelcome back to safety!");
  } else if (toDim === "minecraft:the_end") {
    Chat.actionbar("&5Entering the End realm...");
    Chat.log("&eThe final dimension awaits!");
  }

  // Log coordinates if available (might be delayed)
  Time.sleep(2000); // Wait for player to fully load

  const player = Player.getPlayer();
  if (player) {
    const pos = player.getPos();
    Chat.log(`&7Arrived at coordinates: &f${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
  }

  // You could adjust settings based on dimension
  if (toDim.includes("nether")) {
    // Enable hostile mob warnings in nether
    Chat.log("&eHostile mob detection enabled for Nether.");
  }
}));
```

## Fields
- [event.dimension](#eventdimension)
- [event.from](#eventfrom)

## Methods
- [event.toString()](#eventtostring)

### event.dimension
The ID of the dimension the player is entering.

**Type:** `string`

**Notes**
Common dimension IDs include:
- `'minecraft:overworld'` - The main overworld
- `'minecraft:the_nether'` - The Nether dimension
- `'minecraft:the_end'` - The End dimension

Custom dimensions from mods will have their own namespace-based IDs.

### event.from
The ID of the dimension the player is leaving.

**Type:** `string`

**Notes**
This represents the previous dimension the player was in before the transition. Uses the same format as `dimension`.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`