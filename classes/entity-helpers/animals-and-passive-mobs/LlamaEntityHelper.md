# LlamaEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.LlamaEntityHelper`

**Extends:** `DonkeyEntityHelper<LlamaEntity>`

The `LlamaEntityHelper` class provides specialized functionality for interacting with llama entities in Minecraft. This helper offers access to llama-specific properties including variant information, carpet decoration color, strength values, and trader status. It extends `DonkeyEntityHelper` and inherits comprehensive methods for managing llama ownership, breeding, equipment, and inventory capabilities.

Llamas are tamable passive mobs that can be used as pack animals for transporting items. They come in different color variants, have varying strength levels that determine their carrying capacity, can be equipped with decorative carpets, and will spit at hostile mobs. Some llamas belong to wandering traders as special "trader llamas" that can form caravans.

This class is typically obtained through entity events, world queries, or by casting from `EntityHelper` using the `asAnimal()` method when dealing with llama entities.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

LlamaEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityInteract`, `EntitySpawn`, `EntityTame`)
- World entity queries and filtering for llama entities
- Type casting from `EntityHelper` using `asAnimal()` when appropriate
- Methods that return llama entities from other helpers

---

## Methods

### Llama Properties

- [llama.getVariant()](#llamagetvariant)
- [llama.getCarpetColor()](#llamagetcarpetcolor)
- [llama.getStrength()](#llamagetstrength)
- [llama.isTraderLlama()](#llamaistraderllama)

---

## Llama Properties

### llama.getVariant()

**Returns:** `String` - The variant name of this llama (e.g., "creamy", "white", "brown", "gray")

**Description:** Gets the color variant of the llama, which determines its wool color appearance. There are four llama variants that spawn naturally in Minecraft.

**Example:**
```js
// Check llama variant
function analyzeLlamaVariant(llama) {
    const variant = llama.getVariant();
    const entity = llama.getEntity();
    const pos = entity.getPos();

    Chat.log(`&6Llama Analysis:`);
    Chat.log(`  Variant: ${variant}`);
    Chat.log(`  Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

    // Variant-specific information
    const variantInfo = {
        "creamy": { spawnWeight: 40, description: "Creamy colored llama" },
        "white": { spawnWeight: 15, description: "White colored llama" },
        "brown": { spawnWeight: 20, description: "Brown colored llama" },
        "gray": { spawnWeight: 30, description: "Gray colored llama" }
    };

    const info = variantInfo[variant];
    if (info) {
        Chat.log(`  Spawn weight: ${info.spawnWeight}%`);
        Chat.log(`  Description: ${info.description}`);
    }

    return variant;
}

// Find and analyze all nearby llamas
function scanLlamas() {
    const entities = World.getEntities();
    const llamas = entities.filter(entity => entity.is("minecraft:llama"));

    if (llamas.length === 0) {
        Chat.log("&7No llamas found nearby");
        return;
    }

    Chat.log(`&aFound ${llamas.length} llama${llamas.length > 1 ? 's' : ''}:`);
    llamas.forEach(entity => {
        const llama = entity.asAnimal();
        if (llama) {
            analyzeLlamaVariant(llama);
        }
    });
}

scanLlamas();
```

### llama.getCarpetColor()

**Returns:** [`DyeColorHelper`](DyeColorHelper.md) - The color of the llama's carpet decoration, or null if no carpet

**Description:** Gets the carpet color equipped on the llama. Llamas can be equipped with any color carpet as decoration, which visually appears as a colorful blanket on their back. This returns a DyeColorHelper that provides access to color properties and variations.

**Example:**
```js
// Check llama carpet decoration
function analyzeLlamaCarpet(llama) {
    const carpetColor = llama.getCarpetColor();
    const entity = llama.getEntity();

    if (carpetColor) {
        const colorName = carpetColor.getName();
        const colorId = carpetColor.getId();
        const rgb = carpetColor.getColorValue();
        const hexColor = "0x" + rgb.toString(16).padStart(6, '0');

        Chat.log(`&6Llama Carpet Information:`);
        Chat.log(`  Color: ${colorName} (ID: ${colorId})`);
        Chat.log(`  RGB: ${hexColor}`);

        // Show color preview using chat formatting
        const colorCode = "&" + Integer.toHexString(colorId).charAt(0);
        Chat.log(colorCode + "Color preview: " + colorName.toUpperCase());

        return { color: colorName, id: colorId, rgb: rgb };
    } else {
        Chat.log("&7This llama has no carpet decoration");
        return null;
    }
}

// Find llamas with rare carpet colors
function findDecoratedLlamas() {
    const entities = World.getEntities();
    const llamas = entities.filter(entity => entity.is("minecraft:llama"));
    const decoratedLlamas = [];

    llamas.forEach(entity => {
        const llama = entity.asAnimal();
        if (llama && llama.getCarpetColor()) {
            const carpetInfo = analyzeLlamaCarpet(llama);
            const distance = Player.getPlayer().distanceTo(entity);

            decoratedLlamas.push({
                entity: entity,
                llama: llama,
                carpet: carpetInfo,
                distance: distance
            });
        }
    });

    if (decoratedLlamas.length > 0) {
        Chat.log(`&aFound ${decoratedLlamas.length} decorated llama${decoratedLlamas.length > 1 ? 's' : ''}:`);
        decoratedLlamas.forEach(data => {
            Chat.log(`  ${data.carpet.color} llama - ${data.distance.toFixed(1)}m away`);
        });
    } else {
        Chat.log("&7No decorated llamas found nearby");
    }

    return decoratedLlamas;
}

findDecoratedLlamas();
```

### llama.getStrength()

**Returns:** `int` - The strength value of this llama (1-5)

**Description:** Gets the strength level of the llama, which determines its inventory capacity. Strength levels range from 1 to 5, with higher values allowing the llama to carry more items. The strength value is determined when the llama spawns and cannot be changed.

- Strength 1: 3 inventory slots
- Strength 2: 6 inventory slots
- Strength 3: 9 inventory slots
- Strength 4: 12 inventory slots
- Strength 5: 15 inventory slots

**Example:**
```js
// Analyze llama strength and capacity
function analyzeLlamaStrength(llama) {
    const strength = llama.getStrength();
    const entity = llama.getEntity();
    const pos = entity.getPos();

    // Calculate inventory slots based on strength
    const inventorySlots = strength * 3;

    Chat.log(`&6Llama Strength Analysis:`);
    Chat.log(`  Strength level: ${strength}/5`);
    Chat.log(`  Inventory slots: ${inventorySlots}`);
    Chat.log(`  Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

    // Quality assessment
    let quality = "Poor";
    if (strength === 5) quality = "Excellent";
    else if (strength === 4) quality = "Very Good";
    else if (strength === 3) quality = "Good";
    else if (strength === 2) quality = "Average";

    Chat.log(`  Quality: ${quality}`);

    return {
        strength: strength,
        slots: inventorySlots,
        quality: quality,
        entity: entity
    };
}

// Find the strongest llamas in the area
function findStrongestLlamas() {
    const entities = World.getEntities();
    const llamas = entities.filter(entity => entity.is("minecraft:llama"));
    const llamaData = [];

    llamas.forEach(entity => {
        const llama = entity.asAnimal();
        if (llama) {
            const analysis = analyzeLlamaStrength(llama);
            const distance = Player.getPlayer().distanceTo(entity);

            llamaData.push({
                ...analysis,
                distance: distance
            });
        }
    });

    // Sort by strength (highest first), then by distance
    llamaData.sort((a, b) => {
        if (b.strength !== a.strength) {
            return b.strength - a.strength;
        }
        return a.distance - b.distance;
    });

    Chat.log("\n&e=== Strongest Llamas ===");
    llamaData.slice(0, 5).forEach((data, index) => {
        Chat.log(`${index + 1}. Strength ${data.strength} (${data.slots} slots) - ${data.quality}`);
        Chat.log(`   Distance: ${data.distance.toFixed(1)}m, Quality: ${data.quality}`);
    });

    return llamaData;
}

findStrongestLlamas();
```

### llama.isTraderLlama()

**Returns:** `boolean` - `true` if this llama belongs to a wandering trader, `false` otherwise

**Description:** Checks if the llama is a trader llama, which are special llamas that accompany wandering traders. Trader llamas have different behavior from regular llamas and cannot be tamed by players. They will despawn with the wandering trader and cannot be used as permanent pack animals.

**Example:**
```js
// Distinguish between regular and trader llamas
function analyzeLlamaType(llama) {
    const isTrader = llama.isTraderLlama();
    const entity = llama.getEntity();
    const variant = llama.getVariant();
    const strength = llama.getStrength();

    Chat.log(`&6Llama Type Analysis:`);
    Chat.log(`  Type: ${isTrader ? "Trader Llama" : "Regular Llama"}`);
    Chat.log(`  Variant: ${variant}`);
    Chat.log(`  Strength: ${strength}/5`);

    if (isTrader) {
        Chat.log(`  Note: This llama belongs to a wandering trader`);
        Chat.log(`  Cannot be tamed or used as permanent storage`);
        Chat.log(`  Will despawn with the wandering trader`);

        // Check if near a wandering trader
        const entities = World.getEntities();
        const trader = entities.find(entity => entity.is("minecraft:wandering_trader"));
        if (trader) {
            const distance = entity.distanceTo(trader);
            Chat.log(`  Distance to trader: ${distance.toFixed(1)}m`);
        }
    } else {
        Chat.log(`  Note: This is a regular llama`);
        Chat.log(`  Can be tamed and used for storage`);
        Chat.log(`  Can form caravans with other llamas`);
    }

    return { isTrader: isTrader, variant: variant, strength: strength };
}

// Scan area and categorize all llamas
function categorizeLlamas() {
    const entities = World.getEntities();
    const llamas = entities.filter(entity => entity.is("minecraft:llama"));

    if (llamas.length === 0) {
        Chat.log("&7No llamas found nearby");
        return;
    }

    const regularLlamas = [];
    const traderLlamas = [];

    llamas.forEach(entity => {
        const llama = entity.asAnimal();
        if (llama) {
            const analysis = analyzeLlamaType(llama);
            const distance = Player.getPlayer().distanceTo(entity);

            if (analysis.isTrader) {
                traderLlamas.push({ ...analysis, distance: distance });
            } else {
                regularLlamas.push({ ...analysis, distance: distance });
            }
        }
    });

    Chat.log(`\n&e=== Llama Census ===`);
    Chat.log(`Regular llamas: ${regularLlamas.length}`);
    Chat.log(`Trader llamas: ${traderLlamas.length}`);

    if (regularLlamas.length > 0) {
        Chat.log("\n&aRegular Llamas:");
        regularLlamas.slice(0, 3).forEach(data => {
            Chat.log(`  ${data.variant} (Strength ${data.strength}) - ${data.distance.toFixed(1)}m`);
        });
    }

    if (traderLlamas.length > 0) {
        Chat.log("\n&6Trader Llamas:");
        traderLlamas.forEach(data => {
            Chat.log(`  ${data.variant} (Strength ${data.strength}) - ${data.distance.toFixed(1)}m`);
        });

        Chat.log("\n&eWarning: Trader llamas cannot be tamed and will despawn!");
    }
}

categorizeLlamas();
```

---

## Usage Examples

### Comprehensive Llama Management System
```js
// Advanced llama tracking and management system
class LlamaManager {
    constructor() {
        this.trackedLlamas = new Map();
        this.myLlamas = new Set();
        this.scanRadius = 64;
        this.lastScan = 0;
        this.scanInterval = 20 * 5; // Every 5 seconds
    }

    scanLlamas() {
        const entities = World.getEntities(this.scanRadius);
        const llamas = entities.filter(entity => entity.is("minecraft:llama"));
        const player = Player.getPlayer();

        if (!player) return;

        llamas.forEach(entity => {
            const uuid = entity.getUUID();
            const llama = entity.asAnimal();
            if (!llama) return;

            const existingData = this.trackedLlamas.get(uuid);

            if (!existingData) {
                // New llama discovered
                const data = {
                    entity: entity,
                    llama: llama,
                    uuid: uuid,
                    firstSeen: Client.getTime(),
                    lastSeen: Client.getTime(),
                    name: this.generateLlamaName(llama),
                    analysis: this.analyzeLlama(llama)
                };

                this.trackedLlamas.set(uuid, data);

                const type = data.analysis.isTrader ? "&6Trader Llama" : "&aRegular Llama";
                Chat.log(`${type} &7discovered: ${data.name}`);
            } else {
                // Update existing llama data
                existingData.lastSeen = Client.getTime();
                existingData.analysis = this.analyzeLlama(llama);
            }
        });

        // Clean up llamas that are no longer in range
        for (const [uuid, data] of this.trackedLlamas) {
            if (!data.entity.isAlive() || (Client.getTime() - data.lastSeen > 60000)) {
                Chat.log(`&cLlama ${data.name} has been removed`);
                this.trackedLlamas.delete(uuid);
                this.myLlamas.delete(uuid);
            }
        }
    }

    generateLlamaName(llama) {
        const variant = llama.getVariant();
        const strength = llama.getStrength();
        const isTrader = llama.isTraderLlama();

        const variantNames = {
            "creamy": "Creamy",
            "white": "Snow",
            "brown": "Cocoa",
            "gray": "Storm"
        };

        const baseName = variantNames[variant] || "Mystery";
        const strengthName = strength === 5 ? "Mighty" : strength === 4 ? "Strong" : strength >= 3 ? "Sturdy" : "Gentle";
        const traderName = isTrader ? " Wanderer" : "";

        return `${baseName}${strengthName}${traderName}`;
    }

    analyzeLlama(llama) {
        return {
            variant: llama.getVariant(),
            strength: llama.getStrength(),
            slots: llama.getStrength() * 3,
            isTrader: llama.isTraderLlama(),
            hasCarpet: llama.getCarpetColor() !== null,
            carpetColor: llama.getCarpetColor()?.getName() || null,
            isTame: llama.isTame(),
            hasChest: llama.hasChest(),
            health: llama.getEntity().asLiving()?.getHealth() || null
        };
    }

    claimLlama(entity) {
        const uuid = entity.getUUID();
        const llama = entity.asAnimal();
        if (!llama) return false;

        const analysis = this.analyzeLlama(llama);
        const data = this.trackedLlamas.get(uuid);

        if (!data) return false;

        if (analysis.isTrader) {
            Chat.log("&cCannot claim trader llamas!");
            return false;
        }

        if (!analysis.isTame) {
            Chat.log("&cThis llama is not tamed yet!");
            return false;
        }

        this.myLlamas.add(uuid);
        Chat.log(`&aClaimed llama: ${data.name}`);
        Chat.log(`  Strength: ${analysis.strength}/5 (${analysis.slots} slots)`);
        Chat.log(`  Variant: ${analysis.variant}`);

        return true;
    }

    findBestLlamas() {
        const llamas = Array.from(this.trackedLlamas.values())
            .filter(data => !data.analysis.isTrader && data.analysis.isTame);

        return llamas
            .sort((a, b) => {
                // Sort by strength first, then by slots
                if (b.analysis.strength !== a.analysis.strength) {
                    return b.analysis.strength - a.analysis.strength;
                }
                return b.analysis.slots - a.analysis.slots;
            })
            .slice(0, 5);
    }

    generateReport() {
        Chat.log("=== Llama Management Report ===");

        const totalLlamas = this.trackedLlamas.size;
        const regularLlamas = Array.from(this.trackedLlamas.values())
            .filter(data => !data.analysis.isTrader).length;
        const traderLlamas = totalLlamas - regularLlamas;
        const ownedLlamas = this.myLlamas.size;

        Chat.log(`&6Total Llamas: ${totalLlamas}`);
        Chat.log(`  Regular: ${regularLlamas}`);
        Chat.log(`  Trader: ${traderLlamas}`);
        Chat.log(`  Owned: ${ownedLlamas}`);

        // Strength distribution
        const strengthCounts = new Array(6).fill(0);
        for (const data of this.trackedLlamas.values()) {
            strengthCounts[data.analysis.strength]++;
        }

        Chat.log("\n&eStrength Distribution:");
        for (let i = 1; i <= 5; i++) {
            Chat.log(`  Strength ${i}: ${strengthCounts[i]} llamas`);
        }

        // Best llamas
        const bestLlamas = this.findBestLlamas();
        if (bestLlamas.length > 0) {
            Chat.log("\n&aBest Llamas (non-trader, tamed):");
            bestLlamas.forEach((data, index) => {
                const owner = this.myLlamas.has(data.uuid) ? " (Owned)" : "";
                Chat.log(`  ${index + 1}. ${data.name}${owner}`);
                Chat.log(`     Strength ${data.analysis.strength}/5, ${data.analysis.slots} slots`);
            });
        }
    }

    update() {
        if (Client.getTime() - this.lastScan >= this.scanInterval) {
            this.scanLlamas();
            this.lastScan = Client.getTime();
        }
    }
}

// Initialize llama manager
const llamaManager = new LlamaManager();

// Update system periodically
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    llamaManager.update();
}));

// Commands
Chat.createCommandBuilder("llamas")
    .executes(JavaWrapper.methodToJava((ctx) => {
        llamaManager.generateReport();
    }))
    .register();

Chat.createCommandBuilder("claimllama")
    .executes(JavaWrapper.methodToJava((ctx) => {
        const player = Player.getPlayer();
        const lookingAt = player.rayTraceEntity(10);

        if (lookingAt && lookingAt.is("minecraft:llama")) {
            llamaManager.claimLlama(lookingAt);
        } else {
            Chat.log("&cYou must be looking at a llama to claim it");
        }
    }))
    .register();

Chat.log("&aLlama Management System activated!");
Chat.log("&7Use /llamas for report, /claimllama to claim nearest llama");
```

### Llama Caravan Formation Analysis
```js
// Analyze llama caravan potential and behavior
function analyzeLlamaCaravans() {
    const entities = World.getEntities();
    const llamas = entities.filter(entity => entity.is("minecraft:llama"));
    const players = entities.filter(entity => entity.is("minecraft:player"));

    if (llamas.length < 2) {
        Chat.log("&7Need at least 2 llamas to form caravans");
        return;
    }

    Chat.log("=== Llama Caravan Analysis ===");

    // Find potential caravan groups
    const caravanGroups = [];
    const processedLlamas = new Set();

    llamas.forEach(llamaEntity => {
        if (processedLlamas.has(llamaEntity.getUUID())) return;

        const llama = llamaEntity.asAnimal();
        if (!llama || llama.isTraderLlama()) return; // Skip trader llamas

        const group = [llamaEntity];
        processedLlamas.add(llamaEntity.getUUID());

        // Find nearby llamas for potential caravan
        llamas.forEach(otherLlamaEntity => {
            if (processedLlamas.has(otherLlamaEntity.getUUID())) return;

            const distance = llamaEntity.distanceTo(otherLlamaEntity);
            if (distance <= 16) { // Within caravan formation range
                const otherLlama = otherLlamaEntity.asAnimal();
                if (otherLlama && !otherLlama.isTraderLlama()) {
                    group.push(otherLlamaEntity);
                    processedLlamas.add(otherLlamaEntity.getUUID());
                }
            }
        });

        if (group.length >= 2) {
            caravanGroups.push(group);
        }
    });

    Chat.log(`Found ${caravanGroups.length} potential caravan group${caravanGroups.length !== 1 ? 's' : ''}:`);

    caravanGroups.forEach((group, index) => {
        Chat.log(`\n&aCaravan Group ${index + 1} (${group.length} llamas):`);

        let totalStrength = 0;
        let bestLlama = null;
        let bestStrength = 0;

        group.forEach(llamaEntity => {
            const llama = llamaEntity.asAnimal();
            const strength = llama.getStrength();
            const variant = llama.getVariant();
            const hasCarpet = llama.getCarpetColor() !== null;

            totalStrength += strength;

            if (strength > bestStrength) {
                bestStrength = strength;
                bestLlama = llamaEntity;
            }

            Chat.log(`  ${variant} - Strength ${strength} ${hasCarpet ? "(decorated)" : ""}`);
        });

        if (bestLlama) {
            const bestLlamaData = bestLlama.asAnimal();
            Chat.log(`  Leader: ${bestLlamaData.getVariant()} (Strength ${bestStrength})`);
            Chat.log(`  Total capacity: ${totalStrength * 3} slots`);
        }
    });

    // Check if any players are leading llamas
    players.forEach(playerEntity => {
        const leading = [];
        llamas.forEach(llamaEntity => {
            if (llamaEntity.distanceTo(playerEntity) <= 10) {
                const llama = llamaEntity.asAnimal();
                if (llama && llama.isTame()) {
                    leading.push(llamaEntity);
                }
            }
        });

        if (leading.length > 0) {
            const playerName = playerEntity.getName().getString();
            Chat.log(`\n&e${playerName} is leading ${leading.length} llama${leading.length !== 1 ? 's' : ''}`);
        }
    });
}

analyzeLlamaCaravans();
```

---

## Inherited Methods

From `DonkeyEntityHelper`:

- `hasChest()` - Check if the llama has a chest equipped for storage

From `AbstractHorseEntityHelper`:

### Ownership and Taming
- `getOwner()` - Get the UUID of the llama's owner, or null if unowned
- `isTame()` - Check if the llama is tamed
- `isAngry()` - Check if the llama is angry (will spit and not accept interaction)
- `isBred()` - Check if the llama was bred by players

### Equipment and Inventory
- `isSaddled()` - Check if the llama has a saddle equipped (for riding, though llamas can't be ridden by players directly)
- `canWearArmor()` - Check if the llama can wear equipment (carpets in llamas' case)
- `canBeSaddled()` - Check if the llama can be saddled
- `getInventorySize()` - Get the size of the llama's inventory

### Movement and Performance Stats
- `getSpeedStat()` - Get the llama's movement speed attribute value
- `getJumpStrengthStat()` - Get the llama's jump strength attribute value
- `getHealthStat()` - Get the llama's maximum health value

From `AnimalEntityHelper`:

- `isFood(item)` - Check if an item can be used to feed/breed the llama
- `canBreedWith(other)` - Check if two llamas can breed together

From `MobEntityHelper` and `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Current and maximum health
- `getStatusEffects()` - Active status effects
- `isBaby()` - Check if the llama is a baby
- `getArmor()` - Current armor value

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement direction
- `getVehicle()`, `getPassengers()` - Entity relationships
- `getUUID()` - Unique identifier

---

## Notes and Limitations

- LlamaEntityHelper only works with entities of type `minecraft:llama`. For other similar entities, use their specific helpers.
- The `getVariant()` method returns string names ("creamy", "white", "brown", "gray") corresponding to the llama's wool color.
- Llama strength values are determined at spawn and cannot be changed through normal gameplay mechanics.
- Trader llamas (`isTraderLlama() = true`) cannot be tamed by players and will despawn with their associated wandering trader.
- Llamas can only be equipped with carpets as decoration, not horse armor like regular horses.
- Llamas will spit at hostile mobs and players who attack them, dealing a small amount of damage.
- Llamas can form caravans where they follow each other automatically when led by a player.
- Unlike horses, llamas cannot be ridden by players but can be led and used as pack animals.
- Carpet decoration is purely cosmetic and does not affect the llama's functionality.
- Llamas with higher strength values have more inventory slots when equipped with chests.
- Some methods may return different results depending on whether you're the llama's owner.
- Llama inventory management requires equipping a chest and accessing the llama's GUI.

---

## Related Classes

- `DonkeyEntityHelper` - Parent class with chest functionality
- `AbstractHorseEntityHelper` - Grandparent class with horse-like functionality
- `AnimalEntityHelper` - For passive animal behaviors and breeding
- `MobEntityHelper` - Base class for all mobs with AI
- `LivingEntityHelper` - Health, movement, and combat properties
- `EntityHelper` - Base entity functionality and properties
- `DyeColorHelper` - For carpet color information and properties
- `HorseEntityHelper` - Similar rideable passive mobs
- `DonkeyEntityHelper`, `MuleEntityHelper` - Other pack animal entities

---

## Version Information

- Available since JSMacros 1.8.4
- Extends DonkeyEntityHelper with llama-specific variant and decoration support
- Part of the specialized entity helper system for comprehensive mob interaction
- Variant system matches Minecraft's llama appearance genetics system
- Strength system integrates with Minecraft's llama inventory capacity mechanics

---

**See Also:**
- [EntityHelper.asAnimal()](#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [DyeColorHelper](DyeColorHelper.md) - For carpet color information and properties
- [DonkeyEntityHelper](DonkeyEntityHelper.md) - Parent class with chest functionality