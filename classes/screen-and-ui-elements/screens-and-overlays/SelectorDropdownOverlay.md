# SelectorDropdownOverlay

**Full Class Name:** `xyz.wagyourtail.wagyourgui.overlays.SelectorDropdownOverlay`

**Extends:** `OverlayContainer`

The `SelectorDropdownOverlay` class is a specialized overlay component that provides a dropdown selection interface for users. It displays a scrollable list of text choices that users can navigate through keyboard controls or mouse clicks. This overlay is commonly used for language selection, setting options, and other scenarios where users need to choose from a list of items.

**Key Features:**
- Scrollable list of text choices
- Keyboard navigation (arrow keys, enter/tab)
- Mouse click selection
- Visual selection highlighting
- Automatic scrollbar for long lists
- Click-outside-to-close functionality
- Customizable positioning and dimensions

## Constructors

### `new SelectorDropdownOverlay(x, y, width, height, choices, textRenderer, parent, onChoice)`

Creates a new selector dropdown overlay with the specified parameters.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | `int` | The x coordinate of the overlay's top-left corner |
| `y` | `int` | The y coordinate of the overlay's top-left corner |
| `width` | `int` | The width of the overlay in pixels |
| `height` | `int` | The height of the overlay in pixels |
| `choices` | `Collection<Text>` | A collection of Text objects representing the selectable choices |
| `textRenderer` | `TextRenderer` | The text renderer for drawing text elements |
| `parent` | `IOverlayParent` | The parent overlay container |
| `onChoice` | `Consumer<Integer>` | Callback function that accepts the index of the selected choice |

## Fields

### `selected: int`
The index of the currently selected item in the dropdown. Initial value is `-1` (no selection).

### `choices: Collection<Text>`
The collection of text choices displayed in the dropdown.

### `scrollChoices: List<Button>`
A list of button elements representing each choice in the dropdown.

### `lineHeight: int`
The height of each line in the dropdown, calculated from the text renderer's font height.

### `pages: double`
The number of pages needed to display all choices (used for scrollbar calculations).

## Methods

### Initialization Methods

#### `init()`
Initializes the overlay by creating buttons for each choice and setting up the scrollbar if needed. This method is called automatically when the overlay is opened.

**Example:**
```js
// Note: This is typically called internally, but here's how it works:
const overlay = new SelectorDropdownOverlay(x, y, width, height, choices, textRenderer, parent, onChoice);
overlay.init(); // Creates buttons and scrollbar
```

### Selection Methods

#### `setSelected(sel)`
Sets the currently selected choice by index and updates the visual highlighting.

**Parameters:**
- `sel` (`int`): The index of the choice to select. Use `-1` for no selection.

**Example:**
```js
// Select the first item
overlay.setSelected(0);

// Clear selection
overlay.setSelected(-1);

// Select last item (note: this needs validation)
const lastIndex = overlay.choices.size() - 1;
overlay.setSelected(lastIndex);
```

### Scrolling Methods

#### `onScroll(page)`
Handles scrolling functionality by updating the visibility and positions of choice buttons based on the current scroll position.

**Parameters:**
- `page` (`double`): The current scroll page offset

**Example:**
```js
// Scroll to top (page 0)
overlay.onScroll(0);

// Scroll halfway through the list
const halfwayPoint = overlay.pages / 2;
overlay.onScroll(halfwayPoint);
```

### Event Handling Methods

#### `onClick(mouseX, mouseY, button)`
Handles mouse click events. Closes the overlay if the click occurs outside the overlay bounds.

**Parameters:**
- `mouseX` (`double`): The x coordinate of the mouse click
- `mouseY` (`double`): The y coordinate of the mouse click
- `button` (`int`): The mouse button that was clicked

**Example:**
```js
// This is typically called internally by the GUI system
overlay.onClick(100, 50, 0); // Left click at position (100, 50)
```

#### `keyPressed(keyCode, scanCode, modifiers)`
Handles keyboard input for navigation and selection.

**Key Bindings:**
- `GLFW_KEY_UP`: Move selection up
- `GLFW_KEY_DOWN`: Move selection down
- `GLFW_KEY_ENTER` or `GLFW_KEY_TAB`: Confirm selection and close

**Parameters:**
- `keyCode` (`int`): The GLFW key code
- `scanCode` (`int`): The platform-specific scan code
- `modifiers` (`int`): Modifier key flags

**Returns:** `boolean` - `true` if the key was handled, `false` otherwise

**Example:**
```js
// Simulate keyboard input
overlay.keyPressed(265, 0, 0); // Up arrow
overlay.keyPressed(264, 0, 0); // Down arrow
overlay.keyPressed(257, 0, 0); // Enter key
```

### Rendering Methods

#### `render(drawContext, mouseX, mouseY, delta)`
Renders the overlay including background, buttons, and scrollbar.

**Parameters:**
- `drawContext` (`DrawContext`): The drawing context for rendering
- `mouseX` (`int`): Current mouse x position
- `mouseY` (`int`): Current mouse y position
- `delta` (`float`): Delta time for animations

**Example:**
```js
// This is typically called automatically each frame
overlay.render(drawContext, mouseX, mouseY, delta);
```

#### `renderBackground(drawContext)`
Renders the overlay background with borders.

**Parameters:**
- `drawContext` (`DrawContext`): The drawing context for rendering

**Note:** This method is inherited from `OverlayContainer` and renders a black background with a two-layer border system.

### Utility Methods

#### `close()`
Closes the overlay and returns control to the parent container.

**Example:**
```js
// Close the dropdown programmatically
overlay.close();
```

## Usage Examples

### Basic Language Selector
```js
// This example demonstrates how to create a language selector dropdown
function createLanguageSelector(x, y, parent) {
    const textRenderer = Client.getMinecraft().textRenderer;

    // Define available languages
    const languages = [
        Text.literal("English"),
        Text.literal("Spanish"),
        Text.literal("French"),
        Text.literal("German"),
        Text.literal("Japanese"),
        Text.literal("Chinese"),
        Text.literal("Russian")
    ];

    // Create dropdown overlay
    const dropdown = new SelectorDropdownOverlay(
        x, y,                    // Position
        200, 150,                // Width and height
        languages,               // Choices
        textRenderer,            // Text renderer
        parent,                  // Parent overlay
        (index) => {             // Selection callback
            const selectedLanguage = languages[index].getString();
            Chat.log(`Selected language: ${selectedLanguage}`);
            // Apply language change logic here
        }
    );

    return dropdown;
}
```

### Theme Selector with Categories
```js
// Example of creating a theme selector with visual feedback
function createThemeSelector(x, y, parent) {
    const textRenderer = Client.getMinecraft().textRenderer;

    // Theme options with visual indicators
    const themes = [
        Text.literal("§f§lLight Theme"),
        Text.literal("§0§lDark Theme"),
        Text.literal("§6§lSunset Theme"),
        Text.literal("§b§lOcean Theme"),
        Text.literal("§2§lForest Theme"),
        Text.literal("§c§lRuby Theme"),
        Text.literal("§5§lAmethyst Theme"),
        Text.literal("§e§lGolden Theme")
    ];

    const dropdown = new SelectorDropdownOverlay(
        x, y, 250, 200, themes, textRenderer, parent,
        (index) => {
            const themeName = themes[index].getString();
            Chat.log(`Applied theme: ${themeName}`);
            // Apply theme changes
            applyTheme(index);
        }
    );

    // Pre-select current theme
    dropdown.setSelected(getCurrentThemeIndex());

    return dropdown;
}

function applyTheme(themeIndex) {
    // Theme application logic would go here
    // This might modify UI colors, backgrounds, etc.
}
```

### Server Selector with Status
```js
// Example showing a server selector with connection status
function createServerSelector(x, y, parent, servers) {
    const textRenderer = Client.getMinecraft().textRenderer;

    // Create text with server status
    const serverChoices = servers.map(server => {
        const status = server.online ? "§a● " : "§c● ";
        const ping = server.ping ? ` §7(${server.ping}ms)` : " §7(---)";
        return Text.literal(status + server.name + ping);
    });

    return new SelectorDropdownOverlay(
        x, y, 300, Math.min(250, serverChoices.length * 20),
        serverChoices, textRenderer, parent,
        (index) => {
            const selectedServer = servers[index];
            if (selectedServer.online) {
                Chat.log(`Connecting to ${selectedServer.name}...`);
                connectToServer(selectedServer);
            } else {
                Chat.log(`§cCannot connect to ${selectedServer.name} - server offline`);
            }
        }
    );
}

function connectToServer(server) {
    // Server connection logic
    Chat.log(`§6Connecting to ${server.address}:${server.port}`);
}
```

### Command History Selector
```js
// Example for selecting from command history
function createCommandHistorySelector(x, y, parent, commandHistory) {
    const textRenderer = Client.getMinecraft().textRenderer;

    // Format commands with index numbers
    const historyChoices = commandHistory.map((cmd, index) => {
        return Text.literal(`§7[${index + 1}] §f${cmd.substring(0, 30)}${cmd.length > 30 ? "..." : ""}`);
    });

    const dropdown = new SelectorDropdownOverlay(
        x, y, 400, Math.min(200, historyChoices.length * 18),
        historyChoices, textRenderer, parent,
        (index) => {
            const selectedCommand = commandHistory[index];
            Chat.log(`§aSelected command: §f${selectedCommand}`);
            executeCommand(selectedCommand);
        }
    );

    return dropdown;
}

function executeCommand(command) {
    // Execute the selected command
    Chat.say(command);
}
```

### Search Results Dropdown
```js
// Example dropdown for displaying search results
function createSearchResultsSelector(x, y, parent, searchResults) {
    const textRenderer = Client.getMinecraft().textRenderer;

    // Format search results with relevance indicators
    const resultChoices = searchResults.map(result => {
        const relevance = result.relevance >= 0.9 ? "§a" :
                         result.relevance >= 0.7 ? "§e" : "§7";
        return Text.literal(`${relevance}● §f${result.title} §7(${result.category})`);
    });

    const dropdown = new SelectorDropdownOverlay(
        x, y, 350, Math.min(180, resultChoices.length * 20),
        resultChoices, textRenderer, parent,
        (index) => {
            const selectedResult = searchResults[index];
            Chat.log(`§aOpening: §f${selectedResult.title}`);
            openResult(selectedResult);
        }
    );

    // Auto-select first result
    dropdown.setSelected(0);

    return dropdown;
}

function openResult(result) {
    // Open or display the selected search result
    Chat.log(`§6Loading: ${result.url || result.path}`);
}
```

## Keyboard Navigation

The overlay supports comprehensive keyboard navigation:

### Navigation Keys
- **↑ Arrow**: Move selection up one item
- **↓ Arrow**: Move selection down one item
- **Enter**: Confirm current selection
- **Tab**: Confirm current selection

### Navigation Behavior
- Selection wraps within valid bounds
- Visual highlighting shows current selection
- Confirmation triggers the callback and closes the overlay
- Clicking outside the overlay closes it without selection

## Visual Appearance

### Background Style
- Black background (`0xFF000000`)
- Two-layer border system with semi-transparent and opaque white borders
- Consistent with Minecraft UI design language

### Button Styling
- Default colors: Black background, white borders, white text
- Hover highlighting: Semi-transparent overlay (`0x4FFFFFFF`)
- Selection highlighting: Forced hover state on selected item

### Scrollbar
- Automatically appears when content exceeds available height
- 8-pixel wide scrollbar on the right side
- Customizable colors for thumb and track

## Integration Notes

### Parent Container Requirements
- Parent must implement `IOverlayParent` interface
- Parent must support overlay management (open/close)
- Parent should handle focus management

### Memory Management
- Choice buttons are automatically managed
- Overlay cleans up buttons when closed
- Parent button states are preserved during overlay display

### Performance Considerations
- Efficient rendering with visibility culling
- Scrollbar calculations use page-based system
- Button creation is limited to visible choices

## Common Use Cases

1. **Language Selection**: Choose from available translation languages
2. **Theme Switching**: Select UI color themes and styles
3. **Server Browser**: Pick from multiplayer server list
4. **Command History**: Access previously executed commands
5. **Search Results**: Display and select from search matches
6. **Profile Selection**: Choose from user profiles or characters
7. **Settings Options**: Select from configuration choices
8. **Inventory Categories**: Filter or organize inventory items

## Related Classes

- `OverlayContainer` - Base class for overlay management
- `IOverlayParent` - Interface for overlay parent containers
- `Button` - Individual choice buttons in the dropdown
- `Scrollbar` - Scrolling functionality for long lists
- `Text` - Minecraft text component for display
- `TextRenderer` - Text rendering utilities

## Important Notes

1. **Internal Usage**: This class is primarily used internally by JSMacros GUI components and may not be directly accessible to scripts in all contexts.

2. **Threading**: All operations must be performed on the main client thread.

3. **Coordinate System**: Uses Minecraft GUI coordinate system where (0,0) is the top-left corner.

4. **Text Formatting**: Supports Minecraft text formatting codes in choice labels.

5. **Dynamic Content**: Choice collection should be stable during overlay lifecycle to avoid indexing issues.

6. **Callback Execution**: Selection callback is executed before overlay closure.

7. **Scroll Behavior**: Scroll position is maintained during selection changes.

8. **Focus Management**: Overlay automatically manages focus for keyboard input.

## Version Information

- Part of the wagyourgui overlay system
- Used extensively in JSMacros editor and settings screens
- Stable API with consistent behavior across JSMacros versions
- Compatible with Minecraft's GUI rendering system