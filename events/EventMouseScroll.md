# MouseScroll Event

This event is fired when the mouse wheel is scrolled. Backed by class `EventMouseScroll`.

## Signature
```js
JsMacros.on("MouseScroll", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| amount | double  | The scroll amount and direction          |

## Behavior

* Fires when the mouse wheel is scrolled
- The `amount` field indicates scroll direction and magnitude
- Positive values scroll down, negative values scroll up
- This event is cancellable - preventing the scroll action
- Useful for custom hotkey systems or UI interactions

## Minimal example

```js
JsMacros.on("MouseScroll", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Mouse scrolled: ${e.amount}`);
});
```

## Async example

```js
JsMacros.on("MouseScroll", JavaWrapper.methodToJavaAsync((e) => {
  const scrollAmount = e.amount;
  const direction = scrollAmount > 0 ? "down" : "up";
  const magnitude = Math.abs(scrollAmount);

  Chat.log(`&6Mouse Scroll: &f${direction} (${magnitude.toFixed(1)})`);

  // Check current screen to determine scroll behavior
  const player = Player.getPlayer();
  const currentScreen = Hud.getOpenScreen();

  if (currentScreen) {
    Chat.log(`&7Scrolling in screen: &f${currentScreen.getClassName()}`);

    // Handle inventory scrolling
    if (currentScreen.getClassName().includes("InventoryScreen")) {
      Chat.actionbar(`&eScrolling inventory ${direction}`);
      // Could implement custom hotbar switching
      if (scrollAmount > 0) {
        Chat.actionbar("&7Next hotbar slot");
      } else {
        Chat.actionbar("&7Previous hotbar slot");
      }
    }

    // Handle creative inventory scrolling
    if (currentScreen.getClassName().includes("CreativeInventoryScreen")) {
      Chat.actionbar(`&eCreative inventory scroll ${direction}`);
    }

    // Handle chat scrolling
    if (currentScreen.getClassName().includes("ChatScreen")) {
      Chat.actionbar(`&7Chat history scroll ${direction}`);
    }
  } else {
    // In-game scrolling
    Chat.actionbar(`&eIn-game scroll ${direction}`);

    // Check if player is sneaking for different behavior
    if (player && player.isSneaking()) {
      Chat.log(`&7Sneaking + scroll: custom action`);
      // Implement custom hotkey while sneaking
      if (scrollAmount > 0) {
        Chat.actionbar(`&cNext tool (sneak+scroll)`);
      } else {
        Chat.actionbar(`&aPrevious tool (sneak+scroll)`);
      }
    } else {
      // Normal hotbar switching
      const currentSlot = player ? player.getInventory().getSelectedSlot() : 0;
      Chat.log(`&7Current hotbar: &f${currentSlot}`);
    }
  }

  // Detect scroll intensity
  if (magnitude > 3) {
    Chat.log(`&cFast scroll detected!`);
  } else if (magnitude < 1) {
    Chat.log(`&7Slow scroll detected`);
  }

  // Custom scroll zones (could be used for custom UI)
  const mouseX = Hud.getMouseX();
  const mouseY = Hud.getMouseY();
  Chat.log(`&7Scroll position: &f${mouseX}, ${mouseY}`);

  // Example: Custom zoom with scroll while holding Ctrl
  // This would need to be implemented with the actual game zoom controls
  if (isKeyDown("key.keyboard.left.control")) {
    Chat.log(`&6Ctrl+Scroll: Zoom ${direction}`);
    // implementZoom(direction, magnitude);
  }
}));

function isKeyDown(keyName) {
  // This would need to be implemented with actual key checking
  // For now, just return false as placeholder
  return false;
}
```

## Fields
- [event.amount](#eventamount)

## Methods
- [event.toString()](#eventtostring)

### event.amount
The amount and direction of the mouse scroll.

**Type:** `double`

**Notes**
- Positive values indicate scrolling down
- Negative values indicate scrolling up
- The magnitude typically ranges from -1.0 to 1.0 for normal scrolling
- Some systems may produce larger values for fast scrolling

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`