# User Interface (UI) Classes

The JsMacros UI system provides comprehensive tools for creating custom graphical interfaces, HUDs (Heads-Up Displays), overlays, and interactive screens. These classes enable everything from simple text overlays to complex multi-screen applications with custom widgets and layouts.

## Core UI Framework

### [ScriptScreen](ScriptScreen.md)
The foundational class for creating custom interactive screens. ScriptScreen provides a base screen that can be customized with widgets, text, and interactive elements.

**Key Features:**
- Custom screen creation with configurable backgrounds
- Widget integration (buttons, text fields, sliders, etc.)
- Custom rendering with `setOnRender()`
- Screen lifecycle management
- Parent-child screen relationships

**Common Use Cases:**
- Custom configuration screens
- Interactive forms and dialogs
- Script management interfaces
- User input collection

### [ClickableWidgetHelper](ClickableWidgetHelper.md)
The base class for all interactive UI widgets. Provides common functionality for clickable elements including positioning, styling, tooltips, and basic interaction patterns.

**Key Features:**
- Widget positioning and sizing
- Active/inactive state management
- Tooltip support
- Z-index rendering control
- Programmatic clicking

**Common Use Cases:**
- Base functionality for all interactive elements
- Widget positioning and layout
- State management and accessibility

## Input Widgets

### [ButtonWidgetHelper](ButtonWidgetHelper.md)
Specialized helper for creating interactive button widgets with text styling, action handling, and both regular and textured button variants.

**Key Features:**
- Builder pattern for clean button creation
- Textured button support
- Custom text formatting
- Action callbacks
- Visual feedback

**Common Use Cases:**
- User interface controls
- Action triggers
- Navigation elements
- Form submissions

### [TextFieldWidgetHelper](TextFieldWidgetHelper.md)
Specialized helper for text input fields with comprehensive validation, cursor control, and input filtering capabilities.

**Key Features:**
- Real-time text validation
- Cursor and selection control
- Input filtering and predicates
- Maximum length limits
- Placeholder/suggestion text

**Common Use Cases:**
- User input forms
- Configuration settings
- Chat interfaces
- Search functionality

### [SliderWidgetHelper](SliderWidgetHelper.md)
Specialized helper for creating slider controls for value selection with discrete steps and continuous adjustment support.

**Key Features:**
- Discrete step configuration
- Value change callbacks
- Visual feedback
- Builder pattern support
- Programmable value setting

**Common Use Cases:**
- Volume controls
- Progress indicators
- Numeric value adjustment
- Configuration sliders

## Drawing and Graphics

### [Draw2D](Draw2D.md)
The core class for creating 2D overlays and graphics on the screen. Provides comprehensive drawing capabilities for custom HUDs and visual effects.

**Key Features:**
- Text rendering with formatting
- Shape drawing (rectangles, lines)
- Image and texture rendering
- Item display integration
- Element management and lifecycle

**Common Use Cases:**
- Custom HUDs (Heads-Up Displays)
- Status overlays
- Visual indicators
- Information displays

### [Draw2DElement](Draw2DElement.md)
A wrapper element that allows embedding one Draw2D overlay within another. Enables complex layouts and modular UI design.

**Key Features:**
- Nested overlay support
- Modular component design
- Complex layout management
- Reusable UI components
- Tabbed interfaces

**Common Use Cases:**
- Modular HUD components
- Tabbed interfaces
- Scrollable content areas
- Complex dashboard layouts

## Integration and Usage

### Creating a Basic HUD
```js
// Create a simple HUD with status information
const hud = Hud.createDraw2D();

hud.setOnInit(JavaWrapper.methodToJava((draw2d) => {
    // Background
    draw2d.addRect(5, 5, 200, 80, 0x000000, 180);

    // Player status
    const player = Player.getPlayer();
    draw2d.addText("Status", 10, 10, 0xFFFFFF, true);
    draw2d.addText(`Health: ${player.getHealth()}/${player.getMaxHealth()}`, 10, 25, 0xFF0000, true);
    draw2d.addText(`Hunger: ${player.getHunger()}/20`, 10, 40, 0xFFFF00, true);
    draw2d.addText(`Level: ${player.getLevel()}`, 10, 55, 0x00FF00, true);
}));

hud.register();
```

### Creating an Interactive Screen
```js
// Create a screen with interactive widgets
const screen = Hud.createScreen("My Interface", false);

// Add text input
const nameField = screen.addTextField(10, 30, 200, 20, "");
nameField.setSuggestion("Enter your name");

// Add slider for value adjustment
const slider = screen.addSlider(10, 60, 200, 20, "Volume", 11, JavaWrapper.methodToJava((s) => {
    Chat.log(`Volume: ${Math.round(s.getValue() * 100)}%`);
}));

// Add buttons
screen.addButton(10, 90, 100, 20, "Submit", JavaWrapper.methodToJava(() => {
    const name = nameField.getText();
    Chat.log(`Hello, ${name}!`);
    Hud.openScreen(null);
}));

Hud.openScreen(screen);
```

### Creating Modular Components
```js
// Create reusable health bar component
function createHealthBar() {
    const healthBar = Hud.createDraw2D();

    healthBar.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        const player = Player.getPlayer();
        const healthPercent = player.getHealth() / player.getMaxHealth();

        draw2d.addRect(0, 0, 204, 24, 0x000000, 200);
        draw2d.addText("Health", 5, 5, 0xFFFFFF, true);
        draw2d.addRect(50, 5, 200, 20, 0x404040);
        draw2d.addRect(53, 8, 53 + Math.floor(194 * healthPercent), 17, 0xFF0000);
    }));

    return healthBar;
}

// Use the component in a larger HUD
const mainHUD = Hud.createDraw2D();
mainHUD.addDraw2D(createHealthBar(), 10, 10, 200, 24);
mainHUD.register();
```

## Best Practices

### Performance Optimization
- Use `setOnInit()` for one-time setup rather than recreating elements
- Limit the number of elements in overlays to maintain performance
- Use z-index effectively to minimize unnecessary redrawing
- Unregister overlays when they're no longer needed

### User Experience
- Provide visual feedback for interactive elements (tooltips, hover effects)
- Use consistent positioning and styling across related elements
- Include helpful placeholder text in input fields
- Use color coding to convey information effectively

### Error Handling
- Always check if Player.getPlayer() returns a valid player object
- Handle cases where inventory or other game objects might be null
- Use try-catch blocks around complex initialization logic
- Provide fallback behavior for error conditions

### Responsive Design
- Use `Hud.getWindowWidth()` and `Hud.getWindowHeight()` for responsive layouts
- Consider different GUI scale factors when positioning elements
- Test interfaces at different window sizes and resolutions
- Use relative positioning where appropriate

## Advanced Topics

### Real-time Updates
Use `setInterval()` or game tick events to update overlays with current game state:

```js
setInterval(() => {
    // Update HUD elements with current player data
    hud.init(); // Re-initialize to refresh content
}, 1000);
```

### Event Integration
Combine UI elements with JsMacros events for responsive interfaces:

```js
JsMacros.on("KeyInput", JavaWrapper.methodToJava((event) => {
    if (event.key === "H" && event.action === 1) {
        toggleHUD();
    }
}));
```

### Complex Layouts
Use nested Draw2D elements and careful z-index management for sophisticated interfaces:

```js
const mainHUD = Hud.createDraw2D();
const sidebar = Hud.createDraw2D();
const content = Hud.createDraw2D();

// Configure and nest elements
mainHUD.addDraw2D(sidebar, 0, 0, 150, 300, 1);
mainHUD.addDraw2D(content, 160, 0, 400, 300, 0);
```

This comprehensive UI system provides everything needed to create professional-quality custom interfaces for JsMacros scripts, from simple status displays to complex interactive applications.