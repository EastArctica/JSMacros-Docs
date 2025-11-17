# Title Event

This event is fired when a title is displayed on screen. Backed by class `EventTitle`.

## Signature
```js
JsMacros.on("Title", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| text   | string  | The title text                           |

## Behavior

* Fires when any title is displayed
- The `text` field contains the title content
- Includes server titles and game notifications
- Not cancellable
- Useful for tracking important announcements

## Example

```js
JsMacros.on("Title", JavaWrapper.methodToJavaAsync((e) => {
  const titleText = removeFormatting(e.text);

  Chat.log(`&dTitle Displayed: ${titleText}`);

  // Handle special titles
  if (titleText.toLowerCase().includes("welcome")) {
    Chat.log(`&aWelcome message received!`);
  } else if (titleText.toLowerCase().includes("warning")) {
    Chat.log(`&cWarning received: ${titleText}`);
    Chat.actionbar(`&c⚠ ${titleText}`);
  } else if (titleText.toLowerCase().includes("congratulations")) {
    Chat.log(`&6Achievement: ${titleText}`);
    Chat.actionbar(`&a🎉 ${titleText}`);
  }
}));

function removeFormatting(text) {
  return text.replace(/§[0-9a-fk-or]/g, '');
}
```

## Fields
- [event.text](#eventtext)

## Methods
- [event.toString()](#eventtostring)

### event.text
The title text that was displayed.

**Type:** `string`

**Notes**
This contains the title text as it appeared on screen, including any Minecraft formatting codes.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`