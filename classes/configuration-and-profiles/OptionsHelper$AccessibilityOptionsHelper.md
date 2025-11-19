# OptionsHelper.AccessibilityOptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper$AccessibilityOptionsHelper`

**Since:** JsMacros 1.8.4

The `AccessibilityOptionsHelper` class provides access to Minecraft's accessibility options, allowing scripts to read and modify various accessibility settings that improve gameplay for users with different needs. This includes settings for visual effects, chat display, audio narration, and control toggles.

Access this helper through `OptionsHelper.getAccessibilityOptions()` or directly via `Client.options.accessibility`.

## Overview

The `AccessibilityOptionsHelper` class manages various accessibility features in Minecraft:
- **Visual settings:** Text background opacity, chat transparency, visual effects
- **Audio settings:** Narrator modes and subtitle display
- **Control settings:** Toggle functionality for sneaking and sprinting
- **Display settings:** Distortion effects, FOV effects, and visual modifications

## Fields

### `instance.parent`
**Type:** `OptionsHelper`

Returns the parent OptionsHelper instance that contains this accessibility helper.

## Constructors

### `new AccessibilityOptionsHelper(optionsHelper)`
Internal constructor used by OptionsHelper to create the accessibility helper instance.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| optionsHelper | OptionsHelper | The parent OptionsHelper instance |

**Note:** This constructor is typically not called directly by scripts. Use `OptionsHelper.getAccessibilityOptions()` instead.

## Methods

### `instance.getParent()`
Returns the parent OptionsHelper instance.

**Example:**
```js
const parent = accessibility.getParent();
Chat.log(`Parent helper: ${parent.toString()}`);
```

**Params**
* `(none)`

**Returns**
* `OptionsHelper`: The parent options helper

### `instance.getNarratorMode()`
Returns the current narrator mode setting.

**Example:**
```js
const narratorMode = Client.options.accessibility.getNarratorMode();
Chat.log(`Current narrator mode: ${narratorMode}`);
```

**Params**
* `(none)`

**Returns**
* `string`: The current narrator mode. Possible values are extracted from translation keys.

### `instance.setNarratorMode(mode)`
Sets the narrator mode to the specified value.

**Example:**
```js
// Enable narrator for all game elements
Client.options.accessibility.setNarratorMode("ALL");

// Enable narrator only for chat
Client.options.accessibility.setNarratorMode("CHAT");

// Turn off narrator
Client.options.accessibility.setNarratorMode("OFF");
```

**Params**
1. `mode: string`: The narrator mode to set. Must be one of:
   - `"OFF"` - Disable narrator completely
   - `"ALL"` - Narrate all game elements
   - `"CHAT"` - Narrate only chat messages
   - `"SYSTEM"` - Narrate only system messages

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.areSubtitlesShown()`
Returns whether subtitles are currently enabled.

**Example:**
```js
const subtitlesEnabled = Client.options.accessibility.areSubtitlesShown();
Chat.log(`Subtitles are ${subtitlesEnabled ? 'enabled' : 'disabled'}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if subtitles are enabled, `false` otherwise

### `instance.showSubtitles(val)`
Sets whether subtitles should be displayed.

**Example:**
```js
// Enable subtitles
Client.options.accessibility.showSubtitles(true);

// Disable subtitles
Client.options.accessibility.showSubtitles(false);
```

**Params**
1. `val: boolean`: `true` to enable subtitles, `false` to disable

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.getTextBackgroundOpacity()`
Returns the current opacity of text backgrounds in the UI.

**Example:**
```js
const opacity = Client.options.accessibility.getTextBackgroundOpacity();
Chat.log(`Text background opacity: ${opacity}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The text background opacity value (typically 0.0 to 1.0)

### `instance.setTextBackgroundOpacity(val)`
Sets the opacity of text backgrounds in the UI.

**Example:**
```js
// Make text backgrounds more transparent
Client.options.accessibility.setTextBackgroundOpacity(0.3);

// Make text backgrounds fully opaque
Client.options.accessibility.setTextBackgroundOpacity(1.0);

// Remove text backgrounds completely
Client.options.accessibility.setTextBackgroundOpacity(0.0);
```

**Params**
1. `val: double`: The opacity value to set (0.0 = fully transparent, 1.0 = fully opaque)

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.isBackgroundForChatOnly()`
Returns whether text backgrounds are applied only to chat messages.

**Example:**
```js
const chatOnly = Client.options.accessibility.isBackgroundForChatOnly();
Chat.log(`Background for chat only: ${chatOnly}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if backgrounds only apply to chat, `false` otherwise

### `instance.enableBackgroundForChatOnly(val)`
Sets whether text backgrounds should only apply to chat messages.

**Example:**
```js
// Enable backgrounds only for chat
Client.options.accessibility.enableBackgroundForChatOnly(true);

// Apply backgrounds to all text elements
Client.options.accessibility.enableBackgroundForChatOnly(false);
```

**Params**
1. `val: boolean`: `true` to apply backgrounds only to chat, `false` for all text

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.getChatOpacity()`
Returns the current opacity level of the chat window.

**Example:**
```js
const chatOpacity = Client.options.accessibility.getChatOpacity();
Chat.log(`Chat opacity: ${chatOpacity}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The chat opacity value (0.0 to 1.0)

### `instance.setChatOpacity(val)`
Sets the opacity level of the chat window.

**Example:**
```js
// Make chat more transparent
Client.options.accessibility.setChatOpacity(0.5);

// Make chat fully opaque
Client.options.accessibility.setChatOpacity(1.0);

// Make chat very transparent
Client.options.accessibility.setChatOpacity(0.2);
```

**Params**
1. `val: double`: The opacity value to set (0.0 = fully transparent, 1.0 = fully opaque)

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.getChatLineSpacing()`
Returns the current line spacing in the chat window.

**Example:**
```js
const spacing = Client.options.accessibility.getChatLineSpacing();
Chat.log(`Chat line spacing: ${spacing}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The line spacing value

### `instance.setChatLineSpacing(val)`
Sets the line spacing in the chat window.

**Example:**
```js
// Increase line spacing for better readability
Client.options.accessibility.setChatLineSpacing(1.5);

// Use default line spacing
Client.options.accessibility.setChatLineSpacing(1.0);

// Decrease line spacing
Client.options.accessibility.setChatLineSpacing(0.8);
```

**Params**
1. `val: double`: The line spacing value to set

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.getChatDelay()`
Returns the current chat message display delay in seconds.

**Example:**
```js
const delay = Client.options.accessibility.getChatDelay();
Chat.log(`Chat delay: ${delay} seconds`);
```

**Params**
* `(none)`

**Returns**
* `double`: The chat delay in seconds

### `instance.setChatDelay(val)`
Sets the delay for chat message display in seconds.

**Example:**
```js
// Increase chat delay for slower readers
Client.options.accessibility.setChatDelay(2.0);

// Remove chat delay
Client.options.accessibility.setChatDelay(0.0);

// Set moderate delay
Client.options.accessibility.setChatDelay(0.5);
```

**Params**
1. `val: double`: The delay in seconds to set

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.isAutoJumpEnabled()`
Returns whether the auto-jump feature is enabled.

**Example:**
```js
const autoJump = Client.options.accessibility.isAutoJumpEnabled();
Chat.log(`Auto jump is ${autoJump ? 'enabled' : 'disabled'}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if auto-jump is enabled, `false` otherwise

### `instance.enableAutoJump(val)`
Sets whether the auto-jump feature should be enabled.

**Example:**
```js
// Enable auto-jump for easier movement
Client.options.accessibility.enableAutoJump(true);

// Disable auto-jump for manual control
Client.options.accessibility.enableAutoJump(false);
```

**Params**
1. `val: boolean`: `true` to enable auto-jump, `false` to disable

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.isSneakTogglingEnabled()`
Returns whether the toggle functionality for sneaking is enabled.

**Example:**
```js
const sneakToggle = Client.options.accessibility.isSneakTogglingEnabled();
Chat.log(`Sneak toggle is ${sneakToggle ? 'enabled' : 'disabled'}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if sneak toggling is enabled, `false` otherwise

### `instance.toggleSneak(val)`
Sets whether the toggle functionality for sneaking should be enabled.

**Example:**
```js
// Enable sneak toggling for accessibility
Client.options.accessibility.toggleSneak(true);

// Disable sneak toggling (require holding key)
Client.options.accessibility.toggleSneak(false);
```

**Params**
1. `val: boolean`: `true` to enable sneak toggling, `false` to disable

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.isSprintTogglingEnabled()`
Returns whether the toggle functionality for sprinting is enabled.

**Example:**
```js
const sprintToggle = Client.options.accessibility.isSprintTogglingEnabled();
Chat.log(`Sprint toggle is ${sprintToggle ? 'enabled' : 'disabled'}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if sprint toggling is enabled, `false` otherwise

### `instance.toggleSprint(val)`
Sets whether the toggle functionality for sprinting should be enabled.

**Example:**
```js
// Enable sprint toggling for accessibility
Client.options.accessibility.toggleSprint(true);

// Disable sprint toggling (require holding key)
Client.options.accessibility.toggleSprint(false);
```

**Params**
1. `val: boolean`: `true` to enable sprint toggling, `false` to disable

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.getDistortionEffect()`
Returns the current distortion effect scale.

**Example:**
```js
const distortion = Client.options.accessibility.getDistortionEffect();
Chat.log(`Distortion effect scale: ${distortion}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The distortion effect scale value

### `instance.setDistortionEffect(val)`
Sets the distortion effect scale for nausea and other distortion effects.

**Example:**
```js
// Reduce distortion effects for motion sensitivity
Client.options.accessibility.setDistortionEffect(0.5);

// Disable distortion effects completely
Client.options.accessibility.setDistortionEffect(0.0);

// Use normal distortion effects
Client.options.accessibility.setDistortionEffect(1.0);
```

**Params**
1. `val: double`: The distortion effect scale to set (0.0 = no distortion, 1.0 = normal)

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.getFovEffect()`
Returns the current field of view (FOV) effect scale.

**Example:**
```js
const fovEffect = Client.options.accessibility.getFovEffect();
Chat.log(`FOV effect scale: ${fovEffect}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The FOV effect scale value

### `instance.setFovEffect(val)`
Sets the field of view (FOV) effect scale for speed-based FOV changes.

**Example:**
```js
// Reduce FOV effects for motion sickness prevention
Client.options.accessibility.setFovEffect(0.5);

// Disable FOV effects completely
Client.options.accessibility.setFovEffect(0.0);

// Use normal FOV effects
Client.options.accessibility.setFovEffect(1.0);
```

**Params**
1. `val: double`: The FOV effect scale to set (0.0 = no FOV changes, 1.0 = normal)

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.isMonochromeLogoEnabled()`
Returns whether the monochrome logo is enabled.

**Example:**
```js
const monochromeLogo = Client.options.accessibility.isMonochromeLogoEnabled();
Chat.log(`Monochrome logo is ${monochromeLogo ? 'enabled' : 'disabled'}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if monochrome logo is enabled, `false` otherwise

### `instance.enableMonochromeLogo(val)`
Sets whether the monochrome logo should be enabled.

**Example:**
```js
// Enable monochrome logo for reduced visual stimulation
Client.options.accessibility.enableMonochromeLogo(true);

// Use normal colorful logo
Client.options.accessibility.enableMonochromeLogo(false);
```

**Params**
1. `val: boolean`: `true` to enable monochrome logo, `false` for normal logo

**Returns**
* `AccessibilityOptionsHelper`: Self for chaining method calls

### `instance.areLightningFlashesHidden()`
Returns whether lightning flashes are hidden.

**Example:**
```js
const lightningHidden = Client.options.accessibility.areLightningFlashesHidden();
Chat.log(`Lightning flashes are ${lightningHidden ? 'hidden' : 'visible'}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if lightning flashes are hidden, `false` otherwise

**Note:** There appears to be a bug in the original source code where the `setFovEffect(boolean val)` method incorrectly modifies the lightning flash setting instead of the FOV effect.

## Usage Examples

### Basic Accessibility Configuration
```js
// Get the accessibility options helper
const accessibility = Client.options.accessibility;

// Configure basic accessibility settings
accessibility
  .enableAutoJump(true)              // Enable auto-jump for easier movement
  .showSubtitles(true)               // Enable subtitles for audio cues
  .setNarratorMode("CHAT")           // Enable narrator for chat messages
  .toggleSneak(true)                 // Enable sneak toggling
  .toggleSprint(true)                // Enable sprint toggling;

Chat.log("Basic accessibility configuration applied!");
```

### Visual Comfort Settings
```js
const accessibility = Client.options.accessibility;

// Reduce visual effects for comfort
accessibility
  .setDistortionEffect(0.3)          // Reduce distortion effects
  .setFovEffect(0.5)                 // Reduce FOV changes
  .enableMonochromeLogo(true)        // Use monochrome logo
  .setTextBackgroundOpacity(0.8)     // Increase text background opacity
  .setChatOpacity(0.9)               // Make chat more opaque
  .setChatLineSpacing(1.2)           // Increase line spacing for readability;

Chat.log("Visual comfort settings applied!");
```

### Chat Accessibility Configuration
```js
const accessibility = Client.options.accessibility;

// Configure chat for better accessibility
accessibility
  .enableBackgroundForChatOnly(true) // Apply backgrounds only to chat
  .setChatOpacity(0.8)               // Make chat more visible
  .setChatLineSpacing(1.3)           // Increase line spacing
  .setChatDelay(1.0)                 // Add delay for slower readers
  .setTextBackgroundOpacity(0.6)     // Moderate text background;

Chat.log("Chat accessibility settings configured!");
```

### Motion Sensitivity Profile
```js
const accessibility = Client.options.accessibility;

// Configure for users with motion sensitivity
accessibility
  .setDistortionEffect(0.0)          // Disable all distortion effects
  .setFovEffect(0.1)                 // Minimize FOV changes
  .areLightningFlashesHidden()        // Check if lightning is hidden
  ? null
  : accessibility.setFovEffect(true) // Hide lightning flashes (note: bug in source)
  .enableAutoJump(true)              // Reduce need for precise timing;

Chat.log("Motion sensitivity profile applied!");
```

### Audio Accessibility Configuration
```js
const accessibility = Client.options.accessibility;

// Configure audio accessibility
accessibility
  .showSubtitles(true)               // Enable subtitles for all audio
  .setNarratorMode("ALL")            // Narrate all game elements
  .setTextBackgroundOpacity(1.0)     // Make text fully readable;

Chat.log("Audio accessibility configured with subtitles and narrator!");
```

### Toggle Control Accessibility
```js
const accessibility = Client.options.accessibility;

// Enable toggle controls for users who have difficulty holding keys
accessibility
  .toggleSneak(true)                 // Enable sneak toggle
  .toggleSprint(true)                // Enable sprint toggle
  .enableAutoJump(true);             // Enable auto-jump

Chat.log("Toggle controls enabled for better accessibility!");
```

### Method Chaining Example
```js
// Demonstrate method chaining
Client.options.accessibility
  .showSubtitles(true)
  .setNarratorMode("CHAT")
  .setTextBackgroundOpacity(0.7)
  .setChatOpacity(0.8)
  .setChatLineSpacing(1.2)
  .enableAutoJump(true)
  .toggleSneak(true)
  .toggleSprint(true)
  .setDistortionEffect(0.3)
  .setFovEffect(0.5);

Chat.log("Complete accessibility profile applied using method chaining!");
```

### Checking Current Settings
```js
const accessibility = Client.options.accessibility;

// Function to log all current accessibility settings
function logAccessibilitySettings() {
  Chat.log("=== Current Accessibility Settings ===");
  Chat.log(`Narrator Mode: ${accessibility.getNarratorMode()}`);
  Chat.log(`Subtitles: ${accessibility.areSubtitlesShown() ? 'Enabled' : 'Disabled'}`);
  Chat.log(`Text Background Opacity: ${accessibility.getTextBackgroundOpacity()}`);
  Chat.log(`Background for Chat Only: ${accessibility.isBackgroundForChatOnly() ? 'Yes' : 'No'}`);
  Chat.log(`Chat Opacity: ${accessibility.getChatOpacity()}`);
  Chat.log(`Chat Line Spacing: ${accessibility.getChatLineSpacing()}`);
  Chat.log(`Chat Delay: ${accessibility.getChatDelay()}s`);
  Chat.log(`Auto Jump: ${accessibility.isAutoJumpEnabled() ? 'Enabled' : 'Disabled'}`);
  Chat.log(`Sneak Toggle: ${accessibility.isSneakTogglingEnabled() ? 'Enabled' : 'Disabled'}`);
  Chat.log(`Sprint Toggle: ${accessibility.isSprintTogglingEnabled() ? 'Enabled' : 'Disabled'}`);
  Chat.log(`Distortion Effect: ${accessibility.getDistortionEffect()}`);
  Chat.log(`FOV Effect: ${accessibility.getFovEffect()}`);
  Chat.log(`Monochrome Logo: ${accessibility.isMonochromeLogoEnabled() ? 'Enabled' : 'Disabled'}`);
  Chat.log(`Lightning Flashes Hidden: ${accessibility.areLightningFlashesHidden() ? 'Yes' : 'No'}`);
}

logAccessibilitySettings();
```

## Important Notes

1. **Persistence:** Changes made through this helper persist across game sessions as they modify the actual game options.

2. **Method Chaining:** Most setter methods return `this` to enable method chaining for more concise code.

3. **Range Values:** Opacity values typically range from 0.0 (fully transparent) to 1.0 (fully opaque), though some values may accept higher ranges.

4. **Narrator Modes:** The narrator supports four modes: "OFF", "ALL", "CHAT", and "SYSTEM". Case is ignored when setting the mode.

5. **Lightning Flash Bug:** There is a known bug in the source code where `setFovEffect(boolean val)` incorrectly modifies the lightning flash setting instead of the FOV effect. Use `setFovEffect(double val)` instead.

6. **Accessibility Focus:** This helper is specifically designed for accessibility features and should be used thoughtfully to enhance gameplay for users who need these accommodations.

7. **Performance:** Some accessibility features (like reduced visual effects) may improve performance on lower-end systems.

## Related Classes

- `OptionsHelper` - Main options helper that contains this accessibility helper
- `Client.options` - Global access to game options
- `GameOptions` - Minecraft's internal game options class

## Version History

- **1.8.4:** Initial release with comprehensive accessibility options support
- **Current:** Enhanced with full method chaining and comprehensive accessibility controls

This helper provides essential accessibility controls that can significantly improve the gaming experience for players with various accessibility needs, making Minecraft more inclusive and enjoyable for everyone.