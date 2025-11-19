# FormattingHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.FormattingHelper`

**Implements:** `BaseHelper<Formatting>`

**Since:** `1.8.4`

The `FormattingHelper` class is a utility wrapper around Minecraft's `Formatting` enum that provides access to text formatting codes for colors and text modifiers. It represents standard Minecraft formatting options like colors (red, blue, green), styles (bold, italic, underline), and special effects (obfuscated, strikethrough) that can be applied to text in chat, HUD elements, and other text displays.

This class is typically used with text builders and styling operations to apply consistent formatting to text elements in JSMacros scripts.

## Accessing FormattingHelper

You typically get `FormattingHelper` instances from:
- `StyleHelper.getFormatting()` method
- Text styling operations
- Converting raw Minecraft Formatting objects

```javascript
// Example: Getting formatting from a text style
const text = Chat.createTextHelperFromString("§cHello World");
const style = text.getStyle();
const formatting = style.getFormatting(); // Returns FormattingHelper or null

// Example: Using with TextBuilder
const builder = Chat.createTextBuilder();
// FormattingHelper instances are passed to withFormatting()
```

## Table of Contents

- [Constructors](#constructors)
- [Fields](#fields)
- [Methods](#methods)
- [Minecraft Formatting Codes](#minecraft-formatting-codes)

---

## Constructors

- [new FormattingHelper(base)](#new-formattinghelper)

---

## Fields

No public fields are available for `FormattingHelper`.

---

## Methods

### Properties
- [instance.getColorValue()](#instancegetcolorvalue)
- [instance.getColorIndex()](#instancegetcolorindex)
- [instance.getName()](#instancegetname)
- [instance.getCode()](#instancegetcode)
- [instance.isColor()](#instanceiscolor)
- [instance.isModifier()](#instanceismodifier)
- [instance.toString()](#instancetostring)

## Minecraft Formatting Codes

The `FormattingHelper` wraps Minecraft's standard formatting system:

### Color Codes (isColor() = true, getColorIndex() 0-15)

| Index | Code | Name | RGB Value | Description |
|-------|------|------|-----------|-------------|
| 0 | 0 | black | 0x000000 | Black text |
| 1 | 1 | dark_blue | 0x0000AA | Dark blue text |
| 2 | 2 | dark_green | 0x00AA00 | Dark green text |
| 3 | 3 | dark_aqua | 0x00AAAA | Dark cyan/aqua text |
| 4 | 4 | dark_red | 0xAA0000 | Dark red text |
| 5 | 5 | dark_purple | 0xAA00AA | Dark purple text |
| 6 | 6 | gold | 0xFFAA00 | Gold/yellow text |
| 7 | 7 | gray | 0xAAAAAA | Gray text |
| 8 | 8 | dark_gray | 0x555555 | Dark gray text |
| 9 | 9 | blue | 0x5555FF | Blue text |
| 10 | a | green | 0x55FF55 | Green text |
| 11 | b | aqua | 0x55FFFF | Cyan/aqua text |
| 12 | c | red | 0xFF5555 | Red text |
| 13 | d | light_purple | 0xFF55FF | Light purple/magenta text |
| 14 | e | yellow | 0xFFFF55 | Yellow text |
| 15 | f | white | 0xFFFFFF | White text |

### Modifier Codes (isModifier() = true, getColorIndex() = -1)

| Code | Name | Description |
|------|------|-------------|
| k | obfuscated | Obfuscated/changing text |
| l | bold | Bold text |
| m | strikethrough | Strikethrough text |
| n | underline | Underlined text |
| o | italic | Italic text |
| r | reset | Reset all formatting |

## Usage Examples

### Basic Formatting Analysis
```javascript
// Get formatting from styled text
const text = Chat.createTextHelperFromString("§c§lBold Red Text");
const style = text.getStyle();
const formatting = style.getFormatting();

if (formatting) {
    Chat.log(`Name: ${formatting.getName()}`);
    Chat.log(`Code: §${formatting.getCode()}`);
    Chat.log(`Is Color: ${formatting.isColor()}`);
    Chat.log(`Color Value: 0x${formatting.getColorValue().toString(16)}`);
}
```

### Color Information Extraction
```javascript
function analyzeFormatting(formatting) {
    if (!formatting) {
        Chat.log("No formatting found");
        return;
    }

    const info = [];
    info.push(`Name: ${formatting.getName()}`);
    info.push(`Code: §${formatting.getCode()}`);

    if (formatting.isColor()) {
        info.push(`Type: Color`);
        info.push(`Index: ${formatting.getColorIndex()}`);
        const color = formatting.getColorValue();
        info.push(`RGB: #${color.toString(16).padStart(6, '0').toUpperCase()}`);
    } else {
        info.push(`Type: Modifier`);
    }

    Chat.log(info.join(" | "));
}

// Usage example with different texts
const texts = [
    "§cRed Text",
    "§lBold Text",
    "§6Gold Text",
    "§oItalic Text"
];

texts.forEach(textStr => {
    const text = Chat.createTextHelperFromString(textStr);
    const formatting = text.getStyle().getFormatting();
    Chat.log(`Analyzing: ${textStr}`);
    analyzeFormatting(formatting);
});
```

### Formatting Comparison
```javascript
function compareFormatting(format1, format2) {
    if (!format1 || !format2) return false;

    // Compare by name
    if (format1.getName() === format2.getName()) {
        return true;
    }

    // Compare by code
    if (format1.getCode() === format2.getCode()) {
        return true;
    }

    // For colors, compare by color value
    if (format1.isColor() && format2.isColor()) {
        return format1.getColorValue() === format2.getColorValue();
    }

    return false;
}
```

### Text Formatting Validation
```javascript
function getFormattingSummary(formatting) {
    if (!formatting) {
        return "No formatting";
    }

    let summary = "";

    if (formatting.isColor()) {
        summary += `Color: ${formatting.getName()} `;
        summary += `(§${formatting.getCode()}) `;
        summary += `[RGB: #${formatting.getColorValue().toString(16).padStart(6, '0')}]`;
    } else {
        summary += `Modifier: ${formatting.getName()} `;
        summary += `(§${formatting.getCode()})`;
    }

    return summary;
}

// Example usage
const sampleText = Chat.createTextHelperFromString("§e§m§oStrikethrough Italic Yellow");
const formatting = sampleText.getStyle().getFormatting();
Chat.log(getFormattingSummary(formatting));
```

### Building Formatted Text
```javascript
// While FormattingHelper itself doesn't create text,
// it's often used to analyze existing formatting
function createColoredTextList() {
    const colors = ["§cRed", "§6Gold", "§eYellow", "§aGreen", "§9Blue", "§dPurple"];

    colors.forEach(colorText => {
        const text = Chat.createTextHelperFromString(colorText);
        const formatting = text.getStyle().getFormatting();

        if (formatting && formatting.isColor()) {
            Chat.log(`${colorText} - ${formatting.getName()} formatting`);
        }
    });
}

createColoredTextList();
```

## Integration with Other Classes

The `FormattingHelper` class is often used in conjunction with:

- **StyleHelper:** For accessing text formatting from styled text
- **TextHelper:** For working with formatted text content
- **TextBuilder:** For applying formatting to new text content
- **Chat:** For logging and displaying formatted text

```javascript
// Example integration
const text = Chat.createTextHelperFromString("§4§nUnderlined Dark Red");
const style = text.getStyle();
const formatting = style.getFormatting();

if (formatting) {
    Chat.log(`Text uses ${formatting.getName()} formatting`);
    Chat.log(`Format code: §${formatting.getCode()}`);

    if (formatting.isModifier()) {
        Chat.log("This is a style modifier");
    }
}
```

## Important Notes

1. **Color vs Modifier:** Use `isColor()` and `isModifier()` to distinguish between color formatting and text style modifiers.

2. **Code Usage:** The `getCode()` method returns the character used with the paragraph symbol (§) for in-game text formatting.

3. **Color Values:** For color formatting, `getColorValue()` returns the RGB integer value, which can be converted to hex format for display.

4. **Null Checks:** Always check if a `FormattingHelper` instance is `null` before calling methods, as not all text has formatting applied.

5. **Compatibility:** This class is available since JsMacros 1.8.4 for consistent text formatting operations.

6. **Standard Format:** The formatting system follows Minecraft's standard text formatting conventions, ensuring compatibility with vanilla text display.