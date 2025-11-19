# FishingBobberEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.projectile.FishingBobberEntityHelper`

**Extends:** `EntityHelper<FishingBobberEntity>`

**Since:** JsMacros 1.8.4

The `FishingBobberEntityHelper` class provides specialized methods for interacting with fishing bobber entities in Minecraft. Fishing bobbers are projectile entities created when a player uses a fishing rod. This helper allows you to query the state of the fishing bobber including whether a fish has been caught, if it's in open water, and whether it has hooked an entity instead of a fish.

This class inherits all methods from `EntityHelper`, providing access to standard entity operations like positioning, movement tracking, and world interaction, in addition to fishing-specific functionality.

## Constructors

FishingBobberEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity type is `minecraft:fishing_bobber`
- World entity queries using `World.getEntities()` or other search methods
- Type casting from generic `EntityHelper` instances using `entity.as()` methods
- The static casting methods when you know an entity is a fishing bobber

## Methods

### Fishing Status

- [fishingBobber.hasCaughtFish()](#fishingbobberhascaughtfish)
- [fishingBobber.isInOpenWater()](#fishingbobberisinopenwater)
- [fishingBobber.hasEntityHooked()](#fishingbobberhasentityhooked)
- [fishingBobber.getHookedEntity()](#fishingbobbergethookedentity)

### Inherited Methods

As this extends `EntityHelper`, all standard entity methods are available including:
- Position and movement methods (`getPos()`, `getVelocity()`, etc.)
- World interaction methods (`getWorld()`, `getBlockPos()`, etc.)
- Entity utility methods (`getUUID()`, `getType()`, `isAlive()`, etc.)

---

## Fishing Status

### `fishingBobber.hasCaughtFish()`

Returns whether the fishing bobber has caught a fish and is ready to be reeled in.

**Returns:**
- `boolean` - `true` if a fish has been caught, `false` otherwise.

**Example:**
```js
// Check if any fishing bobbers have caught fish
const bobbers = World.getEntities("minecraft:fishing_bobber");
let fishCaught = false;

bobbers.forEach(entity => {
    const bobber = entity.as();
    if (bobber.hasCaughtFish()) {
        fishCaught = true;
        const pos = entity.getPos();
        Chat.log(`Fish caught at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
    }
});

if (fishCaught) {
    Chat.log("Fish are ready to be reeled in!");
}
```

### `fishingBobber.isInOpenWater()`

Returns whether the fishing bobber is in open water. When in open water, the player has a higher chance of catching treasure items while fishing.

**Returns:**
- `boolean` - `true` if the bobber is in open water, `false` otherwise.

**Example:**
```js
// Monitor fishing conditions
function checkFishingConditions() {
    const bobbers = World.getEntities("minecraft:fishing_bobber");

    bobbers.forEach(entity => {
        const bobber = entity.as();
        const pos = entity.getPos();

        if (bobber.isInOpenWater()) {
            Chat.log(`Fishing in open water at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] - Treasure chance increased!`);
        } else {
            Chat.log(`Fishing in confined waters at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        }
    });
}

checkFishingConditions();
```

### `fishingBobber.hasEntityHooked()`

Returns whether the fishing bobber has hooked an entity instead of catching a fish.

**Returns:**
- `boolean` - `true` if the bobber has an entity hooked, `false` otherwise.

**Example:**
```js
// Detect when entities are hooked instead of fish
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const bobbers = World.getEntities("minecraft:fishing_bobber");

    bobbers.forEach(entity => {
        const bobber = entity.as();
        if (bobber.hasEntityHooked()) {
            const pos = entity.getPos();
            Chat.log(`Entity hooked instead of fish at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        }
    });
}));
```

### `fishingBobber.getHookedEntity()`

Returns the entity that has been hooked by the fishing bobber, if any.

**Returns:**
- `EntityHelper<?>` - The hooked entity, or `null` if there is no entity hooked.

**Example:**
```js
// Check what type of entity was hooked
function checkHookedEntities() {
    const bobbers = World.getEntities("minecraft:fishing_bobber");

    bobbers.forEach(entity => {
        const bobber = entity.as();
        const hookedEntity = bobber.getHookedEntity();

        if (hookedEntity) {
            const entityType = hookedEntity.getType();
            const entityPos = hookedEntity.getPos();

            Chat.log(`Hooked ${entityType} at [${entityPos.x.toFixed(1)}, ${entityPos.y.toFixed(1)}, ${entityPos.z.toFixed(1)}]`);

            // Special handling for different entity types
            if (entityType === "minecraft:guardian" || entityType === "minecraft:elder_guardian") {
                Chat.log("Warning: Guardian hooked! Be careful!");
            } else if (entityType.startsWith("minecraft:item")) {
                Chat.log("An item was hooked!");
            }
        }
    });
}

checkHookedEntities();
```

## Usage Examples

### Comprehensive Fishing Monitor

```js
// Monitor all fishing activity and provide detailed status
class FishingMonitor {
    constructor() {
        this.bobberStates = new Map();
        this.lastCheck = 0;
    }

    updateMonitoring() {
        const currentTime = Date.now();
        if (currentTime - this.lastCheck < 1000) return; // Check every second

        const bobbers = World.getEntities("minecraft:fishing_bobber");
        const currentBobbers = new Map();

        bobbers.forEach(entity => {
            const uuid = entity.getUUID();
            const bobber = entity.as();
            const pos = entity.getPos();

            // Create current state snapshot
            const currentState = {
                entity: entity,
                position: { x: pos.x, y: pos.y, z: pos.z },
                hasFish: bobber.hasCaughtFish(),
                openWater: bobber.isInOpenWater(),
                hasHookedEntity: bobber.hasEntityHooked(),
                hookedEntity: bobber.getHookedEntity(),
                velocity: entity.getVelocity(),
                alive: entity.isAlive()
            };

            currentBobbers.set(uuid, currentState);

            // Check for state changes
            if (this.bobberStates.has(uuid)) {
                const previousState = this.bobberStates.get(uuid);
                this.detectChanges(previousState, currentState);
            } else {
                Chat.log(`🎣 New fishing bobber created at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
                if (currentState.openWater) {
                    Chat.log("   ✓ Fishing in open water (increased treasure chance)");
                }
            }
        });

        // Check for removed bobbers
        for (const [uuid, state] of this.bobberStates) {
            if (!currentBobbers.has(uuid) && !state.alive) {
                Chat.log(`🎣 Fishing bobber reeled in or destroyed`);
            }
        }

        this.bobberStates = currentBobbers;
        this.lastCheck = currentTime;
    }

    detectChanges(previous, current) {
        const pos = current.position;
        let changes = [];

        // Fish caught detection
        if (!previous.hasFish && current.hasFish) {
            changes.push("🐟 Fish caught! Time to reel in!");
            Chat.log(`🐟 Fish caught! Bobber at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        }

        // Entity hooked detection
        if (!previous.hasHookedEntity && current.hasHookedEntity && current.hookedEntity) {
            const entityType = current.hookedEntity.getType();
            changes.push(`🪝 Hooked ${entityType} instead of fish!`);
            Chat.log(`🪝 Hooked ${entityType} at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        }

        // Open water change
        if (previous.openWater !== current.openWater) {
            changes.push(`Water status: ${current.openWater ? 'Open water' : 'Confined water'}`);
        }

        // Large position changes (bobber movement)
        const distance = Math.sqrt(
            Math.pow(current.position.x - previous.position.x, 2) +
            Math.pow(current.position.y - previous.position.y, 2) +
            Math.pow(current.position.z - previous.position.z, 2)
        );

        if (distance > 0.5) {
            changes.push(`Bobber moved ${distance.toFixed(1)} blocks`);
        }

        // Report significant changes
        if (changes.length > 0) {
            Chat.log(`Fishing bobber status update: ${changes.join(', ')}`);
        }
    }
}

// Create and start the fishing monitor
const fishingMonitor = new FishingMonitor();

events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    fishingMonitor.updateMonitoring();
}));
```

### Automatic Fishing Assistant

```js
// Automatic fishing assistant with smart notifications
class FishingAssistant {
    constructor() {
        this.fishCaughtCount = 0;
        this.lastNotification = 0;
        this.treasureCaught = false;
    }

    checkAndNotify() {
        const bobbers = World.getEntities("minecraft:fishing_bobber");
        let fishReady = false;
        let entitiesHooked = [];

        bobbers.forEach(entity => {
            const bobber = entity.as();

            if (bobber.hasCaughtFish()) {
                fishReady = true;

                if (bobber.isInOpenWater()) {
                    this.treasureCaught = true;
                }
            }

            if (bobber.hasEntityHooked()) {
                const hookedEntity = bobber.getHookedEntity();
                if (hookedEntity) {
                    entitiesHooked.push(hookedEntity.getType());
                }
            }
        });

        // Notify about fish ready to be reeled in
        if (fishReady) {
            const currentTime = Date.now();
            if (currentTime - this.lastNotification > 5000) { // Avoid spamming notifications
                Chat.log("🎣 Fish caught! Right-click to reel in!");

                if (this.treasureCaught) {
                    Chat.log("💎 Fishing in open water - might be treasure!");
                }

                this.lastNotification = currentTime;
            }
        }

        // Notify about hooked entities
        if (entitiesHooked.length > 0) {
            Chat.log(`🪝 Hooked entities: ${entitiesHooked.join(', ')}`);
        }

        // Provide fishing statistics
        if (fishReady && !this.notifiedCurrentFish) {
            this.fishCaughtCount++;
            Chat.log(`📊 Fish caught today: ${this.fishCaughtCount}`);
            this.notifiedCurrentFish = true;
        } else if (!fishReady) {
            this.notifiedCurrentFish = false;
        }
    }

    getFishingAdvice() {
        const bobbers = World.getEntities("minecraft:fishing_bobber");

        if (bobbers.length === 0) {
            Chat.log("💡 Tip: Cast your fishing rod to start fishing!");
            return;
        }

        let openWaterCount = 0;
        bobbers.forEach(entity => {
            const bobber = entity.as();
            if (bobber.isInOpenWater()) {
                openWaterCount++;
            }
        });

        if (openWaterCount === 0) {
            Chat.log("💡 Tip: Fish in larger bodies of water for better treasure chances!");
        } else if (openWaterCount === bobbers.length) {
            Chat.log("🌊 Perfect! All bobbers are in open water with increased treasure chances!");
        }
    }
}

// Create fishing assistant
const fishingAssistant = new FishingAssistant();

// Set up monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    fishingAssistant.checkAndNotify();
}));

// Set up advice command
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.f" && event.action === 1) { // F key
        fishingAssistant.getFishingAdvice();
    }
}));

Chat.log("Fishing Assistant activated! Press F for fishing advice.");
```

### Fishing Bobber Tracker

```js
// Track fishing bobbers and their behavior patterns
class BobberTracker {
    constructor() {
        this.bobberData = new Map();
        this.sessionStats = {
            totalCasts: 0,
            fishCaught: 0,
            entitiesHooked: 0,
            openWaterCatches: 0
        };
    }

    track() {
        const bobbers = World.getEntities("minecraft:fishing_bobber");
        const currentBobbers = new Map();

        bobbers.forEach(entity => {
            const uuid = entity.getUUID();
            const bobber = entity.as();
            const pos = entity.getPos();

            // Update bobber data
            if (!this.bobberData.has(uuid)) {
                this.sessionStats.totalCasts++;
                Chat.log(`🎣 Fishing bobber #${this.sessionStats.totalCasts} cast at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
            }

            const data = {
                entity: entity,
                position: pos,
                hasFish: bobber.hasCaughtFish(),
                openWater: bobber.isInOpenWater(),
                hasHookedEntity: bobber.hasEntityHooked(),
                hookedEntity: bobber.getHookedEntity(),
                castTime: this.bobberData.get(uuid)?.castTime || Date.now()
            };

            currentBobbers.set(uuid, data);

            // Check for fish caught
            if (data.hasFish && !this.bobberData.get(uuid)?.hasFish) {
                this.sessionStats.fishCaught++;
                if (data.openWater) {
                    this.sessionStats.openWaterCatches++;
                }

                const catchTime = (Date.now() - data.castTime) / 1000;
                Chat.log(`🐟 Fish caught after ${catchTime.toFixed(1)} seconds! ${data.openWater ? "(Open water bonus)" : ""}`);
            }

            // Check for entities hooked
            if (data.hasHookedEntity && !this.bobberData.get(uuid)?.hasHookedEntity) {
                this.sessionStats.entitiesHooked++;
                if (data.hookedEntity) {
                    Chat.log(`🪝 Hooked ${data.hookedEntity.getType()}`);
                }
            }
        });

        // Check for reeled in bobbers
        for (const [uuid, data] of this.bobberData) {
            if (!currentBobbers.has(uuid)) {
                const activeTime = (Date.now() - data.castTime) / 1000;
                Chat.log(`🎣 Bobber reeled in after ${activeTime.toFixed(1)} seconds`);
            }
        }

        this.bobberData = currentBobbers;
    }

    showStats() {
        const stats = this.sessionStats;
        Chat.log("=== 📊 Fishing Statistics ===");
        Chat.log(`Total casts: ${stats.totalCasts}`);
        Chat.log(`Fish caught: ${stats.fishCaught}`);
        Chat.log(`Entities hooked: ${stats.entitiesHooked}`);
        Chat.log(`Open water catches: ${stats.openWaterCatches}`);

        if (stats.totalCasts > 0) {
            const catchRate = ((stats.fishCaught / stats.totalCasts) * 100).toFixed(1);
            Chat.log(`Catch rate: ${catchRate}%`);
        }
    }
}

// Create and use the tracker
const bobberTracker = new BobberTracker();

events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    bobberTracker.track();
}));

// Stats command
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.s" && event.action === 1) { // S key
        bobberTracker.showStats();
    }
}));

Chat.log("Bobber Tracker activated! Press S for fishing statistics.");
```

## Notes and Limitations

- FishingBobberEntityHelper instances are only available when working with entities of type `minecraft:fishing_bobber`
- The fishing bobber entity is created when a player uses a fishing rod and is destroyed when the line is reeled in or broken
- Fish caught detection may not be perfectly synchronized with server state in multiplayer environments
- Open water detection is based on Minecraft's internal water body calculations and may not always match visual expectations
- Hooked entities can include items, mobs, or other entities that can be pulled by the fishing rod
- The bobber's state may change rapidly during fishing animations and particle effects
- Some fishing mechanics (like treasure chances) are influenced by Lure and Luck of the Sea enchantments, but these are not exposed through this helper

## Related Classes

- `EntityHelper` - Base class providing position, world interaction, and utility methods
- `PlayerEntityHelper` - Player methods for casting fishing rods and managing fishing equipment
- `ItemStackHelper` - For accessing fishing rod enchantments like Lure and Luck of the Sea
- `World` - World entity queries and search methods for finding fishing bobbers
- `Events` - For detecting when fishing bobbers are created or destroyed

## Version Information

- Available since JSMacros 1.8.4
- All methods are read-only and query current fishing bobber state
- Inherits full functionality from EntityHelper hierarchy
- Compatible with all Minecraft versions that have fishing mechanics