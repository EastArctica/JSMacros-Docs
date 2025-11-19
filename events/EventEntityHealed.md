# EventEntityHealed

This event is fired when any entity in the world is healed. Backed by class `EventEntityHealed`.

## Signature
```js
JsMacros.on("EntityHealed", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| entity | EntityHelper  | The entity that was healed               |
| health | float         | The entity's current health after healing |
| amount | float         | The amount of health healed              |

## Behavior

* Fires when any entity (not just the player) receives healing
* Includes mobs, animals, players, etc.
* The `health` field represents current health after the healing
* The `amount` field is the amount of health restored
* Not cancellable

## Minimal example

```js
JsMacros.on("EntityHealed", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`${e.entity.getName()} healed for ${e.amount}, health: ${e.health}`);
});
```

## Async example

```js
JsMacros.on("EntityHealed", JavaWrapper.methodToJavaAsync((e) => {
  const entity = e.entity;
  const entityName = entity.getName();
  const healAmount = e.amount;
  const currentHealth = e.health;

  Chat.log(`&aEntity Healed: &f${entityName}`);
  Chat.log(`&7Healed: &f+${healAmount.toFixed(1)} &7- Health: &f${currentHealth.toFixed(1)}`);

  // Check if it's the player
  if (entity.isPlayer()) {
    Chat.log(`&6Player healed!`);
    Chat.actionbar(`&a+${healAmount.toFixed(1)} HP`);

    // Calculate health percentage
    const maxHealth = entity.getMaxHealth();
    const healthPercent = (currentHealth / maxHealth) * 100;
    Chat.actionbar(`&aHealth: ${currentHealth.toFixed(1)}/${maxHealth.toFixed(1)} (${healthPercent.toFixed(0)}%)`);
  }

  // Check if it's a hostile mob
  if (entity.isHostile()) {
    Chat.log(`&6Hostile mob healed: &f${entityName}`);

    // Warn if dangerous mobs are healing
    if (healAmount >= 5) {
      Chat.log(`&cWarning: Strong healing on &f${entityName}`);
    }
  }

  // Check for animals being healed
  if (entity.isAnimal()) {
    Chat.log(`&bAnimal healed: &f${entityName}`);
  }

  // Log significant healing events
  if (healAmount >= 10) {
    Chat.log(`&6Major healing event: &f${entityName} &7healed for &a${healAmount.toFixed(1)}`);
  }

  // Check for full health restoration
  const maxHealth = entity.getMaxHealth();
  if (Math.abs(currentHealth - maxHealth) < 0.1) {
    Chat.log(`&a${entityName} &7is now at full health!`);
  }
}));
```

## Fields
- [event.entity](#evententity)
- [event.health](#eventhealth)
- [event.amount](#eventamount)

## Methods
- [event.toString()](#eventtostring)

### event.entity
A helper object for the entity that was healed.

**Type:** `EntityHelper`

**Notes**
This provides access to entity properties like name, type, position, health, etc. You can check if the entity is a player, hostile mob, animal, etc. using the helper methods.

### event.health
The entity's current health after being healed.

**Type:** `float`

**Notes**
This represents the new health after the healing has been applied. Different entities have different maximum health values. Players typically have 20.0 maximum health.

### event.amount
The amount of health the entity gained from healing.

**Type:** `float`

**Notes**
This is the amount of health that was restored to the entity. This value is always positive and represents the healing received.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`