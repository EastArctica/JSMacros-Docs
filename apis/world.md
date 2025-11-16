# World

Functions for getting and using world data, including blocks, entities, players, and environmental information. Accessible from scripts via the global `World` variable.

## Fields
- [World.serverInstantTPS](#worldserverinstanttps)
- [World.server1MAverageTPS](#worldserver1maveragetps)
- [World.server5MAverageTPS](#worldserver5maveragetps)
- [World.server15MAverageTPS](#worldserver15maveragetps)

## Methods
- [World](#world)
  - [Fields](#fields)
  - [Methods](#methods)
  - [Fields](#fields-1)
    - [World.serverInstantTPS](#worldserverinstanttps)
    - [World.server1MAverageTPS](#worldserver1maveragetps)
    - [World.server5MAverageTPS](#worldserver5maveragetps)
    - [World.server15MAverageTPS](#worldserver15maveragetps)
  - [Methods](#methods-1)
    - [World.isWorldLoaded](#worldisworldloaded)
    - [World.getLoadedPlayers](#worldgetloadedplayers)
    - [World.getPlayers](#worldgetplayers)
    - [World.getPlayerEntry](#worldgetplayerentry)
    - [World.getBlock](#worldgetblock)
    - [World.getChunk](#worldgetchunk)
    - [World.getWorldScanner](#worldgetworldscanner)
    - [World.findBlocksMatching](#worldfindblocksmatching)
    - [World.iterateSphere](#worlditeratesphere)
    - [World.iterateBox](#worlditeratebox)
    - [World.getScoreboards](#worldgetscoreboards)
    - [World.getEntities](#worldgetentities)
    - [World.rayTraceBlock](#worldraytraceblock)
    - [World.rayTraceEntity](#worldraytraceentity)
    - [World.getDimension](#worldgetdimension)
    - [World.getBiome](#worldgetbiome)
    - [World.getTime](#worldgettime)
    - [World.getTimeOfDay](#worldgettimeofday)
    - [World.isDay / isNight](#worldisday--isnight)
    - [World.isRaining / isThundering](#worldisraining--isthundering)
    - [World.getWorldIdentifier](#worldgetworldidentifier)
    - [World.getRespawnPos](#worldgetrespawnpos)
    - [World.getDifficulty](#worldgetdifficulty)
    - [World.getMoonPhase](#worldgetmoonphase)
    - [World.getSkyLight / getBlockLight](#worldgetskylight--getblocklight)
    - [World.playSoundFile](#worldplaysoundfile)
    - [World.playSound](#worldplaysound)
    - [World.getBossBars](#worldgetbossbars)
    - [World.isChunkLoaded](#worldischunkloaded)
    - [World.getCurrentServerAddress](#worldgetcurrentserveraddress)
    - [World.getBiomeAt](#worldgetbiomeat)
    - [World.getServerTPS](#worldgetservertps)
    - [World.getTabListHeader / getTabListFooter](#worldgettablistheader--gettablistfooter)
    - [World.spawnParticle](#worldspawnparticle)
    - [World.getRaw](#worldgetraw)
    - [World.getServerInstantTPS](#worldgetserverinstanttps)
    - [World.getServer1MAverageTPS](#worldgetserver1maveragetps)
    - [World.getServer5MAverageTPS](#worldgetserver5maveragetps)
    - [World.getServer15MAverageTPS](#worldgetserver15maveragetps)

## Fields
### World.serverInstantTPS
The server's current instantaneous Ticks Per Second (TPS). Do not modify.

**Type**: `double`

### World.server1MAverageTPS
The server's average TPS over the last 1 minute. Do not modify.

**Type**: `double`

### World.server5MAverageTPS
The server's average TPS over the last 5 minutes. Do not modify.

**Type**: `double`

### World.server15MAverageTPS
The server's average TPS over the last 15 minutes. Do not modify.

**Type**: `double`

## Methods

### World.isWorldLoaded
```js
if (World.isWorldLoaded()) {
    Chat.log("A world is currently loaded.");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if a world is loaded, `false` otherwise.

### World.getLoadedPlayers
```js
const nearbyPlayers = World.getLoadedPlayers();
Chat.log(`There are ${nearbyPlayers.size()} players in render distance.`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<PlayerEntityHelper>`: A list of player entities currently within render distance.

### World.getPlayers
```js
const tabListPlayers = World.getPlayers();
Chat.log("Players on tab list:");
for (const player of tabListPlayers) {
    Chat.log(`- ${player.getName()} (${player.getPing()}ms)`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<PlayerListEntryHelper>`: A list of all players currently on the tab list.

### World.getPlayerEntry
```js
const playerEntry = World.getPlayerEntry("Notch");
if (playerEntry) {
    Chat.log(`Notch's gamemode: ${playerEntry.getGameMode()}`);
}
```

**Params**
1. `name: string`: The name of the player.

**Returns**
* `PlayerListEntryHelper | null`: The tab list entry for the given player, or `null` if they are not on the list.

### World.getBlock
```js
// By coordinates
const block1 = World.getBlock(0, 64, 0);

// By BlockPosHelper
const pos = PositionCommon.createBlockPos(0, 64, 0);
const block2 = World.getBlock(pos);
```

**Params**
- `x: int`, `y: int`, `z: int`: The coordinates of the block.
- `pos: BlockPosHelper | Pos3D`: A position object for the block.

**Returns**
* `BlockDataHelper | null`: A helper for the block at the specified position, or `null` if the location is not loaded.

### World.getChunk
```js
const playerPos = Player.getPlayer().getPos();
const chunkX = Math.floor(playerPos.x) >> 4;
const chunkZ = Math.floor(playerPos.z) >> 4;
const chunk = World.getChunk(chunkX, chunkZ);
if (chunk) {
    Chat.log(`Current chunk status: ${chunk.getStatus()}`);
}
```

**Params**
1. `x: int`: The X coordinate of the chunk (block coordinate >> 4).
2. `z: int`: The Z coordinate of the chunk (block coordinate >> 4).

**Returns**
* `ChunkHelper | null`: A helper for the specified chunk, or `null` if it is not loaded.

### World.getWorldScanner
```js
// Find all south-facing chests or barrels with a hardness <= 10
const scanner = World.getWorldScanner()
    .withBlockFilter("getHardness").is("<=", 10)
    .andStringBlockFilter().contains("chest", "barrel")
    .withStringStateFilter().contains("facing=south")
    .build();

const results = scanner.scan(10); // Scan in a 10 chunk radius
Chat.log(`Found ${results.size()} matching blocks.`);
```
Creates a `WorldScanner` or a `WorldScannerBuilder` to perform complex, filtered searches for blocks in the world. This is more efficient than manual iteration for large areas.

**Params**
1. `blockFilter?: MethodWrapper(block: BlockHelper): boolean`: A function to filter by block type.
2. `stateFilter?: MethodWrapper(state: BlockStateHelper): boolean`: A function to filter by block state properties.

**Returns**
* `WorldScannerBuilder`: If no arguments are provided, returns a builder to construct a complex scanner.
* `WorldScanner`: If filters are provided, returns a ready-to-use scanner.

### World.findBlocksMatching
```js
// Find all diamonds within a 5 chunk radius of the player
const diamonds = World.findBlocksMatching("minecraft:diamond_ore", 5);
if (diamonds.size() > 0) {
    Chat.log(`Found ${diamonds.size()} diamond ores! First one at: ${diamonds.get(0)}`);
}
```
Finds the positions of all blocks matching a given set of IDs or filters within a specified chunk range.

**Params**
- `centerX?: int`, `centerZ?: int`: The center chunk coordinates for the search. Defaults to the player's current chunk.
- `id: string` or `ids: string[]`: A single block ID or an array of block IDs to search for.
- `blockFilter?: MethodWrapper(...)`, `stateFilter?: MethodWrapper(...)`: Custom filter functions.
- `chunkrange: int`: The radius of chunks around the center to search.

**Returns**
* `java.util.List<Pos3D>`: A list of `Pos3D` objects for each matching block found.

### World.iterateSphere
```js
const center = Player.getPlayer().getBlockPos();
const callback = JavaWrapper.methodToJava(blockData => {
    if (blockData.getId() === 'minecraft:torch') {
        Chat.log(`Found a torch at ${blockData.getPos()}`);
    }
});
// Iterate a 5-block radius sphere around the player, ignoring air
World.iterateSphere(center, 5, callback);
```
Iterates over every block within a spherical radius and executes a callback function for each one.

**Params**
1. `pos: BlockPosHelper`: The center of the sphere.
2. `radius: int`: The radius of the sphere in blocks.
3. `ignoreAir?: boolean = true`: If `true`, the callback will not be called for air blocks.
4. `callback: MethodWrapper(block: BlockDataHelper)`: The function to call for each block found.

**Returns**
* `void`

### World.iterateBox
```js
const pos1 = Player.getPlayer().getBlockPos().add(5, 5, 5);
const pos2 = Player.getPlayer().getBlockPos().add(-5, -5, -5);
const callback = JavaWrapper.methodToJava(blockData => {
    // ... process block
});
World.iterateBox(pos1, pos2, callback);
```
Iterates over every block within a box defined by two corner positions.

**Params**
1. `pos1: BlockPosHelper`: The first corner of the box.
2. `pos2: BlockPosHelper`: The second corner of the box.
3. `ignoreAir?: boolean = true`: If `true`, the callback will not be called for air blocks.
4. `callback: MethodWrapper(block: BlockDataHelper)`: The function to call for each block found.

**Returns**
* `void`

### World.getScoreboards
```js
const scoreboards = World.getScoreboards();
const sidebar = scoreboards.getSidebar();
if (sidebar) {
    Chat.log(`Sidebar Title: ${sidebar.getTitle()}`);
}
```

**Params**
* `(none)`

**Returns**
* `ScoreboardsHelper`: A helper for accessing scoreboard data.

### World.getEntities
```js
// Get all entities within 10 blocks
const nearbyEntities = World.getEntities(10);

// Get all cows and sheep in render distance
const farmAnimals = World.getEntities(["minecraft:cow", "minecraft:sheep"]);

// Get all living entities within 20 blocks
const filter = JavaWrapper.methodToJava(entity => entity.isLiving());
const livingEntities = World.getEntities(filter);
```
Gets a list of entities in the world, with optional filters for distance, type, or custom logic.

**Params**
- `(none)`: Get all entities in render distance.
- `distance: double`: Get entities within this distance from the player.
- `types: string[]`: Get entities whose type ID is in this array.
- `filter: MethodWrapper(entity: EntityHelper): boolean`: Get entities for which this function returns `true`.

**Returns**
* `java.util.List<EntityHelper<?>>`: A list of matching entities.

### World.rayTraceBlock
```js
const start = Player.getPlayer().getPos();
const end = start.add(0, -10, 0); // 10 blocks straight down
const block = World.rayTraceBlock(start.x, start.y, start.z, end.x, end.y, end.z, false);
if (block) {
    Chat.log(`Block below is: ${block.getId()}`);
}
```
Performs a ray trace between two arbitrary points in the world.

**Params**
- `x1, y1, z1`: The starting coordinates.
- `x2, y2, z2`: The ending coordinates.
- `fluid: boolean`: Whether to include fluids in the trace.

**Returns**
* `BlockDataHelper | null`: The first block hit by the ray trace, or `null`.

### World.rayTraceEntity
```js
const start = Player.getPlayer().getPos();
const end = start.add(0, 10, 0); // 10 blocks straight up
const entity = World.rayTraceEntity(start.x, start.y, start.z, end.x, end.y, end.z);
if (entity) {
    Chat.log(`Entity above is: ${entity.getName()}`);
}
```
Performs a ray trace between two points to find the first entity intersected.

**Params**
- `x1, y1, z1`: The starting coordinates.
- `x2, y2, z2`: The ending coordinates.

**Returns**
* `EntityHelper<?> | null`: The first entity hit, or `null`.

### World.getDimension
```js
const dimension = World.getDimension();
Chat.log(`Current dimension: ${dimension}`); // e.g., "minecraft:the_nether"
```

**Params**
* `(none)`

**Returns**
* `string`: The identifier of the current dimension.

### World.getBiome
```js
const biome = World.getBiome();
Chat.log(`Current biome: ${biome}`); // e.g., "minecraft:plains"
```

**Params**
* `(none)`

**Returns**
* `string`: The identifier of the player's current biome.

### World.getTime
```js
const worldTime = World.getTime();
Chat.log(`Total world ticks: ${worldTime}`);
```

**Params**
* `(none)`

**Returns**
* `long`: The total number of ticks processed since the world was created. Returns `-1` if no world is loaded.

### World.getTimeOfDay
```js
const timeOfDay = World.getTimeOfDay();
const day = Math.floor(timeOfDay / 24000);
Chat.log(`It is day ${day}.`);
```

**Params**
* `(none)`

**Returns**
* `long`: The current time of day in ticks (0-23999). This value is affected by players sleeping. Returns `-1` if no world is loaded.

### World.isDay / isNight
```js
if (World.isDay()) {
    Chat.log("It is daytime.");
} else if (World.isNight()) {
    Chat.log("It is nighttime.");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if it is currently day or night, respectively.

### World.isRaining / isThundering
```js
if (World.isRaining()) {
    Chat.log("It is raining.");
}
if (World.isThundering()) {
    Chat.log("It is thundering.");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the respective weather condition is active.

### World.getWorldIdentifier
```js
const id = World.getWorldIdentifier();
Chat.log(`World ID: ${id}`); // e.g., "127_0_0_1_25565" for a local server
```

**Params**
* `(none)`

**Returns**
* `string`: A unique identifier for the current world/server, typically based on the server IP or singleplayer world name.

### World.getRespawnPos
```js
const respawnPos = World.getRespawnPos();
if (respawnPos) {
    Chat.log(`Respawn position is at: ${respawnPos}`);
}
```

**Params**
* `(none)`

**Returns**
* `BlockPosHelper | null`: The player's current respawn position, or `null`.

### World.getDifficulty
```js
const difficulty = World.getDifficulty(); // 0: peaceful, 1: easy, 2: normal, 3: hard
Chat.log(`Difficulty level: ${difficulty}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The current world difficulty as an integer. Returns `-1` if no world is loaded.

### World.getMoonPhase
```js
const phase = World.getMoonPhase(); // 0: full moon, 4: new moon
Chat.log(`Moon phase: ${phase}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The current moon phase as an integer (0-7). Returns `-1` if no world is loaded.

### World.getSkyLight / getBlockLight
```js
const playerPos = Player.getPlayer().getBlockPos();
const skyLight = World.getSkyLight(playerPos.x, playerPos.y, playerPos.z);
const blockLight = World.getBlockLight(playerPos.x, playerPos.y, playerPos.z);
Chat.log(`Light levels: Sky=${skyLight}, Block=${blockLight}`);
```

**Params**
1. `x: int`, `y: int`, `z: int`: The coordinates to check.

**Returns**
* `int`: The light level (0-15) at the specified position. Returns `-1` if no world is loaded.

### World.playSoundFile
```js
// Note: File path is relative to the script's folder.
const clip = World.playSoundFile("notification.wav", 1.0);
// clip.stop(); // Can be used to stop the sound later
```
Plays a sound from an external audio file.

**Params**
1. `file: string`: The path to the sound file (e.g., `.wav`), relative to the script's folder.
2. `volume: double`: The volume to play the sound at (0.0 to 1.0).

**Returns**
* `javax.sound.sampled.Clip`: The audio clip object, which can be used to control playback.

### World.playSound
```js
// Play a sound at the player's location
const playerPos = Player.getPlayer().getPos();
World.playSound("minecraft:entity.experience_orb.pickup", 1.0, 1.0, playerPos.x, playerPos.y, playerPos.z);

// Play a sound only to the player (UI sound)
World.playSound("minecraft:ui.button.click", 1.0, 1.0);
```
Plays a built-in Minecraft sound.

**Params**
1. `id: string`: The sound event ID (e.g., "minecraft:entity.player.hurt").
2. `volume?: double`: The volume of the sound.
3. `pitch?: double`: The pitch of the sound.
4. `x?: double`, `y?: double`, `z?: double`: The world coordinates to play the sound at. If not provided, the sound is played globally (like a UI sound).

**Returns**
* `void`

### World.getBossBars
```js
const bossBars = World.getBossBars();
if (bossBars.size() > 0) {
    for (const bar of bossBars.values()) {
        Chat.log(`Boss Bar: ${bar.getName()} - ${Math.round(bar.getPercent() * 100)}%`);
    }
}
```

**Params**
* `(none)`

**Returns**
* `java.util.Map<string, BossBarHelper>`: A map of active boss bars, with the boss bar's UUID as the key.

### World.isChunkLoaded
```js
if (World.isChunkLoaded(0, 0)) {
    Chat.log("Chunk (0, 0) is loaded.");
}
```

**Params**
1. `chunkX: int`: The X coordinate of the chunk.
2. `chunkZ: int`: The Z coordinate of the chunk.

**Returns**
* `boolean`: `true` if the chunk is loaded, `false` otherwise.

### World.getCurrentServerAddress
```js
const address = World.getCurrentServerAddress();
if (address) {
    Chat.log(`Connected to: ${address}`);
} else {
    Chat.log("In a singleplayer world.");
}
```

**Params**
* `(none)`

**Returns**
* `string | null`: The address of the current server, or `null` if in singleplayer.

### World.getBiomeAt
```js
const biome = World.getBiomeAt(100, 64, 200);
if (biome) {
    Chat.log(`Biome at (100, 200) is: ${biome}`);
}
```
Gets the biome at a specific location, provided the chunk is loaded.

**Params**
- `x: int`, `z: int`: The X and Z coordinates.
- `x: int`, `y: int`, `z: int`: The X, Y, and Z coordinates.

**Returns**
* `string | null`: The biome identifier, or `null` if the location is not loaded.

### World.getServerTPS
```js
const tpsInfo = World.getServerTPS();
Chat.log(tpsInfo);
```

**Params**
* `(none)`

**Returns**
* `string`: A formatted string containing various TPS measurements.

### World.getTabListHeader / getTabListFooter
```js
const header = World.getTabListHeader();
const footer = World.getTabListFooter();
if (header) Chat.log(`Header: ${header.getString()}`);
if (footer) Chat.log(`Footer: ${footer.getString()}`);
```

**Params**
* `(none)`

**Returns**
* `TextHelper | null`: A `TextHelper` for the header or footer text, or `null` if it's not set.

### World.spawnParticle
```js
const pos = Player.getPlayer().getPos();
// Spawn 10 flame particles at the player's feet
World.spawnParticle("minecraft:flame", pos.x, pos.y, pos.z, 10);

// Spawn a cloud of smoke particles
World.spawnParticle("minecraft:smoke", pos.x, pos.y, pos.z, 0.5, 0.5, 0.5, 0.1, 50, false);
```
Spawns particles in the world.

**Params**
- `id: string`: The particle ID.
- `x, y, z`: The central position to spawn the particles.
- `count: int`: The number of particles to spawn.
- `deltaX, deltaY, deltaZ`: The random offset range for particle positions.
- `speed: double`: The speed/velocity of the particles.
- `force: boolean`: If `true`, particles will be visible from further away.

**Returns**
* `void`

### World.getRaw
```js
const rawWorld = World.getRaw();
// Advanced, low-level interaction with the raw ClientWorld object
```

**Params**
* `(none)`

**Returns**
* `net.minecraft.client.world.ClientWorld`: The raw Minecraft world object.

### World.getServerInstantTPS
```js
const tps = World.getServerInstantTPS();
Chat.log(`Instant TPS: ${tps.toFixed(2)}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The server's current instantaneous TPS.

### World.getServer1MAverageTPS
```js
const tps = World.getServer1MAverageTPS();
Chat.log(`1-Min Avg TPS: ${tps.toFixed(2)}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The server's average TPS over the last minute.

### World.getServer5MAverageTPS
```js
const tps = World.getServer5MAverageTPS();
Chat.log(`5-Min Avg TPS: ${tps.toFixed(2)}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The server's average TPS over the last 5 minutes.

### World.getServer15MAverageTPS
```js
const tps = World.getServer15MAverageTPS();
Chat.log(`15-Min Avg TPS: ${tps.toFixed(2)}`);
```

**Params**
* `(none)`

**Returns**
* `double`: The server's average TPS over the last 15 minutes.