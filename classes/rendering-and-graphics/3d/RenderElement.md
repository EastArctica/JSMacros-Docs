# RenderElement

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components.RenderElement`

**Extends:** `Drawable`

**Since:** JsMacros 1.0.5

The `RenderElement` is the base interface for all 2D rendering components in JsMacros. It defines the fundamental functionality for rendering visual elements on the screen, providing a standardized framework for 2D graphics such as text, images, rectangles, lines, and other UI components. This interface is implemented by various rendering components that can be added to a `Draw2D` context for screen-space visualization.

## Overview

The `RenderElement` interface serves as the foundation for 2D rendering in JsMacros, providing:

- Standardized rendering method that integrates with Minecraft's GUI rendering system
- Z-index support for controlling element rendering order
- Matrix transformation utilities for positioning, scaling, and rotation
- Integration with the `Draw2D` rendering system for screen-space visualization
- Compatibility with Minecraft's `Drawable` interface for seamless integration

## Interface Definition

```java
public interface RenderElement extends Drawable
```

This interface extends Minecraft's `Drawable` interface, allowing RenderElement instances to be used anywhere a standard Minecraft drawable is expected.

## Implementing Classes

The following classes implement the `RenderElement` interface:

- `Draw2DElement` - Wrapper class for Draw2D components with positioning support
- `Text` - Text rendering with customizable fonts, colors, and styling
- `Image` - Image rendering with scaling, rotation, and transformation support
- `Rect` - Rectangle rendering with fill, outline, and corner radius options
- `Line` - Line rendering with customizable thickness, colors, and endpoints
- `Item` - Minecraft item rendering for displaying items as UI elements

## Constants

## Methods

## Usage Examples

### Basic Element Creation and Usage
```javascript
// Create a Draw2D context to hold RenderElement instances
const draw2D = Hud.createDraw2D();

// Create different types of RenderElement implementations
const text = new Text("Hello World", 10, 10, 0xFFFFFF, 0, false, 1.0, 0);
const rect = new Rect(5, 30, 200, 50, 0xFF0000FF, 0, 0xFF000000, true, 0);
const image = new Image("my_texture.png", 10, 90, 100, 100, 0xFFFFFFFF, 0, 1.0, 0);

// All these implement RenderElement interface
// Check their z-index values
Chat.log(`Text z-index: ${text.getZIndex()}`);    // 0
Chat.log(`Rect z-index: ${rect.getZIndex()}`);    // 0
Chat.log(`Image z-index: ${image.getZIndex()}`);  // 0

// Add elements to the drawing context
draw2D.addText(text);
draw2D.addRect(rect);
draw2D.addImage(image);

// Register with HUD system
Hud.registerDraw2D(draw2D);
```

### Z-Index Ordering
```javascript
// Create elements with specific rendering order
const background = new Rect(0, 0, 300, 200, 0xFF333333, 0, 0xFF333333, true, 0);   // Background layer
const middleLayer = new Text("Middle Layer", 50, 50, 0xFFFFFF, 10, false, 1.0, 0); // z-index: 10
const foreground = new Rect(100, 100, 80, 30, 0xFFFF0000, 20, 0xFFFF0000, true, 0); // Foreground layer

const draw2D = Hud.createDraw2D();

// Add in any order - they will render by z-index
draw2D.addRect(foreground);  // z-index: 20 (renders last/on top)
draw2D.addRect(background);  // z-index: 0  (renders first/bottom)
draw2D.addText(middleLayer); // z-index: 10 (renders in middle)

// Rendering order: background (0) -> middleLayer (10) -> foreground (20)
Hud.registerDraw2D(draw2D);
```

### Custom RenderElement Implementation
```javascript
// Example of implementing a custom RenderElement
class CustomCircle implements RenderElement {
    constructor(x, y, radius, color, zIndex) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.zIndex = zIndex || 0;
    }

    // Required: Implement getZIndex
    getZIndex() {
        return this.zIndex;
    }

    // Required: Implement render (inherited from Drawable)
    render(drawContext, mouseX, mouseY, tickDelta) {
        const matrices = drawContext.getMatrices();

        // Use the built-in matrix setup utility
        this.setupMatrix(matrices, this.x, this.y, 1.0, 0);

        // Custom circle rendering logic would go here
        // This is simplified - actual implementation would use vertex buffers
        this.drawCircle(drawContext, this.radius, this.color);
    }

    drawCircle(drawContext, radius, color) {
        // Implementation would use Tessellator and BufferBuilder
        // to draw a filled circle at the current matrix position
        // This is just a placeholder for the actual rendering code
    }
}

// Usage
const circle = new CustomCircle(150, 150, 25, 0xFF00FF00, 5);
const draw2D = Hud.createDraw2D();
draw2D.addCustom(circle); // Assuming Draw2D has a method to add custom elements
```

### Transformations and Animations
```javascript
// Animated element using matrix transformations
class AnimatedText implements RenderElement {
    constructor(text, x, y, color, zIndex) {
        this.text = text;
        this.baseX = x;
        this.baseY = y;
        this.color = color;
        this.zIndex = zIndex || 0;
        this.animationTime = 0;
    }

    getZIndex() {
        return this.zIndex;
    }

    render(drawContext, mouseX, mouseY, tickDelta) {
        this.animationTime += tickDelta;

        // Calculate animated values
        const scale = 1.0 + Math.sin(this.animationTime * 2) * 0.2; // Pulsing scale
        const rotation = Math.sin(this.animationTime) * 10; // Gentle rotation

        const matrices = drawContext.getMatrices();

        // Apply transformations using the utility method
        const textWidth = 100; // Approximate text width
        const textHeight = 20; // Approximate text height
        this.setupMatrix(matrices, this.baseX, this.baseY, scale, rotation, textWidth, textHeight, true);

        // Render the text at the transformed position
        drawContext.drawText(RenderElement.mc.textRenderer, this.text, 0, 0, this.color);
    }
}

// Create and use the animated text
const animatedText = new AnimatedText("Pulsing Text", 200, 100, 0xFFFFFF00, 15);
const draw2D = Hud.createDraw2D();
draw2D.addCustom(animatedText);
Hud.registerDraw2D(draw2D);
```

### Working with Draw2D Context
```javascript
// RenderElement instances are managed through Draw2D contexts
const draw2D = Hud.createDraw2D();

// Add various elements
draw2D.addText(new Text("Header", 10, 10, 0xFFFFFF, 10, false, 1.5, 0));
draw2D.addRect(new Rect(5, 35, 200, 2, 0xFF666666, 5, 0xFF666666, true, 0));
draw2D.addImage(new Image("icon.png", 10, 45, 32, 32, 0xFFFFFFFF, 15, 1.0, 0));

// Access elements (all implement RenderElement)
const texts = draw2D.getTexts();       // List<Text>
const rects = draw2D.getRects();       // List<Rect>
const images = draw2D.getImages();     // List<Image>

// All can be treated as RenderElement
const allElements = [];
allElements.push(...texts);
allElements.push(...rects);
allElements.push(...images);

// Sort by z-index
allElements.sort((a, b) => a.getZIndex() - b.getZIndex());

// Log z-index information
allElements.forEach(element => {
    Chat.log(`Element z-index: ${element.getZIndex()}`);
});

// Register the context
Hud.registerDraw2D(draw2D);
```

## Integration with Draw2D

`RenderElement` objects are designed to work seamlessly with the `Draw2D` system:

```javascript
// Create a Draw2D context
const draw2D = Hud.createDraw2D();

// Register it with the HUD system
Hud.registerDraw2D(draw2D);

// Add RenderElement implementations
draw2D.addText(myText);
draw2D.addRect(myRect);
draw2D.addImage(myImage);
draw2D.addLine(myLine);

// The rendering system will automatically:
// 1. Sort elements by z-index each frame
// 2. Call render() on each element with appropriate parameters
// 3. Handle matrix transformations and coordinate systems
// 4. Integrate with Minecraft's GUI rendering pipeline
```

## Rendering Pipeline

`RenderElement` elements follow this rendering pipeline:

1. **Creation**: Elements are created through constructors or builders
2. **Registration**: Elements are added to a `Draw2D` context using appropriate add methods
3. **Sorting**: Elements are sorted by z-index for proper layering
4. **Rendering**: Each frame, `render()` is called on all elements with current mouse position and tick delta
5. **Transformation**: Elements use matrix utilities for positioning, scaling, and rotation
6. **Cleanup**: Elements are automatically managed by the `Draw2D` context

## Matrix Transformation Guide

The `setupMatrix` methods provide convenient ways to handle common transformations:

### Basic Transformations
```javascript
// Simple positioning and scaling
setupMatrix(matrices, x, y, scale, rotation);

// Position at (100, 50), 2x larger, rotated 30 degrees
setupMatrix(matrices, 100, 50, 2.0, 30);
```

### Center-Point Rotation
```javascript
// Rotate around element center
setupMatrix(matrices, x, y, scale, rotation, width, height, true);

// 100x50 rectangle rotated around its center
setupMatrix(matrices, 200, 150, 1.0, 45, 100, 50, true);
```

### Transformation Order
The matrix operations are applied in this specific order:
1. Translate to position (x, y)
2. Apply scale
3. If center rotation: translate to center point
4. Apply rotation
5. If center rotation: translate back from center
6. Translate back to origin

This ensures predictable transformation behavior for all elements.

## Performance Considerations

- **Z-Index Sorting**: Elements are sorted by z-index each frame, so avoid unnecessarily high z-index values
- **Matrix Operations**: The built-in matrix utilities are optimized for common use cases
- **Batching**: Similar elements should be grouped when possible for better GPU performance
- **State Changes**: Minimize OpenGL state changes between elements for better performance

## Related Classes

- `Draw2D` - Main 2D drawing context that manages RenderElement instances
- `Drawable` - Minecraft interface that RenderElement extends
- `DrawContext` - Minecraft's drawing context for rendering operations
- `MatrixStack` - Minecraft's matrix transformation system
- `Draw2DElement` - Wrapper class for Draw2D components
- `Text`, `Image`, `Rect`, `Line`, `Item` - Concrete RenderElement implementations

## Implementation Guidelines

When creating custom elements that implement `RenderElement`:

1. **Required Methods**:
   - Implement `getZIndex()` to return the element's layer order
   - Implement `render(DrawContext, int, int, float)` for actual rendering

2. **Matrix Transformations**:
   - Use the provided `setupMatrix()` methods for positioning and transformations
   - These methods handle the complex matrix math for common operations

3. **Rendering Integration**:
   - Add elements to `Draw2D` using the appropriate methods
   - Use Minecraft's rendering system within the `render()` method
   - Access `RenderElement.mc` for the Minecraft client instance when needed

4. **Z-Index Management**:
   - Use appropriate z-index values for proper layering
   - Consider the rendering order when designing UI layouts

## Version History

- **1.0.5:** Initial release with basic RenderElement interface and Drawable integration
- **1.2.0:** Enhanced matrix transformation utilities with center-point rotation support
- **1.6.5:** Improved rendering pipeline integration and performance optimizations
- **1.8.4:** Added Draw2DElement wrapper and enhanced element management
- **Current:** Stable interface with comprehensive 2D rendering support and transformation utilities

