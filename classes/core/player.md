# Player

Provides access to player state, inventory, movement, interactions, and various player-related operations. The Player library allows scripts to control and monitor the local player character, including inventory management, movement control, game mode settings, and interaction with the world.

**Variable Name:** `Player`
**Library Name:** `Player`
**Package:** `xyz.wagyourtail.jsmacros.client.api.library.impl`
**Since:** 1.0.0

## Overview

The Player library is one of the core JsMacros libraries available in all scripts. It provides comprehensive access to the local player's state and allows for player control and manipulation. Key features include:

- Inventory access and management
- Player state information (health, hunger, experience, etc.)
- Movement control and automation
- Game mode management
- Interaction with blocks and entities
- Screenshot and panorama capture
- Sign editing
- Player input control

## Player Information

### Player.getPlayer()

Get the current player entity helper with access to all player properties.

```js
const player = Player.getPlayer();
if (player) {
    Chat.log(`Player health: ${player.getHealth()}/${player.getMaxHealth()}`);
    Chat.log(`Position: ${player.getPos()}`);
    Chat.log(`Game mode: ${player.getGameMode()}`);
    Chat.log(`Experience level: ${player.getExperienceLevel()}`);
} else {
    Chat.log("No player currently available");
}
```

**Return Type:** `ClientPlayerEntityHelper<ClientPlayerEntity> | null`
**Returns:** Player entity helper or `null` if no player is available
**Usage Notes:** Always check for null return, especially in menus or when not in a world

### Player.getGameMode()

Get the current player's game mode.

```js
const gameMode = Player.getGameMode();
Chat.log(`Current game mode: ${gameMode}`);

// Game modes can be: survival, creative, adventure, spectator
if (gameMode === "creative") {
    Chat.log("Player is in creative mode - can fly!");
} else if (gameMode === "survival") {
    Chat.log("Player is in survival mode - must manage resources");
}
```

**Return Type:** `String`
**Returns:** Current game mode name ("survival", "creative", "adventure", "spectator")

### Player.setGameMode()

Change the player's game mode (requires appropriate permissions).

```js
// Set to creative mode (requires cheats/admin)
Player.setGameMode("creative");
Chat.log("Switched to creative mode");

// Set to survival mode
Player.setGameMode("survival");
Chat.log("Switched to survival mode");

// Available modes: survival, creative, adventure, spectator (case insensitive)
Player.setGameMode("SPECTATOR"); // Case insensitive
```

**Parameters:**
- `gameMode` (`String`): Target game mode ("survival", "creative", "adventure", "spectator")

**Usage Notes:** Requires appropriate server permissions or cheats enabled

### Player.getReach()

Get the player's current reach distance.

```js
const reach = Player.getReach();
Chat.log(`Player reach distance: ${reach} blocks`);
```

**Return Type:** `double`
**Returns:** Current reach distance in blocks

## Inventory and Items

### Player.openInventory()

Open and access the player's inventory.

```js
const inventory = Player.openInventory();
if (inventory) {
    Chat.log(`Inventory size: ${inventory.getSize()}`);
    Chat.log(`Selected hotbar slot: ${inventory.getSelectedHotbarSlotIndex()}`);

    // Get item in main hand
    const mainHand = inventory.getMainHand();
    if (mainHand) {
        Chat.log(`Main hand: ${mainHand.getName()} x${mainHand.getCount()}`);
    }

    // Get item in hotbar slot 0
    const hotbarItem = inventory.getSlot(36); // Hotbar slots start at 36
    if (hotbarItem) {
        Chat.log(`Hotbar slot 1: ${hotbarItem.getName()}`);
    }
}
```

**Return Type:** `Inventory<?>`
**Returns:** Inventory helper for player inventory
**See Also:** [Inventory Documentation](../helpers/inventory/inventory.md)

### Player.getStatistics()

Get player statistics and achievements.

```js
const stats = Player.getStatistics();
if (stats) {
    // Get specific statistic
    const jumps = stats.getStatistic("minecraft:custom", "minecraft:jump");
    Chat.log(`Total jumps: ${jumps}`);

    // Get distance walked
    const walked = stats.getStatistic("minecraft:custom", "minecraft:walk_one_cm");
    Chat.log(`Distance walked: ${walked / 100} meters`);

    // Get blocks mined
    const stoneMined = stats.getStatistic("minecraft:mined", "minecraft:stone");
    Chat.log(`Stone blocks mined: ${stoneMined}`);
}
```

**Return Type:** `StatsHelper`
**Returns:** Statistics helper for player statistics
**See Also:** [StatsHelper Documentation](../helpers/stats-helper.md)

## Interaction and Targeting

### Player.rayTraceBlock()

Get the block the player is currently looking at.

```js
// Get block player is looking at (10 blocks distance, ignore fluids)
const targetBlock = Player.rayTraceBlock(10, false);
if (targetBlock) {
    Chat.log(`Looking at: ${targetBlock.getId()}`);
    Chat.log(`Position: ${targetBlock.getPos()}`);
    Chat.log(`State: ${targetBlock.getState()}`);
} else {
    Chat.log("Not looking at any block");
}

// Include fluids in raycast (water, lava)
const fluidTarget = Player.rayTraceBlock(10, true);
if (fluidTarget) {
    Chat.log(`Including fluids: ${fluidTarget.getId()}`);
}
```

**Parameters:**
- `distance` (`double`): Maximum raycast distance
- `fluid` (`boolean`): Whether to include fluids in raycast

**Return Type:** `BlockDataHelper | null`
**Returns:** Block data helper or `null` if no block hit

### Player.detailedRayTraceBlock()

Get detailed raycast information including exact hit position and face.

```js
const detailedHit = Player.detailedRayTraceBlock(10, false);
if (detailedHit) {
    Chat.log(`Block: ${detailedHit.getBlock().getId()}`);
    Chat.log(`Hit position: ${detailedHit.getHitPos()}`);
    Chat.log(`Hit face: ${detailedHit.getSide()}`);
    Chat.log(`Exact distance: ${detailedHit.getDistance()}`);
}
```

**Parameters:**
- `distance` (`double`): Maximum raycast distance
- `fluid` (`boolean`): Whether to include fluids in raycast

**Return Type:** `HitResultHelper.Block`
**Returns:** Detailed raycast result information

### Player.rayTraceEntity()

Get the entity the player is currently looking at.

```js
// Get entity within 20 blocks
const targetEntity = Player.rayTraceEntity(20);
if (targetEntity) {
    Chat.log(`Looking at: ${targetEntity.getType()}`);
    Chat.log(`Distance: ${targetEntity.distanceTo(Player.getPlayer())}`);
    Chat.log(`Health: ${targetEntity.getHealth()}`);
} else {
    Chat.log("Not looking at any entity");
}
```

**Parameters:**
- `distance` (`int`): Maximum raycast distance

**Return Type:** `EntityHelper<?> | null`
**Returns:** Entity helper or `null` if no entity hit

**Deprecated:** Use `InteractionManager.getTargetedEntity()` instead

### Player.getInteractionManager()

Get the interaction manager for controlling player interactions.

```js
const interactionManager = Player.getInteractionManager();
if (interactionManager) {
    // Alternative access method
    const altManager = Player.interactions();

    // Set targeted entity
    const nearestEntity = World.getEntities(10)[0];
    if (nearestEntity) {
        interactionManager.setTarget(nearestEntity);
        Chat.log(`Set target to ${nearestEntity.getType()}`);
    }

    // Get current target
    const currentTarget = interactionManager.getTargetedEntity();
    if (currentTarget) {
        Chat.log(`Current target: ${currentTarget.getType()}`);
    }
}
```

**Return Type:** `InteractionManagerHelper | null`
**Returns:** Interaction manager helper or `null` if not available

## Movement and Input

### Player.createPlayerInput()

Create player input objects for movement control.

```js
// Create basic input - move forward
const forwardInput = Player.createPlayerInput(1, 0, 0, 0, false, false, false);
Player.addInput(forwardInput);

// Create jumping input
const jumpInput = Player.createPlayerInput(0, 0, 0, 0, true, false, false);
Player.addInput(jumpInput);

// Create sprinting input
const sprintInput = Player.createPlayerInput(1, 0, 0, 0, false, false, true);
Player.addInput(sprintInput);

// Complex movement - move forward while strafing left
const complexInput = Player.createPlayerInput(1, 1, player.getYaw(), 0, false, false, true);
Player.addInput(complexInput);
```

**Parameters (Full Version):**
- `movementForward` (`double`): Forward movement (-1 to 1, W=1, S=-1)
- `movementSideways` (`double`): Sideways movement (-1 to 1, A=1, D=-1)
- `yaw` (`double`): Player yaw rotation
- `pitch` (`double`): Player pitch rotation
- `jumping` (`boolean`): Jump input state
- `sneaking` (`boolean`): Sneak input state
- `sprinting` (`boolean`): Sprint input state

**Return Type:** `PlayerInput`
**Returns:** Player input object

### Player.getCurrentPlayerInput()

Get the current player input state.

```js
const currentInput = Player.getCurrentPlayerInput();
Chat.log(`Forward movement: ${currentInput.getMovementForward()}`);
Chat.log(`Sideways movement: ${currentInput.getMovementSideways()}`);
Chat.log(`Jumping: ${currentInput.isJumping()}`);
Chat.log(`Sneaking: ${currentInput.isSneaking()}`);
Chat.log(`Sprinting: ${currentInput.isSprinting()}`);
```

**Return Type:** `PlayerInput`
**Returns:** Current player input state

### Player.addInput()

Add player input to movement queue for execution.

```js
// Create and add movement sequence
const inputs = [
    Player.createPlayerInput(1, 0, player.getYaw(), 0, false, false, true),  // Forward sprint
    Player.createPlayerInput(0, 0, 0, 0, true, false, false),              // Jump
    Player.createPlayerInput(1, 0, player.getYaw(), 0, false, false, false) // Forward normal
];

// Add inputs to queue
Player.addInputs(inputs);

// Add single input
const singleInput = Player.createPlayerInput(1, 0, player.getYaw(), 0, false, false, false);
Player.addInput(singleInput);
```

**Parameters:**
- `input` (`PlayerInput`): Input to add to queue
- `inputs` (`PlayerInput[]`): Array of inputs to add

### Player.createPlayerInputsFromCsv()

Create player inputs from CSV data.

```js
const csvData = `movementForward,movementSideways,yaw,pitch,jumping,sneaking,sprinting
1,0,90,0,false,false,true
0,0,90,0,true,false,false
1,1,90,0,false,false,false`;

try {
    const inputs = Player.createPlayerInputsFromCsv(csvData);
    Player.addInputs(inputs);
    Chat.log(`Loaded ${inputs.length} inputs from CSV`);
} catch (error) {
    Chat.log(`Error parsing CSV: ${error.message}`);
}
```

**Parameters:**
- `csv` (`String`): CSV string with player input data

**Return Type:** `List<PlayerInput>`
**Returns:** List of player inputs parsed from CSV

### Player.createPlayerInputsFromJson()

Create player input from JSON data.

```js
const jsonData = `{
    "movementForward": 1,
    "movementSideways": 0,
    "yaw": 90,
    "pitch": 0,
    "jumping": false,
    "sneaking": false,
    "sprinting": true
}`;

try {
    const input = Player.createPlayerInputsFromJson(jsonData);
    Player.addInput(input);
    Chat.log("Loaded input from JSON");
} catch (error) {
    Chat.log(`Error parsing JSON: ${error.message}`);
}
```

**Parameters:**
- `json` (`String`): JSON string with player input data

**Return Type:** `PlayerInput`
**Returns:** Player input parsed from JSON

## Screen Capture

### Player.takeScreenshot()

Take a screenshot and save it to a file.

```js
// Take screenshot with automatic filename
Player.takeScreenshot("screenshots", (result) => {
    Chat.log(`Screenshot saved: ${result.getString()}`);
});

// Take screenshot with custom filename
Player.takeScreenshot("screenshots", "my_screenshot.png", (result) => {
    Chat.log(`Custom screenshot saved: ${result.getString()}`);
});
```

**Parameters:**
- `folder` (`String`): Folder to save screenshot (relative to macro folder)
- `file` (`String`, optional): Custom filename
- `callback` (`MethodWrapper`, optional): Callback called with result

### Player.takePanorama()

Take a panoramic screenshot.

```js
// Take 360° panorama
Player.takePanorama("panoramas", 3840, 2160, (result) => {
    Chat.log(`Panorama saved: ${result.getString()}`);
});

// Smaller panorama
Player.takePanorama("panoramas", 1920, 1080, (result) => {
    Chat.log(`Small panorama saved: ${result.getString()}`);
});
```

**Parameters:**
- `folder` (`String`): Folder to save panorama (relative to macro folder)
- `width` (`int`): Panorama width
- `height` (`int`): Panorama height
- `callback` (`MethodWrapper`, optional): Callback called with result

## Sign Editing

### Player.writeSign()

Write text to signs when the sign editing screen is open.

```js
// Write all four lines
const success = Player.writeSign("Line 1", "Line 2", "Line 3", "Line 4");
if (success) {
    Chat.log("Sign text updated!");
} else {
    Chat.log("No sign editing screen open");
}

// Write specific line
const lineSuccess = Player.writeSign(0, "New First Line");
if (lineSuccess) {
    Chat.log("First line updated!");
}

// Update multiple lines
Player.writeSign(0, "Welcome");
Player.writeSign(1, "To");
Player.writeSign(2, "My");
Player.writeSign(3, "Shop!");
```

**Parameters:**
- Line version: `l1, l2, l3, l4` (`String | null`): Text for each line (null to keep unchanged)
- Index version: `index` (`int`): Line index (0-3), `message` (`String`): Text to write

**Return Type:** `boolean`
**Returns:** `true` if sign editing screen was open and text was set

## Usage Patterns

### Auto Mining Assistant

```js
function autoMine() {
    const player = Player.getPlayer();
    if (!player) return;

    // Get block looking at
    const target = Player.rayTraceBlock(6, false);
    if (!target) {
        Chat.log("No block to mine");
        return;
    }

    // Move toward target
    const targetPos = target.getPos();
    const playerPos = player.getPos();
    const direction = Math.atan2(
        targetPos.x - playerPos.x,
        targetPos.z - playerPos.z
    ) * 180 / Math.PI;

    // Create movement input
    const moveInput = Player.createPlayerInput(1, 0, direction, 0, false, false, false);
    Player.addInput(moveInput);

    Chat.log(`Moving toward ${target.getId()} at ${targetPos}`);
}
```

### Inventory Manager

```js
function organizeHotbar() {
    const inventory = Player.openInventory();
    const player = Player.getPlayer();

    if (!inventory || !player) return;

    // Get all items from inventory
    const items = [];
    for (let i = 0; i < inventory.getSize(); i++) {
        const item = inventory.getSlot(i);
        if (item && item.getCount() > 0) {
            items.push({ slot: i, item: item });
        }
    }

    // Group items by type
    const itemGroups = {};
    items.forEach(({ slot, item }) => {
        const name = item.getName();
        if (!itemGroups[name]) {
            itemGroups[name] = [];
        }
        itemGroups[name].push(slot);
    });

    // Report organization
    for (const [itemName, slots] of Object.entries(itemGroups)) {
        Chat.log(`${itemName}: ${slots.length} items in slots ${slots.join(', ')}`);
    }
}
```

### Movement Recorder

```js
// Record player movement
const recordedInputs = [];

function startRecording() {
    JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
        const currentInput = Player.getCurrentPlayerInput();
        recordedInputs.push({
            forward: currentInput.getMovementForward(),
            sideways: currentInput.getMovementSideways(),
            yaw: currentInput.getYaw(),
            pitch: currentInput.getPitch(),
            jumping: currentInput.isJumping(),
            sneaking: currentInput.isSneaking(),
            sprinting: currentInput.isSprinting()
        });
    }));
}

function stopRecording() {
    // Remove tick listener (implementation specific)

    Chat.log(`Recorded ${recordedInputs.length} movement inputs`);

    // Save to CSV
    const csv = "movementForward,movementSideways,yaw,pitch,jumping,sneaking,sprinting\n" +
        recordedInputs.map(input =>
            `${input.forward},${input.sideways},${input.yaw},${input.pitch},${input.jumping},${input.sneaking},${input.sprinting}`
        ).join('\n');

    Fs.writeFile("recorded_movement.csv", csv);
}
```

## Best Practices

1. **Null Checks**: Always check if `Player.getPlayer()` returns null
2. **Game Mode Awareness**: Consider game mode restrictions for operations
3. **Movement Safety**: Be careful with automated movement to avoid falling or other dangers
4. **Input Validation**: Validate parameters for game mode changes and other operations
5. **Performance**: Avoid calling player methods every tick unless necessary

## Related Classes

- **[ClientPlayerEntityHelper](helpers/world/entity/client-player-entity-helper.md)** - Player entity helper
- **[Inventory](helpers/inventory/inventory.md)** - Inventory management
- **[InteractionManagerHelper](helpers/interaction-manager-helper.md)** - Player interactions
- **[PlayerInput](classes/player-input.md)** - Player input control
- **[StatsHelper](helpers/stats-helper.md)** - Player statistics
- **[BlockDataHelper](helpers/world/block-data-helper.md)** - Block information

## Error Handling

```js
function safePlayerOperation() {
    const player = Player.getPlayer();
    if (!player) {
        Chat.log("No player available - possibly in menu");
        return;
    }

    try {
        const health = player.getHealth();
        const gameMode = Player.getGameMode();

        Chat.log(`Player status - Health: ${health}, Game Mode: ${gameMode}`);

        // Safe raycast
        const target = Player.rayTraceBlock(5, false);
        if (target) {
            Chat.log(`Looking at: ${target.getId()}`);
        }

    } catch (error) {
        Chat.log(`Player operation error: ${error.message}`);
    }
}
```