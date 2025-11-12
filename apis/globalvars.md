# GlobalVars

Provides a way to store and share variables between different scripts and contexts (e.g., from a script to a custom GUI). Accessible from scripts via the global `GlobalVars` variable.

## Fields
- [GlobalVars.globalRaw](#globalvarsglobalraw)

## Methods
- [GlobalVars.putInt](#globalvarsputint)
- [GlobalVars.putString](#globalvarsputstring)
- [GlobalVars.putDouble](#globalvarsputdouble)
- [GlobalVars.putBoolean](#globalvarsputboolean)
- [GlobalVars.putObject](#globalvarsputobject)
- [GlobalVars.getType](#globalvarsgettype)
- [GlobalVars.getInt](#globalvarsgetint)
- [GlobalVars.getAndIncrementInt](#globalvarsgetandincrementint)
- [GlobalVars.getAndDecrementInt](#globalvarsgetanddecrementint)
- [GlobalVars.incrementAndGetInt](#globalvarsincrementandgetint)
- [GlobalVars.decrementAndGetInt](#globalvarsdecrementandgetint)
- [GlobalVars.getString](#globalvarsgetstring)
- [GlobalVars.getDouble](#globalvarsgetdouble)
- [GlobalVars.getBoolean](#globalvarsgetboolean)
- [GlobalVars.toggleBoolean](#globalvarstoggleboolean)
- [GlobalVars.getObject](#globalvarsgetobject)
- [GlobalVars.remove](#globalvarsremove)
- [GlobalVars.getRaw](#globalvarsgetraw)

## Fields
### GlobalVars.globalRaw
The raw `java.util.Map` that stores all global variables. Direct modification is possible but using the provided methods is recommended.

**Type**
* `java.util.Map<string, any>`

## Methods

### GlobalVars.putInt
```js
GlobalVars.putInt("player_deaths", 5);
```

**Params**
1. `name: string`: The name of the variable.
2. `i: int`: The integer value to store.

**Returns**
* `int | null`: The previous value associated with the name, or `null`.

### GlobalVars.putString
```js
GlobalVars.putString("player_name", "Steve");
```

**Params**
1. `name: string`: The name of the variable.
2. `str: string`: The string value to store.

**Returns**
* `string | null`: The previous value associated with the name, or `null`.

### GlobalVars.putDouble
```js
GlobalVars.putDouble("player_health", 19.5);
```

**Params**
1. `name: string`: The name of the variable.
2. `d: double`: The double value to store.

**Returns**
* `double | null`: The previous value associated with the name, or `null`.

### GlobalVars.putBoolean
```js
GlobalVars.putBoolean("is_afk", true);
```

**Params**
1. `name: string`: The name of the variable.
2. `b: boolean`: The boolean value to store.

**Returns**
* `boolean | null`: The previous value associated with the name, or `null`.

### GlobalVars.putObject
```js
const playerPos = { x: 10, y: 64, z: -20 };
GlobalVars.putObject("last_pos", playerPos);
```

**Params**
1. `name: string`: The name of the variable.
2. `o: any`: The object to store.

**Returns**
* `any | null`: The previous value associated with the name, or `null`.

### GlobalVars.getType
```js
GlobalVars.putInt("my_var", 10);
const type = GlobalVars.getType("my_var");
Chat.log(type); // "java.lang.Integer"
```

**Params**
1. `name: string`: The name of the variable to check.

**Returns**
* `string | null`: The Java class name of the stored object as a string, or `null` if it doesn't exist.

### GlobalVars.getInt
```js
const deaths = GlobalVars.getInt("player_deaths");
if (deaths !== null) {
    Chat.log(`Player has died ${deaths} times.`);
}
```

**Params**
1. `name: string`: The name of the variable.

**Returns**
* `int | null`: The integer value, or `null` if it doesn't exist or is not an integer.

### GlobalVars.getAndIncrementInt
```js
GlobalVars.putInt("counter", 0);
const value = GlobalVars.getAndIncrementInt("counter");
// value is 0, stored value is now 1
```

**Params**
1. `name: string`: The name of the integer variable.

**Returns**
* `int | null`: The value *before* it was incremented, or `null`.

### GlobalVars.getAndDecrementInt
```js
GlobalVars.putInt("counter", 10);
const value = GlobalVars.getAndDecrementInt("counter");
// value is 10, stored value is now 9
```

**Params**
1. `name: string`: The name of the integer variable.

**Returns**
* `int | null`: The value *before* it was decremented, or `null`.

### GlobalVars.incrementAndGetInt
```js
GlobalVars.putInt("counter", 0);
const value = GlobalVars.incrementAndGetInt("counter");
// value is 1, stored value is now 1
```

**Params**
1. `name: string`: The name of the integer variable.

**Returns**
* `int | null`: The value *after* it was incremented, or `null`.

### GlobalVars.decrementAndGetInt
```js
GlobalVars.putInt("counter", 10);
const value = GlobalVars.decrementAndGetInt("counter");
// value is 9, stored value is now 9
```

**Params**
1. `name: string`: The name of the integer variable.

**Returns**
* `int | null`: The value *after* it was decremented, or `null`.

### GlobalVars.getString
```js
const name = GlobalVars.getString("player_name");
```

**Params**
1. `name: string`: The name of the variable.

**Returns**
* `string | null`: The string value, or `null` if it doesn't exist or is not a string.

### GlobalVars.getDouble
```js
const health = GlobalVars.getDouble("player_health");
```

**Params**
1. `name: string`: The name of the variable.

**Returns**
* `double | null`: The double value, or `null` if it doesn't exist or is not a double.

### GlobalVars.getBoolean
```js
const afk = GlobalVars.getBoolean("is_afk");
```

**Params**
1. `name: string`: The name of the variable.

**Returns**
* `boolean | null`: The boolean value, or `null` if it doesn't exist or is not a boolean.

### GlobalVars.toggleBoolean
```js
GlobalVars.putBoolean("is_running", false);
const newState = GlobalVars.toggleBoolean("is_running");
Chat.log(`New state: ${newState}`); // "New state: true"
```

**Params**
1. `name: string`: The name of the boolean variable.

**Returns**
* `boolean | null`: The new value of the boolean after toggling, or `null`.

### GlobalVars.getObject
```js
const pos = GlobalVars.getObject("last_pos");
if (pos) {
    Chat.log(`Last X position: ${pos.x}`);
}
```

**Params**
1. `name: string`: The name of the variable.

**Returns**
* `any | null`: The stored object, or `null` if it doesn't exist.

### GlobalVars.remove
```js
GlobalVars.remove("player_name");
```

**Params**
1. `key: string`: The name of the variable to remove.

**Returns**
* `void`

### GlobalVars.getRaw
```js
const rawMap = GlobalVars.getRaw();
rawMap.put("new_key", "new_value");
```

**Params**
* `(none)`

**Returns**
* `java.util.Map<string, any>`: The raw underlying Java Map that stores the global variables.