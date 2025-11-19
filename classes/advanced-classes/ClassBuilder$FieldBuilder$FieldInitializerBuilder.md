# ClassBuilder.FieldBuilder.FieldInitializerBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.FieldBuilder.FieldInitializerBuilder`

**Extends:** None (builder class)

The `ClassBuilder.FieldBuilder.FieldInitializerBuilder` class is a specialized builder for creating complex field initialization expressions. This builder allows you to construct sophisticated initialization logic that goes beyond simple constant values, enabling method calls, constructor invocations, arithmetic operations, and other complex expressions.

FieldInitializerBuilder instances are obtained through the `buildInitializer()` method of FieldBuilder and provide a fluent API for building initialization expressions that will be executed when the field is initialized.

## Table of Contents

- [Obtaining a FieldInitializerBuilder](#obtaining-a-fieldinitializerbuilder)
- [Code Building Methods](#code-building-methods)
- [Return Specification](#return-specification)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Supported Expression Types](#supported-expression-types)

---

## Obtaining a FieldInitializerBuilder

FieldInitializerBuilder instances are created through the buildInitializer() method:

```javascript
const fieldBuilder = classBuilder.addField(Map, "config");
const initializerBuilder = fieldBuilder.buildInitializer();
```

---

## Code Building Methods

### appendJavaCode(code)
```javascript
initializerBuilder.appendJavaCode("java.util.Properties props = new java.util.Properties();");
initializerBuilder.appendJavaCode("props.setProperty(\"timeout\", \"30000\");");
initializerBuilder.appendJavaCode("props.setProperty(\"retries\", \"3\");");
```

Appends Java code to the initialization expression.

**Parameters:**
1. `code: string` - The Java code to append

**Returns:** `FieldInitializerBuilder` - This builder for method chaining

**Notes:**
- Code is appended in the order specified
- Can declare local variables and perform operations
- Must include a return statement or use returnExpression()
- Standard Java syntax and semantics apply

### appendLine(code)
```javascript
initializerBuilder.appendLine("List<String> items = new ArrayList<>();");
initializerBuilder.appendLine("items.add(\"DEFAULT\");");
initializerBuilder.appendLine("items.add(\"UNKNOWN\");");
```

Appends a single line of Java code with automatic newline.

**Parameters:**
1. `code: string` - The Java code line to append

**Returns:** `FieldInitializerBuilder` - This builder for method chaining

**Notes:**
- Convenience method for single lines of code
- Automatically adds line ending
- Useful for improving code readability

---

## Return Specification

### returnExpression(expression)
```javascript
initializerBuilder.returnExpression("new java.util.HashMap(props)");
initializerBuilder.returnExpression("System.currentTimeMillis()");
initializerBuilder.returnExpression("items.toArray(new String[0])");
```

Specifies the return expression for the field initialization.

**Parameters:**
1. `expression: string` - The Java expression that returns the field value

**Returns:** `FieldInitializerBuilder` - This builder for method chaining

**Notes:**
- The expression must return a value compatible with the field type
- Can be a literal, variable reference, method call, or complex expression
- If not used, must include return statement in appended code

---

## Finalization

### finish()
```javascript
const parentBuilder = initializerBuilder.finish();
```

Finalizes the initializer and returns to the parent FieldBuilder.

**Returns:** `FieldBuilder<T>` - The parent FieldBuilder instance

**Notes:**
- This method must be called to apply the initialization to the field
- After calling finish(), the initializer is finalized and the builder returns to the field context
- The field builder may need to be finalized again with its own end() call

---

## Usage Examples

### Simple Collection Initialization
```javascript
const CollectionInitClass = Reflection.createClassBuilder("com.example.CollectionInit", Object)
    .addField(List, "defaultValues")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.List<String> list = new java.util.ArrayList<>();")
        .appendJavaCode("list.add(\"DEFAULT\");")
        .appendJavaCode("list.add(\"UNKNOWN\");")
        .appendJavaCode("list.add(\"N/A\");")
        .returnExpression("list")
        .finish()
    .end()
    .addField(Set, "uniqueTags")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Set<String> set = new java.util.HashSet<>();")
        .appendJavaCode("set.add(\"SYSTEM\");")
        .appendJavaCode("set.add(\"USER\");")
        .appendJavaCode("set.add(\"ADMIN\");")
        .returnExpression("set")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Map Initialization with Properties
```javascript
const MapInitClass = Reflection.createClassBuilder("com.example.MapInit", Object)
    .addField(Map, "systemConfig")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Properties props = new java.util.Properties();")
        .appendJavaCode("props.setProperty(\"timeout\", \"30000\");")
        .appendJavaCode("props.setProperty(\"retries\", \"3\");")
        .appendJavaCode("props.setProperty(\"debug\", \"false\");")
        .appendJavaCode("props.setProperty(\"cache.enabled\", \"true\");")
        .appendJavaCode("props.setProperty(\"cache.size\", \"1000\");")
        .appendJavaCode("java.util.Map<String, String> config = new java.util.HashMap<>();")
        .appendJavaCode("for (String key : props.stringPropertyNames()) {")
        .appendJavaCode("    config.put(key, props.getProperty(key));")
        .appendJavaCode("}")
        .returnExpression("config")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Array Initialization with Computed Values
```javascript
const ArrayInitClass = Reflection.createClassBuilder("com.example.ArrayInit", Object)
    .addField(String[], "httpHeaders")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("String[] headers = new String[6];")
        .appendJavaCode("headers[0] = \"Content-Type: application/json\";")
        .appendJavaCode("headers[1] = \"Accept: application/json\";")
        .appendJavaCode("headers[2] = \"User-Agent: JsMacros/1.0\";")
        .appendJavaCode("headers[3] = \"Cache-Control: no-cache\";")
        .appendJavaCode("headers[4] = \"Connection: keep-alive\";")
        .appendJavaCode("headers[5] = \"X-Requested-With: XMLHttpRequest\";")
        .returnExpression("headers")
        .finish()
    .end()
    .addField(int[], "primeNumbers")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};")
        .returnExpression("primes")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Complex Object Construction
```javascript
const ComplexObjectInitClass = Reflection.createClassBuilder("com.example.ComplexObjectInit", Object)
    .addField(java.text.SimpleDateFormat, "dateFormat")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.text.SimpleDateFormat format = new java.text.SimpleDateFormat(\"yyyy-MM-dd HH:mm:ss\");")
        .appendJavaCode("format.setTimeZone(java.util.TimeZone.getTimeZone(\"UTC\"));")
        .returnExpression("format")
        .finish()
    .end()
    .addField(java.util.Random, "randomGenerator")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("long seed = System.currentTimeMillis() ^ 0x5DEECE66DL;")
        .appendJavaCode("return new java.util.Random(seed);")
        .finish()
    .end()
    .addField(java.util.concurrent.atomic.AtomicLong, "sequenceGenerator")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("return new java.util.concurrent.atomic.AtomicLong(System.currentTimeMillis());")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Configuration-Driven Initialization
```javascript
const ConfigDrivenInitClass = Reflection.createClassBuilder("com.example.ConfigDrivenInit", Object)
    .addField(Map, "environmentConfig")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Map<String, Object> config = new java.util.HashMap<>();")
        .appendJavaCode("String env = System.getProperty(\"jsmacros.env\", \"development\");")
        .appendJavaCode("")
        .appendJavaCode("switch (env) {")
        .appendJavaCode("    case \"production\":")
        .appendJavaCode("        config.put(\"debug\", false);")
        .appendJavaCode("        config.put(\"log.level\", \"ERROR\");")
        .appendJavaCode("        config.put(\"cache.size\", 10000);")
        .appendJavaCode("        break;")
        .appendJavaCode("    case \"staging\":")
        .appendJavaCode("        config.put(\"debug\", true);")
        .appendJavaCode("        config.put(\"log.level\", \"INFO\");")
        .appendJavaCode("        config.put(\"cache.size\", 5000);")
        .appendJavaCode("        break;")
        .appendJavaCode("    default: // development")
        .appendJavaCode("        config.put(\"debug\", true);")
        .appendJavaCode("        config.put(\"log.level\", \"DEBUG\");")
        .appendJavaCode("        config.put(\"cache.size\", 1000);")
        .appendJavaCode("        break;")
        .appendJavaCode("}")
        .appendJavaCode("")
        .appendJavaCode("config.put(\"environment\", env);")
        .appendJavaCode("config.put(\"initialized.at\", System.currentTimeMillis());")
        .returnExpression("config")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Mathematical Computation Initialization
```javascript
const MathInitClass = Reflection.createClassBuilder("com.example.MathInit", Object)
    .addField(double[], "lookupTable")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("double[] table = new double[360];")
        .appendJavaCode("for (int i = 0; i < 360; i++) {")
        .appendJavaCode("    double radians = Math.toRadians(i);")
        .appendJavaCode("    table[i] = Math.sin(radians);")
        .appendJavaCode("}")
        .returnExpression("table")
        .finish()
    .end()
    .addField(Map, "fibonacciCache")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Map<Integer, Long> cache = new java.util.HashMap<>();")
        .appendJavaCode("cache.put(0, 0L);")
        .appendJavaCode("cache.put(1, 1L);")
        .appendJavaCode("for (int i = 2; i <= 50; i++) {")
        .appendJavaCode("    cache.put(i, cache.get(i - 1) + cache.get(i - 2));")
        .appendJavaCode("}")
        .returnExpression("cache")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Exception Handling in Initialization
```javascript
const SafeInitClass = Reflection.createClassBuilder("com.example.SafeInit", Object)
    .addField(java.util.Properties, "fileConfig")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Properties props = new java.util.Properties();")
        .appendJavaCode("try {")
        .appendJavaCode("    java.io.FileInputStream fis = new java.io.FileInputStream(\"config.properties\");")
        .appendJavaCode("    props.load(fis);")
        .appendJavaCode("    fis.close();")
        .appendJavaCode("} catch (Exception e) {")
        .appendJavaCode("    // Fallback to default values")
        .appendJavaCode("    props.setProperty(\"timeout\", \"30000\");")
        .appendJavaCode("    props.setProperty(\"retries\", \"3\");")
        .appendJavaCode("    props.setProperty(\"debug\", \"false\");")
        .appendJavaCode("}")
        .returnExpression("props")
        .finish()
    .end()
    .addField(String, "configSource")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("try {")
        .appendJavaCode("    java.io.File configFile = new java.io.File(\"config.properties\");")
        .appendJavaCode("    return configFile.exists() ? \"FILE\" : \"DEFAULTS\";")
        .appendJavaCode("} catch (Exception e) {")
        .appendJavaCode("    return \"ERROR\";")
        .appendJavaCode("}")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Nested Object Initialization
```javascript
const NestedObjectInitClass = Reflection.createClassBuilder("com.example.NestedObjectInit", Object)
    .addField(Map, "nestedData")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Map<String, Object> data = new java.util.HashMap<>();")
        .appendJavaCode("")
        .appendJavaCode("// Create nested map")
        .appendJavaCode("java.util.Map<String, Object> metadata = new java.util.HashMap<>();")
        .appendJavaCode("metadata.put(\"created\", System.currentTimeMillis());")
        .appendJavaCode("metadata.put(\"version\", \"1.0.0\");")
        .appendJavaCode("metadata.put(\"author\", \"JsMacros\");")
        .appendJavaCode("")
        .appendJavaCode("// Create nested list")
        .appendJavaCode("java.util.List<String> tags = new java.util.ArrayList<>();")
        .appendJavaCode("tags.add(\"system\");")
        .appendJavaCode("tags.add(\"auto-generated\");")
        .appendJavaCode("tags.add(\"config\");")
        .appendJavaCode("")
        .appendJavaCode("// Assemble nested structure")
        .appendJavaCode("data.put(\"metadata\", metadata);")
        .appendJavaCode("data.put(\"tags\", tags);")
        .appendJavaCode("data.put(\"enabled\", true);")
        .appendJavaCode("data.put(\"count\", 0);")
        .returnExpression("data")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Static Method Call Initialization
```javascript
const StaticMethodInitClass = Reflection.createClassBuilder("com.example.StaticMethodInit", Object)
    .addField(String, "currentTime)
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat(\"HH:mm:ss\");")
        .returnExpression("sdf.format(new java.util.Date())")
        .finish()
    .end()
    .addField(String, "systemInfo)
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("String os = System.getProperty(\"os.name\", \"Unknown\");")
        .appendJavaCode("String version = System.getProperty(\"os.version\", \"Unknown\");")
        .appendJavaCode("String arch = System.getProperty(\"os.arch\", \"Unknown\");")
        .returnExpression("os + \" \" + version + \" (\" + arch + \")\"")
        .finish()
    .end()
    .addField(java.util.List, "systemProperties)
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.List<String> props = new java.util.ArrayList<>();")
        .appendJavaCode("props.add(\"java.version: \" + System.getProperty(\"java.version\"));")
        .appendJavaCode("props.add(\"java.vendor: \" + System.getProperty(\"java.vendor\"));")
        .appendJavaCode("props.add(\"java.home: \" + System.getProperty(\"java.home\"));")
        .appendJavaCode("props.add(\"user.name: \" + System.getProperty(\"user.name\"));")
        .appendJavaCode("props.add(\"user.home: \" + System.getProperty(\"user.home\"));")
        .returnExpression("props")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

---

## Supported Expression Types

### Literals and Constants
```javascript
// Primitive literals
.returnExpression("42")
.returnExpression("3.14")
.returnExpression("'A'")
.returnExpression("true")

// String literals
.returnExpression("\"Hello, World!\"")

// Null value
.returnExpression("null")
```

### Object Construction
```javascript
// Constructor calls
.returnExpression("new ArrayList()")
.returnExpression("new HashMap()")
.returnExpression("new SimpleDateFormat(\"yyyy-MM-dd\")")

// Static method calls
.returnExpression("System.currentTimeMillis()")
.returnExpression("Math.random()")
.returnExpression("UUID.randomUUID().toString()")
```

### Variable References
```javascript
// Local variables
.appendJavaCode("String result = computeValue();")
.returnExpression("result")

// Array elements
.appendJavaCode("int[] values = {1, 2, 3};")
.returnExpression("values[0]")
```

### Expressions and Operations
```javascript
// Arithmetic
.returnExpression("a + b")
.returnExpression("x * y + z")
.returnExpression("Math.pow(base, exponent)")

// String concatenation
.returnExpression("\"prefix-\" + id + \"-suffix\"")
.returnExpression("name + \" (\" + age + \")\"")

// Ternary operations
.returnExpression("condition ? value1 : value2")

// Method calls on objects
.returnExpression("list.size()")
.returnExpression("map.keySet()")
.returnExpression("str.toUpperCase()")
```

---

## Best Practices

1. **Keep It Simple**: Avoid overly complex initialization logic
2. **Error Handling**: Use try-catch for potentially failing operations
3. **Performance**: Avoid expensive operations in field initialization
4. **Type Safety**: Ensure return expressions match field types
5. **Readability**: Use meaningful variable names and comments
6. **Dependencies**: Avoid creating circular dependencies between fields

---

## Related Classes

- `ClassBuilder.FieldBuilder` - Parent field builder that creates FieldInitializerBuilder instances
- `ClassBuilder` - Main class builder

## Version Information

- Available since JSMacros 1.8.4
- Part of the enhanced field initialization system

The FieldInitializerBuilder provides a powerful and flexible way to create complex field initialization expressions, enabling sophisticated object construction and configuration beyond simple constant values.