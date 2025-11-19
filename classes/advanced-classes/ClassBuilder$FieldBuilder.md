# ClassBuilder.FieldBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.FieldBuilder<T>`

**Extends:** None (builder class)

The `ClassBuilder.FieldBuilder` class is a specialized builder for creating and configuring fields within generated classes. This builder provides a fluent API for setting field visibility, modifiers, initialization values, annotations, and other field properties, allowing you to create comprehensive field definitions.

FieldBuilder instances are obtained through the `addField()` methods of ClassBuilder and support both simple field creation and advanced initialization with complex field initializers.

## Table of Contents

- [Obtaining a FieldBuilder](#obtaining-a-fieldbuilder)
- [Visibility Modifiers](#visibility-modifiers)
- [Access Modifiers](#access-modifiers)
- [Field Initialization](#field-initialization)
- [Annotation Support](#annotation-support)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Field Types and Modifiers](#field-types-and-modifiers)

---

## Obtaining a FieldBuilder

FieldBuilder instances are created through the `addField()` methods with type and name parameters:

```javascript
// Simple field with type and name
const fieldBuilder = classBuilder.addField(String, "username");

// Field with primitive type
const fieldBuilder = classBuilder.addField(int, "count");

// Field with complex type
const fieldBuilder = classBuilder.addField(List.class, "items");
```

---

## Visibility Modifiers

### makePublic()
```javascript
fieldBuilder.makePublic();
```

Sets the field visibility to public.

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Public fields are accessible from any class
- Default visibility if no other visibility modifier is specified

### makePrivate()
```javascript
fieldBuilder.makePrivate();
```

Sets the field visibility to private.

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Private fields are only accessible within the declaring class
- Recommended for encapsulation and data hiding

### makeProtected()
```javascript
fieldBuilder.makeProtected();
```

Sets the field visibility to protected.

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Protected fields are accessible within the same package and by subclasses

---

## Access Modifiers

### makeStatic()
```javascript
fieldBuilder.makeStatic();
```

Makes the field static (class-level rather than instance-level).

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Static fields belong to the class rather than to instances
- All instances share the same static field value

### makeFinal()
```javascript
fieldBuilder.makeFinal();
```

Makes the field final (constant).

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Final fields can only be assigned once
- Must be initialized either in declaration or in constructor

### makeVolatile()
```javascript
fieldBuilder.makeVolatile();
```

Makes the field volatile (thread-safe visibility).

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Volatile fields provide visibility guarantees across threads
- Reads and writes have happens-before semantics

### makeTransient()
```javascript
fieldBuilder.makeTransient();
```

Makes the field transient (excluded from serialization).

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Transient fields are ignored during object serialization
- Useful for fields that shouldn't be persisted

---

## Field Initialization

### setInitializer(value)
```javascript
fieldBuilder.setInitializer("Default Value");
fieldBuilder.setInitializer(42);
fieldBuilder.setInitializer(true);
```

Sets a simple initialization value for the field.

**Parameters:**
1. `value: any` - The initialization value (string, number, boolean, null)

**Returns:** `FieldBuilder<T>` - This builder for method chaining

**Notes:**
- Value type must match the field type
- Primitive types use corresponding Java values
- Objects can be initialized with null

### buildInitializer()
```javascript
const initializerBuilder = fieldBuilder.buildInitializer();
```

Creates a FieldInitializerBuilder for complex field initialization.

**Returns:** `FieldInitializerBuilder` - A builder for complex initialization expressions

**Notes:**
- Enables building complex initialization expressions
- Supports method calls, constructors, and operations
- Useful for initializing collections, objects, or computed values

---

## Annotation Support

### addAnnotation(type)
```javascript
const annotationBuilder = fieldBuilder.addAnnotation(MyFieldAnnotation.class);
```

Adds an annotation to the field.

**Parameters:**
1. `type: Class<?>` - The annotation type to add

**Returns:** `AnnotationBuilder<FieldBuilder<T>>` - An annotation builder for configuration

**Example:**
```javascript
fieldBuilder
    .addAnnotation(MyFieldAnnotation.class)
        .putString("description", "User's display name")
        .putInt("maxLength", 50)
        .finish()
    .end();
```

---

## Finalization

### end()
```javascript
const parentBuilder = fieldBuilder.end();
```

Finalizes the field and returns to the parent ClassBuilder.

**Returns:** `ClassBuilder<T>` - The parent ClassBuilder instance

**Notes:**
- This method must be called to apply the field to the class
- After calling end(), the field is finalized and the builder returns to the class context

---

## Usage Examples

### Simple Public Field
```javascript
const SimpleClass = Reflection.createClassBuilder("com.example.Simple", Object)
    .addField(String, "name")
    .end()  // Default is public
    .addField(int, "age")
    .makePublic()
    .end()
    .finishBuildAndFreeze();
```

### Private Fields with Initialization
```javascript
const PersonClass = Reflection.createClassBuilder("com.example.Person", Object)
    .addField(String, "firstName")
    .makePrivate()
    .setInitializer("Unknown")
    .end()
    .addField(String, "lastName")
    .makePrivate()
    .setInitializer("Unknown")
    .end()
    .addField(int, "age")
    .makePrivate()
    .setInitializer(0)
    .end()
    .addField(boolean, "active")
    .makePrivate()
    .setInitializer(true)
    .end()
    .finishBuildAndFreeze();
```

### Static and Final Fields
```javascript
const ConstantsClass = Reflection.createClassBuilder("com.example.Constants", Object)
    .addField(String, "VERSION")
    .makeStatic()
    .makeFinal()
    .makePublic()
    .setInitializer("1.0.0")
    .end()
    .addField(int, "MAX_CONNECTIONS")
    .makeStatic()
    .makeFinal()
    .makePublic()
    .setInitializer(100)
    .end()
    .addField(String, "DEFAULT_CONFIG")
    .makeStatic()
    .makeFinal()
    .makePrivate()
    .setInitializer("config.properties")
    .end()
    .finishBuildAndFreeze();
```

### Complex Type Fields
```javascript
const DataClass = Reflection.createClassBuilder("com.example.Data", Object)
    .addField(List, "items")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("new java.util.ArrayList()")
        .finish()
    .end()
    .addField(Map, "properties")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("new java.util.HashMap()")
        .finish()
    .end()
    .addField(Set, "tags")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("new java.util.HashSet()")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Fields with Annotations
```javascript
const AnnotatedFieldsClass = Reflection.createClassBuilder("com.example.AnnotatedFields", Object)
    .addField(String, "username")
    .makePrivate()
    .addAnnotation(NotNull.class)
    .finish()
    .addAnnotation(MyFieldAnnotation.class)
        .putString("description", "User's login name")
        .putInt("minLength", 3)
        .putInt("maxLength", 20)
        .finish()
    .end()
    .addField(int, "age")
    .makePrivate()
    .addAnnotation(Min.class)
        .putString("value", "0")
        .finish()
    .addAnnotation(Max.class)
        .putString("value", "150")
        .finish()
    .end()
    .addField(String, "email")
    .makePrivate()
    .addAnnotation(Email.class)
    .finish()
    .addAnnotation(MyFieldAnnotation.class)
        .putString("description", "User's email address")
        .putBoolean("required", true)
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Volatile and Transient Fields
```javascript
const ThreadSafeClass = Reflection.createClassBuilder("com.example.ThreadSafe", Object)
    .addField(boolean, "running")
    .makePrivate()
    .makeVolatile()
    .setInitializer(true)
    .end()
    .addField(long, "lastUpdate")
    .makePrivate()
    .makeVolatile()
    .setInitializer(0)
    .end()
    .addField(String, "cachedData")
    .makePrivate()
    .makeTransient()
    .setInitializer(null)
    .end()
    .addField(int, "accessCount")
    .makePrivate()
    .makeTransient()
    .setInitializer(0)
    .end()
    .finishBuildAndFreeze();
```

### Complex Field Initialization
```javascript
const ComplexInitClass = Reflection.createClassBuilder("com.example.ComplexInit", Object)
    .addField(Map, "config")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.Properties props = new java.util.Properties();")
        .appendJavaCode("props.setProperty(\"timeout\", \"30000\");")
        .appendJavaCode("props.setProperty(\"retries\", \"3\");")
        .appendJavaCode("return new java.util.HashMap(props);")
        .finish()
    .end()
    .addField(List, "defaultValues")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("java.util.List<String> list = new java.util.ArrayList();")
        .appendJavaCode("list.add(\"DEFAULT\");")
        .appendJavaCode("list.add(\"UNKNOWN\");")
        .appendJavaCode("list.add(\"N/A\");")
        .appendJavaCode("return list;")
        .finish()
    .end()
    .addField(String[], "defaultHeaders")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("return new String[]{\"Content-Type\", \"Accept\", \"User-Agent\"};")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Protected Fields for Inheritance
```javascript
const BaseClass = Reflection.createClassBuilder("com.example.Base", Object)
    .addField(String, "id")
    .makeProtected()
    .setInitializer("BASE_ID")
    .end()
    .addField(long, "timestamp")
    .makeProtected()
    .buildInitializer()
        .appendJavaCode("return System.currentTimeMillis();")
        .finish()
    .end()
    .addField(boolean, "initialized")
    .makeProtected()
    .setInitializer(false)
    .end()
    .finishBuildAndFreeze();

const ExtendedClass = Reflection.createClassBuilder("com.example.Extended", BaseClass)
    .addField(String, "extendedId")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("return this.id + \"_EXTENDED\";")  // Access protected field
        .finish()
    .end()
    .finishBuildAndFreeze();
```

### Fields with Complex Types and Generics
```javascript
const GenericFieldsClass = Reflection.createClassBuilder("com.example.GenericFields", Object)
    .addField(List, "stringList")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("new java.util.ArrayList()")
        .finish()
    .end()
    .addField(Map, "stringMap")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("new java.util.HashMap()")
        .finish()
    .end()
    .addField(Collection, "dataCollection")
    .makePrivate()
    .buildInitializer()
        .appendJavaCode("new java.util.HashSet()")
        .finish()
    .end()
    .finishBuildAndFreeze();
```

---

## Field Types and Modifiers

### Visibility Levels
- **public**: Accessible from any class
- **private**: Accessible only within the declaring class
- **protected**: Accessible within package and subclasses
- **package-private**: Accessible within package (default)

### Access Modifiers
- **static**: Class-level field, shared by all instances
- **final**: Constant field, can only be assigned once
- **volatile**: Thread-safe visibility guarantees
- **transient**: Excluded from serialization

### Common Combinations
```javascript
// Public constant
.addField(String, "CONSTANT")
.makeStatic()
.makeFinal()
.makePublic()
.setInitializer("VALUE")
.end()

// Private static field
.addField(int, "counter")
.makeStatic()
.makePrivate()
.setInitializer(0)
.end()

// Protected instance field
.addField(String, "name")
.makeProtected()
.end()

// Thread-safe field
.addField(boolean, "flag")
.makePrivate()
.makeVolatile()
.end()
```

---

## Best Practices

1. **Encapsulation**: Use private fields with public getters/setters
2. **Constants**: Use static final for constants
3. **Thread Safety**: Use volatile for fields accessed by multiple threads
4. **Serialization**: Use transient for non-serializable fields
5. **Initialization**: Always initialize fields to prevent null values
6. **Documentation**: Use annotations to document field constraints

---

## Related Classes

- `ClassBuilder` - Main class builder that creates FieldBuilder instances
- `ClassBuilder.FieldBuilder.FieldInitializerBuilder` - Builder for complex field initialization
- `ClassBuilder.AnnotationBuilder` - Annotation builder for field annotations

## Version Information

- Available since JSMacros 1.6.5
- Complex initialization support added in 1.8.4
- Enhanced modifier support added in 1.8.4

The FieldBuilder provides a comprehensive and flexible API for creating fields with full control over visibility, modifiers, initialization, and annotation metadata, enabling the creation of sophisticated class structures with proper encapsulation and thread safety.