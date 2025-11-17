# Damage Event

This event is fired when the player takes damage from any source. Backed by class `EventDamage`.

## Signature
```js
JsMacros.on("Damage", (event) => {
  // ...
});
```

```js
JsMacros.on("Damage", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field    | Type          | Description                               |
| -------- | ------------- | ----------------------------------------- |
| attacker | EntityHelper  | The entity that caused the damage         |
| source   | string        | The name of the damage source             |
| health   | float         | The player's health after damage applied  |
| change   | float         | The amount of health change (negative)    |

## Behavior

* Fires when the player takes damage from any source
* The `attacker` field is deprecated and may be null on servers
* The `source` field is deprecated and may not be reliable on servers
* The `change` field is negative for damage events
* Not cancellable

## Minimal example

```js
JsMacros.on("Damage", (e) => {
  const damageTaken = -e.change;
  Chat.log(`Took ${damageTaken.toFixed(2)} damage. Health: ${e.health.toFixed(2)}`);
});
```

## Async example

```js
JsMacros.on("Damage", JavaWrapper.methodToJavaAsync((e) => {
  const damageTaken = -e.change;
  let message = `Ouch! Took ${damageTaken.toFixed(2)} damage from '${e.source}'.`;

  if (e.attacker) {
    message += ` Attacker: ${e.attacker.getName().getString()}`;
  }

  message += ` New health: ${e.health.toFixed(2)}`;
  Chat.log(message);

  if (e.health <= 4.0) { // 2 hearts
    Chat.actionbar("&cCRITICAL HEALTH!");
  }
}));
```

## Fields
- [event.attacker](#eventattacker)
- [event.source](#eventsource)
- [event.health](#eventhealth)
- [event.change](#eventchange)

## Methods
- [event.toString()](#eventtostring)

### event.attacker
A helper object for the entity that caused the damage.

**Type:** `EntityHelper`

**Notes**
This field is deprecated. It may not work reliably on servers and can often be `null`, especially for environmental damage sources like falling or fire.

### event.source
The name of the damage source.

**Type:** `string`

**Notes**
This field is deprecated and may not be reliable on servers. Common values include `mob`, `player`, `arrow`, `fall`, `lava`, `inFire`, `drown`, etc.

### event.health
The player's health after the damage has been applied.

**Type:** `float`

**Notes**
A player's base maximum health is `20.0`, which corresponds to 10 full hearts.

### event.change
The amount of health change. For damage, this will be a negative value.

**Type:** `float`

**Notes**
This value represents the difference in health. For example, taking 2 hearts of damage would result in a `change` of `-4.0`.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`