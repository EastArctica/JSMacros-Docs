# ConfigFolder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.ConfigFolder`

**Implements:** `interface`

**Since:** JsMacros 1.0.0

The `ConfigFolder` interface provides access to the main JsMacros configuration directory. This is a low-level interface that determines where JsMacros stores its configuration files, scripts, and related data. The interface is primarily used internally by JsMacros to locate the proper configuration folder based on the mod loader being used (Forge or Fabric).

## Overview

The `ConfigFolder` interface serves as an abstraction layer that provides platform-independent access to the JsMacros configuration directory. Different mod loaders have different conventions for storing configuration files:

- **Forge:** Typically stores config in the main Minecraft directory under `config/jsMacros/`
- **Fabric:** Uses the dedicated config directory provided by Fabric Loader

This interface ensures that JsMacros can reliably locate its configuration folder regardless of the mod loader environment, while providing a consistent API for the rest of the application.

## Methods

### `getFolder()`

Returns the File object representing the JsMacros configuration directory.

**Returns:** `File` - The configuration folder directory

**Description:**
This method returns a `File` object pointing to the directory where JsMacros stores all its configuration files, scripts, profiles, and user data. The exact location depends on the mod loader and Minecraft configuration:

- **Forge:** `{minecraft_directory}/config/jsMacros/`
- **Fabric:** `{config_directory}/jsMacros/`

**Example:**
```javascript
// Note: ConfigFolder is typically accessed through other JsMacros APIs
// rather than directly instantiated in scripts

// The Utils library provides indirect access to config folder functionality
Utils.openFile("scripts/myscript.js"); // Opens file relative to config folder
```

## Implementation Details

### Forge Implementation
The Forge implementation (`ConfigFolderImpl`) creates the configuration folder at:
```java
new File(MinecraftClient.getInstance().runDirectory, "config/jsMacros")
```

### Fabric Implementation
The Fabric implementation (`ConfigFolderImpl`) uses Fabric's config directory:
```java
new File(FabricLoader.getInstance().getConfigDir().toFile(), "jsMacros")
```

## Usage in JsMacros

While the `ConfigFolder` interface is not typically used directly by script writers, it's fundamental to how JsMacros organizes its files:

### Configuration Structure
```
jsMacros/
├── config.json          # Main configuration settings
├── profiles/            # User profiles and settings
├── Macros/              # Script files and macros
├── logs/                # Log files
└── events/              # Event configurations
```

### Access Through Other APIs

Script writers typically access the config folder indirectly through other JsMacros APIs:

```javascript
// File operations relative to config folder
const fileHandler = new FileHandler("./config/settings.json");

// Opening files in the config folder
Utils.openFile("scripts/my_script.js");

// Loading images from config folder
const image = CustomImage.createWidget("images/my_icon.png", "icon");
```

## Related Classes

- **Core**: Uses ConfigFolder to initialize the main JsMacros instance
- **FileHandler**: Provides file operations relative to the config folder
- **Utils.openFile()**: Opens files relative to the config folder
- **CustomImage**: Loads images from the config folder
- **ProfileManager**: Manages user profiles stored in the config folder

## Important Notes

1. **Service Loader Pattern:** ConfigFolder implementations are loaded using Java's ServiceLoader mechanism, allowing different mod loaders to provide their own implementations.

2. **Single Responsibility:** This interface has a single, focused purpose - to provide the location of the JsMacros configuration directory.

3. **Platform Abstraction:** It abstracts away the differences between how Forge and Fabric handle configuration directories.

4. **Not Typically Used Directly:** Script writers usually don't interact with this interface directly, but rather through higher-level APIs that use it internally.

5. **Automatic Creation:** The config folder is typically created automatically when JsMacros initializes if it doesn't already exist.

## Version History

- **1.0.0:** Initial release with basic getFolder() functionality
- **Current:** Stable interface used across all JsMacros platforms

## See Also

- [Java File](https://docs.oracle.com/javase/8/docs/api/java/io/File.html) - Java File class documentation
- [ServiceLoader](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html) - Java service loading mechanism
- [Utils Library](../apis/utils.md) - Utility functions that work with the config folder
- [FileHandler](./FileHandler.md) - File operations relative to config folder