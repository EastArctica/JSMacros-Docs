# CharCompareFilter

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.worldscanner.filter.compare.CharCompareFilter`

**Implements:** [`IFilter<Character>`](../api/IFilter.md)

**Since:** 1.6.5

A simple filter class used to compare character values during world scanning operations. This filter checks whether a given character matches a specified comparison character and is commonly used in conjunction with the WorldScanner to filter blocks or entities based on character properties, such as checking specific characters in block names, entity identifiers, or other character-based data.

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Notes](#notes)

## Constructors

### new CharCompareFilter(compareTo)

Creates a new CharCompareFilter with the specified character to compare against.

```js
const filter = new CharCompareFilter('A');
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `compareTo` | `char` | The character value to compare input values against |

**Example:**
```js
// Create a filter that matches the character 'A'
const uppercaseAFilter = new CharCompareFilter('A');

// Create a filter that matches the character 'a'
const lowercaseAFilter = new CharCompareFilter('a');

// Create a filter that matches special characters
const exclamationFilter = new CharCompareFilter('!');
```

## Methods

## Usage Examples

### Example 1: Filtering Blocks by Character Properties

```js
// Create a scanner that finds blocks with names starting with a specific character
const scanner = World.getWorldScanner();
const blocks = World.getLoadedBlocks();

// Filter blocks whose names start with 'O' (like OAK, OBSIDIAN)
const firstCharFilter = new CharCompareFilter('O');
const oBlocks = blocks.filter(block => {
    const name = block.getBlockState().getBlock().getName().getString();
    return name.length > 0 && firstCharFilter.apply(name.charAt(0));
});

console.log(`Found ${oBlocks.length} blocks starting with 'O':`);
oBlocks.forEach(block => {
    console.log(`- ${block.getBlockState().getBlock().getName().getString()}`);
});
```

### Example 2: Custom Character Filtering for Entity Names

```js
// Filter entities based on the first character of their custom names
const entities = World.getEntities();
const filter = new CharCompareFilter('Z');

// Find entities with custom names starting with 'Z'
const zNamedEntities = entities.filter(entity => {
    const customName = entity.getCustomName();
    if (!customName) return false;

    const nameText = customName.getString();
    return nameText.length > 0 && filter.apply(nameText.charAt(0));
});

console.log(`Found ${zNamedEntities.length} entities with names starting with 'Z'`);
```

### Example 3: Pattern-Based Block Identification

```js
// Create character filters for different pattern matching
const diamondChar = new CharCompareFilter('D');
const goldChar = new CharCompareFilter('G');
const ironChar = new CharCompareFilter('I');

// Scan for valuable ore blocks by their first letter
const scanner = World.getWorldScanner();
const blocks = World.getLoadedBlocks();

const valuableOres = blocks.filter(block => {
    const name = block.getBlockState().getBlock().getName().getString();
    if (name.length === 0) return false;

    const firstChar = name.charAt(0);
    return diamondChar.apply(firstChar) ||
           goldChar.apply(firstChar) ||
           ironChar.apply(firstChar);
});

console.log(`Found ${valuableOres.length} valuable ore blocks`);
```

### Example 4: Chat Message Character Filtering

```js
// Create character filters for chat message processing
const questionFilter = new CharCompareFilter('?');
const exclamationFilter = new CharCompareFilter('!');

JsMacros.on("RecvMessage", JavaWrapper.methodToJavaAsync((event) => {
    const message = event.message.getString();
    if (message.length === 0) return;

    const lastChar = message.charAt(message.length - 1);

    if (questionFilter.apply(lastChar)) {
        console.log("Question detected: " + message);
    } else if (exclamationFilter.apply(lastChar)) {
        console.log("Excitement detected: " + message);
    }
}));
```

### Example 5: Special Character Detection in Signs

```js
// Filter signs based on special characters in their text
const filter = new CharCompareFilter('§');  // Minecraft formatting character

const signs = World.getLoadedBlocks().filter(block =>
    block.getBlockState().getBlock().toString().includes("Sign")
);

const formattedSigns = signs.filter(sign => {
    const signText = sign.getBlockState().get("text1").toString();
    return signText.length > 0 && filter.apply(signText.charAt(0));
});

console.log(`Found ${formattedSigns.length} signs with formatting codes`);
```

### Example 6: Combining with Other Filters

```js
// Create character-based conditions for complex filtering
const vowelFilterA = new CharCompareFilter('A');
const vowelFilterE = new CharCompareFilter('E');
const vowelFilterI = new CharCompareFilter('I');
const vowelFilterO = new CharCompareFilter('O');
const vowelFilterU = new CharCompareFilter('U');

// Custom function to check if a character is a vowel
const isVowel = (char) => {
    return vowelFilterA.apply(char) ||
           vowelFilterE.apply(char) ||
           vowelFilterI.apply(char) ||
           vowelFilterO.apply(char) ||
           vowelFilterU.apply(char) ||
           vowelFilterA.apply(char.toUpperCase()); // Check uppercase too
};

// Filter items that start with vowels
const items = Player.getInventory().getItems();
const vowelItems = items.filter(item => {
    const name = item.getName().getString();
    return name.length > 0 && isVowel(name.charAt(0));
});

console.log(`Found ${vowelItems.length} items starting with vowels`);
```

## Notes

- **Simple Comparison**: The filter performs a direct character equality check using `==`
- **Case Sensitivity**: Character comparisons are case-sensitive. 'A' is different from 'a'
- **Type Safety**: The filter expects Character input values and will handle null values according to Java's character comparison semantics
- **WorldScanner Integration**: This class is primarily used internally by WorldScanner when filtering based on character properties
- **Performance**: Being a simple character comparison, this filter has minimal performance overhead
- **Immutable**: Once created, the filter's comparison character cannot be changed
- **Unicode Support**: The filter works with any Unicode character, including special symbols and non-ASCII characters
- **Character vs String**: This filter specifically works with single characters, not strings. For string comparisons, use `StringCompareFilter`

## Common Use Cases

- **Pattern Recognition**: Identifying blocks or entities based on character patterns in their names
- **Text Processing**: Filtering chat messages, signs, or book text based on character criteria
- **Special Character Detection**: Finding formatting codes, punctuation, or other special characters
- **Initial Character Filtering**: Filtering items based on the first character of their names
- **Validation**: Checking for specific characters in custom data or user input

## See Also

- [WorldScanner](../../world-interaction/WorldScanner.md) - For using filters in world scanning operations
- [WorldScannerBuilder](../../world-interaction/WorldScannerBuilder.md) - For building scanners with character property filters
- [IFilter](../api/IFilter.md) - Base interface for all filter classes
- [StringCompareFilter](StringCompareFilter.md) - For comparing string values
- [NumberCompareFilter](NumberCompareFilter.md) - For comparing numeric values
- [BooleanCompareFilter](BooleanCompareFilter.md) - For comparing boolean values
- [BasicFilter](BasicFilter.md) - For logical operations with filters