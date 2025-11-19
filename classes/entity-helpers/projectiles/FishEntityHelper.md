# FishEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.FishEntityHelper`

**Extends:** `MobEntityHelper<FishEntity>`

The `FishEntityHelper` class provides specialized access to fish entities in Minecraft, offering methods to monitor and interact with fish-specific behaviors such as bucket origins and aquatic movement patterns. This class extends `MobEntityHelper` and inherits all functionality for mob entities including AI states, pathfinding, and combat behaviors.

This helper is particularly useful for creating scripts that manage aquarium systems, monitor fish populations, track bucket-released fish versus naturally spawned fish, or coordinate with fishing automation systems. It also serves as the base class for more specialized fish helpers like `TropicalFishEntityHelper` and `PufferfishEntityHelper`.

## Constructors

FishEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type-specific methods
- Water-based entity scans around players or specific locations

## Methods

### Fish-Specific Methods

- [fish.isFromBucket()](#fishisFromBucket)

### Inherited Methods

The FishEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`, `getTarget()`, `setTarget()`
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`, `isInLove()`, `setInLove()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states, breathing
- **EntityHelper:** Position, movement, world interaction, type casting, velocity

---

## Fish-Specific Methods

## Usage Examples

### Aquarium Monitoring System
```js
// Comprehensive aquarium fish monitoring and management system
class AquariumMonitor {
    constructor() {
        this.trackedFish = new Map();
        this.aquariumBounds = null;
        this.statistics = {
            totalFish: 0,
            bucketFish: 0,
            naturalFish: 0,
            fishTypes: new Map(),
            lastUpdate: 0
        };
        this.monitoringRadius = 16;
    }

    setAquariumBounds(center, size) {
        this.aquariumBounds = {
            min: { x: center.x - size, y: center.y - size, z: center.z - size },
            max: { x: center.x + size, y: center.y + size, z: center.z + size }
        };
        Chat.log(`&aAquarium bounds set: ${size}x${size}x${size} around [${center.x}, ${center.y}, ${center.z}]`);
    }

    isInsideAquarium(pos) {
        if (!this.aquariumBounds) return true;

        return pos.x >= this.aquariumBounds.min.x && pos.x <= this.aquariumBounds.max.x &&
               pos.y >= this.aquariumBounds.min.y && pos.y <= this.aquariumBounds.max.y &&
               pos.z >= this.aquariumBounds.min.z && pos.z <= this.aquariumBounds.max.z;
    }

    scanForFish() {
        const entities = World.getEntities(this.monitoringRadius * 2);
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getPos();
        const currentFishUUIDs = new Set();

        entities.forEach(entity => {
            const entityType = entity.getType();

            // Check for various fish types
            if (this.isFishEntity(entityType)) {
                const fish = entity.asFish();
                const uuid = fish.getUUID();
                const pos = fish.getPos();

                currentFishUUIDs.add(uuid);

                // Check if fish is within aquarium bounds
                if (this.isInsideAquarium(pos)) {
                    this.updateFish(fish);
                }
            }
        });

        // Remove fish that are no longer in range or died
        for (const [uuid, fishData] of this.trackedFish) {
            if (!currentFishUUIDs.has(uuid)) {
                Chat.log(`&7Fish ${fishData.type} left tracking range or died`);
                this.trackedFish.delete(uuid);
            }
        }

        this.statistics.lastUpdate = Client.getTime();
    }

    isFishEntity(entityType) {
        const fishTypes = [
            "minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish",
            "minecraft:pufferfish", "minecraft:squid", "minecraft:glow_squid"
        ];
        return fishTypes.includes(entityType);
    }

    updateFish(fish) {
        const uuid = fish.getUUID();
        const pos = fish.getPos();
        const type = fish.getType();
        const isFromBucket = fish.isFromBucket();
        const isAlive = fish.asLiving ? fish.asLiving().isAlive() : false;

        const fishData = {
            fish: fish,
            uuid: uuid,
            type: type.replace("minecraft:", ""),
            position: pos,
            isFromBucket: isFromBucket,
            isAlive: isAlive,
            health: isAlive && fish.asLiving ? fish.asLiving().getHealth() : 0,
            firstSeen: Client.getTime(),
            lastUpdate: Client.getTime()
        };

        // Check if this is a new fish or an existing one
        const existingFish = this.trackedFish.get(uuid);
        if (!existingFish) {
            // New fish detected
            this.trackedFish.set(uuid, fishData);

            const originText = isFromBucket ? "&b(bucket)" : "&a(natural)";
            Chat.log(`&eNew fish detected: ${fishData.type} ${originText} at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);

            // Update statistics
            this.statistics.totalFish++;
            if (isFromBucket) {
                this.statistics.bucketFish++;
            } else {
                this.statistics.naturalFish++;
            }

            // Update type counts
            const typeCount = this.statistics.fishTypes.get(fishData.type) || 0;
            this.statistics.fishTypes.set(fishData.type, typeCount + 1);

            // Visual highlighting
            fish.setGlowing(true);
            fish.setGlowingColor(isFromBucket ? 0x00AAFF : 0x00FFAA); // Blue for bucket, green for natural
        } else {
            // Update existing fish
            existingFish.position = pos;
            existingFish.lastUpdate = Client.getTime();
            existingFish.health = fishData.health;
        }
    }

    generateReport() {
        Chat.log("&6=== Aquarium Fish Report ===");
        Chat.log(`Total fish tracked: ${this.trackedFish.size}`);
        Chat.log(`Fish from buckets: ${this.statistics.bucketFish}`);
        Chat.log(`Naturally spawned: ${this.statistics.naturalFish}`);

        if (this.statistics.fishTypes.size > 0) {
            Chat.log("\n&aFish types:");
            for (const [type, count] of this.statistics.fishTypes) {
                const percentage = ((count / this.statistics.totalFish) * 100).toFixed(1);
                Chat.log(`  - ${type}: ${count} (${percentage}%)`);
            }
        }

        // Health check
        let unhealthyFish = 0;
        for (const [uuid, fishData] of this.trackedFish) {
            if (fishData.health < fishData.fish.asLiving.getMaxHealth() * 0.5) {
                unhealthyFish++;
            }
        }

        if (unhealthyFish > 0) {
            Chat.log(`\n&cWarning: ${unhealthyFish} fish have low health!`);
        }

        // Detailed fish locations
        if (this.trackedFish.size > 0) {
            Chat.log("\n&7Fish locations:");
            for (const [uuid, fishData] of this.trackedFish) {
                const originSymbol = fishData.isFromBucket ? "🪣" : "🌊";
                const healthPercent = ((fishData.health / fishData.fish.asLiving.getMaxHealth()) * 100).toFixed(0);
                Chat.log(`  ${originSymbol} ${fishData.type}: [${fishData.position.x.toFixed(1)}, ${fishData.position.y.toFixed(1)}, ${fishData.position.z.toFixed(1)}] HP: ${healthPercent}%`);
            }
        }
    }

    checkAquariumHealth() {
        if (this.trackedFish.size === 0) {
            Chat.log("&7No fish in aquarium to check.");
            return;
        }

        let issues = [];
        let totalHealth = 0;
        let healthyFish = 0;

        for (const [uuid, fishData] of this.trackedFish) {
            totalHealth += fishData.health;
            const maxHealth = fishData.fish.asLiving.getMaxHealth();
            const healthPercent = (fishData.health / maxHealth) * 100;

            if (healthPercent >= 80) {
                healthyFish++;
            } else if (healthPercent < 50) {
                issues.push(`${fishData.type} has low health (${healthPercent.toFixed(0)}%)`);
            }

            // Check for fish out of water (taking damage)
            if (fishData.fish.asLiving && fishData.fish.asLiving().isSubmergedInWater()) {
                // Fish is in water - good
            } else {
                issues.push(`${fishData.type} may be out of water!`);
            }
        }

        const avgHealthPercent = (totalHealth / this.trackedFish.size) / 20 * 100; // Assuming max health of 20

        Chat.log("&6=== Aquarium Health Check ===");
        Chat.log(`Average fish health: ${avgHealthPercent.toFixed(1)}%`);
        Chat.log(`Healthy fish: ${healthyFish}/${this.trackedFish.size}`);

        if (issues.length > 0) {
            Chat.log("\n&cIssues detected:");
            issues.forEach(issue => Chat.log(`  - ${issue}`));
        } else {
            Chat.log("&aAll fish appear healthy!");
        }
    }

    highlightBucketFish() {
        let bucketFishCount = 0;

        for (const [uuid, fishData] of this.trackedFish) {
            if (fishData.isFromBucket) {
                fishData.fish.setGlowing(true);
                fishData.fish.setGlowingColor(0x00AAFF); // Blue for bucket fish
                bucketFishCount++;
            } else {
                fishData.fish.resetGlowing();
            }
        }

        Chat.log(`&aHighlighted ${bucketFishCount} bucket-released fish in blue.`);
    }

    highlightNaturalFish() {
        let naturalFishCount = 0;

        for (const [uuid, fishData] of this.trackedFish) {
            if (!fishData.isFromBucket) {
                fishData.fish.setGlowing(true);
                fishData.fish.setGlowingColor(0x00FF00); // Green for natural fish
                naturalFishCount++;
            } else {
                fishData.fish.resetGlowing();
            }
        }

        Chat.log(`&aHighlighted ${naturalFishCount} naturally spawned fish in green.`);
    }

    clearHighlights() {
        for (const [uuid, fishData] of this.trackedFish) {
            fishData.fish.resetGlowing();
        }
        Chat.log("&7Cleared all fish highlights.");
    }
}

// Initialize and run the aquarium monitor
const aquariumMonitor = new AquariumMonitor();

// Set aquarium bounds around player (example: 8x8x8 cube around player)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 100 === 0) { // Check every 5 seconds
        const player = Player.getPlayer();
        if (player) {
            const pos = player.getPos();
            aquariumMonitor.setAquariumBounds(pos, 8);
        }
    }
}));

// Update fish tracking every 20 ticks (1 second)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) {
        aquariumMonitor.scanForFish();
    }
}));

// Generate report every 5 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 5) === 0) {
        aquariumMonitor.generateReport();
    }
}));

// Health check every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        aquariumMonitor.checkAquariumHealth();
    }
}));

Chat.log("&aAquarium Monitor activated! Tracking fish around your location.");
```

### Fish Origin Tracker
```js
// Simple fish origin detection and tracking system
class FishOriginTracker {
    constructor() {
        this.bucketFish = new Set();
        this.naturalFish = new Set();
        this.scanRadius = 32;
    }

    scanNearbyFish() {
        const entities = World.getEntities(this.scanRadius);
        const player = Player.getPlayer();
        if (!player) return;

        let bucketCount = 0;
        let naturalCount = 0;

        Chat.log("&6=== Fish Origin Scan ===");

        entities.forEach(entity => {
            const entityType = entity.getType();

            if (this.isFishEntity(entityType)) {
                const fish = entity.asFish();
                const uuid = fish.getUUID();
                const pos = fish.getPos();
                const distance = player.distanceTo(entity);
                const isFromBucket = fish.isFromBucket();
                const type = entityType.replace("minecraft:", "");

                if (isFromBucket && !this.bucketFish.has(uuid)) {
                    this.bucketFish.add(uuid);
                    bucketCount++;
                    Chat.log(`&b🪣 Bucket ${type}: ${distance.toFixed(1)}m away [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

                    // Highlight bucket fish
                    fish.setGlowing(true);
                    fish.setGlowingColor(0x00AAFF);
                } else if (!isFromBucket && !this.naturalFish.has(uuid)) {
                    this.naturalFish.add(uuid);
                    naturalCount++;
                    Chat.log(`&a🌊 Natural ${type}: ${distance.toFixed(1)}m away [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

                    // Highlight natural fish
                    fish.setGlowing(true);
                    fish.setGlowingColor(0x00FF00);
                }
            }
        });

        Chat.log(`\nFound: ${bucketCount} bucket fish, ${naturalCount} natural fish`);
        Chat.log(`Total tracked: ${this.bucketFish.size} bucket, ${this.naturalFish.size} natural`);
    }

    isFishEntity(entityType) {
        const fishTypes = [
            "minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:pufferfish"
        ];
        return fishTypes.includes(entityType);
    }

    clearTracking() {
        this.bucketFish.clear();
        this.naturalFish.clear();

        // Clear glowing effects
        const entities = World.getEntities(this.scanRadius);
        entities.forEach(entity => {
            if (this.isFishEntity(entity.getType())) {
                entity.resetGlowing();
            }
        });

        Chat.log("&7Fish tracking cleared.");
    }

    showStatistics() {
        const totalTracked = this.bucketFish.size + this.naturalFish.size;
        const bucketPercentage = totalTracked > 0 ? ((this.bucketFish.size / totalTracked) * 100).toFixed(1) : 0;
        const naturalPercentage = totalTracked > 0 ? ((this.naturalFish.size / totalTracked) * 100).toFixed(1) : 0;

        Chat.log("&6=== Fish Origin Statistics ===");
        Chat.log(`Total fish tracked: ${totalTracked}`);
        Chat.log(`Bucket fish: ${this.bucketFish.size} (${bucketPercentage}%)`);
        Chat.log(`Natural fish: ${this.naturalFish.size} (${naturalPercentage}%)`);
    }
}

// Initialize fish origin tracker
const fishTracker = new FishOriginTracker();

// Command registration (if supported)
// Usage: Run scanNearbyFish() to scan, clearTracking() to reset, showStatistics() for stats

Chat.log("&aFish Origin Tracker ready! Use fishTracker.scanNearbyFish() to start.");
```

### Fish Breeding Pool Monitor
```js
// Monitor fish in breeding pools or automatic fish farms
class FishFarmMonitor {
    constructor() {
        this.poolLocations = [];
        this.fishInPools = new Map(); // poolId -> Set of fish UUIDs
        this.poolStatistics = new Map(); // poolId -> statistics
    }

    addPool(location, radius, name) {
        const poolId = this.poolLocations.length;
        this.poolLocations.push({
            id: poolId,
            name: name || `Pool ${poolId + 1}`,
            center: location,
            radius: radius,
            fish: new Set()
        });
        this.poolStatistics.set(poolId, {
            totalSpawned: 0,
            bucketFish: 0,
            naturalFish: 0,
            lastUpdate: 0
        });
        Chat.log(`&aAdded fish pool: ${name || `Pool ${poolId + 1}`} at [${location.x}, ${location.y}, ${location.z}]`);
        return poolId;
    }

    updatePools() {
        const entities = World.getEntities();

        // Reset current fish tracking
        this.poolLocations.forEach(pool => pool.fish.clear());

        entities.forEach(entity => {
            if (this.isFishEntity(entity.getType())) {
                const fish = entity.asFish();
                const pos = fish.getPos();

                // Check which pool this fish is in
                for (const pool of this.poolLocations) {
                    const distance = Math.sqrt(
                        Math.pow(pos.x - pool.center.x, 2) +
                        Math.pow(pos.y - pool.center.y, 2) +
                        Math.pow(pos.z - pool.center.z, 2)
                    );

                    if (distance <= pool.radius) {
                        const uuid = fish.getUUID();
                        pool.fish.add(uuid);

                        // Update statistics
                        const stats = this.poolStatistics.get(pool.id);
                        if (!this.fishInPools.has(uuid)) {
                            stats.totalSpawned++;
                            if (fish.isFromBucket()) {
                                stats.bucketFish++;
                            } else {
                                stats.naturalFish++;
                            }
                        }

                        this.fishInPools.set(uuid, pool.id);
                        stats.lastUpdate = Client.getTime();
                        break; // Fish can only be in one pool
                    }
                }
            }
        });

        // Clean up fish that are no longer in any pool
        const currentFishUUIDs = new Set();
        this.poolLocations.forEach(pool => {
            pool.fish.forEach(uuid => currentFishUUIDs.add(uuid));
        });

        for (const [uuid, poolId] of this.fishInPools) {
            if (!currentFishUUIDs.has(uuid)) {
                this.fishInPools.delete(uuid);
            }
        }
    }

    generatePoolReport() {
        Chat.log("&6=== Fish Farm Report ===");

        if (this.poolLocations.length === 0) {
            Chat.log("&7No pools defined. Use addPool() to add fish pools.");
            return;
        }

        let totalFish = 0;
        let totalBucket = 0;
        let totalNatural = 0;

        this.poolLocations.forEach(pool => {
            const stats = this.poolStatistics.get(pool.id);
            const fishCount = pool.fish.size;

            totalFish += fishCount;
            totalBucket += stats.bucketFish;
            totalNatural += stats.naturalFish;

            Chat.log(`\n&a${pool.name}:`);
            Chat.log(`  - Current fish: ${fishCount}`);
            Chat.log(`  - Total spawned: ${stats.totalSpawned}`);
            Chat.log(`  - Bucket origins: ${stats.bucketFish}`);
            Chat.log(`  - Natural spawns: ${stats.naturalFish}`);

            if (fishCount > 0) {
                const efficiency = ((fishCount / Math.max(1, stats.totalSpawned)) * 100).toFixed(1);
                Chat.log(`  - Retention rate: ${efficiency}%`);
            }
        });

        Chat.log(`\n&6Overall Summary:`);
        Chat.log(`  - Total pools: ${this.poolLocations.length}`);
        Chat.log(`  - Current fish: ${totalFish}`);
        Chat.log(`  - Bucket origins: ${totalBucket}`);
        Chat.log(`  - Natural spawns: ${totalNatural}`);
    }

    highlightPool(poolId) {
        const pool = this.poolLocations.find(p => p.id === poolId);
        if (!pool) {
            Chat.log(`&cPool with ID ${poolId} not found.`);
            return;
        }

        let highlightedCount = 0;
        const entities = World.getEntities();

        entities.forEach(entity => {
            if (this.isFishEntity(entity.getType())) {
                const fish = entity.asFish();
                const uuid = fish.getUUID();

                if (pool.fish.has(uuid)) {
                    fish.setGlowing(true);
                    fish.setGlowingColor(0xFFFF00); // Yellow for pool fish
                    highlightedCount++;
                }
            }
        });

        Chat.log(`&aHighlighted ${highlightedCount} fish in ${pool.name} in yellow.`);
    }

    isFishEntity(entityType) {
        const fishTypes = [
            "minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish", "minecraft:pufferfish"
        ];
        return fishTypes.includes(entityType);
    }
}

// Initialize fish farm monitor
const fishFarm = new FishFarmMonitor();

// Example pool setup (run this script where you want to monitor)
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 200 === 0) { // Every 10 seconds
        fishFarm.updatePools();
    }

    if (Client.getTime() % (20 * 60 * 2) === 0) { // Every 2 minutes
        fishFarm.generatePoolReport();
    }
}));

Chat.log("&aFish Farm Monitor ready! Add pools with fishFarm.addPool(location, radius, name)");
```

---

## Method Details

### `fish.isFromBucket()`

Returns true if this fish was spawned from a water bucket, false if it spawned naturally in the world.

**Returns:**
- `boolean`: true if the fish came from a bucket, false otherwise

**Example:**
```js
// Check if a fish is from a bucket
const fish = entity.asFish();
if (fish.isFromBucket()) {
    Chat.log("This fish was released from a bucket!");
    // Highlight bucket fish differently
    fish.setGlowingColor(0x00AAFF); // Blue for bucket fish
} else {
    Chat.log("This fish spawned naturally!");
    // Highlight natural fish differently
    fish.setGlowingColor(0x00FF00); // Green for natural fish
}
```

**Notes:**
- Fish from buckets retain their bucket origin status even after being released
- Natural spawning occurs in ocean, river, and other water biomes
- Bucket fish can be identified and tracked differently from natural fish
- This is useful for aquarium management and fish farm monitoring

## Notes and Limitations

- FishEntityHelper instances become invalid when the fish entity is removed from the world (dies, despawns, or unloaded). Always check `isAlive()` before accessing fish data.
- `isFromBucket()` is the primary method for distinguishing between player-placed fish and naturally spawned fish, which is useful for aquarium management.
- Fish entities include cod, salmon, tropical fish, and pufferfish in Minecraft.
- Fish can only survive in water; they will take damage when out of water and eventually die.
- This class serves as a base class for more specialized fish helpers: `TropicalFishEntityHelper` and `PufferfishEntityHelper`.
- Fish movement patterns are influenced by water flow, obstacles, and other fish in the area.
- Fish have different behaviors regarding breeding, with some species requiring specific conditions.
- The inheritance hierarchy provides access to all mob entity methods including AI states and targeting.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important fish for better visibility.
- Fish from buckets may have different behavioral patterns compared to naturally spawned fish in some contexts.

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and combat behaviors
- `AnimalEntityHelper` - Animal-specific functionality including breeding and food preferences
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `TropicalFishEntityHelper` - Specialized helper for tropical fish with variant and color information
- `PufferfishEntityHelper` - Specialized helper for pufferfish with inflation state tracking

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft FishEntity implementation
- Inherits comprehensive functionality from the mob entity hierarchy
- Designed specifically for fish management, aquarium monitoring, and aquatic automation systems