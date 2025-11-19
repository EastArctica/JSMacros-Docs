# FileChooser

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.gui.overlays.FileChooser`

**Extends:** `OverlayContainer`

The `FileChooser` class is a comprehensive file system navigation and management overlay that provides users with a graphical interface to browse, select, create, rename, and delete files and directories. It features a grid-based file display, directory navigation, file filtering, and integration with the operating system's file explorer. This component is extensively used throughout JSMacros for script selection, configuration file management, and various file operation scenarios.

**Key Features:**
- Grid-based file and directory display with 5-column layout
- Directory navigation with parent directory traversal (".." option)
- File selection with visual highlighting
- File operations: create, rename, delete, and edit
- Automatic file extension detection based on JSMacros extensions
- Operating system folder integration
- Scrollable interface for large directories
- Root directory anchored to JSMacros macro folder

## Constructors

### `new FileChooser(x, y, width, height, textRenderer, directory, selected, parent, setFile, editFile)`

Creates a new FileChooser overlay with the specified configuration and callbacks.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | `int` | The x coordinate of the overlay's top-left corner |
| `y` | `int` | The y coordinate of the overlay's top-left corner |
| `width` | `int` | The width of the overlay in pixels |
| `height` | `int` | The height of the overlay in pixels |
| `textRenderer` | `TextRenderer` | The text renderer for drawing text elements |
| `directory` | `File` | The initial directory to display |
| `selected` | `File` | The initially selected file (can be null) |
| `parent` | `IOverlayParent` | The parent overlay container |
| `setFile` | `Consumer<File>` | Callback function when a file is selected and confirmed |
| `editFile` | `Consumer<File>` | Callback function when a file is chosen for editing |

**Example:**
```js
// Create a file chooser for script selection
const textRenderer = Client.getMinecraft().textRenderer;
const macroFolder = JsMacros.getFile("macros").getFile();
const chooser = new FileChooser(
    50, 50,           // Position
    400, 300,         // Dimensions
    textRenderer,     // Text renderer
    macroFolder,      // Starting directory
    null,             // No initial selection
    parentScreen,     // Parent container
    (file) => {       // Selection callback
        Chat.log(`Selected script: ${file.getName()}`);
        // Load and execute the selected script
        loadScript(file);
    },
    (file) => {       // Edit callback
        Chat.log(`Editing script: ${file.getName()}`);
        // Open script in editor
        openScriptEditor(file);
    }
);
```

## Fields

### `directory: File`
The currently displayed directory. This field is updated as the user navigates through the file system.

### `selected: File`
The currently selected file. This is null when no file is selected and is updated when users click on files in the grid.

### `root: File`
The root directory of the file chooser, typically set to the JSMacros macro folder. Users cannot navigate above this directory.

### `files: List<fileObj>`
A list of `fileObj` instances representing the files and directories currently displayed in the grid.

### `dirname: Text`
A Text component displaying the current directory path relative to the root directory.

### `topScroll: int`
The current scroll position offset for the file grid.

## Methods

### Directory Navigation

#### `setDir(dir)`
Sets the current directory and refreshes the file display. Creates the directory if it doesn't exist and falls back to root directory on failure.

**Parameters:**
- `dir` (`File`): The directory to display

**Example:**
```js
// Navigate to a specific subdirectory
const scriptsDir = new File(macroFolder, "scripts");
fileChooser.setDir(scriptsDir);

// Navigate to parent directory
fileChooser.setDir(fileChooser.directory.getParentFile());
```

#### `selectFile(f)`
Selects a file or directory in the chooser. If the file is a directory, it navigates to it; if it's a file, it highlights it as the current selection.

**Parameters:**
- `f` (`File`): The file or directory to select

**Example:**
```js
// Select a specific file
const targetFile = new File(currentDir, "myscript.js");
fileChooser.selectFile(targetFile);

// Navigate to a subdirectory
const subDir = new File(currentDir, "utilities");
fileChooser.selectFile(subDir);
```

### File Management

#### `addFile(f)`
Adds a file to the display grid with its default name.

**Parameters:**
- `f` (`File`): The file to add to the display

**Example:**
```js
// Add a new file to the display
const newFile = new File(currentDir, "newscript.js");
fileChooser.addFile(newFile);
```

#### `addFile(f, btnText)`
Adds a file to the display grid with custom button text.

**Parameters:**
- `f` (`File`): The file to add to the display
- `btnText` (`String`): Custom text to display on the file button

**Example:**
```js
// Add parent directory with custom text
fileChooser.addFile(parentDir, "..");

// Add file with display name
fileChooser.addFile(file, file.getName());
```

#### `delete(fileObj)`
Deletes a file from both the display and the file system.

**Parameters:**
- `fileObj` (`fileObj`): The file object wrapper to delete

**Example:**
```js
// Find and delete a specific file
const targetFileObj = fileChooser.files.find(fo => fo.file.getName().equals("oldscript.js"));
if (targetFileObj) {
    fileChooser.delete(targetFileObj);
}
```

#### `confirmDelete(fileObj)`
Shows a confirmation dialog before deleting a file.

**Parameters:**
- `fileObj` (`fileObj`): The file object wrapper to delete after confirmation

**Example:**
```js
// Show delete confirmation for selected file
if (fileChooser.selected && fileChooser.selected.isFile()) {
    const fileObj = fileChooser.files.find(fo => fo.file.equals(fileChooser.selected));
    if (fileObj) {
        fileChooser.confirmDelete(fileObj);
    }
}
```

### UI Management

#### `updateFilePos()`
Updates the positions and visibility of all file buttons based on the current scroll position. This is called automatically during scrolling operations.

**Example:**
```js
// Manually update file positions (usually called internally)
fileChooser.updateFilePos();
```

#### `onScrollbar(page)`
Handles scrollbar scrolling by updating the visible file positions and scroll offset.

**Parameters:**
- `page` (`double`): The scroll page position (0.0 to 1.0)

**Example:**
```js
// Scroll to specific position
fileChooser.onScrollbar(0.5); // Scroll halfway

// Scroll to top
fileChooser.onScrollbar(0.0);

// Scroll to bottom
fileChooser.onScrollbar(1.0);
```

## Nested Classes

### `fileObj`
A wrapper class that associates a `File` object with its corresponding `Button` widget in the display grid.

#### Fields

- `file: File` - The actual file or directory object
- `btn: Button` - The button widget representing this file in the UI

#### Example:
```js
// Access file object properties
fileChooser.files.forEach(fileObj => {
    const file = fileObj.file;
    const button = fileObj.btn;

    Chat.log(`File: ${file.getName()}, Directory: ${file.isDirectory()}`);

    // Modify button appearance
    if (file.isDirectory()) {
        button.color = 0xFFFF00; // Yellow for directories
    } else {
        button.color = 0xFFFFFF; // White for files
    }
});
```

### `sortFile`
A `Comparator<File>` implementation that sorts files with directories first (alphabetically), followed by files (alphabetically).

#### Sorting Logic:
1. Directories come before files
2. Directories are sorted alphabetically by name
3. Files are sorted alphabetically by name

#### Example:
```js
// Create a sorted list of files
const fileList = Array.from(directory.listFiles());
fileList.sort(new FileChooser.sortFile());

// The sorted list will have directories first, then files
```

## User Interface Features

### Button Actions

The FileChooser includes several action buttons at the bottom of the overlay:

1. **Select** - Confirms the currently selected file and calls the `setFile` callback
2. **Edit** - Opens the selected file for editing using the `editFile` callback
3. **Rename** - Prompts the user for a new name and renames the selected file
4. **Delete** - Shows a confirmation dialog and deletes the selected file (files only)
5. **New** - Prompts for a filename and creates a new file with appropriate extension
6. **Open Folder** - Opens the current directory in the system's file explorer

### Visual Design

- **Grid Layout**: Files are displayed in a 5-column grid for efficient space usage
- **Color Coding**: Directories appear in yellow, files in white
- **Selection Highlighting**: Selected files are highlighted with a semi-transparent overlay
- **Scrollable Interface**: Large directories can be scrolled using the scrollbar
- **Directory Path**: Current path is displayed relative to the root directory
- **Hover Effects**: Files show full names in tooltips when text is truncated

### File Creation Intelligence

When creating new files, the FileChooser automatically:

1. Checks if the provided filename has an extension
2. If no extension is provided, adds the default extension from the highest priority JSMacros extension
3. Creates the file in the current directory
4. Automatically selects and highlights the newly created file

## Usage Examples

### Basic Script Selector
```js
function createScriptSelector(parentScreen) {
    const textRenderer = Client.getMinecraft().textRenderer;
    const macroFolder = JsMacros.getFile("macros").getFile();

    const scriptChooser = new FileChooser(
        100, 50, 500, 400,
        textRenderer,
        macroFolder,
        null,
        parentScreen,
        (selectedFile) => {
            Chat.log(`§aLoading script: §f${selectedFile.getName()}`);
            // Load and execute the script
            JsMacros.run(selectedFile);
        },
        (editFile) => {
            Chat.log(`§6Opening editor for: §f${editFile.getName()}`);
            // Open in system default editor
            java.awt.Desktop.getDesktop().open(editFile);
        }
    );

    return scriptChooser;
}

// Usage
const chooser = createScriptSelector(currentScreen);
parentScreen.openOverlay(chooser);
```

### Configuration File Manager
```js
function createConfigManager(parentScreen, configFolder) {
    const textRenderer = Client.getMinecraft().textRenderer;

    const configChooser = new FileChooser(
        50, 30, 600, 450,
        textRenderer,
        configFolder,
        null,
        parentScreen,
        (configFile) => {
            // Load configuration
            const configContent = File.readText(configFile.getAbsolutePath());
            Chat.log(`§7Loaded config: §f${configFile.getName()}`);
            processConfig(configContent);
        },
        (configFile) => {
            // Edit configuration
            Chat.log(`§6Editing config: §f${configFile.getName()}`);
            openConfigEditor(configFile);
        }
    );

    return configChooser;
}

function openConfigEditor(configFile) {
    const content = File.readText(configFile.getAbsolutePath());

    // Create a simple text editor screen
    const editor = Hud.createScreen("Config Editor: " + configFile.getName());

    editor.addTextInput(10, 40, 580, 300, "Configuration Content", (newContent) => {
        File.writeText(configFile.getAbsolutePath(), newContent);
        Chat.log(`§aSaved config: §f${configFile.getName()}`);
    });

    editor.addButton(250, 350, 100, 20, "Save", () => {
        editor.close();
    });

    editor.openScreen();
}
```

### Advanced File Browser with Filtering
```js
function createFilteredFileBrowser(parentScreen, directory, fileFilter) {
    const textRenderer = Client.getMinecraft().textRenderer;

    const browser = new FileChooser(
        75, 25, 550, 350,
        textRenderer,
        directory,
        null,
        parentScreen,
        (file) => {
            if (fileFilter.accept(file)) {
                Chat.log(`§aSelected file: §f${file.getAbsolutePath()}`);
                processSelectedFile(file);
            } else {
                Chat.log(`§cFile type not allowed: §f${file.getName()}`);
            }
        },
        (file) => {
            if (fileFilter.accept(file)) {
                Chat.log(`§6Editing file: §f${file.getName()}`);
                openEditor(file);
            } else {
                Chat.log(`§cCannot edit this file type`);
            }
        }
    );

    // Override file display to apply filtering
    const originalAddFile = browser.addFile.bind(browser);
    browser.addFile = function(file, btnText) {
        if (file.isDirectory() || fileFilter.accept(file)) {
            originalAddFile(file, btnText);
        }
    };

    return browser;
}

// Example file filter for JavaScript files only
const jsFilter = {
    accept: function(file) {
        return file.getName().toLowerCase().endsWith('.js') ||
               file.getName().toLowerCase().endsWith('.mjs');
    }
};

// Usage
const jsBrowser = createFilteredFileBrowser(currentScreen, macroFolder, jsFilter);
```

### Backup File Manager
```js
function createBackupManager(parentScreen, backupFolder) {
    const textRenderer = Client.getMinecraft().textRenderer;

    const backupChooser = new FileChooser(
        100, 100, 600, 400,
        textRenderer,
        backupFolder,
        null,
        parentScreen,
        (backupFile) => {
            // Restore from backup
            Chat.log(`§6Restoring from backup: §f${backupFile.getName()}`);
            restoreFromBackup(backupFile);
        },
        (backupFile) => {
            // View backup details
            Chat.log(`§7Viewing backup: §f${backupFile.getName()}`);
            showBackupDetails(backupFile);
        }
    );

    return backupChooser;
}

function restoreFromBackup(backupFile) {
    const originalName = backupFile.getName().replace('.backup', '');
    const targetFile = new File(backupFile.getParentFile(), originalName);

    // Copy backup to original location
    File.copy(backupFile.getAbsolutePath(), targetFile.getAbsolutePath());
    Chat.log(`§aRestored: §f${originalName}`);
}

function showBackupDetails(backupFile) {
    const stats = java.nio.file.Files.getAttribute(
        java.nio.file.Paths.get(backupFile.getAbsolutePath()),
        "basic:size,creationTime,lastModifiedTime"
    );

    Chat.log(`§7Backup Details:`);
    Chat.log(`§7  Name: §f${backupFile.getName()}`);
    Chat.log(`§7  Size: §f${stats.size()} bytes`);
    Chat.log(`§7  Created: §f${new Date(stats.creationTime().toMillis())}`);
    Chat.log(`§7  Modified: §f${new Date(stats.lastModifiedTime().toMillis())}`);
}
```

### File Type-Specific Browser
```js
function createFileTypeBrowser(parentScreen, directory, allowedExtensions, iconColors) {
    const textRenderer = Client.getMinecraft().textRenderer;

    const browser = new FileChooser(
        50, 50, 700, 500,
        textRenderer,
        directory,
        null,
        parentScreen,
        (file) => {
            Chat.log(`§aOpening file: §f${file.getName()}`);
            openFileWithAppropriateHandler(file);
        },
        (file) => {
            Chat.log(`§6Editing file: §f${file.getName()}`);
            editFileWithAppropriateEditor(file);
        }
    );

    // Customize file appearance based on type
    const originalAddFile = browser.addFile.bind(browser);
    browser.addFile = function(file, btnText) {
        if (file.isDirectory() || isAllowedFileType(file, allowedExtensions)) {
            originalAddFile(file, getDisplayText(file, iconColors));
        }
    };

    return browser;
}

function isAllowedFileType(file, extensions) {
    const name = file.getName().toLowerCase();
    return extensions.some(ext => name.endsWith(ext.toLowerCase()));
}

function getDisplayText(file, iconColors) {
    const name = file.getName();
    const extension = name.substring(name.lastIndexOf('.') + 1).toLowerCase();

    // Add color-coded icons
    const icon = iconColors[extension] || '§f'; // Default white
    const symbol = file.isDirectory() ? '📁' : '📄';

    return `${icon}${symbol} §r${name}`;
}

// Usage for image browser
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
const imageIconColors = {
    'png': '§b', // Blue
    'jpg': '§e', // Yellow
    'jpeg': '§e',
    'gif': '§a', // Green
    'bmp': '§c'  // Red
};

const imageBrowser = createFileTypeBrowser(currentScreen, imageFolder, imageExtensions, imageIconColors);
```

## Integration with File Operations

### File System Monitoring
```js
function createMonitoredFileChooser(parentScreen, directory) {
    const textRenderer = Client.getMinecraft().textRenderer;

    const chooser = new FileChooser(
        100, 50, 500, 400,
        textRenderer,
        directory,
        null,
        parentScreen,
        handleFileSelection,
        handleFileEdit
    );

    // Add file system monitoring
    let lastModified = {};

    function updateFileMonitoring() {
        chooser.files.forEach(fileObj => {
            const file = fileObj.file;
            const currentModified = file.lastModified();

            if (lastModified[file.getAbsolutePath()] !== currentModified) {
                // File was modified externally
                Chat.log(`§6File modified: §f${file.getName()}`);
                lastModified[file.getAbsolutePath()] = currentModified;

                // Update button appearance to show modification
                if (file.isFile()) {
                    fileObj.btn.setMessage(Text.literal(`§e* ${file.getName()}`));
                }
            }
        });
    }

    // Monitor changes every 5 seconds
    const monitorInterval = setInterval(() => {
        if (chooser.visible) {
            updateFileMonitoring();
        } else {
            clearInterval(monitorInterval);
        }
    }, 5000);

    return chooser;
}
```

### Batch Operations
```js
function createBatchFileOperations(parentScreen, directory) {
    const textRenderer = Client.getMinecraft().textRenderer;

    const batchChooser = new FileChooser(
        50, 25, 700, 550,
        textRenderer,
        directory,
        null,
        parentScreen,
        handleBatchOperation,
        handleBatchEdit
    );

    // Add batch operation buttons
    const originalInit = batchChooser.init.bind(batchChooser);
    batchChooser.init = function() {
        originalInit();

        // Add batch operation buttons
        this.addDrawableChild(new Button(
            this.x + 2, this.y + this.height - 28,
            120, 12, this.textRenderer, 0, 0, 0x7FFFFFFF, 0xFFFFFF,
            Text.literal("Batch Rename"),
            (btn) => showBatchRenameDialog(this)
        ));

        this.addDrawableChild(new Button(
            this.x + 124, this.y + this.height - 28,
            120, 12, this.textRenderer, 0, 0, 0x7FFFFFFF, 0xFFFFFF,
            Text.literal("Batch Delete"),
            (btn) => showBatchDeleteDialog(this)
        ));

        this.addDrawableChild(new Button(
            this.x + 246, this.y + this.height - 28,
            120, 12, this.textRenderer, 0, 0, 0x7FFFFFFF, 0xFFFFFF,
            Text.literal("Batch Copy"),
            (btn) => showBatchCopyDialog(this)
        ));
    };

    return batchChooser;
}

function showBatchRenameDialog(chooser) {
    // Implementation for batch renaming operations
    Chat.log("§6Batch rename dialog opened");
    // Create overlay for batch rename interface
}
```

## Error Handling and Edge Cases

### Directory Creation
The `setDir()` method automatically creates directories that don't exist:

```js
// This will create the directory if it doesn't exist
const newDir = new File(macroFolder, "new/scripts/folder");
fileChooser.setDir(newDir); // Creates parent directories as needed
```

### Root Directory Protection
Users cannot navigate above the configured root directory:

```js
// Attempts to navigate above root will fail
const parentOfRoot = fileChooser.root.getParentFile();
if (parentOfRoot && !parentOfRoot.equals(fileChooser.root)) {
    fileChooser.setDir(parentOfRoot); // This will redirect back to root
}
```

### File Extension Management
When creating new files, the chooser automatically adds appropriate extensions:

```js
// User enters "myscript" without extension
// Chooser will add ".js" if JavaScript is the primary extension
```

## Performance Considerations

1. **Lazy Loading**: Files are loaded and displayed as needed, not all at once
2. **Visibility Culling**: Only visible file buttons are rendered
3. **Efficient Sorting**: Uses optimized comparator for directory/file sorting
4. **Scroll-based Rendering**: Scrolling updates only visible elements

## Accessibility Features

1. **Keyboard Navigation**: Can be extended with keyboard support for file selection
2. **Clear Visual Indicators**: Color coding and icons for different file types
3. **Tooltip Support**: Long filenames show in tooltips on hover
4. **Confirmation Dialogs**: Destructive operations require confirmation

## Related Classes

- `OverlayContainer` - Base class for overlay management
- `IOverlayParent` - Interface for overlay parent containers
- `Button` - File selection buttons in the grid
- `Scrollbar` - Scrolling functionality for large directories
- `TextPrompt` - Input dialogs for renaming and file creation
- `ConfirmOverlay` - Confirmation dialogs for destructive operations
- `Text` - Minecraft text components for display
- `TextRenderer` - Text rendering utilities
- `File` - Java file system representation

## Important Notes

1. **Thread Safety**: All FileChooser operations must be performed on the main client thread.

2. **File System Permissions**: The chooser can only access files that the Minecraft process has permission to read/write.

3. **Root Directory**: The chooser is anchored to a root directory (typically the JSMacros macro folder) and cannot navigate above it.

4. **Extension Detection**: File extension detection relies on JSMacros extensions being properly configured.

5. **Memory Management**: Large directories with many files may impact performance; consider implementing pagination or filtering for very large directories.

6. **File Operations**: All file operations are performed synchronously and may cause brief UI pauses for large files.

7. **Cross-Platform**: File separator handling is automatically managed for different operating systems.

8. **Encoding**: File operations use the platform's default encoding; for specific encoding requirements, handle files manually after selection.

## Version Information

- Core component of JSMacros GUI system
- Stable API with consistent behavior across JSMacros versions
- Regularly updated with new features and improvements
- Compatible with Minecraft's overlay and GUI rendering systems
- Integrated with JSMacros extension system for file type detection

# FileChooser.fileObj

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

# FileChooser.sortFile

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.gui.overlays.FileChooser.sortFile`

**Implements:** `Comparator<File>`

**Since:** JsMacros 1.0.0

The `FileChooser.sortFile` class is a specialized comparator that provides intelligent file sorting functionality for the FileChooser component. It implements a hierarchical sorting strategy that prioritizes directories over files while maintaining alphabetical ordering within each category. This sorting approach ensures an intuitive and user-friendly file browsing experience by presenting directories first, followed by files, both sorted alphabetically.

## Overview

The `sortFile` class implements Java's `Comparator<File>` interface to provide a consistent and predictable sorting order for file listings in JSMacros' FileChooser interface. The sorting logic follows a user-friendly pattern commonly found in file explorers and operating systems:

1. **Directory Priority**: Directories are always displayed before files, regardless of their names
2. **Alphabetical Ordering**: Within each category (directories or files), items are sorted alphabetically by name
3. **Case Sensitivity**: Uses Java's default string comparison, which is case-sensitive
4. **Natural Ordering**: Provides the expected behavior users anticipate from file browsers

This comparator is essential for creating an organized and navigable file interface where users can easily locate directories and files in a logical order.

## Constructor

### `new FileChooser.sortFile()`

Creates a new instance of the sortFile comparator.

**Parameters:**
* `(none)`

**Example:**
```js
// Create a new comparator instance
const fileSorter = new FileChooser.sortFile();
```

## Methods

### `compare(a, b)`

Compares two File objects to determine their sorting order. This method implements the core sorting logic of the comparator.

**Parameters:**
- `a` (`File`): The first file to compare
- `b` (`File`): The second file to compare

**Returns:**
- `int` - A negative integer if `a` should come before `b`, zero if they are equal, or a positive integer if `a` should come after `b`

**Sorting Logic:**
1. If one file is a directory and the other is not, the directory comes first
2. If both files are directories or both are regular files, they are sorted alphabetically by name

**Example:**
```js
const sorter = new FileChooser.sortFile();

// Compare two files
const file1 = new File("/path/to/file.txt");
const file2 = new File("/path/to/another.txt");
const result = sorter.compare(file1, file2);

if (result < 0) {
    Chat.log("file1 comes before file2");
} else if (result > 0) {
    Chat.log("file1 comes after file2");
} else {
    Chat.log("file1 and file2 are equal in order");
}
```

## Sorting Behavior

### Directory vs File Comparison

When comparing a directory with a file, the directory always takes precedence:

```js
const sorter = new FileChooser.sortFile();
const directory = new File("/path/documents");
const file = new File("/path/document.txt");

// Returns negative value (directory comes first)
const result = sorter.compare(directory, file);
Chat.log(`Directory vs File: ${result < 0 ? "Directory first" : "File first"}`);
```

### File Name Comparison

When comparing items of the same type (both directories or both files), alphabetical ordering is used:

```js
const sorter = new FileChooser.sortFile();

// Comparing two files
const fileA = new File("/path/apple.txt");
const fileB = new File("/path/banana.txt");
Chat.log(`File comparison: ${sorter.compare(fileA, fileB) < 0 ? "apple.txt comes first" : "banana.txt comes first"}`);

// Comparing two directories
const dirA = new File("/path/archive");
const dirB = new File("/path/backup");
Chat.log(`Directory comparison: ${sorter.compare(dirA, dirB) < 0 ? "archive comes first" : "backup comes first"}`);
```

### Case Sensitivity

The sorting is case-sensitive, following Java's default string comparison rules:

```js
const sorter = new FileChooser.sortFile();

// Uppercase letters come before lowercase in ASCII ordering
const upperFile = new File("/path/Zeus.txt");
const lowerFile = new File("/path/apple.txt");
Chat.log(`Case sensitive: ${sorter.compare(upperFile, lowerFile) < 0 ? "Zeus comes before apple" : "apple comes before Zeus"}`);
```

## Usage Examples

### Basic File List Sorting

```js
function sortFileList(directory) {
    const sorter = new FileChooser.sortFile();
    const files = directory.listFiles();

    if (files) {
        // Convert Java array to JavaScript array for easier manipulation
        const fileList = Array.from(files);

        // Sort using the FileChooser.sortFile comparator
        fileList.sort(sorter);

        // Display the sorted results
        Chat.log("§6Sorted File List:");
        fileList.forEach((file, index) => {
            const type = file.isDirectory() ? "§e[DIR]" : "§f[FILE]";
            const name = file.getName();
            Chat.log(`${(index + 1).toString().padStart(3, " ")}. ${type} ${name}`);
        });
    }
}

// Usage
const macroFolder = JsMacros.getFile("macros").getFile();
sortFileList(macroFolder);
```

### Custom File Browser with Sorting

```js
function createCustomFileBrowser(startDirectory) {
    const sorter = new FileChooser.sortFile();

    return {
        currentDirectory: startDirectory,

        getSortedFiles: function() {
            const files = this.currentDirectory.listFiles();
            if (!files) return [];

            const fileList = Array.from(files);
            fileList.sort(sorter);

            return fileList.map(file => ({
                name: file.getName(),
                isDirectory: file.isDirectory(),
                size: file.isDirectory() ? null : file.length(),
                lastModified: new Date(file.lastModified()),
                file: file
            }));
        },

        navigateToDirectory: function(directory) {
            if (directory && directory.isDirectory()) {
                this.currentDirectory = directory;
                Chat.log(`§aNavigated to: §f${directory.getAbsolutePath()}`);
                this.displayContents();
            } else {
                Chat.log(`§cInvalid directory: ${directory}`);
            }
        },

        displayContents: function() {
            const sortedFiles = this.getSortedFiles();

            Chat.log(`§7=== Contents of ${this.currentDirectory.getName()} ===`);
            Chat.log(`§7Total items: ${sortedFiles.length}`);

            // Display directories
            const directories = sortedFiles.filter(item => item.isDirectory);
            if (directories.length > 0) {
                Chat.log(`§eDirectories (${directories.length}):`);
                directories.forEach(dir => {
                    Chat.log(`  §e📁 ${dir.name}`);
                });
            }

            // Display files
            const files = sortedFiles.filter(item => !item.isDirectory);
            if (files.length > 0) {
                Chat.log(`§fFiles (${files.length}):`);
                files.forEach(file => {
                    const size = file.size ? `${(file.size / 1024).toFixed(2)} KB` : "N/A";
                    Chat.log(`  §f📄 ${file.name} §7(${size})`);
                });
            }
        },

        // Navigate to parent directory
        goBack: function() {
            const parent = this.currentDirectory.getParentFile();
            if (parent && !parent.equals(this.currentDirectory)) {
                this.navigateToDirectory(parent);
            } else {
                Chat.log("§cAlready at root directory");
            }
        }
    };
}

// Usage example
const browser = createCustomFileBrowser(JsMacros.getFile("macros").getFile());
browser.displayContents();

// Navigate to a subdirectory (if it exists)
// browser.navigateToDirectory(new File(browser.currentDirectory, "scripts"));
```

### File Analysis with Sorting

```js
function analyzeDirectoryStructure(directory) {
    const sorter = new FileChooser.sortFile();
    const files = directory.listFiles();

    if (!files) return null;

    const fileList = Array.from(files);
    fileList.sort(sorter);

    const analysis = {
        totalItems: fileList.length,
        directories: 0,
        regularFiles: 0,
        totalSize: 0,
        largestFile: null,
        smallestFile: null,
        newestFile: null,
        oldestFile: null,
        items: []
    };

    fileList.forEach(file => {
        const itemInfo = {
            name: file.getName(),
            isDirectory: file.isDirectory(),
            size: file.isDirectory() ? 0 : file.length(),
            lastModified: file.lastModified()
        };

        analysis.items.push(itemInfo);

        if (file.isDirectory()) {
            analysis.directories++;
        } else {
            analysis.regularFiles++;
            analysis.totalSize += file.length();

            // Track largest and smallest files
            if (!analysis.largestFile || file.length() > analysis.largestFile.size) {
                analysis.largestFile = itemInfo;
            }
            if (!analysis.smallestFile || file.length() < analysis.smallestFile.size) {
                analysis.smallestFile = itemInfo;
            }

            // Track newest and oldest files
            if (!analysis.newestFile || file.lastModified() > analysis.newestFile.lastModified) {
                analysis.newestFile = itemInfo;
            }
            if (!analysis.oldestFile || file.lastModified() < analysis.oldestFile.lastModified) {
                analysis.oldestFile = itemInfo;
            }
        }
    });

    return analysis;
}

function displayDirectoryAnalysis(directory) {
    const analysis = analyzeDirectoryStructure(directory);
    if (!analysis) {
        Chat.log("§cFailed to analyze directory");
        return;
    }

    Chat.log(`§6=== Directory Analysis: ${directory.getName()} ===`);
    Chat.log(`§7Total items: §f${analysis.totalItems}`);
    Chat.log(`§7Directories: §e${analysis.directories}`);
    Chat.log(`§7Files: §f${analysis.regularFiles}`);
    Chat.log(`§7Total size: §f${(analysis.totalSize / 1024 / 1024).toFixed(2)} MB`);

    if (analysis.largestFile) {
        Chat.log(`§7Largest file: §f${analysis.largestFile.name} §7(${(analysis.largestFile.size / 1024).toFixed(2)} KB)`);
    }
    if (analysis.smallestFile) {
        Chat.log(`§7Smallest file: §f${analysis.smallestFile.name} §7(${analysis.smallestFile.size} bytes)`);
    }
    if (analysis.newestFile) {
        Chat.log(`§7Newest file: §f${analysis.newestFile.name} §7(${new Date(analysis.newestFile.lastModified).toLocaleDateString()})`);
    }
    if (analysis.oldestFile) {
        Chat.log(`§7Oldest file: §f${analysis.oldestFile.name} §7(${new Date(analysis.oldestFile.lastModified).toLocaleDateString()})`);
    }

    // Show first few items in sorted order
    Chat.log(`§7First 10 items (sorted):`);
    analysis.items.slice(0, 10).forEach((item, index) => {
        const icon = item.isDirectory ? "📁" : "📄";
        const type = item.isDirectory ? "§e" : "§f";
        Chat.log(`  ${type}${icon} ${item.name}`);
    });
}

// Usage
const macroFolder = JsMacros.getFile("macros").getFile();
displayDirectoryAnalysis(macroFolder);
```

### Recursive Directory Tree with Sorting

```js
function buildDirectoryTree(directory, maxDepth = 3, currentDepth = 0) {
    const sorter = new FileChooser.sortFile();

    if (currentDepth >= maxDepth) {
        return null;
    }

    const files = directory.listFiles();
    if (!files) return null;

    const fileList = Array.from(files);
    fileList.sort(sorter);

    const tree = {
        name: directory.getName(),
        path: directory.getAbsolutePath(),
        isDirectory: true,
        children: [],
        fileCount: 0,
        directoryCount: 0
    };

    fileList.forEach(file => {
        if (file.isDirectory()) {
            tree.directoryCount++;
            const subtree = buildDirectoryTree(file, maxDepth, currentDepth + 1);
            if (subtree) {
                tree.children.push(subtree);
                tree.fileCount += subtree.fileCount;
                tree.directoryCount += subtree.directoryCount;
            }
        } else {
            tree.fileCount++;
            tree.children.push({
                name: file.getName(),
                path: file.getAbsolutePath(),
                isDirectory: false,
                size: file.length(),
                lastModified: file.lastModified()
            });
        }
    });

    return tree;
}

function displayDirectoryTree(tree, prefix = "", isLast = true) {
    if (!tree) return;

    const connector = isLast ? "└── " : "├── ";
    const icon = tree.isDirectory ? "📁" : "📄";
    const color = tree.isDirectory ? "§e" : "§f";

    Chat.log(`${prefix}${connector}${color}${icon} ${tree.name}`);

    if (tree.isDirectory && tree.children.length > 0) {
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        tree.children.forEach((child, index) => {
            const isLastChild = index === tree.children.length - 1;
            displayDirectoryTree(child, newPrefix, isLastChild);
        });
    }
}

function showDirectoryTree(directory, maxDepth = 2) {
    const tree = buildDirectoryTree(directory, maxDepth);
    if (tree) {
        Chat.log(`§6=== Directory Tree: ${tree.name} ===`);
        Chat.log(`§7Directories: ${tree.directoryCount}, Files: ${tree.fileCount}`);
        displayDirectoryTree(tree);
    }
}

// Usage
const macroFolder = JsMacros.getFile("macros").getFile();
showDirectoryTree(macroFolder, 2);
```

### File Search with Sorted Results

```js
function searchFiles(directory, searchTerm, includeContent = false) {
    const sorter = new FileChooser.sortFile();
    const results = [];

    function searchRecursive(dir, term, includeContent) {
        const files = dir.listFiles();
        if (!files) return;

        const fileList = Array.from(files);
        fileList.sort(sorter);

        fileList.forEach(file => {
            // Check if filename matches search term
            if (file.getName().toLowerCase().includes(term.toLowerCase())) {
                results.push({
                    name: file.getName(),
                    path: file.getAbsolutePath(),
                    isDirectory: file.isDirectory(),
                    size: file.isDirectory() ? 0 : file.length(),
                    lastModified: file.lastModified(),
                    matchType: "filename"
                });
            }

            // Search in subdirectories
            if (file.isDirectory()) {
                searchRecursive(file, term, includeContent);
            }
            // Optional: search within file content
            else if (includeContent && file.length() < 1024 * 1024) { // Limit to files < 1MB
                try {
                    const content = File.readText(file.getAbsolutePath());
                    if (content.toLowerCase().includes(term.toLowerCase())) {
                        results.push({
                            name: file.getName(),
                            path: file.getAbsolutePath(),
                            isDirectory: false,
                            size: file.length(),
                            lastModified: file.lastModified(),
                            matchType: "content"
                        });
                    }
                } catch (e) {
                    // Skip files that can't be read
                }
            }
        });
    }

    searchRecursive(directory, searchTerm, includeContent);

    // Sort results using the same comparator
    results.sort((a, b) => {
        if (a.isDirectory ^ b.isDirectory) {
            return a.isDirectory ? -1 : 1;
        } else {
            return a.name.localeCompare(b.name);
        }
    });

    return results;
}

function performFileSearch(searchTerm, includeContent = false) {
    const macroFolder = JsMacros.getFile("macros").getFile();
    const results = searchFiles(macroFolder, searchTerm, includeContent);

    Chat.log(`§6=== Search Results for "${searchTerm}" ===`);
    Chat.log(`§7Found ${results.length} items:`);

    results.forEach((result, index) => {
        const icon = result.isDirectory ? "📁" : "📄";
        const color = result.isDirectory ? "§e" : "§f";
        const type = result.matchType === "content" ? "§a[CONTENT]" : "§b[NAME]";
        const size = result.isDirectory ? "" : ` §7(${(result.size / 1024).toFixed(2)} KB)`;

        Chat.log(`${(index + 1).toString().padStart(3, " ")}. ${color}${icon} ${type} ${result.name}${size}`);
        Chat.log(`    §7Path: ${result.path}`);
    });
}

// Usage examples
performFileSearch("config"); // Search by filename only
// performFileSearch("function", true); // Search by filename and content
```

## Integration with FileChooser

The `sortFile` comparator is used internally by the FileChooser component to sort files when displaying them in the grid:

```js
// This happens automatically inside FileChooser.setDir()
const files = new ArrayList<>(Arrays.asList(directory.listFiles()));
files.sort(new sortFile()); // Uses this comparator
```

You can also use it for custom file selection interfaces:

```js
function createCustomFileSelector(directory, callback) {
    const sorter = new FileChooser.sortFile();
    const files = directory.listFiles();

    if (files) {
        const sortedFiles = Array.from(files);
        sortedFiles.sort(sorter);

        // Create selection menu (simplified example)
        Chat.log("§6=== Select a File ===");
        sortedFiles.forEach((file, index) => {
            const type = file.isDirectory() ? "§e[DIR]" : "§f[FILE]";
            Chat.log(`${(index + 1).toString().padStart(2, " ")}. ${type} ${file.getName()}`);
        });

        // In a real implementation, you would handle user input here
        // and call the callback with the selected file
    }
}
```

## Performance Considerations

1. **Efficient Sorting**: The comparator provides O(log n) sorting performance when used with Java's built-in sorting algorithms
2. **Minimal Memory Usage**: The comparator itself is stateless and uses very little memory
3. **Case-Sensitive Comparison**: Uses Java's default string comparison which is optimized for performance
4. **No File System Access**: The comparator only works with File objects already in memory, making it fast for repeated comparisons

## Comparison with Other Sorting Approaches

### Custom Sort by Size
```js
// Alternative: Sort by file size (directories first, then by size)
const sizeSorter = {
    compare: function(a, b) {
        if (a.isDirectory() ^ b.isDirectory()) {
            return a.isDirectory() ? -1 : 1;
        }
        if (a.isDirectory() && b.isDirectory()) {
            return a.getName().compareTo(b.getName());
        }
        return Long.compare(a.length(), b.length());
    }
};
```

### Custom Sort by Date
```js
// Alternative: Sort by modification date
const dateSorter = {
    compare: function(a, b) {
        if (a.isDirectory() ^ b.isDirectory()) {
            return a.isDirectory() ? -1 : 1;
        }
        return Long.compare(b.lastModified(), a.lastModified()); // Newest first
    }
};
```

### Case-Insensitive Sort
```js
// Alternative: Case-insensitive sorting
const caseInsensitiveSorter = {
    compare: function(a, b) {
        if (a.isDirectory() ^ b.isDirectory()) {
            return a.isDirectory() ? -1 : 1;
        }
        return a.getName().toLowerCase().compareTo(b.getName().toLowerCase());
    }
};
```

## Error Handling

The `sortFile` comparator is robust and handles edge cases gracefully:

```js
const sorter = new FileChooser.sortFile();

// Handles null values (though File objects shouldn't be null in normal usage)
try {
    // This would normally not occur in FileChooser usage
    const result = sorter.compare(null, null);
} catch (e) {
    Chat.log("§cComparator error: " + e.message);
}

// Handles files with the same name
const file1 = new File("/path/test.txt");
const file2 = new File("/path/test.txt");
Chat.log(`Same files: ${sorter.compare(file1, file2) === 0 ? "Equal" : "Different"}`);
```

## Important Notes

1. **Case Sensitivity**: The sorting is case-sensitive, which means "Apple.txt" comes before "apple.txt"
2. **Directory Priority**: Directories always appear before files, regardless of alphabetical order
3. **Stateless Comparator**: The comparator instance can be reused multiple times without issues
4. **Platform Independence**: Works consistently across different operating systems
5. **Thread Safety**: The comparator is thread-safe and can be used in multi-threaded environments
6. **File System Independence**: Only compares File objects, doesn't access the file system during comparison
7. **Performance**: Optimized for use with large file lists due to simple comparison logic
8. **Integration**: Seamlessly integrates with Java's Collections.sort() and Arrays.sort() methods

## Related Classes

- `FileChooser` - Main file chooser component that uses this comparator
- `FileChooser.fileObj` - Wrapper class for files in the FileChooser display
- `Comparator<File>` - Java interface implemented by this class
- `File` - Java File class for file system representation
- `Arrays.sort()` - Java sorting method that can use this comparator
- `Collections.sort()` - Java collection sorting method that can use this comparator

## Version History

- **1.0.0**: Initial implementation with basic directory-first alphabetical sorting
- **Current**: Stable sorting behavior consistent across JSMacros versions

The `FileChooser.sortFile` class provides a simple yet effective solution for organizing file listings in a user-friendly manner, making it easier for users to navigate through directories and locate files efficiently in JSMacros' file selection interfaces.