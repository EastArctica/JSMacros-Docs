# ItemFrameEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.decoration.ItemFrameEntityHelper`

**Extends:** `EntityHelper<ItemFrameEntity>`

The `ItemFrameEntityHelper` class provides specialized access to Minecraft item frame entities, including both regular item frames and glow item frames. This helper extends the base `EntityHelper` class and adds specific functionality for interacting with the item displayed in the frame, its rotation, and whether it's a glowing variant.

Item frames are decorative entities that can display items on their faces, commonly used for storage, decoration, or redstone contraptions. This helper allows you to inspect and manipulate item frames in your scripts.

## Constructors

ItemFrameEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity is an item frame
- World entity queries and searches
- Entity casting using `asItemFrame()` method (if available)

## Methods

### ItemFrameEntityHelper-Specific Methods

- [itemFrame.isGlowingFrame()](#itemframeisglowingframe)
- [itemFrame.getRotation()](#itemframegetrotation)
- [itemFrame.getItem()](#itemframegetitem)

### Inherited Methods from EntityHelper

ItemFrameEntityHelper inherits all methods from `EntityHelper`, including:

#### Position and Movement
- `getPos()` - Returns the entity's position as `Pos3D`
- `getBlockPos()` - Returns the entity's block position as `BlockPosHelper`
- `getX()`, `getY()`, `getZ()` - Returns individual coordinate values
- `getFacingDirection()` - Returns the direction the item frame is facing

#### Entity Information
- `getName()` - Returns the entity's name as `TextHelper`
- `getType()` - Returns the entity type as string
- `getUUID()` - Returns the unique identifier of the entity
- `isAlive()` - Checks if the entity is still alive

#### Visual and Interaction Methods
- `setGlowing(boolean)` - Sets whether the entity should glow
- `setGlowingColor(int)` - Sets the glowing effect color
- `resetGlowing()` - Resets the glowing effect to default

---

## ItemFrameEntityHelper-Specific Methods

## Usage Examples

### Item Frame Scanner
```js
// Comprehensive item frame scanner with categorization
function scanItemFrames(radius = 64) {
    const player = Player.getPlayer();
    if (!player) return;

    const playerPos = player.getPos();
    const entities = World.getEntities();

    const frames = {
        regular: [],
        glow: [],
        empty: [],
        withItems: [],
        valuable: [],
        tools: [],
        blocks: [],
        other: []
    };

    entities.forEach(entity => {
        if (entity.is("minecraft:item_frame", "minecraft:glow_item_frame")) {
            const itemFrame = entity;
            const item = itemFrame.getItem();
            const pos = entity.getPos();
            const distance = player.distanceTo(entity);

            // Only scan within specified radius
            if (distance > radius) return;

            const frameInfo = {
                entity: entity,
                position: pos,
                distance: distance,
                isGlowing: itemFrame.isGlowingFrame(),
                rotation: itemFrame.getRotation(),
                item: item
            };

            // Categorize frames
            if (itemFrame.isGlowingFrame()) {
                frames.glow.push(frameInfo);
            } else {
                frames.regular.push(frameInfo);
            }

            if (item.isEmpty()) {
                frames.empty.push(frameInfo);
            } else {
                frames.withItems.push(frameInfo);

                const itemName = item.getName().getString().toLowerCase();

                // Check for valuable items
                if (itemName.includes("diamond") || itemName.includes("netherite") ||
                    itemName.includes("emerald") || itemName.includes("gold")) {
                    frames.valuable.push(frameInfo);
                }

                // Check for tools
                if (itemName.includes("sword") || itemName.includes("pickaxe") ||
                    itemName.includes("axe") || itemName.includes("shovel") ||
                    itemName.includes("hoe")) {
                    frames.tools.push(frameInfo);
                }

                // Check for blocks
                if (itemName.includes("block") || itemName.includes("planks") ||
                    itemName.includes("wood") || itemName.includes("stone")) {
                    frames.blocks.push(frameInfo);
                } else {
                    frames.other.push(frameInfo);
                }
            }
        }
    });

    // Display results
    Chat.log("=== Item Frame Scan Results ===");
    Chat.log(`Total item frames: ${frames.regular.length + frames.glow.length}`);
    Chat.log(`Regular frames: ${frames.regular.length}`);
    Chat.log(`Glow frames: ${frames.glow.length}`);
    Chat.log(`Empty frames: ${frames.empty.length}`);
    Chat.log(`Frames with items: ${frames.withItems.length}`);
    Chat.log(`Valuable items: ${frames.valuable.length}`);
    Chat.log(`Tools: ${frames.tools.length}`);
    Chat.log(`Blocks: ${frames.blocks.length}`);

    // Highlight valuable items
    frames.valuable.forEach(frameInfo => {
        frameInfo.entity.setGlowing(true);
        frameInfo.entity.setGlowingColor(0xFF0000); // Red glow
        Chat.log(`&cVALUABLE: ${frameInfo.item.getName().getString()} x${frameInfo.item.getCount()} at distance ${frameInfo.distance.toFixed(1)}m`);
    });

    return frames;
}

// Run the scan
scanItemFrames(32); // Scan within 32 blocks
```

### Item Frame Rotation Monitor
```js
// Monitor changes in item frame rotations
const frameRotations = new Map();

events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const entities = World.getEntities();

    entities.forEach(entity => {
        if (entity.is("minecraft:item_frame", "minecraft:glow_item_frame")) {
            const uuid = entity.getUUID();
            const itemFrame = entity;
            const currentRotation = itemFrame.getRotation();
            const pos = entity.getPos();

            if (!frameRotations.has(uuid)) {
                // First time seeing this frame
                frameRotations.set(uuid, currentRotation);
            } else {
                const lastRotation = frameRotations.get(uuid);

                if (lastRotation !== currentRotation) {
                    const degrees = currentRotation * 45;
                    const item = itemFrame.getItem();
                    const itemName = item.isEmpty() ? "empty" : item.getName().getString();

                    Chat.log(`&eItem frame rotation changed at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
                    Chat.log(`  Item: ${itemName}`);
                    Chat.log(`  Rotation: ${lastRotation} (${lastRotation * 45}°) → ${currentRotation} (${degrees}°)`);

                    frameRotations.set(uuid, currentRotation);
                }
            }
        }
    });
}));

// Clean up map for removed entities
events.on("EntityDespawn", JavaWrapper.methodToJavaAsync((event) => {
    const entity = event.getEntity();
    if (entity.is("minecraft:item_frame", "minecraft:glow_item_frame")) {
        frameRotations.delete(entity.getUUID());
        Chat.log("Item frame removed from tracking");
    }
}));
```

### Item Frame Gallery Creator
```js
// Create a virtual gallery of items in item frames
function createItemFrameGallery() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const gallery = [];

    entities.forEach(entity => {
        if (entity.is("minecraft:item_frame", "minecraft:glow_item_frame")) {
            const itemFrame = entity;
            const item = itemFrame.getItem();

            if (!item.isEmpty()) {
                const galleryEntry = {
                    itemName: item.getName().getString(),
                    itemCount: item.getCount(),
                    itemLore: item.getLore(),
                    enchantments: item.getEnchantments(),
                    position: entity.getPos(),
                    isGlowing: itemFrame.isGlowingFrame(),
                    rotation: itemFrame.getRotation(),
                    distance: player.distanceTo(entity)
                };

                gallery.push(galleryEntry);
            }
        }
    });

    // Sort by distance (closest first)
    gallery.sort((a, b) => a.distance - b.distance);

    // Display gallery
    Chat.log("=== Item Frame Gallery ===");
    Chat.log(`Found ${gallery.length} item frames with items:`);

    gallery.forEach((entry, index) => {
        Chat.log(`\n${index + 1}. ${entry.itemName} x${entry.itemCount}`);
        Chat.log(`   Position: [${entry.position.x.toFixed(0)}, ${entry.position.y.toFixed(0)}, ${entry.position.z.toFixed(0)}]`);
        Chat.log(`   Type: ${entry.isGlowing ? "Glow" : "Regular"} Frame`);
        Chat.log(`   Rotation: ${entry.rotation * 45}°`);
        Chat.log(`   Distance: ${entry.distance.toFixed(1)} blocks`);

        if (entry.enchantments.length > 0) {
            const enchantNames = entry.enchantments.map(enchant => enchant.getName().getString()).join(", ");
            Chat.log(`   Enchantments: ${enchantNames}`);
        }
    });

    return gallery;
}

// Gallery with periodic updates
let lastGalleryUpdate = 0;

events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const currentTime = Client.getTime();

    // Update gallery every 5 seconds (100 ticks)
    if (currentTime - lastGalleryUpdate >= 100) {
        const gallery = createItemFrameGallery();
        lastGalleryUpdate = currentTime;

        // Quick summary in action bar
        if (gallery.length > 0) {
            Chat.actionbar(`&eItem Frames: ${gallery.length} items on display`);
        }
    }
}));
```

## Important Notes

- **Item Frame Types**: There are two types of item frames - regular item frames (`minecraft:item_frame`) and glow item frames (`minecraft:glow_item_frame`) that emit light
- **Rotation System**: Items can be rotated in 45-degree increments, with 8 possible orientations (0-7)
- **Empty Frames**: When an item frame has no item, `getItem()` returns an empty ItemStackHelper
- **Entity Lifecycle**: Item frames can be broken by players or destroyed by various game mechanics
- **Server Limitations**: Some visual methods like `setGlowing()` may not work on all multiplayer servers
- **Redstone Interaction**: Item frames can output redstone signals based on the item rotation (when used in redstone contraptions)
- **Item Display**: The item displayed in a frame can be interacted with by players (rotated, removed, etc.)

## Related Classes

- `EntityHelper` - Parent class providing basic entity functionality
- `ItemStackHelper` - Represents the item stack displayed in the frame
- `GlowItemFrameEntityHelper` - Specialized helper for glow item frames (if available)
- `WorldHelper` - Provides world-level entity access methods
- `Pos3D` - Used for entity positions
- `TextHelper` - Used for item names and descriptions

## Version Information

- Available since JSMacros 1.8.4
- Inherits all EntityHelper methods with their respective version availability
- `isGlowingFrame()` method available since 1.8.4
- `getRotation()` method available since 1.8.4
- `getItem()` method available since 1.8.4