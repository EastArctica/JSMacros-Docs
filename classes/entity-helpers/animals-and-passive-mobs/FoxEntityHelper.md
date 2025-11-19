FoxEntityHelper
================

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.FoxEntityHelper`

**Extends:** `AnimalEntityHelper<FoxEntity>`

**Implements:**

Provides specialized methods for interacting with Fox entities, including variant checks, trust relationships, and behavioral state detection.

## Table of Contents
- [Constructor](#new-foxentityhelperfoxentity)
- [Methods](#methods)
  - [getItemInMouth()](#getiteminmouth)
  - [isSnowFox()](#issnowfox)
  - [isRedFox()](#isredfox)
  - [getOwner()](#getowner)
  - [getSecondOwner()](#getsecondowner)
  - [canTrust(entity)](#cantrustentity)
  - [hasFoundTarget()](#hasfoundtarget)
  - [isSitting()](#issitting)
  - [isWandering()](#iswandering)
  - [isSleeping()](#issleeping)
  - [isDefending()](#isdefending)
  - [isPouncing()](#ispouncing)
  - [isJumping()](#isjumping)
  - [isSneaking()](#issneaking)

## Constructor

### new FoxEntityHelper(foxEntity)

Creates a new FoxEntityHelper wrapper for the given Fox entity.

```js
// Get all foxes in the world and wrap them
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox").map(fox => fox.asLiving());
```

| Parameter | Type | Description |
|-----------|------|-------------|
| foxEntity | LivingEntityHelper | The fox entity to wrap |

## Methods

### getItemInMouth()

Returns the item currently in this fox's mouth.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    const itemInMouth = fox.getItemInMouth();
    if (itemInMouth.getItemId() !== "minecraft:air") {
        Chat.log(`Fox is holding ${itemInMouth.getName()}`);
    }
}
```

**Returns:** `ItemStackHelper` - The item in the fox's mouth, or air if empty.

### isSnowFox()

Returns whether this fox is a snow fox variant.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isSnowFox()) {
        Chat.log("Found a snow fox!");
    }
}
```

**Returns:** `boolean` - `true` if this is a snow fox, `false` otherwise.

### isRedFox()

Returns whether this fox is a red fox variant.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isRedFox()) {
        Chat.log("Found a red fox!");
    }
}
```

**Returns:** `boolean` - `true` if this is a red fox, `false` otherwise.

### getOwner()

Returns the UUID string of this fox's first owner, or null if it has no owner.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    const ownerUUID = fox.getOwner();
    if (ownerUUID) {
        Chat.log(`Fox owner: ${ownerUUID}`);
    }
}
```

**Returns:** `string|null` - The first owner's UUID as a string, or null if no owner exists.

### getSecondOwner()

Returns the UUID string of this fox's second owner, or null if it has no second owner.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    const secondOwnerUUID = fox.getSecondOwner();
    if (secondOwnerUUID) {
        Chat.log(`Fox second owner: ${secondOwnerUUID}`);
    }
}
```

**Returns:** `string|null` - The second owner's UUID as a string, or null if no second owner exists.

### canTrust(entity)

Returns whether this fox trusts the given entity based on ownership.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
const players = World.getPlayers();

for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    for (const player of players) {
        if (fox.canTrust(player)) {
            Chat.log(`${player.getName()} is trusted by this fox`);
        }
    }
}
```

**Returns:** `boolean` - `true` if the fox trusts the entity, `false` otherwise.

| Parameter | Type | Description |
|-----------|------|-------------|
| entity | EntityHelper | The entity to check trust relationship with |

### hasFoundTarget()

Returns whether this fox is preparing its jump (has found a target).

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.hasFoundTarget()) {
        Chat.log("This fox has spotted prey!");
    }
}
```

**Returns:** `boolean` - `true` if the fox has found a target, `false` otherwise.

### isSitting()

Returns whether this fox is currently sitting.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isSitting()) {
        Chat.log("This fox is taking a break");
    }
}
```

**Returns:** `boolean` - `true` if the fox is sitting, `false` otherwise.

### isWandering()

Returns whether this fox is wandering around.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isWandering()) {
        Chat.log("This fox is exploring");
    }
}
```

**Returns:** `boolean` - `true` if the fox is wandering, `false` otherwise.

### isSleeping()

Returns whether this fox is currently sleeping.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isSleeping()) {
        Chat.log("This fox is sleeping");
    }
}
```

**Returns:** `boolean` - `true` if the fox is sleeping, `false` otherwise.

### isDefending()

Returns whether this fox is defending another fox.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isDefending()) {
        Chat.log("This fox is defending its kin!");
    }
}
```

**Returns:** `boolean` - `true` if the fox is defending, `false` otherwise.

### isPouncing()

Returns whether this fox is just before its leap (pouncing).

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isPouncing()) {
        Chat.log("Watch out - fox is about to pounce!");
    }
}
```

**Returns:** `boolean` - `true` if the fox is pouncing, `false` otherwise.

### isJumping()

Returns whether this fox is currently jumping.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isJumping()) {
        Chat.log("This fox is leaping through the air");
    }
}
```

**Returns:** `boolean` - `true` if the fox is jumping, `false` otherwise.

### isSneaking()

Returns whether this fox is sneaking in preparation of an attack.

```js
const foxes = World.getEntities().filter(e => e.getType() === "minecraft:fox");
for (const foxEntity of foxes) {
    const fox = foxEntity.asLiving();
    if (fox.isSneaking()) {
        Chat.log("This fox is stalking its prey");
    }
}
```

**Returns:** `boolean` - `true` if the fox is sneaking, `false` otherwise.