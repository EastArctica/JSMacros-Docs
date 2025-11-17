# CyclingButtonWidgetHelper

A specialized helper for creating cycling buttons that allow users to navigate through a predefined set of values. CyclingButtonWidgetHelper extends ClickableWidgetHelper with cycling-specific functionality including value management, text conversion, and bidirectional navigation.

## Fields
- [CyclingButtonWidgetHelper.zIndex](#cyclingbuttonwidgethelperzindex)

## Methods
- [CyclingButtonWidgetHelper.getValue](#cyclingbuttonwidgethelpergetvalue)
- [CyclingButtonWidgetHelper.getStringValue](#cyclingbuttonwidgethelpergetstringvalue)
- [CyclingButtonWidgetHelper.setValue](#cyclingbuttonwidgethelpersetvalue)
- [CyclingButtonWidgetHelper.cycle](#cyclingbuttonhelpercycle)
- [CyclingButtonWidgetHelper.forward](#cyclingbuttonhelperforward)
- [CyclingButtonWidgetHelper.backward](#cyclingbuttonhelperbackward)

## Fields

### CyclingButtonWidgetHelper.zIndex
The z-index (render order) of this cycling button. Higher values render on top of lower values.

**Type**
* `int`

## Methods

### CyclingButtonWidgetHelper.getValue
```js
const screen = Hud.createScreen("Cycling Demo", false);
const modes = ["Easy", "Medium", "Hard"];
const modeButton = screen.addCyclingButton(10, 30, 150, 20, "Difficulty",
    JavaWrapper.methodToJava((value) => TextHelper.create(value)),
    modes, "Medium", () => {});

const currentMode = modeButton.getValue(); // Returns "Medium"
Chat.log(`Current mode: ${currentMode}`);
```

**Params**
* `(none)`

**Returns**
* `T`: The current value of the cycling button.

### CyclingButtonWidgetHelper.getStringValue
```js
const screen = Hud.createScreen("Cycling Demo", false);
const colors = [0xFF0000, 0x00FF00, 0x0000FF];
const colorButton = screen.addCyclingButton(10, 30, 150, 20, "Color",
    JavaWrapper.methodToJava((value) => TextHelper.create(`Color: ${value.toString(16)}`)),
    colors, colors[0], () => {});

const currentText = colorButton.getStringValue();
Chat.log(`Current color: ${currentText}`);
```

**Params**
* `(none)`

**Returns**
* `string`: The current value converted to its string representation.

### CyclingButtonWidgetHelper.setValue
```js
const screen = Hud.createScreen("Cycling Demo", false);
const sizes = ["Small", "Medium", "Large"];
const sizeButton = screen.addCyclingButton(10, 30, 150, 20, "Size",
    JavaWrapper.methodToJava((value) => TextHelper.create(value)),
    sizes, "Medium", () => {});

// Set to specific value
sizeButton.setValue("Large");

const changed = sizeButton.setValue("Small"); // Returns false if already Small
```

**Params**
1. `val: T`: The new value to set.

**Returns**
* `boolean`: `true` if the value changed, `false` if the value was already set.

### CyclingButtonWidgetHelper.cycle
```js
const screen = Hud.createScreen("Cycling Demo", false);
const options = ["Option 1", "Option 2", "Option 3"];
const optionButton = screen.addCyclingButton(10, 30, 150, 20, "Option",
    JavaWrapper.methodToJava((value) => TextHelper.create(value)),
    options, "Option 1", () => {});

// Cycle forward by 2 positions
optionButton.cycle(2); // Now at "Option 3"

// Cycle backward by 1 position
optionButton.cycle(-1); // Now at "Option 2"

// Cycle with wrapping
optionButton.cycle(1); // Now at "Option 3"
optionButton.cycle(1); // Now at "Option 1" (wrapped around)
```

**Params**
1. `amount: int`: The number of positions to cycle (positive for forward, negative for backward).

**Returns**
* `CyclingButtonWidgetHelper`: Self for chaining.

### CyclingButtonWidgetHelper.forward
```js
const screen = Hud.createScreen("Cycling Demo", false);
const modes = ["Mode A", "Mode B", "Mode C"];
const modeButton = screen.addCyclingButton(10, 30, 150, 20, "Mode",
    JavaWrapper.methodToJava((value) => TextHelper.create(value)),
    modes, "Mode A", () => {});

// Cycle forward by 1
modeButton.forward(); // Now at "Mode B"
modeButton.forward(); // Now at "Mode C"
modeButton.forward(); // Now at "Mode A" (wrapped)
```

**Params**
* `(none)`

**Returns**
* `CyclingButtonWidgetHelper`: Self for chaining.

### CyclingButtonWidgetHelper.backward
```js
const screen = Hud.createScreen("Cycling Demo", false);
const modes = ["Mode A", "Mode B", "Mode C"];
const modeButton = screen.addCyclingButton(10, 30, 150, 20, "Mode",
    JavaWrapper.methodToJava((value) => TextHelper.create(value)),
    modes, "Mode A", () => {});

// Cycle backward by 1
modeButton.backward(); // Now at "Mode C" (wrapped backward)
modeButton.backward(); // Now at "Mode B"
modeButton.backward(); // Now at "Mode A"
```

**Params**
* `(none)`

**Returns**
* `CyclingButtonWidgetHelper`: Self for chaining.

## Cycling Button Builder

### CyclingButtonWidgetHelper.CyclicButtonBuilder
```js
const screen = Hud.createScreen("Builder Demo", false);

// Define value to text conversion function
const valueToText = JavaWrapper.methodToJava((value) => {
    return TextHelper.create(`Mode: ${value}`);
});

// Create cycling button using builder pattern
const cyclingButton = new CyclingButtonWidgetHelper.CyclicButtonBuilder(screen, valueToText)
    .pos(50, 50)
    .size(200, 20)
    .option("Game Mode")
    .values("Survival", "Creative", "Adventure", "Spectator")
    .initially("Survival")
    .action(JavaWrapper.methodToJava((buttonHelper, currentScreen) => {
        const currentMode = buttonHelper.getValue();
        Chat.log(`Game mode changed to: ${currentMode}`);
    }))
    .zIndex(1)
    .createWidget();

screen.addWidget(cyclingButton);
Hud.openScreen(screen);
```

#### Builder Methods

**pos(x: int, y: int)**
- Sets the button position on the screen.

**size(width: int, height: int)**
- Sets the button size.

**option(label: string | TextHelper)**
- Sets the option text prefix.

**initially(value: T)**
- Sets the initial value.

**values(T... values)**
- Sets the list of values to cycle through.

**alternatives(T... values)**
- Sets alternate values to cycle through when alternate toggle is true.

**values(defaults: T[], alternatives: T[])**
- Sets both default and alternate value sets.

**valueToText(callback: MethodWrapper<T, ?, TextHelper, ?>)**
- Sets the function to convert values to display text.

**action(callback: MethodWrapper<CyclingButtonWidgetHelper, IScreen, Object, ?>)**
- Sets the callback to execute when the value changes.

**alternateToggle(callback: MethodWrapper<?, ?, Boolean, ?>)**
- Sets the function to determine whether to use default or alternate values.

**omitTextOption(omit: boolean)**
- Sets whether to omit the option text prefix.

**zIndex(index: int)**
- Sets the rendering order.

**createWidget()**
- Creates and returns the CyclingButtonWidgetHelper instance.

## Examples

### Basic Game Settings
```js
function createGameSettings() {
    const screen = Hud.createScreen("Game Settings", false);

    // Difficulty setting
    const difficulties = ["Peaceful", "Easy", "Normal", "Hard"];
    const difficultyButton = screen.addCyclingButton(10, 30, 150, 20, "Difficulty",
        JavaWrapper.methodToJava((value) => TextHelper.create(value)),
        difficulties, "Normal", JavaWrapper.methodToJava((button) => {
            Chat.log(`Difficulty set to: ${button.getValue()}`);
        }));

    // Game mode setting
    const gameModes = ["Survival", "Creative", "Adventure", "Spectator"];
    const gameModeButton = screen.addCyclingButton(10, 60, 150, 20, "Game Mode",
        JavaWrapper.methodToJava((value) => TextHelper.create(value)),
        gameModes, "Survival", JavaWrapper.methodToJava((button) => {
            Chat.log(`Game mode set to: ${button.getValue()}`);
        }));

    // Render distance
    const renderDistances = [2, 4, 6, 8, 12, 16, 32];
    const renderDistanceButton = screen.addCyclingButton(10, 90, 150, 20, "Render Distance",
        JavaWrapper.methodToJava((value) => TextHelper.create(`${value} chunks`)),
        renderDistances, 8, JavaWrapper.methodToJava((button) => {
            Chat.log(`Render distance set to: ${button.getValue()} chunks`);
        }));

    // Apply button
    screen.addButton(10, 130, 100, 20, "Apply", JavaWrapper.methodToJava(() => {
        Chat.log("Settings applied:");
        Chat.log(`  Difficulty: ${difficultyButton.getValue()}`);
        Chat.log(`  Game Mode: ${gameModeButton.getValue()}`);
        Chat.log(`  Render Distance: ${renderDistanceButton.getValue()} chunks`);
    }));

    return screen;
}

Hud.openScreen(createGameSettings());
```

### Color Picker
```js
function createColorPicker() {
    const screen = Hud.createScreen("Color Picker", false);

    // Define color options with names and values
    const colorOptions = [
        { name: "Red", value: 0xFF0000 },
        { name: "Green", value: 0x00FF00 },
        { name: "Blue", value: 0x0000FF },
        { name: "Yellow", value: 0xFFFF00 },
        { name: "Magenta", value: 0xFF00FF },
        { name: "Cyan", value: 0x00FFFF },
        { name: "White", value: 0xFFFFFF },
        { name: "Black", value: 0x000000 }
    ];

    const colorButton = screen.addCyclingButton(10, 30, 150, 20, "Color",
        JavaWrapper.methodToJava((color) => {
            // Find the color name
            const colorObj = colorOptions.find(c => c.value === color);
            return TextHelper.create(colorObj ? colorObj.name : "Custom");
        }),
        colorOptions.map(c => c.value), 0xFF0000, JavaWrapper.methodToJava((button) => {
            updateColorPreview();
        }));

    // Color preview area
    const colorPreview = screen.addText("Color Preview:", 10, 70, 0xFFFFFF, true);
    const colorDisplay = screen.addRect(10, 90, 60, 60, 0xFF0000);

    // Color information display
    const colorInfo = screen.addText("Color: 0xFF0000", 80, 95, 0xFFFFFF, true);

    function updateColorPreview() {
        const currentColor = colorButton.getValue();
        colorDisplay.addRect(11, 91, 69, 149, currentColor, 255);
        colorInfo.setText(`Color: 0x${currentColor.toString(16).toUpperCase().padStart(6, '0')}`);
    }

    // Preset color buttons
    const presetColors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00];
    presetColors.forEach((color, index) => {
        const x = 180 + (index % 2) * 60;
        const y = 90 + Math.floor(index / 2) * 30;

        screen.addRect(x, y, x + 50, y + 20, color);
        const presetButton = screen.addButton(x, y, 50, 20, "", JavaWrapper.methodToJava(() => {
            colorButton.setValue(color);
            updateColorPreview();
        }));
        presetButton.setTooltip(`Set color to ${color.toString(16)}`);
    });

    // Initialize preview
    updateColorPreview();

    return screen;
}

Hud.openScreen(createColorPicker());
```

### Time Selector
```js
function createTimeSelector() {
    const screen = Hud.createScreen("Time Selector", false);

    // Hours (0-23)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const hourButton = screen.addCyclingButton(10, 30, 80, 20, "Hour",
        JavaWrapper.methodToJava((hour) => TextHelper.create(`${hour.toString().padStart(2, '0')}`)),
        hours, 12, JavaWrapper.methodToJava((button) => {
            updateTimeDisplay();
        }));

    // Minutes (0-59)
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const minuteButton = screen.addCyclingButton(100, 30, 80, 20, "Minute",
        JavaWrapper.methodToJava((minute) => TextHelper.create(`${minute.toString().padStart(2, '0')}`)),
        minutes, 0, JavaWrapper.methodToJava((button) => {
            updateTimeDisplay();
        }));

    // Period selector
    const periods = ["AM", "PM"];
    const periodButton = screen.addCyclingButton(190, 30, 60, 20, "Period",
        JavaWrapper.methodToJava((period) => TextHelper.create(period)),
        periods, "PM", JavaWrapper.methodToJava((button) => {
            updateTimeDisplay();
        }));

    // Time display
    const timeDisplay = screen.addText("12:00 PM", 10, 60, 0xFFFFFF, true);

    function updateTimeDisplay() {
        const hour = hourButton.getValue();
        const minute = minuteButton.getValue();
        const period = periodButton.getValue();

        // Convert to 12-hour format
        let displayHour = hour;
        if (hour === 0) displayHour = 12;
        else if (hour > 12) displayHour = hour - 12;

        timeDisplay.setText(`${displayHour}:${minute.toString().padStart(2, '0')} ${period}`);
    }

    // Quick time buttons
    const quickTimes = [
        { hour: 6, minute: 0, period: "AM", name: "Morning" },
        { hour: 12, minute: 0, period: "PM", name: "Noon" },
        { hour: 6, minute: 0, period: "PM", name: "Evening" },
        { hour: 11, minute: 59, period: "PM", name: "Night" }
    ];

    quickTimes.forEach((time, index) => {
        const y = 90 + index * 25;
        screen.addButton(10, y, 100, 20, time.name, JavaWrapper.methodToJava(() => {
            hourButton.setValue(time.hour);
            minuteButton.setValue(time.minute);
            periodButton.setValue(time.period);
            updateTimeDisplay();
        }));
    });

    // Set time button
    screen.addButton(120, 90, 100, 20, "Set Time", JavaWrapper.methodToJava(() => {
        const hour = hourButton.getValue();
        const minute = minuteButton.getValue();
        Chat.log(`Time set to ${hour}:${minute.toString().padStart(2, '0')}`);
    }));

    // Initialize display
    updateTimeDisplay();

    return screen;
}

Hud.openScreen(createTimeSelector());
```

### Advanced Mode Selector with Alternatives
```js
function createAdvancedModeSelector() {
    const screen = Hud.createScreen("Advanced Mode", false);

    // Define modes for different contexts
    const standardModes = ["Normal", "Advanced", "Expert"];
    const adminModes = ["Admin", "Super Admin", "Root"];

    // Create alternating cycling button
    const modeButton = new CyclingButtonWidgetHelper.CyclicButtonBuilder(screen,
        JavaWrapper.methodToJava((mode) => TextHelper.create(mode)))
        .pos(10, 30)
        .size(150, 20)
        .option("Mode")
        .values(standardModes, adminModes)
        .initially("Normal")
        .alternateToggle(JavaWrapper.methodToJava(() => {
            // Check if player has admin privileges
            const player = Player.getPlayer();
            return player && player.hasPermissionLevel(2); // Admin level
        }))
        .action(JavaWrapper.methodToJava((buttonHelper, currentScreen) => {
            const currentMode = buttonHelper.getValue();
            const isAdmin = buttonHelper.getValue() === "Admin" || buttonHelper.getValue() === "Super Admin" || buttonHelper.getValue() === "Root";
            Chat.log(`Mode changed to: ${currentMode} ${isAdmin ? "(Admin)" : "(Standard)"}`);
        }))
        .createWidget();

    screen.addWidget(modeButton);

    // Permission status
    const permissionText = screen.addText("Checking permissions...", 10, 60, 0xFFFFFF, true);

    function updatePermissionStatus() {
        const player = Player.getPlayer();
        if (player) {
            const hasAdmin = player.hasPermissionLevel(2);
            permissionText.setText(`Admin access: ${hasAdmin ? "Granted" : "Denied"}`);
            permissionText.setColor(hasAdmin ? 0x00FF00 : 0xFF0000);
        } else {
            permissionText.setText("Player not found");
            permissionText.setColor(0xFF0000);
        }
    }

    // Manual toggle for testing
    screen.addButton(10, 90, 100, 20, "Toggle Admin", JavaWrapper.methodToJava(() => {
        // Simulate permission change
        const currentMode = modeButton.getValue();
        if (standardModes.includes(currentMode)) {
            modeButton.setValue("Admin");
        } else {
            modeButton.setValue("Normal");
        }
    }));

    // Mode info display
    const modeInfo = screen.addText("", 10, 120, 0xFFFFFF, true);

    function updateModeInfo() {
        const currentMode = modeButton.getValue();
        let info = "";

        switch (currentMode) {
            case "Normal":
                info = "Standard user permissions";
                break;
            case "Advanced":
                info = "Extended features available";
                break;
            case "Expert":
                info = "Full control over settings";
                break;
            case "Admin":
                info = "Administrative privileges";
                break;
            case "Super Admin":
                info = "Elevated admin access";
                break;
            case "Root":
                info = "System-level access";
                break;
        }

        modeInfo.setText(`Current mode: ${info}`);
    }

    // Update displays
    setInterval(() => {
        updatePermissionStatus();
        updateModeInfo();
    }, 1000);

    return screen;
}

Hud.openScreen(createAdvancedModeSelector());
```

### Menu Navigation System
```js
function createMenuNavigation() {
    const screen = Hud.createScreen("Menu Navigation", false);

    // Define menu structure
    const menus = {
        main: ["File", "Edit", "View", "Tools", "Help"],
        file: ["New", "Open", "Save", "Save As", "Exit"],
        edit: ["Undo", "Redo", "Cut", "Copy", "Paste"],
        view: ["Zoom In", "Zoom Out", "Reset", "Fullscreen"],
        tools: ["Settings", "Plugins", "Macros", "Debug"],
        help: ["Documentation", "About", "Check Updates", "Report Issue"]
    };

    let currentMenu = "main";
    let currentSubmenu = null;

    // Main menu button
    const menuButton = new CyclingButtonWidgetHelper.CyclicButtonBuilder(screen,
        JavaWrapper.methodToJava((menu) => TextHelper.create(menu)))
        .pos(10, 30)
        .size(150, 20)
        .option("Menu")
        .values(menus.main)
        .initially("File")
        .action(JavaWrapper.methodToJava((buttonHelper, currentScreen) => {
            currentMenu = buttonHelper.getValue();
            updateSubmenu();
        }))
        .createWidget();

    screen.addWidget(menuButton);

    // Submenu button
    const submenuButton = new CyclingButtonWidgetHelper.CyclicButtonBuilder(screen,
        JavaWrapper.methodToJava((item) => TextHelper.create(item)))
        .pos(170, 30)
        .size(150, 20)
        .option("Action")
        .values(["Select menu first"])
        .initially("Select menu first")
        .action(JavaWrapper.methodToJava((buttonHelper, currentScreen) => {
            currentSubmenu = buttonHelper.getValue();
            executeAction();
        }))
        .createWidget();

    screen.addWidget(submenuButton);

    function updateSubmenu() {
        if (menus[currentMenu]) {
            submenuButton.cycle(1); // Force re-evaluation of values
            const items = menus[currentMenu];
            if (items.length > 0) {
                submenuButton.setValue(items[0]);
            }
        }
    }

    function executeAction() {
        if (currentSubmenu) {
            Chat.log(`Executing: ${currentMenu} > ${currentSubmenu}`);

            // Simulate different actions
            switch (currentSubmenu) {
                case "New":
                    Chat.log("Creating new file...");
                    break;
                case "Save":
                    Chat.log("Saving file...");
                    break;
                case "Settings":
                    Chat.log("Opening settings...");
                    break;
                case "About":
                    Chat.log("Showing about dialog...");
                    break;
                default:
                    Chat.log(`Action: ${currentSubmenu}`);
            }
        }
    }

    // Navigation status
    const statusText = screen.addText("Current: File > New", 10, 70, 0xFFFFFF, true);

    setInterval(() => {
        statusText.setText(`Current: ${currentMenu} > ${currentSubmenu || "None"}`);
    }, 100);

    // Quick navigation buttons
    screen.addButton(10, 100, 80, 20, "File Menu", JavaWrapper.methodToJava(() => {
        menuButton.setValue("File");
        currentMenu = "File";
        updateSubmenu();
    }));

    screen.addButton(100, 100, 80, 20, "Edit Menu", JavaWrapper.methodToJava(() => {
        menuButton.setValue("Edit");
        currentMenu = "Edit";
        updateSubmenu();
    }));

    screen.addButton(190, 100, 80, 20, "Help", JavaWrapper.methodToJava(() => {
        menuButton.setValue("Help");
        currentMenu = "Help";
        updateSubmenu();
    }));

    return screen;
}

Hud.openScreen(createMenuNavigation());
```

**Notes**
- CyclingButtonWidgetHelper provides elegant value selection from predefined sets
- Use the builder pattern for complex cycling buttons with custom value formatting
- Perfect for settings, modes, colors, times, and any discrete value selection
- Supports both default and alternate value sets with conditional toggling
- Values can be of any type (strings, numbers, objects, etc.)
- The valueToText function controls how values are displayed to users
- Programmatic navigation with `forward()`, `backward()`, and `cycle()` methods
- Wrapping behavior ensures continuous cycling through all values
- Ideal for creating game-like interfaces with discrete options
- Can be combined with other UI elements for complex configuration screens