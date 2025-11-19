# SpellcastingIllagerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.SpellcastingIllagerEntityHelper<T extends SpellcastingIllagerEntity>`

**Extends:** `IllagerEntityHelper<T>`

**Since:** JsMacros 1.8.4

The `SpellcastingIllagerEntityHelper` class provides specialized functionality for spellcasting illager entities in JSMacros, particularly evokers and illusioners. This class extends `IllagerEntityHelper` and inherits all illager-specific methods while adding spellcasting-specific functionality for tracking magical attacks, spell identification, and combat pattern analysis.

This class represents intelligent hostile mobs that use magical spells in combat, making them significantly more dangerous than regular illagers. Spellcasting illagers can summon vexes, create evoker fangs, cast blindness spells, disappear and reappear, and use other magical abilities that require special defensive strategies and tactical awareness.

## Table of Contents

- [Constructors](#constructors)
- [Spellcasting Methods](#spellcasting-methods)
- [Inherited Methods](#inherited-methods)
- [Usage Examples](#usage-examples)
- [Combat Strategies](#combat-strategies)

---

## Constructors

SpellcastingIllagerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events where the entity is a spellcasting illager type
- World entity queries that return evokers or illusioners
- Type casting from EntityHelper or IllagerEntityHelper using specific entity type checks

```js
// Getting SpellcastingIllagerEntityHelper from events
JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:evoker", "minecraft:illusioner")) {
        const spellcaster = entity; // Already typed as SpellcastingIllagerEntityHelper
        const name = entity.getName().getString();
        Chat.log(`Spellcaster ${name} has appeared!`);

        // Monitor for immediate spellcasting
        if (spellcaster.isCastingSpell()) {
            const spell = spellcaster.getCastedSpell();
            Chat.log(`&cWARNING: ${name} is casting ${spell} immediately!`);
        }
    }
}));

// Type casting from EntityHelper
const entity = event.getEntity();
if (entity.is("minecraft:evoker")) {
    const evoker = entity; // Will be SpellcastingIllagerEntityHelper
    Chat.log(`Evoker detected - be ready for spells!`);
}
```

---

## Spellcasting Methods

## Inherited Methods

From `IllagerEntityHelper`:

### Illager State and Behavior
- `spellcaster.isCelebrating()` - Check if the spellcaster is celebrating
- `spellcaster.getState()` - Get current activity state (ATTACKING, SPELLCASTING, etc.)

From `MobEntityHelper`:

### Combat and AI
- `spellcaster.isAttacking()` - Check if currently attacking
- `spellcaster.isAiDisabled()` - Check if AI is disabled

From `LivingEntityHelper`:

### Health and Status
- `spellcaster.getHealth()` - Current health
- `spellcaster.getMaxHealth()` - Maximum health
- `spellcaster.getStatusEffects()` - List of active status effects
- `spellcaster.hasStatusEffect(id)` - Check for specific status effect

### Movement and State
- `spellcaster.isOnGround()` - Check if on ground
- `spellcaster.isBaby()` - Check if is baby variant

From `EntityHelper`:
- All position, movement, entity information, raytracing, and utility methods

---

## Usage Examples

### Spellcasting Detection System
```js
// Advanced spellcasting detection and alert system
class SpellcastingMonitor {
    constructor() {
        this.spellcasters = new Map();
        this.spellHistory = [];
        this.alertCooldowns = new Map();
    }

    updateSpellcasters() {
        const entities = World.getEntities();
        const currentTime = Client.getTime();

        entities.forEach(entity => {
            if (entity.is("minecraft:evoker", "minecraft:illusioner")) {
                const uuid = entity.getUUID();
                const name = entity.getName().getString();
                const isCasting = entity.isCastingSpell();
                const currentSpell = entity.getCastedSpell();
                const state = entity.getState();

                if (!this.spellcasters.has(uuid)) {
                    this.spellcasters.set(uuid, {
                        entity: entity,
                        name: name,
                        lastSpell: "NONE",
                        spellCount: 0,
                        dangerousSpells: 0,
                        startTime: currentTime
                    });
                    Chat.log(`&5Started tracking spellcaster: ${name}`);
                }

                const spellcasterData = this.spellcasters.get(uuid);

                // Track spell changes
                if (currentSpell !== spellcasterData.lastSpell) {
                    this.handleSpellChange(entity, name, currentSpell, spellcasterData.lastSpell);
                    spellcasterData.lastSpell = currentSpell;
                    spellcasterData.spellCount++;

                    if (this.isDangerousSpell(currentSpell)) {
                        spellcasterData.dangerousSpells++;
                    }
                }

                // Real-time spell monitoring
                if (isCasting) {
                    this.handleActiveSpellcasting(entity, name, currentSpell, state);
                }

                // Update visual indicators
                this.updateVisualEffects(entity, isCasting, currentSpell);
            }
        });

        // Clean up dead spellcasters
        this.cleanupDeadSpellcasters();
    }

    handleSpellChange(entity, name, newSpell, oldSpell) {
        const timestamp = Client.getTime();

        this.spellHistory.push({
            spellcaster: name,
            fromSpell: oldSpell,
            toSpell: newSpell,
            timestamp: timestamp,
            position: entity.getPos()
        });

        // Keep only recent spells
        if (this.spellHistory.length > 100) {
            this.spellHistory.shift();
        }

        const cooldownKey = `${name}_${newSpell}`;
        const lastAlert = this.alertCooldowns.get(cooldownKey) || 0;

        if (timestamp - lastAlert > 60) { // Prevent alert spam (3-second cooldown)
            this.announceSpellChange(name, oldSpell, newSpell);
            this.alertCooldowns.set(cooldownKey, timestamp);
        }
    }

    handleActiveSpellcasting(entity, name, spell, state) {
        const pos = entity.getPos();
        const distance = Player.getPlayer().distanceTo(entity);

        // Urgent warnings for dangerous spells
        if (this.isDangerousSpell(spell)) {
            this.createUrgentAlert(name, spell, pos, distance);
        }

        // State-specific behavior
        if (state === "SPELLCASTING") {
            this.createSpellcastingVisuals(entity, spell);
        }
    }

    isDangerousSpell(spell) {
        return ["SUMMON_VEX", "FANGS", "BLINDNESS", "DISAPPEAR"].includes(spell);
    }

    announceSpellChange(name, oldSpell, newSpell) {
        if (oldSpell === "NONE" && newSpell !== "NONE") {
            Chat.log(`&5${name} started casting: ${newSpell}`);
        } else if (newSpell === "NONE" && oldSpell !== "NONE") {
            Chat.log(`&a${name} finished casting: ${oldSpell}`);
        } else {
            Chat.log(`&7${name} spell changed: ${oldSpell} → ${newSpell}`);
        }
    }

    createUrgentAlert(name, spell, pos, distance) {
        let alertMessage = "";
        let alertColor = "";

        switch (spell) {
            case "SUMMON_VEX":
                alertMessage = `&c&l⚠️ ${name} SUMMONING VEXES at ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}!`;
                alertColor = 0xFF0000; // Red
                break;

            case "FANGS":
                alertMessage = `&c&l⚠️ ${name} casting FANGS! Move perpendicular to attack line!`;
                alertColor = 0xFF6600; // Orange
                break;

            case "BLINDNESS":
                alertMessage = `&8&l⚠️ ${name} casting BLINDNESS! Prepare milk!`;
                alertColor = 0x666666; // Gray
                break;

            case "DISAPPEAR":
                alertMessage = `&b&l⚠️ ${name} DISAPPEARING! Stay alert!`;
                alertColor = 0x0099CC; // Cyan
                break;
        }

        if (distance <= 32) { // Only urgent alerts for close threats
            Chat.actionbar(alertMessage);

            // Create visual alert
            this.createVisualAlert(pos, alertColor);
        }
    }

    createSpellcastingVisuals(entity, spell) {
        const pos = entity.getPos();
        const draw3D = Hud.createDraw3D();

        let color = 0x9933CC; // Default purple
        let radius = 2.0;

        switch (spell) {
            case "SUMMON_VEX":
                color = 0x990000; // Red
                radius = 3.0;
                break;
            case "FANGS":
                color = 0x996600; // Orange
                radius = 1.5;
                break;
            case "BLINDNESS":
                color = 0x666666; // Gray
                radius = 2.5;
                break;
            case "DISAPPEAR":
                color = 0x0099CC; // Cyan
                radius = 4.0;
                break;
        }

        // Create pulsing effect
        const pulseRadius = radius + Math.sin(Client.getTime() * 0.1) * 0.5;

        const spellIndicator = draw3D.box()
            .pos(pos.x - pulseRadius, pos.y, pos.z - pulseRadius,
                 pos.x + pulseRadius, pos.y + 2, pos.z + pulseRadius)
            .color(color, 128)
            .fillColor(color, 64)
            .fill(true)
            .cull(false)
            .build();
    }

    createVisualAlert(pos, color) {
        const draw3D = Hud.createDraw3D();

        // Create warning pillars
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI * 2 * i) / 4;
            const x = pos.x + Math.cos(angle) * 3;
            const z = pos.z + Math.sin(angle) * 3;

            const pillar = draw3D.box()
                .pos(x - 0.5, pos.y, z - 0.5, x + 0.5, pos.y + 4, z + 0.5)
                .color(color, 200)
                .fillColor(color, 100)
                .fill(true)
                .cull(false)
                .build();
        }
    }

    updateVisualEffects(entity, isCasting, spell) {
        if (isCasting) {
            entity.setGlowing(true);

            // Color based on spell danger
            if (this.isDangerousSpell(spell)) {
                entity.setGlowingColor(0xFF0000); // Red for dangerous
            } else {
                entity.setGlowingColor(0x9933CC); // Purple for regular spells
            }
        } else {
            entity.resetGlowing();
        }
    }

    cleanupDeadSpellcasters() {
        for (const [uuid, data] of this.spellcasters) {
            if (!data.entity.isAlive()) {
                const duration = Math.floor((Client.getTime() - data.startTime) / 20);
                Chat.log(`&7Spellcaster ${data.name} removed (${duration}s, ${data.spellCount} spells, ${data.dangerousSpells} dangerous)`);
                this.spellcasters.delete(uuid);
            }
        }
    }

    getSpellcastingReport() {
        Chat.log("=== Spellcasting Report ===");
        Chat.log(`Currently tracking: ${this.spellcasters.size} spellcasters`);

        const spellCounts = {};
        for (const [uuid, data] of this.spellcasters) {
            spellCounts[data.lastSpell] = (spellCounts[data.lastSpell] || 0) + 1;
        }

        Chat.log("\nCurrent Spells:");
        for (const [spell, count] of Object.entries(spellCounts)) {
            if (spell !== "NONE") {
                const danger = this.isDangerousSpell(spell) ? " &c(DANGER)" : "";
                Chat.log(`  ${spell}: ${count} spellcasters${danger}`);
            }
        }

        // Show most active spellcasters
        const sortedSpellcasters = Array.from(this.spellcasters.entries())
            .sort((a, b) => b[1].spellCount - a[1].spellCount)
            .slice(0, 3);

        Chat.log("\nMost Active Spellcasters:");
        sortedSpellcasters.forEach(([uuid, data]) => {
            const dangerPercent = Math.floor((data.dangerousSpells / data.spellCount) * 100);
            Chat.log(`  ${data.name}: ${data.spellCount} spells (${dangerPercent}% dangerous)`);
        });

        // Recent spell history
        Chat.log("\nRecent Spells (last 10):");
        const recentSpells = this.spellHistory.slice(-10);
        recentSpells.forEach(entry => {
            const timeAgo = Math.floor((Client.getTime() - entry.timestamp) / 20);
            Chat.log(`  ${entry.spellcaster}: ${entry.toSpell} (${timeAgo}s ago)`);
        });
    }
}

const spellMonitor = new SpellcastingMonitor();

// Monitor spellcasters every tick for immediate detection
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    spellMonitor.updateSpellcasters();
}));

// Report keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.s") {
        spellMonitor.getSpellcastingReport();
    }
}));
```

### Evoker-Specific Combat System
```js
// Specialized handling for evoker spellcasters
class EvokerCombatHandler {
    constructor() {
        this.evokers = new Map();
        this.vexAlerts = [];
        this.fangWarnings = [];
    }

    handleEvokerCombat() {
        const entities = World.getEntities();
        const player = Player.getPlayer();
        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:evoker")) {
                const evoker = entity;
                const uuid = entity.getUUID();
                const name = entity.getName().getString();
                const distance = player.distanceTo(evoker);
                const isCasting = evoker.isCastingSpell();
                const spell = evoker.getCastedSpell();

                if (distance <= 64) { // Only track nearby evokers
                    this.trackEvoker(uuid, evoker, name, distance, isCasting, spell);
                    this.handleEvokerSpells(evoker, name, spell, distance);
                    this.provideCombatAdvice(evoker, name, spell, distance);
                }
            }
        });

        this.cleanupEvokers();
        this.updateVexAlerts();
    }

    trackEvoker(uuid, evoker, name, distance, isCasting, spell) {
        if (!this.evokers.has(uuid)) {
            this.evokers.set(uuid, {
                entity: evoker,
                name: name,
                lastSpell: "NONE",
                summonCount: 0,
                fangCount: 0,
                totalSpells: 0,
                startTime: Client.getTime()
            });
            Chat.log(`&5Evoker ${name} detected at ${distance.toFixed(1)} blocks`);
        }

        const evokerData = this.evokers.get(uuid);

        // Track spell usage
        if (spell !== evokerData.lastSpell) {
            evokerData.lastSpell = spell;
            evokerData.totalSpells++;

            if (spell === "SUMMON_VEX") {
                evokerData.summonCount++;
                Chat.log(`&c${name} is summoning vexes! Total summons: ${evokerData.summonCount}`);
            } else if (spell === "FANGS") {
                evokerData.fangCount++;
                Chat.log(`&6${name} casting evoker fangs! Total fang casts: ${evokerData.fangCount}`);
            }
        }
    }

    handleEvokerSpells(evoker, name, spell, distance) {
        const pos = evoker.getPos();

        switch (spell) {
            case "SUMMON_VEX":
                this.handleVexSummoning(name, pos, distance);
                break;

            case "FANGS":
                this.handleFangAttack(name, pos, distance);
                break;

            case "WOLOLO":
                this.handleWololoSpell(name, pos);
                break;
        }
    }

    handleVexSummoning(name, pos, distance) {
        Chat.actionbar(`&4${name} summoning VEXES! Prepare for aerial combat!`);

        // Create warning zone
        this.createVexWarningZone(pos);

        // Check for existing vexes
        const entities = World.getEntities();
        let vexCount = 0;

        entities.forEach(entity => {
            if (entity.is("minecraft:vex")) {
                const vexDistance = Player.getPlayer().distanceTo(entity);
                if (vexDistance <= 32) {
                    vexCount++;
                }
            }
        });

        if (vexCount > 0) {
            Chat.log(`&cAlready ${vexCount} vexes nearby - be careful!`);
        }

        // Combat advice based on distance
        if (distance <= 8) {
            Chat.log("&4CRITICAL: Too close to summoning evoker!");
            Chat.log("→ Back away immediately or use knockback");
            Chat.log("→ Prepare splash potions or ranged attacks");
        } else if (distance <= 16) {
            Chat.log("&6DANGER: In effective summoning range");
            Chat.log("→ Use ranged weapons to interrupt");
            Chat.log("→ Consider blocking with shield");
        }
    }

    handleFangAttack(name, pos, distance) {
        Chat.actionbar(`&6${name} casting FANGS! Move perpendicular to attack line!`);

        // Predict fang line direction
        this.predictFangLine(name, pos);

        if (distance <= 12) {
            Chat.log("&6FANGS incoming! They will appear in a line from the evoker");
            Chat.log("→ Move sideways quickly to avoid the fang line");
            Chat.log("→ Jump over fangs if you can't dodge");
        }
    }

    handleWololoSpell(name, pos) {
        Chat.log(`&e${name} casting Wololo spell (sheep conversion)`);
        Chat.actionbar("&eHarmless spell - focus on the evoker!");
    }

    createVexWarningZone(pos) {
        const draw3D = Hud.createDraw3D();

        // Create danger zone for vex summoning
        const dangerZone = draw3D.box()
            .pos(pos.x - 4, pos.y - 1, pos.z - 4, pos.x + 4, pos.y + 3, pos.z + 4)
            .color(0x990000, 128) // Red danger zone
            .fillColor(0x990000, 32)
            .fill(true)
            .cull(false)
            .build();

        // Create summoning circles
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const x = pos.x + Math.cos(angle) * 2;
            const z = pos.z + Math.sin(angle) * 2;

            const circle = draw3D.box()
                .pos(x - 0.5, pos.y, z - 0.5, x + 0.5, pos.y + 2, z + 0.5)
                .color(0xFF0000, 200)
                .fillColor(0xFF0000, 100)
                .fill(true)
                .cull(false)
                .build();
        }
    }

    predictFangLine(name, pos) {
        const player = Player.getPlayer();
        const playerPos = player.getPos();

        // Calculate direction from evoker to player
        const direction = {
            x: playerPos.x - pos.x,
            z: playerPos.z - pos.z
        };

        const length = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
        direction.x /= length;
        direction.z /= length;

        // Create visual prediction line
        this.createFangPredictionLine(pos, direction);

        Chat.log("&6Fang line direction: " +
                 (direction.x > 0 ? "East" : "West") + " " +
                 (direction.z > 0 ? "South" : "North"));
    }

    createFangPredictionLine(startPos, direction) {
        const draw3D = Hud.createDraw3D();

        // Create boxes along predicted fang line
        for (let i = 1; i <= 8; i++) {
            const x = startPos.x + direction.x * i * 1.5;
            const z = startPos.z + direction.z * i * 1.5;

            const fangBox = draw3D.box()
                .pos(x - 0.5, startPos.y, z - 0.5, x + 0.5, startPos.y + 1, z + 0.5)
                .color(0xFF6600, 150) // Orange
                .fillColor(0xFF6600, 75)
                .fill(true)
                .cull(false)
                .build();
        }
    }

    provideCombatAdvice(evoker, name, spell, distance) {
        if (evoker.isCastingSpell()) {
            // Advice for when evoker is casting
            switch (spell) {
                case "SUMMON_VEX":
                    if (distance <= 16) {
                        Chat.actionbar("&4Use ranged weapons or back away!");
                    }
                    break;

                case "FANGS":
                    Chat.actionbar("&6Move sideways to dodge fangs!");
                    break;

                default:
                    Chat.actionbar("&5Evoker casting - stay alert!");
            }
        } else {
            // Advice for when evoker is not casting
            if (distance <= 8) {
                Chat.actionbar("&aSafe to attack - evoker not casting!");
            } else if (distance <= 16) {
                Chat.actionbar("&2Approach carefully - watch for spellcasting!");
            }
        }
    }

    cleanupEvokers() {
        for (const [uuid, data] of this.evokers) {
            if (!data.entity.isAlive()) {
                const duration = Math.floor((Client.getTime() - data.startTime) / 20);
                Chat.log(`&7Evoker ${data.name} defeated after ${duration}s!`);
                Chat.log(`  Spells cast: ${data.totalSpells} (Vex: ${data.summonCount}, Fangs: ${data.fangCount})`);
                this.evokers.delete(uuid);
            }
        }
    }

    updateVexAlerts() {
        // Update any existing vex alerts
        this.vexAlerts = this.vexAlerts.filter(alert => {
            return (Client.getTime() - alert.timestamp) < 60; // Remove old alerts
        });
    }

    getEvokerReport() {
        Chat.log("=== Evoker Combat Report ===");
        Chat.log(`Currently tracking: ${this.evokers.size} evokers`);

        for (const [uuid, data] of this.evokers) {
            const pos = data.entity.getPos();
            const distance = Player.getPlayer().distanceTo(data.entity);
            const isActive = data.entity.isCastingSpell();

            Chat.log(`\n${data.name}:`);
            Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);
            Chat.log(`  Currently casting: ${isActive ? "YES (" + data.lastSpell + ")" : "NO"}`);
            Chat.log(`  Spells cast: ${data.totalSpells}`);
            Chat.log(`  Vex summons: ${data.summonCount}`);
            Chat.log(`  Fang attacks: ${data.fangCount}`);

            const dangerLevel = this.calculateEvokerDanger(data);
            Chat.log(`  Threat level: ${dangerLevel}`);
        }
    }

    calculateEvokerDanger(evokerData) {
        const spellRate = evokerData.totalSpells / (Client.getTime() - evokerData.startTime) * 20;
        const dangerRatio = evokerData.summonCount + (evokerData.fangCount * 1.5);

        if (dangerRatio >= 5 || spellRate > 0.1) return "&cHIGH";
        if (dangerRatio >= 2 || spellRate > 0.05) return "&6MEDIUM";
        return "&aLOW";
    }
}

const evokerHandler = new EvokerCombatHandler();

// Handle evoker combat every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    evokerHandler.handleEvokerCombat();
}));

// Evoker report keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.e") {
        evokerHandler.getEvokerReport();
    }
}));
```

### Illusioner Special Handling
```js
// Specialized handling for illusioner spellcasters
function handleIllusionerCombat() {
    const entities = World.getEntities();
    const player = Player.getPlayer();
    if (!player) return;

    entities.forEach(entity => {
        if (entity.is("minecraft:illusioner")) {
            const illusioner = entity;
            const name = entity.getName().getString();
            const distance = player.distanceTo(illusioner);
            const isCasting = illusioner.isCastingSpell();
            const spell = illusioner.getCastedSpell();
            const state = illusioner.getState();

            if (distance <= 48) {
                // Visual indication
                illusioner.setGlowing(true);
                illusioner.setGlowingColor(0x0099CC); // Cyan for illusioners

                Chat.log(`&b${name}: ${state} | Casting: ${isCasting ? spell + "!" : "No"}`);

                if (isCasting) {
                    handleIllusionerSpells(illusioner, name, spell, distance);
                }

                // Special detection for disappearing illusioners
                if (spell === "DISAPPEAR") {
                    Chat.log(`&b&l${name} is disappearing! Stay alert for reappearances!`);
                    Chat.actionbar("&bIllusioner using invisibility - watch for attacks!");

                    // Create warning effect
                    createIllusionerWarning(illusioner.getPos());
                }

                // Check for blindness
                if (spell === "BLINDNESS") {
                    Chat.log(`&8${name} casting blindness! Have milk ready!`);
                    Chat.actionbar("&8Blindness incoming - prepare milk!");

                    // Check if player already has blindness
                    if (player.asLiving().hasStatusEffect("minecraft:blindness")) {
                        Chat.log("&8You're already blinded - use milk or wait!");
                    }
                }
            }
        }
    });
}

function createIllusionerWarning(pos) {
    const draw3D = Hud.createDraw3D();

    // Create disappearing effect
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const radius = 2 + Math.sin(Client.getTime() * 0.1) * 0.5;
        const x = pos.x + Math.cos(angle) * radius;
        const z = pos.z + Math.sin(angle) * radius;

        const particle = draw3D.box()
            .pos(x - 0.2, pos.y, z - 0.2, x + 0.2, pos.y + 2, z + 0.2)
            .color(0x0099CC, 100)
            .fillColor(0x0099CC, 50)
            .fill(true)
            .cull(false)
            .build();
    }
}

// Monitor illusioners every tick
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    handleIllusionerCombat();
}));
```

---

## Combat Strategies

### General Spellcaster Combat Tips
```js
// AI-assisted combat advice for spellcasters
function getSpellcasterCombatAdvice(spellcaster, spell, distance) {
    const advice = [];

    // Distance-based advice
    if (distance <= 8) {
        advice.push("CRITICAL: Too close to spellcaster!");

        if (spell === "SUMMON_VEX") {
            advice.push("→ Use knockback sword to interrupt");
            advice.push("→ Drink fire resistance immediately");
        } else if (spell === "FANGS") {
            advice.push("→ Jump and move sideways quickly");
        }
    } else if (distance <= 16) {
        advice.push("DANGER: In spellcasting range");
        advice.push("→ Use ranged weapons when possible");
        advice.push("→ Keep shield ready");
    } else {
        advice.push("SAFE: Good distance for ranged combat");
        advice.push("→ Use bow or crossbow");
    }

    // Spell-specific advice
    switch (spell) {
        case "SUMMON_VEX":
            advice.push("VEX COMBAT: Use area damage weapons");
            advice.push("→ Iron golems are effective against vexes");
            advice.push("→ Block with shield when vexes attack");
            break;

        case "FANGS":
            advice.push("FANGS: Move perpendicular to evoker");
            advice.push("→ Fangs appear in straight line");
            advice.push("→ Jump over fangs if dodging fails");
            break;

        case "BLINDNESS":
            advice.push("BLINDNESS: Have milk buckets ready");
            advice.push("→ Milk immediately removes blindness");
            advice.push("→ Consider retreating until effect wears off");
            break;

        case "DISAPPEAR":
            advice.push("DISAPPEAR: Stay alert for sneak attacks");
            advice.push("→ Listen for bow draw sounds");
            advice.push("→ Keep walls to your back");
            break;
    }

    // Equipment recommendations
    advice.push("RECOMMENDED GEAR:");
    advice.push("→ Shield (blocks spells and vex attacks)");
    advice.push("→ Ranged weapon (bow/crossbow)");
    advice.push("→ Iron golem or wolves for distraction");
    advice.push("→ Milk buckets (for blindness)");
    advice.push("→ Fire resistance (for vexes)");

    return advice;
}

// Usage example
function displayCombatAdvice(spellcaster) {
    const spell = spellcaster.getCastedSpell();
    const distance = Player.getPlayer().distanceTo(spellcaster);
    const advice = getSpellcasterCombatAdvice(spellcaster, spell, distance);

    Chat.log("&6=== SPELLCASTER COMBAT ADVICE ===");
    advice.forEach(line => Chat.log(line));
}

// Bind to key for quick advice
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.h") {
        const entities = World.getEntities();
        const player = Player.getPlayer();

        for (const entity of entities) {
            if (entity.is("minecraft:evoker", "minecraft:illusioner")) {
                const distance = player.distanceTo(entity);
                if (distance <= 32) {
                    displayCombatAdvice(entity);
                    break; // Only show advice for closest spellcaster
                }
            }
        }
    }
}));
```

## Notes and Limitations

- **Type Safety:** SpellcastingIllagerEntityHelper instances can be null if the entity is removed. Always check for validity before accessing methods.
- **Spell Detection:** Spell detection may have slight delays due to client-server communication. Use state changes as early warnings.
- **Inherited Functionality:** This class inherits comprehensive methods from IllagerEntityHelper, MobEntityHelper, LivingEntityHelper, and EntityHelper for complete entity management.
- **Server-Side Variations:** Some spell behaviors and timings may vary based on server-side implementations and Minecraft versions.
- **Performance Considerations:** Monitoring many spellcasters with frequent spell checks can impact performance. Use appropriate update intervals and visual effects sparingly.
- **Multiplayer Context:** Be aware that other players may also be fighting the same spellcasters, so coordinate attacks and avoid interfering with others' combat.

## Related Classes

- `IllagerEntityHelper` - Parent class with illager-specific functionality
- `MobEntityHelper` - Grandparent class with mob-specific methods
- `LivingEntityHelper` - Great-grandparent class with living entity methods
- `EntityHelper` - Base class with entity methods
- `VindicatorEntityHelper` - For melee-focused illagers
- `PillagerEntityHelper` - For ranged weapon illagers
- `PlayerEntityHelper` - Player entity for comparison and interaction
- `VexEntityHelper` - For summoned vex entities

## Version Information

- Available since JSMacros 1.8.4
- Extends IllagerEntityHelper with spellcasting-specific methods
- Spell identification matches Minecraft spell types for accurate threat assessment
- Designed for evokers and illusioners but may work with custom spellcasting entities