# CyclingButtonWidgetHelper.CyclicButtonBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.CyclingButtonWidgetHelper.CyclicButtonBuilder<T>`

**Implements:** `AbstractWidgetBuilder<CyclicButtonBuilder<T>, CyclingButtonWidget<T>, CyclingButtonWidgetHelper<T>>`

**Since:** JsMacros 1.8.4

The `CyclicButtonBuilder` class is a fluent builder for creating cycling button widgets that allow users to cycle through predefined values with each click. This builder provides a comprehensive API for configuring all aspects of cycling buttons including value sets, display formatting, behavior customization, and event handling. It's designed to create intuitive UI elements for settings toggles, mode selections, and any interface requiring discrete value selection.

## Overview

The `CyclicButtonBuilder` class offers a powerful and flexible way to create cycling buttons with:

- **Value Management**: Support for default and alternative value sets with automatic cycling
- **Custom Display Formatting**: Configurable value-to-text conversion for rich text display
- **Behavior Control**: Toggle functions for conditional value sets and custom actions
- **Visual Customization**: Optional prefix text and display formatting options
- **Event Handling**: Action callbacks for responding to value changes
- **Builder Pattern**: Fluent API with method chaining for easy configuration

## Creating a CyclicButtonBuilder

You typically create a `CyclicButtonBuilder` through screen creation methods:

```javascript
// Create a builder with a value-to-text conversion function
const screen = Hud.createScreen("Settings", 300, 200);

const builder = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        return Chat.createTextHelperFromString("Mode: " + value.toString());
    })
);
```

## Constructor

### `new CyclicButtonBuilder(screen, valueToText)`
Creates a new CyclicButtonBuilder with the specified screen and value-to-text conversion function.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| screen | `IScreen` | The screen to add the button to |
| valueToText | `MethodWrapper<T, ?, TextHelper, ?>` | Function to convert values to display text |

**Example:**
```javascript
const builder = new CyclingButtonWidgetHelper.CyclicButtonBuilder(
    screen,
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
);
```

## Methods

### Value Configuration Methods

#### `initially(value)`
Sets the initial value for the cycling button.

**Parameters:**
- `value` (`T`): The initial value for the button

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

#### `values(values...)`
Sets the default values that the button will cycle through.

**Parameters:**
- `values` (`T...`): Variable number of values to cycle through

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

#### `alternatives(values...)`
Sets alternative values that the button will cycle through when the alternate toggle condition is true.

**Parameters:**
- `values` (`T...`): Variable number of alternative values

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

#### `values(defaults, alternatives)`
Sets both default and alternative value arrays.

**Parameters:**
- `defaults` (`T[]`): Default value array
- `alternatives` (`T[]`): Alternative value array

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

### Text and Display Methods

#### `option(option)`
Sets a prefix text that appears before the button value, separated by a colon.

**Parameters:**
- `option` (`String | TextHelper`): The prefix text to display

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

#### `omitTextOption(optionTextOmitted)`
Controls whether the prefix text should be displayed or omitted.

**Parameters:**
- `optionTextOmitted` (`boolean`): Whether to omit the prefix text

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

### Behavior Configuration Methods

#### `action(action)`
Sets the action to run when the button is clicked.

**Parameters:**
- `action` (`MethodWrapper<CyclingButtonWidgetHelper<T>, IScreen, Object, ?>`): The action callback

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

#### `valueToText(valueToText)`
Sets a custom function to convert button values to display text.

**Parameters:**
- `valueToText` (`MethodWrapper<T, ?, TextHelper, ?>`): Function to convert values to text

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

#### `alternateToggle(alternateToggle)`
Sets a function to determine whether the button should use alternative values.

**Parameters:**
- `alternateToggle` (`MethodWrapper<?, ?, Boolean, ?>`): Function returning true for alternatives

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

### Creation Methods

#### `build()`
Creates the cycling button and adds it to the screen.

**Returns:** `CyclingButtonWidgetHelper<T>` - The configured cycling button

#### `createWidget()`
Creates the cycling button widget with all configured settings.

**Returns:** `CyclingButtonWidgetHelper<T>` - The configured cycling button

### Inherited Methods

The `CyclicButtonBuilder` inherits all methods from `AbstractWidgetBuilder`:

#### Position and Size Methods
- `pos(x, y)` - Sets the position
- `x(x)` - Sets the x coordinate
- `y(y)` - Sets the y coordinate
- `size(width, height)` - Sets the dimensions
- `width(width)` - Sets the width
- `height(height)` - Sets the height

#### Appearance Methods
- `alpha(alpha)` - Sets transparency
- `visible(visible)` - Sets visibility
- `active(active)` - Sets whether the widget is interactive

#### Z-index Methods
- `zIndex(zIndex)` - Sets the rendering order

## Usage Examples

### Basic Difficulty Selector

```javascript
const screen = Hud.createScreen("Game Settings", 250, 150);

const difficultyButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .pos(50, 50)
    .size(150, 20)
    .values("Easy", "Medium", "Hard", "Extreme")
    .initially("Medium")
    .option("Difficulty:")
    .action((button, currentScreen) => {
        const difficulty = button.getValue();
        Chat.log("Difficulty set to: " + difficulty);
    })
    .build();

screen.open();
```

### Toggle Button with Boolean Values

```javascript
const screen = Hud.createScreen("Toggle Controls", 200, 150);

const toggleButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        return Chat.createTextHelperFromString(
            value ? "§aON" : "§cOFF"
        );
    })
)
    .pos(50, 50)
    .size(100, 20)
    .values(false, true)
    .initially(false)
    .option("Feature:")
    .action((button, currentScreen) => {
        const isEnabled = button.getValue();
        Chat.log("Feature " + (isEnabled ? "enabled" : "disabled"));
    })
    .build();

screen.open();
```

### Time-Based Value Switching

```javascript
const screen = Hud.createScreen("Time Settings", 300, 200);

const timeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .pos(50, 50)
    .size(200, 20)
    .values("Morning", "Afternoon", "Evening")  // Default values
    .alternatives("Dawn", "Noon", "Dusk")        // Alternative values
    .initially("Afternoon")
    .option("Time of Day:")
    .alternateToggle(JavaWrapper.methodToJava(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18; // True during daytime
    }))
    .action((button, currentScreen) => {
        const timeOfDay = button.getValue();
        Chat.log("Time set to: " + timeOfDay);
    })
    .build();

screen.open();
```

## Best Practices

### Value Management
1. **Consistent Types**: Use values of the same type throughout a cycling button
2. **Logical Ordering**: Arrange values in a meaningful progression
3. **Appropriate Initial Values**: Set the most common or safest choice as initial

### User Experience
1. **Clear Display**: Use descriptive value-to-text conversion functions
2. **Meaningful Prefixes**: Provide context with option prefixes
3. **Reasonable Value Sets**: Limit to 3-7 options for optimal usability
4. **Visual Feedback**: Use colors and formatting to distinguish states

### Performance Considerations
1. **Efficient Conversion**: Keep value-to-text functions simple and fast
2. **Minimal Action Logic**: Avoid heavy processing in action callbacks
3. **Appropriate Updates**: Don't update cycling buttons too frequently

## Error Handling

The cycling button includes built-in error handling for common issues:

```javascript
const safeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        try {
            // Potentially complex formatting logic
            const processed = complexValueProcessing(value);
            return Chat.createTextHelperFromString(processed);
        } catch (e) {
            Chat.log("§cError formatting value: " + e.message);
            return Chat.createTextHelperFromString("§7Error: " + value.toString());
        }
    })
)
    .values("Option 1", "Option 2", "Option 3")
    .action((button, screen) => {
        try {
            // Potentially problematic action
            const value = button.getValue();
            executeComplexAction(value);
        } catch (e) {
            Chat.log("§cAction failed: " + e.message);
            // Optionally reset to a safe value
            button.setValue("Option 1");
        }
    })
    .build();
```

## Important Notes

1. **Generic Types**: The class uses generic type `<T>` for type safety - all values should be of the same type
2. **Value-to-Text Required**: A value-to-text conversion function is required when creating the builder
3. **Automatic Cycling**: Values automatically wrap around when cycling past the end or beginning
4. **Thread Safety**: Button actions are executed on the main thread with error handling
5. **Screen Integration**: Built buttons are automatically added to the screen when `build()` is called
6. **Memory Management**: Builder instances can be discarded after calling `build()`
7. **Null Safety**: The builder includes null checks for optional parameters
8. **Error Resilience**: Errors in value-to-text conversion or actions are caught and logged

## Version Information

- Available since JSMacros 1.8.4
- Part of the enhanced widget builder system
- Consistent with other widget builders in the framework
- Supports all modern JSMacros widget features
- Enhanced with comprehensive error handling and type safety

## Related Classes

- `CyclingButtonWidgetHelper` - The resulting cycling button widget
- `AbstractWidgetBuilder` - Parent class providing common builder functionality
- `ClickableWidgetHelper` - Parent class for clickable widget functionality
- `IScreen` - Screen interface for creating and managing UI elements
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript functions used in callbacks
- `CyclingButtonWidget` - The underlying Minecraft cycling button widget