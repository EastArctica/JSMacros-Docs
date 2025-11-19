# AdvancementHelper

## Overview

The `AdvancementHelper` class is a World Interaction helper in JsMacros that provides access to Minecraft advancement information. It allows scripts to inspect advancement details, check progress, retrieve rewards, and navigate advancement trees.

This class wraps around Minecraft's `PlacedAdvancement` and provides a scripting-friendly interface for interacting with the advancement system.

**Since:** JsMacros 1.8.4
**Package:** `xyz.wagyourtail.jsmacros.client.api.helpers`

## Accessing AdvancementHelper

AdvancementHelper instances are typically obtained through:

1. **From Advancement Events** - Many advancement-related events provide AdvancementHelper objects
2. **From Client Methods** - Using methods that return advancement information
3. **Through Navigation** - Using `getParent()` and `getChildren()` methods to traverse advancement trees

```javascript
// Example from an event handler
event.on("AdvancementGrant", (event) => {
    const advancement = event.advancement;
    console.log(`Completed advancement: ${advancement.getId()}`);
});

// Example through traversal
const advancement = someAdvancementHelper.getParent();
const children = advancement.getChildren();
```

## Methods

### getParent()

Returns the parent advancement in the advancement tree.

**Returns:** `AdvancementHelper | null` - The parent advancement, or `null` if this is a root advancement

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const parent = advancement.getParent();

if (parent) {
    console.log(`Parent: ${parent.getId()}`);
} else {
    console.log("This is a root advancement");
}
```

### getChildren()

Returns all child advancements that have this advancement as their parent.

**Returns:** `List<AdvancementHelper>` - A list of all direct child advancements

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const children = advancement.getChildren();

console.log(`Found ${children.length} child advancements:`);
children.forEach(child => {
    console.log(`- ${child.getId()}`);
});
```

### getRequirements()

Returns the requirements structure for this advancement. Requirements are organized as groups where at least one criterion from each group must be met.

**Returns:** `List<List<String>>` - A list of requirement groups, each containing criterion names

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const requirements = advancement.getRequirements();

console.log(`Requirement groups: ${requirements.length}`);
requirements.forEach((group, index) => {
    console.log(`Group ${index + 1}: ${group.join(", ")}`);
});
```

### getRequirementCount()

Returns the total number of requirement groups for this advancement.

**Returns:** `int` - The number of requirement groups

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const count = advancement.getRequirementCount();
console.log(`Advancement has ${count} requirement groups`);
```

### getId()

Returns the unique identifier for this advancement.

**Returns:** `String` - The advancement ID (e.g., "minecraft:story/root")

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const id = advancement.getId();
console.log(`Advancement ID: ${id}`);

// Example: Check for specific advancements
if (id === "minecraft:story/mine_diamond") {
    console.log("Player mined their first diamond!");
}
```

### getExperience()

Returns the amount of experience points awarded by completing this advancement.

**Returns:** `int` - Experience points awarded (0 if no experience reward)

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const experience = advancement.getExperience();

if (experience > 0) {
    console.log(`This advancement awards ${experience} XP`);
} else {
    console.log("This advancement doesn't award XP");
}
```

### getLoot()

Returns the loot table identifiers for this advancement's rewards.

**Returns:** `String[]` - Array of loot table IDs (empty if no loot rewards)

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const loot = advancement.getLoot();

if (loot.length > 0) {
    console.log("Loot rewards:");
    loot.forEach(lootTable => {
        console.log(`- ${lootTable}`);
    });
}
```

### getRecipes()

Returns the recipe identifiers that are unlocked by completing this advancement.

**Returns:** `String[]` - Array of recipe IDs (empty if no recipe rewards)

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const recipes = advancement.getRecipes();

if (recipes.length > 0) {
    console.log(`Unlocks ${recipes.length} recipes:`);
    recipes.forEach(recipe => {
        console.log(`- ${recipe}`);
    });
}
```

### getProgress()

Returns the current progress of this advancement for the local player.

**Returns:** `AdvancementProgressHelper` - Object containing progress information

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
const progress = advancement.getProgress();

console.log(`Progress: ${(progress.getPercentage() * 100).toFixed(1)}%`);
console.log(`Completed: ${progress.isDone()}`);
console.log(`Requirements met: ${progress.countObtainedRequirements()}`);

// Get obtained criteria
const obtained = progress.getObtainedCriteria();
if (obtained.length > 0) {
    console.log("Obtained criteria:", obtained.join(", "));
}
```

### toJson()

Returns a JSON string representation of this advancement's data.

**Returns:** `String` - JSON representation of the advancement

**Since:** 1.9.0

```javascript
const advancement = event.advancement;
const jsonData = advancement.toJson();
console.log("Advancement JSON:", jsonData);

// You can parse this for detailed inspection
const advancementData = JSON.parse(jsonData);
console.log("Display name:", advancementData.display?.title);
```

### toString()

Returns a string representation of this advancement helper.

**Returns:** `String` - String in format "AdvancementHelper:{\"id\": \"<advancement_id>\"}"

**Since:** 1.8.4

```javascript
const advancement = event.advancement;
console.log(advancement.toString()); // e.g., "AdvancementHelper:{\"id\": \"minecraft:story/root\"}"
```

## Related Classes

### AdvancementProgressHelper

The `getProgress()` method returns an `AdvancementProgressHelper` object that provides detailed information about advancement completion:

```javascript
const progress = advancement.getProgress();

// Check if advancement is completed
if (progress.isDone()) {
    console.log("Advancement fully completed!");
}

// Get completion percentage
console.log(`Progress: ${(progress.getPercentage() * 100).toFixed(1)}%`);

// Get progress fraction as text
const fraction = progress.getFraction();
console.log(`Progress: ${fraction.getString()}`);

// Get criteria details
const criteria = progress.getCriteria(); // Map of criteria -> completion timestamp
const unobtained = progress.getUnobtainedCriteria(); // Array of incomplete criteria
const obtained = progress.getObtainedCriteria(); // Array of completed criteria

// Check specific criteria
if (progress.isCriteriaObtained("minecraft:husbandry/bred_all_animals")) {
    console.log("All animals bred!");
}

// Get completion time for specific criteria
const completionTime = progress.getCriterionProgress("minecraft:story/mine_diamond");
if (completionTime > 0) {
    console.log(`First diamond mined at: ${new Date(completionTime).toLocaleString()}`);
}
```

## Usage Examples

### Example 1: Advancement Tree Traversal

```javascript
// Traverse an advancement tree starting from a root advancement
function traverseAdvancementTree(advancement, depth = 0) {
    const indent = "  ".repeat(depth);
    console.log(`${indent}- ${advancement.getId()}`);

    const progress = advancement.getProgress();
    console.log(`${indent}  Progress: ${(progress.getPercentage() * 100).toFixed(1)}%`);

    const children = advancement.getChildren();
    children.forEach(child => traverseAdvancementTree(child, depth + 1));
}

// Start from root advancement
const rootAdvancement = event.advancement;
while (rootAdvancement.getParent()) {
    rootAdvancement = rootAdvancement.getParent();
}
traverseAdvancementTree(rootAdvancement);
```

### Example 2: Check Specific Advancement Completion

```javascript
// Check if player has completed all story advancements
function checkStoryAdvancements(advancement) {
    const progress = advancement.getProgress();

    if (advancement.getId().startsWith("minecraft:story/")) {
        console.log(`${advancement.getId()}: ${progress.isDone() ? "✓" : "✗"}`);
    }

    advancement.getChildren().forEach(child => checkStoryAdvancements(child));
}

// Usage with a story advancement
const storyAdvancement = event.advancement;
checkStoryAdvancements(storyAdvancement);
```

### Example 3: Advancement Rewards Analysis

```javascript
function analyzeRewards(advancement) {
    console.log(`Analyzing rewards for: ${advancement.getId()}`);

    const exp = advancement.getExperience();
    const loot = advancement.getLoot();
    const recipes = advancement.getRecipes();

    if (exp > 0) console.log(`- Experience: ${exp} XP`);
    if (loot.length > 0) console.log(`- Loot tables: ${loot.join(", ")}`);
    if (recipes.length > 0) console.log(`- Recipes: ${recipes.join(", ")}`);

    if (exp === 0 && loot.length === 0 && recipes.length === 0) {
        console.log("- No rewards");
    }
}

// Usage
analyzeRewards(event.advancement);
```

### Example 4: Advancement Progress Monitor

```javascript
// Monitor advancement progress over time
const progressCache = new Map();

function monitorProgress(advancement) {
    const id = advancement.getId();
    const progress = advancement.getProgress();
    const percentage = progress.getPercentage();

    if (progressCache.has(id)) {
        const oldPercentage = progressCache.get(id);
        if (percentage > oldPercentage) {
            console.log(`Progress updated for ${id}: ${(percentage * 100).toFixed(1)}%`);
        }
    }

    progressCache.set(id, percentage);
}

// Call this periodically or in response to events
monitorProgress(event.advancement);
```

## Important Notes

1. **Player-Specific Progress:** The `getProgress()` method returns progress information specific to the local player only.

2. **Null Safety:** `getParent()` can return `null` for root advancements. Always check for null before accessing methods on the returned value.

3. **Requirement Structure:** Advancement requirements can be complex with multiple criteria groups. Use `getRequirements()` to understand the structure.

4. **Thread Safety:** All methods are safe to call from JsMacros event handlers and scripts.

5. **Performance:** Traversing large advancement trees can be expensive. Consider caching results if needed frequently.

6. **Data Availability:** Some advancement information may not be available until the advancement data is fully loaded from the server.

## Error Handling

```javascript
// Safe advancement interaction
function safeAdvancementCheck(advancement) {
    try {
        if (!advancement) {
            console.log("No advancement provided");
            return;
        }

        const id = advancement.getId();
        const progress = advancement.getProgress();

        console.log(`Advancement: ${id}`);
        console.log(`Completed: ${progress.isDone()}`);
        console.log(`Progress: ${(progress.getPercentage() * 100).toFixed(1)}%`);

    } catch (error) {
        console.error("Error checking advancement:", error.message);
    }
}
```