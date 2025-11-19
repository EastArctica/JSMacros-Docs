# Scrollbar

**Full Class Name:** `xyz.wagyourtail.wagyourgui.elements.Scrollbar`

**Extends:** `net.minecraft.client.gui.widget.ClickableWidget`

**Since:** JsMacros 1.0.0

The `Scrollbar` class is a custom UI widget that provides vertical scrolling functionality for JSMacros custom screens and interfaces. It offers smooth scrolling mechanics with customizable appearance, range configuration, and event handling for scroll position changes. The scrollbar automatically calculates its thumb size based on the content size and provides both click-to-scroll and drag-to-scroll interactions.

## Overview

The `Scrollbar` class provides comprehensive scrolling functionality:

- **Dynamic Range Configuration**: Supports custom scroll ranges with automatic thumb sizing
- **Visual Customization**: Customizable colors for the thumb, background, and hover states
- **Interactive Controls**: Click-to-position and drag-to-scroll functionality
- **Event Handling**: Callback system for scroll position changes with proper value calculation
- **Auto-Visibility**: Automatically hides when content fits within view
- **Smooth Scrolling**: Natural scrolling behavior with proper position calculation

## Constructors

### `new Scrollbar(x, y, width, height, color, borderColor, highlightColor, scrollPages, onChange)`
Creates a new Scrollbar with specified position, size, colors, scroll range, and change callback.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| x | int | X position of the scrollbar on the screen |
| y | int | Y position of the scrollbar on the screen |
| width | int | Width of the scrollbar (typically 8-12 pixels) |
| height | int | Height of the scrollbar |
| color | int | Background color of the scrollbar track |
| borderColor | int | Color of the scrollbar borders |
| highlightColor | int | Color of the scrollbar thumb (draggable part) |
| scrollPages | double | Total number of scroll pages/content units |
| onChange | Consumer<Double> | Callback function triggered on scroll position changes |

**Example:**
```javascript
// Create a scrollbar for scrolling through 100 items
const scrollbar = new Scrollbar(
    200, 20,      // Position (x, y)
    10, 100,      // Size (width, height)
    0xFF404040,   // Dark gray background
    0xFF202020,   // Darker gray borders
    0xFF808080,   // Light gray thumb
    100,          // 100 scrollable pages/items
    JavaWrapper.methodToJava((position) => {
        Chat.log(`Scrolled to position: ${position.toFixed(2)}`);
    })
);
```

## Fields

All fields are internal to the scrollbar implementation and are managed through the provided methods.

## Methods

### `scrollbar.setPos(x, y, width, height)`
Updates the position and dimensions of the scrollbar, recalculating scroll distances and maintaining relative scroll position.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| x | int | New X position of the scrollbar |
| y | int | New Y position of the scrollbar |
| width | int | New width of the scrollbar |
| height | int | New height of the scrollbar |

**Returns:**
* `Scrollbar` - Returns the scrollbar instance for method chaining

**Example:**
```javascript
// Reposition the scrollbar when the screen resizes
scrollbar.setPos(180, 20, 10, 120);
```

### `scrollbar.setScrollPages(scrollPages)`
Updates the total number of scrollable pages or content units, automatically adjusting thumb size and visibility.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| scrollPages | double | Total number of scroll pages/content units |

**Behavior:**
- If `scrollPages < 1`, the scrollbar becomes inactive and hidden
- Thumb size is calculated proportionally to the content ratio
- Maintains relative scroll position when possible

**Example:**
```javascript
// Update scrollbar when content size changes
scrollbar.setScrollPages(contentItems.length);

// Hide scrollbar when content fits
if (contentItems.length <= visibleItems) {
    scrollbar.setScrollPages(0.5); // Less than 1 hides it
}
```

### `scrollbar.scrollToPercent(percent)`
Scrolls to a specific percentage of the total scroll range.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| percent | double | Percentage to scroll to (0.0 to 1.0) |

**Example:**
```javascript
// Scroll to the top
scrollbar.scrollToPercent(0.0);

// Scroll to the middle
scrollbar.scrollToPercent(0.5);

// Scroll to the bottom
scrollbar.scrollToPercent(1.0);
```

### `scrollbar.onChange()`
Internal method that triggers the change callback with the current scroll position calculated as a percentage of the total scrollable range.

**Note:** This method is called automatically by other scrollbar methods and user interactions. You typically don't need to call this directly.

## Usage Examples

### Basic Scrollbar Setup
```javascript
// Create a screen with a scrollbar
const screen = Hud.createScreen("Scrollable Content", true);

// Create the scrollbar
const scrollbar = new Scrollbar(
    280, 20,      // Position at right edge
    10, 140,      // Thin scrollbar, full height
    0xFF404040,   // Dark background
    0xFF202020,   // Dark borders
    0xFF808080,   // Gray thumb
    50,           // 50 scrollable items
    JavaWrapper.methodToJava((position) => {
        // Handle scroll position changes
        updateVisibleItems(Math.floor(position));
    })
);

// Add scrollbar to screen (assuming screen has method to add custom widgets)
screen.addWidget(scrollbar);
Hud.openScreen(screen);
```

### Scrollbar with Content List
```javascript
// Create a scrollable list interface
const screen = Hud.createScreen("Scrollable List", true);
const items = Array.from({length: 100}, (_, i) => `Item ${i + 1}`);
let visibleStart = 0;
const visibleCount = 10;

// Create scrollbar for the list
const scrollbar = new Scrollbar(
    250, 30,      // Position
    8, 120,       // Thin vertical scrollbar
    0xFF505050,   // Background color
    0xFF303030,   // Border color
    0xFFA0A0A0,   // Thumb color
    items.length, // Total items to scroll through
    JavaWrapper.methodToJava((position) => {
        visibleStart = Math.floor(position);
        updateListDisplay();
    })
);

// Function to update the displayed items
function updateListDisplay() {
    // Clear existing text elements (implementation depends on your screen)
    screen.clearTextElements();

    // Display visible items
    for (let i = 0; i < visibleCount && visibleStart + i < items.length; i++) {
        const text = Hud.createTextElement()
            .pos(20, 30 + i * 12)
            .text(Chat.createTextHelperFromString(items[visibleStart + i]))
            .build();
        screen.addText(text);
    }
}

// Add scrollbar and initial display
screen.addWidget(scrollbar);
updateListDisplay();
Hud.openScreen(screen);
```

### Dynamic Scrollbar Updates
```javascript
// Scrollbar that adapts to changing content
const screen = Hud.createScreen("Dynamic Content", true);
let contentItems = ["Item 1", "Item 2", "Item 3"];
const scrollbar = new Scrollbar(
    220, 20, 8, 100,
    0xFF404040, 0xFF202020, 0xFF808080,
    contentItems.length,
    JavaWrapper.methodToJava((position) => {
        updateContentDisplay(Math.floor(position));
    })
);

// Function to add new content
function addContent(newItem) {
    contentItems.push(newItem);
    scrollbar.setScrollPages(contentItems.length);
    Chat.log(`Added: ${newItem} (Total: ${contentItems.length})`);
}

// Function to remove content
function removeContent(index) {
    if (index >= 0 && index < contentItems.length) {
        const removed = contentItems.splice(index, 1)[0];
        scrollbar.setScrollPages(Math.max(contentItems.length, 1));
        Chat.log(`Removed: ${removed} (Total: ${contentItems.length})`);
    }
}

// Buttons to control content
const addBtn = new ButtonBuilder(screen)
    .pos(20, 140)
    .width(80)
    .message(Chat.createTextHelperFromString("Add Item"))
    .action(JavaWrapper.methodToJava(() => {
        addContent(`Item ${contentItems.length + 1}`);
    }))
    .createWidget();

const removeBtn = new ButtonBuilder(screen)
    .pos(110, 140)
    .width(80)
    .message(Chat.createTextHelperFromString("Remove Last"))
    .action(JavaWrapper.methodToJava(() => {
        if (contentItems.length > 0) {
            removeContent(contentItems.length - 1);
        }
    }))
    .createWidget();

screen.addWidget(scrollbar);
screen.addButton(addBtn);
screen.addButton(removeBtn);
Hud.openScreen(screen);
```

### Scrollbar with Smooth Scrolling
```javascript
// Implement smooth scrolling animation
const screen = Hud.createScreen("Smooth Scrolling", true);
const scrollbar = new Scrollbar(
    200, 20, 10, 100,
    0xFF404040, 0xFF202020, 0xFF808080,
    100,
    JavaWrapper.methodToJava((position) => {
        updateDisplay(Math.floor(position));
    })
);

let targetPosition = 0;
let currentPosition = 0;
let isAnimating = false;

function smoothScrollTo(target) {
    targetPosition = target;
    if (!isAnimating) {
        isAnimating = true;
        animateScroll();
    }
}

function animateScroll() {
    const diff = targetPosition - currentPosition;

    if (Math.abs(diff) < 0.1) {
        currentPosition = targetPosition;
        isAnimating = false;
        return;
    }

    // Smooth easing
    currentPosition += diff * 0.1;
    scrollbar.scrollToPercent(currentPosition / 100);

    // Continue animation
    setTimeout(() => animateScroll(), 16); // ~60 FPS
}

// Buttons for smooth scrolling
const topBtn = new ButtonBuilder(screen)
    .pos(50, 130)
    .width(60)
    .message(Chat.createTextHelperFromString("Top"))
    .action(JavaWrapper.methodToJava(() => {
        smoothScrollTo(0);
    }))
    .createWidget();

const middleBtn = new ButtonBuilder(screen)
    .pos(120, 130)
    .width(60)
    .message(Chat.createTextHelperFromString("Middle"))
    .action(JavaWrapper.methodToJava(() => {
        smoothScrollTo(50);
    }))
    .createWidget();

const bottomBtn = new ButtonBuilder(screen)
    .pos(50, 155)
    .width(60)
    .message(Chat.createTextHelperFromString("Bottom"))
    .action(JavaWrapper.methodToJava(() => {
        smoothScrollTo(100);
    }))
    .createWidget();

screen.addWidget(scrollbar);
screen.addButton(topBtn);
screen.addButton(middleBtn);
screen.addButton(bottomBtn);
Hud.openScreen(screen);
```

### Scrollbar with Mouse Wheel Support
```javascript
// Combine scrollbar with mouse wheel scrolling
const screen = Hud.createScreen("Mouse Wheel Scroll", true);
const scrollbar = new Scrollbar(
    250, 20, 10, 120,
    0xFF404040, 0xFF202020, 0xFF808080,
    50,
    JavaWrapper.methodToJava((position) => {
        updateDisplay(Math.floor(position));
    })
);

let currentScroll = 0;

// Handle mouse wheel events
events.on("MouseScroll", JavaWrapper.methodToJava((event) => {
    if (screen.isActive()) { // Only scroll when our screen is active
        const scrollDelta = event.scrollDelta;
        currentScroll = Math.max(0, Math.min(49, currentScroll - scrollDelta / 120));
        scrollbar.scrollToPercent(currentScroll / 49);
    }
}));

// Sync scrollbar position when user drags it
const originalOnChange = scrollbar.onChange;
scrollbar.onChange = JavaWrapper.methodToJava(() => {
    currentScroll = scrollbar.scrollPages * scrollbar.scrollAmount / scrollbar.scrollDistance;
    originalOnChange();
});

screen.addWidget(scrollbar);
Hud.openScreen(screen);
```

### Scrollbar with Progress Indicator
```javascript
// Create a scrollbar that shows progress information
const screen = Hud.createScreen("Progress Scrollbar", true);
const totalItems = 200;
const itemsPerPage = 15;

const scrollbar = new Scrollbar(
    220, 30, 12, 110,
    0xFF303030, 0xFF101010, 0xFF606060,
    totalItems,
    JavaWrapper.methodToJava((position) => {
        const currentPage = Math.floor(position / itemsPerPage) + 1;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startItem = Math.floor(position) + 1;
        const endItem = Math.min(Math.floor(position) + itemsPerPage, totalItems);

        // Update progress text
        progressText.setText(
            Chat.createTextHelperFromString(
                `Showing ${startItem}-${endItem} of ${totalItems} (Page ${currentPage}/${totalPages})`
            )
        );

        updateVisibleItems(Math.floor(position));
    })
);

// Add progress display text
const progressText = Hud.createTextElement()
    .pos(20, 145)
    .text(Chat.createTextHelperFromString("Showing 1-15 of 200 (Page 1/14)"))
    .build();

function updateVisibleItems(startIndex) {
    // Implementation to update visible items based on startIndex
    // This would typically update text elements or other UI components
    Chat.log(`Displaying items ${startIndex + 1} to ${Math.min(startIndex + itemsPerPage, totalItems)}`);
}

screen.addWidget(scrollbar);
screen.addText(progressText);
Hud.openScreen(screen);
```

## Color Customization Guide

The scrollbar uses standard integer color formats:

- **Color Format**: `0xAARRGGBB` where:
  - `AA` = Alpha (0-255, typically 255 for opaque)
  - `RR` = Red component (0-255)
  - `GG` = Green component (0-255)
  - `BB` = Blue component (0-255)

- **Common Color Combinations**:
  ```javascript
  // Dark theme
  0xFF404040, // Background - medium gray
  0xFF202020, // Border - dark gray
  0xFF808080, // Thumb - light gray

  // Light theme
  0xFFE0E0E0, // Background - very light gray
  0xFFC0C0C0, // Border - light gray
  0xFF606060, // Thumb - medium gray

  // Blue theme
  0xFF2C3E50, // Background - dark blue-gray
  0xFF1A252F, // Border - darker blue
  0xFF3498DB, // Thumb - blue

  // Custom colored
  0xFF8B4513, // Background - saddle brown
  0xFF654321, // Border - dark brown
  0xFFD2691E, // Thumb - chocolate
  ```

## Performance Considerations

1. **Callback Efficiency**: Keep the onChange callback lightweight as it's called frequently during scrolling
2. **Update Frequency**: The scrollbar can generate many position updates during smooth scrolling
3. **Visual Updates**: Minimize complex UI updates in the callback to maintain smooth performance
4. **Memory Management**: Remove scrollbars from screens when they're no longer needed

## Integration with Scrollable Containers

The scrollbar is designed to work with scrollable content containers:

```javascript
// Example of synchronizing scrollbar with a scrollable panel
class ScrollableContainer {
    constructor(screen, x, y, width, height, contentHeight) {
        this.screen = screen;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.contentHeight = contentHeight;
        this.scrollPosition = 0;

        // Create scrollbar
        this.scrollbar = new Scrollbar(
            x + width - 12, y, 12, height,
            0xFF404040, 0xFF202020, 0xFF808080,
            contentHeight,
            JavaWrapper.methodToJava((position) => {
                this.scrollPosition = Math.floor(position);
                this.updateContent();
            })
        );

        screen.addWidget(this.scrollbar);
    }

    updateContent() {
        // Calculate content offset based on scroll position
        const maxScroll = Math.max(0, this.contentHeight - this.height);
        const scrollRatio = this.scrollPosition / (this.contentHeight - this.height);
        const offset = Math.floor(maxScroll * scrollRatio);

        // Update content positions based on offset
        // Implementation depends on your content type
        Chat.log(`Content offset: ${offset} pixels`);
    }

    setContentHeight(newHeight) {
        this.contentHeight = newHeight;
        this.scrollbar.setScrollPages(newHeight);
    }
}

// Usage
const screen = Hud.createScreen("Scrollable Container", true);
const container = new ScrollableContainer(screen, 20, 20, 200, 150, 300);
Hud.openScreen(screen);
```

## Important Notes

1. **Auto-Hiding**: Scrollbars automatically hide when `scrollPages < 1` (content fits in view)
2. **Thumb Sizing**: The thumb size is automatically calculated based on the ratio of visible content to total content
3. **Position Range**: Scroll positions are returned as 0-based indices, not 1-based
4. **Thread Safety**: Scrollbar callbacks are executed on the main rendering thread
5. **Coordinate System**: Uses screen coordinates where (0,0) is the top-left corner
6. **Event Propagation**: Scrollbar events may interfere with other mouse events in the same area
7. **Smooth Interaction**: The scrollbar provides natural feel with click-to-position and drag-to-scroll

## Version History

- **1.0.0**: Initial release with basic scrolling functionality
- **1.2.0**: Enhanced thumb sizing and auto-hiding behavior
- **1.4.0**: Improved color customization and event handling
- **Current**: Full feature set with comprehensive scroll mechanics

## Related Classes

- `ClickableWidget` - Parent class providing base widget functionality
- `Consumer<Double>` - Functional interface for scroll position callbacks
- `DrawContext` - Minecraft's drawing context for custom rendering
- `IScreen` - Interface for custom screens that can contain scrollbars
- `ButtonBuilder` - Builder class for creating buttons that can control scrollbars