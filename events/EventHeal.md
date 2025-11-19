# EventHeal

This event is fired when the player's health increases. Backed by class `EventHeal`.

## Signature
```js
JsMacros.on("Heal", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type   | Description                              |
| ------ | ------ | ---------------------------------------- |
| source | string | The source that caused the healing       |
| health | float  | The player's health after healing applied |
| change | float  | The amount of health gained (positive)   |

## Behavior

* Fires when the player's health increases from any source
* The `change` field is always positive for healing events
* Common sources include `magic` (potions), food, regeneration effects
* Not cancellable

## Minimal example

```js
JsMacros.on("Heal", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Healed for ${e.change.toFixed(2)} HP`);
});
```

## Async example

```js
JsMacros.on("Heal", JavaWrapper.methodToJavaAsync((e) => {
  const healedAmount = e.change;
  Chat.log(`&aHealed for ${healedAmount.toFixed(2)} HP from '${e.source}'.`);

  if (e.health >= 20.0) {
    Chat.actionbar("You are at full health!");
  } else {
    Chat.actionbar(`Health: ${e.health.toFixed(1)} / 20.0`);
  }
}));
```

## Fields
- [event.source](#eventsource)
- [event.health](#eventhealth)
- [event.change](#eventchange)

## Methods
- [event.toString()](#eventtostring)

### event.source
The name of the source that caused the healing.

**Type:** `string`

**Notes**
This value is derived from Minecraft's `DamageSource` system. Common sources for healing might include `magic` (from potions) or others depending on mods and game mechanics.

### event.health
The player's health after the healing has been applied.

**Type:** `float`

**Notes**
A player's base maximum health is `20.0`, which corresponds to 10 full hearts.

### event.change
The amount of health gained. This will be a positive value.

**Type:** `float`

**Notes**
This value represents the difference in health. For example, healing 2 hearts would result in a `change` of `4.0`.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`