# OcelotEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.OcelotEntityHelper`

**Extends:** `AnimalEntityHelper<OcelotEntity>`

The `OcelotEntityHelper` class provides specialized access to ocelot entities in Minecraft, offering methods to monitor and interact with ocelot-specific behaviors such as trust states and feeding mechanics. This class extends `AnimalEntityHelper` and inherits all functionality for animals including breeding, food preferences, and basic animal behaviors.

This helper is particularly useful for creating scripts that manage ocelot interactions, monitor ocelot behavior patterns, track ocelot trust status for breeding or companion purposes, or coordinate with ocelots in jungle biomes.

## Constructors

OcelotEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`, `EntityBreed`)
- World entity queries using type filtering for ocelots
- Casting from generic EntityHelper instances using `entity.asOcelot()`

## Methods

### Ocelot-Specific State

- [ocelot.isTrusting()](#ocelotistrusting)

### Inherited Methods

The OcelotEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Ocelot-Specific State

### ocelot.isTrusting()

```js
// Check if an ocelot trusts the player (won't run away)
function checkOcelotTrust(entity) {
    if (entity.is("minecraft:ocelot")) {
        const ocelot = entity.asOcelot();
        const isTrusting = ocelot.isTrusting();
        const distance = Player.getPlayer().distanceTo(entity);

        Chat.log(`Ocelot trust status: ${isTrusting ? "Trusting" : "Wild"} (${distance.toFixed(1)}m away)`);

        // Visual feedback based on trust status
        if (isTrusting) {
            entity.setGlowing(true);
            entity.setGlowingColor(0x00FF00); // Green for trusting
            Chat.actionbar("&aThis ocelot trusts you!");
        } else {
            entity.setGlowing(true);
            entity.setGlowingColor(0xFFA500); // Orange for wild
            Chat.actionbar("&eThis ocelot is still wild and cautious");
        }

        return isTrusting;
    }
    return false;
}
```

**Returns:** `boolean` - `true` if this ocelot is trusting the player and won't run away, `false` otherwise.

---

## Usage Examples

### Complete Ocelot Interaction System
```js
// Comprehensive ocelot tracking, taming, and interaction management system
class OcelotInteractionManager {
    constructor() {
        this.trackedOcelots = new Map();
        this.statistics = {
            totalOcelots: 0,
            trustingOcelots: 0,
            wildOcelots: 0,
            recentlyFed: 0
        };
        this.tamingFood = ["minecraft:cod", "minecraft:salmon"];
        this.lastUpdate = 0;
        this.interactionRange = 32;
    }

    scanForOcelots() {
        const entities = World.getEntities(this.interactionRange);
        const currentOcelotUUIDs = new Set();
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:ocelot")) {
                const ocelot = entity.asOcelot();
                const uuid = entity.getUUID();
                const distance = player.distanceTo(entity);
                const isTrusting = ocelot.isTrusting();

                currentOcelotUUIDs.add(uuid);

                const ocelotData = {
                    entity: entity,
                    ocelot: ocelot,
                    uuid: uuid,
                    name: entity.getName().getString(),
                    distance: distance,
                    position: entity.getPos(),
                    isTrusting: isTrusting,
                    lastSeen: Client.getTime(),
                    health: entity.asLiving ? entity.asLiving().getHealth() : null,
                    maxHealth: entity.asLiving ? entity.asLiving().getMaxHealth() : null
                };

                // Check for status changes
                const existing = this.trackedOcelots.get(uuid);
                if (existing && existing.isTrusting !== isTrusting) {
                    const change = isTrusting ? "now trusts you!" : "has become wary again";
                    Chat.log(`&6${ocelotData.name} ${change}`);
                }

                this.trackedOcelots.set(uuid, ocelotData);
            }
        });

        // Remove ocelots that are no longer in range
        for (const [uuid, ocelotData] of this.trackedOcelots) {
            if (!currentOcelotUUIDs.has(uuid) &&
                (Client.getTime() - ocelotData.lastSeen > 30000)) { // 30 seconds
                this.trackedOcelots.delete(uuid);
            }
        }

        this.updateStatistics();
    }

    updateStatistics() {
        this.statistics.totalOcelots = this.trackedOcelots.size;
        this.statistics.trustingOcelots = 0;
        this.statistics.wildOcelots = 0;

        for (const ocelotData of this.trackedOcelots.values()) {
            if (ocelotData.isTrusting) {
                this.statistics.trustingOcelots++;
            } else {
                this.statistics.wildOcelots++;
            }
        }
    }

    highlightOcelotsByTrust() {
        const player = Player.getPlayer();
        if (!player) return;

        for (const [uuid, ocelotData] of this.trackedOcelots) {
            const { entity, ocelot, distance, isTrusting } = ocelotData;

            // Only highlight ocelots within reasonable range
            if (distance <= 20) {
                if (isTrusting) {
                    // Green glow for trusting ocelots
                    entity.setGlowing(true);
                    entity.setGlowingColor(0x00FF00);
                } else {
                    // Orange glow for wild ocelots
                    entity.setGlowing(true);
                    entity.setGlowingColor(0xFFA500);
                }
            } else {
                entity.resetGlowing();
            }
        }
    }

    checkTamingReadiness() {
        const player = Player.getPlayer();
        if (!player) return { hasFood: false, foodType: null };

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        if (mainHand && this.tamingFood.includes(mainHand.getId())) {
            return { hasFood: true, foodType: mainHand.getId(), hand: "main" };
        }

        if (offHand && this.tamingFood.includes(offHand.getId())) {
            return { hasFood: true, foodType: offHand.getId(), hand: "off" };
        }

        return { hasFood: false, foodType: null };
    }

    findTamingOpportunities() {
        const player = Player.getPlayer();
        if (!player) return [];

        const foodStatus = this.checkTamingReadiness();
        if (!foodStatus.hasFood) {
            return [];
        }

        const opportunities = [];
        for (const [uuid, ocelotData] of this.trackedOcelots) {
            if (!ocelotData.isTrusting && ocelotData.distance <= 8) {
                opportunities.push({
                    ocelot: ocelotData,
                    food: foodStatus.foodType,
                    distance: ocelotData.distance
                });
            }
        }

        return opportunities.sort((a, b) => a.distance - b.distance);
    }

    generateOcelotReport() {
        Chat.log("=== Ocelot Interaction Report ===");
        Chat.log(`Total ocelots tracked: ${this.statistics.totalOcelots}`);
        Chat.log(`Trusting ocelots: ${this.statistics.trustingOcelots}`);
        Chat.log(`Wild ocelots: ${this.statistics.wildOcelots}`);

        const foodStatus = this.checkTamingReadiness();
        Chat.log(`\nTaming food status: ${foodStatus.hasFood ?
            `&a✓ Holding ${foodStatus.foodType.replace('minecraft:', '')}` :
            '&e✗ Not holding fish'}`);

        const opportunities = this.findTamingOpportunities();
        if (opportunities.length > 0) {
            Chat.log(`\n&a=== Taming Opportunities (${opportunities.length}) ===`);
            opportunities.forEach((opp, index) => {
                Chat.log(`${index + 1}. ${opp.ocelot.name} - ${opp.distance.toFixed(1)}m away`);
                opp.ocelot.entity.setGlowing(true);
                opp.ocelot.entity.setGlowingColor(0xFF00FF); // Magenta for opportunity
            });
        }

        // Show closest ocelots
        const sortedOcelots = Array.from(this.trackedOcelots.values())
            .sort((a, b) => a.distance - b.distance);

        if (sortedOcelots.length > 0) {
            Chat.log(`\n&e=== Closest Ocelots ===`);
            sortedOcelots.slice(0, 5).forEach(ocelotData => {
                const status = ocelotData.isTrusting ? "&aTrusting" : "&eWild";
                const health = ocelotData.health ?
                    ` (${ocelotData.health.toFixed(1)}/${ocelotData.maxHealth.toFixed(1)} HP)` : "";
                Chat.log(`- ${ocelotData.name}: ${status}${health} - ${ocelotData.distance.toFixed(1)}m`);
            });
        }
    }

    update() {
        if (Client.getTime() - this.lastUpdate < 20) return; // Update every second

        this.lastUpdate = Client.getTime();
        this.scanForOcelots();
        this.highlightOcelotsByTrust();

        // Check for nearby taming opportunities
        const opportunities = this.findTamingOpportunities();
        if (opportunities.length > 0) {
            Chat.actionbar(`&a${opportunities.length} ocelot${opportunities.length > 1 ? 's' : ''} can be tamed nearby!`);
        }
    }
}

// Initialize the ocelot interaction manager
const ocelotManager = new OcelotInteractionManager();

// Update every second for real-time tracking
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    ocelotManager.update();
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        ocelotManager.generateOcelotReport();
    }
}));

Chat.log("&aOcelot Interaction Manager activated!");
Chat.log("&7Ocelots will be highlighted: Green (trusting) / Orange (wild) / Magenta (taming opportunity)");
```

### Ocelot Breeding Assistant
```js
// Ocelot breeding and trust management system
class OcelotBreedingAssistant {
    constructor() {
        this.ocelots = [];
        this.breedingPairs = [];
        this.trustingProgress = new Map();
        this.breedingFood = ["minecraft:cod", "minecraft:salmon", "minecraft:tropical_fish"];
        this.scanRadius = 24;
        this.lastScan = 0;
    }

    scanForBreedingCandidates() {
        const entities = World.getEntities(this.scanRadius);
        this.ocelots = [];
        this.breedingPairs = [];

        entities.forEach(entity => {
            if (entity.is("minecraft:ocelot")) {
                const ocelot = entity.asOcelot();
                const animal = entity.asAnimal();
                const distance = Player.getPlayer().distanceTo(entity);

                this.ocelots.push({
                    entity: entity,
                    ocelot: ocelot,
                    animal: animal,
                    name: entity.getName().getString(),
                    uuid: entity.getUUID(),
                    distance: distance,
                    isTrusting: ocelot.isTrusting(),
                    position: entity.getPos(),
                    health: entity.asLiving ? entity.asLiving().getHealth() : null
                });
            }
        });

        // Find potential breeding pairs (must be trusting animals)
        for (let i = 0; i < this.ocelots.length; i++) {
            for (let j = i + 1; j < this.ocelots.length; j++) {
                const ocelot1 = this.ocelots[i];
                const ocelot2 = this.ocelots[j];

                // Only trusting ocelots can breed
                if (ocelot1.isTrusting && ocelot2.isTrusting) {
                    const distance = ocelot1.position.distanceTo(ocelot2.position);

                    if (ocelot1.animal.canBreedWith(ocelot2.animal)) {
                        this.breedingPairs.push({
                            ocelot1: ocelot1,
                            ocelot2: ocelot2,
                            distance: distance
                        });
                    }
                }
            }
        }

        this.lastScan = Client.getTime();
    }

    checkBreedingFoodAvailability() {
        const player = Player.getPlayer();
        if (!player) return { hasFood: false, availableFood: [] };

        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();
        const availableFood = [];

        // Check both hands
        if (mainHand && this.breedingFood.includes(mainHand.getId())) {
            availableFood.push(mainHand.getId());
        }
        if (offHand && this.breedingFood.includes(offHand.getId())) {
            availableFood.push(offHand.getId());
        }

        return {
            hasFood: availableFood.length > 0,
            availableFood: availableFood
        };
    }

    generateBreedingAnalysis() {
        Chat.log("=== Ocelot Breeding Analysis ===");
        Chat.log(`Scanned ${this.ocelots.length} ocelots in range`);

        const trustingCount = this.ocelots.filter(o => o.isTrusting).length;
        const wildCount = this.ocelots.length - trustingCount;

        Chat.log(`Trusting ocelots: ${trustingCount}`);
        Chat.log(`Wild ocelots: ${wildCount}`);
        Chat.log(`Potential breeding pairs: ${this.breedingPairs.length}`);

        const foodStatus = this.checkBreedingFoodAvailability();

        if (this.breedingPairs.length === 0) {
            Chat.log("\n&eNo breeding pairs currently available");

            if (trustingCount < 2) {
                Chat.log("Reason: Not enough trusting ocelots (need at least 2)");
                if (wildCount > 0) {
                    Chat.log(`&7Tip: Feed wild ocelots with cod or salmon to gain their trust`);
                }
            } else {
                Chat.log("Possible reasons:");
                Chat.log("- Ocelots are too far apart (>8 blocks)");
                Chat.log("- Breeding cooldown not finished");
                Chat.log("- Ocelots are related (can't breed family)");
            }

            if (!foodStatus.hasFood) {
                Chat.log(`\n&7Required breeding food: ${this.breedingFood.join(", ")}`);
            }
            return;
        }

        // Show breeding pairs
        Chat.log(`\n&a=== Ready Breeding Pairs (${this.breedingPairs.length}) ===`);
        this.breedingPairs.forEach((pair, index) => {
            const distanceColor = pair.distance <= 8 ? "&a" : "&e";
            Chat.log(`${index + 1}. ${pair.ocelot1.name} + ${pair.ocelot2.name}`);
            Chat.log(`   Distance: ${distanceColor}${pair.distance.toFixed(1)} blocks${pair.distance <= 8 ? " ✓" : " (too far)"}`);
        });

        // Food status
        Chat.log(`\n&6=== Breeding Food Status ===`);
        if (foodStatus.hasFood) {
            const foodNames = foodStatus.availableFood.map(f => f.replace('minecraft:', '').replace('_', ' '));
            Chat.log(`&a✓ Holding breeding food: ${foodNames.join(", ")}`);
        } else {
            Chat.log(`&e✗ Not holding breeding food`);
            Chat.log(`&7Needed foods: ${this.breedingFood.join(", ")}`);
        }

        this.highlightBreedingPairs();
    }

    highlightBreedingPairs() {
        const foodStatus = this.checkBreedingFoodAvailability();

        this.breedingPairs.forEach((pair, index) => {
            let shouldHighlight = false;
            let color = 0x808080; // Default gray

            if (foodStatus.hasFood && pair.distance <= 8) {
                // Perfect conditions - bright green
                color = 0x00FF00;
                shouldHighlight = true;
            } else if (pair.distance <= 8) {
                // Close enough but no food - yellow
                color = 0xFFFF00;
                shouldHighlight = true;
            } else {
                // Too far - orange
                color = 0xFF8800;
                shouldHighlight = true;
            }

            if (shouldHighlight) {
                pair.ocelot1.entity.setGlowing(true);
                pair.ocelot1.entity.setGlowingColor(color);
                pair.ocelot2.entity.setGlowing(true);
                pair.ocelot2.entity.setGlowingColor(color);
            }
        });
    }

    findTrustBuildingOpportunities() {
        const player = Player.getPlayer();
        if (!player) return [];

        const foodStatus = this.checkBreedingFoodAvailability();
        if (!foodStatus.hasFood) return [];

        const opportunities = [];
        this.ocelots.forEach(ocelotData => {
            if (!ocelotData.isTrusting && ocelotData.distance <= 6) {
                opportunities.push(ocelotData);
            }
        });

        return opportunities.sort((a, b) => a.distance - b.distance);
    }

    update() {
        // Scan every 2 seconds (40 ticks)
        if (Client.getTime() - this.lastScan > 40) {
            this.scanForBreedingCandidates();
        }

        // Check for trust building opportunities
        const trustOpportunities = this.findTrustBuildingOpportunities();
        if (trustOpportunities.length > 0) {
            Chat.actionbar(`&a${trustOpportunities.length} wild ocelot${trustOpportunities.length > 1 ? 's' : ''} nearby can be tamed!`);

            // Highlight wild ocelots with cyan when holding food
            trustOpportunities.forEach(ocelotData => {
                ocelotData.entity.setGlowing(true);
                ocelotData.entity.setGlowingColor(0x00FFFF);
            });
        }

        this.highlightBreedingPairs();
    }
}

// Initialize breeding assistant
const ocelotBreedingAssistant = new OcelotBreedingAssistant();

// Update every second
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    ocelotBreedingAssistant.update();
}));

// Manual command example
// ocelotBreedingAssistant.generateBreedingAnalysis(); // Run this for detailed analysis

Chat.log("&aOcelot Breeding Assistant activated!");
Chat.log("&7Highlight system: Green (ready to breed) / Yellow (close, need food) / Orange (too far) / Cyan (can be tamed)");
```

## Notes and Limitations

- OcelotEntityHelper instances become invalid when the ocelot entity is removed from the world. Always check `isAlive()` before accessing ocelot data.
- `isTrusting()` returns true when ocelots have been fed cod or salmon and trust the player enough not to run away. This is different from full taming.
- Ocelots are distinct from cats in modern Minecraft versions - ocelots cannot be fully tamed like cats, but can be made to trust players.
- Ocelots will only accept cod or salmon for trust building. Other fish types will not work for gaining their trust.
- Trusting ocelots will not run away from players but are still wild animals and don't follow players like tamed cats do.
- The inheritance hierarchy provides access to all animal entity methods including breeding functionality (`AnimalEntityHelper`) and general entity properties (`EntityHelper`).
- Ocelots are primarily found in jungle biomes and will despawn if the player moves too far away.
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important ocelots for better visibility and organization.
- Trust status persists across game sessions for the specific ocelot entity.
- Ocelots can breed with other trusting ocelots to produce kittens, which inherit trust status from their parents.

## Related Classes

- `AnimalEntityHelper` - Base class for animal-specific functionality including breeding and food preferences
- `CatEntityHelper` - Specialized cat helper for fully tameable cat entities (distinct from ocelots)
- `TameableEntityHelper` - Base class for fully tameable animals like wolves and cats
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` - Item information and properties for food checking
- `ItemStackHelper` - ItemStack information for inventory-based food checking

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft OcelotEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for ocelot interaction management and behavior monitoring

---

**See Also:**
- [EntityHelper.asOcelot()](#entityhelperasocelot) - Method to cast entities to OcelotEntityHelper
- [AnimalEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\AnimalEntityHelper.md) - Animal entity base class
- [CatEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\CatEntityHelper.md) - Cat entity helper for fully tameable cats