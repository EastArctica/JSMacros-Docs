# ServerInfoHelper

**Full Class Name:** `xyz.wagyourtail.jsmacros.client.api.helpers.world.ServerInfoHelper`

**Extends:** `BaseHelper<ServerInfo>`

**Since:** JsMacros 1.6.5

The `ServerInfoHelper` class provides access to server information and connection details for multiplayer servers. This helper class wraps Minecraft's `ServerInfo` object and provides methods to access server name, address, player count, version information, ping, and other server-related data. ServerInfoHelper instances are typically obtained through server list operations or connection events.

## Overview

The `ServerInfoHelper` class serves as a wrapper around server information, providing convenient access to:
- Server identification (name, address, connection type)
- Player information (count, player list summary)
- Server status and version details
- Network information (ping, protocol version)
- Server resources (icon, resource pack policy)
- NBT data representation

This class is particularly useful for server management scripts, server selection interfaces, and connection monitoring tools.

## Constructors

ServerInfoHelper instances are typically created internally by JsMacros when accessing server information from the multiplayer server list or during server connections. Direct instantiation is not commonly required in scripts.

## Fields

ServerInfoHelper does not expose public fields for direct access. All server information is accessed through the provided methods.

## Methods
- [serverInfo.getName()](#serverinfogetname)
- [serverInfo.getAddress()](#serverinfogetaddress)
- [serverInfo.getPlayerCountLabel()](#serverinfogetplayercountlabel)
- [serverInfo.getLabel()](#serverinfogetlabel)
- [serverInfo.getPing()](#serverinfogetping)
- [serverInfo.getProtocolVersion()](#serverinfogetprotocolversion)
- [serverInfo.getVersion()](#serverinfogetversion)
- [serverInfo.getPlayerListSummary()](#serverinfogetplayersummary)
- [serverInfo.resourcePackPolicy()](#serverinforesourcepackpolicy)
- [serverInfo.getIcon()](#serverinfogeticon)
- [serverInfo.isOnline()](#serverinfoisonline)
- [serverInfo.isLocal()](#serverinfoislocal)
- [serverInfo.getNbt()](#serverinfogetnbt)
- [serverInfo.toString()](#serverinfotostring)

## Usage Examples

### Basic Server Information Display
```js
// Function to display comprehensive server information
function displayServerInfo(serverInfo) {
    if (!serverInfo) {
        Chat.log("No server information available");
        return;
    }

    Chat.log(`=== Server Information ===`);
    Chat.log(`Name: ${serverInfo.getName()}`);
    Chat.log(`Address: ${serverInfo.getAddress()}`);

    const version = serverInfo.getVersion();
    if (version) {
        Chat.log(`Version: ${version.getString()}`);
    }

    const ping = serverInfo.getPing();
    Chat.log(`Ping: ${ping}ms`);

    // Server type
    if (serverInfo.isLocal()) {
        Chat.log(`Type: Local/LAN Server`);
    } else {
        Chat.log(`Type: Online Server`);
    }

    // Player information
    const playerCountLabel = serverInfo.getPlayerCountLabel();
    if (playerCountLabel) {
        Chat.log(`Players: ${playerCountLabel.getString()}`);
    }

    // Resource pack policy
    const policy = serverInfo.resourcePackPolicy();
    Chat.log(`Resource Pack Policy: ${policy}`);

    Chat.log(`========================`);
}

// Usage example (assuming serverInfo is available)
// displayServerInfo(serverInfo);
```

### Server Connection Quality Assessment
```js
function assessConnectionQuality(serverInfo) {
    if (!serverInfo) return "No server info";

    const ping = serverInfo.getPing();
    const playerCountLabel = serverInfo.getPlayerCountLabel();
    const isOnline = serverInfo.isOnline();

    if (!isOnline) {
        return "Local server (no ping measurement)";
    }

    let quality = "";

    // Assess ping quality
    if (ping < 50) {
        quality += "Excellent connection";
    } else if (ping < 100) {
        quality += "Good connection";
    } else if (ping < 200) {
        quality += "Fair connection";
    } else {
        quality += "Poor connection";
    }

    quality += ` (${ping}ms ping)`;

    // Add player info if available
    if (playerCountLabel) {
        quality += ` - ${playerCountLabel.getString()}`;
    }

    return quality;
}

// Example usage
// const quality = assessConnectionQuality(serverInfo);
// Chat.actionbar(quality);
```

### Server List Analysis
```js
// Function to analyze and categorize servers
function analyzeServerList(serverList) {
    const categories = {
        excellent: [],
        good: [],
        fair: [],
        poor: [],
        local: []
    };

    for (let i = 0; i < serverList.length; i++) {
        const server = serverList[i];
        const ping = server.getPing();
        const name = server.getName();

        const serverData = {
            name: name,
            address: server.getAddress(),
            ping: ping,
            players: server.getPlayerCountLabel()?.getString() || "Unknown"
        };

        if (server.isLocal()) {
            categories.local.push(serverData);
        } else if (ping < 50) {
            categories.excellent.push(serverData);
        } else if (ping < 100) {
            categories.good.push(serverData);
        } else if (ping < 200) {
            categories.fair.push(serverData);
        } else {
            categories.poor.push(serverData);
        }
    }

    // Display results
    Chat.log("=== Server List Analysis ===");

    Object.keys(categories).forEach(category => {
        if (categories[category].length > 0) {
            Chat.log(`\n${category.toUpperCase()} (${categories[category].length} servers):`);
            categories[category].forEach(server => {
                Chat.log(`  ${server.name} - ${server.address} - ${server.ping}ms - ${server.players}`);
            });
        }
    });
}

// This would typically be used with the multiplayer server list
// analyzeServerList(serverList);
```

### Server Favorites Management
```js
// Server favorites management system
const FAVORITES_KEY = "server_favorites";

function loadFavorites() {
    const favoritesJson = File.read(FASCades_KEY + ".json") || "[]";
    return JSON.parse(favoritesJson);
}

function saveFavorites(favorites) {
    File.write(FAVORITES_KEY + ".json", JSON.stringify(favorites, null, 2));
}

function addToFavorites(serverInfo) {
    if (!serverInfo) return false;

    const favorites = loadFavorites();
    const serverKey = `${serverInfo.getName()}:${serverInfo.getAddress()}`;

    // Check if already in favorites
    if (favorites.find(fav => fav.key === serverKey)) {
        Chat.log("Server already in favorites");
        return false;
    }

    const favorite = {
        key: serverKey,
        name: serverInfo.getName(),
        address: serverInfo.getAddress(),
        version: serverInfo.getVersion()?.getString(),
        added: new Date().toISOString()
    };

    favorites.push(favorite);
    saveFavorites(favorites);

    Chat.log(`Added "${serverInfo.getName()}" to favorites`);
    return true;
}

function removeFromFavorites(serverInfo) {
    if (!serverInfo) return false;

    const favorites = loadFavorites();
    const serverKey = `${serverInfo.getName()}:${serverInfo.getAddress()}`;

    const index = favorites.findIndex(fav => fav.key === serverKey);
    if (index !== -1) {
        favorites.splice(index, 1);
        saveFavorites(favorites);
        Chat.log(`Removed "${serverInfo.getName()}" from favorites`);
        return true;
    }

    Chat.log("Server not found in favorites");
    return false;
}

// Example usage
// addToFavorites(serverInfo);
// removeFromFavorites(serverInfo);
```

### Server Status Monitor
```js
// Continuous server status monitoring
let monitoredServers = [];
let monitoringInterval;

function startServerMonitoring(servers) {
    monitoredServers = servers;

    if (monitoringInterval) {
        clearInterval(monitoringInterval);
    }

    monitoringInterval = setInterval(() => {
        Chat.log("=== Server Status Update ===");

        monitoredServers.forEach(server => {
            const name = server.getName();
            const address = server.getAddress();
            const ping = server.getPing();
            const players = server.getPlayerCountLabel()?.getString() || "Unknown";
            const isOnline = server.isOnline();

            const status = isOnline ? `Online (${ping}ms)` : "Local";
            Chat.log(`${name} (${address}): ${status} - ${players}`);
        });

        Chat.log("=========================");
    }, 30000); // Update every 30 seconds
}

function stopServerMonitoring() {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
        Chat.log("Server monitoring stopped");
    }
}

// Example usage
// startServerMonitoring(serverList);
// ... later ...
// stopServerMonitoring();
```

### Server Information Export
```js
// Export server information to various formats
function exportServerInfo(serverInfo, format = "json") {
    if (!serverInfo) return null;

    const data = {
        name: serverInfo.getName(),
        address: serverInfo.getAddress(),
        ping: serverInfo.getPing(),
        protocol: serverInfo.getProtocolVersion(),
        version: serverInfo.getVersion()?.getString(),
        isOnline: serverInfo.isOnline(),
        isLocal: serverInfo.isLocal(),
        resourcePackPolicy: serverInfo.resourcePackPolicy(),
        playerCountLabel: serverInfo.getPlayerCountLabel()?.getString(),
        hasIcon: serverInfo.getIcon() ? serverInfo.getIcon().length > 0 : false,
        playerList: []
    };

    // Add player list if available
    const playerList = serverInfo.getPlayerListSummary();
    if (playerList && playerList.size() > 0) {
        for (let i = 0; i < playerList.size(); i++) {
            data.playerList.push(playerList.get(i).getString());
        }
    }

    switch (format.toLowerCase()) {
        case "json":
            return JSON.stringify(data, null, 2);

        case "csv":
            const headers = Object.keys(data).join(",");
            const values = Object.values(data).map(v =>
                Array.isArray(v) ? `"${v.join(";")}"` : `"${v}"`
            ).join(",");
            return `${headers}\n${values}`;

        case "text":
            let text = `Server Information for ${data.name}\n`;
            text += `===============================\n`;
            Object.entries(data).forEach(([key, value]) => {
                const formattedValue = Array.isArray(value) ? value.join(", ") : value;
                text += `${key}: ${formattedValue}\n`;
            });
            return text;

        default:
            return data;
    }
}

// Example usage
// const jsonData = exportServerInfo(serverInfo, "json");
// File.write("server_info.json", jsonData);
```

### Server Comparison Tool
```js
// Compare two servers
function compareServers(server1, server2) {
    if (!server1 || !server2) {
        Chat.log("Both servers must be provided for comparison");
        return;
    }

    Chat.log(`=== Server Comparison ===`);
    Chat.log(`Comparing "${server1.getName()}" vs "${server2.getName()}"`);
    Chat.log(``);

    // Compare ping
    const ping1 = server1.getPing();
    const ping2 = server2.getPing();
    if (!server1.isOnline() || !server2.isOnline()) {
        Chat.log(`Ping: Cannot compare (one or both are local servers)`);
    } else {
        const betterPing = ping1 < ping2 ? server1.getName() : server2.getName();
        const pingDiff = Math.abs(ping1 - ping2);
        Chat.log(`Ping: ${betterPing} has better ping (${pingDiff}ms difference)`);
    }

    // Compare versions
    const version1 = server1.getVersion()?.getString();
    const version2 = server2.getVersion()?.getString();
    if (version1 && version2) {
        if (version1 === version2) {
            Chat.log(`Version: Both servers running ${version1}`);
        } else {
            Chat.log(`Version: ${server1.getName()} - ${version1} | ${server2.getName()} - ${version2}`);
        }
    }

    // Compare player counts (if available)
    const players1 = server1.getPlayerCountLabel()?.getString();
    const players2 = server2.getPlayerCountLabel()?.getString();
    if (players1 && players2) {
        Chat.log(`Players: ${server1.getName()} - ${players1} | ${server2.getName()} - ${players2}`);
    }

    // Compare resource pack policies
    const policy1 = server1.resourcePackPolicy();
    const policy2 = server2.resourcePackPolicy();
    Chat.log(`Resource Pack: ${server1.getName()} - ${policy1} | ${server2.getName()} - ${policy2}`);

    Chat.log(`========================`);
}

// Example usage
// compareServers(server1, server2);
```

## Important Notes

1. **Data Availability:** Some methods like `getPlayerListSummary()` and `getIcon()` may return empty data if the server doesn't provide this information or if it hasn't been queried yet.

2. **Ping Measurement:** Ping is only meaningful for online servers. Local servers will typically show ping values that don't reflect actual network latency.

3. **Thread Safety:** ServerInfoHelper objects are generally safe to use across different threads, but always ensure the server information is up-to-date when accessing it.

4. **Dynamic Updates:** Server information like ping and player count may become outdated. For real-time monitoring, periodically refresh the server information.

5. **Resource Pack Policy:** The policy is returned as a translation key. You may need to use localization methods to get user-friendly text.

6. **NBT Data:** The `getNbt()` method provides all server data in a structured format, which can be useful for comprehensive data analysis.

7. **Version Compatibility:** The `getProtocolVersion()` helps determine client-server compatibility. Mismatched protocol versions may prevent connection.

## Related Classes

- `BaseHelper<ServerInfo>` - Parent class providing base functionality
- `TextHelper` - Used for text-based server information
- `NBTElementHelper.NBTCompoundHelper` - Used for structured server data
- `ServerInfo` - The underlying Minecraft class this helper wraps

## Version History

- **1.6.5:** Initial release with basic server information access
- **Current:** Enhanced with comprehensive server data access methods