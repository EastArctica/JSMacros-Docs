# Surface

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Surface`

**Implements:** `RenderElement`, `RenderElement3D<Surface>`

**Extends:** `Draw2D`

**Since:** JsMacros 1.6.5

The `Surface` class is a 3D rendering component in JSMacros that represents a 2D drawing surface rendered in 3D world space. It acts as a canvas that can be positioned, rotated, and scaled in the 3D world while supporting 2D drawing operations. Surface objects are ideal for creating custom HUD elements, information displays, signs, billboards, and interactive interfaces that exist in the game world.

## Overview

The `Surface` class provides a powerful way to render 2D content in 3D space with the following capabilities:

- 3D positioning and rotation in world coordinates
- Entity binding for dynamic positioning that follows entities
- Customizable dimensions and subdivision levels for quality control
- Player-facing rotation for billboarding effects
- Full integration with Draw2D rendering capabilities
- Depth testing and face culling options for performance
- Flexible rotation centers and transform controls
- Z-index scaling for managing depth precision

## Constructors

### `new Surface(pos, rotations, sizes, minSubdivisions, renderBack, cull)`
Creates a new Surface with the specified position, rotation, size, and rendering options.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| pos | `Pos3D` | The 3D position of the surface in world coordinates |
| rotations | `Pos3D` | The rotation angles (x, y, z) in degrees |
| sizes | `Pos2D` | The width and height of the surface |
| minSubdivisions | `int` | Minimum subdivisions for rendering quality |
| renderBack | `boolean` | Whether to render the back side of the surface |
| cull | `boolean` | Whether to enable depth culling for performance |

**Example:**
```javascript
// Create a basic surface at player position
const player = Player.getPlayer();
if (player) {
    const pos = player.getPos();
    const surface = new Surface(
        new Pos3D(pos.x + 2, pos.y + 1, pos.z),  // Position 2 blocks east, 1 block up
        new Pos3D(0, 0, 0),                     // No rotation
        new Pos2D(5, 3),                        // 5x3 block size
        1,                                      // 1 subdivision
        true,                                   // Render back side
        false                                   // No culling
    );
}
```

## Fields

## Methods

### Inherited from Draw2D

The Surface class also inherits all drawing methods from Draw2D, including:

- `surface.addText(textHelper, x, y)` - Add text to the surface
- `surface.addRect(x, y, width, height, color)` - Add a rectangle
- `surface.addImage(x, y, width, height, imagePath)` - Add an image
- `surface.addItemStack(itemStack, x, y)` - Add an item stack display
- `surface.addLine(x1, y1, x2, y2, color, width)` - Add a line
- `surface.addEllipse(x, y, radiusX, radiusY, color)` - Add an ellipse
- `surface.clear()` - Clear all drawn elements
- And many more 2D drawing methods...

## Builder Pattern

The Surface class provides a Builder for fluent configuration:

## Usage Examples

### Basic 3D Sign
```javascript
const draw3D = Hud.createDraw3D();

// Create a sign surface
const signSurface = new Surface(
    new Pos3D(100, 65, 200),     // Position
    new Pos3D(0, 180, 0),        // Face south
    new Pos2D(3, 2),             // 3x2 blocks
    1,                           // Standard subdivisions
    true,                        // Show back
    false                        // No culling
);

// Add text to the surface
const text = Chat.createTextHelperFromString("Welcome!")
    .withColor(0x000000)         // Black text
    .centered();

signSurface.addText(text, 0, 0);

draw3D.addSurface(signSurface).register();
```

### Player-Following HUD
```javascript
const draw3D = Hud.createDraw3D();

function createPlayerHUD() {
    const player = Player.getPlayer();
    if (!player) return null;

    return draw3D.surfaceBuilder()
        .bindToEntity(player)              // Follow player
        .boundOffset(0, 2.5, -3)           // In front and above
        .rotateToPlayer(true)              // Always face player
        .size(4, 1)                        // Compact display
        .rotateCenter(true)                // Center rotation
        .renderBack(false)                 // Only show front
        .buildAndAdd();
}

let hudSurface = createPlayerHUD();

function updatePlayerHUD() {
    if (!hudSurface) return;

    const player = Player.getPlayer();
    if (!player) return;

    // Clear previous content
    hudSurface.clear();

    // Add health bar background
    hudSurface.addRect(0, 0, 160, 20, 0x40000000);

    // Add health bar fill
    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;
    const healthColor = healthPercent > 0.6 ? 0x00FF00 :
                       healthPercent > 0.3 ? 0xFFFF00 : 0xFF0000;

    hudSurface.addRect(0, 0, 160 * healthPercent, 20, healthColor);

    // Add health text
    const healthText = Chat.createTextHelperFromString(
        `${Math.floor(health)}/${Math.floor(maxHealth)} HP`
    ).withColor(0xFFFFFF).centered();

    hudSurface.addText(healthText, 80, 10);
}

// Update HUD every tick
events.on("Tick", JavaWrapper.methodToJavaAsync(updatePlayerHUD));
draw3D.register();
```

### Interactive 3D Menu
```javascript
const draw3D = Hud.createDraw3D();
let menuSurface;
let selectedIndex = 0;

const menuItems = [
    "Option 1: Teleport Home",
    "Option 2: Toggle Flight",
    "Option 3: Clear Inventory",
    "Option 4: Open Ender Chest"
];

function createMenu() {
    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    menuSurface = new Surface(
        new Pos3D(pos.x, pos.y + 2, pos.z - 3), // In front of player
        new Pos3D(0, 0, 0),                      // No rotation (will be set dynamically)
        new Pos2D(8, 4),                         // 8x4 blocks
        1,                                       // Standard subdivisions
        true,                                    // Show back
        false                                    // No culling
    );

    updateMenuDisplay();
    draw3D.addSurface(menuSurface);
}

function updateMenuDisplay() {
    if (!menuSurface) return;

    menuSurface.clear();

    // Background
    menuSurface.addRect(0, 0, menuSurface.getWidth(), menuSurface.getHeight(), 0x80000000);

    // Title
    const title = Chat.createTextHelperFromString("Menu")
        .withColor(0xFFFFFF)
        .withBold(true)
        .centered();

    menuSurface.addText(title, menuSurface.getWidth() / 2, 20);

    // Menu items
    menuItems.forEach((item, index) => {
        const y = 60 + index * 25;
        const color = index === selectedIndex ? 0x00FF00 : 0xFFFFFF;
        const prefix = index === selectedIndex ? "> " : "  ";

        const itemText = Chat.createTextHelperFromString(prefix + item)
            .withColor(color);

        menuSurface.addText(itemText, 10, y);
    });
}

function handleKeyPress(event) {
    if (event.key === "up") {
        selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
        updateMenuDisplay();
    } else if (event.key === "down") {
        selectedIndex = (selectedIndex + 1) % menuItems.length;
        updateMenuDisplay();
    } else if (event.key === "enter") {
        Chat.log(`Selected: ${menuItems[selectedIndex]}`);
        // Handle menu selection here
    }
}

// Create menu and set up controls
createMenu();
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const player = Player.getPlayer();
    if (player && menuSurface) {
        // Make menu face player
        const pos = player.getPos();
        menuSurface.setPos(pos.x, pos.y + 2, pos.z - 3);
    }
}));

events.on("Key", JavaWrapper.methodToJavaAsync(handleKeyPress));
draw3D.register();
```

### World Information Display
```javascript
const draw3D = Hud.createDraw3D();

function createInfoDisplay() {
    return draw3D.surfaceBuilder()
        .pos(0, 80, 0)                        // Floating in the air
        .rotation(0, 0, 0)                    // No rotation
        .size(6, 3)                           // 6x3 blocks
        .rotateToPlayer(true)                 // Always face players
        .renderBack(true)                     // Show both sides
        .cull(false)                          // No depth culling
        .buildAndAdd();
}

const infoSurface = createInfoDisplay();

function updateInfoDisplay() {
    if (!infoSurface) return;

    infoSurface.clear();

    // Semi-transparent background
    infoSurface.addRect(0, 0, infoSurface.getWidth(), infoSurface.getHeight(), 0x60000000);

    const player = Player.getPlayer();
    if (!player) return;

    const pos = player.getPos();
    const biome = World.getBiome();
    const time = World.getTimeOfDay();
    const hours = Math.floor((time % 24000) / 1000);
    const minutes = Math.floor((time % 1000) * 60 / 1000);

    // Display information
    const lines = [
        `Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`,
        `Biome: ${biome}`,
        `Time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        `Health: ${Math.floor(player.getHealth())}/${Math.floor(player.getMaxHealth())}`
    ];

    lines.forEach((line, index) => {
        const text = Chat.createTextHelperFromString(line)
            .withColor(0xFFFFFF);

        infoSurface.addText(text, 10, 15 + index * 20);
    });
}

// Update display every second
let tickCounter = 0;
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    tickCounter++;
    if (tickCounter % 20 === 0) { // Every 20 ticks = 1 second
        updateInfoDisplay();
    }
}));

draw3D.register();
```

### Dynamic Health Bar Above Entities
```javascript
const draw3D = Hud.createDraw3D();
const entityHealthBars = new Map();

function createHealthBar(entity) {
    const healthBar = draw3D.surfaceBuilder()
        .bindToEntity(entity)                 // Follow entity
        .boundOffset(0, entity.getHeight() + 1, 0)  // Above entity
        .rotateToPlayer(true)                 // Face viewer
        .size(2, 0.3)                         // 2x0.3 blocks
        .renderBack(false)                    // Only show front
        .cull(false)                          // Always visible
        .buildAndAdd();

    entityHealthBars.set(entity.getUUID(), healthBar);
    return healthBar;
}

function updateHealthBars() {
    const entities = World.getEntities(50); // Entities within 50 blocks

    // Remove bars for dead/gone entities
    for (const [uuid, healthBar] of entityHealthBars) {
        const entity = entities.find(e => e.getUUID() === uuid);
        if (!entity || !entity.isLiving() || entity.getHealth() <= 0) {
            draw3D.removeDraw2D(healthBar);
            entityHealthBars.delete(uuid);
        }
    }

    // Update or create health bars
    entities.forEach(entity => {
        if (!entity.isLiving()) return;

        let healthBar = entityHealthBars.get(entity.getUUID());

        if (!healthBar) {
            healthBar = createHealthBar(entity);
        }

        // Update health bar display
        healthBar.clear();

        const health = entity.getHealth();
        const maxHealth = entity.getMaxHealth();
        const healthPercent = Math.max(0, Math.min(1, health / maxHealth));

        // Background
        healthBar.addRect(0, 0, healthBar.getWidth(), healthBar.getHeight(), 0x40000000);

        // Health fill (green -> yellow -> red)
        const healthColor = healthPercent > 0.6 ? 0x00FF00 :
                           healthPercent > 0.3 ? 0xFFFF00 : 0xFF0000;

        healthBar.addRect(0, 0, healthBar.getWidth() * healthPercent, healthBar.getHeight(), healthColor);

        // Border
        healthBar.addRect(0, 0, healthBar.getWidth(), 1, 0x000000);
        healthBar.addRect(0, healthBar.getHeight() - 1, healthBar.getWidth(), 1, 0x000000);
        healthBar.addRect(0, 0, 1, healthBar.getHeight(), 0x000000);
        healthBar.addRect(healthBar.getWidth() - 1, 0, 1, healthBar.getHeight(), 0x000000);
    });
}

// Update health bars every few ticks
let updateCounter = 0;
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    updateCounter++;
    if (updateCounter % 5 === 0) { // Update every 5 ticks for performance
        updateHealthBars();
    }
}));

draw3D.register();
```

## Important Notes

### Coordinate System
- **World Coordinates:** Surfaces use standard Minecraft world coordinates
- **Surface Coordinates:** 2D drawing uses a coordinate system where (0,0) is the top-left corner
- **Rotation:** Rotation angles are specified in degrees
- **Scale:** Surface size is in world blocks, internal drawing is in pixels

### Performance Considerations
- **Subdivisions:** Higher values provide better quality but impact performance
- **Culling:** Enable depth culling when surfaces may be obscured
- **Back Rendering:** Only enable `renderBack` when both sides are needed
- **Entity Binding:** Use entity binding sparingly as it requires position calculations

### Depth and Z-Fighting
- **zIndexScale:** Increase this value (default 0.001) if surfaces appear to flicker
- **Z-Index:** Use z-index values to layer elements within a surface
- **Depth Testing:** Control with the `cull` property

### Drawing on Surfaces
- All Draw2D methods are inherited and available
- Surface dimensions affect the available drawing area
- Use relative positioning for responsive designs
- Consider surface subdivisions for smooth rendering

### Entity Binding
- Bound surfaces automatically update their position
- Use `boundOffset` to position relative to the entity
- Set to null to unbind from entities
- Surfaces continue to exist even if bound entities die

## Related Classes

- `Draw2D` - Parent class providing 2D drawing capabilities
- `Draw3D` - 3D drawing context for managing surfaces
- `RenderElement3D` - Interface for 3D renderable elements
- `Pos3D` - 3D position and vector class
- `Pos2D` - 2D position and dimension class
- `EntityHelper` - Base class for entity helpers
- `BlockPosHelper` - Block position helper class

## Version History

- **1.6.5:** Initial release with basic surface rendering capabilities
- **1.8.4:** Added Builder pattern, entity binding, and player-facing rotation
- **1.9.0:** Enhanced positioning methods and improved rendering performance
- **Current:** Comprehensive surface system with full 2D/3D integration

