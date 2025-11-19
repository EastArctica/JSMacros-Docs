# FileHandler

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler`

**Since:** `1.1.8`

The `FileHandler` class is a utility class in JSMacros that provides a convenient interface for file operations. It wraps Java's file I/O operations and exposes methods for reading, writing, and managing files with support for different character encodings and both text and binary data operations.

This class simplifies file handling tasks that are commonly needed in scripts, such as reading configuration files, saving data, logging information, and managing script-generated content.

## Overview

The `FileHandler` class provides a high-level interface for file operations with the following key features:

- **Text and Binary Support**: Handle both string/text data and raw byte arrays
- **Encoding Support**: Work with different character encodings (defaults to UTF-8)
- **Read/Write Operations**: Both destructive (replace) and append operations
- **Streaming Support**: Stream large files and iterate through lines efficiently
- **Chaining Support**: Methods return the FileHandler instance for method chaining
- **Resource Management**: Automatic resource cleanup with proper exception handling

## Constructors

### `new FileHandler(path)`

Creates a FileHandler for the specified file path using UTF-8 encoding.

**Parameters:**
- `path` (String): The file path to operate on

**Example:**
```javascript
// Create a FileHandler for a config file
const fileHandler = new FileHandler("./config/settings.txt");

// Create a FileHandler for a log file
const logger = new FileHandler("logs/myscript.log");
```

### `new FileHandler(path, charset)`

Creates a FileHandler for the specified file path with custom encoding.

**Parameters:**
- `path` (String): The file path to operate on
- `charset` (String): The character encoding to use (e.g., "UTF-8", "ISO-8859-1")

**Example:**
```javascript
// Create a FileHandler with UTF-8 encoding
const fileHandler = new FileHandler("./data/unicode.txt", "UTF-8");

// Create a FileHandler with ISO-8859-1 encoding
const legacyFile = new FileHandler("./legacy.txt", "ISO-8859-1");
```

### `new FileHandler(file, charset)`

Creates a FileHandler from a File object with specified encoding.

**Parameters:**
- `file` (File): The File object to operate on
- `charset` (String): The character encoding to use

**Example:**
```javascript
const JavaFile = Java.type("java.io.File");
const myFile = new JavaFile("./custom/path/file.txt");
const fileHandler = new FileHandler(myFile, "UTF-8");
```

### `new FileHandler(file)`

Creates a FileHandler from a File object using UTF-8 encoding.

**Parameters:**
- `file` (File): The File object to operate on

**Example:**
```javascript
const JavaFile = Java.type("java.io.File");
const myFile = new JavaFile("./data.txt");
const fileHandler = new FileHandler(myFile);
```

## Methods

### File Writing Operations

#### `write(text)`

Writes a string to the file, replacing all existing content. This is a destructive operation.

**Parameters:**
- `text` (String): The text content to write

**Returns:** `FileHandler` - Returns this instance for method chaining

**Throws:** `IOException` - If the write operation fails

**Example:**
```javascript
const config = new FileHandler("./config/settings.txt");

try {
    config.write("language=en\nvolume=0.8\nfullscreen=true");
    Chat.log("Configuration saved successfully");
} catch (e) {
    Chat.log("Failed to save configuration: " + e.message);
}
```

#### `write(bytes)`

Writes a byte array to the file, replacing all existing content. This is a destructive operation.

**Parameters:**
- `bytes` (byte[]): The binary data to write

**Returns:** `FileHandler` - Returns this instance for method chaining

**Throws:** `IOException` - If the write operation fails

**Example:**
```javascript
const dataFile = new FileHandler("./data/binary.dat");

// Create some binary data
const data = Java.type("byte[]");
const byteArray = new data([0x48, 0x65, 0x6C, 0x6C, 0x6F]); // "Hello" in bytes

try {
    dataFile.write(byteArray);
    Chat.log("Binary data saved successfully");
} catch (e) {
    Chat.log("Failed to save binary data: " + e.message);
}
```

#### `append(text)`

Appends a string to the end of the file without replacing existing content.

**Parameters:**
- `text` (String): The text content to append

**Returns:** `FileHandler` - Returns this instance for method chaining

**Throws:** `IOException` - If the append operation fails

**Example:**
```javascript
const logFile = new FileHandler("./logs/script.log");

try {
    // Append a timestamped log entry
    const timestamp = new Date().toISOString();
    logFile.append(timestamp + " - Script started\n");
    logFile.append(timestamp + " - Processing data...\n");
    Chat.log("Log entries added successfully");
} catch (e) {
    Chat.log("Failed to write to log: " + e.message);
}
```

#### `append(bytes)`

Appends a byte array to the end of the file without replacing existing content.

**Parameters:**
- `bytes` (byte[]): The binary data to append

**Returns:** `FileHandler` - Returns this instance for method chaining

**Throws:** `IOException` - If the append operation fails

**Example:**
```javascript
const dataFile = new FileHandler("./data/chunk.dat");
const newData = Java.type("byte[]");

try {
    // Append additional data
    const moreData = new newData([0x0A, 0x0D, 0xFF, 0xFE]);
    dataFile.append(moreData);
    Chat.log("Additional binary data appended");
} catch (e) {
    Chat.log("Failed to append binary data: " + e.message);
}
```

### File Reading Operations

#### `read()`

Reads the entire file content as a string using the file's encoding.

**Returns:** `String` - The complete file content as a string

**Throws:** `IOException` - If the read operation fails

**Example:**
```javascript
const configFile = new FileHandler("./config/settings.txt");

try {
    const content = configFile.read();
    Chat.log("Configuration content:");
    Chat.log(content);

    // Parse configuration
    const lines = content.split("\n");
    lines.forEach(line => {
        if (line.includes("=")) {
            const [key, value] = line.split("=");
            Chat.log("Setting: " + key.trim() + " = " + value.trim());
        }
    });
} catch (e) {
    Chat.log("Failed to read configuration: " + e.message);
}
```

#### `readBytes()`

Reads the entire file content as a byte array.

**Returns:** `byte[]` - The complete file content as a byte array

**Throws:** `IOException` - If the read operation fails or file is too large

**Example:**
```javascript
const binaryFile = new FileHandler("./data/texture.dat");

try {
    const data = binaryFile.readBytes();
    Chat.log("Read " + data.length + " bytes from file");

    // Check first few bytes
    if (data.length >= 4) {
        const header = String.fromCharCode(data[0], data[1], data[2], data[3]);
        Chat.log("File header: " + header);
    }
} catch (e) {
    Chat.log("Failed to read binary file: " + e.message);
}
```

#### `readLines()`

Returns an iterator for reading the file line by line. This is memory-efficient for large files.

**Returns:** `FileLineIterator` - An iterator that yields one line at a time

**Note:** You must call `close()` on the iterator when finished to prevent resource leaks.

**Example:**
```javascript
const logFile = new FileHandler("./logs/server.log");

try {
    const lineIterator = logFile.readLines();
    let lineCount = 0;
    let errorCount = 0;

    while (lineIterator.hasNext()) {
        const line = lineIterator.next();
        lineCount++;

        if (line.includes("ERROR") || line.includes("WARN")) {
            errorCount++;
            Chat.log("Found issue: " + line.trim());
        }

        // Stop after processing 1000 lines to avoid lag
        if (lineCount >= 1000) break;
    }

    lineIterator.close();
    Chat.log(`Processed ${lineCount} lines, found ${errorCount} issues`);
} catch (e) {
    Chat.log("Failed to read log file: " + e.message);
}
```

#### `streamBytes()`

Returns a buffered input stream for reading the file as binary data. This is useful for large files or when you need to process data in chunks.

**Returns:** `BufferedInputStream` - A buffered input stream for reading binary data

**Note:** You must call `close()` on the stream when finished to prevent resource leaks.

**Example:**
```javascript
const largeFile = new FileHandler("./data/large_dataset.bin");

try {
    const stream = largeFile.streamBytes();
    const buffer = Java.type("byte[]");
    const readBuffer = new buffer(1024); // Read 1KB at a time
    let totalBytes = 0;

    let bytesRead = stream.read(readBuffer);
    while (bytesRead > 0) {
        totalBytes += bytesRead;
        // Process the buffer here...

        // Read next chunk
        bytesRead = stream.read(readBuffer);
    }

    stream.close();
    Chat.log("Read " + totalBytes + " bytes from large file");
} catch (e) {
    Chat.log("Failed to stream file: " + e.message);
}
```

### Utility Methods

#### `getFile()`

Returns the underlying File object that this FileHandler is operating on.

**Returns:** `File` - The File object

**Example:**
```javascript
const fileHandler = new FileHandler("./config/settings.txt");
const file = fileHandler.getFile();

Chat.log("File path: " + file.getAbsolutePath());
Chat.log("File exists: " + file.exists());
Chat.log("File size: " + file.length() + " bytes");
Chat.log("Is directory: " + file.isDirectory());
Chat.log("Can read: " + file.canRead());
Chat.log("Can write: " + file.canWrite());
```

#### `toString()`

Returns a string representation of the FileHandler, showing the file path.

**Returns:** `String` - String representation of the FileHandler

**Example:**
```javascript
const fileHandler = new FileHandler("./data/test.txt");
Chat.log(fileHandler.toString());
// Output: FileHandler:{"file": "/full/path/to/data/test.txt"}
```

## FileLineIterator

The `FileLineIterator` is returned by the `readLines()` method and provides efficient line-by-line file reading.

### Methods

#### `hasNext()`
**Returns:** `boolean` - True if there are more lines to read

#### `next()`
**Returns:** `String` - The next line in the file (without the line ending)

#### `close()`
Closes the iterator and releases associated resources. This method should be called when you're finished reading.

**Example:**
```javascript
const fileHandler = new FileHandler("./logs/application.log");
const iterator = fileHandler.readLines();

try {
    while (iterator.hasNext()) {
        const line = iterator.next();

        // Process line
        if (line.toLowerCase().includes("error")) {
            Chat.log("ERROR: " + line.trim());
        }
    }
} finally {
    // Always close to prevent resource leaks
    iterator.close();
}
```

## Usage Examples

### Example 1: Configuration File Manager

```javascript
function createConfigManager(configPath) {
    return {
        fileHandler: new FileHandler(configPath),

        load: function() {
            try {
                const content = this.fileHandler.read();
                const config = {};

                content.split("\n").forEach(line => {
                    line = line.trim();
                    if (line && !line.startsWith("#")) {
                        const [key, ...valueParts] = line.split("=");
                        if (key && valueParts.length > 0) {
                            config[key.trim()] = valueParts.join("=").trim();
                        }
                    }
                });

                return config;
            } catch (e) {
                Chat.log("Failed to load config: " + e.message);
                return {};
            }
        },

        save: function(config) {
            try {
                let content = "# Generated Configuration File\n";
                content += "# Created: " + new Date().toISOString() + "\n\n";

                for (const [key, value] of Object.entries(config)) {
                    content += key + "=" + value + "\n";
                }

                this.fileHandler.write(content);
                Chat.log("Configuration saved successfully");
                return true;
            } catch (e) {
                Chat.log("Failed to save config: " + e.message);
                return false;
            }
        },

        addSetting: function(key, value) {
            try {
                this.fileHandler.append(key + "=" + value + "\n");
                return true;
            } catch (e) {
                Chat.log("Failed to add setting: " + e.message);
                return false;
            }
        }
    };
}

// Usage
const configManager = createConfigManager("./config/myscript.conf");

// Load existing config
const settings = configManager.load();
Chat.log("Loaded settings:", JSON.stringify(settings));

// Add new setting
configManager.addSetting("last_run", new Date().toISOString());

// Save updated config
settings.version = "2.0";
configManager.save(settings);
```

### Example 2: Log File Analyzer

```javascript
function analyzeLogFile(logPath, searchTerms) {
    const fileHandler = new FileHandler(logPath);
    const results = {
        totalLines: 0,
        matches: {},
        summary: []
    };

    // Initialize results for search terms
    searchTerms.forEach(term => {
        results.matches[term] = 0;
    });

    try {
        const iterator = fileHandler.readLines();

        while (iterator.hasNext()) {
            const line = iterator.next();
            results.totalLines++;

            // Check for search terms
            searchTerms.forEach(term => {
                if (line.toLowerCase().includes(term.toLowerCase())) {
                    results.matches[term]++;

                    // Store important matches
                    if (term === "error" || term === "critical") {
                        results.summary.push({
                            line: results.totalLines,
                            type: term.toUpperCase(),
                            message: line.trim()
                        });
                    }
                }
            });

            // Process reasonable amount of lines to avoid lag
            if (results.totalLines >= 5000) {
                Chat.log("Reached maximum line limit for analysis");
                break;
            }
        }

        iterator.close();

    } catch (e) {
        Chat.log("Failed to analyze log file: " + e.message);
        return null;
    }

    return results;
}

// Usage
const logAnalyzer = analyzeLogFile("./logs/latest.log", ["error", "warn", "info", "debug"]);

if (logAnalyzer) {
    Chat.log("=== Log Analysis Results ===");
    Chat.log("Total lines processed: " + logAnalyzer.totalLines);

    Chat.log("Keyword matches:");
    for (const [term, count] of Object.entries(logAnalyzer.matches)) {
        Chat.log("  " + term + ": " + count);
    }

    if (logAnalyzer.summary.length > 0) {
        Chat.log("Critical issues found:");
        logAnalyzer.summary.slice(0, 10).forEach(issue => {
            Chat.log("  Line " + issue.line + " [" + issue.type + "]: " + issue.message);
        });

        if (logAnalyzer.summary.length > 10) {
            Chat.log("  ... and " + (logAnalyzer.summary.length - 10) + " more");
        }
    }
}
```

### Example 3: Data Export/Import System

```javascript
function createDataManager(dataPath) {
    return {
        fileHandler: new FileHandler(dataPath),

        exportData: function(data) {
            try {
                const jsonData = JSON.stringify(data, null, 2);
                this.fileHandler.write(jsonData);
                Chat.log("Data exported successfully to " + dataPath);
                return true;
            } catch (e) {
                Chat.log("Failed to export data: " + e.message);
                return false;
            }
        },

        importData: function() {
            try {
                const content = this.fileHandler.read();
                return JSON.parse(content);
            } catch (e) {
                Chat.log("Failed to import data: " + e.message);
                return null;
            }
        },

        appendRecord: function(record) {
            try {
                const jsonLine = JSON.stringify(record) + "\n";
                this.fileHandler.append(jsonLine);
                return true;
            } catch (e) {
                Chat.log("Failed to append record: " + e.message);
                return false;
            }
        },

        streamImportRecords: function(callback) {
            try {
                const iterator = this.fileHandler.readLines();
                let count = 0;

                while (iterator.hasNext()) {
                    const line = iterator.next().trim();
                    if (line) {
                        try {
                            const record = JSON.parse(line);
                            callback(record);
                            count++;
                        } catch (parseError) {
                            Chat.log("Failed to parse record: " + line);
                        }
                    }
                }

                iterator.close();
                Chat.log("Streamed " + count + " records successfully");
                return count;
            } catch (e) {
                Chat.log("Failed to stream records: " + e.message);
                return 0;
            }
        }
    };
}

// Usage example: Player statistics tracking
const statsManager = createDataManager("./data/player_stats.json");

// Save current player stats
const player = Player.getPlayer();
const currentStats = {
    timestamp: Date.now(),
    x: Math.floor(player.getX()),
    y: Math.floor(player.getY()),
    z: Math.floor(player.getZ()),
    health: player.getHealth(),
    food: player.getFoodLevel(),
    experience: player.experience
};

statsManager.exportData(currentStats);

// Load previous stats
const previousStats = statsManager.importData();
if (previousStats) {
    const distance = Math.sqrt(
        Math.pow(currentStats.x - previousStats.x, 2) +
        Math.pow(currentStats.z - previousStats.z, 2)
    );
    Chat.log("Player moved " + distance.toFixed(2) + " blocks since last recording");
}
```

### Example 4: Binary File Processor

```javascript
function processBinaryFile(inputPath, outputPath, processor) {
    const inputFile = new FileHandler(inputPath);
    const outputFile = new FileHandler(outputPath);

    try {
        // Read input as bytes
        const inputData = inputFile.readBytes();
        Chat.log("Read " + inputData.length + " bytes from input file");

        // Process the data (example: simple XOR encryption)
        const outputData = processor(inputData);

        // Write processed data
        outputFile.write(outputData);
        Chat.log("Wrote " + outputData.length + " bytes to output file");

        return true;
    } catch (e) {
        Chat.log("Failed to process binary file: " + e.message);
        return false;
    }
}

// Example processor: Simple XOR cipher
function xorCipher(data, key) {
    const result = Java.type("byte[]");
    const output = new result(data.length);

    for (let i = 0; i < data.length; i++) {
        output[i] = (data[i] ^ key) & 0xFF;
    }

    return output;
}

// Usage
const key = 0xAB; // Encryption key
const success = processBinaryFile(
    "./data/secret.bin",
    "./data/secret.encrypted",
    (data) => xorCipher(data, key)
);

if (success) {
    Chat.log("File encryption completed");

    // Decrypt back
    processBinaryFile(
        "./data/secret.encrypted",
        "./data/secret.decrypted",
        (data) => xorCipher(data, key) // XOR with same key to decrypt
    );
}
```

### Example 5: Streaming Large File Processor

```javascript
function processLargeFileInChunks(filePath, chunkSize, processor) {
    const fileHandler = new FileHandler(filePath);

    try {
        const stream = fileHandler.streamBytes();
        const buffer = Java.type("byte[]");
        const readBuffer = new buffer(chunkSize);

        let totalChunks = 0;
        let totalBytes = 0;

        let bytesRead = stream.read(readBuffer);
        while (bytesRead > 0) {
            // Create a buffer with only the bytes we actually read
            const chunk = Java.type("byte[]");
            const actualChunk = new chunk(bytesRead);
            System.arraycopy(readBuffer, 0, actualChunk, 0, bytesRead);

            // Process the chunk
            processor(actualChunk, totalChunks);

            totalChunks++;
            totalBytes += bytesRead;

            // Read next chunk
            bytesRead = stream.read(readBuffer);

            // Prevent script from running too long
            if (totalChunks % 100 === 0) {
                // Brief pause to prevent game freeze
                java.lang.Thread.sleep(10);
            }
        }

        stream.close();
        Chat.log("Processed " + totalBytes + " bytes in " + totalChunks + " chunks");

        return { totalChunks, totalBytes };
    } catch (e) {
        Chat.log("Failed to process large file: " + e.message);
        return null;
    }
}

// Usage: Calculate file checksum
function calculateChecksum(filePath) {
    let checksum = 0;

    const result = processLargeFileInChunks(
        filePath,
        8192, // 8KB chunks
        (chunk, chunkNumber) => {
            for (let i = 0; i < chunk.length; i++) {
                checksum = (checksum + (chunk[i] & 0xFF)) & 0xFFFFFFFF;
            }

            if (chunkNumber % 50 === 0) {
                Chat.log("Processed chunk " + chunkNumber + ", current checksum: " + checksum);
            }
        }
    );

    if (result) {
        Chat.log("Final checksum: " + checksum);
        return checksum;
    }

    return null;
}

// Calculate checksum of a file
calculateChecksum("./data/large_file.dat");
```

## Error Handling

The FileHandler class throws `IOException` for most file operations. Always wrap file operations in try-catch blocks:

```javascript
function safeFileOperation(filePath, operation) {
    const fileHandler = new FileHandler(filePath);

    try {
        return operation(fileHandler);
    } catch (e) {
        Chat.log("File operation failed: " + e.message);
        Chat.log("File path: " + filePath);
        return null;
    }
}

// Usage
const content = safeFileOperation("./config.txt", (handler) => handler.read());
if (content !== null) {
    Chat.log("Successfully read file");
}
```

## Performance Considerations

1. **Use Streaming for Large Files**: For files larger than a few megabytes, use `readLines()` or `streamBytes()` instead of `read()` or `readBytes()`

2. **Close Resources**: Always close iterators and streams when finished to prevent resource leaks

3. **Buffer Size**: When streaming, choose appropriate buffer sizes (4KB-8KB is usually optimal)

4. **Encoding Considerations**: Use UTF-8 encoding unless you specifically need another encoding

5. **Method Chaining**: Take advantage of method chaining for multiple operations on the same file

## Important Notes

1. **Destructive Operations**: `write()` methods replace all file content, while `append()` methods add to the end

2. **Character Encoding**: Be consistent with character encoding when reading and writing text files

3. **File Paths**: Use relative paths for files in the script directory, absolute paths for system files

4. **Resource Management**: Always close iterators and streams to prevent memory leaks

5. **Large File Support**: `readBytes()` throws IOException if the file is larger than `Integer.MAX_VALUE` bytes (~2GB)

6. **Thread Safety**: FileHandler instances are not thread-safe. Create separate instances for concurrent operations

## Version History

- **1.1.8**: Initial release with basic read/write operations
- **1.2.6**: Added `readBytes()` and binary append operations
- **1.8.4**: Added `readLines()` and `streamBytes()` for efficient large file processing

## See Also

- [Java File](https://docs.oracle.com/javase/8/docs/api/java/io/File.html) - Java File class documentation
- [IOException](https://docs.oracle.com/javase/8/docs/api/java/io/IOException.html) - Exception handling for I/O operations
- [Charset](https://docs.oracle.com/javase/8/docs/api/java/nio/charset/Charset.html) - Character encoding information
- [BufferedInputStream](https://docs.oracle.com/javase/8/docs/api/java/io/BufferedInputStream.html) - Stream-based reading operations