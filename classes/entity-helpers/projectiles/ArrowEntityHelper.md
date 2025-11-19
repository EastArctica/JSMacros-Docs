# ArrowEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.projectile.ArrowEntityHelper`

**Extends:** `EntityHelper<PersistentProjectileEntity>`

Represents arrow entities and other persistent projectiles in the world such as arrows, spectral arrows, and crossbow bolts. ArrowEntityHelper provides access to arrow-specific properties like critical hits, piercing level, color effects, and weapon source. Instances are typically obtained from entity events, world queries, or by accessing nearby projectile entities.

This class extends `EntityHelper` and inherits all methods for position, movement, and general entity properties, while adding specialized functionality for arrows and projectiles.

## Methods
- [arrow.getColor()](#arrowgetcolor)
- [arrow.isCritical()](#arrowiscritical)
- [arrow.getPiercingLevel()](#arrowgetpiercinglevel)
- [arrow.isShotFromCrossbow()](#arrowisshotfromcrossbow)

---

## Usage Examples

### Arrow Tracking System
```js
// Comprehensive arrow tracking and analysis
class ArrowTracker {
    constructor() {
        this.trackedArrows = new Map();
        this.arrowStats = {
            totalFired: 0,
            bowArrows: 0,
            crossbowBolts: 0,
            criticalHits: 0,
            piercingHits: 0
        };
    }

    startTracking() {
        // Track arrow spawns
        JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:arrow")) {
                this.trackArrow(entity);
            }
        }));

        // Track arrow impacts/despawns
        JsMacros.on("EntityDespawn", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:arrow")) {
                this.onArrowDespawn(entity);
            }
        }));

        // Periodic status report
        setInterval(() => {
            this.reportStatus();
        }, 30000); // Every 30 seconds
    }

    trackArrow(arrowEntity) {
        const arrow = arrowEntity.asArrow();
        const uuid = arrowEntity.getUUID();

        this.arrowStats.totalFired++;

        if (arrow.isShotFromCrossbow()) {
            this.arrowStats.crossbowBolts++;
        } else {
            this.arrowStats.bowArrows++;
        }

        if (arrow.isCritical()) {
            this.arrowStats.criticalHits++;
        }

        if (arrow.getPiercingLevel() > 0) {
            this.arrowStats.piercingHits++;
        }

        this.trackedArrows.set(uuid, {
            entity: arrowEntity,
            arrow: arrow,
            spawnTime: Date.now(),
            startPos: arrowEntity.getPos()
        });

        Chat.log(`§7Tracking arrow: ${this.getArrowDescription(arrow)}`);
    }

    onArrowDespawn(arrowEntity) {
        const uuid = arrowEntity.getUUID();
        const arrowData = this.trackedArrows.get(uuid);

        if (arrowData) {
            const lifetime = (Date.now() - arrowData.spawnTime) / 1000;
            const distance = arrowEntity.getPos().distanceTo(arrowData.startPos);

            Chat.log(`§8Arrow despawned - Lifetime: ${lifetime.toFixed(1)}s, Distance: ${distance.toFixed(1)}m`);
            this.trackedArrows.delete(uuid);
        }
    }

    getArrowDescription(arrow) {
        const parts = [];

        if (arrow.isShotFromCrossbow()) {
            parts.push("Crossbow");
        } else {
            parts.push("Bow");
        }

        if (arrow.isCritical()) {
            parts.push("Critical");
        }

        const piercing = arrow.getPiercingLevel();
        if (piercing > 0) {
            parts.push(`Piercing ${piercing}`);
        }

        const color = arrow.getColor();
        if (color === 0xF8FFFE) {
            parts.push("Spectral");
        } else if (color !== -1) {
            parts.push("Tipped");
        }

        return parts.join(" ") + " Arrow";
    }

    reportStatus() {
        Chat.log("=== Arrow Tracker Status ===");
        Chat.log(`Currently tracking: ${this.trackedArrows.size} arrows`);
        Chat.log(`Total fired: ${this.arrowStats.totalFired}`);
        Chat.log(`Bow arrows: ${this.arrowStats.bowArrows}`);
        Chat.log(`Crossbow bolts: ${this.arrowStats.crossbowBolts}`);
        Chat.log(`Critical hits: ${this.arrowStats.criticalHits}`);
        Chat.log(`Piercing hits: ${this.arrowStats.piercingHits}`);
    }
}

const arrowTracker = new ArrowTracker();
arrowTracker.startTracking();
```

### Arrow Dodge Assistant
```js
// System to warn about incoming dangerous arrows
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const dangerousArrows = [];

    // Check for arrows within 20 blocks
    const nearbyEntities = World.getEntitiesInRange(
        playerPos.x, playerPos.y, playerPos.z, 20
    );

    nearbyEntities.forEach(entity => {
        if (entity.is("minecraft:arrow")) {
            const arrow = entity.asArrow();
            const arrowPos = entity.getPos();
            const distance = playerPos.distanceTo(arrowPos);

            // Calculate if arrow is heading towards player
            const velocity = entity.getVelocity();
            const arrowToPlayer = playerPos.sub(arrowPos);
            const dotProduct = velocity.x * arrowToPlayer.x + velocity.y * arrowToPlayer.y + velocity.z * arrowToPlayer.z;

            // Arrow is dangerous if it's close and moving towards player
            if (distance < 12 && dotProduct > 0) {
                const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

                // Calculate time to impact
                const timeToImpact = distance / Math.max(speed, 1.0);

                // Determine threat level
                let threatLevel = "LOW";
                if (arrow.isCritical()) threatLevel = "HIGH";
                if (arrow.getPiercingLevel() > 2) threatLevel = "CRITICAL";
                if (distance < 6 && timeToImpact < 0.5) threatLevel = "IMMEDIATE";

                dangerousArrows.push({
                    entity: arrow,
                    distance: distance,
                    timeToImpact: timeToImpact,
                    threatLevel: threatLevel
                });
            }
        }
    });

    // Show warning for most dangerous arrow
    if (dangerousArrows.length > 0) {
        const mostDangerous = dangerousArrows.reduce((most, current) =>
            current.timeToImpact < most.timeToImpact ? current : most
        );

        let warningColor = "§e";
        if (mostDangerous.threatLevel === "HIGH") warningColor = "§c";
        if (mostDangerous.threatLevel === "CRITICAL") warningColor = "§4";
        if (mostDangerous.threatLevel === "IMMEDIATE") warningColor = "§4§l";

        Chat.actionbar(`${warningColor}${mostDangerous.threatLevel} ARROW WARNING - ${mostDangerous.timeToImpact.toFixed(1)}s`);
    }
}));
```

### Arrow Collection and Analysis
```js
// Collect and analyze arrow data for combat statistics
class ArrowAnalyzer {
    constructor() {
        this.arrowDatabase = new Map();
        this.combatLog = [];
    }

    analyzeArrowImpact(arrow, target, damage) {
        const arrowData = {
            type: this.getArrowType(arrow),
            damage: damage,
            critical: arrow.isCritical(),
            piercing: arrow.getPiercingLevel(),
            fromCrossbow: arrow.isShotFromCrossbow(),
            color: arrow.getColor(),
            timestamp: Date.now()
        };

        this.combatLog.push(arrowData);
        this.updateStatistics(arrowData);

        return arrowData;
    }

    getArrowType(arrow) {
        if (arrow.getColor() === 0xF8FFFE) return "Spectral";
        if (arrow.getColor() !== -1) return "Tipped";
        if (arrow.getPiercingLevel() > 0) return "Piercing";
        if (arrow.isShotFromCrossbow()) return "Crossbow Bolt";
        return "Regular";
    }

    updateStatistics(arrowData) {
        const type = arrowData.type;
        if (!this.arrowDatabase.has(type)) {
            this.arrowDatabase.set(type, {
                count: 0,
                totalDamage: 0,
                criticalHits: 0,
                averageDamage: 0
            });
        }

        const stats = this.arrowDatabase.get(type);
        stats.count++;
        stats.totalDamage += arrowData.damage;
        if (arrowData.critical) stats.criticalHits++;
        stats.averageDamage = stats.totalDamage / stats.count;
    }

    generateReport() {
        Chat.log("=== Arrow Combat Analysis ===");
        Chat.log(`Total arrows analyzed: ${this.combatLog.length}`);

        let totalDamage = 0;
        let criticalCount = 0;

        this.arrowDatabase.forEach((stats, type) => {
            const critRate = (stats.criticalHits / stats.count * 100).toFixed(1);
            Chat.log(`${type}: ${stats.count} hits, ${stats.averageDamage.toFixed(1)} avg dmg, ${critRate}% crit`);
            totalDamage += stats.totalDamage;
            criticalCount += stats.criticalHits;
        });

        const overallCritRate = (criticalCount / this.combatLog.length * 100).toFixed(1);
        Chat.log(`Overall: ${totalDamage.toFixed(1)} total damage, ${overallCritRate}% critical hit rate`);
    }
}

const arrowAnalyzer = new ArrowAnalyzer();

// Monitor for arrow damage
JsMacros.on("EntityHurt", JavaWrapper.methodToJavaAsync((event) => {
    const source = event.getSource();
    const victim = event.getEntity();
    const damage = event.getDamage();

    if (source && source.is("minecraft:arrow")) {
        const arrow = source.asArrow();
        const analysis = arrowAnalyzer.analyzeArrowImpact(arrow, victim, damage);

        Chat.log(String.format(
            "§c%s hit %s with %s arrow for %.1f damage%s",
            source.getOwner() ? source.getOwner().getName().getString() : "Unknown",
            victim.getName().getString(),
            analysis.type,
            damage,
            analysis.critical ? " (CRITICAL!)" : ""
        ));
    }
}));

// Generate report every 5 minutes
setInterval(() => {
    arrowAnalyzer.generateReport();
}, 5 * 60 * 1000);
```

## Inherited Methods

From `EntityHelper`:

- `getPos()` - Returns entity position as Pos3D
- `getX()`, `getY()`, `getZ()` - Returns individual coordinates
- `getName()` - Returns entity name as TextHelper
- `getType()` - Returns entity type ID ("minecraft:arrow")
- `getVelocity()` - Returns velocity vector for trajectory calculation
- `is()` - Checks if entity matches specified types
- `getUUID()` - Returns entity UUID for tracking
- `distanceTo(entity/pos)` - Calculates distance
- `isAlive()` - Checks if arrow is still in flight
- `getOwner()` - Returns the entity that fired the arrow
- And many more position, movement, and utility methods

## Notes and Limitations

- ArrowEntityHelper instances represent arrows in flight or stuck in entities/blocks
- Some properties like piercing level are only set when fired from appropriately enchanted weapons
- Arrow color detection may be limited for custom arrows from mods
- Velocity calculations can be used to predict arrow trajectories
- Critical hit status is determined at firing time and affects damage calculation
- Arrow entities may despawn after hitting certain block types or after a time limit
- Crossbow vs bow detection affects damage calculation and available enchantments

## Related Classes

- `EntityHelper` - Parent class with general entity methods
- `ItemStackHelper` - Represents bows, crossbows, and arrows as items
- `PlayerEntityHelper` - For accessing the player who fired the arrow
- `Pos3D` - Used for arrow positions and velocity vectors
- `LivingEntityHelper` - For entities that can be hit by arrows

## Version Information

- Available since JSMacros 1.8.4
- Inherits all EntityHelper methods with their respective version availability
- Arrow-specific methods available since initial release in 1.8.4