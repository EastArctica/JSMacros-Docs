# EventArmorChange

This event is fired when the player equips, unequips, or swaps a piece of armor.

## Example
```javascript
// Announce armor changes in chat
const listener = JsMacros.on('ArmorChange', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'ArmorChange');

    const slot = event.slot;
    const newItem = event.item;
    const oldItem = event.oldItem;

    if (!newItem.isEmpty()) {
        if (!oldItem.isEmpty()) {
            // Armor was swapped
            Chat.log(`Swapped ${oldItem.getName()} for ${newItem.getName()} on ${slot}.`);
        } else {
            // Armor was equipped
            Chat.log(`Equipped ${newItem.getName()} on ${slot}.`);
        }
    } else {
        // Armor was unequipped
        Chat.log(`Unequipped ${oldItem.getName()} from ${slot}.`);
    }
}));
```

## Fields
- [EventArmorChange](#eventarmorchange)
  - [Example](#example)
  - [Fields](#fields)
  - [Methods](#methods)
    - [event.slot](#eventslot)
    - [event.item](#eventitem)
    - [event.oldItem](#eventolditem)
    - [event.toString()](#eventtostring)

## Methods
- [event.toString()](#eventtostring)

### event.slot
The name of the armor slot that was changed.

**Type:** `string`

**Notes**
Possible values are: `"HEAD"`, `"CHEST"`, `"LEGS"`, `"FEET"`.

### event.item
A helper for the new item stack in the armor slot.

**Type:** `ItemStackHelper`

**Notes**
This will be an empty item stack if the armor piece was unequipped. You can check this with `event.item.isEmpty()`.

### event.oldItem
A helper for the item stack that was previously in the armor slot.

**Type:** `ItemStackHelper`

**Notes**
This will be an empty item stack if the slot was previously empty. You can check this with `event.oldItem.isEmpty()`.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`