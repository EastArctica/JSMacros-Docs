# ScriptScreen

The foundational class for creating custom interactive screens in JsMacros. ScriptScreen provides a base screen that can be customized with widgets, text, and interactive elements. This is the main way to create custom GUIs for your scripts.

## Methods
- [ScriptScreen.setParent](#scriptscreensetparent)
- [ScriptScreen.setOnRender](#scriptscreensetonrender)

## Methods

### ScriptScreen.setParent
```js
const screen = Hud.createScreen("Child Screen", true);
const parentScreen = Hud.createScreen("Parent Screen", true);

screen.setParent(parentScreen);
// When child screen closes, it will return to the parent screen
```

**Params**
1. `parent: IScreen`: The parent screen to return to when this screen closes.

**Returns**
* `void`

### ScriptScreen.setOnRender
```js
const screen = Hud.createScreen("Custom Render Screen", false);

screen.setOnRender(JavaWrapper.methodToJava((mousePos, drawContext) => {
    // mousePos contains {x: mouseX, y: mouseY, z: tickDelta}
    const mouseX = mousePos.getX();
    const mouseY = mousePos.getY();

    // Custom rendering logic here
    // This is called every frame while the screen is open

    // Example: Draw a custom background pattern
    for (let i = 0; i < 10; i++) {
        screen.addText(`Line ${i}`, 10, 20 + i * 15, 0xFFFFFF, true);
    }
}));

Hud.openScreen(screen);
```

**Params**
1. `onRender: MethodWrapper<Pos3D, DrawContext, Object, ?>`: A function to call every frame during rendering.

**Returns**
* `void`

**Notes**
- The callback receives a `Pos3D` object with mouse coordinates and tick delta
- The second parameter is the DrawContext for advanced rendering operations
- This method is called every frame while the screen is visible
- Use this for dynamic content, animations, or custom drawing
- Errors in the callback will be caught and logged, but the callback will be disabled after an error

## Properties

### Screen Display Options

```js
const screen = Hud.createScreen("Configurable Screen", false);

// Control whether the screen shows a title
screen.drawTitle = true; // Show title (default: true)
screen.drawTitle = false; // Hide title

// Control whether ESC key closes the screen
screen.shouldCloseOnEsc = true; // ESC closes screen (default: true)
screen.shouldCloseOnEsc = false; // ESC doesn't close screen

// Control whether game pauses when screen is open
screen.shouldPause = true; // Game pauses (default: true)
screen.shouldPause = false; // Game continues running
```

## Examples

### Basic Screen with Widgets
```js
// Create a screen with dirt background
const screen = Hud.createScreen("My GUI", true);

// Add a simple button
const button = screen.addButton(10, 10, 100, 20, "Click Me!", JavaWrapper.methodToJava(() => {
    Chat.log("Button was clicked!");
}));

// Add some text
screen.addText("Welcome to my GUI!", 10, 50, 0xFFFFFF, true);

// Open the screen
Hud.openScreen(screen);
```

### Screen with Custom Rendering
```js
const screen = Hud.createScreen("Dynamic Display", false);

let counter = 0;

screen.setOnRender(JavaWrapper.methodToJava((mousePos, drawContext) => {
    // Clear previous content (screens don't auto-clear dynamic content)

    // Update counter every second (approximate)
    if (Client.getTick() % 20 === 0) {
        counter++;
    }

    // Display dynamic information
    screen.addText(`Time: ${counter}`, 10, 30, 0x00FF00, true);
    screen.addText(`Mouse: ${Math.floor(mousePos.getX())}, ${Math.floor(mousePos.getY())}`, 10, 50, 0xFFFF00, true);
    screen.addText(`FPS: ${Client.getFPS()}`, 10, 70, 0x00FFFF, true);
}));

Hud.openScreen(screen);
```

### Configuration Screen
```js
function createConfigScreen() {
    const screen = Hud.createScreen("Settings", false);

    // Add toggle buttons for settings
    let setting1 = false;
    let setting2 = true;

    const toggle1 = screen.addButton(10, 30, 200, 20, `Setting 1: ${setting1 ? "ON" : "OFF"}`, JavaWrapper.methodToJava(() => {
        setting1 = !setting1;
        toggle1.setLabel(`Setting 1: ${setting1 ? "ON" : "OFF"}`);
    }));

    const toggle2 = screen.addButton(10, 60, 200, 20, `Setting 2: ${setting2 ? "ON" : "OFF"}`, JavaWrapper.methodToJava(() => {
        setting2 = !setting2;
        toggle2.setLabel(`Setting 2: ${setting2 ? "ON" : "OFF"}`);
    }));

    // Add a save button
    screen.addButton(10, 100, 100, 20, "Save", JavaWrapper.methodToJava(() => {
        // Save settings logic here
        Chat.log("Settings saved!");
        Hud.openScreen(null); // Close screen
    }));

    // Add a cancel button
    screen.addButton(120, 100, 100, 20, "Cancel", JavaWrapper.methodToJava(() => {
        Hud.openScreen(null); // Close screen
    }));

    return screen;
}

const configScreen = createConfigScreen();
Hud.openScreen(configScreen);
```

### Screen with Input Fields
```js
const screen = Hud.createScreen("Input Form", false);

// Add text input fields
const nameField = screen.addTextField(10, 30, 200, 20, "Enter your name");
nameField.setMaxLength(20);

const messageField = screen.addTextField(10, 60, 200, 20, "Enter a message");
messageField.setMaxLength(100);

// Add submit button
screen.addButton(10, 90, 100, 20, "Submit", JavaWrapper.methodToJava(() => {
    const name = nameField.getText();
    const message = messageField.getText();

    if (name && message) {
        Chat.log(`${name} says: ${message}`);
        Hud.openScreen(null);
    } else {
        Chat.log("Please fill in all fields!");
    }
}));

Hud.openScreen(screen);
```

**Notes**
- ScriptScreen automatically handles widget positioning and interaction
- Use `drawTitle` to control whether the screen title is displayed
- Set `shouldCloseOnEsc` to false for screens that shouldn't be closed with ESC (requires custom close button)
- Use `shouldPause` to control whether the game pauses when the screen is open
- The `setOnRender` callback is perfect for dynamic content, animations, or real-time data display
- Widget coordinates are relative to the screen's top-left corner (0, 0)
- Screens automatically handle mouse input for their widgets