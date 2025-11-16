# Hud

Functions for creating custom screens, drawing on the screen (2D), and rendering in the world (3D). Accessible from scripts via the global `Hud` variable.

## Fields
- [Hud.overlays](#hudoverlays)
- [Hud.renders](#hudrenders)

## Methods
- [Hud](#hud)
  - [Fields](#fields)
  - [Methods](#methods)
  - [Fields](#fields-1)
    - [Hud.overlays](#hudoverlays)
    - [Hud.renders](#hudrenders)
  - [Methods](#methods-1)
    - [Hud.createScreen](#hudcreatescreen)
    - [Hud.openScreen](#hudopenscreen)
    - [Hud.getOpenScreen](#hudgetopenscreen)
    - [Hud.createTexture](#hudcreatetexture)
      - [Overloads](#overloads)
    - [Hud.getRegisteredTextures](#hudgetregisteredtextures)
    - [Hud.getScaleFactor](#hudgetscalefactor)
    - [Hud.getOpenScreenName](#hudgetopenscreenname)
    - [Hud.isContainer](#hudiscontainer)
    - [Hud.createDraw2D](#hudcreatedraw2d)
    - [Hud.registerDraw2D](#hudregisterdraw2d)
    - [Hud.unregisterDraw2D](#hudunregisterdraw2d)
    - [Hud.listDraw2Ds](#hudlistdraw2ds)
    - [Hud.clearDraw2Ds](#hudcleardraw2ds)
    - [Hud.createDraw3D](#hudcreatedraw3d)
    - [Hud.registerDraw3D](#hudregisterdraw3d)
    - [Hud.unregisterDraw3D](#hudunregisterdraw3d)
    - [Hud.listDraw3Ds](#hudlistdraw3ds)
    - [Hud.clearDraw3Ds](#hudcleardraw3ds)
    - [Hud.getMouseX](#hudgetmousex)
    - [Hud.getMouseY](#hudgetmousey)
    - [Hud.getWindowWidth](#hudgetwindowwidth)
    - [Hud.getWindowHeight](#hudgetwindowheight)

## Fields
### Hud.overlays
Internal list of active 2D overlays. Do not modify this directly.

**Type**
* `java.util.Set<IDraw2D<Draw2D>>`

### Hud.renders
Internal list of active 3D renders. Do not modify this directly.

**Type**
* `java.util.Set<Draw3D>`

## Methods

### Hud.createScreen
```js
const myScreen = Hud.createScreen("My Custom Screen", true);
const button = myScreen.addButton(10, 10, 100, 20, "Click Me!", JavaWrapper.methodToJava(() => {
    Chat.log("Button clicked!");
}));
Hud.openScreen(myScreen);
```

**Params**
1. `title: string`: The title of the screen.
2. `dirtBG: boolean`: If `true`, the screen will have the classic dirt background.

**Returns**
* `ScriptScreen`: A new screen object that can be customized with widgets.

### Hud.openScreen
```js
const screen = Hud.createScreen("Info", false);
screen.addText("Hello!", 10, 10, 0xFFFFFF, true);
Hud.openScreen(screen);
```

**Params**
1. `s: IScreen`: The screen object to open.

**Returns**
* `void`

### Hud.getOpenScreen
```js
const currentScreen = Hud.getOpenScreen();
if (currentScreen) {
    Chat.log(`Current screen title: ${currentScreen.getTitle()}`);
} else {
    Chat.log("No custom screen is open.");
}
```

**Params**
* `(none)`

**Returns**
* `IScreen | null`: The currently open custom screen, or `null` if no custom screen is open.

### Hud.createTexture
```js
// Create a blank 16x16 texture
const blankTexture = Hud.createTexture(16, 16, "my_blank_texture");

// Load a texture from a file
// Note: Requires an absolute path. Use FS.toRawFile().getAbsolutePath()
const imagePath = FS.toRawFile("my_image.png").getAbsolutePath();
const imageTexture = Hud.createTexture(imagePath, "my_image_texture");
```

**Params**
1. `width: int` / `path: string`: The width of the new texture, or the absolute path to an image file.
2. `height: int` / `name: string`: The height of the new texture, or the unique name for the texture.
3. `name: string`: The unique name for the texture (only for the width/height overload).

**Returns**
* `CustomImage`: A custom image object that can be used as a texture for screen elements.

#### Overloads
- `Hud.createTexture(width: int, height: int, name: string)`
- `Hud.createTexture(path: string, name: string)`

### Hud.getRegisteredTextures
```js
const textures = Hud.getRegisteredTextures();
Chat.log("Registered textures:");
for (const name of textures.keySet()) {
    Chat.log(`- ${name}`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.Map<string, CustomImage>`: An immutable map of all registered custom textures.

### Hud.getScaleFactor
```js
const scale = Hud.getScaleFactor();
Chat.log(`GUI Scale Factor: ${scale}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The current GUI scale factor of Minecraft.

### Hud.getOpenScreenName
```js
const screenName = Hud.getOpenScreenName();
if (screenName) {
    Chat.log(`Currently open screen: ${screenName}`);
}
```

**Params**
* `(none)`

**Returns**
* `string | null`: The class name of the currently open screen, or `null` if no screen is open.

### Hud.isContainer
```js
if (Hud.isContainer()) {
    Chat.log("A container screen (like a chest) is open.");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the currently open screen is a container (e.g., chest, inventory), `false` otherwise.

### Hud.createDraw2D
```js
const overlay = Hud.createDraw2D();
overlay.addText("Hello from an overlay!", 10, 10, 0xFFFFFF, true);
overlay.register(); // This makes it visible

// To remove it later:
// overlay.unregister();
```

**Params**
* `(none)`

**Returns**
* `Draw2D`: A new 2D drawing object for creating screen overlays.

### Hud.registerDraw2D
**Deprecated:** Use `myDraw2D.register()` instead.
```js
// Deprecated way
const overlay = Hud.createDraw2D();
Hud.registerDraw2D(overlay);

// Modern way
const overlay = Hud.createDraw2D();
overlay.register();
```

**Params**
1. `overlay: IDraw2D<Draw2D>`: The 2D overlay to register for rendering.

**Returns**
* `void`

### Hud.unregisterDraw2D
**Deprecated:** Use `myDraw2D.unregister()` instead.
```js
// Deprecated way
Hud.unregisterDraw2D(overlay);

// Modern way
overlay.unregister();
```

**Params**
1. `overlay: IDraw2D<Draw2D>`: The 2D overlay to unregister.

**Returns**
* `void`

### Hud.listDraw2Ds
```js
const overlays = Hud.listDraw2Ds();
Chat.log(`There are ${overlays.size()} active overlays.`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<IDraw2D<Draw2D>>`: A list of all currently registered 2D overlays.

### Hud.clearDraw2Ds
```js
Hud.clearDraw2Ds();
Chat.log("All 2D overlays have been cleared.");
```

**Params**
* `(none)`

**Returns**
* `void`

### Hud.createDraw3D
```js
const render = Hud.createDraw3D();
const playerPos = Player.getPlayer().getPos();
render.addBox(playerPos.x - 1, playerPos.y, playerPos.z - 1, playerPos.x + 1, playerPos.y + 2, playerPos.z + 1, 0xFF0000, 128, true);
render.register(); // This makes it visible

// To remove it later:
// render.unregister();
```

**Params**
* `(none)`

**Returns**
* `Draw3D`: A new 3D drawing object for rendering shapes in the world.

### Hud.registerDraw3D
**Deprecated:** Use `myDraw3D.register()` instead.
```js
// Deprecated way
const render = Hud.createDraw3D();
Hud.registerDraw3D(render);

// Modern way
const render = Hud.createDraw3D();
render.register();
```

**Params**
1. `draw: Draw3D`: The 3D render object to register.

**Returns**
* `void`

### Hud.unregisterDraw3D
**Deprecated:** Use `myDraw3D.unregister()` instead.
```js
// Deprecated way
Hud.unregisterDraw3D(render);

// Modern way
render.unregister();
```

**Params**
1. `draw: Draw3D`: The 3D render object to unregister.

**Returns**
* `void`

### Hud.listDraw3Ds
```js
const renders = Hud.listDraw3Ds();
Chat.log(`There are ${renders.size()} active 3D renders.`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<Draw3D>`: A list of all currently registered 3D renders.

### Hud.clearDraw3Ds
```js
Hud.clearDraw3Ds();
Chat.log("All 3D renders have been cleared.");
```

**Params**
* `(none)`

**Returns**
* `void`

### Hud.getMouseX
```js
const mouseX = Hud.getMouseX();
```

**Params**
* `(none)`

**Returns**
* `double`: The current X coordinate of the mouse on the screen.

### Hud.getMouseY
```js
const mouseY = Hud.getMouseY();
```

**Params**
* `(none)`

**Returns**
* `double`: The current Y coordinate of the mouse on the screen.

### Hud.getWindowWidth
```js
const width = Hud.getWindowWidth();
```

**Params**
* `(none)`

**Returns**
* `int`: The current width of the Minecraft window in pixels.

### Hud.getWindowHeight
```js
const height = Hud.getWindowHeight();
```

**Params**
* `(none)`

**Returns**
* `int`: The current height of the Minecraft window in pixels.