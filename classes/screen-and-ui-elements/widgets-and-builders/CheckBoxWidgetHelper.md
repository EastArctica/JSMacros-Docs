# CheckBoxWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.CheckBoxWidgetHelper`

**Extends:** `ClickableWidgetHelper<CheckBoxWidgetHelper, CheckboxWidget>`

**Since:** JsMacros 1.8.4

The `CheckBoxWidgetHelper` class provides a wrapper for Minecraft's checkbox widget functionality in JSMacros custom screens. It represents a checkbox UI element that can be checked or unchecked, display text labels, handle user interactions, and trigger callback functions when the state changes. CheckBox widgets are commonly used for boolean settings, toggle options, and user preferences in custom UI screens.

## Overview

The `CheckBoxWidgetHelper` class offers comprehensive checkbox functionality including:
- Visual checkbox with check/uncheck states
- Customizable text labels and positioning
- Click interaction handling with callback support
- Tooltip support for additional information
- Builder pattern for easy creation and configuration
- Integration with JSMacros custom screen system
- Inherited widget properties (positioning, sizing, visibility, etc.)

## Constructors

CheckBoxWidgetHelper instances are typically created through IScreen methods or the CheckBoxBuilder, not directly instantiated.

### Creating CheckBoxes with IScreen

```js
// Method 1: Basic checkbox with callback
const checkBox = screen.addCheckbox(10, 20, 200, 20, "Enable Feature", false,
    JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Checkbox state: ${checkBox.isChecked()}`);
    })
);

// Method 2: With z-index and showMessage parameter
const checkBox2 = screen.addCheckbox(10, 50, 200, 20, 2, "Show Notifications", true, false,
    JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Notifications: ${checkBox.isChecked() ? "Enabled" : "Disabled"}`);
    })
);
```

### Creating CheckBoxes with Builder Pattern

```js
// Method 1: Default unchecked checkbox
const builder1 = screen.checkBoxBuilder();

// Method 2: Pre-checked checkbox
const builder2 = screen.checkBoxBuilder(true);

// Complete builder configuration
const checkBox = screen.checkBoxBuilder()
    .pos(10, 20)                    // Position
    .size(200, 20)                  // Width and height
    .message("Enable Auto-Save")    // Text label
    .checked(false)                 // Initial state
    .zIndex(1)                      // Render order
    .active(true)                   // Interactive
    .visible(true)                  // Visible
    .alpha(1.0)                     // Opacity
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-save ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();                       // Create and add to screen
```

## CheckBoxWidgetHelper-Specific Methods

## Inherited Methods from ClickableWidgetHelper

### Position and Size Methods

### Text and Label Methods

### Interaction Methods

### Tooltip Methods

**See Also:**
- `CheckBoxWidgetHelper.CheckBoxBuilder` - Builder for creating checkboxes with fluent API

## Usage Examples

### Basic Checkbox Example

```js
// Create a simple settings screen with checkboxes
const screen = Hud.createScreen("Settings", true);

// Add checkboxes
const autoSaveCheckbox = screen.addCheckbox(10, 30, 200, 20, "Auto-Save", false,
    JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-save: ${checkBox.isChecked() ? "ON" : "OFF"}`);
    })
);

const notificationsCheckbox = screen.addCheckbox(10, 60, 200, 20, "Notifications", true,
    JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Notifications: ${checkBox.isChecked() ? "Enabled" : "Disabled"}`);
    })
);

const debugCheckbox = screen.addCheckbox(10, 90, 200, 20, "Debug Mode", false,
    JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Debug mode: ${checkBox.isChecked() ? "ENABLED" : "DISABLED"}`);
    })
);

// Add a close button
screen.addButton(10, 130, 100, 20, "Close",
    JavaWrapper.methodToJavaAsync(() => {
        screen.close();
    })
);

Hud.openScreen(screen);
```

### Builder Pattern Example

```js
const screen = Hud.createScreen("Advanced Settings", true);

// Create checkboxes using builder pattern
const autoMineCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(180, 20)
    .message("Auto-Mine")
    .checked(false)
    .tooltip("Automatically mine blocks when looking at them")
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-mine ${checkBox.isChecked() ? "activated" : "deactivated"}`);
    }))
    .build();

const autoEatCheckbox = screen.checkBoxBuilder()
    .pos(10, 60)
    .size(180, 20)
    .message("Auto-Eat")
    .checked(true)
    .tooltip("Automatically eat food when hunger is low")
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-eat ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

const autoAttackCheckbox = screen.checkBoxBuilder()
    .pos(10, 90)
    .size(180, 20)
    .message("Auto-Attack")
    .checked(false)
    .tooltip("Automatically attack hostile mobs")
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-attack ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

// Add control buttons
const saveButton = screen.addButton(10, 130, 80, 20, "Save",
    JavaWrapper.methodToJavaAsync(() => {
        Chat.log("Settings saved!");
        screen.close();
    })
);

const cancelButton = screen.addButton(100, 130, 80, 20, "Cancel",
    JavaWrapper.methodToJavaAsync(() => {
        screen.close();
    })
);

Hud.openScreen(screen);
```

### Dynamic Checkbox Management

```js
const screen = Hud.createScreen("Dynamic Checkboxes", true);

let checkboxes = [];
const settings = ["Setting A", "Setting B", "Setting C", "Setting D"];

// Create checkboxes dynamically
for (let i = 0; i < settings.length; i++) {
    const checkbox = screen.checkBoxBuilder()
        .pos(10, 30 + i * 30)
        .size(200, 20)
        .message(settings[i])
        .checked(Math.random() > 0.5)
        .action(JavaWrapper.methodToJavaAsync((cb) => {
            updateStatus();
        }))
        .build();

    checkboxes.push(checkbox);
}

// Status display
const statusText = screen.addText(10, 160, "Initializing...", 0xFFFFFF);

function updateStatus() {
    const checkedCount = checkboxes.filter(cb => cb.isChecked()).length;
    statusText.setText(`${checkedCount} of ${checkboxes.length} settings enabled`);
}

// Control buttons
const toggleAllButton = screen.addButton(10, 180, 100, 20, "Toggle All",
    JavaWrapper.methodToJavaAsync(() => {
        const allChecked = checkboxes.every(cb => cb.isChecked());
        checkboxes.forEach(cb => cb.setChecked(!allChecked));
        updateStatus();
    })
);

const resetButton = screen.addButton(120, 180, 80, 20, "Reset",
    JavaWrapper.methodToJavaAsync(() => {
        checkboxes.forEach(cb => cb.setChecked(false));
        updateStatus();
    })
);

const closeButton = screen.addButton(10, 210, 190, 20, "Close",
    JavaWrapper.methodToJavaAsync(() => {
        screen.close();
    })
);

// Initial status update
updateStatus();
Hud.openScreen(screen);
```

### Interactive Settings Panel

```js
const screen = Hud.createScreen("Feature Settings", true);

// Feature categories with dependencies
const features = {
    base: {
        autoWalk: { name: "Auto-Walk", checked: false },
        autoJump: { name: "Auto-Jump", checked: false },
        autoSprint: { name: "Auto-Sprint", checked: false }
    },
    combat: {
        autoAttack: { name: "Auto-Attack", checked: false },
        autoBlock: { name: "Auto-Block", checked: false },
        autoDodge: { name: "Auto-Dodge", checked: false }
    },
    utility: {
        autoEat: { name: "Auto-Eat", checked: true },
        autoDrink: { name: "Auto-Drink", checked: true },
        autoRepair: { name: "Auto-Repair", checked: false }
    }
};

const createdCheckboxes = {};

// Create checkboxes for each category
let yOffset = 30;
Object.keys(features).forEach(category => {
    // Category header
    screen.addText(10, yOffset, category.toUpperCase() + ":", 0xFFFF00);
    yOffset += 20;

    createdCheckboxes[category] = {};

    Object.keys(features[category]).forEach(feature => {
        const featureData = features[category][feature];
        const checkbox = screen.checkBoxBuilder()
            .pos(20, yOffset)
            .size(180, 18)
            .message(featureData.name)
            .checked(featureData.checked)
            .tooltip(`${category}.${feature}`)
            .action(JavaWrapper.methodToJavaAsync((cb) => {
                handleFeatureChange(category, feature, cb.isChecked());
            }))
            .build();

        createdCheckboxes[category][feature] = checkbox;
        yOffset += 25;
    });

    yOffset += 10; // Spacing between categories
});

function handleFeatureChange(category, feature, enabled) {
    Chat.log(`${category}.${feature}: ${enabled ? "Enabled" : "Disabled"}`);

    // Handle feature dependencies
    if (feature === "autoSprint" && enabled) {
        createdCheckboxes.base.autoWalk.setChecked(true);
    }

    if (feature === "autoAttack" && enabled) {
        createdCheckboxes.base.autoSprint.setChecked(true);
    }

    // Update UI feedback
    updateFeatureStatus();
}

function updateFeatureStatus() {
    let totalEnabled = 0;
    let totalFeatures = 0;

    Object.keys(createdCheckboxes).forEach(category => {
        Object.keys(createdCheckboxes[category]).forEach(feature => {
            totalFeatures++;
            if (createdCheckboxes[category][feature].isChecked()) {
                totalEnabled++;
            }
        });
    });

    // Could update a status display here
    Chat.log(`Features enabled: ${totalEnabled}/${totalFeatures}`);
}

// Add control buttons
const enableAllButton = screen.addButton(10, 280, 90, 20, "Enable All",
    JavaWrapper.methodToJavaAsync(() => {
        Object.keys(createdCheckboxes).forEach(category => {
            Object.keys(createdCheckboxes[category]).forEach(feature => {
                createdCheckboxes[category][feature].setChecked(true);
            });
        });
        updateFeatureStatus();
    })
);

const disableAllButton = screen.addButton(110, 280, 90, 20, "Disable All",
    JavaWrapper.methodToJavaAsync(() => {
        Object.keys(createdCheckboxes).forEach(category => {
            Object.keys(createdCheckboxes[category]).forEach(feature => {
                createdCheckboxes[category][feature].setChecked(false);
            });
        });
        updateFeatureStatus();
    })
);

const closeButton = screen.addButton(10, 310, 190, 20, "Close & Save",
    JavaWrapper.methodToJavaAsync(() => {
        Chat.log("Settings saved and applied!");
        screen.close();
    })
);

Hud.openScreen(screen);
```

### Checkbox with Visual Feedback

```js
const screen = Hud.createScreen("Visual Feedback Demo", true);

// Create checkbox with visual feedback
const mainCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Enable Visual Effects")
    .checked(false)
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        updateVisualState(checkBox.isChecked());
    }))
    .build();

// Status display
const statusDisplay = screen.addText(10, 60, "Status: Disabled", 0xFF0000);
const effectDisplay = screen.addText(10, 80, "Effects: None", 0x808080);

function updateVisualState(enabled) {
    if (enabled) {
        statusDisplay.setText("Status: Enabled").setColor(0x00FF00);
        effectDisplay.setText("Effects: Active").setColor(0x00FFFF);

        // Enable other checkboxes
        particleCheckbox.setActive(true);
        soundCheckbox.setActive(true);
        animationCheckbox.setActive(true);
    } else {
        statusDisplay.setText("Status: Disabled").setColor(0xFF0000);
        effectDisplay.setText("Effects: None").setColor(0x808080);

        // Disable other checkboxes
        particleCheckbox.setChecked(false);
        soundCheckbox.setChecked(false);
        animationCheckbox.setChecked(false);

        particleCheckbox.setActive(false);
        soundCheckbox.setActive(false);
        animationCheckbox.setActive(false);
    }
}

// Dependent checkboxes (initially disabled)
const particleCheckbox = screen.checkBoxBuilder()
    .pos(20, 110)
    .size(180, 18)
    .message("Particle Effects")
    .checked(false)
    .active(false)
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Particles: ${cb.isChecked() ? "ON" : "OFF"}`);
    }))
    .build();

const soundCheckbox = screen.checkBoxBuilder()
    .pos(20, 135)
    .size(180, 18)
    .message("Sound Effects")
    .checked(false)
    .active(false)
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Sounds: ${cb.isChecked() ? "ON" : "OFF"}`);
    }))
    .build();

const animationCheckbox = screen.checkBoxBuilder()
    .pos(20, 160)
    .size(180, 18)
    .message("Animations")
    .checked(false)
    .active(false)
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Animations: ${cb.isChecked() ? "ON" : "OFF"}`);
    }))
    .build();

// Close button
screen.addButton(10, 200, 190, 20, "Close",
    JavaWrapper.methodToJavaAsync(() => {
        screen.close();
    })
);

Hud.openScreen(screen);
```

## Common Use Cases and Patterns

## Integration with Other UI Elements

CheckBoxWidgetHelper works seamlessly with other JSMacros UI components:

### With Text Display
```js
const checkbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Show Debug Info")
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        debugText.setVisible(cb.isChecked());
    }))
    .build();

const debugText = screen.addText(10, 60, "Debug information here", 0x00FF00);
debugText.setVisible(false); // Initially hidden
```

### With Buttons
```js
const checkbox = screen.addCheckbox(10, 30, 200, 20, "Enable Action", false);
const actionButton = screen.addButton(10, 60, 100, 20, "Perform Action",
    JavaWrapper.methodToJavaAsync(() => {
        if (checkbox.isChecked()) {
            Chat.log("Action performed!");
        } else {
            Chat.log("Please enable the checkbox first");
        }
    })
);
```

### With Other Input Elements
```js
const enableFieldCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Enable Custom Input")
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        textField.setActive(cb.isChecked());
        slider.setActive(cb.isChecked());
    }))
    .build();

const textField = screen.addTextField(10, 60, 200, 20, "Enter value...");
const slider = screen.addSlider(10, 90, 200, 20, 0, 100, 50);

// Initially disable input elements
textField.setActive(false);
slider.setActive(false);
```

## Best Practices

1. **Use Descriptive Labels:** Make checkbox labels clear and concise about what they control
2. **Provide Tooltips:** Use tooltips to explain complex or risky settings
3. **Handle Dependencies:** Implement proper enable/disable logic for dependent checkboxes
4. **Validate Inputs:** For critical settings, consider adding confirmation dialogs
5. **Persist Settings:** Save checkbox states to storage for persistence between sessions
6. **Group Related Options:** Use visual grouping or sections for related checkboxes
7. **Provide Default States:** Set sensible default values for all checkboxes
8. **Consider Performance:** For large numbers of checkboxes, consider pagination or filtering

## Common Pitfalls to Avoid

1. **Callback Exceptions:** Always wrap callback code in try-catch blocks
2. **State Synchronization:** Ensure checkbox state matches actual feature state
3. **Memory Leaks:** Remove callbacks when closing screens if needed
4. **Thread Safety:** Use proper threading for operations that access game state
5. **Infinite Loops:** Avoid setting checkbox state within callbacks that could trigger recursion

## Related Classes

- `ClickableWidgetHelper` - Parent class providing base widget functionality
- `IScreen` - Screen interface for adding checkboxes to custom screens
- `TextHelper` - Text formatting and management
- `MethodWrapper` - Java method wrapping for callbacks
- `ButtonWidgetHelper` - Button widget companion
- `TextFieldWidgetHelper` - Text input widget companion
- `CheckBoxWidgetHelper.CheckBoxBuilder` - Builder for creating checkboxes with fluent API

## Version History

- **1.8.4:** Initial release with basic checkbox functionality and builder pattern
- **Current:** Enhanced with comprehensive widget features and improved integration

