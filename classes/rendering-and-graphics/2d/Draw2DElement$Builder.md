# Draw2DElement$Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.Draw2DElement$Builder`

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components`

**Extends:** `RenderElementBuilder<Draw2DElement>`

**Since:** 1.8.4

## Overview

The `Draw2DElement$Builder` class is a nested builder within `Draw2DElement` that provides a fluent API for creating and configuring `Draw2DElement` instances. This builder implements the builder pattern, allowing you to construct complex `Draw2DElement` objects with all their properties set through a chainable, readable API.

The builder is the recommended way to create `Draw2DElement` instances, as it provides type safety, method chaining, and validation during the construction process. It's typically accessed through parent container methods like `draw2DBuilder()`.

## Constructor

```java
Builder(IDraw2D<?> parent, Draw2D draw2D)
```

The builder constructor takes a parent container and a `Draw2D` instance to wrap. In most cases, you won't call this constructor directly - instead, you'll obtain a builder through the parent container's `draw2DBuilder()` method.

**Parameters:**
- `parent` (`IDraw2D<?>`) - The parent container that will contain the element
- `draw2D` (`Draw2D`) - The `Draw2D` instance to wrap

## Builder Methods

### Position Control Methods

#### `x(int x)`
**Parameters:**
- `x` (`int`) - The x-coordinate relative to the parent

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Sets the x-position of the element.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .x(100); // Position at x=100
```

#### `getX()`
**Returns:** `int` - The current x-coordinate

Gets the currently set x-coordinate.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentX = builder.getX();
```

#### `y(int y)`
**Parameters:**
- `y` (`int`) - The y-coordinate relative to the parent

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Sets the y-position of the element.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .y(50); // Position at y=50
```

#### `getY()`
**Returns:** `int` - The current y-coordinate

Gets the currently set y-coordinate.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentY = builder.getY();
```

#### `pos(int x, int y)`
**Parameters:**
- `x` (`int`) - The x-coordinate
- `y` (`int`) - The y-coordinate

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Sets both x and y positions simultaneously.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .pos(100, 50); // Position at (100, 50)
```

### Size Control Methods

#### `width(int width)`
**Parameters:**
- `width` (`int`) - The width of the element (must be non-negative)

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

**Throws:** `IllegalArgumentException` if width is negative

Sets the width of the element and creates a fixed-size supplier.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .width(200); // Set width to 200 pixels
```

#### `getWidth()`
**Returns:** `int` - The currently set width

Gets the currently set width.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentWidth = builder.getWidth();
```

#### `height(int height)`
**Parameters:**
- `height` (`int`) - The height of the element (must be non-negative)

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

**Throws:** `IllegalArgumentException` if height is negative

Sets the height of the element and creates a fixed-size supplier.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .height(150); // Set height to 150 pixels
```

#### `getHeight()`
**Returns:** `int` - The currently set height

Gets the currently set height.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentHeight = builder.getHeight();
```

#### `size(int width, int height)`
**Parameters:**
- `width` (`int`) - The width
- `height` (`int`) - The height

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Convenience method to set both width and height simultaneously.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .size(300, 200); // Set size to 300x200 pixels
```

### Transform Control Methods

#### `scale(double scale)`
**Parameters:**
- `scale` (`double`) - The scale factor (must be greater than 0)

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

**Throws:** `IllegalArgumentException` if scale is not positive

Sets the scale factor for the element. Scale affects both size and visual appearance.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .scale(1.5); // Make element 50% larger
```

#### `getScale()`
**Returns:** `float` - The current scale factor

Gets the currently set scale factor.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentScale = builder.getScale();
```

#### `rotation(double rotation)`
**Parameters:**
- `rotation` (`double`) - The rotation angle in degrees (clockwise)

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Sets the rotation angle for the element. Positive values rotate clockwise.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .rotation(45); // Rotate 45 degrees clockwise
```

#### `getRotation()`
**Returns:** `float` - The current rotation angle in degrees

Gets the currently set rotation angle.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentRotation = builder.getRotation();
```

#### `rotateCenter(boolean rotateCenter)`
**Parameters:**
- `rotateCenter` (`boolean`) - Whether to rotate around the center

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Sets whether rotation should occur around the element's center point or its origin.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .rotateCenter(true); // Rotate around center
```

#### `isRotatingCenter()`
**Returns:** `boolean` - Whether center rotation is enabled

Gets the current center rotation setting.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const centerRotation = builder.isRotatingCenter();
```

### Z-Index Control Methods

#### `zIndex(int zIndex)`
**Parameters:**
- `zIndex` (`int`) - The z-index value for render ordering

**Returns:** `Draw2DElement$Builder` - This builder for method chaining

Sets the z-index for render ordering. Higher values appear on top.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D())
    .zIndex(5); // Render above elements with lower z-index
```

#### `getZIndex()`
**Returns:** `int` - The current z-index

Gets the currently set z-index.

```javascript
const builder = hud.draw2DBuilder(Hud.createDraw2D());
const currentZIndex = builder.getZIndex();
```

### Build Methods

#### `build()`
**Returns:** `Draw2DElement` - The created `Draw2DElement` instance

Creates the `Draw2DElement` with the configured properties but does not add it to the parent container.

```javascript
const element = hud.draw2DBuilder(Hud.createDraw2D())
    .x(100)
    .y(50)
    .width(200)
    .height(100)
    .build(); // Element is created but not added
```

#### `buildAndAdd()`
**Returns:** `Draw2DElement` - The created and added `Draw2DElement` instance

Creates the `Draw2DElement` with the configured properties and automatically adds it to the parent container.

```javascript
const element = hud.draw2DBuilder(Hud.createDraw2D())
    .x(100)
    .y(50)
    .width(200)
    .height(100)
    .buildAndAdd(); // Element is created and added to parent
```

## Usage Examples

### Example 1: Basic Element Creation with Builder

```javascript
// Create main HUD container
const hud = Hud.createDraw2D();
hud.register();

// Create element using builder
const element = hud.draw2DBuilder(Hud.createDraw2D())
    .x(50)
    .y(30)
    .width(200)
    .height(150)
    .scale(1.0)
    .rotation(0)
    .zIndex(1)
    .buildAndAdd();

// Add content to the element
const elementContent = element.getDraw2D();
elementContent.addRect(0, 0, 200, 150, 0x4488FF, true);
elementContent.addText("Hello Builder!", 10, 10, 0xFFFFFF, true);
```

### Example 2: Complex Configuration with Method Chaining

```javascript
const hud = Hud.createDraw2D();
hud.register();

// Create a complex element with all properties
const complexElement = hud.draw2DBuilder(Hud.createDraw2D())
    .x(100)                                    // Position
    .y(100)
    .width(300)                                // Size
    .height(200)
    .scale(1.2)                                // Transformations
    .rotation(15)                               // 15 degree rotation
    .rotateCenter(true)                         // Rotate around center
    .zIndex(5)                                  // Render ordering
    .buildAndAdd();

// Add styled content
const content = complexElement.getDraw2D();
content.addRect(0, 0, 300, 200, 0x2a2a2a, true);  // Background
content.addRect(0, 0, 300, 200, 0x666666, false); // Border
content.addText("Complex Element", 20, 20, 0xFFFFFF, true);

Chat.log(`Element created with scale: ${complexElement.getScale()}, rotation: ${complexElement.getRotation()}°`);
```

### Example 3: Dynamic Size Configuration

```javascript
const hud = Hud.createDraw2D();
hud.register();

// Create element with parent-relative sizing
const dynamicElement = hud.draw2DBuilder(Hud.createDraw2D())
    .x(10)
    .y(10)
    .width(() => hud.getWidth() - 20)           // Full width minus margins
    .height(() => hud.getHeight() - 20)         // Full height minus margins
    .zIndex(0)
    .buildAndAdd();

const content = dynamicElement.getDraw2D();
content.addRect(0, 0, 1, 1, 0x222222, true);      // Will be resized to match parent

Chat.log(`Dynamic element size: ${dynamicElement.getWidth()}x${dynamicElement.getHeight()}`);
```

### Example 4: Multiple Elements with Different Configurations

```javascript
const hud = Hud.createDraw2D();
hud.register();

// Background element
const background = hud.draw2DBuilder(Hud.createDraw2D())
    .x(0)
    .y(0)
    .width(() => hud.getWidth())
    .height(() => hud.getHeight())
    .scale(1.0)
    .rotation(0)
    .zIndex(0)
    .buildAndAdd();

background.getDraw2D().addRect(0, 0, 1, 1, 0x1a1a1a, true);

// Central panel with rotation
const panel = hud.draw2DBuilder(Hud.createDraw2D())
    .pos(200, 150)                               // Center position
    .size(300, 200)
    .scale(0.8)                                   // Slightly smaller
    .rotation(5)                                  // Slight rotation
    .rotateCenter(true)                           // Rotate around center
    .zIndex(1)
    .buildAndAdd();

panel.getDraw2D().addRect(0, 0, 300, 200, 0x444444, true);
panel.getDraw2D().addText("Rotated Panel", 50, 50, 0xFFFFFF, true);

// Small overlay elements
const overlays = [];
for (let i = 0; i < 3; i++) {
    const overlay = hud.draw2DBuilder(Hud.createDraw2D())
        .x(50 + i * 120)
        .y(50)
        .width(100)
        .height(100)
        .scale(0.5)
        .rotation(0)
        .zIndex(2 + i)
        .buildAndAdd();

    overlay.getDraw2D().addRect(0, 0, 100, 100, 0xFF6600, true);
    overlay.getDraw2D().addText(`Overlay ${i + 1}`, 10, 10, 0xFFFFFF, true);

    overlays.push(overlay);
}
```

### Example 5: Animated Element Builder Configuration

```javascript
const hud = Hud.createDraw2D();
hud.register();

// Create element for animation
const animatedElement = hud.draw2DBuilder(Hud.createDraw2D())
    .x(100)
    .y(100)
    .width(80)
    .height(80)
    .scale(1.0)
    .rotation(0)
    .rotateCenter(true)
    .zIndex(1)
    .buildAndAdd();

// Add animated content
const content = animatedElement.getDraw2D();

// Animation state
let animationTime = 0;
let scaleDirection = 1;
let rotationSpeed = 2;

// Animation loop
events.on("RenderTick", () => {
    animationTime += 0.1;

    // Pulsating scale
    const newScale = 1.0 + Math.sin(animationTime) * 0.3;
    animatedElement.setScale(newScale);

    // Continuous rotation
    const newRotation = (animatedElement.getRotation() + rotationSpeed) % 360;
    animatedElement.setRotation(newRotation);

    // Dynamic color based on animation
    const hue = (animationTime * 30) % 360;
    const color = java.awt.Color.getHSBColor(hue / 360, 0.8, 0.8).getRGB() & 0xFFFFFF;

    // Update content
    content.clear();
    content.addCircle(40, 40, 40, color, true);
    content.addText("🎮", 25, 25, 0xFFFFFF, true);
});
```

### Example 6: Conditional Builder Configuration

```javascript
const hud = Hud.createDraw2D();
hud.register();

function createStatusElement(showDetailed, position) {
    const builder = hud.draw2DBuilder(Hud.createDraw2D());

    // Base configuration
    builder
        .x(position.x)
        .y(position.y)
        .zIndex(5);

    if (showDetailed) {
        // Detailed view
        builder
            .width(300)
            .height(150)
            .scale(1.0)
            .rotation(0);
    } else {
        // Compact view
        builder
            .width(200)
            .height(100)
            .scale(0.8)
            .rotation(0);
    }

    return builder.buildAndAdd();
}

// Create both detailed and compact versions
const detailedElement = createStatusElement(true, {x: 10, y: 10});
const compactElement = createStatusElement(false, {x: 10, y: 200});

// Add different content based on element type
const detailedContent = detailedElement.getDraw2D();
detailedContent.addRect(0, 0, 300, 150, 0x333333, true);
detailedContent.addText("Detailed Status", 10, 10, 0xFFFFFF, true);
detailedContent.addText("Health: 100/100", 10, 30, 0x00FF00, true);
detailedContent.addText("Hunger: 20/20", 10, 50, 0xFFAA00, true);

const compactContent = compactElement.getDraw2D();
compactContent.addRect(0, 0, 200, 100, 0x222222, true);
compactContent.addText("Status", 10, 10, 0xFFFFFF, true);
compactContent.addText("♥:100 🍖:20", 10, 30, 0xFFFFFF, true);
```

### Example 7: Builder with Validation

```javascript
const hud = Hud.createDraw2D();
hud.register();

function createValidatedElement(config) {
    const builder = hud.draw2DBuilder(Hud.createDraw2D());

    // Apply configuration with validation
    if (config.x !== undefined && config.x >= 0) {
        builder.x(config.x);
    } else {
        Chat.log("Invalid x position, using default");
        builder.x(10);
    }

    if (config.y !== undefined && config.y >= 0) {
        builder.y(config.y);
    } else {
        Chat.log("Invalid y position, using default");
        builder.y(10);
    }

    if (config.width && config.width > 0) {
        builder.width(config.width);
    } else {
        builder.width(100);
    }

    if (config.height && config.height > 0) {
        builder.height(config.height);
    } else {
        builder.height(50);
    }

    if (config.scale && config.scale > 0) {
        builder.scale(config.scale);
    } else {
        builder.scale(1.0);
    }

    if (typeof config.rotation === 'number') {
        builder.rotation(config.rotation);
    } else {
        builder.rotation(0);
    }

    if (typeof config.zIndex === 'number') {
        builder.zIndex(config.zIndex);
    } else {
        builder.zIndex(0);
    }

    return builder.buildAndAdd();
}

// Test with valid configuration
const validConfig = {
    x: 50,
    y: 50,
    width: 200,
    height: 100,
    scale: 1.2,
    rotation: 15,
    zIndex: 1
};

const element = createValidatedElement(validConfig);
element.getDraw2D().addRect(0, 0, 200, 100, 0x4488FF, true);
element.getDraw2D().addText("Validated Element", 10, 10, 0xFFFFFF, true);
```

## Important Notes

### Builder Pattern Benefits

1. **Type Safety:** Builder methods provide compile-time type checking for all parameters
2. **Method Chaining:** All configuration methods return the builder for fluent API usage
3. **Validation:** Parameters are validated during the build process
4. **Readability:** Method names clearly indicate what property is being set

### Build Method Selection

1. **`build()`:** Use when you want to create the element but add it to the parent manually
2. **`buildAndAdd()`:** Use when you want to create and add the element in one operation (most common use case)

### Performance Considerations

1. **Reuse:** Builders are not reusable after calling a build method
2. **Chaining:** Long method chains are efficient but consider readability
3. **Configuration:** Set all properties before building for optimal performance

### Default Values

The builder uses sensible defaults:
- **Position:** (0, 0) if not specified
- **Size:** Current parent size if not specified
- **Scale:** 1.0 (no scaling)
- **Rotation:** 0 degrees
- **Z-Index:** 0 (background layer)
- **Rotate Center:** false (rotate around origin)

## Best Practices

1. **Method Chaining:** Use method chaining for readable configuration
2. **Build Choice:** Use `buildAndAdd()` for most cases, `build()` only when manual addition is needed
3. **Validation:** Validate configuration values before building
4. **Readability:** Break long method chains across multiple lines for clarity
5. **Error Handling:** Catch potential exceptions during element creation

## Related Classes

- [`Draw2DElement`](Draw2DElement.md) - Parent class that this builder creates
- [`RenderElementBuilder`](RenderElementBuilder.md) - Base builder class
- [`Draw2D`](Draw2D.md) - The 2D drawing class wrapped by the element
- [`IDraw2D`](IDraw2D.md) - Interface for parent containers
- [`RenderElement`](RenderElement.md) - Base interface for render elements

## Version History

- **1.8.4:** Initial introduction with comprehensive element configuration support
- **Current:** Enhanced validation and improved method chaining