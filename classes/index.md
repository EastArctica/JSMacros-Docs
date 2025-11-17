# JsMacros API Classes Documentation

This section contains comprehensive documentation for all JsMacros API classes, organized by category for easy navigation. These classes provide the building blocks for creating sophisticated scripts and mods.

## Quick Navigation

- [Core System Classes](#core-system-classes) - Essential JsMacros system classes
- [Helper Classes](#helper-classes) - Entity, item, block, and world helpers
- [Utility Classes](#utility-classes) - Math, text, networking, and general utilities
- [UI Classes](#ui-classes) - Interface creation and custom screens

## Core System Classes

[=� View Core Classes Documentation](./core/)

The foundation classes that provide access to JsMacros core functionality, event system, and global APIs.

### Essential Core Classes
- **[Core](./core/core.md)** - Main core API class for accessing global functionality and system management
- **[BaseHelper](./core/base-helper.md)** - Foundation class for all helper classes with raw object access
- **[World](./core/world.md)** - World interaction, block detection, entity searching (300+ methods)
- **[Player](./core/player.md)** - Current player access, state, inventory, movement (400+ methods)
- **[Chat](./core/chat.md)** - Chat communication, message display, formatting, commands

### Event System
- **[BaseEvent](./core/base-event.md)** - Foundation for all event objects
- **[EventContainer](./core/event-container.md)** - Event execution context and management
- **[EventRegistry](./core/event-registry.md)** - Event system registry and management
- **[EventListener](./core/event-listener.md)** - Event listener handling and lifecycle

### Configuration & Profiles
- **[Profile](./core/profile.md)** - JsMacros profile management, configuration, and script execution

## Helper Classes

[=� View Helper Classes Documentation](./helpers/)

Helper classes provide specialized access to Minecraft entities, items, blocks, and game objects. Most helper classes extend from **BaseHelper**.

### Most Used Helpers
- **[ItemStackHelper](./helpers/item-stack-helper.md)** - Item properties, enchantments, NBT data, durability (50+ methods)
- **[EntityHelper](./helpers/entity-helper.md)** - Base entity functionality, positioning, properties (40+ methods)
- **[PlayerEntityHelper](./helpers/player-entity-helper.md)** - Player-specific methods, abilities, experience
- **[BlockHelper](./helpers/block-helper.md)** - Block properties, behaviors, states, characteristics

### Entity Helper Categories
- **Hostile Mobs:** ZombieHelper, SkeletonHelper, CreeperHelper, SpiderHelper, etc.
- **Passive Mobs:** CowHelper, PigHelper, SheepHelper, ChickenHelper, etc.
- **Neutral Mobs:** WolfHelper, IronGolemHelper, etc.
- **Special Entities:** VillagerHelper, HorseHelper, ItemFrameHelper, etc.

### World & Environment Helpers
- **BlockPosHelper** - Block position and coordinate handling
- **BlockDataHelper** - Block state and property access
- **ChunkHelper** - Chunk information and management
- **DirectionHelper** - Direction and rotation utilities

## Utility Classes

[=� View Utility Classes Documentation](./utilities/)

General utility classes for common scripting tasks including math, text processing, networking, and system utilities.

### Math & Position
- **[Vec3D](./utilities/Vec3D.md)** - 3D vector operations, pitch/yaw calculations
- **[Pos3D](./utilities/Pos3D.md)** - 3D position handling with world integration
- **[Vec2D](./utilities/Vec2D.md)** - 2D vector operations for movement
- **[Pos2D](./utilities/Pos2D.md)** - 2D position with arithmetic operations
- **[Box](./utilities/Box.md)** - 3D bounding boxes for area calculations

### Text & Formatting
- **[TextHelper](./utilities/TextHelper.md)** - Minecraft text component processing
- **[FormattingHelper](./utilities/FormattingHelper.md)** - Chat formatting and color codes

### Networking & Data
- **[HTTPRequest](./utilities/HTTPRequest.md)** - HTTP requests and web API integration
- **[Websocket](./utilities/Websocket.md)** - WebSocket connections for real-time data

### File & System
- **[FileHandler](./utilities/FileHandler.md)** - File operations, reading, writing
- **[Utils](./utilities/Utils.md)** - General utilities (clipboard, hashing, files)

### Scanning & Detection
- **[WorldScanner](./utilities/WorldScanner.md)** - High-performance world scanning for resources
- **[TraceLine](./utilities/TraceLine.md)** - Line-of-sight and ray tracing

## UI Classes

[=� View UI Classes Documentation](./ui/)

User interface classes for creating custom screens, HUDs, overlays, and interactive elements.

### Core UI Framework
- **[ScriptScreen](./ui/ScriptScreen.md)** - Foundation for custom interactive screens
- **[Draw2D](./ui/Draw2D.md)** - Core class for 2D overlays, HUDs, and graphics
- **[ClickableWidgetHelper](./ui/ClickableWidgetHelper.md)** - Base class for interactive UI elements

### Input Widgets
- **[ButtonWidgetHelper](./ui/ButtonWidgetHelper.md)** - Interactive buttons with styling
- **[TextFieldWidgetHelper](./ui/TextFieldWidgetHelper.md)** - Text input fields with validation
- **[SliderWidgetHelper](./ui/SliderWidgetHelper.md)** - Slider controls for value selection
- **[CheckBoxWidgetHelper](./ui/CheckBoxWidgetHelper.md)** - Checkbox widgets for boolean settings
- **[CyclingButtonWidgetHelper](./ui/CyclingButtonWidgetHelper.md)** - Cycling selection buttons

### Drawing & Graphics
- **[Draw2DElement](./ui/Draw2DElement.md)** - Wrapper for nested Draw2D overlays

## Getting Started

### Learning Path

1. **Start with Core Classes** - Begin with [Core](./core/core.md), [World](./core/world.md), [Player](./core/player.md)
2. **Learn Helper Classes** - Move to [ItemStackHelper](./helpers/item-stack-helper.md), [EntityHelper](./helpers/entity-helper.md)
3. **Add Utilities** - Use [Vec3D](./utilities/Vec3D.md), [TextHelper](./utilities/TextHelper.md), [Utils](./utilities/Utils.md)
4. **Create Interfaces** - Build UI with [ScriptScreen](./ui/ScriptScreen.md), [Draw2D](./ui/Draw2D.md)

### Basic Script Structure

```javascript
// Access core systems
const world = World;
const player = Player;
const chat = Chat;

// Work with entities and items
const nearbyEntities = world.getEntities(player, 10);
const currentItem = player.getMainHandStack();

// Use utilities for calculations
const position = player.getPos();
const direction = player.getLookVec();

// Create UI if needed
const screen = Hud.createScreen("My Script", true);
```

### Common Patterns

#### Entity Detection
```javascript
const entities = world.getEntities(player, 5);
for (const entity of entities) {
    if (entity.getEntityType() === "minecraft:zombie") {
        Chat.log(`Found zombie at ${entity.getX()}, ${entity.getY()}, ${entity.getZ()}`);
    }
}
```

#### Item Management
```javascript
const item = player.getMainHandStack();
if (item && !item.isEmpty()) {
    Chat.log(`Holding: ${item.getName()}`);
    Chat.log(`Count: ${item.getCount()}`);
}
```

#### World Interaction
```javascript
const blockPos = player.getBlockPos().add(0, -1, 0);
const block = world.getBlock(blockPos);
Chat.log(`Standing on: ${block.getId()}`);
```

## Integration with Events

API classes work seamlessly with JsMacros events:

```javascript
JsMacros.on('Tick', JavaWrapper.methodToJavaAsync(() => {
    // Use API classes in event handlers
    const health = player.getHealth();
    const hunger = player.getHunger();

    // Update HUD with current status
    Hud.updateText("status", `Health: ${health} Hunger: ${hunger}`);
}));
```

## Advanced Topics

### Performance Optimization
- Use WorldScanner for large-scale block detection
- Cache frequently accessed values
- Use event filters to reduce unnecessary processing

### Error Handling
- Check for null values when working with optional properties
- Use try-catch blocks for network operations
- Validate input parameters

### Integration Patterns
- Combine multiple helper classes for complex operations
- Use utility classes for data processing and validation
- Create modular UI components for reuse

This documentation provides a complete reference for all available JsMacros classes, enabling you to create sophisticated scripts and modifications for Minecraft.