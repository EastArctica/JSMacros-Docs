# PhantomEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.PhantomEntityHelper`

**Extends:** `MobEntityHelper<PhantomEntity>`

**Since:** JsMacros 1.8.4

Represents a phantom entity in the world. PhantomEntityHelper provides access to phantom-specific properties and behaviors such as size variations and attack patterns. This class serves as a specialized helper for phantom entities, the flying hostile mobs that spawn during night and attack players.

Phantom entities are flying hostile mobs that appear in the Overworld after the player hasn't slept for at least three in-game days. They have unique behaviors like circling players, dive-bombing attacks, and varying sizes that affect their health and attack damage. This helper provides access to the specific phantom functionality beyond the general mob behaviors.

This class extends `MobEntityHelper` and inherits all methods for health, movement, AI control, and other mob properties, while adding phantom-specific functionality for size management and behavior tracking.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

PhantomEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`)
- World entity queries and type casting
- Methods that return phantom entities
- Type casting from EntityHelper using `entity.is("minecraft:phantom")` and appropriate casting methods

---

## Methods

## Usage Examples

### Phantom Size Analysis System
```js
// Comprehensive phantom tracking and size analysis
class PhantomTracker {
    constructor() {
        this.trackedPhantoms = new Map();
        this.sizeDistribution = { small: 0, medium: 0, large: 0 };
        this.totalPhantomsSeen = 0;
    }

    trackPhantom(entity) {
        const phantom = entity.asLiving();
        if (!phantom) return;

        const uuid = entity.getUUID();
        const name = entity.getName().getString();
        const pos = entity.getPos();
        const size = phantom.getSize();
        const health = phantom.getHealth();
        const maxHealth = phantom.getMaxHealth();

        if (!this.trackedPhantoms.has(uuid)) {
            // New phantom discovered
            this.trackedPhantoms.set(uuid, {
                entity: entity,
                name: name,
                size: size,
                firstSeen: Client.getTime(),
                lastPosition: pos,
                healthHistory: [health],
                attackCount: 0
            });

            this.totalPhantomsSeen++;

            // Update size distribution
            if (size <= 1) {
                this.sizeDistribution.small++;
            } else if (size === 2) {
                this.sizeDistribution.medium++;
            } else {
                this.sizeDistribution.large++;
            }

            Chat.log(`&6=== PHANTOM DETECTED ===`);
            Chat.log(`Name: ${name}`);
            Chat.log(`Size: ${size} (${this.getSizeDescription(size)})`);
            Chat.log(`Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
            Chat.log(`Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);

            // Size-based threat assessment
            const threatLevel = this.getThreatLevel(size);
            Chat.log(`Threat Level: ${threatLevel}`);

        } else {
            // Update existing phantom tracking
            const tracking = this.trackedPhantoms.get(uuid);
            tracking.lastPosition = pos;
            tracking.healthHistory.push(health);

            // Keep only last 10 health readings
            if (tracking.healthHistory.length > 10) {
                tracking.healthHistory.shift();
            }

            // Detect attack patterns
            if (phantom.isAttacking()) {
                tracking.attackCount++;
            }
        }
    }

    getSizeDescription(size) {
        switch(size) {
            case 0: return "Tiny";
            case 1: return "Small";
            case 2: return "Medium";
            case 3: return "Large";
            case 4: return "Huge";
            default: return "Unknown";
        }
    }

    getThreatLevel(size) {
        if (size <= 1) return "&aLow - Small and fast";
        if (size === 2) return "&eMedium - Balanced threat";
        return "&cHigh - Large and dangerous";
    }

    generateReport() {
        const activePhantoms = this.trackedPhantoms.size;

        Chat.log(`&6=== PHANTOM ANALYSIS REPORT ===`);
        Chat.log(`Active phantoms: ${activePhantoms}`);
        Chat.log(`Total phantoms seen: ${this.totalPhantomsSeen}`);

        Chat.log("\n=== Size Distribution ===");
        Chat.log(`Small (0-1): ${this.sizeDistribution.small} (${this.getPercentage(this.sizeDistribution.small)}%)`);
        Chat.log(`Medium (2): ${this.sizeDistribution.medium} (${this.getPercentage(this.sizeDistribution.medium)}%)`);
        Chat.log(`Large (3-4): ${this.sizeDistribution.large} (${this.getPercentage(this.sizeDistribution.large)}%)`);

        if (activePhantoms > 0) {
            Chat.log("\n=== Active Phantom Details ===");
            for (const [uuid, tracking] of this.trackedPhantoms) {
                const age = (Client.getTime() - tracking.firstSeen) / 20; // seconds
                const recentHealth = tracking.healthHistory.slice(-3);
                const healthTrend = this.getHealthTrend(recentHealth);

                Chat.log(`${tracking.name} (Size ${tracking.size}): ${age.toFixed(0)}s old, ${healthTrend}`);

                if (tracking.attackCount > 0) {
                    Chat.log(`  Attack attempts: ${tracking.attackCount}`);
                }
            }
        }
    }

    getPercentage(count) {
        if (this.totalPhantomsSeen === 0) return "0";
        return ((count / this.totalPhantomsSeen) * 100).toFixed(1);
    }

    getHealthTrend(healthValues) {
        if (healthValues.length < 2) return "Health: Stable";

        const first = healthValues[0];
        const last = healthValues[healthValues.length - 1];
        const change = last - first;

        if (Math.abs(change) < 0.5) return `Health: Stable (${last.toFixed(1)})`;
        if (change > 0) return `Health: +${change.toFixed(1)} (${last.toFixed(1)})`;
        return `Health: ${change.toFixed(1)} (${last.toFixed(1)})`;
    }

    cleanup() {
        // Remove tracking for dead entities
        for (const [uuid, tracking] of this.trackedPhantoms) {
            if (!tracking.entity.isAlive()) {
                Chat.log(`&7Phantom ${tracking.name} has been eliminated`);
                this.trackedPhantoms.delete(uuid);
            }
        }
    }
}

const phantomTracker = new PhantomTracker();

// Track phantoms every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const range = 128; // Track phantoms within 128 blocks

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= range && entity.is("minecraft:phantom")) {
            phantomTracker.trackPhantom(entity);
        }
    });

    // Cleanup every 5 seconds
    if (Client.getTime() % 100 === 0) {
        phantomTracker.cleanup();
    }
}));

// Generate report every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 1200 === 0) {
        phantomTracker.generateReport();
    }
}));
```

### Phantom Size-Based Combat Strategy
```js
// Adaptive combat strategies based on phantom size
class PhantomCombatStrategy {
    constructor() {
        this.strategies = new Map();
        this.initializeStrategies();
    }

    initializeStrategies() {
        // Strategies for different phantom sizes
        this.strategies.set(0, {
            name: "Tiny Phantom",
            color: "&2",
            tactics: [
                "Use rapid attacks - they're fast but fragile",
                "Bow attacks are very effective",
                "Dodge their quick dive attacks",
                "Can be killed with 2-3 good hits"
            ],
            priority: "Low"
        });

        this.strategies.set(1, {
            name: "Small Phantom",
            color: "&a",
            tactics: [
                "Medium speed and health",
                "Standard combat tactics work well",
                "Shield blocks are effective",
                "Mix of melee and ranged attacks"
            ],
            priority: "Low-Medium"
        });

        this.strategies.set(2, {
            name: "Medium Phantom",
            color: "&e",
            tactics: [
                "Balanced stats - use standard combat",
                "Watch for circling patterns",
                "Timing is key for dodging dives",
                "5-6 hits with sword typically"
            ],
            priority: "Medium"
        });

        this.strategies.set(3, {
            name: "Large Phantom",
            color: "&6",
            tactics: [
                "High health - use powerful attacks",
                "Critical hits are very effective",
                "Keep distance when possible",
                "Use bow for safe damage"
            ],
            priority: "High"
        });

        this.strategies.set(4, {
            name: "Huge Phantom",
            color: "&c",
            tactics: [
                "Very dangerous - maximum threat",
                "Use enchanted weapons if available",
                "Consider running if unequipped",
                "Requires 8+ hits to defeat"
            ],
            priority: "Very High"
        });
    }

    analyzePhantom(phantom, distance) {
        const size = phantom.getSize();
        const strategy = this.strategies.get(size);

        if (!strategy) return;

        const health = phantom.getHealth();
        const maxHealth = phantom.getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;

        Chat.log(`${strategy.color}=== PHANTOM COMBAT ANALYSIS ===`);
        Chat.log(`Type: ${strategy.name} (Size ${size})`);
        Chat.log(`Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)} (${healthPercent.toFixed(0)}%)`);
        Chat.log(`Distance: ${distance.toFixed(1)} blocks`);
        Chat.log(`Threat Priority: ${strategy.priority}`);

        Chat.log("\n&fRecommended Tactics:");
        strategy.tactics.forEach((tactic, index) => {
            Chat.log(`  ${index + 1}. ${tactic}`);
        });

        // Additional tactical advice based on context
        this.provideContextualAdvice(phantom, distance, healthPercent);
    }

    provideContextualAdvice(phantom, distance, healthPercent) {
        const player = Player.getPlayer();
        if (!player) return;

        const playerHealth = player.getHealth();
        const playerMaxHealth = player.getMaxHealth();
        const playerHealthPercent = (playerHealth / playerMaxHealth) * 100;

        Chat.log("\n&6Contextual Advice:");

        // Distance-based advice
        if (distance > 20) {
            Chat.log("  &7Far away - prepare with bow or wait for approach");
        } else if (distance > 10) {
            Chat.log("  &7Medium range - good for bow attacks");
        } else {
            Chat.log("  &7Close range - ready your sword and shield!");
        }

        // Health-based advice
        if (playerHealthPercent < 50) {
            Chat.log("  &cLow health - consider retreating!");
        } else if (playerHealthPercent < 75) {
            Chat.log("  &eMedium health - be cautious!");
        }

        // Phantom health advice
        if (healthPercent < 25) {
            Chat.log("  &aPhantom almost defeated - finish it!");
        } else if (healthPercent > 75) {
            Chat.log("  &cFull health phantom - be ready for a tough fight");
        }

        // Time of day advice
        const worldTime = World.getTime() % 24000;
        const isNight = worldTime >= 13000 && worldTime <= 23000;

        if (!isNight) {
            Chat.log("  &7Phantom during day - will burn in sunlight!");
        }
    }

    getCombatSummary() {
        Chat.log("&6=== PHANTOM COMBAT GUIDE ===");

        for (const [size, strategy] of this.strategies) {
            Chat.log(`${strategy.color}${strategy.name} (Size ${size}): ${strategy.priority}`);
            Chat.log(`  ${strategy.tactics[0]}`);
        }

        Chat.log("\n&fGeneral Tips:");
        Chat.log("  • Phantoms burn in daylight");
        Chat.log("  • Shields can block dive attacks");
        Chat.log("  • Critical hits deal extra damage");
        Chat.log("  • Phantom size affects attack patterns");
    }
}

const combatStrategy = new PhantomCombatStrategy();

// Analyze phantoms when they get close
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const range = 30; // Combat range

    entities.forEach(entity => {
        if (entity.is("minecraft:phantom")) {
            const distance = player.distanceTo(entity);

            if (distance <= range) {
                const phantom = entity.asLiving();
                if (phantom) {
                    combatStrategy.analyzePhantom(phantom, distance);
                }
            }
        }
    });
}));

// Display combat guide on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.h" && e.action === 1) { // H key
        combatStrategy.getCombatSummary();
    }
}));
```

### Phantom Spawn and Behavior Monitoring
```js
// Monitor phantom spawning patterns and environmental conditions
class PhantomBehaviorMonitor {
    constructor() {
        this.spawnEvents = [];
        this.environmentalData = [];
        this.sizePatterns = new Map();
        this.activityPatterns = new Map();
    }

    recordSpawn(entity) {
        const phantom = entity.asLiving();
        if (!phantom) return;

        const spawnData = {
            time: Client.getTime(),
            worldTime: World.getTime(),
            position: entity.getPos(),
            size: phantom.getSize(),
            health: phantom.getHealth(),
            biome: entity.getBiome(),
            weather: this.getWeatherConditions(),
            moonPhase: this.getMoonPhase(),
            playerSleepStatus: this.getPlayerSleepStatus()
        };

        this.spawnEvents.push(spawnData);
        this.analyzeSpawnPattern(spawnData);

        Chat.log(`&b=== PHANTOM SPAWN DETECTED ===`);
        Chat.log(`Size: ${spawnData.size} - Health: ${spawnData.health.toFixed(1)}`);
        Chat.log(`Biome: ${spawnData.biome}`);
        Chat.log(`Time: Day ${Math.floor(spawnData.worldTime / 24000)}, ${this.getTimeOfDay(spawnData.worldTime)}`);
        Chat.log(`Weather: ${spawnData.weather}`);
        Chat.log(`Moon Phase: ${spawnData.moonPhase}`);
        Chat.log(`Player Sleep: ${spawnData.playerSleepStatus}`);
    }

    getWeatherConditions() {
        // Check for rain/thunder
        const world = World.getWorld();
        const isRaining = world.isRaining();
        const isThundering = world.isThundering();

        if (isThundering) return "Thunderstorm";
        if (isRaining) return "Rain";
        return "Clear";
    }

    getMoonPhase() {
        const moonPhase = Math.floor((World.getTime() / 24000) % 8) % 8;
        const moonNames = ["Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent",
                          "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous"];
        return moonNames[moonPhase];
    }

    getTimeOfDay(worldTime) {
        const timeOfDay = worldTime % 24000;
        if (timeOfDay < 1000) return "Dawn";
        if (timeOfDay < 6000) return "Morning";
        if (timeOfDay < 12000) return "Noon";
        if (timeOfDay < 13000) return "Afternoon";
        if (timeOfDay < 18000) return "Evening";
        if (timeOfDay < 19000) return "Dusk";
        return "Night";
    }

    getPlayerSleepStatus() {
        // This would need access to server/player sleep data
        // For now, assume no recent sleep for phantom spawning
        return "No recent sleep (phantom spawning enabled)";
    }

    analyzeSpawnPattern(spawnData) {
        // Track size patterns by biome
        if (!this.sizePatterns.has(spawnData.biome)) {
            this.sizePatterns.set(spawnData.biome, { small: 0, medium: 0, large: 0 });
        }

        const biomeSizes = this.sizePatterns.get(spawnData.biome);
        if (spawnData.size <= 1) biomeSizes.small++;
        else if (spawnData.size === 2) biomeSizes.medium++;
        else biomeSizes.large++;

        // Track activity patterns by time
        const timeSlot = Math.floor((spawnData.worldTime % 24000) / 2000); // 2-hour slots
        if (!this.activityPatterns.has(timeSlot)) {
            this.activityPatterns.set(timeSlot, 0);
        }
        this.activityPatterns.set(timeSlot, this.activityPatterns.get(timeSlot) + 1);
    }

    generateSpawnAnalysis() {
        if (this.spawnEvents.length === 0) {
            Chat.log("No phantom spawn data available");
            return;
        }

        Chat.log("&b=== PHANTOM SPAWN ANALYSIS ===");
        Chat.log(`Total phantom spawns recorded: ${this.spawnEvents.length}`);

        // Size distribution analysis
        Chat.log("\n=== Size Distribution ===");
        let smallCount = 0, mediumCount = 0, largeCount = 0;

        this.spawnEvents.forEach(spawn => {
            if (spawn.size <= 1) smallCount++;
            else if (spawn.size === 2) mediumCount++;
            else largeCount++;
        });

        Chat.log(`Small (0-1): ${smallCount} (${((smallCount/this.spawnEvents.length)*100).toFixed(1)}%)`);
        Chat.log(`Medium (2): ${mediumCount} (${((mediumCount/this.spawnEvents.length)*100).toFixed(1)}%)`);
        Chat.log(`Large (3-4): ${largeCount} (${((largeCount/this.spawnEvents.length)*100).toFixed(1)}%)`);

        // Biome analysis
        Chat.log("\n=== Spawns by Biome ===");
        for (const [biome, sizes] of this.sizePatterns) {
            const total = sizes.small + sizes.medium + sizes.large;
            Chat.log(`${biome}: ${total} spawns (S:${sizes.small} M:${sizes.medium} L:${sizes.large})`);
        }

        // Time-based activity
        Chat.log("\n=== Spawn Activity by Time ===");
        const timeSlots = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM", "12AM", "2AM", "4AM"];
        for (let i = 0; i < timeSlots.length; i++) {
            const count = this.activityPatterns.get(i) || 0;
            if (count > 0) {
                Chat.log(`${timeSlots[i]}: ${count} spawns`);
            }
        }

        // Weather and moon phase analysis
        this.analyzeEnvironmentalFactors();
    }

    analyzeEnvironmentalFactors() {
        const weatherPatterns = { clear: 0, rain: 0, thunder: 0 };
        const moonPatterns = new Map();

        this.spawnEvents.forEach(spawn => {
            // Weather patterns
            if (spawn.weather === "Clear") weatherPatterns.clear++;
            else if (spawn.weather === "Rain") weatherPatterns.rain++;
            else weatherPatterns.thunder++;

            // Moon phase patterns
            if (!moonPatterns.has(spawn.moonPhase)) {
                moonPatterns.set(spawn.moonPhase, 0);
            }
            moonPatterns.set(spawn.moonPhase, moonPatterns.get(spawn.moonPhase) + 1);
        });

        Chat.log("\n=== Weather Conditions During Spawns ===");
        Chat.log(`Clear: ${weatherPatterns.clear}`);
        Chat.log(`Rain: ${weatherPatterns.rain}`);
        Chat.log(`Thunder: ${weatherPatterns.thunder}`);

        Chat.log("\n=== Moon Phase Distribution ===");
        for (const [moonPhase, count] of moonPatterns) {
            Chat.log(`${moonPhase}: ${count} spawns`);
        }
    }

    clearData() {
        this.spawnEvents = [];
        this.sizePatterns.clear();
        this.activityPatterns.clear();
        Chat.log("Phantom spawn data cleared");
    }
}

const phantomMonitor = new PhantomBehaviorMonitor();

// Record phantom spawns
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:phantom")) {
        phantomMonitor.recordSpawn(entity);
    }
}));

// Generate periodic reports
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 6000 === 0) { // Every 5 minutes
        phantomMonitor.generateSpawnAnalysis();
    }
}));

// Manual report trigger
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.p" && e.action === 1) { // P key
        phantomMonitor.generateSpawnAnalysis();
    }
}));

// Clear data trigger
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.shift" && e.key === "key.keyboard.p" && e.action === 1) { // Shift+P
        phantomMonitor.clearData();
    }
}));
```

### Phantom Size-Based Alert System
```js
// Alert system with different priorities based on phantom size
class PhantomAlertSystem {
    constructor() {
        this.alertCooldowns = new Map();
        this.sizeAlertSettings = {
            0: { color: "&2", sound: "low", message: "Tiny phantom detected" },
            1: { color: "&a", sound: "low", message: "Small phantom nearby" },
            2: { color: "&e", sound: "medium", message: "Medium phantom - be ready" },
            3: { color: "&6", sound: "high", message: "Large phantom - danger!" },
            4: { color: "&c", sound: "critical", message: "HUGE PHANTOM - EXTREME DANGER!" }
        };
    }

    checkPhantom(entity, distance) {
        const phantom = entity.asLiving();
        if (!phantom) return;

        const size = phantom.getSize();
        const settings = this.sizeAlertSettings[size];
        const uuid = entity.getUUID();

        // Check cooldown for this phantom
        const now = Client.getTime();
        const lastAlert = this.alertCooldowns.get(uuid) || 0;

        if (now - lastAlert < 100) { // 5 second cooldown
            return;
        }

        this.alertCooldowns.set(uuid, now);

        // Create size-appropriate alert
        this.createAlert(settings, entity, distance, size);
    }

    createAlert(settings, entity, distance, size) {
        const name = entity.getName().getString();
        const pos = entity.getPos();
        const health = entity.asLiving().getHealth();

        // Multi-level alert system
        this.sendChatAlert(settings, name, distance, size, health);
        this.sendActionBarAlert(settings, distance);
        this.playSoundAlert(settings);
        this.createVisualAlert(settings, entity);
    }

    sendChatAlert(settings, name, distance, size, health) {
        Chat.log(`${settings.color}=== PHANTOM ALERT ===`);
        Chat.log(`${settings.message} (${name})`);
        Chat.log(`Size: ${size} | Health: ${health.toFixed(1)} | Distance: ${distance.toFixed(1)}m`);

        // Size-specific warnings
        if (size >= 3) {
            Chat.log(`${settings.color}WARNING: Large phantoms are very dangerous!`);
            Chat.log("Use enchanted weapons and keep your distance!");
        }
    }

    sendActionBarAlert(settings, distance) {
        let urgency = "";
        if (distance < 10) urgency = "IMMEDIATE";
        else if (distance < 20) urgency = "CLOSE";
        else if (distance < 40) urgency = "NEARBY";
        else urgency = "DISTANT";

        Chat.actionbar(`${settings.color}${settings.message} - ${urgency} (${distance.toFixed(0)}m)`);
    }

    playSoundAlert(settings) {
        // Sound alerts would depend on available sound system
        // For now, we'll use visual indicators
        if (settings.sound === "critical") {
            Chat.log("&c‼️‼️‼️ CRITICAL PHANTOM DETECTED ‼️‼️‼️");
        } else if (settings.sound === "high") {
            Chat.log("&6⚠️⚠️ HIGH THREAT PHANTOM ⚠️⚠️");
        }
    }

    createVisualAlert(settings, entity) {
        // You could use highlighting systems here
        // For example, make the phantom glow
        entity.setGlowing(true);

        // Set color based on size
        const colors = {
            0: 0x00FF00, // Green for tiny
            1: 0x80FF00, // Yellow-green for small
            2: 0xFFFF00, // Yellow for medium
            3: 0xFF8000, // Orange for large
            4: 0xFF0000  // Red for huge
        };

        entity.setGlowingColor(colors[entity.asLiving().getSize()]);
    }

    configureAlerts() {
        Chat.log("&b=== Phantom Alert Configuration ===");
        Chat.log("Size 0 (Tiny): &2Green alerts - low priority");
        Chat.log("Size 1 (Small): &aGreen alerts - low priority");
        Chat.log("Size 2 (Medium): &eYellow alerts - medium priority");
        Chat.log("Size 3 (Large): &6Orange alerts - high priority");
        Chat.log("Size 4 (Huge): &cRed alerts - critical priority");
        Chat.log("\nAlerts include:");
        Chat.log("• Chat notifications with detailed information");
        Chat.log("• Action bar alerts for quick awareness");
        Chat.log("• Visual highlighting with size-specific colors");
        Chat.log("• 5-second cooldown per phantom to prevent spam");
    }

    reset() {
        this.alertCooldowns.clear();
        Chat.log("Phantom alert cooldowns reset");
    }
}

const alertSystem = new PhantomAlertSystem();

// Monitor for phantoms and create alerts
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const alertRange = 64; // Alert range

    entities.forEach(entity => {
        if (entity.is("minecraft:phantom")) {
            const distance = player.distanceTo(entity);
            if (distance <= alertRange) {
                alertSystem.checkPhantom(entity, distance);
            } else {
                // Remove glow if out of range
                entity.resetGlowing();
            }
        }
    });
}));

// Configure alerts on startup
alertSystem.configureAlerts();

// Manual alert configuration
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.a" && e.action === 1) { // A key
        alertSystem.configureAlerts();
    }
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if phantom is currently attacking
- `isAiDisabled()` - Check if phantom's AI is disabled
- All other mob-specific methods for behavior control

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (varies by size)
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information
- `getArmor()` - Armor value
- `isBaby()` - Check if phantom is a baby variant

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks
- `getVelocity()`, `getSpeed()` - Movement information
- `rayTraceBlock()`, `rayTraceEntity()` - Raytracing methods

---

## Notes and Limitations

- PhantomEntityHelper provides access to phantom-specific behaviors beyond general mob functionality
- The `getSize()` method is crucial for understanding phantom strength and behavior patterns
- Phantom size directly affects health points, attack damage, and collision box size
- Size 0 phantoms are the smallest and fastest, while size 4 phantoms are the largest and most dangerous
- Phantoms spawn after players haven't slept for at least 3 in-game days
- Phantom spawning is affected by the current moon phase and player location
- Phantoms will burn in sunlight unless they are in shade or water
- Size-based attack patterns: smaller phantoms are more agile, larger phantoms hit harder
- Phantom size cannot be changed after spawning - it's determined at creation time
- Multiple phantoms can attack simultaneously, with coordinated diving patterns
- Phantoms have a complex AI that includes circling, diving, and retreat behaviors

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behaviors
- `LivingEntityHelper` - Base class with health, movement, and status effects
- `EntityHelper` - Base class with general entity methods
- `BatEntityHelper` - Another flying mob helper for comparison
- `PlayerEntityHelper` - Player-related functionality for combat interactions
- `StatusEffectHelper` - For monitoring phantom status effects

---

## Version Information

- Available since JSMacros 1.8.4
- Extends MobEntityHelper functionality with phantom-specific behaviors
- Part of the specialized entity helper hierarchy for comprehensive phantom interaction
- Supports all phantom behaviors including size variations and attack patterns
- Integrated with JSMacros entity tracking and event systems