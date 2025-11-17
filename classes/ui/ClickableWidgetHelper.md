# ClickableWidgetHelper

The base class for all interactive UI widgets in JsMacros. ClickableWidgetHelper provides common functionality for clickable elements including positioning, styling, tooltips, and basic interaction patterns. This class is extended by specific widget types like buttons, text fields, and sliders.

## Fields
- [ClickableWidgetHelper.zIndex](#clickablewidgethelperzindex)

## Methods
- [ClickableWidgetHelper.getX](#clickablewidgethelpergetx)
- [ClickableWidgetHelper.getY](#clickablewidgethelpergety)
- [ClickableWidgetHelper.setPos](#clickablewidgethelpersetpos)
- [ClickableWidgetHelper.getWidth](#clickablewidgethelpergetwidth)
- [ClickableWidgetHelper.getHeight](#clickablewidgethelpergetheight)
- [ClickableWidgetHelper.setLabel](#clickablewidgethelpersetlabel)
- [ClickableWidgetHelper.getLabel](#clickablewidgethelpergetlabel)
- [ClickableWidgetHelper.getActive](#clickablewidgethelpergetactive)
- [ClickableWidgetHelper.setActive](#clickablewidgethelpersetactive)
- [ClickableWidgetHelper.setWidth](#clickablewidgethelpersetwidth)
- [ClickableWidgetHelper.click](#clickablewidgethelperclick)
- [ClickableWidgetHelper.setTooltip](#clickablewidgethelpersettooltip)
- [ClickableWidgetHelper.addTooltip](#clickablewidgethelperaddtooltip)
- [ClickableWidgetHelper.removeTooltip](#clickablewidgethelperremovetooltip)
- [ClickableWidgetHelper.getTooltips](#clickablewidgethelpergettooltips)

## Fields

### ClickableWidgetHelper.zIndex
The z-index (render order) of this widget. Higher values render on top of lower values.

**Type**
* `int`

## Methods

### ClickableWidgetHelper.getX
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

const xPos = button.getX();
Chat.log(`Button X position: ${xPos}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The X coordinate of the widget.

### ClickableWidgetHelper.getY
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

const yPos = button.getY();
Chat.log(`Button Y position: ${yPos}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The Y coordinate of the widget.

### ClickableWidgetHelper.setPos
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

// Move button to new position
button.setPos(50, 60);
// Button is now at position (50, 60)
```

**Params**
1. `x: int`: The new X coordinate.
2. `y: int`: The new Y coordinate.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

### ClickableWidgetHelper.getWidth
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

const width = button.getWidth();
Chat.log(`Button width: ${width}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The width of the widget.

### ClickableWidgetHelper.getHeight
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

const height = button.getHeight();
Chat.log(`Button height: ${height}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The height of the widget.

### ClickableWidgetHelper.setLabel
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Old Text", () => {});

// Change button text
button.setLabel("New Text");

// Using TextHelper for formatted text
button.setLabel(TextHelper.red("Error!"));
```

**Params**
1. `label: string | TextHelper`: The new label text.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

**Notes**
- Deprecated in ButtonWidgetHelper for confusing name, but still functional in base class
- Use with specific widget classes for consistent behavior

### ClickableWidgetHelper.getLabel
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

const label = button.getLabel();
Chat.log(`Button label: ${label.getString()}`);
```

**Params**
* `(none)`

**Returns**
* `TextHelper`: The current label as a TextHelper object.

### ClickableWidgetHelper.getActive
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

if (!button.getActive()) {
    Chat.log("Button is disabled");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the widget is active/clickable, `false` if disabled.

### ClickableWidgetHelper.setActive
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Click Me!", () => {
    Chat.log("Button clicked!");
});

// Disable the button
button.setActive(false);
// Button appears grayed out and cannot be clicked

// Re-enable the button
button.setActive(true);
// Button is clickable again
```

**Params**
1. `active: boolean`: `true` to enable the widget, `false` to disable it.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

### ClickableWidgetHelper.setWidth
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Test", () => {});

// Make button wider
button.setWidth(150);
// Button is now 150 pixels wide
```

**Params**
1. `width: int`: The new width of the widget.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

### ClickableWidgetHelper.click
```js
const screen = Hud.createScreen("Widget Demo", false);
let clickCount = 0;
const button = screen.addButton(10, 10, 100, 20, "Test", () => {
    clickCount++;
    Chat.log(`Button clicked ${clickCount} times`);
});

// Programmatically click the button
button.click();
// This will trigger the button's action and increment clickCount

// Click without waiting for completion
button.click(false);

// Click and wait for the action to complete
button.click(true);
```

**Params**
1. `await: boolean = true`: Whether to wait for the click action to complete.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

**Notes**
- This simulates a mouse click on the widget
- Useful for programmatic interaction or testing
- The await parameter controls whether execution waits for the click to complete

### ClickableWidgetHelper.setTooltip
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Info", () => {});

// Set a single tooltip
button.setTooltip("This button shows information");

// Set multiple tooltips
button.setTooltip(
    "First line of help text",
    "Second line of help text",
    TextHelper.yellow("Important warning!")
);
```

**Params**
1. `tooltips: string | TextHelper...`: One or more tooltip lines to display.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

### ClickableWidgetHelper.addTooltip
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Info", () => {});

// Add tooltips one by one
button.addTooltip("Basic tooltip");
button.addTooltip(TextHelper.blue("Formatted tooltip"));
button.addTooltip("Additional information");

// Tooltips show when hovering over the button
```

**Params**
1. `tooltip: string | TextHelper`: The tooltip line to add.

**Returns**
* `ClickableWidgetHelper`: Self for chaining.

### ClickableWidgetHelper.removeTooltip
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Info", () => {});

button.setTooltip("Line 1", "Line 2", "Line 3");

// Remove tooltip by index
button.removeTooltip(1); // Removes "Line 2"

// Remove tooltip by content
button.removeTooltip(TextHelper.wrap("Line 3"));
```

**Params**
1. `index: int | TextHelper`: The index or content of the tooltip to remove.

**Returns**
* `boolean`: `true` if the tooltip was removed successfully, `false` otherwise.

### ClickableWidgetHelper.getTooltips
```js
const screen = Hud.createScreen("Widget Demo", false);
const button = screen.addButton(10, 10, 100, 20, "Info", () => {});

button.setTooltip("Help text 1", "Help text 2");

const tooltips = button.getTooltips();
for (const tooltip of tooltips) {
    Chat.log(`Tooltip: ${tooltip.getString()}`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<TextHelper>`: A copy of all tooltip lines.

## Examples

### Interactive Button Demo
```js
const screen = Hud.createScreen("Interactive Demo", false);

// Create a button with dynamic behavior
const toggleButton = screen.addButton(10, 10, 150, 20, "Click Me!", JavaWrapper.methodToJava(() => {
    const currentText = toggleButton.getLabel().getString();
    const isActive = toggleButton.getActive();

    if (isActive) {
        toggleButton.setLabel("Disabled - Click to Enable");
        toggleButton.setActive(false);
    } else {
        toggleButton.setLabel("Enabled - Click to Disable");
        toggleButton.setActive(true);
    }
}));

// Add helpful tooltip
toggleButton.setTooltip(
    "Click to toggle button state",
    "When disabled, button appears grayed out"
);

// Add a position reset button
const resetButton = screen.addButton(10, 40, 100, 20, "Reset Position", JavaWrapper.methodToJava(() => {
    toggleButton.setPos(10, 10);
    Chat.log("Button position reset!");
}));

Hud.openScreen(screen);
```

### Widget Information Display
```js
function createWidgetInfoScreen() {
    const screen = Hud.createScreen("Widget Inspector", false);
    const widgets = [];

    // Create several widgets to inspect
    const btn1 = screen.addButton(10, 30, 100, 20, "Button 1", () => {});
    const btn2 = screen.addButton(10, 60, 120, 25, "Button 2", () => {});
    const btn3 = screen.addButton(10, 95, 80, 20, "Button 3", () => {});

    widgets.push(btn1, btn2, btn3);

    // Add info display button
    screen.addButton(200, 30, 150, 20, "Show Widget Info", JavaWrapper.methodToJava(() => {
        widgets.forEach((widget, index) => {
            const info = `Widget ${index + 1}: pos(${widget.getX()}, ${widget.getY()}) size(${widget.getWidth()}x${widget.getHeight()}) active:${widget.getActive()}`;
            Chat.log(info);
        });
    }));

    // Add reposition button
    screen.addButton(200, 60, 150, 20, "Reposition Widgets", JavaWrapper.methodToJava(() => {
        widgets.forEach((widget, index) => {
            widget.setPos(10 + index * 10, 30 + index * 35);
            widget.setWidth(100 + index * 20);
        });
    }));

    return screen;
}

Hud.openScreen(createWidgetInfoScreen());
```

**Notes**
- ClickableWidgetHelper is the foundation for all interactive UI elements
- All widget positions are relative to their containing screen
- Z-index controls rendering order - higher values appear on top
- Tooltips appear when hovering over widgets with the mouse
- Widgets can be programmatically clicked using the `click()` method
- Use `setActive(false)` to disable widgets visually and functionally
- The base class provides common functionality inherited by specific widget types