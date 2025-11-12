# JavaUtils

Utility functions for creating and interacting with common Java objects and arrays. Accessible from scripts via the global `JavaUtils` variable.

## Methods
- [JavaUtils.createArrayList](#javautilscreatearraylist)
- [JavaUtils.createHashMap](#javautilscreatehashmap)
- [JavaUtils.createHashSet](#javautilscreatehashset)
- [JavaUtils.getRandom](#javautilsgetrandom)
- [JavaUtils.getHelperFromRaw](#javautilsgethelperfromraw)
- [JavaUtils.arrayToString](#javautilsarraytostring)
- [JavaUtils.arrayDeepToString](#javautilsarraydeeptostring)

### JavaUtils.createArrayList
```js
// Create an empty ArrayList
const list = JavaUtils.createArrayList();
list.add("Hello");
list.add("World");
Chat.log(list.get(0)); // "Hello"

// Create an ArrayList from an existing JavaScript array
const jsArray = ["Apple", "Banana", "Cherry"];
const fruitList = JavaUtils.createArrayList(jsArray);
Chat.log(`There are ${fruitList.size()} fruits.`);
```

**Params**
1. `array?: T[]`: An optional JavaScript array to initialize the list with.

**Returns**
* `java.util.ArrayList<T>`: A new Java `ArrayList`.

#### Overloads
- `JavaUtils.createArrayList()`
- `JavaUtils.createArrayList(array: T[])`

### JavaUtils.createHashMap
```js
const map = JavaUtils.createHashMap();
map.put("player_name", "Steve");
map.put("player_score", 100);

Chat.log(`Score for ${map.get("player_name")}: ${map.get("player_score")}`);
```

**Params**
* `(none)`

**Returns**
* `java.util.HashMap<?, ?>`: A new Java `HashMap`.

### JavaUtils.createHashSet
```js
const set = JavaUtils.createHashSet();
set.add("diamond");
set.add("gold");
set.add("diamond"); // This will be ignored

Chat.log(`Set size: ${set.size()}`); // "Set size: 2"
```

**Params**
* `(none)`

**Returns**
* `java.util.HashSet<?>`: A new Java `HashSet`.

### JavaUtils.getRandom
```js
// Create a random number generator with a random seed
const random = JavaUtils.getRandom();
Chat.log(`Random int: ${random.nextInt(100)}`); // A number between 0 and 99

// Create a generator with a fixed seed for predictable results
const seededRandom = JavaUtils.getRandom(12345);
Chat.log(`Seeded int: ${seededRandom.nextInt(100)}`); // Will always be 73
```

**Params**
1. `seed?: long`: An optional seed to initialize the random number generator. Using the same seed will produce the same sequence of random numbers.

**Returns**
* `java.util.SplittableRandom`: A Java random number generator.

#### Overloads
- `JavaUtils.getRandom()`
- `JavaUtils.getRandom(seed: long)`

### JavaUtils.getHelperFromRaw
```js
// Get the raw Minecraft player object
const rawPlayer = Client.getMinecraft().field_1724; // .player in yarn mappings

// Wrap it in the JSMacros PlayerHelper
const playerHelper = JavaUtils.getHelperFromRaw(rawPlayer);

if (playerHelper) {
    Chat.log(`Wrapped player's name: ${playerHelper.getName()}`);
}
```

**Params**
1. `raw: any`: The raw Minecraft object to wrap.

**Returns**
* `BaseHelper | null`: The corresponding JSMacros helper object for the given raw object, or `null` if no helper exists.

### JavaUtils.arrayToString
```js
const simpleArray = ["one", 2, true];
const str = JavaUtils.arrayToString(simpleArray);
Chat.log(str); // "[one, 2, true]"
```

**Params**
1. `array: any[]`: The array to convert.

**Returns**
* `string`: The string representation of the array, similar to Java's `Arrays.toString()`.

### JavaUtils.arrayDeepToString
```js
const nestedArray = ["a", ["b", "c"], ["d", ["e"]]];
const str = JavaUtils.arrayDeepToString(nestedArray);
Chat.log(str); // "[a, [b, c], [d, [e]]]"
```

**Params**
1. `array: any[]`: The array to convert, which may contain other arrays.

**Returns**
* `string`: The string representation of the array, handling nested arrays correctly, similar to Java's `Arrays.deepToString()`.