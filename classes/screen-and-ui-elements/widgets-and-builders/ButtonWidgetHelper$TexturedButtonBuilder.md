# ButtonWidgetHelper.TexturedButtonBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.ButtonWidgetHelper.TexturedButtonBuilder`

**Extends:** `AbstractWidgetBuilder<TexturedButtonBuilder, ?, ?>`

**Since:** JsMacros 1.8.4

The `TexturedButtonBuilder` class provides a fluent builder API for creating textured buttons with custom textures for different button states. This builder extends the standard button functionality to support texture-based buttons with custom visual appearances for normal, disabled, and focused states.

## Overview

The `TexturedButtonBuilder` class enables creation of sophisticated textured buttons with:

- **Texture Management**: Support for custom textures in different button states
- **State-Based Textures**: Separate textures for enabled, disabled, and focused states
- **Builder Pattern**: Fluent API for readable and maintainable button creation
- **Complete Widget Control**: Full control over positioning, sizing, appearance, and behavior
- **Screen Integration**: Automatic integration with JSMacros custom screens
- **Error Handling**: Built-in error handling for button actions

## Constructor

### `new TexturedButtonBuilder(screen)`
Creates a new TexturedButtonBuilder for the specified screen.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| screen | `IScreen` | The screen to add the textured button to |

**Example:**
```javascript
const screen = Hud.createScreen("Textured UI", true);
const builder = new ButtonWidgetHelper.TexturedButtonBuilder(screen);
```

**Since:** `1.8.4`

## Methods

### Texture Configuration Methods

#### `enabledTexture(texture)`
Sets the texture to display when the button is enabled and not focused.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| texture | `String | Identifier` | The texture resource for enabled state |

**Returns:** `TexturedButtonBuilder` - Returns self for method chaining

**Example:**
```javascript
builder.enabledTexture("minecraft:textures/gui/widgets.png:0:46:200:20");
```

#### `disabledTexture(texture)`
Sets the texture to display when the button is disabled.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| texture | `String | Identifier` | The texture resource for disabled state |

**Returns:** `TexturedButtonBuilder` - Returns self for method chaining

**Example:**
```javascript
builder.disabledTexture("minecraft:textures/gui/widgets.png:0:66:200:20");
```

#### `enabledFocusedTexture(texture)`
Sets the texture to display when the button is enabled and focused.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| texture | `String | Identifier` | The texture resource for focused enabled state |

**Returns:** `TexturedButtonBuilder` - Returns self for method chaining

**Example:**
```javascript
builder.enabledFocusedTexture("minecraft:textures/gui/widgets.png:0:86:200:20");
```

### Inherited Methods from ButtonWidgetHelper.ButtonBuilder

The `TexturedButtonBuilder` inherits all methods from `ButtonWidgetHelper.ButtonBuilder`:

#### Position and Size Methods
- `x(x)` - Set X position
- `y(y)` - Set Y position
- `pos(x, y)` - Set both positions
- `width(width)` - Set width
- `height(height)` - Set height
- `size(width, height)` - Set both dimensions

#### Text and Appearance Methods
- `message(text)` - Set button text
- `message(textHelper)` - Set button text from TextHelper
- `alpha(alpha)` - Set transparency
- `active(active)` - Set active state
- `visible(visible)` - Set visibility

#### Behavior Methods
- `action(action)` - Set click action callback
- `getAction()` - Get current action

#### Tooltip Methods
- `setTooltip(...tooltips)` - Set multiple tooltips
- `addTooltip(tooltip)` - Add a single tooltip

#### Z-Index Methods
- `zIndex(zIndex)` - Set render order

#### Build Methods
- `build()` - Create the widget and add to screen
- `createWidget()` - Create the widget without adding to screen

## Usage Examples

### Basic Textured Button Creation

```javascript
const screen = Hud.createScreen("Textured Button Demo", true);

const texturedButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(50, 30)
    .width(200)
    .height(20)
    .message("Textured Button")
    .enabledTexture("minecraft:textures/gui/widgets.png:0:46:200:20")
    .disabledTexture("minecraft:textures/gui/widgets.png:0:66:200:20")
    .enabledFocusedTexture("minecraft:textures/gui/widgets.png:0:86:200:20")
    .action((button, screen) => {
        Chat.log("Textured button clicked!");
    })
    .build();

Hud.openScreen(screen);
```

### Textured Button with Custom Resource Pack Textures

```javascript
const screen = Hud.createScreen("Custom Textures", true);

const customButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(80, 60)
    .width(64)
    .height(20)
    .message("Custom")
    .enabledTexture("mymod:textures/gui/custom_button.png:0:0:64:20")
    .disabledTexture("mymod:textures/gui/custom_button_disabled.png:0:0:64:20")
    .enabledFocusedTexture("mymod:textures/gui/custom_button_hover.png:0:0:64:20")
    .action((button, screen) => {
        Chat.log("Custom textured button clicked!");
    })
    .build();

Hud.openScreen(screen);
```

### Textured Button Toggle State

```javascript
const screen = Hud.createScreen("Toggle Textured Button", true);
let isEnabled = true;

const toggleButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(50, 50)
    .width(100)
    .height(20)
    .message("Toggle Me")
    .enabledTexture("minecraft:textures/gui/widgets.png:0:46:200:20")
    .disabledTexture("minecraft:textures/gui/widgets.png:0:66:200:20")
    .enabledFocusedTexture("minecraft:textures/gui/widgets.png:0:86:200:20")
    .action((button, screen) => {
        isEnabled = !isEnabled;
        button.setActive(isEnabled);
        Chat.log(`Button is now ${isEnabled ? 'enabled' : 'disabled'}`);
    })
    .build();

Hud.openScreen(screen);
```

### Multiple Textured Buttons with Different Styles

```javascript
const screen = Hud.createScreen("Textured Button Set", true);

// Primary button style
const primaryButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(20, 30)
    .width(120)
    .height(25)
    .message("Primary")
    .enabledTexture("minecraft:textures/gui/widgets.png:0:46:200:20")
    .disabledTexture("minecraft:textures/gui/widgets.png:0:66:200:20")
    .enabledFocusedTexture("minecraft:textures/gui/widgets.png:0:86:200:20")
    .action((btn, scr) => Chat.log("Primary action executed!"))
    .build();

// Secondary button style
const secondaryButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(150, 30)
    .width(120)
    .height(25)
    .message("Secondary")
    .enabledTexture("minecraft:textures/gui/widgets.png:200:46:200:20")
    .disabledTexture("minecraft:textures/gui/widgets.png:200:66:200:20")
    .enabledFocusedTexture("minecraft:textures/gui/widgets.png:200:86:200:20")
    .action((btn, scr) => Chat.log("Secondary action executed!"))
    .build();

Hud.openScreen(screen);
```

### Textured Button with Dynamic Textures

```javascript
const screen = Hud.createScreen("Dynamic Textures", true);
let styleIndex = 0;
const styles = [
    {
        enabled: "minecraft:textures/gui/widgets.png:0:46:200:20",
        disabled: "minecraft:textures/gui/widgets.png:0:66:200:20",
        focused: "minecraft:textures/gui/widgets.png:0:86:200:20"
    },
    {
        enabled: "minecraft:textures/gui/widgets.png:200:46:200:20",
        disabled: "minecraft:textures/gui/widgets.png:200:66:200:20",
        focused: "minecraft:textures/gui/widgets.png:200:86:200:20"
    }
];

const dynamicButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(50, 50)
    .width(150)
    .height(20)
    .message("Style Switcher")
    .enabledTexture(styles[0].enabled)
    .disabledTexture(styles[0].disabled)
    .enabledFocusedTexture(styles[0].focused)
    .action((button, screen) => {
        // Toggle between styles (would need recreation in practice)
        styleIndex = (styleIndex + 1) % styles.length;
        Chat.log(`Switched to style ${styleIndex + 1}`);
    })
    .build();

// Style switcher button
const switchStyleButton = screen.addButton()
    .pos(50, 80)
    .width(150)
    .height(20)
    .message("Change Button Style")
    .action((btn, scr) => {
        Chat.log("Note: Texture changes require button recreation");
        Chat.log(`Current style: ${styleIndex + 1}`);
    })
    .build();

Hud.openScreen(screen);
```

## Texture Resource Format

### Standard Texture Paths
- `"minecraft:textures/gui/widgets.png"` - Standard UI widget textures
- `"minecraft:textures/gui/button.png"` - Button-specific textures
- Custom mod textures: `"modid:textures/gui/custom_texture.png"`

### Texture Coordinates Format
Some texture specifications support coordinate notation:
```
"texture_file.png:x:y:width:height"
```

Where:
- `x`, `y` - Texture coordinates within the texture file
- `width`, `height` - Dimensions of the texture region

### Identifier Objects
```javascript
// Using Minecraft's Identifier class
const textureId = Identifier.of("minecraft:textures/gui/widgets.png");
builder.enabledTexture(textureId);
```

## Best Practices

### Texture Organization
1. **Consistent Dimensions**: Use consistent dimensions for all texture states
2. **Visual Hierarchy**: Design textures that clearly indicate button states
3. **Atlas Usage**: Use texture atlases to reduce texture loading overhead
4. **Resolution Matching**: Match texture resolution to expected display size

### Performance Considerations
1. **Texture Caching**: Reuse texture references where possible
2. **Atlas Packing**: Pack multiple textures into texture atlases
3. **Resolution Optimization**: Use appropriate texture resolutions for UI scaling
4. **Memory Management**: Be mindful of texture memory usage

### User Experience Design
1. **Clear Visual States**: Ensure enabled/disabled/focused states are visually distinct
2. **Consistent Styling**: Maintain consistent visual language across textured buttons
3. **Responsive Feedback**: Provide immediate visual feedback for user interactions
4. **Accessibility**: Ensure textures work well with different color vision needs

## Error Handling

The TexturedButtonBuilder includes automatic error handling:

```javascript
const safeTexturedButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(50, 50)
    .width(100)
    .height(20)
    .message("Safe Button")
    .enabledTexture("minecraft:textures/gui/widgets.png:0:46:200:20")
    .action((button, screen) => {
        try {
            // Potentially problematic action
            performComplexOperation();
        } catch (e) {
            Chat.log("Button action failed: " + e.message);
        }
    })
    .build();
```

## Integration with Other UI Elements

Textured buttons work seamlessly with other JSMacros UI components:

```javascript
// Combine with standard buttons
const standardButton = screen.addButton()
    .pos(20, 30)
    .width(100)
    .height(20)
    .message("Standard")
    .build();

const texturedButton = new ButtonWidgetHelper.TexturedButtonBuilder(screen)
    .pos(130, 30)
    .width(100)
    .height(20)
    .message("Textured")
    .enabledTexture("minecraft:textures/gui/widgets.png:0:46:200:20")
    .build();

// Combine with text displays
const label = screen.addText()
    .pos(20, 60)
    .message("Button Types:")
    .build();
```

## Version History

- **1.8.4**: Initial release with basic textured button functionality
- **1.9.0**: Enhanced texture control methods and string-based texture path support
- **Current**: Full feature set with comprehensive builder patterns and error handling

## Related Classes

- `ButtonWidgetHelper` - Parent class providing base button functionality
- `ButtonWidgetHelper.ButtonBuilder` - Base builder class for buttons
- `AbstractWidgetBuilder` - Parent class providing common builder functionality
- `IScreen` - Interface for creating custom screens
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript methods in Java context
- `Identifier` - Minecraft resource identifier class for texture references
- `ButtonWidget` - Minecraft's native button widget class
- `TexturedButtonWidget` - Minecraft's native textured button widget class

## Important Notes

1. **Texture Requirements**: Textures must be available in the resource pack or loaded by mods
2. **State Management**: Texture states are managed automatically based on button state
3. **Path Resolution**: Texture paths are resolved using Minecraft's resource system
4. **Performance**: Textured buttons may have slightly higher performance overhead than standard buttons
5. **Fallback Behavior**: If textures fail to load, buttons may fall back to default rendering
6. **Memory Usage**: Each unique texture consumes graphics memory
7. **Screen Integration**: Textured buttons are automatically added to the screen when build() is called
8. **Error Safety**: Button actions are wrapped with automatic error handling