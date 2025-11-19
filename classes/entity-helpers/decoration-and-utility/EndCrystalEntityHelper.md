# EndCrystalEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.decoration.EndCrystalEntityHelper`

**Extends:** `EntityHelper<EndCrystalEntity>`

**Since:** 1.8.4

The `EndCrystalEntityHelper` class provides specialized methods for interacting with End Crystal entities in Minecraft. End Crystals are decorative and functional entities that can be found naturally in the End dimension or placed by players. They serve both as powerful explosive devices (with a blast radius larger than TNT) and as focusing mechanisms for respawning the Ender Dragon.

End Crystals have several unique properties that distinguish them from other entities: naturally generated crystals in the End dimension feature a bedrock base that makes them indestructible to normal means, while player-placed crystals lack this protection. Additionally, End Crystals can emit a beam of energy when targeting specific block positions, typically used for healing the Ender Dragon during boss fights.

This helper provides access to key End Crystal behaviors including determining whether a crystal is naturally generated (with bedrock base) or player-placed, and accessing the crystal's beam target location if it's actively focusing on a block.

This class extends `EntityHelper` and inherits all methods for position, movement, entity properties, and other general entity functionality, while adding End Crystal-specific features.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Notes and Limitations](#notes-and-limitations)
- [Related Classes](#related-classes)

---

## Constructors

EndCrystalEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityInteract`, `EntitySpawn`, `EntityDeath`) when the entity type is `minecraft:end_crystal`
- World entity queries using `World.getEntities("minecraft:end_crystal")` or other search methods
- Type casting from generic `EntityHelper` instances using `entity.as("minecraft:end_crystal")`
- The static casting methods when you know an entity is an End Crystal

---

## Methods

### `isNatural()`

Returns whether the end crystal is naturally generated (has a bedrock base) or was placed by a player. Naturally generated end crystals appear on the obsidian pillars in the End dimension and are indestructible due to their bedrock base, while player-placed crystals can be broken normally.

```js
// Check if nearby end crystals are natural or player-placed
const crystals = World.getEntities("minecraft:end_crystal");
let naturalCrystals = 0;
let playerCrystals = 0;

crystals.forEach(entity => {
    const crystal = entity.as("minecraft:end_crystal");
    if (crystal.isNatural()) {
        naturalCrystals++;
        Chat.log(`Found natural crystal at ${entity.getBlockPos()}`);
    } else {
        playerCrystals++;
        Chat.log(`Found player-placed crystal at ${entity.getBlockPos()}`);
    }
});

Chat.log(`Total: ${naturalCrystals} natural, ${playerCrystals} player-placed crystals`);
```

**Returns:** `boolean` - `true` if the end crystal was not placed by a player (natural generation with bedrock base), `false` if it was placed by a player.

**Since:** 1.8.4

---

### `getBeamTarget()`

Returns the block position that the crystal's beam is targeting, or `null` if the crystal is not currently projecting a beam. End Crystals project beams when targeting specific block positions, commonly used during the Ender Dragon boss fight to heal the dragon.

```js
// Monitor end crystal beams in the End dimension
const crystals = World.getEntities("minecraft:end_crystal");

crystals.forEach(entity => {
    const crystal = entity.as("minecraft:end_crystal");
    const beamTarget = crystal.getBeamTarget();

    if (beamTarget) {
        Chat.log(`Crystal at ${entity.getBlockPos()} is targeting beam at ${beamTarget}`);

        // Calculate distance between crystal and beam target
        const distance = Math.floor(entity.getPos().distanceTo(beamTarget.toCenterPos()));
        Chat.log(`Beam distance: ${distance} blocks`);

        // You could use this information to:
        // - Predict Ender Dragon healing patterns
        // - Strategically break crystals during dragon fights
        // - Analyze crystal placement setups
    } else {
        Chat.log(`Crystal at ${entity.getBlockPos()} has no active beam target`);
    }
});
```

**Returns:** `BlockPosHelper | null` - The target position of the crystal's beam, or `null` if there is no active beam target.

**Since:** 1.8.4

---

## Usage Examples

### Basic End Crystal Detection and Analysis

```js
// Scan for end crystals in a large radius and analyze them
function analyzeEndCrystals() {
    const playerPos = Player.getPlayer().getBlockPos();
    const searchRadius = 64;

    // Get all end crystals in the area
    const crystals = World.getEntitiesWithinRadius("minecraft:end_crystal",
        playerPos.toCenterPos(), searchRadius);

    if (crystals.length === 0) {
        Chat.log("No end crystals found in the area");
        return;
    }

    Chat.log(`Found ${crystals.length} end crystal(s):`);

    crystals.forEach((entity, index) => {
        const crystal = entity.as("minecraft:end_crystal");
        const pos = entity.getBlockPos();
        const isNatural = crystal.isNatural();
        const beamTarget = crystal.getBeamTarget();

        Chat.log(`${index + 1}. Position: ${pos}`);
        Chat.log(`   Natural: ${isNatural ? "Yes (bedrock base)" : "No (player placed)"}`);
        Chat.log(`   Beam Target: ${beamTarget ? beamTarget.toString() : "None"}`);

        // Additional analysis
        if (isNatural) {
            Chat.log(`   Type: Natural generation (indestructible)`);
        } else {
            Chat.log(`   Type: Player placed (destructible)`);
            const distanceToPlayer = Math.floor(entity.getPos().distanceTo(Player.getPlayer().getPos()));
            Chat.log(`   Distance to player: ${distanceToPlayer} blocks`);
        }

        Chat.log("---");
    });
}

// Run the analysis
analyzeEndCrystals();
```

### End Crystal Safety Monitor

```js
// Monitor for dangerous end crystals near the player
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const dangerRadius = 10; // Crystals within 10 blocks are dangerous

    const nearbyCrystals = World.getEntitiesWithinRadius("minecraft:end_crystal",
        playerPos, dangerRadius);

    if (nearbyCrystals.length > 0) {
        nearbyCrystals.forEach(entity => {
            const crystal = entity.as("minecraft:end_crystal");
            const distance = Math.floor(playerPos.distanceTo(entity.getPos()));

            Chat.log(`⚠️ WARNING: End crystal ${distance} blocks away!`);

            if (crystal.isNatural()) {
                Chat.log("This is a natural crystal with bedrock base - very dangerous!");
            } else {
                Chat.log("This is a player-placed crystal - can be destroyed safely");
            }
        });
    }
}));
```

### Ender Dragon Fight Helper

```js
// Helper for Ender Dragon fights - analyze crystal healing patterns
function analyzeDragonHealingSetup() {
    const crystals = World.getEntities("minecraft:end_crystal");
    const healingCrystals = [];
    const idleCrystals = [];

    crystals.forEach(entity => {
        const crystal = entity.as("minecraft:end_crystal");
        const beamTarget = crystal.getBeamTarget();

        if (beamTarget) {
            healingCrystals.push({
                entity: entity,
                crystal: crystal,
                target: beamTarget,
                pos: entity.getBlockPos()
            });
        } else {
            idleCrystals.push({
                entity: entity,
                crystal: crystal,
                pos: entity.getBlockPos()
            });
        }
    });

    Chat.log(`=== Ender Dragon Crystal Analysis ===`);
    Chat.log(`Healing crystals: ${healingCrystals.length}`);
    Chat.log(`Idle crystals: ${idleCrystals.length}`);

    if (healingCrystals.length > 0) {
        Chat.log("\nActive healing beams:");
        healingCrystals.forEach((data, index) => {
            Chat.log(`${index + 1}. Crystal at ${data.pos} → Target: ${data.target}`);
            Chat.log(`   Natural: ${data.crystal.isNatural() ? "Yes" : "No"}`);
        });
    }

    return { healingCrystals, idleCrystals };
}

// Usage during dragon fight
const crystalAnalysis = analyzeDragonHealingSetup();
```

---

## Inherited Methods

From `EntityHelper<EndCrystalEntity>`:

- `getPos()` - Gets the position as a `Pos3D`
- `getBlockPos()` - Gets the block position as a `BlockPosHelper`
- `getX()`, `getY()`, `getZ()` - Get individual coordinates
- `getUuid()` - Gets the unique identifier
- `getType()` - Gets the entity type
- `getName()` - Gets the entity's display name
- `isRemoved()` - Checks if entity is marked for removal
- `isGlowing()` - Checks if entity is glowing
- `isOnFire()` - Checks if entity is on fire
- `isSneaking()` - Checks if entity is sneaking
- `isSprinting()` - Checks if entity is sprinting
- `isInvisible()` - Checks if entity is invisible
- `getHealth()` - Gets current health
- `getMaxHealth()` - Gets maximum health
- And many more standard entity methods...

---

## Notes and Limitations

1. **Explosion Hazard**: End Crystals explode when hit by projectiles, in contact with fire, or when attacked. Handle with care in scripts.

2. **Natural vs Player-Placed**: The distinction made by `isNatural()` is important for strategy:
   - Natural crystals (with bedrock) are indestructible and often part of the End dimension structure
   - Player-placed crystals can be destroyed and are commonly used in PvP and redstone contraptions

3. **Beam Targeting**: The beam functionality is primarily used in the Ender Dragon boss fight, but can also be triggered by players using specific setup configurations.

4. **Performance Considerations**: When scanning for many crystals, consider using radius-based searches instead of world-wide searches for better performance.

5. **Event Context**: Be mindful of when crystal data is accessed - some properties may not be available in all event contexts or may change between ticks.

6. **Dimension Specific**: While end crystals can be placed in any dimension, they are most commonly found in the End dimension.

---

## Related Classes

- `EntityHelper` - Base class providing standard entity functionality
- `BlockPosHelper` - Used for beam target positions
- `EnderDragonEntityHelper` - Often used alongside End Crystal analysis
- `World` - For finding and querying end crystals in the world
- `Player` - For player position and interaction context

---

## Common Use Cases

1. **Ender Dragon Fight Strategy**: Analyzing crystal positions and beam patterns for optimal boss fight tactics
2. **PvP Combat**: Detecting dangerous end crystals in combat situations
3. **World Building**: Verifying crystal placement and configurations in builds
4. **Redstone Mechanics**: Monitoring end crystal behavior in complex redstone contraptions
5. **Safety Monitoring**: Alerting players to nearby crystal hazards
6. **End Dimension Exploration**: Identifying and documenting natural crystal formations