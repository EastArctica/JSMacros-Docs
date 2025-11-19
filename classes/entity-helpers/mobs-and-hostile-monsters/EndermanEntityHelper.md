# EndermanEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.EndermanEntityHelper`

**Extends:** `MobEntityHelper<EndermanEntity>`

**Extends Chain:** `EndermanEntityHelper` → `MobEntityHelper` → `LivingEntityHelper` → `EntityHelper` → `BaseHelper<Entity>`

Represents an Enderman entity in the world. EndermanEntityHelper provides access to enderman-specific behaviors, states, and properties that are unique to the Enderman mob. This specialized helper allows you to monitor the enderman's aggression state, check if it's holding blocks, and track its provoked status.

Instances are typically obtained from entity events, world entity queries, or by casting existing entity helpers that represent Endermen.

## Constructors

EndermanEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`)
- World entity queries and filters
- Type casting from generic `EntityHelper` instances

```js
// Method 1: From entity events
JsMacros.on("EntityInteract", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getTarget();
    if (entity.is("minecraft:enderman")) {
        const enderman = entity; // Already properly typed
        const isScreaming = enderman.isScreaming();
        Chat.log(`Enderman is screaming: ${isScreaming}`);
    }
}));

// Method 2: From world queries
const entities = World.getEntities();
for (const entity of entities) {
    if (entity.is("minecraft:enderman")) {
        const enderman = entity; // Already properly typed
        const isProvoked = enderman.isProvoked();
        const isHolding = enderman.isHoldingBlock();

        Chat.log(`Enderman provoked: ${isProvoked}, holding block: ${isHolding}`);

        if (isHolding) {
            const heldBlock = enderman.getHeldBlock();
            Chat.log(`Holding block: ${heldBlock.getBlock().getName()}`);
        }
    }
}

// Method 3: Type casting (if needed)
const genericEntity = event.getEntity();
if (genericEntity.is("minecraft:enderman")) {
    const enderman = genericEntity; // JSMacros handles this automatically
}
```

## Methods
- [enderman.isScreaming()](#endermanisscreaming)
- [enderman.isProvoked()](#endermanisprovoked)
- [enderman.isHoldingBlock()](#endermanisholdingblock)
- [enderman.getHeldBlock()](#endermangetheldblock)

---

## Usage Examples

### Complete Enderman Behavior Monitor
```js
class ComprehensiveEndermanMonitor {
    constructor() {
        this.trackedEndermen = new Map();
        this.statistics = {
            totalSeen: 0,
            currentlyProvoked: 0,
            currentlyHolding: 0,
            blockTypes: new Map(),
            provocationEvents: []
        };
    }

    monitorEndermen() {
        const entities = World.getEntities("minecraft:enderman");
        const player = Player.getPlayer();

        if (!player) return;

        const currentUUIDs = new Set();

        entities.forEach(enderman => {
            const uuid = enderman.getUUID();
            currentUUIDs.add(uuid);

            // Track new endermen
            if (!this.trackedEndermen.has(uuid)) {
                this.trackNewEnderman(enderman);
            }

            // Update existing enderman data
            this.updateEndermanData(enderman, player);
        });

        // Clean up despawned/dead endermen
        this.cleanupTracking(currentUUIDs);
    }

    trackNewEnderman(enderman) {
        const uuid = enderman.getUUID();
        const pos = enderman.getPos();

        this.trackedEndermen.set(uuid, {
            entity: enderman,
            firstSeen: Date.now(),
            lastProvoked: false,
            lastHolding: false,
            provocationCount: 0,
            blockPickupEvents: []
        });

        this.statistics.totalSeen++;
        Chat.log(`&9New Enderman spotted at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
    }

    updateEndermanData(enderman, player) {
        const uuid = enderman.getUUID();
        const data = this.trackedEndermen.get(uuid);
        const pos = enderman.getPos();
        const distance = player.distanceTo(enderman);

        const isScreaming = enderman.isScreaming();
        const isProvoked = enderman.isProvoked();
        const isHolding = enderman.isHoldingBlock();
        const heldBlock = isHolding ? enderman.getHeldBlock() : null;

        // Track provocation changes
        if (isProvoked && !data.lastProvoked) {
            data.provocationCount++;
            data.lastProvoked = true;

            const event = {
                time: Date.now(),
                position: {...pos},
                distance: distance
            };
            this.statistics.provocationEvents.push(event);

            Chat.log(`&cEnderman provoked! (Total provocations: ${data.provocationCount})`);

            if (distance < 16) {
                Chat.actionbar("&c⚠️ CLOSE PROVOCATION! Look away immediately!");
            }
        } else if (!isProvoked && data.lastProvoked) {
            data.lastProvoked = false;
            Chat.log("&aEnderman has calmed down");
        }

        // Track block holding changes
        if (isHolding && !data.lastHolding) {
            data.lastHolding = true;
            const blockType = heldBlock.getBlock().getId();

            data.blockPickupEvents.push({
                time: Date.now(),
                blockType: blockType,
                position: {...pos}
            });

            this.statistics.blockTypes.set(blockType, (this.statistics.blockTypes.get(blockType) || 0) + 1);

            Chat.log(`&eEnderman picked up ${blockType}`);

        } else if (!isHolding && data.lastHolding) {
            data.lastHolding = false;
            Chat.log("&7Enderman dropped its block");
        }

        // Update current statistics
        this.statistics.currentlyProvoked = isProvoked ?
            this.statistics.currentlyProvoked + 1 :
            this.statistics.currentlyProvoked - 1;

        this.statistics.currentlyHolding = isHolding ?
            this.statistics.currentlyHolding + 1 :
            this.statistics.currentlyHolding - 1;

        // Display status for nearby endermen
        if (distance < 32) {
            let status = "";
            if (isScreaming) status += "Screaming ";
            if (isProvoked) status += "Provoked ";
            if (isHolding) status += `Holding:${heldBlock.getBlock().getName()} `;

            if (status) {
                Chat.actionbar(`&5Enderman [${distance.toFixed(1)}m]: ${status.trim()}`);
            }
        }
    }

    cleanupTracking(currentUUIDs) {
        for (const [uuid, data] of this.trackedEndermen) {
            if (!currentUUIDs.has(uuid) || !data.entity.isAlive()) {
                const trackedDuration = Math.floor((Date.now() - data.firstSeen) / 1000);
                Chat.log(`&7Enderman tracking ended (${trackedDuration}s, ${data.provocationCount} provocations)`);
                this.trackedEndermen.delete(uuid);

                // Adjust statistics
                if (data.lastProvoked) this.statistics.currentlyProvoked--;
                if (data.lastHolding) this.statistics.currentlyHolding--;
            }
        }
    }

    displayStatistics() {
        Chat.log("=== Enderman Monitor Statistics ===");
        Chat.log(`Total endermen seen: ${this.statistics.totalSeen}`);
        Chat.log(`Currently tracked: ${this.trackedEndermen.size}`);
        Chat.log(`Currently provoked: ${this.statistics.currentlyProvoked}`);
        Chat.log(`Currently holding blocks: ${this.statistics.currentlyHolding}`);

        if (this.statistics.blockTypes.size > 0) {
            Chat.log("\nMost common stolen blocks:");
            const sortedBlocks = Array.from(this.statistics.blockTypes.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

            sortedBlocks.forEach(([blockType, count]) => {
                Chat.log(`  ${blockType}: ${count}`);
            });
        }

        if (this.statistics.provocationEvents.length > 0) {
            const recentProvocations = this.statistics.provocationEvents
                .filter(event => Date.now() - event.time < 60000); // Last minute

            if (recentProvocations.length > 0) {
                Chat.log(`\nProvocations in last minute: ${recentProvocations.length}`);
            }
        }
    }
}

const endermanMonitor = new ComprehensiveEndermanMonitor();

// Monitor every 2 seconds
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 40 === 0) {
        endermanMonitor.monitorEndermen();
    }
}));

// Display statistics every minute
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 1200 === 0) {
        endermanMonitor.displayStatistics();
    }
}));

Chat.log("&5👁️ Comprehensive Enderman Monitor activated!");
```

### Enderman Safety System
```js
// Safety system for players who want to avoid endermen
class EndermanSafetySystem {
    constructor() {
        this.warningDistance = 16;
        this.dangerDistance = 8;
        this.lastWarning = 0;
        this.safeLookDirection = null;
    }

    checkSafety() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities("minecraft:enderman");
        const playerPos = player.getPos();

        let nearbyEndermen = [];
        let dangerousEndermen = [];

        entities.forEach(enderman => {
            const distance = player.distanceTo(enderman);
            const isProvoked = enderman.isProvoked();
            const isScreaming = enderman.isScreaming();

            if (distance <= this.dangerDistance) {
                dangerousEndermen.push({
                    entity: enderman,
                    distance: distance,
                    provoked: isProvoked,
                    screaming: isScreaming
                });
            } else if (distance <= this.warningDistance) {
                nearbyEndermen.push({
                    entity: enderman,
                    distance: distance,
                    provoked: isProvoked,
                    screaming: isScreaming
                });
            }
        });

        // Handle dangerous situations
        if (dangerousEndermen.length > 0) {
            this.handleDanger(dangerousEndermen, player);
        } else if (nearbyEndermen.length > 0) {
            this.handleWarnings(nearbyEndermen);
        } else {
            this.allClear();
        }
    }

    handleDanger(dangerousEndermen, player) {
        const now = Date.now();

        // Only show urgent warnings every 2 seconds
        if (now - this.lastWarning > 2000) {
            this.lastWarning = now;

            let provokedCount = dangerousEndermen.filter(e => e.provoked).length;
            let screamingCount = dangerousEndermen.filter(e => e.screaming).length;

            if (provokedCount > 0) {
                Chat.log("&c⚠️ DANGER: Provoked Endermen nearby! Look away NOW!");
                Chat.actionbar("&4⚠️ LOOK AWAY - PROVOKED ENDERMEN!");

                // Suggest safe direction to look
                this.suggestSafeDirection(player, dangerousEndermen);
            } else if (screamingCount > 0) {
                Chat.log("&6⚠️ WARNING: Screaming Endermen nearby!");
                Chat.actionbar("&6⚠️ Avoid eye contact with nearby Endermen!");
            } else {
                Chat.log("&e⚠️ CAUTION: Very close to Endermen!");
                Chat.actionbar("&e⚠️ Move away from nearby Endermen!");
            }
        }
    }

    handleWarnings(nearbyEndermen) {
        const provoked = nearbyEndermen.filter(e => e.provoked).length;
        if (provoked > 0) {
            Chat.actionbar(`&eNearby provoked Endermen: ${provoked}`);
        } else {
            Chat.actionbar(`&7Nearby Endermen: ${nearbyEndermen.length}`);
        }
    }

    allClear() {
        // Clear actionbar periodically to show no threats
        if (Client.getTime() % 60 === 0) {
            Chat.actionbar("");
        }
    }

    suggestSafeDirection(player, dangerousEndermen) {
        // Calculate safe direction to look (away from endermen)
        let dangerVector = { x: 0, z: 0 };

        dangerousEndermen.forEach(enderman => {
            const endermanPos = enderman.entity.getPos();
            const direction = {
                x: endermanPos.x - player.getPos().x,
                z: endermanPos.z - player.getPos().z
            };

            // Normalize and accumulate danger vectors
            const length = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
            if (length > 0) {
                dangerVector.x += direction.x / length;
                dangerVector.z += direction.z / length;
            }
        });

        // Safe direction is opposite of danger vector
        const safeDirection = {
            x: -dangerVector.x,
            z: -dangerVector.z
        };

        // Determine cardinal direction
        let directionName = "somewhere safe";
        if (Math.abs(safeDirection.x) > Math.abs(safeDirection.z)) {
            directionName = safeDirection.x > 0 ? "east" : "west";
        } else {
            directionName = safeDirection.z > 0 ? "south" : "north";
        }

        Chat.log(`&6Safe to look ${directionName}!`);
    }
}

const safetySystem = new EndermanSafetySystem();

// Check safety every second
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) {
        safetySystem.checkSafety();
    }
}));

Chat.log("&5🛡️ Enderman Safety System activated!");
```

## Inherited Methods

From `MobEntityHelper`:
- `isAttacking()` - Returns whether the enderman is currently attacking
- `isAiDisabled()` - Returns whether the enderman's AI is disabled

From `LivingEntityHelper`:
- `getHealth()` - Returns the enderman's current health
- `getMaxHealth()` - Returns the enderman's maximum health
- `getStatusEffects()` - Returns active status effects
- `isAlive()` - Returns whether the enderman is alive
- All other living entity methods (movement, position, equipment, etc.)

From `EntityHelper`:
- `getPos()` - Returns the enderman's position
- `getType()` - Returns "minecraft:enderman"
- `is(type, ...)` - Type checking method
- `getName()` - Returns the enderman's display name
- `distanceTo(target)` - Calculates distance to targets
- All other general entity methods

## Notes and Limitations

- EndermanEntityHelper instances only work with enderman entities - always verify with `is("minecraft:enderman")` before casting
- The provocation state persists even after the Enderman stops screaming
- Endermen can pick up and place blocks dynamically, so block holding status can change frequently
- An Enderman holding a block may drop it when teleporting or when killed
- The screaming state is primarily a visual and audio indicator - use `isProvoked()` for behavioral detection
- Enderman teleportation can make them difficult to track over long distances
- Block state information includes all block properties like orientation, waterlogging, and other variants

## Related Classes

- `MobEntityHelper` - Parent class with mob-specific methods
- `LivingEntityHelper` - Base class for living entities with health and movement
- `EntityHelper` - Base entity class with position and utility methods
- `BlockStateHelper` - Block state information for held blocks
- `Pos3D` - 3D position and vector mathematics
- `World` - For finding and querying enderman entities
- `JsMacros` - For event handling and script management

## Version Information

- Available since JSMacros 1.8.4
- All methods provide access to enderman-specific behaviors and properties
- Full integration with Minecraft's enderman AI and behavior systems
- Block holding and provocation tracking synchronized with game state