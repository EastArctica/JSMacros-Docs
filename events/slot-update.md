# SlotUpdate Event

This event is fired when an inventory slot is updated. Backed by class `EventSlotUpdate`.

## Signature
```js
JsMacros.on("SlotUpdate", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field    | Type               | Description                              |
| -------- | ------------------ | ---------------------------------------- |
| type     | string             | The type of slot update                  |
| slot     | int                | The slot number that was updated         |
| oldStack | ItemStackHelper    | The previous item stack in the slot      |
| newStack | ItemStackHelper    | The new item stack in the slot           |

## Behavior

* Fires when any inventory slot changes
- The `type` field indicates the update category
- The `slot` field contains the updated slot number
- The `oldStack` and `newStack` fields show before/after states
- Not cancellable
- Useful for inventory tracking and automation

## Minimal example

```js
JsMacros.on("SlotUpdate", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Slot ${e.slot} updated: ${e.type}`);
});
```

## Async example

```js
JsMacros.on("SlotUpdate", JavaWrapper.methodToJavaAsync((e) => {
  const slot = e.slot;
  const updateType = e.type;
  const oldItem = e.oldStack;
  const newItem = e.newStack;

  Chat.log(`&dSlot Update: &f${updateType} &7slot ${slot}`);

  // Get item names
  const oldItemName = oldItem && !oldItem.isEmpty() ? oldItem.getName().getString() : "Empty";
  const newItemName = newItem && !newItem.isEmpty() ? newItem.getName().getString() : "Empty";

  // Show what changed
  if (oldItemName !== newItemName) {
    Chat.log(`&7Changed: ${oldItemName} → ${newItemName}`);
  }

  // Handle different update types
  switch(updateType) {
    case 'HELD':
      handleHeldSlotUpdate(slot, oldItem, newItem);
      break;
    case 'INVENTORY':
      handleInventorySlotUpdate(slot, oldItem, newItem);
      break;
    case 'SCREEN':
      handleScreenSlotUpdate(slot, oldItem, newItem);
      break;
  }

  // Check for valuable item changes
  if (isValuableItem(newItemName) && !isValuableItem(oldItemName)) {
    Chat.log(`&aValuable item acquired: ${newItemName}`);
    Chat.actionbar(`&a+${newItemName}`);
  }

  // Check for valuable item losses
  if (isValuableItem(oldItemName) && !isValuableItem(newItemName)) {
    Chat.log(`&cValuable item used/lost: ${oldItemName}`);
    Chat.actionbar(`&c-${oldItemName}`);
  }

  // Hotbar changes
  if (slot >= 0 && slot <= 8) {
    Chat.log(`&eHotbar slot ${slot}: ${newItemName}`);
  }
}));

function handleHeldSlotUpdate(slot, oldItem, newItem) {
  Chat.log(`&6Held slot ${slot} changed`);

  if (newItem && !newItem.isEmpty()) {
    const item = newItem.getName().getString();
    const enchantments = newItem.getEnchantments();

    Chat.log(`&eNow holding: ${item}`);

    if (enchantments.length > 0) {
      Chat.log(`&dEnchantments: ${enchantments.length}`);
    }

    // Check durability
    if (newItem.getMaxDamage() > 0) {
      const damage = newItem.getDamage();
      const maxDamage = newItem.getMaxDamage();
      const durability = ((maxDamage - damage) / maxDamage) * 100;

      if (durability <= 20) {
        Chat.log(`&cWarning: ${item} is almost broken! (${durability.toFixed(0)}%)`);
      }
    }
  }
}

function handleInventorySlotUpdate(slot, oldItem, newItem) {
  Chat.log(`&7Inventory slot ${slot} updated`);

  // Armor slots
  if (slot >= 100 && slot <= 103) {
    const armorSlots = {100: "Boots", 101: "Leggings", 102: "Chestplate", 103: "Helmet"};
    const armorType = armorSlots[slot];

    Chat.log(`&bArmor updated: ${armorType}`);

    if (newItem && !newItem.isEmpty()) {
      const armor = newItem.getName().getString();
      Chat.log(`&7Equipped: ${armor}`);

      // Check armor durability
      if (newItem.getMaxDamage() > 0) {
        const durability = ((newItem.getMaxDamage() - newItem.getDamage()) / newItem.getMaxDamage()) * 100;
        if (durability <= 25) {
          Chat.log(`&cWarning: ${armorType} is damaged! (${durability.toFixed(0)}%)`);
        }
      }
    }
  }

  // Crafting grid (player inventory)
  if (slot >= 1 && slot <= 4) {
    Chat.log(`&dCrafting slot ${slot} updated`);
  }

  // Hotbar
  if (slot >= 36 && slot <= 44) {
    const hotbarSlot = slot - 36;
    Chat.log(`&eHotbar slot ${hotbarSlot} (inventory) updated`);
  }
}

function handleScreenSlotUpdate(slot, oldItem, newItem) {
  Chat.log(`&aScreen slot ${slot} updated`);

  // Could be chest, furnace, crafting table, etc.
  const inventory = e.getInventory();
  const screenName = inventory.getClassName();

  if (screenName.includes("Chest")) {
    handleChestSlotUpdate(slot, oldItem, newItem);
  } else if (screenName.includes("Furnace")) {
    handleFurnaceSlotUpdate(slot, oldItem, newItem);
  } else if (screenName.includes("Crafting")) {
    handleCraftingSlotUpdate(slot, oldItem, newItem);
  }
}

function handleChestSlotUpdate(slot, oldItem, newItem) {
  Chat.log(`&6Chest slot ${slot} updated`);

  if (newItem && !newItem.isEmpty()) {
    const item = newItem.getName().getString();
    const count = newItem.getCount();
    Chat.log(`&7Added: ${item} (x${count})`);
  }
}

function handleFurnaceSlotUpdate(slot, oldItem, newItem) {
  const furnaceSlots = {0: "Input", 1: "Fuel", 2: "Output"};
  const slotType = furnaceSlots[slot] || `Unknown(${slot})`;

  Chat.log(`&eFurnace ${slotType} updated`);

  if (slot === 2 && newItem && !newItem.isEmpty()) {
    Chat.log(`&aSmelting complete: ${newItem.getName().getString()}`);
  }
}

function handleCraftingSlotUpdate(slot, oldItem, newItem) {
  if (slot === 0 && newItem && !newItem.isEmpty()) {
    Chat.log(`&dCrafting result: ${newItem.getName().getString()}`);
  }
}

function isValuableItem(itemName) {
  if (!itemName || itemName === "Empty") return false;

  const valuableItems = [
    "diamond", "netherite", "elytra", "totem", "enchanted",
    "golden_apple", "notch_apple", "dragon", "beacon",
    "shulker_box", "end_crystal", "heart_of_the_sea",
    "nether_star", "dragon_egg"
  ];

  return valuableItems.some(val => itemName.toLowerCase().includes(val));
}
```

## Fields
- [event.type](#eventtype)
- [event.slot](#eventslot)
- [event.oldStack](#eventoldstack)
- [event.newStack](#eventnewstack)

## Methods
- [event.getInventory()](#eventgetinventory)
- [event.toString()](#eventtostring)

### event.type
The type of slot update.

**Type:** `string`

**Notes**
Possible values:
- `'HELD'` - Currently held item slot
- `'INVENTORY'` - Player inventory slots
- `'SCREEN'` - Container screen slots (chests, furnaces, etc.)

### event.slot
The slot number that was updated.

**Type:** `int`

**Notes**
Slot numbers vary by context:
- Hotbar: 0-8
- Main inventory: 9-35
- Armor: 100-103 (helmet, chestplate, leggings, boots)
- Offhand: 40
- Container slots depend on container type

### event.oldStack
The previous item stack in the slot.

**Type:** `ItemStackHelper`

**Notes**
This represents what was in the slot before the update. Can be empty if the slot was previously empty.

### event.newStack
The new item stack in the slot.

**Type:** `ItemStackHelper`

**Notes**
This represents what is now in the slot after the update. Can be empty if the slot is now empty.

### event.getInventory()
Returns the inventory associated with this slot update.

**Params**
* `(none)`

**Returns**
* `Inventory<?>` - The inventory helper object

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`