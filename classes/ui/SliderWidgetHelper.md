# SliderWidgetHelper

A specialized helper for creating and managing slider widgets. SliderWidgetHelper extends ClickableWidgetHelper with slider-specific functionality including value control, step configuration, and value change callbacks.

## Fields
- [SliderWidgetHelper.zIndex](#sliderwidgethelperzindex)

## Methods
- [SliderWidgetHelper.getValue](#sliderwidgethelpergetvalue)
- [SliderWidgetHelper.setValue](#sliderwidgethelpersetvalue)
- [SliderWidgetHelper.getSteps](#sliderwidgethelpergetsteps)
- [SliderWidgetHelper.setSteps](#sliderwidgethelpersetsteps)

## Fields

### SliderWidgetHelper.zIndex
The z-index (render order) of this slider. Higher values render on top of lower values.

**Type**
* `int`

## Methods

### SliderWidgetHelper.getValue
```js
const screen = Hud.createScreen("Slider Demo", false);
const slider = screen.addSlider(10, 30, 200, 20, "Volume", 5, () => {});

const currentValue = slider.getValue();
Chat.log(`Current slider value: ${currentValue}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The current value of the slider (0.0 to 1.0).

### SliderWidgetHelper.setValue
```js
const screen = Hud.createScreen("Slider Demo", false);
const slider = screen.addSlider(10, 30, 200, 20, "Volume", 5, () => {});

// Set slider to 50% (middle position)
slider.setValue(0.5);

// Set slider to 75% position
slider.setValue(0.75);

// Set slider to minimum
slider.setValue(0.0);

// Set slider to maximum
slider.setValue(1.0);
```

**Params**
1. `value: double`: The new value for the slider (0.0 to 1.0).

**Returns**
* `SliderWidgetHelper`: Self for chaining.

### SliderWidgetHelper.getSteps
```js
const screen = Hud.createScreen("Slider Demo", false);
const slider = screen.addSlider(10, 30, 200, 20, "Volume", 5, () => {});

const steps = slider.getSteps();
Chat.log(`Slider has ${steps} steps`);
```

**Params**
* `(none)`

**Returns**
* `int`: The number of steps the slider has.

### SliderWidgetHelper.setSteps
```js
const screen = Hud.createScreen("Slider Demo", false);
const slider = screen.addSlider(10, 30, 200, 20, "Volume", 5, () => {});

// Change to 10 discrete steps
slider.setSteps(10);

// Change to continuous (minimum steps)
slider.setSteps(2);
```

**Params**
1. `steps: int`: The number of discrete steps (minimum 2).

**Returns**
* `SliderWidgetHelper`: Self for chaining.

**Notes**
- Minimum value is 2 (provides minimum and maximum positions)
- Higher values create more discrete positions
- The slider value is always between 0.0 and 1.0 regardless of steps

## Slider Builder

### SliderWidgetHelper.SliderBuilder
```js
const screen = Hud.createScreen("Builder Demo", false);

// Create slider using builder pattern
const slider = new SliderWidgetHelper.SliderBuilder(screen)
    .pos(50, 50)
    .size(200, 20)
    .text("Volume")
    .steps(10)
    .initially(5)
    .action(JavaWrapper.methodToJava((sliderHelper, currentScreen) => {
        const value = sliderHelper.getValue();
        Chat.log(`Volume changed to: ${Math.round(value * 100)}%`);
    }))
    .zIndex(1)
    .createWidget();

screen.addWidget(slider);
Hud.openScreen(screen);
```

#### Builder Methods

**pos(x: int, y: int)**
- Sets the slider position on the screen.

**size(width: int, height: int)**
- Sets the slider size.

**text(label: string | TextHelper)**
- Sets the slider label text.

**steps(count: int)**
- Sets the number of discrete steps (minimum 2).

**initially(stepIndex: int)**
- Sets the initial step index (0 to steps-1).

**action(callback: MethodWrapper<SliderWidgetHelper, IScreen, Object, ?>)**
- Sets the callback to execute when the slider value changes.

**zIndex(index: int)**
- Sets the rendering order.

**createWidget()**
- Creates and returns the SliderWidgetHelper instance.

## Examples

### Basic Volume Control
```js
function createVolumeControl() {
    const screen = Hud.createScreen("Volume Control", false);

    // Master volume slider
    const masterVolume = screen.addSlider(10, 30, 200, 20, "Master Volume", 11, JavaWrapper.methodToJava((slider) => {
        const volume = Math.round(slider.getValue() * 100);
        Chat.log(`Master Volume: ${volume}%`);
    }));

    // Music volume slider
    const musicVolume = screen.addSlider(10, 60, 200, 20, "Music Volume", 11, JavaWrapper.methodToJava((slider) => {
        const volume = Math.round(slider.getValue() * 100);
        Chat.log(`Music Volume: ${volume}%`);
    }));

    // Sound effects slider
    const sfxVolume = screen.addSlider(10, 90, 200, 20, "Sound Effects", 11, JavaWrapper.methodToJava((slider) => {
        const volume = Math.round(slider.getValue() * 100);
        Chat.log(`Sound Effects: ${volume}%`);
    }));

    // Set initial values
    masterVolume.setValue(0.7);  // 70%
    musicVolume.setValue(0.5);   // 50%
    sfxVolume.setValue(0.8);     // 80%

    // Mute button
    let muted = false;
    const muteBtn = screen.addButton(10, 120, 100, 20, "Mute All", JavaWrapper.methodToJava(() => {
        muted = !muted;
        if (muted) {
            masterVolume.setValue(0.0);
            musicVolume.setValue(0.0);
            sfxVolume.setValue(0.0);
            muteBtn.setLabel("Unmute All");
        } else {
            masterVolume.setValue(0.7);
            musicVolume.setValue(0.5);
            sfxVolume.setValue(0.8);
            muteBtn.setLabel("Mute All");
        }
    }));

    return screen;
}

Hud.openScreen(createVolumeControl());
```

### RGB Color Picker
```js
function createColorPicker() {
    const screen = Hud.createScreen("Color Picker", false);

    // Color preview rectangle (simulated with text)
    const colorPreview = screen.addText("Color Preview", 250, 30, 0xFFFFFF, true);

    // RGB sliders
    const redSlider = screen.addSlider(10, 30, 200, 20, "Red", 256, JavaWrapper.methodToJava((slider) => {
        updateColor();
    }));

    const greenSlider = screen.addSlider(10, 60, 200, 20, "Green", 256, JavaWrapper.methodToJava((slider) => {
        updateColor();
    }));

    const blueSlider = screen.addSlider(10, 90, 200, 20, "Blue", 256, JavaWrapper.methodToJava((slider) => {
        updateColor();
    }));

    // Alpha slider
    const alphaSlider = screen.addSlider(10, 120, 200, 20, "Alpha", 256, JavaWrapper.methodToJava((slider) => {
        updateColor();
    }));

    function updateColor() {
        const red = Math.floor(redSlider.getValue() * 255);
        const green = Math.floor(greenSlider.getValue() * 255);
        const blue = Math.floor(blueSlider.getValue() * 255);
        const alpha = Math.floor(alphaSlider.getValue() * 255);

        const color = (alpha << 24) | (red << 16) | (green << 8) | blue;

        // Create colored text representation
        const colorText = `R: ${red} G: ${green} B: ${blue} A: ${alpha}\nHex: 0x${color.toString(16).toUpperCase()}`;
        colorPreview.setText(colorText);
        colorPreview.setColor(color);

        // Display a colored background effect (simulated)
        Chat.log(`Color: R=${red}, G=${green}, B=${blue}, A=${alpha}`);
    }

    // Preset colors
    const presets = [
        { name: "Red", r: 255, g: 0, b: 0, a: 255 },
        { name: "Green", r: 0, g: 255, b: 0, a: 255 },
        { name: "Blue", r: 0, g: 0, b: 255, a: 255 },
        { name: "White", r: 255, g: 255, b: 255, a: 255 }
    ];

    presets.forEach((preset, index) => {
        const y = 160 + index * 25;
        screen.addButton(10, y, 100, 20, preset.name, JavaWrapper.methodToJava(() => {
            redSlider.setValue(preset.r / 255);
            greenSlider.setValue(preset.g / 255);
            blueSlider.setValue(preset.b / 255);
            alphaSlider.setValue(preset.a / 255);
        }));
    });

    return screen;
}

Hud.openScreen(createColorPicker());
```

### Settings Configuration with Sliders
```js
function createSettingsScreen() {
    const screen = Hud.createScreen("Settings", false);

    // Game settings sliders
    const renderDistance = screen.addSlider(10, 30, 200, 20, "Render Distance", 17, JavaWrapper.methodToJava((slider) => {
        const value = Math.floor(slider.getValue() * 16) + 2; // 2-18 chunks
        Chat.log(`Render Distance: ${value} chunks`);
    }));

    const brightness = screen.addSlider(10, 60, 200, 20, "Brightness", 101, JavaWrapper.methodToJava((slider) => {
        const value = Math.round(slider.getValue() * 100);
        Chat.log(`Brightness: ${value}%`);
    }));

    const mouseSensitivity = screen.addSlider(10, 90, 200, 20, "Mouse Sensitivity", 201, JavaWrapper.methodToJava((slider) => {
        const value = Math.round(slider.getValue() * 200);
        Chat.log(`Mouse Sensitivity: ${value}%`);
    }));

    const fov = screen.addSlider(10, 120, 200, 20, "FOV", 131, JavaWrapper.methodToJava((slider) => {
        const value = Math.floor(slider.getValue() * 110) + 30; // 30-140 degrees
        Chat.log(`FOV: ${value}°`);
    }));

    // Set initial values
    renderDistance.setValue((12 - 2) / 16); // 12 chunks
    brightness.setValue(0.5); // 50%
    mouseSensitivity.setValue(1.0); // 100%
    fov.setValue((90 - 30) / 110); // 90 degrees

    // Preset buttons
    screen.addButton(10, 160, 80, 20, "Low", JavaWrapper.methodToJava(() => {
        renderDistance.setValue((4 - 2) / 16); // 4 chunks
        brightness.setValue(0.0); // 0%
        fov.setValue((60 - 30) / 110); // 60 degrees
    }));

    screen.addButton(100, 160, 80, 20, "Medium", JavaWrapper.methodToJava(() => {
        renderDistance.setValue((8 - 2) / 16); // 8 chunks
        brightness.setValue(0.5); // 50%
        fov.setValue((90 - 30) / 110); // 90 degrees
    }));

    screen.addButton(190, 160, 80, 20, "High", JavaWrapper.methodToJava(() => {
        renderDistance.setValue((16 - 2) / 16); // 16 chunks
        brightness.setValue(1.0); // 100%
        fov.setValue((110 - 30) / 110); // 110 degrees
    }));

    // Save button
    screen.addButton(10, 190, 100, 20, "Save Settings", JavaWrapper.methodToJava(() => {
        Chat.log("Settings saved!");
        Hud.openScreen(null);
    }));

    return screen;
}

Hud.openScreen(createSettingsScreen());
```

### Progress Bar Simulation
```js
function createProgressBarDemo() {
    const screen = Hud.createScreen("Progress Demo", false);

    // Create slider that acts like a progress bar
    const progressBar = screen.addSlider(10, 30, 300, 20, "Progress", 101, JavaWrapper.methodToJava((slider) => {
        updateProgressDisplay();
    }));

    // Progress display text
    const progressText = screen.addText("Progress: 0%", 10, 60, 0xFFFFFF, true);

    function updateProgressDisplay() {
        const progress = Math.round(progressBar.getValue() * 100);
        progressText.setText(`Progress: ${progress}%`);

        // Color code based on progress
        if (progress < 33) {
            progressText.setColor(0xFF0000); // Red
        } else if (progress < 66) {
            progressText.setColor(0xFFFF00); // Yellow
        } else {
            progressText.setColor(0x00FF00); // Green
        }
    }

    // Control buttons
    screen.addButton(10, 90, 60, 20, "0%", JavaWrapper.methodToJava(() => {
        progressBar.setValue(0.0);
    }));

    screen.addButton(80, 90, 60, 20, "25%", JavaWrapper.methodToJava(() => {
        progressBar.setValue(0.25);
    }));

    screen.addButton(150, 90, 60, 20, "50%", JavaWrapper.methodToJava(() => {
        progressBar.setValue(0.5);
    }));

    screen.addButton(220, 90, 60, 20, "75%", JavaWrapper.methodToJava(() => {
        progressBar.setValue(0.75);
    }));

    screen.addButton(290, 90, 60, 20, "100%", JavaWrapper.methodToJava(() => {
        progressBar.setValue(1.0);
    }));

    // Animated progress
    let animating = false;
    const animButton = screen.addButton(10, 120, 80, 20, "Animate", JavaWrapper.methodToJava(() => {
        if (animating) return;
        animating = true;
        animButton.setLabel("Running...");
        animButton.setActive(false);

        let progress = 0.0;
        const interval = setInterval(() => {
            progress += 0.01;
            progressBar.setValue(progress);

            if (progress >= 1.0) {
                clearInterval(interval);
                animating = false;
                animButton.setLabel("Animate");
                animButton.setActive(true);
            }
        }, 50);
    }));

    // Reset button
    screen.addButton(100, 120, 60, 20, "Reset", JavaWrapper.methodToJava(() => {
        progressBar.setValue(0.0);
    }));

    return screen;
}

Hud.openScreen(createProgressBarDemo());
```

### Zoom Control
```js
function createZoomControl() {
    const screen = Hud.createScreen("Zoom Control", false);

    // Zoom level slider
    const zoomSlider = screen.addSlider(10, 30, 200, 20, "Zoom Level", 51, JavaWrapper.methodToJava((slider) => {
        updateZoomDisplay();
    }));

    // Zoom display
    const zoomText = screen.addText("Zoom: 100%", 10, 60, 0xFFFFFF, true);

    function updateZoomDisplay() {
        // Map 0.0-1.0 to 25%-400% zoom
        const zoomPercent = Math.round((zoomSlider.getValue() * 3.75 + 0.25) * 100);
        zoomText.setText(`Zoom: ${zoomPercent}%`);

        // Color code based on zoom level
        if (zoomPercent < 50) {
            zoomText.setColor(0x00FFFF); // Cyan for zoom out
        } else if (zoomPercent > 200) {
            zoomText.setColor(0xFF00FF); // Magenta for zoom in
        } else {
            zoomText.setColor(0xFFFFFF); // White for normal
        }
    }

    // Preset zoom levels
    const zoomPresets = [
        { name: "25%", value: 0.0 },
        { name: "50%", value: 0.067 },
        { name: "100%", value: 0.2 },
        { name: "150%", value: 0.333 },
        { name: "200%", value: 0.467 },
        { name: "400%", value: 1.0 }
    ];

    zoomPresets.forEach((preset, index) => {
        const x = 10 + (index % 3) * 70;
        const y = 90 + Math.floor(index / 3) * 30;

        screen.addButton(x, y, 60, 20, preset.name, JavaWrapper.methodToJava(() => {
            zoomSlider.setValue(preset.value);
        }));
    });

    // Fine adjustment buttons
    screen.addButton(10, 150, 80, 20, "Zoom In", JavaWrapper.methodToJava(() => {
        const newValue = Math.min(1.0, zoomSlider.getValue() + 0.02); // 2% steps
        zoomSlider.setValue(newValue);
    }));

    screen.addButton(100, 150, 80, 20, "Zoom Out", JavaWrapper.methodToJava(() => {
        const newValue = Math.max(0.0, zoomSlider.getValue() - 0.02); // 2% steps
        zoomSlider.setValue(newValue);
    }));

    screen.addButton(190, 150, 80, 20, "Reset", JavaWrapper.methodToJava(() => {
        zoomSlider.setValue(0.2); // 100%
    }));

    return screen;
}

Hud.openScreen(createZoomControl());
```

**Notes**
- SliderWidgetHelper provides intuitive value selection with visual feedback
- Values are always normalized to 0.0-1.0 range regardless of step count
- Use `steps` to create discrete positions or smoother transitions
- The builder pattern allows for clean slider configuration
- Slider values can be set programmatically for precise control
- Combine sliders with other UI elements for complex interfaces
- The action callback fires continuously while dragging and on final value
- Use step values to create percentage-based controls or discrete options
- Sliders are perfect for volume, brightness, progress, and configuration controls