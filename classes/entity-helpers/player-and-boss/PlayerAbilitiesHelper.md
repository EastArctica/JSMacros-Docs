# PlayerAbilitiesHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.PlayerAbilitiesHelper`

**Extends:** `BaseHelper<PlayerAbilities>`

## Overview

The `PlayerAbilitiesHelper` class provides access to a player's ability settings and properties in Minecraft. This helper allows scripts to read and modify various player abilities such as flying, creative mode, invulnerability, movement speeds, and world modification permissions. It wraps Minecraft's native `PlayerAbilities` class and exposes both getter and setter methods for common player ability modifications.

This class is commonly accessed through player-related events or by directly querying the player object, making it essential for scripts that need to modify or monitor player capabilities.

## Accessing PlayerAbilitiesHelper

You typically get `PlayerAbilitiesHelper` instances from:

- The `PlayerHelper.getAbilities()` method
- Player-related events that expose player data
- Direct access from the global `player` object

```javascript
// Example: Getting PlayerAbilitiesHelper from the player
const abilities = player.getAbilities();

// Example: From player events
events.on("PlayerUpdate", (event) => {
    const abilities = event.player.getAbilities();
    // Work with player abilities
});
```

## Methods and Properties

### Property Access Methods

#### `getInvulnerable()`
Returns whether the player is invulnerable (cannot take damage).

```javascript
const abilities = player.getAbilities();
const isInvulnerable = abilities.getInvulnerable();
if (isInvulnerable) {
    Chat.log("Player is currently invulnerable");
}
```

**Returns**
* `boolean`: `true` if the player cannot be damaged, `false` otherwise

#### `getFlying()`
Returns whether the player is currently flying.

```javascript
const abilities = player.getAbilities();
if (abilities.getFlying()) {
    Chat.log("Player is currently flying");
} else {
    Chat.log("Player is on the ground");
}
```

**Returns**
* `boolean`: `true` if the player is currently in flight mode, `false` otherwise

#### `getAllowFlying()`
Returns whether the player is allowed to fly (has flight capability).

```javascript
const abilities = player.getAbilities();
if (abilities.getAllowFlying()) {
    Chat.log("Player can fly");
} else {
    Chat.log("Player cannot fly");
}
```

**Returns**
* `boolean`: `true` if the player has permission to fly, `false` otherwise

#### `getCreativeMode()`
Returns whether the player is in creative mode.

```javascript
const abilities = player.getAbilities();
if (abilities.getCreativeMode()) {
    Chat.log("Player is in creative mode");
} else {
    Chat.log("Player is in survival or adventure mode");
}
```

**Returns**
* `boolean`: `true` if the player is in creative mode, `false` otherwise

#### `canModifyWorld()`
Returns whether the player is allowed to modify the world (place/break blocks, interact with blocks).

```javascript
const abilities = player.getAbilities();
if (abilities.canModifyWorld()) {
    Chat.log("Player can modify the world");
} else {
    Chat.log("Player cannot modify the world");
}
```

**Returns**
* `boolean`: `true` if the player can modify the world, `false` otherwise

**Notes**
Even if this method returns `true`, the player may not be able to modify the world due to other restrictions such as server plugins and mods. Modifying the world includes placing, breaking, or interacting with blocks.

### Movement Speed Methods

#### `getFlySpeed()`
Returns the player's flying speed multiplier.

```javascript
const abilities = player.getAbilities();
const flySpeed = abilities.getFlySpeed();
Chat.log("Current fly speed: " + flySpeed);
```

**Returns**
* `float`: The current fly speed multiplier (default is typically 0.05)

#### `setFlySpeed(flySpeed)`
Sets the player's flying speed multiplier.

```javascript
const abilities = player.getAbilities();
// Set fly speed to 2x normal speed
abilities.setFlySpeed(0.1);
Chat.log("Fly speed increased!");

// Reset to normal speed
abilities.setFlySpeed(0.05);
```

**Params**
1. `flySpeed: double`: The new fly speed multiplier (typical range: 0.0 to 1.0+)

**Returns**
* `PlayerAbilitiesHelper`: Returns itself for method chaining

#### `getWalkSpeed()`
Returns the player's walking speed multiplier.

```javascript
const abilities = player.getAbilities();
const walkSpeed = abilities.getWalkSpeed();
Chat.log("Current walk speed: " + walkSpeed);
```

**Returns**
* `float`: The current walk speed multiplier (default is typically 0.1)

#### `setWalkSpeed(speed)`
Sets the player's walking speed multiplier.

```javascript
const abilities = player.getAbilities();
// Set walk speed to 2x normal speed
abilities.setWalkSpeed(0.2);
Chat.log("Walk speed increased!");

// Reset to normal speed
abilities.setWalkSpeed(0.1);
```

**Params**
1. `speed: double`: The new walk speed multiplier (typical range: 0.0 to 1.0+)

**Returns**
* `PlayerAbilitiesHelper`: Returns itself for method chaining

### Flying Control Methods

#### `setFlying(flying)`
Sets whether the player is currently flying.

```javascript
const abilities = player.getAbilities();
// Enable flying
abilities.setFlying(true);
Chat.log("Flying enabled");

// Disable flying
abilities.setFlying(false);
Chat.log("Flying disabled");
```

**Params**
1. `flying: boolean`: Whether the player should be flying (`true`) or not (`false`)

**Returns**
* `PlayerAbilitiesHelper`: Returns itself for method chaining

#### `setAllowFlying(allowFlying)`
Sets whether the player is allowed to fly.

```javascript
const abilities = player.getAbilities();
// Enable flight capability
abilities.setAllowFlying(true);
Chat.log("Flight capability granted");

// Disable flight capability
abilities.setAllowFlying(false);
Chat.log("Flight capability revoked");
```

**Params**
1. `allowFlying: boolean`: Whether the player should be allowed to fly (`true`) or not (`false`)

**Returns**
* `PlayerAbilitiesHelper`: Returns itself for method chaining

### Inherited Methods

From `BaseHelper<PlayerAbilities>`:

- `equals(obj)` - Compares this PlayerAbilitiesHelper to another object
- `hashCode()` - Returns the hash code of the underlying PlayerAbilities
- `toString()` - Returns a string representation of the PlayerAbilitiesHelper

## Usage Examples

### Basic Flying Controls
```javascript
// Toggle flight with a simple command
function toggleFlight() {
    const abilities = player.getAbilities();

    if (!abilities.getAllowFlying()) {
        abilities.setAllowFlying(true);
        Chat.log("Flight capability granted");
    }

    abilities.setFlying(!abilities.getFlying());
    Chat.log("Flying " + (abilities.getFlying() ? "enabled" : "disabled"));
}

// Example usage
toggleFlight();
```

### Speed Modification Script
```javascript
// Create a speed boost script
function applySpeedBoost(multiplier) {
    const abilities = player.getAbilities();

    // Store original speeds
    const originalFlySpeed = abilities.getFlySpeed();
    const originalWalkSpeed = abilities.getWalkSpeed();

    // Apply boosted speeds
    abilities.setFlySpeed(originalFlySpeed * multiplier);
    abilities.setWalkSpeed(originalWalkSpeed * multiplier);

    Chat.log(`Speed boost applied: ${multiplier}x`);

    // Return a function to restore original speeds
    return function restoreSpeeds() {
        abilities.setFlySpeed(originalFlySpeed);
        abilities.setWalkSpeed(originalWalkSpeed);
        Chat.log("Speeds restored to normal");
    };
}

// Apply 2x speed boost and restore after 10 seconds
const restoreSpeeds = applySpeedBoost(2);
setTimeout(() => restoreSpeeds(), 10000);
```

### Creative Mode Helper
```javascript
// Utility function to enable creative mode features
function enableCreativeFeatures() {
    const abilities = player.getAbilities();

    // Enable creative mode abilities without actually changing game mode
    abilities.setAllowFlying(true);
    abilities.setFlying(false); // Start on ground

    Chat.log("Creative features enabled");
    Chat.log("- Flight capability granted");
    Chat.log("- Use setFlying(true) to start flying");
}

enableCreativeFeatures();
```

### Player Status Monitor
```javascript
// Monitor and display player abilities
function displayPlayerStatus() {
    const abilities = player.getAbilities();

    Chat.log("=== Player Abilities Status ===");
    Chat.log("Mode: " + (abilities.getCreativeMode() ? "Creative" : "Survival/Adventure"));
    Chat.log("Invulnerable: " + abilities.getInvulnerable());
    Chat.log("Can Fly: " + abilities.getAllowFlying());
    Chat.log("Currently Flying: " + abilities.getFlying());
    Chat.log("Can Modify World: " + abilities.canModifyWorld());
    Chat.log("Fly Speed: " + abilities.getFlySpeed());
    Chat.log("Walk Speed: " + abilities.getWalkSpeed());
}

displayPlayerStatus();
```

### Method Chaining Example
```javascript
// Demonstrate method chaining for setting multiple abilities
function configureForCreativeMode() {
    const abilities = player.getAbilities();

    // Chain multiple method calls
    abilities
        .setAllowFlying(true)
        .setFlying(false)
        .setFlySpeed(0.1)  // 2x normal fly speed
        .setWalkSpeed(0.2); // 2x normal walk speed

    Chat.log("Configured abilities for creative mode");
}

configureForCreativeMode();
```

### Safety Checks
```javascript
// Safe flying toggle with checks
function safeToggleFlight() {
    const abilities = player.getAbilities();

    // Check if player is in a position where flying is safe
    const currentY = player.getY();
    const isAboveVoid = currentY < 10;

    if (!abilities.getAllowFlying()) {
        Chat.log("Cannot fly: flight capability not granted");
        return;
    }

    if (isAboveVoid && !abilities.getFlying()) {
        Chat.log("Warning: You are near the void. Be careful when flying!");
    }

    abilities.setFlying(!abilities.getFlying());
    Chat.log("Flying " + (abilities.getFlying() ? "enabled" : "disabled"));
}

safeToggleFlight();
```

## Important Notes

- **Server Restrictions**: Many ability modifications may be overridden by server rules, plugins, or anti-cheat systems
- **Game Mode Dependencies**: Some abilities are automatically set based on the player's game mode (creative, survival, etc.)
- **Speed Limits**: Extreme speed values may cause issues or be detected by anti-cheat systems
- **Persistence**: Ability changes made through scripts are typically not persistent across server restarts or reconnections
- **Validation**: Always check if the server allows certain ability modifications before attempting to use them

## Related Classes

- `PlayerHelper` - The main player object that provides access to PlayerAbilitiesHelper
- `BaseHelper<PlayerAbilities>` - The parent class providing basic helper functionality
- `PlayerAbilities` - The underlying Minecraft class being wrapped

## Version Information

- Available since JSMacros 1.0.3
- Updated in 1.8.4 with additional methods (`canModifyWorld()`, `getWalkSpeed()`, `setWalkSpeed()`)