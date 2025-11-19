# FiltererInverted

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.event.impl.FiltererInverted`

**Implements:** `EventFilterer.Compound`

**Extends:** `Object`

The `FiltererInverted` class is an event filter that inverts the logic of another event filter. It wraps a base filter and returns the opposite result when testing events, making it useful for creating "NOT" conditions in event filtering logic.

## Description

`FiltererInverted` is a specialized event filterer that takes another `EventFilterer` as its base and inverts its filtering logic. When the base filter would return `true` (allowing the event to pass), the inverted filter returns `false` (blocking the event), and vice versa.

This class is part of the Event Filterers system and implements the `EventFilterer.Compound` interface, which means it can be used in composed filter combinations. The main use case is creating negative filtering conditions - for example, listening to all damage events EXCEPT fall damage.

## Static Factory Methods

### `invert(base)`
```js
const notFallDamageFilter = JsMacros.invertEventFilterer(fallDamageFilter);
```

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `base` | `EventFilterer` | The base filter to invert. Cannot be null. |

**Returns**
* `EventFilterer`: A new filterer that inverts the logic of the base filter.

**Throws**
* `IllegalArgumentException`: If the base filter is null.

**Notes**
- This is a smart factory method that automatically handles double inversions. If you pass a `FiltererInverted` instance as the base, it will return the original inner filter (effectively canceling the inversion).
- This method is preferred over direct construction and is exposed in the JsMacros API as `JsMacros.invertEventFilterer()`.

## Instance Fields

### `base`
- **Type:** `EventFilterer`
- **Access:** Read-only (public final)
- **Description:** The base filterer whose logic is being inverted by this instance.

## Instance Methods

### `canFilter(event)`
Determines whether this filter can handle the specified event type.

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `event` | `string` | The name of the event to check. |

**Returns**
* `boolean`: `true` if this filter can handle the specified event type, `false` otherwise.

**Behavior**
- Delegates to the base filter's `canFilter()` method.
- The inverted filter can filter the same events as its base filter.

```js
const damageFilter = JsMacros.createEventFilterer('Damage');
const notDamageFilter = JsMacros.invertEventFilterer(damageFilter);

console.log(notDamageFilter.canFilter('Damage'));     // true
console.log(notDamageFilter.canFilter('RecvMessage')); // false
```

### `test(event)`
Tests whether an event should pass through the filter.

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `event` | `BaseEvent` | The event to test. |

**Returns**
* `boolean`: The opposite of the base filter's result. Returns `false` if the base filter would return `true`, and `true` if the base filter would return `false`.

**Behavior**
- Returns `!base.test(event)` - the logical negation of the base filter's result.
- If the base filter would allow the event, this filter blocks it.
- If the base filter would block the event, this filter allows it.

### `checkCyclicRef(base)`
Checks for cyclic references in compound filter chains.

**Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `base` | `EventFilterer.Compound` | The base compound filter to check against. |

**Returns**
* `void`

**Throws**
* `IllegalArgumentException`: If a cyclic reference is detected.

**Behavior**
- Implements the `EventFilterer.Compound` interface requirement.
- Prevents infinite loops by detecting when a filter references itself in a compound chain.
- Also checks the inner base filter if it's also a compound filter.

## Usage Examples

### Basic Inverted Filtering

```js
// Create a filter for fall damage events
const fallDamageFilter = JsMacros.createEventFilterer('Damage')
    .addFilter("source", "fall");

// Create an inverted filter - matches any damage EXCEPT fall damage
const notFallDamageFilter = JsMacros.invertEventFilterer(fallDamageFilter);

// Listen for non-fall damage events
JsMacros.on('Damage', notFallDamageFilter, JavaWrapper.methodToJavaAsync(event => {
    const damageAmount = event.amount;
    const damageSource = event.source;

    Chat.log(`Took ${damageAmount} damage from ${damageSource} (not fall damage!)`);
}));
```

### Complex Filtering Logic

```js
// Create filters for different damage sources
const fallDamageFilter = JsMacros.createEventFilterer('Damage')
    .addFilter("source", "fall");
const fireDamageFilter = JsMacros.createEventFilterer('Damage')
    .addFilter("source", "fire");
const drowningFilter = JsMacros.createEventFilterer('Damage')
    .addFilter("source", "drown");

// Create inverted filters
const notFireDamageFilter = JsMacros.invertEventFilterer(fireDamageFilter);

// Create composed filters with inverted logic
const environmentalFilter = JsMacros.createComposedEventFilterer(fallDamageFilter);
environmentalFilter.or(drowningFilter); // Fall OR drowning damage

// Listen for damage that is environmental OR not fire damage
const complexFilter = JsMacros.createComposedEventFilterer(environmentalFilter);
complexFilter.or(notFireDamageFilter);

JsMacros.on('Damage', complexFilter, JavaWrapper.methodToJavaAsync(event => {
    Chat.log(`Special damage case: ${event.source} - Amount: ${event.amount}`);
}));
```

### Performance Optimization with Tick Events

```js
// Create a modulus filter for every 100th tick
const every100Ticks = JsMacros.createModulusEventFilterer(100);

// Invert it to trigger on ticks that are NOT multiples of 100
const not100thTick = JsMacros.invertEventFilterer(every100Ticks);

// Use the inverted filter for frequent operations
JsMacros.on('Tick', not100thTick, JavaWrapper.methodToJavaAsync(event => {
    // This runs on ticks 1-99, 101-199, etc.
    // Do lightweight operations here
    updatePlayerPosition();
}));

// Use the original filter for less frequent operations
JsMacros.on('Tick', every100Ticks, JavaWrapper.methodToJavaAsync(event => {
    // This runs on ticks 0, 100, 200, etc.
    // Do expensive operations here
    savePlayerData();
}));
```

### Excluding Specific Messages

```js
// Create a filter for system messages
const systemMessageFilter = JsMacros.createEventFilterer('RecvMessage')
    .addFilter("json", true); // Assuming JSON messages are system messages

// Invert it to get non-system messages (player chat)
const playerChatFilter = JsMacros.invertEventFilterer(systemMessageFilter);

// Listen only to player chat messages
JsMacros.on('RecvMessage', playerChatFilter, JavaWrapper.methodToJavaAsync(event => {
    const message = event.text.getString();
    const playerName = event.player ? event.player.getName() : "Unknown";

    Chat.log(`Player ${playerName} said: ${message}`);

    // Auto-reply functionality
    if (message.toLowerCase().includes("hello")) {
        Chat.say(`Hello ${playerName}!`);
    }
}));
```

## Advanced Usage

### Double Inversion Handling

```js
// The factory method automatically handles double inversions
const originalFilter = JsMacros.createEventFilterer('Damage');
const invertedFilter = JsMacros.invertEventFilterer(originalFilter);
const doubleInvertedFilter = JsMacros.invertEventFilterer(invertedFilter);

// doubleInvertedFilter will be the same as originalFilter
// (not (not original)) == original
console.log(doubleInvertedFilter === originalFilter); // true
```

### Custom Filter Inversion

```js
// Create a custom filter function
const customFilter = JavaWrapper.methodToJava((event) => {
    // Custom logic - only allow events in the overworld
    return event.dimension && event.dimension === "minecraft:overworld";
});

// Wrap it in a basic filterer (assuming you have access to filter creation)
const baseFilterer = createCustomFilterer(customFilter);

// Invert the custom logic
const notOverworldFilter = JsMacros.invertEventFilterer(baseFilterer);

JsMacros.on('DimensionChange', notOverworldFilter, JavaWrapper.methodToJavaAsync(event => {
    Chat.log(`Entered dimension: ${event.dimension} (not overworld!)`);
}));
```

## Integration with JsMacros API

The `FiltererInverted` class is typically used through the JsMacros API rather than instantiated directly:

```js
// Preferred usage through the API
const invertedFilter = JsMacros.invertEventFilterer(baseFilter);

// The API handles the factory method call and proper instantiation
```

## Important Notes

1. **Performance**: `FiltererInverted` adds minimal overhead to event filtering. The inversion operation is a simple logical NOT operation.

2. **Null Safety**: The factory method throws `IllegalArgumentException` if the base filter is null.

3. **Cyclic References**: The class includes protection against cyclic references in compound filter chains, which could cause infinite loops.

4. **Smart Inversion**: The factory method automatically detects and cancels double inversions, returning the original base filter if you try to invert an already inverted filter.

5. **Event Type Compatibility**: An inverted filter can only filter the same event types as its base filter, as determined by the `canFilter()` method.

6. **Compound Interface**: Implements `EventFilterer.Compound`, allowing it to be used in complex filter combinations with AND/OR logic.

## Related Classes

- **EventFilterer**: The base interface for all event filters
- **EventFilterer.Compound**: Interface for filters that can be combined
- **JsMacros**: Main API class, provides `invertEventFilterer()` method
- **FiltererComposed**: For combining multiple filters with AND/OR logic
- **FiltererModulus**: For filtering events at regular intervals

## Version Information

- **Since:** JsMacros 1.9.1
- **Author:** aMelonRind
- **Stability:** Stable - part of the core event filtering system