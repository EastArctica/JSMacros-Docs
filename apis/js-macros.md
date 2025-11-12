# JsMacros

Core functions for interacting with the JsMacros mod itself, including running scripts, managing events, and accessing configuration. Accessible from scripts via the global `JsMacros` variable.

## Methods
- [JsMacros.getProfile](#jsmacrosgetprofile)
- [JsMacros.getConfig](#jsmacrosgetconfig)
- [JsMacros.getServiceManager](#jsmacrosgetservicemanager)
- [JsMacros.getOpenContexts](#jsmacrosgetopencontexts)
- [JsMacros.runScript](#jsmacrosrunscript)
- [JsMacros.wrapScriptRun](#jsmacroswrapscriptrun)
- [JsMacros.wrapScriptRunAsync](#jsmacroswrapscriptrunasync)
- [JsMacros.open](#jsmacrosopen)
- [JsMacros.openUrl](#jsmacrosopenurl)
- [JsMacros.on](#jsmacroson)
- [JsMacros.once](#jsmacrosonce)
- [JsMacros.off](#jsmacrosoff)
- [JsMacros.disableAllListeners](#jsmacrosdisablealllisteners)
- [JsMacros.disableScriptListeners](#jsmacrosdisablescriptlisteners)
- [JsMacros.waitForEvent](#jsmacroswaitforevent)
- [JsMacros.listeners](#jsmacroslisteners)
- [JsMacros.createEventFilterer](#jsmacroscreateeventfilterer)
- [JsMacros.createComposedEventFilterer](#jsmacroscreatecomposedeventfilterer)
- [JsMacros.createModulusEventFilterer](#jsmacroscreatemoduluseventfilterer)
- [JsMacros.invertEventFilterer](#jsmacrosinverteventfilterer)
- [JsMacros.createCustomEvent](#jsmacroscreatecustomevent)
- [JsMacros.assertEvent](#jsmacrosassertevent)

### JsMacros.getProfile
```js
const profile = JsMacros.getProfile();
Chat.log(`Current profile: ${profile.getName()}`);
```

**Params**
* `(none)`

**Returns**
* `BaseProfile`: The JsMacros profile class, for managing profiles.

### JsMacros.getConfig
```js
const config = JsMacros.getConfig();
// Note: Direct config interaction is advanced.
```

**Params**
* `(none)`

**Returns**
* `ConfigManager`: The JsMacros config management class.

### JsMacros.getServiceManager
```js
const serviceManager = JsMacros.getServiceManager();
if (serviceManager.isServiceRunning("my_service.js")) {
    Chat.log("My service is running.");
}
```

**Params**
* `(none)`

**Returns**
* `ServiceManager`: The manager for background script services.

**Notes**
Services are background scripts designed to run persistently and are primarily noticed by their side effects.

### JsMacros.getOpenContexts
```js
const contexts = JsMacros.getOpenContexts();
Chat.log(`There are ${contexts.size()} scripts currently running.`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<BaseScriptContext<?>>`: A list of all currently active (non-garbage-collected) script contexts.

### JsMacros.runScript
```js
// Run a script from a file
JsMacros.runScript("utility/helper.js");

// Run a script and pass data to it
const customEvent = JsMacros.createCustomEvent("customDataEvent");
customEvent.put("playerName", "Steve");
customEvent.put("task", "mine");
JsMacros.runScript("task_handler.js", customEvent);
// Inside task_handler.js, you can access these with:
// const playerName = event.get("playerName"); // "Steve"
// const task = event.get("task"); // "mine"

// Run a script from a string
JsMacros.runScript("javascript", "Chat.log('Hello from a string!')");
```

Executes a script. This can be a script file or a string of code in a specified language. You can optionally provide a custom event to pass arguments and a callback to handle completion or errors.

**Params**
- `file: string`: The path to the script file, relative to the `jsmacros/macros` folder.
- `language: string`: The name of the language to execute the script in (e.g., "javascript").
- `script: string`: The string of code to execute.
- `fakeEvent?: BaseEvent`: A custom event object (created with `JsMacros.createCustomEvent`) used to pass data to the script. The script receives this as its `event` variable.
- `callback?: MethodWrapper(error: Throwable)`: A function to be called when the script finishes or throws an error. It receives the `Throwable` error object if one occurred, otherwise `null`.

**Returns**
* `EventContainer<?>`: The container in which the script is running.

#### Overloads
- `runScript(file: string)`
- `runScript(file: string, fakeEvent: BaseEvent)`
- `runScript(file: string, fakeEvent: BaseEvent, callback: function)`
- `runScript(language: string, script: string)`
- `runScript(language: string, script: string, callback: function)`
- `runScript(language: string, script: string, file: string, callback: function)`
- `runScript(language: string, script: string, file: string, event: BaseEvent, callback: function)`

### JsMacros.wrapScriptRun
```js
const screen = Hud.createScreen("Wrapper Demo", true);
const scriptRunner = JsMacros.wrapScriptRun("my_button_script.js");
screen.addButton(10, 10, 100, 20, "Run Script", scriptRunner);
Hud.openScreen(screen);
```
Wraps a script execution into a `MethodWrapper`. When the wrapper is called (e.g., by a button click), the specified script will run. The calling thread will **block** until the script completes.

**Params**
- `file: string`: The path to the script file.
- `language?: string`: The language of the script string.
- `script?: string`: The script code as a string.

**Returns**
* `MethodWrapper`: A Java-compatible callback that runs the script.

### JsMacros.wrapScriptRunAsync
```js
const onDeathCallback = JsMacros.wrapScriptRunAsync("on_death_handler.js");
JsMacros.on("PlayerDeath", onDeathCallback);
```
Similar to `wrapScriptRun`, but the script is executed **asynchronously**. The calling thread does not block, making this suitable for event listeners on critical game threads.

**Params**
- `file: string`: The path to the script file.
- `language?: string`: The language of the script string.
- `script?: string`: The script code as a string.

**Returns**
* `MethodWrapper`: A Java-compatible callback that runs the script asynchronously.

### JsMacros.open
**Deprecated.**
```js
// Deprecated:
// JsMacros.open("my_file.txt");
```
Opens a file with the default system program.

**Params**
1. `path: string`: The path to the file, relative to the script's folder.

**Returns**
* `void`

### JsMacros.openUrl
**Deprecated.**
```js
// Deprecated:
// JsMacros.openUrl("https://jsmacros.wagyourtail.xyz/");
```

**Params**
1. `url: string`: The URL to open in the default web browser.

**Returns**
* `void`

### JsMacros.on
```js
// Listen for chat messages
const onChat = (event, context) => {
    Chat.log(`Received message: ${event.text.getString()}`);
};
const chatListener = JsMacros.on('RecvMessage', JavaWrapper.methodToJavaAsync(onChat));

// To stop listening later:
// JsMacros.off('RecvMessage', chatListener);
```
Registers a persistent listener for a given event.

**Params**
1. `event: string`: The name of the event to listen for.
2. `filterer?: EventFilterer`: An optional event filter to improve performance for high-frequency events.
3. `joined?: boolean = false`: If `true`, the callback runs on the game thread, blocking it until completion (dangerous). Defaults to `false` (asynchronous).
4. `callback: MethodWrapper(event: BaseEvent, context: EventContainer)`: The function to execute when the event fires. Use `JavaWrapper.methodToJavaAsync()` for this.

**Returns**
* `IEventListener`: The listener object, which can be used with `JsMacros.off()` to unregister it.

### JsMacros.once
```js
// Wait for the next time the player jumps
JsMacros.once('Key', JavaWrapper.methodToJavaAsync((event, context) => {
    if (event.key === 'key.keyboard.space' && event.action === 1) {
        Chat.log("Player jumped!");
        context.release(); // Necessary for 'once' with a filter
    }
}));
```
Registers a listener that automatically unregisters itself after it has been triggered once.

**Params**
- Same as `JsMacros.on()`.

**Returns**
* `IEventListener`: The listener object.

### JsMacros.off
```js
const listener = JsMacros.on('Tick', ...);

// Later in the script...
const success = JsMacros.off('Tick', listener);
if (success) {
    Chat.log("Tick listener removed.");
}
```
Unregisters an event listener.

**Params**
1. `event?: string`: The name of the event the listener is registered to.
2. `listener: IEventListener`: The listener object that was returned by `JsMacros.on()` or `JsMacros.once()`.

**Returns**
* `boolean`: `true` if the listener was successfully removed.

#### Overloads
- `off(listener: IEventListener)`
- `off(event: string, listener: IEventListener)`

### JsMacros.disableAllListeners
```js
// Warning: This is a destructive action.
JsMacros.disableAllListeners("Tick"); // Disables all tick listeners, including internal ones.
JsMacros.disableAllListeners();       // Disables ALL listeners for ALL events.
```
Disables **all** listeners for a given event, or for all events if none is specified. This includes internal JsMacros listeners and can break functionality. Use with extreme caution.

**Params**
1. `event?: string`: The event to clear all listeners from.

**Returns**
* `void`

### JsMacros.disableScriptListeners
```js
// Safely disable all listeners created by user scripts
JsMacros.disableScriptListeners();

// Disable only user-created listeners for the 'Key' event
JsMacros.disableScriptListeners('Key');
```
Disables all listeners created by user scripts (via `on`, `once`, `waitForEvent`). This is a much safer way to "reset" event handling than `disableAllListeners`.

**Params**
1. `event?: string`: The event to clear script listeners from.

**Returns**
* `void`

### JsMacros.waitForEvent
```js
Chat.log("Say 'hello' in chat...");
const result = JsMacros.waitForEvent('RecvMessage');
Chat.log(`Chat event received: ${result.event.text.getString()}`);

// Wait for a specific message
Chat.log("Now say 'stop'...");
const filter = JavaWrapper.methodToJava((event) => {
    return event.text.getString().toLowerCase() === 'stop';
});
const stopResult = JsMacros.waitForEvent('RecvMessage', filter);
Chat.log("Stop command received!");
```
Pauses the script's execution and waits for a specific event to occur.

**Params**
1. `event: string`: The name of the event to wait for.
2. `join?: boolean = false`: If `true`, the script waits on the game thread, blocking it.
3. `filter?: MethodWrapper(event: BaseEvent): boolean`: A function that receives the event and returns `true` if it's the one we're waiting for, or `false` to continue waiting.
4. `runBeforeWaiting?: MethodWrapper()`: A function that runs immediately before the script starts waiting. This is a thread-safety feature.

**Returns**
* `EventAndContext`: An object containing the `event` that was triggered and its execution `context`.

### JsMacros.listeners
```js
const keyListeners = JsMacros.listeners('Key');
Chat.log(`There are ${keyListeners.size()} script listeners for the Key event.`);
```

**Params**
1. `event: string`: The name of the event.

**Returns**
* `java.util.List<IEventListener>`: A list of all active script-created listeners for that event.

### JsMacros.createEventFilterer
```js
const damageFilter = JsMacros.createEventFilterer('Damage');
damageFilter.addFilter("source", "fall"); // Only listen for fall damage

JsMacros.on('Damage', damageFilter, JavaWrapper.methodToJavaAsync(event => {
    Chat.log("Ouch, fall damage!");
}));
```
Creates a filter for an event. This is highly recommended for performance when listening to frequently fired events (like `Tick` or `Render` events), as it can prevent the script from being queued for execution at all if the filter conditions are not met.

**Params**
1. `event: string`: The name of the event to create a filter for.

**Returns**
* `EventFilterer`: A new event filterer object.

### JsMacros.createComposedEventFilterer
```js
const fallDamageFilter = JsMacros.createEventFilterer('Damage').addFilter("source", "fall");
const drowningFilter = JsMacros.createEventFilterer('Damage').addFilter("source", "drown");

const composed = JsMacros.createComposedEventFilterer(fallDamageFilter);
composed.or(drowningFilter); // Trigger on fall damage OR drowning

JsMacros.on('Damage', composed, ...);
```
Creates a filter that combines multiple other filters using AND/OR logic.

**Params**
1. `initial: EventFilterer`: The first filter to start with.

**Returns**
* `FiltererComposed`: A new composed filterer.

### JsMacros.createModulusEventFilterer
```js
// Only run this listener every 20 ticks (1 second)
const everySecond = JsMacros.createModulusEventFilterer(20);
JsMacros.on('Tick', everySecond, JavaWrapper.methodToJavaAsync(event => {
    Chat.log("A second has passed!");
}));
```
Creates a filter that only lets every Nth event pass through.

**Params**
1. `quotient: int`: The interval for the event to pass (e.g., `20` for every 20th event).

**Returns**
* `FiltererModulus`: A new modulus filterer.

### JsMacros.invertEventFilterer
```js
const fallDamageFilter = JsMacros.createEventFilterer('Damage').addFilter("source", "fall");
const notFallDamageFilter = JsMacros.invertEventFilterer(fallDamageFilter);

// Listen for any damage that is NOT fall damage
JsMacros.on('Damage', notFallDamageFilter, ...);
```
Inverts the logic of a given filter.

**Params**
1. `base: EventFilterer`: The filter to invert.

**Returns**
* `EventFilterer`: The inverted filter.

### JsMacros.createCustomEvent
```js
// In script 1 (the sender)
const myEvent = JsMacros.createCustomEvent("MyCustomEvent");
myEvent.registerEvent(); // Makes it visible in the GUI
myEvent.put("message", "Hello from script 1!");
myEvent.trigger();

// In script 2 (the listener)
JsMacros.on('MyCustomEvent', JavaWrapper.methodToJavaAsync(event => {
    Chat.log(event.get("message")); // "Hello from script 1!"
}));
```
Creates a custom event object. This can be used to trigger custom event listeners or to pass data to scripts via `JsMacros.runScript()`.

**Params**
1. `eventName: string`: The unique name for the custom event.

**Returns**
* `EventCustom`: The new custom event object.

### JsMacros.assertEvent
```typescript
// Example in TypeScript
import { RecvMessageEvent } from "jsmacros-types";

JsMacros.on('RecvMessage', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'RecvMessage');
    // After this line, TypeScript knows `event` is a RecvMessageEvent
    const message: string = event.text.getString();
    Chat.log(message);
}));
```
Asserts that an event object is of a specific type. This has no effect in standard JavaScript but acts as a type guard in TypeScript, enabling type-safe access to event properties.

**Params**
1. `event: BaseEvent`: The event object to check.
2. `type: string`: The string name of the event type to assert (e.g., 'RecvMessage').

**Returns**
* `void`