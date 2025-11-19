# PerExecLibrary

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.PerExecLibrary`

**Extends:** `BaseLibrary`

**Since:** `1.0.0`

An abstract base class for libraries that are instantiated per script execution in JsMacros. This class serves as the foundation for creating library implementations that maintain isolated state for each script execution while having access to the current script context.

`PerExecLibrary` instances are created fresh for each script execution and destroyed when the script finishes. This makes them ideal for libraries that need to maintain script-specific state, access script context information, or provide isolated functionality that shouldn't be shared between different script executions.

## Table of Contents
- [Class Purpose](#class-purpose)
- [Library Lifecycle](#library-lifecycle)
- [Usage Patterns](#usage-patterns)
- [Comparison with Other Library Types](#comparison-with-other-library-types)
- [Implementation Examples](#implementation-examples)
- [Built-in PerExecLibrary Examples](#built-in-perexeclibrary-examples)

---

## Class Purpose

The `PerExecLibrary` class is designed to:

1. **Provide per-execution isolation** - Each script execution gets its own library instance
2. **Access script context** - Libraries have access to the current script's execution context
3. **Maintain script-specific state** - State is isolated between different script executions
4. **Enable context-aware functionality** - Libraries can access script metadata and execution information

### Key Characteristics

- **Abstract class** - Cannot be instantiated directly, must be extended by concrete implementations
- **Context binding** - Each instance is associated with a specific `BaseScriptContext`
- **Per-execution lifecycle** - New instances are created for each script execution
- **Isolated state** - State is not shared between different script executions
- **Context access** - Full access to script context including trigger information, file paths, etc.

## Fields

### `ctx`

The script context associated with this library instance. This provides access to information about the current script execution, including the trigger that started the script, script file information, and execution context.

**Type:** `BaseScriptContext<?>`

**Protected:** Yes

---

## Constructors

### `PerExecLibrary(BaseScriptContext<?> context)`

Creates a new PerExecLibrary instance with the specified script context.

**Parameters:**
| Parameter | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| context   | BaseScriptContext<?>    | The script context for this library instance |

**Protected Constructor:** Yes

---

## Library Lifecycle

### Registration

PerExecLibrary implementations are automatically discovered and registered during JsMacros startup:

```java
@Library("myScriptLib")
public class MyScriptLibrary extends PerExecLibrary {
    public MyScriptLibrary(BaseScriptContext<?> context) {
        super(context);
    }
}
```

### Instantiation

The JsMacros library registry creates instances for each script execution:

1. **Discovery** - Classes extending `PerExecLibrary` with `@Library` annotation are found
2. **Per-execution creation** - New instances are created for each script execution
3. **Context binding** - Each instance receives the current script's context
4. **Script access** - Instances are made available to scripts through the global variable specified in `@Library`
5. **Cleanup** - Instances are garbage collected when script execution completes

### Availability

```js
// In any script - this will be a fresh instance
const lib = myScriptLib; // Available as global variable
```

---

## Usage Patterns

### Context-Aware Libraries

Create libraries that use script context information:

```java
@Library("scriptInfo")
public class ScriptInfoLibrary extends PerExecLibrary {

    public ScriptInfoLibrary(BaseScriptContext<?> context) {
        super(context);
    }

    public String getScriptName() {
        return ctx.getTriggerName();
    }

    public String getScriptPath() {
        return ctx.getContainedFolder().getAbsolutePath();
    }

    public String getEventType() {
        return ctx.getTriggeringEvent().getClass().getSimpleName();
    }

    public long getExecutionTime() {
        return ctx.getExecTime();
    }
}
```

### Script-Specific State Management

Maintain isolated state for each script execution:

```java
@Library("scriptState")
public class ScriptStateLibrary extends PerExecLibrary {
    private final Map<String, Object> state = new HashMap<>();
    private final long startTime;

    public ScriptStateLibrary(BaseScriptContext<?> context) {
        super(context);
        this.startTime = System.currentTimeMillis();
    }

    public void set(String key, Object value) {
        state.put(key, value);
    }

    public Object get(String key) {
        return state.get(key);
    }

    public long getUptime() {
        return System.currentTimeMillis() - startTime;
    }

    public Map<String, Object> getAllState() {
        return new HashMap<>(state);
    }
}
```

### File-Relative Operations

Perform file operations relative to the script's location:

```java
@Library("scriptFiles")
public class ScriptFilesLibrary extends PerExecLibrary {

    public ScriptFilesLibrary(BaseScriptContext<?> context) {
        super(context);
    }

    public String[] listFiles() {
        return ctx.getContainedFolder().list();
    }

    public boolean exists(String relativePath) {
        return ctx.getContainedFolder().toPath()
                .resolve(relativePath).toFile().exists();
    }

    public String readConfig(String fileName) throws IOException {
        File configFile = ctx.getContainedFolder().toPath()
                .resolve(fileName).toFile();
        return Files.readString(configFile.toPath());
    }

    public void writeLog(String message) throws IOException {
        File logFile = ctx.getContainedFolder().toPath()
                .resolve("script.log").toFile();
        String timestamp = new Date().toString();
        Files.writeString(logFile.toPath(),
            String.format("[%s] %s%n", timestamp, message),
            StandardOpenOption.CREATE, StandardOpenOption.APPEND);
    }
}
```

### Event-Specific Functionality

Provide functionality based on the triggering event:

```java
@Library("eventHelper")
public class EventHelperLibrary extends PerExecLibrary {

    public EventHelperLibrary(BaseScriptContext<?> context) {
        super(context);
    }

    public String getEventSource() {
        BaseEvent event = ctx.getTriggeringEvent();
        if (event instanceof EventKey) {
            return "Key Press";
        } else if (event instanceof EventTick) {
            return "Game Tick";
        } else if (event instanceof EventDamage) {
            return "Damage Event";
        }
        return "Unknown Event";
    }

    public boolean isPlayerEvent() {
        BaseEvent event = ctx.getTriggeringEvent();
        return event instanceof EventPlayerJoin ||
               event instanceof EventPlayerLeave ||
               event instanceof EventPlayerRespawn;
    }

    public Object getEventData(String fieldName) {
        try {
            BaseEvent event = ctx.getTriggeringEvent();
            Field field = event.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(event);
        } catch (Exception e) {
            return null;
        }
    }
}
```

---

## Comparison with Other Library Types

### BaseLibrary

```java
// Single instance shared across ALL script executions
public class GlobalLibrary extends BaseLibrary {
    // Global state shared across all scripts
    private static int globalCounter = 0;
}
```

**Use when:**
- Functionality should be identical for all scripts
- State needs to be shared across all script executions
- No script-context-specific behavior required

### PerLanguageLibrary

```java
// One instance per language type, shared across scripts of same language
public class LanguageLibrary extends PerLanguageLibrary {
    private final Map<String, Object> languageState = new HashMap<>();

    public LanguageLibrary(Class<? extends BaseLanguage<?, ?>> language) {
        super(language);
        // Language-specific initialization
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
    private final Map<String, Object> scriptState = new HashMap<>();

    public ScriptLibrary(BaseScriptContext<?> context) {
        super(context);
        // Script-specific initialization
    }
}
```

**Use when:**
- Each script needs its own isolated state
- Library depends on script context information
- No sharing between script executions desired
- Script-specific functionality needed

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
@Library("mathHelper")
public class MathHelperLibrary extends PerExecLibrary {

    public MathHelperLibrary(BaseScriptContext<?> context) {
        super(context);
    }

    // Script-specific calculation history
    private final List<String> calculationHistory = new ArrayList<>();

    public double add(double a, double b) {
        double result = a + b;
        calculationHistory.add(String.format("%.2f + %.2f = %.2f", a, b, result));
        return result;
    }

    public double multiply(double a, double b) {
        double result = a * b;
        calculationHistory.add(String.format("%.2f × %.2f = %.2f", a, b, result));
        return result;
    }

    public List<String> getHistory() {
        return new ArrayList<>(calculationHistory);
    }

    public void clearHistory() {
        calculationHistory.clear();
    }
}
```

### Advanced Implementation with Context Integration

```java
@Library("contextDebugger")
public class ContextDebuggerLibrary extends PerExecLibrary {

    public ContextDebuggerLibrary(BaseScriptContext<?> context) {
        super(context);
    }

    public void printContextInfo() {
        Chat.log("=== Script Context Information ===");
        Chat.log("Trigger Name: " + ctx.getTriggerName());
        Chat.log("Script File: " + ctx.getContainedFolder().getAbsolutePath());
        Chat.log("Execution Time: " + ctx.getExecTime() + "ms");

        if (ctx.getTriggeringEvent() != null) {
            Chat.log("Triggering Event: " + ctx.getTriggeringEvent().getClass().getSimpleName());
        }

        Chat.log("Context Thread: " + ctx.getBoundThread().getName());
        Chat.log("================================");
    }

    public String getDetailedInfo() {
        StringBuilder sb = new StringBuilder();
        sb.append("Script Context Details:\n");
        sb.append("- Trigger: ").append(ctx.getTriggerName()).append("\n");
        sb.append("- File: ").append(ctx.getContainedFolder().getAbsolutePath()).append("\n");
        sb.append("- Execution Time: ").append(ctx.getExecTime()).append("ms\n");
        sb.append("- Event: ").append(ctx.getTriggeringEvent().getClass().getSimpleName()).append("\n");

        if (ctx instanceof JavaScriptContext) {
            sb.append("- Language: JavaScript\n");
        }

        return sb.toString();
    }

    public boolean hasEventListeners() {
        return !ctx.eventListeners.isEmpty();
    }

    public int getEventListenerCount() {
        return ctx.eventListeners.size();
    }
}
```

### Error Handling and Logging

```java
@Library("scriptLogger")
public class ScriptLoggerLibrary extends PerExecLibrary {
    private final String scriptName;
    private final List<String> logEntries = new ArrayList<>();

    public ScriptLoggerLibrary(BaseScriptContext<?> context) {
        super(context);
        this.scriptName = context.getTriggerName();
    }

    public void info(String message) {
        String logEntry = String.format("[%s] [INFO] %s",
            new SimpleDateFormat("HH:mm:ss").format(new Date()), message);
        logEntries.add(logEntry);
        Chat.log(logEntry);
    }

    public void error(String message, Throwable error) {
        String logEntry = String.format("[%s] [ERROR] %s: %s",
            new SimpleDateFormat("HH:mm:ss").format(new Date()),
            message, error.getMessage());
        logEntries.add(logEntry);
        Chat.log(logEntry);

        // Also log to JsMacros error system
        ctx.getProfile().logError(error);
    }

    public void debug(String message) {
        String logEntry = String.format("[%s] [DEBUG] %s",
            new SimpleDateFormat("HH:mm:ss").format(new Date()), message);
        logEntries.add(logEntry);

        // Only show debug if debug mode is enabled
        if (Boolean.parseBoolean(System.getProperty("jsmacros.debug", "false"))) {
            Chat.log(logEntry);
        }
    }

    public List<String> getLogs() {
        return new ArrayList<>(logEntries);
    }

    public void saveLogsToFile() throws IOException {
        File logFile = ctx.getContainedFolder().toPath()
                .resolve(scriptName + "_logs.txt").toFile();

        try (FileWriter writer = new FileWriter(logFile)) {
            for (String entry : logEntries) {
                writer.write(entry + System.lineSeparator());
            }
        }

        info("Logs saved to: " + logFile.getAbsolutePath());
    }
}
```

---

## Built-in PerExecLibrary Examples

### Time Library

```java
@Library("Time")
public class FTime extends PerExecLibrary {
    public FTime(BaseScriptContext<?> context) {
        super(context);
    }

    public long time() {
        return System.currentTimeMillis();
    }

    public void sleep(long millis) throws InterruptedException {
        ctx.wrapSleep(() -> Thread.sleep(millis));
    }
}
```

### File System Library

```java
@Library("FS")
public class FFS extends PerExecLibrary {
    public FFS(BaseScriptContext<?> context) {
        super(context);
    }

    public String[] list(String path) {
        return ctx.getContainedFolder().toPath()
                .resolve(path).toFile().list();
    }

    public boolean exists(String path) {
        return ctx.getContainedFolder().toPath()
                .resolve(path).toFile().exists();
    }

    // ... other file operations relative to script folder
}
```

### JsMacros Library

```java
@Library("JsMacros")
public class FJsMacros extends PerExecLibrary {
    public FJsMacros(BaseScriptContext<?> context) {
        super(context);
    }

    public EventContainer<?> runScript(String file) {
        // Uses context for file resolution
        return Core.getInstance().exec(
            new ScriptTrigger(ScriptTrigger.TriggerType.EVENT, "",
                Core.getInstance().config.macroFolder.getAbsoluteFile()
                    .toPath().resolve(file).toFile(), true, false),
            null, null, null);
    }

    // ... other script management methods
}
```

---

## Best Practices

### When to Use PerExecLibrary

**Good candidates:**
- Libraries that need script context information
- Script-specific state management
- File operations relative to script location
- Script execution tracking and debugging
- Libraries that should not share state between script executions

**Poor candidates:**
- Global functionality identical across all scripts (use `BaseLibrary`)
- Language-specific functionality (use `PerLanguageLibrary`)
- Simple utility functions without state (consider static methods)

### Design Considerations

1. **State Isolation** - Remember that each script execution gets a fresh instance
2. **Context Usage** - Leverage the available script context for context-aware functionality
3. **Memory Management** - State is automatically cleaned up when script execution ends
4. **Error Handling** - Use context's error reporting capabilities
5. **Thread Safety** - Be aware that libraries may be accessed from different threads

### Performance Tips

```java
// Cache expensive operations per execution
public class CachedLibrary extends PerExecLibrary {
    private volatile Map<String, Object> cache = new HashMap<>();

    public CachedLibrary(BaseScriptContext<?> context) {
        super(context);
        // Pre-initialize script-specific resources
        initializeResources();
    }

    private void initializeResources() {
        // Load script-specific resources once per execution
        cache.put("scriptPath", ctx.getContainedFolder().getAbsolutePath());
        cache.put("startTime", System.currentTimeMillis());
    }
}
```

---

## Conclusion

The `PerExecLibrary` class provides a powerful foundation for creating context-aware libraries in JsMacros while maintaining clean isolation between different script executions. By understanding when and how to use this class, developers can create libraries that leverage script context information and provide isolated, script-specific functionality.

When designing libraries, carefully consider whether functionality should be global, per-language, per-execution, or a combination of these approaches to ensure the most appropriate and efficient implementation.

---

## Related Classes

- `BaseLibrary` - Base class for all JsMacros libraries
- `PerLanguageLibrary` - Base for per-language libraries
- `PerExecLanguageLibrary` - Base for per-execution and per-language libraries
- `BaseScriptContext` - Script execution context
- `@Library` - Annotation for marking library implementations
- `LibraryRegistry` - Manages library discovery and instantiation

## Version History

- **1.0.0:** Initial release with per-execution library support
- **1.1.0:** Enhanced context access methods
- **1.2.0:** Improved lifecycle management
- **1.6.0:** Added additional context information methods
- **Current:** Stable per-execution library framework with full context integration