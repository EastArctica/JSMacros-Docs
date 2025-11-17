# EventRegistry

Manages the registration, organization, and execution of event listeners within the JsMacros event system. EventRegistry handles the central coordination of all event types, listener management, and script triggering mechanisms.

**Class:** `EventRegistry`
**Package:** `xyz.wagyourtail.jsmacros.client.event`
**Extends:** `BaseEventRegistry`
**Since:** 1.0.0

## Overview

EventRegistry is the central hub for JsMacros' event-driven architecture. It manages:

- Event listener registration and removal
- Script trigger management
- Event type organization
- Legacy event compatibility
- Event execution coordination
- Listener lifecycle management

While most script writers interact with events through the JsMacros library, EventRegistry handles the underlying coordination of the entire event system.

## Event Registration

### Script Trigger Registration

```js
// EventRegistry handles script trigger registration internally
// Script writers typically use JsMacros library instead

// Example: How EventRegistry processes script triggers
function demonstrateEventRegistration() {
    // When you create a script in JsMacros UI, EventRegistry:
    // 1. Registers the script trigger
    // 2. Sets up event listeners
    // 3. Coordinates execution context

    Chat.log("Event Registry manages script registration automatically");
}
```

### Event Type Management

```js
// EventRegistry maintains event type mappings
function exploreEventTypes() {
    // Get available event types through JsMacros
    const eventTypes = JsMacros.getEventTypes();

    Chat.log("Event Registry manages these event types:");
    eventTypes.forEach((eventType, index) => {
        Chat.log(`${index + 1}. ${eventType}`);
    });

    // Event Registry also handles:
    // - Event type validation
    // - Legacy event name mapping
    // - Event metadata management
}
```

## Listener Management

### Event Listener Lifecycle

```js
// EventRegistry manages listener lifecycle
function monitorListenerLifecycle() {
    Chat.log("Event Registry listener management:");

    // When a listener is added:
    // 1. Validated and registered
    // 2. Linked to script trigger
    // 3. Added to execution queue
    // 4. Monitored for errors

    // When a listener is removed:
    // 1. Unregistered from event system
    // 2. Resources cleaned up
    // 3. References removed

    // Event Registry ensures proper cleanup
    Chat.log("- Automatic listener cleanup");
    Chat.log("- Error handling and recovery");
    Chat.log("- Resource management");
}
```

### Listener Coordination

```js
// EventRegistry coordinates multiple listeners
function demonstrateListenerCoordination() {
    // Multiple listeners for same event
    JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
        Chat.log("First listener processed key");
    }));

    JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
        Chat.log("Second listener processed key");
    }));

    JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
        Chat.log("Third listener processed key");
    }));

    Chat.log("Event Registry coordinates all Key event listeners");
    Chat.log("- Execution order maintained");
    Chat.log("- Error isolation between listeners");
    Chat.log("- Performance optimization");
}
```

## Event System Integration

### Script Trigger Integration

```js
// EventRegistry integrates with script trigger system
function exploreTriggerIntegration() {
    Chat.log("Event Registry - Trigger Integration:");

    // Script Trigger Types:
    // 1. Event-based triggers
    // 2. Key-based triggers
    // 3. Command-based triggers

    // EventRegistry handles:
    // - Trigger registration
    // - Event-to-trigger mapping
    // - Script execution context
    // - Error propagation

    Chat.log("- Event triggers automatically registered");
    Chat.log("- Key triggers converted to Key events");
    Chat.log("- Execution context managed");
}
```

### Legacy Event Support

```js
// EventRegistry maintains backward compatibility
function demonstrateLegacySupport() {
    Chat.log("Event Registry - Legacy Support:");

    // Handles legacy event names
    const legacyEvents = [
        "PLAYER_JOIN",
        "PLAYER_LEAVE",
        "BLOCK_UPDATE",
        // ... other legacy names
    ];

    // EventRegistry automatically maps:
    // - Old event names to new ones
    // - Deprecated event signatures
    // - Changed event structures

    Chat.log("- Automatic legacy event name mapping");
    Chat.log("- Backward compatibility maintained");
    Chat.log("- Migration support provided");
}
```

## Advanced Event Management

### Event Monitoring

```js
// Monitor EventRegistry activity
function monitorEventRegistry() {
    const eventStats = {
        totalEvents: 0,
        byType: {},
        errors: 0
    };

    // Monitor all events
    JsMacros.on("*", JavaWrapper.methodToJava((event) => {
        if (!event || !event.getEventName) return;

        eventStats.totalEvents++;
        const eventName = event.getEventName();

        if (!eventStats.byType[eventName]) {
            eventStats.byType[eventName] = 0;
        }
        eventStats.byType[eventName]++;

        // Log periodic statistics
        if (eventStats.totalEvents % 100 === 0) {
            Chat.log(`Event Registry Stats: ${eventStats.totalEvents} events processed`);
        }
    }));

    return eventStats;
}
```

### Event Filter Registration

```js
// EventRegistry can apply event filters
function setupEventFilters() {
    // Filter events by type
    const keyEventFilter = JavaWrapper.methodToJava((event) => {
        if (event.getEventName === "Key") {
            // Only process specific keys
            return ['w', 'a', 's', 'd'].includes(event.key);
        }
        return true;
    });

    // EventRegistry handles filter application
    Chat.log("Event Registry supports event filtering");
    Chat.log("- Type-based filtering");
    Chat.log("- Conditional event processing");
    Chat.log("- Performance optimization through filtering");
}
```

## Performance and Optimization

### Event Execution Optimization

```js
// EventRegistry optimizes event execution
function exploreOptimizations() {
    Chat.log("Event Registry Performance Features:");

    // Execution optimizations:
    // 1. Listener grouping
    // 2. Execution queuing
    // 3. Error isolation
    // 4. Resource management

    Chat.log("- Efficient listener execution");
    Chat.log("- Automatic error recovery");
    Chat.log("- Memory usage optimization");
    Chat.log("- Thread management");
}
```

### Resource Management

```js
// EventRegistry manages system resources
function demonstrateResourceManagement() {
    Chat.log("Event Registry Resource Management:");

    // Resources managed:
    // 1. Listener references
    // 2. Script contexts
    // 3. Event queues
    // 4. Thread pools

    // Automatic cleanup:
    // - Stale listener removal
    // - Memory leak prevention
    // - Thread pool management
    // - Error recovery

    Chat.log("- Automatic resource cleanup");
    Chat.log("- Memory leak prevention");
    Chat.log("- Thread pool optimization");
    Chat.log("- Error state recovery");
}
```

## Debugging and Troubleshooting

### Event System Diagnostics

```js
// Diagnose EventRegistry state
function diagnoseEventRegistry() {
    Chat.log("Event Registry Diagnostics:");

    try {
        // Check event system health
        const eventTypes = JsMacros.getEventTypes();
        Chat.log(`Available event types: ${eventTypes.length}`);

        // Test event registration
        const testListener = JsMacros.on("Key", JavaWrapper.methodToJava(() => {
            Chat.log("Test event received");
        }));

        if (testListener) {
            Chat.log("Event registration: OK");
        } else {
            Chat.log("Event registration: FAILED");
        }

        // Check listener count
        const activeListeners = countActiveListeners();
        Chat.log(`Active listeners: ${activeListeners}`);

    } catch (error) {
        Chat.log(`Event Registry diagnosis error: ${error.message}`);
    }
}

function countActiveListeners() {
    // Estimate active listeners (conceptual)
    return JsMacros.getEventTypes().length * 2; // Rough estimate
}
```

### Error Recovery

```js
// EventRegistry handles error recovery
function demonstrateErrorRecovery() {
    Chat.log("Event Registry Error Recovery:");

    // Error scenarios handled:
    // 1. Listener throwing exceptions
    // 2. Script execution failures
    // 3. Resource exhaustion
    // 4. System integration issues

    // Recovery mechanisms:
    // - Listener isolation
    // - Automatic retry
    // - Graceful degradation
    // - Error logging

    Chat.log("- Listener error isolation");
    Chat.log("- Automatic error recovery");
    Chat.log("- Graceful degradation");
    Chat.log("- Comprehensive error logging");
}
```

## Usage Patterns

### Event System Monitoring

```js
// Comprehensive event system monitor
function createEventMonitor() {
    const monitor = {
        startTime: Date.now(),
        eventCounts: {},
        errorCount: 0,
        listenerCounts: {}
    };

    // Monitor all events
    JsMacros.on("*", JavaWrapper.methodToJava((event) => {
        if (!event || !event.getEventName) return;

        const eventName = event.getEventName();
        monitor.eventCounts[eventName] = (monitor.eventCounts[eventName] || 0) + 1;
    }));

    // Periodic reporting
    setInterval(() => {
        const uptime = Date.now() - monitor.startTime;
        const minutes = Math.floor(uptime / 60000);

        Chat.log(`=== Event Registry Monitor ===`);
        Chat.log(`Uptime: ${minutes} minutes`);
        Chat.log(`Total event types: ${Object.keys(monitor.eventCounts).length}`);
        Chat.log(`Errors encountered: ${monitor.errorCount}`);

        // Top event types
        const sortedEvents = Object.entries(monitor.eventCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        Chat.log("Top 5 event types:");
        sortedEvents.forEach(([name, count]) => {
            Chat.log(`  ${name}: ${count}`);
        });
    }, 30000); // Every 30 seconds

    return monitor;
}

// Start monitoring
const eventMonitor = createEventMonitor();
```

### Custom Event Management

```js
// Advanced custom event management
function setupCustomEventManagement() {
    Chat.log("Custom Event Management:");

    // Create custom event coordinator
    const customCoordinator = {
        events: [],
        listeners: [],

        registerEvent(eventData) {
            this.events.push({
                type: eventData.type,
                data: eventData,
                timestamp: Date.now()
            });
            Chat.log(`Registered custom event: ${eventData.type}`);
        },

        triggerListeners(eventType, data) {
            const matchingListeners = this.listeners.filter(l => l.eventType === eventType);
            matchingListeners.forEach(listener => {
                try {
                    listener.callback(data);
                } catch (error) {
                    Chat.log(`Custom event listener error: ${error.message}`);
                }
            });
        }
    };

    // Custom event registration
    customCoordinator.registerEvent({
        type: "CustomAlert",
        data: { message: "Test alert" }
    });

    return customCoordinator;
}
```

## Best Practices

1. **Use JsMacros Library**: Prefer JsMacros library methods over direct EventRegistry access
2. **Event Filtering**: Apply event filters to reduce unnecessary processing
3. **Error Handling**: Implement proper error handling in event listeners
4. **Resource Cleanup**: Clean up listeners when no longer needed
5. **Performance Monitoring**: Monitor event system performance for optimization
6. **Event Validation**: Validate event data before processing

## Related Classes

- **[BaseEventRegistry](event/base-event-registry.md)** - Base registry functionality
- **[EventListener](event-listener.md)** - Event listener management
- **[BaseEvent](base-event.md)** - Base event class
- **[JsMacros](../apis/js-macros.md)** - Main JsMacros library

## Implementation Notes

- EventRegistry is primarily internal to JsMacros
- Most functionality is exposed through JsMacros library
- EventRegistry manages the entire event system lifecycle
- Thread safety is built into the registry design
- Performance optimization is a primary concern
- Error recovery mechanisms are comprehensive

## Error Handling

```js
function safeEventRegistryOperations() {
    try {
        // Safe event system operations
        const eventTypes = JsMacros.getEventTypes();
        Chat.log(`Event registry accessible: ${eventTypes.length > 0}`);

        // Test event registration
        const testListener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
            // Safe tick processing
        }));

        if (testListener) {
            Chat.log("Event registry functioning correctly");
        }

    } catch (error) {
        Chat.log(`Event registry error: ${error.message}`);
        Chat.getLogger().error("Event registry error", error);
    }
}

// Monitor registry health
function monitorRegistryHealth() {
    setInterval(() => {
        try {
            // Check if event system is responsive
            const eventCount = JsMacros.getEventTypes().length;
            Chat.log(`Event registry health: ${eventCount} event types available`);
        } catch (error) {
            Chat.log(`Event registry health check failed: ${error.message}`);
        }
    }, 60000); // Every minute
}
```