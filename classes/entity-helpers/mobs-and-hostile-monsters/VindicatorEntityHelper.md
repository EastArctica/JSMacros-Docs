# VindicatorEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.VindicatorEntityHelper`

**Extends:** `IllagerEntityHelper<VindicatorEntity>`

**Since:** JsMacros 1.8.4

The `VindicatorEntityHelper` class is a specialized wrapper for vindicator entities in JSMacros, providing access to vindicator-specific behaviors, states, and unique characteristics. This class extends `IllagerEntityHelper` and inherits all illager entity methods while adding vindicator-specific functionality, most notably the ability to detect the special "Johnny" variant.

This class represents vindicators, the hostile illager mobs armed with iron axes that are commonly found in woodland mansions and during raids. Vindicators are known for their aggressive melee combat behavior and their special "Johnny" naming Easter egg that causes them to attack all mobs except other illagers.

## Table of Contents

- [Constructors](#constructors)
- [Vindicator-Specific Methods](#vindicator-specific-methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)

## Constructors

VindicatorEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events where the entity is a vindicator type
- World entity queries that return vindicator entities
- Type casting from EntityHelper or MobEntityHelper using specific vindicator type checks

```js
// Getting VindicatorEntityHelper from events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:vindicator")) {
        const vindicator = entity; // Already typed as VindicatorEntityHelper
        const isJohnny = vindicator.isJohnny();
        Chat.log(`Vindicator spawned! Johnny: ${isJohnny}`);
    }
}));

// Type casting from EntityHelper
const entity = event.getEntity();
if (entity.is("minecraft:vindicator")) {
    const vindicator = entity; // Will be VindicatorEntityHelper
    Chat.log(`Vindicator name: ${vindicator.getName().getString()}`);
}

// Finding vindicators in the world
const entities = World.getEntities();
const vindicators = entities.filter(entity => entity.is("minecraft:vindicator"));
vindicators.forEach(vindicator => {
    Chat.log(`Found vindicator at: ${vindicator.getPos()}`);
});
```

---

## Vindicator-Specific Methods

## Inherited Methods

From `IllagerEntityHelper`:

### Illager State and Behavior
- `vindicator.isCelebrating()` - Check if the vindicator is celebrating (after raids)
- `vindicator.getState()` - Get current activity state with these possible values:
  - `CROSSED` - Vindicator has arms crossed (idle/neutral)
  - `ATTACKING` - Vindicator is actively attacking with axe
  - `SPELLCASTING` - Not applicable to vindicators
  - `BOW_AND_ARROW` - Not applicable to vindicators
  - `CROSSBOW_HOLD` - Not applicable to vindicators
  - `CROSSBOW_CHARGE` - Not applicable to vindicators
  - `CELEBRATING` - Vindicator is celebrating (same as `isCelebrating()`)
  - `NEUTRAL` - Vindicator is in neutral state

From `MobEntityHelper`:

### Combat and AI
- `vindicator.isAttacking()` - Check if the vindicator is currently attacking
- `vindicator.isAiDisabled()` - Check if the vindicator's AI is disabled

From `LivingEntityHelper`:

### Health and Status
- `vindicator.getHealth()` - Current health points
- `vindicator.getMaxHealth()` - Maximum health points
- `vindicator.getAbsorptionHealth()` - Absorption hearts
- `vindicator.getArmor()` - Current armor value
- `vindicator.getStatusEffects()` - List of active status effects
- `vindicator.hasStatusEffect(id)` - Check for specific status effect

### Movement and State
- `vindicator.isOnGround()` - Check if on ground
- `vindicator.canBreatheInWater()` - Check if can breathe underwater
- `vindicator.isFallFlying()` - Check if elytra is deployed
- `vindicator.isBaby()` - Check if is baby variant (vindicators don't have baby variants)

### Combat and Interaction
- `vindicator.isHolding(item)` - Check if holding specific item (typically iron axe)
- `vindicator.canSeeEntity(entity)` - Check if has line of sight to entity
- `vindicator.getBowPullProgress()` - Get bow pull progress (not applicable to vindicators)
- `vindicator.getItemUseTimeLeft()` - Get item use time remaining

From `EntityHelper`:
- All position, movement, entity information, raytracing, and utility methods
- Distance calculations, type checking, NBT access, etc.

---

## Usage Examples

### Basic Vindicator Detection
```js
// Simple vindicator detection and monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const nearbyVindicators = entities.filter(entity => {
        return entity.is("minecraft:vindicator") &&
               player.distanceTo(entity) <= 50;
    });

    if (nearbyVindicators.length > 0) {
        Chat.actionbar(`&6Vindicators nearby: ${nearbyVindicators.length}`);

        nearbyVindicators.forEach(vindicator => {
            const isJohnny = vindicator.isJohnny();
            const state = vindicator.getState();
            const health = Math.floor(vindicator.getHealth());

            if (isJohnny) {
                Chat.log(`&cJohnny vindicator! State: ${state}, HP: ${health}`);
            }
        });
    }
}));
```

### Vindicator Combat Analysis
```js
// Analyze vindicator combat patterns and behavior
class VindicatorCombatAnalyzer {
    constructor() {
        this.combatEvents = [];
        this.vindicatorsTracked = new Map();
    }

    analyzeVindicatorCombat() {
        const entities = World.getEntities();
        const player = Player.getPlayer();
        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:vindicator")) {
                const vindicator = entity;
                const distance = player.distanceTo(vindicator);
                const uuid = entity.getUUID();

                if (distance <= 32) { // Only analyze nearby vindicators
                    this.trackVindicator(vindicator, uuid);
                    this.analyzeCombatBehavior(vindicator, uuid);
                }
            }
        });

        // Clean up dead/removed vindicators
        for (const [uuid, data] of this.vindicatorsTracked) {
            if (!data.entity.isAlive()) {
                this.vindicatorsTracked.delete(uuid);
                Chat.log(`&eVindicator ${data.name} removed from tracking`);
            }
        }
    }

    trackVindicator(vindicator, uuid) {
        if (!this.vindicatorsTracked.has(uuid)) {
            const name = vindicator.getName().getString();
            const isJohnny = vindicator.isJohnny();

            this.vindicatorsTracked.set(uuid, {
                entity: vindicator,
                name: name,
                isJohnny: isJohnny,
                firstSeen: Client.getTime(),
                combatStartTime: null,
                attackCount: 0
            });

            Chat.log(`&eStarted tracking ${name} (Johnny: ${isJohnny})`);
        }

        // Update tracked vindicator data
        const data = this.vindicatorsTracked.get(uuid);
        data.entity = vindicator;
        data.lastSeen = Client.getTime();
    }

    analyzeCombatBehavior(vindicator, uuid) {
        const state = vindicator.getState();
        const data = this.vindicatorsTracked.get(uuid);

        if (!data) return;

        const currentTime = Client.getTime();
        const isAttacking = state === "ATTACKING";

        // Track combat start
        if (isAttacking && !data.combatStartTime) {
            data.combatStartTime = currentTime;
            Chat.log(`&c${data.name} entered combat!`);

            if (data.isJohnny) {
                Chat.log("&c&lJOHNNY IS FIGHTING EVERYONE!");
            }
        }

        // Track attacks
        if (isAttacking && (!data.lastAttackTime || currentTime - data.lastAttackTime > 20)) {
            data.attackCount++;
            data.lastAttackTime = currentTime;

            this.combatEvents.push({
                vindicator: data.name,
                isJohnny: data.isJohnny,
                timestamp: currentTime,
                state: state,
                position: vindicator.getPos()
            });

            // Keep only recent events
            if (this.combatEvents.length > 100) {
                this.combatEvents.shift();
            }

            Chat.log(`&c${data.name} attack #${data.attackCount} (${state})`);
        }

        // Track combat end
        if (!isAttacking && data.combatStartTime) {
            const combatDuration = Math.floor((currentTime - data.combatStartTime) / 20);
            Chat.log(`&a${data.name} combat ended after ${combatDuration} seconds (${data.attackCount} attacks)`);
            data.combatStartTime = null;
        }
    }

    getCombatReport() {
        if (this.vindicatorsTracked.size === 0) {
            Chat.log("No vindicators being tracked");
            return;
        }

        Chat.log("=== Vindicator Combat Report ===");
        Chat.log(`Currently tracking: ${this.vindicatorsTracked.size} vindicators`);

        // Summary by type
        let johnnyCount = 0;
        let regularCount = 0;
        let totalAttacks = 0;

        for (const [uuid, data] of this.vindicatorsTracked) {
            if (data.isJohnny) {
                johnnyCount++;
            } else {
                regularCount++;
            }
            totalAttacks += data.attackCount;
        }

        Chat.log(`Johnny vindicators: ${johnnyCount}`);
        Chat.log(`Regular vindicators: ${regularCount}`);
        Chat.log(`Total attacks recorded: ${totalAttacks}`);

        // Individual vindicator details
        Chat.log("\nIndividual Details:");
        for (const [uuid, data] of this.vindicatorsTracked) {
            const timeSinceFirstSeen = Math.floor((Client.getTime() - data.firstSeen) / 20);
            const status = data.combatStartTime ? "In Combat" : "Idle";

            Chat.log(`  ${data.name} (${data.isJohnny ? "Johnny" : "Regular"})`);
            Chat.log(`    Status: ${status}`);
            Chat.log(`    Attacks: ${data.attackCount}`);
            Chat.log(`    Tracked for: ${timeSinceFirstSeen}s`);
            Chat.log(`    Health: ${Math.floor(data.entity.getHealth())}/${data.entity.getMaxHealth()}`);
        }

        // Recent combat events
        const recentEvents = this.combatEvents.slice(-10);
        if (recentEvents.length > 0) {
            Chat.log("\nRecent Combat Events:");
            recentEvents.forEach(event => {
                const timeAgo = Math.floor((Client.getTime() - event.timestamp) / 20);
                Chat.log(`  ${event.vindicator}: ${event.state} (${timeAgo}s ago)`);
            });
        }
    }
}

const combatAnalyzer = new VindicatorCombatAnalyzer();

// Analyze combat every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) {
        combatAnalyzer.analyzeVindicatorCombat();
    }
}));

// Combat report keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.v") {
        combatAnalyzer.getCombatReport();
    }
}));
```

### Woodland Mansion Vindicator Scanner
```js
// Specialized scanner for woodland mansion vindicators
class MansionVindicatorScanner {
    constructor() {
        this.mansionVindicators = new Map();
        this.scanRadius = 64;
        this.mansionCenter = null;
    }

    setMansionCenter(x, z) {
        this.mansionCenter = { x: x, z: z };
        Chat.log(`&6Mansion center set to: ${x}, ${z}`);
    }

    scanMansion() {
        const entities = World.getEntities();
        const player = Player.getPlayer();
        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:vindicator")) {
                const vindicator = entity;
                const pos = vindicator.getPos();
                const uuid = entity.getUUID();

                // Check if within mansion scan area
                if (this.isInMansionArea(pos)) {
                    this.processMansionVindicator(vindicator, uuid);
                }
            }
        });
    }

    isInMansionArea(pos) {
        if (!this.mansionCenter) return true; // No center set, scan all

        const distance = Math.sqrt(
            Math.pow(pos.x - this.mansionCenter.x, 2) +
            Math.pow(pos.z - this.mansionCenter.z, 2)
        );
        return distance <= this.scanRadius;
    }

    processMansionVindicator(vindicator, uuid) {
        const pos = vindicator.getPos();
        const name = vindicator.getName().getString();
        const isJohnny = vindicator.isJohnny();
        const state = vindicator.getState();
        const health = Math.floor(vindicator.getHealth());

        if (!this.mansionVindicators.has(uuid)) {
            this.mansionVindicators.set(uuid, {
                entity: vindicator,
                name: name,
                isJohnny: isJohnny,
                firstSeen: Client.getTime(),
                lastPosition: pos,
                room: this.identifyRoom(pos)
            });

            Chat.log(`&cMansion vindicator detected: ${name}`);
            Chat.log(`  Location: (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)})`);
            Chat.log(`  Johnny: ${isJohnny}`);
            Chat.log(`  Room: ${this.identifyRoom(pos)}`);
            Chat.log(`  Health: ${health}/${vindicator.getMaxHealth()}`);
        }

        // Update vindicator data
        const data = this.mansionVindicators.get(uuid);
        data.entity = vindicator;
        data.lastPosition = pos;
        data.currentState = state;

        // Check for movement (might indicate patrol routes)
        const movedDistance = Math.sqrt(
            Math.pow(pos.x - data.lastPosition.x, 2) +
            Math.pow(pos.y - data.lastPosition.y, 2) +
            Math.pow(pos.z - data.lastPosition.z, 2)
        );

        if (movedDistance > 5) {
            Chat.log(`&6${name} moved to new location: ${this.identifyRoom(pos)}`);
        }
    }

    identifyRoom(pos) {
        // Simple room identification based on Y level and patterns
        const y = Math.floor(pos.y);

        if (y <= 10) return "Basement/Dungeon";
        if (y <= 20) return "Ground Floor";
        if (y <= 30) return "Second Floor";
        if (y <= 40) return "Third Floor/Attic";

        return "Unknown Floor";
    }

    getMansionReport() {
        if (this.mansionVindicators.size === 0) {
            Chat.log("No mansion vindicators detected");
            return;
        }

        Chat.log("=== Woodland Mansion Vindicator Report ===");
        Chat.log(`Total vindicators in mansion: ${this.mansionVindicators.size}`);

        let johnnyCount = 0;
        let roomCounts = {};

        for (const [uuid, data] of this.mansionVindicators) {
            if (data.isJohnny) johnnyCount++;

            const room = data.room;
            roomCounts[room] = (roomCounts[room] || 0) + 1;
        }

        Chat.log(`Johnny vindicators: ${johnnyCount}`);
        Chat.log(`Regular vindicators: ${this.mansionVindicators.size - johnnyCount}`);

        Chat.log("\nVindicators by Room:");
        for (const [room, count] of Object.entries(roomCounts)) {
            Chat.log(`  ${room}: ${count} vindicators`);
        }

        // Danger assessment
        const dangerLevel = this.assessDangerLevel();
        Chat.log(`\nDanger Level: ${dangerLevel}`);

        if (johnnyCount > 0) {
            Chat.log("\n&c&lWARNING: Johnny vindicators present - EXTREME danger!");
        }
    }

    assessDangerLevel() {
        const totalVindicators = this.mansionVindicators.size;
        const johnnyCount = Array.from(this.mansionVindicators.values())
            .filter(data => data.isJohnny).length;

        if (johnnyCount > 0) return "&c&lEXTREME";
        if (totalVindicators > 10) return "&cHIGH";
        if (totalVindicators > 5) return "&6MEDIUM";
        if (totalVindicators > 0) return "&aLOW";
        return "&2SAFE";
    }
}

const mansionScanner = new MansionVindicatorScanner();

// Example: Set mansion center when you find one
// mansionScanner.setMansionCenter(1000, 2000);

// Scan mansion every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 60 === 0) {
        mansionScanner.scanMansion();
    }
}));

// Mansion report keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.m") {
        mansionScanner.getMansionReport();
    }
}));
```

### Vindicator Name Detection System
```js
// Detect and log all named vindicators (especially Johnny)
class VindicatorNameDetector {
    constructor() {
        this.namedVindicators = new Map();
        this.specialNames = ["Johnny", "Dinnerbone", "Grumm"]; // Special name effects
    }

    detectNamedVindicators() {
        const entities = World.getEntities();
        const player = Player.getPlayer();
        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:vindicator")) {
                const vindicator = entity;
                const uuid = entity.getUUID();
                const name = entity.getName().getString();
                const hasCustomName = entity.hasCustomName();

                if (hasCustomName) {
                    this.processNamedVindicator(vindicator, uuid, name);
                }
            }
        });
    }

    processNamedVindicator(vindicator, uuid, name) {
        if (!this.namedVindicators.has(uuid)) {
            const isJohnny = vindicator.isJohnny();
            const isSpecialName = this.specialNames.includes(name);

            this.namedVindicators.set(uuid, {
                entity: vindicator,
                name: name,
                isJohnny: isJohnny,
                isSpecialName: isSpecialName,
                firstSeen: Client.getTime(),
                healthHistory: []
            });

            // Log the discovery
            Chat.log(`&e&lNAMED VINDICATOR DETECTED!`);
            Chat.log(`&eName: "${name}"`);
            Chat.log(`&eJohnny: ${isJohnny}`);
            Chat.log(`&eSpecial Name: ${isSpecialName}`);
            Chat.log(`&ePosition: ${vindicator.getPos()}`);
            Chat.log(`&eTime: ${new Date().toLocaleTimeString()}`);

            // Special alerts for special names
            if (isJohnny) {
                Chat.log("&c&lIT'S JOHNNY! RUN!");
            }

            if (name === "Dinnerbone" || name === "Grumm") {
                Chat.log("&b&lUpside-down vindicator detected!");
            }

            // Apply special effects for special names
            this.applySpecialEffects(vindicator, name);
        }

        // Update existing named vindicator data
        const data = this.namedVindicators.get(uuid);
        data.entity = vindicator;
        data.lastSeen = Client.getTime();

        // Track health changes
        const currentHealth = vindicator.getHealth();
        data.healthHistory.push({
            health: currentHealth,
            time: Client.getTime()
        });

        // Keep only recent health history
        if (data.healthHistory.length > 20) {
            data.healthHistory.shift();
        }
    }

    applySpecialEffects(vindicator, name) {
        switch (name) {
            case "Johnny":
                vindicator.setGlowing(true);
                vindicator.setGlowingColor(0xFF0000); // Red
                break;
            case "Dinnerbone":
            case "Grumm":
                vindicator.setGlowing(true);
                vindicator.setGlowingColor(0x00FFFF); // Cyan
                break;
            default:
                vindicator.setGlowing(true);
                vindicator.setGlowingColor(0xFFD700); // Gold for other named vindicators
        }
    }

    getNameReport() {
        if (this.namedVindicators.size === 0) {
            Chat.log("No named vindicators found");
            return;
        }

        Chat.log("=== Named Vindicator Report ===");
        Chat.log(`Total named vindicators: ${this.namedVindicators.size}`);

        // Group by name
        const nameGroups = {};
        for (const [uuid, data] of this.namedVindicators) {
            if (!nameGroups[data.name]) {
                nameGroups[data.name] = [];
            }
            nameGroups[data.name].push(data);
        }

        for (const [name, vindicators] of Object.entries(nameGroups)) {
            Chat.log(`\n"${name}" (${vindicators.length}):`);

            vindicators.forEach(data => {
                const pos = data.entity.getPos();
                const health = Math.floor(data.entity.getHealth());
                const state = data.entity.getState();

                Chat.log(`  Location: (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)})`);
                Chat.log(`  Health: ${health}/${data.entity.getMaxHealth()}`);
                Chat.log(`  State: ${state}`);

                if (data.isJohnny) {
                    Chat.log(`  &c&lJOHNNY VARIANT - EXTREMELY DANGEROUS!`);
                }
            });
        }

        // Health trend analysis
        Chat.log("\nHealth Trends:");
        for (const [uuid, data] of this.namedVindicators) {
            if (data.healthHistory.length >= 2) {
                const recentHealth = data.healthHistory[data.healthHistory.length - 1].health;
                const previousHealth = data.healthHistory[data.healthHistory.length - 2].health;
                const healthChange = recentHealth - previousHealth;

                if (Math.abs(healthChange) > 0.5) {
                    const trend = healthChange > 0 ? "Healing" : "Taking Damage";
                    Chat.log(`  ${data.name}: ${trend} (${Math.abs(healthChange).toFixed(1)} HP)`);
                }
            }
        }
    }

    findJohnnyByName() {
        // Alternative way to find Johnny (for testing/debugging)
        const entities = World.getEntities();
        let johnnyCount = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:vindicator") && entity.hasCustomName()) {
                const name = entity.getName().getString();
                if (name.toLowerCase() === "johnny") {
                    johnnyCount++;
                    Chat.log(`&cFound Johnny by name: ${name} at ${entity.getPos()}`);
                }
            }
        });

        Chat.log(`Total Johnny vindicators by name: ${johnnyCount}`);
        return johnnyCount;
    }
}

const nameDetector = new VindicatorNameDetector();

// Scan for named vindicators every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 100 === 0) {
        nameDetector.detectNamedVindicators();
    }
}));

// Name report keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.n") {
        nameDetector.getNameReport();
    }
}));

// Johnny finder keybind (alternative method)
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.shift" && event.action === 1) { // Shift key pressed
        nameDetector.findJohnnyByName();
    }
}));
```

## Notes and Limitations

- **Type Safety:** VindicatorEntityHelper instances can be null if the entity is removed. Always check for validity before accessing methods.

- **Johnny Detection:** The `isJohnny()` method specifically checks for the exact name "Johnny" (case-sensitive). This matches Minecraft's built-in behavior where naming a vindicator "Johnny" causes it to attack all mobs.

- **Inherited Functionality:** This class inherits comprehensive methods from IllagerEntityHelper, MobEntityHelper, LivingEntityHelper, and EntityHelper for complete entity management.

- **Combat Behavior:** Vindicators are primarily melee fighters with iron axes. Their states will typically be "ATTACKING" when in combat or "CROSSED"/"NEUTRAL" when idle.

- **Raid Behavior:** During raids, vindicators may celebrate after successful waves. Use the inherited `isCelebrating()` method to detect this state.

- **Performance Considerations:** Monitoring many vindicators with frequent checks can impact performance. Use appropriate update intervals for your monitoring needs.

- **Johnny Behavior:** Johnny vindicators attack all mobs except other illagers, making them significantly more dangerous than regular vindicators.

- **Woodland Mansions:** Vindicators commonly spawn in woodland mansions and are a key part of the mansion's defensive forces.

## Related Classes

- `IllagerEntityHelper` - Parent class with illager-specific functionality
- `MobEntityHelper` - Grandparent class with mob-specific methods
- `LivingEntityHelper` - Great-grandparent class with living entity methods
- `EntityHelper` - Base class with fundamental entity methods
- `EvokerEntityHelper` - Other specialized illager helper
- `PillagerEntityHelper` - Other specialized illager helper
- `VexEntityHelper` - Summoned by evokers during combat

## Version Information

- Available since JSMacros 1.8.4
- Extends IllagerEntityHelper with vindicator-specific functionality
- Johnny detection matches vanilla Minecraft behavior for named vindicators
- Inherits comprehensive illager and mob entity functionality from parent classes