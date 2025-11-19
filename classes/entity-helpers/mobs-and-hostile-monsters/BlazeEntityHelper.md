# BlazeEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.BlazeEntityHelper<T extends BlazeEntity>`

**Extends:** `MobEntityHelper<T>`

**Since:** JsMacros 1.8.4

Represents a blaze entity in the world. BlazeEntityHelper provides access to blaze-specific properties and behaviors, particularly their fire state which affects their combat abilities. Blazes are hostile mobs from the Nether that shoot fireballs at players and are immune to fire damage.

Blaze entities are floating fire-based mobs that can only attack with fireballs when they are actively on fire. They cycle between an "on fire" state and a "cool" state, making their attack patterns predictable. This helper provides access to their current fire state, which is crucial for understanding their combat behavior and timing attacks or defenses.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding blaze-specific functionality for fire state monitoring.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

BlazeEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`, `ProjectileHit`)
- World entity queries and type casting
- Methods that return blaze entities
- Type casting from EntityHelper using `as("minecraft:blaze")` or appropriate casting methods

---

## Methods

## Usage Examples

### Blaze Combat State Monitor
```js
// Real-time blaze monitoring system for Nether combat
class BlazeCombatMonitor {
    constructor() {
        this.activeBlazes = new Map();
        this.alertCooldowns = new Map();
        this.combatLog = [];
        this.lastCleanup = 0;
    }

    updateBlaze(blazeEntity) {
        const blaze = blazeEntity.as("minecraft:blaze");
        if (!blaze) return;

        const uuid = blazeEntity.getUUID();
        const player = Player.getPlayer();
        const isOnFire = blaze.isOnFire();
        const distance = player.distanceTo(blazeEntity);
        const health = blazeEntity.asLiving().getHealth();
        const maxHealth = blazeEntity.asLiving().getMaxHealth();
        const pos = blazeEntity.getPos();

        if (!this.activeBlazes.has(uuid)) {
            // New blaze detected
            this.activeBlazes.set(uuid, {
                entity: blazeEntity,
                name: blazeEntity.getName().getString(),
                firstSeen: Client.getTime(),
                lastFireState: isOnFire,
                stateChanges: 0,
                fireballCount: 0,
                healthHistory: [{ health, time: Client.getTime() }],
                combatEngagement: null,
                threatLevel: this.calculateThreatLevel(blazeEntity, distance)
            });

            Chat.log(`&e🔥 Blaze detected: ${blazeEntity.getName().getString()}`);
            Chat.log(`  Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Initial state: ${isOnFire ? "On Fire" : "Cooling"}`);
            Chat.log(`  Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);

            // Alert player if blaze is nearby and active
            if (distance <= 16 && isOnFire) {
                this.sendAlert("ACTIVE BLAZE NEARBY!", "warning");
            }
        } else {
            // Update existing blaze tracking
            const blazeData = this.activeBlazes.get(uuid);

            // Track fire state changes
            if (blazeData.lastFireState !== isOnFire) {
                blazeData.stateChanges++;
                blazeData.lastFireState = isOnFire;

                const stateText = isOnFire ? "IGNITED" : "COOLING";
                Chat.log(`&6🔄 ${blazeData.name} state changed to: ${stateText}`);

                // Alert for state changes
                if (distance <= 12) {
                    const alertMessage = isOnFire ? "Blaze IGNITED - Take cover!" : "Blaze COOLING - Attack now!";
                    const alertType = isOnFire ? "danger" : "success";
                    this.sendAlert(alertMessage, alertType);
                }

                // Track potential fireball attacks
                if (isOnFire) {
                    blazeData.fireballCount++;
                }
            }

            // Update health tracking
            blazeData.healthHistory.push({ health, time: Client.getTime() });

            // Keep only recent health history (last 30 seconds)
            const cutoffTime = Client.getTime() - 600;
            blazeData.healthHistory = blazeData.healthHistory.filter(h => h.time > cutoffTime);

            // Update threat level
            blazeData.threatLevel = this.calculateThreatLevel(blazeEntity, distance);

            // Monitor for combat engagement
            if (distance <= 20) {
                if (!blazeData.combatEngagement) {
                    blazeData.combatEngagement = Client.getTime();
                    Chat.log(`&c⚔️ Combat engagement with ${blazeData.name} at ${distance.toFixed(1)} blocks`);
                }
            } else {
                if (blazeData.combatEngagement && Client.getTime() - blazeData.combatEngagement > 100) {
                    const combatDuration = (Client.getTime() - blazeData.combatEngagement) / 20;
                    Chat.log(`&a✓ Combat with ${blazeData.name} ended after ${combatDuration.toFixed(1)} seconds`);
                    blazeData.combatEngagement = null;
                }
            }

            // Periodic updates for nearby active blazes
            if (distance <= 8 && isOnFire && Client.getTime() % 20 === 0) {
                this.updateCombatStatus(blazeData, distance, health, maxHealth);
            }
        }
    }

    calculateThreatLevel(blazeEntity, distance) {
        const health = blazeEntity.asLiving().getHealth();
        const maxHealth = blazeEntity.asLiving().getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;
        const blaze = blazeEntity.as("minecraft:blaze");
        const isActive = blaze && blaze.isOnFire();

        let threat = 0;

        // Distance threat (closer is more dangerous)
        if (distance <= 4) threat += 40;
        else if (distance <= 8) threat += 25;
        else if (distance <= 16) threat += 15;
        else threat += 5;

        // Health threat
        threat += healthPercent * 0.3;

        // Active state threat
        if (isActive) threat += 25;

        // Multi-blaze threat calculation (check nearby blazes)
        const nearbyBlazes = this.countNearbyBlazes(blazeEntity.getPos(), 16);
        if (nearbyBlazes > 1) threat += nearbyBlazes * 10;

        return Math.min(threat, 100);
    }

    countNearbyBlazes(position, range) {
        const player = Player.getPlayer();
        const entities = World.getEntities();
        let count = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:blaze")) {
                const distance = position.distanceTo(entity.getPos());
                if (distance <= range) {
                    count++;
                }
            }
        });

        return count;
    }

    updateCombatStatus(blazeData, distance, health, maxHealth) {
        const blaze = blazeData.entity.as("minecraft:blaze");
        const isActive = blaze.isOnFire();
        const healthPercent = (health / maxHealth) * 100;

        let statusMessage = `${blazeData.name}: `;

        // State indicator
        statusMessage += isActive ? "🔥 " : "❄️ ";

        // Health indicator
        if (healthPercent > 75) statusMessage += "🟢";
        else if (healthPercent > 40) statusMessage += "🟡";
        else statusMessage += "🔴";

        // Distance indicator
        statusMessage += ` ${distance.toFixed(0)}m`;

        // Threat level
        statusMessage += ` [${blazeData.threatLevel.toFixed(0)}%]`;

        Chat.actionbar(statusMessage);
    }

    sendAlert(message, type = "info") {
        const currentTime = Client.getTime();
        const alertKey = `${message}_${type}`;

        // Cooldown to prevent spam
        if (!this.alertCooldowns.has(alertKey) ||
            currentTime - this.alertCooldowns.get(alertKey) > 60) {

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
        if (this.activeBlazes.size === 0) {
            Chat.log("No blazes currently tracked");
            return;
        }

        Chat.log(`&6=== Blaze Combat Report (${this.activeBlazes.size} blazes) ===`);

        let totalThreat = 0;
        let activeBlazes = 0;
        let coolingBlazes = 0;
        let inCombat = 0;

        for (const [uuid, blazeData] of this.activeBlazes) {
            const blaze = blazeData.entity.as("minecraft:blaze");
            const isActive = blaze.isOnFire();
            const distance = Player.getPlayer().distanceTo(blazeData.entity);
            const trackingDuration = (Client.getTime() - blazeData.firstSeen) / 20;

            if (isActive) activeBlazes++;
            else coolingBlazes++;

            if (blazeData.combatEngagement) inCombat++;

            totalThreat += blazeData.threatLevel;

            Chat.log(`\n${blazeData.name}:`);
            Chat.log(`  State: ${isActive ? "🔥 On Fire" : "❄️ Cooling"}`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Health: ${blazeData.entity.asLiving().getHealth().toFixed(1)}/${blazeData.entity.asLiving().getMaxHealth().toFixed(1)}`);
            Chat.log(`  Threat Level: ${blazeData.threatLevel.toFixed(0)}%`);
            Chat.log(`  State Changes: ${blazeData.stateChanges}`);
            Chat.log(`  Fireball Phases: ${blazeData.fireballCount}`);
            Chat.log(`  Tracked for: ${trackingDuration.toFixed(1)}s`);

            if (blazeData.combatEngagement) {
                const combatDuration = (Client.getTime() - blazeData.combatEngagement) / 20;
                Chat.log(`  In Combat: ${combatDuration.toFixed(1)}s`);
            }
        }

        // Summary
        Chat.log(`\n=== Summary ===`);
        Chat.log(`Active Blazes: ${activeBlazes}`);
        Chat.log(`Cooling Blazes: ${coolingBlazes}`);
        Chat.log(`In Combat: ${inCombat}`);
        Chat.log(`Average Threat Level: ${(totalThreat / this.activeBlazes.size).toFixed(0)}%`);

        // Warnings
        if (activeBlazes >= 3) {
            Chat.log(`\n&c🔥 CRITICAL: ${activeBlazes} blazes currently active!`);
        } else if (activeBlazes >= 2) {
            Chat.log(`\n&e⚠️ WARNING: ${activeBlazes} blazes currently active!`);
        }

        if (inCombat >= 2) {
            Chat.log(`\n&c⚔️ MULTIPLE COMBAT engagements in progress!`);
        }
    }

    cleanup() {
        const currentTime = Client.getTime();

        // Only cleanup every 5 seconds to avoid performance issues
        if (currentTime - this.lastCleanup < 100) return;

        this.lastCleanup = currentTime;

        for (const [uuid, blazeData] of this.activeBlazes) {
            if (!blazeData.entity.isAlive()) {
                const trackingDuration = (currentTime - blazeData.firstSeen) / 20;
                Chat.log(`&7${blazeData.name} eliminated after ${trackingDuration.toFixed(1)}s`);
                this.activeBlazes.delete(uuid);
            } else {
                const distance = Player.getPlayer().distanceTo(blazeData.entity);

                // Remove blazes that are too far away (64+ blocks)
                if (distance > 64) {
                    Chat.log(`&7${blazeData.name} moved out of tracking range`);
                    this.activeBlazes.delete(uuid);
                }
            }
        }
    }
}

const blazeMonitor = new BlazeCombatMonitor();

// Monitor blazes every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const trackingRange = 32; // Track blazes within 32 blocks

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= trackingRange && entity.is("minecraft:blaze")) {
            blazeMonitor.updateBlaze(entity);
        }
    });

    // Cleanup every 5 seconds
    if (Client.getTime() % 100 === 0) {
        blazeMonitor.cleanup();
    }
}));

// Report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.b" && e.action === 1) { // B key
        blazeMonitor.generateReport();
    }
}));
```

### Blaze Attack Pattern Analysis
```js
// Analyze and predict blaze attack patterns
class BlazeAttackPatternAnalyzer {
    constructor() {
        this.blazePatterns = new Map();
        this.attackWindows = [];
        this.defensiveRecommendations = [];
    }

    analyzeBlaze(blazeEntity) {
        const blaze = blazeEntity.as("minecraft:blaze");
        if (!blaze) return;

        const uuid = blazeEntity.getUUID();
        const isOnFire = blaze.isOnFire();
        const currentTime = Client.getTime();

        if (!this.blazePatterns.has(uuid)) {
            this.blazePatterns.set(uuid, {
                entity: blazeEntity,
                name: blazeEntity.getName().getString(),
                states: [],
                lastStateChange: currentTime,
                averageCycleTime: 0,
                totalTimeOnFire: 0,
                totalTimeCooling: 0,
                attacksPredicted: 0,
                safeWindows: []
            });
        }

        const pattern = this.blazePatterns.get(uuid);

        if (pattern.states.length === 0 || pattern.states[pattern.states.length - 1].state !== isOnFire) {
            // State changed
            if (pattern.states.length > 0) {
                const lastState = pattern.states[pattern.states.length - 1];
                const duration = currentTime - lastState.timestamp;

                if (lastState.state) {
                    pattern.totalTimeOnFire += duration;
                } else {
                    pattern.totalTimeCooling += duration;
                }

                // Update average cycle time
                if (pattern.states.length >= 2) {
                    pattern.averageCycleTime = (pattern.totalTimeOnFire + pattern.totalTimeCooling) / (pattern.states.length / 2);
                }
            }

            pattern.states.push({
                state: isOnFire,
                timestamp: currentTime
            });

            // Log significant state changes
            if (Player.getPlayer().distanceTo(blazeEntity) <= 16) {
                const stateText = isOnFire ? "IGNITED (Attack Mode)" : "COOLING (Safe Window)";
                Chat.log(`&6${pattern.name}: ${stateText}`);

                if (isOnFire) {
                    pattern.attacksPredicted++;
                    this.predictAttackTiming(pattern, blazeEntity);
                } else {
                    this.identifySafeWindow(pattern, blazeEntity);
                }
            }
        }

        // Clean old state data (keep last 2 minutes)
        const cutoffTime = currentTime - 2400;
        pattern.states = pattern.states.filter(state => state.timestamp > cutoffTime);
    }

    predictAttackTiming(pattern, blazeEntity) {
        const player = Player.getPlayer();
        const distance = player.distanceTo(blazeEntity);

        if (pattern.averageCycleTime > 0) {
            const nextSafeWindow = pattern.averageCycleTime * 0.6; // Rough estimate
            const message = `&e⚔️ Expect attacks for next ~${nextSafeWindow.toFixed(1)}s`;

            if (distance < 12) {
                Chat.actionbar(message);
            }
        }

        // Predictive recommendations
        if (distance < 8) {
            Chat.log("&c🔥 IMMEDIATE ACTION: Move away or take cover!");
            Chat.log("→ Fireballs incoming - dodge horizontally");
            Chat.log("→ Use pillars or walls as shields");
        } else if (distance < 16) {
            Chat.log("&e⚔️ COMBAT READY: Prepare for fireball attacks");
            Chat.log("→ Keep moving to avoid projectiles");
            Chat.log("→ Return fire with ranged weapons");
        }
    }

    identifySafeWindow(pattern, blazeEntity) {
        const player = Player.getPlayer();
        const distance = player.distanceTo(blazeEntity);

        if (pattern.averageCycleTime > 0) {
            const safeWindowDuration = pattern.averageCycleTime * 0.4;
            const message = `&a🛡️ Safe attack window: ~${safeWindowDuration.toFixed(1)}s`;

            if (distance < 20) {
                Chat.actionbar(message);
            }
        }

        // Safe window recommendations
        if (distance < 12) {
            Chat.log("&a✅ ATTACK WINDOW: Blaze is cooling down!");
            Chat.log("→ Close in for melee attacks");
            Chat.log("→ Blaze cannot attack while cooling");
        } else if (distance < 20) {
            Chat.log("&e🎯 APPROACH OPPORTUNITY: Safe to advance");
            Chat.log("→ Reduce distance for future attacks");
            Chat.log("→ Prepare weapons for next active phase");
        }

        // Track safe windows for analysis
        pattern.safeWindows.push({
            startTime: Client.getTime(),
            distance: distance
        });
    }

    generatePatternReport() {
        if (this.blazePatterns.size === 0) {
            Chat.log("No blaze pattern data available");
            return;
        }

        Chat.log(`&6=== Blaze Attack Pattern Analysis ===`);

        for (const [uuid, pattern] of this.blazePatterns) {
            const totalCycles = pattern.states.length / 2;
            const currentDistance = Player.getPlayer().distanceTo(pattern.entity);
            const blaze = pattern.entity.as("minecraft:blaze");
            const currentState = blaze.isOnFire();

            Chat.log(`\n${pattern.name}:`);
            Chat.log(`  Current State: ${currentState ? "🔥 Active" : "❄️ Cooling"}`);
            Chat.log(`  Distance: ${currentDistance.toFixed(1)} blocks`);
            Chat.log(`  Observed Cycles: ${totalCycles}`);

            if (pattern.averageCycleTime > 0) {
                Chat.log(`  Average Cycle Time: ${(pattern.averageCycleTime / 20).toFixed(1)}s`);
                Chat.log(`  Active Duration: ${(pattern.totalTimeOnFire / 20 / totalCycles).toFixed(1)}s`);
                Chat.log(`  Cooling Duration: ${(pattern.totalTimeCooling / 20 / totalCycles).toFixed(1)}s`);

                const activePercentage = (pattern.totalTimeOnFire / (pattern.totalTimeOnFire + pattern.totalTimeCooling)) * 100;
                Chat.log(`  Active Time Percentage: ${activePercentage.toFixed(1)}%`);
            }

            Chat.log(`  Attacks Predicted: ${pattern.attacksPredicted}`);
            Chat.log(`  Safe Windows Identified: ${pattern.safeWindows.length}`);

            // Provide tactical recommendations based on patterns
            this.generateTacticalRecommendations(pattern);
        }
    }

    generateTacticalRecommendations(pattern) {
        const blaze = pattern.entity.as("minecraft:blaze");
        const currentState = blaze.isOnFire();
        const distance = Player.getPlayer().distanceTo(pattern.entity);

        Chat.log("\n  Tactical Recommendations:");

        if (pattern.averageCycleTime > 0) {
            const activePercent = (pattern.totalTimeOnFire / (pattern.totalTimeOnFire + pattern.totalTimeCooling)) * 100;

            if (activePercent > 60) {
                Chat.log("    &eThis blaze is highly aggressive - maintain distance");
                Chat.log("    → Focus on ranged combat and evasive maneuvers");
            } else if (activePercent < 40) {
                Chat.log("    &aThis blaze is relatively passive - good for melee");
                Chat.log("    → Aggressive close-range combat recommended");
            } else {
                Chat.log("    &6Balanced attack pattern - adaptable strategy");
                Chat.log("    → Mix of ranged and melee combat effective");
            }
        }

        if (currentState) {
            if (distance < 10) {
                Chat.log("    &cDANGER: Too close to active blaze!");
                Chat.log("    → Immediate retreat required");
            } else {
                Chat.log("    &eOPTIMAL RANGE: Good position for ranged combat");
                Chat.log("    → Maintain current distance and attack");
            }
        } else {
            if (distance > 15) {
                Chat.log("    &6OPPORTUNITY: Close distance while blaze is cooling");
                Chat.log("    → Advance to melee range for maximum damage");
            } else {
                Chat.log("    &aPERFECT POSITION: Attack now with melee weapons");
                Chat.log("    → Blaze is defenseless while cooling");
            }
        }

        // Environmental considerations
        const pos = pattern.entity.getPos();
        if (pos.y < 50) {
            Chat.log("    ℹ️ Underground location - limited escape options");
            Chat.log("    → Plan retreat routes carefully");
        }
    }
}

const patternAnalyzer = new BlazeAttackPatternAnalyzer();

// Analyze blaze patterns every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const analysisRange = 24;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= analysisRange && entity.is("minecraft:blaze")) {
            patternAnalyzer.analyzeBlaze(entity);
        }
    });
}));

// Pattern analysis command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.p" && e.action === 1) { // P key
        patternAnalyzer.generatePatternReport();
    }
}));
```

### Blaze Fire State Alert System
```js
// Simple but effective blaze fire state monitoring
class BlazeFireStateMonitor {
    constructor() {
        this.lastAlerts = new Map();
        this.alertCooldown = 40; // 2 seconds between alerts for same blaze
    }

    monitorBlazes() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const alertRange = 20;

        entities.forEach(entity => {
            if (entity.is("minecraft:blaze")) {
                const blaze = entity.as("minecraft:blaze");
                const uuid = entity.getUUID();
                const distance = player.distanceTo(entity);
                const isOnFire = blaze.isOnFire();

                if (distance <= alertRange) {
                    this.sendBlazeAlert(uuid, entity, isOnFire, distance);
                }
            }
        });
    }

    sendBlazeAlert(uuid, blazeEntity, isOnFire, distance) {
        const currentTime = Client.getTime();
        const lastAlert = this.lastAlerts.get(uuid) || 0;

        if (currentTime - lastAlert < this.alertCooldown) {
            return; // Skip to prevent alert spam
        }

        const name = blazeEntity.getName().getString();
        let alertMessage = "";
        let alertType = "";

        if (isOnFire) {
            if (distance < 6) {
                alertMessage = `🔥 CRITICAL: ${name} attacking at point blank!`;
                alertType = "critical";
            } else if (distance < 12) {
                alertMessage = `⚔️ COMBAT: ${name} attacking at ${distance.toFixed(0)}m!`;
                alertType = "combat";
            } else {
                alertMessage = `🔥 ALERT: ${name} active at ${distance.toFixed(0)}m`;
                alertType = "warning";
            }
        } else {
            if (distance < 8) {
                alertMessage = `✅ SAFE: ${name} cooling down nearby`;
                alertType = "safe";
            } else {
                alertMessage = `🛡️ WINDOW: ${name} vulnerable at ${distance.toFixed(0)}m`;
                alertType = "opportunity";
            }
        }

        const formattedMessage = {
            "critical": "&c",
            "combat": "&e",
            "warning": "&6",
            "safe": "&a",
            "opportunity": "&b"
        }[alertType] || "&f";

        Chat.actionbar(`${formattedMessage}${alertMessage}`);
        this.lastAlerts.set(uuid, currentTime);
    }
}

const fireStateMonitor = new BlazeFireStateMonitor();

// Monitor blazes every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    fireStateMonitor.monitorBlazes();
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if blaze is currently attacking
- `isAiDisabled()` - Check if blaze's AI is disabled

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects (blazes are immune to fire)
- `getMainHand()`, `getOffHand()` - Equipment information (usually empty for blazes)
- `getArmor()` - Armor value (usually 0 for blazes)
- `isBaby()` - Check if blaze is a baby variant (unlikely for blazes)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks
- Note: Blazes are naturally immune to fire damage but use the `isOnFire()` method for their attack state

---

## Notes and Limitations

- BlazeEntityHelper is specifically designed for the unique fire-based combat mechanics of blazes
- The `isOnFire()` method indicates attack capability, not fire vulnerability (blazes are immune to fire)
- Blazes cycle between active (on fire) and cooling states approximately every 3-4 seconds
- Fire state timing can vary slightly between individual blazes
- Multiple blazes may have synchronized or desynchronized fire states in groups
- This helper is essential for effective Nether combat against blazes
- Blazes can only shoot fireballs when `isOnFire()` returns true
- The cooling phase provides optimal windows for melee attacks
- Blazes are commonly found in Nether fortresses and bastion remnants
- Consider environmental factors like terrain and other mobs when planning blaze combat
- Fire resistance potions can negate blaze fireball damage completely

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `GhastEntityHelper` - Another Nether flying mob with projectile attacks
- `WitherEntityHelper` - Boss mob with fire-based attacks in the Nether
- `PlayerEntityHelper` - For combat interactions and player-specific abilities

---

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive blaze interaction
- Designed specifically for Nether combat scenarios and blaze fire state management
- Essential tool for effective blaze combat timing and strategy