# ClassBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder`

**Extends:** None (builder class)

The `ClassBuilder` class is an advanced runtime bytecode generation utility that allows you to create entirely new Java classes dynamically within JSMacros scripts. This powerful tool uses Javassist to generate bytecode at runtime, enabling the creation of custom classes with fields, methods, constructors, and annotations.

ClassBuilder is the cornerstone of advanced JSMacros scripting, allowing you to create custom data structures, implement interfaces, extend existing classes, and build sophisticated object-oriented solutions entirely within your scripts. The generated classes are fully compatible with Java's type system and can be used anywhere a regular Java class would be expected.

This class is typically obtained through the `Reflection.createClassBuilder()` method and provides a fluent builder API for constructing classes programmatically.

## Table of Contents

- [Constructors](#constructors)
- [Field Management](#field-management)
- [Method Management](#method-management)
- [Constructor Management](#constructor-management)
- [Annotation Management](#annotation-management)
- [Class Finalization](#class-finalization)
- [Nested Classes](#nested-classes)
  - [ClassBuilder.FieldBuilder](#classbuilderfieldbuilder)
  - [ClassBuilder.MethodBuilder](#classbuildermethodbuilder)
  - [ClassBuilder.ConstructorBuilder](#classbuilderconstructorbuilder)
  - [ClassBuilder.AnnotationBuilder](#classbuilderannotationbuilder)
  - [ClassBuilder.BodyBuilder](#classbuilderbodybuilder)
- [Usage Examples](#usage-examples)
- [Advanced Patterns](#advanced-patterns)
- [Performance Considerations](#performance-considerations)

---

## Constructors

ClassBuilder instances are not created directly. Use the `Reflection.createClassBuilder()` method:

```javascript
const classBuilder = Reflection.createClassBuilder(
    "com.example.MyClass",        // Class name
    Object,                       // Parent class (can be null)
    [Runnable, Comparable]        // Interfaces to implement
);
```

## Field Management

### addField(fieldType, name)
```javascript
const fieldBuilder = classBuilder.addField(String, "username");
```

Creates a field builder for adding a field to the class.

**Parameters:**
1. `fieldType: Class<?>` - The type of the field
2. `name: string` - The name of the field

**Returns:** `FieldBuilder` - A field builder for configuring the field

### addField(code)
```javascript
// Simple field
classBuilder.addField("private int count;");

// Field with initialization
classBuilder.addField("public static final String VERSION = \"1.0\";");

// Complex field with custom initialization
classBuilder.addField("private final Map<String, Object> cache = new ConcurrentHashMap<>();");
```

Adds a field using complete Java field declaration code.

**Parameters:**
1. `code: string` - Complete Java field declaration including visibility, type, name, and optional initialization

**Returns:** `ClassBuilder<T>` - This builder for method chaining

**Since:** `1.8.4`

**Notes:**
- Generic types are not supported and must be explicitly cast in source code
- Annotations are not supported in code-based field creation
- Classes from `java.lang` package don't need fully qualified names

## Method Management

### addMethod(code)
```javascript
// Simple method
classBuilder.addMethod("public void clear() { this.items.clear(); }");

// Method with parameters
classBuilder.addMethod(`
    public String formatMessage(String prefix, int level) {
        return "[" + level + "] " + prefix + ": " + this.message;
    }
`);

// Static method
classBuilder.addMethod(`
    public static MyClass createDefault() {
        return new MyClass("Default", 0);
    }
`);
```

Adds a method using complete Java method declaration code.

**Parameters:**
1. `code: string` - Complete Java method declaration including visibility, return type, name, and parameters

**Returns:** `ClassBuilder<T>` - This builder for method chaining

**Since:** `1.8.4`

**Notes:**
- Generic types are not supported for return values or parameters
- Varargs cannot be used
- Annotations are not supported in code-based method creation

## Constructor Management

### addConstructor(code)
```javascript
// Default constructor
classBuilder.addConstructor("public MyClass() { this.name = \"Unknown\"; }");

// Parameterized constructor
classBuilder.addConstructor(`
    public MyClass(String name, int value) {
        this.name = name;
        this.value = value;
    }
`);

// Constructor with super() call
classBuilder.addConstructor(`
    public MyClass(String name, int value, String other) {
        super(name, value);
        this.other = other;
    }
`);
```

Adds a constructor using complete Java constructor declaration code.

**Parameters:**
1. `code: string` - Complete Java constructor declaration

**Returns:** `ClassBuilder<T>` - This builder for method chaining

**Since:** `1.8.4`

**Notes:**
- Generic types are not supported for constructor parameters
- For easy instantiation, constructor visibility should be public

### addClinit()
```javascript
const staticInitializer = classBuilder.addClinit();
```

Creates a builder for the static initialization block of the class.

**Returns:** `ConstructorBuilder` - A constructor builder for the static initializer

---

## Annotation Management

### addAnnotation(type)
```javascript
const annotationBuilder = classBuilder.addAnnotation(Deprecated.class);
```

Creates an annotation builder for adding class-level annotations.

**Parameters:**
1. `type: Class<?>` - The annotation type to add

**Returns:** `AnnotationBuilder<ClassBuilder<T>>` - An annotation builder for configuring the annotation

**Example:**
```javascript
const Deprecated = Packages.java.lang.Deprecated;
const SuppressWarnings = Packages.java.lang.SuppressWarnings;

classBuilder
    .addAnnotation(Deprecated.class)
    .putString("since", "1.5.0")
    .finish()
    .addAnnotation(SuppressWarnings.class)
    .putArray("value")
        .putString("unchecked")
        .putString("rawtypes")
        .finish()
    .finish();
```

---

## Class Finalization

### finishBuildAndFreeze()
```javascript
const MyCustomClass = classBuilder.finishBuildAndFreeze();
const instance = MyCustomClass.newInstance();
```

Compiles the class definition and returns the final Class object. After this method is called, the class is frozen and cannot be modified further.

**Returns:** `Class<? extends T>` - The compiled class that extends the specified type

**Throws:**
- `CannotCompileException` - If there are compilation errors
- `NotFoundException` - If referenced classes cannot be found

**Notes:**
- This method must be called to create the actual Class object
- The generated class will extend the specified parent class and implement all specified interfaces
- The class is loaded into a special proxy package within JsMacros

---

## Nested Classes

The ClassBuilder system includes several specialized builder classes for different aspects of class creation:

### [ClassBuilder.AnnotationBuilder](ClassBuilder.AnnotationBuilder.md)
Builder for adding and configuring annotations on classes, methods, fields, and constructors.

**Key Features:**
- Set primitive and object annotation properties
- Support for enum and class properties
- Array property creation through AnnotationArrayBuilder
- Nested annotation support

### [ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder](ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder.md)
Specialized builder for creating array properties within annotations.

**Key Features:**
- Support for all Java primitive types
- String, Class, and enum array elements
- Type-safe array construction
- Empty array support

### [ClassBuilder.BodyBuilder](ClassBuilder.BodyBuilder.md)
Advanced builder for creating method bodies that combine Java bytecode with JavaScript execution.

**Key Features:**
- Mixed Java/JavaScript method implementation
- Context switching between compiled and runtime code
- Conditional JavaScript execution
- Error handling across language boundaries

### [ClassBuilder.ConstructorBuilder](ClassBuilder.ConstructorBuilder.md)
Builder for creating constructors with parameters, annotations, and complex initialization logic.

**Key Features:**
- Parameterized constructors
- Constructor chaining with `this()` and `super()`
- Static initializers (class constructors)
- Mixed Java/JavaScript constructor bodies

### [ClassBuilder.FieldBuilder](ClassBuilder.FieldBuilder.md)
Builder for creating fields with various modifiers, visibility, and initialization values.

**Key Features:**
- Visibility control (public, private, protected)
- Access modifiers (static, final, volatile, transient)
- Complex field initialization
- Field-level annotation support

### [ClassBuilder.FieldBuilder.FieldInitializerBuilder](ClassBuilder.FieldBuilder.FieldInitializerBuilder.md)
Specialized builder for creating complex field initialization expressions.

**Key Features:**
- Multi-line initialization code
- Method calls and object construction
- Mathematical computations
- Exception handling in initialization

### [ClassBuilder.MethodBuilder](ClassBuilder.MethodBuilder.md)
Builder for creating methods with parameters, return types, annotations, and implementation logic.

**Key Features:**
- Method overloading support
- Static and instance methods
- Mixed Java/JavaScript method bodies
- Exception handling and validation
- Method-level annotations

---

## Usage Examples

### Basic Class Creation
```javascript
// Create a simple data class
const PersonClass = Reflection.createClassBuilder("com.example.Person", Object)
    .addField(String, "name").makePrivate().end()
    .addField(int, "age").makePrivate().end()
    .addConstructor(String, int).body(`
        this.name = name;
        this.age = age;
    `)
    .addMethod(String, "getName").body(`return this.name;`)
    .addMethod(int, "getAge").body(`return this.age;`)
    .addMethod(String, "toString").body(`
        return "Person{name='" + name + "', age=" + age + "}";
    `)
    .finishBuildAndFreeze();

// Use the class
const person = PersonClass.newInstance("Alice", 30);
Chat.log(person.toString()); // Person{name='Alice', age=30}
```

### Interface Implementation
```javascript
// Create a Runnable implementation
const CustomRunnableClass = Reflection.createClassBuilder("com.example.CustomTask", Object, [Runnable])
    .addField(String, "taskName").makePrivate().end()
    .addConstructor(String).body(`this.taskName = taskName;`)
    .addMethod(void, "run").body(`
        Chat.log("Executing task: " + this.taskName);
        // Custom task logic here
    `)
    .finishBuildAndFreeze();

// Use as Runnable
const runnable = CustomRunnableClass.newInstance("MyTask");
const Thread = Reflection.getClass("java.lang.Thread");
const thread = Thread.newInstance(runnable);
thread.start();
```

### Class Extension with Override
```javascript
// Extend ArrayList with custom behavior
const CustomListClass = Reflection.createClassBuilder("com.example.CustomList", ArrayList)
    .addField(int, "accessCount").makePrivate().end()
    .addConstructor().body(`
        super();
        this.accessCount = 0;
    `)
    .addMethod(Object, "get", int).body(`
        this.accessCount++;
        Chat.log("Access count: " + this.accessCount);
        return super.get(index);
    `)
    .addMethod(int, "getAccessCount").body(`return this.accessCount;`)
    .finishBuildAndFreeze();

const customList = CustomListClass.newInstance();
customList.add("Hello");
customList.add("World");
Chat.log(customList.get(0)); // Triggers access count
Chat.log("Total accesses: " + customList.getAccessCount());
```

### Script Integration with GuestBody
```javascript
// Create a class with script-integrated methods
const ScriptedClass = Reflection.createClassBuilder("com.example.Scripted", Object)
    .addMethod(String, "process", String).guestBody(JavaWrapper.methodToJava((self, args) => {
        const input = args[0];
        // Use script functions and variables
        return input.toUpperCase() + " [PROCESSED]";
    }))
    .addMethod(void, "log", String, int).guestBody(JavaWrapper.methodToJava((self, args) => {
        const message = args[0];
        const level = args[1];
        const levels = ["INFO", "WARN", "ERROR"];
        Chat.log(`[${levels[level] || "UNKNOWN"}] ${message}`);
    }))
    .finishBuildAndFreeze();

const instance = ScriptedClass.newInstance();
Chat.log(instance.process("hello world")); // HELLO WORLD [PROCESSED]
instance.log("Test message", 1); // [WARN] Test message
```

### Complex BodyBuilder Usage
```javascript
// Create a method with mixed Java and script logic
const AdvancedClass = Reflection.createClassBuilder("com.example.Advanced", Object)
    .addField(Map, "cache").makePrivate().end()
    .addConstructor().body(`
        this.cache = new java.util.HashMap();
    `)
    .addMethod(Object, "getCached", Object, Object).buildBody()
        .appendJavaCode("Object result = this.cache.get(key);")
        .appendJavaCode("if (result == null) {")
        .appendJavaCode("    result = ")
        .appendGuestCode(
            JavaWrapper.methodToJava((self, args) => {
                const key = args[0];
                const value = args[1];
                Chat.log(`Computing new value for key: ${key}`);
                return `Computed for ${key}: ${value}`;
            }),
            "new Object[]{key, defaultValue}",
            null
        )
        .appendJavaCode("    this.cache.put(key, result);")
        .appendJavaCode("}")
        .appendJavaCode("return result;")
        .finish()
    .finishBuildAndFreeze();

const instance = AdvancedClass.newInstance();
Chat.log(instance.getCached("test", "value")); // Computes and caches
Chat.log(instance.getCached("test", "value")); // Returns cached value
```

### Annotations and Metadata
```javascript
// Create a class with extensive annotations
const AnnotatedClass = Reflection.createClassBuilder("com.example.Annotated", Object)
    .addAnnotation(Deprecated.class)
        .putString("since", "1.0.0")
        .finish()
    .addAnnotation(SuppressWarnings.class)
        .putArray("value")
            .putString("unchecked")
            .putString("deprecation")
            .finish()
        .finish()
    .addField(String, "value")
        .addAnnotation(MyAnnotation.class)
            .putString("description", "Important field")
            .putInt("priority", 1)
            .finish()
        .end()
    .addMethod(String, "getValue")
        .addAnnotation(Override.class)
        .body(`return this.value;`)
    .finishBuildAndFreeze();
```

---

## Advanced Patterns

### Factory Pattern Implementation
```javascript
// Create a factory class
const LoggerFactory = Reflection.createClassBuilder("com.example.LoggerFactory", Object)
    .addMethod(Object, "createLogger", String).body(`
        return new Logger(name);
    `)
    .addMethod(Object, "createDefaultLogger").body(`
        return new Logger("Default");
    `)
    .finishBuildAndFreeze();

// Also create the Logger class
const Logger = Reflection.createClassBuilder("com.example.Logger", Object)
    .addField(String, "name").makePrivate().end()
    .addField(List, "entries").makePrivate().end()
    .addConstructor(String).body(`
        this.name = name;
        this.entries = new java.util.ArrayList();
    `)
    .addMethod(void, "log", String).body(`
        synchronized(this.entries) {
            this.entries.add(System.currentTimeMillis() + ": " + message);
        }
        Chat.log("[" + this.name + "] " + message);
    `)
    .addMethod(List, "getEntries").body(`return this.entries;`)
    .finishBuildAndFreeze();

// Usage
const factory = LoggerFactory.newInstance();
const logger = factory.createLogger("MyApp");
logger.log("Application started");
logger.log("Initialized successfully");
```

### Dynamic Plugin System
```javascript
// Create a plugin interface and loader
class PluginSystem {
    constructor() {
        this.createPluginInterface();
        this.createPluginLoader();
    }

    createPluginInterface() {
        this.PluginInterface = Reflection.createClassBuilder("com.example.Plugin", Object)
            .addMethod(String, "getName").body(`
                throw new UnsupportedOperationException("Plugin must implement getName");
            `)
            .addMethod(String, "getVersion").body(`
                throw new UnsupportedOperationException("Plugin must implement getVersion");
            `)
            .addMethod(void, "initialize").body(`
                // Default empty implementation
            `)
            .addMethod(void, "execute").body(`
                throw new UnsupportedOperationException("Plugin must implement execute");
            `)
            .finishBuildAndFreeze();
    }

    createPluginLoader() {
        this.PluginLoader = Reflection.createClassBuilder("com.example.PluginLoader", Object)
            .addField(Map, "plugins").makePrivate().end()
            .addConstructor().body(`
                this.plugins = new java.util.HashMap();
            `)
            .addMethod(void, "loadPlugin", String).guestBody(JavaWrapper.methodToJava((self, args) => {
                const pluginName = args[0];
                Chat.log(`Loading plugin: ${pluginName}`);
                // Here you would load plugin configuration and create plugin instances
                const plugin = this.createScriptedPlugin(pluginName);
                self.plugins.put(pluginName, plugin);
                plugin.initialize();
                plugin.execute();
            }))
            .addMethod(Object, "getPlugin", String).body(`
                return this.plugins.get(name);
            `)
            .finishBuildAndFreeze();
    }

    createScriptedPlugin(name) {
        return Reflection.createClassBuilder(`com.example.plugins.${name}`, this.PluginInterface)
            .addField(String, "pluginName").makePrivate().end()
            .addConstructor().body(`this.pluginName = "${name}";`)
            .addMethod(String, "getName").body(`return this.pluginName;`)
            .addMethod(String, "getVersion").body(`return "1.0.0";`)
            .addMethod(void, "execute").guestBody(JavaWrapper.methodToJava((self, args) => {
                Chat.log(`Executing plugin: ${self.pluginName}`);
                // Plugin-specific execution logic would go here
            }))
            .finishBuildAndFreeze()
            .newInstance();
    }
}

// Usage
const pluginSystem = new PluginSystem();
const loader = pluginSystem.PluginLoader.newInstance();
loader.loadPlugin("MyCustomPlugin");
```

### Event-Driven Architecture
```javascript
// Create an event system
const EventBus = Reflection.createClassBuilder("com.example.EventBus", Object)
    .addField(Map, "listeners").makePrivate().end()
    .addConstructor().body(`
        this.listeners = new java.util.concurrent.ConcurrentHashMap();
    `)
    .addMethod(void, "subscribe", Class, Object).body(`
        java.util.List<Object> eventListeners = this.listeners.get(eventType);
        if (eventListeners == null) {
            eventListeners = new java.util.ArrayList();
            this.listeners.put(eventType, eventListeners);
        }
        eventListeners.add(listener);
    `)
    .addMethod(void, "publish", Object).body(`
        java.util.List<Object> eventListeners = this.listeners.get(event.getClass());
        if (eventListeners != null) {
            for (Object listener : eventListeners) {
                try {
                    listener.getClass().getMethod("handle", event.getClass()).invoke(listener, event);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    `)
    .finishBuildAndFreeze();

// Create a sample event
const DataEvent = Reflection.createClassBuilder("com.example.DataEvent", Object)
    .addField(String, "data").makePrivate().end()
    .addField(long, "timestamp").makePrivate().end()
    .addConstructor(String).body(`
        this.data = data;
        this.timestamp = System.currentTimeMillis();
    `)
    .addMethod(String, "getData").body(`return this.data;`)
    .addMethod(long, "getTimestamp").body(`return this.timestamp;`)
    .finishBuildAndFreeze();

// Usage
const eventBus = EventBus.newInstance();
const event = DataEvent.newInstance("Hello World");

// Subscribe and publish would be done through the event bus
```

---

## Performance Considerations

### Class Loading
- Generated classes are loaded into a special proxy package and remain in memory
- Avoid creating excessive numbers of similar classes - reuse existing ones when possible
- Consider using object pooling for frequently created instances

### Compilation Time
- Complex classes with many methods and fields take longer to compile
- Use code-based field/method creation for simple cases instead of builders when possible
- Cache frequently used class definitions rather than rebuilding them

### Memory Usage
- Each generated class consumes permanent generation (metaspace) memory
- Large numbers of unique classes can impact garbage collection performance
- Monitor memory usage when creating classes dynamically in loops

### Best Practices
1. **Reuse Class Objects**: Create classes once and instantiate multiple times
2. **Keep Classes Simple**: Avoid overly complex class hierarchies
3. **Prefer Composition over Inheritance**: Use interfaces and composition where possible
4. **Validate Before Building**: Check for errors early to avoid compilation failures
5. **Document Generated Classes**: Use meaningful names and annotations

### Debugging Tips
- Use the `finishBuildAndFreeze()` exception messages to identify compilation errors
- Enable verbose logging to see generated bytecode details
- Test complex class creation in isolation before integrating into larger systems
- Use reflection to inspect generated classes and verify structure

---

## Related Classes

- `Reflection` - Main entry point for creating ClassBuilder instances
- `MethodWrapper` - For integrating script functions with generated methods
- `ProxyBuilder` - Simpler alternative for interface implementation and class proxying
- `JavaWrapper` - Utility for creating method wrappers from JavaScript functions
- `Annotation` - Java annotation support and metadata handling

## Version Information

- Available since JSMacros 1.6.5
- Enhanced with nested builder patterns in 1.8.4
- Guest method body integration added in 1.8.4
- Annotation array support added in 1.8.4
- BodyBuilder for mixed Java/script implementations added in 1.8.4

The ClassBuilder system represents one of JSMacros' most powerful features, enabling developers to create sophisticated, type-safe, high-performance solutions that seamlessly integrate Java bytecode generation with JavaScript scripting capabilities.











