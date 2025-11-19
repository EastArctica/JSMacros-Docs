# GhastEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.GhastEntityHelper`

**Extends:** `MobEntityHelper<GhastEntity>`

**Since:** JsMacros 1.8.4

Represents a ghast entity in the world. GhastEntityHelper provides access to ghast-specific behaviors, particularly their shooting state which determines when they are about to fire explosive fireballs at players. Ghasts are large, floating, white-colored hostile mobs found exclusively in the Nether that are known for their distinctive crying sounds and devastating fireball attacks.

Ghasts are one of the most dangerous Nether mobs due to their ability to shoot explosive fireballs from a distance. They float through the air and will attack players on sight, opening their eyes and mouths to charge up before firing a fireball. This helper provides access to their current shooting state, which is crucial for predicting attacks and timing defensive maneuvers or counter-attacks.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding ghast-specific functionality for attack state monitoring.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

GhastEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`, `ProjectileHit`)
- World entity queries and type casting
- Methods that return ghast entities
- Type casting from EntityHelper using `as("minecraft:ghast")` or appropriate casting methods

```js
// Method 1: From entity events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:ghast")) {
        const ghast = entity; // Already properly typed
        Chat.log(`Ghast spawned! Shooting state: ${ghast.isShooting()}`);
    }
}));

// Method 2: From world queries
const entities = World.getEntities();
for (const entity of entities) {
    if (entity.is("minecraft:ghast")) {
        const ghast = entity;
        const distance = Player.getPlayer().distanceTo(entity);
        Chat.log(`Found ghast at ${distance.toFixed(1)} blocks`);
    }
}
```

---

## Methods

## Usage Examples

### Ghast Attack Warning System
```js
// Real-time ghast monitoring and attack warning system
class GhastAttackMonitor {
    constructor() {
        this.activeGhasts = new Map();
        this.alertCooldowns = new Map();
        this.attackHistory = [];
        this.lastCleanup = 0;
    }

    updateGhast(ghastEntity) {
        const ghast = ghastEntity.as("minecraft:ghast");
        if (!ghast) return;

        const uuid = ghastEntity.getUUID();
        const player = Player.getPlayer();
        const isShooting = ghast.isShooting();
        const distance = player.distanceTo(ghastEntity);
        const health = ghastEntity.asLiving().getHealth();
        const maxHealth = ghastEntity.asLiving().getMaxHealth();
        const pos = ghastEntity.getPos();

        if (!this.activeGhasts.has(uuid)) {
            // New ghast detected
            this.activeGhasts.set(uuid, {
                entity: ghastEntity,
                name: ghastEntity.getName().getString(),
                firstSeen: Client.getTime(),
                lastShootState: isShooting,
                stateChanges: 0,
                attackCount: 0,
                healthHistory: [{ health, time: Client.getTime() }],
                combatEngagement: null,
                threatLevel: this.calculateThreatLevel(ghastEntity, distance)
            });

            Chat.log(`&e👻 Ghast detected: ${ghastEntity.getName().getString()}`);
            Chat.log(`  Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Initial state: ${isShooting ? "Shooting" : "Calm"}`);
            Chat.log(`  Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);

            // Alert player if ghast is nearby and shooting
            if (distance <= 24 && isShooting) {
                this.sendAlert("GHOSTLY ATTACKER NEARBY!", "danger");
            }
        } else {
            // Update existing ghast tracking
            const ghastData = this.activeGhasts.get(uuid);

            // Track shooting state changes
            if (ghastData.lastShootState !== isShooting) {
                ghastData.stateChanges++;
                ghastData.lastShootState = isShooting;

                const stateText = isShooting ? "SHOOTING" : "CALM";
                Chat.log(`&6👻 ${ghastData.name} state changed to: ${stateText}`);

                // Alert for state changes
                if (distance <= 20) {
                    const alertMessage = isShooting ? "Ghast ATTACKING - Take cover!" : "Ghast CALM - Safe to move!";
                    const alertType = isShooting ? "danger" : "success";
                    this.sendAlert(alertMessage, alertType);
                }

                // Track attacks
                if (isShooting) {
                    ghastData.attackCount++;
                    this.recordAttack(ghastData, distance, pos);
                }
            }

            // Update health tracking
            ghastData.healthHistory.push({ health, time: Client.getTime() });

            // Keep only recent health history (last 30 seconds)
            const cutoffTime = Client.getTime() - 600;
            ghastData.healthHistory = ghastData.healthHistory.filter(h => h.time > cutoffTime);

            // Update threat level
            ghastData.threatLevel = this.calculateThreatLevel(ghastEntity, distance);

            // Monitor for combat engagement
            if (distance <= 30) {
                if (!ghastData.combatEngagement) {
                    ghastData.combatEngagement = Client.getTime();
                    Chat.log(`&c⚔️ Combat engagement with ${ghastData.name} at ${distance.toFixed(1)} blocks`);
                }
            } else {
                if (ghastData.combatEngagement && Client.getTime() - ghastData.combatEngagement > 100) {
                    const combatDuration = (Client.getTime() - ghastData.combatEngagement) / 20;
                    Chat.log(`&a✓ Combat with ${ghastData.name} ended after ${combatDuration.toFixed(1)} seconds`);
                    ghastData.combatEngagement = null;
                }
            }

            // Periodic updates for nearby shooting ghasts
            if (distance <= 16 && isShooting && Client.getTime() % 20 === 0) {
                this.updateCombatStatus(ghastData, distance, health, maxHealth);
            }
        }
    }

    calculateThreatLevel(ghastEntity, distance) {
        const health = ghastEntity.asLiving().getHealth();
        const maxHealth = ghastEntity.asLiving().getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;
        const ghast = ghastEntity.as("minecraft:ghast");
        const isAttacking = ghast && ghast.isShooting();

        let threat = 0;

        // Distance threat (ghasts are dangerous at range)
        if (distance <= 8) threat += 30; // Actually less threatening up close
        else if (distance <= 20) threat += 40; // Optimal attack range
        else if (distance <= 40) threat += 35; // Still dangerous
        else threat += 15; // Long range but can still attack

        // Health threat
        threat += healthPercent * 0.3;

        // Attack state threat
        if (isAttacking) threat += 25;

        // Multi-ghast threat calculation
        const nearbyGhasts = this.countNearbyGhasts(ghastEntity.getPos(), 32);
        if (nearbyGhasts > 1) threat += nearbyGhasts * 10;

        return Math.min(threat, 100);
    }

    countNearbyGhasts(position, range) {
        const player = Player.getPlayer();
        const entities = World.getEntities();
        let count = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:ghast")) {
                const distance = position.distanceTo(entity.getPos());
                if (distance <= range) {
                    count++;
                }
            }
        });

        return count;
    }

    recordAttack(ghastData, distance, position) {
        this.attackHistory.push({
            ghastName: ghastData.name,
            distance: distance,
            position: { x: position.x, y: position.y, z: position.z },
            time: Client.getTime(),
            playerPos: Player.getPlayer().getPos()
        });

        // Keep only recent attack history (last 2 minutes)
        const cutoffTime = Client.getTime() - 2400;
        this.attackHistory = this.attackHistory.filter(attack => attack.time > cutoffTime);
    }

    updateCombatStatus(ghastData, distance, health, maxHealth) {
        const ghast = ghastData.entity.as("minecraft:ghast");
        const isAttacking = ghast.isShooting();
        const healthPercent = (health / maxHealth) * 100;

        let statusMessage = `${ghastData.name}: `;

        // State indicator
        statusMessage += isAttacking ? "🔥 " : "✅ ";

        // Health indicator
        if (healthPercent > 75) statusMessage += "🟢";
        else if (healthPercent > 40) statusMessage += "🟡";
        else statusMessage += "🔴";

        // Distance indicator
        statusMessage += ` ${distance.toFixed(0)}m`;

        // Threat level
        statusMessage += ` [${ghastData.threatLevel.toFixed(0)}%]`;

        Chat.actionbar(statusMessage);
    }

    sendAlert(message, type = "info") {
        const currentTime = Client.getTime();
        const alertKey = `${message}_${type}`;

        // Cooldown to prevent spam
        if (!this.alertCooldowns.has(alertKey) ||
            currentTime - this.alertCooldowns.get(alertKey) > 40) {

            const prefix = {
                "warning": "&c⚠️ ",
                "danger": "&4🔥 ",
                "success": "&a✓ ",
                "info": "&bℹ️ "
            }[type] || "&bℹ️ ";

            Chat.actionbar(`${prefix}${message}`);
            this.alertCooldowns.set(alertKey, currentTime);
        }
    }

    generateReport() {
        if (this.activeGhasts.size === 0) {
            Chat.log("No ghasts currently tracked");
            return;
        }

        Chat.log(`&6=== Ghast Combat Report (${this.activeGhasts.size} ghasts) ===`);

        let totalThreat = 0;
        let shootingGhasts = 0;
        let calmGhasts = 0;
        let inCombat = 0;

        for (const [uuid, ghastData] of this.activeGhasts) {
            const ghast = ghastData.entity.as("minecraft:ghast");
            const isShooting = ghast.isShooting();
            const distance = Player.getPlayer().distanceTo(ghastData.entity);
            const trackingDuration = (Client.getTime() - ghastData.firstSeen) / 20;

            if (isShooting) shootingGhasts++;
            else calmGhasts++;

            if (ghastData.combatEngagement) inCombat++;

            totalThreat += ghastData.threatLevel;

            Chat.log(`\n${ghastData.name}:`);
            Chat.log(`  State: ${isShooting ? "🔥 Shooting" : "✅ Calm"}`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Health: ${ghastData.entity.asLiving().getHealth().toFixed(1)}/${ghastData.entity.asLiving().getMaxHealth().toFixed(1)}`);
            Chat.log(`  Threat Level: ${ghastData.threatLevel.toFixed(0)}%`);
            Chat.log(`  State Changes: ${ghastData.stateChanges}`);
            Chat.log(`  Attacks Observed: ${ghastData.attackCount}`);
            Chat.log(`  Tracked for: ${trackingDuration.toFixed(1)}s`);

            if (ghastData.combatEngagement) {
                const combatDuration = (Client.getTime() - ghastData.combatEngagement) / 20;
                Chat.log(`  In Combat: ${combatDuration.toFixed(1)}s`);
            }
        }

        // Summary
        Chat.log(`\n=== Summary ===`);
        Chat.log(`Shooting Ghasts: ${shootingGhasts}`);
        Chat.log(`Calm Ghasts: ${calmGhasts}`);
        Chat.log(`In Combat: ${inCombat}`);
        Chat.log(`Average Threat Level: ${(totalThreat / this.activeGhasts.size).toFixed(0)}%`);
        Chat.log(`Recent Attacks: ${this.attackHistory.length}`);

        // Warnings
        if (shootingGhasts >= 2) {
            Chat.log(`\n&c🔥 CRITICAL: ${shootingGhasts} ghasts currently attacking!`);
        } else if (shootingGhasts >= 1) {
            Chat.log(`\n&e⚠️ WARNING: ${shootingGhasts} ghast currently attacking!`);
        }
    }

    cleanup() {
        const currentTime = Client.getTime();

        // Only cleanup every 5 seconds to avoid performance issues
        if (currentTime - this.lastCleanup < 100) return;

        this.lastCleanup = currentTime;

        for (const [uuid, ghastData] of this.activeGhasts) {
            if (!ghastData.entity.isAlive()) {
                const trackingDuration = (currentTime - ghastData.firstSeen) / 20;
                Chat.log(`&7${ghastData.name} eliminated after ${trackingDuration.toFixed(1)}s`);
                this.activeGhasts.delete(uuid);
            } else {
                const distance = Player.getPlayer().distanceTo(ghastData.entity);

                // Remove ghasts that are too far away (80+ blocks)
                if (distance > 80) {
                    Chat.log(`&7${ghastData.name} moved out of tracking range`);
                    this.activeGhasts.delete(uuid);
                }
            }
        }
    }
}

const ghastMonitor = new GhastAttackMonitor();

// Monitor ghasts every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const trackingRange = 48; // Track ghasts within 48 blocks

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= trackingRange && entity.is("minecraft:ghast")) {
            ghastMonitor.updateGhast(entity);
        }
    });

    // Cleanup every 5 seconds
    if (Client.getTime() % 100 === 0) {
        ghastMonitor.cleanup();
    }
}));

// Report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.g" && e.action === 1) { // G key
        ghastMonitor.generateReport();
    }
}));
```

### Ghast Fireball Defense System
```js
// Advanced fireball interception and defense system
class GhastFireballDefense {
    constructor() {
        this.defenseMode = "evasive"; // "evasive", "intercept", "mixed"
        this.interceptHistory = [];
        this.dodgeSuccess = { successful: 0, failed: 0 };
        this.setupDefenseSystem();
    }

    setupDefenseSystem() {
        // Monitor for incoming ghast attacks
        events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
            this.monitorGhastAttacks();
        }));

        // Detect fireball spawns
        events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((e) => {
            const entity = e.getEntity();
            if (entity.is("minecraft:fireball")) {
                this.handleFireballSpawn(entity);
            }
        }));

        // Defense mode toggle
        events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
            if (e.key === "key.keyboard.f" && e.action === 1) { // F key
                this.toggleDefenseMode();
            }
        }));
    }

    monitorGhastAttacks() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const alertRange = 32;

        entities.forEach(entity => {
            if (entity.is("minecraft:ghast")) {
                const ghast = entity.as("minecraft:ghast");
                const distance = player.distanceTo(entity);
                const isShooting = ghast.isShooting();

                if (distance <= alertRange && isShooting) {
                    this.anticipateFireball(entity, distance);
                }
            }
        });
    }

    anticipateFireball(ghastEntity, distance) {
        const currentTime = Client.getTime();

        // Check if we recently alerted for this ghast
        const uuid = ghastEntity.getUUID();
        const lastAlert = this.lastGhastAlert && this.lastGhastAlert.uuid === uuid ?
                         this.lastGhastAlert.time : 0;

        if (currentTime - lastAlert < 20) return; // Avoid spam

        const player = Player.getPlayer();
        const playerPos = player.getPos();
        const ghastPos = ghastEntity.getPos();

        // Calculate trajectory prediction
        const direction = {
            x: playerPos.x - ghastPos.x,
            y: playerPos.y - ghastPos.y,
            z: playerPos.z - ghastPos.z
        };

        const travelTime = distance / 10; // Rough estimate in seconds
        const impactTime = currentTime + (travelTime * 20);

        this.lastGhastAlert = { uuid, time: currentTime };

        // Defense recommendations based on mode
        switch (this.defenseMode) {
            case "evasive":
                this.evasiveDefense(ghastEntity, distance, travelTime);
                break;
            case "intercept":
                this.interceptDefense(ghastEntity, distance, travelTime);
                break;
            case "mixed":
                this.mixedDefense(ghastEntity, distance, travelTime);
                break;
        }
    }

    evasiveDefense(ghastEntity, distance, travelTime) {
        Chat.actionbar("&c🔥 FIREBALL INCOMING - TAKE COVER!");
        Chat.log("&c🛡️ Evasive Defense: Fireball incoming in " + travelTime.toFixed(1) + "s");
        Chat.log("→ Find cover behind blocks immediately");
        Chat.log("→ Move perpendicular to ghast direction");
        Chat.log("→ Use momentum to dodge quickly");

        this.recordDefense("evasive", distance, true);
    }

    interceptDefense(ghastEntity, distance, travelTime) {
        const hasBow = this.checkForBow();

        if (hasBow) {
            Chat.actionbar("&a🏹 INTERCEPT OPPORTUNITY - Aim at ghast!");
            Chat.log("&a🎯 Intercept Defense: Fireball incoming in " + travelTime.toFixed(1) + "s");
            Chat.log("→ Draw bow and aim at ghast");
            Chat.log("→ Time shot to hit fireball mid-flight");
            Chat.log("→ Successful intercept destroys fireball");

            this.recordDefense("intercept", distance, true);
        } else {
            Chat.actionbar("&e⚔️ NO BOW - Switching to evasive defense!");
            this.evasiveDefense(ghastEntity, distance, travelTime);
        }
    }

    mixedDefense(ghastEntity, distance, travelTime) {
        const hasBow = this.checkForBow();

        if (distance >= 20 && hasBow) {
            Chat.actionbar("&6🎯 MIXED: Try intercept or take cover!");
            Chat.log("&6🔄 Mixed Defense: Choose your strategy:");
            Chat.log("→ Option 1: Shoot fireball down with bow");
            Chat.log("→ Option 2: Take cover behind terrain");
            Chat.log("→ Distance favors interception attempt");
        } else {
            Chat.actionbar("&c🛡️ MIXED: Taking cover (too close for safe intercept)");
            this.evasiveDefense(ghastEntity, distance, travelTime);
        }

        this.recordDefense("mixed", distance, true);
    }

    handleFireballSpawn(fireballEntity) {
        const player = Player.getPlayer();
        const distance = player.distanceTo(fireballEntity);

        if (distance <= 24) {
            const owner = fireballEntity.getOwner();
            if (owner && owner.is("minecraft:ghast")) {
                Chat.log("&4💥 FIREBALL SPAWNED: " + distance.toFixed(1) + " blocks away!");

                if (this.defenseMode === "intercept" && this.checkForBow()) {
                    Chat.actionbar("&a🏹 QUICK: Shoot the fireball NOW!");
                } else {
                    Chat.actionbar("&c🔥 DODGE: Fireball incoming - MOVE!");
                }
            }
        }
    }

    checkForBow() {
        const player = Player.getPlayer();
        if (!player) return false;

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        return (mainHand && mainHand.getType() === "minecraft:bow") ||
               (offHand && offHand.getType() === "minecraft:bow");
    }

    toggleDefenseMode() {
        const modes = ["evasive", "intercept", "mixed"];
        const currentIndex = modes.indexOf(this.defenseMode);
        this.defenseMode = modes[(currentIndex + 1) % modes.length];

        const modeDescriptions = {
            "evasive": "🛡️ Focus on dodging and cover",
            "intercept": "🏹 Focus on shooting fireballs down",
            "mixed": "🔄 Adaptive strategy based on situation"
        };

        Chat.log("&6=== Ghast Defense Mode ===");
        Chat.log("&eMode: " + this.defenseMode.toUpperCase());
        Chat.log(modeDescriptions[this.defenseMode]);
        Chat.actionbar("Defense mode: " + this.defenseMode.toUpperCase());
    }

    recordDefense(type, distance, successful) {
        this.interceptHistory.push({
            type: type,
            distance: distance,
            successful: successful,
            time: Client.getTime()
        });

        // Keep only recent history
        const cutoffTime = Client.getTime() - 6000; // Last 5 minutes
        this.interceptHistory = this.interceptHistory.filter(d => d.time > cutoffTime);

        if (successful) {
            this.dodgeSuccess.successful++;
        } else {
            this.dodgeSuccess.failed++;
        }
    }

    generateDefenseReport() {
        Chat.log("&6=== Ghast Defense Report ===");
        Chat.log("Current Mode: " + this.defenseMode.toUpperCase());
        Chat.log("Total Defenses: " + (this.dodgeSuccess.successful + this.dodgeSuccess.failed));
        Chat.log("Successful: " + this.dodgeSuccess.successful);
        Chat.log("Failed: " + this.dodgeSuccess.failed);

        if (this.interceptHistory.length > 0) {
            const successRate = (this.dodgeSuccess.successful / (this.dodgeSuccess.successful + this.dodgeSuccess.failed)) * 100;
            Chat.log("Success Rate: " + successRate.toFixed(1) + "%");

            const avgDistance = this.interceptHistory.reduce((sum, d) => sum + d.distance, 0) / this.interceptHistory.length;
            Chat.log("Average Engagement Distance: " + avgDistance.toFixed(1) + " blocks");

            // Type breakdown
            const typeCounts = {};
            this.interceptHistory.forEach(d => {
                typeCounts[d.type] = (typeCounts[d.type] || 0) + 1;
            });

            Chat.log("\nDefense Methods Used:");
            for (const [type, count] of Object.entries(typeCounts)) {
                Chat.log(`  ${type}: ${count} times`);
            }
        }

        Chat.log("\n&ePress F to toggle defense mode");
    }
}

const ghastDefense = new GhastFireballDefense();
Chat.log("&a🛡️ Ghast Fireball Defense System activated!");
Chat.log("&ePress F to toggle defense modes (evasive/intercept/mixed)");
```

### Simple Ghast Attack Alert
```js
// Lightweight ghast attack monitoring for basic combat
class SimpleGhastAlert {
    constructor() {
        this.lastAlerts = new Map();
        this.alertCooldown = 60; // 3 seconds between alerts
    }

    checkGhastAttacks() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const alertRange = 40;

        entities.forEach(entity => {
            if (entity.is("minecraft:ghast")) {
                const ghast = entity.as("minecraft:ghast");
                const uuid = entity.getUUID();
                const distance = player.distanceTo(entity);
                const isShooting = ghast.isShooting();

                if (distance <= alertRange) {
                    this.sendGhastAlert(uuid, entity, isShooting, distance);
                }
            }
        });
    }

    sendGhastAlert(uuid, ghastEntity, isShooting, distance) {
        const currentTime = Client.getTime();
        const lastAlert = this.lastAlerts.get(uuid) || 0;

        if (currentTime - lastAlert < this.alertCooldown) {
            return; // Skip to prevent alert spam
        }

        const name = ghastEntity.getName().getString();
        let alertMessage = "";
        let alertType = "";

        if (isShooting) {
            if (distance < 15) {
                alertMessage = `🔥 URGENT: ${name} attacking nearby!`;
                alertType = "urgent";
            } else if (distance < 25) {
                alertMessage = `⚔️ COMBAT: ${name} firing at ${distance.toFixed(0)}m!`;
                alertType = "combat";
            } else {
                alertMessage = `👻 ALERT: ${name} attacking at range`;
                alertType = "warning";
            }
        } else {
            if (distance < 20) {
                alertMessage = `✅ SAFE: ${name} calm nearby`;
                alertType = "safe";
            } else {
                alertMessage = `👻 Ghost sighted: ${name} at ${distance.toFixed(0)}m`;
                alertType = "info";
            }
        }

        const formattedMessage = {
            "urgent": "&c",
            "combat": "&e",
            "warning": "&6",
            "safe": "&a",
            "info": "&b"
        }[alertType] || "&f";

        Chat.actionbar(`${formattedMessage}${alertMessage}`);
        this.lastAlerts.set(uuid, currentTime);
    }
}

const simpleAlert = new SimpleGhastAlert();

// Monitor ghasts every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    simpleAlert.checkGhastAttacks();
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if ghast is currently attacking
- `isAiDisabled()` - Check if ghast's AI is disabled

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (ghasts have 10 health points)
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (usually empty for ghasts)
- `getArmor()` - Armor value (usually 0 for ghasts)
- `isBaby()` - Check if ghast is a baby variant (unlikely for ghasts)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- GhastEntityHelper is specifically designed for the unique fireball attack mechanics of ghasts
- The `isShooting()` method indicates when a ghast is charging up to fire, providing crucial warning time
- Ghasts can shoot explosive fireballs that destroy blocks and deal significant damage to players
- Ghasts are found exclusively in Nether biomes, particularly in open spaces and soul sand valleys
- Ghasts have a distinctive crying sound that can be heard from a distance
- Fireballs can be shot down with arrows, snowballs, or other projectiles before they impact
- Ghasts will open their eyes red and extend their tentacles when attacking - this method detects that behavior
- Multiple ghasts may attack simultaneously, creating dangerous combat situations
- Ghasts are immune to fire damage but vulnerable to all other damage types
- Consider using cover and terrain to your advantage when fighting ghasts
- Bow with infinity or power enchantments is recommended for ghast combat
- Fire resistance potions can provide protection against ghast fireball explosions

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `FireballEntityHelper` - For tracking ghast fireball projectiles
- `BlazeEntityHelper` - Another Nether mob with fire-based attacks
- `WitherEntityHelper` - Boss mob with projectile attacks in the Nether
- `PlayerEntityHelper` - For combat interactions and player-specific abilities

---

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive ghast interaction
- Designed specifically for Nether combat scenarios and ghast attack state management
- Essential tool for effective ghast combat timing and defense strategies