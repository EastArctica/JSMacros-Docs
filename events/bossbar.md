# Bossbar Event

This event is fired when boss bar information is updated. Backed by class `EventBossbar`.

## Signature
```js
JsMacros.on("Bossbar", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type         | Description                                |
| ------ | ------------ | ------------------------------------------ |
| bossBar | BossBarHelper | The boss bar helper object (can be null)   |
| uuid    | string       | The UUID of the boss bar                   |
| type    | string       | The type of boss bar update that occurred |

## Behavior

* Fires when a boss bar is added, removed, or updated
* The `bossBar` field will be `null` for "REMOVE" events
* The `type` field indicates what specifically changed about the boss bar
* Not cancellable

## Minimal example

```js
JsMacros.on("Bossbar", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Bossbar update: ${e.type} for UUID: ${e.uuid}`);
  if (e.bossBar) {
    Chat.log(`Bossbar name: ${e.bossBar.getName()}`);
  }
});
```

## Async example

```js
JsMacros.on("Bossbar", JavaWrapper.methodToJavaAsync((e) => {
  const type = e.type;
  const uuid = e.uuid;

  let message = `&6Bossbar: &f${type}`;

  if (e.bossBar) {
    const name = e.bossBar.getName();
    const percent = Math.round(e.bossBar.getPercent() * 100);
    message += ` &7- &f${name} &7(${percent}%)`;
  } else {
    message += ` &7- &fUUID: ${uuid.substring(0, 8)}`;
  }

  Chat.log(message);

  if (type === "ADD") {
    Chat.actionbar("&cBoss appeared!");
  } else if (type === "REMOVE") {
    Chat.actionbar("&aBoss defeated!");
  }
}));
```

## Fields
- [event.bossBar](#eventbossbar)
- [event.uuid](#eventuuid)
- [event.type](#eventtype)

## Methods
- [event.toString()](#eventtostring)

### event.bossBar
A helper object containing information about the boss bar.

**Type:** `BossBarHelper` | `null`

**Notes**
This field will be `null` for "REMOVE" events since the boss bar no longer exists. For other event types, it contains methods to get the boss bar name, percentage, color, and other properties.

### event.uuid
The unique identifier for this boss bar.

**Type:** `string`

**Notes**
This UUID can be used to track specific boss bars across multiple events. The format is a standard UUID string.

### event.type
The type of update that occurred for the boss bar.

**Type:** `string`

**Notes**
Possible values:
- `'ADD'` - A new boss bar was created
- `'REMOVE'` - The boss bar was removed
- `'UPDATE_PERCENT'` - The health percentage changed
- `'UPDATE_NAME'` - The boss bar name changed
- `'UPDATE_STYLE'` - The visual style changed
- `'UPDATE_PROPERTIES'` - Other properties (like visibility, color, etc.) changed

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`