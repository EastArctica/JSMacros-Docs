# CreeperEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.CreeperEntityHelper`

**Extends:** `MobEntityHelper<CreeperEntity>`

The `CreeperEntityHelper` class provides specialized access to creeper entities in Minecraft, offering methods to monitor and interact with creeper-specific behaviors such as charging state, ignition status, and explosion timing. This class extends `MobEntityHelper` and inherits all functionality for living entities including health monitoring, status effects, and AI states.

This helper is particularly useful for creating scripts that detect dangerous creeper situations, warn players of impending explosions, or analyze creeper behavior patterns.

## Constructors

CreeperEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using `asCreeper()` method

## Methods

### Creeper State

- [creeper.isCharged()](#creeperischarged)
- [creeper.isIgnited()](#creeperisignited)

### Fuse Timing and Explosion Control

- [creeper.getFuseChange()](#creepergetfusechange)
- [creeper.getFuseTime()](#creepergetfusetime)
- [creeper.getMaxFuseTime()](#creepergetmaxfusetime)
- [creeper.getRemainingFuseTime()](#creepergetremainingfusetime)

### Inherited Methods

The CreeperEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Creeper State

## Fuse Timing and Explosion Control

## Usage Examples

### Creeper Detection and Warning System
```js
// Comprehensive creeper monitoring and warning system
class CreeperWarningSystem {
    constructor() {
        this.trackedCreepers = new Map();
        this.warningLevels = {
            safe: { distance: 16, color: 0x00FF00, message: "Safe distance" },
            caution: { distance: 12, color: 0xFFFF00, message: "Caution advised" },
            danger: { distance: 8, color: 0xFF8800, message: "Danger zone" },
            critical: { distance: 5, color: 0xFF0000, message: "Critical danger!" }
        };
    }

    analyzeCreeper(creeper) {
        const uuid = creeper.getUUID();
        const pos = creeper.getPos();
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(creeper);
        const isCharged = creeper.isCharged();
        const isIgnited = creeper.isIgnited();
        const remainingFuse = creeper.getRemainingFuseTime();
        const fuseChange = creeper.getFuseChange();

        // Determine threat level
        let threatLevel = "low";
        if (isCharged && isIgnited && remainingFuse <= 10) {
            threatLevel = "extreme";
        } else if (isCharged && isIgnited) {
            threatLevel = "high";
        } else if (isIgnited && remainingFuse <= 15) {
            threatLevel = "medium";
        } else if (distance <= 6) {
            threatLevel = "elevated";
        }

        // Update tracking data
        this.trackedCreepers.set(uuid, {
            creeper: creeper,
            position: pos,
            distance: distance,
            isCharged: isCharged,
            isIgnited: isIgnited,
            remainingFuse: remainingFuse,
            fuseChange: fuseChange,
            threatLevel: threatLevel,
            lastUpdate: Client.getTime()
        });

        return { threatLevel, distance, isCharged, isIgnited, remainingFuse };
    }

    getWarningColor(threatLevel, distance) {
        // Determine appropriate warning color based on threat level
        switch (threatLevel) {
            case "extreme": return 0xFF0000; // Red
            case "high": return 0xFF4444; // Light red
            case "medium": return 0xFF8800; // Orange
            case "elevated": return 0xFFFF00; // Yellow
            default: return 0x00FF00; // Green
        }
    }

    generateWarningMessage(creeperData) {
        const { threatLevel, distance, isCharged, isIgnited, remainingFuse } = creeperData;
        let message = "";

        if (threatLevel === "extreme") {
            message = `&c&&l⚠ EXTREME DANGER! &&l⚠`;
            if (isCharged) message += " &6&&lCHARGED";
            if (isIgnited) message += " &e&&lIGNITED";
            if (remainingFuse > 0) message += ` &c&&l${(remainingFuse/20).toFixed(1)}s`;
        } else if (threatLevel === "high") {
            message = `&c&&lDANGER! Charged & ignited creeper! ${(remainingFuse/20).toFixed(1)}s`;
        } else if (threatLevel === "medium") {
            message = `&eIgnited creeper: ${(remainingFuse/20).toFixed(1)}s`;
        } else if (threatLevel === "elevated") {
            message = `&6Close creeper: ${distance.toFixed(1)}m`;
        }

        if (isCharged) {
            message += " &6⚡";
        }

        return message;
    }

    update() {
        const entities = World.getEntities();
        const currentCreeperUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:creeper")) {
                const creeper = entity.asCreeper();
                const uuid = creeper.getUUID();
                currentCreeperUUIDs.add(uuid);

                const creeperData = this.analyzeCreeper(creeper);
                const warningColor = this.getWarningColor(creeperData.threatLevel, creeperData.distance);
                const warningMessage = this.generateWarningMessage(creeperData);

                // Apply visual warnings
                if (creeperData.threatLevel !== "low") {
                    creeper.setGlowing(true);
                    creeper.setGlowingColor(warningColor);

                    if (creeperData.threatLevel === "extreme" || creeperData.threatLevel === "high") {
                        Chat.actionbar(warningMessage);
                    }
                } else {
                    // Remove glow from safe creepers
                    creeper.resetGlowing();
                }
            }
        });

        // Clean up removed creeper data
        for (const [uuid, data] of this.trackedCreepers) {
            if (!currentCreeperUUIDs.has(uuid)) {
                Chat.log(`&7Creeper removed from tracking: ${data.threatLevel} threat level`);
                this.trackedCreepers.delete(uuid);
            }
        }
    }
}

// Initialize and run the warning system
const creeperWarning = new CreeperWarningSystem();

// Update every tick for real-time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    creeperWarning.update();
}));

// Log startup message
Chat.log("&aCreeper Warning System activated - Monitoring for dangerous creepers");
```

### Creeper Explosion Prediction
```js
// Predict and warn about creeper explosions before they happen
function predictCreeperExplosions() {
    const entities = World.getEntities();
    const player = Player.getPlayer();
    if (!player) return;

    const predictions = [];

    entities.forEach(entity => {
        if (entity.is("minecraft:creeper")) {
            const creeper = entity.asCreeper();
            const pos = entity.getPos();
            const distance = player.distanceTo(entity);
            const isCharged = creeper.isCharged();
            const isIgnited = creeper.isIgnited();
            const remainingFuse = creeper.getRemainingFuseTime();

            // Calculate potential explosion damage radius
            const explosionRadius = isCharged ? 6 : 3; // Charged creepers have larger radius
            const playerInBlastRange = distance <= explosionRadius;

            if (remainingFuse > 0 && playerInBlastRange) {
                predictions.push({
                    creeper: creeper,
                    position: pos,
                    distance: distance,
                    timeToExplosion: remainingFuse / 20,
                    explosionRadius: explosionRadius,
                    isCharged: isCharged,
                    playerInBlastRange: true,
                    threatScore: calculateThreatScore(distance, remainingFuse, isCharged)
                });
            }
        }
    });

    // Sort by threat score (highest first)
    predictions.sort((a, b) => b.threatScore - a.threatScore);

    // Display top 3 most dangerous predictions
    predictions.slice(0, 3).forEach((prediction, index) => {
        const urgency = prediction.timeToExplosion <= 0.5 ? "&&lIMMEDIATE" :
                       prediction.timeToExplosion <= 1.0 ? "&&lURGENT" : "WARNING";

        Chat.log(`${index + 1}. &c${urgency}&r&c: Explosion in ${prediction.timeToExplosion.toFixed(1)}s, ` +
                 `distance ${prediction.distance.toFixed(1)}m, ` +
                 `radius ${prediction.explosionRadius}m${prediction.isCharged ? " &6(CHARGED)" : ""}`);
    });

    if (predictions.length > 0) {
        Chat.actionbar(`&c${predictions.length} imminent explosion${predictions.length > 1 ? 's' : ''} detected!`);
    }
}

function calculateThreatScore(distance, timeToExplosion, isCharged) {
    let score = 0;

    // Distance component (closer = more dangerous)
    score += Math.max(0, 100 - distance * 10);

    // Time component (less time = more dangerous)
    score += Math.max(0, 100 - timeToExplosion * 50);

    // Charged bonus (much more dangerous)
    if (isCharged) score += 50;

    return score;
}

// Run prediction every 5 ticks (4 times per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        predictCreeperExplosions();
    }
}));
```

### Creeper Behavior Analysis
```js
// Analyze creeper behavior patterns and statistics
class CreeperAnalyzer {
    constructor() {
        this.stats = {
            totalSpawned: 0,
            chargedSpawned: 0,
            ignitedCount: 0,
            explosions: 0,
            averageFuseTime: 0,
            fuseTimeSamples: [],
            chargingPatterns: new Map()
        };
        this.activeCreepers = new Map();
    }

    onCreeperSpawn(creeper) {
        this.stats.totalSpawned++;
        if (creeper.isCharged()) {
            this.stats.chargedSpawned++;
        }

        const uuid = creeper.getUUID();
        this.activeCreepers.set(uuid, {
            creeper: creeper,
            spawnTime: Client.getTime(),
            initialCharged: creeper.isCharged(),
            fuseStartTime: null,
            ignitionSource: null
        });

        Chat.log(`&eCreeper spawned (${creeper.isCharged() ? 'charged' : 'normal'})`);
    }

    onCreeperUpdate(creeper) {
        const uuid = creeper.getUUID();
        const creeperData = this.activeCreepers.get(uuid);

        if (!creeperData) {
            this.onCreeperSpawn(creeper);
            return;
        }

        const isIgnited = creeper.isIgnited();
        const fuseTime = creeper.getFuseTime();
        const fuseChange = creeper.getFuseChange();

        // Track ignition events
        if (isIgnited && !creeperData.wasIgnited) {
            creeperData.wasIgnited = true;
            creeperData.fuseStartTime = Client.getTime();
            this.stats.ignitedCount++;

            Chat.log(`&cCreeper ignited! Fuse time: ${creeper.getMaxFuseTime()} ticks`);
        }

        // Track fuse progression
        if (isIgnited && fuseTime > 0) {
            const currentTick = Client.getTime();
            if (!creeperData.fuseSamples) {
                creeperData.fuseSamples = [];
            }

            creeperData.fuseSamples.push({
                tick: currentTick,
                fuseTime: fuseTime,
                fuseChange: fuseChange
            });

            // Detect charging patterns
            if (fuseChange !== 0) {
                const pattern = creeperData.chargingPatterns || [];
                pattern.push({
                    tick: currentTick,
                    change: fuseChange,
                    time: currentTick - (creeperData.fuseStartTime || currentTick)
                });
                creeperData.chargingPatterns = pattern;
            }
        }

        // Check for explosion completion
        if (creeperData.wasIgnited && !isIgnited && creeper.getFuseTime() === 0) {
            this.onCreeperExplode(creeper, creeperData);
        }
    }

    onCreeperExplode(creeper, creeperData) {
        this.stats.explosions++;

        if (creeperData.fuseSamples && creeperData.fuseSamples.length > 0) {
            const finalFuseTime = creeperData.fuseSamples[creeperData.fuseSamples.length - 1].fuseTime;
            this.stats.fuseTimeSamples.push(finalFuseTime);
            this.updateAverageFuseTime();
        }

        const totalTime = Client.getTime() - creeperData.spawnTime;
        Chat.log(`&cCreeper exploded! Total lifetime: ${(totalTime/20).toFixed(1)}s`);

        this.activeCreepers.delete(creeper.getUUID());
    }

    updateAverageFuseTime() {
        if (this.stats.fuseTimeSamples.length > 0) {
            const sum = this.stats.fuseTimeSamples.reduce((a, b) => a + b, 0);
            this.stats.averageFuseTime = sum / this.stats.fuseTimeSamples.length;
        }
    }

    generateReport() {
        const chargedPercentage = this.stats.totalSpawned > 0 ?
            (this.stats.chargedSpawned / this.stats.totalSpawned * 100).toFixed(1) : 0;

        const explosionRate = this.stats.totalSpawned > 0 ?
            (this.stats.explosions / this.stats.totalSpawned * 100).toFixed(1) : 0;

        Chat.log("=== Creeper Analysis Report ===");
        Chat.log(`Total creepers spawned: ${this.stats.totalSpawned}`);
        Chat.log(`Charged creepers: ${this.stats.chargedSpawned} (${chargedPercentage}%)`);
        Chat.log(`Ignited creepers: ${this.stats.ignitedCount}`);
        Chat.log(`Explosions recorded: ${this.stats.explosions} (${explosionRate}%)`);

        if (this.stats.averageFuseTime > 0) {
            Chat.log(`Average fuse time: ${this.stats.averageFuseTime.toFixed(1)} ticks (${(this.stats.averageFuseTime/20).toFixed(2)}s)`);
        }

        Chat.log(`Currently active creepers: ${this.activeCreepers.size}`);
    }

    update() {
        const entities = World.getEntities();
        const currentUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:creeper")) {
                const creeper = entity.asCreeper();
                const uuid = creeper.getUUID();
                currentUUIDs.add(uuid);

                this.onCreeperUpdate(creeper);
            }
        });

        // Remove despawned creepers
        for (const [uuid, creeperData] of this.activeCreepers) {
            if (!currentUUIDs.has(uuid)) {
                Chat.log(`&7Creeper despawned (lived ${((Client.getTime() - creeperData.spawnTime)/20).toFixed(1)}s)`);
                this.activeCreepers.delete(uuid);
            }
        }
    }
}

// Initialize analyzer
const analyzer = new CreeperAnalyzer();

// Update analysis every 20 ticks (once per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) {
        analyzer.update();
    }
}));

// Generate report every 5 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 5) === 0) {
        analyzer.generateReport();
    }
}));

Chat.log("&aCreeper Behavior Analyzer activated");
```

## Notes and Limitations

- CreeperEntityHelper instances become invalid when the creeper entity is removed from the world (exploded, despawned, or unloaded). Always check `isAlive()` before accessing creeper data.
- The fuse timing methods provide real-time information about creeper explosion behavior, but may have slight delays due to network synchronization.
- `isCharged()` returns true for lightning-powered creepers, which have significantly larger explosion radii (6 blocks vs 3 blocks normal).
- `isIgnited()` detects when a creeper has been ignited by flint and steel or other means, indicating it will explode unless defused.
- `getRemainingFuseTime()` returns -1 when the creeper is not actively counting down to explosion.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight dangerous creepers for better visibility.
- The inheritance hierarchy provides access to all living entity and mob methods, including health monitoring, status effects, and AI state detection.

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and attack states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `StatusEffectHelper` - Status effect management and detection
- `Pos3D` - Position and distance calculations for threat assessment

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized mob helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft CreeperEntity implementation
- Inherits comprehensive functionality from the mob and living entity helper hierarchy