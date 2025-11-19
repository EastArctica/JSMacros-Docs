# Mappings$ClassData

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.classes.Mappings.ClassData`

**Nested Class:** Static nested class within `Mappings`

**Since:** JSMacros 1.3.1

The `Mappings$ClassData` class is a comprehensive data structure that represents all mapping information for a single class within the JSMacros mapping system. It contains the class name along with complete mappings for all methods and fields, serving as the central repository for both forward (intermediary to named) and reverse (named to intermediary) mapping operations.

This class is fundamental to JSMacros' ability to provide version-compatible scripting by maintaining the relationship between obfuscated Minecraft identifiers and their human-readable named equivalents.

**Key Features:**
- Stores complete mapping information for individual classes
- Maintains bidirectional mappings for methods and fields
- Supports both intermediary and named class representations
- Provides efficient lookup structures for mapping resolution
- Enables advanced reflection operations with automatic name translation
- Integrates seamlessly with the Mappings system for cross-version compatibility

## Overview

The `ClassData` class serves as a container for all mapping-related information about a specific class. It acts as a bridge between the obfuscated Minecraft bytecode (using intermediary names like `class_1657`) and the human-readable development names (like `PlayerEntity`). Each instance maintains:

- **Class Identity**: The class name in its respective mapping direction
- **Method Mappings**: Complete mapping table for all class methods
- **Field Mappings**: Complete mapping table for all class fields
- **Metadata**: Additional information about the class structure

## Fields

### `name: String`

The primary class name for this mapping entry. The format of this name depends on whether this ClassData is part of forward mappings (intermediary format) or reverse mappings (named format).

**Type:** `String`

**Format Examples:**
- **Intermediary format**: `"net/minecraft/class_1657"`
- **Named format**: `"net.minecraft.entity.player.PlayerEntity"`

**Example Usage:**
```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const forwardMappings = mappings.getMappings();

// Get ClassData for intermediary class name
const playerClassData = forwardMappings.get("net/minecraft/class_1657");
if (playerClassData) {
    Chat.log("Class name: " + playerClassData.name); // "net.minecraft.entity.player.PlayerEntity"

    // The name field shows the target mapping format
    Chat.log("This represents mappings for: " + playerClassData.name);
}
```

### `methods: Map<String, MethodData>`

A comprehensive mapping table containing all method mappings for this class. The map keys are method signatures, and the values are [`MethodData`](Mappings$MethodData.md) objects containing the mapped method information.

**Type:** `Map<String, MethodData>`

**Key Format:** Method signature in the source mapping format
**Value Type:** [`Mappings$MethodData`](Mappings$MethodData.md)

**Example Usage:**
```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const forwardMappings = mappings.getMappings();

const playerClassData = forwardMappings.get("net/minecraft/class_1657");
if (playerClassData) {
    Chat.log("Total methods: " + playerClassData.methods.size());

    // Iterate through method mappings
    let count = 0;
    for (const [signature, methodData] of playerClassData.methods) {
        if (count < 5) { // Show first 5 methods
            Chat.log("Method: " + methodData.name + methodData.sig.get());
            Chat.log("  Original signature: " + signature);
            count++;
        }
    }

    if (playerClassData.methods.size() > 5) {
        Chat.log("... and " + (playerClassData.methods.size() - 5) + " more methods");
    }
}
```

### `fields: Map<String, String>`

A mapping table containing all field mappings for this class. The map keys are field names in the source mapping format, and the values are field names in the target mapping format.

**Type:** `Map<String, String>`

**Key Format:** Field name in source format (intermediary or named)
**Value Format:** Field name in target format (named or intermediary)

**Example Usage:**
```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const forwardMappings = mappings.getMappings();

const playerClassData = forwardMappings.get("net/minecraft/class_1657");
if (playerClassData) {
    Chat.log("Total fields: " + playerClassData.fields.size());

    // Iterate through field mappings
    let count = 0;
    for (const [originalName, mappedName] of playerClassData.fields) {
        if (count < 10) { // Show first 10 fields
            Chat.log("Field: " + originalName + " -> " + mappedName);
            count++;
        }
    }

    if (playerClassData.fields.size() > 10) {
        Chat.log("... and " + (playerClassData.fields.size() - 10) + " more fields");
    }
}
```

## Usage Patterns

### Accessing Class Information
```js
function analyzeClassMapping(className) {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

    try {
        const forwardMappings = mappings.getMappings();
        const reverseMappings = mappings.getReversedMappings();

        // Try to find the class in both mapping directions
        const forwardData = forwardMappings.get(className.replace(".", "/"));
        const reverseData = reverseMappings.get(className);

        if (forwardData) {
            Chat.log("=== Forward Mapping Analysis ===");
            Chat.log("Class: " + forwardData.name);
            Chat.log("Methods: " + forwardData.methods.size());
            Chat.log("Fields: " + forwardData.fields.size());

            // Show sample method mappings
            if (forwardData.methods.size() > 0) {
                Chat.log("\nSample Method Mappings:");
                let methodCount = 0;
                for (const [sig, methodData] of forwardData.methods) {
                    if (methodCount < 3) {
                        Chat.log("  " + sig + " -> " + methodData.name + methodData.sig.get());
                        methodCount++;
                    }
                }
            }

            // Show sample field mappings
            if (forwardData.fields.size() > 0) {
                Chat.log("\nSample Field Mappings:");
                let fieldCount = 0;
                for (const [original, mapped] of forwardData.fields) {
                    if (fieldCount < 5) {
                        Chat.log("  " + original + " -> " + mapped);
                        fieldCount++;
                    }
                }
            }
        }

        if (reverseData) {
            Chat.log("\n=== Reverse Mapping Analysis ===");
            Chat.log("Class: " + reverseData.name);
            Chat.log("Methods: " + reverseData.methods.size());
            Chat.log("Fields: " + reverseData.fields.size());
        }

    } catch (e) {
        Chat.log("Error analyzing class mapping: " + e.message);
    }
}

// Example usage:
analyzeClassMapping("net.minecraft.entity.player.PlayerEntity");
```

### Method Lookup and Analysis
```js
function findMethodInClass(className, methodName) {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const forwardMappings = mappings.getMappings();

    // Convert class name to intermediary format for lookup
    const intermediaryName = className.replace(".", "/");
    const classData = forwardMappings.get(intermediaryName);

    if (!classData) {
        Chat.log("Class not found in mappings: " + className);
        return [];
    }

    const foundMethods = [];

    // Search for methods by name
    for (const [signature, methodData] of classData.methods) {
        if (methodData.name.includes(methodName)) {
            foundMethods.push({
                signature: signature,
                name: methodData.name,
                parameters: methodData.sig.get()
            });
        }
    }

    Chat.log("Found " + foundMethods.length + " methods matching '" + methodName + "' in " + className);
    foundMethods.forEach(method => {
        Chat.log("  " + method.name + method.parameters);
    });

    return foundMethods;
}

// Example usage:
findMethodInClass("net.minecraft.entity.player.PlayerEntity", "getHealth");
findMethodInClass("net.minecraft.entity.player.PlayerEntity", "inventory");
```

### Field Analysis
```js
function analyzeClassFields(className) {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const forwardMappings = mappings.getMappings();

    const intermediaryName = className.replace(".", "/");
    const classData = forwardMappings.get(intermediaryName);

    if (!classData) {
        Chat.log("Class not found in mappings: " + className);
        return;
    }

    Chat.log("=== Field Analysis for " + className + " ===");
    Chat.log("Total fields: " + classData.fields.size());

    // Categorize fields by type/pattern
    const fieldCategories = {
        health: [],
        inventory: [],
        position: [],
        status: [],
        other: []
    };

    for (const [originalName, mappedName] of classData.fields) {
        const lowerMapped = mappedName.toLowerCase();

        if (lowerMapped.includes("health")) {
            fieldCategories.health.push({original: originalName, mapped: mappedName});
        } else if (lowerMapped.includes("inventory") || lowerMapped.includes("slot")) {
            fieldCategories.inventory.push({original: originalName, mapped: mappedName});
        } else if (lowerMapped.includes("x") || lowerMapped.includes("y") || lowerMapped.includes("z")) {
            fieldCategories.position.push({original: originalName, mapped: mappedName});
        } else if (lowerMapped.includes("status") || lowerMapped.includes("state")) {
            fieldCategories.status.push({original: originalName, mapped: mappedName});
        } else {
            fieldCategories.other.push({original: originalName, mapped: mappedName});
        }
    }

    // Display categorized fields
    Object.entries(fieldCategories).forEach(([category, fields]) => {
        if (fields.length > 0) {
            Chat.log("\n" + category.toUpperCase() + " fields (" + fields.length + "):");
            fields.forEach(field => {
                Chat.log("  " + field.original + " -> " + field.mapped);
            });
        }
    });
}

// Example usage:
analyzeClassFields("net.minecraft.entity.player.PlayerEntity");
```

### Cross-Version Mapping Comparison
```js
function compareMappingsAcrossVersions(className, version1Mappings, version2Mappings) {
    Chat.log("=== Cross-Version Comparison for " + className + " ===");

    try {
        const mappings1 = Reflection.loadMappingHelper(version1Mappings);
        const mappings2 = Reflection.loadMappingHelper(version2Mappings);

        const forward1 = mappings1.getMappings();
        const forward2 = mappings2.getMappings();

        const intermediaryName = className.replace(".", "/");
        const classData1 = forward1.get(intermediaryName);
        const classData2 = forward2.get(intermediaryName);

        if (classData1 && classData2) {
            Chat.log("Version 1 (" + version1Mappings + "):");
            Chat.log("  Methods: " + classData1.methods.size());
            Chat.log("  Fields: " + classData1.fields.size());

            Chat.log("Version 2 (" + version2Mappings + "):");
            Chat.log("  Methods: " + classData2.methods.size());
            Chat.log("  Fields: " + classData2.fields.size());

            // Compare method counts
            const methodDiff = classData2.methods.size() - classData1.methods.size();
            if (methodDiff !== 0) {
                Chat.log("Method count difference: " + methodDiff);
            }

            // Compare field counts
            const fieldDiff = classData2.fields.size() - classData1.fields.size();
            if (fieldDiff !== 0) {
                Chat.log("Field count difference: " + fieldDiff);
            }

        } else {
            Chat.log("Class not found in one or both mapping versions");
        }

    } catch (e) {
        Chat.log("Error comparing mappings: " + e.message);
    }
}
```

### Integration with MappedClass
```js
function demonstrateClassDataIntegration() {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const player = Player.getPlayer();

    try {
        // Get the raw class data
        const rawPlayer = player.getRaw();
        const rawClassName = rawPlayer.getClass().getName();

        Chat.log("Raw class name: " + rawClassName);

        // Get mapping data for this class
        const forwardMappings = mappings.getMappings();
        const classData = forwardMappings.get(rawClassName);

        if (classData) {
            Chat.log("=== Class Data Integration ===");
            Chat.log("Mapped class name: " + classData.name);
            Chat.log("Available methods: " + classData.methods.size());
            Chat.log("Available fields: " + classData.fields.size());

            // Create a mapped wrapper
            const mappedPlayer = mappings.remapClass(rawPlayer);

            // The mapped wrapper uses the ClassData internally
            // to resolve method and field names
            Chat.log("Successfully created mapped wrapper");

            // Try to access some methods/fields through the mapped wrapper
            // (These would use the ClassData for name resolution)

        } else {
            Chat.log("No mapping data found for class: " + rawClassName);
        }

    } catch (e) {
        Chat.log("Error in ClassData integration demo: " + e.message);
    }
}
```

## Advanced Usage

### Custom Mapping Analysis Tools
```js
function createMappingAnalyzer() {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const forwardMappings = mappings.getMappings();

    return {
        // Find classes with specific method patterns
        findClassesWithMethod: function(methodPattern) {
            const matchingClasses = [];

            for (const [className, classData] of forwardMappings) {
                for (const [signature, methodData] of classData.methods) {
                    if (methodData.name.matches(methodPattern)) {
                        matchingClasses.push({
                            className: className,
                            mappedName: classData.name,
                            method: methodData.name + methodData.sig.get(),
                            signature: signature
                        });
                        break; // Only add each class once
                    }
                }
            }

            return matchingClasses;
        },

        // Analyze field distribution
        analyzeFieldDistribution: function() {
            const fieldStats = {
                totalClasses: forwardMappings.size(),
                totalFields: 0,
                classesByFieldCount: {}
            };

            for (const [className, classData] of forwardMappings) {
                const fieldCount = classData.fields.size();
                fieldStats.totalFields += fieldCount;

                const category = fieldCount === 0 ? "no_fields" :
                               fieldCount < 10 ? "few_fields" :
                               fieldCount < 50 ? "moderate_fields" :
                               "many_fields";

                fieldStats.classesByFieldCount[category] = (fieldStats.classesByFieldCount[category] || 0) + 1;
            }

            return fieldStats;
        },

        // Find class inheritance patterns (heuristic based on method names)
        findInheritancePatterns: function() {
            const patterns = {
                entityClasses: [],
                blockClasses: [],
                itemClasses: [],
                screenClasses: []
            };

            for (const [className, classData] of classData) {
                const mappedName = classData.name.toLowerCase();

                // Heuristic classification based on package and method names
                if (mappedName.includes("entity")) {
                    patterns.entityClasses.push(classData.name);
                } else if (mappedName.includes("block")) {
                    patterns.blockClasses.push(classData.name);
                } else if (mappedName.includes("item")) {
                    patterns.itemClasses.push(classData.name);
                } else if (mappedName.includes("screen") || mappedName.includes("gui")) {
                    patterns.screenClasses.push(classData.name);
                }
            }

            return patterns;
        }
    };
}

// Usage example
const analyzer = createMappingAnalyzer();

// Find classes with "getHealth" method
const healthClasses = analyzer.findClassesWithMethod("getHealth");
Chat.log("Classes with getHealth method: " + healthClasses.length);

// Analyze field distribution
const fieldStats = analyzer.analyzeFieldDistribution();
Chat.log("Field distribution analysis:");
Chat.log("  Total classes: " + fieldStats.totalClasses);
Chat.log("  Total fields: " + fieldStats.totalFields);
Object.entries(fieldStats.classesByFieldCount).forEach(([category, count]) => {
    Chat.log("  " + category + ": " + count);
});
```

### Mapping Validation and Quality Checks
```js
function validateMappingQuality() {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const forwardMappings = mappings.getMappings();

    const validationResults = {
        totalClasses: forwardMappings.size(),
        classesWithNoMethods: 0,
        classesWithNoFields: 0,
        classesWithDuplicateMethodNames: 0,
        potentialIssues: []
    };

    for (const [className, classData] of forwardMappings) {
        // Check for classes with no methods
        if (classData.methods.size() === 0) {
            validationResults.classesWithNoMethods++;
            validationResults.potentialIssues.push("No methods: " + classData.name);
        }

        // Check for classes with no fields
        if (classData.fields.size() === 0) {
            validationResults.classesWithNoFields++;
        }

        // Check for duplicate method names (ignoring signatures)
        const methodNames = new Set();
        const duplicateNames = new Set();

        for (const methodData of classData.methods.values()) {
            if (methodNames.has(methodData.name)) {
                duplicateNames.add(methodData.name);
            } else {
                methodNames.add(methodData.name);
            }
        }

        if (duplicateNames.size > 0) {
            validationResults.classesWithDuplicateMethodNames++;
            validationResults.potentialIssues.push("Duplicate methods in " + classData.name + ": " + Array.from(duplicateNames).join(", "));
        }
    }

    // Display validation results
    Chat.log("=== Mapping Quality Validation ===");
    Chat.log("Total classes: " + validationResults.totalClasses);
    Chat.log("Classes with no methods: " + validationResults.classesWithNoMethods);
    Chat.log("Classes with no fields: " + validationResults.classesWithNoFields);
    Chat.log("Classes with duplicate method names: " + validationResults.classesWithDuplicateMethodNames);

    if (validationResults.potentialIssues.length > 0) {
        Chat.log("\nPotential issues:");
        validationResults.potentialIssues.slice(0, 10).forEach(issue => {
            Chat.log("  " + issue);
        });

        if (validationResults.potentialIssues.length > 10) {
            Chat.log("  ... and " + (validationResults.potentialIssues.length - 10) + " more issues");
        }
    }

    return validationResults;
}
```

## Performance Considerations

### Memory Usage
```js
function analyzeMemoryUsage() {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
    const forwardMappings = mappings.getMappings();

    let totalMethodEntries = 0;
    let totalFieldEntries = 0;
    let largestClass = null;
    let maxEntries = 0;

    for (const [className, classData] of forwardMappings) {
        const methodCount = classData.methods.size();
        const fieldCount = classData.fields.size();
        const totalEntries = methodCount + fieldCount;

        totalMethodEntries += methodCount;
        totalFieldEntries += fieldCount;

        if (totalEntries > maxEntries) {
            maxEntries = totalEntries;
            largestClass = classData.name;
        }
    }

    Chat.log("=== Memory Usage Analysis ===");
    Chat.log("Total classes: " + forwardMappings.size());
    Chat.log("Total method entries: " + totalMethodEntries);
    Chat.log("Total field entries: " + totalFieldEntries);
    Chat.log("Average entries per class: " + ((totalMethodEntries + totalFieldEntries) / forwardMappings.size()).toFixed(1));
    Chat.log("Largest class: " + largestClass + " (" + maxEntries + " entries)");
}
```

### Efficient Lookup Patterns
```js
function createEfficientLookupCache(mappings) {
    const forwardMappings = mappings.getMappings();

    // Create lookup caches for frequently accessed items
    const methodLookupCache = new Map();
    const fieldLookupCache = new Map();

    return {
        // Fast method lookup
        findMethodFast: function(className, methodName) {
            const cacheKey = className + "::" + methodName;

            if (methodLookupCache.has(cacheKey)) {
                return methodLookupCache.get(cacheKey);
            }

            const classData = forwardMappings.get(className);
            if (!classData) {
                methodLookupCache.set(cacheKey, null);
                return null;
            }

            for (const [signature, methodData] of classData.methods) {
                if (methodData.name === methodName) {
                    const result = { signature, methodData };
                    methodLookupCache.set(cacheKey, result);
                    return result;
                }
            }

            methodLookupCache.set(cacheKey, null);
            return null;
        },

        // Fast field lookup
        findFieldFast: function(className, fieldName) {
            const cacheKey = className + "::" + fieldName;

            if (fieldLookupCache.has(cacheKey)) {
                return fieldLookupCache.get(cacheKey);
            }

            const classData = forwardMappings.get(className);
            if (!classData) {
                fieldLookupCache.set(cacheKey, null);
                return null;
            }

            const result = classData.fields.get(fieldName);
            fieldLookupCache.set(cacheKey, result);
            return result;
        },

        // Cache statistics
        getCacheStats: function() {
            return {
                methodCacheSize: methodLookupCache.size,
                fieldCacheSize: fieldLookupCache.size
            };
        }
    };
}
```

## Important Notes

### Thread Safety
- `ClassData` instances are immutable after creation
- Safe for concurrent read operations
- Map collections should be treated as read-only

### Memory Management
- Large mappings can consume significant memory
- Consider caching frequently accessed ClassData instances
- The underlying Mappings system provides built-in caching

### Error Handling
- Always check for null ClassData when looking up classes
- Method and field lookups may return null if not found
- Wrap operations in try-catch blocks for robustness

### Version Compatibility
- ClassData is version-specific to mapping files
- Ensure mappings match your Minecraft version
- Different versions may have different class structures

### Performance Optimization
- Use direct map access when possible
- Consider caching frequently used ClassData instances
- Batch operations can be more efficient than individual lookups

## Related Classes

- [`Mappings`](Mappings.md) - Parent class that manages ClassData instances
- [`Mappings$MethodData`](mappings$method-data.md) - Method mapping data structure
- [`MappedClass`](MappedClass.md) - Class wrapper that uses ClassData for reflection
- [`FReflection`](FReflection.md) - Main reflection library for loading mappings

## Version History

- **1.3.1**: Initial introduction with basic class, method, and field mapping support
- **1.6.0**: Enhanced integration with MappedClass system
- **Current**: Stable and comprehensive mapping data structure with full bidirectional support

The `Mappings$ClassData` class provides the foundation for JSMacros' advanced mapping system, enabling robust cross-version compatibility and powerful reflection capabilities for Minecraft modding and scripting.