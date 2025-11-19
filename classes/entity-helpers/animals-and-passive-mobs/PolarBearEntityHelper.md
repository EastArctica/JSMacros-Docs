# PolarBearEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.PolarBearEntityHelper`

**Extends:** `AnimalEntityHelper<PolarBearEntity>`

The `PolarBearEntityHelper` class provides specialized access to polar bear entities in Minecraft. It offers methods to monitor polar‑bear‑specific behaviors such as the bear’s aggressive stance (standing up to attack). This helper is a thin wrapper around the underlying `PolarBearEntity` Minecraft class and inherits all functionality from `AnimalEntityHelper`, `MobEntityHelper`, `LivingEntityHelper`, and `EntityHelper`.

This helper is useful for scripts that need to react to polar bears, for example warning the player when a bear is about to charge, or integrating polar‑bear‑related mechanics into custom automation.

## Constructors

`PolarBearEntityHelper` instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity‑related events (e.g., `EntitySpawn`, `EntityInteract`, `EntityDeath`).
- World entity queries using type filtering.
- Casting from a generic `EntityHelper` via `entity.asPolarBear()` (or similar helper methods).

## Methods

### Polar Bear‑Specific State

- [`polarBear.isAttacking()`](#polarbearisattacking)

### Inherited Methods

The `PolarBearEntityHelper` inherits all methods from:

- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** health, status effects, equipment, movement states
- **EntityHelper:** position, movement, world interaction, type casting

---

## Polar Bear‑Specific State

### `polarBear.isAttacking()`

```js
// Returns true if the polar bear is currently standing up to attack.
// Returns false otherwise.
polarBear.isAttacking();
```

- **Return type:** `boolean`
- **Since:** JSMacros 1.8.4
- **Description:** Delegates to `PolarBearEntity.isWarning()` in Minecraft, which is true when the bear adopts its aggressive, upright stance.

---

## Usage Examples

### Simple Alert When a Polar Bear Charges

```js
// Continuously monitor nearby polar bears and warn the player when one is about to attack.
class PolarBearWatcher {
    constructor() {
        this.scanRadius = 20; // blocks
    }

    checkBears() {
        const player = Player.getPlayer();
        if (!player) return;
        const entities = World.getEntities(this.scanRadius);
        entities.forEach(e => {
            if (e.is("minecraft:polar_bear")) {
                const bear = e.asPolarBear();
                if (bear.isAttacking()) {
                    // Highlight the bear and send a warning
                    e.setGlowing(true);
                    e.setGlowingColor(0xFF0000); // red
                    Chat.actionbar("&cWarning: Polar bear is charging!");
                } else {
                    e.resetGlowing();
                }
            }
        });
    }
}

const watcher = new PolarBearWatcher();

// Run every tick for real‑time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    watcher.checkBears();
}));
```

### Integrating with a Custom Danger System

```js
// Example of adding polar‑bear danger levels to a broader mob‑danger monitoring script
function evaluateDanger(entityHelper) {
    if (entityHelper instanceof PolarBearEntityHelper && entityHelper.isAttacking()) {
        return { level: "high", reason: "Polar bear charging" };
    }
    // other entity checks …
    return { level: "low", reason: "No immediate threat" };
}
```

## Notes and Limitations

- `PolarBearEntityHelper` instances become invalid when the underlying entity is removed from the world (dies, despawns, or the chunk unloads). Always verify `isAlive()` before accessing helper methods.
- `isAttacking()` reflects the *warning* state used by Minecraft to indicate an imminent charge. The bear may still be idle for a short period after this flag becomes true.
- Polar bears do not breed in vanilla Minecraft; therefore, `AnimalEntityHelper` breeding methods are present but effectively no‑ops for this species.
- Visual effects such as `setGlowing()` and `setGlowingColor()` can be used to highlight dangerous bears for the player.

## Related Classes

- `AnimalEntityHelper` – Base class for passive animal helpers providing food and breeding utilities.
- `MobEntityHelper` – Base class for mob entities with AI and combat state helpers.
- `LivingEntityHelper` – Provides health, status effects, and equipment handling.
- `EntityHelper` – Core entity functionality for position, movement, and world interaction.

## Version Information

- Available since JSMacros **1.8.4**.
- Part of the specialized passive animal helper classes for enhanced entity type support.
- All methods delegate to the underlying Minecraft `PolarBearEntity` implementation.
- Inherits comprehensive functionality from the animal‑entity hierarchy.
