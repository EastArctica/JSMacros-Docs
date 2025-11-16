# Reflection

Advanced functions for interacting with raw Java classes, methods, and fields. This is a powerful library for deep integration with Minecraft and Java. Accessible from scripts via the global `Reflection` variable.

**Warning:** This is an advanced library. Misuse can easily lead to script errors or game crashes. A basic understanding of Java Reflection is recommended.

## Fields
- [Reflection.classLoader](#reflectionclassloader)

## Methods
- [Reflection](#reflection)
  - [Fields](#fields)
  - [Methods](#methods)
  - [Fields](#fields-1)
    - [Reflection.classLoader](#reflectionclassloader)
  - [Methods](#methods-1)
    - [Reflection.getClass](#reflectiongetclass)
    - [Reflection.getDeclaredMethod](#reflectiongetdeclaredmethod)
    - [Reflection.getMethod](#reflectiongetmethod)
    - [Reflection.getDeclaredField](#reflectiongetdeclaredfield)
    - [Reflection.getField](#reflectiongetfield)
    - [Reflection.invokeMethod](#reflectioninvokemethod)
    - [Reflection.newInstance](#reflectionnewinstance)
    - [Reflection.createClassProxyBuilder](#reflectioncreateclassproxybuilder)
    - [Reflection.createClassBuilder](#reflectioncreateclassbuilder)
    - [Reflection.getClassFromClassBuilderResult](#reflectiongetclassfromclassbuilderresult)
    - [Reflection.createLibraryBuilder](#reflectioncreatelibrarybuilder)
    - [Reflection.createLibrary](#reflectioncreatelibrary)
    - [Reflection.compileJavaClass](#reflectioncompilejavaclass)
    - [Reflection.getCompiledJavaClass](#reflectiongetcompiledjavaclass)
    - [Reflection.getAllCompiledJavaClassVersions](#reflectiongetallcompiledjavaclassversions)
    - [Reflection.getReflect](#reflectiongetreflect)
    - [Reflection.loadJarFile](#reflectionloadjarfile)
    - [Reflection.loadCurrentMappingHelper](#reflectionloadcurrentmappinghelper)
    - [Reflection.getClassName](#reflectiongetclassname)
    - [Reflection.loadMappingHelper](#reflectionloadmappinghelper)
    - [Reflection.wrapInstace](#reflectionwrapinstace)
    - [Reflection.getWrappedClass](#reflectiongetwrappedclass)

## Fields
### Reflection.classLoader
The internal class loader used by JsMacros. This can be used for advanced class loading scenarios but typically does not need to be interacted with directly.

**Type**
* `CombinedVariableClassLoader`

## Methods

### Reflection.getClass
```js
// Get a standard Java class
const StringClass = Reflection.getClass("java.lang.String");

// Get a Minecraft class using mappings for cross-version compatibility
// On 1.16.5, this will resolve "net.minecraft.class_2248"
// On 1.17+, this will resolve "net.minecraft.block.Block"
const BlockClass = Reflection.getClass("net.minecraft.class_2248", "net.minecraft.block.Block");

// Get a primitive type class
const intClass = Reflection.getClass("int");
```
Gets a `java.lang.Class` object from its fully qualified name. This is the starting point for most reflection operations.

**Params**
1. `name: string`: The fully qualified name of the class (e.g., "java.util.ArrayList"). This can be an intermediary name for Minecraft classes.
2. `name2?: string`: An alternative (e.g., Yarn mapped) name for the class. JsMacros will try `name` first, then `name2`.

**Returns**
* `java.lang.Class<T>`: The resolved class object.

### Reflection.getDeclaredMethod
```js
const StringClass = Reflection.getClass("java.lang.String");
const intClass = Reflection.getClass("int");
// Get the method: public String substring(int beginIndex)
const substringMethod = Reflection.getDeclaredMethod(StringClass, "substring", [intClass]);
```
Gets a `java.lang.reflect.Method` object from a class, including private, protected, and package-private methods. This does **not** search superclasses.

**Params**
1. `c: java.lang.Class<?>`: The class to search within.
2. `name: string`: The name of the method (can be intermediary).
3. `name2?: string`: An alternative (Yarn) name for the method.
4. `parameterTypes: java.lang.Class<?>[]`: An array of class objects representing the method's parameter types.

**Returns**
* `java.lang.reflect.Method`: The method object.

### Reflection.getMethod
Gets a `public` `java.lang.reflect.Method` object from a class. This **does** search superclasses and interfaces.

**Params** and **Returns** are the same as `getDeclaredMethod`.

### Reflection.getDeclaredField
```js
const mc = Client.getMinecraft();
const MinecraftClientClass = mc.getClass();
// Get the "player" field from the MinecraftClient instance
const playerField = Reflection.getDeclaredField(MinecraftClientClass, "field_1724", "player");
playerField.setAccessible(true); // Make private fields accessible
const player = playerField.get(mc);
```
Gets a `java.lang.reflect.Field` object from a class, including private fields. This does **not** search superclasses.

**Params**
1. `c: java.lang.Class<?>`: The class to search within.
2. `name: string`: The name of the field (can be intermediary).
3. `name2?: string`: An alternative (Yarn) name for the field.

**Returns**
* `java.lang.reflect.Field`: The field object.

### Reflection.getField
Gets a `public` `java.lang.reflect.Field` object from a class. This **does** search superclasses.

**Params** and **Returns** are the same as `getDeclaredField`.

### Reflection.invokeMethod
```js
const substringMethod = Reflection.getDeclaredMethod(Reflection.getClass("java.lang.String"), "substring", [Reflection.getClass("int")]);
const result = Reflection.invokeMethod(substringMethod, "Hello World", [6]);
Chat.log(result); // "World"
```
Invokes a method on an object with the given parameters.

**Params**
1. `m: java.lang.reflect.Method`: The method to invoke.
2. `c: any`: The object instance to invoke the method on. Use `null` for static methods.
3. `objects: any[]`: An array of arguments to pass to the method.

**Returns**
* `any`: The value returned by the invoked method.

### Reflection.newInstance
```js
const FileClass = Reflection.getClass("java.io.File");
const file = Reflection.newInstance(FileClass, ["my_file.txt"]);
Chat.log(`File exists: ${file.exists()}`);
```
Creates a new instance of a class by calling its constructor.

**Params**
1. `c: java.lang.Class<T>`: The class to instantiate.
2. `objects: any[]`: An array of arguments to pass to the constructor.

**Returns**
* `T`: A new instance of the class.

### Reflection.createClassProxyBuilder
```js
const Runnable = Reflection.getClass("java.lang.Runnable");
const builder = Reflection.createClassProxyBuilder(null, [Runnable]);

builder.addMethod("run", JavaWrapper.methodToJava(() => {
    Chat.log("Hello from a proxied Runnable!");
}));

const runnableInstance = builder.build();
const Thread = Reflection.getClass("java.lang.Thread");
const thread = new Thread(runnableInstance);
thread.start();
```
Creates a builder to proxy or extend a Java class or interface from within the script. This allows you to implement Java interfaces or override class methods using script functions.

**Params**
1. `clazz: java.lang.Class<T>`: The class to extend. Use `null` if you are only implementing interfaces.
2. `interfaces: java.lang.Class<?>[]`: An array of interfaces to implement.

**Returns**
* `ProxyBuilder<T>`: A builder for creating the proxy class.

### Reflection.createClassBuilder
A more advanced version of the proxy builder that uses bytecode generation to create an entirely new Java class at runtime.

**Params**
1. `cName: string`: The fully qualified name for the new class.
2. `clazz: java.lang.Class<T>`: The class to extend.
3. `interfaces: java.lang.Class<?>[]`: An array of interfaces to implement.

**Returns**
* `ClassBuilder<T>`: A builder for creating the new class.

### Reflection.getClassFromClassBuilderResult
Retrieves the `Class` object for a class previously created with `createClassBuilder`.

**Params**
1. `cName: string`: The name of the class that was built.

**Returns**
* `java.lang.Class<?>`

### Reflection.createLibraryBuilder
Creates a builder for defining a new custom library that can be accessed by scripts.

**Params**
1. `name: string`: The name scripts will use to access the library (e.g., `MyLib`).
2. `perExec: boolean`: Whether the library instance is shared or unique to each script execution.
3. `acceptedLangs: string[]`: An array of language names that can use this library.

**Returns**
* `LibraryBuilder`

### Reflection.createLibrary
Compiles and registers a custom library from a string of Java code. The class must extend a `BaseLibrary` type and have a `@Library` annotation.

**Params**
1. `className: string`: The fully qualified name of the class.
2. `javaCode: string`: The Java source code for the library.

**Returns**
* `void`

### Reflection.compileJavaClass
```js
const code = `
    package custom;
    public class Greeter {
        public String getGreeting() {
            return "Hello from a runtime-compiled class!";
        }
    }
`;
const GreeterClass = Reflection.compileJavaClass("custom.Greeter", code);
const greeter = GreeterClass.newInstance();
Chat.log(greeter.getGreeting());
```
Compiles a string of Java code into a `Class` object at runtime.

**Params**
1. `className: string`: The fully qualified name of the class being compiled.
2. `code: string`: The Java source code.

**Returns**
* `java.lang.Class<?>`: The compiled class.

**Notes**
Requires a Java Development Kit (JDK) to be installed and accessible by the game's Java process.

### Reflection.getCompiledJavaClass
Retrieves the most recently compiled version of a class by its name.

**Params**
1. `className: string`: The fully qualified name of the class.

**Returns**
* `java.lang.Class<?> | null`: The class, or `null` if it hasn't been compiled.

### Reflection.getAllCompiledJavaClassVersions
Retrieves all compiled versions of a class, in the order they were compiled.

**Params**
1. `className: string`: The fully qualified name of the class.

**Returns**
* `java.util.List<java.lang.Class<?>>`: A list of all compiled versions.

### Reflection.getReflect
```js
const text = "hello world";
const reflected = Reflection.getReflect(text)
    .call("substring", 6)
    .call("toUpperCase")
    .get();
Chat.log(reflected); // "WORLD"
```
Wraps an object in a jOOR `Reflect` object, which provides a fluent API for reflection.

**Params**
1. `obj: any`: The object to wrap.

**Returns**
* `org.jooq.lambda.Reflect`: The jOOR wrapper.

**Notes**
See the [jOOR GitHub](https://github.com/jOOQ/jOOR) for more information on its capabilities.

### Reflection.loadJarFile
```js
const success = Reflection.loadJarFile("libs/my-java-library.jar");
if (success) {
    const MyClass = Reflection.getClass("com.example.MyClass");
}
```
Loads a `.jar` file into the script's classpath, making its classes available to `Reflection.getClass()`.

**Params**
1. `file: string`: The path to the jar file, relative to the script's folder.

**Returns**
* `boolean`: `true` if the JAR was loaded successfully.

### Reflection.loadCurrentMappingHelper
Gets the currently loaded mapping helper, if any.

**Params**
* `(none)`

**Returns**
* `Mappings`: The current mapping helper.

### Reflection.getClassName
```js
const mc = Client.getMinecraft();
const className = Reflection.getClassName(mc);
Chat.log(className); // e.g., "net.minecraft.class_310"
```
Gets the fully qualified name of an object's class.

**Params**
1. `o: any`: The object to inspect.

**Returns**
* `string`: The class name.

### Reflection.loadMappingHelper
Loads a Yarn mapping file (from a URL or local file) to enable the use of official class/method/field names instead of intermediary names.

**Params**
1. `urlorfile: string`: A URL or file path to a Yarn mappings JAR or `.tiny` file.

**Returns**
* `Mappings`: The new mapping helper.

### Reflection.wrapInstace
Wraps a Java instance for use with proxy/builder classes. An advanced feature.

**Params**
1. `instance: T`: The instance to wrap.

**Returns**
* `WrappedClassInstance<T>`

### Reflection.getWrappedClass
Gets a wrapped class by its name. An advanced feature.

**Params**
1. `className: string`: The name of the class.

**Returns**
* `WrappedClassInstance<?>`