# FS

Provides enhanced functions for interacting with the file system. Accessible from scripts via the global `FS` variable.

All paths are relative to the script's folder unless specified otherwise.

## Methods
- [FS](#fs)
  - [Methods](#methods)
    - [FS.list](#fslist)
    - [FS.exists](#fsexists)
    - [FS.isDir](#fsisdir)
    - [FS.isFile](#fsisfile)
    - [FS.getName](#fsgetname)
    - [FS.toRelativePath](#fstorelativepath)
    - [FS.createFile](#fscreatefile)
      - [Overloads](#overloads)
    - [FS.makeDir](#fsmakedir)
    - [FS.move](#fsmove)
    - [FS.copy](#fscopy)
    - [FS.unlink](#fsunlink)
    - [FS.combine](#fscombine)
    - [FS.getDir](#fsgetdir)
    - [FS.open](#fsopen)
    - [FS.walkFiles](#fswalkfiles)
    - [FS.toRawFile](#fstorawfile)
    - [FS.toRawPath](#fstorawpath)
    - [FS.getRawAttributes](#fsgetrawattributes)

### FS.list
```js
const files = FS.list("my_folder");
for (const file of files) {
    Chat.log(file); // e.g., "config.json"
}
```

**Params**
1. `path: string`: The path to a directory, relative to the script's folder.

**Returns**
* `string[]`: An array of file and directory names within the specified path.

### FS.exists
```js
if (FS.exists("config.json")) {
    Chat.log("Config file found!");
} else {
    Chat.log("Config file not found.");
}
```

**Params**
1. `path: string`: The path to a file or directory, relative to the script's folder.

**Returns**
* `boolean`: `true` if a file or directory exists at the path, `false` otherwise.

### FS.isDir
```js
if (FS.isDir("assets")) {
    Chat.log("'assets' is a directory.");
}
```

**Params**
1. `path: string`: The path to check, relative to the script's folder.

**Returns**
* `boolean`: `true` if the path points to a directory, `false` otherwise.

### FS.isFile
```js
if (FS.isFile("README.md")) {
    Chat.log("README.md is a file.");
}
```

**Params**
1. `path: string`: The path to check, relative to the script's folder.

**Returns**
* `boolean`: `true` if the path points to a file, `false` otherwise.

### FS.getName
```js
const fullName = "data/config.json";
const fileName = FS.getName(fullName);
Chat.log(fileName); // "config.json"
```

**Params**
1. `path: string`: The full path to a file or directory.

**Returns**
* `string`: The final component of the path (the file or directory name).

### FS.toRelativePath
```js
// Assuming the script is in C:/Users/User/jsmacros/macros/my_script/
const absolute = "C:/Users/User/jsmacros/macros/my_script/data/player_stats.json";
const relative = FS.toRelativePath(absolute);
Chat.log(relative); // "data/player_stats.json"
```

**Params**
1. `absolutePath: string`: The absolute path to a file.

**Returns**
* `string`: A path relative to the current script's folder.

### FS.createFile
```js
// Create a file, assuming the 'data' directory already exists
FS.createFile("data", "log.txt");

// Create a file and any necessary parent directories
FS.createFile("logs/today", "session.log", true);
```

**Params**
1. `path: string`: The directory path where the file will be created, relative to the script's folder.
2. `name: string`: The name of the file to create.
3. `createDirs?: boolean = false`: If `true`, creates any non-existent parent directories in the path.

**Returns**
* `boolean`: `true` if the file was created successfully, `false` otherwise.

#### Overloads
- `FS.createFile(path: string, name: string)`
- `FS.createFile(path: string, name: string, createDirs: boolean)`

### FS.makeDir
```js
if (FS.makeDir("new_folder")) {
    Chat.log("Directory created!");
}
```

**Params**
1. `path: string`: The path of the directory to create, relative to the script's folder.

**Returns**
* `boolean`: `true` if the directory was created, `false` if it already exists or an error occurred.

### FS.move
```js
FS.move("old_location/file.txt", "new_location/file.txt");
```

**Params**
1. `from: string`: The source path of the file or directory.
2. `to: string`: The destination path.

**Returns**
* `void`

### FS.copy
```js
FS.copy("source.txt", "backup.txt");
```

**Params**
1. `from: string`: The source path of the file or directory.
2. `to: string`: The destination path.

**Returns**
* `void`

### FS.unlink
```js
if (FS.unlink("temporary_file.tmp")) {
    Chat.log("File deleted.");
}
```

**Params**
1. `path: string`: The path of the file or directory to delete.

**Returns**
* `boolean`: `true` if the deletion was successful, `false` otherwise.

### FS.combine
```js
const folder = "config";
const file = "settings.json";
const fullPath = FS.combine(folder, file);
Chat.log(fullPath); // "config/settings.json" or "config\settings.json"
```

**Params**
1. `patha: string`: The first part of the path.
2. `pathb: string`: The second part of the path.

**Returns**
* `string`: The two paths combined with the correct file separator.

### FS.getDir
```js
const filePath = "data/logs/latest.log";
const dirPath = FS.getDir(filePath);
Chat.log(dirPath); // "data/logs"
```

**Params**
1. `path: string`: The path to a file or directory.

**Returns**
* `string`: The parent directory of the given path.

### FS.open
```js
// Write to a file
const file = FS.open("data.txt");
file.write("Hello, World!");
file.close();

// Read from a file with a specific character set
const file32 = FS.open("utf32_text.txt", "UTF-32");
const content = file32.read();
file32.close();
```

**Params**
1. `path: string`: The path to the file.
2. `charset?: string = "UTF-8"`: The character set to use for reading/writing (e.g., "UTF-8", "UTF-32").

**Returns**
* `FileHandler`: A handler for reading from and writing to the specified file.

### FS.walkFiles
```js
const visitor = JavaWrapper.methodToJava((path, attributes) => {
    if (attributes.isRegularFile()) {
        Chat.log(`File: ${path}, Size: ${attributes.size()} bytes`);
    }
});

// Walk through the current script's directory, up to 5 levels deep
FS.walkFiles(".", 5, false, visitor);
```

**Params**
1. `path: string`: The starting directory path to walk.
2. `maxDepth: int`: The maximum depth of directories to traverse.
3. `followLinks: boolean`: If `true`, symbolic links will be followed.
4. `visitor: MethodWrapper(path: string, attributes: BasicFileAttributes)`: A function that is called for each file and directory found. It receives the path and file attributes.

**Returns**
* `void`

### FS.toRawFile
```js
const rawFile = FS.toRawFile("config.json");
Chat.log(`Absolute path: ${rawFile.getAbsolutePath()}`);
```

**Params**
1. `path: string`: The relative path to the file.

**Returns**
* `java.io.File`: The raw Java `File` object for the specified path.

### FS.toRawPath
```js
const rawPath = FS.toRawPath("config.json");
Chat.log(`Path object: ${rawPath.toString()}`);
```

**Params**
1. `path: string`: The relative path.

**Returns**
* `java.nio.file.Path`: The raw Java `Path` object for the specified path.

### FS.getRawAttributes
```js
const attrs = FS.getRawAttributes("my_script.js");
if (attrs) {
    Chat.log(`Creation time: ${attrs.creationTime()}`);
    Chat.log(`Is directory: ${attrs.isDirectory()}`);
}
```

**Params**
1. `path: string`: The relative path to the file or directory.

**Returns**
* `java.nio.file.attribute.BasicFileAttributes`: The raw Java file attributes object, or throws an IOException if the file does not exist.
