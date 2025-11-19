# SliderWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.SliderWidgetHelper`

**Extends:** `ClickableWidgetHelper<SliderWidgetHelper, Slider>`

**Since:** JsMacros 1.8.4

The `SliderWidgetHelper` class is a comprehensive helper for creating and managing slider widgets in JSMacros custom screens and UIs. It provides intuitive slider controls with configurable value ranges, step increments, and change event handling. This class serves as a wrapper around Minecraft's native slider widgets, exposing them to JSMacros scripts with additional functionality for tooltips, actions, and screen integration.

## Overview

The `SliderWidgetHelper` class provides:

- **Slider Creation**: Easy creation of slider widgets with custom ranges and steps
- **Value Management**: Get and set slider values with automatic bounds checking
- **Step Control**: Configurable step increments for discrete value selection
- **Event Handling**: Real-time change events with proper screen context and error handling
- **Tooltips**: Multi-line tooltip support with various text formats
- **State Management**: Control over active, visible, and focus states
- **Builder Pattern**: Fluent API for easy slider construction
- **Z-Index Support**: Layering control for complex UI layouts

## Constructors

### `new SliderWidgetHelper(slider)`
Creates a new SliderWidgetHelper from an existing Slider instance.

**Parameters:**
| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| slider    | Slider | The underlying Slider to wrap  |

**Since:** `1.8.4`

### `new SliderWidgetHelper(slider, zIndex)`
Creates a new SliderWidgetHelper with a specified z-index.

**Parameters:**
| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| slider    | Slider | The underlying Slider to wrap  |
| zIndex    | int    | The z-index for rendering order |

**Since:** `1.8.4`

## Fields

## Methods

## SliderBuilder Class

The `SliderBuilder` class provides a fluent builder API for creating slider widgets with custom ranges and steps.

### Constructors

### `new SliderBuilder(screen)`
Creates a new SliderBuilder for the specified screen.

**Parameters:**
| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| screen    | IScreen   | The screen to add the slider to |

**Since:** `1.8.4`

### Methods

## Usage Examples

### Basic Slider Creation
```javascript
// Create a simple slider with 5 steps
const screen = Hud.createScreen("Slider Demo", true);
const slider = new SliderBuilder(screen)
    .pos(50, 30)
    .width(150)
    .message(Chat.createTextHelperFromString("Volume"))
    .steps(5)
    .initially(2)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        Chat.log(`Slider value: ${slider.getValue()}`);
    }))
    .build();

Hud.openScreen(screen);
```

### Volume Control Slider
```javascript
// Create a volume slider with percentage display
const screen = Hud.createScreen("Audio Settings", true);
let currentVolume = 50;

const volumeSlider = new SliderBuilder(screen)
    .pos(100, 50)
    .width(200)
    .message(Chat.createTextHelperFromString("Volume"))
    .steps(101)  // 0-100 inclusive
    .initially(50)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        currentVolume = Math.round(slider.getValue());
        slider.setLabel(`Volume: ${currentVolume}%`);
        Chat.log(`Volume set to ${currentVolume}%`);
    }))
    .setTooltip(
        "Adjust the master volume",
        "Range: 0% - 100%",
        "Current: " + currentVolume + "%"
    )
    .build();

// Add status display
const statusText = Hud.createTextElement()
    .pos(100, 80)
    .text(Chat.createTextHelperFromString(`Volume: ${currentVolume}%`))
    .build();

screen.addButton(volumeSlider);
screen.addText(statusText);
Hud.openScreen(screen);
```

### Color Picker Slider
```javascript
// Create RGB color sliders
const screen = Hud.createScreen("Color Picker", true);
let red = 128, green = 128, blue = 128;

// Red slider
const redSlider = new SliderBuilder(screen)
    .pos(50, 40)
    .width(120)
    .message(Chat.createTextHelperFromString("&cRed"))
    .steps(256)
    .initially(red)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        red = Math.round(slider.getValue());
        updateColorDisplay();
    }))
    .build();

// Green slider
const greenSlider = new SliderBuilder(screen)
    .pos(50, 70)
    .width(120)
    .message(Chat.createTextHelperFromString("&aGreen"))
    .steps(256)
    .initially(green)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        green = Math.round(slider.getValue());
        updateColorDisplay();
    }))
    .build();

// Blue slider
const blueSlider = new SliderBuilder(screen)
    .pos(50, 100)
    .width(120)
    .message(Chat.createTextHelperFromString("&9Blue"))
    .steps(256)
    .initially(blue)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        blue = Math.round(slider.getValue());
        updateColorDisplay();
    }))
    .build();

// Color preview text
function updateColorDisplay() {
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    colorPreview.text(Chat.createTextHelperFromString(`&7Color: &r${hexColor}&r`));
    Chat.log(`Color updated to RGB(${red}, ${green}, ${blue}) = ${hexColor}`);
}

const colorPreview = Hud.createTextElement()
    .pos(50, 130)
    .text(Chat.createTextHelperFromString("Color: #808080"))
    .build();

screen.addButton(redSlider);
screen.addButton(greenSlider);
screen.addButton(blueSlider);
screen.addText(colorPreview);
Hud.openScreen(screen);
```

### Multi-Value Configuration Panel
```javascript
// Create a configuration panel with multiple sliders
const screen = Hud.createScreen("Game Settings", true);

const settings = {
    renderDistance: 8,
    particles: 50,
    brightness: 50,
    mouseSensitivity: 50
};

// Render distance slider (2-16 chunks)
const renderSlider = new SliderBuilder(screen)
    .pos(80, 40)
    .width(180)
    .message(Chat.createTextHelperFromString("Render Distance"))
    .steps(15)  // 2-16 = 15 steps
    .initially(settings.renderDistance - 2)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        settings.renderDistance = Math.round(slider.getValue()) + 2;
        slider.setLabel(`Render Distance: ${settings.renderDistance} chunks`);
    }))
    .build();

// Particles slider (0-100%)
const particlesSlider = new SliderBuilder(screen)
    .pos(80, 70)
    .width(180)
    .message(Chat.createTextHelperFromString("Particles"))
    .steps(101)
    .initially(settings.particles)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        settings.particles = Math.round(slider.getValue());
        slider.setLabel(`Particles: ${settings.particles}%`);
    }))
    .build();

// Brightness slider (0-100%)
const brightnessSlider = new SliderBuilder(screen)
    .pos(80, 100)
    .width(180)
    .message(Chat.createTextHelperFromString("Brightness"))
    .steps(101)
    .initially(settings.brightness)
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        settings.brightness = Math.round(slider.getValue());
        slider.setLabel(`Brightness: ${settings.brightness}%`);
    }))
    .build();

// Apply button
const applyButton = new ButtonBuilder(screen)
    .pos(150, 140)
    .width(80)
    .message(Chat.createTextHelperFromString("Apply"))
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        Chat.log("Settings applied:");
        Chat.log(`  Render Distance: ${settings.renderDistance} chunks`);
        Chat.log(`  Particles: ${settings.particles}%`);
        Chat.log(`  Brightness: ${settings.brightness}%`);
        Chat.log(`  Mouse Sensitivity: ${settings.mouseSensitivity}%`);
    }))
    .build();

screen.addButton(renderSlider);
screen.addButton(particlesSlider);
screen.addButton(brightnessSlider);
screen.addButton(applyButton);
Hud.openScreen(screen);
```

### Slider with Dynamic Range
```javascript
// Create a slider that changes range based on selection
const screen = Hud.createScreen("Dynamic Range Demo", true);
let rangeType = "small"; // "small", "medium", "large"
const ranges = {
    small: { min: 0, max: 10, initial: 5 },
    medium: { min: 0, max: 50, initial: 25 },
    large: { min: 0, max: 100, initial: 50 }
};

function createSlider(rangeType) {
    const range = ranges[rangeType];
    return new SliderBuilder(screen)
        .pos(100, 60)
        .width(200)
        .message(Chat.createTextHelperFromString(`Value (${range.min}-${range.max})`))
        .steps(range.max - range.min + 1)
        .initially(range.initial)
        .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
            const value = Math.round(slider.getValue()) + range.min;
            Chat.log(`Slider value: ${value} (${rangeType} range)`);
        }));
}

let currentSlider = createSlider(rangeType).build();

// Range selector buttons
const smallBtn = new ButtonBuilder(screen)
    .pos(50, 100)
    .width(80)
    .message(Chat.createTextHelperFromString("0-10"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        rangeType = "small";
        screen.removeButton(currentSlider);
        currentSlider = createSlider(rangeType).build();
    }))
    .build();

const mediumBtn = new ButtonBuilder(screen)
    .pos(140, 100)
    .width(80)
    .message(Chat.createTextHelperFromString("0-50"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        rangeType = "medium";
        screen.removeButton(currentSlider);
        currentSlider = createSlider(rangeType).build();
    }))
    .build();

const largeBtn = new ButtonBuilder(screen)
    .pos(230, 100)
    .width(80)
    .message(Chat.createTextHelperFromString("0-100"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        rangeType = "large";
        screen.removeButton(currentSlider);
        currentSlider = createSlider(rangeType).build();
    }))
    .build();

screen.addButton(currentSlider);
screen.addButton(smallBtn);
screen.addButton(mediumBtn);
screen.addButton(largeBtn);
Hud.openScreen(screen);
```

### Slider Grid Layout
```javascript
// Create a grid of sliders for matrix-like input
const screen = Hud.createScreen("Matrix Input", true);
const rows = 3;
const cols = 4;
const values = Array(rows).fill().map(() => Array(cols).fill(50));

function createMatrixGrid() {
    const sliders = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = 50 + col * 90;
            const y = 40 + row * 40;

            const slider = new SliderBuilder(screen)
                .pos(x, y)
                .width(80)
                .message(Chat.createTextHelperFromString(`[${row},${col}]`))
                .steps(101)  // 0-100
                .initially(50)
                .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
                    values[row][col] = Math.round(slider.getValue());
                    updateMatrixDisplay();
                }))
                .build();

            sliders.push(slider);
            screen.addButton(slider);
        }
    }

    return sliders;
}

function updateMatrixDisplay() {
    let matrixText = "Matrix Values:\n";
    for (let row = 0; row < rows; row++) {
        matrixText += "[ ";
        for (let col = 0; col < cols; col++) {
            matrixText += values[row][col].toString().padStart(3, " ") + " ";
        }
        matrixText += "]\n";
    }
    Chat.log(matrixText.trim());
}

// Add calculate button
const calculateBtn = new ButtonBuilder(screen)
    .pos(50, 160)
    .width(120)
    .message(Chat.createTextHelperFromString("Calculate"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        updateMatrixDisplay();

        // Calculate sum
        let sum = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                sum += values[row][col];
            }
        }
        Chat.log(`Matrix sum: ${sum}`);
        Chat.log(`Matrix average: ${(sum / (rows * cols)).toFixed(2)}`);
    }))
    .build();

// Reset button
const resetBtn = new ButtonBuilder(screen)
    .pos(180, 160)
    .width(80)
    .message(Chat.createTextHelperFromString("Reset"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        // Reset all values to 50
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                values[row][col] = 50;
            }
        }
        // Recreate the grid
        const sliders = screen.getButtons();
        for (const slider of sliders) {
            if (slider.getValue && slider.setValue) {
                slider.setValue(50);
            }
        }
        Chat.log("Matrix reset to default values");
    }))
    .build();

createMatrixGrid();
screen.addButton(calculateBtn);
screen.addButton(resetBtn);
Hud.openScreen(screen);
```

### Precision Slider with Decimal Values
```javascript
// Create a slider for precise decimal input
const screen = Hud.createScreen("Precision Input", true);
let precision = 2; // decimal places
let value = 3.14159;

function createPrecisionSlider(decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    const maxValue = 10;
    const steps = Math.round(maxValue * multiplier) + 1;
    const initialValue = Math.round(value * multiplier);

    return new SliderBuilder(screen)
        .pos(50, 50)
        .width(250)
        .message(Chat.createTextHelperFromString(`Precision: ${decimalPlaces} decimal places`))
        .steps(steps)
        .initially(initialValue)
        .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
            value = slider.getValue() / multiplier;
            slider.setLabel(`Value: ${value.toFixed(decimalPlaces)}`);
            Chat.log(`Slider value: ${value.toFixed(decimalPlaces)}`);
        }))
        .setTooltip(
            "Adjust the precision using buttons below",
            `Range: 0 to ${maxValue}`,
            `Current precision: ${decimalPlaces} decimal places`
        );
}

let currentSlider = createPrecisionSlider(precision).build();

// Precision selector buttons
const precision0Btn = new ButtonBuilder(screen)
    .pos(50, 100)
    .width(60)
    .message(Chat.createTextHelperFromString("0 dp"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        updatePrecision(0);
    }))
    .build();

const precision1Btn = new ButtonBuilder(screen)
    .pos(120, 100)
    .width(60)
    .message(Chat.createTextHelperFromString("1 dp"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        updatePrecision(1);
    }))
    .build();

const precision2Btn = new ButtonBuilder(screen)
    .pos(190, 100)
    .width(60)
    .message(Chat.createTextHelperFromString("2 dp"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        updatePrecision(2);
    }))
    .build();

const precision3Btn = new ButtonBuilder(screen)
    .pos(260, 100)
    .width(60)
    .message(Chat.createTextHelperFromString("3 dp"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        updatePrecision(3);
    }))
    .build();

function updatePrecision(newPrecision) {
    precision = newPrecision;
    screen.removeButton(currentSlider);
    currentSlider = createPrecisionSlider(precision).build();
    Chat.log(`Precision changed to ${precision} decimal places`);
}

screen.addButton(currentSlider);
screen.addButton(precision0Btn);
screen.addButton(precision1Btn);
screen.addButton(precision2Btn);
screen.addButton(precision3Btn);
Hud.openScreen(screen);
```

## Builder Pattern Usage

The SliderWidgetHelper class provides a fluent builder API that makes slider creation more readable and maintainable:

```javascript
// Standard approach
const slider = new SliderBuilder(screen)
    .x(50)                    // Set X position
    .y(30)                    // Set Y position
    .width(200)               // Set width
    .height(20)               // Set height (always 20)
    .zIndex(5)                // Set rendering order
    .message("Value Slider")  // Set slider text
    .steps(10)                // Set number of steps
    .initially(5)             // Set initial value
    .active(true)             // Enable slider
    .visible(true)            // Make slider visible
    .alpha(1.0)               // Full opacity
    .setTooltip("Help text")  // Add tooltip
    .action(actionHandler)    // Set change handler
    .build();                 // Build and add to screen
```

## Value Range and Steps

Understanding how slider values work:

1. **Step Count**: The `steps()` parameter determines the number of discrete positions
2. **Value Range**: Slider values range from 0 to (steps - 1)
3. **Real-world Values**: Map the slider value to your actual range

```javascript
// Example: Temperature slider (-20°C to 50°C)
const tempSlider = new SliderBuilder(screen)
    .steps(71)  // 50 - (-20) + 1 = 71 steps
    .initially(20)  // 0°C is step 20
    .action(JavaWrapper.methodToJavaAsync((slider, screen) => {
        const sliderValue = Math.round(slider.getValue());
        const temperature = sliderValue - 20;  // Map to -20 to 50 range
        Chat.log(`Temperature: ${temperature}°C`);
    }))
    .build();
```

## Performance Considerations

1. **Z-Index Usage**: Use z-index values sparingly to avoid unnecessary sorting overhead
2. **Action Frequency**: Slider actions fire on every value change - keep handlers lightweight
3. **Step Count**: Higher step counts provide more precision but may impact performance
4. **Tooltip Updates**: Minimize frequent tooltip updates during slider interaction

## Important Notes

1. **Slider Height**: All sliders have a fixed height of 20 pixels. The height parameter in builders is ignored.
2. **Value Precision**: Slider values are internally stored as doubles, but step positions are discrete
3. **Step Minimum**: Sliders must have at least 2 steps (minimum and maximum values)
4. **Action Context**: Slider actions receive both the slider helper and the screen as parameters
5. **Value Clamping**: Values are automatically clamped to valid ranges when set
6. **Thread Safety**: Slider actions are executed on the main thread by default
7. **Memory Management**: Remove sliders from screens when they're no longer needed

## Version History

- **1.8.4**: Initial release with basic slider support and builder pattern
- **Current**: Full feature set with comprehensive value management and event handling

## Related Classes

- `ClickableWidgetHelper` - Parent class providing base widget functionality
- `AbstractWidgetBuilder` - Base builder class providing common widget properties
- `IScreen` - Interface for custom screens
- `TextHelper` - Helper class for text formatting and styling
- `MethodWrapper` - Wrapper for JavaScript methods in Java context
- `Slider` - Minecraft's native slider widget class

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

## Constructors

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

### Progress Bar Simulation
```javascript
// Create a progress bar that updates over time
function createProgressBar() {
    const screen = Hud.createScreen("Progress Demo", true);

    let progress = 0;
    const maxProgress = 100;

    const progressBar = screen.sliderBuilder()
        .pos(30, 50)
        .size(140, 20)
        .steps(maxProgress)
        .initially(0)
        .message("Loading...")
        .active(false) // Make it non-interactive
        .build();

    // Simulate progress
    const progressInterval = setInterval(() => {
        if (progress >= maxProgress) {
            clearInterval(progressInterval);
            progressBar.setLabel("Complete!");
            Chat.log("Progress complete!");
            return;
        }

        progress += 2;
        progressBar.setValue(progress);
        progressBar.setLabel(`Loading... ${progress}%`);
    }, 100);

    screen.addDraw3D();
    Hud.openScreen(screen);

    // Cleanup when screen closes
    screen.onClose(JavaWrapper.methodToJava(() => {
        clearInterval(progressInterval);
    }));
}

createProgressBar();
```

### Synchronized Multiple Sliders
```javascript
// Create multiple sliders that stay synchronized
function createSynchronizedSliders() {
    const screen = Hud.createScreen("Synchronized Controls", true);

    const syncHandler = JavaWrapper.methodToJava((changedSlider, screen) => {
        const newValue = changedSlider.getValue();

        // Update all other sliders to match
        if (changedSlider !== slider1) slider1.setValue(newValue);
        if (changedSlider !== slider2) slider2.setValue(newValue);
        if (changedSlider !== slider3) slider3.setValue(newValue);

        Chat.log(`All sliders synchronized to value: ${newValue}`);
    });

    const slider1 = screen.sliderBuilder()
        .pos(20, 30)
        .size(100, 15)
        .steps(20)
        .initially(10)
        .message("Control 1")
        .action(syncHandler)
        .build();

    const slider2 = screen.sliderBuilder()
        .pos(20, 60)
        .size(100, 15)
        .steps(20)
        .initially(10)
        .message("Control 2")
        .action(syncHandler)
        .build();

    const slider3 = screen.sliderBuilder()
        .pos(20, 90)
        .size(100, 15)
        .steps(20)
        .initially(10)
        .message("Control 3")
        .action(syncHandler)
        .build();

    screen.addDraw3D();
    Hud.openScreen(screen);
}

createSynchronizedSliders();
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
- `AbstractWidgetBuilder` - Parent class with common widget building methods
- `IScreen` - Screen interface for rendering context
- `MethodWrapper` - Wrapper for JavaScript callback functions
- `ClickableWidgetHelper` - Base class for interactive widgets
- `ButtonWidgetHelper.ButtonBuilder` - Similar builder pattern for buttons

## Version History

- **1.8.4:** Initial release with SliderBuilder class
- **Current:** Enhanced with comprehensive method chaining and event handling support