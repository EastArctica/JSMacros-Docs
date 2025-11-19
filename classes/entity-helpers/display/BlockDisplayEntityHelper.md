# BlockDisplayEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.display.BlockDisplayEntityHelper`

**Extends:** `DisplayEntityHelper<DisplayEntity.BlockDisplayEntity>`

The `BlockDisplayEntityHelper` class is a specialized wrapper for Minecraft block display entities (introduced in 1.19.4), providing access to block-specific display properties and functionality. Block display entities are special entities that can display any block state in the world with advanced customization options for positioning, rotation, scaling, and visual effects.

This class extends the base `DisplayEntityHelper` with block-specific functionality, allowing scripters to query and interact with blocks being displayed by these entities. Block display entities are commonly used for decorative purposes, custom block models, floating blocks, architectural previews, and dynamic block visualizations.

## Constructors

BlockDisplayEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`) when the entity type is `minecraft:block_display`
- World entity queries with block display entity filtering
- Type casting from general `EntityHelper` instances using `entity.asBlockDisplay()`
- Entity type checking with `entity.is("minecraft:block_display")` before casting

## Methods

### Inherited from DisplayEntityHelper

The `BlockDisplayEntityHelper` inherits all methods from `DisplayEntityHelper`:

#### Position and Interpolation
- [entity.getLerpTargetX()](#entitygetlertargetx)
- [entity.getLerpTargetY()](#entitygetlertargety)
- [entity.getLerpTargetZ()](#entitygetlertargetz)
- [entity.getLerpTargetPitch()](#entitygetlertargetpitch)
- [entity.getLerpTargetYaw()](#entitygetlertargetyaw)
- [entity.getLerpProgress()](#entitygetlerpprogress)

#### Visual Properties
- [entity.getBillboardMode()](#entitygetbillboardmode)
- [entity.getVisibilityBoundingBox()](#entitygetvisibilityboundingbox)
- [entity.getViewRange()](#entitygetviewrange)
- [entity.getDisplayWidth()](#entitygetdisplaywidth)
- [entity.getDisplayHeight()](#entitygetdisplayheight)

#### Lighting and Shadows
- [entity.getBrightness()](#entitygetbrightness)
- [entity.getSkyBrightness()](#entitygetskybrightness)
- [entity.getBlockBrightness()](#entitygetblockbrightness)
- [entity.getShadowRadius()](#entitygetshadowradius)
- [entity.getShadowStrength()](#entitygetshadowstrength)

#### Visual Effects
- [entity.getGlowColorOverride()](#entitygetglowcoloroverride)

### Block-Specific Methods

- [entity.getBlockState()](#entitygetblockstate)

---

## Block-Specific Methods

### entity.getBlockState()
```js
const blockState = blockDisplay.getBlockState();
if (blockState) {
    const blockName = blockState.getBlock().getName().getString();
    Chat.log(`Displaying block: ${blockName}`);
}
```

**Params**
* `(none)`

**Returns**
* `BlockStateHelper | null`: The block state being displayed by this entity, or null if no block state is set

**Notes**
Returns the current block state that this display entity is showing. The block state contains all information about the block including its type, properties, and variants. Use the returned `BlockStateHelper` to access detailed block information such as the block type, properties, and metadata.

---

## Usage Examples

### Basic Block Display Detection
```js
// Find all block display entities in range
function findBlockDisplayEntities(range = 50) {
    const player = Player.getPlayer();
    if (!player) return [];

    const entities = World.getEntities();
    const blockDisplays = [];

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= range && entity.is("minecraft:block_display")) {
            blockDisplays.push(entity);
        }
    });

    return blockDisplays;
}

// Log all nearby block display entities
const blockDisplays = findBlockDisplayEntities();
Chat.log(`Found ${blockDisplays.length} block display entities:`);

blockDisplays.forEach((entity, index) => {
    const pos = entity.getPos();
    const blockDisplay = entity.asBlockDisplay();

    if (blockDisplay) {
        const blockState = blockDisplay.getBlockState();
        const blockName = blockState ? blockState.getBlock().getName().getString() : "Unknown";

        Chat.log(`${index + 1}. ${blockName} at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
    }
});
```

### Block Display Content Analysis
```js
// Comprehensive analysis of block display entities
function analyzeBlockDisplay(entity) {
    const blockDisplay = entity.asBlockDisplay();
    if (!blockDisplay) {
        Chat.log("Entity is not a block display");
        return;
    }

    const pos = entity.getPos();
    const blockState = blockDisplay.getBlockState();

    if (!blockState) {
        Chat.log("Block display has no block state set");
        return;
    }

    const block = blockState.getBlock();
    const blockName = block.getName().getString();
    const translationKey = block.getTranslationKey();

    Chat.log(`=== Block Display Analysis ===`);
    Chat.log(`Position: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`);
    Chat.log(`Block Name: ${blockName}`);
    Chat.log(`Translation Key: ${translationKey}`);

    // Get block properties if available
    try {
        const properties = blockState.getProperties();
        if (properties && properties.length > 0) {
            Chat.log("Block Properties:");
            properties.forEach(prop => {
                Chat.log(`  ${prop.getName()}: ${prop.getValue()}`);
            });
        }
    } catch (e) {
        Chat.log("Block properties not accessible");
    }

    // Visual properties
    const brightness = entity.getBrightness();
    const viewRange = entity.getViewRange();
    const billboardMode = entity.getBillboardMode();

    Chat.log(`Brightness: ${brightness}/15`);
    Chat.log(`View Range: ${viewRange.toFixed(1)} blocks`);
    Chat.log(`Billboard Mode: ${billboardMode}`);
}

// Example usage
const blockDisplays = World.getEntities().filter(entity =>
    entity.is("minecraft:block_display")
);

if (blockDisplays.length > 0) {
    analyzeBlockDisplay(blockDisplays[0]);
} else {
    Chat.log("No block display entities found");
}
```

### Block Display Monitoring System
```js
// Monitor changes in block display entities
class BlockDisplayMonitor {
    constructor() {
        this.trackedDisplays = new Map();
        this.lastStates = new Map();
    }

    startMonitoring() {
        // Initial scan
        this.scanForBlockDisplays();

        // Monitor for changes every 5 seconds
        events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
            if (Client.getTime() % 100 === 0) { // Every 5 seconds (100 ticks)
                this.updateTracking();
            }
        }));

        // Track new spawns
        events.on("EntitySpawn", JavaWrapper.methodToJavaAsync((event) => {
            const entity = event.getEntity();
            if (entity.is("minecraft:block_display")) {
                this.trackBlockDisplay(entity);
            }
        }));
    }

    scanForBlockDisplays() {
        const blockDisplays = World.getEntities().filter(entity =>
            entity.is("minecraft:block_display")
        );

        blockDisplays.forEach(entity => {
            this.trackBlockDisplay(entity);
        });

        Chat.log(`Now tracking ${this.trackedDisplays.size} block display entities`);
    }

    trackBlockDisplay(entity) {
        const uuid = entity.getUUID();
        const blockDisplay = entity.asBlockDisplay();

        if (blockDisplay) {
            const blockState = blockDisplay.getBlockState();
            const blockName = blockState ? blockState.getBlock().getName().getString() : "Unknown";

            this.trackedDisplays.set(uuid, {
                entity: entity,
                blockName: blockName
            });

            // Store initial state
            this.lastStates.set(uuid, {
                position: entity.getPos(),
                blockName: blockName,
                brightness: entity.getBrightness()
            });

            Chat.log(`Started tracking block display: ${blockName} (${uuid})`);
        }
    }

    updateTracking() {
        for (const [uuid, data] of this.trackedDisplays) {
            if (!data.entity.isAlive()) {
                Chat.log(`Block display ${data.blockName} has been removed`);
                this.trackedDisplays.delete(uuid);
                this.lastStates.delete(uuid);
                continue;
            }

            const currentState = this.lastStates.get(uuid);
            const currentPos = data.entity.getPos();
            const blockDisplay = data.entity.asBlockDisplay();

            if (blockDisplay) {
                const blockState = blockDisplay.getBlockState();
                const currentBlockName = blockState ? blockState.getBlock().getName().getString() : "Unknown";
                const currentBrightness = data.entity.getBrightness();

                // Check for position changes
                const distance = currentPos.distanceTo(currentState.position);
                if (distance > 0.1) {
                    Chat.log(`${data.blockName} moved ${distance.toFixed(1)} blocks`);
                    currentState.position = currentPos;
                }

                // Check for block changes
                if (currentBlockName !== currentState.blockName) {
                    Chat.log(`${data.blockName} changed to ${currentBlockName}`);
                    currentState.blockName = currentBlockName;
                    data.blockName = currentBlockName;
                }

                // Check for lighting changes
                if (Math.abs(currentBrightness - currentState.brightness) > 2) {
                    Chat.log(`${data.blockName} lighting changed from ${currentState.brightness} to ${currentBrightness}`);
                    currentState.brightness = currentBrightness;
                }
            }
        }
    }
}

// Start the monitoring system
const monitor = new BlockDisplayMonitor();
monitor.startMonitoring();
```

### Block Display Visual Effects System
```js
// Create visual effects for block display entities
class BlockDisplayVisualizer {
    constructor() {
        this.highlights = new Map();
    }

    highlightBlockDisplays() {
        const player = Player.getPlayer();
        if (!player) return;

        const blockDisplays = World.getEntities().filter(entity =>
            entity.is("minecraft:block_display") && player.distanceTo(entity) <= 32
        );

        blockDisplays.forEach(entity => {
            const blockDisplay = entity.asBlockDisplay();
            if (!blockDisplay) return;

            const blockState = blockDisplay.getBlockState();
            if (!blockState) return;

            const block = blockState.getBlock();
            const blockName = block.getName().getString();
            const uuid = entity.getUUID();

            // Reset previous highlights
            entity.resetGlowing();
            entity.resetGlowingColor();

            // Apply different highlight colors based on block type
            let glowColor = this.getBlockHighlightColor(blockName);
            entity.setGlowingColor(glowColor);
            entity.setGlowing(true);

            this.highlights.set(uuid, {
                entity: entity,
                blockName: blockName,
                color: glowColor
            });
        });
    }

    getBlockHighlightColor(blockName) {
        // Return different colors for different block types
        if (blockName.includes("ore")) return 0x00FFFF; // Cyan for ores
        if (blockName.includes("wood") || blockName.includes("log")) return 0x8B4513; // Brown for wood
        if (blockName.includes("stone")) return 0x808080; // Gray for stone
        if (blockName.includes("diamond")) return 0x00BFFF; // Deep sky blue for diamond
        if (blockName.includes("gold")) return 0xFFD700; // Gold for gold blocks
        if (blockName.includes("iron")) return 0xF0F0F0; // Light gray for iron
        if (blockName.includes("redstone")) return 0xFF0000; // Red for redstone
        if (blockName.includes("emerald")) return 0x50FF50; // Green for emerald
        if (blockName.includes("coal")) return 0x2F2F2F; // Dark gray for coal
        return 0xFFFFFF; // White for everything else
    }

    createBlockDisplayMenu() {
        const player = Player.getPlayer();
        if (!player) return;

        const blockDisplays = World.getEntities().filter(entity =>
            entity.is("minecraft:block_display") && player.distanceTo(entity) <= 16
        );

        if (blockDisplays.length === 0) {
            Chat.log("No block displays within 16 blocks");
            return;
        }

        Chat.log("=== Nearby Block Displays ===");
        blockDisplays.forEach((entity, index) => {
            const blockDisplay = entity.asBlockDisplay();
            if (blockDisplay) {
                const blockState = blockDisplay.getBlockState();
                const blockName = blockState ? blockState.getBlock().getName().getString() : "Unknown";
                const pos = entity.getPos();
                const distance = player.distanceTo(entity);

                Chat.log(`${index + 1}. ${blockName} - ${distance.toFixed(1)}m away`);
                Chat.log(`   Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
            }
        });
    }

    clearHighlights() {
        for (const [uuid, data] of this.highlights) {
            if (data.entity && data.entity.isAlive()) {
                data.entity.resetGlowing();
                data.entity.resetGlowingColor();
            }
        }
        this.highlights.clear();
    }
}

// Usage example
const visualizer = new BlockDisplayVisualizer();

// Highlight block displays every 10 ticks
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 10 === 0) {
        visualizer.highlightBlockDisplays();
    }
}));

// Command to show nearby block displays
Chat.createCommandBuilder("blockdisplays")
    .executes(JavaWrapper.methodToJavaAsync((ctx) => {
        visualizer.createBlockDisplayMenu();
        return 1;
    }))
    .register();
```

### Block Display Teleporter
```js
// Teleport to block display entities
function teleportToBlockDisplay(index) {
    const player = Player.getPlayer();
    if (!player) {
        Chat.log("Player not found");
        return;
    }

    const blockDisplays = World.getEntities().filter(entity =>
        entity.is("minecraft:block_display")
    );

    if (blockDisplays.length === 0) {
        Chat.log("No block display entities found");
        return;
    }

    if (index < 1 || index > blockDisplays.length) {
        Chat.log(`Invalid index. Use 1-${blockDisplays.length}`);
        return;
    }

    const targetEntity = blockDisplays[index - 1];
    const blockDisplay = targetEntity.asBlockDisplay();

    if (blockDisplay) {
        const pos = targetEntity.getPos();
        const blockState = blockDisplay.getBlockState();
        const blockName = blockState ? blockState.getBlock().getName().getString() : "Unknown";

        // Teleport slightly above the block display
        const teleportPos = { x: pos.x, y: pos.y + 2, z: pos.z };

        Chat.log(`Teleporting to ${blockName} display at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);

        // Note: Actual teleportation would require additional permissions/methods
        // This example shows the position information
        Chat.log(`Target position: [${teleportPos.x.toFixed(1)}, ${teleportPos.y.toFixed(1)}, ${teleportPos.z.toFixed(1)}]`);
    }
}

// List all block displays with teleport options
function listBlockDisplaysForTeleport() {
    const blockDisplays = World.getEntities().filter(entity =>
        entity.is("minecraft:block_display")
    );

    if (blockDisplays.length === 0) {
        Chat.log("No block display entities found");
        return;
    }

    Chat.log(`=== Block Display Teleport Menu (${blockDisplays.length} found) ===`);

    blockDisplays.forEach((entity, index) => {
        const blockDisplay = entity.asBlockDisplay();
        if (blockDisplay) {
            const blockState = blockDisplay.getBlockState();
            const blockName = blockState ? blockState.getBlock().getName().getString() : "Unknown";
            const pos = entity.getPos();
            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(entity) : 0;

            Chat.log(`${index + 1}. ${blockName} - ${distance.toFixed(1)}m away`);
        }
    });

    Chat.log("Use: /teleport_block <number> to teleport to a specific block display");
}

// Register teleport commands
Chat.createCommandBuilder("list_blocks")
    .executes(JavaWrapper.methodToJavaAsync((ctx) => {
        listBlockDisplaysForTeleport();
        return 1;
    }))
    .register();

Chat.createCommandBuilder("teleport_block")
    .intArg("index", 1, 1000)
    .executes(JavaWrapper.methodToJavaAsync((ctx) => {
        const index = ctx.getArg("index");
        teleportToBlockDisplay(index);
        return 1;
    }))
    .register();
```

## Notes and Limitations

- BlockDisplayEntityHelper instances become invalid when the display entity is removed from the world. Always check `isAlive()` before accessing entity data.
- Block display entities were introduced in Minecraft 1.19.4, so this helper class is only available in game versions 1.19.4 and later.
- The `getBlockState()` method may return `null` if the display entity has no block state set or if the data is not accessible.
- Block display entities can display any block state, including blocks with complex properties, NBT data, or custom variants.
- Visual properties like transformations, scaling, and rotation are handled at the entity level and can be accessed through the inherited `DisplayEntityHelper` methods.
- Block display entities do not have collision or block interactions - they are purely visual representations.
- When accessing block display entities, always verify the entity type using `entity.is("minecraft:block_display")` before casting to avoid `ClassCastException`.
- Block states returned by `getBlockState()` provide read-only access to block information; you cannot modify the displayed block through this helper.

## Related Classes

- `DisplayEntityHelper` - Base class for all display entity helpers with common display methods
- `EntityHelper` - Base class for all entity helpers with common entity methods
- `BlockStateHelper` - Block state information and properties
- `BlockHelper` - Block information and functionality
- `ItemDisplayEntityHelper` - Specialized helper for item display entities
- `TextDisplayEntityHelper` - Specialized helper for text display entities
- `Vec3D` - 3D position and vector mathematics

## Version Information

- Available since JSMacros 1.9.1
- Requires Minecraft 1.19.4 or later (block display entities introduced in this version)
- Extends `DisplayEntityHelper` with block-specific functionality
- All methods require a block display entity instance; use type checking before accessing block-specific features