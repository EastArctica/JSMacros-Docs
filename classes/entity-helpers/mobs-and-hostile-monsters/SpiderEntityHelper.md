# SpiderEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.SpiderEntityHelper`

**Extends:** `MobEntityHelper<SpiderEntity>`

The `SpiderEntityHelper` class provides specialized access to spider entities in Minecraft, offering methods to monitor and interact with spider-specific behaviors such as climbing states and movement patterns. This class extends `MobEntityHelper` and inherits all functionality for living entities including health monitoring, status effects, AI states, and combat behaviors.

This helper is particularly useful for creating scripts that detect spider climbing behaviors, analyze spider movement patterns, or implement spider-specific monitoring systems for enhanced gameplay awareness.

## Constructors

SpiderEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type checking

## Methods

### Spider-Specific Methods

- [spider.isClimbing()](#spiderisclimbing)

### Inherited Methods

The SpiderEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states, line of sight
- **EntityHelper:** Position, movement, world interaction, type casting, distance calculations

---

## Spider-Specific Methods

## Usage Examples

### Spider Behavior Monitor
```js
// Comprehensive spider behavior monitoring system
class SpiderMonitor {
    constructor() {
        this.trackedSpiders = new Map();
        this.climbingEvents = [];
        this.stats = {
            totalSeen: 0,
            climbingCount: 0,
            averageClimbingTime: 0,
            climbingSessions: []
        };
    }

    analyzeSpider(spider) {
        const uuid = spider.getUUID();
        const pos = spider.getPos();
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(spider);
        const isClimbing = spider.isClimbing();
        const isAttacking = spider.isAttacking();
        const health = spider.getHealth();
        const maxHealth = spider.getMaxHealth();

        // Get previous state if tracked
        const previousState = this.trackedSpiders.get(uuid) || {
            wasClimbing: false,
            climbingStartTime: null,
            totalClimbingTime: 0,
            lastPosition: pos
        };

        // Detect climbing state changes
        if (isClimbing && !previousState.wasClimbing) {
            // Spider started climbing
            previousState.climbingStartTime = Client.getTime();
            this.stats.climbingCount++;

            Chat.log(`&eSpider started climbing at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

            this.climbingEvents.push({
                spider: spider,
                startTime: Client.getTime(),
                startDistance: distance,
                health: health
            });

        } else if (!isClimbing && previousState.wasClimbing && previousState.climbingStartTime) {
            // Spider stopped climbing
            const climbingDuration = Client.getTime() - previousState.climbingStartTime;
            previousState.totalClimbingTime += climbingDuration;
            previousState.climbingStartTime = null;

            this.stats.climbingSessions.push(climbingDuration);
            this.updateAverageClimbingTime();

            Chat.log(`&7Spider stopped climbing after ${(climbingDuration/20).toFixed(1)}s`);
        }

        // Calculate movement speed
        const movementSpeed = pos.distanceTo(previousState.lastPosition);

        // Update tracking data
        const currentState = {
            spider: spider,
            isClimbing: isClimbing,
            isAttacking: isAttacking,
            distance: distance,
            health: health,
            healthPercentage: (health / maxHealth) * 100,
            movementSpeed: movementSpeed,
            wasClimbing: isClimbing,
            climbingStartTime: previousState.climbingStartTime,
            totalClimbingTime: previousState.totalClimbingTime,
            lastPosition: pos,
            lastUpdate: Client.getTime()
        };

        this.trackedSpiders.set(uuid, currentState);
        this.stats.totalSeen = Math.max(this.stats.totalSeen, this.trackedSpiders.size);

        return currentState;
    }

    updateAverageClimbingTime() {
        if (this.stats.climbingSessions.length > 0) {
            const sum = this.stats.climbingSessions.reduce((a, b) => a + b, 0);
            this.stats.averageClimbingTime = sum / this.stats.climbingSessions.length;
        }
    }

    generateThreatAssessment(spiderData) {
        let threatLevel = "low";
        let threatScore = 0;

        // Distance-based threat
        if (spiderData.distance <= 4) {
            threatScore += 50;
            threatLevel = "critical";
        } else if (spiderData.distance <= 8) {
            threatScore += 30;
            threatLevel = "high";
        } else if (spiderData.distance <= 12) {
            threatScore += 15;
            threatLevel = "medium";
        }

        // Climbing-based threat bonus
        if (spiderData.isClimbing) {
            threatScore += 25;
            if (spiderData.distance <= 8) {
                threatLevel = "critical"; // Climbing spiders are very dangerous up close
            }
        }

        // Attack state threat
        if (spiderData.isAttacking) {
            threatScore += 20;
        }

        // Health-based threat (healthier spiders are more dangerous)
        if (spiderData.healthPercentage > 75) {
            threatScore += 10;
        }

        return { threatLevel, threatScore };
    }

    getThreatColor(threatLevel) {
        switch (threatLevel) {
            case "critical": return 0xFF0000; // Red
            case "high": return 0xFF4444; // Light red
            case "medium": return 0xFF8800; // Orange
            case "low": return 0x00FF00; // Green
            default: return 0x808080; // Gray
        }
    }

    update() {
        const entities = World.getEntities();
        const currentSpiderUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:spider")) {
                const spider = entity;
                const uuid = spider.getUUID();
                currentSpiderUUIDs.add(uuid);

                const spiderData = this.analyzeSpider(spider);
                const threat = this.generateThreatAssessment(spiderData);
                const threatColor = this.getThreatColor(threat.threatLevel);

                // Apply visual indicators based on threat level
                if (threat.threatLevel !== "low") {
                    spider.setGlowing(true);
                    spider.setGlowingColor(threatColor);

                    // Show action bar for high-threat spiders
                    if (threat.threatLevel === "critical" || threat.threatLevel === "high") {
                        const climbingStatus = spiderData.isClimbing ? " (CLIMBING)" : "";
                        const healthStatus = ` ${Math.floor(spiderData.healthPercentage)}% HP`;
                        Chat.actionbar(`&cSpider Threat: ${threat.threatLevel.toUpperCase()}${climbingStatus}${healthStatus} - ${spiderData.distance.toFixed(1)}m`);
                    }
                } else {
                    spider.resetGlowing();
                }
            }
        });

        // Clean up removed spider data
        for (const [uuid, data] of this.trackedSpiders) {
            if (!currentSpiderUUIDs.has(uuid)) {
                const finalClimbingTime = data.totalClimbingTime;
                Chat.log(`&7Spider removed from tracking - Total climbing time: ${(finalClimbingTime/20).toFixed(1)}s`);
                this.trackedSpiders.delete(uuid);
            }
        }
    }

    generateReport() {
        Chat.log("=== Spider Behavior Analysis Report ===");
        Chat.log(`Total spiders tracked: ${this.stats.totalSeen}`);
        Chat.log(`Currently active spiders: ${this.trackedSpiders.size}`);
        Chat.log(`Spiders observed climbing: ${this.stats.climbingCount}`);

        if (this.stats.averageClimbingTime > 0) {
            Chat.log(`Average climbing session: ${(this.stats.averageClimbingTime/20).toFixed(1)}s`);
        }

        const climbingSpiders = Array.from(this.trackedSpiders.values()).filter(s => s.isClimbing);
        Chat.log(`Currently climbing: ${climbingSpiders.length}`);

        if (climbingSpiders.length > 0) {
            Chat.log("\nClimbing spiders:");
            climbingSpiders.forEach(spider => {
                const pos = spider.spider.getPos();
                Chat.log(`  - Distance: ${spider.distance.toFixed(1)}m at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            });
        }
    }
}

// Initialize and run the spider monitor
const spiderMonitor = new SpiderMonitor();

// Update monitoring every tick for real-time tracking
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    spiderMonitor.update();
}));

// Generate analysis report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        spiderMonitor.generateReport();
    }
}));

Chat.log("&aSpider Behavior Monitor activated - Tracking spider movement and climbing patterns");
```

### Spider Climbing Detection System
```js
// Advanced spider climbing detection and defense system
function detectSpiderClimbing() {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const entities = World.getEntities();
    const climbingSpiders = [];
    const threats = [];

    entities.forEach(entity => {
        if (entity.is("minecraft:spider")) {
            const spider = entity;
            const pos = entity.getPos();
            const distance = player.distanceTo(entity);
            const isClimbing = spider.isClimbing();
            const isAttacking = spider.isAttacking();

            // Analyze climbing patterns
            if (isClimbing) {
                climbingSpiders.push({
                    spider: spider,
                    position: pos,
                    distance: distance,
                    isAttacking: isAttacking,
                    height: pos.y - Math.floor(pos.y), // Height within block
                    health: spider.getHealth(),
                    maxHealth: spider.getMaxHealth()
                });

                // Assess threat level
                let threatLevel = "low";
                if (distance <= 8 && isClimbing) {
                    threatLevel = isAttacking ? "critical" : "high";
                } else if (distance <= 16 && isClimbing) {
                    threatLevel = "medium";
                }

                threats.push({
                    spider: spider,
                    threatLevel: threatLevel,
                    distance: distance,
                    position: pos
                });
            }
        }
    });

    // Sort threats by distance and severity
    threats.sort((a, b) => {
        const threatOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const aPriority = threatOrder[a.threatLevel];
        const bPriority = threatOrder[b.threatLevel];

        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }
        return a.distance - b.distance;
    });

    // Display climbing spider information
    if (climbingSpiders.length > 0) {
        Chat.log(`&6Spider Alert: ${climbingSpiders.length} spider${climbingSpiders.length > 1 ? 's are' : ' is'} climbing!`);

        climbingSpiders.forEach((spiderData, index) => {
            const healthPercentage = (spiderData.health / spiderData.maxHealth) * 100;
            Chat.log(`${index + 1}. &eClimbing Spider - Distance: ${spiderData.distance.toFixed(1)}m, Health: ${Math.floor(healthPercentage)}%, Attacking: ${spiderData.isAttacking}`);
        });

        // Show action bar for most immediate threat
        if (threats.length > 0) {
            const topThreat = threats[0];
            let threatMessage = "";

            switch (topThreat.threatLevel) {
                case "critical":
                    threatMessage = `&c&&lCRITICAL: Spider climbing and attacking! ${topThreat.distance.toFixed(1)}m`;
                    break;
                case "high":
                    threatMessage = `&e&&lHIGH THREAT: Spider climbing nearby! ${topThreat.distance.toFixed(1)}m`;
                    break;
                case "medium":
                    threatMessage = `&6CAUTION: Spider climbing in area ${topThreat.distance.toFixed(1)}m`;
                    break;
                default:
                    threatMessage = `Spider climbing detected ${topThreat.distance.toFixed(1)}m`;
            }

            Chat.actionbar(threatMessage);

            // Highlight the most dangerous spider
            topThreat.spider.setGlowing(true);
            topThreat.spider.setGlowingColor(0xFF0000); // Red for critical threats
        }
    }
}

// Run climbing detection every 3 ticks for good coverage without excessive calls
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 3 === 0) {
        detectSpiderClimbing();
    }
}));

Chat.log("&aSpider Climbing Detection System activated");
```

### Spider Defense Analysis
```js
// Analyze player defenses against climbing spiders
function analyzeSpiderDefenses() {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const playerBlockPos = player.getBlockPos();
    const entities = World.getEntities();

    // Find all spiders
    const spiders = entities.filter(entity => entity.is("minecraft:spider"));
    const climbingSpiders = spiders.filter(spider => spider.isClimbing());

    if (spiders.length === 0) {
        Chat.log("No spiders detected in the area");
        return;
    }

    Chat.log(`=== Spider Defense Analysis ===`);
    Chat.log(`Total spiders: ${spiders.length}`);
    Chat.log(`Climbing spiders: ${climbingSpiders.length} (${(climbingSpiders.length/spiders.length*100).toFixed(1)}%)`);

    // Analyze climbing spider positions relative to player
    let climbersAbove = 0;
    let climbersLevel = 0;
    let climbersBelow = 0;
    let closeClimbers = 0;

    climbingSpiders.forEach(spider => {
        const spiderPos = spider.getPos();
        const distance = player.distanceTo(spider);

        if (distance <= 16) closeClimbers++;

        if (spiderPos.y > playerPos.y + 2) {
            climbersAbove++;
        } else if (spiderPos.y >= playerPos.y - 1 && spiderPos.y <= playerPos.y + 2) {
            climbersLevel++;
        } else {
            climbersBelow++;
        }
    });

    Chat.log(`Climbing spiders by position:`);
    Chat.log(`  Above player: ${climbersAbove}`);
    Chat.log(`  Level with player: ${climbersLevel}`);
    Chat.log(`  Below player: ${climbersBelow}`);
    Chat.log(`  Within 16 blocks: ${closeClimbers}`);

    // Defense recommendations
    Chat.log("\n=== Defense Recommendations ===");

    if (closeClimbers > 0) {
        Chat.log("&c&&lIMMEDIATE ACTION REQUIRED:");
        Chat.log("- Climbing spiders are within attack range!");
        Chat.log("- Spiders can climb over most barriers");
        Chat.log("- Consider backing away to open terrain");
    }

    if (climbersAbove > 0) {
        Chat.log("&e&&lOVERHEAD THREAT:");
        Chat.log("- Spiders are climbing above your position");
        Chat.log("- Watch for ceiling attacks");
        Chat.log("- Consider moving to open areas");
    }

    if (climbersLevel > 0) {
        Chat.log("&6&&lDIRECTIONAL THREAT:");
        Chat.log("- Spiders climbing at your level");
        Chat.log("- Maintain distance and use ranged attacks");
        Chat.log("- Avoid corners where spiders can trap you");
    }

    // Barrier effectiveness analysis
    const totalClimbingRate = spiders.length > 0 ? (climbingSpiders.length / spiders.length) : 0;

    if (totalClimbingRate > 0.5) {
        Chat.log("\n&c&&lBARRIER ANALYSIS:");
        Chat.log("- High climbing rate detected!");
        Chat.log("- Your current location has poor spider defenses");
        Chat.log("- Spiders are actively using terrain to approach");
        Chat.log("- Consider moving to more defensible position");
    }

    // Player protection assessment
    const immediateThreats = climbingSpiders.filter(spider => player.distanceTo(spider) <= 8);

    if (immediateThreats.length > 0) {
        Chat.log("\n&4&&lSAFETY WARNING:");
        Chat.log(`- ${immediateThreats.length} climbing spider${immediateThreats.length > 1 ? 's are' : ' is'} in immediate range!`);
        Chat.log("- Conventional barriers may be ineffective");
        Chat.log("- Spiders can attack from unexpected angles");
        Chat.log("- Retreat to open terrain immediately");

        // Emergency highlighting
        immediateThreats.forEach(spider => {
            spider.setGlowing(true);
            spider.setGlowingColor(0xFF0000); // Red for emergency threats
        });
    }

    return {
        totalSpiders: spiders.length,
        climbingSpiders: climbingSpiders.length,
        closeClimbers: closeClimbers,
        immediateThreats: immediateThreats.length,
        climbingRate: totalClimbingRate
    };
}

// Run defense analysis every 10 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 200 === 0) { // Every 200 ticks (10 seconds)
        analyzeSpiderDefenses();
    }
}));

Chat.log("&aSpider Defense Analysis System activated");
```

## Notes and Limitations

- SpiderEntityHelper instances become invalid when the spider entity is removed from the world (killed, despawned, or unloaded). Always check `isAlive()` before accessing spider data.
- The `isClimbing()` method detects when spiders are actively climbing solid blocks, which includes walls, ceilings, and obstacles that would normally block other mobs.
- Spiders can climb virtually any solid block, making them one of the most versatile hostile mobs in terms of movement capabilities.
- Spider climbing behavior is not affected by daylight or other environmental conditions that normally affect spider spawning and activity.
- Visual effects like `setGlowing()` and `setGlowingColor()` are particularly useful for highlighting climbing spiders, as they can approach from unexpected angles.
- The inheritance hierarchy provides access to all mob and living entity methods, including attack states, AI detection, health monitoring, and status effects.
- Spider climbing detection is essential for base defense systems, as spiders can bypass many conventional wall-based defenses that work against other mobs.

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and attack states
- `LivingEntityHelper` - Living entity functionality including health, status effects, and equipment
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `StatusEffectHelper` - Status effect management (useful for detecting spider venom effects)
- `Pos3D` - Position and distance calculations for threat assessment
- `BlockPosHelper` - Block position analysis for climbing surface detection

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized mob helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft SpiderEntity implementation
- Inherits comprehensive functionality from the mob and living entity helper hierarchy
- Specifically designed to handle spider movement mechanics and climbing behavior detection