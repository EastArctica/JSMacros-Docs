# PillagerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.PillagerEntityHelper`

**Extends:** `IllagerEntityHelper<PillagerEntity>`

**Since:** JsMacros 1.8.4

The `PillagerEntityHelper` class is a specialized wrapper for pillager entities in JSMacros, providing access to pillager-specific properties and behaviors. This class extends `IllagerEntityHelper` and inherits all illager methods while adding pillager-specific functionality like captain detection and raid-related behaviors.

Pillagers are hostile mobs armed with crossbows that commonly appear in raids, patrols, and illager outposts. They are a key part of the raid system and can serve as captains that lead illager groups and provide bad omen effects when defeated.

## Table of Contents

- [Constructors](#constructors)
- [Pillager-Specific Methods](#pillager-specific-methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

## Constructors

PillagerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events where the entity is a pillager
- World entity queries that return pillager entities
- Type casting from EntityHelper or IllagerEntityHelper using pillager type checks

```js
// Getting PillagerEntityHelper from events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:pillager")) {
        const pillager = entity; // Already typed as PillagerEntityHelper
        const isCaptain = pillager.isCaptain();
        Chat.log(`Pillager spawned! Captain: ${isCaptain}`);
    }
}));

// Type casting from EntityHelper
const entity = event.getEntity();
if (entity.is("minecraft:pillager")) {
    const pillager = entity; // Will be PillagerEntityHelper
    const state = pillager.getState();
    Chat.log(`Pillager state: ${state}, Captain: ${pillager.isCaptain()}`);
}
```

---

## Pillager-Specific Methods

## Inherited Methods

From `IllagerEntityHelper`:

### Illager State and Behavior
- `pillager.isCelebrating()` - Check if the pillager is celebrating (post-raid)
- `pillager.getState()` - Get current activity state (ATTACKING, CROSSBOW_CHARGE, etc.)

From `MobEntityHelper`:

### Combat and AI
- `pillager.isAttacking()` - Check if the pillager is currently attacking
- `pillager.isAiDisabled()` - Check if the pillager's AI is disabled

From `LivingEntityHelper`:

### Health and Status
- `pillager.getHealth()` - Current health
- `pillager.getMaxHealth()` - Maximum health
- `pillager.getAbsorptionHealth()` - Absorption hearts
- `pillager.getArmor()` - Current armor value
- `pillager.getStatusEffects()` - List of active status effects
- `pillager.hasStatusEffect(id)` - Check for specific status effect

### Movement and State
- `pillager.isOnGround()` - Check if on ground
- `pillager.canBreatheInWater()` - Check if can breathe underwater
- `pillager.isFallFlying()` - Check if elytra is deployed
- `pillager.isBaby()` - Check if is baby variant

### Combat and Interaction
- `pillager.isHolding(item)` - Check if holding specific item
- `pillager.canSeeEntity(entity)` - Check if has line of sight to entity
- `pillager.getBowPullProgress()` - Get bow pull progress
- `pillager.getItemUseTimeLeft()` - Get item use time remaining

From `EntityHelper`:
- All position, movement, entity information, raytracing, and utility methods
- Distance calculations, type checking, NBT access, etc.

---

## Usage Examples

### Raid Preparation System
```js
// Comprehensive raid preparation and avoidance system
class RaidPreparationSystem {
    constructor() {
        this.captainsDefeated = 0;
        this.badOmenLevel = 0;
        this.nearbyVillages = [];
        this.safeZones = [];
        this.lastVillageCheck = 0;
    }

    run() {
        this.checkForPillagerThreats();
        this.checkPlayerBadOmenStatus();
        this.findNearbyVillages();
        this.displaySafetyStatus();
    }

    checkForPillagerThreats() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        let threatLevel = 0;
        let captainsNearby = 0;
        let pillagersNearby = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:pillager")) {
                const distance = player.distanceTo(entity);

                if (distance <= 100) { // Within detection range
                    const pillager = entity;
                    pillagersNearby++;

                    if (pillager.isCaptain()) {
                        captainsNearby++;
                        threatLevel += 3; // Captains are higher threat

                        // Warn about captain specifically
                        const pos = entity.getPos();
                        Chat.log(`&cCaptain detected at ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)} (${distance.toFixed(1)}m away)`);

                        // Make captain glow
                        entity.setGlowing(true);
                        entity.setGlowingColor(0xFFFFFF);
                    } else {
                        threatLevel += 1;
                    }
                }
            }
        });

        // Display threat assessment
        if (threatLevel > 0) {
            let threatMessage = `&ePillager Threat Level: ${threatLevel} `;
            if (captainsNearby > 0) {
                threatMessage += `(${captainsNearby} captains, ${pillagersNearby - captainsNearby} regular)`;
            } else {
                threatMessage += `(${pillagersNearby} pillagers)`;
            }

            Chat.actionbar(threatMessage);

            if (threatLevel >= 5) {
                Chat.log("&c&l⚠️ HIGH PILLAGER ACTIVITY - Consider avoiding this area!");
            }
        }
    }

    checkPlayerBadOmenStatus() {
        const player = Player.getPlayer();
        if (!player) return;

        const effects = player.getStatusEffects();
        const badOmenEffect = effects.find(effect =>
            effect.getEffectName().toLowerCase().includes("bad_omen")
        );

        if (badOmenEffect) {
            this.badOmenLevel = badOmenEffect.getAmplifier() + 1;
            const duration = Math.floor(badOmenEffect.getDuration() / 20);

            if (this.badOmenLevel > this.captainsDefeated) {
                this.captainsDefeated = this.badOmenLevel;
                Chat.log(`&6&lNew Bad Omen level: ${this.badOmenLevel} (defeated ${this.captainsDefeated} captains)`);
            }

            // Display warning
            Chat.actionbar(`&c&lBAD OMEN ${this.badOmenLevel} - ${duration}s remaining`);

            // Village proximity check
            if (this.nearbyVillages.length > 0) {
                Chat.log("&c&l⚠️ VILLAGE NEARBY - ENTERING WILL TRIGGER A RAID!");
                this.estimateRaidDifficulty();
            }
        } else {
            this.badOmenLevel = 0;
        }
    }

    findNearbyVillages() {
        const currentTime = Client.getTime();
        if (currentTime - this.lastVillageCheck < 200) return; // Check every 10 seconds

        this.lastVillageCheck = currentTime;
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getPos();
        const villageCheckRadius = 1000;

        // Simple village detection (look for village blocks and many villagers/iron golems)
        this.nearbyVillages = [];

        // Check for village centers by looking for beds and workstations
        const nearbyVillageBlocks = this.findVillageStructures(playerPos, villageCheckRadius);

        nearbyVillageBlocks.forEach(villagePos => {
            const distance = Math.sqrt(
                Math.pow(playerPos.x - villagePos.x, 2) +
                Math.pow(playerPos.z - villagePos.z, 2)
            );

            if (distance <= 200) { // Village within danger range
                this.nearbyVillages.push({
                    position: villagePos,
                    distance: distance,
                    name: `Village at ${Math.floor(villagePos.x)}, ${Math.floor(villagePos.z)}`
                });
            }
        });
    }

    findVillageStructures(center, radius) {
        const villagePositions = [];
        const step = 32; // Check every 32 blocks for performance

        for (let x = center.x - radius; x <= center.x + radius; x += step) {
            for (let z = center.z - radius; z <= center.z + radius; z += step) {
                for (let y = center.y - 20; y <= center.y + 20; y += 4) {
                    const block = World.getBlock(x, y, z);
                    if (block) {
                        const blockName = block.getBlockState().getBlock().getTranslationKey();

                        // Look for village indicators
                        if (blockName.includes("bed") ||
                            blockName.includes("bell") ||
                            blockName.includes("lectern") ||
                            blockName.includes("composter")) {

                            villagePositions.push({ x: x, y: y, z: z });
                        }
                    }
                }
            }
        }

        return villagePositions;
    }

    estimateRaidDifficulty() {
        if (this.badOmenLevel === 0 || this.nearbyVillages.length === 0) return;

        const difficulty = this.calculateRaidDifficulty();

        Chat.log("&6=== RAID DIFFICULTY ESTIMATE ===");
        Chat.log(`&6Bad Omen Level: ${this.badOmenLevel}`);
        Chat.log(`&6Estimated Difficulty: ${difficulty.name}`);
        Chat.log(`&6Waves: ${difficulty.waves}`);
        Chat.log(`&6Total Illagers: ${difficulty.totalIllagers}`);
        Chat.log(`&6Captain Threats: ${difficulty.captains} per wave`);

        if (difficulty.recommendedGear) {
            Chat.log("&6Recommended Gear:");
            difficulty.recommendedGear.forEach(item => {
                Chat.log(`  - ${item}`);
            });
        }

        if (this.badOmenLevel >= 3) {
            Chat.log("&c&l⚠️ EXTREME DIFFICULTY - Consider removing Bad Omen first!");
        }
    }

    calculateRaidDifficulty() {
        const baseWaves = 3;
        const additionalWaves = Math.floor(this.badOmenLevel / 2);
        const totalWaves = baseWaves + additionalWaves;

        const baseIllagers = 4;
        const illagersPerLevel = 2;
        const totalIllagers = totalWaves * (baseIllagers + (this.badOmenLevel * illagersPerLevel));

        const captainsPerWave = 1 + Math.floor(this.badOmenLevel / 3);

        let difficultyName = "Easy";
        let recommendedGear = [];

        if (this.badOmenLevel <= 1) {
            difficultyName = "Easy";
            recommendedGear = ["Iron armor", "Iron sword", "Bow", "Shield"];
        } else if (this.badOmenLevel <= 2) {
            difficultyName = "Medium";
            recommendedGear = ["Diamond armor", "Diamond sword", "Bow", "Shield", "Food"];
        } else if (this.badOmenLevel <= 4) {
            difficultyName = "Hard";
            recommendedGear = ["Diamond armor (enchanted)", "Diamond sword (enchanted)", "Crossbow", "Shield", "Golden apples"];
        } else {
            difficultyName = "Extreme";
            recommendedGear = ["Netherite armor", "Netherite sword", "Crossbow (enchanted)", "Shield", "Golden apples", "Potions"];
        }

        return {
            name: difficultyName,
            waves: totalWaves,
            totalIllagers: totalIllagers,
            captains: captainsPerWave,
            recommendedGear: recommendedGear
        };
    }

    displaySafetyStatus() {
        const player = Player.getPlayer();
        if (!player) return;

        let statusMessage = "&6Safety Status: ";

        if (this.badOmenLevel > 0 && this.nearbyVillages.length > 0) {
            statusMessage += "&c&lRAID IMMINENT - BAD OMEN + VILLAGE NEARBY";
        } else if (this.badOmenLevel > 0) {
            statusMessage += "&eBad Omen active but no villages nearby";
        } else if (this.nearbyVillages.length > 0) {
            statusMessage += "&aVillage nearby but no Bad Omen - Safe";
        } else {
            statusMessage += "&aNo immediate threats";
        }

        // Display every 5 seconds
        if (Client.getTime() % 100 === 0) {
            Chat.actionbar(statusMessage);
        }
    }

    clearBadOmen() {
        const player = Player.getPlayer();
        if (!player) return;

        const effects = player.getStatusEffects();
        const badOmenEffect = effects.find(effect =>
            effect.getEffectName().toLowerCase().includes("bad_omen")
        );

        if (badOmenEffect) {
            Chat.log("&6&lBad Omen detected! To remove it:");
            Chat.log("&6- Drink a bucket of milk (removes all effects)");
            Chat.log("&6- Wait for it to expire naturally");
            Chat.log("&6- Use milk before entering villages!");

            // Check for milk in inventory
            const inventory = player.getInventory();
            const milkBuckets = inventory.getItems().filter(item =>
                item.getItem().getTranslationKey().toLowerCase().includes("milk_bucket")
            );

            if (milkBuckets.length > 0) {
                Chat.log(`&aFound ${milkBuckets.length} milk bucket(s) - drink one to clear Bad Omen!`);
            } else {
                Chat.log("&cNo milk buckets found - get some from cows or villages!");
            }
        } else {
            Chat.log("&aNo Bad Omen effect detected - you're safe!");
        }
    }
}

const raidSystem = new RaidPreparationSystem();

// Run the raid preparation system every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 40 === 0) {
        raidSystem.run();
    }
}));

// Commands for raid management
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.r") {
        raidSystem.clearBadOmen();
    }
}));

Chat.log("&6Raid Preparation System active!");
Chat.log("&6Press 'R' to check for Bad Orem and get milk advice");
```

### Pillager Patrol Detection
```js
// Detect and track pillager patrols
class PillagerPatrolTracker {
    constructor() {
        this.patrols = new Map();
        this.lastPatrolUpdate = 0;
    }

    detectPatrols() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const currentTime = Client.getTime();

        // Find all pillagers in patrol formation
        const pillagers = entities.filter(entity => {
            if (!entity.is("minecraft:pillager")) return false;
            return player.distanceTo(entity) <= 100;
        });

        if (pillagers.length === 0) return;

        // Group pillagers by proximity (patrols travel in groups)
        const patrolGroups = this.groupPillagersByPatrol(pillagers);

        patrolGroups.forEach((group, groupId) => {
            const captain = group.find(p => p.pillager.isCaptain());
            const centerPos = this.calculateGroupCenter(group);

            if (!this.patrols.has(groupId)) {
                // New patrol detected
                this.patrols.set(groupId, {
                    id: groupId,
                    pillagers: group,
                    captain: captain,
                    center: centerPos,
                    firstDetected: currentTime,
                    lastUpdated: currentTime,
                    path: [centerPos]
                });

                Chat.log(`&6Patrol ${groupId} detected with ${group.length} pillagers`);
                if (captain) {
                    Chat.log(`  &cCaptain present at ${Math.floor(centerPos.x)}, ${Math.floor(centerPos.y)}, ${Math.floor(centerPos.z)}`);
                }
            } else {
                // Update existing patrol
                const patrol = this.patrols.get(groupId);
                patrol.pillagers = group;
                patrol.captain = captain;
                patrol.center = centerPos;
                patrol.lastUpdated = currentTime;

                // Add to path if moved significantly
                const lastPos = patrol.path[patrol.path.length - 1];
                const distance = Math.sqrt(
                    Math.pow(centerPos.x - lastPos.x, 2) +
                    Math.pow(centerPos.z - lastPos.z, 2)
                );

                if (distance > 10) {
                    patrol.path.push(centerPos);
                    if (patrol.path.length > 20) {
                        patrol.path.shift(); // Keep path size manageable
                    }
                }
            }
        });

        // Clean up old patrols
        this.cleanupPatrols(currentTime);
    }

    groupPillagersByPatrol(pillagers) {
        const groups = new Map();
        let groupId = 0;

        pillagers.forEach(pillager => {
            const entity = pillager.entity;
            const pos = entity.getPos();

            // Check if this pillager is close to any existing group
            let assigned = false;
            for (const [existingGroupId, group] of groups) {
                const groupCenter = this.calculateGroupCenter(group);
                const distance = Math.sqrt(
                    Math.pow(pos.x - groupCenter.x, 2) +
                    Math.pow(pos.z - groupCenter.z, 2)
                );

                if (distance <= 20) { // Within patrol formation distance
                    group.push({ entity: entity, pillager: pillager.entity });
                    assigned = true;
                    break;
                }
            }

            if (!assigned) {
                groups.set(groupId++, [{ entity: entity, pillager: pillager.entity }]);
            }
        });

        return groups;
    }

    calculateGroupCenter(group) {
        let totalX = 0, totalY = 0, totalZ = 0;
        group.forEach(member => {
            const pos = member.entity.getPos();
            totalX += pos.x;
            totalY += pos.y;
            totalZ += pos.z;
        });

        return {
            x: totalX / group.length,
            y: totalY / group.length,
            z: totalZ / group.length
        };
    }

    cleanupPatrols(currentTime) {
        const toRemove = [];

        for (const [groupId, patrol] of this.patrols) {
            // Check if patrol is too old or pillagers are gone
            const timeSinceUpdate = currentTime - patrol.lastUpdated;
            if (timeSinceUpdate > 600) { // 30 seconds
                toRemove.push(groupId);
                Chat.log(`&aPatrol ${groupId} disappeared or moved out of range`);
            } else {
                // Check if all pillagers are still valid
                const alivePillagers = patrol.pillagers.filter(member => member.entity.isAlive());
                if (alivePillagers.length === 0) {
                    toRemove.push(groupId);
                    Chat.log(`&aPatrol ${groupId} defeated`);
                }
            }
        }

        toRemove.forEach(groupId => this.patrols.delete(groupId));
    }

    displayPatrolReport() {
        Chat.log("=== Pillager Patrol Report ===");
        Chat.log(`Active patrols: ${this.patrols.size}`);

        const player = Player.getPlayer();
        if (!player) return;

        this.patrols.forEach((patrol, groupId) => {
            const distance = Math.sqrt(
                Math.pow(player.getPos().x - patrol.center.x, 2) +
                Math.pow(player.getPos().z - patrol.center.z, 2)
            );

            const timeSinceDetection = Math.floor((Client.getTime() - patrol.firstDetected) / 20);

            Chat.log(`\n&ePatrol ${groupId}:`);
            Chat.log(`  Pillagers: ${patrol.pillagers.length}`);
            Chat.log(`  Captain: ${patrol.captain ? 'Yes' : 'No'}`);
            Chat.log(`  Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  Active for: ${timeSinceDetection}s`);

            if (patrol.captain) {
                Chat.log("  &cCaptain present - defeat for Bad Omen!");
            }
        });
    }

    predictPatrolMovement() {
        const player = Player.getPlayer();
        if (!player || this.patrols.size === 0) return;

        Chat.log("=== Patrol Movement Prediction ===");

        this.patrols.forEach((patrol, groupId) => {
            if (patrol.path.length < 3) {
                Chat.log(`Patrol ${groupId}: Not enough data for prediction`);
                return;
            }

            // Simple linear prediction based on last few positions
            const recentPath = patrol.path.slice(-3);
            const velocity = {
                x: (recentPath[2].x - recentPath[0].x) / 2,
                z: (recentPath[2].z - recentPath[0].z) / 2
            };

            const predictedPos = {
                x: patrol.center.x + velocity.x * 10,
                z: patrol.center.z + velocity.z * 10
            };

            const distanceToPrediction = Math.sqrt(
                Math.pow(player.getPos().x - predictedPos.x, 2) +
                Math.pow(player.getPos().z - predictedPos.z, 2)
            );

            Chat.log(`Patrol ${groupId}:`);
            Chat.log(`  Current: ${Math.floor(patrol.center.x)}, ${Math.floor(patrol.center.z)}`);
            Chat.log(`  Predicted: ${Math.floor(predictedPos.x)}, ${Math.floor(predictedPos.z)}`);
            Chat.log(`  Distance to you: ${distanceToPrediction.toFixed(1)}m`);

            if (distanceToPrediction < 20) {
                Chat.log("  &cPatrol may approach you soon!");
            }
        });
    }
}

const patrolTracker = new PillagerPatrolTracker();

// Track patrols every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 40 === 0) {
        patrolTracker.detectPatrols();
    }
}));

// Patrol reports and predictions
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.p") {
        patrolTracker.displayPatrolReport();
        patrolTracker.predictPatrolMovement();
    }
}));
```

## Notes and Limitations

- **Captain Detection:** The `isCaptain()` method checks for a white banner in the pillager's head slot, which is the reliable way to identify captains.
- **Bad Omen Mechanics:** Defeating a captain grants Bad Omen at the same level as the number of captains defeated recently.
- **Raid Triggers:** Bad Oman triggers a raid when entering a village with the effect active.
- **Inherited Functionality:** This class inherits comprehensive methods from IllagerEntityHelper, MobEntityHelper, LivingEntityHelper, and EntityHelper for complete entity management.
- **State Tracking:** Pillagers can have states like ATTACKING, CROSSBOW_CHARGE, CROSSBOW_HOLD, BOW_AND_ARROW, and CELEBRATING.
- **Visual Identification:** Captains are visually distinct with their white banners and can be highlighted for easy identification.
- **Server-Side Variations:** Some pillager behaviors and captain mechanics may vary based on server-side implementations and Minecraft versions.

## Related Classes

- `IllagerEntityHelper` - Parent class with illager-specific state and behavior tracking
- `MobEntityHelper` - Grandparent class with mob-specific functionality
- `LivingEntityHelper` - Great-grandparent class with living entity methods
- `EntityHelper` - Base class with entity methods
- `VindicatorEntityHelper` - Similar illager entity helper for vindicators
- `EvokerEntityHelper` - Spellcasting illager entity helper
- `PlayerEntityHelper` - Player entity for Bad Omen effect checking

## Version Information

- Available since JSMacros 1.8.4
- Extends IllagerEntityHelper with pillager-specific captain detection
- Captain detection based on Minecraft's pillager captain mechanics
- Integrates with the raid and Bad Omen game mechanics