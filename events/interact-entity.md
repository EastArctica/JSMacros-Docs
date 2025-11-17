# InteractEntity Event

This event is fired when the player interacts with an entity. Backed by class `EventInteractEntity`.

## Signature
```js
JsMacros.on("InteractEntity", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| entity | EntityHelper  | The entity that was interacted with      |

## Behavior

* Fires when the player right-clicks on an entity
* Includes animals, villagers, players, item frames, etc.
- Occurs for trading, mounting, shearing, equipping, etc.
* This event is cancellable - preventing the interaction

## Minimal example

```js
JsMacros.on("InteractEntity", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Interacted with ${e.entity.getName()}`);
});
```

## Async example

```js
JsMacros.on("InteractEntity", JavaWrapper.methodToJavaAsync((e) => {
  const entity = e.entity;
  const entityName = entity.getName();
  const entityType = entity.getType();
  const pos = entity.getPos();

  Chat.log(`&6Entity Interaction: &f${entityName}`);
  Chat.log(`&7Type: &f${entityType} &7at: &f[${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}]`);

  // Handle different entity types
  if (entity.isPlayer()) {
    Chat.log(`&6Player interaction: &f${entityName}`);
    Chat.actionbar(`&aInteracting with player: ${entityName}`);

    // Check if it's yourself
    if (entityName === Player.getPlayer().getName()) {
      Chat.log("&7You interacted with yourself");
    }
  }

  if (entity.isVillager() || entity.isWanderingTrader()) {
    Chat.log(`&eVillager interaction: &f${entityName}`);
    Chat.actionbar("&dOpening trading interface...");

    // Log villager profession if available
    const profession = entity.getProfession();
    if (profession) {
      Chat.log(`&7Profession: &f${profession}`);
    }
  }

  if (entity.isAnimal()) {
    Chat.log(`&bAnimal interaction: &f${entityName}`);

    // Handle specific animals
    if (entityType.includes("horse")) {
      Chat.actionbar("&eInteracting with horse (mounting/taming)");
    } else if (entityType.includes("cow") || entityType.includes("mooshroom")) {
      Chat.actionbar("&6Interacting with cow/mooshroom (milking)");
    } else if (entityType.includes("sheep")) {
      Chat.actionbar("&eInteracting with sheep (shearing)");
    } else if (entityType.includes("pig")) {
      Chat.actionbar("&eInteracting with pig (mounting with saddle)");
    } else if (entityType.includes("chicken")) {
      Chat.actionbar("&eInteracting with chicken (feeding)");
    }
  }

  if (entity.isHostile()) {
    Chat.log(`&cHostile entity interaction: &f${entityName}`);
    Chat.actionbar("&6Interacting with hostile entity");

    // Warn about dangerous interactions
    Chat.log("&eWarning: Interacting with hostile entity!");
  }

  // Handle item entities
  if (entity.isItem()) {
    const itemStack = entity.getItemStack();
    const itemName = itemStack.getName().getString();
    const itemCount = itemStack.getCount();

    Chat.log(`&6Item interaction: &f${itemName} &7(x${itemCount})`);
    Chat.actionbar("&ePicking up item");

    // Alert for valuable items
    if (isValuableItem(itemName)) {
      Chat.log(`&aValuable item: &f${itemName} &7(x${itemCount})`);
    }
  }

  // Handle armor stands
  if (entityType.includes("armor_stand")) {
    Chat.log(`&dArmor stand interaction`);
    Chat.actionbar("&dModifying armor stand");
  }

  // Handle item frames
  if (entityType.includes("item_frame")) {
    Chat.log(`&eItem frame interaction`);
    Chat.actionbar("&dRotating/placing item in frame");

    const item = entity.getItemStack();
    if (item && !item.isEmpty()) {
      Chat.log(`&7Frame contains: &f${item.getName().getString()}`);
    }
  }

  // Handle minecarts and boats
  if (entity.isVehicle()) {
    Chat.log(`&dVehicle interaction: &f${entityName}`);
    Chat.actionbar("&eEntering vehicle");
  }

  // Check distance
  const distance = Player.getPlayer().getPos().distanceTo(pos);
  if (distance > 4) {
    Chat.log(`&6Long-range interaction: &f${distance.toFixed(1)} &7blocks`);
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
A helper object for the entity that was interacted with.

**Type:** `EntityHelper`

**Notes**
This provides access to all entity properties like name, type, position, health, etc. You can check the entity type, determine if it's a player, villager, animal, item, etc., and access entity-specific methods.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`