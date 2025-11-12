# Player

Functions for getting and modifying the player's state, inventory, and movement. Accessible from scripts via the global `Player` variable.

## Methods
- [Player.openInventory](#playeropeninventory)
- [Player.getPlayer](#playergetplayer)
- [Player.getInteractionManager / interactions](#playergetinteractionmanager--interactions)
- [Player.getGameMode](#playergetgamemode)
- [Player.setGameMode](#playersetgamemode)
- [Player.rayTraceBlock](#playerraytraceblock)
- [Player.detailedRayTraceBlock](#playerdetailedraytraceblock)
- [Player.rayTraceEntity](#playerraytraceentity)
- [Player.writeSign](#playerwritesign)
- [Player.takeScreenshot](#playertakescreenshot)
- [Player.takePanorama](#playertakepanorama)
- [Player.getStatistics](#playergetstatistics)
- [Player.getReach](#playergetreach)
- [Player.createPlayerInput](#playercreateplayerinput)
- [Player.createPlayerInputsFromCsv](#playercreateplayerinputsfromcsv)
- [Player.createPlayerInputsFromJson](#playercreateplayerinputsfromjson)
- [Player.getCurrentPlayerInput](#playergetcurrentplayerinput)
- [Player.addInput](#playeraddinput)
- [Player.addInputs](#playeraddinputs)
- [Player.clearInputs](#playerclearinputs)
- [Player.setDrawPredictions](#playersetdrawpredictions)
- [Player.predictInput](#playerpredictinput)
- [Player.predictInputs](#playerpredictinputs)
- [Player.moveForward](#playermoveforward)
- [Player.moveBackward](#playermovebackward)
- [Player.moveStrafeLeft](#playermovestrafeleft)
- [Player.moveStrafeRight](#playermovestraferight)

### Player.openInventory
```js
const inventory = Player.openInventory();
const mainHandItem = inventory.getSlot(inventory.getSelectedHotbarSlot() + 36);
if (mainHandItem) {
    Chat.log(`Holding: ${mainHandItem.getName()}`);
}
```

**Params**
* `(none)`

**Returns**
* `Inventory`: The handler for the player's inventory.

### Player.getPlayer
```js
const player = Player.getPlayer();
const pos = player.getPos();
Chat.log(`Player is at X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}`);
```

**Params**
* `(none)`

**Returns**
* `ClientPlayerEntityHelper`: The wrapper for the player entity, providing access to its properties and methods.

### Player.getInteractionManager / interactions
```js
const interactionManager = Player.getInteractionManager();
// OR
const interactionManager = Player.interactions();

// Example: Start breaking a block
const lookingAt = Player.rayTraceBlock(5, false);
if (lookingAt) {
    interactionManager.attackBlock(lookingAt.getPos(), lookingAt.getSide());
}
```
Gets the helper for managing player interactions with the world, such as breaking blocks or attacking entities.

**Params**
* `(none)`

**Returns**
* `InteractionManagerHelper`: The interaction manager helper.

### Player.getGameMode
```js
const mode = Player.getGameMode();
Chat.log(`Current gamemode: ${mode}`); // e.g., "creative"
```

**Params**
* `(none)`

**Returns**
* `string`: The player's current gamemode as a lowercase string (e.g., "survival", "creative").

### Player.setGameMode
```js
// Requires creative mode and cheats enabled
Player.setGameMode("creative");
```

**Params**
1. `gameMode: string`: The desired gamemode. Possible values are "survival", "creative", "adventure", "spectator" (case-insensitive).

**Returns**
* `void`

### Player.rayTraceBlock
```js
const block = Player.rayTraceBlock(5, false); // 5 blocks reach, don't target fluids
if (block) {
    Chat.log(`Looking at: ${block.getId()} at ${block.getPos().toString()}`);
} else {
    Chat.log("Not looking at a block.");
}
```
Performs a ray trace from the player's camera to find the block being looked at.

**Params**
1. `distance: double`: The maximum distance to trace.
2. `fluid: boolean`: If `true`, the trace will include fluid blocks.

**Returns**
* `BlockDataHelper | null`: A helper for the targeted block, or `null` if no block is found within the distance.

### Player.detailedRayTraceBlock
```js
const result = Player.detailedRayTraceBlock(5, false);
if (result) {
    Chat.log(`Hit block at ${result.getBlockPos()} on side ${result.getSide()}`);
    Chat.log(`Exact hit coordinates: ${result.getPos()}`);
}
```
Performs a more detailed ray trace, providing precise hit coordinates and the face of the block that was hit.

**Params**
1. `distance: double`: The maximum distance to trace.
2. `fluid: boolean`: If `true`, the trace will include fluid blocks.

**Returns**
* `HitResultHelper$Block | null`: The detailed ray cast result object, or `null`.

### Player.rayTraceEntity
```js
const entity = Player.rayTraceEntity(20); // 20 block reach
if (entity) {
    Chat.log(`Looking at entity: ${entity.getName()}`);
}
```
Performs a ray trace to find the entity being looked at.

**Params**
1. `distance?: int`: The maximum distance to trace. If not provided, uses a default value.

**Returns**
* `EntityHelper<?> | null`: A helper for the targeted entity, or `null` if none is found.

#### Overloads
- `rayTraceEntity()`: **Deprecated.**
- `rayTraceEntity(distance: int)`

### Player.writeSign
```js
// This only works if the player has a sign GUI open
const success = Player.writeSign("Line 1", "Line 2", "Line 3", "Line 4");
if (success) {
    Chat.log("Sign written!");
}
```
Writes text to a sign if the sign editing screen is currently open.

**Params**
1. `l1: string`: Text for the first line.
2. `l2: string`: Text for the second line.
3. `l3: string`: Text for the third line.
4. `l4: string`: Text for the fourth line.

**Returns**
* `boolean`: `true` if the text was written successfully, `false` otherwise.

### Player.takeScreenshot
```js
const callback = JavaWrapper.methodToJava((textHelper) => {
    if (textHelper) {
        Chat.log(textHelper.getString());
    }
});

// Save to screenshots folder with a generated name
Player.takeScreenshot("screenshots", callback);

// Save to a specific subfolder and file name
Player.takeScreenshot("screenshots/custom", "my_image.png", callback);
```
Takes a screenshot and saves it to a file.

**Params**
1. `folder: string`: The folder to save the screenshot in, relative to the `minecraft` directory.
2. `file?: string`: An optional file name. If not provided, a name is generated.
3. `callback: MethodWrapper(text: TextHelper)`: A function that is called upon completion, receiving a `TextHelper` object with a message (e.g., "Saved screenshot as...").

**Returns**
* `void`

### Player.takePanorama
```js
const callback = JavaWrapper.methodToJava((textHelper) => {
    if (textHelper) {
        Chat.log(textHelper.getString());
    }
});
Player.takePanorama("panoramas", 4096, 2048, callback);
```
Takes a 360-degree panorama screenshot.

**Params**
1. `folder: string`: The folder to save the panorama to, relative to the `minecraft` directory.
2. `width: int`: The width of the final panorama image.
3. `height: int`: The height of the final panorama image.
4. `callback: MethodWrapper(text: TextHelper)`: A function called upon completion.

**Returns**
* `void`

### Player.getStatistics
```js
const stats = Player.getStatistics();
const blocksMined = stats.getStat("minecraft:mine_block", "minecraft:stone");
Chat.log(`Stone blocks mined: ${blocksMined}`);
```

**Params**
* `(none)`

**Returns**
* `StatsHelper`: A helper for querying player statistics.

### Player.getReach
```js
const reach = Player.getReach();
Chat.log(`Current reach distance: ${reach}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The current reach distance of the player.

### Player.createPlayerInput
```js
// Create an input for walking forward while looking straight ahead (yaw=0)
const forwardInput = Player.createPlayerInput(1, 0, 0);

// Create a complex input: strafing right, looking down, jumping, and sneaking
const complexInput = Player.createPlayerInput(0, -1, 0, 90, true, true, false);
```
Creates a `PlayerInput` object, which represents a single tick of player actions. These objects are used with the movement queue.

**Params**
- `movementForward: double`: `1` for forward (W), `-1` for backward (S), `0` for none.
- `movementSideways: double`: `1` for left (A), `-1` for right (D), `0` for none.
- `yaw: double`: The absolute yaw (horizontal rotation) of the player.
- `pitch: double`: The absolute pitch (vertical rotation) of the player.
- `jumping: boolean`: `true` if the jump key is pressed.
- `sneaking: boolean`: `true` if the sneak key is pressed.
- `sprinting: boolean`: `true` if the sprint key is pressed.

**Returns**
* `PlayerInput`: The new player input object.

### Player.createPlayerInputsFromCsv
```js
const csvData = `yaw,pitch,movementForward
0,0,1
45,0,1
90,0,1`;
const inputs = Player.createPlayerInputsFromCsv(csvData);
Player.addInputs(inputs);
```
Parses a CSV string into a list of `PlayerInput` objects. The header row is required and case-sensitive.

**Params**
1. `csv: string`: The CSV data to parse.

**Returns**
* `java.util.List<PlayerInput>`: A list of parsed player inputs.

### Player.createPlayerInputsFromJson
```js
const jsonData = `[
    {"yaw": 0, "pitch": 0, "movementForward": 1},
    {"yaw": 45, "pitch": 0, "movementForward": 1},
    {"yaw": 90, "pitch": 0, "movementForward": 1}
]`;
const inputs = Player.createPlayerInputsFromJson(jsonData);
Player.addInputs(inputs);
```
Parses a JSON string (representing an array of input objects) into a list of `PlayerInput` objects.

**Params**
1. `json: string`: The JSON data to parse.

**Returns**
* `java.util.List<PlayerInput>`: A list of parsed player inputs.

### Player.getCurrentPlayerInput
```js
const currentInput = Player.getCurrentPlayerInput();
Chat.log(`Currently sprinting: ${currentInput.isSprinting()}`);
```

**Params**
* `(none)`

**Returns**
* `PlayerInput`: A new `PlayerInput` object representing the player's current actions.

### Player.addInput
```js
const player = Player.getPlayer();
const input = Player.createPlayerInput(1, player.getYaw(), true, false); // Forward, jump
Player.addInput(input);
```
Adds a single `PlayerInput` to the movement queue to be executed on the next tick.

**Params**
1. `input: PlayerInput`: The input to add to the queue.

**Returns**
* `void`

### Player.addInputs
```js
const inputs = [];
for (let i = 0; i < 10; i++) {
    inputs.push(Player.createPlayerInput(1, 0, 0)); // Walk forward for 10 ticks
}
Player.addInputs(inputs);
```
Adds an array or list of `PlayerInput` objects to the movement queue.

**Params**
1. `inputs: PlayerInput[]`: The inputs to add to the queue.

**Returns**
* `void`

### Player.clearInputs
```js
Player.clearInputs();
```
Clears all pending inputs from the movement queue.

**Params**
* `(none)`

**Returns**
* `void`

### Player.setDrawPredictions
```js
// Enable visualization for movement predictions
Player.setDrawPredictions(true);
```

**Params**
1. `val: boolean`: `true` to enable drawing, `false` to disable.

**Returns**
* `void`

### Player.predictInput
```js
const currentInput = Player.getCurrentPlayerInput();
const nextPos = Player.predictInput(currentInput, true); // Predict and draw
Chat.log(`Next tick's position will be: ${nextPos}`);
```
Predicts the player's position after one tick of a given input.

**Params**
1. `input: PlayerInput`: The input for the prediction.
2. `draw?: boolean = false`: If `true`, visualizes the predicted path.

**Returns**
* `Pos3D`: The predicted position after the input.

### Player.predictInputs
```js
const inputs = [];
for (let i = 0; i < 20; i++) {
    inputs.push(Player.createPlayerInput(1, 0, 0)); // Walk forward for 20 ticks
}
const path = Player.predictInputs(inputs, true); // Predict and draw the path
```
Predicts the player's path over a series of inputs.

**Params**
1. `inputs: PlayerInput[]`: The sequence of inputs for the prediction.
2. `draw?: boolean = false`: If `true`, visualizes the predicted path.

**Returns**
* `java.util.List<Pos3D>`: A list of positions, one for each input tick.

### Player.moveForward
```js
// Turn the player 45 degrees to the right and walk forward for one tick
Player.moveForward(45);
```
Adds a one-tick forward movement to the queue with a relative yaw change.

**Params**
1. `yaw: double`: The relative yaw change to apply before moving.

**Returns**
* `void`

### Player.moveBackward
```js
// Turn 180 degrees and walk "forward" (effectively walking backward)
Player.moveBackward(180);
```
Adds a one-tick backward movement to the queue with a relative yaw change.

**Params**
1. `yaw: double`: The relative yaw change to apply before moving.

**Returns**
* `void`

### Player.moveStrafeLeft
```js
// Turn 90 degrees left and walk "forward" (effectively strafing left)
Player.moveStrafeLeft(-90);
```
Adds a one-tick leftward strafe to the queue with a relative yaw change.

**Params**
1. `yaw: double`: The relative yaw change to apply before moving.

**Returns**
* `void`

### Player.moveStrafeRight
```js
// Turn 90 degrees right and walk "forward" (effectively strafing right)
Player.moveStrafeRight(90);
```
Adds a one-tick rightward strafe to the queue with a relative yaw change.

**Params**
1. `yaw: double`: The relative yaw change to apply before moving.

**Returns**
* `void`