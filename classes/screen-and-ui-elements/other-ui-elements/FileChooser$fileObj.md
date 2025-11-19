# FileChooser$fileObj

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.gui.overlays.FileChooser.fileObj`

**Nested Class:** Static nested class within `FileChooser`

The `FileChooser.fileObj` class is a simple but essential wrapper class that associates a `File` object with its corresponding `Button` widget in the FileChooser's grid display. It serves as the bridge between the file system representation and the visual interface elements, allowing the FileChooser to manage file selection, display, and user interactions efficiently. Each file or directory shown in the FileChooser interface is represented by an instance of this class.

**Key Features:**
- Wraps File objects with their corresponding UI Button widgets
- Enables efficient file selection and visual feedback management
- Provides direct access to both file system data and UI components
- Supports both files and directories in a unified interface
- Facilitates visual state management (highlighting, colors, visibility)
- Integrates seamlessly with FileChooser's grid-based layout system

## Overview

The `fileObj` class is a fundamental component of the FileChooser system that:

- **Binds File to UI**: Creates a direct association between file system entries and their visual representations
- **Manages State**: Tracks the selected state and visual appearance of each file entry
- **Enables Interactions**: Provides the infrastructure for file selection, navigation, and user interactions
- **Supports Grid Layout**: Works seamlessly with the 5-column grid display system
- **Handles Both Types**: Uniformly represents both files and directories with appropriate visual differentiation

## Constructors

### `new fileObj(file, btn)`

Creates a new fileObj instance that associates a File object with its corresponding Button widget.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | `File` | The file or directory object this wrapper represents |
| `btn` | `Button` | The button widget that displays this file in the FileChooser grid |

**Example:**
```js
// Create a file object wrapper (typically done internally by FileChooser)
const file = new File("/path/to/script.js");
const button = new Button(x, y, width, height, textRenderer, ...);
const fileObj = new FileChooser.fileObj(file, button);
```

**Notes:**
- This constructor is typically called internally by the FileChooser when adding files to the display
- Direct instantiation is rarely needed in user code
- The button will be automatically configured with appropriate colors and text based on the file type

## Fields

### `file: File`

The actual `File` object representing the file or directory on the file system. This provides access to all standard Java File operations and properties.

**Type:** `java.io.File`

**Example:**
```js
// Access file properties through the file object
fileChooser.files.forEach(fileObj => {
    const file = fileObj.file;

    Chat.log(`File Name: ${file.getName()}`);
    Chat.log(`File Path: ${file.getAbsolutePath()}`);
    Chat.log(`File Size: ${file.length()} bytes`);
    Chat.log(`Is Directory: ${file.isDirectory()}`);
    Chat.log(`Is File: ${file.isFile()}`);
    Chat.log(`Last Modified: ${new Date(file.lastModified())}`);
    Chat.log(`Can Read: ${file.canRead()}`);
    Chat.log(`Can Write: ${file.canWrite()}`);

    // Get parent directory
    const parent = file.getParentFile();
    if (parent) {
        Chat.log(`Parent Directory: ${parent.getName()}`);
    }
});
```

**Common File Operations:**
```js
// Check file existence
if (fileObj.file.exists()) {
    Chat.log(`File exists: ${fileObj.file.getName()}`);
}

// Get file extension
const fileName = fileObj.file.getName();
const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
Chat.log(`File extension: ${extension}`);

// Get relative path from chooser root
const relativePath = fileChooser.root.toPath().relativize(fileObj.file.toPath()).toString();
Chat.log(`Relative path: ${relativePath}`);

// Check if file is within macro folder
const isInMacroFolder = fileObj.file.getAbsolutePath().startsWith(fileChooser.root.getAbsolutePath());
Chat.log(`In macro folder: ${isInMacroFolder}`);
```

### `btn: Button`

The `Button` widget that visually represents this file in the FileChooser's grid interface. This button handles user interactions, displays the file name, and provides visual feedback for selection and hover states.

**Type:** `xyz.wagyourtail.wagyourgui.elements.Button`

**Example:**
```js
// Access and modify button properties
fileChooser.files.forEach(fileObj => {
    const button = fileObj.btn;
    const file = fileObj.file;

    // Get button properties
    Chat.log(`Button Text: ${button.getMessage().getString()}`);
    Chat.log(`Button Position: (${button.x}, ${button.y})`);
    Chat.log(`Button Size: ${button.width}x${button.height}`);
    Chat.log(`Button Visible: ${button.visible}`);
    Chat.log(`Button Color: 0x${button.color.toString(16)}`);

    // Modify button appearance based on file type
    if (file.isDirectory()) {
        button.setColor(0xFFFF00); // Yellow for directories
    } else if (file.getName().endsWith('.js')) {
        button.setColor(0x00FF00); // Green for JavaScript files
    } else if (file.getName().endsWith('.json')) {
        button.setColor(0x00FFFF); // Cyan for JSON files
    }

    // Add hover effects
    if (button.hovering) {
        Chat.log(`Hovering over: ${file.getName()}`);
    }
});
```

**Button Manipulation Examples:**
```js
// Highlight selected files
function highlightFile(targetFile) {
    fileChooser.files.forEach(fileObj => {
        if (fileObj.file.equals(targetFile)) {
            fileObj.btn.setColor(0x7FFFFFFF); // Semi-transparent white
            fileObj.btn.visible = true;
        } else {
            fileObj.btn.setColor(0x00000000); // Transparent
        }
    });
}

// Hide certain file types
function hideHiddenFiles() {
    fileChooser.files.forEach(fileObj => {
        const fileName = fileObj.file.getName();
        if (fileName.startsWith('.')) {
            fileObj.btn.visible = false;
        }
    });
}

// Add file size information to button text
function addFileSizeToButtons() {
    fileChooser.files.forEach(fileObj => {
        if (fileObj.file.isFile()) {
            const size = fileObj.file.length();
            const sizeText = formatFileSize(size);
            const originalText = fileObj.file.getName();
            fileObj.btn.setMessage(Text.literal(`${originalText} (${sizeText})`));
        }
    });
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
```

## Usage Patterns

### File Selection Management
```js
// Find and select a specific file
function selectFileByName(fileName) {
    const targetObj = fileChooser.files.find(fileObj =>
        fileObj.file.getName().equals(fileName)
    );

    if (targetObj) {
        fileChooser.selectFile(targetObj.file);
        Chat.log(`§aSelected file: §f${fileName}`);
    } else {
        Chat.log(`§cFile not found: §f${fileName}`);
    }
}

// Get all selected files (usually just one in FileChooser)
function getSelectedFileObj() {
    return fileChooser.files.find(fileObj =>
        fileObj.btn.color === 0x7FFFFFFF // Selected color
    );
}

// Get all JavaScript files
function getJavaScriptFileObjs() {
    return fileChooser.files.filter(fileObj =>
        fileObj.file.isFile() &&
        fileObj.file.getName().toLowerCase().endsWith('.js')
    );
}

// Get all directories
function getDirectoryFileObjs() {
    return fileChooser.files.filter(fileObj =>
        fileObj.file.isDirectory()
    );
}
```

### File Analysis and Operations
```js
// Analyze file distribution in current directory
function analyzeDirectory() {
    const analysis = {
        totalFiles: 0,
        totalDirectories: 0,
        totalSize: 0,
        fileTypes: {},
        largestFile: null,
        newestFile: null,
        oldestFile: null
    };

    fileChooser.files.forEach(fileObj => {
        const file = fileObj.file;

        if (file.isDirectory()) {
            analysis.totalDirectories++;
        } else if (file.isFile()) {
            analysis.totalFiles++;
            analysis.totalSize += file.length();

            // Track file types
            const extension = getFileExtension(file.getName());
            analysis.fileTypes[extension] = (analysis.fileTypes[extension] || 0) + 1;

            // Track largest file
            if (!analysis.largestFile || file.length() > analysis.largestFile.length()) {
                analysis.largestFile = file;
            }

            // Track newest and oldest files
            const modified = file.lastModified();
            if (!analysis.newestFile || modified > analysis.newestFile.lastModified()) {
                analysis.newestFile = file;
            }
            if (!analysis.oldestFile || modified < analysis.oldestFile.lastModified()) {
                analysis.oldestFile = file;
            }
        }
    });

    // Display analysis
    Chat.log(`§6Directory Analysis:`);
    Chat.log(`§7  Files: §f${analysis.totalFiles}`);
    Chat.log(`§7  Directories: §f${analysis.totalDirectories}`);
    Chat.log(`§7  Total Size: §f${formatFileSize(analysis.totalSize)}`);

    if (analysis.largestFile) {
        Chat.log(`§7  Largest File: §f${analysis.largestFile.getName()} (${formatFileSize(analysis.largestFile.length())})`);
    }

    Chat.log(`§7  File Types: §f${JSON.stringify(analysis.fileTypes, null, 2)}`);
}

function getFileExtension(fileName) {
    const lastDot = fileName.lastIndexOf('.');
    return lastDot > 0 ? fileName.substring(lastDot + 1).toLowerCase() : 'unknown';
}
```

### Visual Customization
```js
// Apply custom coloring based on file properties
function applyCustomColorScheme() {
    fileChooser.files.forEach(fileObj => {
        const file = fileObj.file;
        const button = fileObj.btn;

        if (file.isDirectory()) {
            // Directories in gold
            button.setColor(0xFFD700);
        } else {
            const ext = getFileExtension(file.getName());
            const color = getFileTypeColor(ext);
            button.setColor(color);
        }
    });
}

function getFileTypeColor(extension) {
    const colors = {
        'js': 0x00FF00,     // Green - JavaScript
        'json': 0x00FFFF,   // Cyan - JSON
        'txt': 0xFFFFFF,    // White - Text
        'md': 0xFF00FF,     // Magenta - Markdown
        'png': 0xFFA500,    // Orange - Images
        'jpg': 0xFFA500,    // Orange - Images
        'gif': 0xFFA500,    // Orange - Images
        'zip': 0xFF0000,    // Red - Archives
        'jar': 0xFF0000,    // Red - Archives
        'properties': 0xFFFF00, // Yellow - Config
        'yml': 0xFFFF00,    // Yellow - Config
        'yaml': 0xFFFF00    // Yellow - Config
    };
    return colors[extension] || 0x808080; // Gray for unknown types
}

// Add file modification indicators
function addModificationIndicators() {
    const now = System.currentTimeMillis();
    const oneDay = 24 * 60 * 60 * 1000;

    fileChooser.files.forEach(fileObj => {
        const file = fileObj.file;
        const button = fileObj.btn;
        const modified = file.lastModified();
        const timeDiff = now - modified;

        let prefix = '';
        if (timeDiff < oneDay) {
            prefix = '§a📝 '; // Recently modified (green)
            button.setColor(0x00FF00);
        } else if (timeDiff < 7 * oneDay) {
            prefix = '§e📄 '; // Modified this week (yellow)
        } else if (timeDiff < 30 * oneDay) {
            prefix = '§7📄 '; // Modified this month (gray)
        }

        if (prefix) {
            const originalText = file.getName();
            button.setMessage(Text.literal(prefix + originalText));
        }
    });
}
```

### Search and Filtering
```js
// Search for files by name
function searchFiles(searchTerm) {
    const term = searchTerm.toLowerCase();
    const matches = fileChooser.files.filter(fileObj =>
        fileObj.file.getName().toLowerCase().includes(term)
    );

    // Hide non-matching files
    fileChooser.files.forEach(fileObj => {
        fileObj.btn.visible = matches.includes(fileObj);
    });

    Chat.log(`§7Found §f${matches.length} §7files matching "§f${searchTerm}§7"`);

    return matches;
}

// Filter by file size
function filterBySize(minSize, maxSize) {
    const filtered = fileChooser.files.filter(fileObj => {
        if (fileObj.file.isDirectory()) return true; // Always show directories

        const size = fileObj.file.length();
        return size >= minSize && size <= maxSize;
    });

    fileChooser.files.forEach(fileObj => {
        fileObj.btn.visible = filtered.includes(fileObj);
    });

    Chat.log(`§7Showing §f${filtered.length} §7files within size range`);
}

// Filter by modification date
function filterByDate(afterDate) {
    const filtered = fileChooser.files.filter(fileObj => {
        if (fileObj.file.isDirectory()) return true;
        return fileObj.file.lastModified() >= afterDate.getTime();
    });

    fileChooser.files.forEach(fileObj => {
        fileObj.btn.visible = filtered.includes(fileObj);
    });

    Chat.log(`§7Showing §f${filtered.length} §7files modified after specified date`);
}
```

### Batch Operations
```js
// Select multiple files for batch operations
function selectMultipleFiles(pattern) {
    const regex = new RegExp(pattern, 'i');
    const selected = [];

    fileChooser.files.forEach(fileObj => {
        if (regex.test(fileObj.file.getName())) {
            fileObj.btn.setColor(0x7FFFFFFF); // Selected color
            selected.push(fileObj);
        } else {
            fileObj.btn.setColor(0x00000000); // Deselected color
        }
    });

    Chat.log(`§7Selected §f${selected.length} §7files matching pattern`);
    return selected;
}

// Get file information for all selected files
function getSelectedFilesInfo() {
    const selected = fileChooser.files.filter(fileObj =>
        fileObj.btn.color === 0x7FFFFFFF
    );

    return selected.map(fileObj => ({
        name: fileObj.file.getName(),
        path: fileObj.file.getAbsolutePath(),
        size: fileObj.file.length(),
        isDirectory: fileObj.file.isDirectory(),
        lastModified: new Date(fileObj.file.lastModified()),
        canRead: fileObj.file.canRead(),
        canWrite: fileObj.file.canWrite()
    }));
}
```

## Integration with FileChooser

### Working with FileChooser Methods
```js
// Access fileObj through FileChooser's files list
function demonstrateFileChooserIntegration() {
    Chat.log(`§6FileChooser Integration Examples:`);

    // Total files and directories
    const totalEntries = fileChooser.files.length;
    const fileCount = fileChooser.files.filter(fo => fo.file.isFile()).length;
    const dirCount = fileChooser.files.filter(fo => fo.file.isDirectory()).length;

    Chat.log(`§7Total entries: §f${totalEntries} §7(§f${fileCount} §7files, §f${dirCount} §7directories)`);

    // Current directory info
    Chat.log(`§7Current directory: §f${fileChooser.directory.getAbsolutePath()}`);
    Chat.log(`§7Root directory: §f${fileChooser.root.getAbsolutePath()}`);

    // Selected file information
    if (fileChooser.selected) {
        const selectedObj = fileChooser.files.find(fo => fo.file.equals(fileChooser.selected));
        if (selectedObj) {
            Chat.log(`§7Selected file: §f${selectedObj.file.getName()}`);
            Chat.log(`§7Button position: §f(${selectedObj.btn.x}, ${selectedObj.btn.y})`);
        }
    }

    // Find parent directory entry (..)
    const parentEntry = fileChooser.files.find(fo => fo.file.getName().equals(".."));
    if (parentEntry) {
        Chat.log(`§7Parent directory available: §f${parentEntry.file.getParentFile().getAbsolutePath()}`);
    }
}
```

### Event Handling Integration
```js
// Monitor file selection changes
function setupFileSelectionMonitoring() {
    let lastSelected = null;

    // Check for selection changes periodically
    const monitorInterval = setInterval(() => {
        const currentSelected = fileChooser.selected;

        if (currentSelected !== lastSelected) {
            if (currentSelected) {
                const fileObj = fileChooser.files.find(fo => fo.file.equals(currentSelected));
                if (fileObj) {
                    Chat.log(`§6Selection changed to: §f${currentSelected.getName()}`);

                    // Additional selection handling
                    handleFileSelection(fileObj);
                }
            } else {
                Chat.log(`§6Selection cleared`);
            }

            lastSelected = currentSelected;
        }

        // Clear interval when file chooser is closed
        if (!fileChooser.visible) {
            clearInterval(monitorInterval);
        }
    }, 100);
}

function handleFileSelection(fileObj) {
    const file = fileObj.file;

    if (file.isDirectory()) {
        // Directory selection - show contents summary
        const files = file.listFiles();
        if (files) {
            const fileCount = files.filter(f => f.isFile()).length;
            const dirCount = files.filter(f => f.isDirectory()).length;
            Chat.log(`§7Directory contains: §f${fileCount} §7files, §f${dirCount} §7subdirectories`);
        }
    } else {
        // File selection - show file information
        const size = formatFileSize(file.length());
        const modified = new Date(file.lastModified());
        const extension = getFileExtension(file.getName());

        Chat.log(`§7File info: §f${size} §7| §f${extension} §7| Modified: §f${modified.toLocaleString()}`);
    }
}
```

## Advanced Usage

### Custom File Object Creation
```js
// Create custom fileObj for special entries
function addCustomFileEntry(displayName, customAction) {
    // Create a virtual file (doesn't exist on disk)
    const virtualFile = {
        getName: () => displayName,
        isDirectory: () => false,
        isFile: () => true,
        exists: () => false,
        length: () => 0,
        lastModified: () => System.currentTimeMillis(),
        getAbsolutePath: () => `virtual://${displayName}`,
        getParentFile: () => fileChooser.directory
    };

    // Create button with custom action
    const customButton = new Button(
        10, 10, 100, 20,
        Client.getMinecraft().textRenderer,
        0, 0x00FF00, 0x00FF00, 0xFFFFFF,
        Text.literal(`§6${displayName}`),
        customAction
    );

    // Create fileObj and add to chooser
    const customFileObj = new FileChooser.fileObj(virtualFile, customButton);
    fileChooser.files.push(customFileObj);
    fileChooser.addDrawableChild(customButton);

    return customFileObj;
}

// Usage example: Add a "Create New Script" entry
const newScriptEntry = addCustomFileEntry("+ Create New Script", (btn) => {
    const prompt = new TextPrompt(
        fileChooser.x + 100, fileChooser.y + 150,
        200, 100,
        Client.getMinecraft().textRenderer,
        Text.literal("New Script Name"),
        "",
        fileChooser,
        (scriptName) => {
            if (scriptName && scriptName.trim()) {
                const newFile = new File(fileChooser.directory, scriptName.endsWith('.js') ? scriptName : scriptName + '.js');
                try {
                    newFile.createNewFile();
                    fileChooser.setDir(fileChooser.directory); // Refresh
                    Chat.log(`§aCreated new script: §f${newFile.getName()}`);
                } catch (e) {
                    Chat.log(`§cFailed to create script: §f${e.message}`);
                }
            }
        }
    );
    fileChooser.openOverlay(prompt);
});
```

### File Object Validation
```js
// Validate fileObj integrity
function validateFileObjects() {
    const issues = [];

    fileChooser.files.forEach((fileObj, index) => {
        // Check for null values
        if (!fileObj.file) {
            issues.push(`File object at index ${index} has null file`);
        }

        if (!fileObj.btn) {
            issues.push(`File object at index ${index} has null button`);
        }

        // Check file existence
        if (fileObj.file && !fileObj.file.getName().equals("..") && !fileObj.file.exists()) {
            issues.push(`File ${fileObj.file.getName()} no longer exists on disk`);
        }

        // Check button visibility vs position
        if (fileObj.btn) {
            const inBounds = fileObj.btn.x >= fileChooser.x &&
                           fileObj.btn.y >= fileChooser.y &&
                           fileObj.btn.x + fileObj.btn.width <= fileChooser.x + fileChooser.width &&
                           fileObj.btn.y + fileObj.btn.height <= fileChooser.y + fileChooser.height;

            if (fileObj.btn.visible && !inBounds) {
                issues.push(`Button for ${fileObj.file.getName()} is visible but out of bounds`);
            }
        }
    });

    if (issues.length > 0) {
        Chat.log(`§cFileObj validation issues found:`);
        issues.forEach(issue => Chat.log(`§7  - §f${issue}`));
    } else {
        Chat.log(`§aAll file objects validated successfully`);
    }

    return issues.length === 0;
}
```

### Performance Monitoring
```js
// Monitor file object performance
function monitorFileObjectPerformance() {
    const startTime = System.nanoTime();

    // Measure operations on all file objects
    let totalFileSize = 0;
    let maxFileSize = 0;
    let minFileSize = Number.MAX_VALUE;

    fileChooser.files.forEach(fileObj => {
        if (fileObj.file.isFile()) {
            const size = fileObj.file.length();
            totalFileSize += size;
            maxFileSize = Math.max(maxFileSize, size);
            minFileSize = Math.min(minFileSize, size);
        }
    });

    const endTime = System.nanoTime();
    const duration = (endTime - startTime) / 1000000; // Convert to milliseconds

    Chat.log(`§6Performance Metrics:`);
    Chat.log(`§7  Processing time: §f${duration.toFixed(2)} ms`);
    Chat.log(`§7  Total file size: §f${formatFileSize(totalFileSize)}`);
    Chat.log(`§7  Largest file: §f${formatFileSize(maxFileSize)}`);
    Chat.log(`§7  Smallest file: §f${formatFileSize(minFileSize)}`);
    Chat.log(`§7  Average processing per file: §f${(duration / fileChooser.files.length).toFixed(3)} ms`);

    return {
        duration,
        totalFileSize,
        maxFileSize,
        minFileSize,
        fileCount: fileChooser.files.length
    };
}
```

## Important Notes

### Thread Safety
- All fileObj operations should be performed on the main client thread
- File system operations may block and should be used carefully
- Button modifications must be done on the render thread

### Memory Management
- fileObj instances are lightweight but should be cleaned up when FileChooser is closed
- Large directories with many files will create many fileObj instances
- Consider implementing pagination or virtualization for very large directories

### File System Limitations
- File operations are subject to OS permissions and file system limitations
- Network drives and cloud storage may have performance implications
- File deletion and modification operations are irreversible

### UI Considerations
- Button text may be truncated for long filenames; hover tooltips show full names
- Button visibility is managed by FileChooser's scrolling system
- Custom button modifications should respect the grid layout constraints

### Integration Notes
- fileObj is designed to work within FileChooser's management system
- Direct manipulation should be coordinated with FileChooser's state
- The class is not intended for standalone use outside of FileChooser

## Related Classes

- `FileChooser` - Parent class that manages fileObj instances
- `File` - Java file system representation
- `Button` - UI widget for file representation
- `OverlayContainer` - Base class for FileChooser
- `Text` - Minecraft text components
- `TextRenderer` - Text rendering utilities

## Version Information

- Core component of FileChooser since early JSMacros versions
- Stable API with consistent behavior
- Designed for internal use within FileChooser system
- Maintained compatibility with Minecraft's GUI rendering system