# StatusEffectUpdate Event

This event is fired when a status effect (potion effect) is added or removed from the player. Backed by class `EventStatusEffectUpdate`.

## Signature
```js
JsMacros.on("StatusEffectUpdate", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field     | Type                 | Description                              |
| --------- | -------------------- | ---------------------------------------- |
| oldEffect | StatusEffectHelper  | The previous effect state (can be null)   |
| newEffect | StatusEffectHelper  | The new effect state (can be null)        |
| added     | boolean              | True if effect was added, false if removed |

## Behavior

* Fires when any status effect is added or removed
- The `added` field indicates if an effect was added (true) or removed (false)
- The `oldEffect` and `newEffect` fields provide effect details
- Not cancellable
- Useful for effect tracking and automation

## Minimal example

```js
JsMacros.on("StatusEffectUpdate", JavaWrapper.methodToJavaAsync((e) => {
  const action = e.added ? "added" : "removed";
  const effectName = e.added ? e.newEffect.getId() : e.oldEffect.getId();
  Chat.log(`Effect ${action}: ${effectName}`);
});
```

## Async example

```js
JsMacros.on("StatusEffectUpdate", JavaWrapper.methodToJavaAsync((e) => {
  const isAdded = e.added;
  const oldEffect = e.oldEffect;
  const newEffect = e.newEffect;

  if (isAdded && newEffect) {
    handleEffectAdded(newEffect);
  } else if (!isAdded && oldEffect) {
    handleEffectRemoved(oldEffect);
  }
}));

function handleEffectAdded(effect) {
  const effectId = effect.getId();
  const effectName = getEffectName(effectId);
  const strength = effect.getStrength();
  const duration = effect.getTime();
  const durationMinutes = Math.floor(duration / 1200);
  const durationSeconds = Math.floor((duration % 1200) / 20);

  Chat.log(`&aStatus Effect Added: &f${effectName}`);
  Chat.log(`&7Strength: &f${strength + 1} &7- Duration: &f${durationMinutes}m ${durationSeconds}s`);

  // Handle specific effects
  switch(effectId) {
    case 'minecraft:speed':
      Chat.actionbar(`&b⚡ Speed effect active! +${(strength + 1) * 20}% speed`);
      break;

    case 'minecraft:strength':
      Chat.actionbar(`&c💪 Strength effect active! +${(strength + 1) * 130}% damage`);
      break;

    case 'minecraft:jump_boost':
      Chat.actionbar(`&e🦘 Jump boost active! +${(strength + 1)} jump height`);
      break;

    case 'minecraft:regeneration':
      Chat.actionbar(`&a❤️ Regeneration active!`);
      Chat.log(`&6Health will regenerate at ${getRegenRate(strength)} hearts/second`);
      break;

    case 'minecraft:fire_resistance':
      Chat.actionbar(`&c🔥 Fire resistance active!`);
      Chat.log(`&aYou are immune to fire damage!`);
      break;

    case 'minecraft:water_breathing':
      Chat.actionbar(`&b🫧 Water breathing active!`);
      Chat.log(`&aYou can breathe underwater!`);
      break;

    case 'minecraft:night_vision':
      Chat.actionbar(`&b👁️ Night vision active!`);
      Chat.log(`&aYou can see in the dark!`);
      break;

    case 'minecraft:invisibility':
      Chat.actionbar(`&e👻 Invisibility active!`);
      Chat.log(`&6You are now invisible to mobs and players!`);
      break;

    case 'minecraft:haste':
      Chat.actionbar(`&e⛏️ Haste active! +${(strength + 1) * 20}% mining speed`);
      break;

    case 'minecraft:mining_fatigue':
      Chat.actionbar(`&c⛏️ Mining fatigue active! -${(strength + 1) * 20}% mining speed`);
      Chat.log(`&4Mining speed severely reduced!`);
      break;

    case 'minecraft:weakness':
      Chat.actionbar(`&c💪 Weakness active! -${(strength + 1) * 4} damage`);
      Chat.log(`&4Melee damage reduced!`);
      break;

    case 'minecraft:poison':
      Chat.actionbar(`&c☠️ Poison active!`);
      Chat.log(`&4Taking poison damage!`);
      Chat.log(`&6Health will drain to 1/2 heart!`);
      break;

    case 'minecraft:wither':
      Chat.actionbar(`&8☠️ Wither effect active!`);
      Chat.log(`&4Taking wither damage!`);
      Chat.log(`&6Cannot be regenerated until effect ends!`);
      break;

    case 'minecraft:slowness':
      Chat.actionbar(`&c🐌 Slowness active! -${(strength + 1) * 15}% speed`);
      break;

    case 'minecraft:blindness':
      Chat.actionbar(`&8👁️ Blindness active!`);
      Chat.log(`&4Vision severely impaired!`);
      break;

    case 'minecraft:hunger':
      Chat.actionbar(`&c🍖 Hunger effect active!`);
      Chat.log(`&6Increased hunger drain!`);
      break;

    case 'minecraft:nausea':
      Chat.actionbar(`&c🌀 Nausea effect active!`);
      Chat.log(`&6Screen distortion!`);
      break;

    case 'minecraft:glowing':
      Chat.actionbar(`&e✨ Glowing effect active!`);
      Chat.log(`&6You can be seen through walls!`);
      break;

    case 'minecraft:levitation':
      Chat.actionbar(`&e🎈 Levitation effect active!`);
      Chat.log(`&6Floating upward!`);
      break;

    case 'minecraft:slow_falling':
      Chat.actionbar(`&e🪶 Slow falling active!`);
      Chat.log(`&6Fall damage negated, descent slowed!`);
      break;

    case 'minecraft:conduit_power':
      Chat.actionbar(`&b💎 Conduit power active!`);
      Chat.log(`&aUnderwater haste and night vision!`);
      break;

    case 'minecraft:dolphins_grace':
      Chat.actionbar(`&b🐬 Dolphin's grace active!`);
      Chat.log(`&aImproved underwater swimming speed!`);
      break;

    case 'minecraft:bad_omen':
      Chat.actionbar(`&c⚔️ Bad omen active!`);
      Chat.log(`&6Next village raid will be more difficult!`);
      break;

    case 'minecraft:hero_of_the_village':
      Chat.actionbar(`&a🏘️ Hero of the village!`);
      Chat.log(`&6Villagers will give discounts!`);
      break;

    default:
      Chat.actionbar(`&eUnknown effect: ${effectName}`);
      break;
  }

  // Log high-level effects
  if (strength >= 2) {
    Chat.log(`&6High-level effect detected: ${effectName} strength ${strength + 1}`);
  }

  // Log long-duration effects
  if (duration > 36000) { // 30 minutes
    Chat.log(`&dVery long duration effect: ${effectName}`);
  }

  // Track effect combinations
  updateActiveEffects();
}

function handleEffectRemoved(effect) {
  const effectId = effect.getId();
  const effectName = getEffectName(effectId);

  Chat.log(`&cStatus Effect Removed: &f${effectName}`);

  // Handle specific effect removal
  switch(effectId) {
    case 'minecraft:speed':
      Chat.actionbar(`&b⚡ Speed effect ended`);
      break;
    case 'minecraft:strength':
      Chat.actionbar(`&c💪 Strength effect ended`);
      break;
    case 'minecraft:night_vision':
      Chat.actionbar(`&b👁️ Night vision ended - it's getting dark!`);
      break;
    case 'minecraft:fire_resistance':
      Chat.actionbar(`&c🔥 Fire resistance ended - be careful near fire!`);
      break;
    case 'minecraft:water_breathing':
      Chat.actionbar(`&b🫧 Water breathing ended - can't breathe underwater!`);
      break;
    case 'minecraft:invisibility':
      Chat.actionbar(`&e👻 Invisibility ended - you're visible again!`);
      break;
    case 'minecraft:poison':
      Chat.actionbar(`&a☠️ Poison ended - no more damage!`);
      break;
    case 'minecraft:wither':
      Chat.actionbar(`&a☠️ Wither ended - can regenerate health!`);
      break;
  }

  // Update active effects tracking
  updateActiveEffects();
}

function getEffectName(effectId) {
  // Convert effect ID to readable name
  const effectNames = {
    'minecraft:speed': 'Speed',
    'minecraft:slowness': 'Slowness',
    'minecraft:haste': 'Haste',
    'minecraft:mining_fatigue': 'Mining Fatigue',
    'minecraft:strength': 'Strength',
    'minecraft:instant_health': 'Instant Health',
    'minecraft:instant_damage': 'Instant Damage',
    'minecraft:jump_boost': 'Jump Boost',
    'minecraft:nausea': 'Nausea',
    'minecraft:regeneration': 'Regeneration',
    'minecraft:resistance': 'Resistance',
    'minecraft:fire_resistance': 'Fire Resistance',
    'minecraft:water_breathing': 'Water Breathing',
    'minecraft:invisibility': 'Invisibility',
    'minecraft:blindness': 'Blindness',
    'minecraft:night_vision': 'Night Vision',
    'minecraft:hunger': 'Hunger',
    'minecraft:weakness': 'Weakness',
    'minecraft:poison': 'Poison',
    'minecraft:wither': 'Wither',
    'minecraft:health_boost': 'Health Boost',
    'minecraft:absorption': 'Absorption',
    'minecraft:saturation': 'Saturation',
    'minecraft:glowing': 'Glowing',
    'minecraft:levitation': 'Levitation',
    'minecraft:luck': 'Luck',
    'minecraft:unluck': 'Unluck',
    'minecraft:slow_falling': 'Slow Falling',
    'minecraft:conduit_power': 'Conduit Power',
    'minecraft:dolphins_grace': 'Dolphin\'s Grace',
    'minecraft:bad_omen': 'Bad Omen',
    'minecraft:hero_of_the_village': 'Hero of the Village'
  };

  return effectNames[effectId] || effectId;
}

function getRegenRate(strength) {
  // Regeneration heals 1 heart every 50 ticks at level 1
  // Each level reduces the interval by 25%
  const baseInterval = 50;
  const interval = baseInterval * Math.pow(0.75, strength);
  const heartsPerSecond = 20 / interval;
  return heartsPerSecond.toFixed(1);
}

function updateActiveEffects() {
  // This would track all active effects
  // Could be used for effect management and warnings
  const player = Player.getPlayer();
  if (player) {
    const activeEffects = player.getActiveEffects();
    const effectCount = activeEffects.length;

    if (effectCount > 0) {
      Chat.log(`&7Active effects: &f${effectCount}`);

      // Check for dangerous combinations
      const effectIds = activeEffects.map(e => e.getId());

      if (effectIds.includes('minecraft:weakness') && effectIds.includes('minecraft:mining_fatigue')) {
        Chat.log(`&c⚠ Danger: Both weakness and mining fatigue active!`);
      }

      if (effectIds.includes('minecraft:poison') && effectIds.includes('minecraft:withers')) {
        Chat.log(`&4⚠ Critical: Both poison and wither active!`);
      }
    }
  }
}
```

## Fields
- [event.oldEffect](#eventoldeffect)
- [event.newEffect](#eventneweffect)
- [event.added](#eventadded)

## Methods
- [event.toString()](#eventtostring)

### event.oldEffect
The previous state of the effect (before the change).

**Type:** `StatusEffectHelper` | `null`

**Notes**
This contains the effect information before it was modified. Will be `null` when an effect is being added.

### event.newEffect
The new state of the effect (after the change).

**Type:** `StatusEffectHelper` | `null`

**Notes**
This contains the effect information after it was modified. Will be `null` when an effect is being removed.

### event.added
Whether the effect was added or removed.

**Type:** `boolean`

**Notes**
- `true` - Effect was added
- `false` - Effect was removed

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`