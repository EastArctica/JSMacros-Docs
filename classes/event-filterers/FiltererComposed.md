# FiltererComposed

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.event.impl.FiltererComposed`
**Implements:** `EventFilterer.Compound`
**Extends:** None

The `FiltererComposed` class is a powerful event filtering utility that allows you to combine multiple event filters using logical AND and OR operations. This enables complex filtering logic for JSMacros events, giving you fine-grained control over which events trigger your scripts.

## Overview

FiltererComposed implements the `EventFilterer.Compound` interface and serves as a composite filter that can combine multiple individual filters. It uses a logical structure where:

- **AND operations**: All filters in a group must pass for the group to pass
- **OR operations**: Any group can pass for the entire filter to pass

This structure allows you to create sophisticated filtering conditions like "filter events where (condition A AND condition B) OR (condition C AND condition D)".

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Important Notes](#important-notes)

## Constructors

### `new FiltererComposed(initial)`

Creates a new composed filterer with an initial filter.

```javascript
const composedFilter = new FiltererComposed(initialFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `initial` | `EventFilterer` | The initial filter to start the composition with |

**Returns**
A new FiltererComposed instance with the initial filter added as the first OR group.

## Methods

### `and(filterer)`

Adds a filter using AND logic to the current OR group. All filters in the current group must pass for the group to be considered successful.

```javascript
// Chain multiple AND conditions
const filter = JsMacros.createComposedEventFilterer(someFilter)
    .and(anotherFilter)
    .and(yetAnotherFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filterer` | `EventFilterer` | The filter to add with AND logic |

**Returns**
* `FiltererComposed`: Returns self for method chaining

**Throws**
* `IllegalArgumentException`: If the filterer parameter is null
* `IllegalArgumentException`: If adding the filter would create a cyclic reference

### `or(filterer)`

Adds a filter using OR logic by starting a new group. Any group can pass for the entire filter to be successful.

```javascript
// Create OR conditions between groups
const filter = JsMacros.createComposedEventFilterer(group1Filter)
    .and(group1AdditionalFilter)
    .or(group2Filter)
    .and(group2AdditionalFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `filterer` | `EventFilterer` | The filter to add with OR logic (starts a new group) |

**Returns**
* `FiltererComposed`: Returns self for method chaining

**Throws**
* `IllegalArgumentException`: If the filterer parameter is null
* `IllegalArgumentException`: If adding the filter would create a cyclic reference

### `canFilter(event)`

Determines whether this composed filter can filter the specified event type.

```javascript
if (composedFilter.canFilter("Sound")) {
    // Filter can handle Sound events
}
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `event` | `String` | The name of the event type to check |

**Returns**
* `boolean`: `true` if all component filters can handle the event type, `false` otherwise

### `test(event)`

Tests an event against the composed filter logic.

```javascript
const shouldProcess = composedFilter.test(eventObject);
if (shouldProcess) {
    // Event passes the filter, process it
}
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `event` | `BaseEvent` | The event object to test against the filter |

**Returns**
* `boolean`: `true` if the event passes the filter logic, `false` otherwise

### `checkCyclicRef(base)`

Internal method to check for cyclic references between compound filters. This is called automatically when adding filters and prevents infinite loops.

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `base` | `EventFilterer.Compound` | The base compound filter to check against |

**Returns**
* `void`

**Throws**
* `IllegalArgumentException`: If a cyclic reference is detected

## Usage Examples

### Basic AND Filtering

Create a filter that only allows events that pass multiple conditions:

```javascript
// Create individual filters
const soundFilter = JsMacros.createEventFilterer("Sound");
const tickFilter = JsMacros.createEventFilterer("Tick");

// Combine with AND logic - requires both conditions to be true
const andFilter = JsMacros.createComposedEventFilterer(soundFilter)
    .and(tickFilter);

// Use in event listener
JsMacros.on("Sound", andFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("Sound event passed all AND conditions");
}));
```

### Basic OR Filtering

Create a filter that allows events that pass any of several conditions:

```javascript
// Create filters for different event types
const soundFilter = JsMacros.createEventFilterer("Sound");
const chatFilter = JsMacros.createEventFilterer("RecvMessage");

// Combine with OR logic - requires only one condition to be true
const orFilter = JsMacros.createComposedEventFilterer(soundFilter)
    .or(chatFilter);

// Use the filter
JsMacros.on("Sound", orFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("Event passed OR filter conditions");
}));
```

### Complex AND/OR Logic

Combine multiple filters with sophisticated logic:

```javascript
// Create various filters
const soundFilter = JsMacros.createEventFilterer("Sound");
const tickFilter = JsMacros.createEventFilterer("Tick");
const chatFilter = JsMacros.createEventFilterer("RecvMessage");
const keyFilter = JsMacros.createEventFilterer("Key");

// Create complex logic: (sound AND tick) OR (chat AND key)
const complexFilter = JsMacros.createComposedEventFilterer(soundFilter)
    .and(tickFilter)  // First OR group: sound AND tick
    .or(chatFilter)   // Start second OR group
    .and(keyFilter);  // Second OR group: chat AND key

// Use the complex filter
JsMacros.on("Sound", complexFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("Event passed complex filter logic");
}));
```

### Combining with Other Filter Types

Mix composed filters with other filter types:

```javascript
// Create different filter types
const modulusFilter = JsMacros.createModulusEventFilterer(5); // Every 5th event
const soundFilter = JsMacros.createEventFilterer("Sound");
const invertedFilter = FiltererInverted.invert(soundFilter); // NOT sound

// Combine them all
const megaFilter = JsMacros.createComposedEventFilterer(modulusFilter)
    .and(invertedFilter)  // Every 5th event that is NOT a sound
    .or(soundFilter);     // OR any sound event

// Apply the filter
JsMacros.on("Tick", megaFilter, JavaWrapper.methodToJavaAsync((event) => {
    Chat.log("Event passed mega filter");
}));
```

### Event-Specific Filtering

Create filters for specific event scenarios:

```javascript
// Filter for specific player actions in specific conditions
const keyPressFilter = JsMacros.createEventFilterer("Key");
const mouseFilter = JsMacros.createEventFilterer("MouseClicked");

// Only process key presses OR mouse clicks when certain conditions are met
const actionFilter = JsMacros.createComposedEventFilterer(keyPressFilter)
    .or(mouseFilter);

// You can still add more AND conditions to each OR group
const enhancedActionFilter = JsMacros.createComposedEventFilterer(keyPressFilter)
    .and(customConditionFilter)  // Key press AND custom condition
    .or(mouseFilter)             // OR any mouse click
    .and(anotherConditionFilter); // Mouse click AND another condition
```

## Important Notes

### Filter Logic Structure

1. **AND Groups**: Filters added with `.and()` are grouped together and ALL must pass
2. **OR Groups**: Each call to `.or()` starts a new group, and ANY group can pass
3. **Initial Filter**: The first filter passed to the constructor starts the first OR group

### Performance Considerations

1. **Short-circuiting**: The filter stops testing as soon as it can determine the result
2. **Order matters**: More selective filters should come first for better performance
3. **Cyclic protection**: The filter automatically detects and prevents infinite loops

### Error Handling

1. **Null checks**: All methods throw `IllegalArgumentException` for null filters
2. **Cyclic references**: Automatic detection prevents infinite recursion
3. **Event compatibility**: The filter only works with events that all component filters can handle

### Best Practices

1. **Start specific**: Begin with your most restrictive filter
2. **Logical grouping**: Group related conditions together with AND operations
3. **Clear naming**: Use descriptive variable names for complex filters
4. **Testing**: Test individual filters before combining them

### Common Use Cases

- **Complex event conditions**: Filter events based on multiple criteria
- **State-dependent filtering**: Change filter behavior based on game state
- **Performance optimization**: Reduce unnecessary event processing
- **Event routing**: Direct different events to different handlers
- **Conditional logging**: Only log events that meet complex criteria

## Related Classes

- **EventFilterer**: Base interface for all event filters
- **EventFilterer.Compound**: Interface for composable filters
- **FiltererInverted**: Filter that inverts another filter's result
- **FiltererModulus**: Filter that only lets every nth event through
- **BaseEvent**: Base class for all JSMacros events
- **JsMacros**: Provides methods to create event filters