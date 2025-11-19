# EntityTraceLine.Builder

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.EntityTraceLine$Builder`

**Implements:** Builder pattern for `EntityTraceLine`

**Since:** JsMacros 1.9.0

The `EntityTraceLine.Builder` class provides a fluent interface for creating `EntityTraceLine` instances with method chaining. It's the recommended way to create entity trace lines that automatically track and follow entity positions in 3D space.

## Overview

The `EntityTraceLine.Builder` class allows you to construct `EntityTraceLine` objects through a chain of method calls, making the configuration process more readable and maintainable. Instead of passing multiple parameters to constructors, you can set properties individually using descriptive method names.

The builder is typically obtained through the `Draw3D.entityTraceLine()` method and provides two final operations:
- `build()` - Creates the EntityTraceLine instance
- `buildAndAdd()` - Creates the EntityTraceLine instance and automatically adds it to the Draw3D context

## Creating a Builder

```javascript
// Obtain a builder from Draw3D context
const draw3D = Hud.createDraw3D();
const builder = draw3D.entityTraceLine();
```

## Builder Methods

### Entity Methods

#### `entity(entity)`
Sets the target entity to track with this trace line.

**Parameters:**
- `entity` (EntityHelper<?>): The target entity to track (can be null)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const targetEntity = World.getEntities()[0]; // Get first entity
const entityTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0xFF0000)
    .build();
```

#### `entity(entityType, worldPosition)`
**Note:** This method may not be available in all versions. Use with caution.

### Position Methods

#### `yOffset(offset)`
Sets the vertical offset from the entity's base position where the line should end.

**Parameters:**
- `offset` (double): Vertical offset from entity base position (positive = upward)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const headLevelTrace = draw3D.entityTraceLine()
    .entity(targetEntity)
    .yOffset(1.6)  // Head level for most entities
    .color(0x00FF00)
    .build();
```

### Color Methods

#### `color(color)`
Sets the trace line color using RGB format with full alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const redTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0xFF0000)
    .build();
```

#### `color(color, alpha)`
Sets the trace line color using RGB format with custom alpha.

**Parameters:**
- `color` (int): RGB color value (0xRRGGBB)
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const semiTransparentBlue = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0x0000FF, 128)
    .build();
```

#### `color(r, g, b)`
Sets the trace line color using separate RGB values with full alpha.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const greenTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0, 255, 0)
    .build();
```

#### `color(r, g, b, a)`
Sets the trace line color using separate RGBA values.

**Parameters:**
- `r` (int): Red component (0-255)
- `g` (int): Green component (0-255)
- `b` (int): Blue component (0-255)
- `a` (int): Alpha component (0-255)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const purpleTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(128, 0, 128, 200)
    .build();
```

#### `alpha(alpha)`
Sets only the alpha transparency value while preserving RGB color.

**Parameters:**
- `alpha` (int): Alpha transparency value (0-255)

**Returns:** `EntityTraceLine.Builder` - Self for chaining

**Example:**
```javascript
const fadedTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0xFF0000)
    .alpha(100)
    .build();
```

### Building Methods

#### `build()`
Creates the configured `EntityTraceLine` instance without adding it to the Draw3D context.

**Returns:** `EntityTraceLine` - The constructed EntityTraceLine instance

**Example:**
```javascript
const entityTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0xFF0000)
    .yOffset(1.0)
    .build();

// Add to context manually later
draw3D.addEntityTraceLine(entityTraceLine);
```

#### `buildAndAdd()`
Creates the configured `EntityTraceLine` instance and automatically adds it to the Draw3D context.

**Returns:** `EntityTraceLine` - The constructed and added EntityTraceLine instance

**Example:**
```javascript
const entityTraceLine = draw3D.entityTraceLine()
    .entity(targetEntity)
    .color(0x00FF00)
    .yOffset(1.6)
    .buildAndAdd(); // Automatically added to Draw3D context
```

## Usage Examples

### Basic Entity Tracking
```javascript
const draw3D = Hud.createDraw3D();

// Track the first available entity
const entities = World.getEntities();
if (entities.length > 0) {
    const targetEntity = entities[0];

    const entityTraceLine = draw3D.entityTraceLine()
        .entity(targetEntity)
        .color(0xFF0000, 200)  // Red with transparency
        .yOffset(1.0)          // Middle of entity
        .buildAndAdd();

    Chat.log(`Now tracking: ${targetEntity.getName().getString()}`);
}
```

### Player Tracking System
```javascript
// Create trace lines to track all nearby players
function trackNearbyPlayers() {
    const draw3D = Hud.createDraw3D();
    const players = World.getLoadedPlayers();
    const myPlayer = Player.getPlayer();

    players.forEach(player => {
        if (player.equals(myPlayer)) return; // Skip self

        const entityTraceLine = draw3D.entityTraceLine()
            .entity(player)
            .color(0x0080FF, 180)  // Blue with transparency
            .yOffset(1.6)           // Head level
            .buildAndAdd();

        Chat.log(`Tracking player: ${player.getName().getString()}`);
    });
}

trackNearbyPlayers();
```

### Entity Type Color Coding
```javascript
// Color-code different entity types with automatic highlighting
function highlightEntitiesByType() {
    const draw3D = Hud.createDraw3D();
    const entities = World.getEntities();

    entities.forEach(entity => {
        let color;
        let yOffset = 0.5; // Default to entity center

        // Color based on entity type
        if (entity.is("minecraft:player")) {
            color = [0, 128, 255, 200]; // Blue for players
            yOffset = 1.6; // Head level
        } else if (entity.isMonster()) {
            color = [255, 0, 0, 200]; // Red for hostile mobs
            yOffset = 1.0; // Upper body
        } else if (entity.isAnimal()) {
            color = [0, 255, 0, 200]; // Green for passive mobs
            yOffset = 0.8; // Middle of body
        } else if (entity.getType() === "minecraft:item") {
            color = [255, 165, 0, 200]; // Orange for items
            yOffset = 0.1; // Ground level
        } else if (entity.getType().includes("villager")) {
            color = [255, 255, 0, 200]; // Yellow for villagers
            yOffset = 1.6; // Head level
        } else {
            color = [255, 255, 255, 150]; // White for others
            yOffset = 0.5;
        }

        draw3D.entityTraceLine()
            .entity(entity)
            .color(...color)
            .yOffset(yOffset)
            .buildAndAdd();
    });

    Chat.log(`Added highlighting for ${entities.length} entities`);
}

// Update highlights every second
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks
        highlightEntitiesByType();
    }
}));
```

### Targeting System
```javascript
// Interactive targeting system that follows player's look direction
let currentTargetEntity = null;
let currentTraceLine = null;

function findLookTarget() {
    const player = Player.getPlayer();
    const lookTarget = player.rayTraceEntity(50); // 50 block range

    return lookTarget && lookTarget.isAlive() ? lookTarget : null;
}

function updateTargeting() {
    const newTarget = findLookTarget();

    // If target changed, update the line
    if (newTarget !== currentTargetEntity) {
        // Remove old line if exists
        if (currentTraceLine) {
            currentTraceLine.shouldRemove = true;
        }

        currentTargetEntity = newTarget;

        if (currentTargetEntity) {
            const targetType = currentTargetEntity.getType();
            let color = [255, 255, 255, 240]; // Default white
            let yOffset = 0.5;

            // Color code by entity type
            if (targetType === "minecraft:player") {
                color = [0, 128, 255, 240]; // Blue
                yOffset = 1.6;
            } else if (targetType.includes("hostile") ||
                      targetType === "minecraft:zombie" ||
                      targetType === "minecraft:skeleton") {
                color = [255, 0, 0, 240]; // Red
                yOffset = 1.0;
            } else if (targetType === "minecraft:item") {
                color = [255, 165, 0, 240]; // Orange
                yOffset = 0.1;
            } else if (targetType.includes("villager")) {
                color = [255, 255, 0, 240]; // Yellow
                yOffset = 1.6;
            }

            // Create new targeting line
            currentTraceLine = Hud.createDraw3D().entityTraceLine()
                .entity(currentTargetEntity)
                .color(...color)
                .yOffset(yOffset)
                .build();

            // Update action bar with target info
            const targetName = currentTargetEntity.getName().getString();
            const distance = Player.getPlayer().distanceTo(currentTargetEntity);
            Chat.actionbar(`&6Target: &f${targetName} &7(${distance.toFixed(1)}m)`);
        } else {
            Chat.actionbar("&7No target");
        }
    }

    // Add the current line to rendering
    if (currentTraceLine) {
        Hud.createDraw3D().addEntityTraceLine(currentTraceLine);
    }
}

// Update targeting every tick
events.on("Tick", JavaWrapper.methodToJavaAsync(updateTargeting));
Chat.log("Entity targeting system activated - look at entities to track them");
```

### Entity Monitoring System
```javascript
// Comprehensive entity tracking system with multiple line types
class EntityTracker {
    constructor() {
        this.draw3D = Hud.createDraw3D();
        this.trackedEntities = new Map();
        this.updateInterval = 5; // Update every 5 ticks
    }

    addEntity(entity, config = {}) {
        const uuid = entity.getUUID();
        const defaultConfig = {
            color: [255, 255, 255, 200],
            yOffset: 0.5,
            showInfo: true
        };

        const finalConfig = { ...defaultConfig, ...config };

        // Create main tracking line
        const mainLine = this.draw3D.entityTraceLine()
            .entity(entity)
            .color(...finalConfig.color)
            .yOffset(finalConfig.yOffset)
            .build();

        this.trackedEntities.set(uuid, {
            entity: entity,
            config: finalConfig,
            mainLine: mainLine,
            lastUpdate: Client.getTime()
        });

        Chat.log(`Started tracking ${entity.getName().getString()}`);
    }

    updateTracking() {
        const currentTime = Client.getTime();

        // Check if it's time to update
        if (currentTime % this.updateInterval !== 0) return;

        for (const [uuid, data] of this.trackedEntities) {
            // Check if entity is still valid
            if (!data.entity.isAlive()) {
                Chat.log(`Stopped tracking ${data.entity.getName().getString()} - entity removed`);
                this.trackedEntities.delete(uuid);
                continue;
            }

            // Update line color based on distance or status
            const distance = Player.getPlayer().distanceTo(data.entity);
            let newColor = [...data.config.color];

            // Make line more visible for distant entities
            if (distance > 50) {
                newColor[3] = 255; // Fully opaque for distant targets
            } else if (distance < 10) {
                newColor[3] = 100; // More transparent for close targets
            }

            // Update line appearance
            data.mainLine.setColor(newColor[0], newColor[1], newColor[2], newColor[3]);

            // Add to rendering system
            this.draw3D.addEntityTraceLine(data.mainLine);
        }
    }

    clearAll() {
        this.trackedEntities.clear();
        Hud.unregisterDraw3D(this.draw3D);
        this.draw3D = Hud.createDraw3D();
    }
}

// Usage example
const tracker = new EntityTracker();

// Track specific entity types when they spawn
events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();

    if (entity.is("minecraft:creeper")) {
        tracker.addEntity(entity, {
            color: [255, 0, 255, 220], // Magenta
            yOffset: 0.8,
            alpha: 220
        });
    } else if (entity.is("minecraft:villager")) {
        tracker.addEntity(entity, {
            color: [255, 255, 0, 180], // Yellow
            yOffset: 1.6,
            alpha: 180
        });
    } else if (entity.is("minecraft:player")) {
        tracker.addEntity(entity, {
            color: [0, 128, 255, 150], // Blue
            yOffset: 1.6,
            alpha: 150
        });
    }
}));

// Update tracking system
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    tracker.updateTracking();
}));
```

### PvP Detection System
```javascript
// Create a PvP detection system that highlights hostile players
function detectPvPPlayers() {
    const draw3D = Hud.createDraw3D();
    const myPlayer = Player.getPlayer();
    const myPos = myPlayer.getPos();

    const players = World.getLoadedPlayers();

    players.forEach(player => {
        if (player.equals(myPlayer)) return; // Skip self

        const playerPos = player.getPos();
        const distance = myPos.distanceTo(playerPos);

        // Only show warning for players within 50 blocks
        if (distance <= 50) {
            // Check if player is holding a weapon
            const mainHand = player.getMainHand();
            let isHostile = false;

            if (mainHand) {
                const itemType = mainHand.getType();
                isHostile = itemType.includes("sword") ||
                          itemType.includes("axe") ||
                          itemType.includes("bow") ||
                          itemType.includes("crossbow");
            }

            const color = isHostile ? [255, 0, 0, 255] : [255, 165, 0, 200];

            draw3D.entityTraceLine()
                .entity(player)
                .color(...color)
                .yOffset(1.6)
                .buildAndAdd();

            const status = isHostile ? "HOSTILE" : "NEUTRAL";
            Chat.log(`${status} player detected: ${player.getName().getString()} at ${Math.floor(distance)}m`);
        }
    });
}

// Check for PvP players every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    if (Client.getTime() % 100 === 0) { // Every 100 ticks (5 seconds)
        detectPvPPlayers();
    }
}));
```

### Mining Helper
```javascript
// Create trace lines to help track ore deposits
function trackOreEntities() {
    const draw3D = Hud.createDraw3D();
    const player = Player.getPlayer();

    // Look for falling block entities (often indicate mining)
    const entities = World.getEntities();

    entities.forEach(entity => {
        if (entity.getType() === "minecraft:falling_block") {
            const entityPos = entity.getPos();
            const distance = player.distanceTo(entityPos);

            // Only track nearby falling blocks
            if (distance <= 20) {
                draw3D.entityTraceLine()
                    .entity(entity)
                    .color(255, 255, 0, 200) // Yellow
                    .yOffset(0.5)
                    .buildAndAdd();
            }
        }
    });
}

// Update ore tracking every tick
events.on("Tick", JavaWrapper.methodToJavaAsync(trackOreEntities));
```

## Important Notes

1. **Method Chaining:** All configuration methods return the builder instance for fluent chaining
2. **Final Methods:** Only `build()` and `buildAndAdd()` return the final `EntityTraceLine` instance
3. **Entity Tracking:** The trace line automatically updates its endpoint as the entity moves
4. **Auto-cleanup:** Lines are automatically removed when tracked entities become invalid
5. **Color Overwrites:** Setting both general and specific colors - the last call takes precedence
6. **Y Offset:** Use appropriate offsets for different entity types (0.1 for items, 1.6 for players, etc.)
7. **Performance:** Creating many entity trace lines can impact performance
8. **Line Width:** Entity trace lines are rendered with a fixed width of 2.5 pixels
9. **Screen Position:** Lines always start from the screen center (crosshair position)

## Related Classes

- `EntityTraceLine` - The main entity trace line class that this builder creates
- `TraceLine` - Base class for 3D trace lines
- `Draw3D` - The 3D drawing context that provides the builder
- `EntityHelper` - Base class for entity helpers
- `RenderElement3D` - Interface that EntityTraceLine implements
- `RenderElementBuilder` - Abstract base class for all builders

## Version History

- **1.9.0:** Initial release with entity trace line builder pattern support
- **Current:** Enhanced with comprehensive method set and improved entity tracking