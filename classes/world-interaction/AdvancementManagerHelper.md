# AdvancementManagerHelper

## Overview

The `AdvancementManagerHelper` class is a World Interaction helper in JSMacros that provides access to Minecraft's advancement system. It allows you to query, analyze, and manage advancements for the current player, including their progress, completion status, and relationships between different advancements.

This class is particularly useful for creating scripts that:
- Track player advancement progress
- Create custom advancement-based triggers
- Analyze completed and missing advancements
- Build advancement statistics or dashboards

**Available since:** 1.8.4
**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers`

## Accessing the AdvancementManagerHelper

You can access the AdvancementManagerHelper through the world helper:

```javascript
// Get the advancement manager from the current world
const advancementManager = World.getAdvancementManager();
```

## Methods

### getAdvancementsForIdentifiers()

**Returns:** `Map<String, AdvancementHelper>`

Returns a map containing all advancement IDs mapped to their corresponding `AdvancementHelper` objects. The keys are the full advancement identifiers (e.g., "minecraft:story/root").

```javascript
const allAdvancements = advancementManager.getAdvancementsForIdentifiers();
for (const [id, advancement] of Object.entries(allAdvancements)) {
    console.log(`Advancement ID: ${id}, Name: ${advancement.getName()}`);
}
```

### getAdvancements()

**Returns:** `List<AdvancementHelper>`

Returns a list of all available advancements as `AdvancementHelper` objects.

```javascript
const advancements = advancementManager.getAdvancements();
console.log(`Total advancements: ${advancements.length}`);
```

### getStartedAdvancements()

**Returns:** `List<AdvancementHelper>`

Returns a list of started advancements - these are advancements where at least one task/criteria has been completed, but the advancement is not fully completed yet.

```javascript
const started = advancementManager.getStartedAdvancements();
console.log(`Started but not completed: ${started.length}`);
started.forEach(adv => {
    console.log(`In progress: ${adv.getName()}`);
});
```

### getMissingAdvancements()

**Returns:** `List<AdvancementHelper>`

Returns a list of advancements that the player has not started or completed at all.

```javascript
const missing = advancementManager.getMissingAdvancements();
console.log(`Missing advancements: ${missing.length}`);
```

### getCompletedAdvancements()

**Returns:** `List<AdvancementHelper>`

Returns a list of all fully completed advancements.

```javascript
const completed = advancementManager.getCompletedAdvancements();
console.log(`Completed advancements: ${completed.length}`);
```

### getRootAdvancements()

**Returns:** `List<AdvancementHelper>`

Returns a list of all root advancements. Root advancements are the starting points of advancement trees (like "minecraft:story/root", "minecraft:nether/root", etc.).

```javascript
const roots = advancementManager.getRootAdvancements();
roots.forEach(root => {
    console.log(`Root advancement: ${root.getName()}`);
});
```

### getSubAdvancements()

**Returns:** `List<AdvancementHelper>`

Returns a list of all advancements that are not root advancements - essentially all child advancements in the advancement trees.

```javascript
const subAdvancements = advancementManager.getSubAdvancements();
console.log(`Non-root advancements: ${subAdvancements.length}`);
```

### getAdvancement(identifier)

**Parameters:**
- `identifier` (String): The advancement identifier. Can omit the namespace if using "minecraft" (e.g., "story/root" instead of "minecraft:story/root")

**Returns:** `AdvancementHelper`

Returns a specific advancement by its identifier.

```javascript
// Using full identifier
const rootAdvancement = advancementManager.getAdvancement("minecraft:story/root");

// Using shortened identifier (minecraft namespace assumed)
const diamondsAdvancement = advancementManager.getAdvancement("story/shiny_gear");

if (diamondsAdvancement) {
    console.log(`Found advancement: ${diamondsAdvancement.getName()}`);
    console.log(`Description: ${diamondsAdvancement.getDescription()}`);
}
```

### getAdvancementsProgress()

**Returns:** `Map<AdvancementHelper, AdvancementProgressHelper>`

Returns a map containing all advancements mapped to their current progress information for the player.

```javascript
const progressMap = advancementManager.getAdvancementsProgress();
for (const [advancement, progress] of Object.entries(progressMap)) {
    console.log(`${advancement.getName()}: ${progress.getPercentage()}% complete`);

    if (progress.isDone()) {
        console.log(`  ✓ Fully completed`);
    } else if (progress.isAnyObtained()) {
        console.log(`  ⟳ In progress`);
    } else {
        console.log(`  ○ Not started`);
    }
}
```

### getAdvancementProgress(identifier)

**Parameters:**
- `identifier` (String): The advancement identifier. Can omit the namespace if using "minecraft"

**Returns:** `AdvancementProgressHelper`

Returns the progress information for a specific advancement.

```javascript
const progress = advancementManager.getAdvancementProgress("story/obtain_armor");
console.log(`Progress percentage: ${progress.getPercentage()}%`);
console.log(`Criteria completed: ${progress.getCompletedCriteria().length}/${progress.getTotalCriteria()}`);
console.log(`Is completed: ${progress.isDone()}`);

// Get individual criteria progress
const criteria = progress.getCriteria();
for (const [criterionName, completed] of Object.entries(criteria)) {
    console.log(`  ${criterionName}: ${completed ? "✓" : "○"}`);
}
```

## toString()

**Returns:** `String`

Returns a string representation showing the count of started, missing, and completed advancements.

```javascript
console.log(advancementManager.toString());
// Output: AdvancementManagerHelper:{"started": 5, "missing": 50, "completed": 25}
```

## Usage Examples

### Example 1: Advancement Statistics Dashboard

```javascript
function createAdvancementStats() {
    const manager = World.getAdvancementManager();
    const allAdvancements = manager.getAdvancements();
    const completed = manager.getCompletedAdvancements();
    const started = manager.getStartedAdvancements();
    const missing = manager.getMissingAdvancements();

    console.log("=== Advancement Statistics ===");
    console.log(`Total Advancements: ${allAdvancements.length}`);
    console.log(`Completed: ${completed.length} (${Math.round(completed.length / allAdvancements.length * 100)}%)`);
    console.log(`In Progress: ${started.length}`);
    console.log(`Not Started: ${missing.length}`);

    // Show completion by tree
    const roots = manager.getRootAdvancements();
    roots.forEach(root => {
        const treeAdvancements = root.getChildren();
        const completedInTree = treeAdvancements.filter(adv => {
            const progress = manager.getAdvancementProgress(adv.getId());
            return progress && progress.isDone();
        }).length;

        console.log(`${root.getName()}: ${completedInTree}/${treeAdvancements.length} completed`);
    });
}

// Run the stats
createAdvancementStats();
```

### Example 2: Check for Specific Achievement

```javascript
function checkForDiamondAchievement() {
    const manager = World.getAdvancementManager();
    const diamondsProgress = manager.getAdvancementProgress("story/shiny_gear");

    if (diamondsProgress.isDone()) {
        Chat.log("§aYou've obtained diamonds! Achievement unlocked!");
    } else if (diamondsProgress.isAnyObtained()) {
        Chat.log(`§eDiamond progress: ${diamondsProgress.getPercentage()}%`);
    } else {
        Chat.log("§7No diamonds obtained yet. Keep looking!");
    }
}
```

### Example 3: Find Missing Requirements

```javascript
function findMissingRequirements(advancementId) {
    const manager = World.getAdvancementManager();
    const advancement = manager.getAdvancement(advancementId);

    if (!advancement) {
        Chat.log(`§cAdvancement "${advancementId}" not found!`);
        return;
    }

    const requirements = advancement.getRequirements();
    const progress = manager.getAdvancementProgress(advancementId);

    Chat.log(`§6Requirements for ${advancement.getName()}:`);

    requirements.forEach((requirement, index) => {
        const isCompleted = progress.isCriterionCompleted(requirement);
        const symbol = isCompleted ? "§a✓" : "§c✗";
        Chat.log(`${symbol} ${requirement}`);
    });

    if (progress.isDone()) {
        Chat.log("§aAll requirements completed!");
    } else {
        Chat.log(`§7Progress: ${progress.getPercentage()}%`);
    }
}

// Example usage:
findMissingRequirements("nether/obtain_blaze_rod");
```

### Example 4: Adventure Log

```javascript
function generateAdventureLog() {
    const manager = World.getAdvancementManager();
    const recentCompleted = manager.getCompletedAdvancements().slice(-5); // Last 5 completed

    if (recentCompleted.length === 0) {
        Chat.log("§7No advancements completed yet. Start your adventure!");
        return;
    }

    Chat.log("§6=== Recent Achievements ===");
    recentCompleted.forEach((advancement, index) => {
        const progress = manager.getAdvancementProgress(advancement.getId());
        Chat.log(`§a${index + 1}. ${advancement.getName()}`);
        Chat.log(`§7   ${advancement.getDescription()}`);
    });
}

generateAdventureLog();
```

## Important Notes

1. **Player Presence:** Many methods require the player to be in a world. Some methods may throw exceptions if called when the player is not loaded.

2. **Client-Side Only:** This helper only tracks the client player's advancement progress. It cannot access other players' advancement information.

3. **Identifier Format:** Advancement identifiers can use either the full format (`"minecraft:story/root"`) or the shortened format (`"story/root"`). When omitting the namespace, `"minecraft"` is assumed.

4. **Performance Considerations:** Some methods like `getAdvancements()` and `getAdvancementsProgress()` may process large amounts of data and should be used judiciously in performance-critical scripts.

5. **Real-time Updates:** The advancement data reflects the current state when the method is called. For real-time monitoring, you may need to poll periodically or use advancement-related events.

## Related Classes

- `AdvancementHelper`: Represents individual advancements
- `AdvancementProgressHelper`: Tracks progress for specific advancements
- `World`: Main world interaction class (access point for this helper)

## Common Use Cases

- Creating custom achievement tracking systems
- Building progress displays or HUDs
- Implementing advancement-based triggers for scripts
- Generating statistics about player progress
- Checking for specific achievements before allowing certain actions
- Creating adventure logs or progress reports