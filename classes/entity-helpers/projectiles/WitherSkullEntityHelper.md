# WitherSkullEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.projectile.WitherSkullEntityHelper`

**Extends:** `EntityHelper<WitherSkullEntity>`

The `WitherSkullEntityHelper` class provides specialized access to wither skull entities in Minecraft, offering methods to monitor and interact with wither skull-specific behaviors such as charged state detection. This class extends `EntityHelper` and inherits all functionality for entities including position tracking, movement monitoring, and world interaction.

This helper is particularly useful for creating scripts that detect wither skull projectiles, monitor their behavior patterns, track dangerous skulls, or analyze combat scenarios involving withers or wither skull dispensers.

## Constructors

WitherSkullEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `ProjectileHit`, `EntityHurt`)
- World entity queries using type filtering for "minecraft:wither_skull"
- Casting from generic EntityHelper instances when dealing with wither skull entities

## Methods

### Wither Skull Properties

- [witherSkull.isCharged()](#witherskullischarged)

### Inherited Methods

The WitherSkullEntityHelper inherits all methods from:
- **EntityHelper:** Position, movement, world interaction, velocity, raytracing, type casting

---

## Wither Skull Properties

## Usage Examples

### Wither Skull Detection and Analysis
```js
// Detect and classify wither skulls in the world
function detectWitherSkulls() {
    const entities = World.getEntities();
    const player = Player.getPlayer();
    if (!player) return;

    const witherSkulls = [];

    entities.forEach(entity => {
        if (entity.is("minecraft:wither_skull")) {
            const skull = entity;
            const distance = player.distanceTo(skull);
            const isCharged = skull.isCharged();
            const pos = skull.getPos();
            const velocity = skull.getVelocity();
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

            witherSkulls.push({
                skull: skull,
                distance: distance,
                position: pos,
                isCharged: isCharged,
                speed: speed,
                moving: speed > 0.1,
                dangerous: isCharged || speed > 2.0
            });
        }
    });

    if (witherSkulls.length > 0) {
        Chat.log(`Found ${witherSkulls.length} wither skull(s):`);

        witherSkulls.forEach((skullData, index) => {
            const type = skullData.isCharged ? "Blue Charged" : "Regular";
            const danger = skullData.dangerous ? " (DANGEROUS)" : "";
            const movement = skullData.moving ? ` (Speed: ${skullData.speed.toFixed(1)} b/s)` : " (Stationary)";

            Chat.log(`${index + 1}. ${type} Wither Skull${danger}${movement} - ${skullData.distance.toFixed(1)}m away`);

            // Color-code based on danger level
            if (skullData.isCharged) {
                skullData.skull.setGlowing(true);
                skullData.skull.setGlowingColor(0x0080FF); // Blue for charged skulls
            } else if (skullData.dangerous) {
                skullData.skull.setGlowing(true);
                skullData.skull.setGlowingColor(0xFF0000); // Red for dangerous fast skulls
            }
        });
    }
}

// Run detection every second
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) {
        detectWitherSkulls();
    }
}));
```

### Wither Skull Warning System
```js
// Advanced wither skull detection and warning system
class WitherSkullWarningSystem {
    constructor() {
        this.trackedSkulls = new Map();
        this.dangerThreshold = 20; // blocks
        this.imminentThreatThreshold = 8; // blocks
        this.warningInterval = 1000; // milliseconds
        this.lastWarningTime = 0;
        this.statistics = {
            totalDetected: 0,
            chargedSkulls: 0,
            nearMisses: 0,
            hitsTaken: 0
        };
    }

    updateSkullTracking() {
        const entities = World.getEntities();
        const player = Player.getPlayer();
        if (!player) return;

        const currentUUIDs = new Set();
        const playerPos = player.getPos();

        entities.forEach(entity => {
            if (entity.is("minecraft:wither_skull")) {
                const uuid = entity.getUUID();
                const isCharged = entity.isCharged();
                const skullPos = entity.getPos();
                const distance = playerPos.distanceTo(skullPos);
                const velocity = entity.getVelocity();
                const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

                currentUUIDs.add(uuid);

                if (!this.trackedSkulls.has(uuid)) {
                    this.trackedSkulls.set(uuid, {
                        entity: entity,
                        isCharged: isCharged,
                        spawnTime: Client.getTime(),
                        initialPosition: skullPos,
                        maxSpeed: speed,
                        minDistance: distance,
                        lastWarning: 0
                    });

                    this.statistics.totalDetected++;
                    if (isCharged) this.statistics.chargedSkulls++;

                    const skullType = isCharged ? "Charged Blue" : "Regular";
                    Chat.log(`&c&l⚠ &c${skullType} wither skull detected at ${distance.toFixed(1)}m!`);
                } else {
                    const skullData = this.trackedSkulls.get(uuid);
                    skullData.maxSpeed = Math.max(skullData.maxSpeed, speed);
                    skullData.minDistance = Math.min(skullData.minDistance, distance);
                }

                // Check for immediate threats
                this.evaluateThreat(entity, uuid, playerPos, distance, velocity, isCharged);
            }
        });

        // Clean up despawned skulls
        for (const [uuid, skullData] of this.trackedSkulls) {
            if (!currentUUIDs.has(uuid)) {
                const lifetime = (Client.getTime() - skullData.spawnTime) / 20;
                const skullType = skullData.isCharged ? "Charged" : "Regular";
                Chat.log(`&7${skullType} wither skull despawned (lived ${lifetime.toFixed(1)}s, max speed: ${skullData.maxSpeed.toFixed(1)}b/s)`);
                this.trackedSkulls.delete(uuid);
            }
        }
    }

    evaluateThreat(skullEntity, uuid, playerPos, distance, velocity, isCharged) {
        const skullData = this.trackedSkulls.get(uuid);
        const currentTime = Date.now();

        // Calculate if skull is heading towards player
        const skullToPlayer = playerPos.sub(skullEntity.getPos());
        const dotProduct = velocity.x * skullToPlayer.x + velocity.y * skullToPlayer.y + velocity.z * skullToPlayer.z;
        const isHeadingTowardsPlayer = dotProduct > 0;

        let threatLevel = "LOW";
        let warningColor = "&e";
        let actionRequired = false;

        // Determine threat level
        if (isCharged) {
            threatLevel = "HIGH";
            warningColor = "&c";
            if (distance < 15) {
                threatLevel = "CRITICAL";
                warningColor = "&4";
            }
        }

        if (distance < this.imminentThreatThreshold && isHeadingTowardsPlayer) {
            threatLevel = "IMMINENT";
            warningColor = "&4&l";
            actionRequired = true;
        } else if (distance < this.dangerThreshold && isHeadingTowardsPlayer) {
            threatLevel = "DANGER";
            warningColor = "&6";
            actionRequired = true;
        }

        // Calculate time to impact if heading towards player
        let timeToImpact = Infinity;
        if (isHeadingTowardsPlayer && distance > 0) {
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);
            if (speed > 0.1) {
                timeToImpact = distance / speed;
            }
        }

        // Issue warnings
        if (actionRequired && (currentTime - skullData.lastWarning > this.warningInterval)) {
            const skullType = isCharged ? "Charged" : "Regular";
            const timeText = timeToImpact < Infinity ? ` (${timeToImpact.toFixed(1)}s to impact)` : "";

            Chat.actionbar(`${warningColor}${skullType} WITHER SKULL WARNING - ${threatLevel} - ${distance.toFixed(1)}m${timeText}`);

            if (threatLevel === "IMMINENT") {
                Chat.log(`&4&l⚠ IMMINENT WITHERSKULL THREAT - ${skullType} skull at ${distance.toFixed(1)}m!`);
            }

            skullData.lastWarning = currentTime;

            // Highlight dangerous skulls
            skullEntity.setGlowing(true);
            if (isCharged) {
                skullEntity.setGlowingColor(0x0080FF); // Blue for charged
            } else {
                skullEntity.setGlowingColor(0xFF0000); // Red for dangerous
            }
        }

        // Check for near misses
        if (distance < 3 && !skullData.nearMissLogged) {
            this.statistics.nearMisses++;
            skullData.nearMissLogged = true;
            Chat.log(`&6Near miss! Wither skull passed within 3 blocks.`);
        }
    }

    generateStatusReport() {
        Chat.log("=== Wither Skull Warning System Status ===");
        Chat.log(`Currently tracking: ${this.trackedSkulls.size} wither skulls`);
        Chat.log(`Total detected: ${this.statistics.totalDetected}`);
        Chat.log(`Charged skulls: ${this.statistics.chargedSkulls}`);
        Chat.log(`Near misses: ${this.statistics.nearMisses}`);
        Chat.log(`Hits taken: ${this.statistics.hitsTaken}`);

        if (this.trackedSkulls.size > 0) {
            Chat.log("\n&6Active Threats:");
            const dangerousSkulls = Array.from(this.trackedSkulls.values())
                .filter(skull => skull.entity.isCharged() || skull.minDistance < 15);

            dangerousSkulls.forEach((skullData, index) => {
                const currentDistance = Player.getPlayer().distanceTo(skullData.entity);
                const skullType = skullData.isCharged ? "Charged" : "Regular";
                Chat.log(`${index + 1}. ${skullType} - ${currentDistance.toFixed(1)}m away (min: ${skullData.minDistance.toFixed(1)}m)`);
            });
        }
    }

    update() {
        this.updateSkullTracking();
    }
}

// Initialize warning system
const witherSkullWarning = new WitherSkullWarningSystem();

// Update tracking every 5 ticks (4 times per second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 5 === 0) {
        witherSkullWarning.update();
    }
}));

// Generate report every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        witherSkullWarning.generateStatusReport();
    }
}));

Chat.log("&aWither Skull Warning System activated!");
```

### Wither Combat Analysis
```js
// Analyze wither combat and skull effectiveness
class WitherCombatAnalyzer {
    constructor() {
        this.combatSession = {
            startTime: null,
            withersFought: new Set(),
            skullsFired: 0,
            chargedSkullsFired: 0,
            damageDealt: 0,
            playerHits: 0,
            combatLog: []
        };
        this.skullTrajectories = new Map();
    }

    startCombat(witherEntity) {
        const witherUUID = witherEntity.getUUID();
        if (!this.combatSession.witherUUIDs.has(witherUUID)) {
            this.combatSession.witherUUIDs.add(witherUUID);

            if (!this.combatSession.startTime) {
                this.combatSession.startTime = Client.getTime();
            }

            const witherPos = witherEntity.getPos();
            Chat.log(`&6Wither combat started! Wither at [${witherPos.x.toFixed(0)}, ${witherPos.y.toFixed(0)}, ${witherPos.z.toFixed(0)}]`);
        }
    }

    recordSkullFiring(skullEntity, witherEntity) {
        const skullUUID = skullEntity.getUUID();
        const isCharged = skullEntity.isCharged();
        const skullPos = skullEntity.getPos();
        const velocity = skullEntity.getVelocity();
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z);

        this.combatSession.skullsFired++;
        if (isCharged) {
            this.combatSession.chargedSkullsFired++;
        }

        // Record trajectory for analysis
        this.skullTrajectories.set(skullUUID, {
            skull: skullEntity,
            isCharged: isCharged,
            startPosition: skullPos,
            initialVelocity: velocity,
            initialSpeed: speed,
            firingTime: Client.getTime(),
            witherSource: witherEntity.getUUID(),
            hits: [],
            maxDistance: 0,
            flightTime: 0
        });

        const skullType = isCharged ? "Blue Charged" : "Regular";
        const speedDesc = speed > 3 ? "High Speed" : speed > 1.5 ? "Medium Speed" : "Low Speed";

        Chat.log(`&9Wither fired ${skullType} skull (${speedDesc}: ${speed.toFixed(1)} b/s)`);
    }

    recordSkullImpact(skullUUID, target, damage) {
        const trajectory = this.skullTrajectories.get(skullUUID);
        if (!trajectory) return;

        const impactTime = Client.getTime();
        trajectory.flightTime = (impactTime - trajectory.firingTime) / 20; // Convert to seconds

        const distance = trajectory.startPosition.distanceTo(target.getPos());
        trajectory.maxDistance = Math.max(trajectory.maxDistance, distance);

        trajectory.hits.push({
            target: target.getUUID(),
            targetName: target.getName().getString(),
            damage: damage,
            distance: distance,
            time: trajectory.flightTime
        });

        this.combatSession.damageDealt += damage;

        const isPlayer = target.is("minecraft:player");
        if (isPlayer) {
            this.combatSession.playerHits++;
            Chat.log(`&cPlayer hit by ${trajectory.isCharged ? "charged" : "regular"} wither skull for ${damage} damage!`);
        }

        // Log effectiveness
        const effectiveness = this.calculateSkullEffectiveness(trajectory);
        const skullType = trajectory.isCharged ? "Charged" : "Regular";
        Chat.log(`&8${skullType} skull analysis: ${effectiveness.rating} - ${effectiveness.description}`);
    }

    calculateSkullEffectiveness(trajectory) {
        const avgDamage = trajectory.hits.length > 0 ?
            trajectory.hits.reduce((sum, hit) => sum + hit.damage, 0) / trajectory.hits.length : 0;

        const accuracyScore = trajectory.hits.length > 0 ? 100 : 0;
        const damageScore = Math.min(avgDamage * 20, 100);
        const speedScore = Math.min(trajectory.initialSpeed * 25, 100);
        const rangeScore = Math.min(trajectory.maxDistance * 5, 100);

        const overallScore = (accuracyScore + damageScore + speedScore + rangeScore) / 4;

        let rating = "Poor";
        let description = "Low effectiveness";

        if (overallScore > 80) {
            rating = "Excellent";
            description = "Highly effective skull";
        } else if (overallScore > 60) {
            rating = "Good";
            description = "Effective skull";
        } else if (overallScore > 40) {
            rating = "Fair";
            description = "Moderately effective";
        }

        return {
            rating: rating,
            description: description,
            score: overallScore,
            accuracy: accuracyScore,
            damage: damageScore,
            speed: speedScore,
            range: rangeScore
        };
    }

    generateCombatReport() {
        const session = this.combatSession;
        const duration = session.startTime ? (Client.getTime() - session.startTime) / 20 : 0;
        const chargedPercentage = session.skullsFired > 0 ?
            (session.chargedSkullsFired / session.skullsFired * 100).toFixed(1) : 0;

        Chat.log("=== Wither Combat Analysis Report ===");
        Chat.log(`Combat duration: ${duration.toFixed(1)} seconds`);
        Chat.log(`Withers fought: ${session.witherUUIDs.size}`);
        Chat.log(`Total skulls fired: ${session.skullsFired}`);
        Chat.log(`Charged skulls: ${session.chargedSkullsFired} (${chargedPercentage}%)`);
        Chat.log(`Total damage dealt: ${session.damageDealt.toFixed(1)}`);
        Chat.log(`Direct player hits: ${session.playerHits}`);

        // Analyze skull effectiveness
        if (this.skullTrajectories.size > 0) {
            Chat.log("\n&6Skull Effectiveness Analysis:");

            const chargedSkulls = Array.from(this.skullTrajectories.values()).filter(t => t.isCharged);
            const regularSkulls = Array.from(this.skullTrajectories.values()).filter(t => !t.isCharged);

            if (chargedSkulls.length > 0) {
                const avgChargedDamage = chargedSkulls.reduce((sum, skull) =>
                    sum + skull.hits.reduce((hsum, hit) => hsum + hit.damage, 0), 0) / chargedSkulls.length;
                const avgChargedRange = chargedSkulls.reduce((sum, skull) => sum + skull.maxDistance, 0) / chargedSkulls.length;

                Chat.log(`Charged skulls: ${chargedSkulls.length} fired`);
                Chat.log(`  Average damage per skull: ${avgChargedDamage.toFixed(1)}`);
                Chat.log(`  Average effective range: ${avgChargedRange.toFixed(1)}m`);
            }

            if (regularSkulls.length > 0) {
                const avgRegularDamage = regularSkulls.reduce((sum, skull) =>
                    sum + skull.hits.reduce((hsum, hit) => hsum + hit.damage, 0), 0) / regularSkulls.length;
                const avgRegularRange = regularSkulls.reduce((sum, skull) => sum + skull.maxDistance, 0) / regularSkulls.length;

                Chat.log(`Regular skulls: ${regularSkulls.length} fired`);
                Chat.log(`  Average damage per skull: ${avgRegularDamage.toFixed(1)}`);
                Chat.log(`  Average effective range: ${avgRegularRange.toFixed(1)}m`);
            }

            // Find most effective skull
            const mostEffective = Array.from(this.skullTrajectories.values())
                .reduce((best, current) => {
                    const bestScore = this.calculateSkullEffectiveness(best).score;
                    const currentScore = this.calculateSkullEffectiveness(current).score;
                    return currentScore > bestScore ? current : best;
                });

            const bestEffectiveness = this.calculateSkullEffectiveness(mostEffective);
            Chat.log(`\n&aMost effective skull: ${bestEffectiveness.rating} rating (${bestEffectiveness.score.toFixed(1)}/100)`);
        }
    }

    resetSession() {
        this.combatSession = {
            startTime: null,
            witherUUIDs: new Set(),
            skullsFired: 0,
            chargedSkullsFired: 0,
            damageDealt: 0,
            playerHits: 0,
            combatLog: []
        };
        this.skullTrajectories.clear();
        Chat.log("&7Wither combat session reset.");
    }
}

// Initialize combat analyzer
const witherCombatAnalyzer = new WitherCombatAnalyzer();

// Track wither spawns
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:wither")) {
        witherCombatAnalyzer.startCombat(entity);
    }
}));

// Track wither skull firing
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:wither_skull")) {
        // Try to determine the wither source (simplified)
        const nearbyWithers = World.getEntitiesInRange(entity.getX(), entity.getY(), entity.getZ(), 10)
            .filter(e => e.is("minecraft:wither"));

        if (nearbyWithers.length > 0) {
            witherCombatAnalyzer.recordSkullFiring(entity, nearbyWithers[0]);
        }
    }
}));

// Track damage from wither skulls
events.on("EntityHurt", JavaWrapper.methodToJavaAsync((event) => {
    const source = event.getSource();
    const victim = event.getEntity();
    const damage = event.getDamage();

    if (source && source.is("minecraft:wither_skull")) {
        const skullUUID = source.getUUID();
        witherCombatAnalyzer.recordSkullImpact(skullUUID, victim, damage);
    }
}));

// Generate report every 2 minutes during combat
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0 && witherCombatAnalyzer.combatSession.skullsFired > 0) {
        witherCombatAnalyzer.generateCombatReport();
    }
}));

Chat.log("&aWither Combat Analyzer activated!");
```

---

## Method Details

### `witherSkull.isCharged()`

Returns true if this wither skull is charged (blue variant), which deals more damage and has different behavior than regular wither skulls.

**Returns:**
- `boolean`: true if the wither skull is charged (blue), false if it's a regular wither skull

**Example:**
```js
// Check if a wither skull is charged and handle accordingly
const witherSkull = entity;
if (witherSkull.isCharged()) {
    Chat.log("Danger: This is a charged blue wither skull - extra damage!");

    // Highlight charged skulls with special effects
    witherSkull.setGlowing(true);
    witherSkull.setGlowingColor(0x0080FF); // Blue glow for charged skulls

    // Trigger high-priority warnings
    Chat.actionbar("&c&lCHARGED WITHER SKULL - TAKE COVER!");
} else {
    Chat.log("Regular wither skull detected - still dangerous but less damage");
    witherSkull.setGlowing(true);
    witherSkull.setGlowingColor(0x8B0000); // Dark red for regular skulls
}
```

**Notes:**
- Charged wither skulls appear blue instead of black
- Charged skulls deal significantly more damage than regular skulls
- Charged skulls are fired by withers at specific health thresholds or under certain conditions
- Both charged and regular skulls can inflict the Wither effect on targets
- The charging state is determined at firing time and cannot change during flight
- Charged skulls may have different particle effects and sound cues
- Player detection and avoidance systems should give higher priority to charged skulls
- Some mods or custom wither variants may have different charging mechanics

---

## Inherited Methods

From `EntityHelper`:

- `getPos()` - Returns entity position as Pos3D
- `getX()`, `getY()`, `getZ()` - Returns individual coordinates
- `getName()` - Returns entity name as TextHelper
- `getType()` - Returns entity type ID ("minecraft:wither_skull")
- `getVelocity()` - Returns velocity vector for trajectory calculation
- `is()` - Checks if entity matches specified types
- `getUUID()` - Returns entity UUID for tracking
- `distanceTo(entity/pos)` - Calculates distance
- `isAlive()` - Checks if skull is still in flight
- `getOwner()` - Returns the entity that fired the skull (usually a wither)
- `getNBT()` - Access to NBT data for additional properties
- And many more position, movement, and utility methods

---

## Notes and Limitations

- WitherSkullEntityHelper instances become invalid when the skull entity is removed from the world (hit a target, expired, or despawned). Always check `isAlive()` before accessing skull data.
- The `isCharged()` method is the primary way to distinguish between regular black wither skulls and the more dangerous blue charged variant.
- Wither skulls can be fired by wither bosses or by dispensers containing wither skulls (if mod-enabled).
- Charged wither skulls deal approximately 50% more damage than regular skulls and may have different blast radius effects.
- Both skull types can inflict the Wither status effect on living targets.
- Velocity calculations can be used to predict skull trajectories and implement dodge systems.
- Wither skulls have limited flight range and will despawn after traveling a certain distance or time.
- The inheritance from EntityHelper provides comprehensive tracking for movement, position, and world interaction.
- Visual effects like `setGlowing()` are particularly useful for distinguishing charged from regular skulls in warning systems.
- Wither skulls ignore most blocks and pass through transparent blocks, making them particularly dangerous in enclosed spaces.
- Multiple wither skulls can be active simultaneously during wither boss fights or dispenser-based traps.

## Related Classes

- `EntityHelper` - Base entity functionality for position, movement, velocity, and world interaction
- `WitherEntityHelper` - Helper for wither boss entities that fire these skulls
- `ProjectileEntityHelper` - Base functionality for all projectile entities
- `ArrowEntityHelper` - Alternative projectile helper for comparison
- `TridentEntityHelper` - Another projectile helper for different weapon types
- `Pos3D` - Position and distance calculations for tracking skull trajectories
- `LivingEntityHelper` - For entities that can be hit by wither skulls
- `PlayerEntityHelper` - For player entities taking damage from skulls

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized projectile helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft WitherSkullEntity implementation
- Inherits comprehensive functionality from the entity helper hierarchy
- Designed specifically for wither skull tracking, combat analysis, and danger avoidance systems
- Minimal specific functionality as wither skulls have simple flight behavior, but the charged state distinction is critical for combat systems

---

**See Also:**
- [WitherEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\WitherEntityHelper.md) - Helper for wither entities that fire these skulls
- [EntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\EntityHelper.md) - Base entity functionality for all entity types