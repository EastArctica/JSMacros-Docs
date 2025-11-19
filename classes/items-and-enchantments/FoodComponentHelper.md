# FoodComponentHelper

**Category**: Items and Enchantments
**Package**: `xyz.wagyourtail.jsmacros.client.api.helpers.inventory`
**Since**: 1.8.4
**Author**: Etheradon

## Overview

The `FoodComponentHelper` class provides access to food properties and behaviors for items that can be consumed by players. This helper class exposes information about hunger restoration, saturation, special eating conditions, and status effects that may be applied when consuming food items.

## Accessing FoodComponentHelper

You typically access a `FoodComponentHelper` instance through an `ItemHelper` object using the `getFood()` method:

```javascript
// Get the currently held item
const item = Player.getHeldItem();

// Check if the item is food and get its food component
if (item.isFood()) {
    const foodComponent = item.getFood();
    // Now you can use the food component methods
}
```

## Methods

### getHunger()

Returns the amount of hunger points this food restores.

**Signature:**
```javascript
int getHunger()
```

**Returns:**
- `int` - The nutrition value (1-20 typically, where 1 = half a food bar icon)

**Example:**
```javascript
const steak = Player.getHeldItem();
const food = steak.getFood();
if (food) {
    console.log(`This steak restores ${food.getHunger()} hunger points`);
    // Output: "This steak restores 8 hunger points"
}
```

### getSaturation()

Returns the amount of saturation this food restores.

**Signature:**
```javascript
float getSaturation()
```

**Returns:**
- `float` - The saturation modifier (affects how long the food keeps you satisfied)

**Example:**
```javascript
const apple = Player.getHeldItem();
const food = apple.getFood();
if (food) {
    console.log(`Saturation: ${food.getSaturation()}`);
    // Output: "Saturation: 0.3"
}
```

### isAlwaysEdible()

Determines if this food can be eaten even when the player is not hungry.

**Signature:**
```javascript
boolean isAlwaysEdible()
```

**Returns:**
- `boolean` - `true` if the food can be eaten anytime, `false` if the player must be hungry

**Example:**
```javascript
const goldenApple = Player.getHeldItem();
const food = goldenApple.getFood();
if (food && food.isAlwaysEdible()) {
    console.log("This item can be eaten even when not hungry!");
}
```

### isFastFood()

Determines if this food can be eaten faster than normal (eating time less than 1.6 seconds).

**Signature:**
```javascript
boolean isFastFood()
```

**Returns:**
- `boolean` - `true` if the food eats quickly, `false` for normal eating speed

**Example:**
```javascript
const driedKelp = Player.getHeldItem();
const food = driedKelp.getFood();
if (food && food.isFastFood()) {
    console.log("This food eats quickly!");
}
```

### getStatusEffects()

Returns a map of status effects that may be applied when consuming this food, along with their probabilities.

**Signature:**
```javascript
Map<StatusEffectHelper, Float> getStatusEffects()
```

**Returns:**
- `Map<StatusEffectHelper, Float>` - A map where:
  - **Key**: `StatusEffectHelper` - The status effect that may be applied
  - **Value**: `Float` - The probability (0.0 to 1.0) of the effect occurring

**Example:**
```javascript
const suspiciousStew = Player.getHeldItem();
const food = suspiciousStew.getFood();
if (food) {
    const effects = food.getStatusEffects();
    if (effects.size() > 0) {
        console.log("This food may apply the following effects:");
        for (const [effect, probability] of effects) {
            console.log(`- ${effect.getId()}: ${(probability * 100).toFixed(1)}% chance`);
        }
    }
}
```

### toString()

Returns a string representation of the food component with key properties.

**Signature:**
```javascript
String toString()
```

**Returns:**
- `String` - JSON-like string representation of the food component

**Example:**
```javascript
const bread = Player.getHeldItem();
const food = bread.getFood();
if (food) {
    console.log(food.toString());
    // Output: "FoodComponentHelper:{"hunger": 5, "saturation": 0.600000, "alwaysEdible": false, "fastFood": false}"
}
```

## Usage Examples

### Complete Food Analysis

```javascript
function analyzeCurrentFood() {
    const item = Player.getHeldItem();

    if (!item.isFood()) {
        Chat.log("Current item is not food!");
        return;
    }

    const food = item.getFood();

    Chat.log(`=== Food Analysis: ${item.getName()} ===`);
    Chat.log(`Hunger restored: ${food.getHunger()} bars`);
    Chat.log(`Saturation: ${food.getSaturation()}`);
    Chat.log(`Always edible: ${food.isAlwaysEdible()}`);
    Chat.log(`Fast food: ${food.isFastFood()}`);

    const effects = food.getStatusEffects();
    if (effects.size() > 0) {
        Chat.log("Status effects:");
        for (const [effect, probability] of effects) {
            const chance = (probability * 100).toFixed(1);
            Chat.log(`  - ${effect.getId()}: ${chance}% chance`);
        }
    } else {
        Chat.log("No status effects");
    }
}
```

### Finding the Most Satiating Food

```javascript
function findMostSatiatingFood() {
    const inventory = Player.openInventory();
    let bestFood = null;
    let bestTotalSatiety = 0;

    for (let slot = 0; slot < inventory.getTotalSlots(); slot++) {
        const item = inventory.getSlot(slot);
        if (item && item.isFood()) {
            const food = item.getFood();
            const totalSatiety = food.getHunger() * food.getSaturation();

            if (totalSatiety > bestTotalSatiety) {
                bestTotalSatiety = totalSatiety;
                bestFood = item;
            }
        }
    }

    if (bestFood) {
        const food = bestFood.getFood();
        Chat.log(`Most satiating food: ${bestFood.getName()}`);
        Chat.log(`Hunger: ${food.getHunger()}, Saturation: ${food.getSaturation()}`);
        Chat.log(`Total satiety: ${bestTotalSatiety.toFixed(2)}`);
    } else {
        Chat.log("No food found in inventory!");
    }
}
```

### Checking for Poisonous Food

```javascript
function checkForPoisonousFood() {
    const inventory = Player.openInventory();
    const dangerousFoods = [];

    for (let slot = 0; slot < inventory.getTotalSlots(); slot++) {
        const item = inventory.getSlot(slot);
        if (item && item.isFood()) {
            const food = item.getFood();
            const effects = food.getStatusEffects();

            for (const [effect, probability] of effects) {
                if (effect.getId().includes("poison") || effect.getId().includes("harm")) {
                    dangerousFoods.push({
                        item: item.getName(),
                        effect: effect.getId(),
                        chance: (probability * 100).toFixed(1)
                    });
                }
            }
        }
    }

    if (dangerousFoods.length > 0) {
        Chat.log("⚠️ Dangerous food items found:");
        for (const danger of dangerousFoods) {
            Chat.log(`${danger.item}: ${danger.effect} (${danger.chance}% chance)`);
        }
    } else {
        Chat.log("No dangerous food found in inventory!");
    }
}
```

## Important Notes

- **Null Safety**: Always check if an item is food using `item.isFood()` before calling `item.getFood()`, as `getFood()` returns `null` for non-food items.
- **Probability Values**: Status effect probabilities are floats between 0.0 and 1.0, where 1.0 means 100% chance.
- **Saturation Formula**: Total satiety is typically calculated as `hunger × saturation`, which represents how long the food will keep you satisfied.
- **Fast Food Threshold**: Foods with eating time less than 1.6 seconds are considered "fast food" (like dried kelp).
- **Version Requirement**: This helper class requires JsMacros 1.8.4 or later.

## Related Classes

- [`ItemHelper`](ItemHelper.md) - For accessing food components from items
- [`StatusEffectHelper`](StatusEffectHelper.md) - For working with status effects from food