# Core

The main JsMacros core system that manages all library functionality, event handling, configuration, and script execution. This is primarily an internal class, but some aspects are accessible to script writers through the JsMacros library.

**Class:** `Core<T extends BaseProfile, U extends BaseEventRegistry>`
**Package:** `xyz.wagyourtail.jsmacros.core`
**Since:** 1.0.0

## Overview

The Core class is the central system that orchestrates all JsMacros functionality. While most script writers will interact with Core indirectly through library classes (Client, Player, World, Chat), some Core functionality is exposed through the JsMacros library.

Core manages:
- Library registry and loading
- Event system and script execution
- Profile management and configuration
- Extension loading and management
- Thread pool for script execution
- Service management

## Access to Core Functionality

Most Core functionality is accessed through the JsMacros library:

```js
// Access Core through JsMacros library
const core = JsMacros.core;
```

## Key Components

### Library Registry

Core manages all available libraries that scripts can use:

```js
// Get information about available libraries
const libraries = JsMacros.getAvailableLibraries();
console.log("Available libraries:", libraries);

// Libraries automatically available in scripts:
// - Client: Client-side functionality and raw Minecraft access
// - Player: Player state and control
// - World: World interaction and data
// - Chat: Chat communication and message handling
// - Hud: HUD manipulation and overlays
// - Fs: File system operations
// - JavaUtils: Java utility functions
// - KeyBind: Key binding management
```

### Event System

Core manages the entire event system that drives JsMacros:

```js
// Events are automatically handled by Core
// Script writers primarily interact through event listeners:
JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    Chat.log(`Key pressed: ${event.key}`);
}));
```

### Configuration Management

Core manages script configuration and profiles:

```js
// Access current profile information
const profile = JsMacros.profile;

// Get available profiles
const profiles = JsMacros.getProfiles();

// Switch profiles (if available)
JsMacros.loadProfile("MyProfile");
```

### Extension System

Core manages JsMacros extensions and language support:

```js
// Check available extensions
const extensions = JsMacros.getExtensions();

// Get script contexts (advanced usage)
const contexts = JsMacros.getContexts();
```

## Script Writer Access

While Core is primarily internal, script writers can access some Core functionality:

### JsMacros Library Methods

```js
// Core instance access
const core = JsMacros.core;

// Profile access
const currentProfile = JsMacros.profile;

// Profile management
const profiles = JsMacros.getProfiles();
JsMacros.loadProfile("ProfileName");

// Extension information
const extensions = JsMacros.getExtensions();

// Script context access (advanced)
const activeContexts = JsMacros.getContexts();
```

### Service Access

```js
// Access to JsMacros services
const services = JsMacros.getServices();

// Check if specific services are available
if (services.has("SomeService")) {
    const service = services.get("SomeService");
    // Use the service
}
```

## Advanced Usage

### Custom Event Registration

For advanced users who need to register custom events:

```js
// Register a custom event (advanced)
JsMacros.registerEvent("MyCustomEvent", JavaWrapper.methodToJava((event) => {
    // Handle custom event
    Chat.log("Custom event triggered!");
}));
```

### Thread Management

Core manages script execution threads:

```js
// Scripts run in Core-managed threads
// Current thread information
const currentThread = Java.type("java.lang.Thread").currentThread();
Chat.log(`Running in thread: ${currentThread.getName()}`);
```

### Error Handling

Core provides centralized error handling:

```js
// Errors are automatically handled by Core
// Script writers can use try-catch for specific cases
try {
    // Risky operations
    SomeRiskyOperation();
} catch (error) {
    Chat.log(`Error: ${error.message}`);
}
```

## Best Practices

1. **Use Library Classes**: Prefer using library classes (Client, Player, World, Chat) over direct Core access
2. **Event-Driven Programming**: Write scripts that respond to events rather than running continuously
3. **Error Handling**: Include proper error handling in scripts, but rely on Core for unexpected errors
4. **Resource Management**: Let Core manage resources; avoid manual resource cleanup

## Lifecycle

### Initialization

1. Core instance created during JsMacros startup
2. Libraries registered and initialized
3. Extensions loaded
4. Default profile loaded
5. Event system initialized

### Runtime

1. Events trigger and execute registered scripts
2. Scripts run in Core-managed threads
3. Configuration changes handled
4. Extensions provide additional functionality

### Shutdown

1. Scripts gracefully stopped
2. Resources cleaned up
3. Configuration saved
4. Extensions unloaded

## Performance Considerations

### Thread Management

Core uses a thread pool for script execution:

```js
// Scripts run efficiently in managed threads
// Avoid blocking operations in event handlers
// Use async operations when possible

// Good practice: Use Client.runOnMainThread for Minecraft operations
Client.runOnMainThread(JavaWrapper.methodToJava(() => {
    // Minecraft-specific operations
}));
```

### Memory Management

Core manages memory automatically:

```js
// Avoid memory leaks in long-running scripts
// Clean up references when done
// Use appropriate data structures

// Example: Clean up event listeners
const listener = JsMacros.on("Key", handler);
// Later, if needed:
// listener.unregister(); // (if available)
```

## Troubleshooting

### Common Issues

1. **Scripts Not Running**: Check Core initialization and profile loading
2. **Event Not Firing**: Verify event registration and Core event system
3. **Performance Issues**: Check script efficiency and Core thread usage
4. **Configuration Problems**: Verify Core configuration and profile settings

### Debug Information

```js
// Get Core debug information
const core = JsMacros.core;
const profile = JsMacros.profile;

Chat.log(`Core instance: ${core != null}`);
Chat.log(`Current profile: ${profile}`);
Chat.log(`Active contexts: ${JsMacros.getContexts().size}`);
```

## Related Classes

- **[JsMacros](../apis/js-macros.md)** - Main library for Core access
- **[Profile](profile.md)** - Profile management
- **[BaseEvent](base-event.md)** - Base class for all events
- **[EventRegistry](event-registry.md)** - Event system management
- **[EventContainer](event-container.md)** - Script execution context

## Implementation Notes

- Core is primarily internal to JsMacros
- Most functionality is exposed through library classes
- Core manages the entire JsMacros lifecycle
- Thread-safe implementation for concurrent script execution
- Designed to be extended through the extension system