# TextFieldWidgetHelper

A specialized helper for creating and managing text input field widgets. TextFieldWidgetHelper extends ClickableWidgetHelper with text input-specific functionality including text manipulation, validation, cursor control, and input filtering.

## Fields
- [TextFieldWidgetHelper.zIndex](#textfieldwidgethelperzindex)

## Methods
- [TextFieldWidgetHelper.getText](#textfieldwidgethelpergettext)
- [TextFieldWidgetHelper.setText](#textfieldwidgethelpersettext)
- [TextFieldWidgetHelper.setEditableColor](#textfieldwidgethelperseteditablecolor)
- [TextFieldWidgetHelper.setEditable](#textfieldwidgethelperseteditable)
- [TextFieldWidgetHelper.isEditable](#textfieldwidgethelperiseditable)
- [TextFieldWidgetHelper.setUneditableColor](#textfieldwidgethelpersetuneditablecolor)
- [TextFieldWidgetHelper.getSelectedText](#textfieldwidgethelpergetselectedtext)
- [TextFieldWidgetHelper.setSuggestion](#textfieldwidgethelpersetsuggestion)
- [TextFieldWidgetHelper.getMaxLength](#textfieldwidgethelpergetmaxlength)
- [TextFieldWidgetHelper.setMaxLength](#textfieldwidgethelpersetmaxlength)
- [TextFieldWidgetHelper.setSelection](#textfieldwidgethelpersetselection)
- [TextFieldWidgetHelper.setTextPredicate](#textfieldwidgethelpersettextpredicate)
- [TextFieldWidgetHelper.resetTextPredicate](#textfieldwidgethelperresettextpredicate)
- [TextFieldWidgetHelper.setCursorPosition](#textfieldwidgethelpersetcursorposition)
- [TextFieldWidgetHelper.setCursorToStart](#textfieldwidgethelpersetcursortostart)
- [TextFieldWidgetHelper.setCursorToEnd](#textfieldwidgethelpersetcursortoend)

## Fields

### TextFieldWidgetHelper.zIndex
The z-index (render order) of this text field. Higher values render on top of lower values.

**Type**
* `int`

## Methods

### TextFieldWidgetHelper.getText
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Enter text...");

const currentText = textField.getText();
Chat.log(`Current text: "${currentText}"`);
```

**Params**
* `(none)`

**Returns**
* `string`: The current text content of the field.

### TextFieldWidgetHelper.setText
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "");

// Set text synchronously (waits for completion)
textField.setText("Hello World!");

// Set text asynchronously
textField.setText("New text", false);
```

**Params**
1. `text: string`: The text to set.
2. `await: boolean = true`: Whether to wait for the operation to complete.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setEditableColor
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Edit me!");

// Set custom text color when field is editable
textField.setEditableColor(0x00FF00); // Green text when editable
```

**Params**
1. `color: int`: The RGB color value for editable text.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setEditable
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Read-only text");

// Make field read-only
textField.setEditable(false);

// Make field editable again
textField.setEditable(true);
```

**Params**
1. `edit: boolean`: `true` to make the field editable, `false` to make it read-only.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.isEditable
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Test");

if (textField.isEditable()) {
    Chat.log("Text field is editable");
} else {
    Chat.log("Text field is read-only");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the field is editable, `false` if read-only.

### TextFieldWidgetHelper.setUneditableColor
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Read-only text");
textField.setEditable(false);

// Set custom text color when field is read-only
textField.setUneditableColor(0x808080); // Gray text when not editable
```

**Params**
1. `color: int`: The RGB color value for non-editable text.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.getSelectedText
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Select some text");

// User can select text with mouse, then this will return the selection
const selectedText = textField.getSelectedText();
if (selectedText) {
    Chat.log(`Selected text: "${selectedText}"`);
}
```

**Params**
* `(none)`

**Returns**
* `string`: The currently selected text, or empty string if no selection.

### TextFieldWidgetHelper.setSuggestion
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "");
textField.setSuggestion("Enter your username here...");
// The suggestion appears as gray text when the field is empty
```

**Params**
1. `suggestion: string`: The suggestion text to display when the field is empty.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.getMaxLength
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "");

const maxLength = textField.getMaxLength();
Chat.log(`Max length: ${maxLength}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The maximum number of characters allowed in the field.

### TextFieldWidgetHelper.setMaxLength
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "");

// Limit to 50 characters
textField.setMaxLength(50);
```

**Params**
1. `length: int`: The maximum number of characters allowed.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setSelection
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Hello World!");

// Select characters 2-7 (indexes are inclusive)
textField.setSelection(2, 7); // Selects "llo W"
```

**Params**
1. `start: int`: The starting index of the selection (inclusive).
2. `end: int`: The ending index of the selection (inclusive).

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setTextPredicate
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "");

// Only allow numbers
textField.setTextPredicate(JavaWrapper.methodToJava((text) => {
    return text.matches("\\d*"); // Only digits
}));

// Only allow lowercase letters
textField.setTextPredicate(JavaWrapper.methodToJava((text) => {
    return text.matches("[a-z]*");
}));

// Custom validation (e.g., email format)
textField.setTextPredicate(JavaWrapper.methodToJava((text) => {
    return text.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$") || text.isEmpty();
}));
```

**Params**
1. `predicate: MethodWrapper<string, ?, ?, ?>`: A function that returns `true` if the text is valid.

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.resetTextPredicate
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "");

// Set some validation
textField.setTextPredicate(JavaWrapper.methodToJava((text) => text.matches("\\d*")));

// Remove validation (allow any non-empty text)
textField.resetTextPredicate();
```

**Params**
* `(none)`

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setCursorPosition
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Hello World!");

// Move cursor to position 6
textField.setCursorPosition(6);

// Move cursor with selection
textField.setCursorPosition(10, true); // Position 10, with shift held
```

**Params**
1. `position: int`: The cursor position (0-based index).
2. `shift: boolean = false`: Whether shift is held (affects selection).

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setCursorToStart
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Hello World!");

// Move cursor to start without selection
textField.setCursorToStart();

// Move cursor to start with selection
textField.setCursorToStart(true);
```

**Params**
1. `shift: boolean = false`: Whether shift is held (affects selection).

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

### TextFieldWidgetHelper.setCursorToEnd
```js
const screen = Hud.createScreen("Text Input Demo", false);
const textField = screen.addTextField(10, 30, 200, 20, "Hello World!");

// Move cursor to end without selection
textField.setCursorToEnd();

// Move cursor to end with selection
textField.setCursorToEnd(true);
```

**Params**
1. `shift: boolean = false`: Whether shift is held (affects selection).

**Returns**
* `TextFieldWidgetHelper`: Self for chaining.

## TextField Builder

### TextFieldWidgetHelper.TextFieldBuilder
```js
const screen = Hud.createScreen("Builder Demo", false);

// Create text field using builder pattern
const textField = new TextFieldWidgetHelper.TextFieldBuilder(screen, screen.getTextRenderer())
    .pos(50, 50)
    .size(200, 20)
    .text("Initial text")
    .suggestion("Enter your name...")
    .action(JavaWrapper.methodToJava((text, currentScreen) => {
        Chat.log(`Text changed: "${text}"`);
    }))
    .zIndex(1)
    .createWidget();

screen.addWidget(textField);
Hud.openScreen(screen);
```

#### Builder Methods

**pos(x: int, y: int)**
- Sets the text field position.

**size(width: int, height: int)**
- Sets the text field size.

**text(initialText: string)**
- Sets the initial text content.

**suggestion(hint: string)**
- Sets the suggestion text that appears when the field is empty.

**action(callback: MethodWrapper<string, IScreen, Object, ?>)**
- Sets the callback to execute when text changes.

**zIndex(index: int)**
- Sets the rendering order.

**createWidget()**
- Creates and returns the TextFieldWidgetHelper instance.

## Examples

### Basic Text Input Form
```js
function createBasicForm() {
    const screen = Hud.createScreen("Basic Form", false);

    // Name field
    const nameField = screen.addTextField(10, 30, 200, 20, "");
    nameField.setSuggestion("Enter your name");
    nameField.setMaxLength(20);

    // Email field
    const emailField = screen.addTextField(10, 60, 200, 20, "");
    emailField.setSuggestion("Enter your email");
    emailField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        return text.matches("^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\\.[a-zA-Z]*$") || text.isEmpty();
    }));

    // Age field (numbers only)
    const ageField = screen.addTextField(10, 90, 100, 20, "");
    ageField.setSuggestion("Age");
    ageField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        return text.matches("\\d*") && (text.isEmpty() || parseInt(text) <= 150);
    }));

    // Submit button
    screen.addButton(10, 120, 100, 20, "Submit", JavaWrapper.methodToJava(() => {
        const name = nameField.getText();
        const email = emailField.getText();
        const age = ageField.getText();

        if (name && email && age) {
            Chat.log(`Name: ${name}, Email: ${email}, Age: ${age}`);
        } else {
            Chat.log("Please fill in all fields!");
        }
    }));

    return screen;
}

Hud.openScreen(createBasicForm());
```

### Real-time Text Validation
```js
function createValidatedForm() {
    const screen = Hud.createScreen("Validated Form", false);

    // Username field
    const usernameField = screen.addTextField(10, 30, 200, 20, "");
    usernameField.setSuggestion("Username (3-16 chars, alphanumeric)");
    usernameField.setMaxLength(16);
    usernameField.setEditableColor(0xFF0000); // Start with red
    usernameField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        const isValid = text.length >= 3 && text.length <= 16 && text.matches("^[a-zA-Z0-9_]*$");

        // Update color based on validity
        usernameField.setEditableColor(isValid ? 0x00FF00 : 0xFF0000);

        return isValid || text.isEmpty();
    }));

    // Password field
    const passwordField = screen.addTextField(10, 60, 200, 20, "");
    passwordField.setSuggestion("Password (min 8 chars)");
    passwordField.setEditableColor(0xFF0000);
    passwordField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        const isValid = text.length >= 8;
        passwordField.setEditableColor(isValid ? 0x00FF00 : 0xFF0000);
        return isValid || text.isEmpty();
    }));

    // Real-time validation feedback
    const validationLabel = screen.addText("", 10, 90, 0xFFFFFF, true);

    function updateValidation() {
        const username = usernameField.getText();
        const password = passwordField.getText();

        const userValid = username.length >= 3 && username.length <= 16 && username.matches("^[a-zA-Z0-9_]*$");
        const passValid = password.length >= 8;

        if (username && !userValid) {
            validationLabel.setText("Username must be 3-16 chars, alphanumeric");
            validationLabel.setColor(0xFF0000);
        } else if (password && !passValid) {
            validationLabel.setText("Password must be at least 8 characters");
            validationLabel.setColor(0xFF0000);
        } else if (userValid && passValid) {
            validationLabel.setText("Form is valid!");
            validationLabel.setColor(0x00FF00);
        } else {
            validationLabel.setText("");
        }
    }

    usernameField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        const isValid = text.length >= 3 && text.length <= 16 && text.matches("^[a-zA-Z0-9_]*$");
        usernameField.setEditableColor(isValid ? 0x00FF00 : 0xFF0000);
        updateValidation();
        return isValid || text.isEmpty();
    }));

    passwordField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        const isValid = text.length >= 8;
        passwordField.setEditableColor(isValid ? 0x00FF00 : 0xFF0000);
        updateValidation();
        return isValid || text.isEmpty();
    }));

    return screen;
}

Hud.openScreen(createValidatedForm());
```

### Search Field with Auto-complete
```js
function createSearchField() {
    const screen = Hud.createScreen("Search Demo", false);

    const searchItems = [
        "minecraft:diamond", "minecraft:gold_ingot", "minecraft:iron_ingot",
        "minecraft:emerald", "minecraft:redstone", "minecraft:lapis_lazuli",
        "minecraft:coal", "minecraft:copper_ingot", "minecraft:netherite_ingot"
    ];

    // Search field
    const searchField = screen.addTextField(10, 30, 200, 20, "");
    searchField.setSuggestion("Search items...");

    // Results display
    const resultsText = screen.addText("", 10, 60, 0xFFFFFF, true);

    // Update results when text changes
    searchField.setTextPredicate(JavaWrapper.methodToJava((text) => {
        const query = text.toLowerCase();
        const matches = searchItems.filter(item => item.toLowerCase().includes(query));

        if (text) {
            if (matches.length > 0) {
                resultsText.setText(`Found ${matches.length} results:\n${matches.slice(0, 3).join("\n")}`);
            } else {
                resultsText.setText("No results found");
            }
        } else {
            resultsText.setText("");
        }

        return true; // Allow all text
    }));

    return screen;
}

Hud.openScreen(createSearchField());
```

### Multi-line Text Editor Simulation
```js
function createMultiLineEditor() {
    const screen = Hud.createScreen("Text Editor", false);

    const lines = [];
    const maxLines = 5;
    const lineHeight = 25;

    // Create multiple text fields for multi-line editing
    const textFields = [];

    function addLine(index, text = "") {
        if (index >= maxLines) return;

        const y = 30 + index * lineHeight;
        const field = screen.addTextField(10, y, 300, 20, text);
        field.setSuggestion(`Line ${index + 1}`);

        // Handle line splitting with Enter key simulation
        field.setTextPredicate(JavaWrapper.methodToJava((newText) => {
            lines[index] = newText;

            // Auto-focus next line if this one is filled and Enter is pressed
            // (This is a simplified simulation)
            return true;
        }));

        textFields[index] = field;
        return field;
    }

    // Initialize with first line
    addLine(0);

    // Add line button
    let lineCount = 1;
    screen.addButton(320, 30, 80, 20, "Add Line", JavaWrapper.methodToJava(() => {
        if (lineCount < maxLines) {
            addLine(lineCount);
            lineCount++;
        }
    }));

    // Show all text button
    screen.addButton(320, 60, 80, 20, "Show All", JavaWrapper.methodToJava(() => {
        const allText = textFields
            .filter(field => field && field.getText())
            .map(field => field.getText())
            .join("\n");

        Chat.log("All text:\n" + allText);
    }));

    // Clear all button
    screen.addButton(320, 90, 80, 20, "Clear All", JavaWrapper.methodToJava(() => {
        textFields.forEach(field => {
            if (field) field.setText("");
        });
    }));

    return screen;
}

Hud.openScreen(createMultiLineEditor());
```

**Notes**
- TextFieldWidgetHelper provides comprehensive text input functionality
- Use `setTextPredicate` for real-time input validation
- The builder pattern allows for clean text field configuration
- Text fields automatically handle cursor movement, selection, and keyboard input
- Colors can be customized for both editable and read-only states
- Suggestions provide helpful hints to users
- Maximum length prevents excessive input
- Cursor control methods allow programmatic text manipulation
- Text fields integrate seamlessly with other UI elements
- Use the action callback to respond to text changes in real-time