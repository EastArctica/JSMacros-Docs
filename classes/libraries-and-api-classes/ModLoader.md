# ModLoader

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.ModLoader`

**Since:** JsMacros 1.8.4

The `ModLoader` class provides access to information about the current mod loading environment and loaded mods. It allows scripts to detect the mod loader being used (Forge/Fabric), check if the game is running in a development environment, and retrieve detailed information about all loaded mods including their metadata, dependencies, and authors. This is particularly useful for creating scripts that adapt their behavior based on available mods or mod loader features.

## Overview

The `ModLoader` interface serves as a bridge between JsMacros scripts and the underlying mod loading system. It provides comprehensive access to mod metadata and environment information, enabling scripts to:

- **Environment Detection**: Determine whether running in development or production environment
- **Mod Loader Identification**: Identify the current mod loader (Forge, Fabric, etc.)
- **Mod Discovery**: List and inspect all loaded mods with their metadata
- **Dependency Checking**: Verify if specific mods are loaded for compatibility
- **Mod Information**: Access detailed mod information including versions, authors, and descriptions

## Accessing the ModLoader

The ModLoader is accessed through the global `JsMacros` library:

```javascript
// Get the mod loader instance
const modLoader = JsMacros.getModLoader();

// Alternative access through Client (recommended)
const modLoader = Client.getModLoader();
```

## Methods

### Environment and Loader Information

#### `isDevEnv()`

Returns whether the game is currently running in a development environment.

**Returns:** `boolean` - `true` if running in development environment, `false` otherwise

**Example:**
```javascript
const modLoader = Client.getModLoader();

if (modLoader.isDevEnv()) {
    Chat.log("§aRunning in development environment - debug features enabled");
    // Enable additional logging or debug features
    enableDebugMode();
} else {
    Chat.log("§7Running in production environment");
    // Use optimized settings
    enableProductionMode();
}
```

#### `getName()`

Returns the name of the current mod loader.

**Returns:** `String` - The name of the mod loader (e.g., "Fabric", "Forge", "Quilt")

**Example:**
```javascript
const modLoader = Client.getModLoader();
const loaderName = modLoader.getName();

Chat.log(`§bMod Loader: §f${loaderName}`);

// Adapt behavior based on mod loader
switch(loaderName.toLowerCase()) {
    case "fabric":
        setupFabricSpecificFeatures();
        break;
    case "forge":
        setupForgeSpecificFeatures();
        break;
    case "quilt":
        setupQuiltSpecificFeatures();
        break;
    default:
        Chat.log(`§cUnknown mod loader: ${loaderName}`);
        break;
}
```

### Mod Discovery and Checking

#### `getLoadedMods()`

Returns a list of all currently loaded mods as `ModContainerHelper` objects.

**Returns:** `List<ModContainerHelper<?>>` - A list of all loaded mod containers

**Example:**
```javascript
const modLoader = Client.getModLoader();
const loadedMods = modLoader.getLoadedMods();

Chat.log(`§aTotal loaded mods: §f${loadedMods.size()}`);

// Display information about all loaded mods
for (const mod of loadedMods) {
    Chat.log(`§e${mod.getName()} §7(v${mod.getVersion()}) §8- §f${mod.getId()}`);
}

// Find mods with specific characteristics
const cosmeticMods = loadedMods.filter(mod =>
    mod.getId().includes("cosmetic") ||
    mod.getName().toLowerCase().includes("cosmetic")
);

if (cosmeticMods.size() > 0) {
    Chat.log(`§dFound ${cosmeticMods.size()} cosmetic mods:`);
    for (const mod of cosmeticMods) {
        Chat.log(`  §7- §f${mod.getName()} §8by ${mod.getAuthors().join(", ")}`);
    }
}
```

#### `isModLoaded(modId)`

Checks if a mod with the specified ID is currently loaded.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| modId | String | The mod ID to check (e.g., "fabric-api", "jei", "tweakeroo") |

**Returns:** `boolean` - `true` if the mod is loaded, `false` otherwise

**Example:**
```javascript
const modLoader = Client.getModLoader();

// Check for commonly used mods
const usefulMods = [
    "jei",           // Just Enough Items
    "tweakeroo",     // Tweakeroo
    "litematica",    // Litematica
    "minihud",       // MiniHUD
    "fabric-api",    // Fabric API
    "malilib"        // MaLiLib
];

Chat.log("§6Mod Availability Check:");
for (const modId of usefulMods) {
    const isLoaded = modLoader.isModLoaded(modId);
    const status = isLoaded ? "§a✓" : "§c✗";
    Chat.log(`  ${status} §7${modId}`);
}

// Conditional script behavior based on available mods
if (modLoader.isModLoaded("jei")) {
    Chat.log("§aJEI detected - enabling recipe lookup features");
    enableRecipeIntegration();
}

if (modLoader.isModLoaded("litematica")) {
    Chat.log("§aLitematica detected - enabling schematic integration");
    enableSchematicFeatures();
}
```

#### `getMod(modId)`

Retrieves the mod container for the specified mod ID, or null if the mod is not loaded.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| modId | String | The mod ID to retrieve |

**Returns:** `ModContainerHelper<?> | null` - The mod container or null if not found

**Example:**
```javascript
const modLoader = Client.getModLoader();

function displayModInfo(modId) {
    const mod = modLoader.getMod(modId);

    if (!mod) {
        Chat.log(`§cMod '${modId}' is not loaded`);
        return;
    }

    Chat.log(`§e=== ${mod.getName()} ===`);
    Chat.log(`§7ID: §f${mod.getId()}`);
    Chat.log(`§7Version: §f${mod.getVersion()}`);
    Chat.log(`§7Environment: §f${mod.getEnv()}`);

    if (mod.getDescription() && mod.getDescription().trim()) {
        Chat.log(`§7Description: §f${mod.getDescription()}`);
    }

    const authors = mod.getAuthors();
    if (authors.size() > 0) {
        Chat.log(`§7Authors: §f${authors.join(", ")}`);
    }

    const dependencies = mod.getDependencies();
    if (dependencies.size() > 0) {
        Chat.log(`§7Dependencies: §f${dependencies.join(", ")}`);
    }
}

// Display information about specific mods
displayModInfo("fabric-api");
displayModInfo("jsmacros");

// Get detailed information about JsMacros itself
const jsmacros = modLoader.getMod("jsmacros");
if (jsmacros) {
    Chat.log(`§aJsMacros v${jsmacros.getVersion()} is loaded!`);
    Chat.log(`§7Environment: ${jsmacros.getEnv()}`);
}
```

## ModContainerHelper Methods

The `ModContainerHelper` objects returned by `getLoadedMods()` and `getMod()` provide the following methods:

## Usage Examples

### Comprehensive Mod Reporter

```javascript
const modLoader = Client.getModLoader();

function generateModReport() {
    const loadedMods = modLoader.getLoadedMods();
    const report = {
        totalMods: loadedMods.size(),
        loaderName: modLoader.getName(),
        isDevEnv: modLoader.isDevEnv(),
        mods: []
    };

    for (const mod of loadedMods) {
        report.mods.push({
            id: mod.getId(),
            name: mod.getName(),
            version: mod.getVersion(),
            environment: mod.getEnv(),
            authors: mod.getAuthors().toArray(),
            description: mod.getDescription(),
            dependencies: mod.getDependencies().toArray()
        });
    }

    return report;
}

function displayModReport() {
    const report = generateModReport();

    Chat.log(`§6=== Mod Environment Report ===`);
    Chat.log(`§7Mod Loader: §f${report.loaderName}`);
    Chat.log(`§7Development Mode: §f${report.isDevEnv ? "Yes" : "No"}`);
    Chat.log(`§7Total Mods: §f${report.totalMods}`);

    // Categorize mods by environment
    const clientMods = report.mods.filter(mod => mod.environment === "CLIENT");
    const serverMods = report.mods.filter(mod => mod.environment === "SERVER");
    const universalMods = report.mods.filter(mod => mod.environment === "BOTH");

    Chat.log(`§7Client Mods: §f${clientMods.length}`);
    Chat.log(`§7Server Mods: §f${serverMods.length}`);
    Chat.log(`§7Universal Mods: §f${universalMods.length}`);

    // Display mods with most dependencies
    const modsWithDeps = report.mods
        .filter(mod => mod.dependencies.length > 0)
        .sort((a, b) => b.dependencies.length - a.dependencies.length)
        .slice(0, 5);

    if (modsWithDeps.length > 0) {
        Chat.log(`§6Mods with most dependencies:`);
        modsWithDeps.forEach(mod => {
            Chat.log(`  §7- §f${mod.name} §8(${mod.dependencies.length} deps)`);
        });
    }
}

// Run the report
displayModReport();
```

### Mod Compatibility Checker

```javascript
const modLoader = Client.getModLoader();

function checkModCompatibility() {
    const requiredMods = [
        { id: "fabric-api", name: "Fabric API", critical: true },
        { id: "malilib", name: "MaLiLib", critical: false }
    ];

    const optionalMods = [
        { id: "jei", name: "Just Enough Items", feature: "Recipe viewing" },
        { id: "tweakeroo", name: "Tweakeroo", feature: "Tweak controls" },
        { id: "litematica", name: "Litematica", feature: "Schematics" }
    ];

    let allCriticalPresent = true;

    Chat.log(`§6=== Mod Compatibility Check ===`);

    // Check required mods
    Chat.log(`§cRequired Mods:`);
    for (const mod of requiredMods) {
        const isLoaded = modLoader.isModLoaded(mod.id);
        const status = isLoaded ? "§a✓" : "§c✗";
        Chat.log(`  ${status} §7${mod.name} §8(${mod.id})`);

        if (!isLoaded && mod.critical) {
            allCriticalPresent = false;
        }
    }

    // Check optional mods
    Chat.log(`§eOptional Mods:`);
    for (const mod of optionalMods) {
        const isLoaded = modLoader.isModLoaded(mod.id);
        const status = isLoaded ? "§a✓" : "§7○";
        Chat.log(`  ${status} §7${mod.name} §8(${mod.feature})`);

        if (isLoaded) {
            Chat.log(`    §8→ §f${mod.feature} available`);
        }
    }

    // Overall compatibility
    if (allCriticalPresent) {
        Chat.log(`§a✓ All critical mods present - full compatibility`);
        return true;
    } else {
        Chat.log(`§c✗ Some critical mods missing - compatibility issues expected`);
        return false;
    }
}

// Run compatibility check
const isCompatible = checkModCompatibility();
if (!isCompatible) {
    Chat.log(`§4Warning: Missing critical mods may affect script functionality`);
}
```

### Feature Detection Based on Available Mods

```javascript
const modLoader = Client.getModLoader();

function detectAvailableFeatures() {
    const features = {};

    // Utility mod features
    features.hasInventoryManagement = modLoader.isModLoaded("inventory-tweaks") ||
                                     modLoader.isModLoaded("inventory-sorting");
    features.hasRecipeViewing = modLoader.isModLoaded("jei") ||
                               modLoader.isModLoaded("roughly-enough-items");
    features.hasWorldEdit = modLoader.isModLoaded("worldedit") ||
                          modLoader.isModLoaded("worldedit-mod");
    features.hasMinihud = modLoader.isModLoaded("minihud");
    features.hasLitematica = modLoader.isModLoaded("litematica");
    features.hasTweakeroo = modLoader.isModLoaded("tweakeroo");

    // Technical mod features
    features.hasCarpet = modLoader.isModLoaded("carpet-mod") ||
                        modLoader.isModLoaded("carpet");
    features.hasServerSide = modLoader.isModLoaded("carpet-extra") ||
                            modLoader.isModLoaded("carpet-tis-addition");

    return features;
}

function setupFeaturesBasedOnMods() {
    const features = detectAvailableFeatures();

    Chat.log(`§6=== Feature Detection ===`);

    if (features.hasRecipeViewing) {
        Chat.log(`§a✓ Recipe viewing available - enabling recipe lookup`);
        // Enable recipe-related features
        global.enableRecipeLookup = true;
    }

    if (features.hasInventoryManagement) {
        Chat.log(`§a✓ Inventory management available - enabling auto-sort features`);
        // Enable inventory management features
        global.enableAutoSort = true;
    }

    if (features.hasWorldEdit) {
        Chat.log(`§a✓ WorldEdit available - enabling building tools`);
        // Enable building and editing features
        global.enableBuildingTools = true;
    }

    if (features.hasLitematica) {
        Chat.log(`§a✓ Litematica available - enabling schematic integration`);
        // Enable schematic-related features
        global.enableSchematicIntegration = true;
    }

    if (features.hasTweakeroo) {
        Chat.log(`§a✓ Tweakeroo available - enabling enhanced controls`);
        // Enable enhanced control features
        global.enableEnhancedControls = true;
    }

    if (features.hasCarpet) {
        Chat.log(`§a✓ Carpet mod available - enabling server features`);
        // Enable server-side features
        global.enableServerFeatures = true;
    }

    // Store features for other scripts to use
    global.detectedFeatures = features;
}

// Auto-setup features based on available mods
setupFeaturesBasedOnMods();
```

### Mod Dependency Validator

```javascript
const modLoader = Client.getModLoader();

function validateModDependencies(modId) {
    const mod = modLoader.getMod(modId);

    if (!mod) {
        return { valid: false, error: `Mod '${modId}' is not loaded` };
    }

    const dependencies = mod.getDependencies();
    const missingDeps = [];
    const satisfiedDeps = [];

    for (const depId of dependencies) {
        if (modLoader.isModLoaded(depId)) {
            satisfiedDeps.push(depId);
        } else {
            missingDeps.push(depId);
        }
    }

    return {
        valid: missingDeps.length === 0,
        mod: {
            id: mod.getId(),
            name: mod.getName(),
            version: mod.getVersion()
        },
        dependencies: {
            total: dependencies.size(),
            satisfied: satisfiedDeps,
            missing: missingDeps
        }
    };
}

function validateAllModDependencies() {
    const loadedMods = modLoader.getLoadedMods();
    const validationResults = [];

    Chat.log(`§6=== Mod Dependency Validation ===`);

    for (const mod of loadedMods) {
        const result = validateModDependencies(mod.getId());
        validationResults.push(result);

        const status = result.valid ? "§a✓" : "§c✗";
        Chat.log(`${status} §7${result.mod.name} §8v${result.mod.version}`);

        if (!result.valid) {
            Chat.log(`    §cMissing dependencies: §f${result.dependencies.missing.join(", ")}`);
        }
    }

    const validMods = validationResults.filter(r => r.valid).length;
    const totalMods = validationResults.length;

    Chat.log(`§7Validation complete: §a${validMods}/${totalMods} §7mods have satisfied dependencies`);

    if (validMods < totalMods) {
        Chat.log(`§cWarning: Some mods may not function correctly due to missing dependencies`);
    }

    return validationResults;
}

// Run dependency validation
validateAllModDependencies();
```

## Notes and Best Practices

### Environment Considerations
- Use `isDevEnv()` to enable debug features only in development environments
- Production environments may have performance optimizations that affect script behavior
- Some mods may behave differently in development vs production environments

### Mod Loader Compatibility
- Different mod loaders (Forge vs Fabric) may have different APIs and capabilities
- Always check the loader name if your script needs mod loader-specific behavior
- Some features may only be available on specific mod loaders

### Performance Considerations
- Cache mod loader results when checking multiple mods to avoid repeated API calls
- `getLoadedMods()` returns all mods at once, which is more efficient than multiple `isModLoaded()` calls
- Large modpacks may have hundreds of mods, so process mod lists efficiently

### Error Handling
- Always check if `getMod()` returns null before accessing methods
- Use try-catch blocks when working with mod metadata, as some mods may have incomplete information
- Mod IDs may change between versions, so provide fallbacks when possible

### Version Compatibility
- Mod versions can follow different formats (semantic versioning, dates, custom formats)
- Some mods may not provide version information consistently
- Consider version ranges when checking for compatibility with specific features

### Integration with Other APIs
- ModLoader information can be used with `World`, `Player`, and other APIs to create context-aware scripts
- Use mod detection to enable/disable features based on available tools
- Combine with event listeners to respond to mod-specific events or changes

## Version History

- **1.8.4:** Initial release with basic mod loading environment access
- **Current:** Enhanced with comprehensive mod metadata and dependency information

The ModLoader API provides a powerful foundation for creating intelligent scripts that adapt to the user's mod environment, enabling richer functionality and better compatibility across different Minecraft configurations.