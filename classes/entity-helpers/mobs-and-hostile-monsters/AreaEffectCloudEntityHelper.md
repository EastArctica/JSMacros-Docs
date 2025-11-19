# AreaEffectCloudEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.other.AreaEffectCloudEntityHelper`

**Extends:** `EntityHelper<AreaEffectCloudEntity>`

**Since:** JsMacros 1.8.4

The `AreaEffectCloudEntityHelper` class provides specialized access to Minecraft area effect cloud entities (also known as lingering potions). These entities are created when splash potions or lingering potions are thrown, creating a cloud that applies effects to entities passing through them. This helper extends the base `EntityHelper` class and adds specific functionality for inspecting cloud properties like radius, color, particle effects, and waiting state.

Area effect clouds are commonly used in combat, area denial, and status effect application in Minecraft. They persist for a duration and can affect multiple entities within their radius with various potion effects.

## Constructors

AreaEffectCloudEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events when the entity is an area effect cloud
- World entity queries and searches for lingering potion clouds
- Entity casting using type checking with `is("minecraft:area_effect_cloud")`

## Methods

### AreaEffectCloudEntityHelper-Specific Methods

- [cloud.getRadius()](#cloudgetradius)
- [cloud.getColor()](#cloudgetcolor)
- [cloud.getParticleType()](#cloudgetparticletype)
- [cloud.isWaiting()](#cloudiswaiting)

### Inherited Methods from EntityHelper

AreaEffectCloudEntityHelper inherits all methods from `EntityHelper`, including:

#### Position and Movement
- `getPos()` - Returns the cloud's position as `Pos3D`
- `getBlockPos()` - Returns the cloud's block position as `BlockPosHelper`
- `getX()`, `getY()`, `getZ()` - Returns individual coordinate values
- `getVelocity()` - Returns the cloud's movement velocity

#### Entity Information
- `getName()` - Returns the cloud's name as `TextHelper`
- `getType()` - Returns the entity type as string
- `getUUID()` - Returns the unique identifier of the cloud
- `isAlive()` - Checks if the cloud is still active

#### Visual Methods
- `setGlowing(boolean)` - Sets whether the cloud should glow
- `setGlowingColor(int)` - Sets the glowing effect color
- `resetGlowing()` - Resets the glowing effect to default

---

## AreaEffectCloudEntityHelper-Specific Methods

## Usage Examples

### Comprehensive Cloud Scanner
```js
// Complete area effect cloud analysis system
function scanAllClouds() {
    const player = Player.getPlayer();
    if (!player) return;

    const entities = World.getEntities();
    const clouds = [];

    entities.forEach(entity => {
        if (entity.is("minecraft:area_effect_cloud")) {
            const cloud = entity;
            const pos = entity.getPos();
            const distance = player.distanceTo(entity);
            const radius = cloud.getRadius();
            const color = cloud.getColor();
            const particleType = cloud.getParticleType();
            const isWaiting = cloud.isWaiting();

            const cloudData = {
                entity: entity,
                position: pos,
                distance: distance,
                radius: radius,
                color: color,
                hexColor: `#${color.toString(16).padStart(6, '0')}`,
                particleType: particleType,
                isWaiting: isWaiting,
                isInRange: distance <= radius + 1,
                dangerLevel: 0
            };

            // Calculate danger level
            if (cloudData.hexColor.includes("ff0000")) cloudData.dangerLevel = 10; // Harming
            else if (cloudData.hexColor.includes("00ff00")) cloudData.dangerLevel = 8;  // Poison
            else if (cloudData.hexColor.includes("0000ff")) cloudData.dangerLevel = 5; // Slowness
            else if (cloudData.hexColor.includes("ffffff")) cloudData.dangerLevel = -3; // Healing

            clouds.push(cloudData);
        }
    });

    // Sort by danger level and distance
    clouds.sort((a, b) => {
        if (b.dangerLevel !== a.dangerLevel) {
            return b.dangerLevel - a.dangerLevel;
        }
        return a.distance - b.distance;
    });

    // Display results
    Chat.log("=== Area Effect Cloud Scan ===");
    Chat.log(`Found ${clouds.length} area effect clouds`);

    clouds.forEach((cloud, index) => {
        const status = cloud.isWaiting ? "Waiting" : "Active";
        const danger = cloud.dangerLevel > 0 ? `&cDanger: ${cloud.dangerLevel}` :
                     cloud.dangerLevel < 0 ? `&aBeneficial: ${Math.abs(cloud.dangerLevel)}` :
                     "&fNeutral";

        Chat.log(`${index + 1}. ${cloud.hexColor} cloud (${status})`);
        Chat.log(`   Position: [${cloud.position.x.toFixed(1)}, ${cloud.position.y.toFixed(1)}, ${cloud.position.z.toFixed(1)}]`);
        Chat.log(`   Distance: ${cloud.distance.toFixed(1)}m, Radius: ${cloud.radius.toFixed(1)}m`);
        Chat.log(`   Particles: ${cloud.particleType}`);
        Chat.log(`   ${danger}`);
        Chat.log(`   In range: ${cloud.isInRange ? "&aYes" : "&fNo"}`);

        // Set appropriate glow effect
        if (cloud.dangerLevel > 5) {
            cloud.entity.setGlowing(true);
            cloud.entity.setGlowingColor(0xFF0000); // Red for very dangerous
        } else if (cloud.dangerLevel > 0) {
            cloud.entity.setGlowing(true);
            cloud.entity.setGlowingColor(0xFF8800); // Orange for moderately dangerous
        } else if (cloud.dangerLevel < 0) {
            cloud.entity.setGlowing(true);
            cloud.entity.setGlowingColor(0x00FF00); // Green for beneficial
        }
    });

    return clouds;
}

// Run scan every few seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 60 === 0) { // Every 3 seconds
        scanAllClouds();
    }
}));
```

### Cloud Effect Predictor
```js
// Predict which entities will be affected by area effect clouds
function predictCloudEffects() {
    const entities = World.getEntities();
    const clouds = [];
    const affectedEntities = [];

    // Find all area effect clouds
    entities.forEach(entity => {
        if (entity.is("minecraft:area_effect_cloud")) {
            const cloud = entity;
            clouds.push({
                entity: cloud,
                position: entity.getPos(),
                radius: cloud.getRadius(),
                color: cloud.getColor(),
                isWaiting: cloud.isWaiting(),
                hexColor: `#${cloud.getColor().toString(16).padStart(6, '0')}`
            });
        }
    });

    // Find entities that might be affected
    entities.forEach(entity => {
        if (!entity.is("minecraft:area_effect_cloud") && entity.isAlive()) {
            const entityPos = entity.getPos();
            const entityType = entity.getType();
            const entityName = entity.getName().getString();

            clouds.forEach(cloud => {
                const distance = Math.sqrt(
                    Math.pow(entityPos.x - cloud.position.x, 2) +
                    Math.pow(entityPos.y - cloud.position.y, 2) +
                    Math.pow(entityPos.z - cloud.position.z, 2)
                );

                if (distance <= cloud.radius && !cloud.isWaiting) {
                    affectedEntities.push({
                        entity: entity,
                        cloud: cloud,
                        distance: distance,
                        entityType: entityType,
                        entityName: entityName
                    });
                }
            });
        }
    });

    // Display predictions
    Chat.log("=== Cloud Effect Predictions ===");
    Chat.log(`Analyzing ${clouds.length} clouds and their effects...`);

    clouds.forEach(cloud => {
        const affected = affectedEntities.filter(ae => ae.cloud === cloud);
        const effect = getEffectDescription(cloud.hexColor);

        Chat.log(`\nCloud at [${cloud.position.x.toFixed(1)}, ${cloud.position.y.toFixed(1)}, ${cloud.position.z.toFixed(1)}]:`);
        Chat.log(`  Effect: ${effect} (${cloud.hexColor})`);
        Chat.log(`  Radius: ${cloud.radius.toFixed(1)}m`);
        Chat.log(`  Status: ${cloud.isWaiting ? "Waiting" : "Active"}`);
        Chat.log(`  Entities affected: ${affected.length}`);

        affected.forEach(ae => {
            Chat.log(`    - ${ae.entityName} (${ae.entityType}) at ${ae.distance.toFixed(1)}m from center`);

            // Highlight affected entities
            if (ae.entityType === "minecraft:player") {
                ae.entity.setGlowing(true);
                ae.entity.setGlowingColor(cloud.color | 0xFF000000);
            }
        });
    });

    return affectedEntities;
}

function getEffectDescription(hexColor) {
    if (hexColor.includes("ff0000")) return "Harming/Strength";
    if (hexColor.includes("00ff00")) return "Poison";
    if (hexColor.includes("0000ff")) return "Slowness";
    if (hexColor.includes("ffffff")) return "Healing/Regeneration";
    if (hexColor.includes("ff8800") || hexColor.includes("ffa500")) return "Weakness/Fire Resistance";
    return "Unknown Effect";
}

// Periodic effect prediction
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 40 === 0) { // Every 2 seconds
        predictCloudEffects();
    }
}));
```

### Cloud Lifecycle Tracker
```js
// Track area effect cloud creation, changes, and removal
const cloudLifecycles = new Map();

function trackCloudLifecycles() {
    const entities = World.getEntities();
    const currentClouds = new Set();

    // Find current clouds and track changes
    entities.forEach(entity => {
        if (entity.is("minecraft:area_effect_cloud")) {
            const uuid = entity.getUUID();
            const cloud = entity;
            const pos = entity.getPos();
            const radius = cloud.getRadius();
            const color = cloud.getColor();
            const isWaiting = cloud.isWaiting();

            currentClouds.add(uuid);

            if (!cloudLifecycles.has(uuid)) {
                // New cloud detected
                Chat.log(`&aNew area effect cloud created at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
                Chat.log(`  Radius: ${radius.toFixed(1)}m, Color: #${color.toString(16).padStart(6, '0')}`);

                cloudLifecycles.set(uuid, {
                    startTime: Client.getTime(),
                    startPosition: pos,
                    initialRadius: radius,
                    initialColor: color,
                    lastRadius: radius,
                    lastColor: color,
                    lastState: isWaiting,
                    stateChanges: 0,
                    maxRadius: radius,
                    minRadius: radius
                });
            } else {
                // Existing cloud - track changes
                const lifecycle = cloudLifecycles.get(uuid);
                let hasChanges = false;

                // Track radius changes
                if (Math.abs(radius - lifecycle.lastRadius) > 0.1) {
                    Chat.log(`&eCloud radius changed at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]: ${lifecycle.lastRadius.toFixed(1)} → ${radius.toFixed(1)}m`);
                    lifecycle.lastRadius = radius;
                    hasChanges = true;

                    // Update min/max radius
                    lifecycle.maxRadius = Math.max(lifecycle.maxRadius, radius);
                    lifecycle.minRadius = Math.min(lifecycle.minRadius, radius);
                }

                // Track color changes
                if (color !== lifecycle.lastColor) {
                    Chat.log(`&eCloud color changed at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]: #${lifecycle.lastColor.toString(16).padStart(6, '0')} → #${color.toString(16).padStart(6, '0')}`);
                    lifecycle.lastColor = color;
                    hasChanges = true;
                }

                // Track state changes
                if (isWaiting !== lifecycle.lastState) {
                    lifecycle.stateChanges++;
                    lifecycle.lastState = isWaiting;
                    hasChanges = true;
                }

                if (hasChanges) {
                    const age = (Client.getTime() - lifecycle.startTime) / 20;
                    Chat.log(`  Cloud age: ${age.toFixed(1)} seconds, State changes: ${lifecycle.stateChanges}`);
                }
            }
        }
    });

    // Check for removed clouds
    for (const [uuid, lifecycle] of cloudLifecycles.entries()) {
        if (!currentClouds.has(uuid)) {
            const age = (Client.getTime() - lifecycle.startTime) / 20;
            Chat.log(`&cArea effect cloud removed after ${age.toFixed(1)} seconds`);
            Chat.log(`  Initial position: [${lifecycle.startPosition.x.toFixed(1)}, ${lifecycle.startPosition.y.toFixed(1)}, ${lifecycle.startPosition.z.toFixed(1)}]`);
            Chat.log(`  Radius range: ${lifecycle.minRadius.toFixed(1)} - ${lifecycle.maxRadius.toFixed(1)}m`);
            Chat.log(`  State changes: ${lifecycle.stateChanges}`);

            cloudLifecycles.delete(uuid);
        }
    }

    // Display summary
    if (Client.getTime() % 200 === 0) { // Every 10 seconds
        Chat.log(`&7Currently tracking ${cloudLifecycles.size} area effect clouds`);
    }
}

// Continuous lifecycle tracking
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 5 === 0) { // Every 0.25 seconds for responsive tracking
        trackCloudLifecycles();
    }
}));
```

## Important Notes

- **Entity Type**: Area effect clouds have the type `"minecraft:area_effect_cloud"` and can be identified using `entity.is("minecraft:area_effect_cloud")`
- **Effect Duration**: Clouds persist for a limited time and gradually shrink or change properties over their lifetime
- **Multiple Effects**: A single cloud can apply multiple potion effects to entities within its radius
- **Particle Effects**: The visual appearance of the cloud is determined by its particle type and color
- **State Changes**: Clouds may alternate between active and waiting states based on their effect application timing
- **Player Safety**: Some clouds contain harmful effects (poison, harming) while others provide benefits (healing, regeneration)
- **Server Limitations**: Visual methods like `setGlowing()` may not work on all multiplayer servers
- **Performance**: Area effect clouds can affect multiple entities simultaneously, potentially causing server lag in large quantities

## Related Classes

- `EntityHelper` - Parent class providing basic entity functionality
- `LivingEntityHelper` - For entities that can be affected by area effect clouds
- `PlayerEntityHelper` - For player entities affected by cloud effects
- `WorldHelper` - Provides world-level entity access methods
- `Pos3D` - Used for cloud positions and distance calculations
- `ParticleHelper` - For working with particle effects in general

## Version Information

- Available since JSMacros 1.8.4
- Inherits all EntityHelper methods with their respective version availability
- `getRadius()` method available since 1.8.4
- `getColor()` method available since 1.8.4
- `getParticleType()` method available since 1.8.4
- `isWaiting()` method available since 1.8.4