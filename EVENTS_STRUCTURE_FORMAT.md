# JSMacros Event Documentation Format Guidelines

## Structure for Event Documentation Files

All event docs must follow this exact structure and naming so tools and LLMs can reliably index and use them.

### 1) File header

* **Level 1 heading (`#`)**: the **event name as used in `JsMacros.on`**, followed by the word `Event`

  * Example: `# HeldItemChange Event`, `# RecvMessage Event`
  * (Avoid class-first forms like `EventHeldItemChange`.)
* **One-sentence description** of what triggers the event

  * State **when** it fires and **what changed**.

### 2) Signature

* **Level 2 heading (`## Signature`)**
* A fenced `js` code block showing the **canonical listener pattern**:

  ```js
  JsMacros.on("EventName", (event) => {
    // ...
  });
  ```
* If the async wrapper is commonly used, include it as a second snippet **below** the minimal signature:

  ```js
  JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((event) => {
    // ...
  }));
  ```

### 3) Event payload (table)

* **Level 2 heading (`## Event payload`)**

* A single table listing fields with types and a short description:

  | Field       | Type       | Description |
  | ----------- | ---------- | ----------- |
  | `fieldName` | `TypeName` | What it is. |

* Keep names literal (match runtime). Link helper types to their pages.

### 4) Behavior / notes

* **Level 2 heading (`## Behavior`)**
* Bulleted list calling out **trigger conditions, edge cases, empty states, timing,** and **whether the event can be cancelled** (if applicable).
* Examples:

  * “Triggers on swap, consume, drop, hotbar scroll.”
  * “Fields may be empty when …”
  * “Fires on client tick after …”
  * “Not cancellable.”

### 5) Examples

Provide **two** focused examples unless the event is trivial:

* **`## Minimal example`**
  Small, synchronous, copy-paste-ready.
* **`## Async example`** *(if relevant)*
  Shows `JavaWrapper.methodToJavaAsync` usage and any common async patterns.

Each example:

* Shows the full listener registration.
* Contains realistic logic (not just a print).
* Avoids unnecessary helpers unless they’re central to usage.

### 6) Fields index (optional)

* **`## Fields`** — include **only if** the event exposes fields.
* Bulleted links to each field section:

  * `- [event.fieldName](#eventfieldname)`

### 7) Methods index

* **`## Methods`**
* Bulleted links to event methods (if any). Always include `toString()`:

  * `- [event.toString()](#eventtostring)`

### 8) Field documentation sections (per field)

For each field present:

* **`### event.fieldName`**
  One-paragraph description (what it represents, when populated, caveats).
* **Type**: inline, exact type name

  * Format: `**Type:** TypeName`
  * Use precise names: `int`, `string`, `boolean`, `ItemStackHelper`, `BlockDataHelper`, etc.
* **Notes** (optional): short bullets for constraints, ranges, enum values, “may be empty,” units, etc.

### 9) Method documentation sections (per method)

For each event method:

* **`### event.methodName()`**
* One-sentence description.

  * For `toString()`: “Returns a string representation of the event.”
* **Params**:

  * Use `**Params**` then `* \`(none)`` if no parameters,
  * Or a numbered list if parameters exist (rare for events).
* **Returns**:

  * Use `**Returns**` then `* \`TypeName``

### 10) See also

* **`## See also`**
  Cross-link to closely related events/APIs/classes so readers and retrievers can hop:

  * Other events commonly paired with this one
  * APIs used in examples (e.g., `Chat.actionbar`)
  * Helper types referenced in payload (e.g., `ItemStackHelper`)

---

## Event-Specific Guidelines

### Event names vs. classes

* **Heading uses the event name** (the string passed to `JsMacros.on`), plus “Event”.

  * Example: `# HeldItemChange Event`
* If helpful, you may mention the backing class in the first description sentence:

  * “Backed by class `EventHeldItemChange`.”
* In examples, **do not** assert with the class name—use the event name exactly:
  `JsMacros.assertEvent(event, "HeldItemChange")`

### Field naming and types

* Access as `event.fieldName`. Use literal names from the runtime.
* Common types: `int`, `string`, `boolean`, `void`
* Helper types: `ItemStackHelper`, `BlockDataHelper`, `TextHelper`, etc.
* Provide context for numbers (units, ranges).

### Example content standards

* **Show full listener** in every example (no partials).
* Prefer realistic scenarios users actually want to do.
* Include simple conditional logic and one or two meaningful lines of work.
* Use the async wrapper **only** in the async example.
* Keep examples short; avoid unrelated helpers.

### Special considerations

* **Empty states**: document when helpers can be “empty” and what that means.
* **Timing**: note if it fires pre/post action or on which tick phase, if known.
* **Cancellation**: call out if supported (most aren’t; say “Not cancellable”).
* **Threading**: if relevant, add a brief note.

---

## Type Annotations

### Standard types

* Use exact names without markdown formatting in Type/Returns lines:

  * `string`, `int`, `boolean`, `void`
  * Helper/Java types as needed: `ItemStackHelper`, `BlockDataHelper`, `TextHelper`, `SLF4J.Logger`, etc.

### Consistency rules

* Prefer `int` over `number` for integers.
* Keep helper type names consistent (e.g., always `ItemStackHelper`).

---

## Additional Guidelines

### Formatting rules

* For params with none: `**Params**` then `* \`(none)``.
* For returns: `**Returns**` then `* \`TypeName`` (no bullets except the single item).
* Keep section order exactly as defined above across all files.

### Cross-references

* Link to sibling events and API pages with relative paths.
* Add 1–3 “See also” links maximum, chosen for usefulness.

### File organization

* File name: **kebab-case of the event name** (e.g., `held-item-change.md`).
* Each file documents **one** event.
* New files should ship with all standard sections, even if some are briefly “not applicable.”

---

## Template for New Event Files

````markdown
# EventName Event

One-sentence description of what triggers this event. (Optionally mention backing class, e.g., `EventEventName`.)

## Signature
```js
JsMacros.on("EventName", (event) => {
  // ...
});
````

```js
// Async pattern (if relevant)
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field     | Type     | Description           |
| --------- | -------- | --------------------- |
| fieldName | TypeName | What it is / when set |

## Behavior

* Trigger conditions (e.g., swap, consume, drop)
* Empty-state notes (when helpers may be empty)
* Timing (if known)
* Cancellable: No (or Yes, with details)

## Minimal example

```js
JsMacros.on("EventName", (e) => {
  // short, practical logic
});
```

## Async example

```js
JsMacros.on("EventName", JavaWrapper.methodToJavaAsync((e) => {
  // short, practical async logic
}));
```

## Fields

* [event.fieldName](#eventfieldname)

## Methods

* [event.toString()](#eventtostring)

### event.fieldName

Short description.

**Type:** TypeName

**Notes**

* Constraints / ranges / enums as bullets

### event.toString()

Returns a string representation of the event.

**Params**

* `(none)`

**Returns**

* `string`

## See also

* [RelatedEvent](./related-event.md)
* [Related API](../apis/chat.md#chatactionbar)
* [Related Helper](../classes/item-stack-helper.md)

```
