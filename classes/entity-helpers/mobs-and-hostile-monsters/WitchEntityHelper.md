# WitchEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.WitchEntityHelper<T extends WitchEntity>`

**Extends:** `MobEntityHelper<T>`

**Since:** JsMacros 1.8.4

Represents a witch entity in the world. WitchEntityHelper provides access to witch-specific properties and behaviors, particularly their potion drinking and throwing mechanics. Witches are hostile mobs that use potions for both offensive and defensive purposes, making them unique among hostile mobs due to their complex combat AI and support capabilities.

Witch entities are magical hostile mobs that attack players by throwing harmful potions and can drink beneficial potions to heal themselves or gain resistance effects. They have distinct combat patterns involving drinking potions before engaging in combat and using various potion types depending on the situation. This helper provides access to their current drinking state and held potion items, which is crucial for understanding their combat behavior and predicting their next actions.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding witch-specific functionality for potion state monitoring and inventory inspection.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

WitchEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`, `ProjectileHit`)
- World entity queries and type casting
- Methods that return witch entities
- Type casting from EntityHelper using `as("minecraft:witch")` or appropriate casting methods

---

## Methods

## Usage Examples

### Witch Combat State Monitor
```js
// Real-time witch monitoring system for swamp and dark forest combat
class WitchCombatMonitor {
    constructor() {
        this.activeWitches = new Map();
        this.alertCooldowns = new Map();
        this.combatLog = [];
        this.lastCleanup = 0;
    }

    updateWitch(witchEntity) {
        const witch = witchEntity.as("minecraft:witch");
        if (!witch) return;

        const uuid = witchEntity.getUUID();
        const player = Player.getPlayer();
        const isDrinking = witch.isDrinkingPotion();
        const potion = witch.getPotion();
        const distance = player.distanceTo(witchEntity);
        const health = witchEntity.asLiving().getHealth();
        const maxHealth = witchEntity.asLiving().getMaxHealth();
        const pos = witchEntity.getPos();

        if (!this.activeWitches.has(uuid)) {
            // New witch detected
            this.activeWitches.set(uuid, {
                entity: witchEntity,
                name: witchEntity.getName().getString(),
                firstSeen: Client.getTime(),
                lastDrinkingState: isDrinking,
                drinkingPhases: 0,
                potionHistory: [],
                combatEngagement: null,
                threatLevel: this.calculateThreatLevel(witchEntity, distance)
            });

            Chat.log(`&e🧪 Witch detected: ${witchEntity.getName().getString()}`);
            Chat.log(`  Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Initial state: ${isDrinking ? "Drinking" : "Ready to attack"}`);
            Chat.log(`  Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);

            // Alert player if witch is nearby and ready
            if (distance <= 16 && !isDrinking) {
                this.sendAlert("WITCH NEARBY - Ready to attack!", "danger");
            }
        } else {
            // Update existing witch tracking
            const witchData = this.activeWitches.get(uuid);

            // Track drinking state changes
            if (witchData.lastDrinkingState !== isDrinking) {
                witchData.drinkingPhases++;
                witchData.lastDrinkingState = isDrinking;

                const stateText = isDrinking ? "DRINKING" : "READY TO ATTACK";
                Chat.log(`&6🔄 ${witchData.name} state changed to: ${stateText}`);

                // Alert for state changes
                if (distance <= 12) {
                    const alertMessage = isDrinking ?
                        "Witch drinking - Attack now!" :
                        "Witch ready - Watch for potions!";
                    const alertType = isDrinking ? "success" : "danger";
                    this.sendAlert(alertMessage, alertType);
                }
            }

            // Track potion changes
            if (potion && !potion.isEmpty()) {
                const potionName = potion.getName().getString();
                const lastPotion = witchData.potionHistory[witchData.potionHistory.length - 1];

                if (!lastPotion || lastPotion.potionName !== potionName) {
                    witchData.potionHistory.push({
                        potionName: potionName,
                        timestamp: Client.getTime(),
                        isDrinking: isDrinking
                    });

                    if (distance <= 16) {
                        Chat.log(`&d${witchData.name} now holding: ${potionName}`);
                        this.analyzePotionThreat(potionName, distance);
                    }
                }
            }

            // Update threat level
            witchData.threatLevel = this.calculateThreatLevel(witchEntity, distance);

            // Monitor for combat engagement
            if (distance <= 20) {
                if (!witchData.combatEngagement) {
                    witchData.combatEngagement = Client.getTime();
                    Chat.log(`&c⚔️ Combat engagement with ${witchData.name} at ${distance.toFixed(1)} blocks`);
                }
            } else {
                if (witchData.combatEngagement && Client.getTime() - witchData.combatEngagement > 100) {
                    const combatDuration = (Client.getTime() - witchData.combatEngagement) / 20;
                    Chat.log(`&a✓ Combat with ${witchData.name} ended after ${combatDuration.toFixed(1)} seconds`);
                    witchData.combatEngagement = null;
                }
            }

            // Periodic updates for nearby witches
            if (distance <= 8 && Client.getTime() % 20 === 0) {
                this.updateCombatStatus(witchData, distance, health, maxHealth);
            }
        }
    }

    calculateThreatLevel(witchEntity, distance) {
        const health = witchEntity.asLiving().getHealth();
        const maxHealth = witchEntity.asLiving().getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;
        const witch = witchEntity.as("minecraft:witch");
        const isDrinking = witch && witch.isDrinkingPotion();

        let threat = 0;

        // Distance threat (closer is more dangerous)
        if (distance <= 6) threat += 50;
        else if (distance <= 10) threat += 35;
        else if (distance <= 16) threat += 20;
        else threat += 10;

        // Health threat (lower health = more desperate = more dangerous)
        threat += (100 - healthPercent) * 0.4;

        // Drinking state threat
        if (!isDrinking) threat += 30; // Ready witches are more dangerous

        return Math.min(threat, 100);
    }

    analyzePotionThreat(potionName, distance) {
        const threatLevel = potionName.toLowerCase().includes("poison") ||
                           potionName.toLowerCase().includes("harming") ? "HIGH" :
                           potionName.toLowerCase().includes("healing") ? "MEDIUM" : "LOW";

        const recommendation = threatLevel === "HIGH" ?
            "&cDANGER: Attack potion incoming - dodge now!" :
            threatLevel === "MEDIUM" ?
            "&eWARNING: Witch healing - prevent recovery!" :
            "&a✓ Support potion - attack opportunity!";

        Chat.log(recommendation);

        if (distance <= 8 && threatLevel === "HIGH") {
            this.sendAlert("POTION ATTACK - Move away!", "critical");
        }
    }

    updateCombatStatus(witchData, distance, health, maxHealth) {
        const witch = witchData.entity.as("minecraft:witch");
        const isDrinking = witch.isDrinkingPotion();
        const healthPercent = (health / maxHealth) * 100;

        let statusMessage = `${witchData.name}: `;

        // State indicator
        statusMessage += isDrinking ? "🧪 " : "⚔️ ";

        // Health indicator
        if (healthPercent > 75) statusMessage += "🟢";
        else if (healthPercent > 40) statusMessage += "🟡";
        else statusMessage += "🔴";

        // Distance indicator
        statusMessage += ` ${distance.toFixed(0)}m`;

        // Threat level
        statusMessage += ` [${witchData.threatLevel.toFixed(0)}%]`;

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
                "danger": "&4🧪 ",
                "success": "&a✓ ",
                "critical": "&4🚨 ",
                "info": "&bℹ️ "
            }[type] || "&bℹ️ ";

            Chat.actionbar(`${prefix}${message}`);
            this.alertCooldowns.set(alertKey, currentTime);
        }
    }

    generateReport() {
        if (this.activeWitches.size === 0) {
            Chat.log("No witches currently tracked");
            return;
        }

        Chat.log(`&6=== Witch Combat Report (${this.activeWitches.size} witches) ===`);

        let totalThreat = 0;
        let drinkingWitches = 0;
        let readyWitches = 0;
        let inCombat = 0;

        for (const [uuid, witchData] of this.activeWitches) {
            const witch = witchData.entity.as("minecraft:witch");
            const isDrinking = witch.isDrinkingPotion();
            const distance = Player.getPlayer().distanceTo(witchData.entity);
            const trackingDuration = (Client.getTime() - witchData.firstSeen) / 20;

            if (isDrinking) drinkingWitches++;
            else readyWitches++;

            if (witchData.combatEngagement) inCombat++;

            totalThreat += witchData.threatLevel;

            Chat.log(`\n${witchData.name}:`);
            Chat.log(`  State: ${isDrinking ? "🧪 Drinking" : "⚔️ Ready to attack"}`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Health: ${witchData.entity.asLiving().getHealth().toFixed(1)}/${witchData.entity.asLiving().getMaxHealth().toFixed(1)}`);
            Chat.log(`  Threat Level: ${witchData.threatLevel.toFixed(0)}%`);
            Chat.log(`  Drinking Phases: ${witchData.drinkingPhases}`);
            Chat.log(`  Tracked for: ${trackingDuration.toFixed(1)}s`);
            Chat.log(`  Potions Used: ${witchData.potionHistory.length}`);

            if (witchData.potionHistory.length > 0) {
                const recentPotions = witchData.potionHistory.slice(-3);
                Chat.log(`  Recent Potions: ${recentPotions.map(p => p.potionName).join(", ")}`);
            }

            if (witchData.combatEngagement) {
                const combatDuration = (Client.getTime() - witchData.combatEngagement) / 20;
                Chat.log(`  In Combat: ${combatDuration.toFixed(1)}s`);
            }
        }

        // Summary
        Chat.log(`\n=== Summary ===`);
        Chat.log(`Drinking Witches: ${drinkingWitches}`);
        Chat.log(`Ready Witches: ${readyWitches}`);
        Chat.log(`In Combat: ${inCombat}`);
        Chat.log(`Average Threat Level: ${(totalThreat / this.activeWitches.size).toFixed(0)}%`);

        // Warnings
        if (readyWitches >= 2) {
            Chat.log(`\n&c🧪 CRITICAL: ${readyWitches} witches ready to attack!`);
        } else if (readyWitches >= 1) {
            Chat.log(`\n&e⚠️ WARNING: ${readyWitches} witch ready to attack!`);
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

        for (const [uuid, witchData] of this.activeWitches) {
            if (!witchData.entity.isAlive()) {
                const trackingDuration = (currentTime - witchData.firstSeen) / 20;
                Chat.log(`&7${witchData.name} eliminated after ${trackingDuration.toFixed(1)}s`);
                this.activeWitches.delete(uuid);
            } else {
                const distance = Player.getPlayer().distanceTo(witchData.entity);

                // Remove witches that are too far away (64+ blocks)
                if (distance > 64) {
                    Chat.log(`&7${witchData.name} moved out of tracking range`);
                    this.activeWitches.delete(uuid);
                }
            }
        }
    }
}

const witchMonitor = new WitchCombatMonitor();

// Monitor witches every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const trackingRange = 32; // Track witches within 32 blocks

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= trackingRange && entity.is("minecraft:witch")) {
            witchMonitor.updateWitch(entity);
        }
    });

    // Cleanup every 5 seconds
    if (Client.getTime() % 100 === 0) {
        witchMonitor.cleanup();
    }
}));

// Report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.w" && e.action === 1) { // W key
        witchMonitor.generateReport();
    }
}));
```

### Witch Potion Detection System
```js
// Advanced witch potion detection and analysis
class WitchPotionAnalyzer {
    constructor() {
        this.potionDatabase = new Map();
        this.witchBehaviors = new Map();
        this.combatPatterns = [];
    }

    analyzeWitchPotions(witchEntity) {
        const witch = witchEntity.as("minecraft:witch");
        if (!witch) return;

        const uuid = witchEntity.getUUID();
        const potion = witch.getPotion();
        const isDrinking = witch.isDrinkingPotion();
        const currentTime = Client.getTime();

        if (!this.witchBehaviors.has(uuid)) {
            this.witchBehaviors.set(uuid, {
                entity: witchEntity,
                name: witchEntity.getName().getString(),
                potionTimeline: [],
                drinkingTimeline: [],
                behaviorPatterns: [],
                combatEffectiveness: 0,
                potionPreference: new Map()
            });
        }

        const behavior = this.witchBehaviors.get(uuid);

        // Record potion states
        if (potion && !potion.isEmpty()) {
            const potionData = this.analyzePotion(potion);

            behavior.potionTimeline.push({
                potionData: potionData,
                timestamp: currentTime,
                isDrinking: isDrinking,
                distance: Player.getPlayer().distanceTo(witchEntity),
                health: witchEntity.asLiving().getHealth()
            });

            // Update potion preferences
            const currentCount = behavior.potionPreference.get(potionData.type) || 0;
            behavior.potionPreference.set(potionData.type, currentCount + 1);

            // Analyze the tactical situation
            this.analyzeTacticalSituation(behavior, potionData, isDrinking);
        }

        // Record drinking states
        behavior.drinkingTimeline.push({
            isDrinking: isDrinking,
            timestamp: currentTime,
            health: witchEntity.asLiving().getHealth()
        });

        // Keep only recent data (last 2 minutes)
        const cutoffTime = currentTime - 2400;
        behavior.potionTimeline = behavior.potionTimeline.filter(p => p.timestamp > cutoffTime);
        behavior.drinkingTimeline = behavior.drinkTimeline.filter(d => d.timestamp > cutoffTime);

        // Detect behavior patterns
        this.detectBehaviorPatterns(behavior);
    }

    analyzePotion(potion) {
        const potionId = potion.getItemId();
        const metadata = potion.getNBT();
        const name = potion.getName().getString();

        let potionType = "unknown";
        let effect = "unknown";
        let tacticalUse = "unknown";
        let threatLevel = 0;

        // Analyze potion ID to determine type and use
        if (potionId.includes("healing")) {
            potionType = "healing";
            effect = "restore_health";
            tacticalUse = "self_recovery";
            threatLevel = 60; // Medium threat - witch can recover
        } else if (potionId.includes("fire_resistance")) {
            potionType = "fire_resistance";
            effect = "fire_immunity";
            tacticalUse = "defensive";
            threatLevel = 70; // High threat - becomes immune to fire
        } else if (potionId.includes("swiftness")) {
            potionType = "swiftness";
            effect = "speed_boost";
            tacticalUse = "mobility";
            threatLevel = 80; // High threat - faster movement
        } else if (potionId.includes("poison")) {
            potionType = "poison";
            effect = "damage_over_time";
            tacticalUse = "offensive";
            threatLevel = 95; // Critical threat - poison attack
        } else if (potionId.includes("harming")) {
            potionType = "harming";
            effect = "instant_damage";
            tacticalUse = "offensive";
            threatLevel = 100; // Maximum threat - instant damage
        } else if (potionId.includes("slowness")) {
            potionType = "slowness";
            effect = "movement_reduction";
            tacticalUse = "offensive";
            threatLevel = 85; // High threat - mobility attack
        } else if (potionId.includes("weakness")) {
            potionType = "weakness";
            effect = "damage_reduction";
            tacticalUse = "offensive";
            threatLevel = 75; // High threat - reduces player damage
        } else {
            potionType = "unknown";
            threatLevel = 50; // Unknown threat level
        }

        return {
            name,
            potionId,
            type: potionType,
            effect: effect,
            tacticalUse: tacticalUse,
            threatLevel: threatLevel,
            isOffensive: tacticalUse === "offensive",
            isDefensive: tacticalUse === "defensive" || tacticalUse === "self_recovery",
            isSupport: tacticalUse === "mobility"
        };
    }

    analyzeTacticalSituation(behavior, potionData, isDrinking) {
        const distance = Player.getPlayer().distanceTo(behavior.entity);
        const health = behavior.entity.asLiving().getHealth();
        const maxHealth = behavior.entity.asLiving().getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;

        let tacticalAnalysis = {
            situation: "unknown",
            urgency: "normal",
            recommendation: "",
            playerAction: "",
            riskLevel: 0
        };

        if (potionData.isOffensive) {
            tacticalAnalysis.situation = "attack_preparation";
            tacticalAnalysis.urgency = distance < 12 ? "critical" : "high";
            tacticalAnalysis.riskLevel = potionData.threatLevel;

            if (distance < 8) {
                tacticalAnalysis.recommendation = "IMMEDIATE EVASION REQUIRED";
                tacticalAnalysis.playerAction = "Dodge sideways and seek cover";
            } else if (distance < 16) {
                tacticalAnalysis.recommendation = "PREPARE TO DODGE";
                tacticalAnalysis.playerAction = "Keep moving unpredictably";
            } else {
                tacticalAnalysis.recommendation = "MAINTAIN DISTANCE";
                tacticalAnalysis.playerAction = "Ready shield or ranged weapons";
            }
        } else if (potionData.isDefensive) {
            tacticalAnalysis.situation = "defense_preparation";
            tacticalAnalysis.urgency = isDrinking ? "high" : "normal";

            if (potionData.type === "healing") {
                tacticalAnalysis.recommendation = "PREVENT HEALING";
                tacticalAnalysis.playerAction = "Attack immediately to interrupt healing";
                tacticalAnalysis.riskLevel = 60;
            } else if (potionData.type === "fire_resistance") {
                tacticalAnalysis.recommendation = "SWITCH TACTICS";
                tacticalAnalysis.playerAction = "Use non-fire damage sources";
                tacticalAnalysis.riskLevel = 70;
            }
        } else if (potionData.isSupport) {
            tacticalAnalysis.situation = "mobility_preparation";
            tacticalAnalysis.urgency = distance > 16 ? "high" : "normal";
            tacticalAnalysis.recommendation = "COUNTER MOBILITY";
            tacticalAnalysis.playerAction = "Prepare for faster movement or retreat";
            tacticalAnalysis.riskLevel = 80;
        }

        // Send tactical alerts
        if (tacticalAnalysis.urgency === "critical") {
            this.sendTacticalAlert(behavior.name, tacticalAnalysis, "critical");
        } else if (tacticalAnalysis.urgency === "high") {
            this.sendTacticalAlert(behavior.name, tacticalAnalysis, "warning");
        }

        // Log analysis
        Chat.log(`&dTactical Analysis: ${behavior.name} with ${potionData.name}`);
        Chat.log(`  Situation: ${tacticalAnalysis.situation}`);
        Chat.log(`  Recommendation: ${tacticalAnalysis.recommendation}`);
        Chat.log(`  Risk Level: ${tacticalAnalysis.riskLevel}%`);

        return tacticalAnalysis;
    }

    sendTacticalAlert(witchName, analysis, level) {
        const prefixes = {
            "critical": "&4🚨 ",
            "warning": "&e⚠️ ",
            "normal": "&bℹ️ "
        };

        const prefix = prefixes[level] || prefixes.normal;
        const message = `${prefix}${witchName}: ${analysis.recommendation}`;

        Chat.actionbar(message);
        Chat.log(message);

        if (level === "critical") {
            Chat.log(`&6→ ${analysis.playerAction}`);
        }
    }

    detectBehaviorPatterns(behavior) {
        if (behavior.potionTimeline.length < 3) return; // Need more data

        // Analyze potion usage patterns
        const recentPotions = behavior.potionTimeline.slice(-5);
        const drinkingStates = behavior.drinkingTimeline.slice(-10);

        // Detect aggressive vs defensive patterns
        const offensivePotions = recentPotions.filter(p => p.potionData.isOffensive).length;
        const defensivePotions = recentPotions.filter(p => p.potionData.isDefensive).length;

        if (offensivePotions > defensivePotions * 2) {
            behavior.behaviorPatterns.push("aggressive_combat");
        } else if (defensivePotions > offensivePotions * 2) {
            behavior.behaviorPatterns.push("defensive_combat");
        } else {
            behavior.behaviorPatterns.push("balanced_combat");
        }

        // Detect drinking frequency patterns
        const drinkingTime = drinkingStates.filter(d => d.isDrinking).length;
        const drinkingFrequency = drinkingTime / drinkingStates.length;

        if (drinkingFrequency > 0.5) {
            behavior.behaviorPatterns.push("frequent_drinker");
        }

        // Keep only recent patterns
        behavior.behaviorPatterns = behavior.behaviorPatterns.slice(-5);
    }

    generateBehaviorReport() {
        if (this.witchBehaviors.size === 0) {
            Chat.log("No witch behavior data available");
            return;
        }

        Chat.log(`&6=== Witch Behavior Analysis Report ===`);

        for (const [uuid, behavior] of this.witchBehaviors) {
            const distance = Player.getPlayer().distanceTo(behavior.entity);
            const witch = behavior.entity.as("minecraft:witch");
            const isDrinking = witch.isDrinkingPotion();

            Chat.log(`\n${behavior.name}:`);
            Chat.log(`  Current State: ${isDrinking ? "🧪 Drinking" : "⚔️ Ready"}`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Total Potions Observed: ${behavior.potionTimeline.length}`);
            Chat.log(`  Drinking Phases: ${behavior.drinkingTimeline.filter(d => d.isDrinking).length}`);

            if (behavior.potionPreference.size > 0) {
                Chat.log(`  Potion Preferences:`);
                for (const [type, count] of behavior.potionPreference) {
                    Chat.log(`    ${type}: ${count} uses`);
                }
            }

            if (behavior.behaviorPatterns.length > 0) {
                Chat.log(`  Detected Patterns: ${behavior.behaviorPatterns.join(", ")}`);
            }

            // Provide tactical summary
            this.generateTacticalSummary(behavior);
        }
    }

    generateTacticalSummary(behavior) {
        const patterns = behavior.behaviorPatterns;
        const preferences = behavior.potionPreference;
        const witch = behavior.entity.as("minecraft:witch");
        const isDrinking = witch.isDrinkingPotion();

        Chat.log(`  Tactical Summary:`);

        if (patterns.includes("aggressive_combat")) {
            Chat.log("    &eThis witch is highly aggressive - expect frequent attacks");
            Chat.log("    → Maintain distance and use cover");
        } else if (patterns.includes("defensive_combat")) {
            Chat.log("    &aThis witch is defensive - opportunities for aggressive play");
            Chat.log("    → Attack during drinking phases");
        } else {
            Chat.log("    &6This witch uses balanced tactics - adaptable strategy needed");
            Chat.log("    → Watch for both offensive and defensive potions");
        }

        if (patterns.includes("frequent_drinker")) {
            Chat.log("    &dWitch drinks potions frequently");
            Chat.log("    → Many attack opportunities during drinking phases");
        }

        // Current tactical recommendation
        if (isDrinking) {
            Chat.log("    &aCURRENT: Perfect time to attack!");
        } else {
            const currentPotion = witch.getPotion();
            if (currentPotion && !currentPotion.isEmpty()) {
                const potionData = this.analyzePotion(currentPotion);
                if (potionData.isOffensive) {
                    Chat.log("    &cCURRENT: Witch preparing to attack - dodge!");
                } else if (potionData.isDefensive) {
                    Chat.log("    &eCURRENT: Witch preparing defense - act fast!");
                }
            }
        }
    }
}

const potionAnalyzer = new WitchPotionAnalyzer();

// Analyze witch potions every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const analysisRange = 24;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= analysisRange && entity.is("minecraft:witch")) {
            potionAnalyzer.analyzeWitchPotions(entity);
        }
    });
}));

// Behavior analysis command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.p" && e.action === 1) { // P key
        potionAnalyzer.generateBehaviorReport();
    }
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if witch is currently attacking
- `isAiDisabled()` - Check if witch's AI is disabled

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects (witches may have various potion effects)
- `getMainHand()`, `getOffHand()` - Equipment information (typically potions)
- `getArmor()` - Armor value (usually 0 for witches)
- `hasStatusEffect()` - Check for specific potion effects
- `isBaby()` - Check if witch is a baby variant

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- WitchEntityHelper is specifically designed for the complex potion-based combat mechanics of witches
- The `isDrinkingPotion()` method indicates vulnerability - witches cannot attack while drinking
- The `getPotion()` method helps predict upcoming attacks or defensive maneuvers
- Witches have sophisticated AI that selects potions based on the combat situation
- Drinking animations provide clear tactical opportunities for attack
- Witches can use multiple potion types: healing, fire resistance, swiftness, poison, slowness, and weakness
- Witches commonly spawn in swamps, witch huts, and during raids
- Consider environmental factors like water (where witches are particularly dangerous) and cover availability
- Witches are immune to instant damage from harming potions when drinking
- Fire resistance potions completely negate fire-based attacks against witches
- Witches prioritize healing potions when below 50% health
- Multiple witches in combat can coordinate attacks for devastating effect
- Poison potions bypass armor and provide damage over time
- This helper is essential for effective combat against one of Minecraft's tactically complex hostile mobs

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `ItemStackHelper` - For analyzing potion items and their properties
- `StatusEffectHelper` - For understanding potion effects on witches
- `PlayerEntityHelper` - For combat interactions and player-specific abilities
- `RaiderEntityHelper` - Since witches participate in raids

---

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive witch interaction
- Designed specifically for the complex potion-based combat scenarios involving witches
- Essential tool for effective witch combat timing and tactical decision-making