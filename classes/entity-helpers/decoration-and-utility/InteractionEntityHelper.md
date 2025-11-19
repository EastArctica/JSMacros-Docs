# InteractionEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.other.InteractionEntityHelper`

**Extends:** `EntityHelper<InteractionEntity>`

The `InteractionEntityHelper` class provides specialized methods for interacting with Minecraft's interaction entities (introduced in 1.19.4). Interaction entities are invisible, non-collidable entities that define interaction areas for players to click or interact with, commonly used in custom maps, data packs, and mods to create invisible buttons, triggers, or interaction zones without visible entities.

This helper allows you to query interaction properties such as dimensions, interaction state, attacker tracking, and configure whether the entity can be hit. It's particularly useful for detecting custom interaction mechanisms, monitoring player engagement with invisible triggers, and managing interaction-based systems in adventure maps or custom game modes.

## Constructors

InteractionEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity type is `minecraft:interaction`
- World entity queries using `World.getEntities()` with interaction entity filtering
- Type casting from generic `EntityHelper` instances using `entity.as()` methods
- Entity type checking with `entity.is("minecraft:interaction")`

## Methods

### Interaction Properties

- [entity.setCanHit(value)](#entitysetcanhitvalue)
- [entity.getWidth()](#entitygetwidth)
- [entity.getHeight()](#entitygetheight)
- [entity.shouldRespond()](#entityshouldrespond)

### Entity Tracking

- [entity.getLastAttacker()](#entitygetlastattacker)
- [entity.getLastInteracted()](#entitygetlastinteracted)

### Inherited Methods

As this extends `EntityHelper`, all standard entity methods are available including:
- Position and movement methods (`getPos()`, `getVelocity()`, etc.)
- World interaction methods (`distanceTo()`, `isAlive()`, etc.)
- Entity identification methods (`getUUID()`, `getType()`, `getName()`, etc.)

---

## Interaction Properties

### entity.setCanHit(value)

Sets whether the interaction entity can be hit by players or other entities.

```js
// Example: Make an interaction entity hittable
const interactionEntities = World.getEntities("minecraft:interaction");

interactionEntities.forEach(entity => {
    const interaction = entity.as();
    interaction.setCanHit(true);
    Chat.log(`Made interaction entity at [${entity.getPos().x.toFixed(1)}, ${entity.getPos().y.toFixed(1)}, ${entity.getPos().z.toFixed(1)}] hittable`);
});
```

**Parameters:**
1. `value: boolean` - Whether the entity can be hit (`true`) or not (`false`)

**Notes:**
- This modifies the client-side hit behavior for the interaction entity
- The change may not persist across server restarts or entity respawns
- Some servers may override this setting based on their configuration

### entity.getWidth()

Returns the width of the interaction entity's collision/interaction box.

```js
// Example: Check interaction entity sizes
const interactions = World.getEntities("minecraft:interaction");

interactions.forEach(entity => {
    const interaction = entity.as();
    const width = interaction.getWidth();
    const height = interaction.getHeight();
    const pos = entity.getPos();

    Chat.log(`Interaction at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]:`);
    Chat.log(`  Size: ${width.toFixed(2)} x ${height.toFixed(2)} blocks`);
});
```

**Returns:**
* `float: number` - The width of the interaction entity in blocks

### entity.getHeight()

Returns the height of the interaction entity's collision/interaction box.

```js
// Example: Find tall interaction entities (potential vertical triggers)
const interactions = World.getEntities("minecraft:interaction");

const tallInteractions = interactions.filter(entity => {
    const interaction = entity.as();
    return interaction.getHeight() > 2.0; // Taller than 2 blocks
});

Chat.log(`Found ${tallInteractions.length} tall interaction entities:`);
tallInteractions.forEach(entity => {
    const interaction = entity.as();
    const pos = entity.getPos();
    Chat.log(`  Height ${interaction.getHeight().toFixed(2)} at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
});
```

**Returns:**
* `float: number` - The height of the interaction entity in blocks

### entity.shouldRespond()

Checks whether the interaction entity should respond to player interactions.

```js
// Example: Monitor responsive interaction entities
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const interactions = World.getEntities("minecraft:interaction");
    const player = Player.getPlayer();

    if (!player) return;

    interactions.forEach(entity => {
        const interaction = entity.as();
        const distance = player.distanceTo(entity);

        // Only check nearby interactions
        if (distance <= 10) {
            const shouldRespond = interaction.shouldRespond();
            const pos = entity.getPos();

            if (shouldRespond) {
                Chat.actionbar(`Interactive zone at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}] (${distance.toFixed(1)}m)`);
            }
        }
    });
}));
```

**Returns:**
* `boolean: boolean` - `true` if the interaction entity should respond to interactions, `false` otherwise

---

## Entity Tracking

### entity.getLastAttacker()

Returns the last entity that attacked the interaction entity, if any.

```js
// Example: Monitor attacks on interaction entities
class InteractionMonitor {
    constructor() {
        this.lastAttackers = new Map();
    }

    checkAttacks() {
        const interactions = World.getEntities("minecraft:interaction");

        interactions.forEach(entity => {
            const interaction = entity.as();
            const lastAttacker = interaction.getLastAttacker();
            const entityId = entity.getUUID();

            if (lastAttacker) {
                const attackerName = lastAttacker.getName().getString();
                const previousAttacker = this.lastAttackers.get(entityId);

                // Check if this is a new attacker
                if (!previousAttacker || previousAttacker !== attackerName) {
                    const pos = entity.getPos();
                    Chat.log(`${attackerName} attacked interaction at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
                    this.lastAttackers.set(entityId, attackerName);
                }
            } else {
                // Clear attacker if none found (entity may have been reset)
                this.lastAttackers.delete(entityId);
            }
        });
    }
}

const monitor = new InteractionMonitor();

events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    monitor.checkAttacks();
}));
```

**Returns:**
* `EntityHelper<?> | null` - The last attacker entity, or `null` if no attacker exists

**Notes:**
- Returns `null` if no entity has recently attacked the interaction entity
- The attacker information may be cleared after a certain time period
- This can be useful for tracking which players are interacting with custom triggers

### entity.getLastInteracted()

Returns the last entity that interacted with the interaction entity, if any.

```js
// Example: Track interaction patterns
class InteractionTracker {
    constructor() {
        this.interactionHistory = new Map();
        this.maxHistory = 10;
    }

    recordInteraction(entity) {
        const interaction = entity.as();
        const lastInteracted = interaction.getLastInteracted();
        const entityId = entity.getUUID();
        const pos = entity.getPos();

        if (lastInteracted) {
            const entityName = lastInteracted.getName().getString();
            const timestamp = Date.now();

            // Get or create history for this interaction
            if (!this.interactionHistory.has(entityId)) {
                this.interactionHistory.set(entityId, []);
            }

            const history = this.interactionHistory.get(entityId);

            // Add new interaction record
            history.push({
                entity: entityName,
                time: timestamp,
                position: { x: pos.x, y: pos.y, z: pos.z }
            });

            // Limit history size
            if (history.length > this.maxHistory) {
                history.shift();
            }

            // Log the interaction
            Chat.log(`${entityName} interacted with zone at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        }
    }

    getInteractionReport(entityId) {
        const history = this.interactionHistory.get(entityId) || [];
        return history.map(record => `${record.entity} at ${new Date(record.time).toLocaleTimeString()}`).join(", ");
    }
}

const tracker = new InteractionTracker();

// Monitor interactions every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const interactions = World.getEntities("minecraft:interaction");
    interactions.forEach(entity => tracker.recordInteraction(entity));
}));
```

**Returns:**
* `EntityHelper<?> | null` - The last entity that interacted with the interaction entity, or `null` if no interaction exists

**Notes:**
- Returns `null` if no entity has recently interacted with the interaction entity
- This method tracks successful interactions, not just attempts
- Useful for monitoring usage patterns of custom interaction zones

---

## Usage Examples

### Complete Interaction Entity Scanner

```js
// Comprehensive interaction entity analysis
function scanInteractionEntities(range = 100) {
    const player = Player.getPlayer();
    if (!player) return;

    const interactions = World.getEntities("minecraft:interaction");
    const playerPos = player.getPos();
    const nearbyInteractions = interactions.filter(entity =>
        player.distanceTo(entity) <= range
    );

    Chat.log(`=== Interaction Entity Scan (${range} block range) ===`);
    Chat.log(`Found ${interactions.length} interaction entities total, ${nearbyInteractions.length} nearby`);

    if (nearbyInteractions.length === 0) {
        Chat.log("No interaction entities found nearby");
        return;
    }

    let responsiveCount = 0;
    let hittableCount = 0;
    let totalVolume = 0;

    nearbyInteractions.forEach((entity, index) => {
        const interaction = entity.as();
        const pos = entity.getPos();
        const distance = player.distanceTo(entity);
        const width = interaction.getWidth();
        const height = interaction.getHeight();
        const shouldRespond = interaction.shouldRespond();
        const volume = width * height;

        totalVolume += volume;
        if (shouldRespond) responsiveCount++;

        Chat.log(`\n${index + 1}. Interaction at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] (${distance.toFixed(1)}m):`);
        Chat.log(`   Size: ${width.toFixed(2)} x ${height.toFixed(2)} x ${width.toFixed(2)} (Volume: ${volume.toFixed(2)})`);
        Chat.log(`   Responsive: ${shouldRespond ? "Yes" : "No"}`);

        // Check for recent interactions
        const lastInteracted = interaction.getLastInteracted();
        const lastAttacker = interaction.getLastAttacker();

        if (lastInteracted) {
            Chat.log(`   Last Interacted: ${lastInteracted.getName().getString()}`);
        }

        if (lastAttacker) {
            Chat.log(`   Last Attacker: ${lastAttacker.getName().getString()}`);
        }

        if (!lastInteracted && !lastAttacker) {
            Chat.log(`   No recent activity detected`);
        }
    });

    // Summary statistics
    Chat.log(`\n=== Summary ===`);
    Chat.log(`Responsive interactions: ${responsiveCount}/${nearbyInteractions.length}`);
    Chat.log(`Total interaction volume: ${totalVolume.toFixed(2)} cubic blocks`);
    Chat.log(`Average interaction size: ${(totalVolume / nearbyInteractions.length).toFixed(2)} cubic blocks`);
}

scanInteractionEntities();
```

### Interaction Zone Activation Monitor

```js
// Monitor when players activate interaction zones
class InteractionZoneMonitor {
    constructor() {
        this.activationHistory = new Map();
        this.cooldownPeriod = 5000; // 5 seconds between reports for same zone
    }

    checkActivations() {
        const interactions = World.getEntities("minecraft:interaction");
        const currentTime = Date.now();

        interactions.forEach(entity => {
            const interaction = entity.as();
            const lastInteracted = interaction.getLastInteracted();
            const entityId = entity.getUUID();
            const pos = entity.getPos();

            if (lastInteracted) {
                const entityName = lastInteracted.getName().getString();
                const lastReportTime = this.activationHistory.get(entityId) || 0;

                // Check if enough time has passed since last report
                if (currentTime - lastReportTime > this.cooldownPeriod) {
                    this.reportActivation(entity, entityName, pos);
                    this.activationHistory.set(entityId, currentTime);
                }
            }
        });
    }

    reportActivation(entity, playerName, position) {
        const interaction = entity.as();
        const width = interaction.getWidth();
        const height = interaction.getHeight();

        Chat.log(`🎯 ${playerName} activated interaction zone!`);
        Chat.log(`   Location: [${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]`);
        Chat.log(`   Zone size: ${width.toFixed(2)} x ${height.toFixed(2)} blocks`);

        // Play sound effect for feedback (optional)
        Player.getPlayer().playSound("entity.experience_orb.pickup", position, 1.0, 1.0);

        // Check if this was an attack vs normal interaction
        const lastAttacker = interaction.getLastAttacker();
        if (lastAttacker && lastAttacker.getName().getString() === playerName) {
            Chat.log(`   Type: Attack/Hit`);
        } else {
            Chat.log(`   Type: Normal Interaction`);
        }
    }
}

const zoneMonitor = new InteractionZoneMonitor();

events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    zoneMonitor.checkActivations();
}));
```

### Custom Interaction Zone Detector

```js
// Find and categorize interaction entities based on their properties
function categorizeInteractionZones() {
    const interactions = World.getEntities("minecraft:interaction");
    const categories = {
        small: [],    // < 1x1x1 blocks
        medium: [],   // 1x1x1 to 2x2x2 blocks
        large: [],    // > 2x2x2 blocks
        flat: [],     // height < 0.5 blocks
        tall: [],     // height > 3 blocks
        responsive: [], // shouldRespond() === true
        active: []    // have recent activity
    };

    interactions.forEach(entity => {
        const interaction = entity.as();
        const width = interaction.getWidth();
        const height = interaction.getHeight();
        const volume = width * height * width; // Assuming square base
        const shouldRespond = interaction.shouldRespond();
        const hasActivity = interaction.getLastInteracted() || interaction.getLastAttacker();

        // Categorize by size
        if (volume < 1.0) categories.small.push(entity);
        else if (volume <= 8.0) categories.medium.push(entity);
        else categories.large.push(entity);

        // Categorize by shape
        if (height < 0.5) categories.flat.push(entity);
        else if (height > 3.0) categories.tall.push(entity);

        // Categorize by responsiveness
        if (shouldRespond) categories.responsive.push(entity);

        // Categorize by activity
        if (hasActivity) categories.active.push(entity);
    });

    // Report findings
    Chat.log("=== Interaction Zone Analysis ===");
    Chat.log(`Total zones: ${interactions.length}`);

    Object.entries(categories).forEach(([category, entities]) => {
        if (entities.length > 0) {
            Chat.log(`${category.toUpperCase()}: ${entities.length} zones`);
        }
    });

    // Show details for active zones
    if (categories.active.length > 0) {
        Chat.log("\n=== Recently Active Zones ===");
        categories.active.forEach(entity => {
            const interaction = entity.as();
            const pos = entity.getPos();
            const lastInteracted = interaction.getLastInteracted();
            const lastAttacker = interaction.getLastAttacker();

            Chat.log(`Zone at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]:`);
            if (lastInteracted) Chat.log(`  Last interacted: ${lastInteracted.getName().getString()}`);
            if (lastAttacker) Chat.log(`  Last attacker: ${lastAttacker.getName().getString()}`);
        });
    }
}

categorizeInteractionZones();
```

## Notes and Limitations

- InteractionEntityHelper instances are only available when working with entities of type `minecraft:interaction`
- Interaction entities were introduced in Minecraft 1.19.4, so this helper class is only available in game versions 1.19.4 and later
- The `setCanHit()` method modifies client-side behavior and may not persist or work in multiplayer environments
- `getLastAttacker()` and `getLastInteracted()` may return `null` if no recent activity has occurred
- Interaction entities are typically invisible and have no visual representation, making them primarily useful for custom map mechanics
- Size dimensions (width/height) define the interaction area where players can click or interact with the entity
- The `shouldRespond()` method indicates whether the entity is currently configured to accept interactions
- Some interaction properties may be controlled by server-side logic in multiplayer environments

## Related Classes

- `EntityHelper` - Base class providing position, world interaction, and utility methods
- `LivingEntityHelper` - Returned by `getLastAttacker()` and `getLastInteracted()` when the interacting entity is a living entity
- `World` - World entity queries and search methods for finding interaction entities
- `PlayerEntityHelper` - Common returned type for attacker/interacted entities when players interact with zones
- `Vec3D` - 3D position mathematics used for interaction zone positioning

## Version Information

- Available since JSMacros 1.9.1
- Requires Minecraft 1.19.4 or later (interaction entities introduced in this version)
- All methods require an interaction entity instance; use type checking before accessing specialized features
- Interaction tracking methods provide real-time data about recent player interactions with invisible zones