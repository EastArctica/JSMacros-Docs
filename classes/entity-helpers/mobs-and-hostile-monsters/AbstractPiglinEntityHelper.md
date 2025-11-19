# AbstractPiglinEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.AbstractPiglinEntityHelper<T extends AbstractPiglinEntity>`

**Extends:** `MobEntityHelper<T>`

**Since:** JsMacros 1.8.4

The `AbstractPiglinEntityHelper` class provides specialized access to piglin-like entities in Minecraft, including piglins, hoglins, and zombified piglins. This class offers essential methods for monitoring piglin-specific behaviors such as zombification immunity, which is critical for understanding entity state transitions in different dimensions.

This helper serves as a base class for more specific piglin helpers (like `PiglinEntityHelper`) while providing core functionality common to all abstract piglin entities. It's particularly useful for creating scripts that track piglin behaviors, manage bartering systems, coordinate combat scenarios, or monitor dimensional transformations of piglin-type entities.

## Constructors

AbstractPiglinEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using type-specific methods

## Methods

### Piglin-Specific Behavior

- [piglin.canBeZombified()](#piglincanbezombified)

### Inherited Methods

The AbstractPiglinEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Piglin-Specific Behavior

## Usage Examples

### Basic Piglin Safety Check
```js
// Quick piglin safety assessment
events.on("EntityInteract", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getTarget();
    if (entity.is("minecraft:piglin", "minecraft:piglin_brute", "minecraft:hoglin")) {
        const piglin = entity.asAbstractPiglin();
        const canBeZombified = piglin.canBeZombified();
        const dimension = World.getDimension();

        Chat.log(`=== ${entity.getName().getString()} ===`);
        Chat.log(`Dimension: ${dimension}`);
        Chat.log(`Zombification Risk: ${canBeZombified ? "&cHIGH" : "&aLOW"}`);

        if (canBeZombified && dimension === "minecraft:overworld") {
            Chat.log("&c⚠️ This piglin will transform to Zombified Piglin!");
            Chat.log("   Move to Nether or apply protection immediately!");

            // Highlight with emergency color
            entity.setGlowing(true);
            entity.setGlowingColor(0xFF0000);
        }
    }
}));
```

### Piglin Bartering System Monitor
```js
// Monitor piglin state for safe bartering operations
class PiglinBarteringMonitor {
    constructor() {
        this.barteringPiglins = new Map();
        this.safeBarteringConditions = new Set(["minecraft:the_nether"]);
    }

    checkBarteringSafety(piglin) {
        const canBeZombified = piglin.canBeZombified();
        const currentDimension = World.getDimension();
        const isSafeDimension = this.safeBarteringConditions.has(currentDimension);

        const barteringSafe = !canBeZombified || isSafeDimension;

        return {
            safe: barteringSafe,
            reason: barteringSafe ?
                (isSafeDimension ? "Safe dimension" : "Immune to transformation") :
                "Vulnerable to zombification in current dimension",
            dimension: currentDimension
        };
    }

    analyzePiglinForBartering(piglin) {
        const uuid = piglin.getUUID();
        const name = piglin.getName().getString();
        const safety = this.checkBarteringSafety(piglin);

        // Living entity access for additional info
        const living = piglin.asLiving();
        let healthInfo = "";
        if (living) {
            const health = living.getHealth();
            const maxHealth = living.getMaxHealth();
            healthInfo = `Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`;
        }

        Chat.log(`=== Bartering Analysis: ${name} ===`);
        Chat.log(`Bartering Safe: ${safety.safe ? "&a✅ Yes" : "&c❌ No"}`);
        Chat.log(`Reason: ${safety.reason}`);
        Chat.log(`Dimension: ${safety.dimension}`);
        if (healthInfo) Chat.log(healthInfo);

        if (!safety.safe) {
            Chat.log("\n&c⚠️ Bartering Dangers:");
            Chat.log("- Piglin may transform during bartering");
            Chat.log("- Items could be lost to transformation");
            Chat.log("- Aggression may occur after transformation");

            // Solutions
            Chat.log("\n&eSolutions:");
            Chat.log("- Move piglin to Nether before bartering");
            Chat.log("- Use fire resistance protection");
            Chat.log("- Complete bartering quickly if unavoidable");

            // Highlight dangerous piglins
            piglin.setGlowing(true);
            piglin.setGlowingColor(0xFFA500); // Orange for caution
        } else {
            Chat.log("\n&a✅ Safe for bartering operations");
            piglin.setGlowing(true);
            piglin.setGlowingColor(0x00FF00); // Green for safe
        }

        return safety;
    }

    scanForBarteringPiglins() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities(30);
        const piglinTypes = ["minecraft:piglin", "minecraft:piglin_brute"];

        let safePiglins = 0;
        let unsafePiglins = 0;

        entities.forEach(entity => {
            if (entity.is(...piglinTypes)) {
                const piglin = entity.asAbstractPiglin();
                const distance = player.distanceTo(entity);

                if (distance <= 25) {
                    const safety = this.analyzePiglinForBartering(piglin);

                    if (safety.safe) {
                        safePiglins++;
                    } else {
                        unsafePiglins++;
                    }

                    Chat.log(""); // Spacing between analyses
                }
            }
        });

        Chat.log(`\n=== Bartering Safety Summary ===`);
        Chat.log(`Safe piglins: ${safePiglins} &a✅`);
        Chat.log(`Unsafe piglins: ${unsafePiglins} &c⚠️`);

        if (unsafePiglins > 0) {
            Chat.log("\n&c⚠️ Unsafe piglins detected - take precautions before bartering!");
        } else if (safePiglins > 0) {
            Chat.log("\n&a✅ All piglins are safe for bartering!");
        } else {
            Chat.log("\n&eNo piglins found for bartering analysis");
        }
    }
}

// Initialize bartering monitor
const barteringMonitor = new PiglinBarteringMonitor();

// Command to scan for bartering piglins
barteringMonitor.scanForBarteringPiglins();
```

## Notes and Limitations

- AbstractPiglinEntityHelper instances become invalid when the piglin entity is removed from the world. Always check `isAlive()` before accessing piglin data.
- This helper works with all abstract piglin entities including regular piglins, piglin brutes, hoglins, and zombified piglins.
- The `canBeZombified()` method checks dimensional immunity and other conditions that prevent zombification transformation.
- Zombification is a permanent transformation - once a piglin becomes a zombified piglin, it cannot revert.
- Dimension-based immunity may vary based on specific game mechanics and mod interactions.
- The method delegates to the underlying Minecraft AbstractPiglinEntity implementation for accurate zombification state checking.
- For more specific piglin behaviors, use the specialized `PiglinEntityHelper` class when working with regular piglins.
- Zombification immunity can be affected by game difficulty, mob-specific traits, and environmental factors.

## Related Classes

- `PiglinEntityHelper` - Specialized for regular piglins with activity states and behaviors
- `MobEntityHelper` - Base class for mob functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized hostile mob helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft AbstractPiglinEntity implementation
- Inherits comprehensive functionality from the mob entity hierarchy
- Designed specifically for piglin-type entity management and behavioral analysis