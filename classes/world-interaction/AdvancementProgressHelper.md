# AdvancementProgressHelper

## Overview

The `AdvancementProgressHelper` class is a World Interaction helper class in JSMacros that provides access to Minecraft advancement progress information. This class allows you to track, query, and analyze the completion status of advancements and their specific criteria in your scripts.

Since JSMacros 1.8.4, this class has been available to help scripters monitor advancement progress, check completion status, and retrieve detailed information about advancement criteria.

## Class Hierarchy

- **Extends**: `BaseHelper<AdvancementProgress>`
- **Package**: `xyz.wagyourtail.jsmacros.client.api.helpers`

## Accessing AdvancementProgressHelper

You typically obtain an `AdvancementProgressHelper` instance through:

1. **From an AdvancementHelper**:
   ```javascript
   const advancement = World.getAdvancement("minecraft:adventure/adventuring_time");
   const progress = advancement.getProgress();
   ```

2. **From AdvancementManagerHelper**:
   ```javascript
   const advancementManager = World.getAdvancementManager();
   const progress = advancementManager.getAdvancementProgress("minecraft:adventure/adventuring_time");
   ```

3. **From all advancements progress**:
   ```javascript
   const advancementManager = World.getAdvancementManager();
   const allProgress = advancementManager.getAdvancementsProgress();
   // Returns Map<AdvancementHelper, AdvancementProgressHelper>
   ```

## Methods

### Completion Status Methods

#### `isDone()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the advancement is completely finished (all requirements met), `false` otherwise.
- **Example**:
  ```javascript
  if (progress.isDone()) {
      Chat.log("Advancement completed!");
  }
  ```

#### `isAnyObtained()`
- **Returns**: `boolean`
- **Description**: Returns `true` if any criteria has already been met, `false` if no criteria have been completed.
- **Example**:
  ```javascript
  if (progress.isAnyObtained()) {
      Chat.log("Progress made on advancement!");
  }
  ```

### Progress Information Methods

#### `getPercentage()`
- **Returns**: `number` (float)
- **Description**: Returns the percentage of finished requirements as a value between 0.0 and 1.0.
- **Example**:
  ```javascript
  const percent = Math.round(progress.getPercentage() * 100);
  Chat.log(`Advancement is ${percent}% complete`);
  ```

#### `getFraction()`
- **Returns**: `TextHelper`
- **Description**: Returns a TextHelper containing the fraction of finished requirements to total requirements (e.g., "3/5").
- **Example**:
  ```javascript
  const fraction = progress.getFraction();
  Chat.log(`Progress: ${fraction.getString()}`);
  ```

#### `countObtainedRequirements()`
- **Returns**: `number` (int)
- **Description**: Returns the number of requirements criteria that have been obtained.
- **Example**:
  ```javascript
  const completed = progress.countObtainedRequirements();
  Chat.log(`Completed ${completed} requirements`);
  ```

### Criteria Information Methods

#### `getCriteria()`
- **Returns**: `Map<string, number>`
- **Description**: Returns a map containing all criteria names and their completion timestamps (in milliseconds since epoch). Only includes criteria that have been completed.
- **Example**:
  ```javascript
  const criteria = progress.getCriteria();
  for (const [name, timestamp] of criteria) {
      const date = new Date(timestamp);
      Chat.log(`Criteria "${name}" completed on ${date.toLocaleDateString()}`);
  }
  ```

#### `getObtainedCriteria()`
- **Returns**: `string[]`
- **Description**: Returns an array of criteria IDs that have been completed.
- **Example**:
  ```javascript
  const completed = progress.getObtainedCriteria();
  Chat.log(`Completed criteria: ${completed.join(", ")}`);
  ```

#### `getUnobtainedCriteria()`
- **Returns**: `string[]`
- **Description**: Returns an array of criteria IDs that have not yet been completed.
- **Example**:
  ```javascript
  const remaining = progress.getUnobtainedCriteria();
  Chat.log(`Still need: ${remaining.join(", ")}`);
  ```

#### `getRequirements()`
- **Returns**: `Array<Array<string>>`
- **Description**: Returns all requirements of this advancement. The structure is a 2D array where each inner array represents a set of criteria where only one needs to be completed (OR logic).
- **Example**:
  ```javascript
  const requirements = progress.getRequirements();
  for (let i = 0; i < requirements.length; i++) {
      Chat.log(`Requirement group ${i + 1}: ${requirements[i].join(" OR ")}`);
  }
  ```

### Specific Criteria Methods

#### `getCriterionProgress(criteria)`
- **Parameters**:
  - `criteria` (string): The criteria name to check
- **Returns**: `number` (long)
- **Description**: Returns the completion timestamp of the given criteria in milliseconds since epoch, or `-1` if the criteria is not met yet.
- **Example**:
  ```javascript
  const timestamp = progress.getCriterionProgress("minecraft:adventure/adventuring_time");
  if (timestamp !== -1) {
      const date = new Date(timestamp);
      Chat.log(`Adventure time criteria completed on ${date.toLocaleDateString()}`);
  }
  ```

#### `isCriteriaObtained(criteria)`
- **Parameters**:
  - `criteria` (string): The criteria name to check
- **Returns**: `boolean`
- **Description**: Returns `true` if the given criteria is met, `false` otherwise.
- **Example**:
  ```javascript
  if (progress.isCriteriaObtained("minecraft:adventure/adventuring_time")) {
      Chat.log("Adventure time criteria completed!");
  }
  ```

### Date Information Methods

#### `getEarliestProgressObtainDate()`
- **Returns**: `number` (long)
- **Description**: Returns the earliest completion date (timestamp in milliseconds since epoch) of all criteria.
- **Example**:
  ```javascript
  const earliestDate = new Date(progress.getEarliestProgressObtainDate());
  Chat.log(`First criteria completed on ${earliestDate.toLocaleDateString()}`);
  ```

## Usage Examples

### Basic Progress Checking
```javascript
// Get advancement progress
const advancement = World.getAdvancement("minecraft:story/enter_the_nether");
const progress = advancement.getProgress();

// Check if completed
if (progress.isDone()) {
    Chat.log("Nether advancement completed!");
} else {
    const percent = Math.round(progress.getPercentage() * 100);
    const fraction = progress.getFraction().getString();
    Chat.log(`Nether advancement: ${fraction} (${percent}%)`);

    const remaining = progress.getUnobtainedCriteria();
    if (remaining.length > 0) {
        Chat.log(`Still need to complete: ${remaining.join(", ")}`);
    }
}
```

### Detailed Progress Analysis
```javascript
function analyzeAdvancementProgress(advancementId) {
    try {
        const advancement = World.getAdvancement(advancementId);
        const progress = advancement.getProgress();

        Chat.log(`=== ${advancement.getDisplay().getTitle().getString()} ===`);
        Chat.log(`Description: ${advancement.getDisplay().getDescription().getString()}`);
        Chat.log(`Completed: ${progress.isDone()}`);
        Chat.log(`Progress: ${progress.getFraction().getString()} (${Math.round(progress.getPercentage() * 100)}%)`);

        if (progress.isAnyObtained()) {
            const obtained = progress.getObtainedCriteria();
            Chat.log(`Completed criteria (${obtained.length}):`);

            const criteria = progress.getCriteria();
            for (const [name, timestamp] of criteria) {
                const date = new Date(timestamp);
                Chat.log(`  - ${name}: ${date.toLocaleString()}`);
            }
        }

        const unobtained = progress.getUnobtainedCriteria();
        if (unobtained.length > 0) {
            Chat.log(`Remaining criteria (${unobtained.length}): ${unobtained.join(", ")}`);
        }

    } catch (error) {
        Chat.log(`Error analyzing advancement: ${error.message}`);
    }
}

// Example usage
analyzeAdvancementProgress("minecraft:adventure/sleep_in_bed");
```

### Progress Tracking Script
```javascript
// Script to track all advancements progress
const advancementManager = World.getAdvancementManager();
const allProgress = advancementManager.getAdvancementsProgress();

let totalAdvancements = 0;
let completedAdvancements = 0;
let totalCriteria = 0;
let completedCriteria = 0;

for (const [advancement, progress] of allProgress) {
    totalAdvancements++;
    totalCriteria += progress.countObtainedRequirements() + progress.getUnobtainedCriteria().length;
    completedCriteria += progress.countObtainedRequirements();

    if (progress.isDone()) {
        completedAdvancements++;
    }
}

const overallPercent = totalCriteria > 0 ? Math.round((completedCriteria / totalCriteria) * 100) : 0;
const advancementPercent = totalAdvancements > 0 ? Math.round((completedAdvancements / totalAdvancements) * 100) : 0;

Chat.log(`=== Advancement Statistics ===`);
Chat.log(`Advancements: ${completedAdvancements}/${totalAdvancements} (${advancementPercent}%)`);
Chat.log(`Criteria: ${completedCriteria}/${totalCriteria} (${overallPercent}%)`);
```

## Important Notes

### Performance Considerations
- Methods that return arrays or maps (`getCriteria()`, `getObtainedCriteria()`, `getUnobtainedCriteria()`) create new collections on each call. Cache the results if you need to use them multiple times.

### Thread Safety
- This helper should only be accessed from the main client thread or within JSMacros event handlers. Direct access from other threads may cause issues.

### Error Handling
- Always check if advancement exists before trying to get its progress.
- Some methods may return `-1` or empty collections when criteria are not completed rather than throwing exceptions.

### Version Compatibility
- This class requires JSMacros version 1.8.4 or later.
- Some advancement features may not be available in older Minecraft versions.

## Related Classes

- **AdvancementHelper**: Provides information about advancement definitions and metadata
- **AdvancementManagerHelper**: Manages all advancements and their progress
- **TextHelper**: Used for text formatting (returned by `getFraction()`)
- **BaseHelper**: Base class providing common helper functionality