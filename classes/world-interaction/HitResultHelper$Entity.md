# HitResultHelper$Entity

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.HitResultHelper$Entity`

**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers.world`

**Since:** 1.9.1

**Author:** aMelonRind

## Overview

The `HitResultHelper$Entity` class is a specialized nested class within `HitResultHelper` that represents ray casting results specifically for entity intersections. This class provides entity-specific information and methods for working with entity hit detection in Minecraft, including entity access, hit position analysis, and entity interaction functionality.

When a ray trace operation hits an entity, the result is automatically cast to this specialized type, providing access to entity-specific properties and methods that are not available in the generic hit result.

## Class Hierarchy

```
HitResultHelper<T>
├── Block (for block hit results)
└── Entity (for entity hit results)
```

## Methods

### `getEntity()`
**Returns:** `EntityHelper` - The entity that was hit

Gets the EntityHelper instance for the entity that was hit by the ray trace. This provides access to all entity methods and properties.

**Example:**
```javascript
const hitResult = player.getInteractionManager().getTarget();
if (hitResult) {
    const entityHit = hitResult.asEntity();
    if (entityHit) {
        const entity = entityHit.getEntity();
        Chat.log(`Hit entity: ${entity.getType()}`);
        Chat.log(`Entity name: ${entity.getName()}`);
    }
}
```

### `getDistance()`
**Returns:** `double` - The distance from the ray origin to the hit point

Gets the exact distance from where the ray trace originated to where it intersected with the entity.

**Example:**
```javascript
const hitResult = player.getInteractionManager().getTarget();
if (hitResult) {
    const entityHit = hitResult.asEntity();
    if (entityHit) {
        const distance = entityHit.getDistance();
        Chat.log(`Hit entity at distance: ${distance} blocks`);

        if (distance < 3.0) {
            Chat.log("Entity is very close!");
        }
    }
}
```

### `getHitPosition()`
**Returns:** `Pos3D` - The precise 3D position where the ray hit the entity

Gets the exact world coordinates where the ray trace intersected with the entity's hitbox.

**Example:**
```javascript
const hitResult = player.getInteractionManager().getTarget();
if (hitResult) {
    const entityHit = hitResult.asEntity();
    if (entityHit) {
        const hitPos = entityHit.getHitPosition();
        Chat.log(`Hit position: ${hitPos.x.toFixed(2)}, ${hitPos.y.toFixed(2)}, ${hitPos.z.toFixed(2)}`);
    }
}
```

## Inherited Methods from HitResultHelper

The following methods are inherited from the parent `HitResultHelper` class:

### `getPos()`
**Returns:** `Pos3D` - The exact 3D position where the ray hit

Gets the precise world coordinates where the ray trace made contact with the entity.

### `isMissed()`
**Returns:** `boolean` - Whether the ray trace missed

Always returns `false` for Entity instances since they represent successful hits.

### `asBlock()`
**Returns:** `HitResultHelper$Block` or `null` - Always returns `null` for Entity instances

### `asEntity()`
**Returns:** `HitResultHelper$Entity` or `null` - Returns `this` for Entity instances

## Usage Examples

### Example 1: Basic Entity Detection and Analysis
```javascript
function analyzeTargetEntity() {
    const hitResult = player.getInteractionManager().getTarget();

    if (hitResult) {
        const entityHit = hitResult.asEntity();
        if (entityHit) {
            const entity = entityHit.getEntity();
            const distance = entityHit.getDistance();
            const hitPos = entityHit.getHitPosition();

            Chat.log(`=== Entity Analysis ===`);
            Chat.log(`Type: ${entity.getType()}`);
            Chat.log(`Name: ${entity.getName()}`);
            Chat.log(`Distance: ${distance.toFixed(2)} blocks`);
            Chat.log(`Hit position: ${hitPos.x.toFixed(2)}, ${hitPos.y.toFixed(2)}, ${hitPos.z.toFixed(2)}`);

            // Entity-specific information
            if (entity.isPlayer()) {
                Chat.log(`Player health: ${entity.getHealth()}`);
                Chat.log(`Player hunger: ${entity.getHunger()}`);
            } else if (entity.isHostile()) {
                Chat.log("⚔️ Hostile mob detected!");
                Chat.log(`Entity health: ${entity.getHealth()}`);
            } else if (entity.isAnimal()) {
                Chat.log("🐾 Passive animal detected");
            }

            return entity;
        }
    }

    Chat.log("No entity in target range");
    return null;
}

analyzeTargetEntity();
```

### Example 2: Combat Assistant
```javascript
function combatAssistant() {
    const hitResult = player.getInteractionManager().getTarget();

    if (hitResult) {
        const entityHit = hitResult.asEntity();
        if (entityHit) {
            const entity = entityHit.getEntity();
            const distance = entityHit.getDistance();

            Chat.log(`=== Combat Analysis ===`);
            Chat.log(`Target: ${entity.getType()}`);
            Chat.log(`Distance: ${distance.toFixed(2)} blocks`);

            // Check if entity is hostile
            if (entity.isHostile()) {
                const health = entity.getHealth();
                const playerHealth = player.getHealth();
                const playerArmor = player.getArmor();

                Chat.log(`Target health: ${health}`);
                Chat.log(`Player health: ${playerHealth}`);
                Chat.log(`Player armor: ${playerArmor}`);

                // Combat recommendations
                if (distance < 3.0) {
                    Chat.log("⚔️ Optimal attack range!");

                    // Auto-attack if player health is good
                    if (playerHealth > 10) {
                        Chat.log("🎯 Attacking target...");
                        player.attack(entity);
                    } else {
                        Chat.log("⚠️ Low health - consider retreating");
                    }
                } else if (distance < 6.0) {
                    Chat.log("🏃 Close the distance to attack");
                } else {
                    Chat.log("🏹 Too far for melee combat");
                }

                // Check for weapon
                const weapon = player.getInventory().getMainHandStack();
                if (weapon && weapon.getItem()) {
                    const itemDamage = weapon.getItem().getAttackDamage();
                    Chat.log(`Weapon damage: ${itemDamage}`);
                } else {
                    Chat.log("❌ No weapon equipped");
                }
            } else {
                Chat.log("Target is not hostile");
            }
        }
    } else {
        Chat.log("No entity targetted");
    }
}

combatAssistant();
```

### Example 3: Entity Tracking and Monitoring
```javascript
function trackEntity() {
    const hitResult = player.getInteractionManager().getTarget();

    if (hitResult) {
        const entityHit = hitResult.asEntity();
        if (entityHit) {
            const entity = entityHit.getEntity();
            const initialPos = entity.getPos();
            const initialHealth = entity.getHealth();
            const startTime = Date.now();

            Chat.log(`=== Entity Tracking Started ===`);
            Chat.log(`Tracking: ${entity.getType()} (${entity.getName()})`);
            Chat.log(`Initial position: ${initialPos.x.toFixed(2)}, ${initialPos.y.toFixed(2)}, ${initialPos.z.toFixed(2)}`);
            Chat.log(`Initial health: ${initialHealth}`);

            // Set up tracking interval
            const trackingInterval = setInterval(() => {
                try {
                    const currentPos = entity.getPos();
                    const currentHealth = entity.getHealth();
                    const distance = player.getPos().distanceTo(currentPos);
                    const timeElapsed = Date.now() - startTime;

                    // Calculate movement
                    const distanceMoved = initialPos.distanceTo(currentPos);
                    const speed = distanceMoved / (timeElapsed / 1000); // blocks per second

                    Chat.log(`[${Math.floor(timeElapsed/1000)}s] Pos: ${currentPos.x.toFixed(1)}, ${currentPos.y.toFixed(1)}, ${currentPos.z.toFixed(1)} | Health: ${currentHealth} | Distance: ${distance.toFixed(1)} | Speed: ${speed.toFixed(2)} b/s`);

                    // Stop tracking if entity is too far or dead
                    if (distance > 100 || currentHealth <= 0) {
                        clearInterval(trackingInterval);
                        Chat.log("Entity tracking stopped - out of range or dead");
                    }
                } catch (e) {
                    clearInterval(trackingInterval);
                    Chat.log("Entity tracking stopped - entity no longer valid");
                }
            }, 1000); // Update every second

            // Stop tracking after 30 seconds
            setTimeout(() => {
                clearInterval(trackingInterval);
                Chat.log("Entity tracking stopped - timeout");
            }, 30000);
        }
    }
}

trackEntity();
```

### Example 4: Animal Breeding Assistant
```javascript
function breedingAssistant() {
    const hitResult = player.getInteractionManager().getTarget();

    if (hitResult) {
        const entityHit = hitResult.asEntity();
        if (entityHit) {
            const entity = entityHit.getEntity();
            const distance = entityHit.getDistance();

            if (entity.isAnimal()) {
                Chat.log(`=== Animal Analysis ===`);
                Chat.log(`Type: ${entity.getType()}`);
                Chat.log(`Name: ${entity.getName()}`);
                Chat.log(`Age: ${entity.getAge()}`);
                Chat.log(`Distance: ${distance.toFixed(2)} blocks`);

                // Check if animal is adult and can breed
                if (entity.getAge() >= 0) {
                    Chat.log("✅ Adult animal");

                    // Check for breeding item in hand
                    const breedingItem = getBreedingItem(entity.getType());
                    const playerItem = player.getInventory().getMainHandStack();

                    if (playerItem && breedingItem &&
                        playerItem.getItem().getName() === breedingItem) {
                        Chat.log(`🌱 Holding correct breeding item: ${breedingItem}`);
                        Chat.log("Right-click to feed and breed");
                    } else if (breedingItem) {
                        Chat.log(`🌱 Need ${breedingItem} for breeding`);
                    } else {
                        Chat.log("❓ Unknown breeding requirements");
                    }

                    // Check for nearby animals of same type
                    const nearbyAnimals = findNearbyAnimals(entity.getType(), 10);
                    Chat.log(`Nearby animals of same type: ${nearbyAnimals.length}`);

                    if (nearbyAnimals.length >= 1) {
                        Chat.log("💕 Potential breeding partner nearby");
                    }
                } else {
                    Chat.log("🐑 Baby animal - needs to grow up first");
                    Chat.log(`Time to adulthood: ${Math.abs(entity.getAge())} ticks`);
                }

                // Check health
                const health = entity.getHealth();
                const maxHealth = entity.getMaxHealth();
                const healthPercent = (health / maxHealth) * 100;

                Chat.log(`Health: ${health}/${maxHealth} (${Math.round(healthPercent)}%)`);

                if (healthPercent < 80) {
                    Chat.log("❤️ Animal needs healing");
                }
            } else {
                Chat.log("Not an animal");
            }
        }
    }
}

function getBreedingItem(entityType) {
    const breedingItems = {
        "minecraft:cow": "minecraft:wheat",
        "minecraft:sheep": "minecraft:wheat",
        "minecraft:pig": "minecraft:carrot",
        "minecraft:chicken": "minecraft:wheat_seeds",
        "minecraft:rabbit": "minecraft:dandelion",
        "minecraft:horse": "minecraft:golden_apple",
        "minecraft:llama": "minecraft:hay_block",
        "minecraft:turtle": "minecraft:seagrass",
        "minecraft:cat": "minecraft:cod",
        "minecraft:wolf": "minecraft:bone"
    };

    return breedingItems[entityType] || null;
}

function findNearbyAnimals(entityType, range) {
    const nearbyAnimals = [];
    const entities = World.getEntities();

    for (const entity of entities) {
        if (entity.getType() === entityType && entity.isAnimal()) {
            const distance = player.getPos().distanceTo(entity.getPos());
            if (distance <= range) {
                nearbyAnimals.push(entity);
            }
        }
    }

    return nearbyAnimals;
}

breedingAssistant();
```

### Example 5: Entity Interaction Logger
```javascript
function entityInteractionLogger() {
    const hitResult = player.getInteractionManager().getTarget();

    if (hitResult) {
        const entityHit = hitResult.asEntity();
        if (entityHit) {
            const entity = entityHit.getEntity();
            const distance = entityHit.getDistance();
            const hitPos = entityHit.getHitPosition();

            // Log detailed interaction information
            const interactionData = {
                timestamp: new Date().toISOString(),
                entityType: entity.getType(),
                entityName: entity.getName(),
                entityId: entity.getUuid(),
                distance: distance,
                hitPosition: {
                    x: hitPos.x,
                    y: hitPos.y,
                    z: hitPos.z
                },
                entityPosition: {
                    x: entity.getPos().x,
                    y: entity.getPos().y,
                    z: entity.getPos().z
                },
                playerPosition: {
                    x: player.getPos().x,
                    y: player.getPos().y,
                    z: player.getPos().z
                },
                entityHealth: entity.getHealth(),
                entityAge: entity.getAge(),
                isHostile: entity.isHostile(),
                isPlayer: entity.isPlayer(),
                isAnimal: entity.isAnimal()
            };

            // Display interaction information
            Chat.log("=== Entity Interaction Log ===");
            Chat.log(`Time: ${interactionData.timestamp}`);
            Chat.log(`Target: ${interactionData.entityType} (${interactionData.entityName})`);
            Chat.log(`Distance: ${interactionData.distance.toFixed(2)} blocks`);
            Chat.log(`Hit Position: ${interactionData.hitPosition.x.toFixed(2)}, ${interactionData.hitPosition.y.toFixed(2)}, ${interactionData.hitPosition.z.toFixed(2)}`);
            Chat.log(`Entity Position: ${interactionData.entityPosition.x.toFixed(2)}, ${interactionData.entityPosition.y.toFixed(2)}, ${interactionData.entityPosition.z.toFixed(2)}`);
            Chat.log(`Health: ${interactionData.entityHealth}`);
            Chat.log(`Age: ${interactionData.entityAge}`);
            Chat.log(`Characteristics: ${interactionData.isHostile ? "Hostile" : "Non-hostile"}, ${interactionData.isPlayer ? "Player" : "NPC/Mob"}, ${interactionData.isAnimal ? "Animal" : "Non-animal"}`);

            // Provide interaction suggestions
            if (distance < 3.0) {
                Chat.log("🎯 Close enough for interaction");

                if (entity.isHostile()) {
                    Chat.log("⚔️ Consider attacking or defending");
                } else if (entity.isPlayer()) {
                    Chat.log("👋 Another player - can trade or chat");
                } else if (entity.isAnimal()) {
                    Chat.log("🐾 Can breed or farm");
                }
            } else {
                Chat.log(`📍 Too far to interact (needs < 3.0 blocks)`);
            }

            return interactionData;
        }
    }

    Chat.log("No entity targeted for interaction logging");
    return null;
}

entityInteractionLogger();
```

### Example 6: Entity Filtering and Detection System
```javascript
function createEntityDetectionSystem() {
    const detectedEntities = [];
    const maxEntities = 10;

    // Continuous entity detection
    const detectionInterval = setInterval(() => {
        const hitResult = player.getInteractionManager().getTarget();

        if (hitResult) {
            const entityHit = hitResult.asEntity();
            if (entityHit) {
                const entity = entityHit.getEntity();
                const entityId = entity.getUuid();
                const distance = entityHit.getDistance();

                // Check if already detected
                const existingIndex = detectedEntities.findIndex(e => e.id === entityId);

                if (existingIndex === -1 && detectedEntities.length < maxEntities) {
                    // New entity detected
                    const entityData = {
                        id: entityId,
                        type: entity.getType(),
                        name: entity.getName(),
                        distance: distance,
                        health: entity.getHealth(),
                        position: entity.getPos(),
                        timestamp: Date.now(),
                        isHostile: entity.isHostile(),
                        isPlayer: entity.isPlayer(),
                        isAnimal: entity.isAnimal()
                    };

                    detectedEntities.push(entityData);

                    Chat.log(`🔍 New entity detected: ${entityData.type} (${entityData.name}) at ${entityData.distance.toFixed(2)} blocks`);

                    // Alert for important entities
                    if (entityData.isHostile) {
                        Chat.title("⚠️ Hostile Entity Detected!", entityData.type, 0, 2, 1);
                    } else if (entityData.isPlayer && !entityData.name.equals(player.getName())) {
                        Chat.log(`👋 Another player: ${entityData.name}`);
                    }
                } else if (existingIndex !== -1) {
                    // Update existing entity data
                    detectedEntities[existingIndex].distance = distance;
                    detectedEntities[existingIndex].health = entity.getHealth();
                    detectedEntities[existingIndex].position = entity.getPos();
                    detectedEntities[existingIndex].timestamp = Date.now();
                }
            }
        }

        // Clean up old entities (haven't been seen for 30 seconds)
        const currentTime = Date.now();
        const initialLength = detectedEntities.length;

        for (let i = detectedEntities.length - 1; i >= 0; i--) {
            if (currentTime - detectedEntities[i].timestamp > 30000) {
                Chat.log(`Entity removed from tracking: ${detectedEntities[i].type}`);
                detectedEntities.splice(i, 1);
            }
        }

        if (detectedEntities.length !== initialLength) {
            Chat.log(`📊 Currently tracking ${detectedEntities.length} entities`);
        }
    }, 2000); // Check every 2 seconds

    // Stop detection after 2 minutes
    setTimeout(() => {
        clearInterval(detectionInterval);
        Chat.log("Entity detection system stopped");
        Chat.log(`Final tracked entities: ${detectedEntities.length}`);
    }, 120000);

    Chat.log("Entity detection system started (2 minutes)");
}

createEntityDetectionSystem();
```

## Important Notes

### Entity Detection

1. **Line of Sight:** Ray tracing requires line of sight to detect entities
2. **Hitbox Detection:** Detection is based on entity hitboxes, not visual models
3. **Distance Limits:** Maximum detection range depends on ray trace parameters

### Entity Validity

1. **Lifecycle:** Entities may become invalid between detection and access
2. **Despawn:** Entities can despawn at any time
3. **Loading:** Entities may not be loaded in distant chunks

### Performance Considerations

1. **Frequency:** Entity ray tracing can be expensive if called frequently
2. **Validation:** Always validate entity objects before accessing properties
3. **Caching:** Cache entity information when used multiple times

## Best Practices

1. **Null Checking:** Always check for null returns before accessing entity properties
2. **Type Validation:** Verify entity types before accessing specific methods
3. **Distance Management:** Use appropriate distance limits for different use cases
4. **Error Handling:** Wrap entity access in try-catch blocks
5. **State Caching:** Cache entity state information when used repeatedly

## Related Classes

- [`HitResultHelper`](HitResultHelper.md) - Parent class
- [`HitResultHelper$Block`](hit-result-helper$block.md) - Block-specific hit results
- [`EntityHelper`](EntityHelper.md) - Entity information and methods
- [`LivingEntityHelper`](LivingEntityHelper.md) - Living entity specific methods
- [`PlayerEntityHelper`](PlayerEntityHelper.md) - Player entity specific methods
- [`Pos3D`](Pos3D.md) - 3D position handling

## Version History

- **1.9.1:** Initial introduction with basic entity hit detection
- **Current:** Enhanced entity access and improved distance calculations