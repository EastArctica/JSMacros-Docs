# AxolotlEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.AxolotlEntityHelper`

**Extends:** `AnimalEntityHelper<AxolotlEntity>`

The `AxolotlEntityHelper` class is a thin wrapper around Minecraft's `net.minecraft.entity.passive.AxolotlEntity`. It provides convenient methods for querying axolotl-specific states (variant, playing dead, bucket origin) while exposing the underlying entity through the `base` field inherited from `AnimalEntityHelper`.

## Overview
`AxolotlEntityHelper` is used when you have a reference to an axolotl entity (e.g., from a world scan, ray-trace, or entity event) and need to check or react to its axolotl-specific properties like its color variant, whether it's playing dead, or if it came from a bucket.

## Constructors

### new AxolotlEntityHelper(axolotlEntity)

Creates a new helper instance that wraps the supplied `AxolotlEntity`.

| Parameter | Type | Description |
|-----------|------|-------------|
| axolotlEntity | `net.minecraft.entity.passive.AxolotlEntity` | The raw Minecraft axolotl entity to wrap |

**Example**
```javascript
const rawAxolotl = EntityHelper.getEntityById(1234);
const axolotl = new AxolotlEntityHelper(rawAxolotl);
```

## Methods

- `getVariantId(): int` - Returns the ID of this axolotl's color variant (0-4, corresponding to Lucy, Wild, Gold, Cyan, Blue)
- `getVariantName(): string` - Returns the name of this axolotl's color variant
- `isPlayingDead(): boolean` - Returns true if the axolotl is currently playing dead
- `isFromBucket(): boolean` - Returns true if the axolotl came from a bucket

## Usage Examples

### Find and classify axolotls by variant

```javascript
const axolotls = WorldScanner.builder()
    .entity()
    .type("minecraft:axolotl")
    .build()
    .scan();

axolotls.forEach(rawAxolotl => {
    const axolotl = new AxolotlEntityHelper(rawAxolotl);
    const variantName = axolotl.getVariantName();
    Chat.log(`Found ${variantName} axolotl at ${axolotl.getPos()}`);
});
```

### Monitor playing dead behavior

```javascript
events.on("Tick", JavaWrapper.methodToJavaAsync(event => {
    const entities = World.getEntities()
        .filter(entity => entity.getType() === "minecraft:axolotl");

    entities.forEach(axolotlEntity => {
        const axolotl = new AxolotlEntityHelper(axolotlEntity.base);
        if (axolotl.isPlayingDead()) {
            Chat.log("Axolotl is playing dead!");
        }
    });
}));
```

### Highlight bucket axolotls

```javascript
const bucketAxolotls = WorldScanner.builder()
    .entity()
    .type("minecraft:axolotl")
    .addFilter(new ClassWrapperFilter(entity => {
        const helper = new AxolotlEntityHelper(entity);
        return helper.isFromBucket();
    }))
    .build()
    .scan();

bucketAxolotls.forEach(rawAxolotl => {
    const pos = rawAxolotl.getPos();
    const box = new Box(
        pos.x - 0.5, pos.y, pos.z - 0.5,
        pos.x + 0.5, pos.y + 1.0, pos.z + 0.5,
        0xFF00FF00, 0x8000FF00, true, false
    );
    Hud.createDraw3D().addBox(box);
});
```

---

*All code snippets are written for GraalJS scripts running under JsMacros.*