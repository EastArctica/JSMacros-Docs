# HitResultHelper$Block

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.HitResultHelper$Block`

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`

**Since:** 1.9.1

**Author:** aMelonRind

## Overview

The `HitResultHelper$Block` class is a specialized nested class within `HitResultHelper` that represents ray casting results specifically for block intersections. This class provides block-specific information and methods for working with block hit detection in Minecraft, including block position, hit face, and block access functionality.

When a ray trace operation hits a block, the result is automatically cast to this specialized type, providing access to block-specific properties and methods that are not available in the generic hit result.

## Class Hierarchy

```
HitResultHelper<T>
├── Block (for block hit results)
└── Entity (for entity hit results)
```

## Methods

### `getBlockPos()`
**Returns:** `BlockPosHelper` - The block position that was hit

Gets the integer block coordinates of the block that was hit by the ray trace.

**Example:**
```javascript
const blockHit = player.detailedRayTraceBlock(5.0, false);
if (blockHit && !blockHit.isMissed()) {
    const pos = blockHit.getBlockPos();
    Chat.log(`Hit block at ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
}
```

### `getSide()`
**Returns:** `DirectionHelper` - The face/side of the block that was hit

Gets the specific face of the block that the ray trace intersected with. This is useful for determining which direction the player is looking at the block from.

**Example:**
```javascript
const blockHit = player.detailedRayTraceBlock(5.0, false);
if (blockHit && !blockHit.isMissed()) {
    const side = blockHit.getSide();
    Chat.log(`Hit block face: ${side.getName()}`);

    // Use face information for directional operations
    if (side.getName() === "up") {
        Chat.log("Looking at the top of the block");
    }
}
```

### `getBlockState()`
**Returns:** `BlockStateHelper` - The block state of the hit block

Gets the complete block state information including block properties like rotation, waterlogged state, and other block-specific attributes.

**Example:**
```javascript
const blockHit = player.detailedRayTraceBlock(5.0, false);
if (blockHit && !blockHit.isMissed()) {
    const blockState = blockHit.getBlockState();
    Chat.log(`Block type: ${blockState.getBlockId()}`);

    // Check specific block properties
    if (blockState.getBlockId() === "minecraft:chest") {
        const facing = blockState.get("facing");
        Chat.log(`Chest is facing: ${facing}`);
    }
}
```

### `getBlock()`
**Returns:** `BlockHelper` - The block helper for the hit block

Gets a BlockHelper instance that provides access to block-specific methods and properties.

**Example:**
```javascript
const blockHit = player.detailedRayTraceBlock(5.0, false);
if (blockHit && !blockHit.isMissed()) {
    const block = blockHit.getBlock();
    Chat.log(`Block name: ${block.getName()}`);
    Chat.log(`Block registry: ${block.getRegistryName()}`);
}
```

## Inherited Methods from HitResultHelper

The following methods are inherited from the parent `HitResultHelper` class:

### `getPos()`
**Returns:** `Pos3D` - The exact 3D position where the ray hit

Gets the precise world coordinates where the ray trace made contact with the block.

### `isMissed()`
**Returns:** `boolean` - Whether the ray trace missed

Always returns `false` for Block instances since they represent successful hits.

## Usage Examples

### Example 1: Block Type Detection
```javascript
function analyzeTargetBlock() {
    const blockHit = player.detailedRayTraceBlock(5.0, false);

    if (blockHit && !blockHit.isMissed()) {
        const block = blockHit.getBlock();
        const blockState = blockHit.getBlockState();
        const pos = blockHit.getBlockPos();
        const side = blockHit.getSide();

        Chat.log(`=== Block Analysis ===`);
        Chat.log(`Position: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
        Chat.log(`Block: ${block.getName()}`);
        Chat.log(`Hit Face: ${side.getName()}`);
        Chat.log(`Hardness: ${blockState.getHardness()}`);

        // Special handling for different block types
        switch (block.getName()) {
            case "minecraft:diamond_ore":
                Chat.log("✨ Found diamond ore!");
                break;
            case "minecraft:chest":
                Chat.log("📦 Looking at a chest");
                break;
            case "minecraft:bedrock":
                Chat.log("🪨 Unbreakable bedrock detected");
                break;
        }
    } else {
        Chat.log("No block in target range");
    }
}

analyzeTargetBlock();
```

### Example 2: Redstone Circuit Analysis
```javascript
function analyzeRedstoneComponent() {
    const blockHit = player.detailedRayTraceBlock(5.0, false);

    if (blockHit && !blockHit.isMissed()) {
        const block = blockHit.getBlock();
        const blockState = blockHit.getBlockState();
        const pos = blockHit.getBlockPos();
        const side = blockHit.getSide();

        // Check for redstone components
        const redstoneBlocks = [
            "minecraft:redstone_wire", "minecraft:redstone_torch",
            "minecraft:repeater", "minecraft:comparator", "minecraft:lever"
        ];

        if (redstoneBlocks.includes(block.getName())) {
            Chat.log(`=== Redstone Component ===`);
            Chat.log(`Type: ${block.getName()}`);
            Chat.log(`Position: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);

            // Analyze specific redstone properties
            switch (block.getName()) {
                case "minecraft:redstone_wire":
                    const power = blockState.get("power");
                    Chat.log(`Power level: ${power}/15`);
                    break;
                case "minecraft:repeater":
                    const delay = blockState.get("delay");
                    const facing = blockState.get("facing");
                    Chat.log(`Delay: ${delay} ticks`);
                    Chat.log(`Facing: ${facing}`);
                    break;
                case "minecraft:lever":
                    const powered = blockState.get("powered");
                    Chat.log(`State: ${powered ? "ON" : "OFF"}`);
                    break;
            }
        } else {
            Chat.log("Not a redstone component");
        }
    }
}

analyzeRedstoneComponent();
```

### Example 3: Farming Helper - Crop Analysis
```javascript
function analyzeCrop() {
    const blockHit = player.detailedRayTraceBlock(5.0, false);

    if (blockHit && !blockHit.isMissed()) {
        const block = blockHit.getBlock();
        const blockState = blockHit.getBlockState();
        const pos = blockHit.getBlockPos();

        // Check for crops
        const crops = {
            "minecraft:wheat": "age",
            "minecraft:carrots": "age",
            "minecraft:potatoes": "age",
            "minecraft:beetroots": "age",
            "minecraft:melon": "age",
            "minecraft:pumpkin": "age",
            "minecraft:sugar_cane": "age"
        };

        const cropType = Object.keys(crops).find(crop => crop === block.getName());

        if (cropType) {
            const ageProperty = crops[cropType];
            const age = blockState.get(ageProperty);
            const maxAge = blockState.getMaxAge();

            Chat.log(`=== Crop Analysis ===`);
            Chat.log(`Type: ${cropType.replace("minecraft:", "")}`);
            Chat.log(`Growth: ${age}/${maxAge} (${Math.round(age/maxAge * 100)}%)`);
            Chat.log(`Position: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);

            if (age >= maxAge) {
                Chat.log("🌾 Ready to harvest!");
            } else if (age < maxAge / 2) {
                Chat.log("🌱 Still growing...");
            } else {
                Chat.log("🌿 Almost ready!");
            }

            // Calculate time to fully grown (approximate)
            const remainingGrowth = maxAge - age;
            if (remainingGrowth > 0) {
                Chat.log(`Growth stages remaining: ${remainingGrowth}`);
            }
        } else {
            Chat.log("Not a crop or not fully recognizable");
        }
    }
}

analyzeCrop();
```

### Example 4: Block Breaking Assistant
```javascript
function smartBlockBreak() {
    const blockHit = player.detailedRayTraceBlock(6.0, false);

    if (blockHit && !blockHit.isMissed()) {
        const block = blockHit.getBlock();
        const blockState = blockHit.getBlockState();
        const pos = blockHit.getBlockPos();
        const side = blockHit.getSide();

        // Check if player has the right tool
        const playerInventory = player.getInventory();
        const currentItem = playerInventory.getMainHandStack();

        const toolEfficiency = getToolEfficiency(currentItem, block);
        const hardness = blockState.getHardness();

        Chat.log(`=== Block Break Analysis ===`);
        Chat.log(`Target: ${block.getName()}`);
        Chat.log(`Hardness: ${hardness}`);
        Chat.log(`Tool efficiency: ${toolEfficiency}`);
        Chat.log(`Hit face: ${side.getName()}`);

        // Determine if block can be broken efficiently
        if (toolEfficiency > 0) {
            const breakTime = hardness / toolEfficiency;
            Chat.log(`Estimated break time: ${breakTime.toFixed(2)} seconds`);

            if (breakTime < 0.5) {
                Chat.log("⚡ Instant break possible!");
            } else if (breakTime < 2) {
                Chat.log("🔨 Quick break");
            } else {
                Chat.log("⏱️  May take some time");
            }

            // Auto-break if efficiency is good
            if (breakTime < 3.0 && toolEfficiency > 1.0) {
                Chat.log("Attempting to break block...");
                player.interactBlock(pos, side);

                // Continue breaking (simplified)
                setTimeout(() => {
                    player.interactBlock(pos, side);
                }, Math.floor(breakTime * 1000));
            }
        } else {
            Chat.log("❌ Wrong tool or cannot break this block");
        }
    } else {
        Chat.log("No block in range");
    }
}

function getToolEfficiency(itemStack, block) {
    if (!itemStack || !itemStack.getItem()) return 0;

    const toolType = itemStack.getItem().getToolType();
    const blockMaterial = block.getMaterial();

    // Simplified tool efficiency calculation
    if (toolType === "pickaxe" && blockMaterial === "stone") return 4.0;
    if (toolType === "axe" && blockMaterial === "wood") return 3.0;
    if (toolType === "shovel" && blockMaterial === "earth") return 3.0;
    if (toolType === "hoe" && blockMaterial === "plant") return 2.0;

    return 1.0; // Base efficiency
}

smartBlockBreak();
```

### Example 5: Block Placement Helper
```javascript
function suggestBlockPlacement() {
    const blockHit = player.detailedRayTraceBlock(5.0, false);

    if (blockHit && !blockHit.isMissed()) {
        const block = blockHit.getBlock();
        const side = blockHit.getSide();
        const pos = blockHit.getBlockPos();
        const hitPos = blockHit.getPos();

        Chat.log(`=== Block Placement Analysis ===`);
        Chat.log(`Looking at: ${block.getName()}`);
        Chat.log(`Hit face: ${side.getName()}`);

        // Calculate suggested placement position
        const placePos = getPlacePosition(pos, side);
        Chat.log(`Suggested placement: ${placePos.x}, ${placePos.y}, ${placePos.z}`);

        // Check if placement position is valid
        const targetBlock = World.getBlock(placePos.x, placePos.y, placePos.z);
        const targetAbove = World.getBlock(placePos.x, placePos.y + 1, placePos.z);

        if (targetBlock.getName() === "minecraft:air") {
            Chat.log("✅ Placement spot is empty");

            // Check for space above if needed
            if (targetAbove.getName() === "minecraft:air") {
                Chat.log("✅ Space above is clear");
            } else {
                Chat.log("⚠️  Space above is occupied");
            }

            // Suggest best block to place based on context
            const currentInventory = player.getInventory();
            const mainHand = currentInventory.getMainHandStack();

            if (mainHand && mainHand.getItem()) {
                Chat.log(`Ready to place: ${mainHand.getItem().getName()}`);
                Chat.log("Right-click to place block");
            } else {
                Chat.log("❌ No block in hand to place");
            }
        } else {
            Chat.log("❌ Placement spot is occupied");
        }
    }
}

function getPlacePosition(blockPos, side) {
    const x = blockPos.getX();
    const y = blockPos.getY();
    const z = blockPos.getZ();

    switch (side.getName()) {
        case "up":    return { x, y: y + 1, z };
        case "down":  return { x, y: y - 1, z };
        case "north": return { x, y, z: z - 1 };
        case "south": return { x, y, z: z + 1 };
        case "east":  return { x: x + 1, y, z };
        case "west":  return { x: x - 1, y, z };
        default:      return { x, y, z };
    }
}

suggestBlockPlacement();
```

## Important Notes

### Ray Trace Parameters

1. **Distance:** Maximum ray trace distance (typically 4.0-6.0 blocks for player interaction)
2. **Fluid Handling:** Whether ray traces should stop at water or other fluids
3. **Block Collision:** Determines whether to include blocks that can be collided with

### Performance Considerations

1. **Frequency:** Ray tracing operations can be expensive if called frequently
2. **Caching:** Cache results when performing multiple checks on the same target
3. **Distance Limits:** Use appropriate distance limits to balance performance

### Block State Variations

1. **Properties:** Different blocks have different state properties
2. **Metadata:** Some block information may require specific access methods
3. **Updates:** Block states may change between ray trace and analysis

## Best Practices

1. **Null Checking:** Always check for null returns before accessing properties
2. **Face Analysis:** Use hit face information for directional calculations
3. **Block Validation:** Verify block types before accessing specific properties
4. **Distance Management:** Use appropriate ray trace distances for different use cases
5. **State Caching:** Cache block state information when used multiple times

## Related Classes

- [`HitResultHelper`](HitResultHelper.md) - Parent class
- [`HitResultHelper$Entity`](hit-result-helper$entity.md) - Entity-specific hit results
- [`BlockPosHelper`](BlockPosHelper.md) - Block coordinate handling
- [`DirectionHelper`](DirectionHelper.md) - Direction and face information
- [`BlockStateHelper`](BlockStateHelper.md) - Block state management
- [`BlockHelper`](BlockHelper.md) - Block information and methods
- [`Pos3D`](Pos3D.md) - 3D position handling

## Version History

- **1.9.1:** Initial introduction with basic block hit detection
- **Current:** Enhanced block state access and improved face detection