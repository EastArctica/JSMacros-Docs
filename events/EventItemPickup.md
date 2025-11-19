# ItemPickup Event

This event is fired when the player picks up an item from the ground. Backed by class `EventItemPickup`.

## Signature
```js
JsMacros.on("ItemPickup", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field | Type               | Description                              |
| ----- | ------------------ | ---------------------------------------- |
| item  | ItemStackHelper    | The item that was picked up              |

## Behavior

* Fires when the player picks up items from the ground
* Includes items dropped by players, mobs, or blocks
- The `item` field contains the picked up item and its count
* Not cancellable
* Useful for tracking item collection and inventory management

## Minimal example

```js
JsMacros.on("ItemPickup", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Picked up ${e.item.getName()} x${e.item.getCount()}`);
});
```

## Async example

```js
JsMacros.on("ItemPickup", JavaWrapper.methodToJavaAsync((e) => {
  const item = e.item;
  const itemName = item.getName().getString();
  const itemCount = item.getCount();
  const enchantments = item.getEnchantments();

  Chat.log(`&aItem Picked Up: &f${itemName} &7(x${itemCount})`);

  // Check for valuable items
  if (isValuableItem(itemName)) {
    Chat.actionbar(`&6Valuable item obtained: &f${itemName}`);
    Chat.log(`&a&lVALUABLE ITEM: &f${itemName} &7(x${itemCount})`);
  }

  // Handle specific item categories
  if (itemName.includes("diamond")) {
    Chat.log(`&bDiamond obtained! &7(x${itemCount})`);
    Chat.actionbar(`&b💎 Diamond${itemCount > 1 ? 's' : ''} collected!`);

    // Track diamond collection
    // addDiamonds(itemCount);
  } else if (itemName.includes("emerald")) {
    Chat.log(`&aEmerald obtained! &7(x${itemCount})`);
    Chat.actionbar(`&a💚 Emerald${itemCount > 1 ? 's' : ''} collected!`);
  } else if (itemName.includes("gold")) {
    Chat.log(`&eGold obtained! &7(x${itemCount})`);
    Chat.actionbar(`&e🪙 Gold${itemCount > 1 ? 's' : ''} collected!`);
  } else if (itemName.includes("iron")) {
    Chat.log(`&7Iron obtained! &7(x${itemCount})`);
    Chat.actionbar(`&7⚙️ Iron${itemCount > 1 ? 's' : ''} collected!`);
  }

  // Check for rare items
  if (isRareItem(itemName)) {
    Chat.log(`&d&lRARE ITEM: &f${itemName} &7(x${itemCount})`);
    Chat.actionbar(`&d✨ Rare item obtained!`);
  }

  // Check for enchanted items
  if (enchantments.length > 0) {
    const enchantNames = enchantments.map(ench => ench.getName().getString()).join(", ");
    Chat.log(`&dEnchanted item: &f${itemName} &7(${enchantNames})`);
    Chat.actionbar(`&d✨ Enchanted item obtained!`);
  }

  // Handle tools and equipment
  if (item.isTool()) {
    Chat.log(`&eTool obtained: &f${itemName}`);

    // Check durability
    const damage = item.getDamage();
    const maxDamage = item.getMaxDamage();
    if (damage > 0) {
      const durabilityPercent = ((maxDamage - damage) / maxDamage) * 100;
      Chat.log(`&7Durability: &f${durabilityPercent.toFixed(0)}%`);
    }
  }

  if (item.isWeapon()) {
    Chat.log(`&cWeapon obtained: &f${itemName}`);
  }

  if (item.isArmor()) {
    Chat.log(`&bArmor obtained: &f${itemName}`);
  }

  // Handle food items
  if (item.isFood()) {
    Chat.log(`&aFood obtained: &f${itemName}`);
    Chat.actionbar(`&a🍖 Food collected!`);
  }

  // Handle mob drops
  if (isMobDrop(itemName)) {
    Chat.log(`&6Mob drop: &f${itemName}`);
  }

  // Track total items collected
  // incrementItemCollectionCounter(itemName, itemCount);
}));

function isValuableItem(itemName) {
  const valuableItems = [
    "diamond", "netherite", "elytra", "totem", "enchanted",
    "golden_apple", "notch_apple", "dragon", "beacon",
    "shulker_box", "end_crystal", "heart_of_the_sea"
  ];
  return valuableItems.some(val => itemName.toLowerCase().includes(val));
}

function isRareItem(itemName) {
  const rareItems = [
    "dragon_egg", "nether_star", "elytra", "totem",
    "golden_apple", "notch_apple", "skeleton_skull",
    "wither_skeleton_skull", "creeper_head", "zombie_head",
    "player_head", "dragon_head"
  ];
  return rareItems.some(val => itemName.toLowerCase().includes(val));
}

function isMobDrop(itemName) {
  const mobDrops = [
    "bone", "gunpowder", "string", "spider_eye", "rotten_flesh",
    "ender_pearl", "blaze_rod", "ghast_tear", "magma_cream",
    "slime_ball", "phantom_membrane", "shulker_shell"
  ];
  return mobDrops.some(val => itemName.toLowerCase().includes(val));
}
```

## Fields
- [event.item](#eventitem)

## Methods
- [event.toString()](#eventtostring)

### event.item
A helper object for the item that was picked up.

**Type:** `ItemStackHelper`

**Notes**
This provides access to all item properties like name, count, enchantments, damage, etc. You can check the item type, determine if it's valuable, enchanted, or belongs to specific categories.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`