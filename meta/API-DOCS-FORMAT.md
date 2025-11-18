# API Documentation Format Specification

This document describes the standardized format used for API/library documentation files in the JsMacros-Docs project.

## Overview

API documentation files describe the global JavaScript objects available to scripts in JsMacros. These objects provide functions and fields for interacting with Minecraft, the file system, HTTP requests, and other features.

## Standard Format

All API documentation files follow a consistent structure with the following sections:

### 1. Title (H1)
- Format: `# [LibraryName]`
- Examples: `# Chat`, `# Player`, `# World`, `# FS`
- Should match the global variable name used in scripts

### 2. Description
A brief paragraph describing:
- The purpose and functionality of the library
- How to access it from scripts (always via a global variable)
- Optional: Important notes, warnings, or context

**Format:**
```markdown
[Brief description of functionality]. Accessible from scripts via the global `[LibraryName]` variable.
```

**Examples:**
- `Functions for interacting with chat. Accessible from scripts via the global Chat variable.`
- `Functions for getting and using world data, including blocks, entities, players, and environmental information. Accessible from scripts via the global World variable.`
- `Provides enhanced functions for interacting with the file system. Accessible from scripts via the global FS variable.`

**Special Cases:**

For advanced/dangerous libraries, add warnings:
```markdown
**Warning:** This is an advanced library. Misuse can easily lead to script errors or game crashes. A basic understanding of [concept] is recommended.
```

For libraries with special path behavior:
```markdown
All paths are relative to the script's folder unless specified otherwise.
```

### 3. Fields Section (Optional)
If the library exposes public fields/properties, document them in this section.

**Format:**
```markdown
## Fields
- [LibraryName.fieldName](#librarynamefieldname)
- [LibraryName.anotherField](#librarynameanotherfield)
```

Each field then gets a detailed H3 subsection later in the document (see Field Details section).

### 4. Methods Section
List all available methods as a table of contents with anchor links.

**Format:**
```markdown
## Methods
- [LibraryName.methodName](#librarynamemethodname)
- [LibraryName.anotherMethod / alternativeName](#librarynameanothermethod--alternativename)
```

**Notes:**
- Use anchor links in kebab-case (lowercase with hyphens)
- For methods with alternative names, use ` / ` separator
- Remove parentheses from method names in links
- List methods in logical order (common methods first, advanced methods last)

### 5. Field Details (if applicable)
Document each field with its own H3 section.

**Format:**
```markdown
### LibraryName.fieldName
[Description of what the field represents and any usage notes.]

**Type**
* `JavaTypeName` or `primitiveType`

**Notes** (optional)
Additional warnings or usage information, such as:
- "Do not modify."
- "Do not modify this directly."
- "Direct modification is possible but using the provided methods is recommended."
```

**Examples:**
```markdown
### World.serverInstantTPS
The server's current instantaneous Ticks Per Second (TPS). Do not modify.

**Type**: `double`
```

### 6. Method Details
Document each method with its own H3 section immediately after the Methods list or Field Details.

**Format:**
```markdown
### LibraryName.methodName
\`\`\`js
// Example code showing typical usage
const result = LibraryName.methodName(arg1, arg2);
\`\`\`
[Optional prose description of what the method does.]

**Params**
1. `paramName: type`: Description of the parameter.
2. `optionalParam?: type = defaultValue`: Description of optional parameter.
3. `restParams: type[]`: Description of array/rest parameter.

**Returns**
* `ReturnType`: Description of what is returned.

**Throws** (optional)
* `ExceptionType`: When this exception is thrown.

**Notes** (optional)
Additional important information about usage, behavior, or caveats.

#### Overloads (optional)
- `LibraryName.methodName(param1: type1)`
- `LibraryName.methodName(param1: type1, param2: type2)`
```

## Detailed Component Specifications

### Code Examples
Every method should include at least one working code example that demonstrates typical usage.

**Guidelines:**
- Use triple backticks with `js` language identifier
- Show complete, runnable examples when possible
- Include comments to explain non-obvious parts
- Show multiple usage patterns if the method has overloads
- Use realistic variable names and scenarios
- Demonstrate output when relevant (using `Chat.log()`)

**Example Patterns:**

Simple example:
```js
\`\`\`js
Chat.log("Hello World!");
\`\`\`
```

Example with variable capture:
```js
\`\`\`js
const player = Player.getPlayer();
const pos = player.getPos();
Chat.log(`Player is at X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z}`);
\`\`\`
```

Example showing multiple overloads:
```js
\`\`\`js
Chat.logf("Hello, %s!", ["Steve"]);
Chat.logf("Hello, %s!", true, ["Steve"]);
\`\`\`
```

### Parameters Documentation

**Format for each parameter:**
```
1. `paramName: type`: Description.
2. `optionalParam?: type = defaultValue`: Description.
```

**Type Annotations:**
- Primitive types: `string`, `int`, `long`, `float`, `double`, `boolean`, `void`
- Java types: Full class names or common abbreviations
  - `java.util.Map<string, string>`
  - `java.util.List<T>`
  - `java.lang.Class<T>`
- Helper objects: `EntityHelper`, `BlockDataHelper`, `ItemStackHelper`, etc.
- Script objects: `ScriptScreen`, `IScreen`, `HTTPRequest`, `MethodWrapper`
- Arrays: `type[]` (e.g., `string[]`, `any[]`)
- Generic: `T`, `any`, `?`

**Optional Parameters:**
- Mark with `?` after name: `await?: boolean`
- Include default value if applicable: `await?: boolean = false`
- List optional parameters after required ones

**Parameter Descriptions:**
- Start with capital letter
- End with period
- Be concise but clear
- Include valid value ranges or examples when helpful
- Note special behavior or constraints

### Return Values Documentation

**Format:**
```markdown
**Returns**
* `ReturnType`: Description of what is returned.
```

**Guidelines:**
- Always include return type, even for `void`
- For `void` methods, just list `* void` (no description needed)
- Describe what the returned object/value represents
- Note if return value can be `null`
- For complex returns, explain the object's purpose

**Examples:**
```markdown
**Returns**
* `void`
```

```markdown
**Returns**
* `ClientPlayerEntityHelper`: The wrapper for the player entity, providing access to its properties and methods.
```

```markdown
**Returns**
* `string | null`: The guessed username, or `null` if a name could not be determined.
```

### Overloads Documentation

When a method has multiple signatures, document overloads after the main documentation.

**Format:**
```markdown
#### Overloads
- `LibraryName.methodName(param1: type1)`
- `LibraryName.methodName(param1: type1, param2: type2)`
- `LibraryName.methodName(param1: type1, param2: type2, param3: type3)`
```

**Guidelines:**
- List from simplest (fewest params) to most complex
- Show complete method signature for each overload
- Include types for all parameters
- Use same parameter names as in main documentation

### Notes Section

Use the **Notes** section for:
- Important warnings about behavior
- Performance considerations
- Cross-version compatibility information
- References to related methods or concepts
- Clarification of complex behavior
- Threading or synchronization warnings
- Deprecation notices

**Format:**
```markdown
**Notes**
This method blocks the current script thread. It should not be used in a synchronous callback...
```

Or for multiple notes:
```markdown
**Notes**
- Warning about threading
- Note about server compatibility
- Performance consideration
```

### Throws Section

Document exceptions only when they are commonly encountered or important to handle.

**Format:**
```markdown
**Throws**
* `ExceptionType`: Description of when/why this is thrown.
```

**Example:**
```markdown
**Throws**
* `IOException`: If there's an error sending the GET request.
```

## Method Naming Conventions

### Alternative Method Names
When a method has multiple names or shortcuts, document both:
```markdown
### Player.getInteractionManager / interactions
```

In the description, clarify both names:
```js
const interactionManager = Player.getInteractionManager();
// OR
const interactionManager = Player.interactions();
```

### Method Name Patterns
Common patterns in JsMacros APIs:
- `get[Something]` - Retrieve data or objects
- `set[Something]` - Modify state
- `create[Something]` - Construct new objects
- `is[Something]` - Boolean checks
- `open[Something]` - Open UI or resources
- `register[Something]` - Register listeners/handlers
- `unregister[Something]` - Remove listeners/handlers

## Special Documentation Patterns

### For Advanced/Raw Access Methods
```markdown
**Notes**
This provides raw access to the [JavaClass] java class. On fabric, methods, fields, and classes can be accessed via their intermediary names (ex. method_29043). If the minecraft version is 1.21.11 or beyond, they can be accessed via their unobfuscated Mojang names.
```

### For Internal/Advanced Fields
```markdown
### LibraryName.internalField
[Description]. Do not modify this directly.

**Type**
* `ComplexJavaType`
```

### For Threading-Sensitive Methods
```markdown
**Notes**
This method blocks the current script thread. It should not be used in a synchronous callback (one created with `JavaWrapper.methodToJava()`) that runs on the main game thread (e.g., a button click), as it will freeze the game. It is safe to use in the main body of your script or in asynchronous event listeners.
```

### For Version-Specific Features
```markdown
**Notes**
On fabric, methods, fields, and classes can be accessed via their intermediary names (ex. method_29043). If the minecraft version is 1.21.11 or beyond, they can be accessed via their unobfuscated Mojang names.
```

### For Relative Paths
```markdown
All paths are relative to the script's folder unless specified otherwise.
```

Or in method documentation:
```markdown
**Params**
1. `path: string`: The path to a file or directory, relative to the script's folder.
```

## Type Documentation Standards

### Primitive Types
- `string` - Text values
- `int` - 32-bit integers
- `long` - 64-bit integers  
- `float` - 32-bit floating point
- `double` - 64-bit floating point
- `boolean` - true/false values
- `void` - No return value
- `any` - Any type (rarely used)

### Common Java Types
- `java.util.Map<K, V>` - Key-value maps
- `java.util.List<T>` - Ordered lists
- `java.util.Set<T>` - Unordered unique sets
- `java.util.ArrayList<T>` - Array-backed list
- `java.util.HashMap<K, V>` - Hash-based map
- `java.util.HashSet<T>` - Hash-based set
- `java.lang.Class<T>` - Class objects
- `java.lang.reflect.Method` - Reflection method
- `java.lang.reflect.Field` - Reflection field

### JsMacros Helper Types
- `EntityHelper<?>` - Wrapped entity
- `ClientPlayerEntityHelper` - Wrapped player
- `BlockDataHelper` - Block information
- `ItemStackHelper` - Item stack data
- `PlayerListEntryHelper` - Player list entry
- `Inventory` - Player inventory
- `InteractionManagerHelper` - Interaction management
- `ScriptScreen` - Custom GUI screen
- `IScreen` - Screen interface
- `TextHelper` - Chat/text component
- `HTTPRequest` - HTTP request builder
- `HTTPRequest.Response` - HTTP response
- `MethodWrapper` - Wrapped callback function

### Position/Vector Types
- `Pos3D` - 3D position (x, y, z)
- `Pos2D` - 2D position (x, y)
- `Vec3D` - 3D vector
- `Vec2D` - 2D vector
- `BlockPosHelper` - Block position

## Markdown Formatting Standards

### Inline Code
Use backticks for:
- Variable names: `` The `player` variable ``
- Method names: `` Use `Chat.log()` to... ``
- Field names: `` The `x` field contains... ``
- Type names: `` Returns a `string` value ``
- Key names: `` Press `"key.keyboard.w"` to... ``
- Code literals: `` Set to `true` or `false` ``

### Code Blocks
- Use triple backticks with `js` language identifier
- Indent properly (2 spaces per level)
- Include helpful comments
- Show complete, working examples

### Lists
- Use `-` for unordered lists (Methods, Fields sections)
- Use `1.`, `2.`, etc. for ordered lists (Parameters)
- Use `*` for sub-items in Notes/Returns sections
- Keep consistent bullet style within each section

### Emphasis
- Use `**bold**` for section headers within method docs: `**Params**`, `**Returns**`, `**Notes**`
- Use `*italic*` sparingly for emphasis in prose
- Use backticks for technical terms, not bold or italic

## Section Ordering

The standard order for API documentation:

1. Title (H1)
2. Description paragraph
3. Fields section (H2) - if applicable
4. Methods section (H2)
5. Fields details (H3 for each) - if applicable
6. Methods details (H3 for each)

Within each method documentation:
1. Method heading (H3)
2. Code example(s)
3. Prose description (optional)
4. **Params** section
5. **Returns** section
6. **Throws** section (optional)
7. **Notes** section (optional)
8. **Overloads** section (H4, optional)

## File Naming Convention

- Filename: Kebab-case matching the library name
- Format: `library-name.md`
- Examples:
  - `chat.md` → `Chat` global
  - `player.md` → `Player` global
  - `java-wrapper.md` → `JavaWrapper` global
  - `global-vars.md` → `GlobalVars` global
  - `fs.md` → `FS` global

## Common API Categories

### Core Libraries
- `JsMacros` - Core mod functionality
- `JavaWrapper` - Function wrapping utilities
- `GlobalVars` - Shared variable storage

### Minecraft Interaction
- `Player` - Player state and actions
- `World` - World and environment data
- `Client` - Client-level functionality
- `Chat` - Chat and messaging

### UI/Rendering
- `Hud` - Custom screens and rendering
- `KeyBind` - Key binding and input

### Utilities
- `FS` - File system operations
- `Request` - HTTP and WebSocket
- `Time` - Time and sleep functions
- `Utils` - Miscellaneous utilities
- `JavaUtils` - Java object creation
- `PositionCommon` - Position/vector helpers

### Advanced
- `Reflection` - Java reflection utilities

## Style Guidelines

### Tone
- Technical but approachable
- Use present tense: "Returns the...", "Creates a..."
- Use active voice when possible
- Be concise but complete

### Terminology
- "Function" or "method" (prefer "method" for consistency)
- "Field" or "property" (use "field")
- "Parameter" or "argument" (use "parameter" in docs)
- "Returns" not "outputs" or "produces"
- "Library" for the overall API object

### Code Style in Examples
- Use `const` for variables that don't change
- Use descriptive variable names
- Include error checking when appropriate
- Show realistic use cases
- Use template literals for string formatting: `` `Value: ${x}` ``

### Comment Style in Examples
- Use `//` for inline comments
- Keep comments brief and helpful
- Explain "why" not "what" when obvious
- Add value (don't comment `// Create variable` for `const x = 5;`)

## Validation Checklist

For any API documentation file, verify:
- [ ] Title matches global variable name
- [ ] Description mentions how to access (via global variable)
- [ ] Fields section present if library has public fields
- [ ] Methods section lists all available methods
- [ ] Each method has at least one code example
- [ ] Parameters documented with types and descriptions
- [ ] Return types specified for all methods
- [ ] Optional parameters marked with `?`
- [ ] Complex methods have notes/warnings
- [ ] Overloads documented when applicable
- [ ] Threading warnings for blocking methods
- [ ] Internal fields marked "Do not modify"
- [ ] Advanced APIs have warning in description
- [ ] Anchor links use kebab-case
- [ ] Code examples use proper indentation
- [ ] All inline code properly wrapped in backticks
- [ ] File name matches library name in kebab-case
