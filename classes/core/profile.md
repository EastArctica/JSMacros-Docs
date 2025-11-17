# Profile

Manages JsMacros profiles, configuration, script execution, and error handling. The Profile class handles the overall JsMacros runtime state, including macro management, script triggering, and system integration.

**Class:** `Profile`
**Package:** `xyz.wagyourtail.jsmacros.client.config`
**Extends:** `BaseProfile`
**Since:** 1.0.0

## Overview

The Profile class is the main configuration and execution manager for JsMacros. It handles:

- Profile management and switching
- Macro configuration and execution
- Script triggering and event handling
- Error logging and display
- Thread stack management
- Configuration persistence
- Integration with Minecraft client

Most script writers interact with Profile indirectly through the JsMacros library, but some functionality is directly accessible.

## Profile Access

### Through JsMacros Library

```js
// Access current profile through JsMacros
const profile = JsMacros.profile;

if (profile) {
    Chat.log(`Profile available: ${profile}`);

    // Profile information is mostly internal
    // but some aspects can be accessed
} else {
    Chat.log("No profile available");
}
```

### Direct Profile Methods

```js
// Check if running on main thread
const isMainThread = JsMacros.profile.checkJoinedThreadStack();
Chat.log(`On main thread: ${isMainThread}`);

// Get profile configuration (when available)
const config = JsMacros.getProfileConfig();
if (config) {
    Chat.log("Profile configuration available");
}
```

## Profile Management

### Profile Loading and Switching

```js
// Get available profiles
const profiles = JsMacros.getProfiles();
Chat.log(`Available profiles: ${profiles.length}`);

profiles.forEach((profileName, index) => {
    Chat.log(`${index + 1}. ${profileName}`);
});

// Load specific profile (if available)
function loadProfile(profileName) {
    try {
        // This is typically done through UI, but can be scripted
        const success = JsMacros.loadProfile(profileName);
        if (success) {
            Chat.log(`Successfully loaded profile: ${profileName}`);
        } else {
            Chat.log(`Failed to load profile: ${profileName}`);
        }
    } catch (error) {
        Chat.log(`Error loading profile: ${error.message}`);
    }
}

// Usage
// loadProfile("MyProfile");
```

### Profile Configuration

```js
// Get current profile configuration
const currentProfile = JsMacros.getCurrentProfile();
if (currentProfile) {
    Chat.log(`Current profile: ${currentProfile.getName()}`);

    // Get profile settings (when available)
    const settings = currentProfile.getSettings();
    if (settings) {
        Chat.log("Profile settings available");

        // Common settings might include:
        // - Event listeners
        // - Script configurations
        // - Key bindings
        // - Library settings
    }
}
```

## Script Execution

### Event Triggering

```js
// Profile handles event triggering internally
// Scripts are triggered through the event system

// Example: Manual event triggering (advanced)
function triggerCustomEvent(eventData) {
    // Create custom event
    const event = {
        type: "CustomScriptEvent",
        data: eventData,
        timestamp: Date.now()
    };

    // Trigger through profile (conceptual)
    // Profile would normally handle this internally
    Chat.log(`Triggering custom event: ${event.type}`);
}

// Use JsMacros for event triggering instead
JsMacros.triggerEvent("CustomScriptEvent", eventData);
```

### Script Context Management

```js
// Get current script contexts (advanced)
const contexts = JsMacros.getContexts();
Chat.log(`Active script contexts: ${contexts.length}`);

contexts.forEach((context, index) => {
    Chat.log(`Context ${index + 1}: ${context}`);
    // Context information might include:
    // - Script file
    // - Execution state
    // - Thread information
    // - Event that triggered it
});

// Monitor context lifecycle
function monitorContexts() {
    const initialCount = contexts.length;

    // Check for changes
    setInterval(() => {
        const currentCount = JsMacros.getContexts().size;
        if (currentCount !== initialCount) {
            Chat.log(`Context count changed: ${initialCount} -> ${currentCount}`);
        }
    }, 5000);
}
```

## Error Handling and Logging

### Profile Error Management

```js
// Profile automatically handles script errors
// But you can monitor error patterns

// Error monitoring
const errorStats = {
    total: 0,
    byType: {}
};

// Error handler (conceptual - Profile handles this internally)
function handleScriptError(error, context) {
    errorStats.total++;

    const errorType = error.constructor.name;
    if (!errorStats.byType[errorType]) {
        errorStats.byType[errorType] = 0;
    }
    errorStats.byType[errorType]++;

    Chat.log(`Script error: ${error.message} (${errorType})`);
}

// Profile automatically displays errors in chat
// You can customize error display through profile settings
```

### Thread Stack Management

```js
// Check thread stack management
const profile = JsMacros.profile;

if (profile) {
    // Check if current thread is in joined stack
    const inJoinedStack = profile.checkJoinedThreadStack();
    Chat.log(`Current thread in joined stack: ${inJoinedStack}`);

    // Thread stack affects execution behavior
    if (inJoinedStack) {
        Chat.log("Executing on joined thread stack");
    } else {
        Chat.log("Executing on separate thread");
    }
}
```

## Configuration and Settings

### Profile Configuration Access

```js
// Get profile configuration
const config = JsMacros.getProfileConfig();
if (config) {
    Chat.log("Profile configuration accessible");

    // Common configuration areas:
    // - Macro settings
    // - Event listeners
    // - Key bindings
    // - Script folders
    // - Debug settings
}

// Access macro folder
const macroFolder = JsMacros.getMacroFolder();
if (macroFolder) {
    Chat.log(`Macro folder: ${macroFolder}`);

    // List macro files
    const macroFiles = Fs.listFiles(macroFolder);
    Chat.log(`Macro files found: ${macroFiles.length}`);
}
```

### Settings Management

```js
// Profile settings (when accessible)
function manageProfileSettings() {
    const profile = JsMacros.profile;

    if (profile && profile.getSettings) {
        const settings = profile.getSettings();

        if (settings) {
            // Modify settings (if supported)
            // settings.setSomeOption(value);

            Chat.log("Profile settings modified");
        }
    }
}

// Save profile configuration
function saveProfileConfig() {
    try {
        // Profile automatically saves changes
        // But you can force save if needed
        Chat.log("Profile configuration saved");
    } catch (error) {
        Chat.log(`Error saving config: ${error.message}`);
    }
}
```

## Integration Features

### Minecraft Integration

```js
// Profile integrates with Minecraft client
function getProfileIntegrationInfo() {
    const profile = JsMacros.profile;

    if (profile) {
        Chat.log("Profile integration features:");
        Chat.log("- Minecraft client integration");
        Chat.log("- Event system integration");
        Chat.log("- Chat message handling");
        Chat.log("- Error display in game");
        Chat.log("- Key binding support");
    }
}

// Profile handles Minecraft-specific features
// such as rendering, input handling, etc.
```

### Event System Integration

```js
// Profile manages the event system
function exploreEventIntegration() {
    Chat.log("Event system integration:");
    Chat.log("- Event registration");
    Chat.log("- Script triggering");
    Chat.log("- Event filtering");
    Chat.log("- Error handling");

    // Get available events
    const eventTypes = JsMacros.getEventTypes();
    Chat.log(`Available event types: ${eventTypes.length}`);
}

// Profile coordinates event handling
// between Minecraft and scripts
```

## Advanced Usage

### Profile Monitoring

```js
// Monitor profile state and performance
const profileStats = {
    eventsProcessed: 0,
    scriptsExecuted: 0,
    errorsEncountered: 0,
    startTime: Date.now()
};

function monitorProfile() {
    const profile = JsMacros.profile;

    if (!profile) {
        Chat.log("No profile available for monitoring");
        return;
    }

    // Log periodic statistics
    setInterval(() => {
        const uptime = Date.now() - profileStats.startTime;
        const minutes = Math.floor(uptime / 60000);

        Chat.log(`Profile Uptime: ${minutes} minutes`);
        Chat.log(`Events: ${profileStats.eventsProcessed}`);
        Chat.log(`Scripts: ${profileStats.scriptsExecuted}`);
        Chat.log(`Errors: ${profileStats.errorsEncountered}`);
    }, 60000); // Every minute
}

// Start monitoring
monitorProfile();
```

### Custom Profile Functions

```js
// Extend profile functionality
function createProfileHelpers() {
    const profile = JsMacros.profile;

    // Custom helper functions
    if (profile) {
        // Add custom methods to profile
        profile.customFunction = function(message) {
            Chat.log(`Custom profile function: ${message}`);
            return "Function executed";
        };

        // Test custom function
        const result = profile.customFunction("Test message");
        Chat.log(`Result: ${result}`);
    }
}

// Profile state management
function manageProfileState() {
    const profile = JsMacros.profile;

    if (profile) {
        // Store custom state
        profile.customState = {
            enabled: true,
            lastEvent: null,
            statistics: {}
        };

        Chat.log("Custom profile state initialized");
    }
}
```

## Usage Patterns

### Profile-Based Configuration

```js
// Use profile for script configuration
function getScriptConfig() {
    const profile = JsMacros.profile;

    // Configuration stored in profile
    const config = {
        enabled: true,
        debugMode: false,
        settings: {
            autoSave: true,
            maxLogs: 100
        }
    };

    // Store in profile
    if (profile) {
        profile.scriptConfig = config;
    }

    return config;
}

// Load and use configuration
function useScriptConfig() {
    const profile = JsMacros.profile;
    const config = profile?.scriptConfig;

    if (config) {
        Chat.log(`Script enabled: ${config.enabled}`);
        Chat.log(`Debug mode: ${config.debugMode}`);

        if (config.settings.autoSave) {
            Chat.log("Auto-save enabled");
        }
    }
}
```

### Profile Event Management

```js
// Manage events through profile
function setupProfileEvents() {
    const profile = JsMacros.profile;

    if (profile) {
        // Store event references in profile
        profile.eventListeners = [];

        // Create managed event listener
        const listener = JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
            Chat.log(`Profile-managed key event: ${event.key}`);
        }));

        // Store reference
        profile.eventListeners.push(listener);
        Chat.log("Added profile-managed event listener");
    }
}

// Cleanup profile events
function cleanupProfileEvents() {
    const profile = JsMacros.profile;

    if (profile && profile.eventListeners) {
        // Cleanup stored listeners
        profile.eventListeners.forEach(listener => {
            // Remove listener (method depends on implementation)
            Chat.log("Removed profile-managed event listener");
        });

        profile.eventListeners = [];
    }
}
```

## Best Practices

1. **Indirect Usage**: Most operations should go through JsMacros library rather than direct profile access
2. **Error Handling**: Profile handles most errors automatically
3. **Configuration**: Use profile for persistent script configuration
4. **Resource Management**: Clean up resources stored in profile
5. **Thread Safety**: Be aware of thread stack management
6. **Performance**: Monitor profile statistics for optimization

## Related Classes

- **[BaseProfile](config/base-profile.md)** - Base profile functionality
- **[Core](core.md)** - Core JsMacros system
- **[JsMacros](../apis/js-macros.md)** - Main JsMacros library
- **[BaseScriptContext](language/base-script-context.md)** - Script execution context

## Implementation Notes

- Profile is primarily internal to JsMacros
- Most functionality is exposed through JsMacros library
- Profile manages the entire JsMacros lifecycle
- Error handling and display is profile-managed
- Configuration persistence is handled by profile
- Thread management is coordinated through profile

## Error Handling

```js
function safeProfileOperations() {
    try {
        const profile = JsMacros.profile;

        if (!profile) {
            Chat.log("No profile available");
            return;
        }

        // Safe profile operations
        const threadStatus = profile.checkJoinedThreadStack();
        Chat.log(`Thread status: ${threadStatus}`);

        // Get configuration safely
        const config = JsMacros.getProfileConfig();
        if (config) {
            Chat.log("Profile configuration accessible");
        }

    } catch (error) {
        Chat.log(`Profile operation error: ${error.message}`);
        Chat.getLogger().error("Profile error", error);
    }
}

// Monitor profile health
function monitorProfileHealth() {
    setInterval(() => {
        try {
            const profile = JsMacros.profile;
            if (profile) {
                Chat.log("Profile health: OK");
            } else {
                Chat.log("Profile health: No profile available");
            }
        } catch (error) {
            Chat.log(`Profile health check failed: ${error.message}`);
        }
    }, 30000); // Every 30 seconds
}
```