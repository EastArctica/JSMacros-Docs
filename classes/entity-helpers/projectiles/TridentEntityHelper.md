# TridentEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.projectile.TridentEntityHelper`

**Extends:** `EntityHelper<TridentEntity>`

The `TridentEntityHelper` class provides specialized access to trident entities in Minecraft, offering methods to monitor and interact with trident-specific behaviors such as loyalty enchantment status and enchantment detection. This class extends `EntityHelper` and inherits all functionality for entities including position tracking, movement monitoring, and world interaction.

This helper is particularly useful for creating scripts that detect trident projectiles, monitor their behavior patterns, track loyalty effects, or analyze combat scenarios involving tridents.

## Constructors

TridentEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `ProjectileHit`)
- World entity queries using type filtering for "minecraft:trident"
- Casting from generic EntityHelper instances when dealing with trident entities

## Methods

### Trident Properties

- [trident.hasLoyalty()](#tridenthasloyalty)
- [trident.isEnchanted()](#tridentisenchanted)

### Inherited Methods

The TridentEntityHelper inherits all methods from:
- **EntityHelper:** Position, movement, world interaction, velocity, raytracing, type casting

---

## Trident Properties

## Usage Examples

### Trident Detection and Classification
```js
// Detect and classify tridents in the world
function detectAndClassifyTridents() {
    const entities = World.getEntities();
    const player = Player.getPlayer();
    if (!player) return;

    const tridents = [];

    entities.forEach(entity => {
        if (entity.is("minecraft:trident")) {
            const trident = entity;
            const distance = player.distanceTo(trident);
            const hasLoyalty = trident.hasLoyalty();
            const isEnchanted = trident.isEnchanted();
            const pos = trident.getPos();
            const velocity = trident.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

            tridents.push({
                trident: trident,
                distance: distance,
                position: pos,
                hasLoyalty: hasLoyalty,
                isEnchanted: isEnchanted,
                speed: speed,
                moving: speed > 0.1
            });
        }
    });

    if (tridents.length > 0) {
        Chat.log(`Found ${tridents.length} trident(s):`);

        tridents.forEach((tridentData, index) => {
            const type = tridentData.hasLoyalty ? "Loyal" : "Regular";
            const enchanted = tridentData.isEnchanted ? " (Enchanted)" : "";
            const movement = tridentData.moving ? ` (Moving: ${tridentData.speed.toFixed(1)} b/s)` : " (Stationary)";

            Chat.log(`${index + 1}. ${type} Trident${enchanted}${movement} - ${tridentData.distance.toFixed(1)}m away`);

            // Color-code based on properties
            if (tridentData.hasLoyalty) {
                tridentData.trident.setGlowing(true);
                tridentData.trident.setGlowingColor(0x0099FF); // Blue for loyalty
            } else if (tridentData.isEnchanted) {
                tridentData.trident.setGlowing(true);
                tridentData.trident.setGlowingColor(0xFFAA00); // Orange for enchanted
            }
        });
    }
}

// Run detection every second
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) {
        detectAndClassifyTridents();
    }
}));
```

### Loyalty Tracking System
```js
// Track trident loyalty behavior and return patterns
class LoyaltyTracker {
    constructor() {
        this.tridentLifetimes = new Map();
        this.loyaltyStatistics = {
            totalTridents: 0,
            loyalTridents: 0,
            averageReturnTime: 0,
            returnTimes: []
        };
    }

    onTridentSpawn(trident) {
        const uuid = trident.getUUID();
        const hasLoyalty = trident.hasLoyalty();

        this.loyaltyStatistics.totalTridents++;
        if (hasLoyalty) {
            this.loyaltyStatistics.loyalTridents++;
        }

        this.tridentLifetimes.set(uuid, {
            trident: trident,
            hasLoyalty: hasLoyalty,
            spawnTime: Client.getTime(),
            returnStartTime: null,
            peakDistance: 0,
            owner: null
        });

        const type = hasLoyalty ? "Loyal" : "Regular";
        Chat.log(`&9${type} trident spawned and tracked`);
    }

    onTridentUpdate(trident) {
        const uuid = trident.getUUID();
        const tracker = this.tridentLifetimes.get(uuid);

        if (!tracker) {
            this.onTridentSpawn(trident);
            return;
        }

        const pos = trident.getPos();
        const velocity = trident.getVelocity();
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.z * velocity.z);
        const player = Player.getPlayer();

        if (player) {
            const distance = player.distanceTo(trident);
            tracker.peakDistance = Math.max(tracker.peakDistance, distance);

            // Detect when a loyal trident starts returning
            if (tracker.hasLoyalty && tracker.returnStartTime === null && speed > 5 && distance < 20) {
                tracker.returnStartTime = Client.getTime();
                Chat.log(`&9Loyal trident starting return journey (max distance: ${tracker.peakDistance.toFixed(1)}m)`);
            }

            // Check if trident is returning to player
            if (tracker.hasLoyalty && tracker.returnStartTime !== null) {
                const returnDuration = (Client.getTime() - tracker.returnStartTime) / 20;

                if (distance < 2 && speed < 1) {
                    // Trident has returned to player
                    this.onTridentReturned(tracker);
                } else {
                    // Still returning
                    Chat.actionbar(`&9Trident returning: ${distance.toFixed(1)}m away (${returnDuration.toFixed(1)}s)`);
                }
            }
        }
    }

    onTridentReturned(tracker) {
        const returnTime = (Client.getTime() - tracker.returnStartTime) / 20;
        this.loyaltyStatistics.returnTimes.push(returnTime);
        this.updateAverageReturnTime();

        Chat.log(`&aLoyal trident returned to player in ${returnTime.toFixed(2)} seconds (max distance: ${tracker.peakDistance.toFixed(1)}m)`);
        this.tridentLifetimes.delete(tracker.trident.getUUID());
    }

    updateAverageReturnTime() {
        if (this.loyaltyStatistics.returnTimes.length > 0) {
            const sum = this.loyaltyStatistics.returnTimes.reduce((a, b) => a + b, 0);
            this.loyaltyStatistics.averageReturnTime = sum / this.loyaltyStatistics.returnTimes.length;
        }
    }

    update() {
        const entities = World.getEntities();
        const currentUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:trident")) {
                const uuid = entity.getUUID();
                currentUUIDs.add(uuid);
                this.onTridentUpdate(entity);
            }
        });

        // Clean up despawned tridents
        for (const [uuid, tracker] of this.tridentLifetimes) {
            if (!currentUUIDs.has(uuid)) {
                const lifetime = (Client.getTime() - tracker.spawnTime) / 20;
                const type = tracker.hasLoyalty ? "Loyal" : "Regular";
                Chat.log(`&7${type} trident despawned (lived ${lifetime.toFixed(1)}s)`);
                this.tridentLifetimes.delete(uuid);
            }
        }
    }

    generateReport() {
        const loyaltyPercentage = this.loyaltyStatistics.totalTridents > 0 ?
            (this.loyaltyStatistics.loyalTridents / this.loyaltyStatistics.totalTridents * 100).toFixed(1) : 0;

        Chat.log("=== Loyalty Tracking Report ===");
        Chat.log(`Total tridents tracked: ${this.loyaltyStatistics.totalTridents}`);
        Chat.log(`Loyalty tridents: ${this.loyaltyStatistics.loyalTridents} (${loyaltyPercentage}%)`);
        Chat.log(`Currently tracking: ${this.tridentLifetimes.size}`);

        if (this.loyaltyStatistics.averageReturnTime > 0) {
            Chat.log(`Average return time: ${this.loyaltyStatistics.averageReturnTime.toFixed(2)} seconds`);
            Chat.log(`Successful returns recorded: ${this.loyaltyStatistics.returnTimes.length}`);
        }
    }
}

// Initialize loyalty tracker
const loyaltyTracker = new LoyaltyTracker();

// Update every 5 ticks (4 times per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        loyaltyTracker.update();
    }
}));

// Generate report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        loyaltyTracker.generateReport();
    }
}));

Chat.log("&aTrident Loyalty Tracker activated");
```

### Trident Combat Effectiveness Analysis
```js
// Analyze the effectiveness of tridents in combat scenarios
class TridentCombatAnalyzer {
    constructor() {
        this.combatEvents = [];
        this.tridentStats = new Map();
        this.effectivenessMetrics = {
            totalTridents: 0,
            hitsLanded: 0,
            missedShots: 0,
            enchantmentEffectiveness: new Map()
        };
    }

    recordTridentLaunch(trident, sourcePlayer) {
        const uuid = trident.getUUID();
        const hasLoyalty = trident.hasLoyalty();
        const isEnchanted = trident.isEnchanted();

        let enchantments = [];
        if (isEnchanted) {
            const nbt = trident.getNBT();
            if (nbt.contains("Loyalty")) enchantments.push(`Loyalty ${nbt.getInt("Loyalty")}`);
            if (nbt.contains("Impaling")) enchantments.push(`Impaling ${nbt.getInt("Impaling")}`);
            if (nbt.contains("Riptide")) enchantments.push(`Riptide ${nbt.getInt("Riptide")}`);
            if (nbt.contains("Channeling")) enchantments.push("Channeling");
        }

        this.tridentStats.set(uuid, {
            trident: trident,
            sourcePlayer: sourcePlayer,
            launchTime: Client.getTime(),
            hasLoyalty: hasLoyalty,
            enchantments: enchantments,
            hits: 0,
            hitTargets: new Set(),
            maxDistance: 0
        });

        const type = hasLoyalty ? "Loyal" : "Regular";
        const enchants = enchantments.length > 0 ? ` (${enchantments.join(", ")})` : "";
        Chat.log(`&9${type} trident launched${enchants}`);
    }

    recordProjectileHit(event) {
        // This would be triggered by projectile hit events
        const projectile = event.getProjectile();
        if (projectile && projectile.is("minecraft:trident")) {
            const uuid = projectile.getUUID();
            const stats = this.tridentStats.get(uuid);

            if (stats) {
                stats.hits++;
                stats.hitTargets.add(event.getEntity().getUUID());

                const target = event.getEntity();
                const targetName = target.getName().getString();
                const distance = projectile.distanceTo(target);
                stats.maxDistance = Math.max(stats.maxDistance, distance);

                Chat.log(`&cTrident hit ${targetName} at ${distance.toFixed(1)}m distance`);
                this.effectivenessMetrics.hitsLanded++;

                // Analyze enchantment effectiveness
                stats.enchantments.forEach(enchantment => {
                    const [name, level] = enchantment.split(" ");
                    const key = level ? `${name}_${level}` : name;
                    this.effectivenessMetrics.enchantmentEffectiveness.set(
                        key,
                        (this.effectivenessMetrics.enchantmentEffectiveness.get(key) || 0) + 1
                    );
                });
            }
        }
    }

    updateTracking() {
        const entities = World.getEntities();
        const currentUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:trident")) {
                currentUUIDs.add(entity.getUUID());
            }
        });

        // Check for tridents that disappeared without hitting
        for (const [uuid, stats] of this.tridentStats) {
            if (!currentUUIDs.has(uuid)) {
                const lifetime = (Client.getTime() - stats.launchTime) / 20;

                if (stats.hits === 0) {
                    this.effectivenessMetrics.missedShots++;
                    Chat.log(`&7Trident missed (lived ${lifetime.toFixed(1)}s)`);
                } else {
                    const targetsHit = stats.hitTargets.size;
                    const efficiency = targetsHit > 0 ? (stats.hits / targetsHit).toFixed(2) : "0";
                    Chat.log(`&aTrident analysis complete: ${stats.hits} hits on ${targetsHit} targets, max distance ${stats.maxDistance.toFixed(1)}m, efficiency ${efficiency}`);
                }

                this.tridentStats.delete(uuid);
            }
        }
    }

    generateCombatReport() {
        const accuracy = this.effectivenessMetrics.totalTridents > 0 ?
            (this.effectivenessMetrics.hitsLanded / this.effectivenessMetrics.totalTridents * 100).toFixed(1) : 0;

        Chat.log("=== Trident Combat Report ===");
        Chat.log(`Total tridents analyzed: ${this.effectivenessMetrics.totalTridents}`);
        Chat.log(`Successful hits: ${this.effectivenessMetrics.hitsLanded}`);
        Chat.log(`Missed shots: ${this.effectivenessMetrics.missedShots}`);
        Chat.log(`Accuracy rate: ${accuracy}%`);
        Chat.log(`Currently tracking: ${this.tridentStats.size}`);

        if (this.effectivenessMetrics.enchantmentEffectiveness.size > 0) {
            Chat.log("\nEnchantment effectiveness:");
            const sortedEffects = Array.from(this.effectivenessMetrics.enchantmentEffectiveness.entries())
                .sort((a, b) => b[1] - a[1]);

            sortedEffects.forEach(([enchantment, hits]) => {
                Chat.log(`  ${enchantment}: ${hits} successful hits`);
            });
        }
    }
}

// Initialize combat analyzer
const combatAnalyzer = new TridentCombatAnalyzer();

// Track trident launches (would need player interaction events)
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:trident")) {
        combatAnalyzer.effectivenessMetrics.totalTridents++;
        // In a real implementation, you'd determine the source player here
        combatAnalyzer.recordTridentLaunch(entity, null);
    }
}));

// Update tracking every 20 ticks (once per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) {
        combatAnalyzer.updateTracking();
    }
}));

// Generate combat report every 5 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 5) === 0) {
        combatAnalyzer.generateCombatReport();
    }
}));

Chat.log("&aTrident Combat Analyzer activated");
```

## Notes and Limitations

- TridentEntityHelper instances become invalid when the trident entity is removed from the world (hit a target, returned to owner, or despawned). Always check `isAlive()` before accessing trident data.
- The `hasLoyalty()` method checks the internal loyalty level data tracker, returning true for any loyalty level greater than 0.
- `isEnchanted()` provides a quick check for any enchantments, but detailed enchantment information requires reading the entity's NBT data.
- Tridents can have multiple enchantments simultaneously, including Loyalty, Impaling, Riptide, and Channeling.
- Loyalty tridents will return to their thrower after hitting targets or reaching maximum distance, with return speed varying by loyalty level.
- The inheritance hierarchy provides access to all base entity methods including position tracking, velocity monitoring, and world interaction capabilities.
- Projectile-specific behaviors like flight paths and impact detection are inherited from the base EntityHelper class.

## Related Classes

- `EntityHelper` - Base entity functionality for position, movement, velocity, and world interaction
- `ArrowEntityHelper` - Similar projectile helper for arrows with arrow-specific methods
- `ProjectileEntityHelper` - Base functionality for all projectile entities
- `Pos3D` - Position and distance calculations for tracking trident trajectories
- `NBTElementHelper` - NBT data access for detailed enchantment information

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized projectile helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft TridentEntity implementation
- Inherits comprehensive functionality from the entity helper hierarchy
- Designed specifically for trident projectile tracking and analysis in combat scenarios