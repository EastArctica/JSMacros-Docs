# BossBarHelper

## Overview

The `BossBarHelper` class is a World Interaction helper in JsMacros that provides access to Minecraft boss bar information. It allows scripts to inspect boss bar properties including names, progress percentages, colors, and styles. This is particularly useful for monitoring boss fights, health displays, and custom progress indicators that use Minecraft's boss bar system.

This class wraps around Minecraft's boss bar system and provides a scripting-friendly interface for interacting with boss bars that are currently displayed on the player's screen.

**Since:** JsMacros 1.2.1
**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity`

## Accessing BossBarHelper

BossBarHelper instances are typically obtained through:

1. **From BossBar Events** - Bossbar events provide BossBarHelper objects directly
2. **From World Methods** - Using `World.getBossBars()` to get all active boss bars
3. **Through Java Utils** - Using conversion utilities when working with raw boss bar objects

```javascript
// Example from Bossbar event
event.on("Bossbar", (event) => {
    if (event.bossBar) {
        const bossBar = event.bossBar;
        console.log(`Boss bar update: ${bossBar.getName().getString()}`);
    }
});

// Example from World.getBossBars()
const bossBars = World.getBossBars();
for (const [uuid, bossBar] of bossBars) {
    console.log(`Boss bar ${uuid}: ${bossBar.getName().getString()}`);
}
```

## Methods

### getUUID()

Returns the unique identifier (UUID) for this boss bar.

**Returns:** `String` - The UUID as a string

**Since:** 1.2.1

```javascript
const bossBar = event.bossBar;
const uuid = bossBar.getUUID();
console.log(`Boss bar UUID: ${uuid}`);

// Use UUID to track specific boss bars
if (uuid === "12345678-1234-1234-1234-123456789abc") {
    console.log("This is the ender dragon boss bar!");
}
```

### getPercent()

Returns the current progress percentage of the boss bar.

**Returns:** `float` - Progress value from 0.0 to 1.0 (where 1.0 = 100%)

**Since:** 1.2.1

```javascript
const bossBar = event.bossBar;
const percent = bossBar.getPercent();
const percentDisplay = (percent * 100).toFixed(1);

console.log(`Boss bar progress: ${percentDisplay}%`);

// Example: Alert when boss is below certain health
if (percent < 0.25) {
    console.log("WARNING: Boss is below 25% health!");
}
```

### getColor()

Returns the color name of the boss bar.

**Returns:** `String` - Color name (uppercase, e.g., "PINK", "BLUE", "RED", "GREEN", "YELLOW", "PURPLE", "WHITE")

**Since:** 1.2.1

```javascript
const bossBar = event.bossBar;
const color = bossBar.getColor();
console.log(`Boss bar color: ${color}`);

// React to different boss bar colors
switch (color) {
    case "RED":
        console.log("This appears to be an aggressive boss");
        break;
    case "BLUE":
        console.log("This might be a water-related boss");
        break;
    case "GREEN":
        console.log("This could be a nature-themed boss");
        break;
}
```

### getStyle()

Returns the visual style of the boss bar.

**Returns:** `String` - Style name (uppercase, e.g., "PROGRESS", "NOTCHED_6", "NOTCHED_10", "NOTCHED_12", "NOTCHED_20")

**Since:** 1.2.1

```javascript
const bossBar = event.bossBar;
const style = bossBar.getStyle();
console.log(`Boss bar style: ${style}`);

// Handle different bar styles
if (style === "NOTCHED_6") {
    console.log("This boss bar shows 6 segments");
} else if (style === "NOTCHED_20") {
    console.log("This boss bar shows 20 segments (detailed progress)");
} else if (style === "PROGRESS") {
    console.log("This is a solid progress bar");
}
```

### getColorValue()

Returns the numeric color value of the boss bar.

**Returns:** `int` - RGB color value, or -1 if the color doesn't have a specific value

**Since:** 1.8.4

```javascript
const bossBar = event.bossBar;
const colorValue = bossBar.getColorValue();

if (colorValue !== -1) {
    console.log(`Boss bar RGB color: ${colorValue}`);
    console.log(`Hex color: #${colorValue.toString(16).padStart(6, '0')}`);
} else {
    console.log("Boss bar color doesn't have a specific RGB value");
}
```

### getColorFormat()

Returns a FormattingHelper object representing the color format of the boss bar.

**Returns:** `FormattingHelper` - Object containing formatting information for the boss bar color

**Since:** 1.8.4

```javascript
const bossBar = event.bossBar;
const colorFormat = bossBar.getColorFormat();

// Get formatting details
console.log(`Color format: ${colorFormat.getName()}`);
console.log(`Color code: ${colorFormat.getCode()}`);

// Use the format for text styling
const formattedText = colorFormat.format("Boss Fight!");
console.log(formattedText); // Will appear in boss bar color
```

### getName()

Returns the display name of the boss bar.

**Returns:** `TextHelper` - Object containing the boss bar's title/name text

**Since:** 1.2.1

```javascript
const bossBar = event.bossBar;
const name = bossBar.getName();
const nameString = name.getString();

console.log(`Boss bar name: ${nameString}`);

// Check for specific boss names
if (nameString.toLowerCase().includes("ender dragon")) {
    console.log("Ender Dragon boss bar detected!");
} else if (nameString.toLowerCase().includes("wither")) {
    console.log("Wither boss bar detected!");
}

// Get JSON representation
const nameJson = name.getJson();
console.log("Boss bar name JSON:", nameJson);
```

### toString()

Returns a string representation of this boss bar helper.

**Returns:** `String` - String in format "BossBarHelper:{\"name:\": \"<name>\", \"percent\": <percent>}"

**Since:** 1.2.1

```javascript
const bossBar = event.bossBar;
console.log(bossBar.toString());
// Example output: BossBarHelper:{"name:": "Ender Dragon", "percent": 0.750000}
```

## Usage Examples

### Example 1: Boss Bar Monitor

```javascript
// Monitor all active boss bars
function monitorBossBars() {
    const bossBars = World.getBossBars();

    if (bossBars.size === 0) {
        console.log("No active boss bars");
        return;
    }

    console.log(`Found ${bossBars.size} active boss bar(s):`);

    for (const [uuid, bossBar] of bossBars) {
        const name = bossBar.getName().getString();
        const percent = (bossBar.getPercent() * 100).toFixed(1);
        const color = bossBar.getColor();
        const style = bossBar.getStyle();

        console.log(`- ${name}: ${percent}% (${color}, ${style})`);

        // Alert on low health
        if (bossBar.getPercent() < 0.3) {
            console.log(`⚠️ ${name} is critically low health!`);
        }
    }
}

// Call periodically (e.g., every 5 seconds)
js.setInterval(monitorBossBars, 5000);
```

### Example 2: Boss Bar Event Handler

```javascript
// Handle boss bar updates
event.on("Bossbar", (event) => {
    if (!event.bossBar) {
        console.log(`Boss bar removed: ${event.uuid}`);
        return;
    }

    const bossBar = event.bossBar;
    const name = bossBar.getName().getString();
    const percent = (bossBar.getPercent() * 100).toFixed(1);

    console.log(`Boss bar update [${event.type}]: ${name} at ${percent}%`);

    switch (event.type) {
        case "ADD":
            console.log(`🆕 New boss bar: ${name}`);
            break;
        case "REMOVE":
            console.log(`❌ Boss bar removed: ${name}`);
            break;
        case "UPDATE_PERCENT":
            console.log(`📊 ${name} health: ${percent}%`);
            break;
        case "UPDATE_NAME":
            console.log(`📝 Boss bar renamed to: ${name}`);
            break;
    }

    // Special handling for ender dragon
    if (name.toLowerCase().includes("ender dragon")) {
        handleEnderDragonFight(bossBar, event.type);
    }
});

function handleEnderDragonFight(bossBar, updateType) {
    const percent = bossBar.getPercent();

    if (updateType === "UPDATE_PERCENT") {
        if (percent < 0.5 && !global.dragonHalfHealthAlerted) {
            console.log("🐉 Ender Dragon is below 50% health!");
            global.dragonHalfHealthAlerted = true;
        } else if (percent >= 0.5) {
            global.dragonHalfHealthAlerted = false;
        }
    }
}
```

### Example 3: Boss Bar Progress Tracker

```javascript
// Track boss bar progress over time
class BossBarTracker {
    constructor() {
        this.bossData = new Map();
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        event.on("Bossbar", (event) => this.handleBossBarUpdate(event));
    }

    handleBossBarUpdate(event) {
        if (!event.bossBar) {
            // Boss bar removed
            this.bossData.delete(event.uuid);
            return;
        }

        const bossBar = event.bossBar;
        const uuid = bossBar.getUUID();
        const name = bossBar.getName().getString();
        const currentPercent = bossBar.getPercent();

        if (!this.bossData.has(uuid)) {
            // New boss bar
            this.bossData.set(uuid, {
                name: name,
                startPercent: currentPercent,
                currentPercent: currentPercent,
                lowestPercent: currentPercent,
                startTime: Date.now()
            });
            console.log(`Started tracking: ${name} at ${(currentPercent * 100).toFixed(1)}%`);
        } else {
            // Update existing boss bar data
            const data = this.bossData.get(uuid);
            data.currentPercent = currentPercent;

            if (currentPercent < data.lowestPercent) {
                data.lowestPercent = currentPercent;
                console.log(`${name} reached new low: ${(currentPercent * 100).toFixed(1)}%`);
            }
        }
    }

    getBossReport() {
        const reports = [];

        for (const [uuid, data] of this.bossData) {
            const duration = Date.now() - data.startTime;
            const durationMinutes = (duration / 60000).toFixed(1);

            reports.push({
                name: data.name,
                currentHealth: (data.currentPercent * 100).toFixed(1),
                startHealth: (data.startPercent * 100).toFixed(1),
                lowestHealth: (data.lowestPercent * 100).toFixed(1),
                duration: durationMinutes
            });
        }

        return reports;
    }

    printReport() {
        const reports = this.getBossReport();

        if (reports.length === 0) {
            console.log("No boss bars being tracked");
            return;
        }

        console.log("=== Boss Bar Tracking Report ===");
        reports.forEach(report => {
            console.log(`Boss: ${report.name}`);
            console.log(`  Current: ${report.currentHealth}%`);
            console.log(`  Started: ${report.startHealth}%`);
            console.log(`  Lowest: ${report.lowestHealth}%`);
            console.log(`  Duration: ${report.duration} minutes`);
            console.log("");
        });
    }
}

// Create and use the tracker
const tracker = new BossBarTracker();

// Print report every 30 seconds
js.setInterval(() => tracker.printReport(), 30000);
```

### Example 4: Boss Bar Color and Style Analysis

```javascript
// Analyze boss bar visual properties
function analyzeBossBarAppearance(bossBar) {
    const name = bossBar.getName().getString();
    const color = bossBar.getColor();
    const style = bossBar.getStyle();
    const colorValue = bossBar.getColorValue();
    const colorFormat = bossBar.getColorFormat();

    console.log(`📊 Analyzing boss bar: ${name}`);
    console.log(`  Color: ${color}`);
    console.log(`  Style: ${style}`);
    console.log(`  RGB Value: ${colorValue}`);
    console.log(`  Color Code: ${colorFormat.getCode()}`);

    // Determine boss type based on appearance
    const bossType = determineBossType(color, style);
    console.log(`  Likely boss type: ${bossType}`);

    return {
        name: name,
        color: color,
        style: style,
        colorValue: colorValue,
        bossType: bossType
    };
}

function determineBossType(color, style) {
    // Simple heuristics for boss identification
    if (color === "PINK" && style === "PROGRESS") {
        return "Vanilla Boss (likely Ender Dragon)";
    } else if (color === "PURPLE" && style.includes("NOTCHED")) {
        return "Modded Boss or Special Event";
    } else if (color === "WHITE" && style === "NOTCHED_6") {
        return "Wither Boss";
    } else if (color === "GREEN") {
        return "Nature or Plant-themed Boss";
    } else if (color === "BLUE") {
        return "Water or Ice-themed Boss";
    } else {
        return "Unknown or Custom Boss";
    }
}

// Usage example
event.on("Bossbar", (event) => {
    if (event.bossBar && event.type === "ADD") {
        const analysis = analyzeBossBarAppearance(event.bossBar);

        // Store analysis for later reference
        global.lastBossAnalysis = analysis;
    }
});
```

### Example 5: Boss Bar Notifications

```javascript
// Create notifications for important boss bar events
class BossBarNotifier {
    constructor() {
        this.notifications = [];
        this.setupEvents();
    }

    setupEvents() {
        event.on("Bossbar", (event) => this.handleBossBarEvent(event));
    }

    handleBossBarEvent(event) {
        if (!event.bossBar) return;

        const bossBar = event.bossBar;
        const name = bossBar.getName().getString();
        const percent = bossBar.getPercent();

        switch (event.type) {
            case "ADD":
                this.notifyBossSpawn(name, bossBar);
                break;
            case "UPDATE_PERCENT":
                this.checkHealthThresholds(name, percent);
                break;
            case "REMOVE":
                this.notifyBossDefeated(name);
                break;
        }
    }

    notifyBossSpawn(name, bossBar) {
        const color = bossBar.getColor();
        const message = `🎯 ${name} appeared! (${color})`;

        console.log(message);
        this.addNotification(message, "boss_spawn");

        // Special notifications for important bosses
        if (name.toLowerCase().includes("ender dragon")) {
            console.log("🐉 The Ender Dragon has spawned!");
        } else if (name.toLowerCase().includes("wither")) {
            console.log("💀 The Wither has been summoned!");
        }
    }

    checkHealthThresholds(name, percent) {
        const thresholds = [0.75, 0.5, 0.25, 0.1];

        for (const threshold of thresholds) {
            if (percent <= threshold && percent > threshold - 0.01) {
                const percentage = (threshold * 100).toFixed(0);
                const message = `⚠️ ${name} is at ${percentage}% health!`;

                console.log(message);
                this.addNotification(message, "health_warning");
                break; // Only notify once per update
            }
        }
    }

    notifyBossDefeated(name) {
        const message = `🎉 ${name} has been defeated!`;
        console.log(message);
        this.addNotification(message, "boss_defeated");
    }

    addNotification(message, type) {
        const notification = {
            message: message,
            type: type,
            timestamp: Date.now()
        };

        this.notifications.push(notification);

        // Keep only last 50 notifications
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(-50);
        }
    }

    getRecentNotifications(count = 10) {
        return this.notifications.slice(-count);
    }

    printNotifications() {
        const recent = this.getRecentNotifications();

        if (recent.length === 0) {
            console.log("No recent notifications");
            return;
        }

        console.log("=== Recent Boss Bar Notifications ===");
        recent.forEach(notif => {
            const time = new Date(notif.timestamp).toLocaleTimeString();
            console.log(`[${time}] ${notif.message}`);
        });
    }
}

// Create and use the notifier
const notifier = new BossBarNotifier();

// Print notifications every minute
js.setInterval(() => notifier.printNotifications(), 60000);
```

## Related Classes

### TextHelper

The `getName()` method returns a `TextHelper` object that provides additional text manipulation capabilities:

```javascript
const bossBar = event.bossBar;
const name = bossBar.getName();

// Get different text formats
const plainText = name.getString();
const jsonText = name.getJson();
const siblings = name.getSiblings();

// Check if text has formatting
if (name.getStyle().isBold()) {
    console.log("Boss bar name is bold!");
}

// Convert to string for logging
console.log("Boss bar name:", name.toString());
```

### FormattingHelper

The `getColorFormat()` method returns a `FormattingHelper` object for working with color formatting:

```javascript
const bossBar = event.bossBar;
const format = bossBar.getColorFormat();

// Get formatting information
console.log("Format name:", format.getName());     // e.g., "RED"
console.log("Format code:", format.getCode());     // e.g., "§c"
console.log("Is color:", format.isColor());        // true

// Apply formatting to other text
const formattedMessage = format.format("DANGER!");
console.log(formattedMessage); // Will appear in boss bar color
```

## Boss Bar Color and Style Reference

### Available Colors

Boss bars can have these colors (returned by `getColor()`):

- **PINK** - Pink color (vanilla boss bar default)
- **BLUE** - Blue color
- **RED** - Red color
- **GREEN** - Green color
- **YELLOW** - Yellow color
- **PURPLE** - Purple color
- **WHITE** - White color

### Available Styles

Boss bars can have these styles (returned by `getStyle()`):

- **PROGRESS** - Solid progress bar
- **NOTCHED_6** - Bar with 6 segments
- **NOTCHED_10** - Bar with 10 segments
- **NOTCHED_12** - Bar with 12 segments
- **NOTCHED_20** - Bar with 20 segments

### Boss Bar Update Types

In Bossbar events, the `type` field can be:

- **ADD** - New boss bar added
- **REMOVE** - Boss bar removed
- **UPDATE_PERCENT** - Progress percentage changed
- **UPDATE_NAME** - Name/text changed
- **UPDATE_STYLE** - Color or style changed
- **UPDATE_PROPERTIES** - Other properties changed

## Important Notes

1. **Client-Side Only:** BossBarHelper only provides access to boss bars displayed on the client. Server-side boss bars that aren't visible to the client won't be accessible.

2. **Event Timing:** Boss bar updates may not be instantaneous. There can be slight delays between server-side changes and client-side updates.

3. **Multiple Boss Bars:** Multiple boss bars can be active simultaneously. Use `getUUID()` to distinguish between them.

4. **Mod Compatibility:** Boss bars from mods may use custom colors and styles beyond the standard Minecraft values.

5. **Null Safety:** In Bossbar events, the `bossBar` field can be null for REMOVE events. Always check for null before accessing methods.

6. **Performance:** Boss bar data is lightweight and safe to access frequently. However, avoid calling `World.getBossBars()` in tight loops without caching.

7. **Text Formatting:** Boss bar names can contain Minecraft formatting codes and JSON text components. Use TextHelper methods for proper handling.

8. **Color Limitations:** Some colors may return -1 from `getColorValue()` if they don't have specific RGB equivalents in the current Minecraft version.

## Error Handling

```javascript
// Safe boss bar interaction
function safeBossBarCheck(bossBar) {
    try {
        if (!bossBar) {
            console.log("No boss bar provided");
            return;
        }

        const name = bossBar.getName().getString();
        const percent = bossBar.getPercent();
        const color = bossBar.getColor();

        console.log(`Boss Bar: ${name}`);
        console.log(`Health: ${(percent * 100).toFixed(1)}%`);
        console.log(`Color: ${color}`);

        // Validate percentage range
        if (percent < 0 || percent > 1) {
            console.warn("Invalid boss bar percentage detected");
        }

    } catch (error) {
        console.error("Error checking boss bar:", error.message);
    }
}

// Safe boss bar iteration
function safeBossBarIteration() {
    try {
        const bossBars = World.getBossBars();
        const count = bossBars.size();

        if (count === 0) {
            console.log("No active boss bars");
            return;
        }

        console.log(`Processing ${count} boss bar(s)`);

        for (const [uuid, bossBar] of bossBars) {
            safeBossBarCheck(bossBar);
        }

    } catch (error) {
        console.error("Error iterating boss bars:", error.message);
    }
}
```

## Thread Safety

All BossBarHelper methods are thread-safe and can be called from any JsMacros event handler or script. The underlying data is synchronized by Minecraft's client system, ensuring consistent access to boss bar information.