# IllagerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.IllagerEntityHelper`

**Extends:** `MobEntityHelper<IllagerEntity>`

**Since:** JsMacros 1.8.4

The `IllagerEntityHelper` class is a specialized wrapper for illager entities in JSMacros, providing access to illager-specific behaviors, states, and combat mechanics. This class extends `MobEntityHelper` and inherits all mob entity methods while adding illager-specific functionality like state tracking, celebration behavior, and combat pattern detection.

This class represents various illager types including vindicators, pillagers, evokers, and illusioners, providing comprehensive methods for accessing their current states, detecting combat behaviors, and monitoring their special abilities and raid-related activities.

## Table of Contents

- [Constructors](#constructors)
- [Illager State and Behavior](#illager-state-and-behavior)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

## Constructors

IllagerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events where the entity is an illager type
- World entity queries that return illager entities
- Type casting from EntityHelper or MobEntityHelper using specific illager type checks

```js
// Getting IllagerEntityHelper from events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:vindicator", "minecraft:pillager", "minecraft:evoker", "minecraft:illusioner")) {
        const illager = entity; // Already typed as appropriate helper
        const state = illager.getState();
        Chat.log(`Illager spawned with state: ${state}`);
    }
}));

// Type casting from EntityHelper
const entity = event.getEntity();
if (entity.is("minecraft:vindicator")) {
    const vindicator = entity; // Will be VindicatorEntityHelper (extends IllagerEntityHelper)
    Chat.log(`Vindicator state: ${vindicator.getState()}`);
}
```

---

## Illager State and Behavior

## Inherited Methods

From `MobEntityHelper`:

### Combat and AI
- `illager.isAttacking()` - Check if the illager is currently attacking
- `illager.isAiDisabled()` - Check if the illager's AI is disabled

From `LivingEntityHelper`:

### Health and Status
- `illager.getHealth()` - Current health
- `illager.getMaxHealth()` - Maximum health
- `illager.getAbsorptionHealth()` - Absorption hearts
- `illager.getArmor()` - Current armor value
- `illager.getStatusEffects()` - List of active status effects
- `illager.hasStatusEffect(id)` - Check for specific status effect

### Movement and State
- `illager.isOnGround()` - Check if on ground
- `illager.canBreatheInWater()` - Check if can breathe underwater
- `illager.isFallFlying()` - Check if elytra is deployed
- `illager.isBaby()` - Check if is baby variant

### Combat and Interaction
- `illager.isHolding(item)` - Check if holding specific item
- `illager.canSeeEntity(entity)` - Check if has line of sight to entity
- `illager.getBowPullProgress()` - Get bow pull progress
- `illager.getItemUseTimeLeft()` - Get item use time remaining

From `EntityHelper`:
- All position, movement, entity information, raytracing, and utility methods
- Distance calculations, type checking, NBT access, etc.

---

## Usage Examples

### Raid Detection and Monitoring
```js
// Comprehensive raid detection system
class RaidMonitor {
    constructor() {
        this.raidActive = false;
        this.raidStartTime = null;
        this.illagerCounts = new Map();
        this.raidCenter = null;
    }

    checkForRaid() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const nearbyIllagers = [];
        const illagerTypes = ["minecraft:vindicator", "minecraft:pillager", "minecraft:evoker", "minecraft:illusioner"];

        // Count nearby illagers
        entities.forEach(entity => {
            if (entity.is(...illagerTypes)) {
                const distance = player.distanceTo(entity);
                if (distance <= 100) { // Within 100 blocks
                    nearbyIllagers.push(entity);
                    const type = entity.getType();
                    this.illagerCounts.set(type, (this.illagerCounts.get(type) || 0) + 1);
                }
            }
        });

        // Check for raid conditions
        if (nearbyIllagers.length >= 3 && !this.raidActive) {
            this.startRaid(nearbyIllagers);
        } else if (nearbyIllagers.length === 0 && this.raidActive) {
            this.endRaid();
        } else if (this.raidActive) {
            this.updateRaidStatus(nearbyIllagers);
        }
    }

    startRaid(illagers) {
        this.raidActive = true;
        this.raidStartTime = Client.getTime();

        Chat.log("&c&l=== RAID DETECTED ===");
        Chat.log(`&cRaid started with ${illagers.length} illagers nearby!`);

        // Count by type
        const typeCounts = {};
        illagers.forEach(illager => {
            const type = illager.getType();
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });

        for (const [type, count] of Object.entries(typeCounts)) {
            Chat.log(`&c  ${type}: ${count}`);
        }

        // Calculate approximate raid center
        let totalX = 0, totalZ = 0;
        illagers.forEach(illager => {
            const pos = illager.getPos();
            totalX += pos.x;
            totalZ += pos.z;
        });
        this.raidCenter = { x: totalX / illagers.length, z: totalZ / illagers.length };

        Chat.log(`&cRaid center estimated at: ${this.raidCenter.x.toFixed(0)}, ${this.raidCenter.z.toFixed(0)}`);
    }

    updateRaidStatus(illagers) {
        const raidDuration = Math.floor((Client.getTime() - this.raidStartTime) / 20);

        // Count celebrating vs fighting illagers
        let celebratingCount = 0;
        let attackingCount = 0;
        let spellcastingCount = 0;

        illagers.forEach(illager => {
            if (illager.isCelebrating()) {
                celebratingCount++;
            }
            const state = illager.getState();
            if (state === "ATTACKING") attackingCount++;
            if (state === "SPELLCASTING") spellcastingCount++;
        });

        Chat.actionbar(`&cRaid Active: ${raidDuration}s | Fighting: ${attackingCount} | Spellcasters: ${spellcastingCount} | Celebrating: ${celebratingCount}`);

        // Check if raid is ending (many celebrating)
        if (celebratingCount > illagers.length * 0.7) {
            Chat.log("&6Raid appears to be ending - illagers are celebrating!");
        }
    }

    endRaid() {
        this.raidActive = false;
        const raidDuration = Math.floor((Client.getTime() - this.raidStartTime) / 20);

        Chat.log("&a&l=== RAID ENDED ===");
        Chat.log(`&aRaid lasted ${raidDuration} seconds`);

        // Reset counts
        this.illagerCounts.clear();
        this.raidCenter = null;
    }
}

const raidMonitor = new RaidMonitor();

// Check for raids every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 100 === 0) {
        raidMonitor.checkForRaid();
    }
}));
```

### Illager Combat Analysis
```js
// Analyze illager combat patterns
class IllagerCombatAnalyzer {
    constructor() {
        this.combatEvents = [];
        this.illagerWeapons = new Map();
    }

    analyzeIllagerCombat() {
        const entities = World.getEntities();
        const player = Player.getPlayer();
        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:vindicator", "minecraft:pillager", "minecraft:evoker", "minecraft:illusioner")) {
                const illager = entity;
                const name = entity.getName().getString();
                const state = illager.getState();
                const distance = player.distanceTo(illager);

                if (distance <= 50) { // Only analyze nearby illagers
                    this.analyzeIllagerEquipment(illager, name);
                    this.analyzeCombatBehavior(illager, name, state);
                }
            }
        });
    }

    analyzeIllagerEquipment(illager, name) {
        // Note: This would work with server-side access
        const mainHand = illager.getMainHand();
        if (!mainHand.isEmpty()) {
            const weaponName = mainHand.getName();
            const weaponType = this.getWeaponType(weaponName);

            if (!this.illagerWeapons.has(name)) {
                this.illagerWeapons.set(name, {
                    weapon: weaponName,
                    type: weaponType,
                    enchantments: mainHand.hasEnchantments() ? mainHand.getEnchantments().map(e => e.getName()) : []
                });

                Chat.log(`&6${name} equipped: ${weaponName} (${weaponType})`);
            }
        }
    }

    analyzeCombatBehavior(illager, name, state) {
        const timestamp = Client.getTime();

        if (state === "ATTACKING" || state === "SPELLCASTING" ||
            state === "BOW_AND_ARROW" || state === "CROSSBOW_CHARGE") {

            this.combatEvents.push({
                illager: name,
                state: state,
                timestamp: timestamp,
                position: illager.getPos()
            });

            // Keep only recent events
            if (this.combatEvents.length > 50) {
                this.combatEvents.shift();
            }

            Chat.log(`&c${name} combat action: ${state}`);
        }
    }

    getWeaponType(weaponName) {
        if (weaponName.includes("axe")) return "Melee (Axe)";
        if (weaponName.includes("bow")) return "Ranged (Bow)";
        if (weaponName.includes("crossbow")) return "Ranged (Crossbow)";
        if (weaponName.includes("sword")) return "Melee (Sword)";
        if (weaponName.includes("trident")) return "Melee/Ranged (Trident)";
        return "Unknown";
    }

    getCombatReport() {
        if (this.combatEvents.length === 0) {
            Chat.log("No combat events recorded recently");
            return;
        }

        Chat.log("=== Illager Combat Report ===");
        Chat.log(`Recent combat events: ${this.combatEvents.length}`);

        // Analyze combat patterns
        const stateCounts = {};
        const illagerCounts = {};

        this.combatEvents.forEach(event => {
            stateCounts[event.state] = (stateCounts[event.state] || 0) + 1;
            illagerCounts[event.illager] = (illagerCounts[event.illager] || 0) + 1;
        });

        Chat.log("\nCombat Actions:");
        for (const [state, count] of Object.entries(stateCounts)) {
            Chat.log(`  ${state}: ${count} times`);
        }

        Chat.log("\nMost Active Combatants:");
        const sortedIllagers = Object.entries(illagerCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        sortedIllagers.forEach(([name, count]) => {
            Chat.log(`  ${name}: ${count} actions`);
        });

        // Equipment summary
        Chat.log("\nEquipment Summary:");
        for (const [name, data] of this.illagerWeapons) {
            Chat.log(`  ${name}: ${data.weapon}`);
            if (data.enchantments.length > 0) {
                Chat.log(`    Enchantments: ${data.enchantments.join(", ")}`);
            }
        });
    }
}

const combatAnalyzer = new IllagerCombatAnalyzer();

// Analyze combat every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 40 === 0) {
        combatAnalyzer.analyzeIllagerCombat();
    }
}));

// Combat report keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.c") {
        combatAnalyzer.getCombatReport();
    }
}));
```

### Specialized Illager Type Handling
```js
// Handle different illager types appropriately
function handleIllagerByType(entity) {
    const type = entity.getType();
    const name = entity.getName().getString();
    const state = entity.getState();

    switch (type) {
        case "minecraft:vindicator":
            handleVindicator(entity, name, state);
            break;
        case "minecraft:pillager":
            handlePillager(entity, name, state);
            break;
        case "minecraft:evoker":
            handleEvoker(entity, name, state);
            break;
        case "minecraft:illusioner":
            handleIllusioner(entity, name, state);
            break;
        default:
            Chat.log(`&eUnknown illager type: ${type}`);
    }
}

function handleVindicator(vindicator, name, state) {
    // Check if it's a "Johnny" vindicator (special case)
    if (vindicator.isJohnny && vindicator.isJohnny()) {
        Chat.log(`&c&lJOHNNY VINDICATOR DETECTED: ${name}!`);
        vindicator.setGlowingColor(0xFF0000); // Bright red
    } else {
        Chat.log(`&6Vindicator ${name}: ${state}`);
        vindicator.setGlowingColor(0xCC6600); // Orange
    }

    if (state === "ATTACKING") {
        Chat.actionbar("&cVindicator is charging with axe!");
    }
}

function handlePillager(pillager, name, state) {
    Chat.log(`&6Pillager ${name}: ${state}`);
    pillager.setGlowingColor(0x00AA00); // Green

    if (state === "CROSSBOW_CHARGE") {
        Chat.actionbar("&2Pillager charging crossbow - take cover!");
    } else if (state === "BOW_AND_ARROW") {
        Chat.actionbar("&2Pillager drawing bow!");
    }
}

function handleEvoker(evoker, name, state) {
    Chat.log(`&5Evoker ${name}: ${state}`);
    evoker.setGlowingColor(0x9933CC); // Purple

    if (state === "SPELLCASTING") {
        Chat.actionbar("&5Evoker casting spell - be careful!");

        // Check if it has spellcasting-specific methods
        if (evoker.isCastingSpell && evoker.getCastedSpell) {
            const spell = evoker.getCastedSpell();
            Chat.log(`&5Evoker casting: ${spell}`);

            // Special warnings for dangerous spells
            if (spell === "SUMMON_VEX") {
                Chat.log("&c&lWARNING: Evoker summoning Vexes!");
            } else if (spell === "FANGS") {
                Chat.log("&c&lWARNING: Evoker casting Evoker Fangs!");
            }
        }
    }
}

function handleIllusioner(illusioner, name, state) {
    Chat.log(`&bIllusioner ${name}: ${state}`);
    illusioner.setGlowingColor(0x0099CC); // Cyan

    if (state === "SPELLCASTING") {
        Chat.actionbar("&bIllusioner casting illusion spell!");
        Chat.log("&bIllusioners can create duplicates and blind players!");
    }
}

// Monitor all illager types
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const entities = World.getEntities();
    const player = Player.getPlayer();
    if (!player) return;

    entities.forEach(entity => {
        if (entity.is("minecraft:vindicator", "minecraft:pillager", "minecraft:evoker", "minecraft:illusioner")) {
            const distance = player.distanceTo(entity);

            if (distance <= 64) { // Only process nearby illagers
                handleIllagerByType(entity);
            }
        }
    });
}));
```

## Notes and Limitations

- **Type Safety:** IllagerEntityHelper instances can be null if the entity is removed. Always check for validity before accessing methods.
- **State Transitions:** Illager states may change rapidly during combat. Frequent state checking may be needed for accurate monitoring.
- **Inherited Functionality:** This class inherits comprehensive methods from MobEntityHelper, LivingEntityHelper, and EntityHelper for complete entity management.
- **Server-Side Variations:** Some illager behaviors and states may vary based on server-side implementations and Minecraft versions.
- **Celebration Behavior:** The celebrating state typically occurs during raids but may also appear in other contexts.
- **Performance Considerations:** Monitoring many illagers with frequent state checks can impact performance. Use appropriate update intervals.

## Related Classes

- `MobEntityHelper` - Parent class with mob-specific functionality
- `LivingEntityHelper` - Grandparent class with living entity methods
- `EntityHelper` - Base class with entity methods
- `VindicatorEntityHelper` - Specialized vindicator functionality
- `PillagerEntityHelper` - Specialized pillager functionality
- `SpellcastingIllagerEntityHelper` - For evokers and other spellcasters
- `PlayerEntityHelper` - Player entity for comparison and interaction

## Version Information

- Available since JSMacros 1.8.4
- Extends MobEntityHelper with illager-specific state and behavior tracking
- State enumeration matches Minecraft illager states for accurate behavior detection
- Celebration detection added for raid-related monitoring