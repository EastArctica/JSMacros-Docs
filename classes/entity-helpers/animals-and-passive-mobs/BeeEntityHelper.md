# BeeEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.BeeEntityHelper`
**Extends:** `AnimalEntityHelper<net.minecraft.entity.passive.BeeEntity>`

The `BeeEntityHelper` class is a thin wrapper around Minecraft’s `net.minecraft.entity.passive.BeeEntity`. It provides convenient methods for querying the bee’s state (nectar, anger, stinging) while exposing the underlying entity through the `base` field inherited from `AnimalEntityHelper`.

## Overview
`BeeEntityHelper` is used when you have a reference to a bee entity (e.g., from a world scan, ray‑trace, or entity event) and need to check or react to its bee‑specific properties.

## Constructors
### `new BeeEntityHelper(beeEntity)`
Creates a new helper instance that wraps the supplied `BeeEntity`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `beeEntity` | `net.minecraft.entity.passive.BeeEntity` | The raw Minecraft bee entity to wrap. |

**Example**
```javascript
const rawBee = EntityHelper.getEntityById(1234);
const bee = new BeeEntityHelper(rawBee);
```

## Methods
- `hasNectar(): boolean` – Returns true if the bee currently holds nectar.
- `isAngry(): boolean` – Returns true if the bee is angry at a player.
- `hasStung(): boolean` – Returns true if the bee has already stung a player.

## Usage Examples
### Highlight all angry bees in the world
```javascript
const bees = WorldScanner.builder()
    .entity()
    .type("minecraft:bee")
    .build()
    .scan();
bees.forEach(rawBee => {
    const bee = new BeeEntityHelper(rawBee);
    if (bee.isAngry()) {
        const pos = bee.getPos();
        const box = new Box(
            pos.x - 0.5, pos.y, pos.z - 0.5,
            pos.x + 0.5, pos.y + 1.0, pos.z + 0.5,
            0xFFFF0000, 0x80FF0000, true, false
        );
        Hud.createDraw3D().addBox(box);
    }
});
```

### Log when a bee drops nectar
```javascript
events.on("EntityDropItem", JavaWrapper.methodToJavaAsync(event => {
    const entity = event.entity;
    if (entity.getType() === "minecraft:bee") {
        const bee = new BeeEntityHelper(entity);
        if (bee.hasNectar()) {
            Chat.log(`Bee ${entity.getUuid()} just dropped nectar!`);
        }
    }
}));
```

---

*All code snippets are written for GraalJS scripts running under JsMacros.*