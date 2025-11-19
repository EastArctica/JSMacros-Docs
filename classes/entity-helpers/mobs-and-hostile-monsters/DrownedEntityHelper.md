# DrownedEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.mob.DrownedEntityHelper`

**Extends:** `ZombieEntityHelper<DrownedEntity>`

**Since:** JsMacros 1.8.4

Represents a drowned entity in the world. DrownedEntityHelper provides access to drowned-specific properties and behaviors, particularly their weapon holding capabilities and equipment states. Drowned are underwater zombie variants that spawn in oceans and rivers, wielding tridents or nautilus shells as their signature weapons.

Drowned are formidable aquatic hostile mobs that result from zombies remaining underwater for extended periods. They have adapted to their underwater environment with enhanced swimming abilities and preferential spawning in water biomes. What makes drowned particularly dangerous is their arsenal - some wield powerful tridents that can be thrown at players from a distance, while others may carry nautilus shells used for conduit activation.

This class extends `ZombieEntityHelper` and inherits all methods for zombie behaviors, including conversion states, while adding drowned-specific functionality for weapon detection and equipment analysis. This makes it invaluable for assessing combat threats and understanding drowned behavior patterns.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Related Classes](#related-classes)

---

## Constructors

DrownedEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityDeath`, `EntityInteract`, `EntitySpawn`, `ProjectileHit`)
- World entity queries and type casting
- Methods that return drowned entities
- Type casting from EntityHelper using `as("minecraft:drowned")` or appropriate casting methods

---

## Methods

## Usage Examples

### Drowned Combat Analysis and Strategy
```js
// Comprehensive drowned combat analysis
function analyzeDrownedCombatSituation() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const drownedEntities = entities.filter(entity => entity.is("minecraft:drowned"));

    if (drownedEntities.length === 0) {
        Chat.log("No drowned detected in the area");
        return;
    }

    Chat.log(`=== DROWNED COMBAT ANALYSIS (${drownedEntities.length} detected) ===`);

    const analysis = {
        total: drownedEntities.length,
        tridentWielders: 0,
        shellCarriers: 0,
        unarmed: 0,
        inWater: 0,
        onLand: 0,
        withinRange: { near: 0, medium: 0, far: 0 },
        threatLevel: { low: 0, medium: 0, high: 0, extreme: 0 }
    };

    drownedEntities.forEach(drownedEntity => {
        const drowned = drownedEntity.as("minecraft:drowned");
        const distance = player.distanceTo(drownedEntity);
        const pos = drownedEntity.getPos();

        // Equipment analysis
        if (drowned.hasTrident()) {
            analysis.tridentWielders++;
            analysis.threatLevel.high++;
        } else if (drowned.hasNautilusShell()) {
            analysis.shellCarriers++;
            analysis.threatLevel.low++;
        } else {
            analysis.unarmed++;
            analysis.threatLevel.medium++;
        }

        // Environmental analysis
        if (drownedEntity.isInWater()) {
            analysis.inWater++;
        } else {
            analysis.onLand++;
        }

        // Distance categories
        if (distance <= 16) analysis.withinRange.near++;
        else if (distance <= 32) analysis.withinRange.medium++;
        else analysis.withinRange.far++;

        // Detailed logging for nearby drowned
        if (distance <= 32) {
            let status = [];
            if (drowned.hasTrident()) status.push("🔱 Trident");
            if (drowned.hasNautilusShell()) status.push("🐚 Shell");
            if (drownedEntity.isInWater()) status.push("💧 Water");
            if (drownedEntity.isOnFire()) status.push("🔥 Burning");

            Chat.log(`  Drowned at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]: ${distance.toFixed(1)}m - ${status.join(", ") || " unarmed"}`);
        }
    });

    // Summary analysis
    Chat.log("\n=== COMBAT SUMMARY ===");
    Chat.log(`Total drowned: ${analysis.total}`);
    Chat.log(`Trident wielders: ${analysis.tridentWielders} (${((analysis.tridentWielders/analysis.total)*100).toFixed(1)}%)`);
    Chat.log(`Shell carriers: ${analysis.shellCarriers} (${((analysis.shellCarriers/analysis.total)*100).toFixed(1)}%)`);
    Chat.log(`Unarmed: ${analysis.unarmed} (${((analysis.unarmed/analysis.total)*100).toFixed(1)}%)`);

    Chat.log("\nEnvironmental Distribution:");
    Chat.log(`In water: ${analysis.inWater} (${((analysis.inWater/analysis.total)*100).toFixed(1)}%)`);
    Chat.log(`On land: ${analysis.onLand} (${((analysis.onLand/analysis.total)*100).toFixed(1)}%)`);

    Chat.log("\nDistance Distribution:");
    Chat.log(`Near (≤16m): ${analysis.withinRange.near}`);
    Chat.log(`Medium (16-32m): ${analysis.withinRange.medium}`);
    Chat.log(`Far (>32m): ${analysis.withinRange.far}`);

    Chat.log("\nThreat Assessment:");
    Chat.log(`Low threat (Shell carriers): ${analysis.threatLevel.low}`);
    Chat.log(`Medium threat (Unarmed): ${analysis.threatLevel.medium}`);
    Chat.log(`High threat (Trident wielders): ${analysis.threatLevel.high}`);

    // Combat recommendations
    Chat.log("\n=== COMBAT RECOMMENDATIONS ===");

    if (analysis.tridentWielders > 0) {
        Chat.log("&c⚔️ TRIDENT COMBAT:");
        Chat.log("  • Use shield to block projectile attacks");
        Chat.log("  • Keep moving to avoid trident throws");
        Chat.log("  • Attack from range or use hit-and-run tactics");
        Chat.log("  • Prioritize these targets - they're most dangerous");
    }

    if (analysis.shellCarriers > 0) {
        Chat.log("&a🐚 COLLECTION OPPORTUNITIES:");
        Chat.log("  • Target shell carriers for valuable resources");
        Chat.log("  • Easy combat - shells offer no protection");
        Chat.log("  • Collect shells for conduit crafting");
        Chat.log("  • Safe to engage even for inexperienced players");
    }

    if (analysis.inWater > analysis.onLand) {
        Chat.log("&e💧 AQUATIC COMBAT:");
        Chat.log("  • Most drowned are in water - their home advantage");
        Chat.log("  • Consider fighting from land if possible");
        Chat.log("  • Use ranged weapons when engaging in water");
        Chat.log("  • Watch your oxygen bar during underwater combat");
    }

    // Priority targeting
    if (analysis.withinRange.near > 0) {
        Chat.log("\n🎯 IMMEDIATE THREATS:");
        Chat.log(`${analysis.withinRange.near} drowned within 16 blocks - immediate attention required!`);

        if (analysis.tridentWielders > 0 && analysis.withinRange.near > 0) {
            Chat.log("&cCRITICAL: Trident-wielding drowned at close range! Take evasive action!");
        }
    }
}

// Run analysis periodically
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.d" && e.action === 1) { // D key
        analyzeDrownedCombatSituation();
    }
}));
```

### Drowned Patrol and Early Warning System
```js
// Advanced drowned detection and warning system
class DrownedPatrolSystem {
    constructor() {
        this.drownedSightings = new Map();
        this.tridentWarnings = new Set();
        this.shellAlerts = new Set();
        this.patrolStats = {
            totalSightings: 0,
            tridentSightings: 0,
            shellSightings: 0,
            closeEncounters: 0,
            warningsIssued: 0
        };
        this.warningCooldown = new Map();
    }

    patrolArea() {
        const player = Player.getPlayer();
        if (!player) return;

        const entities = World.getEntities();
        const drownedEntities = entities.filter(entity => entity.is("minecraft:drowned"));
        const patrolRange = 48;
        const currentTime = Client.getTime();

        let newSightings = 0;
        let criticalThreats = 0;

        drownedEntities.forEach(drownedEntity => {
            const distance = player.distanceTo(drownedEntity);
            if (distance <= patrolRange) {
                const drowned = drownedEntity.as("minecraft:drowned");
                const uuid = drownedEntity.getUUID();
                const hasTrident = drowned.hasTrident();
                const hasShell = drowned.hasNautilusShell();
                const pos = drownedEntity.getPos();

                // Update patrol statistics
                this.patrolStats.totalSightings++;
                if (hasTrident) {
                    this.patrolStats.tridentSightings++;
                    criticalThreats++;
                }
                if (hasShell) {
                    this.patrolStats.shellSightings++;
                }

                if (distance <= 16) {
                    this.patrolStats.closeEncounters++;
                }

                // Check if this is a new sighting
                if (!this.drownedSightings.has(uuid)) {
                    newSightings++;
                    this.drownedSightings.set(uuid, {
                        entity: drownedEntity,
                        firstSeen: currentTime,
                        lastSeen: currentTime,
                        positions: [pos],
                        equipment: {
                            hasTrident,
                            hasShell,
                            lastChecked: currentTime
                        }
                    });

                    // Issue initial sighting alert
                    this.issueSightingAlert(drownedEntity, hasTrident, hasShell, distance);
                } else {
                    // Update existing sighting
                    const sighting = this.drownedSightings.get(uuid);
                    sighting.lastSeen = currentTime;
                    sighting.positions.push(pos);

                    // Keep only recent positions (last 10)
                    if (sighting.positions.length > 10) {
                        sighting.positions.shift();
                    }

                    // Check for equipment changes
                    if (currentTime - sighting.equipment.lastChecked >= 40) { // Check every 2 seconds
                        const currentHasTrident = drowned.hasTrident();
                        const currentHasShell = drowned.hasNautilusShell();

                        if (currentHasTrident !== sighting.equipment.hasTrident) {
                            this.issueEquipmentChangeAlert(drownedEntity, 'trident', currentHasTrident);
                            sighting.equipment.hasTrident = currentHasTrident;
                        }

                        if (currentHasShell !== sighting.equipment.hasShell) {
                            this.issueEquipmentChangeAlert(drownedEntity, 'shell', currentHasShell);
                            sighting.equipment.hasShell = currentHasShell;
                        }

                        sighting.equipment.lastChecked = currentTime;
                    }
                }

                // Proximity warnings for close threats
                if (distance <= 20) {
                    this.issueProximityWarning(drownedEntity, hasTrident, distance);
                }
            }
        });

        // Clean up old sightings
        this.cleanupOldSightings();

        // Summary report
        if (newSightings > 0) {
            Chat.actionbar(`&e👁️ Drowned Patrol: ${newSightings} new sightings, ${criticalThreats} critical threats`);
        }

        if (criticalThreats > 2) {
            Chat.log(`&c⚠️ HIGH THREAT LEVEL: ${criticalThreats} trident-wielding drowned detected!`);
        }
    }

    issueSightingAlert(drownedEntity, hasTrident, hasShell, distance) {
        const pos = drownedEntity.getPos();
        const location = `(${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)})`;

        let alert = "&e👁️ DROWNED SIGHTING: ";
        let details = [];

        if (hasTrident) {
            alert += "🔱 ARMED WITH TRIDENT";
            details.push("EXTREME CAUTION - Ranged attacks");
        } else if (hasShell) {
            alert += "🐚 CARRYING NAUTILUS SHELL";
            details.push("Valuable target - harmless combat");
        } else {
            alert += "👊 UNARMED";
            details.push("Standard melee threat");
        }

        Chat.log(alert);
        Chat.log(`  Location: ${location}`);
        Chat.log(`  Distance: ${distance.toFixed(1)} blocks`);

        details.forEach(detail => {
            Chat.log(`  • ${detail}`);
        });

        this.patrolStats.warningsIssued++;
    }

    issueProximityWarning(drownedEntity, hasTrident, distance) {
        const uuid = drownedEntity.getUUID();
        const currentTime = Client.getTime();

        // Cooldown to prevent spam
        if (this.warningCooldown.has(uuid)) {
            if (currentTime - this.warningCooldown.get(uuid) < 60) { // 3 second cooldown
                return;
            }
        }

        this.warningCooldown.set(uuid, currentTime);

        const warning = hasTrident ?
            `&c🔱 TRIDENT DROWNED ${distance.toFixed(0)}m AWAY!` :
            `&e👊 DROWNED ${distance.toFixed(0)}m AWAY!`;

        Chat.actionbar(warning);
        this.patrolStats.warningsIssued++;

        // Additional warning for very close trident drowned
        if (hasTrident && distance <= 12) {
            Chat.log(`&c‼️ CRITICAL: Trident-wielding drowned at ${distance.toFixed(1)} blocks - TAKE COVER!`);
        }
    }

    issueEquipmentChangeAlert(drownedEntity, equipmentType, nowHas) {
        const pos = drownedEntity.getPos();
        const action = nowHas ? "EQUIPPED" : "LOST";

        if (equipmentType === 'trident') {
            Chat.log(`&c⚔️ EQUIPMENT CHANGE: Drowned ${action} trident at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
        } else if (equipmentType === 'shell') {
            Chat.log(`&a🐚 EQUIPMENT CHANGE: Drowned ${action} nautilus shell at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
        }
    }

    cleanupOldSightings() {
        const currentTime = Client.getTime();
        const cleanupTime = 600; // Remove sightings older than 30 seconds

        for (const [uuid, sighting] of this.drownedSightings) {
            if (currentTime - sighting.lastSeen > cleanupTime || !sighting.entity.isAlive()) {
                this.drownedSightings.delete(uuid);
                this.warningCooldown.delete(uuid);
            }
        }
    }

    generatePatrolReport() {
        if (this.drownedSightings.size === 0) {
            Chat.log("No drowned currently tracked by patrol system");
            return;
        }

        Chat.log(`&6=== DROWNED PATROL REPORT ===`);
        Chat.log(`Currently tracking: ${this.drownedSightings.size} drowned`);
        Chat.log(`Total patrol statistics:`);
        Chat.log(`  • Total sightings: ${this.patrolStats.totalSightings}`);
        Chat.log(`  • Trident sightings: ${this.patrolStats.tridentSightings}`);
        Chat.log(`  • Shell sightings: ${this.patrolStats.shellSightings}`);
        Chat.log(`  • Close encounters: ${this.patrolStats.closeEncounters}`);
        Chat.log(`  • Warnings issued: ${this.patrolStats.warningsIssued}`);

        // Current threat analysis
        let currentTridents = 0;
        let currentShells = 0;
        let nearbyThreats = 0;

        const player = Player.getPlayer();
        for (const [uuid, sighting] of this.drownedSightings) {
            if (sighting.equipment.hasTrident) currentTridents++;
            if (sighting.equipment.hasShell) currentShells++;

            const distance = player.distanceTo(sighting.entity);
            if (distance <= 20) nearbyThreats++;
        }

        Chat.log(`\n&6Current threats in area:`);
        Chat.log(`  • Trident wielders: ${currentTridents}`);
        Chat.log(`  • Shell carriers: ${currentShells}`);
        Chat.log(`  • Within 20 blocks: ${nearbyThreats}`);

        // Movement analysis
        if (this.drownedSightings.size > 0) {
            Chat.log(`\n&6Movement patterns:`);
            for (const [uuid, sighting] of this.drownedSightings) {
                const positions = sighting.positions;
                if (positions.length >= 3) {
                    const totalMovement = this.calculateTotalMovement(positions);
                    const timeElapsed = (Client.getTime() - sighting.firstSeen) / 20; // seconds
                    const avgSpeed = totalMovement / timeElapsed;

                    Chat.log(`  ${sighting.entity.getName().getString()}: ${avgSpeed.toFixed(2)} blocks/sec`);
                }
            }
        }
    }

    calculateTotalMovement(positions) {
        let totalMovement = 0;
        for (let i = 1; i < positions.length; i++) {
            totalMovement += positions[i].distanceTo(positions[i-1]);
        }
        return totalMovement;
    }
}

const drownedPatrol = new DrownedPatrolSystem();

// Active patrol system
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    // Patrol every 2 seconds (40 ticks)
    if (Client.getTime() % 40 === 0) {
        drownedPatrol.patrolArea();
    }
}));

// Patrol report command
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.p" && e.action === 1) { // P key
        drownedPatrol.generatePatrolReport();
    }
}));
```

---

## Inherited Methods

From `ZombieEntityHelper`:

- `isConvertingToDrowned()` - Check if zombie is converting (though drowned are already converted)

From `MobEntityHelper`:

- `isAttacking()` - Check if drowned is currently attacking
- `isAiDisabled()` - Check if drowned's AI is disabled
- All other mob-specific methods for behavior control

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information
- `getStatusEffects()` - Active status effects
- `getMainHand()`, `getOffHand()` - Equipment information (complements `hasTrident()` and `hasNautilusShell()`)
- `getArmor()` - Armor value
- `isBaby()` - Check if drowned is a baby variant (rare but possible)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks

---

## Notes and Limitations

- DrownedEntityHelper provides specialized methods for detecting drowned-specific equipment
- The `hasTrident()` method is crucial for threat assessment as trident-wielding drowned are significantly more dangerous
- The `hasNautilusShell()` method helps identify valuable farming targets for conduit crafting
- Drowned can spawn with tridents, nautilus shells, or nothing - each scenario requires different combat approaches
- Trident-wielding drowned can throw their weapon from up to 20 blocks away with considerable accuracy
- Nautilus shells have no combat value but are essential for conduit construction
- Drowned are faster and more agile in water than on land, affecting combat strategy
- Baby drowned can exist and move faster than adult variants, making them particularly dangerous
- Drowned will pick up equipment and armor from the ground, potentially changing their threat level
- The methods check only the main hand - drowned cannot naturally spawn with off-hand equipment
- These methods work in real-time and reflect the drowned's current equipment state

---

## Related Classes

- `ZombieEntityHelper` - Parent class with zombie-specific behaviors and conversion methods
- `MobEntityHelper` - Base class with AI and combat behaviors
- `LivingEntityHelper` - Base class with health, movement, and status effects
- `EntityHelper` - Base class with general entity methods
- `ZombieVillagerEntityHelper` - Specialized helper for zombie villagers
- `PlayerEntityHelper` - Player-related functionality for combat interactions
- `ItemHelper` - For analyzing trident and nautilus shell items when dropped

---

## Version Information

- Available since JSMacros 1.8.4
- Author: Etheradon
- Extends ZombieEntityHelper functionality with drowned-specific equipment detection
- Part of the specialized entity helper hierarchy for comprehensive drowned interaction
- Supports all drowned behaviors and equipment states including natural spawning variations