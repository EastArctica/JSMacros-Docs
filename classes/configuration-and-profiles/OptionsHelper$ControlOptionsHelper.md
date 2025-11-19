# OptionsHelper.ControlOptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper$ControlOptionsHelper`

**Implements:** Inner class of `OptionsHelper`

**Since:** JsMacros 1.8.4

The `ControlOptionsHelper` class provides access to control-related game options in Minecraft. This includes mouse settings, key bindings, toggles for various movement actions, and other input-related configurations. It allows scripts to read and modify control settings programmatically.

## Overview

The `ControlOptionsHelper` class manages all player control settings:
- Mouse sensitivity and input settings
- Key bindings and their configurations
- Toggle functionality for sneaking and sprinting
- Auto-jump settings
- Raw mouse input and discrete scrolling options
- Access to all key binding categories and configurations

## Access

You can access the ControlOptionsHelper through the global `Options` variable:

```javascript
// Access the control options helper
const controlOptions = Options.getControlOptions();
// Alternatively, use the direct property
const controlOptions = Options.control;
```

## Fields

### `instance.parent`
Returns the parent `OptionsHelper` instance.

**Type:** `OptionsHelper`

**Example:**
```javascript
const controlOptions = Options.control;
const parentOptions = controlOptions.parent;
```

## Methods

### `instance.getParent()`
Returns the parent `OptionsHelper` instance.

**Params**
* `(none)`

**Returns**
* `OptionsHelper`: The parent options helper

**Example:**
```javascript
const controlOptions = Options.control;
const parent = controlOptions.getParent();
Chat.log(`Parent helper: ${parent}`);
```

### `instance.getMouseSensitivity()`
Returns the current mouse sensitivity value.

**Params**
* `(none)`

**Returns**
* `double`: Mouse sensitivity value (typically 0.0-1.0)

**Example:**
```javascript
const sensitivity = Options.control.getMouseSensitivity();
Chat.log(`Current mouse sensitivity: ${sensitivity}`);
```

### `instance.setMouseSensitivity(val)`
Sets the mouse sensitivity to the specified value.

**Params**

1. `val: double`: The new mouse sensitivity value

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Set mouse sensitivity to 50%
Options.control.setMouseSensitivity(0.5).saveOptions();
```

### `instance.isMouseInverted()`
Returns whether the mouse Y-axis is inverted.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if mouse is inverted, `false` otherwise

**Example:**
```javascript
const inverted = Options.control.isMouseInverted();
Chat.log(`Mouse inverted: ${inverted}`);
```

### `instance.invertMouse(val)`
Sets whether to invert the mouse Y-axis.

**Params**

1. `val: boolean`: Whether to invert the mouse

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Invert mouse for flight controls
Options.control.invertMouse(true).saveOptions();
```

### `instance.getMouseWheelSensitivity()`
Returns the current mouse wheel sensitivity.

**Params**
* `(none)`

**Returns**
* `double`: Mouse wheel sensitivity value

**Example:**
```javascript
const wheelSensitivity = Options.control.getMouseWheelSensitivity();
Chat.log(`Mouse wheel sensitivity: ${wheelSensitivity}`);
```

### `instance.setMouseWheelSensitivity(val)`
Sets the mouse wheel sensitivity to the specified value.

**Params**

1. `val: double`: The new mouse wheel sensitivity value

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Make mouse wheel scrolling slower
Options.control.setMouseWheelSensitivity(0.3).saveOptions();
```

### `instance.isDiscreteScrollingEnabled()`
Returns whether discrete scrolling is enabled. This option was added to address a bug on some systems where the mouse wheel would scroll too fast.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if discrete scrolling is enabled, `false` otherwise

**Example:**
```javascript
const discreteScroll = Options.control.isDiscreteScrollingEnabled();
Chat.log(`Discrete scrolling: ${discreteScroll}`);
```

### `instance.enableDiscreteScrolling(val)`
Sets whether to enable discrete scrolling.

**Params**

1. `val: boolean`: Whether to enable discrete scrolling

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Enable discrete scrolling to prevent overly fast scrolling
Options.control.enableDiscreteScrolling(true).saveOptions();
```

### `instance.isTouchscreenEnabled()`
Returns whether touchscreen mode is enabled.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if touchscreen mode is enabled, `false` otherwise

**Example:**
```javascript
const touchscreen = Options.control.isTouchscreenEnabled();
Chat.log(`Touchscreen mode: ${touchscreen}`);
```

### `instance.enableTouchscreen(val)`
Sets whether to enable touchscreen mode.

**Params**

1. `val: boolean`: Whether to enable touchscreen mode

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Enable touchscreen mode for tablet gameplay
Options.control.enableTouchscreen(true).saveOptions();
```

### `instance.isRawMouseInputEnabled()`
Returns whether raw mouse input is enabled. Raw input directly reads mouse data without adjustments from other programs or the operating system.

**Params**
* `(none)**

**Returns**
* `boolean`: `true` if raw mouse input is enabled, `false` otherwise

**Example:**
```javascript
const rawInput = Options.control.isRawMouseInputEnabled();
Chat.log(`Raw mouse input: ${rawInput}`);
```

### `instance.enableRawMouseInput(val)`
Sets whether to enable raw mouse input.

**Params**

1. `val: boolean`: Whether to enable raw mouse input

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Enable raw mouse input for more precise control
Options.control.enableRawMouseInput(true).saveOptions();
```

### `instance.isAutoJumpEnabled()`
Returns whether auto-jump is enabled.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if auto-jump is enabled, `false` otherwise

**Example:**
```javascript
const autoJump = Options.control.isAutoJumpEnabled();
Chat.log(`Auto-jump: ${autoJump}`);
```

### `instance.enableAutoJump(val)`
Sets whether to enable auto-jump.

**Params**

1. `val: boolean`: Whether to enable auto-jump

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Enable auto-jump for easier parkour
Options.control.enableAutoJump(true).saveOptions();
```

### `instance.isSneakTogglingEnabled()`
Returns whether the toggle functionality for sneaking is enabled.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if sneak toggling is enabled, `false` otherwise

**Example:**
```javascript
const sneakToggle = Options.control.isSneakTogglingEnabled();
Chat.log(`Sneak toggle: ${sneakToggle}`);
```

### `instance.toggleSneak(val)`
Sets whether to enable the toggle functionality for sneaking.

**Params**

1. `val: boolean`: Whether to enable sneak toggling

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Enable toggle sneaking for accessibility
Options.control.toggleSneak(true).saveOptions();
```

### `instance.isSprintTogglingEnabled()`
Returns whether the toggle functionality for sprinting is enabled.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if sprint toggling is enabled, `false` otherwise

**Example:**
```javascript
const sprintToggle = Options.control.isSprintTogglingEnabled();
Chat.log(`Sprint toggle: ${sprintToggle}`);
```

### `instance.toggleSprint(val)`
Sets whether to enable the toggle functionality for sprinting.

**Params**

1. `val: boolean`: Whether to enable sprint toggling

**Returns**
* `ControlOptionsHelper`: Self for chaining

**Example:**
```javascript
// Enable toggle sprinting for long-distance travel
Options.control.toggleSprint(true).saveOptions();
```

### `instance.getRawKeys()`
Returns an array of all raw Minecraft key bindings.

**Params**
* `(none)`

**Returns**
* `KeyBinding[]`: Array of all key binding objects

**Example:**
```javascript
const rawKeys = Options.control.getRawKeys();
Chat.log(`Total key bindings: ${rawKeys.length}`);
```

### `instance.getCategories()`
Returns a list of all key binding categories.

**Params**
* `(none)`

**Returns**
* `JavaList<String>`: List of key binding category names

**Example:**
```javascript
const categories = Options.control.getCategories();
Chat.log(`Key categories: ${categories.join(', ')}`);
```

### `instance.getKeys()`
Returns a list of all key names.

**Params**
* `(none)`

**Returns**
* `JavaList<String>`: List of all key binding names

**Example:**
```javascript
const keys = Options.control.getKeys();
keys.forEach(key => Chat.log(`Key: ${key}`));
```

### `instance.getKeyBinds()`
Returns a map of all key bindings and their bound keys.

**Params**
* `(none)`

**Returns**
* `JavaMap<Bind, Key>`: Map where keys are readable action names and values are the bound keys

**Example:**
```javascript
const keyBinds = Options.control.getKeyBinds();
for (const [action, key] of Object.entries(keyBinds)) {
    Chat.log(`${action}: ${key}`);
}
```

### `instance.getKeyBindsByCategory(category)`
Returns a map of key bindings and their bound keys for a specific category.

**Params**

1. `category: string`: The category to get keybindings from

**Returns**
* `JavaMap<Bind, Key>`: Map of keybindings in the specified category

**Example:**
```javascript
const movementKeys = Options.control.getKeyBindsByCategory("key.categories.movement");
Chat.log("Movement keys:");
for (const [action, key] of Object.entries(movementKeys)) {
    Chat.log(`  ${action}: ${key}`);
}
```

### `instance.getKeyBindsByCategory()`
Returns a map of all key binding categories, each containing a map of keybindings and their bound keys.

**Params**
* `(none)`

**Returns**
* `JavaMap<String, JavaMap<Bind, Key>>`: Nested map structure organizing keybindings by category

**Example:**
```javascript
const allKeyBinds = Options.control.getKeyBindsByCategory();
for (const [category, keys] of Object.entries(allKeyBinds)) {
    Chat.log(`\nCategory: ${category}`);
    for (const [action, key] of Object.entries(keys)) {
        Chat.log(`  ${action}: ${key}`);
    }
}
```

## Usage Examples

### Basic Control Configuration
```javascript
// Access control options
const control = Options.control;

// Configure mouse settings for precision aiming
control.setMouseSensitivity(0.3)
      .invertMouse(false)
      .setMouseWheelSensitivity(0.5)
      .enableRawMouseInput(true)
      .saveOptions();

Chat.log("Mouse configuration updated for precision aiming");
```

### Toggle Settings for Accessibility
```javascript
// Enable accessibility features
const control = Options.control;

control.enableAutoJump(true)
      .toggleSneak(true)
      .toggleSprint(true)
      .enableDiscreteScrolling(true)
      .saveOptions();

Chat.log("Accessibility toggles enabled");
```

### Key Binding Analysis
```javascript
// Analyze current key bindings
const control = Options.control;

// Get all key binding categories
const categories = control.getCategories();
Chat.log(`Found ${categories.length} key categories: ${categories.join(', ')}`);

// Get all key bindings
const allBinds = control.getKeyBinds();
Chat.log(`Total key bindings: ${Object.keys(allBinds).length}`);

// Get movement-specific keys
const movementKeys = control.getKeyBindsByCategory("key.categories.movement");
Chat.log("Movement key bindings:");
for (const [action, key] of Object.entries(movementKeys)) {
    Chat.log(`  ${action}: ${key}`);
}
```

### Control Profile Switcher
```javascript
// Switch between different control profiles
function switchToPreset(preset) {
    const control = Options.control;

    switch (preset.toLowerCase()) {
        case "precision":
            control.setMouseSensitivity(0.2)
                  .invertMouse(false)
                  .enableRawMouseInput(true)
                  .enableDiscreteScrolling(true);
            break;

        case "casual":
            control.setMouseSensitivity(0.6)
                  .invertMouse(false)
                  .enableAutoJump(true)
                  .toggleSprint(true);
            break;

        case "flight":
            control.setMouseSensitivity(0.8)
                  .invertMouse(true)
                  .toggleSneak(true)
                  .toggleSprint(true);
            break;

        default:
            Chat.log(`Unknown preset: ${preset}`);
            return;
    }

    control.saveOptions();
    Chat.log(`Switched to ${preset} control preset`);
}

// Usage examples:
switchToPreset("precision");  // For detailed building/redstone work
switchToPreset("casual");     // For relaxed exploration
switchToPreset("flight");     // For aerial combat or travel
```

### Control Settings Monitor
```javascript
// Monitor and display current control settings
function displayControlSettings() {
    const control = Options.control;

    Chat.log("=== Control Settings ===");
    Chat.log(`Mouse Sensitivity: ${control.getMouseSensitivity().toFixed(2)}`);
    Chat.log(`Mouse Inverted: ${control.isMouseInverted()}`);
    Chat.log(`Mouse Wheel Sensitivity: ${control.getMouseWheelSensitivity().toFixed(2)}`);
    Chat.log(`Discrete Scrolling: ${control.isDiscreteScrollingEnabled()}`);
    Chat.log(`Touchscreen Mode: ${control.isTouchscreenEnabled()}`);
    Chat.log(`Raw Mouse Input: ${control.isRawMouseInputEnabled()}`);
    Chat.log(`Auto-Jump: ${control.isAutoJumpEnabled()}`);
    Chat.log(`Sneak Toggle: ${control.isSneakTogglingEnabled()}`);
    Chat.log(`Sprint Toggle: ${control.isSprintTogglingEnabled()}`);
}

// Display settings on script start
displayControlSettings();

// Monitor for changes every 5 seconds
let lastSettings = {};
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const currentSettings = {
        sensitivity: Options.control.getMouseSensitivity(),
        inverted: Options.control.isMouseInverted(),
        autoJump: Options.control.isAutoJumpEnabled()
    };

    if (JSON.stringify(currentSettings) !== JSON.stringify(lastSettings)) {
        lastSettings = currentSettings;
        Chat.log("Control settings changed!");
        displayControlSettings();
    }
}));
```

### Key Binding Export/Import
```javascript
// Export current key bindings to a file
function exportKeyBindings() {
    const keyBinds = Options.control.getKeyBindsByCategory();
    const exportData = JSON.stringify(keyBinds, null, 2);

    // Save to file (using File API if available)
    // This is a conceptual example - actual file operations depend on your environment
    Chat.log("Key bindings exported (length: " + exportData.length + " characters)");
    return exportData;
}

// Function to analyze key binding conflicts
function checkKeyConflicts() {
    const allBinds = Options.control.getKeyBinds();
    const usedKeys = {};
    const conflicts = [];

    for (const [action, key] of Object.entries(allBinds)) {
        if (usedKeys[key]) {
            conflicts.push({
                key: key,
                actions: [usedKeys[key], action]
            });
        } else {
            usedKeys[key] = action;
        }
    }

    if (conflicts.length > 0) {
        Chat.log(`Found ${conflicts.length} key conflicts:`);
        conflicts.forEach(conflict => {
            Chat.log(`  Key "${conflict.key}": ${conflict.actions.join(" and ")}`);
        });
    } else {
        Chat.log("No key conflicts found");
    }
}

// Check for conflicts
checkKeyConflicts();
```

## Important Notes

1. **Method Chaining:** Most setter methods return the helper instance for easy chaining.

2. **Saving Changes:** Use `Options.saveOptions()` to persist changes to the options file.

3. **Key Binding Categories:** Common categories include:
   - `key.categories.movement` - Movement controls
   - `key.categories.inventory` - Inventory management
   - `key.categories.gameplay` - General gameplay actions
   - `key.categories.multiplayer` - Multiplayer-specific controls
   - `key.categories.ui` - User interface controls
   - `key.categories.misc` - Miscellaneous controls

4. **Mouse Sensitivity Range:** Mouse sensitivity values typically range from 0.0 (slowest) to 1.0 (fastest), though values outside this range may work.

5. **Raw Mouse Input:** Raw input bypasses system-level mouse acceleration and provides more direct input. This is preferred for competitive play.

6. **Discrete Scrolling:** When enabled, prevents mouse wheel from scrolling too quickly on some systems.

7. **Toggle Functions:** When enabled, allows holding keys like shift or Ctrl to toggle states instead of requiring continuous holding.

8. **Thread Safety:** All option modifications should be done from the main thread or using appropriate synchronization.

## Related Classes

- `OptionsHelper` - Parent class providing access to all game options
- `KeyBinding` - Minecraft's key binding class
- `GameOptions` - Base Minecraft options class
- `OptionsHelper.SkinOptionsHelper` - Skin and character appearance options
- `OptionsHelper.VideoOptionsHelper` - Video and graphics settings
- `OptionsHelper.MusicOptionsHelper` - Audio and music settings

## Version History

- **1.8.4:** Initial release with comprehensive control options access
- **Current:** Enhanced with key binding management and mouse input options