# Profile

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.config.Profile`

**Extends:** `BaseProfile`

**Since:** JsMacros 1.0.3

The `Profile` class is the client-side implementation of JsMacros profile management for Minecraft. It extends `BaseProfile` with Minecraft-specific functionality including in-game error display, chat integration, client event registration, and thread management for the Minecraft client environment. This class serves as the main interface for managing macro profiles in the JsMacros client, handling everything from script execution to error reporting within the Minecraft interface.

## Overview

The `Profile` class provides client-specific profile management capabilities including:

- **Minecraft Integration:** Error reporting and logging through the Minecraft chat interface
- **Client Event Registration:** Registers all client-specific events like player actions, world events, and UI interactions
- **Thread Safety:** Manages thread checking for Minecraft's main game thread vs script execution threads
- **Error Formatting:** Converts script errors into clickable, readable messages in the chat
- **Profile Reload Coordination:** Handles UI updates when profiles are switched
- **Library Registration:** Sets up client-specific libraries like Chat, HUD, Player, World, etc.

## Accessing Profile

`Profile` instances are typically accessed through JsMacros APIs and event contexts:

```javascript
// Access through profile load events
JsMacros.on("EventProfileLoad", JavaWrapper.methodToJavaAsync((event) => {
    const profile = event.profile;
    console.log(`Loaded profile: ${profile.getCurrentProfileName()}`);
}));

// Access through the main JsMacros instance
const jsMacros = JsMacros.getInstance();
const currentProfile = jsMacros.getProfile();
```

## Constructors

### Profile(Core runner, Logger logger)

Internal constructor used by JsMacros to create the client profile instance. This constructor is not typically called directly by script writers, but is used internally by the JsMacros system during startup.

**Parameters:**
- `runner: Core` - The JsMacros core instance
- `logger: Logger` - Logger instance for profile operations

## Fields

### ignoredErrors

**Type:** `Class<? extends Throwable>[]`

An array of error types that should be ignored and not displayed to the user. This includes common exceptions like `InterruptedException` and script assertion errors that don't indicate actual problems.

**Default Value:**
```java
new Class[]{
    InterruptedException.class,
    BaseScriptContext.ScriptAssertionError.class,
}
```

## Inherited Fields

From `BaseProfile`:
- **LOGGER:** Logger instance for profile operations
- **joinedThreadStack:** Set of threads currently joined and awaiting completion
- **events:** Set of all currently registered event names
- **profileName:** Name of the currently loaded profile

## Methods

### Profile Management

#### loadProfile(String profileName)

Loads a profile by name, clearing the current event registry and loading all script triggers from the specified profile. This method extends the base implementation to also refresh the Macro Screen UI if it's currently open.

**Parameters:**
- `profileName: String` - The name of the profile to load

**Returns:** `boolean` - `true` if the profile was loaded successfully, `false` if the profile doesn't exist or is broken

**Example:**
```javascript
// Note: This would typically be called through JsMacros APIs
// Profile reloading is usually handled automatically

// Conceptual usage:
// const profile = jsMacros.getProfile();
// const success = profile.loadProfile("myCustomProfile");
// console.log(`Profile load ${success ? 'succeeded' : 'failed'}`);
```

### Error Handling

#### logError(Throwable ex)

Handles error logging and display in the Minecraft client environment. This method formats exceptions into user-friendly chat messages with clickable links to open the problematic script files in the editor.

**Parameters:**
- `ex: Throwable` - The error/exception to log and display

**Behavior:**
- Filters out ignored error types
- Unwraps runtime exceptions to get to the root cause
- Formats stack traces with clickable file/line information
- Displays errors in the chat with proper formatting and colors
- Provides clickable links to open scripts at the error location

**Example:**
```javascript
// This method is called internally by JsMacros when errors occur
// Script writers typically don't call this directly

// Error handling demonstration:
JsMacros.on("Error", JavaWrapper.methodToJavaAsync((event) => {
    console.log("An error occurred - check chat for details");
    // The profile.logError() method would be called internally
}));
```

### Thread Management

#### checkJoinedThreadStack()

Checks if the current thread is either the main Minecraft thread or in the joined thread stack. This is used to determine if the current execution context can safely join with other script contexts.

**Returns:** `boolean` - `true` if the current thread is joined or is the main Minecraft thread, `false` otherwise

**Usage Notes:**
- The main Minecraft thread (`mc.isOnThread()`) is always considered joined
- Script threads that have been joined for event execution are in the `joinedThreadStack`
- This method is used internally to prevent thread safety issues

### Initialization

#### initRegistries()

Initializes all client-specific events and libraries. This method extends the base implementation to register Minecraft-client-specific functionality.

**Registered Events Include:**
- Player events: `EventArmorChange`, `EventAttackBlock`, `EventDamage`, `EventDeath`, etc.
- World events: `EventBlockUpdate`, `EventChunkLoad`, `EventDimensionChange`, etc.
- Inventory events: `EventClickSlot`, `EventOpenContainer`, `EventSlotUpdate`, etc.
- UI events: `EventKey`, `EventMouseScroll`, `EventOpenScreen`, etc.
- Network events: `EventRecvPacket`, `EventSendPacket`, etc.

**Registered Libraries Include:**
- **FChat:** Chat and message functionality
- **FHud:** HUD and rendering functions
- **FClient:** Client information and control
- **FKeyBind:** Key binding management
- **FPlayer:** Player information and manipulation
- **FPositionCommon:** Position and coordinate utilities
- **FJavaUtils:** Java utility functions
- **FUtils:** General utility functions
- **FWorld:** World interaction and information

## Usage Examples

### Profile Load Monitoring

```javascript
// Monitor when profiles are loaded
JsMacros.on("EventProfileLoad", JavaWrapper.methodToJavaAsync((event) => {
    const profile = event.profile;
    const profileName = event.profileName;

    Chat.log(`&6Profile "&f${profileName}&6" has been loaded successfully!`);
    Chat.log(`&7Current profile: ${profile.getCurrentProfileName()}`);

    // Display information about the profile
    const eventCount = profile.events.size;
    Chat.log(`&7Active event types: ${eventCount}`);
}));
```

### Error Handling Integration

```javascript
// Set up comprehensive error handling
JsMacros.on("Error", JavaWrapper.methodToJavaAsync((event) => {
    const error = event.error;

    // Log to console
    console.error(`Script Error: ${error.message}`);
    console.error(`File: ${error.fileName || 'unknown'}`);
    console.error(`Line: ${error.lineNumber || 'unknown'}`);

    // Additional user notification
    Chat.log(`&cScript error occurred! Check chat for details.`);

    // The Profile's logError method will automatically
    // display a formatted error in chat with clickable links
}));
```

### Profile Information Display

```javascript
// Display current profile information
function displayProfileInfo() {
    const jsMacros = JsMacros.getInstance();
    const profile = jsMacros.getProfile();

    if (profile) {
        const currentProfileName = profile.getCurrentProfileName();
        const eventCount = profile.events.size;
        const joinedThreads = profile.joinedThreadStack.size;

        Chat.log(`&6=== Profile Information ===`);
        Chat.log(`&7Name: &f${currentProfileName}`);
        Chat.log(`&7Active Events: &f${eventCount}`);
        Chat.log(`&7Joined Threads: &f${joinedThreads}`);
        Chat.log(`&7Logger: &f${profile.LOGER.getName() || 'JsMacros'}`);
    } else {
        Chat.log("&cProfile not available!");
    }
}

// Example usage
displayProfileInfo();
```

### Thread Safety Demonstration

```javascript
// Demonstrate thread checking
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const jsMacros = JsMacros.getInstance();
    const profile = jsMacros.getProfile();

    if (profile) {
        // This will be true since tick events run on the main thread
        const isJoined = profile.checkJoinedThreadStack();

        if (isJoined) {
            // Safe to perform operations that require thread safety
            // For example, accessing Minecraft client components
        }
    }
}));

// Async operation example
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((event) => {
    const profile = jsMacros.getProfile();

    // This will likely be false since message events run on different threads
    const isJoined = profile ? profile.checkJoinedThreadStack() : false;

    console.log(`Message event thread joined: ${isJoined}`);
}));
```

## Error Display Features

The Profile class provides sophisticated error handling and display:

### Clickable Error Messages

Errors displayed in chat include:
- **File Links:** Clickable links that open the problematic file in the JsMacros editor
- **Line Information:** Direct navigation to the specific line and column
- **Stack Traces:** Formatted stack traces with proper color coding
- **Error Context:** Clear indication of what went wrong and where

### Error Filtering

The `ignoredErrors` array prevents common non-critical errors from cluttering the chat:
- **InterruptedException:** Normal thread interruption, not an actual error
- **ScriptAssertionError:** Script assertions, used for control flow rather than errors

## Event Registration Details

The Profile class registers a comprehensive set of client-specific events:

### Player Events
- `EventArmorChange` - When player armor changes
- `EventAttackBlock` - When player attacks a block
- `EventAttackEntity` - When player attacks an entity
- `EventDamage` - When player takes damage
- `EventHeal` - When player is healed
- `EventDeath` - When player dies
- `EventEXPChange` - When player experience changes
- `EventFallFlying` - When player starts/stop elytra flying
- `EventHealthChange` - When player health changes
- `EventHungerChange` - When player hunger changes
- `EventItemDamage` - When player items take damage
- `EventItemPickup` - When player picks up items
- `EventRiding` - When player starts/stops riding entities
- And more...

### World Events
- `EventAirChange` - When air level changes
- `EventBlockUpdate` - When blocks change
- `EventBossbar` - When bossbar updates
- `EventChunkLoad/Unload` - When chunks load/unload
- `EventDimensionChange` - When dimension changes
- `EventEntityLoad/Unload` - When entities load/unload
- `EventSound` - When sounds play
- And more...

### Interface Events
- `EventKey` - When keys are pressed
- `EventMouseScroll` - When mouse wheel scrolls
- `EventOpenScreen` - When GUI screens open
- `EventOpenContainer` - When containers are opened
- `EventTitle` - When title/subtitle displays
- And more...

## Integration with BaseProfile

The Profile class extends BaseProfile functionality with client-specific features:

### BaseProfile Methods Available
- `loadOrCreateProfile()` - Load or create profiles
- `saveProfile()` - Save current profile state
- `triggerEvent()` - Trigger custom events
- `getCurrentProfileName()` - Get current profile name
- `renameCurrentProfile()` - Rename current profile

### Profile-Specific Enhancements
- **Chat Integration:** Errors display in Minecraft chat
- **UI Updates:** Macro screen refreshes on profile changes
- **Thread Safety:** Minecraft main thread awareness
- **Event Registration:** Client-specific event types
- **Library Registration:** Client-specific libraries

## Related Classes

### Core Dependencies
- **BaseProfile:** Parent class with core profile functionality
- **Core:** Main JsMacros instance
- **MinecraftClient:** Minecraft client instance
- **BaseWrappedException:** Error wrapping and formatting

### Event Classes
- **EventProfileLoad:** Fired when profiles are loaded
- **EventCustom:** User-defined custom events
- All client-specific event classes

### Library Classes
- **FChat:** Chat functionality library
- **FHud:** HUD and rendering library
- **FClient:** Client information library
- **FPlayer:** Player manipulation library
- **FWorld:** World interaction library

## Important Notes

1. **Client-Side Only:** This Profile implementation is specific to the Minecraft client environment.

2. **Error Integration:** Error messages are automatically formatted and displayed in the Minecraft chat interface.

3. **Thread Safety:** The class includes Minecraft-specific thread safety checks for the main game thread.

4. **UI Coordination:** Profile changes automatically update the Macro Screen UI if it's open.

5. **Event Coverage:** Registers comprehensive client-side events covering all aspects of Minecraft gameplay.

6. **Library Access:** Provides access to client-specific libraries for scripting Minecraft interactions.

7. **Automatic Management:** Most profile operations are handled automatically by JsMacros - direct method calls are rarely needed.

## Best Practices

1. **Error Monitoring:** Monitor the `Error` event to catch and handle script errors gracefully.

2. **Profile Organization:** Organize scripts into logical profiles based on functionality (e.g., "Mining", "Building", "Combat").

3. **Event Listening:** Use appropriate events for your script needs rather than continuous polling.

4. **Thread Awareness:** Be aware that some operations require thread safety - use the appropriate event types.

5. **Resource Management:** Profile switching automatically cleans up old event listeners and scripts.

6. **Error Links:** Take advantage of clickable error links in chat to quickly navigate to problematic code.

## Version History

- **1.0.3:** Initial profile management implementation
- **1.1.2:** Enhanced profile loading and error handling
- **1.2.7:** Added comprehensive event registration and improved error formatting
- **1.6.0:** Enhanced thread management and UI integration
- **Current:** Full client-side integration with Minecraft chat and error display