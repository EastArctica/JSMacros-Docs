# StyleHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.StyleHelper`

**Extends:** `BaseHelper<Style>`

The `StyleHelper` class is a wrapper for Minecraft's text styling system, providing access to text formatting properties including colors, font styles, click events, and hover effects. It serves as a bridge between JSMacros scripts and Minecraft's internal text styling capabilities.

This class is typically obtained from text components through methods like `TextHelper.visit()` or used with `TextBuilder.withStyle()` to apply styling to text elements. StyleHelper instances contain the complete styling information for a text segment, allowing for detailed inspection and manipulation of text appearance.

## Constructors

StyleHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Text visiting operations: `textHelper.visit(visitor)` where the visitor receives StyleHelper instances
- Text builder operations: `textBuilder.withStyle(styleHelper)`
- Text style inspection from existing text components
- Internal JSMacros operations that return style information

## Methods

### Color Information

- [style.hasColor()](#stylehascolor)
- [style.getColorIndex()](#stylegetcolorindex)
- [style.getColorValue()](#stylegetcolorvalue)
- [style.getColorName()](#stylegetcolorname)
- [style.hasCustomColor()](#stylehascustomcolor)
- [style.getCustomColor()](#stylegetcustomcolor)
- [style.getFormatting()](#stylegetformatting)

### Text Formatting

- [style.bold()](#stylebold)
- [style.italic()](#styleitalic)
- [style.underlined()](#styleunderlined)
- [style.strikethrough()](#stylestrikethrough)
- [style.obfuscated()](#styleobfuscated)

### Click Events

- [style.getClickAction()](#stylegetclickaction)
- [style.getClickValue()](#stylegetclickvalue)
- [style.getCustomClickValue()](#stylegetcustomclickvalue)

### Hover Events

- [style.getHoverAction()](#stylegethoveraction)
- [style.getHoverValue()](#stylegethovervalue)

### Other Properties

- [style.getInsertion()](#stylegetinsertion)
- [style.toString()](#styletostring)

---

## Color Information

## Text Formatting

## Click Events

## Hover Events

## Other Properties

## Usage Examples

### Style Analysis and Inspection

```js
// Analyze text styles in chat messages
events.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.getMessage();

    // Visit each text segment with its style
    message.visit(JavaWrapper.methodToJava((style, text) => {
        const styleInfo = analyzeStyle(style, text);
        if (styleInfo.hasFormatting) {
            Chat.log(`Styled text: "${text}" - ${styleInfo.description}`);
        }
    }));
}));

function analyzeStyle(style, text) {
    const info = {
        text: text,
        hasFormatting: false,
        description: ""
    };

    const formats = [];

    // Check color
    if (style.hasColor()) {
        info.hasFormatting = true;
        if (style.hasCustomColor()) {
            const color = style.getCustomColor().toString(16).padStart(6, '0');
            formats.push(`custom color #${color}`);
        } else {
            formats.push(`color ${style.getColorName() || style.getColorIndex()}`);
        }
    }

    // Check text formatting
    if (style.bold()) formats.push("bold");
    if (style.italic()) formats.push("italic");
    if (style.underlined()) formats.push("underlined");
    if (style.strikethrough()) formats.push("strikethrough");
    if (style.obfuscated()) formats.push("obfuscated");

    // Check events
    const clickAction = style.getClickAction();
    if (clickAction) {
        formats.push(`click: ${clickAction}`);
        info.hasFormatting = true;
    }

    const hoverAction = style.getHoverAction();
    if (hoverAction) {
        formats.push(`hover: ${hoverAction}`);
        info.hasFormatting = true;
    }

    const insertion = style.getInsertion();
    if (insertion) {
        formats.push("shift-click insert");
        info.hasFormatting = true;
    }

    info.description = formats.join(", ");
    return info;
}
```

### Creating Styled Text

```js
// Create text with different styles using StyleHelper patterns
function createStyledMessage() {
    const builder = Chat.createTextBuilder();

    // Main message
    builder.append("Hello ");

    // Bold red text
    builder.withColor(0xFF0000);
    builder.withBold(true);
    builder.append("World");

    // Reset formatting
    builder.withColor(0xFFFFFF);
    builder.withBold(false);
    builder.append("! This is ");

    // Italic blue text
    builder.withColor(0x0000FF);
    builder.withItalic(true);
    builder.append("formatted");

    // Reset again
    builder.withColor(0xFFFFFF);
    builder.withItalic(false);
    builder.append(" text!");

    return builder.build();
}

// Add click and hover effects
function createInteractiveMessage() {
    const builder = Chat.createTextBuilder();

    builder.append("Click ");

    // Clickable command
    builder.append("here")
        .withColor(0x00FF00)
        .withUnderlined(true)
        .withClickEvent("run_command", "/help")
        .withHoverEvent("show_text", "Click to run /help");

    builder.append(" for help or ");

    // Clickable URL
    builder.append("visit our website")
        .withColor(0x0000FF)
        .withUnderlined(true)
        .withClickEvent("open_url", "https://example.com")
        .withHoverEvent("show_text", "Click to open website");

    builder.append("!");

    return builder.build();
}

// Display the styled message
const styledMessage = createInteractiveMessage();
Chat.log(styledMessage);
```

### Style Extraction and Reuse

```js
// Extract styles from existing text and reuse them
function extractAndReuseStyles() {
    const originalText = Chat.createTextHelperFromString("&6&lGolden &a&nText");

    // Visit the text to extract styles
    const styles = [];

    originalText.visit(JavaWrapper.methodToJava((style, text) => {
        styles.push({
            text: text,
            style: style
        });
    }));

    // Create new text using extracted styles
    const builder = Chat.createTextBuilder();

    styles.forEach(segment => {
        builder.append(segment.text);

        const style = segment.style;
        if (style.hasColor()) {
            if (style.hasCustomColor()) {
                builder.withColor(style.getCustomColor());
            } else {
                const colorValue = style.getColorValue();
                if (colorValue !== -1) {
                    builder.withColor(colorValue);
                }
            }
        }

        builder.withBold(style.bold());
        builder.withItalic(style.italic());
        builder.withUnderlined(style.underlined());
        builder.withStrikethrough(style.strikethrough());
        builder.withObfuscated(style.obfuscated());
    });

    return builder.build();
}

const newText = extractAndReuseStyles();
Chat.log("Original styles reused: " + newText);
```

### Advanced Style Processing

```js
// Process chat messages for specific formatting patterns
events.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.getMessage();
    const processedText = processMessageForHighlights(message);

    if (processedText !== message) {
        Chat.log(processedText);
    }
}));

function processMessageForHighlights(textHelper) {
    const builder = Chat.createTextBuilder();

    textHelper.visit(JavaWrapper.methodToJava((style, text) => {
        // Check for specific patterns and modify styles
        let modifiedStyle = style;
        let modifiedText = text;

        // Highlight player names
        if (text.includes(Player.getPlayer().getName().getString())) {
            builder.append(text)
                .withColor(0x00FFFF)  // Cyan for self-reference
                .withBold(true)
                .withUnderlined(true);
            return;
        }

        // Highlight keywords
        const keywords = ["admin", "moderator", "warning", "alert"];
        for (const keyword of keywords) {
            if (text.toLowerCase().includes(keyword)) {
                const color = keyword === "warning" || keyword === "alert" ? 0xFF0000 : 0xFFA500;
                builder.append(text)
                    .withColor(color)
                    .withBold(true);
                return;
            }
        }

        // Preserve original styling for other text
        if (style.hasColor()) {
            if (style.hasCustomColor()) {
                builder.withColor(style.getCustomColor());
            } else {
                const colorValue = style.getColorValue();
                if (colorValue !== -1) {
                    builder.withColor(colorValue);
                }
            }
        }

        builder.withBold(style.bold());
        builder.withItalic(style.italic());
        builder.withUnderlined(style.underlined());
        builder.withStrikethrough(style.strikethrough());
        builder.withObfuscated(style.obfuscated());

        // Preserve click and hover events
        const clickAction = style.getClickAction();
        const clickValue = style.getClickValue();
        if (clickAction && clickValue) {
            builder.withClickEvent(clickAction, clickValue);
        }

        const hoverAction = style.getHoverAction();
        const hoverValue = style.getHoverValue();
        if (hoverAction && hoverValue) {
            if (typeof hoverValue === 'string') {
                builder.withHoverEvent(hoverAction, hoverValue);
            } else if (hoverValue.getString) {
                builder.withHoverEvent(hoverAction, hoverValue.getString());
            }
        }

        builder.append(text);
    }));

    return builder.build();
}
```

### Style Information Display

```js
// Create a style inspector tool
function inspectTextStyles() {
    const text = Chat.createTextHelperFromString("&6&nClick me &rfor &a&linfo!");

    Chat.log("=== Style Inspector ===");

    text.visit(JavaWrapper.methodToJava((style, text) => {
        Chat.log(`\nText: "${text}"`);
        Chat.log(`Style: ${style.toString()}`);

        // Detailed breakdown
        if (style.hasColor()) {
            if (style.hasCustomColor()) {
                const color = style.getCustomColor().toString(16).padStart(6, '0');
                Chat.log(`  Color: Custom #${color}`);
            } else {
                const name = style.getColorName();
                const index = style.getColorIndex();
                const value = style.getColorValue();
                Chat.log(`  Color: ${name} (index: ${index}, value: ${value})`);
            }
        } else {
            Chat.log("  Color: None");
        }

        const formats = [];
        if (style.bold()) formats.push("Bold");
        if (style.italic()) formats.push("Italic");
        if (style.underlined()) formats.push("Underlined");
        if (style.strikethrough()) formats.push("Strikethrough");
        if (style.obfuscated()) formats.push("Obfuscated");

        Chat.log(`  Formatting: ${formats.length > 0 ? formats.join(", ") : "None"}`);

        const clickAction = style.getClickAction();
        if (clickAction) {
            const clickValue = style.getClickValue();
            Chat.log(`  Click: ${clickAction} -> ${clickValue}`);
        }

        const hoverAction = style.getHoverAction();
        if (hoverAction) {
            Chat.log(`  Hover: ${hoverAction}`);
        }

        const insertion = style.getInsertion();
        if (insertion) {
            Chat.log(`  Insertion: ${insertion}`);
        }
    }));
}

inspectTextStyles();
```

## Notes and Limitations

- StyleHelper instances are read-only and cannot be modified directly - use TextBuilder for creating new styled text
- Color values returned by `getColorValue()` are in RGB format (0xRRGGBB)
- Custom colors are those starting with '#' and are handled differently from standard Minecraft colors
- Click and hover events can only be inspected, not modified through StyleHelper
- Some hover values (like entity tooltips) return complex objects that need further processing
- The `getFormatting()` method returns a FormattingHelper which provides additional formatting information
- Style information is context-dependent and may vary based on how the text was originally created

## Related Classes

- `TextHelper` - Main text component class that uses StyleHelper
- `TextBuilder` - Class for creating new text with custom styles
- `FormattingHelper` - Helper for Minecraft formatting codes and colors
- `ItemStackHelper` - Used with hover events that show item information
- `BaseHelper` - Base class that StyleHelper extends

## Version Information

- Available since JSMacros 1.6.5
- Enhanced in 1.8.4 with additional color and formatting methods
- Custom color support added for RGB color values
- Event inspection methods for click and hover interactions