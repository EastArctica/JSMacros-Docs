# Chat

Functions for interacting with chat. Accessible from scripts via the global `Chat` variable.

## Methods
- [Chat.log](#chatlog)
- [Chat.logf](#chatlogf)
- [Chat.logColor](#chatlogcolor)
- [Chat.say](#chatsay)
- [Chat.sayf](#chatsayf)
- [Chat.open](#chatopen)
- [Chat.title](#chattitle)
- [Chat.actionbar](#chatactionbar)
- [Chat.toast](#chattoast)
- [Chat.createTextHelperFromString](#chatcreatetexthelperfromstring)
- [Chat.createTextHelperFromTranslationKey](#chatcreatetexthelperfromtranslationkey)
- [Chat.getLogger](#chatgetlogger)
- [Chat.createTextHelperFromJSON](#chatcreatetexthelperfromjson)
- [Chat.createTextBuilder](#chatcreatetextbuilder)
- [Chat.createCommandBuilder](#chatcreatecommandbuilder)
- [Chat.unregisterCommand](#chatunregistercommand)
- [Chat.reRegisterCommand](#chatreregistercommand)
- [Chat.getCommandManager](#chatgetcommandmanager)
- [Chat.getHistory](#chatgethistory)
- [Chat.getTextWidth](#chatgettextwidth)
- [Chat.sectionSymbolToAmpersand](#chatsectionsymboltoampersand)
- [Chat.ampersandToSectionSymbol](#chatampersandtosectionsymbol)
- [Chat.stripFormatting](#chatstripformatting)

### Chat.log
```js
Chat.log("Hello World!");
```

**Params**

1. `message: string`:  The message to log into chat
2. `await?: boolean = false`:  Block the thread until the message is sent

**Returns**
* `void`

### Chat.logf
```js
Chat.logf("Hello, %s!", ["Steve"]);
Chat.logf("Hello, %s!", true, ["Steve"]);
```

**Params**

1. `message: string`:  The message to format and log
2. `await?: boolean = false`:  Block the thread until the message is sent
3. `args: any[]`:  The arguments used to format the message

**Returns**
* `void`

**Notes**
Sends the formatted message to the local chat. The message is formatted using the default String#format(java.lang.String, java.lang.Object...) syntax.

#### Overloads
- `Chat.logf(message: string, args: any[])`
- `Chat.logf(message: string, await: boolean, args: any[])`

### Chat.logColor
```js
Chat.logColor("Colors: &0Black &1Dark Blue &2Dark Green &3Dark Turqoise &4Dark Red &5Purple &6Dark Yellow &7Light Gray &8Dark Gray &9Light Blue &aLight Green &bLight Turquoise &cLight Red &dMagenta &eLight Yellow &fWhite");
```

**Params**
1. `message: string`:  The message to log into chat
2. `await?: boolean = false`:  Block the thread until the message is sent

**Returns**
* `void`

**Notes**
This method logs a message to chat, replacing any ampersands with section symbols to be used with the minecraft chat formatting.

### Chat.say
```js
Chat.say("Hello fellow players!");
Chat.say("/say Hello fellow players!");
Chat.say(`/tp ${x} ${y} ${z}`);
```

**Params**
1. `message: string`:  The message to send in chat
2. `await?: boolean = false`:  Block the thread until the message is sent

**Returns**
* `void`

### Chat.sayf
```js
const name = "John";
Chat.sayf("Hello everyone! I'm %s and I've run %.2f meters.", [name, 100.93]);
Chat.sayf("Hello everyone! I'm %s and I've run %.2f meters.", true, [name, 100.93]);
```

**Params**

1. `message: string`:  The message to format and log
2. `await?: boolean = false`:  Block the thread until the message is sent
3. `args: any[]`:  The arguments used to format the message

**Returns**
* `void`

**Notes**
Sends the formatted message to the server. The message is formatted using the default String#format(java.lang.String, java.lang.Object...) syntax.

#### Overloads
- `Chat.sayf(message: string, args: any[])`
- `Chat.sayf(message: string, await: boolean, args: any[])`

### Chat.open
```js
Chat.open("This message is in the chat input box");
```

**Params**
1. `message: string`:  The message to open the chat screen with
2. `await?: boolean = false`:  Block the thread until the chat is opened

**Returns**
* `void`

### Chat.title
```js
Chat.title("Primary Title", "Some subtitle", 1, 5, 1);
```

**Params**
1. `title: string | TextHelper | null`:  The primary title to display
2. `subtitle: string | TextHelper | null`:  The subtitle to display
3. `fadeIn: int`:  Time in seconds to fade the text in
4. `remain: int`:  Time in seconds the text will remain on screen
5. `fadeOut: int`:  Time in seconds to fade the text out

**Returns**
* `void`

### Chat.actionbar
```js
Chat.actionbar("You may not rest now; there are monsters nearby‌");
```

**Params**
1. `text: string | TextHelper`:  The text to display
2. `tinted?: boolean`:  Whether the text should appear tinted

**Returns**
* `void`

### Chat.toast
```js
Chat.toast("New Recipes Unlocked!", "Check your recipe book");
```

**Params**
1. `title: string | TextHelper | null`:  The title of the toast
2. `desc: string | TextHelper | null`:  The description of the toast

**Returns**
* `void`

**Notes**
Toasts are informational text boxes shown on the top right corner of the screen. They typically show up when the player unlocks new crafting recipes, grants advancements, a song starts playing, or loads up a new world.

Tutorial hints are also specific toasts which serve to teach the player how to play the game.

### Chat.createTextHelperFromString
```js
const helper = Chat.createTextHelperFromString("Example String");
```

**Params**
1. `content: string`:  Text to initialize with

**Returns**
* `TextHelper`: A new TextHelper

### Chat.createTextHelperFromTranslationKey
```js
Chat.createTextHelperFromTranslationKey("multiplayer.player.joined", "notch");
```

**Params**
1. `key: string`:  Translation key to initialize with
2. `content: any[]`:  objects to be used to initialize a dynamic translation key with

**Returns**
* `TextHelper`: A new TextHelper

### Chat.getLogger
```js
const logger = Chat.getLogger("MyLogger");
logger.debug("Position moved from {} {} {} to {} {} {}", oldX, oldY, oldZ, x, y, z);
logger.info("Player moved!");
```

**Params**
1. `name?: string`:  The logger name

**Returns**
* `SLF4J.Logger`: An SLF4J logger for logging to console

### Chat.createTextHelperFromJSON
```js
const block = "minecraft:stone";
const helper = Chat.createTextHelperFromJSON(JSON.stringify([{
    "text": "Searching for ",
    "italic": true,
    "color": "#AAAAAA"
}, {
    "text": block,
    "italic": true,
    "color": "#FF0000"
}]));
```

**Params**
1. `jsonText: string`:  The json text used to build the text helper

**Returns**
* `TextHelper`: A new text helper

### Chat.createTextBuilder
```js
const text = Chat.createTextBuilder()
    .withColor(0x6)
    .append("Hello World! This is gold!")
    .build();
```

**Params**
* `(none)`

**Returns**
* `TextBuilder`: A new text builder

### Chat.createCommandBuilder
```js
// Accessible via /ugive
const command = Chat.createCommandBuilder("ugive")
    .itemArg("item")
    .intArg("count", 0, 1_000_000)
    .executes(...)
    .register();
```

**Params**
1. `name: string`:  Name of the command

**Returns**
* `CommandBuilder`: The builder used to create commands

**Notes**
This method is deprecated. Please use `Chat.getCommandManager()` when possible.

### Chat.unregisterCommand
```js
Chat.unregisterCommand("ugive");
```

**Params**
1. `name: string`:  Name of the command to unregister

**Returns**
* `CommandNodeHelper`: The command node, used to re-register the command

**Notes**
This method is deprecated. Please use `Chat.getCommandManager()` when possible.

### Chat.reRegisterCommand
```js
const node = Chat.unregisterCommand("ugive");
Chat.reRegisterCommand(node);
```

**Params**
1. `node: CommandNodeHelper`:  The node to re-register

**Returns**
* `void`

**Notes**
This method is deprecated. Please use `Chat.getCommandManager()` when possible.

### Chat.getCommandManager
```js
const cmdManager = Chat.getCommandManager();
```

**Params**
* `(none)`

**Returns**
* `CommandManager`: The command manager

### Chat.getHistory
```js
const hist = Chat.getHistory();
```

**Params**
* `(none)`

**Returns**
* `ChatHistoryManager`: Manager to access chat history

### Chat.getTextWidth
```js
const width = Chat.getTextWidth("Example String");
```

**Params**
1. `text: string`:  The text to get the width of

**Returns**
* `int`: The width of `text` in pixels

### Chat.sectionSymbolToAmpersand
```js
const newStr = Chat.sectionSymbolToAmpersand("§aHello World! I'm so happy & excited!");
// newStr will be "&aHello World! I'm so happy && excited!"
```

**Params**
1. `text: string`:  The text to convert

**Returns**
* `string`: The text with section symbols replaced by ampersands

**Notes**
Escapes `&` to `&&`

### Chat.ampersandToSectionSymbol
```js
const newStr = Chat.ampersandToSectionSymbol("&aHello World! I'm so happy && excited!");
// newStr will be "§aHello World! I'm so happy & excited!"
```

**Params**
1. `text: string`:  The text to convert

**Returns**
* `string`: The text with ampersands replaced by section symbols

**Notes**
Escapes `&&` to `&`

### Chat.stripFormatting
```js
const newStr = Chat.stripFormatting("&aHello World! I'm so happy & excited!");
// newStr will be "Hello World! I'm so happy & excited!"
```

**Params**
1. `text: string`:  The text to convert

**Returns**
* `string`: The text with all section symbol formatting removed
