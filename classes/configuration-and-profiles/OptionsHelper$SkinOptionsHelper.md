# OptionsHelper.SkinOptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper$SkinOptionsHelper`

**Since:** JsMacros 1.8.4

The `SkinOptionsHelper` class provides access to Minecraft's skin and player model customization options. This helper allows scripts to read and modify various appearance settings including cape visibility, hand preference, and individual model parts (hat, jacket, sleeves, pants). It's accessed through the `OptionsHelper.getSkinOptions()` method or directly via the `skin` field.

## Overview

The `SkinOptionsHelper` class manages player appearance and model customization:
- **Cape visibility** - Show or hide the player's cape
- **Hand preference** - Switch between right-handed and left-handed
- **Model parts** - Control visibility of individual character model components
- **Character customization** - Fine-tuned control over player appearance elements

## Getting a SkinOptionsHelper Instance

You typically obtain a `SkinOptionsHelper` instance through the main `OptionsHelper`:

```javascript
// Get the global options helper
const options = JsMacros.getOptions();

// Access skin options
const skin = options.getSkinOptions();
// Or directly via the field
const skin = options.skin;
```

## Table of Contents

- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Model Parts Reference](#model-parts-reference)

## Fields

### `parent` (OptionsHelper)
The parent OptionsHelper instance that provides access to other option categories.

**Type:** `OptionsHelper`

## Methods

### Cape Management

#### `isCapeActivated()`
Checks if the player's cape is currently visible.

**Returns:** `boolean` - `true` if cape is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
if (skin.isCapeActivated()) {
    Chat.log("Cape is currently visible");
} else {
    Chat.log("Cape is hidden");
}
```

#### `toggleCape(boolean visible)`
Sets whether the player's cape should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show cape, `false` to hide cape |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();

// Hide cape for stealth
skin.toggleCape(false);
JsMacros.getOptions().saveOptions();
Chat.log("Cape hidden");

// Show cape again
skin.toggleCape(true);
JsMacros.getOptions().saveOptions();
Chat.log("Cape visible");
```

### Hand Preference

#### `isRightHanded()`
Checks if the player is configured as right-handed.

**Returns:** `boolean` - `true` if right-handed, `false` if left-handed

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
Chat.log(`Player is ${skin.isRightHanded() ? 'right-handed' : 'left-handed'}`);
```

#### `isLeftHanded()`
Checks if the player is configured as left-handed.

**Returns:** `boolean` - `true` if left-handed, `false` if right-handed

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
if (skin.isLeftHanded()) {
    Chat.log("Player uses left hand preference");
}
```

#### `toggleMainHand(String hand)`
Sets the player's main hand preference.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| hand | String | `"left"` or `"right"` - which hand to use as main hand |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();

// Switch to left-handed
skin.toggleMainHand("left");
JsMacros.getOptions().saveOptions();
Chat.log("Switched to left-handed");

// Switch back to right-handed
skin.toggleMainHand("right");
JsMacros.getOptions().saveOptions();
Chat.log("Switched to right-handed");
```

### Hat Layer

#### `isHatActivated()`
Checks if the player's hat layer is visible.

**Returns:** `boolean` - `true` if hat layer is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
if (skin.isHatActivated()) {
    Chat.log("Hat layer is visible");
} else {
    Chat.log("Hat layer is hidden");
}
```

#### `toggleHat(boolean visible)`
Sets whether the player's hat layer should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show hat layer, `false` to hide hat layer |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();

// Hide hat for minimalist look
skin.toggleHat(false);
JsMacros.getOptions().saveOptions();
Chat.log("Hat layer hidden");
```

### Jacket Layer

#### `isJacketActivated()`
Checks if the player's jacket layer is visible.

**Returns:** `boolean` - `true` if jacket layer is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
Chat.log(`Jacket layer: ${skin.isJacketActivated() ? 'visible' : 'hidden'}`);
```

#### `toggleJacket(boolean visible)`
Sets whether the player's jacket layer should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show jacket layer, `false` to hide jacket layer |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();

// Toggle jacket visibility
skin.toggleJacket(true);
JsMacros.getOptions().saveOptions();
```

### Left Sleeve

#### `isLeftSleeveActivated()`
Checks if the player's left sleeve layer is visible.

**Returns:** `boolean` - `true` if left sleeve is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
if (skin.isLeftSleeveActivated()) {
    Chat.log("Left sleeve is visible");
}
```

#### `toggleLeftSleeve(boolean visible)`
Sets whether the player's left sleeve layer should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show left sleeve, `false` to hide left sleeve |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
skin.toggleLeftSleeve(true);
JsMacros.getOptions().saveOptions();
```

### Right Sleeve

#### `isRightSleeveActivated()`
Checks if the player's right sleeve layer is visible.

**Returns:** `boolean` - `true` if right sleeve is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
Chat.log(`Right sleeve: ${skin.isRightSleeveActivated() ? 'visible' : 'hidden'}`);
```

#### `toggleRightSleeve(boolean visible)`
Sets whether the player's right sleeve layer should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show right sleeve, `false` to hide right sleeve |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
skin.toggleRightSleeve(true);
JsMacros.getOptions().saveOptions();
```

### Left Pants

#### `isLeftPantsActivated()`
Checks if the player's left pants layer is visible.

**Returns:** `boolean` - `true` if left pants layer is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
if (skin.isLeftPantsActivated()) {
    Chat.log("Left pants layer is visible");
}
```

#### `toggleLeftPants(boolean visible)`
Sets whether the player's left pants layer should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show left pants, `false` to hide left pants |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
skin.toggleLeftPants(true);
JsMacros.getOptions().saveOptions();
```

### Right Pants

#### `isRightPantsActivated()`
Checks if the player's right pants layer is visible.

**Returns:** `boolean` - `true` if right pants layer is visible, `false` if hidden

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
Chat.log(`Right pants: ${skin.isRightPantsActivated() ? 'visible' : 'hidden'}`);
```

#### `toggleRightPants(boolean visible)`
Sets whether the player's right pants layer should be visible.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visible | boolean | `true` to show right pants, `false` to hide right pants |

**Returns:** `SkinOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const skin = JsMacros.getOptions().getSkinOptions();
skin.toggleRightPants(true);
JsMacros.getOptions().saveOptions();
```

## Usage Examples

### Complete Skin Profile Setup

```javascript
function applyCompleteSkinProfile(profileName) {
    const skin = JsMacros.getOptions().getSkinOptions();

    switch (profileName.toLowerCase()) {
        case "full":
            // Show all model parts
            skin.toggleCape(true)
                .toggleHat(true)
                .toggleJacket(true)
                .toggleLeftSleeve(true)
                .toggleRightSleeve(true)
                .toggleLeftPants(true)
                .toggleRightPants(true);
            break;

        case "minimal":
            // Hide all decorative layers
            skin.toggleCape(false)
                .toggleHat(false)
                .toggleJacket(false)
                .toggleLeftSleeve(false)
                .toggleRightSleeve(false)
                .toggleLeftPants(false)
                .toggleRightPants(false);
            break;

        case "combat":
            // Keep essential parts, hide cape and hat for tactical advantage
            skin.toggleCape(false)
                .toggleHat(false)
                .toggleJacket(true)
                .toggleLeftSleeve(true)
                .toggleRightSleeve(true)
                .toggleLeftPants(true)
                .toggleRightPants(true);
            break;

        case "formal":
            // Show all formal attire parts
            skin.toggleCape(true)
                .toggleHat(true)
                .toggleJacket(true)
                .toggleLeftSleeve(true)
                .toggleRightSleeve(true)
                .toggleLeftPants(true)
                .toggleRightPants(true);
            break;

        default:
            Chat.log(`Unknown profile: ${profileName}`);
            return;
    }

    JsMacros.getOptions().saveOptions();
    Chat.log(`Applied skin profile: ${profileName}`);
}

// Usage examples:
applyCompleteSkinProfile("full");     // Show everything
applyCompleteSkinProfile("minimal");  // Minimal appearance
applyCompleteSkinProfile("combat");   // Combat-ready
applyCompleteSkinProfile("formal");   // Formal attire
```

### Hand Preference Switcher

```javascript
function switchHandPreference() {
    const skin = JsMacros.getOptions().getSkinOptions();
    const currentHand = skin.isRightHanded() ? "right" : "left";
    const newHand = currentHand === "right" ? "left" : "right";

    skin.toggleMainHand(newHand);
    JsMacros.getOptions().saveOptions();

    Chat.log(`Switched from ${currentHand}-handed to ${newHand}-handed`);
}

// Toggle hand preference
switchHandPreference();
```

### Skin Visibility Status Display

```javascript
function displaySkinStatus() {
    const skin = JsMacros.getOptions().getSkinOptions();

    Chat.log("=== Current Skin Settings ===");
    Chat.log(`Main Hand: ${skin.isRightHanded() ? 'Right' : 'Left'}`);
    Chat.log(`Cape: ${skin.isCapeActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log(`Hat Layer: ${skin.isHatActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log(`Jacket Layer: ${skin.isJacketActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log(`Left Sleeve: ${skin.isLeftSleeveActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log(`Right Sleeve: ${skin.isRightSleeveActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log(`Left Pants: ${skin.isLeftPantsActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log(`Right Pants: ${skin.isRightPantsActivated() ? 'Visible' : 'Hidden'}`);
    Chat.log("==========================");
}

// Display current skin configuration
displaySkinStatus();
```

### Dynamic Skin Customization

```javascript
// Customize skin based on game context
function customizeSkinForContext() {
    const skin = JsMacros.getOptions().getSkinOptions();
    const world = World;
    const player = Player.getPlayer();

    if (!player) return;

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    if (healthPercent < 0.3) {
        // Low health - remove cape for tactical advantage
        skin.toggleCape(false);
        Chat.log("Cape hidden for tactical advantage");
    } else if (healthPercent > 0.8) {
        // Healthy - show all decorative elements
        skin.toggleCape(true);
        skin.toggleHat(true);
    }

    JsMacros.getOptions().saveOptions();
}

// Run periodically to adapt skin based on gameplay
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const currentTick = Date.now() / 1000;
    if (currentTick % 5 === 0) { // Every 5 seconds
        customizeSkinForContext();
    }
}));
```

### Skin Profile Manager

```javascript
class SkinProfileManager {
    constructor() {
        this.profiles = new Map();
        this.currentProfile = null;
        this.loadProfiles();
    }

    loadProfiles() {
        // Define some preset profiles
        this.profiles.set("default", {
            cape: true,
            hat: true,
            jacket: true,
            leftSleeve: true,
            rightSleeve: true,
            leftPants: true,
            rightPants: true
        });

        this.profiles.set("stealth", {
            cape: false,
            hat: false,
            jacket: false,
            leftSleeve: false,
            rightSleeve: false,
            leftPants: false,
            rightPants: false
        });

        this.profiles.set("casual", {
            cape: false,
            hat: true,
            jacket: true,
            leftSleeve: true,
            rightSleeve: true,
            leftPants: true,
            rightPants: true
        });
    }

    applyProfile(profileName) {
        const profile = this.profiles.get(profileName);
        if (!profile) {
            Chat.log(`Unknown profile: ${profileName}`);
            return false;
        }

        const skin = JsMacros.getOptions().getSkinOptions();

        skin.toggleCape(profile.cape)
            .toggleHat(profile.hat)
            .toggleJacket(profile.jacket)
            .toggleLeftSleeve(profile.leftSleeve)
            .toggleRightSleeve(profile.rightSleeve)
            .toggleLeftPants(profile.leftPants)
            .toggleRightPants(profile.rightPants);

        JsMacros.getOptions().saveOptions();
        this.currentProfile = profileName;

        Chat.log(`Applied skin profile: ${profileName}`);
        return true;
    }

    getCurrentProfile() {
        return this.currentProfile;
    }

    listProfiles() {
        Chat.log("Available skin profiles:");
        for (const [name, profile] of this.profiles) {
            const marker = name === this.currentProfile ? " (current)" : "";
            Chat.log(`- ${name}${marker}`);
        }
    }
}

// Usage example:
const skinManager = new SkinProfileManager();
skinManager.listProfiles();
skinManager.applyProfile("stealth");
```

## Model Parts Reference

| Model Part | Description | Use Cases |
| ---------- | ----------- | --------- |
| **Cape** | Player cape or cloak decoration | Hide for tactical advantage, show for vanity |
| **Hat Layer** | Top part of player's head skin | Hide for helmet visibility, show for complete appearance |
| **Jacket Layer** | Upper body clothing layer | Hide for armor visibility, show for character customization |
| **Left Sleeve** | Left arm clothing layer | Part of complete outfit appearance |
| **Right Sleeve** | Right arm clothing layer | Part of complete outfit appearance |
| **Left Pants** | Left leg clothing layer | Part of complete outfit appearance |
| **Right Pants** | Right leg clothing layer | Part of complete outfit appearance |

## Important Notes

1. **Persistence:** Changes to skin settings are automatically saved when `saveOptions()` is called and persist between game sessions.

2. **Visual Effects:** Skin changes are immediately visible in the game world and in third-person view.

3. **Multiplayer:** Skin customization affects how other players see your character model.

4. **Method Chaining:** All setter methods return the helper instance for easy method chaining.

5. **Compatibility:** All skin settings work with custom skins and texture packs.

6. **Performance:** Changing skin settings is lightweight and has no performance impact.

7. **Default State:** New installations typically have all model parts enabled by default.

8. **Hand Preference:** The main hand setting affects item display and interaction animations.

## Related Classes

- `OptionsHelper` - Parent class providing access to all option categories
- `GameOptions` - The underlying Minecraft options class that this helper wraps
- `PlayerEntityHelper` - Player entity operations and information
- `ItemStackHelper` - Item display and handling (affected by hand preference)

## Version History

- **1.8.4:** Initial release with comprehensive skin customization support
- **Current:** Enhanced with method chaining and improved model part control

The `SkinOptionsHelper` class provides fine-grained control over player appearance, enabling everything from tactical customization to personal expression through character model customization.