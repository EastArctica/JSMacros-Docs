# PerExecLanguageLibrary

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.PerExecLanguageLibrary`

**Extends:** `BaseLibrary`

**Since:** `1.0.0`

A base abstract class for per-execution, per-language libraries in JsMacros. This class serves as the foundation for creating library implementations that are specific to both a particular script execution context and a particular language implementation.

The `PerExecLanguageLibrary` combines the characteristics of both per-execution and per-language libraries, meaning that a new instance is created for each script execution and each language type that supports it. This provides maximum isolation and language-specific functionality while still being tied to individual script contexts.

This class is part of JsMacros' library system architecture, which includes four main library types:
- `BaseLibrary` - Base class for all libraries
- `PerExecLibrary` - Libraries with one instance per script execution
- `PerLanguageLibrary` - Libraries with one instance per language type
- `PerExecLanguageLibrary` - Libraries with one instance per execution AND per language

## Class Purpose

The `PerExecLanguageLibrary` is designed for libraries that need:

1. **Execution Context Access**: Access to the specific script context (`T`) in which they are running
2. **Language Integration**: Knowledge of the specific language implementation (`Class<? extends BaseLanguage<U, T>>`) being used
3. **Instance Isolation**: A fresh instance for each script execution to prevent state contamination
4. **Language-Specific Behavior**: Different implementations or behavior based on the language being used

## Constructors

### PerExecLanguageLibrary(context, language)

**Internal Use Only**

This constructor is used internally by JsMacros' library system and should not be called directly from scripts. Instances of `PerExecLanguageLibrary` subclasses are automatically created by the `LibraryRegistry` when a script requires them.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| context | `T extends BaseScriptContext<U>` | The script execution context this library belongs to |
| language | `Class<? extends BaseLanguage<U, T>>` | The language class this library is associated with |

## Fields

### protected final ctx

The script execution context this library instance is bound to. This context provides access to script-specific information and functionality.

**Type:** `T extends BaseScriptContext<U>`

**Access:** `protected`

**Notes:**
- Each library instance has its own context reference
- Context provides access to triggering event, script file, and execution state
- Use this to access script-specific data or interact with the execution environment

### protected final language

The language class this library is associated with. This allows the library to adapt its behavior based on the specific language implementation being used.

**Type:** `Class<? extends BaseLanguage<U, T>>`

**Access:** `protected`

**Notes:**
- Enables language-specific optimizations or behavior
- Different language implementations may require different handling
- Common languages include GraalJS, JEP (JavaScript), Jython (Python), and LUA

## Library System Architecture

### Library Types Comparison

| Library Type | Instance Scope | Use Cases | Examples |
| ------------ | -------------- | --------- | --------- |
| `BaseLibrary` | Global (single instance) | Stateless utilities, constant data | - |
| `PerExecLibrary` | Per script execution | Script-specific state, context-bound operations | - |
| `PerLanguageLibrary` | Per language type | Language-specific optimizations, language bindings | - |
| `PerExecLanguageLibrary` | Per execution + per language | Maximum isolation, language-specific behavior per execution | `JavaWrapper/FWrapper` |

### Registration and Instantiation

Libraries extending `PerExecLanguageLibrary` are automatically discovered and registered through the `@Library` annotation:

```java
@Library(value = "MyLibrary", languages = GraalLanguageDefinition.class)
public class MyPerExecLanguageLibrary extends PerExecLanguageLibrary<Context, GraalScriptContext> {
    public MyPerExecLanguageLibrary(GraalScriptContext context, Class<? extends BaseLanguage<Context, GraalScriptContext>> language) {
        super(context, language);
    }

    // Library methods...
}
```

The library system automatically:
1. Discovers classes with the `@Library` annotation
2. Identifies them as `PerExecLanguageLibrary` implementations
3. Maps them to the specified language types
4. Creates new instances for each script execution using those languages

## Implementation Guidelines

### Creating a PerExecLanguageLibrary

When creating a library that extends `PerExecLanguageLibrary`, follow these patterns:

```java
@Library(value = "MyLanguageSpecificLib", languages = MyLanguageDefinition.class)
public class MyLanguageSpecificLibrary<U, T extends BaseScriptContext<U>> extends PerExecLanguageLibrary<U, T> {

    public MyLanguageSpecificLibrary(T context, Class<? extends BaseLanguage<U, T>> language) {
        super(context, language);
    }

    // Language-specific method
    public void languageSpecificOperation() {
        // Access context for script-specific data
        BaseEvent triggeringEvent = ctx.triggeringEvent;
        File scriptFile = ctx.mainFile;

        // Access language class for language-specific behavior
        String languageName = language.getSimpleName();

        // Perform operations that require both context and language knowledge
        Chat.log(`Running ${languageName} operation from script: ${scriptFile.getName()}`);
    }

    // Use context for script state management
    public void storeScriptData(String key, Object value) {
        // Store data in the script context for this execution
        ctx.context.getBindings("js").putMember(key, value);
    }
}
```

### Language-Specific Optimizations

Use the language field to provide language-specific optimizations:

```java
public Object processData(Object data) {
    // Different handling based on language
    if (language == GraalLanguageDefinition.class) {
        // GraalJS-specific optimization
        return graalOptimization(data);
    } else if (language == JythonLanguageDefinition.class) {
        // Python-specific optimization
        return pythonOptimization(data);
    } else {
        // Generic handling
        return genericOptimization(data);
    }
}
```

## Real-World Example: JavaWrapper/FWrapper

The most prominent example of `PerExecLanguageLibrary` usage is the `JavaWrapper` library (implemented as `FWrapper` in GraalJS):

```java
@Library(value = "JavaWrapper", languages = GraalLanguageDefinition.class)
public class FWrapper extends PerExecLanguageLibrary<Context, GraalScriptContext> implements IFWrapper<Value> {

    public FWrapper(GraalScriptContext ctx, Class<? extends BaseLanguage<Context, GraalScriptContext>> language) {
        super(ctx, language);
    }

    @Override
    public <A, B, R> MethodWrapper<A, B, R, GraalScriptContext> methodToJava(Value c) {
        // Language-specific method wrapping for GraalJS Value objects
        return new JSMethodWrapper<>(c, true, 5);
    }

    @Override
    public void deferCurrentTask() throws InterruptedException {
        // Context-specific task deferring
        ctx.wrapSleep(() -> {});
    }

    @Override
    public void stop() {
        // Context-specific cleanup
        ctx.closeContext();
    }
}
```

This demonstrates how `PerExecLanguageLibrary` enables:
- **Language Integration**: Handling of GraalJS `Value` objects
- **Context Management**: Access to script execution context for task management
- **Lifecycle Management**: Proper cleanup when scripts are stopped

## Usage in Scripts

While script developers don't directly instantiate `PerExecLanguageLibrary` subclasses, they interact with them through the global library variables provided by JsMacros:

```js
// Example: Using JavaWrapper (a PerExecLanguageLibrary implementation)
JavaWrapper.methodToJavaAsync((event) => {
    Chat.log(`Event: ${event.eventName}`);
    // This uses the per-execution, per-language JavaWrapper instance
}).accept(someEvent);
```

Each script execution gets its own instance of `JavaWrapper` that:
- Is specific to the language being used (GraalJS in this case)
- Has access to the current script's execution context
- Can manage language-specific resources and optimizations

## Key Benefits

1. **Maximum Isolation**: Each script execution has its own library instance, preventing state conflicts
2. **Language Optimization**: Libraries can optimize behavior for specific languages
3. **Context Integration**: Full access to script execution context and state
4. **Resource Management**: Proper cleanup and resource management per script execution
5. **Type Safety**: Generic parameters ensure type-safe language and context handling

## Considerations

- **Performance**: Creating instances per execution has overhead, so use only when necessary
- **Memory**: Each library instance consumes memory for the lifetime of the script execution
- **Complexity**: More complex than simpler library types due to the dual scope
- **Language Binding**: Libraries are tightly bound to specific language implementations

## Related Classes

- `BaseLibrary` - Base class for all library types
- `PerExecLibrary` - Per-execution libraries (without language binding)
- `PerLanguageLibrary` - Per-language libraries (without execution binding)
- `LibraryRegistry` - Manages library registration and instantiation
- `Library` - Annotation for library discovery and registration
- `BaseLanguage` - Base class for language implementations
- `BaseScriptContext` - Base class for script execution contexts

The `PerExecLanguageLibrary` class is a fundamental part of JsMacros' extensibility architecture, enabling language-specific, execution-scoped libraries that can provide optimal functionality for different script execution scenarios.