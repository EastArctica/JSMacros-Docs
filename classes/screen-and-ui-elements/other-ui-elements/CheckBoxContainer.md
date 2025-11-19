# CheckBoxContainer

**Full Class Name:** `xyz.wagyourtail.wagyourgui.containers.CheckBoxContainer`

**Extends:** `MultiElementContainer<IContainerParent>`

**Implements:** `IContainerParent`

The `CheckBoxContainer` class is a UI container component that combines a checkbox button with an associated text message. It provides a complete checkbox input component with click interaction handling, state management, and callback support. CheckBoxContainer is designed for use within custom screen layouts and UI systems where you need checkbox elements with descriptive text labels.

## Overview

The `CheckBoxContainer` class provides a complete checkbox interface including:
- Interactive checkbox button with visual check/uncheck states
- Integrated text message/label displayed alongside the checkbox
- Click event handling with optional state change callbacks
- Position and size management within parent containers
- Visibility control for show/hide functionality
- Integration with the wagyourgui container system

## Class Hierarchy

```
IContainerParent (interface)
    ↑
MultiElementContainer<IContainerParent> (abstract class)
    ↑
CheckBoxContainer (concrete class)
```

## Constructors

### `new CheckBoxContainer(x, y, width, height, textRenderer, defaultState, message, parent, setState)`
Creates a new CheckBoxContainer with specified position, size, appearance, and behavior.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | int | X coordinate of the container's top-left corner |
| y | int | Y coordinate of the container's top-left corner |
| width | int | Width of the container in pixels |
| height | int | Height of the container in pixels |
| textRenderer | TextRenderer | Minecraft text renderer for drawing text |
| defaultState | boolean | Initial checked state of the checkbox |
| message | Text | Text message/label to display next to the checkbox |
| parent | IContainerParent | Parent container that manages this container |
| setState | Consumer\<Boolean\> | Callback function called when checkbox state changes (optional) |

**Example:**
```js
// Note: This is a low-level class typically used by UI builders
// Most users should use IScreen.addCheckbox() or CheckBoxWidgetHelper instead
const textRenderer = client.getTextRenderer();
const parent = screen; // Assuming screen implements IContainerParent

const checkboxContainer = new CheckBoxContainer(
    10,      // x
    20,      // y
    200,     // width
    20,      // height
    textRenderer,
    false,   // defaultState (unchecked)
    Chat.createTextHelperFromString("Enable Feature").getText(),
    parent,
    JavaWrapper.methodToJavaAsync((newState) => {
        Chat.log(`Checkbox state changed to: ${newState}`);
    })
);
```

## Fields

### Inherited Fields from MultiElementContainer

## Methods

## Inherited Methods from MultiElementContainer

### Visibility Management

### Child Element Management

### Overlay Management

## Usage Examples

### Basic CheckBoxContainer Creation

```js
// Create a simple checkbox container
const screen = Hud.createScreen("CheckBoxContainer Demo", true);
const textRenderer = client.getTextRenderer();

// Create checkbox container with callback
const checkboxContainer = new CheckBoxContainer(
    10, 30, 200, 20,
    textRenderer,
    false,  // Initially unchecked
    Chat.createTextHelperFromString("Enable Auto-Save").getText(),
    screen,  // Parent container
    JavaWrapper.methodToJavaAsync((newState) => {
        Chat.log(`Auto-save ${newState ? "enabled" : "disabled"}`);
    })
);

// Add to screen (implementation depends on parent container)
screen.addDrawableChild(checkboxContainer);

Hud.openScreen(screen);
```

### CheckBoxContainer with State Management

```js
const screen = Hud.createScreen("Settings Panel", true);
const textRenderer = client.getTextRenderer();

// Store checkbox states
const settings = {
    autoSave: false,
    notifications: true,
    debugMode: false
};

// Auto-save checkbox
const autoSaveCheckbox = new CheckBoxContainer(
    10, 30, 200, 20,
    textRenderer,
    settings.autoSave,
    Chat.createTextHelperFromString("Auto-Save").getText(),
    screen,
    JavaWrapper.methodToJavaAsync((newState) => {
        settings.autoSave = newState;
        Chat.log(`Auto-save: ${newState ? "ON" : "OFF"}`);
        updateDependencies();
    })
);

// Notifications checkbox
const notificationsCheckbox = new CheckBoxContainer(
    10, 60, 200, 20,
    textRenderer,
    settings.notifications,
    Chat.createTextHelperFromString("Notifications").getText(),
    screen,
    JavaWrapper.methodToJavaAsync((newState) => {
        settings.notifications = newState;
        Chat.log(`Notifications: ${newState ? "Enabled" : "Disabled"}`);
    })
);

// Debug mode checkbox
const debugCheckbox = new CheckBoxContainer(
    10, 90, 200, 20,
    textRenderer,
    settings.debugMode,
    Chat.createTextHelperFromString("Debug Mode").getText(),
    screen,
    JavaWrapper.methodToJavaAsync((newState) => {
        settings.debugMode = newState;
        Chat.log(`Debug mode: ${newState ? "ENABLED" : "DISABLED"}`);
    })
);

function updateDependencies() {
    // Example dependency logic
    if (!settings.autoSave && settings.debugMode) {
        debugCheckbox.state = false;
        Chat.log("Debug mode requires auto-save to be enabled");
    }
}

// Add checkboxes to screen
screen.addDrawableChild(autoSaveCheckbox);
screen.addDrawableChild(notificationsCheckbox);
screen.addDrawableChild(debugCheckbox);

// Status display
const statusText = screen.addText(10, 130, "Settings loaded", 0xFFFFFF);

Hud.openScreen(screen);
```

### Dynamic CheckBoxContainer Management

```js
const screen = Hud.createScreen("Dynamic Checkboxes", true);
const textRenderer = client.getTextRenderer();

let checkboxContainers = [];
const options = [
    "Option A",
    "Option B",
    "Option C",
    "Option D",
    "Option E"
];

// Create checkbox containers dynamically
function createCheckboxes() {
    // Clear existing containers
    checkboxContainers.forEach(container => screen.remove(container));
    checkboxContainers = [];

    // Create new checkboxes
    options.forEach((option, index) => {
        const container = new CheckBoxContainer(
            10, 30 + index * 25, 200, 20,
            textRenderer,
            Math.random() > 0.5,  // Random initial state
            Chat.createTextHelperFromString(option).getText(),
            screen,
            JavaWrapper.methodToJavaAsync((newState) => {
                Chat.log(`${option}: ${newState ? "Checked" : "Unchecked"}`);
                updateSummary();
            })
        );

        checkboxContainers.push(container);
        screen.addDrawableChild(container);
    });

    updateSummary();
}

function updateSummary() {
    const checkedCount = checkboxContainers.filter(container => container.state).length;
    const totalCount = checkboxContainers.length;

    // Update summary text (implementation depends on screen type)
    Chat.log(`${checkedCount} of ${totalCount} options selected`);
}

// Control buttons
const refreshButton = screen.addButton(10, 180, 100, 20, "Refresh",
    JavaWrapper.methodToJavaAsync(() => {
        createCheckboxes();
    })
);

const toggleAllButton = screen.addButton(120, 180, 100, 20, "Toggle All",
    JavaWrapper.methodToJavaAsync(() => {
        const allChecked = checkboxContainers.every(container => container.state);
        checkboxContainers.forEach(container => {
            container.state = !allChecked;
        });
        updateSummary();
    })
);

// Initialize checkboxes
createCheckboxes();

Hud.openScreen(screen);
```

### CheckBoxContainer with Visual Styling

```js
const screen = Hud.createScreen("Styled Checkboxes", true);
const textRenderer = client.getTextRenderer();

// Create checkboxes with different styling configurations
const basicCheckbox = new CheckBoxContainer(
    10, 30, 200, 20,
    textRenderer,
    false,
    Chat.createTextHelperFromString("Basic Option").getText(),
    screen,
    JavaWrapper.methodToJavaAsync((state) => {
        Chat.log(`Basic option: ${state}`);
    })
);

const coloredCheckbox = new CheckBoxContainer(
    10, 60, 200, 20,
    textRenderer,
    true,
    Chat.createTextHelperFromString("&aColored Option").getText(),  // Green text
    screen,
    JavaWrapper.methodToJavaAsync((state) => {
        Chat.log(`Colored option: ${state}`);
    })
);

const longTextCheckbox = new CheckBoxContainer(
    10, 90, 300, 20,
    textRenderer,
    false,
    Chat.createTextHelperFromString("This is a very long checkbox label that demonstrates text wrapping").getText(),
    screen,
    JavaWrapper.methodToJavaAsync((state) => {
        Chat.log(`Long text option: ${state}`);
    })
);

// Position and size management demonstration
const resizeButton = screen.addButton(10, 130, 150, 20, "Resize Checkboxes",
    JavaWrapper.methodToJavaAsync(() => {
        // Toggle between compact and spacious layouts
        if (longTextCheckbox.width === 300) {
            // Make compact
            [basicCheckbox, coloredCheckbox, longTextCheckbox].forEach((container, index) => {
                container.setPos(10, 30 + index * 25, 200, 18);
            });
        } else {
            // Make spacious
            [basicCheckbox, coloredCheckbox, longTextCheckbox].forEach((container, index) => {
                container.setPos(10, 30 + index * 35, 300, 25);
            });
        }
    })
);

// Visibility toggle demonstration
const toggleVisibilityButton = screen.addButton(170, 130, 150, 20, "Toggle Visibility",
    JavaWrapper.methodToJavaAsync(() => {
        const currentState = basicCheckbox.getVisible();
        [basicCheckbox, coloredCheckbox, longTextCheckbox].forEach(container => {
            container.setVisible(!currentState);
        });
    })
);

// Add all containers to screen
screen.addDrawableChild(basicCheckbox);
screen.addDrawableChild(coloredCheckbox);
screen.addDrawableChild(longTextCheckbox);

Hud.openScreen(screen);
```

### CheckBoxContainer in Form Layout

```js
const screen = Hud.createScreen("User Preferences", true);
const textRenderer = client.getTextRenderer();

// Form title
screen.addText(10, 10, "User Preferences", 0xFFFFFF);

// Preference categories
const preferences = [
    {
        category: "General",
        options: [
            { key: "startup", label: "Launch on startup", default: false },
            { key: "updates", label: "Check for updates", default: true },
            { key: "crashReports", label: "Send crash reports", default: true }
        ]
    },
    {
        category: "Privacy",
        options: [
            { key: "analytics", label: "Share usage analytics", default: false },
            { key: "telemetry", label: "Send diagnostic data", default: false },
            { key: "statistics", label: "Collect statistics", default: true }
        ]
    }
];

const preferenceContainers = [];
let yOffset = 40;

// Create checkboxes for each preference
preferences.forEach(prefCategory => {
    // Category header
    screen.addText(10, yOffset, prefCategory.category + ":", 0xFFFF00);
    yOffset += 25;

    prefCategory.options.forEach(option => {
        const container = new CheckBoxContainer(
            20, yOffset, 250, 20,
            textRenderer,
            option.default,
            Chat.createTextHelperFromString(option.label).getText(),
            screen,
            JavaWrapper.methodToJavaAsync((newState) => {
                Chat.log(`${prefCategory.category}.${option.key}: ${newState ? "Enabled" : "Disabled"}`);
                validatePreferences();
            })
        );

        preferenceContainers.push(container);
        screen.addDrawableChild(container);
        yOffset += 25;
    });

    yOffset += 15; // Spacing between categories
});

function validatePreferences() {
    // Example validation logic
    const analyticsEnabled = preferenceContainers[3].state;
    const telemetryEnabled = preferenceContainers[4].state;

    if (telemetryEnabled && !analyticsEnabled) {
        Chat.log("Warning: Telemetry requires analytics to be enabled");
    }
}

// Form action buttons
const saveButton = screen.addButton(10, yOffset, 100, 20, "Save",
    JavaWrapper.methodToJavaAsync(() => {
        Chat.log("Preferences saved successfully!");
        screen.close();
    })
);

const resetButton = screen.addButton(120, yOffset, 100, 20, "Reset to Defaults",
    JavaWrapper.methodToJavaAsync(() => {
        preferenceContainers.forEach((container, index) => {
            // Reset to default values
            const option = preferences[Math.floor(index / 3)].options[index % 3];
            container.state = option.default;
        });
        Chat.log("Preferences reset to defaults");
    })
);

const cancelButton = screen.addButton(230, yOffset, 100, 20, "Cancel",
    JavaWrapper.methodToJavaAsync(() => {
        screen.close();
    })
);

Hud.openScreen(screen);
```

## Integration with UI Systems

### Using with Custom Screen Containers

```js
// CheckBoxContainer is designed to work with container-based UI systems
class CustomSettingsScreen {
    constructor() {
        this.screen = Hud.createScreen("Custom Settings", true);
        this.textRenderer = client.getTextRenderer();
        this.containers = [];
        this.init();
    }

    init() {
        this.createCheckboxes();
        this.createButtons();
        Hud.openScreen(this.screen);
    }

    createCheckboxes() {
        const settings = [
            { id: "sound", label: "Enable Sound Effects", default: true },
            { id: "music", label: "Enable Background Music", default: true },
            { id: "particles", label: "Show Particle Effects", default: false },
            { id: "animations", label: "Enable UI Animations", default: true }
        ];

        settings.forEach((setting, index) => {
            const container = new CheckBoxContainer(
                10, 30 + index * 30, 250, 25,
                this.textRenderer,
                setting.default,
                Chat.createTextHelperFromString(setting.label).getText(),
                this.screen,
                JavaWrapper.methodToJavaAsync((newState) => {
                    this.onSettingChange(setting.id, newState);
                })
            );

            this.containers.push(container);
            this.screen.addDrawableChild(container);
        });
    }

    createButtons() {
        this.screen.addButton(10, 160, 100, 20, "Apply",
            JavaWrapper.methodToJavaAsync(() => {
                this.applySettings();
            })
        );

        this.screen.addButton(120, 160, 100, 20, "Reset",
            JavaWrapper.methodToJavaAsync(() => {
                this.resetSettings();
            })
        );
    }

    onSettingChange(settingId, newState) {
        Chat.log(`Setting ${settingId} changed to: ${newState}`);

        // Handle setting dependencies
        if (settingId === "sound" && !newState) {
            // If sound is disabled, disable music too
            const musicContainer = this.containers.find(c => c.message.getString().includes("Background Music"));
            if (musicContainer && musicContainer.state) {
                musicContainer.state = false;
                Chat.log("Music automatically disabled when sound is off");
            }
        }
    }

    applySettings() {
        const settings = {};
        this.containers.forEach(container => {
            const label = container.message.getString();
            const settingId = label.toLowerCase().replace(/\s+/g, '_');
            settings[settingId] = container.state;
        });

        // Save settings to storage
        File.write("settings.json", JSON.stringify(settings));
        Chat.log("Settings applied and saved!");
        this.screen.close();
    }

    resetSettings() {
        // Reset all checkboxes to default values
        const defaults = [true, true, false, true];
        this.containers.forEach((container, index) => {
            container.state = defaults[index];
        });
        Chat.log("Settings reset to defaults");
    }
}

// Usage
const customScreen = new CustomSettingsScreen();
```

## Best Practices

## Common Pitfalls to Avoid

## Related Classes

- `MultiElementContainer<IContainerParent>` - Parent class providing container functionality
- `IContainerParent` - Interface for container parent management
- `Button` - Internal button widget used for the checkbox
- `Text` - Minecraft text component for labels
- `TextRenderer` - Minecraft text rendering system
- `ClickButtonWidget` - Button widget used for the checkbox element
- `IScreen` - High-level screen interface (preferred for checkbox creation)

## Version History

- **Initial Release:** Basic checkbox container functionality with state management
- **Enhanced Versions:** Improved text rendering, layout management, and callback handling
- **Current:** Full integration with wagyourgui container system

## Note for Developers

While `CheckBoxContainer` provides low-level control over checkbox creation and management, most JSMacros users should prefer using the higher-level `CheckBoxWidgetHelper` class or `IScreen.addCheckbox()` method for simpler checkbox creation. The `CheckBoxContainer` class is primarily intended for:

1. Custom UI framework development
2. Complex layout requirements
3. Advanced styling and behavior customization
4. Integration with existing container-based UI systems

For most use cases, the higher-level abstractions provide a simpler and more maintainable API while still offering the necessary functionality for checkbox creation and management.