# MultiElementContainer

**Full Class Name:** `xyz.wagyourtail.wagyourgui.containers.MultiElementContainer`

**Implements:** `IContainerParent`

**Extends:** `Abstract class`

**Since:** JsMacros 1.8.0

The `MultiElementContainer` class is an abstract UI container component in JSMacros that provides a foundation for creating containers that can hold and manage multiple UI elements or widgets. It offers core functionality for element management, positioning, visibility control, and parent-child relationships in the UI hierarchy. This class serves as a base for more specialized containers like `ListContainer`, `CheckBoxContainer`, and `OverlayContainer`.

## Overview

The `MultiElementContainer` class provides essential container functionality:

- **Element Management:** Add, remove, and organize multiple UI elements within a single container
- **Positioning Control:** Set and update container position and dimensions
- **Visibility Management:** Show/hide container and all contained elements
- **Parent-Child Relationships:** Maintain proper UI hierarchy with parent container delegation
- **Text Rendering Support:** Built-in text renderer for text-based elements
- **Abstract Rendering:** Customizable rendering through abstract render method

## Class Declaration

```java
public abstract class MultiElementContainer<T extends IContainerParent> implements IContainerParent
```

## Table of Contents

- [Constructors](#constructors)
- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Important Notes](#important-notes)
- [Related Classes](#related-classes)

## Constructors

### `new MultiElementContainer(x, y, width, height, textRenderer, parent)`
Creates a new MultiElementContainer with specified position, dimensions, and dependencies.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | int | X coordinate of the container's top-left corner |
| y | int | Y coordinate of the container's top-left corner |
| width | int | Width of the container in pixels |
| height | int | Height of the container in pixels |
| textRenderer | TextRenderer | Text renderer instance for text rendering |
| parent | T | Parent container that implements IContainerParent |

**Example:**
```javascript
// Create a container at position (100, 50) with 200x100 dimensions
const textRenderer = Client.get textRenderer(); // Get text renderer from context
const container = new MultiElementContainer(100, 50, 200, 100, textRenderer, parentContainer);
```

## Fields

### `container.buttons`
A `List<ClickableWidget>` containing all buttons and clickable widgets managed by this container.

**Type:** `List<ClickableWidget>`

**Example:**
```javascript
// Access all buttons in the container
const allButtons = container.getButtons();
for (const button of allButtons) {
    Chat.log(`Button: ${button.getMessage().getString()}`);
}
```

### `container.textRenderer`
The `TextRenderer` instance used for rendering text within the container.

**Type:** `TextRenderer`

### `container.visible`
Controls the visibility state of the container and all its child elements.

**Type:** `boolean`

### `container.parent`
Reference to the parent container that manages this container.

**Type:** `T` (generic type extending IContainerParent)

### `container.x`
X coordinate of the container's top-left corner.

**Type:** `int`

### `container.y`
Y coordinate of the container's top-left corner.

**Type:** `int`

### `container.width`
Width of the container in pixels.

**Type:** `int`

### `container.height`
Height of the container in pixels.

**Type:** `int`

## Methods

### `container.init()`
Initializes the container by clearing all existing buttons. Should be called when setting up or resetting the container.

**Parameters:**
* `(none)`

**Returns:**
* `void`

**Example:**
```javascript
// Initialize or reset the container
container.init();
```

### `container.getVisible()`
Gets the current visibility state of the container.

**Parameters:**
* `(none)`

**Returns:**
* `boolean`: `true` if the container is visible, `false` otherwise

**Example:**
```javascript
if (container.getVisible()) {
    Chat.log("Container is currently visible");
} else {
    Chat.log("Container is currently hidden");
}
```

### `container.setVisible(visible)`
Sets the visibility state of the container and all its child elements.

**Parameters:**
1. `visible: boolean`: Whether the container should be visible

**Returns:**
* `void`

**Example:**
```javascript
// Hide the container and all its elements
container.setVisible(false);

// Show the container and all its elements
container.setVisible(true);
```

### `container.addDrawableChild(drawableElement)`
Adds a drawable child element to both this container and its parent.

**Parameters:**
1. `drawableElement: T`: The drawable element to add (must extend Element, Drawable, and Selectable)

**Returns:**
* `T`: The same element that was added (for chaining)

**Example:**
```javascript
// Add a button to the container
const button = new ButtonWidgetHelper.ButtonBuilder()
    .pos(10, 10)
    .size(80, 20)
    .text("Click Me")
    .onClick(() => Chat.log("Button clicked!"))
    .build();

container.addDrawableChild(button);
```

### `container.getButtons()`
Gets a list of all buttons managed by this container.

**Parameters:**
* `(none)`

**Returns:**
* `List<ClickableWidget>`: List of all buttons in the container

**Example:**
```javascript
const buttons = container.getButtons();
Chat.log(`Container has ${buttons.size()} buttons`);

// Iterate through all buttons
for (const button of buttons) {
    if (button.isHovered()) {
        Chat.log(`Hovering over: ${button.getMessage().getString()}`);
    }
}
```

### `container.setPos(x, y, width, height)`
Updates the position and dimensions of the container.

**Parameters:**
1. `x: int`: New X coordinate
2. `y: int`: New Y coordinate
3. `width: int`: New width
4. `height: int`: New height

**Returns:**
* `void`

**Example:**
```javascript
// Resize and reposition the container
container.setPos(50, 25, 300, 150);
```

### `container.remove(element)`
Removes an element from both this container and its parent.

**Parameters:**
1. `element: Element`: The element to remove

**Returns:**
* `void`

**Example:**
```javascript
// Remove a specific button
const buttons = container.getButtons();
if (buttons.size() > 0) {
    container.remove(buttons.get(0));
    Chat.log("Removed first button from container");
}
```

### `container.openOverlay(overlay)`
Opens an overlay using the parent container's overlay system.

**Parameters:**
1. `overlay: OverlayContainer`: The overlay to open

**Returns:**
* `void`

**Example:**
```javascript
// Open an overlay from within the container
const overlay = new OverlayContainer(/* parameters */);
container.openOverlay(overlay);
```

### `container.openOverlay(overlay, disableButtons)`
Opens an overlay with option to disable buttons.

**Parameters:**
1. `overlay: OverlayContainer`: The overlay to open
2. `disableButtons: boolean`: Whether to disable buttons while overlay is open

**Returns:**
* `void`

**Example:**
```javascript
// Open overlay and disable background buttons
const overlay = new OverlayContainer(/* parameters */);
container.openOverlay(overlay, true);
```

### `container.getFirstOverlayParent()`
Gets the first overlay parent in the hierarchy.

**Parameters:**
* `(none)`

**Returns:**
* `IOverlayParent`: The first overlay parent

**Example:**
```javascript
const overlayParent = container.getFirstOverlayParent();
if (overlayParent) {
    Chat.log("Found overlay parent in hierarchy");
}
```

### `container.render(drawContext, mouseX, mouseY, delta)`
**Abstract method** that must be implemented by subclasses to handle rendering.

**Parameters:**
1. `drawContext: DrawContext`: The drawing context for rendering
2. `mouseX: int`: Current mouse X position
3. `mouseY: int`: Current mouse Y position
4. `delta: float`: Delta time for animations

**Returns:**
* `void`

**Example (in subclass):**
```javascript
// Implementation in a custom container subclass
@Override
render(drawContext, mouseX, mouseY, delta) {
    // Custom rendering logic here
    if (this.visible) {
        // Draw container background
        drawContext.fill(this.x, this.y, this.x + this.width, this.y + this.height, 0xFF000000);

        // Draw border
        drawContext.drawBorder(this.x, this.y, this.width, this.height, 0xFFFFFFFF);
    }
}
```

## Usage Examples

### Basic Container Usage
```javascript
// Create a custom container extending MultiElementContainer
class CustomContainer extends MultiElementContainer {
    constructor(x, y, width, height, textRenderer, parent) {
        super(x, y, width, height, textRenderer, parent);
        this.setupUI();
    }

    setupUI() {
        // Add some buttons to the container
        const button1 = new ButtonWidgetHelper.ButtonBuilder()
            .pos(10, 10)
            .size(100, 20)
            .text("Button 1")
            .onClick(() => Chat.log("Button 1 clicked"))
            .build();

        const button2 = new ButtonWidgetHelper.ButtonBuilder()
            .pos(10, 40)
            .size(100, 20)
            .text("Button 2")
            .onClick(() => Chat.log("Button 2 clicked"))
            .build();

        this.addDrawableChild(button1);
        this.addDrawableChild(button2);
    }

    render(drawContext, mouseX, mouseY, delta) {
        if (this.visible) {
            // Draw container background
            drawContext.fill(this.x, this.y, this.x + this.width, this.y + this.height, 0x80000000);

            // Draw container border
            drawContext.drawBorder(this.x, this.y, this.width, this.height, 0xFFFFFFFF);
        }
    }
}

// Create and use the container
const textRenderer = Client.getTextRenderer(); // Get from appropriate context
const customContainer = new CustomContainer(100, 50, 200, 100, textRenderer, parent);
```

### Dynamic Element Management
```javascript
// Container that dynamically adds/removes elements
class DynamicContainer extends MultiElementContainer {
    constructor(x, y, width, height, textRenderer, parent) {
        super(x, y, width, height, textRenderer, parent);
        this.counter = 0;
        this.setupControls();
    }

    setupControls() {
        // Add button to create new elements
        const addButton = new ButtonWidgetHelper.ButtonBuilder()
            .pos(10, 10)
            .size(80, 20)
            .text("Add Item")
            .onClick(() => this.addNewItem())
            .build();

        // Add button to remove elements
        const removeButton = new ButtonWidgetHelper.ButtonBuilder()
            .pos(100, 10)
            .size(80, 20)
            .text("Remove Item")
            .onClick(() => this.removeLastItem())
            .build();

        // Add button to toggle visibility
        const toggleButton = new ButtonWidgetHelper.ButtonBuilder()
            .pos(190, 10)
            .size(80, 20)
            .text("Toggle")
            .onClick(() => this.setVisible(!this.getVisible()))
            .build();

        this.addDrawableChild(addButton);
        this.addDrawableChild(removeButton);
        this.addDrawableChild(toggleButton);
    }

    addNewItem() {
        this.counter++;
        const newY = 40 + ((this.counter - 1) * 25);

        if (newY < this.height - 25) {
            const newItem = new ButtonWidgetHelper.ButtonBuilder()
                .pos(10, newY)
                .size(180, 20)
                .text(`Item ${this.counter}`)
                .onClick(() => Chat.log(`Item ${this.counter} clicked`))
                .build();

            this.addDrawableChild(newItem);
            Chat.log(`Added Item ${this.counter}`);
        } else {
            Chat.log("Container is full!");
        }
    }

    removeLastItem() {
        const buttons = this.getButtons();
        // Skip the control buttons (first 3)
        if (buttons.size() > 3) {
            const lastItem = buttons.get(buttons.size() - 1);
            this.remove(lastItem);
            this.counter--;
            Chat.log(`Removed last item`);
        } else {
            Chat.log("No items to remove");
        }
    }

    render(drawContext, mouseX, mouseY, delta) {
        if (this.visible) {
            // Draw semi-transparent background
            drawContext.fill(this.x, this.y, this.x + this.width, this.y + this.height, 0xA0000000);

            // Draw border
            drawContext.drawBorder(this.x, this.y, this.width, this.height, 0xFFFFFFFF);

            // Draw item count
            const itemCount = this.getButtons().size() - 3; // Subtract control buttons
            this.textRenderer.draw(drawContext, `Items: ${itemCount}`, this.x + 5, this.y + this.height - 15, 0xFFFFFF);
        }
    }
}
```

### Container with Layout Management
```javascript
// Container with automatic layout management
class LayoutContainer extends MultiElementContainer {
    constructor(x, y, width, height, textRenderer, parent) {
        super(x, y, width, height, textRenderer, parent);
        this.padding = 10;
        this.itemHeight = 25;
        this.setupGrid();
    }

    setupGrid() {
        // Create a 3x3 grid of buttons
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const buttonX = this.x + this.padding + (col * 60);
                const buttonY = this.y + this.padding + (row * 30);
                const buttonIndex = (row * 3) + col + 1;

                const button = new ButtonWidgetHelper.ButtonBuilder()
                    .pos(buttonX - this.x, buttonY - this.y) // Relative position
                    .size(50, 20)
                    .text(`B${buttonIndex}`)
                    .onClick(() => this.handleButtonClick(buttonIndex))
                    .build();

                this.addDrawableChild(button);
            }
        }
    }

    handleButtonClick(index) {
        Chat.log(`Grid button ${index} clicked`);

        // Example: Change container size based on button clicked
        const newSize = 100 + (index * 20);
        this.setPos(this.x, this.y, newSize, newSize);
    }

    render(drawContext, mouseX, mouseY, delta) {
        if (this.visible) {
            // Draw container background with gradient effect
            for (let i = 0; i < this.height; i++) {
                const alpha = Math.floor(128 + (127 * Math.sin(i / this.height * Math.PI)));
                drawContext.fill(this.x, this.y + i, this.x + this.width, this.y + i + 1, (alpha << 24) | 0x404040);
            }

            // Draw border
            drawContext.drawBorder(this.x, this.y, this.width, this.height, 0xFF00FF00);

            // Draw grid lines for visual guidance
            for (let i = 1; i < 3; i++) {
                // Vertical lines
                const x = this.x + this.padding + (i * 60);
                drawContext.fill(x, this.y + this.padding, x + 1, this.y + this.padding + 60, 0xFF808080);

                // Horizontal lines
                const y = this.y + this.padding + (i * 30);
                drawContext.fill(this.x + this.padding, y, this.x + this.padding + 180, y + 1, 0xFF808080);
            }
        }
    }
}
```

### Container with Event Delegation
```javascript
// Container that delegates events to parent and handles complex interactions
class EventDelegationContainer extends MultiElementContainer {
    constructor(x, y, width, height, textRenderer, parent) {
        super(x, y, width, height, textRenderer, parent);
        this.eventHistory = [];
        this.setupEventTracking();
    }

    setupEventTracking() {
        const clearButton = new ButtonWidgetHelper.ButtonBuilder()
            .pos(10, 10)
            .size(60, 20)
            .text("Clear")
            .onClick(() => this.clearHistory())
            .build();

        const showButton = new ButtonWidgetHelper.ButtonBuilder()
            .pos(80, 10)
            .size(60, 20)
            .text("Show")
            .onClick(() => this.showHistory())
            .build();

        const overlayButton = new ButtonWidgetHelper.ButtonBuilder()
            .pos(150, 10)
            .size(80, 20)
            .text("Overlay")
            .onClick(() => this.openTestOverlay())
            .build();

        this.addDrawableChild(clearButton);
        this.addDrawableChild(showButton);
        this.addDrawableChild(overlayButton);

        this.logEvent("Container initialized");
    }

    logEvent(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.eventHistory.push(`[${timestamp}] ${message}`);

        // Keep only last 10 events
        if (this.eventHistory.length > 10) {
            this.eventHistory.shift();
        }
    }

    clearHistory() {
        this.eventHistory = [];
        this.logEvent("History cleared");
        Chat.log("Event history cleared");
    }

    showHistory() {
        Chat.log("=== Event History ===");
        this.eventHistory.forEach(event => Chat.log(event));
        Chat.log("===================");
    }

    openTestOverlay() {
        // This would use the parent's overlay system
        this.logEvent("Opening overlay");
        Chat.log("Opening test overlay (implementation depends on parent)");
    }

    // Override visibility methods to track changes
    setVisible(visible) {
        const oldVisible = this.getVisible();
        super.setVisible(visible);

        if (oldVisible !== visible) {
            this.logEvent(`Visibility changed to: ${visible}`);
        }
    }

    setPos(x, y, width, height) {
        this.logEvent(`Position changed: (${x}, ${y}, ${width}, ${height})`);
        super.setPos(x, y, width, height);
    }

    render(drawContext, mouseX, mouseY, delta) {
        if (this.visible) {
            // Draw container background
            drawContext.fill(this.x, this.y, this.x + this.width, this.y + this.height, 0xFF1a1a1a);

            // Draw border
            drawContext.drawBorder(this.x, this.y, this.width, this.height, 0xFF00aaff);

            // Draw event count
            const eventText = `Events: ${this.eventHistory.length}`;
            this.textRenderer.draw(drawContext, eventText, this.x + 5, this.y + this.height - 15, 0xFFFFFF);

            // Draw latest event if available
            if (this.eventHistory.length > 0) {
                const latestEvent = this.eventHistory[this.eventHistory.length - 1];
                // Truncate if too long
                const displayEvent = latestEvent.length > 30 ? latestEvent.substring(0, 27) + "..." : latestEvent;
                this.textRenderer.draw(drawContext, displayEvent, this.x + 5, this.y + 35, 0x00ff00);
            }
        }
    }
}
```

## Important Notes

1. **Abstract Class:** `MultiElementContainer` is abstract and cannot be instantiated directly. You must create a subclass that implements the `render()` method.

2. **Parent Dependency:** The container requires a parent that implements `IContainerParent` for proper delegation of UI operations.

3. **Text Renderer:** A `TextRenderer` instance is required for text rendering operations. This should be obtained from the appropriate UI context.

4. **Memory Management:** When removing elements, they are removed from both this container and the parent container to prevent memory leaks.

5. **Visibility Inheritance:** Setting visibility on the container automatically affects all contained elements, making them visible/active and hidden/inactive accordingly.

6. **Coordinate System:** Container coordinates are absolute screen coordinates, not relative to parent containers.

7. **Thread Safety:** UI operations should be performed on the main client thread to avoid threading issues.

8. **Rendering Order:** The abstract `render()` method is called during the UI rendering cycle and should handle all custom drawing for the container.

9. **Element Lifecycle:** The `init()` method should be called when setting up or resetting the container to clear existing elements.

10. **Button Management:** All added drawable elements are cast to `ClickableWidget` and managed in the internal buttons list.

## Related Classes

- `IContainerParent` - Interface implemented by parent containers
- `ListContainer` - Concrete implementation for list-based containers
- `CheckBoxContainer` - Container for checkbox elements
- `OverlayContainer` - Container for overlay dialogs
- `ClickableWidget` - Base class for interactive UI elements
- `DrawContext` - Drawing context for rendering operations
- `TextRenderer` - Text rendering utility
- `ButtonWidgetHelper` - Helper for creating button widgets

## Version History

- **1.8.0:** Initial release with basic container functionality
- **1.8.5:** Enhanced with improved element management and visibility control
- **1.9.0:** Added overlay delegation support
- **Current:** Stable API with comprehensive element management features