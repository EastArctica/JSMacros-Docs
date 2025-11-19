# ButtonWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.ButtonWidgetHelper`

**Extends:** `ClickableWidgetHelper<ButtonWidgetHelper<T>, T>`

**Since:** JsMacros 1.8.4

The `ButtonWidgetHelper` class is a comprehensive helper for creating and managing button widgets in JSMacros custom screens and UIs. It provides both standard buttons and textured buttons with full control over appearance, behavior, positioning, and interaction handling. This class serves as a wrapper around Minecraft's native button widgets, exposing them to JSMacros scripts with additional functionality for tooltips, actions, and screen integration.

## Overview

The `ButtonWidgetHelper` class provides:

- **Button Creation**: Support for both standard and textured button widgets
- **Position Control**: Precise positioning and sizing with screen-relative coordinates
- **Visual Customization**: Custom text, colors, textures, and styling options
- **Event Handling**: Click actions with proper screen context and error handling
- **Tooltips**: Multi-line tooltip support with various text formats
- **State Management**: Control over active, visible, and focus states
- **Builder Patterns**: Fluent API for easy button construction
- **Z-Index Support**: Layering control for complex UI layouts

## Constructors

### `new ButtonWidgetHelper(button)`
Creates a new ButtonWidgetHelper from an existing ButtonWidget instance.

**Parameters:**
| Parameter | Type          | Description                   |
| --------- | ------------- | ----------------------------- |
| button    | T extends ButtonWidget | The underlying ButtonWidget to wrap |

**Since:** `1.8.4`

### `new ButtonWidgetHelper(button, zIndex)`
Creates a new ButtonWidgetHelper with a specified z-index.

**Parameters:**
| Parameter | Type          | Description                   |
| --------- | ------------- | ----------------------------- |
| button    | T extends ButtonWidget | The underlying ButtonWidget to wrap |
| zIndex    | int           | The z-index for rendering order |

**Since:** `1.8.4`

## Fields

## Methods

## ButtonBuilder Class

The `ButtonBuilder` class provides a fluent builder API for creating standard buttons.

### Constructors

### `new ButtonBuilder(screen)`
Creates a new ButtonBuilder for the specified screen.

**Parameters:**
| Parameter | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| screen    | IScreen   | The screen to add the button to |

**Since:** `1.8.4`

### Methods

**See Also:**
- `ButtonWidgetHelper.ButtonBuilder` - Builder for standard buttons
- `ButtonWidgetHelper.TexturedButtonBuilder` - Builder for textured buttons with custom textures

## Usage Examples

### Basic Button Creation
```javascript
// Create a simple button using the builder pattern
const screen = Hud.createScreen("My Custom Screen", true);
const button = new ButtonBuilder(screen)
    .x(50)
    .y(30)
    .width(100)
    .message(Chat.createTextHelperFromString("Click Me!"))
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        Chat.log("Button was clicked!");
    }))
    .createWidget();

screen.addButton(button);
Hud.openScreen(screen);
```

### Button with Tooltips
```javascript
// Create a button with multiple tooltips
const screen = Hud.createScreen("Tooltips Example", true);
const button = new ButtonBuilder(screen)
    .pos(100, 50)
    .size(120, 20)
    .message(Chat.createTextHelperFromString("Hover over me"))
    .setTooltip(
        "This is a tooltip!",
        Chat.createTextHelperFromString("&6Another line with color"),
        Chat.createTextBuilder().append("Third line").withColor(0xFF0000).build()
    )
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Chat.log("Tooltip button clicked!");
    }))
    .createWidget();

screen.addButton(button);
Hud.openScreen(screen);
```

### Dynamic Button Updates
```javascript
// Create buttons that can be dynamically updated
const screen = Hud.createScreen("Dynamic UI", true);
const counterButton = new ButtonBuilder(screen)
    .pos(50, 30)
    .width(150)
    .message(Chat.createTextHelperFromString("Click count: 0"))
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        let count = parseInt(button.getLabel().getString().split(": ")[1]) + 1;
        button.setLabel(`Click count: ${count}`);

        // Disable after 10 clicks
        if (count >= 10) {
            button.setActive(false);
            button.addTooltip("Button disabled after 10 clicks");
        }
    }))
    .createWidget();

screen.addButton(counterButton);
Hud.openScreen(screen);
```

### Note on Textured Buttons
For creating textured buttons with custom textures, see `ButtonWidgetHelper.TexturedButtonBuilder`.

### Button Grid Layout
```javascript
// Create a grid of buttons
function createButtonGrid(screen, cols, rows, startX, startY, spacing) {
    const buttons = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * (80 + spacing);
            const y = startY + row * (25 + spacing);

            const button = new ButtonBuilder(screen)
                .pos(x, y)
                .width(80)
                .zIndex(row * cols + col) // Layer order
                .message(Chat.createTextHelperFromString(`Button ${row * cols + col + 1}`))
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

const screen = Hud.createScreen("Button Grid", true);
const gridButtons = createButtonGrid(screen, 4, 3, 20, 30, 10);
Hud.openScreen(screen);
```

### Toggle Button Pattern
```javascript
// Create a toggle button that switches states
const screen = Hud.createScreen("Toggle Button", true);
let toggleState = false;

const toggleButton = new ButtonBuilder(screen)
    .pos(50, 50)
    .width(120)
    .message(Chat.createTextHelperFromString("Toggle: OFF"))
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        toggleState = !toggleState;
        button.setLabel(`Toggle: ${toggleState ? "ON" : "OFF"}`);

        // Change appearance based on state
        if (toggleState) {
            button.setTooltip("Button is now ON");
        } else {
            button.setTooltip("Button is now OFF");
        }
    }))
    .createWidget();

screen.addButton(toggleButton);
Hud.openScreen(screen);
```

### Button with Confirmation Dialog
```javascript
// Create a button that shows a confirmation dialog
const screen = Hud.createScreen("Confirmation Demo", true);

const dangerousButton = new ButtonBuilder(screen)
    .pos(60, 40)
    .width(140)
    .message(Chat.createTextHelperFromString("&cDelete All Data"))
    .setTooltip("This action cannot be undone!")
    .action(JavaWrapper.methodToJavaAsync((button, screen) => {
        // Create confirmation dialog
        const confirmScreen = Hud.createScreen("Confirm Action", true);

        const confirmBtn = new ButtonBuilder(confirmScreen)
            .pos(30, 50)
            .width(80)
            .message(Chat.createTextHelperFromString("&aConfirm"))
            .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
                Chat.log("Data deleted! (just kidding)");
                Hud.openScreen(screen); // Return to main screen
            }))
            .createWidget();

        const cancelBtn = new ButtonBuilder(confirmScreen)
            .pos(120, 50)
            .width(80)
            .message(Chat.createTextHelperFromString("&cCancel"))
            .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
                Hud.openScreen(screen); // Return to main screen
            }))
            .createWidget();

        const confirmText = Hud.createTextElement()
            .pos(30, 20)
            .text(Chat.createTextHelperFromString("&4Are you sure?"))
            .build();

        confirmScreen.addButton(confirmBtn);
        confirmScreen.addButton(cancelBtn);
        confirmScreen.addText(confirmText);
        Hud.openScreen(confirmScreen);
    }))
    .createWidget();

screen.addButton(dangerousButton);
Hud.openScreen(screen);
```

### Button with Dynamic Tooltips
```javascript
// Create buttons with dynamic tooltips based on game state
const screen = Hud.createScreen("Dynamic Tooltips", true);

function updatePlayerInfoButton() {
    const player = Player.getPlayer();
    if (!player) return;

    const health = player.getHealth().toFixed(1);
    const food = player.getHunger();
    const pos = player.getPos();

    return new ButtonBuilder(screen)
        .pos(50, 30)
        .width(180)
        .message(Chat.createTextHelperFromString("Player Info"))
        .setTooltip(
            `Health: ${health}`,
            `Hunger: ${food}`,
            `Position: ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}`,
            "",
            "Click to refresh stats"
        )
        .action(JavaWrapper.methodToJavaAsync((button, screen) => {
            // Refresh tooltips by recreating the button
            const newButton = updatePlayerInfoButton().createWidget();
            screen.removeButton(button);
            screen.addButton(newButton);
            Chat.log("Player stats refreshed!");
        }))
        .createWidget();
}

const infoButton = updatePlayerInfoButton();
screen.addButton(infoButton);
Hud.openScreen(screen);
```

### Multi-Screen Navigation
```javascript
// Create a navigation system with multiple screens
const mainMenu = Hud.createScreen("Main Menu", true);
const settingsMenu = Hud.createScreen("Settings", true);
const aboutMenu = Hud.createScreen("About", true);

// Main menu buttons
const settingsBtn = new ButtonBuilder(mainMenu)
    .pos(50, 40)
    .width(120)
    .message(Chat.createTextHelperFromString("Settings"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Hud.openScreen(settingsMenu);
    }))
    .createWidget();

const aboutBtn = new ButtonBuilder(mainMenu)
    .pos(50, 70)
    .width(120)
    .message(Chat.createTextHelperFromString("About"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Hud.openScreen(aboutMenu);
    }))
    .createWidget();

const exitBtn = new ButtonBuilder(mainMenu)
    .pos(50, 100)
    .width(120)
    .message(Chat.createTextHelperFromString("&cExit"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Hud.closeScreen();
    }))
    .createWidget();

// Settings menu buttons
const backFromSettings = new ButtonBuilder(settingsMenu)
    .pos(10, 10)
    .width(60)
    .message(Chat.createTextHelperFromString("← Back"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Hud.openScreen(mainMenu);
    }))
    .createWidget();

// About menu buttons
const backFromAbout = new ButtonBuilder(aboutMenu)
    .pos(10, 10)
    .width(60)
    .message(Chat.createTextHelperFromString("← Back"))
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        Hud.openScreen(mainMenu);
    }))
    .createWidget();

// Add all buttons to their screens
mainMenu.addButton(settingsBtn);
mainMenu.addButton(aboutBtn);
mainMenu.addButton(exitBtn);
settingsMenu.addButton(backFromSettings);
aboutMenu.addButton(backFromAbout);

// Open the main menu
Hud.openScreen(mainMenu);
```

## Builder Pattern Usage

The ButtonWidgetHelper classes provide a fluent builder API that makes button creation more readable and maintainable:

```javascript
// Standard approach
const button = new ButtonBuilder(screen)
    .x(50)                    // Set X position
    .y(30)                    // Set Y position
    .width(120)               // Set width (height is always 20)
    .zIndex(5)                // Set rendering order
    .message(textHelper)      // Set button text
    .active(true)             // Enable button
    .visible(true)            // Make button visible
    .alpha(1.0)               // Full opacity
    .setTooltip("Help text")  // Add tooltip
    .action(actionHandler)    // Set click handler
    .createWidget();          // Build the button
```

## Texture Resources

For textured buttons, texture resources can be specified using:

1. **Identifier objects**: `Identifier.of("minecraft:textures/gui/widgets.png")`
2. **String paths**: `"minecraft:textures/gui/widgets.png"`
3. **Texture coordinates**: Some systems support specifying coordinates within a texture atlas

Common Minecraft texture paths:
- `"minecraft:textures/gui/widgets.png"` - Standard UI widgets
- `"minecraft:textures/gui/button.png"` - Button textures
- Custom resource pack textures can also be used

## Error Handling

Button actions are wrapped with error handling to prevent script crashes:

```javascript
const button = new ButtonBuilder(screen)
    .action(JavaWrapper.methodToJavaAsync((btn, scr) => {
        try {
            // Your button logic here
            riskyOperation();
            Chat.log("Button action completed successfully!");
        } catch (error) {
            Chat.log(`Button action failed: ${error.message}`);
        }
    }))
    .createWidget();
```

## Performance Considerations

1. **Z-Index Usage**: Use z-index values sparingly to avoid unnecessary sorting overhead
2. **Tooltip Updates**: Minimize frequent tooltip updates as they can impact hover performance
3. **Button Recycling**: Reuse button objects when possible instead of creating new ones
4. **Action Efficiency**: Keep button action handlers lightweight for responsive UI

## Important Notes

1. **Button Height**: All buttons have a fixed height of 20 pixels. The height parameter in builders is ignored.
2. **Screen Context**: Button actions receive both the button helper and the screen as parameters.
3. **Thread Safety**: Button actions are executed on the main thread by default.
4. **Memory Management**: Remove buttons from screens when they're no longer needed to prevent memory leaks.
5. **State Persistence**: Button states (active, visible, position, etc.) persist until explicitly changed.
6. **Texture Loading**: Custom textures for textured buttons must be available in the resource pack or mod.

## Version History

- **1.8.4**: Initial release with basic button and textured button support
- **1.9.0**: Enhanced textured button texture control methods
- **1.9.3**: Added string-based texture path support for textured buttons
- **Current**: Full feature set with comprehensive builder patterns and error handling

## Related Classes

- `ClickableWidgetHelper` - Parent class providing base widget functionality
- `IScreen` - Interface for custom screens
- `TextHelper` - Helper class for text formatting and styling
- `TextBuilder` - Builder class for creating complex text elements
- `MethodWrapper` - Wrapper for JavaScript methods in Java context
- `Identifier` - Minecraft resource identifier class
- `ButtonWidget` - Minecraft's native button widget class
- `TexturedButtonWidget` - Minecraft's native textured button widget class
- `ButtonWidgetHelper.TexturedButtonBuilder` - Builder for textured buttons with custom textures



