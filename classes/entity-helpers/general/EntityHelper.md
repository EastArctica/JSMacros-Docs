# EntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.EntityHelper`

**Extends:** `BaseHelper<Entity>`

The `EntityHelper` class is a fundamental wrapper for Minecraft entities in JSMacros, providing access to entity properties, behaviors, and interactions. It serves as the base class for all entity-related helpers and offers comprehensive methods for querying entity information, positions, states, and performing various operations on entities.

This class is typically obtained through events, world queries, or as return values from other helper methods. EntityHelper instances represent specific entity objects in the game world, containing their current state and position.

## Constructors

EntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`)
- World entity queries and searches
- Methods that return entities (e.g., `Player.getPlayer()`)
- The static `EntityHelper.create()` method for internal use

## Methods

### Position and Movement

- [entity.getPos()](#entitygetpos)
- [entity.getBlockPos()](#entitygetblockpos)
- [entity.getEyePos()](#entitygeteyepos)
- [entity.getChunkPos()](#entitygetchunkpos)
- [entity.getX()](#entitygetx)
- [entity.getY()](#entitygety)
- [entity.getZ()](#entitygetz)
- [entity.getEyeHeight()](#entitygeteyeheight)
- [entity.getVelocity()](#entitygetvelocity)
- [entity.getSpeed()](#entitygetspeed)
- [entity.getFacingDirection()](#entitygetfacingdirection)

### Entity Information

- [entity.getName()](#entitygetname)
- [entity.getType()](#entitygettype)
- [entity.is()](#entityis)
- [entity.getUUID()](#entitygetuuid)
- [entity.getBiome()](#entitygetbiome)
- [entity.getChunk()](#entitygetchunk)
- [entity.getNBT()](#entitygetnbt)

### State and Conditions

- [entity.isAlive()](#entityisalive)
- [entity.isGlowing()](#entityisglowing)
- [entity.isInLava()](#entityisinlava)
- [entity.isOnFire()](#entityisonfire)
- [entity.isSneaking()](#entityissneaking)
- [entity.isSprinting()](#entityissprinting)
- [entity.getAir()](#entitygetair)
- [entity.getMaxAir()](#entitygetmaxair)

### Appearance and Effects

- [entity.setCustomName()](#entitysetcustomname)
- [entity.setCustomNameVisible()](#entitysetcustomnamevisible)
- [entity.setGlowing()](#entitysetglowing)
- [entity.setGlowingColor()](#entitysetglowingcolor)
- [entity.getGlowingColor()](#entitygetglowingcolor)
- [entity.resetGlowing()](#entityresetglowing)
- [entity.resetGlowingColor()](#entityresetglowingcolor)

### Relationships and Passengers

- [entity.getVehicle()](#entitygetvehicle)
- [entity.getPassengers()](#entitygetpassengers)

### Interaction and Raytracing

- [entity.rayTraceBlock()](#entityraytraceblock)
- [entity.rayTraceEntity()](#entityraytraceentity)

### Distance and Comparison

- [entity.distanceTo()](#entitydistanceto)

### Type Casting

- [entity.asClientPlayer()](#entityasclientplayer)
- [entity.asPlayer()](#entityasplayer)
- [entity.asVillager()](#entityasvillager)
- [entity.asMerchant()](#entityasmerchant)
- [entity.asLiving()](#entityasliving)
- [entity.asAnimal()](#entityasanimal)
- [entity.asItem()](#entityasitem)
- [entity.asServerEntity()](#entityasserverentity)

### Utility Methods

- [entity.toString()](#entitytostring)

---

## Position and Movement

## Entity Information

## State and Conditions

## Appearance and Effects

## Relationships and Passengers

## Interaction and Raytracing

## Distance and Comparison

## Type Casting

## Utility Methods

## Usage Examples

### Basic Entity Scanning
```js
// Scan for entities in the area
function scanEntities() {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const entities = World.getEntities();

    Chat.log("=== Entity Scan ===");
    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= 50) { // Only nearby entities
            const name = entity.getName().getString();
            const type = entity.getType();
            const pos = entity.getPos();

            Chat.log(`${name} (${type}) - ${distance.toFixed(1)}m at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
        }
    });
}

scanEntities();
```

### Entity Monitoring System
```js
// Track entity states and conditions
class EntityTracker {
    constructor() {
        this.trackedEntities = new Map();
    }

    startTracking(entity) {
        const uuid = entity.getUUID();
        const name = entity.getName().getString();

        this.trackedEntities.set(uuid, {
            entity: entity,
            name: name,
            lastPos: entity.getPos(),
            lastHealth: entity.asLiving ? entity.asLiving().getHealth() : null
        });

        Chat.log(`Started tracking ${name} (${uuid})`);
    }

    updateTracking() {
        for (const [uuid, data] of this.trackedEntities) {
            if (!data.entity.isAlive()) {
                Chat.log(`${data.name} has died or disappeared`);
                this.trackedEntities.delete(uuid);
                continue;
            }

            const currentPos = data.entity.getPos();
            const distance = currentPos.distanceTo(data.lastPos);

            if (distance > 1) {
                Chat.log(`${data.name} moved ${distance.toFixed(1)} blocks`);
                data.lastPos = currentPos;
            }

            // Check health if it's a living entity
            if (data.entity.asLiving) {
                const living = data.entity.asLiving();
                const currentHealth = living.getHealth();
                if (currentHealth !== data.lastHealth) {
                    Chat.log(`${data.name} health: ${currentHealth.toFixed(1)}`);
                    data.lastHealth = currentHealth;
                }
            }
        }
    }

    stopTracking(uuid) {
        if (this.trackedEntities.has(uuid)) {
            const data = this.trackedEntities.get(uuid);
            Chat.log(`Stopped tracking ${data.name}`);
            this.trackedEntities.delete(uuid);
        }
    }
}

const tracker = new EntityTracker();

// Track entities when they spawn
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();

    // Track important entities
    if (entity.is("minecraft:creeper", "minecraft:zombie") ||
        entity.is("minecraft:villager", "minecraft:wandering_trader")) {
        tracker.startTracking(entity);
    }
}));

// Update tracking every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks
        tracker.updateTracking();
    }
}));
```

### Entity Highlighting System
```js
// Highlight different entity types with different colors
function highlightEntities() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const range = 32;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);

        if (distance <= range) {
            // Reset previous highlights
            entity.resetGlowing();

            // Apply new highlights based on entity type
            if (entity.is("minecraft:player")) {
                if (entity === player) {
                    entity.setGlowingColor(0x00FF00); // Green for self
                } else {
                    entity.setGlowingColor(0x0080FF); // Blue for other players
                }
                entity.setGlowing(true);
            } else if (entity.is("minecraft:creeper")) {
                entity.setGlowingColor(0xFF00FF); // Magenta for creepers
                entity.setGlowing(true);
            } else if (entity.is("minecraft:zombie", "minecraft:skeleton")) {
                entity.setGlowingColor(0xFF0000); // Red for hostile mobs
                entity.setGlowing(true);
            } else if (entity.is("minecraft:villager")) {
                entity.setGlowingColor(0xFFFF00); // Yellow for villagers
                entity.setGlowing(true);
            } else if (entity.is("minecraft:cow", "minecraft:pig", "minecraft:sheep")) {
                entity.setGlowingColor(0x80FF80); // Light green for passive animals
                entity.setGlowing(true);
            } else if (entity.is("minecraft:item")) {
                entity.setGlowingColor(0xFFA500); // Orange for items
                entity.setGlowing(true);
            }
        } else {
            entity.resetGlowing();
        }
    });
}

// Update highlights every 5 ticks
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 5 === 0) {
        highlightEntities();
    }
}));
```

### Entity Analytics
```js
// Collect and display entity statistics
function analyzeEntities() {
    const entities = World.getEntities();
    const stats = {
        total: entities.length,
        players: 0,
        hostiles: 0,
        passive: 0,
        items: 0,
        vehicles: 0,
        others: 0
    };

    const entitiesByType = new Map();
    const entitiesByDistance = { near: 0, medium: 0, far: 0 };

    const player = Player.getPlayer();
    if (!player) return;

    entities.forEach(entity => {
        const type = entity.getType();

        // Count by type
        entitiesByType.set(type, (entitiesByType.get(type) || 0) + 1);

        // Count by distance
        const distance = player.distanceTo(entity);
        if (distance <= 16) entitiesByDistance.near++;
        else if (distance <= 64) entitiesByDistance.medium++;
        else entitiesByDistance.far++;

        // Count by category
        if (entity.is("minecraft:player")) {
            stats.players++;
        } else if (entity.is(
            "minecraft:zombie", "minecraft:skeleton", "minecraft:creeper",
            "minecraft:spider", "minecraft:enderman", "minecraft:witch"
        )) {
            stats.hostiles++;
        } else if (entity.is(
            "minecraft:cow", "minecraft:pig", "minecraft:sheep",
            "minecraft:chicken", "minecraft:villager"
        )) {
            stats.passive++;
        } else if (entity.is("minecraft:item")) {
            stats.items++;
        } else if (entity.is("minecraft:boat", "minecraft:minecart")) {
            stats.vehicles++;
        } else {
            stats.others++;
        }
    });

    // Display results
    Chat.log("=== Entity Analytics ===");
    Chat.log(`Total entities: ${stats.total}`);
    Chat.log(`Players: ${stats.players}`);
    Chat.log(`Hostile mobs: ${stats.hostiles}`);
    Chat.log(`Passive mobs: ${stats.passive}`);
    Chat.log(`Items: ${stats.items}`);
    Chat.log(`Vehicles: ${stats.vehicles}`);
    Chat.log(`Others: ${stats.others}`);

    Chat.log("\nBy Distance:");
    Chat.log(`Near (≤16m): ${entitiesByDistance.near}`);
    Chat.log(`Medium (16-64m): ${entitiesByDistance.medium}`);
    Chat.log(`Far (>64m): ${entitiesByDistance.far}`);

    Chat.log("\nTop 5 Entity Types:");
    const sortedTypes = Array.from(entitiesByType.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    sortedTypes.forEach(([type, count]) => {
        Chat.log(`  ${type}: ${count}`);
    });
}

analyzeEntities();
```

## Notes and Limitations

- EntityHelper instances become invalid when the entity is removed from the world. Always check `isAlive()` before accessing entity data.
- The `as*()` casting methods can throw `ClassCastException` if the entity is not of the expected type. Use `is()` to check types first.
- Some methods like `setGlowing()` and `setCustomName()` may not work on all entity types or in all situations.
- Position methods return different coordinate systems - `getPos()` returns world coordinates while `getBlockPos()` returns block coordinates.
- NBT data access is read-only for some entity types and may not include all possible NBT tags.
- Raytracing methods may return null if no entity or block is found within the specified distance.
- Distance calculations use different precision levels - `float` for entity-to-entity, `double` for position-based calculations.

## Related Classes

- `LivingEntityHelper` - Base class for living entities with health, movement, and combat properties
- `PlayerEntityHelper` - Player-specific functionality and additional methods
- `ClientPlayerEntityHelper` - Client-side player with additional rendering and input methods
- `Pos3D` - 3D position and vector mathematics
- `BlockPosHelper` - Block-specific position handling
- `NBTElementHelper` - NBT data access and manipulation
- `DirectionHelper` - Cardinal directions and facing operations
- `ChunkHelper` - Chunk-level entity and block operations

## Version Information

- Available since JSMacros 1.0.0
- Extensively updated in 1.8.4 with new methods for movement, raytracing, and world interaction
- Type casting methods added in 1.6.3 for better TypeScript support
- Entity type checking with `is()` method added in 1.9.0