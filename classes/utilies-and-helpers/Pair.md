# Pair

**Full Class Name:** `xyz.wagyourtail.Pair`

**Extends:** `Object`

**Since:** JSMacros 1.0.0

The `Pair` class is a generic utility class in JSMacros that represents a pair of values. It provides a simple way to store and manage two related values together as a single object. This class is commonly used for key-value mappings, coordinate pairs, method return values, and any situation where you need to associate two pieces of data.

## Overview

The `Pair` class is a generic container that holds two values of potentially different types:
- Type-safe storage for two values using Java generics
- Simple getter and setter methods for both values
- Useful for returning multiple values from methods
- Commonly used for key-value associations
- Lightweight and efficient for temporary data storage

The class has two variants with different field naming conventions:
- **Core version** (t, u): General-purpose pair storage
- **BuildSrc version** (key, value): Optimized for map-like key-value operations

## Constructors

### `new Pair(first, second)`
Creates a new Pair with the specified first and second values.

**Parameters:**
- `first` (T): The first value to store in the pair
- `second` (U): The second value to store in the pair

**Example:**
```javascript
// Create a pair with string and integer
const pair = new Pair("count", 42);

// Create a pair with coordinates
const coordinates = new Pair(10.5, 20.3);

// Create a pair with object and boolean
const status = new Pair({name: "player"}, true);
```

## Methods

### `getFirst()`
Returns the first value stored in the pair.

**Returns:** `T` - The first value

**Example:**
```javascript
const pair = new Pair("username", "Player123");
const first = pair.getFirst();
Chat.log("First value: " + first); // Output: "username"
```

### `getSecond()`
Returns the second value stored in the pair.

**Returns:** `U` - The second value

**Example:**
```javascript
const pair = new Pair("username", "Player123");
const second = pair.getSecond();
Chat.log("Second value: " + second); // Output: "Player123"
```

### `setFirst(first)`
Sets the first value of the pair.

**Parameters:**
- `first` (T): The new first value

**Returns:** `void`

**Example:**
```javascript
const pair = new Pair("old", "value");
pair.setFirst("new");
Chat.log("Updated first: " + pair.getFirst()); // Output: "new"
```

### `setSecond(second)`
Sets the second value of the pair.

**Parameters:**
- `second` (U): The new second value

**Returns:** `void`

**Example:**
```javascript
const pair = new Pair("key", "oldValue");
pair.setSecond("newValue");
Chat.log("Updated second: " + pair.getSecond()); // Output: "newValue"
```

## Method Variations

The Pair class may also expose alternative method names depending on the context:

### `getT()` (Alternative to `getFirst()`)
Returns the first value using the generic type name.

**Returns:** `T` - The first value

### `getU()` (Alternative to `getSecond()`)
Returns the second value using the generic type name.

**Returns:** `U` - The second value

### `setT(t)` (Alternative to `setFirst()`)
Sets the first value using the generic type name.

**Parameters:**
- `t` (T): The new first value

### `setU(u)` (Alternative to `setSecond()`)
Sets the second value using the generic type name.

**Parameters:**
- `u` (U): The new second value

## Usage Examples

### Example 1: Coordinate Storage
```javascript
// Store 2D coordinates as a pair
const position = new Pair(100, 200);

// Access coordinates
const x = position.getFirst();
const y = position.getSecond();

Chat.log(`Position: (${x}, ${y})`);

// Update position
position.setFirst(x + 1);
position.setSecond(y + 1);
Chat.log(`New position: (${position.getFirst()}, ${position.getSecond()})`);
```

### Example 2: Key-Value Mapping
```javascript
// Create a simple key-value pair
const setting = new Pair("difficulty", "hard");

// Access the key and value
const key = setting.getFirst();
const value = setting.getSecond();

Chat.log(`Setting ${key} is set to: ${value}`);

// Modify the setting
setting.setSecond("normal");
Chat.log(`Setting ${key} changed to: ${setting.getSecond()}`);
```

### Example 3: Function Return Values
```javascript
// Function that returns multiple values as a pair
function getMinMax(numbers) {
    if (numbers.length === 0) {
        return new Pair(null, null);
    }

    let min = numbers[0];
    let max = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < min) min = numbers[i];
        if (numbers[i] > max) max = numbers[i];
    }

    return new Pair(min, max);
}

// Use the function
const numbers = [5, 2, 8, 1, 9, 3];
const result = getMinMax(numbers);

const minVal = result.getFirst();
const maxVal = result.getSecond();

Chat.log(`Min: ${minVal}, Max: ${maxVal}`);
```

### Example 4: Data Processing Pipeline
```javascript
// Process data and track statistics
function processData(items) {
    let validCount = 0;
    let errorCount = 0;

    for (const item of items) {
        // Simulate processing
        if (Math.random() > 0.2) {
            validCount++;
        } else {
            errorCount++;
        }
    }

    return new Pair(validCount, errorCount);
}

const results = processData([/* array of items */]);
const successful = results.getFirst();
const failed = results.getSecond();

Chat.log(`Processing complete: ${successful} successful, ${failed} failed`);
```

### Example 5: Player Status Tracking
```javascript
// Track player health and status
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const player = Player.getPlayer();
    if (!player) return;

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = (health / maxHealth) * 100;

    // Create status pair: (healthPercent, alertLevel)
    let statusPair;

    if (healthPercent > 60) {
        statusPair = new Pair(healthPercent, "SAFE");
    } else if (healthPercent > 30) {
        statusPair = new Pair(healthPercent, "WARNING");
    } else {
        statusPair = new Pair(healthPercent, "DANGER");
    }

    const currentHealth = statusPair.getFirst();
    const alertLevel = statusPair.getSecond();

    Chat.actionbar(`Health: ${currentHealth.toFixed(1)}% - Status: ${alertLevel}`);
}));
```

### Example 6: Configuration Management
```javascript
// Store configuration settings as pairs
const configPairs = [
    new Pair("renderDistance", 12),
    new Pair("particles", true),
    new Pair("soundVolume", 0.8),
    new Pair("difficulty", "normal")
];

// Function to find a configuration value
function getConfig(key) {
    for (const pair of configPairs) {
        if (pair.getFirst() === key) {
            return pair.getSecond();
        }
    }
    return null;
}

// Update configuration
function updateConfig(key, value) {
    for (const pair of configPairs) {
        if (pair.getFirst() === key) {
            pair.setSecond(value);
            return true;
        }
    }
    configPairs.push(new Pair(key, value));
    return true;
}

// Usage
const renderDistance = getConfig("renderDistance");
Chat.log(`Current render distance: ${renderDistance}`);

updateConfig("renderDistance", 16);
Chat.log(`Updated render distance: ${getConfig("renderDistance")}`);
```

### Example 7: Pair Collection Operations
```javascript
// Working with collections of pairs
const inventoryItems = [
    new Pair("diamond", 5),
    new Pair("gold", 12),
    new Pair("iron", 32),
    new Pair("coal", 64)
];

// Calculate total value (second elements)
let totalItems = 0;
for (const item of inventoryItems) {
    totalItems += item.getSecond();
}
Chat.log(`Total items in inventory: ${totalItems}`);

// Find specific item
function findItem(itemName) {
    for (const item of inventoryItems) {
        if (item.getFirst() === itemName) {
            return item.getSecond();
        }
    }
    return 0;
}

const diamondCount = findItem("diamond");
Chat.log(`Diamonds: ${diamondCount}`);
```

## Best Practices

### When to Use Pair
- **Coordinate Storage:** Perfect for 2D/3D coordinates, screen positions
- **Key-Value Associations:** Simple mappings without full Map overhead
- **Method Returns:** When a method needs to return two related values
- **Data Processing:** Tracking related metrics together
- **Temporary Data:** Grouping related values during processing

### When Not to Use Pair
- **Complex Data Structures:** Use classes or objects for more than 2-3 related fields
- **Large Collections:** Consider using Map for key-value lookups
- **Public APIs:** Prefer more descriptive class names and structures
- **Immutable Data:** Consider using records or immutable alternatives

### Naming Conventions
- Use descriptive variable names that indicate the relationship:
  ```javascript
  const coordinates = new Pair(x, y);      // Good
  const healthStatus = new Pair(health, status); // Good
  const pair = new Pair(a, b);             // Avoid - unclear
  ```

- Comment the purpose of each value in the pair:
  ```javascript
  // Pair of (itemName, quantity)
  const inventory = new Pair("diamond_sword", 1);
  ```

## Performance Considerations

1. **Memory Efficiency:** Pair objects are lightweight and have minimal memory overhead
2. **Garbage Collection:** Creating many temporary pairs can impact GC performance
3. **Alternative Structures:** For performance-critical code, consider using arrays or specialized classes
4. **Access Patterns:** Direct field access through getters is efficient and fast

## Alternative Data Structures

Depending on your use case, consider these alternatives:

- **Arrays:** For indexed access to multiple values of the same type
- **Objects/Classes:** For named fields with clear semantics
- **Map:** For dynamic key-value lookups
- **Records:** For immutable data structures (Java 16+)

## Related Classes

- `Map` - For more complex key-value mappings
- `List` - For ordered collections of items
- `Pos3D` - For 3D coordinate handling
- `BlockPosHelper` - For block-specific positions
- Custom classes with named fields for more complex relationships

## Version Information

- Available since JSMacros 1.0.0
- Core version located in `src/core/java/xyz/wagyourtail/Pair.java`
- BuildSrc version with key/value semantics in `buildSrc/src/main/java/xyz/wagyourtail/Pair.java`
- Used extensively throughout JSMacros for simple data pairing operations