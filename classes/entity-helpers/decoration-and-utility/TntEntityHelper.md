# TntEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.TntEntityHelper`

**Extends:** `EntityHelper<TntEntity>`

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized`

**Since:** 1.2.0

## Overview

The `TntEntityHelper` class is a specialized wrapper for Minecraft TNT entities, providing access to TNT-specific properties and behaviors such as fuse time, explosion power, and priming state. TNT entities are explosive blocks that can be primed to explode after a countdown period, and this helper class allows scripts to monitor, predict, and interact with TNT explosions for various purposes including building, demolition, mining, and explosive automation.

TNT entities are created when TNT blocks are activated (through fire, redstone, or other means) and exist in the world for a short duration before exploding. This helper provides access to the current fuse time, allowing scripts to predict explosion timing, calculate safe distances, and implement various TNT-related mechanics.

## Constructors

TntEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityExplode`)
- World entity queries with TNT filtering
- Methods that return entities and can be cast to TNT entities
- Entity type checking with `entity.is("minecraft:tnt")`

## Methods

### TNT Fuse and Explosion Methods

#### `getFuse()`
**Returns:** `int` - Remaining fuse time in ticks

Gets the remaining time before the TNT explodes, measured in Minecraft ticks (20 ticks = 1 second). When this reaches 0, the TNT will explode.

**Example:**
```javascript
// Find nearby TNT and check fuse times
const player = Player.getPlayer();
const tntEntities = World.getEntities().filter(entity => entity.is("minecraft:tnt"));

tntEntities.forEach(entity => {
    const distance = player.distanceTo(entity);
    if (distance <= 50) {
        const tnt = entity.asTnt();
        const fuse = tnt.getFuse();
        const secondsUntilExplosion = fuse / 20;

        Chat.log(`TNT at ${distance.toFixed(1)} blocks - explodes in ${secondsUntilExplosion}s`);
    }
});
```

#### `setFuse(fuse)`
**Parameters:**
- `fuse` (int): New fuse time in ticks

Sets the remaining fuse time for the TNT. Can be used to extend or reduce the time until explosion.

**Example:**
```javascript
// Extend fuse time of nearby TNT for safety
const player = Player.getPlayer();
const tntEntities = World.getEntities().filter(entity => entity.is("minecraft:tnt"));

tntEntities.forEach(entity => {
    const distance = player.distanceTo(entity);
    if (distance <= 10) {
        const tnt = entity.asTnt();
        const currentFuse = tnt.getFuse();

        if (currentFuse < 40) { // Less than 2 seconds
            tnt.setFuse(60); // Extend to 3 seconds
            Chat.log(`Extended TNT fuse to 3 seconds for safety`);
        }
    }
});
```

#### `getPrimed()`
**Returns:** `boolean` - Whether the TNT is primed/activated

Checks if the TNT entity is currently primed and will explode when the fuse reaches zero.

**Example:**
```javascript
// Monitor primed TNT
const tnt = entity.asTnt();
if (tnt.getPrimed()) {
    const fuse = tnt.getFuse();
    Chat.log(`Primed TNT with ${fuse} ticks remaining`);
} else {
    Chat.log("TNT is not primed");
}
```

## Usage Examples

### Example 1: TNT Explosion Timer
```javascript
function createTntExplosionTimer() {
    const trackedTnt = new Map();

    // Monitor TNT entities
    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        const player = Player.getPlayer();
        if (!player) return;

        const tntEntities = World.getEntities().filter(entity => entity.is("minecraft:tnt"));

        // Update tracking
        tntEntities.forEach(entity => {
            const uuid = entity.getUuid();
            const tnt = entity.asTnt();
            const fuse = tnt.getFuse();

            if (!trackedTnt.has(uuid)) {
                // New TNT detected
                trackedTnt.set(uuid, {
                    entity: entity,
                    initialFuse: fuse,
                    position: entity.getPos(),
                    startTime: Date.now()
                });
                Chat.log(`💣 New TNT detected - explodes in ${fuse/20}s`);
            } else {
                // Update existing tracking
                const tracking = trackedTnt.get(uuid);
                tracking.currentFuse = fuse;

                // Warning when about to explode
                if (fuse <= 20 && fuse > 0 && !tracking.warned) {
                    const distance = player.distanceTo(entity);
                    Chat.log(`⚠️ TNT exploding in 1s! Distance: ${distance.toFixed(1)} blocks`);
                    tracking.warned = true;
                }
            }
        });

        // Remove exploded TNT
        for (const [uuid, tracking] of trackedTnt) {
            if (!tracking.entity.isAlive()) {
                const explosionTime = Date.now() - tracking.startTime;
                Chat.log(`💥 TNT exploded after ${explosionTime}ms`);
                trackedTnt.delete(uuid);
            }
        }

        // Display active TNT count
        if (trackedTnt.size > 0) {
            Chat.actionbar(`Active TNT: ${trackedTnt.size}`);
        }
    }));
}

createTntExplosionTimer();
```

### Example 2: TNT Safety System
```javascript
function createTntSafetySystem(safeDistance = 20) {
    Chat.log(`🛡️ TNT Safety System activated - Safe distance: ${safeDistance} blocks`);

    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        const player = Player.getPlayer();
        if (!player) return;

        const tntEntities = World.getEntities().filter(entity => entity.is("minecraft:tnt"));
        let immediateDanger = false;
        let approachingDanger = false;

        tntEntities.forEach(entity => {
            const tnt = entity.asTnt();
            const distance = player.distanceTo(entity);
            const fuse = tnt.getFuse();
            const secondsUntilExplosion = fuse / 20;

            // Check danger levels
            if (distance < 5 && fuse < 40) {
                immediateDanger = true;
                Chat.title("⚠️ IMMEDIATE DANGER!", `TNT exploding in ${secondsUntilExplosion.toFixed(1)}s`, 0, 1, 0);
            } else if (distance < safeDistance && fuse < 60) {
                approachingDanger = true;
                Chat.actionbar(`⚠️ TNT approaching - ${distance.toFixed(1)} blocks, ${secondsUntilExplosion.toFixed(1)}s`);
            }
        });

        // Auto-safety measures
        if (immediateDanger) {
            // Create protective barrier or teleport away (simplified)
            implementEmergencyProtection();
        }
    }));
}

function implementEmergencyProtection() {
    const player = Player.getPlayer();
    if (!player) return;

    // Simple escape - try to move away quickly
    const currentPos = player.getPos();
    const escapeDirection = Math.random() * Math.PI * 2;
    const escapeDistance = 8;

    const escapeX = currentPos.x + Math.cos(escapeDirection) * escapeDistance;
    const escapeZ = currentPos.z + Math.sin(escapeDirection) * escapeDistance;

    // Note: JsMacros doesn't directly support teleportation
    // This is a placeholder for safety measures
    Chat.log(`🚨 Emergency escape initiated to (${escapeX.toFixed(1)}, ${escapeZ.toFixed(1)})`);
}

createTntSafetySystem(25);
```

### Example 3: TNT Explosion Prediction and Visualization
```javascript
function createTntExplosionPredictor() {
    Chat.log("💣 TNT Explosion Predictor started");

    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        const player = Player.getPlayer();
        if (!player) return;

        const tntEntities = World.getEntities().filter(entity => entity.is("minecraft:tnt"));

        if (tntEntities.length === 0) return;

        // Generate explosion predictions
        const predictions = [];

        tntEntities.forEach(entity => {
            const tnt = entity.asTnt();
            const fuse = tnt.getFuse();
            const position = entity.getPos();
            const distance = player.distanceTo(entity);

            // Calculate explosion effects
            const explosionRadius = 4; // Standard TNT explosion radius
            const willDamagePlayer = distance <= explosionRadius;
            const damageSeverity = willDamagePlayer ? Math.max(0, 1 - distance / explosionRadius) : 0;

            predictions.push({
                position: position,
                fuse: fuse,
                distance: distance,
                willDamagePlayer: willDamagePlayer,
                damageSeverity: damageSeverity,
                timeUntilExplosion: fuse / 20
            });
        });

        // Sort by time until explosion
        predictions.sort((a, b) => a.timeUntilExplosion - b.timeUntilExplosion);

        // Display predictions
        if (predictions.length > 0) {
            let message = `💣 TNT Predictions:`;
            predictions.forEach((pred, index) => {
                const dangerIcon = pred.willDamagePlayer ? "🔥" : "💥";
                const severity = pred.damageSeverity > 0.7 ? "CRITICAL" :
                                pred.damageSeverity > 0.3 ? "HIGH" :
                                pred.damageSeverity > 0 ? "MEDIUM" : "LOW";
                message += ` ${dangerIcon}${pred.timeUntilExplosion.toFixed(1)}s(${severity})`;
            });
            Chat.actionbar(message);
        }
    }));
}

createTntExplosionPredictor();
```

### Example 4: TNT Mining Assistant
```javascript
function createTntMiningAssistant() {
    Chat.log("⛏️ TNT Mining Assistant started");

    const miningData = {
        totalTnt: 0,
        successfulDigs: 0,
        blocksDestroyed: 0,
        explosions: []
    };

    events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
        const entity = event.getEntity();
        if (entity.is("minecraft:tnt")) {
            miningData.totalTnt++;
            const position = entity.getPos();

            Chat.log(`💣 TNT spawned at [${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]`);
            Chat.log(`Total TNT spawned: ${miningData.totalTnt}`);

            // Log the explosion
            miningData.explosions.push({
                position: position,
                time: Date.now(),
                estimatedBlocks: 0
            });
        }
    }));

    events.on("EntityExplode", JavaWrapper.methodToJavaAsync((event) => {
        const entity = event.getEntity();
        if (entity && entity.is("minecraft:tnt")) {
            const affectedBlocks = event.getAffectedBlocks();
            const position = entity.getPos();

            miningData.successfulDigs++;
            miningData.blocksDestroyed += affectedBlocks.length;

            Chat.log(`💥 TNT exploded at [${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]`);
            Chat.log(`Blocks destroyed: ${affectedBlocks.length}`);
            Chat.log(`Total blocks destroyed: ${miningData.blocksDestroyed}`);

            // Analyze mining efficiency
            const efficiency = miningData.blocksDestroyed / Math.max(1, miningData.successfulDigs);
            Chat.log(`Average blocks per TNT: ${efficiency.toFixed(1)}`);

            // Show affected block types
            const blockTypes = {};
            affectedBlocks.forEach(blockPos => {
                const block = World.getBlock(blockPos.x, blockPos.y, blockPos.z);
                const blockName = block.getName();
                blockTypes[blockName] = (blockTypes[blockName] || 0) + 1;
            });

            Chat.log("Affected block types:");
            Object.entries(blockTypes).forEach(([blockType, count]) => {
                Chat.log(`  ${blockType}: ${count}`);
            });
        }
    }));

    // Periodic statistics
    setInterval(() => {
        if (miningData.totalTnt > 0) {
            Chat.log("=== TNT Mining Statistics ===");
            Chat.log(`Total TNT spawned: ${miningData.totalTnt}`);
            Chat.log(`Successful explosions: ${miningData.successfulDigs}`);
            Chat.log(`Total blocks destroyed: ${miningData.blocksDestroyed}`);

            if (miningData.successfulDigs > 0) {
                const efficiency = miningData.blocksDestroyed / miningData.successfulDigs;
                Chat.log(`Average efficiency: ${efficiency.toFixed(1)} blocks per TNT`);
            }
        }
    }, 60000); // Every minute
}

createTntMiningAssistant();
```

### Example 5: TNT Chain Reaction Monitor
```javascript
function createTntChainReactionMonitor() {
    Chat.log("🔗 TNT Chain Reaction Monitor started");

    const chainReactions = [];
    let currentReaction = null;

    function startChainReaction(position) {
        currentReaction = {
            id: Date.now(),
            startTime: Date.now(),
            initialPosition: position,
            tntCount: 1,
            maxDistance: 0
        };
        chainReactions.push(currentReaction);
        Chat.log(`🔗 Chain reaction started at [${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]`);
    }

    function updateChainReaction(tntPosition) {
        if (!currentReaction) return;

        currentReaction.tntCount++;
        const distance = tntPosition.distanceTo(currentReaction.initialPosition);
        currentReaction.maxDistance = Math.max(currentReaction.maxDistance, distance);

        Chat.log(`🔗 Chain reaction expanded: ${currentReaction.tntCount} TNT, ${currentReaction.maxDistance.toFixed(1)} block spread`);
    }

    function endChainReaction() {
        if (!currentReaction) return;

        const duration = Date.now() - currentReaction.startTime;
        Chat.log(`🔗 Chain reaction ended:`);
        Chat.log(`  Duration: ${duration}ms`);
        Chat.log(`  TNT involved: ${currentReaction.tntCount}`);
        Chat.log(`  Spread: ${currentReaction.maxDistance.toFixed(1)} blocks`);

        currentReaction = null;
    }

    events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
        const entity = event.getEntity();
        if (entity.is("minecraft:tnt")) {
            const position = entity.getPos();

            if (!currentReaction) {
                // Check if this TNT is close to any existing explosions
                const recentReactions = chainReactions.slice(-5); // Last 5 reactions
                const isNearRecentExplosion = recentReactions.some(reaction => {
                    const distance = position.distanceTo(reaction.initialPosition);
                    return distance <= 10 && (Date.now() - reaction.startTime) < 2000;
                });

                if (isNearRecentExplosion) {
                    startChainReaction(position);
                }
            } else {
                updateChainReaction(position);
            }
        }
    }));

    events.on("EntityExplode", JavaWrapper.methodToJavaAsync((event) => {
        const entity = event.getEntity();
        if (entity && entity.is("minecraft:tnt")) {
            // Schedule end of chain reaction check
            setTimeout(() => {
                const activeTnt = World.getEntities().filter(e => e.is("minecraft:tnt"));
                if (activeTnt.length === 0 && currentReaction) {
                    endChainReaction();
                }
            }, 1000);
        }
    }));

    // Cleanup old reactions
    setInterval(() => {
        const fiveMinutesAgo = Date.now() - 300000;
        chainReactions.splice(0, chainReactions.length,
            ...chainReactions.filter(reaction => reaction.startTime > fiveMinutesAgo));
    }, 60000);
}

createTntChainReactionMonitor();
```

### Example 6: TNT Performance Analyzer
```javascript
function createTntPerformanceAnalyzer() {
    Chat.log("📊 TNT Performance Analyzer started");

    const performanceData = {
        explosions: [],
        currentSession: {
            startTime: Date.now(),
            tntSpawned: 0,
            blocksDestroyed: 0,
            chainReactions: 0
        }
    };

    events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
        const entity = event.getEntity();
        if (entity.is("minecraft:tnt")) {
            performanceData.currentSession.tntSpawned++;
        }
    }));

    events.on("EntityExplode", JavaWrapper.methodToJavaAsync((event) => {
        const entity = event.getEntity();
        if (entity && entity.is("minecraft:tnt")) {
            const explosion = {
                time: Date.now(),
                blocksDestroyed: event.getAffectedBlocks().length,
                position: entity.getPos(),
                efficiency: event.getAffectedBlocks().length
            };

            performanceData.explosions.push(explosion);
            performanceData.currentSession.blocksDestroyed += explosion.blocksDestroyed;

            // Check if this might be part of a chain reaction
            const nearbyExplosions = performanceData.explosions.filter(e => {
                const timeDiff = Math.abs(e.time - explosion.time);
                const distance = e.position.distanceTo(explosion.position);
                return timeDiff < 2000 && distance < 15;
            });

            if (nearbyExplosions.length > 1) {
                performanceData.currentSession.chainReactions++;
            }
        }
    }));

    // Performance reporting
    function generatePerformanceReport() {
        const session = performanceData.currentSession;
        const sessionDuration = (Date.now() - session.startTime) / 1000 / 60; // minutes

        Chat.log("=== TNT Performance Report ===");
        Chat.log(`Session duration: ${sessionDuration.toFixed(1)} minutes`);
        Chat.log(`TNT spawned: ${session.tntSpawned}`);
        Chat.log(`Blocks destroyed: ${session.blocksDestroyed}`);
        Chat.log(`Chain reactions detected: ${session.chainReactions}`);

        if (session.tntSpawned > 0) {
            const efficiency = session.blocksDestroyed / session.tntSpawned;
            Chat.log(`Average blocks per TNT: ${efficiency.toFixed(1)}`);

            const tntPerMinute = session.tntSpawned / Math.max(1, sessionDuration);
            Chat.log(`TNT usage rate: ${tntPerMinute.toFixed(1)} per minute`);
        }

        if (performanceData.explosions.length > 0) {
            const maxEfficiency = Math.max(...performanceData.explosions.map(e => e.efficiency));
            const avgEfficiency = performanceData.explosions.reduce((sum, e) => sum + e.efficiency, 0) / performanceData.explosions.length;

            Chat.log(`Best single explosion: ${maxEfficiency} blocks`);
            Chat.log(`Average explosion efficiency: ${avgEfficiency.toFixed(1)} blocks`);
        }

        // Recommendations
        Chat.log("\n📋 Recommendations:");
        if (session.tntSpawned === 0) {
            Chat.log("- No TNT usage detected in this session");
        } else {
            const efficiency = session.blocksDestroyed / session.tntSpawned;
            if (efficiency < 50) {
                Chat.log("- Consider optimizing TNT placement for better efficiency");
                Chat.log("- Cluster TNT for more effective clearing");
            } else if (efficiency > 100) {
                Chat.log("- Excellent TNT efficiency achieved!");
            } else {
                Chat.log("- Good TNT efficiency, consider fine-tuning placement");
            }

            if (session.chainReactions > session.tntSpawned * 0.3) {
                Chat.log("- Many chain reactions detected - ensure safety measures");
            }
        }
    }

    // Generate report every 5 minutes
    setInterval(generatePerformanceReport, 300000);

    // Allow manual report generation
    const command = Chat.createCommandBuilder("tntreport")
        .executes(JavaWrapper.methodToJava(() => {
            generatePerformanceReport();
        }))
        .register();

    Chat.log("Use /tntreport to generate manual performance report");
}

createTntPerformanceAnalyzer();
```

## Important Notes

### Entity Lifecycle

1. **Temporary Existence:** TNT entities only exist for a short duration (4 seconds by default) before exploding
2. **Entity Validation:** Always check `isAlive()` before accessing TNT properties
3. **Fuse Accuracy:** Fuse time may not always be perfectly accurate due to server/client synchronization

### Safety Considerations

1. **Explosion Damage:** TNT explosions can damage players, entities, and blocks
2. **Safe Distance:** Maintain safe distances from primed TNT based on fuse time
3. **Chain Reactions:** TNT explosions can trigger other TNT blocks, creating chain reactions

### Performance Impact

1. **Multiple TNT:** Large numbers of TNT entities can cause performance issues
2. **Explosion Calculations:** Block destruction calculations can be resource-intensive
3. **World Updates:** Large explosions can cause significant world updates

## Best Practices

1. **Distance Monitoring:** Always track distance to TNT entities for safety
2. **Fuse Tracking:** Monitor fuse times to predict explosion timing
3. **Safety Systems:** Implement automatic safety measures for nearby explosions
4. **Performance Optimization:** Limit the number of simultaneous TNT entities
5. **Chain Reaction Prevention:** Consider measures to prevent dangerous chain reactions

## Related Classes

- [`EntityHelper`](EntityHelper.md) - Base entity helper class
- [`TntMinecartEntityHelper`](vehicles/TntMinecartEntityHelper.md) - Specialized helper for TNT minecarts
- [`Pos3D`](Pos3D.md) - 3D position and vector mathematics
- [`World`](World.md) - World interaction and block access
- `ExplosionEvent` - Event information for explosions
- `EntitySpawnEvent` - Event information for entity spawning

## Version History

- **1.2.0:** Initial introduction with basic TNT entity support
- **1.8.0:** Enhanced fuse time access and improved entity tracking
- **Current:** Improved explosion prediction and safety features