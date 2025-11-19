# Riding Event

This event is fired when the player starts or stops riding an entity. Backed by class `EventRiding`.

## Signature
```js
JsMacros.on("Riding", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field  | Type          | Description                              |
| ------ | ------------- | ---------------------------------------- |
| state  | boolean       | True if starting to ride, false if stopping |
| entity | EntityHelper  | The entity being ridden (can be null)     |

## Behavior

* Fires when the player starts or stops riding any entity
- The `state` field indicates if riding is starting (true) or stopping (false)
- The `entity` field contains the entity being ridden
- Not cancellable
- Useful for travel tracking and vehicle management

## Minimal example

```js
JsMacros.on("Riding", JavaWrapper.methodToJavaAsync((e) => {
  const action = e.state ? "started riding" : "stopped riding";
  const entityName = e.entity ? e.entity.getName() : "unknown";
  Chat.log(`${action} ${entityName}`);
});
```

## Async example

```js
JsMacros.on("Riding", JavaWrapper.methodToJavaAsync((e) => {
  const isStarting = e.state;
  const entity = e.entity;
  const action = isStarting ? "started" : "stopped";

  Chat.log(`&6Riding Status: ${action}`);

  if (isStarting && entity) {
    const entityName = entity.getName();
    const entityType = entity.getType();
    const entityPos = entity.getPos();

    Chat.log(`&aStarted riding: &f${entityName}`);
    Chat.log(`&7Type: &f${entityType}`);
    Chat.log(`&7Position: &f[${Math.floor(entityPos.x)}, ${Math.floor(entityPos.y)}, ${Math.floor(entityPos.z)}]`);

    // Handle different vehicle types
    if (entityType.includes("horse")) {
      Chat.actionbar(`&eRiding a horse!`);
      handleHorseRiding(entity);
    } else if (entityType.includes("boat")) {
      Chat.actionbar(`&bSailing in a boat!`);
      handleBoatRiding(entity);
    } else if (entityType.includes("minecart")) {
      Chat.actionBar(`&dRiding in a minecart!`);
      handleMinecartRiding(entity);
    } else if (entityType.includes("pig")) {
      Chat.actionbar(`&6Riding a pig!`);
      handlePigRiding(entity);
    } else if (entityType.includes("strider")) {
      Chat.actionbar(`&cRiding a strider in lava!`);
      handleStriderRiding(entity);
    } else if (entityType.includes("camel")) {
      Chat.actionbar(`&eRiding a camel!`);
      handleCamelRiding(entity);
    } else {
      Chat.actionbar(`&eRiding: ${entityName}`);
    }

    // Start tracking ride time
    global.rideStartTime = Date.now();
    global.currentRideEntity = entityName;

  } else if (!isStarting) {
    // Stopped riding
    Chat.log(`&cStopped riding`);

    // Calculate ride duration
    if (global.rideStartTime) {
      const rideDuration = Date.now() - global.rideStartTime;
      const rideMinutes = Math.floor(rideDuration / 60000);
      const rideSeconds = Math.floor((rideDuration % 60000) / 1000);

      Chat.log(`&7Ride duration: &f${rideMinutes}m ${rideSeconds}s`);
      delete global.rideStartTime;
    }

    if (global.currentRideEntity) {
      Chat.log(`&7Vehicle: &f${global.currentRideEntity}`);
      delete global.currentRideEntity;
    }

    Chat.actionbar("&7Stopped riding");
  }
}));

function handleHorseRiding(horse) {
  Chat.log(`&dHorse stats:`);

  // Check horse attributes
  const health = horse.getHealth();
  const maxHealth = horse.getMaxHealth();
  const speed = horse.getSpeed();
  const jumpHeight = horse.getJumpHeight();

  Chat.log(`&7Health: &f${health}/${maxHealth}`);
  Chat.log(`&7Speed: &f${speed.toFixed(2)}`);
  Chat.log(`&7Jump height: &f${jumpHeight.toFixed(2)}`);

  // Check for horse armor
  const armor = horse.getHorseArmor();
  if (armor) {
    Chat.log(`&7Armor: &f${armor.getName().getString()}`);
  }

  // Check for saddle
  const saddle = horse.getSaddle();
  if (saddle) {
    Chat.log(`&7Saddle: &f${saddle.getName().getString()}`);
  }

  // Health warnings
  const healthPercent = (health / maxHealth) * 100;
  if (healthPercent <= 25) {
    Chat.log(`&cWarning: Horse health is low! (${healthPercent.toFixed(0)}%)`);
  }
}

function handleBoatRiding(boat) {
  Chat.log(`&bBoat information:`);

  const pos = boat.getPos();
  const velocity = boat.getVelocity();

  Chat.log(`&7Position: &f[${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}]`);
  Chat.log(`&7Speed: &f${velocity.length().toFixed(2)}`);

  // Check if in water
  const blockBelow = World.getBlock(Math.floor(pos.x), Math.floor(pos.y - 1), Math.floor(pos.z));
  if (blockBelow && blockBelow.getBlockState().getBlock().getTranslationKey().includes("water")) {
    Chat.log(`&aSailing on water!`);
  }
}

function handleMinecartRiding(minecart) {
  Chat.log(`&dMinecart information:`);

  const velocity = minecart.getVelocity();
  const speed = velocity.length();

  Chat.log(`&7Speed: &f${speed.toFixed(2)} blocks/tick`);

  if (speed > 0.5) {
    Chat.log(`&eMoving at high speed!`);
  }

  // Check minecart type
  const minecartType = minecart.getType();
  if (minecartType.includes("chest")) {
    Chat.log(`&6Chest minecart - can store items`);
  } else if (minecartType.includes("furnace")) {
    Chat.log(`&eFurnace minecart - powered`);
  } else if (minecartType.includes("hopper")) {
    Chat.log(`&7Hopper minecart - automatic item collection`);
  }
}

function handlePigRiding(pig) {
  Chat.log(`&6Pig riding info:`);

  // Check for saddle
  const saddle = pig.getSaddle();
  if (saddle) {
    Chat.log(`&aPig has a saddle - can be controlled with carrot on a stick`);
  } else {
    Chat.log(`&cPig needs a saddle to be controlled`);
  }
}

function handleStriderRiding(strider) {
  Chat.log(`&cStrider riding:`);
  Chat.log(`&7Special ability: Can walk on lava!`);

  // Check if in lava
  const pos = strider.getPos();
  const blockAt = World.getBlock(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
  if (blockAt && blockAt.getBlockState().getBlock().getTranslationKey().includes("lava")) {
    Chat.log(`&cCurrently walking on lava! 🔥`);
  }

  // Check for war fungus (controls strider)
  const player = Player.getPlayer();
  const mainHand = player.getInventory().getMainHandStack();
  if (mainHand && mainHand.getName().getString().includes("warped")) {
    Chat.log(`&aStrider can be controlled with warped fungus on a stick`);
  }
}

function handleCamelRiding(camel) {
  Chat.log(`&eCamel riding:`);
  Chat.log(`&7Special ability: Can dash!`);
  Chat.log(`&7Can carry two players`);

  // Check if dashing
  const velocity = camel.getVelocity();
  const speed = velocity.length();

  if (speed > 1.5) {
    Chat.log(`&aCamel is dashing!`);
  }
}
```

## Fields
- [event.state](#eventstate)
- [event.entity](#evententity)

## Methods
- [event.toString()](#eventtostring)

### event.state
Whether the player is starting to ride or stopping.

**Type:** `boolean`

**Notes**
- `true` - Player is starting to ride an entity
- `false` - Player is stopping riding an entity

### event.entity
A helper object for the entity being ridden.

**Type:** `EntityHelper` | `null`

**Notes**
This provides access to the entity's properties like name, type, position, health, etc. Can be `null` when stopping riding or in some edge cases.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`