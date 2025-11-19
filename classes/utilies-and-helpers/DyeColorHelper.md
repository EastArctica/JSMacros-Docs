# DyeColorHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.DyeColorHelper`

**Extends:** `BaseHelper<DyeColor>`

**Since:** 1.8.4

**Category:** Utility Classes

## Overview

`DyeColorHelper` is a utility class that provides access to Minecraft dye color properties and variations. It wraps the native `DyeColor` enum and allows you to query various color representations including names, RGB values, and context-specific color variations used in different game elements like fireworks and signs.

## How to Access

You typically obtain a `DyeColorHelper` instance from:
- Colored entities (sheep, wolves, cats, llamas, shulkers)
- Dyed items and blocks
- Various color-related game mechanics

```javascript
// Get dye color from a sheep
const sheep = World.findNearestEntity(entity => entity.getEntityType().getId() === "minecraft:sheep");
if (sheep) {
    const color = sheep.getColor();
    log("Sheep color: " + color.getName());
}

// Check the color properties
const colorValue = color.getColorValue();
const fireworkColor = color.getFireworkColor();
log("RGB value: 0x" + colorValue.toString(16).padStart(6, '0'));
log("Firework color: 0x" + fireworkColor.toString(16).padStart(6, '0'));
```

## Methods

### getName()
- **Returns:** `String` - The name of the color (e.g., "white", "red", "blue")
- **Description:** Gets the localized name of this dye color
- **Example:**
```javascript
const color = sheep.getColor();
const colorName = color.getName();
log("Color name: " + colorName); // e.g., "white", "red", "blue"
```

### getId()
- **Returns:** `int` - The color's numeric identifier (0-15)
- **Description:** Gets the unique ID for this dye color in the dye color enum
- **Example:**
```javascript
const color = sheep.getColor();
const colorId = color.getId();
log("Color ID: " + colorId); // 0-15, where 0=white, 1=orange, etc.
```

### getColorValue()
- **Returns:** `int` - The color's RGB value as an integer
- **Description:** Gets the primary RGB color value used for entities and general rendering
- **Example:**
```javascript
const color = sheep.getColor();
const rgb = color.getColorValue();

// Convert to hex format for display
const hexColor = "0x" + rgb.toString(16).padStart(6, '0');
log("RGB color: " + hexColor);

// Extract individual RGB components
const r = (rgb >> 16) & 0xFF;
const g = (rgb >> 8) & 0xFF;
const b = rgb & 0xFF;
log(`RGB components: R=${r}, G=${g}, B=${b}`);
```

### getFireworkColor()
- **Returns:** `int` - The color variation used in fireworks
- **Description:** Gets the specific RGB value used when this color appears in fireworks
- **Example:**
```javascript
const color = sheep.getColor();
const fireworkRgb = color.getFireworkColor();
log("Firework color: 0x" + fireworkRgb.toString(16).padStart(6, '0'));

// Use for creating colored fireworks or particle effects
const fireworkColor = color.getFireworkColor();
// fireworkColor can be used with particle or firework-related APIs
```

### getSignColor()
- **Returns:** `int` - The color variation used on signs
- **Description:** Gets the specific RGB value used when this color appears on text signs
- **Example:**
```javascript
const color = sheep.getColor();
const signRgb = color.getSignColor();
log("Sign text color: 0x" + signRgb.toString(16).padStart(6, '0'));

// This color would be used for text on signs with this dye color
```

## Available Dye Colors

Minecraft has 16 dye colors available, each with unique properties:

| ID | Color Name | Description | Common Uses |
|----|------------|-------------|-------------|
| 0  | WHITE | Pure white | Wool, concrete, stained glass |
| 1  | ORANGE | Bright orange | Terracotta, banners |
| 2  | MAGENTA | Bright magenta/pink | Wool, concrete powder |
| 3  | LIGHT_BLUE | Sky blue | Ice-themed builds |
| 4  | YELLOW | Bright yellow | Gold accents |
| 5  | LIME | Bright lime green | Nature builds |
| 6  | PINK | Light pink | Decorative builds |
| 7  | GRAY | Medium gray | Stone variants |
| 8  | LIGHT_GRAY | Light gray | Concrete, wool |
| 9  | CYAN | Bright cyan | Water themes |
| 10 | PURPLE | Royal purple | Magic themes |
| 11 | BLUE | Royal blue | Water/sky themes |
| 12 | BROWN | Wood brown | Nature builds |
| 13 | GREEN | Forest green | Nature builds |
| 14 | RED | Bright red | Warning/danger |
| 15 | BLACK | Pure black | Contrasts, shadows |

## Usage Examples

### Color Information Display
```javascript
function displayColorInfo(dyeColorHelper) {
    log("=== Dye Color Information ===");
    log("Name: " + dyeColorHelper.getName());
    log("ID: " + dyeColorHelper.getId());

    const mainColor = dyeColorHelper.getColorValue();
    const fireworkColor = dyeColorHelper.getFireworkColor();
    const signColor = dyeColorHelper.getSignColor();

    log("Main RGB: 0x" + mainColor.toString(16).padStart(6, '0').toUpperCase());
    log("Firework RGB: 0x" + fireworkColor.toString(16).padStart(6, '0').toUpperCase());
    log("Sign RGB: 0x" + signColor.toString(16).padStart(6, '0').toUpperCase());

    // Display color preview using formatting
    const hexColor = "&" + Integer.toHexString(dyeColorHelper.getId()).charAt(0);
    Chat.log(hexColor + "Color preview: " + dyeColorHelper.getName().toUpperCase());
}
```

### Sheep Color Analysis
```javascript
function analyzeSheepColors() {
    const sheep = World.findNearestEntity(entity =>
        entity.getEntityType().getId() === "minecraft:sheep"
    );

    if (!sheep) {
        log("No sheep found nearby");
        return;
    }

    const color = sheep.getColor();

    log("Sheep Analysis:");
    log("Is sheared: " + sheep.isSheared());
    log("Is shearable: " + sheep.isShearable());
    log("Is rainbow sheep: " + sheep.isJeb());

    if (!sheep.isSheared()) {
        log("Wool color: " + color.getName());

        // Get color information for potential wool drops
        const woolColor = color.getColorValue();
        log("Expected wool color: 0x" + woolColor.toString(16).padStart(6, '0'));
    }
}
```

### Color Comparison
```javascript
function compareColors(color1, color2) {
    log("=== Color Comparison ===");
    log("Color 1: " + color1.getName() + " (ID: " + color1.getId() + ")");
    log("Color 2: " + color2.getName() + " (ID: " + color2.getId() + ")");

    // Compare RGB values
    const rgb1 = color1.getColorValue();
    const rgb2 = color2.getColorValue();

    if (rgb1 === rgb2) {
        log("Colors have identical RGB values");
    } else {
        log("Colors have different RGB values");

        // Calculate color difference (simple Euclidean distance in RGB space)
        const r1 = (rgb1 >> 16) & 0xFF, g1 = (rgb1 >> 8) & 0xFF, b1 = rgb1 & 0xFF;
        const r2 = (rgb2 >> 16) & 0xFF, g2 = (rgb2 >> 8) & 0xFF, b2 = rgb2 & 0xFF;

        const distance = Math.sqrt(
            Math.pow(r2 - r1, 2) +
            Math.pow(g2 - g1, 2) +
            Math.pow(b2 - b1, 2)
        );

        log("Color difference: " + distance.toFixed(2));
    }
}
```

### Color Theme Builder
```javascript
function buildColorTheme(baseColor) {
    const theme = {
        primary: baseColor,
        accent: null,
        secondary: null
    };

    // Based on color ID, suggest complementary colors
    const colorId = baseColor.getId();

    // Simple complementary color suggestions
    const complementaryPairs = {
        0: 14,  // white -> red
        1: 11,  // orange -> blue
        2: 12,  // magenta -> brown
        3: 13,  // light blue -> green
        4: 11,  // yellow -> blue
        5: 14,  // lime -> red
        6: 10,  // pink -> purple
        7: 15,  // gray -> black
        8: 14,  // light gray -> red
        9: 13,  // cyan -> green
        10: 4,  // purple -> yellow
        11: 1,  // blue -> orange
        12: 2,  // brown -> magenta
        13: 3,  // green -> light blue
        14: 0,  // red -> white
        15: 7   // black -> gray
    };

    log("Color theme based on " + baseColor.getName() + ":");
    log("Primary color RGB: 0x" + baseColor.getColorValue().toString(16).padStart(6, '0'));

    const accentId = complementaryPairs[colorId];
    if (accentId !== undefined) {
        log("Suggested accent color ID: " + accentId);
        log("This creates good contrast with the primary color");
    }

    return theme;
}
```

### Entity Color Scanner
```javascript
function scanColoredEntities() {
    const coloredEntities = World.getEntities().filter(entity => {
        const type = entity.getEntityType().getId();
        return type.includes("sheep") ||
               type.includes("wolf") ||
               type.includes("cat") ||
               type.includes("llama") ||
               type.includes("shulker");
    });

    const colorCounts = {};

    coloredEntities.forEach(entity => {
        let color = null;

        try {
            if (entity.getColor) {
                color = entity.getColor();
            }
        } catch (e) {
            // Entity doesn't have getColor method
            return;
        }

        if (color) {
            const colorName = color.getName();
            colorCounts[colorName] = (colorCounts[colorName] || 0) + 1;

            log(entity.getEntityType().getId() + " - Color: " + colorName +
                " (RGB: 0x" + color.getColorValue().toString(16).padStart(6, '0') + ")");
        }
    });

    log("\n=== Color Summary ===");
    Object.entries(colorCounts).forEach(([color, count]) => {
        log(color + ": " + count + " entities");
    });
}
```

## Important Notes

### Color Variations
- **Main Color (`getColorValue()`)**: Used for most entity rendering and general purposes
- **Firework Color (`getFireworkColor()`)**: Optimized for firework particle effects
- **Sign Color (`getSignColor()`)**: Optimized for text readability on signs

### Color IDs
- Color IDs range from 0 to 15 and correspond to the order in Minecraft's dye color enum
- These IDs are consistent across different Minecraft versions

### RGB Format
- RGB values are returned as integers where:
  - Red component: bits 16-23
  - Green component: bits 8-15
  - Blue component: bits 0-7

### Entity Color Context
- Different entities may use different color variations:
  - Sheep wool color uses the main color value
  - Wolf collar color uses the main color value
  - Shulker color uses the main color value
  - Firework particles use the firework color variation

## Related Classes

- [`SheepEntityHelper`](../classes/world/entity/specialized/passive/SheepEntityHelper.md) - For sheep entities with wool color
- [`WolfEntityHelper`](../classes/world/entity/specialized/passive/WolfEntityHelper.md) - For wolf entities with collar color
- [`CatEntityHelper`](../classes/world/entity/specialized/passive/CatEntityHelper.md) - For cat entities with collar color
- [`LlamaEntityHelper`](../classes/world/entity/specialized/passive/LlamaEntityHelper.md) - For llama entities with carpet color
- [`ShulkerEntityHelper`](../classes/world/entity/specialized/mob/ShulkerEntityHelper.md) - For shulker entities with color