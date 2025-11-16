# Utils

A collection of miscellaneous utility functions, including clipboard access, hashing, encoding, and more. Accessible from scripts via the global `Utils` variable.

## Methods
- [Utils](#utils)
  - [Methods](#methods)
    - [Utils.openUrl](#utilsopenurl)
    - [Utils.openFile](#utilsopenfile)
    - [Utils.copyToClipboard](#utilscopytoclipboard)
    - [Utils.getClipboard](#utilsgetclipboard)
    - [Utils.guessName](#utilsguessname)
    - [Utils.guessNameAndRoles](#utilsguessnameandroles)
    - [Utils.hashString](#utilshashstring)
      - [Overloads](#overloads)
    - [Utils.encode](#utilsencode)
    - [Utils.decode](#utilsdecode)
    - [Utils.requireNonNull](#utilsrequirenonnull)

### Utils.openUrl
```js
Utils.openUrl("https://jsmacros.wagyourtail.xyz/");
```
Opens the specified URL in the system's default web browser.

**Params**
1. `url: string`: The URL to open.

**Returns**
* `void`

### Utils.openFile
```js
// Opens the JsMacros config folder
Utils.openFile(".");

// Opens a file inside the config folder
Utils.openFile("jsmacros.json");
```
Opens the specified file or directory path with the system's default application.

**Params**
1. `path: string`: The path to open, relative to the Minecraft config folder (`.minecraft/config/`).

**Returns**
* `void`

### Utils.copyToClipboard
```js
Utils.copyToClipboard("This text is now on the clipboard!");
```
Copies the given text to the system clipboard.

**Params**
1. `text: string`: The text to copy.

**Returns**
* `void`

### Utils.getClipboard
```js
const clipboardContent = Utils.getClipboard();
Chat.log(`Clipboard contains: ${clipboardContent}`);
```
Retrieves the current text content from the system clipboard.

**Params**
* `(none)`

**Returns**
* `string`: The text from the clipboard.

### Utils.guessName
```js
// Example usage within a RecvMessage event
JsMacros.on('RecvMessage', JavaWrapper.methodToJavaAsync(event => {
    const sender = Utils.guessName(event.text);
    if (sender) {
        Chat.log(`Guessed sender: ${sender}`);
    }
}));
```
Tries to guess the username of a message sender from a chat message. This works for many common chat formats but is not guaranteed to be accurate on all servers.

**Params**
1. `text: string | TextHelper`: The chat message to analyze.

**Returns**
* `string | null`: The guessed username, or `null` if a name could not be determined.

### Utils.guessNameAndRoles
```js
JsMacros.on('RecvMessage', JavaWrapper.methodToJavaAsync(event => {
    const parts = Utils.guessNameAndRoles(event.text);
    // For a message like "[Admin] Steve: hello", parts might be ["Admin", "Steve"]
    if (parts.size() > 0) {
        Chat.log(`Guessed parts: ${JavaUtils.arrayToString(parts.toArray())}`);
    }
}));
```
Similar to `guessName`, but attempts to extract all parts of the sender's name, including ranks or titles.

**Params**
1. `text: string | TextHelper`: The chat message to analyze.

**Returns**
* `java.util.List<string>`: A list of the guessed name parts (e.g., ranks, name), or an empty list if nothing could be determined.

### Utils.hashString
```js
// SHA-256 hash (default)
const hash1 = Utils.hashString("hello world");
Chat.log(`SHA-256: ${hash1}`);

// MD5 hash
const hash2 = Utils.hashString("hello world", "md5");
Chat.log(`MD5: ${hash2}`);

// SHA-1 hash, encoded in Base64
const hash3 = Utils.hashString("hello world", "sha1", true);
Chat.log(`SHA-1 (Base64): ${hash3}`);
```
Hashes a string using a specified cryptographic algorithm.

**Params**
1. `message: string`: The string to hash.
2. `algorithm?: string = "sha256"`: The hashing algorithm to use. Supported values: `sha1`, `sha256`, `sha384`, `sha512`, `md2`, `md5`.
3. `base64?: boolean = false`: If `true`, the resulting hash is encoded in Base64. Otherwise, it's encoded in hexadecimal.

**Returns**
* `string`: The resulting hash string.

#### Overloads
- `Utils.hashString(message: string)`
- `Utils.hashString(message: string, algorithm: string)`
- `Utils.hashString(message: string, algorithm: string, base64: boolean)`

### Utils.encode
```js
const original = "Hello World!";
const encoded = Utils.encode(original);
Chat.log(`Encoded: ${encoded}`); // "SGVsbG8gV29ybGQh"
```
Encodes a string using Base64 encoding.

**Params**
1. `message: string`: The string to encode.

**Returns**
* `string`: The Base64 encoded string.

### Utils.decode
```js
const encoded = "SGVsbG8gV29ybGQh";
const decoded = Utils.decode(encoded);
Chat.log(`Decoded: ${decoded}`); // "Hello World!"
```
Decodes a Base64 encoded string.

**Params**
1. `message: string`: The Base64 string to decode.

**Returns**
* `string`: The decoded string.

### Utils.requireNonNull
```js
function processItem(item) {
    // This will throw a NullPointerException if item is null, stopping the script.
    const validItem = Utils.requireNonNull(item, "Item cannot be null!");
    // ... continue processing validItem
}

processItem(Player.openInventory().getSlot(0)); // Works if slot 0 has an item
processItem(null); // Throws an error with the custom message
```
Checks if an object is `null`. If it is, it throws a `NullPointerException`, effectively stopping the script with an error. If the object is not `null`, it returns the object. This is a convenient way to validate data and prevent further errors.

**Params**
1. `obj: T`: The object to check for nullity.
2. `message?: string`: An optional custom message to include in the `NullPointerException` if the object is `null`.

**Returns**
* `T`: The original object, `obj`, if it is not `null`.