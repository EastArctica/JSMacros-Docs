# SliderWidgetHelper.SliderBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.SliderWidgetHelper$SliderBuilder`

**Extends:** `AbstractWidgetBuilder<SliderBuilder, Slider, SliderWidgetHelper>`

**Since:** JsMacros 1.8.4

The `SliderWidgetHelper.SliderBuilder` class is a builder pattern implementation for creating slider widgets with configurable ranges, step sizes, initial values, and event handling. It provides a fluent interface for constructing interactive slider controls that can be added to custom screens and overlays in JSMacros.

## Overview

The `SliderBuilder` class enables the creation of customizable slider widgets with:
- Configurable step ranges (minimum 2 steps)
- Initial value positioning
- Change event callbacks with MethodWrapper
- Inherited positioning, sizing, and styling from AbstractWidgetBuilder
- Method chaining for fluent configuration
- Integration with IScreen rendering system

## Constructor

### `new SliderBuilder(IScreen screen)`
Creates a new SliderBuilder instance for the specified screen.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| screen | `IScreen` | The screen to which the slider will be added |

**Example:**
```javascript
const screen = Hud.createScreen("My Custom Screen", true);
const sliderBuilder = new SliderBuilder(screen);
```

## Fields

| Field | Type | Description |
|-------|------|-------------|
| steps | `int` | Number of steps the slider has (minimum 2) |
| value | `int` | Initial value of the slider (0 to steps-1) |
| action | `MethodWrapper` | Optional callback function for value changes |

## Methods

### `builder.steps(steps)`
Sets the number of steps for the slider.

**Parameters:**
1. `steps: int` - The amount of steps for the slider. Must be greater or equal to 2

**Returns:**
* `SliderBuilder` - Self for chaining

**Example:**
```javascript
const slider = screen.sliderBuilder()
    .steps(10)  // Slider will have 10 positions (0-9)
    .build();
```

### `builder.getSteps()`
Returns the configured number of steps.

**Returns:**
* `int` - The amount of steps of this slider

### `builder.initially(value)`
Sets the initial value of the slider.

**Parameters:**
1. `value: int` - The initial value of the slider. Must be between 0 and steps - 1

**Returns:**
* `SliderBuilder` - Self for chaining

**Example:**
```javascript
const slider = screen.sliderBuilder()
    .steps(100)
    .initially(25)  // Start at 25% position
    .build();
```

### `builder.getValue()`
Returns the configured initial value.

**Returns:**
* `int` - The initial value of the slider

### `builder.action(action)`
Sets the change listener callback for the slider.

**Parameters:**
1. `action: MethodWrapper<SliderWidgetHelper, IScreen, Object, ?>` - The change listener for the slider

**Returns:**
* `SliderBuilder` - Self for chaining

**Example:**
```javascript
const changeHandler = JavaWrapper.methodToJava((slider, screen) => {
    Chat.log(`Slider value changed to: ${slider.getValue()}`);
});

const slider = screen.sliderBuilder()
    .steps(50)
    .action(changeHandler)
    .build();
```

### `builder.getAction()`
Returns the configured change listener.

**Returns:**
* `MethodWrapper<SliderWidgetHelper, IScreen, Object, ?>` - The change listener of the slider

### `builder.createWidget()`
Creates and returns the actual SliderWidgetHelper instance.

**Returns:**
* `SliderWidgetHelper` - The constructed slider widget

**Note:** This method is called internally by `build()`. Use `build()` to add the widget to the screen.

## Inherited Methods from AbstractWidgetBuilder

The SliderBuilder also inherits all the positioning, sizing, and styling methods from AbstractWidgetBuilder:

### Position and Size
- `builder.x(x)` - Set X position
- `builder.y(y)` - Set Y position
- `builder.pos(x, y)` - Set both X and Y positions
- `builder.width(width)` - Set widget width
- `builder.height(height)` - Set widget height
- `builder.size(width, height)` - Set both width and height
- `builder.zIndex(index)` - Set rendering order

### Appearance and State
- `builder.message(text)` - Set label text
- `builder.message(textHelper)` - Set label with TextHelper
- `builder.alpha(value)` - Set transparency (0.0-1.0)
- `builder.active(active)` - Set interactivity
- `builder.visible(visible)` - Set visibility

### Building
- `builder.build()` - Build and add to screen

## Usage Examples

### Basic Slider Creation
```javascript
// Create a simple slider with 10 steps
const screen = Hud.createScreen("Slider Demo", true);
const slider = screen.sliderBuilder()
    .pos(50, 50)
    .size(200, 20)
    .steps(10)
    .message("Volume Control")
    .initially(5)
    .build();

screen.addDraw3D();
Hud.openScreen(screen);
```

### Slider with Change Event Handler
```javascript
// Create a slider that responds to value changes
const screen = Hud.createScreen("Interactive Slider", true);

const onSliderChange = JavaWrapper.methodToJava((slider, screen) => {
    const value = slider.getValue();
    const percentage = (value / slider.getSteps()) * 100;

    // Update slider message to show current value
    slider.setLabel(`Brightness: ${percentage.toFixed(1)}%`);

    // Apply the brightness setting (example)
    Chat.log(`Setting brightness to ${percentage.toFixed(1)}%`);
});

const brightnessSlider = screen.sliderBuilder()
    .pos(30, 40)
    .size(150, 20)
    .steps(20)
    .initially(10)
    .message("Brightness: 50.0%")
    .action(onSliderChange)
    .build();

screen.addDraw3D();
Hud.openScreen(screen);
```

### Multiple Sliders for Settings Panel
```javascript
// Create a settings panel with multiple sliders
function createSettingsPanel() {
    const screen = Hud.createScreen("Settings", true);

    // Volume slider
    const volumeHandler = JavaWrapper.methodToJava((slider, screen) => {
        const volume = (slider.getValue() / slider.getSteps()) * 100;
        Chat.log(`Volume set to ${volume.toFixed(0)}%`);
    });

    const volumeSlider = screen.sliderBuilder()
        .pos(20, 30)
        .size(120, 15)
        .steps(10)
        .initially(7)
        .message("Master Volume")
        .action(volumeHandler)
        .build();

    // FOV slider
    const fovHandler = JavaWrapper.methodToJava((slider, screen) => {
        const fov = 70 + (slider.getValue() * 2); // 70-90 range
        Chat.log(`FOV set to ${fov}°`);
    });

    const fovSlider = screen.sliderBuilder()
        .pos(20, 60)
        .size(120, 15)
        .steps(10)
        .initially(5) // 80 FOV default
        .message("Field of View")
        .action(fovHandler)
        .build();

    // Render distance slider
    const renderHandler = JavaWrapper.methodToJava((slider, screen) => {
        const chunks = 2 + slider.getValue() * 2; // 2-22 chunks
        Chat.log(`Render distance: ${chunks} chunks`);
    });

    const renderSlider = screen.sliderBuilder()
        .pos(20, 90)
        .size(120, 15)
        .steps(10)
        .initially(6) // 14 chunks default
        .message("Render Distance")
        .action(renderHandler)
        .build();

    screen.addDraw3D();
    return screen;
}

const settingsScreen = createSettingsPanel();
Hud.openScreen(settingsScreen);
```

### Color Picker Slider
```javascript
// Create RGB color pickers using sliders
function createColorPicker() {
    const screen = Hud.createScreen("Color Picker", true);

    // Store current color values
    let currentColor = { r: 128, g: 128, b: 128 };

    // Red slider
    const redHandler = JavaWrapper.methodToJava((slider, screen) => {
        currentColor.r = Math.floor((slider.getValue() / 255) * slider.getSteps());
        updateColorDisplay();
    });

    const redSlider = screen.sliderBuilder()
        .pos(20, 30)
        .size(100, 15)
        .steps(255)
        .initially(128)
        .message("Red")
        .action(redHandler)
        .build();

    // Green slider
    const greenHandler = JavaWrapper.methodToJava((slider, screen) => {
        currentColor.g = Math.floor((slider.getValue() / 255) * slider.getSteps());
        updateColorDisplay();
    });

    const greenSlider = screen.sliderBuilder()
        .pos(20, 60)
        .size(100, 15)
        .steps(255)
        .initially(128)
        .message("Green")
        .action(greenHandler)
        .build();

    // Blue slider
    const blueHandler = JavaWrapper.methodToJava((slider, screen) => {
        currentColor.b = Math.floor((slider.getValue() / 255) * slider.getSteps());
        updateColorDisplay();
    });

    const blueSlider = screen.sliderBuilder()
        .pos(20, 90)
        .size(100, 15)
        .steps(255)
        .initially(128)
        .message("Blue")
        .action(blueHandler)
        .build();

    function updateColorDisplay() {
        const hexColor = (currentColor.r << 16) + (currentColor.g << 8) + currentColor.b;
        Chat.log(`Color updated: RGB(${currentColor.r}, ${currentColor.g}, ${currentColor.b}) = #${hexColor.toString(16).padStart(6, '0').toUpperCase()}`);
    }

    screen.addDraw3D();
    return screen;
}

const colorScreen = createColorPicker();
Hud.openScreen(colorScreen);
```

## Important Notes

### Value Range and Steps
1. **Minimum Steps:** Sliders must have at least 2 steps (0 and 1)
2. **Value Clamping:** Initial values are automatically clamped to valid range (0 to steps-1)
3. **Integer Values:** Slider values are always integers, representing discrete positions

### Event Handling
1. **Callback Parameters:** Change handlers receive `(SliderWidgetHelper, IScreen)` parameters
2. **Error Handling:** Errors in callbacks are caught and logged without breaking the slider
3. **Thread Safety:** Callbacks are executed safely on the main thread

### Styling and Appearance
1. **Label Updates:** Slider labels can be changed dynamically using `setLabel()`
2. **Alpha Transparency:** Use `alpha()` for semi-transparent sliders
3. **Inactive State:** Inactive sliders are visually distinct and non-interactive

### Performance Considerations
1. **Frequent Updates:** Avoid expensive operations in change handlers for rapidly moving sliders
2. **Debouncing:** Consider debouncing frequent slider updates to prevent spam
3. **Memory Management:** Clean up intervals and references when screens close

### Integration
1. **Screen Context:** Sliders must be built within an IScreen context
2. **Z-Indexing:** Use `zIndex()` to control layering with other elements
3. **Positioning:** All positioning is relative to the screen bounds

## Common Patterns

### Value Conversion
```javascript
// Convert slider value (0-100) to useful ranges
const slider = screen.sliderBuilder()
    .steps(100)
    .action(JavaWrapper.methodToJava((slider, screen) => {
        const rawValue = slider.getValue();

        // Convert to percentage (0.0 - 1.0)
        const percentage = rawValue / 100;

        // Convert to custom range (e.g., 50-200)
        const customRange = 50 + (percentage * 150);

        // Convert to angle (0-360 degrees)
        const angle = rawValue * 3.6;

        Chat.log(`Value: ${rawValue}, Percentage: ${(percentage * 100).toFixed(1)}%, Range: ${customRange.toFixed(1)}, Angle: ${angle.toFixed(1)}°`);
    }))
    .build();
```

### Validation and Constraints
```javascript
// Ensure slider values stay within valid ranges
const validatedSlider = screen.sliderBuilder()
    .steps(20)
    .action(JavaWrapper.methodToJava((slider, screen) => {
        let value = slider.getValue();

        // Apply custom validation rules
        if (value < 5) {
            Chat.log("Warning: Value too low, minimum is 5");
            slider.setValue(5);
        } else if (value > 15) {
            Chat.log("Warning: Value too high, maximum is 15");
            slider.setValue(15);
        } else {
            Chat.log(`Valid value: ${value}`);
        }
    }))
    .build();
```

## Related Classes

- `SliderWidgetHelper` - The resulting slider widget class
- `AbstractWidgetBuilder` - Parent class providing common widget building methods
- `IScreen` - Screen interface for rendering context
- `MethodWrapper` - Wrapper for JavaScript callback functions
- `ClickableWidgetHelper` - Base class for interactive widgets
- `ButtonWidgetHelper.ButtonBuilder` - Similar builder pattern for buttons

## Version History

- **1.8.4:** Initial release with SliderBuilder class
- **Current:** Enhanced with comprehensive method chaining and event handling support