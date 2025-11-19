# CustomClickEvent

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.access.CustomClickEvent`

**Extends:** `net.minecraft.text.ClickEvent`

**Since:** JsMacros 1.3.0

The `CustomClickEvent` class is a specialized click event that extends Minecraft's `ClickEvent` to allow custom JavaScript functions to be executed when text components are clicked. This enables interactive chat messages, GUI text elements, and other clickable text that can trigger any custom script functionality, making it possible to create dynamic user interfaces and interactive chat systems.

## Overview

The `CustomClickEvent` class provides a way to bind JavaScript functions to clickable text in Minecraft. Unlike standard Minecraft click events that are limited to predefined actions like opening URLs or running commands, `CustomClickEvent` allows you to execute any custom JavaScript code when the text is clicked. This makes it particularly useful for:

- Creating interactive chat messages with custom actions
- Building script-controlled GUI elements with clickable text
- Implementing custom command systems through text interfaces
- Adding dynamic functionality to HUD elements and overlays
- Creating script-driven menus and navigation systems

## Constructors

### `new CustomClickEvent(event)`
Creates a new `CustomClickEvent` with a custom JavaScript function to execute when clicked.

**Parameters:**
| Parameter | Type      | Description                              |
| --------- | --------- | ---------------------------------------- |
| event     | Runnable  | The JavaScript function to execute when the text is clicked |

**Example:**
```javascript
// Create a custom click event that shows a message
const clickEvent = new CustomClickEvent(() => {
    Chat.log("Text was clicked!");
});
```

## Fields

### `event`
The JavaScript function that will be executed when the text is clicked.

**Type:** `Runnable`

**Example:**
```javascript
const clickEvent = new CustomClickEvent(() => {
    Chat.log("Hello from click event!");
});

// Access the underlying function
const func = clickEvent.event;
func(); // Execute the function manually
```

## Methods

### `getEvent()`
Returns the JavaScript function associated with this click event.

**Returns:** `Runnable` - The function that will be executed when the text is clicked

**Example:**
```javascript
const clickEvent = new CustomClickEvent(() => {
    Chat.log("Custom action executed!");
});

const func = clickEvent.getEvent();
if (func) {
    Chat.log("Click event has an associated function");
}
```

### `hashCode()`
Returns a hash code value for this click event, based on the underlying function.

**Returns:** `int` - Hash code value

**Example:**
```javascript
const clickEvent = new CustomClickEvent(() => {});
const hash = clickEvent.hashCode();
Chat.log(`Click event hash code: ${hash}`);
```

## Usage Examples

### Basic Custom Click Event
```javascript
// Create a text component with a custom click event
const text = Chat.createTextBuilder()
    .append("Click me for a surprise! ")
    .withCustomClickEvent(() => {
        Chat.log("Surprise! You clicked the text!");
        World.playSound("minecraft:entity.player.levelup", 1.0, 1.0);
    })
    .build();

Chat.log(text);
```

### Interactive Chat Menu
```javascript
function createInteractiveMenu() {
    const menuText = Chat.createTextBuilder()
        .append("=== Script Menu ===\n")
        .append("[")
        .append("Teleport to Spawn").withColor(0x00FF00).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            if (player) {
                Chat.say("/spawn");
            }
        })
        .append("] [")
        .append("Check Health").withColor(0x00FFFF).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            if (player) {
                const health = player.getHealth();
                const maxHealth = player.getMaxHealth();
                Chat.log(`Health: ${health.toFixed(1)}/${maxHealth.toFixed(1)}`);
            }
        })
        .append("] [")
        .append("Get Coordinates").withColor(0xFF00FF).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            if (player) {
                const pos = player.getPos();
                Chat.log(`Position: X=${Math.floor(pos.x)}, Y=${Math.floor(pos.y)}, Z=${Math.floor(pos.z)}`);
            }
        })
        .append("]")
        .build();

    return menuText;
}

// Display the interactive menu
Chat.log(createInteractiveMenu());
```

### Dynamic Information Display
```javascript
function createStatusDisplay() {
    const statusText = Chat.createTextBuilder()
        .append("World Status: ")
        .append("[Refresh]").withColor(0xAAAAFF).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            const worldTime = World.getTimeOfDay();
            const dayTime = worldTime % 24000;
            const hours = Math.floor(dayTime / 1000);
            const minutes = Math.floor((dayTime % 1000) * 60 / 1000);

            const dimension = World.getDimension();
            const difficulty = World.getDifficulty();
            const biome = World.getBiome();

            Chat.log(`&6=== World Information ===`);
            Chat.log(`&7Time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
            Chat.log(`&7Dimension: ${dimension}`);
            Chat.log(`&7Difficulty: ${difficulty}`);
            Chat.log(`&7Biome: ${biome}`);

            // Show nearby entities count
            const entities = World.getEntities(32);
            Chat.log(`&7Nearby entities: ${entities.size()}`);
        })
        .build();

    return statusText;
}

Chat.log(createStatusDisplay());
```

### Inventory Management Interface
```javascript
function createInventoryManager() {
    const invText = Chat.createTextBuilder()
        .append("Inventory Manager: ")
        .append("[Sort Hotbar]").withColor(0xFFAA00).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            if (player && player.getInventory()) {
                const hotbar = player.getInventory().getHotbarItems();
                // Sort logic here would depend on available inventory methods
                Chat.log("Hotbar sorting not implemented in this example");
            }
        })
        .append(" ")
        .append("[Count Items]").withColor(0x00AAFF).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            if (player && player.getInventory()) {
                const items = player.getInventory().getItems();
                let totalCount = 0;
                let uniqueTypes = new Set();

                for (const item of items) {
                    if (item && !item.isEmpty()) {
                        totalCount += item.getCount();
                        uniqueTypes.add(item.getItemId());
                    }
                }

                Chat.log(`Inventory: ${totalCount} total items, ${uniqueTypes.size} unique types`);
            }
        })
        .build();

    return invText;
}

Chat.log(createInventoryManager());
```

### HUD Integration with Click Events
```javascript
// This example shows how CustomClickEvent can be used in HUD elements
let hudText = null;

function createClickableHUD() {
    const hudBuilder = Hud.createDraw2D();

    // Create clickable text for HUD
    const clickableText = Chat.createTextBuilder()
        .append("[Show Position]").withColor(0x00FF00).withCustomClickEvent(() => {
            const player = Player.getPlayer();
            if (player) {
                const pos = player.getPos();
                Chat.actionbar(`&7Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`);
            }
        })
        .append(" ")
        .append("[Toggle Info]").withColor(0xFFFF00).withCustomClickEvent(() => {
            // Toggle some information display
            showInfo = !showInfo;
            Chat.actionbar(showInfo ? "&aInfo enabled" : "&cInfo disabled");
        })
        .build();

    // Store for later use
    hudText = clickableText;

    return hudBuilder;
}

// Usage in a tick event
let showInfo = false;
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    // You could display the clickable text in a HUD overlay here
    // The exact implementation would depend on the HUD system
}));
```

### Script Control Interface
```javascript
function createScriptControlInterface() {
    const controlText = Chat.createTextBuilder()
        .append("Script Controls: ")
        .append("[Pause]").withColor(0xFF0000).withCustomClickEvent(() => {
            // Toggle script pause state
            isPaused = !isPaused;
            Chat.log(isPaused ? "&cScript paused" : "&aScript resumed");
        })
        .append(" ")
        .append("[Stats]").withColor(0x00FF00).withCustomClickEvent(() => {
            // Show script statistics
            const uptime = JsMacros.getScriptRunTime();
            const memoryUsed = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
            const memoryMB = Math.round(memoryUsed / (1024 * 1024));

            Chat.log(`&6=== Script Statistics ===`);
            Chat.log(`&7Uptime: ${Math.round(uptime / 1000)}s`);
            Chat.log(`&7Memory usage: ${memoryMB} MB`);
            Chat.log(`&7Available processors: ${Runtime.getRuntime().availableProcessors()}`);
        })
        .append(" ")
        .append("[Reload]").withColor(0x0088FF).withCustomClickEvent(() => {
            Chat.log("&6Reloading script configuration...");
            // Reload configuration logic
        })
        .build();

    return controlText;
}

Chat.log(createScriptControlInterface());
```

## Integration with TextBuilder

The most common way to use `CustomClickEvent` is through the `TextBuilder.withCustomClickEvent()` method:

```javascript
const text = Chat.createTextBuilder()
    .append("Click here")
    .withCustomClickEvent(() => {
        // Your custom code here
        Chat.log("Text was clicked!");
    })
    .build();
```

This method automatically wraps your JavaScript function in a `CustomClickEvent` and handles error logging.

## Error Handling

Custom click events automatically handle errors and log them through the JSMacros error system:

```javascript
const text = Chat.createTextBuilder()
    .append("Click for error test")
    .withCustomClickEvent(() => {
        // This error will be caught and logged
        nonExistentFunction();
    })
    .build();

Chat.log(text);
```

## Important Notes

1. **Security:** Be cautious when executing code from click events, especially if the text content comes from external sources.

2. **Performance:** Complex operations in click events can cause temporary lag. Keep click event handlers simple and efficient.

3. **Context:** Click events execute in the script context where they were created, with access to all global variables and JSMacros APIs.

4. **Thread Safety:** Click events are executed on the main thread, so avoid blocking operations.

5. **Error Logging:** Errors in click event functions are automatically caught and logged through JSMacros' error system.

6. **Serialization:** `CustomClickEvent` objects cannot be serialized like standard Minecraft click events.

7. **Compatibility:** These events only work with JSMacros-enhanced text components and won't function in vanilla Minecraft clients.

## Comparison with Standard Click Events

| Feature | Standard ClickEvent | CustomClickEvent |
|---------|-------------------|------------------|
| Open URLs | ✅ | ❌ |
| Run Commands | ✅ | ❌ |
| Suggest Commands | ✅ | ❌ |
| Copy to Clipboard | ✅ | ❌ |
| Custom JavaScript | ❌ | ✅ |
| Access JSMacros API | ❌ | ✅ |
| Cross-client Compatibility | ✅ | ❌ |

## Related Classes

- `TextBuilder` - Used to create text with custom click events
- `StyleHelper` - Helper class that can detect and work with custom click events
- `ClickEvent` - Base Minecraft click event class
- `Runnable` - Interface for executable functions

## Version History

- **1.3.0:** Initial release with basic custom click event functionality
- **Current:** Enhanced error handling and TextBuilder integration

## Advanced Usage Patterns

### State Management with Click Events
```javascript
let clickCount = 0;

function createCounter() {
    const counterText = Chat.createTextBuilder()
        .append(`Click count: ${clickCount} `)
        .append("[+1]").withColor(0x00FF00).withCustomClickEvent(() => {
            clickCount++;
            Chat.log(`Click count is now: ${clickCount}`);
        })
        .append(" ")
        .append("[Reset]").withColor(0xFF0000).withCustomClickEvent(() => {
            clickCount = 0;
            Chat.log("Click count reset to 0");
        })
        .build();

    return counterText;
}

Chat.log(createCounter());
```

### Parameterized Click Events
```javascript
function createParameterizedButtons() {
    const buttons = Chat.createTextBuilder();

    const locations = [
        { name: "Spawn", command: "/spawn" },
        { name: "Home", command: "/home" },
        { name: "Shop", command: "/warp shop" }
    ];

    buttons.append("Quick Travel: ");

    locations.forEach((loc, index) => {
        if (index > 0) buttons.append(" ");

        buttons.append(`[${loc.name}]`)
            .withColor(0x00AAFF)
            .withCustomClickEvent(() => {
                Chat.say(loc.command);
            });
    });

    return buttons.build();
}

Chat.log(createParameterizedButtons());
```

The `CustomClickEvent` class provides a powerful way to create interactive text elements that can execute custom JavaScript functionality, enabling rich user interfaces and interactive chat systems within JSMacros scripts.