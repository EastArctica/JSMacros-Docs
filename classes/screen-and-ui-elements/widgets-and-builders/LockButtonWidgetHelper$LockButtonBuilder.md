# LockButtonWidgetHelper.LockButtonBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.screen.LockButtonWidgetHelper.LockButtonBuilder`

**Extends:** `AbstractWidgetBuilder<LockButtonBuilder, ?, ?>`

**Since:** JsMacros 1.8.4

The `LockButtonBuilder` class provides a fluent builder API for creating lock button widgets in JSMacros custom screens. These are special buttons that can lock or unlock other UI elements, providing control over user interaction with various widgets. This builder extends the standard button functionality to support locked/unlocked states with automatic management of dependent widget accessibility.

## Overview

The `LockButtonBuilder` class enables creation of interactive lock controls with:

- **Lock/Unlock Functionality**: Automatically controls accessibility of linked widgets
- **State Management**: Maintains and toggles between locked and unlocked states
- **Widget Linking**: Link multiple widgets to be controlled by the lock button
- **Builder Pattern**: Fluent API for readable and maintainable button creation
- **Complete Widget Control**: Full control over positioning, sizing, appearance, and behavior
- **Screen Integration**: Automatic integration with JSMacros custom screens
- **Error Handling**: Built-in error handling for lock operations

## Constructor

### `new LockButtonBuilder(screen)`
Creates a new LockButtonBuilder for the specified screen.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| screen | `IScreen` | The screen to add the lock button to |

**Example:**
```javascript
const screen = Hud.createScreen("Locked UI", true);
const builder = new LockButtonWidgetHelper.LockButtonBuilder(screen);
```

**Since:** `1.8.4`

## Methods

### Lock Configuration Methods

#### `addLockable(widget)`
Adds a widget to the list of lockable widgets controlled by this lock button.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| widget | `ClickableWidgetHelper` | The widget to control |

**Returns:** `LockButtonBuilder` - Returns self for method chaining

**Example:**
```javascript
const textField = screen.addTextField(10, 60, 200, 20, "Locked input");
const slider = screen.addSlider(10, 90, 200, 20, 0, 100, 50);

const lockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .addLockable(textField)
    .addLockable(slider)
    .build();
```

### Inherited Methods from AbstractWidgetBuilder

The `LockButtonBuilder` inherits all configuration methods from AbstractWidgetBuilder:

#### Position and Size Methods
- `pos(x, y)` - Set the position (x, y coordinates)
- `x(x)` - Set the x position only
- `y(y)` - Set the y position only
- `size(width, height)` - Set both width and height
- `width(width)` - Set the width only
- `height(height)` - Set the height only

#### Text and Message Methods
- `message(text)` - Set the button label text
- `message(textHelper)` - Set the label using a TextHelper object

#### Widget Properties
- `zIndex(index)` - Set the rendering order
- `active(active)` - Set whether the widget is interactive
- `visible(visible)` - Set whether the widget is visible
- `alpha(alpha)` - Set the transparency (0.0 to 1.0)

#### Tooltip Methods
- `tooltip(text)` - Add a tooltip
- `addTooltip(text)` - Add additional tooltips

#### Build Methods
- `build()` - Create and add the button to the screen
- `createWidget()` - Create the button without adding to screen

## Usage Examples

### Basic Lock Button Creation

```javascript
const screen = Hud.createScreen("Locked Controls", true);

// Create widgets to be locked
const textField = screen.addTextField(10, 60, 200, 20, "Locked input");
const slider = screen.addSlider(10, 90, 200, 20, 0, 100, 50);
const button = screen.addButton(10, 120, 100, 20, "Locked Action");

// Create lock button
const lockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(10, 30)
    .width(200)
    .height(20)
    .message("Unlock Controls")
    .addLockable(textField)
    .addLockable(slider)
    .addLockable(button)
    .action((lockBtn, screenInstance) => {
        const isLocked = lockBtn.isLocked();
        const newState = !isLocked;

        lockBtn.setLocked(newState);
        lockBtn.setMessage(newState ? "Unlock Controls" : "Lock Controls");

        Chat.log(`Controls ${newState ? "locked" : "unlocked"}`);
    })
    .build();

Hud.openScreen(screen);
```

### Lock Button with Conditional Access

```javascript
const screen = Hud.createScreen("Security Panel", true);

// Create sensitive controls
const adminField = screen.addTextField(10, 60, 200, 20, "Admin password");
const deleteBtn = screen.addButton(10, 90, 100, 20, "Delete Data");
const exportBtn = screen.addButton(120, 90, 100, 20, "Export Data");

// Initially disable sensitive controls
adminField.setActive(false);
deleteBtn.setActive(false);
exportBtn.setActive(false);

// Create security lock
const securityLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(10, 30)
    .width(200)
    .height(20)
    .message("Unlock Security (Admin Required)")
    .addLockable(adminField)
    .addLockable(deleteBtn)
    .addLockable(exportBtn)
    .action((lockBtn, screenInstance) => {
        // Simple password check (in practice, use more secure authentication)
        const password = Chat.prompt("Enter admin password:");

        if (password === "admin123") {
            lockBtn.setLocked(false);
            lockBtn.setMessage("Lock Security");
            Chat.log("§aSecurity unlocked - Admin access granted");
        } else {
            Chat.log("§cInvalid password - Access denied");
        }
    })
    .build();

Hud.openScreen(screen);
```

### Lock Button with State Persistence

```javascript
const screen = Hud.createScreen("Persistent Settings", true);

// Load saved lock state
let isLocked = false; // In practice, load from persistent storage

// Create settings controls
const setting1 = screen.addCheckBox(10, 60, 200, 20, "Setting 1", !isLocked);
const setting2 = screen.addCheckBox(10, 85, 200, 20, "Setting 2", !isLocked);
const setting3 = screen.addSlider(10, 110, 200, 20, 0, 100, 50);

// Create persistence lock
const persistenceLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(10, 30)
    .width(200)
    .height(20)
    .message(isLocked ? "Unlock Settings" : "Lock Settings")
    .addLockable(setting1)
    .addLockable(setting2)
    .addLockable(setting3)
    .action((lockBtn, screenInstance) => {
        const newLockedState = !lockBtn.isLocked();
        lockBtn.setLocked(newLockedState);

        const message = newLockedState ? "Lock Settings" : "Unlock Settings";
        lockBtn.setMessage(message);

        // Save state to persistent storage
        saveLockState(newLockedState);

        Chat.log(`Settings ${newLockedState ? "locked" : "unlocked"} (saved)`);
    })
    .build();

// Set initial lock state
persistenceLock.setLocked(isLocked);

function saveLockState(locked) {
    // In practice, save to file or persistent storage
    // File.write("lock_state.txt", locked.toString());
    Chat.log("Lock state saved: " + locked);
}

Hud.openScreen(screen);
```

### Lock Button with Grouped Controls

```javascript
const screen = Hud.createScreen("Grouped Controls", true);

// Create control groups
const group1 = [
    screen.addTextField(10, 80, 150, 20, "Group 1 - Input A"),
    screen.addTextField(10, 105, 150, 20, "Group 1 - Input B"),
    screen.addButton(10, 130, 80, 20, "Group 1 Action")
];

const group2 = [
    screen.addSlider(200, 80, 150, 20, 0, 100, 50),
    screen.addButton(200, 105, 80, 20, "Group 2 Action A"),
    screen.addButton(290, 105, 80, 20, "Group 2 Action B")
];

// Create lock buttons for each group
const group1Lock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(10, 50)
    .width(150)
    .height(20)
    .message("Lock Group 1")
    .addLockable(...group1)
    .action((lockBtn, screenInstance) => {
        const locked = !lockBtn.isLocked();
        lockBtn.setLocked(locked);
        lockBtn.setMessage(locked ? "Unlock Group 1" : "Lock Group 1");
        Chat.log(`Group 1 ${locked ? "locked" : "unlocked"}`);
    })
    .build();

const group2Lock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(200, 50)
    .width(150)
    .height(20)
    .message("Lock Group 2")
    .addLockable(...group2)
    .action((lockBtn, screenInstance) => {
        const locked = !lockBtn.isLocked();
        lockBtn.setLocked(locked);
        lockBtn.setMessage(locked ? "Unlock Group 2" : "Lock Group 2");
        Chat.log(`Group 2 ${locked ? "locked" : "unlocked"}`);
    })
    .build();

// Master lock that controls both groups
const masterLock = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(100, 160)
    .width(120)
    .height(20)
    .message("Lock All Groups")
    .addLockable(group1Lock, group2Lock, ...group1, ...group2)
    .action((lockBtn, screenInstance) => {
        const locked = !lockBtn.isLocked();
        lockBtn.setLocked(locked);
        lockBtn.setMessage(locked ? "Unlock All" : "Lock All");

        // Update group lock states
        group1Lock.setLocked(locked);
        group1Lock.setMessage(locked ? "Unlock Group 1" : "Lock Group 1");
        group2Lock.setLocked(locked);
        group2Lock.setMessage(locked ? "Unlock Group 2" : "Lock Group 2");

        Chat.log(`All groups ${locked ? "locked" : "unlocked"}`);
    })
    .build();

// Group labels
screen.addText(10, 30, "Control Group 1:", 0xFFFF00);
screen.addText(200, 30, "Control Group 2:", 0xFFFF00);

Hud.openScreen(screen);
```

## Integration with Other UI Elements

### Lock Button with Dynamic Widget Creation

```javascript
const screen = Hud.createScreen("Dynamic Lock", true);

let dynamicWidgets = [];
let widgetCount = 0;

const lockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(10, 30)
    .width(200)
    .height(20)
    .message("Lock Dynamic Widgets")
    .action((lockBtn, screenInstance) => {
        const locked = !lockBtn.isLocked();
        lockBtn.setLocked(locked);
        lockBtn.setMessage(locked ? "Unlock Dynamic Widgets" : "Lock Dynamic Widgets");

        // Lock/unlock existing dynamic widgets
        dynamicWidgets.forEach(widget => {
            if (widget && widget.setActive) {
                widget.setActive(!locked);
            }
        });

        Chat.log(`Dynamic widgets ${locked ? "locked" : "unlocked"}`);
    })
    .build();

// Button to add new widgets
const addWidgetBtn = screen.addButton(220, 30, 100, 20, "Add Widget")
    .action((btn, screenInstance) => {
        const y = 60 + (widgetCount * 25);
        const newWidget = screen.addTextField(10, y, 200, 20, `Dynamic Widget ${widgetCount + 1}`);

        dynamicWidgets.push(newWidget);
        lockButton.addLockable(newWidget);

        // Lock if lock button is locked
        if (lockButton.isLocked()) {
            newWidget.setActive(false);
        }

        widgetCount++;
        Chat.log(`Added dynamic widget ${widgetCount}`);
    })
    .build();

const removeWidgetBtn = screen.addButton(330, 30, 100, 20, "Remove Widget")
    .action((btn, screenInstance) => {
        if (dynamicWidgets.length > 0) {
            const removedWidget = dynamicWidgets.pop();
            // Note: In practice, you'd need to implement widget removal from screen
            Chat.log(`Removed widget (removal from screen not implemented)`);
        }
    })
    .build();

Hud.openScreen(screen);
```

## Best Practices

### Lock Management
1. **Clear Visual Feedback**: Provide clear indication of lock state through button text
2. **Logical Grouping**: Group related widgets together under appropriate locks
3. **Consistent Behavior**: Ensure all widgets respond consistently to lock state
4. **Security Considerations**: Use locks for sensitive operations that require additional confirmation

### User Experience
1. **Intuitive Controls**: Make it obvious which widgets are controlled by which locks
2. **State Persistence**: Consider saving lock states for important settings
3. **Access Control**: Implement proper authentication for security-sensitive locks
4. **Visual Indicators**: Use colors or icons to distinguish locked/unlocked states

### Performance Considerations
1. **Efficient Updates**: Avoid excessive widget state updates when locking/unlocking
2. **Batch Operations**: Group multiple widget state changes together
3. **Minimal Lock Checking**: Use efficient checks for lock state in widget interactions

## Error Handling

The LockButtonBuilder includes comprehensive error handling:

```javascript
const safeLockButton = new LockButtonWidgetHelper.LockButtonBuilder(screen)
    .pos(10, 30)
    .width(200)
    .height(20)
    .message("Safe Lock")
    .action((lockBtn, screenInstance) => {
        try {
            const locked = !lockBtn.isLocked();

            // Validate state transition
            if (canToggleLock(locked)) {
                lockBtn.setLocked(locked);
                lockBtn.setMessage(locked ? "Unlock" : "Lock");
                Chat.log(`Lock state changed to: ${locked}`);
            } else {
                Chat.log("§cCannot toggle lock - validation failed");
            }
        } catch (e) {
            Chat.log("§cLock operation failed: " + e.message);
            // Reset to safe state
            lockBtn.setLocked(true);
            lockBtn.setMessage("Unlock (Error Recovery)");
        }
    })
    .build();

function canToggleLock(newState) {
    // Implement validation logic
    return true; // Placeholder
}
```

## Important Notes

1. **Widget Compatibility**: Only ClickableWidgetHelper subclasses can be locked
2. **State Synchronization**: Lock button state is synchronized with controlled widgets
3. **Automatic Management**: Controlled widgets are automatically disabled when locked
4. **Error Resilience**: Errors in lock operations are caught and logged
5. **Memory Management**: Lock references are properly managed when screens close
6. **Thread Safety**: Lock operations are executed safely on the main thread
7. **Visual Feedback**: Controlled widgets automatically show their locked/unlocked state
8. **Screen Integration**: Lock buttons are automatically added to the screen when build() is called

## Related Classes

- `LockButtonWidgetHelper` - Parent class providing base lock button functionality
- `AbstractWidgetBuilder` - Parent class providing common builder functionality
- `ClickableWidgetHelper` - Base class for lockable widget functionality
- `IScreen` - Screen interface for creating custom screens
- `TextHelper` - Helper class for text formatting and display
- `MethodWrapper` - Wrapper for JavaScript methods in Java context
- `ButtonWidget` - Minecraft's native button widget class

## Version History

- **1.8.4**: Initial release with basic lock button functionality
- **1.9.0**: Enhanced with multiple widget support and improved state management
- **Current**: Full feature set with comprehensive lock control and error handling

## Important Notes

1. **Widget Requirements**: Only widgets extending ClickableWidgetHelper can be locked
2. **State Management**: Lock state is automatically synchronized with controlled widgets
3. **Automatic Updates**: Controlled widgets are automatically enabled/disabled when lock state changes
4. **Error Safety**: Lock operations include comprehensive error handling
5. **Memory Cleanup**: Lock references are automatically cleaned up when screens close
6. **Thread Safety**: All lock operations are executed safely on the main render thread
7. **Visual Consistency**: Controlled widgets maintain consistent visual feedback for their lock state
8. **Screen Integration**: Lock buttons are automatically added to the screen when build() is called
9. **Error Recovery**: Errors in lock operations trigger safe fallback behavior