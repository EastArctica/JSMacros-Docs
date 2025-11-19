# PlayerInput

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.PlayerInput`

**Since:** JsMacros 1.4.0

The `PlayerInput` class represents all possible player inputs in Minecraft, combining movement, rotation, and action states into a single object. This class is particularly useful for recording, replicating, and analyzing player movement patterns, creating automated movement sequences, and managing complex input states for bot development and movement automation.

PlayerInput objects are commonly used in conjunction with input recording systems, bot movement, animation playback, and movement prediction. They provide a standardized way to represent the complete input state of a player at any given moment, making it possible to save, replay, and analyze player behavior.

## Overview

The `PlayerInput` class provides comprehensive input management capabilities:

- **Movement Control**: Forward/backward and sideways movement inputs
- **Camera Control**: Yaw and pitch rotation for player camera
- **Action States**: Jumping, sneaking, and sprinting states
- **Serialization**: CSV and JSON format support for saving and loading
- **Cloning**: Safe object duplication for state management
- **Integration**: Works with Player library methods for execution

## Table of Contents

- [Constructors](#constructors)
- [Static Methods](#static-methods)
- [Instance Methods](#instance-methods)
- [Fields](#fields)
- [Usage Examples](#usage-examples)

## Constructors

### new PlayerInput()
```js
const input = new PlayerInput();
// Creates empty input: movementForward=0, movementSideways=0, yaw=0, pitch=0, jumping=false, sneaking=false, sprinting=false
```

Creates a new PlayerInput object with all values set to their default states (0 for movement/rotation, false for actions).

**Since:** `1.4.0`

### new PlayerInput(movementForward, movementSideways, yaw, pitch, jumping, sneaking, sprinting)
```js
const input = new PlayerInput(1.0, 0.0, 90.0, 0.0, false, false, true);
// Creates input for moving forward with sprinting
```

Creates a new PlayerInput object with all parameters specified.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| movementForward | float | Forward movement input: 1 = forward (W), 0 = no input, -1 = backward (S) |
| movementSideways | float | Sideways movement input: 1 = left (A), 0 = no input, -1 = right (D) |
| yaw | float | Player's yaw rotation (horizontal rotation, 0-360°) |
| pitch | float | Player's pitch rotation (vertical rotation, -90 to 90°) |
| jumping | boolean | Jump input state (spacebar) |
| sneaking | boolean | Sneak input state (shift) |
| sprinting | boolean | Sprint input state (Ctrl/Cmd) |

**Since:** `1.4.0`

### new PlayerInput(movementForward, movementSideways, yaw)
```js
const input = new PlayerInput(1.0, 0.0, 45.0);
// Forward movement looking northeast, other inputs default to false/0
```

Creates a new PlayerInput object with movement and rotation specified, other inputs default to false.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| movementForward | float | Forward movement input: 1 = forward (W), 0 = no input, -1 = backward (S) |
| movementSideways | float | Sideways movement input: 1 = left (A), 0 = no input, -1 = right (D) |
| yaw | float | Player's yaw rotation (horizontal rotation) |

**Since:** `1.4.0`

### new PlayerInput(movementForward, yaw, jumping, sprinting)
```js
const input = new PlayerInput(1.0, 90.0, true, false);
// Forward movement while jumping, looking east, not sprinting
```

Creates a new PlayerInput object with simplified parameters for common movement scenarios.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| movementForward | float | Forward movement input: 1 = forward (W), 0 = no input, -1 = backward (S) |
| yaw | float | Player's yaw rotation (horizontal rotation) |
| jumping | boolean | Jump input state |
| sprinting | boolean | Sprint input state |

**Since:** `1.4.0`

### new PlayerInput(input, yaw, pitch, sprinting)
```js
const minecraftInput = //... obtained from somewhere
const playerInput = new PlayerInput(minecraftInput, player.getYaw(), player.getPitch(), true);
```

Creates a new PlayerInput object from a Minecraft Input object with additional parameters.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| input | Input | Minecraft Input object to convert |
| yaw | float | Player's yaw rotation |
| pitch | float | Player's pitch rotation |
| sprinting | boolean | Sprint input state |

**Since:** `1.4.0`

### new PlayerInput(input)
```js
const originalInput = new PlayerInput(1.0, 0.0, 90.0, 0.0, false, false, true);
const clonedInput = new PlayerInput(originalInput);
// Creates an exact copy of originalInput
```

Creates a clone of an existing PlayerInput object.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| input | PlayerInput | The PlayerInput object to clone |

**Since:** `1.4.0`

---

## Static Methods

## Instance Methods

## Fields

## Usage Examples

### Recording and Playing Back Player Movement
```js
// Simple movement recorder
class MovementRecorder {
    constructor() {
        this.recordings = [];
        this.isRecording = false;
        this.startTime = 0;
    }

    startRecording() {
        this.recordings = [];
        this.isRecording = true;
        this.startTime = Client.getTime();
        Chat.log("Started recording player movement");
    }

    stopRecording() {
        this.isRecording = false;
        Chat.log(`Stopped recording. Captured ${this.recordings.length} input frames`);
    }

    recordFrame() {
        if (!this.isRecording) return;

        const player = Player.getPlayer();
        if (!player) return;

        const currentInput = Player.getCurrentPlayerInput();
        this.recordings.push({
            time: Client.getTime() - this.startTime,
            input: currentInput.clone()
        });
    }

    exportToCsv() {
        if (this.recordings.length === 0) return "";

        let csv = "time,movementForward,movementSideways,yaw,pitch,jumping,sneaking,sprinting\n";

        this.recordings.forEach(frame => {
            const input = frame.input;
            csv += `${frame.time},${input.movementForward},${input.movementSideways},${input.yaw},${input.pitch},${input.jumping},${input.sneaking},${input.sprinting}\n`;
        });

        return csv;
    }

    playBack() {
        if (this.recordings.length === 0) {
            Chat.log("No recording to play back");
            return;
        }

        Chat.log("Starting playback");
        let currentIndex = 0;

        const playbackListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            if (currentIndex >= this.recordings.length) {
                Chat.log("Playback completed");
                JsMacros.off(playbackListener);
                return;
            }

            const frame = this.recordings[currentIndex];
            Player.setPlayerInput(frame.input);

            // Calculate next frame based on timing
            const nextFrame = this.recordings[currentIndex + 1];
            if (nextFrame) {
                const delay = nextFrame.time - frame.time;
                if (delay > 0) {
                    Client.wait(delay * 50); // Convert to milliseconds (20 ticks = 1000ms)
                }
            }

            currentIndex++;
        }));
    }
}

const recorder = new MovementRecorder();

// Example usage
recorder.startRecording();

// Record for 5 seconds
JsMacros.once("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 100 === 0) { // Every 5 seconds
        recorder.stopRecording();

        // Export and log the recording
        const csvData = recorder.exportToCsv();
        Chat.log("Recording data:");
        Chat.log(csvData);

        // Play it back
        setTimeout(() => {
            recorder.playBack();
        }, 1000);
    }
}));

// Record every tick while recording is active
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    recorder.recordFrame();
}));
```

### Creating Complex Movement Patterns
```js
// Function to create smooth circular movement
function createCircularMovement(centerX, centerZ, radius, duration) {
    const frames = [];
    const ticks = duration * 20; // Convert seconds to ticks

    for (let i = 0; i <= ticks; i++) {
        const angle = (i / ticks) * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * radius;
        const z = centerZ + Math.sin(angle) * radius;

        // Calculate movement direction
        const nextAngle = ((i + 1) / ticks) * 2 * Math.PI;
        const nextX = centerX + Math.cos(nextAngle) * radius;
        const nextZ = centerZ + Math.sin(nextAngle) * radius;

        // Movement vector
        const moveX = nextX - x;
        const moveZ = nextZ - z;

        // Convert to forward/sideways input
        const yaw = Math.atan2(moveZ, moveX) * 180 / Math.PI + 90;
        const movementForward = Math.sqrt(moveX * moveX + moveZ * moveZ) * 10;

        frames.push(new PlayerInput(
            Math.min(movementForward, 1.0),
            0.0,
            yaw,
            0.0,
            false,
            false,
            true
        ));
    }

    return frames;
}

// Create and execute circular movement
const player = Player.getPlayer();
if (player) {
    const startPos = player.getPos();
    const circularFrames = createCircularMovement(startPos.x, startPos.z, 10, 10);

    Chat.log(`Created ${circularFrames.length} frames for circular movement`);

    // Execute the movement
    let frameIndex = 0;
    const movementListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        if (frameIndex >= circularFrames.length) {
            Chat.log("Circular movement completed");
            JsMacros.off(movementListener);
            return;
        }

        Player.setPlayerInput(circularFrames[frameIndex]);
        frameIndex++;
    }));
}
```

### Input Analysis and Debugging
```js
// Analyze player input patterns
function analyzePlayerInput() {
    const history = [];
    const maxHistory = 100; // Keep last 100 frames

    JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        const player = Player.getPlayer();
        if (!player) return;

        const currentInput = Player.getCurrentPlayerInput();
        const frame = {
            time: Client.getTime(),
            input: currentInput.clone(),
            pos: player.getPos(),
            health: player.getHealth()
        };

        history.push(frame);

        // Keep only recent history
        if (history.length > maxHistory) {
            history.shift();
        }

        // Analyze patterns every second
        if (Client.getTime() % 20 === 0 && history.length >= 20) {
            analyzePatterns(history);
        }
    }));
}

function analyzePatterns(history) {
    const recent = history.slice(-20); // Last second (20 ticks)

    // Movement analysis
    let totalMovement = 0;
    let jumpingCount = 0;
    let sprintingCount = 0;
    let sneakingCount = 0;

    recent.forEach(frame => {
        const movement = Math.sqrt(
            frame.input.movementForward * frame.input.movementForward +
            frame.input.movementSideways * frame.input.movementSideways
        );
        totalMovement += movement;

        if (frame.input.jumping) jumpingCount++;
        if (frame.input.sprinting) sprintingCount++;
        if (frame.input.sneaking) sneakingCount++;
    });

    const avgMovement = totalMovement / recent.length;

    // Position analysis
    const startPos = recent[0].pos;
    const endPos = recent[recent.length - 1].pos;
    const distance = startPos.distanceTo(endPos);

    // Report findings
    Chat.log(`=== Input Analysis (Last Second) ===`);
    Chat.log(`Average movement: ${avgMovement.toFixed(2)}`);
    Chat.log(`Distance traveled: ${distance.toFixed(2)} blocks`);
    Chat.log(`Jumping: ${(jumpingCount / recent.length * 100).toFixed(0)}% of time`);
    Chat.log(`Sprinting: ${(sprintingCount / recent.length * 100).toFixed(0)}% of time`);
    Chat.log(`Sneaking: ${(sneakingCount / recent.length * 100).toFixed(0)}% of time`);

    // Detect unusual patterns
    if (avgMovement > 0.8) {
        Chat.log("&eHigh movement activity detected");
    }

    if (jumpingCount > 10) {
        Chat.log("&eFrequent jumping detected");
    }

    if (distance > 15) {
        Chat.log("&eHigh speed movement detected (possible flying/speed hacks)");
    }
}

analyzePlayerInput();
```

### Input Recording to File and Loading
```js
// File-based input recording system
class FileInputRecorder {
    constructor(filename) {
        this.filename = filename;
        this.frames = [];
        this.isRecording = false;
    }

    startRecording() {
        this.frames = [];
        this.isRecording = true;
        Chat.log(`Started recording to ${this.filename}`);
    }

    stopRecording() {
        this.isRecording = false;

        // Save to file
        const csvData = this.toCsv();
        // Note: File writing would be handled through appropriate file APIs
        Chat.log(`Stopped recording. Saved ${this.frames.length} frames to ${this.filename}`);

        return csvData;
    }

    recordFrame() {
        if (!this.isRecording) return;

        const currentInput = Player.getCurrentPlayerInput();
        this.frames.push({
            time: Client.getTime(),
            input: currentInput.clone()
        });
    }

    toCsv() {
        let csv = "time,movementForward,movementSideways,yaw,pitch,jumping,sneaking,sprinting\n";

        this.frames.forEach(frame => {
            const input = frame.input;
            csv += `${frame.time},${input.movementForward},${input.movementSideways},${input.yaw},${input.pitch},${input.jumping},${input.sneaking},${input.sprinting}\n`;
        });

        return csv;
    }

    static fromCsv(csvData) {
        const lines = csvData.trim().split('\n');
        const header = lines[0].split(',');
        const recorder = new FileInputRecorder("loaded_recording");

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const frameData = {};

            header.forEach((key, index) => {
                if (key === 'time') {
                    frameData[key] = parseInt(values[index]);
                } else if (key === 'jumping' || key === 'sneaking' || key === 'sprinting') {
                    frameData[key] = values[index] === 'true';
                } else {
                    frameData[key] = parseFloat(values[index]);
                }
            });

            // Reconstruct PlayerInput
            const input = new PlayerInput(
                frameData.movementForward,
                frameData.movementSideways,
                frameData.yaw,
                frameData.pitch,
                frameData.jumping,
                frameData.sneaking,
                frameData.sprinting
            );

            recorder.frames.push({
                time: frameData.time,
                input: input
            });
        }

        return recorder;
    }
}

// Example usage
const recorder = new FileInputRecorder("my_movement.csv");

// Recording controls
function startRecording() {
    recorder.startRecording();

    // Record every tick
    const recordListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        recorder.recordFrame();
    }));

    // Auto-stop after 10 seconds
    setTimeout(() => {
        const csvData = recorder.stopRecording();
        Chat.log("Recording data:");
        Chat.log(csvData);

        // Demonstrate loading back
        const loadedRecorder = FileInputRecorder.fromCsv(csvData);
        Chat.log(`Loaded ${loadedRecorder.frames.length} frames from CSV`);

        JsMacros.off(recordListener);
    }, 10000);
}
```

### JSON-based Input Configuration
```js
// Load movement patterns from JSON configuration
const movementConfigs = {
    "walkStraight": {
        "movementForward": 1.0,
        "movementSideways": 0.0,
        "yaw": 0.0,
        "pitch": 0.0,
        "jumping": false,
        "sneaking": false,
        "sprinting": false
    },
    "sprintForward": {
        "movementForward": 1.0,
        "movementSideways": 0.0,
        "yaw": 0.0,
        "pitch": 0.0,
        "jumping": false,
        "sneaking": false,
        "sprinting": true
    },
    "jumpAndMove": {
        "movementForward": 0.5,
        "movementSideways": 0.0,
        "yaw": 45.0,
        "pitch": -10.0,
        "jumping": true,
        "sneaking": false,
        "sprinting": false
    },
    "sneakSlowly": {
        "movementForward": 0.3,
        "movementSideways": 0.0,
        "yaw": 180.0,
        "pitch": 0.0,
        "jumping": false,
        "sneaking": true,
        "sprinting": false
    }
};

// Function to apply movement config
function applyMovementConfig(configName, duration) {
    const config = movementConfigs[configName];
    if (!config) {
        Chat.log(`Unknown movement config: ${configName}`);
        return;
    }

    const jsonConfig = JSON.stringify(config);
    const input = PlayerInput.fromJson(jsonConfig);

    Chat.log(`Applying movement config: ${configName} for ${duration} seconds`);

    let ticksRemaining = duration * 20;
    const configListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        if (ticksRemaining <= 0) {
            Chat.log(`Finished movement config: ${configName}`);
            JsMacros.off(configListener);
            return;
        }

        Player.setPlayerInput(input);
        ticksRemaining--;
    }));
}

// Execute sequence of movements
function executeMovementSequence() {
    const sequence = [
        { config: "walkStraight", duration: 2 },
        { config: "sprintForward", duration: 3 },
        { config: "jumpAndMove", duration: 1 },
        { config: "sneakSlowly", duration: 2 }
    ];

    let sequenceIndex = 0;

    function executeNext() {
        if (sequenceIndex >= sequence.length) {
            Chat.log("Movement sequence completed");
            return;
        }

        const step = sequence[sequenceIndex];
        applyMovementConfig(step.config, step.duration);

        sequenceIndex++;
        setTimeout(executeNext, step.duration * 1000);
    }

    executeNext();
}

// Example usage
executeMovementSequence();
```

### Complex Movement Pattern Generation
```js
// Generate complex movement patterns
class MovementPatternGenerator {
    // Create circular movement
    static createCircle(centerX, centerZ, radius, duration, clockwise = true) {
        const frames = [];
        const ticks = duration * 20;

        for (let i = 0; i <= ticks; i++) {
            const progress = i / ticks;
            const angle = progress * 2 * Math.PI * (clockwise ? 1 : -1);

            const x = centerX + Math.cos(angle) * radius;
            const z = centerZ + Math.sin(angle) * radius;

            // Calculate movement direction (tangent to circle)
            const nextAngle = ((i + 1) / ticks) * 2 * Math.PI * (clockwise ? 1 : -1);
            const nextX = centerX + Math.cos(nextAngle) * radius;
            const nextZ = centerZ + Math.sin(nextAngle) * radius;

            // Movement vector
            const moveX = nextX - x;
            const moveZ = nextZ - z;

            // Convert to forward/sideways input
            const yaw = Math.atan2(moveZ, moveX) * 180 / Math.PI + 90;
            const movementForward = Math.min(Math.sqrt(moveX * moveX + moveZ * moveZ) * 8, 1.0);

            frames.push(new PlayerInput(
                movementForward,
                0.0,
                yaw,
                0.0,
                false,
                false,
                true
            ));
        }

        return frames;
    }

    // Create figure-8 movement
    static createFigure8(centerX, centerZ, sizeX, sizeZ, duration) {
        const frames = [];
        const ticks = duration * 20;

        for (let i = 0; i <= ticks; i++) {
            const t = (i / ticks) * 2 * Math.PI;

            // Figure-8 parametric equations
            const x = centerX + sizeX * Math.sin(t);
            const z = centerZ + sizeZ * Math.sin(2 * t) / 2;

            // Calculate velocity
            const nextT = ((i + 1) / ticks) * 2 * Math.PI;
            const nextX = centerX + sizeX * Math.sin(nextT);
            const nextZ = centerZ + sizeZ * Math.sin(2 * nextT) / 2;

            const moveX = nextX - x;
            const moveZ = nextZ - z;

            const yaw = Math.atan2(moveZ, moveX) * 180 / Math.PI + 90;
            const movementForward = Math.min(Math.sqrt(moveX * moveX + moveZ * moveZ) * 8, 1.0);

            frames.push(new PlayerInput(
                movementForward,
                0.0,
                yaw,
                0.0,
                false,
                false,
                true
            ));
        }

        return frames;
    }

    // Create spiral movement
    static createSpiral(centerX, centerZ, startRadius, endRadius, duration, clockwise = true) {
        const frames = [];
        const ticks = duration * 20;

        for (let i = 0; i <= ticks; i++) {
            const progress = i / ticks;
            const angle = progress * 4 * Math.PI * (clockwise ? 1 : -1);
            const radius = startRadius + (endRadius - startRadius) * progress;

            const x = centerX + Math.cos(angle) * radius;
            const z = centerZ + Math.sin(angle) * radius;

            // Calculate movement direction
            const nextAngle = ((i + 1) / ticks) * 4 * Math.PI * (clockwise ? 1 : -1);
            const nextRadius = startRadius + (endRadius - startRadius) * ((i + 1) / ticks);
            const nextX = centerX + Math.cos(nextAngle) * nextRadius;
            const nextZ = centerZ + Math.sin(nextAngle) * nextRadius;

            const moveX = nextX - x;
            const moveZ = nextZ - z;

            const yaw = Math.atan2(moveZ, moveX) * 180 / Math.PI + 90;
            const movementForward = Math.min(Math.sqrt(moveX * moveX + moveZ * moveZ) * 6, 1.0);

            frames.push(new PlayerInput(
                movementForward,
                0.0,
                yaw,
                0.0,
                false,
                false,
                true
            ));
        }

        return frames;
    }
}

// Example usage
const player = Player.getPlayer();
if (player) {
    const startPos = player.getPos();

    // Execute circular movement
    const circleFrames = MovementPatternGenerator.createCircle(startPos.x, startPos.z, 10, 5);
    Chat.log(`Created ${circleFrames.length} frames for circular movement`);

    // Execute pattern
    let frameIndex = 0;
    const movementListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
        if (frameIndex >= circleFrames.length) {
            Chat.log("Circular movement completed");
            JsMacros.off(movementListener);
            return;
        }

        Player.addInput(circleFrames[frameIndex]);
        frameIndex++;
    }));
}
```

### Input Analysis and Pattern Detection
```js
// Analyze player input patterns and detect unusual behavior
class InputAnalyzer {
    constructor() {
        this.history = [];
        this.maxHistory = 200; // Keep last 10 seconds (200 ticks)
        this.alerts = [];
    }

    recordFrame() {
        const player = Player.getPlayer();
        if (!player) return;

        const currentInput = Player.getCurrentPlayerInput();
        const frame = {
            time: Client.getTime(),
            input: currentInput.clone(),
            pos: player.getPos(),
            health: player.getHealth(),
            velocity: player.getVelocity()
        };

        this.history.push(frame);

        // Keep only recent history
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        // Analyze every second
        if (Client.getTime() % 20 === 0 && this.history.length >= 20) {
            this.analyzePatterns();
        }
    }

    analyzePatterns() {
        const recent = this.history.slice(-20); // Last second
        const alerts = [];

        // Movement analysis
        let totalMovement = 0;
        let jumpingCount = 0;
        let sprintingCount = 0;
        let sneakingCount = 0;
        let directionChanges = 0;

        let lastYaw = recent[0].input.yaw;

        recent.forEach((frame, index) => {
            const movement = Math.sqrt(
                frame.input.movementForward * frame.input.movementForward +
                frame.input.movementSideways * frame.input.movementSideways
            );
            totalMovement += movement;

            if (frame.input.jumping) jumpingCount++;
            if (frame.input.sprinting) sprintingCount++;
            if (frame.input.sneaking) sneakingCount++;

            // Detect direction changes
            if (index > 0 && Math.abs(frame.input.yaw - lastYaw) > 45) {
                directionChanges++;
            }
            lastYaw = frame.input.yaw;
        });

        const avgMovement = totalMovement / recent.length;

        // Position analysis
        const startPos = recent[0].pos;
        const endPos = recent[recent.length - 1].pos;
        const distance = startPos.distanceTo(endPos);
        const avgSpeed = distance * 20; // blocks per second

        // Velocity analysis
        const velocities = recent.map(f => f.velocity);
        const maxVelocity = Math.max(...velocities.map(v => Math.sqrt(v.x * v.x + v.z * v.z)));

        // Detect anomalies
        if (avgMovement > 0.9) {
            alerts.push("High movement activity detected");
        }

        if (jumpingCount > 15) {
            alerts.push("Excessive jumping detected (possible bunny hopping)");
        }

        if (avgSpeed > 8.0) {
            alerts.push("High speed movement detected (possible speed hacks)");
        }

        if (maxVelocity > 10.0) {
            alerts.push("Extreme velocity detected (possible flight/cheats)");
        }

        if (directionChanges > 10) {
            alerts.push("Frequent direction changes (possible aimbot or jitter clicking)");
        }

        if (sprintingCount > 18 && sneakingCount > 2) {
            alerts.push("Conflicting sprint/sneak input detected");
        }

        // Report findings
        if (alerts.length > 0 || Client.getTime() % 100 === 0) { // Report every 5 seconds or if alerts
            Chat.log(`=== Input Analysis (${new Date().toLocaleTimeString()}) ===`);
            Chat.log(`Avg Movement: ${avgMovement.toFixed(2)}`);
            Chat.log(`Speed: ${avgSpeed.toFixed(2)} b/s`);
            Chat.log(`Direction Changes: ${directionChanges}`);
            Chat.log(`Jump: ${(jumpingCount / recent.length * 100).toFixed(0)}%`);
            Chat.log(`Sprint: ${(sprintingCount / recent.length * 100).toFixed(0)}%`);
            Chat.log(`Sneak: ${(sneakingCount / recent.length * 100).toFixed(0)}%`);

            if (alerts.length > 0) {
                Chat.log("&c⚠ ALERTS:");
                alerts.forEach(alert => Chat.log(`&c  - ${alert}`));
            }
        }
    }
}

const analyzer = new InputAnalyzer();

// Start analysis
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    analyzer.recordFrame();
}));
```

### JSON Configuration System
```js
// Advanced movement configuration system
class MovementConfigManager {
    constructor() {
        this.configs = new Map();
        this.loadDefaultConfigs();
    }

    loadDefaultConfigs() {
        // Basic movements
        this.addConfig("walk", {
            movementForward: 1.0,
            movementSideways: 0.0,
            yaw: 0.0,
            pitch: 0.0,
            jumping: false,
            sneaking: false,
            sprinting: false,
            description: "Normal walking forward"
        });

        this.addConfig("sprint", {
            movementForward: 1.0,
            movementSideways: 0.0,
            yaw: 0.0,
            pitch: 0.0,
            jumping: false,
            sneaking: false,
            sprinting: true,
            description: "Sprinting forward"
        });

        this.addConfig("sneak", {
            movementForward: 0.3,
            movementSideways: 0.0,
            yaw: 0.0,
            pitch: 0.0,
            jumping: false,
            sneaking: true,
            sprinting: false,
            description: "Slow sneaking movement"
        });

        // Combat movements
        this.addConfig("strafe_left", {
            movementForward: 0.0,
            movementSideways: 1.0,
            yaw: 0.0,
            pitch: 0.0,
            jumping: false,
            sneaking: false,
            sprinting: true,
            description: "Strafe left while sprinting"
        });

        this.addConfig("strafe_right", {
            movementForward: 0.0,
            movementSideways: -1.0,
            yaw: 0.0,
            pitch: 0.0,
            jumping: false,
            sneaking: false,
            sprinting: true,
            description: "Strafe right while sprinting"
        });

        this.addConfig("backpedal", {
            movementForward: -1.0,
            movementSideways: 0.0,
            yaw: 0.0,
            pitch: 0.0,
            jumping: false,
            sneaking: false,
            sprinting: false,
            description: "Move backward carefully"
        });

        // Parkour movements
        this.addConfig("jump_sprint", {
            movementForward: 1.0,
            movementSideways: 0.0,
            yaw: 0.0,
            pitch: -10.0,
            jumping: true,
            sneaking: false,
            sprinting: true,
            description: "Jump while sprinting forward"
        });
    }

    addConfig(name, config) {
        this.configs.set(name, { ...config, name });
    }

    getConfig(name) {
        return this.configs.get(name);
    }

    listConfigs() {
        return Array.from(this.configs.values());
    }

    createInput(name, yaw = null, pitch = null) {
        const config = this.getConfig(name);
        if (!config) {
            throw new Error(`Unknown movement config: ${name}`);
        }

        const input = PlayerInput.fromJson(JSON.stringify(config));

        // Override yaw/pitch if provided
        if (yaw !== null) input.yaw = yaw;
        if (pitch !== null) input.pitch = pitch;

        return input;
    }

    executeConfig(name, duration, yaw = null, pitch = null) {
        const input = this.createInput(name, yaw, pitch);
        const config = this.getConfig(name);

        Chat.log(`Executing "${config.description}" for ${duration}s`);

        let ticksRemaining = duration * 20;
        const configListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            if (ticksRemaining <= 0) {
                Chat.log(`Finished: ${config.description}`);
                JsMacros.off(configListener);
                return;
            }

            Player.addInput(input);
            ticksRemaining--;
        }));

        return configListener;
    }

    executeSequence(sequence) {
        let sequenceIndex = 0;

        const executeNext = () => {
            if (sequenceIndex >= sequence.length) {
                Chat.log("Movement sequence completed");
                return;
            }

            const step = sequence[sequenceIndex];
            const listener = this.executeConfig(step.config, step.duration, step.yaw, step.pitch);

            sequenceIndex++;
            setTimeout(() => {
                JsMacros.off(listener);
                executeNext();
            }, step.duration * 1000);
        };

        executeNext();
    }
}

const configManager = new MovementConfigManager();

// Example usage
Chat.log("=== Available Movement Configs ===");
configManager.listConfigs().forEach(config => {
    Chat.log(`${config.name}: ${config.description}`);
});

// Execute combat sequence
configManager.executeSequence([
    { config: "sprint", duration: 2, yaw: 0 },
    { config: "strafe_left", duration: 1, yaw: 0 },
    { config: "strafe_right", duration: 1, yaw: 0 },
    { config: "jump_sprint", duration: 0.5, yaw: 0 },
    { config: "sprint", duration: 2, yaw: 180 }
]);
```

### Enhanced CSV Data Analysis
```js
// Advanced CSV recording and analysis with environmental context
class EnhancedInputRecorder {
    constructor() {
        this.data = [];
        this.recording = false;
    }

    startRecording() {
        this.data = [];
        this.recording = true;
        this.startTime = Client.getTime();
        Chat.log("Enhanced input recording started");
    }

    stopRecording() {
        this.recording = false;
        const duration = (Client.getTime() - this.startTime) / 20;
        Chat.log(`Recording stopped: ${this.data.length} frames over ${duration.toFixed(1)}s`);
        return this.analyzeData();
    }

    recordFrame() {
        if (!this.recording) return;

        const player = Player.getPlayer();
        if (!player) return;

        const input = Player.getCurrentPlayerInput();
        const record = {
            timestamp: Date.now(),
            tick: Client.getTime(),
            input: input.clone(),
            position: player.getPos(),
            health: player.getHealth(),
            food: player.getFoodLevel(),
            biome: player.getBiome(),
            onGround: player.isOnGround(),
            inWater: player.isInWater(),
            inLava: player.isInLava(),
            daytime: World.getTime() % 24000
        };

        this.data.push(record);
    }

    exportToEnhancedCsv() {
        if (this.data.length === 0) return "";

        let csv = "timestamp,tick,movementForward,movementSideways,yaw,pitch,jumping,sneaking,sprinting,";
        csv += "posX,posY,posZ,health,food,biome,onGround,inWater,inLava,daytime\n";

        this.data.forEach(record => {
            const i = record.input;
            const p = record.position;
            csv += `${record.timestamp},${record.tick},`;
            csv += `${i.movementForward},${i.movementSideways},${i.yaw},${i.pitch},`;
            csv += `${i.jumping},${i.sneaking},${i.sprinting},`;
            csv += `${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)},`;
            csv += `${record.health},${record.food},${record.biome},${record.onGround},${record.inWater},${record.inLava},${record.daytime}\n`;
        });

        return csv;
    }

    analyzeData() {
        if (this.data.length < 2) return {};

        const analysis = {
            summary: {
                duration: (this.data[this.data.length - 1].tick - this.data[0].tick) / 20,
                totalFrames: this.data.length,
                distanceTraveled: 0,
                avgSpeed: 0
            },
            movement: {
                avgForward: 0,
                avgSideways: 0,
                maxForward: 0,
                maxSideways: 0
            },
            actions: {
                jumpCount: 0,
                sprintPercent: 0,
                sneakPercent: 0,
                jumpPercent: 0
            },
            environment: {
                biomes: new Map(),
                groundTime: 0,
                waterTime: 0,
                lavaTime: 0,
                avgHealth: 0,
                healthLoss: 0
            },
            patterns: {
                directionChanges: 0,
                avgRotation: 0,
                peakSpeeds: []
            }
        };

        let lastPos = this.data[0].position;
        let lastYaw = this.data[0].input.yaw;
        let maxInstantSpeed = 0;

        this.data.forEach((record, index) => {
            const i = record.input;
            const p = record.position;

            // Movement analysis
            analysis.movement.avgForward += i.movementForward;
            analysis.movement.avgSideways += i.movementSideways;
            analysis.movement.maxForward = Math.max(analysis.movement.maxForward, Math.abs(i.movementForward));
            analysis.movement.maxSideways = Math.max(analysis.movement.maxSideways, Math.abs(i.movementSideways));

            // Distance and speed
            if (index > 0) {
                const distance = p.distanceTo(lastPos);
                analysis.summary.distanceTraveled += distance;

                const instantSpeed = distance * 20; // blocks per second
                maxInstantSpeed = Math.max(maxInstantSpeed, instantSpeed);

                if (instantSpeed > 5) {
                    analysis.patterns.peakSpeeds.push({
                        tick: record.tick,
                        speed: instantSpeed,
                        position: p
                    });
                }
            }
            lastPos = p;

            // Actions
            if (i.jumping) analysis.actions.jumpCount++;
            if (i.sprinting) analysis.actions.sprintPercent++;
            if (i.sneaking) analysis.actions.sneakPercent++;

            // Environment
            analysis.environment.avgHealth += record.health;
            if (record.onGround) analysis.environment.groundTime++;
            if (record.inWater) analysis.environment.waterTime++;
            if (record.inLava) analysis.environment.lavaTime++;

            const biomeName = record.biome;
            analysis.environment.biomes.set(biomeName, (analysis.environment.biomes.get(biomeName) || 0) + 1);

            // Pattern analysis
            if (Math.abs(i.yaw - lastYaw) > 30) {
                analysis.patterns.directionChanges++;
            }
            analysis.patterns.avgRotation += Math.abs(i.yaw - lastYaw);
            lastYaw = i.yaw;
        });

        // Finalize calculations
        const frameCount = this.data.length;
        analysis.movement.avgForward /= frameCount;
        analysis.movement.avgSideways /= frameCount;
        analysis.environment.avgHealth /= frameCount;
        analysis.patterns.avgRotation /= frameCount;
        analysis.summary.avgSpeed = analysis.summary.distanceTraveled / analysis.summary.duration;
        analysis.actions.sprintPercent = (analysis.actions.sprintPercent / frameCount) * 100;
        analysis.actions.sneakPercent = (analysis.actions.sneakPercent / frameCount) * 100;
        analysis.actions.jumpPercent = (analysis.actions.jumpCount / frameCount) * 100;
        analysis.environment.groundTime = (analysis.environment.groundTime / frameCount) * 100;
        analysis.environment.waterTime = (analysis.environment.waterTime / frameCount) * 100;
        analysis.environment.lavaTime = (analysis.environment.lavaTime / frameCount) * 100;
        analysis.environment.healthLoss = this.data[0].health - this.data[this.data.length - 1].health;

        return analysis;
    }

    displayAnalysis() {
        const analysis = this.analyzeData();

        Chat.log("=== Enhanced Input Analysis ===");
        Chat.log(`Duration: ${analysis.summary.duration.toFixed(1)}s, Frames: ${analysis.summary.totalFrames}`);
        Chat.log(`Distance: ${analysis.summary.distanceTraveled.toFixed(2)} blocks, Avg Speed: ${analysis.summary.avgSpeed.toFixed(2)} b/s`);

        Chat.log("\n--- Movement Patterns ---");
        Chat.log(`Avg Forward: ${analysis.movement.avgForward.toFixed(2)}, Avg Sideways: ${analysis.movement.avgSideways.toFixed(2)}`);
        Chat.log(`Max Forward: ${analysis.movement.maxForward.toFixed(2)}, Max Sideways: ${analysis.movement.maxSideways.toFixed(2)}`);
        Chat.log(`Direction Changes: ${analysis.patterns.directionChanges}, Avg Rotation: ${analysis.patterns.avgRotation.toFixed(1)}°`);

        Chat.log("\n--- Actions ---");
        Chat.log(`Jumps: ${analysis.actions.jumpCount} (${analysis.actions.jumpPercent.toFixed(1)}%)`);
        Chat.log(`Sprint: ${analysis.actions.sprintPercent.toFixed(1)}%, Sneak: ${analysis.actions.sneakPercent.toFixed(1)}%`);

        Chat.log("\n--- Environment ---");
        Chat.log(`Avg Health: ${analysis.environment.avgHealth.toFixed(1)}, Health Loss: ${analysis.environment.healthLoss.toFixed(1)}`);
        Chat.log(`Ground: ${analysis.environment.groundTime.toFixed(1)}%, Water: ${analysis.environment.waterTime.toFixed(1)}%`);

        Chat.log("\n--- Biomes Visited ---");
        const sortedBiomes = Array.from(analysis.environment.biomes.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        sortedBiomes.forEach(([biome, time]) => {
            const percent = (time / this.data.length) * 100;
            Chat.log(`${biome}: ${percent.toFixed(1)}%`);
        });

        if (analysis.patterns.peakSpeeds.length > 0) {
            Chat.log("\n--- Peak Speeds ---");
            analysis.patterns.peakSpeeds.slice(0, 3).forEach(peak => {
                Chat.log(`${peak.speed.toFixed(2)} b/s at tick ${peak.tick}`);
            });
        }
    }
}

const enhancedRecorder = new EnhancedInputRecorder();

// Control enhanced recording
events.on("Key", JavaWrapper.methodToJavaAsync((event) => {
    if (event.key === "key.keyboard.r") {
        enhancedRecorder.startRecording();

        const recordListener = JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            enhancedRecorder.recordFrame();
        }));

        setTimeout(() => {
            JsMacros.off(recordListener);
            enhancedRecorder.stopRecording();
            enhancedRecorder.displayAnalysis();
        }, 15000); // 15 second recording
    }
}));
```

## Notes and Best Practices

- **Input Validation**: Movement inputs should typically be between -1.0 and 1.0, but can be higher for increased speed (subject to game limits and anti-cheat detection).

- **Rotation Values**: Yaw uses 0° for south, 90° for west, 180° for north, 270° for east. Pitch uses 0° for horizontal, negative for looking up, positive for looking down.

- **Timing Considerations**: When recording and playing back movement, maintain proper timing to ensure realistic movement speeds and avoid detection.

- **Performance Optimization**: Avoid creating excessive PlayerInput objects in tight loops. Reuse objects when possible and use `clone()` for safe modifications.

- **State Management**: Always use `clone()` when you need to modify a PlayerInput without affecting the original object.

- **Serialization Format**: The `toString(true)` method outputs in a JSON-like format but is not complete JSON. For proper JSON serialization, use custom methods.

- **CSV Requirements**: When using CSV import/export, ensure the header row matches exactly and data types are correct. The parser is strict about field names.

- **Input Conflicts**: Be aware that PlayerInput can conflict with direct keyboard input. Typically one or the other should be used, not both simultaneously.

- **Anti-Cheat Considerations**: Automated movement may trigger anti-cheat systems on multiplayer servers. Use with caution and consider human-like movement patterns.

- **Thread Safety**: PlayerInput objects are thread-safe for reading, but modifications should be done carefully when accessing from multiple threads.

## Related Classes

- `Player` - Main player library for creating and executing PlayerInput objects
- `Pos3D` - 3D position class used for movement predictions
- `MovementQueue` - Internal movement system for executing PlayerInput sequences
- `MovementDummy` - Movement prediction system for testing inputs

## Version History

- **1.4.0**: Initial release with all core functionality
- **Current**: Full feature set with constructors, serialization, and comprehensive input management
- Designed specifically for input recording, playback, automation, and movement prediction systems in JSMacros



