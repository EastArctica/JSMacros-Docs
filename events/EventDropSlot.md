# EventDropSlot

This event is triggered when an item is dropped from an inventory slot. Backed by class `EventDropSlot`.

## Signature
```js
JsMacros.on("DropSlot", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field | Type    | Description                              |
| ----- | ------- | ---------------------------------------- |
| slot  | int     | The slot number from which item is dropped |
| all   | boolean | Whether all items or just one is being dropped |

## Behavior

* Fires when a player drops items from an inventory slot
* The `all` field indicates if the player dropped the entire stack or just one item
* This event is cancellable - preventing the drop action
* Works with both inventory screens and hotbar drops
* Can be used to prevent accidental dropping of valuable items

## Minimal example

```js
JsMacros.on("DropSlot", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Dropped from slot ${e.slot}, all: ${e.all}`);
});
```

## Async example

```js
JsMacros.on("DropSlot", JavaWrapper.methodToJavaAsync((e) => {
  const slot = e.slot;
  const dropAll = e.all;
  const inventory = e.getInventory();
  const slotItem = inventory.getSlot(slot);

  const action = dropAll ? "dropped entire stack" : "dropped one item";
  const itemName = slotItem ? slotItem.getName().getString() : "Unknown item";

  Chat.log(`&6Item Drop: &f${itemName}`);
  Chat.log(`&7Slot: &f${slot} &7- Action: &f${action}`);

  // Prevent dropping valuable items
  if (slotItem && isValuableItem(itemName)) {
    e.cancel();
    Chat.actionbar("&cCannot drop valuable items!");
    Chat.log(`&cPrevented drop of: &f${itemName}`);
  }

  // Warn when dropping stacks
  if (dropAll && slotItem) {
    const count = slotItem.getCount();
    Chat.actionbar(`&eWarning: Dropping &f${count} &eitems!`);
  }
}));

function isValuableItem(itemName) {
  const valuableItems = [
    "diamond", "netherite", "elytra", "totem", "enchanted",
    "god", "apple", "dragon", "beacon", "shulker"
  ];
  return valuableItems.some(val => itemName.toLowerCase().includes(val));
}
```

## Fields
- [event.slot](#eventslot)
- [event.all](#eventall)

## Methods
- [event.getInventory()](#eventgetinventory)
- [event.toString()](#eventtostring)

### event.slot
The slot number from which the item is being dropped.

**Type:** `int`

**Notes**
This corresponds to the slot in the current inventory or hotbar. Hotbar slots are typically 0-8, while inventory slots start from higher numbers depending on the container type.

### event.all
Whether the entire stack is being dropped or just one item.

**Type:** `boolean`

**Notes**
- `true` - The entire stack of items is being dropped (Ctrl+Q)
- `false` - Only a single item is being dropped (Q)

### event.getInventory()
Returns the inventory object associated with this drop event.

**Params**
* `(none)`

**Returns**
* `Inventory<?>` - The inventory helper object

**Notes**
This provides access to the full inventory, allowing you to examine the item being dropped, check other slots, or perform additional inventory operations.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`