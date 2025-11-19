# ItemDisplayEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.display.ItemDisplayEntityHelper`

**Extends:** `DisplayEntityHelper<DisplayEntity.ItemDisplayEntity>`

**Since:** `1.9.1`

The `ItemDisplayEntityHelper` class is a specialized wrapper for Minecraft item display entities (introduced in 1.19.4), providing access to item-specific properties and display settings. This class extends `DisplayEntityHelper` and adds methods for retrieving the displayed item stack and transformation mode that control how the item is presented in the world.

Item display entities are special entities used to display items in the world with advanced customization options for positioning, rotation, scaling, and visual effects. They are commonly used for item showcases, floating item displays, custom item frames, and decorative item presentations. This class is typically obtained through entity-related events, world queries, or when specifically filtering for item display entity types.

## Constructors

ItemDisplayEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`)
- World entity queries with item display entity filtering
- Methods that return entities and can be cast to item display entities
- Entity type checking with `entity.is("minecraft:item_display")`

## Methods

### Item Information

- [entity.getItem()](#entitygetitem)
- [entity.getTransform()](#entitygettransform)

### Inherited from DisplayEntityHelper

This class inherits all methods from `DisplayEntityHelper`, including:

**Position and Interpolation:**
- `getLerpTargetX()`, `getLerpTargetY()`, `getLerpTargetZ()`
- `getLerpTargetPitch()`, `getLerpTargetYaw()`
- `getLerpProgress()`

**Visual Properties:**
- `getBillboardMode()`, `getVisibilityBoundingBox()`
- `getViewRange()`, `getDisplayWidth()`, `getDisplayHeight()`

**Lighting and Shadows:**
- `getBrightness()`, `getSkyBrightness()`, `getBlockBrightness()`
- `getShadowRadius()`, `getShadowStrength()`

**Visual Effects:**
- `getGlowColorOverride()`

---

## Item Information

## Usage Examples

### Item Display Entity Detection and Analysis

```js
// Find all item display entities in range
function findItemDisplayEntities(range = 50) {
    const player = Player.getPlayer();
    if (!player) return [];

    const entities = World.getEntities();
    const itemDisplays = [];

    entities.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= range && entity.is("minecraft:item_display")) {
            itemDisplays.push(entity);
        }
    });

    return itemDisplays;
}

// Comprehensive item display analysis
function analyzeItemDisplay(entity) {
    const item = entity.getItem();
    const transform = entity.getTransform();
    const pos = entity.getPos();
    const billboardMode = entity.getBillboardMode();
    const glowColor = entity.getGlowColorOverride();

    let analysis = [];
    analysis.push(`=== Item Display: ${item.getName()} ===`);
    analysis.push(`Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);
    analysis.push(`Count: ${item.getCount()}`);
    analysis.push(`Transform: ${transform || "default"}`);
    analysis.push(`Billboard: ${billboardMode}`);

    if (glowColor !== 0) {
        analysis.push(`Glow: #${glowColor.toString(16).padStart(6, '0').toUpperCase()}`);
    }

    // Item-specific analysis
    if (item.isDamaged()) {
        const durabilityPercent = ((item.getMaxDamage() - item.getDamage()) / item.getMaxDamage()) * 100;
        analysis.push(`Durability: ${durabilityPercent.toFixed(1)}%`);
    }

    if (item.hasEnchantments()) {
        const enchCount = item.getEnchantments().size();
        analysis.push(`Enchantments: ${enchCount}`);
    }

    if (item.hasCustomName()) {
        analysis.push(`Custom Name: ${item.getCustomName().getString()}`);
    }

    return analysis;
}

// Display all item displays in range
const itemDisplays = findItemDisplayEntities();
Chat.log(`Found ${itemDisplays.length} item display entities:`);

itemDisplays.forEach((entity, index) => {
    const analysis = analyzeItemDisplay(entity);
    analysis.forEach(line => Chat.log(line));
    Chat.log("");
});
```

### Item Display Showcase System

```js
// Create a system to showcase items with different transforms
class ItemShowcase {
    constructor() {
        this.showcases = [];
    }

    // Analyze existing showcases
    scanShowcases() {
        const itemDisplays = World.getEntities().filter(entity => entity.is("minecraft:item_display"));

        this.showcases = itemDisplays.map(entity => {
            const item = entity.getItem();
            const transform = entity.getTransform();
            const pos = entity.getPos();

            return {
                entity: entity,
                item: item,
                transform: transform || "default",
                position: pos,
                itemName: item.getName(),
                description: this.generateDescription(entity)
            };
        });

        return this.showcases;
    }

    generateDescription(entity) {
        const item = entity.getItem();
        const transform = entity.getTransform();

        let desc = [];

        // Basic info
        desc.push(`${item.getName()} x${item.getCount()}`);

        // Transform description
        if (transform) {
            switch (transform) {
                case "head":
                    desc.push("Wearable display");
                    break;
                case "thirdperson_righthand":
                    desc.push("Held in right hand");
                    break;
                case "thirdperson_lefthand":
                    desc.push("Held in left hand");
                    break;
                case "gui":
                    desc.push("Flat GUI display");
                    break;
                case "ground":
                    desc.push("Ground-spawned appearance");
                    break;
                default:
                    desc.push(`Transform: ${transform}`);
            }
        }

        // Special properties
        if (item.hasEnchantments()) {
            const enchNames = item.getEnchantments().map(e => e.getName()).join(", ");
            desc.push(`Enchanted: ${enchNames}`);
        }

        if (item.hasCustomName()) {
            desc.push(`Named: ${item.getCustomName().getString()}`);
        }

        return desc.join(" • ");
    }

    // Find showcases by item type
    findShowcasesByItem(itemId) {
        return this.showcases.filter(showcase => showcase.item.getId() === itemId);
    }

    // Find showcases by transform type
    findShowcasesByTransform(transform) {
        return this.showcases.filter(showcase => showcase.transform === transform);
    }

    // Display showcase summary
    displaySummary() {
        if (this.showcases.length === 0) {
            Chat.log("No item display showcases found.");
            return;
        }

        Chat.log(`=== Item Showcase Summary ===`);
        Chat.log(`Total showcases: ${this.showcases.length}`);

        // Group by transform type
        const transformGroups = {};
        this.showcases.forEach(showcase => {
            const transform = showcase.transform;
            if (!transformGroups[transform]) {
                transformGroups[transform] = [];
            }
            transformGroups[transform].push(showcase);
        });

        Object.entries(transformGroups).forEach(([transform, showcases]) => {
            Chat.log(`\n${transform.toUpperCase()} (${showcases.length}):`);
            showcases.forEach(showcase => {
                const pos = showcase.position;
                Chat.log(`  • ${showcase.itemName} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
            });
        });

        Chat.log("=============================");
    }
}

// Usage example
const showcase = new ItemShowcase();
showcase.scanShowcases();
showcase.displaySummary();

// Find specific showcase types
const headDisplays = showcase.findShowcasesByTransform("head");
Chat.log(`Found ${headDisplays.length} head displays`);

const swordShowcases = showcase.findShowcasesByItem("minecraft:diamond_sword");
Chat.log(`Found ${swordShowcases.length} diamond sword showcases`);
```

### Item Display Comparison Tool

```js
// Compare different item display transformations
function compareItemTransforms() {
    const itemDisplays = World.getEntities().filter(entity => entity.is("minecraft:item_display"));

    if (itemDisplays.length < 2) {
        Chat.log("Need at least 2 item display entities to compare");
        return;
    }

    // Group by item type for fair comparison
    const itemGroups = {};
    itemDisplays.forEach(entity => {
        const itemId = entity.getItem().getId();
        if (!itemGroups[itemId]) {
            itemGroups[itemId] = [];
        }
        itemGroups[itemId].push(entity);
    });

    Chat.log("=== Item Display Transform Comparison ===");

    Object.entries(itemGroups).forEach(([itemId, entities]) => {
        if (entities.length > 1) {
            const itemName = entities[0].getItem().getName();
            Chat.log(`\n${itemName} variations:`);

            entities.forEach(entity => {
                const transform = entity.getTransform() || "default";
                const pos = entity.getPos();
                const billboard = entity.getBillboardMode();
                const glow = entity.getGlowColorOverride();

                let details = [`  ${transform}:`];
                details.push(`    Position: [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`);
                details.push(`    Billboard: ${billboard}`);

                if (glow !== 0) {
                    details.push(`    Glow: #${glow.toString(16).padStart(6, '0').toUpperCase()}`);
                }

                details.forEach(detail => Chat.log(detail));
            });
        }
    });

    Chat.log("========================================");
}

// Analyze item display effectiveness
function analyzeDisplayEffectiveness() {
    const itemDisplays = World.getEntities().filter(entity => entity.is("minecraft:item_display"));
    const player = Player.getPlayer();

    if (!player) return;

    Chat.log("=== Item Display Effectiveness Analysis ===");

    itemDisplays.forEach(entity => {
        const item = entity.getItem();
        const pos = entity.getPos();
        const distance = player.distanceTo(entity);
        const viewRange = entity.getViewRange();
        const transform = entity.getTransform();
        const glow = entity.getGlowColorOverride();

        let effectiveness = 0;
        let notes = [];

        // Distance factor
        if (distance <= viewRange) {
            effectiveness += 30;
            notes.push("Within view range");
        } else {
            notes.push("Outside view range");
        }

        // Transform appropriateness
        if (transform === "head" && item.getItem().isWearable()) {
            effectiveness += 20;
            notes.push("Appropriate head display");
        } else if (transform === "thirdperson_righthand" && item.getItem().isTool()) {
            effectiveness += 15;
            notes.push("Appropriate hand display");
        }

        // Glow effect
        if (glow !== 0) {
            effectiveness += 25;
            notes.push("Has glow effect");
        }

        // Billboard mode
        const billboard = entity.getBillboardMode();
        if (billboard === "center" || billboard === "fixed") {
            effectiveness += 15;
            notes.push("Good billboard mode");
        }

        // Rarity/value factor
        if (item.hasEnchantments()) {
            effectiveness += 10;
            notes.push("Enchanted item");
        }

        // Results
        const itemInfo = `${item.getName()} at [${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}, ${pos.z.toFixed(0)}]`;
        const effectivenessLevel = effectiveness >= 70 ? "Excellent" :
                                effectiveness >= 50 ? "Good" :
                                effectiveness >= 30 ? "Fair" : "Poor";

        Chat.log(`\n${itemInfo}`);
        Chat.log(`Effectiveness: ${effectivenessLevel} (${effectiveness}/100)`);
        Chat.log(`Notes: ${notes.join(", ")}`);
    });

    Chat.log("===========================================");
}

// Run analyses
compareItemTransforms();
analyzeDisplayEffectiveness();
```

### Item Display Monitoring System

```js
// Monitor item display entities for changes
class ItemDisplayMonitor {
    constructor() {
        this.lastSeen = new Map();
        this.changes = [];
    }

    // Take a snapshot of current item displays
    takeSnapshot() {
        const itemDisplays = World.getEntities().filter(entity => entity.is("minecraft:item_display"));
        const current = new Map();

        itemDisplays.forEach(entity => {
            const uuid = entity.getUUID();
            const item = entity.getItem();
            const transform = entity.getTransform();

            current.set(uuid, {
                entity: entity,
                itemName: item.getName(),
                itemCount: item.getCount(),
                transform: transform || "default",
                position: entity.getPos(),
                damaged: item.isDamaged(),
                enchanted: item.hasEnchantments(),
                named: item.hasCustomName()
            });
        });

        // Check for changes
        this.detectChanges(this.lastSeen, current);
        this.lastSeen = current;
    }

    detectChanges(previous, current) {
        // New displays
        for (const [uuid, data] of current) {
            if (!previous.has(uuid)) {
                this.changes.push({
                    type: "spawned",
                    uuid: uuid,
                    data: data
                });
            }
        }

        // Removed displays
        for (const [uuid, data] of previous) {
            if (!current.has(uuid)) {
                this.changes.push({
                    type: "removed",
                    uuid: uuid,
                    data: data
                });
            }
        }

        // Modified displays
        for (const [uuid, currentData] of current) {
            const previousData = previous.get(uuid);
            if (previousData) {
                const changes = [];

                if (previousData.itemName !== currentData.itemName) {
                    changes.push(`Item changed: ${previousData.itemName} → ${currentData.itemName}`);
                }

                if (previousData.itemCount !== currentData.itemCount) {
                    changes.push(`Count changed: ${previousData.itemCount} → ${currentData.itemCount}`);
                }

                if (previousData.transform !== currentData.transform) {
                    changes.push(`Transform changed: ${previousData.transform} → ${currentData.transform}`);
                }

                if (Math.abs(previousData.position.x - currentData.position.x) > 0.1 ||
                    Math.abs(previousData.position.y - currentData.position.y) > 0.1 ||
                    Math.abs(previousData.position.z - currentData.position.z) > 0.1) {
                    changes.push("Position moved");
                }

                if (previousData.damaged !== currentData.damaged) {
                    changes.push(`Damage status changed: ${currentData.damaged ? "Now damaged" : "Now undamaged"}`);
                }

                if (previousData.enchanted !== currentData.enchanted) {
                    changes.push(`Enchantment status changed: ${currentData.enchanted ? "Now enchanted" : "Enchantments removed"}`);
                }

                if (changes.length > 0) {
                    this.changes.push({
                        type: "modified",
                        uuid: uuid,
                        data: currentData,
                        changes: changes
                    });
                }
            }
        }
    }

    // Report recent changes
    reportChanges() {
        if (this.changes.length === 0) {
            Chat.log("No changes detected in item displays");
            return;
        }

        Chat.log(`=== Item Display Changes (${this.changes.length}) ===`);

        this.changes.forEach(change => {
            const data = change.data;

            switch (change.type) {
                case "spawned":
                    Chat.log(`+ Spawned: ${data.itemName} at [${data.position.x.toFixed(0)}, ${data.position.y.toFixed(0)}, ${data.position.z.toFixed(0)}]`);
                    break;

                case "removed":
                    Chat.log(`- Removed: ${data.itemName} (was at [${data.position.x.toFixed(0)}, ${data.position.y.toFixed(0)}, ${data.position.z.toFixed(0)}])`);
                    break;

                case "modified":
                    Chat.log(`~ Modified: ${data.itemName}`);
                    change.changes.forEach(changeDetail => {
                        Chat.log(`  • ${changeDetail}`);
                    });
                    break;
            }
        });

        Chat.log("=======================================");
        this.changes = []; // Clear changes after reporting
    }
}

// Set up monitoring
const monitor = new ItemDisplayMonitor();

// Initial snapshot
monitor.takeSnapshot();

// Monitor every 5 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 100 === 0) { // Every 5 seconds (100 ticks)
        monitor.takeSnapshot();
        monitor.reportChanges();
    }
}));
```

## Notes and Limitations

- ItemDisplayEntityHelper instances become invalid when the display entity is removed from the world. Always check `isAlive()` before accessing entity data.
- Item display entities were introduced in Minecraft 1.19.4, so this helper class is only available in game versions 1.19.4 and later.
- The `getTransform()` method may return `null` for entities that use the default transformation mode.
- Some item display properties (like precise scaling, rotation, and transformation matrices) are handled at a lower level and may not be directly accessible through this helper class.
- When accessing item display entities, always verify the entity type using `entity.is("minecraft:item_display")` before casting or accessing specialized methods.
- The item stack returned by `getItem()` provides full access to item properties including NBT data, enchantments, and custom names.
- Transform modes affect how the item is rendered but don't change the item's actual properties or behavior.

## Related Classes

- `DisplayEntityHelper` - Base class for all display entity helpers with common display methods
- `EntityHelper` - Base class for all entity helpers with common entity methods
- `BlockDisplayEntityHelper` - Specialized helper for block display entities
- `TextDisplayEntityHelper` - Specialized helper for text display entities
- `ItemStackHelper` - Item stack information and properties
- `TextHelper` - Text formatting and display utilities
- `Vec3D` - 3D position and vector mathematics

## Version Information

- Available since JSMacros 1.9.1
- Requires Minecraft 1.19.4 or later (item display entities introduced in this version)
- Extends DisplayEntityHelper with item-specific functionality
- All methods require an item display entity instance; use type checking before accessing specialized features