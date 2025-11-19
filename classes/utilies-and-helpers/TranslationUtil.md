# TranslationUtil

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.util.TranslationUtil`

**Type:** Utility Class

**Since:** JsMacros 1.6.4

The `TranslationUtil` class is a utility class that provides translation and localization functionality for JSMacros. While this class is primarily used internally by JSMacros for translating UI elements and event names, it represents the broader translation system available to script developers through the Chat library.

## Overview

The TranslationUtil class and the broader translation system in JSMacros provide access to Minecraft's built-in localization system, allowing scripts to:

- Translate text using Minecraft's language files
- Support multiple languages and locales
- Access game translations for items, blocks, entities, and more
- Create translatable user interfaces
- Format text with language-aware parameters

## Available Translation Methods

While the TranslationUtil class itself is not directly exposed to scripts (it's an internal utility), translation functionality is available through the Chat library:

## Translation Key Format

Minecraft translation keys follow a specific format:

### Categories of Translation Keys

- **Items:** `item.modid.item_name`
  - Example: `item.minecraft.diamond_sword`
  - Example: `item.minecraft.apple`

- **Blocks:** `block.modid.block_name`
  - Example: `block.minecraft.stone`
  - Example: `block.minecraft.oak_log`

- **Entities:** `entity.modid.entity_name`
  - Example: `entity.minecraft.zombie`
  - Example: `entity.minecraft.creeper`

- **Effects:** `effect.modid.effect_name`
  - Example: `effect.minecraft.speed`
  - Example: `effect.minecraft.poison`

- **Enchantments:** `enchantment.modid.enchantment_name`
  - Example: `enchantment.minecraft.sharpness`
  - Example: `enchantment.minecraft.protection`

- **Biomes:** `biome.modid.biome_name`
  - Example: `biome.minecraft.plains`
  - Example: `biome.minecraft.desert`

- **Death Messages:** `death.attack.type`
  - Example: `death.attack.player`
  - Example: `death.attack.mob`

- **Game Messages:** `game.modid.message_key`
  - Example: `game.tnt.will_explode`
  - Example: `game.democraciahead.success`

- **Stats:** `stat.modid.stat_name`
  - Example: `stat.minecraft.mine_block`
  - Example: `stat.minecraft.kill_entity`

- **JsMacros Events:** `jsmacros.event.event_name`
  - Example: `jsmacros.event.tick`
  - Example: `jsmacros.event.playerjoin`

### Parameterized Translations

Many translation keys accept parameters for dynamic content:

```javascript
// Death messages with player names
const playerKillMessage = Chat.createTextHelperFromTranslationKey(
    "death.attack.player.item",
    "Notch",
    "Steve",
    "Diamond Sword"
);

// Item enchantment formatting
const enchantedBook = Chat.createTextHelperFromTranslationKey(
    "item.minecraft.enchanted_book",
    Chat.createTextHelperFromTranslationKey("enchantment.minecraft.sharpness")
);

// Multi-parameter formatting
const chatMessage = Chat.createTextHelperFromTranslationKey(
    "chat.type.text",
    "PlayerName",
    "Hello world!"
);
```

## Language Support

The translation system automatically uses the current game language setting. Common supported languages include:

- English (`en_us`)
- Spanish (`es_es`)
- French (`fr_fr`)
- German (`de_de`)
- Italian (`it_it`)
- Portuguese (`pt_br`)
- Russian (`ru_ru`)
- Japanese (`ja_jp`)
- Chinese Simplified (`zh_cn`)
- Chinese Traditional (`zh_tw`)
- Korean (`ko_kr`)
- And many more...

## Usage Examples

### Basic Translation
```javascript
// Translate an item name
const diamondPickaxe = Chat.createTextHelperFromTranslationKey("item.minecraft.diamond_pickaxe");
Chat.log(`Item: ${diamondPickaxe.getString()}`);

// Translate a block name
const cobblestone = Chat.createTextHelperFromTranslationKey("block.minecraft.cobblestone");
Chat.log(`Block: ${cobblestone.getString()}`);
```

### User Interface Translation
```javascript
// Create translatable UI elements
const hud = Hud.createDraw2D();

// Translatable title
const title = Chat.createTextHelperFromTranslationKey("gui.stats");
const titleText = hud.addText(title.getString(), 10, 10);

// Translatable labels
const healthText = Chat.createTextHelperFromTranslationKey("attribute.name.generic.max_health");
const manaText = Chat.createTextHelperFromTranslationKey("attribute.name.generic.max_health"); // Example

hud.addText(`${healthText.getString()}: ${Player.getPlayer().getHealth()}`, 10, 30);
```

### Multi-Language Chat Messages
```javascript
function sendLocalizedMessage(baseKey, ...args) {
    const message = Chat.createTextHelperFromTranslationKey(baseKey, ...args);
    Chat.say(message.getString());
}

// Send localized achievement messages
sendLocalizedMessage("chat.type.advancement.task", Player.getPlayer().getName(), "Getting Wood");

// Send localized death messages
function handlePlayerDeath(event) {
    const deathMessage = Chat.createTextHelperFromTranslationKey(
        "death.attack.player",
        event.source.getName(),
        event.player.getName()
    );
    Chat.log(deathMessage.getString());
}
```

### Item and Inventory Translation
```javascript
// Get translated names for inventory items
function translateInventory() {
    const player = Player.getPlayer();
    const inventory = player.getInventory();

    for (let i = 0; i < inventory.getSize(); i++) {
        const stack = inventory.getSlot(i);
        if (stack && !stack.isEmpty()) {
            const itemKey = `item.${stack.getItemId()}`;
            const translatedName = Chat.createTextHelperFromTranslationKey(itemKey);

            Chat.log(`Slot ${i}: ${translatedName.getString()} x${stack.getCount()}`);
        }
    }
}

// Translate armor slots
function translateArmor() {
    const player = Player.getPlayer();
    const armorSlots = ['head', 'chest', 'legs', 'feet'];
    const armorKeys = [
        "item.minecraft.leather_helmet",
        "item.minecraft.leather_chestplate",
        "item.minecraft.leather_leggings",
        "item.minecraft.leather_boots"
    ];

    armorSlots.forEach((slot, index) => {
        const armor = player.getArmor()[index];
        if (armor) {
            const armorName = Chat.createTextHelperFromTranslationKey(armorKeys[index]);
            Chat.log(`${slot}: ${armorName.getString()}`);
        }
    });
}
```

### Block and World Translation
```javascript
// Translate block names when looking at blocks
events.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const player = Player.getPlayer();
    if (!player) return;

    const lookingAt = player.rayTraceBlock(10);
    if (lookingAt && lookingAt.block) {
        const blockId = lookingAt.block.getBlockId();
        const blockKey = `block.${blockId}`;
        const blockName = Chat.createTextHelperFromTranslationKey(blockKey);

        Chat.actionbar(`Looking at: ${blockName.getString()}`);
    }
}));

// Translate biome names
function getCurrentBiome() {
    const player = Player.getPlayer();
    const biome = player.getBiome();
    const biomeKey = `biome.${biome.getId()}`;
    const biomeName = Chat.createTextHelperFromTranslationKey(biomeKey);

    Chat.log(`Current biome: ${biomeName.getString()}`);
}
```

### Status Effect Translation
```javascript
// Translate active potion effects
function translateActiveEffects() {
    const player = Player.getPlayer();
    const effects = player.getActiveEffects();

    if (effects.length === 0) {
        const noEffects = Chat.createTextHelperFromTranslationKey("effect.none");
        Chat.log(noEffects.getString());
        return;
    }

    Chat.log("Active effects:");
    effects.forEach(effect => {
        const effectKey = `effect.${effect.getId()}`;
        const effectName = Chat.createTextHelperFromTranslationKey(effectKey);
        const amplifier = effect.getAmplifier();

        Chat.log(`- ${effectName.getString()} ${amplifier > 0 ? `(${amplifier + 1})` : ""}`);
    });
}
```

### Advanced Translation with Parameters
```javascript
// Complex translation with multiple parameters
function announceAchievement(achievement, playerName) {
    // achievement format: "achievement.${modid}.${name}"
    const achievementKey = `chat.type.achievement.${achievement}`;
    const message = Chat.createTextHelperFromTranslationKey(
        achievementKey,
        playerName
    );

    Chat.say(message.getString());
}

// Translate commands with context
function translateCommandFeedback(command, result) {
    const feedbackKey = `commands.${command}.success`;
    const feedback = Chat.createTextHelperFromTranslationKey(feedbackKey, result);

    Chat.log(feedback.getString());
}

// Item comparison with translation
function compareItems(item1, item2) {
    const name1 = Chat.createTextHelperFromTranslationKey(`item.${item1.getItemId()}`);
    const name2 = Chat.createTextHelperFromTranslationKey(`item.${item2.getItemId()}`);

    const compareKey = "comparison.between.two.items";
    const comparison = Chat.createTextHelperFromTranslationKey(
        compareKey,
        name1.getString(),
        name2.getString()
    );

    Chat.log(comparison.getString());
}
```

### Error Handling
```javascript
// Safe translation with fallback
function safeTranslate(key, fallback = key, ...args) {
    try {
        const translated = Chat.createTextHelperFromTranslationKey(key, ...args);
        const result = translated.getString();

        // Check if translation failed (returns key if not found)
        if (result === key && fallback !== key) {
            return fallback;
        }
        return result;
    } catch (error) {
        Chat.log(`Translation error for key '${key}': ${error}`);
        return fallback;
    }
}

// Usage with fallbacks
const unknownItem = safeTranslate("item.unknown.custom", "Unknown Item");
const knownItem = safeTranslate("item.minecraft.diamond", "Diamond");
```

## Best Practices

## Related Classes and Methods

- **Chat.createTextHelperFromTranslationKey()** - Main method for creating translatable text
- **TextHelper** - Class for handling translated text components
- **Chat.createTextHelperFromString()** - For creating non-translatable text helpers
- **Chat.log()**, **Chat.say()** - For displaying translated messages

## Limitations

1. **Access to Game Language Only:** The translation system uses Minecraft's language files and cannot access custom translation files
2. **Client-Side Only:** Translations are based on the client's language setting
3. **Static Keys:** Translation keys are determined at runtime but come from predefined language files
4. **No Custom Languages:** You cannot add new language files through scripts

## Version History

- **JsMacros 1.6.4:** TranslationUtil class introduced internally
- **JsMacros 1.9.0:** `Chat.createTextHelperFromTranslationKey()` method added for script access
- **Current:** Full translation system integration with parameter support

## Internal TranslationUtil Methods

*Note: The following methods are internal and not directly accessible to scripts:*

- **`getTranslatedEventName(eventName)`** - Internal method to translate JSMacros event names for the UI

This documentation covers the translation functionality available to JSMacros script developers through the Chat library, which provides access to Minecraft's comprehensive localization system.