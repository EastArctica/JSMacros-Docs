# EventListener

Handles the execution of scripts in response to specific events. EventListener connects script triggers to events and manages the script execution context, providing the bridge between Minecraft events and user scripts.

**Class:** `EventListener`
**Package:** `xyz.wagyourtail.jsmacros.core.event`
**Extends:** `BaseListener`
**Since:** 1.0.0

## Overview

EventListener is a crucial component that executes scripts when specific events occur. It acts as the bridge between:

- **Script Triggers** - User-defined event configurations
- **Events** - Minecraft and JsMacros events
- **Script Execution** - Running the actual script code

Each script registered in JsMacros gets an EventListener instance that handles its execution when the configured events occur.

## Listener Creation and Lifecycle

### Script Trigger Association

```js
// EventListeners are created automatically when you register scripts
// Through the JsMacros UI or programmatically

// Example: How EventListener connects to script triggers
function demonstrateEventListenerCreation() {
    Chat.log("EventListener creation process:");

    // When you create a script event trigger:
    // 1. ScriptTrigger object is created with event type and script file
    // 2. EventListener instance is created to wrap the trigger
    // 3. EventListener is registered with EventRegistry
    // 4. EventListener waits for specified events

    Chat.log("1. ScriptTrigger created with event configuration");
    Chat.log("2. EventListener wraps the trigger");
    Chat.log("3. Registered with EventRegistry");
    Chat.log("4. Ready to respond to events");
}
```

### Event Processing

```js
// EventListener processes events and executes scripts
function demonstrateEventProcessing() {
    Chat.log("EventListener event processing:");

    // Event flow:
    // 1. Event occurs (e.g., key press, chat message)
    // 2. EventRegistry notifies relevant EventListeners
    // 3. EventListener checks if event matches trigger criteria
    // 4. If match, EventListener executes the associated script
    // 5. Script runs with event data as input

    Chat.log("- Event matching and filtering");
    Chat.log("- Script context creation");
    Chat.log("- Script execution coordination");
    Chat.log("- Error handling and recovery");
}
```

## Event Handling

### Event Triggering

```js
// EventListener receives and processes events
function simulateEventTriggering() {
    // When an event occurs, EventListener:
    const eventProcessing = {
        event: "Key",
        data: { key: "key.keyboard.w" },

        process() {
            // 1. Validate event data
            if (!this.validateEvent()) {
                return false;
            }

            // 2. Check trigger conditions
            if (!this.checkConditions()) {
                return false;
            }

            // 3. Execute script
            return this.executeScript();
        },

        validateEvent() {
            Chat.log(`Validating event: ${this.event}`);
            return true;
        },

        checkConditions() {
            Chat.log(`Checking conditions for: ${this.data.key}`);
            return true;
        },

        executeScript() {
            Chat.log(`Executing script for: ${this.event}`);
            return true;
        }
    };

    return eventProcessing.process();
}
```

### Script Execution Context

```js
// EventListener manages script execution context
function exploreExecutionContext() {
    Chat.log("EventListener manages execution context:");

    // Context includes:
    const executionContext = {
        event: null,           // The triggering event
        script: null,          // Script to execute
        environment: {},       // Script environment variables
        permissions: {},       // Script permissions
        errorHandling: true,   // Error handling enabled
        timeout: 5000         // Execution timeout (ms)
    };

    // EventListener provides:
    // - Safe script execution environment
    // - Error isolation
    // - Resource management
    // - Timeout protection

    Chat.log("- Safe execution environment");
    Chat.log("- Error isolation and recovery");
    Chat.log("- Resource cleanup");
    Chat.log("- Execution timeout protection");
}
```

## Advanced Listener Features

### Event Filtering

```js
// EventListener can filter events before execution
function demonstrateEventFiltering() {
    Chat.log("EventListener event filtering:");

    // Filter types supported:
    const eventFilters = {
        // Event type filtering
        eventType: (event) => event.getEventName === "Key",

        // Event data filtering
        eventData: (event) => event.key === "key.keyboard.w",

        // Conditional filtering
        conditional: (event) => {
            return Player.getPlayer().getHealth() > 10;
        },

        // Complex filtering
        complex: (event) => {
            return event.getEventName === "Key" &&
                   event.key.startsWith("key.keyboard") &&
                   !event.isCancelled();
        }
    };

    Chat.log("- Event type filtering");
    Chat.log("- Event data filtering");
    Chat.log("- Conditional logic filtering");
    Chat.log("- Complex composite filtering");
}
```

### Error Handling

```js
// EventListener provides robust error handling
function demonstrateErrorHandling() {
    Chat.log("EventListener error handling:");

    // Error scenarios handled:
    const errorHandling = {
        scriptSyntaxError: {
            error: "Syntax error in script",
            action: "Log error and continue"
        },

        scriptRuntimeError: {
            error: "Runtime error during execution",
            action: "Catch and log error"
        },

        timeoutError: {
            error: "Script execution timeout",
            action: "Terminate script and log"
        },

        resourceError: {
            error: "Resource allocation failure",
            action: "Cleanup and report"
        }
    };

    // Error handling features:
    Chat.log("- Syntax error detection");
    Chat.log("- Runtime exception handling");
    Chat.log("- Execution timeout management");
    Chat.log("- Resource error recovery");
    Chat.log("- Comprehensive error logging");
}
```

## Performance and Optimization

### Execution Optimization

```js
// EventListener optimizes script execution
function explorePerformanceOptimizations() {
    Chat.log("EventListener performance optimizations:");

    // Optimization features:
    const optimizations = {
        // Lazy loading of script context
        lazyLoading: "Load resources only when needed",

        // Event filtering before execution
        preFiltering: "Filter events before expensive operations",

        // Caching of compiled scripts
        scriptCaching: "Cache compiled script for repeated execution",

        // Resource pooling
        resourcePooling: "Reuse execution contexts",

        // Asynchronous execution
        asyncExecution: "Non-blocking script execution"
    };

    Object.entries(optimizations).forEach(([feature, description]) => {
        Chat.log(`- ${feature}: ${description}`);
    });
}
```

### Resource Management

```js
// EventListener manages execution resources efficiently
function demonstrateResourceManagement() {
    Chat.log("EventListener resource management:");

    // Resources managed:
    const resources = {
        scriptContext: "Script execution context",
        memory: "Memory allocation and cleanup",
        threads: "Thread pool usage",
        fileHandles: "File handle management",
        networkConnections: "Network resource cleanup"
    };

    // Management strategies:
    const managementStrategies = {
        automatic: "Automatic resource cleanup",
        pooling: "Resource reuse and pooling",
        monitoring: "Resource usage monitoring",
        limits: "Resource usage limits",
        cleanup: "Explicit cleanup on completion"
    };

    Chat.log("Resources managed:");
    Object.keys(resources).forEach(resource => {
        Chat.log(`- ${resource}: ${resources[resource]}`);
    });

    Chat.log("Management strategies:");
    Object.keys(managementStrategies).forEach(strategy => {
        Chat.log(`- ${strategy}: ${managementStrategies[strategy]}`);
    });
}
```

## Debugging and Monitoring

### Listener State Monitoring

```js
// Monitor EventListener state and performance
function createListenerMonitor() {
    const monitor = {
        listeners: [],
        stats: {
            totalExecutions: 0,
            successfulExecutions: 0,
            errors: 0,
            averageExecutionTime: 0
        },

        trackListener(listener) {
            this.listeners.push({
                id: listener.id,
                eventType: listener.eventType,
                scriptFile: listener.scriptFile,
                enabled: listener.enabled,
                lastExecution: null,
                executionCount: 0
            });
        },

        recordExecution(listenerId, success, executionTime) {
            this.stats.totalExecutions++;

            if (success) {
                this.stats.successfulExecutions++;
            } else {
                this.stats.errors++;
            }

            // Update average execution time
            this.stats.averageExecutionTime =
                (this.stats.averageExecutionTime * (this.stats.totalExecutions - 1) + executionTime)
                / this.stats.totalExecutions;

            // Update specific listener
            const listener = this.listeners.find(l => l.id === listenerId);
            if (listener) {
                listener.lastExecution = Date.now();
                listener.executionCount++;
            }
        },

        generateReport() {
            Chat.log("=== EventListener Monitor Report ===");
            Chat.log(`Total executions: ${this.stats.totalExecutions}`);
            Chat.log(`Success rate: ${Math.round(this.stats.successfulExecutions / this.stats.totalExecutions * 100)}%`);
            Chat.log(`Average execution time: ${Math.round(this.stats.averageExecutionTime)}ms`);
            Chat.log(`Active listeners: ${this.listeners.length}`);
        }
    };

    // Generate periodic reports
    setInterval(() => monitor.generateReport(), 60000); // Every minute

    return monitor;
}

// Start monitoring
const listenerMonitor = createListenerMonitor();
```

### Execution Tracing

```js
// Trace EventListener execution for debugging
function setupExecutionTracing() {
    Chat.log("Setting up EventListener execution tracing:");

    const traceLog = [];

    // Trace event listener execution
    function traceExecution(listenerId, event, startTime, endTime, success, error) {
        const trace = {
            timestamp: Date.now(),
            listenerId: listenerId,
            eventType: event?.getEventName?.(),
            executionTime: endTime - startTime,
            success: success,
            error: error?.message
        };

        traceLog.push(trace);

        // Log recent traces
        if (traceLog.length % 10 === 0) {
            Chat.log(`Execution trace: ${traceLog.length} executions logged`);
        }

        // Log errors immediately
        if (!success) {
            Chat.log(`Listener ${listenerId} error: ${error.message}`);
        }
    }

    return traceLog;
}

const executionTrace = setupExecutionTracing();
```

## Usage Patterns

### Custom Listener Management

```js
// Advanced custom listener management
function createCustomListenerManager() {
    const manager = {
        listeners: new Map(),
        nextId: 1,

        createListener(eventType, scriptFile, options = {}) {
            const listener = {
                id: this.nextId++,
                eventType: eventType,
                scriptFile: scriptFile,
                enabled: options.enabled !== false,
                priority: options.priority || 0,
                filters: options.filters || [],
                created: Date.now()
            };

            this.listeners.set(listener.id, listener);
            Chat.log(`Created listener ${listener.id} for ${eventType}`);

            return listener.id;
        },

        enableListener(listenerId) {
            const listener = this.listeners.get(listenerId);
            if (listener) {
                listener.enabled = true;
                Chat.log(`Enabled listener ${listenerId}`);
            }
        },

        disableListener(listenerId) {
            const listener = this.listeners.get(listenerId);
            if (listener) {
                listener.enabled = false;
                Chat.log(`Disabled listener ${listenerId}`);
            }
        },

        removeListener(listenerId) {
            if (this.listeners.delete(listenerId)) {
                Chat.log(`Removed listener ${listenerId}`);
            }
        },

        getActiveListeners() {
            return Array.from(this.listeners.values()).filter(l => l.enabled);
        }
    };

    return manager;
}

// Usage
const listenerManager = createCustomListenerManager();
const listenerId = listenerManager.createListener("Key", "my_script.js", {
    enabled: true,
    priority: 1,
    filters: [(event) => event.key === "key.keyboard.w"]
});
```

### Performance Monitoring

```js
// Comprehensive EventListener performance monitoring
function createPerformanceMonitor() {
    const monitor = {
        metrics: {
            executionTimes: [],
            errorRates: new Map(),
            listenerStats: new Map(),
            systemLoad: []
        },

        recordExecution(listenerId, executionTime, success) {
            // Record execution time
            this.metrics.executionTimes.push({
                listenerId: listenerId,
                time: executionTime,
                timestamp: Date.now()
            });

            // Keep only recent metrics
            if (this.metrics.executionTimes.length > 1000) {
                this.metrics.executionTimes = this.metrics.executionTimes.slice(-500);
            }

            // Update listener stats
            const stats = this.metrics.listenerStats.get(listenerId) ||
                         { executions: 0, errors: 0, totalTime: 0 };

            stats.executions++;
            stats.totalTime += executionTime;
            if (!success) stats.errors++;

            this.metrics.listenerStats.set(listenerId, stats);
        },

        generateReport() {
            Chat.log("=== EventListener Performance Report ===");

            // Overall statistics
            const allStats = Array.from(this.metrics.listenerStats.values());
            const totalExecutions = allStats.reduce((sum, s) => sum + s.executions, 0);
            const totalErrors = allStats.reduce((sum, s) => sum + s.errors, 0);
            const avgTime = allStats.reduce((sum, s) => sum + s.totalTime, 0) / totalExecutions;

            Chat.log(`Total executions: ${totalExecutions}`);
            Chat.log(`Error rate: ${Math.round(totalErrors / totalExecutions * 100)}%`);
            Chat.log(`Average execution time: ${Math.round(avgTime)}ms`);

            // Top performers
            const sortedByExecutions = Array.from(this.metrics.listenerStats.entries())
                .sort(([,a], [,b]) => b.executions - a.executions)
                .slice(0, 5);

            Chat.log("Most active listeners:");
            sortedByExecutions.forEach(([id, stats]) => {
                Chat.log(`  Listener ${id}: ${stats.executions} executions`);
            });
        }
    };

    // Generate periodic reports
    setInterval(() => monitor.generateReport(), 120000); // Every 2 minutes

    return monitor;
}

const performanceMonitor = createPerformanceMonitor();
```

## Best Practices

1. **Efficient Filtering**: Use event filters to reduce unnecessary script execution
2. **Error Handling**: Implement robust error handling in scripts
3. **Resource Management**: Clean up resources in scripts to prevent memory leaks
4. **Performance Monitoring**: Monitor execution performance for optimization
5. **Timeout Management**: Avoid long-running scripts that may time out
6. **Event Validation**: Validate event data before processing

## Related Classes

- **[BaseListener](event/base-listener.md)** - Base listener functionality
- **[EventRegistry](event-registry.md)** - Event system management
- **[BaseEvent](base-event.md)** - Base event class
- **[EventContainer](event-container.md)** - Event execution context

## Implementation Notes

- EventListener is primarily internal to JsMacros
- Most interactions are through JsMacros library
- EventListener manages script lifecycle and execution
- Performance and error handling are built-in priorities
- Resource management is automatic and comprehensive
- Debugging and monitoring capabilities are extensive

## Error Handling

```js
function safeEventListenerOperations() {
    try {
        // Safe event listener operations
        const eventTypes = JsMacros.getEventTypes();
        Chat.log(`Event system accessible: ${eventTypes.length > 0}`);

        // Test listener creation
        const testListener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
            // Safe tick processing
        }));

        if (testListener) {
            Chat.log("EventListener system functioning correctly");
        }

    } catch (error) {
        Chat.log(`EventListener error: ${error.message}`);
        Chat.getLogger().error("EventListener error", error);
    }
}

// Monitor listener health
function monitorListenerHealth() {
    setInterval(() => {
        try {
            // Check if event system is responsive
            const contexts = JsMacros.getContexts();
            Chat.log(`Listener system health: ${contexts.size} active contexts`);
        } catch (error) {
            Chat.log(`Listener health check failed: ${error.message}`);
        }
    }, 60000); // Every minute
}
```