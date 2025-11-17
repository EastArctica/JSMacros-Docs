# ButtonWidgetHelper

A specialized helper for creating and managing interactive button widgets. ButtonWidgetHelper extends ClickableWidgetHelper with button-specific functionality including text styling, action handling, and both regular and textured button variants.

## Methods
- [ButtonWidgetHelper.ButtonBuilder](#buttonwidgethelperbuttonbuilder)
- [ButtonWidgetHelper.TexturedButtonBuilder](#buttonwidgethelpertexturedbuttonbuilder)

## Button Builder

### ButtonWidgetHelper.ButtonBuilder
```js
const screen = Hud.createScreen("Button Builder Demo", false);

// Create a button using the builder pattern
const button = new ButtonWidgetHelper.ButtonBuilder(screen)
    .pos(50, 50)
    .size(150, 20)
    .text("Click Me!")
    .action(JavaWrapper.methodToJava((btn, currentScreen) => {
        Chat.log("Button was clicked!");
        btn.setLabel("Clicked!");
    }))
    .zIndex(1)
    .createWidget();

screen.addWidget(button);
Hud.openScreen(screen);
```

#### Builder Methods

**pos(x: int, y: int)**
- Sets the button position on the screen.

**size(width: int, height: int)**
- Sets the button size. Height is always 20 pixels regardless of input.

**text(label: string | TextHelper)**
- Sets the button text label.

**action(callback: MethodWrapper<ButtonWidgetHelper, IScreen, Object, ?>)**
- Sets the action to execute when the button is clicked.

**zIndex(index: int)**
- Sets the rendering order (higher values render on top).

**createWidget()**
- Creates and returns the ButtonWidgetHelper instance.

## Textured Button Builder

### ButtonWidgetHelper.TexturedButtonBuilder
```js
const screen = Hud.createScreen("Textured Button Demo", false);

// Create a button with custom textures
const texturedButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(50, 50)
    .size(64, 20)
    .text("Custom Button")
    .enabledTexture("minecraft:textures/gui/widgets.png")
    .disabledTexture("minecraft:textures/gui/widgets.png")
    .enabledFocusedTexture("minecraft:textures/gui/widgets.png")
    .disabledFocusedTexture("minecraft:texture/gui/widgets.png")
    .action(JavaWrapper.methodToJava((btn, currentScreen) => {
        Chat.log("Textured button clicked!");
    }))
    .createWidget();

screen.addWidget(texturedButton);
Hud.openScreen(screen);
```

#### Builder Methods

**enabledTexture(texture: string | Identifier)**
- Sets the texture for the enabled button state.

**disabledTexture(texture: string | Identifier)**
- Sets the texture for the disabled button state.

**enabledFocusedTexture(texture: string | Identifier)**
- Sets the texture for the enabled button when hovered/focused.

**disabledFocusedTexture(texture: string | Identifier)**
- Sets the texture for the disabled button when hovered/focused.

All other methods are the same as the regular ButtonBuilder.

## Examples

### Basic Button Creation
```js
function createBasicButtonDemo() {
    const screen = Hud.createScreen("Basic Buttons", false);

    // Simple button
    const simpleBtn = screen.addButton(10, 30, 100, 20, "Simple Button", JavaWrapper.methodToJava(() => {
        Chat.log("Simple button clicked!");
    }));

    // Button with formatted text
    const formattedBtn = screen.addButton(10, 60, 150, 20, "", JavaWrapper.methodToJava(() => {
        Chat.log("Formatted button clicked!");
    }));
    formattedBtn.setLabel(TextHelper.gold("Golden Button"));

    // Button with tooltip
    const tooltipBtn = screen.addButton(10, 90, 120, 20, "Hover Me!", JavaWrapper.methodToJava(() => {
        Chat.log("Tooltip button clicked!");
    }));
    tooltipBtn.setTooltip(
        "This is a helpful tooltip",
        "It can have multiple lines",
        TextHelper.red("And can be formatted!")
    );

    // Toggle button
    let toggleState = false;
    const toggleBtn = screen.addButton(10, 120, 100, 20, "OFF", JavaWrapper.methodToJava(() => {
        toggleState = !toggleState;
        toggleBtn.setLabel(toggleState ? "ON" : "OFF");
        toggleBtn.setLabel(toggleState ? TextHelper.green("ON") : TextHelper.red("OFF"));
    }));

    return screen;
}

Hud.openScreen(createBasicButtonDemo());
```

### Advanced Button Features
```js
function createAdvancedButtonDemo() {
    const screen = Hud.createScreen("Advanced Buttons", false);

    // Button with dynamic action
    let clickCount = 0;
    const counterBtn = screen.addButton(10, 30, 150, 20, "Clicked: 0", JavaWrapper.methodToJava(() => {
        clickCount++;
        counterBtn.setLabel(`Clicked: ${clickCount}`);

        // Change behavior after certain clicks
        if (clickCount === 10) {
            counterBtn.setLabel(TextHelper.gold("Achievement: 10 clicks!"));
            counterBtn.setTooltip("You've reached 10 clicks!");
        }
    }));

    // Button that modifies other buttons
    const disableBtn = screen.addButton(10, 60, 100, 20, "Disable Below", JavaWrapper.methodToJava(() => {
        targetBtn.setActive(!targetBtn.getActive());
        disableBtn.setLabel(targetBtn.getActive() ? "Disable Below" : "Enable Below");
    }));

    const targetBtn = screen.addButton(120, 60, 100, 20, "Target", JavaWrapper.methodToJava(() => {
        Chat.log("Target button clicked!");
    }));

    // Button that repositions itself
    const movingBtn = screen.addButton(10, 90, 120, 20, "Move Me!", JavaWrapper.methodToJava(() => {
        const currentX = movingBtn.getX();
        const newX = currentX > 100 ? 10 : currentX + 50;
        movingBtn.setPos(newX, 90);
    }));

    // Button with delayed action
    const delayBtn = screen.addButton(10, 120, 100, 20, "Delayed", JavaWrapper.methodToJava(() => {
        delayBtn.setLabel("Waiting...");
        delayBtn.setActive(false);

        // Re-enable after 2 seconds (40 ticks)
        Time.sleep(2000).then(() => {
            delayBtn.setLabel("Delayed");
            delayBtn.setActive(true);
            Chat.log("Delay button is ready again!");
        });
    }));

    return screen;
}

Hud.openScreen(createAdvancedButtonDemo());
```

### Button Layout Examples
```js
function createButtonLayoutDemo() {
    const screen = Hud.createScreen("Button Layout", false);

    // Create a grid of buttons
    const buttonGrid = [];
    const rows = 3;
    const cols = 4;
    const buttonWidth = 80;
    const buttonHeight = 20;
    const spacing = 10;
    const startX = 10;
    const startY = 30;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * (buttonWidth + spacing);
            const y = startY + row * (buttonHeight + spacing);
            const buttonNum = row * cols + col + 1;

            const btn = screen.addButton(x, y, buttonWidth, buttonHeight, `Btn ${buttonNum}`, JavaWrapper.methodToJava(() => {
                Chat.log(`Grid button ${buttonNum} clicked!`);
            }));

            buttonGrid.push(btn);
        }
    }

    // Control buttons for the grid
    screen.addButton(10, 120, 100, 20, "Disable All", JavaWrapper.methodToJava(() => {
        buttonGrid.forEach(btn => btn.setActive(false));
    }));

    screen.addButton(120, 120, 100, 20, "Enable All", JavaWrapper.methodToJava(() => {
        buttonGrid.forEach(btn => btn.setActive(true));
    }));

    screen.addButton(230, 120, 100, 20, "Reposition", JavaWrapper.methodToJava(() => {
        buttonGrid.forEach((btn, index) => {
            const newX = 10 + (index % 2) * 160;
            const newY = 30 + Math.floor(index / 2) * 30;
            btn.setPos(newX, newY);
        });
    }));

    return screen;
}

Hud.openScreen(createButtonLayoutDemo());
```

### Custom Button Styles
```js
function createStyledButtonDemo() {
    const screen = Hud.createScreen("Styled Buttons", false);

    // Buttons with different styles using TextHelper
    const styles = [
        { text: "Red Button", color: TextHelper.red },
        { text: "Green Button", color: TextHelper.green },
        { text: "Blue Button", color: TextHelper.blue },
        { text: "Gold Button", color: TextHelper.gold },
        { text: "Italic Button", color: (text) => TextHelper.italic(text) },
        { text: "Bold Button", color: (text) => TextHelper.bold(text) },
        { text: "Underlined", color: (text) => TextHelper.underlined(text) }
    ];

    styles.forEach((style, index) => {
        const y = 30 + index * 25;
        const btn = screen.addButton(10, y, 150, 20, "", JavaWrapper.methodToJava(() => {
            Chat.log(`${style.text} clicked!`);
        }));
        btn.setLabel(style.color(style.text));
    });

    return screen;
}

Hud.openScreen(createStyledButtonDemo());
```

### Using Button Builder for Complex Setups
```js
function createBuilderButtonDemo() {
    const screen = Hud.createScreen("Builder Pattern", false);

    // Create buttons using builder pattern for better organization
    const actionButtons = [
        new ButtonWidgetHelper.ButtonBuilder(screen)
            .pos(10, 30)
            .size(100, 20)
            .text("Action 1")
            .action(JavaWrapper.methodToJava((btn, scr) => {
                Chat.log("Action 1 executed!");
            }))
            .tooltip("This is action button 1")
            .createWidget(),

        new ButtonWidgetHelper.ButtonBuilder(screen)
            .pos(120, 30)
            .size(100, 20)
            .text("Action 2")
            .action(JavaWrapper.methodToJava((btn, scr) => {
                Chat.log("Action 2 executed!");
            }))
            .tooltip("This is action button 2")
            .zIndex(1)
            .createWidget()
    ];

    // Navigation buttons
    const navButtons = [
        new ButtonWidgetHelper.ButtonBuilder(screen)
            .pos(10, 60)
            .size(80, 20)
            .text("Back")
            .action(JavaWrapper.methodToJava((btn, scr) => {
                Chat.log("Navigation: Back");
            }))
            .createWidget(),

        new ButtonWidgetHelper.ButtonBuilder(screen)
            .pos(100, 60)
            .size(80, 20)
            .text("Home")
            .action(JavaWrapper.methodToJava((btn, scr) => {
                Chat.log("Navigation: Home");
            }))
            .createWidget(),

        new ButtonWidgetHelper.ButtonBuilder(screen)
            .pos(190, 60)
            .size(80, 20)
            .text("Forward")
            .action(JavaWrapper.methodToJava((btn, scr) => {
                Chat.log("Navigation: Forward");
            }))
            .createWidget()
    ];

    // Add all buttons to screen
    [...actionButtons, ...navButtons].forEach(btn => screen.addWidget(btn));

    return screen;
}

Hud.openScreen(createBuilderButtonDemo());
```

**Notes**
- ButtonWidgetHelper provides the most common way to create interactive UI elements
- The builder pattern allows for clean, chainable button configuration
- Textured buttons support custom appearance for different button states
- Button height is fixed at 20 pixels for consistency with Minecraft's UI
- All positioning is relative to the containing screen
- Buttons automatically handle mouse events and visual feedback
- Use TextHelper for formatted button text (colors, styles, etc.)
- Tooltips enhance user experience by providing contextual help
- The `action` callback receives both the button helper and the screen as parameters