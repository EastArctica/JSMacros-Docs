# JsMacros API Class Organization

This document organizes the classes marked for documentation into general sections based on their functionality from the source code analysis.

## Events and Event Handling

Classes related to handling events, filters, and event registries.

- BaseEvent
- BaseEventRegistry
- Event
- EventContainer
- EventFilterer
- EventFilterer.Compound
- FJsMacros.EventAndContext

## Event Filterers

Specialized filterers for specific event types.

- FiltererBlockUpdate
- FiltererComposed
- FiltererInverted
- FiltererModulus
- FiltererRecvPacket
- FiltererSendPacket

## Libraries and API Classes

Main library classes and API interfaces.

- BaseLibrary
- JsMacros
- ModLoader
- PerExecLanguageLibrary
- PerExecLibrary
- PerLanguageLibrary
- Websocket
- Websocket.Disconnected
- WrappedScript
- FReflection.CombinedVariableClassLoader

## World Interaction

Classes for interacting with the Minecraft world, blocks, and global state.

- AdvancementHelper
- AdvancementManagerHelper
- AdvancementProgressHelper
- BlockDataHelper
- BlockHelper
- BlockPosHelper
- BlockPredicateHelper
- BlockStateHelper
- BossBarHelper
- ChunkHelper
- DirectionHelper
- FluidStateHelper
- HitResultHelper
- HitResultHelper.Block
- HitResultHelper.Entity
- PlayerListEntryHelper
- ScoreboardObjectiveHelper
- ScoreboardsHelper
- StateHelper
- StatePredicateHelper
- TeamHelper
- UniversalBlockStateHelper
- WorldScanner
- WorldScannerBuilder

## Entity Helpers

Classes for interacting with entities in the world.

General Entities:
- EntityHelper
- LivingEntityHelper
- MerchantEntityHelper
- ItemEntityHelper

Player and Boss Entities:
- ClientPlayerEntityHelper
- EnderDragonEntityHelper
- InteractionManagerHelper
- PlayerAbilitiesHelper
- PlayerEntityHelper
- PlayerInput
- WitherEntityHelper

Mobs and Hostile Monsters:
- AbstractHorseEntityHelper
- AbstractPiglinEntityHelper
- AreaEffectCloudEntityHelper
- BlazeEntityHelper
- CreeperEntityHelper
- DrownedEntityHelper
- EndermanEntityHelper
- GhastEntityHelper
- GuardianEntityHelper
- IllagerEntityHelper
- MobEntityHelper
- PhantomEntityHelper
- PiglinEntityHelper
- PillagerEntityHelper
- ShulkerEntityHelper
- SlimeEntityHelper
- SpellcastingIllagerEntityHelper
- SpiderEntityHelper
- VexEntityHelper
- VillagerEntityHelper
- VindicatorEntityHelper
- WardenEntityHelper
- WitchEntityHelper
- ZombieEntityHelper
- ZombieVillagerEntityHelper

Animals and Passive Mobs:
- AllayEntityHelper
- AnimalEntityHelper
- AxolotlEntityHelper
- BatEntityHelper
- BeeEntityHelper
- CatEntityHelper
- DolphinEntityHelper
- DonkeyEntityHelper
- FishEntityHelper
- FoxEntityHelper
- FrogEntityHelper
- GoatEntityHelper
- HorseEntityHelper
- IronGolemEntityHelper
- LlamaEntityHelper
- MooshroomEntityHelper
- OcelotEntityHelper
- PandaEntityHelper
- ParrotEntityHelper
- PigEntityHelper
- PolarBearEntityHelper
- PufferfishEntityHelper
- RabbitEntityHelper
- SheepEntityHelper
- SnowGolemEntityHelper
- StriderEntityHelper
- TameableEntityHelper
- TropicalFishEntityHelper
- WolfEntityHelper

Display Entities:
- BlockDisplayEntityHelper
- DisplayEntityHelper
- ItemDisplayEntityHelper
- TextDisplayEntityHelper
- TextDisplayEntityHelper.TextDisplayDataHelper

Decoration and Utility Entities:
- ArmorStandEntityHelper
- EndCrystalEntityHelper
- FallingBlockEntityHelper
- InteractionEntityHelper
- ItemFrameEntityHelper
- PaintingEntityHelper
- TntEntityHelper

Projectiles:
- ArrowEntityHelper
- FishingBobberEntityHelper
- TridentEntityHelper
- WitherSkullEntityHelper

Vehicles:
- BoatEntityHelper
- FurnaceMinecartEntityHelper
- TntMinecartEntityHelper

## Items and Enchantments

Classes for handling items, recipes, and enchantments.

- CreativeItemStackHelper
- EnchantmentHelper
- FoodComponentHelper
- ItemHelper
- ItemStackHelper
- RecipeHelper

## Rendering and Graphics

Classes for 2D and 3D rendering, elements, and graphics.

2D Rendering:
- Draw2D
- Draw2DElement
- Draw2DElement.Builder
- IDraw2D
- Image
- Image.Builder
- Line
- Line.Builder
- Rect
- Rect.Builder
- Text
- Text.Builder

3D Rendering:
- Box
- Box.Builder
- Draw3D
- EntityTraceLine
- EntityTraceLine.Builder
- Line3D
- Line3D.Builder
- RenderElement
- RenderElement3D
- Surface
- Surface.Builder
- TraceLine
- TraceLine.Builder

Rendering Elements:
- CustomImage
- Item
- Item.Builder
- RenderElementBuilder

## Screen and UI Elements

Classes for screen management, widgets, and UI components.

Screens and Overlays:
- IScreen
- ScriptScreen
- SelectorDropdownOverlay

Widgets and Builders:
- ButtonWidgetHelper
- ButtonWidgetHelper.ButtonBuilder
- ButtonWidgetHelper.TexturedButtonBuilder
- CheckBoxWidgetHelper
- CheckBoxWidgetHelper.CheckBoxBuilder
- ClickableWidgetHelper
- CyclingButtonWidgetHelper
- CyclingButtonWidgetHelper.CyclicButtonBuilder
- LockButtonWidgetHelper
- LockButtonWidgetHelper.LockButtonBuilder
- Slider
- SliderWidgetHelper
- SliderWidgetHelper.SliderBuilder
- TextFieldWidgetHelper
- TextFieldWidgetHelper.TextFieldBuilder

Other UI Elements:
- ChatHistoryManager
- ChatHudLineHelper
- CheckBoxContainer
- ListContainer
- MultiElementContainer
- Scrollbar
- SelectCursor
- FileChooser
- FileChooser.fileObj
- FileChooser.sortFile

## Inventory Management

Classes for managing different inventory types.

- AnvilInventory
- BeaconInventory
- BrewingStandInventory
- CartographyInventory
- ContainerInventory
- CraftingInventory
- CreativeInventory
- EnchantInventory
- FurnaceInventory
- GrindStoneInventory
- HorseInventory
- Inventory
- LoomInventory
- PlayerInventory
- RecipeInventory
- SmithingInventory
- StoneCutterInventory
- VillagerInventory

## Filters and Predicates

Classes for filtering and predicating data, used in world scanning, etc.

Basic Filters:
- AndFilter
- BasicFilter
- BlockFilter
- BlockStateFilter
- BooleanCompareFilter
- CharCompareFilter
- ClassWrapperFilter
- GroupFilter
- IAdvancedFilter
- NotFilter
- NumberCompareFilter
- OrFilter
- StringCompareFilter
- StringCompareFilter.FilterMethod
- StringifyFilter
- XorFilter

World Scanning Filters:
- GroupFilter.AllMatchFilter
- GroupFilter.AnyMatchFilter
- GroupFilter.CountMatchFilter
- GroupFilter.NoneMatchFilter

## Commands

Classes for command management and building.

- CommandBuilder
- CommandManager
- CommandNodeAccessor
- CommandNodeHelper

## Advanced Classes

Classes for advanced scripting and reflection.

- ClassBuilder
- ClassBuilder.AnnotationBuilder
- ClassBuilder.AnnotationBuilder.AnnotationArrayBuilder
- ClassBuilder.BodyBuilder
- ClassBuilder.ConstructorBuilder
- ClassBuilder.FieldBuilder
- ClassBuilder.FieldBuilder.FieldInitializerBuilder
- ClassBuilder.MethodBuilder
- MethodWrapper
- Mappings
- Mappings.ClassData
- Mappings.MappedClass
- Mappings.MethodData
- ProxyBuilder
- ProxyBuilder.ProxyReference
- Registrable
- WrappedClassInstance
- WrappedClassInstance.MethodSigParts

## Configuration and Profiles

Classes for handling configurations, options, and profiles.

- BaseProfile
- ConfigFolder
- ConfigManager
- OptionsHelper
- OptionsHelper.AccessibilityOptionsHelper
- OptionsHelper.ChatOptionsHelper
- OptionsHelper.ControlOptionsHelper
- OptionsHelper.MusicOptionsHelper
- OptionsHelper.SkinOptionsHelper
- OptionsHelper.VideoOptionsHelper
- Profile

## Services

Classes for service management.

- ServiceManager
- ServiceManager.ServiceStatus

## Utilities and Helpers

General utility classes and base helpers.

- BaseHelper
- BaseScriptContext
- BaseScriptContext.ScriptAssertionError
- BaseScriptContext.SleepRunnable
- CustomClickEvent
- DyeColorHelper
- FileHandler
- FormattingHelper
- ModContainerHelper
- NameUtil
- NBTElementHelper
- NBTElementHelper.NBTCompoundHelper
- NBTElementHelper.NBTListHelper
- NBTElementHelper.NBTNumberHelper
- NbtPredicateHelper
- PacketByteBufferHelper
- Pair
- RegistryHelper
- ServerInfoHelper
- StatsHelper
- StatusEffectHelper
- StyleHelper
- SuggestionsBuilderHelper
- TextBuilder
- TextHelper
- TradeOfferHelper
- TranslationUtil

## Math and Vectors

Classes for mathematical operations and vector/position handling.

- Pos2D
- Pos3D
- Vec2D
- Vec3D

## Web Requests

Classes for web request operations.

- HTTPRequest
- HTTPRequest.Response
