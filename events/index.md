# Events

This section contains documentation for all available events in JsMacros. Events allow you to respond to various game actions and state changes.

## Event Categories

### Player Events
Events related to player actions, status, and interactions.

- [Air Change](air-change.md) - Fired when the player's air level changes
- [Armor Change](armor-change.md) - Fired when the player equips, unequips, or swaps armor
- [Attack Block](attack-block.md) - Fired when the player attacks (left-clicks) a block
- [Attack Entity](attack-entity.md) - Fired when the player attacks an entity
- [Damage](damage.md) - Fired when the player takes damage
- [Death](death.md) - Fired when the player dies
- [EXP Change](exp-change.md) - Fired when the player's experience points or level changes
- [Fall Flying](fall-flying.md) - Fired when the player starts or stops flying with elytra
- [Heal](heal.md) - Fired when the player's health increases
- [Health Change](health-change.md) - Fired when the player's health changes
- [Held Item Change](held-item-change.md) - Fired when the player changes their held item
- [Hunger Change](hunger-change.md) - Fired when the player's hunger level changes
- [Interact Block](interact-block.md) - Fired when the player interacts with a block
- [Interact Entity](interact-entity.md) - Fired when the player interacts with an entity
- [Riding](riding.md) - Fired when the player starts or stops riding an entity
- [Sign Edit](sign-edit.md) - Fired when the player edits a sign

### World Events
Events related to world changes and server interactions.

- [Block Update](block-update.md) - Fired when a block is updated in the world
- [Bossbar](bossbar.md) - Fired when a bossbar is added, removed, or updated
- [Chunk Load](chunk-load.md) - Fired when a chunk is loaded
- [Chunk Unload](chunk-unload.md) - Fired when a chunk is unloaded
- [Dimension Change](dimension-change.md) - Fired when the player changes dimensions
- [Disconnect](disconnect.md) - Fired when the player disconnects from a server
- [Entity Damaged](entity-damaged.md) - Fired when any entity takes damage
- [Entity Healed](entity-healed.md) - Fired when any entity is healed
- [Entity Load](entity-load.md) - Fired when an entity is loaded
- [Entity Unload](entity-unload.md) - Fired when an entity is unloaded
- [Join Server](join-server.md) - Fired when the player joins a server
- [Name Change](name-change.md) - Fired when a player's name changes
- [Player Join](player-join.md) - Fired when a player joins the server
- [Player Leave](player-leave.md) - Fired when a player leaves the server
- [Sound](sound.md) - Fired when a sound is played
- [Tick](tick.md) - Fired every game tick

### Inventory Events
Events related to inventory management and item interactions.

- [Click Slot](click-slot.md) - Fired when the player clicks an inventory slot
- [Container Update](container-update.md) - Fired when a container is updated
- [Drop Slot](drop-slot.md) - Fired when an item is dropped from a slot
- [Item Damage](item-damage.md) - Fired when an item takes damage
- [Item Pickup](item-pickup.md) - Fired when the player picks up an item
- [Open Container](open-container.md) - Fired when the player opens a container
- [Open Screen](open-screen.md) - Fired when any screen is opened
- [Slot Update](slot-update.md) - Fired when an inventory slot is updated

### Status Effects
- [Status Effect Update](status-effect-update.md) - Fired when a status effect is applied or removed

### Network Events
Events related to network communication and packets.

- [Recv Message](recv-message.md) - Fired when a message is received
- [Recv Packet](recv-packet.md) - Fired when a packet is received
- [Send Message](send-message.md) - Fired when a message is sent
- [Send Packet](send-packet.md) - Fired when a packet is sent

### System Events
Events related to the game system and JsMacros itself.

- [Custom](custom.md) - Fired for custom script-defined events
- [Key](key.md) - Fired when a key is pressed or released
- [Launch Game](launch-game.md) - Fired when the game launches
- [Mouse Scroll](mouse-scroll.md) - Fired when the mouse wheel is scrolled
- [Profile Load](profile-load.md) - Fired when a profile is loaded
- [Quit Game](quit-game.md) - Fired when the game quits
- [Resource Pack Loaded](resource-pack-loaded.md) - Fired when a resource pack is loaded
- [Title](title.md) - Fired when a title is displayed
- [Wrapped Script](wrapped-script.md) - Fired for wrapped script events

## Event Usage

### Basic Event Registration

All events use the JavaWrapper syntax:

```javascript
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((event) => {
    // Handle the event
    JsMacros.assertEvent(event, 'EventName');

    // Your event handling code here
}));
```

### Event Filtering

You can filter events by adding conditions in your event handler:

```javascript
JsMacros.on("AttackEntity", JavaWrapper.methodToJavaAsync((event) => {
    JsMacros.assertEvent(event, 'AttackEntity');

    // Only handle hostile mobs
    if (event.entity.getEntityType() === "minecraft:zombie") {
        Chat.log(`Attacked a zombie at ${event.entity.getX()}, ${event.entity.getY()}, ${event.entity.getZ()}`);
    }
}));
```

### Event Cancellation

Some events can be cancelled to prevent their default action:

```javascript
JsMacros.on("SendMessage", JavaWrapper.methodToJavaAsync((event) => {
    JsMacros.assertEvent(event, 'SendMessage');

    // Prevent sending messages with bad words
    if (event.msg.includes("badword")) {
        event.cancel();
        Chat.log("Message blocked due to inappropriate content");
    }
}));
```

## Event Properties

All events inherit common properties and methods:

- `event.eventName` - The name of the event
- `event.cancel()` - Cancel the event (if supported)
- `event.toString()` - Get a string representation of the event

Check individual event documentation for specific properties and methods available for each event type.