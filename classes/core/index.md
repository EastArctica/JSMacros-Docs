# JsMacros Core System Classes

The core system classes provide the foundational infrastructure that powers JsMacros. These classes work behind the scenes to manage the entire script execution environment, event system, and integration with Minecraft.

## Foundation Classes

### [BaseHelper](base-helper.md)
The foundational base class for all JsMacros helper classes. Provides the core functionality that all specific helper classes (EntityHelper, ItemStackHelper, etc.) inherit from. BaseHelper wraps raw Minecraft objects and provides consistent behavior across all helper implementations.

**Key Features:**
- Raw object access through `getRaw()`
- Consistent equality and hashing
- Type-safe generic design
- Foundation for all helper classes

## Core System Classes

### [Core](core.md)
The main JsMacros core system that manages all library functionality, event handling, configuration, and script execution. While primarily internal, some aspects are accessible through the JsMacros library.

**Key Features:**
- Library registry and loading
- Event system coordination
- Profile management
- Extension system management
- Thread pool for script execution

### [Profile](profile.md)
Manages JsMacros profiles, configuration, script execution, and error handling. The Profile class handles the overall JsMacros runtime state, including macro management, script triggering, and system integration.

**Key Features:**
- Profile management and switching
- Script execution coordination
- Error logging and display
- Thread stack management
- Configuration persistence

## Library Classes (Available in Scripts)

### [World](world.md)
Provides access to world data, entities, blocks, and various world-related operations. The World library allows scripts to interact with the Minecraft world, including block detection, entity searching, and world scanning.

**Key Features:**
- Block information and searching
- Entity detection and filtering
- World scanning and iteration
- Server performance statistics
- Scoreboard and game data access

### [Player](player.md)
Provides access to player state, inventory, movement, interactions, and various player-related operations. The Player library allows scripts to control and monitor the local player character.

**Key Features:**
- Player state and properties
- Inventory management
- Movement control and automation
- Game mode management
- Screenshot and media capture

### [Chat](chat.md)
Provides access to chat communication, message display, command management, and various text-related operations. The Chat library allows scripts to send messages, display formatted text, and manage chat functionality.

**Key Features:**
- Message sending and display
- Text component creation and formatting
- Title, toast, and actionbar display
- Command system access
- Color code handling

## Event System Classes

### [BaseEvent](base-event.md)
The foundational base class for all JsMacros events. Provides core event functionality including cancellation capabilities, event metadata access, and triggering mechanisms.

**Key Features:**
- Event cancellation support
- Event identification and metadata
- Joinable event support
- Profile integration

### [EventContainer](event-container.md)
Manages the execution context and lifecycle of event-driven scripts. Provides control over script execution, thread management, and synchronization for event handling.

**Key Features:**
- Thread synchronization and locking
- Script execution lifecycle
- Event coordination and timing
- Context preservation

### [EventRegistry](event-registry.md)
Manages the registration, organization, and execution of event listeners within the JsMacros event system. Handles the central coordination of all event types and listener management.

**Key Features:**
- Event listener registration
- Script trigger management
- Event type organization
- Legacy event compatibility

### [EventListener](event-listener.md)
Handles the execution of scripts in response to specific events. Acts as the bridge between script triggers and events, managing the script execution context.

**Key Features:**
- Script execution coordination
- Event processing and filtering
- Error handling and recovery
- Performance optimization

## Usage Patterns

### Direct Script Usage

The library classes (World, Player, Chat) are directly available in all scripts:

```js
// World operations
const block = World.getBlock(Player.getPlayer().getX(), Player.getPlayer().getY(), Player.getPlayer().getZ());

// Player operations
const inventory = Player.openInventory();
const health = Player.getPlayer().getHealth();

// Chat operations
Chat.log("Hello, World!");
Chat.say("/gamemode creative");
```

### Event Handling

Event system classes are primarily used internally but can be accessed through event parameters:

```js
JsMacros.on("Key", JavaWrapper.methodToJava((event, container) => {
    // BaseEvent methods
    Chat.log(`Event: ${event.getEventName()}`);
    Chat.log(`Can cancel: ${event.cancellable()}`);

    // EventContainer access (advanced)
    if (container) {
        Chat.log(`Container locked: ${container.isLocked()}`);
    }
}));
```

### Advanced Access

Core system classes are typically accessed through the JsMacros library:

```js
// Core access
const core = JsMacros.core;

// Profile access
const profile = JsMacros.profile;
const isMainThread = profile.checkJoinedThreadStack();

// Event system access
const contexts = JsMacros.getContexts();
const profiles = JsMacros.getProfiles();
```

## Class Relationships

```
Core System
├── Core (main coordinator)
├── Profile (runtime management)
└── BaseHelper (foundation)
    └── All Helper Classes

Event System
├── BaseEvent (event foundation)
├── EventRegistry (listener management)
├── EventListener (script execution)
└── EventContainer (execution context)

Library Classes (Available in Scripts)
├── World (world interaction)
├── Player (player control)
└── Chat (communication)
```

## Best Practices

### For Script Writers

1. **Use Library Classes**: Prefer World, Player, and Chat libraries for common operations
2. **Event Handling**: Use JsMacros.on() for event registration
3. **Error Handling**: Always validate return values and handle exceptions
4. **Performance**: Avoid expensive operations in frequently triggered events
5. **Resource Management**: Clean up resources created during script execution

### For Advanced Users

1. **Core Access**: Use JsMacros library for core system access
2. **Event System**: Understand BaseEvent methods for advanced event handling
3. **Profile Management**: Use JsMacros for profile operations
4. **Monitoring**: Monitor script contexts and performance through JsMacros
5. **Debugging**: Use profile error handling and logging capabilities

## Integration Points

### With Helper Classes

Core system classes provide the foundation that helper classes build upon:

```js
// Helper classes extend BaseHelper
const entity = event.entity; // EntityHelper extends BaseHelper
const rawEntity = entity.getRaw(); // BaseHelper method

// Core system manages event execution
JsMacros.on("AttackEntity", JavaWrapper.methodToJava((event) => {
    // Event extends BaseEvent
    if (event.cancellable()) {
        event.cancel(); // BaseEvent method
    }
}));
```

### With Configuration System

Profile and Core manage configuration and persistence:

```js
// Profile manages script configuration
const config = JsMacros.getProfileConfig();

// Core manages library registry
const libraries = JsMacros.getAvailableLibraries();
```

## Error Handling and Debugging

### Common Error Sources

1. **Null Returns**: Always check for null from methods like World.getBlock()
2. **Thread Safety**: Be aware of thread stack management
3. **Event Cancellation**: Check cancellable() before calling cancel()
4. **Resource Limits**: Monitor script contexts and resource usage

### Debugging Tools

```js
// Check system state
function debugSystemState() {
    Chat.log(`Core available: ${JsMacros.core != null}`);
    Chat.log(`Profile available: ${JsMacros.profile != null}`);
    Chat.log(`Active contexts: ${JsMacros.getContexts().size}`);
    Chat.log(`Available profiles: ${JsMacros.getProfiles().length}`);
}

// Monitor event processing
let eventCount = 0;
JsMacros.on("*", JavaWrapper.methodToJava((event) => {
    eventCount++;
    if (eventCount % 100 === 0) {
        Chat.log(`Processed ${eventCount} events`);
    }
}));
```

## Performance Considerations

### Core System

- **Thread Management**: Core manages thread pools efficiently
- **Memory Usage**: Profile handles resource cleanup automatically
- **Event Processing**: EventRegistry optimizes listener execution
- **Script Execution**: EventListener provides timeout protection

### Library Classes

- **World Operations**: Use filtering to reduce expensive searches
- **Player Operations**: Cache frequently accessed player data
- **Chat Operations**: Batch multiple messages when possible
- **Event Handlers**: Keep event handlers lightweight

## Migration and Compatibility

### Version Compatibility

Core system classes maintain backward compatibility:

- **Legacy Events**: EventRegistry handles legacy event name mapping
- **Helper Evolution**: BaseHelper provides consistent interface
- **Profile Migration**: Profile supports configuration migration
- **Library Stability**: Core libraries maintain API stability

### Best Practices for Upgrades

1. **Test Event Handlers**: Verify event handling after updates
2. **Check Helper Methods**: Review helper class changes
3. **Profile Configuration**: Backup profiles before major updates
4. **Script Compatibility**: Test scripts with new JsMacros versions
5. **Performance Monitoring**: Monitor for performance changes

## Future Development

The core system classes are designed for extensibility:

- **New Libraries**: Core registry supports adding new libraries
- **Custom Events**: BaseEvent supports custom event types
- **Helper Extensions**: BaseHelper enables new helper classes
- **Profile Features**: Profile system allows for new configuration options

This foundation ensures that JsMacros can continue to evolve while maintaining backward compatibility and performance.