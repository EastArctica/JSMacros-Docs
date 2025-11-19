# Surface$Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Surface$Builder`

**Package:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d`

**Extends:** `RenderElement3DBuilder<Surface>`

**Since:** 1.8.4

## Overview

The `Surface$Builder` class is a nested builder within `Surface` that provides a fluent API for creating and configuring `Surface` instances. This builder implements the builder pattern, allowing you to construct complex 3D surfaces with all their properties set through a chainable, readable API.

The builder is the recommended way to create `Surface` instances for 3D rendering, as it provides type safety, method chaining, and validation during the construction process. It's typically accessed through the `Draw3D` context's `surfaceBuilder()` method.

## Constructor

```java
Builder()
```

The builder constructor creates an empty builder that will construct a `Surface` instance. In most cases, you won't call this constructor directly - instead, you'll obtain a builder through the `Draw3D.surfaceBuilder()` method.

## Builder Methods

### Position Control Methods

#### `pos(double x, double y, double z)`
**Parameters:**
- `x` (`double`) - The x-coordinate in world space
- `y` (`double`) - The y-coordinate in world space
- `z` (`double`) - The z-coordinate in world space

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the position of the surface in world coordinates.

```javascript
const builder = draw3D.surfaceBuilder()
    .pos(100, 65, 200); // Position at world coordinates
```

#### `x(double x)`
**Parameters:**
- `x` (`double`) - The x-coordinate in world space

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the x-coordinate of the surface position.

```javascript
const builder = draw3D.surfaceBuilder()
    .x(50); // Set x coordinate
```

#### `y(double y)`
**Parameters:**
- `y` (`double`) - The y-coordinate in world space

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the y-coordinate of the surface position.

```javascript
const builder = draw3D.surfaceBuilder()
    .y(70); // Set y coordinate
```

#### `z(double z)`
**Parameters:**
- `z` (`double`) - The z-coordinate in world space

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the z-coordinate of the surface position.

```javascript
const builder = draw3D.surfaceBuilder()
    .z(150); // Set z coordinate
```

### Rotation Control Methods

#### `rotation(double x, double y, double z)`
**Parameters:**
- `x` (`double`) - Rotation angle around x-axis in degrees
- `y` (`double`) - Rotation angle around y-axis in degrees
- `z` (`double`) - Rotation angle around z-axis in degrees

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the rotation angles for all three axes in degrees.

```javascript
const builder = draw3D.surfaceBuilder()
    .rotation(0, 45, 0); // Rotate 45 degrees around y-axis
```

#### `rotationX(double x)`
**Parameters:**
- `x` (`double`) - Rotation angle around x-axis in degrees

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the rotation angle around the x-axis (pitch).

```javascript
const builder = draw3D.surfaceBuilder()
    .rotationX(30); // Pitch up 30 degrees
```

#### `rotationY(double y)`
**Parameters:**
- `y` (`double`) - Rotation angle around y-axis in degrees

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the rotation angle around the y-axis (yaw).

```javascript
const builder = draw3D.surfaceBuilder()
    .rotationY(90); // Face east
```

#### `rotationZ(double z)`
**Parameters:**
- `z` (`double`) - Rotation angle around z-axis in degrees

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the rotation angle around the z-axis (roll).

```javascript
const builder = draw3D.surfaceBuilder()
    .rotationZ(15); // Roll 15 degrees
```

### Size Control Methods

#### `size(double width, double height)`
**Parameters:**
- `width` (`double`) - The width of the surface in world units
- `height` (`double`) - The height of the surface in world units

**Returns:** `Surface$Builder` - This builder for method chaining

Sets both width and height dimensions of the surface.

```javascript
const builder = draw3D.surfaceBuilder()
    .size(5.0, 3.0); // 5x3 blocks
```

#### `width(double width)`
**Parameters:**
- `width` (`double`) - The width of the surface in world units

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the width dimension of the surface.

```javascript
const builder = draw3D.surfaceBuilder()
    .width(4.0); // 4 blocks wide
```

#### `height(double height)`
**Parameters:**
- `height` (`double`) - The height of the surface in world units

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the height dimension of the surface.

```javascript
const builder = draw3D.surfaceBuilder()
    .height(2.0); // 2 blocks high
```

### Entity Binding Methods

#### `bindToEntity(EntityHelper entity)`
**Parameters:**
- `entity` (`EntityHelper`) - The entity to bind the surface to

**Returns:** `Surface$Builder` - This builder for method chaining

Binds the surface to follow the specified entity. The surface will automatically update its position to follow the entity.

```javascript
const builder = draw3D.surfaceBuilder()
    .bindToEntity(player); // Follow the player
```

#### `bindToEntityId(String entityId)`
**Parameters:**
- `entityId` (`String`) - The UUID of the entity to bind to

**Returns:** `Surface$Builder` - This builder for method chaining

Binds the surface to follow the entity with the specified UUID.

```javascript
const builder = draw3D.surfaceBuilder()
    .bindToEntityId("550e8400-e29b-41d4-a716-446655440000");
```

#### `boundOffset(double x, double y, double z)`
**Parameters:**
- `x` (`double`) - X offset from the bound entity
- `y` (`double`) - Y offset from the bound entity
- `z` (`double`) - Z offset from the bound entity

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the offset position relative to the bound entity.

```javascript
const builder = draw3D.surfaceBuilder()
    .bindToEntity(player)
    .boundOffset(0, 2.0, -3.0); // 2 blocks up, 3 blocks in front
```

#### `boundOffsetX(double x)`
**Parameters:**
- `x` (`double`) - X offset from the bound entity

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the x offset from the bound entity.

```javascript
const builder = draw3D.surfaceBuilder()
    .boundOffsetX(1.0); // 1 block to the right
```

#### `boundOffsetY(double y)`
**Parameters:**
- `y` (`double`) - Y offset from the bound entity

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the y offset from the bound entity.

```javascript
const builder = draw3D.surfaceBuilder()
    .boundOffsetY(3.0); // 3 blocks above
```

#### `boundOffsetZ(double z)`
**Parameters:**
- `z` (`double`) - Z offset from the bound entity

**Returns:** `Surface$Builder` - This builder for method chaining

Sets only the z offset from the bound entity.

```javascript
const builder = draw3D.surfaceBuilder()
    .boundOffsetZ(-2.0); // 2 blocks behind
```

### Player-Facing Methods

#### `rotateToPlayer(boolean rotateToPlayer)`
**Parameters:**
- `rotateToPlayer` (`boolean`) - Whether to rotate the surface to face the player

**Returns:** `Surface$Builder` - This builder for method chaining

Sets whether the surface should automatically rotate to face the player (billboarding effect).

```javascript
const builder = draw3D.surfaceBuilder()
    .rotateToPlayer(true); // Always face the player
```

#### `facePlayer(boolean facePlayer)`
**Parameters:**
- `facePlayer` (`boolean`) - Whether to face the player

**Returns:** `Surface$Builder` - This builder for method chaining

Alternative method for setting player-facing behavior.

```javascript
const builder = draw3D.surfaceBuilder()
    .facePlayer(true);
```

### Quality and Rendering Methods

#### `minSubdivisions(int subdivisions)`
**Parameters:**
- `subdivisions` (`int`) - Minimum subdivisions for rendering quality

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the minimum subdivision level for rendering. Higher values provide better quality but impact performance.

```javascript
const builder = draw3D.surfaceBuilder()
    .minSubdivisions(2); // Higher quality rendering
```

#### `subdivisions(int subdivisions)`
**Parameters:**
- `subdivisions` (`int`) - Minimum subdivisions for rendering quality

**Returns:** `Surface$Builder` - This builder for method chaining

Alternative method for setting subdivisions.

```javascript
const builder = draw3D.surfaceBuilder()
    .subdivisions(1); // Standard quality
```

#### `renderBack(boolean renderBack)`
**Parameters:**
- `renderBack` (`boolean`) - Whether to render the back side of the surface

**Returns:** `Surface$Builder` - This builder for method chaining

Sets whether the back side of the surface should be rendered.

```javascript
const builder = draw3D.surfaceBuilder()
    .renderBack(false); // Only show front side
```

#### `cull(boolean cull)`
**Parameters:**
- `cull` (`boolean`) - Whether to enable depth culling

**Returns:** `Surface$Builder` - This builder for method chaining

Sets whether depth culling should be enabled for performance optimization.

```javascript
const builder = draw3D.surfaceBuilder()
    .cull(true); // Enable depth culling
```

### Transformation Methods

#### `rotateCenter(boolean rotateCenter)`
**Parameters:**
- `rotateCenter` (`boolean`) - Whether to rotate around the center point

**Returns:** `Surface$Builder` - This builder for method chaining

Sets whether rotations should occur around the surface's center point.

```javascript
const builder = draw3D.surfaceBuilder()
    .rotateCenter(true); // Rotate around center
```

#### `zIndexScale(double zIndexScale)`
**Parameters:**
- `zIndexScale` (`double`) - Scale factor for z-index depth precision

**Returns:** `Surface$Builder` - This builder for method chaining

Sets the z-index scale for managing depth precision and preventing z-fighting.

```javascript
const builder = draw3D.surfaceBuilder()
    .zIndexScale(0.002); // Increased depth precision
```

### Build Methods

#### `build()`
**Returns:** `Surface` - The created `Surface` instance

Creates the `Surface` with the configured properties but does not add it to the parent container.

```javascript
const surface = draw3D.surfaceBuilder()
    .pos(100, 65, 100)
    .size(3, 2)
    .build(); // Surface is created but not added
```

#### `buildAndAdd()`
**Returns:** `Surface` - The created and added `Surface` instance

Creates the `Surface` with the configured properties and automatically adds it to the parent `Draw3D` context.

```javascript
const surface = draw3D.surfaceBuilder()
    .pos(100, 65, 100)
    .size(3, 2)
    .buildAndAdd(); // Surface is created and added
```

## Usage Examples

### Example 1: Basic Surface Creation

```javascript
const draw3D = Hud.createDraw3D();

// Create a simple sign surface
const signSurface = draw3D.surfaceBuilder()
    .pos(100, 65, 200)           // Position at specific world coordinates
    .size(3, 2)                  // 3x2 blocks
    .rotation(0, 180, 0)         // Face south
    .minSubdivisions(1)          // Standard quality
    .renderBack(false)           // Only show front
    .cull(false)                 // No depth culling
    .buildAndAdd();

// Add content to the surface
const text = Chat.createTextHelperFromString("Welcome!")
    .withColor(0x000000)
    .centered();

signSurface.addText(text, 0, 0);
```

### Example 2: Entity-Bound Surface

```javascript
const draw3D = Hud.createDraw3D();
const player = Player.getPlayer();

if (player) {
    // Create a health bar above the player
    const healthBar = draw3D.surfaceBuilder()
        .bindToEntity(player)              // Follow the player
        .boundOffset(0, 2.5, 0)           // Above player's head
        .size(2, 0.3)                       // Long and thin
        .rotateToPlayer(true)              // Face viewer
        .renderBack(false)                 // Only show front
        .cull(false)                       // Always visible
        .buildAndAdd();

    // Update health bar content
    function updateHealthBar() {
        healthBar.clear();
        const health = player.getHealth();
        const maxHealth = player.getMaxHealth();
        const healthPercent = Math.max(0, Math.min(1, health / maxHealth));

        // Background
        healthBar.addRect(0, 0, 2, 0.3, 0x40000000);

        // Health fill
        const healthColor = healthPercent > 0.6 ? 0x00FF00 :
                           healthPercent > 0.3 ? 0xFFFF00 : 0xFF0000;
        healthBar.addRect(0, 0, 2 * healthPercent, 0.3, healthColor);
    }

    // Update every tick
    events.on("Tick", JavaWrapper.methodToJavaAsync(updateHealthBar));
}

draw3D.register();
```

### Example 3: Interactive 3D Menu

```javascript
const draw3D = Hud.createDraw3D();
let menuSurface;
let selectedIndex = 0;

const menuOptions = [
    "Option 1: Teleport",
    "Option 2: Toggle Flight",
    "Option 3: Clear Weather",
    "Option 4: Set Time"
];

function createMenu() {
    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    menuSurface = draw3D.surfaceBuilder()
        .pos(pos.x, pos.y + 2, pos.z - 3)  // In front of player
        .size(8, 4)                          // Large menu
        .rotateToPlayer(true)                 // Face player
        .renderBack(true)                     // Show both sides
        .minSubdivisions(2)                    // Higher quality
        .zIndexScale(0.002)                   // Prevent z-fighting
        .buildAndAdd();

    updateMenuDisplay();
}

function updateMenuDisplay() {
    if (!menuSurface) return;

    menuSurface.clear();

    // Semi-transparent background
    menuSurface.addRect(0, 0, 8, 4, 0x80000000);

    // Title
    const title = Chat.createTextHelperFromString("3D Menu")
        .withColor(0xFFFFFF)
        .withBold(true)
        .centered();

    menuSurface.addText(title, 4, 0.5);

    // Menu options
    menuOptions.forEach((option, index) => {
        const y = 1.5 + index * 0.6;
        const isSelected = index === selectedIndex;
        const color = isSelected ? 0x00FF00 : 0xFFFFFF;
        const prefix = isSelected ? "► " : "  ";

        const optionText = Chat.createTextHelperFromString(prefix + option)
            .withColor(color);

        menuSurface.addText(optionText, 0.5, y);
    });
}

function handleMenuNavigation(event) {
    if (!menuSurface) return;

    switch (event.key) {
        case "up":
            selectedIndex = (selectedIndex - 1 + menuOptions.length) % menuOptions.length;
            updateMenuDisplay();
            break;
        case "down":
            selectedIndex = (selectedIndex + 1) % menuOptions.length;
            updateMenuDisplay();
            break;
        case "enter":
            Chat.log(`Selected: ${menuOptions[selectedIndex]}`);
            // Handle menu selection logic here
            break;
    }
}

// Create menu and set up controls
createMenu();
events.on("Key", JavaWrapper.methodToJavaAsync(handleMenuNavigation));
draw3D.register();
```

### Example 4: Information Display

```javascript
const draw3D = Hud.createDraw3D();

function createInfoDisplay() {
    return draw3D.surfaceBuilder()
        .pos(0, 100, 0)                    // Floating in the air
        .size(6, 4)                           // 6x4 blocks
        .rotateToPlayer(true)                 // Face player
        .renderBack(true)                     // Show both sides
        .cull(false)                          // Always visible
        .minSubdivisions(1)                    // Standard quality
        .rotateCenter(true)                   // Rotate around center
        .buildAndAdd();
}

const infoSurface = createInfoDisplay();

function updateInfoDisplay() {
    if (!infoSurface) return;

    infoSurface.clear();

    // Background
    infoSurface.addRect(0, 0, 6, 4, 0x60000000);

    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    const biome = World.getBiome();
    const time = World.getTimeOfDay();
    const hours = Math.floor((time % 24000) / 1000);
    const minutes = Math.floor((time % 1000) * 60 / 1000);

    // Display information
    const info = [
        `Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`,
        `Biome: ${biome}`,
        `Time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        `Health: ${Math.floor(player.getHealth())}/${Math.floor(player.getMaxHealth())}`
    ];

    info.forEach((text, index) => {
        const textHelper = Chat.createTextHelperFromString(text)
            .withColor(0xFFFFFF);

        infoSurface.addText(textHelper, 0.5, 0.5 + index * 0.8);
    });
}

// Update display every second
let tickCounter = 0;
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    tickCounter++;
    if (tickCounter % 20 === 0) {
        updateInfoDisplay();
    }
}));

draw3D.register();
```

### Example 5: Multiple Surface Configuration

```javascript
const draw3D = Hud.createDraw3D();
const surfaces = [];

function createSurfaceDisplay() {
    // Background panel
    surfaces.background = draw3D.surfaceBuilder()
        .pos(50, 70, 50)
        .size(10, 6)
        .rotation(0, 45, 0)
        .renderBack(false)
        .cull(true)
        .minSubdivisions(1)
        .zIndexScale(0.001)
        .buildAndAdd();

    // Floating text surface
    surfaces.floating = draw3D.surfaceBuilder()
        .pos(100, 90, 100)
        .size(4, 2)
        .rotateToPlayer(true)
        .renderBack(true)
        .cull(false)
        .minSubdivisions(2)
        .buildAndAdd();

    // Small indicator surface
    surfaces.indicator = draw3D.surfaceBuilder()
        .bindToEntity(player)
        .boundOffset(0, 3, 0)
        .size(1, 1)
        .rotateToPlayer(false)
        .rotation(0, 0, 0)
        .renderBack(true)
        .cull(false)
        .buildAndAdd();

    // Add content to each surface
    surfaces.background.getDraw2D().addRect(0, 0, 10, 6, 0x404040);
    surfaces.background.getDraw2D().addRect(0, 0, 10, 6, 0x808080, false);

    const floatingText = Chat.createTextHelperFromString("Hello 3D World!")
        .withColor(0xFFFFFF)
        .centered();
    surfaces.floating.addText(floatingText, 2, 1);

    surfaces.indicator.addCircle(0.5, 0.5, 0.5, 0xFF0000, true);
}

// Create all surfaces
const player = Player.getPlayer();
if (player) {
    createSurfaceDisplay();
}

draw3D.register();
```

### Example 6: Conditional Configuration

```javascript
const draw3D = Hud.createDraw3D();

function createAdaptiveSurface(quality, size, interactive) {
    const builder = draw3D.surfaceBuilder()
        .size(size.width, size.height);

    // Configure based on quality setting
    if (quality === "high") {
        builder
            .minSubdivisions(3)
            .zIndexScale(0.002)
            .renderBack(true);
    } else if (quality === "medium") {
        builder
            .minSubdivisions(2)
            .zIndexScale(0.0015)
            .renderBack(false);
    } else {
        builder
            .minSubdivisions(1)
            .zIndexScale(0.001)
            .renderBack(false);
    }

    // Configure based on interactivity
    if (interactive) {
        builder
            .rotateToPlayer(false)
            .cull(false)
            .rotateCenter(true);
    } else {
        builder
            .rotateToPlayer(true)
            .cull(true)
            .rotateCenter(false);
    }

    return builder.buildAndAdd();
}

// Create different versions of the same surface
const highQualitySurface = createAdaptiveSurface("high", {width: 8, height: 4}, true);
const lowQualitySurface = createAdaptiveSurface("low", {width: 4, height: 2}, false);

draw3D.register();
```

## Important Notes

### Builder Pattern Benefits

1. **Type Safety:** Builder methods provide compile-time type checking for all parameters
2. **Method Chaining:** All configuration methods return the builder for fluent API usage
3. **Validation:** Parameters are validated during the build process
4. **Readability:** Method names clearly indicate what property is being set
5. **Flexibility:** Supports both direct parameter setting and individual component methods

### Surface Properties

1. **Entity Binding:** Bound surfaces automatically update their position to follow entities
2. **Player Facing:** Surfaces can be configured to always face the player (billboarding)
3. **Quality Control:** Subdivision levels control rendering quality vs performance
4. **Depth Management:** Z-index scale helps prevent z-fighting with overlapping surfaces
5. **Back Rendering:** Control whether both sides of the surface are rendered

### Performance Considerations

1. **Subdivisions:** Higher subdivision values provide better quality but significantly impact performance
2. **Entity Binding:** Use entity binding sparingly as it requires position calculations each frame
3. **Back Rendering:** Only enable `renderBack` when both sides are actually needed
4. **Culling:** Enable depth culling when surfaces may be obscured by other objects
5. **Z-Fighting:** Increase `zIndexScale` if surfaces appear to flicker when overlapping

### Build Method Selection

1. **`build()`:** Use when you want to create the surface but add it manually later
2. **`buildAndAdd()`:** Use when you want to create and add the surface in one operation (most common)

## Best Practices

1. **Method Chaining:** Use method chaining for readable and concise configuration
2. **Quality Settings:** Choose appropriate subdivision levels based on distance and importance
3. **Performance Optimization:** Enable culling and disable back rendering when not needed
4. **Entity Binding:** Use entity offsets to position surfaces relative to bound entities
5. **Z-Index Management:** Use appropriate z-index scales to prevent flickering
6. **Error Handling:** Always check if entities exist before binding surfaces to them

## Related Classes

- [`Surface`](Surface.md) - Parent class that this builder creates
- [`Draw3D`](Draw3D.md) - 3D drawing context for managing surfaces
- [`RenderElement3D`](RenderElement3D.md) - Interface for 3D renderable elements
- [`EntityHelper`](EntityHelper.md) - Base class for entity helpers
- [`Pos3D`](Pos3D.md) - 3D position and vector class
- [`Pos2D`](Pos2D.md) - 2D position and dimension class

## Version History

- **1.8.4:** Initial introduction with comprehensive surface configuration support
- **Current:** Enhanced with entity binding, player-facing rotation, and improved validation