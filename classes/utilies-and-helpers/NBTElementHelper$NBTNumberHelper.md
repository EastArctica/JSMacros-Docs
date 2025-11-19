# NBTElementHelper$NBTNumberHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper$NBTNumberHelper`

**Extends:** `NBTElementHelper<AbstractNbtNumber>`

**Since:** JsMacros 1.5.1

The `NBTNumberHelper` class is a specialized helper for handling NBT numeric tags in JSMacros. It provides type-safe access to numeric NBT data with support for all Minecraft numeric types including bytes, shorts, integers, longs, floats, and doubles. This helper handles automatic conversion between different numeric types while preserving the underlying data precision.

NBT numeric tags are used throughout Minecraft for storing quantitative data such as health, damage levels, experience points, coordinates, durability, enchantment levels, and various game mechanics. This helper class makes it easy to work with these numeric values in your scripts with proper type conversion and precision handling.

## Overview

The `NBTNumberHelper` class provides:

- Type conversion between all numeric NBT types (byte, short, int, long, float, double)
- Preserved precision for floating-point operations
- Safe integer conversion with proper range handling
- Generic Number access for compatibility with JavaScript operations
- Support for both signed integer and floating-point NBT types

## Accessing NBTNumberHelper

NBTNumberHelper instances are typically obtained by:

1. Converting from an existing NBTElementHelper using `asNumberHelper()`
2. Accessing numeric data from compound NBT structures
3. Working with numeric elements from NBT lists
4. Processing game data that uses numeric NBT values

```js
// Get NBT from an item and access numeric data
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("Damage")) {
        const damage = compound.get("Damage");
        if (damage && damage.isNumber()) {
            const damageValue = damage.asNumberHelper().asInt();
            Chat.log(`Item damage: ${damageValue}`);
        }
    }
}
```

## Constructors

**Note:** NBTNumberHelper instances are typically created through factory methods rather than direct construction.

### Static Factory Methods

NBTNumberHelper instances are created through the main `NBTElementHelper.resolve()` method based on the NBT element type.

**Example:**
```js
// Usually created through existing helpers
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("Damage")) {
        const damage = compound.get("Damage");
        if (damage && damage.isNumber()) {
            const damageHelper = damage.asNumberHelper();
            // Work with numeric data
        }
    }
}
```

## Fields

NBTNumberHelper doesn't expose any public fields. All data access is done through methods.

## Methods

### `asLong()`

Returns the numeric value as a 64-bit signed integer.

**Returns:** `long` - The value converted to a long

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    // Get creation time (if present)
    if (compound.has("CreationTime")) {
        const creationTime = compound.get("CreationTime");
        if (creationTime && creationTime.isNumber()) {
            const timeMs = creationTime.asNumberHelper().asLong();
            Chat.log(`Item created: ${new Date(timeMs).toLocaleString()}`);
        }
    }
}
```

### `asInt()`

Returns the numeric value as a 32-bit signed integer.

**Returns:** `int` - The value converted to an integer

**Since:** `1.5.1`

**Example:**
```js
function analyzeDurability(item) {
    const nbt = item.getNBT();
    if (!nbt || !nbt.isCompound()) return;

    const compound = nbt.asCompoundHelper();

    if (compound.has("Damage")) {
        const damage = compound.get("Damage");
        if (damage && damage.isNumber()) {
            const damageValue = damage.asNumberHelper().asInt();
            const maxDamage = item.getMaxDamage();

            if (maxDamage > 0) {
                const durabilityPercent = ((maxDamage - damageValue) / maxDamage) * 100;
                Chat.log(`Durability: ${Math.round(durabilityPercent)}%`);
                Chat.log(`Damage: ${damageValue}/${maxDamage}`);
            }
        }
    }
}

// Usage
const mainHand = Player.getPlayer().getMainHand();
analyzeDurability(mainHand);
```

### `asShort()`

Returns the numeric value as a 16-bit signed integer.

**Returns:** `short` - The value converted to a short

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    // Get fuel value (often stored as short)
    if (compound.has("Fuel")) {
        const fuel = compound.get("Fuel");
        if (fuel && fuel.isNumber()) {
            const fuelValue = fuel.asNumberHelper().asShort();
            Chat.log(`Fuel value: ${fuelValue}`);
        }
    }
}
```

### `asByte()`

Returns the numeric value as an 8-bit signed integer.

**Returns:** `byte` - The value converted to a byte

**Since:** `1.5.1`

**Example:**
```js
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    // Get item count (often stored as byte)
    if (compound.has("Count")) {
        const count = compound.get("Count");
        if (count && count.isNumber()) {
            const countValue = count.asNumberHelper().asByte();
            Chat.log(`Item count: ${countValue}`);
        }
    }

    // Get color data (often stored as byte array)
    if (compound.has("color")) {
        const color = compound.get("color");
        if (color && color.isNumber()) {
            const colorValue = color.asNumberHelper().asByte();
            Chat.log(`Color value: ${colorValue}`);
        }
    }
}
```

### `asFloat()`

Returns the numeric value as a 32-bit floating-point number.

**Returns:** `float` - The value converted to a float

**Since:** `1.5.1`

**Example:**
```js
function analyzeEntityStats(compound) {
    // Health values are often stored as floats
    if (compound.has("Health")) {
        const health = compound.get("Health");
        if (health && health.isNumber()) {
            const healthValue = health.asNumberHelper().asFloat();
            Chat.log(`Health: ${healthValue.toFixed(1)}`);
        }
    }

    // Movement speed (if present)
    if (compound.has("MovementSpeed")) {
        const speed = compound.get("MovementSpeed");
        if (speed && speed.isNumber()) {
            const speedValue = speed.asNumberHelper().asFloat();
            Chat.log(`Movement speed: ${speedValue}`);
        }
    }

    // Fall distance
    if (compound.has("FallDistance")) {
        const fallDist = compound.get("FallDistance");
        if (fallDist && fallDist.isNumber()) {
            const fallValue = fallDist.asNumberHelper().asFloat();
            Chat.log(`Fall distance: ${fallValue.toFixed(2)} blocks`);
        }
    }
}

// Usage with entity NBT (hypothetical example)
// const entityNBT = entity.getNBT();
// if (entityNBT && entityNBT.isCompound()) {
//     analyzeEntityStats(entityNBT.asCompoundHelper());
// }
```

### `asDouble()`

Returns the numeric value as a 64-bit floating-point number.

**Returns:** `double` - The value converted to a double

**Since:** `1.5.1`

**Example:**
```js
function analyzePosition(positionList) {
    if (!positionList || !positionList.isList()) return;

    const pos = positionList.asListHelper();
    if (pos.length() !== 3) return;

    const xElement = pos.get(0);
    const yElement = pos.get(1);
    const zElement = pos.get(2);

    if (!xElement || !yElement || !zElement) return;
    if (!xElement.isNumber() || !yElement.isNumber() || !zElement.isNumber()) return;

    const x = xElement.asNumberHelper().asDouble();
    const y = yElement.asNumberHelper().asDouble();
    const z = zElement.asNumberHelper().asDouble();

    Chat.log(`Position: (${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`);
    Chat.log(`Distance from origin: ${Math.sqrt(x*x + y*y + z*z).toFixed(2)} blocks`);
}

function analyzeMotion(motionList) {
    if (!motionList || !motionList.isList()) return;

    const motion = motionList.asListHelper();
    if (motion.length() !== 3) return;

    const xElement = motion.get(0);
    const yElement = motion.get(1);
    const zElement = motion.get(2);

    if (!xElement || !yElement || !zElement) return;
    if (!xElement.isNumber() || !yElement.isNumber() || !zElement.isNumber()) return;

    const vx = xElement.asNumberHelper().asDouble();
    const vy = yElement.asNumberHelper().asDouble();
    const vz = zElement.asNumberHelper().asDouble();

    const speed = Math.sqrt(vx*vx + vy*vy + vz*vz);
    Chat.log(`Velocity: (${vx.toFixed(3)}, ${vy.toFixed(3)}, ${vz.toFixed(3)})`);
    Chat.log(`Speed: ${speed.toFixed(3)} blocks/tick`);
}

// Usage with entity NBT (hypothetical example)
// const entityNBT = entity.getNBT();
// if (entityNBT && entityNBT.isCompound()) {
//     const compound = entityNBT.asCompoundHelper();
//
//     if (compound.has("Pos")) {
//         analyzePosition(compound.get("Pos"));
//     }
//
//     if (compound.has("Motion")) {
//         analyzeMotion(compound.get("Motion"));
//     }
// }
```

### `asNumber()`

Returns the numeric value as a generic JavaScript Number object.

**Returns:** `Number` - The value as a Number

**Since:** `1.5.1`

**Example:**
```js
function performMathOperation(compound, key, operation) {
    if (!compound.has(key)) {
        Chat.log(`${key} not found`);
        return;
    }

    const element = compound.get(key);
    if (!element || !element.isNumber()) {
        Chat.log(`${key} is not a number`);
        return;
    }

    const value = element.asNumberHelper().asNumber();
    let result;

    switch (operation) {
        case "square":
            result = value * value;
            Chat.log(`${key} squared: ${result}`);
            break;

        case "double":
            result = value * 2;
            Chat.log(`${key} doubled: ${result}`);
            break;

        case "squareRoot":
            result = Math.sqrt(value);
            Chat.log(`Square root of ${key}: ${result}`);
            break;

        case "percentage":
            result = (value / 100).toFixed(2);
            Chat.log(`${key} as percentage: ${result}%`);
            break;

        default:
            Chat.log(`Unknown operation: ${operation}`);
    }
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("RepairCost")) {
        performMathOperation(compound, "RepairCost", "double");
    }
}
```

## NBT Number Types

NBTNumberHelper can represent several types of numeric NBT data:

| NBT Type ID | Name | Range | JavaScript Equivalent | Common Uses |
| ----------- | ---- | ----- | -------------------- | ----------- |
| 1 | BYTE | -128 to 127 | Number (8-bit) | Boolean flags, small counts, colors |
| 2 | SHORT | -32,768 to 32,767 | Number (16-bit) | Item counts, IDs, fuel values |
| 3 | INT | -2,147,483,648 to 2,147,483,647 | Number (32-bit) | Experience, damage, coordinates |
| 4 | LONG | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 | BigInt (64-bit) | Time values, UUIDs, large counters |
| 5 | FLOAT | ~3.4E±38 (7 digits) | Number (32-bit) | Health, movement, partial values |
| 6 | DOUBLE | ~1.7E±308 (16 digits) | Number (64-bit) | Precise coordinates, physics |

## Usage Examples

### Comprehensive Number Analysis
```js
function analyzeNumber(numberHelper, key, indent = 0) {
    const spaces = "  ".repeat(indent);

    Chat.log(`${spaces}${key}: Number Analysis`);
    Chat.log(`${spaces}  as Byte: ${numberHelper.asByte()}`);
    Chat.log(`${spaces}  as Short: ${numberHelper.asShort()}`);
    Chat.log(`${spaces}  as Int: ${numberHelper.asInt()}`);
    Chat.log(`${spaces}  as Long: ${numberHelper.asLong()}`);
    Chat.log(`${spaces}  as Float: ${numberHelper.asFloat()}`);
    Chat.log(`${spaces}  as Double: ${numberHelper.asDouble()}`);
    Chat.log(`${spaces}  as Number: ${numberHelper.asNumber()}`);

    // Check for potential overflow
    const byteVal = numberHelper.asByte();
    const shortVal = numberHelper.asShort();
    const intVal = numberHelper.asInt();
    const longVal = numberHelper.asLong();

    if (byteVal !== numberHelper.asNumber()) {
        Chat.log(`${spaces}  ⚠ Byte conversion overflow`);
    }

    if (shortVal !== numberHelper.asNumber()) {
        Chat.log(`${spaces}  ⚠ Short conversion overflow`);
    }

    if (intVal !== numberHelper.asNumber()) {
        Chat.log(`${spaces}  ⚠ Int conversion overflow`);
    }

    // Check for precision loss in floating point
    const doubleVal = numberHelper.asDouble();
    const floatVal = numberHelper.asFloat();

    if (Math.abs(doubleVal - floatVal) > 0.000001) {
        Chat.log(`${spaces}  ⚠ Float precision loss: ${Math.abs(doubleVal - floatVal)}`);
    }
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();
    Chat.log("=== NBT Number Analysis ===");

    for (const key of compound.getKeys()) {
        const element = compound.get(key);
        if (!element || !element.isNumber()) continue;

        analyzeNumber(element.asNumberHelper(), key);
    }
}
```

### Enchantment Level Processing
```js
function processEnchantmentLevels(enchantList) {
    const enchantments = [];

    for (let i = 0; i < enchantList.length(); i++) {
        const enchantNBT = enchantList.get(i);
        if (!enchantNBT || !enchantNBT.isCompound()) continue;

        const enchant = enchantNBT.asCompoundHelper();
        let enchantData = { id: "unknown", level: 0, cost: 0 };

        // Get enchantment ID
        if (enchant.has("id")) {
            const idElement = enchant.get("id");
            if (idElement) {
                enchantData.id = idElement.asString();
            }
        }

        // Get enchantment level
        if (enchant.has("lvl")) {
            const lvlElement = enchant.get("lvl");
            if (lvlElement && lvlElement.isNumber()) {
                const levelHelper = lvlElement.asNumberHelper();
                enchantData.level = levelHelper.asInt();

                // Calculate approximate enchantment cost based on level
                enchantData.cost = Math.pow(2, levelHelper.asInt()) - 1;
            }
        }

        enchantments.push(enchantData);
    }

    return enchantments;
}

function calculateEnchantmentPower(enchantments) {
    let totalPower = 0;
    let maxLevel = 0;

    enchantments.forEach(enchant => {
        totalPower += enchant.level;
        maxLevel = Math.max(maxLevel, enchant.level);
    });

    return { totalPower, maxLevel, averagePower: totalPower / enchantments.length };
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const compound = nbt.asCompoundHelper();

    if (compound.has("Enchantments")) {
        const enchantmentsData = compound.get("Enchantments");
        if (enchantmentsData && enchantmentsData.isList()) {
            const enchantments = processEnchantmentLevels(enchantmentsData.asListHelper());
            const power = calculateEnchantmentPower(enchantments);

            Chat.log(`Enchantment Analysis:`);
            Chat.log(`  Total power: ${power.totalPower}`);
            Chat.log(`  Max level: ${power.maxLevel}`);
            Chat.log(`  Average level: ${power.averagePower.toFixed(2)}`);
        }
    }
}
```

### Item Value Calculation
```js
function calculateItemValue(compound) {
    let baseValue = 1;
    let value = baseValue;

    // Add value based on damage/wear
    if (compound.has("Damage")) {
        const damage = compound.get("Damage");
        if (damage && damage.isNumber()) {
            const damageVal = damage.asNumberHelper().asInt();
            const maxDamage = 100; // Default max damage
            const durabilityPercent = Math.max(0, 1 - (damageVal / maxDamage));
            value *= (0.3 + 0.7 * durabilityPercent); // Damaged items are worth less
        }
    }

    // Add value based on enchantments
    if (compound.has("Enchantments")) {
        const enchantments = compound.get("Enchantments");
        if (enchantments && enchantments.isList()) {
            const enchantList = enchantments.asListHelper();
            let enchantmentBonus = 1;

            for (let i = 0; i < enchantList.length(); i++) {
                const enchantNBT = enchantList.get(i);
                if (!enchantNBT || !enchantNBT.isCompound()) continue;

                const enchant = enchantNBT.asCompoundHelper();
                if (enchant.has("lvl")) {
                    const lvl = enchant.get("lvl");
                    if (lvl && lvl.isNumber()) {
                        const level = lvl.asNumberHelper().asInt();
                        enchantmentBonus += (level * level) * 0.5; // Quadratic scaling
                    }
                }
            }

            value *= enchantmentBonus;
        }
    }

    // Add value based on repair cost
    if (compound.has("RepairCost")) {
        const repairCost = compound.get("RepairCost");
        if (repairCost && repairCost.isNumber()) {
            const cost = repairCost.asNumberHelper().asInt();
            value *= Math.max(1, 1 + (cost * 0.1)); // Higher repair cost = more valuable
        }
    }

    return Math.round(value * 100) / 100; // Round to 2 decimal places
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const value = calculateItemValue(nbt.asCompoundHelper());
    Chat.log(`Estimated item value: ${value}`);
}
```

### Entity Statistics Processing
```js
function processEntityStats(compound) {
    const stats = {};

    // Health processing
    if (compound.has("Health")) {
        const health = compound.get("Health");
        if (health && health.isNumber()) {
            stats.health = {
                value: health.asNumberHelper().asFloat(),
                max: 20.0, // Default max health
                percentage: 0
            };
            stats.health.percentage = (stats.health.value / stats.health.max) * 100;
        }
    }

    // Absorption hearts
    if (compound.has("AbsorptionAmount")) {
        const absorption = compound.get("AbsorptionAmount");
        if (absorption && absorption.isNumber()) {
            stats.absorption = absorption.asNumberHelper().asFloat();
        }
    }

    // Experience/Level (for players)
    if (compound.has("XpLevel")) {
        const xpLevel = compound.get("XpLevel");
        if (xpLevel && xpLevel.isNumber()) {
            stats.xpLevel = xpLevel.asNumberHelper().asInt();
        }
    }

    if (compound.has("XpP")) {
        const xpProgress = compound.get("XpP");
        if (xpProgress && xpProgress.isNumber()) {
            stats.xpProgress = xpProgress.asNumberHelper().asFloat();
        }
    }

    // Food level (for players)
    if (compound.has("foodLevel")) {
        const foodLevel = compound.get("foodLevel");
        if (foodLevel && foodLevel.isNumber()) {
            stats.foodLevel = foodLevel.asNumberHelper().asInt();
        }
    }

    if (compound.has("foodSaturationLevel")) {
        const saturation = compound.get("foodSaturationLevel");
        if (saturation && saturation.isNumber()) {
            stats.saturation = saturation.asNumberHelper().asFloat();
        }
    }

    // Air supply (for underwater entities)
    if (compound.has("Air")) {
        const air = compound.get("Air");
        if (air && air.isNumber()) {
            const airValue = air.asNumberHelper().asShort();
            stats.air = {
                current: airValue,
                max: 300, // Default max air
                percentage: (airValue / 300) * 100
            };
        }
    }

    return stats;
}

function displayEntityStats(stats) {
    Chat.log("=== Entity Statistics ===");

    if (stats.health) {
        Chat.log(`Health: ${stats.health.value.toFixed(1)}/${stats.health.max} (${Math.round(stats.health.percentage)}%)`);
    }

    if (stats.absorption) {
        Chat.log(`Absorption: ${stats.absorption.toFixed(1)} hearts`);
    }

    if (stats.xpLevel !== undefined) {
        Chat.log(`Experience Level: ${stats.xpLevel}`);
        if (stats.xpProgress !== undefined) {
            Chat.log(`XP Progress: ${(stats.xpProgress * 100).toFixed(1)}%`);
        }
    }

    if (stats.foodLevel !== undefined) {
        Chat.log(`Food Level: ${stats.foodLevel}/20`);
        if (stats.saturation !== undefined) {
            Chat.log(`Food Saturation: ${stats.saturation.toFixed(1)}`);
        }
    }

    if (stats.air) {
        Chat.log(`Air Supply: ${stats.air.current}/${stats.air.max} (${Math.round(stats.air.percentage)}%)`);
    }
}

// Usage with entity NBT (hypothetical example)
// const entityNBT = entity.getNBT();
// if (entityNBT && entityNBT.isCompound()) {
//     const stats = processEntityStats(entityNBT.asCompoundHelper());
//     displayEntityStats(stats);
// }
```

### Coordinate and Distance Calculations
```js
function extractPosition(compound) {
    if (!compound.has("Pos")) return null;

    const pos = compound.get("Pos");
    if (!pos || !pos.isList()) return null;

    const posList = pos.asListHelper();
    if (posList.length() !== 3) return null;

    const xElement = posList.get(0);
    const yElement = posList.get(1);
    const zElement = posList.get(2);

    if (!xElement || !yElement || !zElement) return null;
    if (!xElement.isNumber() || !yElement.isNumber() || !zElement.isNumber()) return null;

    return {
        x: xElement.asNumberHelper().asDouble(),
        y: yElement.asNumberHelper().asDouble(),
        z: zElement.asNumberHelper().asDouble()
    };
}

function calculateDistance(pos1, pos2) {
    if (!pos1 || !pos2) return null;

    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    const dz = pos2.z - pos1.z;

    return {
        distance: Math.sqrt(dx*dx + dy*dy + dz*dz),
        horizontalDistance: Math.sqrt(dx*dx + dz*dz),
        verticalDistance: Math.abs(dy),
        vector: { x: dx, y: dy, z: dz }
    };
}

function analyzeEntityPositions(entities) {
    const positions = [];

    for (const entity of entities) {
        // This would depend on how entity NBT is accessible
        // const entityNBT = entity.getNBT(); // Hypothetical method
        //
        // if (entityNBT && entityNBT.isCompound()) {
        //     const position = extractPosition(entityNBT.asCompoundHelper());
        //     if (position) {
        //         positions.push({
        //             entity: entity.getName(),
        //             position: position
        //         });
        //     }
        // }
    }

    // Calculate distances between all entities
    const playerPos = extractPosition(/* player NBT */);
    if (playerPos) {
        Chat.log("=== Distance from Player ===");
        for (const entityData of positions) {
            const distance = calculateDistance(playerPos, entityData.position);
            if (distance) {
                Chat.log(`${entityData.entity}: ${distance.distance.toFixed(2)} blocks ` +
                        `(horizontal: ${distance.horizontalDistance.toFixed(2)}, ` +
                        `vertical: ${distance.verticalDistance.toFixed(2)})`);
            }
        }
    }

    // Find closest pair
    let minDistance = Infinity;
    let closestPair = null;

    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            const distance = calculateDistance(positions[i].position, positions[j].position);
            if (distance && distance.distance < minDistance) {
                minDistance = distance.distance;
                closestPair = {
                    entity1: positions[i].entity,
                    entity2: positions[j].entity,
                    distance: distance
                };
            }
        }
    }

    if (closestPair) {
        Chat.log(`\nClosest entities: ${closestPair.entity1} and ${closestPair.entity2}`);
        Chat.log(`Distance: ${closestPair.distance.distance.toFixed(2)} blocks`);
    }
}
```

### Precision and Range Validation
```js
function validateNumericValue(numberHelper, name, expectedRange = null) {
    const issues = [];

    const byteVal = numberHelper.asByte();
    const shortVal = numberHelper.asShort();
    const intVal = numberHelper.asInt();
    const longVal = numberHelper.asLong();
    const floatVal = numberHelper.asFloat();
    const doubleVal = numberHelper.asDouble();
    const numberVal = numberHelper.asNumber();

    // Check for overflow in integer conversions
    if (byteVal !== numberVal && Math.abs(byteVal - numberVal) > 0.0001) {
        issues.push(`${name}: Byte conversion overflow (${byteVal} ≠ ${numberVal})`);
    }

    if (shortVal !== numberVal && Math.abs(shortVal - numberVal) > 0.0001) {
        issues.push(`${name}: Short conversion overflow (${shortVal} ≠ ${numberVal})`);
    }

    if (intVal !== numberVal && Math.abs(intVal - numberVal) > 0.0001) {
        issues.push(`${name}: Int conversion overflow (${intVal} ≠ ${numberVal})`);
    }

    // Check for precision loss in float conversion
    if (Math.abs(doubleVal - floatVal) > 0.000001) {
        issues.push(`${name}: Float precision loss (${floatVal} ≠ ${doubleVal})`);
    }

    // Check expected range
    if (expectedRange) {
        const { min, max, type } = expectedRange;
        let value;

        switch (type) {
            case 'byte':
                value = byteVal;
                break;
            case 'short':
                value = shortVal;
                break;
            case 'int':
                value = intVal;
                break;
            case 'long':
                value = longVal;
                break;
            case 'float':
                value = floatVal;
                break;
            case 'double':
                value = doubleVal;
                break;
            default:
                value = numberVal;
        }

        if (value < min || value > max) {
            issues.push(`${name}: Value ${value} outside expected range [${min}, ${max}]`);
        }
    }

    return issues;
}

function validateCommonValues(compound) {
    const validations = [];

    // Validate common numeric fields
    const commonFields = {
        "Damage": { min: 0, max: 2000, type: "int" },
        "RepairCost": { min: 0, max: 40, type: "int" },
        "Count": { min: 1, max: 64, type: "byte" },
        "Health": { min: 0, max: 1024, type: "float" },
        "Air": { min: -300, max: 300, type: "short" },
        "XpLevel": { min: 0, max: 24791, type: "int" },
        "XpP": { min: 0, max: 1, type: "float" },
        "foodLevel": { min: 0, max: 20, type: "int" }
    };

    for (const [key, range] of Object.entries(commonFields)) {
        if (!compound.has(key)) continue;

        const element = compound.get(key);
        if (!element || !element.isNumber()) continue;

        const issues = validateNumericValue(element.asNumberHelper(), key, range);
        validations.push(...issues);
    }

    return validations;
}

// Usage
const item = Player.getPlayer().getMainHand();
const nbt = item.getNBT();

if (nbt && nbt.isCompound()) {
    const issues = validateCommonValues(nbt.asCompoundHelper());

    if (issues.length === 0) {
        Chat.log("NBT numeric values validation passed");
    } else {
        Chat.log("NBT numeric validation issues:");
        issues.forEach(issue => Chat.log(`  - ${issue}`));
    }
}
```

## Important Notes

1. **Type Safety:** NBT numbers maintain their underlying type. Use the appropriate conversion method for your needs.

2. **Range Handling:** Be aware of the ranges for different numeric types. Conversions may cause overflow or precision loss.

3. **Precision:** Float and double values maintain different levels of precision. Use double for calculations requiring high precision.

4. **Null Handling:** Number helpers are never null once created, but the underlying NBT element should be validated before conversion.

5. **Performance:** Number conversion operations are generally fast but still have overhead. Cache frequently accessed values.

6. **Thread Safety:** NBT operations should be performed on the main Minecraft thread unless specifically documented as thread-safe.

7. **JavaScript Numbers:** JavaScript uses double-precision floating point for all numbers, so very large long values may lose precision.

## Related Classes

- `NBTElementHelper` - Base class for all NBT element helpers
- `NBTCompoundHelper` - Helper for NBT compound elements
- `NBTListHelper` - Helper for NBT list elements
- `BaseHelper<T>` - Base class for all JSMacros helper classes
- `AbstractNbtNumber` - Raw Minecraft numeric NBT class
- `ItemStackHelper` - Item helper that provides NBT access
- `EntityHelper` - Entity helper that may provide NBT access
- `Number` - JavaScript Number object
- `Math` - JavaScript Math object for calculations

## Version History

- **1.5.1:** Initial release with comprehensive numeric NBT handling
- **Current:** Full feature set with all numeric type conversions and precision handling

This class is essential for any script that needs to work with quantitative NBT data, particularly for processing health, damage, experience, coordinates, and other numeric game values in Minecraft.