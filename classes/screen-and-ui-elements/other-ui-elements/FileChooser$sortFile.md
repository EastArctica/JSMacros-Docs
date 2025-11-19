# FileChooser$sortFile

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