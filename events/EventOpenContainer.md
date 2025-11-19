# OpenContainer Event

This event is fired when a container/inventory is opened. Backed by class `EventOpenContainer`.

## Signature
```js
JsMacros.on("OpenContainer", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field     | Type       | Description                              |
| --------- | ---------- | ---------------------------------------- |
| inventory | Inventory  | The inventory helper object              |
| screen    | IScreen    | The screen helper object                 |

## Behavior

* Fires when a container/inventory interface is opened
- The `inventory` field provides access to the container contents
- The `screen` field provides access to the screen interface
- This event is cancellable - preventing the container from opening
- Useful for custom container handling or automated sorting

## Minimal example

```js
JsMacros.on("OpenContainer", JavaWrapper.methodToJavaAsync((e) => {
  Chat.log(`Opened container: ${e.screen.getTitle()}`);
});
```

## Async example

```js
JsMacros.on("OpenContainer", JavaWrapper.methodToJavaAsync((e) => {
  const inventory = e.inventory;
  const screen = e.screen;
  const screenTitle = screen.getTitle();
  const screenName = screen.getClassName();

  Chat.log(`&aContainer Opened: &f${screenTitle}`);
  Chat.log(`&7Screen type: &f${screenName}`);

  // Handle different container types
  if (screenName.includes("ChestScreen") || screenName.includes("Generic3x3ContainerScreen")) {
    Chat.actionbar("&6Chest opened!");

    const size = inventory.getSize();
    Chat.log(`&7Chest size: &f${size} &7slots`);

    // Count valuable items in chest
    let totalValue = 0;
    for (let i = 0; i < size; i++) {
      const slot = inventory.getSlot(i);
      if (slot) {
        totalValue += countItemValue(slot);
      }
    }

    if (totalValue > 0) {
      Chat.log(`&6Estimated chest value: &f${totalValue} &7points`);
    }
  }

  if (screenName.includes("FurnaceScreen")) {
    Chat.actionbar("&eFurnace opened!");

    const inputSlot = inventory.getSlot(0);
    const fuelSlot = inventory.getSlot(1);
    const outputSlot = inventory.getSlot(2);

    if (inputSlot && !inputSlot.isEmpty()) {
      Chat.log(`&7Smelting: &f${inputSlot.getName().getString()}`);
    }

    if (fuelSlot && !fuelSlot.isEmpty()) {
      Chat.log(`&7Fuel: &f${fuelSlot.getName().getString()} &7(x${fuelSlot.getCount()})`);
    }

    if (outputSlot && !outputSlot.isEmpty()) {
      Chat.log(`&7Output: &f${outputSlot.getName().getString()} &7(x${outputSlot.getCount()})`);
    }
  }

  if (screenName.includes("CraftingScreen")) {
    Chat.actionbar("&dCrafting table opened!");

    const resultSlot = inventory.getSlot(0);
    if (resultSlot && !resultSlot.isEmpty()) {
      Chat.log(`&7Result: &f${resultSlot.getName().getString()}`);
    }
  }

  if (screenName.includes("AnvilScreen")) {
    Chat.actionbar("&6Anvil opened!");
    Chat.log("&dReady for repairs and renaming!");
  }

  if (screenName.includes("EnchantmentScreen")) {
    Chat.actionbar("&dEnchantment table opened!");

    // Check for bookshelves
    const player = Player.getPlayer();
    const pos = player.getPos();
    Chat.log("&dChecking for nearby bookshelves...");
  }

  if (screenName.includes("BrewingStandScreen")) {
    Chat.actionbar("&bBrewing stand opened!");

    const fuelSlot = inventory.getSlot(4);
    if (fuelSlot && fuelSlot.getCount() > 0) {
      Chat.log(`&7Fuel remaining: &f${fuelSlot.getCount()} &7brews`);
    }
  }

  if (screenName.includes("HopperScreen")) {
    Chat.actionbar("&eHopper opened!");
  }

  if (screenName.includes("DispenserScreen") || screenName.includes("DropperScreen")) {
    Chat.actionbar("&eDispenser/Dropper opened!");
  }

  if (screenName.includes("ShulkerBoxScreen")) {
    Chat.actionbar("&dShulker box opened!");

    const size = inventory.getSize();
    Chat.log(`&7Shulker box contents: &f${size} &7slots`);
  }

  if (screenName.includes("BeaconScreen")) {
    Chat.actionbar("&eBeacon opened!");
    Chat.log("&6Time to select your powers!");
  }

  // Player inventory
  if (screenName.includes("InventoryScreen")) {
    Chat.actionbar("&eInventory opened!");

    // Check armor durability
    checkArmorDurability(inventory);
  }

  // Count total items
  const totalItems = countTotalItems(inventory);
  Chat.log(`&7Total items in container: &f${totalItems}`);

  // Could implement auto-sorting
  // if (shouldAutoSort(screenName)) {
  //   Chat.log("&6Auto-sorting container...");
  //   sortContainer(inventory);
  // }
}));

function countItemValue(itemStack) {
  const itemName = itemStack.getName().getString().toLowerCase();

  // Simple value system
  if (itemName.includes("diamond")) return 10;
  if (itemName.includes("emerald")) return 8;
  if (itemName.includes("gold")) return 5;
  if (itemName.includes("iron")) return 3;
  if (itemName.includes("netherite")) return 15;
  if (itemName.includes("enchanted")) return 7;
  if (itemName.includes("elytra")) return 20;
  if (itemName.includes("totem")) return 12;

  return 1;
}

function countTotalItems(inventory) {
  let total = 0;
  const size = inventory.getSize();

  for (let i = 0; i < size; i++) {
    const slot = inventory.getSlot(i);
    if (slot && !slot.isEmpty()) {
      total += slot.getCount();
    }
  }

  return total;
}

function checkArmorDurability(inventory) {
  const armorSlots = [103, 102, 101, 100]; // helmet, chestplate, leggings, boots

  for (const slot of armorSlots) {
    const armorPiece = inventory.getSlot(slot);
    if (armorPiece && !armorPiece.isEmpty()) {
      const damage = armorPiece.getDamage();
      const maxDamage = armorPiece.getMaxDamage();
      const durabilityPercent = ((maxDamage - damage) / maxDamage) * 100;

      if (durabilityPercent <= 20) {
        Chat.log(`&cWarning: ${armorPiece.getName().getString()} is almost broken! (${durabilityPercent.toFixed(0)}%)`);
      }
    }
  }
}
```

## Fields
- [event.inventory](#eventinventory)
- [event.screen](#eventscreen)

## Methods
- [event.toString()](#eventtostring)

### event.inventory
A helper object for the container's inventory.

**Type:** `Inventory`

**Notes**
This provides access to all slots in the container, allowing you to examine items, count contents, or perform inventory operations.

### event.screen
A helper object for the container's screen interface.

**Type:** `IScreen`

**Notes**
This provides access to screen properties like title, class name, and other UI elements. You can use this to determine what type of container was opened.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`