# Custom Event

This event allows you to create and trigger your own custom events with custom data. Backed by class `EventCustom`.

## Signature
```js
JsMacros.on("Custom", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field      | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| eventName  | string  | The name of the custom event             |
| joinable   | boolean | Whether the event supports joining       |
| cancelable | boolean | Whether the event can be cancelled       |

## Behavior

* Allows creation of user-defined events with custom data
* Can store various data types (int, string, double, boolean, objects)
* Events can be triggered manually using `trigger()` or `triggerAsync()`
* Custom events can be registered to appear in the GUI
* Supports both synchronous and asynchronous triggering

## Creating and triggering custom events

```js
// Create a custom event
const customEvent = new EventCustom("MyCustomEvent");
customEvent.putString("message", "Hello from custom event!");
customEvent.putInt("value", 42);

// Register the event (optional, makes it visible in GUI)
customEvent.registerEvent();

// Trigger the event
customEvent.trigger();
```

## Listening for custom events

```js
JsMacros.on("Custom", JavaWrapper.methodToJavaAsync((e) => {
  if (e.eventName === "MyCustomEvent") {
    const message = e.getString("message");
    const value = e.getInt("value");

    Chat.log(`Custom event received: ${message} - ${value}`);
  }
}));
```

## Async example

```js
// Create and trigger a custom event with async callback
const event = new EventCustom("AsyncCustomEvent");
event.putString("task", "Process data");
event.putInt("amount", 100);

// Trigger with callback that runs after listeners finish
event.triggerAsync(JavaWrapper.methodToJava(() => {
  Chat.log("&aCustom event processing completed!");
}));

// Listen for the event
JsMacros.on("Custom", JavaWrapper.methodToJavaAsync((e) => {
  if (e.eventName === "AsyncCustomEvent") {
    const task = e.getString("task");
    const amount = e.getInt("amount");

    Chat.log(`&eProcessing task: &f${task} &7(amount: ${amount})`);

    // Simulate some processing
    Time.sleep(1000);
    Chat.log(`&7Task completed: &f${task}`);
  }
}));
```

## Fields
- [event.eventName](#eventeventname)
- [event.joinable](#eventjoinable)
- [event.cancelable](#eventcancelable)

## Methods
- [event.trigger()](#eventtrigger)
- [event.triggerAsync(callback)](#eventtriggerasynccallback)
- [event.putInt(name, value)](#eventputintname-value)
- [event.putString(name, value)](#eventputstringname-value)
- [event.putDouble(name, value)](#eventputdoublename-value)
- [event.putBoolean(name, value)](#eventputbooleannamename-value)
- [event.putObject(name, value)](#eventputobjectname-value)
- [event.getType(name)](#eventgettypename)
- [event.getInt(name)](#eventgetintname)
- [event.getString(name)](#eventgetstringname)
- [event.getDouble(name)](#eventgetdoublename)
- [event.getBoolean(name)](#eventgetbooleannamename)
- [event.getObject(name)](#eventgetobjectname)
- [event.getUnderlyingMap()](#eventgetunderlyingmap)
- [event.registerEvent()](#eventregisterevent)
- [event.toString()](#eventtostring)

### event.eventName
The name of this custom event.

**Type:** `string`

**Notes**
This is the identifier used to match this event when listening. Use descriptive names to avoid conflicts with built-in events.

### event.joinable
Whether this event supports joining.

**Type:** `boolean`

**Notes**
Joinable events can have multiple listeners that run together. This is automatically set to `true` if `cancelable` is `true`.

### event.cancelable
Whether this event can be cancelled by listeners.

**Type:** `boolean`

**Notes**
If `true`, listeners can call `e.cancel()` to prevent further processing.

### event.trigger()
Triggers the event and executes all registered listeners.

**Params**
* `(none)`

**Notes**
Be careful not to cause infinite loops by triggering the same custom event from within its own listeners.

### event.triggerAsync(callback)
Triggers the event asynchronously and runs a callback after completion.

**Params**
* `callback` - Function to run after all listeners finish

**Notes**
The callback runs as a `Runnable` with no arguments and no return value.

### event.putInt(name, value)
Stores an integer value in the event data.

**Params**
* `name` - Key name for the data
* `value` - Integer value to store

**Returns**
* `int` - The value that was stored

### event.putString(name, value)
Stores a string value in the event data.

**Params**
* `name` - Key name for the data
* `value` - String value to store

**Returns**
* `string` - The value that was stored

### event.putDouble(name, value)
Stores a double value in the event data.

**Params**
* `name` - Key name for the data
* `value` - Double value to store

**Returns**
* `double` - The value that was stored

### event.putBoolean(name, value)
Stores a boolean value in the event data.

**Params**
* `name` - Key name for the data
* `value` - Boolean value to store

**Returns**
* `boolean` - The value that was stored

### event.putObject(name, value)
Stores any object value in the event data.

**Params**
* `name` - Key name for the data
* `value` - Object value to store

**Returns**
* `Object` - The value that was stored

**Notes**
Cannot store guest objects in events.

### event.getType(name)
Returns the type of data stored under the given name.

**Params**
* `name` - Key name to check

**Returns**
* `string` - One of: `'Int'`, `'String'`, `'Double'`, `'Boolean'`, `'Object'`, or `null`

### event.getInt(name)
Retrieves an integer value from the event data.

**Params**
* `name` - Key name of the data

**Returns**
* `int` | `null` - The integer value or null if not found or wrong type

### event.getString(name)
Retrieves a string value from the event data.

**Params**
* `name` - Key name of the data

**Returns**
* `string` | `null` - The string value or null if not found or wrong type

### event.getDouble(name)
Retrieves a double value from the event data.

**Params**
* `name` - Key name of the data

**Returns**
* `double` | `null` - The double value or null if not found or wrong type

### event.getBoolean(name)
Retrieves a boolean value from the event data.

**Params**
* `name` - Key name of the data

**Returns**
* `boolean` | `null` - The boolean value or null if not found or wrong type

### event.getObject(name)
Retrieves an object value from the event data.

**Params**
* `name` - Key name of the data

**Returns**
* `Object` | `null` - The object value or null if not found

### event.getUnderlyingMap()
Returns the underlying map that stores the event data.

**Params**
* `(none)`

**Returns**
* `Map<string, Object>` - The internal data map

### event.registerEvent()
Registers this custom event so it appears in the GUI.

**Params**
* `(none)`

**Notes**
This makes the custom event visible in the JsMacros GUI for easy macro creation.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`