# ServiceManager$ServiceStatus

**Full Class Name:** `xyz.wagyourtail.jsmacros.core.service.ServiceManager$ServiceStatus`

**Type:** Enum

**Since:** JsMacros 1.6.3

The `ServiceStatus` enum represents the possible states of a service within the JsMacros ServiceManager system. Each status value provides information about both the enabled state and running state of a service, allowing for comprehensive service monitoring and management.

## Overview

The ServiceStatus enum provides a standardized way to track and query the state of services. Services can be independently enabled/disabled (which determines if they should run) and running/stopped (which indicates if they are currently executing). This dual-state system allows for services to be temporarily stopped without being disabled, or to be enabled but not currently running due to errors or manual intervention.

## Enum Values

### `ENABLED`

Service is enabled and currently running.

- **Enabled State:** `true`
- **Running State:** `true`
- **Description:** The service is configured to run and is actively executing
- **Use Case:** Normal operational state for active services

### `DISABLED`

Service is disabled and stopped.

- **Enabled State:** `false`
- **Running State:** `false`
- **Description:** The service is configured not to run and is not executing
- **Use Case:** Services that are intentionally turned off

### `RUNNING`

Service is running but marked as disabled.

- **Enabled State:** `false`
- **Running State:** `true`
- **Description:** The service is currently executing but will not restart automatically if stopped
- **Use Case:** Temporary manual execution of disabled services, or services in the process of being disabled

### `STOPPED`

Service is stopped but marked as enabled.

- **Enabled State:** `true`
- **Running State:** `false`
- **Description:** The service should be running but is currently stopped (likely due to an error or manual intervention)
- **Use Case:** Services that crashed or were manually stopped but are configured to run

### `UNKNOWN`

Service doesn't exist or status cannot be determined.

- **Enabled State:** `unknown`
- **Running State:** `unknown`
- **Description:** The service is not registered in the ServiceManager or there was an error determining its status
- **Use Case:** Error handling and checking for non-existent services

## Usage Examples

### Basic Status Checking

```js
const serviceManager = JsMacros.getServiceManager();

function checkServiceStatus(serviceName) {
    const status = serviceManager.status(serviceName);

    switch (status) {
        case "ENABLED":
            Chat.log(`${serviceName} is enabled and running`);
            break;
        case "DISABLED":
            Chat.log(`${serviceName} is disabled and stopped`);
            break;
        case "RUNNING":
            Chat.log(`${serviceName} is running but disabled`);
            break;
        case "STOPPED":
            Chat.log(`${serviceName} is stopped but enabled`);
            break;
        case "UNKNOWN":
            Chat.log(`${serviceName} status is unknown or service doesn't exist`);
            break;
        default:
            Chat.log(`${serviceName} has unexpected status: ${status}`);
    }
}

// Check status of specific services
checkServiceStatus("MyBackgroundTask");
checkServiceStatus("PlayerTracker");
checkServiceStatus("NonExistentService");
```

### Service Health Monitoring

```js
const serviceManager = JsMacros.getServiceManager();

function monitorServiceHealth() {
    const services = serviceManager.getServices();
    let healthyCount = 0;
    let problematicServices = [];

    for (const serviceName of services) {
        const status = serviceManager.status(serviceName);
        const enabled = serviceManager.isEnabled(serviceName);
        const running = serviceManager.isRunning(serviceName);
        const crashed = serviceManager.isCrashed(serviceName);

        if (status === "ENABLED" && !crashed) {
            healthyCount++;
        } else {
            problematicServices.push({
                name: serviceName,
                status: status,
                enabled: enabled,
                running: running,
                crashed: crashed
            });
        }
    }

    Chat.log(`=== Service Health Report ===`);
    Chat.log(`Total services: ${services.size}`);
    Chat.log(`Healthy services: ${healthyCount}`);
    Chat.log(`Problematic services: ${problematicServices.length}`);

    if (problematicServices.length > 0) {
        Chat.log("\nProblematic services:");
        for (const service of problematicServices) {
            Chat.log(`- ${service.name}: ${service.status} (Enabled: ${service.enabled}, Running: ${service.running}, Crashed: ${service.crashed})`);
        }
    }
}

// Monitor every 30 seconds
setInterval(monitorServiceHealth, 30000);
```

### Service Recovery Logic

```js
const serviceManager = JsMacros.getServiceManager();

function recoverService(serviceName) {
    const status = serviceManager.status(serviceName);

    switch (status) {
        case "STOPPED":
            // Service should be running but isn't - try to restart it
            Chat.log(`Attempting to restart stopped service: ${serviceName}`);
            serviceManager.startService(serviceName);
            break;

        case "UNKNOWN":
            // Service doesn't exist - might need registration
            Chat.log(`Service ${serviceName} not found, attempting to register...`);
            const success = serviceManager.registerService(
                serviceName,
                `services/${serviceName.toLowerCase()}.js`,
                true
            );
            if (success) {
                Chat.log(`Successfully registered and started ${serviceName}`);
            } else {
                Chat.log(`Failed to register ${serviceName}`);
            }
            break;

        case "DISABLED":
            // Service is intentionally disabled - do nothing or enable if needed
            Chat.log(`Service ${serviceName} is disabled. Use enableService() to start it.`);
            break;

        case "ENABLED":
            Chat.log(`Service ${serviceName} is already running properly.`);
            break;

        case "RUNNING":
            // Service is running but disabled - this might be intentional
            Chat.log(`Service ${serviceName} is running but disabled. Consider enabling it for persistence.`);
            break;

        default:
            Chat.log(`Unknown status for ${serviceName}: ${status}`);
    }
}

// Recover all problematic services
function recoverAllServices() {
    const services = serviceManager.getServices();

    for (const serviceName of services) {
        const status = serviceManager.status(serviceName);
        if (status === "STOPPED" || status === "UNKNOWN") {
            recoverService(serviceName);
        }
    }
}
```

### Service Status Filtering

```js
const serviceManager = JsMacros.getServiceManager();

function getServicesByStatus(targetStatus) {
    const services = serviceManager.getServices();
    const matchingServices = [];

    for (const serviceName of services) {
        const status = serviceManager.status(serviceName);
        if (status === targetStatus) {
            matchingServices.push(serviceName);
        }
    }

    return matchingServices;
}

function getServiceStatusSummary() {
    const services = serviceManager.getServices();
    const summary = {
        ENABLED: [],
        DISABLED: [],
        RUNNING: [],
        STOPPED: [],
        UNKNOWN: []
    };

    for (const serviceName of services) {
        const status = serviceManager.status(serviceName);
        if (summary[status]) {
            summary[status].push(serviceName);
        }
    }

    return summary;
}

// Example usage
const enabledServices = getServicesByStatus("ENABLED");
Chat.log(`Currently running services: ${enabledServices.join(", ")}`);

const stoppedServices = getServicesByStatus("STOPPED");
if (stoppedServices.length > 0) {
    Chat.log(`Services that should be running but are stopped: ${stoppedServices.join(", ")}`);
}

const summary = getServiceStatusSummary();
Chat.log("=== Service Status Summary ===");
for (const [status, services] of Object.entries(summary)) {
    if (services.length > 0) {
        Chat.log(`${status}: ${services.length} services`);
    }
}
```

## Status Transitions

Services can transition between different states based on user actions or system events:

### Normal Transitions
- `DISABLED` → `ENABLED` (when `enableService()` is called)
- `ENABLED` → `DISABLED` (when `disableService()` is called)
- `STOPPED` → `ENABLED` (when `startService()` is called successfully)
- `ENABLED` → `STOPPED` (when service crashes or `stopService()` is called)

### Special Transitions
- `DISABLED` → `RUNNING` (when manually starting a disabled service)
- `RUNNING` → `DISABLED` (when the manually started service stops)
- `UNKNOWN` → Any status (when service is registered)

## Integration with ServiceManager Methods

The ServiceStatus enum works closely with various ServiceManager methods:

### Direct Status Methods
- `serviceManager.status(serviceName)` - Returns the ServiceStatus as a string
- `serviceManager.isRunning(serviceName)` - Returns true if status is `ENABLED` or `RUNNING`
- `serviceManager.isEnabled(serviceName)` - Returns true if status is `ENABLED` or `STOPPED`

### Status-Affecting Methods
- `serviceManager.enableService(serviceName)` - Changes status to `ENABLED` (starts the service)
- `serviceManager.disableService(serviceName)` - Changes status to `DISABLED` (stops the service)
- `serviceManager.startService(serviceName)` - Changes status to `ENABLED`
- `serviceManager.stopService(serviceName)` - Changes status to `STOPPED`
- `serviceManager.restartService(serviceName)` - Changes status to `ENABLED`

## Error Handling

When working with ServiceStatus, always handle the `UNKNOWN` case:

```js
function safeServiceOperation(serviceName, operation) {
    const status = serviceManager.status(serviceName);

    if (status === "UNKNOWN") {
        Chat.log(`Service ${serviceName} not found or status cannot be determined`);
        return false;
    }

    try {
        switch (operation) {
            case "start":
                serviceManager.startService(serviceName);
                break;
            case "stop":
                serviceManager.stopService(serviceName);
                break;
            case "enable":
                serviceManager.enableService(serviceName);
                break;
            case "disable":
                serviceManager.disableService(serviceName);
                break;
            case "restart":
                serviceManager.restartService(serviceName);
                break;
            default:
                Chat.log(`Unknown operation: ${operation}`);
                return false;
        }

        Chat.log(`Successfully performed ${operation} on ${serviceName}`);
        return true;

    } catch (error) {
        Chat.log(`Error performing ${operation} on ${serviceName}: ${error.message}`);
        return false;
    }
}
```

## Related Classes

- `ServiceManager` - Main class that manages services and uses ServiceStatus
- `ServiceTrigger` - Configuration object for service triggers
- `EventService` - Event object passed to service scripts

## Version Information

- **Available Since:** JsMacros 1.6.3
- **Stable:** Yes - Enum values are consistent across versions
- **Thread Safe:** Yes - Status queries are thread-safe

The ServiceStatus enum provides a robust foundation for service state management in JsMacros, enabling comprehensive monitoring, recovery, and lifecycle management of background services.