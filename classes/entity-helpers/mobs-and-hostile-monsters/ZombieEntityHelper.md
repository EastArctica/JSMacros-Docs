# ZombieEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.ZombieEntityHelper<T extends ZombieEntity>`

**Extends:** `MobEntityHelper<T>`

Represents a zombie entity in the world. ZombieEntityHelper provides access to zombie-specific properties and behaviors such as drowned conversion states. This class serves as a specialized helper for all zombie variants including regular zombies, husks, and other zombie types.

Zombie entities are hostile mobs that attack players and villagers on sight. They have unique behaviors like burning in sunlight, converting to drowned when underwater, and being able to break down wooden doors. This helper provides access to the specific zombie functionality beyond the general mob behaviors.

This class extends `MobEntityHelper` and inherits all methods for health, movement, AI control, and other mob properties, while adding zombie-specific functionality.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

ZombieEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`)
- World entity queries and type casting
- Methods that return zombie entities
- Type casting from EntityHelper using `as("minecraft:zombie")` or appropriate casting methods

---

## Methods

## Usage Examples

### Zombie Conversion Detection System
```js
// Comprehensive zombie monitoring and conversion tracking
class ZombieConversionTracker {
    constructor() {
        this.convertingZombies = new Map();
        this.conversionAlerts = new Set();
    }

    trackZombie(entity) {
        const zombie = entity.asLiving();
        if (!zombie) return;

        const uuid = entity.getUUID();
        const name = entity.getName().getString();
        const pos = entity.getPos();
        const isConverting = zombie.isConvertingToDrowned();

        if (isConverting) {
            if (!this.convertingZombies.has(uuid)) {
                // New conversion started
                this.convertingZombies.set(uuid, {
                    entity: entity,
                    name: name,
                    startTime: Client.getTime(),
                    startPosition: pos,
                    lastPosition: pos,
                    totalMovement: 0
                });

                Chat.log(`&c=== ZOMBIE CONVERSION STARTED ===`);
                Chat.log(`Entity: ${name}`);
                Chat.log(`Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
                Chat.log(`Time: ${new Date().toLocaleTimeString()}`);

                // Send alert if this is the first time we see this conversion
                const alertKey = `${name}_${Math.floor(pos.x/16)}_${Math.floor(pos.z/16)}`;
                if (!this.conversionAlerts.has(alertKey)) {
                    Chat.actionbar("&c⚠️ Zombie conversion detected nearby!");
                    this.conversionAlerts.add(alertKey);
                }
            } else {
                // Update existing conversion tracking
                const tracking = this.convertingZombies.get(uuid);
                tracking.lastPosition = pos;

                // Calculate movement during conversion
                const movement = pos.distanceTo(tracking.lastPosition);
                tracking.totalMovement += movement;

                const conversionDuration = (Client.getTime() - tracking.startTime) / 20; // Convert to seconds

                // Periodic updates during conversion
                if (Client.getTime() % 40 === 0) { // Every 2 seconds
                    Chat.actionbar(`&6${name} converting... ${conversionDuration.toFixed(1)}s`);
                }
            }
        } else {
            // Check if a conversion just completed or was interrupted
            if (this.convertingZombies.has(uuid)) {
                const tracking = this.convertingZombies.get(uuid);
                const conversionDuration = (Client.getTime() - tracking.startTime) / 20;

                // Check if the entity still exists and is now a drowned
                if (entity.isAlive() && entity.getType() === "minecraft:drowned") {
                    Chat.log(`&a=== ZOMBIE CONVERSION COMPLETED ===`);
                    Chat.log(`Entity: ${name} → Drowned`);
                    Chat.log(`Duration: ${conversionDuration.toFixed(1)} seconds`);
                    Chat.log(`Movement during conversion: ${tracking.totalMovement.toFixed(1)} blocks`);
                } else if (!entity.isAlive()) {
                    Chat.log(`&7=== ZOMBIE CONVERSION INTERRUPTED ===`);
                    Chat.log(`Entity: ${name} died during conversion`);
                    Chat.log(`Duration: ${conversionDuration.toFixed(1)} seconds`);
                } else {
                    Chat.log(`&e=== ZOMBIE CONVERSION CANCELLED ===`);
                    Chat.log(`Entity: ${name} stopped converting (possibly left water)`);
                    Chat.log(`Duration: ${conversionDuration.toFixed(1)} seconds`);
                }

                this.convertingZombies.delete(uuid);
            }
        }
    }

    generateReport() {
        const activeConversions = this.convertingZombies.size;
        if (activeConversions > 0) {
            Chat.log(`&6=== Active Zombie Conversions: ${activeConversions} ===`);

            for (const [uuid, tracking] of this.convertingZombies) {
                const duration = (Client.getTime() - tracking.startTime) / 20;
                const currentPos = tracking.entity.getPos();
                const distance = currentPos.distanceTo(tracking.startPosition);

                Chat.log(`  ${tracking.name}: ${duration.toFixed(1)}s, moved ${distance.toFixed(1)} blocks`);
            }
        }
    }

    cleanup() {
        // Remove tracking for dead entities
        for (const [uuid, tracking] of this.convertingZombies) {
            if (!tracking.entity.isAlive()) {
                Chat.log(`&7Stopped tracking ${tracking.name} - entity removed`);
                this.convertingZombies.delete(uuid);
            }
        }
    }
}

const zombieTracker = new ZombieConversionTracker();

// Track zombies every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const range = 64; // Track zombies within 64 blocks

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= range && entity.is("minecraft:zombie", "minecraft:husk", "minecraft:drowned")) {
            zombieTracker.trackZombie(entity);
        }
    });

    // Cleanup every 5 seconds
    if (Client.getTime() % 100 === 0) {
        zombieTracker.cleanup();
    }
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 600 === 0) {
        zombieTracker.generateReport();
    }
}));
```

### Zombie Behavior Analysis
```js
// Analyze zombie behaviors and environmental conditions
function analyzeZombieBehavior() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const zombies = entities.filter(entity => entity.is("minecraft:zombie"));

    if (zombies.length === 0) {
        Chat.log("No zombies found in the area");
        return;
    }

    Chat.log(`=== Zombie Behavior Analysis (${zombies.length} zombies) ===`);

    const stats = {
        total: zombies.length,
        converting: 0,
        inWater: 0,
        onFire: 0,
        duringDay: 0,
        byDistance: { near: 0, medium: 0, far: 0 }
    };

    zombies.forEach(zombie => {
        const living = zombie.asLiving();
        const distance = player.distanceTo(zombie);
        const pos = zombie.getPos();

        // Track conversion state
        if (living && living.isConvertingToDrowned()) {
            stats.converting++;
            Chat.log(`  &c⚠️ Converting zombie: ${zombie.getName().getString()} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
        }

        // Environmental conditions
        if (zombie.isInWater()) {
            stats.inWater++;
        }

        if (zombie.isOnFire()) {
            stats.onFire++;
        }

        // Check if it's daytime (zombies should burn)
        const worldTime = World.getTime();
        const isDaytime = worldTime % 24000 < 12000;
        if (isDaytime) {
            stats.duringDay++;
        }

        // Distance categories
        if (distance <= 16) stats.byDistance.near++;
        else if (distance <= 48) stats.byDistance.medium++;
        else stats.byDistance.far++;

        // Detailed logging for nearby zombies
        if (distance <= 32) {
            const status = [];
            if (living && living.isConvertingToDrowned()) status.push("Converting");
            if (zombie.isInWater()) status.push("In Water");
            if (zombie.isOnFire()) status.push("On Fire");
            if (living && living.isAttacking()) status.push("Attacking");

            Chat.log(`  ${zombie.getName().getString()}: ${distance.toFixed(1)}m - ${status.join(", ") || "Normal"}`);
        }
    });

    // Summary statistics
    Chat.log("\n=== Summary ===");
    Chat.log(`Total zombies: ${stats.total}`);
    Chat.log(`Converting to drowned: ${stats.converting} (${((stats.converting/stats.total)*100).toFixed(1)}%)`);
    Chat.log(`Currently in water: ${stats.inWater} (${((stats.inWater/stats.total)*100).toFixed(1)}%)`);
    Chat.log(`Currently on fire: ${stats.onFire} (${((stats.onFire/stats.total)*100).toFixed(1)}%)`);
    Chat.log(`Active during day: ${stats.duringDay} (${((stats.duringDay/stats.total)*100).toFixed(1)}%)`);

    Chat.log("\nBy Distance:");
    Chat.log(`  Near (≤16m): ${stats.byDistance.near}`);
    Chat.log(`  Medium (16-48m): ${stats.byDistance.medium}`);
    Chat.log(`  Far (>48m): ${stats.byDistance.far}`);

    // Warnings for dangerous situations
    if (stats.converting > 0) {
        Chat.log(`\n&c⚠️ Warning: ${stats.converting} zombie(s) converting to drowned!`);
    }

    if (stats.byDistance.near > 5) {
        Chat.log(`\n&e⚠️ High zombie density nearby: ${stats.byDistance.near} zombies within 16 blocks`);
    }
}

analyzeZombieBehavior();
```

### Zombie Conversion Timer and Alert System
```js
// Real-time zombie conversion monitoring with precise timing
class ConversionTimer {
    constructor() {
        this.activeConversions = new Map();
        this.alertCooldowns = new Map();
    }

    updateConversion(entity) {
        const zombie = entity.asLiving();
        if (!zombie) return;

        const uuid = entity.getUUID();
        const isConverting = zombie.isConvertingToDrowned();

        if (isConverting) {
            if (!this.activeConversions.has(uuid)) {
                // Start new conversion timer
                this.activeConversions.set(uuid, {
                    entity: entity,
                    startTime: Client.getTime(),
                    lastAlert: 0,
                    conversionProgress: 0
                });

                Chat.log(`&e🔄 ${entity.getName().getString()} started converting to drowned`);
            } else {
                // Update existing conversion
                const conversion = this.activeConversions.get(uuid);
                const elapsed = Client.getTime() - conversion.startTime;
                const progress = Math.min((elapsed / 600) * 100, 100); // 30 seconds = 600 ticks

                conversion.conversionProgress = progress;
                conversion.lastUpdate = Client.getTime();

                // Progress alerts
                const currentTime = Client.getTime();
                if (currentTime - conversion.lastAlert >= 100) { // Alert every 5 seconds
                    const timeRemaining = Math.max(0, 30 - (elapsed / 20));
                    Chat.actionbar(`&6Converting: ${progress.toFixed(0)}% (${timeRemaining.toFixed(0)}s remaining)`);
                    conversion.lastAlert = currentTime;
                }

                // Final conversion alert
                if (progress >= 100 && conversion.conversionProgress < 100) {
                    Chat.actionbar("&a✓ Conversion complete!");
                }
            }
        } else {
            // Conversion ended or entity died
            if (this.activeConversions.has(uuid)) {
                const conversion = this.activeConversions.get(uuid);
                const duration = (Client.getTime() - conversion.startTime) / 20;

                if (!entity.isAlive()) {
                    Chat.log(`&7❌ ${entity.getName().getString()} died during conversion (${duration.toFixed(1)}s)`);
                } else if (entity.getType() === "minecraft:drowned") {
                    Chat.log(`&a✓ ${entity.getName().getString()} successfully converted to drowned (${duration.toFixed(1)}s)`);
                } else {
                    Chat.log(`&e⏹ ${entity.getName().getString()} conversion cancelled (${duration.toFixed(1)}s)`);
                }

                this.activeConversions.delete(uuid);
            }
        }
    }

    getStatusReport() {
        if (this.activeConversions.size === 0) {
            Chat.log("No active zombie conversions");
            return;
        }

        Chat.log(`&6=== Active Conversions (${this.activeConversions.size}) ===`);

        for (const [uuid, conversion] of this.activeConversions) {
            const entity = conversion.entity;
            const elapsed = (Client.getTime() - conversion.startTime) / 20;
            const timeRemaining = Math.max(0, 30 - elapsed);

            Chat.log(`  ${entity.getName().getString()}: ${conversion.conversionProgress.toFixed(0)}% - ${timeRemaining.toFixed(0)}s remaining`);
        }
    }
}

const conversionTimer = new ConversionTimer();

// Monitor conversions every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const range = 48;

    entities.forEach(entity => {
        if (entity.is("minecraft:zombie") && player.distanceTo(entity) <= range) {
            conversionTimer.updateConversion(entity);
        }
    });
}));

// Status command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.k" && e.action === 1) { // K key
        conversionTimer.getStatusReport();
    }
}));
```

### Environmental Interaction Analysis
```js
// Analyze how zombies interact with their environment
function analyzeZombieEnvironment() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const zombies = entities.filter(entity => entity.is("minecraft:zombie"));

    if (zombies.length === 0) {
        Chat.log("No zombies found for environmental analysis");
        return;
    }

    Chat.log("=== Zombie Environmental Analysis ===");

    let zombiesInWater = 0;
    let zombiesConverting = 0;
    let zombiesNearWater = 0;
    let zombiesUnderground = 0;
    let zombiesDuringDay = 0;

    zombies.forEach(zombie => {
        const living = zombie.asLiving();
        const pos = zombie.getPos();
        const blockPos = zombie.getBlockPos();

        // Check conversion state
        if (living && living.isConvertingToDrowned()) {
            zombiesConverting++;
        }

        // Check water interactions
        if (zombie.isInWater()) {
            zombiesInWater++;

            // Check water depth
            let waterDepth = 0;
            let checkY = blockPos.getY();

            while (checkY > 0) {
                const block = World.getBlock(blockPos.getX(), checkY, blockPos.getZ());
                if (block && block.getType().includes("water")) {
                    waterDepth++;
                    checkY--;
                } else {
                    break;
                }
            }

            Chat.log(`  ${zombie.getName().getString()}: In ${waterDepth} blocks deep water`);
        } else {
            // Check if near water (within 3 blocks)
            let nearWater = false;
            for (let dx = -3; dx <= 3; dx++) {
                for (let dy = -2; dy <= 2; dy++) {
                    for (let dz = -3; dz <= 3; dz++) {
                        const block = World.getBlock(blockPos.getX() + dx, blockPos.getY() + dy, blockPos.getZ() + dz);
                        if (block && block.getType().includes("water")) {
                            nearWater = true;
                            break;
                        }
                    }
                    if (nearWater) break;
                }
                if (nearWater) break;
            }

            if (nearWater) {
                zombiesNearWater++;
            }
        }

        // Check if underground
        if (pos.y < 50) {
            zombiesUnderground++;
        }

        // Check daylight conditions
        const worldTime = World.getTime() % 24000;
        const isDaytime = worldTime >= 0 && worldTime < 12000;

        if (isDaytime) {
            zombiesDuringDay++;

            // Check if exposed to sky (would burn in normal gameplay)
            const highestBlock = World.getHighestBlockYAt(blockPos.getX(), blockPos.getZ());
            const exposedToSky = pos.y >= highestBlock;

            if (exposedToSky && !zombie.isOnFire()) {
                Chat.log(`  ${zombie.getName().getString()}: Exposed to daylight but not on fire (possibly wearing helmet or under cover)`);
            }
        }

        // Special case: zombies converting should be highlighted
        if (living && living.isConvertingToDrowned()) {
            const distance = player.distanceTo(zombie);
            Chat.log(`  &c🔄 CONVERSION: ${zombie.getName().getString()} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}] (${distance.toFixed(1)}m)`);
        }
    });

    // Summary
    Chat.log("\n=== Environmental Summary ===");
    Chat.log(`Total zombies analyzed: ${zombies.length}`);
    Chat.log(`Currently converting: ${zombiesConverting}`);
    Chat.log(`In water: ${zombiesInWater}`);
    Chat.log(`Near water: ${zombiesNearWater}`);
    Chat.log(`Underground (Y<50): ${zombiesUnderground}`);
    Chat.log(`Active during day: ${zombiesDuringDay}`);

    // Environmental insights
    if (zombiesInWater > 0) {
        const conversionRate = (zombiesConverting / zombiesInWater * 100).toFixed(1);
        Chat.log(`\nWater conversion rate: ${conversionRate}% of zombies in water are converting`);

        if (zombiesConverting > 0) {
            Chat.log("&cActive conversions detected - monitor for drowned spawns!");
        }
    }

    if (zombiesNearWater > 0 && zombiesInWater === 0) {
        Chat.log("&eZombies near water but not in it - potential for future conversions");
    }
}

analyzeZombieEnvironment();
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if zombie is currently attacking
- `isAiDisabled()` - Check if zombie's AI is disabled
- All other mob-specific methods for behavior control

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information
- `getArmor()` - Armor value
- `isBaby()` - Check if zombie is a baby variant

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- ZombieEntityHelper provides access to zombie-specific behaviors beyond general mob functionality
- The `isConvertingToDrowned()` method is particularly useful for monitoring and responding to zombie transformations
- Conversion to drowned occurs when zombies stay underwater for approximately 30 seconds
- This class serves as a base for more specialized zombie types like `ZombieVillagerEntityHelper`
- Zombie conversion can be interrupted if the zombie leaves water or is killed
- Converted drowned retain some zombie behaviors but gain drowned-specific abilities
- Baby zombies can also convert to drowned but will remain baby-sized
- The conversion process is visually distinct and includes shaking effects
- Zombies wearing helmets will not burn in daylight, affecting daytime behavior analysis

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behaviors
- `LivingEntityHelper` - Base class with health, movement, and status effects
- `EntityHelper` - Base class with general entity methods
- `ZombieVillagerEntityHelper` - Specialized helper for zombie villagers with additional villager-related methods
- `DrownedEntityHelper` - Helper for the resulting drowned entities (if available)
- `PlayerEntityHelper` - Player-related functionality for combat interactions

---

## Version Information

- Available since JSMacros 1.8.4
- Extends MobEntityHelper functionality with zombie-specific behaviors
- Part of the specialized entity helper hierarchy for comprehensive zombie interaction
- Supports all zombie variants including regular zombies, husks, and other zombie types