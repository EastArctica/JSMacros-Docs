# EntityLoad Event

This event is fired when an entity loads into the world. Backed by class `EventEntityLoad`.

## Signature
```js
JsMacros.on("EntityLoad", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| entity | EntityHelper  | The entity that loaded                   |

## Behavior

* Fires when any entity loads into render distance
* Includes mobs, animals, players, item entities, etc.
* Occurs when entities come into range or newly spawn
* Not cancellable
* Can be used for entity tracking or detection systems

## Minimal example

```js
JsMacros.on("EntityLoad", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Entity loaded: ${e.entity.getName()}`);
});
```

## Async example

```js
JsMacros.on("EntityLoad", JavaWrapper.methodToJavaAsync((e) => {
  const entity = e.entity;
  const entityName = entity.getName();
  const entityType = entity.getType();
  const pos = entity.getPos();

  Chat.log(`&eEntity Loaded: &f${entityName}`);
  Chat.log(`&7Type: &f${entityType} &7at: &f[${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}]`);

  // Check for specific entity types
  if (entity.isPlayer()) {
    Chat.log(`&6Player detected: &f${entityName}`);

    // Check if it's a known player
    if (entityName !== Player.getPlayer().getName()) {
      Chat.actionbar(`&a${entityName} &7nearby!`);
    }
  }

  if (entity.isHostile()) {
    Chat.log(`&cHostile mob spawned: &f${entityName}`);
    Chat.actionbar(`&cDanger: ${entityName} nearby!`);

    // Track dangerous mobs
    const distance = Player.getPlayer().getPos().distanceTo(pos);
    if (distance < 16) {
      Chat.log(`&6Warning: Hostile entity &f${entityName} &6within ${distance.toFixed(1)} blocks!`);
    }
  }

  if (entity.isAnimal()) {
    Chat.log(`&bAnimal loaded: &f${entityName}`);

    // Log rare animals
    if (entityType.includes("mooshroom") || entityType.includes("polar") || entityType.includes("panda")) {
      Chat.log(`&6Rare animal detected: &f${entityName}`);
    }
  }

  // Check for item entities (dropped items)
  if (entity.isItem()) {
    const itemStack = entity.getItemStack();
    const itemName = itemStack.getName().getString();
    const itemCount = itemStack.getCount();

    Chat.log(`&6Item drop: &f${itemName} &7(x${itemCount})`);

    // Alert for valuable items
    if (isValuableItem(itemName)) {
      Chat.actionbar(`&6Valuable item dropped: &f${itemName} &7(x${itemCount})`);
    }
  }

  // Check for vehicles/minecarts
  if (entity.isVehicle()) {
    Chat.log(`&dVehicle loaded: &f${entityName}`);
  }
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
A helper object for the entity that loaded.

**Type:** `EntityHelper`

**Notes**
This provides access to all entity properties like name, type, position, health, etc. You can check the entity type, get its position, and determine if it's a player, mob, animal, item, etc.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`