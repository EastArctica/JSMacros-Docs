# CombinedVariableClassLoader

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.FReflection$CombinedVariableClassLoader`

**Extends:** `java.lang.ClassLoader`

**Since:** `1.2.8`

A specialized class loader that combines multiple class loaders into a single unified loader for dynamic JAR file loading. This class is used internally by the JsMacros Reflection library to manage runtime loading of external JAR files and their classes, enabling advanced reflection operations and dynamic code execution.

The `CombinedVariableClassLoader` extends Java's standard `ClassLoader` and maintains a collection of delegated class loaders, each typically created from dynamically loaded JAR files. This allows scripts to access classes and resources from multiple external libraries simultaneously without conflicts.

This class is primarily used internally by the Reflection library but can be accessed through `FReflection.classLoader` for advanced use cases involving custom class loading and resource management.

## Constructors

This class is instantiated internally by the FReflection library and typically doesn't need to be constructed manually by scripts.

## Fields

- [loader.siblingDelegates](#loadersiblingdelegates)

## Methods

- [loader.addClassLoader(jarPath, classLoader)](#loaderaddclassloader)
- [loader.hasJar(path)](#loaderhasjar)
- [loader.findClass(name)](#loaderfindclass)
- [loader.findResource(name)](#loaderfindresource)
- [loader.findResources(name)](#loaderfindresources)

---

## Fields

## Methods

## Usage Context

### Basic Usage with Reflection Library

The `CombinedVariableClassLoader` is primarily used indirectly through the Reflection library:

```js
// Load a JAR file - this internally adds it to the CombinedVariableClassLoader
Reflection.loadJarFile("libs/my-external-library.jar");

// Now you can access classes from that JAR
const ExternalClass = Reflection.getClass("com.example.ExternalClass");
const instance = Reflection.newInstance(ExternalClass, "argument1", 42);

// Access resources from the JAR
const configUrl = Reflection.classLoader.findResource("config.properties");
```

### Advanced Resource Management

For advanced scenarios, you can directly interact with the class loader:

```js
// Check what JARs are loaded (hypothetical, as siblingDelegates is private)
// But you can check if specific JARs are loaded
const commonJars = [
    "libs/apache-commons.jar",
    "libs/gson-library.jar",
    "libs/my-custom-utils.jar"
];

for (const jar of commonJars) {
    const jarFile = new java.io.File(jar);
    if (Reflection.classLoader.hasJar(jarFile)) {
        Chat.log(`✓ ${jar} is loaded`);
    } else {
        Chat.log(`✗ ${jar} is not loaded`);
        try {
            Reflection.loadJarFile(jar);
            Chat.log(`  → Loaded ${jar} successfully`);
        } catch (e) {
            Chat.log(`  → Failed to load ${jar}: ${e.message}`);
        }
    }
}
```

### Resource Discovery and Loading

The class loader is powerful for discovering and loading resources from multiple JARs:

```js
// Find all configuration files across loaded JARs
function findResourcesWithExtension(extension) {
    const resources = [];

    // Search for common resource locations
    const searchPaths = [
        `config${extension}`,
        `assets/config${extension}`,
        `META-INF/config${extension}`,
        `data/config${extension}`
    ];

    for (const path of searchPaths) {
        try {
            const foundResources = Reflection.classLoader.findResources(path);
            while (foundResources.hasMoreElements()) {
                resources.push(foundResources.nextElement());
            }
        } catch (e) {
            // Resource not found, continue searching
        }
    }

    return resources;
}

// Find all JSON configuration files
const jsonConfigs = findResourcesWithExtension(".json");
Chat.log(`Found ${jsonConfigs.length} JSON configuration files`);

for (let i = 0; i < jsonConfigs.length; i++) {
    const url = jsonConfigs[i];
    Chat.log(`Config ${i + 1}: ${url}`);

    // Read and parse JSON config
    try {
        const content = new java.util.Scanner(url.openStream()).useDelimiter("\\A").next();
        const config = JSON.parse(content);
        Chat.log(`  → Parsed config with keys: ${Object.keys(config).join(", ")}`);
    } catch (e) {
        Chat.log(`  → Failed to parse: ${e.message}`);
    }
}
```

### Dynamic Class Loading and Execution

The class loader enables dynamic execution of code from external JARs:

```js
// Load a utility library JAR
Reflection.loadJarFile("libs/script-utils.jar");

// Get and use utility classes
const StringUtils = Reflection.getClass("com.example.StringUtils");
const MathUtils = Reflection.getClass("com.example.MathUtils");

// Use utility methods
const text = "Hello, World!";
const reversed = Reflection.newInstance(StringUtils).reverse(text);
Chat.log(`Reversed: ${reversed}`);

const fibonacci = Reflection.newInstance(MathUtils).fibonacci(10);
Chat.log(`Fibonacci(10) = ${fibonacci}`);

// Dynamic method invocation
const stringUtilsInstance = Reflection.newInstance(StringUtils);
const reverseMethod = Reflection.getDeclaredMethod(StringUtils, "reverse", Reflection.getClass("java.lang.String"));
const result = Reflection.invokeMethod(reverseMethod, stringUtilsInstance, "Dynamic Invocation");
Chat.log(`Dynamic result: ${result}`);
```

### Error Handling and Diagnostics

Robust error handling when working with dynamic class loading:

```js
function safeLoadJar(jarPath) {
    try {
        const file = new java.io.File(jarPath);

        // Check if file exists
        if (!file.exists()) {
            Chat.log(`&cJAR file not found: ${jarPath}`);
            return false;
        }

        // Check if already loaded
        if (Reflection.classLoader.hasJar(file)) {
            Chat.log(`&7JAR already loaded: ${jarPath}`);
            return true;
        }

        // Attempt to load
        const success = Reflection.loadJarFile(jarPath);
        if (success) {
            Chat.log(`&aSuccessfully loaded JAR: ${jarPath}`);
            return true;
        } else {
            Chat.log(`&cFailed to load JAR: ${jarPath}`);
            return false;
        }

    } catch (e) {
        Chat.log(`&cError loading JAR ${jarPath}: ${e.message}`);
        return false;
    }
}

function safeGetClass(className, fallback = null) {
    try {
        return Reflection.getClass(className);
    } catch (e) {
        Chat.log(`&cCould not load class ${className}: ${e.message}`);
        if (fallback) {
            Chat.log(`&7Trying fallback: ${fallback}`);
            try {
                return Reflection.getClass(fallback);
            } catch (e2) {
                Chat.log(`&cFallback also failed: ${e2.message}`);
                return null;
            }
        }
        return null;
    }
}

// Usage examples
safeLoadJar("libs/optional-library.jar");
const MyClass = safeGetClass("com.example.MyClass", "com.example.FallbackClass");

if (MyClass) {
    Chat.log(`&aSuccessfully loaded class: ${Reflection.getClassName(MyClass)}`);
} else {
    Chat.log(`&cFailed to load required class`);
}
```

### Performance Considerations

```js
// Good practice: Batch resource loading
function preloadResources(resourcePaths) {
    const startTime = Java.type("java.lang.System").currentTimeMillis();
    let loadedCount = 0;

    for (const path of resourcePaths) {
        const url = Reflection.classLoader.findResource(path);
        if (url) {
            // Pre-load the resource content
            try {
                new java.util.Scanner(url.openStream()).useDelimiter("\\A").next();
                loadedCount++;
            } catch (e) {
                Chat.log(`&cFailed to preload resource ${path}: ${e.message}`);
            }
        }
    }

    const elapsed = Java.type("java.lang.System").currentTimeMillis() - startTime;
    Chat.log(`&aPreloaded ${loadedCount} resources in ${elapsed}ms`);
}

// Cache frequently used classes
const classCache = new Map();

function getCachedClass(className) {
    if (!classCache.has(className)) {
        try {
            const clazz = Reflection.getClass(className);
            classCache.set(className, clazz);
        } catch (e) {
            Chat.log(`&cFailed to cache class ${className}: ${e.message}`);
            return null;
        }
    }
    return classCache.get(className);
}
```

---

## Important Notes

### Security Considerations
- Only load JAR files from trusted sources
- The class loader has access to the full JVM environment
- Malicious JAR files can compromise the Minecraft client and system

### Best Practices
- Always handle `ClassNotFoundException` and related exceptions
- Check if JARs are already loaded before attempting to load them
- Use canonical file paths to avoid duplicate loader entries
- Consider resource cleanup when scripts are no longer needed

### Limitations
- The class loader maintains internal state that is not directly accessible from scripts
- Some advanced class loader features may require custom implementation
- Resource loading performance depends on the number and size of loaded JAR files

### Version Compatibility
- Class loading behavior may vary between Java versions
- Minecraft obfuscation mappings can affect class name resolution
- Use `Reflection.getClass()` with fallback names for better compatibility

This class is a critical component of JsMacros' advanced reflection capabilities, enabling scripts to dynamically extend their functionality through external libraries and runtime code execution.