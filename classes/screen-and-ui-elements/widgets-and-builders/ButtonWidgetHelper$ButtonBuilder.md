# ButtonWidgetHelper$ButtonBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.ButtonWidgetHelper$ButtonBuilder`

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen`

**Extends:** `Object`

**Since:** 1.8.4

## Overview

The `ButtonWidgetHelper$ButtonBuilder` class is a nested builder within `ButtonWidgetHelper` that provides a fluent API for creating standard button widgets. This builder implements the builder pattern, allowing you to construct button widgets with all their properties set through a chainable, readable API.

The builder is specifically designed for creating standard (non-textured) buttons with customizable text, positioning, styling, and behavior. It's typically obtained through the `new ButtonBuilder(screen)` constructor and provides methods for configuring all button properties before creating the final widget.

## Constructor

```java
new ButtonBuilder(IScreen screen)
```

The builder constructor takes a screen context where the button will be added.

**Parameters:**
- `screen` (`IScreen`) - The screen context for the button

**Returns:** `ButtonWidgetHelper$ButtonBuilder` - A new builder instance

**Since:** `1.8.4`

## Builder Methods

### Position and Size Methods

#### `x(int x)`
**Parameters:**
- `x` (`int`) - The x-coordinate relative to the screen

**Returns:** `ButtonWidgetHelper$ButtonBuilder` - This builder for method chaining

Sets the x-position of the button.

```javascript
const builder = new ButtonBuilder(screen)
    .x(50); // Position at x=50
```

#### `y(int y)`
**Parameters:**
- `y` (`int`) - The y-coordinate relative to the screen

**Returns:** `ButtonWidgetHelper$ButtonBuilder` - This builder for method chaining

Sets the y-position of the button.

```javascript
const builder = new ButtonBuilder(screen)
    .y(30); // Position at y=30
```

#### `pos(int x, int y)`
**Parameters:**
- `x` (`int`) - The x-coordinate relative to the screen
- `y` (`int`) - The y-coordinate relative to the screen

**Returns:** `ButtonWidgetHelper$ButtonBuilder` - This builder for method chaining

Sets both x and y positions simultaneously.

```javascript
const builder = new ButtonBuilder(screen)
    .pos(100, 50); // Position at (100, 50)
```

#### `width(int width)`
**Parameters:**
- `width` (`int`) - The width of the button in pixels

**Returns:** `ButtonWidgetHelper$ButtonBuilder` - This builder for method chaining

Sets the width of the button. Note that button height is always 20 pixels.

```javascript
const builder = new ButtonBuilder(screen)
    .width(120); // 120 pixels wide
```

#### `size(int width)`
**Parameters:**
- `width` (`int`) - The width of the button in pixels

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Alternative method for setting the width.

```javascript
const builder = new ButtonBuilder(screen)
    .size(100); // 100 pixels wide
```

### Text and Message Methods

#### `message(TextHelper message)`
**Parameters:**
- `message` (`TextHelper`) - The button text as a TextHelper object

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method chaining

Sets the button text using a TextHelper object.

```javascript
const text = Chat.createTextHelperFromString("Click Me!");
const builder = new ButtonBuilder(screen)
    .message(text);
```

#### `message(String message)`
**Parameters:**
- `message` (`String`) - The button text as a string

**Returns:** `ButtonWidget$Builder` - This builder for method chaining

Sets the button text using a plain string.

```javascript
const builder = new ButtonBuilder(screen)
    .message("Button Label");
```

#### `label(TextHelper label)`
**Parameters:**
- `label` (`TextHelper`) - The button text as a TextHelper object

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method chaining

Alternative method for setting button text.

```javascript
const label = Chat.createTextHelperFromString("My Button");
const builder = new ButtonBuilder(screen)
    .label(label);
```

#### `label(String label)`
**Parameters:**
- `label` (`String`) - The button text as a string

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Alternative method for setting button text.

```javascript
const builder = new ButtonBuilder(screen)
    .label("Submit");
```

### State and Appearance Methods

#### `active(boolean active)`
**Parameters:**
- `active` (`boolean`) - Whether the button should be active (clickable)

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method chaining

Sets whether the button is active and can be clicked.

```javascript
const builder = new ButtonBuilder(screen)
    .active(true); // Button is clickable
```

#### `visible(boolean visible)`
**Parameters:**
- `visible` (`boolean`) - Whether the button should be visible

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Sets whether the button should be visible on the screen.

```javascript
const builder = new ButtonBuilder(screen)
    .visible(true); // Button is visible
```

#### `alpha(double alpha)`
**Parameters:**
- `alpha` (`double`) - The opacity of the button (0.0-1.0)

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Sets the opacity of the button.

```javascript
const builder = new ButtonBuilder(screen)
    .alpha(0.8); // 80% opacity
```

#### `zIndex(int zIndex)`
**Parameters:**
- `zIndex` (`int`) - The z-index for rendering order

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Sets the z-index to control rendering order.

```javascript
const builder = new ButtonBuilder(screen)
    .zIndex(5); // Render above elements with lower z-index
```

### Tooltip Methods

#### `setTooltip(TextHelper tooltip)`
**Parameters:**
- `tooltip` (`TextHelper`) - The tooltip text as a TextHelper object

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Sets the tooltip text using a TextHelper object.

```javascript
const tooltip = Chat.createTextHelperFromString("Hover help text");
const builder = new ButtonBuilder(screen)
    .setTooltip(tooltip);
```

#### `setTooltip(String tooltip)`
**Parameters:**
- `tooltip` (`String`) - The tooltip text as a string

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method builder for method chaining

Sets the tooltip text using a plain string.

```javascript
const builder = new ButtonBuilder(screen)
    .setTooltip("Click me for help");
```

#### `setTooltip(TextHelper... tooltips)`
**Parameters:**
- `tooltips` (`TextHelper...`) - Multiple tooltip lines

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method builder for method chaining

Sets multiple tooltip lines.

```javascript
const builder = new ButtonBuilder(screen)
    .setTooltip(
        Chat.createTextHelperFromString("Line 1"),
        Chat.createTextHelperFromString("Line 2"),
        Chat.createTextHelperFromString("Line 3")
    );
```

#### `addTooltip(TextHelper tooltip)`
**Parameters:**
- `tooltip` (`TextHelper`) - Additional tooltip line to append

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method builder for method chaining

Adds an additional tooltip line.

```javascript
const builder = new ButtonBuilder(screen)
    .setTooltip("First line")
    .addTooltip("Second line")
    .addTooltip("Third line");
```

#### `setTooltip(String... tooltips)`
**Parameters:**
- `tooltips` (`String...`) - Multiple tooltip strings

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method builder for method chaining

Sets multiple tooltip lines from strings.

```javascript
const builder = new ButtonBuilder(screen)
    .setTooltip("Line 1", "Line 2", "Line 3");
```

### Event Handler Methods

#### `action(MethodWrapper action)`
**Parameters:**
- `action` (`MethodWrapper`) - The action to execute when clicked

**Returns:** `ButtonWidgetHelper$Builder$ButtonBuilder` - This builder for method builder for method chaining

Sets the click action handler for the button.

```javascript
const builder = new ButtonBuilder(screen)
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        Chat.log("Button clicked!");
    }));
```

#### `onClick(MethodWrapper onClick)`
**Parameters:**
- `onClick` (`MethodWrapper`) - The action to execute when clicked

**Returns:** `ButtonBuilder$Builder$ButtonBuilder` - This builder for method builder for method builder for method chaining

Alternative method for setting the click action.

```javascript
const builder = new ButtonBuilder(screen)
    .onClick(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Chat.log("Button clicked!");
    }));
```

### Build Methods

#### `createWidget()`
**Returns:** `ButtonWidgetHelper` - The created button widget

Creates the button widget with the configured properties and returns it.

```javascript
const button = new ButtonBuilder(screen)
    .pos(50, 30)
    .width(100)
    .message("Click Me")
    .action(actionHandler)
    .createWidget();
```

#### `build()`
**Returns:** `ButtonWidgetHelper` - The created button widget

Alternative method to create the button widget.

```javascript
const button = new ButtonBuilder(screen)
    .pos(50, 30)
    .width(100)
    .message("Click Me")
    .action(actionHandler)
    .build();
```

## Usage Examples

### Example 1: Basic Button Creation

```javascript
// Create a simple button
const screen = Hud.createScreen("My Screen", true);
const button = new ButtonBuilder(screen)
    .pos(50, 30)
    .width(120)
    .message("Click Me!")
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        Chat.log("Button was clicked!");
    }))
    .createWidget();

screen.addButton(button);
Hud.openScreen(screen);
```

### Example 2: Button with Rich Text and Tooltips

```javascript
const screen = Hud.createScreen("Advanced Button", true);

// Create a styled button with rich text
const richButton = new ButtonBuilder(screen)
    .pos(100, 50)
    .width(150)
    .message(
        Chat.createTextBuilder()
            .append("&6Styled ")
            .append("Button")
            .withColor(0xFF0000FF)
            .withBold(true)
            .build()
    )
    .setTooltip(
        "This is a rich text button with styling!",
        Chat.createTextHelperFromString("&7Multi-line tooltip").withItalic(true)
    )
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        Chat.log("Rich text button clicked!");
    }))
    .createWidget();

screen.addButton(richButton);
Hud.openScreen(screen);
```

### Example 3: Button with State Management

```javascript
const screen = Hud.createScreen("Dynamic Button", true);
let clickCount = 0;

// Create a counter button
const counterButton = new ButtonBuilder(screen)
    .pos(50, 50)
    .width(120)
    .message(`Click count: ${clickCount}`)
    .active(true)
    .zIndex(1)
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        clickCount++;
        button.setMessage(`Click count: ${clickCount}`);

        // Disable after 10 clicks
        if (clickCount >= 10) {
            button.setActive(false);
            button.addTooltip("Button disabled after 10 clicks");
            button.setMessage("Max clicks reached");
        }
    }))
    .createWidget();

screen.addButton(counterButton);
Hud.openScreen(screen);
```

### Example 4: Button Grid Layout

```javascript
const screen = Hud.createScreen("Button Grid", true);

function createButtonGrid(cols, rows, startX, startY, spacing) {
    const buttons = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * (80 + spacing);
            const y = startY + row * (25 + spacing);

            const button = new ButtonBuilder(screen)
                .pos(x, y)
                .width(80)
                .zIndex(row * cols + col)
                .message(`Button ${row * cols + col + 1}`)
                .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
                    Chat.log(`Grid button ${btn.getLabel().getString()} clicked!`);
                }))
                .createWidget();

            buttons.push(button);
            screen.addButton(button);
        }
    }

    return buttons;
}

// Create a 3x3 button grid
const gridButtons = createButtonGrid(3, 3, 20, 30, 5);
screen.openScreen();
```

### Example 5: Button with Confirmation Logic

```javascript
const screen = Hud.createScreen("Confirmation Dialog", true);

// Create a button with confirmation dialog
const dangerousAction = new ButtonBuilder(screen)
    .pos(60, 40)
    .width(140)
    .message(
        Chat.createTextHelperFromString("&cDelete All Data")
    )
    .setTooltip("⚠️ This action cannot be undone!")
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        // Create confirmation dialog
        const confirmScreen = Hud.createScreen("Confirm Action", true);

        const confirmBtn = new ButtonBuilder(confirmScreen)
            .pos(30, 50)
            .width(80)
            .message("&aConfirm")
            .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
                Chat.log("Action confirmed! (simulation)");
                Hud.openScreen(screen);
            }))
            .createWidget();

        const cancelBtn = new ButtonBuilder(confirmScreen)
            .pos(120, 50)
            .width(80)
            .message("&cCancel")
            .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
                Chat.log("Action cancelled!");
                Hud.openScreen(screen);
            }))
            .createWidget();

        const confirmText = Hud.createTextElement()
            .pos(30, 20)
            .text(Chat.createTextHelperFromString("&4Are you sure?"));

        confirmScreen.addText(confirmText);
        confirmScreen.addButton(confirmBtn);
        confirmScreen.addButton(cancelBtn);
        confirmScreen.openScreen();
    }))
    .createWidget();

screen.addButton(dangerousAction);
screen.openScreen();
```

### Example 6: Button with Tooltips from Game State

```javascript
const screen = Hud.createScreen("Dynamic Tooltips", true);

function createGameInfoButton() {
    const player = Player.getPlayer();
    if (!player) return null;

    const health = player.getHealth().toFixed(1);
    const food = player.getHunger();
    const pos = player.getPos();
    const dimension = World.getDimension();

    return new ButtonBuilder(screen)
        .pos(50, 30)
        .width(180)
        .message("Player Info")
        .zIndex(10)
        .setTooltip(
            `Health: ${health}/${player.getMaxHealth()}`,
            `Hunger: ${food}/20`,
            `Position: ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}`,
            `Dimension: ${dimension}`,
            "",
            "Click to refresh"
        )
        .action(JavaWrapper.methodToJavaAsync((button, screen) => {
            // Recreate the button with updated game stats
            const updatedButton = createGameInfoButton();
            screen.removeButton(button);
            screen.addButton(updatedButton);
            Chat.log("Player info refreshed!");
        }))
        .createWidget();
}

const infoButton = createGameInfoButton();
if (infoButton) {
    screen.addButton(infoButton);
    screen.openScreen();
}
```

### Example 7: Button Builder Chaining

```javascript
const screen = Hud.createScreen("Complex Button", true);

// Create a complex button with all available options
const advancedButton = new ButtonBuilder(screen)
    .pos(80, 60)
    .size(150)                              // width
    .label("Advanced")                       // text
    .active(true)                             // clickable
    .visible(true)                           // visible
    .alpha(0.9)                              // semi-transparent
    .zIndex(5)                               // rendering order
    .setTooltip("This is an advanced button")
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        // Complex button logic here
        Chat.log(`Advanced button clicked! State: ${btn.isActive()}, Visible: ${btn.isVisible()}`);
    }))
    .createWidget();

screen.addButton(advancedButton);
screen.openScreen();
```

### Example 8: Button with Conditional Configuration

```javascript
const screen = Hud.createScreen("Conditional Button", true);

function createConditionalButton(config) {
    const builder = new ButtonBuilder(screen);

    // Position validation
    if (config.x >= 0) {
        builder.x(config.x);
    } else {
        builder.x(10);
    }

    if (config.y >= 0) {
        builder.y(config.y);
    } else {
        builder.y(10);
    }

    // Width configuration
    if (config.width > 0) {
        builder.width(config.width);
    } else {
        builder.width(100);
    }

    // Text configuration
    if (config.message) {
        if (typeof config.message === 'string') {
            builder.message(config.message);
        } else {
            builder.message(config.message);
        }
    } else {
        builder.message("Default Button");
    }

    // State configuration
    const isActive = config.active !== false;
    const isVisible = config.visible !== false;

    builder
        .active(isActive)
        .visible(isVisible);

    // Z-index configuration
    const zIndex = typeof config.zIndex === 'number' ? config.zIndex : 0;
    builder.zIndex(zIndex);

    // Tooltip configuration
    if (config.tooltip) {
        builder.setTooltip(config.tooltip);
    }

    // Action configuration
    if (config.action) {
        builder.action(config.action);
    } else {
        builder.action(JavaWrapper.methodToJavaAsync((btn, scr) => {
            Chat.log("Default action executed!");
        }));
    }

    return builder.createWidget();
}

// Test with different configurations
const configs = [
    { message: "Config 1", width: 80, active: true },
    { message: "Config 2", width: 120, active: false },
    { message: "Config 3", x: 20, y: 20, active: true, tooltip: "Tooltip for Config 3" }
];

configs.forEach((config, index) => {
    const button = createConditionalButton(config);
    screen.addButton(button);
});

screen.openScreen();
```

## Important Notes

### Builder Pattern Benefits

1. **Type Safety:** All builder methods provide type checking for parameters
2. **Method Chaining:** All methods return the builder for fluent API usage
3. **Configuration Validation:** Parameters are validated when the widget is created
4. **Readability:** Method names clearly indicate the property being configured
5. **Flexibility:** Multiple ways to set the same property for convenience

### Button Properties

1. **Fixed Height:** All buttons have a fixed height of 20 pixels regardless of the height parameter
2. **Screen Context:** Button actions receive both the button helper and the screen as parameters
3. **Thread Safety:** Button actions are executed on the main thread by default
4. **State Persistence:** All button properties persist until explicitly changed
5. **Z-Index:** Controls rendering order when multiple widgets overlap

### Text Formatting

1. **TextHelper:** Use `TextHelper` for formatted text with colors and styles
2. **String Support:** Direct string input works for simple text
3. **Color Codes:** Supports Minecraft color codes in text (e.g., `&6` for gold color)
4. **Rich Text:** Use `TextBuilder` for complex text formatting

### Tooltips

1. **Multi-line Support:** Add multiple tooltip lines for comprehensive help text
2. **Rich Text:** Support for formatted text in tooltips
3. **Dynamic Updates:** Tooltips can be updated dynamically after button creation
4. **Color Coding:** Use color codes or TextHelper for colored tooltips

### Error Handling

1. **Action Wrapping:** Button actions are wrapped with error handling by default
2. **Exception Safety:** Prevents script crashes from button action failures
3. **User Feedback:** Can show error messages to users when actions fail
4. **Graceful Degradation:** Buttons remain functional even if some properties are invalid

### Performance Considerations

1. **Z-Index Usage:** Use z-index values appropriately to avoid unnecessary sorting overhead
2. **Tooltip Updates:** Minimize frequent tooltip updates for better performance
3. **Button Recycling:** Consider reusing buttons when possible to reduce memory usage
4. **Action Efficiency:** Keep button actions lightweight for responsive UI
5. **Visibility Management:** Hide buttons when not needed to improve rendering performance

## Best Practices

1. **Method Chaining:** Use method chaining for readable and concise configuration
2. **Tooltip Usage:** Provide helpful tooltips for all interactive elements
3. **State Management:** Properly manage active/visible states for user experience
4. **Error Handling:** Implement proper error handling in button actions
5. **Validation:** Validate parameters before building the widget
6. **Z-Index Planning:** Plan z-index values for complex UI layouts

## Related Classes

- [`ButtonWidgetHelper`](ButtonWidgetHelper.md) - Parent class that this builder creates
- [`IScreen`](IScreen.md) - Interface for screen contexts
- [`TextHelper`](TextHelper.md) - Helper class for text formatting
- [`TextBuilder`](TextBuilder.md) - Builder class for creating complex text elements
- [`MethodWrapper`](MethodWrapper.md) - Wrapper for JavaScript methods in Java context
- `ButtonWidget` - Minecraft's native button widget class
- `ClickableWidgetHelper`](ClickableWidgetHelper.md) - Base class providing click functionality

## Version History

- **1.8.4:** Initial introduction with comprehensive button configuration support
- **Current:** Enhanced with rich text support and improved error handling