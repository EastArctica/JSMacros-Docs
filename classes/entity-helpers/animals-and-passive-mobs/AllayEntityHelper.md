# AllayEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.AllayEntityHelper`

**Extends:** `MobEntityHelper<AllayEntity>`

**Since:** 1.8.4

The `AllayEntityHelper` class provides specialized methods for interacting with Allay entities in Minecraft. Allays are flying passive mobs introduced in Minecraft 1.19 that are attracted to music and will collect and deliver items to players. These peaceful, ghost-like creatures spawn in pillager outposts and woodland mansions, and they form strong bonds with players who interact with them.

Allays are unique among Minecraft mobs for their item collection behavior - they will fly around and pick up items within a 32-block radius, then deliver them to the player who gave them an item or played music nearby. They can also be duplicated using amethyst shards when dancing. This helper provides access to key Allay behaviors including their dancing state, duplication availability, and current item carrying status.

This class extends `MobEntityHelper` and inherits all methods for health, AI control, movement, and other mob properties, while adding Allay-specific functionality.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Notes and Limitations](#notes-and-limitations)
- [Related Classes](#related-classes)

---

## Constructors

AllayEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityInteract`, `EntitySpawn`, `EntityDeath`) when the entity type is `minecraft:allay`
- World entity queries using `World.getEntities("minecraft:allay")` or other search methods
- Type casting from generic `EntityHelper` instances using `entity.as("minecraft:allay")`
- The static casting methods when you know an entity is an Allay

---

## Methods

### `isDancing()`

Returns whether the allay is currently dancing. Allays dance when they hear a note block playing within a 16-block radius. Dancing allays can also be duplicated using amethyst shards.

```js
// Check if allays in the area are dancing to nearby music
const allays = World.getEntities("minecraft:allay");
let dancingCount = 0;

allays.forEach(entity => {
    const allay = entity.as("minecraft:allay");
    if (allay && allay.isDancing()) {
        dancingCount++;
        const pos = entity.getPos();
        Chat.log(`Allay dancing at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
    }
});

Chat.log(`Found ${dancingCount} dancing allays out of ${allays.length} total`);
```

**Returns:** `boolean` - `true` if the allay is currently dancing (hearing music), `false` otherwise.

---

### `canDuplicate()`

Returns whether this allay can be duplicated. Allays can be duplicated when they are dancing and the player uses an amethyst shard on them. This method checks if the duplication conditions are met.

```js
// Find allays that are ready for duplication
function findDuplicateableAllays() {
    const allays = World.getEntities("minecraft:allay");
    const player = Player.getPlayer();
    if (!player) return;

    Chat.log("=== Allay Duplication Check ===");

    allays.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= 8) { // Only check nearby allays
            const allay = entity.as("minecraft:allay");
            if (allay && allay.canDuplicate()) {
                const pos = entity.getPos();
                const isDancing = allay.isDancing();
                Chat.log(`Duplicateable allay at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] (${distance.toFixed(1)}m away)`);
                Chat.log(`  Dancing: ${isDancing ? "Yes" : "No"}`);
                Chat.log(`  Ready for duplication with amethyst shard!`);
            }
        }
    });
}

findDuplicateableAllays();
```

**Returns:** `boolean` - `true` if the allay can be duplicated (typically when dancing), `false` otherwise.

---

### `isHoldingItem()`

Returns whether this allay is currently holding an item. Allays pick up items within their detection range and hold them while flying to deliver them to players.

```js
// Monitor allay item collection activity
class AllayActivityMonitor {
    constructor() {
        this.allayStates = new Map();
        this.itemsDelivered = 0;
        this.itemsCollected = 0;
    }

    updateAllayActivity() {
        const allays = World.getEntities("minecraft:allay");

        allays.forEach(entity => {
            const uuid = entity.getUUID();
            const allay = entity.as("minecraft:allay");
            if (!allay) return;

            const isHolding = allay.isHoldingItem();
            const isDancing = allay.isDancing();
            const pos = entity.getPos();

            if (!this.allayStates.has(uuid)) {
                // New allay detected
                this.allayStates.set(uuid, {
                    entity: entity,
                    lastHoldingState: isHolding,
                    pickupsDetected: 0,
                    deliveriesDetected: 0,
                    firstSeen: Client.getTime(),
                    position: { x: pos.x, y: pos.y, z: pos.z }
                });
                Chat.log(`🧚 New allay detected: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
            } else {
                // Update existing allay
                const allayData = this.allayStates.get(uuid);

                // Detect state changes
                if (allayData.lastHoldingState !== isHolding) {
                    if (isHolding) {
                        // Allay just picked up an item
                        allayData.pickupsDetected++;
                        this.itemsCollected++;
                        Chat.log(`🧚 Allay picked up item #${this.itemsCollected} at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
                    } else {
                        // Allay just delivered an item
                        allayData.deliveriesDetected++;
                        this.itemsDelivered++;
                        Chat.log(`🧚 Allay delivered item #${this.itemsDelivered}!`);
                    }
                    allayData.lastHoldingState = isHolding;
                }

                // Update position
                allayData.position = { x: pos.x, y: pos.y, z: pos.z };
            }
        });
    }

    generateReport() {
        if (this.allayStates.size === 0) {
            Chat.log("No allays currently being tracked");
            return;
        }

        Chat.log(`🧚=== Allay Activity Report ===`);
        Chat.log(`Allays tracked: ${this.allayStates.size}`);
        Chat.log(`Total items collected: ${this.itemsCollected}`);
        Chat.log(`Total items delivered: ${this.itemsDelivered}`);
        Chat.log(`Efficiency rate: ${this.itemsCollected > 0 ? (this.itemsDelivered / this.itemsCollected * 100).toFixed(1) : 0}%`);

        let dancingCount = 0;
        let holdingCount = 0;

        for (const [uuid, allayData] of this.allayStates) {
            const allay = allayData.entity.as("minecraft:allay");
            if (allay) {
                if (allay.isDancing()) dancingCount++;
                if (allay.isHoldingItem()) holdingCount++;
            }
        }

        Chat.log(`Currently dancing: ${dancingCount}`);
        Chat.log(`Currently holding items: ${holdingCount}`);

        if (dancingCount > 0) {
            Chat.log("💎 Some allays are dancing - good opportunity for duplication!");
        }
    }
}

const allayMonitor = new AllayActivityMonitor();

// Monitor allay activity every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks = 1 second
        allayMonitor.updateAllayActivity();
    }
}));

// Report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.a" && e.action === 1) { // A key
        allayMonitor.generateReport();
    }
}));
```

**Returns:** `boolean` - `true` if the allay is currently holding an item, `false` otherwise.

---

## Usage Examples

### Allay Behavior Analysis
```js
// Comprehensive analysis of allay behavior in the area
function analyzeAllayBehavior() {
    const player = Player.getPlayer();
    if (!player) return;

    const allays = World.getEntities("minecraft:allay");
    const playerPos = player.getPos();
    const range = 32; // Allays detect items within 32 blocks

    Chat.log("🧚=== Allay Behavior Analysis ===");
    Chat.log(`Found ${allays.length} allays in the world`);

    if (allays.length === 0) {
        Chat.log("No allays found. Allays spawn in pillager outposts and woodland mansions.");
        return;
    }

    let nearbyCount = 0;
    let dancingCount = 0;
    let holdingCount = 0;
    let duplicateableCount = 0;
    let totalPickupCapacity = 0;

    allays.forEach(entity => {
        const distance = player.distanceTo(entity);
        const allay = entity.as("minecraft:allay");
        const pos = entity.getPos();

        // Count nearby allays
        if (distance <= range) {
            nearbyCount++;

            // Get allay states
            const isDancing = allay.isDancing();
            const isHolding = allay.isHoldingItem();
            const canDuplicate = allay.canDuplicate();

            // Count behaviors
            if (isDancing) dancingCount++;
            if (isHolding) holdingCount++;
            if (canDuplicate) duplicateableCount++;

            // Log detailed information for nearby allays
            Chat.log(`\nAllay at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] (${distance.toFixed(1)}m away):`);
            Chat.log(`  Dancing: ${isDancing ? "Yes 🎵" : "No"}`);
            Chat.log(`  Holding item: ${isHolding ? "Yes 📦" : "No"}`);
            Chat.log(`  Can duplicate: ${canDuplicate ? "Yes 💎" : "No"}`);
            Chat.log(`  Health: ${entity.asLiving()?.getHealth() || "Unknown"}/${entity.asLiving()?.getMaxHealth() || "Unknown"}`);

            // Check for nearby note blocks (which make allays dance)
            if (isDancing) {
                Chat.log(`  Note block detected nearby - allay is dancing!`);
            }

            // Check if allay is in a structure (where they naturally spawn)
            const biome = World.getBiome(pos.x, pos.y, pos.z);
            if (biome.includes("mansion") || biome.includes("outpost")) {
                Chat.log(`  In natural spawning structure: ${biome}`);
            }
        }
    });

    // Summary statistics
    Chat.log(`\n=== Summary (within ${range} blocks) ===`);
    Chat.log(`Nearby allays: ${nearbyCount}/${allays.length}`);
    Chat.log(`Dancing: ${dancingCount}`);
    Chat.log(`Holding items: ${holdingCount}`);
    Chat.log(`Ready for duplication: ${duplicateableCount}`);

    // Behavioral insights
    if (dancingCount > 0) {
        Chat.log(`🎵 Musical activity detected! ${dancingCount} allay(s) are dancing.`);
        Chat.log("  Tip: Use amethyst shards on dancing allays to duplicate them!");
    }

    if (holdingCount > 0) {
        Chat.log(`📦 ${holdingCount} allay(s) are currently carrying items.`);
        Chat.log("  Allays automatically deliver items to nearby players or note blocks.");
    }

    if (duplicateableCount > 0) {
        Chat.log(`💎 ${duplicateableCount} allay(s) can be duplicated right now!`);
    }

    // Spawn location analysis
    if (nearbyCount > 0) {
        Chat.log("\n💡 Allay Tips:");
        Chat.log("- Give an allay an item to make it collect similar items");
        Chat.log("- Play note blocks to make allays dance and deliver items there");
        Chat.log("- Use amethyst shards on dancing allays to duplicate them");
        Chat.log("- Allays will follow players holding items they like");
    }
}

analyzeAllayBehavior();
```

### Allay Collection System
```js
// Set up an automated item collection system using allays
class AllayCollectionSystem {
    constructor() {
        this.collectionPoints = new Map();
        this.activeAllays = new Set();
        this.itemsCollected = new Map();
        this.collectionRadius = 32;
    }

    // Register a collection point (where allays should deliver items)
    registerCollectionPoint(position, itemTypes = [], name = "Collection Point") {
        const pointId = `${position.x.toFixed(0)}_${position.y.toFixed(0)}_${position.z.toFixed(0)}`;
        this.collectionPoints.set(pointId, {
            position: position,
            itemTypes: itemTypes, // Filter for specific item types if desired
            name: name,
            totalDelivered: 0,
            lastActivity: Client.getTime()
        });
        Chat.log(`📍 Registered collection point: ${name} at [${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]`);
        return pointId;
    }

    // Find and assign allays to nearby collection points
    assignAllaysToCollectionPoints() {
        const allays = World.getEntities("minecraft:allay");

        allays.forEach(entity => {
            const allay = entity.as("minecraft:allay");
            if (!allay || this.activeAllays.has(entity.getUUID())) return;

            const allayPos = entity.getPos();

            // Find nearest collection point
            let nearestPoint = null;
            let nearestDistance = Infinity;
            let nearestPointId = null;

            for (const [pointId, point] of this.collectionPoints) {
                const distance = Math.sqrt(
                    Math.pow(allayPos.x - point.position.x, 2) +
                    Math.pow(allayPos.y - point.position.y, 2) +
                    Math.pow(allayPos.z - point.position.z, 2)
                );

                if (distance < nearestDistance && distance <= this.collectionRadius) {
                    nearestDistance = distance;
                    nearestPoint = point;
                    nearestPointId = pointId;
                }
            }

            if (nearestPoint) {
                this.activeAllays.add(entity.getUUID());
                Chat.log(`🧚 Allay assigned to ${nearestPoint.name} (${nearestDistance.toFixed(1)}m away)`);

                // Play a note block sound to attract the allay
                this.playAttractionNote(nearestPoint.position);
            }
        });
    }

    // Simulate playing a note to attract allays
    playAttractionNote(position) {
        // In a real implementation, you might place a note block or use other methods
        // For now, we'll just log the intention
        Chat.log(`🎵 Playing attraction note at [${position.x.toFixed(1)}, ${position.y.toFixed(1)}, ${position.z.toFixed(1)}]`);
    }

    // Monitor allay collection activity
    monitorCollectionActivity() {
        const allays = World.getEntities("minecraft:allay");

        allays.forEach(entity => {
            const allay = entity.as("minecraft:allay");
            if (!allay || !this.activeAllays.has(entity.getUUID())) return;

            const isHolding = allay.isHoldingItem();
            const allayPos = entity.getPos();
            const uuid = entity.getUUID();

            // Check if allay is near any collection point
            for (const [pointId, point] of this.collectionPoints) {
                const distance = Math.sqrt(
                    Math.pow(allayPos.x - point.position.x, 2) +
                    Math.pow(allayPos.y - point.position.y, 2) +
                    Math.pow(allayPos.z - point.position.z, 2)
                );

                // If allay is close and just delivered an item
                if (distance <= 3 && !isHolding) {
                    point.totalDelivered++;
                    point.lastActivity = Client.getTime();

                    const itemType = this.itemsCollected.get(uuid) || "unknown item";
                    Chat.log(`✅ Allay delivered ${itemType} to ${point.name} (Total: ${point.totalDelivered})`);
                    this.itemsCollected.delete(uuid);
                }
                // If allay picked up an item
                else if (isHolding && !this.itemsCollected.has(uuid)) {
                    this.itemsCollected.set(uuid, "item");
                    Chat.log(`📦 Allay picked up item near ${point.name}`);
                }
            }
        });
    }

    // Generate collection system report
    generateReport() {
        Chat.log(`🧚=== Allay Collection System Report ===`);
        Chat.log(`Active allays: ${this.activeAllays.size}`);
        Chat.log(`Collection points: ${this.collectionPoints.size}`);

        let totalDeliveries = 0;
        for (const [pointId, point] of this.collectionPoints) {
            totalDeliveries += point.totalDelivered;
            Chat.log(`\n📍 ${point.name}:`);
            Chat.log(`  Position: [${point.position.x.toFixed(1)}, ${point.position.y.toFixed(1)}, ${point.position.z.toFixed(1)}]`);
            Chat.log(`  Total deliveries: ${point.totalDelivered}`);
            Chat.log(`  Last activity: ${Client.getTime() - point.lastActivity} ticks ago`);
        }

        Chat.log(`\n📦 Total items collected: ${totalDeliveries}`);
        Chat.log(`⚡ System efficiency: ${this.activeAllays.size > 0 ? (totalDeliveries / this.activeAllays.size).toFixed(1) : 0} items per allay`);
    }
}

// Create and configure the collection system
const collectionSystem = new AllayCollectionSystem();

// Example: Set up collection points at player's current location
function setupCollectionPoints() {
    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();

    // Main collection point at player's position
    collectionSystem.registerCollectionPoint(
        PositionHelper.create(pos.x, pos.y + 1, pos.z),
        [], // Collect all items
        "Main Collection Point"
    );

    // Secondary collection point a few blocks away
    collectionSystem.registerCollectionPoint(
        PositionHelper.create(pos.x + 5, pos.y, pos.z + 5),
        ["minecraft:diamond", "minecraft:emerald", "minecraft:iron_ingot"], // Collect valuable items
        "Valuables Collection"
    );

    Chat.log("✅ Allay collection system initialized with 2 collection points");
}

// Monitor and update the system
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    // Assign allays every 5 seconds
    if (Client.getTime() % 100 === 0) {
        collectionSystem.assignAllaysToCollectionPoints();
    }

    // Monitor activity every second
    if (Client.getTime() % 20 === 0) {
        collectionSystem.monitorCollectionActivity();
    }
}));

// Commands
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.c" && e.action === 1) { // C key
        setupCollectionPoints();
    } else if (e.key === "key.keyboard.r" && e.action === 1) { // R key
        collectionSystem.generateReport();
    }
}));
```

### Allay Breeding and Duplication Guide
```js
// Guide for allay duplication and management
function allayDuplicationGuide() {
    const allays = World.getEntities("minecraft:allay");
    const player = Player.getPlayer();
    if (!player) return;

    Chat.log("🧚💎=== Allay Duplication Guide ===");

    if (allays.length === 0) {
        Chat.log("❌ No allays found nearby. Allays spawn in:");
        Chat.log("- Woodland Mansions");
        Chat.log("- Pillager Outposts");
        Chat.log("They're passive and friendly mobs that help collect items!");
        return;
    }

    let dancingAllays = [];
    let duplicateableAllays = [];
    let nearbyAllays = [];

    allays.forEach(entity => {
        const distance = player.distanceTo(entity);
        const allay = entity.as("minecraft:allay");
        const pos = entity.getPos();

        if (distance <= 16) { // Nearby allays
            nearbyAllays.push({
                entity: entity,
                allay: allay,
                distance: distance,
                position: pos,
                isDancing: allay.isDancing(),
                canDuplicate: allay.canDuplicate(),
                isHolding: allay.isHoldingItem()
            });

            if (allay.isDancing()) {
                dancingAllays.push(entity);
            }

            if (allay.canDuplicate()) {
                duplicateableAllays.push(entity);
            }
        }
    });

    Chat.log(`Found ${nearbyAllays.length} allays within 16 blocks`);

    if (dancingAllays.length > 0) {
        Chat.log(`\n🎵 Dancing Allays (${dancingAllays.length}):`);
        dancingAllays.forEach(entity => {
            const allay = entity.as("minecraft:allay");
            const pos = entity.getPos();
            const distance = player.distanceTo(entity);
            Chat.log(`  Allay at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] (${distance.toFixed(1)}m away)`);

            if (allay.canDuplicate()) {
                Chat.log(`    ✅ READY FOR DUPLICATION! Use amethyst shard`);
            } else {
                Chat.log(`    ⏳ Almost ready... make sure there's a note block playing nearby`);
            }
        });

        Chat.log("\n💎 Duplication Instructions:");
        Chat.log("1. Make sure allays are dancing (note blocks playing within 16 blocks)");
        Chat.log("2. Hold an amethyst shard in your main hand");
        Chat.log("3. Right-click on the dancing allay");
        Chat.log("4. A new allay will spawn with a short cooldown");
        Chat.log("5. Each duplication consumes 1 amethyst shard");
    }

    if (duplicateableAllays.length > 0 && dancingAllays.length === 0) {
        Chat.log(`\n💎 Ready Allays (${duplicateableAllays.length}):`);
        Chat.log("These allays can duplicate but need music first!");
        Chat.log("Place a note block nearby and play it to make them dance.");
    }

    if (nearbyAllays.length > 0 && dancingAllays.length === 0) {
        Chat.log("\n🎵 Making Allays Dance:");
        Chat.log("1. Place a note block within 16 blocks of the allays");
        Chat.log("2. Right-click the note block to play a note");
        Chat.log("3. Allays within range will start dancing");
        Chat.log("4. Dancing allays can then be duplicated with amethyst shards");

        // Suggest note block placement
        const playerPos = player.getPos();
        Chat.log(`\n📍 Suggested note block positions:`);
        for (let i = 0; i < Math.min(3, nearbyAllays.length); i++) {
            const allayData = nearbyAllays[i];
            const pos = allayData.position;
            Chat.log(`  Near allay at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        }
    }

    // Check player's inventory for amethyst shards
    const inventory = Player.openInventory();
    const amethystShards = inventory.getSlots().filter(slot =>
        slot && slot.getItemId() === "minecraft:amethyst_shard"
    );

    if (amethystShards.length > 0) {
        const totalShards = amethystShards.reduce((sum, slot) => sum + slot.getCount(), 0);
        Chat.log(`\n💎 You have ${totalShards} amethyst shard(s) - ready for duplication!`);
        Chat.log(`   Can duplicate up to ${Math.floor(totalShards / 1)} allay pairs`);
    } else {
        Chat.log(`\n💎 You need amethyst shards to duplicate allays!`);
        Chat.log(`   Find them in amethyst geodes underground (Y=70 and below)`);
    }

    // Allay care tips
    Chat.log("\n🧚 Allay Care Tips:");
    Chat.log("- Allays follow players holding items they like");
    Chat.log("- Give an allay any item to make it collect similar items");
    Chat.log("- Allays have infinite item collection capacity");
    Chat.log("- They're immune to fall damage and can fly through water");
    Chat.log("- Name tags can be used to name your allays");
    Chat.log("- Lead allays with leads to keep them in specific areas");
}

// Run the guide
allayDuplicationGuide();

// Set up keybind to refresh the guide
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.g" && e.action === 1) { // G key
        allayDuplicationGuide();
    }
}));
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if allay is currently attacking (always false for passive allays)
- `isAiDisabled()` - Check if allay's AI is disabled
- `getLeashed()` - Check if allay is leashed to something

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (allays have 15 health points)
- `getStatusEffects()` - Active status effects
- `isBaby()` - Check if allay is a baby variant (allays don't have baby forms)
- `getArmor()` - Armor value (always 0 for allays)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks
- `getUUID()` - Unique identifier for tracking specific allays

---

## Notes and Limitations

- AllayEntityHelper is designed specifically for `minecraft:allay` entities and won't work with other flying or collecting mobs
- The `isDancing()` method indicates when allays hear note blocks, which is required for duplication
- Allays can only be duplicated when dancing and requires an amethyst shard item
- Allays have a 5-minute cooldown between duplications
- Allays spawn naturally in woodland mansions and pillager outposts, but can also be spawned with spawn eggs
- Allays are immune to most damage sources but can take damage from attacks
- Allays will follow players holding items they're interested in collecting
- Item collection range is approximately 32 blocks from the allay
- Allays prioritize delivering items to the player who gave them the initial item
- Allays can navigate through small spaces and water due to their ghost-like nature
- They are completely passive and will never attack players or other mobs

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and basic mob behavior methods
- `LivingEntityHelper` - Base class with health, status effects, and general living entity functionality
- `EntityHelper` - Base class with general entity methods for position, movement, and identification
- `BeeEntityHelper` - Another flying passive mob with unique behaviors
- `VexEntityHelper` - Small flying mob (hostile) for comparison
- `ItemStackHelper` - For managing items given to or collected by allays
- `World` - For finding allays and checking their environment

---

## Version Information

- Available since JsMacros 1.8.4 (when Allays were added to Minecraft)
- Part of the specialized entity helper hierarchy for comprehensive passive mob interaction
- Essential tool for automated item collection systems, farm management, and allay breeding programs
- All methods are read-only and query current allay state and behavior