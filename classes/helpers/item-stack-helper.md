# ItemStackHelper

Represents an item stack in Minecraft. This class provides methods to inspect and interact with item properties, enchantments, NBT data, and more. Item stacks are obtained from various sources like player inventory, containers, or entity equipment.

## Methods
- [ItemStackHelper.copy](#itemstackhelpercopy)
- [ItemStackHelper.equals](#itemstackhelperequals)
- [ItemStackHelper.getAttackDamage](#itemstackhelpergetattackdamage)
- [ItemStackHelper.getCooldownProgress](#itemstackhelpergetcooldownprogress)
- [ItemStackHelper.getCount](#itemstackhelpergetcount)
- [ItemStackHelper.getCreative](#itemstackhelpergetcreative)
- [ItemStackHelper.getCreativeTab](#itemstackhelpergetcreativetab)
- [ItemStackHelper.getDamage](#itemstackhelpergetdamage)
- [ItemStackHelper.getDefaultName](#itemstackhelpergetdefaultname)
- [ItemStackHelper.getDestroyRestrictions](#itemstackhelpergetdestroyrestrictions)
- [ItemStackHelper.getDurability](#itemstackhelpergetdurability)
- [ItemStackHelper.getEnchantment](#itemstackhelpergetenchantment)
- [ItemStackHelper.getEnchantments](#itemstackhelpergetenchantments)
- [ItemStackHelper.getItemId](#itemstackhelpergetitemid)
- [ItemStackHelper.getItem](#itemstackhelpergetitem)
- [ItemStackHelper.getMaxCount](#itemstackhelpergetmaxcount)
- [ItemStackHelper.getMaxDamage](#itemstackhelpergetmaxdamage)
- [ItemStackHelper.getMaxDurability](#itemstackhelpergetmaxdurability)
- [ItemStackHelper.getName](#itemstackhelpergetname)
- [ItemStackHelper.getNBT](#itemstackhelpergetnbt)
- [ItemStackHelper.getPlaceRestrictions](#itemstackhelpergetplacerestrictions)
- [ItemStackHelper.getPossibleEnchantments](#itemstackhelpergetpossibleenchantments)
- [ItemStackHelper.getPossibleEnchantmentsFromTable](#itemstackhelpergetpossibleenchantmentsfromtable)
- [ItemStackHelper.getRepairCost](#itemstackhelpergetrepaircost)
- [ItemStackHelper.getTags](#itemstackhelpergettags)
- [ItemStackHelper.isCanDestroyHidden](#itemstackhelperiscandestroyhidden)
- [ItemStackHelper.isCanPlaceHidden](#itemstackhelperiscanplacehidden)
- [ItemStackHelper.areEnchantmentsHidden](#itemstackhelperareenchantmentshidden)
- [ItemStackHelper.isDamageable](#itemstackhelperisdamageable)
- [ItemStackHelper.areModifiersHidden](#itemstackhelperaremodifiershidden)
- [ItemStackHelper.isEmpty](#itemstackhelperisempty)
- [ItemStackHelper.isEnchanted](#itemstackhelperisenchanted)
- [ItemStackHelper.isEnchantable](#itemstackhelperisenchantable)
- [ItemStackHelper.isDyeHidden](#itemstackhelperisdyehidden)
- [ItemStackHelper.isFood](#itemstackhelperisfood)
- [ItemStackHelper.hasDestroyRestrictions](#itemstackhelperhasdestroyrestrictions)
- [ItemStackHelper.hasEnchantment](#itemstackhelperhasenchantment)
- [ItemStackHelper.hasPlaceRestrictions](#itemstackhelperhasplacerestrictions)
- [ItemStackHelper.isItemEqual](#itemstackhelperisitemequal)
- [ItemStackHelper.isItemEqualIgnoreDamage](#itemstackhelperisitemequalignoredamage)
- [ItemStackHelper.isNBTEqual](#itemstackhelperisnbtequal)
- [ItemStackHelper.isOnCooldown](#itemstackhelperisoncooldown)
- [ItemStackHelper.isSuitableFor](#itemstackhelperissuitablefor)
- [ItemStackHelper.isTool](#itemstackhelperistool)
- [ItemStackHelper.isUnbreakable](#itemstackhelperisunbreakable)
- [ItemStackHelper.isUnbreakableHidden](#itemstackhelperisunbreakablehidden)
- [ItemStackHelper.isWearable](#itemstackhelperiswearable)
- [ItemStackHelper.setDamage](#itemstackhelpersetdamage)

### ItemStackHelper.copy
```js
const item = Player.getInventory().getStack(0);
const itemCopy = item.copy();
Chat.log(`Copied item: ${itemCopy.getName().getString()}`);
```

**Params**
* `(none)`

**Returns**
* `ItemStackHelper`: A new ItemStackHelper that is a copy of this item stack.

### ItemStackHelper.equals
```js
const item1 = Player.getInventory().getStack(0);
const item2 = Player.getInventory().getStack(1);

// Compare with another ItemStackHelper
const isEqual = item1.equals(item2);
Chat.log(`Items are exactly equal: ${isEqual}`);

// Compare with raw Minecraft ItemStack
const rawItem = item1.getRaw();
const isRawEqual = item1.equals(rawItem);
```

**Params**
1. `item: ItemStackHelper | ItemStack`: The item stack to compare with.

**Returns**
* `boolean`: `true` if the items and their components are equal, `false` otherwise.

### ItemStackHelper.getAttackDamage
```js
const heldItem = Player.getInventory().getSelectedSlot();
if (heldItem) {
    const damage = heldItem.getAttackDamage();
    Chat.log(`Attack damage: ${damage}`);
}
```

**Params**
* `(none)`

**Returns**
* `number`: The default attack damage of this item.

### ItemStackHelper.getCooldownProgress
```js
const heldItem = Player.getInventory().getSelectedSlot();
if (heldItem && heldItem.isOnCooldown()) {
    const progress = heldItem.getCooldownProgress();
    Chat.log(`Cooldown progress: ${Math.round(progress * 100)}%`);
}
```

**Params**
* `(none)`

**Returns**
* `number`: A value between 0.0 and 1.0 representing the cooldown progress.

### ItemStackHelper.getCount
```js
const item = Player.getInventory().getStack(0);
Chat.log(`Item count: ${item.getCount()}`);
Chat.log(`Max stack size: ${item.getMaxCount()}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The number of items in this stack.

### ItemStackHelper.getCreative
```js
const item = Player.getInventory().getStack(0);
const creativeItem = item.getCreative();

// Now you can modify the item's NBT data
creativeItem.addLore("Custom lore line");
creativeItem.setEnchantment("unbreaking", 3);
```

**Params**
* `(none)`

**Returns**
* `CreativeItemStackHelper`: A creative item stack helper that can modify this item's NBT data.

**Notes**
- Use this when you need to modify item properties like enchantments, lore, or other NBT data.
- The returned helper references the same underlying item.

### ItemStackHelper.getCreativeTab
```js
const item = Player.getInventory().getStack(0);
const tabs = item.getCreativeTab();
if (tabs.length > 0) {
    Chat.log(`Item belongs to creative tab: ${tabs[0].getString()}`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<TextHelper>`: A list of creative tab names this item belongs to.

### ItemStackHelper.getDamage
```js
const tool = Player.getInventory().getStack(0);
if (tool.isDamageable()) {
    const damage = tool.getDamage();
    const maxDamage = tool.getMaxDamage();
    const durability = tool.getDurability();

    Chat.log(`Damage: ${damage}/${maxDamage}`);
    Chat.log(`Durability left: ${durability}`);
}
```

**Params**
* `(none)`

**Returns**
* `int`: The amount of damage this item has taken.

### ItemStackHelper.getDefaultName
```js
const item = Player.getInventory().getStack(0);
const defaultName = item.getDefaultName().getString();
const customName = item.getName().getString();

if (defaultName !== customName) {
    Chat.log(`Item has custom name: ${customName} (default: ${defaultName})`);
}
```

**Params**
* `(none)`

**Returns**
* `TextHelper`: The default name of this item type (without custom names).

### ItemStackHelper.getDestroyRestrictions
```js
const item = Player.getInventory().getStack(0);
if (item.hasDestroyRestrictions()) {
    const restrictions = item.getDestroyRestrictions();
    Chat.log(`Can destroy blocks matching ${restrictions.length} predicates`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<BlockPredicateHelper>`: A list of block predicates this item can destroy.

**Notes**
- This is only relevant for players in adventure mode.

### ItemStackHelper.getDurability
```js
const tool = Player.getInventory().getStack(0);
if (tool.isDamageable()) {
    const durability = tool.getDurability();
    const maxDurability = tool.getMaxDurability();
    const percentage = (durability / maxDurability) * 100;

    Chat.log(`Durability: ${Math.round(percentage)}%`);
}
```

**Params**
* `(none)`

**Returns**
* `int`: The remaining durability of this item.

### ItemStackHelper.getEnchantment
```js
const sword = Player.getInventory().getStack(0);
const sharpness = sword.getEnchantment("sharpness");

if (sharpness) {
    Chat.log(`Sharpness level: ${sharpness.getLevel()}`);
} else {
    Chat.log("No sharpness enchantment found");
}
```

**Params**
1. `id: string`: The ID of the enchantment to check for (e.g., "sharpness", "minecraft:sharpness").

**Returns**
* `EnchantmentHelper | null`: The enchantment helper if found, `null` otherwise.

### ItemStackHelper.getEnchantments
```js
const enchantedItem = Player.getInventory().getStack(0);
const enchantments = enchantedItem.getEnchantments();

if (enchantments.length > 0) {
    Chat.log(`Item has ${enchantments.length} enchantments:`);
    for (const enchantment of enchantments) {
        Chat.log(`- ${enchantment.getName()}: ${enchantment.getLevel()}`);
    }
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<EnchantmentHelper>`: A list of all enchantments on this item.

### ItemStackHelper.getItemId
```js
const item = Player.getInventory().getStack(0);
const itemId = item.getItemId();
Chat.log(`Item ID: ${itemId}`);
```

**Params**
* `(none)`

**Returns**
* `string`: The namespaced ID of this item (e.g., "minecraft:diamond_sword").

### ItemStackHelper.getItem
```js
const itemStack = Player.getInventory().getStack(0);
const item = itemStack.getItem();
Chat.log(`Item name: ${item.getName().getString()}`);
Chat.log(`Max count: ${item.getMaxCount()}`);
```

**Params**
* `(none)`

**Returns**
* `ItemHelper`: The item that this stack is made of.

### ItemStackHelper.getMaxCount
```js
const item = Player.getInventory().getStack(0);
const currentCount = item.getCount();
const maxCount = item.getMaxCount();
Chat.log(`Stack: ${currentCount}/${maxCount}`);
```

**Params**
* `(none)`

**Returns**
* `int`: The maximum number of items this stack can hold.

### ItemStackHelper.getMaxDamage
```js
const tool = Player.getInventory().getStack(0);
if (tool.isDamageable()) {
    const maxDamage = tool.getMaxDamage();
    Chat.log(`Maximum damage: ${maxDamage}`);
}
```

**Params**
* `(none)`

**Returns**
* `int`: The maximum amount of damage this item can take.

### ItemStackHelper.getMaxDurability
```js
const tool = Player.getInventory().getStack(0);
if (tool.isDamageable()) {
    const maxDurability = tool.getMaxDurability();
    const currentDurability = tool.getDurability();

    Chat.log(`Durability: ${currentDurability}/${maxDurability}`);
}
```

**Params**
* `(none)`

**Returns**
* `int`: The maximum durability of this item.

### ItemStackHelper.getName
```js
const item = Player.getInventory().getStack(0);
const itemName = item.getName().getString();
Chat.log(`Item name: ${itemName}`);
```

**Params**
* `(none)`

**Returns**
* `TextHelper`: The display name of this item (including custom names if present).

### ItemStackHelper.getNBT
```js
const item = Player.getInventory().getStack(0);
const nbt = item.getNBT();

if (nbt) {
    Chat.log(`Item has NBT data`);
    // Access NBT data
    const display = nbt.get("display");
    if (display) {
        Chat.log(`Display data found`);
    }
} else {
    Chat.log(`Item has no NBT data`);
}
```

**Params**
* `(none)`

**Returns**
* `NBTElementHelper.NBTCompoundHelper | null`: The NBT data of this item, or `null` if no NBT data exists.

### ItemStackHelper.getPlaceRestrictions
```js
const item = Player.getInventory().getStack(0);
if (item.hasPlaceRestrictions()) {
    const restrictions = item.getPlaceRestrictions();
    Chat.log(`Can only be placed on blocks matching ${restrictions.length} predicates`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<BlockPredicateHelper>`: A list of block predicates this item can be placed on.

**Notes**
- This is only relevant for players in adventure mode.

### ItemStackHelper.getPossibleEnchantments
```js
const item = Player.getInventory().getStack(0);
const enchantments = item.getPossibleEnchantments();

Chat.log(`Possible enchantments (${enchantments.length}):`);
for (const enchantment of enchantments) {
    if (enchantment.canBeApplied(item)) {
        Chat.log(`- ${enchantment.getName()}`);
    }
}
```

**Params**
* `(none)**

**Returns**
* `java.util.List<EnchantmentHelper>`: A list of all enchantments that can be applied to this item.

### ItemStackHelper.getPossibleEnchantmentsFromTable
```js
const item = Player.getInventory().getStack(0);
const tableEnchantments = item.getPossibleEnchantmentsFromTable();

Chat.log(`Enchanting table options (${tableEnchantments.length}):`);
for (const enchantment of tableEnchantments) {
    Chat.log(`- ${enchantment.getName()}`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<EnchantmentHelper>`: A list of enchantments available from an enchanting table for this item.

### ItemStackHelper.getRepairCost
```js
const item = Player.getInventory().getStack(0);
const repairCost = item.getRepairCost();
if (repairCost > 0) {
    Chat.log(`Repair cost: ${repairCost} levels`);
}
```

**Params**
* `(none)`

**Returns**
* `int`: The current repair cost of this item in experience levels.

### ItemStackHelper.getTags
```js
const item = Player.getInventory().getStack(0);
const tags = item.getTags();

Chat.log(`Item tags (${tags.length}):`);
for (const tag of tags) {
    Chat.log(`- ${tag}`);
}
```

**Params**
* `(none)`

**Returns**
* `java.util.List<string>`: A list of all item tags this item belongs to.

### ItemStackHelper.isCanDestroyHidden
```js
const item = Player.getInventory().getStack(0);
if (item.hasDestroyRestrictions()) {
    const hidden = item.isCanDestroyHidden();
    Chat.log(`Can destroy restrictions are hidden: ${hidden}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the can destroy restrictions are hidden from tooltips.

### ItemStackHelper.isCanPlaceHidden
```js
const item = Player.getInventory().getStack(0);
if (item.hasPlaceRestrictions()) {
    const hidden = item.isCanPlaceHidden();
    Chat.log(`Can place restrictions are hidden: ${hidden}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the can place restrictions are hidden from tooltips.

### ItemStackHelper.areEnchantmentsHidden
```js
const item = Player.getInventory().getStack(0);
if (item.isEnchanted()) {
    const hidden = item.areEnchantmentsHidden();
    Chat.log(`Enchantments are hidden: ${hidden}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if enchantments are hidden from tooltips.

### ItemStackHelper.isDamageable
```js
const item = Player.getInventory().getStack(0);
if (item.isDamageable()) {
    Chat.log("Item can be damaged");
    const damage = item.getDamage();
    const durability = item.getDurability();
    Chat.log(`Durability: ${durability}/${item.getMaxDurability()}`);
} else {
    Chat.log("Item cannot be damaged");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item can take damage, `false` otherwise.

### ItemStackHelper.areModifiersHidden
```js
const item = Player.getInventory().getStack(0);
const hidden = item.areModifiersHidden();
Chat.log(`Attribute modifiers are hidden: ${hidden}`);
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if attribute modifiers are hidden from tooltips.

### ItemStackHelper.isEmpty
```js
const item = Player.getInventory().getStack(0);
if (!item.isEmpty()) {
    Chat.log(`Item: ${item.getName().getString()} x${item.getCount()}`);
} else {
    Chat.log("Empty slot");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item stack is empty, `false` otherwise.

### ItemStackHelper.isEnchanted
```js
const item = Player.getInventory().getStack(0);
if (item.isEnchanted()) {
    const enchantments = item.getEnchantments();
    Chat.log(`Item has ${enchantments.length} enchantments`);
} else {
    Chat.log("Item is not enchanted");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item has any enchantments, `false` otherwise.

### ItemStackHelper.isEnchantable
```js
const item = Player.getInventory().getStack(0);
if (item.isEnchantable()) {
    Chat.log("Item can be enchanted");
    const possibleEnchants = item.getPossibleEnchantments();
    Chat.log(`Possible enchantments: ${possibleEnchants.length}`);
} else {
    Chat.log("Item cannot be enchanted");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item can be enchanted, `false` otherwise.

### ItemStackHelper.isDyeHidden
```js
const leatherArmor = Player.getInventory().getStack(0);
if (leatherArmor.getItemId().includes("leather")) {
    const hidden = leatherArmor.isDyeHidden();
    Chat.log(`Dye color is hidden: ${hidden}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the dye color of leather armor is hidden from tooltips.

### ItemStackHelper.isFood
```js
const item = Player.getInventory().getStack(0);
if (item.isFood()) {
    Chat.log("Item is food");
    const hungerRestored = item.getFoodComponent() ? item.getFoodComponent().getHunger() : "Unknown";
    Chat.log(`Hunger restored: ${hungerRestored}`);
} else {
    Chat.log("Item is not food");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item is food, `false` otherwise.

### ItemStackHelper.hasDestroyRestrictions
```js
const item = Player.getInventory().getStack(0);
if (item.hasDestroyRestrictions()) {
    Chat.log("Item has destroy restrictions (adventure mode)");
    const restrictions = item.getDestroyRestrictions();
    Chat.log(`Can destroy ${restrictions.length} types of blocks`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item has destroy restrictions set, `false` otherwise.

### ItemStackHelper.hasEnchantment
```js
const sword = Player.getInventory().getStack(0);

// Check by enchantment helper
const possibleEnchants = sword.getPossibleEnchantments();
for (const enchantment of possibleEnchants) {
    if (sword.hasEnchantment(enchantment)) {
        Chat.log(`Has ${enchantment.getName()}: ${enchantment.getLevel()}`);
    }
}

// Check by enchantment ID
if (sword.hasEnchantment("sharpness")) {
    Chat.log("Sword has sharpness");
}
```

**Params**
1. `enchantment: EnchantmentHelper | string`: The enchantment helper or enchantment ID to check for.

**Returns**
* `boolean`: `true` if this item has the specified enchantment, `false` otherwise.

### ItemStackHelper.hasPlaceRestrictions
```js
const item = Player.getInventory().getStack(0);
if (item.hasPlaceRestrictions()) {
    Chat.log("Item has place restrictions (adventure mode)");
    const restrictions = item.getPlaceRestrictions();
    Chat.log(`Can be placed on ${restrictions.length} types of blocks`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item has place restrictions set, `false` otherwise.

### ItemStackHelper.isItemEqual
```js
const item1 = Player.getInventory().getStack(0);
const item2 = Player.getInventory().getStack(1);

// Compare including damage
const equalWithDamage = item1.isItemEqual(item2);
Chat.log(`Items equal (including damage): ${equalWithDamage}`);

// Compare ignoring damage
const equalIgnoringDamage = item1.isItemEqualIgnoreDamage(item2);
Chat.log(`Items equal (ignoring damage): ${equalIgnoringDamage}`);
```

**Params**
1. `item: ItemStackHelper | ItemStack`: The item stack to compare with.

**Returns**
* `boolean`: `true` if the items are of the same type and have the same damage value.

### ItemStackHelper.isItemEqualIgnoreDamage
```js
const item1 = Player.getInventory().getStack(0);
const item2 = Player.getInventory().getStack(1);

// Only care about item type, not durability
const sameType = item1.isItemEqualIgnoreDamage(item2);
if (sameType) {
    Chat.log("Items are the same type (ignoring damage)");
}
```

**Params**
1. `item: ItemStackHelper | ItemStack`: The item stack to compare with.

**Returns**
* `boolean`: `true` if the items are of the same type, regardless of damage value.

### ItemStackHelper.isNBTEqual
```js
const item1 = Player.getInventory().getStack(0);
const item2 = Player.getInventory().getStack(1);

// Compare NBT data
const sameNBT = item1.isNBTEqual(item2);
if (sameNBT) {
    Chat.log("Items have identical NBT data");
}
```

**Params**
1. `item: ItemStackHelper | ItemStack`: The item stack to compare with.

**Returns**
* `boolean**: `true` if the items have identical NBT data, `false` otherwise.

### ItemStackHelper.isOnCooldown
```js
const item = Player.getInventory().getSelectedSlot();
if (item && item.isOnCooldown()) {
    const progress = item.getCooldownProgress();
    Chat.log(`Item is on cooldown: ${Math.round(progress * 100)}% remaining`);
} else {
    Chat.log("Item is ready to use");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item is currently on cooldown, `false` otherwise.

### ItemStackHelper.isSuitableFor
```js
const tool = Player.getInventory().getSelectedSlot();
const targetBlock = World.getBlockAt(Player.getPlayer().getBlockPos().add(0, -1, 0));

if (tool && targetBlock) {
    if (tool.isSuitableFor(targetBlock)) {
        Chat.log(`${tool.getName().getString()} is effective for mining ${targetBlock.getId()}`);
    } else {
        Chat.log(`${tool.getName().getString()} is not effective for ${targetBlock.getId()}`);
    }
}
```

**Params**
1. `block: BlockHelper | BlockStateHelper`: The block or block state to check.

**Returns**
* `boolean`: `true` if this item can effectively mine the specified block, `false` otherwise.

### ItemStackHelper.isTool
```js
const item = Player.getInventory().getStack(0);
if (item.isTool()) {
    Chat.log("Item is a tool");
} else {
    Chat.log("Item is not a tool");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item is a tool, `false` otherwise.

### ItemStackHelper.isUnbreakable
```js
const item = Player.getInventory().getStack(0);
if (item.isUnbreakable()) {
    Chat.log("Item is unbreakable");
} else if (item.isDamageable()) {
    Chat.log(`Item durability: ${item.getDurability()}/${item.getMaxDurability()}`);
} else {
    Chat.log("Item cannot be damaged");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item is unbreakable, `false` otherwise.

### ItemStackHelper.isUnbreakableHidden
```js
const item = Player.getInventory().getStack(0);
if (item.isUnbreakable()) {
    const hidden = item.isUnbreakableHidden();
    Chat.log(`Unbreakable flag is hidden: ${hidden}`);
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if the unbreakable flag is hidden from tooltips.

### ItemStackHelper.isWearable
```js
const item = Player.getInventory().getStack(0);
if (item.isWearable()) {
    Chat.log("Item can be worn as armor");
    const slot = item.getEquipmentSlot();
    Chat.log(`Equipment slot: ${slot}`);
} else {
    Chat.log("Item cannot be worn");
}
```

**Params**
* `(none)`

**Returns**
* `boolean`: `true` if this item can be worn as armor, `false` otherwise.

### ItemStackHelper.setDamage
**Deprecated.** Use `CreativeItemStackHelper.setDamage()` instead.
```js
// Deprecated:
// item.setDamage(50);
Chat.log("This method is deprecated. Use item.getCreative().setDamage() instead");
```

**Params**
1. `damage: int`: The damage value to set.

**Returns**
* `ItemStackHelper`: This item stack helper for method chaining.

**Notes**
- This method is deprecated. Use `getCreative().setDamage()` instead.
- You may want to use `copy()` first to avoid modifying the original item.