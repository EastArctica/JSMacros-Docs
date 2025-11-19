# VexEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.VexEntityHelper`

**Extends:** `MobEntityHelper<VexEntity>`

**Since:** JsMacros 1.8.4

Represents a vex entity in the world. VexEntityHelper provides access to vex-specific properties and behaviors, particularly their charging attack state. Vex are small, winged hostile mobs that summon by evokers and can fly through blocks to attack their targets with deadly speed.

Vex are formidable flying enemies that serve as minions to evokers during raids or in woodland mansions. These small, winged creatures wield iron swords and can move freely through blocks, making them particularly dangerous as they bypass conventional defenses. Their signature charging attack allows them to rapidly close distance to their targets, making traditional combat strategies less effective.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding vex-specific functionality for monitoring their charging behavior and attack patterns.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

VexEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`, `ProjectileHit`)
- World entity queries and type casting
- Methods that return vex entities
- Type casting from EntityHelper using `as("minecraft:vex")` or appropriate casting methods

---

## Methods

## Usage Examples

### Vex Attack Detection and Defense
```js
// Comprehensive vex threat detection and defense system
class VexDefenseMonitor {
    constructor() {
        this.activeVexes = new Map();
        this.alertCooldowns = new Map();
        this.chargePredictions = [];
        this.defenseRecommendations = new Map();
    }

    monitorVex(vexEntity) {
        const vex = vexEntity.as("minecraft:vex");
        if (!vex) return;

        const uuid = vexEntity.getUUID();
        const player = Player.getPlayer();
        const isCharging = vex.isCharging();
        const isAttacking = vex.isAttacking();
        const distance = player.distanceTo(vexEntity);
        const health = vexEntity.asLiving().getHealth();
        const maxHealth = vexEntity.asLiving().getMaxHealth();
        const pos = vexEntity.getPos();
        const currentTime = Client.getTime();

        // Store vex data
        if (!this.activeVexes.has(uuid)) {
            this.activeVexes.set(uuid, {
                entity: vexEntity,
                name: vexEntity.getName().getString(),
                firstSeen: currentTime,
                lastChargeState: isCharging,
                chargeHistory: [],
                attackCount: 0,
                lastPlayerDistance: distance,
                threatLevel: "UNKNOWN",
                chargeCount: 0,
                defenseInitiated: false
            });

            Chat.log(`&c⚡ Vex detected: ${vexEntity.getName().getString()}`);
            Chat.log(`  Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
        }

        const vexData = this.activeVexes.get(uuid);

        // Track charge state changes
        if (vexData.lastChargeState !== isCharging) {
            vexData.lastChargeState = isCharging;

            if (isCharging) {
                this.handleChargeStart(vexData, distance, currentTime);
            } else {
                this.handleChargeEnd(vexData, currentTime);
            }
        }

        // Track attack behavior
        if (isAttacking && !vexData.lastAttacking) {
            this.handleAttackStart(vexData, distance);
        } else if (!isAttacking && vexData.lastAttacking) {
            this.handleAttackEnd(vexData);
        }
        vexData.lastAttacking = isAttacking;

        // Update threat assessment
        this.updateThreatAssessment(vexData, isCharging, isAttacking, distance, health, maxHealth);

        // Provide real-time defense recommendations
        if (distance <= 16) {
            this.provideDefenseAssistance(vexData, isCharging, distance, pos);
        }

        // Track charge history
        vexData.chargeHistory.push({
            isCharging: isCharging,
            distance: distance,
            time: currentTime
        });

        // Clean old history (keep last 30 seconds)
        const cutoffTime = currentTime - 600;
        vexData.chargeHistory = vexData.chargeHistory.filter(entry => entry.time > cutoffTime);

        // Update distance tracking
        vexData.lastPlayerDistance = distance;
    }

    handleChargeStart(vexData, distance, currentTime) {
        vexData.chargeCount++;
        const urgency = distance <= 8 ? "IMMEDIATE" : distance <= 16 ? "URGENT" : "MONITOR";

        Chat.log(`&c⚡ ${vexData.name} STARTED CHARGING!`);
        Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
        Chat.log(`  Urgency: ${urgency}`);
        Chat.log(`  Charge count: ${vexData.chargeCount}`);

        // Predict charge trajectory and impact
        this.predictChargeImpact(vexData, distance);

        // Send immediate alert based on distance
        if (distance <= 8) {
            this.sendCriticalAlert("VEX CHARGE - IMMEDIATE DODGE REQUIRED!", "critical");
        } else if (distance <= 16) {
            this.sendCriticalAlert("Vex charging incoming - prepare evasion!", "danger");
        } else {
            this.sendCriticalAlert("Vex charge detected - monitor approach", "warning");
        }

        // Activate defense systems
        this.activateDefenseProtocol(vexData, distance);
    }

    handleChargeEnd(vexData, currentTime) {
        Chat.log(`&a✅ ${vexData.name} charge completed`);
        Chat.log(`  Charge duration: ${((currentTime - vexData.chargeStartTime) / 20).toFixed(1)}s`);

        // Check if player needs to counter-attack
        const distance = Player.getPlayer().distanceTo(vexData.entity);
        if (distance <= 6) {
            Chat.log(`  &e⚔️ Counter-attack opportunity - vex is close!`);
        }

        // Reset defense state
        vexData.defenseInitiated = false;
    }

    handleAttackStart(vexData, distance) {
        vexData.attackCount++;
        Chat.log(`&c⚔️ ${vexData.name} started attacking (attack #${vexData.attackCount})`);

        if (distance <= 4) {
            Chat.log(`  &c💀 POINT BLANK ATTACK - Extreme danger!`);
            this.sendCriticalAlert("VEX MELEE ATTACK - BLOCK OR DODGE!", "critical");
        }
    }

    handleAttackEnd(vexData) {
        Chat.log(`&a${vexData.name} attack completed`);

        // Suggest counter-attack window
        const distance = Player.getPlayer().distanceTo(vexData.entity);
        if (distance <= 6 && distance > 2) {
            Chat.log(`  ⚔️ Counter-attack window - vex is in optimal range!`);
        }
    }

    predictChargeImpact(vexData, distance) {
        const chargeSpeed = 8.0; // Vex charge speed in blocks/second (approximate)
        const timeToImpact = distance / chargeSpeed;

        Chat.log(`&6⏱️ Charge impact prediction: ${timeToImpact.toFixed(1)} seconds`);

        if (timeToImpact <= 0.5) {
            Chat.log(`  &c💀 IMPACT IMMINENT - No time to evade!`);
            this.scheduleImmediateDefense();
        } else if (timeToImpact <= 1.0) {
            Chat.log(`  &e⚠️ Limited time - Immediate evasive action required!`);
            this.scheduleUrgentDefense(timeToImpact);
        } else {
            Chat.log(`  &b💡 Time available - Prepare defense strategy`);
            this.scheduleStrategicDefense(timeToImpact);
        }

        vexData.chargeStartTime = Client.getTime();
    }

    activateDefenseProtocol(vexData, distance) {
        if (vexData.defenseInitiated) return;

        vexData.defenseInitiated = true;

        Chat.log(`&b🛡️ Activating defense protocol against ${vexData.name}`);

        // Provide specific defense recommendations based on distance
        if (distance <= 6) {
            this.provideImmediateDefense(vexData);
        } else if (distance <= 12) {
            this.provideTacticalDefense(vexData);
        } else {
            this.provideStrategicDefense(vexData);
        }
    }

    provideImmediateDefense(vexData) {
        Chat.log(`&c🚨 IMMEDIATE DEFENSE ACTIONS:`);
        Chat.log(`  → Shield block NOW if available`);
        Chat.log(`  → Jump backward to create distance`);
        Chat.log(`  → Use knockback weapons if possible`);
        Chat.log(`  → Activate defensive items (totems, potions)`);

        this.scheduleImmediateDefense();
    }

    provideTacticalDefense(vexData) {
        Chat.log(`&e🎯 TACTICAL DEFENSE:`);
        Chat.log(`  → Move perpendicular to charge direction`);
        Chat.log(`  → Prepare shield for incoming attack`);
        Chat.log(`  → Consider attack during recovery window`);
        Chat.log(`  → Use environmental obstacles as cover`);

        this.scheduleUrgentDefense(1.5);
    }

    provideStrategicDefense(vexData) {
        Chat.log(`&b💡 STRATEGIC DEFENSE:`);
        Chat.log(`  → Identify optimal evasion path`);
        Chat.log(`  → Prepare weapons for counter-attack`);
        Chat.log(`  → Create barriers if possible`);
        Chat.log(`  → Use elevation to advantage`);

        this.scheduleStrategicDefense(2.0);
    }

    scheduleImmediateDefense() {
        setTimeout(() => {
            Chat.actionbar("&c🛡️ SHIELD NOW - Block incoming charge!");
        }, 100);
    }

    scheduleUrgentDefense(timeToImpact) {
        const warningTime = Math.max(100, (timeToImpact - 0.5) * 1000);

        setTimeout(() => {
            Chat.actionbar("&e⚡ PREPARE EVASION - Charge incoming!");
        }, warningTime);
    }

    scheduleStrategicDefense(timeToImpact) {
        const warningTime = Math.max(100, (timeToImpact - 1.0) * 1000);

        setTimeout(() => {
            Chat.actionbar("&b🎯 Ready defenses - Vex approaching!");
        }, warningTime);
    }

    updateThreatAssessment(vexData, isCharging, isAttacking, distance, health, maxHealth) {
        let threatScore = 0;

        // Base threat by distance
        if (distance <= 4) threatScore += 40;
        else if (distance <= 8) threatScore += 30;
        else if (distance <= 16) threatScore += 20;
        else if (distance <= 24) threatScore += 10;

        // Combat state threat
        if (isCharging) threatScore += 35;
        if (isAttacking) threatScore += 25;

        // Health threat (healthier vexes are more dangerous)
        const healthPercent = (health / maxHealth) * 100;
        threatScore += healthPercent * 0.2;

        // Multiple charge threat
        if (vexData.chargeCount >= 3) threatScore += 20;
        else if (vexData.chargeCount >= 2) threatScore += 10;

        // Update threat level
        let newThreatLevel;
        if (threatScore >= 80) newThreatLevel = "CRITICAL";
        else if (threatScore >= 60) newThreatLevel = "HIGH";
        else if (threatScore >= 40) newThreatLevel = "MEDIUM";
        else if (threatScore >= 20) newThreatLevel = "LOW";
        else newThreatLevel = "MINIMAL";

        if (newThreatLevel !== vexData.threatLevel) {
            const oldLevel = vexData.threatLevel;
            vexData.threatLevel = newThreatLevel;

            Chat.log(`&6${vexData.name} threat level: ${oldLevel} → ${newThreatLevel} (${threatScore.toFixed(0)}%)`);

            if (newThreatLevel === "CRITICAL") {
                this.sendCriticalAlert("CRITICAL THREAT LEVEL - Maximum defense required!", "critical");
            }
        }
    }

    provideDefenseAssistance(vexData, isCharging, distance, vexPos) {
        const playerPos = Player.getPlayer().getPos();

        // Calculate optimal evasion direction
        const evasionVector = this.calculateOptimalEvasion(vexPos, playerPos, isCharging);

        if (isCharging && distance <= 12) {
            const urgency = distance <= 6 ? "IMMEDIATE" : "URGENT";
            Chat.actionbar(`&c${urgency} EVASION: Move ${evasionVector.direction}`);
        }

        // Environmental defense suggestions
        this.analyzeEnvironmentalDefenses(vexPos, playerPos, distance);

        // Combat recommendations
        if (!isCharging && distance <= 8) {
            this.provideCombatOpportunity(vexData, distance);
        }
    }

    calculateOptimalEvasion(vexPos, playerPos, isCharging) {
        // Calculate vector from vex to player
        const vexToPlayer = {
            x: playerPos.x - vexPos.x,
            y: playerPos.y - vexPos.y,
            z: playerPos.z - vexPos.z
        };

        // Normalize and get perpendicular directions for evasion
        const length = Math.sqrt(vexToPlayer.x * vexToPlayer.x + vexToPlayer.z * vexToPlayer.z);

        if (length > 0) {
            // Perpendicular vectors (90 degrees to attack direction)
            const perp1 = {
                x: -vexToPlayer.z / length,
                z: vexToPlayer.x / length
            };

            const perp2 = {
                x: vexToPlayer.z / length,
                z: -vexToPlayer.x / length
            };

            // Choose best evasion direction based on available space
            const bestDirection = this.selectBestEvasionDirection(playerPos, perp1, perp2);

            return {
                direction: bestDirection,
                vector: bestDirection === "left" ? perp1 : perp2
            };
        }

        return { direction: "away", vector: { x: 0, z: 1 } };
    }

    selectBestEvasionDirection(playerPos, dir1, dir2) {
        // Simple heuristic - check which direction has more open space
        const checkDistance = 3;

        let dir1Clear = true;
        let dir2Clear = true;

        for (let i = 1; i <= checkDistance; i++) {
            const pos1 = World.getBlock(
                Math.floor(playerPos.x + dir1.x * i),
                Math.floor(playerPos.y),
                Math.floor(playerPos.z + dir1.z * i)
            );

            const pos2 = World.getBlock(
                Math.floor(playerPos.x + dir2.x * i),
                Math.floor(playerPos.y),
                Math.floor(playerPos.z + dir2.z * i)
            );

            if (pos1 && !pos1.getBlockState().isAir()) dir1Clear = false;
            if (pos2 && !pos2.getBlockState().isAir()) dir2Clear = false;
        }

        if (dir1Clear && !dir2Clear) return "left";
        if (!dir1Clear && dir2Clear) return "right";
        if (dir1Clear && dir2Clear) return Math.random() > 0.5 ? "left" : "right";
        return "away";
    }

    analyzeEnvironmentalDefenses(vexPos, playerPos, distance) {
        // Check for barriers and cover
        const barriers = this.findNearbyBarriers(playerPos, 8);

        if (barriers.length > 0) {
            Chat.log(`&a🛡️ Environmental defenses available:`);
            barriers.forEach(barrier => {
                const barrierDistance = Math.sqrt(
                    Math.pow(barrier.x - playerPos.x, 2) +
                    Math.pow(barrier.z - playerPos.z, 2)
                );
                Chat.log(`  • Barrier at [${barrier.x}, ${barrier.y}, ${barrier.z}] (${barrierDistance.toFixed(1)}m)`);
            });
        } else {
            Chat.log(`&e⚠️ No immediate barriers detected - rely on evasion`);
        }

        // Check for water (slows vexes slightly)
        const nearbyWater = this.findNearbyWater(playerPos, 6);
        if (nearbyWater) {
            Chat.log(`&6💧 Water nearby - can slow vex movement`);
        }
    }

    findNearbyBarriers(pos, radius) {
        const barriers = [];

        for (let x = -radius; x <= radius; x += 2) {
            for (let z = -radius; z <= radius; z += 2) {
                for (let y = -1; y <= 3; y++) {
                    const checkX = Math.floor(pos.x + x);
                    const checkY = Math.floor(pos.y + y);
                    const checkZ = Math.floor(pos.z + z);

                    const block = World.getBlock(checkX, checkY, checkZ);
                    if (block && !block.getBlockState().isAir() &&
                        !block.getBlockState().getBlock().getTranslationKey().includes("water")) {
                        barriers.push({ x: checkX, y: checkY, z: checkZ });
                    }
                }
            }
        }

        return barriers;
    }

    findNearbyWater(pos, radius) {
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                const block = World.getBlock(
                    Math.floor(pos.x + x),
                    Math.floor(pos.y),
                    Math.floor(pos.z + z)
                );

                if (block && block.getBlockState().getBlock().getTranslationKey().includes("water")) {
                    return true;
                }
            }
        }
        return false;
    }

    provideCombatOpportunity(vexData, distance) {
        Chat.log(`&a⚔️ Combat opportunity detected:`);
        Chat.log(`  • Vex is not charging - optimal attack window`);
        Chat.log(`  • Distance: ${distance.toFixed(1)} blocks (good range)`);
        Chat.log(`  • Health: ${vexData.entity.asLiving().getHealth().toFixed(1)}/${vexData.entity.asLiving().getMaxHealth().toFixed(1)}`);

        if (distance <= 4) {
            Chat.log(`  &c💀 Point blank range - high risk, high reward`);
        } else if (distance <= 8) {
            Chat.log(`  &e🎯 Optimal combat range - balanced risk/reward`);
        }
    }

    sendCriticalAlert(message, type) {
        const currentTime = Client.getTime();
        const alertKey = `vex_critical_${type}`;
        const lastAlert = this.alertCooldowns.get(alertKey) || 0;

        if (currentTime - lastAlert < 30) return; // 1.5 second cooldown

        const prefix = {
            "critical": "&c💀 ",
            "danger": "&4⚔️ ",
            "warning": "&e⚠️ "
        }[type] || "&bℹ️ ";

        Chat.actionbar(`${prefix}${message}`);
        this.alertCooldowns.set(alertKey, currentTime);

        // Title for critical alerts
        if (type === "critical") {
            Chat.title(prefix + "VEX THREAT", message, 0, 1, 0);
        }
    }

    generateReport() {
        if (this.activeVexes.size === 0) {
            Chat.log("No vex data available");
            return;
        }

        Chat.log(`&6=== Vex Defense Report ===`);

        let totalCharges = 0;
        let criticalThreats = 0;
        let activeCombat = 0;

        for (const [uuid, vexData] of this.activeVexes) {
            const currentVex = vexData.entity.as("minecraft:vex");
            const isCharging = currentVex.isCharging();
            const isAttacking = currentVex.isAttacking();
            const distance = Player.getPlayer().distanceTo(vexData.entity);

            if (isCharging || isAttacking) activeCombat++;
            if (vexData.threatLevel === "CRITICAL") criticalThreats++;
            totalCharges += vexData.chargeCount;

            Chat.log(`\n${vexData.name}:`);
            Chat.log(`  Current State: ${isCharging ? "⚡ Charging" : isAttacking ? "⚔️ Attacking" : "😌 Idle"}`);
            Chat.log(`  Threat Level: ${vexData.threatLevel}`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Total Charges: ${vexData.chargeCount}`);
            Chat.log(`  Total Attacks: ${vexData.attackCount}`);
        }

        Chat.log(`\n=== Summary ===`);
        Chat.log(`Active Vexes: ${this.activeVexes.size}`);
        Chat.log(`Currently Charging: ${Array.from(this.activeVexes.values()).filter(v => v.entity.as("minecraft:vex").isCharging()).length}`);
        Chat.log(`In Combat: ${activeCombat}`);
        Chat.log(`Critical Threats: ${criticalThreats}`);
        Chat.log(`Total Charges Detected: ${totalCharges}`);

        if (criticalThreats > 0) {
            Chat.log(`\n&c🚨 CRITICAL: ${criticalThreats} vexes pose immediate threats!`);
        }
    }
}

const vexDefenseMonitor = new VexDefenseMonitor();

// Monitor vexes every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const monitoringRange = 32;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= monitoringRange && entity.is("minecraft:vex")) {
            vexDefenseMonitor.monitorVex(entity);
        }
    });
}));

// Defense report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.v" && e.action === 1) { // V key
        vexDefenseMonitor.generateReport();
    }
}));
```

### Vex Tracking and Analysis
```js
// Track vex behavior patterns and charge statistics
class VexBehaviorAnalyzer {
    constructor() {
        this.vexStats = new Map();
        this.globalStats = {
            totalVexesSeen: 0,
            totalCharges: 0,
            totalAttacks: 0,
            chargesPerVex: [],
            attackPatterns: new Map()
        };
    }

    analyzeVexBehavior(vexEntity) {
        const vex = vexEntity.as("minecraft:vex");
        if (!vex) return;

        const uuid = vexEntity.getUUID();
        const isCharging = vex.isCharging();
        const isAttacking = vex.isAttacking();
        const currentTime = Client.getTime();

        if (!this.vexStats.has(uuid)) {
            this.vexStats.set(uuid, {
                entity: vexEntity,
                name: vexEntity.getName().getString(),
                firstSeen: currentTime,
                lastChargeState: false,
                lastAttackState: false,
                chargeStartTime: null,
                totalChargeTime: 0,
                chargeCount: 0,
                attackCount: 0,
                chargeDurations: [],
                attackTimestamps: [],
                maxChargeDistance: 0,
                behaviors: []
            });

            this.globalStats.totalVexesSeen++;
            Chat.log(`&6📊 Started tracking vex: ${vexEntity.getName().getString()}`);
        }

        const stats = this.vexStats.get(uuid);

        // Track charging behavior
        if (isCharging && !stats.lastChargeState) {
            // Charge started
            stats.chargeCount++;
            stats.chargeStartTime = currentTime;
            this.globalStats.totalCharges++;

            const distance = Player.getPlayer().distanceTo(vexEntity);
            stats.maxChargeDistance = Math.max(stats.maxChargeDistance, distance);

            Chat.log(`&e⚡ Vex ${stats.name} started charging (charge #${stats.chargeCount})`);

        } else if (!isCharging && stats.lastChargeState && stats.chargeStartTime) {
            // Charge ended
            const chargeDuration = currentTime - stats.chargeStartTime;
            stats.chargeDurations.push(chargeDuration);
            stats.totalChargeTime += chargeDuration;

            Chat.log(`&a✅ Vex ${stats.name} stopped charging (duration: ${(chargeDuration/20).toFixed(1)}s)`);
        }

        // Track attacking behavior
        if (isAttacking && !stats.lastAttackState) {
            stats.attackCount++;
            stats.attackTimestamps.push(currentTime);
            this.globalStats.totalAttacks++;

            Chat.log(`&c⚔️ Vex ${stats.name} attacked (attack #${stats.attackCount})`);
        }

        // Record behavior state
        stats.behaviors.push({
            timestamp: currentTime,
            isCharging: isCharging,
            isAttacking: isAttacking,
            health: vexEntity.asLiving().getHealth(),
            distance: Player.getPlayer().distanceTo(vexEntity)
        });

        // Clean old behaviors (keep last 2 minutes)
        const cutoffTime = currentTime - 2400;
        stats.behaviors = stats.behaviors.filter(b => b.timestamp > cutoffTime);

        stats.lastChargeState = isCharging;
        stats.lastAttackState = isAttacking;
    }

    generateBehaviorReport() {
        if (this.vexStats.size === 0) {
            Chat.log("No vex behavior data available");
            return;
        }

        Chat.log(`&6=== Vex Behavior Analysis ===`);

        let totalChargeTime = 0;
        let totalChargeDuration = 0;
        let vexWithCharges = 0;
        let vexWithAttacks = 0;

        for (const [uuid, stats] of this.vexStats) {
            const avgChargeDuration = stats.chargeDurations.length > 0 ?
                stats.chargeDurations.reduce((a, b) => a + b, 0) / stats.chargeDurations.length : 0;

            const chargePercentage = stats.chargeCount > 0 ?
                (stats.totalChargeTime / (Client.getTime() - stats.firstSeen)) * 100 : 0;

            Chat.log(`\n${stats.name}:`);
            Chat.log(`  Tracked for: ${((Client.getTime() - stats.firstSeen) / 20).toFixed(1)}s`);
            Chat.log(`  Total charges: ${stats.chargeCount}`);
            Chat.log(`  Total attacks: ${stats.attackCount}`);
            Chat.log(`  Average charge duration: ${(avgChargeDuration/20).toFixed(1)}s`);
            Chat.log(`  Charge percentage: ${chargePercentage.toFixed(1)}%`);
            Chat.log(`  Max charge distance: ${stats.maxChargeDistance.toFixed(1)} blocks`);
            Chat.log(`  Current health: ${stats.entity.asLiving().getHealth().toFixed(1)}/${stats.entity.asLiving().getMaxHealth().toFixed(1)}`);

            if (stats.chargeCount > 0) vexWithCharges++;
            if (stats.attackCount > 0) vexWithAttacks++;

            totalChargeTime += stats.totalChargeTime;
            totalChargeDuration += avgChargeDuration;
        }

        Chat.log(`\n=== Global Statistics ===`);
        Chat.log(`Total vexes tracked: ${this.globalStats.totalVexesSeen}`);
        Chat.log(`Currently tracking: ${this.vexStats.size}`);
        Chat.log(`Vexes that charged: ${vexWithCharges}/${this.vexStats.size} (${((vexWithCharges/this.vexStats.size)*100).toFixed(1)}%)`);
        Chat.log(`Vexes that attacked: ${vexWithAttacks}/${this.vexStats.size} (${((vexWithAttacks/this.vexStats.size)*100).toFixed(1)}%)`);
        Chat.log(`Total charges detected: ${this.globalStats.totalCharges}`);
        Chat.log(`Total attacks detected: ${this.globalStats.totalAttacks}`);
        Chat.log(`Average charge duration: ${this.vexStats.size > 0 ? (totalChargeDuration/this.vexStats.size/20).toFixed(1) : 0}s`);
        Chat.log(`Total charging time: ${(totalChargeTime/20).toFixed(1)}s`);

        // Behavioral patterns
        this.analyzeBehaviorPatterns();
    }

    analyzeBehaviorPatterns() {
        Chat.log(`\n=== Behavioral Patterns ===`);

        const chargeFrequencies = [];
        const attackFrequencies = [];

        for (const stats of this.vexStats.values()) {
            const trackingDuration = (Client.getTime() - stats.firstSeen) / 20; // seconds
            if (trackingDuration > 0) {
                chargeFrequencies.push(stats.chargeCount / trackingDuration * 60); // charges per minute
                attackFrequencies.push(stats.attackCount / trackingDuration * 60); // attacks per minute
            }
        }

        if (chargeFrequencies.length > 0) {
            const avgChargeFreq = chargeFrequencies.reduce((a, b) => a + b, 0) / chargeFrequencies.length;
            const avgAttackFreq = attackFrequencies.reduce((a, b) => a + b, 0) / attackFrequencies.length;

            Chat.log(`Average charge frequency: ${avgChargeFreq.toFixed(1)} charges/minute`);
            Chat.log(`Average attack frequency: ${avgAttackFreq.toFixed(1)} attacks/minute`);

            // Classify behavior patterns
            const aggressiveVexes = chargeFrequencies.filter(f => f > avgChargeFreq * 1.5).length;
            const passiveVexes = chargeFrequencies.filter(f => f < avgChargeFreq * 0.5).length;

            Chat.log(`Highly aggressive vexes: ${aggressiveVexes}/${chargeFrequencies.length}`);
            Chat.log(`Passive vexes: ${passiveVexes}/${chargeFrequencies.length}`);

            if (aggressiveVexes > chargeFrequencies.length * 0.3) {
                Chat.log(`&c⚠️ High aggression detected - multiple vexes are extremely aggressive`);
            }
        }
    }
}

const vexAnalyzer = new VexBehaviorAnalyzer();

// Analyze vexes every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const analysisRange = 32;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= analysisRange && entity.is("minecraft:vex")) {
            vexAnalyzer.analyzeVexBehavior(entity);
        }
    });
}));

// Analysis report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.b" && e.action === 1) { // B key
        vexAnalyzer.generateBehaviorReport();
    }
}));
```

### Vex Charge Countermeasure
```js
// Advanced vex charge detection and countermeasure system
class VexChargeCountermeasure {
    constructor() {
        this.chargeWarnings = new Map();
        this.countermeasures = [];
        this.evasionHistory = [];
        this.successfulDodges = 0;
        this.chargeHits = 0;
    }

    detectAndCounterCharge(vexEntity) {
        const vex = vexEntity.as("minecraft:vex");
        if (!vex) return;

        const uuid = vexEntity.getUUID();
        const isCharging = vex.isCharging();
        const distance = Player.getPlayer().distanceTo(vexEntity);
        const currentTime = Client.getTime();

        if (!this.chargeWarnings.has(uuid)) {
            this.chargeWarnings.set(uuid, {
                lastChargeState: false,
                chargeStartTime: null,
                evasionTriggered: false,
                predictedImpact: null,
                countermeasureActive: false
            });
        }

        const warning = this.chargeWarnings.get(uuid);

        // Detect charge start
        if (isCharging && !warning.lastChargeState) {
            this.initiateCountermeasure(vexEntity, distance);
            warning.chargeStartTime = currentTime;
            warning.lastChargeState = true;

        } else if (!isCharging && warning.lastChargeState) {
            // Charge ended
            this.evaluateCountermeasureSuccess(uuid, distance);
            warning.lastChargeState = false;
            warning.evasionTriggered = false;
            warning.countermeasureActive = false;
        }

        // Update countermeasure if active
        if (warning.countermeasureActive && isCharging) {
            this.updateCountermeasure(vexEntity, distance, currentTime);
        }
    }

    initiateCountermeasure(vexEntity, distance) {
        const uuid = vexEntity.getUUID();
        const warning = this.chargeWarnings.get(uuid);
        const vexPos = vexEntity.getPos();
        const playerPos = Player.getPlayer().getPos();

        Chat.log(`&c🚨 INITIATING COUNTERMEASURE against ${vexEntity.getName().getString()}`);
        Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);

        // Calculate charge trajectory and optimal evasion
        const evasionPlan = this.calculateEvasionPlan(vexPos, playerPos, distance);

        // Set predicted impact time and position
        const chargeSpeed = 8.0; // blocks per second
        const timeToImpact = distance / chargeSpeed;

        warning.predictedImpact = {
            time: Client.getTime() + (timeToImpact * 20), // convert to ticks
            position: this.predictChargeImpactPosition(vexPos, playerPos, timeToImpact),
            evasionPlan: evasionPlan
        };

        warning.countermeasureActive = true;

        Chat.log(`  Predicted impact: ${timeToImpact.toFixed(1)}s`);
        Chat.log(`  Evasion strategy: ${evasionPlan.type}`);

        // Execute countermeasure based on urgency
        if (timeToImpact <= 0.8) {
            this.executeEmergencyEvasion(evasionPlan);
        } else if (timeToImpact <= 1.5) {
            this.executeTacticalEvasion(evasionPlan, timeToImpact);
        } else {
            this.executeStrategicEvasion(evasionPlan, timeToImpact);
        }
    }

    calculateEvasionPlan(vexPos, playerPos, distance) {
        const vexToPlayer = {
            x: playerPos.x - vexPos.x,
            z: playerPos.z - vexPos.z
        };

        const angle = Math.atan2(vexToPlayer.z, vexToPlayer.x);
        const distance = Math.sqrt(vexToPlayer.x * vexToPlayer.x + vexToPlayer.z * vexToPlayer.z);

        // Multiple evasion strategies based on distance and environment
        const strategies = [];

        // Perpendicular evasion (most reliable)
        strategies.push({
            type: "PERPENDICULAR",
            direction: {
                x: -Math.sin(angle),
                z: Math.cos(angle)
            },
            reliability: 0.85
        });

        // Diagonal evasion
        strategies.push({
            type: "DIAGONAL",
            direction: {
                x: -Math.sin(angle) * 0.7 + Math.cos(angle) * 0.3,
                z: Math.cos(angle) * 0.7 - Math.sin(angle) * 0.3
            },
            reliability: 0.70
        });

        // Vertical evasion (jump)
        strategies.push({
            type: "VERTICAL",
            direction: { x: 0, z: 0 },
            reliability: 0.60
        });

        // Choose best strategy based on environment
        const bestStrategy = this.selectOptimalStrategy(playerPos, strategies, distance);

        return bestStrategy;
    }

    selectOptimalStrategy(playerPos, strategies, distance) {
        // Evaluate each strategy based on available space and obstacles
        let bestStrategy = strategies[0];
        let bestScore = 0;

        for (const strategy of strategies) {
            let score = strategy.reliability * 100;

            // Check for obstacles in evasion direction
            if (strategy.type !== "VERTICAL") {
                const clearPath = this.checkEvasionPath(playerPos, strategy.direction, distance);
                score += clearPath ? 20 : -30;
            }

            // Distance-based scoring
            if (distance <= 4) {
                // Close range - prefer vertical (jump)
                if (strategy.type === "VERTICAL") score += 30;
            } else if (distance <= 10) {
                // Medium range - prefer perpendicular
                if (strategy.type === "PERPENDICULAR") score += 20;
            }

            if (score > bestScore) {
                bestScore = score;
                bestStrategy = strategy;
            }
        }

        return bestStrategy;
    }

    checkEvasionPath(pos, direction, distance) {
        const checkDistance = Math.min(distance, 5);

        for (let i = 1; i <= checkDistance; i++) {
            const checkX = Math.floor(pos.x + direction.x * i);
            const checkZ = Math.floor(pos.z + direction.z * i);
            const checkY = Math.floor(pos.y);

            const block = World.getBlock(checkX, checkY, checkZ);
            if (block && !block.getBlockState().isAir()) {
                return false; // Obstacle detected
            }
        }

        return true; // Path is clear
    }

    predictChargeImpactPosition(vexPos, playerPos, timeToImpact) {
        // Predict where the vex will be at impact time
        // This is a simplified prediction - in reality, vex pathfinding is complex

        const vexToPlayer = {
            x: playerPos.x - vexPos.x,
            y: playerPos.y - vexPos.y,
            z: playerPos.z - vexPos.z
        };

        const distance = Math.sqrt(
            vexToPlayer.x * vexToPlayer.x +
            vexToPlayer.y * vexToPlayer.y +
            vexToPlayer.z * vexToPlayer.z
        );

        const chargeDistance = Math.min(8.0 * timeToImpact, distance); // vex max speed ~8 blocks/s

        const normalized = {
            x: vexToPlayer.x / distance,
            y: vexToPlayer.y / distance,
            z: vexToPlayer.z / distance
        };

        return {
            x: vexPos.x + normalized.x * chargeDistance,
            y: vexPos.y + normalized.y * chargeDistance,
            z: vexPos.z + normalized.z * chargeDistance
        };
    }

    executeEmergencyEvasion(evasionPlan) {
        Chat.actionbar("&c💀 EMERGENCY EVASION - EXECUTING NOW!");

        if (evasionPlan.type === "VERTICAL") {
            // Immediate jump
            Chat.actionbar("&6⬆️ JUMP NOW!");
            // Note: Actual jump execution would require player movement APIs
        } else {
            // Immediate lateral movement
            const direction = evasionPlan.direction.x > 0 ? "RIGHT" : "LEFT";
            Chat.actionbar(`&c⬅️ STRAFE ${direction} NOW!`);
        }

        this.recordEvasionAttempt("EMERGENCY", evasionPlan.type);
    }

    executeTacticalEvasion(evasionPlan, timeToImpact) {
        const evasionDelay = (timeToImpact - 0.5) * 1000; // Evade 0.5s before impact

        setTimeout(() => {
            Chat.actionbar(`&e⚡ TACTICAL EVASION - ${evasionPlan.type} maneuver!`);

            if (evasionPlan.type === "VERTICAL") {
                Chat.actionbar("&6🦘 TIMED JUMP");
            } else {
                const direction = evasionPlan.direction.x > 0 ? "RIGHT" : "LEFT";
                Chat.actionbar(`&e➡️ TIMED STRAFE ${direction}`);
            }

            this.recordEvasionAttempt("TACTICAL", evasionPlan.type);
        }, evasionDelay);
    }

    executeStrategicEvasion(evasionPlan, timeToImpact) {
        const evasionDelay = (timeToImpact - 1.0) * 1000; // Evade 1s before impact

        setTimeout(() => {
            Chat.actionbar(`&b💡 STRATEGIC EVASION - ${evasionPlan.type} approach`);

            // Additional preparation time for strategic positioning
            setTimeout(() => {
                if (evasionPlan.type === "VERTICAL") {
                    Chat.actionbar("&6🎯 PREPARE JUMP POSITION");
                } else {
                    Chat.actionbar("&b🎯 PREPARE EVASION PATH");
                }
            }, 200);

            this.recordEvasionAttempt("STRATEGIC", evasionPlan.type);
        }, evasionDelay);
    }

    updateCountermeasure(vexEntity, distance, currentTime) {
        const uuid = vexEntity.getUUID();
        const warning = this.chargeWarnings.get(uuid);

        if (!warning.predictedImpact) return;

        const timeToImpact = (warning.predictedImpact.time - currentTime) / 20;

        // Update warnings as impact approaches
        if (timeToImpact <= 0.5 && !warning.evasionTriggered) {
            Chat.actionbar("&c⚠️ IMPACT IMMINENT - EVASION REQUIRED!");
            warning.evasionTriggered = true;
        } else if (timeToImpact <= 1.0 && timeToImpact > 0.5) {
            Chat.actionbar(`&e⚡ Charge impact in ${timeToImpact.toFixed(1)}s`);
        }
    }

    evaluateCountermeasureSuccess(uuid, distance) {
        const warning = this.chargeWarnings.get(uuid);

        if (!warning.predictedImpact) return;

        const actualTimeToImpact = Client.getTime() - warning.chargeStartTime;
        const predictedTimeToImpact = (warning.predictedImpact.time - warning.chargeStartTime) / 20;

        // Check if player was hit (simplified check)
        const wasHit = distance <= 2;

        if (wasHit) {
            this.chargeHits++;
            Chat.log(`&c💀 Vex charge HIT - Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Actual time: ${actualTimeToImpact/20}s, Predicted: ${predictedTimeToImpact.toFixed(1)}s`);
        } else {
            this.successfulDodges++;
            Chat.log(`&a✅ Vex charge DODGED successfully!`);
            Chat.log(`  Distance at end: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Evasion type: ${warning.predictedImpact.evasionPlan.type}`);

            this.recordEvasionSuccess(warning.predictedImpact.evasionPlan.type);
        }
    }

    recordEvasionAttempt(urgency, strategy) {
        this.evasionHistory.push({
            timestamp: Client.getTime(),
            urgency: urgency,
            strategy: strategy,
            success: null // Will be determined later
        });
    }

    recordEvasionSuccess(strategy) {
        const lastAttempt = this.evasionHistory
            .reverse()
            .find(attempt => attempt.strategy === strategy && attempt.success === null);

        if (lastAttempt) {
            lastAttempt.success = true;
        }
    }

    generateCountermeasureReport() {
        Chat.log(`&6=== Vex Countermeasure Report ===`);

        const totalCharges = this.successfulDodges + this.chargeHits;
        const dodgeRate = totalCharges > 0 ? (this.successfulDodges / totalCharges) * 100 : 0;

        Chat.log(`Total charges encountered: ${totalCharges}`);
        Chat.log(`Successful dodges: ${this.successfulDodges}`);
        Chat.log(`Hits taken: ${this.chargeHits}`);
        Chat.log(`Dodge rate: ${dodgeRate.toFixed(1)}%`);

        // Strategy effectiveness
        const strategyStats = this.calculateStrategyEffectiveness();

        if (strategyStats.size > 0) {
            Chat.log(`\n=== Strategy Effectiveness ===`);
            strategyStats.forEach((stats, strategy) => {
                const effectiveness = stats.total > 0 ? (stats.successful / stats.total) * 100 : 0;
                Chat.log(`${strategy}: ${effectiveness.toFixed(1)}% success rate (${stats.successful}/${stats.total})`);
            });
        }

        // Recent evasion history
        const recentEvasions = this.evasionHistory.slice(-10);
        if (recentEvasions.length > 0) {
            Chat.log(`\n=== Recent Evasion History ===`);
            recentEvasions.forEach((attempt, index) => {
                const result = attempt.success === null ? "Unknown" :
                               attempt.success ? "✅ Success" : "❌ Failed";
                const timeAgo = ((Client.getTime() - attempt.timestamp) / 20).toFixed(1);
                Chat.log(`${index + 1}. ${attempt.urgency} ${attempt.strategy} - ${result} (${timeAgo}s ago)`);
            });
        }

        // Recommendations
        this.generateCountermeasureRecommendations(dodgeRate, strategyStats);
    }

    calculateStrategyEffectiveness() {
        const stats = new Map();

        this.evasionHistory.forEach(attempt => {
            if (!stats.has(attempt.strategy)) {
                stats.set(attempt.strategy, { total: 0, successful: 0 });
            }

            const strategyStats = stats.get(attempt.strategy);
            strategyStats.total++;

            if (attempt.success === true) {
                strategyStats.successful++;
            }
        });

        return stats;
    }

    generateCountermeasureRecommendations(dodgeRate, strategyStats) {
        Chat.log(`\n=== Recommendations ===`);

        if (dodgeRate < 50) {
            Chat.log(`&c⚠️ LOW DODGE RATE (${dodgeRate.toFixed(1)}%) - Consider:`);
            Chat.log(`  • Practice evasion timing`);
            Chat.log(`  • Use shield blocks more frequently`);
            Chat.log(`  • Maintain greater distance from vexes`);
        } else if (dodgeRate >= 80) {
            Chat.log(`&a✅ EXCELLENT DODGE RATE (${dodgeRate.toFixed(1)}%) - Keep up the good work!`);
        } else {
            Chat.log(`&e💡 MODERATE DODGE RATE (${dodgeRate.toFixed(1)}%) - Room for improvement`);
        }

        // Strategy recommendations
        let bestStrategy = null;
        let bestEffectiveness = 0;

        strategyStats.forEach((stats, strategy) => {
            const effectiveness = stats.total > 0 ? (stats.successful / stats.total) * 100 : 0;
            if (effectiveness > bestEffectiveness && stats.total >= 3) {
                bestEffectiveness = effectiveness;
                bestStrategy = strategy;
            }
        });

        if (bestStrategy) {
            Chat.log(`\nMost effective strategy: ${bestStrategy} (${bestEffectiveness.toFixed(1)}% success rate)`);

            if (bestStrategy === "PERPENDICULAR") {
                Chat.log(`• Continue using lateral evasion movements`);
            } else if (bestStrategy === "VERTICAL") {
                Chat.log(`• Jump timing is working well - maintain this strategy`);
            } else {
                Chat.log(`• Continue with your current successful approach`);
            }
        }
    }
}

const vexCountermeasure = new VexChargeCountermeasure();

// Monitor vexes for countermeasure opportunities
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const countermeasureRange = 20;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= countermeasureRange && entity.is("minecraft:vex")) {
            vexCountermeasure.detectAndCounterCharge(entity);
        }
    });
}));

// Countermeasure report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.c" && e.action === 1) { // C key
        vexCountermeasure.generateCountermeasureReport();
    }
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if vex is currently performing a melee attack
- `isAiDisabled()` - Check if vex's AI is disabled (vexes will freeze in place)

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (vexes have 14 health points)
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (vexes typically hold iron swords)
- `getArmor()` - Armor value (vexes have no natural armor)
- `isBaby()` - Check if vex is baby variant (usually false for vexes)
- `getAbsorptionAmount()` - Extra health absorption

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getVelocity()`, `getSpeed()` - Movement information
- `isInWater()`, `isUnderwater()` - Environmental state checks
- `getBiome()` - Current biome information

---

## Notes and Limitations

- VexEntityHelper provides essential detection for vex charging attacks, which are their most dangerous ability
- Vexes are summoned by evokers and have limited lifespans (typically 30-60 seconds)
- Vexes can fly through any block, making traditional walls and barriers ineffective against them
- The charging state indicates a high-speed attack that can close distances very quickly
- Vexes deal melee damage with iron swords and have no natural armor
- Multiple vexes can be summoned by a single evoker, making crowd control important
- Vexes will despawn naturally after their timer expires or when their summoning evoker dies
- Shield blocking is effective against vex attacks but requires precise timing during charges
- Distance management is crucial when fighting vexes due to their high mobility and charging attacks
- Environmental features like water can slightly slow vexes, making tactical positioning valuable
- Consider using knockback weapons or attacks to disrupt vex charging patterns

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `EvokerEntityHelper` - For interacting with the evokers that summon vexes
- `PillagerEntityHelper` - Other raid mobs that may accompany vexes
- `PlayerEntityHelper` - For player combat capabilities against vexes

---

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive vex interaction
- Designed specifically for raid combat scenarios and woodland mansion encounters
- Essential tool for effective defense against vex charging attacks and coordinated mob threats