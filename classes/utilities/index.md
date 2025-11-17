# Utility Classes

This section contains the essential utility classes that script writers frequently use for common tasks like mathematical operations, file handling, networking, text processing, and utility functions. These classes are the "bread and butter" of JsMacros scripting.

## Core Utilities

### [Utils](Utils.md)
General utility functions for everyday scripting tasks.
- **Clipboard Operations**: `copyToClipboard()`, `getClipboard()`
- **File Management**: `openFile()`, `openUrl()`
- **Text Processing**: `guessName()`, `guessNameAndRoles()`
- **Security**: `hashString()`, `encode()`, `decode()`
- **Error Handling**: `requireNonNull()`

*Perfect for: Data processing, file management, security operations, and system integration.*

## Mathematics and Positioning

### [Vec2D](Vec2D.md)
2D vector operations for 2D space calculations.
- **Vector Operations**: `add()`, `multiply()`, `scale()`, `normalize()`
- **Math Functions**: `getMagnitude()`, `dotProduct()`, `reverse()`
- **Position Methods**: `getStart()`, `getEnd()`, `getDeltaX()`, `getDeltaY()`

*Perfect for: 2D movement calculations, screen positioning, UI element placement.*

### [Vec3D](Vec3D.md)
3D vector operations for 3D space calculations and spatial reasoning.
- **3D Operations**: Extends Vec2D with Z-coordinate support
- **Angles**: `getPitch()`, `getYaw()`
- **Advanced Math**: `crossProduct()`, 3D normalization
- **Integration**: `toMojangFloatVector()`, `toBlockPos()`

*Perfect for: Player movement, projectile trajectories, 3D geometry, spatial calculations.*

### [Pos2D](Pos2D.md)
2D position representation with comprehensive arithmetic operations.
- **Coordinate Operations**: `add()`, `sub()`, `multiply()`, `divide()`
- **Vector Creation**: `toVector()`, `toReverseVector()`
- **Conversions**: `to3D()` for 3D compatibility

*Perfect for: Screen coordinates, UI positioning, grid calculations, 2D pathfinding.*

### [Pos3D](Pos3D.md)
3D position representation for world coordinates and spatial operations.
- **3D Coordinates**: Full X, Y, Z coordinate support
- **World Integration**: `toBlockPos()`, `toMojangDoubleVector()`
- **Arithmetic**: Complete 3D mathematical operations
- **Vector Methods**: Comprehensive 3D vector creation

*Perfect for: World coordinates, entity positions, block operations, 3D pathfinding.*

### [Box](Box.md)
3D bounding boxes for rendering and spatial operations.
- **Visual Rendering**: Outline and filled boxes with colors/transparency
- **Position Control**: Block highlighting, point-based positioning
- **Builder Pattern**: Fluent API for easy construction
- **Customization**: Colors, alpha blending, fill options

*Perfect for: Block highlighting, area visualization, building previews, spatial debugging.*

## Text and Formatting

### [TextHelper](TextHelper.md)
Minecraft text component processing and manipulation.
- **Content Access**: `getString()`, `getStringStripFormatting()`, `getJson()`
- **Text Processing**: Formatting analysis, content extraction
- **Integration**: Works with chat events and text components
- **Utilities**: `withoutFormatting()`, `visit()` for traversal

*Perfect for: Chat processing, message analysis, content extraction, text filtering.*

### [FormattingHelper](FormattingHelper.md)
Minecraft formatting codes and color management.
- **Color Information**: `getColorValue()`, `getColorIndex()`, `getName()`
- **Formatting Types**: `isColor()`, `isModifier()`, `getCode()`
- **Color Reference**: Complete RGB values for all 16 Minecraft colors
- **Integration**: Works with styling systems and text formatting

*Perfect for: Custom chat formatting, color systems, theme management, text styling.*

## Direction and Navigation

### [DirectionHelper](DirectionHelper.md)
Cardinal and intercardinal direction management.
- **Direction Properties**: `getName()`, `getAxis()`, `isVertical()`, `isHorizontal()`
- **Angle Information**: `getYaw()`, `getPitch()`
- **Directional Relationships**: `getOpposite()`, `getLeft()`, `getRight()`
- **Navigation**: `getVector()`, `pointsTo()`

*Perfect for: Navigation systems, building automation, directional calculations, player movement.*

## Common Use Cases

### 🎮 Gaming and Automation
- **Player Movement**: Use `Pos3D` and `Vec3D` for movement calculations
- **Block Operations**: Use `Pos3D.toBlockPos()` and `Box` for block highlighting
- **Chat Processing**: Use `TextHelper` and `FormattingHelper` for message analysis
- **Navigation**: Use `DirectionHelper` for directional operations

### 🎨 UI and Rendering
- **Screen Positioning**: Use `Pos2D` for UI element placement
- **Visual Indicators**: Use `Box` for highlighting and area visualization
- **Text Formatting**: Use `FormattingHelper` for styled chat messages
- **2D Calculations**: Use `Vec2D` for screen-based mathematics

### 🔧 System Integration
- **File Operations**: Use `Utils.openFile()` and clipboard functions
- **Data Processing**: Use `Utils.hashString()` and encoding functions
- **Error Handling**: Use `Utils.requireNonNull()` for input validation
- **Web Integration**: Use `Utils.openUrl()` for external links

### 🏗️ Building and Construction
- **Area Planning**: Use `Box` for visualizing building areas
- **Pattern Creation**: Use `Pos3D` and `Vec3D` for geometric patterns
- **Block Placement**: Use `DirectionHelper` for directional building
- **Measurement**: Use vector math for distance and angle calculations

## Integration Examples

### Complete Chat System
```javascript
// Combine multiple utilities for a comprehensive system
jsmacros.on("RecvMessage", JavaWrapper.methodToJava((event) => {
    let textHelper = event.message;
    let cleanText = textHelper.getStringStripFormatting();

    // Check for mentions
    let playerName = Player.getPlayer().getName();
    if (cleanText.includes(playerName)) {
        // Copy to clipboard
        Utils.copyToClipboard(cleanText);

        // Create formatted response
        let response = Chat.createTextHelperFromJSON(`{
            "text": "Mentioned: ",
            "color": "yellow"
        }`);

        Chat.say(response);
    }

    // Analyze formatting
    textHelper.visit(JavaWrapper.methodToJava((style, text) => {
        if (style.getColor() !== "white") {
            console.log(`Colored text: ${text} in ${style.getColor()}`);
        }
    }));
}));
```

### 3D Navigation System
```javascript
// Calculate path to target
function navigateToTarget(targetPos) {
    let player = Player.getPlayer();
    let playerPos = player.getPos();
    let direction = playerPos.toVector(targetPos);

    // Get movement direction
    let normalized = direction.normalize();
    let facing = player.getHorizontalFacing();

    console.log(`Distance: ${direction.getMagnitude()} blocks`);
    console.log(`Target direction: ${direction.getYaw()}°`);
    console.log(`Currently facing: ${facing.getName()}`);

    // Create visual indicator
    let draw3d = Draw3D.create();
    let pathBox = new Box(
        playerPos.x, playerPos.y, playerPos.z,
        targetPos.x, targetPos.y + 2, targetPos.z,
        0xFF0000, 0xFF0000, true, false
    );
    pathBox.setFillAlpha(50);
    draw3d.addBox(pathBox);
}
```

### Data Processing Pipeline
```javascript
// Process and analyze data
function processGameData(data) {
    try {
        // Validate input
        Utils.requireNonNull(data, "Data cannot be null");

        // Create unique identifier
        let id = Utils.hashString(JSON.stringify(data), "sha256");

        // Encode for storage
        let encoded = Utils.encode(JSON.stringify(data));

        // Save to file
        let filename = `data_${id.substring(0, 8)}.json`;
        let file = Fs.open(`processed/${filename}`, "w");
        file.write(JSON.stringify({
            id: id,
            timestamp: Date.now(),
            data: data
        }, null, 2));

        // Open file for review
        Utils.openFile(`processed/${filename}`);

        return id;

    } catch (error) {
        console.error("Processing failed:", error.message);
        return null;
    }
}
```

## Performance Guidelines

### ✅ Best Practices
- **Cache Results**: Store frequently used vectors and positions
- **Use Appropriate Types**: Choose 2D vs 3D based on your needs
- **Batch Operations**: Group similar operations together
- **Clean Up**: Remove unused visual elements and cached data

### ⚠️ Performance Considerations
- **Vector Operations**: `getMagnitudeSq()` is faster than `getMagnitude()` for comparisons
- **Object Creation**: Minimize creation of temporary objects in loops
- **Text Processing**: Use `getStringStripFormatting()` for comparisons
- **Visual Elements**: Limit active boxes and rendering elements

### 🔒 Security Notes
- **Input Validation**: Always validate user input with `Utils.requireNonNull()`
- **Text Processing**: Be careful with chat message processing from untrusted sources
- **File Operations**: Validate file paths before using `Utils.openFile()`
- **Hash Functions**: Use salted hashing for sensitive data

## Quick Reference

| Task | Recommended Classes |
|------|-------------------|
| **2D Math & Screen** | `Pos2D`, `Vec2D` |
| **3D World & Movement** | `Pos3D`, `Vec3D`, `DirectionHelper` |
| **Text & Chat** | `TextHelper`, `FormattingHelper` |
| **Visual Elements** | `Box`, `Pos3D` |
| **System Operations** | `Utils` |
| **Data Processing** | `Utils`, `TextHelper` |
| **Navigation** | `DirectionHelper`, `Vec3D` |
| **File Management** | `Utils`, `Fs` |

## See Also

- [Core Classes](../core/index.md) - Essential core functionality
- [Helper Classes](../helpers/index.md) - Minecraft-specific helpers
- [Inventory Classes](../inventories/index.md) - Inventory management
- [UI Classes](../ui/index.md) - User interface components