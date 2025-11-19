# TextDisplayEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.display.TextDisplayEntityHelper`

**Extends:** `DisplayEntityHelper<TextDisplayEntity>`

The `TextDisplayEntityHelper` class is a specialized wrapper for Minecraft text display entities (introduced in 1.19.4), providing access to text-specific properties such as text content, alignment, colors, background, and visual effects. Text display entities allow you to display formatted text in the world with advanced customization options for positioning, rotation, scaling, and text styling.

Text display entities are special entities used to show customizable text in the 3D world, perfect for creating signs, labels, floating text, HUD elements, or decorative text displays. This class is typically obtained through entity-related events, world queries with text display filtering, or by casting from a generic EntityHelper.

## Constructors

TextDisplayEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`)
- World entity queries with text display filtering
- Methods that return entities and can be cast to text display entities
- Entity type checking with `entity.is("minecraft:text_display")`

## Methods

- [entity.getData()](#entitygetdata)

---

## Usage Examples

### Basic Text Display Detection
```js
// Find all text display entities in range
function findTextDisplayEntities(range = 50) {
    const player = Player.getPlayer();
    if (!player) return [];

    const entities = World.getEntities();
    const textDisplays = [];

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= range && entity.is("minecraft:text_display")) {
            textDisplays.push(entity);
        }
    });

    return textDisplays;
}

// Log all nearby text display entities
const textDisplays = findTextDisplayEntities();
Chat.log(`Found ${textDisplays.length} text display entities:`);

textDisplays.forEach((entity, index) => {
    const pos = entity.getPos();
    const textDisplay = entity.asTextDisplay();
    const data = textDisplay.getData();

    if (data) {
        const text = data.getText().getString();
        const alignment = data.getAlignment();

        Chat.log(`${index + 1}. "${text}" (${alignment}) at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
    }
});
```

### Text Display Information Panel
```js
// Create comprehensive information panel for text display entities
function getTextDisplayInfo(entity) {
    const textDisplay = entity.asTextDisplay();
    const data = textDisplay.getData();

    if (!data) return ["No text data available"];

    const text = data.getText().getString();
    const alignment = data.getAlignment();
    const lineWidth = data.getLineWidth();
    const opacity = data.getTextOpacity();
    const bgColor = data.getBackgroundColor();
    const hasShadow = data.hasShadowFlag();
    const isSeeThrough = data.hasSeeThroughFlag();
    const hasDefaultBg = data.hasDefaultBackgroundFlag();

    let info = [];
    info.push(`=== Text Display: "${text}" ===`);
    info.push(`Alignment: ${alignment}`);
    info.push(`Line Width: ${lineWidth}px`);
    info.push(`Opacity: ${opacity}/255 (${(opacity/255*100).toFixed(1)}%)`);

    // Background information
    if (hasDefaultBg) {
        info.push(`Background: Default dark background`);
    } else if (bgColor !== 0) {
        const alpha = (bgColor >> 24) & 0xFF;
        const red = (bgColor >> 16) & 0xFF;
        const green = (bgColor >> 8) & 0xFF;
        const blue = bgColor & 0xFF;
        info.push(`Background: Custom #${((1<<24)+(red<<16)+(green<<8)+blue).toString(16).slice(1).toUpperCase()}`);
    } else {
        info.push(`Background: None`);
    }

    // Effects
    const effects = [];
    if (hasShadow) effects.push("Shadow");
    if (isSeeThrough) effects.push("See-through");
    if (effects.length > 0) {
        info.push(`Effects: ${effects.join(", ")}`);
    }

    return info;
}

// Display information for the nearest text display entity
const player = Player.getPlayer();
if (player) {
    const textDisplays = World.getEntities().filter(entity => entity.is("minecraft:text_display"));

    let nearest = null;
    let minDistance = Infinity;

    textDisplays.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = entity;
        }
    });

    if (nearest && minDistance <= 20) {
        const info = getTextDisplayInfo(nearest);
        info.forEach(line => Chat.log(line));
        Chat.log(`Distance: ${minDistance.toFixed(1)} blocks`);
    } else {
        Chat.log("No text display entities found within 20 blocks");
    }
}
```

### Text Display Analytics
```js
// Analyze all text display entities in the world
function analyzeTextDisplays() {
    const textDisplays = World.getEntities().filter(entity => entity.is("minecraft:text_display"));

    const stats = {
        total: textDisplays.length,
        byAlignment: { center: 0, left: 0, right: 0 },
        withBackground: 0,
        withShadow: 0,
        seeThrough: 0,
        averageLineWidth: 0,
        empty: 0
    };

    const allLineWidths = [];
    const textContents = [];

    textDisplays.forEach(entity => {
        const textDisplay = entity.asTextDisplay();
        const data = textDisplay.getData();

        if (data) {
            const alignment = data.getAlignment();
            const lineWidth = data.getLineWidth();
            const text = data.getText().getString();
            const hasDefaultBg = data.hasDefaultBackgroundFlag();
            const hasCustomBg = data.getBackgroundColor() !== 0;
            const hasShadow = data.hasShadowFlag();
            const isSeeThrough = data.hasSeeThroughFlag();

            // Update statistics
            stats.byAlignment[alignment]++;
            stats.averageLineWidth += lineWidth;
            allLineWidths.push(lineWidth);

            if (hasDefaultBg || hasCustomBg) stats.withBackground++;
            if (hasShadow) stats.withShadow++;
            if (isSeeThrough) stats.seeThrough++;

            if (!text || text.trim() === "") {
                stats.empty++;
            } else {
                textContents.push(text);
            }
        }
    });

    // Calculate averages
    if (textDisplays.length > 0) {
        stats.averageLineWidth = stats.averageLineWidth / textDisplays.length;
    }

    // Display results
    Chat.log("=== Text Display Analytics ===");
    Chat.log(`Total text displays: ${stats.total}`);
    Chat.log(`Empty text displays: ${stats.empty}`);
    Chat.log(`Non-empty text displays: ${stats.total - stats.empty}`);

    Chat.log("\nBy Alignment:");
    Chat.log(`  Center: ${stats.byAlignment.center}`);
    Chat.log(`  Left: ${stats.byAlignment.left}`);
    Chat.log(`  Right: ${stats.byAlignment.right}`);

    Chat.log("\nVisual Features:");
    Chat.log(`  With background: ${stats.withBackground} (${(stats.withBackground/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  With shadow: ${stats.withShadow} (${(stats.withShadow/stats.total*100).toFixed(1)}%)`);
    Chat.log(`  See-through: ${stats.seeThrough} (${(stats.seeThrough/stats.total*100).toFixed(1)}%)`);

    if (allLineWidths.length > 0) {
        const minWidth = Math.min(...allLineWidths);
        const maxWidth = Math.max(...allLineWidths);
        Chat.log(`\nLine width statistics:`);
        Chat.log(`  Average: ${stats.averageLineWidth.toFixed(0)}px`);
        Chat.log(`  Range: ${minWidth}px - ${maxWidth}px`);
    }

    // Display sample text contents
    if (textContents.length > 0) {
        Chat.log("\nSample text contents:");
        textContents.slice(0, 5).forEach((text, index) => {
            Chat.log(`  ${index + 1}. "${text}"`);
        });
        if (textContents.length > 5) {
            Chat.log(`  ... and ${textContents.length - 5} more`);
        }
    }
}

analyzeTextDisplays();
```

### Text Display Quality Monitor
```js
// Monitor text display entities for potential issues
function checkTextDisplayQuality(entity) {
    const textDisplay = entity.asTextDisplay();
    const data = textDisplay.getData();

    if (!data) return [];

    const issues = [];
    const suggestions = [];

    const text = data.getText().getString();
    const alignment = data.getAlignment();
    const lineWidth = data.getLineWidth();
    const opacity = data.getTextOpacity();
    const hasDefaultBg = data.hasDefaultBackgroundFlag();
    const hasCustomBg = data.getBackgroundColor() !== 0;
    const hasShadow = data.hasShadowFlag();

    // Check for common issues
    if (!text || text.trim() === "") {
        issues.push("Text is empty - consider removing the entity or adding content");
    }

    if (opacity < 50) {
        issues.push("Text is very transparent - might be hard to read");
    } else if (opacity < 128) {
        suggestions.push("Text is semi-transparent - ensure good contrast with background");
    }

    if (!hasDefaultBg && !hasCustomBg && !hasShadow) {
        suggestions.push("Consider adding shadow or background for better readability");
    }

    if (lineWidth > 0 && lineWidth < 100) {
        suggestions.push("Line width is quite narrow - text might appear cramped");
    } else if (lineWidth > 400) {
        suggestions.push("Line width is very wide - consider using multiple lines or center alignment");
    }

    // Alignment-specific suggestions
    if (alignment === "center" && lineWidth > 300) {
        suggestions.push("Consider left alignment for very wide text to improve readability");
    }

    if (alignment === "right" && !hasShadow) {
        suggestions.push("Right-aligned text often benefits from shadow for better edge definition");
    }

    return { issues, suggestions };
}

// Check quality of all text displays
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 200 === 0) { // Every 10 seconds
        const textDisplays = World.getEntities().filter(entity => entity.is("minecraft:text_display"));

        textDisplays.forEach(entity => {
            const quality = checkTextDisplayQuality(entity);
            const pos = entity.getPos();

            if (quality.issues.length > 0) {
                Chat.log(`&cIssues with text display at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]:`);
                quality.issues.forEach(issue => Chat.log(`  - ${issue}`));
            }

            if (quality.suggestions.length > 0) {
                Chat.log(`&eSuggestions for text display at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]:`);
                quality.suggestions.forEach(suggestion => Chat.log(`  - ${suggestion}`));
            }
        });
    }
}));
```

### Dynamic Text Display Tracker
```js
// Track changes in text display entities over time
class TextDisplayTracker {
    constructor() {
        this.trackedEntities = new Map();
    }

    startTracking(entity) {
        const uuid = entity.getUUID();
        const textDisplay = entity.asTextDisplay();
        const data = textDisplay.getData();

        if (data) {
            const text = data.getText().getString();
            this.trackedEntities.set(uuid, {
                entity: entity,
                lastText: text,
                lastUpdate: Client.getTime(),
                changeCount: 0
            });

            Chat.log(`Started tracking text display: "${text}"`);
        }
    }

    updateTracking() {
        for (const [uuid, data] of this.trackedEntities) {
            if (!data.entity.isAlive()) {
                Chat.log(`Tracked text display has been removed`);
                this.trackedEntities.delete(uuid);
                continue;
            }

            const textDisplay = data.entity.asTextDisplay();
            const currentData = textDisplay.getData();

            if (currentData) {
                const currentText = currentData.getText().getString();

                if (currentText !== data.lastText) {
                    Chat.log(`Text display content changed:`);
                    Chat.log(`  From: "${data.lastText}"`);
                    Chat.log(`  To: "${currentText}"`);

                    data.lastText = currentText;
                    data.lastUpdate = Client.getTime();
                    data.changeCount++;
                }
            }
        }
    }

    getTrackedEntityCount() {
        return this.trackedEntities.size;
    }

    getTotalChanges() {
        let total = 0;
        for (const [, data] of this.trackedEntities) {
            total += data.changeCount;
        }
        return total;
    }
}

const tracker = new TextDisplayTracker();

// Track text displays when they spawn
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();

    if (entity.is("minecraft:text_display")) {
        tracker.startTracking(entity);
    }
}));

// Update tracking every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks
        tracker.updateTracking();

        if (tracker.getTrackedEntityCount() > 0) {
            Chat.actionbar(`Tracking ${tracker.getTrackedEntityCount()} text displays, ${tracker.getTotalChanges()} total changes`);
        }
    }
}));
```

## Notes and Limitations

- TextDisplayEntityHelper instances become invalid when the text display entity is removed from the world. Always check `isAlive()` before accessing entity data.
- Text display entities were introduced in Minecraft 1.19.4, so this helper class is only available in game versions 1.19.4 and later.
- The `getData()` method may return null in some cases, particularly if the entity is in an invalid state or the text data is not available.
- Text content is returned as a `TextHelper` object, allowing access to formatted text, colors, and translation capabilities.
- Color values (background color) are returned in ARGB format (0xAARRGGBB), where the alpha channel controls opacity.
- Line width affects text wrapping and layout; a value of 0 or less typically means unlimited line width.
- The text display flags (shadow, see-through, default background) are boolean properties that can be combined.
- When working with text display entities in multiplayer, some properties may be controlled by the server and not always accessible or modifiable by the client.

## Related Classes

- `DisplayEntityHelper` - Base class for all display entities with common display properties
- `EntityHelper` - Base class for all entity helpers with common entity methods
- `TextHelper` - Text formatting, styling, and content access utilities
- `BlockDisplayEntityHelper` - Specialized helper for block display entities
- `ItemDisplayEntityHelper` - Specialized helper for item display entities
- `Pos3D` - 3D position and vector mathematics
- `DirectionHelper` - Cardinal directions and facing operations

## Version Information

- Available since JSMacros 1.9.1
- Requires Minecraft 1.19.4 or later (text display entities introduced in this version)
- All methods require a text display entity instance; use `entity.is("minecraft:text_display")` to verify entity type before accessing
- The inner `TextDisplayDataHelper` class provides all text-specific properties and display settings

