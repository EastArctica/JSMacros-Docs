# LivingEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.LivingEntityHelper<T extends LivingEntity>`

**Extends:** `EntityHelper<T>`

Represents a living entity in the world such as mobs, players, and animals. LivingEntityHelper provides access to health, status effects, equipment, and other properties specific to living entities. Instances are typically obtained from entity events, player methods, or by accessing nearby entities.

This class extends `EntityHelper` and inherits all methods for position, movement, and general entity properties.

## Methods
- [living.getStatusEffects()](#livinggetstatuseffects)
- [living.canHaveStatusEffect(effect)](#livingcanhavestatuseffecteffect)
- [living.hasStatusEffect(id)](#livinghasstatuseffectid)
- [living.isHolding(item)](#livingisholdingitem)
- [living.getMainHand()](#livinggetmainhand)
- [living.getOffHand()](#livinggetoffhand)
- [living.getHeadArmor()](#livinggetheadarmor)
- [living.getChestArmor()](#livinggetchestarmor)
- [living.getLegArmor()](#livinggetlegarmor)
- [living.getFootArmor()](#livinggetfootarmor)
- [living.getHealth()](#livinggethealth)
- [living.getMaxHealth()](#livinggetmaxhealth)
- [living.getAbsorptionHealth()](#livinggetabsorptionhealth)
- [living.getArmor()](#livinggetarmor)
- [living.getDefaultHealth()](#livinggetdefaulthealth)
- [living.getMobTags()](#livinggetmobtags)
- [living.isSleeping()](#livingissleeping)
- [living.isFallFlying()](#livingisfallflying)
- [living.isOnGround()](#livingisonground)
- [living.canBreatheInWater()](#livingcanbreatheinwater)
- [living.hasNoDrag()](#livinghasnodrag)
- [living.hasNoGravity()](#livinghasnogravity)
- [living.canTarget(target)](#livingcantargettarget)
- [living.canTakeDamage()](#livingcantakedamage)
- [living.isPartOfGame()](#livingispartofgame)
- [living.isSpectator()](#livingisspectator)
- [living.isUndead()](#livingisundead)
- [living.getBowPullProgress()](#livinggetbowpullprogress)
- [living.getItemUseTimeLeft()](#livinggetitemusettimeleft)
- [living.isBaby()](#livingisbaby)
- [living.canSeeEntity(entity)](#livingcanseeentityentity)
- [living.canSeeEntity(entity, simpleCast)](#livingcanseeentityentity-simplecast)

---

## Usage Examples

### Health Monitoring
```js
function monitorEntityHealth(livingEntity) {
    const health = livingEntity.getHealth();
    const maxHealth = livingEntity.getMaxHealth();
    const absorption = livingEntity.getAbsorptionHealth();
    const armor = livingEntity.getArmor();

    const healthPercent = (health / maxHealth) * 100;
    const totalHealth = health + absorption;

    Chat.log(`=== Entity Health Status ===`);
    Chat.log(`Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)} (${healthPercent.toFixed(1)}%)`);
    if (absorption > 0) {
        Chat.log(`Absorption: ${absorption.toFixed(1)}`);
    }
    Chat.log(`Total Effective Health: ${totalHealth.toFixed(1)}`);
    Chat.log(`Armor: ${armor} ( ${(armor * 4).toFixed(0)}% damage reduction )`);
}
```

### Equipment Analysis
```js
function analyzeEntityEquipment(livingEntity) {
    Chat.log(`=== Equipment Analysis ===`);

    // Main hand and off hand
    const mainHand = livingEntity.getMainHand();
    const offHand = livingEntity.getOffHand();

    if (mainHand.getId() !== "minecraft:air") {
        Chat.log(`Main Hand: ${mainHand.getName().getString()} x${mainHand.getCount()}`);
    }

    if (offHand.getId() !== "minecraft:air") {
        Chat.log(`Off Hand: ${offHand.getName().getString()} x${offHand.getCount()}`);
    }

    // Armor pieces
    const armor = [
        { slot: "Head", item: livingEntity.getHeadArmor() },
        { slot: "Chest", item: livingEntity.getChestArmor() },
        { slot: "Legs", item: livingEntity.getLegArmor() },
        { slot: "Feet", item: livingEntity.getFootArmor() }
    ];

    let totalArmorValue = 0;
    for (const piece of armor) {
        if (piece.item.getId() !== "minecraft:air") {
            Chat.log(`${piece.slot}: ${piece.item.getName().getString()}`);
            // Calculate armor value (approximate)
            if (piece.item.getArmorMaterial()) {
                totalArmorValue += piece.item.getArmorMaterial().getProtectionAmount(EquipmentSlot.valueOf(piece.item.getType().getEquipmentSlot().toUpperCase()));
            }
        }
    }

    Chat.log(`Total armor protection: ${totalArmorValue}`);
}
```

### Combat Analysis
```js
function analyzeCombatThreat(livingEntity) {
    const player = Player.getPlayer();

    Chat.log(`=== Combat Threat Analysis ===`);

    // Health and armor assessment
    const healthPercent = (livingEntity.getHealth() / livingEntity.getMaxHealth()) * 100;
    const armor = livingEntity.getArmor();

    Chat.log(`Health: ${healthPercent.toFixed(1)}%`);
    Chat.log(`Armor: ${armor} (${(armor * 4).toFixed(0)}% reduction)`);

    // Weapon assessment
    const mainHand = livingEntity.getMainHand();
    Chat.log(`Weapon: ${mainHand.getName().getString()}`);

    // Status effects
    const effects = livingEntity.getStatusEffects();
    if (effects.length > 0) {
        Chat.log("Active effects:");
        for (const effect of effects) {
            Chat.log(`- ${effect.getEffectId()} ${effect.getAmplifier() > 0 ? `(${effect.getAmplifier()})` : ""} for ${effect.getDuration()} ticks`);
        }
    }

    // Special characteristics
    if (livingEntity.isUndead()) {
        Chat.log("⚠️ Undead entity - vulnerable to smite");
    }

    // Combat state
    if (livingEntity.getBowPullProgress() > 0) {
        Chat.log(`⚠️ Drawing bow: ${(livingEntity.getBowPullProgress() * 100).toFixed(1)}% charged`);
    }

    // Visibility check
    const canSeePlayer = livingEntity.canSeeEntity(player);
    const distance = livingEntity.distanceTo(player);

    Chat.log(`Distance: ${distance.toFixed(1)} blocks`);
    Chat.log(`Line of sight to player: ${canSeePlayer ? "Yes" : "No"}`);

    // Threat assessment
    let threatLevel = "Low";
    if (healthPercent > 80 && armor >= 10) threatLevel = "High";
    else if (healthPercent > 50 && armor >= 5) threatLevel = "Medium";

    Chat.log(`Overall threat level: ${threatLevel}`);
}
```

### Entity Classification
```js
function classifyLivingEntity(livingEntity) {
    const tags = livingEntity.getMobTags();
    const classification = [];

    // Check various tags to classify the entity
    if (tags.includes("minecraft:undead")) {
        classification.push("Undead");
    }
    if (tags.includes("minecraft:arthropod")) {
        classification.push("Arthropod");
    }
    if (tags.includes("minecraft:illager")) {
        classification.push("Illager");
    }
    if (livingEntity.isBaby()) {
        classification.push("Baby");
    }

    // Environmental abilities
    if (livingEntity.canBreatheInWater()) {
        classification.push("Aquatic");
    }
    if (livingEntity.isFallFlying()) {
        classification.push("Flying (Elytra)");
    }

    // Status
    const status = [];
    if (livingEntity.isSleeping()) status.push("Sleeping");
    if (livingEntity.isOnFire()) status.push("On Fire");
    if (!livingEntity.isOnGround()) status.push("In Air");
    if (!livingEntity.canTakeDamage()) status.push("Invulnerable");

    Chat.log(`Entity: ${livingEntity.getName().getString()}`);
    Chat.log(`Type: ${livingEntity.getType()}`);

    if (classification.length > 0) {
        Chat.log(`Classification: ${classification.join(", ")}`);
    }

    if (status.length > 0) {
        Chat.log(`Status: ${status.join(", ")}`);
    }
}
```

## Inherited Methods

From `EntityHelper`:

- `getPos()` - Returns entity position as Pos3D
- `getX()`, `getY()`, `getZ()` - Returns individual coordinates
- `getName()` - Returns entity name as TextHelper
- `getType()` - Returns entity type ID
- `is(type, ...)` - Checks if entity matches any of the specified types
- `getVehicle()` - Returns vehicle entity if riding
- `getPassengers()` - Returns list of passenger entities
- `isAlive()` - Checks if entity is alive
- `getUUID()` - Returns entity UUID
- `distanceTo(entity/pos)` - Calculates distance to another entity or position
- `getFacingDirection()` - Returns direction the entity is facing
- And many more position, movement, and utility methods

## Notes and Limitations

- LivingEntityHelper instances are typically read-only views of living entities
- Some methods may have limited accuracy for client-side entities due to server-side data not being synchronized
- Status effects are often not fully synced to the client for non-player entities
- Health values may be approximated for some entities due to client-side limitations
- Equipment slots return ItemStackHelper instances that may be empty (air) if no item is equipped
- Mob tags provide useful categorization but may vary by Minecraft version

## Related Classes

- `EntityHelper` - Parent class with general entity methods
- `PlayerEntityHelper` - Specialized for player entities
- `StatusEffectHelper` - Represents status effects
- `ItemStackHelper` - Represents items and equipment
- `EquipmentSlot` - Enum for equipment slot types