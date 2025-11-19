# OptionsHelper.VideoOptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper$VideoOptionsHelper`

**Since:** JsMacros 1.8.4

The `VideoOptionsHelper` class provides comprehensive control over Minecraft's video and graphics settings. This helper allows scripts to read and modify various visual settings including graphics quality, render distance, performance options, visual effects, and display configuration. It's accessed through the `OptionsHelper.getVideoOptions()` method or directly via the `video` field.

## Overview

The `VideoOptionsHelper` class manages all visual and graphics-related settings:
- **Graphics quality** - Overall visual fidelity settings
- **Render distance** - World loading and visibility distance
- **Performance settings** - FPS limits, VSync, particle quality
- **Visual effects** - Clouds, entity shadows, view bobbing
- **Display settings** - GUI scale, fullscreen mode, resolution
- **Advanced graphics** - Mipmapping, biome blending, gamma/brightness

## Getting a VideoOptionsHelper Instance

You typically obtain a `VideoOptionsHelper` instance through the main `OptionsHelper`:

```javascript
// Get the global options helper
const options = JsMacros.getOptions();

// Access video options
const video = options.getVideoOptions();
// Or directly via the field
const video = options.video;
```

## Table of Contents

- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Performance Profiles](#performance-profiles)
- [Graphics Quality Reference](#graphics-quality-reference)

## Fields

### `parent` (OptionsHelper)
The parent OptionsHelper instance that provides access to other option categories.

**Type:** `OptionsHelper`

## Methods

### Graphics Quality

#### `getGraphicsMode()`
Gets the current graphics quality mode.

**Returns:** `String` - Current graphics mode: `"fast"`, `"fancy"`, or `"fabulous"`

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
const currentMode = video.getGraphicsMode();
Chat.log(`Current graphics mode: ${currentMode}`);
```

#### `setGraphicsMode(String mode)`
Sets the graphics quality mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| mode | String | `"fast"`, `"fancy"`, or `"fabulous"` - graphics quality level |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Set to maximum quality
video.setGraphicsMode("fabulous");
JsMacros.getOptions().saveOptions();
Chat.log("Graphics set to fabulous quality");

// Set to performance mode
video.setGraphicsMode("fast");
JsMacros.getOptions().saveOptions();
Chat.log("Graphics set to fast mode for performance");
```

### Render and Simulation Distance

#### `getRenderDistance()`
Gets the current render distance in chunks.

**Returns:** `int` - Current render distance (typically 2-32 chunks)

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Current render distance: ${video.getRenderDistance()} chunks`);
```

#### `setRenderDistance(int distance)`
Sets the render distance in chunks.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| distance | int | New render distance in chunks (recommended 2-32) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Set for high-end system
video.setRenderDistance(16);
JsMacros.getOptions().saveOptions();
Chat.log("Render distance set to 16 chunks");

// Set for low-end system
video.setRenderDistance(6);
JsMacros.getOptions().saveOptions();
Chat.log("Render distance set to 6 chunks for performance");
```

#### `getSimulationDistance()`
Gets the current simulation distance in chunks.

**Returns:** `int` - Current simulation distance (typically 2-16 chunks)

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Simulation distance: ${video.getSimulationDistance()} chunks`);
```

#### `setSimulationDistance(int distance)`
Sets the simulation distance in chunks.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| distance | int | New simulation distance in chunks (recommended 2-16) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Set simulation distance for balance
video.setSimulationDistance(8);
JsMacros.getOptions().saveOptions();
Chat.log("Simulation distance set to 8 chunks");
```

### Performance Settings

#### `getMaxFps()`
Gets the current FPS (frames per second) limit.

**Returns:** `int` - Current maximum FPS setting

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Current FPS limit: ${video.getMaxFps()}`);
```

#### `setMaxFps(int fps)`
Sets the maximum FPS limit.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| fps | int | Maximum FPS limit (0 for unlimited, typical values: 30, 60, 120, 144) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Set for 60Hz monitor
video.setMaxFps(60);
JsMacros.getOptions().saveOptions();
Chat.log("FPS limited to 60");

// Set for competitive gaming (144Hz)
video.setMaxFps(144);
JsMacros.getOptions().saveOptions();
Chat.log("FPS limited to 144 for competitive play");

// Unlimited FPS
video.setMaxFps(0);
JsMacros.getOptions().saveOptions();
Chat.log("FPS limit removed");
```

#### `isVsyncEnabled()`
Checks if VSync (vertical synchronization) is enabled.

**Returns:** `boolean` - `true` if VSync is enabled, `false` otherwise

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`VSync is ${video.isVsyncEnabled() ? 'enabled' : 'disabled'}`);
```

#### `enableVsync(boolean enabled)`
Enables or disables VSync.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to enable VSync, `false` to disable |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Enable VSync to prevent screen tearing
video.enableVsync(true);
JsMacros.getOptions().saveOptions();
Chat.log("VSync enabled");

// Disable VSync for lower input lag
video.enableVsync(false);
JsMacros.getOptions().saveOptions();
Chat.log("VSync disabled for lower input lag");
```

#### `getParticleMode()`
Gets the current particle quality mode.

**Returns:** `String` - Current particle mode: `"minimal"`, `"decreased"`, or `"all"`

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Particle quality: ${video.getParticleMode()}`);
```

#### `setParticleMode(String mode)`
Sets the particle quality mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| mode | String | `"minimal"`, `"decreased"`, or `"all"` - particle quality level |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Maximum particle effects
video.setParticleMode("all");
JsMacros.getOptions().saveOptions();
Chat.log("Particle quality set to all");

// Minimal particles for performance
video.setParticleMode("minimal");
JsMacros.getOptions().saveOptions();
Chat.log("Particle quality set to minimal for performance");
```

### Visual Effects

#### `getGamma()`
Gets the current gamma (brightness) setting.

**Returns:** `double` - Current gamma value (0.0 to 1.0+)

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Current brightness: ${video.getGamma().toFixed(2)}`);
```

#### `setGamma(double gamma)`
Sets the gamma (brightness) level.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gamma | double | Brightness value (0.0 = very dark, 1.0 = normal, higher = brighter) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Increase brightness for dark areas
video.setGamma(1.5);
JsMacros.getOptions().saveOptions();
Chat.log("Brightness increased");

// Darken for atmosphere
video.setGamma(0.5);
JsMacros.getOptions().saveOptions();
Chat.log("Brightness decreased for atmosphere");
```

#### `getCloudsMode()`
Gets the current cloud rendering mode.

**Returns:** `String` - Current cloud mode: `"off"`, `"fast"`, or `"fancy"`

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Cloud rendering: ${video.getCloudsMode()}`);
```

#### `setCloudsMode(String mode)`
Sets the cloud rendering mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| mode | String | `"off"`, `"fast"`, or `"fancy"` - cloud quality setting |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Disable clouds for performance
video.setCloudsMode("off");
JsMacros.getOptions().saveOptions();
Chat.log("Clouds disabled for performance");

// Fancy clouds for aesthetics
video.setCloudsMode("fancy");
JsMacros.getOptions().saveOptions();
Chat.log("Clouds set to fancy quality");
```

#### `isViewBobbingEnabled()`
Checks if view bobbing (head movement animation) is enabled.

**Returns:** `boolean` - `true` if view bobbing is enabled, `false` otherwise

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`View bobbing: ${video.isViewBobbingEnabled() ? 'enabled' : 'disabled'}`);
```

#### `enableViewBobbing(boolean enabled)`
Enables or disables view bobbing.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to enable view bobbing, `false` to disable |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Disable view bobbing to reduce motion sickness
video.enableViewBobbing(false);
JsMacros.getOptions().saveOptions();
Chat.log("View bobbing disabled");

// Enable for realistic movement
video.enableViewBobbing(true);
JsMacros.getOptions().saveOptions();
Chat.log("View bobbing enabled");
```

#### `areEntityShadowsEnabled()`
Checks if entity shadows are enabled.

**Returns:** `boolean` - `true` if entity shadows are enabled, `false` otherwise

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Entity shadows: ${video.areEntityShadowsEnabled() ? 'enabled' : 'disabled'}`);
```

#### `enableEntityShadows(boolean enabled)`
Enables or disables entity shadows.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to enable entity shadows, `false` to disable |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Enable shadows for better depth perception
video.enableEntityShadows(true);
JsMacros.getOptions().saveOptions();
Chat.log("Entity shadows enabled");

// Disable shadows for performance
video.enableEntityShadows(false);
JsMacros.getOptions().saveOptions();
Chat.log("Entity shadows disabled for performance");
```

### Display Settings

#### `getGuiScale()`
Gets the current GUI scale setting.

**Returns:** `int` - Current GUI scale (0 = auto, 1-4 = size levels)

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
const scale = video.getGuiScale();
const scaleText = scale === 0 ? "Auto" : scale;
Chat.log(`GUI scale: ${scaleText}`);
```

#### `setGuiScale(int scale)`
Sets the GUI scale.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| scale | int | GUI scale: 0 = auto, 1 = small, 2 = normal, 3 = large, 4 = auto (alternative) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Small GUI for more screen space
video.setGuiScale(1);
JsMacros.getOptions().saveOptions();
Chat.log("GUI set to small");

// Large GUI for better visibility
video.setGuiScale(3);
JsMacros.getOptions().saveOptions();
Chat.log("GUI set to large");

// Auto scale based on resolution
video.setGuiScale(0);
JsMacros.getOptions().saveOptions();
Chat.log("GUI scale set to auto");
```

#### `getFullscreenResolution()`
Gets the current fullscreen resolution.

**Returns:** `String` - Current fullscreen resolution as "widthxheight" string

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Fullscreen resolution: ${video.getFullscreenResolution()}`);
```

#### `isFullscreen()`
Checks if the game is in fullscreen mode.

**Returns:** `boolean` - `true` if fullscreen is enabled, `false` otherwise

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Display mode: ${video.isFullscreen() ? 'Fullscreen' : 'Windowed'}`);
```

#### `setFullScreen(boolean fullscreen)`
Sets fullscreen mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| fullscreen | boolean | `true` to enable fullscreen, `false` for windowed mode |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Switch to fullscreen
video.setFullScreen(true);
JsMacros.getOptions().saveOptions();
Chat.log("Switched to fullscreen mode");

// Switch to windowed mode
video.setFullScreen(false);
JsMacros.getOptions().saveOptions();
Chat.log("Switched to windowed mode");
```

### Advanced Graphics

#### `getBiomeBlendRadius()`
Gets the current biome blending radius.

**Returns:** `int` - Current biome blend radius in chunks

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Biome blend radius: ${video.getBiomeBlendRadius()} chunks`);
```

#### `setBiomeBlendRadius(int radius)`
Sets the biome blending radius.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| radius | int | Biome blend radius in chunks (0-7, 0 = disabled) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Disable biome blending for sharp transitions
video.setBiomeBlendRadius(0);
JsMacros.getOptions().saveOptions();
Chat.log("Biome blending disabled");

// Smooth biome transitions
video.setBiomeBlendRadius(5);
JsMacros.getOptions().saveOptions();
Chat.log("Biome blend radius set to 5 chunks");
```

#### `getMipMapLevels()`
Gets the current mipmap level setting.

**Returns:** `int` - Current mipmap level (0-4)

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();
Chat.log(`Mipmap levels: ${video.getMipMapLevels()}`);
```

#### `setMipMapLevels(int levels)`
Sets the mipmap level for texture filtering.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| levels | int | Mipmap level (0 = no mipmapping, 1-4 = increasing quality) |

**Returns:** `VideoOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const video = JsMacros.getOptions().getVideoOptions();

// Disable mipmapping for sharp textures
video.setMipMapLevels(0);
JsMacros.getOptions().saveOptions();
Chat.log("Mipmapping disabled for sharp textures");

// Maximum mipmapping for smooth distant textures
video.setMipMapLevels(4);
JsMacros.getOptions().saveOptions();
Chat.log("Mipmap levels set to maximum");
```

## Usage Examples

### Performance Optimization Profile

```javascript
function applyPerformanceProfile() {
    const video = JsMacros.getOptions().getVideoOptions();

    video.setGraphicsMode("fast")           // Lowest quality
         .setRenderDistance(6)              // Short view distance
         .setSimulationDistance(4)          // Reduced simulation
         .setMaxFps(60)                     // Reasonable FPS limit
         .setParticleMode("minimal")        // Minimal particles
         .setCloudsMode("off")              // No clouds
         .enableEntityShadows(false)        // No shadows
         .setBiomeBlendRadius(0)            // No biome blending
         .setMipMapLevels(0)               // No mipmapping
         .setGamma(1.0)                    // Normal brightness
         .enableViewBobbing(false);         // No view bobbing

    JsMacros.getOptions().saveOptions();
    Chat.log("Performance profile applied - optimized for low-end systems");
}

applyPerformanceProfile();
```

### Maximum Quality Profile

```javascript
function applyMaximumQualityProfile() {
    const video = JsMacros.getOptions().getVideoOptions();

    video.setGraphicsMode("fabulous")       // Best quality
         .setRenderDistance(32)             // Maximum distance
         .setSimulationDistance(16)         // Maximum simulation
         .setMaxFps(0)                      // Unlimited FPS
         .setParticleMode("all")            // All particles
         .setCloudsMode("fancy")            // Fancy clouds
         .enableEntityShadows(true)         // All shadows
         .setBiomeBlendRadius(7)            // Maximum blending
         .setMipMapLevels(4)               // Maximum mipmapping
         .setGamma(1.0)                    // Normal brightness
         .enableViewBobbing(true);          // All effects

    JsMacros.getOptions().saveOptions();
    Chat.log("Maximum quality profile applied - best visual experience");
}

applyMaximumQualityProfile();
```

### Competitive Gaming Profile

```javascript
function applyCompetitiveProfile() {
    const video = JsMacros.getOptions().getVideoOptions();

    video.setGraphicsMode("fast")           // Performance over visuals
         .setRenderDistance(12)             // Balanced distance
         .setSimulationDistance(8)          // Balanced simulation
         .setMaxFps(144)                    // High refresh rate
         .setParticleMode("decreased")      // Reduced particles for visibility
         .setCloudsMode("off")              // No visual distractions
         .enableEntityShadows(false)        // Clear visibility
         .setBiomeBlendRadius(2)            // Minimal blending
         .setMipMapLevels(1)               // Basic mipmapping
         .setGamma(1.2)                    // Slightly brighter for visibility
         .enableViewBobbing(false);         // No head movement

    JsMacros.getOptions().saveOptions();
    Chat.log("Competitive profile applied - optimized for PvP and performance");
}

applyCompetitiveProfile();
```

### Screenshot/Recording Profile

```javascript
function applyAestheticProfile() {
    const video = JsMacros.getOptions().getVideoOptions();

    video.setGraphicsMode("fabulous")       // Best visuals
         .setRenderDistance(16)             // Good distance
         .setSimulationDistance(12)         // Good simulation
         .setMaxFps(60)                     // Stable for recording
         .setParticleMode("all")            // All effects
         .setCloudsMode("fancy")            // Beautiful clouds
         .enableEntityShadows(true)         // Atmospheric shadows
         .setBiomeBlendRadius(5)            // Smooth transitions
         .setMipMapLevels(3)               // Good texture filtering
         .setGamma(1.0)                    // Normal lighting
         .enableViewBobbing(true);          // Realistic movement

    JsMacros.getOptions().saveOptions();
    Chat.log("Aesthetic profile applied - optimized for screenshots and recording");
}

applyAestheticProfile();
```

### Dynamic Graphics Adjustment

```javascript
// Adjust graphics based on system performance
function autoAdjustGraphics() {
    const video = JsMacros.getOptions().getVideoOptions();

    // Get current FPS (this would need FPS monitoring implementation)
    const currentFps = getCurrentFPS(); // Placeholder function
    const targetFps = 60;

    if (currentFps < targetFps * 0.8) {
        // FPS is low, reduce quality
        if (video.getRenderDistance() > 6) {
            video.setRenderDistance(video.getRenderDistance() - 2);
            Chat.log("Reduced render distance for better performance");
        }

        if (video.getGraphicsMode() !== "fast") {
            video.setGraphicsMode("fast");
            Chat.log("Switched to fast graphics mode");
        }
    } else if (currentFps > targetFps * 1.2) {
        // Good performance, can increase quality
        if (video.getRenderDistance() < 16) {
            video.setRenderDistance(video.getRenderDistance() + 2);
            Chat.log("Increased render distance");
        }
    }

    JsMacros.getOptions().saveOptions();
}

// Run auto-adjustment every 30 seconds
setInterval(autoAdjustGraphics, 30000);
```

### Graphics Status Display

```javascript
function displayGraphicsStatus() {
    const video = JsMacros.getOptions().getVideoOptions();

    Chat.log("=== Current Graphics Settings ===");
    Chat.log(`Graphics Mode: ${video.getGraphicsMode()}`);
    Chat.log(`Render Distance: ${video.getRenderDistance()} chunks`);
    Chat.log(`Simulation Distance: ${video.getSimulationDistance()} chunks`);
    Chat.log(`FPS Limit: ${video.getMaxFps()}`);
    Chat.log(`VSync: ${video.isVsyncEnabled() ? 'Enabled' : 'Disabled'}`);
    Chat.log(`Particles: ${video.getParticleMode()}`);
    Chat.log(`Clouds: ${video.getCloudsMode()}`);
    Chat.log(`Entity Shadows: ${video.areEntityShadowsEnabled() ? 'Enabled' : 'Disabled'}`);
    Chat.log(`GUI Scale: ${video.getGuiScale()}`);
    Chat.log(`Fullscreen: ${video.isFullscreen() ? 'Yes' : 'No'}`);
    Chat.log(`Biome Blend: ${video.getBiomeBlendRadius()} chunks`);
    Chat.log(`Mipmap Levels: ${video.getMipMapLevels()}`);
    Chat.log(`Brightness: ${video.getGamma().toFixed(2)}`);
    Chat.log(`View Bobbing: ${video.isViewBobbingEnabled() ? 'Enabled' : 'Disabled'}`);
    Chat.log("===============================");
}

// Display current settings
displayGraphicsStatus();
```

### Time-Based Graphics Adjustment

```javascript
// Adjust brightness based on game time
function adjustBrightnessForTimeOfDay() {
    const video = JsMacros.getOptions().getVideoOptions();
    const worldTime = World.getTimeOfDay();
    const isDaytime = worldTime >= 0 && worldTime < 12000;

    if (isDaytime) {
        // Daytime - normal or slightly dimmed
        video.setGamma(0.9);
    } else {
        // Nighttime - increased brightness for better visibility
        video.setGamma(1.3);
    }

    JsMacros.getOptions().saveOptions();
    Chat.log(`Brightness adjusted for ${isDaytime ? 'daytime' : 'nighttime'}`);
}

// Run every minute
setInterval(adjustBrightnessForTimeOfDay, 60000);
```

## Performance Profiles

| Profile | Use Case | Settings |
|---------|----------|----------|
| **Ultra Performance** | Very low-end systems | Fast graphics, 6 chunks render, minimal particles, no clouds/shadows |
| **Performance** | Low-end systems | Fast graphics, 8 chunks render, decreased particles, basic effects |
| **Balanced** | Mid-range systems | Fancy graphics, 12 chunks render, balanced settings |
| **Quality** | High-end systems | Fancy/fabulous graphics, 16+ chunks, all effects |
| **Competitive** | PvP gaming | Fast graphics, moderate distance, reduced visual distractions |
| **Aesthetic** | Screenshots/recording | Fabulous graphics, high distance, all visual effects |

## Graphics Quality Reference

### Graphics Modes
- **Fast**: Lowest quality, maximum performance, minimal visual effects
- **Fancy**: Good balance of quality and performance, most visual features enabled
- **Fabulous**: Highest quality with advanced rendering effects (requires modern hardware)

### Particle Modes
- **Minimal**: Only essential particles for gameplay
- **Decreased**: Reduced particle count for better performance
- **All**: Maximum particle effects for full visual experience

### Cloud Modes
- **Off**: No cloud rendering for maximum performance
- **Fast**: Simple cloud rendering with minimal performance impact
- **Fancy**: Detailed 3D clouds with proper lighting

## Important Notes

1. **Persistence:** Graphics settings are automatically saved when `saveOptions()` is called and persist between game sessions.

2. **Performance Impact:** Higher graphics settings can significantly impact game performance, especially on older hardware.

3. **Resource Requirements:** Fabulous graphics mode requires more VRAM and GPU power.

4. **Mipmap Benefits:** Higher mipmap levels improve distant texture quality but use more memory.

5. **Biome Blending:** Larger blend radius creates smoother transitions but can hide biome boundaries.

6. **Render Distance:** Higher distances significantly increase memory usage and world generation load.

7. **VSync Impact:** VSync can prevent screen tearing but may add input lag.

8. **Fullscreen Resolution:** Window size changes apply immediately and don't require saving.

9. **Multiplayer Considerations:** Some servers may have render distance limits regardless of client settings.

## Related Classes

- `OptionsHelper` - Parent class providing access to all option categories
- `GameOptions` - The underlying Minecraft options class that this helper wraps
- `World` - World information for time-based adjustments
- `PlayerEntityHelper` - Player information for context-aware settings

## Version History

- **1.8.4:** Initial release with comprehensive video settings support
- **Current:** Enhanced with advanced graphics options and performance profiles

The `VideoOptionsHelper` class provides complete control over Minecraft's visual presentation, enabling everything from performance optimization to maximum quality settings for the best visual experience.