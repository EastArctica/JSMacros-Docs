# HealthChange Event

This event is fired whenever the player's health changes, either from taking damage or being healed. It serves as a general event for any health modification. Backed by class `EventHealthChange`.

## Signature
```js
JsMacros.on("HealthChange", (event) => {
  // ...
});
```

```js
JsMacros.on("HealthChange", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type  | Description                              |
| ------ | ----- | ---------------------------------------- |
| health | float | The player's new health after change     |
| change | float | The amount by which health changed       |

## Behavior

* Fires for any health modification (damage or healing)
* The `change` field is negative for damage, positive for healing
* Serves as a general-purpose health monitoring event
* Not cancellable

## Minimal example

```js
JsMacros.on("HealthChange", (e) => {
  const change = e.change < 0 ? "damage" : "healing";
  Chat.log(`Health changed: ${change}, new health: ${e.health.toFixed(1)}`);
});
```

## Async example

```js
JsMacros.on("HealthChange", JavaWrapper.methodToJavaAsync((e) => {
  const change = e.change;
  const currentHealth = e.health;
  const maxHealth = Player.getPlayer().getMaxHealth();

  let message;
  if (change < 0) {
    message = `&cTook ${(-change).toFixed(1)} damage!`;
  } else if (change > 0) {
    message = `&aHealed for ${change.toFixed(1)} HP.`;
  } else {
    message = `&7Health is stable.`;
  }

  Chat.actionbar(`${message} &f| &eHealth: ${currentHealth.toFixed(1)} / ${maxHealth.toFixed(1)}`);
}));
```

## Fields
- [event.health](#eventhealth)
- [event.change](#eventchange)

## Methods
- [event.toString()](#eventtostring)

### event.health
The player's new health value after the change has been applied.

**Type:** `float`

**Notes**
A player's base maximum health is `20.0`, which corresponds to 10 full hearts.

### event.change
The amount by which the player's health changed.

**Type:** `float`

**Notes**
- This value will be **negative** if the player took damage.
- This value will be **positive** if the player was healed.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`