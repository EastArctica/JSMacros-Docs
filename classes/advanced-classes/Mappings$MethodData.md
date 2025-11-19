# Mappings$MethodData

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.classes.Mappings$MethodData`

**Type:** Data Class

**Since:** JSMacros 1.3.1

The `MethodData` class is a data structure that contains comprehensive mapping information for a single method within the JsMacros mapping system. It stores both the source method signature and the target method signature, enabling bidirectional translation between different naming conventions (e.g., intermediary obfuscated names and human-readable deobfuscated names).

## Overview

The `MethodData` class serves as a container for method mapping information, providing:

- Source method signature (typically obfuscated/intermediary format)
- Target method signature (typically deobfuscated/named format)
- Parameter and return type information
- Method metadata for analysis and debugging

This class is primarily used internally by the `Mappings` system and `MappedClass` wrapper to perform automatic method name translation during reflection operations.

## Structure

MethodData objects contain the following key components:

- **Source Signature:** The original method signature in the source mapping format
- **Target Signature:** The translated method signature in the target format
- **Method Name:** The translated method name
- **Parameter Types:** Information about method parameters
- **Return Type:** Information about the method's return type

## Data Format

### Method Signatures

Method signatures use JVM internal format with slight variations for different mapping types:

```
// Basic method signature format
methodName(paramType1paramType2...)returnType

// Examples
"getHealth()F"              // getHealth() returns float
"setPose(Lcom/mojang/datafixers/util/P8;)V"  // setPose(P8) returns void
"interact(Lnet/minecraft/entity/player/PlayerEntity;Lnet/minecraft/util/Hand;)Lnet/minecraft/util/ActionResult;"
```

### Type Notation

- **Primitive Types:** `Z` (boolean), `B` (byte), `C` (char), `S` (short), `I` (int), `J` (long), `F` (float), `D` (double), `V` (void)
- **Object Types:** `Lpackage/ClassName;` (e.g., `Ljava/lang/String;`)
- **Arrays:** `[` prefix (e.g., `[I` for int[], `[[Ljava/lang/Object;` for Object[][])

## Access and Usage

MethodData objects are typically accessed through `Mappings$ClassData` instances:

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const classData = mappings.getMappings().get("net/minecraft/class_1657"); // PlayerEntity

if (classData) {
    const methods = classData.methods; // Map<String, MethodData>

    // Access specific method data
    for (const [signature, methodData] of methods) {
        Chat.log(`Method: ${methodData.name}`);
        Chat.log(`  Original signature: ${signature}`);
        Chat.log(`  Mapped signature: ${methodData.sig.get()}`);
    }
}
```

## Field Details

### `name: String`

The translated name of the method in the target mapping format.

**Type:** `String`

**Description:** Human-readable method name after mapping translation.

**Example Usage:**
```js
const methodData = getSomeMethodData();
Chat.log(`Method name: ${methodData.name}`); // e.g., "getHealth"
```

### `sig: MethodSigParts`

The method signature components and translation information.

**Type:** [`MethodSigParts`](Mappings$MethodData$MethodSigParts.md)

**Description:** Contains detailed signature information including parameter types, return type, and translation data.

**Example Usage:**
```js
const methodData = getSomeMethodData();
const signatureParts = methodData.sig;
Chat.log(`Full signature: ${signatureParts.get()}`);
```

## Usage Examples

### Exploring Method Mappings

```js
function exploreMethodMappings(className) {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

    try {
        const forwardMappings = mappings.getMappings();
        const classData = forwardMappings.get(className.replace(".", "/"));

        if (!classData) {
            Chat.log(`Class ${className} not found in mappings`);
            return;
        }

        Chat.log(`=== Method Mappings for ${className} ===`);
        Chat.log(`Total methods: ${classData.methods.size()}`);

        let count = 0;
        for (const [originalSig, methodData] of classData.methods) {
            if (count >= 10) { // Limit output
                Chat.log(`... and ${classData.methods.size() - 10} more methods`);
                break;
            }

            Chat.log(`\nMethod ${count + 1}:`);
            Chat.log(`  Original: ${originalSig}`);
            Chat.log(`  Mapped name: ${methodData.name}`);
            Chat.log(`  Mapped signature: ${methodData.sig.get()}`);

            count++;
        }

    } catch (error) {
        Chat.log(`Error exploring method mappings: ${error.message}`);
    }
}

// Example usage
exploreMethodMappings("net.minecraft.entity.player.PlayerEntity");
```

### Method Signature Analysis

```js
function analyzeMethodSignature(methodData) {
    Chat.log(`\n=== Method Analysis ===`);
    Chat.log(`Name: ${methodData.name}`);

    const signature = methodData.sig.get();
    Chat.log(`Full signature: ${signature}`);

    // Parse method name and parameters
    const parenIndex = signature.indexOf('(');
    const methodName = signature.substring(0, parenIndex);
    const paramsAndReturn = signature.substring(parenIndex);

    Chat.log(`Method name: ${methodName}`);

    // Extract parameters (between parentheses)
    const paramStart = signature.indexOf('(');
    const paramEnd = signature.indexOf(')');
    const paramsStr = signature.substring(paramStart + 1, paramEnd);

    if (paramsStr.length > 0) {
        Chat.log(`Parameters: ${parseTypes(paramsStr)}`);
    } else {
        Chat.log(`Parameters: (none)`);
    }

    // Extract return type (after ')')
    const returnType = signature.substring(paramEnd + 1);
    Chat.log(`Return type: ${parseType(returnType)}`);
}

function parseType(type) {
    const typeMap = {
        'Z': 'boolean', 'B': 'byte', 'C': 'char', 'S': 'short',
        'I': 'int', 'J': 'long', 'F': 'float', 'D': 'double', 'V': 'void'
    };

    if (type.startsWith('L') && type.endsWith(';')) {
        return type.substring(1, type.length - 1).replace(/\//g, '.');
    } else if (type.startsWith('[')) {
        return `${parseType(type.substring(1))}[]`;
    } else {
        return typeMap[type] || type;
    }
}

function parseTypes(typesStr) {
    const types = [];
    let i = 0;

    while (i < typesStr.length) {
        const type = parseType(typesStr.substring(i));
        types.push(type);

        // Move index past this type
        if (typesStr[i] === 'L') {
            const semicolon = typesStr.indexOf(';', i);
            i = semicolon + 1;
        } else {
            i++;
        }
    }

    return types.join(', ');
}
```

### Finding Specific Methods

```js
function findMethod(className, methodName) {
    const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");

    try {
        const forwardMappings = mappings.getMappings();
        const classData = forwardMappings.get(className.replace(".", "/"));

        if (!classData) {
            Chat.log(`Class ${className} not found`);
            return null;
        }

        for (const [originalSig, methodData] of classData.methods) {
            if (methodData.name === methodName) {
                Chat.log(`Found method: ${methodName}`);
                Chat.log(`  Original signature: ${originalSig}`);
                Chat.log(`  Mapped signature: ${methodData.sig.get()}`);
                return methodData;
            }
        }

        Chat.log(`Method ${methodName} not found in ${className}`);
        return null;

    } catch (error) {
        Chat.log(`Error finding method: ${error.message}`);
        return null;
    }
}

// Example: Find player health methods
const getHealthMethod = findMethod("net.minecraft.entity.player.PlayerEntity", "getHealth");
const setHealthMethod = findMethod("net.minecraft.entity.player.PlayerEntity", "setHealth");
```

### Comparing Mappings Across Versions

```js
function compareMethodMappings(className, methodName, version1, version2) {
    try {
        const mappings1 = Reflection.loadMappingHelper(`mappings/minecraft-${version1}.tiny`);
        const mappings2 = Reflection.loadMappingHelper(`mappings/minecraft-${version2}.tiny`);

        const method1 = findMethodInMappings(mappings1, className, methodName);
        const method2 = findMethodInMappings(mappings2, className, methodName);

        Chat.log(`=== Comparison: ${methodName} in ${className} ===`);
        Chat.log(`${version1}: ${method1 ? method1.sig.get() : 'NOT FOUND'}`);
        Chat.log(`${version2}: ${method2 ? method2.sig.get() : 'NOT FOUND'}`);

        if (method1 && method2) {
            const sig1 = method1.sig.get();
            const sig2 = method2.sig.get();

            if (sig1 === sig2) {
                Chat.log("Signatures are identical");
            } else {
                Chat.log("Signatures differ - potential compatibility issue");
            }
        }

    } catch (error) {
        Chat.log(`Error comparing mappings: ${error.message}`);
    }
}

function findMethodInMappings(mappings, className, methodName) {
    const classData = mappings.getMappings().get(className.replace(".", "/"));
    if (!classData) return null;

    for (const methodData of classData.methods.values()) {
        if (methodData.name === methodName) {
            return methodData;
        }
    }
    return null;
}

// Example usage
compareMethodMappings("net.minecraft.entity.player.PlayerEntity", "getHealth", "1.19.4", "1.20.1");
```

## Integration with Other Classes

### With MappedClass

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const player = Player.getPlayer();
const mappedPlayer = mappings.remapClass(player.getRaw());

// MappedClass uses MethodData internally for translation
// This call will automatically use the appropriate MethodData for method lookup
const health = mappedPlayer.invokeMethod("getHealth");
```

### With ClassData

```js
const mappings = Reflection.loadMappingHelper("mappings/minecraft-1.20.1.tiny");
const classData = mappings.getMappings().get("net/minecraft/class_1657");

// ClassData contains a Map of MethodData objects
const methodMap = classData.methods; // Map<String, MethodData>

for (const [signature, methodData] of methodMap) {
    // Work with MethodData objects
    Chat.log(`${signature} -> ${methodData.name}`);
}
```

## Error Handling

```js
function safeMethodDataAccess(classData, methodName) {
    try {
        for (const methodData of classData.methods.values()) {
            if (methodData.name === methodName) {
                return methodData;
            }
        }

        Chat.log(`Method ${methodName} not found in class`);
        return null;

    } catch (error) {
        Chat.log(`Error accessing method data: ${error.message}`);
        return null;
    }
}
```

## Performance Considerations

- MethodData objects are lightweight data structures
- They are cached within ClassData instances
- Access through ClassData's method map is efficient
- Signature parsing has minimal overhead

## Related Classes

- [`Mappings`](Mappings.md) - Main class that manages method mappings
- [`Mappings$ClassData`](Mappings$ClassData.md) - Contains method mappings for a class
- [`MappedClass`](Mappings$MappedClass.md) - Uses MethodData for automatic method translation
- `MethodSigParts` - Internal signature parsing components

## Version Information

- **Available Since:** JSMacros 1.3.1
- **Stable:** Yes - Core data structure hasn't changed
- **Performance:** Optimized for fast lookup and minimal memory usage

The MethodData class provides the fundamental building block for method name translation in JSMacros' mapping system, enabling robust cross-version compatibility and dynamic method resolution.