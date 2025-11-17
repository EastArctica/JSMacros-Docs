# FormattingHelper

Represents Minecraft text formatting codes and colors. Essential for creating formatted chat messages, understanding text styles, and working with Minecraft's color system. Provides access to color values, formatting codes, and style properties.

## Constructor

FormattingHelper objects are typically obtained from existing text or from the Formatting enum rather than created directly:

```javascript
// From text styling
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let textHelper = event.message;
    // Access formatting through StyleHelper or visit method
}));

// From formatting constants
// Note: Check available formatting constants in your JsMacros version
```

## Methods

### Color Information

#### getColorValue()
Returns the RGB color value for this formatting.

```javascript
let rgbValue = formatting.getColorValue();
```

#### getColorIndex()
Returns the color index (0-15 for colors, -1 for modifiers).

```javascript
let colorIndex = formatting.getColorIndex();
// Returns: 0-15 for colors, -1 for modifiers
```

#### getName()
Returns the name of this formatting style.

```javascript
let name = formatting.getName();
// Returns: "black", "dark_blue", "green", etc.
```

#### getCode()
Returns the formatting code character.

```javascript
let code = formatting.getCode();
// Returns: '0', '1', '2', 'a', 'b', 'c', etc.
```

### Formatting Properties

#### isColor()
Returns true if this formatting is a color, false if it's a modifier.

```javascript
let isColor = formatting.isColor();
```

#### isModifier()
Returns true if this formatting is a modifier (bold, italic, etc.), false if it's a color.

```javascript
let isModifier = formatting.isModifier();
```

## Formatting Reference

### Colors (0-15)

| Index | Name | Code | RGB Value |
|-------|------|------|-----------|
| 0 | black | 0 | 0x000000 |
| 1 | dark_blue | 1 | 0x0000AA |
| 2 | dark_green | 2 | 0x00AA00 |
| 3 | dark_aqua | 3 | 0x00AAAA |
| 4 | dark_red | 4 | 0xAA0000 |
| 5 | dark_purple | 5 | 0xAA00AA |
| 6 | gold | 6 | 0xFFAA00 |
| 7 | gray | 7 | 0xAAAAAA |
| 8 | dark_gray | 8 | 0x555555 |
| 9 | blue | 9 | 0x5555FF |
| 10 | green | a | 0x55FF55 |
| 11 | aqua | b | 0x55FFFF |
| 12 | red | c | 0xFF5555 |
| 13 | light_purple | d | 0xFF55FF |
| 14 | yellow | e | 0xFFFF55 |
| 15 | white | f | 0xFFFFFF |

### Modifiers

| Code | Name | Description |
|------|------|-------------|
| k | obfuscated | Randomly changing characters |
| l | bold | Bold text |
| m | strikethrough | Strikethrough text |
| n | underline | Underlined text |
| o | italic | Italic text |
| r | reset | Resets all formatting |

## Examples

### Basic Formatting Analysis

```javascript
// Analyze text formatting
function analyzeFormatting(textHelper) {
    let segments = [];

    textHelper.visit(JavaWrapper.methodToJava((styleHelper, text) => {
        if (text.trim()) { // Skip empty segments
            segments.push({
                text: text,
                color: styleHelper.getColor(),
                bold: styleHelper.isBold(),
                italic: styleHelper.isItalic(),
                underlined: styleHelper.isUnderlined(),
                strikethrough: styleHelper.isStrikethrough()
            });
        }
    }));

    return segments;
}

// Usage
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let analysis = analyzeFormatting(event.message);
    console.log("Text segments with formatting:", analysis);

    // Count formatted elements
    let coloredSegments = analysis.filter(s => s.color !== "white").length;
    let boldSegments = analysis.filter(s => s.bold).length;

    if (coloredSegments > 0) {
        Chat.log(`Message contains ${coloredSegments} colored segments`);
    }
}));
```

### Color Utilities

```javascript
// Color manipulation utilities
let colorMap = {
    '0': 'black', '1': 'dark_blue', '2': 'dark_green', '3': 'dark_aqua',
    '4': 'dark_red', '5': 'dark_purple', '6': 'gold', '7': 'gray',
    '8': 'dark_gray', '9': 'blue', 'a': 'green', 'b': 'aqua',
    'c': 'red', 'd': 'light_purple', 'e': 'yellow', 'f': 'white'
};

function getColorFromCode(code) {
    return colorMap[code.toLowerCase()] || 'white';
}

function createGradientText(text, startColor, endColor) {
    // Simple gradient effect (basic implementation)
    let result = '';
    let step = 1 / (text.length || 1);

    for (let i = 0; i < text.length; i++) {
        let colorCode = i < text.length / 2 ? startColor : endColor;
        result += `§${colorCode}${text[i]}`;
    }

    return result;
}

function rainbowText(text) {
    let rainbowCodes = ['c', '6', 'e', 'a', 'b', 'd'];
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let colorCode = rainbowCodes[i % rainbowCodes.length];
        result += `§${colorCode}${text[i]}`;
    }

    return result;
}

// Usage examples
Chat.say(createGradientText("Gradient Text", "6", "b"));
Chat.say(rainbowText("Rainbow Text"));
```

### Advanced Text Formatting

```javascript
// Create complex formatted messages
function createFancyTitle(title, subtitle = "") {
    let message = `§6§l=== ${title} ===§r`;
    if (subtitle) {
        message += `\n§7${subtitle}`;
    }
    return message;
}

function createStatusMessage(status, text, details = "") {
    let statusColors = {
        'success': 'a',
        'warning': 'e',
        'error': 'c',
        'info': 'b',
        'default': 'f'
    };

    let color = statusColors[status] || statusColors.default;
    let message = `§${color}§l[${status.toUpperCase()}]§r §${color}${text}§r`;

    if (details) {
        message += ` §7${details}`;
    }

    return message;
}

function createProgressBar(current, total, length = 20) {
    let filled = Math.floor((current / total) * length);
    let empty = length - filled;
    let percentage = Math.floor((current / total) * 100);

    return `§a${'█'.repeat(filled)}§7${'█'.repeat(empty)}§r §f${percentage}% (${current}/${total})`;
}

function createList(items, bullet = '•', color = 'f') {
    return items.map(item => `§${color}${bullet} ${item}§r`).join('\n');
}

// Usage
Chat.say(createFancyTitle("Server Status", "Last updated: Now"));
Chat.say(createStatusMessage("success", "Operation completed", "All systems online"));
Chat.say(createProgressBar(75, 100));
Chat.say(createList(["Item 1", "Item 2", "Item 3"], '▸', 'b'));
```

### Chat Enhancement

```javascript
// Enhanced chat with automatic formatting
let chatEnhancements = {
    highlightMentions: true,
    showTimestamps: true,
    formatUrls: true,
    emoteReplacements: {
        ':)': '§a☺§r',
        ':(': '§c☹§r',
        ':D': '§e😃§r',
        ':o': '§f😮§r',
        '<3': '§c❤§r'
    }
};

function enhanceChatMessage(textHelper) {
    let text = textHelper.getStringStripFormatting();
    let playerName = Player.getPlayer().getName();

    // Add timestamp
    if (chatEnhancements.showTimestamps) {
        let timestamp = new Date().toLocaleTimeString();
        text = `§8[${timestamp}]§r ${text}`;
    }

    // Highlight mentions
    if (chatEnhancements.highlightMentions && text.includes(playerName)) {
        text = text.replace(new RegExp(playerName, 'g'), `§6${playerName}§r`);
    }

    // Replace emoticons
    for (let [emote, replacement] of Object.entries(chatEnhancements.emoteReplacements)) {
        text = text.replace(new RegExp(emote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    }

    // Format URLs
    if (chatEnhancements.formatUrls) {
        let urlRegex = /(https?:\/\/[^\s]+)/g;
        text = text.replace(urlRegex, '§b§n$1§r');
    }

    return text;
}

jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let enhanced = enhanceChatMessage(event.message);
    if (enhanced !== event.message.getStringStripFormatting()) {
        Chat.log(enhanced); // Show enhanced version
    }
}));
```

### Theme System

```javascript
// Custom theme system
let themes = {
    default: {
        primary: 'f',
        secondary: '7',
        accent: 'b',
        success: 'a',
        warning: 'e',
        error: 'c',
        info: '9'
    },
    dark: {
        primary: 'f',
        secondary: '8',
        accent: '3',
        success: '2',
        warning: '6',
        error: '4',
        info: '1'
    },
    ocean: {
        primary: 'f',
        secondary: '7',
        accent: 'b',
        success: 'a',
        warning: 'e',
        error: 'c',
        info: '3'
    }
};

let currentTheme = themes.default;

function setTheme(themeName) {
    if (themes[themeName]) {
        currentTheme = themes[themeName];
        Chat.say(`§aTheme changed to: ${themeName}`);
    }
}

function themedText(type, text) {
    let color = currentTheme[type] || currentTheme.primary;
    return `§${color}${text}§r`;
}

function themedTitle(title, type = 'primary') {
    return themedText(type, `§l${title}§r`);
}

function themedStatus(status, message) {
    return themedText(status, `[${status.toUpperCase()}] ${message}`);
}

// Usage
setTheme('ocean');
Chat.say(themedTitle('Ocean Theme Example', 'accent'));
Chat.say(themedStatus('success', 'Theme applied successfully'));
Chat.say(themedText('info', 'This text uses the info color'));
```

### Formatting Validation and Cleaning

```javascript
// Text formatting validation
function validateFormatting(text) {
    let issues = [];
    let colorCount = (text.match(/§[0-9a-f]/g) || []).length;
    let modifierCount = (text.match(/§[k-o]/g) || []).length;

    // Check for unclosed formatting
    let resetCount = (text.match(/§r/g) || []).length;
    if (colorCount > resetCount) {
        issues.push("Unclosed color formatting detected");
    }

    // Check for obfuscated text
    if (text.includes('§k')) {
        issues.push("Contains obfuscated text");
    }

    // Check length
    if (text.length > 256) {
        issues.push("Text may be too long for chat");
    }

    return issues;
}

function cleanFormatting(text) {
    // Remove excessive formatting
    let cleaned = text
        .replace(/§k+/g, '') // Remove obfuscation
        .replace(/§([0-9a-f])(?=[0-9a-f])/g, '§$1') // Remove duplicate color codes
        .replace(/§([k-o])(?=[k-o])/g, '§$1'); // Remove duplicate modifiers

    // Add reset at the end
    if (cleaned && !cleaned.endsWith('§r')) {
        cleaned += '§r';
    }

    return cleaned;
}

function formatMessageSafely(message) {
    let issues = validateFormatting(message);

    if (issues.length > 0) {
        console.log("Formatting issues:", issues);
        return cleanFormatting(message);
    }

    return message;
}

// Usage examples
let testMessage = "§6§kTest §c§lMessage §7with §fmultiple §aformats";
console.log("Issues:", validateFormatting(testMessage));
console.log("Cleaned:", cleanFormatting(testMessage));
```

### Formatting Presets

```javascript
// Predefined formatting presets
let presets = {
    alert: (text) => `§c§lALERT: §r§c${text}§r`,
    success: (text) => `§a§l✓ ${text}§r`,
    warning: (text) => `§e§l⚠ ${text}§r`,
    info: (text) => `§b§lℹ ${text}§r`,
    error: (text) => `§4§l✗ ${text}§r`,
    question: (text) => `§e? ${text}§r`,
    tip: (text) => `§2💡 ${text}§r`,
    highlight: (text) => `§6§l» ${text} §r§6«`,
    boxed: (text) => `§8[§r${text}§8]§r`,
    arrow: (text) => `§7► ${text}§r`,
    star: (text) => `§e★ ${text}§r`,
    check: (text) => `§a✓ ${text}§r`,
    cross: (text) => `§c✗ ${text}§r`
};

function applyPreset(presetName, text) {
    if (presets[presetName]) {
        return presets[presetName](text);
    }
    return text;
}

// Create custom presets
function createPreset(name, formatter) {
    presets[name] = formatter;
}

// Usage examples
Chat.say(applyPreset('alert', 'Warning! Server restart in 5 minutes'));
Chat.say(applyPreset('success', 'Backup completed successfully'));
Chat.say(applyPreset('info', 'Server running on version 1.19.2'));

// Create custom preset
createPreset('admin', (text) => `§4§l[ADMIN] §r§4${text}§r`);
Chat.say(applyPreset('admin', 'System maintenance in progress'));
```

## Integration with Other Classes

FormattingHelper integrates seamlessly with:
- **TextHelper**: For accessing text formatting information
- **StyleHelper**: For detailed style information
- **Chat**: For sending formatted messages
- **TextBuilder**: For creating complex formatted text

## Performance Notes

- Cache formatted strings when used repeatedly
- Use `getStringStripFormatting()` for comparisons when formatting doesn't matter
- Be mindful of the 256-character limit for chat messages

## Security Considerations

- Validate user input before applying formatting
- Be careful with obfuscated text (§k) as it can be hard to read
- Consider the impact of excessive formatting on readability

## See Also

- [TextHelper](TextHelper.md) - Text component handling
- [Chat](../core/Chat.md) - Chat operations and message handling
- [StyleHelper](../helpers/StyleHelper.md) - Text styling information
- [TextBuilder](../core/TextBuilder.md) - Building complex text components