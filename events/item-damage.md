# ItemDamage Event

This event is fired when an item takes damage. Backed by class `EventItemDamage`.

## Signature
```js
JsMacros.on("ItemDamage", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field | Type               | Description                              |
| ----- | ------------------ | ---------------------------------------- |
| item  | ItemStackHelper    | The item that took damage                |
| damage | int               | The amount of damage the item took       |

## Behavior

* Fires when items with durability take damage
* Common for tools, weapons, and armor
* The `damage` field indicates how much durability was lost
- Occurs from mining, attacking, taking damage, etc.
* Not cancellable

## Minimal example

```js
JsMacros.on("ItemDamage", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`${e.item.getName()} took ${e.damage} damage`);
});
```

## Async example

```js
JsMacros.on("ItemDamage", JavaWrapper.methodToJavaAsync((e) => {
  const item = e.item;
  const damageAmount = e.damage;
  const itemName = item.getName().getString();
  const currentDamage = item.getDamage();
  const maxDurability = item.getMaxDamage();
  const remainingDurability = maxDurability - currentDamage;

  Chat.log(`&6Item Damaged: &f${itemName}`);
  Chat.log(`&7Damage: &f${damageAmount} &7- Total: &f${currentDamage}/${maxDurability}`);

  // Calculate remaining percentage
  const durabilityPercent = ((maxDurability - currentDamage) / maxDurability) * 100;
  Chat.log(`&7Durability: &f${durabilityPercent.toFixed(0)}%`);

  // Alert based on remaining durability
  if (durabilityPercent <= 20) {
    Chat.actionbar(`&cWarning: ${itemName} is almost broken! (${durabilityPercent.toFixed(0)}%)`);
    Chat.log(`&4CRITICAL: ${itemName} will break soon!`);

    // Flash warning
    Chat.log(`&c&lITEM BREAKING SOON!`);
  } else if (durabilityPercent <= 50) {
    Chat.actionbar(`&e${itemName} is wearing down (${durabilityPercent.toFixed(0)}%)`);
  }

  // Handle specific item types
  if (item.isTool()) {
    Chat.log(`&eTool damage: &f${itemName} &7(-${damageAmount})`);

    // Check for valuable tools
    if (isValuableTool(itemName)) {
      Chat.log(`&cValuable tool damaged!`);
    }
  }

  if (item.isWeapon()) {
    Chat.log(`&cWeapon damage: &f${itemName} &7(-${damageAmount})`);
  }

  if (item.isArmor()) {
    Chat.log(`&cArmor damage: &f${itemName} &7(-${damageAmount})`);

    // Check armor piece
    const slot = item.getSlot();
    const armorSlot = getArmorSlotName(slot);
    Chat.log(`&7Armor slot: &f${armorSlot}`);
  }

  // Check for enchantments
  const enchantments = item.getEnchantments();
  if (enchantments.length > 0) {
    Chat.log(`&7Enchanted item damaged - check for Mending!`);
  }

  // Estimate uses remaining (approximate)
  const averageDamagePerUse = getAverageDamagePerUse(itemName);
  if (averageDamagePerUse > 0) {
    const usesRemaining = Math.floor(remainingDurability / averageDamagePerUse);
    Chat.log(`&7Estimated uses remaining: &f${usesRemaining}`);
  }
}));

function isValuableTool(itemName) {
  const valuableTools = [
    "diamond", "netherite", "elytra", "mending", "unbreaking",
    "efficiency", "fortune", "silk"
  ];
  return valuableTools.some(val => itemName.toLowerCase().includes(val));
}

function getArmorSlotName(slot) {
  const slots = {
    103: "Helmet",
    102: "Chestplate",
    101: "Leggings",
    100: "Boots"
  };
  return slots[slot] || "Unknown";
}

function getAverageDamagePerUse(itemName) {
  // Rough estimates for different tool types
  if (itemName.includes("pickaxe")) return 1;
  if (itemName.includes("axe")) return 1;
  if (itemName.includes("shovel")) return 1;
  if (itemName.includes("hoe")) return 1;
  if (itemName.includes("sword")) return 1;
  if (itemName.includes("bow")) return 1;
  if (itemName.includes("fishing")) return 1;
  if (itemName.includes("elytra")) return 1;
  if (itemName.includes("armor")) return 1;
  return 0;
}
```

## Fields
- [event.item](#eventitem)
- [event.damage](#eventdamage)

## Methods
- [event.toString()](#eventtostring)

### event.item
A helper object for the item that took damage.

**Type:** `ItemStackHelper`

**Notes**
This provides access to all item properties like name, damage, durability, enchantments, etc. You can check if it's a tool, weapon, or armor and examine its current state.

### event.damage
The amount of damage the item took.

**Type:** `int`

**Notes**
This represents the durability loss from this specific action. The total damage can be obtained from `event.item.getDamage()`.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`