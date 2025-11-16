# JavaWrapper

A crucial utility for wrapping script functions into a format that Java can understand and execute. This is essential for creating callbacks for events, GUI elements, or any other scenario where Java code needs to trigger script code. Accessible from scripts via the global `JavaWrapper` variable.

This library handles the different threading models of various scripting languages to ensure stability:
- **JavaScript/JEP (Python):** These languages have a single-threaded execution model. `JavaWrapper` manages a queue to ensure that calls from different Java threads are executed one at a time, preventing race conditions and crashes.
- **Jython/Lua:** These languages do not have the same strict single-threaded limitations, and calls are handled more directly.

> **Note:** This library was previously available as the `consumer` global variable. `JavaWrapper` is the modern name.

## Methods
- [JavaWrapper](#javawrapper)
  - [Methods](#methods)
    - [JavaWrapper.methodToJava](#javawrappermethodtojava)
    - [JavaWrapper.methodToJavaAsync](#javawrappermethodtojavaasync)
      - [Overloads](#overloads)
    - [JavaWrapper.deferCurrentTask](#javawrapperdefercurrenttask)
      - [Overloads](#overloads-1)
    - [JavaWrapper.getCurrentPriority](#javawrappergetcurrentpriority)
    - [JavaWrapper.stop](#javawrapperstop)

### JavaWrapper.methodToJava
```js
const screen = Hud.createScreen("My Screen", true);
const callback = JavaWrapper.methodToJava(() => {
    Chat.log("Button was clicked!");
    screen.close();
});
screen.addButton(10, 10, 100, 20, "Click Me", callback);
Hud.openScreen(screen);
```

Wraps a script function into a Java-compatible `MethodWrapper`. When Java invokes this wrapper, the calling Java thread will **block** and wait for the script function to complete. This is suitable for simple, quick callbacks like button clicks.

**Params**
1. `c: function`: The script function to wrap.

**Returns**
* `MethodWrapper`: A Java object that can be passed to JSMacros or Minecraft functions that expect a callback.

### JavaWrapper.methodToJavaAsync
```js
// Create an asynchronous callback for the 'Tick' event
const onTick = JavaWrapper.methodToJavaAsync(() => {
    // This code runs every tick without freezing the game
});
const listener = JsMacros.on('Tick', onTick);

// Create a high-priority async callback
const onChat = JavaWrapper.methodToJavaAsync(100, (event, context) => {
    // This chat handler will likely run before others
    Chat.log("High priority chat listener fired!");
});
const chatListener = JsMacros.on('RecvMessage', onChat);
```

Wraps a script function for **asynchronous** execution. When Java invokes this wrapper, the script function is added to an execution queue, and the Java thread continues immediately without waiting. This is essential for event listeners (like `Tick` or `RecvMessage`) that fire on critical game threads, as it prevents the game from freezing.

**Params**
1. `priority?: int = 0`: (JavaScript/JEP only) The priority of the task in the execution queue. Higher numbers are executed first.
2. `c: function`: The script function to wrap.

**Returns**
* `MethodWrapper`: A Java object that can be passed to JSMacros or Minecraft functions.

#### Overloads
- `JavaWrapper.methodToJavaAsync(c: function)`
- `JavaWrapper.methodToJavaAsync(priority: int, c: function)`

### JavaWrapper.deferCurrentTask
```js
// Example of a long-running task that yields to other events
const longTask = () => {
    while (true) {
        // do some work...
        Time.sleep(10); // prevent 100% cpu usage
        JavaWrapper.deferCurrentTask(); // Move to the back of the queue to let other events run
    }
};
// Run this in a separate thread to not block the main script
JsMacros.runScript("path/to/script/with/longTask.js", true);
```

(JavaScript/JEP only) Puts the currently executing task at the back of the execution queue, allowing other pending tasks to run. This is an advanced feature for long-running loops or tasks within an event callback that need to avoid blocking other events for too long.

**Params**
1. `priorityAdjust?: int = 0`: An amount to add to the task's current priority before it is re-queued.

**Returns**
* `void`

**Notes**
Use with caution to avoid deadlocks or circular waiting scenarios.

#### Overloads
- `JavaWrapper.deferCurrentTask()`
- `JavaWrapper.deferCurrentTask(priorityAdjust: int)`

### JavaWrapper.getCurrentPriority
```js
const onTick = JavaWrapper.methodToJavaAsync(() => {
    const priority = JavaWrapper.getCurrentPriority();
    Chat.log(`This tick task is running with priority: ${priority}`);
});
JsMacros.on('Tick', onTick);
```

(JavaScript/JEP only) Gets the priority of the currently executing task.

**Params**
* `(none)`

**Returns**
* `int`: The priority of the current task.

### JavaWrapper.stop
```js
const file = FS.open("config.json");
const content = file.read();
file.close();

if (!content) {
    Chat.log("&cError: config.json is empty! Stopping script.");
    JavaWrapper.stop();
}

// This part will not be reached if the file is empty
Chat.log("Config loaded successfully.");
```

Stops the execution of the current script context.

**Params**
* `(none)`

**Returns**
* `void`