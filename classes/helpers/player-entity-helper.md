# PlayerEntityHelper

Represents a player entity in Minecraft. This class extends LivingEntityHelper and provides additional methods specific to players, including abilities, experience, armor, equipment, and fishing status. Use this to interact with any player (including yourself and other players in multiplayer).

**Inherits from:** LivingEntityHelper (which inherits from EntityHelper)

## Methods
- [PlayerEntityHelper.getAbilities](#playerentityhelpergetabilities)
- [PlayerEntityHelper.getAttackCooldownProgress](#playerentityhelpergetattackcooldownprogress)
- [PlayerEntityHelper.getAttackCooldownProgressPerTick](#playerentityhelpergetattackcooldownprogresspertick)
- [PlayerEntityHelper.getChestArmor](#playerentityhelpergetchestarmor)
- [PlayerEntityHelper.getFootArmor](#playerentityhelpergetfootarmor)
- [PlayerEntityHelper.getFishingBobber](#playerentityhelpergetfishingbobber)
- [PlayerEntityHelper.getHeadArmor](#playerentityhelpergetheadarmor)
- [PlayerEntityHelper.getLegArmor](#playerentityhelpergetlegarmor)
- [PlayerEntityHelper.getMainHand](#playerentityhelpergetmainhand)
- [PlayerEntityHelper.getOffHand](#playerentityhelpergetoffhand)
- [PlayerEntityHelper.getPlayerName](#playerentityhelpergetplayername)
- [PlayerEntityHelper.getScore](#playerentityhelpergetscore)
- [PlayerEntityHelper.getXP](#playerentityhelpergetxp)
- [PlayerEntityHelper.getXPLevel](#playerentityhelpergetxplevel)
- [PlayerEntityHelper.getXPProgress](#playerentityhelpergetxpprogress)
- [PlayerEntityHelper.getXPToLevelUp](#playerentityhelpergetxptolevelup)
- [PlayerEntityHelper.isSleepingLongEnough](#playerentityhelperissleepingenough)

### PlayerEntityHelper.getAbilities
```js
const player = event.entity.asPlayer();
const abilities = player.getAbilities();

Chat.log(`Can fly: ${abilities.getCanFly()}`);
Chat.log(`Flying: ${abilities.getFlying()}`);
Chat.log(`Walk speed: ${abilities.getWalkSpeed()}`);
Chat.log(`Fly speed: ${abilities.getFlySpeed()}`);
Chat.log(`Creative mode: ${abilities.getCreativeMode()}`);
```

**Params**
* `(none)`

**Returns**
* `PlayerAbilitiesHelper`: The player's abilities helper.

**Notes**
- Includes flight capabilities, movement speeds, and creative mode status.

### PlayerEntityHelper.getAttackCooldownProgress
```js
const player = event.entity.asPlayer();
const cooldown = player.getAttackCooldownProgress();

Chat.log(`Attack cooldown: ${Math.round(cooldown * 100)}%`);

if (cooldown >= 1.0) {
    Chat.log("Ready for full damage attack!");
} else {
    Chat.log(`Attack damage reduced to ${Math.round(cooldown * 100)}%`);
}
```

**Params**
* `(none)`

**Returns**
* `number`: A value between 0.0 and 1.0 representing the attack cooldown progress.

### PlayerEntityHelper.getAttackCooldownProgressPerTick
```js
const player = event.entity.asPlayer();
const cooldownPerTick = player.getAttackCooldownProgressPerTick();
Chat.log(`Attack cooldown per tick: ${Math.round(cooldownPerTick * 1000) / 1000}`);

// Calculate time until next attack
const attacksPerSecond = 1 / cooldownPerTick;
Chat.log(`Can attack approximately ${Math.round(attacksPerSecond * 10) / 10} times per second`);
```

**Params**
* `(none)`

**Returns**
* `number`: The attack cooldown progress per tick.

### PlayerEntityHelper.getChestArmor
```js
const player = event.entity.asPlayer();
const chestplate = player.getChestArmor();

if (!chestplate.isEmpty()) {
    Chat.log(`Chest armor: ${chestplate.getName().getString()}`);
    const durability = chestplate.getDurability();
    const maxDurability = chestplate.getMaxDurability();
    Chat.log(`Durability: ${durability}/${maxDurability}`);
} else {
    Chat.log("No chest armor equipped");
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The item in the player's chest armor slot.

### PlayerEntityHelper.getFootArmor
```js
const player = event.entity.asPlayer();
const boots = player.getFootArmor();

if (!boots.isEmpty()) {
    Chat.log(`Boots: ${boots.getName().getString()}`);

    if (boots.hasEnchantment("feather_falling")) {
        const featherFalling = boots.getEnchantment("feather_falling");
        Chat.log(`Feather Falling level: ${featherFalling.getLevel()}`);
    }
} else {
    Chat.log("No boots equipped");
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The item in the player's foot armor slot.

### PlayerEntityHelper.getFishingBobber
```js
const player = event.entity.asPlayer();
const fishingBobber = player.getFishingBobber();

if (fishingBobber) {
    Chat.log("Player is currently fishing");

    const pos = fishingBobber.getPos();
    Chat.log(`Hook position: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);

    if (fishingBobber.isInOpenWater()) {
        Chat.log("Hook is in open water");
    }
} else {
    Chat.log("Player is not fishing");
}
```

**Params**
* `(none)`

**Returns**
* `FishingBobberEntityHelper | null`: The player's fishing bobber entity, or `null` if not fishing.

### PlayerEntityHelper.getHeadArmor
```js
const player = event.entity.asPlayer();
const helmet = player.getHeadArmor();

if (!helmet.isEmpty()) {
    Chat.log(`Helmet: ${helmet.getName().getString()}`);

    if (helmet.hasEnchantment("protection")) {
        const protection = helmet.getEnchantment("protection");
        Chat.log(`Protection level: ${protection.getLevel()}`);
    }
} else {
    Chat.log("No helmet equipped");
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The item in the player's head armor slot.

### PlayerEntityHelper.getLegArmor
```js
const player = event.entity.asPlayer();
const leggings = player.getLegArmor();

if (!leggings.isEmpty()) {
    Chat.log(`Leggings: ${leggings.getName().getString()}`);

    const durability = leggings.getDurability();
    const maxDurability = leggings.getMaxDurability();
    const percentage = (durability / maxDurability) * 100;
    Chat.log(`Durability: ${Math.round(percentage)}%`);
} else {
    Chat.log("No leggings equipped");
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The item in the player's leg armor slot.

### PlayerEntityHelper.getMainHand
```js
const player = event.entity.asPlayer();
const mainHandItem = player.getMainHand();

if (!mainHandItem.isEmpty()) {
    Chat.log(`Main hand: ${mainHandItem.getName().getString()} x${mainHandItem.getCount()}`);

    if (mainHandItem.isDamageable()) {
        const durability = mainHandItem.getDurability();
        const maxDurability = mainHandItem.getMaxDurability();
        Chat.log(`Durability: ${durability}/${maxDurability}`);
    }
} else {
    Chat.log("Main hand is empty");
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The item in the player's main hand.

### PlayerEntityHelper.getOffHand
```js
const player = event.entity.asPlayer();
const offHandItem = player.getOffHand();

if (!offHandItem.isEmpty()) {
    Chat.log(`Off hand: ${offHandItem.getName().getString()} x${offHandItem.getCount()}`);

    if (offHandItem.getItemId() === "minecraft:shield") {
        Chat.log("Player has a shield equipped");
    }
} else {
    Chat.log("Off hand is empty");
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The item in the player's off hand.

### PlayerEntityHelper.getPlayerName
```js
const player = event.entity.asPlayer();
const playerName = player.getPlayerName();
const displayName = player.getName().getString();

Chat.log(`Player name: ${playerName}`);
Chat.log(`Display name: ${displayName}`);

if (playerName !== displayName) {
    Chat.log("Player has a custom display name");
}
```

**Params**
* `(none)`

**Returns**
* `string`: The actual username of the player (not the display name).

### PlayerEntityHelper.getScore
```js
const player = event.entity.asPlayer();
const score = player.getScore();

Chat.log(`Player score: ${score}`);

if (score > 0) {
    Chat.log("Player has earned points");
}
```

**Params**
* `(none)`

**Returns**
* `int`: The player's current score.

### PlayerEntityHelper.getXP
```js
const player = event.entity.asPlayer();
const totalXP = player.getXP();
const level = player.getXPLevel();

Chat.log(`Total experience: ${totalXP}`);
Chat.log(`Current level: ${level}`);

if (totalXP > 1000) {
    Chat.log("Player is experienced!");
}
```

**Params**
* `(none)`

**Returns**
* `int`: The total amount of experience points this player has.

### PlayerEntityHelper.getXPLevel
```js
const player = event.entity.asPlayer();
const level = player.getXPLevel();
const progress = player.getXPProgress();
const xpToNext = player.getXPToLevelUp();

Chat.log(`Level: ${level}`);
Chat.log(`Progress to next level: ${Math.round(progress * 100)}%`);
Chat.log(`XP needed for next level: ${xpToNext}`);

if (level >= 30) {
    Chat.log("Player is high level!");
}
```

**Params**
* `(none)`

**Returns**
* `int`: The current experience level of this player.

### PlayerEntityHelper.getXPProgress
```js
const player = event.entity.asPlayer();
const progress = player.getXPProgress();
const percentage = Math.round(progress * 100);

Chat.log(`Experience progress: ${percentage}%`);

// Create a visual progress bar
const barLength = 20;
const filledBars = Math.round((progress * barLength));
const emptyBars = barLength - filledBars;
const progressBar = "█".repeat(filledBars) + "░".repeat(emptyBars);
Chat.log(`[${progressBar}] ${percentage}%`);
```

**Params**
* `(none)`

**Returns**
* `number`: A value between 0.0 and 1.0 representing progress toward the next level.

### PlayerEntityHelper.getXPToLevelUp
```js
const player = event.entity.asPlayer();
const xpNeeded = player.getXPToLevelUp();
const currentXP = Player.getPlayer().getExperience();

Chat.log(`XP needed for next level: ${xpNeeded}`);
Chat.log(`Current experience in this level: ${currentXP}`);

if (xpNeeded > 0) {
    const percentage = (currentXP / xpNeeded) * 100;
    Chat.log(`Progress: ${Math.round(percentage)}%`);
}
```

**Params**
* `(none)`

**Returns**
* `int`: The amount of experience needed to reach the next level.

### PlayerEntityHelper.isSleepingLongEnough
```js
const player = event.entity.asPlayer();

if (player.isSleeping()) {
    if (player.isSleepingLongEnough()) {
        Chat.log("Player has slept long enough to skip the night");
    } else {
        Chat.log("Player is sleeping but not long enough yet");

        const timeLeft = 100 - (Date.now() % 100);
        Chat.log(`Approximately ${Math.ceil(timeLeft / 20)} seconds more needed`);
    }
} else {
    Chat.log("Player is not sleeping");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the player has slept long enough to pass the night, `false` otherwise.

## Inherited Methods from LivingEntityHelper

PlayerEntityHelper also inherits all methods from LivingEntityHelper, including:

- **Status Effects:** `getStatusEffects()`, `hasStatusEffect()`, `canHaveStatusEffect()`
- **Equipment:** `getMainHand()`, `getOffHand()`, `getHeadArmor()`, `getChestArmor()`, `getLegArmor()`, `getFootArmor()`
- **Health:** `getHealth()`, `getMaxHealth()`, `getAbsorptionHealth()`, `getArmor()`, `getDefaultHealth()`
- **State:** `isSleeping()`, `isFallFlying()`, `isOnGround()`, `canBreatheInWater()`, `hasNoDrag()`, `hasNoGravity()`
- **Combat:** `canTarget()`, `canTakeDamage()`, `getBowPullProgress()`, `getItemUseTimeLeft()`
- **Properties:** `isBaby()`, `isUndead()`, `getMobTags()`
- **Visibility:** `canSeeEntity()`

## Inherited Methods from EntityHelper

Additionally, PlayerEntityHelper inherits all methods from EntityHelper, including:

- **Position:** `getPos()`, `getX()`, `getY()`, `getZ()`, `getBlockPos()`, `getEyePos()`
- **Movement:** `getVelocity()`, `getSpeed()`, `getFacingDirection()`
- **Appearance:** `getName()`, `getType()`, `getUUID()`
- **State:** `isAlive()`, `isGlowing()`, `isOnFire()`, `isSneaking()`, `isSprinting()`
- **Interaction:** `getVehicle()`, `getPassengers()`, `setGlowing()`, `setCustomName()`
- **Utility:** `getNBT()`, `getBiome()`, `getChunk()`, `distanceTo()`, `rayTraceBlock()`, `rayTraceEntity()`
- **Casting:** `asPlayer()`, `asLiving()`, `asClientPlayer()`