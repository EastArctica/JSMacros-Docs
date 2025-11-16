# KeyBind

Functions for getting and modifying key pressed states, and for simulating key presses. Accessible from scripts via the global `KeyBind` variable.

## Methods
- [KeyBind](#keybind)
  - [Methods](#methods)
    - [KeyBind.getKeyCode](#keybindgetkeycode)
    - [KeyBind.getKeyBindings](#keybindgetkeybindings)
    - [KeyBind.setKeyBind](#keybindsetkeybind)
    - [KeyBind.key](#keybindkey)
    - [KeyBind.pressKey](#keybindpresskey)
    - [KeyBind.releaseKey](#keybindreleasekey)
    - [KeyBind.keyBind](#keybindkeybind)
    - [KeyBind.pressKeyBind](#keybindpresskeybind)
    - [KeyBind.releaseKeyBind](#keybindreleasekeybind)
    - [KeyBind.getPressedKeys](#keybindgetpressedkeys)

### KeyBind.getKeyCode
```js
const wKeyObject = KeyBind.getKeyCode("key.keyboard.w");
```

**Params**
1. `keyName: string`: The name of the key (e.g., "key.keyboard.w", "key.mouse.left").

**Returns**
* `InputUtil.Key`: The raw Minecraft key object.

**Notes**
This method is for advanced use. For simulating key presses, it is highly recommended to use `KeyBind.keyBind()` instead.

### KeyBind.getKeyBindings
```js
const bindings = KeyBind.getKeyBindings();
const forwardKey = bindings.get("key.forward");
Chat.log(`The forward key is currently bound to: ${forwardKey}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.Map<string, string>`: A map where keys are the keybinding names (e.g., "key.forward") and values are the key names they are bound to (e.g., "key.keyboard.w").

### KeyBind.setKeyBind
```js
// Make the 'P' key open the inventory
KeyBind.setKeyBind("key.inventory", "key.keyboard.p");
```

**Params**
1. `bind: string`: The name of the keybinding to change (e.g., "key.inventory").
2. `key: string`: The name of the key to assign to the binding (e.g., "key.keyboard.p").

**Returns**
* `void`

### KeyBind.key
```js
// Hold down the 'W' key
KeyBind.key("key.keyboard.w", true);

// A short time later...
// Release the 'W' key
KeyBind.key("key.keyboard.w", false);
```
Sets the pressed state of a physical key by its name.

**Params**
1. `keyName: string`: The name of the physical key to press (e.g., "key.keyboard.w").
2. `keyState: boolean`: `true` to press the key, `false` to release it.

**Returns**
* `void`

**Notes**
This simulates a physical key press. It's often better to use `KeyBind.keyBind()` to simulate the *action* you want to perform, as it respects the user's current keybindings.

### KeyBind.pressKey
```js
// Press the left shift key
KeyBind.pressKey("key.keyboard.left.shift");
```
A convenient shortcut for `KeyBind.key(keyName, true)`.

**Params**
1. `keyName: string`: The name of the key to press.

**Returns**
* `void`

### KeyBind.releaseKey
```js
// Release the left shift key
KeyBind.releaseKey("key.keyboard.left.shift");
```
A convenient shortcut for `KeyBind.key(keyName, false)`.

**Params**
1. `keyName: string`: The name of the key to release.

**Returns**
* `void`

### KeyBind.keyBind
```js
// Hold down the "forward" key, whatever it is bound to
KeyBind.keyBind("key.forward", true);

Time.sleep(1000);

// Release the "forward" key
KeyBind.keyBind("key.forward", false);
```
Sets the pressed state of a keybinding by its name (e.g., "key.forward", "key.attack"). This is the **recommended method** for simulating in-game actions as it respects the player's control settings.

**Params**
1. `keyBind: string`: The name of the keybinding to activate.
2. `keyState: boolean`: `true` to press the keybinding, `false` to release it.

**Returns**
* `void`

### KeyBind.pressKeyBind
```js
// Start attacking
KeyBind.pressKeyBind("key.attack");
```
A convenient shortcut for `KeyBind.keyBind(keyBind, true)`.

**Params**
1. `keyBind: string`: The name of the keybinding to press.

**Returns**
* `void`

### KeyBind.releaseKeyBind
```js
// Stop attacking
KeyBind.releaseKeyBind("key.attack");
```
A convenient shortcut for `KeyBind.keyBind(keyBind, false)`.

**Params**
1. `keyBind: string`: The name of the keybinding to release.

**Returns**
* `void`

### KeyBind.getPressedKeys
```js
const pressedKeys = KeyBind.getPressedKeys();

if (pressedKeys.contains("key.keyboard.left.control") && pressedKeys.contains("key.keyboard.s")) {
    Chat.log("Ctrl+S is pressed!");
}
```

**Params**
* `(none)`

**Returns**
* `java.util.Set<string>`: A set containing the names of all keys that are currently held down.