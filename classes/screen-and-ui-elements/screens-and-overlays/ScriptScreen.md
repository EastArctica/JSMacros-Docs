# ScriptScreen

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.ScriptScreen`

**Extends:** `BaseScreen`

**Implements:** `IScreen`

The `ScriptScreen` class is a powerful custom screen implementation for JSMacros that allows scripters to create custom user interfaces with buttons, text fields, sliders, checkboxes, and other UI elements. This class provides a foundation for building interactive GUIs, configuration screens, custom menus, and complex user interfaces within Minecraft.

ScriptScreen extends BaseScreen and implements the IScreen interface, giving it access to comprehensive screen management capabilities including widget creation, event handling, rendering control, and user input processing. The class supports both dark and transparent backgrounds, custom rendering hooks, and flexible screen behavior configuration.

## Table of Contents

- [Constructors](#constructors)
- [Screen Configuration](#screen-configuration)
- [Event Handling](#event-handling)
- [Rendering Control](#rendering-control)
- [Widget Management](#widget-management)
- [Screen Navigation](#screen-navigation)
- [Inherited IScreen Methods](#inherited-iscreen-methods)
- [Usage Examples](#usage-examples)

## Constructors

### `new ScriptScreen(title, dirt)`
Creates a new ScriptScreen with the specified title and background style.

**Parameters:**
- `title` (string): The title text displayed at the top of the screen
- `dirt` (boolean): Background style - `true` for dark dirt background, `false` for standard transparent background

**Example:**
```js
// Create a screen with dark background
const configScreen = new ScriptScreen("Configuration Menu", true);

// Create a screen with transparent background
const helpScreen = new ScriptScreen("Help", false);
```

---

## Screen Configuration

## Event Handling

## Rendering Control

### Background Styles
The ScriptScreen supports two different background styles based on the `dirt` parameter in the constructor:

- **Dark Background** (`dirt = true`): Renders a dark dirt texture background, similar to Minecraft's default menu screens
- **Transparent Background** (`dirt = false`): Renders a standard semi-transparent background

### Custom Rendering Order
The screen renders elements in the following order:
1. Background (dark or transparent)
2. Title text (if `drawTitle` is enabled)
3. Child elements (buttons, text fields, etc.)
4. Custom render callback (`setOnRender`)
5. Additional JSMacros render hooks

---

## Widget Management

ScriptScreen inherits comprehensive widget management capabilities from the IScreen interface. Here are the key methods:

### Button Creation
```js
// Simple button
const myButton = screen.addButton(10, 50, 100, 20, "Click Me",
    JavaWrapper.methodToJavaAsync((btn) => {
        Chat.log("Button clicked!");
    })
);

// Button with z-index (layering)
const layeredButton = screen.addButton(10, 80, 100, 20, 5, "Layered",
    JavaWrapper.methodToJavaAsync((btn) => {
        Chat.log("Layered button clicked!");
    })
);
```

### Text Input Fields
```js
const textField = screen.addTextInput(10, 120, 200, 20, "Enter text...",
    JavaWrapper.methodToJavaAsync((text) => {
        Chat.log(`Text changed: ${text}`);
    })
);

// Text input with z-index
const layeredField = screen.addTextInput(10, 150, 200, 20, 10, "Layered input",
    JavaWrapper.methodToJavaAsync((text) => {
        Chat.log(`Layered text: ${text}`);
    })
);
```

### Checkboxes
```js
const checkbox = screen.addCheckbox(10, 180, 200, 20, "Enable feature", false,
    JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Checkbox state: ${cb.isChecked()}`);
    })
);

// Checkbox with message
const messageCheckbox = screen.addCheckbox(10, 210, 200, 20, "Show notifications", true, true,
    JavaWrapper.methodToJavaAsync((cb) => {
        Chat.log(`Notifications: ${cb.isChecked()}`);
    })
);
```

### Sliders
```js
const slider = screen.addSlider(10, 240, 200, 20, "Volume", 50.0, 100,
    JavaWrapper.methodToJavaAsync((slider) => {
        Chat.log(`Slider value: ${slider.getValue()}`);
    })
);

// Continuous slider (without steps)
const continuousSlider = screen.addSlider(10, 270, 200, 20, "Brightness", 0.5,
    JavaWrapper.methodToJavaAsync((slider) => {
        Chat.log(`Brightness: ${(slider.getValue() * 100).toFixed(0)}%`);
    })
);
```

---

## Screen Navigation

## Inherited IScreen Methods

ScriptScreen implements the full IScreen interface, providing access to:

### Input Event Handling
- `setOnMouseDown(callback)` - Mouse press events
- `setOnMouseDrag(callback)` - Mouse drag events
- `setOnMouseUp(callback)` - Mouse release events
- `setOnScroll(callback)` - Mouse wheel events
- `setOnKeyPressed(callback)` - Keyboard key press events
- `setOnCharTyped(callback)` - Character input events

### Widget Access
- `getButtonWidgets()` - Get all button widgets
- `getTextFields()` - Get all text input fields
- `buttonBuilder()` - Create buttons using builder pattern
- `checkBoxBuilder()` - Create checkboxes using builder pattern
- `textFieldBuilder()` - Create text fields using builder pattern
- And many more widget creation methods

### Utility Methods
- `getTitleText()` - Get screen title as TextHelper
- `getScreenClassName()` - Get the class name
- `isShiftDown()` - Check if shift key is pressed
- `isCtrlDown()` - Check if control key is pressed
- `isAltDown()` - Check if alt key is pressed

---

## Usage Examples

### Basic Configuration Screen
```js
// Create a simple configuration screen
function createConfigScreen() {
    const screen = new ScriptScreen("Script Configuration", true);

    // Configuration values
    const config = {
        enabled: true,
        volume: 50,
        playerName: "Player",
        notifications: false
    };

    // Enable/Disable checkbox
    screen.addCheckbox(20, 60, 200, 20, "Enable Script", config.enabled,
        JavaWrapper.methodToJavaAsync((cb) => {
            config.enabled = cb.isChecked();
            Chat.log(`Script ${config.enabled ? 'enabled' : 'disabled'}`);
        })
    );

    // Volume slider
    screen.addSlider(20, 90, 200, 20, "Volume", config.volume / 100, 100,
        JavaWrapper.methodToJavaAsync((slider) => {
            config.volume = Math.floor(slider.getValue() * 100);
            Chat.log(`Volume set to ${config.volume}%`);
        })
    );

    // Player name input
    screen.addTextInput(20, 120, 200, 20, "Enter player name...",
        JavaWrapper.methodToJavaAsync((text) => {
            config.playerName = text;
        })
    );

    // Notifications checkbox
    screen.addCheckbox(20, 150, 200, 20, "Show Notifications", config.notifications, true,
        JavaWrapper.methodToJavaAsync((cb) => {
            config.notifications = cb.isChecked();
            Chat.log(`Notifications ${config.notifications ? 'enabled' : 'disabled'}`);
        })
    );

    // Save button
    screen.addButton(20, 200, 80, 20, "Save",
        JavaWrapper.methodToJavaAsync((btn) => {
            Chat.log("Configuration saved!");
            Chat.log(JSON.stringify(config));
            screen.close();
        })
    );

    // Cancel button
    screen.addButton(120, 200, 80, 20, "Cancel",
        JavaWrapper.methodToJavaAsync((btn) => {
            Chat.log("Configuration cancelled");
            screen.close();
        })
    );

    return screen;
}

// Open the configuration screen
const configScreen = createConfigScreen();
Client.getCurrentScreen().openScreen(configScreen);
```

### Dynamic Content Screen
```js
// Create a screen that updates its content dynamically
function createDynamicScreen() {
    const screen = new ScriptScreen("Dynamic Content Demo", false);
    screen.shouldPause = false;

    let counter = 0;
    let items = ["Item 1", "Item 2", "Item 3"];
    let selectedItem = 0;

    // Display current stats
    const updateDisplay = () => {
        screen.reloadScreen();
    };

    // Counter display
    screen.addButton(20, 50, 150, 20, `Count: ${counter}`,
        JavaWrapper.methodToJavaAsync((btn) => {
            counter++;
            btn.setText(`Count: ${counter}`);
        })
    );

    // Add item button
    screen.addButton(20, 80, 100, 20, "Add Item",
        JavaWrapper.methodToJavaAsync((btn) => {
            items.push(`Item ${items.length + 1}`);
            updateDisplay();
            Chat.log(`Added item. Total: ${items.length}`);
        })
    );

    // Remove item button
    screen.addButton(130, 80, 100, 20, "Remove Item",
        JavaWrapper.methodToJavaAsync((btn) => {
            if (items.length > 0) {
                items.pop();
                if (selectedItem >= items.length) {
                    selectedItem = Math.max(0, items.length - 1);
                }
                updateDisplay();
                Chat.log(`Removed item. Total: ${items.length}`);
            }
        })
    );

    // Create item selection buttons dynamically
    const createItemButtons = () => {
        for (let i = 0; i < items.length; i++) {
            const y = 120 + (i * 25);
            const isSelected = i === selectedItem;

            screen.addButton(20, y, 150, 20, `${isSelected ? "> " : ""}${items[i]}`,
                JavaWrapper.methodToJavaAsync((btn) => {
                    selectedItem = i;
                    updateDisplay();
                    Chat.log(`Selected: ${items[i]}`);
                })
            );
        }
    };

    // Custom rendering for additional information
    screen.setOnRender(JavaWrapper.methodToJavaAsync((pos, drawContext) => {
        // Draw info box
        const infoY = 120 + (items.length * 25) + 20;
        Hud.drawRect(20, infoY, 200, 80, 0x40000000);
        Hud.drawString(`Selected Index: ${selectedItem}`, 25, infoY + 5, 0xFFFFFF);
        Hud.drawString(`Total Items: ${items.length}`, 25, infoY + 20, 0xFFFFFF);
        Hud.drawString(`Counter Value: ${counter}`, 25, infoY + 35, 0xFFFFFF);

        if (selectedItem < items.length) {
            Hud.drawString(`Selected: ${items[selectedItem]}`, 25, infoY + 50, 0x00FF00);
        }
    }));

    // Set up close handler
    screen.setOnClose(JavaWrapper.methodToJavaAsync((closedScreen) => {
        Chat.log("Dynamic screen closed");
        Chat.log(`Final state: Counter=${counter}, Items=${items.length}`);
    }));

    // Initial content setup
    createItemButtons();

    return screen;
}

// Open the dynamic screen
const dynamicScreen = createDynamicScreen();
Client.getCurrentScreen().openScreen(dynamicScreen);
```

### Interactive Game Tool Screen
```js
// Create a screen for a game utility tool
function createToolScreen() {
    const screen = new ScriptScreen("Block Analyzer", true);

    // Tool settings
    const settings = {
        scanRadius: 10,
        targetBlock: "minecraft:diamond_ore",
        showCoordinates: true,
        autoSave: false,
        highlightColor: 0xFF0000
    };

    // Scan radius slider
    screen.addSlider(20, 60, 200, 20, "Scan Radius", settings.scanRadius / 50, 50,
        JavaWrapper.methodToJavaAsync((slider) => {
            settings.scanRadius = Math.floor(slider.getValue() * 50);
            slider.setText(`Scan Radius: ${settings.scanRadius} blocks`);
        })
    );

    // Block type selector using cycling button
    const blockTypes = ["minecraft:diamond_ore", "minecraft:iron_ore", "minecraft:gold_ore", "minecraft:coal_ore"];
    const blockNames = ["Diamond Ore", "Iron Ore", "Gold Ore", "Coal Ore"];

    screen.addCyclingButton(20, 90, 200, 20, 1, blockNames, "Diamond Ore",
        JavaWrapper.methodToJavaAsync((btn) => {
            const index = blockNames.indexOf(btn.getValue());
            settings.targetBlock = blockTypes[index];
            Chat.log(`Target block: ${settings.targetBlock}`);
        })
    );

    // Show coordinates checkbox
    screen.addCheckbox(20, 120, 200, 20, "Show Coordinates", settings.showCoordinates,
        JavaWrapper.methodToJavaAsync((cb) => {
            settings.showCoordinates = cb.isChecked();
        })
    );

    // Auto-save checkbox
    screen.addCheckbox(20, 150, 200, 20, "Auto-save Results", settings.autoSave,
        JavaWrapper.methodToJavaAsync((cb) => {
            settings.autoSave = cb.isChecked();
        })
    );

    // Start scan button
    screen.addButton(20, 190, 100, 20, "Start Scan",
        JavaWrapper.methodToJavaAsync((btn) => {
            Chat.log(`Starting scan for ${settings.targetBlock} within ${settings.scanRadius} blocks...`);

            const player = Player.getPlayer();
            if (!player) {
                Chat.log("Player not found!");
                return;
            }

            const playerPos = player.getBlockPos();
            let foundCount = 0;

            // Simple scanning simulation
            for (let x = -settings.scanRadius; x <= settings.scanRadius; x++) {
                for (let y = -settings.scanRadius; y <= settings.scanRadius; y++) {
                    for (let z = -settings.scanRadius; z <= settings.scanRadius; z++) {
                        const checkPos = playerPos.offset(x, y, z);
                        const block = World.getBlock(checkPos);

                        if (block.getId() === settings.targetBlock) {
                            foundCount++;
                            if (settings.showCoordinates) {
                                Chat.log(`Found at: ${checkPos.getX()}, ${checkPos.getY()}, ${checkPos.getZ()}`);
                            }
                        }
                    }
                }
            }

            Chat.log(`Scan complete! Found ${foundCount} ${settings.targetBlock} blocks`);

            if (settings.autoSave) {
                Chat.log("Results saved to scan_log.txt");
            }
        })
    );

    // Clear results button
    screen.addButton(130, 190, 100, 20, "Clear",
        JavaWrapper.methodToJavaAsync((btn) => {
            Chat.log("Results cleared");
        })
    );

    // Add keyboard shortcuts
    screen.setOnKeyPressed(JavaWrapper.methodToJavaAsync((key, scanCode) => {
        if (key === 256) { // Escape key
            screen.close();
        } else if (key === 282) { // F1 key
            Chat.log("Help: Configure settings and click 'Start Scan'");
        }
    }));

    // Custom rendering for real-time preview
    screen.setOnRender(JavaWrapper.methodToJavaAsync((pos, drawContext) => {
        // Draw radius indicator
        const centerX = screen.getWidth() - 60;
        const centerY = 100;
        const radius = settings.scanRadius;

        // Draw preview circle
        Hud.drawCircle(centerX, centerY, radius, 0x40FF0000);
        Hud.drawString(`${radius}m`, centerX - 15, centerY - 5, 0xFFFFFF);

        // Draw target block info
        Hud.drawString("Target:", centerX - 50, centerY + 30, 0xFFFFFF);
        const blockIndex = blockTypes.indexOf(settings.targetBlock);
        if (blockIndex !== -1) {
            Hud.drawString(blockNames[blockIndex], centerX - 50, centerY + 45, 0x00FF00);
        }

        // Draw settings summary
        Hud.drawString("Settings:", 20, 230, 0xFFFFFF);
        Hud.drawString(`• Radius: ${settings.scanRadius}m`, 25, 245, 0xAAAAAA);
        Hud.drawString(`• Coords: ${settings.showCoordinates ? "ON" : "OFF"}`, 25, 260, 0xAAAAAA);
        Hud.drawString(`• Auto-save: ${settings.autoSave ? "ON" : "OFF"}`, 25, 275, 0xAAAAAA);
    }));

    return screen;
}

// Open the tool screen
const toolScreen = createToolScreen();
Client.getCurrentScreen().openScreen(toolScreen);
```

### Screen with Custom Rendering Effects
```js
// Create a screen with advanced custom rendering
function createVisualDemoScreen() {
    const screen = new ScriptScreen("Visual Effects Demo", false);
    screen.shouldPause = false;
    screen.drawTitle = false;

    let animationTime = 0;
    let mouseX = 0;
    let mouseY = 0;
    let particleCount = 20;
    let particles = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * screen.getWidth(),
            y: Math.random() * screen.getHeight(),
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 5 + 2,
            color: Math.floor(Math.random() * 0xFFFFFF)
        });
    }

    // Particle count slider
    screen.addSlider(20, screen.getHeight() - 40, 200, 20, "Particles", particleCount / 100, 100,
        JavaWrapper.methodToJavaAsync((slider) => {
            const newCount = Math.floor(slider.getValue() * 100);

            // Adjust particle array
            if (newCount > particleCount) {
                for (let i = particleCount; i < newCount; i++) {
                    particles.push({
                        x: Math.random() * screen.getWidth(),
                        y: Math.random() * screen.getHeight(),
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        size: Math.random() * 5 + 2,
                        color: Math.floor(Math.random() * 0xFFFFFF)
                    });
                }
            } else if (newCount < particleCount) {
                particles = particles.slice(0, newCount);
            }

            particleCount = newCount;
        })
    );

    // Reset particles button
    screen.addButton(screen.getWidth() - 120, screen.getHeight() - 40, 80, 20, "Reset",
        JavaWrapper.methodToJavaAsync((btn) => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * screen.getWidth(),
                    y: Math.random() * screen.getHeight(),
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    size: Math.random() * 5 + 2,
                    color: Math.floor(Math.random() * 0xFFFFFF)
                });
            }
        })
    );

    // Mouse tracking
    screen.setOnMouseDown(JavaWrapper.methodToJavaAsync((pos, button) => {
        mouseX = pos.x;
        mouseY = pos.y;

        // Add explosion effect at click position
        for (let i = 0; i < 10; i++) {
            particles.push({
                x: mouseX,
                y: mouseY,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                size: Math.random() * 8 + 1,
                color: Math.floor(Math.random() * 0xFFFFFF)
            });
        }

        // Remove oldest particles if too many
        if (particles.length > particleCount + 50) {
            particles = particles.slice(-particleCount);
        }
    }));

    // Advanced custom rendering
    screen.setOnRender(JavaWrapper.methodToJavaAsync((pos, drawContext) => {
        animationTime++;
        mouseX = pos.x;
        mouseY = pos.y;

        // Clear background with subtle fade
        Hud.fillRect(0, 0, screen.getWidth(), screen.getHeight(), 0x10000000);

        // Update and draw particles
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Apply gravity
            particle.vy += 0.1;

            // Bounce off walls
            if (particle.x <= 0 || particle.x >= screen.getWidth()) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(screen.getWidth(), particle.x));
            }
            if (particle.y <= 0 || particle.y >= screen.getHeight()) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(screen.getHeight(), particle.y));
            }

            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Draw particle
            const alpha = Math.max(0, 255 - index * 2);
            Hud.drawCircle(particle.x, particle.y, particle.size, particle.color | (alpha << 24));
        });

        // Draw animated sine waves
        for (let wave = 0; wave < 3; wave++) {
            const waveOffset = wave * 20;
            const amplitude = 30 + wave * 10;
            const frequency = 0.02 + wave * 0.005;
            const color = [0xFF0000, 0x00FF00, 0x0000FF][wave];

            Hud.beginPath();
            for (let x = 0; x < screen.getWidth(); x += 5) {
                const y = screen.getHeight() / 2 + waveOffset +
                         Math.sin((x + animationTime * 2) * frequency) * amplitude;

                if (x === 0) {
                    Hud.moveTo(x, y);
                } else {
                    Hud.lineTo(x, y);
                }
            }
            Hud.stroke(color, 2);
            Hud.endPath();
        }

        // Draw mouse follower
        const followRadius = 30 + Math.sin(animationTime * 0.1) * 10;
        Hud.drawCircle(mouseX, mouseY, followRadius, 0x40FFFFFF);
        Hud.drawCircle(mouseX, mouseY, followRadius, 0xFFFFFFFF, 2);

        // Draw rotating shapes
        const centerX = screen.getWidth() / 2;
        const centerY = screen.getHeight() / 2;
        const rotation = animationTime * 0.02;

        for (let i = 0; i < 6; i++) {
            const angle = rotation + (i * Math.PI * 2 / 6);
            const x = centerX + Math.cos(angle) * 80;
            const y = centerY + Math.sin(angle) * 80;

            Hud.drawRotatedRect(x - 15, y - 15, 30, 30, angle, 0x80FFD700, 2);
        }

        // Draw status text
        Hud.drawString(`Particles: ${particles.length}`, 10, 10, 0xFFFFFF);
        Hud.drawString(`FPS: ${Math.floor(1000 / 16.67)}`, 10, 25, 0xFFFFFF);
        Hud.drawString(`Mouse: (${mouseX}, ${mouseY})`, 10, 40, 0xFFFFFF);
        Hud.drawString("Click to add particle explosion!", 10, 55, 0xAAAAAA);
    }));

    return screen;
}

// Open the visual demo screen
const visualScreen = createVisualDemoScreen();
Client.getCurrentScreen().openScreen(visualScreen);
```

## Important Notes

### Screen Lifecycle
1. **Creation**: Screen is instantiated with constructor
2. **Initialization**: Screen's `init()` method is called when opened
3. **Rendering**: `render()` is called every frame with custom callbacks
4. **Events**: Input events are processed and forwarded to callbacks
5. **Closure**: Screen is closed and resources are cleaned up

### Performance Considerations
- Avoid expensive operations in `setOnRender()` callbacks as they run every frame
- Use `shouldPause = false` for real-time overlays to prevent game interruption
- Limit the number of particles or animated elements for better performance
- Cache expensive calculations outside of render loops when possible

### User Experience
- Always provide an escape mechanism when `shouldCloseOnEsc = false`
- Use appropriate background styles (dark for menus, transparent for overlays)
- Implement proper parent screen relationships for logical navigation flow
- Consider accessibility when choosing colors and text sizes

### Memory Management
- Remove event listeners and callbacks when screens are no longer needed
- Clean up large data structures in `setOnClose()` callbacks
- Avoid memory leaks by properly removing widgets and event handlers

## Related Classes

- `IScreen` - Interface providing comprehensive screen functionality
- `BaseScreen` - Parent class with basic screen implementation
- `ClickableWidgetHelper` - Button widget functionality
- `TextFieldWidgetHelper` - Text input widget functionality
- `CheckBoxWidgetHelper` - Checkbox widget functionality
- `SliderWidgetHelper` - Slider widget functionality
- `DrawContext` - Minecraft's drawing context for custom rendering
- `Pos3D` - 3D position and coordinate utilities
- `MethodWrapper` - Java method wrapping for callbacks

## Version Information

- Available since JSMacros 1.0.5
- IScreen interface implementation since 1.2.7
- Enhanced widget support added in 1.8.4
- Custom rendering hooks improved in 1.4.0
- Background style options available since initial release
- Screen behavior configuration options added in 1.8.4