# VillagerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.VillagerEntityHelper`

**Extends:** `MerchantEntityHelper<VillagerEntity>`

**Since:** JsMacros 1.6.3

The `VillagerEntityHelper` class provides specialized access to villager entities in Minecraft, offering methods to interact with villager-specific properties such as profession, level, and style. This class extends `MerchantEntityHelper` and inherits all trading functionality including trade offers, merchant experience, and customer status.

This helper is particularly useful for creating scripts that:
- Analyze villager professions and trading capabilities
- Monitor villager levels and experience
- Create automated trading systems based on profession
- Track village economics and specialized trades
- Find specific types of villagers for particular trades

## Class Declaration

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.VillagerEntityHelper`
**Extends:** `MerchantEntityHelper<VillagerEntity>`
**Type Parameter:** `VillagerEntity` - Specific to villager entities

## Accessing VillagerEntityHelper

You typically get `VillagerEntityHelper` instances from:
- Entity events involving villagers
- World entity searches filtered for villager types
- Casting from generic EntityHelper instances using type checking

```javascript
// Example: Getting VillagerEntityHelper from nearby villagers
const player = Player.getPlayer();
const nearbyEntities = World.getEntities(10); // 10 block radius
let villagers = [];

for (const entity of nearbyEntities) {
    if (entity.is("minecraft:villager")) {
        villagers.push(entity.asVillager());
    }
}

Chat.log(`Found ${villagers.length} villagers nearby`);
villagers.forEach(villager => {
    Chat.log(`- ${villager.getProfession()} Level ${villager.getLevel()} ${villager.getStyle()}`);
});
```

## Methods

### Villager-Specific Methods

- [villager.getProfession()](#villagergetprofession)
- [villager.getStyle()](#villagergetstyle)
- [villager.getLevel()](#villagergetlevel)

### Inherited Methods

The VillagerEntityHelper inherits all methods from:
- **MerchantEntityHelper:** `getTrades()`, `refreshTrades()`, `getExperience()`, `hasCustomer()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Villager-Specific Methods

## Usage Examples

### Example 1: Comprehensive Village Scanner

```js
function scanVillage() {
    const entities = World.getEntities(50); // 50 block radius
    const villagers = [];
    const golems = [];

    // Find all villagers and iron golems
    for (const entity of entities) {
        if (entity.is("minecraft:villager")) {
            villagers.push(entity.asVillager());
        } else if (entity.is("minecraft:iron_golem")) {
            golems.push(entity);
        }
    }

    Chat.log("=== Village Analysis ===");
    Chat.log(`Villagers: ${villagers.length}`);
    Chat.log(`Iron Golems: ${golems.length}`);

    if (villagers.length === 0) {
        Chat.log("No villagers found. This might not be a village.");
        return;
    }

    // Analyze villager population
    const professionStats = new Map();
    const levelStats = new Map();
    const styleStats = new Map();

    let totalExperience = 0;
    let unemployedCount = 0;

    villagers.forEach(villager => {
        const profession = villager.getProfession();
        const level = villager.getLevel();
        const style = villager.getStyle();
        const experience = villager.getExperience();

        // Count statistics
        professionStats.set(profession, (professionStats.get(profession) || 0) + 1);
        levelStats.set(level, (levelStats.get(level) || 0) + 1);
        styleStats.set(style, (styleStats.get(style) || 0) + 1);

        totalExperience += experience;

        if (profession === "minecraft:nitwit" || profession === "minecraft:none") {
            unemployedCount++;
        }
    });

    // Display profession breakdown
    Chat.log("\n=== Professions ===");
    for (const [profession, count] of professionStats) {
        const professionName = profession.split(':')[1] || profession;
        const percentage = ((count / villagers.length) * 100).toFixed(1);
        Chat.log(`${professionName}: ${count} (${percentage}%)`);
    }

    // Display level breakdown
    Chat.log("\n=== Levels ===");
    for (let level = 1; level <= 5; level++) {
        const count = levelStats.get(level) || 0;
        const percentage = ((count / villagers.length) * 100).toFixed(1);
        const levelName = ["Novice", "Apprentice", "Journeyman", "Expert", "Master"][level - 1];
        Chat.log(`${levelName} (L${level}): ${count} (${percentage}%)`);
    }

    // Village health assessment
    Chat.log("\n=== Village Health ===");
    const avgExperience = (totalExperience / villagers.length).toFixed(1);
    Chat.log(`Average Experience: ${avgExperience}`);
    Chat.log(`Unemployed: ${unemployedCount}/${villagers.length} (${((unemployedCount / villagers.length) * 100).toFixed(1)}%)`);

    const golemRatio = golems.length / Math.max(1, villagers.length);
    if (golemRatio >= 0.1) {
        Chat.log("✓ Good iron golem protection");
    } else {
        Chat.log("⚠ Low iron golem protection - village may be vulnerable");
    }

    // Trading capacity assessment
    const expertOrMaster = (levelStats.get(4) || 0) + (levelStats.get(5) || 0);
    if (expertOrMaster >= 3) {
        Chat.log("✓ Excellent trading opportunities available");
    } else if (expertOrMaster >= 1) {
        Chat.log("○ Good trading opportunities");
    } else {
        Chat.log("✗ Limited high-level traders - consider trading to level up villagers");
    }
}

// Run the village scanner
scanVillage();
```

### Example 2: Villager Trading Assistant

```js
function createTradingAssistant() {
    let lastScanTime = 0;
    const SCAN_COOLDOWN = 5000; // 5 seconds between scans

    function scanNearbyVillagers() {
        const currentTime = Date.now();
        if (currentTime - lastScanTime < SCAN_COOLDOWN) {
            return; // Too soon to scan again
        }
        lastScanTime = currentTime;

        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(15); // 15 block radius
        const nearbyVillagers = [];

        for (const entity of entities) {
            if (entity.is("minecraft:villager")) {
                const distance = player.distanceTo(entity);
                if (distance <= 10) { // Only very close villagers
                    nearbyVillagers.push({
                        villager: entity.asVillager(),
                        entity: entity,
                        distance: distance
                    });
                }
            }
        }

        if (nearbyVillagers.length > 0) {
            Chat.log(`&6=== ${nearbyVillagers.length} Villagers Nearby ===`);

            nearbyVillagers.forEach((data, index) => {
                const villager = data.villager;
                const profession = villager.getProfession().split(':')[1] || "unknown";
                const level = villager.getLevel();
                const trades = villager.getTrades();
                const availableTrades = trades.filter(t => t.isAvailable()).length;

                Chat.log(`${index + 1}. &aLevel ${level} ${profession}&r (${data.distance.toFixed(1)}m)`);
                Chat.log(`   Available trades: ${availableTrades}/${trades.length}`);

                // Show trade status with color coding
                if (availableTrades === 0) {
                    Chat.log(`   &cNo available trades - restock needed`);
                } else if (availableTrades < trades.length / 2) {
                    Chat.log(`   &eSome trades available`);
                } else {
                    Chat.log(`   &aMany trades available`);
                }

                // Check if villager is busy
                if (villager.hasCustomer()) {
                    Chat.log(`   ⚠ Currently trading with someone`);
                }
            });
        }
    }

    // Auto-trigger scan when player is near villagers
    events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(8); // 8 block radius for detection
        let hasVillagerNearby = false;

        for (const entity of entities) {
            if (entity.is("minecraft:villager")) {
                hasVillagerNearby = true;
                break;
            }
        }

        if (hasVillagerNearby) {
            scanNearbyVillagers();
        }
    }));

    Chat.log("Trading assistant activated! Will scan when villagers are nearby.");
}

// Start the trading assistant
createTradingAssistant();
```

### Example 3: Village Economy Manager

```js
function createVillageEconomyManager() {
    const economyData = {
        professions: new Map(),
        totalTrades: 0,
        lastUpdate: 0
    };

    function analyzeVillageEconomy() {
        const entities = World.getEntities(40);
        const villagers = [];

        for (const entity of entities) {
            if (entity.is("minecraft:villager")) {
                villagers.push({
                    villager: entity.asVillager(),
                    entity: entity,
                    position: entity.getPos()
                });
            }
        }

        if (villagers.length === 0) {
            Chat.log("No villagers found for economy analysis");
            return;
        }

        // Reset economy data
        economyData.professions.clear();
        let totalExperience = 0;
        let totalValueScore = 0;

        villagers.forEach(data => {
            const villager = data.villager;
            const profession = villager.getProfession();
            const level = villager.getLevel();
            const trades = villager.getTrades();
            const experience = villager.getExperience();

            totalExperience += experience;

            // Calculate trade value score
            let valueScore = 0;
            trades.forEach(trade => {
                if (trade.isAvailable()) {
                    const inputs = trade.getInput();
                    const output = trade.getOutput();

                    // Simple value calculation
                    const inputValue = inputs.reduce((sum, item) => sum + item.getCount(), 0);
                    const outputValue = output.getCount();
                    valueScore += outputValue / Math.max(1, inputValue);
                }
            });

            totalValueScore += valueScore;

            // Store profession data
            if (!economyData.professions.has(profession)) {
                economyData.professions.set(profession, {
                    count: 0,
                    totalLevel: 0,
                    totalExperience: 0,
                    totalValueScore: 0,
                    totalTrades: 0,
                    availableTrades: 0
                });
            }

            const professionData = economyData.professions.get(profession);
            professionData.count++;
            professionData.totalLevel += level;
            professionData.totalExperience += experience;
            professionData.totalValueScore += valueScore;
            professionData.totalTrades += trades.length;
            professionData.availableTrades += trades.filter(t => t.isAvailable()).length;
        });

        economyData.totalTrades = Array.from(economyData.professions.values())
            .reduce((sum, data) => sum + data.totalTrades, 0);
        economyData.lastUpdate = Date.now();

        // Display economy report
        displayEconomyReport(villagers.length, totalExperience, totalValueScore);
    }

    function displayEconomyReport(totalVillagers, totalExperience, totalValueScore) {
        Chat.log("=== Village Economy Report ===");
        Chat.log(`Villagers: ${totalVillagers}`);
        Chat.log(`Total Experience: ${totalExperience}`);
        Chat.log(`Economy Strength: ${totalValueScore.toFixed(1)}`);

        Chat.log("\n=== Profession Analysis ===");

        const sortedProfessions = Array.from(economyData.professions.entries())
            .sort((a, b) => b[1].totalValueScore - a[1].totalValueScore);

        sortedProfessions.forEach(([profession, data]) => {
            const professionName = profession.split(':')[1] || profession;
            const avgLevel = (data.totalLevel / data.count).toFixed(1);
            const avgExperience = (data.totalExperience / data.count).toFixed(0);
            const tradeEfficiency = ((data.availableTrades / data.totalTrades) * 100).toFixed(1);

            Chat.log(`\n${professionName.toUpperCase()}:`);
            Chat.log(`  Count: ${data.count}`);
            Chat.log(`  Average Level: ${avgLevel}`);
            Chat.log(`  Average Experience: ${avgExperience}`);
            Chat.log(`  Trade Efficiency: ${tradeEfficiency}% (${data.availableTrades}/${data.totalTrades} available)`);
            Chat.log(`  Economic Value: ${data.totalValueScore.toFixed(1)}`);
        });

        // Economy recommendations
        Chat.log("\n=== Economy Recommendations ===");

        // Find missing important professions
        const importantProfessions = [
            "minecraft:farmer", "minecraft:librarian", "minecraft:cleric",
            "minecraft:armorer", "minecraft:tool_smith", "minecraft:weapon_smith"
        ];

        const missingProfessions = importantProfessions.filter(p =>
            !economyData.professions.has(p)
        );

        if (missingProfessions.length > 0) {
            Chat.log("⚠ Missing important professions:");
            missingProfessions.forEach(p => {
                const name = p.split(':')[1];
                Chat.log(`  - ${name}`);
            });
        }

        // Check for low efficiency
        const lowEfficiencyProfessions = Array.from(economyData.professions.entries())
            .filter(([name, data]) => (data.availableTrades / data.totalTrades) < 0.5)
            .map(([name, data]) => name.split(':')[1]);

        if (lowEfficiencyProfessions.length > 0) {
            Chat.log("⚠ Low trade efficiency detected:");
            lowEfficiencyProfessions.forEach(name => {
                Chat.log(`  - ${name} (may need restocking)`);
            });
        }

        // Overall economy health
        const avgValuePerVillager = totalValueScore / totalVillagers;
        if (avgValuePerVillager > 5) {
            Chat.log("✓ Strong economy with excellent trading opportunities");
        } else if (avgValuePerVillager > 3) {
            Chat.log("○ Moderate economy with decent trading opportunities");
        } else {
            Chat.log("✗ Weak economy - consider improving trades and villager levels");
        }
    }

    // Run analysis on command
    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        // Check for key press to trigger analysis (example: F6 key)
        const player = Player.getPlayer();
        if (player && player.getKeybinding("key.debug").isPressed()) {
            analyzeVillageEconomy();
        }
    }));

    Chat.log("Village Economy Manager activated!");
    Chat.log("Press F6 (debug key) to analyze village economy");
}

// Start the economy manager
createVillageEconomyManager();
```

### Example 4: Villager Professional Finder

```js
function createVillagerFinder() {
    const professionInfo = {
        "minecraft:farmer": {
            name: "Farmer",
            trades: ["crops", "seeds", "food", "cakes", "cookies"],
            searchItems: ["wheat", "carrot", "potato", "beetroot"],
            description: "Sells food ingredients and buys crops"
        },
        "minecraft:librarian": {
            name: "Librarian",
            trades: ["books", "enchanted books", "bookshelves", "lanterns"],
            searchItems: ["bookshelf", "enchanted_book"],
            description: "Sells enchanted books and book-related items"
        },
        "minecraft:cleric": {
            name: "Cleric",
            trades: ["ender pearls", "redstone", "bottles o' enchanting", "ghast tears"],
            searchItems: ["ender_pearl", "redstone", "experience_bottle"],
            description: "Sells magical and rare items"
        },
        "minecraft:armorer": {
            name: "Armorer",
            trades: ["armor", "chainmail", "bells", "shields"],
            searchItems: ["iron_chestplate", "bell"],
            description: "Sells armor and protective equipment"
        },
        "minecraft:weapon_smith": {
            name: "Weapon Smith",
            trades: ["weapons", "axes", "swords", "crossbows"],
            searchItems: ["iron_sword", "crossbow"],
            description: "Sells weapons and combat tools"
        },
        "minecraft:tool_smith": {
            name: "Tool Smith",
            trades: ["tools", "pickaxes", "axes", "shovels", "hoes"],
            searchItems: ["iron_pickaxe", "stone_tools"],
            description: "Sells tools and utility items"
        }
    };

    function findVillagersByWantedItems() {
        const entities = World.getEntities(30);
        const villagers = [];

        for (const entity of entities) {
            if (entity.is("minecraft:villager")) {
                villagers.push({
                    villager: entity.asVillager(),
                    entity: entity,
                    position: entity.getPos()
                });
            }
        }

        if (villagers.length === 0) {
            Chat.log("No villagers found nearby");
            return;
        }

        Chat.log("=== Villager Trading Directory ===");
        Chat.log(`Found ${villagers.length} villagers in range\n`);

        // Group by profession
        const byProfession = new Map();

        villagers.forEach(data => {
            const villager = data.villager;
            const profession = villager.getProfession();

            if (!byProfession.has(profession)) {
                byProfession.set(profession, []);
            }
            byProfession.get(profession).push(data);
        });

        // Display organized by profession
        byProfession.forEach((villagers, profession) => {
            const info = professionInfo[profession];
            if (info) {
                Chat.log(`&6${info.name} (${villagers.length} found):&r`);
                Chat.log(`  ${info.description}`);

                villagers.forEach((data, index) => {
                    const villager = data.villager;
                    const level = villager.getLevel();
                    const trades = villager.getTrades();
                    const availableTrades = trades.filter(t => t.isAvailable()).length;

                    const distance = Player.getPlayer() ?
                        Player.getPlayer().distanceTo(data.entity).toFixed(1) : "unknown";

                    Chat.log(`  ${index + 1}. Level ${level} - ${distance}m away`);
                    Chat.log(`     Available trades: ${availableTrades}/${trades.length}`);

                    // Highlight if master level or many available trades
                    if (level === 5) {
                        Chat.log(`     &a✓ Master trader - best prices!`);
                    } else if (availableTrades >= trades.length * 0.8) {
                        Chat.log(`     &a✓ Many trades available`);
                    }
                });
                Chat.log("");
            }
        });

        // Find trading opportunities based on what player has
        findTradingOpportunities(villagers);
    }

    function findTradingOpportunities(villagers) {
        const player = Player.getPlayer();
        if (!player) return;

        const playerInventory = player.getInventory();
        const playerItems = new Set();

        // Check what items player has in hotbar and main inventory
        for (let i = 0; i < Math.min(36, playerInventory.getSlotCount()); i++) {
            const stack = playerInventory.getSlot(i);
            if (!stack.isEmpty()) {
                playerItems.add(stack.getName().toLowerCase().replace(/[^a-z_]/g, '_'));
            }
        }

        Chat.log("&6=== Trading Opportunities ===&r");

        let foundOpportunities = false;

        villagers.forEach(data => {
            const villager = data.villager;
            const profession = villager.getProfession();
            const info = professionInfo[profession];

            if (info) {
                // Check if player has items this profession might want
                const hasWantedItems = info.searchItems.some(item =>
                    playerItems.has(item)
                );

                if (hasWantedItems) {
                    foundOpportunities = true;
                    const level = villager.getLevel();
                    const trades = villager.getTrades().filter(t => t.isAvailable()).length;

                    Chat.log(`&a${info.name}&r (Level ${level}) - ${trades} trades available`);
                    Chat.log(`  Wants: ${info.searchItems.filter(item => playerItems.has(item)).join(", ")}`);
                }
            }
        });

        if (!foundOpportunities) {
            Chat.log("No immediate trading opportunities found with current inventory");
            Chat.log("Try gathering: emeralds, crops, iron, paper, or other common trade items");
        }
    }

    // Command to run the finder
    events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        const player = Player.getPlayer();
        if (player && player.getKeybinding("key.debug").isPressed()) {
            findVillagersByWantedItems();
        }
    }));

    Chat.log("Villager Finder activated!");
    Chat.log("Press F6 (debug key) to scan for villagers and trading opportunities");
}

// Start the villager finder
createVillagerFinder();
```

## Important Notes

### Profession Mechanics
- **Unemployed Villagers:** Villagers with profession "minecraft:none" can be assigned a profession by placing an appropriate workplace block
- **Nitwits:** Villagers with profession "minecraft:nitwit" cannot be employed and do not offer trades
- **Workplace Blocks:** Different professions require specific workplace blocks (e.g., lectern for librarians, composters for farmers)

### Level System
- **Experience Gain:** Villagers gain experience when players complete trades with them
- **Trade Unlocking:** Higher levels unlock more and better trades
- **Price Benefits:** Master level villagers offer better prices and more items per trade

### Style Variants
- **Biome-Specific:** Villager styles are determined by the biome they spawn in
- **Appearance Only:** Style primarily affects visual appearance and doesn't typically impact available trades
- **Mixed Villages:** Natural villages can have multiple style variants due to biome mixing

### Data Availability
- **Client-Side:** Profession, level, and style data are reliably available on the client side
- **Trading Data:** Trade availability and merchant experience depend on server data synchronization

## Related Classes

- `MerchantEntityHelper`: Parent class providing trading functionality
- `LivingEntityHelper`: Provides health, status effects, and other living entity features
- `EntityHelper`: Base class for all entity helpers with position and movement
- `TradeOfferHelper`: Represents individual villager trade offers
- `VillagerInventory`: Represents villager inventory for trading operations

## Common Use Cases

- **Village Management:** Scripts for organizing and managing village populations
- **Trading Automation:** Bots that find and execute optimal trades
- **Economic Analysis:** Tools for analyzing village economies and trade patterns
- **Professional Services:** Scripts that help players find specific types of villagers
- **Village Development:** Tools for planning and developing optimal village layouts
- **Trading Optimization:** Systems for finding the best trading opportunities and prices