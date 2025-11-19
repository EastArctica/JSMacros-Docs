# PandaEntityHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.entity.specialized.passive.PandaEntityHelper`

**Extends:** `AnimalEntityHelper<PandaEntity>`

The `PandaEntityHelper` class provides specialized access to Panda entities in Minecraft, offering comprehensive methods for genetic information, behavioral states, and panda-specific characteristics. This class extends `AnimalEntityHelper`, inheriting breeding functionality, food checking, and animal compatibility while adding panda-specific features like gene analysis, behavior monitoring, and state detection.

Pandas have complex genetic systems that determine their appearance and behavior, with main and hidden genes that can be recessive or dominant. This helper provides full access to genetic information, behavioral states (sneezing, playing, sitting, lying on back), and special conditions like thunderstorm sensitivity and various personality traits (lazy, worried, playful, brown, weak, aggressive).

This helper is essential for scripts that manage panda breeding programs, behavioral monitoring, sanctuary automation, or any functionality that requires interaction with Minecraft's complex panda genetics and behavior system.

## Constructors

PandaEntityHelper instances are not typically created directly by scripters. Instead, they are obtained through:

- Entity-related events (e.g., `EntitySpawn`, `EntityInteract`, `ServiceTick`)
- World entity queries using type filtering for pandas
- Casting from generic EntityHelper instances using `entity.asAnimal()` then accessing panda-specific methods

## Methods

### Genetic Information

- [panda.getMainGene()](#pandagetmaingene)
- [panda.getMainGeneName()](#pandagetmaingenename)
- [panda.isMainGeneRecessive()](#pandaismaingenerecessive)
- [panda.getHiddenGene()](#pandagethiddengene)
- [panda.getHiddenGeneName()](#pandagethiddengenename)
- [panda.isHiddenGeneRecessive()](#pandaishiddenegenerecessive)

### Behavioral States

- [panda.isIdle()](#pandaisidle)
- [panda.isSneezing()](#pandaisneezing)
- [panda.isPlaying()](#pandaisplaying)
- [panda.isSitting()](#pandaisitting)
- [panda.isLyingOnBack()](#pandaislyingonback)

### Genetic Traits

- [panda.isLazy()](#pandaislazy)
- [panda.isWorried()](#pandaisworried)
- [panda.isScaredByThunderstorm()](#pandaiscaredbythunderstorm)
- [panda.isPlayful()](#pandaisplayful)
- [panda.isBrown()](#pandaisbrown)
- [panda.isWeak()](#pandaisweak)
- [panda.isAttacking()](#pandaisattacking)

### Inherited Methods

The PandaEntityHelper inherits all methods from:
- **AnimalEntityHelper:** `isFood()`, `canBreedWith()`
- **MobEntityHelper:** `isAttacking()`, `isAiDisabled()`
- **LivingEntityHelper:** Health, status effects, equipment, movement states
- **EntityHelper:** Position, movement, world interaction, type casting

---

## Genetic Information

### panda.getMainGene()

Returns the ID of this panda's main gene.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    const mainGeneId = panda.getMainGene();
    Chat.log(`Panda main gene ID: ${mainGeneId}`);
}
```

**Returns:** `number` - The ID of the panda's main gene.

### panda.getMainGeneName()

Returns the name of this panda's main gene as a string.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
const geneNames = new Set();

for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    const geneName = panda.getMainGeneName();
    geneNames.add(geneName);
}

Chat.log(`Panda genes found: ${Array.from(geneNames).join(", ")}`);
```

**Returns:** `string` - The name of the panda's main gene (e.g., "normal", "lazy", "worried", "playful", "brown", "weak", "aggressive").

### panda.isMainGeneRecessive()

Returns whether this panda's main gene is recessive.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
let recessiveCount = 0;

for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isMainGeneRecessive()) {
        recessiveCount++;
    }
}

Chat.log(`Pandas with recessive main genes: ${recessiveCount}`);
```

**Returns:** `boolean` - `true` if the main gene is recessive, `false` otherwise.

### panda.getHiddenGene()

Returns the ID of this panda's hidden gene.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    const hiddenGeneId = panda.getHiddenGene();
    Chat.log(`Panda hidden gene ID: ${hiddenGeneId}`);
}
```

**Returns:** `number` - The ID of the panda's hidden gene.

### panda.getHiddenGeneName()

Returns the name of this panda's hidden gene as a string.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    const mainGene = panda.getMainGeneName();
    const hiddenGene = panda.getHiddenGeneName();
    Chat.log(`Panda genes - Main: ${mainGene}, Hidden: ${hiddenGene}`);
}
```

**Returns:** `string` - The name of the panda's hidden gene.

### panda.isHiddenGeneRecessive()

Returns whether this panda's hidden gene is recessive.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
let hiddenRecessiveCount = 0;

for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isHiddenGeneRecessive()) {
        hiddenRecessiveCount++;
    }
}

Chat.log(`Pandas with recessive hidden genes: ${hiddenRecessiveCount}`);
```

**Returns:** `boolean` - `true` if the hidden gene is recessive, `false` otherwise.

---

## Behavioral States

### panda.isIdle()

Returns whether this panda is currently idling.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isIdle()) {
        Chat.log("This panda is relaxing");
        panda.entity.setGlowing(true);
        panda.entity.setGlowingColor(0xFFFF00); // Yellow for idle
    }
}
```

**Returns:** `boolean` - `true` if the panda is idling, `false` otherwise.

### panda.isSneezing()

Returns whether this panda is currently sneezing.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isSneezing()) {
        Chat.log("This panda is sneezing! Achoo!");
        // Pandas can drop slime balls when sneezing
    }
}
```

**Returns:** `boolean` - `true` if the panda is sneezing, `false` otherwise.

### panda.isPlaying()

Returns whether this panda is currently playing.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isPlaying()) {
        Chat.log("This panda is having fun!");
        panda.entity.setGlowing(true);
        panda.entity.setGlowingColor(0x00FF00); // Green for playing
    }
}
```

**Returns:** `boolean` - `true` if the panda is playing, `false` otherwise.

### panda.isSitting()

Returns whether this panda is currently sitting.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isSitting()) {
        Chat.log("This panda is sitting down");
    }
}
```

**Returns:** `boolean` - `true` if the panda is sitting, `false` otherwise.

### panda.isLyingOnBack()

Returns whether this panda is lying on its back.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isLyingOnBack()) {
        Chat.log("This panda is lying on its back");
    }
}
```

**Returns:** `boolean` - `true` if the panda is lying on its back, `false` otherwise.

---

## Genetic Traits

### panda.isLazy()

Returns whether this panda's genes make it lazy.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
let lazyCount = 0;

for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isLazy()) {
        lazyCount++;
        Chat.log("Found a lazy panda!");
    }
}

Chat.log(`Total lazy pandas: ${lazyCount}`);
```

**Returns:** `boolean` - `true` if the panda has lazy genetics, `false` otherwise.

### panda.isWorried()

Returns whether this panda's genes make it worried.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isWorried()) {
        Chat.log("This panda is worried about something");
        // Worried pandas avoid players and shake during thunderstorms
    }
}
```

**Returns:** `boolean` - `true` if the panda has worried genetics, `false` otherwise.

### panda.isScaredByThunderstorm()

Returns whether this panda is scared by an active thunderstorm.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isScaredByThunderstorm()) {
        Chat.log("This panda is scared by thunderstorms");
        // These pandas will hide and shake during storms
    }
}
```

**Returns:** `boolean` - `true` if the panda is scared by thunderstorms, `false` otherwise.

### panda.isPlayful()

Returns whether this panda's genes make it playful.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
let playfulCount = 0;

for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isPlayful()) {
        playfulCount++;
        Chat.log("Found a playful panda!");
    }
}

Chat.log(`Total playful pandas: ${playfulCount}`);
```

**Returns:** `boolean` - `true` if the panda has playful genetics, `false` otherwise.

### panda.isBrown()

Returns whether this panda's genes make it brown.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isBrown()) {
        Chat.log("Found a rare brown panda!");
        panda.entity.setGlowing(true);
        panda.entity.setGlowingColor(0x8B4513); // Brown color
    }
}
```

**Returns:** `boolean` - `true` if the panda has brown genetics, `false` otherwise.

### panda.isWeak()

Returns whether this panda's genes make it weak.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isWeak()) {
        Chat.log("This panda is weak and has trouble following players");
    }
}
```

**Returns:** `boolean` - `true` if the panda has weak genetics, `false` otherwise.

### panda.isAttacking()

Returns whether this panda's genes make it aggressive.

```js
const pandas = World.getEntities().filter(e => e.getType() === "minecraft:panda");
for (const pandaEntity of pandas) {
    const panda = pandaEntity.asAnimal();
    if (panda.isAttacking()) {
        Chat.log("This panda is aggressive! Watch out!");
        panda.entity.setGlowing(true);
        panda.entity.setGlowingColor(0xFF0000); // Red for aggressive
    }
}
```

**Returns:** `boolean` - `true` if the panda has aggressive genetics, `false` otherwise.

---

## Usage Examples

### Panda Genetics Analyzer
```js
// Comprehensive panda genetics and behavior monitoring system
class PandaGeneticsAnalyzer {
    constructor() {
        this.pandaDatabase = new Map();
        this.scanRadius = 50;
        this.lastScan = 0;
        this.scanInterval = 20 * 3; // Every 3 seconds
        this.geneStats = new Map();
        this.behaviorStats = new Map();
        this.initializeStats();
    }

    initializeStats() {
        this.geneStats.set("normal", 0);
        this.geneStats.set("lazy", 0);
        this.geneStats.set("worried", 0);
        this.geneStats.set("playful", 0);
        this.geneStats.set("brown", 0);
        this.geneStats.set("weak", 0);
        this.geneStats.set("aggressive", 0);

        this.behaviorStats.set("idle", 0);
        this.behaviorStats.set("sneezing", 0);
        this.behaviorStats.set("playing", 0);
        this.behaviorStats.set("sitting", 0);
        this.behaviorStats.set("lying_on_back", 0);
    }

    scanPandas() {
        const entities = World.getEntities(this.scanRadius);
        const pandas = [];
        const player = Player.getPlayer();

        if (!player) return pandas;

        entities.forEach(entity => {
            if (entity.getType() === "minecraft:panda") {
                const uuid = entity.getUUID();
                const distance = player.distanceTo(entity);
                const panda = entity.asAnimal();
                const position = entity.getPos();

                const pandaData = {
                    uuid: uuid,
                    entity: entity,
                    panda: panda,
                    distance: distance,
                    position: position,
                    mainGene: panda.getMainGeneName(),
                    hiddenGene: panda.getHiddenGeneName(),
                    mainGeneId: panda.getMainGene(),
                    hiddenGeneId: panda.getHiddenGene(),
                    isMainRecessive: panda.isMainGeneRecessive(),
                    isHiddenRecessive: panda.isHiddenGeneRecessive(),
                    lastSeen: Client.getTime()
                };

                // Behavioral states
                pandaData.behaviors = {
                    idle: panda.isIdle(),
                    sneezing: panda.isSneezing(),
                    playing: panda.isPlaying(),
                    sitting: panda.isSitting(),
                    lyingOnBack: panda.isLyingOnBack()
                };

                // Genetic traits
                pandaData.traits = {
                    lazy: panda.isLazy(),
                    worried: panda.isWorried(),
                    scaredByThunderstorm: panda.isScaredByThunderstorm(),
                    playful: panda.isPlayful(),
                    brown: panda.isBrown(),
                    weak: panda.isWeak(),
                    aggressive: panda.isAttacking()
                };

                pandas.push(pandaData);
                this.pandaDatabase.set(uuid, pandaData);
            }
        });

        // Clean up pandas that are no longer in range
        const currentUUIDs = new Set(pandas.map(p => p.uuid));
        for (const [uuid, pandaData] of this.pandaDatabase) {
            if (!currentUUIDs.has(uuid) && (Client.getTime() - pandaData.lastSeen > 120000)) {
                this.pandaDatabase.delete(uuid);
            }
        }

        return pandas;
    }

    analyzeGenetics(pandas) {
        this.resetStats();

        // Count main genes
        for (const pandaData of pandas) {
            this.geneStats.set(pandaData.mainGene, (this.geneStats.get(pandaData.mainGene) || 0) + 1);

            // Count behaviors
            if (pandaData.behaviors.idle) this.behaviorStats.set("idle", this.behaviorStats.get("idle") + 1);
            if (pandaData.behaviors.sneezing) this.behaviorStats.set("sneezing", this.behaviorStats.get("sneezing") + 1);
            if (pandaData.behaviors.playing) this.behaviorStats.set("playing", this.behaviorStats.get("playing") + 1);
            if (pandaData.behaviors.sitting) this.behaviorStats.set("sitting", this.behaviorStats.get("sitting") + 1);
            if (pandaData.behaviors.lyingOnBack) this.behaviorStats.set("lying_on_back", this.behaviorStats.get("lying_on_back") + 1);
        }

        // Count genetic traits
        let lazyCount = 0, worriedCount = 0, playfulCount = 0;
        let brownCount = 0, weakCount = 0, aggressiveCount = 0;
        let thunderstormScaredCount = 0;

        for (const pandaData of pandas) {
            if (pandaData.traits.lazy) lazyCount++;
            if (pandaData.traits.worried) worriedCount++;
            if (pandaData.traits.playful) playfulCount++;
            if (pandaData.traits.brown) brownCount++;
            if (pandaData.traits.weak) weakCount++;
            if (pandaData.traits.aggressive) aggressiveCount++;
            if (pandaData.traits.scaredByThunderstorm) thunderstormScaredCount++;
        }

        return {
            mainGenes: new Map(this.geneStats),
            behaviors: new Map(this.behaviorStats),
            traits: {
                lazy: lazyCount,
                worried: worriedCount,
                playful: playfulCount,
                brown: brownCount,
                weak: weakCount,
                aggressive: aggressiveCount,
                thunderstormScared: thunderstormScaredCount
            },
            total: pandas.length
        };
    }

    resetStats() {
        for (const [key] of this.geneStats) {
            this.geneStats.set(key, 0);
        }
        for (const [key] of this.behaviorStats) {
            this.behaviorStats.set(key, 0);
        }
    }

    findRarePandas(pandas) {
        const rarePandas = [];

        for (const pandaData of pandas) {
            let rarityScore = 0;
            const rareTraits = [];

            // Brown pandas are rare
            if (pandaData.traits.brown) {
                rarityScore += 3;
                rareTraits.push("Brown");
            }

            // Check for recessive genes
            if (pandaData.isMainRecessive) {
                rarityScore += 1;
                rareTraits.push("Recessive Main Gene");
            }
            if (pandaData.isHiddenRecessive) {
                rarityScore += 1;
                rareTraits.push("Recessive Hidden Gene");
            }

            // Aggressive pandas are less common
            if (pandaData.traits.aggressive) {
                rarityScore += 2;
                rareTraits.push("Aggressive");
            }

            // Unique gene combinations
            if (pandaData.mainGene !== pandaData.hiddenGene) {
                rarityScore += 1;
                rareTraits.push(`Mixed Genes: ${pandaData.mainGene}/${pandaData.hiddenGene}`);
            }

            if (rarityScore >= 2) {
                rarePandas.push({
                    ...pandaData,
                    rarityScore: rarityScore,
                    rareTraits: rareTraits
                });
            }
        }

        return rarePandas.sort((a, b) => b.rarityScore - a.rarityScore);
    }

    highlightBehaviorStates(pandas) {
        // Clear previous highlights
        for (const pandaData of pandas) {
            pandaData.entity.resetGlowing();
        }

        // Color code based on behavior
        for (const pandaData of pandas) {
            let glowColor = null;
            let reason = "";

            if (pandaData.behaviors.sneezing) {
                glowColor = 0x00FFFF; // Cyan for sneezing
                reason = "Sneezing";
            } else if (pandaData.behaviors.playing) {
                glowColor = 0x00FF00; // Green for playing
                reason = "Playing";
            } else if (pandaData.behaviors.idle) {
                glowColor = 0xFFFF00; // Yellow for idle
                reason = "Idle";
            } else if (pandaData.behaviors.lyingOnBack) {
                glowColor = 0xFF8C00; // Orange for lying on back
                reason = "Lying on back";
            }

            if (glowColor) {
                pandaData.entity.setGlowing(true);
                pandaData.entity.setGlowingColor(glowColor);
                // Optional: Set a custom name or floating text above
            }
        }
    }

    generateGeneticsReport() {
        const pandas = Array.from(this.pandaDatabase.values());
        if (pandas.length === 0) {
            Chat.log("&7No pandas found in range");
            return;
        }

        const analysis = this.analyzeGenetics(pandas);
        const rarePandas = this.findRarePandas(pandas);

        Chat.log("=== Panda Genetics Report ===");
        Chat.log(`&6Total pandas scanned: ${analysis.total}`);

        // Main gene distribution
        Chat.log("\n&eMain Gene Distribution:");
        for (const [gene, count] of analysis.mainGenes) {
            if (count > 0) {
                const percentage = ((count / analysis.total) * 100).toFixed(1);
                Chat.log(`  ${gene}: ${count} (${percentage}%)`);
            }
        }

        // Current behaviors
        Chat.log("\n&eCurrent Behaviors:");
        for (const [behavior, count] of analysis.behaviors) {
            if (count > 0) {
                Chat.log(`  ${behavior.replace('_', ' ')}: ${count}`);
            }
        }

        // Genetic traits
        Chat.log("\n&eGenetic Traits:");
        const traits = analysis.traits;
        Chat.log(`  Lazy: ${traits.lazy}`);
        Chat.log(`  Worried: ${traits.worried}`);
        Chat.log(`  Playful: ${traits.playful}`);
        Chat.log(`  Brown: ${traits.brown} &6(Rare!)`);
        Chat.log(`  Weak: ${traits.weak}`);
        Chat.log(`  Aggressive: ${traits.aggressive}`);
        Chat.log(`  Scared by thunderstorms: ${traits.thunderstormScared}`);

        // Rare pandas section
        if (rarePandas.length > 0) {
            Chat.log("\n&6Rare pandas found:");
            rarePandas.slice(0, 5).forEach((pandaData, index) => {
                Chat.log(`  ${index + 1}. Rarity Score: ${pandaData.rarityScore}`);
                Chat.log(`     Traits: ${pandaData.rareTraits.join(", ")}`);
                Chat.log(`     Distance: ${pandaData.distance.toFixed(1)}m`);
            });
        }

        // Breeding suggestions
        this.generateBreedingSuggestions(pandas);
    }

    generateBreedingSuggestions(pandas) {
        if (pandas.length < 2) return;

        Chat.log("\n&eBreeding Suggestions:");

        // Find pandas with desirable traits for breeding
        const brownPandas = pandas.filter(p => p.traits.brown);
        const aggressivePandas = pandas.filter(p => p.traits.aggressive);
        const lazyPandas = pandas.filter(p => p.traits.lazy);

        if (brownPandas.length > 0) {
            Chat.log(`  &6Brown pandas available for breeding: ${brownPandas.length}`);
            Chat.log("     Breed brown pandas to increase chance of brown offspring");
        }

        if (aggressivePandas.length > 0) {
            Chat.log(`  &cAggressive pandas available for breeding: ${aggressivePandas.length}`);
            Chat.log("     Note: Aggressive trait can be passed to offspring");
        }

        if (lazyPandas.length > 0) {
            Chat.log(`  &eLazy pandas available for breeding: ${lazyPandas.length}`);
            Chat.log("     Lazy pandas move less frequently");
        }

        // Suggest breeding pairs with complementary genes
        const compatiblePairs = [];
        for (let i = 0; i < pandas.length; i++) {
            for (let j = i + 1; j < pandas.length; j++) {
                const panda1 = pandas[i];
                const panda2 = pandas[j];
                const distance = panda1.position.distanceTo(panda2.position);

                if (distance < 20) { // Close enough for breeding
                    compatiblePairs.push({
                        panda1: panda1,
                        panda2: panda2,
                        distance: distance,
                        geneCombination: `${panda1.mainGene}/${panda1.hiddenGene} × ${panda2.mainGene}/${panda2.hiddenGene}`
                    });
                }
            }
        }

        if (compatiblePairs.length > 0) {
            Chat.log(`  Available breeding pairs nearby: ${compatiblePairs.length}`);
            compatiblePairs.slice(0, 3).forEach((pair, index) => {
                Chat.log(`    ${index + 1}. ${pair.geneCombination} (${pair.distance.toFixed(1)}m apart)`);
            });
        }
    }

    update() {
        if (Client.getTime() - this.lastScan < this.scanInterval) return;

        this.lastScan = Client.getTime();
        const pandas = this.scanPandas();
        this.highlightBehaviorStates(pandas);
    }
}

// Initialize panda genetics analyzer
const pandaAnalyzer = new PandaGeneticsAnalyzer();

// Update system every 3 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    pandaAnalyzer.update();
}));

// Generate report every 30 seconds
events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % (20 * 30) === 0) {
        pandaAnalyzer.generateGeneticsReport();
    }
}));

Chat.log("&aPanda Genetics Analyzer activated!");
Chat.log("&7Monitoring panda genetics, behaviors, and breeding opportunities...");
```

### Panda Behavior Monitor
```js
// Simple panda behavior tracking and alert system
class PandaBehaviorMonitor {
    constructor() {
        this.pandaStates = new Map();
        this.monitorRadius = 32;
        this.alertCooldown = new Map();
        this.cooldownTime = 5000; // 5 seconds between alerts for same behavior
    }

    monitorPandas() {
        const entities = World.getEntities(this.monitorRadius);
        const currentTime = Client.getTime();

        entities.forEach(entity => {
            if (entity.getType() === "minecraft:panda") {
                const uuid = entity.getUUID();
                const panda = entity.asAnimal();
                const position = entity.getPos();
                const player = Player.getPlayer();

                if (!player) return;

                const currentStates = {
                    sneezing: panda.isSneezing(),
                    playing: panda.isPlaying(),
                    lyingOnBack: panda.isLyingOnBack()
                };

                const previousStates = this.pandaStates.get(uuid) || {};

                // Check for state changes and alert
                if (currentStates.sneezing && !previousStates.sneezing) {
                    this.sendAlert("Panda is sneezing! Watch for slime balls!", entity, 0x00FFFF);
                }

                if (currentStates.playing && !previousStates.playing) {
                    this.sendAlert("Panda started playing!", entity, 0x00FF00);
                }

                if (currentStates.lyingOnBack && !previousStates.lyingOnBack) {
                    this.sendAlert("Panda is lying on its back", entity, 0xFF8C00);
                }

                this.pandaStates.set(uuid, currentStates);
            }
        });
    }

    sendAlert(message, entity, color) {
        const currentTime = Date.now();
        const uuid = entity.getUUID();

        if (!this.alertCooldown.has(uuid) || currentTime - this.alertCooldown.get(uuid) > this.cooldownTime) {
            Chat.actionbar(message);
            entity.setGlowing(true);
            entity.setGlowingColor(color);

            // Remove glow after a short time
            setTimeout(() => {
                entity.resetGlowing();
            }, 3000);

            this.alertCooldown.set(uuid, currentTime);
        }
    }
}

const pandaMonitor = new PandaBehaviorMonitor();

events.on("Tick", JavaWrapper.methodToJavaAsync((event) => {
    if (Client.getTime() % 40 === 0) { // Every 2 seconds
        pandaMonitor.monitorPandas();
    }
}));

Chat.log("&aPanda Behavior Monitor activated!");
```

## Notes and Limitations

- PandaEntityHelper instances become invalid when the panda entity is removed from the world. Always check `isAlive()` before accessing panda data.
- Panda genetics follow Minecraft's complex inheritance system with dominant and recessive genes. Both main and hidden genes affect the panda's appearance and behavior.
- Main gene determines the panda's visible traits, while hidden gene can be passed to offspring and may become the main gene in future generations.
- Brown pandas are rare variants that can only be obtained through breeding or finding them naturally spawned.
- Pandas with the "weak" trait will occasionally sit and shake, making them less reliable for following players.
- Worried pandas will actively avoid players and hide during thunderstorms.
- Aggressive pandas will attack players and other mobs that attack them, unlike normal pandas.
- Sneezing pandas can occasionally drop slime balls, which is useful for slime farming.
- The genetic traits (lazy, worried, playful, brown, weak, aggressive) are determined by both main and hidden genes.
- Behavior states like playing, sitting, and lying on back are temporary and can change frequently.
- Distance calculations and behavioral monitoring are important for effective panda sanctuary management.
- Thunderstorm sensitivity affects worried pandas regardless of their current distance from the storm.

## Related Classes

- `AnimalEntityHelper` - Base class for animal entities with breeding and food functionality
- `MobEntityHelper` - Base class for mob entities with AI and combat functionality
- `LivingEntityHelper` - Living entity functionality including health and status effects
- `EntityHelper` - Base entity functionality for position, movement, and world interaction
- Other animal helpers like `FoxEntityHelper`, `CatEntityHelper`, `WolfEntityHelper` for species-specific functionality

## Version Information

- Available since JSMacros 1.8.4
- Part of the specialized passive animal helper classes for enhanced entity type support
- All methods delegate to the underlying Minecraft PandaEntity implementation
- Inherits comprehensive functionality from the animal entity hierarchy
- Designed specifically for panda genetics analysis, sanctuary management, and behavioral monitoring
- Supports full access to Minecraft's complex panda genetic system

---

**See Also:**
- [EntityHelper.asAnimal()](F:/java/JsMacros/JsMacros-Docs/classes/entity-helpers/EntityHelper.md#entityasanimal) - Method to cast entities to AnimalEntityHelper
- [AnimalEntityHelper](F:/java/JsMacros/JsMacros-Docs/classes/entity-helpers/animals-and-passive-mobs/AnimalEntityHelper.md) - Animal entity base class
- [LivingEntityHelper](F:/java/JsMacros/JsMacros-Docs/classes/entity-helpers/LivingEntityHelper.md) - Living entity base class
- [MobEntityHelper](F:/java/JsMacros/JsMacros-Docs/classes/entity-helpers/MobEntityHelper.md) - Mob entity base class