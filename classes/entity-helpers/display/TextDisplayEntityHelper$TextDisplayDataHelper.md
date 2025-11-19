# TextDisplayEntityHelper$TextDisplayDataHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.display.TextDisplayEntityHelper$TextDisplayDataHelper`

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.display`

**Since:** 1.9.1

**Requires:** Minecraft 1.19.4 or later

## Overview

The `TextDisplayDataHelper` class is a nested helper within `TextDisplayEntityHelper` that provides access to all text-specific properties and display settings for text display entities. This class encapsulates the complete data model for text display entities, including text content, visual styling, alignment, colors, background, and various display flags.

Text display entities use this data structure to store and manage their appearance and behavior. The helper provides methods to access and modify all aspects of text display configuration, making it easy to create sophisticated text displays with custom formatting, colors, backgrounds, and visual effects.

## Class Structure

This helper contains properties for:
- Text content and formatting
- Alignment and layout settings
- Visual effects (shadow, see-through)
- Background colors and styling
- Opacity and transparency settings
- Line width and text wrapping

## Methods

### Text Content Methods

#### `getText()`
**Returns:** `TextHelper` - The text content helper

Gets the text content of the display entity as a `TextHelper` object, allowing access to formatted text, colors, styles, and translation capabilities.

**Example:**
```javascript
const textDisplay = entity.asTextDisplay();
const data = textDisplay.getData();

if (data) {
    const text = data.getText();
    const plainText = text.getString();
    const formattedText = text.getAsFormattedString();

    Chat.log(`Display text: "${plainText}"`);
    Chat.log(`Formatted text: "${formattedText}"`);
}
```

### Alignment and Layout Methods

#### `getAlignment()`
**Returns:** `String` - The text alignment

Gets the horizontal alignment of the text. Possible values:
- `"center"` - Text is centered horizontally
- `"left"` - Text is aligned to the left
- `"right"` - Text is aligned to the right

**Example:**
```javascript
const alignment = data.getAlignment();
Chat.log(`Text alignment: ${alignment}`);

switch (alignment) {
    case "center":
        Chat.log("Text is center-aligned");
        break;
    case "left":
        Chat.log("Text is left-aligned");
        break;
    case "right":
        Chat.log("Text is right-aligned");
        break;
}
```

#### `getLineWidth()`
**Returns:** `int` - Maximum line width in pixels

Gets the maximum line width for text wrapping. A value of 0 or less typically indicates unlimited line width.

**Example:**
```javascript
const lineWidth = data.getLineWidth();
if (lineWidth <= 0) {
    Chat.log("Unlimited line width");
} else {
    Chat.log(`Line width: ${lineWidth} pixels`);
}
```

### Visual Style Methods

#### `getTextOpacity()`
**Returns:** `int` - Text opacity value (0-255)

Gets the opacity of the text, where 0 is completely transparent and 255 is fully opaque.

**Example:**
```javascript
const opacity = data.getTextOpacity();
const opacityPercent = (opacity / 255 * 100).toFixed(1);
Chat.log(`Text opacity: ${opacity}/255 (${opacityPercent}%)`);

if (opacity < 128) {
    Chat.log("Text is semi-transparent");
}
```

#### `getBackgroundColor()`
**Returns:** `int` - Background color in ARGB format

Gets the background color of the text display. The color is in ARGB format (0xAARRGGBB), where the alpha channel controls opacity. A value of 0 indicates no background color.

**Example:**
```javascript
const bgColor = data.getBackgroundColor();

if (bgColor === 0) {
    Chat.log("No background color set");
} else {
    const alpha = (bgColor >> 24) & 0xFF;
    const red = (bgColor >> 16) & 0xFF;
    const green = (bgColor >> 8) & 0xFF;
    const blue = bgColor & 0xFF;

    Chat.log(`Background color: RGBA(${red}, ${green}, ${blue}, ${alpha})`);
    Chat.log(`Background opacity: ${alpha/255*100}%`);

    // Convert to hex format
    const hexColor = ((1<<24)+(red<<16)+(green<<8)+blue).toString(16).slice(1).toUpperCase();
    Chat.log(`Background hex: #${hexColor}`);
}
```

### Display Flag Methods

#### `hasShadowFlag()`
**Returns:** `boolean` - Whether text has shadow effect

Checks if the text display has a shadow effect enabled, which improves readability against various backgrounds.

**Example:**
```javascript
const hasShadow = data.hasShadowFlag();
if (hasShadow) {
    Chat.log("Text has shadow effect");
} else {
    Chat.log("Text has no shadow");
}
```

#### `hasSeeThroughFlag()`
**Returns:** `boolean` - Whether text is see-through

Checks if the text display has the see-through flag enabled, allowing text to be visible through blocks when appropriate.

**Example:**
```javascript
const isSeeThrough = data.hasSeeThroughFlag();
if (isSeeThrough) {
    Chat.log("Text is see-through");
} else {
    Chat.log("Text is not see-through");
}
```

#### `hasDefaultBackgroundFlag()`
**Returns:** `boolean` - Whether default background is enabled

Checks if the text display uses the default dark background style instead of a custom background color.

**Example:**
```javascript
const hasDefaultBg = data.hasDefaultBackgroundFlag();
if (hasDefaultBg) {
    Chat.log("Text uses default background");
} else {
    Chat.log("Text does not use default background");
}
```

## Usage Examples

### Example 1: Complete Text Display Analysis
```javascript
function analyzeTextDisplayData(entity) {
    const textDisplay = entity.asTextDisplay();
    const data = textDisplay.getData();

    if (!data) {
        Chat.log("No text data available");
        return null;
    }

    const analysis = {
        text: data.getText().getString(),
        alignment: data.getAlignment(),
        lineWidth: data.getLineWidth(),
        opacity: data.getTextOpacity(),
        backgroundColor: data.getBackgroundColor(),
        hasShadow: data.hasShadowFlag(),
        isSeeThrough: data.hasSeeThroughFlag(),
        hasDefaultBackground: data.hasDefaultBackgroundFlag()
    };

    // Display comprehensive analysis
    Chat.log("=== Text Display Data Analysis ===");
    Chat.log(`Text: "${analysis.text}"`);
    Chat.log(`Alignment: ${analysis.alignment}`);
    Chat.log(`Line Width: ${analysis.lineWidth}px`);
    Chat.log(`Text Opacity: ${analysis.opacity}/255 (${(analysis.opacity/255*100).toFixed(1)}%)`);

    // Background analysis
    if (analysis.hasDefaultBackground) {
        Chat.log("Background: Default dark background");
    } else if (analysis.backgroundColor !== 0) {
        const alpha = (analysis.backgroundColor >> 24) & 0xFF;
        const red = (analysis.backgroundColor >> 16) & 0xFF;
        const green = (analysis.backgroundColor >> 8) & 0xFF;
        const blue = analysis.backgroundColor & 0xFF;
        Chat.log(`Background: Custom #${((1<<24)+(red<<16)+(green<<8)+blue).toString(16).slice(1).toUpperCase()} (${alpha/255*100}% opacity)`);
    } else {
        Chat.log("Background: None");
    }

    // Effects analysis
    const effects = [];
    if (analysis.hasShadow) effects.push("Shadow");
    if (analysis.isSeeThrough) effects.push("See-through");

    if (effects.length > 0) {
        Chat.log(`Effects: ${effects.join(", ")}`);
    } else {
        Chat.log("Effects: None");
    }

    return analysis;
}

// Usage with a text display entity
const textDisplays = World.getEntities().filter(e => e.is("minecraft:text_display"));
if (textDisplays.length > 0) {
    analyzeTextDisplayData(textDisplays[0]);
}
```

### Example 2: Text Display Quality Assessment
```javascript
function assessTextDisplayQuality(data) {
    const issues = [];
    const suggestions = [];

    const text = data.getText().getString();
    const opacity = data.getTextOpacity();
    const lineWidth = data.getLineWidth();
    const alignment = data.getAlignment();
    const hasShadow = data.hasShadowFlag();
    const hasDefaultBg = data.hasDefaultBackgroundFlag();
    const hasCustomBg = data.getBackgroundColor() !== 0;

    // Text content checks
    if (!text || text.trim() === "") {
        issues.push("Text is empty");
    }

    // Opacity checks
    if (opacity < 50) {
        issues.push("Text opacity is very low");
    } else if (opacity < 128) {
        suggestions.push("Consider increasing opacity for better readability");
    }

    // Background checks
    if (!hasDefaultBg && !hasCustomBg && !hasShadow) {
        suggestions.push("Add shadow or background for better readability");
    }

    // Line width checks
    if (lineWidth > 0 && lineWidth < 100) {
        suggestions.push("Line width is narrow - text may appear cramped");
    } else if (lineWidth > 400) {
        suggestions.push("Consider center alignment for very wide text");
    }

    // Alignment-specific suggestions
    if (alignment === "right" && !hasShadow) {
        suggestions.push("Right-aligned text benefits from shadow");
    }

    if (alignment === "center" && lineWidth > 300) {
        suggestions.push("Consider left alignment for long text");
    }

    return { issues, suggestions };
}
```

### Example 3: Text Display Statistics Collection
```javascript
function collectTextDisplayStatistics() {
    const textDisplays = World.getEntities().filter(e => e.is("minecraft:text_display"));
    const stats = {
        total: textDisplays.length,
        byAlignment: { center: 0, left: 0, right: 0 },
        byOpacity: { high: 0, medium: 0, low: 0 },
        withBackground: 0,
        withShadow: 0,
        seeThrough: 0,
        empty: 0,
        averageLineWidth: 0,
        lineWidths: []
    };

    textDisplays.forEach(entity => {
        const textDisplay = entity.asTextDisplay();
        const data = textDisplay.getData();

        if (data) {
            const alignment = data.getAlignment();
            const lineWidth = data.getLineWidth();
            const opacity = data.getTextOpacity();
            const text = data.getText().getString();
            const hasDefaultBg = data.hasDefaultBackgroundFlag();
            const hasCustomBg = data.getBackgroundColor() !== 0;
            const hasShadow = data.hasShadowFlag();
            const isSeeThrough = data.hasSeeThroughFlag();

            // Update statistics
            stats.byAlignment[alignment]++;
            stats.lineWidths.push(lineWidth);
            stats.averageLineWidth += lineWidth;

            // Opacity classification
            if (opacity >= 200) stats.byOpacity.high++;
            else if (opacity >= 100) stats.byOpacity.medium++;
            else stats.byOpacity.low++;

            // Background and effects
            if (hasDefaultBg || hasCustomBg) stats.withBackground++;
            if (hasShadow) stats.withShadow++;
            if (isSeeThrough) stats.seeThrough++;

            // Empty text
            if (!text || text.trim() === "") stats.empty++;
        }
    });

    // Calculate averages
    if (textDisplays.length > 0) {
        stats.averageLineWidth = stats.averageLineWidth / textDisplays.length;
    }

    return stats;
}

// Display statistics
function displayTextDisplayStats() {
    const stats = collectTextDisplayStatistics();

    Chat.log("=== Text Display Statistics ===");
    Chat.log(`Total displays: ${stats.total}`);

    if (stats.total === 0) return;

    Chat.log("\nBy Alignment:");
    Chat.log(`  Center: ${stats.byAlignment.center} (${(stats.byAlignment.center/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  Left: ${stats.byAlignment.left} (${(stats.byAlignment.left/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  Right: ${stats.byAlignment.right} (${(stats.byAlignment.right/stats.total*100).toFixed(1)}%)`);

    Chat.log("\nBy Opacity:");
    Chat.log(`  High (≥200): ${stats.byOpacity.high} (${(stats.byOpacity.high/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  Medium (100-199): ${stats.byOpacity.medium} (${(stats.byOpacity.medium/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  Low (<100): ${stats.byOpacity.low} (${(stats.byOpacity.low/stats.total*100).toFixed(1)}%)`);

    Chat.log("\nVisual Features:");
    Chat.log(`  With background: ${stats.withBackground} (${(stats.withBackground/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  With shadow: ${stats.withShadow} (${(stats.withShadow/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  See-through: ${stats.seeThrough} (${(stats.seeThrough/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  Empty text: ${stats.empty} (${(stats.empty/stats.total*100).toFixed(1)}%)`);

    if (stats.lineWidths.length > 0) {
        const minWidth = Math.min(...stats.lineWidths.filter(w => w > 0));
        const maxWidth = Math.max(...stats.lineWidths);
        Chat.log(`\nLine Width Statistics:`);
        Chat.log(`  Average: ${stats.averageLineWidth.toFixed(0)}px`);
        if (minWidth > 0) Chat.log(`  Range: ${minWidth}px - ${maxWidth}px`);
    }
}

displayTextDisplayStats();
```

### Example 4: Text Display Validation
```javascript
function validateTextDisplayData(data) {
    const validation = {
        isValid: true,
        errors: [],
        warnings: []
    };

    // Check required properties
    if (!data) {
        validation.isValid = false;
        validation.errors.push("Text data is null");
        return validation;
    }

    // Validate text content
    try {
        const text = data.getText();
        if (!text) {
            validation.errors.push("Text helper is null");
            validation.isValid = false;
        }
    } catch (e) {
        validation.errors.push(`Error accessing text: ${e.message}`);
        validation.isValid = false;
    }

    // Validate alignment
    const alignment = data.getAlignment();
    const validAlignments = ["center", "left", "right"];
    if (!validAlignments.includes(alignment)) {
        validation.errors.push(`Invalid alignment: ${alignment}`);
        validation.isValid = false;
    }

    // Validate opacity range
    const opacity = data.getTextOpacity();
    if (opacity < 0 || opacity > 255) {
        validation.warnings.push(`Opacity out of range: ${opacity} (should be 0-255)`);
    }

    // Validate line width
    const lineWidth = data.getLineWidth();
    if (lineWidth < 0) {
        validation.warnings.push(`Negative line width: ${lineWidth} (may indicate unlimited width)`);
    }

    // Check for potential visibility issues
    if (opacity < 50) {
        validation.warnings.push("Very low opacity may make text unreadable");
    }

    const hasShadow = data.hasShadowFlag();
    const hasDefaultBg = data.hasDefaultBackgroundFlag();
    const hasCustomBg = data.getBackgroundColor() !== 0;

    if (!hasShadow && !hasDefaultBg && !hasCustomBg) {
        validation.warnings.push("Text may be hard to read without shadow or background");
    }

    return validation;
}

// Usage
const textDisplays = World.getEntities().filter(e => e.is("minecraft:text_display"));
textDisplays.forEach((entity, index) => {
    const textDisplay = entity.asTextDisplay();
    const data = textDisplay.getData();
    const validation = validateTextDisplayData(data);

    Chat.log(`Text Display ${index + 1}:`);
    if (validation.isValid) {
        Chat.log("  ✅ Valid");
    } else {
        Chat.log("  ❌ Invalid");
    }

    validation.errors.forEach(error => Chat.log(`  Error: ${error}`));
    validation.warnings.forEach(warning => Chat.log(`  Warning: ${warning}`));
});
```

### Example 5: Text Display Data Export
```javascript
function exportTextDisplayData() {
    const textDisplays = World.getEntities().filter(e => e.is("minecraft:text_display"));
    const exportData = [];

    textDisplays.forEach(entity => {
        const textDisplay = entity.asTextDisplay();
        const data = textDisplay.getData();

        if (data) {
            const exportEntry = {
                id: entity.getUuid(),
                position: {
                    x: entity.getPos().x,
                    y: entity.getPos().y,
                    z: entity.getPos().z
                },
                text: data.getText().getString(),
                alignment: data.getAlignment(),
                lineWidth: data.getLineWidth(),
                textOpacity: data.getTextOpacity(),
                backgroundColor: data.getBackgroundColor(),
                hasShadow: data.hasShadowFlag(),
                isSeeThrough: data.hasSeeThroughFlag(),
                hasDefaultBackground: data.hasDefaultBackgroundFlag()
            };

            exportData.push(exportEntry);
        }
    });

    // Export as JSON
    const jsonExport = JSON.stringify(exportData, null, 2);
    Chat.log("=== Text Display Export ===");
    Chat.log(`Exported ${exportData.length} text displays`);

    // Save to file (simplified example)
    try {
        const fileName = `text_displays_${Date.now()}.json`;
        const filePath = "exports/" + fileName;
        const outputStream = new Packages.java.io.FileOutputStream(filePath);
        outputStream.write(jsonExport.getBytes());
        outputStream.close();
        Chat.log(`Export saved to: ${filePath}`);
    } catch (e) {
        Chat.log(`Failed to save export: ${e.message}`);
    }

    return exportData;
}

// Usage
const exportedData = exportTextDisplayData();
Chat.log(`Export contains ${exportedData.length} text display entries`);
```

## Important Notes

### Data Access

1. **Null Checks:** Always check if `getData()` returns `null` before accessing properties
2. **Entity Validity:** Ensure the text display entity is still alive (`isAlive()`) before accessing data
3. **Version Compatibility:** Text display entities require Minecraft 1.19.4 or later

### Color Format

1. **ARGB Format:** Background colors use ARGB format (0xAARRGGBB)
2. **Alpha Channel:** Alpha channel controls background opacity (0-255)
3. **Zero Value:** A value of 0 indicates no background color

### Performance Considerations

1. **Caching:** Cache data access when using the same properties multiple times
2. **Frequency:** Avoid frequent data access in performance-critical code
3. **Validation:** Validate data ranges before using values in calculations

## Best Practices

1. **Null Safety:** Always validate data before accessing properties
2. **Range Checking:** Validate opacity and color values are within expected ranges
3. **Error Handling:** Implement proper error handling for data access failures
4. **Performance:** Cache frequently accessed properties to avoid repeated method calls
5. **Version Check:** Verify Minecraft version compatibility before using text display features

## Related Classes

- [`TextDisplayEntityHelper`](TextDisplayEntityHelper.md) - Parent text display helper class
- [`TextHelper`](TextHelper.md) - Text formatting and styling helper
- [`DisplayEntityHelper`](DisplayEntityHelper.md) - Base display entity helper
- [`EntityHelper`](EntityHelper.md) - Base entity helper class
- [`Pos3D`](Pos3D.md) - 3D position handling
- `ColorHelper` - Color manipulation and conversion utilities

## Version History

- **1.9.1:** Initial introduction with text display entity support
- **Current:** Enhanced property access and improved validation