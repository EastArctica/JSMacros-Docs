# PerLanguageLibrary

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.PerLanguageLibrary`

**Extends:** `BaseLibrary`

**Since:** `1.0.0`

An abstract base class for libraries that are specific to particular scripting languages in JsMacros. This class serves as a foundation for creating library implementations that provide functionality tailored to specific languages (like JavaScript) while being available across the JsMacros system.

`PerLanguageLibrary` instances are created once per language type and shared across all scripts using that language. This makes them ideal for storing language-specific utilities, helpers, or state that should persist between script executions but be isolated between different language types.

## Table of Contents
- [Class Purpose](#class-purpose)
- [Library Lifecycle](#library-lifecycle)
- [Usage Patterns](#usage-patterns)
- [Comparison with Other Library Types](#comparison-with-other-library-types)
- [Implementation Examples](#implementation-examples)

---

## Class Purpose

The `PerLanguageLibrary` class is designed to:

1. **Provide language-specific functionality** - Libraries that need to expose different APIs or behavior based on the scripting language being used
2. **Share state across scripts** - Maintain shared state between different scripts running in the same language
3. **Optimize resource usage** - Avoid recreating language-specific resources for each script execution
4. **Enable language extensions** - Allow for language-specific optimizations or helper methods

### Key Characteristics

- **Abstract class** - Cannot be instantiated directly, must be extended by concrete implementations
- **Language binding** - Each instance is associated with a specific `BaseLanguage` implementation
- **Single instance per language** - Only one instance is created for each language type in the JsMacros runtime
- **Persistent state** - Maintains state across multiple script executions within the same language

---

## Library Lifecycle

### Registration

PerLanguageLibrary implementations are automatically discovered and registered during JsMacros startup:

```java
@Library("myLanguageLib")
@LanguageImplementation(JavascriptLanguage.class)
public class MyLanguageLibrary extends PerLanguageLibrary {
    public MyLanguageLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }
}
```

### Instantiation

The JsMacros library registry creates instances:

1. **Discovery** - Classes extending `PerLanguageLibrary` with `@Library` annotation are found
2. **Language filtering** - Only instances for available/compatible languages are created
3. **Single instantiation** - One instance per language type is created and stored
4. **Script access** - Instances are made available to scripts through the global variable specified in `@Library`

### Availability

```js
// In a JavaScript script
const lib = myLanguageLib; // Available as global variable
```

---

## Usage Patterns

### Language-Specific Utilities

Create libraries that provide utilities specific to a language's strengths:

```java
@Library("jsUtils")
public class JavaScriptUtilsLibrary extends PerLanguageLibrary {

    public JavaScriptUtilsLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }

    // JavaScript-specific helper methods
    public String formatTemplate(String template, Object... args) {
        // JavaScript-specific template formatting
        return String.format(template, args);
    }

    public Object parseJSON(String json) {
        // Use JavaScript's JSON parsing if available
        return JSON.parse(json);
    }
}
```

### State Management

Maintain shared state between scripts:

```java
@Library("sharedState")
public class SharedStateLibrary extends PerLanguageLibrary {
    private final Map<String, Object> sharedData = new ConcurrentHashMap<>();

    public SharedStateLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }

    public void set(String key, Object value) {
        sharedData.put(key, value);
    }

    public Object get(String key) {
        return sharedData.get(key);
    }
}
```

### Language Integration

Provide language-specific integration points:

```java
@Library("jsIntegration")
public class JavaScriptIntegrationLibrary extends PerLanguageLibrary {

    public JavaScriptIntegrationLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }

    public void executeAsync(String code) {
        // Execute code in JavaScript event loop
        CompletableFuture.runAsync(() -> {
            evaluate(code);
        });
    }
}
```

---

## Comparison with Other Library Types

### BaseLibrary

```java
// Single instance shared across ALL languages and scripts
public class GlobalLibrary extends BaseLibrary {
    // Global state and functionality
}
```

**Use when:**
- Functionality should be identical for all languages
- State needs to be shared across all scripts
- No language-specific behavior required

### PerLanguageLibrary

```java
// One instance per language type
public class LanguageSpecificLibrary extends PerLanguageLibrary {
    private final Class<? extends BaseLanguage<?, ?>> language;

    public LanguageSpecificLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }
}
```

**Use when:**
- Different behavior needed per language
- State should be shared within a language but isolated between languages
- Language-specific optimizations or utilities required

### PerExecLibrary

```java
// New instance for each script execution
public class ScriptLibrary extends PerExecLibrary {
    private final BaseScriptContext<?> context;

    public ScriptLibrary(BaseScriptContext<?> context) {
        super(context);
    }
}
```

**Use when:**
- Each script needs its own isolated state
- Library depends on script context
- No sharing between script executions desired

### PerExecLanguageLibrary

```java
// New instance per script execution AND language
public class ScriptLanguageLibrary extends PerExecLanguageLibrary<U, T> {
    private final T context;
    private final Class<? extends BaseLanguage<U, T>> language;
}
```

**Use when:**
- Both script-specific and language-specific behavior needed
- Maximum isolation required
- Complex library requiring both context and language information

---

## Implementation Examples

### Basic Implementation

```java
@Library("math")
public class MathLibrary extends PerLanguageLibrary {

    public MathLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }

    // Language-optimized math operations
    public double optimizedSqrt(double value) {
        // Could use language-specific optimizations
        return Math.sqrt(value);
    }

    public boolean isCompatible(String operation) {
        // Check if operation is supported by this language
        return getSupportedOperations().contains(operation);
    }

    private Set<String> getSupportedOperations() {
        // Return language-specific supported operations
        return Set.of("sqrt", "pow", "log", "sin", "cos", "tan");
    }
}
```

### Advanced Implementation with Language Detection

```java
@Library("langDetect")
public class LanguageDetectionLibrary extends PerLanguageLibrary {

    public LanguageDetectionLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }

    public String getLanguageName() {
        return language.getSimpleName();
    }

    public boolean isJavaScript() {
        return "JavaScriptLanguage".equals(language.getSimpleName());
    }

    public boolean isPython() {
        return "PythonLanguage".equals(language.getSimpleName());
    }

    public Object evaluateLanguageSpecific(String code) {
        if (isJavaScript()) {
            // JavaScript-specific evaluation
            return evaluateJS(code);
        } else if (isPython()) {
            // Python-specific evaluation
            return evaluatePython(code);
        }
        throw new UnsupportedOperationException("Unsupported language: " + getLanguageName());
    }

    private Object evaluateJS(String code) {
        // JavaScript evaluation implementation
        return null;
    }

    private Object evaluatePython(String code) {
        // Python evaluation implementation
        return null;
    }
}
```

### Integration with Existing APIs

```java
@Library("chatExt")
public class ChatExtensionLibrary extends PerLanguageLibrary {

    public ChatExtensionLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
    }

    public void logWithFormatting(String message, String... formats) {
        if (isJavaScript()) {
            // Use JavaScript template literals or formatting
            Chat.log(formatJSMessage(message, formats));
        } else {
            // Fallback to standard formatting
            Chat.logf(message, Arrays.asList(formats));
        }
    }

    public void createInteractivePrompt(String question, Callback callback) {
        if (supportsPrompts()) {
            // Language-specific prompt implementation
            showPrompt(question, callback);
        } else {
            // Fallback to simple chat input
            Chat.log(question + " (Use chat command to respond)");
        }
    }

    private String formatJSMessage(String template, String... args) {
        // JavaScript-specific string formatting
        String result = template;
        for (int i = 0; i < args.length; i++) {
            result = result.replace("${" + i + "}", args[i]);
        }
        return result;
    }

    private boolean supportsPrompts() {
        // Check if language supports interactive prompts
        return isJavaScript();
    }

    private void showPrompt(String question, Callback callback) {
        // Language-specific prompt implementation
    }
}
```

---

## Best Practices

### When to Use PerLanguageLibrary

**Good candidates:**
- Language-specific utilities or helpers
- Shared state within a language
- Language optimizations
- Integration with language-specific features

**Poor candidates:**
- Global functionality identical across all languages (use `BaseLibrary`)
- Per-script isolated state (use `PerExecLibrary`)
- Simple utility functions (consider static methods)

### Design Considerations

1. **Thread Safety** - Since instances are shared, ensure thread safety if accessed concurrently
2. **Memory Usage** - Be mindful of storing large amounts of shared data
3. **Language Isolation** - Don't leak language-specific dependencies to other languages
4. **Error Handling** - Handle cases where required language features aren't available

### Performance Tips

```java
// Cache expensive operations
public class CachedLibrary extends PerLanguageLibrary {
    private volatile Map<String, Object> cache = new HashMap<>();

    public CachedLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
        // Pre-initialize language-specific resources
        initializeResources();
    }

    private void initializeResources() {
        // Load language-specific resources once
    }
}
```

---

## Conclusion

The `PerLanguageLibrary` class provides a powerful foundation for creating language-specific functionality in JsMacros while maintaining clean separation between different scripting languages. By understanding when and how to use this class, developers can create libraries that leverage the unique strengths of each language while providing consistent interfaces across the JsMacros ecosystem.

When designing libraries, carefully consider whether functionality should be global, per-language, per-execution, or a combination of these approaches to ensure the most appropriate and efficient implementation.