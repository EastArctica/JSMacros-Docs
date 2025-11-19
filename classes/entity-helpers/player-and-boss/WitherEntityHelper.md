# WitherEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.boss.WitherEntityHelper`

**Extends:** `MobEntityHelper<WitherEntity>`

**Extends Chain:** `WitherEntityHelper` → `MobEntityHelper` → `LivingEntityHelper` → `EntityHelper` → `BaseHelper<Entity>`

Represents a Wither boss entity in the world. WitherEntityHelper provides access to wither-specific behaviors, phases, and invulnerability states that are unique to the Wither boss mob. This specialized helper allows you to monitor the wither's combat phases, track its invulnerability periods, and understand its two-phase attack pattern.

The Wither is a three-headed boss mob that goes through distinct phases: an initial invulnerable summoning phase and a second combat phase where it becomes immune to projectiles and aggressively pursues players. This class provides methods to track these states and respond appropriately during wither encounters.

Instances are typically obtained from entity events, world entity queries, or by casting existing entity helpers that represent Withers.

## Constructors

WitherEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`)
- World entity queries and filters
- Type casting from generic `EntityHelper` instances

```js
// Method 1: From entity events
JsMacros.on("EntityDeath", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:wither")) {
        const wither = entity; // Already properly typed
        Chat.log(`Wither died! Was in second phase: ${wither.isSecondPhase()}`);
    }
}));

// Method 2: From world queries
const entities = World.getEntities();
for (const entity of entities) {
    if (entity.is("minecraft:wither")) {
        const wither = entity; // Already properly typed
        const invulnerableTime = wither.getRemainingInvulnerableTime();
        Chat.log(`Found wither with ${invulnerableTime} ticks of invulnerability remaining`);
    }
}

// Method 3: Type casting (if needed)
const genericEntity = event.getEntity();
if (genericEntity.is("minecraft:wither")) {
    const wither = genericEntity; // JSMacros handles this automatically
}
```

## Methods
- [wither.getRemainingInvulnerableTime()](#withergetremaininginvulnerabletime)
- [wither.isInvulnerable()](#witherisinvulnerable)
- [wither.isFirstPhase()](#witherisfirstphase)
- [wither.isSecondPhase()](#witherissecondphase)

---

## Usage Examples

### Complete Wither Fight Assistant
```js
class WitherFightAssistant {
    constructor() {
        this.activeWither = null;
        this.combatLog = [];
        this.startTime = null;
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        JsMacros.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:wither")) {
                this.startFight(entity);
            }
        }));

        JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
            this.updateFightStatus();
        }));

        JsMacros.on("EntityDeath", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:wither")) {
                this.endFight(entity);
            }
        }));
    }

    startFight(wither) {
        this.activeWither = wither;
        this.startTime = Date.now();
        this.combatLog = [];

        Chat.log("&8💜 === WITHER FIGHT STARTED ===");
        Chat.log("&7Health: " + wither.getHealth() + "/" + wither.getMaxHealth());
        Chat.log("&7Position: " + this.formatPosition(wither.getPos()));

        if (wither.isInvulnerable()) {
            const invulnerableTime = wither.getRemainingInvulnerableTime();
            Chat.log("&c⚡ Wither is invulnerable for " + Math.ceil(invulnerableTime / 20) + " seconds");
            this.addLogEntry("Wither spawned with " + invulnerableTime + " ticks invulnerability");
        }

        this.addLogEntry("Fight started at " + new Date().toLocaleTimeString());
    }

    updateFightStatus() {
        if (!this.activeWither || !this.activeWither.isAlive()) return;
        if (Client.getTime() % 40 !== 0) return; // Update every 2 seconds

        const wither = this.activeWither;
        const health = wither.getHealth();
        const maxHealth = wither.getMaxHealth();
        const healthPercent = (health / maxHealth) * 100;

        // Combat status display
        let phaseInfo = "";
        if (wither.isInvulnerable()) {
            phaseInfo = "&cInvulnerable";
        } else if (wither.isFirstPhase()) {
            phaseInfo = "&9Phase 1 (Ranged)";
        } else {
            phaseInfo = "&6Phase 2 (Melee)";
        }

        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;

        Chat.actionbar(
            "💜 " + phaseInfo + " &8| " +
            "&c♥ " + health.toFixed(0) + "/" + maxHealth.toFixed(0) + " &8(" + healthPercent.toFixed(0) + "%) &8| " +
            "&7" + minutes + ":" + seconds.toString().padStart(2, '0')
        );

        // Log significant events
        if (healthPercent <= 50 && !this.halfHealthLogged) {
            Chat.log("&eWither at 50% health - halfway to victory!");
            this.addLogEntry("Wither reached 50% health");
            this.halfHealthLogged = true;
        }

        if (healthPercent <= 25 && !this.quarterHealthLogged) {
            Chat.log("&6Wither at 25% health - victory is near!");
            this.addLogEntry("Wither reached 25% health");
            this.quarterHealthLogged = true;
        }
    }

    endFight(wither) {
        const fightDuration = Date.now() - this.startTime;
        const minutes = Math.floor(fightDuration / 60000);
        const seconds = Math.floor((fightDuration % 60000) / 1000);

        Chat.log("&a💜 === WITHER DEFEATED ===");
        Chat.log("&7Fight duration: " + minutes + ":" + seconds.toString().padStart(2, '0'));
        Chat.log("&7Final position: " + this.formatPosition(wither.getPos()));

        // Calculate combat statistics
        this.generateCombatReport(fightDuration);

        this.activeWither = null;
    }

    generateCombatReport(duration) {
        Chat.log("&6=== Combat Report ===");
        Chat.log("&7Duration: " + Math.floor(duration / 1000) + " seconds");
        Chat.log("&7Log entries: " + this.combatLog.length);

        // Phase analysis (would require more detailed tracking in a real implementation)
        if (this.combatLog.some(entry => entry.includes("Phase 2"))) {
            Chat.log("&7Phases completed: 1 (Ranged) + 2 (Melee)");
        } else {
            Chat.log("&7Defeated during Phase 1 - exceptional ranged combat!");
        }

        Chat.log("&7Victory achieved! Nether Star dropped!");
    }

    addLogEntry(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.combatLog.push({
            time: timestamp,
            message: message
        });
    }

    formatPosition(pos) {
        return "[" + pos.x.toFixed(0) + ", " + pos.y.toFixed(0) + ", " + pos.z.toFixed(0) + "]";
    }
}

// Start the wither fight assistant
const fightAssistant = new WitherFightAssistant();
Chat.log("&8💜 Wither Fight Assistant ready!");
```

### Wither Difficulty Assessment
```js
function assessWitherDifficulty() {
    const withers = World.getEntities("minecraft:wither");
    if (withers.length === 0) {
        Chat.log("&7No withers found in vicinity");
        return;
    }

    const wither = withers[0];
    const player = Player.getPlayer();
    const distance = player.distanceTo(wither);

    Chat.log("&6=== Wither Difficulty Assessment ===");

    // Distance-based difficulty
    let distanceRating = "";
    if (distance < 20) {
        distanceRating = "&cEXTREME - Too close! Get to safety!";
    } else if (distance < 40) {
        distanceRating = "&6HARD - Prepare for immediate combat!";
    } else if (distance < 80) {
        distanceRating = "&eMEDIUM - Time to prepare strategy";
    } else {
        distanceRating = "&aEASY - Safe distance to observe and plan";
    }

    Chat.log("Distance: " + distance.toFixed(1) + "m - " + distanceRating);

    // Phase-based difficulty
    let phaseRating = "";
    if (wither.isInvulnerable()) {
        const invulnerableTime = wither.getRemainingInvulnerableTime();
        phaseRating = "&7Safe for " + Math.ceil(invulnerableTime / 20) + "s (Invulnerable)";
    } else if (wither.isFirstPhase()) {
        phaseRating = "&9MODERATE - Phase 1 (Vulnerable to projectiles)";
    } else {
        phaseRating = "&4EXTREME - Phase 2 (Immune to projectiles, aggressive)";
    }

    Chat.log("Phase: " + phaseRating);

    // Equipment recommendations
    Chat.log("\n&6Recommended Equipment:");
    if (wither.isFirstPhase()) {
        Chat.log("  🏹 Bow with Power V or Infinity");
        Chat.log("  🛡️ Shield to block explosions");
        Chat.log("  🏺 Arrows (lots of them)");
    } else {
        Chat.log("  ⚔️ Diamond/Netherite sword with Sharpness");
        Chat.log("  🛡️ Shield for emergency blocking");
        Chat.log("  🧪 Splash potions of Healing");
    }

    Chat.log("  💊 Golden Apples (for Wither effect)");
    Chat.log("  🍖 High-saturation food for long fight");

    // Overall difficulty score
    let difficultyScore = 0;

    // Distance scoring (closer = harder)
    if (distance < 20) difficultyScore += 40;
    else if (distance < 40) difficultyScore += 30;
    else if (distance < 80) difficultyScore += 20;
    else difficultyScore += 10;

    // Phase scoring
    if (wither.isInvulnerable()) difficultyScore += 0; // Actually easier
    else if (wither.isFirstPhase()) difficultyScore += 25;
    else difficultyScore += 40; // Phase 2 is hardest

    let overallRating = "";
    if (difficultyScore < 30) overallRating = "&aEASY";
    else if (difficultyScore < 50) overallRating = "&eMODERATE";
    else if (difficultyScore < 70) overallRating = "&6HARD";
    else overallRating = "&cEXTREME";

    Chat.log("\nOverall Difficulty: " + overallRating + " (Score: " + difficultyScore + "/80)");
}

// Run assessment
assessWitherDifficulty();
```

## Inherited Methods

From `MobEntityHelper`:
- `isAttacking()` - Returns whether the wither is currently attacking
- `isAiDisabled()` - Returns whether the wither's AI is disabled

From `LivingEntityHelper`:
- `getHealth()` - Returns the wither's current health
- `getMaxHealth()` - Returns the wither's maximum health (typically 300)
- `getStatusEffects()` - Returns active status effects (including Wither effect)
- `isAlive()` - Returns whether the wither is alive
- All other living entity methods (movement, position, equipment, etc.)

From `EntityHelper`:
- `getPos()` - Returns the wither's position
- `getType()` - Returns "minecraft:wither"
- `is(type, ...)` - Type checking method
- `getName()` - Returns the wither's display name
- `distanceTo(target)` - Calculates distance to targets
- All other general entity methods

## Notes and Limitations

- WitherEntityHelper instances become invalid when the wither is killed or despawned. Always check `isAlive()` before accessing wither data.
- The wither's invulnerability period is always 220 ticks (11 seconds) when first summoned, but `getRemainingInvulnerableTime()` can track the countdown.
- Phase transitions are determined by the wither's internal state and may not always align perfectly with health thresholds.
- In the second phase, the wither becomes immune to all projectile damage, including arrows, snowballs, and splash potions.
- The wither's three heads can attack independently and have separate targeting logic - this class represents the entire wither entity.
- Wither skulls fired by the wither are separate entities and should be tracked separately for dodging purposes.
- The wither's behavior may vary slightly between different Minecraft versions, but the basic phase mechanics remain consistent.
- Multiple withers can be active simultaneously, and each will have independent phase timers and health pools.

## Related Classes

- `MobEntityHelper` - Parent class with mob-specific methods
- `LivingEntityHelper` - Base class for living entities with health and movement
- `EntityHelper` - Base entity class with position and utility methods
- `WitherSkullEntityHelper` - For tracking wither projectile attacks
- `Pos3D` - 3D position and vector mathematics
- `StatusEffectHelper` - For managing Wither effect and other status effects
- `World` - For finding and querying wither entities
- `JsMacros` - For event handling and script management

## Version Information

- Available since JSMacros 1.8.4
- Full integration with Minecraft's wither boss mechanics
- Phase detection and invulnerability tracking implemented
- Inherits all functionality from MobEntityHelper, LivingEntityHelper, and EntityHelper