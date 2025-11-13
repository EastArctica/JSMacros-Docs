# JSMacros Event Documentation Format Guidelines

## Structure for Event Documentation Files

Based on comprehensive analysis of all event files in the `events/` directory, the following structure is required for all event documentation files:

### 1. File Header
- **Level 1 Heading**: The event name (e.g., `# EventAirChange`)
- **Description**: Brief description of what triggers the event
  - Should clearly state when the event fires
  - Should be concise and informative
  - Should describe the player action or game state change that causes the event

### 2. Example Section
- **Level 2 Heading**: `## Example`
- **Fenced Code Block**: ` ```js `
- **Complete Event Listener**: Must show full event registration and handling pattern
  - **Registration**: `JsMacros.on('EventName', JavaWrapper.methodToJavaAsync(event => { ... }))`
  - **Event Assertion**: `JsMacros.assertEvent(event, 'EventName')`
  - **Practical Usage**: Realistic examples of handling the event
  - **Context**: Include meaningful logic that demonstrates why someone would use this event
  - **Multiple Lines**: Show complex handling when appropriate

### 3. Fields Index Section (Optional)
- **Level 2 Heading**: `## Fields` (only if event has fields)
- **Bulleted List**: All event fields with anchor links
  - Format: `- [event.fieldName](#event-fieldname)`
  - Include only for events that have accessible fields
  - All event properties should be prefixed with `event.`

### 4. Methods Index Section
- **Level 2 Heading**: `## Methods`
- **Bulleted List**: All methods with anchor links to their detailed sections
  - Format: `- [event.methodName()](#event-methodname)`
  - Anchor links use lowercase with hyphens for spaces
  - At minimum should include `event.toString()`
  - Methods should be listed in logical order (toString first, then other methods)

### 5. Field Documentation Sections (Optional)
If the event has fields, each field should be documented with:

#### a. Field Heading
- **Level 3 Heading**: `### event.fieldName`
- **Anchor Link**: Matches the link in the Fields index
- **Consistent Naming**: Use `event.` prefix for all field references

#### b. Description
- Brief description of what the field represents
- Include context about when the field is populated
- Include usage warnings or special considerations when applicable

#### c. Type Section
- **Level 4 Heading**: `**Type**`
- **Type Information**: Direct type specification (no bullet list)
- Format: `**Type:** `type``
- Use precise type names: `int`, `string`, `ItemStackHelper`, `BlockDataHelper`, etc.

#### d. Notes Section (Optional)
- **Level 4 Heading**: `**Notes**`
- Additional context, constraints, or important information
- Include when there are specific value ranges, possible values, or special considerations
- For numeric fields, include unit information and typical ranges
- For enum-like fields, list all possible values

### 6. Method Documentation Sections
Each method should have the following structure:

#### a. Method Heading
- **Level 3 Heading**: `### event.methodName()`
- **Anchor Link**: Matches the link in the Methods index
- **Parentheses**: Include `()` in method names to clearly indicate methods

#### b. Description
- Brief description of what the method does
- For `toString()`, use consistent wording: "Returns a string representation of the event object."

#### c. Parameters Section
- **Level 4 Heading**: `**Params**`
- **Standard Format**: `* `(none)`` for methods with no parameters
- **Numbered List**: Only used when method has parameters (rare for events)

#### d. Returns Section
- **Level 4 Heading**: `**Returns**`
- **Type Information**: Direct type specification (no bullet list)
- Format: `* `type``

## Event-Specific Guidelines

### Event Names and Classes
- Use the full event class name in the heading (e.g., `EventAirChange`, `EventArmorChange`)
- The event name used in `JsMacros.on()` is typically the class name without the "Event" prefix
- Always include the event assertion: `JsMacros.assertEvent(event, 'EventName')`

### Field Naming and Types
- All fields are accessed via `event.fieldName` pattern
- Common field types include:
  - `int`: For numeric values (air levels, side integers, etc.)
  - `string`: For text values (slot names, etc.)
  - `ItemStackHelper`: For item-related data
  - `BlockDataHelper`: For block-related data
- Provide context for numeric fields (units, ranges, meanings)

### Example Content Standards
- **Complete Registration**: Always show the full event listener setup
- **Real-world Scenarios**: Examples should solve actual problems players might encounter
- **Event Validation**: Include `JsMacros.assertEvent()` for type safety
- **Error Handling**: Show how to handle edge cases when relevant
- **Complex Logic**: Include meaningful conditional logic and processing

### Special Event Considerations
- **Empty States**: Note when fields might be empty (e.g., unequipped armor slots)
- **Timing**: Specify when the event fires in the game loop
- **Cancellation**: Note if the event can be cancelled (not applicable to current events but important for future events)
- **Threading**: Note any thread safety considerations

## Type Annotations

### Standard Types
- Use precise type names without markdown formatting in Type sections
- Common types: `string`, `int`, `boolean`, `void`
- Helper types: `ItemStackHelper`, `BlockDataHelper`, `TextHelper`
- Java types: Use Java class names when appropriate

### Consistency
- Use `int` rather than `number` for integer fields
- Use `string` for text fields
- Use helper type names consistently (e.g., always `ItemStackHelper`, not variations)

## Additional Guidelines

### Documentation Standards
- **No "none" Methods**: Use `* `(none)`` for Params sections with no parameters
- **Consistent Formatting**: Use `**Type:** `type`` for Type sections
- **Complete Coverage**: Every public method and field must be documented
- **Event Pattern**: Always show the complete event listener pattern in examples

### Cross-References
- Reference other events when they provide similar functionality
- Use markdown links for cross-references
- Include related event suggestions where helpful

### File Organization
- Files should be named with kebab-case matching the event name
- Empty files should be filled with the standard format before being considered complete
- All files should follow the same section order

## Format Compliance Summary

**Current Status**: GOOD - 3 of 5 event files in the `events/` directory follow this format structure with high-quality documentation.

**Files Analyzed**:
- ✅ `air-change.md` - Complete and follows format
- ✅ `armor-change.md` - Complete and follows format
- ✅ `attack-block.md` - Complete and follows format
- ❌ `attack-entity.md` - Empty file, needs completion
- ❌ `index.md` - Empty file, needs completion

**Key Strengths**:
- Consistent structure across completed files
- High-quality, practical examples with complete event listener patterns
- Complete field documentation with proper type information
- Helpful Notes sections with context and constraints
- Standardized method documentation

**Areas for Improvement**:
- Complete the empty files (`attack-entity.md`, `index.md`)
- Ensure all new events follow this established pattern
- Maintain consistency in example quality and complexity

## Template for New Event Files

```markdown
# EventName

Brief description of what triggers this event.

## Example
```javascript
// Complete event listener example
const listener = JsMacros.on('EventName', JavaWrapper.methodToJavaAsync(event => {
    JsMacros.assertEvent(event, 'EventName');

    // Event handling logic here
    Chat.log("Event occurred with data: " + event.fieldName);
}));
```

## Fields (if applicable)
- [event.field1](#event-field1)
- [event.field2](#event-field2)

## Methods
- [event.toString()](#eventtostring)
- [event.otherMethod()](#eventothermethod)

### event.field1
Description of the field.

**Type:** `FieldType`

**Notes**
Additional context or constraints.

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`
```