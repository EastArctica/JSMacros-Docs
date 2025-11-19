# ClassBuilder.MethodBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.MethodBuilder<T>`

**Extends:** None (builder class)

The `ClassBuilder.MethodBuilder` class is a specialized builder for creating and configuring methods within generated classes. This builder provides a fluent API for defining method signatures, parameters, return types, method bodies, annotations, and visibility modifiers, allowing you to create comprehensive method implementations.

MethodBuilder instances are obtained through the `addMethod()` methods of ClassBuilder and support both simple code-based method creation and advanced body building with mixed Java/JavaScript execution.

## Table of Contents

- [Obtaining a MethodBuilder](#obtaining-a-methodbuilder)
- [Code-Based Method Definition](#code-based-method-definition)
- [Body-Based Method Definition](#body-based-method-definition)
- [Annotation Support](#annotation-support)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Method Types and Patterns](#method-types-and-patterns)

---

## Obtaining a MethodBuilder

MethodBuilder instances are created through various `addMethod()` methods:

```javascript
// Method with return type only (parameterless)
const methodBuilder = classBuilder.addMethod(String, "getName");

// Method with return type and parameters
const methodBuilder = classBuilder.addMethod(int, "calculate", String, int, boolean);

// Void method
const methodBuilder = classBuilder.addMethod(void, "log", String);
```

---

## Code-Based Method Definition

### body(code)
```javascript
methodBuilder.body(`
    return "Hello, " + name + "! You are " + age + " years old.";
`);
```

Sets the method body using complete Java code.

**Parameters:**
1. `code: string` - Complete Java method body code

**Returns:** `MethodBuilder` - This builder for method chaining

**Notes:**
- Code should include the body only (not method signature)
- Can access method parameters by name
- Can reference instance fields using `this.`
- Can call other methods and constructors
- Must include return statements for non-void methods

**Since:** `1.8.4`

---

## Body-Based Method Definition

### buildBody()
```javascript
const bodyBuilder = methodBuilder.buildBody();
```

Creates a BodyBuilder for mixed Java/JavaScript method implementation.

**Returns:** `BodyBuilder<MethodBuilder>` - A body builder for advanced method creation

**Notes:**
- Enables combining Java bytecode with JavaScript execution
- Useful for complex method logic with conditional execution
- Allows dynamic behavior and runtime flexibility

### guestBody(methodWrapper)
```javascript
const wrapper = JavaWrapper.methodToJava((self, args) => {
    const input = args[0];
    const result = input.toUpperCase();
    Chat.log(`Processed: ${input} -> ${result}`);
    return result;
});

methodBuilder.guestBody(wrapper);
```

Sets the method body to execute JavaScript (Guest) code.

**Parameters:**
1. `methodWrapper: MethodWrapper` - JavaScript function to execute as method body

**Returns:** `MethodBuilder` - This builder for method chaining

**Notes:**
- JavaScript function receives method parameters as arguments array
- Can access and modify instance fields via the `self` parameter
- Can call JSMacros APIs for logging and interaction
- Return value must match method's return type

---

## Annotation Support

### addAnnotation(type)
```javascript
const annotationBuilder = methodBuilder.addAnnotation(MyMethodAnnotation.class);
```

Adds an annotation to the method.

**Parameters:**
1. `type: Class<?>` - The annotation type to add

**Returns:** `AnnotationBuilder<MethodBuilder>` - An annotation builder for configuration

**Example:**
```javascript
methodBuilder
    .addAnnotation(Override.class)
    .finish()
    .addAnnotation(MyMethodAnnotation.class)
        .putString("description", "Calculates user display name")
        .putString("version", "1.0")
        .finish()
    .body(`return this.name;`);
```

---

## Finalization

### finish()
```javascript
const parentBuilder = methodBuilder.finish();
```

Finalizes the method and returns to the parent ClassBuilder.

**Returns:** `ClassBuilder<T>` - The parent ClassBuilder instance

**Notes:**
- This method must be called to apply the method to the class
- After calling finish(), the method is finalized and the builder returns to the class context

---

## Usage Examples

### Simple Getter and Setter Methods
```javascript
const PersonClass = Reflection.createClassBuilder("com.example.Person", Object)
    .addField(String, "name").makePrivate().end()
    .addField(int, "age").makePrivate().end()
    .addField(boolean, "active").makePrivate().end()

    // Getter methods
    .addMethod(String, "getName")
    .body(`return this.name;`)
    .finish()
    .addMethod(int, "getAge")
    .body(`return this.age;`)
    .finish()
    .addMethod(boolean, "isActive")
    .body(`return this.active;`)
    .finish()

    // Setter methods
    .addMethod(void, "setName", String)
    .body(`this.name = name;`)
    .finish()
    .addMethod(void, "setAge", int)
    .body(`
        if (age >= 0) {
            this.age = age;
        }
    `)
    .finish()
    .addMethod(void, "setActive", boolean)
    .body(`this.active = active;`)
    .finish()
    .finishBuildAndFreeze();
```

### Method with Parameters and Logic
```javascript
const CalculatorClass = Reflection.createClassBuilder("com.example.Calculator", Object)
    .addField(double, "result").makePrivate().end()
    .addConstructor()
    .body(`this.result = 0.0;`)
    .finish()

    .addMethod(void, "add", double)
    .body(`this.result += value;`)
    .finish()
    .addMethod(void, "subtract", double)
    .body(`this.result -= value;`)
    .finish()
    .addMethod(void, "multiply", double)
    .body(`this.result *= value;`)
    .finish()
    .addMethod(void, "divide", double)
    .body(`
        if (value != 0.0) {
            this.result /= value;
        }
    `)
    .finish()
    .addMethod(double, "getResult)
    .body(`return this.result;`)
    .finish()
    .addMethod(void, "clear)
    .body(`this.result = 0.0;`)
    .finish()
    .finishBuildAndFreeze();
```

### Method with Annotations
```javascript
const AnnotatedMethodClass = Reflection.createClassBuilder("com.example.AnnotatedMethods", Object)
    .addMethod(String, "process", String)
    .addAnnotation(Override.class)
    .finish()
    .addAnnotation(MyMethodAnnotation.class)
        .putString("description", "Processes input string")
        .putString("version", "1.0")
        .putBoolean("cacheable", true)
        .finish()
    .addAnnotation(Deprecated.class)
        .putString("since", "1.5.0")
        .putString("removal", "2.0.0")
        .finish()
    .body(`
        if (input == null) {
            return null;
        }
        return input.trim().toUpperCase();
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Method with Guest Body (JavaScript)
```javascript
const JsMethodClass = Reflection.createClassBuilder("com.example.JsMethods", Object)
    .addField(Map, "cache").makePrivate().end()
    .addConstructor()
    .buildBody()
        .appendJavaCode("this.cache = new java.util.HashMap();")
        .finish()
    .finish()

    .addMethod(String, "getCachedOrCompute", String, String)
    .guestBody(JavaWrapper.methodToJava((self, args) => {
        const key = args[0];
        const defaultValue = args[1];

        // Check cache first
        if (self.cache.containsKey(key)) {
            return self.cache.get(key);
        }

        // Compute new value
        const computed = `${defaultValue}_${Date.now()}`;

        // Cache the result
        self.cache.put(key, computed);

        Chat.log(`Cached: ${key} -> ${computed}`);
        return computed;
    }))
    .finish()

    .addMethod(int, "getCacheSize)
    .guestBody(JavaWrapper.methodToJava((self, args) => {
        return self.cache.size();
    }))
    .finish()
    .finishBuildAndFreeze();
```

### Method with Mixed Java/JavaScript Body
```javascript
const MixedMethodClass = Reflection.createClassBuilder("com.example.MixedMethods", Object)
    .addField(List, "events").makePrivate().end()
    .addConstructor()
    .buildBody()
        .appendJavaCode("this.events = new java.util.ArrayList();")
        .finish()
    .finish()

    .addMethod(String, "processEvent", String, int)
    .buildBody()
        .appendJavaCode("// Java preprocessing")
        .appendJavaCode("if (event == null || event.trim().isEmpty()) {")
        .appendJavaCode("    throw new IllegalArgumentException(\"Event cannot be null or empty\");")
        .appendJavaCode("}")
        .appendJavaCode("")
        .appendJavaCode("String processedEvent = event.trim().toLowerCase();")
        .appendJavaCode("this.events.add(processedEvent);")
        .appendJavaCode("")
        .appendJavaCode("// JavaScript enhancement")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const event = args[0];
                const priority = args[1];

                // JavaScript processing
                const timestamp = Date.now();
                const id = Math.random().toString(36).substr(2, 9);

                // Priority-based logic
                if (priority >= 5) {
                    Chat.log(`HIGH PRIORITY EVENT: ${event}`);
                }

                return `${event}_${id}_${timestamp}`;
            }),
            "new Object[]{processedEvent, priority}",
            "String.class"
        )
        .appendJavaCode("")
        .appendJavaCode("// Java finalization")
        .appendJavaCode("return guestResult;")
        .finish()
    .finish()
    .finishBuildAndFreeze();
```

### Static Methods
```javascript
const UtilityClass = Reflection.createClassBuilder("com.example.Utilities", Object)
    .addMethod(String, "formatCurrency", double)
    .makeStatic()
    .body(`
        return String.format(\"$%.2f\", amount);
    `)
    .finish()
    .addMethod(boolean, "isValidEmail", String)
    .makeStatic()
    .body(`
        if (email == null) return false;
        return email.contains(\"@\") && email.contains(\".\");
    `)
    .finish()
    .addMethod(String, "generateId)
    .makeStatic()
    .buildBody()
        .appendJavaCode("long timestamp = System.currentTimeMillis();")
        .appendJavaCode("int random = (int) (Math.random() * 10000);")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const timestamp = args[0];
                const random = args[1];
                return `ID_${timestamp}_${random}`;
            }),
            "new Object[]{timestamp, random}",
            "String.class"
        )
        .finish()
    .finish()
    .finishBuildAndFreeze();
```

### Method with Exception Handling
```javascript
const SafeMethodClass = Reflection.createClassBuilder("com.example.SafeMethods", Object)
    .addField(String, "filePath").makePrivate().end()
    .addConstructor(String)
    .body(`this.filePath = filePath;`)
    .finish()

    .addMethod(String, "readFileContent)
    .addAnnotation(SuppressWarnings.class)
        .putArray("value")
            .putString("resource")
            .finish()
        .finish()
    .body(`
        try {
            java.io.File file = new java.io.File(this.filePath);
            if (!file.exists()) {
                throw new java.io.IOException("File not found: " + this.filePath);
            }

            java.io.FileReader reader = new java.io.FileReader(file);
            java.io.BufferedReader bufferedReader = new java.io.BufferedReader(reader);

            StringBuilder content = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                content.append(line).append("\\n");
            }

            bufferedReader.close();
            return content.toString();

        } catch (java.io.IOException e) {
            Chat.log("Error reading file: " + e.getMessage());
            return "";
        }
    `)
    .finish()

    .addMethod(boolean, "writeFileContent, String)
    .buildBody()
        .appendJavaCode("try {")
        .appendJavaCode("    java.io.File file = new java.io.File(this.filePath);")
        .appendJavaCode("    java.io.FileWriter writer = new java.io.FileWriter(file);")
        .appendJavaCode("    writer.write(content);")
        .appendJavaCode("    writer.close();")
        .appendJavaCode("    ")
        .appendJavaCode("    // JavaScript success handling")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const content = args[0];
                Chat.log(`Successfully wrote ${content.length} characters to file`);
                return true;
            }),
            "new Object[]{content}",
            "Boolean.class"
        )
        .appendJavaCode("    ")
        .appendJavaCode("    return guestResult;")
        .appendJavaCode("    ")
        .appendJavaCode("} catch (Exception e) {")
        .appendJavaCode("    Chat.log(\"Error writing file: \" + e.getMessage());")
        .appendJavaCode("    return false;")
        .appendJavaCode("}")
        .finish()
    .finish()
    .finishBuildAndFreeze();
```

### Method Overloading
```javascript
const OverloadedMethodsClass = Reflection.createClassBuilder("com.example.Overloaded", Object)
    .addField(String, "name").makePrivate().end()
    .addConstructor(String)
    .body(`this.name = name;`)
    .finish()

    // Overloaded greet methods
    .addMethod(String, "greet)
    .body(`return \"Hello, \" + this.name + \"!\";`)
    .finish()

    .addMethod(String, "greet", String)
    .body(`return \"Hello, \" + this.name + \" and \" + otherName + \"!\";`)
    .finish()

    .addMethod(String, "greet", String, String)
    .body(`return \"Hello, \" + this.name + \", \" + name1 + \" and \" + name2 + \"!\";`)
    .finish()

    // Overloaded calculate methods
    .addMethod(int, "calculate", int)
    .body(`return value * 2;`)
    .finish()

    .addMethod(int, "calculate", int, int)
    .body(`return a + b;`)
    .finish()

    .addMethod(int, "calculate", int, int, int)
    .body(`return a * b + c;`)
    .finish()

    .finishBuildAndFreeze();
```

### Recursive Methods
```javascript
const RecursiveMethodClass = Reflection.createClassBuilder("com.example.Recursive", Object)
    .addMethod(int, "factorial", int)
    .body(`
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    `)
    .finish()

    .addMethod(int, "fibonacci", int)
    .body(`
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    `)
    .finish()

    .addMethod(String, "reverseString, String)
    .body(`
        if (text == null || text.length() <= 1) {
            return text;
        }
        return reverseString(text.substring(1)) + text.charAt(0);
    `)
    .finish()
    .finishBuildAndFreeze();
```

---

## Method Types and Patterns

### Accessor Methods
- **Getters**: Return field values
- **Setters**: Modify field values
- **Boolean getters**: Use `is` prefix for boolean fields

### Utility Methods
- **Static methods**: Class-level utility functions
- **Helper methods**: Private methods for internal use
- **Factory methods**: Create instances of the class

### Business Logic Methods
- **Validation methods**: Check data validity
- **Processing methods**: Transform or manipulate data
- **Computation methods**: Perform calculations

### Lifecycle Methods
- **Initialization**: Setup logic in constructors
- **Cleanup**: Resource cleanup and finalization
- **Event handling**: Respond to various events

---

## Best Practices

1. **Method Naming**: Use clear, descriptive method names
2. **Parameter Validation**: Validate inputs early in methods
3. **Error Handling**: Handle exceptions gracefully
4. **Documentation**: Use annotations to document methods
5. **Single Responsibility**: Each method should do one thing well
6. **Performance**: Consider performance implications of method design

---

## Related Classes

- `ClassBuilder` - Main class builder that creates MethodBuilder instances
- `ClassBuilder.BodyBuilder` - Body builder for mixed Java/JavaScript method bodies
- `ClassBuilder.AnnotationBuilder` - Annotation builder for method annotations
- `JavaWrapper` - Utility for creating method wrappers for JavaScript method bodies

## Version Information

- Available since JSMacros 1.6.5
- Body building support added in 1.8.4
- Guest body support added in 1.8.4
- Enhanced annotation support added in 1.8.4

The MethodBuilder provides a comprehensive and flexible API for creating methods that can range from simple getters/setters to complex mixed-language implementations with full annotation support and error handling capabilities.