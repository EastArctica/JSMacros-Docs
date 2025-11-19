# ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder<T>`

**Extends:** None (builder class)

The `ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder` class is a specialized builder for constructing array properties within annotation definitions. This builder allows you to add elements to annotation arrays, supporting various data types including strings, primitives, enums, classes, and nested annotations.

AnnotationArrayBuilder instances are obtained through the `putArray()` method of AnnotationBuilder and provide a fluent API for adding array elements before finalizing the array and returning to the parent annotation builder.

## Table of Contents

- [Obtaining an AnnotationArrayBuilder](#obtaining-an-annotationarraybuilder)
- [Array Element Methods](#array-element-methods)
- [Finalization](#finalization)
- [Usage Examples](#usage-examples)
- [Supported Element Types](#supported-element-types)

---

## Obtaining an AnnotationArrayBuilder

AnnotationArrayBuilder instances are created through the putArray() method:

```javascript
const annotationBuilder = classBuilder.addAnnotation(MyAnnotation.class);
const arrayBuilder = annotationBuilder.putArray("value");
```

---

## Array Element Methods

### putString(value)
```javascript
arrayBuilder.putString("WARNING");
arrayBuilder.putString("ERROR");
```

Adds a string element to the annotation array.

**Parameters:**
1. `value: string` - The string value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putInt(value)
```javascript
arrayBuilder.putInt(1);
arrayBuilder.putInt(42);
arrayBuilder.putInt(100);
```

Adds an integer element to the annotation array.

**Parameters:**
1. `value: number` - The integer value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putLong(value)
```javascript
arrayBuilder.putLong(1000);
arrayBuilder.putLong(System.currentTimeMillis());
```

Adds a long element to the annotation array.

**Parameters:**
1. `value: number` - The long value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putDouble(value)
```javascript
arrayBuilder.putDouble(3.14);
arrayBuilder.putDouble(2.718);
```

Adds a double element to the annotation array.

**Parameters:**
1. `value: number` - The double value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putFloat(value)
```javascript
arrayBuilder.putFloat(1.5);
arrayBuilder.putFloat(2.75);
```

Adds a float element to the annotation array.

**Parameters:**
1. `value: number` - The float value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putBoolean(value)
```javascript
arrayBuilder.putBoolean(true);
arrayBuilder.putBoolean(false);
```

Adds a boolean element to the annotation array.

**Parameters:**
1. `value: boolean` - The boolean value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putByte(value)
```javascript
arrayBuilder.putByte(10);
arrayBuilder.putByte(20);
```

Adds a byte element to the annotation array.

**Parameters:**
1. `value: number` - The byte value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putShort(value)
```javascript
arrayBuilder.putShort(100);
arrayBuilder.putShort(200);
```

Adds a short element to the annotation array.

**Parameters:**
1. `value: number` - The short value to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putChar(value)
```javascript
arrayBuilder.putChar('A');
arrayBuilder.putChar('B');
```

Adds a char element to the annotation array.

**Parameters:**
1. `value: string` - The char value to add to the array (single character)

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putClass(value)
```javascript
arrayBuilder.putClass(String.class);
arrayBuilder.putClass(List.class);
```

Adds a Class element to the annotation array.

**Parameters:**
1. `value: Class<?>` - The Class object to add to the array

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

### putEnum(enumClass, value)
```javascript
arrayBuilder.putEnum(Thread.State.class, "RUNNABLE");
arrayBuilder.putEnum(Priority.class, "HIGH");
```

Adds an enum element to the annotation array.

**Parameters:**
1. `enumClass: Class<?>` - The enum class
2. `value: string` - The enum constant name

**Returns:** `AnnotationArrayBuilder<T>` - This builder for method chaining

---

## Finalization

### finish()
```javascript
const parentBuilder = arrayBuilder.finish();
```

Finalizes the array and returns to the parent AnnotationBuilder.

**Returns:** `AnnotationBuilder<T>` - The parent AnnotationBuilder instance

**Notes:**
- This method must be called to apply the array to the annotation property
- After calling finish(), the array is finalized and the builder returns to the annotation context
- The annotation builder may need to be finalized again with its own finish() call

---

## Usage Examples

### Simple String Array
```javascript
// Create @SuppressWarnings with multiple warning types
classBuilder
    .addAnnotation(SuppressWarnings.class)
    .putArray("value")
        .putString("unchecked")
        .putString("rawtypes")
        .putString("deprecation")
        .finish()  // Finish the array
    .finish();     // Finish the annotation
```

### Mixed Primitive Array
```javascript
// Create annotation with mixed numeric values
classBuilder
    .addAnnotation(NumericArrayAnnotation.class)
    .putArray("values")
        .putInt(1)
        .putLong(1000)
        .putDouble(3.14)
        .putFloat(2.5)
        .finish()
    .finish();
```

### Class Array
```javascript
// Create annotation with multiple Class types
classBuilder
    .addAnnotation(TypeArrayAnnotation.class)
    .putArray("types")
        .putClass(String.class)
        .putClass(Integer.class)
        .putClass(List.class)
        .putClass(Map.class)
        .finish()
    .finish();
```

### Enum Array
```javascript
// Create annotation with multiple enum values
classBuilder
    .addAnnotation(StatusArrayAnnotation.class)
    .putArray("statuses")
        .putEnum(Thread.State.class, "NEW")
        .putEnum(Thread.State.class, "RUNNABLE")
        .putEnum(Thread.State.class, "TERMINATED")
        .finish()
    .finish();
```

### Complex Annotation with Multiple Arrays
```javascript
// Create a complex annotation with multiple array properties
classBuilder
    .addAnnotation(ComplexAnnotation.class)
    .putArray("stringValues")
        .putString("value1")
        .putString("value2")
        .putString("value3")
        .finish()
    .putArray("numericValues")
        .putInt(10)
        .putInt(20)
        .putInt(30)
        .finish()
    .putArray("typeValues")
        .putClass(String.class)
        .putClass(Integer.class)
        .putClass(Boolean.class)
        .finish()
    .putArray("enumValues")
        .putEnum(Priority.class, "LOW")
        .putEnum(Priority.class, "MEDIUM")
        .putEnum(Priority.class, "HIGH")
        .finish()
    .finish();
```

### Field Annotation with Arrays
```javascript
// Add field annotation with array properties
classBuilder
    .addField(String, "tags")
    .addAnnotation(FieldConstraints.class)
        .putArray("allowedValues")
            .putString("ADMIN")
            .putString("USER")
            .putString("GUEST")
            .finish()
        .putArray("maxLengths")
            .putInt(10)
            .putInt(20)
            .putInt(50)
            .finish()
        .finish()
    .end();
```

### Method Annotation with Parameter Arrays
```javascript
// Add method annotation with parameter validation arrays
classBuilder
    .addMethod(void, "process", String, int, boolean)
    .addAnnotation(ParameterValidation.class)
        .putArray("requiredParameters")
            .putInt(0)  // First parameter (String) is required
            .putInt(2)  // Third parameter (boolean) is required
            .finish()
        .putArray("maxLengths")
            .putInt(100)  // String parameter max length
            .putInt(0)    // int parameter (not applicable)
            .putInt(0)    // boolean parameter (not applicable)
            .finish()
        .finish()
    .body(`// method implementation`)
    .finish();
```

### Single Element Arrays
```javascript
// Create arrays with single elements
classBuilder
    .addAnnotation(SingleValueAnnotation.class)
    .putArray("primaryType")
        .putClass(String.class)
        .finish()
    .putArray("priorityLevel")
        .putEnum(Priority.class, "HIGH")
        .finish()
    .finish();
```

### Empty Arrays
```javascript
// Create empty arrays (allowed if annotation definition permits)
classBuilder
    .addAnnotation(EmptyArrayAnnotation.class)
    .putArray("emptyStrings")
        .finish()  // Empty string array
    .putArray("emptyClasses")
        .finish()  // Empty class array
    .finish();
```

---

## Supported Element Types

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

### Array Limitations
- All elements in an array must be of the same type
- Mixed-type arrays are not supported in Java annotations
- Array elements are added in the order they are specified
- Arrays can be empty (call finish() without adding any elements)

### Type Safety
The builder enforces type consistency within arrays. Attempting to add elements of different types to the same array will result in compilation errors when the annotation is finalized.

---

## Best Practices

1. **Consistent Types**: Ensure all elements in an array are of the same type as required by the annotation definition
2. **Order Matters**: Elements are added to arrays in the order they are specified
3. **Empty Arrays**: Call finish() without adding elements to create empty arrays where supported
4. **Complete Arrays**: Always call finish() to complete the array definition
5. **Annotation Completion**: Remember to call finish() on the parent AnnotationBuilder as well

---

## Related Classes

- `ClassBuilder.AnnotationBuilder` - Parent builder that creates AnnotationArrayBuilder instances
- `ClassBuilder` - Main class builder
- `ClassBuilder.FieldBuilder` - Field builder that supports annotations
- `ClassBuilder.MethodBuilder` - Method builder that supports annotations

## Version Information

- Available since JSMacros 1.8.4
- Part of the enhanced annotation system improvements

The AnnotationArrayBuilder provides a type-safe and convenient way to construct complex array properties within Java annotations, enabling rich metadata specification for generated classes.