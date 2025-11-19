# SlimeEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.SlimeEntityHelper<T extends SlimeEntity>`

**Extends:** `MobEntityHelper<T>`

**Since:** JsMacros 1.8.4

Represents a slime entity in the world. SlimeEntityHelper provides access to slime-specific properties and behaviors such as size variations and attack capabilities. This class serves as a specialized helper for all slime variants, tracking their dimensional characteristics and combat behaviors.

Slimes are gelatinous, cube-shaped hostile mobs that spawn in specific biomes and chunks. They come in multiple sizes, from tiny (harmless) to large (dangerous), and have the unique ability to split into smaller slimes when defeated, except for the smallest size. This helper provides access to the current size of the slime and determines whether it poses a threat based on its dimensions.

This class extends `MobEntityHelper` and inherits all methods for health, movement, AI control, and other mob properties, while adding slime-specific functionality for size analysis and threat assessment.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

SlimeEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`)
- World entity queries and type casting
- Methods that return slime entities
- Type casting from EntityHelper using `as("minecraft:slime")` or appropriate casting methods

```js
// Method 1: From entity events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:slime")) {
        const slime = entity; // Already properly typed
        Chat.log(`Slime spawned! Size: ${slime.getSize()}, Is small: ${slime.isSmall()}`);
    }
}));

// Method 2: From world queries
const entities = World.getEntities();
for (const entity of entities) {
    if (entity.is("minecraft:slime")) {
        const slime = entity;
        const distance = Player.getPlayer().distanceTo(entity);
        Chat.log(`Found slime at ${distance.toFixed(1)} blocks`);
    }
}
```

---

## Methods

## Usage Examples

### Slime Size Distribution Analysis
```js
// Comprehensive slime population analysis and tracking
class SlimePopulationAnalyzer {
    constructor() {
        this.slimeHistory = new Map();
        this.populationStats = {
            total: 0,
            bySize: { 1: 0, 2: 0, 3: 0, 4: 0 },
            spawnLocations: [],
            lastAnalysis: 0
        };
        this.analysisInterval = 100; // Analyze every 5 seconds
    }

    analyzePopulation() {
        const currentTime = Client.getTime();
        if (currentTime - this.populationStats.lastAnalysis < this.analysisInterval) {
            return; // Skip if analyzed recently
        }

        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const analysisRange = 64;
        const slimes = entities.filter(entity =>
            entity.is("minecraft:slime") &&
            player.distanceTo(entity) <= analysisRange
        );

        // Reset current stats
        this.populationStats.total = slimes.length;
        this.populationStats.bySize = { 1: 0, 2: 0, 3: 0, 4: 0 };
        this.populationStats.spawnLocations = [];

        // Analyze each slime
        slimes.forEach(slimeEntity => {
            const slime = slimeEntity.as("minecraft:slime");
            if (!slime) return;

            const size = slime.getSize();
            const pos = slimeEntity.getPos();
            const health = slimeEntity.asLiving().getHealth();
            const distance = player.distanceTo(slimeEntity);
            const isSmall = slime.isSmall();

            this.populationStats.bySize[size]++;
            this.populationStats.spawnLocations.push({
                x: pos.x,
                y: pos.y,
                z: pos.z,
                size: size,
                distance: distance
            });

            // Track slime history
            const uuid = slimeEntity.getUUID();
            if (!this.slimeHistory.has(uuid)) {
                this.slimeHistory.set(uuid, {
                    firstSeen: currentTime,
                    lastSeen: currentTime,
                    initialSize: size,
                    sizeChanges: [],
                    currentHealth: health
                });
            } else {
                const history = this.slimeHistory.get(uuid);
                history.lastSeen = currentTime;
                history.currentHealth = health;

                // Track size changes (could indicate splitting or growth)
                if (history.currentSize !== size) {
                    history.sizeChanges.push({
                        from: history.currentSize,
                        to: size,
                        time: currentTime
                    });
                    history.currentSize = size;
                }
            }
        });

        this.populationStats.lastAnalysis = currentTime;
        this.displayPopulationAnalysis();
    }

    displayPopulationAnalysis() {
        Chat.log(`&6=== Slime Population Analysis ===`);
        Chat.log(`Total slimes in range: ${this.populationStats.total}`);

        // Size distribution
        Chat.log("\n&lSize Distribution:");
        const total = this.populationStats.total;
        for (const [size, count] of Object.entries(this.populationStats.bySize)) {
            const percentage = total > 0 ? (count / total * 100).toFixed(1) : "0.0";
            const emoji = size === "1" ? "✅" : size === "2" ? "⚠️" : "🔥";
            const threat = size === "1" ? "Harmless" : size === "2" ? "Moderate" : size === "3" ? "Dangerous" : "Very Dangerous";
            Chat.log(`  ${emoji} Size ${size}: ${count} (${percentage}%) - ${threat}`);
        }

        // Threat assessment
        const dangerousSlimes = this.populationStats.bySize[2] + this.populationStats.bySize[3] + this.populationStats.bySize[4];
        const harmlessSlimes = this.populationStats.bySize[1];

        Chat.log(`\n&lThreat Assessment:`);
        if (dangerousSlimes === 0) {
            Chat.log(`  &a✅ Safe Environment: All slimes are harmless!`);
            Chat.log(`  &a   Perfect for slimeball farming`);
        } else {
            Chat.log(`  &c⚠️ Dangerous Slimes: ${dangerousSlimes}`);
            Chat.log(`  &a   Harmless Slimes: ${harmlessSlimes}`);

            const threatRatio = (dangerousSlimes / total * 100).toFixed(1);
            Chat.log(`  &e   Threat Ratio: ${threatRatio}%`);

            if (threatRatio > 60) {
                Chat.log(`  &4🔥 HIGH THREAT AREA: Exercise extreme caution!`);
            } else if (threatRatio > 30) {
                Chat.log(`  &e⚠️ MODERATE RISK: Prepare for combat`);
            }
        }

        // Geographical analysis
        if (this.populationStats.spawnLocations.length > 0) {
            this.analyzeSpawnPatterns();
        }

        // Historical data
        this.displayHistoricalTrends();
    }

    analyzeSpawnPatterns() {
        const locations = this.populationStats.spawnLocations;

        // Calculate clustering
        const clusters = this.identifySlimeClusters(locations);

        Chat.log(`\n&lSpawn Pattern Analysis:`);

        if (clusters.length > 0) {
            Chat.log(`  Detected ${clusters.length} slime cluster(s):`);
            clusters.forEach((cluster, index) => {
                const center = cluster.center;
                const threatLevel = cluster.dangerous > cluster.safe ? "Dangerous" : "Safe";
                const icon = cluster.dangerous > cluster.safe ? "🔥" : "✅";

                Chat.log(`    ${icon} Cluster ${index + 1}: ${cluster.total} slimes`);
                Chat.log(`       Center: [${center.x.toFixed(0)}, ${center.y.toFixed(0)}, ${center.z.toFixed(0)}]`);
                Chat.log(`       Composition: ${cluster.dangerous} dangerous, ${cluster.safe} harmless`);
                Chat.log(`       Assessment: ${threatLevel}`);
            });
        } else {
            Chat.log(`  No significant clustering detected`);
            Chat.log(`  Slimes are widely distributed`);
        }

        // Vertical distribution
        const yLevels = locations.map(loc => loc.y);
        const minY = Math.min(...yLevels);
        const maxY = Math.max(...yLevels);
        const avgY = yLevels.reduce((sum, y) => sum + y, 0) / yLevels.length;

        Chat.log(`\n&lVertical Distribution:`);
        Chat.log(`  Height Range: Y ${minY.toFixed(0)} to ${maxY.toFixed(0)}`);
        Chat.log(`  Average Level: Y ${avgY.toFixed(0)}`);

        if (avgY < 40) {
            Chat.log(`  &7Mostly underground spawns (typical for slime chunks)`);
        } else if (avgY < 60) {
            Chat.log(`  &eMixed surface/cave spawns`);
        } else {
            Chat.log(`  &bMostly surface spawns (swamp biome likely)`);
        }
    }

    identifySlimeClusters(locations) {
        const clusters = [];
        const processed = new Set();
        const clusterRadius = 16; // Blocks within same cluster

        locations.forEach((location, index) => {
            if (processed.has(index)) return;

            const cluster = {
                total: 0,
                safe: 0,
                dangerous: 0,
                positions: [],
                center: { x: 0, y: 0, z: 0 }
            };

            // BFS to find all slimes within cluster radius
            const queue = [index];
            while (queue.length > 0) {
                const currentIndex = queue.shift();
                if (processed.has(currentIndex)) continue;

                processed.add(currentIndex);
                const currentLoc = locations[currentIndex];

                cluster.total++;
                cluster.positions.push(currentLoc);

                if (currentLoc.size === 1) {
                    cluster.safe++;
                } else {
                    cluster.dangerous++;
                }

                // Find nearby slimes
                locations.forEach((otherLoc, otherIndex) => {
                    if (!processed.has(otherIndex)) {
                        const distance = Math.sqrt(
                            Math.pow(currentLoc.x - otherLoc.x, 2) +
                            Math.pow(currentLoc.y - otherLoc.y, 2) +
                            Math.pow(currentLoc.z - otherLoc.z, 2)
                        );

                        if (distance <= clusterRadius) {
                            queue.push(otherIndex);
                        }
                    }
                });
            }

            if (cluster.total > 1) {
                // Calculate cluster center
                const center = cluster.positions.reduce((acc, pos) => ({
                    x: acc.x + pos.x / cluster.total,
                    y: acc.y + pos.y / cluster.total,
                    z: acc.z + pos.z / cluster.total
                }), { x: 0, y: 0, z: 0 });

                cluster.center = center;
                clusters.push(cluster);
            }
        });

        return clusters;
    }

    displayHistoricalTrends() {
        const currentTime = Client.getTime();
        let recentSpawnings = 0;
        let oldSlimes = 0;

        for (const [uuid, history] of this.slimeHistory) {
            const age = currentTime - history.firstSeen;
            if (age < 600) { // Last 30 seconds
                recentSpawnings++;
            }
            if (age > 1200) { // Older than 1 minute
                oldSlimes++;
            }
        }

        Chat.log(`\n&lPopulation Dynamics:`);
        Chat.log(`  Recently spawned: ${recentSpawnings} (last 30s)`);
        Chat.log(`  Long-lived slimes: ${oldSlimes} (> 1min)`);
        Chat.log(`  Total tracked: ${this.slimeHistory.size}`);

        if (recentSpawnings > 5) {
            Chat.log(`  &e🔄 Active spawning detected!`);
        } else if (recentSpawnings > 2) {
            Chat.log(`  &6Moderate spawning activity`);
        } else {
            Chat.log(`  &7Low spawning activity`);
        }
    }

    cleanup() {
        const currentTime = Client.getTime();
        const cutoffTime = currentTime - 3600; // Remove slimes older than 3 minutes

        for (const [uuid, history] of this.slimeHistory) {
            if (history.lastSeen < cutoffTime) {
                this.slimeHistory.delete(uuid);
            }
        }
    }
}

const slimeAnalyzer = new SlimePopulationAnalyzer();

// Analyze slime population periodically
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    slimeAnalyzer.analyzePopulation();

    // Cleanup every 30 seconds
    if (Client.getTime() % 600 === 0) {
        slimeAnalyzer.cleanup();
    }
}));

Chat.log("&a📊 Slime Population Analyzer activated!");
```

### Slime Combat Strategy System
```js
// Advanced combat strategy based on slime sizes and behaviors
class SlimeCombatSystem {
    constructor() {
        this.combatLog = [];
        this.strategies = {
            "farming": "Focus on safely killing small slimes for resources",
            "survival": "Prioritize eliminating large threats",
            "efficient": "Kill slimes in size order for maximum efficiency"
        };
        this.currentStrategy = "survival";
        this.combatStats = {
            slimesKilled: { 1: 0, 2: 0, 3: 0, 4: 0 },
            damageTaken: 0,
            damageDealt: 0,
            combatTime: 0
        };
    }

    analyzeCombatSituation() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const combatRange = 32;
        const slimes = entities.filter(entity =>
            entity.is("minecraft:slime") &&
            player.distanceTo(entity) <= combatRange
        );

        if (slimes.length === 0) {
            Chat.log("No slimes in combat range");
            return;
        }

        Chat.log(`&c⚔️=== COMBAT ANALYSIS (${slimes.length} slimes) ===`);

        // Sort slimes by threat level
        const prioritizedSlimes = this.prioritizeThreats(slimes);

        let totalThreat = 0;
        let immediateThreats = 0;
        let optimalTargets = [];

        prioritizedSlimes.forEach((slimeData, index) => {
            const slime = slimeData.entity.as("minecraft:slime");
            const size = slime.getSize();
            const distance = slimeData.distance;
            const threat = this.calculateCombatThreat(slimeData.entity, size, distance);

            totalThreat += threat;

            if (distance <= size + 2) {
                immediateThreats++;
            }

            const recommendation = this.getCombatRecommendation(slimeData.entity, size, distance);

            Chat.log(`\n${index + 1}. Size ${size} Slime:`);
            Chat.log(`   Distance: ${distance.toFixed(1)}m`);
            Chat.log(`   Health: ${slimeData.entity.asLiving().getHealth().toFixed(1)}`);
            Chat.log(`   Threat Level: ${threat.toFixed(0)}%`);
            Chat.log(`   Status: ${immediateThreats > 0 && distance <= size + 2 ? "&cATTACKING!" : "&ePositioning"}`);
            Chat.log(`   Recommendation: ${recommendation.action}`);

            if (recommendation.priority === "high") {
                optimalTargets.push(slimeData);
            }
        });

        // Overall combat assessment
        this.generateCombatStrategy(prioritizedSlimes, totalThreat, immediateThreats);

        // Equipment check
        this.checkCombatReadiness(optimalTargets);
    }

    prioritizeThreats(slimes) {
        return slimes
            .map(entity => {
                const slime = entity.as("minecraft:slime");
                const size = slime.getSize();
                const distance = Player.getPlayer().distanceTo(entity);
                const threat = this.calculateCombatThreat(entity, size, distance);

                return {
                    entity: entity,
                    size: size,
                    distance: distance,
                    threat: threat
                };
            })
            .sort((a, b) => b.threat - a.threat);
    }

    calculateCombatThreat(slimeEntity, size, distance) {
        let threat = 0;

        // Size threat (bigger = more dangerous)
        threat += size * 25;

        // Distance threat (closer = more immediate)
        const attackRange = size + 2;
        if (distance <= attackRange) {
            threat += 50; // Immediate threat
        } else if (distance <= attackRange * 2) {
            threat += 30; // Can attack soon
        } else if (distance <= 20) {
            threat += 15; // Within engagement range
        }

        // Health factor
        const healthPercent = (slimeEntity.asLiving().getHealth() / slimeEntity.asLiving().getMaxHealth()) * 100;
        threat += healthPercent * 0.1;

        return Math.min(threat, 100);
    }

    getCombatRecommendation(slimeEntity, size, distance) {
        const attackRange = size + 2;
        const playerHealth = Player.getPlayer().asLiving().getHealth();
        const maxHealth = Player.getPlayer().asLiving().getMaxHealth();
        const healthPercent = (playerHealth / maxHealth) * 100;

        if (size === 1) {
            return {
                action: "Safe to kill for slimeballs",
                priority: "low",
                urgency: "none"
            };
        }

        if (distance <= attackRange) {
            return {
                action: "IMMEDIATE PRIORITY - Attacking now!",
                priority: "high",
                urgency: "critical"
            };
        }

        if (distance <= attackRange * 2 && healthPercent < 50) {
            return {
                action: "Create distance before engaging",
                priority: "high",
                urgency: "high"
            };
        }

        if (size >= 3 && distance <= 16) {
            return {
                action: "Eliminate first - major threat",
                priority: "high",
                urgency: "medium"
            };
        }

        if (size === 2 && distance <= 12) {
            return {
                action: "Engage with caution",
                priority: "medium",
                urgency: "medium"
            };
        }

        return {
            action: "Monitor and approach strategically",
            priority: "low",
            urgency: "low"
        };
    }

    generateCombatStrategy(prioritizedSlimes, totalThreat, immediateThreats) {
        Chat.log(`\n&6=== COMBAT STRATEGY ===`);

        const player = Player.getPlayer();
        const healthPercent = (player.asLiving().getHealth() / player.asLiving().getMaxHealth()) * 100;

        // Overall threat assessment
        if (totalThreat > 200) {
            Chat.log(`&c🔥 CRITICAL SITUATION: Multiple large threats!`);
            Chat.log(`   → Consider tactical retreat`);
            Chat.log(`   → Use terrain for advantage`);
            Chat.log(`   → Focus on escape routes`);
        } else if (totalThreat > 100) {
            Chat.log(`&e⚠️ DANGEROUS: Significant threat level`);
            Chat.log(`   → Prioritize large slimes first`);
            Chat.log(`   → Maintain mobility`);
            Chat.log(`   → Use hit-and-run tactics`);
        } else if (totalThreat > 50) {
            Chat.log(`&6⚔️ MODERATE: Manageable threat level`);
            Chat.log(`   → Systematic elimination recommended`);
            Chat.log(`   → Watch for splitting behavior`);
        } else {
            Chat.log(`&a✅ LOW RISK: Minor threats only`);
            Chat.log(`   → Can farm safely`);
            Chat.log(`   → Focus on resource collection`);
        }

        // Health-based strategy adjustment
        if (healthPercent < 30) {
            Chat.log(`\n&c❌ HEALTH CRITICAL: ${healthPercent.toFixed(0)}%`);
            Chat.log(`   → IMMEDIATE RETREAT RECOMMENDED`);
            Chat.log(`   → Use healing items before engaging`);
        } else if (healthPercent < 60) {
            Chat.log(`\n&e⚠️ HEALTH LOW: ${healthPercent.toFixed(0)}%`);
            Chat.log(`   → Engage cautiously`);
            Chat.log(`   → Have escape route ready`);
        }

        // Immediate action plan
        if (immediateThreats > 0) {
            Chat.log(`\n&c🚨 IMMEDIATE ACTIONS REQUIRED:`);
            Chat.log(`   → ${immediateThreats} slime(s) currently attacking!`);

            // Find the most dangerous immediate threat
            const immediateThreatsList = prioritizedSlimes.filter(s => s.distance <= s.size + 2);
            if (immediateThreatsList.length > 0) {
                const worstThreat = immediateThreatsList[0];
                Chat.log(`   → Target: Size ${worstThreat.size} slime (${worstThreat.threat.toFixed(0)}% threat)`);

                if (worstThreat.size >= 3) {
                    Chat.log(`   → Use knockback weapons or terrain`);
                } else {
                    Chat.log(`   → Quick engagement recommended`);
                }
            }
        }

        // Strategic recommendations
        Chat.log(`\n💡 STRATEGIC TIPS:`);

        const largeSlimes = prioritizedSlimes.filter(s => s.size >= 3).length;
        const mediumSlimes = prioritizedSlimes.filter(s => s.size === 2).length;

        if (largeSlimes > 0) {
            Chat.log(`   • Kill large slimes first to reduce spawn rate`);
            Chat.log(`   • Be prepared for 2-4 smaller slimes per large slime`);
        }

        if (mediumSlimes > 2) {
            Chat.log(`   • Multiple medium slimes can overwhelm quickly`);
            Chat.log(`   • Consider area damage or crowd control`);
        }

        Chat.log(`   • Small slimes are harmless - farm for resources`);
        Chat.log(`   • Use vertical terrain to your advantage`);
    }

    checkCombatReadiness(optimalTargets) {
        const player = Player.getPlayer();

        Chat.log(`\n🛡️ COMBAT READINESS CHECK:`);

        // Weapon check
        const mainHand = player.getMainHand();
        let weaponScore = 0;

        if (mainHand) {
            const weaponType = mainHand.getType();
            if (weaponType.includes("sword")) {
                weaponScore = 8;
                Chat.log(`   &a✓ Sword equipped: ${mainHand.getName().getString()}`);
            } else if (weaponType.includes("axe")) {
                weaponScore = 6;
                Chat.log(`   &e⚠️ Axe equipped: ${mainHand.getName().getString()} (less optimal)`);
            } else {
                Chat.log(`   &c❌ No weapon equipped: ${mainHand.getName().getString()}`);
            }
        } else {
            Chat.log(`   &c❌ No item in main hand`);
        }

        // Health check
        const health = player.asLiving().getHealth();
        const maxHealth = player.asLiving().getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;

        if (healthPercent >= 80) {
            Chat.log(`   &a✓ Excellent health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
        } else if (healthPercent >= 50) {
            Chat.log(`   &e⚠️ Moderate health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
        } else {
            Chat.log(`   &c❌ Low health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
        }

        // Armor check
        const armorValue = player.asLiving().getArmor();
        if (armorValue >= 15) {
            Chat.log(`   &a✓ Good armor protection: ${armorValue}`);
        } else if (armorValue >= 8) {
            Chat.log(`   &e⚠️ Moderate armor: ${armorValue}`);
        } else {
            Chat.log(`   &c❌ Insufficient armor: ${armorValue}`);
        }

        // Overall readiness score
        const readinessScore = weaponScore + (healthPercent / 10) + (armorValue / 4);

        Chat.log(`\n📊 COMBAT READINESS: ${readinessScore.toFixed(0)}%`);

        if (readinessScore >= 80) {
            Chat.log(`   &a✅ READY FOR COMBAT`);
        } else if (readinessScore >= 60) {
            Chat.log(`   &e⚠️ CAUTION ADVISED`);
        } else {
            Chat.log(`   &c❌ NOT READY - PREPARE FIRST`);
        }

        // Target-specific recommendations
        if (optimalTargets.length > 0) {
            Chat.log(`\n🎯 OPTIMAL TARGETS: ${optimalTargets.length}`);
            optimalTargets.forEach((target, index) => {
                const slime = target.entity.as("minecraft:slime");
                const size = slime.getSize();
                const distance = target.distance;

                Chat.log(`   ${index + 1}. Size ${size} slime at ${distance.toFixed(1)}m`);

                if (size >= 3) {
                    Chat.log(`      → High priority - major threat`);
                } else if (size === 2) {
                    Chat.log(`      → Medium priority - moderate threat`);
                }
            });
        }
    }
}

const slimeCombatSystem = new SlimeCombatSystem();

// Combat analysis command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.c" && e.action === 1) { // C key
        slimeCombatSystem.analyzeCombatSituation();
    }
}));

Chat.log("&c⚔️ Slime Combat System activated!");
Chat.log("&ePress C to analyze combat situation");
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if slime is currently attacking (only for size 2+)
- `isAiDisabled()` - Check if slime's AI is disabled
- All other mob-specific methods for behavior control

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (scales with size: 4 × size)
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (usually empty for slimes)
- `getArmor()` - Armor value (usually 0 for slimes)
- `isBaby()` - Check if slime is a baby variant (slimes don't have babies)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- SlimeEntityHelper provides essential functionality for distinguishing between harmless and dangerous slimes
- The `getSize()` method is crucial for threat assessment and combat planning
- Small slimes (size 1) are completely harmless and safe for farming
- Slimes spawn in specific chunks below Y=40 and in swamp biomes at night
- When killed, slimes split into 2-4 smaller slimes of size-1, except size 1 slimes which don't split
- Slime damage equals size-1 hearts, making larger slimes significantly more dangerous
- Slime health equals 4 × size, so larger slimes are much more durable
- Slimes can jump high based on their size, making vertical positioning important
- Consider using water or lava farms for controlled slime spawning and killing
- Slime balls are valuable crafting materials for sticky pistons, leads, and magma cream
- Slime farms are popular for resource generation due to the valuable drops
- Large slimes can launch player far away when hit, potentially causing fall damage

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `MagmaCubeEntityHelper` - Similar mob helper for Nether variant (magma cubes)
- `PlayerEntityHelper` - For combat interactions and player-specific abilities
- `WorldScanner` - Useful for finding slime chunks and slime populations
- `BlockHelper` - For analyzing terrain suitable for slime farms

---

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive slime interaction
- Designed specifically for slime size analysis and threat assessment
- Essential tool for slime farming, combat, and resource management
- Supports all slime sizes with accurate threat level calculations
- Includes proper handling of slime splitting mechanics and combat strategies