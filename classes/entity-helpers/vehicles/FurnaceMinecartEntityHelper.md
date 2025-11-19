# FurnaceMinecartEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.vehicle.FurnaceMinecartEntityHelper`

**Extends:** `EntityHelper<FurnaceMinecartEntity>`

The `FurnaceMinecartEntityHelper` class provides specialized functionality for interacting with furnace minecart entities in Minecraft. Furnace minecarts are unique vehicles that can be powered by fuel to move along rails, making them useful for automated transportation systems.

This helper extends the base `EntityHelper` class, inheriting all standard entity functionality while adding specific methods for managing furnace minecart properties. It's particularly useful for creating automated rail systems, monitoring minecart fuel status, and controlling minecart movement in your scripts.

Furnace minecarts can be used to push or pull other minecarts when properly powered, making them excellent for creating automated sorting systems, item transport networks, and mechanical redstone contraptions.

## Constructors

FurnaceMinecartEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity is a furnace minecart
- World entity queries and searches using `World.getEntities()` and type filtering
- Methods that return entities, followed by appropriate type casting

## Methods

### Furnace Minecart Specific

- [furnaceMinecart.isPowered()](#furnaceminecartispowered)

### Inherited from EntityHelper

This class inherits all methods from `EntityHelper`, including:

**Position and Movement:**
- `getPos()`, `getBlockPos()`, `getEyePos()`, `getChunkPos()`
- `getX()`, `getY()`, `getZ()`, `getEyeHeight()`
- `getVelocity()`, `getSpeed()`, `getFacingDirection()`

**Entity Information:**
- `getName()`, `getType()`, `is()`, `getUUID()`
- `getBiome()`, `getChunk()`, `getNBT()`

**State and Conditions:**
- `isAlive()`, `isGlowing()`, `isInLava()`, `isOnFire()`
- `isSneaking()`, `isSprinting()`, `getAir()`, `getMaxAir()`

**Appearance and Effects:**
- `setCustomName()`, `setCustomNameVisible()`
- `setGlowing()`, `setGlowingColor()`, `resetGlowing()`

**Relationships and Passengers:**
- `getVehicle()`, `getPassengers()`

**Interaction and Raytracing:**
- `rayTraceBlock()`, `rayTraceEntity()`

**Distance and Comparison:**
- `distanceTo()`

**Type Casting:**
- `asLiving()`, `asItem()`, `asServerEntity()`

---

## Furnace Minecart Specific

## Usage Examples

### Automated Furnace Minecart Monitoring
```js
// Create a comprehensive furnace minecart monitoring system
class FurnaceMinecartMonitor {
    constructor() {
        this.trackedMinecarts = new Map();
        this.checkInterval = 40; // Check every 2 seconds
        this.tickCounter = 0;
    }

    startMonitoring() {
        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            this.tickCounter++;

            if (this.tickCounter % this.checkInterval === 0) {
                this.updateMinecartStatus();
            }

            // Check for new furnace minecarts
            this.scanForMinecarts();
        }));

        Chat.log("Furnace minecart monitoring system started");
    }

    scanForMinecarts() {
        const entities = World.getEntities();

        entities.forEach(entity => {
            if (entity.is("minecraft:furnace_minecart")) {
                const uuid = entity.getUUID();

                if (!this.trackedMinecarts.has(uuid)) {
                    this.trackMinecart(entity);
                }
            }
        });
    }

    trackMinecart(minecart) {
        const uuid = minecart.getUUID();
        const name = minecart.getName().getString();
        const pos = minecart.getPos();

        this.trackedMinecarts.set(uuid, {
            entity: minecart,
            name: name,
            lastPos: pos,
            poweredTime: 0,
            idleTime: 0,
            totalDistance: 0
        });

        Chat.log(`Started tracking furnace minecart: ${name} (${uuid}) at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
    }

    updateMinecartStatus() {
        for (const [uuid, data] of this.trackedMinecarts) {
            if (!data.entity.isAlive()) {
                Chat.log(`&cFurnace minecart ${data.name} has been removed`);
                this.trackedMinecarts.delete(uuid);
                continue;
            }

            const currentPos = data.entity.getPos();
            const isPowered = data.entity.asFurnaceMinecart().isPowered();
            const distance = currentPos.distanceTo(data.lastPos);

            // Update counters
            if (isPowered) {
                data.poweredTime++;
                data.idleTime = 0;

                if (distance > 0.1) {
                    data.totalDistance += distance;
                }
            } else {
                data.idleTime++;
                data.poweredTime = 0;
            }

            // Log significant status changes
            if (distance > 2) {
                Chat.log(`&e${data.name} moved ${distance.toFixed(1)} blocks (total: ${data.totalDistance.toFixed(1)})`);
            }

            // Report idle minecarts
            if (data.idleTime > 10) { // 20 seconds idle
                Chat.log(`&6Warning: ${data.name} has been idle for ${(data.idleTime / 20).toFixed(1)} seconds`);
            }

            data.lastPos = currentPos;
        }
    }

    getTrackedMinecarts() {
        return Array.from(this.trackedMinecarts.entries()).map(([uuid, data]) => ({
            uuid: uuid,
            name: data.name,
            isPowered: data.entity.asFurnaceMinecart().isPowered(),
            position: data.entity.getPos(),
            poweredTime: data.poweredTime,
            idleTime: data.idleTime,
            totalDistance: data.totalDistance
        }));
    }

    generateReport() {
        const minecarts = this.getTrackedMinecarts();

        Chat.log("=== Furnace Minecart Status Report ===");
        Chat.log(`Total tracked minecarts: ${minecarts.length}`);

        minecarts.forEach(minecart => {
            const status = minecart.isPowered ? "&aACTIVE" : "&cIDLE";
            Chat.log(`${status} ${minecart.name} at [${minecart.position.x.toFixed(0)}, ${minecart.position.y.toFixed(0)}, ${minecart.position.z.toFixed(0)}]`);
            Chat.log(`  - Total distance traveled: ${minecart.totalDistance.toFixed(1)} blocks`);
            Chat.log(`  - Current state time: ${(Math.max(minecart.poweredTime, minecart.idleTime) / 20).toFixed(1)}s`);
        });
    }
}

// Initialize and start the monitoring system
const monitor = new FurnaceMinecartMonitor();
monitor.startMonitoring();

// Generate periodic reports
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 600 === 0) { // Every 30 seconds
        monitor.generateReport();
    }
}));
```

### Furnace Minecart Fuel Alert System
```js
// Alert system for furnace minecarts that need fuel
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const entities = World.getEntities();
    const player = Player.getPlayer();

    if (!player) return;

    entities.forEach(entity => {
        if (entity.is("minecraft:furnace_minecart")) {
            const furnaceMinecart = entity.asFurnaceMinecart();
            const distance = player.distanceTo(entity);
            const pos = entity.getPos();
            const name = entity.getName().getString();

            // Only check minecarts within 50 blocks
            if (distance <= 50) {
                const isPowered = furnaceMinecart.isPowered();

                if (!isPowered) {
                    Chat.actionbar(`&6Idle furnace minecart at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}] - needs fuel!`);
                }
            }
        }
    });
}));
```

### Furnace Minecart Railway Assistant
```js
// Interactive railway management system for furnace minecarts
function createRailwayAssistant() {
    Chat.log("=== Furnace Minecart Railway Assistant ===");
    Chat.log("Scanning for furnace minecarts...");

    const entities = World.getEntities();
    const furnaceMinecarts = entities.filter(entity => entity.is("minecraft:furnace_minecart"));

    if (furnaceMinecarts.length === 0) {
        Chat.log("&7No furnace minecarts found in the area");
        return;
    }

    Chat.log(`Found ${furnaceMinecarts.length} furnace minecart(s):`);

    furnaceMinecarts.forEach((minecart, index) => {
        const furnaceMinecart = minecart.asFurnaceMinecart();
        const pos = minecart.getPos();
        const isPowered = furnaceMinecart.isPowered();
        const status = isPowered ? "&aRunning" : "&cStopped";
        const name = minecart.getName().getString();

        Chat.log(`${index + 1}. ${name} ${status}`);
        Chat.log(`   Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        Chat.log(`   UUID: ${minecart.getUUID()}`);

        // Check for nearby rails
        const blockBelow = World.getBlock(Math.floor(pos.x), Math.floor(pos.y - 1), Math.floor(pos.z));
        if (blockBelow) {
            const blockName = blockBelow.getBlockState().getBlock().getName();
            if (blockName.includes("rail")) {
                Chat.log(`   On rail: ${blockName}`);
            } else {
                Chat.log(`   &6Warning: Not on rail (on ${blockName})`);
            }
        }

        // Check for passenger connections
        const passengers = minecart.getPassengers();
        if (passengers && passengers.length > 0) {
            Chat.log(`   Connected to ${passengers.length} minecart(s):`);
            passengers.forEach(passenger => {
                const passengerName = passenger.getName().getString();
                const passengerType = passenger.getType();
                Chat.log(`     - ${passengerName} (${passengerType})`);
            });
        }

        Chat.log("");
    });

    // Provide management suggestions
    Chat.log("=== Management Suggestions ===");
    Chat.log("• Add fuel (coal/charcoal) to power idle minecarts");
    Chat.log("• Use powered rails for additional boost");
    Chat.log("• Connect multiple minecarts for transport trains");
    Chat.log("• Monitor fuel levels to prevent unexpected stops");
}

// Run the railway assistant
createRailwayAssistant();

// Bind to a command for easy access
const railwayCommand = Chat.createCommandBuilder("railway")
    .executes(JavaWrapper.methodToJava((ctx) => {
        createRailwayAssistant();
        return 1;
    }))
    .register();

Chat.log("Railway assistant registered! Use '/railway' to check furnace minecarts.");
```

### Furnace Minecart Performance Analytics
```js
// Performance tracking and analytics for furnace minecart systems
class FurnaceMinecartAnalytics {
    constructor() {
        this.metrics = {
            totalMinecarts: 0,
            activeMinecarts: 0,
            idleMinecarts: 0,
            averageIdleTime: 0,
            totalDistanceTraveled: 0,
            efficiencyScore: 0
        };
        this.historicalData = [];
        this.lastUpdateTime = Date.now();
    }

    updateAnalytics() {
        const entities = World.getEntities();
        const furnaceMinecarts = entities.filter(entity => entity.is("minecraft:furnace_minecart"));

        // Calculate current metrics
        let activeCount = 0;
        let idleCount = 0;
        let totalIdleTime = 0;

        furnaceMinecarts.forEach(minecart => {
            const furnaceMinecart = minecart.asFurnaceMinecart();
            const isPowered = furnaceMinecart.isPowered();

            if (isPowered) {
                activeCount++;
            } else {
                idleCount++;
                totalIdleTime++;
            }
        });

        // Update metrics
        this.metrics.totalMinecarts = furnaceMinecarts.length;
        this.metrics.activeMinecarts = activeCount;
        this.metrics.idleMinecarts = idleCount;
        this.metrics.averageIdleTime = furnaceMinecarts.length > 0 ? totalIdleTime / furnaceMinecarts.length : 0;

        // Calculate efficiency score (0-100)
        if (furnaceMinecarts.length > 0) {
            this.metrics.efficiencyScore = (activeCount / furnaceMinecarts.length) * 100;
        } else {
            this.metrics.efficiencyScore = 0;
        }

        // Store historical data
        const timestamp = Date.now();
        this.historicalData.push({
            timestamp: timestamp,
            ...this.metrics
        });

        // Keep only last 100 entries
        if (this.historicalData.length > 100) {
            this.historicalData.shift();
        }

        this.lastUpdateTime = timestamp;
    }

    generateReport() {
        Chat.log("=== Furnace Minecart Performance Analytics ===");
        Chat.log(`Total minecarts: ${this.metrics.totalMinecarts}`);
        Chat.log(`Active minecarts: ${a}${this.metrics.activeMinecarts}7`);
        Chat.log(`Idle minecarts: &c${this.metrics.idleMinecarts}&7`);
        Chat.log(`Efficiency score: ${this.getEfficiencyColor(this.metrics.efficiencyScore)}${this.metrics.efficiencyScore.toFixed(1)}%&7`);

        if (this.metrics.totalMinecarts > 0) {
            const utilizationRate = (this.metrics.activeMinecarts / this.metrics.totalMinecarts) * 100;
            Chat.log(`Utilization rate: ${this.getEfficiencyColor(utilizationRate)}${utilizationRate.toFixed(1)}%&7`);
        }

        // Provide recommendations
        this.generateRecommendations();
    }

    getEfficiencyColor(score) {
        if (score >= 80) return "&a";
        if (score >= 60) return "&e";
        if (score >= 40) return "&6";
        return "&c";
    }

    generateRecommendations() {
        Chat.log("\n=== Recommendations ===");

        if (this.metrics.totalMinecarts === 0) {
            Chat.log("• No furnace minecarts found - consider adding some for automation");
            return;
        }

        const efficiency = this.metrics.efficiencyScore;

        if (efficiency >= 80) {
            Chat.log("• &aExcellent performance! Your minecart system is highly efficient");
        } else if (efficiency >= 60) {
            Chat.log("• &eGood performance, but consider optimizing fuel management");
        } else if (efficiency >= 40) {
            Chat.log("• &6Moderate performance - check for idle minecarts that may need fuel");
        } else {
            Chat.log("• &cLow efficiency - many minecarts are idle and may need attention");
        }

        if (this.metrics.idleMinecarts > this.metrics.activeMinecarts) {
            Chat.log("• More minecarts are idle than active - consider redistributing or adding fuel");
        }

        if (this.metrics.totalMinecarts > 10) {
            Chat.log("• Large fleet detected - consider implementing automated fuel systems");
        }
    }
}

// Create and run analytics system
const analytics = new FurnaceMinecartAnalytics();

// Update analytics every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 100 === 0) { // Every 5 seconds (100 ticks)
        analytics.updateAnalytics();
    }
}));

// Generate reports every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 600 === 0) { // Every 30 seconds
        analytics.generateReport();
    }
}));

Chat.log("Furnace minecart analytics system initialized");
```

## Important Notes

- **Fuel Management**: Furnace minecarts consume fuel (coal, charcoal, etc.) to remain powered. Monitor `isPowered()` to detect when they need refueling.
- **Rail Requirements**: Furnace minecarts require rails to move effectively. They can push other minecarts when on powered rails or when they have momentum.
- **Pushing Mechanics**: Powered furnace minecarts can push up to 4 other minecarts behind them, making them useful for creating transport trains.
- **Entity Inheritance**: This helper inherits all standard entity methods from `EntityHelper`, allowing you to access position, movement, appearance, and other entity properties.
- **Type Safety**: Always verify that an entity is actually a furnace minecart before attempting to use this helper using `entity.is("minecraft:furnace_minecart")`.
- **Server-Side Limitations**: Some operations may have different behavior in multiplayer versus single-player worlds.
- **Performance Considerations**: When monitoring many furnace minecarts, consider using tick-based throttling to avoid performance impacts.

## Related Classes

- `EntityHelper` - Base class providing all standard entity functionality
- `MinecartEntityHelper` - General minecart functionality (if available)
- `BoatEntityHelper` - Similar vehicle helper for boats
- `LivingEntityHelper` - For living entities with health and movement
- `World` - For entity discovery and world interaction
- `BlockHelper` - For rail detection and interaction

## Version Information

- Available since JSMacros 1.8.4
- Extends `EntityHelper` which provides the core entity functionality
- Designed specifically for furnace minecart entities (`minecraft:furnace_minecart`)
- Built on Minecraft's furnace minecart entity system for accurate behavior simulation