# Client

Functions that interact with Minecraft that don't fit into their own module. Accessible from scripts via the global `Client` variable.

## Fields
- [Client.tickSynchronizer](#clientticksynchronizer)

## Methods
- [Client](#client)
  - [Fields](#fields)
  - [Methods](#methods)
  - [Fields](#fields-1)
    - [Client.tickSynchronizer](#clientticksynchronizer)
  - [Methods](#methods-1)
    - [Client.getMinecraft](#clientgetminecraft)
    - [Client.getRegistryManager](#clientgetregistrymanager)
    - [Client.createPacketByteBuffer](#clientcreatepacketbytebuffer)
    - [Client.runOnMainThread](#clientrunonmainthread)
      - [Overloads](#overloads)
    - [Client.getGameOptions](#clientgetgameoptions)
    - [Client.mcVersion](#clientmcversion)
    - [Client.getFPS](#clientgetfps)
    - [Client.loadWorld](#clientloadworld)
    - [Client.connect](#clientconnect)
    - [Client.disconnect](#clientdisconnect)
    - [Client.shutdown](#clientshutdown)
    - [Client.waitTick](#clientwaittick)
    - [Client.ping](#clientping)
    - [Client.pingAsync](#clientpingasync)
    - [Client.cancelAllPings](#clientcancelallpings)
    - [Client.getLoadedMods](#clientgetloadedmods)
    - [Client.isModLoaded](#clientismodloaded)
    - [Client.getMod](#clientgetmod)
    - [Client.grabMouse](#clientgrabmouse)
    - [Client.isDevEnv](#clientisdevenv)
    - [Client.getModLoader](#clientgetmodloader)
    - [Client.getRegisteredBlocks](#clientgetregisteredblocks)
    - [Client.getRegisteredItems](#clientgetregistereditems)
    - [Client.exitGamePeacefully](#clientexitgamepeacefully)
    - [Client.exitGameForcefully](#clientexitgameforcefully)
    - [Client.sendPacket](#clientsendpacket)
    - [Client.receivePacket](#clientreceivepacket)

## Fields
### Client.tickSynchronizer
An internal field used for tick synchronization. It is not recommended to interact with this directly.

**Type**
* `TickSync`

## Methods

### Client.getMinecraft
```js
const mc = Client.getMinecraft();
```

**Params**
* `(none)`

**Returns**
* `MinecraftClient`: The raw Minecraft client instance.

**Notes**
This provides raw access to the MinecraftClient java class. On fabric, methods, fields, and classes can be accessed via their intermediary names (ex. method_29043). If the minecraft version is 1.21.11 or beyond, they can be accessed via their unobfuscated Mojang names. 

### Client.getRegistryManager
```js
const registryManager = Client.getRegistryManager();
const stoneBlock = registryManager.getBlock("minecraft:stone");
```

**Params**
* `(none)`

**Returns**
* `RegistryHelper`: A helper for interacting with Minecraft's registry.

### Client.createPacketByteBuffer
```js
const buffer = Client.createPacketByteBuffer();
```

**Params**
* `(none)`

**Returns**
* `PacketByteBufferHelper`: A helper to create, modify, and send Minecraft packets.

### Client.runOnMainThread
```js
Client.runOnMainThread(JavaWrapper.methodToJava(() => {
    Chat.log("This runs on the main thread!");
}));
```

**Params**
1. `runnable: MethodWrapper()`: The task to run on the main Minecraft thread.
2. `await?: boolean`: If `true`, blocks the script until the task is completed.
3. `watchdogMaxTime?: long`: The maximum time in milliseconds for the watchdog to wait before killing the script if it becomes unresponsive.

**Returns**
* `void`

#### Overloads
- `Client.runOnMainThread(runnable: function)`
- `Client.runOnMainThread(runnable: function, watchdogMaxTime: long)`
- `Client.runOnMainThread(runnable: function, await: boolean, watchdogMaxTime: long)`

### Client.getGameOptions
```js
const options = Client.getGameOptions();
const fov = options.getFov();
```

**Params**
* `(none)`

**Returns**
* `OptionsHelper`: A helper which gives access to all game options.

### Client.mcVersion
```js
const version = Client.mcVersion();
Chat.log(`Running on Minecraft ${version}`); // e.g., "25w06a"
```

**Params**
* `(none)`

**Returns**
* `string`: The current Minecraft version.

### Client.getFPS
```js
const fps = Client.getFPS();
Chat.log(fps); // e.g., "120 fps"
```

**Params**
* `(none)`

**Returns**
* `string`: The FPS debug string from Minecraft.

### Client.loadWorld
```js
Client.loadWorld("New World");
```

**Params**
1. `folderName: string`: The folder name of the singleplayer world to join.

**Returns**
* `void`

### Client.connect
```js
Client.connect("hypixel.net");
Client.connect("localhost", 25565);
```

**Params**
1. `ip: string`: The IP address of the server.
2. `port?: int`: The port of the server.

**Returns**
* `void`

### Client.disconnect
```js
Client.disconnect();

Client.disconnect(JavaWrapper.methodToJava((success: boolean) => {
    if (success) {
        Chat.log("Successfully disconnected.");
    }
}));
```

**Params**
1. `callback?: MethodWrapper(success: boolean)`: A function to call after disconnecting. The function receives a boolean indicating if the disconnection was successful.

**Returns**
* `void`

### Client.shutdown
```js
Client.shutdown();
// No more code will be executed
```

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
Closes the client (stops the game). This method waits until the game has stopped, meaning no further code in the script is executed. This does not wait on joined threads, so your script may stop at an undefined point.

### Client.waitTick
```js
Chat.log("Waiting one tick...");
Client.waitTick();
Chat.log("Done waiting!");

Chat.log("Waiting 20 ticks (1 second)...");
Client.waitTick(20);
Chat.log("Done waiting!");
```

**Params**
1. `ticks?: int = 1`: The number of client ticks to wait.

**Returns**
* `void`

**Notes**
If run from the main thread, this will throw an IllegalThreadStateException.

### Client.ping
```js
const serverInfo = Client.ping("mc.hypixel.net");
if (serverInfo) {
    Chat.log(`Players online: ${serverInfo.getPlayerCountLabel().getString()}`);
}
```

**Params**
1. `ip: string`: The IP address of the server to ping.

**Returns**
* `ServerInfoHelper | null`: Information about the server, or `null` if the ping fails.

### Client.pingAsync
```js
Client.pingAsync("mc.hypixel.net", JavaWrapper.methodToJava((serverInfo, error) => {
    if (error) {
        Chat.log(`Ping failed: ${error.getMessage()}`);
        return;
    }
    Chat.log(`Players online: ${serverInfo.getPlayerCountLabel().getString()}`);
}));
```

**Params**
1. `ip: string`: The IP address of the server to ping.
2. `callback: MethodWrapper(serverInfo: ServerInfoHelper, error: IOException)`: A function to call with the result.

**Returns**
* `void`

### Client.cancelAllPings
```js
Client.cancelAllPings();
```

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
Cancels any ongoing pings started with `pingAsync` or `ping` if called from another thread.

### Client.getLoadedMods
```js
const mods = Client.getLoadedMods();
Chat.log(`Loaded ${mods.size()} mods.`);
if (mods.size() > 0) {
    Chat.log(`mods[0] has id: ${mods.get(0).getId()}`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<? extends ModContainerHelper<?>>`: A list of all loaded mods.

### Client.isModLoaded
```js
if (Client.isModLoaded("sodium")) {
    Chat.log("Sodium is loaded!");
}
```

**Params**
1. `modId: string`: The ID of the mod to check.

**Returns**
* `boolean`: `true` if the mod is loaded, `false` otherwise.

### Client.getMod
```js
const jsmacrosMod = Client.getMod("jsmacros");
if (jsmacrosMod) {
    Chat.log(`JSMacros version: ${jsmacrosMod.getVersion()}`);
}
```

**Params**
1. `modId: string`: The ID of the mod to get.

**Returns**
* `ModContainerHelper<?> | null`: The mod container for the given mod ID, or `null` if not found.

### Client.grabMouse
```js
Client.grabMouse();
```

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
Makes Minecraft believe that the mouse is currently inside the window. This will also automatically set the "Pause on Lost Focus" option to `false`.

### Client.isDevEnv
```js
if (Client.isDevEnv()) {
    Chat.log("Running in a development environment.");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if running in a development environment, `false` otherwise.

### Client.getModLoader
```js
const loader = Client.getModLoader();
Chat.log(`Mod loader: ${loader}`); // e.g., "Fabric"
```

**Params**
* `(none)`

**Returns**
* `string`: The name of the mod loader (e.g., "Fabric", "Forge").

### Client.getRegisteredBlocks
```js
const blocks = Client.getRegisteredBlocks();
Chat.log(`There are ${blocks.size()} registered blocks.`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<BlockHelper>`: A list of all registered blocks as `BlockHelper` objects.

### Client.getRegisteredItems
```js
const items = Client.getRegisteredItems();
Chat.log(`There are ${items.size()} registered items.`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<ItemHelper>`: A list of all registered items as `ItemHelper` objects.

### Client.exitGamePeacefully
```js
Client.exitGamePeacefully();
```

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
Tries to close the game gracefully, as if the player clicked the "Quit Game" button.

### Client.exitGameForcefully
```js
Client.exitGameForcefully();
```

**Params**
* `(none)`

**Returns**
* `void`

**Notes**
Forcefully terminates the game process.

### Client.sendPacket
```js
const HandSwingC2SPacket = Java.type("net.minecraft.class_2879");
const Hand = Java.type("net.minecraft.class_1268");
const MainHandSwingPacket = new HandSwingC2SPacket(Hand.MAIN_HAND);
Client.sendPacket(MainHandSwingPacket);
```

**Params**
1. `packet: Packet<?>`: The packet to send to the server.

**Returns**
* `void`

### Client.receivePacket
```js
const KeepAliveS2CPacket = Java.type("net.minecraft.class_2670");
Client.receivePacket(new KeepAliveS2CPacket(123456789n));
```

**Params**
1. `packet: Packet<ClientPlayPacketListener>`: The packet to be processed by the client.

**Returns**
* `void`
