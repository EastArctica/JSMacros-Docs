# GuardianEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.GuardianEntityHelper`

**Extends:** `MobEntityHelper<GuardianEntity>`

**Since:** JsMacros 1.8.4

Represents a guardian entity in the world. GuardianEntityHelper provides access to guardian-specific properties and behaviors, particularly their beam targeting abilities and spike states. Guardians are aquatic hostile mobs found in ocean monuments that use laser beam attacks and have defensive spikes.

Guardians are formidable underwater guardians that protect ocean monuments and their precious treasures. They possess a unique laser beam attack that charges up before dealing damage, and defensive spikes that extend when threatened. This helper provides access to their targeting system, allowing you to monitor who they're attacking, and their defensive state through spike positioning.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding guardian-specific functionality for beam targeting and defensive behavior monitoring.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

GuardianEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`, `ProjectileHit`)
- World entity queries and type casting
- Methods that return guardian entities
- Type casting from EntityHelper using `as("minecraft:guardian")` or appropriate casting methods

---

## Methods

## Usage Examples

### Guardian Detection and Analysis
```js
// Comprehensive guardian detection and analysis system
class GuardianAnalyzer {
    constructor() {
        this.guardians = new Map();
        this.oceanMonumentProximity = 0;
        this.elderGuardianCount = 0;
        this.analysisStartTime = Client.getTime();
    }

    analyzeGuardian(guardianEntity) {
        const guardian = guardianEntity.as("minecraft:guardian");
        if (!guardian) return;

        const uuid = guardianEntity.getUUID();
        const isElder = guardian.isElder();
        const hasTarget = guardian.hasTarget();
        const target = guardian.getTarget();
        const spikesExtended = guardian.hasSpikesRetracted(); // Note behavior
        const health = guardianEntity.asLiving().getHealth();
        const maxHealth = guardianEntity.asLiving().getMaxHealth();
        const pos = guardianEntity.getPos();
        const player = Player.getPlayer();
        const distance = player.distanceTo(guardianEntity);

        // Store guardian data
        if (!this.guardians.has(uuid)) {
            this.guardians.set(uuid, {
                entity: guardianEntity,
                name: guardianEntity.getName().getString(),
                isElder: isElder,
                firstSeen: Client.getTime(),
                targetingHistory: [],
                combatSessions: [],
                maxAggressionLevel: 0
            });

            if (isElder) {
                this.elderGuardianCount++;
                Chat.log(`&c👑 ELDER GUARDIAN DETECTED!`);
            }

            Chat.log(`&e🛡️ Guardian detected: ${guardianEntity.getName().getString()}`);
        }

        const data = this.guardians.get(uuid);

        // Update targeting history
        data.targetingHistory.push({
            hasTarget: hasTarget,
            targetName: target ? target.getName().getString() : null,
            targetType: target ? target.getType() : null,
            distance: target ? guardianEntity.getPos().distanceTo(target.getPos()) : null,
            time: Client.getTime()
        });

        // Clean old history (keep last 2 minutes)
        const cutoffTime = Client.getTime() - 2400;
        data.targetingHistory = data.targetingHistory.filter(entry => entry.time > cutoffTime);

        // Calculate current aggression level
        const aggressionLevel = this.calculateAggressionLevel(hasTarget, spikesExtended, isElder);
        data.maxAggressionLevel = Math.max(data.maxAggressionLevel, aggressionLevel);

        // Provide real-time analysis
        this.provideGuardianAnalysis(data, guardian, health, maxHealth, distance, pos);

        // Check for ocean monument proximity
        this.checkOceanMonumentProximity(pos);
    }

    calculateAggressionLevel(hasTarget, spikesExtended, isElder) {
        let level = 0;

        if (hasTarget && spikesExtended) level = 90; // Full combat
        else if (hasTarget) level = 60; // Targeting
        else if (spikesExtended) level = 30; // Alert
        else level = 0; // Passive

        if (isElder) level += 15; // Elder bonus

        return level;
    }

    provideGuardianAnalysis(data, guardian, health, maxHealth, distance, pos) {
        const isElder = guardian.isElder();
        const hasTarget = guardian.hasTarget();
        const target = guardian.getTarget();
        const spikesExtended = guardian.hasSpikesRetracted();

        Chat.log(`&6=== Guardian Analysis ===`);
        Chat.log(`Type: ${isElder ? "👑 Elder Guardian" : "🛡️ Guardian"}`);
        Chat.log(`Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)} (${((health/maxHealth)*100).toFixed(0)}%)`);
        Chat.log(`Distance: ${distance.toFixed(1)} blocks`);
        Chat.log(`Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

        // State analysis
        const state = this.classifyGuardianState(hasTarget, spikesExtended);
        Chat.log(`State: ${state.emoji} ${state.name}`);
        Chat.log(`Description: ${state.description}`);

        // Target analysis
        if (hasTarget && target) {
            const targetName = target.getName().getString();
            const targetType = target.getType();
            const targetDistance = guardian.getEntity().getPos().distanceTo(target.getPos());

            Chat.log(`\n🎯 Target Analysis:`);
            Chat.log(`  Target: ${targetName} (${targetType})`);
            Chat.log(`  Distance to Target: ${targetDistance.toFixed(1)} blocks`);

            if (targetType === "minecraft:player") {
                const targetPlayer = target.asPlayer();
                const targetHealth = targetPlayer.getHealth();
                Chat.log(`  &c💀 TARGET IS PLAYER!`);
                Chat.log(`  Player Health: ${targetHealth.toFixed(1)}/${targetPlayer.getMaxHealth().toFixed(1)}`);
                this.sendPlayerTargetAlert(targetName, targetDistance, isElder);
            }
        }

        // Threat assessment
        const threat = this.assessThreat(data, distance, health, maxHealth, isElder, state);
        Chat.log(`\n⚠️ Threat Level: ${threat.level} (${threat.score}/100)`);
        Chat.log(`Recommendation: ${threat.recommendation}`);

        // Combat recommendations
        if (state.name === "COMBAT_ENGAGED" || state.name === "TARGETING") {
            this.provideCombatRecommendations(data, distance, isElder, target);
        }
    }

    classifyGuardianState(hasTarget, spikesExtended) {
        if (hasTarget && spikesExtended) {
            return {
                name: "COMBAT_ENGAGED",
                emoji: "⚔️",
                description: "Guardian is actively attacking with extended spikes"
            };
        } else if (hasTarget) {
            return {
                name: "TARGETING",
                emoji: "🎯",
                description: "Guardian is charging laser beam attack"
            };
        } else if (spikesExtended) {
            return {
                name: "DEFENSIVE",
                emoji: "🛡️",
                description: "Guardian is alert with extended spikes"
            };
        } else {
            return {
                name: "PASSIVE",
                emoji: "😌",
                description: "Guardian is calm and relaxed"
            };
        }
    }

    assessThreat(data, distance, health, maxHealth, isElder, state) {
        let score = 0;

        // Base threat by type
        if (isElder) score += 40;
        else score += 20;

        // Distance threat (closer is more dangerous)
        if (distance <= 8) score += 30;
        else if (distance <= 16) score += 20;
        else if (distance <= 24) score += 10;

        // Health threat (higher health means more dangerous)
        const healthPercent = (health / maxHealth) * 100;
        score += healthPercent * 0.2;

        // State threat
        const stateScores = {
            "COMBAT_ENGAGED": 25,
            "TARGETING": 15,
            "DEFENSIVE": 8,
            "PASSIVE": 0
        };
        score += stateScores[state.name] || 0;

        // Multiple guardian threat
        if (this.guardians.size > 1) {
            score += (this.guardians.size - 1) * 5;
        }

        let level, recommendation;

        if (score >= 80) {
            level = "CRITICAL";
            recommendation = "Immediate retreat or full combat preparation required";
        } else if (score >= 60) {
            level = "HIGH";
            recommendation = "Prepare for combat, maintain tactical distance";
        } else if (score >= 40) {
            level = "MEDIUM";
            recommendation = "Monitor situation, be ready to engage or retreat";
        } else {
            level = "LOW";
            recommendation = "Safe to approach if needed, remain cautious";
        }

        return { level, score: Math.min(score, 100), recommendation };
    }

    provideCombatRecommendations(data, distance, isElder, target) {
        Chat.log(`\n⚔️ Combat Recommendations:`);

        if (distance <= 12) {
            Chat.log(`  &c🔥 CLOSE COMBAT ZONE:`);
            Chat.log(`  → Break line of sight immediately`);
            Chat.log(`  → Use pillars or walls as cover`);
            Chat.log(`  → Consider retreat to safer distance`);
        } else if (distance <= 24) {
            Chat.log(`  &e🏹 OPTIMAL COMBAT RANGE:`);
            Chat.log(`  → Use ranged weapons (bow, crossbow)`);
            Chat.log(`  → Keep moving to avoid laser beams`);
            Chat.log(`  → Attack during guardian cooldown periods`);
        } else {
            Chat.log(`  &a🎯 LONG RANGE ADVANTAGE:`);
            Chat.log(`  → Guardian attack effectiveness reduced`);
            Chat.log(`  → Good position for ranged combat`);
            Chat.log(`  → Monitor for approach opportunities`);
        }

        if (isElder) {
            Chat.log(`\n  &c👑 ELDER GUARDIAN TACTICS:`);
            Chat.log(`  → Bring milk for Mining Fatigue removal`);
            Chat.log(`  → Elder has more health and deals more damage`);
            Chat.log(`  → Consider using enchanted weapons and armor`);
            Chat.log(`  → Retreat more frequently to heal`);
        }

        if (target && target.getType() === "minecraft:player") {
            Chat.log(`\n  &c💀 PLAYER TARGETED:`);
            Chat.log(`  → Guardian is actively attacking a player`);
            Chat.log(`  → Immediate intervention may be required`);
            Chat.log(`  → Coordinate with other players if available`);
        }

        // Environmental recommendations
        this.provideEnvironmentalRecommendations(data.entity.getPos());
    }

    provideEnvironmentalRecommendations(guardianPos) {
        const playerPos = Player.getPlayer().getPos();

        Chat.log(`\n  🌊 Environmental Considerations:`);

        // Check water depth
        const waterDepth = this.getWaterDepth(guardianPos);
        if (waterDepth > 15) {
            Chat.log(`  → Deep water environment (${waterDepth.toFixed(0)} blocks)`);
            Chat.log(`  → Guardian has significant mobility advantage`);
            Chat.log(`  → Consider surface combat or creating air pockets`);
        } else if (waterDepth > 8) {
            Chat.log(`  → Medium water depth - balanced combat conditions`);
        } else {
            Chat.log(`  → Shallow water - player advantage possible`);
        }

        // Check for nearby cover
        const coverAvailable = this.findNearbyCover(playerPos, 16);
        if (coverAvailable > 0) {
            Chat.log(`  → Cover detected nearby (${coverAvailable} potential positions)`);
            Chat.log(`  → Use cover to break line of sight during attacks`);
        } else {
            Chat.log(`  → Limited cover available - consider tactical positioning`);
        }

        // Light level considerations
        const lightLevel = this.getLightLevel(guardianPos);
        if (lightLevel < 4) {
            Chat.log(`  → Dark environment - enhanced guardian stealth`);
            Chat.log(`  → Consider light sources for better visibility`);
        }
    }

    getWaterDepth(pos) {
        let depth = 0;
        let checkY = Math.floor(pos.y);

        while (checkY > pos.y - 30 && depth < 30) { // Check up to 30 blocks down
            const block = World.getBlock(Math.floor(pos.x), checkY, Math.floor(pos.z));
            if (block && block.getBlockState().getBlock().getTranslationKey().includes("water")) {
                depth++;
            } else {
                break;
            }
            checkY--;
        }

        return depth;
    }

    findNearbyCover(pos, radius) {
        let coverCount = 0;

        for (let x = -radius; x <= radius; x += 4) {
            for (let z = -radius; z <= radius; z += 4) {
                for (let y = -3; y <= 3; y += 2) {
                    const checkPos = {
                        x: Math.floor(pos.x + x),
                        y: Math.floor(pos.y + y),
                        z: Math.floor(pos.z + z)
                    };

                    const block = World.getBlock(checkPos.x, checkPos.y, checkPos.z);
                    if (block && !block.getBlockState().isAir() &&
                        !block.getBlockState().getBlock().getTranslationKey().includes("water")) {
                        coverCount++;
                    }
                }
            }
        }

        return coverCount;
    }

    getLightLevel(pos) {
        const block = World.getBlock(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        // This is a simplified approach - actual light level detection would be more complex
        return 8; // Placeholder
    }

    checkOceanMonumentProximity(pos) {
        // Simple heuristic for ocean monument detection
        // In practice, this would check for actual monument structure detection
        const waterBlocksNearby = this.countWaterBlocksNearby(pos, 16);

        if (waterBlocksNearby > 200) {
            if (this.oceanMonumentProximity < 75) {
                this.oceanMonumentProximity = 75;
                Chat.log(`&6🏛️ Possible ocean monument proximity detected`);
                Chat.log(`High guardian activity area - exercise extreme caution`);
            }
        }
    }

    countWaterBlocksNearby(pos, radius) {
        let waterCount = 0;

        for (let x = -radius; x <= radius; x += 2) {
            for (let z = -radius; z <= radius; z += 2) {
                for (let y = -5; y <= 5; y += 2) {
                    const block = World.getBlock(
                        Math.floor(pos.x + x),
                        Math.floor(pos.y + y),
                        Math.floor(pos.z + z)
                    );

                    if (block && block.getBlockState().getBlock().getTranslationKey().includes("water")) {
                        waterCount++;
                    }
                }
            }
        }

        return waterCount;
    }

    sendPlayerTargetAlert(playerName, distance, isElder) {
        const currentTime = Client.getTime();
        const alertKey = "player_target_alert";
        const lastAlert = this.alertCooldowns?.get(alertKey) || 0;

        if (!this.alertCooldowns) this.alertCooldowns = new Map();

        if (currentTime - lastAlert < 60) return; // 3 second cooldown

        let alertMessage = `${playerName} targeted by ${isElder ? "ELDER" : "regular"} guardian`;
        let urgency = distance <= 12 ? "CRITICAL" : distance <= 20 ? "URGENT" : "WARNING";

        Chat.actionbar(`&c💀 ${urgency}: ${alertMessage} (${distance.toFixed(0)}m)`);
        this.alertCooldowns.set(alertKey, currentTime);
    }

    generateReport() {
        if (this.guardians.size === 0) {
            Chat.log("No guardian data available");
            return;
        }

        const analysisDuration = (Client.getTime() - this.analysisStartTime) / 20;

        Chat.log(`&6=== Guardian Analysis Report ===`);
        Chat.log(`Analysis Duration: ${analysisDuration.toFixed(1)} seconds`);
        Chat.log(`Guardians Detected: ${this.guardians.size}`);
        Chat.log(`Elder Guardians: ${this.elderGuardianCount}`);
        Chat.log(`Ocean Monument Proximity: ${this.oceanMonumentProximity}%`);

        let totalCombatTime = 0;
        let highThreatCount = 0;
        let activeTargetingCount = 0;

        for (const [uuid, data] of this.guardians) {
            const currentGuardian = data.entity.as("minecraft:guardian");
            const hasTarget = currentGuardian.hasTarget();
            const isElder = data.isElder;
            const health = data.entity.asLiving().getHealth();
            const maxHealth = data.entity.asLiving().getMaxHealth();

            if (hasTarget) activeTargetingCount++;
            if (data.maxAggressionLevel >= 60) highThreatCount++;

            Chat.log(`\n${data.name}:`);
            Chat.log(`  Type: ${isElder ? "Elder" : "Regular"} Guardian`);
            Chat.log(`  Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
            Chat.log(`  Max Aggression: ${data.maxAggressionLevel.toFixed(0)}%`);
            Chat.log(`  Targeting Events: ${data.targetingHistory.filter(t => t.hasTarget).length}`);
            Chat.log(`  Combat Sessions: ${data.combatSessions.length}`);

            // Calculate total targeting time
            const targetingEntries = data.targetingHistory.filter(entry => entry.hasTarget);
            if (targetingEntries.length > 1) {
                let totalTargetingTime = 0;
                for (let i = 1; i < targetingEntries.length; i++) {
                    totalTargetingTime += targetingEntries[i].time - targetingEntries[i-1].time;
                }
                totalCombatTime += totalTargetingTime / 20; // Convert to seconds
            }
        }

        Chat.log(`\n=== Summary ===`);
        Chat.log(`Active Targeting: ${activeTargetingCount}/${this.guardians.size}`);
        Chat.log(`High Threat Guardians: ${highThreatCount}`);
        Chat.log(`Estimated Combat Time: ${totalCombatTime.toFixed(1)} seconds`);

        if (this.elderGuardianCount >= 1) {
            Chat.log(`\n&c👑 ELDER GUARDIAN WARNING:`);
            Chat.log(`Elder guardians present - extreme caution required`);
            Chat.log(`Mining Fatigue effects likely in area`);
            Chat.log(`Ensure adequate preparation before engagement`);
        }

        if (activeTargetingCount >= this.guardians.size * 0.7) {
            Chat.log(`\n&e⚠️ HIGH GUARDIAN ACTIVITY:`);
            Chat.log(`Multiple guardians actively targeting`);
            Chat.log(`Consider strategic retreat or full combat preparation`);
        }
    }
}

const guardianAnalyzer = new GuardianAnalyzer();

// Analyze guardians every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const analysisRange = 64;

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= analysisRange && entity.is("minecraft:guardian")) {
            guardianAnalyzer.analyzeGuardian(entity);
        }
    });
}));

// Analysis report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.r" && e.action === 1) { // R key
        guardianAnalyzer.generateReport();
    }
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if guardian is currently attacking
- `getAngerTime()` - Get remaining anger time if provoked
- `setAngerTime(time)` - Set guardian anger time
- `isAiDisabled()` - Check if guardian's AI is disabled

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (30 for regular, 80 for elder guardians)
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (usually empty)
- `getArmor()` - Armor value
- `isBaby()` - Check if guardian is baby variant (usually false)
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

- GuardianEntityHelper provides essential methods for understanding guardian combat behavior and threat assessment
- The `hasSpikesRetracted()` method may have inverted logic in the current implementation - test behavior in your environment
- Guardians are found primarily in ocean monuments and surrounding deep ocean biomes
- Elder guardians are significantly more dangerous with 80 health vs 30 for regular guardians
- Laser beam attacks take ~2 seconds to charge and provide visual/audio warning cues
- Guardians can attack through water but need line of sight to maintain targets
- Elder guardians apply Mining Fatigue III to nearby players, making underwater resource gathering difficult
- Consider environmental factors like water depth, available cover, and escape routes when engaging guardians
- Multiple guardians can coordinate attacks in ocean monuments, making group combat especially dangerous
- Milk buckets can counteract Mining Fatigue effects from elder guardians

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `ElderGuardianEntityHelper` - Would be the specific helper for elder guardians if separate from regular guardians
- `DrownedEntityHelper` - Another underwater hostile mob with different combat patterns
- `PlayerEntityHelper` - For combat interactions and player-specific abilities against guardians

---

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive guardian interaction
- Designed specifically for ocean monument combat scenarios and guardian behavior analysis
- Essential tool for effective underwater combat against guardians and elder guardians