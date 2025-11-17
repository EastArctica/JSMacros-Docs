# NameChange Event

This event is fired when a player's name changes in the world. Backed by class `EventNameChange`.

## Signature
```js
JsMacros.on("NameChange", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| oldName | string  | The previous name of the player          |
| newName | string  | The new name of the player               |

## Behavior

* Fires when a player's display name changes
- The `oldName` field contains the previous name
- The `newName` field contains the current name
- Not cancellable
- Useful for tracking player identity changes

## Minimal example

```js
JsMacros.on("NameChange", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`${e.oldName} is now known as ${e.newName}`);
});
```

## Async example

```js
JsMacros.on("NameChange", JavaWrapper.methodToJavaAsync((e) => {
  const oldName = e.oldName;
  const newName = e.newName;

  Chat.log(`&6Name Change Detected:`);
  Chat.log(`&7Old name: &f${oldName}`);
  Chat.log(`&7New name: &f${newName}`);

  // Check if this is the local player
  const playerName = Player.getPlayer().getName();
  if (newName === playerName) {
    Chat.log(`&aYour name has changed from ${oldName} to ${newName}!`);
    Chat.actionbar(`&aYou are now known as ${newName}`);
  } else {
    Chat.log(`&ePlayer ${oldName} is now known as ${newName}`);
    Chat.actionbar(`&e${oldName} → ${newName}`);
  }

  // Log significant name changes
  if (oldName.toLowerCase() !== newName.toLowerCase()) {
    Chat.log(`&dSignificant name change detected!`);

    // Could be a nickname system or mod-related change
    Chat.log(`&7This might be a nickname or rank change.`);
  }

  // Check for rank prefixes
  const rankFromOld = extractRank(oldName);
  const rankFromNew = extractRank(newName);

  if (rankFromOld !== rankFromNew) {
    Chat.log(`&cRank change detected!`);
    Chat.log(`&7Old rank: &f${rankFromOld || 'None'}`);
    Chat.log(`&7New rank: &f${rankFromNew || 'None'}`);
  }

  // Update player tracking systems
  // updatePlayerAlias(oldName, newName);

  // Log for moderation purposes
  if (shouldLogNameChange(oldName, newName)) {
    Chat.log(`&8[Log] Name change: ${oldName} → ${newName} at ${new Date().toLocaleString()}`);
  }

  // Check for suspicious name changes
  if (isSuspiciousNameChange(oldName, newName)) {
    Chat.log(`&c⚠ Suspicious name change detected!`);
    Chat.log(`&cPlease verify this is legitimate.`);
  }
}));

function extractRank(name) {
  // Extract rank prefixes like [Admin], [VIP], etc.
  const rankMatch = name.match(/^\[([^\]]+)\]/);
  return rankMatch ? rankMatch[1] : null;
}

function shouldLogNameChange(oldName, newName) {
  // Log changes that might be important
  return (
    oldName.length !== newName.length ||
    oldName.toLowerCase() !== newName.toLowerCase() ||
    extractRank(oldName) !== extractRank(newName)
  );
}

function isSuspiciousNameChange(oldName, newName) {
  // Define what might be suspicious
  const suspiciousPatterns = [
    /\d/, // Numbers in names
    /admin/i, // Admin impersonation
    /moderator/i, // Mod impersonation
    /\.{3,}/, // Multiple periods
    /[A-Z]{5,}/ // Long uppercase sequences
  ];

  return suspiciousPatterns.some(pattern => pattern.test(newName));
}
```

## Fields
- [event.oldName](#eventoldname)
- [event.newName](#eventnewname)

## Methods
- [event.toString()](#eventtostring)

### event.oldName
The previous name of the player.

**Type:** `string`

**Notes**
This contains the player's name before the change occurred. It may include rank prefixes, colors, or other formatting depending on the server setup.

### event.newName
The new name of the player.

**Type:** `string`

**Notes**
This contains the player's current name after the change. It may include rank prefixes, colors, or other formatting depending on the server setup.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`