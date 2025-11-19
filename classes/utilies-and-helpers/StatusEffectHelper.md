# StatusEffectHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.StatusEffectHelper`

**Extends:** `BaseHelper<StatusEffectInstance>`

**Since:** JsMacros 1.2.4

The `StatusEffectHelper` class provides a wrapper around Minecraft's status effect instances (potions and effects), allowing scripts to query information about active status effects on entities. Status effects include beneficial effects like Speed and Strength, harmful effects like Poison and Wither, and neutral effects like Night Vision.

This helper class provides methods to access all key properties of status effects including their type identifier, amplifier level, remaining duration, visual properties, and categorization. It's commonly used when examining player status effects, monitoring entity effects during combat, or tracking potion effects in automation scripts.

StatusEffectHelper instances are typically obtained through:
- Living entity status effect queries using `LivingEntityHelper.getStatusEffects()`
- Status effect update events when effects are added or removed
- Registry lookups using `RegistryHelper.getStatusEffect()`

## Constructors

StatusEffectHelper instances are typically not created directly by scripters. Instead, they are obtained through entity queries or events. However, the class provides several constructors for internal use:

### `StatusEffectHelper(StatusEffectInstance statusEffectInstance)`
Internal constructor that wraps a Minecraft status effect instance.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| statusEffectInstance | StatusEffectInstance | The underlying Minecraft status effect instance to wrap |

## Methods

### Basic Properties

- [effect.getId()](#effectgetid)
- [effect.getStrength()](#effectgetstrength)
- [effect.getTime()](#effectgettime)
- [effect.getCategory()](#effectgetcategory)

### Visual Properties

- [effect.isAmbient()](#effectisambient)
- [effect.hasIcon()](#effecthasicon)
- [effect.isVisible()](#effectisvisible)
- [effect.isInstant()](#effectisinstant)

### Category Checks

- [effect.isBeneficial()](#effectisbeneficial)
- [effect.isNeutral()](#effectisneutral)
- [effect.isHarmful()](#effectisharmful)
- [effect.isPermanent()](#effectispermanent)

---

## Basic Properties

## Visual Properties

## Category Checks

## Usage Examples

### Comprehensive Effect Monitor
```js
// Monitor all player status effects with detailed information
function comprehensiveEffectMonitor() {
    const player = Player.getPlayer();
    if (!player) return;

    const effects = player.getStatusEffects();

    if (effects.length === 0) {
        Chat.log("No active status effects");
        return;
    }

    Chat.log("=== Status Effect Monitor ===");

    const categories = {
        beneficial: [],
        harmful: [],
        neutral: []
    };

    effects.forEach(effect => {
        const id = effect.getId();
        const name = id.replace('minecraft:', '');
        const strength = effect.getStrength();
        const time = effect.getTime();
        const category = effect.getCategory();

        const effectInfo = {
            id: id,
            name: name,
            strength: strength,
            level: strength + 1,
            time: time,
            minutes: Math.floor(time / 1200),
            seconds: Math.floor((time % 1200) / 20),
            ambient: effect.isAmbient(),
            hasIcon: effect.hasIcon(),
            visible: effect.isVisible(),
            instant: effect.isInstant()
        };

        switch (category) {
            case "BENEFICIAL":
                categories.beneficial.push(effectInfo);
                break;
            case "HARMFUL":
                categories.harmful.push(effectInfo);
                break;
            case "NEUTRAL":
                categories.neutral.push(effectInfo);
                break;
        }
    });

    // Display beneficial effects
    if (categories.beneficial.length > 0) {
        Chat.log("&2=== Beneficial Effects ===");
        categories.beneficial.forEach(effect => {
            const levelStr = effect.strength > 0 ? ` ${effect.level}` : '';
            const ambientStr = effect.ambient ? " (ambient)" : "";
            Chat.log(`&2${effect.name}${levelStr}: ${effect.minutes}m ${effect.seconds}s${ambientStr}`);
        });
    }

    // Display harmful effects
    if (categories.harmful.length > 0) {
        Chat.log("&4=== Harmful Effects ===");
        categories.harmful.forEach(effect => {
            const levelStr = effect.strength > 0 ? ` ${effect.level}` : '';
            const instantStr = effect.instant ? " (instant)" : "";
            Chat.log(`&4${effect.name}${levelStr}: ${effect.minutes}m ${effect.seconds}s${instantStr}`);
        });
    }

    // Display neutral effects
    if (categories.neutral.length > 0) {
        Chat.log("&7=== Neutral Effects ===");
        categories.neutral.forEach(effect => {
            const levelStr = effect.strength > 0 ? ` ${effect.level}` : '';
            const visibilityStr = effect.visible ? "" : " (hidden particles)";
            Chat.log(`&7${effect.name}${levelStr}: ${effect.minutes}m ${effect.seconds}s${visibilityStr}`);
        });
    }

    Chat.log(`Total: ${effects.length} effects`);
}

comprehensiveEffectMonitor();
```

### Effect Alert System
```js
// Alert system for important status effect changes
class EffectAlertSystem {
    constructor() {
        this.previousEffects = new Map();
        this.alertThresholds = {
            critical: 200,    // 10 seconds
            warning: 600,     // 30 seconds
            info: 1800        // 1.5 minutes
        };
    }

    checkEffects() {
        const player = Player.getPlayer();
        if (!player) return;

        const currentEffects = new Map();
        const effects = player.getStatusEffects();

        effects.forEach(effect => {
            const id = effect.getId();
            const effectData = {
                strength: effect.getStrength(),
                time: effect.getTime(),
                category: effect.getCategory(),
                ambient: effect.isAmbient()
            };

            currentEffects.set(id, effectData);

            // Check for new effects
            if (!this.previousEffects.has(id)) {
                this.onEffectAdded(id, effectData);
            } else {
                // Check for changes
                const previous = this.previousEffects.get(id);
                if (previous.strength !== effectData.strength ||
                    Math.abs(previous.time - effectData.time) > 100) {
                    this.onEffectChanged(id, previous, effectData);
                }

                // Check for expiring effects
                this.checkExpiringEffect(id, effectData);
            }
        });

        // Check for removed effects
        for (const [id, previousData] of this.previousEffects) {
            if (!currentEffects.has(id)) {
                this.onEffectRemoved(id, previousData);
            }
        }

        this.previousEffects = currentEffects;
    }

    onEffectAdded(id, effectData) {
        const name = id.replace('minecraft:', '');
        const color = this.getCategoryColor(effectData.category);
        const strength = effectData.strength > 0 ? ` ${effectData.strength + 1}` : '';
        const ambient = effectData.ambient ? " (beacon)" : "";

        Chat.log(`${color}+ ${name}${strength} added${ambient}`);

        // Special warnings for dangerous effects
        if (effectData.category === "HARMFUL") {
            const dangerousEffects = ["minecraft:wither", "minecraft:poison", "minecraft:weakness"];
            if (dangerousEffects.includes(id)) {
                Chat.actionbar(`&4&lDANGEROUS EFFECT: ${name}!`);
            }
        }
    }

    onEffectRemoved(id, effectData) {
        const name = id.replace('minecraft:', '');
        const color = this.getCategoryColor(effectData.category);
        Chat.log(`${color}- ${name} expired`);
    }

    onEffectChanged(id, previous, current) {
        const name = id.replace('minecraft:', '');
        const color = this.getCategoryColor(current.category);

        if (previous.strength !== current.strength) {
            const prevLevel = previous.strength + 1;
            const newLevel = current.strength + 1;
            Chat.log(`${color}${name} changed: ${prevLevel} → ${newLevel}`);
        }
    }

    checkExpiringEffect(id, effectData) {
        const name = id.replace('minecraft:', '');
        const time = effectData.getTime();
        const color = this.getCategoryColor(effectData.category);

        if (time <= this.alertThresholds.critical) {
            const seconds = Math.floor(time / 20);
            Chat.actionbar(`${color}&l${name} expiring: ${seconds}s!`);
        }
    }

    getCategoryColor(category) {
        switch (category) {
            case "BENEFICIAL": return "&2";
            case "HARMFUL": return "&4";
            case "NEUTRAL": return "&7";
            default: return "&f";
        }
    }
}

// Create and use the alert system
const effectAlerts = new EffectAlertSystem();

events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    effectAlerts.checkEffects();
}));
```

### Combat Effect Tracker
```js
// Track status effects during combat situations
function combatEffectTracker() {
    const player = Player.getPlayer();
    if (!player) return;

    const effects = player.getStatusEffects();
    const combatEffects = effects.filter(effect => {
        const id = effect.getId();
        // Effects commonly encountered in combat
        return [
            "minecraft:strength", "minecraft:weakness", "minecraft:resistance",
            "minecraft:poison", "minecraft:wither", "minecraft:slowness",
            "minecraft:speed", "minecraft:jump_boost", "minecraft:hunger",
            "minecraft:absorption", "minecraft:instant_health", "minecraft:instant_damage"
        ].includes(id);
    });

    if (combatEffects.length > 0) {
        let combatStatus = "&6Combat Status: ";
        const statusList = [];

        combatEffects.forEach(effect => {
            const id = effect.getId();
            const name = id.replace('minecraft:', '');
            const strength = effect.getStrength();
            const time = effect.getTime();
            const category = effect.getCategory();

            // Add status-specific information
            let effectStatus = "";
            switch (id) {
                case "minecraft:absorption":
                    const absorptionHearts = (strength + 1) * 2;
                    effectStatus = `${name} (+${absorptionHearts} hearts)`;
                    break;
                case "minecraft:poison":
                case "minecraft:wither":
                    const seconds = Math.floor(time / 20);
                    effectStatus = `&4${name} (${seconds}s)`;
                    break;
                case "minecraft:strength":
                case "minecraft:weakness":
                    const level = strength + 1;
                    effectStatus = category === "BENEFICIAL" ?
                        `&2${name} ${level}` : `&4${name} ${level}`;
                    break;
                case "minecraft:hunger":
                    const hungerSeconds = Math.floor(time / 20);
                    effectStatus = `&6${name} (${hungerSeconds}s)`;
                    break;
                default:
                    effectStatus = name;
                    break;
            }

            statusList.push(effectStatus);
        });

        combatStatus += statusList.join(", ");
        Chat.actionbar(combatStatus);
    }
}

events.on("Tick", JavaWrapper.methodToJavaAsync(combatEffectTracker));
```

### Effect Counter and Statistics
```js
// Track effect statistics over time
class EffectStatistics {
    constructor() {
        this.stats = {
            totalEffectsApplied: 0,
            beneficialEffectsApplied: 0,
            harmfulEffectsApplied: 0,
            neutralEffectsApplied: 0,
            uniqueEffectsSeen: new Set(),
            effectDurations: new Map()
        };
        this.sessionStartTime = Date.now();
    }

    recordEffect(effect) {
        const id = effect.getId();
        const category = effect.getCategory();
        const time = effect.getTime();

        this.stats.totalEffectsApplied++;
        this.stats.uniqueEffectsSeen.add(id);

        switch (category) {
            case "BENEFICIAL":
                this.stats.beneficialEffectsApplied++;
                break;
            case "HARMFUL":
                this.stats.harmfulEffectsApplied++;
                break;
            case "NEUTRAL":
                this.stats.neutralEffectsApplied++;
                break;
        }

        // Track duration statistics
        if (!this.stats.effectDurations.has(id)) {
            this.stats.effectDurations.set(id, []);
        }
        this.stats.effectDurations.get(id).push(time);
    }

    getEffectReport() {
        const sessionTime = Date.now() - this.sessionStartTime;
        const sessionMinutes = Math.floor(sessionTime / 60000);

        let report = "=== Effect Statistics Session ===\n";
        report += `Session time: ${sessionMinutes} minutes\n`;
        report += `Total effects applied: ${this.stats.totalEffectsApplied}\n`;
        report += `Beneficial effects: ${this.stats.beneficialEffectsApplied}\n`;
        report += `Harmful effects: ${this.stats.harmfulEffectsApplied}\n`;
        report += `Neutral effects: ${this.stats.neutralEffectsApplied}\n`;
        report += `Unique effects encountered: ${this.stats.uniqueEffectsSeen.size}\n\n`;

        report += "Effect Duration Averages:\n";
        for (const [id, durations] of this.stats.effectDurations) {
            const name = id.replace('minecraft:', '');
            const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
            const avgMinutes = Math.floor(avgDuration / 1200);
            const avgSeconds = Math.floor((avgDuration % 1200) / 20);
            const count = durations.length;
            report += `  ${name}: ${avgMinutes}m ${avgSeconds}s average (${count} instances)\n`;
        }

        return report;
    }
}

// Usage example
const effectStats = new EffectStatistics();

// Record effects when they're applied
events.on("StatusEffectUpdate", JavaWrapper.methodToJavaAsync((event) => {
    if (event.added && event.newEffect) {
        effectStats.recordEffect(event.newEffect);
    }
}));

// Periodically show statistics
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    // Show report every 5 minutes (6000 ticks)
    if (Date.now() % 300000 < 1000) {
        Chat.log(effectStats.getEffectReport());
    }
}));
```

## Important Notes

1. **Duration Units**: Effect duration is returned in ticks (20 ticks = 1 second). Remember to convert to seconds/minutes for display purposes.

2. **Amplifier vs Level**: The `getStrength()` method returns the amplifier (0-based), while in-game effect levels are 1-based. Add 1 to get the displayed level.

3. **Effect Sources**: Use `isAmbient()` to distinguish between effects from beacons/conduits (ambient) and effects from potions, commands, or other sources (direct).

4. **Instant Effects**: Some effects like Instant Health and Instant Damage apply immediately but may still have duration values when applied through commands.

5. **Permanent Effects**: Effects from beacons appear with very large duration values rather than being truly permanent.

6. **Server Variations**: In multiplayer environments, some effect properties may be controlled by server-side logic and may not always match expected values.

7. **Performance**: Avoid checking effects every tick unless necessary. Consider checking every 20-40 ticks for effect monitoring.

8. **Effect Visibility**: Some effects might not show particles or icons based on game settings or server configuration.

## Related Classes

- `LivingEntityHelper` - Provides access to entity status effects via `getStatusEffects()`
- `RegistryHelper` - Allows lookup of status effects by ID using `getStatusEffect()`
- `EventStatusEffectUpdate` - Fired when status effects are added or removed
- `BaseHelper` - Base class providing standard helper functionality
- `StatusEffect` - Minecraft's internal status effect class
- `StatusEffectInstance` - Minecraft's internal status effect instance class

## Version History

- **1.2.4**: Initial implementation with basic effect information methods
- **1.8.4**: Enhanced with additional constructors, visual property methods, and category checking methods
- **Current**: Full feature set for status effect inspection and monitoring