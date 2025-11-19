# RenderElementBuilder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.RenderElementBuilder`

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components`

**Since:** JsMacros 1.8.4

**Type:** Abstract Class

**Implements:** None

**Extends:** None

**Generic Type Parameter:** `T extends RenderElement` - The type of render element this builder creates

## Overview

The `RenderElementBuilder` is an abstract base class that provides the foundation for the builder pattern implementation in JSMacros' rendering system. It serves as the parent class for all specific render element builders (such as `Rect.Builder`, `Text.Builder`, `Line.Builder`, etc.) and provides common functionality for creating and adding render elements to 2D drawing contexts.

This class implements the builder pattern to allow for fluent, method-chaining configuration of render elements before their creation. It manages the relationship between the builder and its parent `IDraw2D` context, enabling both standalone element creation and automatic addition to the drawing context.

## Class Purpose

The `RenderElementBuilder` class exists to:

1. **Standardize Builder Pattern**: Provide a consistent interface for all render element builders
2. **Context Management**: Maintain the relationship between builders and their drawing contexts
3. **Element Creation**: Handle the final creation of configured render elements
4. **Automatic Integration**: Support both standalone element creation and automatic addition to drawing contexts

## Direct Subclasses

This abstract class is extended by concrete builder implementations including:

- `Rect.Builder` - For creating rectangle elements
- `Text.Builder` - For creating text elements
- `Line.Builder` - For creating line elements
- `Image.Builder` - For creating image elements
- `Item.Builder` - For creating item render elements
- `Draw2DElement.Builder` - For creating custom 2D elements

## Constructors

### Protected Constructor
The `RenderElementBuilder` class has a protected constructor that is used by subclasses.

```java
protected RenderElementBuilder(IDraw2D<?> parent)
```

**Parameters:**
- `parent: IDraw2D<?>` - The drawing context this builder is associated with

**Notes:** This constructor is only accessible to subclasses and is not meant to be instantiated directly by user code.

---

## Methods

### Protected Abstract Methods

#### [createElement()](#createelement)

Abstract method that must be implemented by subclasses to create the specific render element type.

```java
protected abstract T createElement();
```

**Parameters:**
* `(none)`

**Returns:**
* `T` - The newly created render element

**Notes:**
- This method is protected and abstract - it must be implemented by each concrete subclass
- The implementation should create a render element using the builder's current configuration
- This method is called internally by `build()` and `buildAndAdd()`
- User code typically doesn't call this method directly

---

## Usage Examples

### Understanding the Abstract Nature

The `RenderElementBuilder` is abstract and cannot be instantiated directly. You work with concrete subclasses:

```javascript
// This will NOT work - RenderElementBuilder is abstract
// const builder = new RenderElementBuilder(draw2D); // ERROR!

// This works - use concrete subclasses
const rectBuilder = Hud.rectBuilder();      // Rect.Builder extends RenderElementBuilder
const textBuilder = Hud.textBuilder();      // Text.Builder extends RenderElementBuilder
const lineBuilder = Hud.lineBuilder();      // Line.Builder extends RenderElementBuilder
```

### Using Build Pattern

All concrete builders inherit the same two final methods from `RenderElementBuilder`:

```javascript
// Using build() - create element, add manually
const rect1 = Hud.rectBuilder()
    .pos(10, 10, 100, 50)
    .color(0xFF0000)
    .build();

Hud.addRect(rect1); // Add manually

// Using buildAndAdd() - create and add automatically
const rect2 = Hud.rectBuilder()
    .pos(120, 10, 220, 50)
    .color(0x00FF00)
    .buildAndAdd(); // Automatically added

// Both achieve the same result, but buildAndAdd() is more convenient
```

### Element Creation vs Element Addition

Understanding the difference between `build()` and `buildAndAdd()`:

```javascript
// Create element but don't display immediately
const delayedRect = Hud.rectBuilder()
    .size(200, 100)
    .color(0x0000FF)
    .build(); // Element created but not displayed

// Store for later use
const storedElements = [delayedRect];

// Add to display later when needed
events.on("KeyPress", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.r") {
        // Add the stored elements to display
        storedElements.forEach(element => {
            Hud.addElement(element);
        });
    }
}));
```

### Working with Multiple Contexts

The builder maintains a reference to its parent drawing context:

```javascript
// Create elements for different contexts
const hudElement = Hud.rectBuilder()
    .pos(10, 10, 100, 50)
    .color(0xFF0000)
    .buildAndAdd(); // Added to HUD context

// Create a custom screen
const screen = Hud.createScreen("My Screen", true);
const screenElement = screen.rectBuilder()
    .pos(10, 10, 100, 50)
    .color(0x00FF00)
    .buildAndAdd(); // Added to screen context

// Each builder is tied to its specific context
```

### Element Pre-configuration

Use `build()` when you need to pre-configure elements:

```javascript
function createButtonElements() {
    const elements = [];

    // Pre-configure multiple button states
    const normalButton = Hud.rectBuilder()
        .size(100, 30)
        .color(0xCCCCCC)
        .build();

    const hoverButton = Hud.rectBuilder()
        .size(100, 30)
        .color(0xAAAAAA)
        .build();

    const pressedButton = Hud.rectBuilder()
        .size(100, 30)
        .color(0x888888)
        .build();

    elements.push(normalButton, hoverButton, pressedButton);
    return elements;
}

// Create the elements once
const buttonStates = createButtonElements();

// Use them later as needed
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const mouseX = Hud.getMouseX();
    const mouseY = Hud.getMouseY();

    // Switch between pre-configured button states
    if (isMouseOverButton(mouseX, mouseY)) {
        if (isMousePressed()) {
            Hud.addButton(buttonStates[2]); // Pressed state
        } else {
            Hud.addButton(buttonStates[1]); // Hover state
        }
    } else {
        Hud.addButton(buttonStates[0]); // Normal state
    }
}));
```

## Implementation Details

### Generic Type System

The `RenderElementBuilder` uses generics to ensure type safety:

```java
public abstract class RenderElementBuilder<T extends RenderElement>
```

This means:
- `T` is constrained to be a subtype of `RenderElement`
- Each concrete builder specifies its exact return type
- The compiler ensures type safety throughout the builder hierarchy

### Context Management

The builder maintains a reference to its parent drawing context:

```javascript
// The builder knows its parent context
const builder = Hud.rectBuilder(); // parent = Hud context

// When buildAndAdd() is called, it uses that reference
builder.buildAndAdd(); // Adds to Hud context automatically
```

### Inheritance Hierarchy

```
RenderElementBuilder<T> (abstract)
├── Rect.Builder
├── Text.Builder
├── Line.Builder
├── Image.Builder
├── Item.Builder
└── Draw2DElement.Builder
```

All concrete builders inherit the same `build()` and `buildAndAdd()` methods.

## Common Patterns

### Factory Method Pattern

The `RenderElementBuilder` serves as a factory for render elements:

```javascript
// Factory method through context
const rect = Hud.rectBuilder()
    .configure()
    .build(); // Factory method call
```

### Fluent Interface

All builders provide a fluent interface through method chaining:

```javascript
// Method chaining enabled by returning self from each configuration method
const element = context.someBuilder()
    .property1(value1)
    .property2(value2)
    .property3(value3)
    .build(); // Final creation step
```

### Builder Pattern Benefits

The builder pattern provides several advantages:

1. **Readable Configuration**: Method chaining makes configuration clear
2. **Flexible Construction**: Optional parameters can be omitted
3. **Immutable Objects**: Final elements are typically immutable
4. **Type Safety**: Generics ensure type correctness
5. **Context Integration**: Automatic addition to drawing contexts

## Error Handling

### Common Issues

1. **Instantiation Error**: Cannot instantiate abstract class directly
   ```javascript
   // WRONG
   const builder = new RenderElementBuilder(context); // throws error

   // RIGHT
   const builder = Hud.rectBuilder(); // Use concrete subclass
   ```

2. **Missing Implementation**: Subclasses must implement `createElement()`
   ```java
   // Subclass must implement this method
   protected abstract T createElement();
   ```

3. **Null Context**: Builder requires a valid drawing context
   ```javascript
   // All builders are created from valid contexts
   const builder = Hud.rectBuilder(); // Context is automatically provided
   ```

## Performance Considerations

1. **Builder Reuse**: Create builders once and reuse when creating similar elements
2. **Batch Operations**: Create multiple elements at once when possible
3. **Memory Management**: Use `build()` vs `buildAndAdd()` appropriately based on when elements should be displayed

## Related Classes

### Parent Interfaces
- `IDraw2D` - Interface that provides access to element builders
- `RenderElement` - Base interface for all renderable elements

### Concrete Implementations
- `Rect.Builder` - Rectangle element builder
- `Text.Builder` - Text element builder
- `Line.Builder` - Line element builder
- `Image.Builder` - Image element builder
- `Item.Builder` - Item element builder

### Supporting Classes
- `Draw2D` - 2D drawing context implementation
- `Hud` - HUD drawing context
- `Screen` - Screen drawing context

## Version History

- **1.8.4**: Initial release with abstract builder pattern support
- **Current**: Enhanced with comprehensive generic type safety and context management

## Design Pattern

The `RenderElementBuilder` class implements the **Builder Pattern** with these key elements:

1. **Director**: The drawing context (Hud, Screen, etc.)
2. **Builder**: The abstract base class (`RenderElementBuilder`)
3. **Concrete Builders**: Specific builders for each element type
4. **Product**: The final render element

This design provides:
- **Separation of Concerns**: Construction logic separated from representation
- **Flexible Construction**: Different configurations for the same element type
- **Chaining Support**: Fluent interface for readable code
- **Type Safety**: Generic type constraints ensure correct usage