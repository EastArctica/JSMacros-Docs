# ProxyBuilder$ProxyReference

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder$ProxyReference`

**Type:** Interface/Helper Class

**Since:** JSMacros 1.6.0

The `ProxyReference` class provides a reference mechanism for accessing the original (parent) implementation within proxy method handlers. When creating dynamic proxies with ProxyBuilder, ProxyReference allows proxy methods to call through to the original method implementation, enabling method interception, decoration, and selective overriding of behavior.

## Overview

The ProxyReference class serves as a bridge between proxy method implementations and the original underlying object or method. It enables:

- Calling original method implementations from proxy methods
- Method interception and decoration patterns
- Conditional method overriding based on runtime logic
- Access to super/parent functionality in dynamic proxies
- Method chaining and delegation patterns

This class is typically passed as the first parameter to proxy method handlers, providing access to the original implementation while allowing custom behavior to be added before, after, or instead of the original call.

## Purpose and Use Cases

### Method Interception

ProxyReference enables intercepting method calls to add logging, validation, caching, or other cross-cutting concerns:

```js
const builder = new ProxyBuilder(ArrayList.class, []);

builder.addMethod("add(Ljava/lang/Object;)Z", JavaWrapper.methodToJava((ref, args) => {
    const item = args[0];

    // Pre-processing: Log the addition
    Chat.log(`Adding item to list: ${item}`);

    // Call original method through proxy reference
    const result = ref.parent ? ref.parent([item]) : false;

    // Post-processing: Log success
    if (result) {
        Chat.log(`Successfully added item: ${item}`);
    }

    return result;
}));
```

### Conditional Method Overriding

Selectively override method behavior based on conditions:

```js
const builder = new ProxyBuilder(StringBuilder.class, []);

builder.addMethod("append(Ljava/lang/String;)Ljava/lang/StringBuilder;",
    JavaWrapper.methodToJava((ref, args) => {
        const str = args[0];

        // Only append certain strings
        if (str && str.toString().includes("important")) {
            Chat.log(`Appending important data: ${str}`);
            return ref.parent ? ref.parent([str]) : null;
        } else {
            Chat.log(`Skipping non-important data: ${str}`);
            return null; // Don't call original method
        }
    }));
```

### Method Decoration

Wrap original method calls with additional functionality:

```js
const builder = new ProxyBuilder(HashMap.class, []);

builder.addMethod("put(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;",
    JavaWrapper.methodToJava((ref, args) => {
        const key = args[0];
        const value = args[1];

        // Pre-call validation
        if (key === null) {
            throw new Error("Null keys not allowed");
        }

        // Measure execution time
        const startTime = Date.now();
        const result = ref.parent ? ref.parent([key, value]) : null;
        const endTime = Date.now();

        Chat.log(`Put operation took ${endTime - startTime}ms`);
        return result;
    }));
```

## Interface Details

### Available Fields and Methods

The ProxyReference interface provides access to:

#### `parent: Function`

A function reference to the original method implementation.

**Type:** `Function`

**Description:** When available, this function can be called with the original method parameters to invoke the parent implementation.

**Usage:**
```js
// Check if parent method is available
if (ref.parent) {
    // Call original method with parameters
    const result = ref.parent(param1, param2, param3);
} else {
    // Handle case where no parent implementation exists
}
```

#### Method Signature Matching

The ProxyReference automatically matches the correct method signature based on how the proxy method was defined:

```js
// Method signature: "toString()Ljava/lang/String;"
builder.addMethod("toString()Ljava/lang/String;", JavaWrapper.methodToJava((ref, args) => {
    // ref.parent will match the toString() method
    return ref.parent ? ref.parent() : "default string";
}));

// Method signature: "add(Ljava/lang/Object;)Z"
builder.addMethod("add(Ljava/lang/Object;)Z", JavaWrapper.methodToJava((ref, args) => {
    // ref.parent will match the add(Object) method
    return ref.parent ? ref.parent(args[0]) : false;
}));
```

## Usage Examples

### Basic Method Delegation

```js
function createLoggingProxy() {
    const builder = new ProxyBuilder(ArrayList.class, []);

    // Override add() with logging
    builder.addMethod("add(Ljava/lang/Object;)Z", JavaWrapper.methodToJava((ref, args) => {
        const item = args[0];
        Chat.log(`[LIST] Adding item: ${item}`);

        // Call original add method
        const result = ref.parent ? ref.parent([item]) : false;

        if (result) {
            Chat.log(`[LIST] Successfully added: ${item}`);
        } else {
            Chat.log(`[LIST] Failed to add: ${item}`);
        }

        return result;
    }));

    // Override get() with bounds checking
    builder.addMethod("get(I)Ljava/lang/Object;", JavaWrapper.methodToJava((ref, args) => {
        const index = args[0];

        // Custom bounds checking
        if (index < 0) {
            throw new Error("Index cannot be negative");
        }

        // Call original get method
        try {
            const result = ref.parent ? ref.parent([index]) : null;
            Chat.log(`[LIST] Retrieved item at index ${index}: ${result}`);
            return result;
        } catch (e) {
            Chat.log(`[LIST] Error retrieving item at index ${index}: ${e.message}`);
            throw e;
        }
    }));

    return builder.buildInstance([]);
}

// Usage
const loggingList = createLoggingProxy();
loggingList.add("Hello");
loggingList.add("World");
const item = loggingList.get(0);
```

### Advanced Proxy Patterns

```js
function createCachedMethodProxy() {
    const cache = new Map();
    const builder = new ProxyBuilder(Object.class, [
        Java.type("java.util.function.Function")
    ]);

    // Create a cached function proxy
    builder.addMethod("apply(Ljava/lang/Object;)Ljava/lang/Object;",
        JavaWrapper.methodToJava((ref, args) => {
            const input = args[0];
            const cacheKey = input.toString();

            // Check cache first
            if (cache.has(cacheKey)) {
                Chat.log(`Cache hit for: ${input}`);
                return cache.get(cacheKey);
            }

            Chat.log(`Cache miss for: ${input}, computing...`);

            // Call expensive computation (if parent exists)
            const result = ref.parent ? ref.parent([input]) : `Processed: ${input}`;

            // Cache the result
            cache.set(cacheKey, result);
            Chat.log(`Cached result for: ${input}`);

            return result;
        }));

    return builder.buildInstance([]);
}

// Usage
const cachedFunction = createCachedMethodProxy();

// First call - cache miss
const result1 = cachedFunction.apply("test input");
Chat.log(`Result: ${result1}`);

// Second call - cache hit
const result2 = cachedFunction.apply("test input");
Chat.log(`Result: ${result2}`);
```

### Method Chaining and Decorator Pattern

```js
function createMethodChainProxy() {
    const builder = new ProxyBuilder(StringBuilder.class, []);

    // Create a chain of method calls with validation
    builder.addMethod("append(Ljava/lang/String;)Ljava/lang/StringBuilder;",
        JavaWrapper.methodToJava((ref, args) => {
            const str = args[0];

            // Input validation
            if (str === null) {
                throw new Error("Cannot append null string");
            }

            const strValue = str.toString();
            if (strValue.length === 0) {
                Chat.log("[CHAIN] Skipping empty string");
                return ref.parent; // Return current instance without calling parent
            }

            // Pre-processing
            Chat.log(`[CHAIN] Appending: "${strValue}" (length: ${strValue.length})`);

            // Call original method
            const result = ref.parent ? ref.parent([str]) : null;

            // Post-processing
            if (result) {
                const newLength = result.invokeMethod("length");
                Chat.log(`[CHAIN] New string length: ${newLength}`);
            }

            return result;
        }));

    return builder.buildInstance([]);
}

// Usage
const chainBuilder = createMethodChainProxy();
chainBuilder.append("Hello");
chainBuilder.append(" ");
chainBuilder.append("World");
chainBuilder.append(""); // This will be skipped
const finalString = chainBuilder.toString();
Chat.log(`Final string: "${finalString}"`);
```

### Error Handling with Fallback

```js
function createRobustProxy() {
    const builder = new ProxyBuilder(HashMap.class, []);

    // Robust get() method with error handling
    builder.addMethod("get(Ljava/lang/Object;)Ljava/lang/Object;",
        JavaWrapper.methodToJava((ref, args) => {
            const key = args[0];

            try {
                // Try to call original method
                if (ref.parent) {
                    return ref.parent([key]);
                }
            } catch (error) {
                Chat.log(`[ROBUST] Error getting key ${key}: ${error.message}`);
            }

            // Fallback behavior
            Chat.log(`[ROBUST] Using fallback for key ${key}`);
            return `FALLBACK_VALUE_FOR_${key}`;
        }));

    return builder.buildInstance([]);
}

// Usage
const robustMap = createRobustProxy();
const value = robustMap.get("nonexistent_key");
Chat.log(`Value: ${value}`);
```

## Error Handling Best Practices

### Always Check for Parent Availability

```js
builder.addMethod("someMethod()Ljava/lang/Object;",
    JavaWrapper.methodToJava((ref, args) => {
        // Always check if parent method is available
        if (ref.parent) {
            try {
                return ref.parent();
            } catch (error) {
                Chat.log(`Error calling parent method: ${error.message}`);
                // Fallback or rethrow as appropriate
            }
        } else {
            Chat.log("No parent implementation available");
            // Provide default behavior
        }

        return null; // Default return value
    }));
```

### Handle Method Signature Mismatches

```js
// Make sure parameter order and count match when calling parent
builder.addMethod("methodWithParams(IILjava/lang/String;)V",
    JavaWrapper.methodToJava((ref, args) => {
        const int1 = args[0];
        const int2 = args[1];
        const str = args[2];

        // Call parent with same parameters in same order
        if (ref.parent) {
            ref.parent([int1, int2, str]); // Maintain original order
        }
    }));
```

## Performance Considerations

- **Method Call Overhead:** Each call through `ref.parent` adds a small layer of indirection
- **Null Checks:** Always check `ref.parent` before calling to avoid errors
- **Exception Handling:** Wrap parent calls in try-catch for robust error handling
- **Caching:** Consider caching expensive results within proxy methods

## Integration with ProxyBuilder

ProxyReference is automatically provided as the first parameter to all proxy method handlers:

```js
const builder = new ProxyBuilder(SomeClass.class, []);

// ProxyReference is always the first parameter (ref)
builder.addMethod("methodName()TReturnType;",
    JavaWrapper.methodToJava((ref, args) => {
        // ref is the ProxyReference instance
        // args contains the method parameters

        // Use ref.parent to call original implementation
        return ref.parent ? ref.parent(args) : defaultValue;
    }));
```

## Related Classes

- [`ProxyBuilder`](ProxyBuilder.md) - Main class that creates proxies and provides ProxyReference
- `MethodWrapper` - Wrapper class for JavaScript functions used in proxies
- `JavaWrapper` - Utility class for creating method wrappers
- `ProxyFactory` - Javassist's underlying proxy factory

## Version Information

- **Available Since:** JSMacros 1.6.0
- **Stable:** Yes - Core interface has remained consistent
- **Thread Safety:** Thread-safe for method calls through parent

The ProxyReference class provides a powerful mechanism for method interception and decoration, enabling sophisticated proxy patterns and cross-cutting concerns in JSMacros scripts.