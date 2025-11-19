# ClassBuilder.AnnotationBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.AnnotationBuilder<T>`

**Extends:** None (builder class)

The `ClassBuilder.AnnotationBuilder` class is a fluent builder for adding and configuring annotations on classes, methods, fields, and constructors within the ClassBuilder system. This builder provides a convenient API for setting annotation properties, including primitive values, strings, enums, arrays, and nested annotations.

AnnotationBuilder instances are obtained through various annotation-related methods in the ClassBuilder system and allow you to construct complex annotation structures with multiple properties and nested annotations.

## Table of Contents

- [Obtaining an AnnotationBuilder](#obtaining-an-annotationbuilder)
- [Property Setting Methods](#property-setting-methods)
- [Array Property Methods](#array-property-methods)
- [Nested Annotation Methods](#nested-annotation-methods)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Supported Types](#supported-types)

---

## Obtaining an AnnotationBuilder

AnnotationBuilder instances are created through various methods in the ClassBuilder system:

```javascript
// Class-level annotation
const classAnnotation = classBuilder.addAnnotation(Deprecated.class);

// Field-level annotation
const fieldAnnotation = fieldBuilder.addAnnotation(MyAnnotation.class);

// Method-level annotation
const methodAnnotation = methodBuilder.addAnnotation(Override.class);

// Constructor-level annotation
const constructorAnnotation = constructorBuilder.addAnnotation(MyConstructorAnnotation.class);
```

---

## Property Setting Methods

### putString(name, value)
```javascript
annotationBuilder.putString("since", "1.5.0");
```

Sets a string property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: string` - The string value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putInt(name, value)
```javascript
annotationBuilder.putInt("priority", 1);
```

Sets an integer property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: number` - The integer value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putLong(name, value)
```javascript
annotationBuilder.putLong("timeout", 5000);
```

Sets a long property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: number` - The long value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putDouble(name, value)
```javascript
annotationBuilder.putDouble("version", 2.5);
```

Sets a double property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: number` - The double value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putFloat(name, value)
```javascript
annotationBuilder.putFloat("ratio", 0.75);
```

Sets a float property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: number` - The float value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putBoolean(name, value)
```javascript
annotationBuilder.putBoolean("enabled", true);
```

Sets a boolean property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: boolean` - The boolean value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putByte(name, value)
```javascript
annotationBuilder.putByte("code", 10);
```

Sets a byte property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: number` - The byte value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putShort(name, value)
```javascript
annotationBuilder.putShort("port", 8080);
```

Sets a short property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: number` - The short value to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putChar(name, value)
```javascript
annotationBuilder.putChar("separator", ',');
```

Sets a char property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: string` - The char value to set (single character string)

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putClass(name, value)
```javascript
annotationBuilder.putClass("target", String.class);
```

Sets a Class property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `value: Class<?>` - The Class object to set

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

### putEnum(name, enumClass, value)
```javascript
annotationBuilder.putEnum("status", Thread.State.class, "RUNNABLE");
```

Sets an enum property value on the annotation.

**Parameters:**
1. `name: string` - The name of the annotation property
2. `enumClass: Class<?>` - The enum class
3. `value: string` - The enum constant name

**Returns:** `AnnotationBuilder<T>` - This builder for method chaining

---

## Array Property Methods

### putArray(name)
```javascript
const arrayBuilder = annotationBuilder.putArray("value");
```

Creates an array property builder for the specified property name.

**Parameters:**
1. `name: string` - The name of the array property

**Returns:** `AnnotationArrayBuilder` - An array builder for setting array elements

**Since:** `1.8.4`

---

## Nested Annotation Methods

### putNested(name, annotationType)
```javascript
const nestedAnnotation = annotationBuilder.putNested("constraint", MyConstraint.class);
```

Creates a nested annotation builder for the specified property.

**Parameters:**
1. `name: string` - The name of the nested annotation property
2. `annotationType: Class<?>` - The annotation type

**Returns:** `AnnotationBuilder<?>` - A builder for the nested annotation

---

## Finalization

### finish()
```javascript
const parentBuilder = annotationBuilder.finish();
```

Finalizes the annotation and returns to the parent builder.

**Returns:** `T` - The parent builder (ClassBuilder, FieldBuilder, MethodBuilder, etc.)

**Notes:**
- This method must be called to apply the annotation to the target element
- After calling finish(), the annotation is applied and the builder returns to the parent context

---

## Usage Examples

### Simple Annotation with Multiple Properties
```javascript
// Add @Deprecated with since and forRemoval properties
classBuilder
    .addAnnotation(Deprecated.class)
    .putString("since", "1.5.0")
    .putBoolean("forRemoval", false)
    .finish();
```

### Complex Annotation with Array Properties
```javascript
// Add @SuppressWarnings with multiple warning types
classBuilder
    .addAnnotation(SuppressWarnings.class)
    .putArray("value")
        .putString("unchecked")
        .putString("rawtypes")
        .putString("deprecation")
        .finish()
    .finish();

// Alternative for single-element arrays
classBuilder
    .addAnnotation(SuppressWarnings.class)
    .putArray("value")
        .putString("unused")
        .finish()
    .finish();
```

### Annotation with Nested Annotations
```javascript
// Add a complex annotation with nested annotations
classBuilder
    .addAnnotation(MyComplexAnnotation.class)
    .putString("name", "MyComponent")
    .putInt("version", 2)
    .putNested("metadata", MetadataAnnotation.class)
        .putString("author", "Developer")
        .putLong("timestamp", Date.now())
        .finish()
    .putArray("tags")
        .putString("component")
        .putString("ui")
        .putString("dynamic")
        .finish()
    .finish();
```

### Field-Level Annotations
```javascript
// Add annotations to a field
classBuilder
    .addField(String, "username")
    .addAnnotation(MyFieldAnnotation.class)
        .putString("description", "User's display name")
        .putInt("maxLength", 50)
        .putBoolean("required", true)
        .finish()
    .addAnnotation(NotNull.class)
    .finish()
    .end();
```

### Method-Level Annotations
```javascript
// Add annotations to a method
classBuilder
    .addMethod(void, "process", String)
    .addAnnotation(MyMethodAnnotation.class)
        .putString("operation", "PROCESS")
        .putEnum("priority", Priority.class, "HIGH")
        .putArray("allowedRoles")
            .putString("ADMIN")
            .putString("MANAGER")
            .finish()
        .finish()
    .addAnnotation(Override.class)
    .body(`// method implementation`)
    .finish();
```

### Enum and Class Properties
```javascript
// Add annotation with enum and class properties
classBuilder
    .addAnnotation(ConfigurationAnnotation.class)
        .putEnum("scope", Scope.class, "PROTOTYPE")
        .putClass("valueType", MyCustomType.class)
        .putClass("factory", MyFactory.class)
        .finish();
```

### Constructor Annotations
```javascript
// Add annotations to constructor parameters
classBuilder
    .addConstructor(String, int)
    .addAnnotation(ConstructorProperties.class)
        .putArray("value")
            .putString("name")
            .putString("age")
            .finish()
        .finish()
    .body(`
        this.name = name;
        this.age = age;
    `)
    .finish();
```

---

## Supported Types

### Primitive Types
- `boolean` - via putBoolean()
- `byte` - via putByte()
- `char` - via putChar()
- `short` - via putShort()
- `int` - via putInt()
- `long` - via putLong()
- `float` - via putFloat()
- `double` - via putDouble()

### Reference Types
- `String` - via putString()
- `Class<?>` - via putClass()
- `Enum` - via putEnum()
- Arrays - via putArray()
- Nested annotations - via putNested()

### Array Types
Arrays can contain:
- String values
- Primitive values
- Enum values
- Class values
- Nested annotations

### Default Values
Annotation properties with default values in the annotation definition don't need to be explicitly set unless you want to override them.

---

## Related Classes

- `ClassBuilder` - Main class builder that creates AnnotationBuilder instances
- `ClassBuilder.FieldBuilder` - Field builder that supports annotations
- `ClassBuilder.MethodBuilder` - Method builder that supports annotations
- `ClassBuilder.ConstructorBuilder` - Constructor builder that supports annotations
- `ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder` - Array builder for annotation properties

## Version Information

- Available since JSMacros 1.6.5
- Array support added in 1.8.4
- Nested annotation support added in 1.8.4

The AnnotationBuilder provides a comprehensive and type-safe way to add rich metadata to generated classes through Java's annotation system, enabling advanced code generation and runtime reflection capabilities.