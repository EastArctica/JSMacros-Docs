# WrappedClassInstance$MethodSigParts

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.classes.WrappedClassInstance$MethodSigParts`

**Type:** Data Class

**Since:** JSMacros 1.6.5

The `MethodSigParts` class is a utility class that parses and represents components of Java method signatures. It provides structured access to the individual parts of a method signature, including return type, method name, parameter types, and other metadata. This class is primarily used internally by `WrappedClassInstance` and `MappedClass` for method resolution and reflection operations.

## Overview

The `MethodSigParts` class serves as a parser and container for JVM method signatures in their internal format. It breaks down complex method signatures into their constituent components, making it easier to work with method metadata, perform type checking, and resolve method calls accurately.

A typical JVM method signature looks like:
```
"methodName(LparamType1;LparamType2;)LreturnType;"
```

The MethodSigParts class parses this into structured components for easier manipulation.

## Supported Signature Formats

### JVM Internal Format
The primary format supported is the JVM's internal method signature format:
- Method names as plain text
- Object types as `Lpackage/ClassName;`
- Primitive types as single letters (`Z`, `B`, `C`, `S`, `I`, `J`, `F`, `D`, `V`)
- Arrays with `[` prefix
- Parameters in parentheses, return type after closing parenthesis

### Examples
```js
// Basic method signatures
"toString()Ljava/lang/String;"           // toString() -> String
"getHealth()F"                           // getHealth() -> float
"setHealth(F)V"                          // setHealth(float) -> void

// Complex method signatures
"interact(Lnet/minecraft/entity/player/PlayerEntity;Lnet/minecraft/util/Hand;)Lnet/minecraft/util/ActionResult;"
"put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;"
"process([[ILjava/util/List;)[Ljava/lang/String;"
```

## Class Structure

### Key Components

The MethodSigParts class provides access to:

- **Return Type:** The method's return type in JVM format
- **Parameter Types:** Array of parameter types in JVM format
- **Method Name:** The method name (if available from signature)
- **Raw Signature:** The original method signature string
- **Formatted Components:** Human-readable type representations

## Usage and Access

MethodSigParts instances are typically created and accessed through reflection operations:

```js
const reflection = Fs.load("lib:FReflection.js");
const object = SomeJavaObject;
const wrapped = reflection.wrapInstace(object);

// Method calls that return MethodSigParts
const sigParts = wrapped.invokeMethod("someMethodReturningSignature");
const formattedSig = sigParts.get(); // Get formatted signature
```

## Common Operations

### Getting Formatted Signature

```js
const methodSigParts = getMethodSigParts(); // Assume we have an instance

// Get the full formatted method signature
const signature = methodSigParts.get();
Chat.log(`Method signature: ${signature}`);

// Output might be: "someMethod(Ljava/lang/String;I)Ljava/lang/Object;"
```

### Signature Parsing Examples

```js
function analyzeMethodSignature(signature) {
    // Create MethodSigParts from signature (hypothetical constructor)
    const sigParts = new MethodSigParts(signature);

    Chat.log(`=== Method Signature Analysis ===`);
    Chat.log(`Original: ${sigParts.getOriginal()}`);
    Chat.log(`Return Type: ${sigParts.getReturnType()}`);
    Chat.log(`Parameter Count: ${sigParts.getParameterCount()}`);

    const params = sigParts.getParameters();
    Chat.log(`Parameters:`);
    for (let i = 0; i < params.length; i++) {
        Chat.log(`  ${i}: ${params[i]}`);
    }
}

// Example usage
analyzeMethodSignature("interact(Lnet/minecraft/entity/player/PlayerEntity;Lnet/minecraft/util/Hand;)Lnet/minecraft/util/ActionResult;");
```

### Type Conversion and Formatting

```js
function formatJVMType(jvmType) {
    const primitiveTypes = {
        'Z': 'boolean',
        'B': 'byte',
        'C': 'char',
        'S': 'short',
        'I': 'int',
        'J': 'long',
        'F': 'float',
        'D': 'double',
        'V': 'void'
    };

    if (primitiveTypes[jvmType]) {
        return primitiveTypes[jvmType];
    } else if (jvmType.startsWith('L') && jvmType.endsWith(';')) {
        return jvmType.substring(1, jvmType.length - 1).replace(/\//g, '.');
    } else if (jvmType.startsWith('[')) {
        return formatJVMType(jvmType.substring(1)) + '[]';
    } else {
        return jvmType; // Unknown type
    }
}

function analyzeMethodSignatureHumanReadable(methodSigParts) {
    Chat.log(`=== Human-Readable Method Analysis ===`);

    const returnType = formatJVMType(methodSigParts.getReturnType());
    const parameters = methodSigParts.getParameters().map(formatJVMType);

    Chat.log(`Return Type: ${returnType}`);
    Chat.log(`Parameters: ${parameters.join(', ') || 'none'}`);

    // Reconstruct human-readable signature
    const paramStr = parameters.join(', ');
    const humanReadable = `method(${paramStr}): ${returnType}`;
    Chat.log(`Human-readable: ${humanReadable}`);
}
```

### Method Compatibility Checking

```js
function checkMethodCompatibility(sig1, sig2) {
    const parts1 = new MethodSigParts(sig1);
    const parts2 = new MethodSigParts(sig2);

    // Check return type compatibility
    const returnCompatible = isReturnTypeCompatible(
        parts1.getReturnType(),
        parts2.getReturnType()
    );

    // Check parameter compatibility
    const params1 = parts1.getParameters();
    const params2 = parts2.getParameters();

    const paramCountCompatible = params1.length === params2.length;
    let paramTypesCompatible = paramCountCompatible;

    if (paramCountCompatible) {
        for (let i = 0; i < params1.length; i++) {
            if (!isTypeCompatible(params1[i], params2[i])) {
                paramTypesCompatible = false;
                break;
            }
        }
    }

    Chat.log(`Compatibility Check:`);
    Chat.log(`  Return types compatible: ${returnCompatible}`);
    Chat.log(`  Parameter counts compatible: ${paramCountCompatible}`);
    Chat.log(`  Parameter types compatible: ${paramTypesCompatible}`);
    Chat.log(`  Overall compatible: ${returnCompatible && paramTypesCompatible}`);

    return returnCompatible && paramTypesCompatible;
}

function isTypeCompatible(type1, type2) {
    // Simplified type compatibility check
    // In reality, this would need to consider inheritance, boxing, etc.
    return type1 === type2 ||
           (isPrimitive(type1) && isBoxedType(type2, type1)) ||
           (isPrimitive(type2) && isBoxedType(type1, type2));
}

function isReturnTypeCompatible(return1, return2) {
    // Return type compatibility (covariant returns allowed)
    return return1 === return2 || return1 === 'V' || return2 === 'V';
}
```

## Integration with Reflection Operations

### Method Resolution

```js
function resolveMethod(wrappedInstance, methodName, ...params) {
    try {
        // Try direct method name first
        return wrappedInstance.invokeMethod(methodName, ...params);
    } catch (e) {
        Chat.log(`Direct method call failed, trying with signature...`);

        // Try to construct and match method signature
        const paramTypes = params.map(param => {
            if (param === null) return "Ljava/lang/Object;";
            if (typeof param === 'boolean') return "Z";
            if (typeof param === 'number') {
                return Number.isInteger(param) ? "I" : "D";
            }
            if (typeof param === 'string') return "Ljava/lang/String;";
            return "Ljava/lang/Object;";
        }).join('');

        const signature = `${methodName}(${paramTypes})Ljava/lang/Object;`;
        Chat.log(`Trying signature: ${signature}`);

        return wrappedInstance.invokeMethod(signature, ...params);
    }
}
```

### Signature-Based Method Calls

```js
function callMethodBySignature(wrappedInstance, signature, ...params) {
    try {
        const result = wrappedInstance.invokeMethod(signature, ...params);
        Chat.log(`Method call successful: ${signature}`);

        // If result contains signature information, analyze it
        if (result && typeof result === 'object' && result.get) {
            const resultSig = result.get();
            Chat.log(`Return signature: ${resultSig}`);
        }

        return result;
    } catch (error) {
        Chat.log(`Method call failed: ${signature} - ${error.message}`);
        throw error;
    }
}

// Example usage
const reflection = Fs.load("lib:FReflection.js");
const list = new java.util.ArrayList();
const wrapped = reflection.wrapInstace(list);

// Call add method by signature
const success = callMethodBySignature(wrapped, "add(Ljava/lang/Object;)Z", "Hello World");
```

## Error Handling

### Signature Parsing Errors

```js
function safeParseMethodSignature(signature) {
    try {
        const sigParts = new MethodSigParts(signature);
        return sigParts;
    } catch (error) {
        Chat.log(`Error parsing method signature "${signature}": ${error.message}`);

        // Try to provide fallback information
        return {
            get: () => signature,
            getReturnType: () => "Ljava/lang/Object;",
            getParameters: () => [],
            isValid: () => false
        };
    }
}
```

### Invalid Method Calls

```js
function safeMethodInvocation(wrappedInstance, methodIdentifier, ...params) {
    try {
        // Try method identifier as name first
        let result = wrappedInstance.invokeMethod(methodIdentifier, ...params);
        return result;
    } catch (e1) {
        try {
            // Try as full signature
            result = wrappedInstance.invokeMethod(methodIdentifier, ...params);
            return result;
        } catch (e2) {
            Chat.log(`Method invocation failed:`);
            Chat.log(`  As name: ${methodIdentifier} - ${e1.message}`);
            Chat.log(`  As signature: ${methodIdentifier} - ${e2.message}`);
            return null;
        }
    }
}
```

## Performance Considerations

- **Parsing Overhead:** Method signature parsing has minimal overhead
- **Caching:** Consider caching parsed MethodSigParts for frequently used signatures
- **Memory Usage:** MethodSigParts instances are lightweight data structures

## Related Classes

- [`WrappedClassInstance`](WrappedClassInstance.md) - Main class that uses MethodSigParts for method resolution
- [`MappedClass`](Mappings$MappedClass.md) - Uses MethodSigParts for mapping-aware method calls
- [`Mappings$MethodData`](Mappings$MethodData.md) - Contains MethodSigParts for method mapping information
- Java reflection classes (`Method`, `Class`) - External equivalent functionality

## Version Information

- **Available Since:** JSMacros 1.6.5
- **Stable:** Yes - Core parsing functionality has remained consistent
- **Thread Safe:** Yes - MethodSigParts instances are immutable once created

The MethodSigParts class provides essential functionality for working with Java method signatures in JSMacros, enabling accurate method resolution and type-aware reflection operations.