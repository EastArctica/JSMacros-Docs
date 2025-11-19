# EntityTraceLine

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.EntityTraceLine`

**Extends:** `TraceLine`

**Available since:** `1.9.0`

The `EntityTraceLine` class is a specialized rendering component that draws a 3D trace line from the screen center to a target entity in the game world. It automatically tracks the entity's movement and updates the line endpoint in real-time, making it ideal for highlighting, targeting systems, or visual tracking of entities.

This class extends `TraceLine` and inherits its rendering capabilities while adding entity-specific functionality like automatic position tracking, entity removal detection, and customizable vertical offset.

## Overview

EntityTraceLine creates a visual line that connects the screen center (crosshair position) to a specific entity in the 3D world. The line automatically updates its endpoint as the entity moves, making it perfect for:

- Entity highlighting and marking
- Visual tracking systems
- Targeting indicators
- Entity monitoring interfaces
- Navigation aids

## Creating EntityTraceLines

EntityTraceLine instances are typically created through the `Draw3D` class or its builder pattern:

```js
// Method 1: Direct creation through Draw3D
const draw3D = Hud.createDraw3D();
const entity = World.getEntities()[0]; // Get first entity
const traceLine = draw3D.addEntityTraceLine(entity, 0xFF0000); // Red line

// Method 2: Using the builder pattern (recommended)
const builder = draw3D.entityTraceLineBuilder();
const traceLine = builder
    .entity(entity)
    .color(0x00FF00, 200) // Green with alpha
    .yOffset(1.0) // Offset to entity head height
    .buildAndAdd();
```

## Constructors

### new EntityTraceLine(entity, color, yOffset)

Creates a new EntityTraceLine with the specified entity, color, and Y offset.

```js
const entity = World.getEntities()[0];
const line = new EntityTraceLine(entity, 0xFF0000, 0.5);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| entity | EntityHelper<?> | The target entity to track (can be null) |
| color | int | The RGB color value (0xRRGGBB) |
| yOffset | double | Vertical offset from entity base position |

### new EntityTraceLine(entity, color, alpha, yOffset)

Creates a new EntityTraceLine with the specified entity, color, alpha, and Y offset.

```js
const entity = World.getEntities()[0];
const line = new EntityTraceLine(entity, 0xFF0000, 180, 1.0);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| entity | EntityHelper<?> | The target entity to track (can be null) |
| color | int | The RGB color value (0xRRGGBB) |
| alpha | int | The alpha/transparency value (0-255) |
| yOffset | double | Vertical offset from entity base position |

## Methods

## Inherited Methods from TraceLine

## Fields

## Builder Pattern

The EntityTraceLine.Builder class provides a fluent interface for creating EntityTraceLine instances with custom configurations.

### Creating a Builder

```js
const draw3D = Hud.createDraw3D();
const builder = draw3D.entityTraceLineBuilder();
```

### Builder Methods

### Building Methods

## Usage Examples

### Basic Entity Tracking

```js
// Create a simple tracking line to the nearest player
function trackNearestPlayer() {
    const draw3D = Hud.createDraw3D();
    const players = World.getLoadedPlayers();

    if (players.length > 0) {
        // Find closest player
        const myPos = Player.getPlayer().getPos();
        let closest = null;
        let minDistance = Infinity;

        for (const player of players) {
            if (player === Player.getPlayer()) continue;
            const distance = myPos.distanceTo(player.getPos());
            if (distance < minDistance) {
                minDistance = distance;
                closest = player;
            }
        }

        if (closest) {
            // Create red line to closest player
            const line = draw3D.entityTraceLineBuilder()
                .entity(closest)
                .color(0xFF0000, 200) // Red with transparency
                .yOffset(1.6) // Head level
                .buildAndAdd();

            Chat.log(`Tracking ${closest.getName()} at ${minDistance.toFixed(1)}m`);
        }
    }
}

trackNearestPlayer();
```

### Entity Type Highlighting

```js
// Color-code different entity types with automatic highlighting
function highlightEntitiesByType() {
    const draw3D = Hud.createDraw3D();
    const entities = World.getEntities();

    for (const entity of entities) {
        const type = entity.getType();
        let color = 0xFFFFFF; // Default white
        let yOffset = 0.5;    // Default to entity center

        // Color based on entity type
        if (type === "minecraft:player") {
            color = 0x0080FF; // Blue for players
            yOffset = 1.6;     // Head level
        } else if (type === "minecraft:zombie" || type === "minecraft:skeleton") {
            color = 0xFF0000; // Red for hostile mobs
        } else if (type === "minecraft:creeper") {
            color = 0xFF00FF; // Magenta for creepers
        } else if (type === "minecraft:villager") {
            color = 0xFFFF00; // Yellow for villagers
        } else if (type === "minecraft:item") {
            color = 0xFFA500; // Orange for items
            yOffset = 0.1;    // Ground level
        }

        // Create trace line with appropriate color and offset
        draw3D.entityTraceLineBuilder()
            .entity(entity)
            .color(color, 180) // Semi-transparent
            .yOffset(yOffset)
            .buildAndAdd();
    }

    Chat.log(`Added highlighting for ${entities.length} entities`);
}

// Update highlights every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) { // Every 20 ticks
        // Clear existing highlights
        Hud.unregisterDraw3D(Hud.getDraw3Ds()[0]);

        // Recreate highlights
        highlightEntitiesByType();
    }
}));
```

### Advanced Entity Monitoring System

```js
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
            color: 0xFFFFFF,
            alpha: 200,
            yOffset: 0.5,
            showInfo: true
        };

        const finalConfig = { ...defaultConfig, ...config };

        // Create main tracking line
        const mainLine = this.draw3D.entityTraceLineBuilder()
            .entity(entity)
            .color(finalConfig.color, finalConfig.alpha)
            .yOffset(finalConfig.yOffset)
            .buildAndAdd();

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
            let newColor = data.config.color;
            let newAlpha = data.config.alpha;

            // Make line more visible for distant entities
            if (distance > 50) {
                newAlpha = 255; // Fully opaque for distant targets
            } else if (distance < 10) {
                newAlpha = 100; // More transparent for close targets
            }

            // Update line appearance
            data.mainLine.setColor(newColor, newAlpha);
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
            color: 0xFF00FF, // Magenta
            yOffset: 0.8,
            alpha: 220
        });
    } else if (entity.is("minecraft:villager")) {
        tracker.addEntity(entity, {
            color: 0xFFFF00, // Yellow
            yOffset: 1.6,
            alpha: 180
        });
    } else if (entity.is("minecraft:player")) {
        tracker.addEntity(entity, {
            color: 0x0080FF, // Blue
            yOffset: 1.6,
            alpha: 150
        });
    }
}));

// Update tracking system
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    tracker.updateTracking();
}));
```

### Dynamic Targeting System

```js
// Interactive targeting system that follows player's look direction
function createTargetingSystem() {
    const draw3D = Hud.createDraw3D();
    let currentTarget = null;
    let targetLine = null;

    // Function to find what player is looking at
    function findLookTarget() {
        const player = Player.getPlayer();
        const lookTarget = player.rayTraceEntity(50); // 50 block range

        if (lookTarget && lookTarget.isAlive()) {
            return lookTarget;
        }
        return null;
    }

    // Update targeting every tick
    events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
        const newTarget = findLookTarget();

        // If target changed, update the line
        if (newTarget !== currentTarget) {
            // Remove old line if exists
            if (targetLine) {
                targetLine.shouldRemove = true;
            }

            currentTarget = newTarget;

            if (currentTarget) {
                const targetType = currentTarget.getType();
                let color = 0xFFFFFF;
                let yOffset = 0.5;

                // Color code by entity type
                if (targetType === "minecraft:player") {
                    color = 0x0080FF;
                    yOffset = 1.6;
                } else if (targetType.includes("hostile") ||
                          targetType === "minecraft:zombie" ||
                          targetType === "minecraft:skeleton") {
                    color = 0xFF0000;
                    yOffset = 1.0;
                } else if (targetType === "minecraft:item") {
                    color = 0xFFA500;
                    yOffset = 0.1;
                }

                // Create new targeting line
                targetLine = draw3D.entityTraceLineBuilder()
                    .entity(currentTarget)
                    .color(color, 240)
                    .yOffset(yOffset)
                    .buildAndAdd();

                // Update action bar with target info
                const targetName = currentTarget.getName().getString();
                const distance = Player.getPlayer().distanceTo(currentTarget);
                Chat.actionbar(`&6Target: &f${targetName} &7(${distance.toFixed(1)}m)`);
            } else {
                Chat.actionbar("&7No target");
            }
        }

        // Update existing line if target exists
        if (targetLine && currentTarget && currentTarget.isAlive()) {
            const distance = Player.getPlayer().distanceTo(currentTarget);

            // Pulse the alpha based on distance
            const pulseAlpha = Math.floor(180 + Math.sin(Client.getTime() * 0.1) * 75);
            targetLine.setAlpha(pulseAlpha);
        }
    }));
}

createTargetingSystem();
Chat.log("Targeting system activated - look at entities to track them");
```

## Notes and Limitations

- **Entity Validity**: EntityTraceLine automatically detects when tracked entities become invalid (removed from world, dead, or in different dimensions) and marks themselves for removal.
- **Performance**: Lines are automatically cleaned up when entities become invalid to prevent memory leaks.
- **Screen Position**: Lines always start from the screen center (crosshair position) by default.
- **Smooth Animation**: The line endpoint uses entity interpolation for smooth movement tracking.
- **Y Offset**: Use appropriate Y offsets for different entity types (0.1 for items on ground, 1.6 for player head level, etc.).
- **Alpha Transparency**: Use alpha values sparingly as too many transparent lines can impact visual clarity.
- **Auto-cleanup**: The system automatically removes lines for invalid entities, but manual cleanup is recommended for better performance.
- **Entity Movement**: Lines update in real-time to track entity movement, including interpolation for smooth animation.

## Related Classes

- `TraceLine` - Base class for 3D trace lines
- `Draw3D` - Main 3D rendering context
- `EntityHelper` - Base class for entity helpers
- `Pos3D` - 3D position and vector mathematics
- `Pos2D` - 2D screen position handling

## Version Information

- **Available since:** JSMacros 1.9.0
- **Author:** aMelonRind
- **Package:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d`

