# ListContainer

**Full Class Name:** `xyz.wagyourtail.wagyourgui.containers.ListContainer`

**Extends:** `MultiElementContainer<IContainerParent>`

**Implements:** `IContainerParent`

The `ListContainer` class is a UI container component that displays scrollable lists of items in a grid layout. It provides built-in scrolling functionality, item selection, and customizable click handlers. ListContainer is ideal for displaying lists of options, menu items, or any collection of selectable elements in JSMacros screen overlays and custom UI components.

## Overview

The `ListContainer` class provides a comprehensive list display solution with the following features:

- **Scrollable List Display:** Supports automatic scrollbar generation for long lists
- **Grid Layout:** Items are arranged in a 5-column grid layout for efficient space usage
- **Item Selection:** Built-in selection system with visual feedback
- **Customizable Callbacks:** Configurable selection handlers for interactive behavior
- **Dynamic Item Management:** Add items dynamically at runtime
- **Hover Tooltips:** Automatic tooltip display for items that can't display full text
- **Integration Ready:** Seamless integration with JSMacros screen system

## Class Hierarchy

```
ListContainer
├── Extends: MultiElementContainer<IContainerParent>
├── Implements: IContainerParent
└── Features: Scrollbar management, Button grid layout, Selection system
```

## Constructors

### `new ListContainer(x, y, width, height, textRenderer, list, parent, onSelect)`

Creates a new ListContainer with specified position, dimensions, and content.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| x | int | X coordinate of the container's top-left corner |
| y | int | Y coordinate of the container's top-left corner |
| width | int | Width of the container in pixels |
| height | int | Height of the container in pixels |
| textRenderer | TextRenderer | Minecraft text renderer for drawing text |
| list | List<Text> | Initial list of text items to display |
| parent | IOverlayParent | Parent overlay/container for this list |
| onSelect | Consumer<Integer> | Callback function when an item is selected |

**Example:**
```javascript
// Create a list container with sample options
const textRenderer = Client.getMinecraft().textRenderer;
const parent = scriptScreen; // Assume this is your screen overlay

const options = [
    Chat.createTextHelperFromString("Option 1"),
    Chat.createTextHelperFromString("Option 2"),
    Chat.createTextHelperFromString("Option 3"),
    Chat.createTextHelperFromString("Long Option Name That Might Get Cut Off")
];

const onSelectHandler = JavaWrapper.methodToJava((selectedIndex) => {
    Chat.log(`Selected item: ${selectedIndex}`);
});

const listContainer = new ListContainer(
    10, 10,     // x, y position
    200, 150,   // width, height
    textRenderer,
    options,
    parent,
    onSelectHandler
);
```

## Fields

| Field | Type | Access | Description |
|-------|------|--------|-------------|
| listItems | List<Button> | public | List of button widgets representing each item |
| scroll | Scrollbar | private | Internal scrollbar component |
| topScroll | int | private | Current scroll offset position |
| selected | int | public | Index of currently selected item (-1 if none) |
| onSelect | Consumer<Integer> | public | Selection callback function |

## Methods

### `instance.addItem(name)`

Adds a new item to the end of the list.

**Parameters:**
1. `name: Text` - The text content for the new list item

**Returns:**
* `void`

**Example:**
```javascript
// Add a new item to the list
listContainer.addItem(Chat.createTextHelperFromString("New Item"));
```

**Notes:**
- Items are automatically arranged in a 5-column grid layout
- The scrollbar is automatically updated if needed
- New items are added at the end of the current list

### `instance.setSelected(index)`

Sets the currently selected item and triggers the selection callback.

**Parameters:**
1. `index: int` - Index of the item to select (0-based)

**Returns:**
* `void`

**Example:**
```javascript
// Select the third item
listContainer.setSelected(2);

// Clear selection
listContainer.setSelected(-1);
```

**Notes:**
- Previous selection is automatically deselected and visual state is updated
- The `onSelect` callback is immediately called with the new selection index
- Invalid indices will cause an error

### `instance.onScrollbar(page)`

Internal method called when the scrollbar position changes.

**Parameters:**
1. `page: double` - The new scrollbar position (0.0 to 1.0)

**Returns:**
* `void`

**Notes:**
- This method is typically called automatically by the scrollbar component
- Updates the visibility and position of all list items based on scroll position
- Only items within the visible area are rendered for performance

## Inherited Methods from MultiElementContainer

### `instance.setVisible(visible)`

Sets the visibility of the container and all its child elements.

**Parameters:**
1. `visible: boolean` - Whether the container should be visible

**Returns:**
* `void`

**Example:**
```javascript
// Hide the list container
listContainer.setVisible(false);

// Show the list container
listContainer.setVisible(true);
```

### `instance.getVisible()`

Gets the current visibility state of the container.

**Returns:**
* `boolean`: True if the container is visible, false otherwise

**Example:**
```javascript
if (listContainer.getVisible()) {
    Chat.log("List container is currently visible");
}
```

### `instance.setPos(x, y, width, height)`

Updates the position and dimensions of the container.

**Parameters:**
1. `x: int` - New X coordinate
2. `y: int` - New Y coordinate
3. `width: int` - New width
4. `height: int` - New height

**Returns:**
* `void`

**Example:**
```javascript
// Resize the container
listContainer.setPos(20, 20, 250, 200);
```

### `instance.getButtons()`

Gets a list of all button widgets in the container.

**Returns:**
* `List<ClickableWidget>`: List of all buttons in the container

**Example:**
```javascript
const buttons = listContainer.getButtons();
Chat.log(`Container has ${buttons.size()} buttons`);
```

## Usage Examples

### Basic List Container
```javascript
// Create a simple menu list
function createBasicMenu() {
    const textRenderer = Client.getMinecraft().textRenderer;

    const menuItems = [
        Chat.createTextHelperFromString("Start Game"),
        Chat.createTextHelperFromString("Settings"),
        Chat.createTextHelperFromString("Help"),
        Chat.createTextHelperFromString("Quit")
    ];

    const selectionHandler = JavaWrapper.methodToJava((index) => {
        switch(index) {
            case 0: Chat.log("Starting game..."); break;
            case 1: Chat.log("Opening settings..."); break;
            case 2: Chat.log("Showing help..."); break;
            case 3: Chat.log("Quitting..."); break;
        }
    });

    const menu = new ListContainer(
        50, 50,     // Position
        150, 120,   // Size
        textRenderer,
        menuItems,
        scriptScreen,
        selectionHandler
    );

    return menu;
}

const gameMenu = createBasicMenu();
```

### Dynamic List Updates
```javascript
// Create a list that can be updated dynamically
function createDynamicList() {
    const textRenderer = Client.getMinecraft().textRenderer;
    const items = [];

    const selectionHandler = JavaWrapper.methodToJava((index) => {
        Chat.log(`Dynamic item selected: ${items[index].getString()}`);
    });

    const dynamicList = new ListContainer(
        10, 10, 200, 150,
        textRenderer,
        items,
        scriptScreen,
        selectionHandler
    );

    // Function to add new items
    dynamicList.addNewItem = function(text) {
        const newText = Chat.createTextHelperFromString(text);
        this.addItem(newText);
        items.push(newText);
    };

    // Function to clear and refresh
    dynamicList.refreshList = function(newItems) {
        // Note: In actual implementation, you'd need to recreate the container
        // as there's no direct clear method in the current implementation
        Chat.log("List would be refreshed with new items");
    };

    return dynamicList;
}

const playerList = createDynamicList();

// Add some items dynamically
playerList.addNewItem("Player1");
playerList.addNewItem("Player2");
playerList.addNewItem("Player3");
```

### Scrollable Inventory Display
```javascript
// Create a scrollable inventory list
function createInventoryList() {
    const textRenderer = Client.getMinecraft().textRenderer;
    const player = Player.getPlayer();

    if (!player) return null;

    const inventory = player.getInventory();
    const itemNames = [];

    // Get all item names from inventory
    for (let i = 0; i < inventory.getSlotCount(); i++) {
        const item = inventory.getSlot(i);
        if (item && !item.isEmpty()) {
            const itemName = item.getName().getString();
            itemNames.push(Chat.createTextHelperFromString(`${i}: ${itemName}`));
        }
    }

    const itemSelectionHandler = JavaWrapper.methodToJava((index) => {
        Chat.log(`Selected inventory item: ${itemNames[index].getString()}`);
        // Additional logic for handling inventory item selection
    });

    const inventoryList = new ListContainer(
        5, 5,       // Position
        160, 180,   // Size
        textRenderer,
        itemNames,
        scriptScreen,
        itemSelectionHandler
    );

    return inventoryList;
}

const invDisplay = createInventoryList();
```

### Multi-Selection Interface
```javascript
// Create a list with multi-selection capability
function createMultiSelectList() {
    const textRenderer = Client.getMinecraft().textRenderer;

    const options = [
        Chat.createTextHelperFromString("Option A"),
        Chat.createTextHelperFromString("Option B"),
        Chat.createTextHelperFromString("Option C"),
        Chat.createTextHelperFromString("Option D"),
        Chat.createTextHelperFromString("Option E"),
        Chat.createTextHelperFromString("Option F"),
        Chat.createTextHelperFromString("Option G"),
        Chat.createTextHelperFromString("Option H")
    ];

    const selectedItems = new Set();

    const selectionHandler = JavaWrapper.methodToJava((index) => {
        const optionText = options[index].getString();

        if (selectedItems.has(index)) {
            selectedItems.delete(index);
            Chat.log(`Deselected: ${optionText}`);
        } else {
            selectedItems.add(index);
            Chat.log(`Selected: ${optionText}`);
        }

        // Update visual feedback (would need custom implementation)
        Chat.log(`Currently selected: ${Array.from(selectedItems).join(', ')}`);
    });

    const multiSelect = new ListContainer(
        10, 10, 180, 100,
        textRenderer,
        options,
        scriptScreen,
        selectionHandler
    );

    // Add custom methods for multi-selection management
    multiSelect.getSelectedItems = () => Array.from(selectedItems);
    multiSelect.clearSelection = () => {
        selectedItems.clear();
        Chat.log("Selection cleared");
    };

    return multiSelect;
}

const multiList = createMultiSelectList();
```

### Animated List Transitions
```javascript
// Create a list with animated transitions
function createAnimatedList() {
    const textRenderer = Client.getMinecraft().textRenderer;

    const categories = [
        Chat.createTextHelperFromString("Weapons"),
        Chat.createTextHelperFromString("Armor"),
        Chat.createTextHelperFromString("Tools"),
        Chat.createTextHelperFromString("Food"),
        Chat.createTextHelperFromString("Blocks"),
        Chat.createTextHelperFromString("Items")
    ];

    let currentSelection = -1;

    const animatedSelectionHandler = JavaWrapper.methodToJava((index) => {
        if (currentSelection !== index) {
            currentSelection = index;
            const categoryName = categories[index].getString();

            // Animate selection feedback
            Chat.log(`Selected category: ${categoryName}`);

            // Trigger category-specific content loading
            loadCategoryContent(categoryName);
        }
    });

    const animatedList = new ListContainer(
        20, 20, 140, 80,
        textRenderer,
        categories,
        scriptScreen,
        animatedSelectionHandler
    );

    // Simulate category content loading
    function loadCategoryContent(category) {
        Chat.log(`Loading content for ${category}...`);
        // Implementation would load category-specific items
    }

    return animatedList;
}

const categoryMenu = createAnimatedList();
```

## Advanced Configuration

### Custom Scrollbar Styling
```javascript
// Note: The scrollbar is created internally, but its appearance can be modified
// by accessing the scroll field if needed (though it's private)

// The scrollbar uses these default colors:
// - Background: 0xFF000000 (Black)
// - Thumb: 0xFFFFFFFF (White)
// - Border width: 2 pixels

// For custom styling, you would need to extend ListContainer or create a custom implementation
```

### Performance Optimization
```javascript
// For large lists, consider these optimization tips:

// 1. Paginate large datasets
function createPaginatedList(items, itemsPerPage = 20) {
    const textRenderer = Client.getMinecraft().textRenderer;
    let currentPage = 0;

    function getCurrentPageItems() {
        const start = currentPage * itemsPerPage;
        const end = Math.min(start + itemsPerPage, items.length);
        return items.slice(start, end);
    }

    const selectionHandler = JavaWrapper.methodToJava((index) => {
        const actualIndex = (currentPage * itemsPerPage) + index;
        Chat.log(`Selected actual item: ${actualIndex}`);
    });

    const paginatedList = new ListContainer(
        10, 10, 200, 150,
        textRenderer,
        getCurrentPageItems(),
        scriptScreen,
        selectionHandler
    );

    // Add pagination controls (would need custom implementation)
    paginatedList.nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < items.length) {
            currentPage++;
            // Recreate list with new page items
        }
    };

    return paginatedList;
}
```

## Integration with Screen System

### Script Screen Integration
```javascript
// Complete example of ListContainer in a script screen
events.on("Init", JavaWrapper.methodToJava(() => {
    const screen = Hud.createScreen("ListContainer Example", false);

    const textRenderer = Client.getMinecraft().textRenderer;

    // Create main menu
    const menuItems = [
        Chat.createTextHelperFromString("Player Stats"),
        Chat.createTextHelperFromString("Inventory"),
        Chat.createTextHelperFromString("Settings"),
        Chat.createTextHelperFromString("Help"),
        Chat.createTextHelperFromString("Exit")
    ];

    const menuHandler = JavaWrapper.methodToJava((index) => {
        switch(index) {
            case 0:
                Chat.log("Opening player stats...");
                showPlayerStats();
                break;
            case 1:
                Chat.log("Opening inventory...");
                showInventory();
                break;
            case 2:
                Chat.log("Opening settings...");
                showSettings();
                break;
            case 3:
                Chat.log("Showing help...");
                showHelp();
                break;
            case 4:
                screen.close();
                break;
        }
    });

    const mainMenu = new ListContainer(
        10, 10, 200, 120,
        textRenderer,
        menuItems,
        screen,
        menuHandler
    );

    // Add the list container to the screen
    screen.addElement(mainMenu);

    // Helper functions for different screens
    function showPlayerStats() {
        const player = Player.getPlayer();
        if (player) {
            Chat.log(`Health: ${player.getHealth()}/${player.getMaxHealth()}`);
            Chat.log(`Experience: ${player.experienceLevel}`);
        }
    }

    function showInventory() {
        Chat.log("Inventory display would go here");
    }

    function showSettings() {
        Chat.log("Settings menu would go here");
    }

    function showHelp() {
        Chat.log("Help information would go here");
    }
}));
```

## Layout and Positioning

### Grid Layout System
The ListContainer automatically arranges items in a 5-column grid:
- Each item occupies 1/5 of the container width (minus margins)
- Items are 12 pixels tall
- Items are placed with 3-pixel margins from the left edge
- The layout updates automatically when scrolling

### Scrolling Behavior
- The scrollbar appears when items exceed the visible area
- Scrolling is smooth and updates item positions in real-time
- Only visible items are rendered for performance
- The scrollbar occupies the rightmost 8 pixels of the container

### Visual Feedback
- Selected items have a forced hover state
- Items with truncated text show tooltips on hover
- The scrollbar provides visual feedback for scroll position

## Important Notes

1. **Initialization:** Always call `init()` on the container after construction to properly initialize child elements.

2. **Parent Management:** The container requires a valid parent that implements `IOverlayParent` for proper integration with the screen system.

3. **Text Rendering:** All text items must be provided as `Text` objects, typically created using `Chat.createTextHelperFromString()`.

4. **Performance:** For very large lists (hundreds of items), consider implementing pagination or virtual scrolling for better performance.

5. **Thread Safety:** All UI operations must be performed on the main client thread. Use appropriate event handlers or scheduling for UI updates.

6. **Layout Constraints:** The container uses a fixed 5-column layout. For different layouts, you would need to create a custom container implementation.

7. **Scrollbar Integration:** The scrollbar is automatically created and managed. Manual scrollbar manipulation is not typically needed.

8. **Selection State:** Only one item can be selected at a time in the default implementation. For multi-selection, you would need to implement custom selection logic.

9. **Text Overflow:** Items with text longer than the display width will show tooltips on hover instead of truncating.

10. **Container Lifecycle:** The container should be properly cleaned up when the parent screen or overlay is closed to prevent memory leaks.

## Related Classes

- `MultiElementContainer` - Parent class providing base container functionality
- `IContainerParent` - Interface for container parent management
- `Scrollbar` - Scrollbar component used internally
- `Button` - Button widgets representing list items
- `Text` - Minecraft text objects for item labels
- `IOverlayParent` - Interface for overlay parent containers

## Version Compatibility

This class is part of the wagyourgui library used by JSMacros and is compatible with modern Minecraft client versions. The class provides a stable API for creating scrollable list interfaces in JSMacros scripts and screen overlays.

## Common Use Cases

- **Menu Systems:** Create navigation menus for script interfaces
- **Inventory Display:** Show player inventory or container contents
- **Selection Lists:** Allow users to choose from multiple options
- **Data Display:** Present tabular data in a scrollable format
- **Configuration Interfaces:** Create settings lists with selectable options
- **Content Navigation:** Provide navigation through large datasets
- **Category Selection:** Allow users to choose from item categories
- **Player Lists:** Display online players or server participants