# WrappedClassInstance

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.classes.WrappedClassInstance`

**Type:** Generic Class `<T>`

**Available Since:** JSMacros 1.6.5

The `WrappedClassInstance` class is an advanced reflection-based wrapper that provides dynamic access to Java class instances and their members in JSMacros scripts. This class enables scripters to interact with any Java object, invoke methods, and access fields using reflection, making it possible to work with classes that don't have dedicated helper classes.

This class is primarily used through the `FReflection` library and provides powerful capabilities for advanced users who need to interact with Minecraft's internal APIs or external libraries.

## Overview

The `WrappedClassInstance` class serves as a universal wrapper around any Java object, allowing:

- Dynamic method invocation using method names or signatures
- Field access and modification for any accessible field
- Support for inheritance hierarchies and interface implementation
- Automatic parameter type conversion and compatibility checking
- Method signature parsing for precise method identification

## Constructors

### new WrappedClassInstance(instance)
```js
const wrapper = new WrappedClassInstance(someJavaObject);
```

Creates a new wrapper around an existing Java instance, automatically detecting its class type.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| instance | T | The Java object to wrap |

**Example:**
```js
// Wrap a Java ArrayList
const JavaArrayList = Java.type("java.util.ArrayList");
const list = new JavaArrayList();
const wrappedList = new WrappedClassInstance(list);
```

### new WrappedClassInstance(instance, tClass)
```js
const wrapper = new WrappedClassInstance(null, Java.type("java.lang.String"));
```

Creates a wrapper for a class type, useful when working with static members or when the instance is null.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| instance | T | The Java object to wrap (can be null) |
| tClass | Class<T> | The class type to use for reflection |

**Example:**
```js
// Wrap a class for static method access
const StringClass = Java.type("java.lang.String");
const wrappedStringClass = new WrappedClassInstance(null, StringClass);
```

## Accessing WrappedClassInstance

You typically obtain `WrappedClassInstance` objects through the `FReflection` library:

```js
// Wrap an existing instance
const reflection = Fs.load("lib:FReflection.js");
const list = new java.util.ArrayList();
const wrapped = reflection.wrapInstace(list);

// Get a wrapper for a class
const stringWrapper = reflection.getWrappedClass("java.lang.String");
```

## Methods

### Instance Access

- [wrapper.getRawInstance()](#wrappergetrawinstance)
- [wrapper.getRawClass()](#wrappergetrawclass)

### Field Operations

- [wrapper.getFieldValue(fieldName)](#wrappergetfieldvalue)
- [wrapper.getFieldValueAsClass(asClass, fieldName)](#wrappergetfieldvalueasclass)
- [wrapper.setFieldValue(fieldName, fieldValue)](#wrappersetfieldvalue)
- [wrapper.setFieldValueAsClass(asClass, fieldName, fieldValue)](#wrappersetfieldvalueasclass)

### Method Operations

- [wrapper.invokeMethod(methodNameOrSig, ...params)](#wrapperinvokemethod)
- [wrapper.invokeMethodAsClass(asClass, methodNameOrSig, ...params)](#wrapperinvokemethodasclass)

---

## Instance Access

## Field Operations

## Method Operations

## Usage Examples

### Basic Object Interaction
```js
const reflection = Fs.load("lib:FReflection.js");

// Wrap a Java HashMap
const HashMap = Java.type("java.util.HashMap");
const map = new HashMap();
const wrappedMap = reflection.wrapInstace(map);

// Use methods through reflection
wrappedMap.invokeMethod("put", "key1", "value1");
wrappedMap.invokeMethod("put", "key2", "value2");

// Get values
const value = wrappedMap.invokeMethod("get", "key1");
Chat.log(`Retrieved value: ${value}`);

// Check size
const size = wrappedMap.invokeMethod("size");
Chat.log(`Map size: ${size}`);
```

### Advanced Field Manipulation
```js
// Working with StringBuilder internals
const StringBuilder = Java.type("java.lang.StringBuilder");
const sb = new StringBuilder("Initial text");
const wrapped = reflection.wrapInstace(sb);

// Access internal fields
const value = wrapped.getFieldValue("value");
const count = wrapped.getFieldValue("count");

Chat.log(`Internal array length: ${value.length}`);
Chat.log(`Character count: ${count}`);

// Modify internal state
wrapped.setFieldValue("count", 5);
Chat.log(`New length: ${sb.length()}`);
```

### Method Signature Usage
```js
// Using exact method signatures for overloaded methods
const String = Java.type("java.lang.String");
const testString = new String("Hello World");
const wrapped = reflection.wrapInstace(testString);

// Different ways to call substring
const sub1 = wrapped.invokeMethod("substring", 3); // By name
const sub2 = wrapped.invokeMethod("substring(II)Ljava/lang/String;", 3, 8); // By signature

Chat.log(`Substring by name: ${sub1}`);
Chat.log(`Substring by signature: ${sub2}`);

// Call static methods
const stringClass = reflection.getWrappedClass("java.lang.String");
const.valueOf = stringClass.invokeMethod("valueOf", 123);
Chat.log(`String.valueOf(123): ${valueOf}`);
```

### Working with Collections
```js
// Advanced collection manipulation
const reflection = Fs.load("lib:FReflection.js");

// Create and manipulate ArrayList
const ArrayList = Java.type("java.util.ArrayList");
const list = new ArrayList();
const wrapped = reflection.wrapInstace(list);

// Add elements
wrapped.invokeMethod("add", "Item 1");
wrapped.invokeMethod("add", "Item 2");
wrapped.invokeMethod("add", "Item 3");

// Access internal storage
const elementData = wrapped.getFieldValue("elementData");
const size = wrapped.invokeMethod("size");

Chat.log(`Array capacity: ${elementData.length}`);
Chat.log(`Actual size: ${size}`);

// Use iterator
const iterator = wrapped.invokeMethod("iterator");
wrapped.invokeMethod("hasNext"); // Check if has next
const nextItem = wrapped.invokeMethod("next");
Chat.log(`Next item: ${nextItem}`);
```

### Class Hierarchy Exploration
```js
// Explore object hierarchy and methods
function exploreObject(obj, name) {
    const wrapped = reflection.wrapInstace(obj);
    Chat.log(`\n=== Exploring ${name} ===`);

    try {
        // Get basic info
        const rawClass = wrapped.getRawClass();
        Chat.log(`Class: ${rawClass.getName()}`);

        // Try some common Object methods
        const toString = wrapped.invokeMethod("toString");
        const hashCode = wrapped.invokeMethod("hashCode");

        Chat.log(`toString(): ${toString}`);
        Chat.log(`hashCode(): ${hashCode}`);

    } catch (e) {
        Chat.log(`Error exploring ${name}: ${e.message}`);
    }
}

// Explore different object types
exploreObject("Hello World", "String");
exploreObject(new java.util.ArrayList(), "ArrayList");
exploreObject(42, "Integer");
```

### Error Handling and Best Practices
```js
const reflection = Fs.load("lib:FReflection.js");

function safeInvoke(wrapped, methodName, ...params) {
    try {
        return wrapped.invokeMethod(methodName, ...params);
    } catch (e) {
        Chat.log(`Error invoking ${methodName}: ${e.message}`);
        return null;
    }
}

function safeGetField(wrapped, fieldName) {
    try {
        return wrapped.getFieldValue(fieldName);
    } catch (e) {
        Chat.log(`Error getting field ${fieldName}: ${e.message}`);
        return null;
    }
}

// Example usage with error handling
const list = new java.util.ArrayList();
const wrapped = reflection.wrapInstace(list);

// Safe method invocation
const result = safeInvoke(wrapped, "get", 0);
if (result !== null) {
    Chat.log(`Got result: ${result}`);
} else {
    Chat.log("Method failed gracefully");
}

// Safe field access
const capacity = safeGetField(wrapped, "elementData");
if (capacity !== null) {
    Chat.log(`Array length: ${capacity.length}`);
}
```

### Dynamic Method Discovery
```js
// Helper to try different method signatures
function tryMethod(wrapped, baseName, params) {
    const signatures = [
        // Simple name
        baseName,
        // Common overloaded signatures
        `${baseName}(${params.map(() => 'Ljava/lang/Object;').join('')})Ljava/lang/Object;`,
        `${baseName}(${params.map(() => 'Ljava/lang/Object;').join('')})V`,
        `${baseName}(I)Ljava/lang/Object;`,
        `${baseName}()Ljava/lang/Object;`,
        `${baseName}()V`
    ];

    for (const sig of signatures) {
        try {
            const result = wrapped.invokeMethod(sig, ...params);
            Chat.log(`Success with signature: ${sig}`);
            return result;
        } catch (e) {
            // Continue to next signature
        }
    }

    throw new Error(`No matching method found for ${baseName}`);
}

// Usage example
const list = new java.util.ArrayList();
const wrapped = reflection.wrapInstace(list);

try {
    wrapped.invokeMethod("add", "test");
    const result = tryMethod(wrapped, "get", [0]);
    Chat.log(`Got: ${result}`);
} catch (e) {
    Chat.log(`Failed: ${e.message}`);
}
```

---

## Important Notes and Considerations

### Performance Considerations
- Reflection operations are slower than direct method calls
- Cache `WrappedClassInstance` objects when possible to avoid repeated wrapping
- Method signature parsing has overhead; use method names when parameter types are unambiguous

### Security and Access
- Some methods and fields may be inaccessible due to Java security restrictions
- Private field access may not work in all environments
- Be cautious when modifying internal state of objects

### Error Handling
- Always wrap reflection calls in try-catch blocks
- Check for null returns which may indicate method failure
- Be prepared for `NoSuchMethodException` and `NoSuchFieldException`

### Version Compatibility
- Internal Minecraft class structures may change between versions
- Method signatures that work in one version may break in another
- Use reflection for exploration and debugging rather than core script logic

### Best Practices
- Use specific method signatures when dealing with overloaded methods
- Prefer direct API usage when helper classes are available
- Document reflection usage clearly for maintenance
- Test scripts thoroughly across different Minecraft versions

---

## Related Classes

- `FReflection` - Main library for creating `WrappedClassInstance` objects
- `BaseLibrary` - Base class for JSMacros libraries
- `Mappings` - Class for Minecraft obfuscation mappings
- Java reflection classes (`Class`, `Method`, `Field`)

---

## Version Information

- **Available Since:** JSMacros 1.6.5
- **Last Updated:** 1.6.5 (stable API)
- **Dependencies:** Java Reflection API
- **Thread Safety:** Not thread-safe; synchronize access if needed

This class provides powerful reflection capabilities but should be used with caution due to the inherent risks of runtime reflection and the potential for version compatibility issues.

