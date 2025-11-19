# IronGolemEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.IronGolemEntityHelper`

**Extends:** `MobEntityHelper<IronGolemEntity>`

**Since:** JsMacros 1.8.4

The `IronGolemEntityHelper` class provides specialized access to iron golem entities in Minecraft, offering methods to determine the origin and creation context of these protective mobs. This class extends `MobEntityHelper` and inherits comprehensive mob functionality including AI states, combat behaviors, health monitoring, and all living entity properties.

Iron golems are large, neutral mobs that protect villagers and players from hostile mobs. They can spawn naturally in villages or be constructed by players. This helper is particularly useful for creating scripts that:

- Monitor village defenses and iron golem populations
- Distinguish between naturally spawned and player-created golems
- Track iron golem behavior and combat activities
- Manage village protection systems
- Analyze village health and safety metrics

## Class Declaration

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.IronGolemEntityHelper`
**Extends:** `MobEntityHelper<IronGolemEntity>`
**Type Parameter:** `IronGolemEntity` - Specific to iron golem entities

## Accessing IronGolemEntityHelper

You typically get `IronGolemEntityHelper` instances from:
- Entity events involving iron golems
- World entity searches filtered for iron golem types
- Casting from generic EntityHelper instances using type checking

```javascript
// Example: Getting IronGolemEntityHelper from nearby iron golems
const player = Player.getPlayer();
const nearbyEntities = World.getEntities(20); // 20 block radius
let ironGolems = [];

for (const entity of nearbyEntities) {
    if (entity.is("minecraft:iron_golem")) {
        ironGolems.push(entity.asIronGolem());
    }
}

Chat.log(`Found ${ironGolems.length} iron golems nearby`);
ironGolems.forEach(golem => {
    const created = golem.isPlayerCreated() ? "player-built" : "naturally spawned";
    Chat.log(`- ${created} golem at ${golem.getPos()}`);
});
```

## Methods

### Iron Golem-Specific Methods

- [golem.isPlayerCreated()](#golemisplayercreated)

### Inherited Methods

The IronGolemEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Iron Golem-Specific Methods

### golem.isPlayerCreated()

```js
const isPlayerBuilt = golem.isPlayerCreated();
if (isPlayerBuilt) {
    Chat.log("This iron golem was constructed by a player");
} else {
    Chat.log("This iron golem spawned naturally in a village");
}
```

**Returns**
* `boolean`: `true` if this iron golem was created by a player, `false` otherwise.

**Notes**
- Player-created golems are built using 4 iron blocks and 1 carved pumpkin or jack o'lantern
- Naturally spawned golems appear in villages with sufficient population and houses
- This distinction can be useful for village management and golem population control
- Both types of golems behave identically in terms of protection and combat

---

## Usage Examples

### Example 1: Village Defense Monitor

```js
function createVillageDefenseMonitor() {
    let lastScanTime = 0;
    const SCAN_COOLDOWN = 10000; // 10 seconds between scans
    const VILLAGE_RADIUS = 64; // 64 block radius to cover entire village

    function scanVillageDefenses() {
        const currentTime = Date.now();
        if (currentTime - lastScanTime < SCAN_COOLDOWN) {
            return; // Too soon to scan again
        }
        lastScanTime = currentTime;

        const player = Player.getPlayer();
        if (!player) return;

        // Find all entities in village radius
        const entities = World.getEntities(VILLAGE_RADIUS);
        const ironGolems = [];
        const villagers = [];
        const hostileMobs = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:iron_golem")) {
                ironGolems.push({
                    golem: entity.asIronGolem(),
                    entity: entity,
                    position: entity.getPos(),
                    health: entity.asLiving().getHealth(),
                    maxHealth: entity.asLiving().getMaxHealth(),
                    isAttacking: entity.asMob().isAttacking(),
                    isPlayerCreated: entity.asIronGolem().isPlayerCreated()
                });
            } else if (entity.is("minecraft:villager")) {
                villagers.push(entity);
            } else if (isHostileMob(entity)) {
                hostileMobs.push(entity);
            }
        });

        // Generate defense report
        generateDefenseReport(ironGolems, villagers, hostileMobs);
    }

    function isHostileMob(entity) {
        return entity.is(
            "minecraft:zombie", "minecraft:skeleton", "minecraft:creeper",
            "minecraft:spider", "minecraft:witch", "minecraft:pillager",
            "minecraft:vindicator", "minecraft:evoker", "minecraft:ravager"
        );
    }

    function generateDefenseReport(golems, villagers, hostiles) {
        Chat.log("=== Village Defense Report ===");
        Chat.log(`Villagers: ${villagers.length}`);
        Chat.log(`Iron Golems: ${golems.length}`);
        Chat.log(`Hostile Mobs: ${hostiles.length}`);

        if (golems.length === 0) {
            Chat.log("&c⚠ WARNING: No iron golems found! Village is unprotected.");
            Chat.log("   Consider building iron golems or improving village conditions.");
            return;
        }

        // Analyze golem population
        const naturalGolems = golems.filter(g => !g.isPlayerCreated);
        const playerBuiltGolems = golems.filter(g => g.isPlayerCreated);

        Chat.log(`\n--- Iron Golem Details ---`);
        Chat.log(`Naturally spawned: ${naturalGolems.length}`);
        Chat.log(`Player-built: ${playerBuiltGolems.length}`);

        // Check golem health
        let totalHealth = 0;
        let injuredGolems = 0;
        let attackingGolems = 0;

        golems.forEach((golem, index) => {
            totalHealth += golem.health;

            if (golem.health < golem.maxHealth * 0.8) {
                injuredGolems++;
            }

            if (golem.isAttacking) {
                attackingGolems++;
            }

            const healthPercent = (golem.health / golem.maxHealth * 100).toFixed(0);
            const status = golem.isAttacking ? "&c⚔ Fighting" :
                          golem.health < golem.maxHealth * 0.8 ? "&e⚠ Injured" : "&a✓ Healthy";

            Chat.log(`${index + 1}. ${status} &7(${healthPercent}% health) ${golem.isPlayerCreated ? "(built)" : "(natural)"}`);
        });

        const avgHealth = (totalHealth / golems.length).toFixed(1);
        Chat.log(`\nAverage Golem Health: ${avgHealth}/100`);

        // Village safety assessment
        Chat.log(`\n--- Safety Assessment ---`);
        const golemRatio = golems.length / Math.max(1, villagers.length);

        if (golemRatio >= 0.15) {
            Chat.log("&a✓ Excellent golem protection");
        } else if (golemRatio >= 0.08) {
            Chat.log("&e○ Adequate golem protection");
        } else {
            Chat.log("&c⚠ Insufficient golem protection");
        }

        if (attackingGolems > 0) {
            Chat.log(`&c⚠ ${attackingGolems} golem${attackingGolems > 1 ? 's are' : ' is'} currently fighting!`);
        }

        if (injuredGolems > 0) {
            Chat.log(`&e⚠ ${injuredGolems} golem${injuredGolems > 1 ? 's are' : ' is'} injured and may need healing`);
        }

        if (hostiles.length > 0) {
            Chat.log(`&c⚠ ${hostiles.length} hostile mob${hostiles.length > 1 ? 's are' : ' is'} near the village!`);
        }

        // Recommendations
        Chat.log(`\n--- Recommendations ---`);
        if (golemRatio < 0.1) {
            const neededGolems = Math.ceil(villagers.length * 0.1) - golems.length;
            Chat.log(`&e• Build ${Math.max(1, neededGolems)} more iron golem${neededGolems > 1 ? 's' : ''} for better protection`);
        }

        if (injuredGolems > 0) {
            Chat.log("&e• Consider healing injured golems with iron ingots");
        }

        if (naturalGolems.length === 0 && golems.length > 0) {
            Chat.log("&7• All golems are player-built (natural spawning conditions may not be met)");
        }

        if (hostiles.length > golems.length) {
            Chat.log("&c• Immediate threat detected! Hostiles outnumber golems");
        }
    }

    // Auto-trigger scan when in a village area
    events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const player = Player.getPlayer();
        if (!player) return;

        // Simple village detection - look for multiple villagers
        const nearbyEntities = World.getEntities(32);
        let villagerCount = 0;

        for (const entity of nearbyEntities) {
            if (entity.is("minecraft:villager")) {
                villagerCount++;
            }
        }

        if (villagerCount >= 3) { // Likely in a village
            scanVillageDefenses();
        }
    }));

    Chat.log("Village Defense Monitor activated!");
    Chat.log("Will automatically scan when near villages.");
}

// Start the defense monitor
createVillageDefenseMonitor();
```

### Example 2: Iron Golems Tracking System

```js
function createGolemTrackingSystem() {
    const trackedGolems = new Map();
    const GOLEM_MEMORY_TIME = 300000; // 5 minutes

    function updateGolemTracking() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(64); // 64 block radius
        const currentGolems = new Set();

        // Update existing golems and find new ones
        entities.forEach(entity => {
            if (entity.is("minecraft:iron_golem")) {
                const uuid = entity.getUUID();
                const golemHelper = entity.asIronGolem();
                const livingHelper = entity.asLiving();
                const mobHelper = entity.asMob();

                currentGolems.add(uuid);

                if (!trackedGolems.has(uuid)) {
                    // New golem discovered
                    trackedGolems.set(uuid, {
                        uuid: uuid,
                        entity: entity,
                        golem: golemHelper,
                        firstSeen: Date.now(),
                        lastSeen: Date.now(),
                        isPlayerCreated: golemHelper.isPlayerCreated(),
                        healthHistory: [],
                        positionHistory: [],
                        combatEvents: 0,
                        maxDistance: 0,
                        spawnPosition: entity.getPos()
                    });

                    Chat.log(`&a+ New ${golemHelper.isPlayerCreated() ? 'player-built' : 'natural'} iron golem detected`);
                } else {
                    // Update existing golem data
                    const golemData = trackedGolems.get(uuid);
                    const currentPos = entity.getPos();
                    const currentHealth = livingHelper.getHealth();
                    const currentDistance = player.distanceTo(entity);

                    golemData.lastSeen = Date.now();
                    golemData.healthHistory.push({
                        health: currentHealth,
                        time: Date.now()
                    });

                    golemData.positionHistory.push({
                        x: currentPos.x,
                        y: currentPos.y,
                        z: currentPos.z,
                        time: Date.now()
                    });

                    // Track combat events
                    if (mobHelper.isAttacking()) {
                        if (golemData.healthHistory.length > 1) {
                            const prevHealth = golemData.healthHistory[golemData.healthHistory.length - 2].health;
                            if (currentHealth < prevHealth) {
                                golemData.combatEvents++;
                                Chat.log(`&c⚔ Golem took damage! Health: ${currentHealth.toFixed(1)}`);
                            }
                        }
                    }

                    // Update max distance from spawn point
                    const spawnDistance = currentPos.distanceTo(golemData.spawnPosition);
                    golemData.maxDistance = Math.max(golemData.maxDistance, spawnDistance);

                    // Keep history manageable (last 50 entries)
                    if (golemData.healthHistory.length > 50) {
                        golemData.healthHistory.shift();
                    }
                    if (golemData.positionHistory.length > 50) {
                        golemData.positionHistory.shift();
                    }
                }
            }
        });

        // Remove golems that haven't been seen recently
        const currentTime = Date.now();
        for (const [uuid, golemData] of trackedGolems) {
            if (!currentGolems.has(uuid) && (currentTime - golemData.lastSeen > GOLEM_MEMORY_TIME)) {
                trackedGolems.delete(uuid);
                Chat.log(`&7- Iron golem ${uuid} removed from tracking (out of range for too long)`);
            }
        }
    }

    function generateGolemReport() {
        if (trackedGolems.size === 0) {
            Chat.log("No iron golems currently being tracked");
            return;
        }

        Chat.log("=== Iron Golem Tracking Report ===");
        Chat.log(`Currently tracking ${trackedGolems.size} iron golem${trackedGolems.size > 1 ? 's' : ''}`);

        let totalCombatEvents = 0;
        let totalMaxDistance = 0;
        let naturalCount = 0;
        let playerBuiltCount = 0;

        const currentTime = Date.now();

        trackedGolems.forEach((golemData, uuid) => {
            const timeAgo = Math.floor((currentTime - golemData.firstSeen) / 1000 / 60); // minutes
            const recent = golemData.entity && golemData.entity.isAlive();

            Chat.log(`\n--- Golem ${uuid.toString().substring(0, 8)} ---`);
            Chat.log(`Type: ${golemData.isPlayerCreated ? 'Player-built' : 'Natural'}`);
            Chat.log(`Status: ${recent ? '&aCurrently nearby' : '&7Out of range'}`);
            Chat.log(`First seen: ${timeAgo} minute${timeAgo !== 1 ? 's' : ''} ago`);
            Chat.log(`Combat events: ${golemData.combatEvents}`);
            Chat.log(`Max distance from spawn: ${golemData.maxDistance.toFixed(1)} blocks`);

            if (golemData.healthHistory.length > 1) {
                const recentHealth = golemData.healthHistory[golemData.healthHistory.length - 1].health;
                const previousHealth = golemData.healthHistory[0].health;
                const healthChange = recentHealth - previousHealth;

                if (Math.abs(healthChange) > 0.1) {
                    const trend = healthChange > 0 ? "&a↑" : "&c↓";
                    Chat.log(`Health trend: ${trend} ${Math.abs(healthChange).toFixed(1)} HP`);
                }
            }

            // Activity analysis
            if (golemData.positionHistory.length > 10) {
                const recentPositions = golemData.positionHistory.slice(-10);
                let totalMovement = 0;

                for (let i = 1; i < recentPositions.length; i++) {
                    const prev = recentPositions[i - 1];
                    const curr = recentPositions[i];
                    const distance = Math.sqrt(
                        Math.pow(curr.x - prev.x, 2) +
                        Math.pow(curr.y - prev.y, 2) +
                        Math.pow(curr.z - prev.z, 2)
                    );
                    totalMovement += distance;
                }

                const avgMovement = totalMovement / (recentPositions.length - 1);
                const activity = avgMovement > 0.5 ? "&6Very Active" :
                               avgMovement > 0.1 ? "&eModerately Active" : "&7Mostly Stationary";
                Chat.log(`Activity level: ${activity}`);
            }

            if (golemData.isPlayerCreated) {
                playerBuiltCount++;
            } else {
                naturalCount++;
            }

            totalCombatEvents += golemData.combatEvents;
            totalMaxDistance += golemData.maxDistance;
        });

        // Summary statistics
        Chat.log(`\n=== Summary Statistics ===`);
        Chat.log(`Natural golems: ${naturalCount}`);
        Chat.log(`Player-built golems: ${playerBuiltCount}`);
        Chat.log(`Total combat events recorded: ${totalCombatEvents}`);
        Chat.log(`Average max distance from spawn: ${(totalMaxDistance / trackedGolems.size).toFixed(1)} blocks`);

        // Overall village health assessment
        if (totalCombatEvents > trackedGolems.size * 5) {
            Chat.log("&c⚠ High combat activity detected - village may be under frequent attack");
        } else if (totalCombatEvents > 0) {
            Chat.log("&e⚠ Moderate combat activity - normal village defense operations");
        } else {
            Chat.log("&a✓ No recent combat activity - peaceful village conditions");
        }
    }

    // Update tracking every 5 seconds
    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        if (Client.getTime() % 100 === 0) { // Every 5 seconds (100 ticks)
            updateGolemTracking();
        }
    }));

    // Generate report every minute
    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        if (Client.getTime() % (20 * 60) === 0) { // Every minute
            generateGolemReport();
        }
    }));

    Chat.log("Iron Golem Tracking System activated!");
    Chat.log("Will track golems within 64 blocks and generate periodic reports.");
}

// Start the tracking system
createGolemTrackingSystem();
```

### Example 3: Iron Golem Construction Helper

```js
function createGolemConstructionHelper() {
    const CONSTRUCTION_PATTERN = [
        { x: 0, y: 0, z: 0 },  // Bottom layer center
        { x: -1, y: 0, z: 0 }, // Bottom layer left
        { x: 1, y: 0, z: 0 },  // Bottom layer right
        { x: 0, y: 0, z: -1 }, // Bottom layer front
        { x: 0, y: 0, z: 1 },  // Bottom layer back
        { x: 0, y: 1, z: 0 }   // Top layer (head position)
    ];

    function checkGolemConstruction() {
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getBlockPos();
        const lookDirection = player.getLookingDirection();
        const startBlock = player.getBlockPos();

        // Check blocks in front of player for potential golem construction
        const results = [];

        // Check in a 3x3x3 area around where player is looking
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    const checkPos = startBlock.add(dx, dy, dz);
                    if (isPotentialGolemBase(checkPos)) {
                        const analysis = analyzeGolemStructure(checkPos);
                        if (analysis.isValid) {
                            results.push(analysis);
                        }
                    }
                }
            }
        }

        if (results.length > 0) {
            displayConstructionResults(results);
        }
    }

    function isPotentialGolemBase(pos) {
        const block = World.getBlock(pos);
        if (!block) return false;

        return block.getId() === "minecraft:iron_block";
    }

    function analyzeGolemStructure(bottomCenterPos) {
        const analysis = {
            bottomCenter: bottomCenterPos,
            ironBlocks: [],
            headBlock: null,
            isValid: false,
            isComplete: false,
            missingBlocks: [],
            incorrectBlocks: []
        };

        // Check each position in the golem pattern
        for (const pattern of CONSTRUCTION_PATTERN) {
            const checkPos = bottomCenterPos.add(pattern.x, pattern.y, pattern.z);
            const block = World.getBlock(checkPos);

            if (!block) {
                analysis.missingBlocks.push({ pos: checkPos, type: "out_of_world" });
                continue;
            }

            const isHead = pattern.y === 1;
            const expectedBlock = isHead ?
                ["minecraft:carved_pumpkin", "minecraft:jack_o_lantern"] :
                ["minecraft:iron_block"];

            if (expectedBlock.includes(block.getId())) {
                if (isHead) {
                    analysis.headBlock = block;
                } else {
                    analysis.ironBlocks.push(block);
                }
            } else if (block.getId() !== "minecraft:air") {
                analysis.incorrectBlocks.push({
                    pos: checkPos,
                    expected: expectedBlock,
                    found: block.getId()
                });
            } else {
                analysis.missingBlocks.push({
                    pos: checkPos,
                    type: isHead ? "head" : "iron_block"
                });
            }
        }

        // Determine if structure is valid
        analysis.isComplete = analysis.ironBlocks.length === 5 && analysis.headBlock !== null;
        analysis.isValid = analysis.ironBlocks.length >= 3; // At least T-shape of iron blocks

        return analysis;
    }

    function displayConstructionResults(results) {
        Chat.log("=== Iron Golem Construction Analysis ===");

        results.forEach((analysis, index) => {
            Chat.log(`\n--- Structure ${index + 1} ---`);
            Chat.log(`Position: ${analysis.bottomCenter}`);

            if (analysis.isComplete) {
                Chat.log("&a✓ Complete iron golem structure!");
                Chat.log("   Right-click the pumpkin head to spawn the golem");
            } else if (analysis.isValid) {
                Chat.log("&e○ Partial iron golem structure");
                Chat.log(`   Iron blocks: ${analysis.ironBlocks.length}/5`);
                Chat.log(`   Head block: ${analysis.headBlock ? "✓" : "✗"}`);
            } else {
                Chat.log("&c✗ Invalid iron golem structure");
                Chat.log(`   Iron blocks: ${analysis.ironBlocks.length}/5 (need at least 3)`);
            }

            // Show missing blocks
            if (analysis.missingBlocks.length > 0) {
                Chat.log("   Missing blocks:");
                analysis.missingBlocks.forEach(missing => {
                    const blockType = missing.type === "head" ? "pumpkin/jack o'lantern" :
                                    missing.type === "iron_block" ? "iron block" :
                                    "block (out of world)";
                    Chat.log(`     - ${blockType} at ${missing.pos}`);
                });
            }

            // Show incorrect blocks
            if (analysis.incorrectBlocks.length > 0) {
                Chat.log("   Incorrect blocks:");
                analysis.incorrectBlocks.forEach(incorrect => {
                    const expectedName = incorrect.expected.join(" or ");
                    Chat.log(`     - Found ${incorrect.found} at ${incorrect.pos} (expected ${expectedName})`);
                });
            }

            // Highlight the structure for visualization
            highlightStructure(analysis);
        });
    }

    function highlightStructure(analysis) {
        // Clear previous highlights
        CONSTRUCTION_PATTERN.forEach(pattern => {
            const pos = analysis.bottomCenter.add(pattern.x, pattern.y, pattern.z);
            const block = World.getBlock(pos);
            if (block) {
                // Note: This would require some form of block highlighting capability
                // which may not be directly available in JsMacros
            }
        });

        // You could use particle effects or other visual indicators
        const centerPos = analysis.bottomCenter.toPos3D().add(0, 0.5, 0);

        if (analysis.isComplete) {
            // Green particles for complete structure
            World.spawnParticle("minecraft:happy_villager", centerPos.x, centerPos.y, centerPos.z, 10);
        } else if (analysis.isValid) {
            // Yellow particles for partial structure
            World.spawnParticle("minecraft:flame", centerPos.x, centerPos.y, centerPos.z, 5);
        }
    }

    function checkNearbyGolems() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(16);
        const ironGolems = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:iron_golem")) {
                const golem = entity.asIronGolem();
                const distance = player.distanceTo(entity);

                ironGolems.push({
                    entity: entity,
                    golem: golem,
                    distance: distance,
                    isPlayerCreated: golem.isPlayerCreated(),
                    position: entity.getPos()
                });
            }
        });

        if (ironGolems.length > 0) {
            Chat.log(`\n=== Nearby Iron Golems (${ironGolems.length}) ===`);
            ironGolems.forEach((golemData, index) => {
                const type = golemData.isPlayerCreated ? "Player-built" : "Natural";
                Chat.log(`${index + 1}. ${type} golem - ${golemData.distance.toFixed(1)}m away`);

                if (golemData.entity.asLiving().getHealth() < 100) {
                    Chat.log(`   Health: ${golemData.entity.asLiving().getHealth().toFixed(1)}/100 &c(needs healing)&r`);
                }
            });
        }
    }

    // Key binding to trigger construction analysis
    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        const player = Player.getPlayer();
        if (!player) return;

        // Check if player is holding iron blocks or pumpkins
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        const hasMaterials = (mainHand && (
            mainHand.getId() === "minecraft:iron_block" ||
            mainHand.getId() === "minecraft:carved_pumpkin" ||
            mainHand.getId() === "minecraft:jack_o_lantern"
        )) || (offHand && (
            offHand.getId() === "minecraft:iron_block" ||
            offHand.getId() === "minecraft:carved_pumpkin" ||
            offHand.getId() === "minecraft:jack_o_lantern"
        ));

        if (hasMaterials && player.getKeybinding("key.use").isPressed()) {
            checkGolemConstruction();
            checkNearbyGolems();
        }
    }));

    Chat.log("Iron Golem Construction Helper activated!");
    Chat.log("Hold iron blocks or pumpkins and right-click to analyze nearby structures.");
}

// Start the construction helper
createGolemConstructionHelper();
```

## Notes and Limitations

### Creation Detection
- `isPlayerCreated()` distinguishes between naturally spawned golems and player-constructed ones
- Natural spawning requires village conditions: sufficient population and beds
- Player-built golems require the specific T-shaped iron block arrangement with a pumpkin head
- Both types behave identically in terms of protection and combat mechanics

### Combat and Protection Behavior
- Iron golems automatically attack most hostile mobs that come within range
- They prioritize protecting villagers and players over their own safety
- Golems can become hostile toward players who attack them or nearby villagers
- They have knockback resistance and powerful melee attacks

### Health and Maintenance
- Iron golems have 100 health points (50 hearts)
- They can be healed by feeding them iron ingots (restores 25 health per ingot)
- Golems take damage from combat, falling, and other damage sources
- Dead golems drop 3-5 iron ingots and possibly poppies

### Village Integration
- Natural golem spawning depends on villager gossip and reputation systems
- Player-built golems contribute to village defense regardless of natural conditions
- Golems may wander away from villages if not engaged in protection duties
- Village popularity affects golem behavior toward players

### Data Availability
- Creation status (`isPlayerCreated()`) is reliably available on client side
- Health and combat state depend on proper entity data synchronization
- Some advanced behaviors may only be observable through server-side data

## Related Classes

- `MobEntityHelper` - Parent class providing mob-specific functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base class for all entity helpers with position and movement
- `VillagerEntityHelper` - For interacting with the villagers that golems protect
- `BlockHelper` - For analyzing iron block structures and construction patterns
- `World` - For entity searches and world interaction methods

## Common Use Cases

- **Village Defense Systems:** Scripts that monitor and enhance village protection
- **Golem Population Management:** Tools for tracking and managing iron golem numbers
- **Construction Assistants:** Helpers for building iron golems efficiently
- **Village Health Analysis:** Systems that assess village safety and protection levels
- **Combat Monitoring:** Tools for tracking golem combat activities and effectiveness
- **Resource Management:** Scripts that manage iron resources for golem construction and maintenance

---

**See Also:**
- [EntityHelper type casting methods](F:\java\JsMacros\JsMacros-Docs\classes\EntityHelper.md) for accessing IronGolemEntityHelper
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\EntityHelper.md) for health and status effect methods
- [MobEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\EntityHelper.md) for mob-specific functionality