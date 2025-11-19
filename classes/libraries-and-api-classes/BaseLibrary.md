# BaseLibrary

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.BaseLibrary`

**Extends:** `Object`

**Abstract:** `true`

The abstract base class for all JsMacros library implementations. This class serves as the foundation for the entire library system in JsMacros, providing a common inheritance hierarchy for all global API libraries that are exposed to scripts.

Every library accessible from JsMacros scripts (such as `Chat`, `Player`, `World`, `Hud`, etc.) extends this base class. While BaseLibrary itself contains no methods or fields, it establishes the framework for library registration, instantiation, and management within the JsMacros runtime.

## Library System Architecture

### Inheritance Hierarchy
All JsMacros libraries follow this inheritance pattern:

```
BaseLibrary (abstract)
├── Standard Libraries (single instance)
│   ├── FChat → extends BaseLibrary
│   ├── FPlayer → extends BaseLibrary
│   ├── FWorld → extends BaseLibrary
│   └── ... other global libraries
├── Per-Execution Libraries
│   └── PerExecLibrary → extends BaseLibrary
│       └── Libraries that get new instances per script execution
└── Per-Language Libraries
    └── PerLanguageLibrary → extends BaseLibrary
        └── Libraries that get instances per scripting language
```

### Library Types

#### Standard Libraries
Libraries that exist as single instances shared across all scripts:
- `Chat` - Chat interaction and messaging
- `Player` - Player information and controls
- `World` - World interaction and queries
- `Hud` - Heads-up display and rendering
- `Time` - Time and scheduling functions
- `Utils` - Utility functions
- `KeyBind` - Keyboard input handling
- `JavaUtils` - Java reflection and integration
- `Reflection` - Advanced reflection capabilities
- `GlobalVars` - Global variable storage
- `Request` - HTTP request functionality
- `FS` - File system operations

#### Per-Execution Libraries
Libraries that get fresh instances for each script execution:
- Context-specific libraries that maintain script state
- Libraries that need access to the current script context
- Libraries that should not share state between script runs

#### Per-Language Libraries
Libraries that have instances per scripting language:
- Language-specific functionality
- Libraries that need to know which scripting language is being used

## Library Registration and Discovery

### @Library Annotation
All library implementations must be annotated with `@Library`:

```java
@Library("Chat")
public class FChat extends BaseLibrary {
    // Library implementation
}
```

The `@Library` annotation specifies:
- **value**: The name of the library as exposed to scripts
- **languages**: Array of supported language classes (optional)

### Library Registry
The `LibraryRegistry` class manages all library instances:
- Discovers libraries via the `@Library` annotation
- Instantiates appropriate library types
- Provides libraries to scripts based on language and context
- Manages library lifecycle

### Library Instantiation Process
1. **Discovery**: Scan for classes with `@Library` annotation
2. **Classification**: Determine library type (standard, per-exec, per-language)
3. **Instantiation**: Create instances based on library type
4. **Registration**: Add to registry and make available to scripts
5. **Exposure**: Inject into script global scope

## Script Access Patterns

### Global Variable Access
Libraries are automatically exposed as global variables in scripts:
```js
// These all extend BaseLibrary
Chat.log("Hello World");        // FChat instance
const player = Player.getPlayer(); // FPlayer instance
World.getBlock(0, 64, 0);      // FWorld instance
Hud.registerDraw3D(my3D);       // FHud instance
```

### Library Creation Guidelines

When creating custom libraries that extend BaseLibrary:

```java
@Library("MyCustomLib")
public class FMyCustomLib extends BaseLibrary {

    // Required: No-args constructor for standard libraries
    public FMyCustomLib() {
        // Initialization code
    }

    // Your library methods
    public void myMethod() {
        // Implementation
    }
}
```

For per-execution libraries:
```java
@Library("MyContextLib")
public class FMyContextLib extends PerExecLibrary {

    // Required: Constructor with BaseScriptContext
    public FMyContextLib(BaseScriptContext<?> context) {
        super(context);
        // Context-aware initialization
    }

    // Your library methods with access to script context
    public void getContextInfo() {
        Chat.log("Current context: " + ctx.getTriggerName());
    }
}
```

### Library Lifecycle

#### Standard Libraries
- **Created**: Once during JsMacros initialization
- **Lifetime**: Entire application runtime
- **Sharing**: Shared across all scripts and contexts
- **State**: Global state management required

#### Per-Execution Libraries
- **Created**: New instance for each script execution
- **Lifetime**: Duration of script execution
- **Sharing**: Not shared between script runs
- **State**: Isolated per execution

#### Per-Language Libraries
- **Created**: One instance per supported language
- **Lifetime**: Language runtime lifetime
- **Sharing**: Shared among scripts using same language
- **State**: Language-specific state management

## Best Practices

### For Library Developers

1. **State Management**: Consider whether your library needs global, per-execution, or per-language state
2. **Thread Safety**: Libraries may be accessed from multiple threads
3. **Error Handling**: Provide clear error messages and proper exception handling
4. **Documentation**: Document all public methods with JSDoc-style comments
5. **Dependencies**: Avoid circular dependencies between libraries

### For Script Writers

1. **Global State**: Be aware that most libraries maintain global state
2. **Thread Safety**: Library operations may not be thread-safe
3. **Resource Management**: Clean up resources created through libraries
4. **Error Handling**: Handle exceptions that library methods may throw

## Integration with Script Engine

BaseLibrary instances are automatically injected into script global scope by the language runtime. The process:

1. **Library Discovery**: Runtime scans for `@Library` annotations
2. **Instance Creation**: Creates appropriate library instances
3. **Global Injection**: Exposes libraries as global variables
4. **Method Binding**: Makes library methods callable from scripts

This architecture allows JsMacros to provide a consistent set of global APIs across different scripting languages while maintaining proper encapsulation and lifecycle management.

---

## Notes

- **Abstract Class**: BaseLibrary cannot be instantiated directly
- **No Methods**: This class serves as a marker and base for inheritance
- **Runtime Only**: BaseLibrary functionality is entirely handled by the JsMacros runtime
- **Automatic Registration**: Library classes are discovered and registered automatically
- **Version Compatible**: Library system works across all JsMacros versions

## Related Classes

- `LibraryRegistry` - Manages library discovery and instantiation
- `@Library` - Annotation for marking library implementations
- `PerExecLibrary` - Base for per-execution libraries
- `PerLanguageLibrary` - Base for per-language libraries
- `BaseScriptContext` - Script execution context
- `BaseLanguage` - Scripting language interface