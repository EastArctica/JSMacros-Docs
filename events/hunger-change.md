# HungerChange Event

This event is fired when the player's hunger level changes. Backed by class `EventHungerChange`.

## Signature
```js
JsMacros.on("HungerChange", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| hunger | int     | The player's current hunger level        |
| change | int     | The amount by which hunger changed       |

## Behavior

* Fires when the player's hunger level increases or decreases
* The `hunger` field represents current hunger (0-20)
* The `change` field is negative for hunger decrease, positive for increase
- Occurs from eating, exertion, healing, etc.
* Not cancellable

## Minimal example

```js
JsMacros.on("HungerChange", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Hunger changed: ${e.hunger} (change: ${e.change})`);
});
```

## Async example

```js
JsMacros.on("HungerChange", JavaWrapper.methodToJavaAsync((e) => {
  const currentHunger = e.hunger;
  const hungerChange = e.change;

  // Calculate hunger percentage
  const maxHunger = 20;
  const hungerPercent = (currentHunger / maxHunger) * 100;
  const hungerBars = "▬".repeat(Math.floor(currentHunger / 2)) + "▭".repeat(10 - Math.floor(currentHunger / 2));

  Chat.actionbar(`&6Hunger: &f${hungerBars} &7(${currentHunger}/20)`);

  if (hungerChange > 0) {
    // Hunger increased (probably from eating)
    const foodType = guessFoodFromChange(hungerChange);
    Chat.log(`&aAte something! +${hungerChange} hunger`);
    Chat.log(`&eFood type: ${foodType}`);

    if (currentHunger >= maxHunger) {
      Chat.actionbar(`&aFully satiated!`);
    }
  } else if (hungerChange < 0) {
    // Hunger decreased
    const reason = guessHungerLossReason(Math.abs(hungerChange));
    Chat.log(`&cHunger decreased: ${hungerChange} (${reason})`);

    if (currentHunger <= 6) {
      Chat.actionbar(`&cLow hunger! You can't sprint!`);
    }

    if (currentHunger <= 3) {
      Chat.actionbar(`&4Very low hunger! Find food quickly!`);
    }

    if (currentHunger === 0) {
      Chat.actionbar(`&4STARVING! Taking damage!`);
      Chat.log(`&cWARNING: You are starving and taking damage!`);
    }
  }

  // Check for specific hunger thresholds
  if (currentHunger === 18 && hungerChange < 0) {
    Chat.log(`&eWarning: Below 18 hunger - can't regenerate health!`);
  }
}));

function guessFoodFromChange(change) {
  // Approximate food values for common Minecraft foods
  const foodValues = {
    1: "Berry, Cookie",
    2: "Apple, Bread, Raw Meat",
    3: "Cooked Meat, Carrot, Potato",
    4: "Cooked Chicken/Rabbit, Pumpkin Pie",
    5: "Steak, Cooked Porkchop",
    6: "Golden Carrot",
    8: "Cake slice",
    12: "Golden Apple"
  };
  return foodValues[change] || "Unknown food";
}

function guessHungerLossReason(loss) {
  if (loss === 1) return "Minor exertion";
  if (loss === 2) return "Moderate exertion";
  if (loss === 4) return "Heavy exertion";
  if (loss >= 1 && loss <= 4) return "Exertion (jumping, swimming, mining)";
  return "Unknown";
}
```

## Fields
- [event.hunger](#eventhunger)
- [event.change](#eventchange)

## Methods
- [event.toString()](#eventtostring)

### event.hunger
The player's current hunger level.

**Type:** `int`

**Notes**
Hunger ranges from 0 to 20:
- 20: Full hunger (10 hunger bars)
- 18: Above this, health can regenerate
- 6: Above this, player can sprint
- 0: Starving (takes damage)

### event.change
The amount by which the player's hunger changed.

**Type:** `int`

**Notes**
- Positive values indicate hunger increase (from eating food)
- Negative values indicate hunger decrease (from exertion, healing, etc.)
- The magnitude indicates how much hunger was gained or lost

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`