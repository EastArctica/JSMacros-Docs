# BaseProfile

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.config.BaseProfile`

**Type:** `abstract class`

**Since:** JsMacros 1.0.3

The `BaseProfile` class serves as the foundational abstract class for managing JsMacros configuration profiles. It handles the core functionality of profile management including loading and saving profiles, managing event registries, triggering events, and coordinating script execution contexts. This class provides the essential infrastructure that allows JsMacros to maintain different sets of macros and event listeners that can be switched between as needed.

## Overview

The `BaseProfile` class is a central component in JsMacros's architecture that manages:

- **Profile Management:** Loading, creating, and switching between different macro profiles
- **Event Registry Coordination:** Managing event listeners and script triggers
- **Event Triggering:** Coordinating the execution of event handlers
- **Script Context Management:** Handling joined thread stacks and script execution contexts
- **Library Registration:** Initializing core libraries and event registries

This class is designed to be extended by platform-specific implementations (like `Profile` in the client module) that provide additional functionality specific to the execution environment.

## Accessing BaseProfile

`BaseProfile` instances are typically accessed through:

- **JsMacros API:** Through methods that expose the current profile
- **Event Handling:** Events provide access to the profile context
- **Profile Management:** Through profile switching and management operations

```javascript
// Example: Access through event context
JsMacros.on("EventProfileLoad", JavaWrapper.methodToJavaAsync((event) => {
    const profile = event.profile;
    console.log(`Loaded profile: ${profile.getCurrentProfileName()}`);
}));

// Example: Profile operations (when available through JsMacros API)
// Note: Direct BaseProfile access is typically through other JsMacros APIs
```

## Constructors

### BaseProfile(Core runner, Logger logger)

Internal constructor used by JsMacros to create profile instances. This constructor is not typically called directly by script writers, but rather used internally by the JsMacros system.

**Parameters:**
- `runner: Core` - The JsMacros core instance
- `logger: Logger` - Logger instance for profile operations

## Fields

### LOGGER

**Type:** `Logger`

The logger instance used by this profile for logging operations and errors.

### joinedThreadStack

**Type:** `Set<Thread>`

A set containing all threads that are currently joined and awaiting completion. This is used internally to manage script execution contexts and prevent deadlocks.

### events

**Type:** `Set<String>`

A set containing all event names that are currently registered or active in this profile.

### profileName

**Type:** `String`

The name of the currently loaded profile.

## Methods

### Abstract Methods

#### logError(Throwable ex)

Abstract method that must be implemented by subclasses to handle error logging. This method defines how errors are displayed or logged in the specific execution environment.

**Parameters:**
- `ex: Throwable` - The error/exception to log

**Example Implementation (from Profile class):**
```java
@Override
public void logError(Throwable ex) {
    // Implementation logs errors to chat and handles error formatting
}
```

#### checkJoinedThreadStack()

Abstract method that must be implemented to check if the current thread is in the joined thread stack. This is used to determine if the current execution context can safely join with other script contexts.

**Returns:** `boolean` - `true` if the current thread is joined, `false` otherwise

### Profile Management

#### loadOrCreateProfile(String profileName)

Loads an existing profile or creates a new one if it doesn't exist. This method clears the current event registry, loads the specified profile's scripts, or creates a new empty profile if none exists.

**Parameters:**
- `profileName: String` - The name of the profile to load or create

**Example:**
```javascript
// Note: This would typically be called through JsMacros profile management APIs
// Direct BaseProfile usage is rare in scripts

// Conceptual usage:
// profile.loadOrCreateProfile("myCustomProfile");
```

#### loadProfile(String pName) (protected)

Protected method that loads a profile by name. This clears the current registry and loads all script triggers from the specified profile.

**Parameters:**
- `pName: String` - The name of the profile to load

**Returns:** `boolean` - `true` if the profile was loaded successfully, `false` if the profile doesn't exist or is broken

#### saveProfile()

Saves the current profile's state to the configuration. This stores all current script triggers and event listeners to the persistent configuration file.

**Example:**
```javascript
// Conceptual usage - typically called automatically by JsMacros
// profile.saveProfile();
```

#### getCurrentProfileName()

Returns the name of the currently active profile.

**Returns:** `String` - The current profile name

**Example:**
```javascript
// Note: This would typically be accessed through JsMacros APIs
const currentProfile = profile.getCurrentProfileName();
console.log(`Current profile: ${currentProfile}`);
```

#### renameCurrentProfile(String profile)

Renames the current profile to the specified name.

**Parameters:**
- `profile: String` - The new name for the current profile

### Event Management

#### triggerEvent(BaseEvent event)

Triggers an event and coordinates the execution of all registered event listeners. This method handles both custom events and built-in events, managing the execution flow for joined and non-joined event listeners.

**Parameters:**
- `event: BaseEvent` - The event to trigger

**Behavior:**
- Retrieves all appropriate event listeners for the event type
- Handles joined event listeners with proper thread management
- Manages the "ANYTHING" event listeners for events not in the ignore list
- Coordinates execution timing and thread safety

**Example:**
```javascript
// This method is typically called internally by JsMacros
// Script writers would normally use event registration instead

// Conceptual example:
// const customEvent = new EventCustom("MyCustomEvent", data);
// profile.triggerEvent(customEvent);
```

#### getRegistry() (deprecated)

**Deprecated:** Since 1.6.0

Returns the event registry. This method is deprecated and should be avoided in favor of newer event management approaches.

**Returns:** `BaseEventRegistry` - The event registry instance

### Initialization

#### init(String defaultProfile)

Initializes the profile by setting up registries and loading the default profile. This method coordinates the complete initialization process.

**Parameters:**
- `defaultProfile: String` - The name of the default profile to load

**Process:**
1. Initializes event registries
2. Loads or creates the specified default profile

#### initRegistries() (protected)

Protected method that initializes the core registries and libraries. This method sets up the fundamental event types and registers the core JsMacros libraries.

**Default Implementation Includes:**
- Registers "ANYTHING" and "EventProfileLoad" events
- Registers core libraries: FJsMacros, FFS, FGlobalVars, FReflection, FRequest, FTime

**Note:** Subclasses should override this method to add platform-specific events and libraries, then call `super.initRegistries()`.

## Usage Examples

### Profile Lifecycle Management

```javascript
// Monitor profile loading events
JsMacros.on("EventProfileLoad", JavaWrapper.methodToJavaAsync((event) => {
    console.log(`Profile "${event.profileName}" has been loaded`);

    // Log information about the loaded profile
    const profile = event.profile;
    console.log(`Current profile: ${profile.getCurrentProfileName()}`);
    console.log(`Active events: ${profile.events.size}`);
}));

// Note: Direct profile manipulation would typically go through JsMacros APIs
// rather than direct BaseProfile method calls
```

### Custom Event Triggering

```javascript
// Example of how custom events would be triggered through the profile system
// This is conceptual - actual implementation would use JsMacros APIs

function triggerCustomEvent(eventName, data) {
    // JsMacros handles the actual event creation and triggering
    // profile.triggerEvent(new EventCustom(eventName, data));

    // Script writers would typically use:
    JsMacros.emit(eventName, data);
}
```

### Error Handling Context

```javascript
// Understanding how profile handles errors
JsMacros.on("Error", JavaWrapper.methodToJavaAsync((event) => {
    console.log("Error occurred in script execution");
    console.log("Error message:", event.error);

    // The profile's logError method would be called internally
    // to handle error display and logging
}));
```

## Implementation Details

### Thread Management

The `BaseProfile` class includes sophisticated thread management for handling script execution:

1. **Joined Thread Stack:** Tracks threads that are waiting for script completion
2. **Event Lock Watchdog:** Prevents indefinite blocking with timeout mechanisms
3. **Context Isolation:** Ensures scripts don't interfere with each other's execution contexts

### Profile Storage Structure

Profiles are stored in the JsMacros configuration with the following structure:
```json
{
  "profiles": {
    "profileName": [
      {
        "event": "eventName",
        "scriptFile": "path/to/script.js",
        "enabled": true,
        // ... other script trigger properties
      }
      // ... more script triggers
    ]
    // ... more profiles
  }
}
```

### Event System Integration

The profile integrates deeply with JsMacros's event system:

1. **Event Registration:** Manages which events are active for the current profile
2. **Script Triggers:** Coordinates the loading and execution of script triggers
3. **Event Filtering:** Handles the "anything ignored" list for selective event processing
4. **Custom Events:** Supports user-defined custom events

## Related Classes

### Core Dependencies
- **Core:** The main JsMacros instance that manages profiles
- **BaseEventRegistry:** Manages event listeners and script triggers
- **BaseEvent:** Base class for all JsMacros events
- **IEventListener:** Interface for event listeners
- **BaseScriptContext:** Manages script execution contexts

### Event Classes
- **EventProfileLoad:** Fired when a profile is loaded
- **EventCustom:** User-defined custom events

### Concrete Implementations
- **Profile:** Client-side implementation with Minecraft-specific functionality

## Important Notes

1. **Abstract Class:** `BaseProfile` cannot be instantiated directly. Use the concrete implementation provided by your JsMacros environment.

2. **Platform-Specific:** Different platforms (client, server) provide different implementations with additional functionality.

3. **Thread Safety:** The class includes sophisticated thread management. Script writers should be aware that some operations may block or have specific threading requirements.

4. **Profile Persistence:** Profiles are automatically saved when modified, but explicit saves can be performed using `saveProfile()`.

5. **Event Ordering:** The order of event listener execution is determined by the event registry and may not be guaranteed to be in registration order.

6. **Memory Management:** Large numbers of joined threads can impact performance. The system includes watchdog mechanisms to prevent indefinite blocking.

7. **Error Handling:** Error handling is platform-specific. The abstract `logError` method ensures each implementation can handle errors appropriately for its environment.

## Error Handling

```javascript
// Safe profile operations (conceptual example)
function safeProfileOperation(profile, operation) {
    try {
        // Perform profile operation
        operation(profile);
    } catch (error) {
        console.error("Profile operation failed:", error.message);

        // The profile's internal error handling would also be triggered
        // profile.logError(error);
    }
}
```

## Best Practices

1. **Profile Organization:** Organize scripts into logical profiles based on functionality or server type.

2. **Event Cleanup:** Ensure event listeners are properly managed when switching profiles.

3. **Resource Management:** Be mindful of memory usage when working with large numbers of scripts or events.

4. **Error Monitoring:** Monitor error events to catch issues with script execution.

5. **Profile Validation:** Validate profile data before switching profiles in automated systems.