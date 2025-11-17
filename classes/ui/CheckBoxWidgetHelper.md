# CheckBoxWidgetHelper

A specialized helper for creating checkbox widgets that allow users to toggle boolean settings. CheckBoxWidgetHelper extends ClickableWidgetHelper with checkbox-specific functionality including state management and toggle actions.

## Fields
- [CheckBoxWidgetHelper.zIndex](#checkboxwidgethelperzindex)

## Methods
- [CheckBoxWidgetHelper.isChecked](#checkboxwidgethelperischecked)
- [CheckBoxWidgetHelper.toggle](#checkboxwidgethelpertoggle)
- [CheckBoxWidgetHelper.setChecked](#checkboxwidgethelpersetchecked)

## Fields

### CheckBoxWidgetHelper.zIndex
The z-index (render order) of this checkbox. Higher values render on top of lower values.

**Type**
* `int`

## Methods

### CheckBoxWidgetHelper.isChecked
```js
const screen = Hud.createScreen("Checkbox Demo", false);
const checkbox = screen.addCheckBox(10, 30, 20, 20, "Enable notifications", false, () => {});

if (checkbox.isChecked()) {
    Chat.log("Checkbox is checked");
} else {
    Chat.log("Checkbox is unchecked");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the checkbox is checked, `false` otherwise.

### CheckBoxWidgetHelper.toggle
```js
const screen = Hud.createScreen("Checkbox Demo", false);
const checkbox = screen.addCheckBox(10, 30, 20, 20, "Toggle me", false, () => {});

// Toggle the checkbox state
checkbox.toggle();

// Chain with other operations
checkbox.toggle().setTooltip("State toggled!");
```

**Params**
* `(none)`

**Returns**
* `CheckBoxWidgetHelper`: Self for chaining.

### CheckBoxWidgetHelper.setChecked
```js
const screen = Hud.createScreen("Checkbox Demo", false);
const checkbox = screen.addCheckBox(10, 30, 20, 20, "Set me", false, () => {});

// Check the checkbox
checkbox.setChecked(true);

// Uncheck the checkbox
checkbox.setChecked(false);

// Set based on condition
const shouldEnable = Player.getPlayer().getHealth() > 10;
checkbox.setChecked(shouldEnable);
```

**Params**
1. `checked: boolean`: `true` to check the checkbox, `false` to uncheck it.

**Returns**
* `CheckBoxWidgetHelper`: Self for chaining.

## CheckBox Builder

### CheckBoxWidgetHelper.CheckBoxBuilder
```js
const screen = Hud.createScreen("Builder Demo", false);

// Create checkbox using builder pattern
const checkbox = new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
    .pos(50, 50)
    .size(20, 20)
    .text("Enable feature")
    .checked(true)
    .action(JavaWrapper.methodToJava((checkBoxHelper, currentScreen) => {
        const isChecked = checkBoxHelper.isChecked();
        Chat.log(`Checkbox ${isChecked ? "checked" : "unchecked"}`);
    }))
    .zIndex(1)
    .createWidget();

screen.addWidget(checkbox);
Hud.openScreen(screen);
```

#### Builder Methods

**pos(x: int, y: int)**
- Sets the checkbox position on the screen.

**size(width: int, height: int)**
- Sets the checkbox size.

**text(label: string | TextHelper)**
- Sets the checkbox label text.

**checked(initialState: boolean)**
- Sets whether the checkbox is initially checked.

**action(callback: MethodWrapper<CheckBoxWidgetHelper, IScreen, Object, ?>)**
- Sets the callback to execute when the checkbox state changes.

**zIndex(index: int)**
- Sets the rendering order.

**createWidget()**
- Creates and returns the CheckBoxWidgetHelper instance.

## Examples

### Basic Settings Form
```js
function createSettingsForm() {
    const screen = Hud.createScreen("Settings", false);

    // Create various setting checkboxes
    const notificationsCheckbox = screen.addCheckBox(10, 30, 20, 20, "Enable notifications", true, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`Notifications ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    const autoSaveCheckbox = screen.addCheckBox(10, 60, 20, 20, "Auto-save", false, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`Auto-save ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    const debugModeCheckbox = screen.addCheckBox(10, 90, 20, 20, "Debug mode", false, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`Debug mode ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    const highQualityCheckbox = screen.addCheckBox(10, 120, 20, 20, "High quality", true, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`High quality ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    // Apply button
    screen.addButton(10, 160, 100, 20, "Apply", JavaWrapper.methodToJava(() => {
        const settings = {
            notifications: notificationsCheckbox.isChecked(),
            autoSave: autoSaveCheckbox.isChecked(),
            debugMode: debugModeCheckbox.isChecked(),
            highQuality: highQualityCheckbox.isChecked()
        };

        Chat.log("Settings applied:");
        for (const [key, value] of Object.entries(settings)) {
            Chat.log(`  ${key}: ${value}`);
        }
    }));

    // Reset button
    screen.addButton(120, 160, 100, 20, "Reset", JavaWrapper.methodToJava(() => {
        notificationsCheckbox.setChecked(true);
        autoSaveCheckbox.setChecked(false);
        debugModeCheckbox.setChecked(false);
        highQualityCheckbox.setChecked(true);
        Chat.log("Settings reset to defaults");
    }));

    return screen;
}

Hud.openScreen(createSettingsForm());
```

### Feature Toggle Interface
```js
function createFeatureToggle() {
    const screen = Hud.createScreen("Feature Toggle", false);

    // Feature toggles with dependencies
    const masterToggle = screen.addCheckBox(10, 30, 20, 20, "Enable advanced features", false, JavaWrapper.methodToJava((checkbox) => {
        const enabled = checkbox.isChecked();

        // Enable/disable dependent features
        hudToggle.setActive(enabled);
        notificationsToggle.setActive(enabled);
        debugToggle.setActive(enabled);

        if (enabled) {
            Chat.log("Advanced features enabled");
        } else {
            Chat.log("Advanced features disabled");

            // Turn off all sub-features
            hudToggle.setChecked(false);
            notificationsToggle.setChecked(false);
            debugToggle.setChecked(false);
        }
    }));

    const hudToggle = screen.addCheckBox(30, 60, 20, 20, "Show custom HUD", false, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`Custom HUD ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    const notificationsToggle = screen.addCheckBox(30, 90, 20, 20, "Custom notifications", false, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`Custom notifications ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    const debugToggle = screen.addCheckBox(30, 120, 20, 20, "Debug information", false, JavaWrapper.methodToJava((checkbox) => {
        Chat.log(`Debug information ${checkbox.isChecked() ? "enabled" : "disabled"}`);
    }));

    // Initially disable dependent features
    hudToggle.setActive(false);
    notificationsToggle.setActive(false);
    debugToggle.setActive(false);

    // Status display
    const statusText = screen.addText("Advanced features: Disabled", 10, 160, 0xFFFFFF, true);

    function updateStatus() {
        const advancedEnabled = masterToggle.isChecked();
        const featuresEnabled = hudToggle.isChecked() || notificationsToggle.isChecked() || debugToggle.isChecked();

        let status = "Advanced features: " + (advancedEnabled ? "Enabled" : "Disabled");
        if (advancedEnabled && featuresEnabled) {
            status += " - Active features: " + [
                hudToggle.isChecked() ? "HUD" : null,
                notificationsToggle.isChecked() ? "Notifications" : null,
                debugToggle.isChecked() ? "Debug" : null
            ].filter(Boolean).join(", ");
        }

        statusText.setText(status);
    }

    // Update status when any checkbox changes
    [masterToggle, hudToggle, notificationsToggle, debugToggle].forEach(checkbox => {
        // Update status (in a real implementation, you'd need to track the callbacks)
    });

    return screen;
}

Hud.openScreen(createFeatureToggle());
```

### Permission Manager
```js
function createPermissionManager() {
    const screen = Hud.createScreen("Permission Manager", false);

    // Define permission categories
    const permissions = [
        { key: "read", name: "Read access", description: "Can read data" },
        { key: "write", name: "Write access", description: "Can modify data" },
        { key: "execute", name: "Execute access", description: "Can run commands" },
        { key: "admin", name: "Admin access", description: "Full administrator access" }
    ];

    const checkboxes = {};
    const y = 30;

    // Create checkboxes for each permission
    permissions.forEach((permission, index) => {
        const checkboxY = y + index * 30;

        const checkbox = screen.addCheckBox(10, checkboxY, 20, 20, permission.name, false, JavaWrapper.methodToJava((cb) => {
            updatePermissionStatus();
        }));

        // Add tooltip with description
        checkbox.setTooltip(permission.description);

        checkboxes[permission.key] = checkbox;
    });

    // Control buttons
    screen.addButton(10, 160, 80, 20, "Grant All", JavaWrapper.methodToJava(() => {
        Object.values(checkboxes).forEach(cb => cb.setChecked(true));
        Chat.log("All permissions granted");
    }));

    screen.addButton(100, 160, 80, 20, "Revoke All", JavaWrapper.methodToJava(() => {
        Object.values(checkboxes).forEach(cb => cb.setChecked(false));
        Chat.log("All permissions revoked");
    }));

    screen.addButton(190, 160, 80, 20, "Standard", JavaWrapper.methodToJava(() => {
        checkboxes.read.setChecked(true);
        checkboxes.write.setChecked(true);
        checkboxes.execute.setChecked(false);
        checkboxes.admin.setChecked(false);
        Chat.log("Standard permissions applied");
    }));

    // Permission status display
    const statusText = screen.addText("", 10, 190, 0xFFFFFF, true);

    function updatePermissionStatus() {
        const grantedPermissions = Object.entries(checkboxes)
            .filter(([key, checkbox]) => checkbox.isChecked())
            .map(([key]) => key);

        if (grantedPermissions.length === 0) {
            statusText.setText("No permissions granted");
            statusText.setColor(0xFF0000);
        } else if (grantedPermissions.includes('admin')) {
            statusText.setText("Administrator access granted");
            statusText.setColor(0xFF00FF);
        } else {
            statusText.setText(`Permissions: ${grantedPermissions.join(", ")}`);
            statusText.setColor(0x00FF00);
        }
    }

    // Initial status update
    updatePermissionStatus();

    return screen;
}

Hud.openScreen(createPermissionManager());
```

### Selection Manager
```js
function createSelectionManager() {
    const screen = Hud.createScreen("Selection Manager", false);

    // Available options
    const options = [
        { id: "option1", name: "Option 1", color: 0xFF0000 },
        { id: "option2", name: "Option 2", color: 0x00FF00 },
        { id: "option3", name: "Option 3", color: 0x0000FF },
        { id: "option4", name: "Option 4", color: 0xFFFF00 },
        { id: "option5", name: "Option 5", color: 0xFF00FF }
    ];

    const checkboxes = {};
    const y = 30;

    // Create checkboxes for each option
    options.forEach((option, index) => {
        const checkboxY = y + index * 25;

        const checkbox = screen.addCheckBox(10, checkboxY, 20, 20, option.name, false, JavaWrapper.methodToJava((cb) => {
            updateSelection();
        }));

        checkbox.setTooltip(`Select ${option.name} (${option.color.toString(16)})`);
        checkboxes[option.id] = checkbox;
    });

    // Selection controls
    screen.addButton(10, 160, 60, 20, "None", JavaWrapper.methodToJava(() => {
        Object.values(checkboxes).forEach(cb => cb.setChecked(false));
        updateSelection();
    }));

    screen.addButton(80, 160, 60, 20, "All", JavaWrapper.methodToJava(() => {
        Object.values(checkboxes).forEach(cb => cb.setChecked(true));
        updateSelection();
    }));

    screen.addButton(150, 160, 60, 20, "Invert", JavaWrapper.methodToJava(() => {
        Object.values(checkboxes).forEach(cb => cb.toggle());
        updateSelection();
    }));

    // Selection display
    const selectionText = screen.addText("No options selected", 10, 190, 0xFFFFFF, true);
    const colorPreview = screen.addRect(250, 30, 270, 50, 0x000000, 200);

    function updateSelection() {
        const selectedOptions = options.filter(option =>
            checkboxes[option.id].isChecked()
        );

        if (selectedOptions.length === 0) {
            selectionText.setText("No options selected");
            selectionText.setColor(0x808080);
            colorPreview.addRect(251, 31, 269, 49, 0x000000, 200);
        } else if (selectedOptions.length === 1) {
            const selected = selectedOptions[0];
            selectionText.setText(`Selected: ${selected.name}`);
            selectionText.setColor(selected.color);
            colorPreview.addRect(251, 31, 269, 49, selected.color, 200);
        } else {
            selectionText.setText(`${selectedOptions.length} options selected`);
            selectionText.setColor(0xFFFFFF);

            // Create gradient preview for multiple selections
            for (let i = 0; i < selectedOptions.length; i++) {
                const option = selectedOptions[i];
                const y = 31 + (i * 18 / selectedOptions.length);
                const height = Math.ceil(18 / selectedOptions.length);
                colorPreview.addRect(251, y, 269, y + height, option.color, 200);
            }
        }

        Chat.log(`Selection updated: ${selectedOptions.map(o => o.name).join(", ")}`);
    }

    return screen;
}

Hud.openScreen(createSelectionManager());
```

### Using Builder Pattern for Complex Forms
```js
function createBuilderForm() {
    const screen = Hud.createScreen("Builder Pattern Demo", false);

    // Create checkboxes using builder pattern
    const checkboxes = [];

    // Privacy settings
    const privacyCheckboxes = [
        new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
            .pos(10, 30)
            .size(20, 20)
            .text("Share usage statistics")
            .checked(false)
            .tooltip("Help us improve by sharing anonymous usage data")
            .action(JavaWrapper.methodToJava((cb, scr) => {
                Chat.log(`Usage statistics: ${cb.isChecked() ? "enabled" : "disabled"}`);
            }))
            .createWidget(),

        new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
            .pos(10, 60)
            .size(20, 20)
            .text("Send crash reports")
            .checked(true)
            .tooltip("Automatically send error reports to help fix bugs")
            .action(JavaWrapper.methodToJava((cb, scr) => {
                Chat.log(`Crash reports: ${cb.isChecked() ? "enabled" : "disabled"}`);
            }))
            .createWidget(),

        new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
            .pos(10, 90)
            .size(20, 20)
            .text("Check for updates")
            .checked(true)
            .tooltip("Automatically check for new versions")
            .action(JavaWrapper.methodToJava((cb, scr) => {
                Chat.log(`Update checking: ${cb.isChecked() ? "enabled" : "disabled"}`);
            }))
            .createWidget()
    ];

    // Display settings
    const displayCheckboxes = [
        new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
            .pos(200, 30)
            .size(20, 20)
            .text("Show FPS")
            .checked(true)
            .tooltip("Display frames per second")
            .zIndex(1)
            .action(JavaWrapper.methodToJava((cb, scr) => {
                Chat.log(`FPS display: ${cb.isChecked() ? "enabled" : "disabled"}`);
            }))
            .createWidget(),

        new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
            .pos(200, 60)
            .size(20, 20)
            .text("Show coordinates")
            .checked(false)
            .tooltip("Display current position")
            .zIndex(1)
            .action(JavaWrapper.methodToJava((cb, scr) => {
                Chat.log(`Coordinates: ${cb.isChecked() ? "enabled" : "disabled"}`);
            }))
            .createWidget(),

        new CheckBoxWidgetHelper.CheckBoxBuilder(screen)
            .pos(200, 90)
            .size(20, 20)
            .text("Show chunk borders")
            .checked(false)
            .tooltip("Display chunk boundaries")
            .zIndex(1)
            .action(JavaWrapper.methodToJava((cb, scr) => {
                Chat.log(`Chunk borders: ${cb.isChecked() ? "enabled" : "disabled"}`);
            }))
            .createWidget()
    ];

    // Section labels
    screen.addText("Privacy Settings:", 10, 10, 0xFFFFFF, true);
    screen.addText("Display Settings:", 200, 10, 0xFFFFFF, true);

    // Control buttons
    screen.addButton(10, 130, 80, 20, "Reset", JavaWrapper.methodToJava(() => {
        privacyCheckboxes[0].setChecked(false);
        privacyCheckboxes[1].setChecked(true);
        privacyCheckboxes[2].setChecked(true);
        displayCheckboxes[0].setChecked(true);
        displayCheckboxes[1].setChecked(false);
        displayCheckboxes[2].setChecked(false);
    }));

    screen.addButton(100, 130, 80, 20, "Save", JavaWrapper.methodToJava(() => {
        Chat.log("Settings saved successfully!");
        Hud.openScreen(null);
    }));

    return screen;
}

Hud.openScreen(createBuilderForm());
```

**Notes**
- CheckBoxWidgetHelper provides intuitive boolean selection for user settings
- Checkboxes automatically handle visual feedback (check mark appearance)
- Use the builder pattern for clean, configurable checkbox creation
- Tooltips enhance user experience by providing contextual information
- Checkboxes can be programmatically controlled for dynamic interfaces
- The action callback fires every time the checkbox state changes
- Use `setChecked()` for programmatic control, `toggle()` for simple state flipping
- Perfect for settings panels, permission systems, and feature toggles
- Combine multiple checkboxes to create complex selection interfaces
- Remember to disable dependent checkboxes when their prerequisites are not met