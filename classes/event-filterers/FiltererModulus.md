# FiltererModulus

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.event.impl.FiltererModulus`

**Implements:** `EventFilterer`

The `FiltererModulus` class is an event filterer that allows only every nth event to pass through, where n is the specified quotient. This is useful for reducing event frequency or sampling events at regular intervals. Instances are typically created through `JsMacros.createModulusEventFilterer()` or by using the constructor directly.

## Table of Contents

## Constructors
- [new FiltererModulus(quotient)](#new-filterermodulusquotient)

## Fields
- [instance.quotient](#instancequotient)
- [instance.count](#instancecount)

## Methods
- [instance.canFilter(event)](#instancecanfilterevent)
- [instance.test(event)](#instancetestevent)
- [instance.setQuotient(quotient)](#instancesetquotientquotient)

---

## Constructors

### new FiltererModulus(quotient)
```js
const filter = new FiltererModulus(5);
```

Creates a new FiltererModulus instance that allows every nth event to pass through.

**Parameters:**

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| quotient  | int    | The modulus value - allows every nth event     |

**Notes:** The quotient is automatically converted to its absolute value, so negative values are treated as positive.

**Since:** `1.9.1`

**Example:**
```js
// Create a filter that allows every 10th event
const filter = new FiltererModulus(10);

// Create a filter that allows every 3rd event
const frequentFilter = new FiltererModulus(3);

// Negative values are treated as positive
const equivalentFilter = new FiltererModulus(-5); // Same as new FiltererModulus(5)
```

---

## Fields

## Methods

## Usage Examples

### Basic Event Filtering

```js
// Create a filter that processes every 5th tick event
const tickFilter = new FiltererModulus(5);

// Register the filtered event listener
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (tickFilter.test(event)) {
        // This code runs only every 5th tick
        console.log("Processing 5th tick");
        // Perform expensive operations here
    }
}));
```

### Reducing High-Frequency Event Processing

```js
// For high-frequency events like sound events
const soundFilter = new FiltererModulus(10);

JsMacros.on("Sound", JavaWrapper.methodToJavaAsync((event) => {
    if (soundFilter.test(event)) {
        // Process only every 10th sound event
        console.log(`Filtered sound: ${event.sound}`);
        // Update UI or perform analysis
    }
}));
```

### Dynamic Filter Adjustment

```js
// Create filter that can be adjusted based on conditions
const performanceFilter = new FiltererModulus(5);

JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    // Adjust filter based on game performance
    const currentFPS = Client.getFPS();

    if (currentFPS < 30) {
        // Reduce frequency when performance is poor
        performanceFilter.setQuotient(10);
    } else if (currentFPS > 50) {
        // Increase frequency when performance is good
        performanceFilter.setQuotient(3);
    } else {
        // Normal frequency
        performanceFilter.setQuotient(5);
    }

    if (performanceFilter.test(event)) {
        // Process tick with adjusted frequency
        updateHud();
    }
}));
```

### Combining with Other Filters

```js
// Combine with other filterers for complex filtering
const modulusFilter = new FiltererModulus(3);
const invertedFilter = FiltererInverted.invert(modulusFilter);

JsMacros.on("PlayerJoin", JavaWrapper.methodToJavaAsync((event) => {
    if (modulusFilter.test(event)) {
        console.log("Processing every 3rd join event");
    }

    if (invertedFilter.test(event)) {
        console.log("Processing 2 out of every 3 join events");
    }
}));
```

## Important Notes

1. **Event Type Agnostic**: FiltererModulus can filter any event type since it doesn't depend on specific event properties.

2. **Counter Reset**: The internal counter resets to 0 each time an event passes through the filter.

3. **Positive Quotients**: Negative quotient values are automatically converted to positive values.

4. **Thread Safety**: This filterer maintains internal state and should not be shared across multiple event listeners unless that behavior is intended.

5. **Performance Considerations**: Use this filterer to reduce the frequency of expensive operations that don't need to run on every event.

6. **Initialization**: The counter starts at 0, so the first event will only pass through if the quotient is 1.

## Common Use Cases

- **Performance Optimization**: Reduce the frequency of expensive calculations or updates
- **Sampling**: Collect periodic samples of high-frequency events for analysis
- **Rate Limiting**: Prevent overwhelming systems with too many rapid events
- **Display Updates**: Limit how often HUD elements or visual effects update
- **Logging**: Sample events for debugging without overwhelming log files

## Related Classes

- **EventFilterer**: Interface that all event filterers implement
- **FiltererInverted**: Filterer that inverts the result of another filterer
- **FiltererComposed**: Filterer that combines multiple filterers with AND/OR logic
- **BaseEvent**: Base class for all JSMacros events