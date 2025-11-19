# ArmorStandEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.decoration.ArmorStandEntityHelper`

**Extends:** `LivingEntityHelper<ArmorStandEntity>`

The `ArmorStandEntityHelper` class provides specialized methods for interacting with armor stand entities in Minecraft. Armor stands are decorative entities that can be customized with different poses, visibility settings, and equipment. This helper allows you to query and manipulate various properties of armor stands including their pose, visibility, physical characteristics, and limb rotations.

This class inherits all methods from `LivingEntityHelper` and `EntityHelper`, providing access to standard entity operations like positioning, health tracking, and world interaction, in addition to armor stand-specific functionality.

## Constructors

ArmorStandEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity type is `minecraft:armor_stand`
- World entity queries using `World.getEntities()` or other search methods
- Type casting from generic `EntityHelper` instances using `entity.as()` methods
- The static casting methods when you know an entity is an armor stand

## Methods

### Properties and State

- [armorStand.isVisible()](#armorstandisvisible)
- [armorStand.isSmall()](#armorstandissmall)
- [armorStand.hasArms()](#armorstandhasarms)
- [armorStand.hasBasePlate()](#armorstandhasbaseplate)
- [armorStand.isMarker()](#armorstandismarker)

### Pose and Rotation

- [armorStand.getHeadRotation()](#armorstandgetheadrotation)
- [armorStand.getBodyRotation()](#armorstandgetbodyrotation)
- [armorStand.getLeftArmRotation()](#armorstandgetleftarmrotation)
- [armorStand.getRightArmRotation()](#armorstandgetrightarmrotation)
- [armorStand.getLeftLegRotation()](#armorstandgetleftlegrotation)
- [armorStand.getRightLegRotation()](#armorstandgetrightlegrotation)

### Inherited Methods

As this extends `LivingEntityHelper`, all standard living entity methods are available including:
- Health and status methods (`getHealth()`, `isAlive()`, etc.)
- Movement and positioning (`getPos()`, `getVelocity()`, etc.)
- Equipment methods (`getEquipment()`, `getMainHand()`, etc.)
- Entity interaction and utility methods

---

## Properties and State

## Pose and Rotation

## Usage Examples

### Comprehensive Armor Stand Analysis
```js
// Analyze all armor stands in the area
function analyzeAllArmorStands() {
    const player = Player.getPlayer();
    if (!player) return;

    const armorStands = World.getEntities("minecraft:armor_stand");
    const playerPos = player.getPos();
    const range = 50; // Check within 50 blocks

    Chat.log("=== Armor Stand Analysis ===");
    Chat.log(`Found ${armorStands.length} armor stands total`);

    let nearbyCount = 0;
    let invisibleCount = 0;
    let smallCount = 0;
    let markerCount = 0;
    let armedCount = 0;
    let floatingCount = 0;

    armorStands.forEach(entity => {
        const distance = player.distanceTo(entity);
        const armorStand = entity.as();
        const pos = entity.getPos();

        // Count nearby armor stands
        if (distance <= range) {
            nearbyCount++;

            // Get detailed information
            const isVisible = armorStand.isVisible();
            const isSmall = armorStand.isSmall();
            const hasArms = armorStand.hasArms();
            const hasBasePlate = armorStand.hasBasePlate();
            const isMarker = armorStand.isMarker();

            // Count properties
            if (!isVisible) invisibleCount++;
            if (isSmall) smallCount++;
            if (hasArms) armedCount++;
            if (!hasBasePlate) floatingCount++;
            if (isMarker) markerCount++;

            // Log detailed info for nearby armor stands
            Chat.log(`\nArmor Stand at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}] (${distance.toFixed(1)}m):`);
            Chat.log(`  Visible: ${isVisible ? "Yes" : "No"}`);
            Chat.log(`  Small: ${isSmall ? "Yes" : "No"}`);
            Chat.log(`  Has Arms: ${hasArms ? "Yes" : "No"}`);
            Chat.log(`  Has Base Plate: ${hasBasePlate ? "Yes" : "No"}`);
            Chat.log(`  Marker: ${isMarker ? "Yes" : "No"}`);

            // Show pose information
            if (!isMarker) {
                const headRotation = armorStand.getHeadRotation();
                const bodyRotation = armorStand.getBodyRotation();
                Chat.log(`  Head Pose: Y=${headRotation[0].toFixed(1)}°, P=${headRotation[1].toFixed(1)}°, R=${headRotation[2].toFixed(1)}°`);
                Chat.log(`  Body Pose: Y=${bodyRotation[0].toFixed(1)}°, P=${bodyRotation[1].toFixed(1)}°, R=${bodyRotation[2].toFixed(1)}°`);
            }
        }
    });

    // Summary statistics
    Chat.log(`\n=== Summary (within ${range} blocks) ===`);
    Chat.log(`Nearby armor stands: ${nearbyCount}`);
    Chat.log(`Invisible: ${invisibleCount}`);
    Chat.log(`Small: ${smallCount}`);
    Chat.log(`Armed: ${armedCount}`);
    Chat.log(`Floating (no base): ${floatingCount}`);
    Chat.log(`Markers: ${markerCount}`);
}

analyzeAllArmorStands();
```

### Armor Stand Pose Detector
```js
// Detect armor stands with specific poses or configurations
function detectSpecialArmorStands() {
    const armorStands = World.getEntities("minecraft:armor_stand");

    Chat.log("=== Special Armor Stand Detection ===");

    armorStands.forEach(entity => {
        const armorStand = entity.as();
        const pos = entity.getPos();
        let isSpecial = false;
        let reasons = [];

        // Check for special properties
        if (!armorStand.isVisible()) {
            isSpecial = true;
            reasons.push("Invisible");
        }

        if (armorStand.isMarker()) {
            isSpecial = true;
            reasons.push("Marker");
        }

        // Check for special poses
        const headRotation = armorStand.getHeadRotation();
        if (Math.abs(headRotation[1]) > 45 || Math.abs(headRotation[2]) > 45) {
            isSpecial = true;
            reasons.push("Unusual Head Pose");
        }

        const leftArmRotation = armorStand.getLeftArmRotation();
        const rightArmRotation = armorStand.getRightArmRotation();
        if (Math.abs(leftArmRotation[2]) > 90 || Math.abs(rightArmRotation[2]) > 90) {
            isSpecial = true;
            reasons.push("Arms Raised");
        }

        // Check for sitting pose
        const leftLegRotation = armorStand.getLeftLegRotation();
        const rightLegRotation = armorStand.getRightLegRotation();
        if (leftLegRotation[1] < -45 && rightLegRotation[1] < -45) {
            isSpecial = true;
            reasons.push("Sitting Pose");
        }

        // Report special armor stands
        if (isSpecial) {
            Chat.log(`Special armor stand at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]:`);
            Chat.log(`  Reasons: ${reasons.join(", ")}`);
        }
    });
}

detectSpecialArmorStands();
```

### Equipment Check for Armed Armor Stands
```js
// Check what armed armor stands are holding
function checkArmorStandEquipment() {
    const armorStands = World.getEntities("minecraft:armor_stand");

    Chat.log("=== Armed Armor Stand Equipment ===");

    armorStands.forEach(entity => {
        const armorStand = entity.as();

        if (armorStand.hasArms()) {
            const pos = entity.getPos();
            const livingEntity = entity.asLiving(); // Access equipment methods
            const equipment = livingEntity.getEquipment();

            Chat.log(`Armed armor stand at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]:`);

            // Check main hand and off hand items
            const mainHand = livingEntity.getMainHand();
            const offHand = livingEntity.getOffHand();

            if (mainHand) {
                Chat.log(`  Main Hand: ${mainHand.getName()} x${mainHand.getCount()}`);
            }

            if (offHand) {
                Chat.log(`  Off Hand: ${offHand.getName()} x${offHand.getCount()}`);
            }

            // Check armor slots
            const headArmor = equipment.getHead();
            const chestArmor = equipment.getChest();
            const legArmor = equipment.getLegs();
            const footArmor = equipment.getFeet();

            if (headArmor) Chat.log(`  Head: ${headArmor.getName()}`);
            if (chestArmor) Chat.log(`  Chest: ${chestArmor.getName()}`);
            if (legArmor) Chat.log(`  Legs: ${legArmor.getName()}`);
            if (footArmor) Chat.log(`  Feet: ${footArmor.getName()}`);

            if (!mainHand && !offHand && !headArmor && !chestArmor && !legArmor && !footArmor) {
                Chat.log(`  No equipment found`);
            }

            Chat.log(""); // Empty line for readability
        }
    });
}

checkArmorStandEquipment();
```

### Armor Stand Tracking System
```js
// Track changes in armor stands over time
class ArmorStandTracker {
    constructor() {
        this.trackedStands = new Map();
        this.lastCheck = 0;
    }

    updateTracking() {
        const currentTime = Date.now();
        if (currentTime - this.lastCheck < 5000) return; // Check every 5 seconds

        const armorStands = World.getEntities("minecraft:armor_stand");
        const currentStands = new Map();

        armorStands.forEach(entity => {
            const uuid = entity.getUUID();
            const armorStand = entity.as();
            const pos = entity.getPos();

            // Create current state snapshot
            const currentState = {
                entity: entity,
                position: { x: pos.x, y: pos.y, z: pos.z },
                visible: armorStand.isVisible(),
                small: armorStand.isSmall(),
                hasArms: armorStand.hasArms(),
                hasBasePlate: armorStand.hasBasePlate(),
                marker: armorStand.isMarker(),
                headRotation: [...armorStand.getHeadRotation()],
                bodyRotation: [...armorStand.getBodyRotation()]
            };

            currentStands.set(uuid, currentState);

            // Check for changes
            if (this.trackedStands.has(uuid)) {
                const previousState = this.trackedStands.get(uuid);
                this.detectChanges(previousState, currentState);
            } else {
                Chat.log(`New armor stand detected: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            }
        });

        // Check for removed armor stands
        for (const [uuid, state] of this.trackedStands) {
            if (!currentStands.has(uuid) && !state.entity.isAlive()) {
                Chat.log(`Armor stand removed: [${state.position.x.toFixed(0)}, ${state.position.y.toFixed(0)}, ${state.position.z.toFixed(0)}]`);
            }
        }

        this.trackedStands = currentStands;
        this.lastCheck = currentTime;
    }

    detectChanges(previous, current) {
        let changes = [];

        // Check position change
        const posDiff = Math.sqrt(
            Math.pow(current.position.x - previous.position.x, 2) +
            Math.pow(current.position.y - previous.position.y, 2) +
            Math.pow(current.position.z - previous.position.z, 2)
        );

        if (posDiff > 0.1) {
            changes.push(`moved ${posDiff.toFixed(1)} blocks`);
        }

        // Check property changes
        if (previous.visible !== current.visible) {
            changes.push(`visibility changed to ${current.visible ? 'visible' : 'invisible'}`);
        }

        if (previous.small !== current.small) {
            changes.push(`size changed to ${current.small ? 'small' : 'normal'}`);
        }

        if (previous.hasArms !== current.hasArms) {
            changes.push(`arms ${current.hasArms ? 'added' : 'removed'}`);
        }

        if (previous.hasBasePlate !== current.hasBasePlate) {
            changes.push(`base plate ${current.hasBasePlate ? 'added' : 'removed'}`);
        }

        if (previous.marker !== current.marker) {
            changes.push(`marker mode ${current.marker ? 'enabled' : 'disabled'}`);
        }

        // Check pose changes
        const headDiff = this.calculateRotationDiff(previous.headRotation, current.headRotation);
        if (headDiff > 5) {
            changes.push(`head pose changed (${headDiff.toFixed(1)}°)`);
        }

        const bodyDiff = this.calculateRotationDiff(previous.bodyRotation, current.bodyRotation);
        if (bodyDiff > 5) {
            changes.push(`body pose changed (${bodyDiff.toFixed(1)}°)`);
        }

        // Report changes
        if (changes.length > 0) {
            const pos = current.position;
            Chat.log(`Armor stand at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]: ${changes.join(', ')}`);
        }
    }

    calculateRotationDiff(rot1, rot2) {
        return Math.sqrt(
            Math.pow(rot1[0] - rot2[0], 2) +
            Math.pow(rot1[1] - rot2[1], 2) +
            Math.pow(rot1[2] - rot2[2], 2)
        );
    }
}

// Create and use the tracker
const tracker = new ArmorStandTracker();

events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    tracker.updateTracking();
}));
```

## Notes and Limitations

- ArmorStandEntityHelper instances are only available when working with entities of type `minecraft:armor_stand`
- The rotation values are returned as arrays `[yaw, pitch, roll]` in degrees
- Rotation values are wrapped to valid ranges (typically 0-360 for yaw, -180 to 180 for pitch and roll)
- Some properties like visibility and equipment may be controlled by server-side logic in multiplayer
- Marker armor stands have no hitbox and cannot be interacted with by players
- Small armor stands have reduced collision boxes and may appear differently in different Minecraft versions
- Arm and leg rotations are only meaningful when the armor stand has arms (for arm rotations) or is not small (for leg rotations)

## Related Classes

- `LivingEntityHelper` - Base class providing health, movement, and equipment methods
- `EntityHelper` - Base class providing position, world interaction, and utility methods
- `EulerAngle` - Minecraft's internal class for representing 3D rotations
- `EquipmentInventory` - Equipment and armor management methods (inherited from LivingEntityHelper)
- `World` - World entity queries and search methods

## Version Information

- Available since JSMacros 1.8.4
- All methods are read-only and query current armor stand state
- Inherits full functionality from LivingEntityHelper and EntityHelper hierarchies