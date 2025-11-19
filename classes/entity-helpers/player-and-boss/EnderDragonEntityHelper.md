# EnderDragonEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.boss.EnderDragonEntityHelper`

**Extends:** `MobEntityHelper<EnderDragonEntity>`

**Extends Chain:** `EnderDragonEntityHelper` → `MobEntityHelper` → `LivingEntityHelper` → `EntityHelper` → `BaseHelper<Entity>`

Represents an Ender Dragon entity in the world. EnderDragonEntityHelper provides access to dragon-specific behaviors, phases, and body parts that are unique to the Ender Dragon boss mob. This specialized helper allows you to monitor the dragon's combat phase, access individual body parts for targeting or analysis, and track the dragon's complex multi-part structure.

Instances are typically obtained from entity events, world entity queries, or by casting existing entity helpers that represent Ender Dragons.

## Constructors

EnderDragonEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`)
- World entity queries and filters
- Type casting from generic `EntityHelper` instances

```js
// Method 1: From entity events
JsMacros.on("EntityDeath", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:ender_dragon")) {
        const dragon = entity; // Already properly typed
        Chat.log(`Dragon died in phase: ${dragon.getPhase()}`);
    }
}));

// Method 2: From world queries
const entities = World.getEntities();
for (const entity of entities) {
    if (entity.is("minecraft:ender_dragon")) {
        const dragon = entity; // Already properly typed
        const phase = dragon.getPhase();
        Chat.log(`Found dragon in phase: ${phase}`);
    }
}

// Method 3: Type casting (if needed)
const genericEntity = event.getEntity();
if (genericEntity.is("minecraft:ender_dragon")) {
    const dragon = genericEntity; // JSMacros handles this automatically
}
```

## Methods
- [dragon.getPhase()](#dragongetphase)
- [dragon.getBodyPart(index)](#dragongetbodypartindex)
- [dragon.getBodyParts()](#dragongetbodyparts)
- [dragon.getBodyParts(name)](#dragongetbodypartsname)

---

## Usage Examples

### Complete Dragon Fight Monitor
```js
class DragonFightMonitor {
    constructor() {
        this.trackedDragons = new Map();
        this.lastPhaseUpdate = new Map();
    }

    startMonitoring() {
        JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:ender_dragon")) {
                this.trackDragon(entity);
            }
        }));

        JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
            this.updateTracking();
        }));

        JsMacros.on("EntityDeath", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:ender_dragon")) {
                this.stopTracking(entity);
            }
        }));
    }

    trackDragon(dragon) {
        const uuid = dragon.getUUID();
        this.trackedDragons.set(uuid, {
            entity: dragon,
            startTime: Date.now(),
            phases: new Map(),
            lastHealth: dragon.getHealth()
        });

        Chat.log(`&6🐉 Started tracking Ender Dragon (${uuid})`);
    }

    updateTracking() {
        if (Client.getTime() % 20 !== 0) return; // Update every second

        for (const [uuid, data] of this.trackedDragons) {
            if (!data.entity.isAlive()) {
                this.stopTracking(data.entity);
                continue;
            }

            this.updateDragonStatus(uuid, data);
        }
    }

    updateDragonStatus(uuid, data) {
        const dragon = data.entity;
        const currentPhase = dragon.getPhase();
        const currentHealth = dragon.getHealth();
        const maxHealth = dragon.getMaxHealth();
        const healthPercent = (currentHealth / maxHealth) * 100;

        // Phase tracking
        if (currentPhase !== data.phases.get(currentPhase)) {
            data.phases.set(currentPhase, Date.now());
            this.onPhaseChange(dragon, currentPhase, currentHealth);
        }

        // Health monitoring
        const healthChange = currentHealth - data.lastHealth;
        if (Math.abs(healthChange) > 1) {
            this.onHealthChange(dragon, currentHealth, maxHealth, healthChange);
            data.lastHealth = currentHealth;
        }

        // Status display
        const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        Chat.actionbar(
            `&6🐉 ${currentPhase} | ` +
            `&c♥ ${currentHealth.toFixed(0)}/${maxHealth.toFixed(0)} (${healthPercent.toFixed(0)}%) | ` +
            `&7${minutes}:${seconds.toString().padStart(2, '0')}`
        );
    }

    onPhaseChange(dragon, phase, health) {
        Chat.log(`&6🐉 Dragon phase changed to: ${phase}`);

        // Phase-specific warnings and advice
        switch (phase) {
            case "ChargingPlayer":
                Chat.log("&c⚠️ DRAGON CHARGING! Move sideways quickly!");
                break;
            case "StrafePlayer":
                Chat.log("&e⚠️ Dragon dive bombing! Take cover!");
                break;
            case "Landing":
                Chat.log("&a🎯 Dragon landing! Attack opportunity!");
                break;
            case "SittingFlaming":
                Chat.log("&c🔥 Dragon breathing fire! Avoid the purple fire!");
                break;
            case "Dying":
                Chat.log("&a🎉 Victory! Dragon is dying!");
                break;
            case "HoldingPattern":
                Chat.log("&7📍 Dragon circling! Prepare crystals!");
                break;
        }
    }

    onHealthChange(dragon, currentHealth, maxHealth, change) {
        const damageTaken = -change;
        if (damageTaken > 0) {
            Chat.log(`&c💔 Dragon took ${damageTaken.toFixed(1)} damage!`);

            // Check for significant damage milestones
            const healthPercent = (currentHealth / maxHealth) * 100;
            if (healthPercent <= 75 && healthPercent > 75 - damageTaken/maxHealth * 100) {
                Chat.log("&6🎯 Dragon at 75% health! Keep fighting!");
            } else if (healthPercent <= 50 && healthPercent > 50 - damageTaken/maxHealth * 100) {
                Chat.log("&6🎯 Dragon at 50% health! Halfway there!");
            } else if (healthPercent <= 25 && healthPercent > 25 - damageTaken/maxHealth * 100) {
                Chat.log("&a🎯 Dragon at 25% health! Victory is near!");
            }
        }
    }

    stopTracking(dragon) {
        const uuid = dragon.getUUID();
        if (this.trackedDragons.has(uuid)) {
            const data = this.trackedDragons.get(uuid);
            const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;

            Chat.log(`&a🎉 Dragon fight completed in ${minutes}:${seconds.toString().padStart(2, '0')}!`);

            // Phase summary
            if (data.phases.size > 0) {
                Chat.log("&6=== Phase Summary ===");
                for (const [phase, timestamp] of data.phases) {
                    const phaseTime = Math.floor((timestamp - data.startTime) / 1000);
                    const phaseMin = Math.floor(phaseTime / 60);
                    const phaseSec = phaseTime % 60;
                    Chat.log(`${phase}: ${phaseMin}:${phaseSec.toString().padStart(2, '0')}`);
                }
            }

            this.trackedDragons.delete(uuid);
        }
    }
}

// Start the dragon fight monitor
const monitor = new DragonFightMonitor();
monitor.startMonitoring();
Chat.log("&6🐉 Dragon Fight Monitor activated!");
```

### Dragon Body Part Targeting System
```js
class DragonTargetingSystem {
    constructor() {
        this.targetPriority = ["head", "neck", "body", "tail", "wing"];
        this.maxEngagementDistance = 32;
    }

    findOptimalTarget(dragon) {
        const player = Player.getPlayer();
        const dragonPos = dragon.getPos();

        // Check if dragon is in range
        if (player.distanceTo(dragon) > this.maxEngagementDistance) {
            return null;
        }

        let bestTarget = null;
        let bestScore = -1;

        // Score each body part
        for (const partType of this.targetPriority) {
            const parts = dragon.getBodyParts(partType);

            for (const part of parts) {
                const score = this.calculateTargetScore(part, dragon, partType);

                if (score > bestScore) {
                    bestScore = score;
                    bestTarget = {
                        part: part,
                        type: partType,
                        score: score,
                        distance: player.distanceTo(part),
                        position: part.getPos()
                    };
                }
            }
        }

        return bestTarget;
    }

    calculateTargetScore(part, dragon, partType) {
        const player = Player.getPlayer();
        const distance = player.distanceTo(part);
        const dragonPhase = dragon.getPhase();

        let score = 100; // Base score

        // Distance scoring (closer is better)
        score -= distance * 2;

        // Part type priority scoring
        const typeScores = {
            "head": 50,
            "neck": 30,
            "body": 20,
            "tail": 10,
            "wing": 15
        };
        score += typeScores[partType] || 0;

        // Phase-specific bonuses
        if (dragonPhase === "SittingFlaming" && partType === "head") {
            score += 40; // Head is very vulnerable when breathing fire
        } else if (dragonPhase === "Landing" && partType === "body") {
            score += 30; // Body is exposed during landing
        } else if (dragonPhase === "ChargingPlayer" && partType === "head") {
            score += 35; // Head leads during charge
        }

        // Visibility check bonus
        if (this.hasLineOfSight(player, part)) {
            score += 25;
        }

        return Math.max(0, score);
    }

    hasLineOfSight(player, target) {
        // Simple line of sight check - could be enhanced with actual raytracing
        const eyePos = player.getEyePos();
        const targetPos = target.getPos();

        // For now, just check if target is roughly in front of player
        const playerDirection = player.getFacingDirection();
        const toTarget = {
            x: targetPos.x - eyePos.x,
            z: targetPos.z - eyePos.z
        };

        const dotProduct = toTarget.x * playerDirection.getVector().x +
                          toTarget.z * playerDirection.getVector().z;

        return dotProduct > 0; // Target is in front
    }

    displayTargetInfo(target) {
        if (!target) {
            Chat.actionbar("&7No dragon targets in range");
            return;
        }

        const phase = "Hover"; // Would need dragon reference for real phase
        const effectiveness = target.score > 80 ? "&aExcellent" :
                             target.score > 60 ? "&6Good" :
                             target.score > 40 ? "&eFair" : "&cPoor";

        Chat.actionbar(
            `&6🎯 Target: ${target.type} | ` +
            `&7${target.distance.toFixed(1)}m | ` +
            `&f[${target.position.x.toFixed(0)}, ${target.position.y.toFixed(0)}, ${target.position.z.toFixed(0)}] | ` +
            `${effectiveness}`
        );
    }
}

// Auto-targeting system
const targetingSystem = new DragonTargetingSystem();

JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 10 !== 0) return; // Update every 0.5 seconds

    const dragons = World.getEntities("minecraft:ender_dragon");
    if (dragons.length === 0) return;

    const dragon = dragons[0];
    const target = targetingSystem.findOptimalTarget(dragon);

    targetingSystem.displayTargetInfo(target);
}));
```

## Inherited Methods

From `MobEntityHelper`:
- `isAttacking()` - Returns whether the dragon is currently attacking
- `isAiDisabled()` - Returns whether the dragon's AI is disabled

From `LivingEntityHelper`:
- `getHealth()` - Returns the dragon's current health
- `getMaxHealth()` - Returns the dragon's maximum health
- `getStatusEffects()` - Returns active status effects
- `isAlive()` - Returns whether the dragon is alive
- All other living entity methods (movement, position, equipment, etc.)

From `EntityHelper`:
- `getPos()` - Returns the dragon's position
- `getType()` - Returns "minecraft:ender_dragon"
- `is(type, ...)` - Type checking method
- `getName()` - Returns the dragon's display name
- `distanceTo(target)` - Calculates distance to targets
- All other general entity methods

## Notes and Limitations

- EnderDragonEntityHelper instances represent the main dragon entity, while individual body parts are separate entities returned by `getBodyPart()` methods
- Body parts may become invalid during certain phase transitions (e.g., when the dragon respawns)
- The dragon's hitbox is complex - different body parts have different vulnerability levels
- Some body parts (like wings) might not be targetable during certain phases
- The dragon's phase changes can be rapid during combat - monitor frequently for accurate tracking
- Health values may not be perfectly synchronized for all body parts due to client-server lag
- Dragon crystals should be monitored separately as they affect the dragon's behavior and healing

## Related Classes

- `MobEntityHelper` - Parent class with mob-specific methods
- `LivingEntityHelper` - Base class for living entities with health and movement
- `EntityHelper` - Base entity class with position and utility methods
- `Pos3D` - 3D position and vector mathematics
- `World` - For finding and querying dragon entities
- `JsMacros` - For event handling and script management

## Version Information

- Available since JSMacros 1.8.4
- Dragon phase system integrated from Minecraft's internal phase manager
- Multi-part entity system fully supported
- Body part access methods provide granular control over dragon interactions