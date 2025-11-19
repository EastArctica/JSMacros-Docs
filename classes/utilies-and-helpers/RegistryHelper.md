# RegistryHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.RegistryHelper`

**Since:** `1.8.4`

The `RegistryHelper` class is a comprehensive utility class for accessing and working with Minecraft's registry system. It provides methods to retrieve items, blocks, enchantments, entities, status effects, and other game objects by their registry IDs, as well as methods to get lists of all registered objects of each type. This class serves as the main interface for script developers to look up and create instances of Minecraft game objects programmatically.

The RegistryHelper provides type-safe access to Minecraft's registries, allowing scripts to work with game objects using their string identifiers (like `"minecraft:stone"` or `"diamond_sword"`) and convert them into appropriate helper objects that can be used in JSMacros scripts.

## Accessing RegistryHelper

The RegistryHelper is typically accessed through a global API method. Check your JSMacros version documentation for the specific access method.

```javascript
// Example: Getting the RegistryHelper instance (method varies by version)
const registry = /* method to get RegistryHelper instance */;
```

## Table of Contents

- [Item Methods](#item-methods)
- [Block Methods](#block-methods)
- [Entity Methods](#entity-methods)
- [Enchantment Methods](#enchantment-methods)
- [Status Effect Methods](#status-effect-methods)
- [Fluid Methods](#fluid-methods)
- [Registry Listing Methods](#registry-listing-methods)
- [Identifier Methods](#identifier-methods)
- [Constants](#constants)

---

## Item Methods

## Block Methods

## Entity Methods

## Enchantment Methods

## Status Effect Methods

## Fluid Methods

## Registry Listing Methods

## Identifier Methods

## Constants

## Usage Examples

### Comprehensive Item Lookup Example
```js
const registry = /* get RegistryHelper instance */;

// Get basic item information
const diamondSword = registry.getItem("diamond_sword");
Chat.log(`Diamond sword max damage: ${diamondSword.getMaxDamage()}`);

// Create enchanted item with NBT
try {
    const godSword = registry.getItemStack("diamond_sword",
        '{Enchantments:[' +
        '{id:"minecraft:sharpness",lvl:5},' +
        '{id:"minecraft:unbreaking",lvl:3},' +
        '{id:"minecraft:mending",lvl:1}' +
        '],' +
        'display:{Name:\''' + JSON.stringify({text:"God Sword",color:"gold",bold:true}).replace(/"/g, '\\"') + '\'}' +
        '}');

    Chat.log(`Created god sword with ${godSword.getEnchantments().length} enchantments`);
    Chat.log(`Custom name: ${godSword.getName()}`);
} catch (e) {
    Chat.log(`Error creating enchanted item: ${e.message}`);
}

// Search for specific items
const allItems = registry.getItemIds();
const toolItems = allItems.filter(id =>
    ["sword", "pickaxe", "axe", "shovel", "hoe"].some(tool => id.includes(tool))
);
Chat.log(`Found ${toolItems.length} tool items`);
```

### Block State Analysis Example
```js
// Analyze different block types
const blocks = registry.getBlocks();
Chat.log(`Total registered blocks: ${blocks.length}`);

// Find blocks by properties
const solidBlocks = blocks.filter(block => block.isSolid());
const transparentBlocks = blocks.filter(block => !block.isSolid());
const breakableBlocks = blocks.filter(block => block.getHardness() > 0);
const blastResistant = blocks.filter(block => block.getBlastResistance() > 20);

Chat.log(`Solid blocks: ${solidBlocks.length}`);
Chat.log(`Transparent blocks: ${transparentBlocks.length}`);
Chat.log(`Breakable blocks: ${breakableBlocks.length}`);
Chat.log(`Blast resistant blocks: ${blastResistant.length}`);

// Create custom block states
try {
    // Chest with custom name
    const customChest = registry.getBlockState("chest",
        '{CustomName:"Treasure Chest",Lock:"secret_key"}');

    // Sign with text
    const welcomeSign = registry.getBlockState("oak_sign",
        '{Text1:\'{"text":"Welcome","color":"yellow","bold":true}\',' +
        'Text2:\'{"text":"to","color":"white"}\',' +
        'Text3:\'{"text":"My","color":"white"}\',' +
        'Text4:\'{"text":"World!","color":"green","bold":true}\'}');

    Chat.log(`Created custom chest: ${customChest.getBlock().getTranslationKey()}`);
    Chat.log(`Created welcome sign: ${welcomeSign.getBlock().getTranslationKey()}`);
} catch (e) {
    Chat.log(`Error creating custom block states: ${e.message}`);
}
```

### Entity Analysis Example
```js
// Get information about different entity types
const entityTypes = registry.getEntityTypeIds();
Chat.log(`Total entity types: ${entityTypes.length}`);

// Test creating entity helpers
try {
    const zombie = registry.getEntity("zombie");
    const cow = registry.getEntity("cow");
    const wither = registry.getEntity("wither");

    Chat.log(`Zombie health: ${zombie.getMaxHealth()}`);
    Chat.log(`Cow is passive: ${cow.isPassive()}`);
    Chat.log(`Wither health: ${wither.getMaxHealth()}`);
} catch (e) {
    Chat.log(`Error creating entities: ${e.message}`);
}

// Analyze entity categories
const hostileMobs = entityTypes.filter(id =>
    ["zombie", "skeleton", "creeper", "spider", "enderman"].some(mob => id.includes(mob))
);
const passiveMobs = entityTypes.filter(id =>
    ["cow", "pig", "sheep", "chicken", "villager"].some(mob => id.includes(mob))
);

Chat.log(`Hostile mobs: ${hostileMobs.join(", ")}`);
Chat.log(`Passive mobs: ${passiveMobs.join(", ")}`);
```

### Enchantment Analysis Example
```js
// Get all enchantments
const enchantments = registry.getEnchantments();
Chat.log(`Total enchantments: ${enchantments.length}`);

// Create enchantment instances with different levels
const maxSharpness = registry.getEnchantment("sharpness", 5);
const maxProtection = registry.getEnchantment("protection", 4);
const fortune = registry.getEnchantment("fortune", 3);

Chat.log(`Sharpness V: ${maxSharpness.getName(5)}`);
Chat.log(`Protection IV: ${maxProtection.getName(4)}`);
Chat.log(`Fortune III: ${fortune.getName(3)}`);

// Analyze enchantment properties
const treasureEnchantments = enchantments.filter(enchant => enchant.isTreasure());
const curseEnchantments = enchantments.filter(enchant => enchant.isCurse());
const compatibleSlots = enchantments.map(enchant =>
    `${enchant.getName(1)}: ${enchant.getSlots().join(", ")}`
);

Chat.log(`Treasure enchantments: ${treasureEnchantments.length}`);
Chat.log(`Curse enchantments: ${curseEnchantments.length}`);
Chat.log(`Compatible slots: ${compatibleSlots.join("; ")}`);
```

### Status Effect Analysis Example
```js
// Get all status effects
const effects = registry.getStatusEffects();
Chat.log(`Total status effects: ${effects.length}`);

// Analyze effect properties
const beneficialEffects = effects.filter(effect => effect.isBeneficial());
const harmfulEffects = effects.filter(effect => !effect.isBeneficial());

Chat.log(`Beneficial effects: ${beneficialEffects.length}`);
Chat.log(`Harmful effects: ${harmfulEffects.length}`);

// Get effect information
const effectInfo = effects.map(effect => {
    const color = effect.getColor();
    return `${effect.getName()}: color=0x${color.toString(16).padStart(6, '0')}, beneficial=${effect.isBeneficial()}`;
});

Chat.log(`Effect details: ${effectInfo.join("; ")}`);

// Test creating specific effects
const poison = registry.getStatusEffect("poison");
const regeneration = registry.getStatusEffect("regeneration");
const speed = registry.getStatusEffect("speed");

Chat.log(`Poison color: 0x${poison.getColor().toString(16).padStart(6, '0')}`);
Chat.log(`Regeneration name: ${regeneration.getName()}`);
Chat.log(`Speed is beneficial: ${speed.isBeneficial()}`);
```

### Registry Statistics Example
```js
// Get comprehensive registry statistics
const stats = {
    items: registry.getItemIds().length,
    blocks: registry.getBlockIds().length,
    entities: registry.getEntityTypeIds().length,
    enchantments: registry.getEnchantmentIds().length,
    statusEffects: registry.getStatusEffectIds().length,
    features: registry.getFeatureIds().length,
    structures: registry.getStructureFeatureIds().length,
    paintings: registry.getPaintingIds().length,
    particles: registry.getParticleTypeIds().length,
    gameEvents: registry.getGameEventNames().length,
    blockEntities: registry.getBlockEntityTypeIds().length,
    screenHandlers: registry.getScreenHandlerIds().length,
    recipeTypes: registry.getRecipeTypeIds().length,
    villagerTypes: registry.getVillagerTypeIds().length,
    villagerProfessions: registry.getVillagerProfessionIds().length,
    entityAttributes: registry.getEntityAttributeIds().length,
    potionTypes: registry.getPotionTypeIds().length
};

Chat.log("=== Registry Statistics ===");
Object.entries(stats).forEach(([key, value]) => {
    const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    Chat.log(`${formattedKey}: ${value}`);
});

const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
Chat.log(`Total registered objects: ${total}`);
```

### Mod Compatibility Example
```js
// Check for modded content
const allItemIds = registry.getItemIds();
const moddedItems = allItemIds.filter(id => !id.startsWith("minecraft:"));

if (moddedItems.length > 0) {
    Chat.log(`Found ${moddedItems.length} modded items:`);

    // Group by mod
    const modGroups = {};
    moddedItems.forEach(itemId => {
        const namespace = itemId.split(":")[0];
        if (!modGroups[namespace]) {
            modGroups[namespace] = [];
        }
        modGroups[namespace].push(itemId);
    });

    Object.entries(modGroups).forEach(([mod, items]) => {
        Chat.log(`${mod}: ${items.length} items`);
        if (items.length <= 10) {
            items.forEach(item => Chat.log(`  - ${item}`));
        } else {
            Chat.log(`  - ${items.slice(0, 5).join(", ")}... and ${items.length - 5} more`);
        }
    });
} else {
    Chat.log("No modded items found in registry");
}

// Test accessing modded items (if they exist)
if (moddedItems.length > 0) {
    try {
        const firstModItem = registry.getItem(moddedItems[0]);
        Chat.log(`Successfully loaded modded item: ${firstModItem.getItemId()}`);
        Chat.log(`Translation key: ${firstModItem.getTranslationKey()}`);
    } catch (e) {
        Chat.log(`Error loading modded item: ${e.message}`);
    }
}
```

---

## Important Notes

1. **Namespace Handling:** All methods automatically add "minecraft:" namespace when it's omitted. For modded content, you must include the full namespace (e.g., "modname:item_name").

2. **NBT Data Format:** NBT data should be provided as JSON strings following Minecraft's NBT format. Invalid NBT will throw `CommandSyntaxException`.

3. **Version Availability:** The RegistryHelper class was added in JsMacros 1.8.4. Some methods may not be available in earlier versions.

4. **Performance Considerations:** Registry lookups are generally fast, but avoid calling these methods repeatedly in performance-critical code. Cache results when possible.

5. **Error Handling:** Many methods can throw exceptions if invalid IDs or NBT data are provided. Always wrap these calls in try-catch blocks when dealing with user input or potentially invalid data.

6. **Mod Compatibility:** The RegistryHelper provides access to both vanilla and modded content, provided the mods are properly loaded and their registries are available.

7. **Static Constants:** The static constants (ALL_EQUALITY_OWNER, NBT_OPS_UNLIMITED, WRAPPER_LOOKUP_UNLIMITED) are primarily for internal use and advanced NBT operations.

## Related Classes

- `ItemHelper` - Wrapper for Minecraft Item objects
- `ItemStackHelper` - Wrapper for ItemStack objects
- `BlockHelper` - Wrapper for Minecraft Block objects
- `BlockStateHelper` - Wrapper for BlockState objects
- `EntityHelper` - Wrapper for Minecraft Entity objects
- `EnchantmentHelper` - Wrapper for Enchantment objects
- `StatusEffectHelper` - Wrapper for StatusEffect objects
- `FluidStateHelper` - Wrapper for FluidState objects
- `Identifier` - Minecraft's identifier class





