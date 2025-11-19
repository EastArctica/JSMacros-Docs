# ModContainerHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.ModContainerHelper<T>`
**Implements:** `BaseHelper<T>`
**Extends:** `BaseHelper<T>`

## Overview

The `ModContainerHelper` class is a helper class in JSMacros that provides access to mod information and metadata. It represents a loaded mod and exposes various methods for retrieving details about the mod such as its ID, name, version, authors, and dependencies.

This class is typically accessed when working with mods through the `Client.getMod()` method or when iterating through the list of loaded mods returned by `Client.getLoadedMods()`.

## Accessing ModContainerHelper

You typically get `ModContainerHelper` instances from:

- `Client.getLoadedMods()` - Returns a list of all loaded mods
- `Client.getMod(modId)` - Returns a specific mod by its ID

```javascript
// Example: Getting all loaded mods
const allMods = Client.getLoadedMods();
Chat.log(`Total mods loaded: ${allMods.size()}`);

// Example: Getting a specific mod
const jsmacrosMod = Client.getMod("jsmacros");
if (jsmacrosMod) {
    Chat.log(`JSMacros version: ${jsmacrosMod.getVersion()}`);
}
```

## Constructors

ModContainerHelper is an abstract class and cannot be instantiated directly. Instances are obtained through the Client API methods.

## Methods

## Usage Examples

### Basic Mod Information Display
```javascript
function displayModInfo(modId) {
    const mod = Client.getMod(modId);
    if (!mod) {
        Chat.log(`&cMod "${modId}" is not loaded.`);
        return;
    }

    Chat.log("&6=== Mod Information ===");
    Chat.log(`&eID: &f${mod.getId()}`);
    Chat.log(`&eName: &f${mod.getName()}`);
    Chat.log(`&eVersion: &f${mod.getVersion()}`);
    Chat.log(`&eEnvironment: &f${mod.getEnv()}`);

    const authors = mod.getAuthors();
    if (authors.size() > 0) {
        Chat.log(`&eAuthors: &f${authors.join(", ")}`);
    }

    const description = mod.getDescription();
    if (description && description.trim() !== "") {
        Chat.log(`&eDescription: &f${description}`);
    }

    const dependencies = mod.getDependencies();
    if (dependencies.size() > 0) {
        Chat.log(`&eDependencies: &f${dependencies.join(", ")}`);
    }
}

// Example usage
displayModInfo("jsmacros");
displayModInfo("fabric-api");
```

### List All Loaded Mods
```javascript
function listAllMods() {
    const mods = Client.getLoadedMods();
    Chat.log(`&6=== All Loaded Mods (${mods.size()}) ===`);

    for (const mod of mods) {
        Chat.log(`&7- &b${mod.getId()} &8(&7${mod.getName()}&8 v${mod.getVersion()}&8)`);
    }
}

listAllMods();
```

### Check for Required Mods
```javascript
function checkRequiredMods() {
    const requiredMods = ["fabric-api", "jsmacros"];
    const missingMods = [];

    for (const modId of requiredMods) {
        if (!Client.isModLoaded(modId)) {
            missingMods.push(modId);
        }
    }

    if (missingMods.length === 0) {
        Chat.log("&aAll required mods are loaded!");
    } else {
        Chat.log(`&cMissing required mods: ${missingMods.join(", ")}`);
    }
}

checkRequiredMods();
```

### Mod Compatibility Checker
```javascript
function checkModCompatibility(modId, minVersion) {
    const mod = Client.getMod(modId);
    if (!mod) {
        return false;
    }

    const version = mod.getVersion();
    // Simple version comparison (you might want to use a more sophisticated version parser)
    const versionParts = version.split(".");
    const minParts = minVersion.split(".");

    for (let i = 0; i < Math.max(versionParts.length, minParts.length); i++) {
        const vPart = parseInt(versionParts[i] || "0");
        const mPart = parseInt(minParts[i] || "0");

        if (vPart > mPart) return true;
        if (vPart < mPart) return false;
    }

    return true; // Versions are equal
}

// Example usage
if (checkModCompatibility("jsmacros", "1.8.0")) {
    Chat.log("&aJSMacros version is compatible!");
} else {
    Chat.log("&cJSMacros version is too old!");
}
```

### Analyze Mod Dependencies
```javascript
function analyzeModDependencies(modId) {
    const mod = Client.getMod(modId);
    if (!mod) {
        Chat.log(`&cMod "${modId}" is not loaded.`);
        return;
    }

    const dependencies = mod.getDependencies();
    Chat.log(`&6=== Dependencies for ${mod.getName()} ===`);

    if (dependencies.size() === 0) {
        Chat.log("&7No dependencies");
        return;
    }

    let loadedDeps = 0;
    let missingDeps = 0;

    for (const dep of dependencies) {
        if (Client.isModLoaded(dep)) {
            const depMod = Client.getMod(dep);
            Chat.log(`&a+ ${dep} &8(v${depMod.getVersion()})`);
            loadedDeps++;
        } else {
            Chat.log(`&c- ${dep} &8(MISSING)`);
            missingDeps++;
        }
    }

    Chat.log(`&7Summary: &a${loadedDeps} loaded, &c${missingDeps} missing`);
}

// Example usage
analyzeModDependencies("jsmacros");
```

### Robust Mod Information Display
```javascript
function displayModInfoSafe(modId) {
    const mod = Client.getMod(modId);
    if (!mod) {
        Chat.log(`&cMod "${modId}" is not loaded.`);
        return;
    }

    Chat.log("&6=== Mod Information ===");
    Chat.log(`&eID: &f${mod.getId()}`);
    Chat.log(`&eName: &f${mod.getName()}`);
    Chat.log(`&eVersion: &f${mod.getVersion()}`);

    // Handle environment safely
    const env = mod.getEnv();
    Chat.log(`&eEnvironment: &f${env || "Unknown"}`);

    // Handle authors safely (may be null for Forge mods)
    const authors = mod.getAuthors();
    if (authors && authors.size() > 0) {
        Chat.log(`&eAuthors: &f${authors.join(", ")}`);
    } else {
        Chat.log(`&eAuthors: &7Not available`);
    }

    // Handle description safely
    const description = mod.getDescription();
    if (description && description.trim() !== "") {
        Chat.log(`&eDescription: &f${description}`);
    } else {
        Chat.log(`&eDescription: &7No description available`);
    }

    // Handle dependencies safely
    const dependencies = mod.getDependencies();
    if (dependencies && dependencies.size() > 0) {
        Chat.log(`&eDependencies: &f${dependencies.join(", ")}`);
    } else {
        Chat.log(`&eDependencies: &7No dependencies`);
    }
}

// Example usage
displayModInfoSafe("jsmacros");
displayModInfoSafe("fabric-api");
```

## Notes and Limitations

- ModContainerHelper instances are read-only representations of loaded mods
- Mod information may vary depending on the mod loader (Fabric vs Forge)
- Some mods might not provide complete metadata (empty descriptions or author lists)
- Version strings can vary in format between different mods
- The environment field indicates where the mod is intended to run (client, server, or both)

### Implementation-Specific Behavior

**Fabric Implementation (FabricModContainer):**
- Authors: Extracted from mod metadata and typically available
- Environment: Precisely determined ("CLIENT", "SERVER", "BOTH")
- Dependencies: Full dependency list available
- Version: Uses friendly version string format

**Forge Implementation (ForgeModContainer):**
- Authors: May return `null` as author information access is limited through Forge API
- Environment: May return "UNKNOWN" for some mods where environment cannot be determined
- Dependencies: Full dependency list available
- Version: Uses version qualifier string

## Related Classes

- `Client` - Provides access to mod-related methods like `getMod()`, `getLoadedMods()`, `isModLoaded()`
- `BaseHelper<T>` - Base class that provides common helper functionality

## Version Information

- Available since JSMacros 1.8.4
- Supports both Fabric and Forge mod loaders
- Abstract class - use implementations provided by the mod loader