# JsMacros Helper Classes

Helper classes provide easy access to Minecraft game objects like entities, items, blocks, and more. These classes wrap raw Minecraft objects with additional methods and type safety.

## Core Helper Classes

### [EntityHelper](entity-helper.md)
The base class for all entity helpers. Represents any entity in the world and provides methods to interact with position, movement, appearance, and basic entity properties.

### [ItemStackHelper](item-stack-helper.md)
Represents item stacks in inventories or held by entities. Provides access to item properties, enchantments, NBT data, durability, and more.

### [PlayerEntityHelper](player-entity-helper.md)
Represents player entities. Extends LivingEntityHelper with player-specific methods for abilities, experience, equipment, and status.

### [BlockHelper](block-helper.md)
Represents block types in Minecraft. Provides access to block properties, behaviors, and possible states. Note: this represents the block type, not a specific block instance.

## Specialized Entity Helpers

### Living Entities
- **LivingEntityHelper** - Base class for all living entities
- **AnimalEntityHelper** - Base class for animals and passive mobs
- **MobEntityHelper** - Base class for hostile and neutral mobs

### Player Types
- **ClientPlayerEntityHelper** - The local client player
- **PlayerEntityHelper** - Any player (local or multiplayer)

### Hostile Mobs
- **ZombieEntityHelper** - Zombies and variants
- **SkeletonEntityHelper** - Skeletons and variants
- **CreeperEntityHelper** - Creepers
- **SpiderEntityHelper** - Spiders and cave spiders
- **EndermanEntityHelper** - Endermen
- **PiglinEntityHelper** - Piglins and variants
- **WitchEntityHelper** - Witches
- **BlazeEntityHelper** - Blazes
- **GhastEntityHelper** - Ghasts
- **GuardianEntityHelper** - Guardians and elder guardians
- **ShulkerEntityHelper** - Shulkers
- **SlimeEntityHelper** - Slimes and magma cubes
- **VexEntityHelper** - Vexes
- **WardenEntityHelper** - Wardens
- **IllagerEntityHelper** - Illagers and variants
- **PhantomEntityHelper** - Phantoms

### Passive Mobs
- **CowEntityHelper** - Cows and mooshrooms
- **PigEntityHelper** - Pigs
- **SheepEntityHelper** - Sheep
- **ChickenEntityHelper** - Chickens
- **HorseEntityHelper** - Horses and variants
- **LlamaEntityHelper** - Llamas and variants
- **WolfEntityHelper** - Wolves
- **CatEntityHelper** - Cats
- **RabbitEntityHelper** - Rabbits
- **TurtleEntityHelper** - Turtles
- **BeeEntityHelper** - Bees
- **FoxEntityHelper** - Foxes
- **PandaEntityHelper** - Pandas
- **PolarBearEntityHelper** - Polar bears
- **AxolotlEntityHelper** - Axolotls
- **GoatEntityHelper** - Goats
- **FrogEntityHelper** - Frogs
- **OcelotEntityHelper** - Ocelots
- **ParrotEntityHelper** - Parrots
- **DolphinEntityHelper** - Dolphins
- **SquidEntityHelper** - Squids and glow squids
- **IronGolemEntityHelper** - Iron golems
- **SnowGolemEntityHelper** - Snow golems
- **AllayEntityHelper** - Allays

### Boss Mobs
- **EnderDragonEntityHelper** - Ender dragon
- **WitherEntityHelper** - Wither

### Merchants
- **VillagerEntityHelper** - Villagers
- **MerchantEntityHelper** - Base class for merchants
- **WanderingTraderEntityHelper** - Wandering traders

### Projectiles
- **ArrowEntityHelper** - Arrows and spectral arrows
- **TridentEntityHelper** - Tridents
- **FishingBobberEntityHelper** - Fishing hooks
- **WitherSkullEntityHelper** - Wither skulls
- **FireballEntityHelper** - Fireballs
- **SnowballEntityHelper** - Snowballs
- **EggEntityHelper** - Eggs
- **EnderPearlEntityHelper** - Ender pearls
- **PotionEntityHelper** - Potions

### Vehicles
- **BoatEntityHelper** - Boats
- **MinecartEntityHelper** - Minecarts and variants
- **HorseEntityHelper** - Horses (when ridden)

### Items and Objects
- **ItemEntityHelper** - Dropped item entities
- **ExperienceOrbEntityHelper** - Experience orbs
- **FallingBlockEntityHelper** - Falling blocks
- **TNTEntityHelper** - Primed TNT
- **ArmorStandEntityHelper** - Armor stands
- **ItemFrameEntityHelper** - Item frames
- **PaintingEntityHelper** - Paintings
- **EndCrystalEntityHelper** - End crystals
- **LeashKnotEntityHelper** - Leash knots

### Display Entities
- **DisplayEntityHelper** - Base class for display entities
- **BlockDisplayEntityHelper** - Block display entities
- **ItemDisplayEntityHelper** - Item display entities
- **TextDisplayEntityHelper** - Text display entities

### Interaction
- **InteractionEntityHelper** - Interaction entities

## World and Block Helpers

### World Objects
- **WorldHelper** - World-related utilities and methods
- **BlockPosHelper** - Block positions
- **BlockStateHelper** - Block states and properties
- **BlockDataHelper** - Block data in the world
- **ChunkHelper** - World chunks

### Block Properties
- **FluidStateHelper** - Fluid states
- **BlockPredicateHelper** - Block predicates for filtering

## Inventory and Item Helpers

### Inventory Types
- **InventoryHelper** - Base inventory interface
- **PlayerInventoryHelper** - Player inventory
- **ContainerInventoryHelper** - Generic container inventory
- **CreativeInventoryHelper** - Creative mode inventory

### Container Types
- **AnvilInventoryHelper** - Anvil interface
- **BeaconInventoryHelper** - Beacon interface
- **BrewingStandInventoryHelper** - Brewing stand interface
- **CartographyInventoryHelper** - Cartography table interface
- **CraftingInventoryHelper** - Crafting table interface
- **EnchantInventoryHelper** - Enchantment table interface
- **FurnaceInventoryHelper** - Furnace interface
- **GrindstoneInventoryHelper** - Grindstone interface
- **HopperInventoryHelper** - Hopper interface
- **HorseInventoryHelper** - Horse inventory (when riding)
- **LecternInventoryHelper** - Lectern interface
- **LoomInventoryHelper** - Loom interface
- **MerchantInventoryHelper** - Villager/trader interface
- **ShulkerBoxInventoryHelper** - Shulker box interface
- **SmithingInventoryHelper** - Smithing table interface
- **StonecutterInventoryHelper** - Stonecutter interface

### Item Helpers
- **ItemHelper** - Item types and properties
- **CreativeItemStackHelper** - Creative mode item stack editing
- **EnchantmentHelper** - Enchantment properties
- **ArmorStandEntityHelper** - Armor stand properties

## Player-Specific Helpers

### Player Status
- **PlayerAbilitiesHelper** - Player abilities and permissions
- **PlayerListEntryHelper** - Player list entries
- **TeamHelper** - Player teams

### Stats and Progress
- **StatsHelper** - Player statistics
- **AdvancementHelper** - Advancement progress
- **AdvancementManagerHelper** - Advancement management

### Status Effects
- **StatusEffectHelper** - Status effect instances
- **PotionHelper** - Potion properties

## Utility Helpers

### World Interaction
- **HitResultHelper** - Raycast and hit results
- **DirectionHelper** - Facing directions
- **BoxHelper** - Bounding boxes

### Mathematical Helpers
- **Pos3DHelper** - 3D positions
- **Pos2DHelper** - 2D positions
- **Vec3DHelper** - 3D vectors
- **Vec2DHelper** - 2D vectors

### Game Objects
- **RecipeHelper** - Crafting recipes
- **ServerInfoHelper** - Server information
- **GameModeHelper** - Game modes
- **GameProfileHelper** - Player profiles
- **EquipmentSlotHelper** - Equipment slots

### Text and Display
- **TextHelper** - Text components and formatting
- **StyleHelper** - Text styling
- **FormattingHelper** - Text formatting codes

### Miscellaneous
- **KeyBindingHelper** - Key bindings
- **SoundHelper** - Sound events
- **MusicInstanceHelper** - Music instances
- **BossBarHelper** - Boss bars
- **ScoreboardHelper** - Scoreboard data
- **SignHelper** - Sign text
- **NBTElementHelper** - NBT data structures

## Usage Patterns

### Getting Helpers
```js
// From events
const entity = EntityHelper.create(event.entity);
const player = entity.asPlayer();

// From world
const blockData = World.getBlockAt(x, y, z);
const block = blockData.getBlock();

// From player
const inventory = Player.getInventory();
const itemStack = inventory.getStack(0);
```

### Type Checking and Casting
```js
const entity = EntityHelper.create(event.entity);

// Check entity type
if (entity.getType().includes("zombie")) {
    const zombie = entity.asZombie();
    // Use zombie-specific methods
}

// Check if player
if (entity.getType() === "minecraft:player") {
    const player = entity.asPlayer();
    // Use player methods
}
```

### Helper Chain Methods
```js
// Many helper methods return the same helper for chaining
const entity = event.entity;
entity.setGlowing(true).setCustomName(TextHelper.of("Special Entity"));
```

### Inheritance Hierarchy
```
BaseHelper
├── EntityHelper
│   ├── LivingEntityHelper
│   │   ├── PlayerEntityHelper
│   │   ├── AnimalEntityHelper
│   │   ├── MobEntityHelper
│   │   └── (other living entities)
│   ├── ItemEntityHelper
│   └── (other entities)
├── BlockHelper
├── ItemStackHelper
└── (other helpers)
```

## Best Practices

1. **Always check types** before casting to specific helper classes
2. **Use helper methods** instead of direct Minecraft classes when possible
3. **Chain method calls** for cleaner code
4. **Check for null** with methods that may return optional values
5. **Use appropriate helper types** for better type safety and IDE support