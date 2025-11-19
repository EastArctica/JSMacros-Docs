# PlayerEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.PlayerEntityHelper`

**Extends:** `LivingEntityHelper<PlayerEntity>`

The `PlayerEntityHelper` class is a specialized wrapper for player entities in JSMacros, providing access to player-specific functionality, experience management, abilities, inventory information, and various player-state operations. This class extends `LivingEntityHelper` and inherits all living entity methods while adding player-specific functionality like experience tracking, abilities management, sleep mechanics, combat information, and player identification.

This class represents both client players and other players in multiplayer contexts, providing comprehensive methods for accessing player data, checking player states, managing experience and abilities, and interacting with player-specific game mechanics.

## Table of Contents

- [Constructors](#constructors)
- [Player Information](#player-information)
- [Experience and Leveling](#experience-and-leveling)
- [Player Abilities](#player-abilities)
- [Inventory and Equipment](#inventory-and-equipment)
- [Sleep and Rest](#sleep-and-rest)
- [Combat and Interaction](#combat-and-interaction)
- [Fishing](#fishing)
- [Inherited Methods](#inherited-methods)

## Constructors

PlayerEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events where the entity is a player
- World entity queries that return player entities
- Methods that return player entities
- Type casting from EntityHelper using `asPlayer()`

```js
// Getting PlayerEntityHelper from events
JsMacros.on("PlayerJoin", JavaWrapper.methodToJavaAsync((event) => {
    const player = event.getPlayer(); // Returns a PlayerEntityHelper
    const playerName = player.getPlayerName();
    Chat.log(`${playerName} joined the game`);
}));

// Type casting from EntityHelper
const entity = event.getEntity();
if (entity.is("minecraft:player")) {
    const player = entity.asPlayer();
    Chat.log(`Found player: ${player.getPlayerName()}`);
}
```

---

## Player Information

## Experience and Leveling

## Player Abilities

## Inventory and Equipment

The PlayerEntityHelper inherits all inventory and equipment methods from LivingEntityHelper:

## Sleep and Rest

## Combat and Interaction

## Fishing

## Inherited Methods

From `LivingEntityHelper`:

### Health and Status
- `player.getHealth()` - Current health
- `player.getMaxHealth()` - Maximum health
- `player.getAbsorptionHealth()` - Absorption hearts
- `player.getArmor()` - Current armor value
- `player.getStatusEffects()` - List of active status effects
- `player.hasStatusEffect(id)` - Check for specific status effect
- `player.isSleeping()` - Check if sleeping (overridden with PlayerEntity version)
- `player.isFallFlying()` - Check if elytra is deployed

### Movement and State
- `player.isOnGround()` - Check if on ground
- `player.canBreatheInWater()` - Check if can breathe underwater
- `player.hasNoDrag()` - Check if has no drag
- `player.hasNoGravity()` - Check if has no gravity
- `player.canTakeDamage()` - Check if can take damage
- `player.isPartOfGame()` - Check if is alive and not spectator
- `player.isSpectator()` - Check if in spectator mode
- `player.isUndead()` - Check if is undead mob type
- `player.isBaby()` - Check if is baby variant

### Interaction and Vision
- `player.isHolding(item)` - Check if holding specific item
- `player.canSeeEntity(entity)` - Check if has line of sight to entity
- `player.getBowPullProgress()` - Get bow pull progress
- `player.getItemUseTimeLeft()` - Get item use time remaining

From `EntityHelper`:
- All position, movement, entity information, raytracing, and utility methods
- Distance calculations, type checking, NBT access, etc.

---

## Usage Examples

### Complete Player Status Monitor
```js
// Comprehensive player monitoring system
class PlayerMonitor {
    constructor() {
        this.lastHealth = 0;
        this.lastHunger = 0;
        this.lastXP = 0;
        this.lastLevel = 0;
        this.alertsEnabled = true;
    }

    updateStatus() {
        const player = Player.getPlayer();
        if (!player) return;

        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const absorption = player.getAbsorptionHealth();
        const xp = player.getXP();
        const level = player.getXPLevel();
        const xpProgress = player.getXPProgress();
        const score = player.getScore();
        const abilities = player.getAbilities();

        // Health monitoring
        if (health !== this.lastHealth && this.alertsEnabled) {
            if (health < this.lastHealth) {
                const damage = this.lastHealth - health + absorption;
                Chat.actionbar(`&c-${damage.toFixed(1)} HP`);
            } else {
                const healed = health - this.lastHealth;
                Chat.actionbar(`&a+${healed.toFixed(1)} HP`);
            }
        }

        // XP monitoring
        if (level > this.lastLevel) {
            Chat.log(`&a&lLEVEL UP! Now level ${level}!`);
        }

        // Display comprehensive status
        const healthPercent = (health / maxHealth * 100).toFixed(0);
        const xpPercent = (xpProgress * 100).toFixed(0);

        Chat.actionbar(`&7HP: ${health.toFixed(1)}/${maxHealth} (${healthPercent}%) | Level ${level} (${xpPercent}%) | Score: ${score}`);

        this.lastHealth = health;
        this.lastXP = xp;
        this.lastLevel = level;
    }

    getPlayerSummary() {
        const player = Player.getPlayer();
        if (!player) return;

        const abilities = player.getAbilities();
        const mainHand = player.getMainHand();

        Chat.log("=== Player Summary ===");
        Chat.log(`Name: ${player.getPlayerName()}`);
        Chat.log(`Health: ${player.getHealth()}/${player.getMaxHealth()}`);
        Chat.log(`Experience: Level ${player.getXPLevel()} (${player.getXP()} total XP)`);
        Chat.log(`Score: ${player.getScore()}`);
        Chat.log(`Game Mode: ${abilities.creativeMode ? "Creative" : abilities.spectatorMode ? "Spectator" : "Survival"}`);
        Chat.log(`Flying: ${abilities.flying ? "Yes" : "No"}`);

        if (!mainHand.isEmpty()) {
            Chat.log(`Holding: ${mainHand.getName()} x${mainHand.getCount()}`);
        }

        // Armor status
        const armorPieces = [
            player.getHeadArmor(),
            player.getChestArmor(),
            player.getLegArmor(),
            player.getFootArmor()
        ].filter(armor => !armor.isEmpty()).length;

        if (armorPieces > 0) {
            Chat.log(`Armor: ${armorPieces}/4 pieces equipped`);
        }
    }
}

const playerMonitor = new PlayerMonitor();

// Status monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) { // Update every second
        playerMonitor.updateStatus();
    }
}));

// Status summary keybind
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.p") {
        playerMonitor.getPlayerSummary();
    }
}));
```

### Multiplayer Player Tracker
```js
// Track all players on the server
class PlayerTracker {
    constructor() {
        this.trackedPlayers = new Map();
        this.playerStats = new Map();
    }

    updatePlayerList() {
        const players = World.getLoadedPlayers();
        const currentPlayer = Player.getPlayer();

        // Update tracked players
        players.forEach(player => {
            const name = player.getPlayerName();
            const uuid = player.getUUID();

            if (!this.trackedPlayers.has(uuid)) {
                this.trackedPlayers.set(uuid, player);
                this.playerStats.set(uuid, {
                    name: name,
                    firstSeen: Client.getTime(),
                    lastPosition: player.getPos(),
                    totalDistance: 0,
                    maxHealth: player.getMaxHealth()
                });
                Chat.log(`&aStarted tracking: ${name}`);
            } else {
                // Update distance traveled
                const stats = this.playerStats.get(uuid);
                const currentPos = player.getPos();
                const lastPos = stats.lastPosition;
                const distance = currentPos.distanceTo(lastPos);

                stats.totalDistance += distance;
                stats.lastPosition = currentPos;
                stats.currentHealth = player.getHealth();
                stats.level = player.getXPLevel();
                stats.score = player.getScore();
            }
        });

        // Check for players who left
        for (const [uuid, stats] of this.playerStats) {
            const player = this.trackedPlayers.get(uuid);
            if (!player || !player.isAlive()) {
                const playTime = Client.getTime() - stats.firstSeen;
                Chat.log(`&e${stats.name} left (played for ${Math.floor(playTime / 20)}s, traveled ${stats.totalDistance.toFixed(1)} blocks)`);
                this.trackedPlayers.delete(uuid);
            }
        }
    }

    getPlayerReport() {
        Chat.log("=== Player Tracking Report ===");
        Chat.log(`Currently tracking: ${this.trackedPlayers.size} players`);

        for (const [uuid, stats] of this.playerStats) {
            const player = this.trackedPlayers.get(uuid);
            if (!player) continue;

            const playTime = Client.getTime() - stats.firstSeen;
            const healthPercent = (stats.currentHealth / stats.maxHealth * 100).toFixed(0);

            Chat.log(`\n&6${stats.name}:`);
            Chat.log(`  Time online: ${Math.floor(playTime / 60)}m ${Math.floor(playTime % 60)}s`);
            Chat.log(`  Distance traveled: ${stats.totalDistance.toFixed(1)} blocks`);
            Chat.log(`  Health: ${healthPercent}%`);
            Chat.log(`  Level: ${stats.level}`);
            Chat.log(`  Score: ${stats.score}`);

            // Current equipment
            const weapon = player.getMainHand();
            if (!weapon.isEmpty()) {
                Chat.log(`  Holding: ${weapon.getName()}`);
            }
        }
    }

    findNearestPlayer() {
        const player = Player.getPlayer();
        if (!player) return null;

        const myPos = player.getPos();
        let nearest = null;
        let nearestDistance = Infinity;

        for (const [uuid, otherPlayer] of this.trackedPlayers) {
            const other = otherPlayer;
            if (other === player) continue;

            const distance = myPos.distanceTo(other.getPos());
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearest = other;
            }
        }

        return nearest ? { player: nearest, distance: nearestDistance } : null;
    }
}

const playerTracker = new PlayerTracker();

// Update player list every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 100 === 0) {
        playerTracker.updatePlayerList();
    }
}));

// Player tracking commands
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.u") {
        playerTracker.getPlayerReport();
    } else if (event.key === "key.keyboard.n") {
        const nearest = playerTracker.findNearestPlayer();
        if (nearest) {
            Chat.log(`Nearest player: ${nearest.player.getPlayerName()} (${nearest.distance.toFixed(1)} blocks away)`);
        } else {
            Chat.log("No other players found");
        }
    }
}));
```

## Notes and Limitations

- **Type Safety:** PlayerEntityHelper instances can be null if the player leaves or the entity is removed. Always check for validity before accessing methods.
- **Server-Side Limitations:** Some methods may have limited functionality on multiplayer servers due to client-side restrictions and synchronization delays.
- **Experience Tracking:** Experience values represent the client-side understanding and may not always match server-side values precisely.
- **Ability Detection:** Player abilities reflect the current client state and may change based on server updates.
- **Sleep Detection:** Sleep-related methods work best on integrated servers; multiplayer sleep mechanics may vary.
- **Combat Cooldowns:** Attack cooldown calculations are based on client-side timing and may not perfectly match server-side validation.

## Related Classes

- `LivingEntityHelper` - Parent class with living entity functionality
- `EntityHelper` - Base class with entity methods
- `ClientPlayerEntityHelper` - Client-side specific player functionality
- `PlayerAbilitiesHelper` - Player abilities and gamemode information
- `ItemStackHelper` - Item stack operations and information
- `FishingBobberEntityHelper` - Fishing bobber functionality
- `StatusEffectHelper` - Status effect information and management

## Version Information

- Available since JSMacros 1.0.3
- getAbilities() method available since 1.0.3
- Equipment methods available since 1.2.0
- XP tracking methods added in 1.2.5 and expanded in 1.6.5
- Sleep functionality available since 1.2.5
- Combat cooldown methods added in 1.8.4
- Fishing bobber access added in 1.8.4
- Player name access added in 1.8.4