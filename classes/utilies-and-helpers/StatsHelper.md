# StatsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.StatsHelper`

**Implements:** `BaseHelper<StatHandler>`

**Since:** JsMacros 1.8.4

The `StatsHelper` class provides access to player statistics and achievements in Minecraft. It allows you to retrieve various statistical data about the player's gameplay, including blocks mined, items crafted, entities killed, custom stats, and more. This helper is typically accessed through `Player.getStatistics()` and provides methods to query both raw numerical values and formatted display strings for different types of statistics.

## Overview

The `StatsHelper` class interfaces with Minecraft's native stat tracking system to provide comprehensive access to player statistics. It supports:

- **Entity Statistics:** Track kills and deaths by/with specific entities
- **Block Statistics:** Monitor blocks mined and broken
- **Item Statistics:** Track item usage, crafting, breaking, pickups, and drops
- **Custom Statistics:** Access custom-defined statistics
- **Formatted Display:** Get human-readable formatted values for statistics
- **Bulk Operations:** Retrieve all statistics as maps for efficient processing
- **Server Sync:** Request statistic updates from multiplayer servers

## Accessing StatsHelper

StatsHelper instances are obtained through the Player API:

```js
// Get the current player's statistics
const player = Player.getPlayer();
if (player) {
    const stats = player.getStatistics();
    // Use the stats helper
}
```

## Constructors

StatsHelper is typically not instantiated directly but rather obtained through `Player.getStatistics()`. However, it can be constructed if you have access to a raw `StatHandler` object.

### `new StatsHelper(statHandler)`

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| statHandler | StatHandler | The underlying Minecraft stat handler object |

**Since:** `1.8.4`

**Note:** This constructor is primarily for internal use. Use `Player.getStatistics()` instead.

## Methods

## Usage Examples

### Basic Statistics Overview
```js
function displayPlayerStats() {
    const player = Player.getPlayer();
    if (!player) {
        Chat.log("Player not available!");
        return;
    }

    const stats = player.getStatistics();

    // Basic play statistics
    const minutesPlayed = stats.getRawStatValue("stat.minecraft.playOneMinute");
    const hoursPlayed = (minutesPlayed / 20 / 60 / 60).toFixed(2);

    const distanceWalked = stats.getFormattedStatValue("stat.minecraft.walkOneCm");
    const distanceSprinted = stats.getFormattedStatValue("stat.minecraft.sprintOneCm");

    Chat.log("&6=== Player Statistics ===");
    Chat.log(`&eTime played: &f${hoursPlayed} hours`);
    Chat.log(`&eDistance walked: &f${distanceWalked}`);
    Chat.log(`&eDistance sprinted: &f${distanceSprinted}`);
}

displayPlayerStats();
```

### Combat Statistics Report
```js
function generateCombatReport() {
    const stats = Player.getPlayer().getStatistics();

    const mobsKilled = [
        { name: "Zombie", id: "minecraft:zombie" },
        { name: "Skeleton", id: "minecraft:skeleton" },
        { name: "Creeper", id: "minecraft:creeper" },
        { name: "Spider", id: "minecraft:spider" },
        { name: "Enderman", id: "minecraft:enderman" }
    ];

    const deathsByMobs = [
        { name: "Zombie", id: "minecraft:zombie" },
        { name: "Skeleton", id: "minecraft:skeleton" },
        { name: "Creeper", id: "minecraft:creeper" }
    ];

    Chat.log("&6=== Combat Statistics ===");
    Chat.log("&eMobs Killed:");

    let totalKills = 0;
    mobsKilled.forEach(mob => {
        const kills = stats.getEntityKilled(mob.id);
        if (kills > 0) {
            Chat.log(`  &f${mob.name}: &a${kills}`);
            totalKills += kills;
        }
    });

    Chat.log(`&eTotal mobs killed: &a${totalKills}`);

    Chat.log("&eDeaths by Mobs:");
    let totalDeaths = 0;
    deathsByMobs.forEach(mob => {
        const deaths = stats.getKilledByEntity(mob.id);
        if (deaths > 0) {
            Chat.log(`  &f${mob.name}: &c${deaths}`);
            totalDeaths += deaths;
        }
    });

    Chat.log(`&eTotal deaths by mobs: &c${totalDeaths}`);

    if (totalKills > 0) {
        const kdRatio = (totalKills / Math.max(totalDeaths, 1)).toFixed(2);
        Chat.log(`&eK/D Ratio: &f${kdRatio}`);
    }
}

generateCombatReport();
```

### Mining and Resource Collection Report
```js
function generateMiningReport() {
    const stats = Player.getPlayer().getStatistics();

    const valuableBlocks = [
        { name: "Diamond Ore", id: "minecraft:diamond_ore" },
        { name: "Iron Ore", id: "minecraft:iron_ore" },
        { name: "Gold Ore", id: "minecraft:gold_ore" },
        { name: "Coal Ore", id: "minecraft:coal_ore" },
        { name: "Redstone Ore", id: "minecraft:redstone_ore" },
        { name: "Lapis Lazuli Ore", id: "minecraft:lapis_ore" },
        { name: "Emerald Ore", id: "minecraft:emerald_ore" }
    ];

    const valuableItems = [
        { name: "Diamond", id: "minecraft:diamond" },
        { name: "Iron Ingot", id: "minecraft:iron_ingot" },
        { name: "Gold Ingot", id: "minecraft:gold_ingot" },
        { name: "Coal", id: "minecraft:coal" }
    ];

    Chat.log("&6=== Mining Statistics ===");
    Chat.log("&eOres Mined:");

    valuableBlocks.forEach(block => {
        const mined = stats.getBlockMined(block.id);
        if (mined > 0) {
            Chat.log(`  &f${block.name}: &b${mined}`);
        }
    });

    Chat.log("&eItems Collected:");
    valuableItems.forEach(item => {
        const pickedUp = stats.getItemPickedUp(item.id);
        if (pickedUp > 0) {
            Chat.log(`  &f${item.name}: &a${pickedUp}`);
        }
    });

    // Calculate mining efficiency
    const stoneMined = stats.getBlockMined("minecraft:stone");
    const dirtMined = stats.getBlockMined("minecraft:dirt");
    const totalMined = stoneMined + dirtMined;

    Chat.log("&eGeneral Mining:");
    Chat.log(`  &fStone mined: &7${stoneMined}`);
    Chat.log(`  &fDirt mined: &7${dirtMined}`);
    Chat.log(`  &fTotal blocks mined: &7${totalMined}`);
}

generateMiningReport();
```

### Item Usage and Crafting Report
```js
function generateItemReport() {
    const stats = Player.getPlayer().getStatistics();

    const tools = [
        { name: "Diamond Pickaxe", id: "minecraft:diamond_pickaxe" },
        { name: "Diamond Sword", id: "minecraft:diamond_sword" },
        { name: "Diamond Axe", id: "minecraft:diamond_axe" },
        { name: "Diamond Shovel", id: "minecraft:diamond_shovel" }
    ];

    const food = [
        { name: "Bread", id: "minecraft:bread" },
        { name: "Cooked Beef", id: "minecraft:cooked_beef" },
        { name: "Golden Apple", id: "minecraft:golden_apple" }
    ];

    Chat.log("&6=== Item Statistics ===");

    Chat.log("&eTool Usage:");
    tools.forEach(tool => {
        const used = stats.getItemUsed(tool.id);
        const broken = stats.getItemBroken(tool.id);
        if (used > 0) {
            Chat.log(`  &f${tool.name}: &a${used} used, &c${broken} broken`);
        }
    });

    Chat.log("&eFood Consumption:");
    food.forEach(foodItem => {
        const eaten = stats.getItemUsed(foodItem.id);
        const crafted = stats.getItemCrafted(foodItem.id);
        if (eaten > 0 || crafted > 0) {
            Chat.log(`  &f${foodItem.name}: &a${eaten} eaten, &b${crafted} crafted`);
        }
    });

    // Find most crafted item
    const rawStats = stats.getRawStatMap();
    let mostCrafted = { item: "None", count: 0 };

    for (const [key, value] of rawStats) {
        if (key.includes("stat.minecraft.craftItem") && value > mostCrafted.count) {
            mostCrafted = {
                item: key.replace("stat.minecraft.craftItem.", ""),
                count: value
            };
        }
    }

    Chat.log(`&eMost crafted item: &f${mostCrafted.item} (${mostCrafted.count})`);
}

generateItemReport();
```

### Travel Statistics Dashboard
```js
function generateTravelReport() {
    const stats = Player.getPlayer().getStatistics();

    const travelMethods = [
        { name: "Walking", stat: "minecraft.walk_one_cm" },
        { name: "Sprinting", stat: "minecraft.sprint_one_cm" },
        { name: "Boat", stat: "minecraft.boat_one_cm" },
        { name: "Horse", stat: "minecraft.horse_one_cm" },
        { name: "Minecart", stat: "minecraft.minecart_one_cm" },
        { name: "Swimming", stat: "minecraft.swim_one_cm" },
        { name: "Climbing", stat: "minecraft.climb_one_cm" },
        { name: "Falling", stat: "minecraft.fall_one_cm" },
        { name: "Flying", stat: "minecraft.aviate_one_cm" }
    ];

    Chat.log("&6=== Travel Statistics ===");

    let totalDistance = 0;
    travelMethods.forEach(method => {
        const distance = stats.getCustomFormattedStat(method.stat);
        if (distance && !distance.includes("0")) {
            Chat.log(`  &f${method.name}: &b${distance}`);
            // Extract number for total calculation (simplified)
            const match = distance.match(/[\d,]+/);
            if (match) {
                totalDistance += parseInt(match[0].replace(/,/g, ''));
            }
        }
    });

    Chat.log(`&eTotal distance traveled: &a${totalDistance.toLocaleString()} cm`);

    // Fun facts
    const jumps = stats.getRawStatValue("stat.minecraft.jump");
    const sneakTime = stats.getCustomStat("minecraft.sneak_time");
    const timeSinceRest = stats.getCustomStat("minecraft.time_since_rest");

    Chat.log("&eMovement Facts:");
    Chat.log(`  &fTotal jumps: &a${jumps.toLocaleString()}`);
    Chat.log(`  &fTime sneaking: &a${Math.floor(sneakTime / 20)} seconds`);
    Chat.log(`  &fTime since last rest: &a${Math.floor(timeSinceRest / 20)} seconds`);
}

generateTravelReport();
```

### Real-time Statistics Monitor
```js
let lastStatsUpdate = 0;
let monitoredStats = {
    kills: 0,
    deaths: 0,
    diamonds: 0,
    distance: 0
};

function startStatsMonitor() {
    JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const currentTime = Date.now();

        // Update every 5 seconds
        if (currentTime - lastStatsUpdate > 5000) {
            updateMonitoredStats();
            lastStatsUpdate = currentTime;
        }
    }));
}

function updateMonitoredStats() {
    const player = Player.getPlayer();
    if (!player) return;

    const stats = player.getStatistics();

    // Get current stats
    const currentKills = stats.getEntityKilled("minecraft:zombie") +
                        stats.getEntityKilled("minecraft:skeleton") +
                        stats.getEntityKilled("minecraft:creeper");

    const currentDeaths = stats.getKilledByEntity("minecraft:zombie") +
                         stats.getKilledByEntity("minecraft:skeleton") +
                         stats.getKilledByEntity("minecraft:creeper");

    const currentDiamonds = stats.getItemPickedUp("minecraft:diamond");
    const currentDistance = stats.getRawStatValue("stat.minecraft.walk_one_cm");

    // Check for changes and display
    if (currentKills > monitoredStats.kills) {
        const newKills = currentKills - monitoredStats.kills;
        Chat.actionbar(`&a+${newKills} kills!`);
        monitoredStats.kills = currentKills;
    }

    if (currentDeaths > monitoredStats.deaths) {
        const newDeaths = currentDeaths - monitoredStats.deaths;
        Chat.actionbar(`&c+${newDeaths} deaths!`);
        monitoredStats.deaths = currentDeaths;
    }

    if (currentDiamonds > monitoredStats.diamonds) {
        const newDiamonds = currentDiamonds - monitoredStats.diamonds;
        Chat.actionbar(`&b+${newDiamonds} diamonds!`);
        monitoredStats.diamonds = currentDiamonds;
    }

    // Update distance continuously
    monitoredStats.distance = currentDistance;

    // Display status in actionbar
    const distanceInKm = (currentDistance / 100000).toFixed(2);
    Chat.actionbar(`&7Kills: ${currentKills} | Deaths: ${currentDeaths} | Diamonds: ${currentDiamonds} | Distance: ${distanceInKm}km`);
}

// Initialize monitoring
startStatsMonitor();
Chat.log("Statistics monitor started! Updates will appear in actionbar.");
```

### Statistics Backup and Comparison
```js
function backupCurrentStats() {
    const player = Player.getPlayer();
    if (!player) return null;

    const stats = player.getStatistics();
    const rawStats = stats.getRawStatMap();

    // Convert to regular JavaScript object for storage
    const backup = {};
    for (const [key, value] of rawStats) {
        backup[key] = value;
    }

    return backup;
}

function compareStats(oldStats, newStats) {
    if (!oldStats || !newStats) return;

    Chat.log("&6=== Statistics Comparison ===");

    const interestingStats = [
        "stat.minecraft.playOneMinute",
        "stat.minecraft.walkOneCm",
        "stat.minecraft.jump",
        "stat.minecraft.mineBlock"
    ];

    interestingStats.forEach(statKey => {
        const oldValue = oldStats[statKey] || 0;
        const newValue = newStats[statKey] || 0;
        const difference = newValue - oldValue;

        if (difference !== 0) {
            const changeColor = difference > 0 ? "&a" : "&c";
            Chat.log(`&f${statKey}: ${changeColor}+${difference} (${newValue} total)`);
        }
    });
}

// Example usage
let sessionStats = null;

function startSessionTracking() {
    const player = Player.getPlayer();
    if (!player) return;

    sessionStats = backupCurrentStats();
    Chat.log("&aSession tracking started! Stats will be compared when you stop.");
}

function endSessionTracking() {
    if (!sessionStats) {
        Chat.log("&cNo session data to compare!");
        return;
    }

    const currentStats = backupCurrentStats();
    compareStats(sessionStats, currentStats);
    sessionStats = null;
}

// Start tracking
startSessionTracking();

// Later, to end tracking:
// endSessionTracking();
```

## Common Statistic Keys

Here are some commonly used statistic keys:

### General Play
- `"stat.minecraft.playOneMinute"` - Time played in ticks
- `"stat.minecraft.time_since_death"` - Ticks since last death
- `"stat.minecraft.time_since_rest"` - Ticks since last rest/sleep
- `"stat.minecraft.leave_game"` - Number of times left the world

### Movement
- `"stat.minecraft.walk_one_cm"` - Distance walked in centimeters
- `"stat.minecraft.sprint_one_cm"` - Distance sprinted in centimeters
- `"stat.minecraft.swim_one_cm"` - Distance swum in centimeters
- `"stat.minecraft.fall_one_cm"` - Distance fallen in centimeters
- `"stat.minecraft.climb_one_cm"` - Distance climbed in centimeters
- `"stat.minecraft.fly_one_cm"` - Distance flown in centimeters
- `"stat.minecraft.jump"` - Number of jumps
- `"stat.minecraft.dive_one_cm"` - Distance dived in centimeters

### Mining and Building
- `"stat.minecraft.mineBlock"` - Blocks mined (generic)
- `"stat.minecraft.useItem"` - Items used (generic)
- `"stat.minecraft.break_item"` - Items broken

### Custom Statistics
- `"minecraft.boat_one_cm"` - Distance traveled by boat
- `"minecraft.horse_one_cm"` - Distance traveled by horse
- `"minecraft.pig_one_cm"` - Distance traveled by pig
- `"minecraft.aviate_one_cm"` - Distance traveled by elytra
- `"minecraft.sneak_time"` - Time spent sneaking
- `"minecraft.talked_to_villager"` - Villagers talked to
- `"minecraft.traded_with_villager"` - Trades with villagers

## Entity, Block, and Item IDs

When using entity, block, or item-specific methods, use the full Minecraft identifier:

- **Entities:** `"minecraft:zombie"`, `"minecraft:creeper"`, `"minecraft:cow"`, etc.
- **Blocks:** `"minecraft:diamond_ore"`, `"minecraft:oak_log"`, `"minecraft:stone"`, etc.
- **Items:** `"minecraft:diamond_sword"`, `"minecraft:bread"`, `"minecraft:torch"`, etc.

## Important Notes

1. **Server Availability:** Some statistics may not be available in single-player worlds or on certain servers that disable stat tracking.

2. **Update Frequency:** Statistics are typically updated periodically in multiplayer environments. Use `updateStatistics()` to request fresh data from the server.

3. **Performance:** Getting the full stat maps (`getFormattedStatMap()` or `getRawStatMap()`) can be resource-intensive. Use specific getter methods when you only need particular statistics.

4. **Multiplayer Sync:** In multiplayer games, statistics are synchronized between client and server. There may be delays in seeing recent changes.

5. **Stat Availability:** Not all statistics are available in all Minecraft versions. Some custom statistics may be version-specific.

6. **Error Handling:** Invalid entity/block/item IDs or non-existent stat keys will throw `IllegalArgumentException`. Always validate inputs or use try-catch blocks.

7. **Format Differences:** Raw values are always integers, while formatted values may include units, decimal formatting, or localization.

## Version History

- **1.8.4:** Initial release with comprehensive stat tracking methods and entity/block/item specific getters
- **Current:** Enhanced with full stat map access, formatted values, and server synchronization support

## Related Classes

- `Player` - Main player API providing access to StatsHelper via `getStatistics()`
- `BaseHelper` - Base helper class that StatsHelper extends
- `StatHandler` - Underlying Minecraft stat handler that StatsHelper wraps
- `Text` - Text helper class used for stat display
- `RegistryHelper` - Helper class for parsing identifiers