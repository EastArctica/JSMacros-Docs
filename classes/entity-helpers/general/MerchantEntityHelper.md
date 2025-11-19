# MerchantEntityHelper

## Overview

The `MerchantEntityHelper` class is a World Interaction helper in JSMacros that provides access to merchant entities (villagers, wandering traders, etc.) and their trading functionality. It extends `LivingEntityHelper` and provides methods to interact with merchant-specific properties like trade offers, experience, and customer status.

This class is particularly useful for creating scripts that:
- Analyze villager trading opportunities
- Monitor merchant inventory and prices
- Create automated trading systems
- Track merchant experience and reputation

**Available since:** 1.6.3
**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity`
**Extends:** `LivingEntityHelper<T extends MerchantEntity>`

## Class Declaration

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.MerchantEntityHelper<T extends MerchantEntity>`
**Extends:** `LivingEntityHelper<T>`
**Generic Type:** `T extends MerchantEntity` - The specific type of merchant entity (VillagerEntity, WanderingTraderEntity, etc.)

## Accessing MerchantEntityHelper

You typically get `MerchantEntityHelper` instances from:
- Entity events involving merchants
- World entity searches filtered for merchant types
- Direct interaction with merchant entities

```javascript
// Example: Getting a MerchantEntityHelper from the nearest villager
const player = Player.getPlayer();
const nearbyEntities = World.getEntities(10); // 10 block radius
let merchantHelper = null;

for (const entity of nearbyEntities) {
    if (entity.getName().includes("Villager") ||
        entity.getName().includes("Wandering Trader")) {
        merchantHelper = entity;
        break;
    }
}

if (merchantHelper) {
    Chat.log(`Found merchant with ${merchantHelper.getTrades().length} trades available`);
}
```

## Methods

### getTrades()

**Returns:** `List<TradeOfferHelper>`

Returns a list of all currently available trade offers from this merchant. Each trade is represented as a `TradeOfferHelper` object containing information about required items, output items, pricing, and usage limits.

**Note:** These methods might not work reliably depending on the data the server sends. They work best in singleplayer environments.

```javascript
const trades = merchant.getTrades();
Chat.log(`Merchant has ${trades.length} trades available:`);

for (let i = 0; i < trades.length; i++) {
    const trade = trades[i];
    const inputs = trade.getInput();
    const output = trade.getOutput();

    Chat.log(`Trade ${i + 1}:`);

    // Show input items
    for (let j = 0; j < inputs.length; j++) {
        const input = inputs[j];
        Chat.log(`  Input ${j + 1}: ${input.getCount()}x ${input.getName()}`);
    }

    // Show output item
    Chat.log(`  Output: ${output.getCount()}x ${output.getName()}`);
    Chat.log(`  Available: ${trade.isAvailable() ? 'Yes' : 'No'}`);
    Chat.log(`  Uses: ${trade.getUses()}/${trade.getMaxUses()}`);
}
```

### refreshTrades()

**Returns:** `List<TradeOfferHelper>`

Refreshes the merchant's trade offers and returns the updated list. This can be useful when you want to force a restock or check for new trades that might have become available.

```javascript
// Refresh trades to see if any new ones are available
const refreshedTrades = merchant.refreshTrades();
Chat.log(`After refresh: ${refreshedTrades.length} trades available`);

// Compare with previous trades
const oldTrades = merchant.getTrades();
if (refreshedTrades.length > oldTrades.length) {
    Chat.log("New trades have become available!");
}
```

### getExperience()

**Returns:** `int`

Returns the current experience level of the merchant. For villagers, this affects their trading abilities and prices. Higher experience levels generally indicate more favorable trading conditions.

```javascript
const experience = merchant.getExperience();
Chat.log(`Merchant experience level: ${experience}`);

if (experience > 0) {
    Chat.log("This merchant has gained experience from previous trades.");
}
```

### hasCustomer()

**Returns:** `boolean`

Returns `true` if the merchant currently has a customer, `false` otherwise. This can be used to check if another player is currently trading with this merchant.

```javascript
if (merchant.hasCustomer()) {
    Chat.log("Merchant is currently busy with another customer.");
    // Wait or try a different merchant
} else {
    Chat.log("Merchant is available for trading.");
    // Proceed with trading logic
}
```

## Usage Examples

### Example 1: Comprehensive Merchant Analysis

```javascript
function analyzeMerchant(merchantHelper) {
    Chat.log("=== Merchant Analysis ===");

    // Basic merchant info (inherited from LivingEntityHelper)
    Chat.log(`Name: ${merchantHelper.getName()}`);
    Chat.log(`Health: ${merchantHelper.getHealth()}/${merchantHelper.getMaxHealth()}`);
    Chat.log(`Position: ${merchantHelper.getPos()}`);

    // Merchant-specific info
    Chat.log(`Experience: ${merchantHelper.getExperience()}`);
    Chat.log(`Has Customer: ${merchantHelper.hasCustomer()}`);

    // Analyze trades
    const trades = merchantHelper.getTrades();
    Chat.log(`\n=== Available Trades (${trades.length}) ===`);

    let bestValueTrades = [];
    let availableTrades = 0;
    let totalUses = 0;

    for (let i = 0; i < trades.length; i++) {
        const trade = trades[i];

        if (trade.isAvailable()) {
            availableTrades++;
        }

        totalUses += trade.getUses();

        const inputs = trade.getInput();
        const output = trade.getOutput();

        // Simple value calculation (item count comparison)
        let inputValue = 0;
        for (const input of inputs) {
            inputValue += input.getCount();
        }

        const outputValue = output.getCount();
        const valueRatio = outputValue / inputValue;

        if (valueRatio > 1.0) {
            bestValueTrades.push({
                trade: trade,
                ratio: valueRatio,
                index: i
            });
        }

        Chat.log(`\nTrade ${i + 1}:`);
        Chat.log(`  Inputs: ${inputs.map(item => `${item.getCount()}x ${item.getName()}`).join(" + ")}`);
        Chat.log(`  Output: ${output.getCount()}x ${output.getName()}`);
        Chat.log(`  Available: ${trade.isAvailable() ? 'Yes' : 'No'}`);
        Chat.log(`  Uses: ${trade.getUses()}/${trade.getMaxUses()}`);
        Chat.log(`  Value Ratio: ${valueRatio.toFixed(2)}`);
    }

    Chat.log(`\n=== Summary ===`);
    Chat.log(`Available trades: ${availableTrades}/${trades.length}`);
    Chat.log(`Total trade uses: ${totalUses}`);

    if (bestValueTrades.length > 0) {
        Chat.log(`\n=== Best Value Trades ===`);
        bestValueTrades.sort((a, b) => b.ratio - a.ratio);
        bestValueTrades.slice(0, 3).forEach(item => {
            Chat.log(`Trade ${item.index + 1}: ${item.ratio.toFixed(2)}x value ratio`);
        });
    }
}

// Usage example with nearest merchant
const player = Player.getPlayer();
if (player) {
    const nearbyEntities = World.getEntities(10);
    for (const entity of nearbyEntities) {
        if (entity.getName().includes("Villager")) {
            analyzeMerchant(entity);
            break;
        }
    }
}
```

### Example 2: Automated Trade Monitor

```javascript
function monitorMerchantPrices(merchantHelper) {
    const trades = merchantHelper.getTrades();
    const priceHistory = new Map(); // Store price history for each trade

    // Initial scan
    Chat.log("Scanning merchant trades...");
    for (let i = 0; i < trades.length; i++) {
        const trade = trades[i];
        const inputs = trade.getInput();
        const output = trade.getOutput();

        const tradeKey = `${inputs.map(item => item.getName()).join("+")}_to_${output.getName()}`;
        const currentPrice = trade.getAdjustedPrice();

        priceHistory.set(tradeKey, {
            originalPrice: trade.getOriginalPrice(),
            currentPrice: currentPrice,
            demand: trade.getDemandBonus(),
            uses: trade.getUses()
        });

        Chat.log(`${tradeKey}: ${currentPrice} (Original: ${trade.getOriginalPrice()})`);
    }

    // Function to check for price changes
    function checkPriceChanges() {
        const updatedTrades = merchantHelper.getTrades();

        for (let i = 0; i < updatedTrades.length; i++) {
            const trade = updatedTrades[i];
            const inputs = trade.getInput();
            const output = trade.getOutput();

            const tradeKey = `${inputs.map(item => item.getName()).join("+")}_to_${output.getName()}`;
            const oldData = priceHistory.get(tradeKey);

            if (oldData) {
                const newPrice = trade.getAdjustedPrice();
                const priceChange = newPrice - oldData.currentPrice;

                if (priceChange !== 0) {
                    const changePercent = ((priceChange / oldData.currentPrice) * 100).toFixed(1);
                    const direction = priceChange > 0 ? "increased" : "decreased";

                    Chat.log(`Price alert: ${tradeKey} ${direction} by ${Math.abs(changePercent)}%`);
                    Chat.log(`  Old price: ${oldData.currentPrice}, New price: ${newPrice}`);
                    Chat.log(`  Demand bonus: ${trade.getDemandBonus()}`);

                    // Update history
                    priceHistory.set(tradeKey, {
                        originalPrice: oldData.originalPrice,
                        currentPrice: newPrice,
                        demand: trade.getDemandBonus(),
                        uses: trade.getUses()
                    });
                }
            }
        }
    }

    // Check for changes every 30 seconds
    setInterval(checkPriceChanges, 30000);

    Chat.log("Price monitoring started. Changes will be reported every 30 seconds.");
}

// Find and monitor a merchant
const entities = World.getEntities(5);
for (const entity of entities) {
    if (entity.getName().includes("Villager")) {
        monitorMerchantPrices(entity);
        break;
    }
}
```

### Example 3: Trading Opportunity Finder

```javascript
function findTradingOpportunities() {
    const player = Player.getPlayer();
    const playerInventory = Player.getPlayer().getInventory();

    // Get what the player has
    const playerItems = new Map();
    for (let i = 0; i < playerInventory.getSlotCount(); i++) {
        const stack = playerInventory.getSlot(i);
        if (!stack.isEmpty()) {
            const itemName = stack.getName();
            const count = stack.getCount();
            playerItems.set(itemName, (playerItems.get(itemName) || 0) + count);
        }
    }

    // Find nearby merchants
    const nearbyEntities = World.getEntities(20);
    const merchants = nearbyEntities.filter(entity =>
        entity.getName().includes("Villager") ||
        entity.getName().includes("Wandering Trader")
    );

    if (merchants.length === 0) {
        Chat.log("No merchants found nearby.");
        return;
    }

    Chat.log(`Found ${merchants.length} merchants nearby. Checking trades...`);

    let opportunities = [];

    for (const merchant of merchants) {
        const trades = merchant.getTrades();

        for (const trade of trades) {
            if (!trade.isAvailable()) continue;

            const inputs = trade.getInput();
            const output = trade.getOutput();

            // Check if player has required items
            let canAfford = true;
            for (const input of inputs) {
                const playerCount = playerItems.get(input.getName()) || 0;
                if (playerCount < input.getCount()) {
                    canAfford = false;
                    break;
                }
            }

            if (canAfford) {
                opportunities.push({
                    merchant: merchant.getName(),
                    merchantPos: merchant.getPos(),
                    trade: trade,
                    value: calculateTradeValue(trade)
                });
            }
        }
    }

    // Sort by value (best trades first)
    opportunities.sort((a, b) => b.value - a.value);

    if (opportunities.length > 0) {
        Chat.log(`\n=== Found ${opportunities.length} Trading Opportunities ===`);

        opportunities.slice(0, 10).forEach((opp, index) => {
            const inputs = opp.trade.getInput();
            const output = opp.trade.getOutput();

            Chat.log(`\n${index + 1}. ${opp.merchant}`);
            Chat.log(`   Location: [${Math.floor(opp.merchantPos.x)}, ${Math.floor(opp.merchantPos.y)}, ${Math.floor(opp.merchantPos.z)}]`);
            Chat.log(`   Trade: ${inputs.map(item => `${item.getCount()}x ${item.getName()}`).join(" + ")} → ${output.getCount()}x ${output.getName()}`);
            Chat.log(`   Value Score: ${opp.value.toFixed(2)}`);
            Chat.log(`   Uses left: ${opp.trade.getMaxUses() - opp.trade.getUses()}`);
        });
    } else {
        Chat.log("No immediate trading opportunities found.");
    }
}

function calculateTradeValue(trade) {
    const inputs = trade.getInput();
    const output = trade.getOutput();

    // Simple value calculation - can be made more sophisticated
    let inputValue = inputs.reduce((sum, item) => sum + item.getCount(), 0);
    let outputValue = output.getCount();

    // Factor in rarity of items (simplified)
    const rarities = {
        'diamond': 10,
        'emerald': 8,
        'gold': 5,
        'iron': 3,
        'stone': 1
    };

    let inputRarityValue = 0;
    let outputRarityValue = 0;

    for (const input of inputs) {
        for (const [material, rarity] of Object.entries(rarities)) {
            if (input.getName().toLowerCase().includes(material)) {
                inputRarityValue += rarity;
                break;
            }
        }
    }

    for (const [material, rarity] of Object.entries(rarities)) {
        if (output.getName().toLowerCase().includes(material)) {
            outputRarityValue += rarity;
            break;
        }
    }

    return (outputValue / inputValue) * (1 + outputRarityValue * 0.1);
}

// Run the opportunity finder
findTradingOpportunities();
```

### Example 4: Merchant Reputation Analysis

```javascript
function analyzeMerchantReputation(merchantHelper) {
    const trades = merchantHelper.getTrades();
    const experience = merchantHelper.getExperience();

    Chat.log("=== Merchant Reputation Analysis ===");
    Chat.log(`Merchant Experience: ${experience}`);

    let totalDemandBonus = 0;
    let positiveAdjustments = 0;
    let negativeAdjustments = 0;
    let totalTradesAnalyzed = 0;

    for (const trade of trades) {
        const adjustment = trade.getCurrentPriceAdjustment();
        const demand = trade.getDemandBonus();
        const specialPrice = trade.getSpecialPrice();

        totalDemandBonus += demand;
        totalTradesAnalyzed++;

        if (adjustment < 0) {
            positiveAdjustments += Math.abs(adjustment);
        } else if (adjustment > 0) {
            negativeAdjustments += adjustment;
        }

        if (specialPrice !== 0) {
            Chat.log(`Special price adjustment: ${specialPrice} for ${trade.getOutput().getName()}`);
        }
    }

    const avgDemandBonus = totalTradesAnalyzed > 0 ? totalDemandBonus / totalTradesAnalyzed : 0;

    Chat.log(`\nReputation Metrics:`);
    Chat.log(`Average Demand Bonus: ${avgDemandBonus.toFixed(2)}`);
    Chat.log(`Total Price Discounts: ${positiveAdjustments}`);
    Chat.log(`Total Price Premiums: ${negativeAdjustments}`);

    // Determine reputation level
    let reputationLevel = "Neutral";
    if (positiveAdjustments > negativeAdjustments * 2) {
        reputationLevel = "Excellent";
    } else if (positiveAdjustments > negativeAdjustments) {
        reputationLevel = "Good";
    } else if (negativeAdjustments > positiveAdjustments * 2) {
        reputationLevel = "Poor";
    } else if (negativeAdjustments > positiveAdjustments) {
        reputationLevel = "Below Average";
    }

    Chat.log(`Overall Reputation: ${reputationLevel}`);

    // Trading recommendations
    Chat.log(`\n=== Trading Recommendations ===`);
    if (reputationLevel === "Excellent" || reputationLevel === "Good") {
        Chat.log("✓ You have good reputation with this merchant!");
        Chat.log("✓ Consider trading valuable items for better prices");
        Chat.log("✓ This merchant may offer discounts on high-demand items");
    } else if (reputationLevel === "Neutral") {
        Chat.log("- Standard pricing - shop around for best deals");
        Chat.log("- Consider building reputation through regular trading");
    } else {
        Chat.log("✗ Prices may be higher due to poor reputation");
        Chat.log("✗ Try trading with other merchants or improve reputation");
    }

    // Experience analysis
    if (experience > 50) {
        Chat.log(`\nThis merchant is highly experienced (${experience} XP)`);
        Chat.log("May offer better trades and has established customer relationships");
    } else if (experience > 10) {
        Chat.log(`\nThis merchant has moderate experience (${experience} XP)`);
        Chat.log("Regular trading may improve your relationship");
    } else {
        Chat.log(`\nThis merchant is relatively new (${experience} XP)`);
        Chat.log("Good opportunity to establish a positive relationship");
    }
}

// Find and analyze a merchant
const entities = World.getEntities(10);
for (const entity of entities) {
    if (entity.getName().includes("Villager")) {
        analyzeMerchantReputation(entity);
        break;
    }
}
```

## Important Notes

### Data Availability
- **Server Dependency:** Trade data availability depends on what information the server sends to clients. These methods work most reliably in singleplayer or when the server sends full merchant data.

### Trade System Mechanics
- **Dynamic Pricing:** Trade prices can change based on demand, player reputation, and trading frequency.
- **Experience System:** Merchants gain experience from successful trades, which can affect future pricing and available trades.
- **Restocking:** Merchants may restock their trades periodically, but the timing and conditions depend on the server implementation.

### Performance Considerations
- **Trade Refresh:** Calling `refreshTrades()` frequently may impact performance and should be used judiciously.
- **Large Trade Lists:** Merchants with many trades (high-level villagers) may require more processing time for analysis.

### Multiplayer Considerations
- **Competition:** The `hasCustomer()` method can help detect when other players are trading with a merchant.
- **Server Rules:** Some servers may have custom trade mechanics or restrictions that affect the behavior of these methods.

## Related Classes

- `LivingEntityHelper`: Parent class providing basic living entity functionality
- `TradeOfferHelper`: Represents individual trade offers with detailed pricing and usage information
- `VillagerEntityHelper`: Subclass specifically for villagers with profession and level information
- `EntityHelper`: Base class for all entity helpers
- `ItemStackHelper`: Used for representing trade input and output items

## Common Use Cases

- **Automated Trading Bots:** Scripts that automatically find and execute profitable trades
- **Price Monitoring:** Tools that track merchant prices over time to identify good deals
- **Reputation Management:** Systems for tracking and improving relationships with merchants
- **Economic Analysis:** Tools for analyzing village economies and trade patterns
- **Trading Assistance:** Helpers that suggest the best available trades based on player inventory and goals