# HorseEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.HorseEntityHelper`

**Extends:** `AbstractHorseEntityHelper<HorseEntity>`

The `HorseEntityHelper` class provides specialized functionality for interacting with horse entities in Minecraft. This helper offers access to horse-specific properties including variant information, taming status, equipment, and performance statistics like speed and jump height. It extends `AbstractHorseEntityHelper` and inherits comprehensive methods for managing horse ownership, breeding, and combat attributes.

Horses are tamable passive mobs that can be ridden by players after taming and equipping with a saddle. They come in different color variants with marking patterns, and each horse has randomized stats for health, speed, and jump strength that determine their overall quality for riding and transportation.

This class is typically obtained through entity events, world queries, or by casting from `EntityHelper` using the `asAnimal()` method when dealing with horse entities.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

HorseEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityInteract`, `EntitySpawn`)
- World entity queries and filtering for horse entities
- Type casting from `EntityHelper` using `asAnimal()` when appropriate
- Methods that return horse entities from other helpers

---

## Methods

## Usage Examples

### Horse Quality Assessment
```js
// Evaluate horses for riding quality
function assessHorseQuality(horse) {
    const speed = horse.getHorseSpeed();
    const jumpHeight = horse.getHorseJumpHeight();
    const health = horse.getHealthStat();
    const isTame = horse.isTame();
    const isSaddled = horse.isSaddled();

    let quality = "Poor";
    let score = 0;

    // Score based on stats (max possible score: 100)
    if (speed >= 13.5) score += 35; // Excellent speed
    else if (speed >= 12.0) score += 28; // Good speed
    else if (speed >= 10.0) score += 20; // Average speed
    else score += 10; // Below average speed

    if (jumpHeight >= 5.0) score += 35; // Excellent jump
    else if (jumpHeight >= 4.0) score += 28; // Good jump
    else if (jumpHeight >= 3.0) score += 20; // Average jump
    else score += 10; // Below average jump

    if (health >= 25) score += 30; // Excellent health
    else if (health >= 20) score += 24; // Good health
    else if (health >= 15) score += 18; // Average health
    else score += 12; // Below average health

    // Determine quality rating
    if (score >= 85) quality = "Excellent";
    else if (score >= 70) quality = "Very Good";
    else if (score >= 55) quality = "Good";
    else if (score >= 40) quality = "Average";
    else if (score >= 25) quality = "Fair";

    return {
        quality,
        score,
        speed: speed.toFixed(2),
        jumpHeight: jumpHeight.toFixed(2),
        health,
        isTame,
        isSaddled,
        stats: {
            speedStat: horse.getSpeedStat().toFixed(4),
            jumpStrengthStat: horse.getJumpStrengthStat().toFixed(4),
            maxHealth: horse.getMaxHealth()
        }
    };
}

// Find and evaluate the best horses
function findBestHorses() {
    const entities = World.getEntities();
    const horses = entities.filter(entity => entity.is("minecraft:horse"));
    const horseData = [];

    horses.forEach(entity => {
        const horse = entity.asAnimal();
        if (!horse) return;

        const assessment = assessHorseQuality(horse);
        const variant = horse.getVariant();
        const pos = entity.getPos();

        horseData.push({
            entity,
            assessment,
            variant,
            distance: Player.getPlayer().distanceTo(entity),
            position: pos
        });
    });

    // Sort by quality score
    horseData.sort((a, b) => b.assessment.score - a.assessment.score);

    Chat.log("=== Top 5 Horses by Quality ===");
    horseData.slice(0, 5).forEach((data, index) => {
        const { assessment, variant, distance } = data;
        Chat.log(`${index + 1}. ${assessment.quality} (${assessment.score}/100)`);
        Chat.log(`   Speed: ${assessment.speed} b/s, Jump: ${assessment.jumpHeight}m, Health: ${assessment.health}`);
        Chat.log(`   Tamed: ${assessment.isTame}, Saddled: ${assessment.isSaddled}`);
        Chat.log(`   Distance: ${distance.toFixed(1)}m, Variant: ${variant}`);
    });
}

findBestHorses();
```

### Horse Management System
```js
// Track and manage horses in the area
class HorseManager {
    constructor() {
        this.trackedHorses = new Map();
        this.myHorses = new Set(); // Horses you own
        this.playerUuid = Player.getPlayer().getUUID();
    }

    scanHorses() {
        const entities = World.getEntities();
        const horses = entities.filter(entity => entity.is("minecraft:horse"));

        horses.forEach(entity => {
            const uuid = entity.getUUID();
            const horse = entity.asAnimal();
            if (!horse) return;

            if (!this.trackedHorses.has(uuid)) {
                this.trackedHorses.set(uuid, {
                    entity: entity,
                    horse: horse,
                    name: this.generateHorseName(horse),
                    firstSeen: Client.getTime(),
                    lastChecked: Client.getTime()
                });

                Chat.log(`&aNew horse detected: ${this.trackedHorses.get(uuid).name}`);
            } else {
                this.trackedHorses.get(uuid).lastChecked = Client.getTime();
            }
        });

        // Clean up removed horses
        for (const [uuid, data] of this.trackedHorses) {
            if (!data.entity.isAlive()) {
                Chat.log(`&cHorse ${data.name} has been removed`);
                this.trackedHorses.delete(uuid);
                this.myHorses.delete(uuid);
            }
        }
    }

    generateHorseName(horse) {
        const variant = horse.getVariant();
        const colors = ["White", "Creamy", "Chestnut", "Brown", "Black", "Gray", "Dark Brown"];
        const colorIndex = variant & 0x7;
        const color = colors[Math.min(colorIndex, colors.length - 1)];

        return `${color} Horse ${Math.floor(Math.random() * 1000)}`;
    }

    claimHorse(entity) {
        const uuid = entity.getUUID();
        const horse = entity.asAnimal();
        if (!horse || !horse.isTame()) {
            Chat.log("&cCannot claim an untamed horse");
            return false;
        }

        const owner = horse.getOwner();
        if (owner && owner !== this.playerUuid) {
            Chat.log("&cThis horse already belongs to someone else");
            return false;
        }

        this.myHorses.add(uuid);
        const horseData = this.trackedHorses.get(uuid);
        Chat.log(`&aClaimed horse: ${horseData ? horseData.name : 'Unknown Horse'}`);
        return true;
    }

    listMyHorses() {
        Chat.log("=== My Horses ===");
        if (this.myHorses.size === 0) {
            Chat.log("You don't own any horses yet");
            return;
        }

        this.myHorses.forEach(uuid => {
            const data = this.trackedHorses.get(uuid);
            if (!data) return;

            const horse = data.horse;
            const assessment = assessHorseQuality(horse);
            const pos = data.entity.getPos();

            Chat.log(`&e${data.name}:`);
            Chat.log(`  Quality: ${assessment.quality} (${assessment.score}/100)`);
            Chat.log(`  Speed: ${assessment.speed} b/s, Jump: ${assessment.jumpHeight}m`);
            Chat.log(`  Location: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            Chat.log(`  Saddled: ${horse.isSaddled()}`);
        });
    }

    findNearestMyHorse() {
        const player = Player.getPlayer();
        let nearestHorse = null;
        let nearestDistance = Infinity;

        this.myHorses.forEach(uuid => {
            const data = this.trackedHorses.get(uuid);
            if (!data) return;

            const distance = player.distanceTo(data.entity);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestHorse = data;
            }
        });

        return nearestHorse ? { ...nearestHorse, distance: nearestDistance } : null;
    }
}

const horseManager = new HorseManager();

// Scan for horses every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 100 === 0) {
        horseManager.scanHorses();
    }
}));

// Command to claim nearest tamed horse
Chat.createCommandBuilder("claimhorse")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const player = Player.getPlayer();
        const entities = World.getEntities();
        let nearestTamedHorse = null;
        let nearestDistance = Infinity;

        entities.forEach(entity => {
            if (entity.is("minecraft:horse")) {
                const horse = entity.asAnimal();
                if (horse && horse.isTame()) {
                    const distance = player.distanceTo(entity);
                    if (distance < nearestDistance && distance <= 10) {
                        nearestDistance = distance;
                        nearestTamedHorse = entity;
                    }
                }
            }
        });

        if (nearestTamedHorse) {
            horseManager.claimHorse(nearestTamedHorse);
        } else {
            Chat.log("&cNo tamed horses nearby within 10 blocks");
        }
    }))
    .register();

// Command to list owned horses
Chat.createCommandBuilder("myhorses")
    .executes(JavaWrapper.methodToJava((ctx) => {
        horseManager.listMyHorses();
    }))
    .register();

// Command to find nearest owned horse
Chat.createCommandBuilder("nearesthorse")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const nearest = horseManager.findNearestMyHorse();
        if (nearest) {
            Chat.log(`&aNearest horse: ${nearest.name} (${nearest.distance.toFixed(1)}m away)`);
            Chat.log(`Speed: ${horseManager.trackedHorses.get(nearest.entity.getUUID()).horse.getHorseSpeed().toFixed(2)} b/s`);
        } else {
            Chat.log("&cYou don't own any horses or they're too far away");
        }
    }))
    .register();
```

### Horse Breeding Analysis
```js
// Analyze horses for breeding potential
function analyzeBreedingPair(horse1, horse2) {
    const canBreed = horse1.canBreedWith(horse2);
    const stats1 = assessHorseQuality(horse1);
    const stats2 = assessHorseQuality(horse2);

    if (!canBreed) {
        return {
            canBreed: false,
            reason: "Horses cannot breed together (wrong type, same gender, or not in love mode)"
        };
    }

    // Calculate potential offspring stats (simplified genetic simulation)
    const avgSpeed = (parseFloat(stats1.speed) + parseFloat(stats2.speed)) / 2;
    const avgJump = (parseFloat(stats1.jumpHeight) + parseFloat(stats2.jumpHeight)) / 2;
    const avgHealth = (stats1.health + stats2.health) / 2;

    // Add some variation (+/- 10%)
    const variation = 0.1;
    const potentialSpeed = avgSpeed * (1 + (Math.random() - 0.5) * variation * 2);
    const potentialJump = avgJump * (1 + (Math.random() - 0.5) * variation * 2);
    const potentialHealth = avgHealth * (1 + (Math.random() - 0.5) * variation * 2);

    return {
        canBreed: true,
        parent1: { name: "Parent 1", ...stats1 },
        parent2: { name: "Parent 2", ...stats2 },
        potentialOffspring: {
            speed: potentialSpeed.toFixed(2),
            jump: potentialJump.toFixed(2),
            health: Math.round(potentialHealth),
            quality: assessHorseQuality({
                getHorseSpeed: () => potentialSpeed,
                getHorseJumpHeight: () => potentialJump,
                getHealthStat: () => potentialHealth,
                isTame: () => true,
                isSaddled: () => false
            }).quality
        }
    };
}

// Find best breeding pairs
function findBreedingPairs() {
    const entities = World.getEntities();
    const horses = entities.filter(entity => {
        const horse = entity.asAnimal();
        return horse && horse.is("minecraft:horse") && horse.isTame();
    });

    Chat.log("=== Horse Breeding Analysis ===");

    for (let i = 0; i < horses.length; i++) {
        for (let j = i + 1; j < horses.length; j++) {
            const horse1 = horses[i].asAnimal();
            const horse2 = horses[j].asAnimal();

            if (!horse1 || !horse2) continue;

            const analysis = analyzeBreedingPair(horse1, horse2);

            if (analysis.canBreed) {
                const distance = horses[i].distanceTo(horses[j]);
                Chat.log(`&aBreeding Pair Found (${distance.toFixed(1)}m apart):`);
                Chat.log(`  Parent 1: ${analysis.parent1.quality} (${analysis.parent1.score}/100)`);
                Chat.log(`  Parent 2: ${analysis.parent2.quality} (${analysis.parent2.score}/100)`);
                Chat.log(`  Potential offspring: ${analysis.potentialOffspring.quality} quality`);
                Chat.log(`  Potential stats: Speed ${analysis.potentialOffspring.speed} b/s, Jump ${analysis.potentialOffspring.jump}m`);
            }
        }
    }
}

findBreedingPairs();
```

### Horse Performance Monitoring
```js
// Monitor horse performance while riding
class HorsePerformanceTracker {
    constructor() {
        this.currentHorse = null;
        this.performanceData = {
            startTime: 0,
            totalDistance: 0,
            lastPos: null,
            maxSpeed: 0,
            jumpCount: 0,
            jumpHeights: []
        };
    }

    startTracking(horse) {
        this.currentHorse = horse;
        this.performanceData = {
            startTime: Client.getTime(),
            totalDistance: 0,
            lastPos: horse.getEntity().getPos(),
            maxSpeed: 0,
            jumpCount: 0,
            jumpHeights: []
        };

        Chat.log(`&aStarted tracking horse performance`);
        Chat.log(`  Base speed: ${horse.getHorseSpeed().toFixed(2)} b/s`);
        Chat.log(`  Jump height: ${horse.getHorseJumpHeight().toFixed(2)}m`);
        Chat.log(`  Health: ${horse.getHealthStat()}`);
    }

    stopTracking() {
        if (!this.currentHorse) return;

        const duration = (Client.getTime() - this.performanceData.startTime) / 20; // Convert to seconds
        const avgSpeed = this.performanceData.totalDistance / duration;
        const avgJumpHeight = this.performanceData.jumpHeights.length > 0
            ? this.performanceData.jumpHeights.reduce((a, b) => a + b, 0) / this.performanceData.jumpHeights.length
            : 0;

        Chat.log("=== Horse Performance Report ===");
        Chat.log(`Riding duration: ${duration.toFixed(1)} seconds`);
        Chat.log(`Total distance: ${this.performanceData.totalDistance.toFixed(1)} blocks`);
        Chat.log(`Average speed: ${avgSpeed.toFixed(2)} b/s`);
        Chat.log(`Maximum speed: ${this.performanceData.maxSpeed.toFixed(2)} b/s`);
        Chat.log(`Total jumps: ${this.performanceData.jumpCount}`);
        Chat.log(`Average jump height: ${avgJumpHeight.toFixed(2)}m`);
        Chat.log(`Best jump: ${Math.max(...this.performanceData.jumpHeights, 0).toFixed(2)}m`);

        // Compare to base stats
        const baseSpeed = this.currentHorse.getHorseSpeed();
        const speedEfficiency = (avgSpeed / baseSpeed) * 100;
        Chat.log(`Speed efficiency: ${speedEfficiency.toFixed(1)}% of base speed`);

        this.currentHorse = null;
    }

    updateTracking() {
        if (!this.currentHorse) return;

        const player = Player.getPlayer();
        const vehicle = player.getVehicle();

        if (!vehicle || !vehicle.is("minecraft:horse")) {
            Chat.log("&cNo longer riding a horse");
            this.stopTracking();
            return;
        }

        const currentPos = player.getPos();
        const lastPos = this.performanceData.lastPos;

        if (lastPos) {
            const distance = currentPos.distanceTo(lastPos);
            this.performanceData.totalDistance += distance;

            // Calculate current speed (blocks per tick, then convert to per second)
            const currentSpeed = distance * 20; // 20 ticks per second
            if (currentSpeed > this.performanceData.maxSpeed) {
                this.performanceData.maxSpeed = currentSpeed;
            }
        }

        this.performanceData.lastPos = currentPos;

        // Detect jumps
        const velY = player.getVelocity().y;
        if (velY > 0.4 && this.performanceData.lastVelY <= 0.4) {
            this.performanceData.jumpCount++;
            // Estimate jump height from velocity
            const jumpHeight = (velY * velY) / (2 * 0.08); // Assuming gravity ~0.08
            this.performanceData.jumpHeights.push(jumpHeight);
        }

        this.performanceData.lastVelY = velY;
    }
}

const performanceTracker = new HorsePerformanceTracker();

// Track performance when riding horses
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const vehicle = player.getVehicle();

    if (vehicle && vehicle.is("minecraft:horse")) {
        const horse = vehicle.asAnimal();
        if (!performanceTracker.currentHorse) {
            performanceTracker.startTracking(horse);
        }
        performanceTracker.updateTracking();
    } else if (performanceTracker.currentHorse) {
        performanceTracker.stopTracking();
    }
}));

// Command to manually start/stop tracking
Chat.createCommandBuilder("horsetrack")
    .executes(JavaWrapper.methodToJava((ctx) => {
        if (performanceTracker.currentHorse) {
            performanceTracker.stopTracking();
        } else {
            Chat.log("&cYou must be riding a horse to start tracking");
        }
    }))
    .register();
```

---

## Inherited Methods

From `AbstractHorseEntityHelper`:

### Ownership and Taming
- `getOwner()` - Get the UUID of the horse's owner, or null if unowned
- `isTame()` - Check if the horse is tamed
- `isAngry()` - Check if the horse is angry (will not accept taming attempts)
- `isBred()` - Check if the horse was bred by players

### Equipment and Inventory
- `isSaddled()` - Check if the horse has a saddle equipped
- `canWearArmor()` - Check if the horse can wear horse armor
- `canBeSaddled()` - Check if the horse can be saddled
- `getInventorySize()` - Get the size of the horse's inventory

### Movement and Performance Stats
- `getSpeedStat()` - Get the horse's movement speed attribute value
- `getHorseSpeed()` - Get the horse's speed in blocks per second
- `getJumpStrengthStat()` - Get the horse's jump strength attribute value
- `getHorseJumpHeight()` - Get the horse's maximum jump height
- `getHealthStat()` - Get the horse's maximum health value

### Stat Ranges
- `getMaxSpeedStat()`, `getMinSpeedStat()` - Get possible speed stat range
- `getMaxJumpStrengthStat()`, `getMinJumpStrengthStat()` - Get possible jump strength range
- `getMaxHealthStat()`, `getMinHealthStat()` - Get possible health stat range

From `AnimalEntityHelper`:

- `isFood(item)` - Check if an item can be used to feed/breed the horse
- `canBreedWith(other)` - Check if two horses can breed together

From `MobEntityHelper` and `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Current and maximum health
- `getMainHand()`, `getOffHand()` - Equipment (though horses typically don't use these)
- `getStatusEffects()` - Active status effects
- `isBaby()` - Check if the horse is a foal
- `getArmor()` - Current armor value

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement direction
- `getVehicle()`, `getPassengers()` - Entity relationships
- `getUUID()` - Unique identifier

---

## Notes and Limitations

- HorseEntityHelper only works with entities of type `minecraft:horse`. For other horse-like entities, use their specific helpers (DonkeyEntityHelper, MuleEntityHelper, etc.)
- The `getVariant()` method returns raw integer values that need to be decoded to understand the horse's appearance
- Horse stats are determined at spawn and cannot be changed through normal gameplay mechanics
- Tamed horses without an owner can be claimed by any player who interacts with them
- Performance calculations like `getHorseSpeed()` are approximations but are very close to actual values
- Breeding combines stats from both parents with some randomization
- Some methods may return different results depending on whether you're the horse's owner
- Horse inventory and equipment management requires separate interaction with the horse's GUI

---

## Related Classes

- `AbstractHorseEntityHelper` - Parent class with horse and donkey functionality
- `AnimalEntityHelper` - For passive animal behaviors and breeding
- `MobEntityHelper` - Base class for all mobs with AI
- `LivingEntityHelper` - Health, movement, and combat properties
- `EntityHelper` - Base entity functionality and properties
- `DonkeyEntityHelper`, `MuleEntityHelper` - Similar horse-like entities
- `LlamaEntityHelper` - Other rideable passive mobs

---

## Version Information

- Available since JSMacros 1.8.4
- Extends AbstractHorseEntityHelper with horse-specific variant support
- Part of the specialized entity helper system for comprehensive mob interaction
- Variant system matches Minecraft's horse appearance genetics system