# ClassBuilder.ConstructorBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.ConstructorBuilder`

**Extends:** None (builder class)

The `ClassBuilder.ConstructorBuilder` class is a specialized builder for creating and configuring constructors within generated classes. This builder provides a fluent API for defining constructor parameters, method bodies, annotations, and visibility modifiers, allowing you to create comprehensive constructor implementations.

ConstructorBuilder instances are obtained through the `addConstructor()` methods of ClassBuilder and support both simple code-based constructor creation and advanced body building with mixed Java/JavaScript execution.

## Table of Contents

- [Obtaining a ConstructorBuilder](#obtaining-a-constructorbuilder)
- [Code-Based Constructor Definition](#code-based-constructor-definition)
- [Body-Based Constructor Definition](#body-based-constructor-definition)
- [Annotation Support](#annotation-support)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Constructor Types](#constructor-types)

---

## Obtaining a ConstructorBuilder

ConstructorBuilder instances are created through various `addConstructor()` methods:

```javascript
// Parameterless constructor
const constructorBuilder = classBuilder.addConstructor();

// Constructor with parameters
const constructorBuilder = classBuilder.addConstructor(String, int, boolean);

// Static initializer (class constructor)
const staticInitBuilder = classBuilder.addClinit();
```

---

## Code-Based Constructor Definition

### body(code)
```javascript
constructorBuilder.body(`
    this.name = name;
    this.age = age;
    this.initialized = true;
`);
```

Sets the constructor body using complete Java code.

**Parameters:**
1. `code: string` - Complete Java constructor body code

**Returns:** `ConstructorBuilder` - This builder for method chaining

**Notes:**
- Code should include the body only (not method signature)
- Can access constructor parameters by name
- Can reference instance fields using `this.`
- Can call superclass constructors with `super(...)`
- Can call other constructors with `this(...)`

**Since:** `1.8.4`

---

## Body-Based Constructor Definition

### buildBody()
```javascript
const bodyBuilder = constructorBuilder.buildBody();
```

Creates a BodyBuilder for mixed Java/JavaScript constructor implementation.

**Returns:** `BodyBuilder<ConstructorBuilder>` - A body builder for advanced constructor creation

**Notes:**
- Enables combining Java bytecode with JavaScript execution
- Useful for complex initialization logic
- Allows conditional execution and error handling

### guestBody(methodWrapper)
```javascript
const wrapper = JavaWrapper.methodToJava((self, args) => {
    const name = args[0];
    const age = args[1];
    Chat.log(`Creating object: ${name}, age ${age}`);
    return null;
});

constructorBuilder.guestBody(wrapper);
```

Sets the constructor body to execute JavaScript (Guest) code.

**Parameters:**
1. `methodWrapper: MethodWrapper` - JavaScript function to execute as constructor body

**Returns:** `ConstructorBuilder` - This builder for method chaining

**Notes:**
- JavaScript function receives constructor parameters as arguments
- Can access and modify instance fields via the `self` parameter
- Can call JSMacros APIs for logging and interaction
- Return value is ignored (constructors don't return values)

---

## Annotation Support

### addAnnotation(type)
```javascript
const annotationBuilder = constructorBuilder.addAnnotation(MyConstructorAnnotation.class);
```

Adds an annotation to the constructor.

**Parameters:**
1. `type: Class<?>` - The annotation type to add

**Returns:** `AnnotationBuilder<ConstructorBuilder>` - An annotation builder for configuration

**Example:**
```javascript
constructorBuilder
    .addAnnotation(ConstructorProperties.class)
        .putArray("value")
            .putString("name")
            .putString("age")
            .finish()
        .finish()
    .body(`
        this.name = name;
        this.age = age;
    `);
```

---

## Finalization

### finish()
```javascript
const parentBuilder = constructorBuilder.finish();
```

Finalizes the constructor and returns to the parent ClassBuilder.

**Returns:** `ClassBuilder<T>` - The parent ClassBuilder instance

**Notes:**
- This method must be called to apply the constructor to the class
- After calling finish(), the constructor is finalized and the builder returns to the class context

---

## Usage Examples

### Simple Default Constructor
```javascript
const SimpleClass = Reflection.createClassBuilder("com.example.Simple", Object)
    .addField(String, "name").makePrivate().end()
    .addField(int, "age").makePrivate().end()
    .addConstructor()
    .body(`
        this.name = "Unknown";
        this.age = 0;
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Parameterized Constructor
```javascript
const PersonClass = Reflection.createClassBuilder("com.example.Person", Object)
    .addField(String, "name").makePrivate().end()
    .addField(int, "age").makePrivate().end()
    .addField(boolean, "active").makePrivate().end()
    .addConstructor(String, int)
    .body(`
        this.name = name;
        this.age = age;
        this.active = true;
    `)
    .finish()
    .addConstructor(String, int, boolean)
    .body(`
        this.name = name;
        this.age = age;
        this.active = active;
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Constructor with Superclass Call
```javascript
const ExtendedClass = Reflection.createClassBuilder("com.example.Extended", ArrayList)
    .addField(String, "identifier").makePrivate().end()
    .addConstructor(String)
    .body(`
        super();  // Call ArrayList default constructor
        this.identifier = identifier;
    `)
    .finish()
    .addConstructor(String, int)
    .body(`
        super(initialCapacity);  // Call ArrayList(int) constructor
        this.identifier = identifier;
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Constructor Chaining
```javascript
const ChainedClass = Reflection.createClassBuilder("com.example.Chained", Object)
    .addField(String, "name").makePrivate().end()
    .addField(int, "age").makePrivate().end()
    .addField(String, "department").makePrivate().end()
    .addConstructor()
    .body(`
        this("Default", 0);  // Call other constructor
    `)
    .finish()
    .addConstructor(String, int)
    .body(`
        this(name, age, "Unassigned");  // Call main constructor
    `)
    .finish()
    .addConstructor(String, int, String)
    .body(`
        this.name = name;
        this.age = age;
        this.department = department;
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Constructor with Annotations
```javascript
const AnnotatedConstructorClass = Reflection.createClassBuilder("com.example.Annotated", Object)
    .addField(String, "value").makePrivate().end()
    .addField(int, "count").makePrivate().end()
    .addConstructor(String, int)
    .addAnnotation(ConstructorProperties.class)
        .putArray("value")
            .putString("value")
            .putString("count")
            .finish()
        .finish()
    .addAnnotation(Deprecated.class)
        .putString("since", "1.5.0")
        .finish()
    .body(`
        this.value = value;
        this.count = count;
        Chat.log("Constructor called with: " + value + ", " + count);
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Constructor with Guest Body (JavaScript)
```javascript
const JsConstructorClass = Reflection.createClassBuilder("com.example.JsConstructor", Object)
    .addField(String, "id").makePrivate().end()
    .addField(long, "timestamp").makePrivate().end()
    .addConstructor(String)
    .guestBody(JavaWrapper.methodToJava((self, args) => {
        const id = args[0];
        self.id = id;
        self.timestamp = Date.now();

        Chat.log(`Created instance with ID: ${id} at ${self.timestamp}`);

        // Additional JavaScript initialization logic
        if (id.startsWith("admin")) {
            Chat.log("Admin instance created");
        }
    }))
    .finish()
    .finishBuildAndFreeze();
```

### Constructor with Mixed Java/JavaScript Body
```javascript
const MixedConstructorClass = Reflection.createClassBuilder("com.example.MixedConstructor", Object)
    .addField(String, "username").makePrivate().end()
    .addField(int, "accessLevel").makePrivate().end()
    .addField(boolean, "initialized").makePrivate().end()
    .addConstructor(String, int)
    .buildBody()
        .appendJavaCode("// Java initialization")
        .appendJavaCode("this.username = username;")
        .appendJavaCode("this.accessLevel = accessLevel;")
        .appendJavaCode("this.initialized = false;")
        .appendJavaCode("")
        .appendJavaCode("// JavaScript validation and enhancement")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const username = args[0];
                const accessLevel = args[1];

                // JavaScript validation
                if (username.length < 3) {
                    throw new Error("Username must be at least 3 characters");
                }

                // JavaScript initialization
                self.initialized = true;

                // Access level based logic
                if (accessLevel >= 5) {
                    Chat.log(`Admin user created: ${username}`);
                } else {
                    Chat.log(`Regular user created: ${username}`);
                }

                return null;
            }),
            "new Object[]{username, accessLevel}",
            null
        )
        .finish()
    .finish()
    .finishBuildAndFreeze();
```

### Static Initializer (Class Constructor)
```javascript
const StaticInitClass = Reflection.createClassBuilder("com.example.StaticInit", Object)
    .addField(static, String, "VERSION").makePrivate().end()
    .addField(static, Map, "registry").makePrivate().end()
    .addConstructor(String)
    .body(`
        this.name = name;
    `)
    .finish()
    .addClinit()  // Static initializer
    .body(`
        // Initialize static fields
        VERSION = "1.0.0";
        registry = new java.util.HashMap();

        // Register default values
        registry.put("default", "DEFAULT_VALUE");
        registry.put("system", "SYSTEM_VALUE");

        Chat.log("StaticInit class initialized");
    `)
    .finish()
    .finishBuildAndFreeze();
```

### Complex Constructor with Error Handling
```javascript
const RobustConstructorClass = Reflection.createClassBuilder("com.example.RobustConstructor", Object)
    .addField(String, "configPath").makePrivate().end()
    .addField(Properties, "config").makePrivate().end()
    .addField(boolean, "configLoaded").makePrivate().end()
    .addConstructor(String)
    .buildBody()
        .appendJavaCode("try {")
        .appendJavaCode("    this.configPath = configPath;")
        .appendJavaCode("    this.config = new java.util.Properties();")
        .appendJavaCode("    ")
        .appendJavaCode("    // Load configuration file")
        .appendJavaCode("    java.io.FileInputStream fis = new java.io.FileInputStream(configPath);")
        .appendJavaCode("    this.config.load(fis);")
        .appendJavaCode("    fis.close();")
        .appendJavaCode("    ")
        .appendJavaCode("    this.configLoaded = true;")
        .appendJavaCode("    Chat.log(\"Configuration loaded from: \" + configPath);")
        .appendJavaCode("    ")
        .appendJavaCode("} catch (Exception e) {")
        .appendJavaCode("    this.configLoaded = false;")
        .appendJavaCode("    Chat.log(\"Failed to load configuration: \" + e.getMessage());")
        .appendJavaCode("}")
        .appendJavaCode("")
        .appendJavaCode("// JavaScript fallback configuration")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                if (!self.configLoaded) {
                    Chat.log("Using fallback configuration");
                    self.config.put("fallback", "true");
                    self.config.put("timeout", "30000");
                    self.config.put("retries", "3");

                    Chat.log("Fallback configuration applied");
                }
                return null;
            }),
            "null",
            null
        )
        .finish()
    .finish()
    .finishBuildAndFreeze();
```

---

## Constructor Types

### Instance Constructors
- Regular constructors for creating object instances
- Can have parameters and perform instance initialization
- Must call `this()` or `super()` as the first statement if chaining

### Default Constructor
- Parameterless constructor that initializes default values
- Often used in combination with parameterized constructors

### Static Initializer
- Executed once when the class is loaded
- Used for static field initialization
- Obtained through `addClinit()` instead of `addConstructor()`

### Constructor Overloading
- Multiple constructors with different parameter lists
- Enables flexible object creation patterns
- Can use constructor chaining to avoid code duplication

---

## Best Practices

1. **Parameter Validation**: Validate constructor parameters early
2. **Initialization Order**: Initialize fields in a logical order
3. **Exception Handling**: Handle potential errors gracefully
4. **Documentation**: Use annotations to document constructor parameters
5. **Performance**: Minimize heavy operations in constructors
6. **Immutability**: Consider making objects immutable where possible

---

## Related Classes

- `ClassBuilder` - Main class builder that creates ConstructorBuilder instances
- `ClassBuilder.BodyBuilder` - Body builder for mixed Java/JavaScript constructor bodies
- `ClassBuilder.AnnotationBuilder` - Annotation builder for constructor annotations
- `JavaWrapper` - Utility for creating method wrappers for JavaScript constructor bodies

## Version Information

- Available since JSMacros 1.6.5
- Body building support added in 1.8.4
- Guest body support added in 1.8.4
- Annotation support enhanced in 1.8.4

The ConstructorBuilder provides a comprehensive and flexible API for creating constructors that can range from simple initializers to complex mixed-language implementations with full annotation support and error handling capabilities.