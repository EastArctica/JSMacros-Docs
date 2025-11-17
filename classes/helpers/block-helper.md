# BlockHelper

Represents a block type in Minecraft. This class provides access to block properties, behaviors, and states. Note that this represents the block type itself, not a specific block instance in the world (use BlockDataHelper for that). Block helpers are typically obtained from BlockDataHelper or by creating them from block IDs.

## Methods
- [BlockHelper.canMobSpawnInside](#blockhelpercanmobspawninside)
- [BlockHelper.getDefaultItemStack](#blockhelpergetdefaultitemstack)
- [BlockHelper.getDefaultState](#blockhelpergetdefaultstate)
- [BlockHelper.getBlastResistance](#blockhelpergetblastresistance)
- [BlockHelper.getHardness](#blockhelpergethardness)
- [BlockHelper.getId](#blockhelpergetid)
- [BlockHelper.getJumpVelocityMultiplier](#blockhelpergetjumpvelocitymultiplier)
- [BlockHelper.getName](#blockhelpergetname)
- [BlockHelper.getSlipperiness](#blockhelpergetslipperiness)
- [BlockHelper.getStates](#blockhelpergetstates)
- [BlockHelper.getTags](#blockhelpergettags)
- [BlockHelper.getVelocityMultiplier](#blockhelpergetvelocitymultiplier)
- [BlockHelper.hasDynamicBounds](#blockhelperhasdynamicbounds)

### BlockHelper.canMobSpawnInside
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
if (block.canMobSpawnInside()) {
    Chat.log(`${block.getName().getString()} allows mob spawning inside`);
} else {
    Chat.log(`${block.getName().getString()} prevents mob spawning inside`);
}

// Examples of blocks that allow spawning inside
const airBlock = new BlockHelper(Blocks.AIR);
const waterBlock = new BlockHelper(Blocks.WATER);
Chat.log(`Air allows spawning: ${airBlock.canMobSpawnInside()}`);
Chat.log(`Water allows spawning: ${waterBlock.canMobSpawnInside()}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if mobs can spawn inside this block type, `false` otherwise.

### BlockHelper.getDefaultItemStack
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const itemStack = block.getDefaultItemStack();

Chat.log(`Block: ${block.getName().getString()}`);
Chat.log(`Item: ${itemStack.getName().getString()}`);
Chat.log(`Item ID: ${itemStack.getItemId()}`);

if (!itemStack.isEmpty()) {
    Chat.log(`Max stack size: ${itemStack.getMaxCount()}`);
}
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: The default item stack representation of this block.

**Notes**
- Some blocks like air or water will return empty item stacks.
- Most blocks return their corresponding item form.

### BlockHelper.getDefaultState
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const defaultState = block.getDefaultState();

Chat.log(`Default state of ${block.getName().getString()}:`);
Chat.log(`Solid: ${defaultState.isSolid()}`);
Chat.log(`Opaque: ${defaultState.isOpaque()}`);
Chat.log(`Full cube: ${defaultState.isFullCube()}`);
```

**Params**
* `(none)`

**Returns**
* `BlockStateHelper`: The default block state for this block type.

### BlockHelper.getBlastResistance
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const resistance = block.getBlastResistance();

Chat.log(`Blast resistance: ${resistance}`);

if (resistance > 1000) {
    Chat.log("This block is very blast resistant");
} else if (resistance < 1) {
    Chat.log("This block breaks easily to explosions");
}

// Compare blast resistance
const obsidian = new BlockHelper(Blocks.OBSIDIAN);
const stone = new BlockHelper(Blocks.STONE);
Chat.log(`Obsidian resistance: ${obsidian.getBlastResistance()}`);
Chat.log(`Stone resistance: ${stone.getBlastResistance()}`);
```

**Params**
* `(none)`

**Returns**
* `number`: The blast resistance value of this block.

### BlockHelper.getHardness
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const hardness = block.getHardness();

Chat.log(`Block hardness: ${hardness}`);

if (hardness < 0) {
    Chat.log("This block breaks instantly");
} else if (hardness > 50) {
    Chat.log("This block is very hard to mine");
} else {
    Chat.log(`Mining time with appropriate tool: ${Math.round(hardness * 1.5)} seconds`);
}
```

**Params**
* `(none)`

**Returns**
* `number`: The hardness value of this block.

**Notes**
- Hardness determines mining time.
- Negative hardness means the block breaks instantly.

### BlockHelper.getId
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const blockId = block.getId();
const name = block.getName().getString();

Chat.log(`Block ID: ${blockId}`);
Chat.log(`Block name: ${name}`);

// Check for specific blocks
if (blockId === "minecraft:diamond_ore") {
    Chat.log("You found diamond ore!");
} else if (blockId.includes("ore")) {
    Chat.log("You found some kind of ore");
}
```

**Params**
* `(none)`

**Returns**
* `string`: The namespaced ID of this block type.

### BlockHelper.getJumpVelocityMultiplier
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const jumpMultiplier = block.getJumpVelocityMultiplier();

Chat.log(`Jump velocity multiplier: ${jumpMultiplier}`);

if (jumpMultiplier > 1.0) {
    Chat.log("This block makes you jump higher!");
} else if (jumpMultiplier < 1.0) {
    Chat.log("This block reduces jump height");
}

// Check special blocks
const honeyBlock = new BlockHelper(Blocks.HONEY_BLOCK);
const slimeBlock = new BlockHelper(Blocks.SLIME_BLOCK);
Chat.log(`Honey block jump multiplier: ${honeyBlock.getJumpVelocityMultiplier()}`);
Chat.log(`Slime block jump multiplier: ${slimeBlock.getJumpVelocityMultiplier()}`);
```

**Params**
* `(none)`

**Returns**
* `number`: The jump velocity multiplier for this block type.

### BlockHelper.getName
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const name = block.getName().getString();
const id = block.getId();

Chat.log(`Block name: ${name}`);
Chat.log(`Block ID: ${id}`);

// Names are localized
const stone = new BlockHelper(Blocks.STONE);
Chat.log(`Stone name: ${stone.getName().getString()}`);
```

**Params**
* `(none)`

**Returns**
* `TextHelper`: The localized name of this block type.

### BlockHelper.getSlipperiness
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const slipperiness = block.getSlipperiness();

Chat.log(`Block slipperiness: ${slipperiness}`);

if (slipperiness > 0.6) {
    Chat.log("This block is very slippery");
} else if (slipperiness < 0.6) {
    Chat.log("This block has less friction than normal");
}

// Compare with known slippery blocks
const ice = new BlockHelper(Blocks.ICE);
const blueIce = new BlockHelper(Blocks.BLUE_ICE);
Chat.log(`Ice slipperiness: ${ice.getSlipperiness()}`);
Chat.log(`Blue ice slipperiness: ${blueIce.getSlipperiness()}`);
```

**Params**
* `(none)`

**Returns**
* `number`: The slipperiness value of this block.

**Notes**
- Higher values make the block more slippery.
- Normal blocks have a slipperiness of 0.6.

### BlockHelper.getStates
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const states = block.getStates();

Chat.log(`${block.getName().getString()} has ${states.size()} possible states:`);
for (let i = 0; i < Math.min(states.size(), 5); i++) {
    const state = states.get(i);
    Chat.log(`- ${state.toString()}`);
}

if (states.size() > 5) {
    Chat.log(`... and ${states.size() - 5} more states`);
}

// Example: Redstone has many states
const redstone = new BlockHelper(Blocks.REDSTONE_WIRE);
const redstoneStates = redstone.getStates();
Chat.log(`Redstone wire has ${redstoneStates.size()} possible states`);
```

**Params**
* `(none)`

**Returns**
* `java.util.List<BlockStateHelper>`: All possible block states for this block type.

### BlockHelper.getTags
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const tags = block.getTags();

Chat.log(`${block.getName().getString()} has ${tags.size()} tags:`);
for (const tag of tags) {
    Chat.log(`- ${tag}`);
}

// Check for specific tag types
const hasOreTag = tags.some(tag => tag.includes("ores"));
const hasWoodTag = tags.some(tag => tag.includes("logs"));
const hasStoneTag = tags.some(tag => tag.includes("stone"));

if (hasOreTag) Chat.log("This is an ore block");
if (hasWoodTag) Chat.log("This is a wood block");
if (hasStoneTag) Chat.log("This is a stone block");
```

**Params**
* `(none)`

**Returns**
* `java.util.List<string>`: A list of all block tags this block belongs to.

### BlockHelper.getVelocityMultiplier
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const velocityMultiplier = block.getVelocityMultiplier();

Chat.log(`Velocity multiplier: ${velocityMultiplier}`);

if (velocityMultiplier < 1.0) {
    Chat.log("This block slows down movement");
} else if (velocityMultiplier > 1.0) {
    Chat.log("This block speeds up movement");
}

// Check special blocks
const soulSand = new BlockHelper(Blocks.SOUL_SAND);
const honeyBlock = new BlockHelper(Blocks.HONEY_BLOCK);
Chat.log(`Soul sand velocity multiplier: ${soulSand.getVelocityMultiplier()}`);
Chat.log(`Honey block velocity multiplier: ${honeyBlock.getVelocityMultiplier()}`);
```

**Params**
* `(none)`

**Returns**
* `number`: The velocity multiplier for entities on this block.

### BlockHelper.hasDynamicBounds
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const hasDynamicBounds = block.hasDynamicBounds();

Chat.log(`${block.getName().getString()} has dynamic bounds: ${hasDynamicBounds}`);

if (hasDynamicBounds) {
    Chat.log("This block's bounding box can change based on its state");
} else {
    Chat.log("This block has a fixed bounding box");
}

// Examples of blocks with dynamic bounds
const chest = new BlockHelper(Blocks.CHEST);
const piston = new BlockHelper(Blocks.PISTON);
Chat.log(`Chest has dynamic bounds: ${chest.hasDynamicBounds()}`);
Chat.log(`Piston has dynamic bounds: ${piston.hasDynamicBounds()}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this block has dynamic bounds, `false` otherwise.

**Notes**
- Dynamic bounds mean the block's collision box can change based on state or neighboring blocks.
- Examples include chests (lid position), pistons (extended state), etc.

## Usage Examples

### Creating Block Helpers
```js
// Method 1: From existing block data
const blockData = World.getBlockAt(Player.getPlayer().getBlockPos());
const block = blockData.getBlock();

// Method 2: From block ID (requires accessing Minecraft classes)
const diamondOre = new BlockHelper(Blocks.DIAMOND_ORE);

// Method 3: From string ID (convert to Block first)
const blockId = "minecraft:oak_log";
const oakLogBlock = Registries.BLOCK.get(new Identifier(blockId));
const oakLog = new BlockHelper(oakLogBlock);
```

### Comparing Block Types
```js
const currentBlock = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();
const targetBlock = new BlockHelper(Blocks.DIAMOND_ORE);

if (currentBlock.getId() === targetBlock.getId()) {
    Chat.log("You're standing on diamond ore!");
}

// Use tags for broader comparisons
const currentTags = currentBlock.getTags();
if (currentTags.some(tag => tag.includes("ores"))) {
    Chat.log("You're standing on an ore block");
}
```

### Block Properties Analysis
```js
const block = World.getBlockAt(Player.getPlayer().getBlockPos()).getBlock();

Chat.log(`=== ${block.getName().getString()} ===`);
Chat.log(`ID: ${block.getId()}`);
Chat.log(`Hardness: ${block.getHardness()}`);
Chat.log(`Blast resistance: ${block.getBlastResistance()}`);
Chat.log(`Slipperiness: ${block.getSlipperiness()}`);
Chat.log(`Velocity multiplier: ${block.getVelocityMultiplier()}`);
Chat.log(`Jump multiplier: ${block.getJumpVelocityMultiplier()}`);
Chat.log(`Can spawn mobs inside: ${block.canMobSpawnInside()}`);
Chat.log(`Has dynamic bounds: ${block.hasDynamicBounds()}`);

Chat.log(`Tags (${block.getTags().size()}):`);
for (const tag of block.getTags()) {
    Chat.log(`  - ${tag}`);
}
```