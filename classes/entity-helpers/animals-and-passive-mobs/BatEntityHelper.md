# BatEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.BatEntityHelper<T extends BatEntity>`

**Extends:** `MobEntityHelper<T>`

**Since:** 1.8.4

Represents a bat entity in the world. Bats are flying passive mobs found in dark areas of the overworld, especially caves. BatEntityHelper provides access to bat-specific properties, particularly their resting state which determines whether they're hanging upside down or flying actively.

Bats are nocturnal creatures that spend their days hanging upside down in dark places, using their echo location to navigate in the dark. At night, they emerge to hunt for small insects. They spawn in darkness (light level 0) and will not spawn in groups of more than 8 per area. When resting, bats hang upside down from ceilings or other solid surfaces.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding bat-specific functionality.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Notes and Limitations](#notes-and-limitations)
- [Related Classes](#related-classes)

---

## Constructors

BatEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`)
- World entity queries and type casting
- Methods that return bat entities
- Type casting from EntityHelper using `as("minecraft:bat")` or appropriate casting methods

---

## Methods

### `isResting()`

Returns whether the bat is currently hanging upside down and resting.

```js
// Check if a bat is resting
const bat = entity.as("minecraft:bat");
if (bat) {
    const resting = bat.isResting();
    Chat.log(`The bat is ${resting ? "resting upside down" : "actively flying"}`);
}
```

**Returns:** `boolean` - `true` if the bat is resting (hanging upside down), `false` if actively flying or otherwise moving.

---

## Usage Examples

### Bat Behavior Monitoring
```js
// Monitor bat behavior patterns around the player
class BatBehaviorMonitor {
    constructor() {
        this.batTracker = new Map();
        this.spawnedBats = [];
        this.restingBats = [];
    }

    updateBat(batEntity) {
        const bat = batEntity.as("minecraft:bat");
        if (!bat) return;

        const uuid = batEntity.getUUID();
        const isResting = bat.isResting();
        const player = Player.getPlayer();
        const distance = player ? player.distanceTo(batEntity) : 0;

        if (!this.batTracker.has(uuid)) {
            // New bat detected
            this.batTracker.set(uuid, {
                entity: batEntity,
                firstSeen: Client.getTime(),
                lastRestingState: isResting,
                restChanges: 0,
                activeDuration: 0,
                restDuration: 0,
                lastUpdate: Client.getTime(),
                name: batEntity.getName().getString()
            });

            if (isResting) {
                this.restingBats.push(uuid);
                Chat.log(`🦇 Found resting bat: ${batEntity.getName().getString()}`);
            } else {
                this.spawnedBats.push(uuid);
                Chat.log(`🦇 Found active bat: ${batEntity.getName().getString()}`);
            }
        } else {
            // Update existing bat
            const batData = this.batTracker.get(uuid);
            const currentTime = Client.getTime();
            const timeDelta = currentTime - batData.lastUpdate;

            // Track time spent in each state
            if (batData.lastRestingState) {
                batData.restDuration += timeDelta;
            } else {
                batData.activeDuration += timeDelta;
            }

            // Detect state changes
            if (batData.lastRestingState !== isResting) {
                batData.restChanges++;
                batData.lastRestingState = isResting;

                if (isResting) {
                    // Bat stopped flying and is now resting
                    this.spawnedBats = this.spawnedBats.filter(id => id !== uuid);
                    this.restingBats.push(uuid);
                    Chat.log(`🦇 ${batData.name} found a place to rest`);
                } else {
                    // Bat woke up and is now flying
                    this.restingBats = this.restingBats.filter(id => id !== uuid);
                    this.spawnedBats.push(uuid);
                    Chat.log(`🦇 ${batData.name} became active`);
                }
            }

            batData.lastUpdate = currentTime;
        }
    }

    generateReport() {
        if (this.batTracker.size === 0) {
            Chat.log("No bats currently being tracked");
            return;
        }

        Chat.log(`🦇=== Bat Activity Report (${this.batTracker.size} bats) ===`);
        Chat.log(`Active bats: ${this.spawnedBats.length}, Resting bats: ${this.restingBats.length}`);

        let totalActiveTime = 0;
        let totalRestTime = 0;
        let totalRestChanges = 0;

        for (const [uuid, batData] of this.batTracker) {
            totalActiveTime += batData.activeDuration;
            totalRestTime += batData.restDuration;
            totalRestChanges += batData.restChanges;

            const bat = batData.entity.as("minecraft:bat");
            const currentResting = bat ? bat.isResting() : batData.lastRestingState;
            const totalTime = batData.activeDuration + batData.restDuration;
            const restPercentage = totalTime > 0 ? (batData.restDuration / totalTime * 100) : 0;

            Chat.log(`\n${batData.name}:`);
            Chat.log(`  Current state: ${currentResting ? "Resting" : "Active"}`);
            Chat.log(`  Rest percentage: ${restPercentage.toFixed(1)}%`);
            Chat.log(`  State changes: ${batData.restChanges}`);
            Chat.log(`  Distance: ${Player.getPlayer().distanceTo(batData.entity).toFixed(1)} blocks`);

            if (batData.lastRestingState) {
                Chat.log(`  Resting for: ${(batData.restDuration / 20).toFixed(1)}s`);
            } else {
                Chat.log(`  Active for: ${(batData.activeDuration / 20).toFixed(1)}s`);
            }
        }

        // Group statistics
        const avgRestPercentage = this.batTracker.size > 0 ?
            Array.from(this.batTracker.values()).reduce((sum, bat) => {
                const total = bat.activeDuration + bat.restDuration;
                return sum + (total > 0 ? bat.restDuration / total * 100 : 0);
            }, 0) / this.batTracker.size : 0;

        Chat.log(`\n=== Group Statistics ===`);
        Chat.log(`Average rest time: ${avgRestPercentage.toFixed(1)}%`);
        Chat.log(`Total state changes: ${totalRestChanges}`);

        if (this.spawnedBats.length > this.restingBats.length) {
            Chat.log(`\n⚡ Most bats are currently active - likely nighttime`);
        } else {
            Chat.log(`\n😴 Most bats are currently resting - likely daytime`);
        }
    }
}

const batMonitor = new BatBehaviorMonitor();

// Monitor bats every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const trackingRange = 16; // Monitor bats within 16 blocks

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= trackingRange && entity.is("minecraft:bat")) {
            batMonitor.updateBat(entity);
        }
    });
}));

// Report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.b" && e.action === 1) { // B key
        batMonitor.generateReport();
    }
}));
```

### Cave Exploration Helper
```js
// Help detect safe cave areas based on bat resting locations
class CaveSafetyChecker {
    constructor() {
        this.batDensityMap = new Map();
        this.safeZones = [];
    }

    scanArea(position, radius) {
        // Count resting bats in different regions
        const regions = [
            { name: "North", pos: PositionHelper.create(position.x, position.y, position.z - radius/2) },
            { name: "South", pos: PositionHelper.create(position.x, position.y, position.z + radius/2) },
            { name: "East", pos: PositionHelper.create(position.x + radius/2, position.y, position.z) },
            { name: "West", pos: PositionHelper.create(position.x - radius/2, position.y, position.z) },
            { name: "Above", pos: PositionHelper.create(position.x, position.y + radius/2, position.z) },
            { name: "Below", pos: PositionHelper.create(position.x, position.y - radius/2, position.z) }
        ];

        Chat.log(`🦇 Scanning ${radius}x${radius} area around position [${position.x.toFixed(0)}, ${position.y.toFixed(0)}, ${position.z.toFixed(0)}]`);

        const entities = World.getEntities();
        let totalBats = 0;
        let restingBats = 0;

        entities.forEach(entity => {
            const distance = position.distanceTo(entity);
            if (distance <= radius && entity.is("minecraft:bat")) {
                totalBats++;
                const bat = entity.as("minecraft:bat");
                if (bat && bat.isResting()) {
                    restingBats++;
                }
            }
        });

        const restRatio = totalBats > 0 ? restingBats / totalBats : 0;
        Chat.log(`Found ${totalBats} bats total, ${restingBats} resting (${(restRatio * 100).toFixed(1)}% rest rate)`);

        // Interpret safety based on bat behavior
        if (totalBats >= 5) {
            if (restRatio >= 0.7) {
                Chat.log("✅ SAFE AREA: High bat activity with most bats resting - likely a good cave system");
                this.safeZones.push({
                    position: position,
                    batCount: totalBats,
                    timestamp: Client.getTime(),
                    reason: "High resting bat ratio"
                });
            } else if (restRatio <= 0.3) {
                Chat.log("⚠️ WARNING: Many bats active - possible disturbance or nighttime conditions");
            } else {
                Chat.log("ℹ️ MODERATE ACTIVITY: Some bats resting, some active - normal cave behavior");
            }
        } else if (totalBats > 0) {
            Chat.log("⚡ LOW ACTIVITY: Few bats present - possibly not a large cave system");
        } else {
            Chat.log("❌ NO BATS: No bats detected - might not be in a natural cave, or too bright");
        }

        // Additional safety factors
        const lightLevel = World.getBlockState(position.x, position.y, position.z).getLuminance();
        if (lightLevel <= 7) {
            Chat.log(`💡 Low light level (${lightLevel}) - ideal for bat habitation`);
        } else {
            Chat.log(`🔆 High light level (${lightLevel}) - unsuitable for most bats`);
        }
    }
}

const caveChecker = new CaveSafetyChecker();

// Check cave safety around current position
function checkCurrentArea() {
    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    const radius = 20; // Check 20 block radius
    caveChecker.scanArea(pos, radius);
}

// Command to check cave safety
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.c" && e.action === 1) { // C key
        checkCurrentArea();
    }
}));
```

### Bat Nocturnal Activity Tracker
```js
// Track bat activity patterns over time to understand day/night cycles
class BatActivityTracker {
    constructor() {
        this.hourlyData = new Array(24).fill().map(() => ({ total: 0, resting: 0, active: 0 }));
        this.lastReset = World.getTimeOfDay();
        this.worldTimeSpeedup = 1; // Adjust based on your world settings
    }

    updateBatsInArea(centerPos, radius) {
        const entities = World.getEntities();
        let total = 0, resting = 0, active = 0;

        entities.forEach(entity => {
            const distance = centerPos.distanceTo(entity);
            if (distance <= radius && entity.is("minecraft:bat")) {
                total++;
                const bat = entity.as("minecraft:bat");
                if (bat && bat.isResting()) {
                    resting++;
                } else {
                    active++;
                }
            }
        });

        // Update hourly data
        const worldTime = World.getTimeOfDay();
        const hour = Math.floor((worldTime / 1000) % 24);

        this.hourlyData[hour].total += total;
        this.hourlyData[hour].resting += resting;
        this.hourlyData[hour].active += active;

        // Update counts for this hour (simple averaging)
        const hourEntry = this.hourlyData[hour];
        const samples = hourEntry.samples || 1;
        hourEntry.avgTotal = ((hourEntry.avgTotal || 0) * (samples - 1) + total) / samples;
        hourEntry.avgResting = ((hourEntry.avgResting || 0) * (samples - 1) + resting) / samples;
        hourEntry.avgActive = ((hourEntry.avgActive || 0) * (samples - 1) + active) / samples;
        hourEntry.samples = samples + 1;

        return { total, resting, active };
    }

    displayActivityReport() {
        Chat.log("🦇=== Bat Activity Report (24-hour cycle) ===");

        for (let hour = 0; hour < 24; hour++) {
            const data = this.hourlyData[hour];
            const total = data.avgTotal || 0;
            const resting = data.avgResting || 0;
            const active = data.avgActive || 0;
            const restRatio = total > 0 ? (resting / total * 100) : 0;

            // Minecraft time: 0-12000 is day, 12000-24000 is night
            const mcHour = hour;
            const timeOfDay = mcHour >= 6 && mcHour < 18 ? "Day" : "Night";

            const activity = total === 0 ? "No Data" :
                restRatio > 70 ? "Very Low" :
                restRatio > 40 ? "Low" :
                restRatio < 30 ? "High" : "Moderate";

            Chat.log(`${mcHour.toString().padStart(2, '0')}:00 (${timeOfDay}) - Total: ${total.toFixed(1)}, Resting: ${resting.toFixed(1)}, Active: ${active.toFixed(1)} (${activity})`);
        }

        // Determine activity patterns
        let daylightActivity = 0;
        let nighttimeActivity = 0;

        for (let hour = 0; hour < 24; hour++) {
            const data = this.hourlyData[hour];
            const activity = (data.avgActive || 0);

            if (hour >= 6 && hour < 18) { // Daylight hours
                daylightActivity += activity;
            } else { // Nighttime hours
                nighttimeActivity += activity;
            }
        }

        const daylightHours = 12;
        const nighttimeHours = 12;
        const avgDayActivity = daylightHours > 0 ? daylightActivity / daylightHours : 0;
        const avgNightActivity = nighttimeHours > 0 ? nighttimeActivity / nighttimeHours : 0;

        Chat.log(`\n=== Activity Patterns ===`);
        Chat.log(`Average day activity: ${avgDayActivity.toFixed(2)} bats`);
        Chat.log(`Average night activity: ${avgNightActivity.toFixed(2)} bats`);

        const nightMultiplier = avgNightActivity > 0 ? avgDayActivity / avgNightActivity : 0;
        if (nightMultiplier > 2) {
            Chat.log("🌙 Strong nocturnal pattern - bats are much more active at night");
        } else if (nightMultiplier > 1.5) {
            Chat.log("🌙 Moderate nocturnal pattern - some increased night activity");
        } else if (nightMultiplier < 0.8) {
            Chat.log("🌇 Diurnal pattern - bats more active during day (unusual!)");
        } else {
            Chat.log("⚖️ Balanced activity - no strong day/night preference observed");
        }
    }
}

const activityTracker = new BatActivityTracker();

// Track bat activity continuously
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    // Check activity every 5 seconds (100 ticks)
    if (Client.getTime() % 100 === 0) {
        const pos = player.getPos();
        const radius = 24; // Monitoring radius
        const result = activityTracker.updateBatsInArea(pos, radius);

        // Log significant activity changes
        if (result.total >= 3) {
            const restRatio = result.resting / result.total * 100;
            Chat.log(`🦇 Area activity: ${result.total} bats (${restRatio.toFixed(0)}% resting)`);
        }
    }
}));

// Display activity report
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.r" && e.action === 1) { // R key
        activityTracker.displayActivityReport();
    }
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if bat is currently attacking (usually false for passive bats)
- `isAiDisabled()` - Check if bat's AI is disabled

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (usually empty for bats)
- `getArmor()` - Armor value (usually 0 for bats)
- `isBaby()` - Check if bat is a baby variant (unlikely for bats)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks
- Bats prefer dark areas and will often rest when exposed to light

---

## Notes and Limitations

- BatEntityHelper is designed for passive mob bat entities, not other flying creatures
- The `isResting()` method reliably indicates whether a bat is hanging upside down on a surface
- Bats naturally spawn in complete darkness (light level 0) and will despawn if light levels rise above 7
- Resting bats will wake up and fly away if approached too closely or disturbed
- Bats provide excellent indicators of natural cave systems and safe dark areas
- Multiple bats in close proximity while resting usually indicate a good cave habitat
- Bats have simple AI patterns alternating between resting and active states based on time of day
- The resting state is primarily controlled by environmental light levels and time of day

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and basic mob behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `PhantomEntityHelper` - Another flying mob entity that hunts at night but is hostile
- `ChickenEntityHelper`, `ParrotEntityHelper` - Other passive bird-like flying entities
- `GhastEntityHelper` - Large nether flying mob (hostile)
- `PlayerEntityHelper` - For tracking player movement and interactions

---

## Version Information

- Available since JsMacros 1.8.4
- Part of the specialized entity helper hierarchy for comprehensive passive mob interaction
- Essential tool for exploration, cave mapping, and understanding overworld ecosystems