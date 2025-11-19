# RenderElement3D

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.RenderElement3D<T>`

**Extends:** `Comparable<RenderElement3D<?>>`

**Since:** JsMacros 1.0.5

The `RenderElement3D` is a generic interface that defines the base functionality for all 3D rendering elements in JsMacros. It provides a common framework for rendering 3D objects in the world such as boxes, lines, and trace lines. This interface is implemented by various 3D rendering components that can be added to a `Draw3D` context for visualization in the Minecraft world.

## Overview

The `RenderElement3D` interface serves as the foundation for 3D rendering in JsMacros, providing:

- Standardized rendering method that integrates with Minecraft's rendering system
- Comparable interface for sorting and ordering 3D elements
- Generic type parameter `T` that allows implementing classes to specify their own type for method chaining
- Integration with the `Draw3D` rendering system for world-space visualization

## Interface Definition

```java
public interface RenderElement3D<T extends RenderElement3D<?>> extends Comparable<RenderElement3D<?>>
```

This generic interface uses a self-referential type parameter `T` that allows implementing classes to return their specific type from methods, enabling method chaining and type-safe operations.

## Implementing Classes

The following classes implement the `RenderElement3D` interface:

- `Box` - 3D cuboid/box rendering with customizable colors and fill
- `Line3D` - 3D line rendering with configurable endpoints and colors
- `TraceLine` - 3D trace line rendering for ray casting visualization
- `EntityTraceLine` - Specialized trace line for entity tracking

## Methods

## Usage Examples

### Basic Usage Pattern
```javascript
// RenderElement3D instances are typically created through Draw3D builders
const draw3D = Hud.createDraw3D();

// Create a box (implements RenderElement3D)
const box = new Box(0, 64, 0, 10, 74, 10, 0xFFFF0000, 0x800000FF, true, false);

// Add the element to the drawing context
draw3D.addBox(box);

// The element will be automatically rendered each frame
```

### Working with Different Element Types
```javascript
const draw3D = Hud.createDraw3D();

// Create different types of RenderElement3D implementations
const box = new Box(5, 65, 5, 15, 75, 15, 0xFF00FF00, 0x8000FF00, true, false);
const line = new Line3D(0, 64, 0, 20, 84, 20, 0xFF0000FF, false);
const traceLine = new TraceLine(Player.getPlayer(), 10, 0xFFFFFF00, 2);

// Add them to the drawing context
draw3D.addBox(box);
draw3D.addLine(line);
draw3D.addTraceLine(traceLine);

// All elements implement the same RenderElement3D interface
const elements = draw3D.getBoxes().concat(draw3D.getLines()).concat(draw3D.getTraceLines());

// Sort elements (uses the compareTo method)
elements.sort((a, b) => a.compareTo(b));
```

### Generic Type Parameter Usage
```javascript
// The generic type T allows implementing classes to be type-safe
// For example, in the Box class:
class Box implements RenderElement3D<Box> {
    // Methods can return 'Box' instead of 'RenderElement3D'
    public Box setColor(int color) {
        // implementation
        return this; // Returns Box, not RenderElement3D
    }
}

// This enables method chaining:
const box = new Box(0, 0, 0, 10, 10, 10, 0xFF0000, 0xFF0000, true, false)
    .setColor(0x00FF00)  // Returns Box
    .setFill(false);      // Returns Box
```

### Accessing Elements from Draw3D
```javascript
const draw3D = Hud.createDraw3D();

// Add various elements
draw3D.addBox(new Box(0, 64, 0, 5, 69, 5, 0xFFFF0000, 0x800000FF, true, false));
draw3D.addLine(new Line3D(10, 64, 10, 15, 69, 15, 0xFF00FF00, false));

// Get specific element types (all implement RenderElement3D)
const boxes = draw3D.getBoxes();        // List<Box>
const lines = draw3D.getLines();        // List<Line3D>
const traceLines = draw3D.getTraceLines(); // List<TraceLine>

// All elements can be treated as RenderElement3D
const allElements = [];
allElements.push(...boxes);
allElements.push(...lines);
allElements.push(...traceLines);

// Compare and sort elements
allElements.sort((a, b) => a.compareTo(b));
```

## Integration with Draw3D

`RenderElement3D` objects are designed to work seamlessly with the `Draw3D` system:

```javascript
// Create a Draw3D context
const draw3D = Hud.createDraw3D();

// Register it with the HUD system
Hud.registerDraw3D(draw3D);

// Add RenderElement3D implementations
draw3D.addBox(myBox);
draw3D.addLine(myLine);
draw3D.addTraceLine(myTraceLine);

// The rendering system will automatically:
// 1. Call render() on each element every frame
// 2. Use compareTo() to sort elements for consistent rendering order
// 3. Handle depth testing and other rendering details
```

## Implementation Guidelines

When creating custom 3D rendering elements that implement `RenderElement3D`:

1. **Generic Type Parameter**: Specify your class as the type parameter: `implements RenderElement3D<YourClass>`

2. **Required Methods**:
   - Implement `render(DrawContext, float)` for actual rendering
   - Implement `compareToSame(YourClass)` for type-specific comparison

3. **Rendering Integration**:
   - Add elements to `Draw3D` using the appropriate add methods
   - Use Minecraft's rendering system within the `render()` method
   - Handle transformation matrices and vertex building

4. **Performance Considerations**:
   - Keep rendering operations efficient
   - Use appropriate culling and depth testing
   - Minimize state changes for better performance

## Rendering Pipeline

`RenderElement3D` elements follow this rendering pipeline:

1. **Creation**: Elements are created through constructors or builders
2. **Registration**: Elements are added to a `Draw3D` context
3. **Sorting**: Elements are sorted using `compareTo()` for consistent rendering
4. **Rendering**: Each frame, `render()` is called on all elements
5. **Cleanup**: Elements are automatically managed by the `Draw3D` context

## Performance Notes

- **Sorting**: Elements are sorted each frame to ensure consistent rendering order
- **Culling**: Use appropriate depth testing and face culling for performance
- **Batching**: Similar elements should be grouped when possible for better performance
- **State Management**: Minimize OpenGL state changes between elements

## Related Classes

- `Draw3D` - Main 3D drawing context that manages RenderElement3D instances
- `Box` - 3D box/cuboid rendering implementation
- `Line3D` - 3D line rendering implementation
- `TraceLine` - Ray cast visualization implementation
- `EntityTraceLine` - Entity-specific trace line implementation
- `DrawContext` - Minecraft's drawing context for rendering operations
- `Comparable<T>` - Java interface for ordering objects

## Version History

- **1.0.5:** Initial release with basic RenderElement3D interface
- **1.0.6:** Enhanced integration with Draw3D and improved sorting
- **1.6.5:** Added support for Surface elements in 3D rendering
- **1.9.0:** Added TraceLine and EntityTraceLine implementations
- **Current:** Stable interface with comprehensive 3D rendering support