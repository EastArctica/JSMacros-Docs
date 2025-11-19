# CyclingButtonWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.CyclingButtonWidgetHelper<T>`

**Implements:** `ClickableWidgetHelper<CyclingButtonWidgetHelper<T>, CyclingButtonWidget<T>>`

**Since:** JsMacros 1.8.4

The `CyclingButtonWidgetHelper` class is a JSMacros helper for cycling button widgets that allows users to cycle through predefined values when clicked. This widget is perfect for settings toggles, option selections, and any UI element where users need to choose from a discrete set of options. Cycling buttons automatically advance through their values each time they're clicked and display the current value as text.

## Overview

The `CyclingButtonWidgetHelper` provides a user-friendly way to create buttons that cycle through a sequence of values. Each click advances to the next value in the sequence, wrapping around when reaching the end. This makes it ideal for:

- **Settings toggles** (On/Off, True/False, etc.)
- **Mode selection** (Easy/Medium/Hard, Day/Night, etc.)
- **Option cycling** (Red/Green/Blue, Small/Medium/Large, etc.)
- **Configuration interfaces** where users need to select from predefined options

**Key Features:**
- Automatic value cycling with wrap-around
- Customizable value-to-text conversion for display
- Support for default and alternate value sets
- Optional prefix text for labels
- Builder pattern for easy configuration
- Action callbacks on value changes
- Chainable method calls for fluent API

## Creating a CyclingButtonWidgetHelper

You typically create cycling buttons through the screen's widget creation methods:

```javascript
// Example: Creating a cycling button through a screen
const screen = Hud.createScreen("Settings", 200, 150);

// Create a cycling button with string values
const modeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .pos(10, 10)
    .size(150, 20)
    .values("Easy", "Medium", "Hard")
    .initially("Easy")
    .option("Difficulty:")
    .build();

screen.open();
```

## Methods

### Value Management

#### `getValue()`
**Returns:** `T` - The current value of the cycling button

Retrieves the current value selected in the cycling button.

```javascript
const currentValue = modeButton.getValue();
Chat.log("Current difficulty: " + currentValue);
```

#### `getStringValue()`
**Returns:** `String` - The current value converted to string representation

Returns the current value as it would be displayed on the button, using the value-to-text conversion function.

```javascript
const displayText = modeButton.getStringValue();
Chat.log("Button displays: " + displayText);
```

#### `setValue(val)`
**Parameters:**
- `val` (`T`): The new value to set

**Returns:** `boolean` - `true` if the value changed, `false` if the value was already set

Sets the cycling button to a specific value. The value must be one of the configured values.

```javascript
const changed = modeButton.setValue("Hard");
if (changed) {
    Chat.log("Difficulty changed to Hard");
} else {
    Chat.log("Difficulty was already Hard");
}
```

### Cycling Control

#### `cycle(amount)`
**Parameters:**
- `amount` (`int`): Number of steps to cycle (positive for forward, negative for backward)

**Returns:** `CyclingButtonWidgetHelper<T>` - Self for chaining

Cycles the button by the specified amount of steps. Positive values move forward through the values, negative values move backward.

```javascript
// Cycle forward by 2 steps
modeButton.cycle(2);

// Cycle backward by 1 step
modeButton.cycle(-1);
```

#### `forward()`
**Returns:** `CyclingButtonWidgetHelper<T>` - Self for chaining

Cycles the button forward by one step (equivalent to `cycle(1)`).

```javascript
modeButton.forward(); // Move to next value
```

#### `backward()`
**Returns:** `CyclingButtonWidgetHelper<T>` - Self for chaining

Cycles the button backward by one step (equivalent to `cycle(-1)`).

```javascript
modeButton.backward(); // Move to previous value
```

### Inherited Methods

The `CyclingButtonWidgetHelper` inherits all methods from `ClickableWidgetHelper`:

#### Position and Size Methods
- `getX()` - Gets the x coordinate
- `getY()` - Gets the y coordinate
- `setPos(x, y)` - Sets the position
- `getWidth()` - Gets the width
- `getHeight()` - Gets the height
- `setWidth(width)` - Sets the width

#### Appearance Methods
- `setLabel(String label)` - Sets the button label (deprecated)
- `setLabel(TextHelper helper)` - Sets the button label
- `getLabel()` - Gets the current label
- `setAlpha(alpha)` - Sets transparency

#### State Methods
- `getActive()` - Gets whether the button is clickable
- `setActive(boolean active)` - Sets whether the button is clickable
- `setVisible(boolean visible)` - Sets whether the button is visible

#### Interaction Methods
- `click()` - Programmatically clicks the button
- `click(boolean await)` - Clicks with optional waiting
- `setTooltip(Object... tooltips)` - Sets tooltip text

## CyclicButtonBuilder Class

The `CyclicButtonBuilder<T>` class provides a fluent API for creating cycling buttons. It allows you to configure all aspects of the cycling button before creation.

### Creating a Builder

```javascript
const screen = Hud.createScreen("Builder Example", 300, 200);

// Create a builder with a value-to-text conversion function
const builder = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        return Chat.createTextHelperFromString("Mode: " + value.toString());
    })
);
```

### Builder Methods

#### Value Configuration

##### `values(T[] defaults, T[] alternatives)`
**Parameters:**
- `defaults` (`T[]`): Default value array
- `alternatives` (`T[]`): Alternative value array

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Sets both default and alternative value sets. The button will cycle through alternatives when the alternate toggle condition is true.

```javascript
builder.values(
    ["Day", "Night"],           // Default values
    ["Morning", "Evening"]      // Alternative values
);
```

##### `initially(T value)`
**Parameters:**
- `value` (`T`): The initial value for the button

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Sets the starting value for the cycling button.

```javascript
builder.initially("Medium");
```

#### Text and Display Configuration

##### `option(String option)`
##### `option(TextHelper option)`
**Parameters:**
- `option` (`String | TextHelper`): The prefix text to display before the value

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Sets a prefix text that appears before the value, separated by a colon.

```javascript
builder.option("Difficulty:");
// Result display: "Difficulty: Medium"

builder.option(Chat.createTextHelperFromString("Game Mode:"));
// Result display: "Game Mode: Creative"
```

##### `omitTextOption(boolean optionTextOmitted)`
**Parameters:**
- `optionTextOmitted` (`boolean`): Whether to omit the prefix text

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Controls whether the prefix text should be displayed or omitted.

```javascript
builder.omitTextOption(true); // Only show the value, no prefix
```

#### Behavior Configuration

##### `action(MethodWrapper<CyclingButtonWidgetHelper<T>, IScreen, Object, ?> action)`
**Parameters:**
- `action` (`MethodWrapper`): The action to execute when the button is clicked

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Sets the action to run when the button is clicked. The action receives the button helper and screen as parameters.

```javascript
builder.action((button, screen) => {
    const newValue = button.getValue();
    Chat.log("Difficulty changed to: " + newValue);

    // Additional logic based on the new value
    if (newValue === "Hard") {
        Chat.log("Hard mode selected - Good luck!");
    }
});
```

##### `valueToText(MethodWrapper<T, ?, TextHelper, ?> valueToText)`
**Parameters:**
- `valueToText` (`MethodWrapper`): Function to convert values to display text

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Sets a custom function to convert button values to display text.

```javascript
builder.valueToText(JavaWrapper.methodToJava((value) => {
    // Custom formatting for different values
    switch (value) {
        case "Easy":
            return Chat.createTextHelperFromString("§aEasy Mode");
        case "Medium":
            return Chat.createTextHelperFromString("§eMedium Mode");
        case "Hard":
            return Chat.createTextHelperFromString("§cHard Mode");
        default:
            return Chat.createTextHelperFromString(value.toString());
    }
}));
```

##### `alternateToggle(MethodWrapper<?, ?, Boolean, ?> alternateToggle)`
**Parameters:**
- `alternateToggle` (`MethodWrapper`): Function to determine when to use alternative values

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

Sets a function that determines whether the button should cycle through default values or alternative values. Returns `true` to use alternatives, `false` to use defaults.

```javascript
// Use different values based on time of day
builder.alternateToggle(JavaWrapper.methodToJava(() => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18; // True during daytime
}));
```

#### Creation Method

##### `build()`
**Returns:** `CyclingButtonWidgetHelper<T>` - The configured cycling button

Creates the cycling button with all configured settings and adds it to the screen.

```javascript
const cyclingButton = builder
    .pos(10, 10)
    .size(150, 20)
    .values("Option 1", "Option 2", "Option 3")
    .initially("Option 1")
    .option("Selection:")
    .action((btn, scr) => Chat.log("Selected: " + btn.getValue()))
    .build();
```

## Usage Examples

### Example 1: Basic Difficulty Selector

```javascript
// Create a simple difficulty selection screen
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

        // Apply difficulty-based effects
        switch (difficulty) {
            case "Easy":
                Chat.log("§aEasy mode - Reduced enemy damage");
                break;
            case "Hard":
                Chat.log("§cHard mode - Increased enemy damage");
                break;
            case "Extreme":
                Chat.log("§4Extreme mode - Maximum challenge!");
                break;
        }
    })
    .build();

screen.open();
```

### Example 2: Toggle Button with Boolean Values

```javascript
// Create an on/off toggle button
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

        // Update button appearance based on state
        if (isEnabled) {
            button.setAlpha(1.0);
        } else {
            button.setAlpha(0.7);
        }
    })
    .build();

screen.open();
```

### Example 3: Color Picker with Custom Display

```javascript
// Create a color picker that shows colored text
const screen = Hud.createScreen("Color Selector", 250, 200);

const colorButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        // Convert color names to colored text
        const colorCodes = {
            "Red": "§c",
            "Green": "§a",
            "Blue": "§9",
            "Yellow": "§e",
            "Purple": "§d",
            "White": "§f"
        };
        const colorCode = colorCodes[value] || "§f";
        return Chat.createTextHelperFromString(colorCode + value);
    })
)
    .pos(50, 50)
    .size(150, 20)
    .values("Red", "Green", "Blue", "Yellow", "Purple", "White")
    .initially("Blue")
    .option("Color:")
    .action((button, currentScreen) => {
        const selectedColor = button.getValue();
        Chat.log("Selected color: " + selectedColor);

        // Change screen background based on color (hypothetical)
        currentScreen.setBackgroundColor(selectedColor);
    })
    .build();

screen.open();
```

### Example 4: Day/Night Mode with Alternate Values

```javascript
// Create a button that shows different options based on time
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
        // Use alternatives when player has special permission
        const player = Player.getPlayer();
        return player && player.getHealth() >= 18; // Full health
    }))
    .action((button, currentScreen) => {
        const timeOfDay = button.getValue();
        Chat.log("Time set to: " + timeOfDay);

        const isAlternate = button.alternateToggle?.() || false;
        Chat.log("Using " + (isAlternate ? "special" : "normal") + " time options");
    })
    .build();

// Add a button to check current toggle state
const checkButton = screen.addButton()
    .pos(50, 80)
    .size(200, 20)
    .message("Check Toggle State")
    .action((btn, scr) => {
        const player = Player.getPlayer();
        const hasAlternates = player && player.getHealth() >= 18;
        Chat.log("Alternative values " + (hasAlternates ? "enabled" : "disabled"));
    })
    .build();

screen.open();
```

### Example 5: Number Cycling with Step Control

```javascript
// Create a button that cycles through numeric values
const screen = Hud.createScreen("Number Controls", 250, 200);

// Values from 1 to 10
const numberValues = Array.from({length: 10}, (_, i) => i + 1);

const numberButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .pos(50, 50)
    .size(150, 20)
    .values(...numberValues)
    .initially(5)
    .option("Amount:")
    .action((button, currentScreen) => {
        const currentValue = button.getValue();
        Chat.log("Selected amount: " + currentValue);
    })
    .build();

// Add buttons to step through values
const stepForwardButton = screen.addButton()
    .pos(50, 80)
    .size(70, 20)
    .message("+1")
    .action((btn, scr) => {
        numberButton.forward();
        Chat.log("Stepped forward to: " + numberButton.getValue());
    })
    .build();

const stepBackwardButton = screen.addButton()
    .pos(130, 80)
    .size(70, 20)
    .message("-1")
    .action((btn, scr) => {
        numberButton.backward();
        Chat.log("Stepped backward to: " + numberButton.getValue());
    })
    .build();

screen.open();
```

### Example 6: Multi-Mode Selector with Custom Logic

```javascript
// Create a complex mode selector with different behaviors
const screen = Hud.createScreen("Advanced Settings", 350, 250);

const gameModes = [
    "Peaceful",
    "Easy",
    "Normal",
    "Hard",
    "Creative",
    "Spectator"
];

const modeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        // Custom formatting for different game modes
        const modeColors = {
            "Peaceful": "§a",
            "Easy": "§2",
            "Normal": "§f",
            "Hard": "§c",
            "Creative": "§b",
            "Spectator": "§7"
        };
        const color = modeColors[value] || "§f";
        return Chat.createTextHelperFromString(color + value + " Mode");
    })
)
    .pos(50, 50)
    .size(200, 20)
    .values(...gameModes)
    .initially("Normal")
    .option("Game Mode:")
    .action((button, currentScreen) => {
        const mode = button.getValue();
        Chat.log("Game mode changed to: " + mode);

        // Apply mode-specific logic
        switch (mode) {
            case "Peaceful":
                Chat.log("§aPeaceful mode activated - No hostile mobs");
                break;
            case "Creative":
                Chat.log("§bCreative mode activated - Unlimited resources");
                break;
            case "Spectator":
                Chat.log("§7Spectator mode activated - Fly through walls");
                break;
            default:
                Chat.log("Survival mode activated - Gather resources");
        }

        // Update button appearance based on mode
        if (["Creative", "Spectator"].includes(mode)) {
            button.setAlpha(0.8); // Dim for non-survival modes
        } else {
            button.setAlpha(1.0); // Full brightness for survival
        }
    })
    .build();

// Add info display
const infoButton = screen.addButton()
    .pos(50, 80)
    .size(200, 20)
    .message("Show Current Info")
    .action((btn, scr) => {
        const currentMode = modeButton.getValue();
        const stringValue = modeButton.getStringValue();

        Chat.log("=== Current Mode Info ===");
        Chat.log("Raw value: " + currentMode);
        Chat.log("Display text: " + stringValue);
        Chat.log("Is survival: " + !["Creative", "Spectator"].includes(currentMode));
    })
    .build();

screen.open();
```

### Example 7: Dynamic Value Cycling Based on Context

```javascript
// Create a cycling button that adapts its values based on game context
const screen = Hud.createScreen("Adaptive Controls", 300, 250);

// Function to get context-appropriate values
const getContextValues = () => {
    const player = Player.getPlayer();
    if (!player) return ["No Player"];

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    if (healthPercent > 0.75) {
        return ["Aggressive", "Balanced", "Defensive"];
    } else if (healthPercent > 0.25) {
        return ["Balanced", "Defensive", "Cautious"];
    } else {
        return ["Defensive", "Cautious", "Retreat"];
    }
};

const contextButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        // Color code based on value type
        const colors = {
            "Aggressive": "§c",
            "Balanced": "§e",
            "Defensive": "§b",
            "Cautious": "§2",
            "Retreat": "§7",
            "No Player": "§8"
        };
        const color = colors[value] || "§f";
        return Chat.createTextHelperFromString(color + value);
    })
)
    .pos(50, 50)
    .size(200, 20)
    .values(...getContextValues())
    .initially("Balanced")
    .option("Combat Style:")
    .action((button, currentScreen) => {
        const style = button.getValue();
        Chat.log("Combat style: " + style);

        // Update available values based on new context
        const newValues = getContextValues();
        // Note: In practice, you'd need to recreate the button or use
        // a different approach for dynamic value updates
    })
    .build();

// Add refresh button to update values
const refreshButton = screen.addButton()
    .pos(50, 80)
    .size(200, 20)
    .message("Refresh Values (Based on Health)")
    .action((btn, scr) => {
        const player = Player.getPlayer();
        if (player) {
            const health = Math.floor(player.getHealth());
            const maxHealth = Math.floor(player.getMaxHealth());
            const healthPercent = (health / maxHealth * 100).toFixed(1);

            Chat.log(`Health: ${health}/${maxHealth} (${healthPercent}%)`);
            Chat.log("Recommended values: " + getContextValues().join(", "));
        } else {
            Chat.log("No player found");
        }
    })
    .build();

screen.open();
```

## Best Practices

### Value Management
1. **Choose Appropriate Value Types:** Use strings, numbers, or enums that make sense for your use case
2. **Consistent Value Sets:** Ensure all values in a cycling button are of the same type
3. **Meaningful Order:** Arrange values in a logical progression (Easy→Medium→Hard, not random)

### Display Formatting
1. **Clear Value-to-Text Conversion:** Make sure users can understand what each value represents
2. **Consistent Prefixes:** Use meaningful option prefixes to provide context
3. **Color Coding:** Use colors to distinguish between different value types or states

### User Experience
1. **Reasonable Value Sets:** Don't overwhelm users with too many options (5-7 is usually optimal)
2. **Clear Feedback:** Provide visual or chat feedback when values change
3. **Logical Starting Values:** Set the `initially()` value to the most common or safe choice

### Performance Considerations
1. **Efficient Value-to-Text Functions:** Keep conversion functions simple and fast
2. **Minimal Action Logic:** Avoid heavy processing in button action callbacks
3. **Appropriate Update Frequency:** Don't update cycling buttons too frequently

## Error Handling

The cycling button includes built-in error handling for common issues:

```javascript
const safeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        try {
            // This could potentially cause issues
            const processedValue = someComplexProcessing(value);
            return Chat.createTextHelperFromString(processedValue.toString());
        } catch (e) {
            Chat.log("Error processing value: " + e.message);
            return Chat.createTextHelperFromString("Error: " + value.toString());
        }
    })
)
    .values("Option 1", "Option 2", "Option 3")
    .action((button, screen) => {
        try {
            // Potentially problematic action
            doSomethingComplex(button.getValue());
        } catch (e) {
            Chat.log("Action failed: " + e.message);
        }
    })
    .build();
```

## Related Classes

- `ClickableWidgetHelper` - Parent class providing basic widget functionality
- `AbstractWidgetBuilder` - Parent class of the builder providing common builder methods
- `IScreen` - Screen interface for creating and managing UI elements
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript functions used in callbacks
- `CyclingButtonWidget` - The underlying Minecraft cycling button widget

## Important Notes

1. **Generic Types:** The class uses generic type `<T>` for type safety - all values should be of the same type
2. **Value-to-Text Conversion Required:** You must provide a value-to-text conversion function when creating cycling buttons
3. **Automatic Wrapping:** Values automatically wrap around when cycling past the end or beginning
4. **Thread Safety:** Button actions are executed on the main thread and include error handling
5. **Screen Integration:** Built buttons are automatically added to the screen when `build()` is called

## Version Information

- Available since JSMacros 1.8.4
- Builder pattern implementation aligns with JSMacros widget system
- Consistent with other widget builders in the framework
- Enhanced with comprehensive method set and improved error handling

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

This builder is particularly useful for creating settings interfaces, mode selectors, and any UI component where users need to choose from a predefined set of options.

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

## Constructors

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

**Example:**
```javascript
builder.initially("Medium");
```

#### `values(values...)`
Sets the default values that the button will cycle through.

**Parameters:**
- `values` (`T...`): Variable number of values to cycle through

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.values("Easy", "Medium", "Hard", "Extreme");
```

#### `alternatives(values...)`
Sets alternative values that the button will cycle through when the alternate toggle condition is true.

**Parameters:**
- `values` (`T...`): Variable number of alternative values

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.alternatives("Peaceful", "Normal", "Hard");
```

#### `values(defaults, alternatives)`
Sets both default and alternative value arrays.

**Parameters:**
- `defaults` (`T[]`): Default value array
- `alternatives` (`T[]`): Alternative value array

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.values(
    ["Day", "Night"],           // Default values
    ["Morning", "Evening"]      // Alternative values
);
```

#### `values(defaults, alternatives)` (List version)
Sets both default and alternative value lists.

**Parameters:**
- `defaults` (`List<T>`): Default value list
- `alternatives` (`List<T>`): Alternative value list

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
const defaultList = Java.to(["Red", "Green", "Blue"], "java.util.List");
const alternateList = Java.to(["Light Red", "Light Green", "Light Blue"], "java.util.List");
builder.values(defaultList, alternateList);
```

### Text and Display Methods

#### `option(option)`
Sets a prefix text that appears before the button value, separated by a colon.

**Parameters:**
- `option` (`String`): The prefix text to display

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.option("Difficulty:");
// Result display: "Difficulty: Medium"
```

#### `option(option)` (TextHelper version)
Sets a prefix text using a TextHelper object.

**Parameters:**
- `option` (`TextHelper`): The prefix text to display

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.option(Chat.createTextHelperFromString("§bGame Mode:"));
```

#### `omitTextOption(optionTextOmitted)`
Controls whether the prefix option text should be displayed or omitted.

**Parameters:**
- `optionTextOmitted` (`boolean`): Whether to omit the prefix text

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.omitTextOption(true); // Only show the value, no prefix
```

### Behavior Configuration Methods

#### `action(action)`
Sets the action to run when the button is clicked.

**Parameters:**
- `action` (`MethodWrapper<CyclingButtonWidgetHelper<T>, IScreen, Object, ?>`): The action callback

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.action((button, screen) => {
    const newValue = button.getValue();
    Chat.log("New value: " + newValue);
});
```

#### `valueToText(valueToText)`
Sets a custom function to convert button values to display text.

**Parameters:**
- `valueToText` (`MethodWrapper<T, ?, TextHelper, ?>`): Function to convert values to text

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.valueToText(JavaWrapper.methodToJava((value) => {
    switch (value) {
        case "Easy":
            return Chat.createTextHelperFromString("§aEasy");
        case "Hard":
            return Chat.createTextHelperFromString("§cHard");
        default:
            return Chat.createTextHelperFromString(value.toString());
    }
}));
```

#### `alternateToggle(alternateToggle)`
Sets a function to determine whether the button should use alternative values.

**Parameters:**
- `alternateToggle` (`MethodWrapper<?, ?, Boolean, ?>`): Function returning true for alternatives

**Returns:** `CyclicButtonBuilder<T>` - Self for chaining

**Example:**
```javascript
builder.alternateToggle(JavaWrapper.methodToJava(() => {
    const player = Player.getPlayer();
    return player && player.getHealth() >= 18; // Use alternatives at full health
}));
```

### Creation Methods

#### `createWidget()`
Creates the cycling button widget with all configured settings.

**Returns:** `CyclingButtonWidgetHelper<T>` - The configured cycling button

**Example:**
```javascript
const button = builder
    .pos(10, 10)
    .size(150, 20)
    .values("Option 1", "Option 2", "Option 3")
    .initially("Option 1")
    .createWidget();
```

#### `build()`
Creates the cycling button and adds it to the screen (alias for createWidget).

**Returns:** `CyclingButtonWidgetHelper<T>` - The configured cycling button

**Example:**
```javascript
const button = builder
    .pos(10, 10)
    .size(150, 20)
    .values("Red", "Green", "Blue")
    .initially("Green")
    .build();
```

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

### Example 1: Basic Difficulty Selector

```javascript
// Create a simple difficulty selection screen
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

### Example 2: Toggle Button with Boolean Values

```javascript
// Create an on/off toggle button
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

### Example 3: Color Picker with Custom Display

```javascript
// Create a color picker that shows colored text
const screen = Hud.createScreen("Color Selector", 250, 200);

const colorButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        const colorCodes = {
            "Red": "§c",
            "Green": "§a",
            "Blue": "§9",
            "Yellow": "§e",
            "Purple": "§d"
        };
        const colorCode = colorCodes[value] || "§f";
        return Chat.createTextHelperFromString(colorCode + value);
    })
)
    .pos(50, 50)
    .size(150, 20)
    .values("Red", "Green", "Blue", "Yellow", "Purple")
    .initially("Blue")
    .option("Color:")
    .action((button, currentScreen) => {
        const selectedColor = button.getValue();
        Chat.log("Selected color: " + selectedColor);
    })
    .build();

screen.open();
```

### Example 4: Time-Based Value Switching

```javascript
// Create a button that shows different options based on time
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

### Example 5: Numeric Value Cycling

```javascript
// Create a button that cycles through numeric values
const screen = Hud.createScreen("Number Controls", 250, 200);

// Create array of numbers from 1 to 10
const numberValues = Array.from({length: 10}, (_, i) => i + 1);

const numberButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .pos(50, 50)
    .size(150, 20)
    .values(...numberValues)
    .initially(5)
    .option("Amount:")
    .action((button, currentScreen) => {
        const currentValue = button.getValue();
        Chat.log("Selected amount: " + currentValue);
    })
    .build();

screen.open();
```

### Example 6: Complex Mode Selector with Formatting

```javascript
// Create a sophisticated mode selector
const screen = Hud.createScreen("Advanced Settings", 350, 250);

const gameModes = ["Peaceful", "Easy", "Normal", "Hard", "Creative"];

const modeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        const modeColors = {
            "Peaceful": "§a",
            "Easy": "§2",
            "Normal": "§f",
            "Hard": "§c",
            "Creative": "§b"
        };
        const color = modeColors[value] || "§f";
        return Chat.createTextHelperFromString(color + value + " Mode");
    })
)
    .pos(50, 50)
    .size(200, 20)
    .values(...gameModes)
    .initially("Normal")
    .option("Game Mode:")
    .action((button, currentScreen) => {
        const mode = button.getValue();
        Chat.log("Game mode changed to: " + mode);

        // Apply mode-specific logic
        switch (mode) {
            case "Creative":
                Chat.log("§bCreative mode - Unlimited resources");
                button.setAlpha(0.8); // Dim for non-survival
                break;
            case "Peaceful":
                Chat.log("§aPeaceful mode - No hostile mobs");
                button.setAlpha(1.0);
                break;
            default:
                button.setAlpha(1.0);
        }
    })
    .build();

screen.open();
```

### Example 7: Context-Aware Value Sets

```javascript
// Create a button that adapts based on player health
const screen = Hud.createScreen("Adaptive Controls", 300, 250);

// Define context-appropriate values
const getHealthBasedValues = () => {
    const player = Player.getPlayer();
    if (!player) return ["No Player"];

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    if (healthPercent > 0.75) {
        return ["Aggressive", "Balanced", "Defensive"];
    } else if (healthPercent > 0.25) {
        return ["Balanced", "Defensive", "Cautious"];
    } else {
        return ["Defensive", "Cautious", "Retreat"];
    }
};

const contextButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        const colors = {
            "Aggressive": "§c",
            "Balanced": "§e",
            "Defensive": "§b",
            "Cautious": "§2",
            "Retreat": "§7",
            "No Player": "§8"
        };
        const color = colors[value] || "§f";
        return Chat.createTextHelperFromString(color + value);
    })
)
    .pos(50, 50)
    .size(200, 20)
    .values(...getHealthBasedValues())
    .initially("Balanced")
    .option("Combat Style:")
    .action((button, currentScreen) => {
        const style = button.getValue();
        Chat.log("Combat style: " + style);
    })
    .build();

screen.open();
```

### Example 8: Multi-Button Interface with Coordination

```javascript
// Create an interface with multiple coordinated cycling buttons
const screen = Hud.createScreen("Complex Settings", 400, 300);

// Difficulty button
const difficultyButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        const colors = { "Easy": "§a", "Medium": "§e", "Hard": "§c" };
        return Chat.createTextHelperFromString((colors[value] || "§f") + value);
    })
)
    .pos(50, 50)
    .size(120, 20)
    .values("Easy", "Medium", "Hard")
    .initially("Medium")
    .option("Difficulty:")
    .build();

// Time button with alternatives based on difficulty
const timeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .pos(200, 50)
    .size(150, 20)
    .values("Day", "Night")
    .alternatives("Dawn", "Dusk", "Midnight")
    .initially("Day")
    .option("Time:")
    .alternateToggle(JavaWrapper.methodToJava(() => {
        // Use alternatives when difficulty is Hard
        return difficultyButton.getValue() === "Hard";
    }))
    .build();

// World size button
const sizeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value + "x" + value))
)
    .pos(50, 100)
    .size(120, 20)
    .values("512", "1024", "2048", "4096")
    .initially("1024")
    .option("World Size:")
    .build();

// Apply button that reads all values
const applyButton = screen.addButton()
    .pos(50, 150)
    .size(300, 25)
    .message("Apply Settings")
    .action((btn, scr) => {
        Chat.log("=== Settings Applied ===");
        Chat.log("Difficulty: " + difficultyButton.getValue());
        Chat.log("Time: " + timeButton.getValue());
        Chat.log("World Size: " + sizeButton.getValue());

        const isAlternativeTime = difficultyButton.getValue() === "Hard";
        Chat.log("Time Mode: " + (isAlternativeTime ? "Extended" : "Standard"));
    })
    .build();

screen.open();
```

## Advanced Usage Patterns

### Dynamic Value-to-Text Conversion

```javascript
// Complex value formatting with multiple factors
const advancedButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        // Format based on value type and context
        if (typeof value === 'number') {
            return Chat.createTextHelperFromString(`§b${value} §7units`);
        } else if (typeof value === 'string') {
            // Capitalize and add formatting
            const formatted = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return Chat.createTextHelperFromString(`§e${formatted}`);
        } else {
            return Chat.createTextHelperFromString(`§f${value.toString()}`);
        }
    })
)
    .values(1, 5, 10, "Auto", "Infinite")
    .initially(5)
    .build();
```

### Conditional Action Logic

```javascript
// Button with complex action based on current and previous values
let previousValue = null;

const conditionalButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .values("Mode A", "Mode B", "Mode C")
    .initially("Mode A")
    .action((button, currentScreen) => {
        const currentValue = button.getValue();

        // Different behavior based on transition
        if (previousValue === "Mode A" && currentValue === "Mode B") {
            Chat.log("§aUpgraded from Mode A to Mode B");
        } else if (previousValue === "Mode C" && currentValue === "Mode A") {
            Chat.log("§cReset from Mode C to Mode A");
        } else {
            Chat.log("Changed to: " + currentValue);
        }

        previousValue = currentValue;

        // Enable/disable other UI elements based on mode
        updateUIBasedOnMode(currentValue);
    })
    .build();
```

### Error Handling in Builders

```javascript
// Robust builder with error handling
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
    .action((button, currentScreen) => {
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

### Error Handling
1. **Validate Values**: Ensure all values are compatible with your conversion logic
2. **Graceful Degradation**: Handle errors in value-to-text conversion
3. **Safe Defaults**: Provide fallback behavior for edge cases

## Method Chaining Examples

### Complete Builder Chain

```javascript
const completeButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        const colorMap = { "Low": "§a", "Medium": "§e", "High": "§c" };
        return Chat.createTextHelperFromString((colorMap[value] || "§f") + value);
    })
)
    .pos(10, 10)                    // Position
    .size(200, 25)                  // Size
    .values("Low", "Medium", "High") // Values
    .initially("Medium")             // Initial value
    .option("Quality:")              // Prefix text
    .alpha(1.0)                      // Full opacity
    .zIndex(10)                      // Rendering order
    .action((btn, scr) => {          // Click action
        Chat.log("Quality: " + btn.getValue());
    })
    .build();                        // Create and add to screen
```

### Conditional Configuration

```javascript
const conditionalButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
);

// Apply configuration based on conditions
if (Player.getPlayer().getHealth() > 15) {
    conditionalButton
        .values("Normal", "Hard", "Extreme")
        .initially("Hard");
} else {
    conditionalButton
        .values("Easy", "Normal")
        .initially("Easy");
}

conditionalButton
    .pos(50, 50)
    .size(150, 20)
    .option("Difficulty:")
    .build();
```

## Error Handling and Debugging

### Common Issues and Solutions

```javascript
// Issue: Invalid value in value set
try {
    const button = screen.addCyclingButton(
        JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
    )
        .values("Valid", 123, null) // Mixed types can cause issues
        .build();
} catch (e) {
    Chat.log("§cError creating button: " + e.message);
}

// Solution: Ensure consistent value types
const fixedButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => Chat.createTextHelperFromString(value.toString()))
)
    .values("Option A", "Option B", "Option C") // All strings
    .build();
```

### Debug Mode Configuration

```javascript
const DEBUG_MODE = true; // Set to false for production

const debugButton = screen.addCyclingButton(
    JavaWrapper.methodToJava((value) => {
        if (DEBUG_MODE) {
            Chat.log("§7[DEBUG] Formatting value: " + value);
        }
        return Chat.createTextHelperFromString(value.toString());
    })
)
    .values("Test 1", "Test 2", "Test 3")
    .action((button, screen) => {
        const value = button.getValue();
        if (DEBUG_MODE) {
            Chat.log("§7[DEBUG] Button clicked with value: " + value);
            Chat.log("§7[DEBUG] Button state: " + button.toString());
        }
        // Normal action logic
        Chat.log("Selected: " + value);
    })
    .build();
```

## Related Classes

- `CyclingButtonWidgetHelper` - The resulting cycling button widget
- `AbstractWidgetBuilder` - Parent class providing common builder functionality
- `ClickableWidgetHelper` - Parent class for clickable widget functionality
- `IScreen` - Screen interface for creating and managing UI elements
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript functions used in callbacks
- `CyclingButtonWidget` - The underlying Minecraft cycling button widget

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