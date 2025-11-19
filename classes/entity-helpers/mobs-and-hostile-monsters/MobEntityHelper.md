# MobEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.MobEntityHelper<T extends MobEntity>`

**Extends:** `LivingEntityHelper<T>`

Represents a mob entity in the world. MobEntityHelper provides access to mob-specific properties and behaviors such as attack states and AI control. This class serves as a base for all mob entities including hostile monsters, passive mobs, and boss entities.

Mob entities are living entities that have artificial intelligence (AI) and can actively participate in combat or other autonomous behaviors. This includes most creatures in Minecraft that can move, attack, and make decisions independently.

This class extends `LivingEntityHelper` and inherits all methods for health, movement, equipment, and other living entity properties.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

MobEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`)
- World entity queries and searches
- Type casting from EntityHelper using `asLiving()` when appropriate
- Methods that return mob entities

---

## Methods

## Usage Examples

### Combat Detection System
```js
// Detect and alert when mobs enter combat
class CombatMonitor {
    constructor() {
        this.combatMobs = new Set();
    }

    checkCombatStatus() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const newCombatMobs = new Set();

        entities.forEach(entity => {
            const living = entity.asLiving();
            if (!living || entity === player) return;

            const distance = player.distanceTo(entity);
            const uuid = entity.getUUID();

            // Check if mob is in combat and nearby
            if (distance <= 32 && living.isAttacking()) {
                newCombatMobs.add(uuid);

                if (!this.combatMobs.has(uuid)) {
                    const name = entity.getName().getString();
                    const health = living.getHealth();
                    const maxHealth = living.getMaxHealth();
                    const healthPercent = (health / maxHealth) * 100;

                    Chat.log(`&c⚔️ Combat Alert: ${name} (${healthPercent.toFixed(0)}% HP) - ${distance.toFixed(1)}m`);

                    // Check if mob is targeting player (heuristic)
                    const facing = entity.getFacingDirection();
                    const playerDirection = entity.getPos().directionTo(player.getPos());
                    const angleDiff = Math.abs(facing.angleTo(playerDirection));

                    if (angleDiff < 45) {
                        Chat.actionbar(`&c${name} is likely targeting you!`);
                    }
                }
            }
        });

        // Check for mobs that stopped fighting
        this.combatMobs.forEach(uuid => {
            if (!newCombatMobs.has(uuid)) {
                // Find the entity to get its name
                const entity = entities.find(e => e.getUUID() === uuid);
                if (entity) {
                    Chat.log(`&a${entity.getName().getString()} has stopped fighting`);
                }
            }
        });

        this.combatMobs = newCombatMobs;
    }
}

const combatMonitor = new CombatMonitor();

// Monitor combat every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) {
        combatMonitor.checkCombatStatus();
    }
}));
```

### AI Status Analysis
```js
// Analyze and report on mob AI states
function analyzeMobAI() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const range = 64;
    const mobStats = {
        total: 0,
        aiDisabled: 0,
        attacking: 0,
        byType: new Map()
    };

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance > range) return;

        const living = entity.asLiving();
        if (!living || entity === player) return;

        mobStats.total++;
        const type = entity.getType();

        // Track by type
        if (!mobStats.byType.has(type)) {
            mobStats.byType.set(type, { count: 0, aiDisabled: 0, attacking: 0 });
        }
        const typeStats = mobStats.byType.get(type);
        typeStats.count++;

        if (living.isAiDisabled()) {
            mobStats.aiDisabled++;
            typeStats.aiDisabled++;

            const name = entity.getName().getString();
            Chat.log(`&eAI Disabled: ${name} (${type}) at ${entity.getPos()}`);
        }

        if (living.isAttacking()) {
            mobStats.attacking++;
            typeStats.attacking++;
        }
    });

    // Display summary
    Chat.log("=== Mob AI Analysis ===");
    Chat.log(`Total mobs in ${range}m range: ${mobStats.total}`);
    Chat.log(`AI disabled: ${mobStats.aiDisabled} (${((mobStats.aiDisabled/mobStats.total)*100).toFixed(1)}%)`);
    Chat.log(`Currently attacking: ${mobStats.attacking} (${((mobStats.attacking/mobStats.total)*100).toFixed(1)}%)`);

    Chat.log("\nBy type:");
    mobStats.byType.forEach((stats, type) => {
        const aiDisabledPercent = stats.count > 0 ? (stats.aiDisabled/stats.count*100).toFixed(1) : "0";
        const attackingPercent = stats.count > 0 ? (stats.attacking/stats.count*100).toFixed(1) : "0";
        Chat.log(`  ${type}: ${stats.count} total, ${stats.aiDisabled} AI disabled (${aiDisabledPercent}%), ${stats.attacking} attacking (${attackingPercent}%)`);
    });
}

analyzeMobAI();
```

### Mob Behavior Monitoring
```js
// Monitor specific mob behaviors and patterns
class MobBehaviorTracker {
    constructor() {
        this.mobBehaviors = new Map();
    }

    trackMob(entity) {
        const uuid = entity.getUUID();
        const living = entity.asLiving();
        if (!living) return;

        if (!this.mobBehaviors.has(uuid)) {
            this.mobBehaviors.set(uuid, {
                name: entity.getName().getString(),
                type: entity.getType(),
                lastAttacking: false,
                attackStartTimes: [],
                totalAttackTime: 0,
                aiDisabledAt: null
            });
        }

        const behavior = this.mobBehaviors.get(uuid);
        const isAttacking = living.isAttacking();
        const isAiDisabled = living.isAiDisabled();
        const currentTime = Client.getTime();

        // Track attack state changes
        if (isAttacking && !behavior.lastAttacking) {
            behavior.attackStartTimes.push(currentTime);
            Chat.log(`&c${behavior.name} started attacking`);
        } else if (!isAttacking && behavior.lastAttacking && behavior.attackStartTimes.length > 0) {
            const attackDuration = currentTime - behavior.attackStartTimes.pop();
            behavior.totalAttackTime += attackDuration;
            Chat.log(`&a${behavior.name} stopped attacking (duration: ${(attackDuration/20).toFixed(1)}s)`);
        }

        // Track AI state changes
        if (isAiDisabled && !behavior.aiDisabledAt) {
            behavior.aiDisabledAt = currentTime;
            Chat.log(`&e${behavior.name}'s AI was disabled`);
        } else if (!isAiDisabled && behavior.aiDisabledAt) {
            const disabledDuration = currentTime - behavior.aiDisabledAt;
            Chat.log(`&a${behavior.name}'s AI was re-enabled (was disabled for ${(disabledDuration/20).toFixed(1)}s)`);
            behavior.aiDisabledAt = null;
        }

        behavior.lastAttacking = isAttacking;
    }

    generateReport() {
        Chat.log("=== Mob Behavior Report ===");

        this.mobBehaviors.forEach((behavior, uuid) => {
            Chat.log(`\n${behavior.name} (${behavior.type}):`);
            Chat.log(`  Total attack time: ${(behavior.totalAttackTime/20).toFixed(1)}s`);
            Chat.log(`  Attack sessions: ${behavior.attackStartTimes.length} ongoing`);
            Chat.log(`  AI currently disabled: ${behavior.aiDisabledAt ? 'Yes' : 'No'}`);
        });
    }

    clearStoppedMobs(entities) {
        const activeUUIDs = new Set(
            entities
                .map(e => e.getUUID())
                .filter(uuid => this.mobBehaviors.has(uuid))
        );

        for (const [uuid, behavior] of this.mobBehaviors) {
            if (!activeUUIDs.has(uuid)) {
                Chat.log(`${behavior.name} has been removed from tracking`);
                this.mobBehaviors.delete(uuid);
            }
        }
    }
}

const behaviorTracker = new MobBehaviorTracker();

// Track mobs every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const entities = World.getEntities();
    entities.forEach(entity => behaviorTracker.trackMob(entity));

    // Clean up removed entities every 5 seconds
    if (Client.getTime() % 100 === 0) {
        behaviorTracker.clearStoppedMobs(entities);
    }
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 600 === 0) {
        behaviorTracker.generateReport();
    }
}));
```

### Target Acquisition Analysis
```js
// Analyze mob targeting and combat engagement
function analyzeMobCombat() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const combatAnalysis = {
        nearbyMobs: [],
        attackingMobs: [],
        aiDisabledMobs: []
    };

    entities.forEach(entity => {
        if (entity === player) return;

        const living = entity.asLiving();
        if (!living) return;

        const distance = player.distanceTo(entity);
        const name = entity.getName().getString();
        const type = entity.getType();

        if (distance <= 32) {
            combatAnalysis.nearbyMobs.push({
                entity: entity,
                name: name,
                type: type,
                distance: distance,
                health: living.getHealth(),
                maxHealth: living.getMaxHealth(),
                isAttacking: living.isAttacking(),
                isAiDisabled: living.isAiDisabled()
            });

            if (living.isAttacking()) {
                combatAnalysis.attackingMobs.push({
                    name: name,
                    distance: distance,
                    healthPercent: (living.getHealth() / living.getMaxHealth()) * 100
                });
            }

            if (living.isAiDisabled()) {
                combatAnalysis.aiDisabledMobs.push({
                    name: name,
                    type: type,
                    distance: distance
                });
            }
        }
    });

    // Display results
    Chat.log(`=== Combat Analysis (${combatAnalysis.nearbyMobs.length} mobs nearby) ===`);

    if (combatAnalysis.attackingMobs.length > 0) {
        Chat.log(`&cCurrently attacking (${combatAnalysis.attackingMobs.length}):`);
        combatAnalysis.attackingMobs.forEach(mob => {
            Chat.log(`  ${mob.name} - ${mob.distance.toFixed(1)}m, ${mob.healthPercent.toFixed(0)}% HP`);
        });
    }

    if (combatAnalysis.aiDisabledMobs.length > 0) {
        Chat.log(`&eAI disabled (${combatAnalysis.aiDisabledMobs.length}):`);
        combatAnalysis.aiDisabledMobs.forEach(mob => {
            Chat.log(`  ${mob.name} (${mob.type}) - ${mob.distance.toFixed(1)}m`);
        });
    }

    // Threat assessment
    const immediateThreats = combatAnalysis.attackingMobs.filter(mob => mob.distance <= 8);
    if (immediateThreats.length > 0) {
        Chat.log(`&c⚠️ IMMEDIATE THREATS: ${immediateThreats.length} mobs attacking within 8 blocks!`);
    }
}

analyzeMobCombat();
```

---

## Inherited Methods

From `LivingEntityHelper`:

- `getStatusEffects()` - Get active status effects
- `getHealth()`, `getMaxHealth()` - Health information
- `getMainHand()`, `getOffHand()` - Equipment information
- `getArmor()` - Armor value
- `isBaby()` - Check if entity is a baby variant
- `canSeeEntity(entity)` - Line of sight checks
- `getMobTags()` - Entity classification tags

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance
- `getFacingDirection()` - Movement and orientation
- `getVehicle()`, `getPassengers()` - Entity relationships

---

## Notes and Limitations

- MobEntityHelper instances represent entities with AI capabilities and autonomous behaviors
- The `isAttacking()` method returns the current attack state, which may not always indicate the actual combat target
- `isAiDisabled()` check is useful for identifying frozen or controlled mobs (common in farms, transports, or debug scenarios)
- AI-disabled mobs can still be damaged and may respond to direct player interactions
- Some mobs may have specialized behavior that extends beyond the basic mob functionality
- Attack state detection timing may vary between different mob types and Minecraft versions
- This class serves as a base for more specific mob helpers like `CreeperEntityHelper`, `ZombieEntityHelper`, etc.

---

## Related Classes

- `LivingEntityHelper` - Parent class with health, movement, and combat properties
- `EntityHelper` - Base class with general entity methods
- `CreeperEntityHelper`, `ZombieEntityHelper`, `SkeletonEntityHelper` - Specialized mob helpers
- `AnimalEntityHelper` - For passive mobs with additional behaviors
- `PlayerEntityHelper` - Player-specific functionality
- `BossEntityHelper` - For boss-level entities with enhanced mechanics

---

## Version Information

- Available since JSMacros 1.8.4
- Extends LivingEntityHelper functionality with mob-specific behaviors
- Part of the entity helper hierarchy for comprehensive entity interaction