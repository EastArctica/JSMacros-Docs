# ParrotEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.ParrotEntityHelper`

**Extends:** `TameableEntityHelper<ParrotEntity>`

**Since:** 1.8.4

The `ParrotEntityHelper` class provides specialized methods for interacting with Parrot entities in Minecraft. Parrots are flying passive mobs that come in various colors, can mimic sounds, sit on players' shoulders, and dance to music. These colorful birds spawn naturally in jungle biomes and can be tamed with seeds, making them excellent companions with unique behaviors.

Parrots are special among Minecraft mobs for their ability to mimic nearby mob sounds, sit on player shoulders, and dance to jukebox or note block music. They can be tamed using any type of seed (grass seeds, melon seeds, pumpkin seeds, beetroot seeds, wheat seeds, or torchflower seeds), and tamed parrots will follow their owners like other tamed animals. However, parrots have the unique ability to perch on player shoulders, making them portable companions.

This helper class provides access to key parrot behaviors including their color variant, current state (sitting, flying, dancing), shoulder perching status, and all standard tameable entity functionality. The class extends `TameableEntityHelper` and inherits comprehensive methods for ownership management, health tracking, AI control, and other tameable animal behaviors, while adding parrot-specific functionality.

## Table of Contents
- [Constructors](#constructors)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Inherited Methods](#inherited-methods)
- [Notes and Limitations](#notes-and-limitations)
- [Related Classes](#related-classes)

---

## Constructors

ParrotEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntityInteract`, `EntitySpawn`, `EntityDeath`) when the entity type is `minecraft:parrot`
- World entity queries using `World.getEntities("minecraft:parrot")` or other search methods
- Type casting from generic `EntityHelper` instances using `entity.as("minecraft:parrot")`
- The static casting methods when you know an entity is a Parrot

---

## Methods

### `getVariant()`

Returns the color variant of this parrot. Parrots come in 5 different color variants that affect their appearance but don't affect gameplay mechanics.

```js
// Analyze all parrots in the area by their color variants
const parrots = World.getEntities("minecraft:parrot");
const variantCounts = new Map();
const player = Player.getPlayer();

if (!player) return;

const playerPos = player.getPos();
const range = 64; // Search range for parrots

Chat.log("🦜=== Parrot Color Analysis ===");

parrots.forEach(entity => {
    const distance = player.distanceTo(entity);
    if (distance <= range) {
        const parrot = entity.as("minecraft:parrot");
        const variant = parrot.getVariant();
        const pos = entity.getPos();

        // Count variants
        variantCounts.set(variant, (variantCounts.get(variant) || 0) + 1);

        // Log detailed information
        Chat.log(`${getVariantDisplayName(variant)} parrot at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] (${distance.toFixed(1)}m away)`);

        // Additional states
        const isTamed = parrot.isTamed();
        const isDancing = parrot.isPartying();
        const isFlying = parrot.isFlying();
        const isShoulder = parrot.isSittingOnShoulder();

        Chat.log(`  Status: ${isTamed ? "Tamed" : "Wild"}, ${isDancing ? "Dancing 🎵" : ""}${isFlying ? "Flying" : ""}${isShoulder ? "Shoulder-perched" : ""}`);
    }
});

// Display variant collection summary
Chat.log(`\n📊 Found ${parrots.length} parrots within ${range} blocks:`);
for (const [variant, count] of variantCounts) {
    const variantName = getVariantDisplayName(variant);
    Chat.log(`  ${variantName}: ${count}`);
}

function getVariantDisplayName(variantId) {
    const variantNames = {
        "minecraft:red": "Red",
        "minecraft:blue": "Blue",
        "minecraft:green": "Green",
        "minecraft:cyan": "Cyan",
        "minecraft:gray": "Gray"
    };
    return variantNames[variantId] || variantId.replace("minecraft:", "");
}
```

**Returns:** `String` - The parrot variant identifier (one of: `"minecraft:red"`, `"minecraft:blue"`, `"minecraft:green"`, `"minecraft:cyan"`, `"minecraft:gray"`).

---

### `isSitting()`

Returns whether this parrot is currently in a sitting pose. Parrots can sit when commanded by their owner or when they land on the ground after flying.

```js
// Monitor tamed parrot activity and sitting behavior
class ParrotActivityMonitor {
    constructor() {
        this.monitoredParrots = new Map();
        this.sittingStats = {
            totalTimeSitting: 0,
            totalTimeFlying: 0,
            totalTimeDancing: 0
        };
    }

    updateParrotActivity() {
        const entities = World.getEntities(32); // 32 block range
        const currentParrotUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:parrot")) {
                const parrot = entity.as("minecraft:parrot");
                const uuid = entity.getUUID();
                currentParrotUUIDs.add(uuid);

                if (!this.monitoredParrots.has(uuid)) {
                    // New parrot detected
                    this.monitoredParrots.set(uuid, {
                        entity: entity,
                        parrot: parrot,
                        lastState: this.getParrotState(parrot),
                        stateStartTime: Client.getTime(),
                        name: parrot.isTamed() ? parrot.getName().getString() : "Wild Parrot"
                    });

                    Chat.log(`🦜 Started monitoring: ${this.monitoredParrots.get(uuid).name}`);
                } else {
                    // Update existing parrot
                    this.updateParrotState(uuid, parrot);
                }
            }
        });

        // Remove parrots that are no longer in range
        for (const [uuid, parrotData] of this.monitoredParrots) {
            if (!currentParrotUUIDs.has(uuid)) {
                Chat.log(`🦜 ${parrotData.name} left monitoring range`);
                this.monitoredParrots.delete(uuid);
            }
        }
    }

    getParrotState(parrot) {
        return {
            isSitting: parrot.isSitting(),
            isFlying: parrot.isFlying(),
            isDancing: parrot.isPartying(),
            isStanding: parrot.isStanding(),
            isOnShoulder: parrot.isSittingOnShoulder(),
            isTamed: parrot.isTamed()
        };
    }

    updateParrotState(uuid, parrot) {
        const parrotData = this.monitoredParrots.get(uuid);
        const currentState = this.getParrotState(parrot);
        const previousState = parrotData.lastState;
        const currentTime = Client.getTime();

        // Check for state changes
        this.detectStateChanges(parrotData, previousState, currentState, currentTime);

        // Update stored data
        parrotData.lastState = currentState;
    }

    detectStateChanges(parrotData, previousState, currentState, currentTime) {
        const duration = currentTime - parrotData.stateStartTime;
        const { name } = parrotData;
        let changes = [];

        // Sitting state changes
        if (previousState.isSitting !== currentState.isSitting) {
            if (currentState.isSitting) {
                changes.push("Sat down");
                Chat.log(`🦜 ${name} sat down`);
            } else {
                changes.push("Stood up");
                Chat.log(`🦜 ${name} stood up after ${duration} ticks`);
            }
            this.sittingStats.totalTimeSitting += duration;
        }

        // Flying state changes
        if (previousState.isFlying !== currentState.isFlying) {
            if (currentState.isFlying) {
                changes.push("Started flying");
                Chat.log(`🦜 ${name} took flight`);
            } else {
                changes.push("Landed");
                Chat.log(`🦜 ${name} landed after ${duration} ticks`);
            }
            this.sittingStats.totalTimeFlying += duration;
        }

        // Dancing state changes
        if (previousState.isDancing !== currentState.isDancing) {
            if (currentState.isDancing) {
                changes.push("Started dancing 🎵");
                Chat.log(`🦜 ${name} is dancing to music!`);
            } else {
                changes.push("Stopped dancing");
                Chat.log(`🦜 ${name} stopped dancing after ${duration} ticks`);
            }
            this.sittingStats.totalTimeDancing += duration;
        }

        // Shoulder perching changes
        if (previousState.isOnShoulder !== currentState.isOnShoulder) {
            if (currentState.isOnShoulder) {
                changes.push("Perched on shoulder");
                Chat.log(`🦜 ${name} is now perched on a player's shoulder!`);
            } else {
                changes.push("Left shoulder");
                Chat.log(`🦜 ${name} left player's shoulder after ${duration} ticks`);
            }
        }

        // Report significant state changes
        if (changes.length > 0) {
            const changesText = changes.join(", ");
            Chat.log(`🦜 ${name}: ${changesText}`);
        }

        // Update state start time
        parrotData.stateStartTime = currentTime;
    }

    generateActivityReport() {
        if (this.monitoredParrots.size === 0) {
            Chat.log("No parrots currently being monitored");
            return;
        }

        Chat.log("🦜=== Parrot Activity Report ===");
        Chat.log(`Currently monitoring: ${this.monitoredParrots.size} parrot(s)`);

        // Current status summary
        let sittingCount = 0;
        let flyingCount = 0;
        let dancingCount = 0;
        let shoulderCount = 0;
        let tamedCount = 0;

        for (const [uuid, parrotData] of this.monitoredParrots) {
            const state = parrotData.lastState;
            if (state.isSitting) sittingCount++;
            if (state.isFlying) flyingCount++;
            if (state.isDancing) dancingCount++;
            if (state.isOnShoulder) shoulderCount++;
            if (state.isTamed) tamedCount++;

            Chat.log(`\n${parrotData.name}:`);
            Chat.log(`  Status: ${state.isSitting ? "Sitting" : state.isFlying ? "Flying" : state.isStanding ? "Standing" : "Unknown"}`);
            Chat.log(`  Dancing: ${state.isDancing ? "Yes 🎵" : "No"}`);
            Chat.log(`  Shoulder: ${state.isOnShoulder ? "Yes" : "No"}`);
            Chat.log(`  Tamed: ${state.isTamed ? "Yes" : "No"}`);
        }

        Chat.log(`\n📊 Activity Summary:`);
        Chat.log(`  Sitting: ${sittingCount}`);
        Chat.log(`  Flying: ${flyingCount}`);
        Chat.log(`  Dancing: ${dancingCount}`);
        Chat.log(`  On shoulder: ${shoulderCount}`);
        Chat.log(`  Tamed: ${tamedCount}`);
    }
}

const parrotMonitor = new ParrotActivityMonitor();

// Monitor parrot activity every second
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    if (Client.getTime() % 20 === 0) {
        parrotMonitor.updateParrotActivity();
    }
}));

// Generate report on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.p" && e.action === 1) { // P key
        parrotMonitor.generateActivityReport();
    }
}));

Chat.log("🦜 Parrot Activity Monitor activated!");
```

**Returns:** `boolean` - `true` if the parrot is currently sitting, `false` otherwise.

---

### `isFlying()`

Returns whether this parrot is currently flying. Parrots fly when moving between locations, escaping threats, or following their owner.

```js
// Parrot flight pattern analysis and monitoring
function analyzeParrotFlightPatterns() {
    const parrots = World.getEntities("minecraft:parrot");
    const player = Player.getPlayer();

    if (!player) return;

    const flightData = [];
    const playerPos = player.getPos();

    Chat.log("🦜=== Parrot Flight Analysis ===");

    parrots.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= 48) { // 48 block range
            const parrot = entity.as("minecraft:parrot");
            const pos = entity.getPos();
            const variant = parrot.getVariant();
            const isFlying = parrot.isFlying();
            const isTamed = parrot.isTamed();

            flightData.push({
                entity: entity,
                parrot: parrot,
                position: pos,
                variant: variant,
                isFlying: isFlying,
                isTamed: isTamed,
                distance: distance,
                height: pos.y - playerPos.y // Height relative to player
            });

            // Log individual parrot status
            const variantName = getVariantDisplayName(variant);
            Chat.log(`${variantName} parrot [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]:`);
            Chat.log(`  Status: ${isFlying ? "✈️ Flying" : "🏃 Grounded"}`);
            Chat.log(`  Tamed: ${isTamed ? "Yes" : "No"}`);
            Chat.log(`  Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  Relative height: ${pos.y - playerPos.y.toFixed(1)} blocks`);

            if (isFlying) {
                Chat.log(`  Flight characteristics:`);
                Chat.log(`    Current altitude: ${pos.y.toFixed(1)}`);
                Chat.log(`    Ground distance: ${Math.sqrt(Math.pow(pos.x - playerPos.x, 2) + Math.pow(pos.z - playerPos.z, 2)).toFixed(1)}m`);

                // Check if parrot is following player
                if (isTamed && distance <= 16) {
                    Chat.log(`    Following owner: Yes (close range)`);
                }

                // Check if parrot is escaping or being called
                const isDancing = parrot.isPartying();
                if (isDancing) {
                    Chat.log(`    Special behavior: Dancing while flying!`);
                }
            }
        }
    });

    // Flight analysis summary
    const flyingParrots = flightData.filter(p => p.isFlying);
    const groundedParrots = flightData.filter(p => !p.isFlying);
    const tamedFlying = flyingParrots.filter(p => p.isTamed);
    const wildFlying = flyingParrots.filter(p => !p.isTamed);

    Chat.log(`\n📊 Flight Analysis Summary:`);
    Chat.log(`Total parrots found: ${flightData.length}`);
    Chat.log(`Currently flying: ${flyingParrots.length} (${(flyingParrots.length / flightData.length * 100).toFixed(1)}%)`);
    Chat.log(`Currently grounded: ${groundedParrots.length} (${(groundedParrots.length / flightData.length * 100).toFixed(1)}%)`);
    Chat.log(`Tamed parrots flying: ${tamedFlying.length}`);
    Chat.log(`Wild parrots flying: ${wildFlying.length}`);

    // Height analysis
    if (flyingParrots.length > 0) {
        const altitudes = flyingParrots.map(p => p.position.y);
        const avgAltitude = altitudes.reduce((sum, alt) => sum + alt, 0) / altitudes.length;
        const maxAltitude = Math.max(...altitudes);
        const minAltitude = Math.min(...altitudes);

        Chat.log(`\n📈 Altitude Statistics:`);
        Chat.log(`Average flight altitude: ${avgAltitude.toFixed(1)}`);
        Chat.log(`Maximum altitude: ${maxAltitude.toFixed(1)}`);
        Chat.log(`Minimum altitude: ${minAltitude.toFixed(1)}`);
        Chat.log(`Altitude range: ${(maxAltitude - minAltitude).toFixed(1)} blocks`);
    }

    // Behavior patterns
    Chat.log(`\n🔍 Behavior Patterns:`);

    if (tamedFlying.length > 0) {
        Chat.log(`✈️ Tamed parrots in flight: ${tamedFlying.length}`);
        Chat.log(`  These parrots are likely following their owner or responding to commands`);

        const avgTamedDistance = tamedFlying.reduce((sum, p) => sum + p.distance, 0) / tamedFlying.length;
        Chat.log(`  Average distance from owner: ${avgTamedDistance.toFixed(1)}m`);
    }

    if (wildFlying.length > 0) {
        Chat.log(`🌿 Wild parrots in flight: ${wildFlying.length}`);
        Chat.log(`  These parrots may be exploring, fleeing from threats, or moving between perches`);
    }

    // Flight recommendations
    if (flightData.length > 0) {
        Chat.log(`\n💡 Parrot Flight Tips:`);
        Chat.log(`- Tamed parrots will fly to follow their owner within a reasonable range`);
        Chat.log(`- Wild parrots fly more often and are more skittish`);
        Chat.log(`- Parrots can fly through small openings due to their small size`);
        Chat.log(`- Flying parrots will perch on nearby blocks or player shoulders`);
        Chat.log(`- Use seeds to tame wild parrots and make them follow you`);

        if (player.getMainHand() && player.getMainHand().getId().includes("seed")) {
            Chat.log(`✅ You're holding seeds - good for taming nearby parrots!`);
        }
    }

    if (flightData.length === 0) {
        Chat.log("No parrots found in the area. Parrots spawn naturally in jungle biomes!");
    }
}

function getVariantDisplayName(variantId) {
    const variantNames = {
        "minecraft:red": "Red",
        "minecraft:blue": "Blue",
        "minecraft:green": "Green",
        "minecraft:cyan": "Cyan",
        "minecraft:gray": "Gray"
    };
    return variantNames[variantId] || variantId.replace("minecraft:", "");
}

// Run flight analysis
analyzeParrotFlightPatterns();

// Set up keybind to refresh analysis
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.f" && e.action === 1) { // F key
        analyzeParrotFlightPatterns();
    }
}));
```

**Returns:** `boolean` - `true` if the parrot is currently flying, `false` otherwise.

---

### `isPartying()`

Returns whether this parrot is currently dancing to music. Parrots dance when they hear music from jukeboxes or note blocks within a certain range.

```js
// Comprehensive parrot party monitoring system
class ParrotPartyMonitor {
    constructor() {
        this.partyingParrots = new Set();
        this.partyHistory = [];
        this.musicSources = new Map(); // Track detected music sources
        this.lastMusicCheck = 0;
    }

    updateParrotParties() {
        const parrots = World.getEntities("minecraft:parrot");
        const currentTime = Client.getTime();
        const newPartyParrots = new Set();

        parrots.forEach(entity => {
            const parrot = entity.as("minecraft:parrot");
            if (parrot.isPartying()) {
                const uuid = entity.getUUID();
                const variant = parrot.getVariant();
                const pos = entity.getPos();
                const isTamed = parrot.isTamed();

                newPartyParrots.add(uuid);

                if (!this.partyingParrots.has(uuid)) {
                    // Parrot just started dancing!
                    this.partyHistory.push({
                        startTime: currentTime,
                        parrotUuid: uuid,
                        variant: variant,
                        position: { x: pos.x, y: pos.y, z: pos.z },
                        isTamed: isTamed,
                        name: isTamed ? entity.getName().getString() : "Wild Parrot"
                    });

                    Chat.log(`🎵🦜 ${this.partyHistory[this.partyHistory.length - 1].name} started dancing!`);
                    Chat.log(`   Variant: ${getVariantDisplayName(variant)}`);
                    Chat.log(`   Position: [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}]`);

                    // Highlight dancing parrots
                    entity.setGlowing(true);
                    entity.setGlowingColor(0xFF00FF); // Purple glow for dancing
                }
            } else {
                // Parrot stopped dancing if it was before
                if (this.partyingParrots.has(entity.getUUID())) {
                    const uuid = entity.getUUID();
                    const partyInfo = this.partyHistory.find(p => p.parrotUuid === uuid && !p.endTime);

                    if (partyInfo) {
                        partyInfo.endTime = currentTime;
                        partyInfo.duration = currentTime - partyInfo.startTime;

                        Chat.log(`🦜 ${partyInfo.name} stopped dancing after ${partyInfo.duration} ticks`);

                        // Remove glow effect
                        entity.resetGlowing();
                    }
                }
            }
        });

        this.partyingParrots = newPartyParrots;

        // Detect music sources periodically
        if (currentTime - this.lastMusicCheck >= 100) { // Every 5 seconds
            this.detectMusicSources();
            this.lastMusicCheck = currentTime;
        }
    }

    detectMusicSources() {
        const player = Player.getPlayer();
        if (!player) return;

        const playerPos = player.getPos();
        const detectionRange = 32; // Jukebox/note block detection range
        const foundSources = [];

        // Note: In actual implementation, you'd check for jukeboxes/note blocks
        // For now, we'll detect based on parrot dancing behavior
        if (this.partyingParrots.size > 0) {
            Chat.log(`🎵 Music detected! ${this.partyingParrots.size} parrot(s) are dancing`);

            // Estimate music source based on parrot positions
            const parrots = World.getEntities("minecraft:parrot");
            const dancingParrots = parrots.filter(entity => {
                const parrot = entity.as("minecraft:parrot");
                return parrot.isPartying() && player.distanceTo(entity) <= detectionRange;
            });

            if (dancingParrots.length > 0) {
                // Calculate center of dancing parrots
                const avgX = dancingParrots.reduce((sum, e) => sum + e.getPos().x, 0) / dancingParrots.length;
                const avgY = dancingParrots.reduce((sum, e) => sum + e.getPos().y, 0) / dancingParrots.length;
                const avgZ = dancingParrots.reduce((sum, e) => sum + e.getPos().z, 0) / dancingParrots.length;

                const distance = Math.sqrt(
                    Math.pow(avgX - playerPos.x, 2) +
                    Math.pow(avgY - playerPos.y, 2) +
                    Math.pow(avgZ - playerPos.z, 2)
                );

                Chat.log(`📍 Estimated music source: [${avgX.toFixed(1)}, ${avgY.toFixed(1)}, ${avgZ.toFixed(1)}]`);
                Chat.log(`   Distance from you: ${distance.toFixed(1)}m`);

                // Check what type of music might be playing
                if (distance <= 16) {
                    Chat.log(`🎶 Music is very close - likely a nearby note block or jukebox!`);
                    this.suggestMusicActions();
                } else {
                    Chat.log(`🎶 Music is playing at a distance`);
                }
            }
        }
    }

    suggestMusicActions() {
        const player = Player.getPlayer();
        const mainHand = player.getMainHand();
        const offHand = player.getOffHand();

        let hasMusicDisc = false;
        let hasNoteBlock = false;

        if (mainHand) {
            if (mainHand.getId().includes("music_disc")) hasMusicDisc = true;
            if (mainHand.getId() === "minecraft:note_block") hasNoteBlock = true;
        }

        if (offHand) {
            if (offHand.getId().includes("music_disc")) hasMusicDisc = true;
            if (offHand.getId() === "minecraft:note_block") hasNoteBlock = true;
        }

        Chat.log(`💡 Music Party Tips:`);
        Chat.log(`- Use jukeboxes with music discs to make parrots dance`);
        Chat.log(`- Note blocks can also make parrots dance`);
        Chat.log(`- Multiple parrots will dance together to music`);
        Chat.log(`- Tamed parrots will dance more reliably than wild ones`);

        if (hasMusicDisc) {
            Chat.log(`✅ You have a music disc ready for jukebox play!`);
        }

        if (hasNoteBlock) {
            Chat.log(`✅ You have a note block - place it and play some music!`);
        }
    }

    generatePartyReport() {
        Chat.log(`🎵=== Parrot Party Report ===`);
        Chat.log(`Currently dancing: ${this.partyingParrots.size} parrot(s)`);

        if (this.partyHistory.length > 0) {
            const recentParties = this.partyHistory.filter(p =>
                Client.getTime() - p.startTime <= 6000 // Last 5 minutes
            );

            if (recentParties.length > 0) {
                Chat.log(`\n📊 Recent Party History:`);

                const totalDanceTime = recentParties
                    .filter(p => p.duration)
                    .reduce((sum, p) => sum + p.duration, 0);

                Chat.log(`Parties in last 5 minutes: ${recentParties.length}`);
                Chat.log(`Total dance time: ${totalDanceTime} ticks (${(totalDanceTime / 20).toFixed(1)} seconds)`);

                // Variant breakdown
                const variantCounts = new Map();
                recentParties.forEach(party => {
                    variantCounts.set(party.variant, (variantCounts.get(party.variant) || 0) + 1);
                });

                Chat.log(`\n🦜 Dancing Variants:`);
                for (const [variant, count] of variantCounts) {
                    const variantName = getVariantDisplayName(variant);
                    Chat.log(`  ${variantName}: ${count} times`);
                }

                // Tamed vs wild
                const tamedParties = recentParties.filter(p => p.isTamed).length;
                const wildParties = recentParties.filter(p => !p.isTamed).length;

                Chat.log(`\n👥 Party Participants:`);
                Chat.log(`  Tamed parrots: ${tamedParties}`);
                Chat.log(`  Wild parrots: ${wildParties}`);
            }
        }

        if (this.partyingParrots.size > 0) {
            Chat.log(`\n🎉 Active Party Now!`);
            Chat.log(`Start a dance party with your parrots:`);
            Chat.log(`1. Place a jukebox nearby`);
            Chat.log(`2. Insert any music disc`);
            Chat.log(`3. Watch the parrots dance!`);
            Chat.log(`4. Try different music discs for variety`);
        } else {
            Chat.log(`\n💡 How to Start a Party:`);
            Chat.log(`1. Find or tame some parrots`);
            Chat.log(`2. Place a jukebox within 16 blocks`);
            Chat.log(`3. Insert a music disc to play music`);
            Chat.log(`4. Parrots within range will automatically start dancing!`);
        }
    }
}

function getVariantDisplayName(variantId) {
    const variantNames = {
        "minecraft:red": "Red",
        "minecraft:blue": "Blue",
        "minecraft:green": "Green",
        "minecraft:cyan": "Cyan",
        "minecraft:gray": "Gray"
    };
    return variantNames[variantId] || variantId.replace("minecraft:", "");
}

const partyMonitor = new ParrotPartyMonitor();

// Monitor parrot parties every tick for real-time updates
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    partyMonitor.updateParrotParties();
}));

// Generate party report on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.d" && e.action === 1) { // D key
        partyMonitor.generatePartyReport();
    }
}));

Chat.log("🎵🦜 Parrot Party Monitor activated!");
```

**Returns:** `boolean` - `true` if the parrot is currently dancing to music, `false` otherwise.

---

### `isStanding()`

Returns whether this parrot is currently standing still. This method returns `true` when the parrot is neither sitting, flying, nor dancing - essentially when it's just standing on the ground in a neutral state.

```js
// Parrot behavior state analysis including standing detection
function analyzeParrotBehaviorStates() {
    const parrots = World.getEntities("minecraft:parrot");
    const player = Player.getPlayer();

    if (!player) return;

    const stateAnalysis = {
        sitting: 0,
        flying: 0,
        dancing: 0,
        standing: 0,
        total: 0
    };

    const parrotDetails = [];

    Chat.log("🦜=== Parrot State Analysis ===");

    parrots.forEach(entity => {
        const distance = player.distanceTo(entity);
        if (distance <= 32) { // 32 block range
            const parrot = entity.as("minecraft:parrot");
            const pos = entity.getPos();
            const variant = parrot.getVariant();

            // Get all states
            const isSitting = parrot.isSitting();
            const isFlying = parrot.isFlying();
            const isDancing = parrot.isPartying();
            const isStanding = parrot.isStanding();
            const isTamed = parrot.isTamed();
            const isOnShoulder = parrot.isSittingOnShoulder();

            // Count states
            if (isSitting) stateAnalysis.sitting++;
            if (isFlying) stateAnalysis.flying++;
            if (isDancing) stateAnalysis.dancing++;
            if (isStanding) stateAnalysis.standing++;
            stateAnalysis.total++;

            // Store details
            const stateStr = isDancing ? "Dancing 🎵" :
                           isFlying ? "Flying ✈️" :
                           isSitting ? "Sitting 🪑" :
                           isStanding ? "Standing 🏃" : "Unknown";

            parrotDetails.push({
                entity: entity,
                variant: variant,
                state: stateStr,
                distance: distance,
                position: pos,
                isTamed: isTamed,
                isOnShoulder: isOnShoulder,
                isStanding: isStanding
            });

            // Log individual parrot
            const variantName = getVariantDisplayName(variant);
            Chat.log(`${variantName} parrot at [${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}] (${distance.toFixed(1)}m):`);
            Chat.log(`  State: ${stateStr}`);
            Chat.log(`  Tamed: ${isTamed ? "Yes" : "No"}`);
            Chat.log(`  On shoulder: ${isOnShoulder ? "Yes" : "No"}`);

            // Standing-specific analysis
            if (isStanding) {
                Chat.log(`  Standing behavior: Parrot is alert but inactive`);
                Chat.log(`  This is a neutral state - parrot may be observing or resting`);
            }
        }
    });

    // Display state analysis summary
    if (stateAnalysis.total > 0) {
        Chat.log(`\n📊 State Distribution Analysis:`);
        Chat.log(`Total parrots analyzed: ${stateAnalysis.total}`);

        const states = [
            { name: "Standing", count: stateAnalysis.standing, icon: "🏃" },
            { name: "Flying", count: stateAnalysis.flying, icon: "✈️" },
            { name: "Sitting", count: stateAnalysis.sitting, icon: "🪑" },
            { name: "Dancing", count: stateAnalysis.dancing, icon: "🎵" }
        ];

        states.forEach(state => {
            const percentage = (state.count / stateAnalysis.total * 100).toFixed(1);
            Chat.log(`${state.icon} ${state.name}: ${state.count} (${percentage}%)`);
        });

        // Standing behavior analysis
        if (stateAnalysis.standing > 0) {
            Chat.log(`\n🏃 Standing Parrot Analysis:`);
            Chat.log(`${stateAnalysis.standing} parrot(s) are currently standing`);

            const standingParrots = parrotDetails.filter(p => p.isStanding);
            const tamedStanding = standingParrots.filter(p => p.isTamed).length;
            const wildStanding = standingParrots.filter(p => !p.isTamed).length;

            Chat.log(`  Tamed parrots standing: ${tamedStanding}`);
            Chat.log(`  Wild parrots standing: ${wildStanding}`);

            // Analyze standing behavior context
            if (tamedStanding > 0) {
                Chat.log(`  Tamed standing parrots may be:`);
                Chat.log(`    - Waiting for owner commands`);
                Chat.log(`    - Observing surroundings`);
                Chat.log(`    - Resting between activities`);
                Chat.log(`    - Preparing to follow owner`);
            }

            if (wildStanding > 0) {
                Chat.log(`  Wild standing parrots may be:`);
                Chat.log(`    - Scanning for food (seeds)`);
                Chat.log(`    - Observing potential threats`);
                Chat.log(`    - Resting after flying`);
                Chat.log(`    - Preparing to take flight`);
            }

            // Proximity analysis for standing parrots
            const nearbyStanding = standingParrots.filter(p => p.distance <= 16);
            if (nearbyStanding.length > 0) {
                Chat.log(`\n  Standing parrots within 16 blocks: ${nearbyStanding.length}`);
                nearbyStanding.forEach(parrot => {
                    const variantName = getVariantDisplayName(parrot.variant);
                    Chat.log(`    ${variantName}: ${parrot.distance.toFixed(1)}m away`);
                });

                Chat.log(`  💡 These parrots are close enough to interact with!`);
                Chat.log(`     Approach slowly with seeds to tame wild parrots`);
                Chat.log(`     Give commands to tamed parrots`);
            }
        }

        // Behavioral insights
        Chat.log(`\n🧠 Behavioral Insights:`);

        if (stateAnalysis.standing > stateAnalysis.flying) {
            Chat.log(`Most parrots are grounded - they may be resting or observing`);
        } else if (stateAnalysis.flying > stateAnalysis.standing) {
            Chat.log(`Most parrots are active - they may be following owners or exploring`);
        }

        if (stateAnalysis.dancing > 0) {
            Chat.log(`Music is detected nearby - parrots are enjoying the party! 🎵`);
        }

        if (stateAnalysis.sitting > 0) {
            Chat.log(`Some parrots are sitting - they may be commanded to stay or resting`);
        }

        // Interaction suggestions
        Chat.log(`\n💡 Interaction Suggestions:`);

        if (stateAnalysis.standing > 0) {
            Chat.log(`- Standing parrots are receptive to interactions`);
            Chat.log(`- Wild parrots: approach with seeds for taming`);
            Chat.log(`- Tamed parrots: give commands or lead them to locations`);
        }

        const playerInventory = Player.openInventory();
        const hasSeeds = playerInventory.getSlots().some(slot =>
            slot && slot.getId() && (
                slot.getId().includes("seed") ||
                slot.getId() === "minecraft:wheat_seeds" ||
                slot.getId() === "minecraft:melon_seeds" ||
                slot.getId() === "minecraft:pumpkin_seeds" ||
                slot.getId() === "minecraft:beetroot_seeds"
            )
        );

        if (hasSeeds) {
            Chat.log(`✅ You have seeds - perfect for taming standing wild parrots!`);
        } else {
            Chat.log(`🌱 Get seeds from grass to tame wild parrots`);
        }

    } else {
        Chat.log("No parrots found within 32 blocks");
        Chat.log("Parrots spawn naturally in jungle biomes!");
    }
}

function getVariantDisplayName(variantId) {
    const variantNames = {
        "minecraft:red": "Red",
        "minecraft:blue": "Blue",
        "minecraft:green": "Green",
        "minecraft:cyan": "Cyan",
        "minecraft:gray": "Gray"
    };
    return variantNames[variantId] || variantId.replace("minecraft:", "");
}

// Run state analysis
analyzeParrotBehaviorStates();

// Set up keybind to refresh analysis
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.s" && e.action === 1) { // S key
        analyzeParrotBehaviorStates();
    }
}));
```

**Returns:** `boolean` - `true` if the parrot is currently standing (neither sitting, flying, nor dancing), `false` otherwise.

---

### `isSittingOnShoulder()`

Returns whether this parrot is currently perched on any player's shoulder. Tamed parrots can sit on player shoulders, making them portable companions.

```js
// Comprehensive shoulder parrot monitoring and management system
class ShoulderParrotManager {
    constructor() {
        this.shoulderParrots = new Map(); // Track parrots on shoulders
        this.parrotHistory = []; // Track shoulder perching history
        this.lastShoulderCheck = 0;
        this.shoulderStats = {
            totalShoulderTime: 0,
            leftShoulderUses: 0,
            rightShoulderUses: 0,
            uniqueParrotsOnShoulder: new Set()
        };
    }

    updateShoulderParrots() {
        const currentTime = Client.getTime();
        const player = Player.getPlayer();

        if (!player) return;

        const parrots = World.getEntities("minecraft:parrot");
        const currentShoulderParrots = new Set();

        parrots.forEach(entity => {
            const parrot = entity.as("minecraft:parrot");
            if (parrot.isSittingOnShoulder()) {
                const uuid = entity.getUUID();
                const variant = parrot.getVariant();
                const isTamed = parrot.isTamed();
                const name = isTamed ? entity.getName().getString() : "Wild Parrot";

                currentShoulderParrots.add(uuid);

                // Check if this is a new shoulder parrot
                if (!this.shoulderParrots.has(uuid)) {
                    this.handleParrotLandedOnShoulder(entity, parrot, uuid, variant, name, currentTime);
                } else {
                    // Update existing shoulder parrot data
                    const shoulderData = this.shoulderParrots.get(uuid);
                    shoulderData.lastCheck = currentTime;
                }
            } else {
                // Check if parrot just left shoulder
                if (this.shoulderParrots.has(entity.getUUID())) {
                    this.handleParrotLeftShoulder(entity, entity.getUUID(), currentTime);
                }
            }
        });

        // Clean up parrots that are no longer detected on shoulders
        for (const [uuid, shoulderData] of this.shoulderParrots) {
            if (!currentShoulderParrots.has(uuid)) {
                this.handleParrotLeftShoulder(null, uuid, currentTime);
            }
        }
    }

    handleParrotLandedOnShoulder(entity, parrot, uuid, variant, name, currentTime) {
        const shoulderData = {
            entity: entity,
            parrot: parrot,
            name: name,
            variant: variant,
            isTamed: parrot.isTamed(),
            startTime: currentTime,
            lastCheck: currentTime
        };

        this.shoulderParrots.set(uuid, shoulderData);
        this.shoulderStats.uniqueParrotsOnShoulder.add(uuid);

        Chat.log(`🦜 ${name} landed on a player's shoulder!`);
        Chat.log(`   Variant: ${getVariantDisplayName(variant)}`);
        Chat.log(`   Tamed: ${shoulderData.isTamed ? "Yes" : "No"}`);

        // Highlight the parrot if it's visible
        if (entity) {
            entity.setGlowing(true);
            entity.setGlowingColor(0xFFD700); // Gold glow for shoulder parrots
        }

        this.parrotHistory.push({
            uuid: uuid,
            name: name,
            variant: variant,
            action: "landed_on_shoulder",
            timestamp: currentTime,
            details: { isTamed: shoulderData.isTamed }
        });
    }

    handleParrotLeftShoulder(entity, uuid, currentTime) {
        const shoulderData = this.shoulderParrots.get(uuid);
        if (shoulderData) {
            const duration = currentTime - shoulderData.startTime;

            Chat.log(`🦜 ${shoulderData.name} left player's shoulder after ${duration} ticks (${(duration / 20).toFixed(1)} seconds)`);

            this.shoulderStats.totalShoulderTime += duration;

            // Reset glow if entity is still visible
            if (entity) {
                entity.resetGlowing();
            }

            this.parrotHistory.push({
                uuid: uuid,
                name: shoulderData.name,
                variant: shoulderData.variant,
                action: "left_shoulder",
                timestamp: currentTime,
                duration: duration,
                details: { isTamed: shoulderData.isTamed }
            });

            this.shoulderParrots.delete(uuid);
        }
    }

    generateShoulderReport() {
        Chat.log(`🦜=== Shoulder Parrot Report ===`);
        Chat.log(`Currently on shoulders: ${this.shoulderParrots.size} parrot(s)`);

        if (this.shoulderParrots.size > 0) {
            Chat.log(`\n📋 Current Shoulder Parrots:`);

            for (const [uuid, shoulderData] of this.shoulderParrots) {
                const currentDuration = Client.getTime() - shoulderData.startTime;
                const variantName = getVariantDisplayName(shoulderData.variant);

                Chat.log(`🦜 ${shoulderData.name}:`);
                Chat.log(`   Variant: ${variantName}`);
                Chat.log(`   Tamed: ${shoulderData.isTamed ? "Yes" : "No"}`);
                Chat.log(`   Time on shoulder: ${currentDuration} ticks (${(currentDuration / 20).toFixed(1)} seconds)`);
                Chat.log(`   Status: Currently riding`);

                if (shoulderData.isTamed) {
                    Chat.log(`   Owner: ${shoulderData.parrot.getOwner() || "Unknown"}`);
                }
            }
        }

        // Historical analysis
        if (this.parrotHistory.length > 0) {
            const recentHistory = this.parrotHistory.filter(h =>
                Client.getTime() - h.timestamp <= 12000 // Last 10 minutes
            );

            if (recentHistory.length > 0) {
                Chat.log(`\n📊 Recent Shoulder Activity (last 10 minutes):`);

                const landingEvents = recentHistory.filter(h => h.action === "landed_on_shoulder").length;
                const leavingEvents = recentHistory.filter(h => h.action === "left_shoulder").length;

                Chat.log(`Parrots landed on shoulders: ${landingEvents}`);
                Chat.log(`Parrots left shoulders: ${leavingEvents}`);

                // Average shoulder time
                const leftEventsWithDurations = recentHistory.filter(h => h.action === "left_shoulder" && h.duration);
                if (leftEventsWithDurations.length > 0) {
                    const avgDuration = leftEventsWithDurations.reduce((sum, h) => sum + h.duration, 0) / leftEventsWithDurations.length;
                    Chat.log(`Average shoulder time: ${(avgDuration / 20).toFixed(1)} seconds`);
                }

                // Variant analysis
                const variantCounts = new Map();
                recentHistory.forEach(h => {
                    variantCounts.set(h.variant, (variantCounts.get(h.variant) || 0) + 1);
                });

                if (variantCounts.size > 0) {
                    Chat.log(`\n🦜 Shoulder Variants:`);
                    for (const [variant, count] of variantCounts) {
                        const variantName = getVariantDisplayName(variant);
                        Chat.log(`   ${variantName}: ${count} time(s)`);
                    }
                }
            }
        }

        // Overall statistics
        Chat.log(`\n📈 Overall Statistics:`);
        Chat.log(`Total unique parrots on shoulders: ${this.shoulderStats.uniqueParrotsOnShoulder.size}`);
        Chat.log(`Total shoulder time: ${(this.shoulderStats.totalShoulderTime / 20).toFixed(1)} seconds`);

        // Shoulder parrot tips
        Chat.log(`\n💡 Shoulder Parrot Tips:`);
        Chat.log(`- Tamed parrots will sit on player shoulders when close enough`);
        Chat.log(`- Parrots on shoulders are portable and travel with the player`);
        Chat.log(`- Parrots may occasionally mimic sounds while on shoulders`);
        Chat.log(`- Players can have one parrot on each shoulder`);
        Chat.log(`- Shoulder parrots will dismount when the player enters water or takes damage`);
        Chat.log(`- Feed seeds to tamed parrots to encourage shoulder behavior`);

        // Taming advice
        const playerInventory = Player.openInventory();
        const hasSeeds = playerInventory.getSlots().some(slot =>
            slot && slot.getId() && (
                slot.getId().includes("seed") ||
                slot.getId() === "minecraft:wheat_seeds" ||
                slot.getId() === "minecraft:melon_seeds" ||
                slot.getId() === "minecraft:pumpkin_seeds" ||
                slot.getId() === "minecraft:beetroot_seeds"
            )
        );

        if (hasSeeds) {
            Chat.log(`✅ You have seeds - good for taming parrots to get shoulder companions!`);
        } else {
            Chat.log(`🌱 Get seeds from grass to tame parrots for shoulder companionship`);
        }

        // Current player shoulder check
        this.checkPlayerShoulders();
    }

    checkPlayerShoulders() {
        const player = Player.getPlayer();
        if (!player) return;

        Chat.log(`\n👤 Your Shoulder Status:`);

        // Note: In actual implementation, you'd check player shoulder entities
        // For this example, we'll provide general information
        const shoulderParrots = this.shoulderParrots.size;

        if (shoulderParrots > 0) {
            Chat.log(`You have ${shoulderParrots} parrot(s) on nearby players' shoulders`);
            Chat.log(`Get closer to tamed parrots to have them sit on your shoulders`);
        } else {
            Chat.log(`No parrots currently on shoulders in your vicinity`);
            Chat.log(`Tame some parrots and stay close to them for shoulder companionship`);
        }
    }

    highlightShoulderParrots() {
        Chat.log(`🌟 Highlighting ${this.shoulderParrots.size} shoulder parrot(s)`);

        for (const [uuid, shoulderData] of this.shoulderParrots) {
            if (shoulderData.entity) {
                // Create rainbow effect for shoulder parrots
                const colors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3];
                const colorIndex = Math.floor(Client.getTime() / 20) % colors.length;

                shoulderData.entity.setGlowing(true);
                shoulderData.entity.setGlowingColor(colors[colorIndex]);
            }
        }

        Chat.log(`Shoulder parrots are now highlighted with rainbow colors!`);
    }
}

function getVariantDisplayName(variantId) {
    const variantNames = {
        "minecraft:red": "Red",
        "minecraft:blue": "Blue",
        "minecraft:green": "Green",
        "minecraft:cyan": "Cyan",
        "minecraft:gray": "Gray"
    };
    return variantNames[variantId] || variantId.replace("minecraft:", "");
}

const shoulderManager = new ShoulderParrotManager();

// Monitor shoulder parrots every tick for real-time updates
events.on("Tick", JavaWrapper.methodToJavaAsync((e) => {
    shoulderManager.updateShoulderParrots();
}));

// Generate shoulder report on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.h" && e.action === 1) { // H key
        shoulderManager.generateShoulderReport();
    }
}));

// Highlight shoulder parrots on keypress
events.on("Key", JavaWrapper.methodToJavaAsync((e) => {
    if (e.key === "key.keyboard.l" && e.action === 1) { // L key
        shoulderManager.highlightShoulderParrots();
    }
}));

Chat.log("🦜 Shoulder Parrot Manager activated!");
```

**Returns:** `boolean` - `true` if the parrot is currently sitting on any player's shoulder, `false` otherwise.

---

## Usage Examples

### Complete Parrot Management System
```js
// Comprehensive parrot companion management and monitoring system
class ParrotCompanionManager {
    constructor() {
        this.managedParrots = new Map();
        this.parrotStats = {
            totalTamed: 0,
            totalWild: 0,
            dancingCount: 0,
            flyingCount: 0,
            shoulderCount: 0,
            variants: new Map()
        };
        this.alertDistances = {
            close: 8,      // 8 blocks - parrot is close
            nearby: 16,    // 16 blocks - parrot is nearby
            visible: 32    // 32 blocks - parrot is visible
        };
    }

    registerParrot(entity) {
        const parrot = entity.as("minecraft:parrot");
        const uuid = entity.getUUID();
        const pos = entity.getPos();
        const variant = parrot.getVariant();
        const isTamed = parrot.isTamed();
        const name = isTamed ? entity.getName().getString() : `Wild ${getVariantDisplayName(variant)} Parrot`;

        const parrotData = {
            entity: entity,
            parrot: parrot,
            name: name,
            variant: variant,
            variantName: getVariantDisplayName(variant),
            isTamed: isTamed,
            lastPosition: pos,
            lastState: this.getParrotState(parrot),
            firstSeen: Client.getTime(),
            lastUpdate: Client.getTime(),
            danceTime: 0,
            shoulderTime: 0,
            flightTime: 0
        };

        this.managedParrots.set(uuid, parrotData);

        // Update statistics
        if (isTamed) {
            this.parrotStats.totalTamed++;
        } else {
            this.parrotStats.totalWild++;
        }

        this.parrotStats.variants.set(variant, (this.parrotStats.variants.get(variant) || 0) + 1);

        Chat.log(`🦜 Registered ${name} (${parrotData.variantName})`);

        // Color parrots by variant for easy identification
        const variantColors = {
            "minecraft:red": 0xFF0000,
            "minecraft:blue": 0x0000FF,
            "minecraft:green": 0x00FF00,
            "minecraft:cyan": 0x00FFFF,
            "minecraft:gray": 0x808080
        };

        const color = variantColors[variant] || 0xFFFFFF;
        entity.setGlowing(true);
        entity.setGlowingColor(color);

        return parrotData;
    }

    getParrotState(parrot) {
        return {
            isSitting: parrot.isSitting(),
            isFlying: parrot.isFlying(),
            isDancing: parrot.isPartying(),
            isStanding: parrot.isStanding(),
            isOnShoulder: parrot.isSittingOnShoulder(),
            isTamed: parrot.isTamed()
        };
    }

    updateParrot(entity) {
        const parrot = entity.as("minecraft:parrot");
        const uuid = entity.getUUID();
        const currentState = this.getParrotState(parrot);
        const pos = entity.getPos();

        let parrotData = this.managedParrots.get(uuid);
        if (!parrotData) {
            parrotData = this.registerParrot(entity);
        }

        const previousState = parrotData.lastState;
        const deltaTime = Client.getTime() - parrotData.lastUpdate;

        // Detect state changes
        this.detectStateChanges(parrotData, previousState, currentState, deltaTime);

        // Update statistics
        this.updateStatistics(currentState, deltaTime);

        // Handle player interactions
        this.handlePlayerInteractions(entity, parrot, currentState);

        // Update stored data
        parrotData.lastPosition = pos;
        parrotData.lastState = currentState;
        parrotData.lastUpdate = Client.getTime();
    }

    detectStateChanges(parrotData, previousState, currentState, deltaTime) {
        const { name, variantName } = parrotData;
        let changes = [];

        // Dancing state changes
        if (previousState.isDancing !== currentState.isDancing) {
            if (currentState.isDancing) {
                changes.push("Started dancing 🎵");
                Chat.log(`🦜 ${name} is dancing to music!`);
                parrotData.lastDanceStart = Client.getTime();
            } else {
                if (parrotData.lastDanceStart) {
                    const danceDuration = Client.getTime() - parrotData.lastDanceStart;
                    parrotData.danceTime += danceDuration;
                    changes.push(`Stopped dancing after ${(danceDuration / 20).toFixed(1)}s`);
                }
            }
        }

        // Flying state changes
        if (previousState.isFlying !== currentState.isFlying) {
            if (currentState.isFlying) {
                changes.push("Started flying ✈️");
                parrotData.lastFlightStart = Client.getTime();
            } else {
                if (parrotData.lastFlightStart) {
                    const flightDuration = Client.getTime() - parrotData.lastFlightStart;
                    parrotData.flightTime += flightDuration;
                    changes.push(`Landed after ${(flightDuration / 20).toFixed(1)}s`);
                }
            }
        }

        // Shoulder state changes
        if (previousState.isOnShoulder !== currentState.isOnShoulder) {
            if (currentState.isOnShoulder) {
                changes.push("Perched on shoulder");
                parrotData.lastShoulderStart = Client.getTime();
                Chat.log(`🦜 ${name} is perched on a player's shoulder!`);
            } else {
                if (parrotData.lastShoulderStart) {
                    const shoulderDuration = Client.getTime() - parrotData.lastShoulderStart;
                    parrotData.shoulderTime += shoulderDuration;
                    changes.push(`Left shoulder after ${(shoulderDuration / 20).toFixed(1)}s`);
                }
            }
        }

        // Sitting state changes
        if (previousState.isSitting !== currentState.isSitting) {
            if (currentState.isSitting) {
                changes.push("Sat down 🪑");
            } else {
                changes.push("Stood up");
            }
        }

        // Report changes
        if (changes.length > 0) {
            const changesText = changes.join(", ");
            Chat.log(`🦜 ${name}: ${changesText}`);
        }
    }

    updateStatistics(currentState, deltaTime) {
        if (currentState.isDancing) {
            this.parrotStats.dancingCount = 1;
        } else {
            this.parrotStats.dancingCount = 0;
        }

        if (currentState.isFlying) {
            this.parrotStats.flyingCount = 1;
        } else {
            this.parrotStats.flyingCount = 0;
        }

        if (currentState.isOnShoulder) {
            this.parrotStats.shoulderCount = 1;
        } else {
            this.parrotStats.shoulderCount = 0;
        }
    }

    handlePlayerInteractions(entity, parrot, currentState) {
        const player = Player.getPlayer();
        if (!player) return;

        const distance = player.distanceTo(entity);

        // Close proximity interactions
        if (distance <= this.alertDistances.close) {
            if (currentState.isOnShoulder) {
                Chat.actionbar(`🦜 ${parrot.isTamed() ? "Your companion" : "A parrot"} is on your shoulder!`);
            } else if (!currentState.isFlying && currentState.isTamed) {
                Chat.actionbar(`🦜 Tamed parrot nearby (${distance.toFixed(1)}m)`);
            }

            // Check for taming opportunities
            if (!currentState.isTamed && currentState.isStanding) {
                const mainHand = player.getMainHand();
                if (mainHand && this.isTamingItem(mainHand.getId())) {
                    Chat.actionbar(`🌱 Taming opportunity! Right-click the parrot with seeds`);
                }
            }
        }
    }

    isTamingItem(itemId) {
        return itemId && (
            itemId.includes("seed") ||
            itemId === "minecraft:wheat_seeds" ||
            itemId === "minecraft:melon_seeds" ||
            itemId === "minecraft:pumpkin_seeds" ||
            itemId === "minecraft:beetroot_seeds" ||
            itemId === "minecraft:torchflower_seeds"
        );
    }

    generateComprehensiveReport() {
        Chat.log(`🦜=== Parrot Companion Report ===`);
        Chat.log(`Total managed parrots: ${this.managedParrots.size}`);
        Chat.log(`Tamed companions: ${this.parrotStats.totalTamed}`);
        Chat.log(`Wild parrots: ${this.parrotStats.totalWild}`);

        // Current activity status
        Chat.log(`\n📊 Current Activity:`);
        Chat.log(`Dancing: ${this.parrotStats.dancingCount}`);
        Chat.log(`Flying: ${this.parrotStats.flyingCount}`);
        Chat.log(`On shoulders: ${this.parrotStats.shoulderCount}`);

        // Variant collection
        if (this.parrotStats.variants.size > 0) {
            Chat.log(`\n🎨 Variant Collection:`);
            for (const [variant, count] of this.parrotStats.variants) {
                const variantName = getVariantDisplayName(variant);
                Chat.log(`  ${variantName}: ${count}`);
            }
        }

        // Individual parrot details
        for (const [uuid, parrotData] of this.managedParrots) {
            const { name, lastState, lastPosition } = parrotData;
            const player = Player.getPlayer();
            const distance = player ? player.distanceTo(lastPosition) : 0;

            Chat.log(`\n${name}:`);
            Chat.log(`  Variant: ${parrotData.variantName}`);
            Chat.log(`  Status: ${this.getStatusString(lastState)}`);
            Chat.log(`  Distance: ${distance.toFixed(1)}m`);
            Chat.log(`  Tamed: ${lastState.isTamed ? "Yes" : "No"}`);

            // Activity statistics
            if (parrotData.danceTime > 0) {
                Chat.log(`  Total dance time: ${(parrotData.danceTime / 20).toFixed(1)}s`);
            }
            if (parrotData.shoulderTime > 0) {
                Chat.log(`  Total shoulder time: ${(parrotData.shoulderTime / 20).toFixed(1)}s`);
            }
            if (parrotData.flightTime > 0) {
                Chat.log(`  Total flight time: ${(parrotData.flightTime / 20).toFixed(1)}s`);
            }
        }

        // Parrot care tips
        this.generateParrotCareTips();
    }

    getStatusString(state) {
        if (state.isDancing) return "Dancing 🎵";
        if (state.isFlying) return "Flying ✈️";
        if (state.isOnShoulder) return "Shoulder-perched";
        if (state.isSitting) return "Sitting 🪑";
        if (state.isStanding) return "Standing 🏃";
        return "Unknown";
    }

    generateParrotCareTips() {
        Chat.log(`\n💡 Parrot Care Tips:`);

        const hasTamed = this.parrotStats.totalTamed > 0;
        const hasWild = this.parrotStats.totalWild > 0;

        if (hasWild) {
            Chat.log(`🌱 Taming Wild Parrots:`);
            Chat.log(`- Find any type of seeds (grass, melon, pumpkin, beetroot, wheat, torchflower)`);
            Chat.log(`- Approach wild parrots slowly while holding seeds`);
            Chat.log(`- Right-click to feed them until hearts appear`);
            Chat.log(`- Tamed parrots will follow you and can sit on your shoulders`);
        }

        if (hasTamed) {
            Chat.log(`🦜 Caring for Tamed Parrots:`);
            Chat.log(`- Right-click tamed parrots to make them sit/stand`);
            Chat.log(`- Stand close to tamed parrots for them to sit on your shoulder`);
            Chat.log(`- Play music (jukeboxes or note blocks) to make them dance`);
            Chat.log(`- Parrots on shoulders will travel with you anywhere`);
            Chat.log(`- Feed seeds occasionally to maintain their friendship`);
        }

        Chat.log(`🎵 Parrot Entertainment:`);
        Chat.log(`- Place jukeboxes with music discs nearby for dancing`);
        Chat.log(`- Use note blocks to create custom music`);
        Chat.log(`- Multiple parrots will dance together`);

        Chat.log(`⚠️ Parrot Safety:`);
        Chat.log(`- Never feed cookies to parrots (they're poisonous!)`);
        Chat.log(`- Parrots will teleport to you if they get too far away`);
        Chat.log(`- Shoulder parrots dismount in water or when taking damage`);
    }

    update() {
        const entities = World.getEntities();
        const currentParrotUUIDs = new Set();

        entities.forEach(entity => {
            if (entity.is("minecraft:parrot")) {
                const parrot = entity.as("minecraft:parrot");
                const uuid = entity.getUUID();
                currentParrotUUIDs.add(uuid);

                this.updateParrot(entity);
            }
        });

        // Remove parrots that are no longer in range
        for (const [uuid, parrotData] of this.managedParrots) {
            if (!currentParrotUUIDs.has(uuid)) {
                Chat.log(`🦜 ${parrotData.name} left tracking range`);
                parrotData.entity.resetGlowing();
                this.managedParrots.delete(uuid);
            }
        }
    }
}

function getVariantDisplayName(variantId) {
    const variantNames = {
        "minecraft:red": "Red",
        "minecraft:blue": "Blue",
        "minecraft:green": "Green",
        "minecraft:cyan": "Cyan",
        "minecraft:gray": "Gray"
    };
    return variantNames[variantId] || variantId.replace("minecraft:", "");
}

// Initialize and run the parrot manager
const parrotManager = new ParrotCompanionManager();

// Update every tick for real-time monitoring
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    parrotManager.update();
}));

// Generate comprehensive report every 5 minutes
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 60 * 5) === 0) {
        parrotManager.generateComprehensiveReport();
    }
}));

Chat.log("🦜 Parrot Companion Manager activated! Monitoring your feathered friends.");
```

---

## Inherited Methods

From `TameableEntityHelper`:

- `isTamed()` - Check if parrot is tamed by a player
- `getOwner()` - Get the UUID of the parrot's owner (null if wild)
- `isOwner(LivingEntityHelper owner)` - Check if a specific entity is the parrot's owner

From `AnimalEntityHelper`:

- `isFood(ItemStackHelper item)` - Check if an item can be used to feed/tame the parrot (seeds)
- `canBreedWith(AnimalEntityHelper other)` - Check if parrots can breed (parrots don't breed traditionally)

From `MobEntityHelper`:

- `isAttacking()` - Check if parrot is currently attacking (parrots are passive, usually false)
- `isAiDisabled()` - Check if parrot's AI is disabled
- `getLeashed()` - Check if parrot is leashed

From `LivingEntityHelper`:

- `getHealth()`, `getMaxHealth()` - Health information (parrots have 6 health points)
- `getStatusEffects()` - Active status effects
- `isBaby()` - Check if parrot is a baby variant (parrots don't have baby forms)
- `getArmor()` - Armor value (always 0 for parrots)

From `EntityHelper`:

- `getPos()`, `getX()`, `getY()`, `getZ()` - Position information
- `getName()`, `getType()` - Entity identification
- `isAlive()`, `distanceTo()` - State and distance calculations
- `getFacingDirection()` - Movement and orientation
- `isInWater()`, `isOnFire()` - Environmental state checks
- `getUUID()` - Unique identifier for tracking specific parrots

---

## Notes and Limitations

- ParrotEntityHelper is designed specifically for `minecraft:parrot` entities and won't work with other flying or tamable mobs
- The `isPartying()` method indicates when parrots hear music from jukeboxes or note blocks within approximately 16 blocks
- Parrots can only be tamed using seeds (grass seeds, melon seeds, pumpkin seeds, beetroot seeds, wheat seeds, or torchflower seeds)
- **Never feed cookies to parrots** - they are poisonous and will instantly kill them
- Parrots spawn naturally in jungle biomes but can also be spawned with spawn eggs in Creative mode
- Tamed parrots will follow their owner and can be commanded to sit or stand
- Parrots have the unique ability to sit on player shoulders, making them portable companions
- Shoulder parrots will automatically dismount when the player enters water, takes damage, or dies
- Parrots can mimic sounds from nearby mobs, which is one of their most distinctive behaviors
- Like other tamed animals, parrots will teleport to their owner if they get too far away (typically beyond 12-16 blocks)
- Parrots are immune to fall damage but can take damage from other sources
- The `isStanding()` method returns true only when none of the other states (sitting, flying, dancing) are active
- Parrots can only have one parrot per shoulder, allowing a maximum of two shoulder parrots per player
- Visual effects like `setGlowing()` and `setGlowingColor()` can be used to highlight important parrots for better visibility
- Parrots will occasionally dance without music as a natural idle behavior, but `isPartying()` specifically detects music-induced dancing

---

## Related Classes

- `TameableEntityHelper` - Base class for tameable animals with ownership and behavior control
- `AnimalEntityHelper` - Animal-specific functionality including feeding and breeding behaviors
- `MobEntityHelper` - Mob entity functionality with AI and combat states
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- `ItemStackHelper` - For managing seeds and other items used for parrot taming and care
- `World` - For finding parrots and checking their environment

---

## Version Information

- Available since JsMacros 1.8.4 (when Parrots were added to Minecraft)
- Part of the specialized tameable animal helper classes for comprehensive companion management
- Essential tool for parrot taming, training, and companion management systems
- All methods are read-only and query current parrot state and behavior
- Designed specifically for parrot companion management, variant collection, and behavior monitoring
- Inherits comprehensive functionality from the tameable animal hierarchy