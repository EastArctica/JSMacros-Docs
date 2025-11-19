# DisplayEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.display.DisplayEntityHelper`

**Extends:** `EntityHelper<DisplayEntity>`

The `DisplayEntityHelper` class is a specialized wrapper for Minecraft display entities (introduced in 1.19.4), providing access to display entity properties such as transformation, rendering settings, brightness, and visual effects. It serves as the base class for all display entity helpers and offers comprehensive methods for querying display entity information, positioning, interpolation states, and rendering properties.

Display entities are special entities used to display blocks, items, or text in the world with advanced customization options for positioning, rotation, scaling, and visual effects. This class is typically obtained through entity-related events, world queries, or when specifically filtering for display entity types.

## Constructors

DisplayEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`)
- World entity queries with display entity filtering
- Methods that return entities and can be cast to display entities
- Entity type checking with `entity.is("minecraft:block_display", "minecraft:item_display", "minecraft:text_display")`

## Methods

### Position and Interpolation

- [entity.getLerpTargetX()](#entitygetlertargetx)
- [entity.getLerpTargetY()](#entitygetlertargety)
- [entity.getLerpTargetZ()](#entitygetlertargetz)
- [entity.getLerpTargetPitch()](#entitygetlertargetpitch)
- [entity.getLerpTargetYaw()](#entitygetlertargetyaw)
- [entity.getLerpProgress()](#entitygetlerpprogress)

### Visual Properties

- [entity.getBillboardMode()](#entitygetbillboardmode)
- [entity.getVisibilityBoundingBox()](#entitygetvisibilityboundingbox)
- [entity.getViewRange()](#entitygetviewrange)
- [entity.getDisplayWidth()](#entitygetdisplaywidth)
- [entity.getDisplayHeight()](#entitygetdisplayheight)

### Lighting and Shadows

- [entity.getBrightness()](#entitygetbrightness)
- [entity.getSkyBrightness()](#entitygetskybrightness)
- [entity.getBlockBrightness()](#entitygetblockbrightness)
- [entity.getShadowRadius()](#entitygetshadowradius)
- [entity.getShadowStrength()](#entitygetshadowstrength)

### Visual Effects

- [entity.getGlowColorOverride()](#entitygetglowcoloroverride)

---

## Position and Interpolation

## Visual Properties

## Lighting and Shadows

## Visual Effects

## Specialized Display Entity Classes

The `DisplayEntityHelper` is the base class for three specialized display entity helpers:

### BlockDisplayEntityHelper
For display entities that show blocks:
- `getBlockState()` - Returns the displayed block state
- Use with `entity.is("minecraft:block_display")`

### ItemDisplayEntityHelper
For display entities that show items:
- `getItem()` - Returns the displayed item stack
- `getTransform()` - Returns the display transformation mode
- Use with `entity.is("minecraft:item_display")`

### TextDisplayEntityHelper
For display entities that show text:
- `getData()` - Returns text display data including text content, alignment, colors
- Use with `entity.is("minecraft:text_display")`

---

## Usage Examples

### Basic Display Entity Detection
```js
// Find all display entities in range
function findDisplayEntities(range = 50) {
    const player = Player.getPlayer();
    if (!player) return [];

    const entities = World.getEntities();
    const displayEntities = [];

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= range && entity.is(
            "minecraft:block_display",
            "minecraft:item_display",
            "minecraft:text_display"
        )) {
            displayEntities.push(entity);
        }
    });

    return displayEntities;
}

// Log all nearby display entities
const displayEntities = findDisplayEntities();
Chat.log(`Found ${displayEntities.length} display entities:`);

displayEntities.forEach((entity, index) => {
    const pos = entity.getPos();
    const type = entity.getType();
    const name = entity.getName().getString();

    Chat.log(`${index + 1}. ${name} (${type}) at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
});
```

### Display Entity Animation Monitor
```js
// Monitor display entity animations and transitions
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const displayEntities = World.getEntities().filter(entity =>
        entity.is("minecraft:block_display", "minecraft:item_display", "minecraft:text_display")
    );

    displayEntities.forEach(entity => {
        const currentPos = entity.getPos();
        const targetX = entity.getLerpTargetX();
        const targetY = entity.getLerpTargetY();
        const targetZ = entity.getLerpTargetZ();
        const progress = entity.getLerpProgress(1.0);

        // Check if entity is currently animating
        if (progress < 1.0) {
            const distance = Math.sqrt(
                Math.pow(targetX - currentPos.x, 2) +
                Math.pow(targetY - currentPos.y, 2) +
                Math.pow(targetZ - currentPos.z, 2)
            );

            if (distance > 0.01) { // Only report significant movement
                Chat.actionbar(`Display entity: ${Math.round(progress * 100)}% moved, ${distance.toFixed(2)} blocks remaining`);
            }
        }
    });
}));
```

### Display Entity Lighting Analysis
```js
// Comprehensive lighting analysis for display entities
function analyzeDisplayEntityLighting(entity) {
    const brightness = entity.getBrightness();
    const skyBrightness = entity.getSkyBrightness();
    const blockBrightness = entity.getBlockBrightness();
    const shadowRadius = entity.getShadowRadius();
    const shadowStrength = entity.getShadowStrength();

    Chat.log(`=== Lighting Analysis for ${entity.getName().getString()} ===`);
    Chat.log(`Overall Brightness: ${brightness}/15`);
    Chat.log(`Sky Light: ${skyBrightness}/15`);
    Chat.log(`Block Light: ${blockBrightness}/15`);
    Chat.log(`Shadow: ${(shadowStrength * 100).toFixed(0)}% strength, ${shadowRadius.toFixed(1)} radius`);

    // Lighting quality assessment
    let quality = "Poor";
    if (brightness >= 12) quality = "Excellent";
    else if (brightness >= 8) quality = "Good";
    else if (brightness >= 4) quality = "Fair";

    Chat.log(`Lighting Quality: ${quality}`);

    // Light source analysis
    if (skyBrightness > blockBrightness) {
        Chat.log("Primary light source: Natural daylight/sky light");
    } else if (blockBrightness > 0) {
        Chat.log("Primary light source: Artificial block lighting");
    } else {
        Chat.log("Primary light source: Minimal or ambient lighting");
    }
}

// Usage example
const displayEntities = World.getEntities().filter(entity =>
    entity.is("minecraft:block_display", "minecraft:item_display", "minecraft:text_display")
);

displayEntities.forEach(entity => {
    analyzeDisplayEntityLighting(entity);
});
```

### Display Entity Information Panel
```js
// Create a comprehensive info panel for display entities
function getDisplayEntityInfo(entity) {
    const pos = entity.getPos();
    const billboardMode = entity.getBillboardMode();
    const viewRange = entity.getViewRange();
    const width = entity.getDisplayWidth();
    const height = entity.getDisplayHeight();
    const glowColor = entity.getGlowColorOverride();

    let info = [];
    info.push(`=== ${entity.getName().getString()} ===`);
    info.push(`Type: ${entity.getType()}`);
    info.push(`Position: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`);
    info.push(`Billboard: ${billboardMode}`);
    info.push(`View Range: ${viewRange.toFixed(1)} blocks`);
    info.push(`Dimensions: ${width.toFixed(2)} x ${height.toFixed(2)}`);

    if (glowColor !== 0) {
        info.push(`Glow Color: #${glowColor.toString(16).padStart(6, '0').toUpperCase()}`);
    }

    // Type-specific information
    if (entity.is("minecraft:block_display")) {
        const blockDisplay = entity.asBlockDisplay();
        if (blockDisplay) {
            const blockState = blockDisplay.getBlockState();
            if (blockState) {
                info.push(`Block: ${blockState.getBlock().getName().getString()}`);
            }
        }
    } else if (entity.is("minecraft:item_display")) {
        const itemDisplay = entity.asItemDisplay();
        if (itemDisplay) {
            const item = itemDisplay.getItem();
            const transform = itemDisplay.getTransform();
            info.push(`Item: ${item.getName()} x${item.getCount()}`);
            if (transform) info.push(`Transform: ${transform}`);
        }
    } else if (entity.is("minecraft:text_display")) {
        const textDisplay = entity.asTextDisplay();
        if (textDisplay) {
            const data = textDisplay.getData();
            if (data) {
                const text = data.getText().getString();
                const alignment = data.getAlignment();
                const lineWidth = data.getLineWidth();
                info.push(`Text: "${text}"`);
                info.push(`Alignment: ${alignment}`);
                info.push(`Line Width: ${lineWidth}`);
            }
        }
    }

    return info;
}

// Display information for the nearest display entity
const player = Player.getPlayer();
if (player) {
    const displayEntities = World.getEntities().filter(entity =>
        entity.is("minecraft:block_display", "minecraft:item_display", "minecraft:text_display")
    );

    let nearest = null;
    let minDistance = Infinity;

    displayEntities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = entity;
        }
    });

    if (nearest && minDistance <= 20) {
        const info = getDisplayEntityInfo(nearest);
        info.forEach(line => Chat.log(line));
        Chat.log(`Distance: ${minDistance.toFixed(1)} blocks`);
    } else {
        Chat.log("No display entities found within 20 blocks");
    }
}
```

## Notes and Limitations

- DisplayEntityHelper instances become invalid when the display entity is removed from the world. Always check `isAlive()` before accessing entity data.
- Display entities were introduced in Minecraft 1.19.4, so this helper class is only available in game versions 1.19.4 and later.
- Interpolation methods (`getLerpTarget*`, `getLerpProgress`) return target values and progress even when no animation is active.
- The brightness methods return lighting values that affect how the display entity is rendered, not necessarily the environmental lighting at its position.
- Some display entity properties (like transformations, scaling, and rotation) are handled at a lower level and may not be directly accessible through this helper class.
- When accessing specialized display entity types (block, item, text), always check the entity type first using `is()` before casting to the specialized helper.

## Related Classes

- `EntityHelper` - Base class for all entity helpers with common entity methods
- `BlockDisplayEntityHelper` - Specialized helper for block display entities
- `ItemDisplayEntityHelper` - Specialized helper for item display entities
- `TextDisplayEntityHelper` - Specialized helper for text display entities
- `Vec3D` - 3D position and vector mathematics used for bounding boxes
- `TextHelper` - Text formatting and display utilities
- `BlockStateHelper` - Block state information for block displays
- `ItemStackHelper` - Item stack information for item displays

## Version Information

- Available since JSMacros 1.9.1
- Requires Minecraft 1.19.4 or later (display entities introduced in this version)
- All methods require a display entity instance; use type checking before accessing specialized features
- Interpolation and lighting methods provide real-time data about display entity state