# TextFieldWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.TextFieldWidgetHelper`

**Extends:** `ClickableWidgetHelper<TextFieldWidgetHelper, TextFieldWidget>`

**Implements:** `RenderElement`, `Alignable<TextFieldWidgetHelper>`

**Since:** JsMacros 1.0.5

The `TextFieldWidgetHelper` class provides a wrapper for Minecraft's text input widget, allowing script writers to create and manage text input fields in custom screens and UIs. This widget supports text input, editing, selection, validation, and various visual customization options. It's commonly used for creating forms, chat inputs, search boxes, and configuration fields in custom interfaces.

## Overview

The `TextFieldWidgetHelper` class provides comprehensive text input functionality including:

- Text input and editing with full cursor control
- Text selection and manipulation
- Input validation and filtering
- Visual customization with colors and suggestions
- Editable/read-only modes
- Maximum length constraints
- Change event callbacks
- Tooltip support
- Keyboard navigation and text editing shortcuts

## Constructors

### `new TextFieldWidgetHelper(textFieldWidget)`
Creates a helper for an existing TextFieldWidget.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| textFieldWidget | TextFieldWidget | The underlying Minecraft text field widget |

**Example:**
```js
// Typically used with builder pattern rather than direct construction
```

### `new TextFieldWidgetHelper(textFieldWidget, zIndex)`
Creates a helper for an existing TextFieldWidget with a specific z-index.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| textFieldWidget | TextFieldWidget | The underlying Minecraft text field widget |
| zIndex | int | The z-index for rendering order |

## Fields

## Methods

## Inherited Methods

### Position and Size Methods
- `getX()` - Get X coordinate
- `getY()` - Get Y coordinate
- `setPos(x, y)` - Set position
- `getWidth()` - Get width
- `getHeight()` - Get height
- `setWidth(width)` - Set width

### Interaction Methods
- `getActive()` - Get active state
- `setActive(active)` - Set active state
- `click()` - Click the text field
- `click(await)` - Click with thread synchronization

### Tooltip Methods
- `setTooltip(...tooltips)` - Set tooltips
- `addTooltip(tooltip)` - Add tooltip
- `removeTooltip(index)` - Remove tooltip by index
- `removeTooltip(tooltip)` - Remove tooltip by object
- `getTooltips()` - Get all tooltips

## Builder Class: TextFieldBuilder

The `TextFieldBuilder` class provides a fluent API for creating text fields. It's the recommended way to create new text field widgets.

### Constructor
```js
// Builder is typically obtained from IScreen
const builder = screen.textField();
```

### Builder Methods

### Inherited Builder Methods

The TextFieldBuilder also inherits all methods from AbstractWidgetBuilder:

#### Position and Size
- `x(x)` - Set X position
- `y(y)` - Set Y position
- `pos(x, y)` - Set both positions
- `width(width)` - Set width
- `height(height)` - Set height
- `size(width, height)` - Set both dimensions
- `zIndex(zIndex)` - Set z-index

#### Appearance
- `message(text)` - Set label/message
- `active(active)` - Set active state
- `visible(visible)` - Set visibility
- `alpha(alpha)` - Set transparency (0.0-1.0)

#### Finalization
- `build()` - Create and add the widget to screen

## Usage Examples

### Basic Text Field Creation
```js
// Create a screen and add a basic text field
const screen = Hud.createScreen("My Screen", true);

const textField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Name:")
    .suggestion("Enter your name")
    .build();

screen.addInitListener(JavaWrapper.methodToJava(() => {
    Chat.log("Screen initialized with text field");
}));

Hud.openScreen(screen);
```

### Text Field with Validation
```js
const screen = Hud.createScreen("Input Form", true);

// Number-only text field
const numberField = screen.textField()
    .pos(10, 10)
    .size(150, 20)
    .message("Number:")
    .suggestion("Enter a number")
    .maxLength(10)
    .action(JavaWrapper.methodToJava((text, scr) => {
        // Validate input is numeric
        if (text && !/^\d+$/.test(text)) {
            Chat.actionbar("&cPlease enter only numbers!");
        }
    }))
    .build();

// Apply number filter
numberField.setTextPredicate(JavaWrapper.methodToJava(text => {
    return text === null || text === "" || /^\d+$/.test(text);
}));

screen.addInitListener(JavaWrapper.methodToJava(() => {
    numberField.setTextPredicate(JavaWrapper.methodToJava(text => {
        return text === null || text === "" || /^\d+$/.test(text);
    }));
}));

Hud.openScreen(screen);
```

### Multi-Field Form
```js
const screen = Hud.createScreen("Registration Form", true);

// Name field
const nameField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Name:")
    .suggestion("Enter your full name")
    .maxLength(50)
    .build();

// Email field
const emailField = screen.textField()
    .pos(10, 40)
    .size(200, 20)
    .message("Email:")
    .suggestion("your@email.com")
    .maxLength(100)
    .build();

// Password field
const passwordField = screen.textField()
    .pos(10, 70)
    .size(200, 20)
    .message("Password:")
    .suggestion("Enter password")
    .maxLength(32)
    .build();

// Submit button
const submitBtn = screen.button()
    .pos(10, 100)
    .size(80, 20)
    .message("Submit")
    .action(JavaWrapper.methodToJava((btn, scr) => {
        const name = nameField.getText();
        const email = emailField.getText();
        const password = passwordField.getText();

        if (name && email && password) {
            Chat.log(`Registration: ${name}, ${email}`);
            Hud.closeScreen();
        } else {
            Chat.actionbar("&cPlease fill in all fields!");
        }
    }))
    .build();

Hud.openScreen(screen);
```

### Text Field with Real-time Search
```js
const screen = Hud.createScreen("Search", true);

// Search input
const searchField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Search:")
    .suggestion("Type to search...")
    .action(JavaWrapper.methodToJava((searchText, scr) => {
        // Real-time search logic
        performSearch(searchText);
    }))
    .build();

// Results display (using text elements)
const resultsText = screen.text()
    .pos(10, 40)
    .message("Results will appear here")
    .build();

function performSearch(query) {
    // Simulate search
    const results = query ?
        `Results for "${query}":\n- Item 1\n- Item 2\n- Item 3` :
        "Enter a search term";

    resultsText.setMessage(results);
}

Hud.openScreen(screen);
```

### Editable/Read-only Toggle
```js
const screen = Hud.createScreen("Config Editor", true);

// Configuration field
const configField = screen.textField()
    .pos(10, 10)
    .size(250, 20)
    .message("Setting:")
    .setText("default.value=true")
    .setEditableColor(0x000000)  // Black when editable
    .setUneditableColor(0x808080)  // Gray when read-only
    .build();

// Toggle button
const toggleBtn = screen.button()
    .pos(10, 40)
    .size(100, 20)
    .message("Toggle Edit")
    .action(JavaWrapper.methodToJava((btn, scr) => {
        const isEditable = configField.isEditable();
        configField.setEditable(!isEditable);

        btn.setMessage(isEditable ? "Enable Edit" : "Disable Edit");
        Chat.actionbar(isEditable ? "&cField is now read-only" : "&aField is now editable");
    }))
    .build();

Hud.openScreen(screen);
```

### Text Manipulation Example
```js
const screen = Hud.createScreen("Text Editor", true);

// Large text field
const editorField = screen.textField()
    .pos(10, 10)
    .size(300, 100)
    .message("Content:")
    .maxLength(1000)
    .build();

// Text manipulation buttons
const clearBtn = screen.button()
    .pos(10, 120)
    .size(60, 20)
    .message("Clear")
    .action(JavaWrapper.methodToJava(() => {
        editorField.setText("");
    }))
    .build();

const uppercaseBtn = screen.button()
    .pos(80, 120)
    .size(80, 20)
    .message("Uppercase")
    .action(JavaWrapper.methodToJava(() => {
        const text = editorField.getText();
        editorField.setText(text.toUpperCase());
    }))
    .build();

const selectAllBtn = screen.button()
    .pos(170, 120)
    .size(80, 20)
    .message("Select All")
    .action(JavaWrapper.methodToJava(() => {
        const text = editorField.getText();
        editorField.setSelection(0, text.length);
    }))
    .build();

Hud.openScreen(screen);
```

### Advanced Text Field with Tooltips
```js
const screen = Hud.createScreen("Advanced Input", true);

// Text field with comprehensive tooltip
const advancedField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Advanced Field:")
    .suggestion("Enter formatted text")
    .maxLength(100)
    .build();

// Add multiple tooltips
advancedField.setTooltip(
    "This is an advanced text field",
    "• Supports up to 100 characters",
    "• Use Ctrl+C/V for copy/paste",
    "• Press Tab to navigate fields"
);

// Character counter field
const counterField = screen.textField()
    .pos(10, 40)
    .size(100, 20)
    .message("Chars:")
    .setEditable(false)  // Read-only counter
    .setUneditableColor(0x808080)
    .build();

// Update counter when text changes
advancedField.action(JavaWrapper.methodToJava((text, scr) => {
    const length = text ? text.length : 0;
    counterField.setText(`${length}/100`);
}));

Hud.openScreen(screen);
```

## Important Notes

### Thread Safety
- When calling `setText()` from non-main threads, use `setText(text, true)` to ensure thread safety
- The method handles proper synchronization with the main render thread

### Text Validation
- Use `setTextPredicate()` for real-time input validation
- The predicate should return `true` for valid input and `false` for invalid input
- `resetTextPredicate()` removes all validation constraints

### Keyboard Shortcuts
The text field supports standard Minecraft text editing shortcuts:
- `Ctrl+C` - Copy selected text
- `Ctrl+V` - Paste text
- `Ctrl+X` - Cut selected text
- `Ctrl+A` - Select all text
- `Home` - Move cursor to start
- `End` - Move cursor to end
- `Shift+Arrow Keys` - Extend selection

### Color Format
- Use RGB color format: `0xRRGGBB` where RR, GG, BB are hex values (0-255)
- Common colors: Black (`0x000000`), White (`0xFFFFFF`), Red (`0xFF0000`), Green (`0x00FF00`), Blue (`0x0000FF`)

### Performance Considerations
- Avoid setting very large maximum lengths (>10000) as it may impact performance
- Text change callbacks fire frequently; consider debouncing expensive operations
- Use read-only mode for display-only fields to reduce overhead

## Version History

- **1.0.5:** Initial release with basic text field functionality
- **1.3.1:** Added thread-safe `setText(text, await)` method
- **1.8.4:** Major update with builder pattern, text validation, selection methods, and enhanced functionality
- **1.9.0:** Added enhanced cursor control methods with shift selection support
- **Current:** Full-featured text input widget with comprehensive customization options

## Related Classes

- `ClickableWidgetHelper` - Parent class providing base widget functionality
- `AbstractWidgetBuilder` - Base builder class for widget creation
- `IScreen` - Interface for creating custom screens
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript function callbacks
- `TextFieldWidgetHelper.TextFieldBuilder` - Builder for creating text input fields with fluent API

