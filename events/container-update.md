# ContainerUpdate Event

This event is fired when a container's contents are updated. Backed by class `EventContainerUpdate`.

## Signature
```js
JsMacros.on("ContainerUpdate", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field     | Type       | Description                              |
| --------- | ---------- | ---------------------------------------- |
| inventory | Inventory  | The updated inventory helper object      |

## Behavior

* Fires when any container contents change
- The `inventory` field provides access to the updated container
- Includes chests, furnaces, crafting tables, etc.
- Not cancellable
- Useful for container monitoring and automation

## Example

```js
JsMacros.on("ContainerUpdate", JavaWrapper.methodToJavaAsync((e) => {
  const inventory = e.inventory;
  const size = inventory.getSize();

  Chat.log(`&dContainer updated: ${size} slots`);

  // Count items
  let totalItems = 0;
  for (let i = 0; i < size; i++) {
    const slot = inventory.getSlot(i);
    if (slot && !slot.isEmpty()) {
      totalItems += slot.getCount();
    }
  }

  Chat.log(`&7Total items: ${totalItems}`);
}));
```

## Fields
- [event.inventory](#eventinventory)

## Methods
- [event.toString()](#eventtostring)

### event.inventory
A helper object for the updated container inventory.

**Type:** `Inventory`

**Notes**
This provides access to all slots in the container and their current contents.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`