# ServiceManager

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.service.ServiceManager`

**Since:** JsMacros 1.6.3

The `ServiceManager` class provides comprehensive management for background services in JsMacros. Services are background scripts designed to run continuously and are primarily noticed by their side effects rather than direct user interaction. This class allows you to register, start, stop, enable, disable, and monitor services, as well as handle automatic reloading when service files are modified.

The ServiceManager supports service lifecycle management, status tracking, automatic file modification monitoring, and persistent storage of service configurations. Services can be individually controlled and monitored, with support for crash recovery and hot-reloading capabilities.

## Overview

The `ServiceManager` class provides the following main functionalities:
- Service registration and unregistration with unique names
- Service lifecycle management (start, stop, restart, enable, disable)
- Service status monitoring and querying
- Automatic reloading when service files are modified
- Configuration persistence and loading
- Crash detection and recovery mechanisms
- Integration with the JsMacros event system

## Access

The ServiceManager is accessible through the JsMacros global library:

```js
const serviceManager = JsMacros.getServiceManager();
```

## Fields

The ServiceManager doesn't expose any public fields directly for script access.

## Methods

## ServiceStatus Enum

The `ServiceStatus` enum represents the possible states of a service. See [`ServiceManager$ServiceStatus`](ServiceManager$ServiceStatus.md) for detailed documentation.

## Usage Examples

### Basic Service Management

```js
// Get the service manager
const serviceManager = JsMacros.getServiceManager();

// Register a new service
const success = serviceManager.registerService("MyBackgroundTask", "services/background.js", true);
if (success) {
    Chat.log("Background service registered and started!");
}

// List all services
const services = serviceManager.getServices();
Chat.log(`Registered services: ${Array.from(services).join(", ")}`);

// Check service status
const status = serviceManager.status("MyBackgroundTask");
Chat.log(`Service status: ${status}`);
```

### Service Lifecycle Management

```js
const serviceManager = JsMacros.getServiceManager();

// Start a service
const previousStatus = serviceManager.startService("MyService");
Chat.log(`Service started, was: ${previousStatus}`);

// Check if running
if (serviceManager.isRunning("MyService")) {
    Chat.log("Service is running!");
}

// Disable the service (stops it and prevents auto-start)
const oldStatus = serviceManager.disableService("MyService");
Chat.log(`Service disabled, was: ${oldStatus}`);

// Enable it again
serviceManager.enableService("MyService");

// Restart the service
serviceManager.restartService("MyService");
```

### Service Monitoring

```js
const serviceManager = JsMacros.getServiceManager();

function monitorServices() {
    const services = serviceManager.getServices();

    Chat.log("=== Service Status Report ===");
    for (const serviceName of services) {
        const status = serviceManager.status(serviceName);
        const enabled = serviceManager.isEnabled(serviceName);
        const running = serviceManager.isRunning(serviceName);
        const crashed = serviceManager.isCrashed(serviceName);

        Chat.log(`${serviceName}: ${status} | Enabled: ${enabled} | Running: ${running} | Crashed: ${crashed}`);
    }
}

// Monitor services every 30 seconds
setInterval(monitorServices, 30000);
```

### Service Configuration Management

```js
const serviceManager = JsMacros.getServiceManager();

// Load services from configuration
serviceManager.load();
Chat.log("Services loaded from configuration!");

// Make changes to services
serviceManager.registerService("NewService", "services/newservice.js", true);

// Save the changes
serviceManager.save();
Chat.log("Service configuration saved!");
```

### Auto-Reload Management

```js
const serviceManager = JsMacros.getServiceManager();

// Enable auto-reload for all services
serviceManager.startReloadListener();
Chat.log("Auto-reload enabled!");

// Disable auto-reload for a specific service
serviceManager.disableReload("CriticalService");
Chat.log("Auto-reload disabled for CriticalService!");

// Manually trigger reload check
serviceManager.tickReloadListener();
Chat.log("Reload check completed!");
```

### Service Crash Recovery

```js
const serviceManager = JsMacros.getServiceManager();

function checkAndRecoverServices() {
    const services = serviceManager.getServices();

    for (const serviceName of services) {
        if (serviceManager.isCrashed(serviceName)) {
            Chat.log(`Service ${serviceName} has crashed, attempting recovery...`);

            // Try to restart the service
            const status = serviceManager.restartService(serviceName);

            if (serviceManager.isRunning(serviceName)) {
                Chat.log(`Successfully recovered service ${serviceName}`);
            } else {
                Chat.log(`Failed to recover service ${serviceName}, status: ${status}`);
            }
        }
    }
}

// Check for crashed services every minute
setInterval(checkAndRecoverServices, 60000);
```

### Service Data Access

```js
const serviceManager = JsMacros.getServiceManager();

// Get service configuration
const trigger = serviceManager.getTrigger("MyService");
if (trigger) {
    Chat.log(`Service file: ${trigger.file}`);
    Chat.log(`Service enabled: ${trigger.enabled}`);
}

// Get running service data (only works if service is running)
try {
    const serviceData = serviceManager.getServiceData("MyService");
    Chat.log(`Service name: ${serviceData.serviceName}`);

    // Access service's global variables
    const someValue = serviceData.getInt("counter");
    Chat.log(`Service counter: ${someValue}`);
} catch (e) {
    Chat.log(`Service not running or error accessing data: ${e.message}`);
}
```

### Service File Organization

```js
const serviceManager = JsMacros.getServiceManager();

// Register multiple services organized by function
const services = [
    { name: "PlayerTracker", file: "services/player/tracker.js", enabled: true },
    { name: "ItemMonitor", file: "services/inventory/monitor.js", enabled: true },
    { name: "ChatLogger", file: "services/chat/logger.js", enabled: false },
    { name: "WorldAnalyzer", file: "services/world/analyzer.js", enabled: true }
];

for (const service of services) {
    const success = serviceManager.registerService(service.name, service.file, service.enabled);
    if (success) {
        Chat.log(`Registered service: ${service.name}`);
    } else {
        Chat.log(`Failed to register service: ${service.name} (may already exist)`);
    }
}
```

### Dynamic Service Management

```js
const serviceManager = JsMacros.getServiceManager();

function createTempService(serviceName, scriptContent) {
    // Create a temporary service file
    const fs = require('fs');
    const path = require('path');
    const tempFile = path.join('services', 'temp', `${serviceName}.js`);

    fs.writeFileSync(tempFile, scriptContent);

    // Register the service
    const success = serviceManager.registerService(serviceName, tempFile, true);

    if (success) {
        Chat.log(`Created temporary service: ${serviceName}`);

        // Auto-cleanup after 5 minutes
        setTimeout(() => {
            if (serviceManager.unregisterService(serviceName)) {
                Chat.log(`Cleaned up temporary service: ${serviceName}`);
            }
            fs.unlinkSync(tempFile);
        }, 300000);
    }

    return success;
}

// Example: Create a temporary health monitor service
const healthMonitorScript = `
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    const player = Player.getPlayer();
    if (player) {
        const health = player.getHealth();
        if (health <= 5) {
            Chat.actionbar("&cLow health warning!");
        }
    }
}));
`;

createTempService("HealthMonitor", healthMonitorScript);
```

## Integration with Event System

The ServiceManager works closely with the `EventService` class, which is used within service scripts to manage global state and cleanup:

```js
// Within a service script (services/myservice.js)
const event = JsMacros.waitForEvent("Service");

// Store global variables that persist across script reloads
event.putInt("counter", 0);
event.putString("status", "active");

// Setup cleanup on service stop
event.unregisterOnStop(true, Hud.createDraw2D()); // Clear events and unregister Draw2D

// Increment counter
function incrementCounter() {
    const count = event.incrementAndGetInt("counter");
    Chat.log(`Service counter: ${count}`);
}

// Use the service for background tasks
JsMacros.on("Tick", JavaWrapper.methodToJavaAsync(() => {
    incrementCounter();
    // Your service logic here
}));
```

## Important Notes

1. **Service Names:** Service names must be unique. Attempting to register a service with an existing name will fail.

2. **File Paths:** Service file paths are relative to the macro folder.

3. **Auto-Reload:** Services can be automatically reloaded when their files are modified. This can be controlled globally or per-service.

4. **Crash Recovery:** Services that crash can be automatically restarted when their files change, or manually restarted using the restart methods.

5. **Persistence:** Service configurations are automatically saved to and loaded from the JsMacros configuration.

6. **Thread Safety:** All ServiceManager methods are synchronized and thread-safe.

7. **Status Monitoring:** Use the `status()` method for detailed service state information beyond simple enabled/running checks.

8. **Resource Management:** Services should properly clean up resources when stopped. Use the `EventService.unregisterOnStop()` method for automatic cleanup.

## Related Classes

- `ServiceTrigger` - Configuration object for service triggers containing file path and enabled state
- `EventService` - Event object passed to service scripts for managing global state and cleanup
- [`ServiceManager$ServiceStatus`](ServiceManager$ServiceStatus.md) - Enum representing the possible states of a service
- `BaseScriptContext` - Script context management class
- `Registrable` - Interface for objects that can be automatically unregistered

## Version History

- **1.6.3:** Initial release with basic service management functionality
- **1.6.4:** Added EventService class with global variable management
- **1.6.5:** Added service data access methods and global variable operations
- **1.8.4:** Enhanced auto-reload functionality and crash recovery features
- **1.9.1:** Improved cleanup mechanisms with `EventService.unregisterOnStop()`
- **Current:** Full-featured service management with comprehensive lifecycle control

