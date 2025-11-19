# ConfigManager

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.config.ConfigManager`

**Since:** JsMacros 1.0.0

The `ConfigManager` class is a central component in JsMacros responsible for managing all configuration data, including core settings, profiles, and various option classes. It handles loading, saving, and converting configuration formats between different versions. The ConfigManager automatically creates necessary directories, handles backward compatibility, and provides a structured way to access configuration data throughout the JsMacros system.

## Overview

The `ConfigManager` provides comprehensive configuration management functionality:
- Manages configuration files in JSON format with pretty printing
- Handles automatic configuration format conversion between versions
- Provides structured access to different configuration option classes
- Automatically creates and manages config and macro directories
- Supports adding custom option classes dynamically
- Handles configuration backup and recovery on errors
- Manages profile-based script configurations

## Constructor

### `new ConfigManager(configFolder, macroFolder, logger)`
Creates a new ConfigManager instance with specified folders and logger.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| configFolder | `File` | Directory where configuration files are stored |
| macroFolder | `File` | Directory where macro scripts are stored |
| logger | `Logger` | Logger instance for error and status reporting |

**Example:**
```javascript
// Note: This is typically handled internally by JsMacros
// Direct instantiation is rarely needed in scripts

const fs = require('fs');
const path = require('path');

// Example of how ConfigManager might be initialized internally
const configDir = new File(path.join(process.env.APPDATA, '.jsmacros', 'config'));
const macroDir = new File(path.join(process.env.APPDATA, '.jsmacros', 'macros'));
const logger = console; // Simplified logger example

const configManager = new ConfigManager(configDir, macroDir, logger);
```

## Fields

### `instance.optionClasses`
**Type:** `Map<String, Class<?>>`

A map containing registered option classes indexed by their string keys. This maps configuration keys (like "core") to their corresponding Java classes that handle specific configuration sections.

**Example:**
```javascript
// Access registered option classes
const coreOptionClass = configManager.optionClasses.get("core");
if (coreOptionClass) {
    console.log("Core config class found:", coreOptionClass.getName());
}
```

### `instance.options`
**Type:** `Map<Class<?>, Object>`

A map containing instantiated option objects indexed by their class types. This stores the actual configuration objects with their current values.

**Example:**
```javascript
// Access instantiated option objects
const coreOptions = configManager.options.get(CoreConfigV2.class);
if (coreOptions) {
    console.log("Default profile:", coreOptions.defaultProfile);
    console.log("Available profiles:", coreOptions.profileOptions());
}
```

### `instance.configFolder`
**Type:** `File`

The absolute path to the configuration folder where `options.json` and related files are stored.

### `instance.macroFolder`
**Type:** `File`

The absolute path to the macro folder where script files and profiles are stored.

### `instance.configFile`
**Type:** `File`

The absolute path to the main configuration file (`options.json`).

### `instance.rawOptions`
**Type:** `JsonObject`

The raw JSON object containing all configuration data as loaded from the file. This is used for internal processing and format conversion.

### `instance.loadedAsVers`
**Type:** `int`

The version number of the loaded configuration format. Used for handling backward compatibility and format conversion.

### `instance.LOGGER`
**Type:** `Logger`

The logger instance used for logging configuration-related messages and errors.

## Methods

### `instance.getOptions(optionClass)`
Retrieves the options object for a specific option class.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| optionClass | `Class<T>` | The class of the options to retrieve |

**Returns:** `T` - The options object for the specified class, or `null` if not found

**Example:**
```javascript
// Get core configuration options
const coreConfig = configManager.getOptions(CoreConfigV2);
if (coreConfig) {
    console.log("Current default profile:", coreConfig.defaultProfile);
    console.log("Ignored events:", coreConfig.anythingIgnored);

    // Access profile information
    const profiles = coreConfig.profileOptions();
    profiles.forEach(profile => {
        console.log("Available profile:", profile);
    });
}
```

### `instance.addOptions(key, optionClass)`
Adds a new option class to the configuration manager.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | `String` | The unique key to identify this option class |
| optionClass | `Class<?>` | The class that handles this configuration section |

**Throws:**
- `IllegalStateException` - If the key already exists in the config manager
- `IllegalAccessException` - If class instantiation fails
- `InstantiationException` - If class instantiation fails

**Example:**
```javascript
// Add a custom option class (advanced usage)
try {
    configManager.addOptions("myMod", MyModConfigClass);
    console.log("Custom options added successfully");
} catch (error) {
    console.error("Failed to add options:", error.message);
}
```

### `instance.loadConfig()`
Loads all configuration data from files, including format conversion if needed.

**Throws:**
- `IllegalAccessException` - If option class instantiation fails
- `InstantiationException` - If option class instantiation fails
- `IOException` - If file reading fails

**Example:**
```javascript
// Reload configuration from files
try {
    configManager.loadConfig();
    console.log("Configuration reloaded successfully");

    const coreConfig = configManager.getOptions(CoreConfigV2);
    console.log("Loaded profiles:", coreConfig.profileOptions());
} catch (error) {
    console.error("Failed to load configuration:", error.message);
}
```

### `instance.saveConfig()`
Saves all current configuration data to the configuration file.

**Example:**
```javascript
// Save current configuration to file
configManager.saveConfig();
console.log("Configuration saved successfully");
```

### `instance.reloadRawConfigFromFile()`
Reloads the raw JSON configuration from the file without processing.

**Throws:**
- `IOException` - If file reading fails

**Example:**
```javascript
// Reload raw configuration data
try {
    configManager.reloadRawConfigFromFile();
    console.log("Raw configuration reloaded");
    console.log("Loaded version:", configManager.loadedAsVers);
} catch (error) {
    console.error("Failed to reload raw config:", error.message);
}
```

### `instance.convertConfigFormat()`
Converts configuration format from an older version to the current version.

**Throws:**
- `IllegalAccessException` - If reflection fails during conversion
- `InstantiationException` - If class instantiation fails
- `InvocationTargetException` - If conversion method fails
- `NoSuchMethodException` - If conversion method is not found

**Example:**
```javascript
// Convert configuration format (usually handled internally)
try {
    configManager.convertConfigFormat();
    console.log("Configuration format converted successfully");
} catch (error) {
    console.error("Failed to convert configuration:", error.message);
}
```

### `instance.convertConfigFormat(clazz)`
Converts configuration format for a specific class.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| clazz | `Class<?>` | The class whose configuration needs conversion |

**Throws:**
- Same exceptions as `convertConfigFormat()`

**Example:**
```javascript
// Convert specific class configuration
try {
    configManager.convertConfigFormat(MyConfigClass);
    console.log("MyConfigClass configuration converted");
} catch (error) {
    console.error("Failed to convert MyConfigClass:", error.message);
}
```

### `instance.loadDefaults()`
Loads default configuration values for all registered option classes.

**Throws:**
- `IllegalAccessException` - If class instantiation fails
- `InstantiationException` - If class instantiation fails

**Example:**
```javascript
// Reset to default configuration
try {
    configManager.loadDefaults();
    configManager.saveConfig();
    console.log("Configuration reset to defaults");
} catch (error) {
    console.error("Failed to load defaults:", error.message);
}
```

## Usage Examples

### Basic Configuration Access
```javascript
// Access the main JsMacros instance to get ConfigManager
const jsMacros = JsMacros.getInstance();
const configManager = jsMacros.config;

// Get core configuration
const coreConfig = configManager.getOptions(CoreConfigV2);

if (coreConfig) {
    // Access basic settings
    console.log("Default profile:", coreConfig.defaultProfile);
    console.log("Max lock time:", coreConfig.maxLockTime);

    // Access ignored events list
    console.log("Ignored events:", coreConfig.anythingIgnored);

    // Get available profiles
    const profiles = coreConfig.profileOptions();
    console.log("Available profiles:", profiles);

    // Check current profile
    console.log("Current profile:", coreConfig.getCurrentProfile());
}
```

### Profile Management
```javascript
// Access profile configurations
const coreConfig = configManager.getOptions(CoreConfigV2);

if (coreConfig) {
    // List all profiles
    const profiles = coreConfig.profileOptions();
    profiles.forEach(profileName => {
        console.log("Profile:", profileName);

        // Get triggers for this profile
        const triggers = coreConfig.profiles.get(profileName);
        if (triggers) {
            console.log(`  Triggers in ${profileName}:`, triggers.length);
            triggers.forEach(trigger => {
                console.log(`    - ${trigger.triggerType}: ${trigger.scriptFile}`);
            });
        }
    });
}
```

### Configuration Monitoring
```javascript
// Monitor configuration changes
function checkConfigChanges() {
    const coreConfig = configManager.getOptions(CoreConfigV2);

    if (coreConfig) {
        // Check if specific events are ignored
        const ignoredEvents = coreConfig.anythingIgnored;
        if (ignoredEvents.includes("Tick")) {
            console.log("Warning: Tick events are ignored");
        }

        // Check profile configuration
        const currentProfile = coreConfig.getCurrentProfile();
        const defaultProfile = coreConfig.defaultProfile;

        if (currentProfile !== defaultProfile) {
            console.log(`Using profile: ${currentProfile} (default: ${defaultProfile})`);
        }
    }
}

// Check configuration periodically
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    // Only check every 100 ticks to avoid spam
    if (World.getTime() % 100 === 0) {
        checkConfigChanges();
    }
}));
```

### Configuration Backup and Restore
```javascript
// Function to backup current configuration
function backupConfig() {
    const coreConfig = configManager.getOptions(CoreConfigV2);
    if (coreConfig) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupFile = new File(configManager.configFolder, `options_backup_${timestamp}.json`);

        try {
            // Copy current config to backup location
            const fs = require('fs');
            fs.copyFileSync(configManager.configFile.getPath(), backupFile.getPath());
            console.log(`Configuration backed up to: ${backupFile.getName()}`);
        } catch (error) {
            console.error("Failed to backup configuration:", error.message);
        }
    }
}

// Function to restore from backup
function restoreConfig(backupFileName) {
    const backupFile = new File(configManager.configFolder, backupFileName);

    if (backupFile.exists()) {
        try {
            const fs = require('fs');
            fs.copyFileSync(backupFile.getPath(), configManager.configFile.getPath());

            // Reload configuration
            configManager.loadConfig();
            console.log(`Configuration restored from: ${backupFileName}`);
            return true;
        } catch (error) {
            console.error("Failed to restore configuration:", error.message);
            return false;
        }
    } else {
        console.error("Backup file not found:", backupFileName);
        return false;
    }
}

// Usage examples
backupConfig(); // Create backup
// restoreConfig("options_backup_2024-01-15T10-30-00-000Z.json"); // Restore from backup
```

### Custom Configuration Integration
```javascript
// Example of working with custom configuration data
function getCustomSetting(settingName, defaultValue) {
    const coreConfig = configManager.getOptions(CoreConfigV2);

    if (coreConfig && coreConfig.profiles) {
        const currentProfile = coreConfig.getCurrentProfile();
        const profileData = coreConfig.profiles.get(currentProfile);

        if (profileData) {
            // Look for custom settings in profile metadata
            for (const trigger of profileData) {
                if (trigger.triggerType === "CustomSetting" && trigger.scriptFile === settingName) {
                    return trigger.enabled;
                }
            }
        }
    }

    return defaultValue;
}

// Example of adding a custom setting
function setCustomSetting(settingName, value) {
    // Note: This would require extending the core configuration system
    // This is a conceptual example
    const coreConfig = configManager.getOptions(CoreConfigV2);

    if (coreConfig) {
        console.log(`Setting ${settingName} to:`, value);
        // Implementation would depend on the actual configuration structure
    }
}
```

### Configuration Validation
```javascript
// Validate current configuration
function validateConfiguration() {
    const coreConfig = configManager.getOptions(CoreConfigV2);
    const issues = [];

    if (coreConfig) {
        // Check default profile exists
        if (coreConfig.defaultProfile) {
            const profiles = coreConfig.profileOptions();
            if (!profiles.includes(coreConfig.defaultProfile)) {
                issues.push(`Default profile '${coreConfig.defaultProfile}' not found in available profiles`);
            }
        }

        // Check max lock time is reasonable
        if (coreConfig.maxLockTime < 0 || coreConfig.maxLockTime > 10000) {
            issues.push(`Max lock time (${coreConfig.maxLockTime}ms) is outside reasonable range (0-10000ms)`);
        }

        // Check ignored events format
        if (!Array.isArray(coreConfig.anythingIgnored)) {
            issues.push("Ignored events is not an array");
        }

        // Check profiles structure
        if (typeof coreConfig.profiles !== 'object') {
            issues.push("Profiles is not properly configured");
        }

    } else {
        issues.push("Core configuration not available");
    }

    if (issues.length > 0) {
        console.log("Configuration Issues Found:");
        issues.forEach(issue => console.log(`  - ${issue}`));
        return false;
    } else {
        console.log("Configuration validation passed");
        return true;
    }
}

// Run validation
validateConfiguration();
```

## Configuration File Structure

The ConfigManager works with a JSON configuration file structure typically found in `options.json`:

```json
{
  "version": 3,
  "core": {
    "maxLockTime": 500,
    "defaultProfile": "default",
    "anythingIgnored": ["Sound", "Tick", "RecvPacket", "SendPacket"],
    "profiles": {
      "default": [
        {
          "triggerType": "EVENT",
          "eventName": "ProfileLoad",
          "scriptFile": "index.js",
          "enabled": true,
          "options": {}
        }
      ]
    },
    "services": {}
  }
}
```

## Error Handling

The ConfigManager provides robust error handling:

### Automatic Recovery
- Failed configuration loads create backup files with `.bak` extension
- Default configurations are loaded if parsing fails
- Corrupted configurations are automatically replaced with defaults

### Version Migration
- Automatic format conversion between different configuration versions
- Backup files created during format conversion (`options.json.v{version}.bak`)
- Backward compatibility with older configuration formats

### Logging
All configuration operations are logged with appropriate severity levels:
- Configuration loading/success: INFO level
- Configuration errors: ERROR level with stack traces
- Format conversions: INFO level

## Important Notes

1. **Thread Safety:** Configuration operations are synchronized to prevent concurrent access issues.

2. **Automatic Directory Creation:** ConfigManager automatically creates config and macro directories if they don't exist.

3. **Profile Management:** Each profile can contain multiple script triggers with different event types.

4. **Format Compatibility:** The system maintains backward compatibility by detecting and converting older configuration formats.

5. **Backup Strategy:** Configuration errors trigger automatic backup creation before resetting to defaults.

6. **Extension Points:** Additional option classes can be registered using `addOptions()` for mod integration.

7. **File Structure:** Configuration files use JSON format with pretty printing for human readability.

8. **Hot Reloading:** Configuration can be reloaded at runtime without restarting JsMacros.

## Related Classes

- `CoreConfigV2` - Main configuration class containing core JsMacros settings
- `ScriptTrigger` - Represents individual script triggers in profiles
- `ServiceTrigger` - Represents service-based triggers
- `BaseProfile` - Base class for profile management
- `OptionsHelper` - Helper classes for different option types

## Version History

- **1.0.0:** Initial implementation with basic configuration management
- **1.1.0:** Added configuration format conversion support
- **1.2.0:** Enhanced error handling and automatic backup creation
- **1.3.0:** Improved profile management and script trigger system
- **1.4.0:** Added support for custom option classes
- **Current:** Enhanced with comprehensive error recovery, format migration, and extensible architecture