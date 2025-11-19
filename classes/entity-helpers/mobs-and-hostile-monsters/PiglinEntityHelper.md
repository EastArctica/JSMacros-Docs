# PiglinEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.PiglinEntityHelper`

**Extends:** `AbstractPiglinEntityHelper<PiglinEntity>`

**Since:** JsMacros 1.8.4

The `PiglinEntityHelper` class provides specialized access to piglin entities in Minecraft, offering detailed insight into their activities, behaviors, and combat states. This class extends the base functionality of `AbstractPiglinEntityHelper` with piglin-specific activity detection that is essential for understanding piglin AI behavior, bartering interactions, and combat patterns.

Piglins are complex hostile mobs that exhibit unique behaviors like bartering with players, dancing to music, admiring items, and switching between melee and ranged combat. This helper class allows scripters to monitor these behavioral states and create sophisticated piglin interaction systems, automated bartering monitors, combat analysis tools, and behavioral research utilities.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

PiglinEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering for `minecraft:piglin`
- Casting from generic EntityHelper instances using `as("minecraft:piglin")`
- Methods that return piglin entities

---

## Methods

### Activity and Behavior Monitoring

- [piglin.isWandering()](#pigliniswandering)
- [piglin.isDancing()](#piglindancing)
- [piglin.isAdmiring()](#piglinisadmiring)
- [piglin.isMeleeAttacking()](#piglinismeleeattacking)
- [piglin.isChargingCrossbow()](#piglinischargingcrossbow)
- [piglin.hasCrossbowReady()](#piglinhascrossbowready)

### Piglin-Specific Behavior

- [piglin.canBeZombified()](#piglincanbezombified) *(inherited from AbstractPiglinEntityHelper)*

---

## Usage Examples

### Comprehensive Piglin Combat Analysis
```js
// Advanced piglin combat behavior analyzer
class PiglinCombatAnalyzer {
    constructor() {
        this.combatLog = [];
        this.threatAssessment = new Map();
        this.weaponAnalysis = new Map();
        this.tacticalRecommendations = [];
    }

    analyzePiglinCombat(entity) {
        const piglin = entity.asPiglin();
        if (!piglin) return;

        const uuid = entity.getUUID();
        const name = entity.getName().getString();
        const pos = entity.getPos();
        const player = Player.getPlayer();

        const combatState = this.assessCombatState(piglin);
        const threatLevel = this.calculateThreatLevel(piglin, combatState);
        const tacticalData = this.gatherTacticalData(piglin, entity);

        // Update threat assessment
        this.threatAssessment.set(uuid, {
            entity: entity,
            name: name,
            combatState: combatState,
            threatLevel: threatLevel,
            tacticalData: tacticalData,
            lastUpdate: Client.getTime(),
            position: pos
        });

        // Log combat state changes
        this.logCombatStateChange(uuid, name, combatState, threatLevel);

        // Generate tactical recommendations
        this.updateTacticalRecommendations(uuid, combatState, threatLevel);

        // Update weapon analysis
        this.updateWeaponAnalysis(uuid, combatState);
    }

    assessCombatState(piglin) {
        const states = {
            wandering: piglin.isWandering(),
            dancing: piglin.isDancing(),
            admiring: piglin.isAdmiring(),
            meleeAttacking: piglin.isMeleeAttacking(),
            chargingCrossbow: piglin.isChargingCrossbow(),
            crossbowReady: piglin.hasCrossbowReady()
        };

        // Determine primary state
        if (states.meleeAttacking) return "MELEE_COMBAT";
        if (states.chargingCrossbow) return "RANGED_PREPARING";
        if (states.crossbowReady) return "RANGED_READY";
        if (states.admiring) return "ADMIRING";
        if (states.dancing) return "DANCING";
        if (states.wandering) return "WANDERING";

        return "UNKNOWN";
    }

    calculateThreatLevel(piglin, combatState) {
        const baseThreat = {
            "MELEE_COMBAT": 8,
            "RANGED_READY": 9,
            "RANGED_PREPARING": 7,
            "ADMIRING": 1,
            "DANCING": 0,
            "WANDERING": 3,
            "UNKNOWN": 4
        };

        let threatLevel = baseThreat[combatState] || 4;

        // Distance modifier
        const player = Player.getPlayer();
        if (player) {
            const distance = player.distanceTo(piglin);
            if (distance <= 4) threatLevel += 3;
            else if (distance <= 8) threatLevel += 2;
            else if (distance <= 16) threatLevel += 1;
        }

        // Health modifier
        const living = piglin.asLiving();
        if (living) {
            const healthPercent = living.getHealth() / living.getMaxHealth();
            if (healthPercent > 0.8) threatLevel += 1;
            else if (healthPercent < 0.3) threatLevel -= 2;
        }

        // Environmental factors
        if (!piglin.isInWater()) threatLevel += 1;
        if (piglin.isOnFire()) threatLevel -= 1;

        return Math.max(0, Math.min(10, threatLevel));
    }

    gatherTacticalData(piglin, entity) {
        const player = Player.getPlayer();
        const living = entity.asLiving();

        return {
            distance: player ? player.distanceTo(entity) : Infinity,
            health: living ? living.getHealth() : 0,
            maxHealth: living ? living.getMaxHealth() : 0,
            healthPercent: living ? (living.getHealth() / living.getMaxHealth()) * 100 : 0,
            inWater: entity.isInWater(),
            onFire: entity.isOnFire(),
            canBeZombified: piglin.canBeZombified(),
            dimension: World.getDimension(),
            equipment: this.getEquipmentInfo(entity),
            nearbyThreats: this.countNearbyThreats(entity)
        };
    }

    getEquipmentInfo(entity) {
        const living = entity.asLiving();
        if (!living) return null;

        return {
            mainHand: living.getMainHand()?.toString() || "empty",
            offHand: living.getOffHand()?.toString() || "empty",
            armor: living.getArmor() || 0
        };
    }

    countNearbyThreats(entity) {
        const entities = World.getEntities(16);
        let threatCount = 0;

        entities.forEach(other => {
            if (other === entity) return;
            const distance = entity.distanceTo(other);
            if (distance <= 12 && this.isThreatToPlayer(other)) {
                threatCount++;
            }
        });

        return threatCount;
    }

    isThreatToPlayer(entity) {
        const hostileTypes = [
            "minecraft:piglin", "minecraft:zombie", "minecraft:skeleton",
            "minecraft:spider", "minecraft:creeper", "minecraft:witch",
            "minecraft:ghast", "minecraft:blaze"
        ];
        return entity.is(...hostileTypes);
    }

    logCombatStateChange(uuid, name, combatState, threatLevel) {
        const lastLog = this.combatLog.filter(log => log.uuid === uuid).pop();

        if (!lastLog || lastLog.combatState !== combatState) {
            const logEntry = {
                timestamp: Client.getTime(),
                uuid: uuid,
                name: name,
                combatState: combatState,
                threatLevel: threatLevel,
                formattedTime: new Date().toLocaleTimeString()
            };

            this.combatLog.push(logEntry);

            // Keep only recent logs
            if (this.combatLog.length > 100) {
                this.combatLog = this.combatLog.slice(-50);
            }

            Chat.log(`&c⚔️ [${logEntry.formattedTime}] ${name}: ${combatState} (Threat: ${threatLevel}/10)`);
        }
    }

    updateTacticalRecommendations(uuid, combatState, threatLevel) {
        const recommendations = [];

        switch (combatState) {
            case "MELEE_COMBAT":
                if (threatLevel >= 8) {
                    recommendations.push("URGENT: Retreat to distance or use ranged weapon");
                    recommendations.push("Block incoming attacks - consider shield");
                } else {
                    recommendations.push("Engage with appropriate weapon");
                    recommendations.push("Watch for backup piglins");
                }
                break;

            case "RANGED_READY":
                recommendations.push("CRITICAL: Take cover immediately");
                recommendations.push("Use shield to block arrows");
                recommendations.push("Charge attack while they're stationary");
                break;

            case "RANGED_PREPARING":
                recommendations.push("Interrupt charging with quick attack");
                recommendations.push("Use ranged weapon before they fire");
                recommendations.push("Prepare to dodge incoming arrow");
                break;

            case "ADMIRING":
                recommendations.push("SAFE: Good time for attack or escape");
                recommendations.push("Piglin is distracted - tactical advantage");
                break;

            case "DANCING":
                recommendations.push("PERFECT: Completely distracted");
                recommendations.push("Free attack opportunity or escape chance");
                break;

            case "WANDERING":
                if (threatLevel <= 5) {
                    recommendations.push("APPROACH CAUTIOUSLY: May attack if provoked");
                    recommendations.push("Maintain safe distance");
                } else {
                    recommendations.push("AVOID: High threat even when wandering");
                }
                break;
        }

        this.tacticalRecommendations = recommendations;
    }

    updateWeaponAnalysis(uuid, combatState) {
        if (!this.weaponAnalysis.has(uuid)) {
            this.weaponAnalysis.set(uuid, {
                meleeCount: 0,
                rangedCount: 0,
                stateChanges: []
            });
        }

        const analysis = this.weaponAnalysis.get(uuid);
        const currentTime = Client.getTime();

        // Track weapon usage
        if (combatState === "MELEE_COMBAT") {
            analysis.meleeCount++;
        } else if (combatState.includes("RANGED")) {
            analysis.rangedCount++;
        }

        // Track state changes
        if (analysis.stateChanges.length === 0 ||
            analysis.stateChanges[analysis.stateChanges.length - 1].state !== combatState) {

            analysis.stateChanges.push({
                time: currentTime,
                state: combatState
            });

            // Keep only recent changes
            if (analysis.stateChanges.length > 20) {
                analysis.stateChanges = analysis.stateChanges.slice(-10);
            }
        }
    }

    generateCombatReport() {
        Chat.log("\n&6=== Piglin Combat Analysis Report ===");

        if (this.threatAssessment.size === 0) {
            Chat.log("No piglins currently tracked");
            return;
        }

        // Sort piglins by threat level
        const sortedPiglins = Array.from(this.threatAssessment.entries())
            .sort(([,a], [,b]) => b.threatLevel - a.threatLevel);

        // Threat analysis
        Chat.log("\n&c🎯 Current Threats (by priority):");
        sortedPiglins.forEach(([uuid, data]) => {
            const threatColor = data.threatLevel >= 8 ? "&c" :
                               data.threatLevel >= 6 ? "&e" :
                               data.threatLevel >= 4 ? "&6" : "&a";

            Chat.log(`${threatColor}  ${data.name}: ${data.combatState} (Threat: ${data.threatLevel}/10)`);
            Chat.log(`    Distance: ${data.tacticalData.distance.toFixed(1)}m, Health: ${data.tacticalData.healthPercent.toFixed(0)}%`);
            Chat.log(`    Equipment: ${data.tacticalData.equipment?.mainHand || "unknown"}`);
        });

        // Weapon preference analysis
        Chat.log("\n&b⚔️ Combat Style Analysis:");
        for (const [uuid, analysis] of this.weaponAnalysis) {
            const data = this.threatAssessment.get(uuid);
            const totalActions = analysis.meleeCount + analysis.rangedCount;

            if (totalActions > 0) {
                const meleePercent = ((analysis.meleeCount / totalActions) * 100).toFixed(1);
                const rangedPercent = ((analysis.rangedCount / totalActions) * 100).toFixed(1);

                Chat.log(`  ${data.name}: Melee ${meleePercent}%, Ranged ${rangedPercent}%`);
            }
        }

        // Tactical recommendations
        if (this.tacticalRecommendations.length > 0) {
            Chat.log("\n&e🎯 Tactical Recommendations:");
            this.tacticalRecommendations.forEach(rec => {
                Chat.log(`  • ${rec}`);
            });
        }

        // Combat statistics
        const totalPiglins = this.threatAssessment.size;
        const highThreats = Array.from(this.threatAssessment.values()).filter(data => data.threatLevel >= 7).length;
        const activeCombat = Array.from(this.threatAssessment.values()).filter(data =>
            data.combatState.includes("COMBAT") || data.combatState.includes("RANGED")
        ).length;

        Chat.log("\n&7📊 Combat Statistics:");
        Chat.log(`  Total piglins tracked: ${totalPiglins}`);
        Chat.log(`  High-threat piglins: ${highThreats} (${((highThreats/totalPiglins)*100).toFixed(1)}%)`);
        Chat.log(`  Currently in combat: ${activeCombat}`);
        Chat.log(`  Combat log entries: ${this.combatLog.length}`);
    }

    findHighestThreat() {
        if (this.threatAssessment.size === 0) {
            Chat.log("No piglins to assess");
            return;
        }

        let highestThreat = null;
        let maxThreatLevel = -1;

        for (const [uuid, data] of this.threatAssessment) {
            if (data.threatLevel > maxThreatLevel) {
                maxThreatLevel = data.threatLevel;
                highestThreat = data;
            }
        }

        if (highestThreat) {
            Chat.log(`&c🚨 HIGHEST THREAT: ${highestThreat.name}`);
            Chat.log(`  Combat State: ${highestThreat.combatState}`);
            Chat.log(`  Threat Level: ${highestThreat.threatLevel}/10`);
            Chat.log(`  Position: [${highestThreat.position.x.toFixed(0)}, ${highestThreat.position.y.toFixed(0)}, ${highestThreat.position.z.toFixed(0)}]`);
            Chat.log(`  Distance: ${highestThreat.tacticalData.distance.toFixed(1)} blocks`);
            Chat.log(`  Equipment: ${highestThreat.tacticalData.equipment?.mainHand || "unknown"}`);

            // Priority recommendations
            if (highestThreat.combatState === "RANGED_READY") {
                Chat.log("\n&c⚠️ IMMEDIATE ACTION REQUIRED:");
                Chat.log("  - Take cover behind blocks");
                Chat.log("  - Use shield to block arrows");
                Chat.log("  - Close distance or retreat");
            } else if (highestThreat.combatState === "MELEE_COMBAT") {
                Chat.log("\n&e⚔️ COMBAT ENGAGEMENT:");
                Chat.log("  - Use appropriate weapon for range");
                Chat.log("  - Watch for attack patterns");
                Chat.log("  - Consider tactical retreat if overwhelmed");
            }
        }
    }
}

const combatAnalyzer = new PiglinCombatAnalyzer();

// Monitor piglin combat every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities(48);
    const piglins = entities.filter(entity => entity.is("minecraft:piglin"));

    piglins.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= 40) {
            combatAnalyzer.analyzePiglinCombat(entity);
        }
    });

    // Clean up old data
    combatAnalyzer.cleanup();
}));

// Commands for combat analysis
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.c" && e.action === 1) { // C key
        combatAnalyzer.generateCombatReport();
    }
}));

events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.t" && e.action === 1) { // T key
        combatAnalyzer.findHighestThreat();
    }
}));
```

---

## Inherited Methods

From `AbstractPiglinEntityHelper`:

- `canBeZombified()` - Check if piglin can be zombified in Overworld

From `MobEntityHelper`:

- `isAttacking()` - Check if piglin is currently attacking
- `isAiDisabled()` - Check if piglin's AI is disabled
- All other mob-specific methods for behavior control

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (golden weapons for piglins)
- `getArmor()` - Armor value
- `isBaby()` - Check if piglin is a baby variant

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- PiglinEntityHelper provides detailed insight into piglin behavioral states beyond general piglin functionality
- Activity states are mutually exclusive - a piglin can only be in one primary state at a time
- The `isAdmiring()` state is particularly valuable for successful bartering operations
- Crossbow states (`isChargingCrossbow()`, `hasCrossbowReady()`) indicate different phases of ranged combat
- Piglins switch between melee and ranged combat based on distance and equipment availability
- Dancing indicates nearby music sources and represents a completely safe state
- Activity states change frequently in combat situations, requiring continuous monitoring for accurate analysis
- Piglins may exhibit different behaviors in different dimensions (especially Nether vs Overworld)
- Baby piglins have different behavior patterns and may not use all combat states
- The activity detection methods are based on the underlying Minecraft piglin AI states and are highly accurate
- Combat state transitions can be predicted with some reliability based on distance and player actions
- The combination of activity states with other entity data provides comprehensive tactical intelligence

---

## Related Classes

- `AbstractPiglinEntityHelper` - Parent class with zombification immunity functionality
- `MobEntityHelper` - Grandparent class with AI and combat behaviors
- `LivingEntityHelper` - Base class with health, movement, and status effects
- `EntityHelper` - Base class with general entity methods
- `HoglinEntityHelper` - Related piglin-family entity helper
- `ZombifiedPiglinEntityHelper` - Helper for transformed piglins (if available)
- `PlayerEntityHelper` - Player-related functionality for combat interactions

---

## Version Information

- Available since JSMacros 1.8.4
- Extends AbstractPiglinEntityHelper with detailed activity state monitoring
- Part of the specialized piglin entity helper hierarchy
- Provides comprehensive piglin behavioral analysis capabilities
- Designed for advanced piglin interaction systems and combat intelligence
- All methods delegate to the underlying Minecraft PiglinEntity implementation
- Supports both regular piglins and piglin brutes with identical activity states