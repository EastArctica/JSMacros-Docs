# EventFilterer$Compound

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.event.EventFilterer$Compound`

**Package:** `xyz.wagyourtail.jsmacros.core.event`

**Since:** 1.9.1

## Overview

The `EventFilterer$Compound` interface is a specialized interface within the EventFilterer system that defines filters capable of being combined with other filters using logical operations. This interface is implemented by filter classes that can participate in complex filtering compositions, allowing scripts to create sophisticated event filtering logic using AND, OR, and NOT operations.

Filters implementing this interface can be combined using methods like `JsMacros.createComposedEventFilterer()` and `JsMacros.invertEventFilterer()`, enabling the creation of compound filters that can evaluate multiple conditions simultaneously. This is essential for building complex event processing systems that need to handle multiple criteria in a single, efficient filter operation.

## Interface Definition

```java
public interface Compound extends EventFilterer {
    void checkCyclic(EventFilterer.Compound base);
}
```

## Interface Methods

### `checkCyclic(base)`
**Parameters:**
- `base` (`EventFilterer.Compound`) - The base compound filter to check against for cyclic references

**Returns:** `void`

**Throws:** `IllegalArgumentException` - If a cyclic reference is detected

This method is used to detect and prevent infinite loops in compound filter chains by checking if a filter references itself either directly or indirectly through other compound filters.

**Example:**
```javascript
// This method is typically used internally by JsMacros
// when combining filters to prevent infinite loops

// Example of what would cause a cyclic reference (this is prevented internally):
const filterA = JsMacros.createEventFilterer("RecvMessage");
const composed = JsMacros.createComposedEventFilterer(filterA);
// composed.and(composed); // This would be detected as cyclic
```

## Core Interface Inheritance

As an extension of `EventFilterer`, this interface inherits all the base methods:

### `canFilter(event)`
**Parameters:** `event` (String) - The event name to check
**Returns:** `boolean` - `true` if the filterer can handle this event type

### `test(event)`
**Parameters:** `event` (BaseEvent) - The event to test
**Returns:** `boolean` - `true` if the event should be processed, `false` if it should be filtered out

## Implementing Classes

### FiltererComposed
Implements the Compound interface for combining multiple filters with AND/OR logic.

```javascript
// FiltererComposed example
const chatFilter = JsMacros.createEventFilterer("RecvMessage");
const commandFilter = JsMacros.createEventFilterer("RecvMessage");

const composed = JsMacros.createComposedEventFilterer(chatFilter)
    .or(commandFilter);
// composed implements EventFilterer.Compound
```

### FiltererInverted
Implements the Compound interface for inverting another filter's logic.

```javascript
// FiltererInverted example
const movementFilter = JsMacros.createEventFilterer("SendPacket").setType("PlayerMoveC2SPacket");
const inverted = JsMacros.invertEventFilterer(movementFilter);
// inverted implements EventFilterer.Compound
```

## Usage Examples

### Example 1: Creating Custom Compound Filters
```javascript
function createAdvancedChatFilter() {
    // Base filters
    const chatFilter = JsMacros.createEventFilterer("RecvMessage").setUsername("Notch");
    const commandFilter = JsMacros.createEventFilterer("RecvMessage").setMessageType("command");
    const systemFilter = JsMacros.createEventFilterer("RecvMessage").setSystem(true);

    // Create compound filter using AND/OR logic
    const importantFilter = JsMacros.createComposedEventFilterer(chatFilter)
        .or(commandFilter);

    // Invert a filter to exclude system messages
    const nonSystemFilter = JsMacros.invertEventFilterer(systemFilter);

    // Combine multiple conditions
    const finalFilter = JsMacros.createComposedEventFilterer(importantFilter)
        .and(nonSystemFilter);

    // All these filters implement EventFilterer.Compound
    return finalFilter;
}

// Use the compound filter
const advancedFilter = createAdvancedChatFilter();
JsMacros.on("RecvMessage", advancedFilter, JavaWrapper.methodToJava((event) => {
    Chat.log(`Important message from ${event.username}: ${event.message}`);
}));
```

### Example 2: Complex Event Monitoring System
```javascript
function createMonitoringSystem() {
    // Security-related filters
    const hostileSpawnFilter = JsMacros.createEventFilterer("EntitySpawn").setHostile(true);
    const griefingFilter = JsMacros.createEventFilterer("BlockUpdate").setDestruction(true);
    const chestOpenFilter = JsMacros.createEventFilterer("ScreenOpen").setScreenName("GenericContainerScreen");

    // Player action filters
    const movementFilter = JsMacros.createEventFilterer("SendPacket").setType("PlayerMoveC2SPacket");
    const chatFilter = JsMacros.createEventFilterer("SendPacket").setType("ChatMessageC2SPacket");

    // Create compound filters for different monitoring scenarios
    const securityAlert = JsMacros.createComposedEventFilterer(hostileSpawnFilter)
        .or(griefingFilter)
        .or(chestOpenFilter);

    const suspiciousActivity = JsMacros.createComposedEventFilterer(securityAlert)
        .and(movementFilter); // Movement near security events

    const normalActivity = JsMacros.createComposedEventFilterer(chatFilter)
        .or(movementFilter);

    return {
        security: securityAlert,
        suspicious: suspiciousActivity,
        normal: normalActivity
    };
}

const monitoringFilters = createMonitoringSystem();

// Security monitoring
JsMacros.on("EntitySpawn", monitoringFilters.security, JavaWrapper.methodToJava((event) => {
    Chat.log(`🚨 Security alert: ${event.getEntity().getType()} spawned nearby`);
}));

JsMacros.on("BlockUpdate", monitoringFilters.security, JavaWrapper.methodToJava((event) => {
    Chat.log(`🚨 Security alert: Block destruction detected at ${event.getBlockPos()}`);
}));
```

### Example 3: Performance-Optimized Event Filtering
```javascript
function createPerformanceFilters() {
    // High-frequency events that need rate limiting
    const movementFilter = JsMacros.createEventFilterer("SendPacket").setType("PlayerMoveC2SPacket");
    const tickFilter = JsMacros.createEventFilterer("Tick");

    // Apply modulus filter for rate limiting
    const movementMod = JsMacros.createModulusEventFilterer(10); // Every 10th movement packet
    const tickMod = JsMacros.createModulusEventFilterer(20); // Every 20th tick

    // Combine with other conditions
    const optimizedMovement = JsMacros.createComposedEventFilterer(movementFilter)
        .and(movementMod);

    const optimizedTick = JsMacros.createComposedEventFilterer(tickFilter)
        .and(tickMod);

    // Invert filters for "everything except" conditions
    const nonMovementPackets = JsMacros.invertEventFilterer(movementFilter);

    return {
        movement: optimizedMovement,
        tick: optimizedTick,
        otherPackets: nonMovementPackets
    };
}

const perfFilters = createPerformanceFilters();

// Efficient movement tracking
JsMacros.on("SendPacket", perfFilters.movement, JavaWrapper.methodToJava((event) => {
    // Only processes every 10th movement packet
    Chat.actionbar(`Position: ${event.player.getPos()}`);
}));

// Tick-based operations (every 20th tick = once per second)
JsMacros.on("Tick", perfFilters.tick, JavaWrapper.methodToJava((event) => {
    const player = Player.getPlayer();
    if (player) {
        Chat.log(`Health: ${player.getHealth()}, Hunger: ${player.getHunger()}`);
    }
}));
```

### Example 4: Dynamic Filter Composition
```javascript
class DynamicEventFilter {
    constructor(baseEvent) {
        this.baseEvent = baseEvent;
        this.baseFilter = JsMacros.createEventFilterer(baseEvent);
        this.conditions = [];
        this.composedFilter = null;
        this.invertedFilter = null;
    }

    // Add a condition using AND logic
    addCondition(filter) {
        this.conditions.push({ type: 'and', filter: filter });
        this.rebuildFilter();
        return this;
    }

    // Add a condition using OR logic
    addOrCondition(filter) {
        this.conditions.push({ type: 'or', filter: filter });
        this.rebuildFilter();
        return this;
    }

    // Rebuild the composed filter
    rebuildFilter() {
        if (this.conditions.length === 0) {
            this.composedFilter = this.baseFilter;
            return;
        }

        // Start with the first condition
        let current = this.baseFilter;
        const firstCondition = this.conditions[0];

        if (firstCondition.type === 'or') {
            current = JsMacros.createComposedEventFilterer(current)
                .or(firstCondition.filter);
        } else {
            current = JsMacros.createComposedEventFilterer(current)
                .and(firstCondition.filter);
        }

        // Apply remaining conditions
        for (let i = 1; i < this.conditions.length; i++) {
            const condition = this.conditions[i];
            if (condition.type === 'or') {
                current = JsMacros.createComposedEventFilterer(current)
                    .or(condition.filter);
            } else {
                current = JsMacros.createComposedEventFilterer(current)
                    .and(condition.filter);
            }
        }

        this.composedFilter = current;
    }

    // Get the inverted version
    invert() {
        if (!this.composedFilter) {
            this.rebuildFilter();
        }
        this.invertedFilter = JsMacros.invertEventFilterer(this.composedFilter);
        return this.invertedFilter;
    }

    // Get the current filter
    getFilter() {
        if (!this.composedFilter) {
            this.rebuildFilter();
        }
        return this.composedFilter;
    }

    // Check if this is a compound filter
    isCompound() {
        return this.conditions.length > 0;
    }
}

// Usage example
const chatFilter = new DynamicEventFilter("RecvMessage")
    .addOrCondition(JsMacros.createEventFilterer("RecvMessage").setUsername("Notch"))
    .addOrCondition(JsMacros.createEventFilterer("RecvMessage").setUsername("Dinnerbone"))
    .addCondition(JsMacros.invertEventFilterer(
        JsMacros.createEventFilterer("RecvMessage").setSystem(true)
    ));

JsMacros.on("RecvMessage", chatFilter.getFilter(), JavaWrapper.methodToJava((event) => {
    Chat.log(`VIP message from ${event.username}: ${event.message}`);
}));
```

### Example 5: Filter Validation and Analysis
```javascript
function analyzeCompoundFilter(filter) {
    const analysis = {
        isCompound: false,
        canFilterEvents: [],
        depth: 0,
        complexity: "simple"
    };

    // Check if filter implements Compound interface
    if (filter && typeof filter.checkCyclic === 'function') {
        analysis.isCompound = true;
        analysis.complexity = "compound";
    }

    // Test filtering capabilities
    const testEvents = ["RecvMessage", "SendPacket", "EntitySpawn", "BlockUpdate"];

    testEvents.forEach(eventName => {
        if (filter.canFilter(eventName)) {
            analysis.canFilterEvents.push(eventName);
        }
    });

    // Additional analysis based on filter type
    if (analysis.isCompound) {
        // Test for cyclic references (this is handled internally)
        try {
            filter.checkCyclic(filter);
            analysis.depth = "no-cycles-detected";
        } catch (e) {
            analysis.depth = "cycles-detected";
        }
    }

    return analysis;
}

// Example usage
const testFilter = JsMacros.createComposedEventFilterer(
    JsMacros.createEventFilterer("RecvMessage")
).or(JsMacros.createEventFilterer("SendPacket"));

const filterAnalysis = analyzeCompoundFilter(testFilter);
Chat.log("=== Filter Analysis ===");
Chat.log(`Is compound: ${filterAnalysis.isCompound}`);
Chat.log(`Complexity: ${filterAnalysis.complexity}`);
Chat.log(`Can filter: ${filterAnalysis.canFilterEvents.join(", ")}`);
Chat.log(`Cyclic analysis: ${filterAnalysis.depth}`);
```

## Important Notes

### Interface Implementation

1. **Cyclic Detection:** All implementing classes must prevent infinite loops in filter chains
2. **Performance:** Compound filters should maintain good performance characteristics
3. **Thread Safety:** Filter evaluation should be thread-safe for concurrent event processing

### Filter Composition

1. **Logical Operations:** Compound filters support AND, OR, and NOT operations
2. **Nesting:** Filters can be nested to create complex logical expressions
3. **Event Compatibility:** Compound filters can only filter events compatible with all component filters

### Error Prevention

1. **Cyclic References:** The interface provides mechanisms to detect and prevent infinite loops
2. **Type Compatibility:** Implementations should validate event type compatibility
3. **Null Safety:** Implementations should handle null values gracefully

## Best Practices

1. **Filter Composition:** Use compound filters to create readable and maintainable event filtering logic
2. **Performance Considerations:** Be mindful of performance when creating deeply nested filter chains
3. **Validation:** Always validate that compound filters can handle the intended event types
4. **Testing:** Test compound filters with various event combinations to ensure correct behavior
5. **Documentation:** Document complex filter logic for future maintenance

## Related Classes

- [`EventFilterer`](EventFilterer.md) - Base interface for all event filters
- [`FiltererComposed`](event-filterers/FiltererComposed.md) - Implementation for combining filters with AND/OR logic
- [`FiltererInverted`](event-filterers/FiltererInverted.md) - Implementation for inverting filter logic
- [`JsMacros`](JsMacros.md) - Main API class for creating compound filters
- [`FiltererModulus`](event-filterers/FiltererModulus.md) - Filter for rate-limiting events

## Version History

- **1.9.1:** Initial introduction of the Compound interface for complex event filtering
- **Current:** Enhanced with improved cyclic detection and performance optimizations