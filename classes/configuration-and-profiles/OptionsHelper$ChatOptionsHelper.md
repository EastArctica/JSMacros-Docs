# OptionsHelper.ChatOptionsHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.OptionsHelper$ChatOptionsHelper`

**Since:** JsMacros 1.8.4

The `ChatOptionsHelper` class provides comprehensive control over Minecraft's chat display, formatting, and communication settings. This helper allows scripts to read and modify various chat-related options including visibility settings, visual customization, link handling, and accessibility features. It's accessed through the `OptionsHelper.getChatOptions()` method or directly via the `chat` field.

## Overview

The `ChatOptionsHelper` class manages all chat and communication settings:
- **Chat visibility** - Control which messages appear in chat
- **Visual customization** - Opacity, size, spacing, and colors
- **Link handling** - Web link clickability and security prompts
- **Accessibility features** - Subtitles, narrator, and command suggestions
- **Chat dimensions** - Width, height, and layout configuration

## Getting a ChatOptionsHelper Instance

You typically obtain a `ChatOptionsHelper` instance through the main `OptionsHelper`:

```javascript
// Get the global options helper
const options = JsMacros.getOptions();

// Access chat options
const chat = options.getChatOptions();
// Or directly via the field
const chat = options.chat;
```

## Table of Contents

- [Fields](#fields)
- [Methods](#methods)
- [Usage Examples](#usage-examples)
- [Chat Visibility Reference](#chat-visibility-reference)

## Fields

### `parent` (OptionsHelper)
The parent OptionsHelper instance that provides access to other option categories.

**Type:** `OptionsHelper`

## Methods

### Chat Visibility and Filtering

#### `getChatVisibility()`
Gets the current chat visibility mode.

**Returns:** `String` - Current chat visibility: `"FULL"`, `"SYSTEM"`, or `"HIDDEN"`

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
const visibility = chat.getChatVisibility();
Chat.log(`Chat visibility: ${visibility}`);
```

#### `setChatVisibility(String visibility)`
Sets the chat visibility mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| visibility | String | `"FULL"`, `"SYSTEM"`, or `"HIDDEN"` - chat visibility level |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Show all chat messages
chat.setChatVisibility("FULL");
JsMacros.getOptions().saveOptions();
Chat.log("Chat set to show all messages");

// Show only system messages
chat.setChatVisibility("SYSTEM");
JsMacros.getOptions().saveOptions();
Chat.log("Chat set to system messages only");

// Hide all chat
chat.setChatVisibility("HIDDEN");
JsMacros.getOptions().saveOptions();
Chat.log("Chat hidden");
```

#### `areColorsShown()`
Checks if color codes are allowed in chat.

**Returns:** `boolean` - `true` if color codes are shown, `false` otherwise

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Chat colors: ${chat.areColorsShown() ? 'Enabled' : 'Disabled'}`);
```

#### `setShowColors(boolean show)`
Enables or disables color codes in chat.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| show | boolean | `true` to show color codes, `false` to disable |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Enable colorful chat
chat.setShowColors(true);
JsMacros.getOptions().saveOptions();
Chat.log("Chat colors enabled");

// Disable colors for clean text
chat.setShowColors(false);
JsMacros.getOptions().saveOptions();
Chat.log("Chat colors disabled");
```

### Link Handling

#### `areWebLinksEnabled()`
Checks if web links in chat are clickable.

**Returns:** `boolean` - `true` if web links are clickable, `false` otherwise

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Web links: ${chat.areWebLinksEnabled() ? 'Clickable' : 'Not clickable'}`);
```

#### `enableWebLinks(boolean enabled)`
Enables or disables clickable web links in chat.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to enable clickable links, `false` to disable |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Enable clickable links
chat.enableWebLinks(true);
JsMacros.getOptions().saveOptions();
Chat.log("Web links enabled");

// Disable links for security
chat.enableWebLinks(false);
JsMacros.getOptions().saveOptions();
Chat.log("Web links disabled for security");
```

#### `isWebLinkPromptEnabled()`
Checks if web link warning prompts are enabled.

**Returns:** `boolean` - `true` if link prompts are shown, `false` otherwise

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Link prompts: ${chat.isWebLinkPromptEnabled() ? 'Enabled' : 'Disabled'}`);
```

#### `enableWebLinkPrompt(boolean enabled)`
Enables or disables web link warning prompts.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to show link warnings, `false` to hide prompts |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Enable link warnings for security
chat.enableWebLinkPrompt(true);
JsMacros.getOptions().saveOptions();
Chat.log("Link warning prompts enabled");

// Disable prompts for convenience
chat.enableWebLinkPrompt(false);
JsMacros.getOptions().saveOptions();
Chat.log("Link warning prompts disabled");
```

### Chat Appearance

#### `getChatOpacity()`
Gets the current chat window opacity.

**Returns:** `double` - Current chat opacity (0.0 to 1.0)

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Chat opacity: ${(chat.getChatOpacity() * 100).toFixed(0)}%`);
```

#### `setChatOpacity(double opacity)`
Sets the chat window opacity.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| opacity | double | Opacity value (0.0 = fully transparent, 1.0 = fully opaque) |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Make chat more transparent
chat.setChatOpacity(0.7);
JsMacros.getOptions().saveOptions();
Chat.log("Chat opacity set to 70%");

// Make chat fully opaque
chat.setChatOpacity(1.0);
JsMacros.getOptions().saveOptions();
Chat.log("Chat opacity set to 100%");
```

#### `getTextBackgroundOpacity()`
Gets the current text background opacity.

**Returns:** `double` - Current text background opacity (0.0 to 1.0)

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Text background opacity: ${(chat.getTextBackgroundOpacity() * 100).toFixed(0)}%`);
```

#### `setTextBackgroundOpacity(double opacity)`
Sets the text background opacity.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| opacity | double | Background opacity value (0.0 = transparent, 1.0 = opaque) |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Make text backgrounds more visible
chat.setTextBackgroundOpacity(0.8);
JsMacros.getOptions().saveOptions();
Chat.log("Text background opacity increased");

// Remove text backgrounds
chat.setTextBackgroundOpacity(0.0);
JsMacros.getOptions().saveOptions();
Chat.log("Text backgrounds removed");
```

#### `getTextSize()`
Gets the current chat text size.

**Returns:** `double` - Current text size multiplier

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Chat text size: ${chat.getTextSize()}`);
```

#### `setTextSize(double size)`
Sets the chat text size.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| size | double | Text size multiplier (1.0 = normal, higher = larger, lower = smaller) |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Increase text size for readability
chat.setTextSize(1.2);
JsMacros.getOptions().saveOptions();
Chat.log("Chat text size increased by 20%");

// Decrease text size for compact display
chat.setTextSize(0.9);
JsMacros.getOptions().saveOptions();
Chat.log("Chat text size decreased for compact display");
```

#### `getChatLineSpacing()`
Gets the current line spacing in chat.

**Returns:** `double` - Current line spacing multiplier

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Chat line spacing: ${chat.getChatLineSpacing()}`);
```

#### `setChatLineSpacing(double spacing)`
Sets the line spacing in chat.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| spacing | double | Line spacing multiplier (1.0 = normal, higher = more spacing) |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Increase line spacing for readability
chat.setChatLineSpacing(1.3);
JsMacros.getOptions().saveOptions();
Chat.log("Chat line spacing increased for better readability");

// Decrease line spacing for compact display
chat.setChatLineSpacing(0.9);
JsMacros.getOptions().saveOptions();
Chat.log("Chat line spacing decreased");
```

### Chat Dimensions

#### `getChatWidth()`
Gets the current chat width in pixels.

**Returns:** `int` - Current chat width in pixels

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Chat width: ${chat.getChatWidth()} pixels`);
```

#### `setChatWidth(int width)`
Sets the chat width in pixels.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| width | int | Chat width in pixels |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Make chat wider
chat.setChatWidth(400);
JsMacros.getOptions().saveOptions();
Chat.log("Chat width increased");

// Make chat narrower
chat.setChatWidth(250);
JsMacros.getOptions().saveOptions();
Chat.log("Chat width decreased");
```

#### `getChatFocusedHeight()`
Gets the chat height when focused (chat open).

**Returns:** `int` - Current focused chat height in pixels

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Focused chat height: ${chat.getChatFocusedHeight()} pixels`);
```

#### `setChatFocusedHeight(int height)`
Sets the chat height when focused.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| height | int | Focused chat height in pixels |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Increase focused chat height
chat.setChatFocusedHeight(220);
JsMacros.getOptions().saveOptions();
Chat.log("Focused chat height increased");
```

#### `getChatUnfocusedHeight()`
Gets the chat height when unfocused (chat closed).

**Returns:** `int` - Current unfocused chat height in pixels

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Unfocused chat height: ${chat.getChatUnfocusedHeight()} pixels`);
```

#### `setChatUnfocusedHeight(int height)`
Sets the chat height when unfocused.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| height | int | Unfocused chat height in pixels |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Set unfocused chat height
chat.setChatUnfocusedHeight(100);
JsMacros.getOptions().saveOptions();
Chat.log("Unfocused chat height set");
```

#### `getChatDelay()`
Gets the chat message fade delay in seconds.

**Returns:** `double` - Current chat delay in seconds

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Chat delay: ${chat.getChatDelay()} seconds`);
```

#### `setChatDelay(double delay)`
Sets the chat message fade delay.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| delay | double | Fade delay in seconds (0.0 = instant, higher = longer display) |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Keep messages longer
chat.setChatDelay(10.0);
JsMacros.getOptions().saveOptions();
Chat.log("Chat messages will stay for 10 seconds");

// Quick fade
chat.setChatDelay(2.0);
JsMacros.getOptions().saveOptions();
Chat.log("Chat messages will fade after 2 seconds");
```

### Accessibility Features

#### `getNarratorMode()`
Gets the current narrator mode.

**Returns:** `String` - Current narrator mode: `"OFF"`, `"ALL"`, `"CHAT"`, or `"SYSTEM"`

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Narrator mode: ${chat.getNarratorMode()}`);
```

#### `setNarratorMode(String mode)`
Sets the narrator mode.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| mode | String | `"OFF"`, `"ALL"`, `"CHAT"`, or `"SYSTEM"` - narration level |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Narrate all game elements
chat.setNarratorMode("ALL");
JsMacros.getOptions().saveOptions();
Chat.log("Narrator set to read all game elements");

// Narrate only chat messages
chat.setNarratorMode("CHAT");
JsMacros.getOptions().saveOptions();
Chat.log("Narrator set to read chat only");

// Disable narrator
chat.setNarratorMode("OFF");
JsMacros.getOptions().saveOptions();
Chat.log("Narrator disabled");
```

#### `areCommandSuggestionsEnabled()`
Checks if command suggestions are enabled.

**Returns:** `boolean` - `true` if command suggestions are enabled, `false` otherwise

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Command suggestions: ${chat.areCommandSuggestionsEnabled() ? 'Enabled' : 'Disabled'}`);
```

#### `enableCommandSuggestions(boolean enabled)`
Enables or disables command suggestions.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to enable suggestions, `false` to disable |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Enable command suggestions
chat.enableCommandSuggestions(true);
JsMacros.getOptions().saveOptions();
Chat.log("Command suggestions enabled");

// Disable command suggestions
chat.enableCommandSuggestions(false);
JsMacros.getOptions().saveOptions();
Chat.log("Command suggestions disabled");
```

#### `areMatchedNamesHidden()`
Checks if messages from blocked users are hidden.

**Returns:** `boolean` - `true` if blocked user messages are hidden, `false` otherwise

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Blocked messages: ${chat.areMatchedNamesHidden() ? 'Hidden' : 'Shown'}`);
```

#### `enableHideMatchedNames(boolean enabled)`
Enables or disables hiding messages from blocked users.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| enabled | boolean | `true` to hide blocked messages, `false` to show all |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Hide blocked user messages
chat.enableHideMatchedNames(true);
JsMacros.getOptions().saveOptions();
Chat.log("Blocked user messages will be hidden");

// Show all messages
chat.enableHideMatchedNames(false);
JsMacros.getOptions().saveOptions();
Chat.log("All messages will be shown");
```

#### `isDebugInfoReduced()`
Checks if debug info display is reduced.

**Returns:** `boolean` - `true` if debug info is reduced, `false` otherwise

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();
Chat.log(`Debug info: ${chat.isDebugInfoReduced() ? 'Reduced' : 'Full'}`);
```

#### `reduceDebugInfo(boolean reduced)`
Enables or reduces debug info display.

**Parameters:**
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| reduced | boolean | `true` to reduce debug info, `false` for full debug info |

**Returns:** `ChatOptionsHelper` - The current helper instance for method chaining

**Example:**
```javascript
const chat = JsMacros.getOptions().getChatOptions();

// Reduce debug info for cleaner display
chat.reduceDebugInfo(true);
JsMacros.getOptions().saveOptions();
Chat.log("Debug info reduced");

// Show full debug info
chat.reduceDebugInfo(false);
JsMacros.getOptions().saveOptions();
Chat.log("Full debug info enabled");
```

## Usage Examples

### Screenshot-Friendly Chat Configuration

```javascript
function configureChatForScreenshots() {
    const chat = JsMacros.getOptions().getChatOptions();

    chat.setChatOpacity(0.8)                    // Semi-transparent chat
         .setTextBackgroundOpacity(0.3)          // Light text background
         .setTextSize(1.1)                       // Slightly larger text
         .setChatWidth(400)                      // Wider chat
         .setChatLineSpacing(1.2)                // More spacing between lines
         .setChatDelay(15.0)                     // Keep messages longer
         .setShowColors(true)                    // Keep colors for visual appeal
         .setChatVisibility("FULL");             // Show all messages

    JsMacros.getOptions().saveOptions();
    Chat.log("Chat configured for screenshots");
}

configureChatForScreenshots();
```

### Accessibility-Enhanced Chat Configuration

```javascript
function configureChatForAccessibility() {
    const chat = JsMacros.getOptions().getChatOptions();

    chat.setTextBackgroundOpacity(1.0)           // Full text background
         .setChatOpacity(1.0)                    // Full chat opacity
         .setChatLineSpacing(1.5)                // Extra line spacing
         .setTextSize(1.3)                       // Larger text
         .setChatDelay(0.0)                      // No fade for better readability
         .setNarratorMode("CHAT")                // Narrate chat messages
         .enableCommandSuggestions(true)         // Help with commands
         .setChatVisibility("FULL");             // Show all messages

    JsMacros.getOptions().saveOptions();
    Chat.log("Chat configured for accessibility");
}

configureChatForAccessibility();
```

### Minimal Chat Configuration for Gameplay

```javascript
function configureMinimalChat() {
    const chat = JsMacros.getOptions().getChatOptions();

    chat.setChatOpacity(0.4)                    // Very transparent
         .setTextBackgroundOpacity(0.2)          // Minimal background
         .setTextSize(0.9)                       // Slightly smaller text
         .setChatWidth(280)                      // Narrower chat
         .setChatUnfocusedHeight(70)             // Smaller when closed
         .setChatDelay(5.0)                      // Quick fade
         .setShowColors(false)                   // Clean text
         .enableWebLinks(false)                  // Disable for safety
         .reduceDebugInfo(true);                 // Clean display

    JsMacros.getOptions().saveOptions();
    Chat.log("Chat configured for minimal gameplay distraction");
}

configureMinimalChat();
```

### Streaming/Recording Chat Configuration

```javascript
function configureChatForStreaming() {
    const chat = JsMacros.getOptions().getChatOptions();

    chat.setChatOpacity(0.9)                    // Mostly opaque for visibility
         .setTextBackgroundOpacity(0.6)          // Clear background
         .setTextSize(1.2)                       // Larger for stream viewers
         .setChatWidth(450)                      // Wider for readability
         .setChatLineSpacing(1.3)                // Better spacing
         .setChatFocusedHeight(250)              // Taller when focused
         .setChatDelay(20.0)                     // Keep messages visible
         .setShowColors(true)                    // Keep formatting
         .enableWebLinks(false)                  // Security for streaming
         .reduceDebugInfo(true);                 // Clean display

    JsMacros.getOptions().saveOptions();
    Chat.log("Chat configured for streaming/recording");
}

configureChatForStreaming();
```

### Chat Profile Manager

```javascript
class ChatProfileManager {
    constructor() {
        this.profiles = new Map();
        this.currentProfile = null;
        this.loadProfiles();
    }

    loadProfiles() {
        // Define chat profiles
        this.profiles.set("default", {
            opacity: 1.0,
            textBackgroundOpacity: 0.5,
            textSize: 1.0,
            lineSpacing: 1.0,
            width: 320,
            focusedHeight: 180,
            unfocusedHeight: 90,
            delay: 0.0,
            showColors: true,
            visibility: "FULL"
        });

        this.profiles.set("accessibility", {
            opacity: 1.0,
            textBackgroundOpacity: 1.0,
            textSize: 1.3,
            lineSpacing: 1.5,
            width: 400,
            focusedHeight: 220,
            unfocusedHeight: 120,
            delay: 0.0,
            showColors: true,
            visibility: "FULL"
        });

        this.profiles.set("minimal", {
            opacity: 0.3,
            textBackgroundOpacity: 0.1,
            textSize: 0.9,
            lineSpacing: 0.9,
            width: 280,
            focusedHeight: 150,
            unfocusedHeight: 60,
            delay: 3.0,
            showColors: false,
            visibility: "FULL"
        });

        this.profiles.set("streaming", {
            opacity: 0.9,
            textBackgroundOpacity: 0.7,
            textSize: 1.2,
            lineSpacing: 1.3,
            width: 450,
            focusedHeight: 250,
            unfocusedHeight: 100,
            delay: 20.0,
            showColors: true,
            visibility: "FULL"
        });
    }

    applyProfile(profileName) {
        const profile = this.profiles.get(profileName);
        if (!profile) {
            Chat.log(`Unknown chat profile: ${profileName}`);
            return false;
        }

        const chat = JsMacros.getOptions().getChatOptions();

        chat.setChatOpacity(profile.opacity)
             .setTextBackgroundOpacity(profile.textBackgroundOpacity)
             .setTextSize(profile.textSize)
             .setChatLineSpacing(profile.lineSpacing)
             .setChatWidth(profile.width)
             .setChatFocusedHeight(profile.focusedHeight)
             .setChatUnfocusedHeight(profile.unfocusedHeight)
             .setChatDelay(profile.delay)
             .setShowColors(profile.showColors)
             .setChatVisibility(profile.visibility);

        JsMacros.getOptions().saveOptions();
        this.currentProfile = profileName;

        Chat.log(`Applied chat profile: ${profileName}`);
        return true;
    }

    getCurrentProfile() {
        return this.currentProfile;
    }

    listProfiles() {
        Chat.log("Available chat profiles:");
        for (const [name, profile] of this.profiles) {
            const marker = name === this.currentProfile ? " (current)" : "";
            Chat.log(`- ${name}${marker}`);
        }
    }
}

// Usage example:
const chatManager = new ChatProfileManager();
chatManager.listProfiles();
chatManager.applyProfile("accessibility");
```

### Dynamic Chat Configuration

```javascript
// Adjust chat based on game context
function adjustChatForContext() {
    const chat = JsMacros.getOptions().getChatOptions();
    const world = World;
    const player = Player.getPlayer();

    if (!player) return;

    // Check if player is in combat
    const health = player.getHealth();
    const maxHealth = player.getMaxHealth();
    const healthPercent = health / maxHealth;

    if (healthPercent < 0.5) {
        // In combat - make chat less intrusive
        chat.setChatOpacity(0.5)
             .setTextBackgroundOpacity(0.3)
             .setChatUnfocusedHeight(60)
             .setChatDelay(2.0);
        Chat.log("Chat adjusted for combat");
    } else {
        // Safe - normal chat
        chat.setChatOpacity(1.0)
             .setTextBackgroundOpacity(0.5)
             .setChatUnfocusedHeight(90)
             .setChatDelay(0.0);
        Chat.log("Chat set to normal");
    }

    JsMacros.getOptions().saveOptions();
}

// Run context adjustment periodically
setInterval(adjustChatForContext, 5000);
```

### Chat Status Display

```javascript
function displayChatStatus() {
    const chat = JsMacros.getOptions().getChatOptions();

    Chat.log("=== Current Chat Settings ===");
    Chat.log(`Visibility: ${chat.getChatVisibility()}`);
    Chat.log(`Colors: ${chat.areColorsShown() ? 'Enabled' : 'Disabled'}`);
    Chat.log(`Web Links: ${chat.areWebLinksEnabled() ? 'Enabled' : 'Disabled'}`);
    Chat.log(`Link Prompts: ${chat.isWebLinkPromptEnabled() ? 'Enabled' : 'Disabled'}`);
    Chat.log(`Opacity: ${(chat.getChatOpacity() * 100).toFixed(0)}%`);
    Chat.log(`Text Background: ${(chat.getTextBackgroundOpacity() * 100).toFixed(0)}%`);
    Chat.log(`Text Size: ${chat.getTextSize()}`);
    Chat.log(`Line Spacing: ${chat.getChatLineSpacing()}`);
    Chat.log(`Width: ${chat.getChatWidth()}px`);
    Chat.log(`Focused Height: ${chat.getChatFocusedHeight()}px`);
    Chat.log(`Unfocused Height: ${chat.getChatUnfocusedHeight()}px`);
    Chat.log(`Delay: ${chat.getChatDelay()}s`);
    Chat.log(`Narrator: ${chat.getNarratorMode()}`);
    Chat.log(`Command Suggestions: ${chat.areCommandSuggestionsEnabled() ? 'Enabled' : 'Disabled'}`);
    Chat.log(`Blocked Messages: ${chat.areMatchedNamesHidden() ? 'Hidden' : 'Shown'}`);
    Chat.log(`Debug Info: ${chat.isDebugInfoReduced() ? 'Reduced' : 'Full'}`);
    Chat.log("==============================");
}

// Display current chat configuration
displayChatStatus();
```

## Chat Visibility Reference

| Mode | Description | Use Cases |
|------|-------------|-----------|
| **FULL** | Show all chat messages including player chat, system messages, and death messages | Normal gameplay, multiplayer interaction |
| **SYSTEM** | Show only system messages (command output, death messages, server messages) | Minimizing chat distractions, focused gameplay |
| **HIDDEN** | Hide all chat messages | Screenshots, recording, minimal interface |

## Important Notes

1. **Persistence:** Chat settings are automatically saved when `saveOptions()` is called and persist between game sessions.

2. **Real-time Changes:** Most chat settings apply immediately without requiring a restart.

3. **Multiplayer Compatibility:** Chat visibility settings affect both local and multiplayer chat.

4. **Accessibility Features:** Narrator and subtitle settings can significantly improve gameplay for users with visual impairments.

5. **Security Considerations:** Be cautious with web link settings, especially on untrusted servers.

6. **Performance Impact:** Text background rendering and transparency can affect performance on very low-end systems.

7. **Display Resolution:** Chat width and height are in absolute pixels and may need adjustment for different screen resolutions.

8. **Method Chaining:** All setter methods return the helper instance for easy method chaining.

## Related Classes

- `OptionsHelper` - Parent class providing access to all option categories
- `GameOptions` - The underlying Minecraft options class that this helper wraps
- `ChatHudLineHelper` - Individual chat message management
- `ChatHistoryManager` - Chat history and logging functionality

## Version History

- **1.8.4:** Initial release with comprehensive chat settings support
- **Current:** Enhanced with accessibility features and improved visual customization

The `ChatOptionsHelper` class provides complete control over Minecraft's chat interface, enabling everything from accessibility enhancements to aesthetic customization for streaming and screenshots.