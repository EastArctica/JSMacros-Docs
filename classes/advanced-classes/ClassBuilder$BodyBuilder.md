# ClassBuilder.BodyBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.BodyBuilder<T>`

**Extends:** None (builder class)

The `ClassBuilder.BodyBuilder` class is an advanced builder for creating method bodies that combine Java bytecode with JavaScript (Guest) code. This powerful tool enables seamless integration between compiled Java code and runtime JavaScript execution, allowing you to build sophisticated methods with mixed execution contexts.

BodyBuilder instances are obtained through the `buildBody()` method of MethodBuilder or ConstructorBuilder and provide a fluent API for constructing method bodies that can execute both Java code and JavaScript functions within the same method implementation.

## Table of Contents

- [Obtaining a BodyBuilder](#obtaining-a-bodybuilder)
- [Code Injection Methods](#code-injection-methods)
- [Guest Code Integration](#guest-code-integration)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)

---

## Obtaining a BodyBuilder

BodyBuilder instances are created through the buildBody() method of MethodBuilder or ConstructorBuilder:

```javascript
// For methods
const bodyBuilder = methodBuilder.buildBody();

// For constructors
const bodyBuilder = constructorBuilder.buildBody();
```

---

## Code Injection Methods

### appendJavaCode(code)
```javascript
bodyBuilder.appendJavaCode("int result = this.calculate();");
bodyBuilder.appendJavaCode("if (result > 0) {");
bodyBuilder.appendJavaCode("    Chat.log(\"Positive result: \" + result);");
bodyBuilder.appendJavaCode("}");
```

Appends Java bytecode code to the method body.

**Parameters:**
1. `code: string` - The Java code to append

**Returns:** `BodyBuilder<T>` - This builder for method chaining

**Notes:**
- Code is appended in the order specified
- Java code can access fields, parameters, and local variables
- Standard Java syntax and semantics apply
- Variables declared in one Java code block are accessible in subsequent blocks

### appendGuestCode(methodWrapper, parameterCode, returnCode)
```javascript
const wrapper = JavaWrapper.methodToJava((self, args) => {
    const value = args[0];
    return value.toUpperCase();
});

bodyBuilder.appendGuestCode(
    wrapper,
    "new Object[]{input}",           // Parameters to pass to JavaScript
    "String.class"                   // Return type casting
);
```

Appends JavaScript (Guest) code that will be executed at runtime.

**Parameters:**
1. `methodWrapper: MethodWrapper` - JavaScript function wrapped for Java execution
2. `parameterCode: string` - Java code that creates Object[] parameter array
3. `returnCode: string` - Java code for return type casting (can be null)

**Returns:** `BodyBuilder<T>` - This builder for method chaining

**Notes:**
- Guest code executes in JavaScript context at method runtime
- Parameters are passed as Object[] to the JavaScript function
- Return value is automatically cast to the specified type if provided
- Guest code can access JSMacros APIs (Chat, World, etc.)

---

## Finalization

### finish()
```javascript
const parentBuilder = bodyBuilder.finish();
```

Finalizes the method body and returns to the parent builder.

**Returns:** `T` - The parent builder (MethodBuilder or ConstructorBuilder)

**Notes:**
- This method must be called to compile and apply the method body
- After calling finish(), the method body is finalized and the builder returns to the parent context
- The method/constructor may need to be finalized again with its own finish() call

---

## Usage Examples

### Simple Mixed Java and JavaScript
```javascript
// Create a method with mixed Java and JavaScript logic
const MyMixedClass = Reflection.createClassBuilder("com.example.Mixed", Object)
    .addField(String, "message").makePrivate().end()
    .addField(int, "count").makePrivate().end()
    .addConstructor(String, int)
    .buildBody()
        .appendJavaCode("this.message = message;")
        .appendJavaCode("this.count = count;")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                Chat.log(`Initialized with message: ${self.message}`);
                return null;
            }),
            "null",
            null
        )
        .finish()
    .addMethod(String, "formatMessage", String)
    .buildBody()
        .appendJavaCode("String javaResult = \"[\" + this.count + \"] \" + this.message;")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const prefix = args[0];
                return `${prefix} - ${self.message} (${self.count})`;
            }),
            "new Object[]{javaResult}",
            "String.class"
        )
        .appendJavaCode("return guestResult;")
        .finish()
    .finishBuildAndFreeze();
```

### Data Processing with JavaScript Enhancement
```javascript
// Create a data processing method with JavaScript enhancement
const DataProcessor = Reflection.createClassBuilder("com.example.DataProcessor", Object)
    .addField(Map, "cache").makePrivate().end()
    .addConstructor()
    .buildBody()
        .appendJavaCode("this.cache = new java.util.HashMap();")
        .finish()
    .addMethod(String, "process", String, Object)
    .buildBody()
        .appendJavaCode("Object cached = this.cache.get(key);")
        .appendJavaCode("if (cached != null) {")
        .appendJavaCode("    return (String) cached;")
        .appendJavaCode("}")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const key = args[0];
                const data = args[1];

                // JavaScript processing
                const processed = `PROCESSED_${key}_${Date.now()}`;

                // Cache the result
                self.cache.put(key, processed);

                Chat.log(`Processed and cached: ${key} -> ${processed}`);
                return processed;
            }),
            "new Object[]{key, data}",
            "String.class"
        )
        .appendJavaCode("return guestResult;")
        .finish()
    .finishBuildAndFreeze();
```

### Error Handling with JavaScript
```javascript
// Create a method with error handling in JavaScript
const RobustMethod = Reflection.createClassBuilder("com.example.Robust", Object)
    .addMethod(String, "safeOperation", String, int)
    .buildBody()
        .appendJavaCode("try {")
        .appendJavaCode("    // Java pre-processing")
        .appendJavaCode("    if (input == null) {")
        .appendJavaCode("        throw new IllegalArgumentException(\"Input cannot be null\");")
        .appendJavaCode("    }")
        .appendJavaCode("    ")
        .appendJavaCode("    // Call JavaScript for main processing")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const input = args[0];
                const multiplier = args[1];

                try {
                    // JavaScript processing with error handling
                    const result = `${input}_${multiplier}_${Math.random()}`;
                    Chat.log(`Successfully processed: ${result}`);
                    return result;
                } catch (error) {
                    Chat.log(`JavaScript processing failed: ${error.message}`);
                    throw error; // Re-throw to be caught by Java
                }
            }),
            "new Object[]{input, multiplier}",
            "String.class"
        )
        .appendJavaCode("    ")
        .appendJavaCode("    return guestResult;")
        .appendJavaCode("} catch (Exception e) {")
        .appendJavaCode("    // Java error handling")
        .appendJavaCode("    Chat.log(\"Error in safeOperation: \" + e.getMessage());")
        .appendJavaCode("    return \"ERROR_FALLBACK\";")
        .appendJavaCode("}")
        .finish()
    .finishBuildAndFreeze();
```

### Complex State Management
```javascript
// Create a method with complex state management
const StatefulClass = Reflection.createClassBuilder("com.example.Stateful", Object)
    .addField(List, "history").makePrivate().end()
    .addField(Map, "counters").makePrivate().end()
    .addConstructor()
    .buildBody()
        .appendJavaCode("this.history = new java.util.ArrayList();")
        .appendJavaCode("this.counters = new java.util.HashMap();")
        .finish()
    .addMethod(void, "updateState", String, int)
    .buildBody()
        .appendJavaCode("// Java state update")
        .appendJavaCode("this.history.add(\"Operation: \" + operation);")
        .appendJavaCode("Integer currentCount = (Integer) this.counters.get(operation);")
        .appendJavaCode("int newCount = (currentCount != null ? currentCount : 0) + value;")
        .appendJavaCode("this.counters.put(operation, newCount);")
        .appendJavaCode("")
        .appendJavaCode("// JavaScript for complex logic")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const operation = args[0];
                const value = args[1];

                // Complex JavaScript logic
                const totalOperations = self.history.size();
                const operationCount = self.counters.get(operation) || 0;

                if (totalOperations % 10 === 0) {
                    Chat.log(`Milestone reached! ${totalOperations} operations completed.`);
                }

                if (operationCount > 5) {
                    Chat.log(`High-frequency operation: ${operation} called ${operationCount} times`);
                }

                // Trigger special behavior for certain operations
                if (operation === "RESET" && operationCount === 1) {
                    self.counters.clear();
                    self.history.clear();
                    Chat.log("System reset performed");
                }

                return null;
            }),
            "new Object[]{operation, value}",
            null
        )
        .finish()
    .addMethod(Map, "getStatistics")
    .buildBody()
        .appendJavaCode("Map<String, Object> stats = new java.util.HashMap();")
        .appendJavaCode("stats.putAll(this.counters);")
        .appendJavaCode("stats.put(\"totalOperations\", this.history.size());")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                // Add JavaScript-computed statistics
                const totalOps = self.history.size();
                const uniqueOps = self.counters.size();

                args[0].put("uniqueOperations", uniqueOps);
                args[0].put("averageFrequency", totalOps / Math.max(uniqueOps, 1));

                return null;
            }),
            "new Object[]{stats}",
            null
        )
        .appendJavaCode("return stats;")
        .finish()
    .finishBuildAndFreeze();
```

### Asynchronous JavaScript Integration
```javascript
// Create a method that handles asynchronous JavaScript operations
const AsyncProcessor = Reflection.createClassBuilder("com.example.AsyncProcessor", Object)
    .addMethod(String, "processAsync", String)
    .buildBody()
        .appendJavaCode("// Java setup")
        .appendJavaCode("final String finalInput = input;")
        .appendJavaCode("final java.util.concurrent.CompletableFuture<String> future = ")
        .appendJavaCode("    new java.util.concurrent.CompletableFuture<>();")
        .appendJavaCode("")
        .appendJavaCode("// JavaScript async processing")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const input = args[0];

                // Simulate async operation with setTimeout
                setTimeout(() => {
                    const result = `ASYNC_${input}_${Date.now()}`;

                    // In real async scenarios, you'd need a callback mechanism
                    // For this example, we'll just log the result
                    Chat.log(`Async processing completed: ${result}`);

                    // Note: This is a simplified example
                    // Real async integration would require more complex bridging
                }, 100);

                return "PROCESSING_STARTED";
            }),
            "new Object[]{finalInput}",
            "String.class"
        )
        .appendJavaCode("")
        .appendJavaCode("// Return immediate response")
        .appendJavaCode("return guestResult;")
        .finish()
    .finishBuildAndFreeze();
```

---

## Advanced Patterns

### Conditional JavaScript Execution
```javascript
// Method that conditionally executes JavaScript based on Java conditions
const ConditionalMethod = Reflection.createClassBuilder("com.example.Conditional", Object)
    .addField(boolean, "enableJs").makePrivate().end()
    .addConstructor(boolean)
    .buildBody()
        .appendJavaCode("this.enableJs = enableJs;")
        .finish()
    .addMethod(String, "conditionalProcess", String)
    .buildBody()
        .appendJavaCode("if (this.enableJs) {")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const input = args[0];
                return `JS_PROCESSED_${input.toUpperCase()}`;
            }),
            "new Object[]{input}",
            "String.class"
        )
        .appendJavaCode("} else {")
        .appendJavaCode("    // Java-only processing")
        .appendJavaCode("    return \"JAVA_PROCESSED_\" + input;")
        .appendJavaCode("}")
        .finish()
    .finishBuildAndFreeze();
```

### Multi-Step Processing Pipeline
```javascript
// Create a processing pipeline with multiple Java and JavaScript steps
const PipelineProcessor = Reflection.createClassBuilder("com.example.Pipeline", Object)
    .addMethod(String, "processPipeline", String)
    .buildBody()
        // Step 1: Java validation
        .appendJavaCode("if (data == null || data.trim().isEmpty()) {")
        .appendJavaCode("    throw new IllegalArgumentException(\"Data cannot be null or empty\");")
        .appendJavaCode("}")
        .appendJavaCode("")
        // Step 2: JavaScript preprocessing
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const data = args[0];
                // JavaScript preprocessing
                return data.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
            }),
            "new Object[]{data}",
            "String.class"
        )
        .appendJavaCode("")
        // Step 3: Java transformation
        .appendJavaCode("String javaProcessed = \"PIPE_\" + guestResult;")
        .appendJavaCode("")
        // Step 4: JavaScript postprocessing
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const data = args[0];
                // JavaScript postprocessing
                const hash = data.split('').reduce((acc, char) => {
                    return ((acc << 5) - acc) + char.charCodeAt(0) & 0xffffffff;
                }, 0);
                return `${data}_${Math.abs(hash)}`;
            }),
            "new Object[]{javaProcessed}",
            "String.class"
        )
        .appendJavaCode("")
        // Step 5: Java finalization
        .appendJavaCode("return \"FINAL_\" + guestResult;")
        .finish()
    .finishBuildAndFreeze();
```

---

## Performance Considerations

### Execution Context Switching
- Each call to `appendGuestCode()` creates a context switch between Java and JavaScript
- Minimize the number of context switches for better performance
- Group related JavaScript operations together when possible

### Memory Usage
- JavaScript closures maintain references to Java objects
- Be careful with object lifetimes in long-running processes
- Clean up unnecessary references to prevent memory leaks

### Error Handling
- JavaScript exceptions can be caught in Java try-catch blocks
- Implement proper error handling at both Java and JavaScript levels
- Log errors appropriately for debugging

### Best Practices
1. **Minimize Context Switching**: Group related operations
2. **Validate Parameters Early**: Use Java for parameter validation
3. **Use JavaScript for Complex Logic**: Leverage JavaScript's dynamic capabilities
4. **Implement Proper Error Handling**: Handle exceptions at both levels
5. **Consider Performance**: Balance between Java performance and JavaScript flexibility

---

## Related Classes

- `ClassBuilder.MethodBuilder` - Method builder that creates BodyBuilder instances
- `ClassBuilder.ConstructorBuilder` - Constructor builder that creates BodyBuilder instances
- `JavaWrapper` - Utility for creating method wrappers from JavaScript functions
- `MethodWrapper` - Wrapper for JavaScript functions that can be called from Java

## Version Information

- Available since JSMacros 1.8.4
- Part of the advanced bytecode generation system

The BodyBuilder represents one of the most powerful features of the ClassBuilder system, enabling seamless integration between compiled Java bytecode and dynamic JavaScript execution, creating unprecedented flexibility in runtime code generation and execution.