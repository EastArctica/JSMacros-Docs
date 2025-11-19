# ProxyBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ProxyBuilder`

**Extends:** `Object`

The `ProxyBuilder` class is a powerful utility for creating dynamic proxy objects that implement interfaces or extend classes at runtime. This class enables advanced scripting techniques by allowing developers to create objects with custom method implementations, intercept method calls, and provide custom behavior for existing interfaces or classes.

ProxyBuilder uses Javassist's ProxyFactory under the hood to generate proxy classes that can delegate method calls to custom handlers defined through MethodWrapper objects. This is particularly useful for creating mock objects, testing stubs, event listeners, or custom implementations of interfaces without writing explicit Java classes.

## Table of Contents

- [Constructors](#constructors)
- [Fields](#fields)
- [Methods](#methods)
- [Nested Classes](#nested-classes)
- [Usage Examples](#usage-examples)

---

## Constructors

### new ProxyBuilder(clazz, interfaces)
Creates a new ProxyBuilder for the specified class or interface.

```js
const builder = new ProxyBuilder(Runnable.class, []);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| clazz | `Class<T>` | The target class or interface to proxy |
| interfaces | `Class<?>[]` | Additional interfaces for the proxy to implement |

**Returns:** A new `ProxyBuilder<T>` instance

**Notes:**
- If `clazz` is an interface, it will be automatically added to the interfaces array
- If `clazz` is a concrete class, the proxy will extend it
- The proxy will implement all specified interfaces

**Example:**
```js
// Create a proxy builder for a simple interface
const builder = new ProxyBuilder(Runnable.class, []);

// Create a proxy builder that extends a class and implements interfaces
const complexBuilder = new ProxyBuilder(
    ArrayList.class,
    [List.class, Collection.class]
);
```

---

## Fields

## Methods

## Nested Classes

## Usage Examples

### Basic Interface Proxy

```js
// Create a simple Runnable proxy
const runnableBuilder = new ProxyBuilder(Runnable.class, []);

runnableBuilder.addMethod("run()V", JavaWrapper.methodToJava((ref, args) => {
    Chat.log("Proxy is running!");
    // Custom run implementation
}));

const proxyRunnable = runnableBuilder.buildInstance([]);

// Use the proxy
proxyRunnable.run(); // Outputs: "Proxy is running!"
```

### Custom Interface Implementation

```js
// Implement a custom interface on the fly
const customInterfaceBuilder = new ProxyBuilder(Object.class, [
    Java.type("java.util.function.Consumer")
]);

customInterfaceBuilder.addMethod("accept(Ljava/lang/Object;)V", JavaWrapper.methodToJava((ref, args) => {
    const value = args[0];
    Chat.log(`Processing value: ${value}`);

    // Custom processing logic
    if (value && value.toString) {
        Chat.log(`String representation: ${value.toString()}`);
    }
}));

const consumer = customInterfaceBuilder.buildInstance([]);
consumer.accept("Hello World!");
consumer.accept(12345);
```

### Extending Existing Classes

```js
// Extend ArrayList with custom behavior
const arrayListBuilder = new ProxyBuilder(Java.type("java.util.ArrayList"), []);

// Override toString method
arrayListBuilder.addMethod("toString()Ljava/lang/String;", JavaWrapper.methodToJava((ref, args) => {
    const originalResult = ref.parent ? ref.parent([]) : "[]";
    return `CustomArrayList: ${originalResult}`;
}));

// Override add method with logging
arrayListBuilder.addMethod("add(Ljava/lang/Object;)Z", JavaWrapper.methodToJava((ref, args) => {
    const item = args[0];
    Chat.log(`Adding item to list: ${item}`);

    // Call original add method
    return ref.parent ? ref.parent([item]) : false;
}));

// Override size method with custom behavior
arrayListBuilder.addMethod("size()I", JavaWrapper.methodToJava((ref, args) => {
    const originalSize = ref.parent ? ref.parent([]) : 0;
    Chat.log(`List size requested: ${originalSize}`);
    return originalSize;
}));

const customList = arrayListBuilder.buildInstance([]);
customList.add("Item 1");
customList.add("Item 2");
Chat.log(`List: ${customList.toString()}`);
Chat.log(`Size: ${customList.size()}`);
```

### Event Handler Proxy

```js
// Create a custom event handler that logs all method calls
const eventHandlerBuilder = new ProxyBuilder(Object.class, [
    Java.type("java.lang.Runnable"),
    Java.type("java.util.function.Consumer")
]);

// Default handler for all methods
eventHandlerBuilder.addMethod("accept", JavaWrapper.methodToJava((ref, args) => {
    Chat.log(`Event received: ${args.length} arguments`);
    args.forEach((arg, index) => {
        Chat.log(`  Arg ${index}: ${arg}`);
    });
}));

eventHandlerBuilder.addMethod("run()V", JavaWrapper.methodToJava((ref, args) => {
    Chat.log("Event handler triggered!");
}));

const handler = eventHandlerBuilder.buildInstance([]);

// Use as Runnable
handler.run();

// Use as Consumer
handler.accept("test event");
handler.accept({ type: "custom", data: 123 });
```

### Mock Object Creation

```js
// Create a mock for testing
const mockServiceBuilder = new ProxyBuilder(Object.class, [
    Java.type("java.util.function.Supplier"),
    Java.type("java.util.function.Function")
]);

let mockData = "Default mock data";

// Mock Supplier.get() method
mockServiceBuilder.addMethod("get()Ljava/lang/Object;", JavaWrapper.methodToJava((ref, args) => {
    Chat.log("Mock get() called");
    return mockData;
}));

// Mock Function.apply() method
mockServiceBuilder.addMethod("apply(Ljava/lang/Object;)Ljava/lang/Object;", JavaWrapper.methodToJava((ref, args) => {
    const input = args[0];
    Chat.log(`Mock function called with: ${input}`);
    return `Processed: ${input}`;
}));

// Method to update mock data
mockServiceBuilder.addMethod("setMockData(Ljava/lang/Object;)V", JavaWrapper.methodToJava((ref, args) => {
    mockData = args[0];
    Chat.log(`Mock data updated to: ${mockData}`);
}));

const mockService = mockServiceBuilder.buildInstance([]);

// Use the mock
const result1 = mockService.get();
Chat.log(`Result: ${result1}`);

const result2 = mockService.apply("test input");
Chat.log(`Function result: ${result2}`);

mockService.setMockData("New mock data");
const result3 = mockService.get();
Chat.log(`Updated result: ${result3}`);
```

### Advanced Proxy with Multiple Interfaces

```js
// Complex proxy implementing multiple interfaces with sophisticated behavior
class DatabaseServiceProxy {
    constructor() {
        this.data = new Map();
        this.queryCount = 0;

        const builder = new ProxyBuilder(Object.class, [
            Java.type("java.util.function.Function"),
            Java.type("java.util.function.Supplier"),
            Java.type("java.util.function.Consumer")
        ]);

        // Function interface - for queries
        builder.addMethod("apply(Ljava/lang/Object;)Ljava/lang/Object;",
            JavaWrapper.methodToJava((ref, args) => {
                const query = args[0];
                this.queryCount++;
                Chat.log(`Executing query #${this.queryCount}: ${query}`);

                if (this.data.has(query)) {
                    return this.data.get(query);
                }
                return `No result for query: ${query}`;
            })
        );

        // Supplier interface - for getting all data
        builder.addMethod("get()Ljava/lang/Object;",
            JavaWrapper.methodToJava((ref, args) => {
                Chat.log("Retrieving all data");
                return Array.from(this.data.entries());
            })
        );

        // Consumer interface - for storing data
        builder.addMethod("accept(Ljava/lang/Object;)V",
            JavaWrapper.methodToJava((ref, args) => {
                const data = args[0];
                if (data && typeof data === 'object') {
                    Chat.log("Storing data:", data);
                    for (const [key, value] of Object.entries(data)) {
                        this.data.set(key, value);
                    }
                }
            })
        );

        // Custom method for statistics
        builder.addMethod("getStatistics()Ljava/lang/String;",
            JavaWrapper.methodToJava((ref, args) => {
                return `Queries: ${this.queryCount}, Stored: ${this.data.size}`;
            })
        );

        this.proxy = builder.buildInstance([]);
    }

    getProxy() {
        return this.proxy;
    }
}

const dbProxy = new DatabaseServiceProxy();
const service = dbProxy.getProxy();

// Use as Consumer to store data
service.accept({ "user:123": "Alice", "user:456": "Bob" });
service.accept({ "product:789": "Widget" });

// Use as Function to query data
const result1 = service.apply("user:123");
Chat.log(`Query result: ${result1}`);

// Use as Supplier to get all data
const allData = service.get();
Chat.log(`All data: ${JSON.stringify(allData)}`);

// Custom statistics method
const stats = service.getStatistics();
Chat.log(`Service stats: ${stats}`);
```

### Error Handling in Proxies

```js
// Proxy with comprehensive error handling
const robustProxyBuilder = new ProxyBuilder(Object.class, [
    Java.type("java.util.function.Function")
]);

robustProxyBuilder.addMethod("apply(Ljava/lang/Object;)Ljava/lang/Object;",
    JavaWrapper.methodToJava((ref, args) => {
        try {
            const input = args[0];
            Chat.log(`Processing: ${input}`);

            // Simulate potential error
            if (input === null || input === undefined) {
                throw new Error("Input cannot be null or undefined");
            }

            if (typeof input === 'string' && input.includes("error")) {
                throw new Error(`Simulated error for input: ${input}`);
            }

            return `Processed: ${input}`;

        } catch (error) {
            Chat.log(`&cError in proxy method: ${error.message}`);
            return "Error: " + error.message;
        }
    })
);

const robustService = robustProxyBuilder.buildInstance([]);

// Test error handling
console.log(robustService.apply("test"));
console.log(robustService.apply(null));
console.log(robustService.apply("trigger error"));
```

---

## Performance Considerations

- **Method Resolution:** Method signatures are resolved at build time for optimal performance
- **Type Casting:** Automatic type casting is performed for primitive types and compatible number types
- **Memory Usage:** Each proxy class generates bytecode at runtime, which uses additional memory
- **Exception Handling:** Proxy methods handle exceptions and can rethrow them or return default values

## Best Practices

1. **Method Signatures:** Use specific method signatures rather than name-only handlers when multiple overloads exist
2. **Error Handling:** Always include proper error handling in proxy method implementations
3. **Type Safety:** Be explicit about parameter types when building instances to avoid type resolution issues
4. **Performance:** Cache proxy builders when creating multiple instances of the same proxy type
5. **Parent Calls:** Always check if `ref.parent` exists before calling it, as some methods may not have original implementations

## Version Information

- Available since JSMacros 1.6.0
- Built on Javassist ProxyFactory for robust proxy generation
- Supports both interface and class-based proxying
- Full JVM method signature support for precise method matching

## Related Classes

- `MethodWrapper` - Wrapper for JavaScript functions to be called from Java
- `JavaWrapper` - Utility class for creating method wrappers
- `ProxyFactory` - Javassist's underlying proxy factory
- `Class` - Java class reflection for type information
- `Method` - Java method reflection for method information

