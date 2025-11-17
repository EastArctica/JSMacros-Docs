# EntityHelper

Represents any entity in the Minecraft world, including players, mobs, items, and other objects. This is the base class for all entity-specific helpers and provides methods to interact with entity properties, position, movement, and behavior. Use `EntityHelper.create()` to get the appropriate specialized helper for a specific entity type.

## Methods
- [EntityHelper.asAnimal](#entityhelperasanimal)
- [EntityHelper.asClientPlayer](#entityhelperasclientplayer)
- [EntityHelper.asItem](#entityhelperasitem)
- [EntityHelper.asLiving](#entityhelperasliving)
- [EntityHelper.asMerchant](#entityhelperasmerchant)
- [EntityHelper.asPlayer](#entityhelperasplayer)
- [EntityHelper.asServerEntity](#entityhelperasserverentity)
- [EntityHelper.asVillager](#entityhelperasvillager)
- [EntityHelper.create](#entityhelpercreate)
- [EntityHelper.distanceTo](#entityhelperdistanceto)
- [EntityHelper.getAir](#entityhelpergetair)
- [EntityHelper.getBiome](#entityhelpergetbiome)
- [EntityHelper.getBlockPos](#entityhelpergetblockpos)
- [EntityHelper.getChunk](#entityhelpergetchunk)
- [EntityHelper.getChunkPos](#entityhelpergetchunkpos)
- [EntityHelper.getEyeHeight](#entityhelpergeteyeheight)
- [EntityHelper.getEyePos](#entityhelpergeteyepos)
- [EntityHelper.getFacingDirection](#entityhelpergetfacingdirection)
- [EntityHelper.getMaxAir](#entityhelpergetmaxair)
- [EntityHelper.getName](#entityhelpergetname)
- [EntityHelper.getNBT](#entityhelpergetnbt)
- [EntityHelper.getPassengers](#entityhelpergetpassengers)
- [EntityHelper.getPitch](#entityhelpergetpitch)
- [EntityHelper.getPos](#entityhelpergetpos)
- [EntityHelper.getSpeed](#entityhelpergetspeed)
- [EntityHelper.getType](#entityhelpergettype)
- [EntityHelper.getUUID](#entityhelpergetuuid)
- [EntityHelper.getVehicle](#entityhelpergetvehicle)
- [EntityHelper.getVelocity](#entityhelpergetvelocity)
- [EntityHelper.getX](#entityhelpergetx)
- [EntityHelper.getY](#entityhelpergety)
- [EntityHelper.getYaw](#entityhelpergetyaw)
- [EntityHelper.getZ](#entityhelpergetz)
- [EntityHelper.getGlowingColor](#entityhelpergetglowingcolor)
- [EntityHelper.is](#entityhelperis)
- [EntityHelper.isAlive](#entityhelperisalive)
- [EntityHelper.isGlowing](#entityhelperisglowing)
- [EntityHelper.isInLava](#entityhelperisinlava)
- [EntityHelper.isOnFire](#entityhelperisonfire)
- [EntityHelper.isSneaking](#entityhelperissneaking)
- [EntityHelper.isSprinting](#entityhelperissprinting)
- [EntityHelper.rayTraceBlock](#entityhelperraytraceblock)
- [EntityHelper.rayTraceEntity](#entityhelperraytraceentity)
- [EntityHelper.resetGlowing](#entityhelperresetglowing)
- [EntityHelper.resetGlowingColor](#entityhelperresetglowingcolor)
- [EntityHelper.setCustomName](#entityhelpersetcustomname)
- [EntityHelper.setCustomNameVisible](#entityhelpersetcustomnamevisible)
- [EntityHelper.setGlowing](#entityhelpersetglowing)
- [EntityHelper.setGlowingColor](#entityhelpersetglowingcolor)

### EntityHelper.asAnimal
```js
const entity = event.entity;
if (entity.getType().includes("cow")) {
    const animal = entity.asAnimal();
    // Now you can access animal-specific methods
    Chat.log(`Is baby: ${animal.isBaby()}`);
}
```

**Params**
* `(none)`

**Returns**
* `AnimalEntityHelper`: This entity as an animal entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Will throw an error if the entity is not actually an animal.

### EntityHelper.asClientPlayer
```js
const entity = event.entity;
if (entity.getType() === "minecraft:player") {
    try {
        const clientPlayer = entity.asClientPlayer();
        // Access client player specific methods
        Chat.log(`Abilities: ${clientPlayer.getAbilities().getWalkSpeed()}`);
    } catch (e) {
        Chat.log("Entity is not the client player");
    }
}
```

**Params**
* `(none)`

**Returns**
* `ClientPlayerEntityHelper`: This entity as a client player entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Only works if this entity is the client player.

### EntityHelper.asItem
```js
const entity = event.entity;
if (entity.getType() === "minecraft:item") {
    const itemEntity = entity.asItem();
    const item = itemEntity.getItem();
    Chat.log(`Item: ${item.getName().getString()}`);
}
```

**Params**
* `(none)`

**Returns**
* `ItemEntityHelper`: This entity as an item entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Will throw an error if the entity is not an item entity.

### EntityHelper.asLiving
```js
const entity = event.entity;
if (entity.is("cow", "pig", "sheep")) {
    const living = entity.asLiving();
    // Access living entity methods
    const health = living.getHealth();
    const maxHealth = living.getMaxHealth();
    Chat.log(`Health: ${health}/${maxHealth}`);
}
```

**Params**
* `(none)`

**Returns**
* `LivingEntityHelper`: This entity as a living entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Will throw an error if the entity is not a living entity.

### EntityHelper.asMerchant
```js
const entity = event.entity;
if (entity.getType().includes("villager") || entity.getType().includes("wandering_trader")) {
    const merchant = entity.asMerchant();
    // Access merchant-specific methods
    const offers = merchant.getOffers();
    Chat.log(`Has ${offers.size()} trade offers`);
}
```

**Params**
* `(none)`

**Returns**
* `MerchantEntityHelper`: This entity as a merchant entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Will throw an error if the entity is not a merchant.

### EntityHelper.asPlayer
```js
const entity = event.entity;
if (entity.getType() === "minecraft:player") {
    const player = entity.asPlayer();
    // Access player-specific methods
    const inventory = player.getInventory();
    const gameMode = player.getGameMode();
    Chat.log(`Player game mode: ${gameMode}`);
}
```

**Params**
* `(none)`

**Returns**
* `PlayerEntityHelper`: This entity as a player entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Will throw an error if the entity is not a player.

### EntityHelper.asServerEntity
```js
const entity = event.entity;
const serverEntity = entity.asServerEntity();

if (serverEntity) {
    Chat.log("Server entity representation available");
    // Now you can access server-side methods
    const serverPos = serverEntity.getPos();
    Chat.log(`Server position: ${serverPos.getX()}, ${serverPos.getY()}, ${serverPos.getZ()}`);
} else {
    Chat.log("No server entity available (not in integrated server)");
}
```

**Params**
* `(none)`

**Returns**
* `EntityHelper | null`: The server-side version of this entity if in an integrated server, `null` otherwise.

### EntityHelper.asVillager
```js
const entity = event.entity;
if (entity.getType().includes("villager")) {
    const villager = entity.asVillager();
    // Access villager-specific methods
    const profession = villager.getVillagerData().getProfession();
    Chat.log(`Villager profession: ${profession}`);
}
```

**Params**
* `(none)`

**Returns**
* `VillagerEntityHelper`: This entity as a villager entity helper.

**Notes**
- Mainly for TypeScript type casting.
- Will throw an error if the entity is not a villager.

### EntityHelper.create
```js
// Static method - create the appropriate entity helper
const entity = event.entity; // Raw entity from an event
const helper = EntityHelper.create(entity);

// The helper will be the most specific type possible
if (helper.getType().includes("zombie")) {
    // Helper might be ZombieEntityHelper or a more specific type
    Chat.log(`Created helper: ${helper.getClass().getSimpleName()}`);
}
```

**Params**
1. `entity: Entity`: The raw Minecraft entity to wrap.

**Returns**
* `EntityHelper`: The appropriate entity helper subclass for this entity.

**Notes**
- This is a static method that should be called on the class itself.
- Returns the most specific helper class available for the entity type.

### EntityHelper.distanceTo
```js
const player = Player.getPlayer();
const entity = event.entity;

// Distance to another entity
const entityDistance = player.distanceTo(entity);
Chat.log(`Distance to entity: ${entityDistance} blocks`);

// Distance to a block position
const targetPos = new BlockPosHelper(100, 64, 200);
const blockDistance = player.distanceTo(targetPos);
Chat.log(`Distance to target block: ${blockDistance} blocks`);

// Distance to coordinates
const coordDistance = player.distanceTo(100, 64, 200);
Chat.log(`Distance to coordinates: ${coordDistance} blocks`);
```

**Params**
1. `target: EntityHelper | BlockPosHelper | Pos3D | number | number | number`: The target to measure distance to.

**Returns**
* `number`: The distance to the target.

### EntityHelper.getAir
```js
const entity = event.entity;
const air = entity.getAir();
const maxAir = entity.getMaxAir();

if (entity.isInLava() || entity.isInWater()) {
    Chat.log(`Air: ${air}/${maxAir}`);
    if (air <= 0) {
        Chat.log("Entity is drowning!");
    }
}
```

**Params**
* `(none)`

**Returns**
* `int`: The current amount of air this entity has.

### EntityHelper.getBiome
```js
const entity = event.entity;
const biome = entity.getBiome();
Chat.log(`Entity is in biome: ${biome}`);

if (biome.includes("ocean")) {
    Chat.log("Entity is in an ocean biome");
}
```

**Params**
* `(none)`

**Returns**
* `string`: The namespaced ID of the biome this entity is currently in.

### EntityHelper.getBlockPos
```js
const entity = event.entity;
const blockPos = entity.getBlockPos();
Chat.log(`Entity block position: ${blockPos.getX()}, ${blockPos.getY()}, ${blockPos.getZ()}`);

// Use to get the block at the entity's position
const block = World.getBlockAt(blockPos);
Chat.log(`Standing on: ${block.getId()}`);
```

**Params**
* `(none)`

**Returns**
* `BlockPosHelper`: The block position this entity occupies.

### EntityHelper.getChunk
```js
const entity = event.entity;
const chunk = entity.getChunk();
Chat.log(`Entity is in chunk: ${chunk.getX()}, ${chunk.getZ()}`);

const entitiesInChunk = chunk.getEntities();
Chat.log(`Entities in this chunk: ${entitiesInChunk.size()}`);
```

**Params**
* `(none)`

**Returns**
* `ChunkHelper`: The chunk this entity is currently in.

### EntityHelper.getChunkPos
```js
const entity = event.entity;
const chunkPos = entity.getChunkPos();
Chat.log(`Entity chunk coordinates: ${chunkPos.getX()}, ${chunkPos.getY()}`);
```

**Params**
* `(none)`

**Returns**
* `Pos2D`: The chunk coordinates this entity is in.

**Notes**
- Since Pos2D only has x and y fields, the z coordinate is stored as y.

### EntityHelper.getEyeHeight
```js
const entity = event.entity;
const eyeHeight = entity.getEyeHeight();
const eyePos = entity.getEyePos();

Chat.log(`Eye height: ${eyeHeight} blocks`);
Chat.log(`Eye position: ${eyePos.getX()}, ${eyePos.getY()}, ${eyePos.getZ()}`);
```

**Params**
* `(none)`

**Returns**
* `number`: The current eye height offset for this entity.

### EntityHelper.getEyePos
```js
const entity = event.entity;
const eyePos = entity.getEyePos();

// Raycast from entity's eyes
const raycast = World.raycast(eyePos, entity.getFacingDirection(), 5);
if (raycast) {
    Chat.log(`Looking at: ${raycast.getBlock().getId()}`);
}
```

**Params**
* `(none)`

**Returns**
* `Pos3D`: The position of this entity's eyes.

### EntityHelper.getFacingDirection
```js
const entity = event.entity;
const direction = entity.getFacingDirection();
Chat.log(`Facing direction: ${direction.getName()}`);

if (direction === Direction.NORTH) {
    Chat.log("Entity is facing north");
}
```

**Params**
* `(none)`

**Returns**
* `DirectionHelper`: The direction this entity is facing.

### EntityHelper.getMaxAir
```js
const entity = event.entity;
const maxAir = entity.getMaxAir();
const currentAir = entity.getAir();

Chat.log(`Air capacity: ${maxAir}`);
Chat.log(`Current air: ${currentAir}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The maximum amount of air this entity can have.

### EntityHelper.getName
```js
const entity = event.entity;
const name = entity.getName().getString();
const type = entity.getType();

Chat.log(`Entity name: ${name}`);
Chat.log(`Entity type: ${type}`);
```

**Params**
* `(none)`

**Returns**
* `TextHelper`: The display name of this entity.

### EntityHelper.getNBT
```js
const entity = event.entity;
const nbt = entity.getNBT();

Chat.log(`Entity NBT data:`);
Chat.log(nbt.toString());

// Access specific NBT data
const health = nbt.get("Health");
if (health) {
    Chat.log(`Entity health: ${health.asNumber()}`);
}
```

**Params**
* `(none)`

**Returns**
* `NBTElementHelper.NBTCompoundHelper`: The NBT data of this entity.

### EntityHelper.getPassengers
```js
const entity = event.entity;
const passengers = entity.getPassengers();

if (passengers) {
    Chat.log(`Entity has ${passengers.size()} passengers:`);
    for (const passenger of passengers) {
        Chat.log(`- ${passenger.getName().getString()}`);
    }
} else {
    Chat.log("Entity has no passengers");
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<EntityHelper> | null`: A list of passengers, or `null` if no passengers.

### EntityHelper.getPitch
```js
const entity = event.entity;
const pitch = entity.getPitch();
const yaw = entity.getYaw();

Chat.log(`Entity rotation: pitch=${pitch}, yaw=${yaw}`);

if (Math.abs(pitch) > 45) {
    Chat.log("Entity is looking up or down");
}
```

**Params**
* `(none)`

**Returns**
* `number`: The pitch rotation value of this entity.

### EntityHelper.getPos
```js
const entity = event.entity;
const pos = entity.getPos();

Chat.log(`Entity position: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);

// Calculate distance to origin
const distanceFromOrigin = Math.sqrt(pos.getX() * pos.getX() + pos.getZ() * pos.getZ());
Chat.log(`Distance from spawn: ${Math.round(distanceFromOrigin)} blocks`);
```

**Params**
* `(none)`

**Returns**
* `Pos3D`: The current position of this entity.

### EntityHelper.getSpeed
```js
const entity = event.entity;
const speed = entity.getSpeed();

Chat.log(`Entity speed: ${Math.round(speed * 100) / 100} blocks/second`);

if (speed > 5) {
    Chat.log("Entity is moving very fast!");
}
```

**Params**
* `(none)`

**Returns**
* `number`: This entity's current speed in blocks per second.

### EntityHelper.getType
```js
const entity = event.entity;
const type = entity.getType();

Chat.log(`Entity type: ${type}`);

// Check for specific types
if (type === "minecraft:zombie") {
    Chat.log("It's a zombie!");
} else if (type.includes("villager")) {
    Chat.log("It's some kind of villager");
}
```

**Params**
* `(none)`

**Returns**
* `string`: The namespaced ID of this entity type.

### EntityHelper.getUUID
```js
const entity = event.entity;
const uuid = entity.getUUID();

Chat.log(`Entity UUID: ${uuid}`);

// Compare with other entities
const player = Player.getPlayer();
if (entity.getUUID() === player.getUUID()) {
    Chat.log("Entity is the player!");
}
```

**Params**
* `(none)`

**Returns**
* `string`: The UUID of this entity.

### EntityHelper.getVehicle
```js
const entity = event.entity;
const vehicle = entity.getVehicle();

if (vehicle) {
    Chat.log(`Entity is riding: ${vehicle.getName().getString()} (${vehicle.getType()})`);

    if (vehicle.getType().includes("boat")) {
        Chat.log("Entity is in a boat");
    } else if (vehicle.getType().includes("horse")) {
        Chat.log("Entity is riding a horse");
    }
} else {
    Chat.log("Entity is not riding anything");
}
```

**Params**
* `(none)`

**Returns**
* `EntityHelper | null`: The entity this entity is riding, or `null` if not riding anything.

### EntityHelper.getVelocity
```js
const entity = event.entity;
const velocity = entity.getVelocity();

Chat.log(`Entity velocity: x=${velocity.getX()}, y=${velocity.getY()}, z=${velocity.getZ()}`);

// Calculate speed
const speed = Math.sqrt(
    velocity.getX() * velocity.getX() +
    velocity.getY() * velocity.getY() +
    velocity.getZ() * velocity.getZ()
);
Chat.log(`Entity speed: ${Math.round(speed * 100) / 100}`);
```

**Params**
* `(none)`

**Returns**
* `Pos3D`: The current velocity vector of this entity.

### EntityHelper.getX
```js
const entity = event.entity;
const x = entity.getX();
const y = entity.getY();
const z = entity.getZ();

Chat.log(`Entity coordinates: ${Math.round(x)}, ${Math.round(y)}, ${Math.round(z)}`);

if (y < 0) {
    Chat.log("Entity is in the void!");
}
```

**Params**
* `(none)`

**Returns**
* `number`: The X coordinate of this entity.

### EntityHelper.getY
```js
const entity = event.entity;
const y = entity.getY();

if (y > 120) {
    Chat.log("Entity is very high up");
} else if (y < 0) {
    Chat.log("Entity is in the void!");
}
```

**Params**
* `(none)`

**Returns**
* `number`: The Y coordinate of this entity.

### EntityHelper.getYaw
```js
const entity = event.entity;
const yaw = entity.getYaw();

Chat.log(`Entity yaw: ${Math.round(yaw)} degrees`);

// Determine cardinal direction
const direction = Math.round(yaw / 90) % 4;
const directions = ["South", "West", "North", "East"];
Chat.log(`Facing: ${directions[direction < 0 ? direction + 4 : direction]}`);
```

**Params**
* `(none)`

**Returns**
* `number`: The yaw rotation value of this entity.

### EntityHelper.getZ
```js
const entity = event.entity;
const z = entity.getZ();

Chat.log(`Entity Z coordinate: ${Math.round(z)}`);

// Check if entity is in positive Z quadrant
if (z > 0) {
    Chat.log("Entity is in positive Z territory");
}
```

**Params**
* `(none)`

**Returns**
* `number`: The Z coordinate of this entity.

### EntityHelper.getGlowingColor
```js
const entity = event.entity;
const color = entity.getGlowingColor();
Chat.log(`Glowing color: ${color}`);

// Convert to hex string
const hexColor = `#${color.toString(16).padStart(6, '0')}`;
Chat.log(`Glowing color (hex): ${hexColor}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The RGB color value of the entity's glow effect.

**Notes**
- This is affected by `setGlowingColor()`.

### EntityHelper.is
```js
const entity = event.entity;

// Check single type
if (entity.is("minecraft:zombie")) {
    Chat.log("It's a zombie!");
}

// Check multiple types
if (entity.is("minecraft:cow", "minecraft:mooshroom")) {
    Chat.log("It's some kind of bovine!");
}

// Can omit namespace
if (entity.is("zombie", "skeleton", "creeper")) {
    Chat.log("Hostile mob detected!");
}
```

**Params**
1. `...types: string`: One or more entity type IDs to check against.

**Returns**
* `boolean`: `true` if this entity's type matches any of the specified types.

### EntityHelper.isAlive
```js
const entity = event.entity;
if (entity.isAlive()) {
    Chat.log(`${entity.getName().getString()} is alive`);

    const pos = entity.getPos();
    Chat.log(`Position: ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
} else {
    Chat.log(`${entity.getName().getString()} is dead`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this entity is still alive, `false` otherwise.

### EntityHelper.isGlowing
```js
const entity = event.entity;
if (entity.isGlowing()) {
    Chat.log(`${entity.getName().getString()} is glowing`);

    const color = entity.getGlowingColor();
    Chat.log(`Glow color: ${color}`);
} else {
    Chat.log(`${entity.getName().getString()} is not glowing`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this entity has the glowing effect, `false` otherwise.

### EntityHelper.isInLava
```js
const entity = event.entity;
if (entity.isInLava()) {
    Chat.log(`${entity.getName().getString()} is in lava!`);

    const health = entity.asLiving().getHealth();
    Chat.log(`Health while in lava: ${health}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this entity is in lava, `false` otherwise.

### EntityHelper.isOnFire
```js
const entity = event.entity;
if (entity.isOnFire()) {
    Chat.log(`${entity.getName().getString()} is on fire!`);

    if (entity.isInLava()) {
        Chat.log("Probably because it's in lava");
    }
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this entity is on fire, `false` otherwise.

### EntityHelper.isSneaking
```js
const entity = event.entity;
if (entity.isSneaking()) {
    Chat.log(`${entity.getName().getString()} is sneaking`);

    // Sneaking affects hitbox size
    const eyeHeight = entity.getEyeHeight();
    Chat.log(`Eye height while sneaking: ${eyeHeight}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this entity is sneaking, `false` otherwise.

### EntityHelper.isSprinting
```js
const entity = event.entity;
if (entity.isSprinting()) {
    Chat.log(`${entity.getName().getString()} is sprinting`);

    const speed = entity.getSpeed();
    Chat.log(`Current speed: ${Math.round(speed * 100) / 100} blocks/sec`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this entity is sprinting, `false` otherwise.

### EntityHelper.rayTraceBlock
```js
const entity = event.entity;

// Raycast 5 blocks ahead, ignoring fluids
const blockHit = entity.rayTraceBlock(5, false);
if (blockHit) {
    const block = blockHit.getBlock();
    const pos = blockHit.getBlockPos();
    Chat.log(`Looking at: ${block.getId()} at ${pos.getX()}, ${pos.getY()}, ${pos.getZ()}`);
} else {
    Chat.log("No block in range");
}

// Raycast including fluids
const fluidHit = entity.rayTraceBlock(5, true);
if (fluidHit) {
    Chat.log("Hit a fluid or block");
}
```

**Params**
1. `distance: number`: The maximum distance to raycast.
2. `fluid: boolean`: Whether to include fluids in the raycast.

**Returns**
* `BlockDataHelper | null`: The block data that was hit, or `null` if nothing was hit.

### EntityHelper.rayTraceEntity
```js
const entity = event.entity;
const hitEntity = entity.rayTraceEntity(10);

if (hitEntity) {
    Chat.log(`Looking at entity: ${hitEntity.getName().getString()} (${hitEntity.getType()})`);

    const distance = entity.distanceTo(hitEntity);
    Chat.log(`Distance: ${Math.round(distance * 10) / 10} blocks`);
} else {
    Chat.log("No entity in range");
}
```

**Params**
1. `distance: int`: The maximum distance to check for entities.

**Returns**
* `EntityHelper | null`: The entity that was hit, or `null` if no entity was hit.

### EntityHelper.resetGlowing
```js
const entity = event.entity;

// Set entity to glow
entity.setGlowing(true);
entity.setGlowingColor(0xFF0000); // Red
Chat.log("Entity is now glowing red");

// Reset to proper glowing state
entity.resetGlowing();
Chat.log("Entity glow reset to proper state");
```

**Params**
* `(none)`

**Returns**
* `EntityHelper`: This entity helper for method chaining.

### EntityHelper.resetGlowingColor
```js
const entity = event.entity;

// Change glow color
entity.setGlowingColor(0x00FF00); // Green
Chat.log("Entity glow color changed to green");

// Reset to default color
entity.resetGlowingColor();
Chat.log("Entity glow color reset to default");
```

**Params**
* `(none)`

**Returns**
* `EntityHelper`: This entity helper for method chaining.

### EntityHelper.setCustomName
```js
const entity = event.entity;

// Set a custom name
const customName = TextHelper.of("Special " + entity.getName().getString());
entity.setCustomName(customName).setCustomNameVisible(true);

// Remove custom name
entity.setCustomName(null).setCustomNameVisible(false);
```

**Params**
1. `name: TextHelper | null`: The custom name to set, or `null` to remove the custom name.

**Returns**
* `EntityHelper`: This entity helper for method chaining.

### EntityHelper.setCustomNameVisible
```js
const entity = event.entity;

// Make custom name always visible
entity.setCustomNameVisible(true);

// Hide custom name (only visible when looked at)
entity.setCustomNameVisible(false);
```

**Params**
1. `visible: boolean`: Whether the custom name should always be visible.

**Returns**
* `EntityHelper`: This entity helper for method chaining.

### EntityHelper.setGlowing
```js
const entity = event.entity;

// Force entity to glow
entity.setGlowing(true);
Chat.log(`${entity.getName().getString()} is now forced to glow`);

// Stop forcing glow (let game decide based on effects)
entity.setGlowing(false);
Chat.log(`${entity.getName().getString()} glow forced off`);
```

**Params**
1. `val: boolean`: Whether to force this entity to be glowing.

**Returns**
* `EntityHelper`: This entity helper for method chaining.

### EntityHelper.setGlowingColor
```js
const entity = event.entity;

// Set different colors
entity.setGlowingColor(0xFF0000); // Red
Chat.log("Entity is now glowing red");

entity.setGlowingColor(0x00FF00); // Green
Chat.log("Entity is now glowing green");

entity.setGlowingColor(0x0000FF); // Blue
Chat.log("Entity is now glowing blue");
```

**Params**
1. `color: int`: The RGB color value for the glow effect.

**Returns**
* `EntityHelper`: This entity helper for method chaining.