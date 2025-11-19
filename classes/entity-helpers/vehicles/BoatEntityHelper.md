# BoatEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.vehicle.BoatEntityHelper`

**Extends:** `EntityHelper<BoatEntity>`

Represents a boat entity in the Minecraft world, providing access to boat-specific properties and states. BoatEntityHelper allows you to identify boat types, check water/land status, and determine if a boat has chest storage capabilities.

This class extends `EntityHelper` and inherits all methods for position, movement, passengers, and general entity properties. BoatEntityHelper instances are typically obtained through entity events, world queries, or when accessing vehicles that players or entities are riding.

## Methods

- [boat.isChestBoat()](#boatischestboat)
- [boat.getBoatBlockType()](#boatgetboatblocktype)
- [boat.getBoatType()](#boatgetboattype)
- [boat.isInWater()](#boatisinwater)
- [boat.isOnLand()](#boatisonland)
- [boat.isUnderwater()](#boatisunderwater)
- [boat.isInAir()](#boatisinair)

---

## Usage Examples

### Complete Boat Analysis System
```js
// Comprehensive boat information display
function analyzeBoat(boat) {
    const info = [];

    // Basic information
    const boatType = boat.getBoatType();
    const isChest = boat.isChestBoat();
    const pos = boat.getPos();

    info.push(`=== Boat Analysis ===`);
    info.push(`Type: ${boatType} ${isChest ? "(Chest Boat)" : ""}`);
    info.push(`Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);

    // Location status
    if (boat.isInWater()) {
        info.push("Status: Sailing on water");
    } else if (boat.isOnLand()) {
        info.push("Status: On land");
    } else if (boat.isUnderwater()) {
        info.push("Status: Underwater (!)");
    } else if (boat.isInAir()) {
        info.push("Status: In air");
    }

    // Material information
    const material = boat.getBoatBlockType();
    const materialName = material.getBlockState().getBlock().getName();
    info.push(`Material: ${materialName}`);

    // Passengers
    const passengers = boat.getPassengers();
    if (passengers && passengers.length > 0) {
        info.push(`Passengers: ${passengers.length}`);
        passengers.forEach((passenger, index) => {
            info.push(`  ${index + 1}. ${passenger.getName().getString()}`);
        });
    } else {
        info.push("Passengers: Empty");
    }

    // Movement information
    const velocity = boat.getVelocity();
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    if (speed > 0.1) {
        info.push(`Speed: ${speed.toFixed(2)} m/s`);
    }

    // Display all information
    info.forEach(line => Chat.log(line));

    return info;
}

// Usage example
events.on("EntityInteract", JavaWrapper.methodToJavaAsync((event) => {
    const target = event.getTarget();
    if (target && target.getType() === "minecraft:boat") {
        analyzeBoat(target);
    }
}));
```

### Boat Dock Management System
```js
// System to manage boats at docks
class DockManager {
    constructor() {
        this.dockedBoats = new Map();
        this.dockLocations = new Map();
    }

    // Register a dock location
    registerDock(name, centerPos, radius = 10) {
        this.dockLocations.set(name, {
            center: centerPos,
            radius: radius
        });
        Chat.log(`Registered dock: ${name} at [${centerPos.x}, ${centerPos.y}, ${centerPos.z}]`);
    }

    // Check if a boat is at any registered dock
    checkDockStatus(boat) {
        const boatPos = boat.getPos();
        const boatUUID = boat.getUUID();

        for (const [dockName, dock] of this.dockLocations) {
            const distance = Math.sqrt(
                Math.pow(boatPos.x - dock.center.x, 2) +
                Math.pow(boatPos.z - dock.center.z, 2)
            );

            if (distance <= dock.radius) {
                if (!this.dockedBoats.has(boatUUID)) {
                    // Boat just arrived at dock
                    this.dockedBoats.set(boatUUID, {
                        boat: boat,
                        dock: dockName,
                        arrivalTime: Date.now(),
                        boatType: boat.getBoatType(),
                        isChestBoat: boat.isChestBoat()
                    });

                    Chat.log(`&a${boat.getBoatType()} ${boat.isChestBoat() ? "Chest " : ""}Boat docked at ${dockName}`);
                }
                return dockName;
            }
        }

        // Boat left dock
        if (this.dockedBoats.has(boatUUID)) {
            const dockedInfo = this.dockedBoats.get(boatUUID);
            Chat.log(`&e${dockedInfo.boatType} ${dockedInfo.isChestBoat ? "Chest " : ""}Boat left ${dockedInfo.dock}`);
            this.dockedBoats.delete(boatUUID);
        }

        return null;
    }

    // Get dock report
    getDockReport() {
        const report = ["=== Dock Status Report ==="];

        for (const [dockName, dock] of this.dockLocations) {
            const boatsAtDock = Array.from(this.dockedBoats.values())
                .filter(boatInfo => boatInfo.dock === dockName);

            report.push(`${dockName}: ${boatsAtDock.length} boats`);

            boatsAtDock.forEach(boatInfo => {
                const duration = Math.floor((Date.now() - boatInfo.arrivalTime) / 1000 / 60);
                report.push(`  - ${boatInfo.boatType} ${boatInfo.isChestBoat ? "(Chest)" : ""} (${duration} min)`);
            });
        }

        return report;
    }
}

// Initialize dock manager
const dockManager = new DockManager();

// Register some dock locations (example coordinates)
const player = Player.getPlayer();
if (player) {
    const playerPos = player.getPos();
    dockManager.registerDock("Main Dock", {x: playerPos.x, z: playerPos.z, y: playerPos.y});
    dockManager.registerDock("Fishing Spot", {x: playerPos.x + 50, z: playerPos.z + 30, y: playerPos.y});
}

// Monitor boats
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 100 === 0) { // Check every 5 seconds
        const entities = World.getEntities();

        entities.forEach(entity => {
            if (entity.getType() === "minecraft:boat") {
                dockManager.checkDockStatus(entity);
            }
        });
    }
}));

// Command to show dock status
Chat.registerCommand("dockreport", () => {
    const report = dockManager.getDockReport();
    report.forEach(line => Chat.log(line));
});
```

### Boat Racing Timer
```js
// Racing system for boats
class BoatRaceTimer {
    constructor() {
        this.startTime = null;
        this.checkpoints = [];
        this.currentCheckpoint = 0;
        this.racing = false;
        this.bestTime = null;
    }

    // Add a checkpoint for the race
    addCheckpoint(x, y, z, radius = 5) {
        this.checkpoints.push({x, y, z, radius, passed: false});
        Chat.log(`Added checkpoint ${this.checkpoints.length}: [${x}, ${y}, ${z}]`);
    }

    // Start the race
    startRace() {
        this.startTime = Date.now();
        this.currentCheckpoint = 0;
        this.racing = true;

        // Reset checkpoints
        this.checkpoints.forEach(cp => cp.passed = false);

        Chat.log("&aRace started! Go through all checkpoints!");
        Chat.actionbar("Race Started!");
    }

    // Check if player's boat reached a checkpoint
    checkCheckpoint(boatPos) {
        if (!this.racing || this.currentCheckpoint >= this.checkpoints.length) {
            return;
        }

        const checkpoint = this.checkpoints[this.currentCheckpoint];
        const distance = Math.sqrt(
            Math.pow(boatPos.x - checkpoint.x, 2) +
            Math.pow(boatPos.y - checkpoint.y, 2) +
            Math.pow(boatPos.z - checkpoint.z, 2)
        );

        if (distance <= checkpoint.radius) {
            checkpoint.passed = true;
            this.currentCheckpoint++;

            const elapsedTime = Date.now() - this.startTime;
            Chat.log(`&aCheckpoint ${this.currentCheckpoint} passed! Time: ${(elapsedTime / 1000).toFixed(1)}s`);

            if (this.currentCheckpoint >= this.checkpoints.length) {
                this.finishRace();
            }
        }
    }

    // Finish the race
    finishRace() {
        const totalTime = Date.now() - this.startTime;
        const timeInSeconds = (totalTime / 1000).toFixed(1);

        this.racing = false;

        Chat.log(`&6Race completed! Total time: ${timeInSeconds} seconds`);

        if (!this.bestTime || totalTime < this.bestTime) {
            this.bestTime = totalTime;
            Chat.log(`&aNew best time: ${timeInSeconds} seconds!`);
        } else {
            const bestTimeSeconds = (this.bestTime / 1000).toFixed(1);
            Chat.log(`Best time: ${bestTimeSeconds} seconds`);
        }

        Chat.actionbar(`Race Finished! ${timeInSeconds}s`);
    }

    // Show current status
    showStatus() {
        if (this.racing) {
            const currentTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
            Chat.log(`&6Racing... Current time: ${currentTime}s`);
            Chat.log(`Checkpoint: ${this.currentCheckpoint}/${this.checkpoints.length}`);
        } else {
            Chat.log("Not currently racing");
            if (this.bestTime) {
                Chat.log(`Best time: ${(this.bestTime / 1000).toFixed(1)}s`);
            }
        }
    }
}

// Initialize race timer
const raceTimer = new BoatRaceTimer();

// Setup a sample race track
raceTimer.addCheckpoint(100, 64, 100);
raceTimer.addCheckpoint(150, 64, 120);
raceTimer.addCheckpoint(150, 64, 150);
raceTimer.addCheckpoint(100, 64, 150);
raceTimer.addCheckpoint(100, 64, 100);

// Monitor player in boat
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    const player = Player.getPlayer();
    if (!player) return;

    const vehicle = player.getVehicle();
    if (vehicle && vehicle.getType() === "minecraft:boat") {
        const boat = vehicle;

        if (boat.isInWater()) { // Only check during actual sailing
            const boatPos = boat.getPos();
            raceTimer.checkCheckpoint(boatPos);
        }
    }
}));

// Commands
Chat.registerCommand("startrace", () => {
    raceTimer.startRace();
});

Chat.registerCommand("racestatus", () => {
    raceTimer.showStatus();
});
```

## Notes and Limitations

- BoatEntityHelper inherits all methods from `EntityHelper`, including position tracking, passenger management, and entity properties.
- The location status methods (`isInWater()`, `isOnLand()`, etc.) represent the boat's current state and may change rapidly during movement.
- Boat types correspond to wood types available in Minecraft (oak, spruce, birch, jungle, acacia, dark oak, mangrove, cherry, bamboo).
- Chest boats can be identified using `isChestBoat()` and have additional storage functionality that may be accessed through other entity methods.
- Some boat properties (like velocity and movement) are inherited from the base `EntityHelper` class.
- Boat status detection may have slight delays due to client-server synchronization.
- The `getBoatBlockType()` method returns a `BlockHelper` that represents the wood material, which can be used for comparison with actual blocks.

## Related Classes

- `EntityHelper` - Base class providing general entity functionality
- `BlockHelper` - Represents the boat's wood material type
- `Pos3D` - Boat position and movement vectors
- `LivingEntityHelper` - For passengers that are living entities
- `PlayerEntityHelper` - For player passengers with additional methods

## Version Information

- Available since JSMacros 1.8.4
- All methods require a boat entity instance to function
- Boat type detection works with all vanilla Minecraft boat variants including chest boats