# Class Documentation Format Specification

This document describes the standardized format used for class/helper object documentation files in the JsMacros-Docs project.

## Overview

Class documentation files describe Java/JavaScript classes and helper objects that are used in JsMacros scripts. These classes are typically instantiated through API methods or received as parameters in event callbacks. Unlike APIs (which are global objects), classes represent individual objects with their own state and methods.

## Standard Format

All class documentation files follow a consistent structure:

### 1. Title (H1)
- Format: `# ClassName`
- Include the simple class name without package path
- Examples: `# Box`, `# EntityHelper`, `# ItemStackHelper`, `# Draw3D`

### 2. Class Declaration (Optional)
Show the full qualified class name and any interfaces/inheritance:

**Format:**
```markdown
**Full Class Name:** `package.name.ClassName`

**Implements:** `InterfaceName<T>`

**Extends:** `ParentClassName`
```

**Example:**
```markdown
**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.classes.render.components3d.Box`

**Implements:** `RenderElement3D<Box>`
```

### 3. Description
A brief paragraph describing:
- The purpose of the class
- What it represents or does
- How instances are typically created or obtained
- Key use cases

**Example:**
```markdown
Represents a 3D box/cuboid that can be rendered in the world. Box objects are used for rendering rectangular regions in 3D space, with customizable outline and fill colors. Instances are typically created through `Draw3D` methods or by using the constructor directly.
```

### 4. Table of Contents
Provide a structured overview of constructors, fields, and methods:

**Format:**
```markdown
## Constructors
- [new ClassName(...)](#constructors)

## Fields
- [instance.fieldName](#instancefieldname)
- [instance.anotherField](#instanceanotherfield)

## Methods
- [instance.methodName()](#instancemethodname)
- [instance.anotherMethod()](#instanceanothermethod)
```

**Notes:**
- Use `new ClassName(...)` for constructor links
- Use `instance.` prefix for fields and methods (or use actual class name in lowercase)
- Group related methods together when listing
- Use anchor links in kebab-case

### 5. Constructors Section
Document all available constructors with their parameters.

**Format:**
```markdown
## Constructors

### new ClassName(param1, param2, ...)
\`\`\`js
const instance = new ClassName(arg1, arg2, arg3);
\`\`\`

Creates a new instance of ClassName [with description of what the constructor does].

**Parameters:**

| Parameter | Type    | Description                          |
| --------- | ------- | ------------------------------------ |
| param1    | type1   | Description of first parameter       |
| param2    | type2   | Description of second parameter      |
| param3    | type3   | Description of third parameter       |

**Since:** `version` (optional)

**Example:**
\`\`\`js
// Example usage
const obj = new ClassName(value1, value2, value3);
\`\`\`
```

**Multiple Constructors:**
If a class has multiple constructor overloads, document each separately with clear differentiation:

```markdown
### new ClassName(x, y, color)
[First constructor description]

**Parameters:**
| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| x         | double  | X position  |
| y         | double  | Y position  |
| color     | int     | Color value |

### new ClassName(x, y, color, alpha)
[Second constructor description with additional parameters]

**Parameters:**
| Parameter | Type    | Description    |
| --------- | ------- | -------------- |
| x         | double  | X position     |
| y         | double  | Y position     |
| color     | int     | Color value    |
| alpha     | int     | Alpha/opacity  |
```

### 6. Fields Section
Document all public fields accessible on instances.

**Format:**
```markdown
## Fields

### instance.fieldName
[Description of what the field represents and its purpose]

**Type:** `FieldType`

**Notes:** (optional)
- Any important information about the field
- Whether it should be modified directly
- Valid value ranges or constraints

**Since:** `version` (optional)

**Example:**
\`\`\`js
const value = instance.fieldName;
instance.fieldName = newValue;
\`\`\`
```

**Example:**
```markdown
## Fields

### box.pos
The position of the box as a 3D vector containing the two corner coordinates.

**Type:** `Vec3D`

**Example:**
\`\`\`js
const boxPos = box.pos;
Chat.log(`Box at: ${boxPos}`);
\`\`\`

### box.color
The outline color of the box as an ARGB integer.

**Type:** `int`

**Example:**
\`\`\`js
box.color = 0xFF0000; // Red outline
\`\`\`

### box.fill
Whether the box should be filled or just outlined.

**Type:** `boolean`

**Example:**
\`\`\`js
box.fill = true; // Draw filled box
\`\`\`
```

### 7. Methods Section
Document all public methods available on instances.

**Format:**
```markdown
## Methods

### instance.methodName(param1, param2)
\`\`\`js
instance.methodName(arg1, arg2);
\`\`\`

[Description of what the method does]

**Parameters:**

| Parameter | Type    | Description                          |
| --------- | ------- | ------------------------------------ |
| param1    | type1   | Description of first parameter       |
| param2    | type2   | Description of second parameter      |

**Returns:** `ReturnType` - Description of return value

**Since:** `version` (optional)

**Notes:** (optional)
- Important information about behavior
- Side effects
- Related methods

**Example:**
\`\`\`js
// Detailed example of method usage
const result = instance.methodName(value1, value2);
\`\`\`
```

## Detailed Component Specifications

### Constructor Documentation

**Guidelines:**
- Show constructor syntax with `new` keyword
- List all parameters in a table format
- Include type information for each parameter
- Provide working example code
- If parameters have default values or are optional, note this
- For complex constructors, explain what each parameter controls

**Parameter Table Format:**
```markdown
**Parameters:**

| Parameter | Type    | Description                          |
| --------- | ------- | ------------------------------------ |
| x1        | double  | X coordinate of first corner         |
| y1        | double  | Y coordinate of first corner         |
| z1        | double  | Z coordinate of first corner         |
| color     | int     | ARGB color value for the outline     |
| alpha     | int     | Alpha value (0-255, 0=transparent)   |
| fill      | boolean | Whether to fill the box              |
```

### Field Documentation

**Guidelines:**
- Always specify the type
- Explain what the field represents
- Show example of reading and writing (if applicable)
- Note if field is read-only or should not be modified
- Include valid value ranges when applicable
- For color fields, note the format (RGB, ARGB, etc.)

**Read-Only Fields:**
```markdown
### instance.readOnlyField
This field provides [description]. It is automatically calculated and should not be modified directly.

**Type:** `CalculatedType`

**Notes:** Read-only. Use `setMethod()` to change this value.
```

### Method Documentation

**Guidelines:**
- Include method signature in heading
- Provide code example showing typical usage
- Use parameter table format for clarity
- Always specify return type (use `void` if none)
- Group overloaded methods together
- Note which version the method was added (Since)
- Include practical examples demonstrating real use cases

**Method Overloads:**

When documenting overloaded methods, list them sequentially:

```markdown
### instance.setPosition(x, y)
Sets the 2D position of the object.

**Parameters:**
| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| x         | double | X position  |
| y         | double | Y position  |

**Returns:** `void`

### instance.setPosition(x, y, z)
Sets the 3D position of the object.

**Parameters:**
| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| x         | double | X position  |
| y         | double | Y position  |
| z         | double | Z position  |

**Returns:** `void`
```

**Or use a combined format:**

```markdown
### instance.setPosition(...)
Sets the position of the object in 2D or 3D space.

**Overloads:**
- `setPosition(x: double, y: double): void`
- `setPosition(x: y: double, z: double): void`

**Parameters:**
| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| x         | double | X position       |
| y         | double | Y position       |
| z         | double | Z position (3D)  |

**Returns:** `void`

**Example:**
\`\`\`js
obj.setPosition(10, 20);        // 2D
obj.setPosition(10, 20, 30);    // 3D
\`\`\`
```

### Version Documentation

Use **Since:** to indicate when features were added:

```markdown
**Since:** `1.0.6`
**Since:** `1.9.0`
**Since:** `1.1.8`
```

This helps users know version compatibility.

### Internal/Advanced Methods

For low-level or internal methods (like `equals`, `hashCode`, `render`):

```markdown
### instance.equals(other)
Compares this object with another for equality.

**Parameters:**
| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| other     | Object | The object to compare  |

**Returns:** `boolean` - `true` if objects are equal

**Notes:** This is a standard Java method. Typically not needed in scripts.

### instance.render(drawContext, builder, tickDelta)
Internal rendering method called by the rendering system.

**Parameters:**
| Parameter   | Type          | Description                    |
| ----------- | ------------- | ------------------------------ |
| drawContext | DrawContext   | The current draw context       |
| builder     | BufferBuilder | The buffer builder for drawing |
| tickDelta   | float         | Time since last tick           |

**Returns:** `void`

**Notes:** This is an internal method. Do not call directly. Used by the rendering engine.
```

## Common Class Categories

### Render Classes
Classes for 2D/3D rendering:
- `Box`, `Line`, `Text3D`, `Item3D`
- `Draw2D`, `Draw3D`
- Usually created through `Hud.createDraw2D()` or `Hud.createDraw3D()`

### Helper Classes
Wrapper classes for Minecraft objects:
- `EntityHelper`, `ClientPlayerEntityHelper`
- `BlockDataHelper`, `BlockPosHelper`
- `ItemStackHelper`
- `TextHelper`
- Usually received from events or API methods

### Position/Vector Classes
Mathematical objects:
- `Pos2D`, `Pos3D`
- `Vec2D`, `Vec3D`
- `BlockPosHelper`
- Created through `PositionCommon` methods

### Builder Classes
Objects that build other objects:
- `CommandBuilder`, `TextBuilder`
- `HTTPRequest`
- Created through factory methods

### Data Classes
Objects that hold structured data:
- `ScriptScreen`
- `BossBarHelper`
- Created by API methods or constructors

## Code Examples Standards

### Constructor Examples
```js
// Show typical instantiation
const box = new Box(0, 0, 0, 10, 10, 10, 0xFF0000, 0x00FF00, true, false);

// Or with named values for clarity
const x1 = 0, y1 = 0, z1 = 0;
const x2 = 10, y2 = 10, z2 = 10;
const outlineColor = 0xFF0000; // Red
const fillColor = 0x00FF00;    // Green
const box = new Box(x1, y1, z1, x2, y2, z2, outlineColor, fillColor, true, false);
```

### Method Examples
```js
// Show common usage
box.setPos(5, 64, 5, 15, 74, 15);
box.setColor(0xFF0000); // Red
box.setFill(true);

// Show chaining if supported
box.setPos(0, 0, 0, 10, 10, 10)
   .setColor(0xFF0000)
   .setFill(true);
```

### Field Examples
```js
// Reading fields
const currentColor = box.color;
Chat.log(`Box color: ${currentColor}`);

// Writing fields
box.color = 0x00FF00;
box.fill = true;
```

## Parameter Description Standards

### Position Parameters
```markdown
| x         | double  | X coordinate in world space        |
| y         | double  | Y coordinate (vertical) in world   |
| z         | double  | Z coordinate in world space        |
```

### Color Parameters
```markdown
| color     | int     | ARGB color value (0xAARRGGBB)      |
| alpha     | int     | Alpha value (0-255, 0=transparent) |
| fillColor | int     | RGB color value for fill           |
```

### Boolean Parameters
```markdown
| fill      | boolean | Whether to fill the shape          |
| cull      | boolean | Whether to cull back faces         |
| visible   | boolean | Whether the object is visible      |
```

### Helper Object Parameters
```markdown
| entity    | EntityHelper    | The entity object               |
| pos       | BlockPosHelper  | The block position              |
| item      | ItemStackHelper | The item stack                  |
```

## Markdown Formatting Standards

### Tables
Use consistent table formatting for parameters:
```markdown
| Parameter | Type    | Description                          |
| --------- | ------- | ------------------------------------ |
| name      | type    | Description text                     |
```

- Left-align all columns
- Use consistent spacing with dashes
- Keep descriptions concise

### Code Blocks
```js
// Use js language identifier
const example = new ClassName();
example.method();
```

### Inline Code
- Class names: `` The `Box` class ``
- Method calls: `` Use `setPos()` to update ``
- Field access: `` The `color` field contains ``
- Types: `` Returns a `Vec3D` object ``
- Values: `` Set to `true` or `false` ``

### Section Headers
```markdown
# ClassName                          (H1 - Title)
## Constructors                      (H2 - Major sections)
### new ClassName(...)               (H3 - Individual items)
#### Overloads                       (H4 - Subsections)
```

## File Naming Convention

- Filename: Match the class name exactly (case-sensitive when possible)
- Format: `ClassName.md` or `class-name.md` (prefer exact match)
- Examples:
  - `Box.md` → Box class
  - `EntityHelper.md` → EntityHelper class
  - `Draw3D.md` → Draw3D class
  - `ItemStackHelper.md` → ItemStackHelper class

For helper classes, maintain the "Helper" suffix in the filename.

## Style Guidelines

### Tone
- Technical and precise
- Use present tense for descriptions
- Be explicit about object state and behavior

### Terminology
- "Instance" for created objects
- "Method" not "function" 
- "Field" not "property" or "attribute"
- "Constructor" not "initializer"
- "Parameter" in documentation
- "Argument" in examples

### Method Descriptions
Start with active verbs:
- "Sets the position..."
- "Returns the current..."
- "Calculates the distance..."
- "Creates a new..."
- "Checks whether..."

### Parameter Descriptions
Be specific about:
- Coordinate systems (world space, screen space)
- Value ranges (0-255, 0.0-1.0)
- Units (pixels, blocks, meters)
- Format (ARGB, RGB, hex)

## Special Patterns

### Color Fields/Methods
```markdown
### instance.setColor(color, alpha)
Sets the color with separate alpha channel.

**Parameters:**
| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| color     | int  | RGB color value (0xRRGGBB)                     |
| alpha     | int  | Alpha value (0-255, 0=transparent, 255=opaque) |

**Returns:** `void`

**Example:**
\`\`\`js
box.setColor(0xFF0000, 128); // Semi-transparent red
\`\`\`
```

### Position Methods
```markdown
### instance.setPosToBlock(x, y, z)
Sets this component's position to match a block's bounds.

**Parameters:**
| Parameter | Type | Description              |
| --------- | ---- | ------------------------ |
| x         | int  | Block X coordinate       |
| y         | int  | Block Y coordinate       |
| z         | int  | Block Z coordinate       |

**Returns:** `void`

**Since:** `1.9.0`

**Example:**
\`\`\`js
// Highlight the block at coordinates
box.setPosToBlock(10, 64, -5);
\`\`\`
```

### Comparison Methods
```markdown
### instance.compareTo(other)
Compares this object to another for ordering.

**Parameters:**
| Parameter | Type      | Description           |
| --------- | --------- | --------------------- |
| other     | ClassName | The object to compare |

**Returns:** `int` - Negative if less than, 0 if equal, positive if greater than

**Notes:** This is a standard Java comparison method used for sorting.
```

## Validation Checklist

For any class documentation file, verify:
- [ ] Title matches class name
- [ ] Full class name provided (with package)
- [ ] Interfaces/inheritance documented (if applicable)
- [ ] Description explains purpose and usage
- [ ] All constructors documented with parameter tables
- [ ] All public fields documented with types
- [ ] All public methods documented with parameter tables
- [ ] Return types specified for all methods
- [ ] Version information included (Since tags)
- [ ] Code examples provided for constructors
- [ ] Code examples provided for key methods
- [ ] Parameter descriptions are clear and specific
- [ ] Internal methods marked as such
- [ ] Color parameters explain format (RGB/ARGB)
- [ ] Position parameters explain coordinate system
- [ ] Tables formatted consistently
- [ ] Anchor links use kebab-case
- [ ] File name matches class name

## Example Template

```markdown
# ClassName

**Full Class Name:** `package.name.ClassName`

**Implements:** `InterfaceName<T>`

[Brief description of what this class represents and its purpose]

## Constructors
- [new ClassName(...)](#new-classname)

## Fields
- [instance.field1](#instancefield1)
- [instance.field2](#instancefield2)

## Methods
- [instance.method1()](#instancemethod1)
- [instance.method2()](#instancemethod2)

---

## Constructors

### new ClassName(param1, param2)
\`\`\`js
const obj = new ClassName(value1, value2);
\`\`\`

Creates a new instance of ClassName.

**Parameters:**

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| param1    | type1  | Description of param1    |
| param2    | type2  | Description of param2    |

**Example:**
\`\`\`js
const obj = new ClassName(10, "test");
\`\`\`

---

## Fields

### instance.field1
Description of field1.

**Type:** `FieldType`

**Example:**
\`\`\`js
const value = instance.field1;
\`\`\`

---

## Methods

### instance.method1(param)
\`\`\`js
instance.method1(value);
\`\`\`

Description of what method1 does.

**Parameters:**

| Parameter | Type      | Description           |
| --------- | --------- | --------------------- |
| param     | ParamType | Description of param  |

**Returns:** `ReturnType` - Description of return value

**Since:** `1.0.0`

**Example:**
\`\`\`js
instance.method1(42);
\`\`\`
```
