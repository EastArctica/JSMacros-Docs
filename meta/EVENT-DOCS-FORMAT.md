# Event Documentation Format Specification

This document describes the standardized formats used for event documentation files in the JsMacros-Docs project.

## Overview

Event documentation files can follow one of two primary formats:
1. **Modern Format** - Uses tables and structured sections
2. **Legacy Format** - Uses Fields/Methods sections with detailed subsections

## Format 1: Modern Format (Preferred)

### Required Sections

#### 1. Title (H1)
- Format: `# [EventName] Event`
- Example: `# Damage Event`, `# ChunkLoad Event`
- Alternative: Some older events use just the event class name (e.g., `# EventAirChange`)

#### 2. Description
- A brief sentence describing when the event fires
- Format: `This event is fired when [trigger condition]. Backed by class [ClassName].`
- Example: `This event is fired when the player takes damage from any source. Backed by class EventDamage.`

#### 3. Signature
- Shows the proper event registration syntax
- Always uses `JavaWrapper.methodToJavaAsync`
```js
## Signature
\`\`\`js
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
\`\`\`
```

#### 4. Event Payload
- Markdown table listing all fields/properties available on the event object
- Format:
```markdown
## Event payload

| Field    | Type          | Description                               |
| -------- | ------------- | ----------------------------------------- |
| fieldName | FieldType    | Description of the field                  |
```

**Field Types Include:**
- Primitive types: `int`, `float`, `double`, `boolean`, `string`
- Helper objects: `EntityHelper`, `BlockDataHelper`, `ItemStackHelper`, `PlayerListEntryHelper`
- Special types: `IScreen`, `Packet`, `BossBarHelper`
- Can be annotated as nullable: `BossBarHelper` (can be null)

#### 5. Behavior
- Unordered list describing event characteristics
- Must include:
  - When the event fires (trigger conditions)
  - Important notes about fields (deprecation, nullability, server behavior)
  - Whether the event is cancellable
  - Performance considerations (if applicable)
- Uses bullet points with `-` or `*`
- Example:
```markdown
## Behavior

* Fires when the player takes damage from any source
* The `attacker` field is deprecated and may be null on servers
* The `source` field is deprecated and may not be reliable on servers
* The `change` field is negative for damage events
* Not cancellable
```

#### 6. Examples
Two types of examples should be provided:

**Minimal Example:**
```markdown
## Minimal example

\`\`\`js
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((e) => {
  // Simple one-line demonstration
  Chat.log(`Message: ${e.field}`);
});
\`\`\`
```

**Async Example (Optional):**
```markdown
## Async example

\`\`\`js
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((e) => {
  // More complex example with multiple operations
  const field = e.field;
  // ... more code
});
\`\`\`
```

### Special Cases

#### Events with No Fields
For events with no payload fields (e.g., Tick event):
```markdown
## Behavior

* Fires 20 times per second (once per Minecraft tick)
- No specific fields or data
- Very high frequency event
- Not cancellable
```

#### Events with Special Data Methods
Some events (like Custom) have getter/setter methods instead of direct fields:
- Document the base fields in Event Payload table
- Add a separate section explaining the data access methods
- Include examples of both storing and retrieving custom data

## Format 2: Legacy Format

### Required Sections

#### 1. Title (H1)
- Format: `# Event[EventName]`
- Example: `# EventAirChange`, `# EventArmorChange`

#### 2. Description
- A brief paragraph describing when the event fires
- No specific format, just descriptive text

#### 3. Example
- Complete working example with comments
- Shows proper event registration
- Includes `JsMacros.assertEvent(event, 'EventName')` call
- Example:
```javascript
## Example
\`\`\`javascript
// Listen for changes in the player's air level
const listener = JsMacros.on('AirChange', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'AirChange');
    
    const maxAir = 300; // Maximum air ticks
    const airPercentage = (event.air / maxAir) * 100;
    
    Chat.actionbar(`Air: ${airPercentage.toFixed(0)}%`);
}));
\`\`\`
```

#### 4. Fields
- List of all event fields as links
- Format: `- [event.fieldName](#eventfieldname)`
- Example:
```markdown
## Fields
- [event.air](#eventair)
- [event.slot](#eventslot)
```

#### 5. Methods
- List of all event methods as links
- Format: `- [event.methodName()](#eventmethodname)`
- Almost always includes: `- [event.toString()](#eventtostring)`

#### 6. Field Details
Each field gets its own H3 section:
```markdown
### event.fieldName
Description of what the field represents.

**Type:** `FieldType`

**Notes** (optional)
Additional information about the field, such as:
- Value ranges or meanings
- Special cases or conditions
- Related constants or enums
```

#### 7. Method Details
Each method gets its own H3 section:
```markdown
### event.methodName()
Description of what the method does.

**Params**
* `(none)` or list of parameters

**Returns**
* `returnType`
```

## Common Patterns

### Event Names
- Event listener names use PascalCase without "Event" prefix: `"Damage"`, `"ChunkLoad"`, `"AirChange"`
- Class names use "Event" prefix: `EventDamage`, `EventChunkLoad`, `EventAirChange`

### Cancellable Events
If an event can be cancelled:
- Modern format: Include `* This event is cancellable - preventing [action]` in Behavior section
- Examples should demonstrate when/how to use `e.cancel()`

### Deprecation
Mark deprecated fields in the Behavior or Notes sections:
- `* The [fieldName] field is deprecated and may be [issue]`

### Nullable Fields
Fields that can be null should be noted:
- In table description: `The [object] helper object (can be null)`
- In Behavior section: `* The [fieldName] field will be null for [condition]`

### Frequency Warnings
For high-frequency events (Tick, SendPacket, RecvPacket):
- Add performance notes in Behavior section
- Show throttling/filtering in examples
- Warn about spam potential

## File Naming Convention

- Filename: Kebab-case matching the event name
- Format: `event-name.md`
- Examples:
  - `air-change.md` → EventAirChange
  - `chunk-load.md` → EventChunkLoad
  - `recv-message.md` → EventRecvMessage
  - `attack-block.md` → EventAttackBlock

## Code Formatting

### Event Handler Syntax
Always use this exact pattern:
```js
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((event) => {
    // Code here
}));
```

Or in legacy format:
```javascript
const listener = JsMacros.on('EventName', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'EventName');
    // Code here
}));
```

### Variable Naming
- Event parameter: `event`, `e` (shortened in examples)
- Use `const` for variable declarations
- Use descriptive names that match field names

### Code Comments
- Use `//` for inline comments
- Explain non-obvious logic
- Annotate value meanings (e.g., `// Maximum air ticks`)

## Markdown Formatting

### Code Blocks
- JavaScript/JS code: Use `\`\`\`js` or `\`\`\`javascript`
- Inline code: Use backticks for field names, method names, values
  - Example: `` The `air` field is measured in ticks. ``

### Lists
- Use `-` or `*` consistently within a section
- Nested lists should be indented with 2 or 4 spaces

### Tables
- Align columns with pipes `|`
- Include header separator row with dashes
- Left-align text columns, can center headers

### Links
- Internal section links use lowercase with hyphens
- Remove special characters and parentheses from anchors
- Example: `[event.toString()](#eventtostring)`

## Style Guidelines

### Tone
- Technical but accessible
- Use present tense for event firing: "Fires when...", "Occurs when..."
- Use passive voice for fields: "The entity that was interacted with"

### Terminology
- "Fires" or "Triggered" for events
- "Helper object" for wrapper classes
- "Field" for properties (modern), "Fields" section (legacy)
- "Not cancellable" vs "This event is cancellable"

### Formatting Codes
When showing Minecraft color codes in examples:
- Use `&` prefix: `&a` (green), `&c` (red), `&7` (gray)
- Examples: `&6Player joined`, `&cWarning!`

## Migration Notes

When updating from legacy to modern format:
1. Convert title to include "Event" word
2. Add "Backed by class X" to description
3. Create Signature section
4. Convert Fields/Methods sections to Event Payload table
5. Create Behavior section from Notes and description
6. Separate examples into Minimal and Async
7. Remove redundant method documentation (keep only special methods)

## Validation Checklist

For any event document, verify:
- [ ] Title follows naming convention
- [ ] Description mentions when event fires and backing class
- [ ] Signature section present (modern) or Example section (legacy)
- [ ] All fields documented with correct types
- [ ] Behavior section lists cancelability
- [ ] At least one complete example provided
- [ ] Code examples use proper JavaWrapper syntax
- [ ] High-frequency events have performance notes
- [ ] Nullable fields are marked
- [ ] Deprecated fields are noted
