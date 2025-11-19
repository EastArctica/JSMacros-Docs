# WardenEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.WardenEntityHelper<WardenEntity>`

**Extends:** `MobEntityHelper<WardenEntity>`

Represents a Warden entity in the world. WardenEntityHelper provides access to warden-specific properties and behaviors such as anger levels, pose states, and special attack animations. This class serves as a specialized helper for interacting with one of Minecraft's most formidable hostile mobs.

The Warden is a blind but powerful mob that detects players through vibrations and scent. It has unique behaviors including emerging from the ground, sniffing to detect targets, roaring, charging sonic boom attacks, and digging back into the ground when not pursuing targets. The Warden's anger system determines its aggression level toward targets.

This class extends `MobEntityHelper` and inherits all methods for health, movement, AI control, and other mob properties, while adding warden-specific functionality for monitoring and responding to the Warden's unique behaviors.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

WardenEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`)
- World entity queries where the entity type is `minecraft:warden`
- Type casting from EntityHelper using the internal entity type recognition system
- The EntityHelper's internal automatic casting when encountering Warden entities

---

## Methods

## Usage Examples

### Comprehensive Warden Monitoring System
```js
// Complete warden behavior tracking and threat assessment
class WardenTracker {
    constructor() {
        this.activeWardens = new Map();
        this.alertHistory = new Map();
        this.dangerLevel = "SAFE";
    }

    trackWarden(entity) {
        const warden = entity.asLiving();
        if (!warden) return;

        const uuid = entity.getUUID();
        const name = entity.getName().getString();
        const pos = entity.getPos();
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(entity);
        const anger = warden.getAnger();

        // Determine current warden state
        const state = {
            isDigging: warden.isDigging(),
            isEmerging: warden.isEmerging(),
            isRoaring: warden.isRoaring(),
            isSniffing: warden.isSniffing(),
            isChargingSonicBoom: warden.isChargingSonicBoom()
        };

        const currentState = this.getWardenStateString(state);
        const threatLevel = this.calculateThreatLevel(distance, anger, state);

        // Update or create warden tracking
        if (!this.activeWardens.has(uuid)) {
            Chat.log(`&c⚠️ NEW WARDEN DETECTED: ${name}`);
            this.activeWardens.set(uuid, {
                entity: entity,
                name: name,
                firstSeen: Client.getTime(),
                lastPosition: pos,
                peakAnger: anger,
                stateHistory: [],
                threatHistory: []
            });
        }

        const tracking = this.activeWardens.get(uuid);
        tracking.lastPosition = pos;
        tracking.currentAnger = anger;
        tracking.currentState = currentState;
        tracking.threatLevel = threatLevel;
        tracking.peakAnger = Math.max(tracking.peakAnger, anger);

        // Add to state history
        tracking.stateHistory.push({
            time: Client.getTime(),
            state: currentState,
            anger: anger,
            distance: distance
        });

        // Keep history manageable
        if (tracking.stateHistory.length > 100) {
            tracking.stateHistory.shift();
        }

        // Generate appropriate alerts
        this.generateAlerts(tracking, uuid);

        // Update global danger level
        this.updateDangerLevel();
    }

    getWardenStateString(state) {
        const states = [];
        if (state.isEmerging) states.push("EMERGING");
        if (state.isDigging) states.push("DIGGING");
        if (state.isRoaring) states.push("ROARING");
        if (state.isChargingSonicBoom) states.push("SONIC_BOOM");
        if (state.isSniffing) states.push("SNIFFING");
        return states.length > 0 ? states.join(",") : "IDLE";
    }

    calculateThreatLevel(distance, anger, state) {
        let threat = 0;

        // Distance threat (closer = more dangerous)
        if (distance < 8) threat += 50;
        else if (distance < 16) threat += 30;
        else if (distance < 32) threat += 15;
        else if (distance < 64) threat += 5;

        // Anger threat
        threat += Math.min(anger, 100);

        // State-based threat multipliers
        if (state.isChargingSonicBoom) threat += 40;
        if (state.isRoaring) threat += 30;
        if (state.isEmerging) threat += 25;
        if (state.isSniffing) threat += 20;
        if (state.isDigging) threat -= 10; // Digging is less dangerous

        return Math.min(threat, 150); // Cap at 150
    }

    generateAlerts(tracking, uuid) {
        const currentTime = Client.getTime();
        const alertKey = `${uuid}_${tracking.currentState}`;

        // Rate limit alerts
        if (this.alertHistory.has(alertKey)) {
            const lastAlert = this.alertHistory.get(alertKey);
            if (currentTime - lastAlert < 60) { // 3 second cooldown
                return;
            }
        }

        this.alertHistory.set(alertKey, currentTime);

        const distance = Player.getPlayer().distanceTo(tracking.entity);
        const anger = tracking.currentAnger;
        const state = tracking.currentState;

        // Critical alerts
        if (tracking.threatLevel >= 120) {
            Chat.actionbar("&4&l&nCRITICAL THREAT - WARDEN ATTACKING!");
            Chat.log(`&4&l=== CRITICAL WARDEN ALERT ===`);
            Chat.log(`&cState: ${state}`);
            Chat.log(`&cAnger: ${anger}`);
            Chat.log(`&cDistance: ${distance.toFixed(1)}m`);
            Chat.log(`&cPosition: [${tracking.lastPosition.x.toFixed(0)}, ${tracking.lastPosition.y.toFixed(0)}, ${tracking.lastPosition.z.toFixed(0)}]`);

            if (state.includes("SONIC_BOOM")) {
                Chat.log(`&4&lSONIC BOOM - BREAK LINE OF SIGHT NOW!`);
            }

        } else if (tracking.threatLevel >= 80) {
            Chat.actionbar("&c&lHIGH THREAT - Warden is very dangerous!");

        } else if (tracking.threatLevel >= 50) {
            Chat.actionbar("&eMODERATE THREAT - Warden is hostile");

        } else if (tracking.threatLevel >= 25) {
            Chat.actionbar("&7LOW THREAT - Warden is suspicious");
        }

        // State-specific alerts
        if (state.includes("SONIC_BOOM")) {
            Chat.log(`&4&l⚠️ SONIC BOOM CHARGING - ${distance.toFixed(1)}m away!`);
        } else if (state.includes("EMERGING")) {
            Chat.log(`&c⚠️ Warden emerging - prepare for fight!`);
        } else if (state.includes("ROARING")) {
            Chat.log(`&c⚠️ Warden roaring - area damage imminent!`);
        } else if (state.includes("SNIFFING") && anger > 50) {
            Chat.log(`&e⚠️ Warden sniffing and angry - it knows you're here!`);
        }
    }

    updateDangerLevel() {
        let maxThreat = 0;
        for (const tracking of this.activeWardens.values()) {
            maxThreat = Math.max(maxThreat, tracking.threatLevel);
        }

        let newLevel;
        if (maxThreat >= 120) newLevel = "CRITICAL";
        else if (maxThreat >= 80) newLevel = "HIGH";
        else if (maxThreat >= 50) newLevel = "MODERATE";
        else if (maxThreat >= 25) newLevel = "LOW";
        else newLevel = "SAFE";

        if (newLevel !== this.dangerLevel) {
            this.dangerLevel = newLevel;
            Chat.log(`&6=== WARDEN THREAT LEVEL: ${this.dangerLevel} ===`);
        }
    }

    generateStatusReport() {
        if (this.activeWardens.size === 0) {
            Chat.log("No active wardens in tracking range");
            return;
        }

        Chat.log(`&6=== WARDEN STATUS REPORT (${this.activeWardens.size} wardens) ===`);
        Chat.log(`&6Overall Threat Level: ${this.dangerLevel}`);

        for (const [uuid, tracking] of this.activeWardens) {
            const duration = (Client.getTime() - tracking.firstSeen) / 20;
            Chat.log(`\n&e${tracking.name}:`);
            Chat.log(`  State: ${tracking.currentState}`);
            Chat.log(`  Anger: ${tracking.currentAnger}/${tracking.peakAnger}`);
            Chat.log(`  Threat: ${tracking.threatLevel}/150`);
            Chat.log(`  Distance: ${Player.getPlayer().distanceTo(tracking.entity).toFixed(1)}m`);
            Chat.log(`  Tracking duration: ${duration.toFixed(0)}s`);
            Chat.log(`  Position: [${tracking.lastPosition.x.toFixed(0)}, ${tracking.lastPosition.y.toFixed(0)}, ${tracking.lastPosition.z.toFixed(0)}]`);
        }
    }

    cleanup() {
        // Remove tracking for dead entities
        for (const [uuid, tracking] of this.activeWardens) {
            if (!tracking.entity.isAlive()) {
                const duration = (Client.getTime() - tracking.firstSeen) / 20;
                Chat.log(`&7${tracking.name} disappeared after ${duration.toFixed(0)}s (Peak anger: ${tracking.peakAnger})`);
                this.activeWardens.delete(uuid);
            }
        }

        // Clean old alert history
        const currentTime = Client.getTime();
        for (const [key, time] of this.alertHistory) {
            if (currentTime - time > 300) { // 15 second cleanup
                this.alertHistory.delete(key);
            }
        }
    }
}

const wardenTracker = new WardenTracker();

// Main tracking loop
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const trackingRange = 96;

    entities.forEach(entity => {
        if (entity.is("minecraft:warden") && player.distanceTo(entity) <= trackingRange) {
            wardenTracker.trackWarden(entity);
        }
    });

    // Cleanup every 5 seconds
    if (Client.getTime() % 100 === 0) {
        wardenTracker.cleanup();
    }
}));

// Status command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.w" && e.action === 1) { // W key
        wardenTracker.generateStatusReport();
    }
}));
```

### Warden Behavior Analysis
```js
// Analyze warden patterns and behaviors
function analyzeWardenBehavior() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const wardens = entities.filter(entity => entity.is("minecraft:warden"));

    if (wardens.length === 0) {
        Chat.log("No wardens found in the area");
        return;
    }

    Chat.log(`=== Warden Behavior Analysis (${wardens.length} wardens) ===`);

    const stats = {
        total: wardens.length,
        emerging: 0,
        digging: 0,
        roaring: 0,
        sniffing: 0,
        chargingSonicBoom: 0,
        idle: 0,
        highAnger: 0,
        mediumAnger: 0,
        lowAnger: 0,
        byDistance: { near: 0, medium: 0, far: 0 }
    };

    wardens.forEach(warden => {
        const living = warden.asLiving();
        const distance = player.distanceTo(warden);
        const pos = warden.getPos();
        const anger = living.getAnger();

        // Count behaviors
        if (living.isEmerging()) stats.emerging++;
        if (living.isDigging()) stats.digging++;
        if (living.isRoaring()) stats.roaring++;
        if (living.isSniffing()) stats.sniffing++;
        if (living.isChargingSonicBoom()) stats.chargingSonicBoom++;

        // Count idle (no special behavior)
        if (!living.isEmerging() && !living.isDigging() && !living.isRoaring() &&
            !living.isSniffing() && !living.isChargingSonicBoom()) {
            stats.idle++;
        }

        // Count anger levels
        if (anger >= 80) stats.highAnger++;
        else if (anger >= 40) stats.mediumAnger++;
        else stats.lowAnger++;

        // Distance categories
        if (distance <= 20) stats.byDistance.near++;
        else if (distance <= 50) stats.byDistance.medium++;
        else stats.byDistance.far++;

        // Detailed logging for nearby wardens
        if (distance <= 64) {
            const behaviors = [];
            if (living.isEmerging()) behaviors.push("Emerging");
            if (living.isDigging()) behaviors.push("Digging");
            if (living.isRoaring()) behaviors.push("Roaring");
            if (living.isSniffing()) behaviors.push("Sniffing");
            if (living.isChargingSonicBoom()) behaviors.push("Charging Sonic Boom");

            Chat.log(`  ${warden.getName().getString()}: ${distance.toFixed(1)}m - Anger: ${anger} - ${behaviors.join(", ") || "Idle"}`);
        }
    });

    // Summary statistics
    Chat.log("\n=== Behavioral Summary ===");
    Chat.log(`Total wardens: ${stats.total}`);
    Chat.log(`Emerging: ${stats.emerging}`);
    Chat.log(`Digging: ${stats.digging}`);
    Chat.log(`Roaring: ${stats.roaring}`);
    Chat.log(`Sniffing: ${stats.sniffing}`);
    Chat.log(`Charging Sonic Boom: ${stats.chargingSonicBoom}`);
    Chat.log(`Idle: ${stats.idle}`);

    Chat.log("\n=== Anger Levels ===");
    Chat.log(`High anger (80+): ${stats.highAnger}`);
    Chat.log(`Medium anger (40-79): ${stats.mediumAnger}`);
    Chat.log(`Low anger (<40): ${stats.lowAnger}`);

    Chat.log("\n=== By Distance ===");
    Chat.log(`Near (≤20m): ${stats.byDistance.near}`);
    Chat.log(`Medium (20-50m): ${stats.byDistance.medium}`);
    Chat.log(`Far (>50m): ${stats.byDistance.far}`);

    // Warnings for dangerous situations
    if (stats.chargingSonicBoom > 0) {
        Chat.log(`\n&4&l⚠️ CRITICAL: ${stats.chargingSonicBoom} warden(s) charging sonic boom!`);
    }

    if (stats.byDistance.near > 0 && stats.highAnger > 0) {
        Chat.log(`\n&c⚠️ HIGH DANGER: ${stats.byDistance.near} angry warden(s) nearby!`);
    }

    if (stats.roaring > 0) {
        Chat.log(`\n&e⚠️ Area damage: ${stats.roaring} warden(s) roaring!`);
    }
}

analyzeWardenBehavior();
```

---

## Inherited Methods

From `MobEntityHelper`:

- `isAttacking()` - Check if warden is currently attacking
- `isAiDisabled()` - Check if warden's AI is disabled
- All other mob-specific methods for behavior control

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (typically empty for wardens)
- `getArmor()` - Armor value
- `isBaby()` - Check if warden is a baby variant (wardens don't have baby variants)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- WardenEntityHelper provides access to warden-specific behaviors beyond general mob functionality
- Wardens are blind mobs that primarily detect players through vibrations and scent, not sight
- The anger system is complex and increases based on detected disturbances and player proximity
- Wardens can detect players through walls using their listening and sniffing abilities
- Sonic boom attacks pass through most blocks and armor, making them particularly dangerous
- Wardens will dig underground when they lose their target or when there are no disturbances
- The emerging animation occurs when wardens spawn or re-emerge from the ground
- Multiple wardens can be active simultaneously, each with their own anger levels and behaviors
- Wardens have increased detection capabilities for vibrations from movement, mining, and other actions
- The warden's states are mutually exclusive - it can only be in one state at a time
- Anger levels decay over time when no disturbances are detected
- Wardens prioritize the most recent source of vibrations when targeting

---

## Related Classes

- `MobEntityHelper` - Parent class with AI and combat behaviors
- `LivingEntityHelper` - Base class with health, movement, and status effects
- `EntityHelper` - Base class with general entity methods
- `PlayerEntityHelper` - Player-related functionality for avoiding warden detection
- `WorldHelper` - World interaction methods for creating diversions or seeking cover

---

## Version Information

- Available since JSMacros 1.8.4
- Extends MobEntityHelper functionality with warden-specific behaviors
- Part of the specialized entity helper hierarchy for comprehensive warden interaction
- Supports all warden behaviors including the deep dark biome mechanics and vibration-based detection system
- Designed to work with the warden's unique combat and detection mechanics introduced in Minecraft 1.19