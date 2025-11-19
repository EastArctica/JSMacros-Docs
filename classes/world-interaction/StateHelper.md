# StateHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.StateHelper`

**Extends:** `BaseHelper<U>`

**Since:** JsMacros 1.8.4

The `StateHelper` class is an abstract base class in JSMacros that provides a foundation for working with Minecraft state objects, particularly block states and fluid states. It offers a consistent interface for accessing and modifying state properties through string-based property names and values.

Since this is an abstract class, you typically work with its concrete implementations:
- `BlockStateHelper` - For block states with block-specific functionality
- `FluidStateHelper` - For fluid states with fluid-specific functionality

## Overview

The `StateHelper` class provides essential functionality for state management in JSMacros:
- **Property Access**: Retrieve all state properties as a map of string key-value pairs
- **State Modification**: Create new state instances with modified property values
- **Type Safety**: Automatic validation of property names and values
- **Immutable Operations**: All modifications create new state instances rather than modifying existing ones

## Methods

## Implementation Details

### Abstract Methods

#### `create(base)`
Protected abstract method that must be implemented by concrete classes to create new instances of the appropriate state helper type.

**Parameters:**
| Parameter | Type | Description          |
| --------- | ---- | -------------------- |
| base      | U    | The base state object |

**Returns:** `StateHelper<U>` - A new state helper instance

**Note:** This method is used internally by the `with()` method and typically not called directly.

### Inherited from BaseHelper

The `StateHelper` class inherits the following methods from `BaseHelper<U>`:

## Usage Examples

### Basic Property Inspection
```javascript
function inspectBlockState() {
    const player = Player.getPlayer();
    if (!player) return;

    const targeted = player.rayTraceBlock(10);
    if (!targeted || !targeted.block) {
        Chat.log("&cNo block targeted!");
        return;
    }

    const blockState = targeted.block.getBlockState();
    const properties = blockState.toMap();

    Chat.log(`&6=== Block State Information ===`);
    Chat.log(`&7Block ID: &f${blockState.getId()}`);
    Chat.log(`&7Properties: &f${Object.keys(properties).length}`);

    // Display all properties
    for (const [property, value] of Object.entries(properties)) {
        Chat.log(`  &b${property}&7: &a${value}`);
    }

    // Check for common properties
    if (properties.waterlogged === "true") {
        Chat.log("&7This block is waterlogged!");
    }
    if (properties.powered === "true") {
        Chat.log("&7This block is powered!");
    }
}

// Run on key press
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.i") {
        inspectBlockState();
    }
}));
```

### State Modification Helper
```javascript
function safeStateModifier(state, modifications) {
    const results = {
        original: state.toMap(),
        modified: state.toMap(),
        successful: [],
        failed: []
    };

    for (const [property, value] of Object.entries(modifications)) {
        try {
            const newState = state.with(property, value);
            state = newState;
            results.modified = newState.toMap();
            results.successful.push({ property, value });
            Chat.log(`&aSuccessfully set ${property} to ${value}`);
        } catch (error) {
            results.failed.push({
                property,
                value,
                error: error.message
            });
            Chat.log(`&cFailed to set ${property} to ${value}: ${error.message}`);
        }
    }

    return { state, results };
}

// Example usage
const block = Player.getPlayer().rayTraceBlock(10);
if (block && block.block) {
    const blockState = block.block.getBlockState();

    const modifications = {
        facing: "south",
        powered: "true"
    };

    const result = safeStateModifier(blockState, modifications);
    Chat.log(`Original state: ${JSON.stringify(result.results.original)}`);
    Chat.log(`Final state: ${JSON.stringify(result.results.modified)}`);
}
```

### Property Discovery Tool
```javascript
function discoverAvailableProperties() {
    const player = Player.getPlayer();
    if (!player) return;

    Chat.log("&6=== Property Discovery Tool ===");
    Chat.log("&7Target different blocks to see their properties");
    Chat.log("&7Press ESC to stop");

    let running = true;

    const stopHandler = JavaWrapper.methodToJavaAsync((event) => {
        if (event.key === "key.keyboard.escape") {
            running = false;
            Chat.log("&7Property discovery stopped");
        }
    });

    const tickHandler = JavaWrapper.methodToJavaAsync(() => {
        if (!running) return;

        const targeted = player.rayTraceBlock(5);
        if (!targeted || !targeted.block) return;

        const blockState = targeted.block.getBlockState();
        const block = targeted.block;
        const properties = blockState.toMap();

        // Create a unique signature for this state
        const signature = `${blockState.getId()}_${JSON.stringify(properties)}`;

        // Only show if it's different from last shown
        if (!discoverAvailableProperties.lastSignature ||
            discoverAvailableProperties.lastSignature !== signature) {

            Chat.log(`&e${block.getId()} &7at &f${block.getBlockPos()}`);

            if (Object.keys(properties).length === 0) {
                Chat.log("  &7No properties");
            } else {
                for (const [property, value] of Object.entries(properties)) {
                    Chat.log(`  &b${property}&7: &a${value}`);
                }
            }

            discoverAvailableProperties.lastSignature = signature;
        }
    });

    events.on("Key", stopHandler);
    events.on("Tick", tickHandler);

    // Cleanup function
    setTimeout(() => {
        events.removeListener("Key", stopHandler);
        events.removeListener("Tick", tickHandler);
    }, 60000); // Auto-stop after 60 seconds
}
```

### Fluid State Analysis
```javascript
function analyzeFluidState() {
    const player = Player.getPlayer();
    if (!player) return;

    const block = player.rayTraceBlock(10);
    if (!block || !block.block) {
        Chat.log("&cNo block targeted!");
        return;
    }

    const fluidState = block.block.getFluidState();

    if (fluidState.isEmpty()) {
        Chat.log("&7No fluid at targeted block");
        return;
    }

    Chat.log("&6=== Fluid State Analysis ===");
    Chat.log(`&7Fluid ID: &f${fluidState.getId()}`);
    Chat.log(`&7Is still: &f${fluidState.isStill()}`);
    Chat.log(`&7Level: &f${fluidState.getLevel()}`);
    Chat.log(`&7Height: &f${fluidState.getHeight()}`);
    Chat.log(`&7Has random ticks: &f${fluidState.hasRandomTicks()}`);
    Chat.log(`&7Blast resistance: &f${fluidState.getBlastResistance()}`);

    // Get fluid properties
    const fluidProps = fluidState.toMap();
    if (Object.keys(fluidProps).length > 0) {
        Chat.log("&7Fluid properties:");
        for (const [property, value] of Object.entries(fluidProps)) {
            Chat.log(`  &b${property}&7: &a${value}`);
        }
    }

    // Get velocity at current position
    const velocity = fluidState.getVelocity(block.block.getBlockPos());
    Chat.log(`&7Velocity: &fx=${velocity.x.toFixed(3)}, y=${velocity.y.toFixed(3)}, z=${velocity.z.toFixed(3)}`);
}
```

## Special Considerations

### Immutable Nature
State objects in Minecraft are immutable, meaning:
- `with()` methods always return new instances
- Original state objects are never modified
- Always capture the return value when modifying states

### Property Validation
The `with()` method performs validation:
- Property names must exist for the specific state type
- Property values must be valid for the property type
- Invalid operations throw `IllegalArgumentException`

### String-Based API
All property operations use strings:
- Property names are strings (e.g., "facing", "powered")
- Property values are strings (e.g., "north", "true", "3")
- Internal type conversion is handled automatically

### Performance Considerations
- State creation is lightweight but avoid excessive modifications in loops
- Cache state objects when performing multiple operations
- Use property maps for read operations instead of repeated API calls

## Related Classes

- **BlockStateHelper** - Concrete implementation for block states
- **FluidStateHelper** - Concrete implementation for fluid states
- **UniversalBlockStateHelper** - Extended implementation with comprehensive block property access
- **BaseHelper<U>** - Parent class providing basic helper functionality
- **BlockPosHelper** - Used for position-based state operations
- **DirectionHelper** - Used for directional property values

## Error Handling Best Practices

Always wrap `with()` calls in try-catch blocks when working with dynamic property names:

```javascript
function modifyStateSafely(state, propertyName, newValue) {
    try {
        const newState = state.with(propertyName, newValue);
        Chat.log(`&aSuccessfully changed ${propertyName} to ${newValue}`);
        return newState;
    } catch (error) {
        Chat.log(`&cError modifying state: ${error.message}`);
        return state; // Return original state on failure
    }
}

// Usage example
const block = Player.getPlayer().rayTraceBlock(10);
if (block && block.block) {
    const blockState = block.block.getBlockState();

    // Safe modification with validation
    const modifiedState = modifyStateSafely(blockState, "facing", "north");

    // This will fail gracefully if property doesn't exist
    const invalidMod = modifyStateSafely(modifiedState, "invalid_prop", "value");
}
```

## Version History

- **1.8.4:** Initial release with basic state management functionality
- **Current:** Enhanced with comprehensive property access and modification capabilities