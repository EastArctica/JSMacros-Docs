# Sound Event

This event is fired when a sound is played in the game world. Backed by class `EventSound`.

## Signature
```js
JsMacros.on("Sound", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field   | Type    | Description                              |
| ------- | ------- | ---------------------------------------- |
| sound   | string  | The ID of the sound being played         |
| volume  | float   | The volume of the sound (0.0 to 1.0)     |
| pitch   | float   | The pitch of the sound                   |
| position| Pos3D  | The position where the sound originated  |

## Behavior

* Fires when any game sound is played
- The `sound` field contains the sound event ID
- The `volume` and `pitch` fields control sound properties
- The `position` field indicates where the sound originated
- This event is cancellable - preventing the sound from playing

## Minimal example

```js
JsMacros.on("Sound", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Sound: ${e.sound} at [${e.position.x}, ${e.position.y}, ${e.position.z}]`);
}));
```

## Async example

```js
JsMacros.on("Sound", JavaWrapper.methodToJavaAsync((e) => {
  const soundId = e.sound;
  const volume = e.volume;
  const pitch = e.pitch;
  const pos = e.position;

  const soundName = getSoundName(soundId);
  const distance = Player.getPlayer().getPos().distanceTo(pos);

  Chat.log(`&dSound Event: &f${soundName}`);
  Chat.log(`&7Volume: &f${volume.toFixed(2)} &7- Pitch: &f${pitch.toFixed(2)} &7- Distance: &f${distance.toFixed(1)}m`);

  // Handle specific sound categories
  if (isMobSound(soundId)) {
    handleMobSound(soundId, pos, distance);
  } else if (isBlockSound(soundId)) {
    handleBlockSound(soundId, pos, distance);
  } else if (isPlayerSound(soundId)) {
    handlePlayerSound(soundId, pos, distance);
  } else if (isItemSound(soundId)) {
    handleItemSound(soundId, pos, distance);
  } else if (isAmbientSound(soundId)) {
    handleAmbientSound(soundId, pos, distance);
  } else if (isImportantSound(soundId)) {
    handleImportantSound(soundId, pos, distance);
  }

  // Sound volume analysis
  if (volume > 0.8) {
    Chat.log(`&6Loud sound detected: ${soundName}`);
  } else if (volume < 0.2) {
    Chat.log(`&8Faint sound: ${soundName}`);
  }

  // Pitch analysis
  if (pitch > 1.5) {
    Chat.log(`&eHigh-pitched sound: ${soundName}`);
  } else if (pitch < 0.5) {
    Chat.log(`&7Low-pitched sound: ${soundName}`);
  }

  // Distance-based alerts
  if (distance < 5) {
    Chat.log(`&cVery close sound: ${soundName} (${distance.toFixed(1)}m)`);
  } else if (distance > 50) {
    Chat.log(`&8Distant sound: ${soundName} (${distance.toFixed(1)}m)`);
  }

  // Log sound location for mapping
  logSoundLocation(soundId, pos);
}));

function getSoundName(soundId) {
  // Convert sound IDs to readable names
  const soundNames = {
    // Mobs
    'entity.villager.ambient': 'Villager ambient',
    'entity.villager.hurt': 'Villager hurt',
    'entity.villager.death': 'Villager death',
    'entity.villager.work_mason': 'Villager working (mason)',
    'entity.villager.work_farmer': 'Villager working (farmer)',
    'entity.villager.yes': 'Villager yes',
    'entity.villager.no': 'Villager no',
    'entity.creeper.primed': 'Creeper primed',
    'entity.creeper.hurt': 'Creeper hurt',
    'entity.creeper.death': 'Creeper death',
    'entity.zombie.ambient': 'Zombie ambient',
    'entity.zombie.hurt': 'Zombie hurt',
    'entity.zombie.death': 'Zombie death',
    'entity.skeleton.ambient': 'Skeleton ambient',
    'entity.skeleton.hurt': 'Skeleton hurt',
    'entity.skeleton.death': 'Skeleton death',
    'entity.spider.ambient': 'Spider ambient',
    'entity.spider.hurt': 'Spider hurt',
    'entity.spider.death': 'Spider death',
    'entity.enderman.ambient': 'Enderman ambient',
    'entity.enderman.hurt': 'Enderman hurt',
    'entity.enderman.death': 'Enderman death',
    'entity.enderman.scream': 'Enderman scream',
    'entity.enderman.teleport': 'Enderman teleport',
    'entity.wither.ambient': 'Wither ambient',
    'entity.wither.hurt': 'Wither hurt',
    'entity.wither.death': 'Wither death',
    'entity.wither.shoot': 'Wither shoot',
    'entity.dragon.ambient': 'Ender Dragon ambient',
    'entity.dragon.hurt': 'Ender Dragon hurt',
    'entity.dragon.death': 'Ender Dragon death',
    'entity.dragon.growl': 'Ender Dragon growl',
    'entity.wolf.ambient': 'Wolf ambient',
    'entity.wolf.hurt': 'Wolf hurt',
    'entity.wolf.death': 'Wolf death',
    'entity.wolf.growl': 'Wolf growl',
    'entity.wolf.whine': 'Wolf whine',
    'entity.wolf.howl': 'Wolf howl',
    'entity.cat.ambient': 'Cat ambient',
    'entity.cat.hurt': 'Cat hurt',
    'entity.cat.death': 'Cat death',
    'entity.cat.purreow': 'Cat purr',

    // Players
    'entity.player.hurt': 'Player hurt',
    'entity.player.death': 'Player death',
    'entity.player.attack.knockback': 'Player knockback',
    'entity.player.attack.critical': 'Player critical hit',
    'entity.player.attack.sweep': 'Player sweep attack',
    'entity.player.attack.strong': 'Player strong attack',
    'entity.player.attack.nodamage': 'Player nodamage attack',
    'entity.player.attack.weak': 'Player weak attack',
    'entity.player.levelup': 'Player levelup',
    'entity.player.burp': 'Player burp',
    'entity.player.swim': 'Player swim',
    'entity.player.splash': 'Player splash',
    'entity.player.splash.high_speed': 'Player high speed splash',
    'entity.player.big_fall': 'Player big fall',
    'entity.player.small_fall': 'Player small fall',
    'entity.player.hurt_drown': 'Player drowning',
    'entity.player.hurt_freeze': 'Player freezing',
    'entity.player.hurt_on_fire': 'Player on fire',
    'entity.player.hurt_sweet_berry_bush': 'Player hurt by berry bush',

    // Blocks
    'block.stone.break': 'Stone break',
    'block.stone.step': 'Stone step',
    'block.stone.place': 'Stone place',
    'block.stone.hit': 'Stone hit',
    'block.stone.fall': 'Stone fall',
    'block.wood.break': 'Wood break',
    'block.wood.step': 'Wood step',
    'block.wood.place': 'Wood place',
    'block.wood.hit': 'Wood hit',
    'block.wood.fall': 'Wood fall',
    'block.grass.break': 'Grass break',
    'block.grass.step': 'Grass step',
    'block.grass.place': 'Grass place',
    'block.grass.hit': 'Grass hit',
    'block.grass.fall': 'Grass fall',
    'block.sand.break': 'Sand break',
    'block.sand.step': 'Sand step',
    'block.sand.place': 'Sand place',
    'block.sand.hit': 'Sand hit',
    'block.sand.fall': 'Sand fall',
    'block.dirt.break': 'Dirt break',
    'block.dirt.step': 'Dirt step',
    'block.dirt.place': 'Dirt place',
    'block.dirt.hit': 'Dirt hit',
    'block.dirt.fall': 'Dirt fall',
    'block.water.ambient': 'Water ambient',
    'block.lava.ambient': 'Lava ambient',
    'block.fire.ambient': 'Fire ambient',
    'block.tnt.primed': 'TNT primed',
    'block.tnt.explode': 'TNT explode',
    'block.glass.break': 'Glass break',
    'block.glass.step': 'Glass step',
    'block.glass.place': 'Glass place',
    'block.glass.hit': 'Glass hit',
    'block.glass.fall': 'Glass fall',
    'block.door.open': 'Door open',
    'block.door.close': 'Door close',
    'block.trapdoor.open': 'Trapdoor open',
    'block.trapdoor.close': 'Trapdoor close',
    'block.fence_gate.open': 'Fence gate open',
    'block.fence_gate.close': 'Fence gate close',
    'block.chest.open': 'Chest open',
    'block.chest.close': 'Chest close',
    'block.ender_chest.open': 'Ender chest open',
    'block.ender_chest.close': 'Ender chest close',
    'block.shulker_box.open': 'Shulker box open',
    'block.shulker_box.close': 'Shulker box close',
    'block.note_block.harp': 'Note block (harp)',
    'block.note_block.bass': 'Note block (bass)',
    'block.note_block.snare': 'Note block (snare)',
    'block.note_block.hat': 'Note block (hat)',
    'block.note_block.basedrum': 'Note block (basedrum)',
    'block.note_block.bell': 'Note block (bell)',
    'block.note_block.flute': 'Note block (flute)',
    'block.note_block.chime': 'Note block (chime)',
    'block.note_block.guitar': 'Note block (guitar)',
    'block.note_block.xylophone': 'Note block (xylophone)',
    'block.note_block.iron_xylophone': 'Note block (iron xylophone)',
    'block.note_block.cow_bell': 'Note block (cow bell)',
    'block.note_block.didgeridoo': 'Note block (didgeridoo)',
    'block.note_block.bit': 'Note block (bit)',
    'block.note_block.banjo': 'Note block (banjo)',
    'block.note_block.pling': 'Note block (pling)',

    // Items
    'item.armor.equip_generic': 'Armor equip (generic)',
    'item.armor.equip_leather': 'Armor equip (leather)',
    'item.armor.equip_chain': 'Armor equip (chain)',
    'item.armor.equip_iron': 'Armor equip (iron)',
    'item.armor.equip_gold': 'Armor equip (gold)',
    'item.armor.equip_diamond': 'Armor equip (diamond)',
    'item.armor.equip_netherite': 'Armor equip (netherite)',
    'item.armor.equip_elytra': 'Elytra equip',
    'item.armor.equip_turtle': 'Turtle helmet equip',
    'item.bow.hit': 'Bow hit',
    'item.bow.shoot': 'Bow shoot',
    'item.bow.hit': 'Bow hit',
    'item.crossbow.shoot': 'Crossbow shoot',
    'item.crossbow.loading_start': 'Crossbow loading start',
    'item.crossbow.loading_middle': 'Crossbow loading middle',
    'item.crossbow.loading_end': 'Crossbow loading end',
    'item.crossbow.quick_charge_1': 'Crossbow quick charge 1',
    'item.crossbow.quick_charge_2': 'Crossbow quick charge 2',
    'item.crossbow.quick_charge_3': 'Crossbow quick charge 3',
    'item.trident.hit': 'Trident hit',
    'item.trident.hit_ground': 'Trident hit ground',
    'item.trident.return': 'Trident return',
    'item.trident.throw': 'Trident throw',
    'item.trident.thunder': 'Trident thunder',
    'item.trident.riptide_1': 'Trident riptide 1',
    'item.trident.riptide_2': 'Trident riptide 2',
    'item.trident.riptide_3': 'Trident riptide 3',
    'item.shield.block': 'Shield block',
    'item.shield.break': 'Shield break',
    'item.firecharge.use': 'Fire charge use',
    'item.flintandsteel.use': 'Flint and steel use',
    'item.hoe.till': 'Hoe till',
    'item.axe.strip': 'Axe strip',
    'item.axe.scrape': 'Axe scrape',
    'item.axe.wax_off': 'Axe wax off',
    'item.bucket.empty': 'Bucket empty',
    'item.bucket.fill': 'Bucket fill',
    'item.bucket.empty_fish': 'Bucket empty fish',
    'item.bucket.fill_fish': 'Bucket fill fish',
    'item.bucket.empty_lava': 'Bucket empty lava',
    'item.bucket.fill_lava': 'Bucket fill lava',
    'item.bucket.empty_powder_snow': 'Bucket empty powder snow',
    'item.bucket.fill_powder_snow': 'Bucket fill powder snow',

    // Ambient
    'ambient.cave': 'Cave ambient',
    'ambient.weather.rain': 'Rain ambient',
    'ambient.weather.thunder': 'Thunder ambient',
    'ambient.weather.lightning_impact': 'Lightning impact',
    'music.game': 'Game music',
    'music.creative': 'Creative music',
    'music.end': 'End music',
    'music.menu': 'Menu music',
    'music.disc.11': 'Music Disc 11',
    'music.disc.13': 'Music Disc 13',
    'music.disc.blocks': 'Music Disc Blocks',
    'music.disc.cat': 'Music Disc Cat',
    'music.disc.chirp': 'Music Disc Chirp',
    'music.disc.far': 'Music Disc Far',
    'music.disc.mall': 'Music Disc Mall',
    'music.disc.mellohi': 'Music Disc Mellohi',
    'music.disc.pigstep': 'Music Disc Pigstep',
    'music.disc.stal': 'Music Disc Stal',
    'music.disc.strad': 'Music Disc Strad',
    'music.disc.wait': 'Music Disc Wait',
    'music.disc.ward': 'Music Disc Ward',
    'music.disc.otherside': 'Music Disc Otherside',
    'music.disc.5': 'Music Disc 5',

    // UI/Effects
    'ui.button.click': 'UI button click',
    'ui.toast.in': 'UI toast in',
    'ui.toast.out': 'UI toast out',
    'ui.cartography_table.take_result': 'Cartography table take result',
    'ui.loom.take_result': 'Loom take result',
    'ui.stonecutter.take_result': 'Stonecutter take result',
    'ui.loom.select_pattern': 'Loom select pattern',
    'ui.stonecutter.select_recipe': 'Stonecutter select recipe'
  };

  return soundNames[soundId] || soundId;
}

function isMobSound(soundId) {
  return soundId.startsWith('entity.');
}

function isBlockSound(soundId) {
  return soundId.startsWith('block.');
}

function isPlayerSound(soundId) {
  return soundId.startsWith('entity.player.') ||
         soundId.startsWith('ui.') ||
         soundId.startsWith('music.');
}

function isItemSound(soundId) {
  return soundId.startsWith('item.');
}

function isAmbientSound(soundId) {
  return soundId.startsWith('ambient.') || soundId.startsWith('music.');
}

function isImportantSound(soundId) {
  const importantSounds = [
    'entity.creeper.primed',
    'entity.wither.ambient',
    'entity.wither.shoot',
    'entity.dragon.ambient',
    'entity.dragon.growl',
    'block.tnt.primed',
    'entity.player.death',
    'ambient.weather.lightning_impact',
    'item.shield.break'
  ];

  return importantSounds.includes(soundId);
}

function handleMobSound(soundId, pos, distance) {
  if (soundId === 'entity.creeper.primed') {
    Chat.actionbar(`&c⚠ CREEPER PRIMED! ${distance.toFixed(1)}m away!`);
    Chat.log(`&4⚠ CREEPER PRIMED at [${pos.x}, ${pos.y}, ${pos.z}]!`);
  } else if (soundId === 'entity.wither.ambient') {
    Chat.actionbar(`&8⚠ WITHER nearby! ${distance.toFixed(1)}m away!`);
    Chat.log(`&8⚠ WITHER detected at [${pos.x}, ${pos.y}, ${pos.z}]!`);
  } else if (soundId === 'entity.enderman.scream') {
    Chat.actionbar(`&d⚠ ENDERMAN ANGRY!`);
  } else if (soundId.includes('villager')) {
    Chat.log(`&6Villager sound: ${getSoundName(soundId)}`);
  } else if (soundId.includes('wolf') && distance < 10) {
    Chat.actionbar(`&6Wolf nearby!`);
  }
}

function handleBlockSound(soundId, pos, distance) {
  if (soundId === 'block.tnt.primed') {
    Chat.actionbar(`&c💣 TNT PRIMED!`);
    Chat.log(`&cTNT primed at [${pos.x}, ${pos.y}, ${pos.z}]!`);
  } else if (soundId === 'block.glass.break') {
    Chat.log(`&bGlass broken at [${pos.x}, ${pos.y}, ${pos.z}]`);
  } else if (soundId.includes('chest')) {
    Chat.log(`&6Chest interaction nearby`);
  } else if (soundId.includes('door') || soundId.includes('trapdoor') || soundId.includes('fence_gate')) {
    Chat.log(`&6Door/gate opened or closed`);
  } else if (soundId.startsWith('block.note_block.')) {
    const note = soundId.split('.').pop();
    Chat.log(`&dNote block playing: ${note}`);
  }
}

function handlePlayerSound(soundId, pos, distance) {
  if (soundId === 'entity.player.hurt' && distance < 5) {
    Chat.actionbar(`&cPlayer hurt nearby!`);
  } else if (soundId === 'entity.player.death' && distance < 20) {
    Chat.actionbar(`&cPlayer died nearby!`);
  } else if (soundId === 'entity.player.levelup') {
    Chat.actionbar(`&aLEVEL UP! 🎉`);
  } else if (soundId.startsWith('music.')) {
    Chat.log(`&8Music: ${getSoundName(soundId)}`);
  }
}

function handleItemSound(soundId, pos, distance) {
  if (soundId === 'item.crossbow.shoot' && distance < 20) {
    Chat.actionbar(`&cCrossbow fired nearby!`);
  } else if (soundId === 'item.trident.throw' && distance < 30) {
    Chat.actionbar(`&bTrident thrown nearby!`);
  } else if (soundId === 'item.shield.block' && distance < 10) {
    Chat.log(`&6Shield blocked nearby`);
  } else if (soundId.includes('bucket')) {
    Chat.log(`&eBucket used: ${soundId.split('.').pop()}`);
  }
}

function handleAmbientSound(soundId, pos, distance) {
  if (soundId === 'ambient.weather.lightning_impact') {
    Chat.actionbar(`&e⚡ Lightning struck!`);
    Chat.log(`&eLightning impact at [${pos.x}, ${pos.y}, ${pos.z}]!`);
  } else if (soundId === 'ambient.cave') {
    Chat.log(`&8Cave ambient sound`);
  } else if (soundId.startsWith('ambient.weather.')) {
    Chat.log(`&8Weather sound: ${getSoundName(soundId)}`);
  }
}

function handleImportantSound(soundId, pos, distance) {
  Chat.log(`&6&lIMPORTANT SOUND: ${getSoundName(soundId)}`);
  Chat.actionbar(`&6⚠ ${getSoundName(soundId)} - ${distance.toFixed(1)}m away!`);
}

function logSoundLocation(soundId, pos) {
  // Log important or interesting sounds for mapping
  if (isImportantSound(soundId) || isMobSound(soundId)) {
    if (!global.soundLocations) {
      global.soundLocations = [];
    }

    global.soundLocations.push({
      sound: soundId,
      x: pos.x,
      y: pos.y,
      z: pos.z,
      timestamp: new Date().toISOString()
    });

    // Keep log manageable
    if (global.soundLocations.length > 200) {
      global.soundLocations = global.soundLocations.slice(-100);
    }
  }
}
```

## Fields
- [event.sound](#eventsound)
- [event.volume](#eventvolume)
- [event.pitch](#eventpitch)
- [event.position](#eventposition)

## Methods
- [event.toString()](#eventtostring)

### event.sound
The ID of the sound being played.

**Type:** `string`

**Notes**
This contains the Minecraft sound event ID, such as `'entity.creeper.primed'` or `'block.stone.break'`. These IDs follow the format `category.subcategory.action`.

### event.volume
The volume level of the sound.

**Type:** `float`

**Notes**
Ranges from 0.0 (silent) to 1.0 (maximum volume). Most sounds are played at volume 1.0, but distance and other factors can affect this.

### event.pitch
The pitch of the sound.

**Type:** `float`

**Notes**
- `1.0` - Normal pitch
- `> 1.0` - Higher pitch
- `< 1.0` - Lower pitch
- Common values range from 0.5 to 2.0

### event.position
The world position where the sound originated.

**Type:** `Pos3D`

**Notes**
This contains the X, Y, and Z coordinates of where the sound is playing in the world. For ambient sounds, this might be the player's position.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`