# EventClickSlot

This event is fired when the user clicks a slot in an inventory interface. Backed by class `EventClickSlot`.

## Signature
```js
JsMacros.on("ClickSlot", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field    | Type       | Description                              |
| -------- | ---------- | ---------------------------------------- |
| mode     | int        | The click mode used                      |
| button   | int        | The mouse button used                    |
| slot     | int        | The slot number that was clicked         |

## Behavior

* Fires when a player clicks on any inventory slot
* Different click modes and buttons represent different click actions
* This event is cancellable - preventing the original click action
* The mode and button values follow Minecraft's window click protocol
* Can be used to intercept or modify inventory interactions

## Minimal example

```js
JsMacros.on("ClickSlot", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Clicked slot ${e.slot} with mode ${e.mode}, button ${e.button}`);
});
```

## Async example

```js
JsMacros.on("ClickSlot", JavaWrapper.methodToJavaAsync((e) => {
  const slot = e.slot;
  const mode = e.mode;
  const button = e.button;

  const inventory = e.getInventory();
  const slotItem = inventory.getSlot(slot);

  let actionName = getClickActionName(mode, button);
  let itemName = slotItem ? slotItem.getName().getString() : "Empty";

  Chat.log(`&6Inventory Click: &f${actionName}`);
  Chat.log(`&7Slot: &f${slot} &7- Item: &f${itemName}`);

  // Example: Prevent clicking on certain items
  if (itemName.includes("Diamond") && mode === 0) {
    e.cancel();
    Chat.actionbar("&cCannot pick up diamond items!");
  }

  // Example: Log shift-clicks for organizing
  if (mode === 1 && button === 0) {
    Chat.log(`&bShift-clicked: &f${itemName} &7in slot ${slot}`);
  }
}));

function getClickActionName(mode, button) {
  // Simplified click action detection
  if (mode === 0) return `Left Click (button ${button})`;
  if (mode === 1) return `Right Click (button ${button})`;
  if (mode === 2) return `Middle Click (button ${button})`;
  if (mode === 4) return `Drop Key (button ${button})`;
  if (mode === 5) return `Drag Start (button ${button})`;
  if (mode === 6) return `Drag Add (button ${button})`;
  return `Mode ${mode}, Button ${button}`;
}
```

## Fields
- [event.mode](#eventmode)
- [event.button](#eventbutton)
- [event.slot](#eventslot)

## Methods
- [event.getInventory()](#eventgetinventory)
- [event.toString()](#eventtostring)

### event.mode
The click mode used for this inventory action.

**Type:** `int`

**Notes**
This follows Minecraft's click window protocol. Common modes include:
- `0` - Click (left/right/middle based on button)
- `1` - Shift-click
- `2` - Middle-click (creative mode only)
- `3` - Number key press
- `4` - Drop key
- `5` - Drag start
- `6` - Drag add slot
- `7` - Drag end

### event.button
The mouse button or key used for the click.

**Type:** `int`

**Notes**
For basic clicks:
- `0` - Left mouse button
- `1` - Right mouse button
- `2` - Middle mouse button

The meaning varies based on the mode. Reference the Minecraft protocol documentation for complete details.

### event.slot
The slot number that was clicked.

**Type:** `int`

**Notes**
Slot numbers depend on the container type:
- Player inventory slots typically start from 9
- Hotbar slots are 0-8
- Container slots vary by inventory type

### event.getInventory()
Returns the inventory object associated with this click event.

**Params**
* `(none)`

**Returns**
* `Inventory<?>` - The inventory helper object

**Notes**
This provides access to the full inventory, allowing you to examine other slots, get item details, or perform additional inventory operations.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`