# SignEdit Event

This event is fired when a sign is being edited. Backed by class `EventSignEdit`.

## Signature
```js
JsMacros.on("SignEdit", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field      | Type    | Description                              |
| ---------- | ------- | ---------------------------------------- |
| pos        | Pos3D   | The position of the sign being edited    |
| closeScreen | boolean | Whether to close the sign editing screen |
| front      | boolean | Whether editing the front of the sign    |
| signText   | List    | The current text on the sign             |

## Behavior

* Fires when a player edits a sign
- The `pos` field contains the sign's world position
- The `signText` field contains the current sign text lines
- This event is cancellable - preventing the sign edit
- Useful for sign filtering, validation, and automation

## Minimal example

```js
JsMacros.on("SignEdit", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Editing sign at ${e.pos.x}, ${e.pos.y}, ${e.pos.z}`);
}));
```

## Async example

```js
JsMacros.on("SignEdit", JavaWrapper.methodToJavaAsync((e) => {
  const pos = e.pos;
  const signText = e.signText;
  const isFront = e.front;
  const side = isFront ? "front" : "back";

  Chat.log(`&dSign Edit: &f[${pos.x}, ${pos.y}, ${pos.z}] &7(${side})`);

  // Display current sign text
  if (signText && signText.length > 0) {
    Chat.log(`&7Current sign text:`);
    signText.forEach((line, index) => {
      if (line && line.trim()) {
        Chat.log(`&7Line ${index + 1}: &f${line}`);
      }
    });
  } else {
    Chat.log(`&7Sign is currently empty`);
  }

  // Sign content validation
  const validation = validateSignContent(signText);
  if (!validation.valid) {
    Chat.log(`&cSign validation failed: ${validation.reason}`);
    Chat.actionbar(`&cInvalid sign content: ${validation.reason}`);

    // Option 1: Block the sign edit
    // e.cancel();

    // Option 2: Show warning but allow
    Chat.log(`&6Warning: Sign contains problematic content`);
  }

  // Auto-format signs
  if (shouldAutoFormat(signText)) {
    const formattedText = formatSignText(signText);
    Chat.log(`&6Auto-formatting sign text...`);
    // Note: Actually modifying sign text would require additional API calls
  }

  // Check for specific sign types
  if (isShopSign(signText)) {
    handleShopSign(pos, signText);
  } else if (isWarpSign(signText)) {
    handleWarpSign(pos, signText);
  } else if (isInfoSign(signText)) {
    handleInfoSign(pos, signText);
  } else if (isWarningSign(signText)) {
    handleWarningSign(pos, signText);
  }

  // Log sign location for mapping
  logSignLocation(pos, signText, side);

  // Check for protected areas
  if (isProtectedArea(pos)) {
    Chat.log(`&cWarning: Editing sign in protected area!`);
    Chat.actionbar(`&cThis area might be protected!`);
  }

  // Sign statistics
  updateSignStatistics(signText);
}));

function validateSignContent(signText) {
  if (!signText || signText.length === 0) {
    return { valid: true, reason: null };
  }

  const fullText = signText.join(' ').toLowerCase();

  // Check for banned words
  const bannedWords = ['spam', 'advertisement', 'discord.gg', 'server ip'];
  for (const word of bannedWords) {
    if (fullText.includes(word)) {
      return { valid: false, reason: `Contains banned word: ${word}` };
    }
  }

  // Check for suspicious patterns
  if (fullText.includes('op me') || fullText.includes('give me')) {
    return { valid: false, reason: 'Contains suspicious command-like content' };
  }

  // Check for excessive caps
  const letters = fullText.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 10) {
    const caps = letters.replace(/[a-z]/g, '').length;
    if (caps / letters.length > 0.8) {
      return { valid: false, reason: 'Excessive use of capital letters' };
    }
  }

  return { valid: true, reason: null };
}

function shouldAutoFormat(signText) {
  if (!signText || signText.length === 0) return false;

  // Check if sign needs formatting
  return signText.some(line =>
    line && (line.includes('shop') || line.includes('warp') || line.includes('info'))
  );
}

function formatSignText(signText) {
  return signText.map(line => {
    if (!line) return line;

    // Capitalize first letter of each line
    return line.charAt(0).toUpperCase() + line.slice(1);
  });
}

function isShopSign(signText) {
  if (!signText || signText.length === 0) return false;

  const shopKeywords = ['shop', 'buy', 'sell', 'b', 's', 'trade'];
  const text = signText.join(' ').toLowerCase();

  return shopKeywords.some(keyword => text.includes(keyword));
}

function isWarpSign(signText) {
  if (!signText || signText.length === 0) return false;

  const warpKeywords = ['warp', 'spawn', 'home', 'teleport', 'tp'];
  const text = signText.join(' ').toLowerCase();

  return warpKeywords.some(keyword => text.includes(keyword));
}

function isInfoSign(signText) {
  if (!signText || signText.length === 0) return false;

  const infoKeywords = ['info', 'welcome', 'rules', 'help', 'guide'];
  const text = signText.join(' ').toLowerCase();

  return infoKeywords.some(keyword => text.includes(keyword));
}

function isWarningSign(signText) {
  if (!signText || signText.length === 0) return false;

  const warningKeywords = ['warning', 'danger', 'keep out', 'private', 'no entry'];
  const text = signText.join(' ').toLowerCase();

  return warningKeywords.some(keyword => text.includes(keyword));
}

function handleShopSign(pos, signText) {
  Chat.log(`&6Shop sign detected at [${pos.x}, ${pos.y}, ${pos.z}]`);

  // Extract shop information
  if (signText.length >= 2) {
    const itemLine = signText[1];
    const priceLine = signText[2] || '';

    Chat.log(`&7Item: &f${itemLine}`);
    Chat.log(`&7Price: &f${priceLine}`);
  }
}

function handleWarpSign(pos, signText) {
  Chat.log(`&bWarp sign detected at [${pos.x}, ${pos.y}, ${pos.z}]`);

  // Extract destination
  const destination = signText.find(line => line && !line.toLowerCase().includes('warp'));
  if (destination) {
    Chat.log(`&7Destination: &f${destination}`);
  }
}

function handleInfoSign(pos, signText) {
  Chat.log(`&aInfo sign detected at [${pos.x}, ${pos.y}, ${pos.z}]`);

  // Display info content
  signText.forEach((line, index) => {
    if (line && line.trim()) {
      Chat.log(`&7${index + 1}. &f${line}`);
    }
  });
}

function handleWarningSign(pos, signText) {
  Chat.log(`&cWarning sign detected at [${pos.x}, ${pos.y}, ${pos.z}]`);

  // Display warning
  const warningText = signText.find(line => line && line.trim());
  if (warningText) {
    Chat.log(`&cWarning: &f${warningText}`);
  }
}

function logSignLocation(pos, signText, side) {
  if (!global.signLocations) {
    global.signLocations = [];
  }

  global.signLocations.push({
    x: pos.x,
    y: pos.y,
    z: pos.z,
    text: signText,
    side: side,
    timestamp: new Date().toISOString()
  });

  // Keep log manageable
  if (global.signLocations.length > 100) {
    global.signLocations = global.signLocations.slice(-50);
  }
}

function isProtectedArea(pos) {
  // Example: Check if position is in a protected zone
  const protectedZones = [
    { x1: 100, z1: 100, x2: 200, z2: 200, name: "Spawn" },
    { x1: -50, z1: -50, x2: 50, z2: 50, name: "Main Plaza" }
  ];

  return protectedZones.some(zone =>
    pos.x >= zone.x1 && pos.x <= zone.x2 &&
    pos.z >= zone.z1 && pos.z <= zone.z2
  );
}

function updateSignStatistics(signText) {
  if (!global.signStats) {
    global.signStats = {
      totalSigns: 0,
      shopSigns: 0,
      warpSigns: 0,
      infoSigns: 0,
      warningSigns: 0,
      emptySigns: 0
    };
  }

  global.signStats.totalSigns++;

  if (isShopSign(signText)) global.signStats.shopSigns++;
  if (isWarpSign(signText)) global.signStats.warpSigns++;
  if (isInfoSign(signText)) global.signStats.infoSigns++;
  if (isWarningSign(signText)) global.signStats.warningSigns++;

  if (!signText || signText.every(line => !line || !line.trim())) {
    global.signStats.emptySigns++;
  }
}
```

## Fields
- [event.pos](#eventpos)
- [event.closeScreen](#eventclosescreen)
- [event.front](#eventfront)
- [event.signText](#eventsigntext)

## Methods
- [event.toString()](#eventtostring)

### event.pos
The world position of the sign being edited.

**Type:** `Pos3D`

**Notes**
This contains the X, Y, and Z coordinates of the sign block in the world.

### event.closeScreen
Whether to close the sign editing screen.

**Type:** `boolean`

**Notes**
This can be modified to control whether the sign editing interface should be closed after processing.

### event.front
Whether editing the front or back of the sign.

**Type:** `boolean`

**Notes**
- `true` - Editing the front side of the sign
- `false` - Editing the back side of the sign

### event.signText
The current text lines on the sign.

**Type:** `List<string>` | `null`

**Notes**
This contains up to 4 lines of sign text. Lines may be empty or null. This can be modified to change the sign content.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`