# TextBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.TextBuilder`

**Since:** JsMacros 1.3.0

The `TextBuilder` class is a utility class in JSMacros that provides a fluent builder pattern for creating complex text components with rich formatting, styling, hover events, and click interactions. It allows developers to construct sophisticated chat messages, HUD elements, and user interface text with method chaining for easy configuration.

## Overview

The `TextBuilder` class provides a powerful way to build text components with:
- Rich text formatting (colors, bold, italic, underline, strikethrough, obfuscated)
- Custom RGB colors and legacy color codes
- Hover events showing text, items, or entities
- Click events for running commands, opening URLs, or custom actions
- Method chaining for fluent, readable code
- Integration with Minecraft's text system

## Constructors

### `new TextBuilder()`
Creates a new empty TextBuilder instance.

**Example:**
```javascript
const builder = new TextBuilder();
```

## Methods

## Usage Examples

### Basic Colored Text
```javascript
const text = new TextBuilder()
    .append("Red").withColor(0xc)
    .append("Gold").withColor(0x6)
    .append("Green").withColor(0x2)
    .append("Blue").withColor(0x9)
    .build();

Chat.log(text);
```

### Custom RGB Colors
```javascript
const text = new TextBuilder()
    .append("Custom Purple").withColor(128, 0, 128)
    .append("Custom Orange").withColor(255, 165, 0)
    .append("Custom Teal").withColor(0, 128, 128)
    .build();

Chat.log(text);
```

### Text Formatting
```javascript
const text = new TextBuilder()
    .append("Bold").withFormatting(false, true, false, false, false)
    .append("Italic").withFormatting(false, false, true, false, false)
    .append("Underline").withFormatting(true, false, false, false, false)
    .append("Strikethrough").withFormatting(false, false, false, true, false)
    .append("Magic").withFormatting(false, false, false, false, true)
    .build();

Chat.log(text);
```

### Hover Text Example
```javascript
const hoverText = Chat.createTextHelperFromString("&eThis is detailed hover text!\n&7It can have multiple lines.");

const text = new TextBuilder()
    .append("&6Hover over this text for details")
    .withShowTextHover(hoverText)
    .build();

Chat.log(text);
```

### Item Hover Example
```javascript
const player = Player.getPlayer();
if (player) {
    const item = player.getMainHand();
    if (item && !item.isEmpty()) {
        const text = new TextBuilder()
            .append("&eCurrent Item: " + item.getName())
            .withShowItemHover(item)
            .build();

        Chat.log(text);
    }
}
```

### Click Events Example
```javascript
const text = new TextBuilder()
    .append("&nClick to open Google")
    .withClickEvent("open_url", "https://google.com")
    .append(" | ")
    .append("&nClick to say hello")
    .withClickEvent("run_command", "/say Hello from text builder!")
    .append(" | ")
    .append("&nCopy this text")
    .withClickEvent("copy_to_clipboard", "This text was copied!")
    .build();

Chat.log(text);
```

### Custom Function Click Event
```javascript
// Define a custom function
const customFunction = JavaWrapper.methodToJava(() => {
    const player = Player.getPlayer();
    if (player) {
        const pos = player.getPos();
        Chat.log(`&aButton clicked at position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
    }
});

const text = new TextBuilder()
    .append("&a[Get Position]")
    .withCustomClickEvent(customFunction)
    .build();

Chat.log(text);
```

### Complex Interactive Text Component
```javascript
function createInteractiveStatusDisplay() {
    const player = Player.getPlayer();
    if (!player) return;

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const food = player.getHunger();
    const pos = player.getPos();

    // Create hover text with detailed stats
    const hoverText = Chat.createTextHelperFromString(
        `&6Player Statistics:\n` +
        `&cHealth: ${health.toFixed(1)}/${maxHealth.toFixed(1)}\n` +
        `&eFood: ${food}/20\n` +
        `&bPosition: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}\n` +
        `&7Click for more info`
    );

    // Create click action
    const moreInfoAction = JavaWrapper.methodToJava(() => {
        Chat.log(`&6=== Player Info ===`);
        Chat.log(`&aHealth: ${health}/${maxHealth}`);
        Chat.log(`&eHunger: ${food}/20`);
        Chat.log(`&bPosition: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
        Chat.log(`&dGame Time: ${World.getTime()}`);
    });

    return new TextBuilder()
        .append("[Status]").withColor(0x6).withFormatting(true, false, false, false, false)
        .append(" ")
        .append(`❤ ${health.toFixed(0)}`).withColor(0xc)
        .append(" ")
        .append(`🍖 ${food}`).withColor(0xe)
        .append(" ")
        .append(`📍 ${Math.floor(pos.x)},${Math.floor(pos.z)}`).withColor(0x9)
        .withShowTextHover(hoverText)
        .withCustomClickEvent(moreInfoAction)
        .build();
}

// Display the interactive status
const statusDisplay = createInteractiveStatusDisplay();
Chat.log(statusDisplay);
```

### Dynamic Text Based on Conditions
```javascript
function createHealthIndicator() {
    const player = Player.getPlayer();
    if (!player) return null;

    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = (health / maxHealth) * 100;

    const builder = new TextBuilder();

    if (healthPercent > 75) {
        builder.append("❤❤❤").withColor(0x2); // Green hearts
    } else if (healthPercent > 50) {
        builder.append("❤❤").withColor(0x2)
               .append("❤").withColor(0x6); // Mix green and gold
    } else if (healthPercent > 25) {
        builder.append("❤").withColor(0x6)
               .append("❤❤").withColor(0xe); // Mix gold and red
    } else {
        builder.append("❤❤❤").withColor(0x4); // Dark red hearts
    }

    const healthText = ` ${health.toFixed(1)}/${maxHealth.toFixed(1)} (${Math.floor(healthPercent)}%)`;
    const hoverText = Chat.createTextHelperFromString(
        `Health Status:\n${getHealthMessage(healthPercent)}`
    );

    return builder
        .append(healthText)
        .withColor(0xf)
        .withShowTextHover(hoverText)
        .build();
}

function getHealthMessage(percent) {
    if (percent > 75) return "&aHealthy";
    if (percent > 50) return "&eHurt";
    if (percent > 25) return "&6Injured";
    return "&cCritical";
}

const healthIndicator = createHealthIndicator();
if (healthIndicator) {
    Chat.log(healthIndicator);
}
```

### Color-coded Command Menu
```javascript
function createCommandMenu() {
    const builder = new TextBuilder();

    builder.append("=== &6Command Menu&7 ===\n");

    // Survival commands
    builder.append("&a[Survival]\n");
    builder.append("  ").append("&f/gamemode survival").withClickEvent("run_command", "/gamemode survival")
           .withShowTextHover(Chat.createTextHelperFromString("&7Switch to survival mode"))
           .append("\n");
    builder.append("  ").append("&f/home").withClickEvent("run_command", "/home")
           .withShowTextHover(Chat.createTextHelperFromString("&7Teleport to home"))
           .append("\n\n");

    // Building commands
    builder.append("&b[Building]\n");
    builder.append("  ").append("&f/gamemode creative").withClickEvent("run_command", "/gamemode creative")
           .withShowTextHover(Chat.createTextHelperFromString("&7Switch to creative mode"))
           .append("\n");
    builder.append("  ").append("&f/fly").withClickEvent("run_command", "/fly")
           .withShowTextHover(Chat.createTextHelperFromString("&7Toggle flight mode"))
           .append("\n\n");

    // Utility commands
    builder.append("&e[Utilities]\n");
    builder.append("  ").append("&f/clearinventory").withClickEvent("run_command", "/clearinventory")
           .withShowTextHover(Chat.createTextHelperFromString("&7Clear your inventory"))
           .append("\n");
    builder.append("  ").append("&f/ptime day").withClickEvent("run_command", "/ptime day")
           .withShowTextHover(Chat.createTextHelperFromString("&7Set personal time to day"));

    return builder.build();
}

const commandMenu = createCommandMenu();
Chat.log(commandMenu);
```

## Color Codes Reference

### Legacy Color Codes (0-15)
| Code | Color     | Hex Code | Example |
|------|-----------|----------|---------|
| 0    | Black     | 0x0      | `.withColor(0x0)` |
| 1    | Dark Blue | 0x1      | `.withColor(0x1)` |
| 2    | Dark Green| 0x2      | `.withColor(0x2)` |
| 3    | Dark Aqua | 0x3      | `.withColor(0x3)` |
| 4    | Dark Red  | 0x4      | `.withColor(0x4)` |
| 5    | Dark Purple| 0x5     | `.withColor(0x5)` |
| 6    | Gold      | 0x6      | `.withColor(0x6)` |
| 7    | Gray      | 0x7      | `.withColor(0x7)` |
| 8    | Dark Gray | 0x8      | `.withColor(0x8)` |
| 9    | Blue      | 0x9      | `.withColor(0x9)` |
| a    | Green     | 0xa      | `.withColor(0xa)` |
| b    | Aqua      | 0xb      | `.withColor(0xb)` |
| c    | Red       | 0xc      | `.withColor(0xc)` |
| d    | Light Purple| 0xd    | `.withColor(0xd)` |
| e    | Yellow    | 0xe      | `.withColor(0xe)` |
| f    | White     | 0xf      | `.withColor(0xf)` |

### Common RGB Colors
| Color     | RGB Values        |
|-----------|-------------------|
| Red       | `withColor(255, 0, 0)` |
| Green     | `withColor(0, 255, 0)` |
| Blue      | `withColor(0, 0, 255)` |
| Yellow    | `withColor(255, 255, 0)` |
| Magenta   | `withColor(255, 0, 255)` |
| Cyan      | `withColor(0, 255, 255)` |
| Orange    | `withColor(255, 165, 0)` |
| Purple    | `withColor(128, 0, 128)` |
| Pink      | `withColor(255, 192, 203)` |

## Click Event Actions

| Action           | Description                              | Example Value                      |
|------------------|------------------------------------------|------------------------------------|
| open_url         | Opens a URL in the browser               | "https://example.com"              |
| open_file        | Opens a local file                       | "C:/path/to/file.txt"              |
| run_command      | Runs a command as if typed by player     | "/say Hello World!"               |
| suggest_command  | Suggests a command in chat input         | "/help"                           |
| change_page      | Changes page in a book                   | "2"                               |
| copy_to_clipboard| Copies text to clipboard                 | "Text to copy"                    |

## Important Notes

1. **Method Chaining:** All methods return `this` to allow method chaining, except `build()` and `getWidth()`.

2. **Section Management:** The builder maintains a current "section" - each `append()` call creates a new section that can have its own styling.

3. **Style Persistence:** Styles (colors, formatting) apply to the current section and persist for that section until changed.

4. **Event Limitations:** Click and hover events only work in contexts that support them (chat, books, signs, etc.).

5. **Performance:** For complex text components, consider building once and reusing rather than rebuilding frequently.

6. **Thread Safety:** Custom click events are executed safely but should avoid long-running operations.

7. **Error Handling:** Errors in custom click events are caught and logged without breaking the text component.

8. **Compatibility:** Built text components work with any JSMacros function that accepts TextHelper objects.

## Related Classes

- `TextHelper` - The resulting text component type from `build()`
- `StyleHelper` - Helper for applying complex styles to text
- `FormattingHelper` - Helper for formatting options
- `ItemStackHelper` - Used for item hover events
- `EntityHelper` - Used for entity hover events
- `MethodWrapper` - Used for custom click event functions

## Version History

- **1.3.0:** Initial release with basic text building functionality
- **1.3.1:** Added RGB color support with `withColor(r, g, b)`
- **1.6.5:** Enhanced StyleHelper integration
- **1.8.4:** Added `withFormatting(FormattingHelper...)` and `getWidth()` methods
- **Current:** Full feature set with comprehensive text styling capabilities