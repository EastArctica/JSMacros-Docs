# EntityUnload Event

This event is fired when an entity unloads from the world. Backed by class `EventEntityUnload`.

## Signature
```js
JsMacros.on("EntityUnload", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| entity | EntityHelper  | The entity that unloaded                 |

## Behavior

* Fires when any entity unloads from the world
* Occurs when entities move out of render distance or are removed
* Includes entity death, despawning, or moving too far away
* Not cancellable
* Can be used to clean up entity tracking systems

## Minimal example

```js
JsMacros.on("EntityUnload", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Entity unloaded: ${e.entity.getName()}`);
}));
```

## Async example

```js
JsMacros.on("EntityUnload", JavaWrapper.methodToJavaAsync((e) => {
  const entity = e.entity;
  const entityName = entity.getName();
  const entityType = entity.getType();

  Chat.log(`&7Entity Unloaded: &f${entityName}`);
  Chat.log(`&8Type: ${entityType}`);

  // Check for specific entity types
  if (entity.isPlayer()) {
    Chat.log(`&6Player left: &f${entityName}`);

    if (entityName !== Player.getPlayer().getName()) {
      Chat.actionbar(`&7${entityName} &fhas left the area`);
    }
  }

  if (entity.isHostile()) {
    Chat.log(`&cHostile mob despawned/removed: &f${entityName}`);
    Chat.actionbar(`&a${entityName} &7is no longer nearby`);

    // Log when dangerous mobs are gone
    Chat.log(`&6Clear: Hostile entity &f${entityName} &6has been removed`);
  }

  if (entity.isAnimal()) {
    Chat.log(`&bAnimal unloaded: &f${entityName}`);
  }

  // Check for item entities (picked up or despawned)
  if (entity.isItem()) {
    const itemStack = entity.getItemStack();
    const itemName = itemStack.getName().getString();
    const itemCount = itemStack.getCount();

    Chat.log(`&6Item removed: &f${itemName} &7(x${itemCount})`);

    // Assume item was picked up if it was valuable
    if (isValuableItem(itemName)) {
      Chat.actionbar(`&a${itemName} &7picked up!`);
    }
  }

  // Check for vehicles/minecarts
  if (entity.isVehicle()) {
    Chat.log(`&dVehicle unloaded: &f${entityName}`);
  }

  // Clean up any tracked data for this entity
  // removeEntityData(entity.getUUID());
}));

function isValuableItem(itemName) {
  const valuableItems = [
    "diamond", "netherite", "elytra", "totem", "enchanted",
    "god", "apple", "dragon", "beacon"
  ];
  return valuableItems.some(val => itemName.toLowerCase().includes(val));
}
```

## Fields
- [event.entity](#evententity)

## Methods
- [event.toString()](#eventtostring)

### event.entity
A helper object for the entity that unloaded.

**Type:** `EntityHelper`

**Notes**
This provides access to the entity's properties at the time of unloading. You can still access the entity's name, type, UUID, and other information even though it's no longer in the world.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`