# ClickableWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.ClickableWidgetHelper<B extends ClickableWidgetHelper<B, T>, T extends ClickableWidget>`

**Extends:** `BaseHelper<T>`

**Implements:** `RenderElement`, `Alignable<B>`

**Since:** JsMacros 1.0.5

The `ClickableWidgetHelper` class is a foundational wrapper for clickable UI widgets in JSMacros that provides common functionality for buttons and other interactive screen elements. This class serves as a base for more specific widget helpers and offers essential methods for positioning, sizing, text management, state control, and user interaction handling.

As a generic class with type parameters `<B, T>`, it enables type-safe method chaining where `B` represents the specific helper subclass and `T` represents the underlying Minecraft widget type.

## Overview

The `ClickableWidgetHelper` abstracts the complexity of working with Minecraft's native clickable widgets while providing a consistent API for JSMacros scripts. It handles common widget operations like mouse interactions, tooltip rendering, positioning, and state management.

**Key Features:**
- Generic type system for type-safe method chaining
- Position and dimension management with pixel precision
- Text labeling with support for both string and TextHelper objects
- Active/inactive state control for user interaction
- Comprehensive tooltip system with multiple content types
- Mouse interaction simulation with programmatic clicking
- Integration with JSMacros rendering and screen systems
- Z-index control for proper layering in complex UIs

## Class Declaration and Type Parameters

```javascript
// Generic form - typically used through subclasses
ClickableWidgetHelper<B, T>

// Where:
// B - The specific helper subclass (for method chaining)
// T - The underlying Minecraft widget type
```

This class is typically used through its subclasses like `ButtonWidgetHelper`, but can also be instantiated directly when working with custom widget implementations.

## Fields

## Static Methods

## Constructors

### `new ClickableWidgetHelper(widget)`
Creates a helper wrapper around an existing clickable widget with default z-index of 0.

**Parameters:**
- `widget` (`T`): The underlying Minecraft clickable widget to wrap

**Example:**
```javascript
// Usually used by framework or subclasses
const helper = new ClickableWidgetHelper(mcWidget);
```

### `new ClickableWidgetHelper(widget, zIndex)`
Creates a helper wrapper with specified z-index.

**Parameters:**
- `widget` (`T`): The underlying Minecraft clickable widget
- `zIndex` (`int`): The z-index for rendering order

**Example:**
```javascript
// Create with custom z-index
const helper = new ClickableWidgetHelper(mcWidget, 5);
```

## Position and Dimension Methods

## Text and Label Methods

## State and Interaction Methods

## Tooltip Methods

## Rendering Methods

## Alignable Interface Methods

The `ClickableWidgetHelper` implements the `Alignable<B>` interface, providing methods for layout calculations:

## Utility Methods

## Usage Examples

### Example 1: Basic Widget Configuration

```javascript
// Assuming you have a ClickableWidgetHelper instance
const widget = someClickableWidget;

// Configure basic properties
widget.setPos(50, 30)
      .setWidth(150)
      .setLabel("Interactive Widget")
      .setActive(true);

// Set tooltips
widget.setTooltip(
    "This is an interactive widget",
    "Click it to perform an action",
    Chat.createTextBuilder()
        .withColor(0x00FF00)
        .append("Status: Active")
        .build()
);

// Get widget information
Chat.log(`Position: (${widget.getX()}, ${widget.getY()})`);
Chat.log(`Size: ${widget.getWidth()}x${widget.getHeight()}`);
Chat.log(`Label: ${widget.getLabel().getString()}`);
Chat.log(`Active: ${widget.getActive()}`);
```

### Example 2: Dynamic Tooltip Management

```javascript
// Create a widget with dynamic tooltips based on game state
const statusWidget = someClickableWidget;

function updateWidgetTooltips() {
    const player = Player.getPlayer();
    if (!player) return;

    const health = player.getHealth();
    const hunger = player.getHunger();
    const pos = player.getPos();

    // Clear existing tooltips
    widget.setTooltip();

    // Add dynamic tooltips
    widget.addTooltip(`Health: ${health.toFixed(1)}/${player.getMaxHealth()}`);
    widget.addTooltip(`Hunger: ${hunger}/20`);
    widget.addTooltip(`Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);

    // Add conditional tooltips
    if (health < 10) {
        widget.addTooltip(Chat.createTextBuilder()
            .withColor(0xFF0000)
            .append("⚠ Low Health Warning!")
            .build());
    }

    if (hunger < 6) {
        widget.addTooltip(Chat.createTextBuilder()
            .withColor(0xFFFF00)
            .append("⚠ Low Hunger Warning!")
            .build());
    }
}

// Update tooltips every second
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (event.tickCount % 20 === 0) {
        updateWidgetTooltips();
    }
}));
```

### Example 3: Widget State Management

```javascript
// Create a widget that changes state based on conditions
let widgetEnabled = true;
let clickCount = 0;

const toggleWidget = someClickableWidget;

// Configure initial state
toggleWidget.setPos(100, 50)
           .setWidth(120)
           .setLabel("Enable Features")
           .setActive(true);

// Create update function
function updateWidgetState() {
    const player = Player.getPlayer();
    if (!player) return;

    // Enable/disable based on player health
    const shouldEnable = player.getHealth() > 5;

    if (shouldEnable !== widgetEnabled) {
        widgetEnabled = shouldEnable;
        toggleWidget.setActive(shouldEnable);

        if (shouldEnable) {
            toggleWidget.setLabel("Enable Features");
        } else {
            toggleWidget.setLabel("Disabled - Low Health");
        }
    }

    // Update label with click count
    const baseLabel = widgetEnabled ? "Enable Features" : "Disabled - Low Health";
    toggleWidget.setLabel(`${baseLabel} (${clickCount} clicks)`);
}

// Check state periodically
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (event.tickCount % 40 === 0) { // Every 2 seconds
        updateWidgetState();
    }
}));
```

### Example 4: Programmatic Clicking

```javascript
// Simulate clicks on widgets for automation
const autoClickWidget = someClickableWidget;

// Function to safely click a widget
function safeClick(widget, delay = 100) {
    if (!widget.getActive()) {
        Chat.log("Cannot click disabled widget");
        return false;
    }

    try {
        widget.click(true); // Wait for completion
        Chat.log("Widget clicked successfully");

        // Optional delay between clicks
        if (delay > 0) {
            Time.sleep(delay);
        }

        return true;
    } catch (e) {
        Chat.log(`Click failed: ${e.message}`);
        return false;
    }
}

// Usage examples
safeClick(autoClickWidget); // Single click

// Multiple clicks with delays
for (let i = 0; i < 5; i++) {
    if (safeClick(autoClickWidget, 200)) {
        Chat.log(`Click ${i + 1} completed`);
    } else {
        Chat.log("Click sequence aborted");
        break;
    }
}
```

### Example 5: Widget Position Animation

```javascript
// Animate widget position
const animatedWidget = someClickableWidget;
let animationTime = 0;
let startX = 0;
let startY = 0;
let targetX = 200;
let targetY = 100;
let animationDuration = 2000; // 2 seconds

function animateWidget() {
    const currentTime = Date.now();
    const elapsed = currentTime - animationTime;

    if (elapsed >= animationDuration) {
        // Animation complete
        animatedWidget.setPos(targetX, targetY);
        return;
    }

    // Calculate interpolation (ease-in-out)
    const progress = elapsed / animationDuration;
    const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Calculate new position
    const currentX = startX + (targetX - startX) * easeProgress;
    const currentY = startY + (targetY - startY) * easeProgress;

    // Update position
    animatedWidget.setPos(Math.floor(currentX), Math.floor(currentY));
}

// Start animation
function startAnimation(newX, newY) {
    startX = animatedWidget.getX();
    startY = animatedWidget.getY();
    targetX = newX;
    targetY = newY;
    animationTime = Date.now();
}

// Run animation loop
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    animateWidget();
}));

// Trigger animation
startAnimation(300, 150);
```

### Example 6: Complex Tooltip System

```javascript
// Create a comprehensive tooltip system
const infoWidget = someClickableWidget;

function createMultiLineTooltip() {
    const player = Player.getPlayer();
    if (!player) return;

    // Clear existing tooltips
    infoWidget.setTooltip();

    // Add header tooltip with formatting
    infoWidget.addTooltip(
        Chat.createTextBuilder()
            .withColor(0xFFFFFF)
            .withBold(true)
            .append("=== Widget Information ===")
            .build()
    );

    // Add player information
    const pos = player.getPos();
    infoWidget.addTooltip(`Player Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
    infoWidget.addTooltip(`Health: ${player.getHealth().toFixed(1)}/${player.getMaxHealth()}`);
    infoWidget.addTooltip(`Experience: ${player.experienceLevel} levels`);

    // Add world information
    infoWidget.addTooltip(
        Chat.createTextBuilder()
            .withColor(0xAAAAAA)
            .append(`World Time: ${World.getTime() % 24000} ticks`)
            .build()
    );

    // Add system information
    infoWidget.addTooltip(
        Chat.createTextBuilder()
            .withColor(0x555555)
            .append(`Last Update: ${new Date().toLocaleTimeString()}`)
            .build()
    );

    // Add dynamic status
    const health = player.getHealth();
    if (health < 6) {
        infoWidget.addTooltip(
            Chat.createTextBuilder()
                .withColor(0xFF0000)
                .append("⚠ CRITICAL: Low Health!")
                .build()
        );
    } else if (health < 12) {
        infoWidget.addTooltip(
            Chat.createTextBuilder()
                .withColor(0xFFFF00)
                .append("⚠ Warning: Low Health")
                .build()
        );
    }
}

// Update tooltips every 5 seconds
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (event.tickCount % 100 === 0) {
        createMultiLineTooltip();
    }
}));

// Initial tooltip setup
createMultiLineTooltip();
```

### Example 7: Widget Groups and Z-Index Management

```javascript
// Manage multiple widgets with proper z-index layering
const widgets = [];

// Create widgets with different z-index values
function createWidgetGroup() {
    // Background widget (lowest z-index)
    const backgroundWidget = createBackgroundWidget();
    backgroundWidget.zIndex = 1;
    widgets.push(backgroundWidget);

    // Content widgets (middle z-index)
    const contentWidget1 = createContentWidget("Content 1");
    contentWidget1.zIndex = 5;
    widgets.push(contentWidget1);

    const contentWidget2 = createContentWidget("Content 2");
    contentWidget2.zIndex = 5;
    widgets.push(contentWidget2);

    // Interactive widgets (highest z-index)
    const buttonWidget = createButtonWidget();
    buttonWidget.zIndex = 10;
    widgets.push(buttonWidget);

    // Sort widgets by z-index for proper rendering
    widgets.sort((a, b) => a.zIndex - b.zIndex);

    Chat.log(`Created ${widgets.length} widgets with layered z-index`);
}

// Function to bring widget to front
function bringToFront(targetWidget) {
    // Find current highest z-index
    const maxZIndex = Math.max(...widgets.map(w => w.zIndex));

    // Set target widget to highest z-index + 1
    targetWidget.zIndex = maxZIndex + 1;

    // Resort widgets
    widgets.sort((a, b) => a.zIndex - b.zIndex);

    Chat.log(`Widget moved to front with z-index: ${targetWidget.zIndex}`);
}

// Function to send widget to back
function sendToBack(targetWidget) {
    // Find current lowest z-index
    const minZIndex = Math.min(...widgets.map(w => w.zIndex));

    // Set target widget to lowest z-index - 1
    targetWidget.zIndex = minZIndex - 1;

    // Resort widgets
    widgets.sort((a, b) => a.zIndex - b.zIndex);

    Chat.log(`Widget moved to back with z-index: ${targetWidget.zIndex}`);
}
```

## Best Practices

## Common Use Cases

### Interactive Controls
Create buttons and controls that respond to user input while providing informative tooltips and visual feedback.

### Information Display
Use widgets with rich tooltips to display dynamic game state information, player stats, or system status.

### Automation Interfaces
Build control panels for scripts and automation systems with programmatic clicking capabilities.

### Tutorial Systems
Implement interactive tutorials with context-sensitive help and guidance through tooltips.

### Debug Interfaces
Create debugging tools that display internal state information and provide controls for testing.

## Related Classes

- `BaseHelper<T>` - Parent class providing basic wrapper functionality
- `RenderElement` - Interface for screen rendering elements
- `Alignable<B>` - Interface for layout positioning
- `ButtonWidgetHelper` - Common subclass for button widgets
- `TextHelper` - Used for formatted text and labels
- `TextBuilder` - Used for creating complex formatted text
- `IScreen` - Screen interface for widget integration
- `DrawContext` - Minecraft drawing context for rendering

## Version History

- **1.0.5:** Initial release with basic widget functionality
- **1.2.3:** Added `getLabel()` method (originally `getText()`)
- **1.3.1:** Renamed text methods for clarity (`setText` → `setLabel`, `getText` → `getLabel`)
- **1.3.1:** Added programmatic `click()` methods with thread safety
- **1.8.4:** Added comprehensive tooltip system with multiple content types
- **1.8.4:** Added `getHeight()` method for dimension access
- **Current:** Enhanced with alignment interface and improved rendering integration

## Important Notes

1. **Generic Type Safety:** The class uses generics for type safety, which is handled automatically in subclasses.

2. **Thread Safety:** Programmatic clicking includes thread safety considerations for both game and scripting threads.

3. **Tooltip Rendering:** Tooltips are automatically rendered when the mouse hovers over the widget.

4. **Memory Management:** The class maintains proper references to prevent garbage collection issues.

5. **Z-Index Behavior:** Proper z-index management is crucial for correct rendering in complex UIs.

6. **Inventory Integration:** Special handling for inventory screens to prevent unintended item interactions.

7. **Event Integration:** The class integrates seamlessly with JSMacros event and screen systems.

8. **Method Chaining:** Most methods return the widget instance for fluent API usage.