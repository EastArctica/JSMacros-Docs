# HitResultHelper

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`
**Since:** 1.9.1
**Author:** aMelonRind

## Overview

The `HitResultHelper` class is a World Interaction helper in JSMacros that provides access to ray casting and hit detection results in Minecraft. It represents the result of a ray trace operation, which can hit blocks, entities, or miss entirely. This class is essential for determining what the player is looking at and for implementing targeting systems in scripts.

The class uses a generic type system and provides specialized subclasses for different types of hit results: blocks and entities.

## Class Hierarchy

```
HitResultHelper<T>
├── Block (for block hit results)
└── Entity (for entity hit results)
```

## Accessing Hit Results

You can obtain HitResultHelper instances through several methods:

## Base HitResultHelper Methods

These methods are available on all HitResultHelper instances:

### `getPos()`
**Returns:** `Pos3D` - The exact 3D position where the ray hit

Gets the precise world coordinates where the ray trace made contact.

```js
const hitResult = player.getInteractionManager().getTarget();
if (hitResult) {
    const hitPos = hitResult.getPos();
    console.log(`Hit position: ${hitPos.x}, ${hitPos.y}, ${hitPos.z}`);
}
```

### `asBlock()`
**Returns:** `HitResultHelper.Block` or `null` - Casts to block hit result if applicable

Attempts to cast the hit result to a block-specific type. Returns `null` if the hit result is not a block.

```js
const hitResult = player.getInteractionManager().getTarget();
if (hitResult) {
    const blockHit = hitResult.asBlock();
    if (blockHit) {
        console.log("Hit a block!");
    }
}
```

### `asEntity()`
**Returns:** `HitResultHelper.Entity` or `null` - Casts to entity hit result if applicable

Attempts to cast the hit result to an entity-specific type. Returns `null` if the hit result is not an entity.

```js
const hitResult = player.getInteractionManager().getTarget();
if (hitResult) {
    const entityHit = hitResult.asEntity();
    if (entityHit) {
        const entity = entityHit.getEntity();
        console.log(`Hit entity: ${entity.getType()}`);
    }
}
```

## Static Methods

### `resolve(HitResult hr)`
**Returns:** `HitResultHelper<?>` or `null` - Resolves a Minecraft HitResult to appropriate helper type

This is an internal method that converts the raw Minecraft HitResult into the appropriate HitResultHelper subclass (Block, Entity, or generic).

```js
// This method is typically used internally by JSMacros
// You would normally use the helper methods provided by other classes
```

## Usage Examples

### Example 1: Block Target Detection
```js
// Check what block the player is looking at
const blockHit = player.detailedRayTraceBlock(5.0, false);

if (blockHit && !blockHit.isMissed()) {
    const blockPos = blockHit.getBlockPos();
    const side = blockHit.getSide();
    const hitPos = blockHit.getPos();

    console.log(`Looking at block at ${blockPos.getX()}, ${blockPos.getY()}, ${blockPos.getZ()}`);
    console.log(`Hit face: ${side.getName()}`);
    console.log(`Exact hit position: ${hitPos.x}, ${hitPos.y}, ${hitPos.z}`);

    // Check if it's a specific block type
    const blockData = World.getBlock(blockPos.getX(), blockPos.getY(), blockPos.getZ());
    if (blockData.getName() === "minecraft:diamond_ore") {
        console.log("Found diamond ore!");
    }
}
```

### Example 2: Entity Detection and Interaction
```js
// Check what entity the player is looking at
const hitResult = player.getInteractionManager().getTarget();

if (hitResult) {
    const entityHit = hitResult.asEntity();
    if (entityHit) {
        const entity = entityHit.getEntity();
        const hitPos = entityHit.getPos();

        console.log(`Looking at ${entity.getType()}`);
        console.log(`Distance: ${player.distanceTo(entity)}`);

        // Only attack hostile mobs
        if (entity.isHostile() && player.distanceTo(entity) < 4.0) {
            player.attack(entity);
        }
    }
}
```

### Example 3: Line of Sight Checking
```js
// Check if player has clear line of sight to a target position
function hasLineOfSight(targetX, targetY, targetZ, distance = 50) {
    const hitResult = player.getInteractionManager().getTarget();

    if (hitResult && !hitResult.isMissed()) {
        const hitPos = hitResult.getPos();
        const playerPos = player.getPos();

        // Calculate if hit is closer than target
        const distToHit = Math.sqrt(
            Math.pow(hitPos.x - playerPos.x, 2) +
            Math.pow(hitPos.y - playerPos.y, 2) +
            Math.pow(hitPos.z - playerPos.z, 2)
        );

        const distToTarget = Math.sqrt(
            Math.pow(targetX - playerPos.x, 2) +
            Math.pow(targetY - playerPos.y, 2) +
            Math.pow(targetZ - playerPos.z, 2)
        );

        return distToHit >= distToTarget;
    }

    return true; // No obstruction
}
```

### Example 4: Block Breaking Assistant
```js
// Smart block breaking that hits from the correct face
function breakBlock(targetX, targetY, targetZ) {
    // Look at the target block
    const blockHit = player.detailedRayTraceBlock(6.0, false);

    if (blockHit && !blockHit.isMissed()) {
        const blockPos = blockHit.getBlockPos();

        if (blockPos.getX() === targetX &&
            blockPos.getY() === targetY &&
            blockPos.getZ() === targetZ) {

            // We're looking at the right block
            player.attackBlock(blockPos);
            console.log(`Started breaking block at ${targetX}, ${targetY}, ${targetZ}`);
            return true;
        }
    }

    console.log("Not looking at the target block");
    return false;
}
```

## Important Notes

1. **Ray Trace Distance:** The maximum distance for ray traces is typically limited by Minecraft's render distance and the distance parameter you specify.

2. **Fluid Handling:** Some ray trace methods include a `fluid` parameter that determines whether the ray will stop at water or other fluids.

3. **Performance:** Ray tracing operations can be computationally expensive if called frequently. Consider caching results when possible.

4. **Null Safety:** Always check for null returns when working with hit results, as they may return null if no target is found.

5. **Block vs Entity:** Hit results can represent either blocks or entities. Always check the type using `asBlock()` or `asEntity()` before accessing type-specific methods.

6. **Coordinate Systems:**
   - `getPos()` returns the exact hit position (may include decimals)
   - `getBlockPos()` returns integer block coordinates
   - Both use Minecraft's world coordinate system

7. **Direction Faces:** Block faces follow Minecraft's direction naming: "up", "down", "north", "south", "east", "west"

## Related Classes

- [`DirectionHelper`](DirectionHelper.md) - For working with block face directions
- [`BlockPosHelper`](BlockPosHelper.md) - For working with block coordinates
- [`EntityHelper`](EntityHelper.md) - For working with entities
- [`Pos3D`](Pos3D.md) - For working with 3D positions
- [`Player`](Player.md) - For player-related ray trace methods
- [`InteractionManagerHelper`](InteractionManagerHelper.md) - For getting current target

## Best Practices

1. **Always validate hit results** before accessing their properties
2. **Use appropriate distance limits** to balance performance and functionality
3. **Consider both blocks and entities** when implementing targeting systems
4. **Cache results** when performing multiple checks on the same target
5. **Handle edge cases** like missed targets or null returns gracefully



