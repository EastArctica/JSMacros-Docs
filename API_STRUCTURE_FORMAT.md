# JSMacros API Documentation Format Guidelines

## Structure for API Documentation Files

Based on comprehensive analysis of all API files in the `apis/` directory, the following structure is required for all API documentation files:

### 1. File Header
- **Level 1 Heading**: The API name (e.g., `# Chat`)
- **Description**: Brief description of what the API does and how it's accessed
  - Should mention the global variable used to access it
  - Should be concise and informative
- **Additional Context** (Optional): Background information, warnings, or usage notes

### 2. Fields Index Section (Optional)
- **Level 2 Heading**: `## Fields` (only if API has fields)
- **Bulleted List**: All fields with anchor links
  - Format: `- [APIName.fieldName](#anchor-link)`
  - Include only for APIs that have accessible fields

### 3. Methods Index Section
- **Level 2 Heading**: `## Methods`
- **Bulleted List**: All methods with anchor links to their detailed sections
  - Format: `- [APIName.methodName](#anchor-link)`
  - Anchor links use lowercase with no special characters
  - Methods should be listed alphabetically for consistency
  - Include alternate method names where applicable

### 4. Fields Documentation Sections (Optional)
If the API has fields, each field should be documented with:

#### a. Field Heading
- **Level 3 Heading**: `### APIName.fieldName`
- **Anchor Link**: Matches the link in the Fields index

#### b. Description
- Brief description of what the field represents
- Include usage warnings if applicable

#### c. Type Section
- **Level 4 Heading**: `**Type**`
- **Bullet List**: Field type information
- Format: `* `type`: Description`

### 5. Method Documentation Sections
Each method should have the following structure:

#### a. Method Heading
- **Level 3 Heading**: `### APIName.methodName`
- **Anchor Link**: Matches the link in the Methods index

#### b. Code Example
- **Fenced Code Block**: ` ```js `
- **Realistic Usage**: Show practical examples of how to use the method
- **Multiple Examples**: Include variations if applicable (overloads, different use cases)
- **Complex Examples**: Show realistic usage patterns with multiple steps when helpful

#### c. Parameters Section
- **Level 4 Heading**: `**Params**`
- **Numbered List**: Each parameter with:
  1. `name: type`: Parameter description
  - Use `?` for optional parameters
  - Use `= defaultValue` for parameters with defaults
  - Use `|` for union types (e.g., `string | TextHelper`)
  - Use `[]` for arrays (e.g., `any[]`)
  - Include specific parameter constraints when applicable

#### d. Returns Section
- **Level 4 Heading**: `**Returns**`
- **Bullet List**: Return type and brief description
- Format: `* `type`: Description`
- Include `null` possibilities when applicable

#### e. Notes Section (Optional)
- **Level 4 Heading**: `**Notes**`
- Additional context or important information
- Include when there are special considerations, threading safety, or usage warnings

#### f. Overloads Section (Optional)
- **Level 4 Heading**: `#### Overloads`
- **Bullet List**: Different method signatures
- Used when a method has multiple parameter combinations

#### g. Deprecated Notice (Optional)
- **Level 4 Heading**: `**Notes**` (or separate section)
- Clearly mark deprecated methods
- Suggest modern alternatives when available
- Include deprecation reasoning

## Additional Guidelines

### Type Annotations
- Use TypeScript-style type notation
- Common types: `string`, `number`, `boolean`, `int`, `void`, `any[]`
- Custom types: `TextHelper`, `CommandBuilder`, `SLF4J.Logger`, etc.
- Java types: Use `java.util.List<Type>`, `java.io.File`, etc. when appropriate
- Use `| null` for nullable return types
- Use `long` for large integer values

### Code Examples
- Use realistic, practical examples that show real-world usage
- Show multiple lines when helpful for context
- Include variable declarations where appropriate
- Use comments in examples when necessary
- Show common usage patterns and best practices
- Include complex examples when methods work together (e.g., packet creation and sending)

### Parameter Naming
- Be descriptive but concise
- Use camelCase
- Include units when relevant (e.g., `timeInSeconds`, `maxDepth`)
- Use descriptive names that clarify purpose (e.g., `followLinks`, `createDirs`)

### Documentation Standards
- **No "none" Parameters**: Use `* (none)` for Params sections with no parameters
- **Consistent Formatting**: Use `* `type`: Description` for Returns and Type sections
- **Complete Coverage**: Every public method and field must be documented
- **Practical Context**: Include usage scenarios and common patterns

### Special Sections
- **Warnings**: Use for potentially dangerous operations (e.g., `reflection.md`)
- **Background Information**: Provide context for complex APIs (e.g., threading in `java-wrapper.md`)
- **Best Practices**: Include recommendations for proper usage
- **Threading Safety**: Note when methods must be called from specific threads

### Cross-References
- Reference other APIs or methods when relevant
- Use markdown links for cross-references
- Include related method suggestions where helpful

### Deprecation and Version Compatibility
- Clearly mark deprecated methods with alternatives
- Include version-specific information when relevant
- Note platform differences (e.g., Fabric vs Forge naming)
