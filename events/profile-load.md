# ProfileLoad Event

This event is fired when a JsMacros profile is loaded. Backed by class `EventProfileLoad`.

## Signature
```js
JsMacros.on("ProfileLoad", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field       | Type    | Description                              |
| ----------- | ------- | ---------------------------------------- |
| profileName | string  | The name of the loaded profile           |

## Behavior

* Fires when JsMacros loads a profile
- The `profileName` field contains the name of the loaded profile
- Occurs during startup or when switching profiles
- Not cancellable
- Useful for profile-specific configurations and initialization

## Minimal example

```js
JsMacros.on("ProfileLoad", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Profile loaded: ${e.profileName}`);
});
```

## Async example

```js
JsMacros.on("ProfileLoad", JavaWrapper.methodToJavaAsync((e) => {
  const profileName = e.profileName;
  const currentTime = new Date().toLocaleString();

  Chat.log(`&aJsMacros Profile Loaded: &f${profileName}`);
  Chat.log(`&7Load time: &f${currentTime}`);

  // Profile-specific initialization
  switch(profileName.toLowerCase()) {
    case "default":
      Chat.log("&6Default profile loaded - basic features enabled");
      initializeDefaultFeatures();
      break;

    case "pvp":
      Chat.log("&cPvP profile loaded - combat features enabled");
      initializePvPFeatures();
      break;

    case "building":
      Chat.log("&dBuilding profile loaded - creative tools enabled");
      initializeBuildingFeatures();
      break;

    case "mining":
      Chat.log("&eMining profile loaded - resource detection enabled");
      initializeMiningFeatures();
      break;

    case "farming":
      Chat.log("&bFarming profile loaded - crop management enabled");
      initializeFarmingFeatures();
      break;

    case "survival":
      Chat.log("&2Survival profile loaded - general utilities enabled");
      initializeSurvivalFeatures();
      break;

    default:
      Chat.log(`&aCustom profile loaded: ${profileName}`);
      initializeCustomFeatures(profileName);
      break;
  }

  // Set global variables for profile tracking
  global.currentProfile = profileName;
  global.profileLoadTime = Date.now();

  // Load profile-specific settings
  loadProfileSettings(profileName);

  // Initialize profile-specific macros or hotkeys
  initializeProfileMacros(profileName);

  // Set up profile-specific event listeners
  setupProfileEventListeners(profileName);

  // Log profile statistics
  logProfileStatistics(profileName);

  // Check for profile updates or migrations
  checkProfileUpdates(profileName);

  Chat.log(`&6Profile "${profileName}" is ready to use!`);
  Chat.actionbar(`&a${profileName} profile loaded successfully!`);
}));

function initializeDefaultFeatures() {
  Chat.log("&7Initializing default features...");
  // Basic utility functions
  // Simple key bindings
  // General notifications
}

function initializePvPFeatures() {
  Chat.log("&7Initializing PvP features...");
  // Combat alerts
  // Damage tracking
  // Player detection
  // PvP-specific utilities
}

function initializeBuildingFeatures() {
  Chat.log("&7Initializing building features...");
  // Block counting
  // Schematic helpers
  // Coordinate tracking
  // Building utilities
}

function initializeMiningFeatures() {
  Chat.log("&7Initializing mining features...");
  // Ore detection
  // Cave mapping
  // Resource tracking
  // Mining efficiency tools
}

function initializeFarmingFeatures() {
  Chat.log("&7Initializing farming features...");
  // Crop monitoring
  // Growth tracking
  // Harvesting helpers
  // Automation tools
}

function initializeSurvivalFeatures() {
  Chat.log("&7Initializing survival features...");
  // Health monitoring
  // Hunger tracking
  // Danger warnings
  // Survival utilities
}

function initializeCustomFeatures(profileName) {
  Chat.log(`&7Initializing custom features for ${profileName}...`);
  // Load custom configurations
  // Set up specialized macros
  // Initialize custom utilities
}

function loadProfileSettings(profileName) {
  Chat.log(`&7Loading settings for profile: ${profileName}`);
  // This would load profile-specific configuration files
  // Could include keybinds, preferences, custom settings, etc.
}

function initializeProfileMacros(profileName) {
  Chat.log(`&7Setting up macros for ${profileName} profile`);
  // Register profile-specific macro triggers
  // Set up automated tasks
  // Configure event filters
}

function setupProfileEventListeners(profileName) {
  Chat.log(`&7Configuring event listeners for ${profileName}`);
  // Enable/disable specific event listeners based on profile
  // Set up profile-specific event handling
  // Configure logging levels
}

function logProfileStatistics(profileName) {
  Chat.log(`&7Profile statistics for ${profileName}:`);
  // Log number of macros, triggers, settings
  // Display profile version and last modified date
  // Show profile size or complexity metrics
}

function checkProfileUpdates(profileName) {
  Chat.log(`&7Checking for updates to ${profileName} profile`);
  // Check for newer versions of profile
  // Validate profile configuration
  // Migrate settings if needed
}
```

## Fields
- [event.profileName](#eventprofilename)

## Methods
- [event.toString()](#eventtostring)

### event.profileName
The name of the loaded profile.

**Type:** `string`

**Notes**
This contains the name of the JsMacros profile that was loaded. Profile names are used to distinguish between different macro configurations and settings sets.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`