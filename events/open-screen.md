# OpenScreen Event

This event is fired when any screen is opened, including menus and non-container interfaces. Backed by class `EventOpenScreen`.

## Signature
```js
JsMacros.on("OpenScreen", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field      | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| screen     | IScreen | The screen helper object (can be null)   |
| screenName | string  | The name of the screen that opened       |

## Behavior

* Fires when any screen interface is opened
- The `screen` field provides access to the screen object (can be null)
- The `screenName` field contains the readable screen name
- Includes menus, containers, chat, options, etc.
- Useful for screen-specific macros or UI automation

## Minimal example

```js
JsMacros.on("OpenScreen", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Screen opened: ${e.screenName}`);
});
```

## Async example

```js
JsMacros.on("OpenScreen", JavaWrapper.methodToJavaAsync((e) => {
  const screen = e.screen;
  const screenName = e.screenName;

  Chat.log(`&dScreen Opened: &f${screenName}`);

  // Handle different screen types
  if (screenName === "Title Screen") {
    Chat.log("&6Main menu opened");
    Chat.actionbar("Welcome to JsMacros!");
  }

  if (screenName === "Singleplayer Menu") {
    Chat.log("&aSingleplayer menu opened");
    Chat.actionbar("Select your world!");
  }

  if (screenName === "Multiplayer Menu") {
    Chat.log("&bMultiplayer menu opened");
    Chat.actionbar("Join a server!");
  }

  if (screenName === "Connecting Screen") {
    Chat.log("&eConnecting to server...");
    Chat.actionbar("Establishing connection...");
  }

  if (screenName === "Chat Screen") {
    Chat.log("&7Chat opened");
    Chat.actionbar("Type your message...");
  }

  if (screenName === "Options Screen") {
    Chat.log("&6Options menu opened");
    Chat.actionbar("Configure your settings");
  }

  if (screenName === "Video Settings Screen") {
    Chat.log("&dVideo settings opened");
    Chat.actionbar("Adjust graphics options");
  }

  if (screenName === "Controls Options Screen") {
    Chat.log("&eControls settings opened");
    Chat.actionbar("Configure key bindings");
  }

  if (screenName === "Language Options Screen") {
    Chat.log("&bLanguage options opened");
    Chat.actionbar("Select language");
  }

  if (screenName === "Accessibility Options Screen") {
    Chat.log("&cAccessibility options opened");
    Chat.actionbar("Configure accessibility features");
  }

  if (screenName === "Skin Options Screen") {
    Chat.log("&dSkin options opened");
    Chat.actionbar("Customize your skin");
  }

  if (screenName === "Sound Options Screen") {
    Chat.log("&aSound options opened");
    Chat.actionbar("Adjust audio settings");
  }

  if (screenName === "Pause Menu") {
    Chat.log("&eGame paused");
    Chat.actionbar("Game is paused");
  }

  if (screenName === "Game Menu") {
    Chat.log("&6In-game menu opened");
    Chat.actionbar("Game menu");
  }

  if (screenName === "Book Screen") {
    Chat.log("&6Book opened");
    Chat.actionbar("Reading a book...");
  }

  if (screenName === "Jigsaw Block Screen") {
    Chat.log("&bJigsaw block editor opened");
    Chat.actionbar("Configuring structure");
  }

  if (screenName === "Sign Edit Screen") {
    Chat.log("&eSign editor opened");
    Chat.actionbar("Editing sign text");
  }

  if (screenName === "Command Block Screen") {
    Chat.log("&cCommand block opened");
    Chat.actionbar("Editing command block");
  }

  if (screenName === "Structure Block Screen") {
    Chat.log("&dStructure block opened");
    Chat.actionbar("Configuring structure");
  }

  // Handle unknown screens
  if (!screenName || screenName.includes("Unknown")) {
    Chat.log(`&cUnknown screen opened: ${screenName}`);
    Chat.actionbar("Unknown interface");
  }

  // Log screen class name for debugging
  if (screen) {
    const className = screen.getClassName();
    Chat.log(`&8Screen class: ${className}`);
  }

  // Track screen usage statistics
  // incrementScreenUsageCounter(screenName);
}));

// Example: Prevent certain screens from opening
JsMacros.on("OpenScreen", JavaWrapper.methodToJavaAsync((e) => {
  const screenName = e.screenName;

  // Example: Prevent options menu in certain situations
  if (screenName === "Options Screen" && shouldBlockOptions()) {
    e.cancel();
    Chat.actionbar("&cOptions menu blocked!");
    Chat.log("&cAccess to options is currently restricted.");
  }
}));

function shouldBlockOptions() {
  // Define conditions when options should be blocked
  // For example, during certain game modes or events
  return false; // Always allow for now
}
```

## Fields
- [event.screen](#eventscreen)
- [event.screenName](#eventscreenname)

## Methods
- [event.toString()](#eventtostring)

### event.screen
A helper object for the screen that opened.

**Type:** `IScreen` | `null`

**Notes**
This provides access to screen methods and properties. Can be `null` for some screens. You can get the class name, title, and other screen-specific information.

### event.screenName
The readable name of the screen that opened.

**Type:** `string`

**Notes**
This contains a user-friendly name for the screen, such as "Chat Screen", "Inventory Screen", "Options Screen", etc. This is useful for identifying what type of interface was opened.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`