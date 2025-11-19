# BeaconInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.BeaconInventory`

**Extends:** `Inventory<BeaconScreen>`

**Since:** `1.5.1`

The `BeaconInventory` class is a specialized inventory helper that provides access to Minecraft beacon screen functionality. It wraps Minecraft's beacon GUI and allows scripters to programmatically interact with beacon effects, select status effects, and apply beacon powers. This class is specifically designed for managing beacon operations when a beacon interface is open.

This class provides methods for examining beacon level, selecting primary and secondary effects, and applying chosen effects to players within the beacon's range.

## Overview

The `BeaconInventory` represents the interface to a Minecraft beacon block when its GUI is open. It provides access to beacon-specific operations such as:

- Checking the current beacon level
- Selecting primary and secondary status effects based on beacon level
- Applying chosen effects to nearby players
- Access to standard inventory operations through inheritance

**Key Features:**
- Beacon level detection (levels 1-4)
- Primary effect selection for all levels
- Secondary effect selection for level 3+ beacons
- Effect application with payment validation
- Integration with standard inventory operations

## Accessing BeaconInventory

You typically get `BeaconInventory` instances when a beacon screen is open:

```javascript
// Check if current screen is a beacon
const inv = Inventory.create();
if (inv && inv.getType() === "Beacon") {
    // This is a BeaconInventory
    const beaconInv = inv; // Already typed as BeaconInventory
    Chat.log("Beacon level: " + beaconInv.getLevel());
}

// Direct creation when beacon screen is known to be open
const beaconInventory = Inventory.create(); // Returns BeaconInventory if beacon screen is open
```

## Beacon Effects Reference

Beacon effects are represented by their Minecraft IDs:

**Primary Effects (Available at different levels):**
- `minecraft:speed` - Speed increase
- `minecraft:haste` - Mining speed increase
- `minecraft:resistance` - Damage reduction
- `minecraft:jump_boost` - Jump height increase
- `minecraft:strength` - Melee damage increase

**Secondary Effects (Available at level 4):**
- `minecraft:regeneration` - Health regeneration (requires level 4)

## Methods

### Beacon Level and Status

#### `getLevel()`
**Returns:** `int`

Returns the current level of the beacon (1-4). Beacon level determines which effects are available and the range of effect application.

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    const level = beacon.getLevel();
    Chat.log(`Beacon level: ${level}`);

    if (level >= 4) {
        Chat.log("All effects available including regeneration!");
    } else if (level >= 3) {
        Chat.log("Primary and some secondary effects available");
    } else if (level >= 2) {
        Chat.log("Primary effects available");
    } else {
        Chat.log("Level 1 beacon - basic primary effects");
    }
}
```

#### `getFirstEffect()`
**Returns:** `String | null`

Returns the ID of the currently selected primary effect, or `null` if no primary effect has been selected.

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    const primaryEffect = beacon.getFirstEffect();
    if (primaryEffect) {
        Chat.log(`Primary effect: ${primaryEffect}`);
    } else {
        Chat.log("No primary effect selected");
    }
}
```

#### `getSecondEffect()`
**Returns:** `String | null`

Returns the ID of the currently selected secondary effect, or `null` if no secondary effect has been selected.

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    const secondaryEffect = beacon.getSecondEffect();
    if (secondaryEffect) {
        Chat.log(`Secondary effect: ${secondaryEffect}`);
    } else {
        Chat.log("No secondary effect selected");
    }
}
```

### Effect Selection

#### `selectFirstEffect(id)`
**Parameters:**
- `id` (`String`): The beacon effect ID to select as primary effect

**Returns:** `boolean`

Attempts to select the specified effect as the primary beacon effect. Returns `true` if successful, `false` if the effect is not available at the current beacon level.

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    // Try to select speed as primary effect
    const success = beacon.selectFirstEffect("minecraft:speed");
    if (success) {
        Chat.log("Successfully selected Speed as primary effect");
    } else {
        Chat.log("Failed to select Speed - may not be available at this beacon level");
    }

    // Try different effects
    const effects = ["minecraft:haste", "minecraft:resistance", "minecraft:jump_boost", "minecraft:strength"];
    for (const effect of effects) {
        if (beacon.selectFirstEffect(effect)) {
            Chat.log(`Selected ${effect} as primary effect`);
            break;
        }
    }
}
```

#### `selectSecondEffect(id)`
**Parameters:**
- `id` (`String`): The beacon effect ID to select as secondary effect

**Returns:** `boolean`

Attempts to select the specified effect as the secondary beacon effect. Secondary effects are only available at beacon level 3+. Returns `true` if successful, `false` if the effect is not available.

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    const level = beacon.getLevel();

    if (level >= 3) {
        // For level 3+, can select regeneration as secondary
        if (beacon.selectSecondEffect("minecraft:regeneration")) {
            Chat.log("Successfully selected Regeneration as secondary effect");
        }

        // Or select the same as primary (if not regeneration)
        const primaryEffect = beacon.getFirstEffect();
        if (primaryEffect && primaryEffect !== "minecraft:regeneration") {
            beacon.selectSecondEffect(primaryEffect);
            Chat.log(`Extended ${primaryEffect} effect to secondary slot`);
        }
    } else {
        Chat.log(`Beacon level ${level} is too low for secondary effects`);
    }
}
```

### Effect Application

#### `applyEffects()`
**Returns:** `boolean`

Applies the selected primary and secondary effects to players within the beacon's range. This requires payment (placing an item in the payment slot) and will close the beacon screen upon success. Returns `true` if effects were successfully applied, `false` if payment is not available.

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    // First select effects
    beacon.selectFirstEffect("minecraft:strength");

    const level = beacon.getLevel();
    if (level >= 4) {
        beacon.selectSecondEffect("minecraft:regeneration");
    }

    // Try to apply effects
    const applied = beacon.applyEffects();
    if (applied) {
        Chat.log("Beacon effects applied successfully!");
    } else {
        Chat.log("Failed to apply effects - make sure payment is available");
        Chat.log("Place an item (iron, gold, diamond, emerald, or netherite) in the payment slot");
    }
}
```

## Inherited Methods from Inventory

Since `BeaconInventory` extends `Inventory<BeaconScreen>`, it inherits all standard inventory operations:

### Slot Access and Manipulation
- `getSlot(slot)` - Get item in specific slot
- `getTotalSlots()` - Get total number of slots
- `click(slot)` - Click a slot
- `quick(slot)` - Shift-click a slot
- `dropSlot(slot)` - Drop items from slot
- `getHeld()` - Get item held by mouse

### Inventory Mapping
- `getMap()` - Get slot mapping for beacon inventory
- `getSlots(...identifiers)` - Get slots in specific sections
- `getLocation(slot)` - Get section name for a slot

**Beacon Inventory Mapping:**
- `"hotbar"` - Player hotbar slots (9 slots)
- `"main"` - Player main inventory (27 slots)
- `"slot"` - Beacon payment/input slot (1 slot)

### Utility Methods
- `getType()` - Returns "Beacon"
- `close()` - Close the beacon interface
- `getContainerTitle()` - Get beacon title
- `contains(item)` - Check if inventory contains specific item

```javascript
const beacon = Inventory.create();
if (beacon && beacon.getType() === "Beacon") {
    // Get the beacon inventory mapping
    const slotMap = beacon.getMap();
    Chat.log("Available sections: " + Object.keys(slotMap).join(", "));

    // Access the beacon payment slot
    const paymentSlots = beacon.getSlots("slot");
    if (paymentSlots.length > 0) {
        const paymentItem = beacon.getSlot(paymentSlots[0]);
        if (!paymentItem.isEmpty()) {
            Chat.log(`Payment item: ${paymentItem.getName()} x${paymentItem.getCount()}`);
        } else {
            Chat.log("No payment item in beacon");
        }
    }

    // Check if player has payment materials in inventory
    const hasPayment = beacon.contains("minecraft:iron_ingot") ||
                      beacon.contains("minecraft:gold_ingot") ||
                      beacon.contains("minecraft:diamond") ||
                      beacon.contains("minecraft:emerald") ||
                      beacon.contains("minecraft:netherite_ingot");

    if (!hasPayment) {
        Chat.log("No payment materials found in inventory");
    }
}
```

## Usage Examples

### Example 1: Beacon Configuration Assistant

```javascript
function configureBeacon(primaryEffect, secondaryEffect = null) {
    const beacon = Inventory.create();

    if (!beacon || beacon.getType() !== "Beacon") {
        Chat.log("No beacon interface open!");
        return false;
    }

    const level = beacon.getLevel();
    Chat.log(`Configuring level ${level} beacon...`);

    // Select primary effect
    if (beacon.selectFirstEffect(primaryEffect)) {
        Chat.log(`✓ Selected ${primaryEffect} as primary effect`);
    } else {
        Chat.log(`✗ Cannot select ${primaryEffect} - not available at level ${level}`);
        return false;
    }

    // Select secondary effect if specified and available
    if (secondaryEffect && level >= 3) {
        if (beacon.selectSecondEffect(secondaryEffect)) {
            Chat.log(`✓ Selected ${secondaryEffect} as secondary effect`);
        } else {
            Chat.log(`✗ Cannot select ${secondaryEffect}`);
            return false;
        }
    } else if (secondaryEffect) {
        Chat.log(`✗ Beacon level ${level} too low for secondary effects`);
    }

    // Apply effects
    if (beacon.applyEffects()) {
        Chat.log("✓ Beacon effects applied successfully!");
        return true;
    } else {
        Chat.log("✗ Failed to apply effects - check payment slot");
        return false;
    }
}

// Usage examples:
configureBeacon("minecraft:strength", "minecraft:regeneration");
configureBeacon("minecraft:speed");
configureBeacon("minecraft:haste");
```

### Example 2: Beacon Effect Explorer

```javascript
function exploreBeaconEffects() {
    const beacon = Inventory.create();

    if (!beacon || beacon.getType() !== "Beacon") {
        Chat.log("Please open a beacon interface first");
        return;
    }

    const level = beacon.getLevel();
    const availableEffects = [];

    // Test all primary effects
    const primaryEffects = [
        "minecraft:speed",
        "minecraft:haste",
        "minecraft:resistance",
        "minecraft:jump_boost",
        "minecraft:strength"
    ];

    Chat.log(`=== Beacon Level ${level} Effects ===`);
    Chat.log("Testing primary effects:");

    for (const effect of primaryEffects) {
        if (beacon.selectFirstEffect(effect)) {
            Chat.log(`  ✓ ${effect}`);
            availableEffects.push(effect);
        } else {
            Chat.log(`  ✗ ${effect} (not available)`);
        }
    }

    // Test secondary effects if beacon level allows
    if (level >= 3) {
        Chat.log("\nTesting secondary effects:");

        // Test regeneration (only secondary effect)
        if (beacon.selectSecondEffect("minecraft:regeneration")) {
            Chat.log(`  ✓ minecraft:regeneration (secondary)`);
        } else {
            Chat.log(`  ✗ minecraft:regeneration (not available)`);
        }

        // Test extending primary effects
        for (const effect of availableEffects) {
            if (beacon.selectFirstEffect(effect)) {
                if (beacon.selectSecondEffect(effect)) {
                    Chat.log(`  ✓ ${effect} (extended to secondary)`);
                }
            }
        }
    } else {
        Chat.log(`\nBeacon level ${level} too low for secondary effects`);
    }

    // Show current selection
    const currentPrimary = beacon.getFirstEffect();
    const currentSecondary = beacon.getSecondEffect();

    Chat.log("\nCurrent selection:");
    Chat.log(`  Primary: ${currentPrimary || "none"}`);
    Chat.log(`  Secondary: ${currentSecondary || "none"}`);
}

// Run the explorer
exploreBeaconEffects();
```

### Example 3: Automatic Beacon Setup

```javascript
function autoSetupBeacon(preferredEffects = ["minecraft:strength", "minecraft:regeneration"]) {
    const beacon = Inventory.create();

    if (!beacon || beacon.getType() !== "Beacon") {
        Chat.log("No beacon interface detected");
        return false;
    }

    const level = beacon.getLevel();
    Chat.log(`Auto-configuring level ${level} beacon...`);

    // Check for payment materials
    const paymentMaterials = [
        "minecraft:netherite_ingot",
        "minecraft:diamond",
        "minecraft:emerald",
        "minecraft:gold_ingot",
        "minecraft:iron_ingot"
    ];

    let hasPayment = false;
    for (const material of paymentMaterials) {
        if (beacon.contains(material)) {
            hasPayment = true;
            Chat.log(`Found payment material: ${material}`);
            break;
        }
    }

    if (!hasPayment) {
        Chat.log("No payment materials found - cannot configure beacon");
        return false;
    }

    // Try to configure preferred effects
    let primaryEffect = null;
    let secondaryEffect = null;

    // Find primary effect that works
    for (const effect of preferredEffects) {
        if (beacon.selectFirstEffect(effect)) {
            primaryEffect = effect;
            Chat.log(`Selected primary effect: ${effect}`);
            break;
        }
    }

    if (!primaryEffect) {
        Chat.log("No preferred primary effects available - using default");
        beacon.selectFirstEffect("minecraft:speed");
        primaryEffect = "minecraft:speed";
    }

    // Try to configure secondary effect
    if (level >= 4) {
        for (const effect of preferredEffects) {
            if (effect !== primaryEffect && beacon.selectSecondEffect(effect)) {
                secondaryEffect = effect;
                Chat.log(`Selected secondary effect: ${effect}`);
                break;
            }
        }

        // If no preferred secondary effect works, try regeneration
        if (!secondaryEffect && beacon.selectSecondEffect("minecraft:regeneration")) {
            secondaryEffect = "minecraft:regeneration";
            Chat.log("Selected secondary effect: minecraft:regeneration");
        }
    }

    // Apply the configuration
    if (beacon.applyEffects()) {
        Chat.log("✓ Beacon automatically configured successfully!");
        Chat.log(`Configuration: Primary=${primaryEffect}, Secondary=${secondaryEffect || "none"}`);
        return true;
    } else {
        Chat.log("✗ Failed to apply beacon configuration");
        return false;
    }
}

// Usage with default effects
autoSetupBeacon();

// Usage with custom preferences
autoSetupBeacon(["minecraft:haste", "minecraft:resistance"]);
```

### Example 4: Beacon Information Display

```javascript
function displayBeaconInfo() {
    const beacon = Inventory.create();

    if (!beacon || beacon.getType() !== "Beacon") {
        Chat.log("No beacon interface open");
        return;
    }

    const level = beacon.getLevel();
    Chat.log("=== Beacon Information ===");
    Chat.log(`Level: ${level}`);
    Chat.log(`Effect Range: ${level * 10 + 10} blocks`);

    // Current effects
    const primary = beacon.getFirstEffect();
    const secondary = beacon.getSecondEffect();

    Chat.log("\nCurrent Configuration:");
    Chat.log(`Primary Effect: ${primary ? primary.replace("minecraft:", "") : "None"}`);
    Chat.log(`Secondary Effect: ${secondary ? secondary.replace("minecraft:", "") : "None"}`);

    // Available effects by level
    Chat.log("\nAvailable Effects:");
    if (level >= 1) {
        Chat.log("  Primary: Speed, Haste");
    }
    if (level >= 2) {
        Chat.log("  Primary: Resistance, Jump Boost");
    }
    if (level >= 3) {
        Chat.log("  Primary: Strength");
        Chat.log("  Secondary: Regeneration");
    }
    if (level >= 4) {
        Chat.log("  Secondary: Can extend primary effect");
    }

    // Check payment slot
    const paymentSlots = beacon.getSlots("slot");
    if (paymentSlots.length > 0) {
        const paymentItem = beacon.getSlot(paymentSlots[0]);
        if (!paymentItem.isEmpty()) {
            Chat.log(`\nPayment: ${paymentItem.getName()} x${paymentItem.getCount()}`);
        } else {
            Chat.log("\nPayment: None (add iron/gold/diamond/emerald/netherite)");
        }
    }

    // Check inventory for payment materials
    const paymentItems = beacon.getItemCount();
    let totalPayment = 0;
    for (const [itemId, count] of paymentItems) {
        if (itemId.includes("ingot") ||
            itemId === "minecraft:diamond" ||
            itemId === "minecraft:emerald" ||
            itemId === "minecraft:netherite_ingot") {
            totalPayment += count;
        }
    }

    if (totalPayment > 0) {
        Chat.log(`Available payment materials in inventory: ${totalPayment}`);
    }

    Chat.log("==========================");
}

// Display beacon info
displayBeaconInfo();
```

### Example 5: Beacon Effect Cycling

```javascript
function cycleBeaconEffects(delay = 2000) {
    const beacon = Inventory.create();

    if (!beacon || beacon.getType() !== "Beacon") {
        Chat.log("No beacon interface open");
        return;
    }

    const level = beacon.getLevel();
    if (level < 1) {
        Chat.log("Beacon level too low");
        return;
    }

    const effects = ["minecraft:speed", "minecraft:haste"];
    if (level >= 2) {
        effects.push("minecraft:resistance", "minecraft:jump_boost");
    }
    if (level >= 3) {
        effects.push("minecraft:strength");
    }

    let currentEffectIndex = 0;

    function cycleEffect() {
        const effect = effects[currentEffectIndex];

        if (beacon.selectFirstEffect(effect)) {
            // For level 4+, also try to select regeneration as secondary
            if (level >= 4) {
                beacon.selectSecondEffect("minecraft:regeneration");
            }

            if (beacon.applyEffects()) {
                Chat.log(`Applied beacon effect: ${effect.replace("minecraft:", "")}`);

                // Move to next effect
                currentEffectIndex = (currentEffectIndex + 1) % effects.length;

                // Schedule next cycle if still in beacon interface
                setTimeout(() => {
                    if (Inventory.create() && Inventory.create().getType() === "Beacon") {
                        cycleEffect();
                    } else {
                        Chat.log("Beacon effect cycling stopped - beacon interface closed");
                    }
                }, delay);
            } else {
                Chat.log("Failed to apply effect - check payment materials");
            }
        } else {
            Chat.log(`Failed to select effect: ${effect}`);
        }
    }

    Chat.log("Starting beacon effect cycling...");
    Chat.log("Effects to cycle: " + effects.map(e => e.replace("minecraft:", "")).join(", "));
    cycleEffect();
}

// Start cycling effects every 5 seconds
cycleBeaconEffects(5000);
```

## Important Notes

1. **Beacon Interface Required**: All `BeaconInventory` methods require that the beacon GUI interface is currently open.

2. **Effect Availability**: Effects are restricted by beacon level:
   - Level 1: Speed, Haste
   - Level 2: Speed, Haste, Resistance, Jump Boost
   - Level 3: Speed, Haste, Resistance, Jump Boost, Strength + Regeneration (secondary)
   - Level 4: All primary effects + extended secondary effects

3. **Payment Requirement**: `applyEffects()` requires a payment item in the beacon's payment slot:
   - Iron Ingot
   - Gold Ingot
   - Diamond
   - Emerald
   - Netherite Ingot

4. **Effect Application**: Successfully applying effects will automatically close the beacon interface.

5. **Effect Range**: The beacon's effect range is `level * 10 + 10` blocks from the beacon.

6. **Secondary Effects**: Secondary effects require beacon level 3+, with regeneration only available at level 4.

7. **Inheritance**: All standard inventory operations are available through inheritance from the `Inventory` class.

8. **Effect IDs**: Use Minecraft's internal effect IDs (e.g., "minecraft:speed", not just "speed").

## Related Classes

- `Inventory` - Base class providing standard inventory operations
- `ItemStackHelper` - For working with payment items
- `PlayerInventory` - For accessing player's inventory to find payment materials
- `ContainerInventory` - Similar container inventory functionality

## Version Information

- Available since JSMacros 1.5.1
- Compatible with Minecraft 1.17+ beacon system
- Effect selection follows Minecraft vanilla behavior