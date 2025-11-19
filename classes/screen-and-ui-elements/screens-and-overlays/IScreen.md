# IScreen

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.IScreen`

**Implements:** `IDraw2D<IScreen>`

The `IScreen` class is a powerful interface for creating and managing custom GUI screens in JSMacros. It provides comprehensive functionality for drawing graphics, adding interactive widgets, handling user input, and managing screen lifecycle events. IScreen serves as the foundation for creating custom user interfaces, overlays, and interactive displays within Minecraft.

This interface extends `IDraw2D<IScreen>`, inheriting all drawing capabilities including text rendering, shapes, images, items, and lines, while adding screen-specific functionality like widgets, event handling, and screen management.

IScreen instances are typically created through screen events or by using `ScriptScreen` for custom script-driven interfaces.

## Constructors

IScreen instances are not typically created directly by scripters. Instead, they are obtained through:

- Screen-related events (e.g., `OpenScreen`, `ScreenTick`)
- The `ScriptScreen` class for custom interfaces
- Access to existing game screens through events
- Factory methods provided by the JSMacros API

## Methods

### Screen Information

- [screen.getScreenClassName()](#screengetclassname)
- [screen.getTitleText()](#screengettitletext)
- [screen.getWidth()](#screengetwidth) *(inherited from IDraw2D)*
- [screen.getHeight()](#screengetheight) *(inherited from IDraw2D)*

### Widget Management

- [screen.getButtonWidgets()](#screengetbuttonwidgets)
- [screen.getTextFields()](#screengettextfields)

### Widget Creation

- [screen.addButton()](#screenaddbutton)
- [screen.addCheckbox()](#screenaddcheckbox)
- [screen.addSlider()](#screenaddslider)
- [screen.addLockButton()](#screenaddlockbutton)
- [screen.addCyclingButton()](#screenaddcyclingbutton)
- [screen.addTextInput()](#screenaddtextinput)

### Widget Builders

- [screen.buttonBuilder()](#screenbuttonbuilder)
- [screen.checkBoxBuilder()](#screencheckboxbuilder)
- [screen.sliderBuilder()](#screensliderbuilder)
- [screen.lockButtonBuilder()](#screenlockbuttonbuilder)
- [screen.cyclicButtonBuilder()](#screencyclicbuttonbuilder)
- [screen.textFieldBuilder()](#screentextfieldbuilder)
- [screen.texturedButtonBuilder()](#screentexturedbuttonbuilder)

### Event Handling

- [screen.setOnMouseDown()](#screensetonmousedown)
- [screen.setOnMouseDrag()](#screensetonmousedrag)
- [screen.setOnMouseUp()](#screensetonmouseup)
- [screen.setOnScroll()](#screensetonscroll)
- [screen.setOnKeyPressed()](#screensetonkeypressed)
- [screen.setOnCharTyped()](#screensetonchartyped)
- [screen.setOnClose()](#screensetonclose)

### Screen Control

- [screen.close()](#screenclose)
- [screen.reloadScreen()](#screenreloadscreen)

### Input State

- [screen.isShiftDown()](#screenisshiftdown)
- [screen.isCtrlDown()](#screenisctrldown)
- [screen.isAltDown()](#screenisaltdown)

### Drawing Methods *(inherited from IDraw2D)*

- **Text Rendering:** `addText()`, `removeText()`, `textBuilder()`
- **Shapes:** `addRect()`, `addLine()`, `removeRect()`, `removeLine()`, `rectBuilder()`, `lineBuilder()`
- **Images:** `addImage()`, `removeImage()`, `imageBuilder()`
- **Items:** `addItem()`, `removeItem()`, `itemBuilder()`
- **Elements:** `addDraw2D()`, `removeDraw2D()`, `getElements()`, `removeElement()`, `reAddElement()`

---

## Screen Information

## Widget Management

## Widget Creation

## Widget Builders

## Event Handling

## Screen Control

## Input State

## Usage Examples

### Complete Custom GUI Application
```js
// Create a comprehensive custom GUI application
function createApplication() {
    const screen = new ScriptScreen("JSMacros Control Panel", true);

    // Title
    screen.addText(screen.getWidth() / 2 - 100, 20, 0xFFFFFF, "JSMacros Control Panel", true, 2.0, 0);

    // Tab system using cycling buttons
    const tabs = ["Player", "World", "Scripts", "Settings"];
    const currentTab = { value: "Player" };

    // Tab buttons
    tabs.forEach((tab, index) => {
        const tabBtn = screen.addCyclingButton(
            50 + index * 80, 60, 70, 20,
            [tab], tab,
            JavaWrapper.methodToJava((btn) => {
                currentTab.value = btn.getValue();
                screen.reloadScreen();
            })
        );
    });

    // Content areas
    function drawContent() {
        const y = 100;

        if (currentTab.value === "Player") {
            // Player info tab
            const player = Player.getPlayer();
            if (player) {
                screen.addText(50, y, 0x00FF00, `Player: ${player.getName().getString()}`, true);
                screen.addText(50, y + 20, 0xFFFFFF, `Health: ${player.getHealth()}/${player.getMaxHealth()}`, true);
                screen.addText(50, y + 40, 0xFFFFFF, `Position: ${Math.floor(player.getX())}, ${Math.floor(player.getY())}, ${Math.floor(player.getZ())}`, true);
                screen.addText(50, y + 60, 0xFFFFFF, `Game Mode: ${player.getGameMode()}`, true);
            }

            // Player actions
            screen.addButton(50, y + 90, 120, 20, "Heal Player", JavaWrapper.methodToJava((btn) => {
                // Note: This would require additional permissions or server-side mod
                Chat.log("Heal player action requested");
            }));

        } else if (currentTab.value === "World") {
            // World info tab
            screen.addText(50, y, 0x00FFFF, "World Information", true);

            const entities = World.getEntities();
            screen.addText(50, y + 20, 0xFFFFFF, `Entities loaded: ${entities.length}`, true);

            const player = Player.getPlayer();
            if (player) {
                const biome = player.getBiome();
                screen.addText(50, y + 40, 0xFFFFFF, `Current biome: ${biome}`, true);

                const time = World.getTime();
                screen.addText(50, y + 60, 0xFFFFFF, `World time: ${time}`, true);
            }

        } else if (currentTab.value === "Scripts") {
            // Scripts management tab
            screen.addText(50, y, 0xFFFF00, "Script Management", true);
            screen.addText(50, y + 20, 0x808080, "Script status and controls", true);

            // Script controls
            screen.addButton(50, y + 50, 100, 20, "Reload Scripts", JavaWrapper.methodToJava((btn) => {
                Chat.log("Script reload requested");
            }));

            screen.addButton(160, y + 50, 100, 20, "Script Stats", JavaWrapper.methodToJava((btn) => {
                Chat.log("Script statistics requested");
            }));

        } else if (currentTab.value === "Settings") {
            // Settings tab
            screen.addText(50, y, 0xFF00FF, "Application Settings", true);

            // Settings checkboxes
            screen.addCheckbox(50, y + 20, 200, 20, "Enable Notifications", true,
                JavaWrapper.methodToJava((box) => {
                    Chat.log(`Notifications: ${box.isChecked() ? "enabled" : "disabled"}`);
                }));

            screen.addCheckbox(50, y + 45, 200, 20, "Auto-save Settings", false,
                JavaWrapper.methodToJava((box) => {
                    Chat.log(`Auto-save: ${box.isChecked() ? "enabled" : "disabled"}`);
                }));

            // Settings slider
            screen.addSlider(50, y + 70, 200, 20, "Update Rate", 50, 100,
                JavaWrapper.methodToJava((slider) => {
                    const rate = Math.floor(slider.getValue());
                    Chat.log(`Update rate: ${rate}%`);
                }));
        }
    }

    drawContent();

    // Bottom controls
    screen.addButton(50, screen.getHeight() - 30, 100, 20, "Refresh", JavaWrapper.methodToJava((btn) => {
        screen.reloadScreen();
    }));

    screen.addButton(screen.getWidth() - 150, screen.getHeight() - 30, 100, 20, "Close", JavaWrapper.methodToJava((btn) => {
        screen.close();
    }));

    // Auto-refresh every 2 seconds
    const refreshInterval = setInterval(() => {
        if (currentTab.value === "Player" || currentTab.value === "World") {
            screen.reloadScreen();
            drawContent();
        }
    }, 2000);

    screen.setOnClose(JavaWrapper.methodToJava((closingScreen) => {
        clearInterval(refreshInterval);
        Chat.log("Control Panel closed - auto-refresh stopped");
    }));

    return screen;
}

// Launch the application
Client.openScreen(createApplication());
```

### Interactive Drawing Tool
```js
// Create an interactive drawing and annotation tool
function createDrawingTool() {
    const screen = new ScriptScreen("Drawing Tool", true);
    const elements = [];
    let currentTool = "line";
    let currentColor = 0xFF0000;
    let startPos = null;

    // Tool selection
    screen.addText(50, 20, 0xFFFFFF, "Drawing Tool - Select a tool:", true);

    const tools = ["line", "rect", "circle", "text"];
    tools.forEach((tool, index) => {
        screen.addCyclingButton(
            50 + index * 80, 45, 70, 20,
            [tool], currentTool === tool ? tool : tools[index],
            JavaWrapper.methodToJava((btn) => {
                currentTool = btn.getValue();
                Chat.log(`Selected tool: ${currentTool}`);
            })
        );
    });

    // Color picker
    const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0xFFFFFF];
    colors.forEach((color, index) => {
        screen.addRect(50 + index * 25, 80, 70 + index * 25, 100, color, 255);
        screen.addButton(50 + index * 25, 80, 20, 20, "", JavaWrapper.methodToJava((btn) => {
            currentColor = color;
            Chat.log(`Color selected: ${color.toString(16)}`);
        }));
    });

    // Drawing area
    screen.addText(50, 110, 0xFFFFFF, "Click and drag to draw:", true);

    // Mouse event handlers
    screen.setOnMouseDown(JavaWrapper.methodToJava((pos, button) => {
        if (button === 1 && pos.y > 120) { // Left click in drawing area
            startPos = pos;
            Chat.log(`Started drawing ${currentTool} at ${pos.x}, ${pos.y}`);
        }
    }));

    screen.setOnMouseUp(JavaWrapper.methodToJava((pos, button) => {
        if (button === 1 && startPos && pos.y > 120) {
            let element = null;

            if (currentTool === "line") {
                element = screen.addLine(startPos.x, startPos.y, pos.x, pos.y, currentColor, 2.0);
            } else if (currentTool === "rect") {
                element = screen.addRect(
                    Math.min(startPos.x, pos.x), Math.min(startPos.y, pos.y),
                    Math.max(startPos.x, pos.x), Math.max(startPos.y, pos.y),
                    currentColor, 128
                );
            } else if (currentTool === "circle") {
                // Approximate circle with small lines
                const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
                const segments = 32;
                for (let i = 0; i < segments; i++) {
                    const angle1 = (i / segments) * 2 * Math.PI;
                    const angle2 = ((i + 1) / segments) * 2 * Math.PI;
                    const x1 = startPos.x + radius * Math.cos(angle1);
                    const y1 = startPos.y + radius * Math.sin(angle1);
                    const x2 = startPos.x + radius * Math.cos(angle2);
                    const y2 = startPos.y + radius * Math.sin(angle2);
                    screen.addLine(x1, y1, x2, y2, currentColor, 1.0);
                }
            }

            if (element) {
                elements.push(element);
                Chat.log(`Drew ${currentTool} from ${startPos.x},${startPos.y} to ${pos.x},${pos.y}`);
            }

            startPos = null;
        }
    }));

    // Controls
    screen.addButton(50, screen.getHeight() - 60, 100, 20, "Clear All", JavaWrapper.methodToJava((btn) => {
        elements.forEach(element => screen.removeElement(element));
        elements.length = 0;
        screen.reloadScreen();
        Chat.log("All drawings cleared");
    }));

    screen.addButton(160, screen.getHeight() - 60, 100, 20, "Undo Last", JavaWrapper.methodToJava((btn) => {
        if (elements.length > 0) {
            const lastElement = elements.pop();
            screen.removeElement(lastElement);
            Chat.log("Undid last drawing");
        }
    }));

    screen.addButton(50, screen.getHeight() - 30, 100, 20, "Save Drawing", JavaWrapper.methodToJava((btn) => {
        Chat.log(`Drawing saved with ${elements.length} elements`);
    }));

    screen.addButton(160, screen.getHeight() - 30, 100, 20, "Close", JavaWrapper.methodToJava((btn) => {
        screen.close();
    }));

    // Instructions
    screen.addText(300, 120, 0x808080, "Instructions:", true);
    screen.addText(300, 140, 0x808080, "1. Select a tool (line, rect, circle)", true);
    screen.addText(300, 160, 0x808080, "2. Choose a color from palette", true);
    screen.addText(300, 180, 0x808080, "3. Click and drag to draw", true);
    screen.addText(300, 200, 0x808080, "4. Use controls to manage drawings", true);

    return screen;
}

Client.openScreen(createDrawingTool());
```

---

## Important Notes

### Screen Lifecycle
- Screens are automatically managed by Minecraft's screen system
- Always provide a way for users to close your screens (ESC key or close button)
- Use `setOnClose()` to clean up resources when screens close
- Screen instances become invalid after being closed

### Event Handling
- Event callbacks are executed on the main thread
- Avoid long-running operations in event handlers
- Use `setTimeout()` or intervals for background tasks
- Key codes and mouse button codes follow Minecraft's conventions

### Performance Considerations
- Limit the number of elements on a screen for better performance
- Use `reloadScreen()` sparingly as it recreates all elements
- Consider using z-index layering for complex layouts
- Remove unused elements to prevent memory leaks

### Thread Safety
- All screen operations must be performed on the main thread
- Use proper synchronization when accessing shared data from multiple threads
- Event handlers provide thread-safe access to screen elements

### Version Compatibility
- Some methods may have different behavior across Minecraft versions
- Builder patterns are preferred for complex widget creation
- Older methods may be deprecated but still functional
- Always check the "Since" version in documentation

### Integration with Other JSMacros Features
- Screens work seamlessly with JSMacros events system
- Can access World, Player, and other global helpers
- Support for MethodWrapper callbacks for Java interop
- Compatible with JSMacros script lifecycle management

---

## Related Classes

### Widget Helpers
- `ClickableWidgetHelper` - Base class for interactive widgets
- `ButtonWidgetHelper` - Button-specific functionality and builders
- `TextFieldWidgetHelper` - Text input field management
- `CheckBoxWidgetHelper` - Checkbox widget controls
- `SliderWidgetHelper` - Slider widget for numeric input
- `LockButtonWidgetHelper` - Lock/unlock toggle buttons
- `CyclingButtonWidgetHelper` - Multi-value cycling buttons

### Drawing Elements
- `RenderElement` - Base class for all drawable elements
- `Text` - Text rendering with font, color, and formatting
- `Rect` - Rectangle and shape drawing
- `Line` - Line drawing with width and color
- `Image` - Texture and image rendering
- `Item` - Minecraft item icon rendering
- `Draw2DElement` - Container for nested 2D drawings

### Core Classes
- `ScriptScreen` - Scriptable screen implementation
- `IDraw2D` - 2D drawing interface and methods
- `TextHelper` - Text formatting and styling
- `MethodWrapper` - JavaScript to Java method bridging

### Math and Position
- `Pos2D` - 2D coordinate and vector operations
- `Pos3D` - 3D coordinate and vector operations
- `Vec2D` - 2D vector mathematics

---

## Version Information

- Available since JSMacros 1.0.5
- Extensively updated in 1.8.4 with builder patterns and new widget types
- Drawing functionality inherited from IDraw2D since 1.2.7
- Event handling system available since 1.2.7
- Widget builder patterns added in 1.8.4 for improved usability