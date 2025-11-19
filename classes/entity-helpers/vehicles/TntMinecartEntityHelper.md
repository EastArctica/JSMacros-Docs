# TntMinecartEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.vehicle.TntMinecartEntityHelper`

**Extends:** `EntityHelper<TntMinecartEntity>`

The `TntMinecartEntityHelper` class provides specialized functionality for interacting with TNT minecart entities in Minecraft. TNT minecarts are explosive vehicles that travel along rails and can be detonated either automatically when triggered or manually. This helper allows you to monitor the fuse timing, detect when the TNT is primed for explosion, and integrate TNT minecart mechanics into your automated systems.

This helper extends the base `EntityHelper` class, inheriting all standard entity functionality while adding specific methods for managing TNT minecart properties. It's particularly useful for creating automated demolition systems, monitoring explosive contraptions, timing controlled explosions, and building redstone-powered railway systems with explosive capabilities.

TNT minecarts are unique among minecarts because they contain explosives that can be triggered by various means including activator rails, fire, arrows, or other explosions. They have a fuse time that counts down once primed, providing a predictable delay before detonation.

## Constructors

TntMinecartEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity is a TNT minecart (`minecraft:tnt_minecart`)
- World entity queries and searches using `World.getEntities()` with type filtering
- Methods that return entities, followed by appropriate type casting using `entity.as()` methods
- Static casting methods when you know an entity is a TNT minecart

## Methods

### TNT Minecart Specific

- [tntMinecart.getRemainingTime()](#tntminecartgetremainingtime)
- [tntMinecart.isPrimed()](#tntminecartisprimed)

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

## TNT Minecart Specific

## Usage Examples

### TNT Minecart Monitoring System
```js
// Create a comprehensive TNT minecart monitoring and safety system
class TntMinecartMonitor {
    constructor() {
        this.trackedMinecarts = new Map();
        this.checkInterval = 10; // Check every 0.5 seconds
        this.tickCounter = 0;
        this.warningDistance = 30; // Warn within 30 blocks
        this.dangerDistance = 10;  // Critical alert within 10 blocks
    }

    startMonitoring() {
        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            this.tickCounter++;

            if (this.tickCounter % this.checkInterval === 0) {
                this.updateMinecartStatus();
            }

            // Check for new TNT minecarts
            this.scanForMinecarts();
        }));

        Chat.log("TNT minecart monitoring system started");
        Chat.log("&eWarning: Active TNT minecarts will be tracked for safety");
    }

    scanForMinecarts() {
        const entities = World.getEntities();
        const player = Player.getPlayer();

        entities.forEach(entity => {
            if (entity.is("minecraft:tnt_minecart")) {
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
        const tntMinecart = minecart.asTntMinecart();

        this.trackedMinecarts.set(uuid, {
            entity: minecart,
            name: name,
            lastPos: pos,
            isPrimed: tntMinecart.isPrimed(),
            remainingTime: tntMinecart.getRemainingTime(),
            lastPrimedTime: tntMinecart.isPrimed() ? Date.now() : 0,
            maxDangerTime: 0
        });

        Chat.log(`Started tracking TNT minecart: ${name} (${uuid}) at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);

        if (tntMinecart.isPrimed()) {
            Chat.log(`&cALERT: ${name} is already primed with ${tntMinecart.getRemainingTime()} ticks remaining!`);
        }
    }

    updateMinecartStatus() {
        const player = Player.getPlayer();
        if (!player) return;

        for (const [uuid, data] of this.trackedMinecarts) {
            if (!data.entity.isAlive()) {
                Chat.log(`&7TNT minecart ${data.name} has been removed (exploded or despawned)`);
                this.trackedMinecarts.delete(uuid);
                continue;
            }

            const currentPos = data.entity.getPos();
            const tntMinecart = data.entity.asTntMinecart();
            const isPrimed = tntMinecart.isPrimed();
            const remainingTime = tntMinecart.getRemainingTime();
            const distance = player.distanceTo(data.entity);

            // Check for state changes
            if (!data.isPrimed && isPrimed) {
                // Minecart just became primed
                Chat.log(`&cDANGER: ${data.name} has been PRIMED at [${currentPos.x.toFixed(0)}, ${currentPos.y.toFixed(0)}, ${currentPos.z.toFixed(0)}]`);
                Chat.log(`&cTime until explosion: ${remainingTime} ticks (${(remainingTime / 20).toFixed(1)} seconds)`);
                data.lastPrimedTime = Date.now();
            } else if (data.isPrimed && !isPrimed) {
                // Minecart was defused (unlikely but possible)
                Chat.log(`&aSAFE: ${data.name} is no longer primed`);
                data.lastPrimedTime = 0;
            }

            // Update danger level for primed minecarts
            if (isPrimed) {
                const dangerTime = remainingTime;
                if (dangerTime < data.maxDangerTime || data.maxDangerTime === 0) {
                    data.maxDangerTime = dangerTime;
                }

                // Proximity warnings
                if (distance <= this.dangerDistance) {
                    Chat.actionbar(`&c&lCRITICAL: TNT explosion in ${remainingTime} ticks, ${(distance).toFixed(1)} blocks away!`);
                } else if (distance <= this.warningDistance) {
                    Chat.actionbar(`&6Warning: TNT minecart primed, ${remainingTime} ticks, ${(distance).toFixed(1)} blocks away`);
                }

                // Critical countdown alerts
                if (remainingTime <= 20 && remainingTime % 4 === 0) { // Every 0.2 seconds in last second
                    Chat.log(`&c&l${data.name} EXPLODING IN: ${remainingTime} TICKS!`);
                }
            }

            // Update stored data
            data.isPrimed = isPrimed;
            data.remainingTime = remainingTime;
            data.lastPos = currentPos;
        }
    }

    generateSafetyReport() {
        const player = Player.getPlayer();
        if (!player) return;

        const minecarts = Array.from(this.trackedMinecarts.entries());
        const playerPos = player.getPos();

        Chat.log("=== TNT Minecart Safety Report ===");
        Chat.log(`Total tracked minecarts: ${minecarts.length}`);

        let primedCount = 0;
        let nearbyPrimedCount = 0;
        let criticalCount = 0;

        minecarts.forEach(([uuid, data]) => {
            const distance = playerPos.distanceTo(data.lastPos);
            const status = data.isPrimed ? "&c&lPRIMED" : "&aSAFE";

            Chat.log(`${status} ${data.name}:`);
            Chat.log(`  Position: [${data.lastPos.x.toFixed(1)}, ${data.lastPos.y.toFixed(1)}, ${data.lastPos.z.toFixed(1)}]`);
            Chat.log(`  Distance: ${(distance).toFixed(1)} blocks`);

            if (data.isPrimed) {
                primedCount++;
                Chat.log(`  Time until explosion: ${data.remainingTime} ticks (${(data.remainingTime / 20).toFixed(1)}s)`);

                if (distance <= this.warningDistance) {
                    nearbyPrimedCount++;
                    Chat.log(`  &6&lPROXIMITY WARNING!`);
                }

                if (distance <= this.dangerDistance) {
                    criticalCount++;
                    Chat.log(`  &c&lCRITICAL DANGER ZONE!`);
                }
            }
        });

        // Summary
        Chat.log(`\n=== Summary ===`);
        Chat.log(`Primed minecarts: ${primedCount}`);
        Chat.log(`Within warning range: ${nearbyPrimedCount}`);
        Chat.log(`In critical range: ${criticalCount}`);

        if (criticalCount > 0) {
            Chat.log(`&c&lIMMEDIATE DANGER: ${criticalCount} TNT minecarts could kill you!`);
        } else if (nearbyPrimedCount > 0) {
            Chat.log(`&6CAUTION: ${nearbyPrimedCount} TNT minecarts in warning range`);
        }
    }

    getTrackedMinecarts() {
        return Array.from(this.trackedMinecarts.entries()).map(([uuid, data]) => ({
            uuid: uuid,
            name: data.name,
            position: data.lastPos,
            isPrimed: data.isPrimed,
            remainingTime: data.remainingTime,
            lastPrimedTime: data.lastPrimedTime,
            maxDangerTime: data.maxDangerTime
        }));
    }
}

// Initialize and start the monitoring system
const monitor = new TntMinecartMonitor();
monitor.startMonitoring();

// Generate periodic safety reports
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 200 === 0) { // Every 10 seconds
        monitor.generateSafetyReport();
    }
}));
```

### TNT Minecart Explosion Timer
```js
// Create visual and audible countdown timers for primed TNT minecarts
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    const entities = World.getEntities();
    const player = Player.getPlayer();

    if (!player) return;

    entities.forEach(entity => {
        if (entity.is("minecraft:tnt_minecart")) {
            const tntMinecart = entity.asTntMinecart();

            if (tntMinecart.isPrimed()) {
                const remainingTime = tntMinecart.getRemainingTime();
                const pos = entity.getPos();
                const distance = player.distanceTo(entity);
                const name = entity.getName().getString();

                // Only show countdown for minecarts within 50 blocks
                if (distance <= 50) {
                    const secondsUntilExplosion = (remainingTime / 20).toFixed(1);

                    // Create visual countdown with particles and sounds
                    if (remainingTime <= 60) { // Last 3 seconds
                        const urgency = remainingTime <= 20 ? "&c&l" : "&6&l";

                        // Show countdown in action bar
                        Chat.actionbar(`${urgency}${name} explodes in: ${secondsUntilExplosion}s (${distance.toFixed(1)}m)`);

                        // Create particle effects for very close explosions
                        if (distance <= 15) {
                            // Visual warning effect
                            if (remainingTime % 10 === 0) { // Every 0.5 seconds
                                // Flash effect for impending doom
                                Chat.title("", `${urgency}${Math.ceil(remainingTime / 20)}`, 0, 5, 0);
                            }
                        }
                    }
                }
            }
        }
    });
}));
```

### Automated TNT Minecart Detection and Response
```js
// Automated system that detects TNT minecarts and takes protective measures
class TntDefenseSystem {
    constructor() {
        this.activeDefenses = new Map();
        this.detectionRange = 40;
        this.safeDistance = 20;
    }

    initializeDefense() {
        events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
            this.scanForThreats();
            this.manageDefenses();
        }));

        Chat.log("TNT Defense System initialized");
        Chat.log("Scanning for explosive threats...");
    }

    scanForThreats() {
        const entities = World.getEntities();
        const player = Player.getPlayer();

        if (!player) return;

        entities.forEach(entity => {
            if (entity.is("minecraft:tnt_minecart")) {
                const tntMinecart = entity.asTntMinecart();
                const distance = player.distanceTo(entity);

                if (distance <= this.detectionRange) {
                    const threatLevel = this.assessThreatLevel(tntMinecart, distance);
                    this.respondToThreat(entity, threatLevel);
                }
            }
        });
    }

    assessThreatLevel(tntMinecart, distance) {
        if (!tntMinecart.isPrimed()) {
            return "MONITOR"; // Not currently a threat
        }

        const remainingTime = tntMinecart.getRemainingTime();

        if (distance <= this.safeDistance && remainingTime <= 40) {
            return "CRITICAL"; // Will kill player
        } else if (distance <= this.safeDistance && remainingTime <= 80) {
            return "HIGH"; // Dangerous proximity
        } else if (remainingTime <= 60) {
            return "MEDIUM"; // Primed with moderate time
        } else {
            return "LOW"; // Primed but plenty of time
        }
    }

    respondToThreat(entity, threatLevel) {
        const uuid = entity.getUUID();
        const tntMinecart = entity.asTntMinecart();
        const pos = entity.getPos();
        const name = entity.getName().getString();

        // Log threat detection
        const threatMessages = {
            "CRITICAL": `&c&lCRITICAL THREAT: ${name} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`,
            "HIGH": `&6HIGH THREAT: ${name} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`,
            "MEDIUM": `&eMEDIUM THREAT: ${name} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`,
            "LOW": `&aLOW THREAT: ${name} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`,
            "MONITOR": `&7Monitoring: ${name} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`
        };

        if (threatLevel !== "MONITOR" && !this.activeDefenses.has(uuid)) {
            Chat.log(threatMessages[threatLevel]);

            if (tntMinecart.isPrimed()) {
                Chat.log(`  Time until explosion: ${tntMinecart.getRemainingTime()} ticks`);
            }
        }

        // Activate appropriate defenses
        switch (threatLevel) {
            case "CRITICAL":
                this.activateEmergencyProtocol(entity);
                break;
            case "HIGH":
                this.activateHighAlert(entity);
                break;
            case "MEDIUM":
                this.activateMediumResponse(entity);
                break;
            case "LOW":
                this.monitorThreat(entity);
                break;
        }
    }

    activateEmergencyProtocol(entity) {
        const uuid = entity.getUUID();
        const pos = entity.getPos();
        const tntMinecart = entity.asTntMinecart();

        this.activeDefenses.set(uuid, {
            level: "EMERGENCY",
            startTime: Date.now(),
            entity: entity
        });

        // Emergency actions
        Chat.actionbar("&c&lEMERGENCY PROTOCOL ACTIVATED!");
        Chat.title("&c&lDANGER", "&cTNT Explosion Imminent!", 0, 10, 5);

        // Suggest immediate actions
        Chat.log("&c&lIMMEDIATE ACTIONS REQUIRED:");
        Chat.log("• Run away from the blast area immediately");
        Chat.log("• Find cover or dig down if escape is impossible");
        Chat.log("• Use ender pearls or teleportation if available");
        Chat.log(`• Explosion in ${tntMinecart.getRemainingTime()} ticks!`);

        // Create persistent warnings
        const warningInterval = setInterval(() => {
            if (!entity.isAlive()) {
                clearInterval(warningInterval);
                this.activeDefenses.delete(uuid);
                return;
            }

            const remainingTime = tntMinecart.getRemainingTime();
            if (remainingTime > 0 && remainingTime <= 20) {
                Chat.actionbar(`&c&lEXPLOSION IN: ${remainingTime} TICKS! RUN!`);
            }
        }, 200);
    }

    activateHighAlert(entity) {
        const uuid = entity.getUUID();
        const tntMinecart = entity.asTntMinecart();

        this.activeDefenses.set(uuid, {
            level: "HIGH",
            startTime: Date.now(),
            entity: entity
        });

        Chat.actionbar("&6&lHIGH ALERT: TNT minecart threat detected");
        Chat.log(`&6High Alert: ${tntMinecart.getRemainingTime()} ticks until explosion`);
    }

    activateMediumResponse(entity) {
        const uuid = entity.getUUID();
        const tntMinecart = entity.asTntMinecart();

        this.activeDefenses.set(uuid, {
            level: "MEDIUM",
            startTime: Date.now(),
            entity: entity
        });

        Chat.log(`&eMedium Alert: Monitoring primed TNT minecart`);
    }

    monitorThreat(entity) {
        const uuid = entity.getUUID();

        this.activeDefenses.set(uuid, {
            level: "MONITOR",
            startTime: Date.now(),
            entity: entity
        });
    }

    manageDefenses() {
        // Clean up expired threats
        for (const [uuid, defense] of this.activeDefenses) {
            if (!defense.entity.isAlive()) {
                this.activeDefenses.delete(uuid);
                Chat.log(`&7Threat neutralized: TNT minecart exploded or removed`);
            }
        }
    }

    getStatusReport() {
        const activeThreats = Array.from(this.activeDefenses.values()).length;
        const criticalThreats = Array.from(this.activeDefenses.values())
            .filter(defense => defense.level === "EMERGENCY").length;

        Chat.log("=== TNT Defense Status ===");
        Chat.log(`Active threats: ${activeThreats}`);
        Chat.log(`Critical threats: ${criticalThreats}`);

        if (criticalThreats > 0) {
            Chat.log("&c&lIMMEDIATE DANGER: Take evasive action now!");
        }
    }
}

// Initialize the defense system
const defenseSystem = new TntDefenseSystem();
defenseSystem.initializeDefense();

// Create command for status reports
const defenseCommand = Chat.createCommandBuilder("tntstatus")
    .executes(JavaWrapper.methodToJava((ctx) => {
        defenseSystem.getStatusReport();
        return 1;
    }))
    .register();

Chat.log("Use '/tntstatus' to check TNT defense status");
```

### TNT Minecart Railway Safety Inspector
```js
// Interactive tool for inspecting TNT minecart railway systems
function inspectTntRailways() {
    Chat.log("=== TNT Minecart Railway Safety Inspector ===");
    Chat.log("Scanning for TNT minecarts and railway conditions...");

    const entities = World.getEntities();
    const tntMinecarts = entities.filter(entity => entity.is("minecraft:tnt_minecart"));

    if (tntMinecarts.length === 0) {
        Chat.log("&7No TNT minecarts found in the area");
        return;
    }

    Chat.log(`Found ${tntMinecarts.length} TNT minecart(s):`);
    Chat.log("");

    let safetyScore = 100;
    let safetyIssues = [];

    tntMinecarts.forEach((minecart, index) => {
        const tntMinecart = minecart.asTntMinecart();
        const pos = minecart.getPos();
        const isPrimed = tntMinecart.isPrimed();
        const remainingTime = tntMinecart.getRemainingTime();
        const name = minecart.getName().getString();

        Chat.log(`${index + 1}. ${name}`);
        Chat.log(`   Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
        Chat.log(`   Status: ${isPrimed ? '&c&lPRIMED&7' : '&aSAFE&7'}`);

        if (isPrimed) {
            Chat.log(`   Time until explosion: ${remainingTime} ticks (${(remainingTime / 20).toFixed(1)}s)`);

            if (remainingTime < 80) {
                safetyIssues.push("Primed TNT with short fuse");
                safetyScore -= 25;
            }
        }

        // Check rail conditions
        const blockBelow = World.getBlock(Math.floor(pos.x), Math.floor(pos.y - 1), Math.floor(pos.z));
        if (blockBelow) {
            const blockName = blockBelow.getBlockState().getBlock().getName();

            if (blockName.includes("activator_rail")) {
                Chat.log(`   &6On: ${blockName} &7(&6can trigger explosion&7)`);
                if (isPrimed) {
                    safetyIssues.push("Primed TNT on activator rail");
                    safetyScore -= 15;
                }
            } else if (blockName.includes("rail")) {
                Chat.log(`   On: ${blockName}`);
            } else {
                Chat.log(`   &6Warning: Not on rail (on ${blockName})`);
                safetyIssues.push("TNT minecart not on rails");
                safetyScore -= 10;
            }
        }

        // Check for nearby flammable blocks
        const nearbyBlocks = [
            World.getBlock(Math.floor(pos.x + 1), Math.floor(pos.y), Math.floor(pos.z)),
            World.getBlock(Math.floor(pos.x - 1), Math.floor(pos.y), Math.floor(pos.z)),
            World.getBlock(Math.floor(pos.x), Math.floor(pos.y + 1), Math.floor(pos.z)),
            World.getBlock(Math.floor(pos.x), Math.floor(pos.y - 1), Math.floor(pos.z))
        ];

        let flammableCount = 0;
        nearbyBlocks.forEach(block => {
            if (block) {
                const blockName = block.getBlockState().getBlock().getName();
                if (blockName.includes("wood") || blockName.includes("plank") ||
                    blockName.includes("fence") || blockName.includes("door") ||
                    blockName.includes("wool") || blockName.includes("carpet")) {
                    flammableCount++;
                }
            }
        });

        if (flammableCount > 0) {
            Chat.log(`   &6Warning: ${flammableCount} flammable block(s) nearby`);
            if (flammableCount >= 3) {
                safetyIssues.push("Multiple flammable blocks near TNT");
                safetyScore -= 20;
            } else if (flammableCount >= 1) {
                safetyIssues.push("Flammable blocks near TNT");
                safetyScore -= 10;
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

                // Check if connected minecarts could create chain reactions
                if (passengerType.includes("tnt")) {
                    safetyIssues.push("Connected TNT minecarts (chain reaction risk)");
                    safetyScore -= 30;
                    Chat.log(`       &c&lDANGER: Connected TNT minecart!`);
                }
            });
        }

        Chat.log("");
    });

    // Safety assessment
    Chat.log("=== Safety Assessment ===");
    Chat.log(`Overall Safety Score: ${getSafetyGrade(safetyScore)}${safetyScore}/100`);

    if (safetyIssues.length > 0) {
        Chat.log("\n&6Safety Issues Detected:");
        safetyIssues.forEach(issue => {
            Chat.log(`• ${issue}`);
        });
    }

    // Recommendations
    Chat.log("\n=== Safety Recommendations ===");
    generateSafetyRecommendations(safetyScore, safetyIssues);
}

function getSafetyGrade(score) {
    if (score >= 90) return "&a";
    if (score >= 75) return "&e";
    if (score >= 60) return "&6";
    return "&c";
}

function generateSafetyRecommendations(score, issues) {
    if (score >= 90) {
        Chat.log("• &aExcellent safety conditions detected");
        Chat.log("• Continue monitoring for any changes");
    } else if (score >= 75) {
        Chat.log("• &eGenerally safe conditions");
        Chat.log("• Address minor safety issues for improved protection");
    } else if (score >= 60) {
        Chat.log("• &6Moderate safety concerns");
        Chat.log("• Take corrective action to improve safety");
    } else {
        Chat.log("• &c&lCRITICAL SAFETY ISSUES DETECTED");
        Chat.log("• Take immediate action to prevent accidents");
    }

    // Specific recommendations based on issues
    if (issues.some(issue => issue.includes("Primed TNT"))) {
        Chat.log("• Move away from primed TNT immediately");
        Chat.log("• Consider defusing if possible (break the minecart)");
    }

    if (issues.some(issue => issue.includes("activator rail"))) {
        Chat.log("• Disable activator rails near TNT minecarts");
        Chat.log("• Use regular rails instead for safer transport");
    }

    if (issues.some(issue => issue.includes("flammable"))) {
        Chat.log("• Remove flammable materials near TNT minecarts");
        Chat.log("• Create firebreaks using stone or other non-flammable blocks");
    }

    if (issues.some(issue => issue.includes("chain reaction"))) {
        Chat.log("• Separate connected TNT minecarts immediately");
        Chat.log("• Never connect multiple TNT minecarts together");
    }

    if (issues.some(issue => issue.includes("not on rail"))) {
        Chat.log("• Place TNT minecarts on appropriate rails");
        Chat.log("• Ensure proper railway infrastructure");
    }
}

// Run the railway inspector
inspectTntRailways();

// Create command for repeated inspections
const inspectorCommand = Chat.createCommandBuilder("tntinspect")
    .executes(JavaWrapper.methodToJava((ctx) => {
        inspectTntRailways();
        return 1;
    }))
    .register();

Chat.log("Use '/tntinspect' to run railway safety inspections");
```

## Important Notes

- **Explosion Timing**: TNT minecarts have a fuse time that counts down once primed. Use `getRemainingTime()` to monitor the countdown and `isPrimed()` to check if the fuse is active.

- **Trigger Methods**: TNT minecarts can be triggered by activator rails, fire, arrows, explosions, or falling from height. Always assume nearby TNT minecarts could become primed.

- **Explosion Power**: TNT minecart explosions have the same power as regular TNT blocks, destroying blocks and damaging entities within the blast radius.

- **Chain Reactions**: Multiple TNT minecarts connected together can create devastating chain reactions. Always monitor connected minecarts carefully.

- **Entity Inheritance**: This helper inherits all standard entity methods from `EntityHelper`, allowing you to access position, movement, appearance, and other entity properties.

- **Safety Considerations**: Always implement safety systems when working with TNT minecarts, including proximity warnings, countdown timers, and emergency response protocols.

- **Type Safety**: Always verify that an entity is actually a TNT minecart before attempting to use this helper using `entity.is("minecraft:tnt_minecart")`.

- **Performance Impact**: Monitoring TNT minecarts frequently (especially at short intervals) can impact performance. Use appropriate throttling in your monitoring systems.

- **Multiplayer Considerations**: In multiplayer environments, TNT minecart behavior may be subject to server-side modifications and protections.

## Related Classes

- `EntityHelper` - Base class providing all standard entity functionality
- `FurnaceMinecartEntityHelper` - Similar vehicle helper for furnace minecarts
- `BoatEntityHelper` - Similar vehicle helper for boats
- `TntEntityHelper` - Helper for regular TNT entities
- `LivingEntityHelper` - For entities with health and movement
- `World` - For entity discovery and world interaction
- `BlockHelper` - For rail detection and terrain analysis

## Version Information

- Available since JSMacros 1.8.4
- Extends `EntityHelper` which provides the core entity functionality
- Designed specifically for TNT minecart entities (`minecraft:tnt_minecart`)
- Built on Minecraft's TNT minecart entity system for accurate timing and behavior simulation