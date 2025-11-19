# TextFieldWidgetHelper.TextFieldBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.TextFieldWidgetHelper.TextFieldBuilder`

**Extends:** `AbstractWidgetBuilder<TextFieldBuilder, TextFieldWidget, TextFieldWidgetHelper>`

**Since:** JsMacros 1.8.4

The `TextFieldBuilder` class provides a fluent builder API for creating text input field widgets in JSMacros custom screens and UIs. This builder offers comprehensive configuration options for text fields including positioning, sizing, validation, event handling, and visual customization. It's the recommended way to create text input fields for forms, chat inputs, search boxes, and configuration interfaces.

## Overview

The `TextFieldBuilder` class enables creation of sophisticated text input fields with:

- **Text Input Control**: Full support for text entry, editing, and manipulation
- **Input Validation**: Real-time text filtering and validation with custom predicates
- **Event Handling**: Text change callbacks with proper screen context and error handling
- **Visual Customization**: Custom messages, suggestions, colors, and styling
- **Position Control**: Precise positioning and sizing with screen-relative coordinates
- **Builder Pattern**: Fluent API for readable and maintainable field creation
- **Z-Index Support**: Layering control for complex UI layouts

## Constructor

### `new TextFieldBuilder(screen, textRenderer)`
Creates a new TextFieldBuilder for the specified screen with the given text renderer.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| screen | IScreen | The screen to add the text field to |
| textRenderer | TextRenderer | The text renderer for displaying text content |

**Since:** `1.8.4`

**Note:** This constructor is typically not called directly. Instead, use `screen.textField()` to obtain a builder instance.

## Methods

### Builder-Specific Methods

#### `action(action)`
Sets a callback function that will be invoked when the text field's content changes.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| action | MethodWrapper<String, IScreen, Object, ?> | Callback function that receives the new text and screen |

**Returns:** `TextFieldBuilder` - Returns self for method chaining

**Since:** `1.8.4`

**Example:**
```js
const textField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Search:")
    .action(JavaWrapper.methodToJava((newText, scr) => {
        Chat.log(`Text changed to: ${newText}`);
        performSearch(newText);
    }))
    .build();
```

#### `suggestion(suggestion)`
Sets the suggestion text that appears when the field is empty and unfocused.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| suggestion | String | The suggestion text to display |

**Returns:** `TextFieldBuilder` - Returns self for method chaining

**Since:** `1.8.4`

**Example:**
```js
const textField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Username:")
    .suggestion("Enter your username")
    .build();
```

#### `getAction()`
Returns the currently configured action callback for text changes.

**Returns:** `MethodWrapper<String, IScreen, Object, ?> | null` - The current action callback or null if none is set

**Since:** `1.8.4`

#### `getSuggestion()`
Returns the currently configured suggestion text.

**Returns:** `String` - The current suggestion text

**Since:** `1.8.4`

#### `createWidget()`
Creates and returns the configured `TextFieldWidgetHelper` instance.

**Returns:** `TextFieldWidgetHelper` - The created text field widget

**Since:** `1.8.4`

**Note:** This method is automatically called by `build()`. You typically use `build()` instead.

### Inherited Methods from AbstractWidgetBuilder

The TextFieldBuilder also inherits all methods from AbstractWidgetBuilder:

#### Position and Size Methods
- `x(x)` - Set X position
- `y(y)` - Set Y position
- `pos(x, y)` - Set both X and Y positions
- `width(width)` - Set width
- `height(height)` - Set height
- `size(width, height)` - Set both width and height
- `zIndex(zIndex)` - Set z-index for rendering order

#### Position and Size Getters
- `getX()` - Get current X position
- `getY()` - Get current Y position
- `getWidth()` - Get current width
- `getHeight()` - Get current height
- `getZIndex()` - Get current z-index

#### Appearance Methods
- `message(text)` - Set label/message text
- `active(active)` - Set active/enabled state
- `visible(visible)` - Set visibility state
- `alpha(alpha)` - Set transparency (0.0-1.0)

#### Finalization Methods
- `build()` - Create the widget and add it to the screen
- `buildAndAdd()` - Create and add the widget to the screen (alias for build())

## Usage Examples

### Basic Text Field Creation
```js
// Create a simple text field
const screen = Hud.createScreen("Input Example", true);

const textField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Name:")
    .suggestion("Enter your name")
    .build();

Hud.openScreen(screen);
```

### Text Field with Validation
```js
// Create a number-only text field with validation
const screen = Hud.createScreen("Number Input", true);

const numberField = screen.textField()
    .pos(10, 10)
    .size(150, 20)
    .message("Age:")
    .suggestion("Enter a number")
    .action(JavaWrapper.methodToJava((text, scr) => {
        // Real-time validation
        if (text && !/^\d+$/.test(text)) {
            Chat.actionbar("&cPlease enter only numbers!");
        } else {
            Chat.actionbar("&aValid input!");
        }
    }))
    .build();

// Apply input filter
screen.addInitListener(JavaWrapper.methodToJava(() => {
    numberField.setTextPredicate(JavaWrapper.methodToJava(text => {
        return text === null || text === "" || /^\d*$/.test(text);
    }));
}));

Hud.openScreen(screen);
```

### Search Field with Real-time Filtering
```js
// Create a search field that filters items in real-time
const screen = Hud.createScreen("Item Search", true);

const searchField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Search:")
    .suggestion("Type to search items...")
    .action(JavaWrapper.methodToJava((searchText, scr) => {
        filterItems(searchText);
    }))
    .build();

const resultsText = screen.text()
    .pos(10, 40)
    .message("Results will appear here")
    .build();

function filterItems(query) {
    const items = [
        "Diamond Sword", "Golden Apple", "Emerald", "Iron Pickaxe",
        "Bow", "Arrow", "Leather Boots", "Redstone"
    ];

    if (!query) {
        resultsText.setMessage("Enter a search term");
        return;
    }

    const filtered = items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length > 0) {
        resultsText.setMessage(`Found ${filtered.length} items:\n${filtered.slice(0, 5).join('\n')}`);
    } else {
        resultsText.setMessage("No items found");
    }
}

Hud.openScreen(screen);
```

### Multi-Field Form with Validation
```js
// Create a registration form with multiple validated fields
const screen = Hud.createScreen("Registration", true);

// Username field
const usernameField = screen.textField()
    .pos(10, 10)
    .size(200, 20)
    .message("Username:")
    .suggestion("3-16 characters, letters and numbers")
    .maxLength(16)
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
    .suggestion("Min 8 characters")
    .maxLength(32)
    .build();

// Validation feedback
const feedbackText = screen.text()
    .pos(10, 100)
    .message("")
    .build();

// Submit button
const submitBtn = screen.button()
    .pos(10, 120)
    .width(80)
    .height(20)
    .message("Register")
    .action(JavaWrapper.methodToJava((btn, scr) => {
        const username = usernameField.getText();
        const email = emailField.getText();
        const password = passwordField.getText();

        let errors = [];

        if (!username || username.length < 3 || username.length > 16) {
            errors.push("Username must be 3-16 characters");
        }

        if (!email || !email.includes("@") || !email.includes(".")) {
            errors.push("Invalid email address");
        }

        if (!password || password.length < 8) {
            errors.push("Password must be at least 8 characters");
        }

        if (errors.length > 0) {
            feedbackText.setMessage("&c" + errors.join("\n"));
        } else {
            feedbackText.setMessage("&aRegistration successful!");
            Chat.log(`Registered: ${username}, ${email}`);
        }
    }))
    .build();

Hud.openScreen(screen);
```

## Important Notes

### Thread Safety
- Text field actions are executed on the main render thread by default
- Use proper thread handling when performing long-running operations in callbacks
- The builder handles screen integration automatically

### Input Validation
- Use `setTextPredicate()` for real-time input validation
- Validation predicates should return `true` for valid input and `false` for invalid input
- Invalid input is automatically rejected by the text field
- Use `resetTextPredicate()` to remove validation constraints

### Text Change Events
- Text change events fire for every character modification
- Consider debouncing expensive operations in text change callbacks
- The callback receives both the new text and the screen instance

### Keyboard Shortcuts
Text fields support standard Minecraft text editing shortcuts:
- `Ctrl+C` - Copy selected text
- `Ctrl+V` - Paste text
- `Ctrl+X` - Cut selected text
- `Ctrl+A` - Select all text
- `Home` - Move cursor to start
- `End` - Move cursor to end
- `Shift+Arrow Keys` - Extend selection

### Color Format
- Text colors use RGB format: `0xRRGGBB` where RR, GG, BB are hex values (0-255)
- Common colors: Black (`0x000000`), White (`0xFFFFFF`), Red (`0xFF0000`), Green (`0x00FF00`), Blue (`0x0000FF`)

### Performance Considerations
- Avoid setting very large maximum lengths (>10000) as it may impact performance
- Text change callbacks fire frequently; consider debouncing expensive operations
- Use read-only mode for display-only fields to reduce overhead
- Minimize complex validation logic in predicates for better responsiveness

## Version History

- **1.8.4:** Initial release with builder pattern, text validation, and comprehensive functionality
- **1.9.0:** Enhanced cursor control and text selection methods in created widgets
- **Current:** Full-featured text field builder with comprehensive customization options

## Related Classes

- `TextFieldWidgetHelper` - Helper class for created text field widgets
- `AbstractWidgetBuilder` - Base builder class providing common widget building methods
- `IScreen` - Interface for creating custom screens
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript function callbacks
- `TextRenderer` - Minecraft's text rendering class for displaying text content
- `ClickableWidgetHelper` - Parent class providing base widget functionality