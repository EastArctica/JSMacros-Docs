# CheckBoxWidgetHelper.CheckBoxBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.CheckBoxWidgetHelper.CheckBoxBuilder`

**Extends:** `AbstractWidgetBuilder<CheckBoxBuilder, CheckboxWidget, CheckBoxWidgetHelper>`

**Since:** JsMacros 1.8.4

The `CheckBoxWidgetHelper.CheckBoxBuilder` class provides a fluent builder API for creating and configuring checkbox widgets in JSMacros custom screens. This builder offers method chaining for easy configuration of checkbox properties including position, size, text label, initial state, action callbacks, and common widget properties. CheckBox widgets are interactive UI elements that can be checked or unchecked by users, making them ideal for boolean settings, toggle options, and user preferences.

## Overview

The `CheckBoxBuilder` class simplifies the creation of checkbox widgets with:

- **Fluent Builder Pattern**: Method chaining for readable, sequential configuration
- **Position and Sizing**: Flexible widget positioning and dimension control
- **Text Labels**: Custom checkbox text with support for TextHelper objects
- **Initial State Control**: Set whether the checkbox starts checked or unchecked
- **Action Callbacks**: Define functions to execute when checkbox state changes
- **Widget Properties**: Inherited features like z-index, visibility, alpha transparency
- **Error Handling**: Safe callback execution with proper error logging

## Constructor

### `new CheckBoxBuilder(screen)`
Creates a new CheckBoxBuilder instance associated with the specified screen. This constructor is typically called internally by screen methods and not directly instantiated by users.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| screen | IScreen | The screen this checkbox will be added to |

**Usage:**
CheckBoxBuilder instances are obtained through screen methods:
```javascript
// Method 1: Default unchecked checkbox
const builder1 = screen.checkBoxBuilder();

// Method 2: Pre-checked checkbox
const builder2 = screen.checkBoxBuilder(true);
```

## Methods

### `isChecked()`
Returns whether the checkbox will be initially checked when created.

**Returns:** `boolean` - `true` if the checkbox will be checked, `false` otherwise

**Example:**
```javascript
const builder = screen.checkBoxBuilder(true);
if (builder.isChecked()) {
    Chat.log("Checkbox will be initially checked");
}
```

### `checked(checked)`
Sets whether the checkbox should be initially checked when created.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| checked | boolean | `true` to make the checkbox initially checked, `false` for unchecked |

**Returns:** `CheckBoxBuilder` - Returns this builder instance for method chaining

**Example:**
```javascript
const builder = screen.checkBoxBuilder()
    .checked(true)  // Start in checked state
    .message("Enable Notifications");
```

### `getAction()`
Returns the current action callback that will be executed when the checkbox is clicked.

**Returns:** `MethodWrapper<CheckBoxWidgetHelper, IScreen, Object, ?>` - The current action callback, or `null` if none set

**Example:**
```javascript
const builder = screen.checkBoxBuilder();
const action = builder.getAction();
if (action) {
    Chat.log("Builder has an action callback set");
}
```

### `action(action)`
Sets the action callback that will be executed when the checkbox is clicked.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| action | MethodWrapper<CheckBoxWidgetHelper, IScreen, Object, ?> | The callback function to execute when clicked, or `null` to remove |

**Returns:** `CheckBoxBuilder` - Returns this builder instance for method chaining

**Example:**
```javascript
const builder = screen.checkBoxBuilder()
    .action(JavaWrapper.methodToJavaAsync((checkBox, screen) => {
        Chat.log(`Checkbox state changed to: ${checkBox.isChecked()}`);
    }));
```

### Inherited Methods from AbstractWidgetBuilder

The CheckBoxBuilder inherits many configuration methods from AbstractWidgetBuilder:

#### Position and Size Methods
- `pos(x, y)` - Set the position (x, y coordinates)
- `x(x)` - Set the x position only
- `y(y)` - Set the y position only
- `size(width, height)` - Set both width and height
- `width(width)` - Set the width only
- `height(height)` - Set the height only

#### Text and Message Methods
- `message(text)` - Set the checkbox label text
- `message(textHelper)` - Set the label using a TextHelper object

#### Widget Properties
- `zIndex(index)` - Set the rendering order
- `active(active)` - Set whether the widget is interactive
- `visible(visible)` - Set whether the widget is visible
- `alpha(alpha)` - Set the transparency (0.0 to 1.0)

#### Tooltip Methods
- `tooltip(text)` - Add a tooltip
- `addTooltip(text)` - Add additional tooltips

#### Build Methods
- `build()` - Create and add the checkbox to the screen
- `createWidget()` - Create the checkbox without adding to screen

## Usage Examples

### Basic Checkbox Creation

```javascript
const screen = Hud.createScreen("Settings", true);

// Create a simple checkbox
const autoSaveCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)                    // Position at x=10, y=30
    .size(200, 20)                  // Width=200, Height=20
    .message("Auto-Save")           // Label text
    .checked(false)                 // Start unchecked
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-save ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();                       // Create and add to screen

Hud.openScreen(screen);
```

### Checkbox with Initial State

```javascript
const screen = Hud.createScreen("Preferences", true);

// Create a pre-checked checkbox
const notificationsCheckbox = screen.checkBoxBuilder(true)  // Start checked
    .pos(10, 30)
    .size(200, 20)
    .message("Enable Notifications")
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        const status = checkBox.isChecked() ? "enabled" : "disabled";
        Chat.log(`Notifications ${status}`);
    }))
    .build();

Hud.openScreen(screen);
```

### Checkbox with Custom Styling

```javascript
const screen = Hud.createScreen("Styled UI", true);

// Create a styled checkbox
const styledCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(250, 20)
    .message(Chat.createTextHelperFromString("&6&lPremium Feature"))
    .checked(false)
    .zIndex(1)                      // Render order
    .alpha(1.0)                     // Fully opaque
    .active(true)                   // Interactive
    .visible(true)                  // Visible
    .tooltip("Enable premium features")
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        if (checkBox.isChecked()) {
            Chat.log("&aPremium features activated!");
        } else {
            Chat.log("&7Premium features deactivated");
        }
    }))
    .build();

Hud.openScreen(screen);
```

### Multiple Checkboxes with Dependencies

```javascript
const screen = Hud.createScreen("Feature Settings", true);

// Main feature checkbox
const mainFeatureCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Enable Advanced Features")
    .checked(false)
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        // Enable/disable dependent checkboxes
        const enabled = checkBox.isChecked();
        subFeature1.setActive(enabled);
        subFeature2.setActive(enabled);
        subFeature3.setActive(enabled);

        if (!enabled) {
            // Uncheck all sub-features when main is disabled
            subFeature1.setChecked(false);
            subFeature2.setChecked(false);
            subFeature3.setChecked(false);
        }

        Chat.log(`Advanced features ${enabled ? "enabled" : "disabled"}`);
    }))
    .build();

// Sub-feature checkboxes (initially disabled)
const subFeature1 = screen.checkBoxBuilder()
    .pos(20, 60)
    .size(180, 18)
    .message("Auto-Crafting")
    .checked(false)
    .active(false)  // Initially disabled
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-crafting ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

const subFeature2 = screen.checkBoxBuilder()
    .pos(20, 85)
    .size(180, 18)
    .message("Auto-Sorting")
    .checked(false)
    .active(false)  // Initially disabled
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-sorting ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

const subFeature3 = screen.checkBoxBuilder()
    .pos(20, 110)
    .size(180, 18)
    .message("Auto-Repairing")
    .checked(false)
    .active(false)  // Initially disabled
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        Chat.log(`Auto-repairing ${checkBox.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

Hud.openScreen(screen);
```

### Checkbox with Complex Action Logic

```javascript
const screen = Hud.createScreen("Complex Actions", true);

// Checkbox with validation and multiple actions
const validateBeforeSaveCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Save with Validation")
    .checked(false)
    .action(JavaWrapper.methodToJavaAsync((checkBox, screenInstance) => {
        const enabled = checkBox.isChecked();

        if (enabled) {
            // Validation logic before enabling
            const player = Player.getPlayer();
            if (!player) {
                Chat.log("&cCannot enable: No active player");
                checkBox.setChecked(false);  // Revert change
                return;
            }

            const inventory = player.getInventory();
            if (inventory && inventory.getEmptySlots() < 5) {
                Chat.log("&cCannot enable: Need at least 5 empty inventory slots");
                checkBox.setChecked(false);  // Revert change
                return;
            }

            Chat.log("&aValidation passed! Feature enabled");

            // Additional actions
            updateUIState(true);
            saveSettings(true);
        } else {
            Chat.log("&7Feature disabled");
            updateUIState(false);
            saveSettings(false);
        }
    }))
    .build();

function updateUIState(enabled) {
    // Update other UI elements based on checkbox state
    // This could involve showing/hiding other widgets
}

function saveSettings(enabled) {
    // Save the setting to persistent storage
    // This could involve file I/O or configuration updates
}

Hud.openScreen(screen);
```

### Checkbox with Conditional Visibility

```javascript
const screen = Hud.createScreen("Dynamic Interface", true);

// Control checkbox
const showAdvancedCheckbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Show Advanced Options")
    .checked(false)
    .action(JavaWrapper.methodToJavaAsync((checkBox) => {
        const showAdvanced = checkBox.isChecked();

        // Show/hide advanced checkboxes
        advancedOption1.setVisible(showAdvanced);
        advancedOption2.setVisible(showAdvanced);
        advancedOption3.setVisible(showAdvanced);

        // Adjust screen layout if needed
        if (showAdvanced) {
            Chat.log("&aAdvanced options revealed");
        } else {
            Chat.log("&7Advanced options hidden");
        }
    }))
    .build();

// Advanced options (initially hidden)
const advancedOption1 = screen.checkBoxBuilder()
    .pos(20, 60)
    .size(180, 18)
    .message("Debug Mode")
    .checked(false)
    .visible(false)  // Initially hidden
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Debug mode ${cb.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

const advancedOption2 = screen.checkBoxBuilder()
    .pos(20, 85)
    .size(180, 18)
    .message("Verbose Logging")
    .checked(false)
    .visible(false)  // Initially hidden
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Verbose logging ${cb.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

const advancedOption3 = screen.checkBoxBuilder()
    .pos(20, 110)
    .size(180, 18)
    .message("Developer Mode")
    .checked(false)
    .visible(false)  // Initially hidden
    .action(JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Developer mode ${cb.isChecked() ? "enabled" : "disabled"}`);
    }))
    .build();

Hud.openScreen(screen);
```

### Checkbox Group Management

```javascript
const screen = Hud.createScreen("Checkbox Groups", true);

let checkboxes = [];
const categories = ["Mining", "Building", "Combat", "Farming"];

// Create checkbox groups
for (let i = 0; i < categories.length; i++) {
    const category = categories[i];

    // Category header
    screen.addText(10, 30 + i * 80, category.toUpperCase() + ":", 0xFFFF00);

    // Category checkboxes
    for (let j = 0; j < 3; j++) {
        const checkbox = screen.checkBoxBuilder()
            .pos(20, 55 + i * 80 + j * 25)
            .size(180, 18)
            .message(`${category} Option ${j + 1}`)
            .checked(Math.random() > 0.5)
            .action(JavaWrapper.methodToJavaAsync((cb) => {
                updateCategoryStatus(category);
            }))
            .build();

        checkboxes.push({ category, checkbox });
    }
}

function updateCategoryStatus(targetCategory) {
    const categoryCheckboxes = checkboxes.filter(item => item.category === targetCategory);
    const checkedCount = categoryCheckboxes.filter(item => item.checkbox.isChecked()).length;
    const totalCount = categoryCheckboxes.length;

    Chat.log(`${targetCategory}: ${checkedCount}/${totalCount} options enabled`);
}

// Control buttons
const enableAllButton = screen.addButton()
    .pos(10, 350)
    .width(100)
    .height(20)
    .message("Enable All")
    .action(JavaWrapper.methodToJavaAsync(() => {
        checkboxes.forEach(item => item.checkbox.setChecked(true));
        checkboxes.forEach(item => updateCategoryStatus(item.category));
    }))
    .build();

const disableAllButton = screen.addButton()
    .pos(120, 350)
    .width(100)
    .height(20)
    .message("Disable All")
    .action(JavaWrapper.methodToJavaAsync(() => {
        checkboxes.forEach(item => item.checkbox.setChecked(false));
        checkboxes.forEach(item => updateCategoryStatus(item.category));
    }))
    .build();

Hud.openScreen(screen);
```

## Integration with Other UI Elements

### With Text Display Feedback

```javascript
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

```javascript
const checkbox = screen.checkBoxBuilder()
    .pos(10, 30)
    .size(200, 20)
    .message("Enable Action", false)
    .build();

const actionButton = screen.addButton()
    .pos(10, 60)
    .width(100)
    .height(20)
    .message("Perform Action")
    .action(JavaWrapper.methodToJavaAsync(() => {
        if (checkbox.isChecked()) {
            Chat.log("Action performed!");
        } else {
            Chat.log("Please enable the checkbox first");
        }
    }))
    .build();
```

### With Other Input Elements

```javascript
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

1. **Descriptive Labels**: Use clear, concise text that explains what the checkbox controls
2. **Default States**: Set sensible default values based on user preferences or safety considerations
3. **Action Validation**: Validate conditions in action callbacks and revert changes if needed
4. **Error Handling**: Wrap action code in try-catch blocks for robust error handling
5. **State Consistency**: Ensure checkbox state matches the actual feature state
6. **User Feedback**: Provide immediate feedback through chat messages or UI updates
7. **Dependencies**: Handle dependent checkbox states properly (enable/disable related checkboxes)
8. **Performance**: Keep action callbacks lightweight to avoid UI lag

## Common Pitfalls to Avoid

1. **Callback Exceptions**: Always wrap callback code in try-catch blocks
2. **State Synchronization**: Ensure checkbox state matches actual feature state
3. **Memory Leaks**: Remove callbacks when closing screens if needed
4. **Thread Safety**: Use proper threading for operations that access game state
5. **Infinite Loops**: Avoid setting checkbox state within callbacks that could trigger recursion

## Related Classes

- `CheckBoxWidgetHelper` - The resulting checkbox widget type
- `AbstractWidgetBuilder` - Parent class providing common builder functionality
- `ClickableWidgetHelper` - Base class for clickable widgets
- `IScreen` - Screen interface for creating and managing checkboxes
- `TextHelper` - Text formatting for checkbox labels
- `MethodWrapper` - Java method wrapping for action callbacks

## Version History

- **1.8.4:** Initial release with basic checkbox builder functionality
- **Current:** Enhanced with comprehensive widget features and improved integration

## Important Notes

1. **Action Execution**: Actions are executed asynchronously and should handle errors gracefully
2. **State Changes**: The checkbox state changes before the action is called
3. **Thread Safety**: Actions are executed safely but should avoid blocking operations
4. **Memory Management**: Actions are automatically cleaned up when the screen is closed
5. **Widget Lifecycle**: Checkboxes exist for the lifetime of the screen or until explicitly removed
6. **Visual Feedback**: The checkbox visually animates when clicked, providing immediate user feedback
7. **Keyboard Navigation**: Checkboxes can be focused and toggled using keyboard controls
8. **Screen Boundaries**: Checkboxes are automatically clipped to screen boundaries