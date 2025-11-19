# InteractBlock Event

This event is fired when the player interacts with a block. Backed by class `EventInteractBlock`.

## Signature
```js
JsMacros.on("InteractBlock", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type             | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| block  | BlockDataHelper  | The block that was interacted with       |
| face   | string           | The face of the block that was clicked   |

## Behavior

* Fires when the player right-clicks on a block
* The `block` field contains information about the clicked block
* The `face` field indicates which side of the block was clicked
- Occurs for opening containers, using levers, pressing buttons, etc.
* This event is cancellable - preventing the interaction

## Minimal example

```js
JsMacros.on("InteractBlock", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Interacted with ${e.block.getBlockState().getBlock().getTranslationKey()} on face ${e.face}`);
});
```

## Async example

```js
JsMacros.on("InteractBlock", JavaWrapper.methodToJavaAsync((e) => {
  const block = e.block;
  const face = e.face;
  const blockName = block.getBlockState().getBlock().getTranslationKey();
  const pos = block.getPos();

  Chat.log(`&6Block Interaction: &f${blockName}`);
  Chat.log(`&7Position: &f[${pos.x}, ${pos.y}, ${pos.z}]`);
  Chat.log(`&7Face: &f${face}`);

  // Handle different block types
  if (blockName.includes("chest")) {
    Chat.actionbar("&eOpening chest...");
    // logChestAccess(pos);
  } else if (blockName.includes("door") || blockName.includes("gate")) {
    Chat.actionbar("&7Opening door/gate");
  } else if (blockName.includes("lever")) {
    Chat.actionbar("&7Flipping lever");
  } else if (blockName.includes("button")) {
    Chat.actionBar("&7Pressing button");
  } else if (blockName.includes("crafting_table")) {
    Chat.actionbar("&eOpening crafting table");
  } else if (blockName.includes("furnace") || blockName.includes("smoker") || blockName.includes("blast_furnace")) {
    Chat.actionbar("&eOpening furnace");
  } else if (blockName.includes("bed")) {
    Chat.actionbar("&eGetting in bed");
    // warn if sleeping in dangerous area
    const time = World.getTime();
    if (time < 12500 || time > 23500) {
      Chat.log("&eWarning: Trying to sleep during the day!");
    }
  } else if (blockName.includes("anvil")) {
    Chat.actionbar("&6Opening anvil");
  } else if (blockName.includes("enchanting_table")) {
    Chat.actionbar("&dOpening enchantment table");
  } else if (blockName.includes("brewing_stand")) {
    Chat.actionbar("&bOpening brewing stand");
  } else if (blockName.includes("beacon")) {
    Chat.actionbar("&eOpening beacon interface");
  } else if (blockName.includes("hopper") || blockName.includes("dispenser") || blockName.includes("dropper")) {
    Chat.actionbar("&eOpening container");
  } else if (blockName.includes("sign")) {
    Chat.actionbar("&7Reading sign");
  } else if (blockName.includes("cake")) {
    Chat.actionbar("&aEating cake slice!");
  } else if (blockName.includes("note_block")) {
    Chat.actionbar("&dPlaying note block");
  } else if (blockName.includes("jukebox")) {
    Chat.actionbar("&dInteracting with jukebox");
  }

  // Log face interaction for building purposes
  const faceEmoji = {
    "down": "⬇",
    "up": "⬆",
    "north": "➡",
    "south": "⬅",
    "west": "⬇",
    "east": "⬆"
  };
  Chat.log(`&7Clicked face: &f${faceEmoji[face] || face}`);

  // Prevent interaction with certain blocks in specific areas
  if (isProtectedBlock(blockName, pos)) {
    e.cancel();
    Chat.actionbar("&cThis block is protected!");
    Chat.log(`&cPrevented interaction with protected block: ${blockName}`);
  }
}));

function isProtectedBlock(blockName, pos) {
  // Example protection logic
  const protectedAreas = [
    // Define protected coordinates
  ];

  const protectedBlocks = [
    "chest", "shulker_box", "ender_chest"
  ];

  return protectedBlocks.some(block => blockName.includes(block)) &&
         protectedAreas.some(area =>
           pos.x >= area.minX && pos.x <= area.maxX &&
           pos.y >= area.minY && pos.y <= area.maxY &&
           pos.z >= area.minZ && pos.z <= area.maxZ
         );
}
```

## Fields
- [event.block](#eventblock)
- [event.face](#eventface)

## Methods
- [event.toString()](#eventtostring)

### event.block
A helper object containing information about the interacted block.

**Type:** `BlockDataHelper`

**Notes**
This includes the block state, position, and other block information. You can access the block's type, properties, and location through this helper.

### event.face
The face of the block that was clicked.

**Type:** `string`

**Notes**
Possible values:
- `'down'` - Bottom face
- `'up'` - Top face
- `'north'` - North face (negative Z)
- `'south'` - South face (positive Z)
- `'west'` - West face (negative X)
- `'east'` - East face (positive X)

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`