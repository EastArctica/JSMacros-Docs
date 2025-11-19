# Key Event

This event is fired when a key is pressed or released. Backed by class `EventKey`.

## Signature
```js
JsMacros.on("Key", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| action | int     | The key action (press or release)        |
| key    | string  | The translation key for the key          |
| mods   | string  | Modifier keys that are held down         |

## Behavior

* Fires when keyboard or mouse keys are pressed/released
- The `action` field indicates press (1) or release (0)
- The `key` field contains the key translation key
- The `mods` field contains held modifier keys
- This event is cancellable - preventing the original key action
- Can be filtered to only trigger for specific keys

## Minimal example

```js
JsMacros.on("Key", JavaWrapper.methodToJavaAsync((e) => {
  if (e.action === 1) {
    Chat.log(`Key pressed: ${e.key}`);
  }
}));
```

## Async example

```js
JsMacros.on("Key", JavaWrapper.methodToJavaAsync((e) => {
  const action = e.action;
  const key = e.key;
  const modifiers = e.mods;

  const actionName = action === 1 ? "pressed" : "released";
  const keyName = getKeyName(key);
  const modifierNames = getModifierNames(modifiers);

  // Only log key presses, not releases (to reduce spam)
  if (action === 1) {
    Chat.log(`&6Key ${actionName}: &f${keyName} ${modifierNames}`);

    // Handle specific keys
    if (key.includes("key.keyboard.space")) {
      Chat.actionbar("&eJump key pressed");
    } else if (key.includes("key.keyboard.w")) {
      Chat.actionbar("&7Moving forward");
    } else if (key.includes("key.keyboard.a")) {
      Chat.actionbar("&7Moving left");
    } else if (key.includes("key.keyboard.s")) {
      Chat.actionbar("&7Moving backward");
    } else if (key.includes("key.keyboard.d")) {
      Chat.actionbar("&7Moving right");
    } else if (key.includes("key.keyboard.shift")) {
      Chat.actionbar("&9Sneaking");
    } else if (key.includes("key.keyboard.control")) {
      Chat.actionbar("&cSprinting/Dropping");
    } else if (key.includes("key.keyboard.e")) {
      Chat.actionbar("&eOpening inventory");
    } else if (key.includes("key.keyboard.escape")) {
      Chat.actionbar("&7Opening menu");
    } else if (key.includes("key.keyboard.f")) {
      Chat.actionbar("&eSwapping hands");
    } else if (key.includes("key.keyboard.q")) {
      Chat.actionbar("&cDropping item");
    } else if (key.includes("key.mouse.left")) {
      Chat.actionbar("&cLeft click - Attack/Break");
    } else if (key.includes("key.mouse.right")) {
      Chat.actionbar("&eRight click - Use/Interact");
    } else if (key.includes("key.mouse.middle")) {
      Chat.actionbar("&bMiddle click - Pick block");
    }
  }

  // Handle modifier combinations
  if (modifiers.length > 0 && action === 1) {
    const modKeyNames = modifiers.split("+");

    // Ctrl+Shift combinations
    if (modifiers.includes("key.keyboard.left.control") && modifiers.includes("key.keyboard.left.shift")) {
      if (key.includes("key.keyboard.q")) {
        Chat.actionbar("&6Stack drop");
        Chat.log("&6Dropping entire stack!");
      }
    }

    // Alt combinations
    if (modifiers.includes("key.keyboard.left.alt")) {
      Chat.log(`&eAlt+${keyName} combination`);
    }
  }

  // Custom key bindings
  // if (key === "your.custom.key" && action === 1) {
  //   handleCustomKeyBinding();
  // }
}));

function getKeyName(translationKey) {
  const keyMap = {
    "key.keyboard.w": "W",
    "key.keyboard.a": "A",
    "key.keyboard.s": "S",
    "key.keyboard.d": "D",
    "key.keyboard.space": "Space",
    "key.keyboard.shift": "Shift",
    "key.keyboard.control": "Ctrl",
    "key.keyboard.alt": "Alt",
    "key.keyboard.e": "E",
    "key.keyboard.escape": "Esc",
    "key.keyboard.f": "F",
    "key.keyboard.q": "Q",
    "key.mouse.left": "Left Mouse",
    "key.mouse.right": "Right Mouse",
    "key.mouse.middle": "Middle Mouse"
  };
  return keyMap[translationKey] || translationKey;
}

function getModifierNames(modifiers) {
  if (modifiers.length === 0) return "";

  const modNames = modifiers.split("+").map(mod => {
    if (mod.includes("shift")) return "Shift";
    if (mod.includes("control")) return "Ctrl";
    if (mod.includes("alt")) return "Alt";
    return mod;
  }).join("+");

  return `(${modNames})`;
}
```

## Fields
- [event.action](#eventaction)
- [event.key](#eventkey)
- [event.mods](#eventmods)

## Methods
- [event.toString()](#eventtostring)
- [EventKey.getKeyModifiers(mods)](#eventkeygetmodifiersmods)
- [EventKey.getModInt(mods)](#eventgetmodintmods)

### event.action
The key action type.

**Type:** `int`

**Notes**
- `1` - Key pressed down
- `0` - Key released

### event.key
The translation key for the pressed/released key.

**Type:** `string`

**Notes**
This uses Minecraft's translation key format:
- `'key.keyboard.a'` - A key
- `'key.keyboard.space'` - Spacebar
- `'key.mouse.left'` - Left mouse button
- `'key.mouse.right'` - Right mouse button
- etc.

### event.mods
The modifier keys that were held down when the key was pressed.

**Type:** `string`

**Notes**
Contains a `+` separated string of held modifier keys:
- `'key.keyboard.left.shift'` - Left Shift
- `'key.keyboard.left.control'` - Left Ctrl
- `'key.keyboard.left.alt'` - Left Alt
- Combinations like `'key.keyboard.left.shift+key.keyboard.left.control'`

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`

### EventKey.getKeyModifiers(mods)
Converts an integer modifier mask to a translation key string.

**Params**
* `mods` - Integer modifier mask

**Returns**
* `string` - `+` separated modifier keys

**Notes**
This is a static method for converting modifier bit masks to readable strings.

### EventKey.getModInt(mods)
Converts a translation key string to an integer modifier mask.

**Params**
* `mods` - `+` separated modifier key string

**Returns**
* `int` - Integer modifier mask

**Notes**
This is a static method for converting readable modifier strings back to integer masks.