# InteractionManagerHelper

## Overview

The `InteractionManagerHelper` class provides comprehensive control over player interactions in Minecraft through JSMacros. This helper wraps Minecraft's native `ClientPlayerInteractionManager` and exposes methods for attacking entities, breaking blocks, interacting with objects, and managing targeting systems. It serves as the primary interface for script-based automation of player actions.

This class is essential for creating scripts that need to perform in-game actions like mining, combat, block placement, or entity interactions. It provides both immediate action methods and async/blocking variants for different use cases.

## Accessing InteractionManagerHelper

You typically get `InteractionManagerHelper` instances through the `Client` player helper:

```javascript
// Get the interaction manager from the player
const interactionManager = player.getInteractionManager();

// Example: Check if it's available and perform actions
if (interactionManager) {
    Chat.log("Interaction manager available");
    const gameMode = interactionManager.getGameMode();
    Chat.log("Current game mode: " + gameMode);
}
```

## Properties

### `autoUpdateBase`

Controls whether the helper should automatically update its base interaction manager reference. When `true` (default), the helper will automatically update to use the current interaction manager if the previous one becomes invalid.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.autoUpdateBase = false; // Disable auto-updating
interactionManager.autoUpdateBase = true;  // Enable auto-updating (default)
```

**Type**: `boolean`
**Default**: `true`

## Methods

### Game Mode Management

#### `getGameMode()`
Returns the player's current game mode.

```javascript
const interactionManager = player.getInteractionManager();
const gameMode = interactionManager.getGameMode();
// Possible values: "survival", "creative", "adventure", "spectator"
Chat.log("Current game mode: " + gameMode);
```

**Returns**
* `string`: The current game mode name

#### `setGameMode(gameMode)`
Sets the player's game mode.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setGameMode("creative");
interactionManager.setGameMode("survival");
```

**Params**

1. `gameMode: string`: Game mode to set ("survival", "creative", "adventure", "spectator", case insensitive)

**Returns**
* `InteractionManagerHelper`: Self for chaining

### Target Management

#### `setTarget(x, y, z)`
Sets the crosshair target to a specific block position.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setTarget(100, 64, 200);
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTarget(x, y, z, direction)`
Sets the crosshair target to a block with a specific facing direction.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setTarget(100, 64, 200, "up");
interactionManager.setTarget(100, 64, 200, "north");
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate
4. `direction: string`: Direction ("up", "down", "north", "south", "east", "west")

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTarget(x, y, z, direction)`
Sets the crosshair target to a block using numeric direction values.

```javascript
const interactionManager = player.getInteractionManager();
// Direction values: 0=down, 1=up, 2=north, 3=south, 4=west, 5=east
interactionManager.setTarget(100, 64, 200, 1); // up
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate
4. `direction: int`: Direction value (0-5: [DOWN, UP, NORTH, SOUTH, WEST, EAST])

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTarget(pos)`
Sets the crosshair target to a block using BlockPosHelper.

```javascript
const interactionManager = player.getInteractionManager();
const pos = World.getBlock(player.getX(), player.getY(), player.getZ()).getPos();
interactionManager.setTarget(pos);
```

**Params**

1. `pos: BlockPosHelper`: Block position

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTarget(pos, direction)`
Sets the crosshair target to a block with direction using BlockPosHelper.

```javascript
const interactionManager = player.getInteractionManager();
const pos = World.getBlock(player.getX(), player.getY(), player.getZ()).getPos();
interactionManager.setTarget(pos, "up");
```

**Params**

1. `pos: BlockPosHelper`: Block position
2. `direction: string`: Direction ("up", "down", "north", "south", "east", "west")

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTarget(entity)`
Sets the crosshair target to an entity.

```javascript
const interactionManager = player.getInteractionManager();
const entity = player.getTargetedEntity();
if (entity) {
    interactionManager.setTarget(entity);
}
```

**Params**

1. `entity: EntityHelper`: Entity to target

**Returns**
* `InteractionManagerHelper`: Self for chaining

**Notes**
Throws an error if trying to target self or an entity that cannot be hit.

#### `getTarget()`
Returns the current hit result target.

```javascript
const interactionManager = player.getInteractionManager();
const target = interactionManager.getTarget();
if (target) {
    Chat.log("Currently targeting: " + target.getType());
}
```

**Returns**
* `HitResultHelper | null`: Current hit result or null if none

#### `getTargetedBlock()`
Returns the currently targeted block position.

```javascript
const interactionManager = player.getInteractionManager();
const blockPos = interactionManager.getTargetedBlock();
if (blockPos) {
    Chat.log("Targeting block at: " + blockPos.getX() + ", " + blockPos.getY() + ", " + blockPos.getZ());
}
```

**Returns**
* `BlockPosHelper | null`: Targeted block position or null if not targeting a block

#### `getTargetedEntity()`
Returns the currently targeted entity.

```javascript
const interactionManager = player.getInteractionManager();
const entity = interactionManager.getTargetedEntity();
if (entity) {
    Chat.log("Targeting entity: " + entity.getName());
}
```

**Returns**
* `EntityHelper | null`: Targeted entity or null if not targeting an entity

#### `setTargetMissed()`
Sets the crosshair target to nothing (missed).

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setTargetMissed();
```

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `hasTargetOverride()`
Checks if a target override is currently active.

```javascript
const interactionManager = player.getInteractionManager();
if (interactionManager.hasTargetOverride()) {
    Chat.log("Target override is active");
}
```

**Returns**
* `boolean`: True if target override is active

#### `clearTargetOverride()`
Clears the target override, restoring normal targeting.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.clearTargetOverride();
```

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTargetRangeCheck(enabled, autoClear)`
Configures target range checking behavior.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setTargetRangeCheck(true, true); // Enable range checking with auto-clear
```

**Params**

1. `enabled: boolean`: Whether to check target range (default: true)
2. `autoClear: boolean`: Whether to auto-clear target when out of range (default: true)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTargetAirCheck(enabled, autoClear)`
Configures target air checking behavior.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setTargetAirCheck(true, false); // Enable air checking without auto-clear
```

**Params**

1. `enabled: boolean`: Whether to check if target is air (default: false)
2. `autoClear: boolean`: Whether to auto-clear target when it's air (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `setTargetShapeCheck(enabled, autoClear)`
Configures target block shape checking behavior.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.setTargetShapeCheck(true, false); // Enable shape checking without auto-clear
```

**Params**

1. `enabled: boolean`: Whether to check block shape (default: true)
2. `autoClear: boolean`: Whether to auto-clear target when shape is empty (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `resetTargetChecks()`
Resets all target checking settings to their defaults.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.resetTargetChecks();
```

**Returns**
* `InteractionManagerHelper`: Self for chaining

### Combat Methods

#### `attack()`
Performs an attack action on whatever is currently targeted.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.attack();
```

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `attack(await)`
Performs an attack with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.attack(true); // Wait for attack to complete
```

**Params**

1. `await: boolean`: Whether to wait for the attack to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `attack(entity)`
Attacks a specific entity.

```javascript
const interactionManager = player.getInteractionManager();
const entity = player.getTargetedEntity();
if (entity) {
    interactionManager.attack(entity);
}
```

**Params**

1. `entity: EntityHelper`: Entity to attack

**Returns**
* `InteractionManagerHelper`: Self for chaining

**Notes**
Throws an error if trying to attack self.

#### `attack(entity, await)`
Attacks a specific entity with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
const entity = player.getTargetedEntity();
if (entity) {
    interactionManager.attack(entity, true); // Wait for attack to complete
}
```

**Params**

1. `entity: EntityHelper`: Entity to attack
2. `await: boolean`: Whether to wait for the attack to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `attack(x, y, z, direction)`
Attacks a block at specific coordinates.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.attack(100, 64, 200, "up");
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate
4. `direction: string`: Direction ("up", "down", "north", "south", "east", "west")

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `attack(x, y, z, direction, await)`
Attacks a block with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.attack(100, 64, 200, "up", true);
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate
4. `direction: string`: Direction ("up", "down", "north", "south", "east", "west")
5. `await: boolean`: Whether to wait for the attack to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

### Block Breaking Methods

#### `breakBlock()`
Breaks the currently targeted block, waiting until completion.

```javascript
const interactionManager = player.getInteractionManager();
// Set target first if needed
interactionManager.setTarget(player.getX(), player.getY() - 1, player.getZ());
const result = interactionManager.breakBlock();

if (result) {
    Chat.log("Block break result: " + result.getStatus());
    Chat.log("Block position: " + result.getPos());
}
```

**Returns**
* `BreakBlockResult | null`: Break result object or null if unavailable

**Notes**
- Blocks until breaking is complete or fails
- Can be interrupted with `cancelBreakBlock()`
- Use `setTarget()` to specify which block to break

#### `breakBlock(x, y, z)`
Breaks a block at specific coordinates.

```javascript
const interactionManager = player.getInteractionManager();
const result = interactionManager.breakBlock(100, 64, 200);
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate

**Returns**
* `BreakBlockResult | null`: Break result object or null if unavailable

#### `breakBlock(pos)`
Breaks a block at a specific position using BlockPosHelper.

```javascript
const interactionManager = player.getInteractionManager();
const pos = World.getBlock(player.getX(), player.getY() - 1, player.getZ()).getPos();
const result = interactionManager.breakBlock(pos);
```

**Params**

1. `pos: BlockPosHelper`: Block position to break

**Returns**
* `BreakBlockResult | null`: Break result object or null if unavailable

#### `breakBlockAsync(callback)`
Starts breaking a block asynchronously with callback.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.breakBlockAsync(JavaWrapper.methodToJavaAsync((result) => {
    Chat.log("Block break completed!");
    Chat.log("Status: " + result.getStatus());
    if (result.getPos()) {
        Chat.log("Position: " + result.getPos());
    }
}));
```

**Params**

1. `callback: MethodWrapper | null`: Callback function to receive break result (null for no callback)

**Returns**
* `InteractionManagerHelper`: Self for chaining

**Notes**
- Callback is called on main thread, use `methodToJavaAsync()` for safe callbacks
- Returns immediately, breaking happens in background

#### `isBreakingBlock()`
Checks if currently breaking a block (vanilla breaking, not from breakBlock method).

```javascript
const interactionManager = player.getInteractionManager();
if (interactionManager.isBreakingBlock()) {
    Chat.log("Currently breaking a block");
}
```

**Returns**
* `boolean`: True if currently breaking a block

#### `hasBreakBlockOverride()`
Checks if there's an active block breaking override from `breakBlock()` methods.

```javascript
const interactionManager = player.getInteractionManager();
if (interactionManager.hasBreakBlockOverride()) {
    Chat.log("Block breaking override is active");
}
```

**Returns**
* `boolean`: True if block breaking override is active

#### `cancelBreakBlock()`
Cancels an active block breaking operation.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.cancelBreakBlock();
```

**Returns**
* `InteractionManagerHelper`: Self for chaining

### Interaction Methods

#### `interact()`
Performs an interaction action with whatever is currently targeted.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.interact();
```

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `interact(await)`
Performs an interaction with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.interact(true); // Wait for interaction to complete
```

**Params**

1. `await: boolean`: Whether to wait for the interaction to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `interactEntity(entity, offHand)`
Interacts with a specific entity.

```javascript
const interactionManager = player.getInteractionManager();
const entity = player.getTargetedEntity();
if (entity) {
    interactionManager.interactEntity(entity, false); // Use main hand
}
```

**Params**

1. `entity: EntityHelper`: Entity to interact with
2. `offHand: boolean`: Whether to use off-hand (false for main hand)

**Returns**
* `InteractionManagerHelper`: Self for chaining

**Notes**
Throws an error if trying to interact with self.

#### `interactEntity(entity, offHand, await)`
Interacts with an entity with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
const entity = player.getTargetedEntity();
if (entity) {
    interactionManager.interactEntity(entity, false, true); // Main hand, wait for completion
}
```

**Params**

1. `entity: EntityHelper`: Entity to interact with
2. `offHand: boolean`: Whether to use off-hand (false for main hand)
3. `await: boolean`: Whether to wait for the interaction to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `interactItem(offHand)`
Uses the currently held item.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.interactItem(false); // Use main hand
interactionManager.interactItem(true);  // Use off-hand
```

**Params**

1. `offHand: boolean`: Whether to use off-hand (false for main hand)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `interactItem(offHand, await)`
Uses the currently held item with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.interactItem(false, true); // Main hand, wait for completion
```

**Params**

1. `offHand: boolean`: Whether to use off-hand (false for main hand)
2. `await: boolean`: Whether to wait for the interaction to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `interactBlock(x, y, z, direction, offHand)`
Interacts with a block at specific coordinates.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.interactBlock(100, 64, 200, "up", false); // Main hand
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate
4. `direction: string`: Direction ("up", "down", "north", "south", "east", "west")
5. `offHand: boolean`: Whether to use off-hand (false for main hand)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `interactBlock(x, y, z, direction, offHand, await)`
Interacts with a block with optional waiting.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.interactBlock(100, 64, 200, "up", false, true); // Main hand, wait for completion
```

**Params**

1. `x: int`: X coordinate
2. `y: int`: Y coordinate
3. `z: int`: Z coordinate
4. `direction: string`: Direction ("up", "down", "north", "south", "east", "west")
5. `offHand: boolean`: Whether to use off-hand (false for main hand)
6. `await: boolean`: Whether to wait for the interaction to complete (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `holdInteract(holding)`
Starts or stops a continuous interaction (right-click and hold).

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.holdInteract(true);  // Start holding interaction
// ... do something while holding
interactionManager.holdInteract(false); // Stop holding interaction
```

**Params**

1. `holding: boolean`: Whether to start (true) or stop (false) holding interaction

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `holdInteract(holding, awaitFirstClick)`
Starts or stops holding with optional waiting for first click.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.holdInteract(true, true); // Start and wait for first click
```

**Params**

1. `holding: boolean`: Whether to start (true) or stop (false) holding interaction
2. `awaitFirstClick: boolean`: Whether to wait for the first interaction click (default: false)

**Returns**
* `InteractionManagerHelper`: Self for chaining

#### `holdInteract(ticks)`
Holds interaction for a specific number of ticks.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.holdInteract(60); // Hold for 3 seconds (60 ticks)
```

**Params**

1. `ticks: int`: Number of ticks to hold interaction (20 ticks = 1 second)

**Returns**
* `int`: Remaining ticks if interaction was interrupted, 0 if completed

#### `holdInteract(ticks, stopOnPause)`
Holds interaction for ticks with pause handling option.

```javascript
const interactionManager = player.getInteractionManager();
interactionManager.holdInteract(60, false); // Hold for 60 ticks, don't stop on pause
```

**Params**

1. `ticks: int`: Number of ticks to hold interaction
2. `stopOnPause: boolean`: Whether to stop when game is paused (default: true)

**Returns**
* `int`: Remaining ticks if interaction was interrupted, 0 if completed

#### `hasInteractOverride()`
Checks if a hold interact override is currently active.

```javascript
const interactionManager = player.getInteractionManager();
if (interactionManager.hasInteractOverride()) {
    Chat.log("Hold interaction is currently active");
}
```

**Returns**
* `boolean`: True if hold interaction override is active

### Internal Methods

#### `checkBase(update)`
Internal method to verify the base interaction manager matches the current one.

**Params**

1. `update: boolean`: Whether to update the base if it doesn't match

**Returns**
* `boolean`: True if base is available

## Usage Examples

### Basic Targeting and Breaking
```javascript
function mineBlockAt(x, y, z) {
    const interactionManager = player.getInteractionManager();

    // Set target to the block
    interactionManager.setTarget(x, y, z, "up");

    // Break the block and wait for completion
    const result = interactionManager.breakBlock();

    if (result) {
        Chat.log("Block break status: " + result.getStatus());
        if (result.getStatus() === "SUCCESS") {
            Chat.log("Successfully broke block at " + x + ", " + y + ", " + z);
        }
    }

    // Clear target override
    interactionManager.clearTargetOverride();
}

// Mine the block below the player
const playerPos = player.getPos();
mineBlockAt(Math.floor(playerPos.x), Math.floor(playerPos.y) - 1, Math.floor(playerPos.z));
```

### Entity Combat Script
```javascript
function combatMode() {
    const interactionManager = player.getInteractionManager();

    events.on("Tick", JavaWrapper.methodToJava(() => {
        const target = player.getTargetedEntity();

        if (target) {
            // Attack the targeted entity
            interactionManager.attack(target, true);

            // Display combat info
            Chat.log("Attacking: " + target.getName() +
                    " (Health: " + target.getHealth() + "/" + target.getMaxHealth() + ")");
        }
    }));
}

// Note: This is an example - be careful with automated combat on servers
```

### Automated Block Placement
```javascript
function placeBlockLine(fromX, fromY, fromZ, toX, toY, toZ) {
    const interactionManager = player.getInteractionManager();

    // Calculate line points (simplified)
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.floor(fromX + (toX - fromX) * t);
        const y = Math.floor(fromY + (toY - fromY) * t);
        const z = Math.floor(fromZ + (toZ - fromZ) * t);

        // Look at the block position
        interactionManager.setTarget(x, y - 1, z, "up");

        // Right-click to place block (assuming player has blocks in hand)
        interactionManager.interactBlock(x, y - 1, z, "up", false, true);

        // Small delay between placements
        Time.sleep(100);
    }
}

// Place a line of blocks from player position forward
const playerPos = player.getPos();
const lookDir = player.getLookDirection();
placeBlockLine(
    Math.floor(playerPos.x), Math.floor(playerPos.y), Math.floor(playerPos.z),
    Math.floor(playerPos.x + lookDir.x * 5),
    Math.floor(playerPos.y),
    Math.floor(playerPos.z + lookDir.z * 5)
);
```

### Asynchronous Block Breaking
```javascript
function mineAreaAsync(centerX, centerY, centerZ, radius) {
    const interactionManager = player.getInteractionManager();
    let blocksToMine = [];

    // Collect blocks to mine
    for (let x = -radius; x <= radius; x++) {
        for (let z = -radius; z <= radius; z++) {
            for (let y = -1; y <= 1; y++) {
                const worldX = centerX + x;
                const worldY = centerY + y;
                const worldZ = centerZ + z;

                const block = World.getBlock(worldX, worldY, worldZ);
                if (block && block.getId() !== "minecraft:air") {
                    blocksToMine.push({x: worldX, y: worldY, z: worldZ});
                }
            }
        }
    }

    Chat.log("Found " + blocksToMine.length + " blocks to mine");

    // Mine blocks one by one
    function mineNext() {
        if (blocksToMine.length === 0) {
            Chat.log("Mining complete!");
            return;
        }

        const block = blocksToMine.shift();
        interactionManager.setTarget(block.x, block.y, block.z);

        interactionManager.breakBlockAsync(JavaWrapper.methodToJavaAsync((result) => {
            if (result && result.getStatus() === "SUCCESS") {
                Chat.log("Mined block at " + block.x + ", " + block.y + ", " + block.z);
            }
            // Mine next block
            Time.sleep(200); // Small delay
            mineNext();
        }));
    }

    mineNext();
}
```

### Tool Usage with Hold Interact
```javascript
function useToolForDuration(ticks) {
    const interactionManager = player.getInteractionManager();

    Chat.log("Using tool for " + (ticks / 20) + " seconds");

    const remainingTicks = interactionManager.holdInteract(ticks);

    if (remainingTicks > 0) {
        Chat.log("Tool usage interrupted, " + remainingTicks + " ticks remaining");
    } else {
        Chat.log("Tool usage completed successfully");
    }
}

// Use a bow for 3 seconds (60 ticks)
useToolForDuration(60);
```

## Advanced Features

### Target Override System
The InteractionManagerHelper provides a sophisticated target override system that allows you to programmatically control what the player is targeting:

```javascript
const interactionManager = player.getInteractionManager();

// Configure target checking
interactionManager.setTargetRangeCheck(true, true);  // Check range, auto-clear if out of range
interactionManager.setTargetAirCheck(false, false);  // Don't check for air
interactionManager.setTargetShapeCheck(true, false); // Check shape, don't auto-clear

// Set target to a distant block
interactionManager.setTarget(1000, 64, 1000);

// The override will automatically handle range checking
```

### Thread Safety
All methods in InteractionManagerHelper are designed to be thread-safe and can be called from any script thread. Methods that need to execute on the main Minecraft thread will automatically handle the thread switching:

```javascript
const interactionManager = player.getInteractionManager();

// This works from any thread
interactionManager.attack(100, 64, 200, "up", true); // Will wait for main thread execution
```

## Error Handling

### Common Exceptions
- **AssertionError**: When trying to interact with self
- **InterruptedException**: When waiting operations are interrupted
- **IllegalThreadStateException**: When trying to wait on main thread
- **RuntimeException**: When interaction manager is not available

### Graceful Error Handling
```javascript
function safeInteract() {
    const interactionManager = player.getInteractionManager();

    try {
        // Try to target and break a block
        interactionManager.setTarget(100, 64, 200);
        const result = interactionManager.breakBlock();

        if (result) {
            Chat.log("Block break successful: " + result.getStatus());
        } else {
            Chat.log("Failed to break block - interaction manager unavailable");
        }

    } catch (e) {
        Chat.log("Error during interaction: " + e.message);
    } finally {
        // Always clean up
        interactionManager.clearTargetOverride();
    }
}
```

## Performance Considerations

- Use async methods (`breakBlockAsync`, `attack(..., false)`) when you don't need to wait for completion
- Set `autoUpdateBase = false` if you know the interaction manager won't change during your script
- Avoid频繁 calling `holdInteract(ticks)` with small tick values, use `holdInteract(true/false)` for continuous control
- Clear target overrides when done to restore normal gameplay behavior

## Version Information

- Available since JSMacros 1.5.0 (basic methods)
- Major updates in 1.6.0 (await parameters)
- Target override system added in 1.9.0
- Async block breaking added in 1.9.0
- Hold interact functionality added in 1.9.0

## Related Classes

- `BlockPosHelper` - Used for block position operations
- `EntityHelper` - Used for entity interactions
- `HitResultHelper` - Used for target information
- `BreakBlockResult` - Result object from block breaking operations
- `WorldHelper` - Used for world queries and block access

## Limitations

- Some operations require the player to be in the correct game mode (e.g., creative vs survival)
- Server-side validation may prevent some interactions on multiplayer servers
- Range limitations apply to all interactions based on vanilla Minecraft mechanics
- Certain blocks (like bedrock) cannot be broken regardless of the method used