# LoomInventory

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.inventory.LoomInventory`

**Extends:** `Inventory<LoomScreen>`

**Since:** `1.5.1`

The `LoomInventory` class provides functionality for interacting with loom screens in Minecraft. Looms are used to add patterns to banners using various dye patterns and banner pattern items. This class extends the base `Inventory` class and adds loom-specific functionality while inheriting all standard inventory operations.

This class is automatically created when you open a loom screen and can be accessed through `Player.getInventory()` or `Inventory.create()` when a loom is open.

## Lom Screen Overview

The loom interface consists of:
- **Banner Slot** - The banner to be modified (Slot 0)
- **Dye Slot** - The dye color to use (Slot 1)
- **Pattern Slot** - Banner pattern items that unlock special patterns (Slot 2)
- **Output Slot** - The resulting banner with applied pattern (Slot 3)
- **Pattern Selection** - Scrollable list of available patterns

## Table of Contents

- [Constructors](#constructors)
- [Methods](#methods)

---

## Constructors

- [LoomInventory()](#loominventory)

---

## Methods

### Pattern Selection
- [instance.listAvailablePatterns()](#instancelistavailablepatterns)
- [instance.selectPatternId()](#instanceselectpatternid)
- [instance.selectPattern()](#instanceselectpattern)

### Deprecated Methods
- [instance.selectPatternName()](#instanceselectpatternname)

### Inherited from Inventory
- [Core Operations](#core-operations)
- [Slot Management](#slot-management)
- [Item Search and Filtering](#item-search-and-filtering)
- [Click Actions](#click-actions)
- [Hotbar Management](#hotbar-management)
- [Container Information](#container-information)
- [Mouse Interaction](#mouse-interaction)

---

## Constructors

### LoomInventory()
```js
// LoomInventory instances are typically created automatically by JSMacros
const inventory = Player.getInventory(); // Returns LoomInventory when a loom is open
const inventory = Inventory.create();    // Returns appropriate type for current screen
```

Creates a new `LoomInventory` instance for the specified loom screen.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| inventory | `LoomScreen` | The loom screen handler |

**Notes:**
- This constructor is primarily used internally by JSMacros
- Scripts typically obtain instances through `Player.getInventory()` or `Inventory.create()`

---

## Pattern Selection

## Deprecated Methods

## Core Operations (Inherited)

### Loom Detection
```js
// Check if current inventory is a loom
const inventory = Player.getInventory();
if (inventory && inventory.getType().includes("Loom")) {
    Chat.log("Currently viewing a loom");
    Chat.log(`Loom title: ${inventory.getContainerTitle()}`);
}
```

### Slot Access
```js
// Get items from loom slots
const inventory = Player.getInventory();
if (inventory && inventory.getType().includes("Loom")) {
    // Slot 0: Banner
    const banner = inventory.getSlot(0);
    if (!banner.isEmpty()) {
        Chat.log(`Banner: ${banner.getName().getString()}`);
    }

    // Slot 1: Dye
    const dye = inventory.getSlot(1);
    if (!dye.isEmpty()) {
        Chat.log(`Dye: ${dye.getName().getString()}`);
    }

    // Slot 2: Pattern item
    const patternItem = inventory.getSlot(2);
    if (!patternItem.isEmpty()) {
        Chat.log(`Pattern item: ${patternItem.getName().getString()}`);
    }

    // Slot 3: Output
    const output = inventory.getSlot(3);
    if (!output.isEmpty()) {
        Chat.log(`Output: ${output.getName().getString()}`);
    }
}
```

---

## Slot Management (Inherited)

### Getting Slot Information
```js
const inventory = Player.getInventory();
const totalSlots = inventory.getTotalSlots();
Chat.log(`Total loom slots: ${totalSlots}`);

// Check specific loom slots
const loomSlots = [0, 1, 2, 3]; // Banner, Dye, Pattern, Output
for (const slot of loomSlots) {
    if (slot < totalSlots) {
        const item = inventory.getSlot(slot);
        if (!item.isEmpty()) {
            const location = inventory.getLocation(slot);
            Chat.log(`Slot ${slot} (${location}): ${item.getItemId()} x${item.getCount()}`);
        }
    }
}
```

---

## Item Search and Filtering (Inherited)

### Checking Loom Contents
```js
const inventory = Player.getInventory();

// Check if loom has specific dye
const hasRedDye = inventory.contains("minecraft:red_dye");
if (hasRedDye) {
    Chat.log("Loom has red dye!");
}

// Check using ItemStackHelper
const mainHandItem = Player.getPlayer().getMainHand();
if (!mainHandItem.isEmpty() && mainHandItem.getItemId().includes("banner")) {
    const hasSameBanner = inventory.contains(mainHandItem);
    Chat.log(`Loom has ${mainHandItem.getName().getString()}: ${hasSameBanner}`);
}
```

---

## Click Actions (Inherited)

### Basic Loom Operations
```js
const inventory = Player.getInventory();

// Place items in loom slots
inventory.click(0); // Click banner slot
inventory.click(1); // Click dye slot
inventory.click(2); // Click pattern item slot

// Take result from output slot
inventory.click(3); // Click output slot

// Quick move items
inventory.quick(36); // Move banner from player inventory to loom
inventory.quick(37); // Move dye from player inventory to loom
```

### Taking Output
```js
const inventory = Player.getInventory();
if (inventory && inventory.getType().includes("Loom")) {
    // Check if there's an output item
    const output = inventory.getSlot(3);
    if (!output.isEmpty()) {
        Chat.log("Taking output from loom");
        inventory.click(3); // Take the output
        // Output will be moved to player's inventory
    } else {
        Chat.log("No output available - add banner, dye, and select a pattern");
    }
}
```

---

## Usage Examples

### Automated Banner Pattern Application
```javascript
function applyBannerPattern(patternId, requiredItems) {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.getType().includes("Loom")) {
        Chat.log("No loom open!");
        return false;
    }

    Chat.log(`Applying pattern: ${patternId}`);

    // Check if loom has required items
    const bannerSlot = inventory.getSlot(0);
    const dyeSlot = inventory.getSlot(1);
    const patternSlot = inventory.getSlot(2);

    if (bannerSlot.isEmpty()) {
        Chat.log("No banner in loom!");
        return false;
    }

    if (dyeSlot.isEmpty()) {
        Chat.log("No dye in loom!");
        return false;
    }

    // Check if pattern is available
    const availablePatterns = inventory.listAvailablePatterns();
    if (!availablePatterns.includes(patternId)) {
        Chat.log(`Pattern not available: ${patternId}`);
        Chat.log("Available patterns:");
        for (const pattern of availablePatterns.slice(0, 10)) {
            Chat.log(`- ${pattern}`);
        }
        return false;
    }

    // Select the pattern
    const success = inventory.selectPatternId(patternId);
    if (success) {
        Chat.log(`Successfully applied pattern: ${patternId}`);

        // Take the result after a short delay
        JsMacros.waitForEvent("Tick");
        const output = inventory.getSlot(3);
        if (!output.isEmpty()) {
            inventory.click(3);
            Chat.log("Took output from loom");
        }
        return true;
    } else {
        Chat.log(`Failed to apply pattern: ${patternId}`);
        return false;
    }
}

// Example usage
applyBannerPattern("minecraft:stripe_middle", {
    banner: "minecraft:white_banner",
    dye: "minecraft:red_dye"
});
```

### Batch Banner Pattern Creator
```javascript
function createMultipleBanners() {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.getType().includes("Loom")) {
        Chat.log("Open a loom first!");
        return;
    }

    const patterns = [
        "minecraft:stripe_bottom",
        "minecraft:stripe_top",
        "minecraft:stripe_left",
        "minecraft:stripe_right",
        "minecraft:stripe_center",
        "minecraft:stripe_middle",
        "minecraft:stripe_downright",
        "minecraft:stripe_downleft",
        "minecraft:stripe_upright",
        "minecraft:stripe_upleft"
    ];

    Chat.log("Creating multiple banner patterns...");

    for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i];
        Chat.log(`Creating pattern ${i + 1}/${patterns.length}: ${pattern}`);

        // Check if we have a banner and dye
        const bannerSlot = inventory.getSlot(0);
        const dyeSlot = inventory.getSlot(1);

        if (bannerSlot.isEmpty()) {
            Chat.log("Banner slot is empty, stopping...");
            break;
        }

        if (dyeSlot.isEmpty()) {
            Chat.log("Dye slot is empty, stopping...");
            break;
        }

        // Apply pattern
        if (inventory.selectPatternId(pattern)) {
            // Wait a moment for pattern to be applied
            JsMacros.waitForEvent("Tick");

            // Take result
            const output = inventory.getSlot(3);
            if (!output.isEmpty()) {
                inventory.click(3);
                Chat.log(`✓ Created banner with ${pattern}`);
            }
        } else {
            Chat.log(`✗ Failed to apply ${pattern}`);
        }

        // Small delay between patterns
        JsMacros.waitForEvent("Tick");
    }

    Chat.log("Batch creation complete!");
}

// Usage example
// createMultipleBanners();
```

### Pattern Explorer
```javascript
function explorePatterns() {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.getType().includes("Loom")) {
        Chat.log("Open a loom first!");
        return;
    }

    const currentPatterns = inventory.listAvailablePatterns();
    Chat.log(`=== Pattern Explorer ===`);
    Chat.log(`Found ${currentPatterns.length} patterns:`);

    // Group patterns by type
    const patternGroups = {
        stripes: [],
        borders: [],
        corners: [],
        crosses: [],
        triangles: [],
        others: []
    };

    for (const pattern of currentPatterns) {
        if (pattern.includes("stripe")) {
            patternGroups.stripes.push(pattern);
        } else if (pattern.includes("border")) {
            patternGroups.borders.push(pattern);
        } else if (pattern.includes("corner")) {
            patternGroups.corners.push(pattern);
        } else if (pattern.includes("cross")) {
            patternGroups.crosses.push(pattern);
        } else if (pattern.includes("triangle")) {
            patternGroups.triangles.push(pattern);
        } else {
            patternGroups.others.push(pattern);
        }
    }

    // Display grouped patterns
    for (const [group, patterns] of Object.entries(patternGroups)) {
        if (patterns.length > 0) {
            Chat.log(`\n${group.toUpperCase()} (${patterns.length}):`);
            for (const pattern of patterns) {
                Chat.log(`  - ${pattern}`);
            }
        }
    }

    // Test first pattern from each group
    Chat.log("\n=== Testing Patterns ===");
    for (const [group, patterns] of Object.entries(patternGroups)) {
        if (patterns.length > 0) {
            const testPattern = patterns[0];
            Chat.log(`Testing ${group}: ${testPattern}`);

            if (inventory.selectPatternId(testPattern)) {
                JsMacros.waitForEvent("Tick");
                Chat.log(`✓ ${testPattern} applied successfully`);

                // Take result if available
                const output = inventory.getSlot(3);
                if (!output.isEmpty()) {
                    Chat.log(`Result: ${output.getName().getString()}`);
                }
            } else {
                Chat.log(`✗ Failed to apply ${testPattern}`);
            }

            JsMacros.waitForEvent("Tick"); // Delay between tests
        }
    }
}

// Usage example
// explorePatterns();
```

### Smart Pattern Selector
```javascript
function selectBestPattern() {
    const inventory = Player.getInventory();
    if (!inventory || !inventory.getType().includes("Loom")) {
        Chat.log("Open a loom first!");
        return;
    }

    const banner = inventory.getSlot(0);
    const dye = inventory.getSlot(1);
    const patternItem = inventory.getSlot(2);

    if (banner.isEmpty() || dye.isEmpty()) {
        Chat.log("Place a banner and dye in the loom first!");
        return;
    }

    const availablePatterns = inventory.listAvailablePatterns();

    // Pattern preferences based on dye color
    const preferences = {
        "minecraft:red_dye": ["minecraft:stripe_middle", "minecraft:stripe_bottom", "minecraft:stripe_top"],
        "minecraft:blue_dye": ["minecraft:stripe_left", "minecraft:stripe_right", "minecraft:border"],
        "minecraft:green_dye": ["minecraft:base", "minecraft:stripe_center", "minecraft:cross"],
        "minecraft:yellow_dye": ["minecraft:triangle_bottom", "minecraft:triangle_top", "minecraft:stripe_downright"],
        "minecraft:purple_dye": ["minecraft:circle", "minecraft:rhombus", "minecraft:stripe_downleft"],
        "minecraft:orange_dye": ["minecraft:stripe_upright", "minecraft:stripe_upleft", "minecraft:half_horizontal"],
        "minecraft:black_dye": ["minecraft:stripe_bottom", "minecraft:stripe_top", "minecraft:half_vertical"],
        "minecraft:white_dye": ["minecraft:base", "minecraft:border", "minecraft:cross"]
    };

    const dyeId = dye.getItemId();
    const preferredPatterns = preferences[dyeId] || ["minecraft:stripe_middle", "minecraft:stripe_bottom", "minecraft:stripe_top"];

    // Try preferred patterns first
    for (const pattern of preferredPatterns) {
        if (availablePatterns.includes(pattern)) {
            Chat.log(`Selecting preferred pattern: ${pattern}`);
            if (inventory.selectPatternId(pattern)) {
                Chat.log(`✓ Applied ${pattern} successfully`);
                return pattern;
            }
        }
    }

    // If no preferred patterns available, select the first available pattern
    if (availablePatterns.length > 0) {
        const fallbackPattern = availablePatterns[0];
        Chat.log(`Using fallback pattern: ${fallbackPattern}`);
        if (inventory.selectPatternId(fallbackPattern)) {
            Chat.log(`✓ Applied ${fallbackPattern} successfully`);
            return fallbackPattern;
        }
    }

    Chat.log("No patterns could be applied!");
    return null;
}

// Usage example
// selectBestPattern();
```

---

## Version Information

- Available since JSMacros 1.5.1
- Pattern listing available since 1.7.0
- Inherits all functionality from the base `Inventory` class
- Supports all vanilla banner patterns and pattern items

## Related Classes

- `Inventory<LoomScreen>` - Base class providing core inventory functionality
- `PlayerInventory` - Player inventory management
- `ItemStackHelper` - Item stack operations and information
- `LoomScreen` - Minecraft's loom screen handler

## Notes and Limitations

- LoomInventory instances are only valid while the loom screen is open
- Pattern availability depends on the banner, dye, and pattern item combination
- Some patterns require specific banner pattern items to be available
- Pattern IDs follow the Minecraft resource location format (e.g., "minecraft:stripe_bottom")
- Always check if `inventory` and `inventory.getType().includes("Loom")` return valid values before operations
- Pattern selection may fail if the current combination doesn't support the selected pattern
- The method `selectPatternName()` is deprecated and throws an exception - use `selectPatternId()` instead