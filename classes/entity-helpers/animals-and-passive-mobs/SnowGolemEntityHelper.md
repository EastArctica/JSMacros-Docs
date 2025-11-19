# SnowGolemEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.SnowGolemEntityHelper`

**Extends:** `MobEntityHelper<SnowGolemEntity>`

The `SnowGolemEntityHelper` class provides specialized access to snow golem entities in Minecraft, offering methods to check their pumpkin hat status and shearing capabilities. This class extends `MobEntityHelper` and inherits all functionality for mob entities including AI states, health monitoring, and basic entity operations.

This helper is particularly useful for creating scripts that manage snow golem farms, monitor snow golem populations, automate snow production, or coordinate multiple snow golems for defensive purposes around your base.

## Constructors

SnowGolemEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityDeath`, `EntityInteract`)
- World entity queries using type filtering
- Casting from generic EntityHelper instances using `entity.asSnowGolem()`

## Methods

### Snow Golem State

- [snowGolem.hasPumpkin()](#snowgolemhaspumpkin)
- [snowGolem.isShearable()](#snowgolemisshearable)

### Inherited Methods

The SnowGolemEntityHelper inherits all methods from:
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Snow Golem State

### snowGolem.hasPumpkin()

```js
// Check if a snow golem has its pumpkin hat
const snowGolems = World.getEntities().filter(entity => entity.is("minecraft:snow_golem"));

snowGolems.forEach(golem => {
    const snowGolem = golem.asSnowGolem();
    const hasPumpkin = snowGolem.hasPumpkin();

    const status = hasPumpkin ? "&aHas pumpkin" : "&cNo pumpkin";
    const distance = Player.getPlayer().distanceTo(golem);

    Chat.log(`Snow Golem ${status} (${distance.toFixed(1)}m away)`);
});
```

**Parameters:** None

**Returns:** `boolean` - `true` if the snow golem has a pumpkin on its head, `false` otherwise

**Notes:** Snow golems require a pumpkin to attack hostile mobs. Without a pumpkin, they will not aggro or attack enemies, though they will still produce snow particles and push entities away.

### snowGolem.isShearable()

```js
// Check which snow golems can be sheared
const player = Player.getPlayer();
const mainHand = player.getMainHand();
const shearableGolems = [];

World.getEntities().forEach(entity => {
    if (entity.is("minecraft:snow_golem")) {
        const snowGolem = entity.asSnowGolem();

        if (snowGolem.isShearable()) {
            shearableGolems.push({
                entity: entity,
                snowGolem: snowGolem,
                distance: player.distanceTo(entity),
                hasPumpkin: snowGolem.hasPumpkin()
            });
        }
    }
});

if (shearableGolems.length > 0) {
    Chat.log(`&aFound ${shearableGolems.length} snow golem${shearableGolems.length > 1 ? 's' : ''} that can be sheared:`);

    shearableGolems.forEach((golem, index) => {
        const status = golem.hasPumpkin ? "&aWith pumpkin" : "&cNo pumpkin";
        Chat.log(`  ${index + 1}. ${golem.distance.toFixed(1)}m away ${status}`);
        golem.entity.setGlowing(true);
        golem.entity.setGlowingColor(0x00FF00); // Green for shearable
    });
} else {
    Chat.log("&7No snow golems can be sheared at the moment.");
}
```

**Parameters:** None

**Returns:** `boolean` - `true` if this snow golem can be sheared, `false` otherwise

**Notes:** Snow golems can be sheared with shears, which removes their pumpkin hat and drops it as an item. This is useful for recovering pumpkins from damaged snow golems or for defensive purposes.

---

## Usage Examples

### Snow Golem Farm Management System
```js
// Comprehensive snow golem farm management and automation
class SnowGolemFarm {
    constructor() {
        this.managedGolems = new Map();
        this.farmStats = {
            totalGolems: 0,
            pumpkinGolems: 0,
            noPumpkinGolems: 0,
            shearableGolems: 0,
            farmRadius: 32
        };
        this.alertLevels = {
            veryClose: 4,
            close: 8,
            medium: 16
        };
        this.lastScan = 0;
        this.scanInterval = 20 * 3; // Every 3 seconds
    }

    scanFarm() {
        const entities = World.getEntities(this.farmRadius);
        const player = Player.getPlayer();

        if (!player) return;

        const currentGolemUUIDs = new Set();
        this.farmStats = {
            totalGolems: 0,
            pumpkinGolems: 0,
            noPumpkinGolems: 0,
            shearableGolems: 0
        };

        entities.forEach(entity => {
            if (entity.is("minecraft:snow_golem")) {
                const uuid = entity.getUUID();
                const snowGolem = entity.asSnowGolem();
                const distance = player.distanceTo(entity);
                const pos = entity.getPos();

                currentGolemUUIDs.add(uuid);
                this.farmStats.totalGolems++;

                const hasPumpkin = snowGolem.hasPumpkin();
                const isShearable = snowGolem.isShearable();

                if (hasPumpkin) {
                    this.farmStats.pumpkinGolems++;
                } else {
                    this.farmStats.noPumpkinGolems++;
                }

                if (isShearable) {
                    this.farmStats.shearableGolems++;
                }

                // Create or update golem data
                let golemData = this.managedGolems.get(uuid);
                if (!golemData) {
                    golemData = {
                        entity: entity,
                        snowGolem: snowGolem,
                        firstSeen: Client.getTime(),
                        pumpkinStatus: hasPumpkin,
                        shearableStatus: isShearable
                    };
                    this.managedGolems.set(uuid, golemData);
                } else {
                    golemData.lastSeen = Client.getTime();
                    golemData.pumpkinStatus = hasPumpkin;
                    golemData.shearableStatus = isShearable;
                }

                this.handleDistanceBasedInteraction(entity, distance, hasPumpkin, isShearable);
            }
        });

        // Clean up old golems
        this.cleanupOldGolems(currentGolemUUIDs);
    }

    handleDistanceBasedInteraction(entity, distance, hasPumpkin, isShearable) {
        const player = Player.getPlayer();
        if (!player) return;

        // Clear previous glow effects
        entity.resetGlowing();

        if (distance <= this.alertLevels.veryClose) {
            // Very close - use intense color
            entity.setGlowing(true);
            if (hasPumpkin) {
                entity.setGlowingColor(0x00FFFF); // Cyan for functional
            } else {
                entity.setGlowingColor(0xFFA500); // Orange for missing pumpkin
            }

            const status = hasPumpkin ? "functional" : "missing pumpkin";
            Chat.actionbar(`&aSnow Golem nearby - ${status} (${distance.toFixed(1)}m)`);
        } else if (distance <= this.alertLevels.close) {
            // Close - subtle glow
            entity.setGlowing(true);
            entity.setGlowingColor(0x444444); // Dark gray
        } else if (distance <= this.alertLevels.medium) {
            // Medium distance - very subtle glow
            entity.setGlowing(true);
            entity.setGlowingColor(0x222222); // Very dark gray
        }
    }

    cleanupOldGolems(currentUUIDs) {
        const cutoffTime = Client.getTime() - 60000; // 1 minute cutoff

        for (const [uuid, golemData] of this.managedGolems) {
            if (!currentUUIDs.has(uuid) || (Client.getTime() - golemData.firstSeen > cutoffTime)) {
                golemData.entity.resetGlowing();
                this.managedGolems.delete(uuid);
            }
        }
    }

    highlightPumpkinIssues() {
        let issues = 0;

        for (const [uuid, golemData] of this.managedGolems) {
            if (!golemData.pumpkinStatus) {
                golemData.entity.setGlowing(true);
                golemData.entity.setGlowingColor(0xFF0000); // Red for missing pumpkin
                issues++;
            } else {
                golemData.entity.resetGlowing();
            }
        }

        if (issues > 0) {
            Chat.actionbar(`&c${issues} snow golem${issues > 1 ? 's' : ''} missing pumpkins!`);
        }
    }

    highlightShearableGolems() {
        let count = 0;

        for (const [uuid, golemData] of this.managedGolems) {
            if (golemData.shearableStatus && golemData.pumpkinStatus) {
                golemData.entity.setGlowing(true);
                golemData.entity.setGlowingColor(0xFF00FF); // Magenta for shearable
                count++;
            }
        }

        if (count > 0) {
            Chat.actionbar(`&a${count} snow golem${count > 1 ? 's' : ''} can be sheared for pumpkins`);
        }
    }

    generateFarmReport() {
        Chat.log("=== Snow Golem Farm Report ===");
        Chat.log(`Total snow golems in farm: ${this.farmStats.totalGolems}`);
        Chat.log(`With pumpkin: ${this.farmStats.pumpkinGolems}`);
        Chat.log(`Without pumpkin: ${this.farmStats.noPumpkinGolems}`);
        Chat.log(`Shearable: ${this.farmStats.shearableGolems}`);

        if (this.farmStats.noPumpkinGolems > 0) {
            Chat.log("&c⚠️ Consider replacing pumpkins on missing ones!");
        }

        if (this.farmStats.pumpkinGolems === 0 && this.farmStats.totalGolems > 0) {
            Chat.log("&e💡 Tip: Snow golems need pumpkins to attack hostile mobs");
        }

        // Calculate efficiency
        const efficiency = this.farmStats.totalGolems > 0 ?
            (this.farmStats.pumpkinGolems / this.farmStats.totalGolems * 100).toFixed(1) : 0;
        Chat.log(`Farm efficiency: ${efficiency}%`);

        // Maintenance suggestions
        if (this.farmStats.shearableGolems > this.farmStats.pumpkinGolems / 2) {
            Chat.log("&e💡 Consider shearing some golems to get spare pumpkins");
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        this.scanFarm();
        this.highlightPumpkinIssues();
    }
}

// Initialize the snow golem farm manager
const snowFarm = new SnowGolemFarm();

// Update every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    snowFarm.update();
}));

// Generate report every minute
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60) === 0) {
        snowFarm.generateFarmReport();
    }
}));

Chat.log("&aSnow Golem Farm Manager activated!");
Chat.log("&7Monitoring your defensive snow golem farm...");
```

### Pumpkin Recovery Assistant
```js
// Helper to recover pumpkins from damaged snow golems
class PumpkinRecovery {
    constructor() {
        this.shearsAvailable = false;
        this.playerInventory = null;
        this.recoveredPumpkins = 0;
    }

    checkInventory() {
        const player = Player.getPlayer();
        if (!player) return false;

        this.playerInventory = Player.getInventory();
        if (!this.playerInventory) return false;

        // Check for shears in hotbar and inventory
        for (let i = 0; i < this.playerInventory.getSize(); i++) {
            const item = this.playerInventory.getStack(i);
            if (item && item.getId() === "minecraft:shears") {
                this.shearsAvailable = true;
                return true;
            }
        }

        this.shearsAvailable = false;
        return false;
    }

    findRecoveryTargets() {
        const player = Player.getPlayer();
        if (!player) return [];

        const targets = [];
        const entities = World.getEntities(16); // 16 block range

        entities.forEach(entity => {
            if (entity.is("minecraft:snow_golem")) {
                const snowGolem = entity.asSnowGolem();
                const distance = player.distanceTo(entity);

                if (snowGolem.isShearable() && snowGolem.hasPumpkin()) {
                    targets.push({
                        entity: entity,
                        snowGolem: snowGolem,
                        distance: distance,
                        position: entity.getPos()
                    });
                }
            }
        });

        // Sort by distance
        return targets.sort((a, b) => a.distance - b.distance);
    }

    highlightRecoveryTargets(targets) {
        // Clear previous highlights
        World.getEntities(20).forEach(entity => {
            if (entity.is("minecraft:snow_golem")) {
                entity.resetGlowing();
            }
        });

        if (targets.length === 0) return;

        Chat.log(`&aFound ${targets.length} potential pumpkin recovery target${targets.length > 1 ? 's' : ''}:`);

        targets.slice(0, 5).forEach((target, index) => {
            const color = index === 0 ? 0xFFD700 : 0xFFA500; // Gold for closest, orange for others
            target.entity.setGlowing(true);
            target.entity.setGlowingColor(color);

            Chat.log(`  ${index + 1}. ${target.distance.toFixed(1)}m away at [${target.position.x.toFixed(0)}, ${target.position.y.toFixed(0)}, ${target.position.z.toFixed(0)}]`);
        });
    }

    showRecoveryInstructions() {
        if (!this.shearsAvailable) {
            Chat.log("&eYou need shears to recover pumpkins from snow golems!");
            Chat.log("&7Craft shears with 2 iron ingots in a diagonal pattern");
            return false;
        }

        const targets = this.findRecoveryTargets();
        if (targets.length === 0) {
            Chat.log("&7No snow golems with pumpkins found in range");
            return false;
        }

        Chat.log("&aRight-click on highlighted snow golems with shears to recover pumpkins");
        Chat.log(`&7Found ${targets.length} golem${targets.length > 1 ? 's' : ''} that can be sheared`);

        return true;
    }

    generateRecoveryReport() {
        const targets = this.findRecoveryTargets();

        Chat.log("=== Pumpkin Recovery Report ===");
        Chat.log(`Potential targets: ${targets.length}`);
        Chat.log(`Your shears: ${this.shearsAvailable ? "&aAvailable" : "&cMissing"}`);

        if (targets.length > 0) {
            Chat.log("\n&aClosest targets:");
            targets.slice(0, 3).forEach((target, index) => {
                Chat.log(`  ${index + 1}. ${target.distance.toFixed(1)}m away`);
            });
        }

        if (!this.shearsAvailable) {
            Chat.log("\n&c💡 Get shears to start recovering pumpkins!");
        }
    }

    update() {
        this.checkInventory();

        if (this.shearsAvailable) {
            const targets = this.findRecoveryTargets();
            this.highlightRecoveryTargets(targets);

            if (targets.length > 0) {
                Chat.actionbar(`&aReady to recover ${targets.length} pumpkin${targets.length > 1 ? 's' : ''}!`);
            }
        }
    }
}

// Initialize pumpkin recovery assistant
const pumpkinRecovery = new PumpkinRecovery();

// Update every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 5) === 0) {
        pumpkinRecovery.update();
    }
}));

// Show instructions when player has shears
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 20 === 0) { // Every second
        const player = Player.getPlayer();
        if (player) {
            const mainHand = player.getMainHand();
            if (mainHand && mainHand.getId() === "minecraft:shears") {
                pumpkinRecovery.showRecoveryInstructions();
            }
        }
    }
}));

// Generate recovery report every 2 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 2) === 0) {
        pumpkinRecovery.generateRecoveryReport();
    }
}));

Chat.log("&aPumpkin Recovery Assistant activated!");
Chat.log("&7Hold shears to see recovery targets and instructions...");
```

### Snow Golem Defensive System
```js
// Advanced defensive system using snow golems for base protection
class SnowGolemDefense {
    constructor() {
        this.defensiveGolems = new Map();
        this.threatDetection = {
            hostileMobs: ["minecraft:zombie", "minecraft:skeleton", "minecraft:spider", "minecraft:creeper", "minecraft:witch"],
            detectionRadius: 24,
            engagementRadius: 16
        };
        this.alerts = {
            threatsNearby: 0,
            activeDefenders: 0,
            golemsWithoutPumpkin: 0
        };
        this.lastUpdate = 0;
        this.updateInterval = 20 * 2; // Every 2 seconds
    }

    setupDefensivePositions() {
        // Define defensive positions around your base
        this.defensivePositions = [
            { x: -64, y: 64, z: 128 },  // West guard post
            { x: 64, y: 64, z: 128 },   // East guard post
            { x: 0, y: 64, z: 160 },    // North guard post
            { x: 0, y: 64, z: 96 }      // South guard post
        ];

        Chat.log("&aDefensive positions initialized");
        this.scanDefensiveGolems();
    }

    scanDefensiveGolems() {
        const player = Player.getPlayer();
        if (!player) return;

        this.defensiveGolems.clear();
        this.alerts = {
            threatsNearby: 0,
            activeDefenders: 0,
            golemsWithoutPumpkin: 0
        };

        World.getEntities(this.threatDetection.detectionRadius).forEach(entity => {
            if (entity.is("minecraft:snow_golem")) {
                const snowGolem = entity.asSnowGolem();
                const distance = player.distanceTo(entity);
                const pos = entity.getPos();

                // Check if this is near a defensive position
                const nearDefense = this.defensivePositions.some(defPos => {
                    const defDistance = Math.sqrt(
                        Math.pow(pos.x - defPos.x, 2) +
                        Math.pow(pos.y - defPos.y, 2) +
                        Math.pow(pos.z - defPos.z, 2)
                    );
                    return defDistance <= 8;
                });

                if (nearDefense) {
                    const hasPumpkin = snowGolem.hasPumpkin();
                    const isShearable = snowGolem.isShearable();

                    this.defensiveGolems.set(entity.getUUID(), {
                        entity: entity,
                        snowGolem: snowGolem,
                        position: pos,
                        hasPumpkin: hasPumpkin,
                        isShearable: isShearable,
                        distance: distance
                    });

                    if (hasPumpkin) {
                        this.alerts.activeDefenders++;
                    } else {
                        this.alerts.golemsWithoutPumpkin++;
                    }
                }
            }
        });
    }

    detectThreats() {
        const player = Player.getPlayer();
        if (!player) return [];

        const threats = [];

        World.getEntities(this.threatDetection.detectionRadius).forEach(entity => {
            if (this.threatDetection.hostileMobs.some(mobType => entity.is(mobType))) {
                const distance = player.distanceTo(entity);
                if (distance <= this.threatDetection.engagementRadius) {
                    threats.push({
                        entity: entity,
                        type: entity.getType(),
                        distance: distance,
                        position: entity.getPos()
                    });
                    this.alerts.threatsNearby++;
                }
            }
        });

        return threats;
    }

    highlightDefensiveStatus() {
        // Clear all highlights
        World.getEntities(30).forEach(entity => {
            if (entity.is("minecraft:snow_golem")) {
                entity.resetGlowing();
            }
        });

        this.alerts.threatsNearby = 0;

        // Highlight defensive golems
        for (const [uuid, golemData] of this.defensiveGolems) {
            if (golemData.hasPumpkin) {
                golemData.entity.setGlowing(true);
                golemData.entity.setGlowingColor(0x00FF00); // Green for active defenders
            } else {
                golemData.entity.setGlowing(true);
                golemData.entity.setGlowingColor(0xFFA500); // Orange for missing pumpkin
            }
        }

        // Highlight threats
        const threats = this.detectThreats();
        threats.forEach(threat => {
            threat.entity.setGlowing(true);
            threat.entity.setGlowingColor(0xFF0000); // Red for threats
        });

        // Update player with status
        if (this.alerts.threatsNearby > 0) {
            Chat.actionbar(`&c🛡️ ${this.alerts.threatsNearby} hostile mob${this.alerts.threatsNearby > 1 ? 's' : ''} detected!`);
        } else {
            Chat.actionbar(`&a✓ Base secure - ${this.alerts.activeDefenders} active defenders`);
        }

        if (this.alerts.golemsWithoutPumpkin > 0) {
            Chat.actionbar(`&e⚠️ ${this.alerts.golemsWithoutPumpkin} defender${this.alerts.golemsWithoutPumpkin > 1 ? 's' : ''} missing pumpkins`);
        }
    }

    generateDefenseReport() {
        this.scanDefensiveGolems();
        const threats = this.detectThreats();

        Chat.log("=== Snow Golem Defense Report ===");
        Chat.log(`Defensive golems: ${this.defensiveGolems.size}`);
        Chat.log(`Active defenders: ${this.alerts.activeDefenders}`);
        Chat.log(`Missing pumpkins: ${this.alerts.golemsWithoutPumpkin}`);
        Chat.log(`Hostile threats: ${this.alerts.threatsNearby}`);

        if (this.alerts.activeDefenders === 0 && this.defensiveGolems.size > 0) {
            Chat.log("&c❌ All defensive golems need pumpkins!");
            Chat.log("&7Add pumpkins to make them functional");
        } else if (this.alerts.activeDefenders < this.defensiveGolems.size / 2) {
            Chat.log("&e⚠️ Low defender efficiency");
        }

        if (threats.length > 0) {
            Chat.log("\n&cHostile threats detected:");
            threats.slice(0, 3).forEach((threat, index) => {
                const mobName = threat.type.replace("minecraft:", "").toUpperCase();
                Chat.log(`  ${index + 1}. ${mobName} - ${threat.distance.toFixed(1)}m away`);
            });
        }

        // Maintenance recommendations
        if (this.alerts.golemsWithoutPumpkin > 0) {
            Chat.log("\n&e💡 Maintenance needed:");
            Chat.log("  - Add pumpkins to defensive golems");
            Chat.log("  - Consider backup pumpkin supply");
        }

        if (this.alerts.activeDefenders < 2) {
            Chat.log("\n&e🛡️ Defense recommendations:");
            Chat.log("  - Add more defensive golems");
            Chat.log("  - Ensure good sight lines for golems");
        }
    }

    update() {
        if (Client.getTime() - this.lastUpdate < this.updateInterval) return;

        this.lastUpdate = Client.getTime();
        this.highlightDefensiveStatus();
    }
}

// Initialize defensive system
const defenseSystem = new SnowGolemDefense();
defenseSystem.setupDefensivePositions();

// Update defensive status every 2 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    defenseSystem.update();
}));

// Generate defense report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        defenseSystem.generateDefenseReport();
    }
}));

Chat.log("&aSnow Golem Defense System activated!");
Chat.log("&7Monitoring base security and defensive golem status...");
```

## Notes and Limitations

- SnowGolemEntityHelper instances become invalid when the snow golem entity is removed from the world. Always check `isAlive()` before accessing snow golem data.
- `hasPumpkin()` returns `true` only when snow golems have their characteristic pumpkin hat. Without a pumpkin, snow golems cannot attack hostile mobs but will still produce snow particles and push entities away.
- `isShearable()` checks if a snow golem can be sheared with shears, which removes the pumpkin and drops it as an item. This is the only way to recover pumpkins from snow golems.
- Snow golems require clear line of sight to engage hostile mobs - they won't attack through solid blocks.
- The inheritance hierarchy provides access to comprehensive mob functionality including AI states, health monitoring, and basic entity operations.
- Snow golems create snow particles in cold biomes and push entities away, making them useful for clearing areas or creating snow paths.
- For defensive purposes, consider positioning snow golems in elevated positions with good visibility of your base perimeter.
- Snow golems will attack most hostile mobs except for creepers (to avoid explosions), guardians/elder guardians (water-based), and shulkers (flying).

## Related Classes

- `MobEntityHelper` - Base class for mob entities with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemHelper` - Item information for working with pumpkins and shears
- `ItemStackHelper` - ItemStack information for inventory management

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft SnowGolemEntity implementation
- Inherits comprehensive functionality from the mob entity hierarchy
- Designed specifically for snow golem farm automation and defensive systems

---

**See Also:**
- [EntityHelper.asSnowGolem()](#entityassnowgolem) - Method to cast entities to SnowGolemEntityHelper
- [MobEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\MobEntityHelper.md) - Mob entity base class with AI and combat states
- [LivingEntityHelper](F:\java\JsMacros\JsMacros-Docs\classes\LivingEntityHelper.md) - Living entity functionality