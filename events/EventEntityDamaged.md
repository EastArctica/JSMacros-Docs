# EventEntityDamaged

This event is fired when any entity in the world takes damage. Backed by class `EventEntityDamaged`.

## Signature
```js
JsMacros.on("EntityDamaged", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| entity | EntityHelper  | The entity that took damage              |
| health | float         | The entity's current health after damage |
| damage | float         | The amount of damage taken               |

## Behavior

* Fires when any entity (not just the player) takes damage
* Includes mobs, animals, item entities, etc.
* The `health` field represents current health after the damage
* The `damage` field is the amount of damage taken
* Not cancellable

## Minimal example

```js
JsMacros.on("EntityDamaged", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`${e.entity.getName()} took ${e.damage} damage, health: ${e.health}`);
});
```

## Async example

```js
JsMacros.on("EntityDamaged", JavaWrapper.methodToJavaAsync((e) => {
  const entity = e.entity;
  const entityName = entity.getName();
  const damage = e.damage;
  const currentHealth = e.health;

  Chat.log(`&cEntity Damaged: &f${entityName}`);
  Chat.log(`&7Damage: &f${damage.toFixed(1)} &7- Health: &f${currentHealth.toFixed(1)}`);

  // Check if it's a hostile mob
  if (entity.isHostile()) {
    Chat.log(`&6Hostile mob injured: &f${entityName}`);

    // Check if it's close to death
    if (currentHealth <= 2) {
      Chat.actionbar(`&a${entityName} &7is almost defeated!`);
    }
  }

  // Check if it's the player
  if (entity.isPlayer()) {
    Chat.log(`&6Player took damage!`);
    if (currentHealth <= 5) {
      Chat.actionbar("&cLow health warning!");
    }
  }

  // Check for animals
  if (entity.isAnimal()) {
    Chat.log(`&bAnimal injured: &f${entityName}`);

    // Warn if hurting passive animals
    Chat.actionbar(`&e${entityName} &7was hurt!`);
  }

  // Log significant damage events
  if (damage >= 10) {
    Chat.log(`&6Major damage event: &f${entityName} &7took &c${damage.toFixed(1)} &7damage`);
  }
}));
```

## Fields
- [event.entity](#evententity)
- [event.health](#eventhealth)
- [event.damage](#eventdamage)

## Methods
- [event.toString()](#eventtostring)

### event.entity
A helper object for the entity that took damage.

**Type:** `EntityHelper`

**Notes**
This provides access to entity properties like name, type, position, health, etc. You can check if the entity is a player, hostile mob, animal, etc. using the helper methods.

### event.health
The entity's current health after taking damage.

**Type:** `float`

**Notes**
This represents the remaining health after the damage has been applied. Different entities have different maximum health values. Players typically have 20.0 maximum health.

### event.damage
The amount of damage the entity took.

**Type:** `float`

**Notes**
This is the raw damage amount that was applied to the entity. This value is always positive and represents the damage taken, not the change in health.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`