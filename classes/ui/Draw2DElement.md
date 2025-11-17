# Draw2DElement

A wrapper element that allows embedding one Draw2D overlay within another. Draw2DElement enables complex layouts by treating one Draw2D instance as a renderable element within another overlay. This is useful for creating modular HUDs, nested interfaces, and reusable overlay components.

## Fields
- [Draw2DElement.draw2D](#draw2delementdraw2d)

## Methods
- [Draw2DElement.getDraw2D](#draw2delementgetdraw2d)

## Fields

### Draw2DElement.draw2D
The Draw2D instance that this element wraps and renders.

**Type**
* `Draw2D`

## Methods

### Draw2DElement.getDraw2D
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();
const element = parentOverlay.addDraw2D(childOverlay, 10, 10, 100, 100);

const retrievedDraw2D = element.getDraw2D();
// retrievedDraw2D === childOverlay is true
```

**Params**
* `(none)`

**Returns**
* `Draw2D`: The Draw2D instance wrapped by this element.

## Creation Methods

Draw2DElement instances are typically created through the following Draw2D methods:

### Draw2D.addDraw2D
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();

// Add child overlay to parent
const element = parentOverlay.addDraw2D(childOverlay, 50, 50, 200, 200);
```

### Draw2D.draw2DBuilder
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();

// Using builder pattern
const element = parentOverlay.draw2DBuilder(childOverlay)
    .pos(100, 100)
    .size(300, 200)
    .zIndex(5)
    .build();
```

## Properties

### Position and Size
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();
const element = parentOverlay.addDraw2D(childOverlay, 50, 50, 200, 200);

// Draw2DElement inherits positioning from RenderElement
const x = element.getScaledLeft();
const y = element.getScaledTop();
const width = element.getScaledWidth();
const height = element.getScaledHeight();

Chat.log(`Element at (${x}, ${y}) with size ${width}x${height}`);
```

### Z-Index
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();

// Add with specific z-index
const element = parentOverlay.addDraw2D(childOverlay, 50, 50, 200, 200, 10);
const zIndex = element.getZIndex(); // Returns 10
```

### Parent Relationship
```js
const parentOverlay = Hud.createDraw2D();
const childOverlay = Hud.createDraw2D();
const element = parentOverlay.addDraw2D(childOverlay, 50, 50, 200, 200);

// Get parent width and height for relative positioning
const parentWidth = element.getParentWidth();
const parentHeight = element.getParentHeight();

Chat.log(`Parent size: ${parentWidth}x${parentHeight}`);
```

## Examples

### Modular HUD Components
```js
function createHealthBar() {
    const healthBar = Hud.createDraw2D();

    healthBar.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Background
        draw2d.addRect(0, 0, 204, 24, 0x000000, 200);

        // Health text
        draw2d.addText("Health", 5, 5, 0xFFFFFF, true);

        // Health bar background
        draw2d.addRect(50, 5, 200, 20, 0x404040);

        // Current health bar
        const player = Player.getPlayer();
        if (player) {
            const healthPercent = player.getHealth() / player.getMaxHealth();
            const healthWidth = Math.floor(194 * healthPercent);
            draw2d.addRect(53, 8, 53 + healthWidth, 17, 0xFF0000);
        }
    }));

    return healthBar;
}

function createManaBar() {
    const manaBar = Hud.createDraw2D();

    manaBar.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Background
        draw2d.addRect(0, 0, 204, 24, 0x000000, 200);

        // Mana text
        draw2d.addText("Mana", 5, 5, 0xFFFFFF, true);

        // Mana bar background
        draw2d.addRect(50, 5, 200, 20, 0x404040);

        // Current mana bar (simulate mana system)
        const manaPercent = 0.75; // 75% mana
        const manaWidth = Math.floor(194 * manaPercent);
        draw2d.addRect(53, 8, 53 + manaWidth, 17, 0x0000FF);
    }));

    return manaBar;
}

// Combine components into main HUD
function createModularHUD() {
    const mainHUD = Hud.createDraw2D();

    mainHUD.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Main background
        draw2d.addRect(5, 5, 220, 60, 0x000000, 180);

        // Add health bar component
        const healthBar = createHealthBar();
        const healthElement = draw2d.addDraw2D(healthBar, 10, 10, 200, 24);

        // Add mana bar component
        const manaBar = createManaBar();
        const manaElement = draw2d.addDraw2D(manaBar, 10, 35, 200, 24);
    }));

    mainHUD.register();
    return mainHUD;
}

const modularHUD = createModularHUD();
```

### Reusable UI Panels
```js
function createPlayerInfoPanel() {
    const panel = Hud.createDraw2D();

    panel.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Panel background
        draw2d.addRect(0, 0, 200, 100, 0x202020, 220);
        draw2d.addRect(0, 0, 200, 100, 0xFFFFFF); // Border

        // Panel title
        draw2d.addText("Player Info", 5, 5, 0xFFFFFF, true);

        // Dynamic player information
        const player = Player.getPlayer();
        if (player) {
            draw2d.addText(`Health: ${player.getHealth()}/${player.getMaxHealth()}`, 5, 20, 0xFF0000, true);
            draw2d.addText(`Hunger: ${player.getHunger()}/20`, 5, 35, 0xFFFF00, true);
            draw2d.addText(`Level: ${player.getLevel()}`, 5, 50, 0x00FF00, true);
            draw2d.addText(`XP: ${player.getExperience()}`, 5, 65, 0x00FFFF, true);

            // Current dimension
            draw2d.addText(`Dimension: ${player.getDimension().getId()}`, 5, 80, 0xFF00FF, true);
        }
    }));

    return panel;
}

function createInventoryPanel() {
    const panel = Hud.createDraw2D();

    panel.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Panel background
        draw2d.addRect(0, 0, 200, 80, 0x202020, 220);
        draw2d.addRect(0, 0, 200, 80, 0xFFFFFF); // Border

        // Panel title
        draw2d.addText("Inventory", 5, 5, 0xFFFFFF, true);

        // Show hotbar items count
        const player = Player.getPlayer();
        if (player && player.getInventory()) {
            let itemCount = 0;
            const inventory = player.getInventory();

            for (let i = 0; i < 9; i++) {
                const stack = inventory.getStack(i);
                if (stack) {
                    itemCount += stack.getCount();
                }
            }

            draw2d.addText(`Hotbar Items: ${itemCount}`, 5, 25, 0xFFFFFF, true);

            // Show armor slots status
            const head = inventory.getArmor(3);
            const chest = inventory.getArmor(2);
            const legs = inventory.getArmor(1);
            const feet = inventory.getArmor(0);

            draw2d.addText(`Armor: ${head ? '✓' : '✗'} ${chest ? '✓' : '✗'} ${legs ? '✓' : '✗'} ${feet ? '✓' : '✗'}`, 5, 45, 0xFFFFFF, true);

            // Show current held item
            const heldItem = player.getMainHandStack();
            if (heldItem) {
                draw2d.addText(`Holding: ${heldItem.getName().getString()}`, 5, 60, 0xFFFF00, true);
            }
        }
    }));

    return panel;
}

function createDashboard() {
    const dashboard = Hud.createDraw2D();

    dashboard.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Dashboard background
        draw2d.addRect(5, 5, 420, 110, 0x101010, 200);

        // Add player info panel
        const playerPanel = createPlayerInfoPanel();
        draw2d.addDraw2D(playerPanel, 10, 10, 200, 100);

        // Add inventory panel
        const inventoryPanel = createInventoryPanel();
        draw2d.addDraw2D(inventoryPanel, 220, 10, 200, 100);
    }));

    // Update panels periodically
    setInterval(() => {
        // Re-initialize to refresh data
        dashboard.init();
    }, 1000);

    dashboard.register();
    return dashboard;
}

const dashboard = createDashboard();
```

### Tabbed Interface
```js
function createTabContainer() {
    const container = Hud.createDraw2D();

    // Tab content overlays
    const tabContents = {
        general: Hud.createDraw2D(),
        stats: Hud.createDraw2D(),
        inventory: Hud.createDraw2D()
    };

    // Setup tab content
    tabContents.general.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        draw2d.addRect(0, 30, 400, 200, 0x202020, 200);
        draw2d.addText("General Information", 10, 40, 0xFFFFFF, true);
        draw2d.addText(`Game Time: ${World.getTime() % 24000}`, 10, 60, 0xFFFFFF, true);
        draw2d.addText(`Day: ${Math.floor(World.getTime() / 24000)}`, 10, 80, 0xFFFFFF, true);
        draw2d.addText(`FPS: ${Client.getFPS()}`, 10, 100, 0xFFFFFF, true);
    }));

    tabContents.stats.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        draw2d.addRect(0, 30, 400, 200, 0x202020, 200);
        draw2d.addText("Statistics", 10, 40, 0xFFFFFF, true);

        const player = Player.getPlayer();
        if (player) {
            draw2d.addText(`Health: ${player.getHealth()}/${player.getMaxHealth()}`, 10, 60, 0xFF0000, true);
            draw2d.addText(`Hunger: ${player.getHunger()}/20`, 10, 80, 0xFFFF00, true);
            draw2d.addText(`XP Level: ${player.getLevel()}`, 10, 100, 0x00FF00, true);
            draw2d.addText(`Experience: ${player.getExperience()}`, 10, 120, 0x00FFFF, true);
        }
    }));

    tabContents.inventory.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        draw2d.addRect(0, 30, 400, 200, 0x202020, 200);
        draw2d.addText("Inventory Overview", 10, 40, 0xFFFFFF, true);

        const player = Player.getPlayer();
        if (player && player.getInventory()) {
            const inventory = player.getInventory();
            let totalItems = 0;

            // Count items in hotbar and main inventory
            for (let i = 0; i < 36; i++) {
                const stack = inventory.getStack(i);
                if (stack) {
                    totalItems += stack.getCount();
                }
            }

            draw2d.addText(`Total Items: ${totalItems}`, 10, 60, 0xFFFFFF, true);

            // Show some key items
            const keyItems = ["minecraft:diamond", "minecraft:gold_ingot", "minecraft:iron_ingot"];
            keyItems.forEach((itemId, index) => {
                const item = inventory.find(itemId);
                if (item) {
                    draw2d.addItem(10 + index * 50, 80, item, false, 2.0, 0);
                    draw2d.addText(`${item.getCount()}`, 25 + index * 50, 110, 0xFFFFFF, true);
                }
            });
        }
    }));

    let currentTab = 'general';
    let currentElement = null;

    container.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Main background
        draw2d.addRect(5, 5, 410, 240, 0x000000, 200);

        // Tab buttons
        const tabs = ['general', 'stats', 'inventory'];
        tabs.forEach((tabName, index) => {
            const x = 10 + index * 80;
            const y = 10;
            const width = 75;
            const height = 25;

            // Tab background (highlight current tab)
            if (tabName === currentTab) {
                draw2d.addRect(x, y, x + width, y + height, 0x404040, 255);
                draw2d.addText(tabName.toUpperCase(), x + 20, y + 8, 0x00FF00, true);
            } else {
                draw2d.addRect(x, y, x + width, y + height, 0x202020, 255);
                draw2d.addText(tabName.toUpperCase(), x + 20, y + 8, 0xFFFFFF, true);
            }
        });

        // Remove previous tab content
        if (currentElement) {
            draw2d.removeDraw2D(currentElement);
        }

        // Add current tab content
        currentElement = draw2d.addDraw2D(tabContents[currentTab], 10, 40, 400, 200);
    }));

    // Handle tab switching (this would need input handling in a real implementation)
    function switchTab(tabName) {
        if (tabContents[tabName]) {
            currentTab = tabName;
            container.init(); // Re-render with new tab
        }
    }

    // Example: Cycle through tabs every 5 seconds
    const tabs = ['general', 'stats', 'inventory'];
    let tabIndex = 0;

    setInterval(() => {
        tabIndex = (tabIndex + 1) % tabs.length;
        switchTab(tabs[tabIndex]);
    }, 5000);

    container.register();
    return container;
}

const tabInterface = createTabContainer();
```

### Scrollable Content Area
```js
function createScrollablePanel(contentHeight) {
    const panel = Hud.createDraw2D();

    // Scrollbar elements
    let scrollPosition = 0;
    const maxScroll = Math.max(0, contentHeight - 150); // 150 is visible height

    panel.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Panel background
        draw2d.addRect(0, 0, 220, 170, 0x202020, 220);
        draw2d.addRect(0, 0, 220, 170, 0xFFFFFF); // Border

        // Content area with clipping (simulated by adjusting positions)
        const contentStart = -scrollPosition;

        // Sample content
        const sampleContent = [
            "Line 1: Introduction",
            "Line 2: This is scrollable content",
            "Line 3: You can add many lines",
            "Line 4: And scroll through them",
            "Line 5: Using Draw2DElement",
            "Line 6: For complex layouts",
            "Line 7: This demonstrates",
            "Line 8: How to create",
            "Line 9: Scrollable interfaces",
            "Line 10: With nested overlays"
        ];

        // Draw content
        sampleContent.forEach((text, index) => {
            const y = 25 + index * 15 + contentStart;
            if (y >= 25 && y <= 145) { // Only draw if visible
                draw2d.addText(text, 10, y, 0xFFFFFF, true);
            }
        });

        // Scrollbar background
        draw2d.addRect(200, 10, 210, 160, 0x404040);

        // Scrollbar thumb
        const thumbHeight = Math.max(20, Math.floor(140 * 150 / contentHeight));
        const thumbY = 10 + Math.floor((130 - thumbHeight) * scrollPosition / maxScroll);
        draw2d.addRect(200, thumbY, 210, thumbY + thumbHeight, 0x808080);
    }));

    // Method to set scroll position
    panel.setScrollPosition = function(position) {
        scrollPosition = Math.max(0, Math.min(maxScroll, position));
        panel.init(); // Re-render with new scroll position
    };

    return panel;
}

function createScrollingDemo() {
    const demo = Hud.createDraw2D();

    demo.setOnInit(JavaWrapper.methodToJava((draw2d) => {
        // Demo background
        draw2d.addRect(50, 50, 250, 200, 0x000000, 200);

        // Create scrollable panel
        const scrollablePanel = createScrollablePanel(300); // 300 pixels of content
        draw2d.addDraw2D(scrollablePanel, 60, 60, 220, 170);

        // Scroll controls
        draw2d.addText("Scrollable Content Demo", 60, 35, 0xFFFFFF, true);

        // Add scroll buttons (in a real implementation, these would handle input)
        draw2d.addRect(270, 100, 290, 120, 0x404040);
        draw2d.addText("▲", 276, 105, 0xFFFFFF, true);

        draw2d.addRect(270, 180, 290, 200, 0x404040);
        draw2d.addText("▼", 276, 185, 0xFFFFFF, true);
    }));

    // Simulate scrolling
    let scrollPos = 0;
    setInterval(() => {
        scrollPos = (scrollPos + 2) % 150;
        // In a real implementation, you'd access the panel and call setScrollPosition
    }, 100);

    demo.register();
    return demo;
}

const scrollingDemo = createScrollingDemo();
```

**Notes**
- Draw2DElement enables creating complex, modular UI layouts
- Each nested Draw2D maintains its own coordinate system within the parent
- Use for reusable UI components like panels, tabs, and status bars
- Elements can be dynamically added, removed, and repositioned
- Useful for creating responsive layouts and scrolling content areas
- Remember that each Draw2D has its own initialization lifecycle
- Performance consideration: deeply nested Draw2D elements can impact rendering performance
- Use z-index to control rendering order of nested elements
- The parent Draw2D clips the child's rendering to the specified bounds