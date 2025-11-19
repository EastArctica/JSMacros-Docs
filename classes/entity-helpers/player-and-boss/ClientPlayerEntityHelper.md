# ClientPlayerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.ClientPlayerEntityHelper`

**Extends:** `PlayerEntityHelper<ClientPlayerEntity>`

The `ClientPlayerEntityHelper` class is a specialized wrapper for the client-side player entity in JSMacros, providing access to player-specific functionality, movement controls, interaction methods, and client-side operations. This class extends `PlayerEntityHelper` and inherits all player and living entity methods while adding client-specific functionality like camera control, movement manipulation, and client-side interactions.

This class is typically obtained through the `Player.getPlayer()` method and represents the local client player. It provides comprehensive methods for controlling player movement, camera direction, item cooldowns, food management, and various client-side player operations that are specific to the local player experience.

## Table of Contents

- [Constructors](#constructors)
- [Movement and Position Control](#movement-and-position-control)
- [Camera and Looking](#camera-and-looking)
- [Interaction Methods](#interaction-methods)
  - [Deprecated Interaction Methods](#deprecated-interaction-methods)
- [Item Cooldown Management](#item-cooldown-management)
- [Food and Hunger](#food-and-hunger)
- [Mining and Tools](#mining-and-tools)
- [Player Information](#player-information)
- [Inherited Methods](#inherited-methods)

## Constructors

ClientPlayerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

```js
const player = Player.getPlayer(); // Returns a ClientPlayerEntityHelper
```

---

## Movement and Position Control

## Camera and Looking

## Interaction Methods

## Deprecated Interaction Methods

> **Note:** The following interaction methods have been deprecated and moved to `Player.getInteractionManager()`. They are still available but may be removed in future versions.

## Item Cooldown Management

## Food and Hunger

## Mining and Tools

## Player Information

The ClientPlayerEntityHelper inherits all player information methods from PlayerEntityHelper and LivingEntityHelper, including:

- `player.getPlayerName()` - Player's actual name (not display name)
- `player.getAbilities()` - Player abilities (gamemode, flying, etc.)
- `player.getXP()` - Total experience points
- `player.getXPLevel()` - Current experience level
- `player.getXPProgress()` - Progress to next level (0.0 to 1.0)
- `player.getXPToLevelUp()` - Experience needed for next level
- `player.getHealth()` - Current health
- `player.getMaxHealth()` - Maximum health
- `player.getMainHand()` - Item in main hand
- `player.getOffHand()` - Item in off hand
- All armor slot methods
- All inherited EntityHelper methods

---

## Inherited Methods

From `PlayerEntityHelper`:
- `getPlayerName()` - Get player's actual name
- `getAbilities()` - Get player abilities
- `getXP()` - Get total experience
- `getXPLevel()` - Get experience level
- `getXPProgress()` - Get experience progress
- `getXPToLevelUp()` - Get XP needed to level up
- `isSleepingLongEnough()` - Check if player can skip night
- `getFishingBobber()` - Get fishing bobber if fishing
- `getAttackCooldownProgress()` - Get attack cooldown progress
- `getScore()` - Get player's score

From `LivingEntityHelper`:
- `getStatusEffects()` - Get active status effects
- `hasStatusEffect(id)` - Check if entity has specific effect
- `isHolding(item)` - Check if holding specific item
- `getHealth()` - Get health
- `getMaxHealth()` - Get max health
- `getAbsorptionHealth()` - Get absorption health
- `getArmor()` - Get armor value
- `getMainHand()` - Get main hand item
- `getOffHand()` - Get off hand item
- All armor slot methods

From `EntityHelper`:
- All position, movement, entity information, and interaction methods

---

## Usage Examples

### Movement and Position Control
```js
// Advanced movement system
class PlayerController {
    constructor() {
        this.movementQueue = [];
        this.isMoving = false;
    }

    async moveToPosition(x, y, z) {
        const player = Player.getPlayer();
        const targetPos = new Pos3D(x, y, z);

        // Look at target first
        player.lookAt(x, y + player.getEyeHeight(), z);

        // Move step by step
        const currentPos = player.getPos();
        const distance = currentPos.distanceTo(targetPos);

        if (distance > 5) {
            // Teleport if far
            await player.setPos(x, y, z, true);
        } else {
            // Walk to target
            const steps = Math.ceil(distance * 4);
            for (let i = 1; i <= steps; i++) {
                const progress = i / steps;
                const newX = currentPos.x + (x - currentPos.x) * progress;
                const newY = currentPos.y + (y - currentPos.y) * progress;
                const newZ = currentPos.z + (z - currentPos.z) * progress;

                await player.setPos(newX, newY, newZ, true);
                await Time.sleep(50); // Small delay between steps
            }
        }

        Chat.log(`Moved to position: ${x}, ${y}, ${z}`);
    }

    async patrolWaypoints(waypoints) {
        for (let i = 0; i < waypoints.length; i++) {
            const [x, y, z] = waypoints[i];
            Chat.log(`Patrolling to waypoint ${i + 1}: ${x}, ${y}, ${z}`);
            await this.moveToPosition(x, y, z);
            await Time.sleep(1000); // Wait at waypoint
        }
    }
}

const controller = new PlayerController();

// Example patrol route
const patrolRoute = [
    [100, 64, 100],
    [200, 64, 100],
    [200, 64, 200],
    [100, 64, 200]
];

// Start patrol
controller.patrolWaypoints(patrolRoute);
```

### Camera Control and Looking
```js
// Smart camera control system
function lookAtNearestHostileMob() {
    const player = Player.getPlayer();
    const entities = World.getEntities();

    let nearestHostile = null;
    let nearestDistance = 50; // Max range

    entities.forEach(entity => {
        if (entity.is("minecraft:zombie", "minecraft:skeleton", "minecraft:creeper",
                     "minecraft:spider", "minecraft:enderman")) {
            const distance = player.distanceTo(entity);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestHostile = entity;
            }
        }
    });

    if (nearestHostile) {
        const pos = nearestHostile.getPos();
        player.lookAt(pos.x, pos.y + nearestHostile.getEyeHeight(), pos.z);
        Chat.log(`Looking at ${nearestHostile.getName().getString()}`);
        return true;
    }
    return false;
}

// Auto-surveillance system
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    // Every 2 seconds, check for threats
    if (Client.getTime() % 40 === 0) {
        const foundThreat = lookAtNearestHostileMob();
        if (foundThreat) {
            Chat.actionbar("&cThreat detected!");
        }
    }
}));
```

### Combat Cooldown Management
```js
// Combat cooldown tracker
class CombatManager {
    constructor() {
        this.lastAttackTime = 0;
        this.combatLog = [];
    }

    canAttack() {
        const player = Player.getPlayer();
        const cooldownProgress = player.getAttackCooldownProgress();
        return cooldownProgress >= 1.0;
    }

    getTimeUntilNextAttack() {
        const player = Player.getPlayer();
        const progress = player.getAttackCooldownProgress();
        const progressPerTick = player.getAttackCooldownProgressPerTick();

        if (progress >= 1.0) return 0;

        const ticksToFull = Math.ceil((1.0 - progress) / progressPerTick);
        return ticksToFull;
    }

    async performAttack(targetEntity) {
        if (!this.canAttack()) {
            const waitTime = this.getTimeUntilNextAttack();
            Chat.log(`Waiting ${waitTime} ticks for attack cooldown...`);
            await Time.sleep(waitTime * 50); // Convert ticks to milliseconds
        }

        // Use InteractionManager for attack
        const interactionManager = Player.getInteractionManager();
        if (interactionManager) {
            await interactionManager.attackEntity(targetEntity, true);
            this.lastAttackTime = Client.getTime();
            this.combatLog.push({
                time: this.lastAttackTime,
                target: targetEntity.getName().getString()
            });
            Chat.log(`Attacked ${targetEntity.getName().getString()}`);
        }
    }

    getItemCooldowns() {
        const player = Player.getPlayer();
        const cooldowns = player.getItemCooldownsRemainingTicks();

        const activeCooldowns = [];
        for (const [item, ticks] of cooldowns) {
            if (ticks > 0) {
                activeCooldowns.push({
                    item: item,
                    remaining: ticks,
                    seconds: (ticks / 20).toFixed(1)
                });
            }
        }
        return activeCooldowns;
    }

    displayCombatStatus() {
        const timeUntilAttack = this.getTimeUntilNextAttack();
        const canAttack = this.canAttack();
        const cooldowns = this.getItemCooldowns();

        Chat.log("=== Combat Status ===");
        Chat.log(`Attack Ready: ${canAttack ? "&aYes" : "&cNo"}`);
        if (!canAttack) {
            Chat.log(`Next attack in: ${timeUntilAttack} ticks (${(timeUntilAttack / 20).toFixed(1)}s)`);
        }

        if (cooldowns.length > 0) {
            Chat.log("Active Cooldowns:");
            cooldowns.forEach(cooldown => {
                Chat.log(`  ${cooldown.item}: ${cooldown.seconds}s`);
            });
        }
    }
}

const combatManager = new CombatManager();

// Combat status keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.c") {
        combatManager.displayCombatStatus();
    }
}));
```

### Mining Speed Analysis
```js
// Comprehensive mining speed analyzer
function analyzeMiningEfficiency() {
    const player = Player.getPlayer();
    const mainHand = player.getMainHand();

    if (mainHand.isEmpty()) {
        Chat.log("Please hold a tool to analyze mining efficiency");
        return;
    }

    const toolName = mainHand.getName();
    Chat.log(`=== Mining Analysis: ${toolName} ===`);

    const testBlocks = [
        { id: "minecraft:stone", name: "Stone" },
        { id: "minecraft:dirt", name: "Dirt" },
        { id: "minecraft:oak_log", name: "Oak Log" },
        { id: "minecraft:iron_ore", name: "Iron Ore" },
        { id: "minecraft:gold_ore", name: "Gold Ore" },
        { id: "minecraft:diamond_ore", name: "Diamond Ore" },
        { id: "minecraft:obsidian", name: "Obsidian" },
        { id: "minecraft:deepslate", name: "Deepslate" },
        { id: "minecraft:cobblestone", name: "Cobblestone" }
    ];

    const results = [];

    testBlocks.forEach(block => {
        try {
            const blockState = World.getBlockFromId(block.id);
            if (blockState) {
                const miningTime = player.calculateMiningSpeed(mainHand, blockState);
                const seconds = miningTime / 20;

                let efficiency;
                if (miningTime === -1) {
                    efficiency = "Unmineable";
                } else if (miningTime === 0) {
                    efficiency = "Instant";
                } else {
                    efficiency = `${seconds.toFixed(2)}s`;
                }

                results.push({
                    name: block.name,
                    time: miningTime,
                    efficiency: efficiency
                });
            }
        } catch (error) {
            Chat.log(`Error analyzing ${block.name}: ${error.message}`);
        }
    });

    // Sort by mining time
    results.sort((a, b) => {
        if (a.time === -1) return 1;
        if (b.time === -1) return -1;
        return a.time - b.time;
    });

    // Display results
    Chat.log("\nMining Speed Results (fastest to slowest):");
    results.forEach(result => {
        const timeStr = result.efficiency === "Instant" ? "&a" :
                       result.efficiency === "Unmineable" ? "&c" : "&e";
        Chat.log(`  ${result.name}: ${timeStr}${result.efficiency}`);
    });

    // Calculate tool effectiveness
    const mineableBlocks = results.filter(r => r.time > 0 && r.time < 100);
    if (mineableBlocks.length > 0) {
        const avgTime = mineableBlocks.reduce((sum, r) => sum + r.time, 0) / mineableBlocks.length;
        Chat.log(`\nAverage mining time: ${(avgTime / 20).toFixed(2)} seconds`);
        Chat.log(`Effective against: ${mineableBlocks.length}/${results.length} blocks tested`);
    }
}

// Run analysis when holding a tool
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.m") {
        analyzeMiningEfficiency();
    }
}));
```

### Food and Hunger Monitor
```js
// Advanced food and hunger management
class FoodMonitor {
    constructor() {
        this.warningsEnabled = true;
        this.lowFoodThreshold = 6;
        this.criticalFoodThreshold = 3;
    }

    checkFoodStatus() {
        const player = Player.getPlayer();
        const food = player.getFoodLevel();
        const saturation = player.getSaturation();

        let status = "";
        let color = "&f";

        // Determine food status
        if (food <= this.criticalFoodThreshold) {
            status = "CRITICAL";
            color = "&4";
        } else if (food <= this.lowFoodThreshold) {
            status = "LOW";
            color = "&c";
        } else if (food <= 15) {
            status = "Moderate";
            color = "&e";
        } else if (food >= 20) {
            status = "Full";
            color = "&a";
        } else {
            status = "Good";
            color = "&2";
        }

        // Check saturation
        const saturationStatus = saturation < 1 ? " (Low Saturation)" : "";

        // Check regeneration capability
        const canRegenerate = food > 17 && saturation > 0;
        const regenStatus = canRegenerate ? " + Regenerating" : "";

        Chat.actionbar(`${color}Food: ${food}/20 (${status}${saturationStatus}${regenStatus})`);

        // Warnings
        if (this.warningsEnabled) {
            if (food <= this.criticalFoodThreshold) {
                Chat.log("&c&lCRITICAL: Food level extremely low! Find food immediately!");
            } else if (food <= this.lowFoodThreshold) {
                Chat.log("&cWarning: Low food level! Consider eating soon.");
            } else if (food <= 10) {
                Chat.log("&eFood level is getting low.");
            }

            if (saturation < 0.5 && food < 20) {
                Chat.log("&eSaturation very low - food bar will start decreasing soon.");
            }
        }

        return {
            food: food,
            saturation: saturation,
            status: status,
            canSprint: food > 6,
            canRegenerate: canRegenerate
        };
    }

    recommendFood() {
        const player = Player.getPlayer();
        const inventory = Player.openInventory();

        const foodItems = [];

        // Scan inventory for food items
        for (let slot = 0; slot < 36; slot++) {
            const item = inventory.getSlot(slot);
            if (!item.isEmpty() && item.isFood()) {
                foodItems.push({
                    item: item,
                    slot: slot,
                    hunger: item.getFoodComponent() ? item.getFoodComponent().getHunger() : 0,
                    saturation: item.getFoodComponent() ? item.getFoodComponent().getSaturation() : 0
                });
            }
        }

        if (foodItems.length === 0) {
            Chat.log("&cNo food found in inventory!");
            return null;
        }

        // Sort by food value
        foodItems.sort((a, b) => (b.hunger + b.saturation) - (a.hunger + a.saturation));

        Chat.log("Available food items:");
        foodItems.forEach((food, index) => {
            const totalValue = food.hunger + food.saturation;
            Chat.log(`  ${index + 1}. ${food.item.getName()} (+${food.hunger} food, ${food.saturation.toFixed(1)} saturation) = ${totalValue.toFixed(1)} total`);
        });

        return foodItems[0]; // Return best food item
    }

    async autoEat() {
        const foodStatus = this.checkFoodStatus();

        if (foodStatus.food < 15) {
            Chat.log("Food level low, attempting to eat...");

            const bestFood = this.recommendFood();
            if (bestFood) {
                // Move food to hotbar if not already there
                if (bestFood.slot >= 36) {
                    const hotbarSlot = Player.openInventory().getFirstEmptySlot(9); // First hotbar slot
                    if (hotbarSlot !== -1) {
                        Player.openInventory().swapSlots(bestFood.slot, hotbarSlot);
                        Chat.log(`Moved ${bestFood.item.getName()} to hotbar slot ${hotbarSlot}`);
                    }
                }

                // Select food and eat
                Player.openInventory().selectHotbarSlot(bestFood.slot % 9);
                await Time.sleep(100);

                const interactionManager = Player.getInteractionManager();
                if (interactionManager) {
                    await interactionManager.interact(true); // Right-click to eat
                    Chat.log(`Ate ${bestFood.item.getName()}`);
                }
            }
        }
    }
}

const foodMonitor = new FoodMonitor();

// Continuous food monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    // Check food status every 4 seconds
    if (Client.getTime() % 80 === 0) {
        foodMonitor.checkFoodStatus();
    }
}));

// Auto-eat keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.f") {
        foodMonitor.autoEat();
    }
}));
```

## Notes and Limitations

- **Thread Safety:** Position and movement methods (`setPos`, `addPos`) execute on the main Minecraft thread and may require waiting for completion when called from other threads.
- **Validation:** Always check if the player exists using `Player.getPlayer()` before calling methods, as it may return null in some contexts (like menus).
- **Deprecated Methods:** Many interaction methods have been moved to `Player.getInteractionManager()`. Use the new methods for better compatibility.
- **Cooldown Accuracy:** Item cooldown methods provide the best available information but may have slight timing variations due to client-server synchronization.
- **Mining Time Calculations:** Mining speed calculations are approximations and may vary based on server settings, enchantments, and other factors not accounted for in the calculation.
- **Movement Limitations:** Some movement methods may be restricted by anti-cheat plugins or server-side validation on multiplayer servers.
- **Camera Control:** Camera rotation methods work client-side and may be overridden by server-side updates in some cases.

## Related Classes

- `PlayerEntityHelper` - Parent class with player-specific methods
- `LivingEntityHelper` - Base class with living entity functionality
- `EntityHelper` - Base class with entity methods
- `PlayerAbilitiesHelper` - Player abilities and gamemode information
- `AdvancementManagerHelper` - Player advancement tracking
- `ItemStackHelper` - Item stack operations
- `BlockStateHelper` - Block state information for mining calculations
- `Pos3D` - 3D position and vector operations
- `InteractionManagerHelper` - Modern interaction methods

## Version Information

- Available since JSMacros 1.0.3
- Movement and position control methods added in 1.8.4
- Many interaction methods deprecated in 1.8.4 (moved to InteractionManager)
- Mining speed calculation added in 1.8.4
- Food saturation method added in 1.8.4
- Await parameters added to position methods in 1.9.0