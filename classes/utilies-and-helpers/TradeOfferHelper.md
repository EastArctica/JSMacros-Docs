# TradeOfferHelper

## Overview

The `TradeOfferHelper` class is a World Interaction helper in JSMacros that represents a single trade offer from a merchant entity (villager, wandering trader, etc.). It provides detailed information about trade requirements, pricing adjustments, usage limits, and economic factors that affect the trade's availability and cost.

This class is particularly useful for creating scripts that:
- Analyze individual trade opportunities
- Monitor price changes and market dynamics
- Create automated trading decision systems
- Track merchant reputation and demand mechanics
- Calculate trade profitability and value

**Available since:** 1.6.3
**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity`
**Extends:** `BaseHelper<TradeOffer>`

## Class Declaration

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.TradeOfferHelper`
**Extends:** `BaseHelper<TradeOffer>`
**Wrapped Class:** `net.minecraft.village.TradeOffer`

## Accessing TradeOfferHelper

You typically get `TradeOfferHelper` instances from:
- `MerchantEntityHelper.getTrades()` - Gets all trades from a merchant
- Trade-related events and UI interactions
- Villager inventory access

```javascript
// Example: Getting TradeOfferHelper instances from a merchant
const player = Player.getPlayer();
const nearbyEntities = World.getEntities(10);
let merchantHelper = null;

// Find a nearby villager
for (const entity of nearbyEntities) {
    if (entity.getName().includes("Villager")) {
        merchantHelper = entity;
        break;
    }
}

if (merchantHelper) {
    // Get all trade offers from the merchant
    const trades = merchantHelper.getTrades();
    Chat.log(`Found ${trades.length} trade offers`);

    // Each item in the array is a TradeOfferHelper
    for (let i = 0; i < trades.length; i++) {
        const trade = trades[i]; // This is a TradeOfferHelper
        analyzeTrade(trade, i);
    }
}

function analyzeTrade(trade, index) {
    const inputs = trade.getInput();
    const output = trade.getOutput();

    Chat.log(`Trade ${index + 1}:`);
    Chat.log(`  Available: ${trade.isAvailable() ? 'Yes' : 'No'}`);
    Chat.log(`  Input items: ${inputs.map(item => `${item.getCount()}x ${item.getName()}`).join(" + ")}`);
    Chat.log(`  Output item: ${output.getCount()}x ${output.getName()}`);
    Chat.log(`  Uses: ${trade.getUses()}/${trade.getMaxUses()}`);
    Chat.log(`  Experience reward: ${trade.getExperience()} XP`);
}
```

## Methods

### getInput()

**Returns:** `List<ItemStackHelper>`

Returns a list of all input items required for this trade. This includes both the primary input item and any secondary input item (for 2-for-1 trades). Empty slots are automatically filtered out.

```javascript
const inputs = trade.getInput();
Chat.log(`This trade requires ${inputs.length} input items:`);

for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    Chat.log(`  ${i + 1}. ${input.getCount()}x ${input.getName()}`);
}

// Example output:
// This trade requires 2 input items:
//   1. 8x Cobblestone
//   2. 1x Emerald
```

### getLeftInput()

**Since:** 1.8.4
**Returns:** `ItemStackHelper`

Returns the primary (left) input item required for this trade. This uses the adjusted price with any demand bonuses or discounts applied.

```javascript
const leftInput = trade.getLeftInput();
Chat.log(`Primary input: ${leftInput.getCount()}x ${leftInput.getName()}`);
Chat.log(`Stack empty: ${leftInput.isEmpty()}`);

// The count reflects current price adjustments
const adjustedCount = leftInput.getCount();
Chat.log(`Adjusted price: ${adjustedCount} items`);
```

### getRightInput()

**Since:** 1.8.4
**Returns:** `ItemStackHelper`

Returns the secondary (right) input item required for this trade. If this is a simple 1-for-1 trade, this will return an empty ItemStack.

```javascript
const rightInput = trade.getRightInput();
if (!rightInput.isEmpty()) {
    Chat.log(`Secondary input: ${rightInput.getCount()}x ${rightInput.getName()}`);
} else {
    Chat.log("This is a simple 1-for-1 trade");
}

// Example for book trade: 1 Book + 1 Emerald -> 1 Enchanted Book
// getLeftInput() would return 1x Book
// getRightInput() would return 1x Emerald
```

### getOutput()

**Returns:** `ItemStackHelper`

Returns the item that will be received when this trade is successfully executed.

```javascript
const output = trade.getOutput();
Chat.log(`You will receive: ${output.getCount()}x ${output.getName()}`);

// Get detailed information about the output
const outputId = output.getItemId();
const outputNBT = output.getNBT();
Chat.log(`Output item ID: ${outputId}`);
Chat.log(`Output NBT: ${outputNBT}`);
```

### getIndex()

**Since:** 1.8.4
**Returns:** `int`

Returns the index position of this trade in the merchant's trade list. This is useful for selecting trades programmatically.

```javascript
const tradeIndex = trade.getIndex();
Chat.log(`This is trade #${tradeIndex} in the merchant's list`);

// Use the index to select this trade
trade.select(); // Will select this specific trade in the UI
```

### select()

**Returns:** `TradeOfferHelper`

Selects this trade offer in the merchant trading interface. This method will only work if:
1. The villager inventory screen is currently open
2. The trade index is valid for the current merchant

Returns `this` to allow method chaining.

```javascript
// Select the trade programmatically
const selectedTrade = trade.select();
Chat.log("Trade selected successfully");

// Method chaining example
trade.select()
    .getInput()
    .forEach(item => Chat.log(`Input: ${item.getName()}`));

// Important: Only works when merchant screen is open
if (Client.getMinecraft().currentScreen instanceof VillagerInventory) {
    trade.select();
} else {
    Chat.log("Error: Merchant screen must be open to select trades");
}
```

### isAvailable()

**Returns:** `boolean`

Returns `true` if this trade is currently available, `false` if it's disabled or locked. Trades become unavailable when:
- They reach their maximum usage limit
- The merchant runs out of stock (for certain trade types)
- The trade is temporarily disabled by the server

```javascript
if (trade.isAvailable()) {
    Chat.log("This trade is available for execution");

    // Check usage limits
    const uses = trade.getUses();
    const maxUses = trade.getMaxUses();
    const remainingUses = maxUses - uses;

    Chat.log(`Remaining uses: ${remainingUses}`);

    if (remainingUses > 0) {
        Chat.log("Trade has remaining uses - good to execute!");
    } else {
        Chat.log("Trade has reached its maximum usage limit");
    }
} else {
    Chat.log("This trade is currently unavailable");
}
```

### getNBT()

**Returns:** `NBTElementHelper$NBTCompoundHelper`

Returns the complete NBT data for this trade offer as a compound tag. This includes all trade properties, pricing data, and merchant-specific information.

```javascript
const tradeNBT = trade.getNBT();
Chat.log(`Trade NBT: ${tradeNBT}`);

// Access specific NBT properties
const buyNBT = tradeNBT.get("buy");
const sellNBT = tradeNBT.get("sell");
const usesNBT = tradeNBT.get("uses");

Chat.log(`Uses from NBT: ${usesNBT.asString()}`);

// Example: Export trade data for analysis
function exportTradeData(trade) {
    const nbt = trade.getNBT();
    const inputs = trade.getInput();
    const output = trade.getOutput();

    const tradeData = {
        index: trade.getIndex(),
        inputs: inputs.map(item => ({
            id: item.getItemId(),
            count: item.getCount(),
            name: item.getName()
        })),
        output: {
            id: output.getItemId(),
            count: output.getCount(),
            name: output.getName()
        },
        uses: trade.getUses(),
        maxUses: trade.getMaxUses(),
        available: trade.isAvailable(),
        rawNBT: nbt.toString()
    };

    return tradeData;
}
```

### getUses()

**Returns:** `int`

Returns the number of times this trade has been used. When this reaches `getMaxUses()`, the trade becomes disabled until the merchant restocks.

```javascript
const uses = trade.getUses();
const maxUses = trade.getMaxUses();
const usagePercentage = (uses / maxUses) * 100;

Chat.log(`Trade usage: ${uses}/${maxUses} (${usagePercentage.toFixed(1)}%)`);

// Check if trade is heavily used
if (usagePercentage > 80) {
    Chat.log("⚠️ This trade is heavily used and may soon be unavailable");
} else if (usagePercentage < 20) {
    Chat.log("✓ This trade is lightly used - good availability");
}
```

### getMaxUses()

**Returns:** `int`

Returns the maximum number of times this trade can be used before it becomes disabled. This value varies by trade type and merchant characteristics.

```javascript
const maxUses = trade.getMaxUses();
Chat.log(`Maximum uses: ${maxUses}`);

// Categorize trade longevity
let longevity;
if (maxUses <= 4) {
    longevity = "Limited";
} else if (maxUses <= 8) {
    longevity = "Standard";
} else if (maxUses <= 16) {
    longevity = "Good";
} else {
    longevity = "High";
}

Chat.log(`Trade longevity: ${longevity}`);

// Calculate remaining value
const remainingUses = maxUses - trade.getUses();
if (remainingUses > 0) {
    Chat.log(`✓ ${remainingUses} uses remaining`);
}
```

### shouldRewardPlayerExperience()

**Since:** 1.8.4
**Returns:** `boolean`

Returns `true` if this trade will award experience points to the player upon successful completion. Most trades from experienced merchants provide XP rewards.

```javascript
const givesXP = trade.shouldRewardPlayerExperience();
if (givesXP) {
    const xpAmount = trade.getExperience();
    Chat.log(`This trade rewards ${xpAmount} experience points`);

    // Prioritize XP-giving trades for character progression
    if (xpAmount > 3) {
        Chat.log("✓ High XP reward - good for leveling");
    }
} else {
    Chat.log("This trade does not provide experience rewards");
}
```

### getExperience()

**Returns:** `int`

Returns the amount of experience points awarded when this trade is successfully completed. XP rewards are typically higher for more complex trades and from experienced merchants.

```javascript
const xpReward = trade.getExperience();
Chat.log(`XP reward: ${xpReward} points`);

if (xpReward > 0) {
    Chat.log("✓ This trade provides experience");

    // Calculate XP efficiency
    const inputs = trade.getInput();
    const totalInputValue = inputs.reduce((sum, item) => sum + item.getCount(), 0);
    const xpPerInput = xpReward / totalInputValue;

    Chat.log(`XP efficiency: ${xpPerInput.toFixed(2)} XP per input item`);

    if (xpPerInput > 0.5) {
        Chat.log("🌟 Excellent XP efficiency!");
    }
}
```

### getCurrentPriceAdjustment()

**Returns:** `int`

Returns the current price adjustment compared to the original price. Positive values indicate price increases (due to high demand), while negative values indicate discounts (due to good reputation or Hero of the Village effect).

```javascript
const priceAdjustment = trade.getCurrentPriceAdjustment();
const adjustedPrice = trade.getAdjustedPrice();
const originalPrice = trade.getOriginalPrice();

Chat.log(`Price adjustment: ${priceAdjustment > 0 ? '+' : ''}${priceAdjustment}`);
Chat.log(`Original price: ${originalPrice}`);
Chat.log(`Current price: ${adjustedPrice}`);

if (priceAdjustment < 0) {
    Chat.log(`💰 Discount of ${Math.abs(priceAdjustment)} items!`);
    const discountPercent = (Math.abs(priceAdjustment) / originalPrice) * 100;
    Chat.log(`Savings: ${discountPercent.toFixed(1)}%`);
} else if (priceAdjustment > 0) {
    Chat.log(`📈 Price increased by ${priceAdjustment} items`);
    const premiumPercent = (priceAdjustment / originalPrice) * 100;
    Chat.log(`Premium: ${premiumPercent.toFixed(1)}%`);
} else {
    Chat.log("📊 No price adjustment - standard pricing");
}
```

### getOriginalFirstInput()

**Since:** 1.8.4
**Returns:** `ItemStackHelper`

Returns the original (unadjusted) primary input item before any price modifications due to demand, reputation, or special effects.

```javascript
const originalInput = trade.getOriginalFirstInput();
const currentInput = trade.getLeftInput();

Chat.log(`Original input: ${originalInput.getCount()}x ${originalInput.getName()}`);
Chat.log(`Current input: ${currentInput.getCount()}x ${currentInput.getName()}`);

const priceChange = currentInput.getCount() - originalInput.getCount();
if (priceChange !== 0) {
    const changeType = priceChange > 0 ? "increase" : "decrease";
    Chat.log(`Price ${changeType}: ${Math.abs(priceChange)} items`);
}
```

### getOriginalPrice()

**Since:** 1.8.4
**Returns:** `int`

Returns the original price (stack count) of the primary input item without any adjustments. This is the base price before demand bonuses or reputation effects.

```javascript
const originalPrice = trade.getOriginalPrice();
const adjustedPrice = trade.getAdjustedPrice();
const specialPrice = trade.getSpecialPrice();

Chat.log(`Price breakdown:`);
Chat.log(`  Original price: ${originalPrice}`);
Chat.log(`  Special adjustment: ${specialPrice}`);
Chat.log(`  Demand bonus: ${trade.getDemandBonus()}`);
Chat.log(`  Final adjusted price: ${adjustedPrice}`);

// Calculate total adjustment
const totalAdjustment = adjustedPrice - originalPrice;
Chat.log(`  Total price change: ${totalAdjustment > 0 ? '+' : ''}${totalAdjustment}`);
```

### getAdjustedPrice()

**Since:** 1.8.4
**Returns:** `int`

Returns the current adjusted price (stack count) of the primary input item after all modifications are applied. This includes demand bonuses, special price adjustments, and reputation effects.

```javascript
const adjustedPrice = trade.getAdjustedPrice();
Chat.log(`Current adjusted price: ${adjustedPrice}`);

// Compare with other trades for price comparison
const trades = merchantHelper.getTrades();
let lowestPrice = Infinity;
let highestPrice = 0;

for (const otherTrade of trades) {
    const price = otherTrade.getAdjustedPrice();
    lowestPrice = Math.min(lowestPrice, price);
    highestPrice = Math.max(highestPrice, price);
}

if (adjustedPrice === lowestPrice) {
    Chat.log("💰 Best price among all trades!");
} else if (adjustedPrice === highestPrice) {
    Chat.log("💸 Most expensive trade");
} else {
    const avgPrice = (lowestPrice + highestPrice) / 2;
    const priceLevel = adjustedPrice > avgPrice ? "above average" : "below average";
    Chat.log(`Price is ${priceLevel} compared to other trades`);
}
```

### getSpecialPrice()

**Since:** 1.8.4
**Returns:** `int`

Returns the special price multiplier that affects pricing based on the player's reputation with the villager. Negative values indicate discounts (good reputation), while positive values indicate premiums (poor reputation). Hero of the Village effects always provide discounts.

```javascript
const specialPrice = trade.getSpecialPrice();
Chat.log(`Special price adjustment: ${specialPrice}`);

if (specialPrice < 0) {
    Chat.log(`🎉 Reputation discount: ${Math.abs(specialPrice)} items`);
    Chat.log("✓ You have good standing with this merchant");
} else if (specialPrice > 0) {
    Chat.log(`⚠️ Reputation penalty: ${specialPrice} items`);
    Chat.log("Consider improving your relationship with this merchant");
} else {
    Chat.log("📊 No reputation adjustment - neutral standing");
}

// Calculate reputation impact
const totalAdjustment = trade.getCurrentPriceAdjustment();
const reputationImpact = specialPrice;
const demandImpact = trade.getDemandBonus();

Chat.log(`Price adjustment breakdown:`);
Chat.log(`  Reputation impact: ${reputationImpact}`);
Chat.log(`  Demand impact: ${demandImpact}`);
Chat.log(`  Total adjustment: ${totalAdjustment}`);
```

### getPriceMultiplier()

**Since:** 1.8.4
**Returns:** `float`

Returns the price multiplier for this trade type, which determines how much prices can vary due to demand. Higher multipliers mean prices can fluctuate more dramatically.

```javascript
const priceMultiplier = trade.getPriceMultiplier();
Chat.log(`Price multiplier: ${priceMultiplier}`);

// Categorize price volatility
let volatility;
if (priceMultiplier <= 0.05) {
    volatility = "Very Stable";
} else if (priceMultiplier <= 0.1) {
    volatility = "Stable";
} else if (priceMultiplier <= 0.2) {
    volatility = "Moderate";
} else {
    volatility = "Volatile";
}

Chat.log(`Price volatility: ${volatility}`);

// Trading advice based on volatility
if (priceMultiplier > 0.15) {
    Chat.log("⚠️ High volatility - prices may change significantly with demand");
    Chat.log("💡 Consider trading when demand is low for better prices");
} else {
    Chat.log("✓ Stable pricing - consistent trade value");
}
```

### getDemandBonus()

**Since:** 1.8.4
**Returns:** `int`

Returns the demand bonus applied to this trade. Demand increases when players frequently trade the same items, causing prices to rise. Demand is only updated when merchants restock.

```javascript
const demandBonus = trade.getDemandBonus();
Chat.log(`Demand bonus: ${demandBonus}`);

if (demandBonus > 0) {
    Chat.log(`📈 High demand increases price by ${demandBonus} items`);
    Chat.log("💡 Wait for demand to decrease or find alternative trades");

    // Calculate demand impact percentage
    const originalPrice = trade.getOriginalPrice();
    const demandPercent = (demandBonus / originalPrice) * 100;
    Chat.log(`Demand adds ${demandPercent.toFixed(1)}% to the price`);
} else {
    Chat.log("✓ No demand bonus - standard pricing");
}

// Demand analysis function
function analyzeDemand(trade) {
    const demand = trade.getDemandBonus();
    const uses = trade.getUses();
    const maxUses = trade.getMaxUses();
    const usageRate = uses / maxUses;

    Chat.log(`\nDemand Analysis:`);
    Chat.log(`  Current demand bonus: ${demand}`);
    Chat.log(`  Usage rate: ${(usageRate * 100).toFixed(1)}%`);

    if (demand > 0 && usageRate > 0.8) {
        Chat.log("  🔥 High demand - prices inflated");
    } else if (demand > 0) {
        Chat.log("  📊 Moderate demand affecting prices");
    } else {
        Chat.log("  ✅ Low demand - good prices available");
    }

    // Predict future demand
    const futureDemand = Math.max(0, demand + 2 * uses - maxUses);
    if (futureDemand > demand) {
        Chat.log(`  ⚠️ Demand may increase to ${futureDemand} on next restock`);
    }
}
```

### toString()

**Returns:** `String`

Returns a string representation of this trade offer, including input and output items. This is useful for debugging and logging.

```javascript
const tradeString = trade.toString();
Chat.log(`Trade info: ${tradeString}`);

// Example output format:
// TradeOfferHelper:{"inputs": [8xCobblestone, 1xEmerald], "output": [1xIron Pickaxe]}

// Custom string formatting
function formatTradeForLog(trade) {
    const inputs = trade.getInput();
    const output = trade.getOutput();
    const available = trade.isAvailable() ? "✅" : "❌";
    const usage = `${trade.getUses()}/${trade.getMaxUses()}`;

    let inputStr = inputs.map(item => `${item.getCount()}x${item.getName()}`).join(" + ");

    return `${available} Trade: ${inputStr} → ${output.getCount()}x${output.getName()} (${usage})`;
}

Chat.log(formatTradeForLog(trade));
```

## Usage Examples

### Example 1: Comprehensive Trade Analysis

```javascript
function analyzeTrade(trade, index) {
    Chat.log(`\n=== Trade ${index + 1} Analysis ===`);

    // Basic availability
    const available = trade.isAvailable();
    Chat.log(`Status: ${available ? '✅ Available' : '❌ Unavailable'}`);

    if (!available) {
        Chat.log("⚠️ This trade is not available for execution");
        return;
    }

    // Input and output items
    const inputs = trade.getInput();
    const output = trade.getOutput();

    Chat.log(`Inputs:`);
    inputs.forEach((input, i) => {
        Chat.log(`  ${i + 1}. ${input.getCount()}x ${input.getName()}`);
    });
    Chat.log(`Output: ${output.getCount()}x ${output.getName()}`);

    // Usage information
    const uses = trade.getUses();
    const maxUses = trade.getMaxUses();
    const remainingUses = maxUses - uses;
    const usagePercentage = (uses / maxUses) * 100;

    Chat.log(`Usage: ${uses}/${maxUses} (${usagePercentage.toFixed(1)}%)`);
    Chat.log(`Remaining uses: ${remainingUses}`);

    // Experience rewards
    const givesXP = trade.shouldRewardPlayerExperience();
    if (givesXP) {
        const xpAmount = trade.getExperience();
        Chat.log(`XP reward: ${xpAmount} points`);
    }

    // Pricing analysis
    const originalPrice = trade.getOriginalPrice();
    const adjustedPrice = trade.getAdjustedPrice();
    const priceAdjustment = trade.getCurrentPriceAdjustment();
    const specialPrice = trade.getSpecialPrice();
    const demandBonus = trade.getDemandBonus();

    Chat.log(`\n=== Pricing Analysis ===`);
    Chat.log(`Original price: ${originalPrice}`);
    Chat.log(`Adjusted price: ${adjustedPrice}`);
    Chat.log(`Total adjustment: ${priceAdjustment > 0 ? '+' : ''}${priceAdjustment}`);

    if (specialPrice !== 0) {
        Chat.log(`Reputation adjustment: ${specialPrice}`);
        const repType = specialPrice < 0 ? "discount" : "penalty";
        Chat.log(`  Type: ${repType}`);
    }

    if (demandBonus > 0) {
        Chat.log(`Demand bonus: ${demandBonus}`);
        const demandPercent = (demandBonus / originalPrice) * 100;
        Chat.log(`  Demand increases price by ${demandPercent.toFixed(1)}%`);
    }

    // Value assessment
    const tradeValue = calculateTradeValue(trade);
    const efficiency = calculateTradeEfficiency(trade);

    Chat.log(`\n=== Value Assessment ===`);
    Chat.log(`Trade value score: ${tradeValue.toFixed(2)}`);
    Chat.log(`Efficiency rating: ${efficiency.toFixed(2)}`);

    // Recommendations
    provideTradeRecommendations(trade, tradeValue, efficiency);
}

function calculateTradeValue(trade) {
    const inputs = trade.getInput();
    const output = trade.getOutput();

    // Simple value calculation - can be customized
    let inputValue = 0;
    for (const input of inputs) {
        inputValue += input.getCount() * getItemValue(input.getName());
    }

    const outputValue = output.getCount() * getItemValue(output.getName());
    return outputValue / inputValue;
}

function calculateTradeEfficiency(trade) {
    const adjustedPrice = trade.getAdjustedPrice();
    const originalPrice = trade.getOriginalPrice();
    const xpReward = trade.getExperience();
    const maxUses = trade.getMaxUses();

    // Efficiency considers price advantage, XP rewards, and longevity
    const priceEfficiency = originalPrice / Math.max(1, adjustedPrice);
    const xpEfficiency = 1 + (xpReward * 0.1);
    const longevityEfficiency = Math.log(maxUses + 1);

    return priceEfficiency * xpEfficiency * longevityEfficiency;
}

function getItemValue(itemName) {
    // Simple item value mapping - customize based on your needs
    const values = {
        'diamond': 10,
        'emerald': 8,
        'gold ingot': 5,
        'iron ingot': 3,
        'stone': 1,
        'wood': 0.5,
        'dirt': 0.1
    };

    for (const [material, value] of Object.entries(values)) {
        if (itemName.toLowerCase().includes(material)) {
            return value;
        }
    }

    return 1; // Default value
}

function provideTradeRecommendations(trade, value, efficiency) {
    const available = trade.isAvailable();
    const remainingUses = trade.getMaxUses() - trade.getUses();

    Chat.log(`\n=== Recommendations ===`);

    if (!available) {
        Chat.log("❌ Trade unavailable - wait for restock");
        return;
    }

    if (value > 1.5) {
        Chat.log("🌟 Excellent value trade - prioritize this!");
    } else if (value > 1.2) {
        Chat.log("✅ Good value trade - consider executing");
    } else if (value > 1.0) {
        Chat.log("📊 Fair value trade - acceptable");
    } else {
        Chat.log("⚠️ Poor value trade - avoid if possible");
    }

    if (efficiency > 5.0) {
        Chat.log("🚀 High efficiency - excellent choice");
    } else if (efficiency > 3.0) {
        Chat.log("✨ Good efficiency - solid choice");
    } else if (efficiency > 2.0) {
        Chat.log("📈 Moderate efficiency");
    } else {
        Chat.log("📉 Low efficiency - consider alternatives");
    }

    if (remainingUses < 2) {
        Chat.log("⏰ Limited uses remaining - act quickly if interested");
    } else if (remainingUses > 10) {
        Chat.log("🔄 Plenty of uses available - no rush");
    }
}

// Usage example with merchant
const entities = World.getEntities(10);
for (const entity of entities) {
    if (entity.getName().includes("Villager")) {
        const trades = entity.getTrades();
        Chat.log(`Analyzing ${trades.length} trades from ${entity.getName()}`);

        trades.forEach((trade, index) => {
            analyzeTrade(trade, index);
        });
        break;
    }
}
```

### Example 2: Price Change Monitoring

```javascript
class TradePriceMonitor {
    constructor() {
        this.priceHistory = new Map();
        this.monitoringInterval = null;
    }

    startMonitoring(merchantHelper, intervalMs = 30000) {
        // Initial scan
        this.scanTrades(merchantHelper);

        // Start periodic monitoring
        this.monitoringInterval = setInterval(() => {
            this.scanTrades(merchantHelper);
        }, intervalMs);

        Chat.log(`Started monitoring merchant prices every ${intervalMs / 1000} seconds`);
    }

    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
            Chat.log("Stopped price monitoring");
        }
    }

    scanTrades(merchantHelper) {
        const trades = merchantHelper.getTrades();
        const currentTime = Date.now();

        for (let i = 0; i < trades.length; i++) {
            const trade = trades[i];
            const tradeKey = this.generateTradeKey(trade);

            const currentData = {
                adjustedPrice: trade.getAdjustedPrice(),
                originalPrice: trade.getOriginalPrice(),
                demandBonus: trade.getDemandBonus(),
                specialPrice: trade.getSpecialPrice(),
                uses: trade.getUses(),
                available: trade.isAvailable(),
                timestamp: currentTime,
                index: i
            };

            const previousData = this.priceHistory.get(tradeKey);

            if (previousData) {
                this.comparePrices(tradeKey, previousData, currentData);
            }

            this.priceHistory.set(tradeKey, currentData);
        }
    }

    generateTradeKey(trade) {
        const inputs = trade.getInput();
        const output = trade.getOutput();

        const inputStr = inputs.map(item => `${item.getCount()}x${item.getName()}`).join("+");
        const outputStr = `${output.getCount()}x${output.getName()}`;

        return `${inputStr}→${outputStr}`;
    }

    comparePrices(tradeKey, oldData, newData) {
        const priceChange = newData.adjustedPrice - oldData.adjustedPrice;

        if (priceChange !== 0) {
            const changePercent = ((priceChange / oldData.adjustedPrice) * 100).toFixed(1);
            const direction = priceChange > 0 ? "📈 INCREASED" : "📉 DECREASED";

            Chat.log(`\n${direction}: ${tradeKey}`);
            Chat.log(`  Price change: ${priceChange > 0 ? '+' : ''}${priceChange} items (${changePercent}%)`);
            Chat.log(`  Old price: ${oldData.adjustedPrice}, New price: ${newData.adjustedPrice}`);

            // Analyze the cause of price change
            this.analyzePriceChange(oldData, newData);
        }

        // Check for usage changes
        const usageChange = newData.uses - oldData.uses;
        if (usageChange > 0) {
            Chat.log(`🔄 Trade usage increased: +${usageChange} uses`);
        }

        // Check availability changes
        if (oldData.available !== newData.available) {
            const availability = newData.available ? "✅ AVAILABLE" : "❌ UNAVAILABLE";
            Chat.log(`🔄 Status changed: ${availability}`);
        }
    }

    analyzePriceChange(oldData, newData) {
        const demandChange = newData.demandBonus - oldData.demandBonus;
        const specialPriceChange = newData.specialPrice - oldData.specialPrice;

        if (demandChange > 0) {
            Chat.log(`  🔥 Demand increased: +${demandChange}`);
        } else if (demandChange < 0) {
            Chat.log(`  ❄️ Demand decreased: ${demandChange}`);
        }

        if (specialPriceChange !== 0) {
            const changeType = specialPriceChange < 0 ? "discount improved" : "discount worsened";
            Chat.log(`  👥 Reputation ${changeType}: ${specialPriceChange}`);
        }

        // Provide recommendations
        if (newData.adjustedPrice < oldData.adjustedPrice) {
            Chat.log(`  💰 Good opportunity! Price decreased - consider trading now`);
        } else {
            Chat.log(`  ⚠️ Price increased - you may want to wait or find alternatives`);
        }
    }

    getPriceHistory(tradeKey) {
        return this.priceHistory.get(tradeKey);
    }

    exportPriceData() {
        const data = {};
        for (const [tradeKey, tradeData] of this.priceHistory.entries()) {
            data[tradeKey] = tradeData;
        }
        return data;
    }
}

// Usage example
const monitor = new TradePriceMonitor();

// Find a merchant and start monitoring
const entities = World.getEntities(10);
for (const entity of entities) {
    if (entity.getName().includes("Villager")) {
        Chat.log(`Found merchant: ${entity.getName()}`);
        monitor.startMonitoring(entity, 20000); // Monitor every 20 seconds
        break;
    }
}

// Stop monitoring after 5 minutes
setTimeout(() => {
    monitor.stopMonitoring();
    Chat.log("Price monitoring session completed");

    // Export data for analysis
    const priceData = monitor.exportPriceData();
    Chat.log(`Collected price data for ${Object.keys(priceData).length} trades`);
}, 300000);
```

### Example 3: Automated Trade Selection

```javascript
class TradeSelector {
    constructor() {
        this.criteria = {
            prioritizeXP: false,
            prioritizeValue: true,
            maxPriceAdjustment: 10,
            minRemainingUses: 1,
            avoidHighDemand: false
        };
    }

    setCriteria(newCriteria) {
        Object.assign(this.criteria, newCriteria);
    }

    findBestTrades(trades, playerInventory = null) {
        const availableTrades = trades.filter(trade => trade.isAvailable());
        const scoredTrades = [];

        for (const trade of availableTrades) {
            const score = this.calculateTradeScore(trade, playerInventory);
            const canAfford = playerInventory ? this.canAffordTrade(trade, playerInventory) : true;

            scoredTrades.push({
                trade: trade,
                score: score,
                canAfford: canAfford,
                details: this.analyzeTradeDetails(trade)
            });
        }

        // Sort by score (highest first)
        scoredTrades.sort((a, b) => b.score - a.score);

        return scoredTrades;
    }

    calculateTradeScore(trade, playerInventory) {
        let score = 0;

        // Value score (primary factor)
        const valueScore = this.calculateValueScore(trade);
        score += valueScore * 40;

        // XP score
        if (this.criteria.prioritizeXP) {
            const xpScore = trade.getExperience() * 5;
            score += xpScore;
        }

        // Price adjustment score (prefer discounts)
        const priceAdjustment = trade.getCurrentPriceAdjustment();
        if (priceAdjustment < 0) {
            score += Math.abs(priceAdjustment) * 10; // Bonus for discounts
        } else if (priceAdjustment > this.criteria.maxPriceAdjustment) {
            score -= priceAdjustment * 5; // Penalty for high premiums
        }

        // Demand penalty
        if (this.criteria.avoidHighDemand) {
            const demand = trade.getDemandBonus();
            score -= demand * 3;
        }

        // Longevity bonus
        const remainingUses = trade.getMaxUses() - trade.getUses();
        if (remainingUses >= this.criteria.minRemainingUses) {
            score += remainingUses * 2;
        }

        // Affordability bonus
        if (playerInventory && this.canAffordTrade(trade, playerInventory)) {
            score += 25;
        }

        return Math.max(0, score);
    }

    calculateValueScore(trade) {
        const inputs = trade.getInput();
        const output = trade.getOutput();

        // Calculate input and output values
        let inputValue = 0;
        for (const input of inputs) {
            inputValue += this.getItemRarityValue(input.getName()) * input.getCount();
        }

        const outputValue = this.getItemRarityValue(output.getName()) * output.getCount();

        return inputValue > 0 ? outputValue / inputValue : 0;
    }

    getItemRarityValue(itemName) {
        const rarityMap = {
            'diamond': 10, 'diamond sword': 12, 'diamond pickaxe': 11, 'diamond armor': 9,
            'emerald': 8, 'enchanted book': 7, 'enchanted': 6,
            'gold': 5, 'gold armor': 4, 'gold tools': 4,
            'iron': 3, 'iron armor': 2.5, 'iron tools': 2.5,
            'redstone': 2, 'lapis': 2,
            'stone': 1, 'wood': 0.5, 'dirt': 0.1,
            'food': 1.5, 'bread': 1, 'apple': 1.5,
            'arrow': 0.3, 'bow': 3
        };

        const lowerName = itemName.toLowerCase();
        for (const [material, value] of Object.entries(rarityMap)) {
            if (lowerName.includes(material)) {
                return value;
            }
        }

        return 1; // Default value
    }

    canAffordTrade(trade, playerInventory) {
        const inputs = trade.getInput();

        for (const input of inputs) {
            const itemName = input.getName();
            const requiredCount = input.getCount();

            let playerCount = 0;
            for (let i = 0; i < playerInventory.getSlotCount(); i++) {
                const slot = playerInventory.getSlot(i);
                if (!slot.isEmpty() && slot.getName() === itemName) {
                    playerCount += slot.getCount();
                }
            }

            if (playerCount < requiredCount) {
                return false;
            }
        }

        return true;
    }

    analyzeTradeDetails(trade) {
        const inputs = trade.getInput();
        const output = trade.getOutput();

        return {
            inputItems: inputs.map(item => ({
                name: item.getName(),
                count: item.getCount(),
                value: this.getItemRarityValue(item.getName())
            })),
            outputItem: {
                name: output.getName(),
                count: output.getCount(),
                value: this.getItemRarityValue(output.getName())
            },
            pricing: {
                original: trade.getOriginalPrice(),
                adjusted: trade.getAdjustedPrice(),
                adjustment: trade.getCurrentPriceAdjustment(),
                demand: trade.getDemandBonus(),
                special: trade.getSpecialPrice()
            },
            usage: {
                current: trade.getUses(),
                max: trade.getMaxUses(),
                remaining: trade.getMaxUses() - trade.getUses()
            },
            rewards: {
                xp: trade.getExperience(),
                givesXP: trade.shouldRewardPlayerExperience()
            }
        };
    }

    selectAndExecuteBestTrade(trades, playerInventory) {
        const scoredTrades = this.findBestTrades(trades, playerInventory);

        if (scoredTrades.length === 0) {
            Chat.log("No suitable trades found");
            return null;
        }

        const bestTrade = scoredTrades[0];

        if (!bestTrade.canAfford) {
            Chat.log(`Best trade not affordable: ${bestTrade.trade.getInput()[0].getName()}`);
            return null;
        }

        Chat.log(`\n🎯 Selected best trade (Score: ${bestTrade.score.toFixed(1)}):`);
        const inputs = bestTrade.trade.getInput();
        const output = bestTrade.trade.getOutput();

        Chat.log(`Trade: ${inputs.map(i => `${i.getCount()}x${i.getName()}`).join(" + ")} → ${output.getCount()}x${output.getName()}`);

        // Execute the trade
        try {
            const success = bestTrade.trade.select();
            if (success) {
                Chat.log("✅ Trade selected successfully");
                return bestTrade.trade;
            } else {
                Chat.log("❌ Failed to select trade");
                return null;
            }
        } catch (error) {
            Chat.log(`❌ Error selecting trade: ${error.message}`);
            return null;
        }
    }
}

// Usage example
function setupAutoTrader() {
    const selector = new TradeSelector();

    // Configure trade preferences
    selector.setCriteria({
        prioritizeXP: true,
        prioritizeValue: true,
        maxPriceAdjustment: 5,
        minRemainingUses: 2,
        avoidHighDemand: true
    });

    // Find merchant
    const entities = World.getEntities(10);
    for (const entity of entities) {
        if (entity.getName().includes("Villager")) {
            const trades = entity.getTrades();
            const playerInventory = Player.getPlayer().getInventory();

            Chat.log(`Analyzing ${trades.length} trades from ${entity.getName()}`);

            // Find and execute best trade
            const selectedTrade = selector.selectAndExecuteBestTrade(trades, playerInventory);

            if (selectedTrade) {
                Chat.log("🎉 Successfully executed best available trade!");
            } else {
                Chat.log("No trades could be executed");
            }

            // Show top 5 recommendations
            const recommendations = selector.findBestTrades(trades, playerInventory);
            Chat.log(`\n📋 Top 5 Trade Recommendations:`);

            recommendations.slice(0, 5).forEach((rec, index) => {
                const inputs = rec.trade.getInput();
                const output = rec.trade.getOutput();
                const affordable = rec.canAfford ? "✅" : "❌";

                Chat.log(`${index + 1}. ${affordable} Score: ${rec.score.toFixed(1)} - ${inputs.map(i => `${i.getCount()}x${i.getName()}`).join(" + ")} → ${output.getCount()}x${output.getName()}`);
            });

            break;
        }
    }
}

// Run the auto-trader
setupAutoTrader();
```

### Example 4: Trade Opportunity Calculator

```javascript
class TradeOpportunityCalculator {
    constructor() {
        this.marketPrices = new Map();
        this.playerInventory = null;
        this.tradeGoals = [];
    }

    setPlayerInventory(inventory) {
        this.playerInventory = inventory;
        this.updateInventoryValues();
    }

    setTradeGoals(goals) {
        // goals: array of {itemName: string, targetCount: number, priority: number}
        this.tradeGoals = goals;
    }

    updateInventoryValues() {
        this.inventoryCounts = new Map();

        for (let i = 0; i < this.playerInventory.getSlotCount(); i++) {
            const slot = this.playerInventory.getSlot(i);
            if (!slot.isEmpty()) {
                const itemName = slot.getName();
                const count = this.inventoryCounts.get(itemName) || 0;
                this.inventoryCounts.set(itemName, count + slot.getCount());
            }
        }
    }

    calculateOpportunities(trades) {
        const opportunities = [];

        for (const trade of trades) {
            if (!trade.isAvailable()) continue;

            const opportunity = this.evaluateTradeOpportunity(trade);
            if (opportunity.value > 0) {
                opportunities.push(opportunity);
            }
        }

        // Sort by opportunity value (highest first)
        opportunities.sort((a, b) => b.value - a.value);

        return opportunities;
    }

    evaluateTradeOpportunity(trade) {
        const inputs = trade.getInput();
        const output = trade.getOutput();

        // Check if player can afford this trade
        if (!this.canAffordTrade(inputs)) {
            return { value: -1, affordable: false, trade: trade };
        }

        // Calculate trade profitability
        const inputCost = this.calculateInputCost(inputs);
        const outputValue = this.calculateOutputValue(output);
        const baseProfit = outputValue - inputCost;

        // Apply modifiers
        const xpBonus = trade.getExperience() * 2;
        const demandPenalty = trade.getDemandBonus() * 3;
        const reputationBonus = trade.getSpecialPrice() < 0 ? Math.abs(trade.getSpecialPrice()) : 0;
        const longevityBonus = (trade.getMaxUses() - trade.getUses()) * 0.5;

        const totalValue = baseProfit + xpBonus - demandPenalty + reputationBonus + longevityBonus;

        // Check if trade helps achieve goals
        const goalBonus = this.calculateGoalBonus(output);

        return {
            value: totalValue + goalBonus,
            affordable: true,
            trade: trade,
            inputCost: inputCost,
            outputValue: outputValue,
            baseProfit: baseProfit,
            modifiers: {
                xp: xpBonus,
                demand: -demandPenalty,
                reputation: reputationBonus,
                longevity: longevityBonus,
                goals: goalBonus
            },
            inputs: inputs,
            output: output
        };
    }

    canAffordTrade(inputs) {
        for (const input of inputs) {
            const playerName = input.getName();
            const requiredCount = input.getCount();
            const playerCount = this.inventoryCounts.get(playerName) || 0;

            if (playerCount < requiredCount) {
                return false;
            }
        }

        return true;
    }

    calculateInputCost(inputs) {
        let totalCost = 0;

        for (const input of inputs) {
            const itemName = input.getName();
            const itemValue = this.getItemMarketValue(itemName);
            totalCost += itemValue * input.getCount();
        }

        return totalCost;
    }

    calculateOutputValue(output) {
        const itemName = output.getName();
        const itemValue = this.getItemMarketValue(itemName);
        return itemValue * output.getCount();
    }

    getItemMarketValue(itemName) {
        // Simplified market value calculation
        // In a real implementation, this could be based on actual market data
        const baseValues = {
            'emerald': 100,
            'diamond': 90,
            'gold ingot': 50,
            'iron ingot': 30,
            'enchanted book': 80,
            'diamond tools': 120,
            'iron tools': 40,
            'food': 20,
            'wood': 5,
            'stone': 8,
            'redstone': 15
        };

        const lowerName = itemName.toLowerCase();
        for (const [material, value] of Object.entries(baseValues)) {
            if (lowerName.includes(material)) {
                return value;
            }
        }

        return 10; // Default value
    }

    calculateGoalBonus(output) {
        let bonus = 0;
        const outputName = output.getName();

        for (const goal of this.tradeGoals) {
            if (outputName.includes(goal.itemName)) {
                const currentCount = this.inventoryCounts.get(outputName) || 0;
                const deficit = Math.max(0, goal.targetCount - currentCount);

                if (deficit > 0) {
                    const progressValue = Math.min(output.getCount(), deficit) * goal.priority * 5;
                    bonus += progressValue;
                }
            }
        }

        return bonus;
    }

    generateOpportunityReport(opportunities, limit = 10) {
        Chat.log(`\n=== Trade Opportunity Report ===`);
        Chat.log(`Found ${opportunities.length} viable trade opportunities`);

        if (opportunities.length === 0) {
            Chat.log("No profitable trade opportunities found");
            return;
        }

        Chat.log(`\n=== Top ${Math.min(limit, opportunities.length)} Opportunities ===`);

        opportunities.slice(0, limit).forEach((opp, index) => {
            const inputs = opp.inputs.map(i => `${i.getCount()}x${i.getName()}`).join(" + ");
            const output = `${opp.output.getCount()}x${opp.output.getName()}`;

            Chat.log(`\n${index + 1}. Opportunity Value: ${opp.value.toFixed(1)}`);
            Chat.log(`   Trade: ${inputs} → ${output}`);
            Chat.log(`   Base Profit: ${opp.baseProfit.toFixed(1)}`);
            Chat.log(`   Modifiers: XP(+${opp.modifiers.xp}) Demand(${opp.modifiers.demand > 0 ? '+' : ''}${opp.modifiers.demand}) Reputation(+${opp.modifiers.reputation})`);

            if (opp.modifiers.goals > 0) {
                Chat.log(`   Goal Progress Bonus: +${opp.modifiers.goals.toFixed(1)}`);
            }

            // Recommendation
            if (opp.value > 50) {
                Chat.log(`   🌟 Excellent opportunity - highly recommended!`);
            } else if (opp.value > 20) {
                Chat.log(`   ✅ Good opportunity - consider executing`);
            } else {
                Chat.log(`   📊 Minor opportunity - optional`);
            }
        });
    }
}

// Usage example
function findTradeOpportunities() {
    const calculator = new TradeOpportunityCalculator();

    // Set player inventory
    const player = Player.getPlayer();
    if (player) {
        calculator.setPlayerInventory(player.getInventory());
    }

    // Set trade goals
    calculator.setTradeGoals([
        { itemName: 'diamond', targetCount: 10, priority: 10 },
        { itemName: 'emerald', targetCount: 32, priority: 8 },
        { itemName: 'iron ingot', targetCount: 64, priority: 5 },
        { itemName: 'food', targetCount: 20, priority: 3 }
    ]);

    // Find nearby merchant
    const entities = World.getEntities(15);
    for (const entity of entities) {
        if (entity.getName().includes("Villager") || entity.getName().includes("Wandering Trader")) {
            Chat.log(`Analyzing trades with ${entity.getName()}`);

            const trades = entity.getTrades();
            const opportunities = calculator.calculateOpportunities(trades);

            calculator.generateOpportunityReport(opportunities, 8);

            // Auto-execute best opportunity if it's very good
            if (opportunities.length > 0 && opportunities[0].value > 75) {
                const bestOpp = opportunities[0];
                Chat.log(`\n🎯 Auto-executing excellent opportunity:`);
                Chat.log(`Trade: ${bestOpp.inputs.map(i => `${i.getCount()}x${i.getName()}`).join(" + ")} → ${bestOpp.output.getCount()}x${bestOpp.output.getName()}`);

                try {
                    bestOpp.trade.select();
                    Chat.log("✅ Trade executed successfully!");
                } catch (error) {
                    Chat.log(`❌ Failed to execute trade: ${error.message}`);
                }
            }

            break;
        }
    }

    if (entities.length === 0) {
        Chat.log("No merchants found nearby for opportunity analysis");
    }
}

// Run the opportunity calculator
findTradeOpportunities();
```

### Example 5: Merchant Reputation Tracker

```javascript
class MerchantReputationTracker {
    constructor() {
        this.merchantData = new Map();
        this.reputationHistory = new Map();
        this.tradingSessions = new Map();
    }

    trackMerchant(merchantHelper) {
        const merchantId = this.getMerchantId(merchantHelper);
        const trades = merchantHelper.getTrades();
        const experience = merchantHelper.getExperience();

        const currentData = {
            timestamp: Date.now(),
            experience: experience,
            hasCustomer: merchantHelper.hasCustomer(),
            totalTrades: trades.length,
            availableTrades: trades.filter(t => t.isAvailable()).length,
            trades: this.analyzeAllTrades(trades)
        };

        const previousData = this.merchantData.get(merchantId);

        if (previousData) {
            this.compareMerchantData(merchantId, previousData, currentData);
        }

        this.merchantData.set(merchantId, currentData);
        return currentData;
    }

    getMerchantId(merchantHelper) {
        const pos = merchantHelper.getPos();
        const name = merchantHelper.getName();
        return `${name}_${Math.floor(pos.x)}_${Math.floor(pos.y)}_${Math.floor(pos.z)}`;
    }

    analyzeAllTrades(trades) {
        const tradeAnalysis = [];

        for (const trade of trades) {
            tradeAnalysis.push({
                index: trade.getIndex(),
                available: trade.isAvailable(),
                uses: trade.getUses(),
                maxUses: trade.getMaxUses(),
                experience: trade.getExperience(),
                originalPrice: trade.getOriginalPrice(),
                adjustedPrice: trade.getAdjustedPrice(),
                priceAdjustment: trade.getCurrentPriceAdjustment(),
                specialPrice: trade.getSpecialPrice(),
                demandBonus: trade.getDemandBonus(),
                priceMultiplier: trade.getPriceMultiplier(),
                inputs: trade.getInput().map(i => ({
                    name: i.getName(),
                    count: i.getCount()
                })),
                output: {
                    name: trade.getOutput().getName(),
                    count: trade.getOutput().getCount()
                }
            });
        }

        return tradeAnalysis;
    }

    compareMerchantData(merchantId, oldData, newData) {
        const changes = [];

        // Experience changes
        const expChange = newData.experience - oldData.experience;
        if (expChange > 0) {
            changes.push({
                type: 'experience',
                value: expChange,
                description: `Gained ${expChange} experience points`
            });
        }

        // Trade availability changes
        const availabilityChange = newData.availableTrades - oldData.availableTrades;
        if (availabilityChange !== 0) {
            changes.push({
                type: 'availability',
                value: availabilityChange,
                description: `${availabilityChange > 0 ? 'Gained' : 'Lost'} ${Math.abs(availabilityChange)} available trades`
            });
        }

        // Individual trade analysis
        for (let i = 0; i < newData.trades.length && i < oldData.trades.length; i++) {
            const newTrade = newData.trades[i];
            const oldTrade = oldData.trades[i];

            if (newTrade.index === oldTrade.index) {
                const tradeChanges = this.compareTradeData(oldTrade, newTrade);
                if (tradeChanges.length > 0) {
                    changes.push({
                        type: 'trade',
                        tradeIndex: i,
                        changes: tradeChanges,
                        trade: newTrade
                    });
                }
            }
        }

        if (changes.length > 0) {
            this.recordReputationChange(merchantId, changes);
            this.logMerchantChanges(merchantId, changes);
        }
    }

    compareTradeData(oldTrade, newTrade) {
        const changes = [];

        // Usage changes
        const usageChange = newTrade.uses - oldTrade.uses;
        if (usageChange > 0) {
            changes.push({
                type: 'usage',
                value: usageChange,
                description: `Used ${usageChange} times`
            });
        }

        // Price changes
        const priceChange = newTrade.adjustedPrice - oldTrade.adjustedPrice;
        if (priceChange !== 0) {
            const direction = priceChange > 0 ? 'increased' : 'decreased';
            changes.push({
                type: 'price',
                value: priceChange,
                description: `Price ${direction} by ${Math.abs(priceChange)} items`
            });
        }

        // Demand changes
        const demandChange = newTrade.demandBonus - oldTrade.demandBonus;
        if (demandChange !== 0) {
            const direction = demandChange > 0 ? 'increased' : 'decreased';
            changes.push({
                type: 'demand',
                value: demandChange,
                description: `Demand ${direction} by ${Math.abs(demandChange)}`
            });
        }

        // Availability changes
        if (oldTrade.available !== newTrade.available) {
            const status = newTrade.available ? 'became available' : 'became unavailable';
            changes.push({
                type: 'availability',
                description: `Trade ${status}`
            });
        }

        return changes;
    }

    recordReputationChange(merchantId, changes) {
        if (!this.reputationHistory.has(merchantId)) {
            this.reputationHistory.set(merchantId, []);
        }

        const history = this.reputationHistory.get(merchantId);
        history.push({
            timestamp: Date.now(),
            changes: changes
        });

        // Keep only last 50 entries
        if (history.length > 50) {
            history.shift();
        }
    }

    logMerchantChanges(merchantId, changes) {
        Chat.log(`\n🔄 Merchant Activity Detected: ${merchantId}`);

        for (const change of changes) {
            switch (change.type) {
                case 'experience':
                    Chat.log(`  ⭐ ${change.description}`);
                    break;

                case 'availability':
                    Chat.log(`  📊 ${change.description}`);
                    break;

                case 'trade':
                    const trade = change.trade;
                    Chat.log(`  💱 Trade #${trade.index} changes:`);

                    for (const tradeChange of change.changes) {
                        Chat.log(`    ${tradeChange.description}`);
                    }

                    // Additional trade context
                    const inputs = trade.inputs.map(i => `${i.count}x${i.name}`).join(" + ");
                    const output = `${trade.output.count}x${trade.output.name}`;
                    Chat.log(`    Trade: ${inputs} → ${output}`);

                    break;
            }
        }
    }

    generateReputationReport(merchantId) {
        const data = this.merchantData.get(merchantId);
        const history = this.reputationHistory.get(merchantId) || [];

        if (!data) {
            Chat.log(`No data available for merchant: ${merchantId}`);
            return;
        }

        Chat.log(`\n=== Merchant Reputation Report: ${merchantId} ===`);
        Chat.log(`Experience Level: ${data.experience}`);
        Chat.log(`Trade Availability: ${data.availableTrades}/${data.totalTrades}`);

        // Calculate reputation metrics
        const reputationMetrics = this.calculateReputationMetrics(data.trades);
        Chat.log(`\n=== Reputation Analysis ===`);
        Chat.log(`Average Price Adjustment: ${reputationMetrics.avgPriceAdjustment.toFixed(2)}`);
        Chat.log(`Total Discounts: ${reputationMetrics.totalDiscounts}`);
        Chat.log(`Total Premiums: ${reputationMetrics.totalPremiums}`);
        Chat.log(`Average Demand Bonus: ${reputationMetrics.avgDemand.toFixed(2)}`);

        // Reputation level
        const reputationLevel = this.determineReputationLevel(reputationMetrics);
        Chat.log(`Overall Reputation: ${reputationLevel.level}`);
        Chat.log(`${reputationLevel.description}`);

        // Recent activity
        if (history.length > 0) {
            Chat.log(`\n=== Recent Activity (Last ${Math.min(5, history.length)} events) ===`);
            history.slice(-5).reverse().forEach(event => {
                const timeAgo = Math.floor((Date.now() - event.timestamp) / 1000 / 60);
                Chat.log(`  ${timeAgo} minutes ago:`);

                event.changes.forEach(change => {
                    if (change.type === 'trade') {
                        Chat.log(`    Trade #${change.trade.index}: ${change.changes.map(c => c.description).join(', ')}`);
                    } else {
                        Chat.log(`    ${change.description}`);
                    }
                });
            });
        }

        // Recommendations
        this.generateReputationRecommendations(reputationMetrics, data);
    }

    calculateReputationMetrics(trades) {
        let totalPriceAdjustment = 0;
        let totalDiscounts = 0;
        let totalPremiums = 0;
        let totalDemand = 0;
        let validTrades = 0;

        for (const trade of trades) {
            if (trade.available) {
                totalPriceAdjustment += trade.priceAdjustment;
                totalDemand += trade.demandBonus;
                validTrades++;

                if (trade.priceAdjustment < 0) {
                    totalDiscounts += Math.abs(trade.priceAdjustment);
                } else if (trade.priceAdjustment > 0) {
                    totalPremiums += trade.priceAdjustment;
                }
            }
        }

        return {
            avgPriceAdjustment: validTrades > 0 ? totalPriceAdjustment / validTrades : 0,
            totalDiscounts: totalDiscounts,
            totalPremiums: totalPremiums,
            avgDemand: validTrades > 0 ? totalDemand / validTrades : 0,
            validTrades: validTrades
        };
    }

    determineReputationLevel(metrics) {
        const discountRatio = metrics.totalDiscounts / (metrics.totalPremiums + metrics.totalDiscounts + 1);

        if (discountRatio > 0.7) {
            return {
                level: "Excellent",
                description: "Outstanding reputation with significant discounts"
            };
        } else if (discountRatio > 0.5) {
            return {
                level: "Good",
                description: "Positive relationship with moderate discounts"
            };
        } else if (discountRatio > 0.3) {
            return {
                level: "Average",
                description: "Neutral relationship with fair pricing"
            };
        } else if (discountRatio > 0.1) {
            return {
                level: "Below Average",
                description: "Poor relationship with slight price premiums"
            };
        } else {
            return {
                level: "Poor",
                description: "Very poor relationship with significant price penalties"
            };
        }
    }

    generateReputationRecommendations(metrics, data) {
        Chat.log(`\n=== Trading Recommendations ===`);

        if (metrics.avgPriceAdjustment < -2) {
            Chat.log(`🌟 Excellent discounts available! Take advantage of current pricing.`);
            Chat.log(`💡 Focus on high-value trades while prices are favorable.`);
        } else if (metrics.avgPriceAdjustment < 0) {
            Chat.log(`✅ Good discounts available. Consider regular trading.`);
        } else if (metrics.avgPriceAdjustment > 3) {
            Chat.log(`⚠️ High prices detected. Consider waiting for better rates.`);
            Chat.log(`💡 Trading may improve your reputation over time.`);
        }

        if (metrics.avgDemand > 5) {
            Chat.log(`📈 High demand detected. Prices may decrease over time.`);
            Chat.log(`💡 Consider alternative merchants or wait for demand to settle.`);
        }

        if (data.experience > 50) {
            Chat.log(`🎖️ This merchant is highly experienced. Trades should be stable and reliable.`);
        } else if (data.experience < 10) {
            Chat.log(`🌱 This merchant is relatively new. Opportunity to build good relationship.`);
        }

        const availabilityRatio = data.availableTrades / data.totalTrades;
        if (availabilityRatio < 0.5) {
            Chat.log(`⏳ Limited trade availability. May need to wait for restocks.`);
        }
    }
}

// Usage example
function trackMerchantReputation() {
    const tracker = new MerchantReputationTracker();

    // Find and track a merchant
    const entities = World.getEntities(10);
    for (const entity of entities) {
        if (entity.getName().includes("Villager")) {
            const merchantId = tracker.getMerchantId(entity);
            Chat.log(`Starting reputation tracking for: ${merchantId}`);

            // Initial tracking
            tracker.trackMerchant(entity);

            // Generate initial report
            tracker.generateReputationReport(merchantId);

            // Continue tracking every 30 seconds
            const trackingInterval = setInterval(() => {
                try {
                    tracker.trackMerchant(entity);
                } catch (error) {
                    Chat.log(`Error tracking merchant: ${error.message}`);
                    clearInterval(trackingInterval);
                }
            }, 30000);

            // Generate detailed report every 2 minutes
            const reportInterval = setInterval(() => {
                try {
                    tracker.generateReputationReport(merchantId);
                } catch (error) {
                    Chat.log(`Error generating report: ${error.message}`);
                }
            }, 120000);

            // Stop tracking after 10 minutes
            setTimeout(() => {
                clearInterval(trackingInterval);
                clearInterval(reportInterval);
                Chat.log("Reputation tracking completed");

                // Final comprehensive report
                tracker.generateReputationReport(merchantId);
            }, 600000);

            break;
        }
    }

    if (entities.length === 0) {
        Chat.log("No merchants found for reputation tracking");
    }
}

// Start reputation tracking
trackMerchantReputation();
```

## Important Notes

### Data Availability and Reliability

- **Server Dependency:** Trade data availability depends on what information the server sends to clients. These methods work most reliably in singleplayer environments.
- **Real-time Updates:** Trade prices and availability update in real-time as other players interact with merchants.
- **Demand Calculations:** Demand bonuses are only updated when merchants restock, not after every trade.

### Economic Mechanics

- **Dynamic Pricing:** Trade prices change based on:
  - Player reputation with the merchant
  - Current demand for the trade
  - Hero of the Village status
  - Special price multipliers based on trade type

- **Demand System:** High trading frequency increases demand, causing prices to rise. Demand is calculated as: `demand = demand + 2 * uses - maxUses`

- **Experience Rewards:** Merchants gain experience from trades, which can affect future pricing and available trades.

### Performance Considerations

- **Frequent Updates:** Monitoring price changes too frequently may impact performance.
- **Large Trade Lists:** High-level merchants with many trades require more processing time.
- **Memory Usage:** Storing extensive trade history can consume significant memory over time.

### Multiplayer Considerations

- **Competition:** Other players trading with the same merchant can affect prices and availability.
- **Server Rules:** Custom servers may have modified trade mechanics or restrictions.
- **Data Synchronization:** Trade data may not always be perfectly synchronized across all clients.

## Related Classes

- `BaseHelper` - Parent class providing basic wrapper functionality
- `MerchantEntityHelper` - Used to get lists of TradeOfferHelper objects
- `ItemStackHelper` - Represents trade input and output items
- `VillagerInventory` - Container for villager trading interface
- `NBTElementHelper` - For accessing raw trade NBT data

## Common Use Cases

- **Automated Trading:** Scripts that automatically execute profitable trades
- **Price Monitoring:** Tools that track merchant prices and identify good deals
- **Reputation Management:** Systems for tracking and improving merchant relationships
- **Economic Analysis:** Tools for analyzing village economies and market dynamics
- **Trade Optimization:** Algorithms that find the best trading opportunities based on player inventory and goals
- **Market Prediction:** Systems that predict future price changes based on demand patterns