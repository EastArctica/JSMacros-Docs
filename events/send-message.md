# SendMessage Event

This event is fired when a message is about to be sent to the server. Backed by class `EventSendMessage`.

## Signature
```js
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type    | Description                              |
| ------ | ------- | ---------------------------------------- |
| text   | string  | The message text to be sent              |

## Behavior

* Fires when a message is about to be sent to the server
- The `text` field contains the message that will be sent
- This event is cancellable - preventing the message from being sent
- Useful for message filtering, auto-correction, and command validation

## Minimal example

```js
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`About to send: ${e.text}`);
});
```

## Async example

```js
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((e) => {
  const message = e.text;
  const cleanMessage = removeFormatting(message);

  Chat.log(`&eSending message: &f${cleanMessage}`);

  // Check for commands
  if (message.startsWith('/')) {
    handleCommand(message);
  } else {
    handleChatMessage(message);
  }

  // Message filtering
  if (shouldFilterMessage(cleanMessage)) {
    e.cancel();
    Chat.log(`&cMessage blocked: ${cleanMessage}`);
    Chat.actionbar("&cYour message was blocked by filter");
    return;
  }

  // Auto-correction
  const correctedMessage = autoCorrectMessage(cleanMessage);
  if (correctedMessage !== cleanMessage) {
    Chat.log(`&6Auto-corrected: "${cleanMessage}" → "${correctedMessage}"`);
    e.text = correctedMessage;
  }

  // Message logging
  logMessage(cleanMessage);

  // Chat statistics
  updateChatStatistics(cleanMessage);
}));

function removeFormatting(message) {
  return message.replace(/§[0-9a-fk-or]/g, '');
}

function handleCommand(command) {
  const commandName = command.split(' ')[0].substring(1).toLowerCase();
  Chat.log(`&bCommand detected: /${commandName}`);

  // Command validation
  switch(commandName) {
    case 'help':
      Chat.log(`&7Help command sent`);
      break;
    case 'tp':
    case 'teleport':
      Chat.log(`&6Teleport command sent`);
      break;
    case 'gamemode':
      Chat.log(`&eGame mode change command sent`);
      break;
    case 'give':
      Chat.log(`&dGive command sent`);
      break;
    case 'spawn':
      Chat.log(`&aSpawn command sent`);
      break;
    case 'home':
      Chat.log(`&6Home command sent`);
      break;
    case 'warp':
      Chat.log(`&bWarp command sent`);
      break;
    default:
      Chat.log(`&7Unknown command: /${commandName}`);
  }

  // Check for dangerous commands
  const dangerousCommands = ['op', 'deop', 'stop', 'restart', 'ban', 'kick'];
  if (dangerousCommands.includes(commandName)) {
    Chat.log(`&c⚠ DANGEROUS COMMAND DETECTED: /${commandName}`);
    Chat.actionbar(`&cWarning: You are about to run a dangerous command!`);
  }
}

function handleChatMessage(message) {
  Chat.log(`&7Chat message: ${message}`);

  // Check for mentions
  const mentionedPlayers = extractMentions(message);
  if (mentionedPlayers.length > 0) {
    Chat.log(`&bMentioning: ${mentionedPlayers.join(', ')}`);
  }

  // Check for questions
  if (message.includes('?')) {
    Chat.log(`&6Question detected in message`);
  }

  // Check for URLs
  const urls = extractUrls(message);
  if (urls.length > 0) {
    Chat.log(`&dURL detected: ${urls.join(', ')}`);
  }

  // Check for caps (potential shouting)
  if (isMostlyCaps(message) && message.length > 5) {
    Chat.log(`&eMessage appears to be in ALL CAPS`);
  }

  // Word count and length analysis
  const wordCount = message.split(' ').length;
  const charCount = message.length;
  Chat.log(`&7Stats: ${wordCount} words, ${charCount} characters`);
}

function shouldFilterMessage(message) {
  const filteredWords = [
    'spam', 'advertisement', 'discord', 'server ip',
    'hack', 'cheat', 'exploit'
  ];

  const lowerMessage = message.toLowerCase();
  return filteredWords.some(word => lowerMessage.includes(word));
}

function autoCorrectMessage(message) {
  // Simple auto-correction examples
  let corrected = message;

  // Common typos
  const corrections = {
    'teh': 'the',
    'adn': 'and',
    'taht': 'that',
    'wat': 'what',
    'wen': 'when',
    'wer': 'where',
    'yuo': 'you',
    'fro': 'for',
    'freind': 'friend'
  };

  for (const [wrong, right] of Object.entries(corrections)) {
    corrected = corrected.replace(new RegExp(`\\b${wrong}\\b`, 'gi'), right);
  }

  return corrected;
}

function extractMentions(message) {
  const mentions = message.match(/@(\w+)/g);
  return mentions ? mentions.map(m => m.substring(1)) : [];
}

function extractUrls(message) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return message.match(urlPattern) || [];
}

function isMostlyCaps(message) {
  const letters = message.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 3) return false;

  const caps = letters.replace(/[a-z]/g, '').length;
  return (caps / letters.length) > 0.7;
}

function logMessage(message) {
  if (!global.messageLog) {
    global.messageLog = [];
  }

  global.messageLog.push({
    message: message,
    timestamp: new Date().toISOString(),
    type: message.startsWith('/') ? 'command' : 'chat'
  });

  // Keep log size manageable
  if (global.messageLog.length > 100) {
    global.messageLog = global.messageLog.slice(-50);
  }
}

function updateChatStatistics(message) {
  if (!global.chatStats) {
    global.chatStats = {
      totalMessages: 0,
      totalCommands: 0,
      totalChars: 0,
      totalWords: 0
    };
  }

  global.chatStats.totalMessages++;
  if (message.startsWith('/')) {
    global.chatStats.totalCommands++;
  }
  global.chatStats.totalChars += message.length;
  global.chatStats.totalWords += message.split(' ').length;

  // Display stats every 10 messages
  if (global.chatStats.totalMessages % 10 === 0) {
    Chat.log(`&dChat stats: ${global.chatStats.totalMessages} messages, ${global.chatStats.totalCommands} commands`);
  }
}

// Example: Prevent certain messages from being sent
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((e) => {
  const message = e.text.toLowerCase();

  // Prevent accidental command execution
  if (message.startsWith('//') && !message.startsWith('///')) {
    e.cancel();
    Chat.actionbar("&cDouble slash command blocked (use /// for comments)");
    return;
  }

  // Prevent messages that might look like server commands
  if (message.includes('op me') || message.includes('give me')) {
    e.cancel();
    Chat.actionbar("&cSuspicious message blocked");
    return;
  }
}));
```

## Fields
- [event.text](#eventtext)

## Methods
- [event.toString()](#eventtostring)

### event.text
The message text that will be sent to the server.

**Type:** `string`

**Notes**
This field can be modified before the message is sent. Changes will be reflected in the message that actually gets sent to the server. The event can be cancelled to prevent the message from being sent entirely.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`