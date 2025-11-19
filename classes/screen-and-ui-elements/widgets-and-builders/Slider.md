# Slider

**Full Class Name:** `xyz.wagyourtail.wagyourgui.elements.Slider`

**Extends:** `ClickableWidget`

**Since:** JsMacros 1.8.4

The `Slider` class is a native Minecraft UI widget that provides a draggable slider control for selecting numeric values within a configurable range. It supports keyboard navigation, mouse interaction, and real-time value updates with event callbacks. This class is the underlying implementation used by `SliderWidgetHelper` for creating slider controls in custom JSMacros screens.

## Overview

The `Slider` class provides core slider functionality with:

- **Draggable Handle**: Users can click and drag the slider handle to adjust values
- **Keyboard Support**: Arrow keys for precise value adjustment
- **Visual Feedback**: Highlighted textures for hover and focus states
- **Step-based Values**: Discrete value positions with configurable step counts
- **Event Callbacks**: Real-time value change notifications
- **Bounds Checking**: Automatic value clamping to valid ranges
- **Customizable Appearance**: Text labels and texture rendering

## Constructors

### `new Slider(x, y, width, height, text, value, action, steps)`
Creates a new Slider with full configuration options.

**Parameters:**
| Parameter | Type       | Description                                      |
| --------- | ---------- | ------------------------------------------------ |
| x         | int        | X coordinate of the slider                      |
| y         | int        | Y coordinate of the slider                      |
| width     | int        | Width of the slider in pixels                   |
| height    | int        | Height of the slider in pixels (typically 20)    |
| text      | Text       | Display text for the slider label               |
| value     | double     | Initial value (0.0 to 1.0, will be rounded)     |
| action    | Consumer   | Callback function when value changes            |
| steps     | int        | Number of discrete steps (minimum 2)            |

**Example:**
```javascript
// Create a slider with 5 steps at position (50, 30)
const slider = new Slider(
    50, 30, 200, 20,
    Text.literal("Volume"),
    0.4,  // 40% position
    (slider) => {
        Chat.log(`Value changed to: ${slider.getValue()}`);
    },
    5     // 5 discrete steps
);
```

### `new Slider(x, y, width, height, text, value, action)`
Creates a new Slider with default 2 steps (minimum and maximum).

**Parameters:**
| Parameter | Type       | Description                                      |
| --------- | ---------- | ------------------------------------------------ |
| x         | int        | X coordinate of the slider                      |
| y         | int        | Y coordinate of the slider                      |
| width     | int        | Width of the slider in pixels                   |
| height    | int        | Height of the slider in pixels (typically 20)    |
| text      | Text       | Display text for the slider label               |
| value     | double     | Initial value (0.0 to 1.0, will be rounded)     |
| action    | Consumer   | Callback function when value changes            |

**Example:**
```javascript
// Create a simple on/off slider (2 steps)
const toggleSlider = new Slider(
    100, 60, 150, 20,
    Text.literal("Enable Feature"),
    0.0,  // Start at "off" position
    (slider) => {
        const isEnabled = slider.getValue() > 0.5;
        Chat.log(`Feature ${isEnabled ? 'enabled' : 'disabled'}`);
    }
);
```

## Fields

| Field    | Type    | Description                                |
| -------- | ------- | ------------------------------------------ |
| steps    | int     | Number of discrete steps minus 1           |
| value    | double  | Current slider value (0.0 to 1.0)          |
| action   | Consumer | Callback function for value changes        |

## Methods

### `getValue()`
Returns the current value of the slider.

**Returns:**
* `double`: Current slider value (0.0 to 1.0)

**Example:**
```javascript
const currentValue = slider.getValue();
Chat.log(`Current slider value: ${currentValue}`);
```

### `setValue(value)`
Sets the slider value and triggers the action callback if the value changes.

**Parameters:**
1. `value: double`: New value (will be clamped and rounded to nearest step)

**Returns:**
* `void`

**Example:**
```javascript
// Set slider to 75% position
slider.setValue(0.75);

// Set slider based on external value
const percentage = 60;
slider.setValue(percentage / 100.0);
```

### `roundValue(value)`
Rounds a value to the nearest valid step position.

**Parameters:**
1. `value: double`: Value to round

**Returns:**
* `double`: Rounded value aligned to step positions

**Example:**
```javascript
// Round a value to nearest step
const roundedValue = slider.roundValue(0.37);
Chat.log(`Rounded to nearest step: ${roundedValue}`);

// Convert external value to slider coordinate
const externalValue = 7;  // 7 out of 10
const sliderValue = slider.roundValue(externalValue / 10.0);
```

### `getSteps()`
Returns the total number of steps for the slider.

**Returns:**
* `int`: Number of steps (minimum 2)

**Example:**
```javascript
const totalSteps = slider.getSteps();
Chat.log(`Slider has ${totalSteps} steps`);
```

### `setSteps(steps)`
Sets the number of steps for the slider.

**Parameters:**
1. `steps: int`: Number of steps (minimum 2)

**Returns:**
* `void`

**Example:**
```javascript
// Change slider precision
slider.setSteps(11);  // 0-10 range with 11 steps
slider.setSteps(101); // 0-100 range with 101 steps
```

### `setMessage(message)`
Sets the slider's display text using a string.

**Parameters:**
1. `message: string`: New display text

**Returns:**
* `void`

**Example:**
```javascript
slider.setMessage("Volume Control");
slider.setMessage(`Brightness: ${Math.round(slider.getValue() * 100)}%`);
```

### `setMessage(text)`
Sets the slider's display text using a Text object.

**Parameters:**
1. `text: Text`: New display text

**Returns:**
* `void`

**Example:**
```javascript
slider.setMessage(Text.literal("Settings").formatted(Formatting.BOLD));
slider.setMessage(Text.literal("Active").formatted(Formatting.GREEN));
```

## Usage Examples

### Basic Volume Slider
```javascript
// Create a volume slider with percentage display
const volumeSlider = new Slider(
    50, 40, 200, 20,
    Text.literal("Volume"),
    0.5,  // Start at 50%
    (slider) => {
        const volume = Math.round(slider.getValue() * 100);
        slider.setMessage(`Volume: ${volume}%`);
        Chat.log(`Volume set to ${volume}%`);
    },
    11  // 0-10 = 11 steps (10% increments)
);

// Add to screen
screen.addButton(volumeSlider);
```

### Temperature Control Slider
```javascript
// Create a temperature slider (-20°C to 50°C range)
const minTemp = -20;
const maxTemp = 50;
const range = maxTemp - minTemp;
const initialTemp = 20;  // Room temperature

const tempSlider = new Slider(
    100, 80, 250, 20,
    Text.literal("Temperature"),
    (initialTemp - minTemp) / range,  // Map to 0-1 range
    (slider) => {
        const sliderValue = Math.round(slider.getValue());
        const temperature = sliderValue + minTemp;
        slider.setMessage(`Temperature: ${temperature}°C`);
        Chat.log(`Temperature: ${temperature}°C`);
    },
    range + 1  // Include both min and max values
);
```

### RGB Color Picker
```javascript
// Create RGB sliders for color selection
let red = 128, green = 128, blue = 128;

// Red slider
const redSlider = new Slider(
    50, 50, 150, 20,
    Text.literal("Red"),
    red / 255.0,
    (slider) => {
        red = Math.round(slider.getValue() * 255);
        updateColorDisplay();
    },
    256
);

// Green slider
const greenSlider = new Slider(
    50, 80, 150, 20,
    Text.literal("Green"),
    green / 255.0,
    (slider) => {
        green = Math.round(slider.getValue() * 255);
        updateColorDisplay();
    },
    256
);

// Blue slider
const blueSlider = new Slider(
    50, 110, 150, 20,
    Text.literal("Blue"),
    blue / 255.0,
    (slider) => {
        blue = Math.round(slider.getValue() * 255);
        updateColorDisplay();
    },
    256
);

function updateColorDisplay() {
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    Chat.log(`Color: RGB(${red}, ${green}, ${blue}) = ${hexColor}`);
}

// Add all sliders to screen
screen.addButton(redSlider);
screen.addButton(greenSlider);
screen.addButton(blueSlider);
```

### Dynamic Range Slider
```javascript
// Create a slider with adjustable ranges
let currentRange = "medium";
const ranges = {
    small: { min: 0, max: 10, steps: 11 },
    medium: { min: 0, max: 50, steps: 51 },
    large: { min: 0, max: 100, steps: 101 }
};

function createRangeSlider(rangeType) {
    const range = ranges[rangeType];
    return new Slider(
        100, 150, 200, 20,
        Text.literal(`Value (${range.min}-${range.max})`),
        0.5,  // Start at middle
        (slider) => {
            const sliderValue = Math.round(slider.getValue());
            const actualValue = sliderValue + range.min;
            slider.setMessage(`Value: ${actualValue} (${rangeType} range)`);
            Chat.log(`Slider value: ${actualValue}`);
        },
        range.steps
    );
}

let currentSlider = createRangeSlider(currentRange);
screen.addButton(currentSlider);

// Add range selector buttons
const smallBtn = createButton("0-10", () => {
    currentRange = "small";
    screen.removeButton(currentSlider);
    currentSlider = createRangeSlider(currentRange);
    screen.addButton(currentSlider);
});

const mediumBtn = createButton("0-50", () => {
    currentRange = "medium";
    screen.removeButton(currentSlider);
    currentSlider = createRangeSlider(currentRange);
    screen.addButton(currentSlider);
});

const largeBtn = createButton("0-100", () => {
    currentRange = "large";
    screen.removeButton(currentSlider);
    currentSlider = createRangeSlider(currentRange);
    screen.addButton(currentSlider);
});
```

### Multi-Value Configuration Panel
```javascript
// Create multiple sliders for configuration
const config = {
    sensitivity: 50,
    volume: 75,
    brightness: 60,
    fov: 90
};

// Mouse sensitivity slider (0-100)
const sensitivitySlider = new Slider(
    120, 40, 180, 20,
    Text.literal("Mouse Sensitivity"),
    config.sensitivity / 100.0,
    (slider) => {
        config.sensitivity = Math.round(slider.getValue() * 100);
        slider.setMessage(`Sensitivity: ${config.sensitivity}%`);
    },
    101
);

// Volume slider (0-100)
const volumeSlider = new Slider(
    120, 70, 180, 20,
    Text.literal("Volume"),
    config.volume / 100.0,
    (slider) => {
        config.volume = Math.round(slider.getValue() * 100);
        slider.setMessage(`Volume: ${config.volume}%`);
    },
    101
);

// Brightness slider (0-100)
const brightnessSlider = new Slider(
    120, 100, 180, 20,
    Text.literal("Brightness"),
    config.brightness / 100.0,
    (slider) => {
        config.brightness = Math.round(slider.getValue() * 100);
        slider.setMessage(`Brightness: ${config.brightness}%`);
    },
    101
);

// FOV slider (60-120)
const fovSlider = new Slider(
    120, 130, 180, 20,
    Text.literal("Field of View"),
    (config.fov - 60) / 60.0,
    (slider) => {
        const sliderValue = Math.round(slider.getValue());
        config.fov = sliderValue + 60;
        slider.setMessage(`FOV: ${config.fov}°`);
    },
    61  // 60-120 = 61 values
);

// Add all sliders to screen
screen.addButton(sensitivitySlider);
screen.addButton(volumeSlider);
screen.addButton(brightnessSlider);
screen.addButton(fovSlider);
```

### Programmatic Slider Control
```javascript
// Control sliders programmatically
const controlSlider = new Slider(
    50, 200, 200, 20,
    Text.literal("Control"),
    0.0,
    (slider) => {
        Chat.log(`Control slider value: ${slider.getValue()}`);
    },
    21  // 0-20 range
);

// Set slider to specific values
function setSliderValue(value) {
    controlSlider.setValue(value / 20.0);  // Map to 0-1 range
}

// Animate slider value
function animateSlider() {
    let currentValue = 0;
    const interval = setInterval(() => {
        setSliderValue(currentValue);
        currentValue++;

        if (currentValue > 20) {
            currentValue = 0;
        }
    }, 500);
}

// Reset slider to middle
function resetSlider() {
    controlSlider.setValue(0.5);  // Middle position
}

// Add control buttons
const resetBtn = new ButtonBuilder(screen)
    .pos(50, 230)
    .width(80)
    .message("Reset")
    .action(() => resetSlider())
    .build();

const animateBtn = new ButtonBuilder(screen)
    .pos(140, 230)
    .width(80)
    .message("Animate")
    .action(() => animateSlider())
    .build();
```

## Event Handling

The Slider class fires events in the following scenarios:

1. **Mouse Click**: When user clicks on the slider track
2. **Mouse Drag**: While user drags the slider handle
3. **Keyboard Input**: When user presses left/right arrow keys
4. **Programmatic Change**: When `setValue()` is called with a different value

### Event Callback Structure
```javascript
const slider = new Slider(x, y, width, height, text, value, (slider) => {
    // Event handler code
    // 'slider' parameter refers to the slider instance
    const newValue = slider.getValue();

    // Handle the value change
    handleValueChange(newValue);
}, steps);
```

### Advanced Event Handling
```javascript
// Slider with debounced events (fires less frequently)
let debounceTimer;
const debouncedSlider = new Slider(
    50, 50, 200, 20,
    Text.literal("Debounced Slider"),
    0.5,
    (slider) => {
        // Clear previous timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set new timer
        debounceTimer = setTimeout(() => {
            const value = slider.getValue();
            Chat.log(`Debounced value: ${value}`);
        }, 300);  // 300ms delay
    },
    101
);

// Slider with value validation
const validatedSlider = new Slider(
    50, 100, 200, 20,
    Text.literal("Validated Slider"),
    0.0,
    (slider) => {
        const value = slider.getValue();

        // Validate value
        if (value < 0.2) {
            Chat.log("Value too low, resetting to minimum");
            slider.setValue(0.2);
        } else if (value > 0.8) {
            Chat.log("Value too high, resetting to maximum");
            slider.setValue(0.8);
        } else {
            Chat.log(`Valid value: ${value}`);
        }
    },
    101
);
```

## Important Notes

1. **Value Range**: Slider values are always stored as doubles between 0.0 and 1.0, internally
2. **Step Calculation**: The actual step count is `steps - 1` due to internal implementation
3. **Value Rounding**: Values are automatically rounded to the nearest valid step position
4. **Action Triggers**: The action callback only fires when the value actually changes
5. **Thread Safety**: Slider actions are executed on the main Minecraft thread
6. **Texture Rendering**: Sliders use built-in Minecraft textures for visual appearance
7. **Keyboard Navigation**: Left arrow decreases value, right arrow increases value
8. **Minimum Steps**: Sliders must have at least 2 steps (0 and 1 positions)
9. **Height Constraint**: Slider height is typically 20 pixels for proper texture display
10. **Value Clamping**: Values outside the 0.0-1.0 range are automatically clamped

## Value Mapping Patterns

### Percentage Mapping
```javascript
// Convert slider value to percentage (0-100%)
const percentage = Math.round(slider.getValue() * 100);

// Convert percentage to slider value
const sliderValue = percentage / 100.0;
```

### Range Mapping
```javascript
// Map slider to custom range (e.g., -50 to 150)
const min = -50;
const max = 150;
const range = max - min;

// Slider value to range value
const rangeValue = Math.round(slider.getValue() * range) + min;

// Range value to slider value
const sliderValue = (rangeValue - min) / range;
```

### Integer Mapping
```javascript
// Map slider to integer values with specific count
const valueCount = 10;  // 0-9
const intValue = Math.round(slider.getValue() * (valueCount - 1));

// Integer value to slider value
const sliderValue = intValue / (valueCount - 1);
```

## Performance Considerations

1. **Event Frequency**: Slider events fire frequently during dragging - keep handlers lightweight
2. **Step Count**: Higher step counts provide more precision but may impact performance
3. **Texture Updates**: Avoid frequent texture or appearance changes during events
4. **Memory Management**: Remove sliders from screens when no longer needed
5. **Callback Optimization**: Consider debouncing expensive operations in slider callbacks

## Version History

- **1.8.4**: Initial release with basic slider functionality and event handling
- **Current**: Full feature set with comprehensive value management and keyboard support

## Related Classes

- `ClickableWidget` - Parent class providing base widget functionality
- `SliderWidgetHelper` - JSMacros helper wrapper for script integration
- `SliderBuilder` - Builder class for fluent slider creation
- `Text` - Minecraft text class for slider labels
- `Consumer<Slider>` - Functional interface for value change callbacks
- `DrawContext` - Rendering context for slider visualization