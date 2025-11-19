# LockButtonWidgetHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.LockButtonWidgetHelper`

**Extends:** `ClickableWidgetHelper<LockButtonWidgetHelper, LockButtonWidget>`

**Since:** `1.8.4`

The `LockButtonWidgetHelper` class is a specialized button widget in JSMacros that represents a lock button with toggle functionality. This button can be in one of two states: locked or unlocked, with visual feedback indicating the current state. Lock buttons are commonly used in custom screens for settings panels, security features, or configuration interfaces where users need to enable/disable functionality.

The helper provides methods to control the lock state and inherits all standard button functionality from `ClickableWidgetHelper`, including positioning, text management, click actions, and tooltips.

## Overview

The `LockButtonWidgetHelper` provides a complete lock button solution with:

- **Toggle Functionality**: Built-in locked/unlocked state management
- **Visual Feedback**: Different icons/appearances for locked and unlocked states
- **State Persistence**: The lock state can be programmatically controlled and queried
- **Full Button Features**: Inherits all standard button capabilities (positioning, actions, tooltips, etc.)
- **Builder Support**: Includes `LockButtonBuilder` for fluent widget creation
- **Screen Integration**: Works seamlessly with JSMacros custom screens

## Common Use Cases

- **Settings Locks**: Lock/unlock settings to prevent accidental changes
- **Feature Toggles**: Enable or disable mod features with visual feedback
- **Security Controls**: Lock sensitive areas or functionality
- **Configuration Panels**: Lock configuration until certain conditions are met
- **User Interface States**: Visual indicator of enabled/disabled functionality

## Constructors

### `new LockButtonWidgetHelper(button)`
Creates a new lock button helper from an existing Minecraft lock button widget.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| button | `LockButtonWidget` | The underlying Minecraft lock button widget |

**Example:**
```javascript
// Direct constructor usage (advanced)
const lockBtn = Hud.createScreen("Lock Demo", 200, 150);
const lockButtonHelper = new LockButtonWidgetHelper(existingLockButtonWidget);
```

### `new LockButtonWidgetHelper(button, zIndex)`
Creates a new lock button helper with a specific z-index for render ordering.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| button | `LockButtonWidget` | The underlying Minecraft lock button widget |
| zIndex | `int` | The z-index value for render ordering |

**Example:**
```javascript
// With z-index control
const lockButtonHelper = new LockButtonWidgetHelper(existingLockButtonWidget, 10);
```

## Methods

### Lock State Management

#### `isLocked()`
**Returns:** `boolean` - `true` if the button is currently locked, `false` otherwise

Gets the current lock state of the button.

**Example:**
```javascript
const currentState = lockButton.isLocked();
if (currentState) {
    Chat.log("Button is currently locked");
} else {
    Chat.log("Button is currently unlocked");
}
```

#### `setLocked(locked)`
**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| locked | `boolean` | `true` to lock the button, `false` to unlock it |

**Returns:** `LockButtonWidgetHelper` - Returns self for method chaining

Sets the lock state of the button and updates its visual appearance.

**Example:**
```javascript
// Lock the button
lockButton.setLocked(true);

// Unlock the button
lockButton.setLocked(false);

// Chain with other methods
lockButton.setLocked(true).setActive(false);
```

### Inherited Methods from ClickableWidgetHelper

The `LockButtonWidgetHelper` inherits all standard button functionality:

#### Position and Size
- `getX()` - Get x coordinate
- `getY()` - Get y coordinate
- `setPos(x, y)` - Set position (returns self for chaining)
- `getWidth()` - Get button width
- `getHeight()` - Get button height
- `setWidth(width)` - Set button width (returns self for chaining)

#### Text and Appearance
- `setLabel(text)` - Set button text (deprecated, use setLabel(String))
- `setLabel(text)` - Set button text from String
- `setLabel(textHelper)` - Set button text from TextHelper
- `getLabel()` - Get current button text as TextHelper

#### State Management
- `getActive()` - Get active/clickable state
- `setActive(active)` - Set active/clickable state (returns self for chaining)

#### Interaction
- `click()` - Programmatically click the button
- `click(await)` - Click the button with optional wait for completion

#### Tooltips
- `setTooltip(...tooltips)` - Set multiple tooltips (returns self for chaining)
- `addTooltip(tooltip)` - Add a single tooltip (returns self for chaining)
- `removeTooltip(index)` - Remove tooltip by index
- `removeTooltip(tooltip)` - Remove specific tooltip
- `getTooltips()` - Get list of current tooltips

## LockButtonBuilder Class

The `LockButtonBuilder` provides a fluent API for creating lock buttons with the builder pattern. This is the recommended way to create lock buttons.

### Creating a LockButtonBuilder

```javascript
// Create through a screen
const screen = Hud.createScreen("Settings", 300, 200);
const lockBuilder = screen.addLockButton();

// Or create directly
const builder = new LockButtonWidgetHelper.LockButtonBuilder(screen);
```

### LockButtonBuilder Methods

#### Lock State Configuration

##### `locked(locked)`
**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| locked | `boolean` | Initial lock state (`true` for locked, `false` for unlocked) |

**Returns:** `LockButtonBuilder`

Sets the initial lock state of the button when created.

**Example:**
```javascript
const lockedButton = screen.addLockButton()
    .pos(50, 50)
    .width(100)
    .message("Locked Setting")
    .locked(true)  // Start in locked state
    .build();
```

##### `isLocked()`
**Returns:** `boolean` - Current configured lock state

Gets the current configured lock state of the builder.

**Example:**
```javascript
const builder = screen.addLockButton().locked(true);
if (builder.isLocked()) {
    Chat.log("Button will start locked");
}
```

#### Action Configuration

##### `action(action)`
**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| action | `MethodWrapper<LockButtonWidgetHelper, IScreen, Object, ?> | null` | The action to execute when the button is clicked. Pass `null` to remove action. |

**Returns:** `LockButtonBuilder`

Sets the click action for the lock button. The action receives the lock button helper and screen as parameters.

**Example:**
```javascript
const lockButton = screen.addLockButton()
    .pos(50, 50)
    .width(150)
    .message("Auto-Save")
    .action((lockBtn, currentScreen) => {
        const currentState = lockBtn.isLocked();
        const newState = !currentState;

        lockBtn.setLocked(newState);

        if (newState) {
            Chat.log("Auto-save: ENABLED");
        } else {
            Chat.log("Auto-save: DISABLED");
        }
    })
    .build();
```

##### `getAction()`
**Returns:** `MethodWrapper<LockButtonWidgetHelper, IScreen, Object, ?> | null`

Gets the currently configured action for the builder.

**Example:**
```javascript
const builder = screen.addLockButton()
    .action((btn, screen) => Chat.log("Clicked!"));

const action = builder.getAction();
if (action) {
    Chat.log("Button has an action configured");
}
```

#### Inherited Builder Methods

The `LockButtonBuilder` inherits all methods from `AbstractWidgetBuilder`:

- `x(int x)` - Set x position
- `y(int y)` - Set y position
- `pos(int x, int y)` - Set position
- `width(int width)` - Set width
- `height(int height)` - Set height
- `message(String message)` - Set button text
- `message(TextHelper message)` - Set button text from TextHelper
- `alpha(double alpha)` - Set transparency (0.0 to 1.0)
- `active(boolean active)` - Set active state
- `visible(boolean visible)` - Set visibility
- `zIndex(int zIndex)` - Set render order
- `build()` - Create the lock button widget

## Usage Examples

### Example 1: Basic Lock Button

```javascript
// Create a simple lock button
const screen = Hud.createScreen("Basic Lock Demo", 250, 150);

const lockButton = screen.addLockButton()
    .pos(50, 50)
    .width(150)
    .message("Lock Settings")
    .locked(false) // Start unlocked
    .action((lockBtn, currentScreen) => {
        // Toggle lock state
        const currentState = lockBtn.isLocked();
        const newState = !currentState;
        lockBtn.setLocked(newState);

        Chat.log(`Settings ${newState ? 'LOCKED' : 'UNLOCKED'}`);
    })
    .build();

screen.open();
```

### Example 2: Settings Panel with Multiple Locks

```javascript
// Create a settings panel with multiple lockable options
const screen = Hud.createScreen("Settings Panel", 350, 250);

// Auto-save lock
const autoSaveLock = screen.addLockButton()
    .pos(20, 30)
    .width(120)
    .message("Auto-Save")
    .locked(true)
    .action((lockBtn, scr) => {
        lockBtn.setLocked(!lockBtn.isLocked());
        Chat.log(`Auto-Save ${lockBtn.isLocked() ? 'ENABLED' : 'DISABLED'}`);
    })
    .build();

// Chat lock
const chatLock = screen.addLockButton()
    .pos(20, 60)
    .width(120)
    .message("Chat Filter")
    .locked(false)
    .action((lockBtn, scr) => {
        lockBtn.setLocked(!lockBtn.isLocked());
        Chat.log(`Chat Filter ${lockBtn.isLocked() ? 'ACTIVE' : 'INACTIVE'}`);
    })
    .build();

// Movement lock
const movementLock = screen.addLockButton()
    .pos(20, 90)
    .width(120)
    .message("Free Movement")
    .locked(false)
    .action((lockBtn, scr) => {
        lockBtn.setLocked(!lockBtn.isLocked());
        Chat.log(`Movement ${lockBtn.isLocked() ? 'RESTRICTED' : 'FREE'}`);
    })
    .build();

// Add status display
screen.addText("Settings Status")
    .pos(170, 30)
    .build();

screen.open();
```

### Example 3: Security Lock System

```javascript
// Create a security lock system
let securityLevel = 0; // 0: unlocked, 1: partial, 2: full
const screen = Hud.createScreen("Security System", 300, 200);

// Master lock button
const masterLock = screen.addLockButton()
    .pos(100, 50)
    .width(100)
    .message("Master Lock")
    .locked(false)
    .action((lockBtn, scr) => {
        securityLevel = (securityLevel + 1) % 3;

        if (securityLevel === 0) {
            lockBtn.setLocked(false);
            secondaryLock.setLocked(false);
            Chat.log("Security: DISABLED");
        } else if (securityLevel === 1) {
            lockBtn.setLocked(false);
            secondaryLock.setLocked(true);
            Chat.log("Security: PARTIAL");
        } else {
            lockBtn.setLocked(true);
            secondaryLock.setLocked(true);
            Chat.log("Security: FULL");
        }
    })
    .build();

// Secondary lock
const secondaryLock = screen.addLockButton()
    .pos(100, 80)
    .width(100)
    .message("Secondary")
    .locked(false)
    .action((lockBtn, scr) => {
        if (securityLevel === 0) {
            Chat.log("Enable master lock first!");
        } else if (securityLevel === 1) {
            lockBtn.setLocked(!lockBtn.isLocked());
            Chat.log(`Secondary ${lockBtn.isLocked() ? 'LOCKED' : 'UNLOCKED'}`);
        } else {
            Chat.log("Master lock overrides secondary lock!");
        }
    })
    .build();

// Status display
const statusText = screen.addText("Security Level: 0")
    .pos(100, 120)
    .build();

screen.open();
```

### Example 4: Conditional Lock System

```javascript
// Lock that only activates under certain conditions
const screen = Hud.createScreen("Conditional Lock", 300, 200);

const conditionalLock = screen.addLockButton()
    .pos(50, 50)
    .width(200)
    .message("Feature Lock")
    .locked(false)
    .action((lockBtn, currentScreen) => {
        const player = Player.getPlayer();

        if (!player) {
            Chat.log("Cannot toggle: Player not found");
            return;
        }

        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const healthPercent = health / maxHealth;

        // Only allow locking if player has sufficient health
        if (healthPercent >= 0.5) {
            const newLockedState = !lockBtn.isLocked();
            lockBtn.setLocked(newLockedState);

            Chat.log(`Feature ${newLockedState ? 'LOCKED' : 'UNLOCKED'}`);
        } else {
            Chat.log("Need at least 50% health to use this feature!");
        }
    })
    .build();

// Check health button
screen.addButton()
    .pos(50, 80)
    .width(200)
    .message("Check Requirements")
    .action((btn, currentScreen) => {
        const player = Player.getPlayer();
        if (player) {
            const healthPercent = (player.getHealth() / player.getMaxHealth()) * 100;
            Chat.log(`Health: ${Math.floor(healthPercent)}%`);
            Chat.log(`Can use feature: ${healthPercent >= 50 ? 'YES' : 'NO'}`);
        }
    })
    .build();

screen.open();
```

### Example 5: Lock State Persistence

```javascript
// Lock system that remembers state across screen openings
let persistentLockState = false;

function createPersistentLockScreen() {
    const screen = Hud.createScreen("Persistent Lock", 250, 150);

    const lockButton = screen.addLockButton()
        .pos(50, 50)
        .width(150)
        .message("Persistent Lock")
        .locked(persistentLockState) // Restore previous state
        .action((lockBtn, currentScreen) => {
            const newState = !lockBtn.isLocked();
            lockBtn.setLocked(newState);
            persistentLockState = newState; // Save state

            Chat.log(`Lock state saved: ${newState ? 'LOCKED' : 'UNLOCKED'}`);
        })
        .build();

    // Show current state
    screen.addText(`Current State: ${persistentLockState ? 'LOCKED' : 'UNLOCKED'}`)
        .pos(50, 80)
        .build();

    return screen;
}

// Create and open the screen
const screen = createPersistentLockScreen();
screen.open();
```

### Example 6: Lock Button with Tooltips

```javascript
// Lock button with helpful tooltips
const screen = Hud.createScreen("Advanced Lock", 300, 200);

const advancedLock = screen.addLockButton()
    .pos(75, 50)
    .width(150)
    .message("Advanced Settings")
    .locked(false)
    .action((lockBtn, currentScreen) => {
        lockBtn.setLocked(!lockBtn.isLocked());
        const state = lockBtn.isLocked();
        Chat.log(`Advanced settings ${state ? 'SECURED' : 'AVAILABLE'}`);
    })
    .build();

// Add tooltips to the lock button
advancedLock.setTooltip(
    "Click to toggle lock state",
    "Locked: Settings are protected",
    "Unlocked: Settings can be modified",
    "Current status: " + (advancedLock.isLocked() ? "LOCKED" : "UNLOCKED")
);

// Update tooltip when state changes
advancedLock.action = (lockBtn, currentScreen) => {
    const newState = !lockBtn.isLocked();
    lockBtn.setLocked(newState);

    // Update tooltips based on new state
    lockBtn.setTooltip(
        "Click to toggle lock state",
        newState ? "Settings are currently PROTECTED" : "Settings are currently AVAILABLE",
        "Current status: " + (newState ? "LOCKED" : "UNLOCKED")
    );

    Chat.log(`Advanced settings ${newState ? 'SECURED' : 'AVAILABLE'}`);
};

screen.open();
```

### Example 7: Lock Button Group Management

```javascript
// System for managing multiple related lock buttons
const screen = Hud.createScreen("Lock Management", 350, 250);

// Lock buttons group
const lockButtons = [];
const settings = ["Chat", "Inventory", "Movement", "Interactions"];

// Create lock buttons for each setting
settings.forEach((setting, index) => {
    const lockBtn = screen.addLockButton()
        .pos(20, 30 + (index * 30))
        .width(100)
        .message(setting)
        .locked(false)
        .action((btn, scr) => {
            btn.setLocked(!btn.isLocked());
            updateLockStatus();
        })
        .build();

    lockButtons.push(lockBtn);
});

// Master control button
const masterBtn = screen.addButton()
    .pos(150, 30)
    .width(100)
    .message("Lock All")
    .action((btn, scr) => {
        const allLocked = lockButtons.every(lockBtn => lockBtn.isLocked());

        lockButtons.forEach(lockBtn => {
            lockBtn.setLocked(!allLocked);
        });

        btn.setLabel(allLocked ? "Unlock All" : "Lock All");
        updateLockStatus();
    })
    .build();

// Status display function
function updateLockStatus() {
    const lockedCount = lockButtons.filter(lockBtn => lockBtn.isLocked()).length;
    Chat.log(`${lockedCount}/${lockButtons.length} settings locked`);
}

screen.open();
```

## Best Practices

## Error Handling

The lock button system includes automatic error handling for actions:

```javascript
const safeLock = screen.addLockButton()
    .pos(50, 50)
    .width(150)
    .message("Safe Lock")
    .action((lockBtn, scr) => {
        try {
            // Potentially problematic code
            const result = someRiskyOperation();
            lockBtn.setLocked(result);
        } catch (e) {
            Chat.log("Lock operation failed: " + e.message);
            // Button remains functional despite errors
        }
    })
    .build();
```

## Performance Considerations

1. **State Updates**: Lock state changes are lightweight operations
2. **Visual Updates**: The button's appearance updates automatically
3. **Memory Usage**: Lock buttons have minimal memory overhead
4. **Batch Operations**: For multiple lock buttons, consider batch state updates

## Integration with Other Widgets

Lock buttons work well with other UI elements:

```javascript
// Combine with text displays for status
const statusText = screen.addText("Status: Unlocked")
    .pos(50, 100)
    .build();

lockBtn.action = (btn, scr) => {
    btn.setLocked(!btn.isLocked());
    statusText.setMessage("Status: " + (btn.isLocked() ? "Locked" : "Unlocked"));
};
```

## Related Classes

- `ClickableWidgetHelper` - Parent class providing standard button functionality
- `LockButtonWidget` - The underlying Minecraft lock button widget
- `AbstractWidgetBuilder` - Base class for the builder pattern
- `IScreen` - Screen interface for widget management
- `TextHelper` - Used for button text formatting
- `MethodWrapper` - Used for button action callbacks
- `ButtonWidgetHelper` - Regular button helper for comparison

## Version History

- **1.8.4**: Initial release of LockButtonWidgetHelper and LockButtonBuilder
- **Current**: Enhanced with comprehensive state management and builder pattern

## Important Notes

1. **Visual State**: The lock button automatically changes its appearance based on lock state
2. **State Persistence**: Lock states are not automatically saved - implement persistence if needed
3. **Inheritance**: All standard button features (tooltips, positioning, etc.) are available
4. **Builder Pattern**: The LockButtonBuilder is the recommended way to create lock buttons
5. **Thread Safety**: Lock state operations are thread-safe
6. **Error Handling**: Button actions include automatic error catching and logging

# LockButtonWidgetHelper.LockButtonBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.LockButtonWidgetHelper$LockButtonBuilder`

**Extends:** `AbstractWidgetBuilder<LockButtonBuilder, LockButtonWidget, LockButtonWidgetHelper>`

**Since:** JsMacros 1.8.4

The `LockButtonBuilder` class is a specialized builder for creating lock button widgets with toggle functionality. It provides a fluent, chainable API for configuring lock buttons with customizable initial states, actions, positioning, and appearance. This builder is the recommended way to create lock buttons for custom screens, offering a more readable and maintainable approach than direct instantiation.

The builder combines lock-specific functionality with all standard widget capabilities, allowing you to create buttons that can be toggled between locked and unlocked states with visual feedback.

## Overview

The `LockButtonBuilder` provides:

- **Lock State Configuration**: Set initial locked/unlocked state when creating the button
- **Action Management**: Define click handlers with access to both the button and screen
- **Builder Pattern**: Fluent API for readable widget configuration
- **Complete Widget Control**: Full control over positioning, sizing, appearance, and behavior
- **Screen Integration**: Automatic integration with JSMacros custom screens
- **Error Handling**: Built-in error handling for button actions
- **Visual Feedback**: Automatic appearance changes based on lock state

## Constructor

### `new LockButtonBuilder(screen)`
Creates a new LockButtonBuilder for the specified screen.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| screen | `IScreen` | The screen to add the lock button to |

**Example:**
```javascript
const screen = Hud.createScreen("Settings Panel", 300, 200);
const lockBuilder = new LockButtonWidgetHelper.LockButtonBuilder(screen);
```

**Since:** `1.8.4`

## Methods

### Lock State Management

#### `isLocked()`
**Returns:** `boolean` - The currently configured initial lock state

Gets the initial lock state that has been configured for the button being built.

**Example:**
```javascript
const builder = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .locked(true);

if (builder.isLocked()) {
    Chat.log("Button will start in locked state");
}
```

#### `locked(locked)`
**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| locked | `boolean` | Initial lock state (`true` for locked, `false` for unlocked) |

**Returns:** `LockButtonBuilder` - Returns self for method chaining

Sets the initial lock state of the button when it is created. This determines whether the button starts in locked or unlocked state.

**Example:**
```javascript
// Button starts locked
const lockedButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .locked(true)
    .message("Locked Setting")
    .build();

// Button starts unlocked
const unlockedButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .locked(false)
    .message("Unlocked Setting")
    .build();
```

### Action Management

#### `getAction()`
**Returns:** `MethodWrapper<LockButtonWidgetHelper, IScreen, Object, ?> | null` - The currently configured action, or null if none

Gets the click action that has been configured for the button being built.

**Example:**
```javascript
const builder = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .action((btn, scr) => Chat.log("Button clicked!"));

const action = builder.getAction();
if (action) {
    Chat.log("Button has an action configured");
}
```

#### `action(action)`
**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| action | `MethodWrapper<LockButtonWidgetHelper, IScreen, Object, ?> | null` | The action to execute when the button is clicked. Pass `null` to remove any existing action. |

**Returns:** `LockButtonBuilder` - Returns self for method chaining

Sets the click action for the lock button. The action receives two parameters:
- `lockBtn: LockButtonWidgetHelper` - The button helper that was clicked
- `screen: IScreen` - The screen containing the button

**Example:**
```javascript
const lockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(50, 50)
    .width(150)
    .message("Toggle Lock")
    .action((lockBtn, currentScreen) => {
        // Toggle the lock state
        const currentState = lockBtn.isLocked();
        const newState = !currentState;
        lockBtn.setLocked(newState);

        // Provide feedback
        if (newState) {
            Chat.log("Feature is now LOCKED");
            lockBtn.setTooltip("Click to unlock this feature");
        } else {
            Chat.log("Feature is now UNLOCKED");
            lockBtn.setTooltip("Click to lock this feature");
        }
    })
    .build();
```

### Inherited Methods from AbstractWidgetBuilder

The `LockButtonBuilder` inherits all standard widget configuration methods:

#### Position and Size
- `x(int x)` - Set x position (returns self for chaining)
- `y(int y)` - Set y position (returns self for chaining)
- `pos(int x, int y)` - Set both x and y position (returns self for chaining)
- `width(int width)` - Set button width (returns self for chaining)
- `height(int height)` - Set button height (returns self for chaining)
- `size(int width, int height)` - Set both width and height (returns self for chaining)

#### Appearance and Text
- `message(String message)` - Set button text from string (returns self for chaining)
- `message(TextHelper message)` - Set button text from TextHelper (returns self for chaining)
- `getMessage()` - Get current configured message as TextHelper
- `alpha(double alpha)` - Set transparency (0.0 to 1.0, returns self for chaining)
- `getAlpha()` - Get current alpha value

#### State and Visibility
- `active(boolean active)` - Set active/clickable state (returns self for chaining)
- `isActive()` - Get current active state
- `visible(boolean visible)` - Set visibility (returns self for chaining)
- `isVisible()` - Get current visibility state
- `zIndex(int zIndex)` - Set render order (returns self for chaining)
- `getZIndex()` - Get current z-index

#### Building
- `build()` - Create the lock button widget and add it to the screen

## Usage Examples

### Basic Lock Button Creation

```javascript
// Create a simple lock button
const screen = Hud.createScreen("Basic Lock Demo", 250, 150);

const lockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(50, 50)
    .width(150)
    .message("Lock Settings")
    .locked(false) // Start unlocked
    .action((lockBtn, currentScreen) => {
        // Toggle lock state
        const newState = !lockBtn.isLocked();
        lockBtn.setLocked(newState);
        Chat.log(`Settings ${newState ? 'LOCKED' : 'UNLOCKED'}`);
    })
    .build();

Hud.openScreen(screen);
```

### Lock Button with Initial Locked State

```javascript
// Create a button that starts locked
const screen = Hud.createScreen("Security Panel", 300, 200);

const securityLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(75, 60)
    .width(150)
    .message("Master Security")
    .locked(true) // Start in locked state
    .setTooltip(
        "Security is currently active",
        "Click to disable security"
    )
    .action((lockBtn, scr) => {
        if (lockBtn.isLocked()) {
            // Require confirmation to unlock
            Chat.log("Security override required!");
            // Could add confirmation dialog here
        } else {
            lockBtn.setLocked(true);
            Chat.log("Security re-enabled");
        }
    })
    .build();

Hud.openScreen(screen);
```

### Conditional Lock State Based on Game State

```javascript
// Create a lock button whose initial state depends on game conditions
const screen = Hud.createScreen("Smart Lock", 280, 180);

const player = Player.getPlayer();
const shouldStartLocked = player && player.getHealth() < player.getMaxHealth() * 0.5;

const smartLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(40, 50)
    .width(200)
    .message("Advanced Features")
    .locked(shouldStartLocked)
    .setTooltip(
        shouldStartLocked ?
        "Features locked due to low health" :
        "Features available - click to toggle"
    )
    .action((lockBtn, scr) => {
        const currentHealth = Player.getPlayer()?.getHealth() || 0;
        const maxHealth = Player.getPlayer()?.getMaxHealth() || 1;
        const healthPercent = currentHealth / maxHealth;

        if (healthPercent < 0.5) {
            Chat.log("Cannot unlock: Insufficient health!");
            return;
        }

        lockBtn.setLocked(!lockBtn.isLocked());
        Chat.log(`Advanced features ${lockBtn.isLocked() ? 'DISABLED' : 'ENABLED'}`);
    })
    .build();

Hud.openScreen(screen);
```

### Lock Button with Complex Action Logic

```javascript
// Create a lock button with sophisticated action handling
const screen = Hud.createScreen("Advanced Controls", 350, 250);

const controlLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(100, 75)
    .width(150)
    .message("System Controls")
    .locked(false)
    .action((lockBtn, currentScreen) => {
        try {
            const currentState = lockBtn.isLocked();
            const newState = !currentState;

            // Perform validation before changing state
            if (newState) {
                // Locking - check preconditions
                const player = Player.getPlayer();
                if (!player) {
                    Chat.log("Cannot lock: Player not available");
                    return;
                }

                // Additional validation logic here
                Chat.log("System controls LOCKED - changes disabled");
            } else {
                // Unlocking - check permissions
                Chat.log("System controls UNLOCKED - changes enabled");

                // Could trigger additional UI changes here
                updateOtherControlsState(true);
            }

            // Update the lock state
            lockBtn.setLocked(newState);

            // Update button appearance based on state
            if (newState) {
                lockBtn.setTooltip(
                    "System is locked",
                    "No modifications allowed",
                    "Click to unlock"
                );
            } else {
                lockBtn.setTooltip(
                    "System is unlocked",
                    "Modifications allowed",
                    "Click to lock"
                );
            }

        } catch (error) {
            Chat.log("Error toggling control lock: " + error.message);
        }
    })
    .build();

// Helper function to update other controls
function updateOtherControlsState(enabled) {
    // Logic to enable/disable other UI elements
    Chat.log(`Other controls ${enabled ? 'ENABLED' : 'DISABLED'}`);
}

Hud.openScreen(screen);
```

### Lock Button with Action Removal

```javascript
// Example of removing an action from a lock button
const screen = Hud.createScreen("Dynamic Actions", 300, 200);

let actionEnabled = true;

const dynamicLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(50, 50)
    .width(200)
    .message("Dynamic Action Lock")
    .locked(false)
    .action((lockBtn, scr) => {
        if (actionEnabled) {
            Chat.log("Lock action executed!");
            lockBtn.setLocked(!lockBtn.isLocked());
        } else {
            Chat.log("Lock action is currently disabled!");
        }
    })
    .build();

// Control button to toggle action
const actionToggle = screen.addButton()
    .pos(50, 80)
    .width(200)
    .message("Toggle Lock Action")
    .action((btn, scr) => {
        actionEnabled = !actionEnabled;

        if (actionEnabled) {
            // Restore the action (would need to recreate button or use different approach)
            Chat.log("Lock action ENABLED");
            btn.setLabel("Disable Lock Action");
        } else {
            // Remove the action
            dynamicLock.action(null);
            Chat.log("Lock action DISABLED");
            btn.setLabel("Enable Lock Action");
        }
    })
    .build();

Hud.openScreen(screen);
```

### Multiple Lock Buttons with Coordinated Actions

```javascript
// Create multiple lock buttons that work together
const screen = Hud.createScreen("Coordinated Locks", 400, 300);

const locks = [];

// Create a row of lock buttons
const features = ["Chat", "Movement", "Inventory", "Combat"];

features.forEach((feature, index) => {
    const lockBtn = new LockButtonWidgetHelper.LockButtonBuilder(screen)
        .pos(50 + (index * 90), 50)
        .width(80)
        .message(feature)
        .locked(false)
        .action((lockBtn, scr) => {
            // Toggle individual lock
            lockBtn.setLocked(!lockBtn.isLocked());

            // Check if all are locked
            const allLocked = locks.every(lock => lock.isLocked());
            const anyLocked = locks.some(lock => lock.isLocked());

            Chat.log(`${feature}: ${lockBtn.isLocked() ? 'LOCKED' : 'UNLOCKED'}`);
            Chat.log(`Overall status: ${
                allLocked ? 'ALL LOCKED' :
                anyLocked ? 'PARTIALLY LOCKED' :
                'ALL UNLOCKED'
            }`);
        })
        .build();

    locks.push(lockBtn);
});

// Master control button
const masterLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(150, 100)
    .width(100)
    .message("Master")
    .locked(false)
    .action((masterBtn, scr) => {
        const newState = !masterBtn.isLocked();
        masterBtn.setLocked(newState);

        // Sync all individual locks with master
        locks.forEach(lock => {
            lock.setLocked(newState);
        });

        Chat.log(`Master lock ${newState ? 'ENGAGED' : 'DISENGAGED'} - All features ${newState ? 'LOCKED' : 'UNLOCKED'}`);
    })
    .build();

Hud.openScreen(screen);
```

### Lock Button with State Persistence

```javascript
// Lock button that remembers its state
let savedLockState = false; // This could be loaded from a file or global variable

const screen = Hud.createScreen("Persistent Lock", 300, 200);

const persistentLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(75, 60)
    .width(150)
    .message("Persistent Lock")
    .locked(savedLockState) // Restore saved state
    .setTooltip(`Current state: ${savedLockState ? 'LOCKED' : 'UNLOCKED'}`)
    .action((lockBtn, scr) => {
        const newState = !lockBtn.isLocked();
        lockBtn.setLocked(newState);

        // Save the new state
        savedLockState = newState;

        // Update tooltip
        lockBtn.setTooltip(`Current state: ${newState ? 'LOCKED' : 'UNLOCKED'}`);

        Chat.log(`Lock state saved: ${newState ? 'LOCKED' : 'UNLOCKED'}`);

        // Here you could also save to a file or other persistent storage
        // File.write("lock_state.txt", String(newState));
    })
    .build();

// Status display
const statusText = screen.addText(`Saved State: ${savedLockState ? 'LOCKED' : 'UNLOCKED'}`)
    .pos(100, 120)
    .build();

Hud.openScreen(screen);
```

### Lock Button Builder Pattern Chaining

```javascript
// Example of extensive method chaining for complex configuration
const screen = Hud.createScreen("Complex Lock Button", 350, 250);

const complexLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    // Position and size
    .x(50)
    .y(75)
    .width(250)
    .height(25)

    // Text and appearance
    .message("Complex Lock Configuration")
    .alpha(0.9)

    // State configuration
    .locked(true)
    .active(true)
    .visible(true)
    .zIndex(10)

    // Action with error handling
    .action((lockBtn, scr) => {
        try {
            const currentState = lockBtn.isLocked();
            const newState = !currentState;

            // Complex logic here
            Chat.log(`Changing lock state from ${currentState} to ${newState}`);

            // Additional validation
            const player = Player.getPlayer();
            if (!player) {
                Chat.log("Cannot toggle lock: No player available");
                return;
            }

            // Apply state change
            lockBtn.setLocked(newState);

            // Update other UI elements if needed
            updateRelatedControls(newState);

            Chat.log(`Lock state successfully changed to: ${newState}`);

        } catch (error) {
            Chat.log(`Error toggling lock: ${error.message}`);
        }
    })

    // Build the final widget
    .build();

// Helper function
function updateRelatedControls(locked) {
    Chat.log(`Related controls updated for ${locked ? 'LOCKED' : 'UNLOCKED'} state`);
}

Hud.openScreen(screen);
```

## Builder Pattern Best Practices

### 1. Method Order
Organize your builder calls logically:
```javascript
const lockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    // 1. Position and size first
    .pos(50, 50)
    .width(150)

    // 2. Text and appearance
    .message("Feature Lock")
    .alpha(1.0)

    // 3. State configuration
    .locked(false)
    .active(true)
    .visible(true)

    // 4. Behavior
    .action((btn, scr) => { /* action logic */ })

    // 5. Build last
    .build();
```

### 2. Error Handling in Actions
Always include error handling in button actions:
```javascript
.action((lockBtn, scr) => {
    try {
        // Your logic here
        const newState = !lockBtn.isLocked();
        lockBtn.setLocked(newState);
        Chat.log(`Lock state changed to: ${newState}`);
    } catch (error) {
        Chat.log(`Error in lock action: ${error.message}`);
    }
})
```

### 3. State Validation
Validate conditions before changing lock state:
```javascript
.action((lockBtn, scr) => {
    // Check preconditions
    const player = Player.getPlayer();
    if (!player || player.getHealth() < 10) {
        Chat.log("Cannot change lock state: Invalid conditions");
        return;
    }

    // Safe to change state
    lockBtn.setLocked(!lockBtn.isLocked());
})
```

### 4. Consistent State Management
Keep lock state consistent with other UI elements:
```javascript
.action((lockBtn, scr) => {
    const newState = !lockBtn.isLocked();
    lockBtn.setLocked(newState);

    // Update related UI elements
    updateOtherElements(newState);
    updateTooltips(lockBtn, newState);
    saveState(newState);
})
```

## Integration with Screens

The LockButtonBuilder integrates seamlessly with IScreen:

```javascript
// Creating through a screen
const screen = Hud.createScreen("My Screen", 400, 300);

// Method 1: Direct builder instantiation
const lockBtn = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(50, 50)
    .width(150)
    .message("My Lock")
    .build();

// Method 2: Through screen helper (if available)
// const lockBtn = screen.addLockButton()
//     .pos(50, 50)
//     .width(150)
//     .message("My Lock")
//     .build();

// Both methods add the button to the screen automatically
Hud.openScreen(screen);
```

## Error Handling and Debugging

The LockButtonBuilder includes automatic error handling:

```javascript
const debugLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(50, 50)
    .width(200)
    .message("Debug Lock")
    .action((lockBtn, scr) => {
        Chat.log("Lock action started");
        Chat.log(`Current state: ${lockBtn.isLocked()}`);
        Chat.log(`Screen: ${scr.getClass().getSimpleName()}`);

        try {
            lockBtn.setLocked(!lockBtn.isLocked());
            Chat.log(`New state: ${lockBtn.isLocked()}`);
        } catch (e) {
            Chat.log(`Error: ${e.message}`);
            Chat.log(`Error type: ${e.getClass().getSimpleName()}`);
        }

        Chat.log("Lock action completed");
    })
    .build();
```

## Performance Considerations

1. **Builder Reuse**: Create a new builder for each button rather than reusing
2. **Action Efficiency**: Keep action handlers lightweight for responsive UI
3. **State Updates**: Lock state changes are optimized for performance
4. **Memory Management**: The build() method automatically handles memory

## Version History

- **1.8.4**: Initial release with basic lock button builder functionality
- **Current**: Enhanced with comprehensive builder pattern and error handling

## Related Classes

- `LockButtonWidgetHelper` - The main lock button helper class
- `AbstractWidgetBuilder` - Parent class providing base builder functionality
- `ClickableWidgetHelper` - Base widget functionality
- `IScreen` - Screen interface for widget management
- `LockButtonWidget` - The underlying Minecraft lock button widget
- `MethodWrapper` - Wrapper for JavaScript methods in Java context
- `TextHelper` - Helper class for text formatting

## Important Notes

1. **Builder Pattern**: Always use the build() method to create the final widget
2. **State Initialization**: The locked() method sets the initial state only
3. **Action Context**: Actions receive both the button helper and screen as parameters
4. **Error Safety**: Button actions are automatically wrapped with error handling
5. **Screen Integration**: The build() method automatically adds the button to the screen
6. **Method Chaining**: All configuration methods return the builder for chaining
7. **Null Actions**: Passing null to action() removes any existing action
8. **Thread Safety**: All lock operations are thread-safe