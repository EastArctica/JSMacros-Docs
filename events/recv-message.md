# RecvMessage Event

This event is fired when a message is received from the server. Backed by class `EventRecvMessage`.

## Signature
```js
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| text   | string  | The message text received from server    |

## Behavior

* Fires when any message is received from the server
- The `text` field contains the raw message content
- Includes chat messages, system messages, server announcements
- Not cancellable
- Useful for message filtering, logging, and automated responses

## Minimal example

```js
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Message received: ${e.text}`);
});
```

## Async example

```js
JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((e) => {
  const message = e.text;
  const cleanMessage = removeFormatting(message);

  Chat.log(`&bMessage: &f${cleanMessage}`);

  // Check for mentions
  const playerName = Player.getPlayer().getName();
  if (cleanMessage.toLowerCase().includes(playerName.toLowerCase())) {
    Chat.actionbar(`&6@You were mentioned!`);
    Chat.log(`&aYou were mentioned: ${cleanMessage}`);
  }

  // Handle different message types
  if (isSystemMessage(message)) {
    handleSystemMessage(cleanMessage);
  } else if (isChatMessage(message)) {
    handleChatMessage(cleanMessage);
  } else if (isPrivateMessage(message)) {
    handlePrivateMessage(cleanMessage);
  } else if (isCommandMessage(message)) {
    handleCommandMessage(cleanMessage);
  }

  // Server-specific message handling
  if (message.includes("[Hypixel]")) {
    handleHypixelMessage(cleanMessage);
  } else if (message.includes("[2b2t]")) {
    handle2b2tMessage(cleanMessage);
  }

  // Filter and log important messages
  if (isImportantMessage(cleanMessage)) {
    Chat.log(`&6&lIMPORTANT: &f${cleanMessage}`);
    // Could send notifications or alerts
  }

  // Auto-response features
  if (shouldAutoRespond(cleanMessage)) {
    generateAutoResponse(cleanMessage);
  }
}));

function removeFormatting(message) {
  // Remove Minecraft color codes and formatting
  return message.replace(/§[0-9a-fk-or]/g, '');
}

function isSystemMessage(message) {
  return message.startsWith('[') ||
         message.includes('server') ||
         message.includes('broadcast') ||
         message.toLowerCase().includes('system');
}

function isChatMessage(message) {
  return !message.startsWith('[') &&
         !message.includes('<') &&
         !message.includes(':') ||
         message.match(/^\[.*?\].*:/); // Format: [Rank] Player: message
}

function isPrivateMessage(message) {
  return message.includes('whispers') ||
         message.includes('tells you') ||
         message.includes('-> you') ||
         message.match(/^\[.*?\] \[.*?\].*whispers/);
}

function isCommandMessage(message) {
  return message.includes('/') ||
         message.includes('help') ||
         message.includes('command');
}

function handleSystemMessage(message) {
  Chat.log(`&6[SYSTEM] ${message}`);

  // Handle specific system messages
  if (message.toLowerCase().includes('welcome')) {
    Chat.log(`&aServer welcome message received`);
  } else if (message.toLowerCase().includes('shutdown') || message.toLowerCase().includes('restart')) {
    Chat.log(`&c⚠ Server restart/shutdown detected!`);
    Chat.actionbar(`&4Server restart warning!`);
  }
}

function handleChatMessage(message) {
  // Extract player name and message content
  const match = message.match(/^\[([^\]]+)\] ([^:]+): (.+)/);
  if (match) {
    const [, rank, player, chatContent] = match;
    Chat.log(`&7${rank} &f${player}&7: &f${chatContent}`);

    // Track player activity
    logPlayerActivity(player, chatContent);
  } else {
    Chat.log(`&7[Chat] ${message}`);
  }
}

function handlePrivateMessage(message) {
  Chat.log(`&d[PM] ${message}`);
  Chat.actionbar(`&dPrivate message received!`);
}

function handleCommandMessage(message) {
  Chat.log(`&b[CMD] ${message}`);
}

function handleHypixelMessage(message) {
  if (message.includes('NICK')) {
    Chat.log(`&eHypixel nick change detected`);
  } else if (message.includes('GUILD')) {
    Chat.log(`&bGuild message: ${message}`);
  } else if (message.includes('PARTY')) {
    Chat.log(`&aParty message: ${message}`);
  }
}

function handle2b2tMessage(message) {
  if (message.includes('queue')) {
    Chat.log(`&6Queue position: ${message}`);
  } else if (message.includes('prio')) {
    Chat.log(`&6Priority queue: ${message}`);
  }
}

function isImportantMessage(message) {
  const importantKeywords = [
    'admin', 'moderator', 'op', 'warn', 'ban', 'kick',
    'shutdown', 'restart', 'emergency', 'urgent',
    'congratulations', 'achievement', 'milestone'
  ];

  return importantKeywords.some(keyword =>
    message.toLowerCase().includes(keyword.toLowerCase())
  );
}

function shouldAutoRespond(message) {
  const triggers = [
    'hello', 'hi', 'hey', 'welcome', 'thanks', 'ty',
    'gg', 'good game', 'gl', 'hf'
  ];

  return triggers.some(trigger =>
    message.toLowerCase().includes(trigger.toLowerCase())
  );
}

function generateAutoResponse(message) {
  const responses = {
    'hello': 'Hello there!',
    'hi': 'Hi!',
    'hey': 'Hey!',
    'welcome': 'Welcome!',
    'thanks': 'You\'re welcome!',
    'ty': 'np!',
    'gg': 'gg!',
    'good game': 'gg!',
    'gl': 'gl hf!',
    'hf': 'gl hf!'
  };

  for (const [trigger, response] of Object.entries(responses)) {
    if (message.toLowerCase().includes(trigger)) {
      // Note: Actually sending messages would require additional setup
      Chat.log(`&6Auto-response suggested: ${response}`);
      break;
    }
  }
}

function logPlayerActivity(playerName, message) {
  // Track player chat activity for statistics
  if (!global.playerActivity) {
    global.playerActivity = {};
  }

  if (!global.playerActivity[playerName]) {
    global.playerActivity[playerName] = {
      messages: 0,
      lastSeen: new Date()
    };
  }

  global.playerActivity[playerName].messages++;
  global.playerActivity[playerName].lastSeen = new Date();
}
```

## Fields
- [event.text](#eventtext)

## Methods
- [event.toString()](#eventtostring)

### event.text
The raw message text received from the server.

**Type:** `string`

**Notes**
This contains the original message with Minecraft formatting codes intact. You may want to remove formatting codes using regex `/§[0-9a-fk-or]/g` for clean text processing.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`