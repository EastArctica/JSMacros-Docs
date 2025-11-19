# Tick Event

This event is fired every game tick. Backed by class `EventTick`.

## Signature
```js
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Behavior

* Fires 20 times per second (once per Minecraft tick)
- No specific fields or data
- Very high frequency event
- Not cancellable
- Useful for continuous monitoring and automation

## Example

```js
// Simple tick counter
let tickCount = 0;

JsMacros.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
  tickCount++;

  // Only process every 20 ticks (once per second) to avoid spam
  if (tickCount % 20 === 0) {
    const player = Player.getPlayer();
    if (player) {
      const pos = player.getPos();
      const health = player.getHealth();
      const food = player.getHunger();

      Chat.actionbar(`&7Pos: [${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}] | Health: ${health.toFixed(1)} | Food: ${food}`);
    }
  }

  // Process every 100 ticks (every 5 seconds)
  if (tickCount % 100 === 0) {
    const worldTime = World.getTime();
    const dayTime = worldTime % 24000;
    const hours = Math.floor(dayTime / 1000);
    const minutes = Math.floor((dayTime % 1000) * 60 / 1000);

    Chat.log(`&7In-game time: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  }

  // Check for dangerous conditions every 10 ticks
  if (tickCount % 10 === 0) {
    checkDangerousConditions();
  }
}));

function checkDangerousConditions() {
  const player = Player.getPlayer();
  if (!player) return;

  const health = player.getHealth();
  const food = player.getHunger();
  const pos = player.getPos();

  // Health warnings
  if (health <= 5) {
    Chat.actionbar("&cLow health warning!");
  }

  // Hunger warnings
  if (food <= 6) {
    Chat.actionbar("&eLow hunger warning!");
  }

  // Check for fall danger
  const blockBelow = World.getBlock(Math.floor(pos.x), Math.floor(pos.y - 2), Math.floor(pos.z));
  if (!blockBelow || blockBelow.getBlockState().getBlock().getTranslationKey().includes("air")) {
    const fallHeight = calculateFallHeight(pos);
    if (fallHeight > 3) {
      Chat.actionbar(`&6Fall danger: ${fallHeight.toFixed(0)} blocks`);
    }
  }
}

function calculateFallHeight(pos) {
  let y = Math.floor(pos.y - 1);
  while (y > 0) {
    const block = World.getBlock(Math.floor(pos.x), y, Math.floor(pos.z));
    if (block && !block.getBlockState().getBlock().getTranslationKey().includes("air")) {
      return pos.y - y - 1;
    }
    y--;
  }
  return pos.y;
}
```

## Methods
- [event.toString()](#eventtostring)

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`