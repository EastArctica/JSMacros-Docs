# OptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper`

**Extends:** `BaseHelper<GameOptions>`

**Since:** JsMacros 1.1.7

The `OptionsHelper` class provides comprehensive access to Minecraft's game options and settings, allowing scripts to read and modify various configuration aspects including video settings, audio controls, keybindings, skin customization, and accessibility features. This class serves as the main interface for all game configuration management through organized helper subclasses.

## Overview

The `OptionsHelper` class wraps Minecraft's internal `GameOptions` object and provides a structured way to access and modify game settings. It's organized into several specialized helper classes, each managing a specific category of options:

- **Skin Options** - Player appearance and model customization
- **Video Options** - Graphics rendering and display settings
- **Music Options** - Audio volume and sound device configuration
- **Control Options** - Input settings and keybinding management
- **Chat Options** - Chat display and communication settings
- **Accessibility Options** - Visual and accessibility assistance features

## Getting an OptionsHelper Instance

You typically obtain an `OptionsHelper` instance through the `JsMacros` class:

```javascript
// Get the global options helper
const options = JsMacros.getOptions();

// Or access specific option categories directly
const videoOptions = JsMacros.getOptions().getVideoOptions();
const musicOptions = JsMacros.getOptions().getMusicOptions();
```

## Table of Contents

- [Constructor](#constructor)
- [Fields](#fields)
- [Methods](#methods)
  - [Main Methods](#main-methods)
  - [Resource Pack Management](#resource-pack-management)
  - [Language and Difficulty](#language-and-difficulty)
  - [Video Settings](#video-settings)
  - [Window Management](#window-management)
- [Helper Classes](#helper-classes)
  - [SkinOptionsHelper](#skinoptionshelper)
  - [VideoOptionsHelper](#videooptionshelper)
  - [MusicOptionsHelper](#musicoptionshelper)
  - [ControlOptionsHelper](#controloptionshelper)
  - [ChatOptionsHelper](#chatoptionshelper)
  - [AccessibilityOptionsHelper](#accessibilityoptionshelper)
- [Usage Examples](#usage-examples)
- [Deprecated Methods](#deprecated-methods)

## Constructor

### `new OptionsHelper(GameOptions options)`
Creates a new OptionsHelper instance wrapping the specified GameOptions object.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | GameOptions | The underlying Minecraft GameOptions object to wrap |

**Note:** This constructor is typically used internally by JSMacros. Most scripts should obtain an instance through `JsMacros.getOptions()`.

## Fields

### `skin` (SkinOptionsHelper)
Helper instance for managing skin and player model options.

**Type:** `SkinOptionsHelper`

### `video` (VideoOptionsHelper)
Helper instance for managing video and graphics settings.

**Type:** `VideoOptionsHelper`

### `music` (MusicOptionsHelper)
Helper instance for managing audio and music settings.

**Type:** `MusicOptionsHelper`

### `control` (ControlOptionsHelper)
Helper instance for managing control and keybinding settings.

**Type:** `ControlOptionsHelper`

### `chat` (ChatOptionsHelper)
Helper instance for managing chat and communication settings.

**Type:** `ChatOptionsHelper`

### `accessibility` (AccessibilityOptionsHelper)
Helper instance for managing accessibility and assistance features.

**Type:** `AccessibilityOptionsHelper`

## Methods

### Main Methods

#### `saveOptions()`
Saves the current options to the options file.

**Returns:** `OptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const options = JsMacros.getOptions();
options.getVideoOptions().setRenderDistance(12);
options.saveOptions(); // Persist changes
```

### Resource Pack Management

#### `getResourcePacks()`
Gets a list of all available resource pack names.

**Returns:** `List<String>` - List of all resource pack identifiers

**Example:**
```javascript
const packs = JsMacros.getOptions().getResourcePacks();
Chat.log(`Available resource packs: ${packs.join(", ")}`);
```

#### `getEnabledResourcePacks()`
Gets a list of currently enabled resource pack names.

**Returns:** `List<String>` - List of enabled resource pack identifiers

**Example:**
```javascript
const enabledPacks = JsMacros.getOptions().getEnabledResourcePacks();
Chat.log(`Enabled resource packs: ${enabledPacks.join(", ")}`);
```

#### `setEnabledResourcePacks(String[] enabled)`
Sets which resource packs should be enabled.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | String[] | Array of resource pack names to enable |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const options = JsMacros.getOptions();
options.setEnabledResourcePacks(["vanilla", "my_texture_pack", "shaders"]);
options.saveOptions();
```

#### `removeServerResourcePack(boolean state)`
Removes or restores server resource packs.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| state | boolean | true to remove server packs, false to restore them |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

### Language and Difficulty

#### `getLanguage()`
Gets the current language setting.

**Returns:** `String` - Current language code (e.g., "en_us", "fr_fr")

**Example:**
```javascript
const language = JsMacros.getOptions().getLanguage();
Chat.log(`Current language: ${language}`);
```

#### `setLanguage(String languageCode)`
Changes the game language.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| languageCode | String | Language code to change to (e.g., "en_us") |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
// Change to French
JsMacros.getOptions().setLanguage("fr_fr").saveOptions();
```

#### `getDifficulty()`
Gets the current world difficulty.

**Returns:** `String` - Current difficulty ("peaceful", "easy", "normal", "hard")

**Example:**
```javascript
const difficulty = JsMacros.getOptions().getDifficulty();
Chat.log(`Current difficulty: ${difficulty}`);
```

#### `setDifficulty(String name)`
Sets the world difficulty (singleplayer only).

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | String | Difficulty name: "peaceful", "easy", "normal", or "hard" |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
// Set difficulty to hard
JsMacros.getOptions().setDifficulty("hard").saveOptions();
```

#### `isDifficultyLocked()`
Checks if the world difficulty is locked.

**Returns:** `boolean` - true if difficulty is locked

#### `lockDifficulty()`
Locks the current world difficulty.

**Returns:** `OptionsHelper` - The current helper instance for method chaining

#### `unlockDifficulty()`
Unlocks the world difficulty.

**Returns:** `OptionsHelper` - The current helper instance for method chaining

### Video Settings

#### `getFov()`
Gets the current field of view setting.

**Returns:** `int` - Current FOV value

#### `setFov(int fov)`
Sets the field of view.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| fov | int | New FOV value |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

#### `getCameraMode()`
Gets the current camera perspective mode.

**Returns:** `int` - 0 for first person, 2 for front view

#### `setCameraMode(int mode)`
Sets the camera perspective mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| mode | int | 0: first person, 2: front view |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

#### `getSmoothCamera()`
Gets smooth camera setting.

**Returns:** `boolean` - true if smooth camera is enabled

#### `setSmoothCamera(boolean val)`
Sets smooth camera setting.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| val | boolean | Whether to enable smooth camera |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

### Window Management

#### `getWidth()`
Gets the current window width.

**Returns:** `int` - Window width in pixels

#### `getHeight()`
Gets the current window height.

**Returns:** `int` - Window height in pixels

#### `setWidth(int w)`
Sets the window width.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| w | int | New window width in pixels |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

#### `setHeight(int h)`
Sets the window height.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| h | int | New window height in pixels |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

#### `setSize(int w, int h)`
Sets both window width and height.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| w | int | New window width in pixels |
| h | int | New window height in pixels |

**Returns:** `OptionsHelper` - The current helper instance for method chaining

## Helper Classes

### SkinOptionsHelper

Manages player skin and model customization options.

#### Key Methods

```javascript
const skin = JsMacros.getOptions().getSkinOptions();

// Model parts
skin.isCapeActivated()           // Check if cape is visible
skin.toggleCape(true)            // Show/hide cape
skin.isHatActivated()            // Check if hat layer is visible
skin.toggleHat(false)            // Hide hat layer

// Hand preference
skin.isRightHanded()             // Check if right-handed
skin.isLeftHanded()              // Check if left-handed
skin.toggleMainHand("left")      // Set main hand: "left" or "right"

// All model parts
skin.isJacketActivated()         // Check jacket layer
skin.toggleJacket(true)         // Toggle jacket
skin.isLeftSleeveActivated()     // Check left sleeve
skin.toggleLeftSleeve(true)     // Toggle left sleeve
skin.isRightSleeveActivated()    // Check right sleeve
skin.toggleRightSleeve(true)    // Toggle right sleeve
skin.isLeftPantsActivated()      // Check left pants
skin.toggleLeftPants(true)      // Toggle left pants
skin.isRightPantsActivated()     // Check right pants
skin.toggleRightPants(true)     // Toggle right pants
```

#### Example

```javascript
const skin = JsMacros.getOptions().getSkinOptions();

// Customize player appearance
Chat.log("Current skin settings:");
Chat.log(`Cape: ${skin.isCapeActivated() ? "Visible" : "Hidden"}`);
Chat.log(`Main hand: ${skin.isRightHanded() ? "Right" : "Left"}`);

// Change appearance
skin.toggleHat(false);          // Hide hat layer
skin.toggleMainHand("left");    // Switch to left-handed
JsMacros.getOptions().saveOptions();
```

### VideoOptionsHelper

Manages graphics, rendering, and display settings.

#### Key Methods

```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Graphics settings
video.getGraphicsMode()          // "fast", "fancy", "fabulous"
video.setGraphicsMode("fancy")  // Set graphics quality
video.getRenderDistance()       // Get render distance in chunks
video.setRenderDistance(16)     // Set render distance
video.getSimulationDistance()   // Get simulation distance
video.setSimulationDistance(8)  // Set simulation distance

// Performance settings
video.getMaxFps()               // Get FPS limit
video.setMaxFps(60)             // Set FPS limit
video.isVsyncEnabled()          // Check VSync status
video.enableVsync(true)         // Enable/disable VSync
video.getParticleMode()         // "minimal", "decreased", "all"
video.setParticleMode("all")    // Set particle quality

// Visual effects
video.getGamma()                // Get brightness (0.0-1.0+)
video.setGamma(1.5)             // Set brightness
video.getCloudsMode()           // "off", "fast", "fancy"
video.setCloudsMode("fancy")    // Set cloud quality
video.isViewBobbingEnabled()    // Check view bobbing
video.enableViewBobbing(false)  // Toggle view bobbing

// UI settings
video.getGuiScale()             // Get GUI scale (0=auto, 1-4)
video.setGuiScale(2)            // Set GUI scale
video.getFullscreenResolution() // Get fullscreen resolution
video.isFullscreen()            // Check fullscreen mode
video.setFullScreen(true)       // Set fullscreen mode

// Advanced graphics
video.getBiomeBlendRadius()     // Get biome blending
video.setBiomeBlendRadius(5)    // Set biome blending
video.getMipMapLevels()         // Get mipmapping
video.setMipMapLevels(4)        // Set mipmapping
video.areEntityShadowsEnabled() // Check entity shadows
video.enableEntityShadows(true) // Toggle entity shadows
```

#### Example

```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Optimize for performance
video.setGraphicsMode("fast");
video.setRenderDistance(8);
video.setSimulationDistance(4);
video.setParticleMode("minimal");
video.enableEntityShadows(false);
video.setCloudsMode("off");

// Apply settings
JsMacros.getOptions().saveOptions();
Chat.log("Applied performance-optimized video settings");
```

### MusicOptionsHelper

Manages audio settings, volume controls, and sound devices.

#### Key Methods

```javascript
const music = JsMacros.getOptions().getMusicOptions();

// Volume controls
music.getMasterVolume()          // Get master volume (0.0-1.0)
music.setMasterVolume(0.8)       // Set master volume
music.getMusicVolume()           // Get music volume
music.setMusicVolume(0.6)        // Set music volume
music.getRecordsVolume()         // Get record/jukebox volume
music.setRecordsVolume(0.7)      // Set record volume

// Sound categories
music.getHostileVolume()         // Get hostile mob volume
music.setHostileVolume(0.8)      // Set hostile mob volume
music.getNeutralVolume()         // Get neutral mob volume
music.setNeutralVolume(0.6)      // Set neutral mob volume
music.getPlayerVolume()         // Get player volume
music.setPlayerVolume(1.0)       // Set player volume
music.getAmbientVolume()         // Get ambient volume
music.setAmbientVolume(0.5)      // Set ambient volume
music.getBlocksVolume()          // Get block volume
music.setBlocksVolume(0.7)       // Set block volume
music.getWeatherVolume()         // Get weather volume
music.setWeatherVolume(0.8)      // Set weather volume
music.getVoiceVolume()           // Get voice volume
music.setVoiceVolume(1.0)        // Set voice volume

// Sound device management
music.getSoundDevice()           // Get current sound device
music.setSoundDevice("Speakers") // Set sound device
music.getAudioDevices()          // Get list of available devices

// General audio settings
music.areSubtitlesShown()        // Check if subtitles are enabled
music.showSubtitles(true)        // Enable/disable subtitles

// Advanced volume management
music.getVolumes()               // Get Map<String, Float> of all volumes
music.getVolume("master")        // Get specific category volume
music.setVolume("music", 0.5)    // Set specific category volume
```

#### Example

```javascript
const music = JsMacros.getOptions().getMusicOptions();

// Configure audio for nighttime gameplay
music.setMasterVolume(0.4);      // Lower overall volume
music.setMusicVolume(0.8);       // Keep music relatively loud
music.setHostileVolume(0.3);     // Reduce mob sounds for less stress
music.showSubtitles(true);        // Enable subtitles for awareness

// List available sound devices
const devices = music.getAudioDevices();
Chat.log("Available audio devices:");
devices.forEach(device => Chat.log(`- ${device}`));

// Apply settings
JsMacros.getOptions().saveOptions();
Chat.log("Applied quiet nighttime audio settings");
```

### ControlOptionsHelper

Manages input controls, mouse settings, and keybindings.

#### Key Methods

```javascript
const control = JsMacros.getOptions().getControlOptions();

// Mouse settings
control.getMouseSensitivity()       // Get mouse sensitivity (0.0-1.0)
control.setMouseSensitivity(0.5)    // Set mouse sensitivity
control.isMouseInverted()          // Check if mouse Y-axis is inverted
control.invertMouse(true)           // Invert/uninvert mouse
control.getMouseWheelSensitivity()  // Get mouse wheel sensitivity
control.setMouseWheelSensitivity(1.0) // Set mouse wheel sensitivity

// Control options
control.isDiscreteScrollingEnabled() // Check discrete scrolling
control.enableDiscreteScrolling(true) // Enable discrete scrolling
control.isRawMouseInputEnabled()   // Check raw mouse input
control.enableRawMouseInput(false)  // Enable/disable raw mouse input
control.isTouchscreenEnabled()      // Check touchscreen mode
control.enableTouchscreen(false)    // Enable/disable touchscreen mode

// Auto options
control.isAutoJumpEnabled()        // Check auto-jump
control.enableAutoJump(true)        // Enable/disable auto-jump
control.isSneakTogglingEnabled()   // Check sneak toggle
control.toggleSneak(true)           // Enable/disable sneak toggle
control.isSprintTogglingEnabled()  // Check sprint toggle
control.toggleSprint(true)          // Enable/disable sprint toggle

// Keybinding management
control.getRawKeys()                // Get KeyBinding[] array
control.getCategories()             // Get List<String> of categories
control.getKeys()                   // Get List<String> of key names
control.getKeyBinds()               // Get Map<String, String> of all bindings
control.getKeyBindsByCategory()     // Get Map<String, Map<String, String>>
control.getKeyBindsByCategory("Movement") // Get specific category
```

#### Example

```javascript
const control = JsMacros.getOptions().getControlOptions();

// Configure controls for precise building
control.setMouseSensitivity(0.2);   // Lower sensitivity for precision
control.enableAutoJump(false);       // Disable auto-jump
control.invertMouse(false);          // Normal mouse orientation
control.toggleSneak(true);           // Enable sneak toggle

// Display current keybinding information
const keyBinds = control.getKeyBinds();
Chat.log("Current keybindings:");
keyBinds.forEach((key, bind) => {
    Chat.log(`${key}: ${bind}`);
});

// Get movement-specific keybindings
const movementBinds = control.getKeyBindsByCategory("Movement");
Chat.log("Movement controls:");
movementBinds.forEach((key, bind) => {
    Chat.log(`  ${key}: ${bind}`);
});

// Apply settings
JsMacros.getOptions().saveOptions();
Chat.log("Applied precision building control settings");
```

### ChatOptionsHelper

Manages chat display, formatting, and communication settings.

#### Key Methods

```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Chat visibility and filtering
chat.getChatVisibility()           // "FULL", "SYSTEM", "HIDDEN"
chat.setChatVisibility("FULL")     // Set chat visibility
chat.areColorsShown()             // Check if color codes are allowed
chat.setShowColors(true)          // Enable/disable color codes

// Link handling
chat.areWebLinksEnabled()          // Check if web links are clickable
chat.enableWebLinks(false)        // Enable/disable web links
chat.isWebLinkPromptEnabled()     // Check link warning prompts
chat.enableWebLinkPrompt(true)    // Enable/disable link warnings

// Chat appearance
chat.getChatOpacity()             // Get chat opacity (0.0-1.0)
chat.setChatOpacity(0.9)          // Set chat opacity
chat.getTextBackgroundOpacity()   // Get text background opacity
chat.setTextBackgroundOpacity(0.5)// Set text background opacity
chat.getTextSize()                // Get chat text size
chat.setTextSize(1.0)             // Set chat text size
chat.getChatLineSpacing()         // Get line spacing
chat.setChatLineSpacing(1.0)      // Set line spacing

// Chat dimensions
chat.getChatWidth()               // Get chat width
chat.setChatWidth(320)            // Set chat width
chat.getChatFocusedHeight()       // Get focused chat height
chat.setChatFocusedHeight(180)    // Set focused chat height
chat.getChatUnfocusedHeight()     // Get unfocused chat height
chat.setChatUnfocusedHeight(90)   // Set unfocused chat height
chat.getChatDelay()               // Get chat delay
chat.setChatDelay(0.0)            // Set chat delay

// Accessibility features
chat.getNarratorMode()            // Get narrator mode
chat.setNarratorMode("CHAT")      // Set narrator: "OFF", "ALL", "CHAT", "SYSTEM"
chat.areCommandSuggestionsEnabled() // Check command suggestions
chat.enableCommandSuggestions(true) // Toggle command suggestions
chat.areMatchedNamesHidden()      // Check if blocked user messages are hidden
chat.enableHideMatchedNames(true) // Toggle blocked user message hiding
chat.isDebugInfoReduced()         // Check reduced debug info
chat.reduceDebugInfo(true)        // Toggle reduced debug info
```

#### Example

```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Configure chat for screenshots
chat.setChatOpacity(0.8);              // Semi-transparent chat
chat.setTextBackgroundOpacity(0.3);    // Light text background
chat.setTextSize(1.2);                 // Slightly larger text
chat.setChatWidth(400);                // Wider chat
chat.setChatLineSpacing(1.1);          // More spacing between lines

// Enable accessibility features
chat.showSubtitles(true);              // Enable subtitles
chat.enableCommandSuggestions(true);   // Enable command suggestions

// Configure chat behavior
chat.setChatVisibility("FULL");        // Show all chat
chat.enableWebLinks(true);             // Allow clickable links
chat.enableWebLinkPrompt(true);        // Show link warnings

// Apply settings
JsMacros.getOptions().saveOptions();
Chat.log("Applied screenshot-friendly chat settings");
```

### AccessibilityOptionsHelper

Manages accessibility features and assistance options.

#### Key Methods

```javascript
const accessibility = JsMacros.getOptions().getAccessibilityOptions();

// Narrator and subtitles
accessibility.getNarratorMode()        // Get narrator mode
accessibility.setNarratorMode("ALL")   // Set narrator: "OFF", "ALL", "CHAT", "SYSTEM"
accessibility.areSubtitlesShown()      // Check subtitles
accessibility.showSubtitles(true)      // Enable/disable subtitles

// Visual assistance
accessibility.getTextBackgroundOpacity() // Get text background opacity
accessibility.setTextBackgroundOpacity(0.8) // Set text background opacity
accessibility.getChatOpacity()         // Get chat opacity
accessibility.setChatOpacity(0.9)      // Set chat opacity
accessibility.getChatLineSpacing()     // Get chat line spacing
accessibility.setChatLineSpacing(1.2)  // Set chat line spacing
accessibility.getChatDelay()           // Get chat delay
accessibility.setChatDelay(2.0)        // Set chat delay

// Visual effects
accessibility.getDistortionEffect()    // Get distortion effect scale
accessibility.setDistortionEffect(0.0) // Set distortion effect
accessibility.getFovEffect()           // Get FOV effect scale
accessibility.setFovEffect(0.5)        // Set FOV effect scale

// Chat background settings
accessibility.isBackgroundForChatOnly() // Check if background is chat-only
accessibility.enableBackgroundForChatOnly(true) // Set chat-only background

// Motion assistance
accessibility.isAutoJumpEnabled()      // Check auto-jump
accessibility.enableAutoJump(true)     // Enable/disable auto-jump
accessibility.isSneakTogglingEnabled() // Check sneak toggle
accessibility.toggleSneak(true)        // Enable/disable sneak toggle
accessibility.isSprintTogglingEnabled()// Check sprint toggle
accessibility.toggleSprint(true)       // Enable/disable sprint toggle

// Visual comfort
accessibility.isMonochromeLogoEnabled() // Check monochrome logo
accessibility.enableMonochromeLogo(true) // Enable/disable monochrome logo
accessibility.areLightningFlashesHidden() // Check lightning flash hiding
accessibility.setFovEffect(false)      // Hide lightning flashes (method name is misleading)
```

#### Example

```javascript
const accessibility = JsMacros.getOptions().getAccessibilityOptions();

// Configure for players with visual difficulties
accessibility.setTextBackgroundOpacity(1.0);    // Full text background
accessibility.setChatOpacity(1.0);              // Full chat opacity
accessibility.setChatLineSpacing(1.5);          // Extra line spacing
accessibility.setChatDelay(0.0);                // No chat delay

// Enable accessibility features
accessibility.showSubtitles(true);              // Enable subtitles
accessibility.setNarratorMode("CHAT");          // Narrate chat only
accessibility.enableAutoJump(true);             // Enable auto-jump
accessibility.toggleSneak(true);                // Enable sneak toggle

// Reduce visual stress
accessibility.setDistortionEffect(0.0);         // Remove distortion effects
accessibility.setFovEffect(0.0);                // Remove FOV effects
accessibility.enableMonochromeLogo(true);       // Use monochrome logo
accessibility.setFovEffect(false);              // Hide lightning flashes

// Apply settings
JsMacros.getOptions().saveOptions();
Chat.log("Applied accessibility-focused settings");
```

## Usage Examples

### Comprehensive Settings Profile

```javascript
function applyGamingProfile() {
    const options = JsMacros.getOptions();

    // Video settings for smooth gameplay
    const video = options.getVideoOptions();
    video.setGraphicsMode("fancy");
    video.setRenderDistance(12);
    video.setSimulationDistance(6);
    video.setMaxFps(144);
    video.enableVsync(true);
    video.setParticleMode("decreased");
    video.setGamma(1.0);

    // Audio settings for immersive experience
    const music = options.getMusicOptions();
    music.setMasterVolume(0.7);
    music.setMusicVolume(0.6);
    music.setHostileVolume(0.8);
    music.showSubtitles(true);

    // Control settings for responsive gameplay
    const control = options.getControlOptions();
    control.setMouseSensitivity(0.6);
    control.enableAutoJump(false);
    control.enableRawMouseInput(true);
    control.toggleSneak(false);

    // Chat settings for clear communication
    const chat = options.getChatOptions();
    chat.setChatVisibility("FULL");
    chat.enableCommandSuggestions(true);
    chat.setTextSize(1.0);

    // Save all changes
    options.saveOptions();
    Chat.log("Applied gaming profile settings!");
}

applyGamingProfile();
```

### Performance Optimization Script

```javascript
function optimizeForPerformance() {
    const options = JsMacros.getOptions();
    const video = options.getVideoOptions();
    const music = options.getMusicOptions();

    // Maximum performance video settings
    video.setGraphicsMode("fast");
    video.setRenderDistance(6);
    video.setSimulationDistance(4);
    video.setMaxFps(60);
    video.setParticleMode("minimal");
    video.setCloudsMode("off");
    video.enableEntityShadows(false);
    video.setMipMapLevels(0);
    video.setBiomeBlendRadius(0);
    video.setViewBobbing(false);
    video.setGamma(0.5);

    // Reduced audio for less CPU usage
    music.setMasterVolume(0.5);
    music.setMusicVolume(0.3);

    options.saveOptions();
    Chat.log("Applied performance optimization settings!");
}

optimizeForPerformance();
```

### Accessibility Configuration

```javascript
function configureAccessibility(visualDifficulty = true, motorAssistance = true) {
    const options = JsMacros.getOptions();
    const accessibility = options.getAccessibilityOptions();
    const video = options.getVideoOptions();

    if (visualDifficulty) {
        // Enhanced visibility
        accessibility.setTextBackgroundOpacity(1.0);
        accessibility.setChatOpacity(1.0);
        accessibility.setChatLineSpacing(1.5);
        accessibility.setChatDelay(0.0);
        accessibility.showSubtitles(true);
        accessibility.setNarratorMode("ALL");

        // Increased contrast
        video.setGamma(1.5);
        video.setBrightness(1.5);
    }

    if (motorAssistance) {
        // Movement assistance
        accessibility.enableAutoJump(true);
        accessibility.toggleSneak(true);
        accessibility.toggleSprint(true);

        // Reduced visual effects
        accessibility.setDistortionEffect(0.0);
        accessibility.setFovEffect(0.0);
    }

    options.saveOptions();
    Chat.log("Applied accessibility configurations!");
}

configureAccessibility(true, true);
```

### Dynamic Settings Adjustment

```javascript
// Adjust settings based on time of day
function adjustSettingsByTime() {
    const options = JsMacros.getOptions();
    const worldTime = World.getTimeOfDay();
    const isDaytime = worldTime >= 0 && worldTime < 12000;

    const video = options.getVideoOptions();
    const music = options.getMusicOptions();

    if (isDaytime) {
        // Daytime settings - bright and clear
        video.setGamma(1.0);
        music.setMasterVolume(0.7);
        music.setMusicVolume(0.6);
    } else {
        // Nighttime settings - easier on the eyes
        video.setGamma(0.7);
        music.setMasterVolume(0.5);
        music.setMusicVolume(0.4);
    }

    options.saveOptions();
    Chat.log(`Adjusted settings for ${isDaytime ? 'daytime' : 'nighttime'}`);
}

// Adjust based on player health
function adjustSettingsByHealth() {
    const player = Player.getPlayer();
    if (!player) return;

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    const options = JsMacros.getOptions();
    const accessibility = options.getAccessibilityOptions();

    if (healthPercent < 0.3) {
        // Low health - enhance visibility
        accessibility.setTextBackgroundOpacity(1.0);
        accessibility.showSubtitles(true);
        Chat.log("Enhanced visibility due to low health");
    } else if (healthPercent > 0.8) {
        // Healthy - normal settings
        accessibility.setTextBackgroundOpacity(0.5);
    }

    options.saveOptions();
}

// Run these adjustments periodically
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    adjustSettingsByTime();
    adjustSettingsByHealth();
}));
```

### Resource Pack Management

```javascript
function manageResourcePacks() {
    const options = JsMacros.getOptions();

    // List all available resource packs
    const allPacks = options.getResourcePacks();
    Chat.log("Available resource packs:");
    allPacks.forEach(pack => Chat.log(`- ${pack}`));

    // List currently enabled packs
    const enabledPacks = options.getEnabledResourcePacks();
    Chat.log("Currently enabled:");
    enabledPacks.forEach(pack => Chat.log(`- ${pack}`));

    // Apply specific resource pack configuration
    const shaderPacks = ["vanilla", "seus", "complementary"];
    options.setEnabledResourcePacks(shaderPacks);
    options.saveOptions();

    Chat.log("Applied shader resource pack configuration");
}

manageResourcePacks();
```

## Deprecated Methods

The following methods are deprecated and should be replaced with their newer equivalents:

| Deprecated Method | Replacement | Description |
| ---------------- | ----------- | ----------- |
| `getCloudMode()` | `getVideoOptions().getCloudsMode()` | Get cloud rendering mode |
| `setCloudMode(int)` | `getVideoOptions().setCloudsMode(String)` | Set cloud rendering mode |
| `getGraphicsMode()` | `getVideoOptions().getGraphicsMode()` | Get graphics mode |
| `setGraphicsMode(int)` | `getVideoOptions().setGraphicsMode(String)` | Set graphics mode |
| `isRightHanded()` | `getSkinOptions().isRightHanded()` | Check main hand |
| `setRightHanded(boolean)` | `getSkinOptions().toggleMainHand(String)` | Set main hand |
| `getRenderDistance()` | `getVideoOptions().getRenderDistance()` | Get render distance |
| `setRenderDistance(int)` | `getVideoOptions().setRenderDistance(int)` | Set render distance |
| `getGamma()` | `getVideoOptions().getGamma()` | Get brightness |
| `setGamma(double)` | `getVideoOptions().setGamma(double)` | Set brightness |
| `setVolume(double)` | `getMusicOptions().setMasterVolume(double)` | Set master volume |
| `setVolume(String, double)` | `getMusicOptions().setVolume(String, double)` | Set category volume |
| `getVolumes()` | `getMusicOptions().getVolumes()` | Get all volumes |
| `getGuiScale()` | `getVideoOptions().getGuiScale()` | Get GUI scale |
| `setGuiScale(int)` | `getVideoOptions().setGuiScale(int)` | Set GUI scale |

## Important Notes

1. **Persistence:** Changes to options are not automatically saved. Call `saveOptions()` to persist changes.

2. **Singleplayer vs Multiplayer:** Some settings like difficulty only work in singleplayer worlds.

3. **Resource Packs:** Changing resource packs may trigger a resource reload, which can cause temporary lag.

4. **Window Changes:** Window size changes are applied immediately and don't require saving.

5. **Language Changes:** Language changes trigger a resource reload to apply translations.

6. **Method Chaining:** Most setter methods return the helper instance for easy method chaining.

7. **Type Safety:** String-based settings use specific values - refer to individual method documentation for valid options.

8. **Performance:** Some settings like render distance can significantly impact game performance.

## Related Classes

- `GameOptions` - The underlying Minecraft options class that this helper wraps
- `BaseHelper<GameOptions>` - The base class providing common helper functionality
- `KeyBinding` - Represents individual key bindings in control options
- `SoundCategory` - Represents different audio categories for volume control
- `LanguageDefinition` - Represents available language options

## Version History

- **1.1.7:** Initial release with basic options access
- **1.2.0:** Added resource pack management
- **1.3.1:** Enhanced volume controls and GUI settings
- **1.5.0:** Added camera and smooth camera controls
- **1.8.4:** Major reorganization with dedicated helper classes for each option category
- **1.8.4:** Added comprehensive keybinding management
- **Current:** Full feature set with organized helper classes and method chaining support

The `OptionsHelper` class provides a powerful and organized way to manage all aspects of Minecraft's configuration through scripting, enabling everything from simple preference changes to comprehensive profile management and dynamic settings adjustment based on game conditions.