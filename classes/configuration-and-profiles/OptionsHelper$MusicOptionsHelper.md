# OptionsHelper.MusicOptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper$MusicOptionsHelper`

**Extends:** `Object`

**Since:** JsMacros 1.8.4

The `MusicOptionsHelper` class provides comprehensive control over all audio and sound settings in Minecraft. This helper allows scripters to manage volume levels for different sound categories, control audio devices, and configure subtitle settings. It's accessed through the `Client.getGameOptions().music` property and provides methods to query and modify every aspect of Minecraft's audio configuration.

## Overview

The `MusicOptionsHelper` class manages all audio-related settings including:
- Volume control for different sound categories (master, music, blocks, mobs, etc.)
- Audio device selection and management
- Subtitle display configuration
- Sound category-specific volume adjustments
- Real-time audio settings modification

## Table of Contents

- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Sound Categories Reference](#sound-categories-reference)
- [Related Classes](#related-classes)

## Fields

### `instance.parent`

**Type:** `OptionsHelper`

The parent options helper that provides access to other option categories (video, controls, etc.).

## Methods

### `instance.getParent()`

Returns the parent OptionsHelper instance.

**Params**
* `(none)`

**Returns**
* `OptionsHelper`: The parent options helper

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const parentOptions = musicOptions.getParent();
Chat.log(`Parent helper: ${parentOptions}`);
```

### `instance.getMasterVolume()`

Returns the current master volume level.

**Params**
* `(none)`

**Returns**
* `float`: The master volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const masterVolume = musicOptions.getMasterVolume();
Chat.log(`Master volume: ${(masterVolume * 100).toFixed(0)}%`);
```

### `instance.setMasterVolume(volume)`

Sets the master volume level.

**Params**
1. `volume: double`: The new master volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setMasterVolume(0.75); // Set to 75%
Chat.log("Master volume set to 75%");
```

### `instance.getMusicVolume()`

Returns the current music volume level.

**Params**
* `(none)`

**Returns**
* `float`: The music volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const musicVolume = musicOptions.getMusicVolume();
Chat.log(`Music volume: ${(musicVolume * 100).toFixed(0)}%`);
```

### `instance.setMusicVolume(volume)`

Sets the music volume level.

**Params**
1. `volume: double`: The new music volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setMusicVolume(0.5); // Set music to 50%
```

### `instance.getRecordsVolume()`

Returns the current volume for playing records (jukebox music).

**Params**
* `(none)`

**Returns**
* `float`: The records volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const recordsVolume = musicOptions.getRecordsVolume();
Chat.log(`Records volume: ${(recordsVolume * 100).toFixed(0)}%`);
```

### `instance.setRecordsVolume(volume)`

Sets the volume for playing records.

**Params**
1. `volume: double`: The new records volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setRecordsVolume(0.8); // Set records to 80%
```

### `instance.getWeatherVolume()`

Returns the current volume for weather sounds (rain, thunder).

**Params**
* `(none)`

**Returns**
* `float`: The weather volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const weatherVolume = musicOptions.getWeatherVolume();
Chat.log(`Weather volume: ${(weatherVolume * 100).toFixed(0)}%`);
```

### `instance.setWeatherVolume(volume)`

Sets the volume for weather sounds.

**Params**
1. `volume: double`: The new weather volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setWeatherVolume(0.6); // Set weather to 60%
```

### `instance.getBlocksVolume()`

Returns the current volume for block-related sounds.

**Params**
* `(none)`

**Returns**
* `float`: The blocks volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const blocksVolume = musicOptions.getBlocksVolume();
Chat.log(`Blocks volume: ${(blocksVolume * 100).toFixed(0)}%`);
```

### `instance.setBlocksVolume(volume)`

Sets the volume for block sounds.

**Params**
1. `volume: double`: The new blocks volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setBlocksVolume(0.7); // Set blocks to 70%
```

### `instance.getHostileVolume()`

Returns the current volume for hostile mob sounds.

**Params**
* `(none)`

**Returns**
* `float`: The hostile mobs volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const hostileVolume = musicOptions.getHostileVolume();
Chat.log(`Hostile mobs volume: ${(hostileVolume * 100).toFixed(0)}%`);
```

### `instance.setHostileVolume(volume)`

Sets the volume for hostile mob sounds.

**Params**
1. `volume: double`: The new hostile mobs volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setHostileVolume(0.9); // Set hostile mobs to 90%
```

### `instance.getNeutralVolume()`

Returns the current volume for neutral mob sounds.

**Params**
* `(none)`

**Returns**
* `float`: The neutral mobs volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const neutralVolume = musicOptions.getNeutralVolume();
Chat.log(`Neutral mobs volume: ${(neutralVolume * 100).toFixed(0)}%`);
```

### `instance.setNeutralVolume(volume)`

Sets the volume for neutral mob sounds.

**Params**
1. `volume: double`: The new neutral mobs volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setNeutralVolume(0.8); // Set neutral mobs to 80%
```

### `instance.getPlayerVolume()`

Returns the current player volume (footsteps, eating, etc.).

**Params**
* `(none)`

**Returns**
* `float`: The player volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const playerVolume = musicOptions.getPlayerVolume();
Chat.log(`Player volume: ${(playerVolume * 100).toFixed(0)}%`);
```

### `instance.setPlayerVolume(volume)`

Sets the player volume.

**Params**
1. `volume: double`: The new player volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setPlayerVolume(0.85); // Set player sounds to 85%
```

### `instance.getAmbientVolume()`

Returns the current ambient volume.

**Params**
* `(none)`

**Returns**
* `float`: The ambient volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const ambientVolume = musicOptions.getAmbientVolume();
Chat.log(`Ambient volume: ${(ambientVolume * 100).toFixed(0)}%`);
```

### `instance.setAmbientVolume(volume)`

Sets the ambient volume.

**Params**
1. `volume: double`: The new ambient volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setAmbientVolume(0.4); // Set ambient to 40%
```

### `instance.getVoiceVolume()`

Returns the current voice volume.

**Params**
* `(none)`

**Returns**
* `float`: The voice volume value (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const voiceVolume = musicOptions.getVoiceVolume();
Chat.log(`Voice volume: ${(voiceVolume * 100).toFixed(0)}%`);
```

### `instance.setVoiceVolume(volume)`

Sets the voice volume.

**Params**
1. `volume: double`: The new voice volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setVoiceVolume(0.7); // Set voice to 70%
```

### `instance.getVolume(category)`

Gets the volume for a specific sound category.

**Params**
1. `category: string`: The sound category name (see Sound Categories Reference)

**Returns**
* `float`: The volume value for the specified category (0.0 to 1.0)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const masterVolume = musicOptions.getVolume("master");
const musicVolume = musicOptions.getVolume("music");
Chat.log(`Master: ${masterVolume}, Music: ${musicVolume}`);
```

### `instance.getVolumes()`

Returns a map of all sound categories and their volumes.

**Params**
* `(none)`

**Returns**
* `Map<string, float>`: Map with category names as keys and volume values as values

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const allVolumes = musicOptions.getVolumes();
for (const [category, volume] of Object.entries(allVolumes)) {
    Chat.log(`${category}: ${(volume * 100).toFixed(0)}%`);
}
```

### `instance.setVolume(category, volume)`

Sets the volume for a specific sound category.

**Params**
1. `category: string`: The sound category name (see Sound Categories Reference)
2. `volume: double`: The new volume value (0.0 to 1.0)

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.setVolume("weather", 0.3); // Reduce weather sounds
musicOptions.setVolume("music", 0.9);   // Increase music volume
```

### `instance.getSoundDevice()`

Returns the currently selected audio device.

**Params**
* `(none)`

**Returns**
* `string`: The name of the currently selected audio device (empty string for default)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const currentDevice = musicOptions.getSoundDevice();
Chat.log(`Current audio device: ${currentDevice || "Default"}`);
```

### `instance.setSoundDevice(audioDevice)`

Sets the audio device to use.

**Params**
1. `audioDevice: string`: The audio device name to use

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const devices = musicOptions.getAudioDevices();
if (devices.length > 1) {
    musicOptions.setSoundDevice(devices[1]); // Use second available device
    Chat.log("Switched to audio device: " + devices[1]);
}
```

### `instance.getAudioDevices()`

Returns a list of all connected audio devices.

**Params**
* `(none)`

**Returns**
* `List<string>`: List of available audio device names (includes empty string for default)

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const audioDevices = musicOptions.getAudioDevices();
Chat.log("Available audio devices:");
audioDevices.forEach((device, index) => {
    const name = device || "Default Device";
    Chat.log(`${index}: ${name}`);
});
```

### `instance.areSubtitlesShown()`

Checks if subtitles are enabled.

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if subtitles are shown, `false` otherwise

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
const subtitlesEnabled = musicOptions.areSubtitlesShown();
Chat.log(`Subtitles are ${subtitlesEnabled ? "enabled" : "disabled"}`);
```

### `instance.showSubtitles(val)`

Enables or disables subtitles.

**Params**
1. `val: boolean`: Whether to show subtitles or not

**Returns**
* `MusicOptionsHelper`: Self for chaining

**Example:**
```js
const musicOptions = Client.getGameOptions().music;
musicOptions.showSubtitles(true);  // Enable subtitles
Chat.log("Subtitles enabled");

// Later...
musicOptions.showSubtitles(false); // Disable subtitles
Chat.log("Subtitles disabled");
```

## Usage Examples

### Basic Volume Control
```js
const musicOptions = Client.getGameOptions().music;

// Get current volumes
const currentMaster = musicOptions.getMasterVolume();
const currentMusic = musicOptions.getMusicVolume();

Chat.log(`Current master volume: ${(currentMaster * 100).toFixed(0)}%`);
Chat.log(`Current music volume: ${(currentMusic * 100).toFixed(0)}%`);

// Set new volumes
musicOptions.setMasterVolume(0.8);  // 80% master
musicOptions.setMusicVolume(0.6);   // 60% music

// Save changes
musicOptions.getParent().saveOptions();
```

### Volume Profile Switching
```js
const musicOptions = Client.getGameOptions().music;

// Define different volume profiles
const profiles = {
    "quiet": {
        master: 0.3,
        music: 0.2,
        hostile: 0.1,
        weather: 0.1
    },
    "normal": {
        master: 0.7,
        music: 0.6,
        hostile: 0.8,
        weather: 0.5
    },
    "immersive": {
        master: 0.9,
        music: 0.4,
        hostile: 1.0,
        ambient: 0.8,
        weather: 0.7
    }
};

function applyVolumeProfile(profileName) {
    const profile = profiles[profileName];
    if (!profile) {
        Chat.log(`Unknown profile: ${profileName}`);
        return;
    }

    Chat.log(`Applying volume profile: ${profileName}`);
    for (const [category, volume] of Object.entries(profile)) {
        musicOptions.setVolume(category, volume);
    }

    // Save the changes
    musicOptions.getParent().saveOptions();
    Chat.log(`Volume profile "${profileName}" applied successfully`);
}

// Example usage
applyVolumeProfile("quiet");
// Later...
applyVolumeProfile("immersive");
```

### Audio Device Management
```js
const musicOptions = Client.getGameOptions().music;

// List all available audio devices
const devices = musicOptions.getAudioDevices();
Chat.log(`Found ${devices.length} audio devices:`);
devices.forEach((device, index) => {
    const name = device || "Default Device";
    Chat.log(`${index}: ${name}`);
});

// Switch to a different device if available
if (devices.length > 1) {
    const currentDevice = musicOptions.getSoundDevice();
    const currentIndex = devices.indexOf(currentDevice);
    const nextIndex = (currentIndex + 1) % devices.length;
    const nextDevice = devices[nextIndex];

    musicOptions.setSoundDevice(nextDevice);
    Chat.log(`Switched to audio device: ${nextDevice || "Default"}`);
}
```

### Environment-Based Audio Adjustment
```js
const musicOptions = Client.getGameOptions().music;

function adjustAudioForEnvironment() {
    const player = Player.getPlayer();
    if (!player) return;

    const world = World;
    const time = world.getTime();
    const isDaytime = time % 24000 < 12000;
    const isRaining = world.isRaining();
    const isThundering = world.isThundering();

    Chat.log("Adjusting audio for current environment...");

    if (isDaytime) {
        // Daytime: increase ambient sounds
        musicOptions.setAmbientVolume(0.6);
        musicOptions.setMusicVolume(0.5);
    } else {
        // Nighttime: enhance atmosphere
        musicOptions.setAmbientVolume(0.8);
        musicOptions.setMusicVolume(0.7);
    }

    if (isThundering) {
        // Thunderstorm: dramatic weather sounds
        musicOptions.setWeatherVolume(1.0);
        musicOptions.setMusicVolume(0.3); // Quieter music during storms
    } else if (isRaining) {
        // Light rain: moderate weather sounds
        musicOptions.setWeatherVolume(0.6);
        musicOptions.setMusicVolume(0.4);
    } else {
        // Clear weather: normal weather volume
        musicOptions.setWeatherVolume(0.3);
    }

    // Enable subtitles for better situational awareness
    musicOptions.showSubtitles(true);

    // Save changes
    musicOptions.getParent().saveOptions();

    Chat.log("Audio settings adjusted for environment");
}

// Run every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const currentTick = Date.now() / 1000;
    if (currentTick % 30 === 0) {
        adjustAudioForEnvironment();
    }
}));
```

### Comprehensive Audio Settings Display
```js
const musicOptions = Client.getGameOptions().music;

function displayAllAudioSettings() {
    Chat.log("=== AUDIO SETTINGS ===");

    // Current device
    const currentDevice = musicOptions.getSoundDevice();
    Chat.log(`Audio Device: ${currentDevice || "Default"}`);

    // Subtitle status
    const subtitlesEnabled = musicOptions.areSubtitlesShown();
    Chat.log(`Subtitles: ${subtitlesEnabled ? "Enabled" : "Disabled"}`);

    // All volumes
    const volumes = musicOptions.getVolumes();
    Chat.log("\n--- Volume Levels ---");

    // Sort categories for consistent display
    const sortedCategories = Object.keys(volumes).sort();
    sortedCategories.forEach(category => {
        const volume = volumes[category];
        const percentage = (volume * 100).toFixed(0);
        const bar = "█".repeat(Math.round(volume * 20)) + "░".repeat(20 - Math.round(volume * 20));
        Chat.log(`${category.padEnd(12)}: ${bar} ${percentage}%`);
    });

    Chat.log("======================");
}

// Display current settings
displayAllAudioSettings();
```

### Dynamic Audio Control
```js
const musicOptions = Client.getGameOptions().music;

let isQuietMode = false;
let originalVolumes = {};

function toggleQuietMode() {
    if (!isQuietMode) {
        // Save current volumes
        const volumes = musicOptions.getVolumes();
        originalVolumes = { ...volumes };

        // Apply quiet mode settings
        musicOptions.setMasterVolume(0.2);
        musicOptions.setMusicVolume(0.1);
        musicOptions.setHostileVolume(0.1);
        musicOptions.setWeatherVolume(0.05);

        isQuietMode = true;
        Chat.log("&aQuiet mode enabled - All volumes reduced");
    } else {
        // Restore original volumes
        for (const [category, volume] of Object.entries(originalVolumes)) {
            musicOptions.setVolume(category, volume);
        }

        isQuietMode = false;
        Chat.log("&aQuiet mode disabled - Original volumes restored");
    }

    // Save changes
    musicOptions.getParent().saveOptions();
}

// Create a simple command to toggle quiet mode
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "F6") { // F6 key to toggle quiet mode
        toggleQuietMode();
    }
}));

Chat.log("Press F6 to toggle quiet mode");
```

## Sound Categories Reference

The following sound categories are available for use with `getVolume()` and `setVolume()` methods:

| Category | Description |
|----------|-------------|
| `master` | Overall master volume control |
| `music` | Background music and soundtrack |
| `records` | Jukebox and music disc playback |
| `weather` | Weather effects (rain, thunder, wind) |
| `blocks` | Block breaking, placing, and interaction sounds |
| `hostile` | Hostile mob sounds (zombies, creepers, etc.) |
| `neutral` | Neutral mob sounds (cows, pigs, etc.) |
| `players` | Player action sounds (footsteps, eating, etc.) |
| `ambient` | Ambient environmental sounds |
| `voice` | Voice-related sounds |

## Important Notes

1. **Volume Range:** All volume values are between 0.0 (silent) and 1.0 (maximum volume).

2. **Master Volume:** The master volume acts as a multiplier for all other sound categories.

3. **Audio Device Changes:** Changing the audio device may cause a brief interruption in sound playback.

4. **Subtitles:** Enabling subtitles provides text descriptions of important game sounds, which can be helpful for accessibility or gameplay awareness.

5. **Persistence:** Audio settings are automatically saved to the options file and persist between game sessions.

6. **Performance:** Frequent volume changes are lightweight operations, but device switches may take slightly longer to apply.

7. **Cross-Platform:** Available audio devices may vary depending on the operating system and hardware configuration.

## Related Classes

- `OptionsHelper` - Parent class providing access to all option categories
- `GameOptions` - Main options class containing all game settings
- `SoundManager` - Internal Minecraft sound management system

## Version History

- **1.8.4:** Initial release with comprehensive audio control functionality
- **Current:** Enhanced with improved device management and volume control methods